/**
 * Gère le singleton prefs (défini getters/setters pour contrôler les modifications de ce store)
 * @module prefs
 */
/**
 * Un singleton pour conserver les préférences globales (un store maison)
 * @typedef Prefs
 * @property {Protocol.Browser} browserInstance l'objet Browser courant, null s'il n'y en a pas d'instancié
 * @property {string} browserName Le browser à utiliser
 * @property {string[]} browsers La liste des browsers qu'on va tester
 * @property {boolean} [continue] pour continuer en cas d'erreur, par défaut a la même valeur que headless
 * @property {boolean} [debug=false]
 * @property {boolean} [headless=false]
 * @property {boolean} [nokeep=false]
 * @property {boolean} [quiet=false]
 * @property {boolean} [verbose=false]
 * @property {number} timeout
*/
/**
 * Nos préférences initialisées par le lancement (options et environnement)
 * Contient aussi l'instance courante de Browser (pour éviter de déclarer un 2e singleton uniquement pour ça)
 * @type {Prefs}
 */
const prefs = {
  // props sans getter/setter
  /** @type {Protocol.Browser} */
  browserInstance: null,
  // options facultatives passées via la config
  browserOptions: {},
  contextOptions: {},
  // autres options facultatives
  task: '',
  skip: 0,
  limit: 0
}
const knownBrowsers = ['chromium', 'firefox', 'webkit']
// init de nos valeurs par défaut
let browsers = ['chromium']
let timeout = 30000
let slow
let baseUrl

// un objet pour stocker les booléens (pour la propriété dynamique)
const flags = {
  debug: false,
  devtools: false,
  headless: false,
  ignoreHttpsErrors: false,
  quiet: false,
  relax: false,
  timeoutLocked: false,
  verbose: false
}

function boolSetter (prop, value) {
  if (typeof value !== 'boolean') throw Error(`${prop} est un boolean`)
  flags[prop] = value
}

const defaultProps = { enumerable: true }

// les booléens
;['continue', 'debug', 'headless', 'nokeep', 'quiet', 'timeoutLocked', 'verbose'].forEach(prop => {
  Object.defineProperty(prefs, prop, {
    get: () => flags[prop],
    set: boolSetter.bind(null, prop)
  })
})
// browsers
Object.defineProperty(prefs, 'browsers', {
  ...defaultProps,
  get: () => browsers,
  set: (value) => {
    if (!Array.isArray(value) || !value.length) throw Error('browsers invalide (doit être un Array non vide)')
    value.forEach(browser => {
      if (!knownBrowsers.includes(browser)) throw Error(`browser ${browser} inconnu (sont autorisés : ${knownBrowsers.join(', ')})`)
    })
    browsers = value
  }
})
Object.defineProperty(prefs, 'timeout', {
  ...defaultProps,
  get: () => timeout,
  set: (value) => {
    if (isNaN(value) || value < 100) throw Error(`timeout invalide (doit être un nombre ≥ 100, ce sont des ms) : ${value}`)
    timeout = value
  }
})
// propriétés facultatives, qui restent à undefined tant qu'on les affecte pas
Object.defineProperty(prefs, 'slow', {
  ...defaultProps,
  get: () => slow,
  set: (value) => {
    if (!value || typeof value !== 'number' || value < 0) throw Error('scénario invalide (doit être un nombre positif)')
    slow = value
    console.log('slow set', slow)
  }
})
// propriétés facultatives, qui restent à undefined tant qu'on les affecte pas
Object.defineProperty(prefs, 'baseUrl', {
  ...defaultProps,
  get: () => baseUrl,
  set: (value) => {
    if (!value || typeof value !== 'string' || !/^https?:\/\//.test(value)) throw Error('baseUrl invalide (doit être une string non vide commençant par http)')
    baseUrl = value
    // on assure le / de fin
    if (baseUrl.substr(-1) !== '/') baseUrl += '/'
  }
})

module.exports = prefs
