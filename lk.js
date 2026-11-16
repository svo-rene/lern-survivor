// Weitere LK-Lernbereiche: übernimmt die Auswahlfragen (art 'wahl') aus den Kerker-Fragen von „Automate the Castle“
// (Ordner lk/, Quellen: OPAL-Kurse LK Informatik, Lehrplan Sachsen). Index 0 der Optionen ist dort ebenfalls richtig.
'use strict';
(() => {
  const BEREICHE = [
    {burg: 22, id: 'ki',         icon: '🤖', name: 'Künstliche Intelligenz', stufe: 'LK · LB 10/11: Lernarten, Entscheidungsbaum, k-NN, Regression, k-Means, Q-Lernen, Perzeptron'},
    {burg: 28, id: 'technik',    icon: '🔦', name: 'Technische Informatik', stufe: 'LK · LB 1: Zahlen & Zeichen, Boolesche Algebra, Schaltnetze, Rechnerarchitektur'},
    {burg: 23, id: 'oop',        icon: '🔧', name: 'Objektorientierung', stufe: 'LK · LB 4/5: Klassen, Objekte, Kapselung, Beziehungen, Vererbung, Polymorphie'},
    {burg: 29, id: 'netze',      icon: '📡', name: 'Rechnernetze', stufe: 'LK · LB 7: Topologien, Schichten, MAC/ARP, IP & Subnetze, Routing, DNS, TCP/UDP'},
    {burg: 27, id: 'automaten',  icon: '⚙️', name: 'Sprachen & Automaten', stufe: 'LK · LB 6: Grammatiken, BNF, Chomsky, DEA/NEA, Kellerautomat, Compiler'},
    {burg: 25, id: 'datenbank',  icon: '🗄️', name: 'Datenmanagement', stufe: 'LK · LB 9: SQL, ER-Modell, Normalformen, CSV/JSON, NoSQL'},
    {burg: 26, id: 'sicherheit', icon: '🔐', name: 'Informationssicherheit', stufe: 'LK · LB 8: Schutzziele, klassische Chiffren, AES, Diffie-Hellman, RSA, Hash, Signatur'},
  ];
  const Z = {
    int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
    wahl: (l) => l[Math.floor(Math.random() * l.length)],
    mische: (l) => [...l].sort(() => Math.random() - .5),
  };
  function convert(f) {
    let x = f;
    if (typeof f.gen === 'function') { try { x = Object.assign({}, f, f.gen(Z)); } catch (e) { return null; } }
    if (!x.optionen || x.optionen.length < 2 || !x.frage) return null;
    if (x.bild) return null;   // Fragen mit Grafik (z. B. ER-Diagramm) kann das Spiel nicht anzeigen
    let q = String(x.frage);
    if (x.code) q += '\n`' + String(x.code).replace(/`/g, "'") + '`';
    return {d: Math.min(3, Math.max(1, x.stufe || 1)), q, a: x.optionen.map(String), e: x.erkl || ''};
  }
  const all = (window.KERKER_FRAGEN || []).filter((f) => f.art === 'wahl');
  for (const b of BEREICHE) {
    const fragen = all.filter((f) => f.burg === b.burg).map(convert).filter(Boolean);
    if (fragen.length) LERNBEREICHE.push({id: b.id, icon: b.icon, name: b.name, stufe: b.stufe, fragen});
  }
  // Reihenfolge wie im Kurs: Grundlagen → Sortieren → Datenstrukturen → Kl. 11 → Kl. 12
  const ORDER = ['python', 'algo', 'daten', 'ki', 'technik', 'oop', 'netze', 'automaten', 'datenbank', 'sicherheit'];
  LERNBEREICHE.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
})();
