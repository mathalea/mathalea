/* globals UI */
import { texteParPosition } from './2d.js'
import { fraction } from './fractions.js'
import Algebrite from 'algebrite'
import { format, evaluate, isPrime, gcd, round, equal, Fraction, isInteger } from 'mathjs'
import { loadScratchblocks } from './loaders.js'
import { context } from './context.js'
import { setReponse } from './gestionInteractif.js'
import { getVueFromUrl } from './gestionUrl.js'
import FractionX from './FractionEtendue.js'
import { elimineDoublons } from './interactif/questionQcm.js'
import Decimal from 'decimal.js/decimal.mjs'

const math = { format: format, evaluate: evaluate }
const epsilon = 0.000001

/**
 * Fonctions diverses pour la création des exercices
 * @module
 */

export function interactivite (exercice) {
  if (context.isHtml) {
    if (exercice.interactif) return 'I-html'
    else return 'html'
  } else if (context.isAmc) return 'AMC'
  else if (exercice.interactif) return 'I-latex'
  else return 'latex'
}

/**
 * Affecte les propriétés contenu et contenuCorrection (d'après les autres propriétés de l'exercice)
 * @param {Exercice} exercice
 */
export function listeQuestionsToContenu (exercice) {
  if (context.isHtml) {
    exercice.contenu = htmlConsigne(exercice.consigne) + htmlParagraphe(exercice.introduction) + htmlEnumerate(exercice.listeQuestions, exercice.spacing, 'question', `exercice${exercice.numeroExercice}Q`, exercice.tailleDiaporama)
    if ((exercice.interactif && exercice.interactifReady) || getVueFromUrl() === 'eval') {
      exercice.contenu += `<button class="ui blue button checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${exercice.numeroExercice}-${exercice.id}">Vérifier les réponses</button>`
    }
    exercice.contenuCorrection = htmlParagraphe(exercice.consigneCorrection) + htmlEnumerate(exercice.listeCorrections, exercice.spacingCorr, 'correction', `correction${exercice.numeroExercice}Q`, exercice.tailleDiaporama)
  } else {
    let vspace = ''
    if (exercice.vspace) {
      vspace = `\\vspace{${exercice.vspace} cm}\n`
    }
    if (!context.isAmc) {
      if (document.getElementById('supprimer_reference').checked === true) {
        exercice.contenu = texConsigne(exercice.consigne) + vspace + texIntroduction(exercice.introduction) + texMulticols(texEnumerate(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
      } else {
        exercice.contenu = texConsigne(exercice.consigne) + `\n\\marginpar{\\footnotesize ${exercice.id}}` + vspace + texIntroduction(exercice.introduction) + texMulticols(texEnumerate(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
      }
    }
    exercice.contenuCorrection = texConsigne('') + texIntroduction(exercice.consigneCorrection) + texMulticols(texEnumerate(exercice.listeCorrections, exercice.spacingCorr), exercice.nbColsCorr)
    exercice.contenuCorrection = exercice.contenuCorrection.replace(/\\\\\n*/g, '\\\\\n')
    exercice.contenu = exercice.contenu.replace(/\\\\\n*/g, '\\\\\n')
  }
}

export function exerciceSimpleToContenu (exercice) {
  const listeQuestions = []
  const listeCorrections = []
  for (let i = 0, cpt = 0; i < exercice.nbQuestions & cpt < 50; cpt++) {
    if (exercice.questionJamaisPosee(i, exercice.question)) {
      if (context.isAmc) {
        listeQuestions.push(exercice.question + '<br>')
        listeCorrections.push(exercice.correction)
      } else {
        listeQuestions.push(exercice.question)
        listeCorrections.push(exercice.correction)
      }
      if (context.isAmc && exercice.amcType === 'AMCNum') {
        setReponse(exercice, i, exercice.reponse, {
          digits: nombreDeChiffresDe(exercice.reponse),
          decimals: nombreDeChiffresDansLaPartieDecimale(exercice.reponse),
          signe: exercice.reponse < 0,
          approx: 0
        })
      }
      exercice.nouvelleVersion()
      i++
    }
  }
  exercice.listeQuestions = listeQuestions
  exercice.listeCorrections = listeCorrections
  listeQuestionsToContenu(exercice)
}

/**
 * À documenter
 * @param {Exercice} exercice
 */
export function listeDeChosesAImprimer (exercice) {
  if (context.isHtml) {
    exercice.contenu = htmlLigne(exercice.listeQuestions, exercice.spacing)
    exercice.contenuCorrection = ''
  } else {
    // let vspace = ''
    // if (exercice.vspace) {
    //   vspace = `\\vspace{${exercice.vspace} cm}\n`
    // }
    if (document.getElementById('supprimer_reference').checked === true) {
      exercice.contenu = texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
    } else {
      exercice.contenu = `\n\\marginpar{\\footnotesize ${exercice.id}}` + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
    }
    exercice.contenuCorrection = ''
  }
}

/**
 * Utilise liste_questions et liste_corrections pour remplir contenu et contenuCorrection
 * La liste des questions devient une liste HTML ou LaTeX avec html_ligne() ou tex_paragraphe()
 * @param {Exercice} exercice
 * @author Rémi Angot
 */
export function listeQuestionsToContenuSansNumero (exercice, retourCharriot = true) {
  // En vue diapCorr, les questions doivent toujours être numérotées car venant d'exercices différents
  if (context.vue === 'diapCorr') {
    listeQuestionsToContenu(exercice, retourCharriot = true)
  } else {
    if (context.isHtml) {
      exercice.contenu = htmlConsigne(exercice.consigne) + htmlParagraphe(exercice.introduction) + htmlEnumerate(exercice.listeQuestions, exercice.spacing, 'question', `exercice${exercice.numeroExercice}Q`, exercice.tailleDiaporama, 'sansNumero')
      if ((exercice.interactif && exercice.interactifReady) || getVueFromUrl() === 'eval') {
        exercice.contenu += `<button class="ui blue button checkReponses" type="submit" style="margin-bottom: 20px; margin-top: 20px" id="btnValidationEx${exercice.numeroExercice}-${exercice.id}">Vérifier les réponses</button>`
      }
      exercice.contenuCorrection = htmlParagraphe(exercice.consigneCorrection) + htmlEnumerate(exercice.listeCorrections, exercice.spacingCorr, 'correction', `correction${exercice.numeroExercice}Q`, exercice.tailleDiaporama, 'sansNumero')
    } else {
      if (document.getElementById('supprimer_reference').checked === true) {
        exercice.contenu = texConsigne(exercice.consigne) + texIntroduction(exercice.introduction) + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing, retourCharriot), exercice.nbCols)
      } else {
        exercice.contenu = texConsigne(exercice.consigne) + `\n\\marginpar{\\footnotesize ${exercice.id}}` + texIntroduction(exercice.introduction) + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing, retourCharriot), exercice.nbCols)
      }
      // exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texEnumerateSansNumero(exercice.listeCorrections,exercice.spacingCorr),exercice.nbColsCorr)
      exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texParagraphe(exercice.listeCorrections, exercice.spacingCorr, retourCharriot), exercice.nbColsCorr)
    }
  }
}

/**
 * Utilise liste_questions et liste_corrections pour remplir contenu et contenuCorrection
 *
 * Uniquement en version LaTeX
 * La liste des questions devient une liste HTML ou LaTeX avec html_ligne() ou tex_paragraphe()
 * @param {Exercice} exercice
 * @author Rémi Angot
 */
export function listeQuestionsToContenuSansNumeroEtSansConsigne (exercice) {
  if (document.getElementById('supprimer_reference').checked === true) {
    exercice.contenu = texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
  } else {
    exercice.contenu = `\n\\marginpar{\\footnotesize ${exercice.id}` + texMulticols(texParagraphe(exercice.listeQuestions, exercice.spacing), exercice.nbCols)
  }
  // exercice.contenuCorrection = texConsigne(exercice.consigneCorrection) + texMulticols(texEnumerateSansNumero(exercice.listeCorrections,exercice.spacingCorr),exercice.nbColsCorr)
  exercice.contenuCorrection = texMulticols(texParagraphe(exercice.listeCorrections, exercice.spacingCorr), exercice.nbColsCorr)
}

/**
 * Renvoie le html ou le latex qui mets les 2 chaines de caractères fournies sur 2 colonnes différentes
 * @author Rémi Angot
 * @param {string} cont1 - Contenu de la première colonne
 * @param {string} cont2 - Contenu de la deuxième colonne
 * @param {number} [largeur1=50] Largeur de la première colonne
 * @return {string}
 */
export function deuxColonnes (cont1, cont2, largeur1 = 50) {
  if (context.isHtml) {
    return `
    <div>
    <div class="question" style="float:left;max-width: ${largeur1}%;margin-right: 30px">
    ${cont1}
   </div>
   <div style="float:left; max-width: ${90 - largeur1}%">
    ${cont2}
   </div>
   <div style="clear:both"></div>
   <div class="ui hidden divider"></div>
   </div>
`
  } else {
    return `\\begin{minipage}{${largeur1 / 100}\\linewidth}
    ${cont1.replaceAll('<br>', '\\\\\n')}
    \\end{minipage}
    \\begin{minipage}{${(100 - largeur1) / 100}\\linewidth}
    ${cont2.replaceAll('<br>', '\\\\\n')}
    \\end{minipage}
    `
  }
}
/**
 *
 * @param {string} texte
 * @returns le texte centré dans la page selon le contexte.
 * @author Jean-Claude Lhote
 */
export function centrage (texte) {
  return context.isHtml ? `<center>${texte}</center>` : `\\begin{center}\n\t${texte}\n\\end{center}\n`
}
/**
 * Contraint une valeur à rester dans un intervalle donné. Si elle est trop petite, elle prend la valeur min, si elle est trop grande elle prend la valeur max
 * @author Jean-Claude Lhote à partir du code de Eric Elter
 * @param {number} min borne inférieure
 * @param {number} max borne supérieure
 * @param {number} valeur la valeur à contraindre
 * @param {number} defaut valeur par défaut si non entier
 */
export function contraindreValeur (min, max, valeur, defaut) {
  return !(isNaN(valeur)) ? (valeur < min) ? min : (valeur > max) ? max : Number(valeur) : defaut
}

/** Retourne un nombre décimal entre a et b, sans être trop près de a et de b
 * @param {number} min borne inférieure
 * @param {number} max borne supérieure
 * @author Eric Elter
 * @returns {number}
 */
export function entreDeux (a, b) {
  if (a < b) return arrondi(a + (b - a) * randint(10, 90) / 100, 2)
  else return arrondi(b + (a - b) * randint(10, 90) / 100, 2)
}

/**
 * Compare deux nombres (pour les nombres en virgule flottante afin d'éviter les effets de la conversion en virgule flottante).
 * @author Jean-Claude Lhote
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function egal (a, b, tolerance = epsilon) {
  return (Math.abs(a - b) < tolerance)
}

/**
 * Retourne true si a > b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function superieur (a, b, tolerance = epsilon) {
  return (a - b > tolerance)
}
/**
 * Retourne true si a < b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function inferieur (a, b, tolerance = epsilon) {
  return (b - a > tolerance)
}
/**
 * Retourne true si a ≥ b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function superieurouegal (a, b, tolerance = epsilon) {
  return (a - b > tolerance || egal(a, b, tolerance))
}
/**
 * Retourne true si a ≤ b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function inferieurouegal (a, b, tolerance = epsilon) {
  return (b - a > tolerance || egal(a, b, tolerance))
}
/**
 * Retourne true si a est entier ou "presque" entier
 * @param {number} a premier nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function estentier (a, tolerance = epsilon) {
  return (Math.abs(a - round(a)) < tolerance)
}

/**
 * Retourne le quotient entier (donc sans le reste) de a/b si a & b sont entiers, false sinon
 * @param {number} a
 * @param {number} b
 * @return {boolean|number}
 */
export function quotientier (a, b) {
  if (estentier(a) && estentier(b)) return Math.floor(a / b)
  return false
}

/**
* Renvoie le PPCM de deux nombres
* @author Rémi Angot
*/
export const ppcm = (a, b) => {
  return parseInt(Algebrite.run(`lcm(${a},${b})`))
}

/**
 * Retourne true si x est un carré parfait (à epsilon près)
 * @param {number} x
 * @return {boolean}
 */
export function carreParfait (x) {
  if (estentier(Math.sqrt(x))) return true
  else return false
}

// Petite fonction pour écrire des nombres avec Mathalea2d en vue de poser des opérations...
export function ecrireNombre2D (x, y, n) {
  const nString = nombreAvecEspace(n)
  const nombre2D = []
  for (let k = 0; k < nString.length; k++) {
    nombre2D.push(texteParPosition(nString[k], x + k * 0.8, y))
  }
  return nombre2D
}

/**
* Créé tous les couples possibles avec un élément de E1 et un élément de E2.
* L'ordre est pris en compte, donc on pourra avoir (3,4) et (4,3).
* Si le nombre de couples possibles est inférieur à nombreDeCouplesMin alors
* on concatène 2 fois la même liste mais avec des ordres différents.
* @param {string[]} E1 - Liste
* @param {string[]} E2 - Liste
* @param {int} nombreDeCouplesMin=10 - Nombre de couples souhaités
* @author Rémi Angot
*/
export function creerCouples (E1, E2, nombreDeCouplesMin = 10) {
  let result = []; let temp = []
  for (const i in E1) {
    for (const j in E2) {
      result.push([E1[i], E2[j]])
    }
  }

  temp = shuffle(result).slice(0) // créer un clone du tableau result mélangé
  result = temp.slice(0)
  while (result.length < nombreDeCouplesMin) {
    result = result.concat(shuffle(temp))
  }
  return result
}

// Fonctions mathématiques

/**
* Choisit un nombre au hasard entre min et max sans appartenir à liste\_a\_eviter.
* @param {int} min
* @param {int} max
* @param {liste} liste - Tous les éléments que l'on souhaite supprimer
*
* @example
* // Renvoie 1, 2 ou 3
* randint (1,3)
* @example
* // Renvoie -1 ou 1
* randint(-1,1,[0])
* @example
* Renvoie 0 ou 1 ou 4 ou 6 ou 8 ou 9
* randint(0,9, '2357') // même résultat avec randint(0,9, ['2','3','5','7']) ou randint(0,9, [2,3,5,7])
* @author Rémi Angot
* @Source https://gist.github.com/pc035860/6546661
*/
export function randint (min, max, listeAEviter = []) {
  // Source : https://gist.github.com/pc035860/6546661
  const range = max - min
  let rand = Math.floor(Math.random() * (range + 1))
  if (typeof listeAEviter === 'string') {
    listeAEviter = listeAEviter.split('')
  }
  if (Number.isInteger(listeAEviter)) {
    listeAEviter = [listeAEviter]
  }
  listeAEviter = listeAEviter.map(Number)
  if (listeAEviter.length > 0) {
    while (listeAEviter.indexOf(min + rand) !== -1) {
      rand = Math.floor(Math.random() * (range + 1))
    }
  }
  return min + rand
}

/**
* Créé un string aléatoire
*
* strRandom({
*  includeUpperCase: true,
*  includeNumbers: true,
*  length: 5,
*  startsWithLowerCase: true
* });
*
* // renvoie par exemple : "iL0v3"
*
* @Source https://www.equinode.com/blog/article/generer-une-chaine-de-caracteres-aleatoire-avec-javascript
*/
export function strRandom (o) {
  let a = 10
  const b = 'abcdefghijklmnopqrstuvwxyz'
  let c = ''
  let d = 0
  let e = '' + b
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)]
      d = 1
    }
    if (o.length) {
      a = o.length
    }
    if (o.includeUpperCase) {
      e += b.toUpperCase()
    }
    if (o.includeNumbers) {
      e += '1234567890'
    }
  }
  for (; d < a; d++) {
    c += e[Math.floor(Math.random() * e.length)]
  }
  return c
}

/**
* Enlève toutes les occurences d'un élément d'un tableau donné
* @param liste
* @param element
*
* @author Rémi Angot
*/
export function enleveElement (array, item) {
  //
  for (let i = array.length - 1; i >= 0; i--) {
    if (typeof item === 'number') {
      if (egal(array[i], item)) {
        array.splice(i, 1)
      }
    } else {
      if (array[i] === item) {
        array.splice(i, 1)
      }
    }
  }
}

/**
 *
 * Compte les occurences d'un item dans un tableau
 * @param {array} array
 * @param item
 * @Author Rémi Angot
 */
export function compteOccurences (array, value) {
  let cpt = 0
  array.forEach((v) => (v === value && cpt++))
  return cpt
}

/**
 * Enlève toutes les occurences d'un élément d'un tableau donné mais sans modifier le tableau en paramètre et renvoie le tableau modifié
 * @author Rémi Angot & Jean-Claude Lhote
 */

export function enleveElementBis (array, item = undefined) {
  const tableaucopie = []
  for (let i = 0; i < array.length; i++) {
    tableaucopie.push(array[i])
  }
  for (let i = tableaucopie.length - 1; i >= 0; i--) {
    if (tableaucopie[i] === item) {
      tableaucopie.splice(i, 1)
    }
  }
  return tableaucopie
}

/**
 * Enlève l'élément index d'un tableau
 * @author Jean-Claude Lhote
 */
export function enleveElementNo (array, index) {
  array.splice(index, 1)
}
/**
 * Enlève l'élément index d'un tableau sans modifier le tableau et retourne le résultat
 * @author Jean-Claude Lhote
 */
export function enleveElementNoBis (array, index) {
  const tableaucopie = []
  for (let i = 0; i < array.length; i++) {
    tableaucopie.push(array[i])
  }
  tableaucopie.splice(index, 1)
  return tableaucopie
}

/**
* Retourne un élément au hasard de la liste sans appartenir à une liste donnée
* @param {liste}
* @param {listeAEviter}
*
* @example
* // Renvoie 1, 2 ou 3
* choice([1,2,3])
* @example
* // Renvoie Rémi ou Léa
* choice(['Rémi','Léa'])
*
* @author Rémi Angot
*/
export function choice (liste, listeAEviter = []) {
  // copie la liste pour ne pas y toucher (ce n'est pas le but de choice)
  if (!Array.isArray(listeAEviter)) {
    listeAEviter = [listeAEviter]
  }
  const listebis = liste.slice()
  // Supprime les éléments de liste à éviter
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(listebis, listeAEviter[i])
  }
  const index = Math.floor(Math.random() * listebis.length)
  return listebis[index]
}

/**
* Retourne une liste des entiers de 0 à max sans appartenir à une liste donnée
* @param {max}
* @param {listeAEviter}
*
* @example
* // Renvoie [0,1,4,5,6,7,8,9,10]
* range(10,[2,3])
*
* @author Rémi Angot
*/
export function range (max, listeAEviter = []) {
  // Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
  const nbMax = parseInt(max, 10)
  const liste = [...Array(nbMax + 1).keys()]
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}

/**
* Retourne une liste entre 2 bornes sans appartenir à une liste donnée (par défaut des entiers mais on peut changer le pas)
* @param {min}
* @param {max}
* @param {listeAEviter}
*
* @example
* // Renvoie [6,7,10]
* range(6,10,[8,9])
*
* @author Rémi Angot
*/
export function rangeMinMax (min, max, listeAEviter = [], step = 1) {
  // Créer un tableau avec toutes les valeurs de 0 à max sauf celle de la liste à éviter
  const liste = []
  for (let i = min; i <= max; i = i + step) {
    liste.push(i)
  }
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}

/**
* Créé un tableau avec toutes les valeurs de 1 à max sauf celle de la liste à éviter
*
*
* @param {int} max
* @param {liste} liste valeurs à éviter
* @author Rémi Angot
*/
export function range1 (max, listeAEviter = []) {
  const nbMax = parseInt(max, 10)
  const liste = []
  for (let i = 1; i <= nbMax; i++) {
    liste.push(i)
  }
  for (let i = 0; i < listeAEviter.length; i++) {
    enleveElement(liste, listeAEviter[i])
  }
  return liste
}

/**
* Fonction de comparaison à utiliser avec tableau.sort(compareFractions)
*
* Le tableau doit être du type `[[num,den],[num2,den2]]`
*
* @author Rémi Angot
*/
export function compareFractions (a, b) {
  if ((a[0] / a[1]) > (b[0] / b[1])) { return 1 }
  if ((a[0] / a[1]) < (b[0] / b[1])) { return -1 }
  // Sinon il y a égalité
  return 0
}

/**
* Fonction de comparaison à utiliser avec tableau.sort(compareNombres)
*
*
* @author Rémi Angot
*/
export function compareNombres (a, b) {
  return a - b
}
/**
 *
 * Copié sur https://delicious-insights.com/fr/articles/le-piege-de-array-sort/
 */
export function numTrie (arr) {
  return arr.sort(function (a, b) {
    return a - b
  })
}
/**
 * retourne un tableau dans lequel les doublons ont été supprimés s'il y en a MAIS SANS TRI
 * @param {array} arr Tableau duquel ont veut supprimer les doublons numériques
 * @param {number} tolerance La différence minimale entre deux valeurs pour les considérer comme égales
 * @author Jean-Claude Lhote
 **/
export function enleveDoublonNum (arr, tolerance) {
  let k = 0
  while (k < arr.length - 1) {
    let kk = k + 1
    while (kk < arr.length - 1) {
      if (egal(arr[k], arr[kk], tolerance)) {
        arr[k] = (arr[k] + arr[kk]) / 2 // On remplace la valeur dont on a trouvé un double par la moyenne des deux valeurs
        arr.splice(kk, 1) // on supprime le doublon.
      }
      kk++
    }
    k++
  }
  return arr
}
/**
 * fonction qui retourne une chaine construite en concaténant les arguments
 * Le rôle de cette fonction est de construire un identifiant unique de question
 * afin de contrôler que l'aléatoire ne produit pas deux questions identiques.
 * @author Jean-Claude Lhote
 */
export function checkSum (...args) {
  let checkString = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'number') {
      checkString += Number(args[i]).toString()
    } else {
      checkString += args[0]
    }
  }
  return checkString
}
/**
* Mélange les items d'un tableau, sans modifier le tableau passé en argument
*
* @Example
* tableau_melange = shuffle (tableau_origine)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffle (array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex

  // While there remain elements to shuffle...
  const arrayBis = array.slice()
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = arrayBis[currentIndex]
    arrayBis[currentIndex] = arrayBis[randomIndex]
    arrayBis[randomIndex] = temporaryValue
  }

  return arrayBis
}

export function shuffleJusqua (array, indice) {
  if (indice > array.length || indice < 0 || indice === undefined) {
    return shuffle(array)
  } else {
    const tableau1 = array.slice(0, indice)
    const tableau2 = array.slice(indice)
    return [...shuffle(tableau1), ...tableau2]
  }
}

/**
* Mélange les lettres d'un string
*
* @Example
* motMelange = shuffleLettres (mot)
* @Source https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
export function shuffleLettres (txt) {
  const array = txt.split('')
  return shuffle(array).join('')
}

/**
* Mélange les items de deux tableaux de la même manière
*
*
* @Source https://stackoverflow.com/questions/18194745/shuffle-multiple-javascript-arrays-in-the-same-way
*/
export function shuffle2tableaux (obj1, obj2) {
  let index = obj1.length
  let rnd, tmp1, tmp2

  while (index) {
    rnd = Math.floor(Math.random() * index)
    index -= 1
    tmp1 = obj1[index]
    tmp2 = obj2[index]
    obj1[index] = obj1[rnd]
    obj2[index] = obj2[rnd]
    obj1[rnd] = tmp1
    obj2[rnd] = tmp2
  }
}

/**
* Trie un dictionnaire suivant ses clés
*
* @Example
* dictionnaire_tri = tridictionnaire(dictionnaire)
* @Source https://stackoverflow.com/questions/10946880/sort-a-dictionary-or-whatever-key-value-data-structure-in-js-on-word-number-ke
*/
export function tridictionnaire (dict) {
  const sorted = []
  for (const key in dict) {
    sorted[sorted.length] = key
  }
  sorted.sort()

  const tempDict = {}
  for (let i = 0; i < sorted.length; i++) {
    tempDict[sorted[i]] = dict[sorted[i]]
  }

  return tempDict
}

/**
* Filtre un dictionnaire suivant les premiers caractères de ses clés
*
* @Example
* filtreDictionnaire(dict,'6N') renvoie un dictionnaire où toutes les clés commencent par 6N
* @author Rémi Angot
*/
export function filtreDictionnaire (dict, sub) {
  return Object.assign({}, ...Object.entries(dict).filter(([k]) => k.substring(0, sub.length) === sub).map(([k, v]) => ({ [k]: v }))
  )
}

/**
* Polyfill Object.fromEntries
*
* @Source : https://gitlab.com/moongoal/js-polyfill-object.fromentries/
*/
if (!Object.fromEntries) {
  Object.defineProperty(Object, 'fromEntries', {
    value (entries) {
      if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument') }

      const o = {}

      Object.keys(entries).forEach((key) => {
        const [k, v] = entries[key]

        o[k] = v
      })

      return o
    }
  })
}

/**
* Filtre un dictionnaire suivant la valeur d'une clé
*
* @Example
* filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
* @author Rémi Angot
*/
export function filtreDictionnaireValeurCle (dict, key, val) {
  return Object.fromEntries(Object.entries(dict).filter(([k, v]) => v[key] === val))
}

/**
* Filtre un dictionnaire si une valeur appartient à une clé de type tableau
*
* @Example
* filtreDictionnaireValeurCle(dict,'annee',2020) renvoie un dictionnaire où toutes les clés annee seront égales à 2020
* @author Rémi Angot
*/
export function filtreDictionnaireValeurTableauCle (dict, key, val) {
  return Object.fromEntries(Object.entries(dict).filter(([k, v]) => cleExisteEtContient(v[key], val)))
}

function cleExisteEtContient (v, val) {
  if (v !== undefined) {
    return v.includes(val)
  } else {
    return false
  }
}

/**
* Concatène liste à elle-même en changeant l'ordre à chaque cycle
*
*
* @Example
* combinaisonListes([A,B,C],7)
* // [B,C,A,C,B,A,A,B,C]
*
* @author Rémi Angot
*/
export function combinaisonListes (liste, tailleMinimale) {
  if (liste.length === 0) return []
  let l = shuffle(liste)
  while (l.length < tailleMinimale) {
    l = l.concat(shuffle(liste))
  }
  return l
}

/**
* Concatène liste à elle-même en imposant à la nouvelle liste de contenir au moins tous les élements
* de la liste initiale mais sans gestion de nombre de doublons au final.
* @Example
* combinaisonListes2([A,B,C],7)
* // [B,C,B,B,C,A,B]
* combinaisonListes2([A,B,C,D],6)
* // [B,C,D,B,C,A,B]
* @author Eric Elter
*/
export function combinaisonListes2 (liste, tailleMinimale) {
  if (liste.length === 0) return []
  let l = liste
  while (l.length < tailleMinimale) {
    l = l.concat(choice(liste))
  }
  return shuffle(l)
}

export function combinaisonListesSansChangerOrdre (liste, tailleMinimale) {
  // Concatène liste à elle même en changeant
  while (liste.length < tailleMinimale) {
    liste = liste.concat(liste)
  }
  return liste
}
/**
* N'écrit pas un nombre s'il est égal à 1
* @Example
* //rienSi1(1)+'x' -> x
* //rienSi1(-1)+'x' -> -x
* @author Rémi Angot et Jean-Claude Lhote pour le support des fractions
*/
export function rienSi1 (a) {
  if (equal(a, 1)) return ''
  if (equal(a, -1)) return '-'
  if (a instanceof Fraction || a instanceof FractionX) return a.toLatex()
  if (Number(a)) return texNombre(a)
  window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
* Gère l'écriture de l'exposant en mode text (ne doit pas s'utiliser entre $ $)
* Pour le mode maths (entre $ $) on utilisera tout simplement ^3 pour mettre au cube ou ^{42} pour la puissance 42.
* @Example
* // 'dm'+texteExposant(3)
* @author Rémi Angot
*/
export function texteExposant (texte) {
  if (context.isHtml) {
    return `<sup>${texte}</sup>`
  } else {
    return `\\up{${texte}}`
  }
}

/**
* Ajoute les parenthèses et le signe
* @Example
* //(+3) ou (-3)
* @author Rémi Angot
*/
export function ecritureNombreRelatif (a) {
  let result = ''
  if (a > 0) {
    result = '(+' + a + ')'
  } else if (a < 0) {
    result = '(' + a + ')'
  } else { // ne pas mettre de parenthèses pour 0
    result = '0'
  }
  return result
}
/**
 * Idem ecritureNombreRelatif avec le code couleur : vert si positif, rouge si négatif, noir si nul
 * @param {number} a
 */
export function ecritureNombreRelatifc (a) {
  let result = ''
  if (a > 0) {
    result = miseEnEvidence('(+' + texNombrec(a) + ')', 'blue')
  } else if (a < 0) {
    result = miseEnEvidence('(' + texNombrec(a) + ')')
  } else { // ne pas mettre de parenthèses pour 0
    result = miseEnEvidence('0', 'black')
  }
  return result
}

/**
* Ajoute le + devant les nombres positifs
* @Example
* //+3 ou -3
* @author Rémi Angot et Jean-claude Lhote pour le support des fractions
*/
export function ecritureAlgebrique (a) {
  if (a instanceof Fraction || a instanceof FractionX) return fraction(a).ecritureAlgebrique
  else if (typeof a === 'number') {
    if (a >= 0) {
      return '+' + stringNombre(a)
    } else {
      return stringNombre(a)
    }
  } else if (a instanceof Decimal) {
    if (a.isPos()) {
      return '+' + stringNombre(a)
    } else {
      return stringNombre(a)
    }
  } else window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
* Ajoute le + devant les nombres positifs, n'écrit rien si 1
* @Example
* //+3 ou -3
* @author Rémi Angot et Jean-Claude Lhote pour le support des fractions
*/
export function ecritureAlgebriqueSauf1 (a) {
  if (equal(a, 1)) return '+'
  else if (equal(a, -1)) return '-'
  else if (a instanceof Fraction || a instanceof FractionX) return fraction(a).ecritureAlgebrique
  else if (typeof a === 'number') return ecritureAlgebrique(a)
  else window.notify('rienSi1 : type de valeur non prise en compte')
}

/**
 * Idem ecritureAlgebrique mais retourne le nombre en couleur (vert si positif, rouge si négatif et noir si nul)
 * @param {number} a
 */
export function ecritureAlgebriquec (a) {
  let result = ''
  if (a > 0) {
    result = miseEnEvidence('+' + texNombrec(a), 'blue')
  } else if (a < 0) {
    result = miseEnEvidence(texNombrec(a))
  } else result = miseEnEvidence(texNombrec(a), 'black')
  return result
}

/**
 * @param {number} r Un nombre relatif
 * @param {number} precision nombre de chiffres maximum après la virgule pour texNombre.
 * @returns {string} met en évidence le signe - si r < 0
 */

export function signeMoinsEnEvidence (r, precision = 0) {
  if (r < 0) return miseEnEvidence('-') + texNombre(Math.abs(r), precision)
  else return texNombre(Math.abs(r), precision)
}

/**
* Ajoute des parenthèses aux nombres négatifs
* @Example
* // 3 ou (-3)
* @author Rémi Angot
*/
export function ecritureParentheseSiNegatif (a) {
  let result = ''
  if (a >= 0) {
    result = a
  } else {
    result = `(${a})`
  }
  return result
}

/**
* Ajoute des parenthèses si une expression commence par un moins
* @Example
* // (-3x)
* @author Rémi Angot
*/
export function ecritureParentheseSiMoins (expr) {
  if (expr[0] === '-') return `(${expr})`
  else return expr
}

/**
 *
 * @author Jean-claude Lhote
 * @param {numero} 1=A, 2=B ..
 * @param {etapes} tableau de chaines comportant les expressions à afficher dans le membre de droite.
 */

export function calculAligne (numero, etapes) {
  let script = `$\\begin{aligned}${miseEnEvidence(lettreDepuisChiffre(numero))}&=${etapes[0]}`
  for (let i = 1; i < etapes.length - 1; i++) {
    script += `\\\\&=${etapes[i]}`
  }
  script += `\\\\${miseEnEvidence(lettreDepuisChiffre(numero) + '&=' + etapes[etapes.length - 1])}$`
  return script
}

/**
* Renvoie la valeur du chiffre (8->8, A->10, B->11...)
*
* @author Rémi Angot
*/
export function valeurBase (n) {
  switch (n) {
    case 'A': return 10
    case 'B': return 11
    case 'C': return 12
    case 'D': return 13
    case 'E': return 14
    case 'F': return 15
    default: return parseInt(n)
  }
}

export function baseValeur (n) {
  switch (n) {
    case 10: return 'A'
    case 11: return 'B'
    case 12: return 'C'
    case 13: return 'D'
    case 14: return 'E'
    case 15: return 'F'
    default: return Number(n).toString()
  }
}
/**
 * Convertit une chaine correspondant à un nombre écrit en base b en un nombre entier en base 10.
 * @param {} nombre
 * @param {number} b la base de départ
 */
export function baseNVersBase10 (stringNombre, b) {
  let result = 0
  if (typeof stringNombre === 'number') {
    stringNombre = stringNombre.toString()
  } else if (stringNombre instanceof Decimal) {
    stringNombre = stringNombre.toNumber().toString()
  }
  for (let i = 0; i < stringNombre.length; i++) {
    result += b ** i * valeurBase(stringNombre.charAt(stringNombre.length - 1 - i))
  }
  return result
}

export function base10VersBaseN (nombre, b) {
  // let puissanceMax = 0
  // let chiffre
  // let valeur
  // let code = ''
  // while (b ** (puissanceMax + 1) < nombre) {
  //   puissanceMax++
  // }
  // for (let i = puissanceMax; i >= 0; i--) {
  //   chiffre = 0
  //   do {
  //     valeur = chiffre * b ** i
  //     chiffre++
  //   } while (valeur + b ** i <= nombre)
  //   chiffre--
  //   code += baseValeur(chiffre)
  //   nombre -= chiffre * b ** i
  // }
  // return code
  if (nombre instanceof Decimal) return nombre.toNumber().toString(b).toUpperCase()
  else return nombre.toString(b).toUpperCase()
  // Il y avait un probleme avec 3 = (3)_3
}

/**
 *
 * @param {array} matrice M tableau 3x3 nombres
 * @param {array} vecteur A tableau 3 nombres
 * Fonction pouvant être utilisée en 2d avec des coordonnées homogènes
 * elle retourne le vecteur [x,y,z] résultat de M.A
 * @author Jean-Claude Lhote
 */

export function produitMatriceVecteur3x3 (matrice, vecteur) { // matrice est un tableau 3x3 sous la forme [[ligne 1],[ligne 2],[ligne 3]] et vecteur est un tableau de 3 nombres [x,y,z]
  const resultat = [0, 0, 0]
  for (let j = 0; j < 3; j++) { // Chaque ligne de la matrice
    for (let i = 0; i < 3; i++) { // On traite la ligne i de la matrice -> résultat = coordonnée i du vecteur résultat
      resultat[j] += matrice[j][i] * vecteur[i]
    }
  }
  return resultat
}
/**
 *
 * @param {array} matrice1 Matrice A
 * @param {array} matrice2 Matrice B
 * retourne la matrice A.B
 * @author Jean-Claude Lhote
 */

export function produitMatriceMatrice3x3 (matrice1, matrice2) { // les deux matrices sont des tableaux 3x3  [[ligne 1],[ligne 2],[ligne 3]] et le résultat est de la même nature.
  const resultat = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) { resultat[j][i] += matrice1[j][k] * matrice2[k][i] }
    }
  }
  return resultat
}
/**
 *
 * @param {array} point
 * calcule les coordonnées d'un point donné par ses coordonnées en repère orthonormal en repère (O,I,J) tel que IOJ=60°
 * @author Jean-Claude Lhote
 */
export function changementDeBaseOrthoTri (point) {
  if (point.length === 2) point.push(1)
  return produitMatriceVecteur3x3([[1, -Math.cos(Math.PI / 3) / Math.sin(Math.PI / 3), 0], [0, 1 / Math.sin(Math.PI / 3), 0], [0, 0, 1]], point)
}
/**
 *
 * @param {array} point
 * Changement de base inverse de la fonction précédente
 * @author Jean-CLaude Lhote
 */
export function changementDeBaseTriOrtho (point) {
  if (point.length === 2) point.push(1)
  return produitMatriceVecteur3x3([[1, Math.cos(Math.PI / 3), 0], [0, Math.sin(Math.PI / 3), 0], [0, 0, 1]], point)
}

/**
*
* @param {number} transformation Entier déterminant la transformation voulue
** 1=symétrie / passant par O
**2=symétrie \ passant par O
**3=symétrie _ passant par O
**4=symétrie | passant par O
**5= rotation 90° anti-horaire centre O
**6= rotation 90° horaire centre O
**7= symétrie centrale centre O
**11= rotation 60° anti-horaire centre O
**12= rotation 60° horaire centre O
**13= rotation 120° anti-horaire centre O
**14= rotation 120° horaire centre O
**8= translation coordonnées de O = vecteur de translation
**9= homothétie. centre O rapport k
**10= homothétie. centre O rapport 1/k
* @param {array} pointA Point dont on cherche l'image
* @param {array} pointO Centre du repère local pour les symétries, centre pour les rotations et les homothéties
* @param {array} vecteur Vecteur de la translation
* @param {number} rapport rapport d'homothétie
* @author Jean-Claude Lhote
*/
export function imagePointParTransformation (transformation, pointA, pointO, vecteur = [], rapport = 1) { // pointA,centre et pointO sont des tableaux de deux coordonnées
  // on les rends homogènes en ajoutant un 1 comme 3ème coordonnée)
  // nécessite d'être en repère orthonormal...
  // Point O sert pour les rotations et homothéties en tant que centre (il y a un changement d'origine du repère en O pour simplifier l'expression des matrices de transformations.)

  const matriceSymObl1 = matriceCarree([[0, 1, 0], [1, 0, 0], [0, 0, 1]]) // x'=y et y'=x
  const matriceSymxxprime = matriceCarree([[1, 0, 0], [0, -1, 0], [0, 0, 1]]) // x'=x et y'=-y
  const matriceSymYyPrime = matriceCarree([[-1, 0, 0], [0, 1, 0], [0, 0, 1]]) // x'=-x et y'=y
  const matriceSymObl2 = matriceCarree([[0, -1, 0], [-1, 0, 0], [0, 0, 1]]) // x'=-y et y'=-x
  const matriceQuartDeTourDirect = matriceCarree([[0, -1, 0], [1, 0, 0], [0, 0, 1]]) // x'=-y et y'=x
  const matriceQuartDeTourIndirect = matriceCarree([[0, 1, 0], [-1, 0, 0], [0, 0, 1]]) // x'=y et y'=-x
  const matriceSymCentrale = matriceCarree([[-1, 0, 0], [0, -1, 0], [0, 0, 1]]) // x'=-x et y'=-y
  const matriceRotation60Direct = matriceCarree([[0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]])
  const matriceRotation60Indirect = matriceCarree([[0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]])
  const matriceRotation120Direct = matriceCarree([[-0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]])
  const matriceRotation120Indirect = matriceCarree([[-0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]])

  let pointA1 = [0, 0, 0]
  let pointA2 = [0, 0, 0]

  if (pointA.length === 2) pointA.push(1)
  const x2 = pointO[0] // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et point d'intersection des axes))
  const y2 = pointO[1]
  const u = vecteur[0] // (u,v) vecteur de translation.
  const v = vecteur[1]
  const k = rapport // rapport d'homothétie

  const matriceChangementDeRepere = matriceCarree([[1, 0, x2], [0, 1, y2], [0, 0, 1]])
  const matriceChangementDeRepereInv = matriceCarree([[1, 0, -x2], [0, 1, -y2], [0, 0, 1]])
  const matriceTranslation = matriceCarree([[1, 0, u], [0, 1, v], [0, 0, 1]])
  const matriceHomothetie = matriceCarree([[k, 0, 0], [0, k, 0], [0, 0, 1]])
  const matriceHomothetie2 = matriceCarree([[1 / k, 0, 0], [0, 1 / k, 0], [0, 0, 1]])

  let matrice

  switch (transformation) {
    case 1:
      matrice = matriceSymObl1.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 2:
      matrice = matriceSymObl2.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 3:
      matrice = matriceSymxxprime.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 4:
      matrice = matriceSymYyPrime.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 5:
      matrice = matriceQuartDeTourDirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 6:
      matrice = matriceQuartDeTourIndirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 7:
      matrice = matriceSymCentrale.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 11:
      matrice = matriceRotation60Direct.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 12:
      matrice = matriceRotation60Indirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 13:
      matrice = matriceRotation120Direct.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 14:
      matrice = matriceRotation120Indirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 8:
      matrice = matriceTranslation.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 9:
      matrice = matriceHomothetie.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 10:
      matrice = matriceHomothetie2.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
  }
  pointA1 = matrice.multiplieVecteur(pointA)
  pointA2 = matriceChangementDeRepere.multiplieVecteur(pointA1)
  return pointA2
}

