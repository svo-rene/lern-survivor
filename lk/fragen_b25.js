'use strict';
// 🗝️ Kerker-Fragen Burg 25 (LK Daten) – Quellen: OPAL „LK INF LB 9 – Datenmanagement“ (1.2–1.21 Relationale
// Datenbanken inkl. Selbstcheck 1.21, 2.1–2.4 NoSQL/CAP inkl. Selbstcheck, 3.1–3.15 Datenverarbeitung mit Python
// inkl. Selbstcheck), OPAL „LK INF Abiturvorbereitung“ 7.1 Relationale Datenbanken und 7.2 Datenmanagement,
// Lehrplan Sachsen LK Informatik LB 9 „Datenmanagement“. SQL-Ergebnisse mit sqlite3 geprüft.
// Gemeinsame Beispieldaten (in jeder Frage als Code abgedruckt):
//   dorf(id, name): 1 Lindenhain, 2 Mühlbach, 3 Steinfeld, 4 Seedorf
//   haendler(id, name, ↑dorf_id): 1 Anna 1, 2 Bruno 1, 3 Clara 2, 4 David 3, 5 Ella NULL, 6 Anna 2
//   verkauf(id, ↑haendler_id, ware, menge, preis): siehe unten
KERKER_FRAGEN.push(
  // ---------------------------------------------------------------------------------------------
  // Kapitel 70: Mehrere Tabellen – JOIN, GROUP BY, HAVING
  { id: 'k25_001', burg: 25, kap: 70, stufe: 1, art: 'wahl', frage: 'Gesucht sind alle Händler (haendler_id genügt), die mindestens zwei Verkäufe haben, mit der Zahl ihrer Verkäufe. Welche Abfrage liefert genau das?',
    optionen: ['SELECT haendler_id, COUNT(*) FROM verkauf GROUP BY haendler_id HAVING COUNT(*) >= 2;', 'SELECT haendler_id, COUNT(*) FROM verkauf WHERE COUNT(*) >= 2 GROUP BY haendler_id;', 'SELECT haendler_id, COUNT(*) FROM verkauf HAVING COUNT(*) >= 2;', 'SELECT haendler_id, COUNT(*) FROM verkauf GROUP BY haendler_id ORDER BY COUNT(*) DESC;'],
    erkl: 'WHERE prüft einzelne Zeilen, bevor gezählt wird – Aggregatfunktionen dürfen dort nicht stehen. Ohne GROUP BY gibt es nur eine Gruppe (die ganze Tabelle). ORDER BY sortiert nur, es filtert nicht.', quelle: 'OPAL LB 9 1.5 Aggregatfunktionen (WHERE oder HAVING); Abiturvorbereitung 7.1.4 a' },
  { id: 'k25_002', burg: 25, kap: 70, stufe: 1, art: 'reihe', frage: 'In welcher Reihenfolge wertet die Datenbank die Teile einer SELECT-Abfrage aus?',
    teile: ['FROM (mit JOIN)', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'],
    erkl: 'Erst werden die Tabellen verbunden, dann einzelne Zeilen gefiltert (WHERE), gruppiert, ganze Gruppen gefiltert (HAVING), die Spalten berechnet und zuletzt sortiert.', quelle: 'Abiturvorbereitung 7.1.4 c Stufe 2' },
  { id: 'k25_003', burg: 25, kap: 70, stufe: 2, art: 'eingabe', zahl: true, frage: 'Wie viele Zeilen liefert die Abfrage?',
    code: `verkauf(id, haendler_id, ware, menge, preis)
 1 | 1 | Rüben | 20 |  2      6 | 3 | Honig |  2 | 12
 2 | 1 | Honig |  3 | 12      7 | 4 | Wolle |  6 |  8
 3 | 2 | Kohl  | 15 |  3      8 | 6 | Kohl  |  5 |  3
 4 | 3 | Rüben | 25 |  2      9 | 6 | Rüben | 10 |  2
 5 | 3 | Äpfel | 10 |  4

SELECT haendler_id, COUNT(*)
FROM verkauf
GROUP BY haendler_id
HAVING COUNT(*) >= 2;`,
    antworten: ['3'], erkl: 'Händler 1 hat 2, Händler 3 hat 3, Händler 6 hat 2 Verkäufe. Händler 2 und 4 haben nur je einen und fallen durch HAVING heraus.', quelle: 'OPAL LB 9 1.5; Abiturvorbereitung 7.1.4 b' },
  { id: 'k25_004', burg: 25, kap: 70, stufe: 1, art: 'eingabe', zahl: true, frage: 'Wie viele Zeilen liefert die Abfrage?',
    code: `dorf(id, name)
 1 Lindenhain | 2 Mühlbach | 3 Steinfeld | 4 Seedorf
haendler(id, name, dorf_id)
 1 Anna 1 | 2 Bruno 1 | 3 Clara 2 | 4 David 3 | 5 Ella NULL | 6 Anna 2

SELECT h.name, d.name
FROM haendler h
INNER JOIN dorf d ON h.dorf_id = d.id;`,
    antworten: ['5'], erkl: 'INNER JOIN liefert nur Paare, die über die Bedingung zusammenpassen. Ella (dorf_id NULL) fällt heraus, Seedorf hat keinen Händler. Bleiben 5 Zeilen.', quelle: 'OPAL LB 9 1.6 SQL-Joins' },
  { id: 'k25_005', burg: 25, kap: 70, stufe: 2, art: 'wahl', frage: 'Dieselben Tabellen, aber jetzt mit LEFT JOIN. Was ändert sich?',
    code: `SELECT h.name, d.name
FROM haendler h
LEFT JOIN dorf d ON h.dorf_id = d.id;`,
    optionen: ['Ella erscheint zusätzlich, bei ihr steht im Dorfnamen NULL. Seedorf fehlt weiterhin.', 'Seedorf erscheint zusätzlich mit NULL beim Händlernamen. Ella fehlt dagegen weiterhin.', 'Ella und Seedorf erscheinen beide zusätzlich.', 'Nichts – LEFT JOIN und INNER JOIN liefern immer dasselbe.'],
    erkl: 'LEFT JOIN behält alle Zeilen der linken Tabelle (haendler), auch ohne Partner. Dörfer ohne Händler stehen in der rechten Tabelle und kommen nicht dazu.', quelle: 'OPAL LB 9 1.6 SQL-Joins' },
  { id: 'k25_006', burg: 25, kap: 70, stufe: 2, art: 'eingabe', zahl: true, frage: 'Welchen Umsatz liefert die Abfrage für Clara (id 3)?',
    code: `verkauf(id, haendler_id, ware, menge, preis)
 1 | 1 | Rüben | 20 |  2      6 | 3 | Honig |  2 | 12
 2 | 1 | Honig |  3 | 12      7 | 4 | Wolle |  6 |  8
 3 | 2 | Kohl  | 15 |  3      8 | 6 | Kohl  |  5 |  3
 4 | 3 | Rüben | 25 |  2      9 | 6 | Rüben | 10 |  2
 5 | 3 | Äpfel | 10 |  4

SELECT h.name, SUM(v.menge * v.preis) AS umsatz
FROM haendler h
JOIN verkauf v ON v.haendler_id = h.id
GROUP BY h.id, h.name;`,
    antworten: ['114'], erkl: 'Für jede Zeile von Clara wird menge · preis gerechnet und dann summiert: 25 · 2 + 10 · 4 + 2 · 12 = 50 + 40 + 24 = 114.', quelle: 'Abiturvorbereitung 7.1.1 d und 7.1.2 c' },
  { id: 'k25_007', burg: 25, kap: 70, stufe: 3, art: 'eingabe', zahl: true, frage: 'Jemand gruppiert nach dem Namen statt nach der id. Wie viele Zeilen liefert diese Abfrage?',
    code: `haendler(id, name, dorf_id)
 1 Anna 1 | 2 Bruno 1 | 3 Clara 2 | 4 David 3 | 5 Ella NULL | 6 Anna 2
verkauf: Verkäufe gibt es von den Händlern 1, 2, 3, 4 und 6.

SELECT h.name, SUM(v.menge * v.preis)
FROM haendler h
JOIN verkauf v ON v.haendler_id = h.id
GROUP BY h.name;`,
    antworten: ['4'], erkl: 'Zwei verschiedene Händlerinnen heißen Anna (id 1 und 6). Gruppiert nach dem Namen werden ihre Umsätze zusammengeworfen: 4 statt 5 Zeilen. Deshalb nach dem Schlüssel gruppieren!', quelle: 'Abiturvorbereitung 7.1.6 d Stufe 2/3, 7.1.3 c2' },
  { id: 'k25_008', burg: 25, kap: 70, stufe: 1, art: 'luecke', frage: 'Ergänze die Abfrage: Für jedes Dorf sollen der Name und die Zahl seiner Händler erscheinen.',
    text: 'SELECT d.name, COUNT(*)\nFROM dorf d\n{} haendler h {} h.dorf_id = d.id\n{} d.id, d.name;',
    luecken: [['JOIN', 'INNER JOIN'], ['ON'], ['GROUP BY']], woerter: ['JOIN', 'ON', 'GROUP BY', 'WHERE', 'ORDER BY', 'HAVING'],
    erkl: 'JOIN … ON verbindet die Tabellen über Fremdschlüssel und Primärschlüssel, GROUP BY bildet eine Gruppe je Dorf.', quelle: 'OPAL LB 9 1.5 und 1.6' },
  { id: 'k25_009', burg: 25, kap: 70, stufe: 2, art: 'zeile', frage: 'Die Abfrage soll alle Dörfer mit mehr als einem Händler liefern, meldet aber „misuse of aggregate: COUNT()“. Tippe die fehlerhafte Zeile an.',
    code: `SELECT dorf_id, COUNT(*)
FROM haendler
WHERE COUNT(*) > 1
GROUP BY dorf_id;`,
    fehler: [3], erkl: 'Eine Bedingung über eine ganze Gruppe gehört in HAVING hinter GROUP BY: HAVING COUNT(*) > 1. WHERE kennt nur einzelne Zeilen.', quelle: 'OPAL LB 9 1.5; Abiturvorbereitung 7.1.4' },
  { id: 'k25_010', burg: 25, kap: 70, stufe: 1, art: 'mehr', frage: 'Kreuze alle Aggregatfunktionen an.',
    optionen: ['COUNT', 'AVG', 'MAX', 'DISTINCT', 'LIKE', 'SUM'], richtig: [0, 1, 2, 5],
    erkl: 'Aggregatfunktionen fassen viele Zeilen zu einem Wert zusammen: COUNT, SUM, AVG, MIN, MAX. DISTINCT entfernt Doppelte, LIKE vergleicht Texte mit Muster.', quelle: 'OPAL LB 9 1.5; Selbstcheck 1.21' },
  { id: 'k25_011', burg: 25, kap: 70, stufe: 3, art: 'wahl', frage: 'Welchen Wert liefert die Abfrage in der Zeile für Seedorf? (Seedorf hat keinen Händler.)',
    code: `SELECT d.name, COUNT(*)
FROM dorf d
LEFT JOIN haendler h ON h.dorf_id = d.id
GROUP BY d.id, d.name;`,
    optionen: ['1', '0', 'NULL', 'Seedorf fehlt im Ergebnis.'],
    erkl: 'LEFT JOIN erzeugt für Seedorf eine Zeile mit NULL bei den Händlerspalten. COUNT(*) zählt diese Zeile mit. Richtig wäre COUNT(h.id) – das zählt nur Werte, die nicht NULL sind, und liefert 0.', quelle: 'OPAL LB 9 1.5 und 1.6' },
  { id: 'k25_012', burg: 25, kap: 70, stufe: 2, art: 'wahl', frage: 'Gesucht ist für jede Ware die Zahl der verschiedenen Händler, die sie verkauft haben. Manche Händler haben dieselbe Ware mehrmals verkauft. Was gehört in die SELECT-Zeile?',
    optionen: ['COUNT(DISTINCT haendler_id)', 'COUNT(*)', 'COUNT(DISTINCT verkauf.ware_id)', 'MAX(haendler_id)'],
    erkl: 'COUNT(*) zählt Verkaufszeilen, also Händler doppelt. DISTINCT zählt jede haendler_id je Gruppe nur einmal.', quelle: 'Abiturvorbereitung 7.1.2 a Stufe 2/3' },
  { id: 'k25_013', burg: 25, kap: 70, stufe: 1, art: 'wahl', frage: 'In der Tabelle haendler gibt es die Spalte dorf_id. Was ist sie?',
    optionen: ['ein Fremdschlüssel auf dorf.id', 'der Primärschlüssel von haendler', 'eine Aggregatfunktion', 'ein Attribut, das jedes Dorf eindeutig macht'],
    erkl: 'Ein Fremdschlüssel speichert den Schlüsselwert eines Datensatzes aus einer anderen Tabelle. Über ihn verbindet JOIN die Tabellen.', quelle: 'OPAL LB 9 1.2 Relationale Datenbanken; Selbstcheck 1.21' },
  { id: 'k25_014', burg: 25, kap: 70, stufe: 3, art: 'mehr', frage: 'Kreuze alle Dörfer an, die im Ergebnis der Abfrage stehen.',
    code: `haendler: 1 Anna (Dorf 1) | 2 Bruno (1) | 3 Clara (2) | 4 David (3) | 5 Ella (NULL) | 6 Anna (2)
dorf:     1 Lindenhain | 2 Mühlbach | 3 Steinfeld | 4 Seedorf
verkauf(haendler_id, menge, preis):
 (1, 20, 2) (1, 3, 12) (2, 15, 3) (3, 25, 2) (3, 10, 4)
 (3, 2, 12) (4, 6, 8) (6, 5, 3) (6, 10, 2)

SELECT d.name, SUM(v.menge * v.preis)
FROM dorf d
JOIN haendler h ON h.dorf_id = d.id
JOIN verkauf v ON v.haendler_id = h.id
GROUP BY d.id, d.name
HAVING SUM(v.menge * v.preis) > 100;`,
    optionen: ['Lindenhain', 'Mühlbach', 'Steinfeld', 'Seedorf'], richtig: [0, 1],
    erkl: 'Im Sachzusammenhang: Dörfer, deren Händler zusammen mehr als 100 Taler umgesetzt haben. Lindenhain 76 + 45 = 121, Mühlbach 114 + 35 = 149, Steinfeld 48. Seedorf hat keinen Händler und fällt schon beim JOIN heraus.', quelle: 'Abiturvorbereitung 7.1.1 d (Abfrage deuten)' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 71: Abfragen in Abfragen (Subselects)
  { id: 'k25_015', burg: 25, kap: 71, stufe: 1, art: 'wahl', frage: 'Gesucht sind alle Waren, die teurer sind als der Durchschnitt. Warum funktioniert WHERE preis > AVG(preis) nicht?',
    optionen: ['WHERE prüft einzelne Zeilen, AVG braucht eine ganze Gruppe.', 'AVG gibt es in SQLite nicht.', 'Man muss den Durchschnitt vorher von Hand ausrechnen und als Zahl eintragen.', 'Vergleiche mit > sind in WHERE nicht erlaubt.'],
    erkl: 'Den Durchschnitt liefert eine Unterabfrage: WHERE preis > (SELECT AVG(preis) FROM ware). Der Durchschnitt ist selbst das Ergebnis einer Abfrage. Er darf nicht als feste Zahl in die Abfrage geschrieben werden, sonst stimmt sie nach jeder Änderung nicht mehr.', quelle: 'OPAL LB 9 1.19 Subselects; Abiturvorbereitung 7.1.2 b' },
  { id: 'k25_016', burg: 25, kap: 71, stufe: 2, art: 'eingabe', frage: 'Welchen Namen liefert die Abfrage?',
    code: `haendler(id, name): 1 Anna | 2 Bruno | 3 Clara | 4 David | 5 Ella | 6 Anna
verkauf(haendler_id, ...): Zeilen mit haendler_id 1, 1, 2, 3, 3, 3, 4, 6, 6

SELECT name FROM haendler
WHERE id NOT IN (SELECT haendler_id FROM verkauf);`,
    antworten: ['Ella'], erkl: 'Die Unterabfrage liefert alle haendler_id mit mindestens einem Verkauf: 1, 2, 3, 4, 6. Nur die id 5 kommt dort nicht vor.', quelle: 'OPAL LB 9 1.19; Abiturvorbereitung 7.1.3 c1' },
  { id: 'k25_017', burg: 25, kap: 71, stufe: 2, art: 'eingabe', zahl: true, frage: 'Was liefert die Abfrage?',
    code: `verkauf.menge: 20, 3, 15, 25, 10, 2, 6, 5, 10

SELECT COUNT(*) FROM verkauf
WHERE menge > (SELECT AVG(menge) FROM verkauf);`,
    antworten: ['3'], erkl: 'Der Durchschnitt ist 96 : 9 ≈ 10,67. Größer sind nur 20, 15 und 25.', quelle: 'OPAL LB 9 1.19 Subselects' },
  { id: 'k25_018', burg: 25, kap: 71, stufe: 2, art: 'luecke', frage: 'Gesucht sind alle Schülerinnen und Schüler, die noch bei keinem Vorspiel aufgetreten sind. Ergänze.',
    text: 'SELECT vorname, nachname FROM schueler\nWHERE sid {} ({} sid FROM auftritt)\nORDER BY nachname;',
    luecken: [['NOT IN'], ['SELECT']], woerter: ['NOT IN', 'IN', '=', 'SELECT', 'COUNT', 'JOIN'],
    erkl: 'Die Unterabfrage sammelt alle sid, die in auftritt vorkommen. NOT IN behält nur die übrigen.', quelle: 'Abiturvorbereitung 7.1.3 c1' },
  { id: 'k25_019', burg: 25, kap: 71, stufe: 2, art: 'wahl', frage: 'Gesucht sind alle Händler aus Dörfern mit id < 3. Die Unterabfrage liefert mehrere ids. Welcher Operator gehört in die Lücke?',
    code: `SELECT name FROM haendler
WHERE dorf_id ___ (SELECT id FROM dorf WHERE id < 3);`,
    optionen: ['IN', 'LIKE', 'BETWEEN', 'AS'],
    erkl: 'IN prüft, ob der Wert in der Ergebnismenge der Unterabfrage vorkommt. = passt nur, wenn die Unterabfrage genau einen Wert liefert.', quelle: 'OPAL LB 9 1.19 Subselects' },
  { id: 'k25_020', burg: 25, kap: 71, stufe: 2, art: 'eingabe', zahl: true, tol: 0.1, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 7.1.2 d Stufe 2',
    gen: (z) => {
      const b = z.wahl([40, 60, 75, 80, 120]), a = z.int(Math.round(b / 5), Math.round(b * 0.7));
      const p = Math.round(a * 1000 / b) / 10;
      return { frage: `Die Tabelle schueler hat ${b} Zeilen, ${a} davon wohnen in Pieschen. Was liefert SELECT COUNT(*) * 100.0 / (SELECT COUNT(*) FROM schueler) FROM schueler WHERE ortsteil = 'Pieschen'? (auf eine Nachkommastelle)`,
        antworten: [String(p)], erkl: `Die Unterabfrage liefert ${b}, die äußere Abfrage zählt ${a}: ${a} · 100,0 / ${b} ≈ ${String(p).replace('.', ',')} %. Mit 100.0 rechnet SQLite mit Kommazahlen statt ganzzahlig.` };
    } },
  { id: 'k25_021', burg: 25, kap: 71, stufe: 3, art: 'wahl', frage: 'Im Bericht steht: „Mehr als ein Drittel aller Verkaufszeilen betrifft Rüben.“ Abfragen liefern: 9 Verkaufszeilen insgesamt, davon 3 mit ware = \'Rüben\'. Welche Beurteilung ist richtig?',
    optionen: ['Falsch: 3 von 9 ist genau ein Drittel, nicht mehr.', 'Richtig, denn Rüben sind die häufigste Ware im Archiv.', 'Richtig, weil 3 > 9 / 3 gilt.', 'Nicht prüfbar, weil dafür ein JOIN nötig wäre.'],
    erkl: 'Über Mengen oder Umsatz sagt die Zahl der Zeilen außerdem nichts aus. Beurteilen heißt: Urteil mit Zahlen begründen und sagen, was die Daten nicht zeigen. Hier unterscheidet sich „Anteil der Zeilen“ von „Anteil der Menge“.', quelle: 'Abiturvorbereitung 7.1.2 d (Behauptungen mit Daten prüfen)' },
  { id: 'k25_022', burg: 25, kap: 71, stufe: 2, art: 'eingabe', frage: 'Welchen Namen liefert die Abfrage?',
    code: `haendler(id, name): 1 Anna | 2 Bruno | 3 Clara | 4 David | 5 Ella | 6 Anna
verkauf(id, haendler_id, ware, menge):
 (1, 1, Rüben, 20) (2, 1, Honig, 3) (3, 2, Kohl, 15) (4, 3, Rüben, 25)
 (5, 3, Äpfel, 10) (6, 3, Honig, 2) (7, 4, Wolle, 6) (8, 6, Kohl, 5)

SELECT name FROM haendler
WHERE id = (SELECT haendler_id FROM verkauf
            WHERE menge = (SELECT MAX(menge) FROM verkauf));`,
    antworten: ['Clara'], erkl: 'Von innen nach außen lesen: MAX(menge) = 25, dazu gehört haendler_id 3, und das ist Clara.', quelle: 'OPAL LB 9 1.19 Subselects (verschachtelt)' },
  { id: 'k25_023', burg: 25, kap: 71, stufe: 1, art: 'zuordnen', frage: 'Ordne jeder Schreibweise zu, was die Unterabfrage liefern muss bzw. was geprüft wird.',
    paare: [['WHERE preis > (SELECT AVG(preis) FROM ware)', 'genau ein Wert zum Vergleichen'], ['WHERE id IN (SELECT haendler_id FROM verkauf)', 'Wert kommt in der Liste vor'], ['WHERE id NOT IN (SELECT haendler_id FROM verkauf)', 'Wert kommt in der Liste nicht vor'], ['SELECT MAX(n) FROM (SELECT COUNT(*) AS n FROM verkauf GROUP BY haendler_id)', 'Zwischentabelle in FROM']],
    erkl: 'Vergleiche mit =, <, > brauchen einen einzelnen Wert; IN/NOT IN prüfen gegen eine Liste; eine Unterabfrage in FROM wirkt wie eine neue Tabelle.', quelle: 'OPAL LB 9 1.19 Subselects' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 72: Daten anlegen und ändern
  { id: 'k25_024', burg: 25, kap: 72, stufe: 1, art: 'luecke', frage: 'Ergänze die drei Befehle.',
    text: "INSERT INTO ware (name, preis) {} ('Käse', 9.0);\nUPDATE ware {} preis = 3.5 WHERE name = 'Kohl';\nDELETE {} ware WHERE id = 6;",
    luecken: [['VALUES'], ['SET'], ['FROM']], woerter: ['VALUES', 'SET', 'FROM', 'INTO', 'WHERE', 'TABLE'],
    erkl: 'INSERT INTO … VALUES (…), UPDATE … SET … WHERE …, DELETE FROM … WHERE … – das sind die ändernden Befehle aus CRUD.', quelle: 'OPAL LB 9 1.8 CRUD' },
  { id: 'k25_025', burg: 25, kap: 72, stufe: 1, art: 'wahl', frage: 'Was bewirkt UPDATE ware SET preis = preis * 1.1; (ohne WHERE)?',
    optionen: ['Alle Preise in der Tabelle werden um 10 % erhöht.', 'Nur der erste Datensatz wird geändert.', 'Die Datenbank meldet einen Fehler, weil WHERE fehlt.', 'Es wird nichts geändert, nur angezeigt.'],
    erkl: 'Ohne WHERE betrifft UPDATE (und DELETE) jede Zeile. Deshalb vorher mit SELECT und derselben WHERE-Bedingung prüfen, welche Zeilen getroffen werden.', quelle: 'OPAL LB 9 1.8 CRUD; Abiturvorbereitung 7.1.8 Tipp' },
  { id: 'k25_026', burg: 25, kap: 72, stufe: 2, art: 'eingabe', zahl: true, frage: 'Wie viele Zeilen ändert der Befehl?',
    code: `verkauf(id, haendler_id, ware, menge, preis)
 1 | 1 | Rüben | 20 |  2      6 | 3 | Honig |  2 | 12
 2 | 1 | Honig |  3 | 12      7 | 4 | Wolle |  6 |  8
 3 | 2 | Kohl  | 15 |  3      8 | 6 | Kohl  |  5 |  3
 4 | 3 | Rüben | 25 |  2      9 | 6 | Rüben | 10 |  2
 5 | 3 | Äpfel | 10 |  4

UPDATE verkauf SET preis = preis + 1
WHERE ware = 'Rüben' OR menge < 5;`,
    antworten: ['5'], erkl: 'Rüben: Zeilen 1, 4, 9. menge < 5: Zeilen 2 und 6. Zusammen 5 verschiedene Zeilen (OR: eine Bedingung genügt).', quelle: 'OPAL LB 9 1.8 CRUD; Abiturvorbereitung 7.1.2 e' },
  { id: 'k25_027', burg: 25, kap: 72, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'Abiturvorbereitung 7.1.2 e',
    gen: (z) => {
      const alt = z.wahl([40, 60, 72, 78, 80]), proz = z.wahl([5, 10, 20]);
      const neu = Math.round(alt * (100 + proz)) / 100;
      return { frage: `Ein Kurs kostet ${alt} €. Welchen Wert hat gebuehr nach UPDATE kurs SET gebuehr = gebuehr * ${(1 + proz / 100).toFixed(2)} WHERE …?`,
        antworten: [String(neu)], tol: 0.01, erkl: `${alt} · ${(1 + proz / 100).toFixed(2).replace('.', ',')} = ${String(neu).replace('.', ',')}. Die neue Gebühr wird aus der alten berechnet.` };
    } },
  { id: 'k25_028', burg: 25, kap: 72, stufe: 2, art: 'reihe', frage: 'Händler Bruno (id 2) hört auf. Seine Verkaufsdaten übernimmt die neue Händlerin Ida (id 7). In welcher Reihenfolge müssen die Befehle stehen?',
    teile: ["INSERT INTO haendler VALUES (7, 'Ida', 1);", 'UPDATE verkauf SET haendler_id = 7 WHERE haendler_id = 2;', 'DELETE FROM haendler WHERE id = 2;'],
    erkl: 'Ida muss zuerst existieren, sonst verweist der Fremdschlüssel ins Leere. Bruno darf erst gelöscht werden, wenn keine Verkaufszeile mehr auf ihn verweist (referentielle Integrität).', quelle: 'Abiturvorbereitung 7.1.8 a' },
  { id: 'k25_029', burg: 25, kap: 72, stufe: 2, art: 'zeile', frage: 'Die Anweisung meldet „near ‚)‘: syntax error“. Tippe die fehlerhafte Zeile an.',
    code: `CREATE TABLE leihe (
  leihnr INTEGER PRIMARY KEY,
  invnr TEXT REFERENCES instrument(invnr),
  sid INTEGER REFERENCES schueler(sid),
  beginn TEXT,
  ende TEXT,
);`,
    fehler: [6], erkl: 'Hinter der letzten Spalte darf kein Komma stehen. Die Datenbank meldet den Fehler erst bei der Klammer in der nächsten Zeile.', quelle: 'OPAL LB 9 1.11.1 Tabellen per SQL erstellen; Abiturvorbereitung 7.1.6 a' },
  { id: 'k25_030', burg: 25, kap: 72, stufe: 2, art: 'wahl', frage: 'Finn (sid 12) verlangt, dass seine Daten gelöscht werden. Er steht in schueler, belegung und auftritt. Warum muss DELETE FROM schueler WHERE sid = 12 zuletzt kommen?',
    optionen: ['Fremdschlüssel dürfen nicht ins Leere zeigen.', 'DELETE läuft alphabetisch nach Tabellen.', 'schueler ist die größte Tabelle.', 'Egal – die Datenbank sortiert die Befehle selbst.'],
    erkl: 'Referentielle Integrität: Jeder Fremdschlüssel muss auf einen vorhandenen Datensatz verweisen – also erst die verweisenden Zeilen löschen, dann den Schüler. Würde der Schüler zuerst gelöscht, zeigten seine Belegungen auf eine sid, die es nicht mehr gibt. Mit eingeschalteten Fremdschlüsseln meldet SQLite „FOREIGN KEY constraint failed“.', quelle: 'Abiturvorbereitung 7.1.8 b, c' },
  { id: 'k25_031', burg: 25, kap: 72, stufe: 3, art: 'wahl', frage: 'Mit welcher Abfrage weist du nach, dass es in belegung keine Zeile mehr gibt, die auf einen nicht vorhandenen Schüler verweist? (Ergebnis muss leer sein.)',
    optionen: ['SELECT * FROM belegung b LEFT JOIN schueler s ON b.sid = s.sid WHERE b.sid IS NOT NULL AND s.sid IS NULL;', 'SELECT * FROM belegung b INNER JOIN schueler s ON b.sid = s.sid WHERE s.sid IS NOT NULL;', 'SELECT * FROM schueler WHERE sid IS NULL;', 'SELECT COUNT(*) FROM belegung;'],
    erkl: 'LEFT JOIN behält jede Belegung. Findet sich kein Schüler dazu, stehen bei s.sid NULL-Werte – genau diese verwaisten Zeilen filtert IS NULL heraus.', quelle: 'OPAL LB 9 1.8 Beispiel 2; Abiturvorbereitung 7.1.8 c' },
  { id: 'k25_032', burg: 25, kap: 72, stufe: 1, art: 'mehr', frage: 'Kreuze alle Befehle an, die gespeicherte Datensätze verändern, hinzufügen oder entfernen.',
    optionen: ['INSERT', 'UPDATE', 'DELETE', 'SELECT', 'ORDER BY'], richtig: [0, 1, 2],
    erkl: 'CRUD: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). SELECT und ORDER BY lesen nur.', quelle: 'OPAL LB 9 1.8 CRUD' },
  { id: 'k25_033', burg: 25, kap: 72, stufe: 1, art: 'wahl', frage: 'In instrument ist invnr ein Text wie „V-01“ und Primärschlüssel. Welche Zeile passt in CREATE TABLE leihe?',
    optionen: ['invnr TEXT REFERENCES instrument(invnr),', 'invnr INTEGER REFERENCES instrument(invnr),', 'invnr TEXT PRIMARY KEY REFERENCES leihe(invnr),', 'REFERENCES invnr TEXT instrument,'],
    erkl: 'Der Datentyp eines Fremdschlüssels muss zum Primärschlüssel passen, auf den er verweist. REFERENCES nennt Tabelle und Spalte, auf die verwiesen wird.', quelle: 'Abiturvorbereitung 7.1.6 a Stufe 2' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 73: Modellieren und Normalisieren
  { id: 'k25_034', burg: 25, kap: 73, stufe: 1, art: 'wahl', frage: 'Wann ist eine Tabelle in der 1. Normalform?',
    optionen: ['wenn jedes Feld nur einen einzigen, unteilbaren (atomaren) Wert enthält', 'wenn sie einen zusammengesetzten Primärschlüssel aus mehreren Attributen hat', 'wenn kein Attribut transitiv vom Schlüssel abhängt', 'wenn sie höchstens drei Spalten hat'],
    erkl: 'Eine Zelle wie „Rüben, Kohl“ oder „Anna Berg, 0351 4471“ verletzt die 1NF. 2NF und 3NF bauen darauf auf.', quelle: 'OPAL LB 9 1.14 Erste Normalform' },
  { id: 'k25_035', burg: 25, kap: 73, stufe: 1, art: 'zuordnen', frage: 'Ordne jeder Anomalie ihre Beschreibung zu.',
    paare: [['Einfügeanomalie', 'Eine Information lässt sich nicht speichern, ohne eine andere zu erfinden.'], ['Änderungsanomalie', 'Eine Tatsache steht mehrfach und muss überall geändert werden.'], ['Löschanomalie', 'Beim Löschen geht ungewollt eine andere Information verloren.']],
    erkl: 'Alle drei entstehen durch Redundanz in einer unnormalisierten Tabelle und verschwinden, wenn man in die 3NF zerlegt.', quelle: 'OPAL LB 9 1.13 Normalisierung und Anomalien' },
  { id: 'k25_036', burg: 25, kap: 73, stufe: 2, art: 'wahl', frage: 'Eine Werkstatt speichert alles in einer Tabelle Brand(BrandNr, Datum, OfenNr, Ofen, Höchsttemperatur, LeiterNr, Kursleitung). Ein neuer Ofen O4 wird gekauft, in dem noch nie gebrannt wurde. Welche Aussage trifft zu?',
    optionen: ['Einfügeanomalie', 'keine Anomalie', 'Änderungsanomalie', 'Löschanomalie'],
    erkl: 'Ohne einen Brand gibt es keine Zeile, in der der Ofen stehen könnte. Eine erfundene BrandNr wäre kein echter Brand. Erst eine eigene Relation Ofen(OfenNr, Ofen, Höchsttemperatur) erlaubt es, Öfen ohne Brand zu speichern.', quelle: 'Abiturvorbereitung 7.1.7 a1' },
  { id: 'k25_037', burg: 25, kap: 73, stufe: 2, art: 'wahl', frage: 'Dieselbe Tabelle Brand: Brand 34 fällt aus und wird gelöscht. Es war der einzige Brand im Rakuofen. Welche Aussage trifft zu?',
    optionen: ['Löschanomalie: Mit Brand 34 gehen auch die einzigen Angaben zum Rakuofen verloren.', 'Löschanomalie, weil der Brand 34 verloren geht.', 'Keine Anomalie, weil der Ofen später wieder eingetragen werden kann.', 'Änderungsanomalie, weil die Kursleitung danach einen Brand weniger zu betreuen hat.'],
    erkl: 'Dass der gelöschte Brand weg ist, ist gewollt. Die Anomalie ist, dass eine andere Information (der Ofen) ungewollt mit verschwindet.', quelle: 'Abiturvorbereitung 7.1.7 a2' },
  { id: 'k25_038', burg: 25, kap: 73, stufe: 2, art: 'wahl', frage: 'Position(AuftragNr, TeilNr, Teilbezeichnung, Anzahl) hat den Primärschlüssel (AuftragNr, TeilNr). Teilbezeichnung hängt nur von TeilNr ab. Welche Normalform ist verletzt?',
    optionen: ['die 2. Normalform', 'die 1. Normalform', 'die 3. Normalform', 'keine'],
    erkl: 'Ein Nichtschlüsselattribut hängt nur von einem Teil des zusammengesetzten Schlüssels ab: Partielle Abhängigkeit verletzt die 2NF. Lösung: Teil(TeilNr, Teilbezeichnung) herauslösen, in Position bleibt ↑TeilNr.', quelle: 'OPAL LB 9 1.15 Zweite Normalform; Abiturvorbereitung 7.1.1 b' },
  { id: 'k25_039', burg: 25, kap: 73, stufe: 2, art: 'wahl', frage: 'Ausleihe(AusleihNr, Datum, LeserNr, Lesername) mit Primärschlüssel AusleihNr. Lesername hängt nur von LeserNr ab. Was gilt?',
    optionen: ['In 2NF, aber nicht in 3NF: Lesername hängt transitiv über LeserNr vom Schlüssel ab.', 'Die Tabelle ist nicht in 2NF, weil Lesername nur von einem Teil des Schlüssels abhängt.', 'Die Tabelle ist in 3NF, weil der Primärschlüssel nur aus einem einzigen Attribut besteht.', 'Die Tabelle ist nicht in 1NF.'],
    erkl: 'Bei einem einteiligen Schlüssel kann es keine partielle Abhängigkeit geben (2NF erfüllt). AusleihNr → LeserNr → Lesername ist aber transitiv: Leser(LeserNr, Lesername) herauslösen.', quelle: 'OPAL LB 9 1.16 Dritte Normalform' },
  { id: 'k25_040', burg: 25, kap: 73, stufe: 3, art: 'eingabe', zahl: true, frage: 'Bibliothek: Ausleihe(AusleihNr, Datum, LeserNr, Lesername, BuchNr, Titel). Jede Ausleihe betrifft genau ein Buch. Es gilt: AusleihNr → Datum, LeserNr, BuchNr; LeserNr → Lesername; BuchNr → Titel. Aus wie vielen Relationen besteht das Modell in der 3. Normalform?',
    antworten: ['3'], erkl: 'Leser(LeserNr, Lesername), Buch(BuchNr, Titel) und Ausleihe(AusleihNr, Datum, ↑LeserNr, ↑BuchNr). Jede Abhängigkeit unter der Tabelle ergibt eine eigene Relation.', quelle: 'Abiturvorbereitung 7.1.1 c und 7.1.7 d' },
  { id: 'k25_041', burg: 25, kap: 73, stufe: 1, art: 'eingabe', zahl: true, frage: 'Wie viele Relationen (Tabellen) entstehen, wenn du dieses ER-Modell in ein Relationenmodell überführst?',
    bild: () => svgErm(),
    antworten: ['4'], erkl: 'Je Entitätstyp eine Relation (Dorf, Händler, Ware). Die 1:n-Beziehung „wohnt in“ wird ein Fremdschlüssel in Händler, die n:m-Beziehung „verkauft“ eine eigene Relation.', quelle: 'OPAL LB 9 1.11 Vom ER-Modell zum Relationenmodell' },
  { id: 'k25_042', burg: 25, kap: 73, stufe: 2, art: 'wahl', frage: 'In welche Relation kommen die Attribute menge und woche?',
    bild: () => svgErm(),
    optionen: ['in die Relation verkauft', 'in die Relation Ware', 'in die Relation Händler', 'in beide Relationen Ware und Händler'],
    erkl: 'Menge und Woche gehören weder allein zur Ware noch allein zum Händler, sondern zum einzelnen Verkauf – also zur n:m-Beziehung.', quelle: 'OPAL LB 9 1.10 ERM; Abiturvorbereitung 7.1.3 a Stufe 3' },
  { id: 'k25_043', burg: 25, kap: 73, stufe: 1, art: 'wahl', frage: 'Wohin kommt der Fremdschlüssel der Beziehung „wohnt in“?',
    bild: () => svgErm(),
    optionen: ['in die Relation Händler (n-Seite) als ↑dorf_id', 'in die Relation Dorf (1-Seite) als ↑haendler_id', 'in eine eigene Relation wohnt_in', 'nirgendwohin – 1:n-Beziehungen braucht man nicht zu speichern'],
    erkl: 'Bei 1:n wandert der Schlüssel der 1-Seite als Fremdschlüssel auf die n-Seite. Ein Dorf hat viele Händler, jeder Händler wohnt in einem Dorf.', quelle: 'OPAL LB 9 1.11; Abiturvorbereitung 7.1.3 b Stufe 1' },
  { id: 'k25_044', burg: 25, kap: 73, stufe: 2, art: 'zuordnen', frage: 'Rückweg vom SQL-Skript zum ER-Modell: Ordne zu, welche Beziehung du erkennst.',
    paare: [['Tabelle hat einen Fremdschlüssel auf eine andere Tabelle', '1:n-Beziehung'], ['Tabelle, deren Primärschlüssel aus zwei Fremdschlüsseln besteht', 'n:m-Beziehung'], ['Fremdschlüssel mit UNIQUE', '1:1-Beziehung']],
    erkl: 'Die Regeln von „ER-Modell → Relationen“ rückwärts gelesen. Fremdschlüssel selbst zeichnet man im ER-Modell nicht ein; die übrigen Spalten einer n:m-Tabelle werden Attribute der Beziehung.', quelle: 'OPAL LB 9 Selbstcheck 1.21; Abiturvorbereitung 7.1.5 a' },
  { id: 'k25_045', burg: 25, kap: 73, stufe: 3, art: 'wahl', frage: 'In einer Tabelle stehen die Brände 31 und 32 beide am 2027-02-03. Jemand meint: „Das Datum steht zweimal – das ist Redundanz und muss in eine eigene Tabelle.“ Welche Stellungnahme ist richtig?',
    optionen: ['Falsch: zwei verschiedene Tatsachen, zufällig gleich.', 'Richtig: Jeder doppelt gespeicherte Wert ist Redundanz.', 'Richtig: Daten gehören in eine Tabelle Datum.', 'Falsch: Redundanz gibt es nur bei Zahlen.'],
    erkl: 'Wird Brand 31 verschoben, ändert sich Brand 32 nicht. Redundanz heißt: dieselbe Tatsache steht mehrfach. Die Probe: Muss bei einer Änderung die andere Zeile mitgeändert werden? Bei einer Telefonnummer ja, beim Datum zweier Brände nein.', quelle: 'Abiturvorbereitung 7.1.7 c' },
  { id: 'k25_046', burg: 25, kap: 73, stufe: 3, art: 'wahl', frage: 'Teile ändern jedes Jahr im Januar ihren Preis. Ein Praktikant will den Teilpreis zusätzlich in Position(↑AuftragNr, ↑TeilNr, Anzahl) speichern. Der Chef: „Das ist genau die Redundanz, die wir beseitigt haben.“ Welche Beurteilung ist stichhaltig?',
    optionen: ['Sinnvoll: Auftragspreis ≠ aktueller Preis.', 'Der Chef hat recht: Das ist eindeutig Redundanz.', 'Der Vorschlag verletzt die 1NF.', 'Der Preis gehört in die Relation Kunde.'],
    erkl: 'Sonst ändern sich alte Rechnungen bei jeder Preisänderung mit. Unterscheide „aktueller Preis“ (hängt von TeilNr ab) und „berechneter Preis dieses Auftrags“ (hängt von AuftragNr und TeilNr ab). Das zweite ist keine Redundanz.', quelle: 'Abiturvorbereitung 7.1.1 e' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 74: CSV und JSON mit Python
  { id: 'k25_047', burg: 25, kap: 74, stufe: 1, art: 'wahl', frage: 'Was liefert csv.DictReader(datei, delimiter=\';\') für jede Datenzeile?',
    optionen: ['ein Dictionary mit den Spaltennamen', 'eine Liste der Werte', 'einen einzigen Text mit allen Werten', 'eine Zahl für jede Spalte'],
    erkl: 'csv.reader liefert jede Zeile als Liste, csv.DictReader als Dictionary – z. B. {\'Name\': \'Anna\', \'Alter\': \'17\'}. Alle Werte sind Texte.', quelle: 'OPAL LB 9 3.3 Einlesen' },
  { id: 'k25_048', burg: 25, kap: 74, stufe: 2, art: 'wahl', frage: 'Die Kopfzeile der Datei lautet Name;Alter. Trotzdem meldet row[\'Name\'] einen KeyError. print(row) zeigt {\'\\ufeffName\': \'Anna\', \'Alter\': \'17\'}. Was hilft?',
    optionen: ["encoding='utf-8-sig' angeben", "delimiter=',' verwenden", "newline='' weglassen", 'row[0] statt row[\'Name\'] schreiben'],
    erkl: 'Das BOM am Dateianfang klebt sonst am ersten Spaltennamen. Manche Programme (z. B. Excel) schreiben ein unsichtbares Byte-Order-Mark an den Anfang. utf-8-sig entfernt es beim Lesen.', quelle: 'OPAL LB 9 3.3 Einlesen (utf-8-sig)' },
  { id: 'k25_049', burg: 25, kap: 74, stufe: 2, art: 'wahl', frage: 'Die Datei trennt mit Semikolon (Name;Alter;Note), gelesen wird aber mit csv.DictReader(datei, delimiter=\',\'). Wie sieht die erste Zeile aus?',
    optionen: ["{'Name;Alter;Note': 'Anna;17;1.3'}", "{'Name': 'Anna', 'Alter': '17', 'Note': '1.3'}", "['Anna', '17', '1.3']", 'Python bricht sofort mit einem Fehler ab.'],
    erkl: 'Ohne das richtige Trennzeichen ist die ganze Kopfzeile ein einziger Spaltenname. Erst der Zugriff row[\'Name\'] führt dann zu einem KeyError.', quelle: 'OPAL LB 9 3.3 Einlesen, Fehler finden' },
  { id: 'k25_050', burg: 25, kap: 74, stufe: 2, art: 'wahl', frage: 'Was passiert?',
    code: `zeilen = [{'Name': 'Anna', 'Punkte': '17'}, {'Name': 'Ben', 'Punkte': '9'}]
summe = 0
for z in zeilen:
    summe = summe + z['Punkte']
print(summe)`,
    optionen: ['TypeError', 'Es wird 26 ausgegeben.', "Es wird '179' ausgegeben.", 'Es wird 0 ausgegeben.'],
    erkl: 'Eine Zahl und ein Text können nicht addiert werden. Alles aus einer CSV-Datei ist zunächst Text. Erst int(z[\'Punkte\']) macht daraus eine Zahl.', quelle: 'OPAL LB 9 3.4 Verarbeiten' },
  { id: 'k25_051', burg: 25, kap: 74, stufe: 3, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 3.4 Verarbeiten (umwandeln + Extremwert)',
    gen: (z) => {
      const d = z.int(7, 9), a = z.int(10, d * 10 - 1), b = z.int(10, d * 10 - 1);
      const w = z.mische([String(d), String(a), String(b)]);
      return { frage: `Was gibt das Programm aus?`, code: `werte = ['${w[0]}', '${w[1]}', '${w[2]}']   # aus einer CSV-Datei\nprint(max(werte))`,
        antworten: [String(d), `'${d}'`], erkl: `Die Werte sind Texte und werden Zeichen für Zeichen verglichen: '${d}' ist größer als '${String(Math.max(a, b))[0]}…'. Für den echten Größtwert erst jeden Wert mit int() umwandeln, dann vergleichen.` };
    } },
  { id: 'k25_052', burg: 25, kap: 74, stufe: 2, art: 'luecke', frage: 'Ergänze: Eine JSON-Datei wird eingelesen, ausgewertet und das Ergebnis wieder als JSON-Datei gespeichert.',
    text: "with open('wetter.json', encoding='utf-8') as datei:\n    wetter = json.{}(datei)\n...\nwith open('auswertung.json', 'w', encoding='utf-8') as datei:\n    json.{}(auswertung, datei, ensure_ascii=False, indent=2)",
    luecken: [['load'], ['dump']], woerter: ['load', 'loads', 'dump', 'dumps', 'read', 'write'],
    erkl: 'json.load/json.dump arbeiten mit Dateien, json.loads/json.dumps mit Texten (s = string). indent=2 rückt ein, ensure_ascii=False schreibt Umlaute direkt.', quelle: 'OPAL LB 9 3.10 JSON' },
  { id: 'k25_053', burg: 25, kap: 74, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 3.2 Verschachtelte Datentypen; 3.10 JSON',
    gen: (z) => {
      const t = [z.int(12, 30), z.int(12, 30), z.int(12, 30)], i = z.int(0, 2), name = z.wahl(['max', 'min']);
      const mins = t.map((x) => x - z.int(5, 10));
      const tage = t.map((x, k) => `{"datum": "2027-05-0${k + 1}", "max": ${x}, "min": ${mins[k]}}`).join(',\n           ');
      return { frage: 'Was gibt die letzte Zeile aus?', code: `daten = {"stadt": "Dresden",\n         "tage": [${tage}]}\nprint(daten["tage"][${i}]["${name}"])`,
        antworten: [String(name === 'max' ? t[i] : mins[i])], erkl: `daten["tage"] ist eine Liste von Dictionaries. Der Index ${i} wählt den ${i + 1}. Tag, der Schlüssel "${name}" den Wert darin.` };
    } },
  { id: 'k25_054', burg: 25, kap: 74, stufe: 1, art: 'wahl', frage: 'Für jeden Verein sollen Name, Adresse und eine Liste von Mannschaften mit je mehreren Spielern gespeichert und ausgetauscht werden. Welches Format passt am besten?',
    optionen: ['JSON, weil es Listen und Objekte ineinander verschachteln kann', 'CSV, weil jede Zeile genau einen Datensatz mit festen Spalten hat', 'eine Textdatei ohne festes Format', 'ein Bild der Tabelle'],
    erkl: 'CSV passt für flache Tabellen mit festen Spalten. Verschachtelte Strukturen wie „Verein → Mannschaften → Spieler“ bildet JSON direkt ab; APIs liefern deshalb meist JSON.', quelle: 'OPAL LB 9 3.10 JSON, 3.11 API; Selbstcheck 3.15' },
  { id: 'k25_055', burg: 25, kap: 74, stufe: 3, art: 'eingabe', zahl: true, frage: 'Was gibt das Programm aus?',
    code: `zeilen = [{'dorf': 'Lindenhain', 'zeit': '12'}, {'dorf': 'Mühlbach', 'zeit': 'N/A'},
          {'dorf': 'Lindenhain', 'zeit': '18'}, {'dorf': 'Mühlbach', 'zeit': '9'},
          {'dorf': 'Lindenhain', 'zeit': ''}]
summe = {}
anzahl = {}
for z in zeilen:
    if z['zeit'] in ('', 'N/A'):
        continue
    d = z['dorf']
    summe[d] = summe.get(d, 0) + int(z['zeit'])
    anzahl[d] = anzahl.get(d, 0) + 1
print(summe['Lindenhain'] / anzahl['Lindenhain'])`,
    antworten: ['15.0', '15'], erkl: 'Leere Werte und N/A werden übersprungen (bereinigen). Für Lindenhain bleiben 12 und 18: Summe 30, Anzahl 2, Durchschnitt 15.0.', quelle: 'OPAL LB 9 3.4 Verarbeiten, 3.5 Bereinigen' },
  { id: 'k25_056', burg: 25, kap: 74, stufe: 1, art: 'wahl', frage: "Warum öffnet man eine CSV-Datei zum Schreiben mit open('liste.csv', 'w', newline='', encoding='utf-8')?",
    optionen: ["newline='' verhindert zusätzliche Leerzeilen.", "newline='' löscht alle alten Zeilen.", "newline='' sorgt beim Lesen für richtige Umlaute.", "Ohne newline='' gehen keine Zahlen."],
    erkl: "Das csv-Modul kümmert sich selbst um die Zeilenenden. Für die Umlaute ist encoding='utf-8' zuständig.", quelle: 'OPAL LB 9 3.3 Einlesen, 3.6 Schreiben' },

  // ---------------------------------------------------------------------------------------------
  // Kapitel 75: NoSQL und Datenlebenszyklus
  { id: 'k25_057', burg: 25, kap: 75, stufe: 1, art: 'zuordnen', frage: 'Ordne die drei Eigenschaften des CAP-Theorems zu.',
    paare: [['Consistency (Konsistenz)', 'Jede Leseanfrage liefert den zuletzt geschriebenen Wert.'], ['Availability (Verfügbarkeit)', 'Jede Anfrage an einen funktionierenden Knoten bekommt eine Antwort.'], ['Partition Tolerance', 'Das System arbeitet weiter, auch wenn das Netz in Teile zerfällt.']],
    erkl: 'Bei einer Netzwerkstörung (Partition) kann ein verteiltes System nicht zugleich konsistent und verfügbar bleiben – es muss sich für C oder A entscheiden.', quelle: 'OPAL LB 9 2.1 CAP-Theorem' },
  { id: 'k25_058', burg: 25, kap: 75, stufe: 2, art: 'wahl', frage: 'Die Datenbank einer Bank ist auf mehrere Rechenzentren verteilt. Bei einer Netzwerkstörung zeigt die App lieber „Dienst nicht erreichbar“ als einen falschen Kontostand. Wie ordnest du das System ein?',
    optionen: ['CP: Konsistenz und Partitionstoleranz, Verfügbarkeit wird geopfert', 'AP: Verfügbarkeit und Partitionstoleranz, Konsistenz wird geopfert', 'CA: Es gibt keine Partitionen', 'keine Einordnung möglich, weil Banken relationale Datenbanken nutzen'],
    erkl: 'In einem verteilten System ist P Pflicht. Die Bank wählt im Störfall C vor A. Ein Online-Shop oder ein soziales Netzwerk würde eher weiter antworten (AP) und später abgleichen.', quelle: 'OPAL LB 9 2.1 Praxisbezug; Selbstcheck 2.4' },
  { id: 'k25_059', burg: 25, kap: 75, stufe: 1, art: 'wahl', frage: 'Warum kann eine SQLite-Datenbank auf einem einzigen Schulserver als „CA“ eingeordnet werden?',
    optionen: ['Weil sie nicht verteilt ist.', 'Weil SQLite nie ausfallen kann.', 'Weil SQLite eine NoSQL-Datenbank ist.', 'Weil relationale Datenbanken alles erfüllen.'],
    erkl: 'Ohne mehrere Knoten kann es keine Partition geben – fällt der Server aus, ist allerdings alles weg. CA heißt nicht „besonders ausfallsicher“, sondern nur: Partitionen kommen nicht vor, weil es nur einen Knoten gibt.', quelle: 'OPAL LB 9 2.1 Überblick CA/CP/AP' },
  { id: 'k25_060', burg: 25, kap: 75, stufe: 1, art: 'reihe', frage: 'Bringe die Phasen des Data Life Cycle in die richtige Reihenfolge.',
    teile: ['Erstellung (Erfassung)', 'Speicherung', 'Nutzung und Weitergabe', 'Archivierung', 'Löschung'],
    erkl: 'Daten werden erfasst, gespeichert, genutzt bzw. weitergegeben, später archiviert und nach Ablauf der Fristen gelöscht.', quelle: 'OPAL LB 9 3.1 Data Life Cycle; Selbstcheck 3.15' },
  { id: 'k25_061', burg: 25, kap: 75, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Datenbankmodell eine typische Anwendung zu.',
    paare: [['Key-Value-Datenbank', 'Warenkorb oder Sitzungsdaten über einen Schlüssel abrufen'], ['dokumentenorientierte Datenbank', 'Produktkatalog, in dem jedes Produkt andere Attribute hat'], ['Graphdatenbank', 'Freundschaften und „Personen, die du kennen könntest“'], ['relationale Datenbank', 'Buchhaltung mit fester Struktur und Fremdschlüsseln']],
    erkl: 'NoSQL-Modelle verzichten auf ein festes Tabellenschema und passen zu besonderen Datenformen; relationale Datenbanken spielen ihre Stärke bei festen Strukturen und Integrität aus.', quelle: 'OPAL LB 9 2.2 NoSQL-Datenbanken, 2.3 Key-Value' },
  { id: 'k25_062', burg: 25, kap: 75, stufe: 1, art: 'eingabe', frage: 'Was gibt das Programm aus? (Schreibweise: 1 2)',
    code: `lager = {"Rüben": 20, "Kohl": 5}
lager["Honig"] = 3
lager["Kohl"] = lager["Kohl"] + 10
del lager["Rüben"]
print(len(lager), lager["Kohl"])`,
    antworten: ['2 15', '2, 15', '2,15'], erkl: 'Schlüssel-Wert-Paare: Honig kommt dazu, Kohl wird auf 15 geändert, Rüben gelöscht. Übrig: Kohl und Honig.', quelle: 'OPAL LB 9 2.3 Key-Value-Datenbanken; Selbstcheck 2.4' },
  { id: 'k25_063', burg: 25, kap: 75, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Vorgang die Phase des Datenlebenszyklus zu.',
    paare: [['Die Läufer tragen sich beim Botenrennen in eine Liste ein.', 'Erstellung (Erfassung)'], ['Die Liste wird als CSV-Datei auf dem Server abgelegt.', 'Speicherung'], ['Die Zeiten werden bereinigt und eine Rangliste erstellt.', 'Nutzung (Auswertung)'], ['Nach dem Fest kommt die Datei ins Vereinsarchiv.', 'Archivierung'], ['Nach Ablauf der Frist wird die Datei vernichtet.', 'Löschung']],
    erkl: 'Jede Phase hat eigene Regeln: nur Nötiges erfassen, sicher speichern, nur für den Zweck nutzen, Fristen beim Archivieren beachten, am Ende löschen.', quelle: 'OPAL LB 9 3.1 Data Life Cycle; Spiel ef2' },
  { id: 'k25_064', burg: 25, kap: 75, stufe: 3, art: 'wahl', frage: 'Ein Kunde verlangt nach DSGVO, dass ein Online-Shop alle seine Daten löscht. Rechnungen muss der Shop aber laut Gesetz mehrere Jahre aufbewahren. Welche Stellungnahme ist stichhaltig?',
    optionen: ['Profil löschen, Rechnungen bis Fristende gesperrt archivieren.', 'Sofort alles löschen, auch die Rechnungen – Datenschutz geht vor.', 'Alles behalten, der Kunde hat ja zugestimmt.', 'Nichts tun – die DSGVO gilt nur für Behörden.'],
    erkl: 'Das Recht auf Löschung hat Grenzen, wenn gesetzliche Aufbewahrungspflichten gelten. Archivierung und Löschung sind eigene Phasen im Data Life Cycle.', quelle: 'OPAL LB 9 3.1, 3.13; Selbstcheck 3.15 (Löschfristen, DSGVO, Aufbewahrungspflichten)' },
  { id: 'k25_065', burg: 25, kap: 75, stufe: 3, art: 'mehr', frage: 'Ein Sportverein will für sein Botenrennen speichern: Name, Zeit, Dorf, Geburtsdatum, Handynummer, Wohnadresse und die Krankenkasse aller Läufer – „falls man es mal braucht“. Kreuze alle Angaben an, die gegen Datensparsamkeit und Zweckbindung verstoßen, wenn nur eine Rangliste je Dorf erstellt werden soll.',
    optionen: ['Wohnadresse', 'Krankenkasse', 'Handynummer', 'Zeit', 'Dorf'], richtig: [0, 1, 2],
    erkl: 'Für eine Rangliste je Dorf braucht man Name, Zeit und Dorf. Alles andere „auf Vorrat“ zu erheben widerspricht der Datensparsamkeit; genutzt werden dürfen Daten nur für den genannten Zweck.', quelle: 'OPAL LB 9 3.1, 3.13 (DSGVO); Spiel ef2' },

  // ---------------------------------------------------------------------------------------------
  // Ergänzt 2026-11-13 (Didaktik-Prüfung): mehr Zufallsaufgaben (gen) und Fehler finden (zeile) für SQL und Python
  { id: 'k25_066', burg: 25, kap: 70, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.5 GROUP BY/HAVING',
    gen: (z) => {
      const ids = []; for (let i = 0; i < z.int(8, 12); i++) ids.push(z.int(1, 6));
      const k = z.int(2, 3), n = {}; for (const i of ids) n[i] = (n[i] || 0) + 1;
      const treffer = Object.keys(n).filter((i) => n[i] >= k).sort();
      return { frage: `Die Spalte haendler_id der Tabelle verkauf enthält (je Zeile ein Verkauf): ${ids.join(', ')}. Wie viele Zeilen liefert die Abfrage?`,
        code: `SELECT haendler_id, COUNT(*)\nFROM verkauf\nGROUP BY haendler_id\nHAVING COUNT(*) >= ${k};`, antworten: [String(treffer.length)],
        erkl: `Je haendler_id eine Gruppe: ${Object.keys(n).sort().map((i) => `${i}: ${n[i]}×`).join(', ')}. Mindestens ${k}-mal: ${treffer.length ? treffer.join(', ') : 'keine'} – also ${treffer.length} Zeile${treffer.length === 1 ? '' : 'n'}.` };
    } },
  { id: 'k25_067', burg: 25, kap: 70, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.6 SQL-Joins',
    gen: (z) => {
      const namen = ['Anna', 'Bruno', 'Clara', 'David', 'Ella', 'Finn', 'Greta'].slice(0, z.int(5, 7));
      const dorf = namen.map(() => z.wahl([1, 2, 3, null, 5]));
      const inner = dorf.filter((d) => d !== null && d <= 3).length, links = z.wahl([true, false]);
      return { frage: `dorf enthält die ids 1, 2, 3. Wie viele Zeilen liefert die Abfrage mit ${links ? 'LEFT' : 'INNER'} JOIN?`,
        code: `haendler(name, dorf_id): ${namen.map((n, i) => `${n} ${dorf[i] === null ? 'NULL' : dorf[i]}`).join(' | ')}\n\nSELECT haendler.name, dorf.name\nFROM haendler\n${links ? 'LEFT' : 'INNER'} JOIN dorf ON haendler.dorf_id = dorf.id;`,
        antworten: [String(links ? namen.length : inner)],
        erkl: links ? `LEFT JOIN behält jeden Händler – auch die ohne passendes Dorf (NULL oder ein Dorf, das es nicht gibt): ${namen.length} Zeilen.` : `INNER JOIN behält nur Händler, deren dorf_id in dorf vorkommt. NULL und die 5 finden keinen Partner: ${inner} Zeilen.` };
    } },
  { id: 'k25_068', burg: 25, kap: 71, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.19 Subselects',
    gen: (z) => {
      const m = []; for (let i = 0; i < 7; i++) m.push(z.int(1, 30));
      const avg = m.reduce((a, b) => a + b, 0) / m.length, n = m.filter((x) => x > avg).length;
      return { frage: 'Was liefert die Abfrage?', code: `verkauf.menge: ${m.join(', ')}\n\nSELECT COUNT(*) FROM verkauf\nWHERE menge > (SELECT AVG(menge) FROM verkauf);`,
        antworten: [String(n)], erkl: `Die innere Abfrage liefert den Durchschnitt ${m.reduce((a, b) => a + b, 0)} : 7 ≈ ${String(Math.round(avg * 100) / 100).replace('.', ',')}. Größer sind ${n} Werte.` };
    } },
  { id: 'k25_069', burg: 25, kap: 72, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.8 CRUD',
    gen: (z) => {
      const w = []; for (let i = 0; i < 8; i++) w.push(z.int(1, 4));
      const a = z.int(1, 4), mitWhere = z.wahl([true, true, false]);
      const n = mitWhere ? w.filter((x) => x === a).length : w.length;
      return { frage: 'Wie viele Zeilen der Tabelle verkauf ändert der Befehl?', code: `verkauf.woche: ${w.join(', ')}\n\nUPDATE verkauf SET menge = menge + 1${mitWhere ? `\nWHERE woche = ${a}` : ''};`,
        antworten: [String(n)], erkl: mitWhere ? `Nur Zeilen mit woche = ${a}: ${n}.` : `Ohne WHERE trifft UPDATE jede Zeile: alle ${n}. Deshalb vorher mit SELECT und derselben Bedingung prüfen!` };
    } },
  { id: 'k25_070', burg: 25, kap: 72, stufe: 2, art: 'zeile', frage: 'Auftrag: Nur der Honig soll 10 % teurer werden, danach werden die Verkäufe aus Woche 1 gelöscht. Nach dem Skript sind ALLE Waren teurer. Tippe die fehlerhafte Zeile an.',
    code: `UPDATE ware
SET preis = preis * 1.1;
DELETE FROM verkauf
WHERE woche = 1;`,
    fehler: [2], erkl: 'Dem UPDATE fehlt die Bedingung: SET preis = preis * 1.1 WHERE name = \'Honig\'; Ohne WHERE trifft UPDATE jede Zeile.', quelle: 'OPAL LB 9 1.8 CRUD; Spiel ec5' },
  { id: 'k25_071', burg: 25, kap: 72, stufe: 3, art: 'zeile', frage: 'Händler 6 hört auf, seine Verkäufe übernimmt Händler 3. Mit eingeschalteter Prüfung der Fremdschlüssel bricht das Skript ab. Welche Zeile steht an der falschen Stelle?',
    code: `DELETE FROM haendler WHERE id = 6;
UPDATE verkauf SET haendler_id = 3 WHERE haendler_id = 6;
SELECT * FROM verkauf WHERE haendler_id = 3;`,
    fehler: [1], erkl: 'Solange noch Verkäufe auf Händler 6 verweisen, darf er nicht gelöscht werden (referentielle Integrität). Erst umhängen, dann löschen.', quelle: 'Abiturvorbereitung 7.1.8; Spiel ec5' },
  { id: 'k25_072', burg: 25, kap: 70, stufe: 2, art: 'zeile', frage: 'Die Abfrage soll zu jedem Händler sein Dorf zeigen, liefert aber falsche Paare. Tippe die fehlerhafte Zeile an.',
    code: `SELECT haendler.name, dorf.name
FROM haendler
INNER JOIN dorf ON haendler.id = dorf.id;`,
    fehler: [3], erkl: 'Verbunden wird Fremdschlüssel mit Primärschlüssel: ON haendler.dorf_id = dorf.id. haendler.id = dorf.id paart zufällig gleiche Nummern.', quelle: 'OPAL LB 9 1.6 SQL-Joins' },
  { id: 'k25_073', burg: 25, kap: 70, stufe: 3, art: 'zeile', frage: 'Zwei verschiedene Händler heißen Bruno. Die Abfrage soll die Menge je Händler zeigen, wirft die beiden aber zusammen. Tippe die fehlerhafte Zeile an.',
    code: `SELECT haendler.name, SUM(verkauf.menge)
FROM verkauf
JOIN haendler ON verkauf.haendler_id = haendler.id
GROUP BY haendler.name
ORDER BY SUM(verkauf.menge) DESC;`,
    fehler: [4], erkl: 'Gruppiert wird nach dem Schlüssel: GROUP BY haendler.id. Namen sind nicht eindeutig.', quelle: 'Abiturvorbereitung 7.1.6 d; Spiel ea5' },
  { id: 'k25_074', burg: 25, kap: 74, stufe: 2, art: 'zeile', frage: 'Das Programm soll den schnellsten Boten finden (Zeiten wie 9, 42, 105). Es nennt aber den mit 105 Minuten. Tippe die fehlerhafte Zeile an.',
    code: `bester = None
for zeile in csv.DictReader(datei, delimiter=';'):
    if bester is None or zeile['Zeit'] < bester['Zeit']:
        bester = zeile
print(bester['Name'])`,
    fehler: [3], erkl: 'Aus der CSV-Datei kommen Texte, und Texte werden Zeichen für Zeichen verglichen: "105" < "9". Erst umwandeln: int(zeile[\'Zeit\']) < int(bester[\'Zeit\']).', quelle: 'OPAL LB 9 3.4 Verarbeiten; Spiel ee2' },
  { id: 'k25_075', burg: 25, kap: 73, stufe: 2, art: 'eingabe', zahl: true, frage: 'Eine Bibliothek: Leser leihen Bücher aus (n:m, mit Ausleihdatum), jedes Buch hat genau einen Verlag (ein Verlag hat viele Bücher). Wie viele Tabellen hat das Relationenmodell?',
    antworten: ['4'], erkl: 'Leser, Buch, Verlag – je Entitätstyp eine Tabelle. Die 1:n-Beziehung wird ein Fremdschlüssel ↑verlag_id in Buch, die n:m-Beziehung eine eigene Tabelle Ausleihe(↑leser_id, ↑buch_id, datum).', quelle: 'OPAL LB 9 1.11; Spiel ed6' },
  { id: 'k25_076', burg: 25, kap: 70, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.5 GROUP BY und HAVING',
    gen: (z) => { const zeilen = []; for (let i = 0; i < 7; i++) zeilen.push([z.int(1, 4), z.int(1, 9)]);
      const g = z.int(6, 12), sum = {}; for (const [h, m] of zeilen) sum[h] = (sum[h] || 0) + m;
      const n = Object.values(sum).filter((s) => s > g).length;
      return { frage: 'Wie viele Zeilen liefert die Abfrage?', code: `verkauf(haendler_id, menge): ${zeilen.map(([h, m]) => `${h} ${m}`).join(' | ')}\n\nSELECT haendler_id, SUM(menge)\nFROM verkauf\nGROUP BY haendler_id\nHAVING SUM(menge) > ${g};`,
        antworten: [String(n)], erkl: `Summen je Händler: ${Object.keys(sum).sort().map((h) => `${h} → ${sum[h]}`).join(', ')}. HAVING behält nur Gruppen mit mehr als ${g}: ${n} Zeilen.` }; } },
  { id: 'k25_077', burg: 25, kap: 71, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.19 Subselect',
    gen: (z) => { const p = [z.int(2, 15), z.int(2, 15), z.int(2, 15), z.int(2, 15), z.int(2, 15)], avg = p.reduce((a, b) => a + b, 0) / p.length, n = p.filter((x) => x > avg).length;
      return { frage: 'Welche Zahl liefert die Abfrage?', code: `ware(name, preis): ${['Rüben', 'Kohl', 'Äpfel', 'Honig', 'Wolle'].map((w, i) => `${w} ${p[i]}`).join(' | ')}\n\nSELECT COUNT(*)\nFROM ware\nWHERE preis > (SELECT AVG(preis) FROM ware);`,
        antworten: [String(n)], erkl: `Das Subselect liefert den Durchschnitt ${String(Math.round(avg * 100) / 100).replace('.', ',')}. Teurer sind ${n} Waren.` }; } },
  { id: 'k25_078', burg: 25, kap: 72, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 1.8 UPDATE',
    gen: (z) => { const p = [z.int(1, 12), z.int(1, 12), z.int(1, 12), z.int(1, 12), z.int(1, 12)], x = z.int(4, 9), n = p.filter((v) => v < x).length;
      return { frage: 'Wie viele Zeilen ändert der Befehl?', code: `ware(name, preis): ${['Rüben', 'Kohl', 'Äpfel', 'Honig', 'Wolle'].map((w, i) => `${w} ${p[i]}`).join(' | ')}\n\nUPDATE ware\nSET preis = preis * 2\nWHERE preis < ${x};`,
        antworten: [String(n)], erkl: `Geändert werden nur Zeilen, auf die WHERE zutrifft: Preise unter ${x} → ${n} Zeilen. Ohne WHERE wären es alle 5.` }; } },
  { id: 'k25_079', burg: 25, kap: 72, stufe: 2, art: 'zeile', frage: 'Die Tabelle ausleihe soll Leser und Bücher verbinden. Tippe die fehlerhafte Zeile an.',
    code: 'CREATE TABLE ausleihe (\n  leser_id INTEGER REFERENCES leser(id),\n  buch_id INTEGER REFERENCES leser(id),\n  datum TEXT\n);',
    fehler: [3], erkl: 'buch_id ist ein Fremdschlüssel auf die Tabelle buch: REFERENCES buch(id). So zeigt er auf einen Leser – die Datenbank würde Bücher mit Lesernummern prüfen.', quelle: 'OPAL LB 9 1.11 CREATE TABLE mit Fremdschlüssel' },
  { id: 'k25_080', burg: 25, kap: 74, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB 9 3.3 CSV einlesen',
    gen: (z) => { const namen = ['Anna', 'Bruno', 'Clara', 'David', 'Ella'], doerfer = namen.map(() => z.wahl(['Lindenhain', 'Mühlbach'])), zeiten = namen.map(() => z.int(30, 60)), d = z.wahl(['Lindenhain', 'Mühlbach']);
      const s = zeiten.filter((_, i) => doerfer[i] === d).reduce((a, b) => a + b, 0);
      return { frage: 'rennen.csv enthält die Zeilen oben. Was gibt das Programm aus?', code: `Name;Dorf;Zeit\n${namen.map((n, i) => `${n};${doerfer[i]};${zeiten[i]}`).join('\n')}\n\nimport csv\nsumme = 0\nwith open('rennen.csv', newline='', encoding='utf-8') as datei:\n    for zeile in csv.DictReader(datei, delimiter=';'):\n        if zeile['Dorf'] == '${d}':\n            summe = summe + int(zeile['Zeit'])\nprint(summe)`,
        antworten: [String(s)], erkl: `DictReader liefert jede Zeile als Wörterbuch mit den Spaltennamen der Kopfzeile. Nur die Zeiten aus ${d} werden (als Zahl) addiert: ${s}.` }; } },
  { id: 'k25_081', burg: 25, kap: 74, stufe: 1, art: 'zeile', frage: 'Die Datei rennen.csv beginnt mit der Kopfzeile Name;Dorf;Zeit. Das Programm bricht mit KeyError: \'Name\' ab. Tippe die fehlerhafte Zeile an.',
    code: "import csv\nwith open('rennen.csv', newline='', encoding='utf-8') as datei:\n    for zeile in csv.DictReader(datei):\n        print(zeile['Name'])",
    fehler: [3], erkl: "Ohne delimiter=';' trennt DictReader am Komma – die ganze Kopfzeile „Name;Dorf;Zeit“ wird ein einziger Schlüssel. Richtig: csv.DictReader(datei, delimiter=';').", quelle: 'OPAL LB 9 3.3 CSV einlesen' },
);
