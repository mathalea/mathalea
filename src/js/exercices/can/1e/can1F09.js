import Exercice from '../../Exercice.js'
import { randint, choice, ecritureAlgebrique, calcul, texNombrec, texFractionReduite } from '../../../modules/outils.js'
export const titre = 'Déterminer la fonction dérivée d’une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora (exercice en partie repris de Gaelle Morvan (1N10))
 * Référence
*/
export default function CalculFonctionDeriveeAffine2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, k
    switch (choice([1])) { //
      case 1:// fonction affine
        a = randint(1, 7) * choice([-1, 1])
        b = randint(1, 10) * choice([-1, 1])
        k = randint(1, 10)

        this.question = 'Soit $(u_n)$ une suite définie pour tout  $n\\in\\mathbb{N}$ par : $u_n = '
        if (a === 1) { this.question += 'n' } else if (a === -1) { this.question += '-n' } else { this.question += `${a}n` };
        if (b > 0) { this.question += `+${b}$` } else { this.question += `${b}$` };
        this.question += `<br>Calculer $u_{${k}}$.`

        this.correction = `Dans l'expression de $u_n$ on remplace $n$ par $${k}$, on obtient : $u_{${k}} =`
        if (a === 1) {
          this.correction += `${k} ${ecritureAlgebrique(b)}`
        } else {
          if (a === -1) {
            this.correction += `-${k} ${ecritureAlgebrique(b)}`
          } else {
            this.correction += `${a} \\times ${k} ${ecritureAlgebrique(b)}`
          }
        }
        this.correction += `=${a * k + b}$.`
        this.reponse = calcul(a * k + b)
        break
      
    }
  }
}
