import { context } from './context'

/**
 *
 * @returns {string} Filtre depuis l'URL
 */
export function getFilterFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('filtre')
}

/**
 *
 * @returns {string} Vue depuis l'URL
 */
export function getVueFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('v')
}
/**
 *
 * @returns {string} userId depuis l'URL
 */
export function getUserIdFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('userId')
}

export function getUrlVars () { // Récupère les variables de l'URL
  const url = new URL(window.location.href)
  const tableauStringsExercicesParametres = url.searchParams.getAll('ex') // récupère un string pour chaque paramètre ex de l'URL
  const tableauObjetsExercices = []
  for (let indiceExercice = 0; indiceExercice < tableauStringsExercicesParametres.length; indiceExercice++) {
    const CleValeur = tableauStringsExercicesParametres[indiceExercice].split(',')
    const ObjetParametres = {}
    ObjetParametres.id = CleValeur[0] // Récupère le premier élément qui est forcément l'id
    CleValeur.shift() // Retire ce premier élément
    if (CleValeur.length > 0) {
      for (const i in CleValeur) {
        CleValeur[i] = CleValeur[i].split('=')
        // change le type de ce qui ne doit pas être un string
        if (CleValeur[i][1] === 'true' || CleValeur[i][1] === 'false') { // "true"=>true
          ObjetParametres[CleValeur[i][0]] = (CleValeur[i][1] === 'true')
        } else if (!isNaN(CleValeur[i][1])) { // "17"=>17
          ObjetParametres[CleValeur[i][0]] = parseInt(CleValeur[i][1])
        } else {
          ObjetParametres[CleValeur[i][0]] = CleValeur[i][1]
        }
      }
    }
    // Pour assurer la rétrocompatibilité avec les paramètres long 07/2021
    if (ObjetParametres.sup !== undefined) {
      ObjetParametres.s = ObjetParametres.sup
    }
    if (ObjetParametres.sup2 !== undefined) {
      ObjetParametres.s2 = ObjetParametres.sup2
    }
    if (ObjetParametres.sup3 !== undefined) {
      ObjetParametres.s3 = ObjetParametres.sup3
    }
    if (ObjetParametres.interactif !== undefined) {
      ObjetParametres.i = ObjetParametres.interactif
    }
    if (ObjetParametres.nbQuestions !== undefined) {
      ObjetParametres.n = ObjetParametres.nbQuestions
    }
    if (ObjetParametres.video !== undefined) {
      ObjetParametres.v = ObjetParametres.video
    }
    tableauObjetsExercices.push(ObjetParametres)
  }
  return tableauObjetsExercices
}

/**
 * Récupère l'URL et s'assure que la vue et le userId sont notés
 * @returns
 */
export function getUrlSearch () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  if (context.userId) urlParams.set('userId', context.userId)
  if (context.vue) urlParams.set('v', context.vue)
  let url = ''
  let text
  for (const p of urlParams) {
    text = p.join()
    text = text.replace(',', '=')
    url += text + '&' // Le dernier & est à supprimer avec le slice
  }
  if (urlParams) url = window.location + '?' + url.slice(0, -1)
  return url
}

/**
 * Met à jour l'URL avec la vue et le userId s'ils sont connus
 */
export function setUrl () {
  window.history.pushState('', '', getUrlSearch())
}
