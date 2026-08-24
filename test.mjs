import { test } from "node:test"
import assert from "node:assert/strict"
import { FRAGEN } from "./fragen.js"

test("Katalog enthält genau 30 Fragen", () => {
  assert.equal(FRAGEN.length, 30)
})

test("jede Frage hat genau 3 nicht-leere Antworten", () => {
  for (const [i, f] of FRAGEN.entries()) {
    assert.equal(f.antworten.length, 3, `Frage ${i + 1} hat nicht 3 Antworten`)
    for (const a of f.antworten) {
      assert.ok(a.trim().length > 0, `Frage ${i + 1} hat eine leere Antwort`)
    }
  }
})

test("richtig zeigt bei jeder Frage auf 0, 1 oder 2", () => {
  for (const [i, f] of FRAGEN.entries()) {
    assert.ok(
      Number.isInteger(f.richtig) && f.richtig >= 0 && f.richtig <= 2,
      `Frage ${i + 1} hat richtig=${f.richtig}`,
    )
  }
})

test("innerhalb einer Frage ist keine Antwort doppelt", () => {
  for (const [i, f] of FRAGEN.entries()) {
    const eindeutig = new Set(f.antworten.map((a) => a.trim().toLowerCase()))
    assert.equal(eindeutig.size, 3, `Frage ${i + 1} hat doppelte Antworten`)
  }
})

test("jede Frage hat einen nicht-leeren Fragetext", () => {
  for (const [i, f] of FRAGEN.entries()) {
    assert.ok(f.frage.trim().length > 0, `Frage ${i + 1} hat keinen Text`)
  }
})
