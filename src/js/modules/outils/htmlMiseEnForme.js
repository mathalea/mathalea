/** @module mise en forme HTML */

import { context } from '../context'
import { dataTaille } from './taille'
import { texEnumerate } from './texMiseEnForme'

/**
*  Renvoie une liste HTML à partir d'une liste
*
* @param liste une liste de questions
* @param spacing interligne (line-height en css)
* @author Rémi Angot
*/
export function htmlEnumerate (liste, spacing, classe = 'question', id = '', tailleDiaporama = 1, classeOl) {
  let result = ''
  // Pour diapCorr, on numérote les questions même si un exercice n'en comporte qu'une
  if (liste.length > 1 || context.vue === 'diapCorr') {
    (spacing > 1) ? result = `<ol style="line-height: ${spacing};" ${classeOl ? `class = ${classeOl}` : ''}>` : result = `<ol ${classeOl ? `class = ${classeOl}` : ''}>`
    for (const i in liste) {
      result += `<li class="${classe}" ${id ? 'id="' + id + i + '"' : ''} ${dataTaille(tailleDiaporama)}>` + liste[i].replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....') + '</li>' // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    }
    result += '</ol>'
  } else if (liste.length === 1) {
    // Pour garder la même hiérarchie avec une ou plusieurs questions
    // On met ce div inutile comme ça le grand-père de la question est toujours l'exercice
    // Utile pour la vue can
    (spacing > 1) ? result = `<div><div class="${classe}" ${id ? 'id="' + id + '0"' : ''} style="line-height: ${spacing}; margin-bottom: 20px" ${dataTaille(tailleDiaporama)}>` : result = `<div><div class="${classe}" ${id ? 'id="' + id + '0"' : ''}>`
    result += liste[0].replace(/\\dotfill/g, '..............................').replace(/\\not=/g, '≠').replace(/\\ldots/g, '....') // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    result += '</div></div>'
  }
  return result
}

/**
  * Renvoie une liste HTML ou LaTeX suivant le contexte
  *
  * @param liste une liste de questions
  * @param spacing interligne (line-height en css)
  * @author Rémi Angot
  */
export function enumerate (liste, spacing) {
  if (context.isHtml) {
    return htmlEnumerate(liste, spacing)
  } else {
    return texEnumerate(liste, spacing)
  }
}

/**
  * Renvoie une liste sans puce ni numéro HTML ou LaTeX suivant le contexte
  *
  * @param liste une liste de questions
  * @param spacing interligne (line-height en css)
  * @author Sébastien Lozano
  */
export function enumerateSansPuceSansNumero (liste, spacing) {
  if (context.isHtml) {
    // return htmlEnumerate(liste,spacing)
    // for (let i=0; i<liste.length;i++) {
    // liste[i]='> '+liste[i];
    // }
    return htmlLigne(liste, spacing)
  } else {
    // return texEnumerate(liste,spacing)
    return texEnumerate(liste, spacing).replace('\\begin{enumerate}', '\\begin{enumerate}[label={}]')
  }
}

/**
  *  Renvoie un paragraphe HTML à partir d'un string
  *
  * @param string
  * @author Rémi Angot
  */
export function htmlParagraphe (texte, retourCharriot) {
  if (texte.length > 1) {
    if (retourCharriot) {
      return `\n<p>${texte}</p>\n\n`
    } else {
      return `\n${texte}\n\n`
    }
  } else {
    return ''
  }
}

/**
  *  Renvoie un div HTML à partir d'une liste découpée par des sauts de ligne
  *
  * @param liste une liste de questions
  * @param spacing interligne (line-height en css)
  * @author Rémi Angot
  */
export function htmlLigne (liste, spacing, classe = 'question') {
  let result = '<div>'
  const spacingTxt = (spacing > 1) ? `style="line-height: ${spacing};"` : ''
  // Pour garder la même hiérarchie avec listeDeQuestionsToContenu
  // On met ce div inutile comme ça le grand-père de la question est toujours l'exercice
  // Utile pour la vue can
  for (const i in liste) {
    result += '\t' + `<div ${spacingTxt}  class="${classe}">` + liste[i].replace(/\\dotfill/g, '...') + '</div>' // .replace(/~/g,' ') pour enlever les ~ mais je voulais les garder dans les formules LaTeX donc abandonné
    // .replace(/\\\\/g,'<br>') abandonné pour supporter les array
  }
  result += '</div></div>\n'

  return result
}
/**
* Renvoie la consigne en titre 4
* @author Rémi Angot
*/
export function htmlConsigne (consigne) {
  if (consigne) return '<h4>' + consigne + '</h4>\n\n'
  else return ''
}
