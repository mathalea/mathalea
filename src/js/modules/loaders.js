/* global jQuery */
import loadjs from 'loadjs'
import { context } from './context'
import { UserFriendlyError } from './messages'

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
    await load('mathgraph')
    if (typeof window.mtgLoad !== 'function') throw Error('mtgLoad n’existe pas')
    // cf https://www.mathgraph32.org/documentation/loading/global.html#mtgLoad
    const mtgApp = await window.mtgLoad(elt, svgOptions, mtgOptions)
    return mtgApp
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
      mf.setOptions({
        customVirtualKeyboardLayers: collegeKeyboardLayer,
        customVirtualKeyboards: collegeKeyboard,
        virtualKeyboards: 'collegeKeyboard roman',
        inlineShortcuts: {
          '*': { mode: 'math', value: '\\times' },
          '.': { mode: 'math', value: ',' },
          '%': { mode: 'math', value: '\\%' }
        },
        // virtualKeyboards: 'numeric roman',
        virtualKeyboardMode: 'manual'
        // "auto": on touch-enabled devices, show the virtual keyboard panel when the mathfield is focused, otherwise, don’t show it.
        // "manual": a toggle button to control the virtual keyboard panel is displayed in the mathfield
        // "onfocus": the virtual keyboard panel is displayed when the mathfield is focused
        // "off": never show the virtual keyboard panel
      })

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
      if (mf.classList.contains('longueur')) {
        mf.setOptions({
          customVirtualKeyboardLayers: longueursKeyboardLayer,
          customVirtualKeyboards: longueursKeyboard,
          virtualKeyboards: 'longueursKeyboard roman',
          inlineShortcuts: {
            mm: { mode: 'math', value: '\\operatorname{mm}' },
            cm: { mode: 'math', value: '\\operatorname{cm}' },
            dm: { mode: 'math', value: '\\operatorname{dm}' },
            m: { mode: 'math', value: '\\operatorname{m}' },
            dam: { mode: 'math', value: '\\operatorname{dam}' },
            hm: { mode: 'math', value: '\\operatorname{hm}' },
            km: { mode: 'math', value: '\\operatorname{km}' },
            '*': { mode: 'math', value: '\\times' },
            '.': { mode: 'math', value: ',' }
          }
        })
      }
      if (mf.classList.contains('grecTrigo')) {
        mf.setOptions({
          customVirtualKeyboardLayers: grecTrigoKeyboardLayer,
          customVirtualKeyboards: grecTrigoKeyboard,
          virtualKeyboards: 'grecTrigoKeyboard roman',
          inlineShortcuts: {
            alpha: { mode: 'math', value: '\\alpha' },
            beta: { mode: 'math', value: '\\beta' },
            gamma: { mode: 'math', value: '\\gamma' },
            delta: { mode: 'math', value: '\\delta' },
            epsilon: { mode: 'math', value: '\\epsilon' },
            theta: { mode: 'math', value: '\\theta' },
            omega: { mode: 'math', value: '\\omega' },
            lambda: { mode: 'math', value: '\\lambda' },
            '*': { mode: 'math', value: '\\times' },
            '.': { mode: 'math', value: ',' },
            cos: { mode: 'math', value: 'cos(' },
            sin: { mode: 'math', value: 'sin(' },
            tan: { mode: 'math', value: 'tan(' }
          }
        })
      }
      let style = 'font-size: 20px;'

      if (mf.classList.contains('inline')) {
        if (mf.classList.contains('nospacebefore')) {
          style += 'margin-left:5px;'
        } else {
          style += 'margin-left: 25px;'
        }
        style += ' display: inline-block; padding-left: 5px; padding-right: 5px; border-radius: 4px; border: 1px solid rgba(0, 0, 0, .3);  '
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

// Définit un clavier personnalisé cf https://cortexjs.io/mathlive/guides/virtual-keyboards/
const collegeKeyboardLayer = {
  collegeLayer: {
    styles: '',
    rows: [
      [
        { latex: 'a' },
        { latex: 'x' },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        // Will display the label using the system font. To display
        // with the TeX font, use:
        // { class: "tex", label: "7", key: "7" },
        // or
        // { latex: "7"},
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { latex: '\\div' },
        { class: 'separator w5' },
        {
          class: 'tex small',
          label: '<span><i>x</i>&thinsp;²</span>',
          insert: '$$#@^{2}$$'
        },
        {
          class: 'tex small',
          label: '<span><i>x</i><sup>&thinsp;<i>3</i></sup></span>',
          insert: '$$#@^{3}$$'
        },
        {
          class: 'small',
          latex: '\\sqrt{#0}',
          insert: '$$\\sqrt{#0}$$'
        },
        {
          class: 'small',
          latex: '\\times10^{#0}',
          insert: '$$\\times10^#0$$'
        }
      ],
      [
        { class: 'tex', latex: 'b' },
        { class: 'tex', latex: 'y' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        { latex: 'f' },
        {
          class: 'small',
          latex: '#0^{#1}',
          insert: '$$#0^{#1}$$'
        }
      ],
      [
        { class: 'tex', label: '<i>c</i>' },
        { class: 'tex', label: '<i>z</i>' },
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: ';', key: ';' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' },
        { label: '%', key: '%' }
      ],
      [
        { latex: '(' },
        { latex: ')' },

        { class: 'separator w5' },
        { label: '0', key: '0' },
        { latex: ',' },
        { latex: '\\pi' },
        { latex: '+' },
        { class: 'separator w5' },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
          command: ['performWithFeedback', 'moveToPreviousChar']
        },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
          command: ['performWithFeedback', 'moveToNextChar']
        },
        {
          class: 'action font-glyph',
          label: '&#x232b;',
          command: ['performWithFeedback', 'deleteBackward']
        },
        {
          class: 'action font-glyph',
          label: '&#10006;',
          command: ['toggleVirtualKeyboard', 'toggleVirtualKeyboard']
        }
      ]
    ]
  }
}

