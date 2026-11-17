"""3D-Modelle bei Meshy erzeugen (einmalig, nicht im Spiel).

Aufruf:  py -I tools\\meshy.py            (alle Modelle aus MODELLE, die noch fehlen)
         py -I tools\\meshy.py held       (nur dieses)
Braucht die Umgebungsvariable MESHY_API_KEY. Der Schlüssel landet nie im Repo.
Ergebnis: modelle/<name>.glb (Texturen auf 512 px verkleinert) und modelle/<name>.png (Vorschaubild).
Kosten: je Modell ein Vorschau- und ein Textur-Auftrag (Credits siehe meshy.ai).
"""
import io, json, os, struct, sys, time, urllib.request

API = 'https://api.meshy.ai/openapi/v2/text-to-3d'
STIL = 'cute stylized low poly game asset, chibi proportions, bright friendly colors, full body, standing, no base, no background'
MODELLE = {
    'held': 'a young wizard in a purple robe and a tall pointy purple hat, holding a wooden staff with a glowing blue crystal on top',
    'bug':  'a round red ladybug beetle creature with big friendly eyes and six short legs',
    'held_jaeger': 'a young forest ranger in a green hooded cloak with a wooden bow and a quiver of arrows on the back, arms slightly away from the body',
    'held_alchemist': 'a young alchemist in a brown leather apron and goggles on the forehead, holding a bubbling green potion flask, arms slightly away from the body',
    'held_ritter': 'a young knight in shiny silver armor with a blue tabard, holding a sword, arms slightly away from the body',
    'held_gelehrter': 'a young female scholar in a long blue robe with round glasses and an owl emblem, holding a big book, arms slightly away from the body',
    'kiste': 'a closed wooden treasure chest with golden metal bands and a golden lock, slightly cartoonish',
    'glitch': 'a small floating ghost creature, light purple, with a mischievous grin and little arms',
    'lock': 'a chunky grey rock golem creature with a grumpy face and short stubby legs',
    'spam': 'a yellow mushroom creature with a big round mouth spitting spores, tiny feet',
    'fork': 'a green slime blob creature with big eyes and a happy face',
    'over': 'an orange hedgehog creature with a spiky back, ready to roll',
    'boss': 'a big grumpy living spellbook monster standing on its pages, with big eyes and a bookmark tongue',
    'tutor': 'a big ink bottle monster with ink splash arms and a quill pen stuck on top, funny face',
    'abi': 'a chubby purple dragon wearing a black graduation cap, small wings, proud smile',
}
POLY = 4000      # Dreiecke je Modell (viele Gegner gleichzeitig, auch auf Tablets)
TEX = 512        # Kantenlänge der Textur in Pixeln

ZIEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'modelle')


def call(method, url, body=None):
    key = os.environ.get('MESHY_API_KEY')
    if not key:
        sys.exit('MESHY_API_KEY fehlt. In PowerShell:  $env:MESHY_API_KEY = "msy_..."')
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body else None,
                                 headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())


def warte(task_id, was):
    while True:
        t = call('GET', f'{API}/{task_id}')
        st = t.get('status')
        print(f'  {was}: {st} {t.get("progress", 0)} %', flush=True)
        if st == 'SUCCEEDED':
            return t
        if st in ('FAILED', 'CANCELED', 'EXPIRED'):
            sys.exit(f'{was} fehlgeschlagen: {t.get("task_error")}')
        time.sleep(8)


def laden(url):
    with urllib.request.urlopen(url, timeout=120) as r:
        return r.read()


def verkleinern(glb):
    """Bilder im GLB auf TEX px verkleinern (JPEG), Puffer neu packen."""
    from PIL import Image
    magic, ver, _ = struct.unpack_from('<III', glb, 0)
    assert magic == 0x46546C67, 'kein GLB'
    jl, = struct.unpack_from('<I', glb, 12); js = json.loads(glb[20:20 + jl])
    bl, = struct.unpack_from('<I', glb, 20 + jl); binary = glb[28 + jl:28 + jl + bl]
    views = js['bufferViews']; neu = {}
    for img in js.get('images', []):
        if 'bufferView' not in img:
            continue
        v = views[img['bufferView']]; raw = binary[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        im = Image.open(io.BytesIO(raw)).convert('RGB'); im.thumbnail((TEX, TEX), Image.LANCZOS)
        out = io.BytesIO(); im.save(out, 'JPEG', quality=85)
        neu[img['bufferView']] = out.getvalue(); img['mimeType'] = 'image/jpeg'
    teile, off = [], 0
    for i, v in enumerate(views):
        data = neu.get(i) or binary[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        pad = (-len(data)) % 4
        v['byteOffset'] = off; v['byteLength'] = len(data); v.pop('byteStride', None) if i in neu else None
        teile.append(data + b'\0' * pad); off += len(data) + pad
    binary = b''.join(teile); js['buffers'] = [{'byteLength': len(binary)}]
    j = json.dumps(js, separators=(',', ':')).encode(); j += b' ' * ((-len(j)) % 4)
    return (struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(j) + 8 + len(binary))
            + struct.pack('<II', len(j), 0x4E4F534A) + j + struct.pack('<II', len(binary), 0x004E4942) + binary)


def erzeuge(name, prompt):
    glb_pfad = os.path.join(ZIEL, name + '.glb')
    if os.path.exists(glb_pfad) and len(sys.argv) < 2:
        print(f'{name}: schon da, übersprungen'); return
    print(f'{name}: Vorschau …')
    pid = call('POST', API, {'mode': 'preview', 'prompt': f'{prompt}, {STIL}', 'art_style': 'realistic',
                             'topology': 'triangle', 'target_polycount': POLY, 'should_remesh': True})['result']
    warte(pid, 'Form')
    print(f'{name}: Textur …')
    rid = call('POST', API, {'mode': 'refine', 'preview_task_id': pid, 'enable_pbr': False})['result']
    t = warte(rid, 'Textur')
    roh = laden(t['model_urls']['glb'])
    klein = verkleinern(roh)
    with open(glb_pfad, 'wb') as f: f.write(klein)
    if t.get('thumbnail_url'):
        with open(os.path.join(ZIEL, name + '.png'), 'wb') as f: f.write(laden(t['thumbnail_url']))
    print(f'{name}: fertig, {len(roh) // 1024} KB -> {len(klein) // 1024} KB')


if __name__ == '__main__':
    os.makedirs(ZIEL, exist_ok=True)
    namen = sys.argv[1:] or list(MODELLE)
    for n in namen:
        erzeuge(n, MODELLE[n])
