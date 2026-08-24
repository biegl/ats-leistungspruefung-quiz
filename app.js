import { FRAGEN } from "./fragen.js"
import { neuerDurchgang, DAUER_MS, auswerten, restzeitMs, formatZeit } from "./quiz.js"

const SPEICHER = "ats-quiz"

const el = {
  timer: document.getElementById("timer"),
  reset: document.getElementById("reset"),
  resetDialog: document.getElementById("reset-dialog"),
  resetJa: document.getElementById("reset-ja"),
  resetNein: document.getElementById("reset-nein"),
  ansage: document.getElementById("ansage"),
  screens: {
    start: document.getElementById("screen-start"),
    frage: document.getElementById("screen-frage"),
    ergebnis: document.getElementById("screen-ergebnis"),
  },
  startBtn: document.getElementById("start-btn"),
  frageTitel: document.getElementById("frage-titel"),
  fortschritt: document.getElementById("frage-fortschritt"),
  punkte: document.getElementById("frage-punkte"),
  quelle: document.getElementById("frage-quelle"),
  frageText: document.getElementById("frage-text"),
  optionen: document.getElementById("optionen"),
  weiterBtn: document.getElementById("weiter-btn"),
  badge: document.getElementById("ergebnis-badge"),
  score: document.getElementById("ergebnis-score"),
  liste: document.getElementById("ergebnis-liste"),
  neustartBtn: document.getElementById("neustart-btn"),
}

let zustand = laden()

function laden() {
  try {
    const roh = sessionStorage.getItem(SPEICHER)
    return roh ? JSON.parse(roh) : null
  } catch {
    // Privater Modus oder blockierter Speicher: der Durchgang überlebt dann
    // keinen Reload, das Quiz funktioniert aber weiterhin.
    return null
  }
}

function speichern() {
  try {
    if (zustand) sessionStorage.setItem(SPEICHER, JSON.stringify(zustand))
    else sessionStorage.removeItem(SPEICHER)
  } catch {
    /* siehe laden(): Speichern ist eine Annehmlichkeit, keine Bedingung. */
  }
}

function starten() {
  const { fragen, optionen } = neuerDurchgang(FRAGEN.length)
  zustand = {
    fragen,
    optionen,
    antworten: Array(fragen.length).fill(null),
    aktuell: 0,
    ende: Date.now() + DAUER_MS,
    fertig: false,
  }
  speichern()
  zeichnen()
}

function abgelaufen() {
  return zustand !== null && restzeitMs(zustand.ende, Date.now()) === 0
}

function aktuellerScreen() {
  if (!zustand) return "start"
  if (zustand.fertig || abgelaufen()) return "ergebnis"
  return "frage"
}

function zeichnen() {
  const name = aktuellerScreen()
  for (const [schluessel, knoten] of Object.entries(el.screens)) {
    knoten.hidden = schluessel !== name
  }
  el.timer.hidden = name !== "frage"

  if (name === "frage") zeichneFrage()
  if (name === "ergebnis") zeichneErgebnis()
}

el.startBtn.addEventListener("click", starten)
el.weiterBtn.addEventListener("click", weiter)
el.neustartBtn.addEventListener("click", starten)

zeichnen()

const BUCHSTABEN = ["A", "B", "C"]

function zeichneFrage() {
  const i = zustand.aktuell
  const frage = FRAGEN[zustand.fragen[i]]
  const reihenfolge = zustand.optionen[i]

  el.fortschritt.textContent = `Frage ${i + 1} von ${zustand.fragen.length}`
  el.quelle.textContent = `Nr. ${zustand.fragen[i] + 1}`
  el.frageText.textContent = frage.frage
  el.frageTitel.textContent = `Frage ${i + 1} von ${zustand.fragen.length}`

  el.punkte.replaceChildren(
    ...zustand.fragen.map((_, k) => {
      const punkt = document.createElement("i")
      if (k < i) punkt.className = "erledigt"
      if (k === i) punkt.className = "jetzt"
      return punkt
    }),
  )

  el.optionen.replaceChildren(
    ...reihenfolge.map((originalIndex, position) => {
      const li = document.createElement("li")
      const label = document.createElement("label")

      const input = document.createElement("input")
      input.type = "radio"
      input.name = `frage-${i}`
      input.value = String(position)
      input.checked = zustand.antworten[i] === position
      input.addEventListener("change", () => waehlen(position))

      const marke = document.createElement("span")
      marke.className = "marke"
      marke.textContent = BUCHSTABEN[position]

      const text = document.createElement("span")
      text.className = "text"
      text.textContent = frage.antworten[originalIndex]

      label.append(input, marke, text)
      li.append(label)
      return li
    }),
  )

  const letzte = i === zustand.fragen.length - 1
  el.weiterBtn.textContent = letzte ? "Auswerten" : "Weiter"
  el.weiterBtn.disabled = zustand.antworten[i] === null
}

/**
 * Die Auswahl wird sofort gespeichert, nicht erst beim Weiter-Klick — läuft die
 * Zeit ab, während eine Antwort markiert, aber unbestätigt ist, zählt sie trotzdem.
 */
function waehlen(position) {
  zustand.antworten[zustand.aktuell] = position
  speichern()
  el.weiterBtn.disabled = false
}

function weiter() {
  if (zustand.antworten[zustand.aktuell] === null) return
  if (zustand.aktuell === zustand.fragen.length - 1) {
    zustand.fertig = true
  } else {
    zustand.aktuell++
  }
  speichern()
  zeichnen()
}

function zeichneErgebnis() {
  const e = auswerten(zustand, FRAGEN)
  el.score.textContent = `${e.richtig} von ${e.gesamt} richtig`
}
