/** @module télécharger fichier */

/**
 * @author Rémi Angot
 * @param {string} text contenu du fichier
 * @param {string} filename nom du fichier
 */
export function telechargeFichier (text, filename) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()

  document.body.removeChild(element)
}
