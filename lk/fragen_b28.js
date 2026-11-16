'use strict';
// 🗝️ Kerker-Fragen Burg 28 (LK Technik) – Quellen: OPAL LK_INF_LB1 „Technische Informatik“ (1.1–1.4 Zahlen und Zeichen,
// 2.1–2.8 Boolesche Algebra, 3.1–3.8 Schaltnetze, 4.1–4.3 Rechnerarchitektur, 6.2 Übungsstunde zur Klausur mit Stationen 1–6),
// OPAL LK_INF_Abiturvorbereitung 1.1 „Zahlen, Logik, Schaltnetze und Rechner“ (Aufgaben 1.1.1–1.1.11), Lehrplan Sachsen LK LB 1.
// Kapitel 100–104 sowie Zusatzkapitel 162 (Huffman), 163 (Standardschaltnetze/KV), 164 (Rechnerkennzahlen) aus plus_lk_b.js.
KERKER_FRAGEN.push(
  // ---------- Kapitel 100: Zahlen im Rechner ----------
  { id: 'k28_001', burg: 28, kap: 100, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.1 Zahlenformate',
    gen: (z) => { const n = z.int(20, 250); return { frage: `Wandle die Dezimalzahl ${n} in eine Binärzahl um.`, antworten: [n.toString(2)], erkl: `${n} = ${n.toString(2)}₂ (fortlaufend durch 2 teilen, Reste von unten nach oben lesen).` }; } },
  { id: 'k28_002', burg: 28, kap: 100, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.1, Abiturvorbereitung 1.1.4 a',
    gen: (z) => {
      const n = z.int(16, 255), h = n.toString(16).toUpperCase().padStart(2, '0');
      return { frage: `Ein Byte kommt als ${h} (hexadezimal) an. Welche Dezimalzahl ohne Vorzeichen ist das?`, antworten: [String(n)],
        erkl: `${h} = ${parseInt(h[0], 16)} · 16 + ${parseInt(h[1], 16)} = ${n}.` };
    } },
  { id: 'k28_003', burg: 28, kap: 100, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.1 Zahlenformate',
    gen: (z) => {
      const n = z.int(16, 255), b = n.toString(2).padStart(8, '0'), h = n.toString(16).toUpperCase();
      return { frage: `Wandle die Binärzahl ${b.slice(0, 4)} ${b.slice(4)} in eine Hexadezimalzahl um.`, antworten: [h, `0x${h}`],
        erkl: `Je vier Bit ergeben eine Hexziffer: ${b.slice(0, 4)} = ${h.padStart(2, '0')[0]}, ${b.slice(4)} = ${h.padStart(2, '0')[1]}.` };
    } },
  { id: 'k28_004', burg: 28, kap: 100, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.2 Zweierkomplement, Abiturvorbereitung 1.1.3 a',
    gen: (z) => {
      const x = z.int(2, 127), p = x.toString(2).padStart(8, '0'), inv = [...p].map((c) => (c === '0' ? '1' : '0')).join(''), r = (256 - x).toString(2);
      return { frage: `Gib −${x} im 8-Bit-Zweierkomplement an.`, antworten: [r, `${r.slice(0, 4)} ${r.slice(4)}`],
        erkl: `${x} = ${p}, alle Bits umkehren: ${inv}, plus 1: ${r}. Probe: −128 + ${256 - x - 128} = −${x}.` };
    } },
  { id: 'k28_005', burg: 28, kap: 100, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.2, Übungsstunde Station 1.3',
    gen: (z) => {
      const n = z.int(128, 255), b = n.toString(2);
      return { frage: `Ein Byte im 8-Bit-Zweierkomplement lautet ${b.slice(0, 4)} ${b.slice(4)}. Welche Dezimalzahl ist das?`, antworten: [String(n - 256), `−${256 - n}`],
        erkl: `Das höchste Bit hat den Stellenwert −128: −128 + ${n - 128} = ${n - 256}.` };
    } },
  { id: 'k28_006', burg: 28, kap: 100, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.1 a, Übungsstunde Station 1 Zusatz',
    gen: (z) => {
      const n = z.int(4, 12), h = 2 ** (n - 1), klein = z.wahl([true, false]);
      return { frage: `Welches ist die ${klein ? 'kleinste' : 'größte'} ganze Zahl im ${n}-Bit-Zweierkomplement?`,
        antworten: klein ? [String(-h), `−${h}`] : [String(h - 1)],
        erkl: `Von −2^${n - 1} bis 2^${n - 1} − 1. Es gibt eine negative Zahl mehr, weil die 0 ein Muster mit führender 0 belegt.` };
    } },
  { id: 'k28_007', burg: 28, kap: 100, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.3 b, LB1 1.2',
    gen: (z) => {
      const a = z.int(-128, 127), b = z.wahl([z.int(-128, 127), z.int(60, 127), z.int(-128, -60)]), s = a + b, r = ((s + 128) % 256 + 256) % 256 - 128;
      return { frage: `Ein 8-Bit-Register (Zweierkomplement) enthält ${a}. Es wird ${b} addiert. Welche Dezimalzahl steht danach im Register?`, antworten: r < 0 ? [String(r), `−${-r}`] : [String(r)],
        erkl: s === r ? `${a} + ${b} = ${s} liegt im Bereich −128 bis 127 – kein Überlauf.` : `Die richtige Summe ${s} liegt außerhalb von −128 … 127. Das Register behält nur die unteren 8 Bit: ${s} ${s > 127 ? '− 256' : '+ 256'} = ${r} (Überlauf).` };
    } },
  { id: 'k28_008', burg: 28, kap: 100, stufe: 3, art: 'wahl', frage: 'Woran erkennt man beim Addieren zweier 8-Bit-Zahlen im Zweierkomplement einen Überlauf?',
    optionen: ['Beide Summanden haben dasselbe Vorzeichenbit, das Ergebnis hat ein anderes', 'Aus der höchsten Stelle entsteht ein Übertrag in die 9. Stelle', 'Das Ergebnis ist negativ', 'Einer der Summanden ist negativ'],
    erkl: 'Ein Übertrag in die 9. Stelle ist kein Überlauf: −74 + 93 erzeugt ihn, und 19 stimmt. Positiv + positiv = negativ (oder negativ + negativ = positiv) zeigt den Überlauf.', quelle: 'OPAL LB1 1.2, Abiturvorbereitung 1.1.3 b' },
  { id: 'k28_009', burg: 28, kap: 100, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.1 c (fremde Basis)',
    gen: (z) => {
      const n = z.int(40, 300), b = z.wahl([4, 5, 7]);
      return { frage: `Stelle die Dezimalzahl ${n} im System mit der Basis ${b} dar.`, antworten: [n.toString(b)],
        erkl: `Fortlaufend durch ${b} teilen, Reste von unten lesen: ${n} = ${n.toString(b)}₍${b}₎. Probe mit den Stellenwerten 1, ${b}, ${b * b}, ${b ** 3}.` };
    } },
  { id: 'k28_010', burg: 28, kap: 100, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.3 Festkommazahlen, Abiturvorbereitung 1.1.4 b',
    gen: (z) => {
      const k = z.int(1, 255), b = k.toString(2).padStart(8, '0'), w = k / 16;
      return { frage: `Festkommazahl ohne Vorzeichen mit 4 Bit vor und 4 Bit nach dem Komma: Welchen Wert hat ${b.slice(0, 4)} ${b.slice(4)}?`, antworten: [String(w)],
        erkl: `Ganzzahlteil ${b.slice(0, 4)} = ${Math.floor(w)}, Bruchteil ${b.slice(4)} mit den Stellenwerten ½, ¼, ⅛, 1/16 = ${(k % 16) / 16}. Zusammen ${String(w).replace('.', ',')}.` };
    } },
  { id: 'k28_011', burg: 28, kap: 100, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.3, Abiturvorbereitung 1.1.4 c',
    gen: (z) => {
      const k = z.int(17, 250), w = String(k / 16).replace('.', ','), b = k.toString(2).padStart(8, '0');
      return { frage: `Stelle ${w} als Festkommazahl mit 4 Bit vor und 4 Bit nach dem Komma dar (8 Bit).`, antworten: [b, `${b.slice(0, 4)} ${b.slice(4)}`, `${b.slice(0, 4)},${b.slice(4)}`],
        erkl: `Ganzzahlteil und Bruchteil getrennt umwandeln (Bruchteil: fortlaufend mal 2): ${b.slice(0, 4)},${b.slice(4)}.` };
    } },
  { id: 'k28_012', burg: 28, kap: 100, stufe: 2, art: 'mehr', frage: 'Kreuze alle Zahlen an, die als Binärbruch exakt (mit endlich vielen Nachkommabits) darstellbar sind.',
    optionen: ['0,375', '0,1', '0,8125', '0,2', '0,5'], richtig: [0, 2, 4],
    erkl: 'Exakt darstellbar ist ein Bruch genau dann, wenn sein gekürzter Nenner eine Zweierpotenz ist: 3/8, 13/16, 1/2. 0,1 = 1/10 und 0,2 = 1/5 werden periodisch.', quelle: 'OPAL LB1 6.2 Übungsstunde, Hilfekarte H2' },
  { id: 'k28_013', burg: 28, kap: 100, stufe: 3, art: 'wahl', frage: 'Ein Mitschüler will Wasserstände auf 0,1 cm genau als Festkommazahl speichern, „denn mit genügend Nachkommabits ist 0,1 exakt darstellbar“. Beurteile die Begründung.',
    optionen: ['Falsch: 0,1 ist binär periodisch, mehr Bits verkleinern nur den Fehler', 'Richtig, ab 10 Nachkommabits ist 0,1 exakt darstellbar', 'Richtig, weil 0,1 im Dezimalsystem endlich viele Stellen hat', 'Falsch, weil Festkommazahlen nur ganze Zahlen speichern können'],
    erkl: '0,1 = 1/10, der Nenner 10 ist keine Zweierpotenz. Mit n Nachkommabits sind nur Vielfache von 1/2ⁿ darstellbar. Abhilfe wäre z. B., in Millimetern als ganze Zahl zu speichern.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 1.7' },

  // ---------- Kapitel 101: Zeichen kodieren ----------
  { id: 'k28_014', burg: 28, kap: 101, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 1.4 Zeichenkodierung',
    gen: (z) => {
      const gross = z.wahl([true, false]), i = z.int(0, 25), c = String.fromCharCode((gross ? 65 : 97) + i);
      return { frage: `Welchen ASCII-Code (dezimal) hat das Zeichen „${c}“? (Es gilt „A“ = 65 und „a“ = 97.)`, antworten: [String(c.charCodeAt(0))],
        erkl: `„${c}“ ist der ${i + 1}. Buchstabe: ${gross ? 65 : 97} + ${i} = ${c.charCodeAt(0)}.` };
    } },
  { id: 'k28_015', burg: 28, kap: 101, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.11 b, LB1 1.4',
    gen: (z) => {
      const w = z.wahl(['Kern', 'Byte', 'Takt', 'Code', 'Bus', 'Lampe', 'Bit']);
      const hx = [...w].map((c) => c.charCodeAt(0).toString(16).toUpperCase()).join(' ');
      return { frage: `Decodiere die Bytefolge ${hx} (hexadezimal) mit ASCII. Es gilt „A“ = 65 = 41₁₆ und „a“ = 97 = 61₁₆.`, antworten: [w],
        erkl: `${[...w].map((c) => `${c.charCodeAt(0).toString(16).toUpperCase()} = ${c.charCodeAt(0)} = ${c}`).join(', ')}.` };
    } },
  { id: 'k28_016', burg: 28, kap: 101, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.1 e, LB1 1.4',
    gen: (z) => {
      const t = z.wahl(['Grüße aus Dresden', 'Bäckerei Kornblume', 'Preis: 5 €', 'Ölwechsel', 'Straße', 'Lötkurs für Anfänger']);
      const n = new TextEncoder().encode(t).length;
      return { frage: `Wie viele Byte belegt der Text „${t}“ in UTF-8? (ä, ö, ü, ß, Ö = je 2 Byte, € = 3 Byte, alle anderen Zeichen und Leerzeichen 1 Byte)`, antworten: [String(n)],
        erkl: `${[...t].length} Zeichen; ASCII-Zeichen brauchen 1 Byte, die Sonderzeichen mehr: zusammen ${n} Byte.` };
    } },
  { id: 'k28_017', burg: 28, kap: 101, stufe: 1, art: 'eingabe', zahl: true, frage: 'Eine alte Kasse speichert den Text Pflaumenkuchen in ASCII. Wie viele Byte belegt er?',
    antworten: ['14'],
    erkl: 'ASCII ist ein 7-Bit-Code, gespeichert wird aber jedes Zeichen in einem ganzen Byte: 14 Zeichen = 14 Byte = 112 Bit.', quelle: 'OPAL Abiturvorbereitung 1.1.11 a' },
  { id: 'k28_018', burg: 28, kap: 101, stufe: 1, art: 'zuordnen', frage: 'Wie viele Byte braucht das Zeichen in UTF-8? Ordne zu.',
    paare: [['A', '1 Byte'], ['ü', '2 Byte'], ['€', '3 Byte'], ['😀', '4 Byte']],
    erkl: 'UTF-8 speichert Zeichen bis U+007F (ASCII) in 1 Byte, bis U+07FF in 2 Byte, bis U+FFFF in 3 Byte, darüber (z. B. Emojis) in 4 Byte.', quelle: 'OPAL LB1 1.4 Zeichenkodierung' },
  { id: 'k28_019', burg: 28, kap: 101, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.11 c',
    gen: (z) => {
      const t = z.wahl(['Grüße aus Dresden', 'Bäckerei Kornblume', 'Preis: 5 €', 'Ölwechsel', 'Straße']);
      return { frage: `Wie viele Byte belegt „${t}“ in UTF-32?`, antworten: [String(4 * [...t].length)],
        erkl: `In UTF-32 belegt jedes Zeichen 4 Byte, egal welches: ${[...t].length} Zeichen · 4 = ${4 * [...t].length} Byte.` };
    } },
  { id: 'k28_020', burg: 28, kap: 101, stufe: 3, art: 'wahl', frage: 'Der Inhaber meint: „Wir bleiben bei ASCII. ASCII braucht nur 7 Bit pro Zeichen und spart damit gegenüber UTF-8 Platz.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Stimmt nicht: Auch ASCII belegt 1 Byte, UTF-8 für diese Zeichen ebenso', 'Stimmt, UTF-8 braucht für jedes Zeichen mindestens 2 Byte', 'Stimmt, weil 7 Bit je Zeichen weniger sind als 8 Bit', 'Stimmt nicht, weil ASCII 16 Bit für jedes Zeichen braucht'],
    erkl: 'Im Speicher belegt auch ein ASCII-Zeichen ein ganzes Byte; Ø oder € kann ASCII gar nicht darstellen. Für reine ASCII-Texte sind ASCII und UTF-8 gleich groß. UTF-8 braucht nur für Sonderzeichen mehr Platz – die ASCII gar nicht kennt.', quelle: 'OPAL Abiturvorbereitung 1.1.11 d' },

  // ---------- Kapitel 162: Daten kompakt – Huffman ----------
  { id: 'k28_021', burg: 28, kap: 162, stufe: 1, art: 'eingabe', frage: 'Huffman-Code für das Wort MISSISSIPPI: S = 0, I = 10, P = 110, M = 111. Codiere das Wort MISS (ohne Leerzeichen).',
    antworten: ['1111000'], erkl: 'M = 111, I = 10, S = 0, S = 0 → 1111000 (7 Bit statt 32 Bit in ASCII).', quelle: 'OPAL Abiturvorbereitung 1.1.9 b' },
  { id: 'k28_022', burg: 28, kap: 162, stufe: 2, art: 'eingabe', frage: 'Huffman-Code: S = 0, I = 10, P = 110, M = 111. Decodiere die Bitfolge 010110.',
    antworten: ['SIP'], erkl: 'Von links lesen, bis ein vollständiger Code erkannt ist: 0 | 10 | 110 → S I P.', quelle: 'OPAL Abiturvorbereitung 1.1.9 c' },
  { id: 'k28_023', burg: 28, kap: 162, stufe: 2, art: 'eingabe', zahl: true, frage: 'Huffman-Code: S = 0, I = 10, P = 110, M = 111. Wie viele Bit braucht das ganze Wort MISSISSIPPI?',
    antworten: ['21'], erkl: 'S kommt 4-mal vor (4 · 1), I 4-mal (4 · 2), P 2-mal (2 · 3), M einmal (1 · 3): 4 + 8 + 6 + 3 = 21 Bit.', quelle: 'OPAL Abiturvorbereitung 1.1.9 d' },
  { id: 'k28_024', burg: 28, kap: 162, stufe: 1, art: 'eingabe', zahl: true, frage: 'Wie viele Bit belegt MISSISSIPPI in ASCII (1 Byte je Zeichen)?',
    antworten: ['88'], erkl: '11 Zeichen · 8 Bit = 88 Bit. Typischer Fehler: mit 7 Bit rechnen oder Byte und Bit verwechseln.', quelle: 'OPAL Abiturvorbereitung 1.1 (Hinweis Abitur 2026), 1.1.9 d' },
  { id: 'k28_025', burg: 28, kap: 162, stufe: 2, art: 'wahl', frage: 'Zwischen den Huffman-Codes stehen keine Trennzeichen. Warum kann die Bitfolge trotzdem eindeutig decodiert werden?',
    optionen: ['Kein Code ist der Anfang eines anderen (präfixfrei)', 'Weil häufige Zeichen besonders kurze Codes bekommen', 'Weil die Codes nach ihrer Länge sortiert übertragen werden', 'Weil jeder Code im Baum mit einer 1 endet'],
    erkl: 'Alle Zeichen sind Blätter des Baums. Erreicht man beim Decodieren ein Blatt, ist das Zeichen fertig – es gibt keinen längeren Code, der hier weitergehen könnte.', quelle: 'OPAL Abiturvorbereitung 1.1.9 e' },
  { id: 'k28_026', burg: 28, kap: 162, stufe: 3, art: 'wahl', frage: 'Jemand schlägt den Code A = 0, B = 01, C = 10 vor. Beurteile ihn.',
    optionen: ['Unbrauchbar: 010 kann AC oder BA bedeuten', 'Brauchbar, weil alle drei Codes verschieden sind', 'Brauchbar, weil kein Code länger als 2 Bit ist', 'Unbrauchbar, weil A nur ein einziges Bit hat'],
    erkl: 'Verschiedene Codes genügen nicht. Ein Code ohne Trennzeichen muss präfixfrei sein – das garantiert der Huffman-Baum.', quelle: 'OPAL Abiturvorbereitung 1.1.9 e' },

  // ---------- Kapitel 102: Boolesche Algebra ----------
  { id: 'k28_027', burg: 28, kap: 102, stufe: 1, art: 'wahl', frage: 'Welcher Term ist äquivalent zu ¬(¬A ∨ B)?',
    optionen: ['A ∧ ¬B', '¬A ∧ B', 'A ∨ ¬B', '¬A ∨ ¬B'],
    erkl: 'De Morgan: ¬(X ∨ Y) = ¬X ∧ ¬Y mit X = ¬A, Y = B, dann doppelte Verneinung: A ∧ ¬B.', quelle: 'OPAL Abiturvorbereitung 1.1.1 b, LB1 2.5' },
  { id: 'k28_028', burg: 28, kap: 102, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 2.2 Boolesche Operatoren, 2.4 Implikation',
    gen: (z) => {
      const terme = [['(A ∨ B) ∧ ¬C', (a, b, c) => (a | b) & (1 - c)], ['A ⊕ (B ∧ C)', (a, b, c) => a ^ (b & c)], ['¬A → (B ∨ C)', (a, b, c) => (a === 0 ? (b | c) : 1)],
        ['(A → B) ∧ (B → C)', (a, b, c) => ((a === 0 || b === 1) && (b === 0 || c === 1) ? 1 : 0)], ['¬(A ∧ B) ∨ C', (a, b, c) => (1 - (a & b)) | c]];
      const [t, f] = z.wahl(terme), a = z.int(0, 1), b = z.int(0, 1), c = z.int(0, 1);
      return { frage: `Welchen Wert (0 oder 1) hat ${t} für A = ${a}, B = ${b}, C = ${c}?`, antworten: [String(f(a, b, c))],
        erkl: `Von innen nach außen einsetzen. Merke: X → Y ist nur 0, wenn X = 1 und Y = 0; X ⊕ Y ist 1, wenn genau eins von beiden 1 ist. Ergebnis: ${f(a, b, c)}.` };
    } },
  { id: 'k28_029', burg: 28, kap: 102, stufe: 3, art: 'wahl', frage: 'Brandschutzkonzept: „Wenn ein Rauchmelder auslöst (R), wird die Feuerwehr alarmiert (F).“ Ein Schüler folgert: „Die Feuerwehr wurde alarmiert, also hat ein Rauchmelder ausgelöst.“ Beurteile die Folgerung.',
    optionen: ['Nicht zulässig: R → F ist auch bei R = 0, F = 1 wahr', 'Zulässig, weil eine Implikation in beide Richtungen gilt', 'Zulässig, weil R → F nur bei R = 1 überhaupt wahr ist', 'Nicht zulässig, weil R → F bei F = 1 immer falsch ist'],
    erkl: 'Die Feuerwehr kann aus einem anderen Grund alarmiert worden sein. Die Implikation ist nur bei R = 1 und F = 0 falsch. Aus F = 1 folgt nichts über R – das wäre die Umkehrung F → R.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 2.1' },
  { id: 'k28_030', burg: 28, kap: 102, stufe: 2, art: 'wahl', frage: 'Untersuche den Term A ∧ ¬(A ∨ B).',
    optionen: ['Widerspruch (für keine Belegung wahr)', 'Tautologie (für jede Belegung wahr)', 'erfüllbar, aber keine Tautologie'],
    erkl: 'Ist A = 1, ist A ∨ B = 1 und ¬(A ∨ B) = 0. Ist A = 0, ist schon der erste Teil 0. Also immer 0.', quelle: 'OPAL LB1 2.6, Übungsstunde Station 2.3' },
  { id: 'k28_031', burg: 28, kap: 102, stufe: 2, art: 'zeile', frage: 'Eine Mitschülerin hat den Term umgeformt. Tippe den fehlerhaften Schritt an.',
    code: '¬(A ∧ B) ∨ (A ∧ ¬B)\n⇔ (¬A ∧ ¬B) ∨ (A ∧ ¬B)      De Morgan\n⇔ ¬B ∧ (¬A ∨ A)               Kommutativ- und Distributivgesetz\n⇔ ¬B                          Komplement und Gesetz mit Wahr',
    fehler: [2], erkl: 'De Morgan lautet ¬(A ∧ B) = ¬A ∨ ¬B – aus UND wird ODER. Richtig vereinfacht ergibt sich ¬A ∨ ¬B.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 2.4' },
  { id: 'k28_032', burg: 28, kap: 102, stufe: 1, art: 'luecke', frage: 'Ergänze die Regel für die kanonische disjunktive Normalform (KDNF).',
    text: 'Für jede Zeile der Wahrheitstabelle mit f = {} entsteht ein {}. Variablen mit dem Wert {} werden darin negiert. Die Terme werden mit {} verknüpft.',
    luecken: [['1'], ['Minterm'], ['0'], ['ODER', '∨']], woerter: ['1', '0', 'Minterm', 'Maxterm', 'ODER', 'UND'],
    erkl: 'KDNF: ODER aus Mintermen (Zeilen mit 1). KKNF: UND aus Maxtermen (Zeilen mit 0), dort werden Variablen mit dem Wert 1 negiert.', quelle: 'OPAL LB1 2.8 Kanonische Normalformen, Hilfekarte H10' },
  { id: 'k28_033', burg: 28, kap: 102, stufe: 2, art: 'wahl', frage: 'f(A, B, C) ist nur für die Belegungen 001 und 101 (Reihenfolge A B C) falsch, sonst wahr. Wie lautet die KKNF?',
    optionen: ['(A ∨ B ∨ ¬C) ∧ (¬A ∨ B ∨ ¬C)', '(¬A ∧ ¬B ∧ C) ∨ (A ∧ ¬B ∧ C)', '(¬A ∨ ¬B ∨ C) ∧ (A ∨ ¬B ∨ C)', '(A ∨ B ∨ ¬C) ∨ (¬A ∨ B ∨ ¬C)'],
    erkl: 'Für jede Zeile mit f = 0 ein Maxterm, Variablen mit dem Wert 1 werden negiert: 001 → A ∨ B ∨ ¬C, 101 → ¬A ∨ B ∨ ¬C, verbunden mit UND.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 2.6' },
  { id: 'k28_034', burg: 28, kap: 102, stufe: 3, art: 'wahl', frage: 'Vereinfache die KKNF (A ∨ B ∨ ¬C) ∧ (¬A ∨ B ∨ ¬C) so weit wie möglich.',
    optionen: ['B ∨ ¬C', '¬B ∧ C', 'A ∨ B ∨ ¬C', 'B ∧ ¬C'],
    erkl: 'Distributivgesetz: (B ∨ ¬C) ∨ (A ∧ ¬A) = (B ∨ ¬C) ∨ 0 = B ∨ ¬C. Probe: f ist nur 0, wenn B = 0 und C = 1.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 2 Zusatz' },
  { id: 'k28_035', burg: 28, kap: 102, stufe: 2, art: 'mehr', frage: 'Kreuze alle Terme an, die äquivalent zu A → B sind.',
    optionen: ['¬A ∨ B', '¬B → ¬A', 'B → A', '¬(A ∧ ¬B)', 'A ∨ ¬B'], richtig: [0, 1, 3],
    erkl: 'A → B ist nur bei A = 1, B = 0 falsch – genau wie ¬A ∨ B, die Kontraposition ¬B → ¬A und ¬(A ∧ ¬B). B → A ist die Umkehrung.', quelle: 'OPAL LB1 2.4 Implikation und Äquivalenz' },
  { id: 'k28_036', burg: 28, kap: 102, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Gesetz der Aussagenlogik seinen Namen zu.',
    paare: [['A ∨ (A ∧ B) = A', 'Absorptionsgesetz'], ['¬(A ∨ B) = ¬A ∧ ¬B', 'De Morgan'], ['A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)', 'Distributivgesetz'], ['A ∨ ¬A = 1', 'Komplementgesetz']],
    erkl: 'Beim Vereinfachen muss zu jedem Schritt das Gesetz angegeben werden – deshalb die Namen sicher kennen.', quelle: 'OPAL LB1 2.5 Gesetze der Aussagenlogik' },

  // ---------- Kapitel 103: Schaltnetze und Addierer ----------
  { id: 'k28_037', burg: 28, kap: 103, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 3.2 Schaltungsanalyse, Abiturvorbereitung 1.1.5',
    bild: () => svgSchaltung(['or', ['and', 'A', 'B'], ['and', ['and', 'A', ['not', 'B']], 'C']], 'F'),
    gen: (z) => {
      const a = z.int(0, 1), b = z.int(0, 1), c = z.int(0, 1), o = a & b, u = a & (1 - b) & c;
      return { frage: `Welchen Wert hat F bei A = ${a}, B = ${b}, C = ${c}?`, antworten: [String(o | u)],
        erkl: `Oberes UND: A ∧ B = ${o}. Unteres Teilnetz: A ∧ ¬B ∧ C = ${u}. ODER: F = ${o | u}.` };
    } },
  { id: 'k28_038', burg: 28, kap: 103, stufe: 2, art: 'wahl', frage: 'Vereinfache den Ausdruck der Schaltung F = (A ∧ B) ∨ (A ∧ ¬B ∧ C) so weit wie möglich.',
    bild: () => svgSchaltung(['or', ['and', 'A', 'B'], ['and', ['and', 'A', ['not', 'B']], 'C']], 'F'),
    optionen: ['A ∧ (B ∨ C)', 'A ∨ (B ∧ C)', 'A ∧ B ∧ C', '(A ∧ B) ∨ C'],
    erkl: 'A ausklammern: A ∧ (B ∨ (¬B ∧ C)). Distributivgesetz: B ∨ (¬B ∧ C) = (B ∨ ¬B) ∧ (B ∨ C) = B ∨ C. Das Tor öffnet also nur mit gültigem Chip, und dann zur Öffnungszeit oder mit Bestätigung.', quelle: 'OPAL Abiturvorbereitung 1.1.5 c' },
  { id: 'k28_039', burg: 28, kap: 103, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Gattersymbol (DIN/IEC) seine Funktion zu.',
    paare: [['&', 'UND'], ['≥1', 'ODER'], ['=1', 'XOR'], ['1 mit Kreis am Ausgang', 'NICHT']],
    erkl: '≥1 heißt „mindestens ein Eingang 1“, =1 heißt „genau ein Eingang 1“. Der Kreis am Ausgang bedeutet Negation.', quelle: 'OPAL LB1 3.1 Boolesche Ausdrücke in Schaltungen' },
  { id: 'k28_040', burg: 28, kap: 103, stufe: 1, art: 'luecke', frage: 'Ergänze die Gleichungen des Halbaddierers.',
    text: 'Summe: S = A {} B. Übertrag: C = A {} B.',
    luecken: [['⊕', 'XOR'], ['∧', 'UND']], woerter: ['⊕', '∧', '∨', '→'],
    erkl: 'S ist 1, wenn genau ein Bit 1 ist (1 + 0 = 01). C ist nur bei 1 + 1 = 10 gleich 1.', quelle: 'OPAL LB1 3.6 Halbaddierer, Abiturvorbereitung 1.1.6 a' },
  { id: 'k28_041', burg: 28, kap: 103, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 3.7 Volladdierer',
    gen: (z) => {
      const a = z.int(0, 1), b = z.int(0, 1), c = z.int(0, 1), s = a + b + c;
      return { frage: `Ein Volladdierer bekommt A = ${a}, B = ${b} und Cin = ${c}. Gib Cout und S als zweistellige Binärzahl „Cout S“ an.`, antworten: [`${s >> 1}${s & 1}`],
        erkl: `${a} + ${b} + ${c} = ${s} = ${s >> 1}${s & 1}₂, also Cout = ${s >> 1}, S = ${s & 1}.` };
    } },
  { id: 'k28_042', burg: 28, kap: 103, stufe: 3, art: 'wahl', frage: 'Ein Volladdierer aus zwei Halbaddierern verknüpft beide Überträge mit einem ODER-Gatter. Warum genügt ODER, obwohl beim Addieren eigentlich ein XOR nahe läge?',
    optionen: ['Beide Halbaddierer liefern nie gleichzeitig einen Übertrag', 'Weil ein ODER-Gatter schneller schaltet als ein XOR-Gatter', 'Weil bei zwei Überträgen 1 herauskommen muss, das liefert nur ODER', 'Weil der Übertrag des zweiten Halbaddierers immer 0 ist'],
    erkl: 'Liefert der erste Halbaddierer C = 1, ist seine Summe 0 – dann kann der zweite keinen Übertrag erzeugen. ODER und XOR unterscheiden sich nur, wenn beide Eingänge 1 sind – und dieser Fall kommt hier nie vor.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 3.4' },
  { id: 'k28_043', burg: 28, kap: 103, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.6 d',
    gen: (z) => {
      const a = z.int(3, 15), b = z.int(3, 15), s = a + b, a2 = a.toString(2).padStart(4, '0'), b2 = b.toString(2).padStart(4, '0'), e = (s & 15).toString(2).padStart(4, '0');
      return { frage: `Ein 4-Bit-Addierwerk addiert ${a2} und ${b2}. Welches 4-Bit-Ergebnis S3S2S1S0 steht am Ausgang?`, antworten: [e],
        erkl: `${a} + ${b} = ${s}. ${s > 15 ? `Das passt nicht in 4 Bit: Der letzte Übertrag Cout = 1 fällt heraus, es bleiben ${e} = ${s - 16}.` : `Kein Übertrag aus der letzten Stufe: ${e}.`}` };
    } },
  { id: 'k28_044', burg: 28, kap: 103, stufe: 2, art: 'eingabe', zahl: true, tol: 0.01, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 3.5',
    gen: (z) => {
      const n = z.wahl([8, 16, 32, 64]), t = Math.round(n * 0.2 * 10) / 10;
      return { frage: `In einem Addierwerk aus ${n} hintereinandergeschalteten Volladdierern läuft der Übertrag im ungünstigsten Fall durch alle Stellen. Ein Volladdierer braucht 0,2 ns, bis sein Übertrag stabil ist. Wie viele ns dauert die Addition höchstens?`, antworten: [String(t)],
        erkl: `${n} · 0,2 ns = ${String(t).replace('.', ',')} ns – jede Stufe muss auf den Übertrag der vorigen warten.` };
    } },
  { id: 'k28_045', burg: 28, kap: 103, stufe: 3, art: 'eingabe', zahl: true, tol: 1, frage: 'Eine 64-Bit-Addition mit Ripple-Carry dauert 64 · 0,2 ns = 12,8 ns. Ein Prozessor taktet mit 3 GHz. Etwa wie viele Takte dauert diese Addition?',
    antworten: ['38'], erkl: 'Taktdauer = 1 / 3 GHz ≈ 0,33 ns. 12,8 ns : 0,33 ns ≈ 38 Takte – viel zu langsam. Echte Prozessoren nutzen deshalb schnellere Addierwerke.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 3.5' },
  { id: 'k28_046', burg: 28, kap: 103, stufe: 3, art: 'wahl', frage: 'Ein Antrag im Schülerrat ist angenommen, wenn mindestens zwei von drei Mitgliedern A, B, C mit Ja stimmen. Ein Mitschüler schlägt J = (A ∨ B) ∧ C vor. Beurteile.',
    optionen: ['Falsch: Bei A = B = 1, C = 0 müsste J = 1 sein, die Schaltung liefert 0', 'Richtig, die Schaltung ist gleichwertig zur Mehrheitsfunktion', 'Falsch: Bei A = B = C = 1 liefert sie 0', 'Falsch: Bei A = B = 0, C = 1 liefert sie 1'],
    erkl: 'Prüfen heißt: alle acht Belegungen vergleichen – eine abweichende Zeile genügt. Richtig ist J = (A ∧ B) ∨ (A ∧ C) ∨ (B ∧ C).', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 6.6' },
  { id: 'k28_047', burg: 28, kap: 103, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.10 a',
    gen: (z) => {
      const d = [z.int(0, 1), z.int(0, 1), z.int(0, 1)], p = d[0] ^ d[1] ^ d[2];
      return { frage: `Ein Sender hängt an die Datenbits D2 D1 D0 = ${d.join('')} ein Prüfbit P an, sodass die Anzahl der Einsen in allen vier Bits gerade ist. Welchen Wert hat P?`, antworten: [String(p)],
        erkl: `Die Datenbits enthalten ${d[0] + d[1] + d[2]} Einsen. P = D2 ⊕ D1 ⊕ D0 = ${p}.` };
    } },
  { id: 'k28_048', burg: 28, kap: 103, stufe: 2, art: 'eingabe', zahl: true, frage: 'Es gibt nur NAND-Gatter. Wie viele braucht man mindestens für ein ODER-Gatter mit den Eingängen A und B?',
    antworten: ['3'],
    erkl: 'De Morgan: A ∨ B = ¬(¬A ∧ ¬B). Je ein NAND mit verbundenen Eingängen bildet ¬A und ¬B, ein drittes NAND verknüpft sie.', quelle: 'OPAL Abiturvorbereitung 1.1.7 b' },

  // ---------- Kapitel 163: Standardschaltnetze und KV ----------
  { id: 'k28_049', burg: 28, kap: 163, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 3.5 Standardschaltnetze',
    gen: (z) => {
      const s = z.int(0, 1), a = z.int(0, 1), b = 1 - a;
      return { frage: `Ein 2:1-Multiplexer hat die Funktion Y = (¬S ∧ A) ∨ (S ∧ B). Welchen Wert hat Y bei S = ${s}, A = ${a}, B = ${b}?`, antworten: [String(s ? b : a)],
        erkl: `Bei S = ${s} ist ${s ? '¬S ∧ A = 0 und S ∧ B = B' : 'S ∧ B = 0 und ¬S ∧ A = A'}: Der Steuereingang wählt ${s ? 'B' : 'A'} aus, Y = ${s ? b : a}.` };
    } },
  { id: 'k28_050', burg: 28, kap: 163, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 3.5 Standardschaltnetze',
    gen: (z) => { const n = z.int(1, 4); return { frage: `Ein Multiplexer hat ${n} Steuerleitung${n > 1 ? 'en' : ''}. Aus wie vielen Dateneingängen kann er auswählen?`, antworten: [String(2 ** n)], erkl: `Mit ${n} Bit lassen sich 2^${n} = ${2 ** n} Eingänge unterscheiden.` }; } },
  { id: 'k28_051', burg: 28, kap: 163, stufe: 2, art: 'wahl', frage: 'g(A, B, C) ist genau für die Belegungen 000, 001, 010, 011 und 111 wahr. Welcher Ausdruck ergibt sich aus dem KV-Diagramm?',
    optionen: ['¬A ∨ (B ∧ C)', '¬A ∨ B ∨ C', '¬A ∧ (B ∨ C)', '(¬A ∧ B) ∨ C'],
    erkl: 'Die vier Einsen mit A = 0 bilden einen Viererblock (¬A). 111 bildet mit 011 einen Zweierblock (B ∧ C). ¬A ∨ B ∨ C wäre auch bei 101 wahr.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 4 Zusatz' },
  { id: 'k28_052', burg: 28, kap: 163, stufe: 3, art: 'wahl', frage: 'Ein KV-Diagramm mit vier Variablen: Zeilen AB in der Reihenfolge 00, 01, 11, 10, Spalten CD in der Reihenfolge 00, 01, 11, 10. Nur die vier Eckfelder enthalten eine 1. Welcher Term gehört dazu?',
    optionen: ['¬B ∧ ¬D', '¬A ∧ ¬C', 'A ∧ C', '¬A ∧ ¬B ∧ ¬C ∧ ¬D'],
    erkl: 'Gegenüberliegende Ränder sind benachbart, die vier Ecken bilden einen Viererblock. In den Eckzeilen (00, 10) ist B = 0, in den Eckspalten (00, 10) ist D = 0; A und C ändern sich und fallen weg.', quelle: 'OPAL LB1 3.4 KV-Diagramme' },
  { id: 'k28_053', burg: 28, kap: 163, stufe: 3, art: 'wahl', frage: 'Dachfenster einer Gärtnerei (W = zu warm, L = zu feucht, R = Regen, S = Sturm, F = 1 öffnet). Vereinfacht ergibt sich F = (W ∧ ¬S) ∨ (L ∧ ¬R ∧ ¬S). Interpretiere: Wie verhält sich das Fenster bei Regen?',
    optionen: ['Es öffnet bei Regen nur, wenn es zu warm und nicht stürmisch ist', 'Bei Regen bleibt es immer geschlossen, egal wie warm es ist', 'Bei Regen öffnet es, sobald die Luft zu feucht ist', 'Regen spielt für das Fenster überhaupt keine Rolle'],
    erkl: 'Hohe Feuchte allein reicht bei Regen nicht. Bei R = 1 ist der zweite Term 0, es bleibt W ∧ ¬S. Bei Sturm bleibt das Fenster in jedem Fall zu.', quelle: 'OPAL Abiturvorbereitung 1.1.2 e' },

  // ---------- Kapitel 104: Der Rechner ----------
  { id: 'k28_054', burg: 28, kap: 104, stufe: 1, art: 'luecke', frage: 'Ergänze die drei Teile des Bussystems.',
    text: 'Über den {} wird gesagt, welche Speicherzelle gemeint ist. Über den {} wird der Wert transportiert. Über den {} laufen Kommandos wie „lesen“ oder „schreiben“.',
    luecken: [['Adressbus'], ['Datenbus'], ['Steuerbus']], woerter: ['Adressbus', 'Datenbus', 'Steuerbus', 'Befehlszähler'],
    erkl: 'Adressbus: welche Zelle. Datenbus: der Wert (oder Befehl). Steuerbus: was passieren soll (Lesen/Schreiben, Takt). Der Befehlszähler ist ein Register, keine Leitung.', quelle: 'OPAL Abiturvorbereitung 1.1.8 a, LB1 4.1' },
  { id: 'k28_055', burg: 28, kap: 104, stufe: 1, art: 'reihe', frage: 'Bring die Phasen des Von-Neumann-Zyklus in die richtige Reihenfolge.',
    teile: ['Befehl holen', 'Befehl entschlüsseln (dekodieren)', 'Befehl ausführen', 'Ergebnis zurückschreiben'],
    erkl: 'Beim Holen legt das Steuerwerk den Befehlszähler auf den Adressbus und erhöht ihn danach – dann beginnt der Zyklus für den nächsten Befehl.', quelle: 'OPAL LB1 4.1, Übungsstunde Hilfekarte H8' },
  { id: 'k28_056', burg: 28, kap: 104, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 5.2',
    gen: (z) => {
      const x = z.int(5, 20), y = z.int(2, 9), d = x - y, e = d + d;
      return { frage: `Akkumulator-Maschine: Zelle 10 enthält ${x}, Zelle 11 enthält ${y}. Welcher Wert steht nach dem Programm in Zelle 13?`,
        code: '00 LOAD 10    (Zelle 10 in den Akku)\n01 SUB 11     (Zelle 11 abziehen)\n02 STORE 12   (Akku in Zelle 12)\n03 ADD 12     (Zelle 12 addieren)\n04 STORE 13\n05 HLT',
        antworten: [String(e)], erkl: `Akku: ${x}, dann ${x} − ${y} = ${d}, Zelle 12 = ${d}, dann ${d} + ${d} = ${e}, Zelle 13 = ${e}.` };
    } },
  { id: 'k28_057', burg: 28, kap: 104, stufe: 3, art: 'wahl', frage: 'Akkumulator-Maschine (JZ = springe, wenn Akku = 0). Zelle 20 enthält 10, Zelle 21 enthält 3. Der Akku kann hier beliebig große und negative Zahlen speichern (kein Überlauf). Was passiert?',
    code: '00 LOAD 20\n01 JZ 05\n02 SUB 21\n03 JMP 01\n04 HLT\n05 HLT',
    optionen: ['Es hält nie an, weil der Akku nie genau 0 wird', 'Es hält nach 3 Durchläufen mit Akku = 1 an', 'Es hält nach 4 Durchläufen mit Akku = 0 an', 'Es hält sofort an, weil 10 nicht 0 ist'],
    erkl: 'Der Akku geht 10, 7, 4, 1, −2 … – die Terminierung ist verletzt. JZ springt nur bei genau 0. Bei 12 statt 10 würde SUB viermal ausgeführt und das Programm hielte – mit 10 springt der Akku über die 0 hinweg. (Mit einem 8-Bit-Akku wie in Aufgabe 4.1.7 würde er nach 174 Subtraktionen durch den Überlauf doch 0 erreichen.)', quelle: 'OPAL LB1 4.1, Abiturvorbereitung 2.3 (Algorithmeneigenschaften)' },
  { id: 'k28_058', burg: 28, kap: 104, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 1.1.8 c',
    gen: (z) => {
      const n = z.int(16, 24);
      return { frage: `Ein Adressbus ist ${n} Bit breit, jede Adresse steht für 1 Byte. Wie viele KiB kann der Prozessor höchstens direkt ansprechen?`, antworten: [String(2 ** n / 1024)],
        erkl: `2^${n} = ${2 ** n} Byte, geteilt durch 1024 = ${2 ** n / 1024} KiB.` };
    } },
  { id: 'k28_059', burg: 28, kap: 104, stufe: 1, art: 'wahl', frage: 'Was versteht man unter dem Von-Neumann-Flaschenhals?',
    optionen: ['Befehle und Daten teilen sich einen Bus, der Prozessor wartet', 'Der Prozessor hat zu wenige Register für große Programme', 'Der Takt des Prozessors ist für den Speicher zu niedrig', 'Der Arbeitsspeicher ist zu klein für große Programme'],
    erkl: 'Programm und Daten liegen im selben Speicher und teilen sich das Bussystem. Der Bus ist langsamer als der Prozessor.', quelle: 'OPAL LB1 4.1 Rechnerarchitekturen' },

  // ---------- Kapitel 164: Rechnerkennzahlen ----------
  { id: 'k28_060', burg: 28, kap: 164, stufe: 1, art: 'eingabe', zahl: true, tol: 0.001, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 6.2 Übungsstunde, Hilfekarte H9',
    gen: (z) => { const f = z.wahl([0.5, 1, 2, 2.5, 4, 5]); return { frage: `Ein Prozessor taktet mit ${String(f).replace('.', ',')} GHz. Wie lange dauert ein Takt in ns?`, antworten: [String(1 / f)], erkl: `Taktdauer = 1 / Taktfrequenz = 1 / ${String(f).replace('.', ',')} GHz = ${String(1 / f).replace('.', ',')} ns.` }; } },
  { id: 'k28_061', burg: 28, kap: 164, stufe: 2, art: 'eingabe', zahl: true, tol: 0.01, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 5.5',
    gen: (z) => {
      const f = z.wahl([2, 2.5, 4]), p = z.int(2, 8), w = z.wahl([50, 60, 80, 100]), t = Math.round((1 / f + (p / 100) * w) * 1000) / 1000;
      return { frage: `Prozessor mit ${String(f).replace('.', ',')} GHz: Ein Befehl braucht 1 Takt, wenn seine Daten im Cache liegen. Bei ${p} % der Befehle liegen sie nicht im Cache, dann wartet er zusätzlich ${w} ns. Wie lange dauert ein Befehl im Mittel (in ns)?`, antworten: [String(t)],
        erkl: `Mittlere Zeit = Taktdauer + Anteil der Fehlzugriffe · Wartezeit = ${String(1 / f).replace('.', ',')} + ${p / 100} · ${w} = ${String(t).replace('.', ',')} ns.` };
    } },
  { id: 'k28_062', burg: 28, kap: 164, stufe: 3, art: 'wahl', frage: 'Ein Händler wirbt: „4 GHz statt 2 GHz – doppelt so schnell!“ Das Programm muss oft auf Daten aus dem Arbeitsspeicher warten. Beurteile.',
    optionen: ['Stimmt nicht: Die Wartezeit auf den Speicher bleibt gleich', 'Stimmt immer, die Laufzeit halbiert sich bei doppeltem Takt', 'Stimmt, mit großem Cache wird es sogar mehr als doppelt so schnell', 'Stimmt nicht, ein höherer Takt macht Programme langsamer'],
    erkl: 'Nur der Taktanteil halbiert sich, die Wartezeit auf den Arbeitsspeicher hängt nicht vom Prozessortakt ab. Beispiel: 0,5 ns + 3 ns Wartezeit = 3,5 ns, mit 4 GHz 0,25 ns + 3 ns = 3,25 ns – nur etwa 7 % schneller.', quelle: 'OPAL LB1 6.2 Übungsstunde, Station 5.6; Abiturvorbereitung 1.1.1 f' },
  { id: 'k28_063', burg: 28, kap: 164, stufe: 3, art: 'wahl', frage: '„Mein Prozessor hat 4 Kerne mit Multithreading, also 8 Threads. Damit ist er genauso schnell wie ein Prozessor mit 8 Kernen.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Nur teilweise: Es gibt trotzdem nur 4 Rechenwerke', 'Stimmt, 8 Threads entsprechen genau 8 echten Kernen', 'Stimmt nicht, Multithreading macht einen Prozessor langsamer', 'Stimmt, weil Multithreading den Takt jedes Kerns verdoppelt'],
    erkl: 'Beim Multithreading nutzt ein Kern Wartezeiten für einen zweiten Befehlsstrom; 8 echte Kerne rechnen 8 Threads wirklich gleichzeitig. Multithreading füllt Lücken, verdoppelt aber nicht die Rechenleistung. Ein Programm mit nur einem Thread profitiert von beidem kaum.', quelle: 'OPAL Abiturvorbereitung 1.1.8 d' },
  { id: 'k28_064', burg: 28, kap: 164, stufe: 2, art: 'wahl', frage: 'Warum macht ein Cache den Rechner schneller?',
    optionen: ['Oft gebrauchte Daten liegen in einem kleinen, schnellen Speicher', 'Er erhöht die Taktfrequenz des Prozessors bei Bedarf', 'Er ersetzt den langsamen Arbeitsspeicher vollständig', 'Er speichert Daten dauerhaft, auch nach dem Ausschalten'],
    erkl: 'So muss seltener auf den langsameren Arbeitsspeicher gewartet werden. Speicherhierarchie: je näher am Prozessor, desto schneller, kleiner und teurer. Der Cache überbrückt den Geschwindigkeitsunterschied zum Arbeitsspeicher.', quelle: 'OPAL LB1 4.3 Speichersysteme (Merke Cache)' },

  // ---------- Ergänzungen 2026-11-13: Fehler finden, Lücken, Rechnen mit Zufallswerten ----------
  { id: 'k28_065', burg: 28, kap: 104, stufe: 1, art: 'luecke', frage: 'Ergänze den Von-Neumann-Zyklus.',
    text: 'Fetch: Befehl {}, dabei wird der Befehlszähler um 1 erhöht. Decode: Befehl {}. Execute: Befehl {}. Writeback: Ergebnis {}.',
    luecken: [['holen'], ['entschlüsseln', 'dekodieren'], ['ausführen'], ['zurückschreiben', 'speichern']], woerter: ['holen', 'entschlüsseln', 'ausführen', 'zurückschreiben', 'löschen', 'drucken'],
    erkl: 'Vier Phasen, immer wieder von vorn – mehrere Milliarden Mal pro Sekunde.', quelle: 'OPAL LB1 4.1 Von-Neumann-Zyklus' },
  { id: 'k28_066', burg: 28, kap: 104, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 4.1 Aufgabe 4.1.2 (Sei der Prozessor)',
    code: '0 LOAD 10\n1 OUT\n2 SUB 11\n3 JZ 5\n4 JMP 1\n5 HLT',
    gen: (z) => {
      const d = z.wahl([1, 2]), n = d * z.int(2, 5), aus = [];
      for (let a = n; a > 0; a -= d) aus.push(a);
      return { frage: `Zelle 10 enthält ${n}, Zelle 11 enthält ${d}. Welche Zahlen gibt das Programm mit OUT aus? (mit Leerzeichen)`,
        antworten: [aus.join(' '), aus.join(', '), aus.join(',')],
        erkl: `Akku ${aus.join(', ')} – nach jedem OUT wird ${d} abgezogen; bei 0 springt JZ zu HLT.` };
    } },
  { id: 'k28_067', burg: 28, kap: 104, stufe: 2, art: 'zeile', frage: 'Das Programm soll Zelle 10 und Zelle 11 addieren und die Summe in Zelle 12 ablegen. Tippe die fehlerhafte Zeile an.',
    code: '0 LOAD 10\n1 ADD 11\n2 LOAD 12\n3 HLT',
    fehler: [3], erkl: 'LOAD 12 holt den (alten) Inhalt von Zelle 12 in den Akku und überschreibt die Summe. Richtig ist STORE 12: Akku in die Zelle schreiben.', quelle: 'OPAL LB1 4.1 Mini-Rechner' },
  { id: 'k28_068', burg: 28, kap: 100, stufe: 2, art: 'zeile', frage: 'Gesucht ist −6 im 8-Bit-Zweierkomplement. Tippe den fehlerhaften Schritt an.',
    code: '6  = 0000 0110\nalle Bits umdrehen: 1111 1001\nplus 1: 1111 1011\n−6 = 1111 1011',
    fehler: [3], erkl: '1111 1001 + 1 = 1111 1010. Probe: −128 + 64 + 32 + 16 + 8 + 2 = −6.', quelle: 'OPAL LB1 1.2 Zweierkomplement' },
  { id: 'k28_069', burg: 28, kap: 102, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB1 2.8 Kanonische Normalformen',
    gen: (z) => {
      const f = z.wahl([['A ∨ (B ∧ C)', (a, b, c) => a | (b & c)], ['¬A ∨ B', (a, b) => (1 - a) | b], ['(A ⊕ B) ∧ C', (a, b, c) => (a ^ b) & c], ['A ∧ ¬C', (a, b, c) => a & (1 - c)], ['(A ∧ B) ∨ (¬A ∧ C)', (a, b, c) => (a & b) | ((1 - a) & c)]]);
      let n = 0;
      for (let k = 0; k < 8; k++) n += f[1]((k >> 2) & 1, (k >> 1) & 1, k & 1);
      return { frage: `Aus wie vielen Mintermen besteht die KDNF von f(A, B, C) = ${f[0]}?`, antworten: [String(n)], erkl: `Ein Minterm je Zeile der Wahrheitstabelle mit f = 1: ${n} von 8 Zeilen. Die KKNF hätte ${8 - n} Maxterme.` };
    } },
  { id: 'k28_070', burg: 28, kap: 102, stufe: 2, art: 'luecke', frage: 'f(A, B, C) ist genau in den Zeilen 010 und 110 (Reihenfolge A B C) wahr. Ergänze die KDNF.',
    text: 'f = ({} ∧ B ∧ ¬C) ∨ ({} ∧ B ∧ {})', luecken: [['¬A'], ['A'], ['¬C']], woerter: ['A', '¬A', 'C', '¬C', 'B', '¬B'],
    erkl: 'Je Zeile mit 1 ein Minterm, Variablen mit dem Wert 0 negiert. Vereinfacht: B ∧ ¬C – A fällt weg, weil es sich zwischen den Zeilen ändert.', quelle: 'OPAL LB1 2.8, 3.4 KV-Diagramme' },
  { id: 'k28_071', burg: 28, kap: 103, stufe: 2, art: 'zeile', frage: 'Die Funktion soll den Halbaddierer nachbilden. Tippe die fehlerhafte Zeile an.',
    code: 'def halbaddierer(a, b):\n    s = a | b\n    c = a & b\n    return [s, c]',
    fehler: [2], erkl: 'Die Summe ist XOR (a ^ b): 1 + 1 ergibt Summe 0 und Übertrag 1. Mit ODER käme bei 1 + 1 die Summe 1 heraus.', quelle: 'OPAL LB1 3.6 Halbaddierer, Signalturm hd3' },
  { id: 'k28_072', burg: 28, kap: 103, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'Signalturm hd6, OPAL Abiturvorbereitung 1.1.2',
    gen: (z) => {
      const w = z.int(0, 1), l = z.int(0, 1), r = z.int(0, 1), s = z.wahl([0, 0, 1]), f = (w | (l & (1 - r))) & (1 - s);
      return { frage: `Dachfenster: F = (W ∨ (L ∧ ¬R)) ∧ ¬S. Welchen Wert hat F bei W = ${w}, L = ${l}, R = ${r}, S = ${s}?`, antworten: [String(f)],
        erkl: `L ∧ ¬R = ${l & (1 - r)}, W ∨ … = ${w | (l & (1 - r))}, und mit ¬S = ${1 - s}: F = ${f}.` };
    } },
  { id: 'k28_073', burg: 28, kap: 100, stufe: 1, art: 'zeile', frage: 'dez_zu_bin(6) soll "110" liefern, liefert aber "011". Tippe die falsche Zeile an.',
    code: 'def dez_zu_bin(n):\n    if n == 0:\n        return "0"\n    text = ""\n    while n > 0:\n        text = text + str(n % 2)\n        n = n // 2\n    return text',
    fehler: [6], erkl: 'Beim Divisionsrestverfahren liest man die Reste von unten nach oben – jeder neue Rest muss also vorn an den Text: text = str(n % 2) + text.', quelle: 'Signalturm ha2, OPAL LB1 1.2' },
  { id: 'k28_074', burg: 28, kap: 103, stufe: 2, art: 'zeile', frage: 'Der Volladdierer aus zwei Halbaddierern liefert bei 1 + 1 + 0 keinen Übertrag. Tippe die falsche Zeile an.',
    code: 'def halbaddierer(a, b):\n    return [a ^ b, a & b]\ndef volladdierer(a, b, cin):\n    s1, c1 = halbaddierer(a, b)\n    s, c2 = halbaddierer(s1, cin)\n    return [s, c1 & c2]',
    fehler: [6], erkl: 'Ein Übertrag entsteht, wenn EINER der beiden Halbaddierer einen liefert – die Überträge werden mit ODER verknüpft: c1 | c2. Beide zugleich sind nie 1.', quelle: 'Signalturm hd3, OPAL LB1 3.5 Volladdierer' },
  { id: 'k28_075', burg: 28, kap: 104, stufe: 3, art: 'zeile', frage: 'Ein Stück der Mini-CPU: JMP a soll zum Befehl mit der Adresse a springen. Tippe die falsche Zeile an.',
    code: 'acc = 0\npc = 0\nwhile pc < len(programm):\n    teile = programm[pc].split(" ")\n    pc = pc + 1\n    if teile[0] == "HLT":\n        break\n    a = int(teile[1])\n    if teile[0] == "LOAD":\n        acc = speicher[a]\n    elif teile[0] == "ADD":\n        acc = acc + speicher[a]\n    elif teile[0] == "JMP":\n        pc = pc + a',
    fehler: [14], erkl: 'a ist eine feste Adresse, kein Abstand: Der Befehlszähler bekommt genau diesen Wert, pc = a. Mit pc + a landet man an der falschen Stelle.', quelle: 'Signalturm he2, OPAL LB1 4.1 Von-Neumann-Zyklus' },
);
