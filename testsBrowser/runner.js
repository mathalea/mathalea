const fs = require('fs')
const path = require('path')

const prefs = require('prefs')
const { getDefaultPage } = require('helpers/browser')
const { log, logIfVerbose } = require('helpers/log')

const scenariosDir = path.resolve(__dirname, 'scenarios')
const tasksDir = path.resolve(__dirname, 'tasks')

/**
 * Retourne la liste des fichiers des dossiers scenarios & tasks
 * @return {{scenario: string[], task: string[]}}
 */
function getAllByType () {
  const prefixes = {
    scenario: scenariosDir,
    task: tasksDir
  }
  const result = {}
  Object.entries(prefixes).forEach(([type, prefix]) => {
    const length = prefix.length + 1 // on ajoute le séparateur
    result[type] = getAllFiles(prefix).map(file => file.substr(length))
  })
  return result
}

function getAllFiles (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    const fullEntry = path.join(dir, entry)
    if (fs.statSync(fullEntry).isDirectory()) {
      getAllFiles(fullEntry).forEach(file => files.push(file))
    } else if (/\.js$/.test(entry) && !/_datas/.test(entry)) {
      files.push(fullEntry)
    } // sinon on ignore
  })
  return files
}

async function runTask (task) {
  logIfVerbose(`Starting task ${task}`)
  const ok = await require('./tasks/' + task)()
  logIfVerbose(`End task ${task} ${ok ? 'OK' : 'KO'}`)
  return ok
}

/**
 * Lance le test d'un scenario
 * @param {string} scenario le chemin du js relativement à testsBrowser/scenarios
 * @return {Promise<void>}
 */
async function runScenario (scenario) {
  if (scenario.substr(-3) !== '.js') scenario += '.js'
  const fileToReq = path.resolve(scenariosDir, scenario)
  const test = require(fileToReq)
  if (typeof test !== 'function') throw Error(`${fileToReq} doit exporter une fonction (qui prendra une Page en argument)`)
  if (test.length < 1) throw Error(`${fileToReq} doit exporter une fonction avec au moins un argument (un objet Page)`)
  for (const browserName of prefs.browsers) {
    const page = await getDefaultPage({ browserName, continueOnErrors: prefs.relax })
    try {
      const promise = test(page)
      if (!(promise instanceof Promise)) throw Error(`${fileToReq} doit exporter un fonction qui retourne une promesse`)
      const result = await promise
      if (!result) throw Error(`Le test du scenario ${scenario} a échoué avec le navigateur ${browserName}`)
      log(`test scenario ${scenario} ok avec ${browserName}`)
    } catch (error) {
      console.log('Erreur dans runScenario\n', error)
      if (!prefs.headless) await page.pause()
      return false
    }
  }
  return true
}

/**
 * Lance le serveur webpack (résoud avec baseUrl)
 * @return {Promise<string>}
 */
function webpackServe () {
  return new Promise((resolve, reject) => {
    // cf https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
    const webpack = require('webpack')
    const Server = require('webpack-dev-server/lib/Server')
    const webpackConfig = require('../webpack.config')

    // on aurait aimé limiter la sortie en console avec ça
    webpackConfig.stats = 'errors-warnings'
    // mais c'est ignoré en cas d'usage via du code
    // cf https://webpack.js.org/configuration/stats/

    // on pourrait éteindre la console plus simplement avec
    const consoleLog = console.log
    console.log = () => {}
    // puis la remettre quand le serveur a démarré, sauf que c'est trop tôt, la compilation webpack est pas terminée

    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      open: false,
      openPage: undefined
    })
    const compiler = webpack(webpackConfig)
    const server = new Server(compiler, devServerOptions)
    const port = webpackConfig.devServer.port || 8080
    server.listen(port, '127.0.0.1', (error) => {
      console.log = consoleLog
      if (error) return reject(error)
      const baseUrl = `http://localhost:${port}/`
      log(`Server started on ${baseUrl}`)
      // on ajoute la méthode close
      webpackServe.close = () => new Promise((resolve, reject) => {
        server.close(error => {
          if (error) reject(error)
          else resolve('Serveur arrêté')
        })
      })
      // et on résoud notre promesse de lancement
      resolve(baseUrl)
    })
  })
}
webpackServe.close = () => Promise.reject(Error('Il faut démarrer le serveur avant de vouloir l’arrêter'))

module.exports = {
  getAllByType,
  getAllFiles,
  runScenario,
  runTask,
  webpackServe
}
