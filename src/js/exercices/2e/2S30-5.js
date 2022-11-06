
import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { choice, listeQuestionsToContenu, numAlpha, premiereLettreEnMajuscule, randint, shuffle, tableauColonneLigne } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { Arbre, texProba } from '../../modules/arbres.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import FractionX from '../../modules/FractionEtendue.js'
export const titre = 'Expérience aléatoire à deux épreuves'
export const dateDePublication = '28/12/2021'
export const dateDeModifImportante = '30/08/2022' // Passage en intégralité interactif

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On doit calculer la probabilité qu'un événement se réalise après une expérience aléatoire à deux épreuves
 * @author Jean-Claude Lhote (et EE pour passage en interactif intégral)
 * Référence 2S30-5
*/
export const uuid = 'cee5d'
export const ref = '2S30-5'
export default function CalculProbaExperience2Epreuves2e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.sup2 = false
  this.tailleDiaporama = 2
  this.sup3 = false
  this.nbQuestions = 1
  this.spacing = 2
  this.spacingCorr = 3

  function unePieceDeuxUrnes (exercice, i, sup, sup2, sup3, numQuestionInteractif) {
    i += numQuestionInteractif
    const p = []
    const choix = randint(0, 2)
    let nombres1, nombres2, n1, n2, urne1, urne2, texte, texteCorr
    if (!sup3) {
      nombres1 = choice([[1, 2, 3], [1, 1, 2], [1, 2, 2], [1, 1, 3]])
      nombres2 = choice([[1, 2, 3], [1, 1, 2], [1, 2, 2], [1, 1, 3]])
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
    const objets = omega.represente(0, 11, 0, sup2 ? 2.5 : 1.2, false, -1, 8) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
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
    texte += sup ? 'On a représenté l\'expérience par l\'arbre ci-dessous<br>' : ''
    texte += sup ? mathalea2d({ xmin: -0.1, xmax: 16, ymin: 0, ymax: 12, zoom: 1.5, scale: 0.6 }, ...objets) : ''
    texte += `<br>Donner la probabilité d'obtenir une boule ${boules[choix]}.` + ajouteChampTexteMathLive(exercice, i, 'largeur15 inline')
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

  function urneDeuxTiragesAvecRemise (exercice, i, sup, sup2, niveau, numQuestionInteractif) { // tirage dans une urne avec remise
    i += numQuestionInteractif
    const [b1Color, b2Color] = shuffle(['bleue', 'rouge', 'verte', 'orange', 'noire', 'jaune']).splice(0, 2)

    const b1Char = premiereLettreEnMajuscule(b1Color.charAt(0))
    const b2Char = premiereLettreEnMajuscule(b2Color.charAt(0))
    const nbBoule1 = randint(1, 3)
    const nbBoule2 = randint(1, 3) //, nbBoule1)
    const ligneEnt = ['\\text{Tirage1\\textbackslash Tirage2}']
    const colonneEnt = []
    const contenu = []
    const card = nbBoule1 + nbBoule2
    const tirage1 = []
    for (let i = 0; i < nbBoule1; i++) {
      tirage1.push(new Arbre({
        nom: `${b1Char}`,
        rationnel: true,
        proba: fraction(1, card),
        visible: false,
        alter: '',
        enfant: [],
        racine: false
      }))
      for (let j = 0; j < nbBoule1; j++) {
        tirage1[i].enfants.push(new Arbre({
          nom: `${b1Char} `,
          rationnel: true,
          proba: fraction(1, card),
          visible: false,
          alter: '',
          enfant: [],
          racine: false
        }))
      }
      for (let j = 0; j < nbBoule2; j++) {
        tirage1[i].enfants.push(new Arbre({
          nom: `${b2Char}`,
          rationnel: true,
          proba: fraction(1, card),
          visible: false,
          alter: '',
          enfant: [],
          racine: false
        }))
      }
    }

    for (let i = 0; i < nbBoule2; i++) {
      tirage1.push(new Arbre({
        nom: `${b2Char}`,
        rationnel: true,
        proba: fraction(1, card),
        visible: false,
        alter: '',
        enfant: [],
        racine: false
      }))
      for (let j = 0; j < nbBoule1; j++) {
        tirage1[i + nbBoule1].enfants.push(new Arbre({
          nom: `${b1Char} `,
          rationnel: true,
          proba: fraction(1, card),
          visible: false,
          alter: '',
          enfant: [],
          racine: false
        }))
      }
      for (let j = 0; j < nbBoule2; j++) {
        tirage1[i + nbBoule1].enfants.push(new Arbre({
          nom: `${b2Char} `,
          rationnel: true,
          proba: fraction(1, card),
          visible: false,
          alter: '',
          enfant: [],
          racine: false
        }))
      }
    }
    const omega = new Arbre({
      nom: '',
      rationnel: true,
      proba: 1,
      visible: false,
      alter: '',
      enfants: tirage1,
      racine: true
    })

    for (let i = 0; i < card; i++) {
      if (i < nbBoule1) {
        ligneEnt.push(`\\text{${b1Char}}`)
        colonneEnt.push(`\\text{${b1Char}}`)
      } else {
        ligneEnt.push(`\\text{${b2Char}}`)
        colonneEnt.push(`\\text{${b2Char}}`)
      }
      for (let j = 0; j < card; j++) {
        contenu.push(`\\text{${tirage1[i].nom + tirage1[i].enfants[j].nom}}`)
      }
    }

    const tableau = tableauColonneLigne(ligneEnt, colonneEnt, contenu)

    omega.setTailles() // On calcule les tailles des arbres.
    const objets = omega.represente(0, 12, 0, sup2 ? 2.5 : 1.4, false, -1, 8) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
    const choix = choice([[nbBoule1, b1Color, b1Char], [nbBoule2, b2Color, b2Char]])
    const probaChoix = fraction(choix[0] ** 2, card ** 2)
    const proba1 = fraction(nbBoule1 ** 2, card ** 2)
    const proba2 = fraction(nbBoule2 ** 2, card ** 2)
    const proba1et2 = proba1.sommeFraction(proba2)
    const proba3 = fraction(nbBoule1 * nbBoule2, card ** 2)
    const proba4 = proba3.multiplieEntier(2)
    let texte = `Dans une urne, il y a ${nbBoule1} boule${nbBoule1 > 1 ? 's' : ''} ${b1Color}${nbBoule1 > 1 && b1Char !== 'O' ? 's' : ''} et ${nbBoule2} boule${nbBoule2 > 1 ? 's' : ''} ${b2Color}${nbBoule2 > 1 && b2Char !== 'O' ? 's' : ''} indiscernables au toucher.<br>`
    texte += 'On tire successivement et avec remise deux boules.<br>'
    texte += `${numAlpha(0)} Déterminer la probabilité d'obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}.`
    texte += ajouteChampTexteMathLive(exercice, i, 'largeur15 inline') + '<br>'
    setReponse(exercice, i, probaChoix, { formatInteractif: 'fractionEgale' })
    texte += `${numAlpha(1)} Déterminer la probabilité d'obtenir deux boules de la même couleur.`
    texte += ajouteChampTexteMathLive(exercice, i + 1, 'largeur15 inline') + '<br>'
    setReponse(exercice, i + 1, proba1et2, { formatInteractif: 'fractionEgale' })
    texte += `${numAlpha(2)} Déterminer la probabilité d'obtenir deux boules de couleurs différentes.`
    texte += ajouteChampTexteMathLive(exercice, i + 2, 'largeur15 inline') + '<br>'
    setReponse(exercice, i + 2, proba4, { formatInteractif: 'fractionEgale' })
    let texteCorr = ''
    texteCorr += 'On a représenté l\'expérience par le tableau ci-dessous :<br>'
    texteCorr += tableau + '<br>'
    texteCorr += `${b1Char} = ${b1Color} et ${b2Char} = ${b2Color}.<br>`
    texteCorr += 'On peut aussi présenter les deux épreuves sous la forme d\'un arbre de dénombrement :<br>'
    texteCorr += mathalea2d({ xmin: 0, xmax: card * 8.5, ymin: 0, ymax: 13, zoom: 0.8, scale: 1/card }, ...objets)
    texteCorr += `<br>${numAlpha(0)} L'événement "obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}" est réalisé par l'issue {${choix[2] + choix[2]}}.`
    texteCorr += ` On comptabilise ${choix[0] ** 2} issues {${choix[2] + choix[2]}} sur ${card ** 2} issues en tout.<br>`
    texteCorr += `La probabilité de cet événement est donc de $${probaChoix.texFraction}${!probaChoix.estIrreductible ? '=' + probaChoix.texFractionSimplifiee : ''}$.<br>`
    texteCorr += `${numAlpha(1)} L'événement "obtenir deux boules de la même couleur" est réalisé par les issues {${b1Char + b1Char}, ${b2Char + b2Char}}.`
    texteCorr += ` On comptabilise ${nbBoule1 ** 2} issues {${b1Char + b1Char}} et   ${nbBoule2 ** 2} issues {${b2Char + b2Char}} sur ${card ** 2} issues en tout.<br>`
    texteCorr += `La probabilité de cet événement est donc de $${proba1.texFraction}+${proba2.texFraction}`
    texteCorr += `=${proba1et2.texFraction}${!proba1et2.estIrreductible ? '=' + proba1et2.texFractionSimplifiee : ''}$.<br>`

    texteCorr += `${numAlpha(2)} L'événement "obtenir deux boules de couleurs différentes" est réalisé par les issues {${b1Char + b2Char}, ${b2Char + b1Char}}.`
    texteCorr += ` On comptabilise ${nbBoule1 * nbBoule2} issues {${b1Char + b2Char}} et autant d'issues {${b2Char + b1Char}} sur ${card ** 2} issues en tout.<br>`
    texteCorr += `La probabilité de cet événement est donc de $2\\times ${proba3.texFraction}=${proba4.texFraction}${!proba4.estIrreductible ? '=' + proba4.texFractionSimplifiee : ''}$.<br>`
    texteCorr += `Une autre façon de faire est de considéré que c'est l'événement contraire de "obtenir deux boules de la même couleur" dont on a calculé la probabilité à la question ${numAlpha(1)}.<br>`
    texteCorr += `On peut donc calculer la probabilité de cet événement en calculant : $1 -${proba1et2.texFractionSimplifiee} = ${proba1et2.entierMoinsFraction(1).texFractionSimplifiee}$.`

    return { texte: texte, texteCorr: texteCorr, alea: [nbBoule1, nbBoule2, b1Char, b2Char] }
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, cpt = 0, question, numQuestionInteractif = 0; i < this.nbQuestions && cpt < 50;) {
      switch (i % 2) {
        case 0: question = unePieceDeuxUrnes(this, i, this.sup, this.sup2, this.sup3, numQuestionInteractif)
          break
        case 1:
          question = urneDeuxTiragesAvecRemise(this, i, this.sup, this.sup2, this.sup3, numQuestionInteractif)
          numQuestionInteractif = +2
          break
      }
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
