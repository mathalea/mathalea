/**
 * Lance tous les tests scenarios/**.js
 * @module
 */
const path = require('path')

const { getAllFiles, runScenario } = require('run')
const { log, logError } = require('helpers/log')

const scenariosDir = path.join(__dirname, '..', 'scenarios')

module.exports = async function run () {
  let allOk = true
  for (const jsFile of getAllFiles(scenariosDir)) {
    try {
      await runScenario(jsFile)
      log(`test ${jsFile} OK`)
    } catch (error) {
      logError(error)
      log(`test ${jsFile} KO`)
      allOk = false
    }
  }
  return allOk
}
