import Exercice from '../Exercice.js'
import { choice, listeQuestionsToContenu, randint, shuffle } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { Arbre, texProba } from '../../modules/arbres.js'
import { mathalea2d } from '../../modules/2d.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Expérience aléatoire à deux épreuves'
export const dateDePublication = '28/12/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On doit calculer la probabilité qu'un événement se réalise après une expérience aléatoire à deux épreuves
 * @author Jean-Claude Lhote
 * Référence 2S30-5
*/
export default function CalculProbaExperience2Epreuves3e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.sup2 = false
  this.tailleDiaporama = 2
  this.sup3 = false
  this.nbQuestions = 1
  this.spacing = 2
  this.spacingCorr = 3

  function cas1 (exercice, i, sup, sup2, sup3) {
    const p = []
    const choix = randint(0, 2)
    let nombres1, nombres2, n1, n2, urne1, urne2, texte, texteCorr
    if (!sup3) {
      nombres1 = choice([[1, 2, 3], [1, 1, 2], [1, 2, 2], [1, 1, 3], [1, 1, 1], [2, 2, 2]])
      nombres2 = choice([[1, 2, 3], [1, 1, 2], [1, 2, 2], [1, 1, 3], [1, 1, 1], [2, 2, 2]])
    } else {
      nombres1 = [1, 2, 3]
      nombres2 = [1, 2, 3]
    }
    const B = ['B', 'R', 'V']
    const boules = ['bleue', 'rouge', 'verte']
    do {
      n1 = shuffle(nombres1)
      n2 = shuffle(nombres2)
    } while (n1[0] === n2[0] && n1[1] === n2[1])
    const card1 = n1[0] + n1[1] + n1[2]
    const card2 = n2[0] + n2[1] + n2[2]
    if (sup2) {
      urne1 = new Arbre({
        racine: false,
        rationnel: true,
        nom: 'Pile',
        proba: fraction(0.5),
        visible: true,
        alter: '',
        enfants: []
      })
      urne2 = new Arbre({
        racine: false,
        rationnel: true,
        nom: 'Face',
        proba: fraction(0.5),
        visible: true,
        alter: '',
        enfants: []
      })
      for (let j = 0; j < 3; j++) {
        urne1.enfants.push(new Arbre({ nom: B[j], proba: fraction(n1[j], card1), rationnel: true, visible: true }))
      }
      for (let j = 0; j < 3; j++) {
        urne2.enfants.push(new Arbre({ nom: B[j], proba: fraction(n2[j], card2), rationnel: true, visible: true }))
      }
    } else {
      urne1 = new Arbre({
        racine: false,
        rationnel: true,
        nom: 'Pile',
        proba: fraction(0.5),
        visible: false,
        alter: '',
        enfants: []
      })
      urne2 = new Arbre({
        racine: false,
        rationnel: true,
        nom: 'Face',
        proba: fraction(0.5),
        visible: false,
        alter: '',
        enfants: []
      })
      for (let j = 0; j < 3; j++) {
        for (let b = 0; b < n1[j]; b++) {
          urne1.enfants.push(new Arbre({ nom: B[j], proba: fraction(1, card1), rationnel: true, visible: false }))
        }
      }
      for (let j = 0; j < 3; j++) {
        for (let b = 0; b < n2[j]; b++) {
          urne2.enfants.push(new Arbre({ nom: B[j], proba: fraction(1, card2), rationnel: true, visible: false }))
        }
      }
    }

    // On définit l'arbre complet
    const omega = new Arbre({
      racine: true,
      rationnel: true,
      nom: '',
      proba: 1,
      visible: false,
      alter: '',
      enfants: [
        urne1,
        urne2
      ]
    })

    omega.setTailles() // On calcule les tailles des arbres.
    const objets = omega.represente(0, 11, 0, sup2 ? 2.5 : 1.2, false, -1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
    for (let j = 0; j < 3; j++) {
      p[j] = omega.getProba(B[j], true) // on calcule P(C) décimale.
    }
    texte = 'On lance une pièce équilibrée.<br>'
    texte += "Si la pièce tombe sur 'Pile', on tire une boule dans une urne contenant "
    for (let j = 0; j < 2; j++) {
      texte += `${n1[j]} boule${n1[j] > 1 ? 's' : ''} ${boules[j]}${n1[j] > 1 ? 's' : ''}, `
    }
    texte += ` et ${n1[2]} boule${n1[2] > 1 ? 's' : ''} ${boules[2]}${n1[2] > 1 ? 's' : ''}.<br>`
    texte += "Si la pièce tombe sur 'Face', on tire une boule dans une urne contenant "
    for (let j = 0; j < 2; j++) {
      texte += `${n2[j]} boule${n2[j] > 1 ? 's' : ''} ${boules[j]}${n2[j] > 1 ? 's' : ''}, `
    }
    texte += ` et ${n2[2]} boule${n2[2] > 1 ? 's' : ''} ${boules[2]}${n2[2] > 1 ? 's' : ''}.<br>`
    texte += sup ? 'On a représenté l\'expérience par l\'arbre ci-dessous' : ''
    texte += sup ? mathalea2d({ xmin: -0.1, xmax: 16, ymin: 0, ymax: 12 }, ...objets) : ''
    texte += `Donner la probabilité d'obtenir une boule ${boules[choix]}.` + ajouteChampTexteMathLive(exercice, i, 'largeur15 inline')
    setReponse(exercice, i, new FractionX(p[choix].n, p[choix].d), { formatInteractif: 'fractionEgale' })
    texteCorr = "La probabilité que la pièce tombe sur 'Pile' est de $\\dfrac{1}{2}$ et "
    texteCorr += `la probabilité de tirer une boule ${boules[choix]} dans la première urne est de $${texProba(urne1.getProba(B[choix], true), true)}$.<br>`
    texteCorr += `La probabilité de l'issue ('Pile','${boules[choix]}') est donc : $\\dfrac{1}{2}\\times ${texProba(urne1.getProba(B[choix], true), true)}=${texProba(fraction(n1[choix], 2 * card1), true)}$.<br>`
    texteCorr += "La probabilité que la pièce tombe sur 'Face' est de $\\dfrac{1}{2}$ et "
    texteCorr += `la probabilité de tirer une boule ${boules[choix]} dans la deuxième urne est de $${texProba(urne2.getProba(B[choix], true), true)}$.<br>`
    texteCorr += `La probabilité de l'issue ('Face','${boules[choix]}') est donc : $\\dfrac{1}{2}\\times ${texProba(urne2.getProba(B[choix], true), true)}=${texProba(fraction(n2[choix], 2 * card2), true)}$.<br>`
    texteCorr += `L'événement 'obtenir une boule ${boules[choix]}' est réalisé par les issues ('Pile','${boules[choix]}') et ('Face','${boules[choix]}'), donc sa probabilité est la somme des probabilités calculées ci-dessus.<br>`
    texteCorr += `La probabilité d'obtenir une boule ${boules[choix]} est donc de $${texProba(fraction(n1[choix], 2 * card1), true)}+${texProba(fraction(n2[choix], 2 * card2), true)}=${texProba(p[choix], true)}$.`

    return { texte: texte, texteCorr: texteCorr, alea: [...n1, ...n2] }
  }

  /* function cas2 (exercice, i, sup, sup2, niveau) {
    return { texte: texte, texteCorr: texteCorr, alea: [] }
  }
*/
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, cpt = 0, question; i < this.nbQuestions && cpt < 50;) {
      // On choisit les probas de l'arbre
      console.log(fraction('0.(123)'))
      question = cas1(this, i, this.sup, this.sup2, this.sup3)
      if (this.questionJamaisPosee(i, ...question.alea)) {
        this.listeQuestions.push(question.texte)
        this.listeCorrections.push(question.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec arbre', false]
  this.besoinFormulaire2CaseACocher = ['Arbre pondéré', false]
  this.besoinFormulaire3CaseACocher = ['Équiprobabilité', false]
}
