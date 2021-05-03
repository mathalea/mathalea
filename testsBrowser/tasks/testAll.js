/**
 * Lance le chargement de tous les exos, et log tout ce qui sort dans le console.error du navigateur
 * @module
 */
const path = require('path')

const prefs = require('prefs')
const { flushPage, getPage, initCurrentBrowser, loadUrl } = require('helpers/browser')
const { getFileLogger, log, logError } = require('helpers/log')
const { waitMs } = require('helpers/promise')

const { dictionnaireDesExercicesAleatoires, dictionnaireDesExercicesAMC } = require('../esm/dictionnaires')

const logDir = path.join(__dirname, '..', '..', 'log')

async function run () {
  // on peut nous lancer sur la prod (ou un autre serveur mathalea)
  const { baseUrl } = prefs
  const reBase = new RegExp(baseUrl)
  const isLocal = reBase.test.bind(reBase) // une fct qui teste son argument sur la regex précédente

  // boucle sur les browsers
  for (const browserName of prefs.browsers) {
    log(`Démarrage du test de chargement des exercices sur ${baseUrl} avec ${browserName}`)
    const errLogName = `loadAll.${browserName}.error`
    const fileLogError = getFileLogger(errLogName)
    const fileLogWarning = getFileLogger(`loadAll.${browserName}.warning`)
    const fileLogAccess = getFileLogger(`loadAll.${browserName}.access`)
    /**
     * Clique 5× sur Nouvelles données, avec un timeout de 5s
     * @private
     * @param {Page} page
     * @return {Promise<string>}
     */
    const retry5 = async (page) => {
      const urlTestees = []
      for (let nbTries = 0; nbTries < 5; nbTries++) {
        try {
          await page.click('text=Nouvelles données', { timeout: 5000 })
        } catch (error) {
          fileLogError(error.stack, `sur ${page.url()}`)
        }
        urlTestees.push(page.url())
      }
      return urlTestees.join(' | ')
    }

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

      // mon test
      let urlTestees = ''
      await page.click('text=Paramètres')
      if (await page.$('#form_sup0')) {
        const type = await page.getAttribute('input#form_sup0', 'type')
        const sup20 = await page.$('#form_sup20')
        let needTest = type === 'number'
        if (needTest && sup20) {
          const type2 = await page.getAttribute('input#form_sup20', 'type')
          needTest = type2 === 'number'
        }
        if (needTest) {
          const max = await page.getAttribute('input#form_sup0', 'max')
          let min = await page.getAttribute('input#form_sup0', 'min')
          // Pour les exercices où le this.sup correspond à la valeur maximale des nombres, on met le min à cette valeur
          if (max - min > 5) min = max
          let min2, max2
          if (sup20) {
            min2 = await page.getAttribute('input#form_sup20', 'min')
            max2 = await page.getAttribute('input#form_sup20', 'max')
          }
          for (let i = min; i <= max; i++) {
            await page.fill('#form_sup0', i.toString())
            if (sup20) {
              // faut une 2e boucle
              for (let j = min2; j <= max2; j++) {
                await page.fill('#form_sup20', j.toString())
                urlTestees += await retry5(page)
              }
            } else {
              urlTestees += await retry5(page)
            }
          }
        } // else pas de clic sur Nouvelles données, ça correspond à quel type d'exo ?
      }

      const result = await flushPage(page, browser, { maxLoads: 10, processFailureAsError: true })
      nbExos++
      page = result.page
      const { errors, warnings } = result
      if (errors.length) {
        nbErr++
        const s = errors.length > 1 ? 's' : ''
        logError(`Il y a eu ${errors.length} erreur${s} :\n${errors.join('\n')}`)
        fileLogError(`${errors.length} erreur${s} sur l’exo ${exo} avec ${urlTestees}`, ...errors)
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

  return true
}

module.exports = run