/**
* Retourne le signe d'un nombre
* @Example
* // + ou -
* @author Rémi Angot
*/
export function signe (a) { // + ou -
  let result = ''
  if (a > 0) {
    result = '+'
  } else {
    result = '-'
  }
  return result
}

/**
 *
 * @param {number} a
 * -1 si a est négatif, 1 sinon.
 * @author Jean-Claude Lhote
 */
export function unSiPositifMoinsUnSinon (a) {
  if (a < 0) return -1
  else return 1
}
/**
* Retourne la somme des chiffres d'un nombre en valeur et sous forme de String [valeur, String]
* @Example
* sommeDesChiffress(123)
* // [ 6, '1+2+3']
* @author Rémi Angot
*/export function sommeDesChiffres (n) {
  const nString = n.toString()
  let somme = 0
  let sommeString = ''
  for (let i = 0; i < nString.length - 1; i++) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(nString[i] !== -1)) {
      sommeString += nString[i] + '+'
      somme += Number(nString[i])
    }
  }
  if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(nString[nString.length - 1] !== -1)) {
    sommeString += nString[nString.length - 1]
    somme += Number(nString[nString.length - 1])
  }
  return [somme, sommeString]
}

/**
 * Retourne l'arrondi (par défaut au centième près)
 * @author Rémi Angot
 * @param {number} nombre
 * @param {number} precision
 * @return {number}
 */
export function arrondi (nombre, precision = 2) {
  if (isNaN(nombre)) {
    window.notify('Le nombre à arrondir n\'en est pas un, ça retourne NaN', { nombre, precision })
    return NaN
  } else {
    return round(nombre, precision)
  }
}
/**
 * Retourne la troncature signée de nombre.
 * @author Jean-Claude Lhote
 */
export function troncature (nombre, precision) {
  const tmp = Math.pow(10, precision)
  const absolu = new Decimal(nombre).abs()
  const tronc = absolu.mul(tmp).floor().div(tmp)
  if (nombre < 0) return tronc.mul(-1).toNumber()
  else return tronc.toNumber()
}

/**
* Renvoie la valeur absolue
* @author Rémi Angot + ajout du support des décimaux par Jean-Claude Lhote
*/
export function abs (a) {
  if (a instanceof Decimal) return a.abs()
  return Math.abs(a)
}

/**
* Retourne un arrondi sous la forme d'un string avec une virgule comme séparateur décimal
* @author Rémi Angot Fonction rendue inutile par Jean-Claude Lhote : lui substituer texNombre ou stringNombre selon le contexte.
*/
// export function arrondiVirgule (nombre, precision = 2) { //
// const tmp = Math.pow(10, precision)
//  return String(round(nombre, precision)).replace('.', ',')
// }

/**
* Retourne égal si la valeur égal l'arrondi souhaité ou environ égal si ce n'est pas le cas
* le nombre a est comparé à son arrondi à précision près. Si la différence est inférieure à epsilon, alors on retourne '=' sinon '\\approx'
* fonctionne aussi si a est une fraction : permet de finir un calcul par la valeur décimale si on veut.
* @author Jean-Claude Lhote
*/
export function egalOuApprox (a, precision) {
  if (typeof a === 'object' && ['Fraction', 'FractionX'].indexOf(a.type) !== -1) {
    return egal(a.n / a.d, arrondi(a.n / a.d, precision)) ? '=' : '\\approx'
  } else if (a instanceof Decimal) {
    return a.eq(a.toDP(precision)) ? '=' : '\\approx'
  } else if (!isNaN(a) && !isNaN(precision)) return egal(a, arrondi(a, precision)) ? '=' : '\\approx'
  else {
    window.notify('egalOuApprox : l\'argument n\'est pas un nombre', { a, precision })
    return 'Mauvais argument (nombres attendus).'
  }
}

/**
* Renvoie le PGCD de deux nombres
* @author Rémi Angot
*/
export function pgcd (...args) {
  return gcd(...args)
}

/**
* Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
* * **ATTENTION Fonction clonée dans la classe FractionX()**
* @author Rémi Angot
*/
export function fractionSimplifiee (n, d) {
  const p = pgcd(n, d)
  let ns = n / p
  let ds = d / p
  if (ns < 0 && ds < 0) {
    [ns, ds] = [-ns, -ds]
  }
  if (ns > 0 && ds < 0) {
    [ns, ds] = [-ns, -ds]
  }
  return [ns, ds]
}

/**
* Retourne le code LaTeX d'une fraction simplifiée ou d'un nombre entier
* @author Rémi Angot
*/
export function texFractionReduite (n, d) {
  if (Math.abs(n) % Math.abs(d) === 0) {
    return n / d
  } else {
    return texFractionSigne(fractionSimplifiee(n, d)[0], fractionSimplifiee(n, d)[1])
  }
}

/**
 * produitDeDeuxFractions(num1,den1,num2,den2) retourne deux chaines :
 * la première est la fraction résultat, la deuxième est le calcul mis en forme Latex avec simplification éventuelle
 * Applique une simplification si le numérateur de l'une est égal au dénominateur de l'autre.
 */
export function produitDeDeuxFractions (num1, den1, num2, den2) {
  let num, den, texProduit
  if (num1 === den2) {
    texProduit = `\\dfrac{\\cancel{${num1}}\\times ${num2}}{${den1}\\times\\cancel{${den2}}}`
    num = num2
    num1 = 1
    den2 = 1
    den = den1
  } else if (num2 === den1) {
    texProduit = `\\dfrac{${num1}\\times \\cancel{${num2}}}{\\cancel{${den1}}\\times${den2}}`
    num = num1
    num2 = 1
    den1 = 1
    den = den2
  } else {
    num = num1 * num2
    den = den1 * den2
    texProduit = `\\dfrac{${num1}\\times ${num2}}{${den1}\\times${den2}}`
  }
  return [texFraction(num, den), texProduit, [num1, den1, num2, den2]]
}

/**
*
* Simplifie une fraction en montrant les étapes
* Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
* @author Rémi Angot
*/
export function simplificationDeFractionAvecEtapes (num, den) {
  let result = '='
  if (num === 0) {
    return '=0'
  }
  const signe = num * den < 0 ? '-' : ''
  const numAbs = Math.abs(num)
  const denAbs = Math.abs(den)
  // Est-ce que le résultat est simplifiable ?
  const s = pgcd(numAbs, denAbs)
  if (s !== 1) {
    if (numAbs % denAbs === 0) { // si le résultat est entier
      result += `${num / den}`
    } else {
      result += `${signe}${texFraction(numAbs / s + miseEnEvidence('\\times' + s), denAbs / s + miseEnEvidence('\\times' + s))}=${texFractionSigne(num / s, den / s)}`
    }
  } else if (num < 0 || den < 0) {
    result += `${texFractionSigne(num, den)}`
  } else return ''
  return result
}

/**
 * Retourne l'égalité des produits en croix à partir d'un tableau contenant les deux fractions [[a,b],[c,d]] pour a/b=c/d retourne ad=bc
 * Le résultat est un string en mode maths inline
 * @author Jean-Claude Lhote
 */

export function produitsEnCroix ([[a, b], [c, d]]) { // écrit une chaine pour a*d=b*c
  let result = ''
  result += `$${a}\\times${d}=${b}\\times${c}$`
  return result
}

/**
 * Retourne la quatrième proportionnelle de 3 nombres en fonction d'une précision demandée
 * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
 * @author Jean-Claude Lhote
 */

export function quatriemeProportionnelle (a, b, c, precision) { // calcul de b*c/a
  let result = ''
  if ((typeof a) === 'number' && (typeof b) === 'number' && (typeof c) === 'number') {
    if (a === 0) {
      result = '=erreur : division par zéro'
      return result
    }
    const p4 = new Decimal(b).mul(c).div(a)
    result += `\\dfrac{${texNombrec(b)}\\times${texNombrec(c)}}{${texNombrec(a)}}`
    if (p4.eq(p4.toDP(precision))) result += '='
    else result += '\\approx'
    result += `${texNombre(p4, precision)}`
    return result
  } else {
    return `\\dfrac{${b} \\times${c}}{${a}}`
  }
}

/**
 * renvoie une chaine correspondant à l'écriture réduite de ax+b selon les valeurs de a et b
 * @author Jean-Claude Lhote
 * @param {number} a
 * @param {number} b
 */
export function reduireAxPlusB (a, b) {
  if (!(a instanceof Decimal)) a = new Decimal(a)
  if (!(b instanceof Decimal)) b = new Decimal(b)
  let result = ''
  if (!a.isZero()) {
    if (a.eq(1)) result = 'x'
    else if (a.eq(-1)) result = '-x'
    else result = `${stringNombre(a)}x`
  }
  if (!b.isZero()) {
    if (!a.isZero()) result += `${ecritureAlgebrique(b)}`
    else result = stringNombre(b)
  } else if (a.isZero()) result = '0'
  return result
}
/**
 * renvoie une chaine correspondant à l'écriture réduite de ax^3+bx^2+cx+d selon les valeurs de a,b,c et d
 * @author Jean-Claude Lhote
 */
export function reduirePolynomeDegre3 (a, b, c, d) {
  let result = ''
  if (a !== 0) {
    switch (a) {
      case 1:
        result += 'x^3'
        break
      case -1:
        result += '-x^3'
        break
      default:
        result += `${a}x^3`
        break
    }
    if (b !== 0) {
      switch (b) {
        case 1:
          result += '+x^2'
          break
        case -1:
          result += '-x^2'
          break
        default:
          result += `${ecritureAlgebrique(b)}x^2`
          break
      }
    }
    if (c !== 0) {
      switch (c) {
        case 1:
          result += '+x'
          break
        case -1:
          result += '-x'
          break
        default:
          result += `${ecritureAlgebrique(c)}x`
          break
      }
    }
    if (d !== 0) {
      result += `${ecritureAlgebrique(d)}`
    }
  } else { // degré 2 pas de degré 3
    if (b !== 0) {
      switch (b) {
        case 1:
          result += 'x^2'
          break
        case -1:
          result += '-x^2'
          break
        default:
          result += `${b}x^2`
          break
      }
      if (c !== 0) {
        switch (c) {
          case 1:
            result += '+x'
            break
          case -1:
            result += '-x'
            break
          default:
            result += `${ecritureAlgebrique(c)}x`
            break
        }
      }
      if (d !== 0) {
        result += `${ecritureAlgebrique(d)}`
      }
    } else // degré 1 pas de degré 2 ni de degré 3
    if (c !== 0) {
      switch (c) {
        case 1:
          result += 'x'
          break
        case -1:
          result += '-x'
          break
        default:
          result += `${c}x`
          break
      }
      if (d !== 0) {
        result += `${ecritureAlgebrique(d)}`
      }
    } else { // degré 0 a=0, b=0 et c=0
      result += `${d}`
    }
  }
  return result
}

/**
 * Donne la liste des facteurs premiers d'un nombre
 * @param {Entier} n - Nombre à décomposer
 * @returns {Entier[]} - Liste des facteurs premiers
*/
export function obtenirListeFacteursPremiers (n) {
  const facteurs = []
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      facteurs.push(i)
      n /= i
    }
  }
  return facteurs
}

/**
 *
 * @param {Entier} n
 * Retourne la factorisation d'un entier sous la forme [[a0,n0],[a1,n1],...] où a0,a1 sont les facteurs premiers et n0, n1 sont les exposants de ces facteurs.
 * @author Jean-Claude Lhote
 */

export function factorisation (n) {
  const liste = obtenirListeFacteursPremiers(n)
  const facto = []; let index = 0
  for (let i = 0; i < liste.length;) {
    if (liste[i] === 0) i++
    else {
      facto.push([liste[i], 1])
      index++
      for (let j = i + 1; j < liste.length; j++) {
        if (liste[j] === liste[i]) {
          facto[index - 1][1]++
          liste[j] = 0
        }
      }
      i++
    }
  }
  return facto
}
/**
 *
 * @param {number} n
 * @param {boolean} puissancesOn
 * @returns {string} texFacto
 */
export function texFactorisation (n, puissancesOn = true) {
  let texFacto = ''
  let facto = []
  if (puissancesOn) {
    facto = factorisation(n)
    for (let i = 0; i < facto.length - 1; i++) {
      texFacto += `${facto[i][0]}${facto[i][1] > 1 ? '^{' + facto[i][1] + '}\\times ' : '\\times '}`
    }
    texFacto += `${facto[facto.length - 1][0]}${facto[facto.length - 1][1] > 1 ? '^{' + facto[facto.length - 1][1] + '}' : ''}`
  } else {
    facto = obtenirListeFacteursPremiers(n)
    for (let i = 0; i < facto.length - 1; i++) {
      texFacto += `${facto[i][0]}\\times `
    }
    texFacto += `${facto[facto.length - 1][0]}`
  }
  return texFacto
}

/**
 *
 * @param {Entier} n
 * Extrait le plus grand nombre possible de la racine carrée de n
 * retourne le résulat [a,b] pour a²b=n
 * @author Jean-Claude Lhote
 */
export function extraireRacineCarree (n) {
  const facto = factorisation(n)
  let radical = 1; let facteur = 1
  for (let i = 0; i < facto.length; i++) {
    if (facto[i][1] % 2 === 0) {
      facteur *= facto[i][0] ** (facto[i][1] >> 1)
    } else if (facto[i][1] > 1) {
      facteur *= facto[i][0] ** ((facto[i][1] - 1) >> 1)
      radical *= facto[i][0]
    } else radical *= facto[i][0]
  }
  return [facteur, radical]
}
/**
 *
 * @param {Entier} n
 * retourne le code Latex de la racine carrée de n "réduite"
 * @author Jean-CLaude Lhote
 */
export function texRacineCarree (n) {
  const result = extraireRacineCarree(n)
  if (result[1] === 1) return `${result[0]}`
  else if (result[0] === 1) return `\\sqrt{${result[1]}}`
  else return `${result[0]}\\sqrt{${result[1]}}`
}

/**
 *
 * @param {'string | array'} expression ou tableau d'expressions à évaluer avec XCas
 * @returns string
 * @author Rémi Angot
 */
export function xcas (expression) {
  const sortie = (txt) => UI.eval(`latex(${txt})`).replaceAll('\\cdot ', '~').replaceAll('\\frac', '\\dfrac').replaceAll('"', '')
  if (typeof expression === 'string') return sortie(expression)
  else {
    const result = []
    for (const txt of expression) {
      result.push(sortie(txt))
    }
    return result
  }
}

/**
* Utilise un arrondi au millionième pour éviter les flottants à rallonge (erreurs d'arrondis des flottants)
* Le 2e argument facultatif permet de préciser l'arrondi souhaité : c'est le nombre max de chiffres après la virgule souhaités
* @author Rémi Angot modifié par Jean-Claude Lhote
*/
export function calcul (x, arrondir) {
  const sansPrecision = (arrondir === undefined)
  if (sansPrecision) arrondir = 6
  if (typeof x === 'string') {
    window.notify('Calcul : Reçoit une chaine de caractère et pas un nombre', { x })
    x = parseFloat(evaluate(x))
  }
  if (sansPrecision && !egal(x, arrondi(x, arrondir), 10 ** (-arrondir - 1))) window.notify('calcul : arrondir semble avoir tronqué des décimales sans avoir eu de paramètre de précision', { x, arrondir })
  return parseFloat(x.toFixed(arrondir))
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux
* Le 2e argument facultatif permet de préciser l'arrondi souhaité
* @author Rémi Angot
*/
export function nombreDecimal (expression, arrondir = false) {
  if (!arrondir) {
    return stringNombre(new Decimal(expression), 15)
  } else {
    return stringNombre(new Decimal(expression), arrondir)
  }
}

/**
* Utilise Algebrite pour s'assurer qu'il n'y a pas d'erreur dans les calculs avec des décimaux et retourne un string avec la virgule comme séparateur décimal
* @author Rémi Angot
* texNombrec n'apportant rien, je la shinte.
*/

export function texNombrec (expression, precision) {
  // return texNombre(parseFloat(Algebrite.eval(expression)))
  return texNombre(expression, precision)
}

/**
* Formattage pour une sortie LaTeX entre $$
* formatFraction = false : si l'expression est un objet fraction du module mathjs alors elle peut donner l'écriture fractionnaire
* Pour une fraction négative la sortie est -\dfrac{6}{7} au lieu de \dfrac{-6}{7}
* @author Frédéric PIOU
*/

export function texNum (expression, formatFraction = false) {
  if (typeof expression === 'object') {
    const signe = expression.s === 1 ? '' : '-'
    if (formatFraction === true) {
      expression = expression.d !== 1 ? signe + texFraction(expression.n, expression.d) : signe + expression.n
    } else {
      expression = texNombre(evaluate(format(expression)))
    }
    expression = expression.replace(',', '{,}').replace('{{,}}', '{,}')
  } else {
    expression = texNombre(parseFloat(Algebrite.eval(expression)))
  }
  return expression
}

/**
 * renvoie le résultat de l'expression en couleur (vert=positif, rouge=négatif, noir=nul)
 * @param {string} expression l'expression à calculer
 */
export function texNombreCoul (nombre) {
  if (nombre > 0) return miseEnEvidence(texNombrec(nombre), 'green')
  else if (nombre < 0) return miseEnEvidence(texNombrec(nombre), 'red')
  else return miseEnEvidence(texNombrec(0), 'black')
}

/**
 * prend une liste de nombres relatifs et la retourne avec les positifs au début et les négatifs à la fin.
 * @param {array} liste la liste de nombres à trier
 */
export function triePositifsNegatifs (liste) {
  const positifs = []
  const negatifs = []
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] > 0) positifs.push(liste[i])
    else negatifs.push(liste[i])
  }
  return positifs.concat(negatifs)
}

/**
* Renvoie un tableau (somme des termes positifs, somme des termes négatifs)
* @author Rémi Angot
*/
export function sommeDesTermesParSigne (liste) {
  let sommeDesPositifs = 0; let sommeDesNegatifs = 0
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] > 0) {
      sommeDesPositifs += liste[i]
    } else {
      sommeDesNegatifs += liste[i]
    }
  }
  return [sommeDesPositifs, sommeDesNegatifs]
}

/**
 * Créé un string de nbsommets caractères dans l'ordre alphabétique et en majuscule qui ne soit pas dans la liste donnée en 2e argument
 * @param {integer} nbsommets
 * @param {string[]} listeAEviter
 * @author Rémi Angot
 * Ajout des while pour s'assurer de bien avoir des lettres majuscules le 08/05/2022 par Guillaume Valmont
 **/
export function creerNomDePolygone (nbsommets, listeAEviter = []) {
  let premiersommet = randint(65, 90 - nbsommets)
  let polygone = ''
  if (listeAEviter === undefined) listeAEviter = []
  for (let i = 0; i < nbsommets; i++) {
    let augmentation = i
    while (premiersommet + augmentation > 90) augmentation -= 26
    while (premiersommet + augmentation < 65) augmentation += 26
    polygone += String.fromCharCode(premiersommet + augmentation)
  }

  if (listeAEviter.length < 26 - nbsommets - 1) { // On évite la liste à éviter si elle n'est pas trop grosse sinon on n'en tient pas compte
    let cpt = 0
    while (possedeUnCaractereInterdit(polygone, listeAEviter) && cpt < 20) {
      polygone = ''
      premiersommet = randint(65, 90 - nbsommets)
      for (let i = 0; i < nbsommets; i++) {
        polygone += String.fromCharCode(premiersommet + i)
      }
      cpt++ // Au bout de 20 essais on laisse tomber la liste à éviter
    }
  } else {
    console.log('Trop de questions donc plusieurs polygones peuvent avoir le même nom')
  }
  return polygone
}

/**
* Vérifie dans un texte si un de ses caractères appartient à une liste à éviter
* @author Rémi Angot
*/
export function possedeUnCaractereInterdit (texte, listeAEviter) {
  let result = false
  for (const motAeviter of listeAEviter) {
    for (let i = 0; i < motAeviter.length; i++) {
      if (texte.indexOf(motAeviter[i]) > -1) {
        result = true
      }
    }
  }
  return result
}
/**
 * retourne une liste de combien de nombres compris entre m et n (inclus) en évitant les valeurs de listeAEviter
 * toutes la liste des nombres est retournée si combien est supérieur à l'effectif disponible
 * les valeurs sont dans un ordre aléatoire.
 * @author Jean-Claude Lhote
 *
 */
export function choisitNombresEntreMetN (m, n, combien, listeAEviter = []) {
  let t
  if (m > n) {
    t = m
    m = n
    n = t
  } else if (m === n) { return [n] }
  if (combien > n - m) combien = n - m
  let index = rangeMinMax(m, n, listeAEviter)
  index = shuffle(index)
  index = index.slice(0, combien)
  return index
}
/**
 * retourne une liste de lettres majuscules (ou minuscule si majuscule=false)
 * il y aura nombre lettres dans un ordre aléatoire
 * les lettres à éviter sont données dans une chaine par exemple : 'QXY'
 * @author Jean-Claude Lhote
 */
export function choisitLettresDifferentes (nombre, lettresAeviter = '', majuscule = true) {
  const listeAEviter = []; const lettres = []
  for (const l of lettresAeviter) {
    listeAEviter.push(l.charCodeAt(0) - 64)
  }
  const index = choisitNombresEntreMetN(1, 26, nombre, listeAEviter)
  for (const n of index) {
    if (majuscule) lettres.push(lettreDepuisChiffre(n))
    else lettres.push(lettreMinusculeDepuisChiffre(n))
  }
  return lettres
}
export function cesar (word, decal) {
  let mot = ''; let code = 65
  for (let x = 0; x < word.length; x++) {
    code = word.charCodeAt(x) % 65
    code = (code + decal) % 26 + 65
    mot += String.fromCharCode(code)
  }
  return mot
}

export function codeCesar (mots, decal) {
  const motsCodes = []
  for (let x = 0; x < mots.length; x++) {
    motsCodes.push(cesar(mots[x], decal))
  }
  return motsCodes
}

/**
* Renvoie une lettre majuscule depuis un nombre compris entre 1 et 702
* @author Rémi Angot
*@Example
* // 0 -> @ 1->A ; 2->B...
* // 27->AA ; 28 ->AB ...
*/
export function lettreDepuisChiffre (i) {
  let result = ''
  if (i <= 26) {
    result = String.fromCharCode(64 + i)
  } else {
    if (i % 26 === 0) {
      result = String.fromCharCode(64 + Math.floor(i / 26) - 1)
      result += String.fromCharCode(64 + 26)
    } else {
      result = String.fromCharCode(64 + Math.floor(i / 26))
      result += String.fromCharCode(64 + i % 26)
    }
  }
  return result
}

/**
* Renvoie une lettre minuscule depuis un nombre compris entre 1 et 702
* @author Rémi Angot
*@Example
* // 0 -> @ 1->a ; 2->b...
* // 27->aa ; 28 ->ab ...
*/
export function lettreMinusculeDepuisChiffre (i) {
  return lettreDepuisChiffre(i).toLowerCase()
}

/**
* Renvoie une lettre majuscule (éventuellement indicée) depuis un nombre compris entre 1 et... sans limite.
* @author Eric Elter
*@Example
* // 0 -> @ 1->A ; 2->B...
* // 27->A_1 ; 28 ->A_2 ...
*/
export function lettreIndiceeDepuisChiffre (i) {
  const indiceLettre = quotientier(i - 1, 26) === 0 ? '' : quotientier(i - 1, 26)
  return String.fromCharCode(64 + (i - 1) % 26 + 1) + (i > 26 ? `_{${indiceLettre}}` : '')
}

/**
* Renvoie une lettre minuscule (éventuellement indicée) depuis un nombre compris entre 1 et... sans limite.
* @author EricElter
*@Example
* // 0 -> @ 1->a ; 2->b...
* // 27->a_1 ; 28 ->a_2 ...
*/
export function lettreIndiceeMinusculeDepuisChiffre (i) {
  return lettreIndiceeDepuisChiffre(i).toLowerCase()
}

/**
* @author Rémi Angot
* @Example
* //0h24 est accepté
*/
export function minToHoraire (minutes) {
  let nbHour = parseInt(minutes / 60)
  if (nbHour > 23) {
    nbHour = nbHour - 24
  }
  const nbminuteRestante = (minutes % 60)
  if (nbminuteRestante > 9) {
    return (nbHour + sp() + 'h' + sp() + nbminuteRestante)
  } else {
    return (nbHour + sp() + ' h' + sp() + '0' + nbminuteRestante)
  }
}

/**
* @author Rémi Angot
* @Example
* //on écrira 24 minutes plutôt que 0h24
*/
export function minToHour (minutes) {
  let nbHour = parseInt(minutes / 60)
  if (nbHour > 23) {
    nbHour = nbHour - 24
  }
  const nbminuteRestante = (minutes % 60)
  if (nbHour === 0) {
    return (nbminuteRestante + sp() + 'min')
  } else {
    if (nbminuteRestante > 9) {
      return (nbHour + sp() + 'h' + sp() + nbminuteRestante)
    } else {
      return (nbHour + sp() + ' h' + sp() + '0' + nbminuteRestante)
    }
  }
}

/**
 * Renvoie un tableau de deux valeurs : le nombre d'heures dans un paquet de minutes ainsi que le nombre de minutes restantes.
* @author Eric Elter
* @example minToHeuresMinutes (127) renvoie [2,7] car 127min = 2h7min
* @example minToHeuresMinutes (300) renvoie [5,0] car 300min = 6h
* @example minToHeuresMinutes (1456) renvoie [24,16] car 1456min = 24h16min
*
*/
export function minToHeuresMinutes (minutes) {
  return [parseInt(minutes / 60), (minutes % 60)]
}

