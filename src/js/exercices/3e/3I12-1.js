import Exercice from '../Exercice.js'
import { choice, combinaisonListes, compteOccurences, contraindreValeur, lampeMessage, lettreDepuisChiffre, listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { scratchblock } from '../../modules/2d.js'
export const titre = 'Compléter un script Scratch'

export const dateDePublication = '20/09/2022'

/**
 * Compléter un script sur les multiples et diviseurs
 * @author Eric Elter
 */
export default function completerScriptMultiple () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 5
  this.sup2 = 5
  this.sup3 = 4
  this.sup4 = 3
  this.spacing = 2
  this.nbQuestions = 1
  this.titre = titre
  this.typeExercice = 'Scratch'
  this.nbCols = 2
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  this.listePackages = 'scratch3'
  this.nouvelleVersion = function () {
    this.introduction = lampeMessage({
      titre: `${scratchblock('\\begin{scratch}[print,fill,blocks,scale=0.5]\n\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}\\end{scratch}')}`,
      texte: 'Cette brique donne le reste de la division euclidienne du nombre de gauche par le nombre de droite.',
      couleur: 'nombres'
    })

    this.consigne = 'Compléter les briques manquantes.'
    // this.consigne = 'Lis et comprends ce script Scratch associé à un lutin puis réponds aux questions suivantes.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let briquesATrouver = []
    let optionsBriques = []
    if (!this.sup) { // Si aucune liste n'est saisie
      briquesATrouver = [randint(1, 4)]
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = contraindreValeur(1, 5, this.sup, 5)
        briquesATrouver = [this.sup === 5 ? randint(1, 4) : this.sup]
      } else {
        briquesATrouver = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < briquesATrouver.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          briquesATrouver[i] = contraindreValeur(1, 5, parseInt(briquesATrouver[i]), 5)
        }
        if (compteOccurences(briquesATrouver, 5) > 0) briquesATrouver = [randint(1, 4)]
      }
    }

    const choixLignes3et5 = compteOccurences(briquesATrouver, 1) > 0
    const choixLigne6 = compteOccurences(briquesATrouver, 2) > 0
    const choixLignes7et8Extremes = compteOccurences(briquesATrouver, 3) > 0
    const choixLignes7et8Centre = compteOccurences(briquesATrouver, 4) > 0

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
    let texteScratch = '\\begin{scratch}[print,fill,blocks,scale=0.5]\n'
    switch (briqueInitiale) {
      case 1 :
        texteScratch += '\\blockinit{quand \\greenflag est cliqué}\n'
        break
      case 2 :
        texteScratch += '\\blockinit{quand ce sprite est cliqué}\n'
        break
      case 3 :
        texteScratch += `\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`
        break
      case 4 :
        texteScratch += '\\blockinit{quand la touche \\selectmenu{n\'importe laquelle} est pressée}\n'
        break
    }
    texteScratch += '\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}\n'
    const texteSansTrou = [texteScratch]
    texteSansTrou.push(`\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalsensing{réponse}}\n`)
    texteScratch += choixLignes3et5
      ? `\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalnum{ ................ }}\n`
      : texteSansTrou[1]
    texteSansTrou.push('\\blockmove{demander \\ovalnum{Donne-moi un second nombre entier.} et attendre}\n')
    texteScratch += texteSansTrou[2]
    texteSansTrou.push(`\\blockvariable{mettre \\selectmenu{${var2}} à \\ovalsensing{réponse}}\n`)
    texteScratch += choixLignes3et5
      ? `\\blockvariable{mettre \\selectmenu{${var2}} à \\ovalnum{ ................ }}\n`
      : texteSansTrou[3]
    const var3 = lettreDepuisChiffre(nb1)
    var1 = diviseurEnPremier ? var2 : var1
    var2 = diviseurEnPremier ? var3 : var2
    texteSansTrou.push(`\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalmove{${var1}} modulo \\ovalmove{${var2}}} = \\ovalnum{0}} alors}\n`)
    texteScratch += choixLigne6
      ? '\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalnum{ ................ } modulo \\ovalnum{ ................ }} = \\ovalnum{0}} alors}\n'
      : texteSansTrou[4]
    switch (choixScript) {
      case 1 : // .... est un multiple de ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' est un multiple de '}} et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' est un multiple de '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[5]
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' n\'est pas un multiple de '}} et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' n\'est pas un multiple de '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[6]
        break
      case 2 : // .... divise ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' divise '}} et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' divise '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[5]
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' ne divise pas '}} et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' ne divise pas '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[6]
        break
      case 3 : // .... est un diviseur de  ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' est un diviseur de '}} et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' est un diviseur de '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[5]
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' n\'est pas un diviseur de '}} et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`)
        texteScratch += choixLignes7et8Extremes
          ? `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${choixLignes7et8Centre ? ' ................ ' : ' n\'est pas un diviseur de '}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}\n}\n`
          : texteSansTrou[6]
        break
    }
    texteSansTrou.push('\\end{scratch}')
    texteScratch += texteSansTrou[7]
    texteScratch = scratchblock(texteScratch)

    const texte = texteScratch
    const texteCorr = scratchblock(texteSansTrou.join(''))

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Brique(s) à trouver',
    'Nombres séparés par des tirets\n1 : Lignes 3 et 5\n2 : Ligne 6\n3 : Lignes 7 et 8 (aux extrèmes)\n4 : Lignes 7 et 8 (au centre)\n5 : Une des possiblités précédentes choisie au hasard'
  ]
  this.besoinFormulaire2Texte = [
    'Choix sur la brique intiale',
    'Nombres séparés par des tirets\n1 : La brique initiale est un clic sur drapeau vert.\n2 : La brique initiale est un clic sur lutin.\n3 : La brique initiale est un appui sur touche imposée\n4 : La brique initiale est un appui sur touche non imposée\n5 : Une des possiblités précédentes choisie au hasard'
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
