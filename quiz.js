// DOM-free logic of the quiz. Everything here is testable without a browser.

export const QUESTION_COUNT = 10
export const PASS_THRESHOLD = 6
export const DURATION_MS = 10 * 60 * 1000

/** Fisher-Yates on a copy — the original stays untouched. */
export function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Draws the questions for a round and fixes, per question, the display order
 * of the three answers. That order is persisted so a reload doesn't shift
 * the options out from under an already-selected answer.
 */
export function newRound(poolSize = 30, questionCount = QUESTION_COUNT) {
  const all = Array.from({ length: poolSize }, (_, i) => i)
  const questions = shuffle(all).slice(0, questionCount)
  const options = questions.map(() => shuffle([0, 1, 2]))
  return { questions, options }
}
/**
 * optionsForQuestion[displayPosition] gives the original index of the answer
 * shown at that position. This is exactly where scoring goes wrong if you
 * forget the shuffle — hence the tests covering all three positions.
 */
export function isCorrect(question, optionsForQuestion, selectedPosition) {
  if (selectedPosition === null || selectedPosition === undefined) return false
  return optionsForQuestion[selectedPosition] === question.correct
}

export function evaluate(state, catalog) {
  let correct = 0
  state.questions.forEach((questionIndex, i) => {
    if (isCorrect(catalog[questionIndex], state.options[i], state.answers[i])) {
      correct++
    }
  })
  return {
    correct,
    total: state.questions.length,
    passed: correct >= PASS_THRESHOLD,
  }
}

export function remainingMs(endsAt, now) {
  return Math.max(0, endsAt - now)
}

export function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000)
  const min = Math.floor(totalSeconds / 60)
  const sec = totalSeconds % 60
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}
