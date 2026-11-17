'use strict';
// Fächer und Lernbereiche. Die Fragen stehen in kurs/<id>.js, der Hefter in heft/<id>.js.
// Format je Frage: d = Stufe 1–3, q = Frage (`code`, mehrzeilig als Block), a = 4 Antworten (die ERSTE ist richtig), e = Erklärung, src = Quelle.
// Formeln: $F_G = m · g$ (kursiv, _G = Index), Brüche: {{Zähler|Nenner}} – auch in Antworten, Erklärungen und im Hefter.
// Neues Fach: in FAECHER eintragen, Lernbereiche mit fach: '<id>' anhängen, Dateien in index.html einbinden.
// Link nur für ein Fach: index.html?fach=physik
window.FAECHER = [
  // bosse: Endboss von Welt 1, 2, 3 (Symbol, Name mit Artikel); sieg: Meldung nach dem letzten Endboss; aufgaben: was Boss 2 tut
  {id: 'informatik', icon: '💻', name: 'Informatik', stufe: 'Leistungskurs Klasse 11/12',
   bosse: [['📝', 'Die Leistungskontrolle'], ['🧑‍🏫', 'Der Tutor'], ['🎓', 'Das Abitur']], sieg: 'Abitur bestanden', aufgaben: 'verteilt Hausaufgaben'},
  {id: 'physik',     icon: '🧲', name: 'Physik',     stufe: 'Klasse 7',
   bosse: [['🧪', 'Das Experiment'], ['📝', 'Die Leistungskontrolle'], ['👩‍🏫', 'Die Lehrkraft']], sieg: 'Lehrkraft überzeugt', aufgaben: 'teilt Aufgaben aus'},
];
// Reihenfolge wie im Kurs: Grundlagen → Algorithmen → Datenstrukturen → Kl. 11 → Kl. 12
window.LERNBEREICHE = [
  {id: 'python',     fach: 'informatik', icon: '🐍', name: 'Python-Grundlagen'},
  {id: 'algo',       fach: 'informatik', icon: '📊', name: 'Algorithmen & Komplexität'},
  {id: 'daten',      fach: 'informatik', icon: '🧱', name: 'Datenstrukturen'},
  {id: 'ki',         fach: 'informatik', icon: '🤖', name: 'Künstliche Intelligenz'},
  {id: 'technik',    fach: 'informatik', icon: '🔦', name: 'Technische Informatik'},
  {id: 'oop',        fach: 'informatik', icon: '🔧', name: 'Programmierparadigmen & OOP'},
  {id: 'netze',      fach: 'informatik', icon: '📡', name: 'Rechnernetze'},
  {id: 'automaten',  fach: 'informatik', icon: '⚙️', name: 'Sprachen & Automaten'},
  {id: 'datenbank',  fach: 'informatik', icon: '🗄️', name: 'Datenmanagement'},
  {id: 'sicherheit', fach: 'informatik', icon: '🔐', name: 'Informationssicherheit'},
  {id: 'kraefte',    fach: 'physik',     icon: '⚖️', name: 'Kräfte'},
].filter((b) => window.KURS && window.KURS[b.id])
 .map((b) => Object.assign(b, {stufe: window.KURS[b.id].stufe, fragen: window.KURS[b.id].fragen}));
