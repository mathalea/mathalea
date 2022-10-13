/** @module scrathblock */

import { context } from '../context'
/**
 * Traducteur scratch3 (Latex) -> scratchblocks
 * On lui passe une chaine de caractères contenant une série de commande Latex du package Latex Scratch3
 * Elle retourne une chaine de caractères contenant l'équivalent en langage scratchblocks si le contexte est isHtml !
 * Si le contexte est !isHtml alors elle retourne la chaine passée en argument.
 * http://mirrors.ctan.org/macros/latex/contrib/scratch3/scratch3-fr.pdf
 * https://scratchblocks.github.io
 * @author Jean-Claude Lhote.
 */
export function scratchblock (stringLatex) {
  const regex1 = /[\\{}]/
  const regex3 = /[[]<>]/
  const regex4 = /[{ ]/
  const litcommande = function (souschaine) {
    let extrait
    if (souschaine[0] === '}') {
      return '}'
    } else {
      extrait = souschaine.split(regex4)[0]
      return extrait
    }
  }

  /*****************************************************/
  /** ********* La fonction d'analyse récursive *********/
  /*****************************************************/
  const translatex = function (chaine, index, compteAccolades) {
    let resultat = []; let texte = []; let texte2 = []; let texte3 = []; let taille; let string; let fleche
    let compteur, debut // pour les boucles et les if
    const souschaine = chaine.substring(index)
    const commande = litcommande(souschaine)
    switch (commande.substring(0, 5)) {
      case '\\bloc':
        string = commande.split('{')[0]
        taille = string.length
        string = string.substring(6)
        compteAccolades++
        switch (string) {
          case 'stop':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`${texte[0]} ${texte2[0]} `, texte2[1], texte2[2]]
            break
          case 'move':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'variable':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'control':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'pen':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0] + ' :: pen', texte[1], texte[2]]
            break
          case 'list':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0] + ' :: list', texte[1], texte[2]]
            break
          case 'init':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
          case 'space\n':
            compteAccolades--
            resultat = ['\n', 11 + index, compteAccolades]
            break
          case 'if':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            texte3 = translatex(chaine, texte2[1], texte2[2])
            resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
            compteAccolades = resultat[2]
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break

          case 'ifelse':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            texte3 = translatex(chaine, texte2[1], texte2[2])
            resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
            compteAccolades = resultat[2]
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' sinon'
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break
          case 'repeat':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (texte[0].split(' ')[1] !== 'indéfiniment') {
              if (texte[0].split(' ')[1] !== "jusqu'à") {
                texte2 = translatex(chaine, texte[1], texte[2])
                texte3 = translatex(chaine, texte2[1], texte2[2])
                resultat = [`${texte[0]} ${texte2[0]} ${texte3[0]}`, texte3[1] + 1, texte3[2] - 1]
                compteAccolades = resultat[2]
              } else {
                texte2 = translatex(chaine, texte[1], texte[2])
                resultat = [`${texte[0]} ${texte2[0]} `, texte2[1] + 1, texte2[2] - 1]
                compteAccolades = resultat[2]
              }
            } else {
              resultat = [`${texte[0]} `, texte[1] + 1, texte[2] - 1]
              compteAccolades = resultat[2]
            }
            compteur = compteAccolades + 1
            debut = chaine.substring(resultat[1]).indexOf('{') + resultat[1]
            resultat[1] = debut + 1
            resultat[0] += '\n'
            while (compteur > compteAccolades) {
              texte = translatex(chaine, resultat[1], compteur)
              resultat[0] += ' ' + texte[0]
              resultat[1] = texte[1]
              compteur = texte[2]
            }
            resultat[0] += ' fin'
            break
          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [texte[0], texte[1], texte[2]]
            break
        }

        break
      case '\\oval':
        string = commande.split('{')[0]
        taille = string.length
        string = string.substring(5)
        compteAccolades++
        if (string.charAt(string.length - 1) === '*') {
          fleche = true
          string = string.substring(0, string.length - 1)
        } else fleche = false
        switch (string) {
          case 'num':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (isNaN(texte[0]) && texte[0].indexOf(regex3)) {
              resultat = [`[${texte[0]}]`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'moreblocks':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1], texte[2]]
            } else {
              resultat = [`(${texte[0]})`, texte[1], texte[2]]
            }
            break
          case 'variable':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'sound':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v :: sound)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]} :: sound)`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'sensing':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v :: sensing)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]} :: sensing)`, texte[1] + 1, texte[2] - 1]
            }
            break
          case 'operator':
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`(${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ')'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break

          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            if (fleche) {
              resultat = [`(${texte[0]} v)`, texte[1] + 1, texte[2] - 1]
            } else {
              resultat = [`(${texte[0]})`, texte[1] + 1, texte[2] - 1]
            }
            break
        }

        break
      case '\\bool':
        string = commande.split(/\{ /)[0]
        taille = string.length
        string = string.substring(5, 9)
        switch (string) {
          case 'oper':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: operators boolean>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          case 'empt':
            resultat = ['< vide :: operators boolean>', index + taille + 1, compteAccolades]
            break
          case 'sens':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: sensing>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          case 'list':
            compteAccolades++
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            texte2 = translatex(chaine, texte[1], texte[2])
            resultat = [`<${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
            while (chaine.charAt(texte2[1]) !== '}') {
              texte2 = translatex(chaine, texte2[1], texte2[2])
              resultat[0] += ' ' + texte2[0]
            }
            resultat[0] += ' :: list>'
            resultat[1] = texte2[1] + 1
            resultat[2] = texte2[2] - 1
            break
          default:
            texte = translatex(chaine, index + taille + 1, compteAccolades)
            resultat = [`<${texte[0]}>`, texte[1], texte[2]]
            break
        }
        break
      case '\\init':
        string = commande.split('{')[0]
        taille = string.length
        compteAccolades++
        texte = translatex(chaine, index + taille + 1, compteAccolades)
        texte2 = translatex(chaine, texte[1], texte[2])
        resultat = [`${texte[0]} ${texte2[0]} `, texte2[1], texte2[2]]
        break
      case '\\name':
        string = commande.split('{')[0]
        taille = string.length
        compteAccolades++
        texte = translatex(chaine, index + taille + 1, compteAccolades)
        texte2 = translatex(chaine, texte[1], texte[2])
        resultat = [`${texte[0]} ${texte2[0]}`, texte2[1], texte2[2]]
        while (chaine.charAt(texte2[1]) !== '}') {
          texte2 = translatex(chaine, texte2[1], texte2[2])
          resultat[0] += ' ' + texte2[0]
        }
        resultat[1] = texte2[1] + 1
        resultat[2] = texte2[2] - 1
        break
      default:
        switch (commande) {
          case '}':
            compteAccolades--
            resultat = [' ', 1 + index, compteAccolades]
            break
          case '\\begin':
            compteAccolades++
            if (chaine.substring(15 + index)[0] === '[') {
              index = chaine.substring(15 + index).indexOf(']') + 16 + index
            } else {
              index += 15
            }
            resultat = [' <!-- Code Scratch  -->', index, compteAccolades]
            break
          case '\\end':
            compteAccolades--
            resultat = [' <!-- Fin du Code Scratch  -->\n', 13 + index, compteAccolades]
            break
          case '\\turnleft':
            resultat = ['gauche ', 11 + index, compteAccolades]
            break
          case '\\turnright':
            resultat = ['droite ', 12 + index, compteAccolades]
            break
          case '\\greenflag':
            resultat = [' @greenFlag ', 10 + index, compteAccolades]
            break
          case '\\selectmenu':
            compteAccolades++
            texte = translatex(chaine, 12 + index, compteAccolades)
            resultat = [`[${texte[0]} v]`, texte[1] + 1, texte[2] - 1]
            break
          default:
            string = chaine.substring(index).split(regex1)[0]
            resultat = [string, string.length + index, compteAccolades]
            break
        }
        break
    }
    return resultat
  }
  /*********************************************/
  /** *********** Fin de translatex *************/
  /*********************************************/

  // boucle pricipale de scratchblock2
  let codeScratch = ''
  let fin; let result = []; let index
  let compteur = 0
  if (!((stringLatex.match(/\{/g) || []).length === (stringLatex.match(/\}/g) || []).length)) {
    console.log("Il n'y a pas le même nombre de { que de }. Je préfère m'arrêter.")
    return false
  }
  if (!context.isHtml) {
    codeScratch = stringLatex
  } else {
    codeScratch = '<pre class=\'blocks\'>'
    index = 0
    fin = false
    while (!fin) {
      result = translatex(stringLatex, index, compteur)
      codeScratch += result[0]
      index = result[1]
      compteur = result[2]
      if (compteur === 0) fin = true
    }
    codeScratch += '</pre>\n'
  }
  return codeScratch
}
