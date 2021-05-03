/**
 * Module principal qui gère l'enchaînement des étapes (init, getScenarios, runScenarios)
 * @module start
 */
// Si le process node ne sort pas alors qu'il n'y a plus de navigateur ouvert (en cas d'échec d'un test ça reste ouvert exprès)
// on peut ajouter ça, faut le mettre en premier (installer le module avant)
// const whyIsNodeRunning = require('why-is-node-running')

const path = require('path')

// pour faire des require relatifs à ce dossier testsBrowser, pour pouvoir copier/coller nos require sans adpater le nb de ../../..
// on met notre dossier en premier, et on refait la liste
let newPath = __dirname
// et on ajoute les paths existants éventuels
if (process.env.NODE_PATH) {
  newPath += path.delimiter + process.env.NODE_PATH
}
process.env.NODE_PATH = newPath
// reste à regénérer les paths dans lesquels require fouine
require('module')._initPaths()
// fin cuisine de path, reste à configurer l'IDE pour qu'il comprenne
// par ex https://blog.jetbrains.com/webstorm/2020/07/configuring-the-style-of-imports-in-javascript-and-typescript/
// pour webstorm, dans settings editor / codeStyle / js => "cocher use paths relative to…" puis marquer le dossier testsBrowser comme resource

// maintenant on peut être relatif à ce dossier
const init = require('init')
const prefs = require('prefs')
const { runScenario, runTask } = require('runner')
const { log, logError } = require('helpers/log')

// on wrap tout le code dans une promesse pour choper toutes les exceptions dans le même catch
Promise.resolve()
  .then(init)
  .then(() => {
    if (prefs.task) return runTask(prefs.task)
    if (prefs.scenario) return runScenario(prefs.scenario)
    log('On a rien à faire, ça aurait dû planter dans l’init…')
  }).then((result) => {
    if (!prefs.quiet) log(`Fin des tests ${result ? 'OK' : 'KO'}`)
    if (result) process.exit() // il traîne souvent des process playwright, on cherche pas plus loin
  }).catch(async (error) => {
    // si c'est une consoleError on attend "un peu", car ça écrit dans notre console en tâche de fond
    // avec ou sans stacktrace
    logError(prefs.quiet ? error.message : error)
    // et quand même une sortie sur stdout (au cas où stderr irait ailleurs)
    log('Fin des tests KO')
  // }).then(() => {
  //   whyIsNodeRunning()
  })
