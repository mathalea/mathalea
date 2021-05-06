import loadjs from 'loadjs'

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
 * Charge prism
 * @return {Promise<undefined>}
 */
export function prism () {
  return new Promise((resolve, reject) => {
    // déjà défini veut pas dire chargé, seulement que la demande de chargement a déjà été faite, on retourne la promesse de résolution
    if (loadjs.isDefined('prism')) return loadjs.ready('prism')
    loadjs(['/assets/externalJs/prism.js', '/assets/externalJs/prism.css'], 'prism', {
      success: resolve,
      error: function (pathNotFound) {
        const error = Error('Pb de chargement de prism')
        console.error(error, pathNotFound)
        reject(error)
      }
    })
  })
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
