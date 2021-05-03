const { clickFirstDialogOk } = require('helpers/actions')
const { getContentNormalized, getResultats } = require('helpers/browser')
const { logIfVerbose } = require('helpers/log')
const { normalize } = require('helpers/text')
/**
 * Vérifie que result est égal à expected (aux espaces près, sauf si strict), la validation passe en cas d'égalité js stricte, indépendamment du type
 * @param {number|string} result
 * @param {number|string|RegExp} expected
 * @param {boolean} strict
 */
function assertEquals (result, expected, strict) {
  // si c'est strictement égal on fait rien, indépendamment du type, inutile de se casser la tête
  if (result === expected) return
  // on compare des string, sauf si on nous donne deux numbers
  if (typeof result === 'number' && typeof expected === 'number') {
    if (result !== expected) throw Error(`Nombre erroné, on attendait ${expected} et on a eu ${result}`)
    return
  }
  if (typeof result === 'number') result = String(result)
  if (typeof expected === 'number') expected = String(expected)
  if (typeof result !== 'string') throw TypeError(`result n’est ni un number ni une string ${typeof result}`)
  if (!strict) result = normalize(result)
  if (expected instanceof RegExp) {
    if (expected.test(result)) return
    throw Error(`Le résultat "${result}" ne match pas ${expected}`)
  }
  if (typeof expected !== 'string') throw TypeError(`expected n’est ni un number ni une regex ni une string ${typeof expected}`)
  if (!strict) expected = normalize(expected)
  if (result !== expected) throw Error(`On attendait ${expected} et on a eu ${result}`)
}

/**
 * Vérifie que le bilan est affiché dans sa boite de dialogue puis clique sur ok
 * @param page
 * @param {NodeScore[]}
 * @return {Promise<void>}
 */
async function checkBilan (page, nodeScores) {
  // on check le score qui doit être dans une boite de dialogue, faut le passer en %
  const bilan = await getContentNormalized(page, 'div.ui-dialog-content:visible')
  for (const nodeScore of nodeScores) {
    const { id, score, nbRepetitions } = nodeScore
    const scorePc = (score * 100 / nbRepetitions)
      .toFixed(1)
      .replace(/\.0$/g, '')
      .replace('.', ',')
    const expected = new RegExp(`Fin.*N[oeœ]+ud : *${id}.*Temps passé[^0-9]+[0-9]+ secondes.*Score : ${scorePc}%`)
    assertEquals(bilan, expected)
  }
  logIfVerbose(`Bilan ok : ${bilan}`)
  await clickFirstDialogOk(page)
}

/**
 * Vérifie que le message affiché dans correction est le bon
 * @param {Page} page
 * @param {RegExp|string|boolean} [msg=true] passer un booléen pour tester le classique "C’est bien|faux", ou une string ou une Regexp
 * @param {string} [selector=#correction]
 * @return {Promise<void>}
 */
async function checkFeedbackCorrection (page, msg = true, selector = '#correction') {
  const feedback = await page.innerText(selector)
  if (typeof msg === 'boolean') {
    msg = msg ? /C’est bien/ : /C’est faux/
  }
  if (typeof msg === 'number') msg = String(msg)
  if (typeof msg === 'string') {
    if (feedback !== msg) throw Error(`Le message de correction n’est pas celui attendu, on a "${feedback}" et on attendait "${msg}"`)
  } else if (msg instanceof RegExp) {
    if (!msg.test(feedback)) throw Error(`Le message de correction n’est pas celui attendu, on a "${feedback}" qui ne match pas "${msg}"`)
  } else {
    throw TypeError(`string ou RegExp attendu, on a eu ${typeof msg} ${msg}`)
  }
  logIfVerbose(`Correction OK avec "${normalize(feedback)}"`) // ici on met du normalize pour avoir une seule ligne de log
}

/**
 * Vérifie que les résultats retournés précédemment correspondent
 * @param {Page} page
 * @param {Object} options
 * @param {number} options.nbResultats
 * @return {Promise<void>}
 */
async function checkResultats (page, { nbResultats }) {
  const resultats = await getResultats(page)
  if (resultats.length !== nbResultats) throw Error(`On voulait ${nbResultats} résultat${nbResultats > 1 ? 's' : ''} et on en a ${resultats.length}`)
  logIfVerbose(`Nb de résultats ok (${nbResultats})`)
}

/**
 * Vérifie que l'on a bien le bon score affiché en haut à droite
 * @param {Page} page
 * @param {number|string} score
 * @param {number|string} total
 * @return {Promise<void>}
 */
async function checkScore (page, score, total) {
  const text = await page.innerText('#etatScore')
  const expected = `Score : ${score} sur ${total}`
  if (text !== expected) throw Error(`Score HS, on voulait "${expected}" et on a "${text}"`)
  logIfVerbose(`Score OK avec "${expected}"`)
}

module.exports = {
  assertEquals,
  checkBilan,
  checkEtat,
  checkFeedbackCorrection,
  checkQuestion,
  checkResultats,
  checkScore
}

/**
 * @typedef NodeScore
 * @type {Object}
 * @property {string} id
 * @property {number} score entier entre 0 et nbRepetitions
 * @property {number} nbRepetitions
 */
