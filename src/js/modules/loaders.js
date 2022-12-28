/* global jQuery */
import loadjs from 'loadjs'
import { context } from './context.js'
import { UserFriendlyError } from './messages.js'
import { clavierLongueur } from './interactif/claviers/longueur_ANCIEN.js'
import { clavierTrigo } from './interactif/claviers/trigo.js'
import { clavierCollege } from './interactif/claviers/college.js'
import { clavierLycee } from './interactif/claviers/lycee.js'
import { clavierConfiguration } from './interactif/claviers/claviersUnites.js'
import { clavierCollege6eme } from './interactif/claviers/college6eme.js'
/**
 * Nos applis prédéterminées avec la liste des fichiers à charger
 * @type {Object}
 */
const apps = {
  giac: '/assets/externalJs/giacsimple.js',
  mathgraph: 'https://www.mathgraph32.org/js/mtgLoad/mtgLoad.min.js',
  prism: ['/assets/externalJs/prism.js', '/assets/externalJs/prism.css'],
  scratchblocks: 'assets/externalJs/scratchblocks-v3.5-min.js',
  slick: ['/assets/externalJs/semantic-ui/semantic.min.css', '/assets/externalJs/semantic-ui/semantic.min.js', '/assets/externalJs/semantic-ui/components/state.min.js']
}

/**
 * Charge une appli listée dans apps (pour mutualiser l'appel de loadjs)
 * @private
 * @param {string} name
 * @return {Promise<undefined, Error>} promesse de chargement
 */
