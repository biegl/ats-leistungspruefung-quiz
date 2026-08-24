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

zeichnen()

function zeichneFrage() {
  el.frageText.textContent = FRAGEN[zustand.fragen[zustand.aktuell]].frage
}

function zeichneErgebnis() {
  const e = auswerten(zustand, FRAGEN)
  el.score.textContent = `${e.richtig} von ${e.gesamt} richtig`
}
