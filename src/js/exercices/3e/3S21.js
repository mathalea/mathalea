import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { choice, combinaisonListesSansChangerOrdre, contraindreValeur, listeQuestionsToContenu, numAlpha, premiereLettreEnMajuscule, randint, rangeMinMax, shuffle, tableauColonneLigne } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { Arbre } from '../../modules/arbres.js'

import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Expérience aléatoire à deux épreuves'
export const dateDePublication = '15/01/2022'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * On doit calculer la probabilité qu'un événement se réalise après une expérience aléatoire à deux épreuves
 * @author Jean-Claude Lhote
 * Référence 3S21
*/
export const uuid = '76230'
export const ref = '3S21'
export default function CalculProbaExperience2Epreuves3e () {
  Exercice.call(this) // Héritage de la classe Exercice()

  this.besoinFormulaireTexte = ['Type de question', 4, '1 : Deux épreuves\n2 : Deux épreuves avec Remise\n3 : Deux épreuves sans remise\n4 : Mélange']
  this.sup = 1
  this.tailleDiaporama = 1
  this.nbQuestions = 1
  this.spacing = context.isHtml ? 2 : 1.5
  this.spacingCorr = context.isHtml ? 2 : 1.5
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let QuestionsDisponibles = []

    if (!this.sup) { // Si aucune liste n'est saisie
      QuestionsDisponibles = rangeMinMax(1, 3)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        QuestionsDisponibles[0] = contraindreValeur(1, 3, this.sup, 2)
      } else {
        QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          QuestionsDisponibles[i] = contraindreValeur(1, 3, parseInt(QuestionsDisponibles[i]), 2) // parseInt en fait un tableau d'entiers
        }
        this.nbQuestions = Math.max(this.nbQuestions, QuestionsDisponibles.length)
      }
    }
    QuestionsDisponibles = combinaisonListesSansChangerOrdre(QuestionsDisponibles, this.nbQuestions)
    for (let i = 0, cpt = 0, NoQuestion = 0, question; i < this.nbQuestions && cpt < 50;) {
      switch (QuestionsDisponibles[i]) {
        case 1: question = unePieceDeuxUrnes(this, NoQuestion, true, false, true)
          break
        case 2: question = urneDeuxTiragesAvecRemise(this, NoQuestion, true, false, true)
          break
        case 3: question = urneDeuxTiragesSansRemise(this, NoQuestion, true, false, true)
          break
      }

      if (this.questionJamaisPosee(i, ...question.alea)) {
        this.listeQuestions.push(question.texte)
        this.listeCorrections.push(question.texteCorr)
        NoQuestion = question.NoQuestion
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

// On Tire à pile ou face pour choisir une urne puis on tire une boule.
function unePieceDeuxUrnes (exercice, NoQuestion, sup, sup2, sup3) {
  const p = []
  const choix1 = randint(0, 2)
  const choix2 = randint(0, 2, choix1)
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
  const objets = omega.represente(0, 11, 0, sup2 ? 2.5 : 1.2, false, -1, 6) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
  for (let j = 0; j < 3; j++) {
    p[j] = omega.getProba(B[j], true) // on calcule P(C) décimale.
  }
  texte = 'On lance une pièce équilibrée.<br>'
  texte += 'Si la pièce tombe sur «Pile», on tire une boule dans une urne contenant '
  for (let j = 0; j < 2; j++) {
    texte += `${n1[j]} boule${n1[j] > 1 ? 's' : ''} ${boules[j]}${n1[j] > 1 ? 's' : ''}, `
  }
  texte += ` et ${n1[2]} boule${n1[2] > 1 ? 's' : ''} ${boules[2]}${n1[2] > 1 ? 's' : ''}.<br>`
  texte += 'Si la pièce tombe sur «Face», on tire une boule dans une urne contenant '
  for (let j = 0; j < 2; j++) {
    texte += `${n2[j]} boule${n2[j] > 1 ? 's' : ''} ${boules[j]}${n2[j] > 1 ? 's' : ''}, `
  }
  texte += ` et ${n2[2]} boule${n2[2] > 1 ? 's' : ''} ${boules[2]}${n2[2] > 1 ? 's' : ''}.<br>`
  texte += sup ? 'On a représenté l\'expérience par l\'arbre ci-dessous :<br>' : ''
  texte += sup ? mathalea2d({ xmin: -0.1, xmax: 16, ymin: 0, ymax: 12, zoom: 1.3, scale: 0.5 }, ...objets) + '<br>' : ''
  texte += `Légende : ${B[0]} = ${boules[0]} ; ${B[1]} = ${boules[1]} ; ${B[2]} = ${boules[2]}<br>`
  let q = 0
  if (!exercice.interactif && !context.isAmc) {
    texte += `${numAlpha(q)} Construire un tableau à double entrée des issues de cette expérience aléatoire.<br>`
    q++
  }
  const pileOuFace = choice(['Pile', 'Face'])
  const nbBouleC = pileOuFace === 'Pile' ? n1[choix1] : n2[choix1]
  const card = pileOuFace === 'Pile' ? card1 : card2
  const proba1 = fraction(nbBouleC, card)
  const proba2 = fraction(n1[choix2] + n2[choix2], card1 + card2)
  const urne = pileOuFace === 'Pile' ? 'première' : 'deuxième'
  texte += `${numAlpha(q)} On vient de faire «${pileOuFace}». Donner la probabilité d'obtenir une boule ${boules[choix1]}.` + ajouteChampTexteMathLive(exercice, NoQuestion, 'largeur15 inline') + '<br>'
  q++
  texte += `${numAlpha(q)} On recommence l'expérience au début. Donner la probabilité d'obtenir une boule ${boules[choix2]}.` + ajouteChampTexteMathLive(exercice, NoQuestion + 1, 'largeur15 inline') + '<br>'
  q++
  const ligneEnt = ['\\text{Pièce \\textbackslash Boules}']
  const colonneEnt = ['\\text{Pile}', '\\text{Face}']
  const contenu = []
  for (let i = 0; i < 3; i++) {
    ligneEnt.push(boules[i])
    contenu.push(n1[i])
  }
  for (let i = 0; i < 3; i++) {
    contenu.push(n2[i])
  }

  const tableau = tableauColonneLigne(ligneEnt, colonneEnt, contenu)
  q = 0
  texteCorr = ''
  if (!exercice.interactif && !context.isAmc) {
    texteCorr += `${numAlpha(q)} L'issue «Pile-${boules[0]}» peut être obtenue de ${n1[0]} façon${n1[0] > 1 ? 's' : ''} et l'issue «Pile-${boules[1]}» peut être obtenue de ${n1[1]} façon${n1[1] > 1 ? 's' : ''}.<br>`
    texteCorr += 'Voici un tableau à double entrée qui représente toutes les issues de cette expérience.<br><br>'
    q++
  }
  texteCorr += tableau + '<br><br>'
  texteCorr += `${numAlpha(q)} Comme on a fait ${pileOuFace}», on va tirer une boule dans la ${urne} urne où il y a ${nbBouleC} boule${nbBouleC > 1 ? 's' : ''} ${boules[choix1]}${nbBouleC > 1 ? 's' : ''} sur ${card} boules.<br>`
  if (!context.isAMC) setReponse(exercice, NoQuestion, proba1, { formatInteractif: 'fractionEgale' })
  q++
  texteCorr += `La probabilité de cet événement est donc de $${proba1.texFraction}${!proba1.estIrreductible ? '=' + proba1.texFractionSimplifiee : ''}$.<br>`
  texteCorr += `${numAlpha(q)} Il y a équiprobabilité entre toutes les issues du tableau car, d'une part, la pièce est équilibrée et, d'autre part, chaque urne contient 6 boules.<br>`
  texteCorr += `Il y a ${n1[choix2] + n2[choix2]} issues avec une boule ${boules[choix2]} sur ${card1 + card2} issues en tout. La probabilité de cet événement est donc de $${proba2.texFraction}${!proba2.estIrreductible ? '=' + proba2.texFractionSimplifiee : ''}$.<br>`
  if (!context.isAMC) setReponse(exercice, NoQuestion + 1, proba2, { formatInteractif: 'fractionEgale' })

  return { texte: texte, texteCorr: texteCorr, alea: [...n1, ...n2], NoQuestion: NoQuestion + 2 }
}

// On tire deux boules dans une urne avec remise
function urneDeuxTiragesAvecRemise (exercice, NoQuestion, sup, sup2, niveau) { // tirage dans une urne avec remise
  const [b1Color, b2Color] = shuffle(['bleue', 'rouge', 'verte', 'orange', 'noire', 'jaune']).splice(0, 2)

  const b1Char = premiereLettreEnMajuscule(b1Color.charAt(0))
  const b2Char = premiereLettreEnMajuscule(b2Color.charAt(0))
  const nbBoule1 = randint(1, 3)
  const nbBoule2 = nbBoule1 === 1 ? randint(2, 4) : randint(1, 3, nbBoule1)
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

  for (let i = 0; i < 2; i++) {
    ligneEnt.push(`${i === 0 ? '\\text{' + b1Color + '}' : '\\text{' + b2Color + '}'}`)
    colonneEnt.push(`${i === 0 ? '\\text{' + b1Color + '}' : '\\text{' + b2Color + '}'}`)
    for (let j = 0; j < 2; j++) {
      contenu.push((i === 0 ? nbBoule1 : nbBoule2) * (j === 0 ? nbBoule1 : nbBoule2))
    }
  }
  const tableau = tableauColonneLigne(ligneEnt, colonneEnt, contenu)

  omega.setTailles() // On calcule les tailles des arbres.
  const objets = omega.represente(0, 12, 0, sup2 ? 2.5 : 1.6, false, -1, 6) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
  const choix = choice([[nbBoule1, b1Color, b1Char], [nbBoule2, b2Color, b2Char]])
  const probaChoix = fraction(choix[0] ** 2, card ** 2)
  const proba1 = fraction(nbBoule1 ** 2, card ** 2)
  const proba2 = fraction(nbBoule2 ** 2, card ** 2)
  const proba1et2 = proba1.sommeFraction(proba2)
  const proba3 = fraction(nbBoule1 * nbBoule2, card ** 2)
  const proba4 = proba3.multiplieEntier(2)
  let texte = `Dans une urne, il y a ${nbBoule1} boule${nbBoule1 > 1 ? 's' : ''} ${b1Color}${nbBoule1 > 1 && b1Char !== 'O' ? 's' : ''} et ${nbBoule2} boule${nbBoule2 > 1 ? 's' : ''} ${b2Color}${nbBoule2 > 1 && b2Char !== 'O' ? 's' : ''} indicernables au toucher.<br>`
  texte += 'On tire successivement et avec remise deux boules.<br>'
  texte += `${numAlpha(0)} Déterminer la probabilité d'obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}.` + ajouteChampTexteMathLive(exercice, NoQuestion, 'largeur10 inline') + '<br>'
  texte += `${numAlpha(1)} Déterminer la probabilité d'obtenir deux boules de la même couleur.` + ajouteChampTexteMathLive(exercice, NoQuestion + 1, 'largeur10 inline') + '<br>'
  texte += `${numAlpha(2)} Déterminer la probabilité d'obtenir deux boules de couleurs différentes.` + ajouteChampTexteMathLive(exercice, NoQuestion + 2, 'largeur10 inline') + '<br>'
  let texteCorr = `L'issue «${b1Color}-${b1Color}» peut être obtenue de ${contenu[0]} façon${contenu[0] > 1 ? 's' : ''} et l'issue «${b1Color}-${b2Color}» peut être obtenue de ${contenu[1]} façon${contenu[1] > 1 ? 's' : ''}.<br>`
  texteCorr += 'Voici un tableau à double entrée qui représente toutes les issues de cette expérience.<br><br>'
  texteCorr += tableau + '<br><br>'
  texteCorr += 'On peut aussi présenter les deux épreuves sous la forme d\'un arbre de dénombrement :<br>'
  texteCorr += mathalea2d({ xmin: 0, xmax: card * 8.5, ymin: 0, ymax: 13, zoom: 0.8, scale: 9 / card / card }, ...objets) + '<br>'
  texteCorr += `Légende : ${b1Char} = ${b1Color} et ${b2Char} = ${b2Color}.<br>`
  texteCorr += `${numAlpha(0)} L'événement «obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}» est réalisé par l'issue {${choix[2] + choix[2]}}.`
  texteCorr += ` On comptabilise ${choix[0] ** 2} issues {${choix[2] + choix[2]}} sur ${card ** 2} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $${probaChoix.texFraction}${!probaChoix.estIrreductible ? '=' + probaChoix.texFractionSimplifiee : ''}$.<br>`
  texteCorr += `${numAlpha(1)} L'événement «obtenir deux boules de la même couleur» est réalisé par les issues {${b1Char + b1Char}, ${b2Char + b2Char}}.`
  texteCorr += ` On comptabilise ${nbBoule1 ** 2} issues {${b1Char + b1Char}} et   ${nbBoule2 ** 2} issues {${b2Char + b2Char}} sur ${card ** 2} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $${proba1.texFraction}+${proba2.texFraction}`
  texteCorr += `=${proba1et2.texFraction}${!proba1et2.estIrreductible ? '=' + proba1et2.texFractionSimplifiee : ''}$.<br>`

  texteCorr += `${numAlpha(2)} L'événement «obtenir deux boules de couleurs différentes» est réalisé par les issues {${b1Char + b2Char}, ${b2Char + b1Char}}.`
  texteCorr += ` On comptabilise ${nbBoule1 * nbBoule2} issues {${b1Char + b2Char}} et autant d'issues {${b2Char + b1Char}} sur ${card ** 2} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $2\\times ${proba3.texFraction}=${proba4.texFraction}${!proba4.estIrreductible ? '=' + proba4.texFractionSimplifiee : ''}$.<br>`
  texteCorr += `Une autre façon de faire est de considérer que c'est l'événement contraire de «obtenir deux boules de la même couleur» dont on a calculé la probabilité à la question ${numAlpha(1)}.<br>`
  texteCorr += `On peut donc calculer la probabilité de cet événement en calculant : $1 -${proba1et2.texFractionSimplifiee} = ${proba1et2.entierMoinsFraction(1).texFractionSimplifiee}$.`
  if (!context.isAMC) setReponse(exercice, NoQuestion, probaChoix, { formatInteractif: 'fractionEgale' })
  if (!context.isAMC) setReponse(exercice, NoQuestion + 1, proba1et2, { formatInteractif: 'fractionEgale' })
  if (!context.isAMC) setReponse(exercice, NoQuestion + 2, proba4, { formatInteractif: 'fractionEgale' })

  return { texte: texte, texteCorr: texteCorr, alea: [nbBoule1, nbBoule2, b1Char, b2Char], NoQuestion: NoQuestion + 3 }
}

// On tire deux boules dans une urne sans remise
function urneDeuxTiragesSansRemise (exercice, NoQuestion, sup, sup2, niveau) { // tirage dans une urne avec remise
  const [b1Color, b2Color] = shuffle(['bleue', 'rouge', 'verte', 'orange', 'noire', 'jaune']).splice(0, 2)

  const b1Char = premiereLettreEnMajuscule(b1Color.charAt(0))
  const b2Char = premiereLettreEnMajuscule(b2Color.charAt(0))
  const nbBoule1 = randint(2, 3)
  const nbBoule2 = randint(2, 3, nbBoule1)
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
    for (let j = 0; j < nbBoule1 - 1; j++) {
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
    for (let j = 0; j < nbBoule2 - 1; j++) {
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

  for (let i = 0; i < 2; i++) {
    ligneEnt.push(`${i === 0 ? '\\text{' + b1Color + '}' : '\\text{' + b2Color + '}'}`)
    colonneEnt.push(`${i === 0 ? '\\text{' + b1Color + '}' : '\\text{' + b2Color + '}'}`)
    for (let j = 0; j < 2; j++) {
      contenu.push(i === 0 ? (j === 0 ? (nbBoule1 - 1) * nbBoule1 : nbBoule1 * nbBoule2) : (j === 0 ? nbBoule1 * nbBoule2 : nbBoule2 * (nbBoule2 - 1)))
    }
  }

  const tableau = tableauColonneLigne(ligneEnt, colonneEnt, contenu)

  omega.setTailles() // On calcule les tailles des arbres.
  const objets = omega.represente(0, 12, 0, sup2 ? 2.5 : 1.6, false, -1, 6) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
  const choix = choice([[nbBoule1, b1Color, b1Char], [nbBoule2, b2Color, b2Char]])
  const probaChoix = fraction(choix[0] ** 2 - choix[0], card ** 2 - card)
  const proba1 = fraction(nbBoule1 ** 2 - nbBoule1, card ** 2 - card)
  const proba2 = fraction(nbBoule2 ** 2 - nbBoule2, card ** 2 - card)
  const proba1et2 = proba1.sommeFraction(proba2)
  const proba3 = fraction(nbBoule1 * nbBoule2, card ** 2 - card)
  const proba4 = proba3.multiplieEntier(2)
  let texte = `Dans une urne, il y a ${nbBoule1} boule${nbBoule1 > 1 ? 's' : ''} ${b1Color}${nbBoule1 > 1 && b1Char !== 'O' ? 's' : ''} et ${nbBoule2} boule${nbBoule2 > 1 ? 's' : ''} ${b2Color}${nbBoule2 > 1 && b2Char !== 'O' ? 's' : ''} indicernables au toucher.<br>`
  texte += 'On tire successivement et sans remise deux boules.<br>'
  texte += `${numAlpha(0)} Déterminer la probabilité d'obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}.` + ajouteChampTexteMathLive(exercice, NoQuestion, 'largeur10 inline') + '<br>'
  texte += `${numAlpha(1)} Déterminer la probabilité d'obtenir deux boules de la même couleur.` + ajouteChampTexteMathLive(exercice, NoQuestion + 1, 'largeur10 inline') + '<br>'
  texte += `${numAlpha(2)} Déterminer la probabilité d'obtenir deux boules de couleurs différentes.` + ajouteChampTexteMathLive(exercice, NoQuestion + 2, 'largeur10 inline') + '<br>'
  let texteCorr = `L'issue «${b1Color}-${b1Color}» peut être obtenue de ${contenu[0]} façon${contenu[0] > 1 ? 's' : ''} et l'issue «${b1Color}-${b2Color}» peut être obtenue de ${contenu[1]} façon${contenu[1] > 1 ? 's' : ''}.<br>`
  texteCorr += 'On a représenté les issues de l\'expérience par le tableau ci-dessous :<br><br>'
  texteCorr += tableau + '<br><br>'
  texteCorr += 'On peut aussi présenter les issues sous la forme d\'un arbre de dénombrement :<br>'
  texteCorr += mathalea2d({ xmin: 0, xmax: card * 8.5, ymin: 0, ymax: 13, zoom: 0.8, scale: 9 / card / card }, ...objets) + '<br>'
  texteCorr += `Légende : ${b1Char} = ${b1Color} et ${b2Char} = ${b2Color}.<br>`
  texteCorr += `${numAlpha(0)} L'événement «obtenir deux boules ${choix[1]}${choix[2] !== 'O' ? 's' : ''}» est réalisé par l'issue {${choix[2] + choix[2]}}.`
  texteCorr += ` On comptabilise ${choix[0] ** 2 - choix[0]} issues {${choix[2] + choix[2]}} sur ${card ** 2 - card} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $${probaChoix.texFraction}${!probaChoix.estIrreductible ? '=' + probaChoix.texFractionSimplifiee : ''}$.<br>`
  texteCorr += `${numAlpha(1)} L'événement «obtenir deux boules de la même couleur» est réalisé par les issues {${b1Char + b1Char}, ${b2Char + b2Char}}.`
  texteCorr += ` On comptabilise ${nbBoule1 ** 2 - nbBoule1} issues {${b1Char + b1Char}} et   ${nbBoule2 ** 2 - nbBoule2} issues {${b2Char + b2Char}} sur ${card ** 2 - card} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $${proba1.texFraction}+${proba2.texFraction}`
  texteCorr += `=${proba1et2.texFraction}${!proba1et2.estIrreductible ? '=' + proba1et2.texFractionSimplifiee : ''}$.<br>`

  texteCorr += `${numAlpha(2)} L'événement «obtenir deux boules de couleurs différentes» est réalisé par les issues {${b1Char + b2Char}, ${b2Char + b1Char}}.`
  texteCorr += ` On comptabilise ${nbBoule1 * nbBoule2} issues {${b1Char + b2Char}} et autant d'issues {${b2Char + b1Char}} sur ${card ** 2 - card} issues en tout.<br>`
  texteCorr += `La probabilité de cet événement est donc de $2\\times ${proba3.texFraction}=${proba4.texFraction}${!proba4.estIrreductible ? '=' + proba4.texFractionSimplifiee : ''}$.<br>`
  texteCorr += `Une autre façon de faire est de considérer que c'est l'événement contraire de «obtenir deux boules de la même couleur» dont on a calculé la probabilité à la question ${numAlpha(1)}.<br>`
  texteCorr += `On peut donc calculer la probabilité de cet événement en calculant : $1 -${proba1et2.texFractionSimplifiee} = ${proba4.texFractionSimplifiee}$.`
  if (!context.isAMC) setReponse(exercice, NoQuestion, probaChoix, { formatInteractif: 'fractionEgale' })
  if (!context.isAMC) setReponse(exercice, NoQuestion + 1, proba1et2, { formatInteractif: 'fractionEgale' })
  if (!context.isAMC) setReponse(exercice, NoQuestion + 2, proba4, { formatInteractif: 'fractionEgale' })
  return { texte: texte, texteCorr: texteCorr, alea: [nbBoule1, nbBoule2, b1Char, b2Char], NoQuestion: NoQuestion + 3 }
}
