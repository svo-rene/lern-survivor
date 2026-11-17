"""Modell über ein Bild erzeugen: Meshy Text-zu-Bild, dann Bild-zu-3D (einmalig).

Aufruf:  py -I tools\\meshy_bild.py w_busch d_busch
Ergebnis: modelle/<name>_bild.png (Vorlage), modelle/<name>.glb und modelle/<name>.png (Vorschau).
Kosten: Bild 3 Credits (nano-banana), 3D mit Textur 30 Credits.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from meshy import call, laden, verkleinern, ZIEL
from meshy_rig import warte

BASE = 'https://api.meshy.ai/openapi/v1'
STIL = 'single object, stylized low poly cartoon game asset, soft colors, three-quarter view from slightly above, plain white background'
BILDER = {   # Name → (Bildbeschreibung, Dreiecke)
    'w_busch': ('a round lush green bush with dense rounded leaf clusters and a few small pink flowers', 700),
    'd_busch': ('a small desert shrub with olive green spiky leaves and a few small yellow flowers, growing from a little sand mound', 700),
}

if __name__ == '__main__':
    for name in sys.argv[1:] or list(BILDER):
        text, poly = BILDER[name]
        print(f'{name}: Bild …', flush=True)
        bid = call('POST', BASE + '/text-to-image', {'ai_model': 'nano-banana', 'prompt': f'{text}, {STIL}', 'aspect_ratio': '1:1', 'remove_background': True})['result']
        b = warte(f'{BASE}/text-to-image/{bid}', 'Bild')
        open(os.path.join(ZIEL, name + '_bild.png'), 'wb').write(laden(b['image_urls'][0]))
        print(f'{name}: 3D …', flush=True)
        mid = call('POST', BASE + '/image-to-3d', {'input_task_id': bid, 'ai_model': 'latest', 'should_texture': True, 'should_remesh': True,
                                                   'topology': 'triangle', 'target_polycount': poly, 'target_formats': ['glb']})['result']
        m = warte(f'{BASE}/image-to-3d/{mid}', '3D')
        roh = laden(m['model_urls']['glb']); klein = verkleinern(roh)
        open(os.path.join(ZIEL, name + '.glb'), 'wb').write(klein)
        if m.get('thumbnail_url'): open(os.path.join(ZIEL, name + '.png'), 'wb').write(laden(m['thumbnail_url']))
        print(f'{name}: fertig, {len(roh) // 1024} KB -> {len(klein) // 1024} KB', flush=True)
