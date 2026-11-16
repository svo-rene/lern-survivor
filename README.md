# 🧙 Lern-Survivor

Ein kleines Survivor-Spiel für den Informatikunterricht: Gegnerwellen überleben, Kristalle sammeln – und **bei jedem Level-up eine Frage beantworten**. Richtige und schnelle Antworten sowie Streaks bringen 🍀 Glück auf seltene Karten. Falsch beantwortete Fragen kommen später wieder – auch in der nächsten Runde. Nach 10 Minuten kommt der Endboss **🎓 Der Tutor**: Wer ihn besiegt, hat die Runde bestanden.

**📓 Hefter:** Mit richtigen Antworten schaltet man Hefterseiten frei (Merke + Beispiel, je Lernbereich 14–18 Seiten, Ordner `heft/`). Klassen werden über Lernziele freigeschaltet.

**Spielen:** [lern-survivor.de](https://lern-survivor.de) öffnen – läuft im Browser auf PC, Tablet und Handy, ohne Anmeldung.

## Lernbereiche

| Bereich | Inhalt |
|---|---|
| 🐍 Python-Grundlagen | Variablen, Datentypen, Kontrollstrukturen, Funktionen, Parameter, lokal/global, Listen |
| 📊 Algorithmen & Sortieren | Sortierverfahren, Suche, O-Notation, Laufzeitanalyse |
| 🧱 Datenstrukturen | Feld, einfach verkettete Liste, Stapel, Schlange, Baum |
| 🤖 KI · 🔦 Technische Informatik · 🔧 OOP · 📡 Netze · ⚙️ Automaten · 🗄️ Datenmanagement · 🔐 Sicherheit | Auswahlfragen aus den LK-Fragensammlungen von „Automate the Castle“ (Ordner `lk/`, umgewandelt in `lk.js`) |

## Eigene Fragen

Alle Fragen stehen in [`fragen.js`](fragen.js). Ein neuer Lernbereich ist ein weiterer Eintrag in `LERNBEREICHE`:

```js
{d: 1, q: 'Was ergibt `7 % 3`?', a: ['1', '2', '2.33', '0'], e: '`%` liefert den Rest.'}
```

- `d` Schwierigkeit 1–3 (das Spiel passt sie an die Trefferquote an)
- `a` vier Antworten – **die erste ist die richtige**, das Spiel mischt sie
- `e` kurze Erklärung, die nach der Antwort erscheint
- Mehrzeiliger Code: `C('zeile 1', 'zeile 2')`

## Technik

Reine statische Seite (HTML/JS), kein Build-Schritt, keine Daten verlassen den Browser. Bestenliste und Spitzname liegen nur im `localStorage` des jeweiligen Geräts.
3D-Darstellung mit [three.js](https://threejs.org) (MIT-Lizenz, liegt in `vendor/`).

Lokal starten: `python -m http.server` im Ordner, dann `http://localhost:8000`.
