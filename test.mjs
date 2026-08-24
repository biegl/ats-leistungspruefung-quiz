import { test } from "node:test"
import assert from "node:assert/strict"
import { QUESTIONS } from "./questions.js"

test("catalog contains exactly 30 questions", () => {
  assert.equal(QUESTIONS.length, 30)
})

test("every question has exactly 3 non-empty answers", () => {
  for (const [i, q] of QUESTIONS.entries()) {
    assert.equal(q.answers.length, 3, `Question ${i + 1} does not have 3 answers`)
    for (const a of q.answers) {
      assert.ok(a.trim().length > 0, `Question ${i + 1} has an empty answer`)
    }
  }
})

test("correct points to 0, 1 or 2 for every question", () => {
  for (const [i, q] of QUESTIONS.entries()) {
    assert.ok(
      Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 2,
      `Question ${i + 1} has correct=${q.correct}`,
    )
  }
})

test("no answer is duplicated within a question", () => {
  for (const [i, q] of QUESTIONS.entries()) {
    const unique = new Set(q.answers.map((a) => a.trim().toLowerCase()))
    assert.equal(unique.size, 3, `Question ${i + 1} has duplicate answers`)
  }
})

test("every question has a non-empty question text", () => {
  for (const [i, q] of QUESTIONS.entries()) {
    assert.ok(q.question.trim().length > 0, `Question ${i + 1} has no text`)
  }
})
import { shuffle, newRound } from "./quiz.js"

test("shuffle returns a permutation and leaves the original untouched", () => {
  const original = [0, 1, 2, 3, 4]
  const copy = [...original]
  const shuffled = shuffle(original)
  assert.deepEqual(original, copy, "original was mutated")
  assert.deepEqual([...shuffled].sort((a, b) => a - b), copy)
})

test("newRound draws 10 distinct questions from the pool", () => {
  for (let i = 0; i < 200; i++) {
    const { questions } = newRound()
    assert.equal(questions.length, 10)
    assert.equal(new Set(questions).size, 10, "a question came up twice")
    for (const q of questions) {
      assert.ok(q >= 0 && q < 30, `Index ${q} is outside the pool`)
    }
  }
})

test("across many rounds, every one of the 30 questions is drawn at least once", () => {
  const seen = new Set()
  for (let i = 0; i < 500; i++) {
    for (const q of newRound().questions) seen.add(q)
  }
  assert.equal(seen.size, 30, "the shuffle does not reach every question")
})

test("options is a true permutation of 0,1,2 for every question", () => {
  const { options } = newRound()
  assert.equal(options.length, 10)
  for (const o of options) {
    assert.deepEqual([...o].sort(), [0, 1, 2])
  }
})
import { isCorrect, evaluate, remainingMs, formatTime } from "./quiz.js"

const CATALOG = [
  { question: "Q1", answers: ["a", "b", "c"], correct: 0 },
  { question: "Q2", answers: ["a", "b", "c"], correct: 2 },
]

test("isCorrect recognizes the correct answer at every display position", () => {
  const question = CATALOG[0] // correct is original index 0
  // Original index 0 sits at display position 2:
  assert.equal(isCorrect(question, [1, 2, 0], 2), true)
  assert.equal(isCorrect(question, [1, 2, 0], 0), false)
  // Original index 0 sits at display position 0:
  assert.equal(isCorrect(question, [0, 1, 2], 0), true)
  // Original index 0 sits at display position 1:
  assert.equal(isCorrect(question, [2, 0, 1], 1), true)
})

test("isCorrect scores an unanswered question as wrong", () => {
  assert.equal(isCorrect(CATALOG[0], [0, 1, 2], null), false)
})

test("evaluate counts correct answers across the shuffle", () => {
  const state = {
    questions: [0, 1],
    options: [[2, 0, 1], [0, 1, 2]],
    answers: [1, 2], // question 1: position 1 -> original 0 -> correct
  }                   // question 2: position 2 -> original 2 -> correct
  const e = evaluate(state, CATALOG)
  assert.equal(e.correct, 2)
  assert.equal(e.total, 2)
})

test("evaluate counts null as wrong", () => {
  const state = { questions: [0, 1], options: [[0, 1, 2], [0, 1, 2]], answers: [0, null] }
  assert.equal(evaluate(state, CATALOG).correct, 1)
})

test("passed flips exactly at 6 out of 10", () => {
  const build = (n) => ({
    questions: Array.from({ length: 10 }, () => 0),
    options: Array.from({ length: 10 }, () => [0, 1, 2]),
    answers: Array.from({ length: 10 }, (_, i) => (i < n ? 0 : 1)),
  })
  assert.equal(evaluate(build(5), CATALOG).passed, false)
  assert.equal(evaluate(build(6), CATALOG).passed, true)
  assert.equal(evaluate(build(7), CATALOG).passed, true)
})

test("remainingMs is never negative", () => {
  assert.equal(remainingMs(1000, 5000), 0)
  assert.equal(remainingMs(5000, 1000), 4000)
})

test("formatTime produces MM:SS with a leading zero and rounds up", () => {
  assert.equal(formatTime(600000), "10:00")
  assert.equal(formatTime(43000), "00:43")
  assert.equal(formatTime(0), "00:00")
  assert.equal(formatTime(59400), "01:00") // a partial second counts in full
})
