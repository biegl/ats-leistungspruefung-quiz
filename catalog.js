import { QUESTIONS } from "./questions.js"

// Static lookup view: filled once from QUESTIONS, no state involved. Reads
// from the same module the quiz draws from, so the catalogue can't drift.
document.getElementById("catalog-list").replaceChildren(
  ...QUESTIONS.map((q, i) => {
    const li = document.createElement("li")

    const marker = document.createElement("span")
    marker.className = "marker"
    marker.textContent = `Nr. ${i + 1}`

    const question = document.createElement("span")
    question.className = "question"
    question.textContent = q.question

    const answer = document.createElement("span")
    answer.className = "answer"
    answer.textContent = q.answers[q.correct]

    li.append(marker, question, answer)
    return li
  }),
)