/**
* Renvoie un prénom féminin au hasard
* @author Rémi Angot
*/
export function prenomF (n = 1) {
  if (n === 1) {
    return choice(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine'])
  } else {
    return shuffle(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine']).slice(0, n)
  }
}

/**
* Renvoie un prénom masculin au hasard
* @author Rémi Angot
*/
export function prenomM (n = 1) {
  if (n === 1) {
    return choice(['Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid'])
  } else {
    return shuffle(['Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid']).slice(0, n)
  }
}

/**
* Renvoie un prénom au hasard
* @author Rémi Angot
*/
export function prenom (n = 1) {
  if (n === 1) {
    return choice([prenomF(), prenomM()])
  } else {
    return shuffle(['Aude', 'Béatrice', 'Carine', 'Corinne', 'Dalila', 'Elsa', 'Farida', 'Julie', 'Karole', 'Léa', 'Lisa', 'Manon', 'Marina', 'Magalie', 'Nadia', 'Nawel', 'Teresa', 'Vanessa', 'Yasmine', 'Arthur', 'Benjamin', 'Bernard', 'Christophe', 'Cyril', 'David', 'Fernando', 'Guillaume', 'Jean-Claude', 'Joachim', 'José', 'Kamel', 'Karim', 'Laurent', 'Mehdi', 'Nacim', 'Pablo', 'Rémi', 'Victor', 'Yazid']).slice(0, n)
  }
}

/**
* Renvoie un petit objet féminin au hasard
* @author Mireille Gain
*/
export function objetF () {
  return choice(['boîtes', 'bougies', 'cartes de voeux', 'gommes', 'photos', 'petites peluches'])
}

/**
* Renvoie un petit objet masculin au hasard
* @author Mireille Gain
*/
export function objetM () {
  return choice(['stickers', 'gâteaux', 'cahiers', 'livres', 'stylos', 'crayons'])
}

/**
* Renvoie un petit objet au hasard
* @author Mireille Gain
*/
export function objet () {
  return choice(['billes', 'bonbons', 'bougies', 'cartes de voeux', 'crayons', 'gâteaux', 'gommes', 'photos', 'stickers', 'cahiers'])
}

/**
 * Définit l'objet personne
 * @author Jean-Claude Lhote
 * le 14/03/2021
 */
class Personne {
  constructor ({ prenom = '', genre = '', pronom = '', Pronom = '' } = {}) {
    let choix
    this.prenom = ''
    this.genre = ''
    this.pronom = ''
    this.Pronom = ''
    if (prenom === '' || ((typeof prenom) === 'undefined')) { // On le/la baptise
      choix = prenomPronom()
      this.prenom = choix[0]
      this.pronom = choix[1]
    } else if (pronom === '') { // le pronom n'est pas précisé
      this.pronom = 'on'
      this.Pronom = 'On'
    }
    if (genre === '') {
      if (this.pronom === 'il') {
        this.Pronom = 'Il'
        this.genre = 'masculin'
      } else if (this.pronom === 'elle') {
        this.Pronom = 'Elle'
        this.genre = 'féminin'
      } else this.genre = 'neutre'
    }
  }
}

/**
 * crée une instance de la classe Personne
 * @author Jean-Claude Lhote
 * le 14/03/2021
 */
export function personne ({ prenom = '', genre = '', pronom = '' } = {}) {
  return new Personne({ prenom: prenom, genre: genre, pronom: pronom })
}

/**
 * Crée un tableau de n objet de la classe Personne
 * @author Jean-Claude Lhote
 * le 14/03/2021
 */
export function personnes (n) {
  const liste = []; let essai; let trouve
  for (let i = 0; i < n;) {
    essai = personne()
    trouve = false
    for (let j = 0; j < liste.length; j++) {
      if (liste[j].prenom === essai.prenom) {
        trouve = true
        break
      }
    }
    if (trouve === false) {
      liste.push(essai)
      i++
    }
  }
  return liste
}

/**
 * Renvoie un couple [prénom,pronom] où pronom='il' ou 'elle'
 *  @author Jean-Claue Lhote
 */
export function prenomPronom () {
  if (choice([true, false])) {
    return [prenomM(1), 'il']
  } else {
    return [prenomF(1), 'elle']
  }
}

/**
* Renvoie un tableau avec les résultats des tirages successifs
* @param nombreTirages Combien de tirages ?
* @param nombreFaces Pour spécifier le type de dés
* @param nombreDes Combien de dés à chaque tirage ?
* @author Jean-Claude Lhote
*/
export function tirerLesDes (nombreTirages, nombreFaces, nombreDes) {
  const tirages = []
  for (let i = 0; i <= (nombreFaces - 1) * nombreDes; i++) tirages.push([i + nombreDes, 0])
  for (let i = 0, resultat; i < nombreTirages; i++) {
    resultat = 0
    for (let j = 0; j < nombreDes; j++) resultat += randint(1, nombreFaces)
    tirages[resultat - nombreDes][1]++
  }
  return tirages
}
/**
* Renvoie un tableau de nombres
* @param nombreNotes
* @param noteMin
* @param noteMax
* @param distincts Si distincts === true, les notes de la liste seront toutes distinctes
* @author Jean-Claude Lhote et Guillaume Valmont
*/
export function listeDeNotes (nombreNotes, noteMin = 0, noteMax = 20, distincts = false) {
  const notes = []
  let candidat, present, limite // nombre candidat, est-ce qu'il est déjà présent, une limite d'itérations pour éviter les boucles infinies
  limite = 0
  for (let i = 0; i < nombreNotes;) {
    limite += 1
    if (distincts && limite < 100) { // Si les nombres doivent être tous distincts et que la limite d'itérations n'est pas encore atteinte,
      candidat = randint(noteMin, noteMax) // on tire au sort un nombre candidat,
      present = false
      for (let j = 0; j < notes.length; j++) { // on vérifie s'il est présent,
        if (candidat === notes[j]) {
          present = true
          break
        }
      }
      if (!present) { // s'il n'est pas présent, on le push.
        notes.push(candidat)
        i++
      }
    } else { // Si les nombres n'ont pas tous à être distincts, on push directement.
      notes.push(randint(noteMin, noteMax))
      i++
    }
  }
  return notes
}

/**
* Renvoie le nombre de jour d'un mois donné
* @param n quantième du mois (janvier=1...)
* @author Jean-Claude Lhote
*/
export function joursParMois (n, annee = 2022) {
  const joursMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (n === 2) {
    if (((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) return 29 // années bissextiles.
    else return 28
  } else return joursMois[n - 1]
}
/**
* Renvoie un tableau de températures
* @param base température médiane
* @mois quantième du mois (janvier=1...)
* @annee pour déterminer si elle est bissextile ou non
* @author Jean-Claude Lhote
*/
export function unMoisDeTemperature (base, mois, annee) {
  const temperatures = []
  let nombreJours = joursParMois(mois)
  if (mois === 2) {
    if (((annee % 4 === 0) && (annee % 100 !== 0)) || (annee % 400 === 0)) nombreJours = 29 // années bissextiles.
    else nombreJours = 28
  }
  temperatures.push(randint(-3, 3) + base)
  for (let i = 1; i < nombreJours; i++) temperatures.push(temperatures[i - 1] + randint(-2, 2))
  return temperatures
}

/**
* Renvoie le nom du mois
* @param n quantième du mois
* @author Jean-Claude Lhote
*/
export function nomDuMois (n) {
  const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
  return mois[n - 1]
}

/**
* Renvoie le nom du jour
* @param n quantième du jour
* @author Mireille Gain
*/
export function nomDuJour (n) {
  const jour = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  return jour[n - 1]
}

/**
* Renvoie le nom d'un jour au hasard
* @param n quantième du jour
* @author Mireille Gain
*/
export function jour () {
  return choice(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'])
}

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
* Renvoie la consigne en titre 4
* @author Rémi Angot
*/
export function htmlConsigne (consigne) {
  if (consigne) return '<h4>' + consigne + '</h4>\n\n'
  else return ''
}

/**
* Renvoie \exo{consigne}
* @author Rémi Angot
*/
export function texConsigne (consigne) {
  return '\\exo{' + consigne.replace(/<br>/g, '\\\\') + '}\n\n'
}
/**
 * @author Frédéric Piou
 * @param {number} nb
 * @returns retourne un nombre au format français sans espace après la virgule
 */
export function num (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ').replace(',', '{,}')
}
/**
 * @author Frédéric Piou
 * @param {number} nb
 * @returns retourne un nombre au format français
 */
export function numberFormat (nb) {
  return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, '\\thickspace ')
}

/**
 * La chaîne de caractères en sortie doit être interprétée par KateX et doit donc être placée entre des $ $
 * Renvoie "Trop de chiffres" s'il y a plus de 15 chiffres significatifs (et donc un risque d'erreur d'approximation)
 * S'utilise indifféremment avec des nombres (nb) au format natif (entier, flottant) ou au format Decimal (nécessite la librairie decimal.js)
 * Avec comme avantage immédiat pour le format Decimal : precision est illimité.
 * Sinon, renvoie un nombre dans le format français (avec une virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
 * @author Guillaume Valmont
 * @param {number} nb nombre à afficher
 * @param {number} precision nombre de décimales demandé
 * @param {boolean} force true pour forcer à precision chiffres (ajout de zéros éventuels). false par défaut pour supprimer les zéros non significatifs.
 * @returns string avec le nombre dans le format français à mettre entre des $ $
 */
export function texNombre (nb, precision = 8, force = false) {
  const result = afficherNombre(nb, precision, 'texNombre', force)
  return result.replace(',', '{,}').replace(/\s+/g, '\\,')
}

/**
 * Renvoie un nombre dans le format français (séparateur de classes) pour la partie entière comme pour la partie décimale
 * @author Rémi Angot
 */
export function texNombre2 (nb) {
  let nombre = math.format(nb, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
  const rangVirgule = nombre.indexOf(',')
  let partieEntiere = ''
  if (rangVirgule !== -1) {
    partieEntiere = nombre.substring(0, rangVirgule)
  } else {
    partieEntiere = nombre
  }
  let partieDecimale = ''
  if (rangVirgule !== -1) {
    partieDecimale = nombre.substring(rangVirgule + 1)
  }

  for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
    partieEntiere = partieEntiere.substring(0, i) + '\\,' + partieEntiere.substring(i)
  }
  for (let i = 3; i < partieDecimale.length; i += 5) {
    partieDecimale = partieDecimale.substring(0, i) + '\\,' + partieDecimale.substring(i)
    i += 12
  }
  if (partieDecimale === '') {
    nombre = partieEntiere
  } else {
    nombre = partieEntiere + '{,}' + partieDecimale
  }
  return nombre
}

export function texNombrec2 (expr, precision = 12) {
  return texNombre(expr, precision)
}

export function nombrec2 (nb) {
  return math.evaluate(nb)
}

/**
* Renvoie un nombre dans le format français (séparateur de classes) pour la partie entière comme pour la partie décimale
* Avec espace géré par nbsp en HTML pour pouvoir l'inclure dans une phrase formatée en français et pas seulement un calcul.
* Modif EE pour la gestion de l'espace dans un texte non mathématique
* @author Eric Elter d'après la fonction de Rémi Angot
* Rajout Octobre 2021 pour 6C14
*/
export function texNombre3 (nb) {
  let nombre = math.format(nb, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
  const rangVirgule = nombre.indexOf(',')
  let partieEntiere = ''
  if (rangVirgule !== -1) {
    partieEntiere = nombre.substring(0, rangVirgule)
  } else {
    partieEntiere = nombre
  }
  let partieDecimale = ''
  if (rangVirgule !== -1) {
    partieDecimale = nombre.substring(rangVirgule + 1)
  }

  for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
    partieEntiere = partieEntiere.substring(0, i) + sp() + partieEntiere.substring(i)
  }
  for (let i = 3; i <= partieDecimale.length; i += 3) {
    partieDecimale = partieDecimale.substring(0, i) + sp() + partieDecimale.substring(i)
    i += 12
  }
  if (partieDecimale === '') {
    nombre = partieEntiere
  } else {
    nombre = partieEntiere + ',' + partieDecimale
  }
  return nombre
}

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
* Renvoie un nombre dans le format français (séparateur de classes)
* Fonctionne sans le mode maths contrairement à texNombre()
* insereEspaceDansNombre fonctionne peut-être mieux
* @author Rémi Angot
*/
export function nombreAvecEspace (nb) {
  if (isNaN(nb)) {
    window.notify('nombreAvecEspace : argument NaN ou undefined', { nb })
    return 'NaN'
  }
  // Ecrit \nombre{nb} pour tous les nombres supérieurs à 1 000 (pour la gestion des espaces)
  if (context.isHtml) {
    return Intl.NumberFormat('fr-FR', { maximumFractionDigits: 20 }).format(nb).toString().replace(/\s+/g, ' ')
  } else {
    let result
    if (nb > 999 || nombreDeChiffresDansLaPartieDecimale(nb) > 3) {
      result = '\\numprint{' + nb.toString().replace('.', ',') + '}'
    } else {
      result = Number(nb).toString().replace('.', '{,}')
    }
    return result
  }
}

/**
 *
 * @param {number} mantisse
 * @param {integer} exp
 * @returns {string} Écriture décimale avec espaces
 */
/* export const scientifiqueToDecimal = (mantisse, exp) => {
  mantisse = mantisse.toString()
  let indiceVirguleDepart = mantisse.indexOf('.')
  if (indiceVirguleDepart < 0) {
    indiceVirguleDepart = mantisse.length
  }
  const indiceVirguleArrivee = indiceVirguleDepart + exp
  let mantisseSansVirgule = mantisse.replace('.', '')
  const indiceMax = mantisseSansVirgule.length - 1
  // indiceMax est l'indice du chiffre des unités
  if (indiceVirguleArrivee > indiceMax) {
    // On ajoute des 0 à droite
    for (let i = indiceMax + 1; i < indiceVirguleArrivee; i++) {
      mantisseSansVirgule += '0'
    }
  } else if (indiceVirguleArrivee > 0 && indiceVirguleArrivee <= indiceMax) {
    // On insère la virgule
    mantisseSansVirgule = mantisseSansVirgule.substring(0, indiceVirguleArrivee) + ',' + mantisseSansVirgule.substring(indiceVirguleArrivee, mantisseSansVirgule.length)
  } else {
    // On ajoute des 0 à gauche
    let partiGauche = '0,'
    for (let i = 0; i < Math.abs(indiceVirguleArrivee); i++) {
      partiGauche += '0'
    }
    mantisseSansVirgule = partiGauche + mantisseSansVirgule
  }
  return insereEspaceDansNombre(mantisseSansVirgule)
}
*/
export const scientifiqueToDecimal = (mantisse, exp) => {
  if (exp < -6) Decimal.toExpNeg = exp - 1
  else if (exp > 20) Decimal.toExpPos = exp + 1
  return texNombre(new Decimal(mantisse).mul(Decimal.pow(10, exp)), 10)
}

/**
 *
 * @param {string |number} nb
 * @returns {string}
 */
export const insereEspaceDansNombre = nb => {
  if (!Number.isNaN(nb)) {
    nb = nb.toString().replace('.', ',')
  } else {
    window.notify('insereEspaceDansNombre : l\'argument n\'est pas un nombre', nb)
    return nb
  }
  let indiceVirgule = nb.indexOf(',')
  const indiceMax = nb.length - 1
  const tableauIndicesEspaces = []
  if (indiceVirgule < 0) {
    // S'il n'y a pas de virgule c'est qu'elle est après le dernier chiffre
    indiceVirgule = nb.length
  }
  for (let i = 0; i < indiceMax; i++) {
    if ((i - indiceVirgule) % 3 === 0 && (i - indiceVirgule) !== 0) {
      if (i < indiceVirgule) {
        tableauIndicesEspaces.push(i - 1) // Partie entière espace à gauche
      } else {
        tableauIndicesEspaces.push(i) // Partie décimale espace à droite
      }
    }
  }
  for (let i = tableauIndicesEspaces.length - 1; i >= 0; i--) {
    const indice = tableauIndicesEspaces[i] + 1
    if (indice !== 0)nb = insertCharInString(nb, indice, ' \\thickspace ')
  }
  return nb
}

export const insertCharInString = (string, index, char) => string.substring(0, index) + char + string.substring(index, string.length)

/**
 * Destinée à être utilisée hors des $ $
 * Signale une erreur en console s'il y a plus de 15 chiffres significatifs (et donc qu'il y a un risque d'erreur d'approximation)
 * Sinon, renvoie le nombre à afficher dans le format français (avec virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
 * @author Jean-Claude Lhote
 * @author Guillaume Valmont
 * @param {number} nb nombre à afficher
 * @param {number} precision nombre de décimales demandé
 * @param {boolean} force true pour forcer à precision chiffres (ajout de zéros éventuels). false par défaut pour supprimer les zéros non significatifs.
 * @returns string avec le nombre dans le format français à placer hors des $ $
 */
export function stringNombre (nb, precision = 8, force = false) {
  return afficherNombre(nb, precision, 'stringNombre', force)
}
/**
 * Fonction auxiliaire aux fonctions stringNombre et texNombre
 * Vérifie le nombre de chiffres significatifs en fonction du nombre de chiffres de la partie entière de nb et du nombre de décimales demandées par le paramètre precision
 * S'il y a plus de 15 chiffres significatifs, envoie un message à bugsnag et renvoie un nombre avec 15 chiffres significatifs
 * Sinon, renvoie un nombre avec le nombre de décimales demandé
 * @author Guillaume Valmont
 * @param {number} nb nombre qu'on veut afficher
 * @param {number} precision nombre de décimales demandé
 * @param {string} fonction nom de la fonction qui appelle afficherNombre (texNombre ou stringNombre) -> sert pour le message envoyé à bugsnag
 */
function afficherNombre (nb, precision, fonction, force = false) {
  /**
   * Fonction auxiliaire de stringNombre pour une meilleure lisibilité
   * Elle renvoie un nombre dans le format français (avec virgule et des espaces pour séparer les classes dans la partie entière et la partie décimale)
   * @author Rémi Angot
   * @author Guillaume Valmont
   * @param {number} nb nombre à afficher
   * @param {number} precision nombre de décimales demandé
   * @returns string avec le nombre dans le format français
   */
  function insereEspacesNombre (nb, nbChiffresPartieEntiere, precision, fonction) {
    let signe
    let nombre
    const maximumSignificantDigits = nbChiffresPartieEntiere + precision
    if (nb instanceof Decimal) {
      signe = nb.isNeg()
      if (nb.abs().gte(1)) {
        if (force) {
          nombre = nb.toFixed(precision).replace('.', ',')
        } else {
          nombre = nb.toDP(precision).toString().replace('.', ',')
        }
      } else {
        if (force) {
          nombre = nb.toFixed(precision).replace('.', ',')
        } else {
          nombre = nb.toDP(precision).toString().replace('.', ',')
        }
      }
    } else {
      signe = nb < 0
      // let nombre = math.format(nb, { notation: 'fixed', lowerExp: -precision, upperExp: precision, precision: precision }).replace('.', ',')
      if (Math.abs(nb) < 1) {
        if (force) {
          nombre = Intl.NumberFormat('fr-FR', { maximumFractionDigits: precision, minimumFractionDigits: precision }).format(nb)
        } else {
          nombre = Intl.NumberFormat('fr-FR', { maximumFractionDigits: precision }).format(nb)
        }
      } else {
        if (force) {
          nombre = Intl.NumberFormat('fr-FR', { maximumSignificantDigits, minimumSignificantDigits: maximumSignificantDigits }).format(nb)
        } else {
          nombre = Intl.NumberFormat('fr-FR', { maximumSignificantDigits }).format(nb)
        }
      }
    }
    const rangVirgule = nombre.indexOf(',')
    let partieEntiere = ''
    if (rangVirgule !== -1) {
      partieEntiere = nombre.substring(0, rangVirgule)
    } else {
      partieEntiere = nombre
    }
    let partieDecimale = ''
    if (rangVirgule !== -1) {
      partieDecimale = nombre.substring(rangVirgule + 1)
    }
    // La partie entière est déjà formatée par le Intl.NumberFormat('fr-FR', { maximumSignificantDigits }).format(nb)
    // Dans le cas d'un Number, mais pas d'un Decimal
    if (nb instanceof Decimal) {
      if (signe) partieEntiere = partieEntiere.substring(1)
      for (let i = partieEntiere.length - 3; i > 0; i -= 3) {
        partieEntiere = partieEntiere.substring(0, i) + ' ' + partieEntiere.substring(i)
      }
      if (signe) partieEntiere = '-' + partieEntiere
    }
    for (let i = 3; i < partieDecimale.length; i += (fonction === 'texNombre' ? 5 : 4)) { // des paquets de 3 nombres + 1 espace
      partieDecimale = partieDecimale.substring(0, i) + (fonction === 'texNombre' ? '\\,' : ' ') + partieDecimale.substring(i)
    }
    if (partieDecimale === '') {
      nombre = partieEntiere
    } else {
      nombre = partieEntiere + ',' + partieDecimale
    }
    return nombre
  } // fin insereEspacesNombre()

  // si nb n'est pas un nombre, on le retourne tel quel, on ne fait rien.
  if (isNaN(nb) && !(nb instanceof Decimal)) {
    window.notify("AfficherNombre : Le nombre n'en est pas un", { nb, precision, fonction })
    return ''
  }
  if (nb instanceof Decimal) {
    if (nb.isZero()) return '0'
  } else if (Number(nb) === 0) return '0'
  let nbChiffresPartieEntiere
  if (nb instanceof Decimal) {
    if (nb.abs().lt(1)) {
      nbChiffresPartieEntiere = 0
    } else {
      nbChiffresPartieEntiere = nb.abs().toFixed(0).length
    }
    if (nb.isInteger()) precision = 0
    else {
      if (typeof precision !== 'number') { // Si precision n'est pas un nombre, on le remplace par la valeur max acceptable
        precision = 15 - nbChiffresPartieEntiere
      } else if (precision < 0) {
        precision = 0
      }
    }
  } else {
    if (Math.abs(nb) < 1) {
      nbChiffresPartieEntiere = 0
    } else {
      nbChiffresPartieEntiere = Math.abs(nb).toFixed(0).length
    }
    if (Number.isInteger(nb)) precision = 0
    else {
      if (typeof precision !== 'number') { // Si precision n'est pas un nombre, on le remplace par la valeur max acceptable
        precision = 15 - nbChiffresPartieEntiere
      } else if (precision < 0) {
        precision = 0
      }
    }
  }

  const maximumSignificantDigits = nbChiffresPartieEntiere + precision
  if ((maximumSignificantDigits > 15) && (!(nb instanceof Decimal))) { // au delà de 15 chiffres significatifs, on risque des erreurs d'arrondi
    window.notify(fonction + ' : Trop de chiffres', { nb, precision })
    return insereEspacesNombre(nb, nbChiffresPartieEntiere, precision, fonction)
  } else {
    return insereEspacesNombre(nb, nbChiffresPartieEntiere, precision, fonction)
  }
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
 * couleurAleatoire() renvoie le code d'une couleur au hasard
 *
 * @author Rémi Angot
 */
export function couleurAleatoire () {
  return choice(['white', 'black', 'red', 'green', 'blue', 'cyan', 'magenta', 'yellow'])
}

/**
 * couleurTab() renvoie :
 * soit le code d'une couleur au hasard, ainsi que sa traduction française au masculin et au féminin,
 * soit le code d'une couleur imposée, ainsi que sa traduction française au masculin et au féminin.
 * @example couleurTab() peut renvoyer ['black','noir','noire'].
 * @example couleurTab(0) renverra de façon certaine ['black','noir','noire'].
 * @author Eric Elter
 */
export function couleurTab (choixCouleur = 999) {
  const panelCouleurs = [
    ['black', 'noir', 'noire'],
    ['red', 'rouge', 'rouge'],
    ['green', 'vert', 'verte'],
    ['blue', 'bleu', 'bleue'],
    ['hotpink', 'rose', 'rose'],
    ['sienna', 'marron', 'marron'],
    ['darkgray', 'gris', 'grise'],
    ['darkorange', 'orange', 'orange']
  ]
  return (choixCouleur === 999 || choixCouleur >= panelCouleurs.length || !isInteger(choixCouleur)) ? choice(panelCouleurs) : panelCouleurs[choixCouleur]
}

export function arcenciel (i, fondblanc = true) {
  let couleurs
  if (fondblanc) couleurs = ['violet', 'purple', 'blue', 'green', 'lime', 'orange', 'red']
  else couleurs = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']
  return couleurs[i % 7]
}
export function texcolors (i, fondblanc = true) {
  const couleurs = ['black', 'blue', 'brown', 'cyan', 'darkgray', 'gray', 'green', 'lightgray', 'lime', 'magenta', 'olive', 'orange', 'pink', 'purple', 'red', 'teal', 'violet', 'white', 'yellow']
  if (fondblanc && i % 19 >= 17) i += 2
  return couleurs[i % 19]
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
* Pour bien afficher les centimes avec 2 chiffres après la virgule
* @author Rémi Angot
*/
export function texPrix (nb) {
  // Remplace le . par la ,
  if (nb instanceof Decimal) {
    if (nb.isInteger()) return texNombre(nb, 0)
    else return texNombre(nb, 2, true)
  }
  const nombre = Number(nb)
  let result
  if (nombre.toString() === nombre.toFixed(0)) {
    result = nombre
  } else {
    result = nombre.toFixed(2).toString().replace('.', '{,}') // Ne gère pas l'espace des milliers
  }
  return result
}

/**
* Pour afficher les masses avec 3 chiffres après la virgule
* @author Mireille Gain
*/
export function texMasse (nb) {
  // Remplace le . par la ,
  const nombre = Number(nb)
  let result
  if (nombre.toString() === nombre.toFixed(0)) {
    result = nombre
  } else {
    result = nombre.toFixed(3).toString().replace('.', ',') // Ne gère pas l'espace des milliers
  }
  return result
}

/**
* Convertit en majuscule la première lettre
* @author Rémi Angot
*/
export function premiereLettreEnMajuscule (text) { return (text + '').charAt(0).toUpperCase() + text.substr(1) }

/**
* Renvoie le nombre de chiffres de la partie décimale
* @author Rémi Angot
*/
export function nombreDeChiffresDansLaPartieDecimale (nb) {
  if (String(nb).indexOf('.') > 0) {
    return String(nb).split('.')[1].length
  } else {
    return 0
  }
}
/**
 * Renvoie le nombre de chiffres dans la partie entière
 * @author ?
 */
export function nombreDeChiffresDansLaPartieEntiere (nb) {
  let nombre
  if (nb < 0) {
    nombre = -nb
  } else {
    nombre = nb
  }
  if (String(nombre).indexOf('.') > 0) {
    return String(nombre).split('.')[0].length
  } else {
    return String(nombre).length
  }
}
/**
 * Renvoie le nombre de chiffres d'un nombre décimal
 * @author Jean-Claude Lhote
 */
export function nombreDeChiffresDe (nb) {
  return nombreDeChiffresDansLaPartieDecimale(nb) + nombreDeChiffresDansLaPartieEntiere(nb)
}
/**
 * Retourne la string LaTeX de la fraction
 * @param num
 * @param den
 * @return {string}
 * @author Jean-Claude Lhote
 */
export function texFractionSigne (num, den) {
  if (den === 1) return String(num)
  if (num * den > 0) {
    return `\\dfrac{${texNombre(Math.abs(num))}}{${texNombre(Math.abs(den))}}`
  }
  if (num * den < 0) {
    return `-\\dfrac{${texNombre(Math.abs(num))}}{${texNombre(Math.abs(den))}}`
  }
  return '0'
}

/**
* Met de grandes parenthèses autour de la fraction a/b si besoin pour inclure une fraction dans une expresion en fonction du signe
* @author Jean-Claude Lhote
*/
export function texFractionParentheses (a, b) {
  if (a * b > 0) { return texFractionSigne(a, b) } else { return '\\left(' + texFractionSigne(a, b) + '\\right)' }
}

/**
* Retourne une liste de fractions irréductibles
* @author Jean-Claude Lhote
*/
export function obtenirListeFractionsIrreductibles () { // sous forme de tableaux [numérateur,dénominateur]
  return [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
    [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
}

/**
* Retourne une liste de fractions irréductibles de dénominateur égal à 2 3 5 7
* @author Mireille Gain
*/
export function obtenirListeFractionsIrreductiblesFaciles () { // sous forme de tableaux [numérateur,dénominateur]
  return [[1, 2], [1, 3], [2, 3], [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]
}

/**
* Retourne la liste des nombres premiers inférieurs à 300
* @author Rémi Angot
*/
export function obtenirListeNombresPremiers (n = 300) {
  const prems = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293]
  for (let i = 307; i <= n; i++) {
    if (isPrime(i)) prems.push(i)
  }
  return prems
}

/**
* Retourne le code LaTeX de la décomposition en produit de facteurs premiers d'un nombre
* @author Rémi Angot
*/
export function decompositionFacteursPremiers (n) {
  let decomposition = ''
  const liste = obtenirListeFacteursPremiers(n)
  for (const i in liste) {
    decomposition += liste[i] + '\\times'
  }
  decomposition = decomposition.substr(0, decomposition.length - 6)
  return decomposition
}

/**
 * Renvoie la décomposition en produit de facteurs premiers d'un nombre avec les facteursABarrer barrés
 * @author Guillaume Valmont
 * @param {number} nombre
 * @param {number[]} facteursABarrer
 * @returns texte en LateX
 */
export function decompositionFacteursPremiersBarres (nombreADecomposer, facteursABarrer) {
  const decomposition = decompositionFacteursPremiersArray(nombreADecomposer)
  const facteursBarres = []
  let str = ''
  for (const nombre of decomposition) {
    let unNombreAEteBarre = false
    for (let i = 0; i < facteursABarrer.length; i++) {
      const facteurABarrer = facteursABarrer[i]
      if (nombre === facteurABarrer && !facteursBarres.includes(i) && !unNombreAEteBarre) {
        str += ` \\cancel{${facteurABarrer}} \\times `
        facteursBarres.push(i)
        unNombreAEteBarre = true
      }
    }
    if (!unNombreAEteBarre) {
      str += nombre + ' \\times '
    }
  }
  return str.slice(0, -8)
}

/**
* Retourne la liste des diviseurs d'un entier
* @author Rémi Angot
*/
export function listeDesDiviseurs (n) {
  let k = 2
  const liste = [1]
  while (k <= n) {
    if (n % k === 0) {
      liste.push(k)
    }
    k++
  }

  return liste
}

/**
* Retourne le code LaTeX d'une fraction a/b
* @author Rémi Angot
*/
export function texFraction (a, b) {
  if (b !== 1) {
    return `\\dfrac{${typeof a === 'number' ? texNombre(a) : a}}{${typeof b === 'number' ? texNombre(b) : b}}`
  } else {
    return a
  }
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
* Utilise pgfplots pour tracer la courbe représentative de f dans le repère avec -10 < x < 10 et -8 < y < 8
*
* @param string expression de fonction
* @author Rémi Angot
*/

export function texGraphique (f, xmin = -5, xmax = 5, ymin = -5, ymax = 5) {
  return `
  \\pgfplotsset{width=10cm,
      compat=1.9,
      every axis/.append style={
                    axis x line=middle,    % put the x axis in the middle
                    axis y line=middle,    % put the y axis in the middle
                    xlabel={$x$},          % default put x on x-axis
                    ylabel={$y$},          % default put y on y-axis
                    label style={font=\\tiny},
                    tick label style={font=\\tiny},
                    xlabel style={above right},
            ylabel style={above right},
            grid = major,
            xtick distance=1,
            ytick distance=1,
                    }}

  \\begin{tikzpicture}
    \\begin{axis}[
        xmin = ${xmin}, xmax = ${xmax}, ymin = ${ymin}, ymax = ${ymax},
    ]
    \\addplot [
        ultra thick,
        blue,
        samples=100,
        domain=${xmin}:${xmax},
        ]{${f}};
    \\end{axis}
  \\end{tikzpicture}`
}

/**
 *  Classe MatriceCarree
 * Générateur de Matrice :
 * Si l'argument est un nombre, alors on s'en sert pour définir la taille de la matrice carrée qu'on rempli de zéros.
 * Sinon, c'est le tableau qui sert à remplir la Matrice
 *  @author Jean-Claude Lhote
 */
export class MatriceCarree {
  constructor (table) {
    let ligne
    this.table = []
    if (typeof (table) === 'number') {
      this.dim = table // si c'est un nombre qui est passé en argument, c'est la taille, et on rempli la table de 0
      for (let i = 0; i < this.dim; i++) {
        ligne = []
        for (let j = 0; j < this.dim; j++) { ligne.push(0) }
        this.table.push(ligne)
      }
    } else { // si l'argument est une table, on la copie dans this.table et sa longueur donne la dimension de la matrice
      this.dim = table.length
      this.table = table.slice()
    }
    /**
   * Méthode : Calcule le déterminant de la matrice carrée
   * @author Jean-Claude Lhote
   */
    this.determinant = function () {
      const n = this.dim // taille de la matrice = nxn
      let determinant = 0; let M
      for (let i = 0; i < n; i++) { // on travaille sur la ligne du haut de la matrice :ligne 0 i est la colonne de 0 à n-1
      // if (n==1) determinant=this.table[0][0]
        if (n === 2) { determinant = this.table[0][0] * this.table[1][1] - this.table[1][0] * this.table[0][1] } else {
          M = this.matriceReduite(0, i)
          determinant += ((-1) ** i) * this.table[0][i] * M.determinant()
        }
      }
      return determinant
    }
    /**
   * Méthode : m=M.matriceReduite(l,c) retourne une nouvelle matrice obtenue à partir de la matrice M (carrée) en enlevant la ligne l et la colonne c
   * (Utilisée dans le calcul du déterminant d'une matrice carrée.)
   * @author Jean-Claude Lhote
   */
    this.matriceReduite = function (l, c) {
      const resultat = []; let ligne
      for (let i = 0; i < this.table.length; i++) {
        if (i !== l) {
          ligne = []
          for (let j = 0; j < this.table.length; j++) {
            if (j !== c) ligne.push(this.table[i][j])
          }
          if (ligne.length > 0) resultat.push(ligne)
        }
      }
      return matriceCarree(resultat)
    }
    /**
   * Méthode : m=M.cofacteurs() retourne la matrice des cofacteurs de M utilisée dans l'inversion de M.
   */
    this.cofacteurs = function () { // renvoie la matrice des cofacteurs.
      const n = this.dim; let resultat = []; let ligne; let M
      if (n > 2) {
        for (let i = 0; i < n; i++) {
          ligne = []
          for (let j = 0; j < n; j++) {
            M = this.matriceReduite(i, j)
            ligne.push((-1) ** (i + j) * M.determinant())
          }
          resultat.push(ligne)
        }
      } else if (n === 2) {
        resultat = [[this.table[1][1], -this.table[1][0]], [-this.table[0][1], this.table[0][0]]]
      } else return false
      return matriceCarree(resultat)
    }
    /**
   * Méthode : m=M.transposee() retourne la matrice transposée de M utilisée pour l'inversion de M
   */
    this.transposee = function () { // retourne la matrice transposée
      const n = this.dim; const resultat = []; let ligne
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          ligne.push(this.table[j][i])
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }
    /**
   * m=M.multiplieParReel(k) Multiplie tous les éléments de la matrice par k. Utilisée pour l'inversion de M
   * @param {*} k
   */
    this.multiplieParReel = function (k) { // retourne k * la matrice
      const n = this.dim; const resultat = []; let ligne
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          ligne.push(k * this.table[i][j])
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }

    /**
   * Méthode : Calcule le produit d'une matrice nxn par un vecteur 1xn (matrice colonne): retourne un vecteur 1xn.
   *
   */
    this.multiplieVecteur = function (V) { // Vecteur est un simple array pour l'instant
      const n = this.dim; const resultat = []; let somme
      if (n === V.length) {
        for (let i = 0; i < n; i++) {
          somme = 0
          for (let j = 0; j < n; j++) {
            somme += this.table[i][j] * V[j]
          }
          resultat.push(somme)
        }
        return resultat
      } else return false
    }
    /**
   * Méthode : m=M.inverse() Retourne la matrice inverse de M. Utilisation : résolution de systèmes linéaires
   */
    this.inverse = function () { // retourne la matrice inverse (si elle existe)
      const d = this.determinant()
      if (!egal(d, 0)) {
        return this.cofacteurs().transposee().multiplieParReel(1 / d)
      } else return false
    }
    /**
   * Méthode : m=M.multiplieMatriceCarree(P) : retourne m = M.P
   *
   */
    this.multiplieMatriceCarree = function (M) {
      const n = this.dim; const resultat = []; let ligne; let somme
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          somme = 0
          for (let k = 0; k < n; k++) somme += this.table[i][k] * M.table[k][j]
          ligne.push(somme)
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }
  }
}

/**
 * Crée une nouvelle instance de la classe MatriceCarree à partir d'un tableau.
 *
 */
export function matriceCarree (table) {
  return new MatriceCarree(table)
}

// Fin de la classe MAtriceCarree

/**
 * Fonction qui retourne les coefficients a et b de f(x)=ax²+bx+c à partir des données de x1,x2,f(x1),f(x2) et c.
 *
 * @author Jean-Claude Lhote
 */
export function resolutionSystemeLineaire2x2 (x1, x2, fx1, fx2, c) {
  const matrice = matriceCarree([[x1 ** 2, x1], [x2 ** 2, x2]])
  const determinant = matrice.determinant()
  const [a, b] = matrice.cofacteurs().transposee().multiplieVecteur([fx1 - c, fx2 - c])
  if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(determinant)) {
    const fa = fraction(a, determinant)
    const fb = fraction(b, determinant)
    return [[fa.numIrred, fa.denIrred], [fb.numIrred, fb.denIrred]]
  }
  return [[a / determinant, 1], [b / determinant, 1]]
}
/**
 * Fonction qui retourne les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d à partir des données de x1,x2,x3,f(x1),f(x2),f(x3) et d (entiers !)
 * sous forme de fraction irréductible. Si pas de solution (déterminant nul) alors retourne [[0,0],[0,0],[0,0]]
 * @author Jean-Claude Lhote
 */
export function resolutionSystemeLineaire3x3 (x1, x2, x3, fx1, fx2, fx3, d) {
  const matrice = matriceCarree([[x1 ** 3, x1 ** 2, x1], [x2 ** 3, x2 ** 2, x2], [x3 ** 3, x3 ** 2, x3]])
  const y1 = fx1 - d; const y2 = fx2 - d; const y3 = fx3 - d
  const determinant = matrice.determinant()
  if (determinant === 0) {
    return [[0, 0], [0, 0], [0, 0]]
  }
  const [a, b, c] = matrice.cofacteurs().transposee().multiplieVecteur([y1, y2, y3])
  if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) && Number.isInteger(determinant)) { // ici on retourne un tableau de couples [num,den] entiers !
    const fa = fraction(a, determinant)
    const fb = fraction(b, determinant)
    const fc = fraction(c, determinant)
    return [
      [fa.numIrred, fa.denIrred],
      [fb.numIrred, fb.denIrred],
      [fc.numIrred, fc.denIrred]
    ]
    // pour l'instant on ne manipule que des entiers, mais on peut imaginer que ce ne soit pas le cas... dans ce cas, la forme est numérateur = nombre & dénominateur=1
  }
  return [
    [a / determinant, 1],
    [b / determinant, 1],
    [b / determinant, 1]
  ]
}
/**
 * Fonction qui cherche une fonction polynomiale de degré 3 dont les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d
 * sont des fractions dont le dénominateur est inférieur à 10 et pour laquelle l'image de 3 entiers compris entre -10 et 10
 * sont des entiers compris eux aussi entre -10 et 10
 * @author Jean-Claude Lhote
 */
export function criblePolynomeEntier () {
  let trouve = false
  let coefs = [[]]
  for (let i = 0, x1, x2, x3, fx1, fx2, fx3, d; ; i++) {
    x1 = randint(-10, 10)
    x2 = randint(-10, 10, [x1])
    x3 = randint(-10, 10, [x1, x2])
    fx1 = randint(-10, 10)
    fx2 = randint(-10, 10)
    fx3 = randint(-10, 10)
    d = randint(0, 10)
    coefs = resolutionSystemeLineaire3x3(x1, x2, x3, fx1, fx2, fx3, d)
    if (coefs[0][1] !== 0 && coefs[0][1] < 10 && coefs[1][1] < 10 && coefs[2][1] < 10) trouve = true
    if (trouve) {
      coefs.push([x1, fx1])
      coefs.push([x2, fx2])
      coefs.push([x3, fx3])
      coefs.push(d)
      break
    }
  }
  if (trouve) return coefs
}
/**
 * Fonction qui cherche les minimas et maximas d'une fonction polynomiale f(x)=ax^3 + bx² + cx + d
 * retourne [] si il n'y en a pas, sinon retourne [[x1,f(x1)],[x2,f(x2)] ne précise pas si il s'agit d'un minima ou d'un maxima.
 * @author Jean-Claude Lhote
 */
export function chercheMinMaxFonction ([a, b, c, d]) {
  const delta = 4 * b * b - 12 * a * c
  if (delta <= 0) return [[0, 10 ** 99], [0, 10 ** 99]]
  const x1 = (-2 * b - Math.sqrt(delta)) / (6 * a)
  const x2 = (-2 * b + Math.sqrt(delta)) / (6 * a)
  return [[x1, a * x1 ** 3 + b * x1 ** 2 + c * x1 + d], [x2, a * x2 ** 3 + b * x2 ** 2 + c * x2 + d]]
}
/**
 * retourne les coefficients d'un polynome de degré 3 dont la dérivée s'annule en  x1 et x2 et tel que f(x1)=y1 et f(x2)=y2.
 * @author Jean-Claude Lhote
 */
export function cherchePolynomeDegre3aExtremaFixes (x1, x2, y1, y2) {
  const M = matriceCarree([[x1 ** 3, x1 ** 2, x1, 1], [x2 ** 3, x2 ** 2, x2, 1], [3 * x1 ** 2, 2 * x1, 1, 0], [3 * x2 ** 2, 2 * x2, 1, 0]])
  const R = [y1, y2, 0, 0]
  if (!egal(M.determinant(), 0)) return M.inverse().multiplieVecteur(R)
  else return false
}

/**
 * Fonction pour simplifier l'ecriture lorsque l'exposant vaut 0 ou 1
 * retourne 1, la base ou rien
 * @param b base
 * @param e exposant
 * @author Sébastien Lozano
 */
export function simpExp (b, e) {
  switch (e) {
    case 1:
      return ` ${b}`
    case 0:
      return ' 1'
    default:
      return ' '
  }
}

/**
 * Fonction pour écrire des notations scientifique de la forme a * b ^ n
 * @param a {number} mantisse
 * @param b {number} base
 * @param n {number} exposant
 * @author Erwan Duplessy
 */
export function puissance (b, n) {
  switch (b) {
    case 0:
      return '0'
    case 1:
      return '1'
    case -1:
      if (b % 2 === 0) {
        return '1'
      } else {
        return '-1'
      }
    default:
      if (b < 0) {
        return `(${b})^{${n}}`
      } else {
        return `${b}^{${n}}`
      }
  }
}

export function ecriturePuissance (a, b, n) {
  switch (a) {
    case 0:
      return '$0$'
    case 1:
      return `$${puissance(b, n)}$`
    default:
      return `$${String(round(a, 3)).replace('.', '{,}')} \\times ${puissance(b, n)}$`.replace('.', '{,}')
  }
}

/**
 * Fonction pour simplifier les notations puissance dans certains cas
 * si la base vaut 1 ou -1 quelque soit l'exposant, retourne 1 ou -1,
 * si la base est négative on teste la parité de l'exposant pour alléger la notation sans le signe
 * si l'exposant vaut 0 ou 1 retourne 1, la base ou rien
 * @param b base
 * @param e exposant
 * @author Sébastien Lozano
 */
export function simpNotPuissance (b, e) {
  // on switch sur la base
  switch (b) {
    case -1: // si la base vaut -1 on teste la parité de l'exposant
      if (e % 2 === 0) {
        return ' 1'
        // break;
      } else {
        return ' -1'
        // break;
      }
    case 1: // si la base vaut 1 on renvoit toujours 1
      return ' 1'
    default: // sinon on switch sur l'exposant
      switch (e) {
        case 0: // si l'exposant vaut 0 on ranvoit toujours 1
          return '1'
        case 1: // si l'exposant vaut 1 on renvoit toujours la base
          return ` ${b}`
        default: // sinon on teste le signe de la base et la parité de l'exposant
          if (b < 0 && e % 2 === 0) { // si la base est négative et que l'exposant est pair, le signe est inutile
            return ` ${b * -1}^{${e}}`
            // break;
          } else {
            return ` ${b}^{${e}}`
            // return ` `;
            // break;
          }
      }
  }
}

/**
 * Fonction pour écrire en couleur la forme éclatée d'une puissance
 * @param b base
 * @param e exposant
 * @param couleur
 * @author Sébastien Lozano
 */
export function eclatePuissance (b, e, couleur) {
  let str
  switch (e) {
    case 0:
      return `\\mathbf{\\color{${couleur}}{1}}`
    case 1:
      return `\\mathbf{\\color{${couleur}}{${b}}}`
    default:
      str = `\\mathbf{\\color{${couleur}}{${b}}} `
      for (let i = 1; i < e; i++) {
        str = str + `\\times \\mathbf{\\color{${couleur}}{${b}}}`
      }
      return str
  }
}

/**
 * Fonction pour écrire la forme éclatée d'une puissance
 * @param b {number} base
 * @param e {integer} exposant
 * @author Rémi Angot
 * @return string
 */
export function puissanceEnProduit (b, e) {
  let str
  if (e === 0) {
    return '1'
  } else if (e === 1) {
    return `${b}`
  } else if (e > 1) {
    str = `${ecritureParentheseSiNegatif(b)}`
    for (let i = 1; i < e; i++) {
      str = str + `\\times ${ecritureParentheseSiNegatif(b)}`
    }
    return str
  } else if (e < 0) {
    return `\\dfrac{1}{${puissanceEnProduit(b, -e)}}`
  }
}

/**
 * Fonction qui renvoie un tableau contenant la mantisse et l'exposant de l'écriture scientique d'un nombre donné en paramètres sous sa forme décimale.
 * @param nbDecimal
 *
 * @example
 * // Renvoie [4.1276,1]
 * range(decimalToScientifique,[41.276])
 * // Renvoie [3.48,-2]
 * range(decimalToScientifique,[0.0348])
 * // Renvoie [-2.315,3]
 * range(decimalToScientifique,[-2315])
 *
 * @author Eric Elter
 */
export function decimalToScientifique (nbDecimal) {
  let exposant = 0
  let mantisseNb = new Decimal(nbDecimal)
  if (mantisseNb.abs().gte(10)) {
    while (exposant < 50 && mantisseNb.abs().gt(10)) {
      mantisseNb = mantisseNb.div(10)
      exposant++
    }
    return [mantisseNb.toNumber(), exposant]
  } else if (mantisseNb.abs().lt(1)) {
    while (exposant < 50 && mantisseNb.abs().lt(1)) {
      mantisseNb = mantisseNb.mul(10)
      exposant++
    }
    return [mantisseNb.toNumber(), -1 * exposant]
  } else return [nbDecimal, 0]
}

/**
 * Fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
 * @param b1 base1
 * @param b2 base2
 * @param e exposant
 * @param couleur1
 * @param couleur2
 * @author Sébastien Lozano
 */
export function reorganiseProduitPuissance (b1, b2, e, couleur1, couleur2) {
  let str
  switch (e) {
    case 0:
      return '1'
    case 1:
      return `\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}`
    default:
      str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `
      for (let i = 1; i < e; i++) {
        str = str + `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`
      }
      return str
  }
}

/**
 *
 * x le nombre dont on cherche l'ordre de grandeur
 * type = 0 pour la puissance de 10 inférieure, 1 pour la puissance de 10 supérieur et 2 pour la plus proche
 */
export function ordreDeGrandeur (x, type) {
  let signe
  if (x < 0) signe = -1
  else signe = 1
  x = Math.abs(x)
  const P = 10 ** Math.floor(Math.log10(x))
  if (type === 0) return P * signe
  else if (type === 1) return P * 10 * signe
  else if (x - P < 10 * P - x) return P * signe
  else return P * 10 * signe
}

/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numeroExercice
* @param contenu code HTML
* @param icone
* @author Rémi Angot
*/
export function creerModal (numeroExercice, contenu, labelBouton, icone) {
  if (context.isHtml) {
    const HTML = `<button class="ui right floated mini compact button" onclick="$('#modal${numeroExercice}').modal('show');"><i class="large ${icone} icon"></i>${labelBouton}</button>
      <div class="ui modal" id="modal${numeroExercice}">
      ${contenu}
      </div>`
    return HTML
  } else {
    return ''
  }
}
/**
* Fonction créant le bouton d'aide utilisée par les différentes fonctions modal_ type de contenu
* @param numeroExercice
* @param contenu code HTML
* @param icone
* @author Rémi Angot
*/
export function creerBoutonMathalea2d (numeroExercice, fonction, labelBouton = 'Aide', icone = 'info circle') {
  const HTML = `<button class="ui toggle left floated mini compact button" id = "btnMathALEA2d_${numeroExercice}" onclick="${fonction}"><i class="large ${icone} icon"></i>${labelBouton}</button>`

  return HTML
}

/**
* Créé un bouton pour une aide modale avec un texte court
* @param numeroExercice
* @param texte Texte court qui sera affiché comme un titre
* @param labelBouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @author Rémi Angot
*/
export function modalTexteCourt (numeroExercice, texte, labelBouton = 'Aide', icone = 'info circle') {
  const contenu = `<div class="header">${texte}</div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
* Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
* @param numeroExercice
* @param idYoutube
* @param titre Texte court qui sera affiché comme un titre
* @param labelBouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est youtube icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @author Rémi Angot
*/
export function modalYoutube (numeroExercice, idYoutube, titre, labelBouton = 'Aide - Vidéo', icone = 'youtube') {
  let contenu
  if (idYoutube.substr(0, 4) === 'http') {
    if (idYoutube.slice(-4) === '.pdf') {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><object type="application/pdf" data="${idYoutube}" width="560" height="315"> </object></p></div>`
    }
    if (idYoutube.substr(0, 17) === 'https://youtu.be/') {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${idYoutube.substring(17)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
    } else {
      contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" sandbox="allow-same-origin allow-scripts allow-popups" src="${idYoutube}" frameborder="0" allowfullscreen></iframe></p></div>`
    }
  } else if (idYoutube.substr(0, 4) === '<ifr') {
    contenu = `<div class="header">${titre}</div><div class="content"><p align="center">${idYoutube}</p></div>`
  } else {
    contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${idYoutube}?rel=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
  }
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
* Créé un bouton pour une aide modale avec un titre et un texte
* @param numeroExercice
* @param titre
* @param texte
* @param labelBouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @author Rémi Angot
*/
export function modalTexteLong (numeroExercice, titre, texte, labelBouton = 'Aide', icone = 'info circle') {
  let contenu = `<div class="header">${titre}</div>`
  contenu += `<div class="content">${texte}</div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
* Créé un bouton pour une aide modale avec un titre et un texte
* @param numeroExercice
* @param url
* @param labelBouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est info circle icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @author Rémi Angot
*/
export function modalUrl (numeroExercice, url, labelBouton = 'Aide', icone = 'info circle') {
  const contenu = `<iframe width="100%" height="600"  src="${url}" frameborder="0" ></iframe>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
* Créé un bouton pour une aide modale avec un texte et une vidéo YouTube
* @param numeroExercice
* @param urlPdf
* @param titre Texte court qui sera affiché comme un titre
* @param labelBouton Titre du bouton (par défaut Aide)
* @param icone Nom de l'icone (par défaut c'est file pdf icon), liste complète sur https://semantic-ui.com/elements/icon.html
* @author Rémi Angot
*/
export function modalPdf (numeroExercice, urlPdf, titre = 'Aide', labelBouton = 'Aide - PDF', icone = 'file pdf') {
  const contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><embed src=${urlPdf} width=90% height=500 type='application/pdf'/></p></div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
 * Créé un bouton pour une aide modale avec une vidéo
 * @param numeroExercice désigne l'id du modal qui doit être unique
 * @param urlVideo
 * @param titre Texte court qui sera affiché comme un titre
 * @param labelBouton Titre du bouton (par défaut Vidéo)
 * @param icone Nom de l'icone (par défaut c'est file video outline icon), liste complète sur https://semantic-ui.com/elements/icon.html
 * @author Sébastien Lozano
 */
export function modalVideo (numeroExercice, urlVideo, titre, labelBouton = 'Vidéo', icone = 'file video outline') {
  // let contenu = `<div class="header">${titre}</div><div class="content"><p align="center"><iframe width="560" height="315" src="${urlVideo}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p></div>`
  const contenu = `
  <div class="header">${titre}</div>
  <div class="content">
    <div class="embed-responsive embed-responsive-16by9" align="center">
      <video width="560" height="315" controls  preload="none" style="max-width: 100%">
        <source src="` + urlVideo + `">
        Votre navigateur ne gère pas l'élément <code>video</code>.
      </video>
      </div>
  </div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}
/**
 *
 * @param {number} numeroExercice
 * @param {string} urlImage
 * @param {string} titre = ce qui est écrit en titre de l'image
 * @param {string} labelBouton = ce qui est écrit sur le bouton à côté de l'icône d'image.
 * @param {string} icone
 */
export function modalImage (numeroExercice, urlImage, titre, labelBouton = 'Illustration', icone = 'image') {
  const contenu = `<div class="header">${titre}</div><div class="image content"><img class="ui centered medium image" src="${urlImage}"></div>`
  return creerModal(numeroExercice, contenu, labelBouton, icone)
}

/**
 * Renvoie un tableau contenant les diviseurs d'un nombre entier, rangés dans l'ordre croissant
 * @param {integer} n
 * @author Sébastien Lozano
 */
export function listeDiviseurs (n) {
  'use strict'
  let i = 2
  const diviseurs = [1]
  while (i <= n) {
    if (n % i === 0) {
      diviseurs.push(i)
    }
    i++
  }
  return diviseurs
}

//= ================================================
// fonctions de 3F1-act
//= ================================================

/**
* Crée une machine mathématique Tikz pour la version LaTeX
* @param {string} nom nom de la machine en mode maths!
* @param {string} etape1 chaine en mode maths attention aux espaces et accents
* @param {string} etape2 chaine en mode maths attention aux espaces et accents
* @param {string} etape3 chaine en mode maths attention aux espaces et accents
* @param {string} xLigne1 chaine en mode maths attention aux espaces et accents
* @param {string} xLigne2 chaine en mode maths attention aux espaces et accents
* @param {string} yLigne1 chaine en mode maths attention aux espaces et accents
* @param {string} yLigne2 chaine en mode maths attention aux espaces et accents
* @author Sébastien Lozano
*/

export function tikzMachineMaths (nom, etape1, etape2, etape3, xLigne1, xLigne2, yLigne1, yLigne2) {
  // tous les textes sont en mode maths !!!
  'use strict'
  return `
  \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
  \\draw [line width=3pt,color=frvzsz] (-4,4)-- (2,4);
  \\draw [line width=3pt,color=frvzsz] (2,4)-- (2,0);
  \\draw [line width=3pt,color=frvzsz] (2,0)-- (-4,0);
  \\draw [line width=3pt,color=frvzsz] (-4,0)-- (-4,4);
  \\draw [line width=3pt,color=frvzsz] (-4,2)-- (-5,2);
  \\draw [line width=3pt,color=frvzsz] (-5,2.4)-- (-5,1.6);
  \\draw [->,line width=3pt,color=frvzsz] (2,2) -- (3,2);
  \\node[text width=3cm,text centered, scale=1.8] at(-1,3.5){$\\mathbf{machine\\,${nom}}$};
  \\node[text width=3cm,text centered, scale=1.5] at(-1,2.8){$\\mathbf{${etape1}}$};
  \\node[text width=3cm,text centered, scale=1.5] at(-1,2.3){$${etape2}$};
  \\node[text width=3cm,text centered, scale=1.5] at(-1,1.6){$${etape3}$};
  \\node[text width=3cm,text centered, scale=1.5] at(-8,2.5) {$\\mathbf{${xLigne1}}$};
  \\node[text width=3cm,text centered, scale=1.5] at(-8,1.5) {$\\mathbf{${xLigne2}}$};
  \\fill [line width=3pt,color=frvzsz] (-6,2) -- (-6.5,1) -- (-5.5,2) -- (-6.5,3) -- cycle;
  %\\fill [line width=3pt,color=frvzsz] (1,2) -- (0.5,1) -- (1.5,2) -- (0.5,3) -- cycle;
  \\node[text width=3cm,text centered, scale=1.5] at(5.5,2.5) {$\\mathbf{${yLigne1}}$};
  \\node[text width=3cm,text centered, scale=1.5] at(5.5,1.5) {$\\mathbf{${yLigne2}}$};
  \\fill [line width=3pt,color=frvzsz] (3.5,2) -- (3,1) -- (4,2) -- (3,3) -- cycle;
  \\end{tikzpicture}
  `
}

/**
 * Crée un diagramme tikz pour une machine maths
 * @param {string} nom nom de la fonction
 * @param {string} xAnt nom du nombre de départ
 * @param {array} etapesExpressions tableau contenant les etapes et le expressions algébriques
 * attention mode maths pour les chaines
 * @author Sébastien Lozano
 */
export function tikzMachineDiag (nom, xAnt, etapesExpressions) {
  'use strict'
  const xInit = -10
  let saut = 0
  const pas = 1
  let sortie = ''
  sortie += `
  \\definecolor{frvzsz}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  \\begin{tikzpicture}[line cap=round,line join=round,>=triangle 45,x=1cm,y=1cm]
  \\draw [line width=3pt,color=frvzsz] (` + xInit + ',0.5) -- (' + (xInit + pas) + ',0.5) -- (' + (xInit + pas) + ',-0.5) -- (' + xInit + `,-0.5) -- cycle;
  \\node[text width=3cm,text centered, scale=1] at(` + (xInit + 0.5) + `,0){$${xAnt}$};
  `
  saut = saut + pas
  for (let i = 0; i < etapesExpressions.length; i++) {
    // si la longueur du tableau des etapes vaut i+1 c'est que c'est la derniere
    // on affiche donc chaque fois avec le nom de la fonction
    if (etapesExpressions.length === i + 1) {
      // si il y a une operation et une expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${nom}(x)=${etapesExpressions[i][1]}}`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + `,0) circle(0.5);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',0.5) -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',0.5) -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-0.5) -- (' + (xInit + saut + 5 * pas / 2) + `,-0.5) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=${etapesExpressions[i][1]}$};
        `
      }
      // si il y a une operation et pas d'expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = `${nom}(x)=\\ldots`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=\\ldots$};
        `
      }
      // si il n'y a pas d'operation mais une expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${nom}(x)=${etapesExpressions[i][1]}`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=${etapesExpressions[i][1]}$};
        `
      }
      // si il n'y ni une operation et ni expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = `${nom}(x)=\\ldots`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${nom}(` + xAnt + `)=\\ldots$};
        `
      }
    } else { // sinon c'est une étape intermédiaire
      // si il y a une operation et une expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${etapesExpressions[i][1]}`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${etapesExpressions[i][1]}$};
        `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il y a une operation et pas d'expression algébrique
      if (typeof etapesExpressions[i][0] !== 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = '\\ldots'.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$${etapesExpressions[i][0]}$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
        `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il n'y a pas d'operation mais une expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] !== 'undefined') {
        const wEtape = `${etapesExpressions[i][1]}`.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$${etapesExpressions[i][1]}$};
        `
        saut = saut + 3 * pas + wEtape / 4
      }
      // si il n'y ni une operation et ni expression algébrique
      if (typeof etapesExpressions[i][0] === 'undefined' && typeof etapesExpressions[i][1] === 'undefined') {
        const wEtape = '\\ldots'.length
        sortie += `
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut) + ',0) -- (' + (xInit + saut + pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + pas) + ',0) circle(' + (pas / 2) + `);
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + pas) + `,0){$\\ldots$};
        \\draw [->,line width=3pt,color=frvzsz] (` + (xInit + saut + 3 * pas / 2) + ',0) -- (' + (xInit + saut + 5 * pas / 2) + `,0);
        \\draw [line width=3pt,color=frvzsz] (` + (xInit + saut + 5 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',' + (pas / 2) + ') -- (' + (xInit + saut + wEtape / 4 + 6 * pas / 2) + ',-' + (pas / 2) + ') -- (' + (xInit + saut + 5 * pas / 2) + ',-' + (pas / 2) + `) -- cycle;
        \\node [text width=3cm,text centered, scale=1] at(` + (xInit + saut + wEtape / 8 + 5.5 * pas / 2) + `,0){$\\ldots$};
        `
        saut = saut + 3 * pas + wEtape / 4
      }
    }
  }
  sortie += `
  \\end{tikzpicture}
  `
  return sortie
}

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
 * Ecrit un string sans accents
 * @param {string} str
 * @author Sébastien Lozano
 * @source --> http://www.finalclap.com/faq/257-javascript-supprimer-remplacer-accent
 */
/* export function sansAccent(str) {
  var accent = [
    /[\300-\306]/g, /[\340-\346]/g,
    /[\310-\313]/g, /[\350-\353]/g,
    /[\314-\317]/g, /[\354-\357]/g,
    /[\322-\330]/g, /[\362-\370]/g,
    /[\331-\334]/g, /[\371-\374]/g,
    /[\321]/g, /[\361]/g,
    /[\307]/g, /[\347]/g,
  ];
  var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

  //var str = this;
  for (var i = 0; i < accent.length; i++) {
    str = str.replace(accent[i], noaccent[i]);
  }

  return str;
}
*/

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
 * crée un cadre orange autour d'un paragraphe
 * utilisé notamment dans 3F12 pour entourer les programmes de calcul
 * @param {string} texte paragraphe entouré par le cadre orange rectangulaire
 * @author Sébastien Lozano
 */

export function texCadreParOrange (texte) {
  'use strict'
  // \\definecolor{orangeCoop}{rgb}{0.9450980392156862,0.34901960784313724,0.1607843137254902}
  const sortie = `
   
   \\setlength{\\fboxrule}{1.5mm}
   \\par\\vspace{0.25cm}
   \\noindent\\fcolorbox{nombres}{white}{\\parbox{\\linewidth-2\\fboxrule-2\\fboxsep}{` + texte + `}}
   \\par\\vspace{0.25cm} 
   `

  return sortie
}

/**
 * affiche une video centrée dans une div
 * ATTENTION BUG SVG DONC LES ANIMATIONS SONT FILMEES A PARTIR DE CELLES GENEREES PAR LA FONCTION SVG_machine_maths() SOUS FIREFOX
 * DE FACON A AVOIR UN RENDU UNIFORME QUEL QUE SOIT LE NAVIGATEUR ON REND LES ANIMATIONS PAR DES VIDEOS
 * ON LAISSE LA PIROUETTE DE DETECTION DU USERAGENT EN COMMENTAIRE EN ATTENDANT DE TROUVER UNE SOLUTION DE RENDU LATEX DANS SVG UNIVERSELLE
 * @param {string} urlVideo
 * @author Sébastien Lozano
 */

export function machineMathsVideo (urlVideo) {
  'use strict'
  const video = `
  <div style="text-align:center"> 
  <video width="560" height="100%" controls  loop autoplay muted style="max-width: 100%">
    <source src="` + urlVideo + `">
    Votre navigateur ne gère pas l'élément <code>video</code>.
  </video>
  </div>`

  return video
}

/**
 * détecte si le navigateur et safari ou chrome et renvoie un booléen
 * @author Sébastien Lozano
 */
export function detectSafariChromeBrowser () {
  'use strict'
  let isChrome = navigator.userAgent.indexOf('Chrome') > -1
  // var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  // var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  let isSafari = navigator.userAgent.indexOf('Safari') > -1
  const isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1
  if ((isChrome) && (isSafari)) { isSafari = false }
  if ((isChrome) && (isOpera)) { isChrome = false }

  return (isChrome || isSafari)
}

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {integer} k On cherchera un multiple de k
* @param {integer} n Ce multiple sera supérieur ou égal à n
* @author Rémi Angot
*/
export function premierMultipleSuperieur (k, n) {
  let result = n
  let reste
  if (Number.isInteger(k) && Number.isInteger(n)) {
    while (result % k !== 0) {
      result += 1
    }
    return result
  } else {
    if (egal(Math.floor((n / k), n / k))) return n
    else {
      reste = n / k - Math.floor(n / k)
      return n - reste * k + k
    }
  }
}
export function premierMultipleInferieur (k, n) {
  const result = premierMultipleSuperieur(k, n)
  if (result !== n) return result - k
  else return n
}

/**
* Retourne la liste des nombres premiers inférieurs à N N<300 N exclu
* @param {number} borneSup
* @author Sébastien Lozano
*/
export function listeNombresPremiersStrictJusqua (borneSup) {
  'use strict'
  // tableau contenant les 300 premiers nombres premiers
  const liste300 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293]
  const liste = []
  let i = 0
  while (liste300[i] < borneSup) {
    liste.push(liste300[i])
    i++
  }
  return liste
}

/**
 * Liste les nombres premiers jusque n avec la méthode du crible d'Eratosthene optimisée
 * @param {number} n
 * @author Sébastien Lozano
 */
export function cribleEratostheneN (n) {
  'use strict'
  const tabEntiers = [] // pour tous les entiers de 2 à n
  const testMax = Math.sqrt(n + 1) // inutile de tester au dela de racine de n
  const liste = [] // tableau de la liste des premiers jusqu'à n

  // On rempli un tableau avec des booléeens de 2 à n
  for (let i = 0; i < n + 1; i++) {
    tabEntiers.push(true)
  }

  // On supprime les multiples des nombres premiers à partir de 2, 3, 5,...
  for (let i = 2; i <= testMax; i++) {
    if (tabEntiers[i]) {
      for (let j = i * i; j < n + 1; j += i) {
        tabEntiers[j] = false
      }
    }
  }

  // On récupère tous les indices du tableau des entiers dont le booléen est à true qui sont donc premiers
  for (let i = 2; i < n + 1; i++) {
    if (tabEntiers[i]) {
      liste.push(i)
    }
  }

  return liste
}

/**
 * Liste les premiers compris entre min et max au sens large,
 * min est inclu
 * max est inclu.
 * @param {number} min
 * @param {number} max
 * @author Sébastien Lozano
 */

export function premiersEntreBornes (min, max) {
  'use strict'
  // on crée les premiers jusque min
  const premiersASupprimer = cribleEratostheneN(min - 1)
  // on crée les premiers jusque max
  const premiersJusqueMax = cribleEratostheneN(max)
  // on supprime le début de la liste jusque min
  premiersJusqueMax.splice(0, premiersASupprimer.length)
  // on renvoie le tableau restant
  return premiersJusqueMax
}

/**
 * tire à pile ou face pour écrire ou non un texte
 * @param {string} texte
 * @author Sébastien Lozano
 */

export function texteOuPas (texte) {
  'use strict'
  const bool = randint(0, 1)
  if (bool === 0) {
    return '\\ldots'
  } else {
    return texte
  }
}

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
export function tableauColonneLigne (tabEntetesColonnes, tabEntetesLignes, tabLignes, arraystretch) {
  'use strict'
  let myLatexArraystretch
  if (typeof arraystretch === 'undefined') {
    myLatexArraystretch = 1
  } else {
    myLatexArraystretch = arraystretch
  }

  // on définit le nombre de colonnes
  const C = tabEntetesColonnes.length
  // on définit le nombre de lignes
  const L = tabEntetesLignes.length
  // On construit le string pour obtenir le tableau pour compatibilité HTML et LaTeX
  let tableauCL = ''
  if (context.isHtml) {
    tableauCL += '$\\def\\arraystretch{2.5}\\begin{array}{|'
  } else {
    tableauCL += `$\\renewcommand{\\arraystretch}{${myLatexArraystretch}}\n`
    tableauCL += '\\begin{array}{|'
  }
  // on construit la 1ere ligne avec toutes les colonnes
  for (let k = 0; k < C; k++) {
    tableauCL += 'c|'
  }
  tableauCL += '}\n'

  tableauCL += '\\hline\n'
  if (typeof tabEntetesColonnes[0] === 'number') {
    tableauCL += texNombre(tabEntetesColonnes[0])
  } else {
    tableauCL += tabEntetesColonnes[0]
  }
  for (let k = 1; k < C; k++) {
    if (typeof tabEntetesColonnes[k] === 'number') {
      tableauCL += ' & ' + texNombre(tabEntetesColonnes[k]) + ''
    } else {
      tableauCL += ' & ' + tabEntetesColonnes[k] + ''
    }
  }
  tableauCL += '\\\\\n'
  tableauCL += '\\hline\n'
  // on construit toutes les lignes
  for (let k = 0; k < L; k++) {
    if (typeof tabEntetesLignes[k] === 'number') {
      tableauCL += '' + texNombre(tabEntetesLignes[k]) + ''
    } else {
      tableauCL += '' + tabEntetesLignes[k] + ''
    }
    for (let m = 1; m < C; m++) {
      if (typeof tabLignes[(C - 1) * k + m - 1] === 'number') {
        tableauCL += ' & ' + texNombre(tabLignes[(C - 1) * k + m - 1])
      } else {
        tableauCL += ' & ' + tabLignes[(C - 1) * k + m - 1]
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
  // 'use strict';
  if (context.isHtml) {
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

/**
 * renvoie un tableau avec la decomposition en facteurs premiers sous forme développée
 * @param {number} n
 * @author Sébastien Lozano
 */
export function decompositionFacteursPremiersArray (n) {
  const decomposition = []
  const liste = obtenirListeFacteursPremiers(n)
  for (const i in liste) {
    decomposition.push(liste[i])
  }
  return decomposition
}

/**
 * @class
 * @classdesc Classe Triangles - Méthodes utiles pour les triangles *
 * * @param {number} l1 une des longueurs du triangle
 * * @param {number} l2 une des longueurs du triangle
 * * @param {number} l3 une des longueurs du triangle
 * * @param {number} a1 un des angles du triangle
 * * @param {number} a2 un des angles du triangle
 * * @param {number} a3  un des angles du triangle
 * @author Sébastien Lozano
 */
export function Triangles (l1, l2, l3, a1, a2, a3) {
  'use strict'
  const self = this

  /**
   * @constant {array} nomsPossibles liste de noms possibles pour un triangle
   */
  const nomsPossibles = ['AGE', 'AIL', 'AIR', 'ALU', 'AME', 'AMI', 'ANE', 'ARC', 'BAC', 'BAL', 'BAR', 'BEC', 'BEL', 'BIO', 'BIP', 'BIS', 'BLE', 'BOA', 'BOF', 'BOG', 'BOL', 'BUT', 'BYE', 'COQ', 'CRI', 'CRU', 'DUC', 'DUO', 'DUR', 'EAU', 'ECU', 'EGO', 'EPI', 'FER', 'FIL', 'FUN', 'GPS', 'ICE', 'JET', 'KIF', 'KIR', 'MAC', 'NEM', 'PAS', 'PIC', 'PIF', 'PIN', 'POT', 'RAI', 'RAP', 'RAT', 'RIF', 'SEL', 'TAF', 'TIC', 'TAC', 'TOC', 'TOP', 'UNI', 'WOK', 'YAK', 'YEN', 'ZEN', 'ZIG', 'ZAG']

  /**
   * @property {string} nom nom du triangle, tiré au hasard dans un tableau
   */
  this.nom = choice(nomsPossibles)

  /**
   * @return {string} Renvoie le nom du triangle tiré au hasard
   * * les strings sont EN MODE MATHS le premier caractère du string est un $
   * @example si triangle est une instance de la classe Triangle() triangle.getNom() renvoie le string '$AMI$' si AMI est le nom tiré au hasard
   */
  function getNom () {
    return '$' + self.nom + '$'
  }

  /**
   * @return {array} Renvoie un tableau contenant le nom des côtés, segments, du triangle tiré au hasard
   * * les strings sont EN MODE MATHS le premier caractère du string est un $
   * @example si triangle est une instance de la classe Triangle() triangle.getCotes() renvoie le tableau de strings ['$[AM]$','$[MI]$','$[IA]$'] dans cet ordre si AMI est le nom tiré au hasard
   */
  function getCotes () {
    const cotes = []
    const triangle = self.nom
    const sommets = triangle.split('')
    cotes[0] = '$[' + sommets[0] + '' + sommets[1] + ']$'
    cotes[1] = '$[' + sommets[1] + '' + sommets[2] + ']$'
    cotes[2] = '$[' + sommets[2] + '' + sommets[0] + ']$'

    return cotes
  }

  /**
   * @return {array} Renvoie un tableau contenant le nom des longueurs des côtés du triangle tiré au hasard
   * * les strings sont EN MODE MATHS le premier caractère du string est un $
   * @example si triangle est une instance de la classe Triangle() triangle.getCotes() renvoie le tableau de strings ['$AM$','$MI$','$IA$'] dans cet ordre si AMI est le nom tiré au hasard
   */
  function getLongueurs () {
    const longueurs = []
    const triangle = self.nom
    const sommets = triangle.split('')
    longueurs[0] = '$' + sommets[0] + '' + sommets[1] + '$'
    longueurs[1] = '$' + sommets[1] + '' + sommets[2] + '$'
    longueurs[2] = '$' + sommets[2] + '' + sommets[0] + '$'

    return longueurs
  }

  /**
   * @return {array} Renvoie un tableau avec les valeurs des longueurs des côtés du triangle passées en paramètre à l'instance de la classe
   */
  function getLongueursValeurs () {
    if ((typeof self.l1 === 'undefined') || (typeof self.l2 === 'undefined') || (typeof self.l3 === 'undefined')) {
      // return false;
      return ['L\'une des longueurs de l\'objet triangle n\'est pas définie']
    }
    const longueurs = []
    longueurs[0] = self.l1
    longueurs[1] = self.l2
    longueurs[2] = self.l3

    return longueurs
  }

  /**
   * @return {array} Renvoie un tableau de strings avec les noms des angles du triangle.
   * * les strings sont EN MODE MATHS le premier caractère du string est un $
   */
  function getAngles () {
    const angles = []
    const triangle = self.nom
    const sommets = triangle.split('')
    angles[0] = `$\\;\\widehat{${sommets[0] + sommets[1] + sommets[2]}}$`
    angles[1] = `$\\;\\widehat{${sommets[1] + sommets[2] + sommets[0]}}$`
    angles[2] = `$\\;\\widehat{${sommets[2] + sommets[0] + sommets[1]}}$`

    return angles
  }

  /**
   * @return {array} Renvoie un tableau avec les valeurs des angles du triangle passées en paramètre à l'instance de la classe
   */
  function getAnglesValeurs () {
    if ((typeof self.a1 === 'undefined') || (typeof self.a2 === 'undefined') || (typeof self.a3 === 'undefined')) {
      // return false;
      return ['L\'un des angles de l\'objet triangle n\'est pas définie']
    }
    const angles = []
    angles[0] = self.a1
    angles[1] = self.a2
    angles[2] = self.a3

    return angles
  }

  /**
   * @return {array} Renvoie un tableau de strings avec les noms des sommets du triangle.
   * * les strings sont EN MODE MATHS le premier caractère du string est un $
   */
  function getSommets (math = true) {
    const triangle = self.nom
    const sommets = triangle.split('')
    if (math === true) {
      sommets[0] = '$' + sommets[0] + '$'
      sommets[1] = '$' + sommets[1] + '$'
      sommets[2] = '$' + sommets[2] + '$'
    }
    return sommets
  }

  /**
   * @return {array} Renvoie le périmètre de l'instance de la classe Triangle() avec les valeurs des longueurs des côtés du triangle passées en paramètre à l'instance
   * @example let triangle = new Triangle();
   * * triangle.l1 = 2;
   * * triangle.l2 = 3;
   * * triangle.l3 = 4
   * * triangle.getPerimetre() renvoie 9
   */
  function getPerimetre () {
    if ((typeof self.l1 === 'undefined') || (typeof self.l2 === 'undefined') || (typeof self.l3 === 'undefined')) {
      // return false;
      return 'L\'une des longueurs de l\'objet triangle n\'est pas définie'
    } else {
      return self.l1 + self.l2 + self.l3
    }
  }

  /**
   * @return {array} Renvoie un booleen selon que les trois longueurs passées à l'instance de la classe forment un vrai triangle ou non
   * @example let triangle = new Triangle();
   * * triangle.l1 = 2;
   * * triangle.l2 = 3;
   * * triangle.l3 = 7
   * * triangle.isTrueTriangleLongueurs() renvoie false
   * @example let triangle = new Triangle();
   * * triangle.l1 = 2;
   * * triangle.l2 = 3;
   * * triangle.l3 = 4
   * * triangle.isTrueTriangleLongueurs() renvoie true
   */
  function isTrueTriangleLongueurs () {
    if ((typeof self.l1 === 'undefined') || (typeof self.l2 === 'undefined') || (typeof self.l3 === 'undefined')) {
      return false
      // return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
    }
    const longueurs = [self.l1, self.l2, self.l3]
    longueurs.sort(function (a, b) {
      return a - b
    })
    if (longueurs[2] < longueurs[0] + longueurs[1]) {
      return true
    } else {
      return false
    }
  }

  /**
   * @return {array} Renvoie un booleen selon que les trois longueurs passées à l'instance de la classe forment un triangle plat ou non
   * @example let triangle = new Triangle();
   * * triangle.l1 = 2;
   * * triangle.l2 = 3;
   * * triangle.l3 = 5
   * * triangle.isTrueTriangleLongueurs() renvoie true
   * @example let triangle = new Triangle();
   * * triangle.l1 = 2;
   * * triangle.l2 = 3;
   * * triangle.l3 = 4
   * * triangle.isTrueTriangleLongueurs() renvoie false
   */
  function isPlatTriangleLongueurs () {
    if ((typeof self.l1 === 'undefined') || (typeof self.l2 === 'undefined') || (typeof self.l3 === 'undefined')) {
      // return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
      return false
    }
    const longueurs = [self.l1, self.l2, self.l3]
    longueurs.sort(function (a, b) {
      return a - b
    })
    if (egal(longueurs[2], longueurs[0] + longueurs[1])) {
      return true
    } else {
      return false
    }
  }

  /**
   * @return {array} Renvoie un booleen selon que les trois angles passés à l'instance de la classe forment un vrai triangle ou non
   * @example let triangle = new Triangle();
   * * triangle.a1 = 100;
   * * triangle.a2 = 40;
   * * triangle.a3 = 50
   * * triangle.isTrueTriangleAngles() renvoie false
   * @example let triangle = new Triangle();
   * * triangle.a1 = 80;
   * * triangle.a2 = 40;
   * * triangle.a3 = 60
   * * triangle.isTrueTriangleAngles() renvoie true
   */

  function isTrueTriangleAngles () {
    // si l'un des angles n'est pas defini ça ne va pas
    if ((typeof self.a1 === 'undefined') || (typeof self.a2 === 'undefined') || (typeof self.a3 === 'undefined')) {
      return false
      // return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
    }
    // si l'un des angles est négatif ça ne va pas
    if ((self.a1 < 0) || (self.a2 < 0) || (self.a3 < 0)) {
      return false
      // return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
    }
    if ((self.a1 + self.a2 + self.a3) === 180) {
      if ((self.a1 === 0 && self.a2 === 0) || (self.a2 === 0 && self.a3 === 0) || (self.a3 === 0 && self.a1 === 0)) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

  // renvoie un booleen selon que les trois angles forment un triangle plat ou non
  /**
   * @return {array} Renvoie un booleen selon que les trois angles passés à l'instance de la classe forment un triangle plat ou non
   * @example let triangle = new Triangle();
   * * triangle.a1 = 0;
   * * triangle.a2 = 0;
   * * triangle.a3 = 180
   * * triangle.isTrueTriangleAngles() renvoie true
   * @example let triangle = new Triangle();
   * * triangle.a1 = 80;
   * * triangle.a2 = 40;
   * * triangle.a3 = 60
   * * triangle.isTrueTriangleAngles() renvoie false
   */
  function isPlatTriangleAngles () {
    if ((typeof self.a1 === 'undefined') || (typeof self.a2 === 'undefined') || (typeof self.a3 === 'undefined')) {
      return false
      // return 'L\'une des longueurs de l\'objet triangle n\'est pas définie';
    }
    if ((self.a1 + self.a2 + self.a3) === 180) {
      if ((self.a1 === 0 && self.a2 === 0) || (self.a2 === 0 && self.a3 === 0) || (self.a3 === 0 && self.a1 === 0)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  this.l1 = l1
  this.l2 = l2
  this.l3 = l3
  this.a1 = a1
  this.a2 = a2
  this.a3 = a3
  // this.nom = nom;
  this.getNom = getNom
  this.getCotes = getCotes
  this.getLongueurs = getLongueurs
  this.getLongueursValeurs = getLongueursValeurs
  this.getAngles = getAngles
  this.getAnglesValeurs = getAnglesValeurs
  this.getSommets = getSommets
  this.getPerimetre = getPerimetre
  this.isTrueTriangleLongueurs = isTrueTriangleLongueurs
  this.isPlatTriangleLongueurs = isPlatTriangleLongueurs
  this.isTrueTriangleAngles = isTrueTriangleAngles
  this.isPlatTriangleAngles = isPlatTriangleAngles
  // this.isQuelconque = isQuelconque;
}

/**
 * @class
 * @classdesc Classe Relatif - Méthodes utiles sur les relatifs
 * @param {...any} relatifs est un paramètre du reste
 * @author Sébastien Lozano
 */
export function Relatif (...relatifs) {
  // 'use strict'; pas de use strict avec un paramètre du reste
  this.relatifs = relatifs

  /**
   * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs,
   * * Si 0 fait partie des relatifs on renvoie une erreur
   * @return {array} Renvoie un tableau de -1 ou 1
   * @example getSigneNumber(-1,-2,8,-9,4) renvoie [-1,-1,1,-1,1]
   */
  function getSigneNumber () {
    const signes = []
    try {
      // port du string interdit !
      relatifs.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (relatifs.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      relatifs.forEach(function (element) {
        if (element < 0) {
          signes.push(-1)
        }
        if (element > 0) {
          signes.push(1)
        }
      })
    } catch (err) {
      console.log(err.message)
      console.log(err.stack)
    }
    return signes
  }

  /**
   * * Récupère le signe de chaque relatif déclaré dans le paramètre du reste relatifs
   * @return {array} Renvoie un tableau de strings valant 'négatif' ou 'positif'
   * @example getSigneNumber(-1,-2,8,-9,4) renvoie le tableau de strings [négatif,négatif,positif,négatif,positif]
  */
  function getSigneString () {
    const signesString = []
    const signes = getSigneNumber()
    signes.forEach(function (element) {
      if (element === -1) {
        signesString.push('négatif')
      }
      if (element === 1) {
        signesString.push('positif')
      }
    })
    return signesString
  }

  /**
   *
   * @param  {...any} n une liste de deux ou plus de nombres relatifs
   * @return {number} Renvoie le signe du produit des nombres de cette liste. 1 ou -1
   * @example getSigneProduitNumber(1,-4,-7) renvoie 1
   */

  function getSigneProduitNumber (...n) {
    let produit = 1
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      n.forEach(function (element) {
        produit = produit * element
      })
      if (produit < 0) {
        return -1
      }
      if (produit > 0) {
        return 1
      }
    } catch (err) {
      console.log(err.message)
      console.log(err.stack)
    }
  }

  /**
   *
   * @param  {...any} n une liste de deux ou plus de nombres relatifs
   * @return {string} Renvoie un string désignant le signe du produit des nombres de cette liste. postif1 ou négatif
   * @example getSigneProduitNumber(1,-4,-7) renvoie le string positif
   */

  function getSigneProduitString (...n) {
    const produit = getSigneProduitNumber(...n)
    if (produit === -1) {
      return 'négatif'
    }
    if (produit === 1) {
      return 'positif'
    }
  }

  /**
   *
   * @param  {...any} n une liste de deux ou plus de nombres relatifs
   * @return {string} Renvoie le nombre d'éléments négatifs des nombres de cette liste.
   * * la liste d'entiers doit être passé dans un tableau
   * @example getCardNegatifs([1,-4,-7]) renvoie 2
   * @example getCardNegatifs([4,-5,7,7,-8,-9]) renvoie 3
   */

  function getCardNegatifs ([...n]) {
    let card = 0
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
        if (element === 0) {
          throw new RangeError(`${element} a été exclu des valeurs possibles.`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      n.forEach(function (element) {
        if (element < 0) {
          card = card + 1
        }
      })
      return card
    } catch (err) {
      console.log(err.message)
    }
  }

  /**
   * Fonction locale
   * @param {integer} n un entier désignant le cardinal de facteurs négatifs dans un produit
   * @return un string au singulier ou au pluriel
   * @example orth_facteurs_negatifs(0) ou orth_facteurs_negatifs(1) renvoie 'facteur negatif'
   * @example orth_facteurs_negatifs(7) renvoie 'facteurs negatifs'
   */
  function orthographeFacteursNegatifs (n) {
    if (n >= 2) {
      return 'facteurs négatifs'
    } else {
      return 'facteur négatif'
    }
  }

  /**
   * @param  {...any} n une liste de deux ou plus de nombres relatifs qui constituent les facteurs du produit
   * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.
   * @example setRegleProduitFacteurs([1,-2,-8,5]) renvoie le string 'Il y a 2 facteurs négatifs, le nombre de facteurs négatifs est pair donc le produit est positif.'
   */

  function setRegleSigneProduit (...n) {
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      if (n.length === 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          return 'Les deux facteurs ont le même signe donc le produit est positif.'
        } else {
          return 'Les deux facteurs ont un signe différent donc le produit est négatif.'
        }
      } else if (n.length > 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          if (getCardNegatifs(n) === 0) {
            return 'Tous les facteurs sont positifs donc le produit est positif.'
          } else {
            return `Il y a ${getCardNegatifs(n)} ${orthographeFacteursNegatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est pair donc le produit est positif.`
          }
        } else {
          return `Il y a ${getCardNegatifs(n)} ${orthographeFacteursNegatifs(getCardNegatifs(n))}, le nombre de facteurs négatifs est impair donc le produit est négatif.`
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  /**
 *
 * @param  {...any} num une liste de deux ou plus de nombres relatifs qui constituent les facteurs du numérateur
 * @param  {...any} den une liste de deux ou plus de nombres relatifs qui constituent les facteurs du dénominateur
 * @return {string} Renvoie la règle qui permet de justifier le signe d'un produit de relatifs adaptée à la liste passée en paramètre.
 * @example setRegleProduitQuotient([1,-2],[-8,5]) renvoie le string 'La somme des facteurs négatifs du numérateur et des facteurs négatifs du dénominateur vaut 2, ce nombre est pair donc le quotient est positif.'
 */

  function setRegleSigneQuotient (...n) {
    try {
      // port du string interdit !
      n.forEach(function (element) {
        if (typeof element === 'string') {
          throw new TypeError(`${element} est un string !`)
        }
      })
      // Quoi faire sans nombres ?
      if (n.length === 0) {
        throw new Error('C\'est mieux avec quelques nombres !')
      }
      if (n.length === 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          return 'Le numérateur et le dénominateur ont le même signe donc le quotient est positif.'
        } else {
          return 'Les numérateur et le dénominateur ont un signe différent donc le quotient est négatif.'
        }
      } else if (n.length > 2) {
        if (getCardNegatifs(n) % 2 === 0) {
          if (getCardNegatifs(n) === 0) {
            return 'Tous les facteurs du numérateur et tous les facteurs du dénominateur sont positifs donc le quotient est positif.'
          } else {
            // return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`;
            return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est pair donc le quotient est positif.`
          }
        } else {
          // return `La somme du nombre de facteurs négatifs du numérateur et du nombre de facteurs négatifs du dénominateur vaut ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`;
          return `Quand on compte les facteurs négatifs du numérateur et du dénominateur, on trouve ${getCardNegatifs(n)}, ce nombre est impair donc le quotient est négatif.`
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  this.getSigneNumber = getSigneNumber
  this.getSigneString = getSigneString
  this.getSigneProduitNumber = getSigneProduitNumber
  this.getSigneProduitString = getSigneProduitString
  this.getCardNegatifs = getCardNegatifs
  this.setRegleSigneProduit = setRegleSigneProduit
  this.setRegleSigneQuotient = setRegleSigneQuotient
}

export function nombreEnLettres (nb, type = 1) {
  let partieEntiere, partieDecimale, nbstring, nbDec, decstring
  if (estentier(nb)) return partieEntiereEnLettres(nb)
  else {
    partieEntiere = Math.floor(nb)
    partieDecimale = new Decimal(nb).sub(partieEntiere).toDP(3)
    nbDec = partieDecimale.toString().replace(/\d*\./, '').length
    partieDecimale = partieDecimale.mul(10 ** nbDec).toNumber()

    switch (nbDec) {
      case 1:
        if (partieDecimale > 1) decstring = ' dixièmes'
        else decstring = ' dixième'
        break
      case 2:
        if (partieDecimale > 1) decstring = ' centièmes'
        else decstring = ' centième'
        break
      case 3:
        if (partieDecimale > 1) decstring = ' millièmes'
        else decstring = ' millième'
        break
    }

    if (type === 1) {
      nbstring = partieEntiereEnLettres(partieEntiere) + ' unités et ' + partieEntiereEnLettres(partieDecimale) + decstring
    } else if (nbDec === nombreDeChiffresDansLaPartieEntiere(partieDecimale)) {
      nbstring = partieEntiereEnLettres(partieEntiere) + ' virgule ' + partieEntiereEnLettres(partieDecimale)
    } else {
      nbstring = partieEntiereEnLettres(partieEntiere) + ' virgule '
      for (let n = 0; n < nbDec - nombreDeChiffresDansLaPartieEntiere(partieDecimale); n++) {
        nbstring += 'zéro-'
      }
      nbstring += partieEntiereEnLettres(partieDecimale)
    }
  }
  return nbstring
}
/**
 *
 *
 * @param {int} nb

 *
 */
export function partieEntiereEnLettres (nb) {
  const dictionnaire = {
    0: 'zéro',
    '000': '',
    1: 'un',
    2: 'deux',
    3: 'trois',
    4: 'quatre',
    5: 'cinq',
    6: 'six',
    7: 'sept',
    8: 'huit',
    9: 'neuf',
    10: 'dix',
    11: 'onze',
    12: 'douze',
    13: 'treize',
    14: 'quatorze',
    15: 'quinze',
    16: 'seize',
    17: 'dix-sept',
    18: 'dix-huit',
    19: 'dix-neuf',
    20: 'vingt',
    21: 'vingt et un',
    22: 'vingt-deux',
    23: 'vingt-trois',
    24: 'vingt-quatre',
    25: 'vingt-cinq',
    26: 'vingt-six',
    27: 'vingt-sept',
    28: 'vingt-huit',
    29: 'vingt-neuf',
    30: 'trente',
    31: 'trente et un',
    32: 'trente-deux',
    33: 'trente-trois',
    34: 'trente-quatre',
    35: 'trente-cinq',
    36: 'trente-six',
    37: 'trente-sept',
    38: 'trente-huit',
    39: 'trente-neuf',
    40: 'quarante',
    41: 'quarante et un',
    42: 'quarante-deux',
    43: 'quarante-trois',
    44: 'quarante-quatre',
    45: 'quarante-cinq',
    46: 'quarante-six',
    47: 'quarante-sept',
    48: 'quarante-huit',
    49: 'quarante-neuf',
    50: 'cinquante',
    51: 'cinquante et un',
    52: 'cinquante-deux',
    53: 'cinquante-trois',
    54: 'cinquante-quatre',
    55: 'cinquante-cinq',
    56: 'cinquante-six',
    57: 'cinquante-sept',
    58: 'cinquante-huit',
    59: 'cinquante-neuf',
    60: 'soixante',
    61: 'soixante et un',
    62: 'soixante-deux',
    63: 'soixante-trois',
    64: 'soixante-quatre',
    65: 'soixante-cinq',
    66: 'soixante-six',
    67: 'soixante-sept',
    68: 'soixante-huit',
    69: 'soixante-neuf',
    70: 'soixante-dix',
    71: 'soixante et onze',
    72: 'soixante-douze',
    73: 'soixante-treize',
    74: 'soixante-quatorze',
    75: 'soixante-quinze',
    76: 'soixante-seize',
    77: 'soixante-dix-sept',
    78: 'soixante-dix-huit',
    79: 'soixante-dix-neuf',
    80: 'quatre-vingts',
    81: 'quatre-vingt-un',
    82: 'quatre-vingt-deux',
    83: 'quatre-vingt-trois',
    84: 'quatre-vingt-quatre',
    85: 'quatre-vingt-cinq',
    86: 'quatre-vingt-six',
    87: 'quatre-vingt-sept',
    88: 'quatre-vingt-huit',
    89: 'quatre-vingt-neuf',
    90: 'quatre-vingt-dix',
    91: 'quatre-vingt-onze',
    92: 'quatre-vingt-douze',
    93: 'quatre-vingt-treize',
    94: 'quatre-vingt-quatorze',
    95: 'quatre-vingt-quinze',
    96: 'quatre-vingt-seize',
    97: 'quatre-vingt-dix-sept',
    98: 'quatre-vingt-dix-huit',
    99: 'quatre-vingt-dix-neuf',
    100: 'cent',
    101: 'cent un',
    102: 'cent deux',
    103: 'cent trois',
    104: 'cent quatre',
    105: 'cent cinq',
    106: 'cent six',
    107: 'cent sept',
    108: 'cent huit',
    109: 'cent neuf',
    110: 'cent dix',
    111: 'cent onze',
    112: 'cent douze',
    113: 'cent treize',
    114: 'cent quatorze',
    115: 'cent quinze',
    116: 'cent seize',
    117: 'cent dix-sept',
    118: 'cent dix-huit',
    119: 'cent dix-neuf',
    120: 'cent vingt',
    121: 'cent vingt et un',
    122: 'cent vingt-deux',
    123: 'cent vingt-trois',
    124: 'cent vingt-quatre',
    125: 'cent vingt-cinq',
    126: 'cent vingt-six',
    127: 'cent vingt-sept',
    128: 'cent vingt-huit',
    129: 'cent vingt-neuf',
    130: 'cent trente',
    131: 'cent trente et un',
    132: 'cent trente-deux',
    133: 'cent trente-trois',
    134: 'cent trente-quatre',
    135: 'cent trente-cinq',
    136: 'cent trente-six',
    137: 'cent trente-sept',
    138: 'cent trente-huit',
    139: 'cent trente-neuf',
    140: 'cent quarante',
    141: 'cent quarante et un',
    142: 'cent quarante-deux',
    143: 'cent quarante-trois',
    144: 'cent quarante-quatre',
    145: 'cent quarante-cinq',
    146: 'cent quarante-six',
    147: 'cent quarante-sept',
    148: 'cent quarante-huit',
    149: 'cent quarante-neuf',
    150: 'cent cinquante',
    151: 'cent cinquante et un',
    152: 'cent cinquante-deux',
    153: 'cent cinquante-trois',
    154: 'cent cinquante-quatre',
    155: 'cent cinquante-cinq',
    156: 'cent cinquante-six',
    157: 'cent cinquante-sept',
    158: 'cent cinquante-huit',
    159: 'cent cinquante-neuf',
    160: 'cent soixante',
    161: 'cent soixante et un',
    162: 'cent soixante-deux',
    163: 'cent soixante-trois',
    164: 'cent soixante-quatre',
    165: 'cent soixante-cinq',
    166: 'cent soixante-six',
    167: 'cent soixante-sept',
    168: 'cent soixante-huit',
    169: 'cent soixante-neuf',
    170: 'cent soixante-dix',
    171: 'cent soixante et onze',
    172: 'cent soixante-douze',
    173: 'cent soixante-treize',
    174: 'cent soixante-quatorze',
    175: 'cent soixante-quinze',
    176: 'cent soixante-seize',
    177: 'cent soixante-dix-sept',
    178: 'cent soixante-dix-huit',
    179: 'cent soixante-dix-neuf',
    180: 'cent quatre-vingts',
    181: 'cent quatre-vingt-un',
    182: 'cent quatre-vingt-deux',
    183: 'cent quatre-vingt-trois',
    184: 'cent quatre-vingt-quatre',
    185: 'cent quatre-vingt-cinq',
    186: 'cent quatre-vingt-six',
    187: 'cent quatre-vingt-sept',
    188: 'cent quatre-vingt-huit',
    189: 'cent quatre-vingt-neuf',
    190: 'cent quatre-vingt-dix',
    191: 'cent quatre-vingt-onze',
    192: 'cent quatre-vingt-douze',
    193: 'cent quatre-vingt-treize',
    194: 'cent quatre-vingt-quatorze',
    195: 'cent quatre-vingt-quinze',
    196: 'cent quatre-vingt-seize',
    197: 'cent quatre-vingt-dix-sept',
    198: 'cent quatre-vingt-dix-huit',
    199: 'cent quatre-vingt-dix-neuf',
    200: 'deux cents',
    201: 'deux cent un',
    202: 'deux cent deux',
    203: 'deux cent trois',
    204: 'deux cent quatre',
    205: 'deux cent cinq',
    206: 'deux cent six',
    207: 'deux cent sept',
    208: 'deux cent huit',
    209: 'deux cent neuf',
    210: 'deux cent dix',
    211: 'deux cent onze',
    212: 'deux cent douze',
    213: 'deux cent treize',
    214: 'deux cent quatorze',
    215: 'deux cent quinze',
    216: 'deux cent seize',
    217: 'deux cent dix-sept',
    218: 'deux cent dix-huit',
    219: 'deux cent dix-neuf',
    220: 'deux cent vingt',
    221: 'deux cent vingt et un',
    222: 'deux cent vingt-deux',
    223: 'deux cent vingt-trois',
    224: 'deux cent vingt-quatre',
    225: 'deux cent vingt-cinq',
    226: 'deux cent vingt-six',
    227: 'deux cent vingt-sept',
    228: 'deux cent vingt-huit',
    229: 'deux cent vingt-neuf',
    230: 'deux cent trente',
    231: 'deux cent trente et un',
    232: 'deux cent trente-deux',
    233: 'deux cent trente-trois',
    234: 'deux cent trente-quatre',
    235: 'deux cent trente-cinq',
    236: 'deux cent trente-six',
    237: 'deux cent trente-sept',
    238: 'deux cent trente-huit',
    239: 'deux cent trente-neuf',
    240: 'deux cent quarante',
    241: 'deux cent quarante et un',
    242: 'deux cent quarante-deux',
    243: 'deux cent quarante-trois',
    244: 'deux cent quarante-quatre',
    245: 'deux cent quarante-cinq',
    246: 'deux cent quarante-six',
    247: 'deux cent quarante-sept',
    248: 'deux cent quarante-huit',
    249: 'deux cent quarante-neuf',
    250: 'deux cent cinquante',
    251: 'deux cent cinquante et un',
    252: 'deux cent cinquante-deux',
    253: 'deux cent cinquante-trois',
    254: 'deux cent cinquante-quatre',
    255: 'deux cent cinquante-cinq',
    256: 'deux cent cinquante-six',
    257: 'deux cent cinquante-sept',
    258: 'deux cent cinquante-huit',
    259: 'deux cent cinquante-neuf',
    260: 'deux cent soixante',
    261: 'deux cent soixante et un',
    262: 'deux cent soixante-deux',
    263: 'deux cent soixante-trois',
    264: 'deux cent soixante-quatre',
    265: 'deux cent soixante-cinq',
    266: 'deux cent soixante-six',
    267: 'deux cent soixante-sept',
    268: 'deux cent soixante-huit',
    269: 'deux cent soixante-neuf',
    270: 'deux cent soixante-dix',
    271: 'deux cent soixante et onze',
    272: 'deux cent soixante-douze',
    273: 'deux cent soixante-treize',
    274: 'deux cent soixante-quatorze',
    275: 'deux cent soixante-quinze',
    276: 'deux cent soixante-seize',
    277: 'deux cent soixante-dix-sept',
    278: 'deux cent soixante-dix-huit',
    279: 'deux cent soixante-dix-neuf',
    280: 'deux cent quatre-vingts',
    281: 'deux cent quatre-vingt-un',
    282: 'deux cent quatre-vingt-deux',
    283: 'deux cent quatre-vingt-trois',
    284: 'deux cent quatre-vingt-quatre',
    285: 'deux cent quatre-vingt-cinq',
    286: 'deux cent quatre-vingt-six',
    287: 'deux cent quatre-vingt-sept',
    288: 'deux cent quatre-vingt-huit',
    289: 'deux cent quatre-vingt-neuf',
    290: 'deux cent quatre-vingt-dix',
    291: 'deux cent quatre-vingt-onze',
    292: 'deux cent quatre-vingt-douze',
    293: 'deux cent quatre-vingt-treize',
    294: 'deux cent quatre-vingt-quatorze',
    295: 'deux cent quatre-vingt-quinze',
    296: 'deux cent quatre-vingt-seize',
    297: 'deux cent quatre-vingt-dix-sept',
    298: 'deux cent quatre-vingt-dix-huit',
    299: 'deux cent quatre-vingt-dix-neuf',
    300: 'trois cents',
    301: 'trois cent un',
    302: 'trois cent deux',
    303: 'trois cent trois',
    304: 'trois cent quatre',
    305: 'trois cent cinq',
    306: 'trois cent six',
    307: 'trois cent sept',
    308: 'trois cent huit',
    309: 'trois cent neuf',
    310: 'trois cent dix',
    311: 'trois cent onze',
    312: 'trois cent douze',
    313: 'trois cent treize',
    314: 'trois cent quatorze',
    315: 'trois cent quinze',
    316: 'trois cent seize',
    317: 'trois cent dix-sept',
    318: 'trois cent dix-huit',
    319: 'trois cent dix-neuf',
    320: 'trois cent vingt',
    321: 'trois cent vingt et un',
    322: 'trois cent vingt-deux',
    323: 'trois cent vingt-trois',
    324: 'trois cent vingt-quatre',
    325: 'trois cent vingt-cinq',
    326: 'trois cent vingt-six',
    327: 'trois cent vingt-sept',
    328: 'trois cent vingt-huit',
    329: 'trois cent vingt-neuf',
    330: 'trois cent trente',
    331: 'trois cent trente et un',
    332: 'trois cent trente-deux',
    333: 'trois cent trente-trois',
    334: 'trois cent trente-quatre',
    335: 'trois cent trente-cinq',
    336: 'trois cent trente-six',
    337: 'trois cent trente-sept',
    338: 'trois cent trente-huit',
    339: 'trois cent trente-neuf',
    340: 'trois cent quarante',
    341: 'trois cent quarante et un',
    342: 'trois cent quarante-deux',
    343: 'trois cent quarante-trois',
    344: 'trois cent quarante-quatre',
    345: 'trois cent quarante-cinq',
    346: 'trois cent quarante-six',
    347: 'trois cent quarante-sept',
    348: 'trois cent quarante-huit',
    349: 'trois cent quarante-neuf',
    350: 'trois cent cinquante',
    351: 'trois cent cinquante et un',
    352: 'trois cent cinquante-deux',
    353: 'trois cent cinquante-trois',
    354: 'trois cent cinquante-quatre',
    355: 'trois cent cinquante-cinq',
    356: 'trois cent cinquante-six',
    357: 'trois cent cinquante-sept',
    358: 'trois cent cinquante-huit',
    359: 'trois cent cinquante-neuf',
    360: 'trois cent soixante',
    361: 'trois cent soixante et un',
    362: 'trois cent soixante-deux',
    363: 'trois cent soixante-trois',
    364: 'trois cent soixante-quatre',
    365: 'trois cent soixante-cinq',
    366: 'trois cent soixante-six',
    367: 'trois cent soixante-sept',
    368: 'trois cent soixante-huit',
    369: 'trois cent soixante-neuf',
    370: 'trois cent soixante-dix',
    371: 'trois cent soixante et onze',
    372: 'trois cent soixante-douze',
    373: 'trois cent soixante-treize',
    374: 'trois cent soixante-quatorze',
    375: 'trois cent soixante-quinze',
    376: 'trois cent soixante-seize',
    377: 'trois cent soixante-dix-sept',
    378: 'trois cent soixante-dix-huit',
    379: 'trois cent soixante-dix-neuf',
    380: 'trois cent quatre-vingts',
    381: 'trois cent quatre-vingt-un',
    382: 'trois cent quatre-vingt-deux',
    383: 'trois cent quatre-vingt-trois',
    384: 'trois cent quatre-vingt-quatre',
    385: 'trois cent quatre-vingt-cinq',
    386: 'trois cent quatre-vingt-six',
    387: 'trois cent quatre-vingt-sept',
    388: 'trois cent quatre-vingt-huit',
    389: 'trois cent quatre-vingt-neuf',
    390: 'trois cent quatre-vingt-dix',
    391: 'trois cent quatre-vingt-onze',
    392: 'trois cent quatre-vingt-douze',
    393: 'trois cent quatre-vingt-treize',
    394: 'trois cent quatre-vingt-quatorze',
    395: 'trois cent quatre-vingt-quinze',
    396: 'trois cent quatre-vingt-seize',
    397: 'trois cent quatre-vingt-dix-sept',
    398: 'trois cent quatre-vingt-dix-huit',
    399: 'trois cent quatre-vingt-dix-neuf',
    400: 'quatre cents',
    401: 'quatre cent un',
    402: 'quatre cent deux',
    403: 'quatre cent trois',
    404: 'quatre cent quatre',
    405: 'quatre cent cinq',
    406: 'quatre cent six',
    407: 'quatre cent sept',
    408: 'quatre cent huit',
    409: 'quatre cent neuf',
    410: 'quatre cent dix',
    411: 'quatre cent onze',
    412: 'quatre cent douze',
    413: 'quatre cent treize',
    414: 'quatre cent quatorze',
    415: 'quatre cent quinze',
    416: 'quatre cent seize',
    417: 'quatre cent dix-sept',
    418: 'quatre cent dix-huit',
    419: 'quatre cent dix-neuf',
    420: 'quatre cent vingt',
    421: 'quatre cent vingt et un',
    422: 'quatre cent vingt-deux',
    423: 'quatre cent vingt-trois',
    424: 'quatre cent vingt-quatre',
    425: 'quatre cent vingt-cinq',
    426: 'quatre cent vingt-six',
    427: 'quatre cent vingt-sept',
    428: 'quatre cent vingt-huit',
    429: 'quatre cent vingt-neuf',
    430: 'quatre cent trente',
    431: 'quatre cent trente et un',
    432: 'quatre cent trente-deux',
    433: 'quatre cent trente-trois',
    434: 'quatre cent trente-quatre',
    435: 'quatre cent trente-cinq',
    436: 'quatre cent trente-six',
    437: 'quatre cent trente-sept',
    438: 'quatre cent trente-huit',
    439: 'quatre cent trente-neuf',
    440: 'quatre cent quarante',
    441: 'quatre cent quarante et un',
    442: 'quatre cent quarante-deux',
    443: 'quatre cent quarante-trois',
    444: 'quatre cent quarante-quatre',
    445: 'quatre cent quarante-cinq',
    446: 'quatre cent quarante-six',
    447: 'quatre cent quarante-sept',
    448: 'quatre cent quarante-huit',
    449: 'quatre cent quarante-neuf',
    450: 'quatre cent cinquante',
    451: 'quatre cent cinquante et un',
    452: 'quatre cent cinquante-deux',
    453: 'quatre cent cinquante-trois',
    454: 'quatre cent cinquante-quatre',
    455: 'quatre cent cinquante-cinq',
    456: 'quatre cent cinquante-six',
    457: 'quatre cent cinquante-sept',
    458: 'quatre cent cinquante-huit',
    459: 'quatre cent cinquante-neuf',
    460: 'quatre cent soixante',
    461: 'quatre cent soixante et un',
    462: 'quatre cent soixante-deux',
    463: 'quatre cent soixante-trois',
    464: 'quatre cent soixante-quatre',
    465: 'quatre cent soixante-cinq',
    466: 'quatre cent soixante-six',
    467: 'quatre cent soixante-sept',
    468: 'quatre cent soixante-huit',
    469: 'quatre cent soixante-neuf',
    470: 'quatre cent soixante-dix',
    471: 'quatre cent soixante et onze',
    472: 'quatre cent soixante-douze',
    473: 'quatre cent soixante-treize',
    474: 'quatre cent soixante-quatorze',
    475: 'quatre cent soixante-quinze',
    476: 'quatre cent soixante-seize',
    477: 'quatre cent soixante-dix-sept',
    478: 'quatre cent soixante-dix-huit',
    479: 'quatre cent soixante-dix-neuf',
    480: 'quatre cent quatre-vingts',
    481: 'quatre cent quatre-vingt-un',
    482: 'quatre cent quatre-vingt-deux',
    483: 'quatre cent quatre-vingt-trois',
    484: 'quatre cent quatre-vingt-quatre',
    485: 'quatre cent quatre-vingt-cinq',
    486: 'quatre cent quatre-vingt-six',
    487: 'quatre cent quatre-vingt-sept',
    488: 'quatre cent quatre-vingt-huit',
    489: 'quatre cent quatre-vingt-neuf',
    490: 'quatre cent quatre-vingt-dix',
    491: 'quatre cent quatre-vingt-onze',
    492: 'quatre cent quatre-vingt-douze',
    493: 'quatre cent quatre-vingt-treize',
    494: 'quatre cent quatre-vingt-quatorze',
    495: 'quatre cent quatre-vingt-quinze',
    496: 'quatre cent quatre-vingt-seize',
    497: 'quatre cent quatre-vingt-dix-sept',
    498: 'quatre cent quatre-vingt-dix-huit',
    499: 'quatre cent quatre-vingt-dix-neuf',
    500: 'cinq cents',
    501: 'cinq cent un',
    502: 'cinq cent deux',
    503: 'cinq cent trois',
    504: 'cinq cent quatre',
    505: 'cinq cent cinq',
    506: 'cinq cent six',
    507: 'cinq cent sept',
    508: 'cinq cent huit',
    509: 'cinq cent neuf',
    510: 'cinq cent dix',
    511: 'cinq cent onze',
    512: 'cinq cent douze',
    513: 'cinq cent treize',
    514: 'cinq cent quatorze',
    515: 'cinq cent quinze',
    516: 'cinq cent seize',
    517: 'cinq cent dix-sept',
    518: 'cinq cent dix-huit',
    519: 'cinq cent dix-neuf',
    520: 'cinq cent vingt',
    521: 'cinq cent vingt et un',
    522: 'cinq cent vingt-deux',
    523: 'cinq cent vingt-trois',
    524: 'cinq cent vingt-quatre',
    525: 'cinq cent vingt-cinq',
    526: 'cinq cent vingt-six',
    527: 'cinq cent vingt-sept',
    528: 'cinq cent vingt-huit',
    529: 'cinq cent vingt-neuf',
    530: 'cinq cent trente',
    531: 'cinq cent trente et un',
    532: 'cinq cent trente-deux',
    533: 'cinq cent trente-trois',
    534: 'cinq cent trente-quatre',
    535: 'cinq cent trente-cinq',
    536: 'cinq cent trente-six',
    537: 'cinq cent trente-sept',
    538: 'cinq cent trente-huit',
    539: 'cinq cent trente-neuf',
    540: 'cinq cent quarante',
    541: 'cinq cent quarante et un',
    542: 'cinq cent quarante-deux',
    543: 'cinq cent quarante-trois',
    544: 'cinq cent quarante-quatre',
    545: 'cinq cent quarante-cinq',
    546: 'cinq cent quarante-six',
    547: 'cinq cent quarante-sept',
    548: 'cinq cent quarante-huit',
    549: 'cinq cent quarante-neuf',
    550: 'cinq cent cinquante',
    551: 'cinq cent cinquante et un',
    552: 'cinq cent cinquante-deux',
    553: 'cinq cent cinquante-trois',
    554: 'cinq cent cinquante-quatre',
    555: 'cinq cent cinquante-cinq',
    556: 'cinq cent cinquante-six',
    557: 'cinq cent cinquante-sept',
    558: 'cinq cent cinquante-huit',
    559: 'cinq cent cinquante-neuf',
    560: 'cinq cent soixante',
    561: 'cinq cent soixante et un',
    562: 'cinq cent soixante-deux',
    563: 'cinq cent soixante-trois',
    564: 'cinq cent soixante-quatre',
    565: 'cinq cent soixante-cinq',
    566: 'cinq cent soixante-six',
    567: 'cinq cent soixante-sept',
    568: 'cinq cent soixante-huit',
    569: 'cinq cent soixante-neuf',
    570: 'cinq cent soixante-dix',
    571: 'cinq cent soixante et onze',
    572: 'cinq cent soixante-douze',
    573: 'cinq cent soixante-treize',
    574: 'cinq cent soixante-quatorze',
    575: 'cinq cent soixante-quinze',
    576: 'cinq cent soixante-seize',
    577: 'cinq cent soixante-dix-sept',
    578: 'cinq cent soixante-dix-huit',
    579: 'cinq cent soixante-dix-neuf',
    580: 'cinq cent quatre-vingts',
    581: 'cinq cent quatre-vingt-un',
    582: 'cinq cent quatre-vingt-deux',
    583: 'cinq cent quatre-vingt-trois',
    584: 'cinq cent quatre-vingt-quatre',
    585: 'cinq cent quatre-vingt-cinq',
    586: 'cinq cent quatre-vingt-six',
    587: 'cinq cent quatre-vingt-sept',
    588: 'cinq cent quatre-vingt-huit',
    589: 'cinq cent quatre-vingt-neuf',
    590: 'cinq cent quatre-vingt-dix',
    591: 'cinq cent quatre-vingt-onze',
    592: 'cinq cent quatre-vingt-douze',
    593: 'cinq cent quatre-vingt-treize',
    594: 'cinq cent quatre-vingt-quatorze',
    595: 'cinq cent quatre-vingt-quinze',
    596: 'cinq cent quatre-vingt-seize',
    597: 'cinq cent quatre-vingt-dix-sept',
    598: 'cinq cent quatre-vingt-dix-huit',
    599: 'cinq cent quatre-vingt-dix-neuf',
    600: 'six cents',
    601: 'six cent un',
    602: 'six cent deux',
    603: 'six cent trois',
    604: 'six cent quatre',
    605: 'six cent cinq',
    606: 'six cent six',
    607: 'six cent sept',
    608: 'six cent huit',
    609: 'six cent neuf',
    610: 'six cent dix',
    611: 'six cent onze',
    612: 'six cent douze',
    613: 'six cent treize',
    614: 'six cent quatorze',
    615: 'six cent quinze',
    616: 'six cent seize',
    617: 'six cent dix-sept',
    618: 'six cent dix-huit',
    619: 'six cent dix-neuf',
    620: 'six cent vingt',
    621: 'six cent vingt et un',
    622: 'six cent vingt-deux',
    623: 'six cent vingt-trois',
    624: 'six cent vingt-quatre',
    625: 'six cent vingt-cinq',
    626: 'six cent vingt-six',
    627: 'six cent vingt-sept',
    628: 'six cent vingt-huit',
    629: 'six cent vingt-neuf',
    630: 'six cent trente',
    631: 'six cent trente et un',
    632: 'six cent trente-deux',
    633: 'six cent trente-trois',
    634: 'six cent trente-quatre',
    635: 'six cent trente-cinq',
    636: 'six cent trente-six',
    637: 'six cent trente-sept',
    638: 'six cent trente-huit',
    639: 'six cent trente-neuf',
    640: 'six cent quarante',
    641: 'six cent quarante et un',
    642: 'six cent quarante-deux',
    643: 'six cent quarante-trois',
    644: 'six cent quarante-quatre',
    645: 'six cent quarante-cinq',
    646: 'six cent quarante-six',
    647: 'six cent quarante-sept',
    648: 'six cent quarante-huit',
    649: 'six cent quarante-neuf',
    650: 'six cent cinquante',
    651: 'six cent cinquante et un',
    652: 'six cent cinquante-deux',
    653: 'six cent cinquante-trois',
    654: 'six cent cinquante-quatre',
    655: 'six cent cinquante-cinq',
    656: 'six cent cinquante-six',
    657: 'six cent cinquante-sept',
    658: 'six cent cinquante-huit',
    659: 'six cent cinquante-neuf',
    660: 'six cent soixante',
    661: 'six cent soixante et un',
    662: 'six cent soixante-deux',
    663: 'six cent soixante-trois',
    664: 'six cent soixante-quatre',
    665: 'six cent soixante-cinq',
    666: 'six cent soixante-six',
    667: 'six cent soixante-sept',
    668: 'six cent soixante-huit',
    669: 'six cent soixante-neuf',
    670: 'six cent soixante-dix',
    671: 'six cent soixante et onze',
    672: 'six cent soixante-douze',
    673: 'six cent soixante-treize',
    674: 'six cent soixante-quatorze',
    675: 'six cent soixante-quinze',
    676: 'six cent soixante-seize',
    677: 'six cent soixante-dix-sept',
    678: 'six cent soixante-dix-huit',
    679: 'six cent soixante-dix-neuf',
    680: 'six cent quatre-vingts',
    681: 'six cent quatre-vingt-un',
    682: 'six cent quatre-vingt-deux',
    683: 'six cent quatre-vingt-trois',
    684: 'six cent quatre-vingt-quatre',
    685: 'six cent quatre-vingt-cinq',
    686: 'six cent quatre-vingt-six',
    687: 'six cent quatre-vingt-sept',
    688: 'six cent quatre-vingt-huit',
    689: 'six cent quatre-vingt-neuf',
    690: 'six cent quatre-vingt-dix',
    691: 'six cent quatre-vingt-onze',
    692: 'six cent quatre-vingt-douze',
    693: 'six cent quatre-vingt-treize',
    694: 'six cent quatre-vingt-quatorze',
    695: 'six cent quatre-vingt-quinze',
    696: 'six cent quatre-vingt-seize',
    697: 'six cent quatre-vingt-dix-sept',
    698: 'six cent quatre-vingt-dix-huit',
    699: 'six cent quatre-vingt-dix-neuf',
    700: 'sept cents',
    701: 'sept cent un',
    702: 'sept cent deux',
    703: 'sept cent trois',
    704: 'sept cent quatre',
    705: 'sept cent cinq',
    706: 'sept cent six',
    707: 'sept cent sept',
    708: 'sept cent huit',
    709: 'sept cent neuf',
    710: 'sept cent dix',
    711: 'sept cent onze',
    712: 'sept cent douze',
    713: 'sept cent treize',
    714: 'sept cent quatorze',
    715: 'sept cent quinze',
    716: 'sept cent seize',
    717: 'sept cent dix-sept',
    718: 'sept cent dix-huit',
    719: 'sept cent dix-neuf',
    720: 'sept cent vingt',
    721: 'sept cent vingt et un',
    722: 'sept cent vingt-deux',
    723: 'sept cent vingt-trois',
    724: 'sept cent vingt-quatre',
    725: 'sept cent vingt-cinq',
    726: 'sept cent vingt-six',
    727: 'sept cent vingt-sept',
    728: 'sept cent vingt-huit',
    729: 'sept cent vingt-neuf',
    730: 'sept cent trente',
    731: 'sept cent trente et un',
    732: 'sept cent trente-deux',
    733: 'sept cent trente-trois',
    734: 'sept cent trente-quatre',
    735: 'sept cent trente-cinq',
    736: 'sept cent trente-six',
    737: 'sept cent trente-sept',
    738: 'sept cent trente-huit',
    739: 'sept cent trente-neuf',
    740: 'sept cent quarante',
    741: 'sept cent quarante et un',
    742: 'sept cent quarante-deux',
    743: 'sept cent quarante-trois',
    744: 'sept cent quarante-quatre',
    745: 'sept cent quarante-cinq',
    746: 'sept cent quarante-six',
    747: 'sept cent quarante-sept',
    748: 'sept cent quarante-huit',
    749: 'sept cent quarante-neuf',
    750: 'sept cent cinquante',
    751: 'sept cent cinquante et un',
    752: 'sept cent cinquante-deux',
    753: 'sept cent cinquante-trois',
    754: 'sept cent cinquante-quatre',
    755: 'sept cent cinquante-cinq',
    756: 'sept cent cinquante-six',
    757: 'sept cent cinquante-sept',
    758: 'sept cent cinquante-huit',
    759: 'sept cent cinquante-neuf',
    760: 'sept cent soixante',
    761: 'sept cent soixante et un',
    762: 'sept cent soixante-deux',
    763: 'sept cent soixante-trois',
    764: 'sept cent soixante-quatre',
    765: 'sept cent soixante-cinq',
    766: 'sept cent soixante-six',
    767: 'sept cent soixante-sept',
    768: 'sept cent soixante-huit',
    769: 'sept cent soixante-neuf',
    770: 'sept cent soixante-dix',
    771: 'sept cent soixante et onze',
    772: 'sept cent soixante-douze',
    773: 'sept cent soixante-treize',
    774: 'sept cent soixante-quatorze',
    775: 'sept cent soixante-quinze',
    776: 'sept cent soixante-seize',
    777: 'sept cent soixante-dix-sept',
    778: 'sept cent soixante-dix-huit',
    779: 'sept cent soixante-dix-neuf',
    780: 'sept cent quatre-vingts',
    781: 'sept cent quatre-vingt-un',
    782: 'sept cent quatre-vingt-deux',
    783: 'sept cent quatre-vingt-trois',
    784: 'sept cent quatre-vingt-quatre',
    785: 'sept cent quatre-vingt-cinq',
    786: 'sept cent quatre-vingt-six',
    787: 'sept cent quatre-vingt-sept',
    788: 'sept cent quatre-vingt-huit',
    789: 'sept cent quatre-vingt-neuf',
    790: 'sept cent quatre-vingt-dix',
    791: 'sept cent quatre-vingt-onze',
    792: 'sept cent quatre-vingt-douze',
    793: 'sept cent quatre-vingt-treize',
    794: 'sept cent quatre-vingt-quatorze',
    795: 'sept cent quatre-vingt-quinze',
    796: 'sept cent quatre-vingt-seize',
    797: 'sept cent quatre-vingt-dix-sept',
    798: 'sept cent quatre-vingt-dix-huit',
    799: 'sept cent quatre-vingt-dix-neuf',
    800: 'huit cents',
    801: 'huit cent un',
    802: 'huit cent deux',
    803: 'huit cent trois',
    804: 'huit cent quatre',
    805: 'huit cent cinq',
    806: 'huit cent six',
    807: 'huit cent sept',
    808: 'huit cent huit',
    809: 'huit cent neuf',
    810: 'huit cent dix',
    811: 'huit cent onze',
    812: 'huit cent douze',
    813: 'huit cent treize',
    814: 'huit cent quatorze',
    815: 'huit cent quinze',
    816: 'huit cent seize',
    817: 'huit cent dix-sept',
    818: 'huit cent dix-huit',
    819: 'huit cent dix-neuf',
    820: 'huit cent vingt',
    821: 'huit cent vingt et un',
    822: 'huit cent vingt-deux',
    823: 'huit cent vingt-trois',
    824: 'huit cent vingt-quatre',
    825: 'huit cent vingt-cinq',
    826: 'huit cent vingt-six',
    827: 'huit cent vingt-sept',
    828: 'huit cent vingt-huit',
    829: 'huit cent vingt-neuf',
    830: 'huit cent trente',
    831: 'huit cent trente et un',
    832: 'huit cent trente-deux',
    833: 'huit cent trente-trois',
    834: 'huit cent trente-quatre',
    835: 'huit cent trente-cinq',
    836: 'huit cent trente-six',
    837: 'huit cent trente-sept',
    838: 'huit cent trente-huit',
    839: 'huit cent trente-neuf',
    840: 'huit cent quarante',
    841: 'huit cent quarante et un',
    842: 'huit cent quarante-deux',
    843: 'huit cent quarante-trois',
    844: 'huit cent quarante-quatre',
    845: 'huit cent quarante-cinq',
    846: 'huit cent quarante-six',
    847: 'huit cent quarante-sept',
    848: 'huit cent quarante-huit',
    849: 'huit cent quarante-neuf',
    850: 'huit cent cinquante',
    851: 'huit cent cinquante et un',
    852: 'huit cent cinquante-deux',
    853: 'huit cent cinquante-trois',
    854: 'huit cent cinquante-quatre',
    855: 'huit cent cinquante-cinq',
    856: 'huit cent cinquante-six',
    857: 'huit cent cinquante-sept',
    858: 'huit cent cinquante-huit',
    859: 'huit cent cinquante-neuf',
    860: 'huit cent soixante',
    861: 'huit cent soixante et un',
    862: 'huit cent soixante-deux',
    863: 'huit cent soixante-trois',
    864: 'huit cent soixante-quatre',
    865: 'huit cent soixante-cinq',
    866: 'huit cent soixante-six',
    867: 'huit cent soixante-sept',
    868: 'huit cent soixante-huit',
    869: 'huit cent soixante-neuf',
    870: 'huit cent soixante-dix',
    871: 'huit cent soixante et onze',
    872: 'huit cent soixante-douze',
    873: 'huit cent soixante-treize',
    874: 'huit cent soixante-quatorze',
    875: 'huit cent soixante-quinze',
    876: 'huit cent soixante-seize',
    877: 'huit cent soixante-dix-sept',
    878: 'huit cent soixante-dix-huit',
    879: 'huit cent soixante-dix-neuf',
    880: 'huit cent quatre-vingts',
    881: 'huit cent quatre-vingt-un',
    882: 'huit cent quatre-vingt-deux',
    883: 'huit cent quatre-vingt-trois',
    884: 'huit cent quatre-vingt-quatre',
    885: 'huit cent quatre-vingt-cinq',
    886: 'huit cent quatre-vingt-six',
    887: 'huit cent quatre-vingt-sept',
    888: 'huit cent quatre-vingt-huit',
    889: 'huit cent quatre-vingt-neuf',
    890: 'huit cent quatre-vingt-dix',
    891: 'huit cent quatre-vingt-onze',
    892: 'huit cent quatre-vingt-douze',
    893: 'huit cent quatre-vingt-treize',
    894: 'huit cent quatre-vingt-quatorze',
    895: 'huit cent quatre-vingt-quinze',
    896: 'huit cent quatre-vingt-seize',
    897: 'huit cent quatre-vingt-dix-sept',
    898: 'huit cent quatre-vingt-dix-huit',
    899: 'huit cent quatre-vingt-dix-neuf',
    900: 'neuf cents',
    901: 'neuf cent un',
    902: 'neuf cent deux',
    903: 'neuf cent trois',
    904: 'neuf cent quatre',
    905: 'neuf cent cinq',
    906: 'neuf cent six',
    907: 'neuf cent sept',
    908: 'neuf cent huit',
    909: 'neuf cent neuf',
    910: 'neuf cent dix',
    911: 'neuf cent onze',
    912: 'neuf cent douze',
    913: 'neuf cent treize',
    914: 'neuf cent quatorze',
    915: 'neuf cent quinze',
    916: 'neuf cent seize',
    917: 'neuf cent dix-sept',
    918: 'neuf cent dix-huit',
    919: 'neuf cent dix-neuf',
    920: 'neuf cent vingt',
    921: 'neuf cent vingt et un',
    922: 'neuf cent vingt-deux',
    923: 'neuf cent vingt-trois',
    924: 'neuf cent vingt-quatre',
    925: 'neuf cent vingt-cinq',
    926: 'neuf cent vingt-six',
    927: 'neuf cent vingt-sept',
    928: 'neuf cent vingt-huit',
    929: 'neuf cent vingt-neuf',
    930: 'neuf cent trente',
    931: 'neuf cent trente et un',
    932: 'neuf cent trente-deux',
    933: 'neuf cent trente-trois',
    934: 'neuf cent trente-quatre',
    935: 'neuf cent trente-cinq',
    936: 'neuf cent trente-six',
    937: 'neuf cent trente-sept',
    938: 'neuf cent trente-huit',
    939: 'neuf cent trente-neuf',
    940: 'neuf cent quarante',
    941: 'neuf cent quarante et un',
    942: 'neuf cent quarante-deux',
    943: 'neuf cent quarante-trois',
    944: 'neuf cent quarante-quatre',
    945: 'neuf cent quarante-cinq',
    946: 'neuf cent quarante-six',
    947: 'neuf cent quarante-sept',
    948: 'neuf cent quarante-huit',
    949: 'neuf cent quarante-neuf',
    950: 'neuf cent cinquante',
    951: 'neuf cent cinquante et un',
    952: 'neuf cent cinquante-deux',
    953: 'neuf cent cinquante-trois',
    954: 'neuf cent cinquante-quatre',
    955: 'neuf cent cinquante-cinq',
    956: 'neuf cent cinquante-six',
    957: 'neuf cent cinquante-sept',
    958: 'neuf cent cinquante-huit',
    959: 'neuf cent cinquante-neuf',
    960: 'neuf cent soixante',
    961: 'neuf cent soixante et un',
    962: 'neuf cent soixante-deux',
    963: 'neuf cent soixante-trois',
    964: 'neuf cent soixante-quatre',
    965: 'neuf cent soixante-cinq',
    966: 'neuf cent soixante-six',
    967: 'neuf cent soixante-sept',
    968: 'neuf cent soixante-huit',
    969: 'neuf cent soixante-neuf',
    970: 'neuf cent soixante-dix',
    971: 'neuf cent soixante et onze',
    972: 'neuf cent soixante-douze',
    973: 'neuf cent soixante-treize',
    974: 'neuf cent soixante-quatorze',
    975: 'neuf cent soixante-quinze',
    976: 'neuf cent soixante-seize',
    977: 'neuf cent soixante-dix-sept',
    978: 'neuf cent soixante-dix-huit',
    979: 'neuf cent soixante-dix-neuf',
    980: 'neuf cent quatre-vingts',
    981: 'neuf cent quatre-vingt-un',
    982: 'neuf cent quatre-vingt-deux',
    983: 'neuf cent quatre-vingt-trois',
    984: 'neuf cent quatre-vingt-quatre',
    985: 'neuf cent quatre-vingt-cinq',
    986: 'neuf cent quatre-vingt-six',
    987: 'neuf cent quatre-vingt-sept',
    988: 'neuf cent quatre-vingt-huit',
    989: 'neuf cent quatre-vingt-neuf',
    990: 'neuf cent quatre-vingt-dix',
    991: 'neuf cent quatre-vingt-onze',
    992: 'neuf cent quatre-vingt-douze',
    993: 'neuf cent quatre-vingt-treize',
    994: 'neuf cent quatre-vingt-quatorze',
    995: 'neuf cent quatre-vingt-quinze',
    996: 'neuf cent quatre-vingt-seize',
    997: 'neuf cent quatre-vingt-dix-sept',
    998: 'neuf cent quatre-vingt-dix-huit',
    999: 'neuf cent quatre-vingt-dix-neuf'
  }

  const nbString = nb.toString()
  let classeDesMilliards = ''
  if (nbString.substring(nbString.length - 12, nbString.length - 9).length > 0) {
    classeDesMilliards = dictionnaire[nbString.substring(nbString.length - 12, nbString.length - 9).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
  }
  let classeDesMillions = ''
  if (nbString.substring(nbString.length - 9, nbString.length - 6).length > 0) {
    classeDesMillions = dictionnaire[nbString.substring(nbString.length - 9, nbString.length - 6).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
  }
  let classeDesMilliers = ''
  if (nbString.substring(nbString.length - 6, nbString.length - 3) === '080' || nbString.substring(nbString.length - 6, nbString.length - 3) === '80') {
    classeDesMilliers = 'quatre-vingt'
  } else if (nbString.substring(nbString.length - 5, nbString.length - 3) === '00' && nbString.substring(nbString.length - 6, nbString.length - 5) !== '1') {
    classeDesMilliers = dictionnaire[nbString.substring(nbString.length - 6, nbString.length - 3).replace(/^0{1,2}/, '')].replaceAll(' ', '-').replace('cents', 'cent')
  } else if (nbString.substring(nbString.length - 6, nbString.length - 3).length > 0) {
    classeDesMilliers = dictionnaire[nbString.substring(nbString.length - 6, nbString.length - 3).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
  }
  let classeDesUnites = ''
  if (nbString.substring(nbString.length - 3, nbString.length).length > 0) {
    classeDesUnites = dictionnaire[nbString.substring(nbString.length - 3, nbString.length).replace(/^0{1,2}/, '')].replaceAll(' ', '-')
  }
  let result = ''
  if (classeDesMilliards.length > 1) {
    classeDesMilliards === 'un' ? result += classeDesMilliards + '-milliard' : result += classeDesMilliards + '-milliards'
    if (classeDesMillions !== 'zéro' || classeDesMilliers !== 'zéro' || classeDesUnites !== 'zéro') {
      result += '-'
    }
  }
  if (classeDesMillions.length > 1 && classeDesMillions !== 'zéro') {
    classeDesMillions === 'un' ? result += classeDesMillions + '-million' : result += classeDesMillions + '-millions'
    if (classeDesMilliers !== 'zéro' || classeDesUnites !== 'zéro') {
      result += '-'
    }
  }
  if (classeDesMilliers.length > 1 && classeDesMilliers !== 'zéro') {
    classeDesMilliers === 'un' ? result += 'mille' : result += classeDesMilliers + '-mille'
    if (classeDesUnites !== 'zéro') {
      result += '-'
    }
  }
  if (classeDesUnites.length > 1 && classeDesUnites !== 'zéro') {
    result += classeDesUnites
  }
  result = result.replace('deux-cents-mille', 'deux-cent-mille')
  result = result.replace('trois-cents-mille', 'trois-cent-mille')
  result = result.replace('quatre-cents-mille', 'quatre-cent-mille')
  result = result.replace('cinq-cents-mille', 'cinq-cent-mille')
  result = result.replace('six-cents-mille', 'six-cent-mille')
  result = result.replace('sept-cents-mille', 'sept-cent-mille')
  result = result.replace('huit-cents-mille', 'huit-cent-mille')
  result = result.replace('neuf-cents-mille', 'neuf-cent-mille')
  return result
}

/**
 * @author Jean-Claude Lhote
 * @param {number} min Valeur minimum pour la solution
 * @param {number} max Valeur maximum pour la solution
 * Cette fonction produit aléatoirement un tirage de 5 nombres, une solution, un tableau contenant les calculs successifs, une chaine contenant l'expression mathador correspondante
 * @returns {array} [tirage=[a,b,c,d,e],solution (compris entre min et max),operationsSuccessives=[string1,string2,string3,string4,string5],expression]
 * les string1 à 5 ainsi que l'expresion sont ) mettre en mode maths.
 * sert dans les exercices CM019,
 */
export function TrouverSolutionMathador (
  min,
  max,
  A = 1,
  B = 4,
  C = 8,
  D = 3,
  E = 5
) {
  let eureka
  let a
  let b
  let c
  let d
  let e
  let tirage
  let nombresRestants
  let operationsRestantes
  let expressionEnCoursF
  let expressionEnCoursD
  let op
  let part1f
  let part2f
  let part1d
  let part2d
  let operationsSuccessives = []
  let solution
  const listeChoix = [
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    6,
    6,
    6,
    6,
    7,
    7,
    8,
    8,
    8,
    8,
    9,
    9,
    9,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]
  eureka = false
  const nbDetermines = arguments.length - 2
  while (eureka === false) {
    tirage = []

    if (nbDetermines < 1) a = parseInt(choice(listeChoix))
    else a = A
    if (nbDetermines < 2) { b = parseInt(choice(listeChoix, [13, 14, 15, 16, 17, 18, 19, 20, a])) } else b = B
    if (nbDetermines < 3) {
      c = parseInt(
        choice(listeChoix, [12, 13, 14, 15, 16, 17, 18, 19, 20, a, b])
      )
    } else c = C
    if (nbDetermines < 4) {
      d = parseInt(
        choice(listeChoix, [12, 13, 14, 15, 16, 17, 18, 19, 20, b, c])
      )
    } else d = D
    if (nbDetermines < 5) { e = parseInt(choice(listeChoix, [12, 13, 14, 15, 16, 17, 18, 19, 20])) } else e = E
    tirage.push(a, b, c, d, e)
    nombresRestants = shuffle(tirage)
    operationsRestantes = ['\\times', '+', '-', '\\div']
    operationsRestantes = shuffle(operationsRestantes)
    expressionEnCoursF = [
      `${nombresRestants[0]}`,
      `${nombresRestants[1]}`,
      `${nombresRestants[2]}`,
      `${nombresRestants[3]}`,
      `${nombresRestants[4]}`
    ]
    expressionEnCoursD = [
      `${nombresRestants[0]}`,
      `${nombresRestants[1]}`,
      `${nombresRestants[2]}`,
      `${nombresRestants[3]}`,
      `${nombresRestants[4]}`
    ]

    while (nombresRestants.length > 1) {
      b = nombresRestants.pop()
      a = nombresRestants.pop()
      part2f = expressionEnCoursF.pop()
      part1f = expressionEnCoursF.pop()
      part2d = expressionEnCoursD.pop()
      part1d = expressionEnCoursD.pop()

      op = operationsRestantes.pop()
      if (op === '\\times') {
        c = a * b
        expressionEnCoursF.push(`${part1f}${op}${part2f}`)
        expressionEnCoursD.push(`${part1d}${op}${part2d}`)
        nombresRestants.push(c)
      } else if (op === '\\div') {
        if (a % b === 0) {
          c = a / b
          if (part1f[0] === '\\') {
            part1f = part1f.substring(6, part1f.length)
            part1f = part1f.substring(0, part1f.length - 7)
          }
          if (part2f[0] === '\\') {
            part2f = part2f.substring(6, part2f.length)
            part2f = part2f.substring(0, part2f.length - 7)
          }
          expressionEnCoursF.push(`\\dfrac{${part1f}}{${part2f}}`)
          expressionEnCoursD.push(`${part1d}${op}${part2d}`)
          nombresRestants.push(c)
        } else break
      } else if (op === '-') {
        if (a > b) {
          c = a - b
          expressionEnCoursF.push(
            `\\left(${part1f}${op}${part2f}\\right)`
          )
          expressionEnCoursD.push(
            `\\left(${part1d}${op}${part2d}\\right)`
          )
          nombresRestants.push(c)
        } else break
      } else if (op === '+') {
        c = a + b
        if (part2f.substring(0, 2) === '\\l') {
          part2f = part2f.substring(6, part2f.length)
          part2f = part2f.substring(0, part2f.length - 7)
        }
        expressionEnCoursF.push(`\\left(${part1f}${op}${part2f}\\right)`)
        if (part2d.substring(0, 2) === '\\l') {
          part2d = part2d.substring(6, part2d.length)
          part2d = part2d.substring(0, part2d.length - 7)
        }
        expressionEnCoursD.push(`\\left(${part1d}${op}${part2d}\\right)`)
        nombresRestants.push(c)
      }
      operationsSuccessives.push(`${a}` + op + `${b}=${c}`)
    }

    if (nombresRestants.length === 1 && operationsRestantes.length === 0) {
      solution = nombresRestants[0]
      if (solution >= min && solution <= max) {
        eureka = true
        if (
          expressionEnCoursF[0][0] === '\\' &&
          expressionEnCoursF[0][1] === 'l'
        ) {
          expressionEnCoursF[0] = expressionEnCoursF[0].substring(
            6,
            expressionEnCoursF[0].length
          )
          expressionEnCoursF[0] = expressionEnCoursF[0].substring(
            0,
            expressionEnCoursF[0].length - 7
          )
        }
        if (
          expressionEnCoursD[0][0] === '\\' &&
          expressionEnCoursD[0][1] === 'l'
        ) {
          expressionEnCoursD[0] = expressionEnCoursD[0].substring(
            6,
            expressionEnCoursD[0].length
          )
          expressionEnCoursD[0] = expressionEnCoursD[0].substring(
            0,
            expressionEnCoursD[0].length - 7
          )
        }
        return [
          tirage,
          solution,
          operationsSuccessives,
          expressionEnCoursF,
          expressionEnCoursD
        ]
      } else operationsSuccessives = []
    } else operationsSuccessives = []
  }
}

// Gestion du fichier à télécharger
export function telechargeFichier (text, filename) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()

  document.body.removeChild(element)
}

// Gestion des styles LaTeX

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX
* @param {string} Le titre de l'entête
* @author Rémi Angot
*/
export function introLatex (entete = 'Exercices', listePackages = '') {
  if (entete === '') { entete = 'Exercices' }
  return `\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
%\\usepackage[utf8]{inputenc}        
%\\usepackage[T1]{fontenc}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% EXIT WARNING DÛ À LA COMPILATION XETEX %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage{ifxetex}

\\ifxetex
  \\usepackage{fontspec}
\\else
  \\usepackage[T1]{fontenc}
  \\usepackage[utf8]{inputenc}
  \\usepackage{lmodern}
\\fi
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage[french]{babel}
\\usepackage{multicol} 
\\usepackage{calc} 
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}
\\usepackage{tabularx}
%\\usepackage[autolanguage]{numprint}
\\usepackage[autolanguage,np]{numprint}
\\usepackage{hyperref}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
%\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
\\usepackage{fancyhdr,lastpage}          
\\pagestyle{fancy}                      
\\usepackage{fancybox}
\\usepackage{setspace}
\\usepackage{colortbl}
\\usepackage{xcolor}
  \\definecolor{nombres}{cmyk}{0,.8,.95,0}
  \\definecolor{gestion}{cmyk}{.75,1,.11,.12}
  \\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
  \\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
  \\definecolor{geo}{cmyk}{.62,.1,0,0}
  \\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{pgf,tikz}
\\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}


\\setlength{\\parindent}{0mm}
\\renewcommand{\\arraystretch}{1.5}
\\newcounter{exo}          
\\setcounter{exo}{0}   
\\newcommand{\\exo}[1]{
  \\stepcounter{exo}        
  \\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
}
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
\\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
\\setlength{\\fboxsep}{3mm}
\\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
\\fancyhead[C]{\\textbf{${entete}}}
\\fancyfoot{}
\\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
\\setlength{\\headheight}{14.5pt}

${preambulePersonnalise(listePackages)}


\\begin{document}

`
}
/**
* Renvoie un texte avec le préambule d'un fichier LaTeX
* @param {string} Le titre de l'entête
* @author Rémi Angot
*/
export function introLatexCan (entete = 'Course aux nombres', listePackages = '') {
  if (entete === '') { entete = 'Course aux nombres' }
  return `\\documentclass[12pt, landscape]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
%\\usepackage[utf8]{inputenc}        
%\\usepackage[T1]{fontenc}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% EXIT WARNING DÛ À LA COMPILATION XETEX %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage{ifxetex}

\\ifxetex
  \\usepackage{fontspec}
\\else
  \\usepackage[T1]{fontenc}
  \\usepackage[utf8]{inputenc}
  \\usepackage{lmodern}
\\fi
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage[french]{babel}
\\usepackage{multicol} 
\\usepackage{calc} 
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}
\\usepackage{tabularx}
%\\usepackage[autolanguage]{numprint}
\\usepackage[autolanguage,np]{numprint}
\\usepackage{hyperref}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
%\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
\\usepackage{fancyhdr,lastpage}          
\\pagestyle{fancy}                      
\\usepackage{fancybox}
\\usepackage{setspace}
\\usepackage{colortbl}
\\usepackage{xcolor}
  \\definecolor{nombres}{cmyk}{0,.8,.95,0}
  \\definecolor{gestion}{cmyk}{.75,1,.11,.12}
  \\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
  \\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
  \\definecolor{geo}{cmyk}{.62,.1,0,0}
  \\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{pgf,tikz}
