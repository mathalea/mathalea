/** @module mise en forme LaTeX */

import Algebrite from 'algebrite'
// Fonctions LaTeX

/**
* * Retourne un environnement LaTeX enumerate à partir d'une liste.
* * `<br>`est remplacé par un saut de paragraphe
* * `<br><br>` est remplacé par un saut de paragraphe et un medskip
* * L'espacement est généré avec spacing
* @author Rémi Angot
*/
export function texEnumerate (liste, spacing) {
  let result = ''
  if (liste.length > 1) {
    result = '\\begin{enumerate}\n'
    if (spacing > 1) {
      result += `\\begin{spacing}{${spacing}}\n`
    }
    for (const i in liste) {
      result += '\t\\item ' + liste[i] + '\n'
    }
    if (spacing > 1) {
      result += '\\end{spacing}\n'
    }
    result += '\\end{enumerate}\n'
  } else {
    if (spacing > 1) {
      result += `\\begin{spacing}{${spacing}}\n`
    }
    result += liste[0] + '\n'
    if (spacing > 1) {
      result += '\\end{spacing}\n'
    }
  }
  return result.replace(/(<br *\/?>[\n\t ]*)+<br *\/?>/mig, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n').replace(/€/g, '\\euro{}')
}

/**
  * * Retourne un environnement LaTeX enumerate à partir d'une liste sans afficher les numéros.
  * * `<br>` est remplacé par un saut de paragraphe
  * * `<br><br>` est remplacé par un saut de paragraphe et un medskip
  * * L'espacement est généré avec spacing
  * @author Rémi Angot
  */
export function texEnumerateSansNumero (liste, spacing) {
  // return texEnumerate(liste,spacing).replace('\\begin{enumerate}[label={}]','\\begin{enumerate}[label={}]')
  return texEnumerate(liste, spacing).replace('\\begin{enumerate}', '\\begin{enumerate}[label={}]')
}

/**
  * * Concatène les éléments d'une liste avec un saut de ligne entre chaque élément
  * * `<br>` est remplacé par un saut de paragraphe
  * * `<br><br>` est remplacé par un saut de paragraphe et un medskip
  * @author Rémi Angot
  */
export function texParagraphe (liste, spacing = false, retourCharriot) {
  let result = ''
  if (spacing > 1) {
    result = `\\begin{spacing}{${spacing}}\n`
  }

  for (const i in liste) {
    if (retourCharriot) {
      result += `\t${liste[i]}\\\\\n`
    } else {
      result += `\t${liste[i]}\n`
    }
  }
  if (spacing > 1) {
    result += '\\end{spacing}'
  }
  // les <br> peuvent être 2 ou plus et peuvent être séparés par des sauts de ligne ou des espaces
  return result.replace(/(<br *\/?>[\n\t ]*)+<br *\/?>/mig, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n').replace(/€/g, '\\euro{}')
}

/**
  * * Recopie le texte.
  * * `<br>` est remplacé par un saut de paragraphe
  * * `<br><br>` est remplacé par un saut de paragraphe et un medskip
  * @author Rémi Angot
  */
export function texIntroduction (texte) {
  return texte.replace(/(<br *\/?>[\n\t ]*)+<br *\/?>/mig, '\n\n\\medskip\n').replace(/<br>/g, '\\\\\n')
}
/**
* Renvoie un environnent LaTeX multicolonnes
* @author Rémi Angot
*/
export function texMulticols (texte, nbCols = 2) {
  let result
  if (nbCols > 1) {
    result = '\\begin{multicols}{' + nbCols + '}\n' +
        texte + '\n\\end{multicols}'
  } else {
    result = texte
  }
  return result
}
/**
* Renvoie \exo{consigne}
* @author Rémi Angot
*/
export function texConsigne (consigne) {
  return '\\exo{' + consigne.replace(/<br>/g, '\\\\') + '}\n\n'
}
/**
 * Retourne le code LateX correspondant à un symbole
 * @param {string} symbole
 * @returns {string} string
 * @author Guillaume Valmont
 * @example texSymbole('≤') retourne '\\leqslant'
 */
export function texSymbole (symbole) {
  switch (symbole) {
    case '<':
      return '<'
    case '>':
      return '>'
    case '≤':
      return '\\leqslant'
    case '≥':
      return '\\geqslant'
    case '\\':
      return '\\smallsetminus'
    default:
      return 'symbole non connu par texSymbole()'
  }
}
/**
* Utilise printlatex et quote de Algebrite
* @author Rémi Angot
*/

export function printlatex (e) {
  if (e === '0x') {
    return '0'
  } else {
    return Algebrite.run(`printlatex(quote(${e}))`)
  }
}
/**
* Écrit du texte en mode mathématiques
* @author Rémi Angot
*/
export function texTexte (texte) {
  return '~\\text{' + texte + '}'
}
