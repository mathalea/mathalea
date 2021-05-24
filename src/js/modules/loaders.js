import loadjs from 'loadjs'

/**
 * Nos applis prédéterminées avec la liste des fichiers à charger
 * @type {Object}
 */
const apps = {
  giac: '/assets/externalJs/giacsimple.js',
  mathgraph: 'https://www.mathgraph32.org/js/mtgLoad/mtgLoad.min.js',
  prism: ['/assets/externalJs/prism.js', '/assets/externalJs/prism.css'],
  scratchblocks: 'assets/externalJs/scratchblocks-v3.5-min.js'
}

/**
 * Charge une appli listée dans apps (pour mutualiser l'appel de loadjs)
 * @private
 * @param {string} name
 * @return {Promise<undefined, Error>} promesse de chargement
 */
async function load (name) {
  // on est dans une fct async, si l'une de ces deux lignes plantent ça va retourner une promesse rejetée avec l'erreur
  if (!apps[name]) throw Error(`app ${name} inconnue`)
  // cf https://github.com/muicss/loadjs
  if (!loadjs.isDefined(name)) await loadjs(apps[name], name, { returnPromise: true })
  return new Promise(resolve => {
    // loadjs.ready veut une callback
    loadjs.ready(name, resolve)
  })
}

/**
 * Attend que xcas soit chargé (max 60s), car giacsimple lance le chargement du wasm|js suivant les cas
 * @return {Promise<undefined,Error>} rejette en cas de timeout
 */
function waitForGiac () {
  /* global Module */
  if (typeof Module !== 'object' || typeof Module.ready !== 'boolean') return Promise.reject(Error('Le loader giac n’a pas été correctement appelé'))
  const timeout = 60 // en s
  const tsStart = Date.now()
  return new Promise((resolve, reject) => {
    const monInterval = setInterval(() => {
      const delay = Math.round((Date.now() - tsStart) / 1000)
      if (Module.ready === true) {
        clearInterval(monInterval)
        resolve()
      } else if (delay > timeout) {
        clearInterval(monInterval)
        reject(Error(`xcas toujours pas chargé après ${delay}s`))
      }
    }, 500)
  })
}

/**
 * Charge giac
 * @return {Promise} qui peut échouer…
 */
export async function loadGiac () {
  await load('giac')
  // attention, le load précédent résoud la promesse lorsque giacsimple est chargé,
  // mais lui va charger le webAssembly ou js ensuite, d'où le besoin de waitForGiac
  await waitForGiac()
}

/**
 * Charge une animation iep dans un élément
 * @param {HTMLElement} elt
 * @param {string} xml Le script xml de l'animation ou son url absolue
 * @return {Promise<iepApp>} L'appli iep
 */
export async function loadIep (elt, xml) {
  const { default: iepLoadPromise } = await import('instrumenpoche')
  const iepApp = await iepLoadPromise(elt, xml, { zoom: true, autostart: false })
  return iepApp
}

/**
 * Charge mathgraph dans l'élément fourni
 * @param {HTMLElement} elt
 * @param {Object} svgOptions Options du svg créé (taille et id, cf {@link https://www.mathgraph32.org/documentation/loading/global.html#mtgLoad})
 * @param {Object} mtgOptions Options pour l'appli (boutons, menus, etc., cf {@link https://www.mathgraph32.org/documentation/loading/global.html#MtgOptions}
 * @return {Promise<MtgApp>} l'appli mathgraph {@link https://www.mathgraph32.org/documentation/loading/MtgApp.html}
 */
export async function loadMG32 (elt, svgOptions, mtgOptions) {
  try {
    await load('mathgraph')
    if (typeof window.mtgLoad !== 'function') throw Error('mtgLoad n’existe pas')
    // cf https://www.mathgraph32.org/documentation/loading/global.html#mtgLoad
    const mtgApp = await window.mtgLoad(elt, svgOptions, mtgOptions)
    return mtgApp
  } catch (error) {
    console.error(error)
    return Error('Erreur de chargement de Mathgraph')
  }
}

/**
 * Charge prism
 * @return {Promise<undefined>}
 */
export async function loadPrism () {
  try {
    await load('prism')
  } catch (error) {
    console.error(error)
    return Error('Erreur de chargement de prism')
  }
}

/**
 * Charge scratchblocks
 * @return {Promise} qui peut échouer…
 */
export async function loadScratchblocks () {
  await load('scratchblocks')
}

/**
 * Charge MathLive et personnalise les réglages
 * MathLive est chargé dès qu'un tag math-field est créé
 */
export async function loadMathLive () {
  const champs = document.getElementsByTagName('math-field')
  if (champs.length > 0) {
    const { default: MathfieldElement } = await import('mathlive')
    // Ne pourrait-on pas donner un style par défaut ?
    for (const mf of champs) {
      mf.setOptions({
        inlineShortcuts: {
          '*': { mode: 'math', value: '\\times' }
        },
        virtualKeyboards: 'numeric roman'
      })
      mf.style = 'font-size: 20px; padding: 10px; border: 1px solid rgba(0, 0, 0, .3); border-radius: 8px; box-shadow: 0 0 8px rgba(0, 0, 0, .2);}'
    }
  }
}
