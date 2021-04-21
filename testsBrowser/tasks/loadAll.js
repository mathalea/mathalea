/**
 * Lance le chargement de tous les exos, et log tout ce qui sort dans le console.error du navigateur
 * @module
 */
const path = require('path')

const prefs = require('prefs')
const { webpackServe } = require('runner')
const { flushPage, getPage, initCurrentBrowser, loadUrl } = require('helpers/browser')
const { getFileLogger, log, logError } = require('helpers/log')
const { waitMs } = require('helpers/promise')

const { dictionnaireDesExercicesAleatoires, dictionnaireDesExercicesAMC } = require('../esm/dictionnaires')

const logDir = path.join(__dirname, '..', '..', 'log')

async function run () {
  // on peut nous lancer sur la prod (ou un autre serveur mathalea)
  let { baseUrl } = prefs
  let closeServer
  if (!baseUrl) {
    baseUrl = await webpackServe()
    closeServer = webpackServe.close
  }
  const reBase = new RegExp(baseUrl)
  const isLocal = reBase.test.bind(reBase) // une fct qui teste son argument sur la regex précédente

  // boucle sur les browsers
  for (const browserName of prefs.browsers) {
    log(`Démarrage du test de chargement des exercices sur ${baseUrl} avec ${browserName}`)
    const errLogName = `loadAll.${browserName}.error`
    const fileLogError = getFileLogger(errLogName)
    const fileLogWarning = getFileLogger(`loadAll.${browserName}.warning`)
    const fileLogAccess = getFileLogger(`loadAll.${browserName}.access`)

    // pour ajouter le listener après la création de la page (il en a besoin)
    const addRequestListener = (page) => {
      // on flique tous les appels, pour détecter ceux qui ne sont pas locaux (suffira de faire un grep http dans le log)
      page.on('request', (request) => {
        let url = request.url()
        if (isLocal(url)) url = url.substr(baseUrl.length)
        fileLogAccess(url)
      })
    }

    let nbErr = 0
    let nbExos = 0
    // on initialise browser & page
    const browser = await initCurrentBrowser(browserName)
    let page = await getPage(browser)
    addRequestListener(page)

    // reste à boucler sur les exos
    let exos = Object.keys(dictionnaireDesExercicesAleatoires).concat(Object.keys(dictionnaireDesExercicesAMC))
    // avec éventuellement des bornes
    const { skip, limit } = prefs
    if (limit) exos = exos.slice(skip, skip + limit)
    else if (skip) exos = exos.slice(skip)

    // boucle sur les exos
    for (const exo of exos) {
      const url = `${baseUrl}exercice.html?ex=${exo}`
      if (prefs.verbose) log(`Chargement de l’exo ${exo} avec ${browserName} sur ${url}`)
      const nbTries = await loadUrl(page, url)
      if (nbTries > 1) log(`${url} chargée après ${nbTries} essais${page.failures.length ? ` (mais il reste ${page.failures.length} load failures)` : ''}`)

      // ça c'est pour vérifier que la récupération des erreurs fonctionne bien, on en crée
      // (on peut aussi le tester en ajoutant du console.error dans une des pages ou un des js de build/)
      // await page.evaluate(() => console.error('error string'))
      // await page.evaluate(() => console.error(Error('real error')), { a: 42 })

      const result = await flushPage(page, browser, { maxLoads: 10, processFailureAsError: true })
      nbExos++
      page = result.page
      const { errors, warnings } = result
      if (errors.length) {
        nbErr++
        const s = errors.length > 1 ? 's' : ''
        logError(`Il y a eu ${errors.length} erreur${s} :\n${errors.join('\n')}`)
        fileLogError(`${errors.length} erreur${s} sur l’exo ${exo}`, ...errors)
      }
      if (warnings.length) {
        const s = warnings.length > 1 ? 's' : ''
        log(`Il y a eu ${warnings.length} warning${s} :\n${warnings.join('\n')}`)
        fileLogWarning(`${warnings.length} warning${s} sur l’exo ${exo}`, ...warnings)
      }
      await waitMs(100)
    }
    const logFile = path.resolve(logDir, `${errLogName}.log`)
    log(`Fin du test de chargement des exercices sur ${baseUrl} avec ${browserName} : ${nbExos} exos chargés (dont ${nbErr} avec des erreurs en console, enregistrées dans ${logFile})`)
  } // boucle browsers

  // fermeture du serveur éventuel
  if (closeServer) await closeServer()

  return true
}

module.exports = run
