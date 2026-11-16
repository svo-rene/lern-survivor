'use strict';
// 🗝️ Kerker-Fragen Burg 26 (LK Sicherheit) – Quellen: OPAL „LK INF LB 8 – Informationssicherheit“ (8.1 Sicherheitsziele,
// 8.2 Übersicht Kryptologie/Kerckhoffs, 8.3 Symmetrische Verfahren, 8.4 Kasiski-Test, 8.5 One-Time-Pad, 8.6 Kryptoanalyse,
// 8.7 AES/Mini-AES-8, 8.8 Asymmetrische Verfahren, 8.9 RSA, 8.10 Diffie-Hellman, 8.11 Hybride Verfahren, 8.12 Hashfunktionen,
// 8.13 Digitale Signatur, 8.14 Authentifizierung, 8.15 Datensicherung und RAID), OPAL „LK INF Abiturvorbereitung“ 6.2
// Informationssicherheit, Lehrplan Sachsen LK Informatik LB 8. Buchstaben wie im Kurs: A = 0, …, Z = 25.
KERKER_FRAGEN.push(
  // ---------------------------------------------------------------------------------------------
  // Kapitel 80: Schutzziele und Caesar
  { id: 'k26_001', burg: 26, kap: 80, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Vorfall das Schutzziel zu, das vorrangig verletzt ist.',
    paare: [['Ein Befund wird unverschlüsselt gemailt und unterwegs mitgelesen.', 'Vertraulichkeit'], ['Der Überweisungsbetrag wird von 50 € auf 500 € geändert.', 'Integrität'], ['Nach einem Defekt kann niemand den Terminkalender öffnen.', 'Verfügbarkeit'], ['Die Kasse will sicher sein, dass die Rechnung wirklich von der Praxis stammt.', 'Authentizität'], ['Ein Kunde bestreitet vor Gericht, die Bestellung abgeschickt zu haben.', 'Verbindlichkeit']],
    erkl: 'Gelesen → Vertraulichkeit, verändert → Integrität, verhindert → Verfügbarkeit, Herkunft unklar → Authentizität, gegenüber Dritten beweisen → Verbindlichkeit.', quelle: 'OPAL LB 8 8.1 Sicherheitsziele; Abiturvorbereitung 6.2.1 c' },
  { id: 'k26_002', burg: 26, kap: 80, stufe: 2, art: 'wahl', frage: 'Ein Shop weiß dank Passwort-Login, dass eine Bestellung vom Kunden kommt. Vor Gericht reicht das nicht. Welches Schutzziel fehlt, und was sichert es?',
    optionen: ['Verbindlichkeit – durch eine digitale Signatur', 'Vertraulichkeit – durch Verschlüsselung', 'Verfügbarkeit – durch einen Spiegelserver', 'Integrität – durch einen Hashwert'],
    erkl: 'Eine Signatur mit dem privaten Schlüssel des Kunden kann er nicht abstreiten. Authentizität: „Ich weiß, dass du es warst.“ Verbindlichkeit: „Ich kann es anderen beweisen.“ Das Passwort könnte auch ein anderer gekannt haben, und das Protokoll führt der Shop selbst.', quelle: 'OPAL LB 8 8.1 Beispiel 2' },
  { id: 'k26_003', burg: 26, kap: 80, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.3 Symmetrische Verfahren (Caesar)',
    gen: (z) => {
      const w = z.wahl(['BURG', 'TAUBE', 'BOTE', 'FALKE', 'NEBEL', 'SIEGEL', 'ZINNE']), k = z.int(3, 23);
      const c = w.split('').map((x) => String.fromCharCode((x.charCodeAt(0) - 65 + k) % 26 + 65)).join('');
      return { frage: `Verschlüssele ${w} mit der Caesar-Verschiebung k = ${k}.`, antworten: [c],
        erkl: `Jeder Buchstabe wird um ${k} Stellen weitergeschoben, nach Z geht es bei A weiter (mod 26): ${w} → ${c}.` };
    } },
  { id: 'k26_004', burg: 26, kap: 80, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.3 a; OPAL 8.3',
    gen: (z) => {
      const w = z.wahl(['KLANG', 'HAFEN', 'MAUER', 'FLUSS', 'TURM', 'KARTE', 'RITTER']), k = z.int(3, 23);
      const c = w.split('').map((x) => String.fromCharCode((x.charCodeAt(0) - 65 + k) % 26 + 65)).join('');
      return { frage: `Entschlüssele ${c}. Es wurde mit der Verschiebung k = ${k} verschlüsselt.`, antworten: [w],
        erkl: `Zum Entschlüsseln ziehst du ${k} ab und rechnest mod 26 (oder verschiebst um ${26 - k} weiter): ${c} → ${w}.` };
    } },
  { id: 'k26_005', burg: 26, kap: 80, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.6 Kryptoanalyse (Known-Plaintext)',
    gen: (z) => {
      const p = z.int(0, 25), k = z.int(1, 25), c = (p + k) % 26, P = String.fromCharCode(65 + p), C = String.fromCharCode(65 + c);
      return { frage: `Bei einer Caesar-Verschlüsselung wird aus dem Klartextbuchstaben ${P} der Geheimbuchstabe ${C}. Wie groß ist die Verschiebung k (1 bis 25)?`,
        antworten: [String(k)], erkl: `k = (${C} − ${P}) mod 26 = (${c} − ${p}) mod 26 = ${k}. Ein einziges bekanntes Klartext-Geheimtext-Paar verrät den ganzen Schlüssel.` };
    } },
  { id: 'k26_006', burg: 26, kap: 80, stufe: 1, art: 'wahl', frage: 'Was besagt das Kerckhoffs-Prinzip?',
    optionen: ['Nur der Schlüssel muss geheim bleiben, nicht das Verfahren.', 'Sicher ist nur, wessen Funktionsweise niemand kennt.', 'Der Schlüssel muss so lang sein wie die Nachricht.', 'Jede Nachricht muss zusätzlich signiert werden.'],
    erkl: 'Deshalb sind AES und RSA öffentlich bekannt und werden weltweit geprüft. „Geheimes Verfahren“ ist kein Sicherheitsmerkmal.', quelle: 'OPAL LB 8 8.2 Übersicht Kryptologie' },
  { id: 'k26_007', burg: 26, kap: 80, stufe: 1, art: 'eingabe', zahl: true, frage: 'Wie viele sinnvolle Schlüssel hat die Caesar-Verschiebung über dem Alphabet A–Z?', antworten: ['25'],
    erkl: 'Verschiebungen 1 bis 25; k = 0 (bzw. 26) verändert nichts. Ein Rechner probiert alle sofort durch (Brute Force).', quelle: 'Abiturvorbereitung 6.2.3 d Stufe 2; OPAL 8.6' },
  { id: 'k26_008', burg: 26, kap: 80, stufe: 2, art: 'wahl', frage: 'Zwei Firmen sichern ihre Nachrichten mit einem MAC (Prüfsumme mit gemeinsamem geheimem Schlüssel). Welches Schutzziel erreicht ein MAC nicht?',
    optionen: ['Verbindlichkeit', 'Integrität', 'Authentizität', 'keins'],
    erkl: 'Auch der Empfänger hätte den MAC erzeugen können. Ein MAC zeigt dem Empfänger, dass die Nachricht unverändert ist und von jemandem mit dem Schlüssel stammt. Weil beide denselben Schlüssel haben, kann er Dritten nichts beweisen.', quelle: 'OPAL LB 8 8.1 Hinweis MAC' },
  { id: 'k26_009', burg: 26, kap: 80, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.3; Spiel Kap. 80 verschiebe',
    gen: (z) => {
      const b = z.wahl(['V', 'W', 'X', 'Y', 'Z', 'T']), k = z.int(4, 12), e = String.fromCharCode((b.charCodeAt(0) - 65 + k) % 26 + 65);
      return { frage: 'Was gibt das Programm aus?', code: `def verschiebe(buchstabe, abstand):\n    return chr((ord(buchstabe) - 65 + abstand) % 26 + 65)\n\nprint(verschiebe("${b}", ${k}))`,
        antworten: [e], erkl: `ord("${b}") − 65 = ${b.charCodeAt(0) - 65}, plus ${k} ergibt ${b.charCodeAt(0) - 65 + k}, mod 26 = ${(b.charCodeAt(0) - 65 + k) % 26}, plus 65 und chr: ${e}. Das % 26 sorgt dafür, dass es nach Z bei A weitergeht.` };
    } },
  { id: 'k26_010', burg: 26, kap: 80, stufe: 3, art: 'mehr', frage: 'Erpressersoftware kopiert die Kundendaten eines Steuerbüros zum Angreifer und verschlüsselt sie dann auf dem Server. Kreuze alle Schutzziele an, die dadurch verletzt sind.',
    optionen: ['Vertraulichkeit', 'Verfügbarkeit', 'Verbindlichkeit', 'Kerckhoffs-Prinzip'], richtig: [0, 1],
    erkl: 'Fremde haben die Daten (Vertraulichkeit), und das Büro kann sie nicht mehr nutzen (Verfügbarkeit). Kerckhoffs ist ein Prinzip für Verfahren, kein Schutzziel.', quelle: 'Abiturvorbereitung 6.2.8 b' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 81: Häufigkeitsanalyse
  { id: 'k26_011', burg: 26, kap: 81, stufe: 1, art: 'wahl', frage: 'Welcher Buchstabe ist in deutschen Texten mit Abstand am häufigsten?',
    optionen: ['E (etwa 17 %)', 'A (etwa 17 %)', 'N (etwa 25 %)', 'Alle Buchstaben sind etwa gleich häufig.'],
    erkl: 'Danach folgen N, I, S, R. Diese ungleiche Verteilung nutzt die Häufigkeitsanalyse.', quelle: 'OPAL LB 8 8.6 Kryptoanalyse; Abiturvorbereitung 6.2.2 c' },
  { id: 'k26_012', burg: 26, kap: 81, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.2 c, 6.2.3 c',
    gen: (z) => {
      const c = z.wahl([0, 1, 2, 3, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]), k = (c - 4 + 26) % 26, C = String.fromCharCode(65 + c);
      return { frage: `Ein deutscher Text wurde mit einer Verschiebung verschlüsselt. Im Geheimtext ist ${C} mit etwa 17 % der häufigste Buchstabe. Welche Verschiebung k wurde vermutlich verwendet?`,
        antworten: [String(k)], erkl: `Der häufigste Geheimbuchstabe steht vermutlich für E (4): k = (${c} − 4) mod 26 = ${k}.` };
    } },
  { id: 'k26_013', burg: 26, kap: 81, stufe: 2, art: 'zuordnen', frage: 'Ordne zu, wie die Häufigkeitsverteilung eines deutschen Texts nach dem Verschlüsseln aussieht.',
    paare: [['Verschiebung (Caesar)', 'Die Spitze von etwa 17 % wandert zu einem anderen Buchstaben.'], ['gar nicht verschlüsselt (Klartext)', 'Verteilung wie im Deutschen, E bleibt vorn.'], ['Vigenère mit langem Schlüsselwort', 'Verteilung ist flach, keine deutliche Spitze.']],
    erkl: 'Im Klartext ist E vorn. Die Verschiebung ersetzt jeden Buchstaben immer gleich (monoalphabetisch) – die Spitze bleibt, nur an anderer Stelle. Vigenère ersetzt denselben Klartextbuchstaben je nach Position verschieden (polyalphabetisch).', quelle: 'Abiturvorbereitung 6.2.3 b; Spiel fb1, fc3' },
  { id: 'k26_014', burg: 26, kap: 81, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.6 a; OPAL 8.3 (multiplikative/affine Chiffre)',
    gen: (z) => {
      const w = z.wahl(['ELBE', 'BRIEF', 'SIEGEL', 'TAUBE', 'KAI']), a = z.wahl([3, 5, 7, 9, 11]), b = z.int(1, 25);
      const c = w.split('').map((x) => String.fromCharCode((a * (x.charCodeAt(0) - 65) + b) % 26 + 65)).join('');
      const x0 = w.charCodeAt(0) - 65;
      return { frage: `Verschlüssele ${w} mit der affinen Chiffre (a · x + b) mod 26 mit a = ${a} und b = ${b}.`, antworten: [c],
        erkl: `Beispiel ${w[0]}: ${a} · ${x0} + ${b} = ${a * x0 + b}, mod 26 = ${(a * x0 + b) % 26} = ${c[0]}. Ganzes Wort: ${c}. Gleiche Klartextbuchstaben werden immer gleich ersetzt – monoalphabetisch.` };
    } },
  { id: 'k26_015', burg: 26, kap: 81, stufe: 2, art: 'eingabe', zahl: true, frage: 'Bei der affinen Chiffre (a · x + b) mod 26 muss a teilerfremd zu 26 sein – dafür gibt es 12 Möglichkeiten. Wie viele Schlüssel (a, b) gibt es insgesamt?',
    antworten: ['312'], erkl: 'a und b werden unabhängig gewählt: 12 · 26 = 312 (311 ohne den wirkungslosen Schlüssel a = 1, b = 0). Viel zu wenige gegen Brute Force.', quelle: 'Abiturvorbereitung 6.2.6 c' },
  { id: 'k26_016', burg: 26, kap: 81, stufe: 3, art: 'wahl', frage: 'Ein Gruppenleiter: „Wir nehmen eine beliebige Vertauschung des Alphabets. Mit 26! ≈ 4 · 10²⁶ Schlüsseln knackt das niemand mehr.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Falsch: Die Häufigkeitsanalyse bricht sie trotzdem schnell.', 'Stimmt: So viele Schlüssel machen jedes Verfahren sicher.', 'Falsch: 26! Schlüssel probiert ein Rechner in Sekunden.', 'Stimmt: Häufigkeitsanalyse funktioniert nur bei der Caesar-Verschiebung.'],
    erkl: 'Brute Force dauert tatsächlich zu lange, aber die Ersetzung bleibt monoalphabetisch. Ein großer Schlüsselraum ist notwendig, aber nicht hinreichend. Ein Angreifer muss nicht alle Schlüssel probieren, wenn das Verfahren Muster des Klartexts (Buchstabenhäufigkeiten) erhält.', quelle: 'Abiturvorbereitung 6.2.6 d' },
  { id: 'k26_017', burg: 26, kap: 81, stufe: 2, art: 'luecke', frage: 'Ergänze die Häufigkeitsanalyse: Gezählt werden nur die Buchstaben A–Z.',
    text: 'def haeufigkeiten(text):\n    zaehler = dict()\n    for b in text:\n        if "A" <= b <= "Z":\n            zaehler[b] = zaehler.{}(b, 0) + 1\n    return {}',
    luecken: [['get'], ['zaehler']], woerter: ['get', 'count', 'append', 'zaehler', 'text', 'b'],
    erkl: 'zaehler.get(b, 0) liefert die bisherige Anzahl oder 0, wenn der Buchstabe noch nicht vorkam. Zurückgegeben wird das ganze Dictionary.', quelle: 'Abiturvorbereitung 6.2.2 b; OPAL material count_letters.py' },
  // Ersetzt 2026-11-14 (Didaktik-Prüfung: Spaltentransposition wird im Spiel nicht gelehrt) – multiplikative Chiffre mit ungeeignetem Schlüssel (Spiel fb3, fb4)
  { id: 'k26_018', burg: 26, kap: 81, stufe: 3, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.3 (multiplikative Chiffre); Spiel fb3, fb4',
    gen: (z) => {
      const a = z.wahl([2, 4, 6, 8, 10, 12]), x = z.int(1, 12), y = x + 13, c = (x * a) % 26;
      const X = String.fromCharCode(65 + x), Y = String.fromCharCode(65 + y), C = String.fromCharCode(65 + c);
      return { frage: `Multiplikative Chiffre (A = 0, …, Z = 25): Der Buchstabe mit Index x wird zu (x · ${a}) mod 26. So wird ${X} zu ${C}. Welcher andere Buchstabe wird ebenfalls zu ${C} verschlüsselt?`,
        antworten: [Y], erkl: `${Y} hat den Index ${y}: (${y} · ${a}) mod 26 = ${y * a} mod 26 = ${c} = ${C}, genau wie ${X} (${x} · ${a} = ${x * a}). Weil ${a} gerade ist, gilt ggT(${a}, 26) ≠ 1: Buchstaben im Abstand 13 fallen zusammen, und man kann nicht mehr eindeutig entschlüsseln. Darum taugen nur Schlüssel, die zu 26 teilerfremd sind.` };
    } },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 82: Vigenère und One-Time-Pad
  { id: 'k26_019', burg: 26, kap: 82, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.3, 8.4 Beispiel 1; Abiturvorbereitung 6.2.2 a',
    gen: (z) => {
      const w = z.wahl(['HAFEN', 'BRIEF', 'KUTSCHE', 'POSTEN', 'WAGEN']), s = z.wahl(['ELBE', 'KEY', 'TOR', 'AXT', 'BIT']);
      const c = w.split('').map((x, i) => String.fromCharCode((x.charCodeAt(0) - 65 + s.charCodeAt(i % s.length) - 65) % 26 + 65)).join('');
      return { frage: `Verschlüssele ${w} mit Vigenère und dem Schlüsselwort ${s} (A = 0, …, Z = 25).`, antworten: [c],
        erkl: `Schlüssel wiederholen (${s.repeat(3).slice(0, w.length)}) und Buchstabe für Buchstabe addieren, mod 26: ${c}.` };
    } },
  { id: 'k26_020', burg: 26, kap: 82, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.5 One-Time-Pad; Abiturvorbereitung 6.2.5 a',
    gen: (z) => {
      const w = z.wahl(['HAFEN', 'TREFF', 'NORDEN', 'ABEND']);
      const k = w.split('').map(() => String.fromCharCode(65 + z.int(0, 25))).join('');
      const c = w.split('').map((x, i) => String.fromCharCode((x.charCodeAt(0) + k.charCodeAt(i) - 130) % 26 + 65)).join('');
      return { frage: `Verschlüssele ${w} mit dem One-Time-Pad-Schlüssel ${k} (Addition modulo 26, A = 0).`, antworten: [c],
        erkl: `${w[0]} + ${k[0]} = ${w.charCodeAt(0) - 65} + ${k.charCodeAt(0) - 65} = ${w.charCodeAt(0) + k.charCodeAt(0) - 130}, mod 26 = ${c[0]}. Ganzes Wort: ${c}.` };
    } },
  { id: 'k26_021', burg: 26, kap: 82, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.5; Abiturvorbereitung 6.2.5 b',
    gen: (z) => {
      const b8 = (n) => n.toString(2).padStart(8, '0');
      const m = z.int(1, 255), k = z.int(1, 255), c = b8(m ^ k);
      return { frage: `Berechne den Geheimtext c = m XOR k für m = ${b8(m).slice(0, 4)} ${b8(m).slice(4)} und k = ${b8(k).slice(0, 4)} ${b8(k).slice(4)}.`,
        antworten: [c, `${c.slice(0, 4)} ${c.slice(4)}`], erkl: `XOR ergibt 1, wenn die beiden Bits verschieden sind: c = ${c.slice(0, 4)} ${c.slice(4)}. Noch einmal mit k verknüpft ergibt wieder m.` };
    } },
  { id: 'k26_022', burg: 26, kap: 82, stufe: 1, art: 'mehr', frage: 'Kreuze alle Bedingungen an, unter denen das One-Time-Pad perfekt sicher ist.',
    optionen: ['Der Schlüssel ist echt zufällig.', 'Der Schlüssel ist mindestens so lang wie die Nachricht.', 'Der Schlüssel wird nur ein einziges Mal verwendet.', 'Der Schlüssel wird geheim und sicher übergeben.', 'Das Verfahren selbst bleibt geheim.', 'Der Schlüssel ist ein sinnvolles deutsches Wort.'], richtig: [0, 1, 2, 3],
    erkl: 'Zufällig, lang genug, einmalig, geheim übergeben. Das Verfahren darf nach Kerckhoffs bekannt sein; ein sinnvolles Wort ist gerade nicht zufällig.', quelle: 'OPAL LB 8 8.5; Abiturvorbereitung 6.2.5 c' },
  { id: 'k26_023', burg: 26, kap: 82, stufe: 1, art: 'wahl', frage: 'Welches Vorgehen verletzt eine Bedingung des One-Time-Pads?',
    optionen: ['Derselbe Schlüsselblock wird für zwei kurze Nachrichten verwendet.', 'Der Schlüssel wird vorab auf einem USB-Stick persönlich übergeben.', 'Der Schlüssel ist länger als die Nachricht, der Rest wird danach vernichtet.', 'Der Schlüssel wird durch Würfeln erzeugt.'],
    erkl: 'Würfeln ist echter Zufall, ein zu langer Schlüssel schadet nicht. Ein zweimal verwendeter Schlüssel ist dagegen gefährlich: c₁ XOR c₂ = m₁ XOR m₂ – der Schlüssel fällt heraus.', quelle: 'Abiturvorbereitung 6.2.1 b; OPAL 8.5 Aufgabe 8.5.2' },
  { id: 'k26_024', burg: 26, kap: 82, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.4 Kasiski-Test',
    gen: (z) => {
      const ggt = (a, b) => (b ? ggt(b, a % b) : a);
      const L = z.int(3, 7);
      let m;
      do { m = [z.int(2, 9), z.int(2, 9), z.int(2, 9)]; } while (ggt(ggt(m[0], m[1]), m[2]) !== 1 || m[0] === m[1]);
      const d = m.map((x) => x * L);
      return { frage: `Im Vigenère-Geheimtext tauchen gleiche Buchstabenfolgen in den Abständen ${d.join(', ')} auf. Welche Schlüssellänge ist am wahrscheinlichsten?`,
        antworten: [String(L)], erkl: `Gleiche Klartextstellen ergeben nur dann gleiche Geheimtexte, wenn ihr Abstand ein Vielfaches der Schlüssellänge ist. ggT(${d.join(', ')}) = ${L}.` };
    } },
  { id: 'k26_025', burg: 26, kap: 82, stufe: 3, art: 'wahl', frage: 'Zwei Brieffreundinnen: „Als Schlüssel nehmen wir den Text unseres Lieblingsbuchs ab Seite 1. Der ist lang genug, und wir haben beide das Buch.“ Welche Beurteilung ist stichhaltig?',
    optionen: ['Unsicher: Buchtext ist weder zufällig noch einmalig.', 'Sicher: lang genug, also ein One-Time-Pad.', 'Sicher, solange niemand vom Buch weiß.', 'Unsicher, weil Bücher zu kurz sind.'],
    erkl: 'Buchtext hat häufige Buchstaben wie E und N, das Buch kann bekannt werden, und mehrere Briefe ab derselben Stelle benutzen den Schlüssel mehrfach. Prüfe den Vorschlag gegen alle vier Bedingungen: Länge passt, aber Zufall, Einmaligkeit und Geheimhaltung sind verletzt bzw. gefährdet.', quelle: 'Abiturvorbereitung 6.2.5 d' },
  { id: 'k26_026', burg: 26, kap: 82, stufe: 3, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.2 a (Entschlüsseln); OPAL 8.3',
    gen: (z) => {
      const w = z.wahl(['TREFFPUNKT', 'MORGENFRUEH', 'NORDTOR', 'SCHATZKARTE']), s = z.wahl(['ELBE', 'ROSE', 'MOND', 'LUFT']);
      const c = w.split('').map((x, i) => String.fromCharCode((x.charCodeAt(0) - 65 + s.charCodeAt(i % s.length) - 65) % 26 + 65)).join('');
      return { frage: `Entschlüssele den Vigenère-Geheimtext ${c} mit dem Schlüsselwort ${s}.`, antworten: [w],
        erkl: `Buchstabe für Buchstabe den Schlüsselbuchstaben abziehen (mod 26): ${c} → ${w}.` };
    } },
  { id: 'k26_027', burg: 26, kap: 82, stufe: 2, art: 'wahl', frage: 'Ein Programm verspricht: „Vigenère mit sechsstelligem Schlüsselwort – 26⁶ ≈ 3 · 10⁸ Schlüssel!“ Wie lange braucht ein Rechner mit 10⁹ Versuchen pro Sekunde, um alle durchzuprobieren?',
    optionen: ['weniger als eine Sekunde', 'etwa eine Stunde', 'etwa ein Jahr', 'mehrere Milliarden Jahre'],
    erkl: '3 · 10⁸ : 10⁹ = 0,3 s. Dazu kommen Kasiski-Test und Häufigkeitsanalyse, die gar nicht alle Schlüssel probieren müssen.', quelle: 'Abiturvorbereitung 6.2.2 d' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 83: Moderne Blockchiffren (AES)
  { id: 'k26_028', burg: 26, kap: 83, stufe: 1, art: 'reihe', frage: 'Bringe die drei Schritte einer Mini-AES-Runde in die richtige Reihenfolge.',
    teile: ['SubBytes: beide Hex-Ziffern über die S-Box ersetzen', 'Permutation: die beiden Hex-Ziffern tauschen', 'AddRoundKey: XOR mit dem Rundenschlüssel'],
    erkl: 'Ersetzen, vertauschen, mit dem Schlüssel verknüpfen – so wie in runde(byte_str, key_str). Das echte AES hat dieselben Bausteine, nur größer und mit mehr Runden.', quelle: 'OPAL LB 8 8.7 Mini-AES-8; Spiel fd2' },
  { id: 'k26_029', burg: 26, kap: 83, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.7 Mini-AES-8; Spiel fd1',
    code: `S-Box:  Eingabe 0 1 2 3 4 5 6 7 8 9 A B C D E F
        Ausgabe E 4 D 1 2 F B 8 3 A 6 C 5 9 0 7`,
    gen: (z) => {
      const S = 'E4D12FB83A6C5907', H = '0123456789ABCDEF', a = z.int(0, 15), b = z.int(0, 15);
      return { frage: `Was liefert sub_bytes_hex("${H[a]}${H[b]}")?`, antworten: [S[a] + S[b]], erkl: `Jede Hex-Ziffer einzeln über die S-Box: ${H[a]} → ${S[a]}, ${H[b]} → ${S[b]}.` };
    } },
  { id: 'k26_030', burg: 26, kap: 83, stufe: 2, art: 'zuordnen', frage: 'Ordne jedem Baustein von Mini-AES zu, wozu er dient.',
    paare: [['SubBytes (S-Box)', 'Konfusion: Zusammenhang zwischen Schlüssel und Geheimtext verschleiern'], ['Permutation', 'Diffusion: ein Bit wirkt auf viele Stellen'], ['AddRoundKey', 'den Schlüssel per XOR einbringen'], ['mehrere Runden', 'Wirkung von Konfusion und Diffusion verstärken']],
    erkl: 'Die S-Box ersetzt nichtlinear (Konfusion), das Vertauschen verteilt Änderungen (Diffusion), XOR bringt den Schlüssel ins Spiel. Erst viele Runden ergeben den Lawineneffekt.', quelle: 'OPAL LB 8 8.7 Konfusion und Diffusion; Spiel fd2v' },
  { id: 'k26_031', burg: 26, kap: 83, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.7 Beispiel 1 (Mini-AES-8); material aes.py',
    code: `S-Box:  Eingabe 0 1 2 3 4 5 6 7 8 9 A B C D E F
        Ausgabe E 4 D 1 2 F B 8 3 A 6 C 5 9 0 7`,
    gen: (z) => {
      const S = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7], H = '0123456789ABCDEF';
      const p = z.int(0, 255), k = z.int(1, 255), hi = p >> 4, lo = p & 15;
      const sub = (S[hi] << 4) | S[lo], perm = ((sub & 15) << 4) | (sub >> 4), c = perm ^ k;
      const hx = (n) => H[n >> 4] + H[n & 15];
      return { frage: `Mini-AES-8: Verschlüssele den Klartext ${hx(p)} mit dem Schlüssel ${hx(k)}: SubBytes (beide Hex-Ziffern über die S-Box), Permutation (beide Ziffern tauschen), AddRoundKey (XOR mit dem Schlüssel). Gib den Geheimtext als zwei Hex-Ziffern an.`,
        antworten: [hx(c)], erkl: `SubBytes: ${hx(p)} → ${hx(sub)}. Tauschen: ${hx(perm)}. XOR ${hx(k)}: ${hx(c)}. Entschlüsselt wird mit den Umkehroperationen in umgekehrter Reihenfolge.` };
    } },
  { id: 'k26_032', burg: 26, kap: 83, stufe: 2, art: 'wahl', frage: 'Eine Schule verschlüsselt jede Note (1 bis 6) einzeln als eigenen Block, immer mit demselben Schlüssel und ohne Zufall: Gleicher Klartext ergibt also immer denselben Geheimtext. Was kann ein Angreifer ohne Schlüssel herausfinden?',
    optionen: ['wer dieselbe Note hat', 'nichts, solange der Schlüssel geheim ist', 'den Schlüssel aus den Geheimtexten', 'nur die Zahl der Schüler'],
    erkl: 'Gleiche Klartextblöcke ergeben gleiche Geheimtextblöcke. Kennt der Angreifer eine einzige Note, kennt er alle gleichen. Darum mischt man bei echten Verfahren Zufall mit hinein (Betriebsmodus mit zufälligem Startwert).', quelle: 'OPAL LB 8 8.7 Beispiel 2' },
  // Ergänzt 2026-11-13 (Didaktik-Prüfung): Fehler finden auch in Krypto-Code
  { id: 'k26_063', burg: 26, kap: 80, stufe: 2, art: 'zeile', frage: 'verschiebe("y", 3) soll "b" liefern, liefert aber "|". Tippe die fehlerhafte Zeile an.',
    code: `def verschiebe(buchstabe, abstand):
    buchstabe = buchstabe.lower()
    start = ord('a')
    neuer_ascii = ord(buchstabe) - start + abstand + start
    return chr(neuer_ascii)`,
    fehler: [4], erkl: 'Es fehlt % 26: (ord(buchstabe) - start + abstand) % 26 + start. Ohne den Rest läuft es hinter z aus dem Alphabet hinaus.', quelle: 'OPAL LB 8 8.3; Spiel fa2' },
  { id: 'k26_064', burg: 26, kap: 82, stufe: 2, art: 'zeile', frage: 'vigenere_encrypt("ab cd", "xy") liefert ein anderes Ergebnis als die Rechnung von Hand, weil auch das Leerzeichen einen Schlüsselbuchstaben „verbraucht“. Tippe die Zeile an, die an der falschen Stelle steht.',
    code: `def vigenere_encrypt(plain_text, key):
    encrypted_text = ''
    j = 0
    for char in plain_text:
        j += 1
        if 'a' <= char.lower() <= 'z':
            shift = ord(key[(j - 1) % len(key)].lower()) - ord('a')
            encrypted_text += verschiebe(char, shift)
        else:
            encrypted_text += char
    return encrypted_text`,
    fehler: [5], erkl: 'Der Zähler j darf nur bei Buchstaben weiterzählen – j += 1 gehört in den if-Zweig.', quelle: 'OPAL LB 8 8.3 Vigenère; Spiel fc1' },
  { id: 'k26_065', burg: 26, kap: 84, stufe: 2, art: 'zeile', frage: 'rsa_schluessel(11, 13, 7) liefert ein d, mit dem das Entschlüsseln nicht klappt. Tippe die fehlerhafte Zeile an.',
    code: `def rsa_schluessel(p, q, e):
    n = p * q
    phi = p * q - 1
    d = modulares_inverses(e, phi)
    return [n, phi, d]`,
    fehler: [3], erkl: 'φ(n) = (p − 1) · (q − 1) = 10 · 12 = 120, nicht n − 1. Das Inverse von e muss modulo φ(n) gebildet werden.', quelle: 'OPAL LB 8 8.9 RSA; Spiel fe3' },
  { id: 'k26_066', burg: 26, kap: 84, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.9 (erweiterter euklidischer Algorithmus); Spiel fe2b',
    gen: (z) => {
      const ggt = (a, b) => (b ? ggt(b, a % b) : a);
      const erw = (a, b) => (b === 0 ? [a, 1, 0] : (([g, x, y]) => [g, y, x - Math.floor(a / b) * y])(erw(b, a % b)));
      let phi, e;
      do { phi = z.wahl([40, 48, 60, 72, 96, 120]); e = z.wahl([7, 11, 13, 17]); } while (ggt(phi, e) !== 1);
      const [, x, y] = erw(phi, e), d = ((y % phi) + phi) % phi;
      return { frage: `Der erweiterte Euklid liefert ${phi} · (${x}) + ${e} · (${y}) = 1. Welcher private Exponent d (0 < d < ${phi}) folgt daraus für e = ${e}?`,
        antworten: [String(d)], erkl: `Modulo ${phi} fällt ${phi} · (${x}) weg: ${e} · ${y} ≡ 1. Also d = ${y} mod ${phi} = ${d}.` };
    } },
  { id: 'k26_033', burg: 26, kap: 83, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.7 AddRoundKey; Spiel Kap. 83 xor_hex_digit',
    gen: (z) => {
      const H = '0123456789ABCDEF', a = z.int(1, 15), b = z.int(1, 15), b4 = (n) => n.toString(2).padStart(4, '0');
      return { frage: `Berechne die Hex-Ziffer ${H[a]} XOR ${H[b]}.`, antworten: [H[a ^ b]],
        erkl: `${H[a]} = ${b4(a)}, ${H[b]} = ${b4(b)}. Bitweise XOR: ${b4(a ^ b)} = ${H[a ^ b]}.` };
    } },
  { id: 'k26_034', burg: 26, kap: 83, stufe: 3, art: 'wahl', frage: 'Behauptung: „AES mit 128 Bit ist unsicherer als RSA mit 1024 Bit, weil der Schlüssel kürzer ist.“ Welche Stellungnahme ist richtig?',
    optionen: ['Falsch: Gegen RSA hilft Faktorisieren statt Probieren.', 'Richtig: Mehr Bits sind bei jedem Verfahren sicherer.', 'Richtig: Symmetrisch ist immer unsicherer.', 'Falsch: RSA ist immer unknackbar.'],
    erkl: 'Schlüssellängen verschiedener Verfahren sind nicht direkt vergleichbar: Gegen AES hilft nur Probieren (2¹²⁸) – RSA-1024 gilt heute als zu schwach. Bei RSA muss man nicht alle Schlüssel probieren, sondern n in Primfaktoren zerlegen. Deshalb braucht RSA viel längere Schlüssel für dieselbe Sicherheit.', quelle: 'Abiturvorbereitung 6.2.4 a; OPAL 8.8' },
  { id: 'k26_035', burg: 26, kap: 83, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.4 b',
    gen: (z) => {
      const n = z.int(5, 30);
      return { frage: `${n} Personen wollen paarweise vertraulich mit einem symmetrischen Verfahren schreiben. Jedes Paar braucht einen eigenen geheimen Schlüssel. Wie viele Schlüssel sind das?`,
        antworten: [String(n * (n - 1) / 2)], erkl: `Jede Person mit jeder anderen, jedes Paar einmal: ${n} · ${n - 1} / 2 = ${n * (n - 1) / 2}. Asymmetrisch braucht jede Person nur ein Schlüsselpaar.` };
    } },
  { id: 'k26_036', burg: 26, kap: 83, stufe: 1, art: 'wahl', frage: 'Welche Aussage über AES ist richtig?',
    optionen: ['AES ist eine symmetrische Blockchiffre mit einer Blockgröße von 128 Bit.', 'AES ist ein asymmetrisches Verfahren mit öffentlichem und privatem Schlüssel.', 'AES verschlüsselt jeden Buchstaben einzeln wie Caesar.', 'AES ist geheim, damit niemand es analysieren kann.'],
    erkl: 'Derselbe Schlüssel verschlüsselt und entschlüsselt. Die Daten werden in 128-Bit-Blöcke zerlegt; das Verfahren ist öffentlich (Kerckhoffs).', quelle: 'OPAL LB 8 8.7 AES' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 84: Öffentliche Schlüssel (Diffie-Hellman, RSA, hybrid)
  { id: 'k26_037', burg: 26, kap: 84, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.10 Diffie-Hellman',
    gen: (z) => {
      const [p, g] = z.wahl([[11, 2], [13, 2], [17, 3], [19, 2], [23, 5]]), a = z.int(2, 6);
      return { frage: `Diffie-Hellman mit p = ${p} und g = ${g}. Alice wählt geheim a = ${a}. Welchen Wert A = g^a mod p sendet sie?`,
        antworten: [String(g ** a % p)], erkl: `${g}^${a} = ${g ** a}, ${g ** a} mod ${p} = ${g ** a % p}.` };
    } },
  { id: 'k26_038', burg: 26, kap: 84, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.10 Beispiel 1; Aufgabe 8.10.4',
    gen: (z) => {
      const mp = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; } return r; };
      const [p, g] = z.wahl([[11, 2], [13, 2], [17, 3], [19, 2], [23, 5]]), a = z.int(2, p - 2), b = z.int(2, p - 2);
      const A = mp(g, a, p), B = mp(g, b, p), s = mp(B, a, p);
      return { frage: `Diffie-Hellman mit p = ${p}, g = ${g}. Alice wählt a = ${a}, Bob wählt b = ${b}. Welchen gemeinsamen Schlüssel s berechnen beide?`,
        antworten: [String(s)], erkl: `A = ${g}^${a} mod ${p} = ${A}, B = ${g}^${b} mod ${p} = ${B}. Alice: B^a mod p = ${B}^${a} mod ${p} = ${s}. Bob: A^b mod p = ${A}^${b} mod ${p} = ${mp(A, b, p)}.` };
    } },
  { id: 'k26_039', burg: 26, kap: 84, stufe: 2, art: 'wahl', frage: 'Mallory sitzt zwischen Alice und Bob, fängt A und B ab und schickt beiden stattdessen ihren eigenen Wert M. Was ist die Folge, und was hilft?',
    optionen: ['Mallory liest alles mit – Abhilfe: Werte signieren.', 'Nichts – Diffie-Hellman ist gegen alle Angriffe sicher.', 'Folge harmlos – ein größeres p hilft.', 'Alice und Bob merken es sofort.'],
    erkl: 'Mallory teilt mit jeder Seite einen eigenen Schlüssel und kann alles lesen und ändern. Abhilfe: Die DH-Werte authentisieren, z. B. mit einer Signatur des Servers (TLS). Diffie-Hellman schützt nur gegen passive Lauscher. Ohne Authentifizierung ist es anfällig für Man-in-the-Middle – daran ändert auch ein größeres p nichts.', quelle: 'OPAL LB 8 8.10 Beispiel 2; Aufgabe 8.10.4 c' },
  { id: 'k26_040', burg: 26, kap: 84, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.9 RSA (euklidischer Algorithmus); Spiel Kap. 84 ggt',
    gen: (z) => {
      const ggt = (a, b) => (b ? ggt(b, a % b) : a);
      const t = z.wahl([2, 3, 4, 6, 7, 9, 12]), a = t * z.int(5, 20), b = t * z.int(3, 15);
      return { frage: `Bestimme ggT(${a}, ${b}).`, antworten: [String(ggt(a, b))], erkl: `Euklid: ggT(a, b) = ggT(b, a mod b), bis der Rest 0 ist. Ergebnis: ${ggt(a, b)}.` };
    } },
  { id: 'k26_041', burg: 26, kap: 84, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.9 RSA (privater Exponent); Spiel Kap. 84 modulares_inverses',
    gen: (z) => {
      const ggt = (a, b) => (b ? ggt(b, a % b) : a);
      const phi = z.wahl([20, 24, 40, 48, 60, 72, 96, 120]);
      const es = [3, 5, 7, 11, 13, 17, 19, 23].filter((e) => e < phi && ggt(e, phi) === 1), e = z.wahl(es);
      let d = 1;
      while ((e * d) % phi !== 1) d++;
      return { frage: `Bestimme d mit ${e} · d mod ${phi} = 1 (0 < d < ${phi}).`, antworten: [String(d)],
        erkl: `${e} · ${d} = ${e * d} = ${Math.floor(e * d / phi)} · ${phi} + 1. Man findet d mit dem erweiterten euklidischen Algorithmus oder durch Probieren: Welches Vielfache von ${phi}, um 1 erhöht, ist durch ${e} teilbar?` };
    } },
  { id: 'k26_042', burg: 26, kap: 84, stufe: 2, art: 'wahl', frage: 'Für einen RSA-Schlüssel werden p = 5 und q = 13 gewählt. Welche Zahl ist als öffentlicher Exponent e zulässig?',
    optionen: ['35', '9', '10', '15'],
    erkl: 'φ(n) = 4 · 12 = 48 = 2⁴ · 3. e muss teilerfremd zu 48 sein: 9 und 15 haben den Teiler 3, 10 den Teiler 2. 35 = 5 · 7 ist teilerfremd – e muss keine Primzahl sein.', quelle: 'Abiturvorbereitung 6.2.1 a' },
  { id: 'k26_043', burg: 26, kap: 84, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.9 RSA; Abiturvorbereitung 6.2.1 d',
    gen: (z) => {
      const ggt = (a, b) => (b ? ggt(b, a % b) : a);
      let p, q, phi, e;
      do { [p, q] = z.mische([5, 7, 11, 13]).slice(0, 2); phi = (p - 1) * (q - 1); e = z.wahl([5, 7, 11]); } while (ggt(e, phi) !== 1);
      let d = 1;
      while ((e * d) % phi !== 1) d++;
      return { frage: `RSA mit p = ${p}, q = ${q} und e = ${e}. Bestimme den privaten Exponenten d.`, antworten: [String(d)],
        erkl: `n = ${p * q}, φ(n) = ${p - 1} · ${q - 1} = ${phi}. Gesucht ist d mit ${e} · d mod ${phi} = 1: d = ${d} (${e} · ${d} = ${e * d}).` };
    } },
  { id: 'k26_044', burg: 26, kap: 84, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.1 d (schrittweise multiplizieren); OPAL 8.9',
    gen: (z) => {
      const [n, e] = z.wahl([[91, 5], [55, 3], [77, 7], [85, 3], [143, 7]]), m = z.int(2, 12);
      let r = 1;
      const schritte = [];
      for (let i = 0; i < e; i++) { r = r * m % n; schritte.push(r); }
      return { frage: `Öffentlicher Schlüssel (e, n) = (${e}, ${n}). Verschlüssele m = ${m}: c = m^e mod n.`, antworten: [String(r)],
        erkl: `Nacheinander mit ${m} multiplizieren und jedes Mal mod ${n} rechnen: ${schritte.join(' → ')}. Also c = ${r}.` };
    } },
  { id: 'k26_045', burg: 26, kap: 84, stufe: 3, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.1 d (fortgesetztes Quadrieren); OPAL 8.9',
    gen: (z) => {
      const mp = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; } return r; };
      const [n, e, d] = z.wahl([[91, 5, 29], [55, 3, 27], [77, 7, 43], [85, 3, 43], [33, 3, 7]]), m = z.int(2, Math.min(20, n - 2)), c = mp(m, e, n);
      return { frage: `Privater Schlüssel (d, n) = (${d}, ${n}). Entschlüssele den Geheimtext c = ${c}: m = c^d mod n.`, antworten: [String(m)],
        erkl: `d = ${d} in Zweierpotenzen zerlegen (${d.toString(2)} binär), c², c⁴, c⁸ … jeweils mod ${n} berechnen und die passenden Potenzen multiplizieren. Ergebnis m = ${m}. Probe: ${m}^${e} mod ${n} = ${c}.` };
    } },
  { id: 'k26_046', burg: 26, kap: 84, stufe: 1, art: 'wahl', frage: 'Mia will Ben mit RSA eine vertrauliche Nachricht schicken. Mit welchem Schlüssel verschlüsselt sie?',
    optionen: ['mit Bens öffentlichem Schlüssel', 'mit Bens privatem Schlüssel', 'mit ihrem eigenen privaten Schlüssel', 'mit ihrem eigenen öffentlichen Schlüssel'],
    erkl: 'Den öffentlichen Schlüssel darf jeder kennen. Entschlüsseln kann nur Ben mit seinem privaten Schlüssel. (Beim Signieren ist es umgekehrt.)', quelle: 'OPAL LB 8 8.8 Asymmetrische Verfahren' },
  { id: 'k26_047', burg: 26, kap: 84, stufe: 2, art: 'reihe', frage: 'Eine Redaktion schickt eine 40-MB-Druckdatei hybrid verschlüsselt an die Druckerei. Bringe die Schritte in die richtige Reihenfolge.',
    teile: ['Redaktion erzeugt einen zufälligen Sitzungsschlüssel', 'Datei mit AES und dem Sitzungsschlüssel verschlüsseln, Sitzungsschlüssel mit dem öffentlichen RSA-Schlüssel der Druckerei verschlüsseln', 'beides an die Druckerei senden', 'Druckerei entschlüsselt den Sitzungsschlüssel mit ihrem privaten Schlüssel', 'Druckerei entschlüsselt die Datei mit AES und dem Sitzungsschlüssel'],
    erkl: 'Hybrid: Die großen Daten verschlüsselt das schnelle symmetrische Verfahren, den kurzen Schlüssel das asymmetrische – so löst man zugleich das Geschwindigkeits- und das Schlüsselverteilungsproblem.', quelle: 'Abiturvorbereitung 6.2.4 c; OPAL 8.11 Hybride Verfahren' },
  { id: 'k26_048', burg: 26, kap: 84, stufe: 3, art: 'wahl', frage: 'Ein IT-Dienstleister: „Wir verschlüsseln jeden Befund direkt mit RSA und 2048 Bit. Das ist für alles das Beste.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Sicher, aber zu langsam – besser hybrid.', 'Stimmt: RSA ist schneller als AES.', 'Falsch: Ein Laptop knackt es in Minuten.', 'Stimmt: Alle Schutzziele sind erfüllt.'],
    erkl: 'RSA-2048 ist sicher, aber viel langsamer als AES und kann nur kurze Blöcke verschlüsseln – Praxis: hybrid. Verschlüsselung allein sichert keine Authentizität. Gib zuerst in einem Punkt recht (Sicherheit von RSA-2048), zeige dann, warum hybrid verschlüsselt wird, und schließe mit einem Urteil.', quelle: 'Abiturvorbereitung 6.2.1 e' },
  // Ersetzt 2026-11-14 (Didaktik-Prüfung: Quantencomputer werden im Spiel nicht gelehrt) – Fehler finden im RSA-Knacker (Spiel fe4)
  { id: 'k26_049', burg: 26, kap: 84, stufe: 3, art: 'zeile', frage: 'knacken(143, 7, c) soll aus dem Geheimtext c den Klartext m zurückgewinnen. p, q, phi und d stimmen, das Ergebnis aber nicht. Tippe die fehlerhafte Zeile an.',
    code: `def knacken(n, e, c):
    p = 2
    while n % p != 0:
        p = p + 1
    q = n // p
    phi = (p - 1) * (q - 1)
    d = modulares_inverses(e, phi)
    return pow(c, e, n)`,
    fehler: [8], erkl: 'Entschlüsselt wird mit dem privaten Exponenten: m = c^d mod n, also pow(c, d, n). Mit e würde man nur noch einmal verschlüsseln. Für 143 = 11 · 13 ist phi = 120 und d = 103.', quelle: 'OPAL LB 8 8.9 Aufgabe 8.9.6 (zu kleiner Schlüssel); Spiel fe4' },
  { id: 'k26_050', burg: 26, kap: 84, stufe: 3, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.9 d; OPAL 8.9 Aufgabe 8.9.6 (zu kleiner Schlüssel); Spiel Kap. 84 knacken',
    gen: (z) => {
      const [p, q, e] = z.wahl([[5, 11, 3], [3, 11, 7], [5, 7, 5], [7, 11, 7], [5, 13, 5]]), n = p * q, phi = (p - 1) * (q - 1);
      let d = 1;
      while ((e * d) % phi !== 1) d++;
      return { frage: `Der öffentliche Schlüssel lautet (e, n) = (${e}, ${n}). Knacke ihn: Bestimme den privaten Exponenten d.`, antworten: [String(d)],
        erkl: `${n} = ${p} · ${q} (Probedivision). Dann φ(n) = ${p - 1} · ${q - 1} = ${phi} und d mit ${e} · d mod ${phi} = 1: d = ${d}. Bei 2048 Bit ist genau dieses Faktorisieren praktisch unmöglich.` };
    } },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 85: Hash, Signatur, Anmeldung
  { id: 'k26_051', burg: 26, kap: 85, stufe: 1, art: 'zuordnen', frage: 'Ordne jeder Eigenschaft einer kryptographischen Hashfunktion die Beschreibung zu.',
    paare: [['Einwegeigenschaft', 'Zu einem Hashwert findet man praktisch keine passende Eingabe.'], ['schwache Kollisionsresistenz', 'Zu einer gegebenen Eingabe findet man keine zweite mit gleichem Hashwert.'], ['starke Kollisionsresistenz', 'Man findet überhaupt kein Paar verschiedener Eingaben mit gleichem Hashwert.'], ['Lawineneffekt', 'Eine winzige Änderung ändert etwa die Hälfte der Bits des Hashwerts.']],
    erkl: 'Kollisionen gibt es immer (Schubfachprinzip: unendlich viele Eingaben, endlich viele Hashwerte) – man darf sie nur nicht gezielt finden können.', quelle: 'OPAL LB 8 8.12 Hashfunktionen' },
  { id: 'k26_052', burg: 26, kap: 85, stufe: 2, art: 'wahl', frage: 'Ein Fälscher will zu einem echten, signierten Gutachten ein verändertes Gutachten mit demselben Hashwert herstellen. Welche Eigenschaft soll genau das verhindern?',
    optionen: ['schwache Kollisionsresistenz', 'Einwegeigenschaft', 'Lawineneffekt', 'feste Länge des Hashwerts'],
    erkl: 'Das echte Dokument ist vorgegeben, gesucht ist ein zweites mit gleichem Hashwert. Die Einwegeigenschaft betrifft dagegen das Finden irgendeiner Eingabe zu einem Hashwert.', quelle: 'Abiturvorbereitung 6.2.9 b' },
  { id: 'k26_053', burg: 26, kap: 85, stufe: 1, art: 'wahl', frage: 'Welche Aussage zur digitalen Signatur ist richtig?',
    optionen: ['Absender signiert privat, alle prüfen öffentlich.', 'Absender signiert mit dem öffentlichen Schlüssel der Empfängerin.', 'Die Signatur macht das Dokument unlesbar für andere.', 'Empfängerin prüft mit ihrem privaten Schlüssel.'],
    erkl: 'Nur der Absender besitzt den privaten Schlüssel – deshalb kann nur er signieren. Prüfen muss jeder können.', quelle: 'OPAL LB 8 8.13 Digitale Signatur; Abiturvorbereitung 6.2.9 a' },
  { id: 'k26_054', burg: 26, kap: 85, stufe: 2, art: 'wahl', frage: '', optionen: [], erkl: '', quelle: 'Abiturvorbereitung 6.2.9 c; OPAL 8.13 Aufgabe 8.13.7',
    gen: (z) => {
      const mp = (b, e, m) => { let r = 1; b %= m; while (e > 0) { if (e & 1) r = r * b % m; b = b * b % m; e >>= 1; } return r; };
      const h = z.int(2, 50), echt = z.wahl([true, false]);
      let s = mp(h, 27, 55);
      if (!echt) { do { s = z.int(2, 54); } while (mp(s, 3, 55) === h); }
      const w = mp(s, 3, 55), s2 = s * s % 55;
      return { frage: `Mini-RSA: Der öffentliche Schlüssel des Absenders ist (e, n) = (3, 55). Du berechnest aus dem empfangenen Dokument den Hashwert h = ${h}. Beigefügt ist die Signatur s = ${s}. Ist das Dokument echt und unverändert?`,
        optionen: echt ? [`ja, denn s³ mod 55 = ${w} = h`, 'nein, denn s³ mod 55 ≠ h'] : [`nein, denn s³ mod 55 = ${w} ≠ h`, 'ja, denn s³ mod 55 = h'],
        erkl: `Geprüft wird mit dem öffentlichen Schlüssel: ${s}² mod 55 = ${s2}, mal ${s} mod 55 = ${w}. ${echt ? 'Das stimmt mit h überein.' : `Erwartet wäre ${h} – Dokument verändert oder Signatur gefälscht.`}` };
    } },
  { id: 'k26_055', burg: 26, kap: 85, stufe: 1, art: 'wahl', frage: 'Ein Schulportal speichert Passwörter als Hashwert mit einem zufälligen Salt pro Benutzer. Was bewirkt das Salt?',
    optionen: ['Gleiche Passwörter ergeben verschiedene Hashwerte.', 'Man kann das Passwort damit zurückrechnen.', 'Es muss geheim bleiben, sonst ist es nutzlos.', 'Damit braucht man keine langsame Hashfunktion.'],
    erkl: 'Vorberechnete Tabellen (Rainbow Tables) werden so nutzlos. Das Salt wird offen neben dem Hashwert gespeichert. Gegen gezieltes Durchprobieren eines einzelnen Kontos braucht man zusätzlich eine absichtlich langsame Passwort-Hashfunktion (bcrypt, Argon2).', quelle: 'OPAL LB 8 8.12 Beispiel 2' },
  { id: 'k26_056', burg: 26, kap: 85, stufe: 1, art: 'wahl', frage: 'Welches Anmeldeverfahren ist eine echte Zwei-Faktor-Authentifizierung?',
    optionen: ['Passwort und Code aus einer Authenticator-App', 'Passwort und Antwort auf eine Sicherheitsfrage', 'zwei verschiedene Passwörter', 'Benutzername und Passwort'],
    erkl: 'Die Faktoren müssen aus verschiedenen Kategorien stammen: Wissen (Passwort), Besitz (Handy mit App), Sein (Fingerabdruck). Sicherheitsfrage und zweites Passwort sind beide Wissen.', quelle: 'Abiturvorbereitung 6.2.10 b; OPAL 8.14 Authentifizierung' },
  { id: 'k26_057', burg: 26, kap: 85, stufe: 1, art: 'wahl', frage: 'Das Portal einer Fahrschule liegt unter portal.fahrschule-kupplung.example. Eine Mail fordert auf, Zugangsdaten unter https://fahrschule-kupplung.login-check.example zu bestätigen. Woran erkennt man am sichersten, dass es Phishing ist?',
    optionen: ['Der Link führt auf eine fremde Domain.', 'Die Seite zeigt kein Schloss-Symbol.', 'Die Mail hat gar keinen Anhang.', 'Gar nicht – sie kam an die richtige Adresse.'],
    erkl: 'Der Link führt auf login-check.example, nicht auf die Domain der Fahrschule. Adressen von rechts nach links lesen: Entscheidend ist die Domain direkt vor der Endung. Ein Schloss-Symbol bekommt auch eine Betrugsseite.', quelle: 'Abiturvorbereitung 6.2.10 a' },
  { id: 'k26_058', burg: 26, kap: 85, stufe: 3, art: 'wahl', frage: 'Die Fahrschule verschickt jetzt nach dem Login einen SMS-Code. Der Inhaber: „Seitdem kann uns Phishing egal sein.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Zu einfach: Codes lassen sich in Echtzeit mitfischen.', 'Stimmt: Mit zwei Faktoren ist alles sicher.', 'Falsch: SMS-Codes bringen gar nichts.', 'Stimmt: Phishing betrifft nie Codes.'],
    erkl: 'Ein abgefischtes Passwort allein reicht nicht mehr – aber eine gefälschte Seite kann Passwort und Code in Echtzeit ans echte Portal weiterleiten. Phishing-resistent sind z. B. Passkeys. Gib in einem Punkt recht, zeige dann den Echtzeit-Angriff bzw. Social Engineering per Anruf und schließe mit einem Urteil.', quelle: 'Abiturvorbereitung 6.2.10 c; OPAL 8.14' },
  // Ersetzt 2026-11-14 (Didaktik-Prüfung: inkrementelle/differenzielle Sicherung wird im Spiel nicht gelehrt) – Mini-Hash von Hand (Spiel ff1)
  { id: 'k26_059', burg: 26, kap: 85, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 8 8.12 Hashfunktionen; Spiel ff1 mini_hash',
    gen: (z) => {
      const w = z.wahl(['ab', 'ba', 'tor', 'rot', 'ei', 'ie', 'bad', 'dab']);
      const teile = [...w].map((c, i) => (i + 1) * c.charCodeAt(0)), h = teile.reduce((s, t) => s + t, 0) % 997;
      return { frage: `Berechne mini_hash("${w}"). Es gilt ord("a") = 97, ord("b") = 98, … ord("z") = 122.`,
        code: 'def mini_hash(text):\n    summe = 0\n    for i in range(len(text)):\n        summe += (i + 1) * ord(text[i])\n    return summe % 997',
        antworten: [String(h)], erkl: `${[...w].map((c, i) => `${i + 1} · ${c.charCodeAt(0)}`).join(' + ')} = ${teile.join(' + ')} = ${teile.reduce((s, t) => s + t, 0)}, mod 997 = ${h}. Dreht man die Buchstaben um, ändert sich der Hash – die Position zählt mit.` };
    } },
  { id: 'k26_060', burg: 26, kap: 85, stufe: 1, art: 'wahl', frage: 'Ein Server hat zwei gespiegelte Festplatten (RAID 1). Wovor schützt das nicht?',
    optionen: ['vor versehentlichem Löschen', 'vor dem Ausfall einer Festplatte', 'vor einer Betriebsunterbrechung, wenn eine Platte defekt wird', 'RAID 1 schützt vor allem.'],
    erkl: 'Eine Löschung landet sofort auf beiden Platten. RAID erhöht die Verfügbarkeit bei Plattendefekten, ersetzt aber keine Datensicherung. Dazu die 3-2-1-Regel: 3 Kopien, 2 Medien, 1 außer Haus.', quelle: 'OPAL LB 8 8.15 Datensicherung und RAID; Abiturvorbereitung 6.2.8' },
  { id: 'k26_061', burg: 26, kap: 85, stufe: 3, art: 'mehr', frage: 'Ein Auktionshaus verschickt Gutachten digital signiert (nicht verschlüsselt). Kreuze alle Schutzziele an, die die Signatur sichert.',
    optionen: ['Integrität', 'Authentizität', 'Verbindlichkeit', 'Vertraulichkeit', 'Verfügbarkeit'], richtig: [0, 1, 2],
    erkl: 'Die Signatur zeigt, dass das Gutachten unverändert ist und vom Auktionshaus stammt – und das Auktionshaus kann es nicht abstreiten. Lesen kann das PDF aber jeder; dafür müsste man zusätzlich verschlüsseln.', quelle: 'Abiturvorbereitung 6.2.9 e; OPAL 8.13' },
  { id: 'k26_062', burg: 26, kap: 85, stufe: 2, art: 'wahl', frage: 'Neben einer Download-Datei steht auf demselben Spiegelserver ihr SHA-256-Hashwert. Was beweist ein übereinstimmender Hashwert?',
    optionen: ['Nur, dass die Datei dem Stand auf dem Server entspricht (z. B. kein Übertragungsfehler).', 'Dass die Datei garantiert vom Hersteller stammt.', 'Dass die Datei verschlüsselt übertragen wurde.', 'Dass die Datei virenfrei ist.'],
    erkl: 'Wer den Server kontrolliert, kann Datei und Hashwert zugleich ersetzen. Ein Hash allein liefert keine Authentizität, weil jeder ihn berechnen kann. Erst mit einem Schlüssel (MAC, Signatur) oder über einen sicheren Kanal (HTTPS-Seite des Herstellers) wird er vertrauenswürdig.', quelle: 'OPAL LB 8 8.12 Hashfunktionen und Schutzziele' },
  { id: 'k26_068', burg: 26, kap: 80, stufe: 1, art: 'zeile', frage: 'verschiebe soll einen Kleinbuchstaben im Alphabet zyklisch verschieben (Caesar). Bei „z“ mit Abstand 1 kommt aber nicht „a“ heraus. Tippe die falsche Zeile an.',
    code: "def verschiebe(buchstabe, abstand):\n    buchstabe = buchstabe.lower()\n    start = ord('a')\n    neuer_ascii = (ord(buchstabe) - start + abstand) % 25 + start\n    return chr(neuer_ascii)",
    fehler: [4], erkl: 'Das Alphabet hat 26 Buchstaben, also rechnet man modulo 26. Mit % 25 landet „z“ (Nummer 25) plus 1 bei 26 % 25 = 1, also bei „b“.', quelle: 'Taubenschlag fa2, OPAL LB 8 Caesar-Chiffre' },
  { id: 'k26_069', burg: 26, kap: 81, stufe: 2, art: 'zeile', frage: 'haeufigkeiten soll zählen, wie oft jeder Buchstabe vorkommt. Für „ABA“ liefert es aber {A: 3, B: 2}. Tippe die falsche Zeile an.',
    code: "def haeufigkeiten(text):\n    zaehler = {}\n    for z in text.upper():\n        if 'A' <= z <= 'Z':\n            zaehler[z] = zaehler.get(z, 1) + 1\n    return zaehler",
    fehler: [5], erkl: 'Beim ersten Vorkommen gibt .get den Startwert zurück – der muss 0 sein, sonst zählt jeder Buchstabe einmal zu viel.', quelle: 'Taubenschlag fb1, OPAL LB 8 Häufigkeitsanalyse' },
  { id: 'k26_070', burg: 26, kap: 82, stufe: 2, art: 'zeile', frage: 'vigenere_encrypt soll den Schlüssel Buchstabe für Buchstabe wiederholen. Mit dem Schlüssel „abc“ wird aber nur jeder dritte Buchstabe richtig verschlüsselt. Tippe die falsche Zeile an.',
    code: "def vigenere_encrypt(plain_text, key):\n    encrypted_text = ''\n    j = 0\n    for char in plain_text:\n        key_char = key[j % len(key)]\n        shift = ord(key_char) - ord('a')\n        encrypted_text += verschiebe(char, shift)\n        j += len(key)\n    return encrypted_text",
    fehler: [8], erkl: 'Der Zähler j muss nach jedem Buchstaben um 1 weiterzählen. Mit j += len(key) ist j % len(key) immer 0 – es wird immer der erste Schlüsselbuchstabe benutzt.', quelle: 'Taubenschlag fc1, OPAL LB 8 Vigenère' },
  { id: 'k26_071', burg: 26, kap: 84, stufe: 2, art: 'zeile', frage: 'modulares_inverses(a, m) soll das d mit a · d mod m = 1 finden (für RSA). Tippe die falsche Zeile an.',
    code: 'def modulares_inverses(a, m):\n    for i in range(1, m):\n        if (a * i) % m == 0:\n            return i\n    return None',
    fehler: [3], erkl: 'Gesucht ist das Inverse: a · i mod m muss 1 ergeben, nicht 0. Mit == 0 findet man ein Vielfaches von m.', quelle: 'Taubenschlag fe2, OPAL LB 8 RSA' },
  { id: 'k26_072', burg: 26, kap: 85, stufe: 3, art: 'zeile', frage: 'Beim Registrieren wird hash_wert(salt + passwort) gespeichert, als Eintrag „salt:hash“. Die Anmeldung klappt aber nie. Tippe die falsche Zeile an.',
    code: 'def anmelden(passwort, eintrag):\n    salt = eintrag.split(":")[0]\n    gespeichert = eintrag.split(":")[1]\n    pruef = str(hash_wert(passwort))\n    return pruef == gespeichert',
    fehler: [4], erkl: 'Beim Prüfen muss derselbe Salt vor das Passwort: hash_wert(salt + passwort). Ohne Salt entsteht ein ganz anderer Hashwert.', quelle: 'Taubenschlag ff2, OPAL LB 8 Passwörter mit Salt' },
);
