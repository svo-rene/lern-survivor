// Prüfskript für die Fragen (Windows-Skripthost, ES3-Stil, kein Node nötig):
//   cscript //nologo tools\lint.js kurs\technik.js [bericht.txt]
// Prüft: Länge der richtigen Antwort (Ziel: höchstens 30 % der Fragen mit der längsten Antwort richtig, je Datei und je Stufe),
// doppelte Antworten, Anzahl Antworten, fehlende Felder. Schreibt eine Liste der auffälligen Fragen (UTF-8).
var fso = new ActiveXObject('Scripting.FileSystemObject');
function readUtf8(p) { var s = new ActiveXObject('ADODB.Stream'); s.Type = 2; s.Charset = 'utf-8'; s.Open(); s.LoadFromFile(fso.GetAbsolutePathName(p)); var t = s.ReadText(); s.Close(); return t; }
function writeUtf8(p, t) { var s = new ActiveXObject('ADODB.Stream'); s.Type = 2; s.Charset = 'utf-8'; s.Open(); s.WriteText(t); s.SaveToFile(fso.GetAbsolutePathName(p), 2); s.Close(); }
var window = {};
eval(readUtf8(WScript.Arguments(0)));
var out = [], id = null, k;
for (k in window.KURS) id = k;
var F = window.KURS[id].fragen; while (F.length && F[F.length - 1] === undefined) F.length--;   // Komma am Ende zählt im alten Skripthost als Eintrag
var n = F.length, i, j, longest = 0, byD = {1: [0, 0], 2: [0, 0], 3: [0, 0]}, bad = [], problems = [];
for (i = 0; i < n; i++) {
  var f = F[i], a = f.a, L = [], mx = 0, cnt = 0, sumW = 0;
  if (!f.q || !f.e || !f.src || !f.d || !a || a.length !== 4) { problems.push('#' + i + ' Feld fehlt oder nicht 4 Antworten'); continue; }
  function txt(x) { return (typeof x === 'object') ? 'BILD:' + x.alt : String(x); }
  for (j = 0; j < 4; j++) { L[j] = txt(a[j]).length; if (L[j] > mx) mx = L[j]; }
  for (j = 0; j < 4; j++) { if (L[j] === mx) cnt++; if (j > 0) sumW += L[j]; }
  for (j = 1; j < 4; j++) if (txt(a[j]) === txt(a[0])) problems.push('#' + i + ' doppelte Antwort');
  var isLong = (L[0] === mx && cnt === 1), ratio = L[0] / (sumW / 3);
  byD[f.d][0]++;
  if (isLong) { longest++; byD[f.d][1]++; if (ratio > 1.15) bad.push('#' + i + ' (d' + f.d + ', richtig ' + L[0] + ' Zeichen, falsche im Schnitt ' + Math.round(sumW / 3) + '): ' + String(f.q).replace(/\n/g, ' ').substring(0, 70)); }
}
out.push(id + ': ' + n + ' Fragen, richtige Antwort ist die längste bei ' + Math.round(100 * longest / n) + ' % (Ziel ≤ 30 %, Zufall 25 %)');
for (j = 1; j <= 3; j++) out.push('  Stufe ' + j + ': ' + byD[j][1] + ' von ' + byD[j][0] + ' = ' + (byD[j][0] ? Math.round(100 * byD[j][1] / byD[j][0]) : 0) + ' %');
if (problems.length) out.push('PROBLEME:\n  ' + problems.join('\n  '));
out.push('Auffällig (längste Antwort ist richtig und > 15 % länger als der Schnitt der falschen): ' + bad.length + '\n  ' + bad.join('\n  '));
var text = out.join('\n');
if (WScript.Arguments.length > 1) writeUtf8(WScript.Arguments(1), text);
WScript.Echo(out.slice(0, 4).join('\n').replace(/[^\x00-\x7e]/g, '?'));