async function load (name) {
  // on est dans une fct async, si l'une de ces deux lignes plantent ça va retourner une promesse rejetée avec l'erreur
  if (!apps[name]) throw UserFriendlyError(`application ${name} inconnue`)
  // cf https://github.com/muicss/loadjs
  try {
    if (!loadjs.isDefined(name)) await loadjs(apps[name], name, { returnPromise: true })
  } catch (error) {
    console.error(error)
    throw new UserFriendlyError(`Le chargement de ${name} a échoué`)
  }
  // loadjs.ready veut une callback, on emballe ça dans une promesse
  return new Promise((resolve, reject) => {
    loadjs.ready(name, {
      success: resolve,
      // si le chargement précédent a réussi on voit pas trop comment on pourrait arriver là, mais ça reste plus prudent de gérer l'erreur éventuelle
      error: () => reject(new UserFriendlyError(`Le chargement de ${name} a échoué`))
    })
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
        reject(UserFriendlyError(`xcas n’est toujours pas chargé après ${delay}s`))
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
  try {
    const { default: iepLoadPromise } = await import('instrumenpoche')
    const iepApp = await iepLoadPromise(elt, xml, { zoom: true, autostart: false })
    return iepApp
  } catch (error) {
    console.error(error)
    throw UserFriendlyError('Le chargement d’instrumenpoche a échoué')
  }
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
    if (typeof window.mtgLoad !== 'function') await load('mathgraph')
    if (typeof window.mtgLoad !== 'function') throw Error('mtgLoad n’existe pas')
    // cf https://www.mathgraph32.org/documentation/loading/global.html#mtgLoad
    // la syntaxe qui retourne une promesse fonctionne avec un import seulement (il faudrait mettre mathgraph dans nos dépendances et l'importer)
    // avec le chargement du js via un tag script il faut fournir une callback
    return new Promise((resolve, reject) => {
      window.mtgLoad(elt, svgOptions, mtgOptions, (error, mtgApp) => {
        if (error) return reject(error)
        if (mtgApp) return resolve(mtgApp)
        reject(Error('mtgLoad ne retourne ni erreur ni application'))
      })
    })
  } catch (error) {
    console.error(error)
    throw new UserFriendlyError('Erreur de chargement de Mathgraph')
  }
}

/**
 * Charge prism
 * @return {Promise<undefined>}
 */
export function loadPrism () {
  return load('prism')
}

/**
 * Charge scratchblocks
 * @return {Promise} qui peut échouer…
 */
export function loadScratchblocks () {
  return load('scratchblocks')
}

/**
 * Charge MathLive et personnalise les réglages
 * MathLive est chargé dès qu'un tag math-field est créé
 */
export async function loadMathLive () {
  const champs = document.getElementsByTagName('math-field')
  if (champs.length > 0) {
    await import('mathlive')
    for (const mf of champs) {
      mf.setOptions(clavierCollege)

      // Evite les problèmes de positionnement du clavier mathématique dans les iframes
      if (context.vue === 'exMoodle') {
        const events = ['focus', 'input']
        events.forEach(e => {
          mf.addEventListener(e, () => {
            setTimeout(() => { // Nécessaire pour que le calcul soit effectué après la mise à jour graphique
              const position = jQuery(mf).offset().top + jQuery(mf).outerHeight() + 'px'
              document.body.style.setProperty('--keyboard-position', position)
            })
          })
        })
      }

      if ((('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))) {
        // Sur les écrans tactiles, on met le clavier au focus (qui des écrans tactiles avec claviers externes ?)
        mf.setOptions({
          virtualKeyboardMode: 'onfocus'
        })
      }
      const listeParamClavier = mf.classList
      if (mf.className.indexOf('nite') !== -1 || mf.className.indexOf('nité') !== -1) {
        let jj = 0
        while (listeParamClavier[jj].indexOf('nites') === -1 & listeParamClavier[jj].indexOf('nités') === -1) { jj++ }
        const contenuUnites = listeParamClavier[jj].split('[')[1].split(']')[0].split(',')
        mf.setOptions(clavierConfiguration(contenuUnites))
      }
      if (mf.classList.contains('lycee')) {
        mf.setOptions(clavierLycee)
      }
      if (mf.classList.contains('college6eme')) {
        mf.setOptions(clavierCollege6eme)
      }
      if (mf.classList.contains('longueur')) {
        mf.setOptions(clavierLongueur)
      }
      if (mf.classList.contains('grecTrigo')) {
        mf.setOptions(clavierTrigo)
      }
      let style = 'font-size: 20px;'

      if (mf.classList.contains('inline')) {
        if (mf.classList.contains('nospacebefore')) {
          style += 'margin-left:5px;'
        } else {
          style += 'margin-left: 25px;'
        }
        style += ' display: inline-block; vertical-align: middle; padding-left: 5px; padding-right: 5px; border-radius: 4px; border: 1px solid rgba(0, 0, 0, .3);  '
        if (!mf.classList.contains('largeur10') && !mf.classList.contains('largeur25') && !mf.classList.contains('largeur50') && !mf.classList.contains('largeur75')) {
          style += ' width: 25%;'
        }
      } else {
        style += ' margin-top: 10px; padding: 10px; border: 1px solid rgba(0, 0, 0, .3); border-radius: 8px; box-shadow: 0 0 8px rgba(0, 0, 0, .2);'
      }
      if (mf.classList.contains('largeur10')) {
        style += ' width: 10%;'
      }
      if (mf.classList.contains('largeur25')) {
        style += ' width: 25%;'
      }
      if (mf.classList.contains('largeur50')) {
        style += ' width: 50%;'
      }
      if (mf.classList.contains('largeur75')) {
        style += ' width: 75%;'
      }
      mf.style = style
    }
  }
  // On envoie la hauteur de l'iFrame après le chargement des champs MathLive
  if (context.vue === 'exMoodle') {
    const hauteurExercice = window.document.querySelector('section').scrollHeight
    window.parent.postMessage({ hauteurExercice, iMoodle: parseInt(new URLSearchParams(window.location.search).get('iMoodle')) }, '*')
    const domExerciceInteractifReady = new window.Event('domExerciceInteractifReady', { bubbles: true })
    document.dispatchEvent(domExerciceInteractifReady)
  }
}
