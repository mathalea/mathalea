import Exercice from '../Exercice.js'
import { choice, combinaisonListes, compteOccurences, contraindreValeur, enleveDoublonNum, lampeMessage, lettreDepuisChiffre, listeQuestionsToContenu, randint, range1, shuffle } from '../../modules/outils.js'
import { scratchblock } from '../../modules/2d.js'
export const titre = 'Compléter un script Scratch - 2'

export const dateDePublication = '22/09/2022'

/**
 * Compléter un script sur les multiples et diviseurs
 * @author Eric Elter
 */
export default function CompleterScriptDiviseurs () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = '1-2-3-4-5-6-7-8-9-10'
  this.sup2 = 3
  this.sup3 = 5
  this.sup4 = 4
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

    const nbBriquesATrouver = contraindreValeur(1, 10, this.sup2, randint(1, 10))
    this.consigne = 'Compléter '
    this.consigne += nbBriquesATrouver > 1 ? 'les briques manquantes.' : 'la brique manquante.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let briquesATrouver = []
    let optionsBriques = []
    if (!this.sup) { // Si aucune liste n'est saisie
      briquesATrouver = shuffle(range1(10)).slice(0, nbBriquesATrouver)
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = contraindreValeur(1, 10, this.sup, 10)
        briquesATrouver = [this.sup]
        for (let i = 1; i < nbBriquesATrouver; i++) {
          briquesATrouver.push(randint(1, 10, briquesATrouver))
        }
      } else {
        briquesATrouver = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < briquesATrouver.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          briquesATrouver[i] = contraindreValeur(1, 10, parseInt(briquesATrouver[i]), randint(1, 10))
        }
        briquesATrouver = enleveDoublonNum(briquesATrouver)
        if (nbBriquesATrouver > briquesATrouver.length) {
          for (let i = briquesATrouver.length; i < nbBriquesATrouver; i++) {
            briquesATrouver.push(randint(1, 10, briquesATrouver))
          }
        } else if (nbBriquesATrouver < briquesATrouver.length) {
          briquesATrouver = shuffle(briquesATrouver).slice(0, nbBriquesATrouver)
        }
      }
    }
    const choixLigne2a = compteOccurences(briquesATrouver, 1) > 0
    const choixLigne2b = compteOccurences(briquesATrouver, 2) > 0
    const choixLigne4 = compteOccurences(briquesATrouver, 3) > 0
    const choixLigne5a = compteOccurences(briquesATrouver, 4) > 0
    const choixLigne5b = compteOccurences(briquesATrouver, 5) > 0
    const choixLigne5c = compteOccurences(briquesATrouver, 6) > 0
    const choixLigne6Extremes = compteOccurences(briquesATrouver, 7) > 0
    const choixLigne6Centre = compteOccurences(briquesATrouver, 8) > 0
    const choixLigne7a = compteOccurences(briquesATrouver, 9) > 0
    const choixLigne7b = compteOccurences(briquesATrouver, 10) > 0

    if (!this.sup3) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 4)]
    } else {
      if (typeof (this.sup3) === 'number') {
        this.sup3 = contraindreValeur(1, 5, this.sup3, 5)
        optionsBriques = [this.sup3 === 5 ? randint(1, 4) : this.sup3]
      } else {
        optionsBriques = this.sup3.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 5, parseInt(optionsBriques[i]), 5)
        }
        if (compteOccurences(optionsBriques, 5) > 0) optionsBriques = [randint(1, 4)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const briqueInitiale = optionsBriques[0]

    optionsBriques = []
    if (!this.sup4) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 3)]
    } else {
      if (typeof (this.sup4) === 'number') {
        this.sup4 = contraindreValeur(1, 4, this.sup4, 4)
        optionsBriques = [this.sup4 === 4 ? randint(1, 3) : this.sup4]
      } else {
        optionsBriques = this.sup4.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 4, parseInt(optionsBriques[i]), 4)
        }
        if (compteOccurences(optionsBriques, 4) > 0) optionsBriques = [randint(1, 3)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const choixScript = optionsBriques[0]

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
    const var1 = lettreDepuisChiffre(nb1)
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
    const texteSansTrou = [texteScratch]
    texteSansTrou.push(`\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalnum{1}}\n`)
    texteScratch += `\\blockvariable{mettre \\selectmenu{${choixLigne2a ? ' ................ ' : var1}} à ${choixLigne2b ? '\\ovalnum{ ................ }' : '\\ovalnum{1}'}}\n`

    texteSansTrou.push('\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}\n')
    texteScratch += texteSansTrou[2]

    texteSansTrou.push('\\blockrepeat{répéter \\ovalsensing{réponse} fois}\n{\n')
    texteScratch += choixLigne4
      ? '\\blockrepeat{répéter \\ovalnum{ ................ } fois}\n{\n'
      : texteSansTrou[3]

    texteSansTrou.push(`\\blockif{si \\booloperator{\\ovaloperator{\\ovalsensing{réponse} modulo \\ovalmove{${var1}}} = \\ovalnum{0}} alors}\n`)

    texteScratch += '\\blockif{si \\booloperator{\\ovaloperator{'
    texteScratch += choixLigne5a ? '\\ovalnum{ ................ }' : '\\ovalsensing{réponse}'
    texteScratch += ' modulo '
    texteScratch += choixLigne5b ? '\\ovalnum{ ................ }' : `\\ovalmove{${var1}}`
    texteScratch += '} =  '
    texteScratch += choixLigne5c ? '\\ovalnum{ ................ }}' : '\\ovalnum{0}}'
    texteScratch += '  alors}\n'

    switch (choixScript) {
      case 1 : // .... est un multiple de ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalsensing{réponse} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${var1}}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`)
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalsensing{réponse}'} et \\ovaloperator{regrouper \\ovalnum{${choixLigne6Centre ? ' ................ ' : ' est un multiple de '}} et ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalmove{' + var1 + '}'}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
      case 2 : // .... divise ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`)
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalmove{' + var1 + '}'} et \\ovaloperator{regrouper \\ovalnum{${choixLigne6Centre ? ' ................ ' : ' divise '}} et ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalsensing{réponse}'}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
      case 3 : // .... est un diviseur de  ....
        texteSansTrou.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`)
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalmove{' + var1 + '}'} et \\ovaloperator{regrouper \\ovalnum{${choixLigne6Centre ? ' ................ ' : ' est un diviseur de '}} et ${choixLigne6Extremes ? '\\ovalnum{ ................ }' : '\\ovalsensing{réponse}'}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
    }
    texteSansTrou.push(`\\blockvariable{ajouter \\ovalnum{1} à \\selectmenu{${var1}}}\n`)
    texteScratch += `\\blockvariable{ajouter ${choixLigne7a ? '\\ovalnum{ ................ }' : '\\ovalnum{1}'} à \\selectmenu{${choixLigne7b ? ' ................ ' : var1}}}\n`

    texteSansTrou.push('}\n\\end{scratch}')

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
    'Nombres séparés par des tirets\n1 : Ligne 2 (variable)\n2 : Ligne 2 (nombre)\n3 : Ligne 4\n4 : Ligne 5 (réponse)\n5 : Ligne 5 (variable)\n6 : Ligne 5 (nombre)\n7 : Ligne 6 (variable et réponse)\n8 : Ligne 6 (mot(s))\n9 : Ligne 7 (nombre)\n10 : Ligne 7 (variable)'
  ]
  this.besoinFormulaire2Numerique = [
    'Nombre de briques à trouver', 10,
    'Choix entre 1 et 10.\nSi ce choix est inférieur au nombre de briques à trouver, alors les briques seront choisies aléatoirement parmi celles à trouver.\nSi ce choix est supérieur au nombre de briques à trouver, alors les briques à trouver seront complétées par des briques choisies aléatoirement parmi les restantes.'
  ]
  this.besoinFormulaire3Texte = [
    'Choix sur la brique intiale',
    'Nombres séparés par des tirets\n1 : La brique initiale est un clic sur drapeau vert.\n2 : La brique initiale est un clic sur lutin.\n3 : La brique initiale est un appui sur touche imposée\n4 : La brique initiale est un appui sur touche non imposée\n5 : Une des possiblités précédentes choisie au hasard'
  ]
  this.besoinFormulaire4Texte = [
    'Choix sur une des phrases finales',
    'Nombres séparés par des tirets\n1 : Une phrase finale contient : ... est un multiple de ...\n2 : Une phrase finale contient : ... divise ...\n3 : Une phrase finale contient : ... est un diviseur de ...\n4 : Une des possiblités précédentes choisie au hasard'
  ]
}
