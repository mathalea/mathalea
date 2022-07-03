import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, choisitLettresDifferentes } from '../../../modules/outils.js'
import Decimal from 'decimal.js'
import { number } from 'mathjs'
import { Arbre, texProba } from '../../../modules/arbres.js'
import { mathalea2d } from '../../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { context } from '../../../modules/context.js'
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
    for (let i = 0, cpt = 0, p1, omega, texte, texteCorr, choix, nom1, nom2, objets, pC; i < this.nbQuestions && cpt < 50;) {


        switch (choice([1])) { //
            case 1:
                p1 = (new Decimal(randint(1,9))).mul(10)

      texte = `Dans un lycée, on choisit au hasard un élève. On note : <br>
      $\\bullet$ $F$ : \\og L'élève choisi est une fille \\fg ;<br>
      $\\bullet$ $D$ : \\og L'élève choisi est un demi-pensionnaire \\fg<br>
      Traduire l'information suivante à l'aide d'une probabilité : <br>
      Dans ce lycée il y a $${p1} \\%$ de filles demi-pensionnaires.`


      texte += ``
      texteCorr = `Il ne s'agit pas d'une probabilité conditionnelle :<br>
      $P(F\\cap D)=${texNombre(p1/100,2)}$.
      `
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
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}

