/** @module tableau colonne * ligne */

import { context } from '../context'
import { stringNombre } from './stringNombre'
import { texNombre } from './texNombres'

/**
 * Crée un tableau avec un nombre de lignes et de colonnes déterminées
 * par la longueur des tableaux des entetes passés en paramètre
 * Les contenus sont en mode maths par défaut, il faut donc penser à remplir les tableaux
 * en utilisant éventuellement la commande \\text{}
 *
 * @example
 * tableauColonneLigne(['coin','A','B'],['1','2'],['A1','B1','A2','B2']) affiche le tableau ci-dessous
 * ------------------
 * | coin | A  | B  |
 * ------------------
 * |  1   | A1 | B1 |
 * ------------------
 * |  2   | A2 | B2 |
 * ------------------
 *
 * @example
 * tableauColonneLigne(['coin','A','B','C'],['1','2'],['A1','B1','C1','A2','B2','C2']) affiche le tableau ci-dessous
 * -----------------------
 * | coin | A  | B  | C  |
 * -----------------------
 * |  1   | A1 | B1 | C1 |
 * -----------------------
 * |  2   | A2 | B2 | C2 |
 * -----------------------
 *
 * @example
 * tableauColonneLigne(['coin','A','B'],['1','2','3'],['A1','B1','A2','B2','A3','B3']) affiche le tableau ci-dessous
 * ------------------
 * | coin | A  | B  |
 * ------------------
 * |  1   | A1 | B1 |
 * ------------------
 * |  2   | A2 | B2 |
 * ------------------
 * |  3   | A3 | B3 |
 * ------------------
 *
 * @example
 * tableauColonneLigne(['coin','A','B','C'],['1','2','3'],['A1','B1','C1','A2','B2','C2','A3','B3','C3']) affiche le tableau ci-dessous
 * -----------------------
 * | coin | A  | B  | C  |
 * -----------------------
 * |  1   | A1 | B1 | C1 |
 * -----------------------
 * |  2   | A2 | B2 | C2 |
 * -----------------------
 * |  3   | A3 | B3 | C3 |
 * -----------------------
 *
 * @param {array} tabEntetesColonnes contient les entetes des colonnes
 * @param {array} tabEntetesLignes contient les entetes des lignes
 * @param {array} tabLignes contient les elements de chaque ligne
 * @author Sébastien Lozano
 *
 */
export function tableauColonneLigne (tabEntetesColonnes, tabEntetesLignes, tabLignes, arraystretch, math = true) {
  // on définit le nombre de colonnes
  const C = tabEntetesColonnes.length
  // on définit le nombre de lignes
  const L = tabEntetesLignes.length
  // On construit le string pour obtenir le tableau pour compatibilité HTML et LaTeX
  let tableauCL = ''
  if (!arraystretch) {
    if (context.isHtml) {
      arraystretch = 2.5
    } else {
      arraystretch = 1
    }
  }
  if (context.isHtml) {
    tableauCL += `$\\def\\arraystretch{${arraystretch}}\\begin{array}{|`
  } else {
    tableauCL += `$\\renewcommand{\\arraystretch}{${arraystretch}}\n`
    tableauCL += '\\begin{array}{|'
  }
  // on construit la 1ere ligne avec toutes les colonnes
  for (let k = 0; k < C; k++) {
    tableauCL += 'c|'
  }
  tableauCL += '}\n'

  tableauCL += '\\hline\n'
  if (typeof tabEntetesColonnes[0] === 'number') {
    tableauCL += math ? texNombre(tabEntetesColonnes[0]) + '' : `\\text{${stringNombre(tabEntetesColonnes[0])}} `
  } else {
    tableauCL += math ? tabEntetesColonnes[0] : `\\text{${tabEntetesColonnes[0]}}`
  }
  for (let k = 1; k < C; k++) {
    if (typeof tabEntetesColonnes[k] === 'number') {
      tableauCL += ` & ${math ? texNombre(tabEntetesColonnes[k]) : '\\text{' + stringNombre(tabEntetesColonnes[k]) + '}'}`
    } else {
      tableauCL += ` & ${math ? tabEntetesColonnes[k] : '\\text{' + tabEntetesColonnes[k] + '}'}`
    }
  }
  tableauCL += '\\\\\n'
  tableauCL += '\\hline\n'
  // on construit toutes les lignes
  for (let k = 0; k < L; k++) {
    if (typeof tabEntetesLignes[k] === 'number') {
      tableauCL += math ? texNombre(tabEntetesLignes[k]) : `\\text{${stringNombre(tabEntetesLignes[k]) + ''}}`
    } else {
      tableauCL += math ? tabEntetesLignes[k] : `\\text{${tabEntetesLignes[k] + ''}}`
    }
    for (let m = 1; m < C; m++) {
      if (typeof tabLignes[(C - 1) * k + m - 1] === 'number') {
        tableauCL += ` & ${math ? texNombre(tabLignes[(C - 1) * k + m - 1]) : '\\text{' + stringNombre(tabLignes[(C - 1) * k + m - 1]) + '}'}`
      } else {
        tableauCL += ` & ${math ? tabLignes[(C - 1) * k + m - 1] : '\\text{' + tabLignes[(C - 1) * k + m - 1] + '}'}`
      }
    }
    tableauCL += '\\\\\n'
    tableauCL += '\\hline\n'
  }
  tableauCL += '\\end{array}\n'
  if (context.isHtml) {
    tableauCL += '$'
  } else {
    tableauCL += '\\renewcommand{\\arraystretch}{1}$\n'
  }

  return tableauCL
}
