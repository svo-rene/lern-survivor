"""Bilder bei Meshy erzeugen (Text-zu-Bild, 3 Credits je Bild): Bodentexturen und Vorschläge zum Aussuchen.

Aufruf:  py -I tools\\vorlagen.py boden          (Bodentexturen je Welt → textur/boden_w|d|e.jpg, kachelbar gemacht)
         py -I tools\\vorlagen.py busch          (Busch-Vorschläge → modelle/vorlagen/*.png)
"""
import io, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from meshy import call, laden
from meshy_rig import warte
from PIL import Image

BASE = 'https://api.meshy.ai/openapi/v1'
WURZEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
TEX = 'seamless tileable top-down ground texture, hand-painted stylized cartoon game texture, flat even lighting, no shadows, no objects, fills the whole image'
BODEN = {
    'boden_w': 'soft green grass lawn with small clover patches and a few tiny white and yellow flowers, ' + TEX,
    'boden_d': 'warm golden desert sand with gentle wind ripples and a few small pebbles, edge to edge, no border, no frame, ' + TEX,
    'boden_e': 'fresh white snow with light blue icy patches and tiny sparkles, edge to edge, no border, no frame, ' + TEX,
}
BST = 'single object, stylized low poly cartoon game asset, chunky shapes, soft colors, three-quarter view from slightly above, plain white background'
BUSCH = {
    'w_busch_a': 'a fluffy round bush made of three big soft leaf clumps in fresh green with a few pink flowers, ' + BST,
    'w_busch_b': 'a small hedge bush with layered rounded leaves in two shades of green and small red berries, ' + BST,
    'w_busch_c': 'a low wide flowering bush with yellow and white daisies on top of green leaves, ' + BST,
    'd_busch_a': 'a small round agave plant with thick pointy blue-green leaves, ' + BST,
    'd_busch_b': 'a low dry desert bush with orange-brown twigs and small green leaves, ' + BST,
    'e_busch_a': 'a small round bush covered in snow with frosty blue-green leaves, ' + BST,
    'e_busch_b': 'a cluster of small frozen ice flowers with pale blue petals poking out of snow, ' + BST,
}


def bild(prompt, bg):
    bid = call('POST', BASE + '/text-to-image', {'ai_model': 'nano-banana', 'prompt': prompt, 'aspect_ratio': '1:1', 'remove_background': bg})['result']
    return laden(warte(f'{BASE}/text-to-image/{bid}', 'Bild')['image_urls'][0])


def kachelbar(im):
    """Nahtlos machen: mit einer um die halbe Breite verschobenen Kopie überblenden (Ränder kommen aus der Kopie)."""
    from PIL import ImageChops
    im = im.convert('RGB'); bb = ImageChops.difference(im, Image.new('RGB', im.size, (255, 255, 255))).point(lambda v: 255 if v > 40 else 0).getbbox()
    if bb: m = int(min(bb[2] - bb[0], bb[3] - bb[1]) * .04); im = im.crop((bb[0] + m, bb[1] + m, bb[2] - m, bb[3] - m))   # weißen Rand abschneiden
    im = im.resize((1024, 1024), Image.LANCZOS); w, h = im.size
    sh = Image.new('RGB', (w, h)); sh.paste(im.crop((w // 2, h // 2, w, h)), (0, 0)); sh.paste(im.crop((0, h // 2, w // 2, h)), (w // 2, 0))
    sh.paste(im.crop((w // 2, 0, w, h // 2)), (0, h // 2)); sh.paste(im.crop((0, 0, w // 2, h // 2)), (w // 2, h // 2))
    m = Image.new('L', (w, h)); px = m.load()
    for y in range(h):
        for x in range(w):
            d = min(x, w - 1 - x, y, h - 1 - y) / (w * .22); px[x, y] = int(255 * max(0, min(1, d)))
    return Image.composite(im, sh, m).resize((512, 512), Image.LANCZOS)


if __name__ == '__main__':
    was = sys.argv[1] if len(sys.argv) > 1 else 'boden'
    if was == 'boden':
        os.makedirs(os.path.join(WURZEL, 'textur'), exist_ok=True)
        for n, p in BODEN.items():
            if len(sys.argv) > 2 and n not in sys.argv[2:]: continue
            print(n, flush=True); im = kachelbar(Image.open(io.BytesIO(bild(p, False))))
            im.save(os.path.join(WURZEL, 'textur', n + '.jpg'), quality=85)
    else:
        ziel = os.path.join(WURZEL, 'modelle', 'vorlagen'); os.makedirs(ziel, exist_ok=True)
        for n, p in BUSCH.items():
            print(n, flush=True); open(os.path.join(ziel, n + '.png'), 'wb').write(bild(p, True))
    print('fertig', flush=True)
