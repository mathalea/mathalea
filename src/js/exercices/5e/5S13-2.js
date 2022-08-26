import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, calcul, shuffle, tableauColonneLigne, texNombre, contraindreValeur, numAlpha, combinaisonListes, arrondi, egalOuApprox } from '../../modules/outils.js'
import { diagrammeBarres } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Calculs de fréquences'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

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

function graphique (hauteursBarres, etiquettes, { reperageTraitPointille = false, couleurDeRemplissage = 'blue', titreAxeVertical = '', titre = '', hauteurDiagramme = 8, coeff = 2, axeVertical = false, etiquetteValeur = true, labelAxeVert = false }) {
  const diagramme = diagrammeBarres(hauteursBarres, etiquettes, { reperageTraitPointille: reperageTraitPointille, couleurDeRemplissage: couleurDeRemplissage, titreAxeVertical: titreAxeVertical, titre: titre, hauteurDiagramme: hauteurDiagramme, coeff: coeff, axeVertical: axeVertical, etiquetteValeur: etiquetteValeur, labelAxeVert: labelAxeVert })
  return mathalea2d(Object.assign({}, fixeBordures([diagramme], { rxmin: -3, rymin: -3, rymax: 1.5 }), { style: 'inline', scale: 0.5 }), diagramme)
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
 * La classe Population sert à construire la série basée sur le theme choisi en paramètre
 */
class Population {
  constructor (theme) {
    // dictionnaires des séries
    const listeThemes = ['etablissement', 'salon', 'parking', 'collection'] // chaque theme est une clé du dictionnaire
    const series = new Map()
    series.set('etablissement', {
      lieu: 'un établissement',
      individus: 'élèves',
      caractere: 'leur sport préféré',
      caracterePourTableau: 'Sports',
      modalites: ['Football', 'Rugby', 'Basket', 'Tennis', 'Judo', 'Handball', 'Volleyball', 'Athlétisme', 'Pingpong']
    })
    series.set('salon', {
      lieu: 'un salon européen de esport',
      individus: 'visiteurs',
      caractere: 'leur pays d\'origine',
      caracterePourTableau: 'Pays',
      modalites: ['France', 'Angleterre', 'Hollande', 'Espagne', 'Italie', 'Belgique', 'Allemagne', 'Portugal', 'Autriche']
    })
    series.set('parking', {
      lieu: 'un parking de supermarché',
      individus: 'voitures',
      caractere: 'leur couleur',
      caracterePourTableau: 'Couleurs',
      modalites: ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert', 'Gris', 'Marron', 'Jaune', 'Orange']
    })
    series.set('collection', {
      lieu: 'une collection',
      individus: 'disques',
      caractere: 'leur style de musique',
      caracterePourTableau: 'Styles',
      modalites: ['Pop', 'Jazz', 'Rap', 'RnB', 'Folk', 'Rock', 'Électro', 'Reggae', 'Soul']
    })
    // construction de la série
    let serie = {}
    if (theme === 'hasard') {
      serie = series.get(choice(listeThemes))
    } else {
      serie = series.get(theme)
    }
    this.lieu = serie.lieu
    this.individus = serie.individus
    this.caractere = serie.caractere
    this.caracterePourTableau = serie.caracterePourTableau
    this.effectifTotal = choice([100, 120, 150, 200, 250, 400, 500, 1000])
    this.modalites = shuffle(serie.modalites.slice(0, randint(5, serie.modalites.length)))
    this.effectifs = listeEntiersDepuisSomme(this.effectifTotal, this.modalites.length)
    this.rangEffectifCache = randint(0, this.modalites.length - 1)
    this.entreeCachee = this.modalites[this.rangEffectifCache]
  }

  getPreambule (styleExo) {
    let preambule = `Dans ${this.lieu} comptant ${this.effectifTotal} ${this.individus}, on a noté ${this.caractere}.<br>`
    switch (styleExo) {
      case 'tableau' :
        preambule += 'On a consigné les résultats dans le tableau suivant :<br><br>'
        break
      case 'diagramme' :
        preambule += 'On a représenté ces données à l\'aide du diagramme ci-dessous.<br><br>'
        break
      default :
        throw Error("Error : styleExo n'est ni tableau, ni diagramme")
    }
    return preambule
  }

  getEntrees () {
    const entrees = new Map()
    for (let i = 0; i < this.modalites.length; i++) {
      entrees.set(this.modalites[i], this.effectifs[i])
    }
    return entrees
  }
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
  this.nbQuestions = 1
  this.nbQuestionsModifiable = true // pourquoi pas ?
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
      '4 : Les deux versions en deux questions (thème du 2e au hasard)'
    ].join('\n')
  ]
  this.sup2 = 1
  this.besoinFormulaire2Numerique = [
    'Thème du contexte', 5, [
      '1 : Au hasard',
      '2 : Établissement scolaire et sports préférés',
      '3 : Salon européen et nationalités des participants',
      '4 : Parking et couleurs des voitures',
      '5 : Collection de disques et styles de musique'
    ].join('\n')
  ]
  const listeDesThemes = ['hasard', 'etablissement', 'salon', 'parking', 'collection']

  /**
   * Les questions non modifiables, seule la physionomie de la consigne change (données en tableau ou en diagramme)...
   * Une seule fonction donc pour générer les questions et leurs corrections identiques pour les deux versions
   * @param {Map} entreesTableau l'objet Map avec les entrees du tableau sport/effectif
   * @param {String} cachee le sport dont on a caché l'effectif
   * @returns liste des questions, liste des corrections
   */
  function questionsEtCorrections (preambule, serie, exercice, numero) {
    let questions = []
    const rangValeurChoisie = randint(0, serie.effectifs.length - 1, serie.rangEffectifCache)
    const frequenceDemandee = arrondi(serie.effectifs[rangValeurChoisie] * 100 / serie.effectifTotal, 1)
    // correction question 1
    let correction1 = '<br>' + numAlpha(0) + `L'effectif manquant est celui du ${serie.entreeCachee.charAt(0).toLocaleLowerCase() + serie.entreeCachee.slice(1)}. Soit $e$ cet effectif.<br>`
    correction1 += `$e=${serie.effectifTotal}-( `
    let first = true
    serie.effectifs.forEach((eff, index) => {
      if (index !== serie.rangEffectifCache) {
        if (first) {
          correction1 += `${eff} `
          first = !first
        } else {
          correction1 += `+ ${eff} `
        }
      }
    })
    correction1 += ')$<br>'
    correction1 += `$e=${serie.effectifTotal}-${calcul(serie.effectifTotal - serie.effectifs[serie.rangEffectifCache])}$<br>`
    correction1 += `$e=${serie.effectifs[serie.rangEffectifCache]}$`
    // correction question 2
    let correction2
    if (!context.isAmc && !exercice.interactif) {
      correction2 = '<br>' + numAlpha(1) + 'Calculs des fréquences.<br><br>'
      correction2 += 'On rappelle que pour la fréquence relative à une valeur est donnée par le quotient : '
      correction2 += '$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$<br><br>'
      correction2 += 'On en déduit donc les calculs suivants :<br><br>'
      const enteteTableau = ['']
      const premiereColonne = []
      const premiereLigneTableau = []
      const deuxiemeLigneTableau = []
      serie.effectifs.forEach((eff, index) => {
        enteteTableau.push(`\\text{${serie.modalites[index]}}`)
        const f = fraction(eff, serie.effectifTotal)
        premiereLigneTableau.push(f.texFraction)
        deuxiemeLigneTableau.push(`${texNombre(f.pourcentage)} \\%`)
      })
      premiereColonne.push('\\textbf{Fréquences}', '\\textbf{Fréquences en pourcentages}')
      correction2 += tableauColonneLigne(enteteTableau, premiereColonne, premiereLigneTableau.concat(deuxiemeLigneTableau))
      correction2 += '<br>'
    } else { // Pas besoin de tableau pour une seule valeur demandée.
      correction2 = '<br>' + numAlpha(1) + `Calcul de la fréquence de la valeur ${serie.modalites[rangValeurChoisie]}.<br><br>`
      correction2 += 'On rappelle que pour la fréquence relative à une valeur est donnée par le quotient : '
      correction2 += '$\\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}$<br><br>'
      correction2 += 'On en déduit donc :<br>'
      const fValeur = fraction(serie.effectifs[rangValeurChoisie], serie.effectifTotal)
      correction2 += `$\\text{Fréquence}_{${serie.modalites[rangValeurChoisie]}}= ${fValeur.texFraction}$<br>`
      correction2 += `$\\text{Fréquence}_{${serie.modalites[rangValeurChoisie]}}${egalOuApprox(serie.effectifs[rangValeurChoisie] * 100 / serie.effectifTotal, 1)}${texNombre(arrondi(fValeur.pourcentage, 1))} \\%$`
    }

    if (!exercice.interactif && !context.isAmc) { // Questions normales pour version non interactive html ou latex
      questions = [preambule,
        '<br>' + numAlpha(0) + 'Déterminer l\'effectif manquant.',
        '<br>' + numAlpha(1) + `Déterminer les fréquences pour chaque ${serie.caractere.substring(5)} (en pourcentage, arrondir au dixième si besoin).`]
    } else {
      if (!context.isAmc) { // Questions pour interactivité html
        setReponse(exercice, numero * 2, serie.effectifs[serie.rangEffectifCache], { formatInteractif: 'calcul' })
        setReponse(exercice, numero * 2 + 1, frequenceDemandee, { formatInteractif: 'calcul' })
        questions = [preambule,
          '<br>' + numAlpha(0) + 'Déterminer l\'effectif manquant.' + ajouteChampTexteMathLive(exercice, numero * 2, 'largeur10 inline'),
          '<br>' + numAlpha(1) + `Déterminer la fréquence de la valeur ${serie.modalites[rangValeurChoisie]} (en pourcentage, arrondir au dixième si besoin).` + ajouteChampTexteMathLive(exercice, numero * 2 + 1, 'largeur10 inline')]
      } else { // Pour AMC, on ne peut pas doubler les questions, il faut les intégrer dans un seul AMCHybride.
        exercice.autoCorrection[numero] = {
          options: { multicols: true },
          enonce: preambule + '<br>' + numAlpha(0) + 'Déterminer l\'effectif manquant.' + '<br>' + numAlpha(1) + `Déterminer la fréquence de la valeur ${serie.modalites[rangValeurChoisie]} (en pourcentage, arrondir au dixième si besoin).`,
          propositions: [
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: correction1 + correction2,
                  reponse: {
                    texte: numAlpha(0),
                    valeur: [serie.effectifs[serie.rangEffectifCache]],
                    param: {
                      digits: 3,
                      decimals: 0,
                      signe: false
                    }
                  }
                }
              ]
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  reponse: {
                    texte: numAlpha(1),
                    valeur: [frequenceDemandee],
                    param: {
                      digits: 3,
                      decimals: 1,
                      signe: false
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    }
    return { questions: questions.join('\n'), corrections: [correction1, correction2].join('\n') }
  }

  /**
   * version 0 :
   * La consigne avec un tableau d'effectifs
   * */
  function exerciceAvecTableau (theme, exercice, numero) { // On a besoin de l'exercice et du numéro de question pour l'interactif
    // paramètres du problème
    const serie = new Population(theme)
    let preambule = serie.getPreambule('tableau')
    // construction du tableau
    const entetesColonnes = [`\\text{\\textbf{${serie.caracterePourTableau}}}`]
    for (const modalite of serie.modalites) {
      entetesColonnes.push(`\\text{${modalite}}`)
    }
    entetesColonnes.push('\\text{\\textbf{TOTAL}}')
    const entetesLignes = ['\\text{\\textbf{Effectifs}}', '\\text{\\textbf{Fréquences}}']
    const cellules = []
    // première ligne des effectifs
    serie.effectifs.forEach((eff, index) => {
      if (index !== serie.rangEffectifCache) {
        cellules.push(eff)
      } else {
        cellules.push('')
      }
    })
    cellules.push(`${serie.effectifTotal}`)
    // deuxième ligne de fréquences (vide)
    for (let i = 0; i <= serie.effectifs.length; i++) { cellules.push('') }
    preambule += tableauColonneLigne(entetesColonnes, entetesLignes, cellules, 1.5)
    preambule += '<br>'
    const texte = questionsEtCorrections(preambule, serie, exercice, numero) // on récupère les questions/réponses en relation
    return { questions: texte.questions, corrections: texte.corrections, effectifs: serie.effectifs } // On ajoute les effectifs pour ne pas avoir de doublons dans les différentes questions
  }

  /**
   * version 1 :
   * La consigne avec un diagramme bâton
   * */
  function exerciceAvecDiagramme (theme, exercice, numero) { // On a besoin de l'exercice et du numéro de question pour l'interactif
    // paramètres du problème
    const serie = new Population(theme)
    let preambule = serie.getPreambule('diagramme')
    // construction du diagramme
    const effectifsSansValeurCachee = serie.effectifs.map((elt, i) => i !== serie.rangEffectifCache ? elt : 0)
    const diagrammeBaton = graphique(effectifsSansValeurCachee, serie.modalites, { reperageTraitPointille: false, axeVertical: true, titreAxeVertical: 'Effectifs', labelAxeVert: true })
    preambule += diagrammeBaton
    const texte = questionsEtCorrections(preambule, serie, exercice, numero) // on,numero récupère les questions/réponses en relation
    return { questions: texte.questions, corrections: texte.corrections, effectifs: serie.effectifs } // On ajoute les effectifs pour ne pas avoir de doublons dans les différentes questions
  }

  // on met tout ensemble
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.sup = contraindreValeur(1, 4, this.sup, 1)
    this.sup2 = contraindreValeur(1, 5, this.sup2, 1)
    const theme = listeDesThemes[this.sup2 - 1]
    const exercice = { questions: [], corrections: [] }
    let transit = {}
    const de = combinaisonListes([0, 1], this.nbQuestions)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (this.sup) {
        case 1: // au hasard
          switch (de[i]) {
            case 0:
              transit = exerciceAvecDiagramme(theme, this, i)
              break
            case 1:
              transit = exerciceAvecTableau(theme, this, i)
              break
          }
          exercice.questions = [transit.questions]
          exercice.corrections = [transit.corrections]
          break
        case 2: // tableau
          transit = exerciceAvecTableau(theme, this, i)
          exercice.questions = [transit.questions]
          exercice.corrections = [transit.corrections]
          break
        case 3: // diagramme
          transit = exerciceAvecDiagramme(theme, this, i)
          exercice.questions = [transit.questions]
          exercice.corrections = [transit.corrections]
          break
        case 4: // les deux
          transit = exerciceAvecTableau(theme, this, i)
          exercice.questions = [transit.questions]
          exercice.corrections = [transit.corrections]
          transit = exerciceAvecDiagramme('hasard', this, i)
          exercice.questions.push(transit.questions)
          exercice.corrections.push(transit.corrections)
      }
      if (this.questionJamaisPosee(i, ...transit.effectifs)) {
        this.listeQuestions.push(...exercice.questions)
        this.listeCorrections.push(...exercice.corrections)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
