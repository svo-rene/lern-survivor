"""Bewegungen für schon geriggte Figuren neu holen bzw. Bosse riggen (Meshy, einmalig).

Aufruf:  py -I tools\\meshy_anim.py helden    (Helden: Ruhe, Laufen, Angriff, Rutschen; braucht die Rig-IDs unten)
         py -I tools\\meshy_anim.py bosse     (Tintenfass und Drache riggen: Ruhe, Laufen, Angriff)
Rig-Aufträge verfallen nach einigen Tagen; dann tools\\meshy_rig.py neu laufen lassen.
Kosten: je Bewegung 3 Credits, Rigging 5 Credits.
"""
import base64, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from meshy import call, laden, verkleinern, ZIEL
from meshy_rig import BASE, IDLE, WALK, HELDEN, warte

SLIDE = 516   # slide_light
RIGS = {      # Rig-Aufträge vom 17.11.2026 (gültig bis 20.11.)
    'held': '01a1eae2-9f07-711b-9695-7d07ff870808',
    'held_jaeger': '01a1eb07-64eb-72b2-ad03-7c6a583476e6',
    'held_alchemist': '01a1eb08-50d9-7092-b8b3-39d4c038b042',
    'held_ritter': '01a1eb09-32d6-76dc-aa27-967dadc05450',
    'held_gelehrter': '01a1eb0a-15a0-7321-8def-b51da4317258',
}
BOSSE = {'tutor': 4, 'abi': 4}   # Angriff: Attack


def bewegungen(name, rid, clips):
    aid = call('POST', BASE + '/animations', {'rig_task_id': rid, 'action_ids': clips})['result']
    ani = warte(f'{BASE}/animations/{aid}', name + ' Bewegungen')
    roh = laden(ani['result']['animation_glb_url'])
    klein = verkleinern(roh)
    open(os.path.join(ZIEL, name + '_anim.glb'), 'wb').write(klein)
    print(f'{name}: fertig, {len(klein) // 1024} KB', flush=True)


if __name__ == '__main__':
    was = sys.argv[1] if len(sys.argv) > 1 else 'helden'
    if was == 'helden':
        for n, rid in RIGS.items():
            bewegungen(n, rid, [IDLE, WALK, HELDEN[n], SLIDE])
    else:
        for n, angriff in BOSSE.items():
            glb = open(os.path.join(ZIEL, n + '.glb'), 'rb').read()
            uri = 'data:model/gltf-binary;base64,' + base64.b64encode(glb).decode()
            try:
                rid = call('POST', BASE + '/rigging', {'model_url': uri, 'height_meters': 2.0})['result']
                warte(f'{BASE}/rigging/{rid}', n + ' Skelett')
            except SystemExit as e:
                print(f'{n}: kein Skelett möglich ({e})', flush=True); continue
            except Exception as e:
                print(f'{n}: Fehler {e}', flush=True); continue
            bewegungen(n, rid, [IDLE, WALK, angriff])
