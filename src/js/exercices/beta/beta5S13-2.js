import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, calcul, shuffle, tableauColonneLigne, texNombre, contraindreValeur } from '../../modules/outils.js'
import { mathalea2d, fixeBordures, diagrammeBarres } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Calculs de fréquences'

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
    delta = randint(-valeurs[i] + 1, valeurs[i] - 1)
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
    valeurs[valeurs.length - 1] -= r
  }
  return valeurs
}

function graphique (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 8, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false } = {}) {
  const diagramme = diagrammeBarres(hauteursBarres, etiquettes, { reperageTraitPointille: reperageTraitPointille, couleurDeRemplissage: couleurDeRemplissage, titreAxeVertical: titreAxeVertical, titre: titre, hauteurDiagramme: hauteurDiagramme, coeff: coeff, axeVertical: axeVertical, etiquetteValeur: etiquetteValeur, labelAxeVert: labelAxeVert })
  return mathalea2d(Object.assign({}, fixeBordures([diagramme], { rxmin: -3, rymin: -3, rymax: 1.5 }), { style: 'inline', scale: 1.5 }), diagramme)
}

/**
 * Calculs de fréquences sur une série qualitative
 * avec un effectif manquant et l'effectif total donné
 * @author Eve & Sylvain CHAMBON
 * Référence 5S13-2
*/
export default function CalculerDesFrequences () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.nbQuestionsModifiable = false
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 0
  this.besoinFormulaireNumerique = [
    'Type d\'exercice', 2, [
      '0 : Calculer des fréquences à partir d\'un tableau d\'effectifs',
      '1 : Calculer des fréquences à partir d\'un diagramme bâton'
    ].join('\n')
  ]
  const listeSports = ['Football', 'Rugby', 'Basket', 'Tennis', 'Judo', 'Handball', 'Volleyball', 'Athlétisme', 'Pingpong']

  /**
   * Les questions non modifiables, seule la physionomie de la consigne change (données en tableau ou en diagramme)...
   * Une seule fonction donc pour générer les questions et leurs corrections identiques pour les deux versions
   * @param {Map} entreesTableau l'objet Map avec les entrees du tableau sport/effectif
   * @param {String} cachee le sport dont on a caché l'effectif
   * @returns liste des questions, liste des corrections
   */
  function questionsEtCorrections (entreesTableau, cachee) {
    const questions = ['Déterminer l\'effectif manquant.',
      'Déterminer les fréquences pour chaque sport.']
    // correction question 1
    const effTotal = Array.from(entreesTableau.values()).reduce((part, eff) => part + eff, 0)
    let correction1 = `L'effectif manquant est celui du ${cachee.charAt(0).toLocaleLowerCase() + cachee.slice(1)}. Soit $e$ cet effectif.<br>`
    correction1 += `$e=${effTotal}-( `
    let first = true
    for (const [sport, eff] of entreesTableau) {
      if (sport !== cachee) {
        if (first) {
          correction1 += `${eff} `
          first = !first
        } else {
          correction1 += `+ ${eff} `
        }
      }
    }
    correction1 += ')$<br>'
    correction1 += `$e=${effTotal}-${calcul(effTotal - entreesTableau.get(cachee))}$<br>`
    correction1 += `$e=${entreesTableau.get(cachee)}$`
    // correction question 2
    let correction2 = 'Calculs des fréquences.<br><br>'
    correction2 += 'On rappelle que pour la fréquence relative à une valeur est donnée par le quotient : '
    correction2 += '$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$<br><br>'
    correction2 += 'On en déduit donc les calculs suivants :<br><br>'
    for (const [sport, eff] of entreesTableau) {
      const f = fraction(eff, effTotal)
      correction2 += `${sport} :<br>`
      correction2 += `$f_{\\text{${sport}}}=${f.texFraction}$<br>`
      correction2 += `$f_{\\text{${sport}}}=$` + texNombre(f.pourcentage) + ' %<br><br>'
    }
    return { questions: questions, corrections: [correction1, correction2] }
  }

  /**
   * version 0 :
   * La consigne avec un tableau d'effectifs
   * */
  function exerciceAvecTableau () {
    // paramètres du problème
    const effectifTotal = choice([100, 120, 150, 200, 250, 400, 500, 1000])
    const sports = shuffle(listeSports.slice(0, randint(5, listeSports.length)))
    const effectifs = listeEntiersDepuisSomme(effectifTotal, sports.length)
    const rangEffectifCache = randint(0, sports.length - 1)
    const entreeCachee = sports[rangEffectifCache]
    const entrees = new Map()
    for (let i = 0; i < sports.length; i++) {
      entrees.set(sports[i], effectifs[i])
    }
    let consigne = `Dans un établissement de ${effectifTotal} élèves, on a demandé à chacun quel est son sport préféré. `
    consigne += 'On a consigné les résultats dans le tableau suivant :<br><br>'
    // construction du tableau
    const entetesColonnes = ['\\text{\\textbf{Sports}}']
    for (const sport of entrees.keys()) {
      entetesColonnes.push(`\\text{${sport}}`)
    }
    entetesColonnes.push('\\text{\\textbf{TOTAL}}')
    const entetesLignes = ['\\text{\\textbf{Effectifs}}', '\\text{\\textbf{Fréquences}}']
    const cellules = []
    // première ligne des effectifs
    for (let i = 0; i < effectifs.length; i++) {
      if (i !== rangEffectifCache) {
        cellules.push(effectifs[i])
      } else {
        cellules.push('')
      }
    }
    cellules.push(`${effectifTotal}`)
    // deuxième ligne de fréquences (vide)
    for (let i = 0; i <= effectifs.length; i++) { cellules.push('') }
    consigne += tableauColonneLigne(entetesColonnes, entetesLignes, cellules, 1.5)
    const texte = questionsEtCorrections(entrees, entreeCachee) // on récupère les questions/réponses en relation
    return { consigne: consigne, questions: texte.questions, corrections: texte.corrections }
  }

  /**
   * version 1 :
   * La consigne avec un diagramme bâton
   * */
  function exerciceAvecDiagramme () {
    // paramètres du problème
    const effectifTotal = choice([100, 120, 150, 200, 250, 400, 500, 1000])
    const sports = shuffle(listeSports.slice(0, randint(5, listeSports.length)))
    const effectifs = listeEntiersDepuisSomme(effectifTotal, sports.length)
    const rangEffectifCache = randint(0, sports.length - 1)
    const entreeCachee = sports[rangEffectifCache]
    const entrees = new Map()
    for (let i = 0; i < sports.length; i++) {
      entrees.set(sports[i], effectifs[i])
    }
    let consigne = `Dans un établissement de ${effectifTotal} élèves, on a demandé à chacun quel est son sport préféré. `
    consigne += 'On a représenté leurs réponses à l\'aide du diagramme ci dessous.<br><br>'
    // consigne += 'DIAGRAMME ICI !'
    // construction du diagramme
    const effectifsSansValeurCachee = effectifs.map((elt, i) => i !== rangEffectifCache ? elt : 0)
    // const sportsAvecRappelEffectif = sports.map((elt, i) => i !== rangEffectifCache ? elt + ` (${effectifs[i]})` : elt)
    const diagrammeBaton = graphique(effectifsSansValeurCachee, sports, { etiquetteValeur: false, reperageTraitPointille: true, axeVertical: true, titreAxeVertical: 'Effectifs', labelAxeVert: true })
    consigne += diagrammeBaton
    const texte = questionsEtCorrections(entrees, entreeCachee) // on récupère les questions/réponses en relation
    return { consigne: consigne, questions: texte.questions, corrections: texte.corrections }
  }
  // on met tout ensemble
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.sup = contraindreValeur(0, 1, this.sup, 0)
    let exercice = {}
    switch (this.sup) {
      case 0 :
        exercice = exerciceAvecTableau()
        break
      case 1 :
        exercice = exerciceAvecDiagramme()
        break
    }
    // injection !
    this.introduction = exercice.consigne
    this.listeQuestions.push(...exercice.questions)
    this.listeCorrections.push(...exercice.corrections)
    listeQuestionsToContenu(this)
  }
}
