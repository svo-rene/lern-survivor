"""Zauberer mit Skelett und Bewegungen versehen (Meshy Rigging + Animation, einmalig).

Aufruf:  py -I tools\\meshy_rig.py       (braucht MESHY_API_KEY und modelle/held.glb)
Ergebnis: modelle/held_anim.glb mit den Clips Ruhe, Laufen, Zaubern (Textur verkleinert).
Kosten: Rigging 5 Credits, je Bewegung 3 Credits.
"""
import base64, json, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from meshy import call, laden, verkleinern, ZIEL

BASE = 'https://api.meshy.ai/openapi/v1'
CLIPS = [0, 613, 129]   # Idle, Casual_Walk_inplace, mage_soell_cast – Reihenfolge = Clip-Reihenfolge im GLB


def warte(url, was):
    while True:
        t = call('GET', url)
        print(f'  {was}: {t.get("status")} {t.get("progress", 0)} %', flush=True)
        if t.get('status') == 'SUCCEEDED':
            return t
        if t.get('status') in ('FAILED', 'CANCELED'):
            sys.exit(f'{was} fehlgeschlagen: {t.get("task_error")}')
        time.sleep(6)


if __name__ == '__main__':
    glb = open(os.path.join(ZIEL, 'held.glb'), 'rb').read()
    uri = 'data:model/gltf-binary;base64,' + base64.b64encode(glb).decode()
    rid = call('POST', BASE + '/rigging', {'model_url': uri, 'height_meters': 1.2})['result']
    rig = warte(f'{BASE}/rigging/{rid}', 'Skelett')
    aid = call('POST', BASE + '/animations', {'rig_task_id': rid, 'action_ids': CLIPS})['result']
    ani = warte(f'{BASE}/animations/{aid}', 'Bewegungen')
    roh = laden(ani['result']['animation_glb_url'])
    open(os.path.join(ZIEL, 'held_anim_roh.glb'), 'wb').write(roh)
    klein = verkleinern(roh)
    open(os.path.join(ZIEL, 'held_anim.glb'), 'wb').write(klein)
    print(f'fertig: {len(roh) // 1024} KB -> {len(klein) // 1024} KB')
