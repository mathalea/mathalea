import { context } from '../context'

/**
 * Renvoie un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte
 * @param {string} texte
 * @param {string} couleur
 * @param {string} titre
 * @author Sébastien Lozano
 */
export function warnMessage (texte, couleur, titre) {
  'use strict'
  if (typeof (titre) === 'undefined') {
    titre = ''
  }
  if (context.isHtml) {
    return `
      <br>
      <div class="ui compact warning message">
      <h4><i class="lightbulb outline icon"></i>${titre}</h4>
      <p>` + texte + `
      </p>
      </div>
      `
  } else {
    // return texCadreParOrange(texte);
    return `
      \\begin{bclogo}[couleurBarre=` + couleur + ',couleurBord=' + couleur + ',epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf ' + titre + `}
        ` + texte + `
      \\end{bclogo}
      `
  }
}

/**
   * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone info
   * @param {object}
   * @author Sébastien Lozano
   */

export function infoMessage ({ titre, texte, couleur }) {
  // 'use strict';
  if (context.isHtml) {
    return `
      <div class="ui compact icon message">
        <i class="info circle icon"></i>
        <div class="content">
            <div class="header">
            ` + titre + `
            </div>
            <p>` + texte + `</p>
        </div>
        </div>
      `
  } else {
    return `
      \\begin{bclogo}[couleurBarre=` + couleur + ',couleurBord=' + couleur + ',epBord=2,couleur=gray!10,logo=\\bcinfo,arrondi=0.1]{\\bf ' + titre + `}
        ` + texte + `
      \\end{bclogo}
      `
  }
}

/**
   * @returns un encart sur fond d'alert semantic ui en HTML ou dans un cadre bclogo en LaTeX avec le texte + icone lampe
   * @param {object}
   * @author Sébastien Lozano
   */

export function lampeMessage ({ titre, texte, couleur }) {
  if (context.isHtml) {
    if (context.versionMathalea === 3) {
      return `
        <div class='bg-gray-100 border-solid border-2 border-black rounded p-2'>
        <h1 class='font-bold'>${titre}</h1>
        <p>${texte}</p>
        </div>
        `
    } else {
      return `
        <div class="ui compact icon message">
          <i class="lightbulb outline icon"></i>
          <div class="content">
              <div class="header">
              ` + titre + `
              </div>
              <p>` + texte + `</p>
          </div>
          </div>
        `
    }
  } else if (context.isAmc) {
    return `
      {\\bf ${titre}} : ${texte}
      `
  } else {
    return `
      \\begin{bclogo}[couleurBarre=` + couleur + ',couleurBord=' + couleur + ',epBord=2,couleur=gray!10,logo=\\bclampe,arrondi=0.1]{\\bf ' + titre + `}
        ` + texte + `
      \\end{bclogo}
      `
  }
}
