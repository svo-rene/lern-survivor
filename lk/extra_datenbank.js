'use strict';
// Zusatzfragen Lern-Survivor – Datenmanagement (LB 9). Quellen: OPAL LK_INF_LB9 Datenmanagement
// (1.4 SQL WHERE und LIKE, 2.2 NoSQL-Datenbanken, 2.3 Key-Value-Datenbanken, 2.4 Selbstcheck NoSQL)
KERKER_FRAGEN.push(
  // ---------------- Stufe 1 ----------------
  { burg: 25, stufe: 1, art: 'wahl', frage: 'Wofür steht die Abkürzung NoSQL?',
    optionen: ['Not Only SQL', 'No SQL – es gibt dort keinerlei Abfragen', 'New SQL – der Nachfolger von SQL', 'Network of SQL-Servern'],
    erkl: 'NoSQL bezeichnet nicht-relationale Datenbankmodelle (Dokument, Key-Value, Graph), die andere Ansätze als feste Tabellen bieten. Abfragen gibt es dort trotzdem, z. B. find() in MongoDB.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken' },
  { burg: 25, stufe: 1, art: 'wahl', frage: 'Wie greift man in einer Key-Value-Datenbank wie Redis auf Daten zu?',
    optionen: ['nur über den Schlüssel – im Wert wird nicht gesucht', 'über jedes Feld im Wert, wie mit WHERE in SQL', 'über Kanten zwischen Knoten', 'über JOINs zwischen mehreren Schlüsseln'],
    erkl: 'Ein Key-Value-Store kennt nur einen Zugriffsweg: den Schlüssel. Deshalb ist er extrem schnell, kann aber nicht nach Werten suchen.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (Key-Value Stores), 2.3 Key-Value-Datenbanken' },
  { burg: 25, stufe: 1, art: 'wahl', frage: 'Wo stößt das hierarchische Datenbankmodell (Baumstruktur) an seine Grenzen?',
    optionen: ['bei m:n-Beziehungen – Datensätze müssten mehrfach gespeichert werden', 'bei 1:n-Beziehungen – sie lassen sich im Baum gar nicht darstellen', 'beim Speichern von Texten und Zahlen', 'beim Zugriff von der Wurzel aus'],
    erkl: 'Im Baum hat jeder Datensatz genau einen Elternknoten. Belegt Anna mehrere Kurse, müsste sie unter jedem Kurs erneut stehen (Redundanz) – das löste das relationale Modell.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (hierarchisches Modell)' },

  // ---------------- Stufe 2 ----------------
  { burg: 25, stufe: 2, art: 'wahl', frage: 'Was gibt die letzte Zeile aus?',
    code: 'punkte = {}\n\ndef punkte_erhoehen(nutzer, anzahl=1):\n    punkte[nutzer] = punkte.get(nutzer, 0) + anzahl\n    return punkte[nutzer]\n\npunkte_erhoehen("mia", 5)\npunkte_erhoehen("tom")\npunkte_erhoehen("mia")\nprint(punkte.get("ida", 0), len(punkte), punkte["mia"])',
    optionen: ['0 2 6', '0 3 6', '1 2 6', 'KeyError'],
    erkl: 'get mit Standardwert liefert für "ida" 0, legt aber keinen Schlüssel an. Im Dictionary stehen nur mia (5 + 1 = 6) und tom.',
    quelle: 'OPAL LB9 2.3 Key-Value-Datenbanken (Beispiel 1 wie INCR)' },
  { burg: 25, stufe: 2, art: 'wahl', frage: 'Was liefert die MongoDB-Abfrage?',
    code: '[\n  { "name": "Anna", "stadt": "Dresden", "punkte": 340 },\n  { "name": "Ben", "stadt": "Radebeul", "punkte": 120 },\n  { "name": "Clara", "stadt": "Dresden", "punkte": 512 },\n  { "name": "Dana", "stadt": "Pirna", "punkte": 300 }\n]\n\ndb.collection.find({ punkte: { $gt: 300 } }, { name: 1, _id: 0 })',
    optionen: ['nur die Namen Anna und Clara', 'nur die Namen Anna, Clara und Dana', 'die vollständigen Dokumente von Anna und Clara', 'nur die Namen Ben und Dana'],
    erkl: '$gt heißt „größer als“ (300 zählt nicht). Das zweite Objekt ist die Projektion: name: 1 anzeigen, _id: 0 weglassen – wie SELECT name … WHERE punkte > 300.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (Mongo Playground)' },
  { burg: 25, stufe: 2, art: 'wahl', frage: 'Welche Vornamen liefert die Abfrage?',
    code: 'Studenten\nStudentID | Vorname | Nachname   | Notendurchschnitt\n1         | Max     | Mustermann | 2.75\n2         | Anna    | Schmidt    | 1.8\n3         | Lisa    | Müller     | 3.5\n4         | Jonas   | Bauer      | 2.9\n5         | Mia     | Klein      | 1.5\n\nSELECT Vorname\nFROM Studenten\nWHERE Nachname LIKE \'%er\' AND Notendurchschnitt < 3.0;',
    optionen: ['nur Jonas', 'Max und Jonas', 'Lisa und Jonas', 'keine Zeile'],
    erkl: '\'%er\' heißt „endet auf er“: Müller und Bauer. Lisa Müller fällt wegen 3.5 durch das AND heraus. Mustermann enthält „er“ nur in der Mitte – das fände erst \'%er%\'.',
    quelle: 'OPAL LB9 1.4 SQL WHERE- und LIKE-Klauseln' },

  // ---------------- Stufe 3 ----------------
  { burg: 25, stufe: 3, art: 'wahl', frage: 'Ein Shop cacht Preise in einem Dictionary. Was gibt die letzte Zeile aus?',
    code: 'datenbank = {"P1": 19.99}\ncache = {}\n\ndef preis_holen(produkt):\n    if produkt in cache:\n        return cache[produkt]\n    preis = datenbank.get(produkt)\n    if preis is not None:\n        cache[produkt] = preis\n    return preis\n\ndef preis_aendern(produkt, neuer_preis):\n    datenbank[produkt] = neuer_preis\n\nprint(preis_holen("P1"))\npreis_aendern("P1", 17.99)\nprint(preis_holen("P1"))',
    optionen: ['19.99', '17.99', 'None', 'KeyError'],
    erkl: 'P1 liegt seit der ersten Anfrage im Cache, der alte Preis wird weiter geliefert: Cache und Datenbank sind inkonsistent. preis_aendern müsste den Eintrag mit cache.pop(produkt, None) entfernen.',
    quelle: 'OPAL LB9 2.3 Key-Value-Datenbanken (Beispiel 2 Cache)' },
  { burg: 25, stufe: 3, art: 'wahl', frage: 'Eine Bank sucht Konten, die über mehrere Zwischenstationen mit einem auffälligen Konto verbunden sind. Welche Wahl ist am besten begründet?',
    optionen: ['Graph-Datenbank – sie folgt gespeicherten Kanten, jede weitere Stufe kostet kaum etwas.', 'Key-Value-Store – über den Schlüssel ist jeder Zugriff am schnellsten.', 'Dokumentenorientierte Datenbank – jedes Konto hat andere Felder.', 'Relationale Datenbank – beliebig viele Stufen sind ein einziger JOIN.'],
    erkl: 'Es ist eine Beziehungsfrage über mehrere Ecken. Relational kommen je Stufe weitere JOINs dazu; in Cypher ändert man nur eine Zahl (z. B. *1..5 hinter der Kante). Deshalb stecken Graph-Datenbanken hinter Betrugserkennung.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (Graph, Aufgabe 2.2.2)' },
  { burg: 25, stufe: 3, art: 'wahl', frage: 'Im Key-Value-Store liegen Schlüssel wie nutzer:1:stadt → "Dresden". Jonas tippt GET nutzer:*:stadt, um alle Städte zu bekommen, und erhält (nil). Warum?',
    optionen: ['GET liest genau einen Schlüssel – einen Schlüssel „nutzer:*:stadt“ gibt es nicht.', 'Der Stern muss in Anführungszeichen stehen, dann klappt es.', 'Redis hat die Schlüssel wegen EXPIRE schon gelöscht.', 'GET funktioniert nur mit Zahlen als Schlüssel.'],
    erkl: 'Jeder Befehl arbeitet auf genau einem Schlüssel; (nil) heißt „gibt es nicht“. Ein Key-Value-Store kann nicht über viele Werte suchen – das Programm muss die Schlüssel einzeln abfragen.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (Aufgabe 2.2.5)' },
  { burg: 25, stufe: 3, art: 'wahl', frage: 'db.nutzer.find({ Stadt: "Dresden" }) liefert kein Dokument und keine Fehlermeldung, obwohl Anna in Dresden wohnt. Welche Erklärung trifft zu?',
    optionen: ['Das Feld heißt stadt. Ohne festes Schema prüft die Datenbank Feldnamen nicht – sie findet einfach nichts.', 'MongoDB kann nur nach dem Feld _id suchen.', 'Für Texte braucht MongoDB LIKE statt geschweifter Klammern.', 'Das Dokument von Anna ist durch die Abfrage gesperrt.'],
    erkl: 'Die Freiheit ohne festes Schema hat einen Preis: Ein falsch geschriebener Feldname ist kein Fehler, sondern einfach ein Feld, das kein Dokument hat.',
    quelle: 'OPAL LB9 2.2 NoSQL-Datenbanken (dokumentenorientiert, Aufgabe 2.2.5)' }
);
