/** @module fonctions sensibles au contexte */

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

/**
* Met en couleur
* Met en couleur un texte. JCL dit : "S'utilise entre $ car utilise des commandes qui fonctionnent en math inline"
* @param {string} texte à mettre en couleur
* @param {string} couleur en anglais ou code couleur hexadécimal par défaut c'est le orange de CoopMaths
* @author Guillaume Valmont d'après MiseEnEvidence() de Rémi Angot
*/
export function miseEnCouleur (texte, couleur = '#f15929') {
  if (context.isHtml) {
    return `{\\color{${couleur}} ${texte}}`
  } else {
    if (couleur[0] === '#') {
      return `{\\color[HTML]{${couleur.replace('#', '')}} ${texte}}`
    } else {
      return `{\\color{${couleur.replace('#', '')}} ${texte}}`
    }
  }
}
/**
 * Renvoie le html ou le latex qui mets les 2 chaines de caractères fournies sur 2 colonnes différentes
 * Si en sortie html, il n'y a pas assez de places alors on passe en momocolonne!
 * @author Mickael Guironnet
 * @param {string} cont1 - Contenu de la première colonne
 * @param {string} cont2 - Contenu de la deuxième colonne
 * @param {eleId, largeur1, widthmincol1, widthmincol2} options
 *          eleId : identifiant ID pour retrouver la colonne
 *          largeur1 : largeur de la première colonne en latex en pourcentage
 *          widthmincol1 : largeur de la première minimum en html en px
 *          widthmincol2 : largeur de la deuxième  minimum en html en px
 *  ex : deuxColonnesResp (enonce, correction, {eleId : '1_1', largeur1:50, widthmincol1: 400px, widthmincol2: 200px})
 * @return {string}
 */
export function deuxColonnesResp (cont1, cont2, options) {
  if (options === undefined) {
    options = { largeur1: 50 }
  } else if (typeof options === 'number') {
    options = { largeur1: options }
  }
  if (options.largeur1 === undefined) {
    options.largeur1 = 50
  }
  if (options.stylecol1 === undefined) {
    options.stylecol1 = ''
  }
  if (options.stylecol2 === undefined) {
    options.stylecol2 = ''
  }
  if (options.widthmincol1 === undefined) {
    options.widthmincol1 = '0px'
  }
  if (options.widthmincol2 === undefined) {
    options.widthmincol2 = '0px'
  }

  if (context.isHtml) {
    return `
    <style>
    .cols-responsive {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-gap: 1rem;
    }    
    /* Screen larger than 900px? 2 column */
    @media (min-width: 900px) {
      .cols-responsive { grid-template-columns: repeat(2, 1fr); }
    }    
    </style>
    <div class='cols-responsive'>
      <div id='cols-responsive1-${options.eleId}'style='min-width:${options.widthmincol1};${options.stylecol1}' >
      ${cont1}
      </div>
      <div id='cols-responsive2-${options.eleId}' style='min-width:${options.widthmincol2};${options.stylecol2}' >
      ${cont2}
      </div>
    </div>
`
  } else {
    return `\\begin{minipage}{${options.largeur1 / 100}\\linewidth}
    ${cont1.replaceAll('<br>', '\\\\\n')}
    \\end{minipage}
    \\begin{minipage}{${(100 - options.largeur1) / 100}\\linewidth}
    ${cont2.replaceAll('<br>', '\\\\\n')}
    \\end{minipage}
    `
  }
}
