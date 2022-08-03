import Exercice from '../../Exercice.js'
import { randint, texNombre, choice, calcul, texFraction } from '../../../modules/outils.js'
export const titre = 'Ecrire sous la forme d’un pourcentage'
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
export default function EcrirePourcentage () {
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
        this.question = `Compléter : $${texNombre(a)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texNombre(a)}=\\dfrac{${texNombre(a * 100)}}{100}=${texNombre(a * 100)} \\%$`
        this.reponse = a * 100
        break
      case 'b':
        a = calcul(randint(0, 9) / 100)
        b = calcul(randint(0, 9) / 1000)
        if (a === 0 && b === 0) { b = 1 }
        this.question = `Compléter : $${texNombre(a + b)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texNombre(a + b)}=\\dfrac{${texNombre((a + b) * 100)}}{100}=${texNombre((a + b) * 100)} \\%$`
        this.reponse = (a + b) * 100

        break
      case 'c':
        fraction = choice(listeFractions1)
        n = fraction[0]
        d = fraction[1]

        this.question = `Compléter : $${texFraction(texNombre(n), d)}=.... \\%$`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' $\\%$' } }
        this.correction = `$${texFraction(n, d)}=\\dfrac{${texNombre(n)}\\times ${texNombre(100 / d)}}{${texNombre(d)}\\times ${texNombre(100 / d)}}=
        \\dfrac{${texNombre((n * 100) / d)}}{100}=${texNombre((n * 100) / d)} \\%$`
        this.reponse = (n * 100) / d

        break
    }
  }
}
