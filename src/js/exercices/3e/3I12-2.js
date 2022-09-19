import Exercice from '../Exercice.js'
import { choice, combinaisonListes, compteOccurences, contraindreValeur, deuxColonnes, lettreDepuisChiffre, listeQuestionsToContenu, numAlpha, randint, rangeMinMax } from '../../modules/outils.js'
import { scratchblock } from '../../modules/2d.js'
import { min } from 'mathjs'
export const titre = 'Comprendre un script Scratch'

export const dateDePublication = '18/09/2022'

/**
 * Comprendre un script sur les multiples et diviseurs
 * @author Eric Elter
 */
export default function comprendreScript () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 5
  this.sup2 = 5
  this.sup3 = 4
  this.sup4 = 9
  this.spacing = 2
  this.nbQuestions = 1
  this.titre = titre
  this.typeExercice = 'Scratch'
  this.nbCols = 2
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  this.listePackages = 'scratch3'
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let optionsBriques = []

    if (!this.sup2) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 4)]
    } else {
      if (typeof (this.sup2) === 'number') {
        this.sup2 = contraindreValeur(1, 5, this.sup2, 5)
        optionsBriques = [this.sup2 === 5 ? randint(1, 4) : this.sup2]
      } else {
        optionsBriques = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 5, parseInt(optionsBriques[i]), 5)
        }
        if (compteOccurences(optionsBriques, 5) > 0) optionsBriques = [randint(1, 4)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const briqueInitiale = optionsBriques[0]

    optionsBriques = []
    if (!this.sup3) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 3)]
    } else {
      if (typeof (this.sup3) === 'number') {
        this.sup3 = contraindreValeur(1, 4, this.sup3, 4)
        optionsBriques = [this.sup3 === 4 ? randint(1, 3) : this.sup3]
      } else {
        optionsBriques = this.sup3.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 4, parseInt(optionsBriques[i]), 4)
        }
        if (compteOccurences(optionsBriques, 4) > 0) optionsBriques = [randint(1, 3)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const choixScript = optionsBriques[0]

    const diviseurEnPremier = this.sup4 === 3 ? choice([true, false]) : this.sup4 === 2

    const tableauTouches = []
    for (let i = 1; i < 27; i++) tableauTouches.push(String.fromCharCode(64 + i).toLowerCase())
    for (let i = 0; i < 10; i++) tableauTouches.push(i)
    tableauTouches.push('espace')
    tableauTouches.push('flèche haut')
    tableauTouches.push('flèche bas')
    tableauTouches.push('flèche droite')
    tableauTouches.push('flèche gauche')
    const touchePressee = choice(tableauTouches)

    const nb1 = randint(1, 26, [23, 9, 15, 17]) // Pour éviter I,O,Q et W
    const nb2 = randint(1, 26, [23, 9, 15, 17, nb1]) // Pour éviter I,O,Q et W
    let var1 = lettreDepuisChiffre(nb1)
    let var2 = lettreDepuisChiffre(nb2)
    let colonne1 = '\\begin{scratch}[print,fill,blocks,scale=0.5]\n'
    switch (briqueInitiale) {
      case 1 :
        colonne1 += '\\blockinit{quand \\greenflag est cliqué}\n'
        break
      case 2 :
        colonne1 += '\\blockinit{quand ce sprite est cliqué}\n'
        break
      case 3 :
        colonne1 += `\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`
        break
      case 4 :
        colonne1 += '\\blockinit{quand la touche \\selectmenu{n\'importe laquelle} est pressée}\n'
        break
    }
    colonne1 += '\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}\n'
    colonne1 += `\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalsensing{réponse}}\n`
    colonne1 += '\\blockmove{demander \\ovalnum{Donne-moi un second nombre entier.} et attendre}\n'
    colonne1 += `\\blockvariable{mettre \\selectmenu{${var2}} à \\ovalsensing{réponse}}\n`
    const var3 = lettreDepuisChiffre(nb1)
    var1 = diviseurEnPremier ? var2 : var1
    var2 = diviseurEnPremier ? var3 : var2
    colonne1 += `\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalmove{${var1}} modulo \\ovalmove{${var2}}} = \\ovalnum{0}} alors}\n`
    switch (choixScript) {
      case 1 : // .... est un multiple de ....
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un multiple de } et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`
        break
      case 2 : // .... divise ....
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ ne divise pas } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
        break
      case 3 : // .... est un diviseur de  ....
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
        colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un diviseur de } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
        break
    }
    colonne1 += '\\end{scratch}'
    colonne1 = scratchblock(colonne1)

    const nb02 = choice([2, 3, 5, 9, 10])
    const nb01 = choice(rangeMinMax(5, 15)) * nb02
    const nb03 = nb01 + 1
    const listeQuestions = [
      'Combien ce script comporte-t-il de variables ?<br>',
      'Comment se nomment les variables dans ce script ?<br>',
      'Que fait ce script ?<br>',
    `Si les nombres saisis sont d'abord ${diviseurEnPremier ? nb02 : nb01} puis ensuite ${diviseurEnPremier ? nb01 : nb02}, que dit précisement le lutin au final ?<br>`,
    `Si les nombres saisis sont d'abord ${diviseurEnPremier ? nb02 : nb03} puis ensuite ${diviseurEnPremier ? nb03 : nb02}, que dit précisement le lutin au final ?<br>`,
    'Quelle action initiale permet de déclencher ce script ?<br>'
    ]

    let choixQuestions = []
    let nbDeQuestions = [6]
    if (!this.sup) { // Si aucune liste n'est saisie
      choixQuestions = listeQuestions
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = contraindreValeur(1, 5, this.sup, 5)
        if (this.sup < 7) choixQuestions = [listeQuestions[this.sup]]
        else choixQuestions = combinaisonListes(listeQuestions, 6).slice(0, this.sup - 6)
      } else {
        const optionsQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsQuestions[i] = contraindreValeur(1, 12, parseInt(optionsQuestions[i]), 12)
          if (optionsQuestions[i] < 7) choixQuestions.push(listeQuestions[optionsQuestions[i]])
          else nbDeQuestions = [optionsQuestions[i] - 6]
        }
        if (choixQuestions.length === 0) {
          choixQuestions = combinaisonListes(listeQuestions, 6).slice(0, nbDeQuestions[0])
        }
      }
    }
    choixQuestions = combinaisonListes(choixQuestions, choixQuestions.length)

    this.consigne = 'Lire ce script Scratch associé à un lutin et répondre ensuite'
    this.consigne += min(choixQuestions.length, nbDeQuestions[0]) < 1 ? ' aux questions suivantes.' : ' à la question suivante.'
    let colonne2 = ''
    for (let i = 0; i < min(choixQuestions.length, nbDeQuestions[0]); i++) {
      if (min(choixQuestions.length, nbDeQuestions[0]) === 1) colonne2 = choixQuestions[i]
      else colonne2 += numAlpha(i) + choixQuestions[i]
    }

    const texte = deuxColonnes(colonne1, colonne2)
    const texteCorr = ' '

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Question(s) à sélectionner',
    'Nombres séparés par des tirets\n1 : Nombre de variables\n2 : Nom de variables\n3 : Description du script\n4 : Test du script avec deux nombres multiples\n5 : Test du script avec deux nombres multiples\n6 : Action initiale\n7 : Une seule question parmi celles choisies\n8 : Deux questions parmi celles choisies\n9 : Trois questions parmi celles choisies\n10 : Quatre questions parmi celles choisies\n11 : Cinq questions parmi celles choisies\n12 : L\'ensemble des six questions'
  ]
  this.besoinFormulaire2Texte = [
    'Choix sur la brique intiale',
    'Nombres séparés par des tirets\n1 : La brique initiale est un clic sur drapeau vert.\n2 : La brique initiale est un clic sur lutin.\n3 : La brique initiale est un appui sur touche imposée\n4 : La brique initiale est un appui sur touche non imposée\n5:Une des possiblités précédentes choisie au hasard'
  ]
  this.besoinFormulaire3Texte = [
    'Choix sur une des phrases finales',
    'Nombres séparés par des tirets\n1 : Une phrase finale contient : ... est un multiple de ...\n2 : Une phrase finale contient : ... divise ...\n3 : Une phrase finale contient : ... est un diviseur de ...\n4 : Une des possiblités précédentes choisie au hasard'
  ]
  this.besoinFormulaire4Numerique = [
    'Choix de l\'ordre sur la brique modulo', 3,
    '1 : Premier entier demandé modulo le second\n2 : Second entier demandé modulo le premier \n3 : Une des possiblités précédentes choisie au hasard'
  ]
}
