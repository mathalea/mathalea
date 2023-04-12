import { randint, ecritureParentheseSiNegatif, texNombrec, reduireAxPlusB } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer les coordonnées d’un point sur une droite'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '04/11/2022'
/*!
 * @author Gilles Mora
 */

export const uuid = 'dfe60'
export const ref = 'can2L02'
export default function CoordonneesPointDroite () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    const a = randint(-10, 10, 0)
    const b = randint(-10, 10, 0)
    const c = randint(-10, 10, 0)

    this.formatChampTexte = 'largeur12 inline'

    this.formatInteractif = 'texte'
    this.reponse = `${c};${a * c + b}`
    this.question = ` Déterminer les coordonnées du point de la droite 
        d'équation $y=${reduireAxPlusB(a, b)}$ dont l'abscisse est $${c}$. 
       `
    if (this.interactif) {
      this.optionsChampTexte = { texteApres: '$)$' }
      this.question += '<br>$($'
    }
    if (a === 1) {
      this.correction = `Puisque $${c}$ est l'abscisse de ce point, son ordonnée est donnée par :<br>
        $y= ${c}+${ecritureParentheseSiNegatif(b)}=${a * c + b}$.<br>
  Les coordonnées du  point sont donc : $(${c};${texNombrec(a * c + b)})$.`
    } else {
      this.correction = `Puisque $${c}$ est l'abscisse de ce point, son ordonnée est donnée par :<br>

  $y=${a}\\times ${ecritureParentheseSiNegatif(c)}+${ecritureParentheseSiNegatif(b)}=${a * c} + ${ecritureParentheseSiNegatif(b)}=${a * c + b}$.<br>
  Les coordonnées du  point sont donc : $(${c};${texNombrec(a * c + b)})$.`
    }

    this.canEnonce = ` Déterminer les coordonnées du point de la droite 
    d'équation $y=${reduireAxPlusB(a, b)}$ dont l'abscisse est $${c}$. `
    this.canReponseACompleter = ''
  }
}
