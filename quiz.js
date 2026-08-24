// DOM-freie Logik des Quiz. Alles hier ist ohne Browser testbar.

export const ANZAHL_FRAGEN = 10
export const MINDEST_RICHTIG = 6
export const DAUER_MS = 10 * 60 * 1000

/** Fisher-Yates auf einer Kopie — das Original bleibt unberührt. */
export function mischen(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Zieht die Fragen eines Durchgangs und legt je Frage die Anzeigereihenfolge
 * der drei Antworten fest. Die Reihenfolge wird gespeichert, damit ein Reload
 * die Optionen nicht unter der bereits gewählten Antwort verschiebt.
 */
export function neuerDurchgang(anzahlImPool = 30, anzahlFragen = ANZAHL_FRAGEN) {
  const alle = Array.from({ length: anzahlImPool }, (_, i) => i)
  const fragen = mischen(alle).slice(0, anzahlFragen)
  const optionen = fragen.map(() => mischen([0, 1, 2]))
  return { fragen, optionen }
}