\\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}


\\setlength{\\parindent}{0mm}
\\renewcommand{\\arraystretch}{1.5}
\\newcounter{exo}          
\\setcounter{exo}{0}   
\\newcommand{\\exo}[1]{
  \\stepcounter{exo}        
  \\subsection*{Exercice \\no{\\theexo} \\textmd{\\normalsize #1}}
}
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
\\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
\\setlength{\\fboxsep}{3mm}
\\newenvironment{correction}{\\newpage\\fancyhead[C]{\\textbf{Correction}}\\setcounter{exo}{0}}{}
\\fancyhead[C]{}
\\fancyfoot{}
\\fancyfoot[R]{\\scriptsize Coopmaths.fr -- CC-BY-SA}
\\setlength{\\headheight}{14.5pt}

\\fancypagestyle{premierePage}
{
  \\fancyhead[C]{\\textbf{${entete}}}

}
${preambulePersonnalise(listePackages)}


\\begin{document}
\\thispagestyle{premierePage}

`
}

/**
* Renvoie un texte avec le préambule d'un fichier LaTeX avec le style CoopMaths
* @author Rémi Angot
*/
export function introLatexCoop (listePackages) {
  const introLatexCoop = `\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=4cm,bottom=2cm]{geometry}
%\\usepackage[utf8]{inputenc}        
%\\usepackage[T1]{fontenc}
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% EXIT WARNING DÛ À LA COMPILATION XETEX %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage{ifxetex}

\\ifxetex
  \\usepackage{fontspec}
\\else
  \\usepackage[T1]{fontenc}
  \\usepackage[utf8]{inputenc}
  \\usepackage{lmodern}
\\fi
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\usepackage[french]{babel}
\\usepackage{hyperref}
\\usepackage{multicol} 
\\usepackage{calc} 
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}
\\usepackage{tabularx}
%\\usepackage[autolanguage]{numprint}
\\usepackage[autolanguage,np]{numprint}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
%\\DeclareUnicodeCharacter{20AC}{\\euro{}} %Incompatible avec XeLaTeX
\\usepackage{fancyhdr,lastpage}          
\\pagestyle{fancy}                      
\\usepackage{fancybox}
\\usepackage{setspace}
\\usepackage{xcolor}
\\usepackage{pgf,tikz} % Pour les images et figures gÃ©omÃ©triques
\\usetikzlibrary{babel,arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows}

