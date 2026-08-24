import { QUESTIONS } from "./questions.js"
import { newRound, DURATION_MS, evaluate, isCorrect, remainingMs, formatTime } from "./quiz.js"

const STORAGE_KEY = "ats-quiz"
const LETTERS = ["A", "B", "C"]

const el = {
  timer: document.getElementById("timer"),
  reset: document.getElementById("reset"),
  resetDialog: document.getElementById("reset-dialog"),
  resetYes: document.getElementById("reset-yes"),
  resetNo: document.getElementById("reset-no"),
  announce: document.getElementById("announce"),
  screens: {
    start: document.getElementById("screen-start"),
    question: document.getElementById("screen-question"),
    result: document.getElementById("screen-result"),
  },
  startBtn: document.getElementById("start-btn"),
  questionTitle: document.getElementById("question-title"),
  progress: document.getElementById("question-progress"),
  dots: document.getElementById("question-dots"),
  source: document.getElementById("question-source"),
  questionText: document.getElementById("question-text"),
  options: document.getElementById("options"),
  nextBtn: document.getElementById("next-btn"),
  badge: document.getElementById("result-badge"),
  score: document.getElementById("result-score"),
  list: document.getElementById("result-list"),
  restartBtn: document.getElementById("restart-btn"),
}

let state = load()

/**
 * Guards the one place a stored round enters the app. Anything that parses
 * but doesn't match the current shape (old field names, a future field
 * missing, a hand-edited value) is discarded here instead of surfacing as an
 * exception deep in a render function.
 */
function isValidState(s) {
  return (
    !!s &&
    typeof s === "object" &&
    Array.isArray(s.questions) &&
    s.questions.every((q) => Number.isInteger(q) && q >= 0 && q < QUESTIONS.length) &&
    Array.isArray(s.options) &&
    s.options.length === s.questions.length &&
    s.options.every((o) => Array.isArray(o)) &&
    Array.isArray(s.answers) &&
    s.answers.length === s.questions.length &&
    Number.isInteger(s.current) &&
    s.current >= 0 &&
    s.current < s.questions.length &&
    Number.isFinite(s.endsAt)
  )
}

function load() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isValidState(parsed) ? parsed : null
  } catch {
    // Private mode or blocked storage: the round then won't survive a
    // reload, but the quiz keeps working.
    return null
  }
}

function save() {
  try {
    if (state) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* see load(): saving is a convenience, not a requirement. */
  }
}

function start() {
  const { questions, options } = newRound(QUESTIONS.length)
  state = {
    questions,
    options,
    answers: Array(questions.length).fill(null),
    current: 0,
    endsAt: Date.now() + DURATION_MS,
    finished: false,
  }
  save()
  warningAnnounced = false
  render()
}

function isExpired() {
  return state !== null && remainingMs(state.endsAt, Date.now()) === 0
}

function currentScreen() {
  if (!state) return "start"
  if (state.finished || isExpired()) return "result"
  return "question"
}

function render() {
  const name = currentScreen()
  for (const [key, node] of Object.entries(el.screens)) {
    node.hidden = key !== name
  }
  el.timer.hidden = name !== "question"

  if (name === "question") startTicker()
  else stopTicker()

  if (name === "question") renderQuestion()
  if (name === "result") renderResult()

  // Only focus on an actual screen change — otherwise every timer tick would
  // rip focus out of the answer options.
  if (name !== lastRendered) {
    lastRendered = name
    const heading = el.screens[name].querySelector("h1, h2")
    if (heading) heading.focus()
  }
}

el.startBtn.addEventListener("click", start)
el.nextBtn.addEventListener("click", next)
el.restartBtn.addEventListener("click", start)

const WARN_THRESHOLD_MS = 60 * 1000
let warningAnnounced = false
let tickerId = null
let lastRendered = null

function tick() {
  if (!state || state.finished) {
    stopTicker()
    return
  }

  const remaining = remainingMs(state.endsAt, Date.now())
  el.timer.textContent = formatTime(remaining)

  const warn = remaining <= WARN_THRESHOLD_MS
  el.timer.classList.toggle("warn", warn)

  // Announce once instead of reading it out every second.
  if (warn && !warningAnnounced) {
    warningAnnounced = true
    el.announce.textContent = "Noch eine Minute Bearbeitungszeit."
  }

  if (remaining === 0) {
    stopTicker()
    state.finished = true
    save()
    el.announce.textContent = "Die Zeit ist abgelaufen. Das Ergebnis wird angezeigt."
    render()
  }
}

