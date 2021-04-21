/**
 * Lance une série de fonctions async une par une et retourne le tableau des résultats
 * @param {function[]} asyncFunctions une liste de fcts qui doivent chacune retourner une promesse
 * @param {boolean} [continueOnError=false] Passer true pour continuer la séquence en cas d'erreur (elle est alors mise dans le tableau de résultats)
 * @return {any[]} La liste des valeurs de résolution de chaque asyncFunction, dans le même ordre
 */
async function runAllInSeq (asyncFunctions, continueOnError = false) {
  if (!Array.isArray(asyncFunctions) || !asyncFunctions.every(f => typeof f === 'function')) throw Error('arguments invalides')
  const results = []
  while (asyncFunctions.length) {
    const fn = asyncFunctions.shift()
    try {
      const result = await fn()
      results.push(result)
    } catch (error) {
      if (!continueOnError) throw error
      results.push(error)
    }
  }
  return results
}

/**
 * Patiente un certain temps
 * @param {number} delay délai d'attente en ms
 */
async function waitMs (delay) {
  await new Promise(resolve => setTimeout(() => resolve(), delay))
}

module.exports = {
  runAllInSeq,
  waitMs
}
