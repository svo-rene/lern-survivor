// Lernbereiche = Fragensammlungen. Neue Fächer: einfach einen weiteren Eintrag anhängen.
// Format je Frage: d = Schwierigkeit 1–3, q = Frage (`code` in Backticks),
// a = Antworten – die ERSTE ist immer die richtige (wird im Spiel gemischt), e = kurze Erklärung.
// Mehrzeiliger Code: C('zeile 1', 'zeile 2', …) – wird als Codeblock angezeigt.
const C = (...lines) => '\n`' + lines.join('\n') + '`';
window.LERNBEREICHE = [
{
  id: 'algo', icon: '📊', name: 'Algorithmen, Sortieren & Komplexität', stufe: 'Informatik Leistungskurs',
  fragen: [
    // ---------- Stufe 1: Grundbegriffe ----------
    {d:1, q:'Wie ist die Laufzeit von Bubblesort im schlechtesten Fall?', a:['O(n²)','O(n)','O(n log n)','O(log n)'], e:'Zwei verschachtelte Schleifen über die Liste: etwa n·n Vergleiche.'},
    {d:1, q:'Was muss für die binäre Suche gelten?', a:['Die Liste ist sortiert.','Die Liste hat gerade Länge.','Alle Werte sind verschieden.','Die Liste ist kürzer als 1000.'], e:'Nur in einer sortierten Liste weiß man nach einem Vergleich, in welcher Hälfte man weitersuchen muss.'},
    {d:1, q:'Was bedeutet O(1)?', a:['Die Laufzeit hängt nicht von n ab.','Der Algorithmus braucht genau 1 Schritt.','Die Laufzeit wächst linear.','Der Algorithmus ist fehlerfrei.'], e:'Konstante Laufzeit: egal wie groß die Eingabe ist, der Aufwand bleibt gleich (z. B. Zugriff auf liste[i]).'},
    {d:1, q:'Laufzeit der linearen Suche im schlechtesten Fall?', a:['O(n)','O(1)','O(log n)','O(n²)'], e:'Im schlechtesten Fall wird jedes der n Elemente einmal angeschaut.'},
    {d:1, q:'Welcher Algorithmus teilt die Liste in Hälften und fügt die sortierten Hälften wieder zusammen?', a:['Mergesort','Bubblesort','Selectionsort','Lineare Suche'], e:'Mergesort = Teile und herrsche: teilen, rekursiv sortieren, mischen (merge).'},
    {d:1, q:'Wie arbeitet Selectionsort?', a:['Sucht jeweils das Minimum im Rest und tauscht es nach vorn.','Vertauscht nur benachbarte Elemente.','Fügt jedes Element in den sortierten Teil ein.','Teilt die Liste an einem Pivot.'], e:'Selection = Auswahl: in jedem Durchlauf das kleinste Element auswählen und an die nächste Stelle tauschen.'},
    {d:1, q:'Wie arbeitet Insertionsort?', a:['Fügt das nächste Element an die richtige Stelle im bereits sortierten Teil ein.','Sucht jeweils das Maximum.','Mischt zwei sortierte Listen.','Vertauscht zufällige Paare.'], e:'Wie beim Sortieren von Spielkarten auf der Hand: Karte für Karte einsortieren.'},
    {d:1, q:'Laufzeit der binären Suche im schlechtesten Fall?', a:['O(log n)','O(n)','O(1)','O(n log n)'], e:'Jeder Vergleich halbiert den Suchbereich – nach log₂(n) Schritten bleibt ein Element.'},
    {d:1, q:'Welche Funktion wächst am schnellsten?', a:['2ⁿ','n³','n log n','n²'], e:'Exponentielles Wachstum schlägt jedes Polynom, wenn n groß genug ist.'},
    {d:1, q:'Was steht nach dem ersten Durchlauf von Bubblesort (aufsteigend) sicher am Ende?', a:['Das größte Element','Das kleinste Element','Das mittlere Element','Nichts Sicheres'], e:'Das größte Element „blubbert“ bei jedem Vergleich mit nach hinten.'},
    {d:1, q:'Was ist ein Algorithmus?', a:['Eine eindeutige, endliche Folge von Schritten zur Lösung eines Problems.','Ein Programm in Python.','Eine besonders schnelle Rechenmaschine.','Eine Datenstruktur für Listen.'], e:'Wichtige Eigenschaften: eindeutig, endlich beschreibbar, ausführbar, terminiert (meist).'},
    {d:1, q:'Was bedeutet „in-place“ bei einem Sortierverfahren?', a:['Es braucht (fast) keinen zusätzlichen Speicher.','Es sortiert nur Teile der Liste.','Es ist immer stabil.','Es läuft in O(n).'], e:'In-place sortiert direkt in der Liste, z. B. Bubble-, Selection-, Insertion-, Heapsort.'},

    // ---------- Stufe 2: Anwenden & Nachvollziehen ----------
    {d:2, q:'Laufzeit von Mergesort im schlechtesten Fall?', a:['O(n log n)','O(n²)','O(n)','O(log n)'], e:'log n Teilungsebenen, auf jeder Ebene insgesamt n Arbeit beim Mischen.'},
    {d:2, q:'Laufzeit von Quicksort im schlechtesten Fall?', a:['O(n²)','O(n log n)','O(n)','O(2ⁿ)'], e:'Wenn das Pivot immer das kleinste/größte Element ist, wird die Liste nur um 1 kürzer.'},
    {d:2, q:'Laufzeit von Quicksort im Durchschnitt?', a:['O(n log n)','O(n²)','O(log n)','O(n)'], e:'Bei halbwegs guten Pivots entstehen etwa gleich große Teile – wie bei Mergesort.'},
    {d:2, q:'Laufzeit von Insertionsort auf einer bereits sortierten Liste?', a:['O(n)','O(n²)','O(n log n)','O(1)'], e:'Jedes Element wird nur einmal mit seinem Vorgänger verglichen und bleibt stehen.'},
    {d:2, q:'Welches Verfahren ist (in der üblichen Form) stabil?', a:['Mergesort','Selectionsort','Heapsort','Quicksort'], e:'Stabil = gleiche Schlüssel behalten ihre Reihenfolge. Mergesort nimmt bei Gleichstand das linke Element zuerst.'},
    {d:2, q:'Wie viel zusätzlichen Speicher braucht Mergesort (Array-Version)?', a:['O(n)','O(1)','O(log n)','O(n²)'], e:'Beim Mischen wird eine Hilfsliste der Länge n gebraucht.'},
    {d:2, q:'Binäre Suche in 1 000 000 sortierten Zahlen: etwa wie viele Vergleiche höchstens?', a:['20','1000','500 000','100'], e:'2²⁰ ≈ 1 048 576, also reichen etwa 20 Halbierungen.'},
    {d:2, q:'Bubblesort auf `[5, 1, 4, 2]`: Wie sieht die Liste nach dem 1. Durchlauf aus?', a:['[1, 4, 2, 5]','[1, 2, 4, 5]','[1, 5, 4, 2]','[1, 4, 5, 2]'], e:'5↔1 → [1,5,4,2], 5↔4 → [1,4,5,2], 5↔2 → [1,4,2,5].'},
    {d:2, q:'Selectionsort auf `[4, 3, 1, 2]`: Liste nach dem 1. Tausch?', a:['[1, 3, 4, 2]','[1, 4, 3, 2]','[3, 4, 1, 2]','[1, 2, 3, 4]'], e:'Minimum 1 wird mit dem ersten Element 4 getauscht.'},
    {d:2, q:'Insertionsort auf `[3, 1, 2]`: Liste, nachdem das 2. Element eingefügt wurde?', a:['[1, 3, 2]','[1, 2, 3]','[3, 1, 2]','[2, 1, 3]'], e:'Die 1 wird vor die 3 geschoben, die 2 ist noch nicht dran.'},
    {d:2, q:'Ein O(n²)-Algorithmus braucht für n Elemente 1 s. Ungefähr wie lange für 2n?', a:['4 s','2 s','8 s','1 s'], e:'(2n)² = 4n² – viermal so viel Arbeit.'},
    {d:2, q:'Woher kommt das „log n“ in der Laufzeit von Mergesort?', a:['Von der Anzahl der Halbierungsebenen.','Vom Mischen zweier Listen.','Von der Rekursion an sich.','Vom Vergleich zweier Zahlen.'], e:'n kann log₂(n)-mal halbiert werden, bis Teillisten der Länge 1 entstehen.'},
    {d:2, q:'Was ist bei Quicksort das Pivot?', a:['Das Vergleichselement, nach dem die Liste aufgeteilt wird.','Das kleinste Element.','Die Mitte der Liste nach dem Sortieren.','Ein Zähler für die Vergleiche.'], e:'Links landen kleinere, rechts größere Elemente als das Pivot.'},
    {d:2, q:'Was misst man bei Sortierverfahren meist als Aufwand?', a:['Vergleiche und Vertauschungen','Die Zeilenanzahl des Codes','Die Anzahl der Variablen','Die Sekunden auf dem eigenen PC'], e:'Diese Operationen hängen von n ab und sind unabhängig vom Rechner.'},
    {d:2, q:'Laufzeit von `for i in range(n):` mit darin `for j in range(n):`?', a:['O(n²)','O(n)','O(2n)','O(n log n)'], e:'Für jedes i läuft j n-mal: n·n.'},

    // ---------- Stufe 3: Analysieren & Begründen ----------
    {d:3, q:'Untere Schranke für vergleichsbasiertes Sortieren (schlechtester Fall)?', a:['Ω(n log n)','Ω(n)','Ω(n²)','Ω(log n)'], e:'Es gibt n! Anordnungen, ein Entscheidungsbaum braucht Höhe log₂(n!) ≈ n log n.'},
    {d:3, q:'Laufzeit von Countingsort (Werte 0 … k)?', a:['O(n + k)','O(n log n)','O(n²)','O(k²)'], e:'Kein Vergleichen: Häufigkeiten zählen (n), dann Werte ausgeben (k). So schlägt es n log n.'},
    {d:3, q:'Welche Laufzeit hat T(n) = 2·T(n/2) + n?', a:['O(n log n)','O(n)','O(n²)','O(log n)'], e:'Das ist Mergesort: log n Ebenen mit je n Arbeit.'},
    {d:3, q:'Welche Laufzeit hat T(n) = T(n/2) + 1?', a:['O(log n)','O(n)','O(1)','O(n log n)'], e:'Das ist binäre Suche: jeder Schritt halbiert, Arbeit 1 pro Ebene.'},
    {d:3, q:'Welches Verfahren ist O(n log n) im schlechtesten Fall UND in-place?', a:['Heapsort','Mergesort','Quicksort','Insertionsort'], e:'Heapsort baut einen Heap im Array selbst; Mergesort braucht O(n) extra, Quicksort ist im worst case O(n²).'},
    {d:3, q:'Quicksort mit Pivot = erstes Element: Welche Eingabe ist am schlechtesten?', a:['Eine bereits sortierte Liste','Eine zufällige Liste','Eine Liste mit lauter verschiedenen Zahlen','Eine sehr kurze Liste'], e:'Das Pivot ist dann immer das Minimum, ein Teil bleibt leer → n² Vergleiche.'},
    {d:3, q:'f(n) = 3n² + 100n + 5 liegt in …', a:['O(n²)','O(n)','O(100n)','O(n³) und sonst nichts'], e:'Für große n dominiert der höchste Term, Konstanten fallen weg.'},
    {d:3, q:'Gilt n·log n ∈ O(n²)?', a:['Ja','Nein','Nur für kleine n','Nur bei Logarithmus zur Basis 2'], e:'O ist eine obere Schranke: n log n wächst nicht schneller als n².'},
    {d:3, q:'Wie viele Vergleiche macht Bubblesort ohne vorzeitigen Abbruch bei n = 5, wenn jeder Durchlauf einen Vergleich weniger macht?', a:['10','25','5','20'], e:'4 + 3 + 2 + 1 = n(n−1)/2 = 10.'},
    {d:3, q:'Laufzeit: `for i in range(n):` darin `j = 1` und `while j < n: j = j * 2`?', a:['O(n log n)','O(n²)','O(n)','O(log n)'], e:'Die innere Schleife verdoppelt j: log n Schritte – und das n-mal.'},
    {d:3, q:'Wann ist Stabilität beim Sortieren wichtig?', a:['Wenn man nacheinander nach mehreren Schlüsseln sortiert.','Wenn die Liste sehr groß ist.','Wenn nur Zahlen sortiert werden.','Wenn der Speicher knapp ist.'], e:'Erst nach Name, dann stabil nach Kurs sortieren → innerhalb eines Kurses bleibt die Namensreihenfolge.'},
    {d:3, q:'Laufzeit: `for i in range(n):` darin `for j in range(i):`?', a:['O(n²)','O(n log n)','O(n)','O(i·n)'], e:'0 + 1 + … + (n−1) = n(n−1)/2 – das ist immer noch quadratisch.'},
    {d:3, q:'Warum ist Insertionsort für fast sortierte Listen gut?', a:['Jedes Element muss nur wenige Plätze verschoben werden.','Es benutzt ein Pivot.','Es teilt die Liste in Hälften.','Es braucht keine Vergleiche.'], e:'Die Laufzeit ist O(n + Anzahl der Fehlstände) – fast sortiert = fast linear.'},
  ]
},
{
  id: 'python', icon: '🐍', name: 'Python-Grundlagen', stufe: 'Informatik LK · Variablen, Kontrollstrukturen, Funktionen',
  fragen: [
    // ---------- Stufe 1 ----------
    {d:1, q:'Was wird ausgegeben?' + C('x = 5', 'x = x + 2', 'print(x)'), a:['7','5','x + 2','52'], e:'Rechts wird zuerst ausgerechnet (5 + 2), dann wird das Ergebnis in x gespeichert.'},
    {d:1, q:'Welchen Datentyp hat `3.0`?', a:['float','int','str','bool'], e:'Zahlen mit Dezimalpunkt sind Gleitkommazahlen (float).'},
    {d:1, q:'Was ergibt `7 // 2`?', a:['3','3.5','4','1'], e:'`//` ist die ganzzahlige Division: der Rest fällt weg.'},
    {d:1, q:'Was ergibt `7 % 3`?', a:['1','2','2.33','0'], e:'`%` liefert den Rest: 7 = 2·3 + 1.'},
    {d:1, q:'Was ergibt `"3" + "4"`?', a:['"34"','7','"7"','Fehler'], e:'Bei Zeichenketten (str) hängt `+` die Texte aneinander.'},
    {d:1, q:'Wie oft läuft `for i in range(5):`?', a:['5-mal','4-mal','6-mal','unendlich oft'], e:'range(5) liefert 0, 1, 2, 3, 4 – das sind 5 Werte.'},
    {d:1, q:'Welche Werte liefert `range(2, 6)`?', a:['2, 3, 4, 5','2, 3, 4, 5, 6','3, 4, 5, 6','2, 6'], e:'Der Startwert ist dabei, der Endwert nicht.'},
    {d:1, q:'Was ist der Unterschied zwischen `=` und `==`?', a:['`=` weist zu, `==` vergleicht.','`=` vergleicht, `==` weist zu.','Beide bedeuten dasselbe.','`==` ist nur für Texte.'], e:'`x = 3` speichert 3 in x, `x == 3` fragt: ist x gleich 3? (True/False)'},
    {d:1, q:'Wie definiert man in Python eine Funktion?', a:['`def name():`','`function name():`','`def name:`','`func name()`'], e:'Schlüsselwort def, Name, runde Klammern, Doppelpunkt – dann eingerückt der Körper.'},
    {d:1, q:'Wozu dient die Einrückung in Python?', a:['Sie legt fest, welche Zeilen zu einem Block gehören.','Nur zur Schönheit, Python ignoriert sie.','Sie macht den Code schneller.','Sie markiert Kommentare.'], e:'Alles, was gleich weit eingerückt unter if/for/def steht, gehört zu diesem Block.'},
    {d:1, q:'Was wird ausgegeben?' + C('x = 2', 'if x > 3:', '    print("A")', 'else:', '    print("B")'), a:['B','A','A und B','Nichts'], e:'2 > 3 ist False, also läuft der else-Zweig.'},
    {d:1, q:'Was ergibt `5 > 3 and 2 > 4`?', a:['False','True','5','Fehler'], e:'and ist nur True, wenn beide Seiten True sind – 2 > 4 ist False.'},
    {d:1, q:'Welche Schleife wiederholt, solange eine Bedingung wahr ist?', a:['while','for','if','def'], e:'while prüft vor jedem Durchlauf die Bedingung.'},
    {d:1, q:'Was ergibt `len("Hallo")`?', a:['5','4','6','"Hallo"'], e:'len zählt die Zeichen: H-a-l-l-o.'},

    // ---------- Stufe 2 ----------
    {d:2, q:'Was wird ausgegeben?' + C('s = 0', 'for i in range(4):', '    s = s + i', 'print(s)'), a:['6','10','4','0'], e:'0 + 1 + 2 + 3 = 6.'},
    {d:2, q:'Was wird ausgegeben?' + C('n = 10', 'while n > 3:', '    n = n - 3', 'print(n)'), a:['1','4','3','-2'], e:'10 → 7 → 4 → 1. Bei 1 ist n > 3 falsch, die Schleife endet.'},
    {d:2, q:'Was ist ein Parameter, was ein Argument?', a:['Parameter steht in der Definition, Argument wird beim Aufruf übergeben.','Beides ist dasselbe.','Argument steht in der Definition, Parameter beim Aufruf.','Parameter sind nur Zahlen.'], e:'`def f(a):` – a ist der Parameter. `f(5)` – 5 ist das Argument.'},
    {d:2, q:'Was wird ausgegeben?' + C('def f(a, b=2):', '    return a * b', 'print(f(3))'), a:['6','3','5','Fehler'], e:'b hat den Standardwert 2, wenn man nichts übergibt: 3 · 2.'},
    {d:2, q:'Was gibt eine Funktion ohne `return` zurück?', a:['None','0','""','Einen Fehler'], e:'Ohne return liefert jede Funktion automatisch None.'},
    {d:2, q:'Was wird ausgegeben?' + C('def verdopple(x):', '    x = x * 2', '', 'zahl = 5', 'verdopple(zahl)', 'print(zahl)'), a:['5','10','None','Fehler'], e:'x ist lokal. `x = x * 2` bindet nur den lokalen Namen x neu, und die Funktion gibt nichts zurück – zahl bleibt 5.'},
    {d:2, q:'Was ist eine lokale Variable?', a:['Sie existiert nur innerhalb der Funktion, solange diese läuft.','Sie gilt im ganzen Programm.','Sie kann nicht verändert werden.','Sie wird mit `local` angelegt.'], e:'Variablen, die in einer Funktion zugewiesen werden, sind dort lokal.'},
    {d:2, q:'Was wird ausgegeben?' + C('x = 1', 'def f():', '    x = 5', 'f()', 'print(x)'), a:['1','5','None','Fehler'], e:'x = 5 legt in f eine neue lokale Variable an. Das globale x bleibt 1.'},
    {d:2, q:'Was ist der Unterschied zwischen `print` und `return`?', a:['return gibt den Wert an den Aufrufer zurück, print zeigt ihn nur an.','Beide geben den Wert zurück.','print beendet die Funktion, return nicht.','return zeigt den Wert auf dem Bildschirm an.'], e:'Mit dem Rückgabewert kann man weiterrechnen: `y = f(3)`.'},
    {d:2, q:'Wie oft wird `*` ausgegeben?' + C('for i in range(3):', '    for j in range(2):', '        print("*")'), a:['6','5','3','2'], e:'Für jedes der 3 i läuft j 2-mal: 3 · 2 = 6.'},
    {d:2, q:'Was bewirkt `break` in einer Schleife?', a:['Beendet die Schleife sofort.','Überspringt nur den aktuellen Durchlauf.','Beendet das ganze Programm.','Startet die Schleife neu.'], e:'Weiter geht es mit der ersten Zeile nach der Schleife. (continue springt nur zum nächsten Durchlauf.)'},
    {d:2, q:'Was wird ausgegeben?' + C('x = 15', 'if x > 10:', '    print("A")', 'elif x > 5:', '    print("B")', 'else:', '    print("C")'), a:['A','A und B','B','C'], e:'Bei if/elif/else läuft nur der erste passende Zweig.'},
    {d:2, q:'`l = [4, 7, 1]` – was ist `l[1]`?', a:['7','4','1','Fehler'], e:'Python zählt ab 0: l[0] = 4, l[1] = 7.'},
    {d:2, q:'Welche Werte liefert `range(10, 0, -3)`?', a:['10, 7, 4, 1','10, 7, 4, 1, -2','9, 6, 3, 0','10, 7, 4'], e:'Start 10, Schritt −3, die 0 selbst ist nicht mehr dabei.'},
    {d:2, q:'Was ergibt `7 / 7`?', a:['1.0','1','7','Fehler'], e:'`/` liefert in Python immer eine Gleitkommazahl (float).'},

    // ---------- Stufe 3 ----------
    {d:3, q:'Was wird ausgegeben?' + C('x = 1', 'def f():', '    global x', '    x = x + 1', 'f()', 'f()', 'print(x)'), a:['3','1','2','Fehler'], e:'Mit global arbeitet f am globalen x: 1 → 2 → 3.'},
    {d:3, q:'Was passiert?' + C('x = 10', 'def f():', '    print(x)', '    x = 5', 'f()'), a:['Fehler (UnboundLocalError)','10','5','None'], e:'Weil x in f zugewiesen wird, ist x dort lokal – und wird vor der Zuweisung gelesen.'},
    {d:3, q:'Was wird ausgegeben?' + C('def add(l):', '    l.append(1)', '', 'a = []', 'add(a)', 'add(a)', 'print(a)'), a:['[1, 1]','[]','[1]','Fehler'], e:'Die Liste wird nicht kopiert: l und a sind dieselbe Liste. append verändert sie.'},
    {d:3, q:'Was wird ausgegeben?' + C('z = 0', 'for i in range(1, 6):', '    if i % 2 == 0:', '        continue', '    z = z + i', 'print(z)'), a:['9','15','6','5'], e:'continue überspringt die geraden Zahlen: 1 + 3 + 5 = 9.'},
    {d:3, q:'Was passiert?' + C('x = 0', 'if x != 0 and 10 / x > 1:', '    print("groß")'), a:['Nichts, kein Fehler.','ZeroDivisionError','Es wird „groß“ ausgegeben.','SyntaxError'], e:'and bricht ab, sobald die linke Seite False ist – 10 / x wird gar nicht berechnet.'},
    {d:3, q:'Welche Aussage stimmt?', a:['Ohne `global` erzeugt eine Zuweisung in einer Funktion eine neue lokale Variable.','Funktionen können globale Variablen nie lesen.','Lokale Variablen bleiben nach dem Aufruf erhalten.','`global` macht eine Variable unveränderlich.'], e:'Lesen geht ohne global, aber Zuweisen erzeugt sonst eine lokale Variable.'},
    {d:3, q:'Was bewirkt `a, b = b, a`?', a:['a und b werden vertauscht.','Beide bekommen den Wert von b.','Beide bekommen den Wert von a.','Fehler'], e:'Rechts wird zuerst das Paar (b, a) gebildet, dann verteilt.'},
    {d:3, q:'Was passiert bei `maximum([])`?' + C('def maximum(l):', '    m = l[0]', '    for x in l:', '        if x > m:', '            m = x', '    return m'), a:['Fehler (IndexError)','Es wird 0 zurückgegeben.','Es wird None zurückgegeben.','Endlosschleife'], e:'Eine leere Liste hat kein l[0]. Randfälle immer mitdenken!'},
    {d:3, q:'Was wird ausgegeben?' + C('def finde(l, z):', '    for i in range(len(l)):', '        if l[i] == z:', '            return i', '    return -1', '', 'print(finde([5, 3, 5], 5))'), a:['0','2','[0, 2]','-1'], e:'return beendet die Funktion beim ersten Treffer – an Index 0.'},
    {d:3, q:'Was wird ausgegeben?' + C('def f(x):', '    if x > 0:', '        return "positiv"', '', 'print(f(-2))'), a:['None','"positiv"','-2','Fehler'], e:'Für x ≤ 0 erreicht die Funktion kein return – sie liefert dann None.'},

    // ---------- Listen: Summe, Durchschnitt, Maximum, Zählen ----------
    {d:1, q:'`l = [3, 8, 2]` – was ergibt `len(l)`?', a:['3','2','8','13'], e:'len zählt die Elemente der Liste.'},
    {d:1, q:'Was wird ausgegeben?' + C('l = [1, 2]', 'l.append(5)', 'print(l)'), a:['[1, 2, 5]','[5, 1, 2]','[1, 2]','[6, 7]'], e:'append hängt ein Element hinten an die Liste an.'},
    {d:1, q:'Was wird ausgegeben?' + C('for x in [4, 7, 1]:', '    print(x)'), a:['4, 7, 1 (untereinander)','0, 1, 2','[4, 7, 1]','3'], e:'for x in liste geht die Elemente selbst der Reihe nach durch.'},
    {d:2, q:'`l = [4, 7, 1]` – was ist `l[-1]`?', a:['1','4','7','Fehler'], e:'Negative Indizes zählen von hinten: l[-1] ist das letzte Element.'},
    {d:2, q:'Was wird ausgegeben?' + C('l = [2, 5, 3]', 's = 0', 'for x in l:', '    s = s + x', 'print(s)'), a:['10','3','5','0'], e:'Summe aufbauen: 0 → 2 → 7 → 10.'},
    {d:2, q:'Was wird ausgegeben?' + C('l = [4, 6, 8]', 's = 0', 'for x in l:', '    s = s + x', 'print(s / len(l))'), a:['6.0','18','6','3'], e:'Durchschnitt = Summe / Anzahl = 18 / 3. Mit / entsteht immer ein float.'},
    {d:2, q:'Welche Bedingung fehlt, damit `m` am Ende das Maximum ist?' + C('m = l[0]', 'for x in l:', '    if ___:', '        m = x'), a:['`x > m`','`x < m`','`m > x`','`x == m`'], e:'Nur wenn ein Element größer ist als das bisher größte, wird es das neue Maximum.'},
    {d:2, q:'Was wird ausgegeben?' + C('l = [5, 2, 8, 2, 2]', 'n = 0', 'for x in l:', '    if x == 2:', '        n = n + 1', 'print(n)'), a:['3','2','6','5'], e:'Zählen mit Bedingung: n wächst nur bei den drei Zweien.'},
    {d:2, q:'Was wird ausgegeben?' + C('l = [1, 2, 3]', 'for i in range(len(l)):', '    l[i] = l[i] * 2', 'print(l)'), a:['[2, 4, 6]','[1, 2, 3]','[1, 2, 3, 1, 2, 3]','Fehler'], e:'Über den Index i wird jedes Element in der Liste selbst überschrieben.'},
    {d:3, q:'Was wird ausgegeben?' + C('l = [1, 2, 3]', 'for x in l:', '    x = x * 2', 'print(l)'), a:['[1, 2, 3]','[2, 4, 6]','[1, 2, 3, 2, 4, 6]','Fehler'], e:'x ist nur eine Variable mit dem Wert des Elements – die Liste selbst ändert sich nicht.'},
    {d:3, q:'Was wird ausgegeben?' + C('def minimum(l):', '    m = 0', '    for x in l:', '        if x < m:', '            m = x', '    return m', '', 'print(minimum([5, 3, 8]))'), a:['0','3','5','8'], e:'Fehler im Algorithmus: Der Startwert 0 ist kleiner als alle Elemente. Richtig: m = l[0].'},
    {d:3, q:'Was wird ausgegeben?' + C('l = [1, 2, 4]', 'print(sum(l) // len(l))'), a:['2','2.33','7','3'], e:'7 // 3 = 2 – mit // geht der Nachkommateil verloren. Für den echten Durchschnitt: /.'},
    {d:3, q:'Was wird ausgegeben (Position des Maximums)?' + C('l = [4, 9, 2, 9]', 'p = 0', 'for i in range(len(l)):', '    if l[i] > l[p]:', '        p = i', 'print(p)'), a:['1','3','9','0'], e:'Bei > bleibt die erste 9 (Index 1) stehen, die zweite ist nicht größer.'},
  ]
},
{
  id: 'daten', icon: '🧱', name: 'Datenstrukturen', stufe: 'Informatik LK · Feld, verkettete Liste, Stapel, Schlange, Baum',
  fragen: [
    // ---------- Stufe 1 ----------
    {d:1, q:'Nach welchem Prinzip arbeitet ein Stapel (Stack)?', a:['LIFO – last in, first out','FIFO – first in, first out','Zufällig','Nach Größe sortiert'], e:'Wie ein Tellerstapel: Was zuletzt drauf kam, wird zuerst wieder genommen.'},
    {d:1, q:'Nach welchem Prinzip arbeitet eine Schlange (Queue)?', a:['FIFO – first in, first out','LIFO – last in, first out','Zufällig','Nach Größe sortiert'], e:'Wie eine Warteschlange an der Kasse: Wer zuerst kommt, ist zuerst dran.'},
    {d:1, q:'Wo steckt ein Stapel dahinter?', a:['Rückgängig (Strg+Z)','Druckerwarteschlange','Kasse im Supermarkt','Telefonbuch'], e:'Die letzte Aktion wird zuerst rückgängig gemacht – LIFO.'},
    {d:1, q:'Wo steckt eine Schlange dahinter?', a:['Druckerwarteschlange','Rückgängig (Strg+Z)','Zurück-Knopf im Browser','Tellerstapel'], e:'Druckaufträge werden in der Reihenfolge abgearbeitet, in der sie ankamen – FIFO.'},
    {d:1, q:'Wie heißen die beiden Grundoperationen eines Stapels?', a:['push und pop','enqueue und dequeue','insert und delete','first und last'], e:'push legt oben drauf, pop nimmt oben weg. (enqueue/dequeue gehören zur Schlange.)'},
    {d:1, q:'Wie greift man bei einem Feld (Array) auf das i-te Element zu?', a:['Direkt über den Index, z. B. `a[i]`','Man muss vom Anfang aus durchzählen.','Nur das erste Element ist erreichbar.','Über einen Verweis des Vorgängers.'], e:'Felder liegen am Stück im Speicher – die Adresse von a[i] lässt sich direkt ausrechnen.'},
    {d:1, q:'Was ist typisch für ein Feld (Array)?', a:['Feste Größe, Elemente gleichen Typs','Wächst automatisch, beliebige Typen','Elemente sind über Verweise verbunden','Es hat eine Wurzel'], e:'Klassisch wird ein Feld mit fester Länge angelegt. (Python-Listen sind flexibler.)'},
    {d:1, q:'Was enthält ein Knoten einer einfach verketteten Liste?', a:['Einen Wert und einen Verweis auf den nächsten Knoten','Nur einen Wert','Einen Index','Verweise auf alle anderen Knoten'], e:'Wert + next: So hängt Knoten an Knoten wie Glieder einer Kette.'},
    {d:1, q:'Wie heißt der oberste Knoten eines Baums, der keinen Elternknoten hat?', a:['Wurzel','Blatt','Ast','Kopf'], e:'Von der Wurzel aus erreicht man jeden anderen Knoten.'},
    {d:1, q:'Wie heißt ein Knoten ohne Kinder?', a:['Blatt','Wurzel','Innerer Knoten','Elternknoten'], e:'Blätter stehen „ganz unten“ im Baum.'},
    {d:1, q:'Welches Beispiel ist eine Baumstruktur?', a:['Ordner und Unterordner auf dem Computer','Eine Warteschlange','Ein Tellerstapel','Eine Einkaufsliste'], e:'Jeder Ordner liegt in genau einem übergeordneten Ordner – bis hoch zum Laufwerk (Wurzel).'},

    // ---------- Stufe 2 ----------
    {d:2, q:'Ein leerer Stapel: `push(1)`, `push(2)`, `pop()`, `push(3)`, `push(4)`, `pop()`, `pop()`. Was wird als Letztes entfernt?', a:['3','4','1','2'], e:'[1,2] → pop 2 → [1,3,4] → pop 4 → pop 3. Übrig bleibt [1].'},
    {d:2, q:'Eine leere Schlange: `enqueue(A)`, `enqueue(B)`, `dequeue()`, `enqueue(C)`, `dequeue()`. Was wird beim 2. `dequeue()` entfernt?', a:['B','A','C','Nichts'], e:'A geht zuerst, dann B. Übrig bleibt C.'},
    {d:2, q:'Was wird ausgegeben?' + C('s = []', 's.append(1)', 's.append(2)', 's.append(3)', 'print(s.pop())'), a:['3','1','[1, 2]','2'], e:'Eine Python-Liste als Stapel: append = push, pop() nimmt das letzte Element.'},
    {d:2, q:'Was wird ausgegeben?' + C('q = [1, 2, 3]', 'q.append(4)', 'print(q.pop(0))'), a:['1','4','3','[2, 3, 4]'], e:'Liste als Schlange: hinten anstellen (append), vorne entnehmen (pop(0)).'},
    {d:2, q:'Ein Feld hat n Elemente. Was kostet es, vorne ein neues einzufügen?', a:['O(n) – alle Elemente rücken eins nach hinten.','O(1) – es geht sofort.','O(log n)','O(n²)'], e:'Im Feld liegen die Elemente lückenlos hintereinander, also muss Platz geschaffen werden.'},
    {d:2, q:'Was kostet es, in einer verketteten Liste vorne einen Knoten einzufügen?', a:['O(1) – neuer Knoten zeigt auf den alten Kopf.','O(n) – alle Knoten rücken nach hinten.','O(log n)','Geht gar nicht.'], e:'Nur zwei Verweise ändern: neu.next = kopf, kopf = neu.'},
    {d:2, q:'Wie kommt man in einer verketteten Liste an das 5. Element?', a:['Vom Kopf aus 4-mal dem Verweis `next` folgen.','Direkt über den Index.','Vom Ende rückwärts laufen.','Mit binärer Suche.'], e:'Es gibt keinen direkten Zugriff – Zugriff auf Position k kostet O(k).'},
    {d:2, q:'Woran erkennt man das Ende einer einfach verketteten Liste?', a:['Der Verweis `next` des letzten Knotens ist `None`.','Der Wert ist 0.','Der letzte Knoten zeigt auf den Kopf.','Am Index -1.'], e:'None heißt: Hier kommt nichts mehr.'},
    {d:2, q:'Wie viele Kanten hat ein Baum mit n Knoten?', a:['n − 1','n','n + 1','2n'], e:'Jeder Knoten außer der Wurzel hängt an genau einer Kante zu seinem Elternknoten.'},
    {d:2, q:'Welche Höhe hat der Baum (Anzahl Kanten auf dem längsten Weg von der Wurzel zu einem Blatt)?' + C('    A', '   / \\', '  B   C', '  |', '  D', '  |', '  E'), a:['3','4','2','5'], e:'Längster Weg: A–B–D–E, das sind 3 Kanten.'},
    {d:2, q:'Welche Knoten sind Blätter?' + C('    A', '   / \\', '  B   C', '  |', '  D', '  |', '  E'), a:['C und E','nur E','A und E','B, C und D'], e:'Blätter haben keine Kinder: C und E.'},
    {d:2, q:'Ordner „Schule“ enthält „Mathe“, „Info“ und „Deutsch“. „Info“ enthält „Projekt“. Welcher Knoten hat die meisten Kinder?', a:['Schule','Info','Projekt','Mathe'], e:'Schule hat 3 Kinder, Info nur 1, die anderen keins.'},
    {d:2, q:'Was ist die Tiefe eines Knotens?', a:['Die Anzahl der Kanten von der Wurzel bis zu ihm.','Die Anzahl seiner Kinder.','Die Anzahl aller Knoten im Baum.','Die Anzahl der Blätter unter ihm.'], e:'Die Wurzel hat Tiefe 0, ihre Kinder Tiefe 1 usw.'},
    {d:2, q:'Wie viele Elternknoten kann ein Knoten im Baum haben?', a:['Höchstens einen (die Wurzel keinen)','Beliebig viele','Genau zwei','Immer genau einen, auch die Wurzel'], e:'Hätte ein Knoten zwei Eltern, gäbe es zwei Wege zu ihm – dann wäre es kein Baum mehr.'},
    {d:2, q:'Man greift sehr oft über die Position auf Elemente zu. Was ist besser geeignet?', a:['Feld (Array)','Einfach verkettete Liste','Stapel','Schlange'], e:'Nur das Feld bietet direkten Zugriff in O(1).'},

    // ---------- Stufe 3 ----------
    {d:3, q:'Mit welcher Datenstruktur prüft man, ob Klammern wie `( [ ] )` richtig geschachtelt sind?', a:['Stapel','Schlange','Feld fester Größe','Baum'], e:'Öffnende Klammer → push, schließende Klammer → pop und vergleichen. Die zuletzt geöffnete muss zuerst schließen.'},
    {d:3, q:'Warum ist `l.pop(0)` bei einer langen Python-Liste ungünstig?', a:['Alle übrigen Elemente rücken nach vorn – O(n).','pop(0) entfernt das letzte Element.','pop(0) ist verboten.','Die Liste wird dabei sortiert.'], e:'Eine Python-Liste ist intern ein Feld. Vorne entfernen heißt verschieben. (Eine verkettete Schlange entnimmt vorne in O(1).)'},
    {d:3, q:'Wie löscht man in einer verketteten Liste den Knoten direkt hinter Knoten `p`?', a:['`p.next = p.next.next`','`p = p.next`','`p.next = None`','`p.next.next = p`'], e:'Man „überspringt“ den Knoten: p zeigt direkt auf dessen Nachfolger.'},
    {d:3, q:'Was berechnet dieser Code?' + C('k = kopf', 'n = 0', 'while k is not None:', '    n = n + 1', '    k = k.next', 'print(n)'), a:['Die Anzahl der Knoten','Den Wert des letzten Knotens','Die Summe der Werte','Den Index von None'], e:'Durch die Liste laufen und zählen, bis None erreicht ist.'},
    {d:3, q:'Richtig wäre `neu.next = kopf` und dann `kopf = neu`. Was passiert bei vertauschter Reihenfolge?' + C('kopf = neu', 'neu.next = kopf'), a:['neu zeigt auf sich selbst, der Rest der Liste geht verloren.','Es funktioniert genauso.','Der neue Knoten landet am Ende.','Python meldet einen Fehler.'], e:'Nach kopf = neu zeigt kopf schon auf neu – der Verweis auf die alte Liste ist weg.'},
    {d:3, q:'Was ist ein Nachteil der verketteten Liste gegenüber einem Feld?', a:['Kein direkter Zugriff über den Index, zusätzlicher Speicher für Verweise.','Einfügen vorne ist langsam.','Sie hat eine feste Größe.','Sie kann nur Zahlen speichern.'], e:'Dafür ist Einfügen/Löschen ohne Verschieben möglich.'},
    {d:3, q:'Was passiert bei `pop()` auf einem leeren Stapel?', a:['Fehler (Unterlauf) – vorher mit isEmpty prüfen.','Es wird 0 geliefert.','Es wird das unterste Element geliefert.','Der Stapel wird neu angelegt.'], e:'In Python: IndexError: pop from empty list.'},
    {d:3, q:'Man legt A, B, C nacheinander auf einen Stapel und nimmt dann dreimal mit pop herunter. In welcher Reihenfolge kommen sie?', a:['C, B, A','A, B, C','B, C, A','A, C, B'], e:'Ein Stapel dreht die Reihenfolge um – so kann man z. B. ein Wort umkehren.'},
    {d:3, q:'Ein Baum hat 10 Knoten, davon 6 Blätter. Wie viele innere Knoten (mit Kindern) hat er?', a:['4','6','10','5'], e:'Jeder Knoten ist entweder Blatt oder innerer Knoten: 10 − 6 = 4.'},
    {d:3, q:'Welche Aussage über Bäume stimmt?', a:['Jeder Knoten ist zusammen mit seinen Nachfahren selbst wieder ein Baum (Teilbaum).','Ein Baum darf Kreise enthalten.','Jeder Knoten hat genau zwei Kinder.','Blätter haben immer die gleiche Tiefe.'], e:'Diese Selbstähnlichkeit macht Bäume später so praktisch für Algorithmen.'},
    {d:3, q:'Zwischen zwei Knoten eines Baums gibt es …', a:['genau einen Weg.','keinen Weg.','immer zwei Wege.','beliebig viele Wege.'], e:'Bäume sind zusammenhängend (mindestens ein Weg) und kreisfrei (höchstens einer).'},
  ]
}];
// Reihenfolge in der Auswahl: Grundlagen → Sortieren → Datenstrukturen
const ORDER = ['python', 'algo', 'daten'];
LERNBEREICHE.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
