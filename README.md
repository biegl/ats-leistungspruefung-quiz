# Atemschutz-Leistungsprüfung Bronze — Übungsquiz

Übungshilfe zur Atemschutz-Leistungsprüfung Stufe I (Bronze) des
Landes-Feuerwehrverbandes Tirol. Drei Bereiche, vom Startmenü aus erreichbar:

- **Quiz** — 10 zufällig gezogene Fragen aus einem Katalog von 30, 10 Minuten
  Zeit, ab 6 richtigen Antworten bestanden.
- **Fragenkatalog** — alle 30 Fragen mit der richtigen Antwort zum Nachschlagen.
- **Stationen 1–5** — wer was macht (ASTRF, ASTRM 1, ASTRM 2), die Meldungen an
  den Hauptbewerter und der Punkteabzug je Fehler.

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

Geprüft werden die Logik in `quiz.js` (Ziehen, Mischen, Auswerten, Restzeit),
die Datenintegrität von `questions.js` und die Verdrahtung der Seiten: dass jede
`getElementById`-Abfrage ihr Element findet (diese Aufrufe laufen beim Laden des
Moduls — eine veraltete id nimmt die ganze Seite mit) und dass Menü-Links und
Zurück-Links vorhanden sind.

Die Punktwerte in `stationen.html` sind gegen die Fehlerliste der jeweils eigenen
Station abgeglichen (gleich benannte Fehler haben je Station unterschiedliche
Werte — „Durch ASTRF nicht alle Manometer abgelesen“ ist an Station 2 fünf, an
Station 3 und 4 zehn Punkte). Dieser Abgleich lief gegen den vollständigen
Richtlinien-Text unter `docs/`, das lokal bleibt und nicht mitveröffentlicht wird
— er ist deshalb **nicht** Teil von `node --test`. Wer die Werte ändert, prüft sie
von Hand gegen die Richtlinie.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startmenü und die drei Quiz-Screens |
| `fragenkatalog.html` + `catalog.js` | Nachschlageseite, gerendert aus `questions.js` |
| `stationen.html` | Stationsübersicht, statisches Markup ohne JS |
| `style.css` | Farbtoken (hell und dunkel), Layout, Stationsklassen unter `.ref` |
| `questions.js` | die 30 Fragen |
| `quiz.js` | Logik ohne DOM-Zugriff |
| `app.js` | Rendern, Zustand, Timer |
| `robots.txt` | Ausschluss für eine eigene Domain, siehe unten |
| `test.mjs` | Tests |

Drei getrennte Seiten statt eines Routers: `scope` im Manifest deckt das ganze
Verzeichnis ab, die Seiten bleiben also auch installiert in der App — ohne
History-Handling und ohne zusätzlichen Zustand in `app.js`.

Keine Dependencies, kein Build-Schritt.

Quellcode, Bezeichner und Kommentare sind englisch; alle Inhalte und die gesamte Bedienoberfläche sind deutsch.

## Nicht indexiert

Jede Seite trägt `<meta name="robots" content="noindex, nofollow">`. Das ist der
wirksame Teil: als GitHub-Pages-**Projektseite** liegt die App in einem
Unterverzeichnis, und `robots.txt` wird nur im Domain-Root gelesen
(`https://biegl.github.io/robots.txt` — anderes Repository). Das mitgelieferte
`robots.txt` greift daher erst bei einer eigenen Domain.

## Quelle und Vorbehalt

Die Fragen stammen aus der Durchführungsrichtlinie „Atemschutz Leistungsprüfung
Stufe I – Bronze“ des Landes-Feuerwehrverbandes Tirol, Ausgabe 2021.

Die Richtlinie enthält nur die richtigen Antworten. **Die jeweils zwei
Falschantworten wurden ergänzt und sind nicht Teil der amtlichen Unterlage.**
Bei Abweichungen gilt ausschließlich die Richtlinie.

Die Stationsübersicht fasst Abläufe, Meldungen und Fehlerlisten derselben
Richtlinie zusammen. Die Rollenzuordnung ist übernommen, wo die Richtlinie eine
Funktion nennt, und ausdrücklich als „nicht festgelegt“ ausgewiesen, wo sie
keine nennt. Die Abbildungen der Richtlinie sind nicht enthalten.

Diese Seite ist eine private Übungshilfe ohne amtlichen Charakter.
