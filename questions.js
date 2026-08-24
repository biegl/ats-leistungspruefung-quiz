// Question catalog for the "Atemschutz-Leistungsprüfung Stufe I (Bronze)"
// (breathing-apparatus proficiency test, level I bronze), LFV Tirol, 2021 edition.
// Every question text and every correct answer is a character-exact copy of
// the directive, including the answer's final period; only markdown emphasis
// markers were dropped.
// The two wrong answers per question were added — the directive contains none.
// The directive's question number is the array index + 1.
export const QUESTIONS = [
  {
    question:
      "Woraus setzt sich atembare Luft zusammen?",
    answers: [
      "21 % Sauerstoff, 78 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
      "17 % Sauerstoff, 78 % Stickstoff, 4,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
      "25 % Sauerstoff, 74 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
    ],
    correct: 0,
  },
  {
    question:
      "Wie kann eine Atemkrise entstehen?",
    answers: [
      "Durch eine falsche Atemtechnik (z. B. durch flaches, hastiges Atmen).",
      "Durch einen zu hohen Flaschendruck im Pressluftatmer.",
      "Durch zu langsames Öffnen des Flaschenventils.",
    ],
    correct: 0,
  },
  {
    question:
      "Wie lange kann ein Mensch ohne Sauerstoff (Atmung) leben, ohne Schäden davonzutragen?",
    answers: [
      "Etwa 30 Sekunden.",
      "Etwa 3 Minuten.",
      "Etwa 10 Minuten.",
    ],
    correct: 1,
  },
  {
    question:
      "Aus welchen Bestandteilen setzt sich die ausgeatmete Atemluft zusammen?",
    answers: [
      "21 % Sauerstoff, 78 % Stickstoff, 0,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
      "11 % Sauerstoff, 78 % Stickstoff, 10,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
      "17 % Sauerstoff, 78 % Stickstoff, 4,04 % Kohlenstoffdioxid, 0,96 % Edelgase.",
    ],
    correct: 2,
  },
  {
    question:
      "Welches Atemgift wirkt auf die äußere Atmung?",
    answers: [
      "Kohlenstoffmonoxid (CO).",
      "Kohlenstoffdioxid (CO₂).",
      "Blausäure (HCN).",
    ],
    correct: 1,
  },
  {
    question:
      "Was ist Kohlenmonoxid für ein Atemgift, und wie wirkt es?",
    answers: [
      "Reizgift, es schädigt die Schleimhäute der Atemwege.",
      "Erstickungsgift, es verdrängt den Sauerstoff aus der Umgebungsluft.",
      "Blut- und Nervengift; es verhindert den Sauerstofftransport im Blut.",
    ],
    correct: 2,
  },
  {
    question:
      "Wie kann man Sauerstoffmangel erkennen?",
    answers: [
      "Nur mit speziellen Messgeräten.",
      "Am süßlichen Geruch der Umgebungsluft.",
      "An einer sichtbaren Trübung der Umgebungsluft.",
    ],
    correct: 0,
  },
  {
    question:
      "Woran erkennt man eine günstige Atemtechnik?",
    answers: [
      "Am schnellen, flachen Atemrhythmus.",
      "Am ruhigen Aus- und Einatmen.",
      "Am lauten Ansprechen des Lungenautomaten.",
    ],
    correct: 1,
  },
  {
    question:
      "Welche Folgen ergeben sich aus der Störung der Atmung?",
    answers: [
      "Lebensgefahr.",
      "Nur Kopfschmerzen.",
      "Nur Müdigkeit.",
    ],
    correct: 0,
  },
  {
    question:
      "Was geschieht mit der Atemluft in der Lunge?",
    answers: [
      "Der gesamte Sauerstoff geht in das Blut über, ausgeatmet wird reines Kohlenstoffdioxid.",
      "Ein Teil des Sauerstoffes geht in das Blut über, die restliche Atemluft wird wieder ausgeatmet.",
      "Die Atemluft wird vollständig verbraucht und im Körper gespeichert.",
    ],
    correct: 1,
  },
  {
    question:
      "Kann auf Atemschutz verzichtet werden, wenn bestimmte physikalische Eigenschaften (z. B. brennbar, wasserlöslich) eines Atemgiftes bekannt sind?",
    answers: [
      "Ja, wenn das Atemgift als wasserlöslich und ungefährlich bekannt ist.",
      "Ja, wenn das Atemgift nachweislich nicht brennbar ist und die Konzentration gering bleibt.",
      "Es kann niemals aufgrund der physikalischen Eigenschaften auf Atemschutz verzichtet werden.",
    ],
    correct: 2,
  },
  {
    question:
      "Können feste Stoffe Atemgifte sein?",
    answers: [
      "Ja, z. B. in Form von Staub.",
      "Nein, nur Gase sind Atemgifte.",
      "Nein, jede Maske hält feste Stoffe zurück.",
    ],
    correct: 0,
  },
  {
    question:
      "Was sind Atemschutzgeräte?",
    answers: [
      "Geräte, die die Umgebungsluft von Atemgiften reinigen und dem Raum zuführen.",
      "Geräte, die den Sauerstoffgehalt der Umgebungsluft messen und überwachen.",
      "Geräte, die es ermöglichen, sich in nicht atembarer oder sauerstoffarmer Luft aufzuhalten.",
    ],
    correct: 2,
  },
  {
    question:
      "Welche Schutzwirkung hat der Pressluftatmer?",
    answers: [
      "Macht den Träger unabhängig von der Umgebungsatmosphäre.",
      "Er filtert die Atemgifte aus der Umgebungsatmosphäre heraus.",
      "Er schützt den Träger zusätzlich gegen Hitze und Flammeneinwirkung.",
    ],
    correct: 0,
  },
  {
    question:
      "Wann muss man Atemschutzmasken reinigen und überprüfen?",
    answers: [
      "Nach jeder Verwendung, bei Nichtverwendung alle fünf Jahre.",
      "Nach jeder Verwendung bzw. bei Nichtverwendung einmal jährlich.",
      "Ausschließlich im Rahmen der Grundüberholung des Gerätes.",
    ],
    correct: 1,
  },
  {
    question:
      "Wo darf man Filtergeräte nicht verwenden?",
    answers: [
      "Nur bei akutem Sauerstoffmangel im gesamten Einsatzraum sind Filtergeräte grundsätzlich verboten, in allen übrigen Einsatzlagen bleiben sie uneingeschränkt zulässig, auch bei hohen Schadstoffkonzentrationen.",
      "Nur bei Bränden im Freien besteht ein generelles Verwendungsverbot für Filtergeräte, in geschlossenen Räumen und bei jedem Sauerstoffmangel gelten sie hingegen weiterhin als unbedenklich und ausreichend.",
      "Bei Bränden in geschlossenen Räumen (CO); bei Sauerstoffmangel (mind. 17 Vol.-% Sauerstoff, bei CO-Filtern mind. 19 Vol.-% erforderlich); bei Umgebungsverhältnissen, wo der Anteil der Atemgifte in der Einatemluft die Filterwirkung überschreitet.",
    ],
    correct: 2,
  },
  {
    question:
      "Welche Kurzprüfungen müssen nach einem Flaschenwechsel durchgeführt werden?",
    answers: [
      "Flaschendruckprüfung und Sichtprüfung, weiteres ist nicht erforderlich.",
      "Hochdruckdichtprüfung und Maskendichtprüfung, weiteres ist nicht erforderlich.",
      "Flaschendruckprüfung, Hochdruckdichtprüfung, Überprüfung der Restluftwarneinrichtung, Sichtprüfung (Begurtung).",
    ],
    correct: 2,
  },
  {
    question:
      "Wie viel Druckabfall darf bei der Hochdruckdichtprüfung innerhalb einer Minute sein?",
    answers: [
      "Höchstens 20 bar.",
      "Höchstens 10 bar.",
      "Kein Abfall zulässig.",
    ],
    correct: 1,
  },
  {
    question:
      "Wie viel Mindestdruck müssen Pressluftatmer haben, um einsatzbereit zu sein?",
    answers: [
      "200 bar beim 200-bar-Gerät und 300 bar beim 300-bar-Gerät.",
      "150 bar beim 200-bar-Gerät und 250 bar beim 300-bar-Gerät.",
      "180 bar beim 200-bar-Gerät und 270 bar beim 300-bar-Gerät.",
    ],
    correct: 2,
  },
  {
    question:
      "Dürfen Atemluftflaschen vollkommen entleert werden?",
    answers: [
      "Nein.",
      "Ja, danach befüllt.",
      "Ja, im Notfall.",
    ],
    correct: 0,
  },
  {
    question:
      "Wie erfolgt die Berechnung des Rückzugzeitpunktes mittels Manometer?",
    answers: [
      "Für den Rückweg ist dieselbe Luftmenge wie für den Hinweg einzuplanen (z. B. Abmarsch bei 210 bar, Verbrauch beim Anmarsch 40 bar → Rückmarsch bei 40 bar, also 40 bar × 1).",
      "Für den Rückweg ist die doppelte Luftmenge der beim Hinweg verbrauchten Atemluft einzuplanen (z. B. Abmarsch bei 210 bar, Verbrauch beim Anmarsch 40 bar → Rückmarsch bei 80 bar, also 40 bar × 2).",
      "Für den Rückweg ist die halbe Luftmenge des Hinweges einzuplanen (z. B. Abmarsch bei 210 bar, Verbrauch beim Anmarsch 40 bar → Rückmarsch bei 20 bar, also 40 bar ÷ 2).",
    ],
    correct: 1,
  },
  {
    question:
      "Welchen Zweck erfüllen Fluchthauben?",
    answers: [
      "Sie dienen zum Retten von Personen durch verrauchte Räume.",
      "Sie dienen dem Atemschutztrupp als Ersatz für den Pressluftatmer.",
      "Sie dienen zum Schutz des Kopfes gegen Hitze und herabfallende Teile.",
    ],
    correct: 0,
  },
  {
    question:
      "Welche Funktion hat der LA?",
    answers: [
      "Reinigung der Atemluft von Atemgiften vor dem Einatmen.",
      "Anzeige des verbleibenden Flaschendrucks während des Einsatzes.",
      "Abgabe der Atemluft an den AS-Geräteträger entsprechend seinem Luftbedarf.",
    ],
    correct: 2,
  },
  {
    question:
      "Darf mit einem Pressluftatmer getaucht werden?",
    answers: [
      "Ja, bis 3 m.",
      "Nein.",
      "Ja, mit Überdruckmaske.",
    ],
    correct: 1,
  },
  {
    question:
      "In welchen Zeitabständen müssen Atemschutzgeräte grundüberholt werden?",
    answers: [
      "Je nach Hersteller und Gerätetyp alle 2 bis 4 Jahre.",
      "Einheitlich alle 5 Jahre, unabhängig vom Gerätetyp.",
      "Je nach Hersteller und Gerätetyp 6 bis 10 Jahre.",
    ],
    correct: 2,
  },
  {
    question:
      "Worin besteht der Unterschied zwischen Normal- und Überdruckgeräten?",
    answers: [
      "In der Erzeugung eines geringen Überdruckes in der Atemschutzmaske durch federbelastetes Ausatemventil und geänderte Funktionsweise des Lungenautomaten.",
      "Im deutlich höheren Fülldruck der Atemluftflaschen bei modernen Überdruckgeräten gegenüber Normaldruckgeräten.",
      "In der größeren Anzahl der mitgeführten Atemluftflaschen am Pressluftatmer bei Überdruckausführung.",
    ],
    correct: 0,
  },
  {
    question:
      "Schützt ein Atemfilter gegen höhere Konzentrationen von Atemgiften?",
    answers: [
      "Ja, mit Kombinationsfilter.",
      "Grundsätzlich „Nein“.",
      "Ja, bei kurzer Einsatzdauer.",
    ],
    correct: 1,
  },
  {
    question:
      "Warum werden bei der Feuerwehr Kombinationsfilter verwendet?",
    answers: [
      "Damit ein Schutz vor Gasen und Partikeln gegeben ist.",
      "Damit sie auch bei Sauerstoffmangel eingesetzt werden können.",
      "Damit sich die Standzeit des Filters deutlich verlängert.",
    ],
    correct: 0,
  },
  {
    question:
      "Schützen Filtergeräte gegen Sauerstoffmangel?",
    answers: [
      "Ja, ab 15 %.",
      "Ja, mit Sauerstoffzusatz.",
      "Nein.",
    ],
    correct: 2,
  },
  {
    question:
      "Wogegen schützt die Fluchthaube?",
    answers: [
      "Gegen verschiedene Atemgifte, jedoch nicht gegen Kohlenstoffmonoxid.",
      "Gegen verschiedene Atemgifte einschließlich Kohlenstoffmonoxid.",
      "Gegen Sauerstoffmangel in geschlossenen Räumen.",
    ],
    correct: 1,
  },
]
