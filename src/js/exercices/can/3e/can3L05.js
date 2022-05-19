import Exercice from '../../Exercice.js'
import { randint, choice } from '../../../modules/outils.js'
export const titre = 'Calculer le produit des solutions dune équation produit nul'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '25/10/2021'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3L06
 * Date de publication
*/
export default function SolutionsEquationProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const b = randint(1, 10) // (x+a)(x+b)=0 avec a et b entiers
    const d = randint(1, 10, [b])
    switch (choice([1, 2, 3])) {
      case 1 :
        this.question = `Le produit des solutions de l'équation $(x+${b})(x+${d})=0$ est égal à : ` //
        this.correction = 'On reconnaît une équation produit nul. <br>'
        this.correction += 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
        this.correction += '<br>' + `$(x+${b})(x+${d})=0$`
        this.correction += '<br> ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
        this.correction += '<br>  ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
        this.correction += '<br>Le produit vaut donc : ' + `$(${-b})\\times (${-d})=${b * d}$.`
        this.reponse = b * d
        break
      case 2 :
        this.question = `Le produit des solutions de l'équation $(x-${b})(x+${d})=0$ est égal à : ` //
        this.correction = 'On reconnaît une équation produit nul. <br>'
        this.correction += 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
        this.correction += '<br>' + `$(x-${b})(x+${d})=0$`
        this.correction += '<br>  ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
        this.correction += '<br>  ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`
        this.correction += '<br>Le produit vaut donc :' + `$${b}\\times (${-d})=${-b * d}$.`
        this.reponse = b * (-d)
        break
      case 3 :
        this.question = `Le produit des solutions de l'équation $(x-${b})(x-${d})=0$ est égal à : ` //
        this.correction = 'On reconnaît une équation produit nul. <br>'
        this.correction += 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
        this.correction += '<br>' + `$(x-${b})(x-${d})=0$`
        this.correction += '<br>  ' + `$x-${b}=0$` + ' ou  ' + `$x-${d}=0$`
        this.correction += '<br>  ' + `$x=${b}$` + ' ou ' + `$x=${d}$`
        this.correction += '<br>Le produit vaut donc :' + `$${b}\\times ${d}=${b * d}$.`
        this.reponse = b * d
        break
    }
  }
}
