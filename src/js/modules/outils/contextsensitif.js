import { context } from '../context'

/**
 * Renvoie un espace insécable pour le mode texte suivant la sortie html ou Latex.
 * @author Jean-Claude Lhote
 */
export function sp (nb = 1) {
  let s = ''
  for (let i = 0; i < nb; i++) {
    if (context.isHtml) s += '&nbsp;'
    else s += '\\,'
  }
  return s
}
/**
* Centre un texte
*
* @author Rémi Angot
*/
export function texteCentre (texte) {
  if (context.isHtml) {
    return `<p style="text-align: center">${texte}</p>`
  } else {
    return `\\begin{center}
  ${texte}
  \\end{center}`
  }
}
/**
  * Met en couleur et en gras
  *
  * Met en couleur et gras un texte. JCL dit : "S'utilise entre $ car utilise des commandes qui fonctionnent en math inline"
  * @param {string} texte à mettre en couleur
  * @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
  * @author Rémi Angot
  */
export function miseEnEvidence (texte, couleur = '#f15929') {
  if (context.isHtml) {
    return `\\mathbf{{\\color{${couleur}}{${texte}}}}`
  } else {
    if (couleur[0] === '#') {
      return `\\mathbf{{\\color[HTML]{${couleur.replace('#', '')}}${texte}}}`
    } else {
      return `\\mathbf{{\\color{${couleur.replace('#', '')}}${texte}}}`
    }
  }
}

/**
  * Met en couleur un texte
  * @param {string} texte à mettre en couleur
  * @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
  * @author Rémi Angot
  */
export function texteEnCouleur (texte, couleur = '#f15929') {
  if (context.isHtml) {
    return `<span style="color:${couleur};">${texte}</span>`
  } else {
    if (couleur[0] === '#') {
      return `{\\color[HTML]{${couleur.replace('#', '')}}${texte}}`
    } else {
      return `{\\color{${couleur.replace('#', '')}}${texte}}`
    }
  }
}
/**
* Met en couleur et gras un texte. JCL dit : "Ne fonctionne qu'en dehors de $....$". Utiliser miseEnEvidence si $....$.
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @author Rémi Angot
*/
export function texteEnCouleurEtGras (texte, couleur = '#f15929') {
  if (context.isHtml) {
    return `<span style="color:${couleur};font-weight: bold;">${texte}</span>`
  } else {
    if (couleur[0] === '#') {
      return `{\\bfseries \\color[HTML]{${couleur.replace('#', '')}}${texte}}`
    } else {
      return `{\\bfseries \\color{${couleur.replace('#', '')}}${texte}}`
    }
  }
}
/**
* Met gras un texte
* @param {string} texte à mettre en gras
* @author Rémi Angot
*/
export function texteGras (texte) {
  if (context.isHtml) {
    return `<b>${texte}</b>`
  } else {
    return `\\textbf{${texte}}`
  }
}
/**
* Affiche un lien vers une URL
* @param {string} texte à afficher
* @param {string} URL
* @author Rémi Angot
*/
export function href (texte, lien) {
  if (context.isHtml) {
    return `<a target="_blank" href=${lien}> ${texte} </a>`
  } else {
    return `\\href{${lien}}{${texte}}`
  }
}
/**
* Retourne un environnement LaTeX itemize à partir d'une liste
* @author Rémi Angot
*/
export function itemize (tableauDeTexte) {
  let texte = ''
  if (context.isHtml) {
    texte = '<div>'
    for (let i = 0; i < tableauDeTexte.length; i++) {
      texte += '<div> − ' + tableauDeTexte[i] + '</div>'
    }
    texte += '</div>'
  } else {
    texte = '\t\\begin{itemize}\n'
    for (let i = 0; i < tableauDeTexte.length; i++) {
      texte += '\t\t\\item ' + tableauDeTexte[i] + '\n'
    }
    texte += '\t\\end{itemize}'
  }
  return texte
}
/**
 * Crée une liste de questions alphabétique
 * @param {number} k valeur numérique
 * @author Sébastien Lozano (Rajout par EE, l'opportunité d'enlever l'espace final qui est par défaut)
 */
export function numAlpha (k, nospace = false) {
  if (context.isHtml) return '<span style="color:#f15929; font-weight:bold">' + String.fromCharCode(97 + k) + ')' + (nospace ? '' : '&nbsp;') + '</span>'
  else return '\\textbf {' + String.fromCharCode(97 + k) + '.}' + (nospace ? '' : ' ')
}
