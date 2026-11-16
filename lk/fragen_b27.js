'use strict';
// 🗝️ Kerker-Fragen Burg 27 (LK Automaten) – Quellen: OPAL LK_INF_LB6 „Sprachen und Automaten“ (Seiten 6.2–6.14,
// 6.15 Selbstcheck und Klausurvorbereitung mit Musterlösung), OPAL LK_INF_Abiturvorbereitung 5.1 „Formale Sprachen und Automaten“
// (Aufgaben 5.1.1–5.1.11), Lehrplan Sachsen LK Informatik LB 6. Kapitel 90–95 sowie Zusatzkapitel 160, 161 (plus_lk_b.js).
KERKER_FRAGEN.push(
  // ---------- Kapitel 90: Formale Sprachen ----------
  { id: 'k27_001', burg: 27, kap: 90, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.2 Formale Sprache, 6.15.1',
    gen: (z) => {
      const abc = z.wahl([['a', 'b'], ['0', '1'], ['a', 'b', 'c']]), n = z.int(2, 4), k = abc.length;
      return { frage: `Wie viele verschiedene Wörter der Länge ${n} gibt es über dem Alphabet Σ = {${abc.join(', ')}}?`, antworten: [String(k ** n)],
        erkl: `Für jede der ${n} Stellen gibt es ${k} Zeichen: ${k}^${n} = ${k ** n} Wörter.` };
    } },
  { id: 'k27_002', burg: 27, kap: 90, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.15.1 Grundbegriffe',
    gen: (z) => {
      const k = z.wahl([2, 3]), n = z.int(2, 4);
      let s = 0;
      for (let i = 0; i <= n; i++) s += k ** i;
      return { frage: `Ein Alphabet hat ${k} Zeichen. Wie viele Wörter der Länge höchstens ${n} gibt es – das leere Wort ε mitgezählt?`, antworten: [String(s)],
        erkl: `Länge 0 bis ${n}: ${[...Array(n + 1)].map((_, i) => k ** i).join(' + ')} = ${s}. Das leere Wort ε ist auch ein Wort (Länge 0).` };
    } },
  { id: 'k27_003', burg: 27, kap: 90, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Begriff seine Bedeutung zu.',
    paare: [['Alphabet Σ', 'endliche Menge von Zeichen'], ['Wort', 'endliche Folge von Zeichen aus Σ'], ['ε', 'Wort der Länge 0'], ['Σ*', 'Menge aller Wörter über Σ'], ['formale Sprache', 'Teilmenge von Σ*']],
    erkl: 'Eine formale Sprache ist einfach eine Auswahl aus allen Wörtern Σ* – genau die gültigen Wörter.', quelle: 'OPAL LB6 6.2 Formale Sprache' },
  { id: 'k27_004', burg: 27, kap: 90, stufe: 1, art: 'wahl', frage: 'Worin unterscheiden sich die Sprachen ∅ und {ε}?',
    optionen: ['∅ hat kein Wort, {ε} genau eines: das leere Wort', 'gar nicht, beide Sprachen enthalten kein Wort', '{ε} ist keine Sprache, weil ε kein Wort ist', '∅ enthält das leere Wort, {ε} ist dagegen leer'],
    erkl: 'Beide sind Teilmengen von Σ* und damit Sprachen. Das leere Wort ε ist ein echtes Wort (Länge 0), also hat {ε} genau ein Element.', quelle: 'OPAL LB6 6.15.1 (Musterlösung)' },
  { id: 'k27_005', burg: 27, kap: 90, stufe: 2, art: 'mehr', frage: 'Kreuze alle Python-Zeilen an, die einen Syntaxfehler enthalten.',
    optionen: ['print("Willkommen"', 'while x < 5 print(x)', 'umfang = 2 * laenge + breite  # Umfang eines Rechtecks', 'mittel = summe / 0'], richtig: [0, 1],
    erkl: 'Syntax = Aufbau: Klammer bzw. Doppelpunkt fehlen. Die Umfang-Zeile ist korrekt gebaut, rechnet aber falsch (Semantikfehler, richtig wäre 2 * (laenge + breite)); die Division durch 0 ist ebenfalls ein Fehler der Bedeutung, der erst beim Ausführen auffällt.', quelle: 'OPAL Abiturvorbereitung 5.1.4' },
  { id: 'k27_006', burg: 27, kap: 90, stufe: 2, art: 'wahl', frage: 'Warum müssen Programmiersprachen formale Sprachen sein? Welche Begründung ist stichhaltig?',
    optionen: ['Jede Anweisung braucht genau eine Bedeutung, ein Rechner kann nicht nachfragen', 'Weil Programmiersprachen aus englischen Wörtern bestehen müssen', 'Weil formale Sprachen kürzere Wörter haben und schneller laufen', 'Weil natürliche Sprachen kein festes Alphabet besitzen'],
    erkl: 'Ein Satz wie „Ich habe den Mann mit dem Fernglas gesehen“ hat zwei Lesarten. Programme brauchen eine eindeutige Syntax und Semantik.', quelle: 'OPAL Abiturvorbereitung 5.1.4 c' },

  // ---------- Kapitel 91: Grammatiken und BNF ----------
  { id: 'k27_007', burg: 27, kap: 91, stufe: 1, art: 'zuordnen', frage: 'Eine Grammatik ist ein Viertupel G = (N, T, P, S). Ordne zu.',
    paare: [['N', 'Nichtterminale (Variablen)'], ['T', 'Terminale (Zeichen der Wörter)'], ['P', 'Produktionsregeln'], ['S', 'Startsymbol']],
    erkl: 'Aus dem Startsymbol S werden mit den Regeln P so lange Nichtterminale ersetzt, bis nur noch Terminale dastehen.', quelle: 'OPAL LB6 6.3 Grammatiken' },
  { id: 'k27_008', burg: 27, kap: 91, stufe: 1, art: 'eingabe', frage: 'G = ({S, B}, {a, b}, P, S) mit P = { S → aSb | aB, B → b }. Welches Wort mit genau drei a erzeugt G?',
    antworten: ['aaabbb'],
    erkl: 'S ⇒ aSb ⇒ aaSbb ⇒ aaaBbb ⇒ aaabbb. Jede Anwendung von S → aSb setzt links ein a und rechts ein b – es entstehen genau die Wörter aⁿbⁿ mit n ≥ 1.', quelle: 'OPAL Abiturvorbereitung 5.1.1 e' },
  { id: 'k27_009', burg: 27, kap: 91, stufe: 1, art: 'reihe', frage: 'P = { S → aS | bA, A → bA | c }. Bring die Ableitung von aabbc in die richtige Reihenfolge.',
    teile: ['S', 'aS', 'aaS', 'aabA', 'aabbA', 'aabbc'],
    erkl: 'In jedem Schritt wird das einzige Nichtterminal ersetzt: zweimal S → aS, dann S → bA, dann A → bA und zum Schluss A → c.', quelle: 'OPAL LB6 6.4 Wörter ableiten' },
  { id: 'k27_010', burg: 27, kap: 91, stufe: 1, art: 'mehr', frage: 'Kreuze alle Wörter an, die zu <code> gehören.',
    code: '<code>    ::= "#" <ziffern>\n<ziffern> ::= <ziffer> | <ziffer> <ziffern>\n<ziffer>  ::= "0" | "1"',
    optionen: ['#0', '#101', '#', '##1', '1#'], richtig: [0, 1],
    erkl: 'Ein # vorn, dann mindestens eine Ziffer 0 oder 1. „#“ allein hat keine Ziffer, „##1“ hat ein zweites #, bei „1#“ fehlt das # am Anfang.', quelle: 'OPAL LB6 6.5 BNF' },
  { id: 'k27_011', burg: 27, kap: 91, stufe: 2, art: 'wahl', frage: 'Welche BNF-Regel beschreibt genau die Folgen aus einer oder mehreren Ziffern?',
    optionen: ['<zahl> ::= <ziffer> | <zahl> <ziffer>', '<zahl> ::= <ziffer> <zahl>', '<zahl> ::= <ziffer> | <ziffer> <ziffer>', '<zahl> ::= { <ziffer> }'],
    erkl: 'Eine rekursive Regel braucht eine Abbruchregel. Die zweite endet nie, die dritte erlaubt höchstens zwei Ziffern, { } in EBNF heißt „0-mal oder öfter“ und erlaubt das leere Wort.', quelle: 'OPAL Abiturvorbereitung 5.1.10 c' },
  { id: 'k27_012', burg: 27, kap: 91, stufe: 1, art: 'luecke', frage: 'Ergänze die Bedeutung der EBNF-Klammern.',
    text: 'In der EBNF bedeutet { … } {}, [ … ] bedeutet {}, und | trennt {}.',
    luecken: [['beliebig oft'], ['optional'], ['Alternativen']], woerter: ['beliebig oft', 'optional', 'Alternativen', 'genau einmal', 'Terminale'],
    erkl: '{ } = 0-mal oder öfter wiederholen, [ ] = darf fehlen, | = oder.', quelle: 'OPAL LB6 6.5 BNF, 6.15.3' },
  { id: 'k27_013', burg: 27, kap: 91, stufe: 2, art: 'zuordnen', frage: 'Ordne jede Grammatik dem höchsten passenden Typ der Chomsky-Hierarchie zu.',
    paare: [['S → 0S | 1S | 0', 'Typ 3 (regulär)'], ['S → 0S1 | 01', 'Typ 2 (kontextfrei)'], ['S → aSBc | abc, cB → Bc, bB → bb', 'Typ 1 (kontextsensitiv)'], ['S → AB, AB → b', 'Typ 0 (allgemein)']],
    erkl: 'Typ 3: nur A → aB und A → a. Typ 2: links genau ein Nichtterminal. Typ 1: links mehrere Symbole erlaubt, aber nicht verkürzend. AB → b ist verkürzend, das gibt es erst bei Typ 0.', quelle: 'OPAL LB6 6.6 Chomsky, 6.15.4' },
  { id: 'k27_014', burg: 27, kap: 91, stufe: 3, art: 'wahl', frage: 'Welche Sprache erzeugt P = { S → aSc | B, B → bB | b }?',
    optionen: ['{ aⁿ bᵐ cⁿ | n ≥ 0, m ≥ 1 }', '{ aⁿ bⁿ cⁿ | n ≥ 1 }', '{ aⁿ bᵐ cᵐ | n, m ≥ 1 }', 'alle Wörter aus a, b und c in dieser Reihenfolge'],
    erkl: 'S → aSc koppelt die Anzahl der a an die der c (auch 0-mal möglich), B erzeugt mindestens ein b. Die Anzahl der b ist unabhängig.', quelle: 'OPAL LB6 6.15.2 (Musterlösung)' },
  { id: 'k27_015', burg: 27, kap: 91, stufe: 3, art: 'wahl', frage: 'Warum gehört P = { S → aSc | B, B → bB | b } nicht zum Typ 3?',
    optionen: ['In aSc steht hinter dem Nichtterminal noch ein Terminal', 'Weil die Grammatik zwei verschiedene Nichtterminale hat', 'Weil auf der linken Seite mehr als ein Symbol steht', 'Weil die Grammatik auch das leere Wort erzeugen kann'],
    erkl: 'Bei Typ 3 steht rechts höchstens ein Nichtterminal, und zwar ganz hinten. Regulär sind nur Regeln A → aB oder A → a (auch S → B passt streng genommen nicht). Die Grammatik ist kontextfrei (Typ 2), und die Sprache ist auch nicht regulär, weil die Anzahl der a und c übereinstimmen muss.', quelle: 'OPAL LB6 6.15.2 (Musterlösung)' },

  // ---------- Kapitel 92: Endliche Automaten ----------
  { id: 'k27_016', burg: 27, kap: 92, stufe: 1, art: 'mehr', frage: 'Startzustand q0, Endzustand q1. Kreuze alle Wörter an, die der Automat akzeptiert.',
    bild: () => svgAutomat({ zustaende: ['q0', 'q1', 'q2', 'q3'], start: 'q0', ende: ['q1'], delta: { q0: { a: 'q1', b: 'q2' }, q1: { a: 'q1', b: 'q2' }, q2: { a: 'q3', b: 'q0' }, q3: { a: 'q3', b: 'q0' } } }),
    optionen: ['a', 'bba', 'aaba', 'ab', 'baba'], richtig: [0, 1, 4],
    erkl: 'bba: q0 → q2 → q0 → q1 ✓. aaba endet in q3, ab in q2. Akzeptiert wird nur, wenn der Automat nach dem letzten Zeichen in q1 ist.', quelle: 'OPAL Abiturvorbereitung 5.1.5' },
  { id: 'k27_017', burg: 27, kap: 92, stufe: 2, art: 'wahl', frage: 'Beschreibe verbal: Welche Wörter akzeptiert dieser Automat (Start q0, Ende q1)?',
    bild: () => svgAutomat({ zustaende: ['q0', 'q1', 'q2', 'q3'], start: 'q0', ende: ['q1'], delta: { q0: { a: 'q1', b: 'q2' }, q1: { a: 'q1', b: 'q2' }, q2: { a: 'q3', b: 'q0' }, q3: { a: 'q3', b: 'q0' } } }),
    optionen: ['Wörter mit einer geraden Anzahl b, die auf a enden', 'alle Wörter, die auf a enden', 'Wörter mit einer geraden Anzahl a', 'Wörter mit einer ungeraden Anzahl b, die auf a enden'],
    erkl: 'Jedes b wechselt zwischen oben (q0, q1) und unten (q2, q3) – oben heißt „gerade viele b“. Ein a führt nach q1 bzw. q3, also merkt sich der Automat zusätzlich, ob das letzte Zeichen ein a war.', quelle: 'OPAL Abiturvorbereitung 5.1.5 c' },
  { id: 'k27_018', burg: 27, kap: 92, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.7 DEA',
    bild: () => svgAutomat({ zustaende: ['q0', 'q1', 'q2', 'q3'], start: 'q0', ende: ['q1'], delta: { q0: { a: 'q1', b: 'q2' }, q1: { a: 'q1', b: 'q2' }, q2: { a: 'q3', b: 'q0' }, q3: { a: 'q3', b: 'q0' } } }),
    gen: (z) => {
      const d = { q0: { a: 'q1', b: 'q2' }, q1: { a: 'q1', b: 'q2' }, q2: { a: 'q3', b: 'q0' }, q3: { a: 'q3', b: 'q0' } };
      let w = '';
      for (let i = z.int(4, 6); i > 0; i--) w += z.wahl(['a', 'b']);
      let s = 'q0';
      const weg = [s];
      for (const c of w) { s = d[s][c]; weg.push(s); }
      return { frage: `In welchem Zustand ist der Automat nach dem Wort ${w}?`, antworten: [s], erkl: `Zustandsfolge: ${weg.join(' → ')}. ${s === 'q1' ? 'Das Wort wird akzeptiert.' : 'Kein Endzustand – das Wort wird abgelehnt.'}` };
    } },
  { id: 'k27_019', burg: 27, kap: 92, stufe: 1, art: 'zuordnen', frage: 'Ein DEA ist ein Fünftupel A = (Q, Σ, δ, q₀, F). Ordne zu.',
    paare: [['Q', 'Menge der Zustände'], ['Σ', 'Eingabealphabet'], ['δ', 'Übergangsfunktion'], ['q₀', 'Startzustand'], ['F', 'Menge der Endzustände']],
    erkl: 'δ ordnet jedem Paar (Zustand, Zeichen) genau einen Folgezustand zu – deshalb „deterministisch“.', quelle: 'OPAL LB6 6.7 DEA' },
  { id: 'k27_020', burg: 27, kap: 92, stufe: 1, art: 'luecke', frage: 'Ergänze die Beschreibung eines Fangzustands.',
    text: 'Ein Fangzustand ist {} Endzustand. Alle seine Übergänge führen {}. Ein Wort, das ihn erreicht, wird {}.',
    luecken: [['kein'], ['zu ihm selbst'], ['verworfen']], woerter: ['kein', 'ein', 'zu ihm selbst', 'zum Startzustand', 'verworfen', 'akzeptiert'],
    erkl: 'Der Fangzustand (Trap-Zustand) sammelt alle Wörter, die nicht mehr gültig werden können. Er macht die Übergangsfunktion vollständig.', quelle: 'OPAL LB6 6.8 Fangzustand' },
  { id: 'k27_021', burg: 27, kap: 92, stufe: 2, art: 'wahl', frage: 'Dieser Automat (Start q0, Ende q1) hat keinen Fangzustand. Warum ist er trotzdem ein vollständiger DEA?',
    bild: () => svgAutomat({ zustaende: ['q0', 'q1', 'q2', 'q3'], start: 'q0', ende: ['q1'], delta: { q0: { a: 'q1', b: 'q2' }, q1: { a: 'q1', b: 'q2' }, q2: { a: 'q3', b: 'q0' }, q3: { a: 'q3', b: 'q0' } } }),
    optionen: ['Jeder Zustand hat zu jedem Zeichen genau einen Übergang', 'Ein DEA braucht grundsätzlich nie einen Fangzustand', 'q3 ist sein Fangzustand, weil q3 kein Endzustand ist', 'Weil er nur zwei verschiedene Zeichen lesen muss'],
    erkl: 'Vollständig heißt: δ ist für alle Paare definiert. Einen Fangzustand braucht man nur, wenn ein Wort gar nicht mehr gültig werden kann – hier kommt man von q3 mit b und a wieder nach q1.', quelle: 'OPAL Abiturvorbereitung 5.1.5 d' },
  { id: 'k27_022', burg: 27, kap: 92, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.7 DEA (Zählautomat)',
    gen: (z) => {
      const k = z.int(2, 5);
      return { frage: `Ein DEA über {a, b} soll genau die Wörter akzeptieren, in denen die Anzahl der a durch ${k} teilbar ist. Wie viele Zustände braucht er mindestens?`, antworten: [String(k)],
        erkl: `Er muss sich nur den Rest der Anzahl a modulo ${k} merken: ${k} Zustände (Rest 0 bis ${k - 1}), Rest 0 ist Start- und Endzustand. Ein b ändert nichts.` };
    } },
  { id: 'k27_023', burg: 27, kap: 92, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.15.5 DEA entwerfen',
    gen: (z) => {
      const k = z.int(1, 4);
      return { frage: `Ein vollständiger DEA über {a, b} soll genau die Wörter mit genau ${k}-mal a akzeptieren. Wie viele Zustände hat er mindestens – Fangzustand mitgezählt?`, antworten: [String(k + 2)],
        erkl: `Zustände für „0, 1, …, ${k} a gelesen“ (${k + 1} Stück, der letzte ist Endzustand) plus ein Fangzustand für „mehr als ${k} a“: ${k + 2}.` };
    } },
  { id: 'k27_024', burg: 27, kap: 92, stufe: 3, art: 'wahl', frage: 'Kim sagt: „Den Fangzustand kann man einfach weglassen. Der Automat akzeptiert dann dieselben Wörter und bleibt ein DEA.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Sprache gleich, aber δ ist nur noch partiell: kein vollständiger DEA', 'Falsch: Ohne Fangzustand akzeptiert der Automat mehr Wörter', 'Richtig in beiden Teilen: Ein DEA braucht nie ein totales δ', 'Falsch: Ohne Fangzustand wird der Automat nichtdeterministisch'],
    erkl: 'Beide Teile der Aussage getrennt prüfen: Die Sprache bleibt gleich, weil fehlende Übergänge „verwerfen“ bedeuten – aber die Übergangsfunktion ist nicht mehr total. Nichtdeterminismus entsteht erst durch mehrere Folgezustände.', quelle: 'OPAL Abiturvorbereitung 5.1.1 f' },
  { id: 'k27_025', burg: 27, kap: 92, stufe: 3, art: 'wahl', frage: 'Ein Schließfach (Tasten 1, 2, 3) soll öffnen, sobald die letzten drei Tasten 3-1-2 waren. Ein Kollege baut einen Automaten, der bei jeder falschen Taste in den Startzustand springt und dort mit der nächsten Taste weitermacht. Bei welcher Eingabe entscheidet sein Automat falsch?',
    optionen: ['3312', '312', '1312', '2312'],
    erkl: 'Bei 3312 ist die zweite 3 für ihn „falsch“, er springt zurück und vergisst, dass diese 3 schon der Anfang eines neuen Codes ist. Richtig: Eine 3 führt aus jedem Zustand in den Zustand „3 getippt“.', quelle: 'OPAL Abiturvorbereitung 5.1.2 c' },

  // ---------- Kapitel 93: NEA und Potenzmengen ----------
  { id: 'k27_026', burg: 27, kap: 93, stufe: 1, art: 'wahl', frage: 'Wann akzeptiert ein NEA ein Wort?',
    optionen: ['wenn mindestens ein Weg in einem Endzustand endet', 'wenn alle Berechnungswege in einem Endzustand enden', 'wenn der zuerst gefundene Weg in einem Endzustand endet', 'wenn kein einziger Berechnungsweg hängen bleibt'],
    erkl: 'Ein NEA „rät“ richtig: Es genügt ein einziger erfolgreicher Weg.', quelle: 'OPAL LB6 6.9 DEA und NEA, 6.15.6' },
  { id: 'k27_027', burg: 27, kap: 93, stufe: 1, art: 'mehr', frage: 'Woran erkennt man, dass ein Automat nichtdeterministisch ist? Kreuze alle Gründe an.',
    optionen: ['Ein Zustand hat für dasselbe Zeichen zwei verschiedene Übergänge', 'Es gibt ε-Übergänge (ohne ein Zeichen zu lesen)', 'Es gibt mehrere Endzustände', 'Es gibt einen Fangzustand'], richtig: [0, 1],
    erkl: 'Mehrere Endzustände oder ein Fangzustand gibt es auch bei DEA. Nichtdeterministisch ist es, wenn der Folgezustand nicht eindeutig feststeht.', quelle: 'OPAL LB6 6.9 NEA und ε-Übergänge' },
  { id: 'k27_028', burg: 27, kap: 93, stufe: 2, art: 'wahl', frage: 'Welche Sprache akzeptiert dieser NEA (Start q0, Endzustand q2)?',
    code: 'δ        | 0         | 1\n→ q0     | {q0, q1}  | {q0}\nq1       | {q2}      | –\nq2 (End) | –         | –',
    optionen: ['alle Wörter über {0, 1}, die auf 00 enden', 'alle Wörter, die 00 enthalten', 'alle Wörter, die mit 00 beginnen', 'alle Wörter mit genau zwei Nullen'],
    erkl: 'q0 liest beliebig viel. Der NEA „rät“ bei einer 0, dass die letzten zwei Zeichen beginnen: q0 –0→ q1 –0→ q2, danach darf nichts mehr kommen.', quelle: 'OPAL LB6 6.15.6 (Musterlösung)' },
  { id: 'k27_029', burg: 27, kap: 93, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.10 Potenzmengenkonstruktion',
    code: 'δ        | 0         | 1\n→ q0     | {q0, q1}  | {q0}\nq1       | {q2}      | –\nq2 (End) | –         | –',
    gen: (z) => {
      const d = { q0: { 0: ['q0', 'q1'], 1: ['q0'] }, q1: { 0: ['q2'], 1: [] }, q2: { 0: [], 1: [] } };
      let w = '';
      for (let i = z.int(3, 5); i > 0; i--) w += z.wahl(['0', '1']);
      let m = ['q0'];
      const weg = ['{q0}'];
      for (const c of w) {
        const neu = new Set();
        for (const q of m) for (const p of d[q][c]) neu.add(p);
        m = [...neu].sort();
        weg.push(`{${m.join(', ')}}`);
      }
      const t = m.join(',');
      return { frage: `Potenzmengenkonstruktion: Welche Zustandsmenge erreicht der DEA nach dem Wort ${w}? (z. B. {q0, q1})`, antworten: [`{${t}}`, t],
        erkl: `${weg.join(' → ')}. ${m.includes('q2') ? 'Die Menge enthält q2, also Endzustand – akzeptiert.' : 'Ohne q2 kein Endzustand – abgelehnt.'}` };
    } },
  { id: 'k27_030', burg: 27, kap: 93, stufe: 2, art: 'eingabe', zahl: true, frage: 'Wie viele Zustände hat der DEA, der durch Potenzmengenkonstruktion aus diesem NEA entsteht (die leere Menge nicht mitgezählt)?',
    code: 'δ        | 0         | 1\n→ q0     | {q0, q1}  | {q0}\nq1       | {q2}      | –\nq2 (End) | –         | –',
    antworten: ['3'], erkl: 'Erreichbar sind nur {q0}, {q0, q1} und {q0, q1, q2}. Mit 1 geht es von jeder Menge zurück nach {q0}.', quelle: 'OPAL LB6 6.15.6 (Musterlösung)' },
  { id: 'k27_031', burg: 27, kap: 93, stufe: 2, art: 'wahl', frage: 'Welche Zustände des DEA aus der Potenzmengenkonstruktion sind Endzustände?',
    optionen: ['jede Menge, die mindestens einen Endzustand des NEA enthält', 'nur die Menge, die genau alle Endzustände des NEA enthält', 'jede Menge, die mehr als einen Zustand des NEA enthält', 'die Menge, die bei der Konstruktion zuletzt entsteht'],
    erkl: 'Ein DEA-Zustand steht für „der NEA kann in einem dieser Zustände sein“. Ist ein Endzustand dabei, gibt es einen akzeptierenden Weg.', quelle: 'OPAL LB6 6.10 Potenzmengenkonstruktion' },
  { id: 'k27_032', burg: 27, kap: 93, stufe: 3, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.10 (Vertiefung), Lehrplan LB 6',
    gen: (z) => {
      const k = z.int(2, 4);
      return { frage: `Die Sprache „das ${k}.-letzte Zeichen ist eine 1“ über {0, 1} erkennt ein NEA mit ${k + 1} Zuständen. Wie viele Zustände hat der kleinste DEA für diese Sprache?`, antworten: [String(2 ** k)],
        erkl: `Der DEA muss sich die letzten ${k} Zeichen merken – das sind 2^${k} = ${2 ** k} Möglichkeiten. Bei der Potenzmengenkonstruktion kann die Zahl der Zustände exponentiell wachsen.` };
    } },

  // ---------- Kapitel 160: Grammatik ↔ Automat ----------
  { id: 'k27_033', burg: 27, kap: 160, stufe: 1, art: 'luecke', frage: 'Ergänze das Verfahren „Automat → reguläre Grammatik“.',
    text: 'Jeder Zustand wird ein Nichtterminal. Aus dem Übergang q –a→ p wird die Regel {}. Ist p ein Endzustand, kommt die Regel {} dazu. Der Fangzustand bekommt {} Regel.',
    luecken: [['q → ap'], ['q → a'], ['keine']], woerter: ['q → ap', 'q → a', 'p → aq', 'q → ε', 'keine', 'eine eigene'],
    erkl: 'Eine Grammatik erzeugt nur gültige Wörter – aus dem Fangzustand entsteht nie ein gültiges Wort, deshalb fällt er weg.', quelle: 'OPAL LB6 6.11 Grammatik und Automat' },
  { id: 'k27_034', burg: 27, kap: 160, stufe: 2, art: 'mehr', frage: 'Der DEA akzeptiert Wörter mit genau einem b (Start Z0, Ende Z1, F = Fangzustand). Kreuze alle Regeln an, die zur regulären Grammatik gehören.',
    bild: () => svgAutomat({ zustaende: ['Z0', 'Z1', 'F'], start: 'Z0', ende: ['Z1'], delta: { Z0: { a: 'Z0', b: 'Z1' }, Z1: { a: 'Z1', b: 'F' }, F: { a: 'F', b: 'F' } } }, { fang: 'F' }),
    optionen: ['Z0 → bZ1', 'Z0 → b', 'Z1 → aZ1', 'Z1 → a', 'Z1 → bF', 'Z0 → a'], richtig: [0, 1, 2, 3],
    erkl: 'Übergänge in den Endzustand Z1 liefern zusätzlich Z0 → b und Z1 → a. Z0 → a wäre falsch, weil Z0 kein Endzustand ist; Regeln mit F fallen weg.', quelle: 'OPAL LB6 6.15.7 (Musterlösung)' },
  { id: 'k27_035', burg: 27, kap: 160, stufe: 2, art: 'wahl', frage: 'Aus G = ({S, K}, {a, b}, { S → aK, K → bK | b }, S) wird nach dem Kursverfahren ein Automat (Nichtterminale = Zustände, dazu ein neuer Endzustand E). Warum entsteht ein NEA?',
    optionen: ['K hat mit b zwei Folgezustände: K und E', 'Weil S nur eine einzige Regel hat', 'Weil die Grammatik kontextfrei ist', 'Weil E keine eigenen Übergänge hat'],
    erkl: 'Aus K führen mit b zwei Kanten: zurück nach K (K → bK) und nach E (K → b). Für dasselbe Paar (K, b) gibt es also zwei Folgezustände. Mit der Potenzmengenkonstruktion wird daraus ein DEA.', quelle: 'OPAL Abiturvorbereitung 5.1.6 b' },
  { id: 'k27_036', burg: 27, kap: 160, stufe: 2, art: 'luecke', frage: 'P = { S → aA, A → bA | ε }. Ergänze die Regeln, nachdem die ε-Regel entfernt wurde (Sprache unverändert).',
    text: 'S → aA | {}   A → bA | {}', luecken: [['a'], ['b']], woerter: ['a', 'b', 'ε', 'aA', 'bA'],
    erkl: 'A kann ε erzeugen, also wird bei jeder Regel mit A rechts eine Variante ohne A ergänzt: S → a und A → b. Dann darf A → ε gestrichen werden. Die Sprache bleibt a b*.', quelle: 'OPAL LB6 6.12 ε-Regeln' },
  { id: 'k27_037', burg: 27, kap: 160, stufe: 3, art: 'wahl', frage: 'Eine Schülerin gibt zur Grammatik eines DEA auch Regeln für den Fangzustand an: F → aF | bF. Beurteile.',
    optionen: ['Sprache gleich, die Regeln sind aber nutzlos: Aus F entsteht nie ein Wort', 'Falsch, dadurch erzeugt die Grammatik zusätzlich ungültige Wörter', 'Notwendig, sonst fehlen der Grammatik einige gültige Wörter', 'Dadurch wird aus der regulären eine kontextfreie Grammatik'],
    erkl: 'Es gibt keine Regel F → a, also endet keine Ableitung über F – aus F lässt sich nie ein Wort nur aus Terminalen ableiten. Die Korrektoren im Abitur 2026 merkten genau das an: kein Nichtterminal für den Fangzustand.', quelle: 'OPAL Abiturvorbereitung 5.1 (Korrektorenhinweis 2026)' },

  // ---------- Kapitel 94: Grenzen der Automaten ----------
  { id: 'k27_038', burg: 27, kap: 94, stufe: 1, art: 'mehr', frage: 'Kreuze alle Sprachen an, die regulär sind.',
    optionen: ['Wörter über {a, b} mit gerader Anzahl a', '{ aⁿbⁿ | n ≥ 1 }', 'korrekt geklammerte Ausdrücke', 'Binärwörter, die auf 00 enden', '{ aⁿ b aⁿ | n ≥ 0 }', 'Postleitzahlen aus genau 5 Ziffern'], richtig: [0, 3, 5],
    erkl: 'Zählen modulo einer festen Zahl, Endungen und endliche Sprachen gehen mit endlich vielen Zuständen. aⁿbⁿ, aⁿbaⁿ und Klammern verlangen unbeschränktes Zählen.', quelle: 'OPAL LB6 6.13 Grenzen von Automaten, 6.15.9' },
  { id: 'k27_039', burg: 27, kap: 94, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Typ der Chomsky-Hierarchie den Automaten zu, der genau diese Sprachen erkennt.',
    paare: [['Typ 3 (regulär)', 'endlicher Automat'], ['Typ 2 (kontextfrei)', 'Kellerautomat'], ['Typ 1 (kontextsensitiv)', 'linear beschränkter Automat'], ['Typ 0', 'Turingmaschine']],
    erkl: 'Je kleiner die Typnummer, desto mächtiger muss die Maschine sein.', quelle: 'OPAL LB6 6.13, Abiturvorbereitung 5.1.8 d' },
  { id: 'k27_040', burg: 27, kap: 94, stufe: 2, art: 'wahl', frage: 'Warum erkennt kein endlicher Automat die Sprache { aⁿbⁿ | n ≥ 1 }?',
    optionen: ['Er müsste sich die Anzahl der a beliebig groß merken, hat aber nur endlich viele Zustände', 'Weil zwei verschiedene Zeichen vorkommen', 'Weil die Wörter beliebig lang sind – lange Wörter kann ein DEA nicht lesen', 'Weil ihm der Fangzustand fehlt'],
    erkl: 'Lange Wörter liest ein DEA problemlos (z. B. „gerade Anzahl a“). Das Problem ist das unbeschränkte Zählen: Bei mehr a als Zuständen müssen zwei Anzahlen im selben Zustand landen.', quelle: 'OPAL LB6 6.13 Grenzen von Automaten' },
  { id: 'k27_041', burg: 27, kap: 94, stufe: 2, art: 'reihe', frage: 'Ein Kellerautomat prüft ein Wort aⁿbⁿ. Bring seine Arbeitsweise in die richtige Reihenfolge.',
    teile: ['für jedes gelesene a ein Zeichen auf den Keller legen', 'beim ersten b in den Zustand „b lesen“ wechseln', 'für jedes gelesene b ein Zeichen vom Keller nehmen', 'am Wortende: Keller leer → akzeptieren'],
    erkl: 'Der Keller (Stapel, LIFO) ersetzt das Zählen: Jedes b „verbraucht“ ein a. Bleibt etwas übrig oder fehlt etwas, wird verworfen.', quelle: 'OPAL LB6 6.13, Abiturvorbereitung 5.1.8' },
  { id: 'k27_042', burg: 27, kap: 94, stufe: 2, art: 'mehr', frage: 'Was kann ein Kellerautomat, was ein DEA nicht kann? Kreuze alle an.',
    optionen: ['sich beliebig viele Zeichen in seinem Keller merken', '{ aⁿbⁿ | n ≥ 1 } erkennen', 'die Eingabe Zeichen für Zeichen lesen', 'beliebig weit in seinem Keller nach unten lesen'], richtig: [0, 1],
    erkl: 'Lesen und Zustandswechsel kann auch der DEA. Der Kellerautomat hat zusätzlich einen unbegrenzten Stapel – er kommt aber nur an das oberste Zeichen (LIFO).', quelle: 'OPAL LB6 6.13 Grenzen von Automaten, Torwerk Kapitel 94' },
  { id: 'k27_043', burg: 27, kap: 94, stufe: 2, art: 'wahl', frage: 'Welcher Automat kann die Sprache L = { aⁿbⁿ | n ≥ 1 } (z. B. ab, aabb, aaabbb) erkennen?',
    optionen: ['ein Kellerautomat', 'ein DEA, wenn er genügend viele Zustände hat', 'ein NEA, weil er raten darf', 'keiner – die Sprache ist nicht erkennbar'],
    erkl: 'Der Automat muss sich beliebig viele a merken. Ein DEA/NEA hat nur endlich viele Zustände; der Kellerautomat legt je a ein Zeichen in den Keller und nimmt je b eines heraus.', quelle: 'OPAL LB6 Kellerautomat; Torwerk Kapitel 94' },
  { id: 'k27_044', burg: 27, kap: 94, stufe: 3, art: 'wahl', frage: 'Eine Firma will mit einem DEA-Simulator prüfen, ob Klammern in Formeln wie (2+3)*(4+(1+2)) richtig gesetzt sind. Beurteile das Vorhaben.',
    optionen: ['Nicht möglich bei beliebiger Tiefe, dafür braucht man einen Kellerautomaten', 'Möglich, wenn der DEA genügend Zustände bekommt, z. B. 1000', 'Unmöglich, das schafft auch kein Kellerautomat und kein Parser', 'Möglich, denn in den Formeln kommen nur zwei Klammerzeichen vor'],
    erkl: 'Nötig sind eine kontextfreie Grammatik und ein Kellerautomat; nur bei fest begrenzter Tiefe reicht ein DEA. Bei beliebiger Tiefe müsste der DEA unendlich viele offene Klammern unterscheiden. Beurteilen heißt auch: die Einschränkung nennen, unter der es doch klappt.', quelle: 'OPAL Abiturvorbereitung 5.1.3 d, LB6 6.15.9' },
  { id: 'k27_045', burg: 27, kap: 94, stufe: 3, art: 'eingabe', zahl: true, frage: 'Ein Kellerautomat für { aⁿbⁿ | n ≥ 1 } legt für jedes gelesene a ein Zeichen in den Keller und nimmt für jedes gelesene b eines heraus. Wie viele Zeichen liegen (ohne Startsymbol) im Keller, nachdem er aaaab gelesen hat?',
    antworten: ['3'],
    erkl: 'Vier a legen 4 Zeichen ab, das eine b nimmt eins heraus: 4 − 1 = 3. Erst bei leerem Keller am Wortende wird akzeptiert.', quelle: 'OPAL LB6 Kellerautomat; Torwerk Kapitel 94' },

  // ---------- Kapitel 161: Syntaxdiagramm und Ableitungsbaum ----------
  { id: 'k27_046', burg: 27, kap: 161, stufe: 1, art: 'zuordnen', frage: 'Ordne die Bausteine eines Syntaxdiagramms ihrer Bedeutung zu.',
    paare: [['runder Kasten', 'Terminal – steht genau so im Wort'], ['eckiger Kasten', 'Nichtterminal – hat ein eigenes Diagramm'], ['Umgehungsweg', 'optional, in EBNF [ … ]'], ['Rückwärtsschleife', 'Wiederholung, in EBNF { … }']],
    erkl: 'Ein Syntaxdiagramm liest man wie einen Gleisplan von links nach rechts; jede Weiche ist eine Alternative.', quelle: 'OPAL Abiturvorbereitung 5.1.7' },
  { id: 'k27_047', burg: 27, kap: 161, stufe: 2, art: 'mehr', frage: 'Syntaxdiagramm „Ticket“: zuerst eine Serie (R, S oder T), dann „-“, dann eine Zahl (Ziffer mit Rückwärtsschleife), danach auf einem Umgehungsweg wahlweise ein G. Kreuze alle gültigen Tickets an.',
    optionen: ['T-308G', 'R-42', 'U-7', 'S-', 'R-9GG'], richtig: [0, 1],
    erkl: 'U ist keine Serie, bei S- fehlt die Zahl (die Schleife verlangt mindestens eine Ziffer), und G darf höchstens einmal vorkommen.', quelle: 'OPAL Abiturvorbereitung 5.1.7 a' },
  { id: 'k27_048', burg: 27, kap: 161, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 5.1 (Ableitungsbaum)',
    gen: (z) => {
      const n = z.int(2, 5);
      return { frage: `Grammatik S → aSb | ab. Wie viele Knoten hat der Ableitungsbaum von ${'a'.repeat(n)}${'b'.repeat(n)} – Wurzel und Blätter mitgezählt?`, antworten: [String(3 * n)],
        erkl: `${n} Knoten mit S (jede Regelanwendung eins) und ${2 * n} Blätter (die Zeichen des Worts): ${3 * n}.` };
    } },
  { id: 'k27_049', burg: 27, kap: 161, stufe: 2, art: 'eingabe', frage: 'Grammatik für Roboterprogramme: P → B | B P, B → v | l | r | Z [ P ], Z → 2 | 3. Welches Programm beschreibt der Ableitungsbaum? (ohne Leerzeichen)',
    bild: () => PB_svgBaum(['P', ['B', ['Z', ['3']], ['['], ['P', ['B', ['l']], ['P', ['B', ['v']]]], [']']], ['P', ['B', ['r']]]]),
    antworten: ['3[lv]r'],
    erkl: 'Die Blätter von links nach rechts gelesen ergeben das Wort: 3 [ l v ] r. Das r hängt am zweiten P der Wurzel, also hinter der Klammer.', quelle: 'OPAL Abiturvorbereitung 5.1.2 e' },
  { id: 'k27_050', burg: 27, kap: 161, stufe: 3, art: 'wahl', frage: 'Gibt es für die Roboter-Programme (P → B | B P, B → v | l | r | Z [ P ], Z → 2 | 3) auch eine reguläre Grammatik?',
    optionen: ['Nein, die Klammern sind beliebig tief geschachtelt', 'Ja, man muss nur die Regel B P zu P B umstellen', 'Ja, weil Z nur zwei verschiedene Alternativen hat', 'Nein, weil die Terminale in eckigen Klammern stehen'],
    erkl: 'Umschreiben hilft nicht: Die Sprache selbst verlangt unbeschränktes Zählen der offenen Klammern. Sie ist kontextfrei (Typ 2).', quelle: 'OPAL Abiturvorbereitung 5.1.2 e, LB6 6.13' },
  { id: 'k27_051', burg: 27, kap: 161, stufe: 3, art: 'wahl', frage: 'Grammatik E → E + T | T, T → T * F | F, F → a. Was legt der Ableitungsbaum von a + a * a fest?',
    optionen: ['Das * wird zuerst ausgewertet, weil T * F tiefer im Baum hängt als E + T', 'Das + wird zuerst ausgewertet, weil es weiter links steht', 'Die Reihenfolge ist beliebig, der Baum sagt nichts darüber', 'Nur die Linksableitung bestimmt die Reihenfolge, nicht der Baum'],
    erkl: 'Was tiefer steht, wird zuerst berechnet. So bildet die Grammatik die Regel „Punkt vor Strich“ ab.', quelle: 'OPAL Abiturvorbereitung 5.1 (Ableitungsbaum), LB6 6.14' },

  // ---------- Kapitel 95: Wie ein Compiler liest ----------
  { id: 'k27_052', burg: 27, kap: 95, stufe: 1, art: 'reihe', frage: 'Bring die Phasen eines Compilers in die richtige Reihenfolge.',
    teile: ['lexikalische Analyse (Scanner)', 'syntaktische Analyse (Parser)', 'semantische Analyse', 'Codeerzeugung'],
    erkl: 'Erst Zeichen zu Tokens, dann Tokens zu einem Syntaxbaum, dann Bedeutung (Namen, Typen) prüfen, zuletzt Maschinencode erzeugen.', quelle: 'OPAL LB6 6.14 Compiler und Interpreter' },
  { id: 'k27_053', burg: 27, kap: 95, stufe: 1, art: 'wahl', frage: 'Welche Aussage über Compiler und Interpreter ist richtig?',
    optionen: ['Ein Compiler übersetzt den ganzen Quelltext vor der Ausführung und kann viele Fehler schon vor dem Start melden', 'Ein Interpreter übersetzt das ganze Programm vor dem Start in Maschinencode', 'Ein übersetztes Programm braucht zum Ausführen immer den Compiler', 'Beide melden Fehler zum selben Zeitpunkt, sie unterscheiden sich nur in der Geschwindigkeit'],
    erkl: 'Der Interpreter übersetzt Anweisung für Anweisung während der Ausführung – ein Fehler in einer späten Zeile fällt erst auf, wenn sie dran ist.', quelle: 'OPAL Abiturvorbereitung 5.1.11 a' },
  { id: 'k27_054', burg: 27, kap: 95, stufe: 2, art: 'zuordnen', frage: 'Welche Phase meldet den Fehler? Ordne zu.',
    paare: [['preis = 3 @ 4;', 'lexikalische Analyse'], ['preis = 3 * (4 + 1;', 'syntaktische Analyse'], ['preis = rabatt * 2;  (rabatt wurde nie festgelegt)', 'semantische Analyse']],
    erkl: 'Für @ gibt es kein Token. Die fehlende Klammer passt nicht zur Grammatik. Die letzte Zeile ist richtig gebaut, aber der Name rabatt steht nicht in der Symboltabelle.', quelle: 'OPAL Abiturvorbereitung 5.1.11 c, LB6 6.14' },
  { id: 'k27_055', burg: 27, kap: 95, stufe: 2, art: 'eingabe', zahl: true, frage: 'Der Scanner kennt BEZEICHNER (Buchstabe, dann Buchstaben oder Ziffern), ZAHL, ZUWEISUNG, PLUS, MINUS, MAL, KLAMMER_AUF, KLAMMER_ZU und SEMIKOLON; Leerzeichen trennen nur. Wie viele Tokens erzeugt er für die Zeile?',
    code: 'gesamt3 = (preis + 15) * 2;', antworten: ['10'],
    erkl: 'gesamt3 | = | ( | preis | + | 15 | ) | * | 2 | ; – die Ziffer 3 gehört zum Bezeichner, weil der Scanner das längste passende Teilwort nimmt.', quelle: 'OPAL Abiturvorbereitung 5.1.11 b' },
  { id: 'k27_056', burg: 27, kap: 95, stufe: 3, art: 'wahl', frage: 'Der Scanner kennt die Tokens BEZEICHNER, ZAHL, ZUWEISUNG … und nimmt das längste passende Teilwort. Welche Phase meldet den Fehler in der Zeile 3preis = 5; und warum?',
    optionen: ['die Syntaxanalyse: ZAHL BEZEICHNER ZUWEISUNG passt zu keiner Regel', 'die lexikalische Analyse: Ein Bezeichner darf nicht mit einer Ziffer beginnen', 'die semantische Analyse, weil 3preis nirgends festgelegt wurde', 'keine Phase, denn die Zeile ist ein korrekter Befehl'],
    erkl: 'Der Scanner bildet gültige Tokens ZAHL(3) BEZEICHNER(preis). Erst in Tokens zerlegen: Für 3 und preis gibt es passende Tokens, also kein FEHLER-Token. Die Reihenfolge der Tokens verletzt die Grammatik.', quelle: 'OPAL Abiturvorbereitung 5.1.11 c' },
  { id: 'k27_057', burg: 27, kap: 95, stufe: 3, art: 'wahl', frage: 'Warum kann der Fehler „Variable wurde nie festgelegt“ weder vom Scanner noch vom Parser gefunden werden?',
    optionen: ['Ob ein Name festgelegt ist, hängt vom Kontext ab; das prüft die Symboltabelle', 'Weil der Scanner nur Zahlen und Rechenzeichen als Tokens erkennt', 'Weil der Parser Variablennamen überspringt und nur Klammern zählt', 'Doch, der Parser findet ihn, weil die Grammatik alle Variablen kennt'],
    erkl: 'Die Zeile besteht aus gültigen Tokens in gültiger Reihenfolge. Scanner = endlicher Automat (Typ 3), Parser = kontextfreie Grammatik (Typ 2). „Erst festlegen, dann benutzen“ ist eine kontextabhängige Bedingung.', quelle: 'OPAL Abiturvorbereitung 5.1.11 d' },
  { id: 'k27_058', burg: 27, kap: 95, stufe: 1, art: 'wahl', frage: 'Welches Modell steckt hinter dem Scanner (lexikalische Analyse)?',
    optionen: ['ein endlicher Automat', 'ein Kellerautomat', 'eine kontextfreie Grammatik', 'ein Entscheidungsbaum'],
    erkl: 'Tokens bilden reguläre Sprachen: Bezeichner, Zahlen und Operatoren sind regulär. Erst der Parser braucht für Klammern und Blöcke mehr.', quelle: 'OPAL LB6 6.14, 6.15.9' },

  // ---------- Ergänzungen 2026-11-13: Fehler finden, Lücken, Rechnen, Automat ergänzen ----------
  { id: 'k27_059', burg: 27, kap: 94, stufe: 3, art: 'zeile', frage: 'Malte will mit dem Pumping-Lemma zeigen, dass L = { aᵐbᵏ | m, k ≥ 0 } nicht regulär ist. Tippe die Zeile an, in der sein Beweis falsch wird.',
    code: 'Annahme: L ist regulär mit Pumping-Länge n.\nWähle z = aⁿbⁿ ∈ L, es gilt |z| = 2n ≥ n.\nZerlege u = aⁿ⁻¹, v = ab, w = bⁿ⁻¹.\nDann ist u v² w = aⁿ⁻¹ abab bⁿ⁻¹ ∉ L.\nWiderspruch – also ist L nicht regulär.',
    fehler: [3], erkl: '|uv| = n + 1 > n – diese Zerlegung ist nicht erlaubt. Für jede erlaubte Zerlegung besteht v nur aus a, und Pumpen bleibt in L. L = a*b* ist sogar regulär.', quelle: 'OPAL LB6 6.13 Aufgabe 6.13.10' },
  { id: 'k27_060', burg: 27, kap: 94, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.13 Pumping-Lemma (Beispiel aⁿbⁿ)',
    gen: (z) => {
      const n = z.int(4, 7), k = z.int(1, 3), p = z.int(0, n - k), i = z.wahl([0, 2, 3]);
      return { frage: `L = { aⁿbⁿ }, Pumping-Länge n = ${n}, z = a^${n} b^${n}. Zerlegung: u = a^${p}, v = a^${k}, w = der Rest. Wie viele a hat u v^${i} w?`, antworten: [String(n + (i - 1) * k)],
        erkl: `u v^${i} w hat ${p} + ${i} · ${k} + ${n - p - k} = ${n + (i - 1) * k} a, aber weiterhin ${n} b – das Wort liegt nicht in L. Das ist der Widerspruch im Beweis.` };
    } },
  { id: 'k27_061', burg: 27, kap: 94, stufe: 1, art: 'luecke', frage: 'Ergänze die Bedingungen des Pumping-Lemmas.',
    text: 'Jedes Wort z ∈ L mit |z| ≥ n lässt sich zerlegen in z = uvw mit |uv| {} n, |v| {} 1 und u vⁱ w ∈ L für alle i {} 0.',
    luecken: [['≤'], ['≥'], ['≥']], woerter: ['≤', '≥', '<', '>', '='],
    erkl: 'v liegt in den ersten n Zeichen und ist nicht leer; Pumpen darf auch 0-mal (i = 0) bedeuten.', quelle: 'OPAL LB6 6.13 Merke Pumping-Lemma' },
  { id: 'k27_062', burg: 27, kap: 92, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.9/6.14 reguläre Ausdrücke, Torwerk gc7',
    gen: (z) => {
      const l = z.int(3, 6);
      return { frage: `Wie viele verschiedene Wörter der Länge ${l} beschreibt der reguläre Ausdruck a(b|c)*d?`, antworten: [String(2 ** (l - 2))],
        erkl: `Erstes Zeichen a, letztes d, dazwischen ${l - 2} Stellen mit je b oder c: 2^${l - 2} = ${2 ** (l - 2)}.` };
    } },
  { id: 'k27_063', burg: 27, kap: 92, stufe: 1, art: 'mehr', frage: 'Kreuze alle Wörter an, die zum regulären Ausdruck (a|b)*b gehören.',
    optionen: ['b', 'aab', 'ba', 'bbba', 'abab', 'ε (das leere Wort)'], richtig: [0, 1, 4],
    erkl: '(a|b)* erlaubt beliebige a und b (auch keins), danach muss genau am Ende ein b stehen: alle Wörter, die auf b enden.', quelle: 'OPAL LB6 6.9 Praxisbezug Regex' },
  { id: 'k27_064', burg: 27, kap: 92, stufe: 2, art: 'luecke', frage: 'Der DEA soll Wörter über {a, b} akzeptieren, die auf ab enden (Start s, Ende e). Drei Übergänge fehlen im Bild. Ergänze sie.',
    bild: () => svgAutomat({ zustaende: ['s', 'p', 'e'], start: 's', ende: ['e'], delta: { s: { a: 'p', b: 's' }, p: { b: 'e' }, e: {} } }),
    text: 'δ(p, a) = {}   δ(e, a) = {}   δ(e, b) = {}', luecken: [['p'], ['p'], ['s']], woerter: ['s', 'p', 'e'],
    erkl: 'p heißt „zuletzt a gelesen“: Ein weiteres a lässt ihn in p, nach e bringt ein a wieder nach p. Ein b nach ab heißt „…bb“ – nichts Brauchbares am Ende, also zurück nach s.', quelle: 'OPAL LB6 6.7 DEA entwerfen, Torwerk gc1' },
  { id: 'k27_065', burg: 27, kap: 92, stufe: 2, art: 'zeile', frage: 'Ein DEA soll genau die Wörter über {a, b} mit gerader Anzahl a akzeptieren (Start und Ende g). Tippe die falsche Zeile der Übergangsfunktion an.',
    code: 'δ(g, a) = u\nδ(g, b) = g\nδ(u, a) = u\nδ(u, b) = u',
    fehler: [3], erkl: 'Jedes a muss zwischen „gerade“ und „ungerade“ wechseln: δ(u, a) = g. Ein b ändert nichts.', quelle: 'OPAL LB6 6.7 DEA, Torwerk gc2' },
  { id: 'k27_066', burg: 27, kap: 92, stufe: 2, art: 'zeile', frage: 'Die Funktion soll ein Wort durch den DEA spielen. Sie liefert aber für baab (endet auf ab) False. Tippe die fehlerhafte Zeile an.',
    code: 'def akzeptiert(delta, start, ende, wort):\n    zustand = start\n    for zeichen in wort:\n        if zeichen not in delta[zustand]:\n            return False\n        zustand = delta[zustand][zeichen]\n        return zustand in ende',
    fehler: [7], erkl: 'Das return steht in der Schleife und entscheidet schon nach dem ersten Zeichen. Es gehört hinter die Schleife (eine Stufe weniger eingerückt) – entscheidend ist der Zustand nach dem letzten Zeichen.', quelle: 'Torwerk gc4, OPAL LB6 6.7' },
  { id: 'k27_067', burg: 27, kap: 93, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.10 Potenzmengenkonstruktion',
    gen: (z) => { const n = z.int(3, 6); return { frage: `Ein NEA hat ${n} Zustände. Wie viele Zustände kann der DEA aus der Potenzmengenkonstruktion höchstens haben (die leere Menge mitgezählt)?`, antworten: [String(2 ** n)], erkl: `Jeder DEA-Zustand ist eine Teilmenge der ${n} NEA-Zustände: 2^${n} = ${2 ** n}. Meist sind viel weniger davon erreichbar.` }; } },
  { id: 'k27_068', burg: 27, kap: 93, stufe: 2, art: 'reihe', frage: 'Bring die Schritte der Potenzmengenkonstruktion in die richtige Reihenfolge.',
    teile: ['Startzustand des DEA ist die Menge {Start des NEA}', 'für eine neue Menge und jedes Zeichen die Folgemenge bestimmen', 'jede noch unbekannte Folgemenge als neue Zeile anlegen', 'so lange weiter, bis keine neue Menge mehr entsteht'],
    erkl: 'Endzustände des DEA sind am Ende alle Mengen, die einen Endzustand des NEA enthalten.', quelle: 'OPAL LB6 6.10, Torwerk gd5' },
  { id: 'k27_069', burg: 27, kap: 91, stufe: 2, art: 'zeile', frage: 'Grammatik S → aSb | ab. Tippe die Zeile an, in der die Ableitung falsch wird.',
    code: 'S\n⇒ aSb\n⇒ aaSb\n⇒ aaabb',
    fehler: [3], erkl: 'S → aSb ersetzt S durch aSb, also aSb ⇒ a(aSb)b = aaSbb. Jede Regelanwendung setzt links ein a UND rechts ein b.', quelle: 'OPAL LB6 6.4 Wörter ableiten' },
  { id: 'k27_070', burg: 27, kap: 95, stufe: 2, art: 'eingabe', zahl: true, frage: 'In welcher Zeile meldet die semantische Analyse einen Fehler?',
    code: '1  x = 4\n2  y = x + 2\n3  if y > 5:\n4      z = y * 2\n5  print(z + w)',
    antworten: ['5'], erkl: 'In Zeile 5 wird w benutzt, das nie festgelegt wurde – es fehlt in der Symboltabelle. Syntaktisch sind alle Zeilen korrekt.', quelle: 'Torwerk gf1b, OPAL LB6 6.14' },
  { id: 'k27_071', burg: 27, kap: 90, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB6 6.2 Formale Sprache, Torwerk ga1b',
    gen: (z) => { const k = z.int(1, 3); return { frage: `Ein Passierschein besteht aus zwei Großbuchstaben (A–Z), einem „-“ und genau ${k} Ziffer${k > 1 ? 'n' : ''}. Wie viele Wörter hat diese Sprache?`, antworten: [String(676 * 10 ** k)], erkl: `26 · 26 · 10^${k} = ${676 * 10 ** k}. Die Sprache ist endlich, obwohl sie viele Wörter hat.` }; } },
  { id: 'k27_072', burg: 27, kap: 95, stufe: 1, art: 'luecke', frage: 'Ergänze: Compiler oder Interpreter?',
    text: 'Ein {} übersetzt das ganze Programm vor dem Start. Ein {} übersetzt Anweisung für Anweisung während der Ausführung. Fehlende Namen findet die {} mit der Symboltabelle.',
    luecken: [['Compiler'], ['Interpreter'], ['semantische Analyse']], woerter: ['Compiler', 'Interpreter', 'semantische Analyse', 'lexikalische Analyse', 'Parser'],
    erkl: 'Python ist ein Interpreter: Ein Fehler in einer späten Zeile fällt erst auf, wenn sie an der Reihe ist.', quelle: 'Torwerk gf1b, OPAL LB6 6.14' },
  { id: 'k27_073', burg: 27, kap: 92, stufe: 2, art: 'zeile', frage: 'akzeptiert soll ein Wort durch den DEA delta spielen. Bei Wörtern mit mehr als einem Zeichen geht es schief. Tippe die falsche Zeile an.',
    code: 'def akzeptiert(delta, start, ende, wort):\n    zustand = start\n    for zeichen in wort:\n        if zeichen not in delta[zustand]:\n            return False\n        zustand = delta[start][zeichen]\n    return zustand in ende',
    fehler: [6], erkl: 'Der DEA geht vom aktuellen Zustand weiter: zustand = delta[zustand][zeichen]. Mit delta[start] fängt er bei jedem Zeichen wieder vorn an.', quelle: 'Torwerk gc4, OPAL LB6 6.8' },
  { id: 'k27_074', burg: 27, kap: 93, stufe: 3, art: 'zeile', frage: 'nea_akzeptiert soll die Menge aller möglichen Zustände des NEA verfolgen. Tippe die falsche Zeile an.',
    code: 'def nea_akzeptiert(delta, start, ende, wort):\n    aktuell = [start]\n    for zeichen in wort:\n        neu = []\n        for z in aktuell:\n            for t in delta[start].get(zeichen, []):\n                if t not in neu:\n                    neu.append(t)\n        aktuell = neu\n    for z in aktuell:\n        if z in ende:\n            return True\n    return False',
    fehler: [6], erkl: 'Die Folgezustände müssen von jedem Zustand z der aktuellen Menge kommen: delta[z].get(zeichen, []). Mit delta[start] zählt nur der Startzustand.', quelle: 'Torwerk gd2, OPAL LB6 6.9' },
  { id: 'k27_075', burg: 27, kap: 94, stufe: 3, art: 'zeile', frage: 'anbn soll wie ein Kellerautomat Wörter über {a, b} der Form aⁿbⁿ mit n ≥ 1 erkennen. Ein Wort wird fälschlich akzeptiert. Tippe die falsche Zeile an.',
    code: 'def anbn(wort):\n    stapel = []\n    b_gesehen = False\n    for z in wort:\n        if z == "a":\n            if b_gesehen:\n                return False\n            stapel.append("a")\n        else:\n            b_gesehen = True\n            if len(stapel) == 0:\n                return False\n            stapel.pop()\n    return len(stapel) == 0',
    fehler: [14], erkl: 'Das leere Wort lässt den Stapel auch leer – es gehört aber nicht dazu (n ≥ 1). Richtig: return b_gesehen and len(stapel) == 0.', quelle: 'Torwerk ge2, OPAL LB6 6.13 Kellerautomat' },
);
