/** @module popups */

import { context } from '../context'
import { modalImage, modalTexteLong } from './modaux'

/**
 * Crée un popup html avec un icon info, éventuellement avec du contenu LaTeX
 * @param {string} texte
 * @param {string} titrePopup
 * @param {string} textePopup
 * @author Sébastien Lozano
 */
export function katexPopup (texte, titrePopup, textePopup) {
  'use strict'
  let contenu = ''
  if (context.isHtml) {
    contenu = '<div class="mini ui right labeled icon button katexPopup"><i class="info circle icon"></i> ' + texte + '</div>'
    contenu += '<div class="ui special popup" >'
    if (titrePopup !== '') {
      contenu += '<div class="header">' + titrePopup + '</div>'
    }
    contenu += '<div>' + textePopup + '</div>'
    contenu += '</div>'
    return contenu
  } else {
    return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
  }
}
export function katexPopupTest (texte, titrePopup, textePopup) {
  'use strict'
  let contenu = ''
  if (context.isHtml) {
    contenu = '<div class="ui right label katexPopup">' + texte + '</div>'
    contenu += '<div class="ui special popup" >'
    if (titrePopup !== '') {
      contenu += '<div class="header">' + titrePopup + '</div>'
    }
    contenu += '<div>' + textePopup + '</div>'
    contenu += '</div>'
    return contenu
  } else {
    return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
  }
}
/**
* Crée un popup html avec une icône info ou un bouton modal suivant le type donné :0=Latex inline compatible, 1=bouton modal texte long, 2=bouton modal image.
* ATTENTION la variable texte doit exactement correspondre au nom de l'image sans l'extension  et etre au format png
* @param {number} numero
* @param {number} type
* @param {string} titrePopup = Le titre du texte dévoilé par le bouton
* @param {string} texte = Ce qu'il y a sur le bouton qui doit exactement etre le nom de l'image sans l'extension
* @param {string} textePopup = Le texte dévoilé par le bouton ou l'url de l'image.
* @author Jean-claude Lhote & Rémi Angot & Sebastien Lozano
**/

export function katexPopup2 (numero, type, texte, titrePopup, textePopup) {
  'use strict'
  switch (type) {
    case 0:
      return katexPopupTest(texte, titrePopup, textePopup)
    case 1:
      if (context.isHtml) {
        return `${texte}` + modalTexteLong(numero, `${titrePopup}`, `${textePopup}`, `${texte}`, 'info circle')
      } else {
        return `\\textbf{${texte}} \\footnote{\\textbf{${titrePopup}} ${textePopup}}`
      }
    case 2:
      if (context.isHtml) {
        return `${texte}` + modalImage(numero, textePopup, `${titrePopup}`, `${texte}`)
      } else {
        return `\\href{https://coopmaths.fr/images/${texte}.png}{\\textcolor{blue}{\\underline{${texte}}} } \\footnote{\\textbf{${texte}} ${textePopup}}`
      }
  }
}
