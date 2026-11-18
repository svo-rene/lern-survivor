"""Spielmusik mit Google Lyria 3 über OpenRouter erzeugen (einmalig, Dateien landen in musik/).

Aufruf:  py -I tools\\musik.py            (alle Stücke, die noch fehlen)
         py -I tools\\musik.py welt1      (nur dieses, überschreibt)
Braucht die Umgebungsvariable OPENROUTER_API_KEY. Der Schlüssel landet nie im Repo.
Die Stile sind mit eigenen Worten beschrieben – keine Vorlage eines bestimmten Spiels.
"""
import base64, json, os, sys, urllib.request

MODEL = 'google/lyria-3-pro-preview'
ZIEL = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'musik')
GRUND = ('Instrumental video game background music for a fast, cheerful action game, seamless loop, no vocals, '
         'catchy memorable synth lead melody, driving punchy drums, bouncy funky bass, bright and energetic, '
         'about 2 minutes, clean ending that loops back to the start')
STUECKE = {
    'welt1': GRUND + '. Green meadow level: upbeat electro-funk at 140 BPM, playful plucky synths, happy major key, sunny mood.',
    'welt2': GRUND + '. Desert level: groovy breakbeat at 145 BPM, warm analog synth lead with a slight exotic scale, hand percussion, sunny heat.',
    'welt3': GRUND + '. Ice level: fast energetic synthwave at 150 BPM, sparkling bell arpeggios, cool shimmering pads, triumphant final-level feeling.',
}


def finde_audio(o):
    """Sucht in der Antwort nach Base64-Audio (Feldnamen je nach Anbieter verschieden)."""
    if isinstance(o, dict):
        for k in ('data', 'b64_json', 'audio_data'):
            v = o.get(k)
            if isinstance(v, str) and len(v) > 1000: return v, o.get('format') or o.get('mime_type')
        url = o.get('url') or (o.get('audio_url') or {}).get('url') if isinstance(o.get('audio_url'), dict) else o.get('url')
        if isinstance(url, str) and url.startswith('data:audio'): return url.split(',', 1)[1], url[5:url.index(';')]
        for v in o.values():
            r = finde_audio(v)
            if r: return r
    elif isinstance(o, list):
        for v in o:
            r = finde_audio(v)
            if r: return r
    return None


def erzeuge(name, prompt):
    key = os.environ.get('OPENROUTER_API_KEY')
    if not key: sys.exit('OPENROUTER_API_KEY fehlt. In PowerShell:  $env:OPENROUTER_API_KEY = "sk-or-..."')
    body = {'model': MODEL, 'modalities': ['text', 'audio'], 'messages': [{'role': 'user', 'content': prompt}]}
    req = urllib.request.Request('https://openrouter.ai/api/v1/chat/completions', data=json.dumps(body).encode(),
                                 headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json', 'X-Title': 'Lern-Survivor'})
    print(f'{name}: erzeuge …', flush=True)
    with urllib.request.urlopen(req, timeout=600) as r: ant = json.loads(r.read())
    gef = finde_audio(ant)
    if not gef:
        open(os.path.join(ZIEL, name + '_antwort.json'), 'w', encoding='utf-8').write(json.dumps(ant, indent=1)[:20000])
        sys.exit(f'{name}: keine Audiodaten gefunden, Antwort in musik/{name}_antwort.json')
    daten, fmt = gef; endung = 'wav' if fmt and 'wav' in fmt else 'mp3'
    pfad = os.path.join(ZIEL, f'{name}.{endung}'); open(pfad, 'wb').write(base64.b64decode(daten))
    print(f'{name}: fertig, {os.path.getsize(pfad) // 1024} KB ({endung})', flush=True)


if __name__ == '__main__':
    os.makedirs(ZIEL, exist_ok=True)
    namen = sys.argv[1:] or [n for n in STUECKE if not any(os.path.exists(os.path.join(ZIEL, n + e)) for e in ('.mp3', '.wav'))]
    for n in namen: erzeuge(n, STUECKE[n])
