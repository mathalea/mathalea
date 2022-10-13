import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureParentheseSiNegatif } from '../../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import { reduirePolynomeDegre3 } from '../../../modules/outils/reductions.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { texNombre } from '../../../modules/outils/texNombres.js'
export const titre = 'Résoudre une équation du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '04/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Gilles Mora
 * Référence can1L04
*/
export const uuid = '7a950'
export const ref = 'can1L04'
export default function ResoudreEquationSecondDegre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    let texte, texteCorr, a, b, c, d, x1, x2
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      x1 = randint(-5, 5, 0)
      x2 = randint(-5, 5, [0, x1, -x1])
      a = randint(1, 3) * choice([-1, 1])
      b = -a * (x1 + x2)
      c = a * x1 * x2
      d = b * b - 4 * a * c
      while (d > 144) {
        a = randint(1, 5) * choice([-1, 1])
        x1 = randint(-5, 5, 0)
        x2 = randint(-5, 5, [0, x1, -x1])
        b = -a * (x1 + x2)
        c = a * x1 * x2
        d = b * b - 4 * a * c
      }

      texte = `$${reduirePolynomeDegre3(0, a, b, c)}=0$.<br>
       Sachant que  $\\Delta=${d}$, donner les solutions de cette équation
        `
      if (!this.interactif) { texte += '.' } else {
        texte += 'dans l\'ordre croissant :'
        texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
        texte += ' et '
        texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
        setReponse(this, 2 * i, Math.min(x1, x2))
        setReponse(this, 2 * i + 1, Math.max(x1, x2))
      }
      texteCorr = '<br>$\\Delta>0$ donc l\'équation admet deux solutions : $x_1 = \\dfrac{-b-\\sqrt{\\Delta}}{2a}$ et $x_2 = \\dfrac{-b+\\sqrt{\\Delta}}{2a}$'
      texteCorr += `<br>$x_1 = \\dfrac{${-b} -\\sqrt{${d}}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${texNombre((-b - Math.sqrt(d)) / (2 * a), 0)}$ et
       $x_2 = \\dfrac{${-b} +\\sqrt{${d}}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${texNombre((-b + Math.sqrt(d)) / (2 * a), 0)}$`
      if (this.questionJamaisPosee(i, a, x1, x2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
