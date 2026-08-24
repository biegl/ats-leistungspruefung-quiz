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
import { istRichtig, auswerten, restzeitMs, formatZeit } from "./quiz.js"

const KATALOG = [
  { frage: "F1", antworten: ["a", "b", "c"], richtig: 0 },
  { frage: "F2", antworten: ["a", "b", "c"], richtig: 2 },
]

test("istRichtig erkennt die richtige Antwort an jeder Anzeigeposition", () => {
  const frage = KATALOG[0] // richtig ist Original-Index 0
  // Original-Index 0 steht an Anzeigeposition 2:
  assert.equal(istRichtig(frage, [1, 2, 0], 2), true)
  assert.equal(istRichtig(frage, [1, 2, 0], 0), false)
  // Original-Index 0 steht an Anzeigeposition 0:
  assert.equal(istRichtig(frage, [0, 1, 2], 0), true)
  // Original-Index 0 steht an Anzeigeposition 1:
  assert.equal(istRichtig(frage, [2, 0, 1], 1), true)
})

test("istRichtig wertet eine unbeantwortete Frage als falsch", () => {
  assert.equal(istRichtig(KATALOG[0], [0, 1, 2], null), false)
})

test("auswerten zählt richtige Antworten über die Mischung hinweg", () => {
  const zustand = {
    fragen: [0, 1],
    optionen: [[2, 0, 1], [0, 1, 2]],
    antworten: [1, 2], // Frage 1: Position 1 -> Original 0 -> richtig
  }                    // Frage 2: Position 2 -> Original 2 -> richtig
  const e = auswerten(zustand, KATALOG)
  assert.equal(e.richtig, 2)
  assert.equal(e.gesamt, 2)
})

test("auswerten zählt null als falsch", () => {
  const zustand = { fragen: [0, 1], optionen: [[0, 1, 2], [0, 1, 2]], antworten: [0, null] }
  assert.equal(auswerten(zustand, KATALOG).richtig, 1)
})

test("bestanden kippt genau bei 6 von 10", () => {
  const bau = (n) => ({
    fragen: Array.from({ length: 10 }, () => 0),
    optionen: Array.from({ length: 10 }, () => [0, 1, 2]),
    antworten: Array.from({ length: 10 }, (_, i) => (i < n ? 0 : 1)),
  })
  assert.equal(auswerten(bau(5), KATALOG).bestanden, false)
  assert.equal(auswerten(bau(6), KATALOG).bestanden, true)
  assert.equal(auswerten(bau(7), KATALOG).bestanden, true)
})

test("restzeitMs wird nie negativ", () => {
  assert.equal(restzeitMs(1000, 5000), 0)
  assert.equal(restzeitMs(5000, 1000), 4000)
})

test("formatZeit setzt MM:SS mit führender Null und rundet auf", () => {
  assert.equal(formatZeit(600000), "10:00")
  assert.equal(formatZeit(43000), "00:43")
  assert.equal(formatZeit(0), "00:00")
  assert.equal(formatZeit(59400), "01:00") // angebrochene Sekunde zählt voll
})
