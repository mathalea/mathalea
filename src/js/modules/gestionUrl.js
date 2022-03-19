import { context } from './context'

/**
 * @param {string} param
 * @param {string} newval
 * @param {string} search
 * @returns string
 */
export function replaceQueryParam (param, newval, search = window.location.search) {
  const regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?')
  const query = search.replace(regex, '$1').replace(/&$/, '')

  return (query.length > 2 ? query + '&' : '?') + (newval ? param + '=' + newval : '')
}

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
 * @returns {string} Vue depuis l'URL
 */
export function getZoomFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('z')
}

/**
 *
 * @returns {string} Vue depuis l'URL
 */
export function getDureeFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('duree')
}
/**
 *
 * @returns {string} Log nécessaire depuis l'URL
 */
export function getLogFromUrl () {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('log')
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
/**
 *
 * @returns {string} userId depuis l'URL, context ou sessionStorage, le stocke dans sessionStorage et le renvoie
 */
export function getUserId () {
  let userId = getUserIdFromUrl() || context.userId
  try {
    if (typeof (window.sessionStorage) === 'object') {
      if (window.sessionStorage.getItem('userId') === null && userId) {
        // Si un userId est défini, on le stocke
        window.sessionStorage.setItem('userId', userId)
      } else {
        if (!userId) {
          userId = window.sessionStorage.getItem('userId')
        }
      }
    }
  } catch (err) {
    console.log('Ce navigateur ne prend pas en charge sessionStorage (pour le stockage de l\'identifiant')
  }
  return userId
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
 * @returns {string} l'url vérifiée
 */
export function getUrlSearchOld () {
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
 * Récupère l'URL et s'assure que la vue et le userId sont notés
 * Essai de debug
 * @returns {string} l'url vérifiée réécrite
 */
export function getUrlSearch () {
  const url = new URL(window.location.href)
  if (context.userId) url.searchParams.set('userId', context.userId)
  if (context.vue) url.searchParams.set('v', context.vue)
  if (context.zoom) url.searchParams.set('z', context.zoom)
  if (context.duree) url.searchParams.set('duree', context.duree)
  // On n'écrit pas la série si on est connecté
  if (getUserId()) url.searchParams.delete('serie')
  return url
}

/**
 * Met à jour l'URL avec la vue et le userId s'ils sont connus
 */
export function setUrl (fonctionAppelante) {
  try {
    if (context.aGarderDansHistorique) {
      window.history.pushState('', '', getUrlSearch())
      context.aGarderDansHistorique = false
    } else {
      window.history.replaceState('', '', getUrlSearch())
    }
  } catch (error) {
    window.notify(`erreur dans setUrl appelée par ${fonctionAppelante}`, { ...window.history })
  }
}

/**
 * Met à jour l'URL avec la vue et le userId s'ils sont connus et go
 */
export function setUrlAndGo () {
  window.history.replaceState('', '', getUrlSearch())
  document.location.reload()
}
/**
 * Met à jour l'URL avec la vue et le userId s'ils sont connus et go
 */
export function setUrlAndGoTab () {
  window.history.replaceState('', '', getUrlSearch())
  window.open(document.location)
}
/**
 * Met à jour l'URL avec la vue et le userId s'ils sont connus et go
 */
export function goTabVue (vue) {
  window.open(window.location.protocol + '//' + window.location.host + window.location.pathname + replaceQueryParam('v', vue))
}
