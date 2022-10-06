import Exercice from '../Exercice.js'
import { choice, combinaisonListes, compteOccurences, contraindreValeur, lampeMessage, lettreDepuisChiffre, listeQuestionsToContenu, numAlpha, randint, texteEnCouleurEtGras } from '../../modules/outils.js'
import { scratchblock } from '../../modules/2d.js'
import { min, max } from 'mathjs'
import { context } from '../../modules/context.js'
export const titre = 'Comprendre un script Scratch - 2'
export const amcReady = true
export const amcType = 'AMCHybride'

export const dateDePublication = '23/09/2022'

/**
 * Compléter un script sur les multiples et diviseurs
 * @author Eric Elter
 */
export default function ComprendreScriptListeMultiples () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 9
  this.sup2 = 5
  this.sup3 = 4
  this.spacing = 2
  this.spacingCorr = 2
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
    let texteScratch = '\\begin{scratch}[print,fill,blocks,scale=1]\n'
    const choixBriqueInitiale = [
      ['\\blockinit{quand \\greenflag est cliqué}\n', 'Quand le drapeau vert est cliqué'],
      ['\\blockinit{quand ce sprite est cliqué}\n', 'Quand ce sprite est cliqué'],
      [`\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`, `Quand la touche ${touchePressee} est pressée`],
      ['\\blockinit{quand la touche \\selectmenu{n\'importe laquelle} est pressée}\n', "Quand n'importe quelle touche est pressée"]
    ]
    texteScratch += choixBriqueInitiale[briqueInitiale - 1][0]
    texteScratch += `\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalnum{1}}\n`
    texteScratch += '\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}\n'
    texteScratch += '\\blockrepeat{répéter \\ovalsensing{réponse} fois}\n{\n'
    texteScratch += `\\blockif{si \\booloperator{\\ovaloperator{\\ovalsensing{réponse} modulo \\ovalmove{${var1}}} = \\ovalnum{0}} alors}\n`

    switch (choixScript) {
      case 1 : // .... est un multiple de ....
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalsensing{réponse} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${var1}}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
      case 2 : // .... divise ....
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
      case 3 : // .... est un diviseur de  ....
        texteScratch += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}\n}\n`
        break
    }
    texteScratch += `\\blockvariable{ajouter \\ovalnum{1} à \\selectmenu{${var1}}}\n`

    texteScratch += '}\n\\end{scratch}'

    let texte = scratchblock(texteScratch)

    const nb01 = choice([2, 3, 5, 7])
    const nb02 = choice([2, 3, 5, 7], [nb01])
    const nb03 = nb01 * nb02
    const listeQuestions = [ // [Questions, Reponses, Nb de lignes pour le réponse AMC]
      ['Combien ce script comporte-t-il de variables ?', `Ce script comporte ${texteEnCouleurEtGras(1)} variable.`, 1],
      ['Comment se nomme la variable dans ce script ?', `La variable de ce script se nomme ${texteEnCouleurEtGras(var1)}.`, 1],
      ['Que fait ce script ?', `Ce script demande un nombre entier à l'utilisateur puis, pour tous les nombres entiers de 1 au nombre fourni, calcule le reste de la division euclidienne 
      de ce nombre fourni par chacun des entiers et le compare à zéro. Le lutin peut ainsi énoncer pendant une demi-seconde un nouveau diviseur du nombre fourni.`, 3],
      [`Si le nombre saisi est ${nb03}, que dit précisément le lutin ?`,
      `${choixScript === 1 ? nb03 + ' est un multiple de 1' : choixScript === 2 ? '1 divise ' + nb03 : '1 est un diviseur de ' + nb03}.<br>
      ${choixScript === 1 ? nb03 + ' est un multiple de ' + min(nb01, nb02) : choixScript === 2 ? min(nb01, nb02) + ' divise ' + nb03 : min(nb01, nb02) + ' est un diviseur de ' + nb03}.<br>
      ${choixScript === 1 ? nb03 + ' est un multiple de ' + max(nb01, nb02) : choixScript === 2 ? max(nb01, nb02) + ' divise ' + nb03 : max(nb01, nb02) + ' est un diviseur de ' + nb03}.<br>
      ${choixScript === 1 ? nb03 + ' est un multiple de ' + nb03 : choixScript === 2 ? nb03 + ' divise ' + nb03 : nb03 + ' est un diviseur de ' + nb03}.`, 1],
      ['Quelle action initiale permet de déclencher ce script ?',
        choixBriqueInitiale[briqueInitiale - 1][1] + '.', 1],
      [`Pourquoi, dans ce script, faut-il ajouter 1 à ${var1} ?`,
        `Cet ajout, grâce à la boucle, permet à ${var1} de valoir, tour à tour, tous les nombres de 1 jusqu'au nombre choisi par l'utilisateur.`, 2]
    ]
    let choixQuestions = []
    let nbDeQuestions = [6]
    if (!this.sup) { // Si aucune liste n'est saisie
      choixQuestions = listeQuestions
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = contraindreValeur(1, 12, this.sup, 12)
        if (this.sup < 7) choixQuestions = [listeQuestions[this.sup]]
        else choixQuestions = combinaisonListes(listeQuestions, 6).slice(0, this.sup - 6)
      } else {
        const optionsQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsQuestions[i] = contraindreValeur(1, 12, parseInt(optionsQuestions[i]), 12)
          if (optionsQuestions[i] < 7) choixQuestions.push(listeQuestions[optionsQuestions[i] - 1])
          else nbDeQuestions = [optionsQuestions[i] - 6]
        }
        if (choixQuestions.length === 0) {
          choixQuestions = combinaisonListes(listeQuestions, 6).slice(0, nbDeQuestions[0])
        }
      }
    }
    choixQuestions = combinaisonListes(choixQuestions, choixQuestions.length)
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: '',
        enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
        propositions: []
      }
    }
    this.consigne = 'Lire ce script Scratch associé à un lutin et répondre ensuite'
    this.consigne += min(choixQuestions.length, nbDeQuestions[0]) > 1 ? ' aux questions.' : ' à la question.'
    let texteCorr = ''
    let enonceAMC = ''
    for (let i = 0; i < min(choixQuestions.length, nbDeQuestions[0]); i++) {
      if (min(choixQuestions.length, nbDeQuestions[0]) === 1) {
        enonceAMC = choixQuestions[0][0]
        texteCorr = choixQuestions[0][1] + '<br>'
      } else {
        enonceAMC = numAlpha(i) + choixQuestions[i][0]
        texteCorr += numAlpha(i) + choixQuestions[i][1] + '<br>'
      }
      if (context.isAmc) {
        this.autoCorrection[0].propositions[i] = {
          type: 'AMCOpen',
          propositions: [
            {
              enonce: (i === 0 ? scratchblock(texteScratch) + '<br><br>' : '') + enonceAMC,
              texte: '',
              statut: choixQuestions[i][2], // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              pointilles: false // EE : ce champ est facultatif et permet (si false) d'enlever les pointillés sur chaque ligne.
            }
          ]
        }
      }
      texte += enonceAMC + '<br>'
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Question(s) à sélectionner',
    'Nombres séparés par des tirets\n1 : Nombre de variables\n2 : Nom de variables\n3 : Description du script\n4 : Test du script avec un entier\n5 : Action initiale\n6 : Ajouter 1\n   ------------   \n7 : Une seule question parmi celles choisies\n8 : Deux questions parmi celles choisies\n9 : Trois questions parmi celles choisies\n10 : Quatre questions parmi celles choisies\n11 : Cinq questions parmi celles choisies\n12 : L\'ensemble des six questions'
  ]
  this.besoinFormulaire2Texte = [
    'Choix sur la brique intiale',
    'Nombres séparés par des tirets\n1 : La brique initiale est un clic sur drapeau vert.\n2 : La brique initiale est un clic sur lutin.\n3 : La brique initiale est un appui sur touche imposée\n4 : La brique initiale est un appui sur touche non imposée\n5 : Une des possiblités précédentes choisie au hasard'
  ]
  this.besoinFormulaire3Texte = [
    'Choix sur une des phrases finales',
    'Nombres séparés par des tirets\n1 : Une phrase finale contient : ... est un multiple de ...\n2 : Une phrase finale contient : ... divise ...\n3 : Une phrase finale contient : ... est un diviseur de ...\n4 : Une des possiblités précédentes choisie au hasard'
  ]
}
