import Exercice from '../../Exercice.js'
import { randint, texNombrec, choice, calcul, texFraction } from '../../../modules/outils.js'
export const titre = 'Écrire sous la forme d’un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '19/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '802cc'
export const ref = 'can5P06'
export default function ÉcrirePourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a, b, fraction, n, d
    const listeFractions1 = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 10], [3, 10], [7, 10], [9, 10], [3, 25], [9, 25], [13, 25], [9, 50], [17, 50], [9, 20], [3, 20], [17, 20]]
    switch (choice(['a', 'b', 'c'])) { //
      case 'a':
        a = calcul(randint(10, 99) / 100)
        this.question = `Compléter : $${texNombrec(a)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texNombrec(a)}=\\dfrac{${texNombrec(a * 100)}}{100}=${texNombrec(a * 100)} \\%$`
        this.reponse = a * 100
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${texNombrec(a)}=.... \\%$`
        break
      case 'b':
        a = calcul(randint(0, 9) / 100)
        b = calcul(randint(0, 9) / 1000)
        if (a === 0 && b === 0) { b = 1 }
        this.question = `Compléter : $${texNombrec(a + b)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texNombrec(a + b)}=\\dfrac{${texNombrec((a + b) * 100)}}{100}=${texNombrec((a + b) * 100)} \\%$`
        this.reponse = (a + b) * 100
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${texNombrec(a + b)}=.... \\%$`
        break
      case 'c':
        fraction = choice(listeFractions1)
        n = fraction[0]
        d = fraction[1]

        this.question = `Compléter : $${texFraction(texNombrec(n), d)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texFraction(n, d)}=\\dfrac{${texNombrec(n)}\\times ${texNombrec(100 / d)}}{${texNombrec(d)}\\times ${texNombrec(100 / d)}}=
        \\dfrac{${texNombrec((n * 100) / d)}}{100}=${texNombrec((n * 100) / d)} \\%$`
        this.reponse = (n * 100) / d
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${texFraction(texNombrec(n), d)}=.... \\%$`
        break
    }
  }
}
