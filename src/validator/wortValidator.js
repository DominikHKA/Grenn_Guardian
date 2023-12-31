/**
 * Funktion zur Validierung eines Wortwerts.
 * @param {string} value - Der zu validierende Wert.
 * @param {string} name - Der Name des Werts (z.B. "Wort" oder "Name").
 * @returns {string} - Eine Fehlermeldung, falls der Wert ungültig ist; ansonsten ein leerer String.
 */
export function wortValidator(value, name) {
  // Überprüfen, ob der Wert leer ist
  if (!value) {
    // Fehlermeldung zurückgeben, wenn der Wert leer ist
    return `${name} darf nicht leer sein.`;
  }

  // Rückgabe eines leeren Strings, wenn der Wert gültig ist
  return '';
}
