import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, choice, texNombre, texFraction, calcul } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive, ajouteChampFractionMathLive } from '../../modules/interactif/questionMathLive.js'
import { format } from 'mathjs'
export const titre = 'Donner l\'écriture décimale d\'une fraction décimale'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '28/09/22'

/**
 * On donne une fraction qui a pour dénominateur 10, 100 ou 1 000, il faut donner l'écriture décimale.
 * ou réciproquement
 * Le numérateur est de la forme X, XX, X0X, X00X ou XXX
 * @author Mickael Guironet
 * 6N23-8
 */
export const ref = '6N23-8'
export const uuid = '708a9'
export default function ExerciceEcritureDecimaleOuFractionDecimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = "Donner l'écriture décimale ou la fraction décimale."
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = '1-2' // Type de question

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let listeTypeDeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie ou mélange demandé
      listeTypeDeQuestions = combinaisonListes([1, 2], this.nbQuestions)
    } else {
      const quests = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < quests.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        const choixtp = parseInt(quests[i])
        if (choixtp >= 1 && choixtp <= 2) {
          listeTypeDeQuestions.push(choixtp)
        }
      }
      if (listeTypeDeQuestions.length === 0) { listeTypeDeQuestions = [1, 2] }
      listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    }

    const consi = [false, false]
    for (let i = 0, a, b, n, typesDeQuestions, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9),
          randint(1, 9) * 100 + randint(1, 9) * 10
        ])
      // X, XX, X0X, X00X, XX0
      b = [10, 100, 1000, 10, 100][i % 5]
      n = calcul(a / b)

      switch (typesDeQuestions) {
        case 2: // fraction décimale -> écriture décimale
          consi[1] = true
          setReponse(this, i, n)
          texte = `$${texFraction(texNombre(a), texNombre(b))}  ${(!this.interactif ? '=\\ldots\\ldots\\ldots\\ldots' : '=')} $` + ajouteChampTexteMathLive(this, i, 'largeur25 inline')
          texteCorr = '$ ' + texFraction(texNombre(a), texNombre(b)) + ' = ' + texNombre(n) + ' $'
          this.autoCorrection[i].reponse.param.digits = 5
          this.autoCorrection[i].reponse.param.decimals = 3
          break
        case 1: { // / écriture décimale -> fraction décimale
          consi[0] = true
          const nombre = format(n, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 }).replace('.', ',')
          const rangVirgule = nombre.indexOf(',')
          let nbdigits = 0
          if (rangVirgule !== -1) {
            nbdigits = nombre.length - rangVirgule - 1
          }
          let precision = nbdigits
          if (nbdigits === 2 && b === 100) {
            precision = 3
          } else if (nbdigits === 1 && b === 10) {
            precision = randint(2, 3)
          }
          setReponse(this, i, a)
          if (this.interactif) {
            texte = `$${texNombre(n, precision, true)} =$` + ajouteChampFractionMathLive(this, i, false, b, 'min-width:100px')
          } else {
            texte = `$${texNombre(n, precision, true)} =$` + `$${texFraction('\\ldots\\ldots\\ldots\\ldots', texNombre(b))} $`
          }
          texteCorr = '$ ' + texNombre(n) + ' = ' + texFraction(texNombre(a), texNombre(b)) + ' $'
          this.autoCorrection[i].reponse.param.digits = 6
          this.autoCorrection[i].reponse.param.decimals = 0
          break
        }
      }
      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    if (consi[0] === true && consi[1] === true) {
      this.consigne = 'Donner l\'écriture décimale ou la fraction décimale.'
    } else if (consi[0] === false && consi[1] === true) {
      this.consigne = 'Donner l\'écriture décimale'
    } else {
      this.consigne = 'Donner la fraction décimale'
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de question', [
      'Choix séparés par des tirets',
      '0 : Mélange',
      '1 : Ecriture décimale -> fraction décimale',
      '2 : Fraction décimale -> écriture décimale'
    ].join('\n')
  ]
}
