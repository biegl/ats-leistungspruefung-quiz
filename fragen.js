// Fragenkatalog der Atemschutz-Leistungsprüfung Stufe I (Bronze), LFV Tirol, Ausgabe 2021.
// Die richtigen Antworten sind inhaltlich aus der Richtlinie übernommen, meist wörtlich.
// Ausnahmen: Bei den Ja/Nein-Fragen 20, 24 und 29 sagt die Richtlinie nur "Nein.", die
// Begründung dahinter ist ergänzt, damit die Frage nicht durch bloßes Raten trivial wird.
// Frage 16 ist gestrafft, ohne Fachinhalt zu verlieren (CO-Bezug und beide Vol.-%-Werte
// bleiben erhalten).
// Die jeweils zwei Falschantworten sind ergänzt — die Richtlinie enthält keine.
// Die Nummer der Richtlinie ist der Array-Index + 1.

export const FRAGEN = [
  {
    frage: "Woraus setzt sich atembare Luft zusammen?",
    antworten: [
      "21 % Sauerstoff, 78 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
      "17 % Sauerstoff, 78 % Stickstoff, 4,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
      "25 % Sauerstoff, 74 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
    ],
    richtig: 0,
  },
  {
    frage: "Wie kann eine Atemkrise entstehen?",
    antworten: [
      "Durch eine falsche Atemtechnik, etwa durch flaches, hastiges Atmen",
      "Durch einen zu hohen Flaschendruck im Pressluftatmer",
      "Durch zu langsames Öffnen des Flaschenventils",
    ],
    richtig: 0,
  },
  {
    frage: "Wie lange kann ein Mensch ohne Sauerstoff leben, ohne Schäden davonzutragen?",
    antworten: ["Etwa 30 Sekunden", "Etwa 3 Minuten", "Etwa 10 Minuten"],
    richtig: 1,
  },
  {
    frage: "Aus welchen Bestandteilen setzt sich die ausgeatmete Atemluft zusammen?",
    antworten: [
      "21 % Sauerstoff, 78 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
      "11 % Sauerstoff, 78 % Stickstoff, 10,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
      "17 % Sauerstoff, 78 % Stickstoff, 4,04 % Kohlenstoffdioxid, 0,96 % Edelgase",
    ],
    richtig: 2,
  },
  {
    frage: "Welches Atemgift wirkt auf die äußere Atmung?",
    antworten: ["Kohlenstoffmonoxid (CO)", "Kohlenstoffdioxid (CO₂)", "Blausäure (HCN)"],
    richtig: 1,
  },
  {
    frage: "Was ist Kohlenmonoxid für ein Atemgift, und wie wirkt es?",
    antworten: [
      "Reizgift, es schädigt die Schleimhäute der Atemwege",
      "Erstickungsgift, es verdrängt den Sauerstoff aus der Umgebungsluft",
      "Blut- und Nervengift, es verhindert den Sauerstofftransport im Blut",
    ],
    richtig: 2,
  },
  {
    frage: "Wie kann man Sauerstoffmangel erkennen?",
    antworten: [
      "Nur mit speziellen Messgeräten",
      "Am süßlichen Geruch der Umgebungsluft",
      "An einer sichtbaren Trübung der Umgebungsluft",
    ],
    richtig: 0,
  },
  {
    frage: "Woran erkennt man eine günstige Atemtechnik?",
    antworten: [
      "Am schnellen, flachen Atemrhythmus",
      "Am ruhigen Aus- und Einatmen",
      "Am hörbaren Ansprechen des Lungenautomaten bei jedem Atemzug",
    ],
    richtig: 1,
  },
  {
    frage: "Welche Folgen ergeben sich aus der Störung der Atmung?",
    antworten: ["Lebensgefahr", "Nur harmlose Kopfschmerzen", "Nur kurzzeitig verminderte Leistung"],
    richtig: 0,
  },
  {
    frage: "Was geschieht mit der Atemluft in der Lunge?",
    antworten: [
      "Der gesamte Sauerstoff geht in das Blut über, ausgeatmet wird reines Kohlenstoffdioxid",
      "Ein Teil des Sauerstoffes geht in das Blut über, die restliche Atemluft wird wieder ausgeatmet",
      "Die Atemluft wird vollständig verbraucht und im Körper gespeichert",
    ],
    richtig: 1,
  },
  {
    frage:
      "Kann auf Atemschutz verzichtet werden, wenn bestimmte physikalische Eigenschaften eines Atemgiftes bekannt sind?",
    antworten: [
      "Ja, wenn das Atemgift als wasserlöslich und ungefährlich bekannt ist",
      "Ja, wenn das Atemgift nachweislich nicht brennbar ist und die Konzentration gering bleibt",
      "Nein, aufgrund der physikalischen Eigenschaften kann niemals darauf verzichtet werden",
    ],
    richtig: 2,
  },
  {
    frage: "Können feste Stoffe Atemgifte sein?",
    antworten: [
      "Ja, zum Beispiel in Form von Staub",
      "Nein, nur Gase sind Atemgifte",
      "Nein, jede Maske hält feste Stoffe zurück",
    ],
    richtig: 0,
  },
  {
    frage: "Was sind Atemschutzgeräte?",
    antworten: [
      "Geräte, die die Umgebungsluft von Atemgiften reinigen und dem Raum zuführen",
      "Geräte, die den Sauerstoffgehalt der Umgebungsluft messen und überwachen",
      "Geräte, die es ermöglichen, sich in nicht atembarer oder sauerstoffarmer Luft aufzuhalten",
    ],
    richtig: 2,
  },
  {
    frage: "Welche Schutzwirkung hat der Pressluftatmer?",
    antworten: [
      "Er macht den Träger unabhängig von der Umgebungsatmosphäre",
      "Er filtert die Atemgifte aus der Umgebungsatmosphäre heraus",
      "Er schützt den Träger zusätzlich gegen Hitze und Flammeneinwirkung",
    ],
    richtig: 0,
  },
  {
    frage: "Wann muss man Atemschutzmasken reinigen und überprüfen?",
    antworten: [
      "Nach jeder Verwendung, bei Nichtverwendung alle fünf Jahre",
      "Nach jeder Verwendung, bei Nichtverwendung einmal jährlich",
      "Ausschließlich im Rahmen der Grundüberholung des Gerätes",
    ],
    richtig: 1,
  },
  {
    frage: "Wo darf man Filtergeräte nicht verwenden?",
    antworten: [
      "Nur bei akutem Sauerstoffmangel im gesamten Einsatzraum sind Filtergeräte grundsätzlich verboten, in allen übrigen Einsatzlagen bleiben sie uneingeschränkt zulässig",
      "Nur bei Bränden im Freien besteht ein generelles Verwendungsverbot für Filtergeräte, in geschlossenen Räumen gelten sie hingegen als unbedenklich",
      "Bei Bränden in geschlossenen Räumen (CO), bei Sauerstoffmangel unter 17 Vol.-% (bei CO-Filtern unter 19 Vol.-%) sowie bei Überschreiten der Filterwirkung",
    ],
    richtig: 2,
  },
  {
    frage: "Welche Kurzprüfungen müssen nach einem Flaschenwechsel durchgeführt werden?",
    antworten: [
      "Flaschendruckprüfung und Sichtprüfung, weiteres ist nicht erforderlich",
      "Hochdruckdichtprüfung und Maskendichtprüfung, weiteres ist nicht erforderlich",
      "Flaschendruckprüfung, Hochdruckdichtprüfung, Restluftwarneinrichtung und Sichtprüfung",
    ],
    richtig: 2,
  },
  {
    frage: "Wie viel Druckabfall darf bei der Hochdruckdichtprüfung innerhalb einer Minute sein?",
    antworten: ["Höchstens 20 bar", "Höchstens 10 bar", "Kein Abfall zulässig"],
    richtig: 1,
  },
  {
    frage: "Wie viel Mindestdruck müssen Pressluftatmer haben, um einsatzbereit zu sein?",
    antworten: [
      "200 bar beim 200-bar-Gerät und 300 bar beim 300-bar-Gerät",
      "150 bar beim 200-bar-Gerät und 250 bar beim 300-bar-Gerät",
      "180 bar beim 200-bar-Gerät und 270 bar beim 300-bar-Gerät",
    ],
    richtig: 2,
  },
  {
    frage: "Dürfen Atemluftflaschen vollkommen entleert werden?",
    antworten: [
      "Nein, es muss stets ein Restdruck in der Flasche verbleiben",
      "Ja, sofern sie unmittelbar danach wieder befüllt werden",
      "Ja, ein Restdruck ist nur bei Composite-Flaschen erforderlich",
    ],
    richtig: 0,
  },
  {
    frage: "Wie erfolgt die Berechnung des Rückzugzeitpunktes mittels Manometer?",
    antworten: [
      "Für den Rückweg ist dieselbe Luftmenge wie für den Hinweg einzuplanen",
      "Für den Rückweg ist die doppelte Luftmenge des Hinweges einzuplanen",
      "Für den Rückweg ist die halbe Luftmenge des Hinweges einzuplanen",
    ],
    richtig: 1,
  },
  {
    frage: "Welchen Zweck erfüllen Fluchthauben?",
    antworten: [
      "Sie dienen zum Retten von Personen durch verrauchte Räume",
      "Sie dienen dem Atemschutztrupp als Ersatz für den Pressluftatmer",
      "Sie dienen zum Schutz des Kopfes gegen Hitze und herabfallende Teile",
    ],
    richtig: 0,
  },
  {
    frage: "Welche Funktion hat der Lungenautomat?",
    antworten: [
      "Reinigung der Atemluft von Atemgiften vor dem Einatmen",
      "Anzeige des verbleibenden Flaschendrucks während des Einsatzes",
      "Abgabe der Atemluft an den Geräteträger entsprechend seinem Luftbedarf",
    ],
    richtig: 2,
  },
  {
    frage: "Darf mit einem Pressluftatmer getaucht werden?",
    antworten: [
      "Ja, bis zu einer Wassertiefe von drei Metern",
      "Nein, der Pressluftatmer ist dafür weder gebaut noch zugelassen",
      "Ja, sofern eine Überdruckmaske verwendet wird",
    ],
    richtig: 1,
  },
  {
    frage: "In welchen Zeitabständen müssen Atemschutzgeräte grundüberholt werden?",
    antworten: [
      "Je nach Hersteller und Gerätetyp alle 2 bis 4 Jahre",
      "Einheitlich alle 5 Jahre, unabhängig vom Gerätetyp",
      "Je nach Hersteller und Gerätetyp alle 6 bis 10 Jahre",
    ],
    richtig: 2,
  },
  {
    frage: "Worin besteht der Unterschied zwischen Normal- und Überdruckgeräten?",
    antworten: [
      "Im geringen Überdruck in der Maske durch federbelastetes Ausatemventil und geänderten Lungenautomaten",
      "Im deutlich höheren Fülldruck der Atemluftflaschen bei modernen Überdruckgeräten gegenüber Normaldruckgeräten",
      "In der größeren Anzahl der mitgeführten Atemluftflaschen am Pressluftatmer bei Überdruckausführung",
    ],
    richtig: 0,
  },
  {
    frage: "Schützt ein Atemfilter gegen höhere Konzentrationen von Atemgiften?",
    antworten: ["Ja, mit Kombinationsfilter", "Grundsätzlich nein", "Ja, bei kurzer Einsatzdauer"],
    richtig: 1,
  },
  {
    frage: "Warum werden bei der Feuerwehr Kombinationsfilter verwendet?",
    antworten: [
      "Damit ein Schutz vor Gasen und Partikeln gegeben ist",
      "Damit sie auch bei Sauerstoffmangel eingesetzt werden können",
      "Damit sich die Standzeit des Filters deutlich verlängert",
    ],
    richtig: 0,
  },
  {
    frage: "Schützen Filtergeräte gegen Sauerstoffmangel?",
    antworten: [
      "Ja, der Filter reichert die Atemluft mit Sauerstoff an",
      "Ja, sofern noch mindestens 15 Vol.-% Sauerstoff vorhanden sind",
      "Nein, ein Filtergerät erzeugt keinen Sauerstoff",
    ],
    richtig: 2,
  },
  {
    frage: "Wogegen schützt die Fluchthaube?",
    antworten: [
      "Gegen verschiedene Atemgifte, jedoch nicht gegen Kohlenstoffmonoxid",
      "Gegen verschiedene Atemgifte einschließlich Kohlenstoffmonoxid",
      "Gegen Sauerstoffmangel in geschlossenen Räumen",
    ],
    richtig: 1,
  },
]
