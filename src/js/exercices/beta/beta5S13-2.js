import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, listeEntiersSommeConnue, calcul } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Calculs de fréquences'
// On renvoie un entier aléatoire entre une valeur min (incluse)
// et une valeur max (incluse).
// Attention : si on utilisait Math.round(), on aurait une distribution
// non uniforme !
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Construit un tableau d'entiers de longueur connue
 * dont la somme des éléments est égale à un total connu.
 * @author Eve & Sylvain Chambon
 * @param {int} nbElements Nombre d'entiers dans le tableau
 * @param {int} total Somme des éléments du tableau
 * @returns {Array} Tableau d'entier
 * @example > listeEntiersDepuisSomme(100,3)
 * < [34,29,37]
 */
function listeEntiersDepuisSomme (total, nbElements) {
  const valeurs = new Array(nbElements)
  // Répartition équitable du total dans les éléments du tableau
  const quotient = Math.floor(total / nbElements)
  const reste = total % nbElements
  for (let i = 0; i < valeurs.length - 1; i++) {
    valeurs[i] = quotient
  }
  valeurs[valeurs.length - 1] = quotient + reste
  // Changement des valeurs
  for (let i = 0, delta = 0; i < valeurs.length - 2; i++) {
    // création du delta
    delta = getRandomIntInclusive(-valeurs[i] + 1, valeurs[i] - 1)
    valeurs[i] += delta
    // répartition du delta entre les valeurs restantes du tableau
    const diviseur = valeurs.length - i - 2
    let q = 0
    if (delta >= 0) {
      q = Math.floor(delta / diviseur)
    } else {
      q = Math.ceil(delta / diviseur)
    }
    const r = delta % diviseur
    for (let j = i + 1; j < valeurs.length - 1; j++) {
      valeurs[j] -= q
    }
    valeurs[j] -= r
  }
  return valeurs
}

/**
 * Calculs de fréquences sur une série qualitative
 * avec un effectif manquant et l'effectif total donné
 * @author Eve & Sylvain CHAMBON
 * Référence 5S13-2
*/
export default function CalculerDesFrequences () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculs de fréquences'
  this.nbQuestions = 2
  this.nbQuestionsModifiable = false
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  // paramètres du problème
  const listeSports = ['Football', 'Rugby', 'Basket', 'Tennis', 'Judo', 'Handball', 'Volleyball', 'Athlétisme', 'Pingpong', 'Natation', 'Badminton']
  const effectifTotal = choice([100, 120, 150, 200, 250, 400, 500, 1000])
  const sports = listeSports.slice(0, randint(5, listeSports.length))
  const effectifs = listeEntiersDepuisSomme(effectifTotal, sports.length)
  const rangEffectifCache = randint(0, sports.length - 1)
  const entrees = new Map()
  for (let i = 0; i < sports.length; i++) {
    entrees.set(sports[i], effectifs[i])
  }
  let textConsigne = `Entrées (${sports.length}, ${sports[rangEffectifCache]}) -- Total (${effectifTotal}): <br>`
  for (const [sport, eff] of entrees) { textConsigne += sport + ' => ' + (sport !== sports[rangEffectifCache] ? eff : '') + '<br>' }
  this.introduction = textConsigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const question1 = 'Déterminer l\'effectif manquant.'
    const question2 = 'Calculer les fréquences correspondant à chaque sport.'
    // correction question 1
    let correction1 = `L'effectif manquant est celui du ${sports[rangEffectifCache]}. Soit $e$ cet effectif.<br>`
    correction1 += `$e=${effectifTotal}-( `
    for (const [sport, eff] of entrees) {
      if (sport !== sports[rangEffectifCache]) {
        correction1 += `+ ${eff} `
      }
    }
    correction1 += ')$<br>'
    correction1 += `$e=${effectifTotal}-${calcul(effectifs.reduce((part, eff) => part + eff, 0) - effectifs[rangEffectifCache])}$<br>`
    correction1 += `$e=${entrees.get(sports[rangEffectifCache])}$`
    // correction question 2
    let correction2 = 'Calculs des fréquences :<br>'
    for (const [sport, eff] of entrees) {
      const f = fraction(eff, effectifTotal)
      correction2 += `${sport} :<br>`
      correction2 += `$f_{${sport}}=${f.texFraction}$<br>`
      correction2 += `$f_{${sport}}=${f.pourcentage} $%<br><br>`
    }
    this.listeQuestions.push(question1, question2)
    this.listeCorrections.push(correction1, correction2)
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3];
}