\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\fancyhead[L]{}
\\fancyhead[R]{}

%%% COULEURS %%%

\\definecolor{nombres}{cmyk}{0,.8,.95,0}
\\definecolor{gestion}{cmyk}{.75,1,.11,.12}
\\definecolor{gestionbis}{cmyk}{.75,1,.11,.12}
\\definecolor{grandeurs}{cmyk}{.02,.44,1,0}
\\definecolor{geo}{cmyk}{.62,.1,0,0}
\\definecolor{algo}{cmyk}{.69,.02,.36,0}
\\definecolor{correction}{cmyk}{.63,.23,.93,.06}
\\usepackage{colortbl}
\\arrayrulecolor{couleur_theme} % Couleur des filets des tableaux

%%% MISE EN PAGE %%%

\\setlength{\\parindent}{0mm}
\\renewcommand{\\arraystretch}{1.5}
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
\\setlength{\\fboxsep}{3mm}

\\setlength{\\headheight}{14.5pt}

\\spaceskip=2\\fontdimen2\\font plus 3\\fontdimen3\\font minus3\\fontdimen4\\font\\relax %Pour doubler l'espace entre les mots
\\newcommand{\\numb}[1]{ % Dessin autour du numéro d'exercice
\\begin{tikzpicture}[overlay,yshift=-.3cm,scale=.8]
\\draw[fill=couleur_numerotation,couleur_numerotation](-.3,0)rectangle(.5,.8);
\\draw[line width=.05cm,couleur_numerotation,fill=white] (0,0)--(.5,.5)--(1,0)--(.5,-.5)--cycle;
\\node[couleur_numerotation]  at (.5,0) { \\large \\bfseries #1};
\\draw (-.4,.8) node[white,anchor=north west]{\\bfseries EX}; 
\\end{tikzpicture}
}

%%% NUMEROS DES EXERCICES %%%

\\usepackage{titlesec} % Le titre de section est un numéro d'exercice avec sa consigne alignée à gauche.
\\titleformat{\\section}{}{\\numb{\\arabic{section}}}{1cm}{\\hspace{0em}}{}
\\newcommand{\\exo}[1]{ % Un exercice est une nouvelle section avec la consigne écrite en caractêres normaux
  \\section{\\textmd{#1}}
  \\medskip
}


%%% ENVIRONNEMENTS - CADRES %%%
\\usepackage[framemethod=tikz]{mdframed}

\\newmdenv[linecolor=couleur_theme, linewidth=3pt,topline=true,rightline=false,bottomline=false,frametitlerule=false,frametitlefont={\\color{couleur_theme}\\bfseries},frametitlerulewidth=1pt]{methode}


\\newmdenv[startcode={\\setlength{\\multicolsep}{0cm}\\setlength{\\columnsep}{.2cm}\\setlength{\\columnseprule}{0pt}\\vspace{0cm}},linecolor=white, linewidth=3pt,innerbottommargin=10pt,innertopmargin=5pt,innerrightmargin=20pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,tikzsetting={draw=couleur_theme,line width=4pt,dashed,dash pattern= on 10pt off 10pt},frametitleaboveskip=-.6cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\textcolor{couleur_theme}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Objectifs}};}]{objectif}

