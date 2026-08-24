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
import { mischen, neuerDurchgang } from "./quiz.js"

test("mischen liefert eine Permutation und lässt das Original unberührt", () => {
  const original = [0, 1, 2, 3, 4]
  const kopie = [...original]
  const gemischt = mischen(original)
  assert.deepEqual(original, kopie, "Original wurde verändert")
  assert.deepEqual([...gemischt].sort((a, b) => a - b), kopie)
})

test("neuerDurchgang zieht 10 verschiedene Fragen aus dem Pool", () => {
  for (let i = 0; i < 200; i++) {
    const { fragen } = neuerDurchgang()
    assert.equal(fragen.length, 10)
    assert.equal(new Set(fragen).size, 10, "eine Frage kam doppelt vor")
    for (const f of fragen) {
      assert.ok(f >= 0 && f < 30, `Index ${f} liegt außerhalb des Pools`)
    }
  }
})

test("über viele Durchgänge wird jede der 30 Fragen einmal gezogen", () => {
  const gesehen = new Set()
  for (let i = 0; i < 500; i++) {
    for (const f of neuerDurchgang().fragen) gesehen.add(f)
  }
  assert.equal(gesehen.size, 30, "der Shuffle erreicht nicht alle Fragen")
})

test("optionen ist je Frage eine echte Permutation von 0,1,2", () => {
  const { optionen } = neuerDurchgang()
  assert.equal(optionen.length, 10)
  for (const o of optionen) {
    assert.deepEqual([...o].sort(), [0, 1, 2])
  }
})
