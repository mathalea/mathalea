/**
 * Initialise prefs d'après les options de lancement ou l'environnement
 * @module init
 */
const minimist = require('minimist')

const prefs = require('prefs')
const { log } = require('helpers/log')

let initDone = false

/**
 * @return {boolean}
 */
module.exports = function init () {
  if (initDone) throw Error('init déjà effectué')

  const listAllAndExit = () => {
    const { getAllByType } = require('runner')
    let out = 'Liste des tests existants : '
    const result = getAllByType()
    const sep = '\n    '
    Object.entries(result).forEach(([type, list]) => {
      out += `\n--${type}`
      if (list) out += sep + list.join(sep)
      else out += ' aucun'
    })
    out += '\n'
    console.log(out)
    process.exit()
  }

  const printUsageAndExit = () => {
    console.log(`Usage : node testsBrowser/start.js [options] avec les options
  --browsers xxx : les browser(s) à utiliser (parmi chromium|firefox|webkit),
        un seul possible, les séparer par des virgules (sans espace), 
        chromium par défaut
  --continue : pour continuer après un échec (laisse le navigateur ouvert sur le 1er échec sinon)
  --debug : afficher les opérations de playwright en console
  --scenario xxx : lancer le test du scenario xxx (dans testsBrowser/scenarios)
  --headless : ne pas ouvrir la fenêtre du navigateur (pour usage en environnement 
        serveur, sans interface graphique)
  -h --help : affiche cette aide 
  --ignoreHttpsErrors : pour ne pas s'arrêter aux pbs de certificats https
  --list : lister les scenarios|tasks qui existent
  -q --quiet : ne pas afficher les requêtes qui échouent 
  --relax : ne pas planter si y'a des messages en console.error du navigateur (ignoré pour task qui est là en général pour les lister)
  --task xxx : lancer la tâche testsBrowser/tasks/xxx.js
  --timeout nn : timeout de chaque chargement de page en ms
  -v --verbose : afficher toutes les requêtes

Toutes ces options peuvent aussi être précisées via l'environnement (il faut alors les mettre en majuscule)
  BROWSERS=firefox node testsBrowser/start.js
revient donc au même que
  node testsBrowser/start.js --browsers firefox
`)
    process.exit()
  }

  // on ne documente pas l'option
  // --slow xxx : ralentir l'exécution (xxx = 100 permet déjà de mieux voir ce qui se passe)
  // qui existe mais n'est pas très convaincate pour le moment (ne ralentit pas tellement et fait planter certains tests)
  // à creuser…

  // parsing des options en ligne de commande (le 1er est node, le 2e ./start ou source/start.js)
  const options = minimist(process.argv.slice(2))

  if (options.h || options.help) printUsageAndExit()
  if (options.l || options.list) listAllAndExit()

  // fct raccourcis
  const add = (prop, value) => {
    process.env[prop.toUpperCase()] = value // ça cast en string
    prefs[prop] = value
  }
  // headless
  if (options.headless || process.env.HEADLESS === 'true') add('headless', true)
  else if (options.devtools) prefs.devtools = true
  // logLevel
  if (options.debug || ['true', 'pw:api'].includes(process.env.DEBUG)) {
    process.env.DEBUG = 'pw:api' // ça marche pas toujours, pas trouvé pourquoi
    prefs.debug = true
    add('verbose', true)
    add('quiet', false)
    console.log('init avec DEBUG')
  } else if (options.v || options.verbose || process.env.VERBOSE === 'true') {
    add('debug', false)
    add('verbose', true)
    add('quiet', false)
  } else if (options.q || options.quiet || process.env.QUIET === 'true') {
    add('debug', false)
    add('verbose', false)
    add('quiet', true)
  }
  // autres booléens
  if (options.continue) prefs.continue = true
  if (options.ignoreHttpsErrors) prefs.ignoreHttpsErrors = true
  if (options.relax) prefs.relax = true

  if (options.slow) {
    const slow = Number(options.slow)
    if (slow > 0) prefs.slow = slow
    else log(`warning : option --slow invalide (doit être un nombre positif) ${options.slow}`)
  }

  // options avec valeur, argument prioritaire sur l'environnement
  // browsers
  if (options.browsers) prefs.browsers = options.browsers.split(',')
  else if (process.env.BROWSER) prefs.browsers = [process.env.BROWSER]
  else if (options.browser) prefs.browsers = [options.browser]
  // timeout
  if (options.timeout || process.env.TIMEOUT) {
    if (options.timeout) add('timeout', options.timeout)
    else prefs.timeout = Number(process.env.TIMEOUT)
    // faut ajouter timeoutLocked pour empêcher le scenario de le changer
    prefs.timeoutLocked = true
  }

  // baseUrl
  if (options.baseUrl) prefs.baseUrl = options.baseUrl
  // skip & limit
  ;['skip', 'limit'].forEach(p => {
    if (options[p]) {
      const n = Number(options[p])
      if (Number.isInteger(n)) prefs[p] = n
      else console.error(Error(`option ${p} invalide : ${options[p]}`))
    }
  })

  // taf à faire
  const works = ['scenario', 'task']
  const hasWorkToDo = works.some(work => {
    if (options[work]) {
      prefs[work] = options[work]
      return true
    }
    return false
  })
  if (!hasWorkToDo) throw Error(`Il faut préciser ${works.join('|')}, rien à faire…`)

  initDone = true
  return true
}
