# Atemschutz-Leistungsprüfung Bronze — Übungsquiz

Übungsquiz zur theoretischen Prüfung (Station 1) der Atemschutz-Leistungsprüfung
Stufe I (Bronze) des Landes-Feuerwehrverbandes Tirol.

10 zufällig gezogene Fragen aus einem Katalog von 30, 10 Minuten Zeit,
ab 6 richtigen Antworten bestanden.

**→ https://biegl.github.io/ats-leistungspruefung-quiz/**

## Lokal ausführen

Die App nutzt ES-Module und braucht deshalb einen HTTP-Server —
ein Doppelklick auf `index.html` funktioniert nicht.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Tests

```bash
node --test test.mjs
```

Geprüft werden die Logik in `quiz.js` (Ziehen, Mischen, Auswerten, Restzeit)
und die Datenintegrität von `questions.js`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Grundgerüst, drei Screens |
| `style.css` | Farbtoken (hell und dunkel), Layout |
| `questions.js` | die 30 Fragen |
| `quiz.js` | Logik ohne DOM-Zugriff |
| `app.js` | Rendern, Zustand, Timer |
| `test.mjs` | Tests |

Keine Dependencies, kein Build-Schritt.

Quellcode, Bezeichner und Kommentare sind englisch; alle Inhalte und die gesamte Bedienoberfläche sind deutsch.

## Quelle und Vorbehalt

Die Fragen stammen aus der Durchführungsrichtlinie „Atemschutz Leistungsprüfung
Stufe I – Bronze“ des Landes-Feuerwehrverbandes Tirol, Ausgabe 2021.

Die Richtlinie enthält nur die richtigen Antworten. **Die jeweils zwei
Falschantworten wurden ergänzt und sind nicht Teil der amtlichen Unterlage.**
Bei Abweichungen gilt ausschließlich die Richtlinie.

Diese Seite ist eine private Übungshilfe ohne amtlichen Charakter.
