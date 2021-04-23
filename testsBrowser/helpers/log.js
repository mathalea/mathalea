const fs = require('fs')
const path = require('path')

const prefs = require('prefs')
const { formatDateTime } = require('sesajs-date/cjs')

// fcts privées
const hasJsHandle = (args) => args.some(isJsHandle)
const isJsHandle = (arg) => arg && typeof arg.asElement === 'function' && typeof arg.evaluate === 'function'

/**
 * Retourne un logger qui écrira dans filename (dans le dossier log), le fichier est créé s'il n'existait pas.
 * ATTENTION, par défaut il est vidé s'il existait (passer {append: true} pour ne pas le faire)
 * @param {string} fileName nom du fichier, sans son extension .log
 * @param {Object} [options]
 * @param {boolean} [options.append=false] Passer true pour ne pas vider le fichier s'il existe
 * @return {(function(...[*])} Le logger (chaque argument sortira sur une ligne dans le log, le premier sera préfixé avec le moment)
 */
function getFileLogger (fileName, options = {}) {
  // on prépare le log
  const logDir = path.resolve(__dirname, '..', '..', 'log')
  // avec recursive, ça ne gêne pas si ça existe déjà (https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_fs_mkdir_path_options_callback)
  fs.mkdirSync(logDir, { recursive: true })
  const logfile = path.join(logDir, fileName + '.log')
  // cf https://nodejs.org/docs/latest-v14.x/api/fs.html#fs_file_system_flags
  const flag = options.append ? 'a' : 'w'
  const fd = fs.openSync(logfile, flag)
  return (...args) => {
    args.forEach((arg, i) => {
      if (!i) arg = `[${formatDateTime()}] ${arg}`
      fs.appendFileSync(fd, arg + '\n')
    })
  }
}

/**
 * Fonctions de log
 * @module log
 */

function logSerializer (logger, args) {
  const datePrefix = `[${formatDateTime()}] `
  const logValues = ([arg, ...others]) => {
    if (typeof arg === 'string') logger(datePrefix + arg, ...others)
    else logger(datePrefix, arg, ...others)
  }
  if (hasJsHandle(args)) {
    // on va envoyer ça à la console en arrière plan après décodage
    Promise.all(args.map(arg => {
      if (isJsHandle(arg)) {
        return arg.evaluate((arg) => {
          if (arg && arg.outerHTML) return arg.outerHTML
          if (arg instanceof Error) return arg.stack
          return arg
        })
      }
      return arg
    }))
      .then(logValues)
      .catch(logError)
  } else {
    // on écrit en sync
    logValues(args)
  }
}

/**
 * Envoie les arguments à console.log en préfixant avec la date courante
 * @param ...arg
 * @param others
 */
function log (...args) {
  logSerializer(console.log, args)
}
/**
 * Idem log, sauf si on est en mode quiet (ça ne fait rien dans ce cas)
 */
function logButQuiet () {
  if (!prefs.quiet) log.apply(null, arguments)
}
/**
 * Envoie les arguments à console.log en préfixant avec la date courante
 * @param ...arg
 * @param others
 */
function logError (...args) {
  logSerializer(console.error, args)
}
/**
 * Idem log si verbose, ne fait rien sinon
 */
function logIfVerbose () {
  if (prefs.verbose) log.apply(null, arguments)
}

module.exports = {
  getFileLogger,
  log,
  logButQuiet,
  logError,
  logIfVerbose
}
