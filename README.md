# 🧙 Lern-Survivor

Ein kleines Survivor-Spiel für den Informatikunterricht: Gegnerwellen überleben, Kristalle sammeln – und **bei jedem Level-up eine Frage beantworten**. Richtige und schnelle Antworten sowie Streaks bringen 🍀 Glück auf seltene Karten. Falsch beantwortete Fragen kommen später wieder – auch in der nächsten Runde. Eine Runde hat **3 Welten** (🌳 Wiese, 🏜️ Wüste, ❄️ Eisland, je etwa 3 Minuten) mit je einem Endboss: **📝 Leistungskontrolle**, **🧑‍🏫 Der Tutor** und zum Schluss **🎓 Das Abitur** – wer es besteht, hat die Runde gewonnen.

**📓 Hefter:** Mit richtigen Antworten schaltet man Hefterseiten frei (Merke + Beispiel, je Lernbereich 14–18 Seiten, Ordner `heft/`). Klassen werden über Lernziele freigeschaltet.

**Spielen:** [lern-survivor.de](https://lern-survivor.de) öffnen – läuft im Browser auf PC, Tablet und Handy, ohne Anmeldung.

**Fächer:** Informatik (LK 11/12) und Physik (Kl. 7, Kräfte). Link nur für Physik: [lern-survivor.de/?fach=physik](https://lern-survivor.de/?fach=physik) – dann gibt es keine Fachauswahl. Neues Fach: in `kurs.js` eintragen, Fragen in `kurs/<id>.js`, Hefter in `heft/<id>.js`. Formeln schreibt man als `$F_G = m · g$`, Brüche als `{{Zähler|Nenner}}`.

## Lernbereiche

Die zehn Lernbereiche folgen dem **Lehrplan Informatik Sachsen (Gymnasium, Leistungskurs, 2022)** und den OPAL-Kursen des LK (Begriffe, Notation und Beispiele wie dort): Python-Grundlagen, Algorithmen & Komplexität, Datenstrukturen, Künstliche Intelligenz, Technische Informatik, Programmierparadigmen & OOP, Rechnernetze, Sprachen & Automaten, Datenmanagement, Informationssicherheit – je etwa 70 Fragen und ein Hefter mit Merksätzen.

## Eigene Fragen

Je Lernbereich eine Datei `kurs/<id>.js`, die Liste der Bereiche steht in [`kurs.js`](kurs.js), der Hefter in `heft/<id>.js`.

```js
{d: 1, q: 'Was ergibt `7 % 3`?', a: ['1', '2', '2.33', '0'], e: '`%` liefert den Rest.', src: 'OPAL LB2 2.1.3'}
```

- `d` Schwierigkeit 1–3 (das Spiel passt sie an die Trefferquote an)
- `a` vier Antworten – **die erste ist die richtige**, das Spiel mischt sie
- `e` kurze Erklärung, die nach der Antwort erscheint; `src` Quelle (OPAL-Seite oder Lehrplan)
- **Bilder:** `plot: {x: [0, 10], y: [0, 100], curves: [{f: function(n) { return n * n; }, label: 'A'}]}` zeichnet ein Diagramm aus Funktionen (auch `points`, `xl`, `yl`), `svg: '<svg …>'` ein selbst gezeichnetes SVG, `img: 'img/x.svg'` eine Datei; dazu `alt` als Beschreibung. Auch Antworten dürfen Bilder sein: `{plot: {…, mini: true}, alt: 'Parabel'}` statt Text (die erste Antwort bleibt die richtige).
- **Themen:** Jede Frage trägt `t:` (Kapitel/Thema im Kurs). Daraus entsteht die Schwerpunkt-Auswahl; ein Link wie `?bereich=algo&themen=2.2.2,2.2.5&modus=nur` wählt Bereich und Themen vor.
- Mehrzeiliger Code: `'
`zeile 1
zeile 2`'`

## Technik

Reine statische Seite (HTML/JS), kein Build-Schritt, keine Daten verlassen den Browser. Bestenliste und Spitzname liegen nur im `localStorage` des jeweiligen Geräts.
3D-Darstellung mit [three.js](https://threejs.org) (MIT-Lizenz, liegt in `vendor/`).

Lokal starten: `python -m http.server` im Ordner, dann `http://localhost:8000`.
