'use strict';
// 🗝️ Kerker-Fragen Burg 29 (LK Netze) – Quellen: OPAL LK_INF_LB7 „Rechnernetze“ (7.1 Topologien, 7.2 Vermittlung und Dienste,
// 7.3 Schichtenmodelle, 7.4 Netzzugangsschicht, 7.5 IP und Routing, 7.6 Subnetting/CIDR/VLSM, 7.7 DHCP, 7.8 DNS, 7.9 TCP/UDP,
// 7.10 Anwendungsschicht), OPAL LK_INF_Abiturvorbereitung 6.1 „Rechnernetze“ (Aufgaben 6.1.1–6.1.7), Lehrplan Sachsen LK LB 7.
KERKER_FRAGEN.push(
  // ---------- Kapitel 120: Topologien und Medien ----------
  { id: 'k29_001', burg: 29, kap: 120, stufe: 1, art: 'zuordnen', frage: 'Ordne jeder Topologie ihr Merkmal zu.',
    paare: [['Stern', 'alle Geräte hängen an einem zentralen Knoten'], ['Bus', 'eine gemeinsame Leitung für alle'], ['Ring', 'jedes Gerät hat genau zwei Nachbarn'], ['Masche', 'mehrere redundante Wege'], ['Baum', 'mehrere Sterne hierarchisch verbunden']],
    erkl: 'Die physische Topologie beschreibt die Verkabelung, die logische den Weg der Daten.', quelle: 'OPAL LB7 7.1 Topologien' },
  { id: 'k29_002', burg: 29, kap: 120, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.1 Topologien',
    gen: (z) => { const n = z.int(4, 12); return { frage: `Wie viele Leitungen braucht ein vollvermaschtes Netz aus ${n} Standorten (jeder mit jedem)?`, antworten: [String((n * (n - 1)) / 2)], erkl: `Jeder Standort hat ${n - 1} Leitungen, jede Leitung zählt doppelt: ${n} · ${n - 1} / 2 = ${(n * (n - 1)) / 2}.` }; } },
  { id: 'k29_003', burg: 29, kap: 120, stufe: 2, art: 'eingabe', zahl: true, tol: 1, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 6.1.5 a/b, LB7 7.1',
    gen: (z) => {
      const gb = z.wahl([1.2, 1.8, 2.4, 3, 4.5]), r = z.wahl([20, 40, 50, 100]), e = z.wahl([80, 75, 100]), t = (gb * 8000) / (r * (e / 100));
      return { frage: `Eine Datei mit ${String(gb).replace('.', ',')} GB (1 GB = 1000 MB) wird über eine Leitung mit ${r} Mbit/s hochgeladen${e < 100 ? `, effektiv nutzbar sind ${e} %` : ''}. Wie viele Sekunden dauert das?`, antworten: [String(Math.round(t))],
        erkl: `${String(gb).replace('.', ',')} GB = ${gb * 1000} MB = ${gb * 8000} Mbit. Nutzbare Rate ${String((r * e) / 100).replace('.', ',')} Mbit/s. ${gb * 8000} : ${String((r * e) / 100).replace('.', ',')} ≈ ${Math.round(t)} s.` };
    } },
  { id: 'k29_004', burg: 29, kap: 120, stufe: 2, art: 'wahl', frage: 'Ein Vereinsmitglied rechnet: „2400 MB : 40 Mbit/s = 60 s.“ Erläutere den Fehler.',
    optionen: ['Byte und Bit verwechselt, richtig sind 480 s', 'Man muss mit 1024 statt 1000 rechnen, sonst stimmt alles', 'Das Ergebnis ist in Minuten, nicht in Sekunden', 'Kein Fehler, die Rechnung stimmt'],
    erkl: 'Dateigrößen stehen in Byte (B), Datenraten in Bit pro Sekunde (b). Erst die Einheiten angleichen: mal 8. 2400 MB = 19 200 Mbit, 19 200 : 40 = 480 s.', quelle: 'OPAL Abiturvorbereitung 6.1.5 d' },
  { id: 'k29_005', burg: 29, kap: 120, stufe: 3, art: 'eingabe', zahl: true, tol: 0.5, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 6.1.5 c',
    gen: (z) => {
      const gb = z.wahl([1.2, 1.8, 2.4, 3]), min = z.wahl([4, 5, 6, 8, 10]), nutz = (gb * 8000) / (min * 60), r = nutz / 0.8;
      return { frage: `${String(gb).replace('.', ',')} GB (dezimal) sollen spätestens ${min} Minuten nach dem Start übertragen sein. Effektiv sind 80 % der Datenrate nutzbar. Welche Datenrate in Mbit/s muss der Anschluss mindestens haben?`, antworten: [String(Math.round(r * 100) / 100)],
        erkl: `Rückwärts rechnen: ${gb * 8000} Mbit : ${min * 60} s = ${String(Math.round(nutz * 100) / 100).replace('.', ',')} Mbit/s nutzbar, geteilt durch 0,8 = ${String(Math.round(r * 100) / 100).replace('.', ',')} Mbit/s.` };
    } },
  { id: 'k29_006', burg: 29, kap: 120, stufe: 1, art: 'wahl', frage: 'Bei welchem Modell ist jeder Teilnehmer gleichzeitig Client und Server?',
    optionen: ['Peer-to-Peer', 'Client-Server', 'Leitungsvermittlung', 'Stern-Topologie'],
    erkl: 'Bei Peer-to-Peer (dezentral) bietet jeder Teilnehmer Dienste an und nutzt sie. Beim Client-Server-Modell gibt es einen zentralen Anbieter.', quelle: 'OPAL LB7 7.2 Vermittlung und Dienste' },
  { id: 'k29_007', burg: 29, kap: 120, stufe: 1, art: 'wahl', frage: 'Was kennzeichnet Paketvermittlung?',
    optionen: ['Pakete werden einzeln weitergeleitet, auch auf verschiedenen Wegen', 'Für die ganze Verbindung wird eine feste Leitung reserviert', 'Alle Pakete einer Nachricht müssen genau denselben Weg nehmen', 'Ein Paket wird erst losgeschickt, wenn das vorige angekommen ist'],
    erkl: 'Leitungsvermittlung (altes Telefon) reserviert eine Leitung. Paketvermittlung (Internet) teilt Leitungen zwischen vielen Verbindungen.', quelle: 'OPAL LB7 7.2 Vermittlung und Dienste' },
  { id: 'k29_008', burg: 29, kap: 120, stufe: 3, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.2 Paketvermittlung',
    gen: (z) => {
      const p = z.int(3, 50), l = z.int(2, 5), t = z.int(1, 4);
      return { frage: `Paketvermittlung: ${p} Pakete gehen über eine Kette aus ${l} Leitungen. Jedes Paket braucht auf jeder Leitung ${t} ms, ein Knoten schickt ein Paket erst weiter, wenn es ganz angekommen ist. Nach wie vielen ms ist das letzte Paket angekommen?`, antworten: [String((p + l - 1) * t)],
        erkl: `Das erste Paket braucht ${l} · ${t} ms. Wie am Fließband kommt danach alle ${t} ms ein weiteres an: (${p} + ${l} − 1) · ${t} = ${(p + l - 1) * t} ms.` };
    } },
  { id: 'k29_009', burg: 29, kap: 120, stufe: 3, art: 'wahl', frage: 'Ein Verein überlegt, Mitgliederdaten in einer Cloud zu speichern. Der Kassenwart meint: „Mit der Cloud sind wir alle Sorgen los. Um Datenschutz und Datensicherung kümmert sich ja der Anbieter.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Nur teilweise: Datenschutz und eigene Sicherungen bleiben beim Verein', 'Stimmt, der Anbieter haftet für alles, was mit den Daten passiert', 'Stimmt nicht, Daten in einer Cloud sind grundsätzlich ungeschützt', 'Stimmt, weil Daten in der Cloud immer verschlüsselt gespeichert sind'],
    erkl: 'Hardware, Wartung und Ausfallsicherheit übernimmt der Anbieter – verantwortlich für den Datenschutz (Auswahl des Anbieters, Serverstandort, Zugriffsrechte, Passwörter) und für eigene Sicherungen bleibt der Verein. Beurteilen heißt: dem Kassenwart in einem Punkt recht geben, dann nennen, was beim Verein bleibt (z. B. jemand löscht versehentlich den Ordner), und ein Urteil fällen.', quelle: 'OPAL Abiturvorbereitung 6.1.6 b, LB7 7.2' },

  // ---------- Kapitel 121: Schichtenmodelle ----------
  { id: 'k29_010', burg: 29, kap: 121, stufe: 1, art: 'reihe', frage: 'Bring die Schichten des TCP/IP-Modells von oben nach unten in die richtige Reihenfolge.',
    teile: ['Anwendungsschicht', 'Transportschicht', 'Internetschicht', 'Netzzugangsschicht'],
    erkl: 'Jede Schicht nutzt die Dienste der Schicht darunter. Die Anwendungsschicht fasst die OSI-Schichten 5 bis 7 zusammen.', quelle: 'OPAL LB7 7.3 Schichtenmodelle' },
  { id: 'k29_011', burg: 29, kap: 121, stufe: 1, art: 'zuordnen', frage: 'Ordne die Nummern der OSI-Schichten den Namen zu.',
    paare: [['Schicht 1', 'Bitübertragungsschicht'], ['Schicht 2', 'Sicherungsschicht'], ['Schicht 3', 'Vermittlungsschicht'], ['Schicht 4', 'Transportschicht'], ['Schicht 7', 'Anwendungsschicht']],
    erkl: 'Von unten: Bitübertragung, Sicherung, Vermittlung, Transport, Sitzung, Darstellung, Anwendung.', quelle: 'OPAL LB7 7.3 Schichtenmodelle' },
  { id: 'k29_012', burg: 29, kap: 121, stufe: 1, art: 'zuordnen', frage: 'Ordne jeder Schicht des TCP/IP-Modells ihre Dateneinheit (PDU) zu.',
    paare: [['Anwendungsschicht', 'Nachricht'], ['Transportschicht (TCP)', 'Segment'], ['Internetschicht', 'Paket'], ['Netzzugangsschicht', 'Frame (Rahmen)']],
    erkl: 'Bei UDP heißt die Dateneinheit der Transportschicht Datagramm.', quelle: 'OPAL LB7 7.3 Schichtenmodelle' },
  { id: 'k29_013', burg: 29, kap: 121, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.3 Kapselung',
    gen: (z) => {
      const n = z.int(10, 1460), p = z.wahl(['UDP', 'TCP']), h = p === 'TCP' ? 20 : 8;
      return { frage: `${n} Byte Nutzdaten werden per ${p} über IPv4 und Ethernet verschickt. Wie groß ist der Ethernet-Frame in Byte? (UDP-Header 8, TCP-Header 20, IPv4-Header 20, Ethernet 14 Byte Header + 4 Byte Prüfsumme)`, antworten: [String(n + h + 20 + 18)],
        erkl: `Von innen nach außen: ${n} + ${h} (${p}) + 20 (IP) + 14 + 4 (Ethernet) = ${n + h + 38} Byte.` };
    } },
  { id: 'k29_014', burg: 29, kap: 121, stufe: 2, art: 'mehr', frage: 'Kreuze alle Protokolle an, die zur Anwendungsschicht des TCP/IP-Modells gehören.',
    optionen: ['HTTP', 'DNS', 'DHCP', 'TCP', 'IP', 'Ethernet', 'SMTP'], richtig: [0, 1, 2, 6],
    erkl: 'TCP gehört zur Transportschicht, IP zur Internetschicht, Ethernet zur Netzzugangsschicht. DNS und DHCP sind Dienste der Anwendungsschicht (über UDP).', quelle: 'OPAL LB7 7.3, 7.10' },
  { id: 'k29_015', burg: 29, kap: 121, stufe: 2, art: 'wahl', frage: 'Welcher Vorteil von Schichtenmodellen ist richtig beschrieben?',
    optionen: ['Man kann z. B. Kabel gegen WLAN tauschen, ohne HTTP zu ändern', 'Die Daten werden durch die vielen Schichten schneller übertragen', 'Jede Schicht bekommt ihr eigenes Kabel und stört so keine andere', 'Jede Schicht kann alle Header der anderen Schichten lesen und ändern'],
    erkl: 'Jede Schicht löst eine Teilaufgabe und nutzt nur die Schicht darunter. Abstraktion, Modularität, Standardisierung, Fehlerisolierung – deshalb sucht man Fehler auch von unten nach oben.', quelle: 'OPAL LB7 7.3 Schichtenmodelle' },

  // ---------- Kapitel 122: MAC, Switch und ARP ----------
  { id: 'k29_016', burg: 29, kap: 122, stufe: 1, art: 'eingabe', zahl: true, frage: 'Wie viele Bit hat eine MAC-Adresse?',
    antworten: ['48'], erkl: '6 Byte, geschrieben als 6 Hexpaare, z. B. 3C:79:30:29:FA:1F. Die ersten 3 Byte (OUI) nennen den Hersteller.', quelle: 'OPAL LB7 7.4 Netzzugangsschicht' },
  { id: 'k29_017', burg: 29, kap: 122, stufe: 1, art: 'luecke', frage: 'Ergänze: Wer arbeitet mit welchen Adressen?',
    text: 'Ein Switch leitet Frames nach {}-Adressen weiter, ein Router Pakete nach {}-Adressen.', luecken: [['MAC'], ['IP']], woerter: ['MAC', 'IP', 'Port', 'Domain'],
    erkl: 'Der Switch liest nur die Ziel-MAC eines Frames. IP-Adressen wertet erst der Router aus.', quelle: 'OPAL LB7 7.4, Abiturvorbereitung 6.1.1 (Hinweis)' },
  { id: 'k29_018', burg: 29, kap: 122, stufe: 1, art: 'eingabe', frage: 'Wie lautet die MAC-Broadcast-Adresse?',
    antworten: ['FF:FF:FF:FF:FF:FF', 'FF-FF-FF-FF-FF-FF', 'FFFFFFFFFFFF'], erkl: 'Alle 48 Bit sind 1. Einen Frame an diese Adresse bekommen alle Geräte im lokalen Netz, z. B. eine ARP-Anfrage.', quelle: 'OPAL LB7 7.4 Netzzugangsschicht' },
  { id: 'k29_019', burg: 29, kap: 122, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.4 Switch',
    gen: (z) => {
      const n = z.int(4, 6), ein = z.int(1, n), rest = [...Array(n)].map((_, i) => i + 1).filter((p) => p !== ein);
      return { frage: `Ein Switch mit ${n} Ports hat eine leere SAT (MAC-Tabelle). An Port ${ein} kommt ein Frame von A an B an. An welche Ports leitet er ihn weiter? (Nummern mit Leerzeichen)`, antworten: [rest.join(' '), rest.join(','), rest.join(', ')],
        erkl: `Zuerst lernt er „A hängt an Port ${ein}“. B kennt er noch nicht, also flutet er den Frame an alle anderen Ports: ${rest.join(', ')}.` };
    } },
  { id: 'k29_020', burg: 29, kap: 122, stufe: 2, art: 'reihe', frage: 'PC1 will PC2 im selben Netz anpingen, kennt aber dessen MAC-Adresse nicht. Bring die Schritte in die richtige Reihenfolge.',
    teile: ['PC1 erkennt: Ziel im eigenen Netz, MAC nicht im ARP-Cache', 'PC1 sendet per Broadcast: Wer hat diese IP-Adresse?', 'PC2 antwortet direkt mit seiner MAC-Adresse', 'PC1 speichert die Zuordnung im ARP-Cache', 'PC1 schickt den Ping an die MAC-Adresse von PC2'],
    erkl: 'ARP verbindet Internet- und Netzzugangsschicht: Es ordnet einer IP-Adresse im lokalen Netz die MAC-Adresse zu.', quelle: 'OPAL LB7 7.4 ARP' },
  { id: 'k29_021', burg: 29, kap: 122, stufe: 3, art: 'wahl', frage: 'Laptop L1 (192.168.40.20/25, Gateway 192.168.40.1) ruft eine Webseite auf einem Server 198.51.100.80 im Internet ab. Welche Ziel-MAC-Adresse trägt der Frame, den L1 abschickt?',
    optionen: ['die MAC-Adresse des Routers (Gateway)', 'die MAC-Adresse des Webservers', 'FF:FF:FF:FF:FF:FF (Broadcast an alle)','die MAC-Adresse des Switches'],
    erkl: 'Das Ziel liegt in einem fremden Netz, also geht der Frame an das Gateway – L1 holt sich dessen MAC per ARP. Die Ziel-IP im Paket bleibt die des Webservers.', quelle: 'OPAL Abiturvorbereitung 6.1.1 e (Hinweis Stufe 2)' },

  // ---------- Kapitel 123: IP-Adressen und Subnetze ----------
  { id: 'k29_022', burg: 29, kap: 123, stufe: 1, art: 'mehr', frage: 'Kreuze alle gültigen IPv4-Adressen an.',
    optionen: ['10.200.0.255', '192.168.300.1', '172.16.5', 'fe80::1', '0.0.0.0', '77.872.67.54'], richtig: [0, 4],
    erkl: 'Vier Zahlen von 0 bis 255 (auch 0.0.0.0 ist so gebaut). 300 und 872 sind zu groß, 172.16.5 hat nur drei Teile, fe80::1 ist eine IPv6-Adresse. Eine Adresse, die auf 255 endet, ist nicht automatisch ungültig.', quelle: 'OPAL Abiturvorbereitung 6.1.1 a' },
  { id: 'k29_023', burg: 29, kap: 123, stufe: 1, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.6 Subnetting und CIDR',
    gen: (z) => {
      const p = z.int(16, 30), m = [0, 1, 2, 3].map((i) => { const b = Math.max(0, Math.min(8, p - 8 * i)); return 256 - 2 ** (8 - b); });
      return { frage: `Welche Subnetzmaske gehört zur Präfixlänge /${p}?`, antworten: [m.join('.')], erkl: `/${p} heißt: ${p} Einsen, dann ${32 - p} Nullen. Byteweise: ${m.join('.')}.` };
    } },
  { id: 'k29_024', burg: 29, kap: 123, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 6.1.1 b',
    gen: (z) => {
      const p = z.int(16, 30), m = [0, 1, 2, 3].map((i) => { const b = Math.max(0, Math.min(8, p - 8 * i)); return 256 - 2 ** (8 - b); });
      return { frage: `Wie viele Bit umfasst der Hostanteil bei der Subnetzmaske ${m.join('.')}?`, antworten: [String(32 - p)], erkl: `Die Maske hat ${p} Einsen (Präfix /${p}). Hostanteil = 32 − ${p} = ${32 - p} Bit – auch die Nullen in den vorderen Bytes zählen mit.` };
    } },
  { id: 'k29_025', burg: 29, kap: 123, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.6, Abiturvorbereitung 6.1.4 a',
    gen: (z) => {
      const p = z.int(24, 30), a = [z.wahl([10, 172, 192]), z.int(0, 255), z.int(0, 255), z.int(1, 254)], blk = 2 ** (32 - p), n = Math.floor(a[3] / blk) * blk;
      return { frage: `Ein Rechner hat die Adresse ${a.join('.')}/${p}. Wie lautet die Netzadresse?`, antworten: [`${a[0]}.${a[1]}.${a[2]}.${n}`],
        erkl: `/${p} → Blöcke zu 2^${32 - p} = ${blk} Adressen im letzten Byte. Das Vielfache von ${blk} direkt unter ${a[3]} ist ${n} (= IP AND Maske).` };
    } },
  { id: 'k29_026', burg: 29, kap: 123, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.6, Abiturvorbereitung 6.1.4 a',
    gen: (z) => {
      const p = z.int(24, 30), a = [z.wahl([10, 172, 192]), z.int(0, 255), z.int(0, 255), z.int(1, 254)], blk = 2 ** (32 - p), n = Math.floor(a[3] / blk) * blk;
      return { frage: `Ein Rechner hat die Adresse ${a.join('.')}/${p}. Wie lautet die Broadcast-Adresse seines Netzes?`, antworten: [`${a[0]}.${a[1]}.${a[2]}.${n + blk - 1}`],
        erkl: `Netzadresse ${a[0]}.${a[1]}.${a[2]}.${n}, Blockgröße ${blk}. Die letzte Adresse des Blocks ist die Broadcast-Adresse: ${n} + ${blk} − 1 = ${n + blk - 1}.` };
    } },
  { id: 'k29_027', burg: 29, kap: 123, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.6 Subnetting',
    gen: (z) => { const p = z.int(20, 30); return { frage: `Wie viele nutzbare Hostadressen hat ein Netz mit der Präfixlänge /${p}?`, antworten: [String(2 ** (32 - p) - 2)], erkl: `2^${32 - p} − 2 = ${2 ** (32 - p) - 2}. Netz- und Broadcast-Adresse bekommt kein Gerät.` }; } },
  { id: 'k29_028', burg: 29, kap: 123, stufe: 2, art: 'mehr', frage: 'Ein Rechner hat 10.8.3.70/26. Kreuze alle Adressen an, die im selben Netz liegen.',
    optionen: ['10.8.3.120', '10.8.3.64', '10.8.3.60', '10.8.3.129', '10.9.3.70', '10.8.3.127'], richtig: [0, 1, 5],
    erkl: '/26 → Blöcke zu 64: 0–63, 64–127, 128–191, 192–255. Das Netz ist 10.8.3.64 bis 10.8.3.127 (Netz- und Broadcast-Adresse gehören auch dazu, bekommen aber kein Gerät). 10.9.3.70 hat ein anderes zweites Byte.', quelle: 'OPAL Abiturvorbereitung 6.1.1 c' },
  { id: 'k29_029', burg: 29, kap: 123, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL Abiturvorbereitung 6.1.1 d, LB7 7.6 VLSM',
    gen: (z) => {
      const g = z.int(5, 200), b = g + 1;
      let h = 2;
      while (2 ** h - 2 < b) h++;
      return { frage: `Ein Subnetz soll ${g} Geräte und zusätzlich das Gateway aufnehmen. Welche Präfixlänge ist die größte, die noch reicht? (nur die Zahl, z. B. 26)`, antworten: [String(32 - h)],
        erkl: `Bedarf ${b} Adressen. Kleinstes h mit 2^h − 2 ≥ ${b}: h = ${h} (${2 ** h - 2} Hosts), also /${32 - h}. Mit /${33 - h} wären es nur ${2 ** (h - 1) - 2}.` };
    } },
  { id: 'k29_030', burg: 29, kap: 123, stufe: 3, art: 'eingabe', frage: 'Fortsetzung: Die Subnetze werden vom größten zum kleinsten lückenlos ab 10.20.30.0 vergeben (Bedarf 51, 26, 13). Welche Broadcast-Adresse hat das kleinste Subnetz?',
    antworten: ['10.20.30.111'], erkl: '10.20.30.0/26 (0–63), 10.20.30.64/27 (64–95), 10.20.30.96/28 (96–111). Frei bleibt alles ab 10.20.30.112.', quelle: 'OPAL Abiturvorbereitung 6.1.1 d, 6.1.3 a' },
  { id: 'k29_031', burg: 29, kap: 123, stufe: 2, art: 'wahl', frage: 'Zwei Router werden über eine Funkstrecke verbunden. Warum ist /30 das kleinste passende Netz? (Rechne mit 2ʰ − 2 Hostadressen.)',
    optionen: ['/30 hat genau 2 Hostadressen, /31 hätte keine', 'Weil Router grundsätzlich immer ein /30 brauchen', '/30 hat 30 Hostadressen, das reicht für viele Router', 'Weil /32 nicht erlaubt ist und /31 zu groß wäre'],
    erkl: '/30 hat 4 Adressen, davon 2 Hostadressen – genau die zwei Router. /31 ließe nach Abzug von Netz- und Broadcast-Adresse keine übrig. Vergleiche 2ʰ − 2 für h = 1 (0 Hosts) und h = 2 (2 Hosts). (In der Praxis erlaubt RFC 3021 /31 als Sonderfall für Punkt-zu-Punkt-Strecken.)', quelle: 'OPAL Abiturvorbereitung 6.1.4 b' },
  { id: 'k29_032', burg: 29, kap: 123, stufe: 3, art: 'wahl', frage: 'Ein Helfer sagt: „Im Netz 10.30.4.0/23 bekommen alle 512 Kassen-Tablets eine eigene Adresse.“ Im Netz gibt es außerdem einen Router. Prüfe die Aussage.',
    optionen: ['Falsch: Es passen nur 509 Tablets', 'Richtig, /23 hat genau 512 Adressen', 'Falsch, /23 hat nur 254 Hostadressen', 'Falsch, /23 hat 1024 Adressen, es passen mehr'],
    erkl: '/23 hat 512 Adressen, davon 510 Hostadressen, eine braucht der Router: 509 Tablets (10.30.4.1 bis 10.30.5.254). Bei /23 reicht der Hostanteil ins dritte Byte: 9 Hostbits, 2⁹ = 512 Adressen. Netz- und Broadcast-Adresse sowie der Router fallen weg.', quelle: 'OPAL Abiturvorbereitung 6.1.4 c' },
  { id: 'k29_033', burg: 29, kap: 123, stufe: 3, art: 'wahl', frage: 'Ein DNS-Server 10.40.3.2 hat versehentlich die Maske 255.255.0.0 statt 255.255.255.0. Er kann seinen Router 10.40.3.1 anpingen, ein Büro-Notebook 10.40.1.3 aber nicht. Erkläre.',
    optionen: ['Mit /16 hält er 10.40.1.3 für lokal und fragt per ARP', 'Der Router blockiert grundsätzlich alle Pings aus dem DNS-Netz', 'Die Maske spielt keine Rolle, das Kabel zum Büro ist defekt', 'Er hat das falsche Standardgateway eingetragen'],
    erkl: 'Im eigenen Segment antwortet auf die ARP-Anfrage niemand. Ein Host entscheidet mit IP AND Maske, ob das Ziel lokal ist. Für den Router 10.40.3.1 stimmt die Entscheidung zufällig trotzdem.', quelle: 'OPAL Abiturvorbereitung 6.1.2 g' },

  // ---------- Kapitel 124: Routing, DHCP und DNS ----------
  { id: 'k29_034', burg: 29, kap: 124, stufe: 1, art: 'mehr', frage: 'Was teilt ein DHCP-Server einem Client mit? Kreuze alle an.',
    optionen: ['IP-Adresse', 'Subnetzmaske', 'Standardgateway', 'DNS-Server', 'MAC-Adresse des Clients', 'Portnummer des Browsers'], richtig: [0, 1, 2, 3],
    erkl: 'Die MAC-Adresse hat der Client selbst (Hardware). DHCP verleiht die IP-Konfiguration für eine begrenzte Zeit (Lease).', quelle: 'OPAL LB7 7.7 DHCP' },
  { id: 'k29_035', burg: 29, kap: 124, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.7 DHCP',
    gen: (z) => {
      const p = z.wahl([24, 25, 26, 27]), r = z.int(3, 15), h = 2 ** (32 - p) - 2;
      return { frage: `Netz 192.168.40.0/${p}. Der Router hat .1, die Adressen .2 bis .${r} sind fest vergeben. Wie viele Adressen kann der DHCP-Pool höchstens enthalten?`, antworten: [String(h - r)],
        erkl: `/${p} hat ${h} Hostadressen (.1 bis .${h}). Davon sind .1 bis .${r} belegt: ${h} − ${r} = ${h - r}.` };
    } },
  { id: 'k29_036', burg: 29, kap: 124, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.5 Routing (Longest-Prefix-Match)',
    code: 'Zielnetz          Next Hop\n10.0.0.0/8        R1\n10.20.0.0/16      R2\n10.20.30.0/24     R3\n0.0.0.0/0         R4',
    gen: (z) => {
      const art = z.int(0, 3), ip = [[10, 20, 30, z.int(1, 254)], [10, 20, z.wahl([1, 5, 31, 200]), z.int(1, 254)], [10, z.wahl([1, 21, 99]), z.int(0, 255), z.int(1, 254)], [z.wahl([172, 192, 8]), z.int(0, 255), z.int(0, 255), z.int(1, 254)]][art];
      const r = ['R3', 'R2', 'R1', 'R4'][art];
      return { frage: `An welchen Next Hop leitet der Router ein Paket an ${ip.join('.')} weiter?`, antworten: [r],
        erkl: `Passen mehrere Einträge, gewinnt der mit dem längsten Präfix. ${['/24, /16 und /8 passen – /24 ist am längsten.', '/16 und /8 passen, die /24 nicht (drittes Byte ≠ 30).', 'Nur /8 und die Default-Route passen.', 'Kein Netz der Tabelle passt, nur die Default-Route 0.0.0.0/0.'][art]}` };
    } },
  { id: 'k29_037', burg: 29, kap: 124, stufe: 1, art: 'wahl', frage: 'Wofür steht der Eintrag 0.0.0.0/0 in einer Routingtabelle?',
    optionen: ['Default-Route: gilt, wenn kein genauerer Eintrag passt', 'Pakete an dieses Netz werden sofort verworfen', 'Das Paket geht als Broadcast an alle Router', 'Der Router hat gerade keine Verbindung nach außen'],
    erkl: 'Präfix /0 heißt: kein Bit muss übereinstimmen. Beim Longest-Prefix-Match verliert sie gegen jeden anderen passenden Eintrag.', quelle: 'OPAL LB7 7.5 Routing' },
  { id: 'k29_038', burg: 29, kap: 124, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.5 Routing',
    gen: (z) => { const t = z.wahl([64, 128, 255]), n = z.int(2, 12); return { frage: `Ein Paket startet mit TTL ${t} und passiert ${n} Router. Mit welcher TTL kommt es an?`, antworten: [String(t - n)], erkl: `Jeder Router verringert die TTL um 1: ${t} − ${n} = ${t - n}. Erreicht sie 0, wird das Paket verworfen – so kreisen Pakete bei Routing-Schleifen nicht ewig.` }; } },
  { id: 'k29_039', burg: 29, kap: 124, stufe: 3, art: 'wahl', frage: 'In der Tabelle von Router RP fehlt nach einem Update der Eintrag für das LAN Radebeul 10.20.2.0/24; die Default-Route zum Internetanbieter ist noch da. Ein Paket aus Meißen an 10.20.2.40 kommt bei RP an. Was geschieht?',
    optionen: ['Es geht über die Default-Route ins Internet und dort verloren', 'RP verwirft es sofort, weil kein Eintrag der Tabelle passt', 'Es kommt trotzdem an, weil Radebeul direkt neben Pieschen liegt', 'RP fragt per ARP im Internet nach der MAC-Adresse des Ziels'],
    erkl: 'Im Internet werden private Zieladressen nicht weitergeleitet. Die Default-Route passt immer. Der Fehler zeigt sich nicht als Meldung bei RP, sondern als Zeitüberschreitung beim Absender.', quelle: 'OPAL Abiturvorbereitung 6.1.7 c' },
  { id: 'k29_040', burg: 29, kap: 124, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem DNS-Record-Typ zu, was er speichert.',
    paare: [['A', 'IPv4-Adresse eines Namens'], ['AAAA', 'IPv6-Adresse eines Namens'], ['MX', 'Mailserver einer Domain'], ['CNAME', 'Aliasname, der auf einen anderen Namen verweist']],
    erkl: 'Im Abitur (Filius) legt man auf dem DNS-Server meist einen A-Eintrag für den Webserver an.', quelle: 'OPAL LB7 7.8 DNS' },
  { id: 'k29_041', burg: 29, kap: 124, stufe: 2, art: 'reihe', frage: 'Ein Laptop ruft http://www.beispiel-verein.de/start.html auf, der Name ist noch nicht im Cache. Bring die Schritte in die richtige Reihenfolge.',
    teile: ['Der Laptop fragt den DNS-Server nach der IP-Adresse von www.beispiel-verein.de', 'Die DNS-Antwort mit der IP-Adresse kommt zurück', 'Der Laptop baut eine TCP-Verbindung zum Webserver auf (Port 80)', 'Der Browser sendet eine HTTP-GET-Anfrage', 'Der Webserver antwortet mit der HTML-Seite'],
    erkl: 'Ohne IP-Adresse kann kein Paket losgeschickt werden – deshalb steht die Namensauflösung am Anfang. Alle Pakete gehen über Switch und Gateway, weil beide Server in fremden Netzen liegen.', quelle: 'OPAL Abiturvorbereitung 6.1.1 e' },
  { id: 'k29_042', burg: 29, kap: 124, stufe: 3, art: 'wahl', frage: 'Die Leiterin eines Jugendclubs sagt: „Wenn der DNS-Server unseres Anbieters ausfällt, ist für uns das ganze Internet weg.“ Welche Stellungnahme ist stichhaltig?',
    optionen: ['Nur teilweise: Pakete laufen, nur Namen werden nicht aufgelöst', 'Stimmt, ohne DNS leitet kein Router mehr irgendein Paket weiter', 'Stimmt nicht, DNS wird nur für das Versenden von E-Mail gebraucht', 'Stimmt, denn der DNS-Server ist zugleich das Standardgateway'],
    erkl: 'Router leiten nach IP-Adressen weiter, nicht nach Namen. Bekannte IP-Adressen und Namen im Cache funktionieren weiter – im Alltag wirkt es trotzdem fast so. Zur Stellungnahme gehört: was ohne DNS noch geht, was nicht, was man bemerkt – und ein Urteil. Abhilfe: einen zweiten DNS-Server eintragen.', quelle: 'OPAL Abiturvorbereitung 6.1.1 f' },
  { id: 'k29_043', burg: 29, kap: 124, stufe: 2, art: 'wahl', frage: 'Ein Webserver läuft und hat die richtige IP-Adresse. Von ihm aus klappt ping zu seinem Router, aber Notebooks in anderen Netzen bekommen auf ihren Ping keine Antwort. Was ist die wahrscheinlichste Ursache?',
    optionen: ['Sein Standardgateway ist falsch eingetragen', 'Der DNS-Eintrag für den Webserver fehlt noch', 'Der Switch kennt seine MAC-Adresse noch nicht', 'Der Webserver braucht zusätzlich einen DHCP-Server'],
    erkl: 'Ein Ping braucht Hin- und Rückweg. Antworten in fremde Netze schickt der Server an sein Gateway, und das muss im eigenen Netz liegen.', quelle: 'OPAL Abiturvorbereitung 6.1.2 c' },

  // ---------- Kapitel 125: TCP, UDP und Dienste ----------
  { id: 'k29_044', burg: 29, kap: 125, stufe: 1, art: 'zuordnen', frage: 'Ordne jedem Dienst seinen Standardport zu.',
    paare: [['HTTP', '80'], ['HTTPS', '443'], ['DNS', '53'], ['SSH / SFTP', '22'], ['SMTP (Einlieferung)', '587']],
    erkl: 'Die IP-Adresse bestimmt den Rechner, der Port das Programm auf diesem Rechner.', quelle: 'OPAL LB7 7.10 Anwendungsschicht' },
  { id: 'k29_045', burg: 29, kap: 125, stufe: 1, art: 'mehr', frage: 'Kreuze alle Eigenschaften von TCP an.',
    optionen: ['verbindungsorientiert', 'Drei-Wege-Handshake beim Verbindungsaufbau', 'Bestätigungen und erneutes Senden verlorener Daten', 'verbindungslos', 'keine Bestätigungen'], richtig: [0, 1, 2],
    erkl: 'Die beiden letzten Eigenschaften gehören zu UDP: schlank, ohne Bestätigung und ohne Neusenden.', quelle: 'OPAL LB7 7.9 TCP und UDP' },
  { id: 'k29_046', burg: 29, kap: 125, stufe: 2, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.9 Drei-Wege-Handshake',
    gen: (z) => { const x = z.int(100, 9000); return { frage: `Ein Client sendet beim Verbindungsaufbau SYN mit Seq = ${x}. Welche Ack-Nummer steht im SYN-ACK des Servers?`, antworten: [String(x + 1)], erkl: `Das SYN zählt wie ein Byte. Der Server bestätigt mit Ack = ${x} + 1 = ${x + 1} (nächstes erwartetes Byte).` }; } },
  { id: 'k29_047', burg: 29, kap: 125, stufe: 3, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.9 Sequenz- und Bestätigungsnummern',
    gen: (z) => {
      const s = z.int(1, 5000), l = z.wahl([100, 200, 500, 1000]), k = z.int(2, 3);
      return { frage: `Ein Sender schickt vier Segmente zu je ${l} Byte, das erste beginnt mit Seq = ${s}. Segment ${k} geht verloren, alle anderen kommen an. Welche Ack-Nummer schickt der Empfänger nach dem 4. Segment?`, antworten: [String(s + (k - 1) * l)],
        erkl: `Bestätigt wird kumulativ das nächste erwartete Byte. Bis Segment ${k - 1} ist alles lückenlos da, Segment ${k} beginnt bei ${s} + ${k - 1} · ${l} = ${s + (k - 1) * l} – diese Nummer wiederholt der Empfänger, bis die Lücke gefüllt ist.` };
    } },
  { id: 'k29_048', burg: 29, kap: 125, stufe: 1, art: 'luecke', frage: 'Ergänze: Wozu dienen IP-Adresse und Port?',
    text: 'Die IP-Adresse bestimmt den {}, die Portnummer das {} auf diesem Rechner.', luecken: [['Rechner'], ['Programm', 'Programm (Dienst)']], woerter: ['Rechner', 'Programm', 'Router', 'Kabel'],
    erkl: 'Zwei Browser-Tabs zum selben Server unterscheiden sich am Quellport, der Server-Dienst am Zielport (z. B. 443).', quelle: 'OPAL LB7 7.9 TCP und UDP' },
  { id: 'k29_049', burg: 29, kap: 125, stufe: 2, art: 'wahl', frage: 'Warum nutzen Videocalls meist UDP statt TCP?',
    optionen: ['Ein verspätet neu gesendetes Bild wäre nutzlos', 'UDP nimmt kürzere Wege durch das Netz', 'UDP verschlüsselt die Videodaten unterwegs', 'TCP kann grundsätzlich keine Videodaten übertragen'],
    erkl: 'UDP spart Bestätigungen und das Warten auf Neusendungen. Den Weg bestimmen die Router, nicht das Transportprotokoll. UDP lohnt sich, wenn Aktualität wichtiger ist als Vollständigkeit.', quelle: 'OPAL LB7 7.9 TCP und UDP' },
  { id: 'k29_050', burg: 29, kap: 125, stufe: 3, art: 'wahl', frage: 'Eine Werkstatt bietet eine Buchungsseite mit Login im Gäste-WLAN über http:// an. Der Hausmeister meint: „HTTPS brauchen wir nicht, das WLAN ist ja mit einem Passwort geschützt.“ Beurteile.',
    optionen: ['Falsch: Das WLAN-Passwort schützt nur die Funkstrecke', 'Richtig, das WLAN-Passwort verschlüsselt alles bis zum Server', 'Richtig, Logins sind über HTTP grundsätzlich ausreichend sicher', 'Falsch, weil HTTPS nur Bilder und Videos auf der Seite schützt'],
    erkl: 'Das Gäste-WLAN-Passwort kennen viele. HTTPS verschlüsselt bis zum Server, schützt vor Veränderung und belegt per Zertifikat die Echtheit des Servers. HTTP überträgt Benutzername und Passwort im Klartext – jeder, der im selben Netz mitschneidet oder dahinter sitzt, kann sie lesen.', quelle: 'OPAL Abiturvorbereitung 6.1.3 d' },
  { id: 'k29_051', burg: 29, kap: 125, stufe: 2, art: 'wahl', frage: 'Eine Lehrerin liest ihre Mails am Laptop und am Handy, und auf beiden Geräten sollen dieselben Ordner zu sehen sein. Welche Einrichtung ist richtig?',
    optionen: ['Abrufen mit IMAP, Versenden mit SMTP', 'Abrufen mit POP3, Versenden mit IMAP', 'Abrufen und Versenden nur mit SMTP', 'Abrufen mit DNS, Versenden mit HTTP'],
    erkl: 'POP3 lädt Mails auf ein Gerät herunter, IMAP synchronisiert mit dem Server (die Mails bleiben dort). Versendet wird immer mit SMTP.', quelle: 'OPAL LB7 7.10 Anwendungsschicht' },

  // ---------- Ergänzungen 2026-11-13: NAT und IPv6 (OPAL 7.5), Fehler finden, Rechnen ----------
  { id: 'k29_052', burg: 29, kap: 123, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.5 NAT, Botenturm id8',
    code: 'privat (IP:Port)        öffentlich (IP:Port)\n192.168.178.23:51000    203.0.113.5:40001\n192.168.178.40:51000    203.0.113.5:40002\n192.168.178.23:51002    203.0.113.5:40003\n192.168.178.51:49152    203.0.113.5:40004',
    gen: (z) => {
      const t = [['192.168.178.23:51000', '203.0.113.5:40001'], ['192.168.178.40:51000', '203.0.113.5:40002'], ['192.168.178.23:51002', '203.0.113.5:40003'], ['192.168.178.51:49152', '203.0.113.5:40004']];
      const [p, o] = z.wahl(t), rein = z.wahl([true, false]);
      return rein ? { frage: `NAT-Tabelle der FRITZ!Box: Eine Antwort kommt an ${o} an. An welche private Adresse (IP:Port) wird sie weitergeleitet?`, antworten: [p], erkl: `In der Spalte „öffentlich“ ${o} suchen und die private Adresse ablesen: ${p}. Die FRITZ!Box setzt Ziel-IP und Zielport wieder auf die privaten Werte.` }
        : { frage: `NAT-Tabelle der FRITZ!Box: Ein Paket geht von ${p} ins Internet. Mit welcher Quelladresse (IP:Port) verlässt es die FRITZ!Box?`, antworten: [o], erkl: `Hinaus wird die private Quelladresse ersetzt: ${p} → ${o}. Alle Geräte erscheinen draußen mit derselben öffentlichen IP, unterschieden nur durch den Port.` };
    } },
  { id: 'k29_053', burg: 29, kap: 123, stufe: 1, art: 'luecke', frage: 'Ergänze, wie NAT im Heimrouter arbeitet.',
    text: 'Beim Weg ins Internet ersetzt der Router die private {} durch seine öffentliche IP-Adresse und den {} durch einen freien eigenen. Die Zuordnung merkt er sich in der {}.',
    luecken: [['Quell-IP', 'Quell-IP-Adresse'], ['Quellport'], ['NAT-Tabelle']], woerter: ['Quell-IP', 'Ziel-IP', 'Quellport', 'Zielport', 'NAT-Tabelle', 'Routingtabelle'],
    erkl: 'Kommt eine Antwort an diesen Port, schlägt er in der NAT-Tabelle nach und gibt sie an das richtige Gerät weiter.', quelle: 'OPAL LB7 7.5 NAT, Botenturm id8' },
  { id: 'k29_054', burg: 29, kap: 123, stufe: 2, art: 'eingabe', frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.5 IPv6-Grundlagen',
    gen: (z) => {
      const a = z.wahl([['2001:0db8:0000:0000:0000:ff00:0042:8329', '2001:db8::ff00:42:8329'], ['fe80:0000:0000:0000:0202:b3ff:fe1e:8329', 'fe80::202:b3ff:fe1e:8329'], ['2001:0db8:85a3:0000:0000:8a2e:0370:7334', '2001:db8:85a3::8a2e:370:7334'], ['2001:0db8:0000:0042:0000:0000:0000:0001', '2001:db8:0:42::1'], ['0000:0000:0000:0000:0000:0000:0000:0001', '::1']]);
      return { frage: `Kürze die IPv6-Adresse so weit wie möglich: ${a[0]}`, antworten: [a[1]],
        erkl: `Führende Nullen jeder Gruppe weglassen, dann die längste Folge von Nullgruppen einmal durch :: ersetzen: ${a[1]}. Nullen am Ende einer Gruppe (ff00) bleiben stehen.` };
    } },
  { id: 'k29_055', burg: 29, kap: 123, stufe: 2, art: 'zeile', frage: 'Ein Mitschüler kürzt 2001:0db8:0000:0000:0042:0000:0000:0001 Schritt für Schritt. Tippe den ersten fehlerhaften Schritt an.',
    code: 'führende Nullen weg: 2001:db8:0:0:42:0:0:1\nerste Nullfolge durch :: ersetzen: 2001:db8::42:0:0:1\nzweite Nullfolge auch: 2001:db8::42::1',
    fehler: [3], erkl: ':: darf nur einmal vorkommen – sonst wüsste man nicht, wie viele Nullgruppen an welcher Stelle fehlen. 2001:db8::42:0:0:1 ist richtig.', quelle: 'OPAL LB7 7.5 IPv6-Grundlagen' },
  { id: 'k29_056', burg: 29, kap: 123, stufe: 1, art: 'eingabe', zahl: true, frage: '', antworten: [], erkl: '', quelle: 'OPAL LB7 7.5 IPv6-Grundlagen',
    gen: (z) => { const p = z.wahl([48, 52, 56, 60]); return { frage: `Ein Anbieter vergibt ein /${p}-Präfix. Wie viele /64-Netze lassen sich daraus bilden?`, antworten: [String(2 ** (64 - p))], erkl: `Zwischen /${p} und /64 liegen ${64 - p} Bit: 2^${64 - p} = ${2 ** (64 - p)} Netze. Die letzten 64 Bit sind die Interface-ID.` }; } },
  { id: 'k29_057', burg: 29, kap: 123, stufe: 2, art: 'zeile', frage: 'Gesucht ist die Netzadresse von 172.16.45.13/20. Tippe den fehlerhaften Schritt an.',
    code: '/20 → Maske 255.255.240.0\ndrittes Byte: 45 AND 240 = 44\nviertes Byte: 13 AND 0 = 0\nNetzadresse: 172.16.44.0',
    fehler: [2], erkl: '45 = 0010 1101 und 240 = 1111 0000. AND lässt nur das obere Halbbyte stehen: 0010 0000 = 32. Die Netzadresse ist 172.16.32.0 (typischer Fehler: nur die letzten Bits „abschneiden“ wie beim Abrunden auf 4).', quelle: 'OPAL LB7 7.6 Subnetting' },

  // ---------- Ergänzungen 2026-11-14: weitere Fehler-finden-Aufgaben (Botenturm id2, id5, ie2, if2) ----------
  { id: 'k29_058', burg: 29, kap: 123, stufe: 1, art: 'zeile', frage: 'Gesucht ist die Broadcast-Adresse von 192.168.10.77/27. Tippe den fehlerhaften Schritt an.',
    code: '/27 → Maske 255.255.255.224\nviertes Byte: 77 AND 224 = 64 → Netz 192.168.10.64\nBlockgröße 2⁵ = 32\nBroadcast: 64 + 32 = 192.168.10.96',
    fehler: [4], erkl: 'Die Broadcast-Adresse ist die LETZTE Adresse des Blocks: 64 + 32 − 1 = 95. 192.168.10.96 ist schon die Netzadresse des nächsten Blocks.', quelle: 'OPAL LB7 7.6 Subnetting, Botenturm id5' },
  { id: 'k29_059', burg: 29, kap: 123, stufe: 2, art: 'zeile', frage: 'ip_zu_zahl("0.0.1.0") soll 256 liefern, gibt aber 10 zurück. Tippe die fehlerhafte Zeile an.',
    code: 'def ip_zu_zahl(ip):\n    teile = ip.split(".")\n    zahl = 0\n    for teil in teile:\n        zahl = zahl * 10 + int(teil)\n    return zahl',
    fehler: [5], erkl: 'Jedes Oktett ist eine Ziffer zur Basis 256 (Horner-Schema): zahl = zahl * 256 + int(teil). Mit 10 rechnet man im Dezimalsystem.', quelle: 'OPAL LB7 7.6.5 (Musterlösung ip_zu_zahl), Botenturm id2' },
  { id: 'k29_060', burg: 29, kap: 124, stufe: 2, art: 'zeile', frage: 'weiterleiten soll den Next Hop des passenden Eintrags mit dem längsten Präfix liefern, gibt aber immer None zurück. Tippe die fehlerhafte Zeile an.',
    code: 'def weiterleiten(tabelle, ziel_ip):\n    bester = -1\n    next_hop = None\n    for eintrag in tabelle:\n        if netzadresse(ziel_ip, eintrag[1]) == eintrag[0] and eintrag[1] < bester:\n            bester = eintrag[1]\n            next_hop = eintrag[2]\n    return next_hop',
    fehler: [5], erkl: 'Kein Präfix ist kleiner als −1, also wird nie ein Eintrag übernommen. Longest-Prefix-Match braucht eintrag[1] > bester.', quelle: 'OPAL LB7 7.5 Routing (Longest-Prefix-Match), Botenturm ie2' },
  { id: 'k29_061', burg: 29, kap: 125, stufe: 2, art: 'zeile', frage: 'Drei-Wege-Handshake und erstes Datensegment. Tippe die Zeile mit der falschen Nummer an.',
    code: 'Client → Server: SYN, Seq = 500\nServer → Client: SYN-ACK, Seq = 9000, Ack = 501\nClient → Server: ACK, Seq = 501, Ack = 9000\nClient → Server: 200 Byte Daten, Seq = 501',
    fehler: [3], erkl: 'Auch das SYN des Servers zählt wie ein Byte: Der Client bestätigt mit Ack = 9000 + 1 = 9001.', quelle: 'OPAL LB7 7.9.2 Drei-Wege-Handshake, Botenturm if2' },
);
