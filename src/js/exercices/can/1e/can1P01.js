import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, sp } from '../../../modules/outils.js'
import Decimal from 'decimal.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Ecrire une probabilté avec les notations'
export const dateDePublication = '03/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora
 *
*/
export default function ProbabilitesNotation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, p1, p2, texte, texteCorr, choix; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1])) { //
        case 1:
          p1 = randint(25, 80)
          p2 = new Decimal(p1).div(100)
          choix = choice(['q3'])
          texte = `Dans un lycée, on choisit au hasard un élève. On note : <br>
      $\\bullet$ $F$ : "L'élève choisi est une fille" ;<br>
      $\\bullet$ $R$ : "L'élève choisi est un demi-pensionnaire".<br>
      `
          if (choix === 'q1') {
            texte += ` Dans ce lycée il y a $${p1} \\%$ de filles demi-pensionnaires.<br>
            En utilisant les événements $F$ et $R$, compléter l'égalité suivante à l'aide d'une probabilité :`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `$P(F\\cap R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['p(F\\bigcap R)', 'p(R\\bigcap F)', 'P(F\\bigcap R)', 'P(R\\bigcap F)'])
          }
          if (choix === 'q2') {
            if (choice([true, false])) {
              texte += ` Dans ce lycée $${p1}\\%$ des filles sont demi-pensionnaires.<br>`
            } else { texte += ` Parmi les filles de ce lycée,  $${p1}\\%$ sont demi-pensionnaires.<br>` }
            texte += ' En utilisant les événements $F$ et $R$, compléter l\'égalité suivante à l\'aide d\'une probabilité :'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $= ${texNombre(p2, 2)}$`
            texteCorr = `$P_F(R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['p_{F}(R)', 'P_{F}(R)'])
          }
          if (choix === 'q3') {
            if (choice([true, false])) {
              texte += ` Dans ce lycée $${p1}\\%$ des garçons sont demi-pensionnaires.<br>`
            } else { texte += ` Parmi les garçons de ce lycée,  $${p1}\\%$ sont demi-pensionnaires.<br>` }
            texte += ' En utilisant les événements $F$ et $R$, compléter l\'égalité suivante à l\'aide d\'une probabilité :'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $= ${texNombre(p2, 2)}$`
            texteCorr = `$P_{\\overline{F}}(R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['P_{\\overline{F}}({R})', 'p_{\\overline{F}}({R})', 'P{_\\overline{F}}({R})', 'P\\overline{_F}({R})', 'P\\overline{_F}({R})'])
          }
          if (choix === 'q4') {
            texte += ` Dans ce lycée il y a $${p1} \\%$ de garçons demi-pensionnaires.<br>
            En utilisant les événements $F$ et $R$, compléter l'égalité suivante à l'aide d'une probabilité :`
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
            } else { texte += `${sp(7)}$\\ldots\\ldots $` }
            texte += ` $ = ${texNombre(p2, 2)}$`
            texteCorr = `$P(\\overline{F}\\cap R)=${texNombre(p2, 2)}$.`
            setReponse(this, i, ['p(\\overline{F}\\bigcap R)', 'p(R\\bigcap \\overline{F})', 'P(\\overline{F}\\bigcap R)', 'P(R\\bigcap \\overline{F})'])
          }

          break
      }
      if (this.questionJamaisPosee(i, p1)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