\\newmdenv[startcode={\\colorlet{couleur_numerotation}{correction}\\renewcommand{\\columnseprulecolor}{\\color{correction}}
\\setcounter{section}{0}\\arrayrulecolor{correction}},linecolor=white, linewidth=4pt,innerbottommargin=10pt,innertopmargin=5pt,splittopskip=20pt,splitbottomskip=10pt,everyline=true,frametitle=correction,tikzsetting={draw=correction,line width=3pt,dashed,dash pattern= on 15pt off 10pt},frametitleaboveskip=-.4cm,frametitle={\\tikz\\node[anchor= east,rectangle,fill=white]{\\; \\textcolor{correction}{\\raisebox{-.3\\height}{}\\; \\bfseries \\Large Corrections}};}]{correction}

\\newmdenv[roundcorner=0,linewidth=0pt,frametitlerule=false, backgroundcolor=gray!40,leftmargin=8cm]{remarque}

% echelle pour le dé
\\def \\globalscale {0.04}
% abscisse initiale pour les chevrons
\\def \\xini {3}

\\newcommand{\\theme}[4]
{
  %\\theme{nombres|gestion|grandeurs|geo|algo}{Texte (entrainement, évaluation, mise en route...}{numéro de version ou vide}{titre du thême et niveau}
  \\fancyhead[C]{
    %Tracé du dé
    \\begin{tikzpicture}[y=0.80pt, x=0.80pt, yscale=-\\globalscale, xscale=\\globalscale,remember picture, overlay, shift={(current page.north west)},xshift=17cm,yshift=9.5cm,fill=couleur_theme]
      %%%%Arc supérieur gauche%%%%
      \\path[fill](523,1424)..controls(474,1413)and(404,1372)..(362,1333)..controls(322,1295)and(313,1272)..(331,1254)..controls(348,1236)and(369,1245)..(410,1283)..controls(458,1328)and(517,1356)..(575,1362)..controls(635,1368)and(646,1375)..(643,1404)..controls(641,1428)and(641,1428)..(596,1430)..controls(571,1431)and(538,1428)..(523,1424)--cycle;
      %%%%Dé face supérieur%%%%
      \\path[fill](512,1272)..controls(490,1260)and(195,878)..(195,861)..controls(195,854)and(198,846)..(202,843)..controls(210,838)and(677,772)..(707,772)..controls(720,772)and(737,781)..(753,796)..controls(792,833)and(1057,1179)..(1057,1193)..controls(1057,1200)and(1053,1209)..(1048,1212)..controls(1038,1220)and(590,1283)..(551,1282)..controls(539,1282)and(521,1278)..(512,1272)--cycle;
      %%%%Dé faces gauche et droite%%%%
      \\path[fill](1061,1167)..controls(1050,1158)and(978,1068)..(900,967)..controls(792,829)and(756,777)..(753,756)--(748,729)--(724,745)..controls(704,759)and(660,767)..(456,794)..controls(322,813)and(207,825)..(200,822)..controls(193,820)and(187,812)..(187,804)..controls(188,797)and(229,688)..(279,563)..controls(349,390)and(376,331)..(391,320)..controls(406,309)and(462,299)..(649,273)..controls(780,254)and(897,240)..(907,241)..controls(918,243)and(927,249)..(928,256)..controls(930,264)and(912,315)..(889,372)..controls(866,429)and(848,476)..(849,477)..controls(851,479)and(872,432)..(897,373)..controls(936,276)and(942,266)..(960,266)..controls(975,266)and(999,292)..(1089,408)..controls(1281,654)and(1290,666)..(1290,691)..controls(1290,720)and(1104,1175)..(1090,1180)..controls(1085,1182)and (1071,1176)..(1061,1167)--cycle;
      %%%%Arc inférieur bas%%%%
      \\path[fill](1329,861)..controls(1316,848)and(1317,844)..(1339,788)..controls(1364,726)and(1367,654)..(1347,591)..controls(1330,539)and(1338,522)..(1375,526)..controls(1395,528)and(1400,533)..(1412,566)..controls(1432,624)and(1426,760)..(1401,821)..controls(1386,861)and(1380,866)..(1361,868)..controls(1348,870)and(1334,866)..(1329,861)--cycle;
      %%%%Arc inférieur gauche%%%%
      \\path[fill](196,373)..controls(181,358)and(186,335)..(213,294)..controls(252,237)and(304,190)..(363,161)..controls(435,124)and(472,127)..(472,170)..controls(472,183)and(462,192)..(414,213)..controls(350,243)and(303,283)..(264,343)..controls(239,383)and(216,393)..(196,373)--cycle;
    \\end{tikzpicture}
    \\begin{tikzpicture}[remember picture,overlay]
      \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
      \\node[anchor=east, fill=white] at ($(current page.north east)+(-18.8,-2.3cm)$) {\\footnotesize \\bfseries{MathALEA}};
      \\end{tikzpicture}
    \\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay, shift={(current page.north west)},yshift=-8.5cm]
      \\fill[fill=couleur_theme] (0,5) rectangle (21,6);
      \\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
      \\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
      \\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;   
      \\node[color=white] at (10.5,5.5) {\\LARGE \\bfseries{ \\MakeUppercase{ #4}}};
    \\end{tikzpicture}
    \\begin{tikzpicture}[remember picture,overlay]
      \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(0,-.8cm)$) {};
      \\node[anchor=east, fill=white] at ($(current page.north east)+(-2,-1.5cm)$) {\\Huge \\textcolor{couleur_theme}{\\bfseries{\\#}} \\bfseries{#2} \\textcolor{couleur_theme}{\\bfseries \\MakeUppercase{#3}}};
    \\end{tikzpicture}
  }
  \\fancyfoot[R]{
    %\\scriptsize Coopmaths.fr -- CC-BY-SA
    \\begin{tikzpicture}[remember picture,overlay]
        \\node[anchor=south east] at ($(current page.south east)+(-2,0.25cm)$) {\\scriptsize {\\bfseries \\href{https://coopmaths.fr/}{Coopmaths.fr} -- \\href{http://creativecommons.fr/licences/}{CC-BY-SA}}};
      \\end{tikzpicture}
    \\begin{tikzpicture}[line cap=round,line join=round,remember picture, overlay,xscale=0.5,yscale=0.5, shift={(current page.south west)},xshift=35.7cm,yshift=-6cm]
      \\fill[fill=couleur_theme] (\\xini,6)--(\\xini+1.5,6)--(\\xini+2.5,7)--(\\xini+1.5,8)--(\\xini,8)--(\\xini+1,7)-- cycle;
      \\fill[fill=couleur_theme] (\\xini+2,6)--(\\xini+2.5,6)--(\\xini+3.5,7)--(\\xini+2.5,8)--(\\xini+2,8)--(\\xini+3,7)-- cycle;  
      \\fill[fill=couleur_theme] (\\xini+3,6)--(\\xini+3.5,6)--(\\xini+4.5,7)--(\\xini+3.5,8)--(\\xini+3,8)--(\\xini+4,7)-- cycle;  
    \\end{tikzpicture}
  }
  \\fancyfoot[C]{}
  \\colorlet{couleur_theme}{#1}
  \\colorlet{couleur_numerotation}{couleur_theme}
  \\def\\iconeobjectif{icone-objectif-#1}
  \\def\\urliconeomethode{icone-methode-#1}
}

\\newcommand{\\version}[1]{
  \\fancyhead[R]{
    \\begin{tikzpicture}[remember picture,overlay]
    \\node[anchor=north east,inner sep=0pt] at ($(current page.north east)+(-.5,-.5cm)$) {\\large \\textcolor{couleur_theme}{\\bfseries V#1}};
    \\end{tikzpicture}
  }
}

${preambulePersonnalise(listePackages)}

%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin du préambule %%%
%%%%%%%%%%%%%%%%%%%%%%%%
    

`
  return introLatexCoop
}

export function preambulePersonnalise (listePackages) {
  let result = ''
  for (const packages of listePackages) {
    switch (packages) {
      case 'axe_gradues':
        result += `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% Gestion des axes gradués (Olivier Lacroix) %%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\usepackage{xparse}
\\usepackage{ifthen}
\\usepackage{xargs}

\\newboolean{demiDroite}
\\newboolean{affichePointilles}
\\newboolean{affichePoint}
\\newboolean{afficheGraduations}

\\makeatletter
\\newtoks\\@tabtoks
\\providecommand\\addtabtoks[1]{\\@tabtoks\\expandafter{\\the\\@tabtoks#1}}
\\providecommand*\\resettabtoks{\\@tabtoks{}}
\\providecommand*\\printtabtoks{\\the\\@tabtoks}
\\makeatother

\\DeclareDocumentCommand \\placePoints%
{ > { \\SplitList { | } } m }%
{\\ProcessList {#1} {\\mycommand}}

\\newcommand{\\mycommand}[1]{
\\def\\temp{#1}
\\expandafter\\placePointsDeuxArg\\temp
}

\\def\\placePointsDeuxArg#1,#2{\\draw (#1,0) node{\\Large $\\times$} node[above=.2] {\\ensuremath{#2}};}




\\newcommandx{\\axeGradueFraction}[5][5=]{
\\begin{tikzpicture}[xscale=#4,>=latex]
  \\def\\Xmin{#1} 
  \\def\\Xmax{#2} 
  \\def\\Decoupage{#3}
  
  \\ifthenelse { \\equal {#5} {} }
  {%pas d'argument optionnel, on trace juste l'axe ci-dessous
  }
  {% un nombre est Ã placer sur l'axe avec son label
    \\placePoints{#5}
    %\\draw (#5,-.08) -- (#5,.08) node[above] {#6};
  }


    
  % Xfleche de l'axe
  \\pgfmathparse{\\Xmax+0.2}\\let\\Xfleche\\pgfmathresult;
  % dÃ©but du segment reprÃ©sentant l'axe numÃ©ro 1
  \\ifthenelse{\\equal{\\Xmin}{0}}
  {
    \\def\\Xorigine{\\Xmin} 
  }
  {
    \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
    % pour la dÃ©co :
    \\draw (\\Xmin-1/\\Decoupage,-.05) -- (\\Xmin-1/\\Decoupage,.05);
  }
  \\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
  % construction de la droite
  \\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
  \\foreach \\x in {\\Xmin,...,\\XmaxMoinsUn}{
      \\draw (\\x,-.1) -- (\\x,.1) node[below=.3] {\\x};
      \\foreach \\y in {1,...,\\Decoupage}{
        \\pgfmathparse{\\x+\\y/\\Decoupage}\\let\\Xgrad\\pgfmathresult;
        \\draw (\\Xgrad,-.05) -- (\\Xgrad,.05);
      }
  };
  % derniÃ¨re graduation Ã la mano 
  \\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[below=.3] {\\Xmax};

\\end{tikzpicture}
}



\\newcommand{\\axesZoom}[5]{
{} \\hfill 
\\begin{tikzpicture}
  \\def\\XA{#1} % nombre (positif pour l'instant) Ã placer (avec deux dÃ©cimales)
  \\def\\Nom{#2} % nom du point Ã placer. Laisser vide si vous ne souhaitez pas voir le point
  \\def\\Xmin{#3} % premiÃ¨re valeur de x entiÃ¨re sur l'axe
  \\setboolean{affichePointilles}{true}  % affiche les pointillÃ©s indiquant le grossissement
  \\setboolean{affichePoint}{#4} % Est ce que le point doit apparaÃ®tre sur la construction. 
  \\setboolean{afficheGraduations}{#5} % Est ce que l'on gradue tous les axes ou seulement \\Xmin et \\Xmax sur le premier axe (si false)
  \\setboolean{demiDroite}{true} %Par dÃ©faut, on construit des demi-droites pour les 6Ã¨mes, si Xmin=0 ou si une des dÃ©cimales l'exige.
  
  \\ifthenelse{\\boolean{demiDroite}}
  {
    \\def\\DebordementAGauche{0} % mettre 0 pour une demi-droite graduÃ©e partant de l'origine
  }
  {
    \\def\\DebordementAGauche{0.5} % mettre 0.5 dans les autres cas.
  }
  
  \\pgfmathparse{int(\\Xmin+10)}\\let\\Xmax\\pgfmathresult; % Xmax vaut toujours Xmin+10
    
  \\pgfmathparse{int(\\XA)}\\let\\Unites\\pgfmathresult;
  \\pgfmathparse{int((\\XA-\\Unites)*10)}\\let\\Dixiemes\\pgfmathresult;
  \\pgfmathparse{int(round((\\XA-\\Unites.\\Dixiemes)*100))}\\let\\Centiemes\\pgfmathresult;

  \\pgfmathparse{int(\\Unites+1)}\\let\\UnitesMaj\\pgfmathresult;
  \\pgfmathparse{int(\\Dixiemes+1)}\\let\\DixiemesMaj\\pgfmathresult;
  \\pgfmathparse{int(\\Centiemes+1)}\\let\\CentiemesMaj\\pgfmathresult;

  \\pgfmathparse{\\Xmax+1}\\let\\Xfleche\\pgfmathresult;
  \\ifthenelse{\\equal{\\Xmin}{0}}
  {
    \\def\\Xorigine{\\Xmin} 
  }
  {
    \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
  }

  \\pgfmathparse{int(\\Xmax-1)}\\let\\XmaxMoinsUn\\pgfmathresult;
  \\pgfmathparse{int(\\Xmin+1)}\\let\\XminPlusUn\\pgfmathresult;
    
  \\draw[->,>=latex] (\\Xorigine,0) -- (\\Xfleche,0);
  \\foreach \\x in {\\XminPlusUn,...,\\XmaxMoinsUn}{
    \\ifthenelse{\\boolean{afficheGraduations}}
    {
      \\draw (\\x,-.1) -- (\\x,.1) node[above] {\\x};
    }
    {
      \\draw (\\x,-.1) -- (\\x,.1);
    }
  };
  \\foreach \\x in {1,...,9}{
    \\draw (\\Unites.\\x,-.05) -- (\\Unites.\\x,.05);
  }
  \\draw (\\Xmin,-.1) -- (\\Xmin,.1) node[above] {\\Xmin};
  \\draw (\\Xmax,-.1) -- (\\Xmax,.1) node[above] {\\Xmax};
  \\ifthenelse{\\not\\equal{\\Unites}{0}}
  {
    \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
  }{}
  \\draw[->,>=latex] (\\Xorigine,-2) -- (\\Xfleche,-2);
  \\foreach \\x in {1,...,9}{
    \\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
    \\ifthenelse{\\boolean{afficheGraduations}}
    {
      \\draw (\\X,-2.1) -- (\\X,-1.9) node[above] {\\Unites,\\x};
    }
    {
      \\draw (\\X,-2.1) -- (\\X,-1.9);
    }
    \\pgfmathparse{int(\\Dixiemes+\\Xmin)+\\x/10}\\let\\Xtirets\\pgfmathresult;
    \\draw (\\Xtirets,-2.05) -- (\\Xtirets,-1.95);
  };
  
  \\ifthenelse{\\boolean{afficheGraduations}}
  {
    \\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) node[above] {\\UnitesMaj};
    \\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) node[above] {\\Unites};
  }
  {
    \\draw (\\Xmax,-2.1) -- (\\Xmax,-1.9) ;
    \\draw (\\Xmin,-2.1) -- (\\Xmin,-1.9) ;
  }
  
  \\pgfmathparse{int(\\Dixiemes+\\Xmin)}\\let\\XGaucheAxeBis\\pgfmathresult;
  \\pgfmathparse{int(\\XGaucheAxeBis+1)}\\let\\XDroitAxeBis\\pgfmathresult;

  \\ifthenelse{\\boolean{affichePointilles}}
  {
  \\draw[dashed] (\\Unites,0) -- (\\Xmin,-2);
  \\draw[dashed] (\\UnitesMaj,0) -- (\\Xmax,-2);
  \\draw[dashed] (\\XGaucheAxeBis,-2) -- (\\Xmin,-4);
  \\draw[dashed] (\\XDroitAxeBis,-2) -- (\\Xmax,-4);
  }{}
  
  \\ifthenelse{\\not\\equal{\\Dixiemes}{0}}
  {
    \\pgfmathparse{\\Xmin-0.5}\\let\\Xorigine\\pgfmathresult;
  }{}
  \\draw[->,>=latex] (\\Xorigine,-4) -- (\\Xfleche,-4);
  \\foreach \\x in {1,...,9}{
    \\pgfmathparse{int(\\Xmin+\\x)}\\let\\X\\pgfmathresult;
    \\ifthenelse{\\boolean{afficheGraduations}}
      {
      \\draw (\\X,-4.1) -- (\\X,-3.9) node[above] {\\Unites,\\Dixiemes\\x};
      }
      {
      \\draw (\\X,-4.1) -- (\\X,-3.9) ;
      }
    };

  
\\ifthenelse{\\boolean{afficheGraduations}}
  {
  \\ifthenelse{\\equal{\\Dixiemes}{9}}
    {
    \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\UnitesMaj};
    }
    {
    \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) node[above] {\\Unites,\\DixiemesMaj};
    }
  
  \\ifthenelse{\\equal{\\Dixiemes}{0}}
    {
    \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites};
    }
    {
    \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) node[above] {\\Unites,\\Dixiemes};
    }
  }
  {
  \\ifthenelse{\\equal{\\Dixiemes}{9}}
    {
    \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9);
    }
    {
    \\draw (\\Xmax,-4.1) -- (\\Xmax,-3.9) ;
    }
  
  \\ifthenelse{\\equal{\\Dixiemes}{0}}
    {
    \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;
    }
    {
    \\draw (\\Xmin,-4.1) -- (\\Xmin,-3.9) ;
    }
  \\pgfmathparse{int(\\Centiemes+\\Xmin)}\\let\\XGaucheAxeTer\\pgfmathresult;
  \\draw (\\XGaucheAxeTer,-4) node[below] {\\Nom};
  }
  
  \\ifthenelse{\\boolean{affichePoint}}
  {
    \\draw (\\XA,0) node{\\Large $\\times$} node[below] {\\Nom};
    \\draw (\\XGaucheAxeBis.\\Centiemes,-2) node{\\Large $\\times$} node[below] {\\Nom};
  }{}
\\end{tikzpicture}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%% Fin de la gestion des axes gradués %%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

}

`
        break
      case 'bclogo':
        result += '\\usepackage[tikz]{bclogo}'
        break
      case 'tkz-euclide':
        result += '\\usepackage{tkz-euclide}'
        break
      case 'bac':
      case 'crpe':
      case 'dnb':
      case 'e3c':
        // result += `
        // \\usepackage{fourier}
        // \\usepackage[scaled=0.875]{helvet}
        // \\renewcommand{\\ttdefault}{lmtt}
        // \\usepackage[normalem]{ulem}
        // \\usepackage{diagbox}
        // \\usepackage{fancybox}
        // \\usepackage{booktabs}
        // \\usepackage{pifont}
        // \\usepackage{multirow}
        // \\usepackage{dcolumn}
        // \\usepackage{lscape}
        // \\usepackage{graphics,graphicx}
        // \\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
        // \\usepackage{scratch}
        // \\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
        // \\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
        // \\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
        // \\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
        // \\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
        // \\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
        // \\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
        // \\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
        // `
        result += `
        %%%%% FONTS %%%%%
        %\\usepackage{fourier}
        \\usepackage{fourier-otf} % car compilation avec xetex
        \\usepackage[scaled=0.875]{helvet}
        \\renewcommand{\\ttdefault}{lmtt}
        \\usepackage{pifont} % symboles
        
        %%%%% MISE EN PAGE %%%%%
        \\usepackage{makeidx}
        \\usepackage{lscape} % format paysage
        
        %%%%% MISE EN FORME %%%%%
        \\usepackage[normalem]{ulem} % souligner
        \\usepackage{booktabs} % tableaux de qualité
        %\\usepackage[dvips]{hyperref} % hyperlien pour le passage par la compilation dvips
        
        %%%%% MATHS %%%%%
        \\usepackage{diagbox} % des diagonales dans une cellule de tableau
        \\usepackage{multirow} % fusionner plusieurs lignes de tableau
        \\usepackage{dcolumn} % aligner des décimaux dans un tableau
        %\\usepackage{marvosym}   %c'est pour le symbole euro : code \\EUR{}
        %\\usepackage[np]{numprint} % affichage formaté des nombres
        
        %%%%%%% SCRATCH %%%%%%%
        % Par défaut pour les anciens sujets c'est le package scratch qui est chargé
        % Les packages scratch et scratch3 sont incompatibles
        % Il convient donc de commenter l'un d'eux selon les besoins
        %
        % à noter que le package scratch3 requiert simplekv et tikz qui sont automatiquement chargés en cas de besoin
        \\usepackage{scratch}
        %\\usepackage{scratch3} 
        
        %%%%% FIGURES %%%%%
        \\usepackage{graphics} % à distinguer du package graphicx
        \\usepackage{framed} % decoration background
        
        %%%%%%% PSTRICKS %%%%%%%
        \\usepackage{pstricks,pst-plot,pst-tree,pstricks-add}
        \\usepackage{pst-eucl}  % permet de faire des dessins de géométrie simplement
        \\usepackage{pst-text}
        \\usepackage{pst-node,pst-all}
        \\usepackage{pst-func,pst-math,pst-bspline,pst-3dplot}  %%% POUR LE BAC %%%
        
        %%%%%%% TIKZ %%%%%%%
        \\usepackage{tkz-tab,tkz-fct}
        \\usepackage{tkz-euclide}
        \\usepackage[tikz]{bclogo}
        \\usetikzlibrary{shadows,decorations.markings}
        \\usetikzlibrary{decorations.pathreplacing}
        %\\usepackage{tikz} % arbre en proba
        %\\usetikzlibrary{trees} % arbre en proba
        \\usepackage{forest} % arbre en proba
        
        %%%%%%% TRACÉS FONNCTIONS %%%%%%%
        \\usepackage{pgfplots}
        \\pgfplotsset{compat=1.17}
        
        %%%%% PROGRAMMATION %%%%%
        \\usepackage{xkeyval,ifthen}
        
        
        %%%%% COMMANDES SPRECIFIQUES %%%%%
        \\usepackage{esvect} %%% POUR LE BAC %%%
        \\newcommand{\\vvt}[1]{\\vv{\\text{#1}}} %%% POUR LE BAC %%%
        \\newcommand{\\vectt}[1]{\\overrightarrow{\\,\\mathstrut\\text{#1}\\,}} %%% POUR LE BAC %%%

        \\newcommand{\\textding}[1]{\\text{\\ding{#1}}}
        %\\newcommand{\\euro}{\\eurologo{}}
        \\renewcommand{\\pstEllipse}[5][]{% arc d'ellipse pour le sujet de Polynésie septembre 2013
        \\psset{#1}
        \\parametricplot{#4}{#5}{#2\\space t cos mul #3\\space t sin mul}
        }
        
        %%%%%%% NOTATIONS DES ENSEMBLES %%%%%%%
        \\newcommand{\\R}{\\mathbb{R}}
        \\newcommand{\\N}{\\mathbb{N}}
        \\newcommand{\\D}{\\mathbb{D}}
        \\newcommand{\\Z}{\\mathbb{Z}}
        \\newcommand{\\Q}{\\mathbb{Q}}
        %\\newcommand{\\C}{\\mathbb{C}}
        
        %%%%% TRACÉS DANS UN REPÈRE %%%%%
        \\newcommand{\\vect}[1]{\\overrightarrow{\\,\\mathstrut#1\\,}}
        \\def\\Oij{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath}\\right)$}
        \\def\\Oijk{$\\left(\\text{O}~;~\\vect{\\imath},~\\vect{\\jmath},~\\vect{k}\\right)$}
        \\def\\Ouv{$\\left(\\text{O}~;~\\vect{u},~\\vect{v}\\right)$}
        
        \\newcommand{\\e}{\\mathrm{\\,e\\,}} %%% POUR LE BAC %%% le e de l'exponentielle
        \\newcommand{\\ds}{\\displaystyle} %%% POUR LE BAC %%%

        %%%%% PROBABILITÉS %%%%%
        % Structure servant à avoir l'événement et la probabilité.
        \\def\\getEvene#1/#2\\endget{$#1$}
        \\def\\getProba#1/#2\\endget{$#2$}
        
        %%%%% NOMBRES PREMIERS %%%%%
        \\input{xlop} % JM pour les opérations
        %%% Table des nombres premiers  %%%%
        \\newcount\\primeindex
        \\newcount\\tryindex
        \\newif\\ifprime
        \\newif\\ifagain
        \\newcommand\\getprime[1]{%
        \\opcopy{2}{P0}%
        \\opcopy{3}{P1}%
        \\opcopy{5}{try}
        \\primeindex=2
        \\loop
        \\ifnum\\primeindex<#1\\relax
        \\testprimality
        \\ifprime
        \\opcopy{try}{P\\the\\primeindex}%
        \\advance\\primeindex by1
        \\fi
        \\opadd*{try}{2}{try}%
        \\ifnum\\primeindex<#1\\relax
        \\testprimality
        \\ifprime
        \\opcopy{try}{P\\the\\primeindex}%
        \\advance\\primeindex by1
        \\fi
        \\opadd*{try}{4}{try}%
        \\fi
        \\repeat
        }
        \\newcommand\\testprimality{%
        \\begingroup
        \\againtrue
        \\global\\primetrue
        \\tryindex=0
        \\loop
        \\opidiv*{try}{P\\the\\tryindex}{q}{r}%
        \\opcmp{r}{0}%
        \\ifopeq \\global\\primefalse \\againfalse \\fi
        \\opcmp{q}{P\\the\\tryindex}%
        \\ifoplt \\againfalse \\fi
        \\advance\\tryindex by1
        \\ifagain
        \\repeat
        \\endgroup
        }
        
        %%% Décomposition en nombres premiers %%%
        \\newcommand\\primedecomp[2][nil]{%
        \\begingroup
        \\opset{#1}%
        \\opcopy{#2}{NbtoDecompose}%
        \\opabs{NbtoDecompose}{NbtoDecompose}%
        \\opinteger{NbtoDecompose}{NbtoDecompose}%
        \\opcmp{NbtoDecompose}{0}%
        \\ifopeq
        Je refuse de décomposer zéro.
        \\else
        \\setbox1=\\hbox{\\opdisplay{operandstyle.1}%
        {NbtoDecompose}}%
        {\\setbox2=\\box2{}}%
        \\count255=1
        \\primeindex=0
        \\loop
        \\opcmp{NbtoDecompose}{1}\\ifopneq
        \\opidiv*{NbtoDecompose}{P\\the\\primeindex}{q}{r}%
        \\opcmp{0}{r}\\ifopeq
        \\ifvoid2
        \\setbox2=\\hbox{%
        \\opdisplay{intermediarystyle.\\the\\count255}%
        {P\\the\\primeindex}}%
        \\else
        \\setbox2=\\vtop{%
        \\hbox{\\box2}
        \\hbox{%
        \\opdisplay{intermediarystyle.\\the\\count255}%
        {P\\the\\primeindex}}}
        \\fi
        \\opcopy{q}{NbtoDecompose}%
        \\advance\\count255 by1
        \\setbox1=\\vtop{%
        \\hbox{\\box1}
        \\hbox{%
        \\opdisplay{operandstyle.\\the\\count255}%
        {NbtoDecompose}}
        }%
        \\else
        \\advance\\primeindex by1
        \\fi
        \\repeat
        \\hbox{\\box1
        \\kern0.5\\opcolumnwidth
        \\opvline(0,0.75){\\the\\count255.25}
        \\kern0.5\\opcolumnwidth
        \\box2}%
        \\fi
        \\endgroup
        }
        
        % pour les corrections LG Ceci est commenté pour le préambule de mathalea car un environnement remarque existe déjà
        %\\newcommand{\\remarque}[1]{
        %\\begin{bclogo}[logo=\\bctrombone,couleur=gray!5,ombre,epBord=0.8]{Remarque:}%
        %    {#1}
        %\\end{bclogo}}

        %%%%% VÉRIFIER L'UTILITÉ %%%%%
        %\\renewcommand{\\theenumi}{\\textbf{\\arabic{enumi}}}
        %\\renewcommand{\\labelenumi}{\\textbf{\\theenumi.}}
        %\\renewcommand{\\theenumii}{\\textbf{\\alph{enumii}}}
        %\\renewcommand{\\labelenumii}{\\textbf{\\theenumii.}}
        

        
        %Tapuscrit : Denis Vergès
        
        `
        break
      default:
        result += `\\usepackage{${packages}}\n`
    }
  }
  return result
}

/**
 * Charge scratchblocks puis sa traduction fr
 * retourne une promesse rejetée en cas de pb de chargement (à gérer par l'appelant)
 * @return {Promise}
 */
export async function scratchTraductionFr () {
  await loadScratchblocks()
  window.scratchblocks.loadLanguages({
    fr: {
      commands: {
        'move %1 steps': 'avancer de %1 pas',
        'turn @turnRight %1 degrees': 'tourner @turnRight de %1 degrés',
        'turn @turnLeft %1 degrees': 'tourner @turnLeft de %1 degrés',
        'point in direction %1': "s'orienter à %1",
        'point towards %1': "s'orienter vers %1",
        'go to x:%1 y:%2': 'aller à x: %1 y: %2',
        'go to %1': 'aller à %1',
        'glide %1 secs to x:%2 y:%3': 'glisser en %1 secondes à x: %2 y: %3',
        'glide %1 secs to %2': 'glisser en %1 secondes à %2',
        'change x by %1': 'ajouter %1 à x',
        'set x to %1': 'mettre x à %1',
        'change y by %1': 'ajouter %1 à y',
        'set y to %1': 'mettre y à %1',
        'set rotation style %1': 'fixer le sens de rotation %1',
        'say %1 for %2 seconds': 'dire %1 pendant %2 secondes',
        'say %1': 'dire %1',
        'think %1 for %2 seconds': 'penser à %1 pendant %2 secondes',
        'think %1': 'penser à %1',
        show: 'montrer',
        hide: 'cacher',
        'switch costume to %1': 'basculer sur le costume %1',
        'next costume': 'costume suivant',
        'next backdrop': 'arrière-plan suivant',
        'switch backdrop to %1': "basculer sur l'arrière-plan %1",
        'switch backdrop to %1 and wait': "basculer sur l'arrière-plan %1 et attendre",
        'change %1 effect by %2': "ajouter %2 à l'effet %1",
        'set %1 effect to %2': "mettre l'effet %1 à %2",
        'clear graphic effects': 'annuler les effets graphiques',
        'change size by %1': 'ajouter %1 à la taille',
        'set size to %1%': 'mettre la taille à %1 % de la taille initiale',
        'go to %1 layer': "aller à l'%1 plan",
        'go %1 %2 layers': "déplacer de %2 plans vers l'%1",
        'start sound %1': 'jouer le son %1',
        'clear sound effects': 'annuler tous les effets sonores',
        'play sound %1 until done': "jouer le son %1 jusqu'au bout",
        'stop all sounds': 'arrêter tous les sons',
        'play drum %1 for %2 beats': 'jouer du tambour %1 pendant %2 temps',
        'rest for %1 beats': 'faire une pause pendant %1 temps',
        'play note %1 for %2 beats': 'jouer la note %1 pendant %2 temps',
        'set instrument to %1': "choisir l'instrument n° %1",
        'change volume by %1': 'ajouter %1 au volume',
        'set volume to %1%': 'mettre le volume à %1%',
        'change tempo by %1': 'ajouter %1 au tempo',
        'set tempo to %1': 'mettre le tempo à %1',
        'erase all': 'effacer tout',
        stamp: 'estampiller',
        'pen down': "stylo en position d'écriture",
        'pen up': 'relever le stylo',
        'set pen color to %1': 'mettre la couleur du stylo à %1',
        'change pen color by %1': 'ajouter %1 à la couleur du stylo',
        'set pen %1 to %2': 'mettre la %1 du stylo à %2',
        'change pen %1 by %2': 'ajouter %2 à la %1 du stylo',
        'change pen shade by %1': "ajouter %1 à l'intensité du stylo",
        'set pen shade to %1': "mettre l'intensité du stylo à %1",
        'change pen size by %1': 'ajouter %1 à la taille du stylo',
        'set pen size to %1': 'mettre la taille du stylo à %1',
        'when @greenFlag clicked': 'quand @greenFlag est cliqué',
        'when %1 key pressed': 'quand la touche %1 est pressée',
        'when this sprite clicked': 'quand ce sprite est cliqué',
        'when stage clicked': 'quand la scène est cliquée',
        'when backdrop switches to %1': "quand l'arrière-plan bascule sur %1",
        'when %1 > %2': 'quand le %1 > %2',
        'when I receive %1': 'quand je reçois %1',
        'broadcast %1': 'envoyer à tous %1',
        'broadcast %1 and wait': 'envoyer à tous %1 et attendre',
        'wait %1 seconds': 'attendre %1 secondes',
        'repeat %1': 'répéter %1 fois',
        forever: 'répéter indéfiniment',
        'if %1 then': 'si %1 alors',
        'wait until %1': "attendre jusqu'à ce que %1",
        'repeat until %1': "répéter jusqu'à ce que %1",
        'stop %1': 'stop %1',
        'when I start as a clone': 'quand je commence comme un clone',
        'create clone of %1': 'créer un clone de %1',
        'delete this clone': 'supprimer ce clone',
        'ask %1 and wait': 'demander %1 et attendre',
        'turn video %1': 'vidéo %1',
        'set video transparency to %1%': 'mettre la transparence vidéo sur %1',
        'when video motion > %1': 'quand mouvement vidéo > %1',
        'reset timer': 'réinitialiser le chronomètre',
        'set %1 to %2': 'mettre %1 à %2',
        'change %1 by %2': 'ajouter %2 à %1',
        'show variable %1': 'montrer la variable %1',
        'hide variable %1': 'cacher la variable %1',
        'add %1 to %2': 'ajouter %1 à %2',
        'delete %1 of %2': "supprimer l'élément %1 de %2",
        'delete all of %1': 'supprimer tous les éléments de la liste %1',
        'if on edge, bounce': 'rebondir si le bord est atteint',
        'insert %1 at %2 of %3': 'insérer %1 en position %2 de %3',
        'replace item %1 of %2 with %3': "remplacer l'élément %1 de la liste %2 par %3",
        'show list %1': 'montrer la liste %1',
        'hide list %1': 'cacher la liste %1',
        'x position': 'abscisse x',
        'y position': 'ordonnée y',
        direction: 'direction',
        'costume #': 'numéro de costume',
        'costume %1': '%1 du costume',
        size: 'taille',
        'backdrop name': "nom de l'arrière-plan",
        'backdrop %1': "%1 de l'arrière-plan",
        'backdrop #': "numéro de l'arrière-plan",
        volume: 'volume',
        tempo: 'tempo',
        'touching %1?': 'touche le %1 ?',
        'touching color %1?': 'couleur %1 touchée ?',
        'color %1 is touching %2?': 'couleur %1 touche %2 ?',
        'distance to %1': 'distance de %1',
        answer: 'réponse',
        'key %1 pressed?': 'touche %1 pressée ?',
        'mouse down?': 'souris pressée ?',
        'mouse x': 'souris x',
        'mouse y': 'souris y',
        'set drag mode %1': 'mettre mode de glissement à %1',
        loudness: 'volume sonore',
        'video %1 on %2': 'vidéo %1 sur %2',
        timer: 'chronomètre',
        '%1 of %2': '%1 de %2',
        'current %1': '%1 actuelle',
        'days since 2000': 'jours depuis 2000',
        username: "nom d'utilisateur",
        '%1 + %2': '%1 + %2',
        '%1 - %2': '%1 - %2',
        '%1 * %2': '%1 * %2',
        '%1 / %2': '%1 / %2',
        'pick random %1 to %2': 'nombre aléatoire entre %1 et %2',
        '%1 < %2': '%1 < %2',
        '%1 = %2': '%1 = %2',
        '%1 > %2': '%1 > %2',
        '%1 and %2': '%1 et %2',
        '%1 or %2': '%1 ou %2',
        'not %1': 'non %1',
        'join %1 %2': 'regrouper %1 et %2',
        'letter %1 of %2': 'lettre %1 de %2',
        'length of %1': 'longueur de %1',
        '%1 mod %2': '%1 modulo %2',
        'round %1': 'arrondi de %1',
        '%1 contains %2?': '%1 contient %2 ?',
        'item %1 of %2': 'élément %1 de %2',
        'item # of %1 in %2': 'position de %1 dans %2',
        'turn %1 on': 'allumer le moteur %1',
        'turn %1 off': 'éteindre le moteur %1',
        'set %1 power to %2': 'mettre la puissance du moteur %1 à %2',
        'set %1 direction to %2': 'mettre la direction du moteur %1 à %2',
        'when distance %1 %2': 'quand la distance %1 %2',
        distance: 'distance',
        'turn %1 on for %2 seconds': 'allumer le moteur %1 pendant %2 secondes',
        'set light color to %1': 'mettre la couleur de la lampe à %1',
        'play note %1 for %2 seconds': 'jouer la note %1 pendant %2 secondes',
        'when tilted %1': 'quand incliné %1',
        'tilt angle %1': "angle d'inclinaison %1",
        else: 'sinon',
        'user id': "id de l'utilisateur",
        'loud?': 'fort ?'
      },
      dropdowns: {},
      ignorelt: [],
      soundEffects: [
        'hauteur',
        'stéréo gauche/droite'
      ],
      osis: [
        'autres scripts dans sprite'
      ],
      definePrefix: [
        'définir'
      ],
      defineSuffix: [],
      palette: {
        Motion: 'Mouvement',
        Looks: 'Apparence',
        Sound: 'Son',
        Events: 'Événements',
        Control: 'Contrôle',
        Sensing: 'Capteurs',
        Operators: 'Opérateurs',
        Variables: 'Variables',
        'My Blocks': 'Mes Blocs'
      },
      math: [
        'abs',
        'plancher',
        'plafond',
        'racine',
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'ln',
        'log',
        'e^',
        '10^'
      ],
      aliases: {
        'tourner gauche de %1 degrés': 'turn @turnLeft %1 degrees',
        'tourner droite de %1 degrés': 'turn @turnRight %1 degrees',
        'quand le drapeau vert pressé': 'when @greenFlag clicked',
        fin: 'end'
      },
      name: 'Français',
      percentTranslated: 100
    }
  })
}

/**
 *
 * @param {array} thisAmc tableau this.amc d'un exercice : [référence de l'exercice,this.autoCorrection de l'exercice,titre de l'exercice, type de question AMC,{options ?}]
 * @param {number} idExo c'est un numéro unique pour gérer les noms des éléments d'un groupe de question, il est incrémenté par creerDocumentAmc()
 */

export function exportQcmAmc (exercice, idExo) {
  const ref = `${exercice.id}${exercice.sup ? 'S:' + exercice.sup : ''}${exercice.sup2 ? 'S2:' + exercice.sup2 : ''}${exercice.sup3 ? 'S3:' + exercice.sup3 : ''}${exercice.sup4 ? 'S4:' + exercice.sup4 : ''}`
  const autoCorrection = exercice.autoCorrection
  const titre = exercice.titre
  const type = exercice.amcType
  let texQr = ''
  let id = 0
  let reponse, reponse2, reponse3
  let horizontalite = 'reponseshoriz'
  let lastchoice = false
  let ordered = false
  let nbChiffresPd, nbChiffresPe
  let melange = true
  let sautDeLigneApresEnonce
  for (let j = 0; j < autoCorrection.length; j++) {
    if (autoCorrection[j] === undefined) { // normalement, cela ne devrait jamais arriver !
      autoCorrection[j] = {}
    }
    if (autoCorrection[j].options !== undefined) {
      if (autoCorrection[j].options.vertical === undefined) {
        horizontalite = 'reponseshoriz'
      } else {
        horizontalite = 'reponses'
      }
      if (autoCorrection[j].options.ordered) {
        ordered = true
      }
      if (autoCorrection[j].options.lastChoice !== undefined) {
        lastchoice = autoCorrection[j].options.lastChoice
      }
    }
    let valeurAMCNum = 0
    if (autoCorrection[j].reponse !== undefined) {
      if (!Array.isArray(autoCorrection[j].reponse.valeur)) autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
      valeurAMCNum = autoCorrection[j].reponse.valeur[0]
      if (typeof valeurAMCNum === 'string') {
        valeurAMCNum = valeurAMCNum.replace(/\s/g, '').replace(',', '.')
      }
    }
    switch (type) {
      case 'qcmMono': // question QCM 1 bonne réponse
        if (elimineDoublons(autoCorrection[j].propositions)) {
          console.log('doublons trouvés')
        }
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        texQr += `\t\\begin{${horizontalite}}`
        if (ordered) {
          texQr += '[o]'
        }
        texQr += '\n '
        for (let i = 0; i < autoCorrection[j].propositions.length; i++) {
          if (lastchoice > 0 && i === lastchoice) {
            texQr += '\t\t\\lastchoices\n'
          }
          if (autoCorrection[j].propositions[i].statut) {
            texQr += `\t\t\\bonne{${autoCorrection[j].propositions[i].texte}}\n `
          } else {
            texQr += `\t\t\\mauvaise{${autoCorrection[j].propositions[i].texte}}\n `
          }
        }
        texQr += `\t\\end{${horizontalite}}\n `
        texQr += '\\end{question}\n }\n '
        id++
        break

      case 'qcmMult': // question QCM plusieurs bonnes réponses (même si il n'y a qu'une seule bonne réponse, il y aura le symbole multiSymbole)
        if (elimineDoublons(autoCorrection[j].propositions)) {
          console.log('doublons trouvés')
        }
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }

        texQr += `\\element{${ref}}{\n `
        texQr += `\\begin{questionmult}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        texQr += `\t\\begin{${horizontalite}}`
        if (ordered) {
          texQr += '[o]'
        }
        texQr += '\n '
        for (let i = 0; i < autoCorrection[j].propositions.length; i++) {
          if (lastchoice > 0 && i === lastchoice) {
            texQr += '\t\t\\lastchoices\n'
          }
          if (autoCorrection[j].propositions[i].statut) {
            texQr += `\t\t\\bonne{${autoCorrection[j].propositions[i].texte}}\n `
          } else {
            texQr += `\t\t\\mauvaise{${autoCorrection[j].propositions[i].texte}}\n `
          }
        }
        texQr += `\t\\end{${horizontalite}}\n `
        texQr += ' \\end{questionmult}\n }\n '
        id++
        break
      case 'AMCOpen': // AMCOpen question ouverte corrigée par l'enseignant
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (autoCorrection[j].propositions === undefined) {
          autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '3' }]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += `\t\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
        texQr += `\t\t${autoCorrection[j].enonce} \n `
        texQr += `\t\t\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        texQr += `\t\t\\notation{${autoCorrection[j].propositions[0].statut}}`
        if (!(isNaN(autoCorrection[j].propositions[0].sanscadre))) {
          texQr += `[${autoCorrection[j].propositions[0].sanscadre}]` // le statut contiendra le nombre de lignes pour ce type
        }
        texQr += '\n\t\\end{question}\n }\n'
        id++
        break
      case 'AMCNum': // AMCNum avec encodage numérique de la réponse
        /********************************************************************/
        // On pourra rajouter des options : les paramètres sont nommés.
        // {digits=0,digitsDen=0,digitsNum=0,decimals=0,vertical=false,signe=false,exposantNbChiffres=0,exposantSigne=false,approx=0}
        // si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
        // signe et exposantSigne sont des booléens
        // approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
        /********************************************************************/
        if (autoCorrection[j].enonce === undefined) {
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (autoCorrection[j].propositions === undefined) {
          autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (autoCorrection[j].reponse.param.basePuissance !== undefined) {
          if (autoCorrection[j].reponse.param.exposantPuissance === undefined) {
            autoCorrection[j].reponse.param.exposantPuissance = 1000 // Nb volontairement grand pour faire comprendre à l'utilisateur AMC qu'il y a eu une erreur de programmation lors de la conception de l'exercice.
          }
          texQr += `\\element{${ref}}{\n`
          texQr += '\\begin{minipage}{\\textwidth}\n'
          texQr += '\\begin{multicols}{2}\n'
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n \\vspace{0.25cm} \n`
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          let digitsBase = 0
          if (autoCorrection[j].reponse.param.baseNbChiffres !== undefined) {
            digitsBase = Math.max(autoCorrection[j].reponse.param.baseNbChiffres, nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.basePuissance))
          } else {
            digitsBase = nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.basePuissance)
          }
          let digitsExposant = 0
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined) {
            digitsExposant = Math.max(autoCorrection[j].reponse.param.exposantNbChiffres, nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.exposantPuissance))
          } else {
            digitsExposant = nombreDeChiffresDansLaPartieEntiere(autoCorrection[j].reponse.param.exposantPuissance)
          }
          texQr += '\n'
          texQr += `Base\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.basePuissance}}{digits=${digitsBase},decimals=0,sign=${autoCorrection[j].reponse.param.basePuissance < 0 || autoCorrection[j].reponse.param.signe ? 'true' : 'false'},approx=0,`
          if (autoCorrection[j].reponse.param.aussiCorrect !== undefined) texQr += `alsocorrect=${autoCorrection[j].reponse.param.aussiCorrect},`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
          texQr += '\\end{questionmultx}\n'
          texQr += '\\AMCquestionNumberfalse\\def\\AMCbeginQuestion#1#2{}'
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 1}} \n `
          texQr += '\\vspace{18pt}'
          // texQr += `Exposant\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=${autoCorrection[j].reponse.param.exposantPuissance < 0 ? 'true' : 'false'},approx=0,`
          texQr += `Exposant\n \\AMCnumericChoices{${autoCorrection[j].reponse.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=true,approx=0,`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
          texQr += '\\end{questionmultx}\n\\end{multicols}\n\\end{minipage}\n}\n\n'
          id += 2
        } else if (valeurAMCNum.num !== undefined) { // Si une fraction a été passée à AMCNum, on met un seul AMCNumericChoice particulier
          texQr += `\\element{${ref}}{\n`
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n`
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          let digitsNum = 0
          if (autoCorrection[j].reponse.param.digitsNum !== undefined) {
            digitsNum = Math.max(autoCorrection[j].reponse.param.digitsNum, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
          } else if (autoCorrection[j].reponse.param.digits !== undefined) {
            digitsNum = Math.max(autoCorrection[j].reponse.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
          } else {
            digitsNum = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num)
          }
          let digitsDen = 0
          if (autoCorrection[j].reponse.param.digitsDen !== undefined) {
            digitsDen = Math.max(autoCorrection[j].reponse.param.digitsDen, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
          } else if (autoCorrection[j].reponse.param.digits !== undefined) {
            digitsDen = Math.max(autoCorrection[j].reponse.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
          } else {
            digitsDen = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)
          }
          let signeNum = true
          if (autoCorrection[j].reponse.param.signe !== undefined) {
            signeNum = autoCorrection[j].reponse.param.signe
          } else {
            signeNum = valeurAMCNum.signe === -1
          }
          let reponseF
          let reponseAlsoCorrect
          if (valeurAMCNum.num > 0) {
            reponseF = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
            reponseAlsoCorrect = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** digitsDen), 8)
          } else {
            reponseF = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
            reponseAlsoCorrect = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** digitsDen), 8)
          }
          texQr += `\\AMCnumericChoices{${reponseF}}{digits=${digitsNum + digitsDen},decimals=${digitsDen},sign=${signeNum},approx=0,`
          texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreexact=1,Tpoint={\\vspace{0.5cm} \\vrule height 0.4pt width 5.5cm },alsocorrect=${reponseAlsoCorrect}}\n`
          texQr += '\\end{questionmultx}\n}\n\n'
          id += 2
        } else {
          let nbChiffresExpo
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres !== 0) {
            nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(decimalToScientifique(valeurAMCNum)[0]), autoCorrection[j].reponse.param.decimals)
            nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(valeurAMCNum)[0]), autoCorrection[j].reponse.param.digits - nbChiffresPd)
            nbChiffresExpo = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(valeurAMCNum)[1]), autoCorrection[j].reponse.param.exposantNbChiffres)
          } else {
            nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(valeurAMCNum), autoCorrection[j].reponse.param.decimals)
            nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(valeurAMCNum), autoCorrection[j].reponse.param.digits - nbChiffresPd)
          }
          if (autoCorrection[j].reponse.param.milieuIntervalle !== undefined) {
            const demiMediane = autoCorrection[j].reponse.param.milieuIntervalle - valeurAMCNum
            nbChiffresPd = Math.max(nbChiffresPd, nombreDeChiffresDansLaPartieDecimale(demiMediane))
            valeurAMCNum = autoCorrection[j].reponse.param.milieuIntervalle
            autoCorrection[j].reponse.param.approx = autoCorrection[j].reponse.param.approx === 'intervalleStrict' ? demiMediane * 10 ** nbChiffresPd - 1 : demiMediane * 10 ** nbChiffresPd
          }
          texQr += `\\element{${ref}}{\n `
          texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
          texQr += `${autoCorrection[j].enonce} \n `
          if (autoCorrection[j].propositions !== undefined) {
            texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
          }
          if (autoCorrection[j].reponse.textePosition === 'left') texQr += `${autoCorrection[j].reponse.texte} `
          texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${nbChiffresPe + nbChiffresPd},decimals=${nbChiffresPd},sign=${autoCorrection[j].reponse.param.signe},`
          if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
            texQr += `exponent=${nbChiffresExpo},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
          }
          if (autoCorrection[j].reponse.param.approx !== undefined && autoCorrection[j].reponse.param.approx !== 0) {
            texQr += `approx=${autoCorrection[j].reponse.param.approx},`
            texQr += `scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},`
          }
          if (autoCorrection[j].reponse.param.vertical !== undefined && autoCorrection[j].reponse.param.vertical) {
            texQr += `vertical=${autoCorrection[j].reponse.param.vertical},`
          }
          if (autoCorrection[j].reponse.param.strict !== undefined && autoCorrection[j].reponse.param.strict) {
            texQr += `strict=${autoCorrection[j].reponse.param.strict},`
          }
          if (autoCorrection[j].reponse.param.vhead !== undefined && autoCorrection[j].reponse.param.vhead) {
            texQr += `vhead=${autoCorrection[j].reponse.param.vhead},`
          }
          if (autoCorrection[j].reponse.param.tpoint !== undefined && autoCorrection[j].reponse.param.tpoint) {
            texQr += `Tpoint={${autoCorrection[j].reponse.param.tpoint}},`
          } else {
            texQr += 'Tpoint={,},'
          }
          texQr += 'borderwidth=0pt,backgroundcol=lightgray,scoreexact=1} '
          if (autoCorrection[j].reponse.textePosition === 'right') texQr += `${autoCorrection[j].reponse.texte}\n`
          texQr += '\\end{questionmultx}\n }\n\n'
          id++
        }
        break
      case 'AMCOpenNum': // AMCOpen + AMCnumeric Choices. (A ne plus utiliser au profit de AMCHybride)
        /********************************************************************/
        // On pourra rajouter des options : les paramètres sont nommés.
        // {digits=0,decimals=0,signe=false,exposantNbChiffres=0,exposantSigne=false,approx=0}
        // si digits=0 alors la fonction va analyser le nombre décimal (ou entier) pour déterminer digits et decimals
        // signe et exposantSigne sont des booléens
        // approx est un entier : on enlève la virgule pour comparer la réponse avec la valeur : approx est le seuil de cette différence.
        // La correction est dans tabQCM[1][0], la réponse numérique est dans tabQCM[1][1] et le nombre de ligne pour le cadre dans tabQCM[1][2] et
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: 2, feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        texQr += '\\begin{minipage}[b]{0.7 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\t\t\\notation{${autoCorrection[j].propositions[0].statut}}`
        if (!(isNaN(autoCorrection[j].propositions[0].sanscadre))) {
          texQr += `[${autoCorrection[j].propositions[0].sanscadre}]` // le statut contiendra le nombre de lignes pour ce type
        }
        texQr += '\n\t\\end{question}\n\\end{minipage}\n'
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== undefined && autoCorrection[j].reponse.param.exposantNbChiffres === 0) {
          if (autoCorrection[j].reponse.param.digits === 0) {
            nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(valeurAMCNum)
            autoCorrection[j].reponse.param.decimals = nbChiffresPd
            nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum)
            autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
          } else if (autoCorrection[j].reponse.param.decimals === undefined) {
            autoCorrection[j].reponse.param.decimals = 0
          }
          if (autoCorrection[j].reponse.param.exposantSigne === undefined) {
            autoCorrection[j].reponse.param.exposantSigne = false
          }
        }
        if (autoCorrection[j].reponse.param.signe === undefined) {
          autoCorrection[j].reponse.param.signe = false
        }
        texQr += '\\begin{minipage}[b]{0.3 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres === 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0 && autoCorrection[j].reponse.param.approx !== undefined) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        if (autoCorrection[j].reponse.param.vertical !== undefined && autoCorrection[j].reponse.param.vertical) {
          texQr += `vertical=${autoCorrection[j].reponse.param.vertical},`
        }
        if (autoCorrection[j].reponse.param.strict !== undefined && autoCorrection[j].reponse.param.strict) {
          texQr += `strict=${autoCorrection[j].reponse.param.strict},`
        }
        if (autoCorrection[j].reponse.param.vhead !== undefined && autoCorrection[j].reponse.param.vhead) {
          texQr += `vhead=${autoCorrection[j].reponse.param.vhead},`
        }
        if (autoCorrection[j].reponse.param.tpoint !== undefined && autoCorrection[j].reponse.param.tpoint) {
          texQr += `Tpoint={${autoCorrection[j].reponse.param.tpoint}},`
        } else {
          texQr += 'Tpoint={,},'
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scorapprox || 0.667},scoreexact=1,vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}}\n'
        id++
        break
      case 'AMCOpenNum✖︎2': // AMCOpen + deux AMCnumeric Choices. (Nouveau ! en test)
        /********************************************************************/
        // /!\/!\/!\/!\ ATTENTION /!\/!\/!\/!\
        // Pour ce type :
        // =======autoCorrection[j].enonce contient toujours le texte de l'énoncé
        // les réponses à évaluer sont dans autoCorrection[j].reponse et autoCorrection[j].reponse2
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '', feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse2.valeur)) {
          autoCorrection[j].reponse2.valeur = [autoCorrection[j].reponse2.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        // premier champ de codage
        texQr += '\\begin{minipage}[b]{0.7 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\\notation{${autoCorrection[j].propositions[0].statut}}\n`
        texQr += '\\end{question}\n\\end{minipage}\n'
        texQr += '\\begin{minipage}[b]{0.05 \\linewidth}\\hspace{6pt}\\end{minipage}'
        reponse = autoCorrection[j].reponse.valeur[0]
        if (autoCorrection[j].reponse.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse)
          autoCorrection[j].reponse.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse)
          autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse.param.decimals === undefined) {
          autoCorrection[j].reponse.param.decimals = 0
        }
        // deuxième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.15 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        texQr += `${autoCorrection[j].reponse.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        texQr += `\\AMCnumericChoices{${reponse}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // troisième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.15 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}c} \n `
        reponse2 = autoCorrection[j].reponse2.valeur[0]
        if (autoCorrection[j].reponse2.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse2)
          autoCorrection[j].reponse2.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse2)
          autoCorrection[j].reponse2.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse2.param.decimals === undefined) {
          autoCorrection[j].reponse2.param.decimals = 0
        }
        texQr += `${autoCorrection[j].reponse2.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse2.valeur}}{digits=${autoCorrection[j].reponse2.param.digits},decimals=${autoCorrection[j].reponse2.param.decimals},sign=${autoCorrection[j].reponse2.param.signe},`
        if (autoCorrection[j].reponse2.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse2.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse2.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse2.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse2.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}}\n'

        id++
        break

      case 'AMCOpenNum✖︎3': // Un amcOpen et trois  AMCnumeric Choices. (Nouveau ! en test)
        /********************************************************************/
        // /!\/!\/!\/!\ ATTENTION /!\/!\/!\/!\
        // Pour ce type :
        // =======autoCorrection[j].enonce contient toujours le texte de l'énoncé
        // les réponses à évaluer sont dans autoCorrection[j].reponse, autoCorrection[j].reponse2 et autoCorrection[j].reponse3
        /********************************************************************/
        if (exercice.autoCorrection[j].enonce === undefined) {
          exercice.autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (exercice.autoCorrection[j].propositions === undefined) {
          exercice.autoCorrection[j].propositions = [{ texte: exercice.listeCorrections[j], statut: '', feedback: '' }]
        }
        if (!Array.isArray(autoCorrection[j].reponse.valeur)) {
          autoCorrection[j].reponse.valeur = [autoCorrection[j].reponse.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse2.valeur)) {
          autoCorrection[j].reponse2.valeur = [autoCorrection[j].reponse2.valeur]
        }
        if (!Array.isArray(autoCorrection[j].reponse3.valeur)) {
          autoCorrection[j].reponse3.valeur = [autoCorrection[j].reponse3.valeur]
        }
        texQr += `\\element{${ref}}{\n `
        // premier champ de codage
        texQr += '\\begin{minipage}[b]{0.4 \\linewidth}\n'
        texQr += `\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}a} \n `
        texQr += `${autoCorrection[j].enonce} \n `
        if (autoCorrection[j].propositions !== undefined) {
          texQr += `\\explain{${autoCorrection[j].propositions[0].texte}}\n`
        }
        texQr += `\\notation{${autoCorrection[j].propositions[0].statut}}\n`
        texQr += '\\end{question}\n\\end{minipage}\n'
        reponse = valeurAMCNum
        if (autoCorrection[j].reponse.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse)
          autoCorrection[j].reponse.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse)
          autoCorrection[j].reponse.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse.param.decimals === undefined) {
          autoCorrection[j].reponse.param.decimals = 0
        }
        // deuxième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}b} \n `
        if (autoCorrection[j].reponse.textePosition === 'top') texQr += `${autoCorrection[j].reponse.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse.textePosition === 'left') texQr += `${autoCorrection[j].reponse.texte} `
        texQr += `\\AMCnumericChoices{${valeurAMCNum}}{digits=${autoCorrection[j].reponse.param.digits},decimals=${autoCorrection[j].reponse.param.decimals},sign=${autoCorrection[j].reponse.param.signe},`
        if (autoCorrection[j].reponse.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse.param.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}`
        if (autoCorrection[j].reponse.textePosition === 'right') texQr += `${autoCorrection[j].reponse.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // troisième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}c} \n `
        reponse2 = autoCorrection[j].reponse2.valeur[0]
        if (autoCorrection[j].reponse2.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse2)
          autoCorrection[j].reponse2.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse2)
          autoCorrection[j].reponse2.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse2.param.decimals === undefined) {
          autoCorrection[j].reponse2.param.decimals = 0
        }
        if (autoCorrection[j].reponse2.textePosition === 'top') texQr += `${autoCorrection[j].reponse2.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse2.textePosition === 'left') texQr += `${autoCorrection[j].reponse2.texte} `
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse2.valeur}}{digits=${autoCorrection[j].reponse2.param.digits},decimals=${autoCorrection[j].reponse2.param.decimals},sign=${autoCorrection[j].reponse2.param.signe},`
        if (autoCorrection[j].reponse2.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse2.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse2.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse2.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse2.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true}`
        if (autoCorrection[j].reponse2.textePosition === 'right') texQr += `${autoCorrection[j].reponse2.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n'

        // quatrième champ de codage numérique
        texQr += '\\begin{minipage}[b]{0.2 \\linewidth}\n'
        texQr += '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse'
        texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}d} \n `
        reponse3 = autoCorrection[j].reponse3.valeur[0]
        if (autoCorrection[j].reponse3.param.digits === 0) {
          nbChiffresPd = nombreDeChiffresDansLaPartieDecimale(reponse3)
          autoCorrection[j].reponse3.param.decimals = nbChiffresPd
          nbChiffresPe = nombreDeChiffresDansLaPartieEntiere(reponse3)
          autoCorrection[j].reponse3.param.digits = nbChiffresPd + nbChiffresPe
        } else if (autoCorrection[j].reponse3.param.decimals === undefined) {
          autoCorrection[j].reponse3.param.decimals = 0
        }
        if (autoCorrection[j].reponse3.textePosition === 'top') texQr += `${autoCorrection[j].reponse3.texte}\n` // pour pouvoir mettre du texte adapté par ex Dénominateur éventuellement de façon conditionnelle avec une valeur par défaut
        else if (autoCorrection[j].reponse3.textePosition === 'left') texQr += `${autoCorrection[j].reponse3.texte} `
        texQr += `\\AMCnumericChoices{${autoCorrection[j].reponse3.valeur}}{digits=${autoCorrection[j].reponse3.param.digits},decimals=${autoCorrection[j].reponse3.param.decimals},sign=${autoCorrection[j].reponse3.param.signe},`
        if (autoCorrection[j].reponse3.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
          texQr += `exponent=${autoCorrection[j].reponse3.param.exposantNbChiffres},exposign=${autoCorrection[j].reponse3.param.exposantSigne},`
        }
        if (autoCorrection[j].reponse3.approx !== 0) {
          texQr += `approx=${autoCorrection[j].reponse3.param.approx},`
        }
        texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,},vertical=true} `
        if (autoCorrection[j].reponse3.textePosition === 'right') texQr += `${autoCorrection[j].reponse3.texte}\n`
        texQr += '\\end{questionmultx}\n\\end{minipage}\n}\n'
        id++
        break

      default : // Si on arrive ici, c'est que le type est AMCHybride
        if (type !== 'AMCHybride') {
          window.notify('exportQcmAMC : Il doit y avoir une erreur de type AMC, je ne connais pas le type : ', { type })
        }
        if (autoCorrection[j].enonce === undefined) { // Si l'énoncé n'a pas été défini, on va le chercher dans la question
          autoCorrection[j].enonce = exercice.listeQuestions[j]
        }
        if (autoCorrection[j].propositions === undefined) {
          break
        }
        if (autoCorrection[j].melange !== undefined) {
          melange = autoCorrection[j].melange
        }
        texQr += `\\element{${ref}}{\n ` // Un seul élément du groupe de question pour AMC... plusieurs questions dedans !
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicolsAll) {
            texQr += '\\setlength{\\columnseprule}{'
            if (autoCorrection[j].options.barreseparation) {
              texQr += '0.5'
            } else {
              texQr += '0'
            }
            texQr += 'pt}\\begin{multicols}{2}\n'
          }
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += `\\noindent\\fbox{\\begin{minipage}{${autoCorrection[j].enonceAGauche[0]}\\linewidth}\n`
        }
        sautDeLigneApresEnonce = '\\\\\n '
        if (!(autoCorrection[j].enonceCentre === undefined) || (autoCorrection[j].enonceCentre)) {
          texQr += '\\begin{center}'
          sautDeLigneApresEnonce = ''
        }
        if (autoCorrection[j].enonceAvant === undefined) { // Dans une suite de questions, il se peut qu'il n'y ait pas d'énoncé général donc pas besoin de saut de ligne non plus.
          texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
        } else if (autoCorrection[j].enonceAvant) {
          texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
        } else if (autoCorrection[j].enonceAvantUneFois !== undefined) {
          if (autoCorrection[j].enonceAvantUneFois && j === 0) {
            texQr += `${autoCorrection[j].enonce} ` + sautDeLigneApresEnonce
          }
        }
        if (!(autoCorrection[j].enonceCentre === undefined) || (autoCorrection[j].enonceCentre)) {
          texQr += '\\end{center}'
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += `\\end{minipage}}\n\\noindent\\begin{minipage}[t]{${autoCorrection[j].enonceAGauche[1]}\\linewidth}\n`
        }
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicols & !autoCorrection[j].options.multicolsAll) {
            texQr += '\\setlength{\\columnseprule}{'
            if (autoCorrection[j].options.barreseparation) {
              texQr += '0.5'
            } else {
              texQr += '0'
            }
            texQr += 'pt}\\begin{multicols}{2}\n'
          }
        }

        for (let qr = 0, qrType, prop, propositions, rep; qr < autoCorrection[j].propositions.length; qr++) { // Début de la boucle pour traiter toutes les questions-reponses de l'élément j
          prop = autoCorrection[j].propositions[qr] // prop est un objet avec cette structure : {type,propositions,reponse}
          qrType = prop.type

          propositions = prop.propositions
          switch (qrType) {
            case 'qcmMono':
              if (elimineDoublons(propositions)) {
                console.log('doublons trouvés')
              }

              if (prop.options !== undefined) {
                if (prop.options.vertical === undefined) {
                  horizontalite = 'reponseshoriz'
                } else {
                  horizontalite = 'reponses'
                }
                if (prop.options.ordered) {
                  ordered = true
                }
                if (prop.options.lastChoice !== undefined) {
                  lastchoice = prop.options.lastChoice
                }
              }
              texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
              if (propositions[0].reponse !== undefined) {
                if (propositions[0].reponse.texte) {
                  texQr += propositions[0].reponse.texte + '\n'
                }
              }
              texQr += `\t\\begin{${horizontalite}}`
              if (ordered) {
                texQr += '[o]'
              }
              texQr += '\n '
              for (let i = 0; i < propositions.length; i++) {
                if (lastchoice > 0 && i === lastchoice) {
                  texQr += '\t\t\\lastchoices\n'
                }
                if (prop.propositions[i].statut) {
                  texQr += `\t\t\\bonne{${propositions[i].texte}}\n `
                } else {
                  texQr += `\t\t\\mauvaise{${propositions[i].texte}}\n `
                }
              }
              texQr += `\t\\end{${horizontalite}}\n `
              texQr += '\\end{question}\n'
              id++
              break
            case 'qcmMult':
              if (elimineDoublons(propositions)) {
                console.log('doublons trouvés')
              }
              if (prop.options !== undefined) {
                if (prop.options.vertical === undefined) {
                  horizontalite = 'reponseshoriz'
                } else {
                  horizontalite = 'reponses'
                }
                if (prop.options.ordered) {
                  ordered = true
                }
                if (prop.options.lastChoice !== undefined) {
                  lastchoice = prop.options.lastChoice
                }
              }
              texQr += `${(qr > 0 && !(autoCorrection[j].options.avecSymboleMult)) ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmult}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
              if (prop.enonce !== undefined) texQr += prop.enonce

              texQr += `\t\\begin{${horizontalite}}`
              if (ordered) {
                texQr += '[o]'
              }
              texQr += '\n '
              for (let i = 0; i < propositions.length; i++) {
                if (lastchoice > 0 && i === lastchoice) {
                  texQr += '\t\t\\lastchoices\n'
                }
                if (propositions[i].statut) {
                  texQr += `\t\t\\bonne{${propositions[i].texte}}\n `
                } else {
                  texQr += `\t\t\\mauvaise{${propositions[i].texte}}\n `
                }
              }
              texQr += `\t\\end{${horizontalite}}\n `
              texQr += ' \\end{questionmult}\n'
              id++
              break
            case 'AMCNum':
              rep = prop.propositions[0].reponse
              if (!Array.isArray(rep.valeur)) { // rep.valeur est un tableau si la réponse est une fraction
                rep.valeur = [rep.valeur]
              }
              if (rep.param.basePuissance !== undefined) {
                if (rep.param.exposantPuissance === undefined) {
                  rep.param.exposantPuissance = 1000 // Nb volontairement grand pour faire comprendre à l'utilisateur AMC qu'il y a eu une erreur de programmation lors de la conception de l'exercice.
                }
                texQr += '\\begin{minipage}{\\textwidth}\n'
                texQr += '\\begin{multicols}{2}\n'
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n \\vspace{0.25cm} \n`
                let digitsBase = 0
                if (rep.param.baseNbChiffres !== undefined) {
                  digitsBase = Math.max(rep.param.baseNbChiffres, nombreDeChiffresDansLaPartieEntiere(rep.param.basePuissance))
                } else {
                  digitsBase = nombreDeChiffresDansLaPartieEntiere(rep.param.basePuissance)
                }
                let digitsExposant = 0
                if (rep.param.exposantNbChiffres !== undefined) {
                  digitsExposant = Math.max(rep.param.exposantNbChiffres, nombreDeChiffresDansLaPartieEntiere(rep.param.exposantPuissance))
                } else {
                  digitsExposant = nombreDeChiffresDansLaPartieEntiere(rep.param.exposantPuissance)
                }
                texQr += '\n'
                texQr += `Base\n \\AMCnumericChoices{${rep.param.basePuissance}}{digits=${digitsBase},decimals=0,sign=${rep.param.basePuissance < 0 ? 'true' : 'false'},approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
                texQr += '\\end{questionmultx}\n'
                texQr += '\\AMCquestionNumberfalse\\def\\AMCbeginQuestion#1#2{}'
                texQr += `\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 1}} \n `
                texQr += '\\vspace{18pt}'
                // texQr += `Exposant\n \\AMCnumericChoices{${rep.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=${rep.param.exposantPuissance < 0 ? 'true' : 'false'},approx=0,`
                texQr += `Exposant\n \\AMCnumericChoices{${rep.param.exposantPuissance}}{digits=${digitsExposant},decimals=0,sign=true,approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreapprox=${autoCorrection[j].reponse.param.scoreapprox || 0.667},scoreexact=1,Tpoint={,}}\n`
                texQr += '\\end{questionmultx}\\end{multicols}\n\\end{minipage}\n\n'
                id += 2
              } else if (rep.valeur[0].num !== undefined) { // Si une fraction a été passée à AMCNum, on met deux AMCNumericChoice
                valeurAMCNum = rep.valeur[0]
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\begin{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n`
                let digitsNum = 0
                if (rep.param.digitsNum !== undefined) {
                  digitsNum = Math.max(rep.param.digitsNum, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
                } else if (rep.param.digits !== undefined) {
                  digitsNum = Math.max(rep.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num))
                } else {
                  digitsNum = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.num)
                }
                let digitsDen = 0
                if (rep.param.digitsDen !== undefined) {
                  digitsDen = Math.max(rep.param.digitsDen, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
                } else if (rep.param.digits !== undefined) {
                  digitsDen = Math.max(rep.param.digits, nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den))
                } else {
                  digitsDen = nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)
                }
                let signeNum = true
                if (rep.param.signe !== undefined) {
                  signeNum = rep.param.signe
                } else {
                  signeNum = (valeurAMCNum.num * valeurAMCNum.den < 0)
                }
                let reponseF
                let reponseAlsoCorrect
                if (valeurAMCNum.num > 0) {
                  reponseF = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
                  reponseAlsoCorrect = arrondi(valeurAMCNum.num + valeurAMCNum.den / (10 ** digitsDen), 8)
                } else {
                  reponseF = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** nombreDeChiffresDansLaPartieEntiere(valeurAMCNum.den)), 8)
                  reponseAlsoCorrect = arrondi(valeurAMCNum.num - valeurAMCNum.den / (10 ** digitsDen), 8)
                }
                texQr += `\\AMCnumericChoices{${reponseF}}{digits=${digitsNum + digitsDen},decimals=${digitsDen},sign=${signeNum},approx=0,`
                texQr += `borderwidth=0pt,backgroundcol=lightgray,scoreexact=1,Tpoint={\\vspace{0.5cm} \\vrule height 0.4pt width 5.5cm },alsocorrect=${reponseAlsoCorrect}}\n`
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\end{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += '\\end{questionmultx}\n'
                id += 2
              } else { // Ni puissances, ni fractions
                let nbChiffresExpo
                if (rep.param.exposantNbChiffres !== undefined && rep.param.exposantNbChiffres !== 0) {
                  nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(decimalToScientifique(rep.valeur[0])[0]), rep.param.decimals)
                  nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(rep.valeur[0])[0]), rep.param.digits - nbChiffresPd)
                  nbChiffresExpo = Math.max(nombreDeChiffresDansLaPartieEntiere(decimalToScientifique(rep.valeur[0])[1]), rep.param.exposantNbChiffres)
                } else {
                  nbChiffresPd = Math.max(nombreDeChiffresDansLaPartieDecimale(rep.valeur[0]), rep.param.decimals)
                  nbChiffresPe = Math.max(nombreDeChiffresDansLaPartieEntiere(rep.valeur[0]), rep.param.digits - nbChiffresPd)
                }
                if (rep.param.milieuIntervalle !== undefined) {
                  const demiMediane = rep.param.milieuIntervalle - valeurAMCNum
                  nbChiffresPd = Math.max(nbChiffresPd, nombreDeChiffresDansLaPartieDecimale(demiMediane))
                  valeurAMCNum = rep.param.milieuIntervalle
                  rep.param.approx = autoCorrection[j].reponse.param.approx === 'intervalleStrict' ? demiMediane * 10 ** nbChiffresPd - 1 : demiMediane * 10 ** nbChiffresPd
                }
                texQr += `${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{questionmultx}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n `
                if (propositions !== undefined) {
                  texQr += `\\explain{${propositions[0].texte}}\n`
                }
                texQr += `${rep.texte}\n`
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\begin{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += `\\AMCnumericChoices{${rep.valeur[0]}}{digits=${nbChiffresPe + nbChiffresPd},decimals=${nbChiffresPd},sign=${rep.param.signe},`
                if (rep.param.exposantNbChiffres !== undefined && rep.param.exposantNbChiffres !== 0) { // besoin d'un champ pour la puissance de 10. (notation scientifique)
                  texQr += `exponent=${nbChiffresExpo},exposign=${rep.param.exposantSigne},`
                }
                if (rep.param.approx !== undefined && rep.param.approx !== 0) {
                  texQr += `approx=${rep.param.approx},`
                  texQr += `scoreapprox=${rep.param.scoreapprox || 0.667},`
                }
                if (rep.param.vertical !== undefined && rep.param.vertical) {
                  texQr += `vertical=${rep.param.vertical},`
                }
                if (rep.param.strict !== undefined && rep.param.strict) {
                  texQr += `strict=${rep.param.strict},`
                }
                if (rep.param.vhead !== undefined && rep.param.vhead) {
                  texQr += `vhead=${rep.param.vhead},`
                }
                if (rep.param.tpoint !== undefined && rep.param.tpoint) {
                  texQr += `Tpoint={${rep.param.tpoint}},`
                } else {
                  texQr += 'Tpoint={,},'
                }
                texQr += 'borderwidth=0pt,backgroundcol=lightgray,scoreexact=1}\n'
                if (!(propositions[0].reponse.alignement === undefined)) {
                  texQr += '\\end{'
                  texQr += `${propositions[0].reponse.alignement}}`
                }
                texQr += '\\end{questionmultx}\n'
                id++
              }
              break
            case 'AMCOpen': // AMCOpen de Hybride
              if (propositions[0].numQuestionVisible === undefined) {
                texQr += `\t${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n`
              } else if (propositions[0].numQuestionVisible) {
                texQr += `\t${qr > 0 ? '\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse' : ''}\\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}} \n`
              } else {
                texQr += `\t\\def\\AMCbeginQuestion#1#2{}\\AMCquestionNumberfalse \\begin{question}{${ref}-${lettreDepuisChiffre(idExo + 1)}-${id + 10}}\\QuestionIndicative \n`
              }
              if (!(propositions[0].enonce === undefined)) texQr += `\t${propositions[0].enonce}\n`
              texQr += `\t\t\\explain{${propositions[0].texte}}\n`

              if (propositions[0].numQuestionVisible === undefined) {
                texQr += `\t\t\\notation{${propositions[0].statut}}`
                if (!(isNaN(propositions[0].sanscadre))) {
                  texQr += `[${propositions[0].sanscadre}]` // le statut contiendra le nombre de lignes pour ce type
                } else texQr += '[false]'
                if (!(isNaN(propositions[0].sanslignes))) {
                  texQr += `[${!propositions[0].sanslignes}]` // le statut contiendra le nombre de lignes pour ce type
                } else texQr += '[true]'
              }

              texQr += '\n' // le statut contiendra le nombre de lignes pour ce type
              texQr += '\t\\end{question}\n'
              id++
              break
          }
        }
        if (typeof autoCorrection[j].options !== 'undefined') {
          if (autoCorrection[j].options.multicols || autoCorrection[j].options.multicolsAll) {
            texQr += '\\end{multicols}\n'
          }
        }
        if (autoCorrection[j].enonceAGauche) {
          texQr += '\\end{minipage}\n'
        }
        texQr += '}\n'
        break
    }
  }
  return [texQr, ref, exercice.nbQuestions, titre, melange]
}

