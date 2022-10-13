import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
export const titre = 'Calculer la raison d’une suite arithmétique/géométrique'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '18/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'cd45d'
export const ref = 'can1S07'
export default function CalculRaison () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let u, i, v, r, q
    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    switch (choice(['a', 'b'])) { // 'b', 'c', 'd'
      case 'a':// suite arithmétique
        u = randint(-15, 15, 0)
        r = randint(-15, 15, 0)
        v = u + r
        i = randint(0, 10)
        this.question = `Soit $(${s}_n)$ une suite arithmétique telle que :<br>
$${s}_{${i}}=${u}$ et  $${s}_{${i + 1}}=${v}$.<br>
Donner la raison $r$ de cette suite.`
        if (!this.interactif) {
          this.question += ''
        } else {
          this.question += '<br> $r=$'
        }
        this.correction = `La raison est donnée par la différence de deux termes consécutifs :<br>
        $r=${s}_{${i + 1}}-${s}_{${i}}=${v}-${ecritureParentheseSiNegatif(u)}=${v - u}$.`

        this.reponse = r
        break
      case 'b':// suite géométrique
        u = randint(-12, 12, 0)
        q = randint(-10, 10, [-1, 1, 0])
        v = u * q
        i = randint(0, 10)
        this.question = `Soit $(${s}_n)$ une suite géométrique  telle que :<br>
$${s}_{${i}}=${u}$ et  $${s}_{${i + 1}}=${v}$.<br>
Donner la raison $q$ de cette suite.`
        if (!this.interactif) {
          this.question += ''
        } else {
          this.question += '<br> $q=$'
        }
        this.correction = `La raison est donnée par le quotient de deux termes consécutifs :<br>
        $q=\\dfrac{${s}_{${i + 1}}}{${s}_{${i}}}=\\dfrac{${v}}{${u}}=${v / u}$.`

        this.reponse = q
        break
    }
  }
}
