"""Helden mit Skelett und Bewegungen versehen (Meshy Rigging + Animation, einmalig).

Aufruf:  py -I tools\\meshy_rig.py                 (alle Helden aus HELDEN, deren _anim.glb noch fehlt)
         py -I tools\\meshy_rig.py held_ritter     (nur diesen)
Braucht MESHY_API_KEY und modelle/<name>.glb (von tools/meshy.py).
Ergebnis: modelle/<name>_anim.glb mit den Clips Ruhe, Laufen, Angriff (Textur verkleinert).
Kosten: Rigging 5 Credits, je Bewegung 3 Credits.
"""
import base64, os, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from meshy import call, laden, verkleinern, ZIEL

BASE = 'https://api.meshy.ai/openapi/v1'
IDLE, WALK = 0, 613   # Idle, Casual_Walk_inplace
HELDEN = {            # Datei → Angriff aus der Meshy-Bibliothek
    'held': 129,             # Zauberer: mage_soell_cast
    'held_jaeger': 224,      # Waldläufer: Archery_Shot
    'held_alchemist': 421,   # Alchemist: Over_Shoulder_Throw
    'held_ritter': 238,      # Ritter: Axe_Spin_Attack (Wirbelschwert)
    'held_gelehrter': 125,   # Gelehrte: Charged_Spell_Cast
}


def warte(url, was):
    while True:
        t = call('GET', url)
        print(f'  {was}: {t.get("status")} {t.get("progress", 0)} %', flush=True)
        if t.get('status') == 'SUCCEEDED':
            return t
        if t.get('status') in ('FAILED', 'CANCELED'):
            sys.exit(f'{was} fehlgeschlagen: {t.get("task_error")}')
        time.sleep(6)


def rigge(name, angriff):
    ziel = os.path.join(ZIEL, name + '_anim.glb')
    if os.path.exists(ziel) and len(sys.argv) < 2:
        print(f'{name}: schon da, übersprungen'); return
    glb = open(os.path.join(ZIEL, name + '.glb'), 'rb').read()
    uri = 'data:model/gltf-binary;base64,' + base64.b64encode(glb).decode()
    print(f'{name}: Skelett …')
    rid = call('POST', BASE + '/rigging', {'model_url': uri, 'height_meters': 1.2})['result']
    warte(f'{BASE}/rigging/{rid}', 'Skelett')
    print(f'{name}: Bewegungen …')
    aid = call('POST', BASE + '/animations', {'rig_task_id': rid, 'action_ids': [IDLE, WALK, angriff]})['result']
    ani = warte(f'{BASE}/animations/{aid}', 'Bewegungen')
    roh = laden(ani['result']['animation_glb_url'])
    klein = verkleinern(roh)
    open(ziel, 'wb').write(klein)
    print(f'{name}: fertig, {len(roh) // 1024} KB -> {len(klein) // 1024} KB')


if __name__ == '__main__':
    for n in sys.argv[1:] or list(HELDEN):
        rigge(n, HELDEN[n])