/**
 * @author Jean-Claude Lhote
 * Fonction qui crée un document pour AMC (pour le compiler, le package automultiplechoice.sty doit être présent)
 *
 *  questions est un tableau d'éléments de type Exercice.QCM
 * Exercice.QCM est un tableau produit par l'exercice
 * QCM[0] est la référence du groupe de question, c'est la référence de l'exercice dont il est issu
 * QCM[1] est un tableau d'éléments de type ['question posée',tableau des réponses,tableau des booléens bon ou mauvais]
 * QCM[2] est le titre donné sur la copie pour le groupe de question (pour ne pas mettre la référence)
 * QCM[3] est le type de question :
 * 1=question à choix multiple avec 1 bonne réponse
 * 2=questionmult à choix multiple avec plusieurs bonnes réponses
 * 3=AMCOpen question ouverte sans bonne ni mauvaise réponse 3 cases à cocher par l'enseignant
 * 4=questionmultx avec AMCnumeriqueChoices question ouverte à réponse numérique codée
 *
 * nbQuestions est un tableau pour préciser le nombre de questions à prendre dans chaque groupe pour constituer une copie
 * s'il est indéfini, toutes les questions du groupe seront posées.
 * nb_exemplaire est le nombre de copies à générer
 * matiere et titre se passent de commentaires : ils renseignent l'entête du sujet.
 */