const collegeKeyboard = {
  collegeKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique', // Tooltip when hovering over the label
    layer: 'collegeLayer'
  }
}
const longueursKeyboardLayer = {
  longueursLayer: {
    styles: '',
    rows: [
      [
        { label: 'mm', latex: '\\operatorname{mm}' },
        { label: 'cm', latex: '\\operatorname{cm}' },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { latex: '\\div' },
        { class: 'separator w5' },
        {
          class: 'tex small',
          label: '<span><i>x</i>&thinsp;²</span>',
          insert: '$$#@^{2}$$'
        },
        {
          class: 'tex small',
          label: '<span><i>x</i><sup>&thinsp;<i>3</i></sup></span>',
          insert: '$$#@^{3}$$'
        },
        {
          class: 'small',
          latex: '\\sqrt{#0}',
          insert: '$$\\sqrt{#0}$$'
        }
      ],
      [
        { label: 'dm', latex: '\\operatorname{dm}' },
        { label: 'm', latex: '\\operatorname{m}' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        { latex: 'f' }
      ],
      [
        { label: 'dam', latex: '\\operatorname{dam}' },
        { label: 'hm', latex: '\\operatorname{hm}' },
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: ';', key: ';' },
        { label: 'oui', key: 'oui' },
        { label: 'non', key: 'non' }
      ],
      [
        { label: 'km', latex: '\\operatorname{km}' },

        { class: 'separator w15' },
        { label: '0', key: '0' },
        { latex: ',' },
        { latex: '\\pi' },
        { latex: '+' },
        { class: 'separator w5' },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
          command: ['performWithFeedback', 'moveToPreviousChar']
        },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
          command: ['performWithFeedback', 'moveToNextChar']
        },
        {
          class: 'action font-glyph',
          label: '&#x232b;',
          command: ['performWithFeedback', 'deleteBackward']
        }
      ]
    ]
  }
}

const longueursKeyboard = {
  longueursKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (longueurs)', // Tooltip when hovering over the label
    layer: 'longueursLayer'
  }
}
const grecTrigoKeyboardLayer = {
  grecTrigoLayer: {
    styles: '',
    rows: [
      [
        { label: '\\alpha', latex: '\\alpha' },
        { label: '\\beta', latex: '\\beta' },
        { class: 'separator w5' },
        { label: '7', key: '7' },
        { label: '8', key: '8' },
        { label: '9', key: '9' },
        { latex: '\\div' },
        { class: 'separator w5' },
        {
          class: 'tex small',
          label: '<span><i>x</i>&thinsp;²</span>',
          insert: '$$#@^{2}$$'
        },
        {
          class: 'tex small',
          label: '<span><i>x</i><sup>&thinsp;<i>3</i></sup></span>',
          insert: '$$#@^{3}$$'
        },
        {
          class: 'small',
          latex: '\\sqrt{#0}',
          insert: '$$\\sqrt{#0}$$'
        }
      ],
      [
        { label: '\\gamma', latex: '\\gamma' },
        { label: '\\delta', latex: '\\delta' },
        { class: 'separator w5' },
        { label: '4', latex: '4' },
        { label: '5', key: '5' },
        { label: '6', key: '6' },
        { latex: '\\times' },
        { class: 'separator w5' },
        { class: 'small', latex: '\\frac{#0}{#0}' },
        { label: '=', key: '=' },
        { latex: 'f' }
      ],
      [
        { label: '\\epsilon', latex: '\\epsilon' },
        { label: '\\theta', latex: '\\theta' },
        { class: 'separator w5' },
        { label: '1', key: '1' },
        { label: '2', key: '2' },
        { label: '3', key: '3' },
        { latex: '-' },
        { class: 'separator w5' },
        { label: 'cos', key: 'cos(' },
        { label: 'sin', key: 'sin(' },
        { label: 'tan', key: 'tan(' }
      ],
      [
        { label: '\\lambda', latex: '\\lambda' },
        { label: '\\omega', latex: '\\omega' },
        { class: 'separator w5' },
        { label: '0', key: '0' },
        { latex: ',' },
        { latex: '\\pi' },
        { latex: '+' },
        { class: 'separator w5' },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
          command: ['performWithFeedback', 'moveToPreviousChar']
        },
        {
          class: 'action',
          label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
          command: ['performWithFeedback', 'moveToNextChar']
        },
        {
          class: 'action font-glyph',
          label: '&#x232b;',
          command: ['performWithFeedback', 'deleteBackward']
        }
      ]
    ]
  }
}

const grecTrigoKeyboard = {
  grecTrigoKeyboard: {
    label: 'Maths', // Label displayed in the Virtual Keyboard Switcher
    tooltip: 'Clavier mathématique (lettres grecTrigoques)', // Tooltip when hovering over the label
    layer: 'grecTrigoLayer'
  }
}
