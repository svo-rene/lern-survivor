'use strict';
// Lernbereiche = LK Informatik Sachsen (Lehrplan 2022) nach den OPAL-Kursen. Die Fragen stehen in kurs/<id>.js,
// Format je Frage: d = Stufe 1–3, q = Frage (`code`, mehrzeilig als Block), a = 4 Antworten (die ERSTE ist richtig), e = Erklärung, src = Quelle.
// Reihenfolge wie im Kurs: Grundlagen → Algorithmen → Datenstrukturen → Kl. 11 → Kl. 12
window.LERNBEREICHE = [
  {id: 'python',     icon: '🐍', name: 'Python-Grundlagen'},
  {id: 'algo',       icon: '📊', name: 'Algorithmen & Komplexität'},
  {id: 'daten',      icon: '🧱', name: 'Datenstrukturen'},
  {id: 'ki',         icon: '🤖', name: 'Künstliche Intelligenz'},
  {id: 'technik',    icon: '🔦', name: 'Technische Informatik'},
  {id: 'oop',        icon: '🔧', name: 'Programmierparadigmen & OOP'},
  {id: 'netze',      icon: '📡', name: 'Rechnernetze'},
  {id: 'automaten',  icon: '⚙️', name: 'Sprachen & Automaten'},
  {id: 'datenbank',  icon: '🗄️', name: 'Datenmanagement'},
  {id: 'sicherheit', icon: '🔐', name: 'Informationssicherheit'},
].filter((b) => window.KURS && window.KURS[b.id])
 .map((b) => Object.assign(b, {stufe: window.KURS[b.id].stufe, fragen: window.KURS[b.id].fragen}));