function startTicker() {
  stopTicker()
  tick()
  tickerId = setInterval(tick, 1000)
}

function stopTicker() {
  if (tickerId !== null) {
    clearInterval(tickerId)
    tickerId = null
  }
}

// Background tabs throttle setInterval. Catch up immediately on return
// instead of showing a stale time until the next tick.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && currentScreen() === "question") tick()
})

function renderQuestion() {
  const i = state.current
  const question = QUESTIONS[state.questions[i]]
  const order = state.options[i]

  el.progress.textContent = `Frage ${i + 1} von ${state.questions.length}`
  el.source.textContent = `Nr. ${state.questions[i] + 1}`
  el.questionText.textContent = question.question
  el.questionTitle.textContent = `Frage ${i + 1} von ${state.questions.length}`

  el.dots.replaceChildren(
    ...state.questions.map((_, k) => {
      const dot = document.createElement("i")
      if (k < i) dot.className = "done"
      if (k === i) dot.className = "current"
      return dot
    }),
  )

  el.options.replaceChildren(
    ...order.map((originalIndex, position) => {
      const li = document.createElement("li")
      const label = document.createElement("label")

      const input = document.createElement("input")
      input.type = "radio"
      input.name = `question-${i}`
      input.value = String(position)
      input.checked = state.answers[i] === position
      input.addEventListener("change", () => select(position))

      const letter = document.createElement("span")
      letter.className = "letter"
      letter.textContent = LETTERS[position]

      const text = document.createElement("span")
      text.className = "text"
      text.textContent = question.answers[originalIndex]

      label.append(input, letter, text)
      li.append(label)
      return li
    }),
  )

  const isLast = i === state.questions.length - 1
  el.nextBtn.textContent = isLast ? "Auswerten" : "Weiter"
  el.nextBtn.disabled = state.answers[i] === null
}

/**
 * The selection is saved immediately, not only on the Next click — if time
 * runs out while an answer is marked but unconfirmed, it still counts.
 */
function select(position) {
  state.answers[state.current] = position
  save()
  el.nextBtn.disabled = false
}

function next() {
  if (state.answers[state.current] === null) return
  if (state.current === state.questions.length - 1) {
    state.finished = true
  } else {
    state.current++
  }
  save()
  render()
}

function renderResult() {
  const e = evaluate(state, QUESTIONS)

  el.badge.textContent = e.passed ? "Bestanden" : "Nicht bestanden"
  el.badge.classList.toggle("failed", !e.passed)

  el.score.replaceChildren()
  const count = document.createElement("b")
  count.textContent = String(e.correct)
  el.score.append(count, ` von ${e.total} richtig`)

  el.list.replaceChildren(
    ...state.questions.map((questionIndex, i) => {
      const question = QUESTIONS[questionIndex]
      const order = state.options[i]
      const selected = state.answers[i]
      const correct = isCorrect(question, order, selected)

      const li = document.createElement("li")
      li.className = correct ? "correct" : "incorrect"

      const marker = document.createElement("span")
      marker.className = "marker"
      // Never convey state through color alone — the text carries it too.
      marker.textContent = `${correct ? "Richtig" : "Falsch"} · Nr. ${questionIndex + 1}`

      const text = document.createElement("span")
      text.className = "question"
      text.textContent = question.question

      const answer = document.createElement("span")
      answer.className = "answer"

      if (selected === null) {
        answer.append("Nicht beantwortet. ")
      } else if (!correct) {
        answer.append(`Gewählt: ${question.answers[order[selected]]}. `)
      }

      if (correct) {
        answer.append(question.answers[question.correct])
      } else {
        const correctAnswer = document.createElement("b")
        correctAnswer.textContent = `Richtig: ${question.answers[question.correct]}`
        answer.append(correctAnswer)
      }

      li.append(marker, text, answer)
      return li
    }),
  )
}

function openResetDialog() {
  el.resetDialog.hidden = false
  el.resetYes.focus()
}

function closeResetDialog() {
  el.resetDialog.hidden = true
  el.reset.focus()
}

el.reset.addEventListener("click", openResetDialog)
el.resetNo.addEventListener("click", closeResetDialog)
el.resetYes.addEventListener("click", () => {
  el.resetDialog.hidden = true
  start()
})

// Escape closes the confirmation dialog without discarding the round.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !el.resetDialog.hidden) closeResetDialog()
})

// Everything above is a declaration or a listener registration. Calling
// render() last means a future render-time exception still leaves reset and
// escape working, instead of aborting module evaluation before they're wired
// up.
render()
