import loadjs from 'loadjs'
import { scratchTraductionFr } from './outils'

/**
 * Nos applis prédéterminées avec la liste des fichiers à charger
 * @type {Object}
 */
const apps = {
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
 * Charge une animation iep dans un élément
 * @param {HTMLElement} elt
 * @param {string} xml Le script xml de l'animation ou son url absolue
 * @return {Promise<iepApp>} L'appli iep
 */
export async function iep (elt, xml) {
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
export async function mtgLoad (elt, svgOptions, mtgOptions) {
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
export async function prism () {
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

const loadScriptPromises = {}

/**
 * Charge un js (il faut passer son url, absolue ou relative au html parent
 * @param {string} src
 * @return {Promise<undefined, Error>}
 */
export function loadScript (src) {
  if (!loadScriptPromises[src]) {
    loadScriptPromises[src] = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = resolve
      script.onerror = reject
      script.src = src
      document.head.append(script)
    })
  }
  return loadScriptPromises[src]
}