export function creerDocumentAmc ({ questions, nbQuestions = [], nbExemplaires = 1, matiere = 'Mathématiques', titre = 'Evaluation', typeEntete = 'AMCcodeGrid', format = 'A4' }) {
  // Attention questions est maintenant un tableau de tous les this.amc des exos
  // Dans cette partie, la fonction récupère toutes les questions et les trie pour les rassembler par groupe
  // Toutes les questions d'un même exercice seront regroupées ce qui permet éventuellement de les récupérer dans des fichiers individuels pour se constituer une base
  let idExo = 0; let code; let indexOfCode
  const nombreDeQuestionsIndefinie = []
  const graine = randint(1, 100000)
  const groupeDeQuestions = []; const texQuestions = [[]]; const titreQuestion = []; const melangeQuestion = []
  for (const exercice of questions) {
    code = exportQcmAmc(exercice, idExo)
    idExo++
    indexOfCode = groupeDeQuestions.indexOf(code[1])
    if (indexOfCode === -1) { // si le groupe n'existe pas
      groupeDeQuestions.push(code[1])
      indexOfCode = groupeDeQuestions.indexOf(code[1])
      texQuestions[indexOfCode] = code[0]

      // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
      if (typeof nbQuestions[indexOfCode] === 'undefined') {
        nombreDeQuestionsIndefinie[indexOfCode] = true
        nbQuestions[indexOfCode] = code[2]
      } else { // Si le nombre de question (à restituer pour ce groupe de question) a été défini par l'utilisateur, alors on le laisse !
        nombreDeQuestionsIndefinie[indexOfCode] = false
      }
      // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
      titreQuestion[indexOfCode] = code[3]
      melangeQuestion[indexOfCode] = code[4]
    } else { // Donc le groupe existe, on va vérifier si la question existe déjà et si non, on l'ajoute.
      if (texQuestions[indexOfCode].indexOf(code[0]) === -1) {
        texQuestions[indexOfCode] += code[0]
        // Si le nombre de questions du groupe n'est pas défini, alors on met toutes les questions sinon on laisse le nombre choisi par l'utilisateur
        if (nombreDeQuestionsIndefinie[indexOfCode]) {
          nbQuestions[indexOfCode] += code[2]
        }
      }
    }
  }
  // Fin de la préparation des groupes

  // variable qui contiendra le code LaTeX pour AMC
  let codeLatex = ''

  // variable preambule à abonder le cas échéant si des packages sont nécessaires.
  // Merci à Sébastien Lozano pour la vérification des dépendances
  // Merci à Liouba Leroux pour ses documents qui ont servi de base
  // A faire : abonder le preambule pour qu'il colle à tous les exos Mathalea_AMC

  let preambule = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%% -I- PRÉAMBULE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \n`
  if (format === 'A3') {
    preambule += '\t \\documentclass[10pt,a3paper,landscape,french]{article}\n'
  } else {
    preambule += '\t \\documentclass[10pt,a4paper,french]{article}\n'
  }

  preambule += `\t
  %%%%%% EE : Le mettre le plus tôt possible pour éviter un Warning à la compilation 
  \\RequirePackage{etex}\t  % pour avoir plus de "registres" mémoires / tikz...
  %%%%% PACKAGES LANGUE %%%%%  
  \\usepackage{babel} % sans option => langue définie dans la classe du document
   \\usepackage[T1]{fontenc} 
   \\usepackage[utf8x]{inputenc}
   \\usepackage{lmodern}\t        \t% Choix de la fonte (Latin Modern de D. Knuth)
   \\usepackage{fp}
  
  %%%%%%%%%%%%%%%%%%%%% SPÉCIFICITÉS A.M.C. %%%%%%%%%%%%%%%%%%%%%%
  %\\usepackage[francais,bloc,completemulti]{automultiplechoice} 
  %   remarque : avec completmulti => "aucune réponse ne convient" en +
   \\usepackage[francais,bloc,insidebox,nowatermark]{automultiplechoice} %//,insidebox
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
  %%%%% PACKAGES MISE EN PAGE %%%%%
   \\usepackage{multicol} 
   \\usepackage{wrapfig}  
   \\usepackage{fancybox}  % pour \\doublebox \\shadowbox  \\ovalbox \\Ovalbox
   \\usepackage{calc} \t% Calculs 
   \\usepackage{enumerate}\t% Pour modifier les numérotations
   \\usepackage{enumitem}
   \\usepackage{tabularx}\t% Pour faire des tableaux

   \\usepackage{xargs}\t% EE : pour permettre DES options dans newcommand

  %%%%% PACKAGES FIGURES %%%%%
  %\\usepackage{pstricks,pst-plot,pstricks-add}
  %   POUR PSTRICKS d'où compilation sans PDFLateX mais : dvi, dvi2ps, ps2PDF...
  %   MAIS ON PRÉFÉRERA UTILISER TIKZ...
  \\usepackage{xcolor}% [avant tikz] xcolor permet de nommer + de couleurs
  \\usepackage{pgf,tikz}
  \\usepackage{graphicx} % pour inclure une image
  \\usetikzlibrary{arrows,calc,fit,patterns,plotmarks,shapes.geometric,shapes.misc,shapes.symbols,shapes.arrows,
    shapes.callouts, shapes.multipart, shapes.gates.logic.US,shapes.gates.logic.IEC, er, automata,backgrounds,chains,topaths,trees,petri,mindmap,matrix, calendar, folding,fadings,through,positioning,scopes,decorations.fractals,decorations.shapes,decorations.text,decorations.pathmorphing,decorations.pathreplacing,decorations.footprints,decorations.markings,shadows,babel} % Charge toutes les librairies de Tikz
  \\usepackage{tkz-tab,tkz-fct,tkz-euclide}\t% Géométrie euclidienne avec TikZ
  %\\usetkzobj{all} %problème de compilation
  
  %%%%% PACKAGES MATHS %%%%%
   \\usepackage{ucs}
   \\usepackage{bm}
   \\usepackage{amsmath}
   \\usepackage{amsfonts}
   \\usepackage{amssymb}
   \\usepackage{gensymb}
   \\usepackage{eurosym}
   \\usepackage{frcursive}
   \\newcommand{\\Vcurs}{\\begin{cursive}V\\end{cursive}}
   \\usepackage[normalem]{ulem}
   \\usepackage{sistyle} \\SIdecimalsign{,} %% => \\num{...} \\num*{...}
   % cf. http://fr.wikibooks.org/wiki/LaTeX/%C3%89crire_de_la_physique
   %  sous Ubuntu, paquet texlive-science à installer
   %\\usepackage[autolanguage,np]{numprint} % déjà appelé par défaut dans introLatex
   \\usepackage{mathrsfs}  % Spécial math
   %\\usepackage[squaren]{SIunits}\t% Pour les unités (gère le conflits avec  \\square de l'extension amssymb)
   \\usepackage{pifont}\t% Pour les symboles "ding"
   \\usepackage{bbding}\t% Pour les symboles
   \\usepackage[misc]{ifsym}\t% Pour les symboles
   \\usepackage{cancel}\t% Pour pouvoir barrer les nombres


  %%%%% AUTRES %%%%%
   \\usepackage{ifthen}
   \\usepackage{url} \t        \t% Pour afficher correctement les url
   \\urlstyle{sf}                          \t% qui s'afficheront en police sans serif
   \\usepackage{fancyhdr,lastpage}          \t% En-têtes et pieds
    \\pagestyle{fancy}                      \t% de pages personnalisés
   \\usepackage{fancybox}\t% Pour les encadrés
   \\usepackage{xlop}\t% Pour les calculs posés
  %\\usepackage{standalone}\t% Pour avoir un apercu d'un fichier qui sera utilisé avec un input
   \\usepackage{multido}\t% Pour faire des boucles
  %\\usepackage{hyperref}\t% Pour gérer les liens hyper-texte
   \\usepackage{fourier}
   \\usepackage{colortbl} \t% Pour des tableaux en couleur
   \\usepackage{setspace}\t% Pour \\begin{spacing}{2.0} \\end{spacing}
   \\usepackage{multirow}\t% Pour des cellules multilignes dans un tableau
  %\\usepackage{import}\t% Equivalent de input mais en spécifiant le répertoire de travail
  %\\usepackage[]{qrcode}
  %\\usepackage{pdflscape}
   \\usepackage[framemethod=tikz]{mdframed} % Pour les cadres
   \\usepackage{tikzsymbols}
   \\usepackage{scratch3}
  %\\usepackage{tasks}\t% Pour les listes horizontales
\\usepackage{csvsimple}
  
  %%%%% Librairies utilisées par Mathgraphe32 %%%% 
  \\usepackage{fix-cm}
  \\usepackage{textcomp}
  
  %%%%% PERSONNALISATION %%%%%
  \\renewcommand{\\multiSymbole}{$\\begin{smallmatrix}\\circ\\bullet\\bullet \\\\ 
           \\circ\\bullet\\circ \\end{smallmatrix}$\\noindent} % par défaut $\\clubsuit$
  %\\renewcommand{\\multiSymbole}{\\textbf{(! Évent. plusieurs réponses !)}\\noindent} % par défaut $\\clubsuit$
  \\renewcommand{\\AMCbeginQuestion}[2]{\\noindent{\\colorbox{gray!20}{\\bf#1}}#2}
  %\\renewcommand{\\AMCIntervalFormat}[2]{\\texttt{[}#1\\,;\\,#2\\texttt{[}} 
                           % Crochets plus nets, virgule...
  %\\AMCboxDimensions{size=1.7ex,down=.2ex} %% taille des cases à cocher diminuée
  \\newcommand{\\collerVertic}{\\vspace{-3mm}} % évite un trop grand espace vertical
  \\newcommand{\\TT}{\\sout{\\textbf{Tiers Temps}} \\noindent} % 
  \\newcommand{\\Prio}{\\fbox{\\textbf{PRIORITAIRE}} \\noindent} % 
  \\newcommandx{\\notation}[3][2=false,3=true]{
    \\AMCOpen{lines=#1,lineup=#2,lineuptext=\\hspace{1cm},dots=#3}{\\mauvaise[{\\tiny NR}]{NR}\\scoring{0}\\mauvaise[{\\tiny RR}]{R}\\scoring{0.01}\\mauvaise[{\\tiny R}]{R}\\scoring{0.33}\\mauvaise[{\\tiny V}]{V}\\scoring{0.67}\\bonne[{\\tiny VV}]{V}\\scoring{1}}
  }
  %%\\newcommand{\\notation}[1]{
  %%\\AMCOpen{lines=#1}{\\mauvaise[{\\tiny NR}]{NR}\\scoring{0}\\mauvaise[{\\tiny RR}]{R}\\scoring{0.01}\\mauvaise[{\\tiny R}]{R}\\scoring{0.33}\\mauvaise[{\\tiny V}]{V}\\scoring{0.67}\\bonne[{\\tiny VV}]{V}\\scoring{1}}
  %%}
    
  %%pour afficher ailleurs que dans une question
  \\makeatletter
  \\newcommand{\\AffichageSiCorrige}[1]{\\ifAMC@correc #1\\fi}
  \\makeatother
  
  
  %%%%% TAILLES %%%%%
   \\usepackage{geometry} 
   \\geometry{headsep=0.3cm, left=1.5cm,right=1.5cm,top=2.4cm,bottom=1.5cm}
   \\DecimalMathComma 
  
   \\AMCcodeHspace=.3em % réduction de la taille des cases pour le code élève
   \\AMCcodeVspace=.3em 
  % \\AMCcodeBoxSep=.1em
   
   \\def\\AMCotextReserved{\\emph{Ne rien cocher, réservé au prof !}}
   
  %%%%%% Définition des barèmes 
  \\baremeDefautS{
    e=0.0001,% incohérence (plusieurs réponses données à 0,0001 pour définir des manquements au respect de consignes)
    b=1,% bonne réponse 1
    m=-0.01,% mauvaise réponse 0,01 pour différencier de la 
    v=0} % non réponse qui reste à 0
  
  \\baremeDefautM{formula=((NBC-NMC)/NB)*((NBC-NMC)/NB>0)} % nombre de bonnes réponses cochées minorées des mauvaises réponses cochées, ramenées à 1, et ramenée à 0 si résultat négatif.
  
  %%%%%%%%% Paramètres pour réponses à construire 
  \\AMCinterIrep=0pt \\AMCinterBrep=.5ex \\AMCinterIquest=0pt \\AMCinterBquest=3ex \\AMCpostOquest=7mm \\setlength{\\AMChorizAnswerSep}{3em plus 4em} \\setlength{\\AMChorizBoxSep}{1em}
  %%%%% Fin du préambule %%%%%%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `

  // Variable contenant la partie document
  // Celle-ci contient une partie statique et une partie variable (la zone de définition des groupes qui est construite à la volée à partir de la variable groupeDeQuestions alimentée au début)

  let debutDocument = `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%% -II-DOCUMENT %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\begin{document}
\\AMCrandomseed{${graine}}   % On choisit les "graines" pour initialiser le "hasard"
\\FPseed=${graine}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%% -II-a. CONCEPTION DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  %%% préparation des groupes 
  \\setdefaultgroupmode{cyclic}\n`

  for (const g of groupeDeQuestions) {
    const i = groupeDeQuestions.indexOf(g)
    debutDocument += texQuestions[i]
  }

  // Variable qui contient l'entête d'une copie
  // A faire : Proposer différent type d'entête en fonction d'un paramètre ?
  const enteteTypeCodeGrid = `\\begin{minipage}{10cm}
  \\champnom{\\fbox{\\parbox{10cm}{    
    Écrivez vos nom, prénom et classe : \\\\
   \\\\
  }}}
  \\end{minipage}
  
  %\\\\
  \\vspace{2mm}
  
  Puis remplir les cases des trois premières lettres de votre \\textbf{nom de famille} PUIS des deux premières lettres de votre \\textbf{prénom}
  \\vspace{1mm}
  
  \\def\\AMCchoiceLabelFormat##1{\\textcolor{black!70}{{\\tiny ##1}}}  % pour alléger la couleur des lettres dans les cases et les réduire
  \\AMCcodeGrid[h]{ID}{ABCDEFGHIJKLMNOPQRSTUVWXYZ,
  ABCDEFGHIJKLMNOPQRSTUVWXYZ,
  ABCDEFGHIJKLMNOPQRSTUVWXYZ,
  ABCDEFGHIJKLMNOPQRSTUVWXYZ,
  ABCDEFGHIJKLMNOPQRSTUVWXYZ}
  `
  const enteteTypeChampnomSimple = `\\begin{minipage}{10cm}
  \\champnom{\\fbox{\\parbox{10cm}{    
    Écrivez vos nom, prénom et classe : \\\\
   \\\\
  }}}
  \\end{minipage}
  
  %\\\\
  \\vspace{2mm}
  `
  const enteteTypePreremplie = `\\begin{center}
  \\noindent{}\\fbox{\\vspace*{3mm}
       \\Large\\bf\\nom{}~\\prenom{}\\normalsize{}% 
        \\vspace*{3mm}
      }
  \\end{center}\n`

  let enteteCopie = ''
  if (typeEntete === 'AMCassociation') {
    enteteCopie += '\\newcommand{\\sujet}{\n'
  }
  enteteCopie += ` 
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%% -II-b. MISE EN PAGE DU QCM %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \\exemplaire{${nbExemplaires}}{   % <======  /!\\ PENSER À ADAPTER /!\\  ===  %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  \n`
  if (format === 'A3') {
    enteteCopie += '\\begin{multicols}{2}\n'
  }
  enteteCopie += `
  %%%%% EN-TÊTE, IDENTIFICATION AUTOMATIQUE DE L'ÉLÈVE %%%%%
  
  \\vspace*{-17mm}
  
  %%%%% INTRODUCTION ÉVENTUELLE %%%%%
  
  \\vspace{5mm}
  %\\noindent\\AMCcode{num.etud}{8}\\hspace*{\\fill} % Pour la version "verticale"
  %\\noindent\\AMCcodeH{num.etud}{8}\t % version "horizontale"
  \\begin{minipage}{7cm}
  \\begin{center} 
    \\textbf{${matiere}}
    
    \\textbf{${titre}} 
  \\end{center}
  \\end{minipage}
  \\hfill\n`
  if (typeEntete === 'AMCassociation') {
    enteteCopie += enteteTypePreremplie
  } else if (typeEntete === 'AMCcodeGrid') {
    enteteCopie += enteteTypeCodeGrid
  } else {
    enteteCopie += enteteTypeChampnomSimple
  }
  enteteCopie +=
    `\n{\\footnotesize REMPLIR avec un stylo NOIR la ou les cases pour chaque question. Si vous devez modifier un choix, NE PAS chercher à redessiner la case cochée par erreur, mettez simplement un coup de "blanc" dessus.
  
  Les questions précédées de \\multiSymbole peuvent avoir plusieurs réponses.\\\\ Les questions qui commencent par \\TT ne doivent pas être faites par les élèves disposant d'un tiers temps.
  
   Il est fortement conseillé de faire les calculs dans sa tête ou sur la partie blanche de la feuille sans regarder les solutions proposées avant de remplir la bonne case plutôt que d'essayer de choisir entre les propositions (ce qui demande de toutes les examiner et prend donc plus de temps) }
  
  `

  // Ici On ajoute les commandes pour insérer les questions issues des groupes en quantité selon le nb_question[i]
  // nb_question est un tableau passé en paramètre à la fonction creerDocumentAmc pour déterminer le nombre de questions à restituer par groupe.
  // si ce nombre est 0, on restitue toutes les questions du groupe
  let contenuCopie = ''
  if (typeEntete === 'AMCcodeGrid') {
    contenuCopie += '\t \\def\\AMCchoiceLabel##1{}'
  }
  for (const g of groupeDeQuestions) {
    const i = groupeDeQuestions.indexOf(g)
    contenuCopie += `
  \\begin{center}
    \\hrule
    \\vspace{2mm}
    \\bf\\Large ${titreQuestion[i]}
    \\vspace{1mm}
    \\hrule
  \\end{center}\n`
    if (!melangeQuestion[i]) {
      contenuCopie += `\\setgroupmode{${g}}{cyclic}\n\n`
    }
    if (nbQuestions[i] > 0) {
      contenuCopie += `\\restituegroupe[${nbQuestions[i]}]{${g}}\n\n`
    } else {
      contenuCopie += `\\restituegroupe{${g}}\n\n`
    }
  }
  if (format === 'A3') {
    contenuCopie += '\\end{multicols}\n'
  }
  if (typeEntete === 'AMCassociation') {
    contenuCopie += `\\AMCassociation{\\id}\n
    }
  }\n`
  } else {
    contenuCopie += '}\n'
  }

  // On assemble les différents morceaux et on retourne le résultat
  codeLatex = preambule + '\n' + debutDocument + '\n' + enteteCopie + contenuCopie
  if (typeEntete === 'AMCassociation') {
    codeLatex += '\n \n \\csvreader[head to column names]{liste.csv}{}{\\sujet}\n'
  }
  codeLatex += '\\end{document}\n'
  return codeLatex
}

export function dataTailleDiaporama (exercice) {
  if (context.vue !== 'diap') {
    return ''
  } else if (exercice.tailleDiaporama !== 1) {
    return `data-taille = "${exercice.tailleDiaporama}"`
  }
}
function dataTaille (taille) {
  if (context.vue !== 'diap') {
    return ''
  } else if (taille !== 1) {
    return `data-taille = "${taille}"`
  }
}

/**
* Donne une liste d'entiers relatifs dont on connait la somme.
* @example > listeEntiersSommeConnue(4,10,-2)
* < [1,-2,6,5]
* @param {int} nbElements Nombre d'éléments de la liste
* @param {int} total Somme des éléments de la liste (peut être un nombre négatif)
* @param {int} [valMin = 1] Valeur minimale de chaque élément (peut être un nombre négatif)
* @return {Array} Liste d'entiers relatifs
* @author Frédéric PIOU
*/
export function listeEntiersSommeConnue (nbElements, total, valMin = 1) {
  const liste = []
  liste.push(randint(valMin, total - (nbElements - 1) * valMin))
  for (let j = 1; j < nbElements - 1; j++) {
    liste.push(randint(liste[j - 1] + valMin, total - (nbElements - j - 1) * valMin))
  }
  liste.push(total)
  for (let j = nbElements - 1; j > 0; j--) {
    liste[j] = liste[j] - liste[j - 1]
  }
  return liste
}

/**
 * @param {string} expression expression parsée
 * @returns expression en LaTeX avec multication implicite
 * @author Jean-Léon Henry
 */
export function prettyTex (expression) {
  return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
}
