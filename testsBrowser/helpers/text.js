
/**
 * Vire les $xxx$ d'un texte
 * @param {string} text
 * @param {boolean} [doNotDropCr=false] passer true pour ne pas virer les \n de text
 * @return {string}
 */
function dropLatex (text, doNotDropCr) {
  text = text.replace(/\$[^$]*\$/g, '')
  if (doNotDropCr) return text
  return text.replace(/\n/g, '')
}

/**
 * extrait les $xxx$ d'un texte
 * @param {string} text
 * @return {string[]} les strings LaTeX contenues dans le texte (sans les $), tableau vide si y'en avait pas
 */
function getMqChunks (text) {
  const re = /\$([^$]*)\$/g
  const mqChunks = []
  let chunks
  while ((chunks = re.exec(text)) !== null) { // faut tester !== null pour choper les chaînes vides
    mqChunks.push(chunks[1])
  }
  return mqChunks
}

/**
 * Retourne le texte sans retour chariot ni espace en double
 * @param {string} text
 */
const normalize = (text) => text.replace(/\s+/g, ' ').trim()

module.exports = {
  dropLatex,
  getMqChunks,
  normalize
}
