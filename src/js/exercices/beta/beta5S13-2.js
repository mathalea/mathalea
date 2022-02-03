import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, calcul, shuffle, tableauColonneLigne, texNombre, contraindreValeur, numAlpha } from '../../modules/outils.js'
import { mathalea2d, fixeBordures, diagrammeBarres } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Calculs de fréquences'

/**
|*  888    888          888
|*  888    888          888
|*  888    888          888
|*  8888888888  .d88b.  888 88888b.   .d88b.  888d888 .d8888b
|*  888    888 d8P  Y8b 888 888 "88b d8P  Y8b 888P"   88K
|*  888    888 88888888 888 888  888 88888888 888     "Y8888b.
|*  888    888 Y8b.     888 888 d88P Y8b.     888          X88
|*  888    888  "Y8888  888 88888P"   "Y8888  888      88888P'
|*                          888
|*                          888
|*                          888
 */

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
|*  8888888888                                    d8b
|*  888                                           Y8P
|*  888
|*  8888888    888  888  .d88b.  888d888  .d8888b 888  .d8888b  .d88b.
|*  888        `Y8bd8P' d8P  Y8b 888P"   d88P"    888 d88P"    d8P  Y8b
|*  888          X88K   88888888 888     888      888 888      88888888
|*  888        .d8""8b. Y8b.     888     Y88b.    888 Y88b.    Y8b.
|*  8888888888 888  888  "Y8888  888      "Y8888P 888  "Y8888P  "Y8888
*/

/**
 * Calculs de fréquences sur une série qualitative
 * avec un effectif manquant et l'effectif total donné
 * @author Eve & Sylvain CHAMBON
 * Référence 5S13-2
*/
export default function CalculerDesFrequences () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.spacing = 1
  this.spacingCorr = 1.5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.besoinFormulaireNumerique = [
    'Type d\'exercice', 4, [
      '1 : Choix d\'un exercice aléatoire parmi les deux versions',
      '2 : Calculer des fréquences à partir d\'un tableau d\'effectifs',
      '3 : Calculer des fréquences à partir d\'un diagramme bâton',
      '4 : Les deux versions en deux questions'
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
  function questionsEtCorrections (preambule, entreesTableau, cachee) {
    const questions = [preambule,
      '<br>' + numAlpha(0) + 'Déterminer l\'effectif manquant.',
      '<br>' + numAlpha(1) + 'Déterminer les fréquences pour chaque sport (en pourcentage, arrondir au dixième si besoin).']
    // correction question 1
    const effTotal = Array.from(entreesTableau.values()).reduce((part, eff) => part + eff, 0)
    let correction1 = '<br>' + numAlpha(0) + `L'effectif manquant est celui du ${cachee.charAt(0).toLocaleLowerCase() + cachee.slice(1)}. Soit $e$ cet effectif.<br>`
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
    let correction2 = '<br>' + numAlpha(1) + 'Calculs des fréquences.<br><br>'
    correction2 += 'On rappelle que pour la fréquence relative à une valeur est donnée par le quotient : '
    correction2 += '$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$<br><br>'
    correction2 += 'On en déduit donc les calculs suivants :<br><br>'
    const enteteTableau = ['']
    const premiereColonne = []
    const premiereLigneTableau = []
    const deuxiemeLigneTableau = []
    for (const [sport, eff] of entreesTableau) {
      enteteTableau.push(`\\text{${sport}}`)
      const f = fraction(eff, effTotal)
      premiereLigneTableau.push(f.texFraction)
      deuxiemeLigneTableau.push(`${texNombre(f.pourcentage)} \\%`)
      // correction2 += `${sport} :<br>`
      // correction2 += `$f_{\\text{${sport}}}=${f.texFraction}$<br>`
      // correction2 += `$f_{\\text{${sport}}}=$` + texNombre(f.pourcentage) + ' %<br><br>'
    }
    premiereColonne.push('\\textbf{Fréquences}', '\\textbf{Fréquences en pourcentages}')
    correction2 += tableauColonneLigne(enteteTableau, premiereColonne, premiereLigneTableau.concat(deuxiemeLigneTableau))
    correction2 += '<br>'
    return { questions: questions.join('\n'), corrections: [correction1, correction2].join('\n') }
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
    let preambule = `Dans un établissement de ${effectifTotal} élèves, on a demandé à chacun quel est son sport préféré. `
    preambule += 'On a consigné les résultats dans le tableau suivant :<br><br>'
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
    preambule += tableauColonneLigne(entetesColonnes, entetesLignes, cellules, 1.5)
    preambule += '<br>'
    const texte = questionsEtCorrections(preambule, entrees, entreeCachee) // on récupère les questions/réponses en relation
    return { questions: texte.questions, corrections: texte.corrections }
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
    let preambule = `Dans un établissement de ${effectifTotal} élèves, on a demandé à chacun quel est son sport préféré. `
    preambule += 'On a représenté leurs réponses à l\'aide du diagramme ci dessous.<br><br>'
    // construction du diagramme
    const effectifsSansValeurCachee = effectifs.map((elt, i) => i !== rangEffectifCache ? elt : 0)
    const diagrammeBaton = graphique(effectifsSansValeurCachee, sports, { etiquetteValeur: false, reperageTraitPointille: false, axeVertical: true, titreAxeVertical: 'Effectifs', labelAxeVert: true })
    preambule += diagrammeBaton
    const texte = questionsEtCorrections(preambule, entrees, entreeCachee) // on récupère les questions/réponses en relation
    return { questions: texte.questions, corrections: texte.corrections }
  }

  // on met tout ensemble
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    const exercice = { questions: [], corrections: [] }
    let transit = {}
    const de = randint(0, 1)
    switch (this.sup) {
      case 1 : // au hasard
        if (de === 0) {
          transit = exerciceAvecDiagramme()
        } else {
          transit = exerciceAvecTableau()
        }
        exercice.questions = [transit.questions]
        exercice.corrections = [transit.corrections]
        break
      case 2 : // tableau
        transit = exerciceAvecTableau()
        exercice.questions = [transit.questions]
        exercice.corrections = [transit.corrections]
        break
      case 3 : // diagramme
        transit = exerciceAvecDiagramme()
        exercice.questions = [transit.questions]
        exercice.corrections = [transit.corrections]
        break
      case 4 : // les deux
        transit = exerciceAvecTableau()
        exercice.questions = [transit.questions]
        exercice.corrections = [transit.corrections]
        transit = exerciceAvecDiagramme()
        exercice.questions.push(transit.questions)
        exercice.corrections.push(transit.corrections)
    }
    console.log(exercice)
    this.listeQuestions.push(...exercice.questions)
    this.listeCorrections.push(...exercice.corrections)

    listeQuestionsToContenu(this)
  }
}
