import Exercice from '../Exercice.js'
import { randint, rienSi1, ecritureParentheseSiNegatif, choice, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const titre = 'Solution d’une inéquation'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
 * Date de publication
*/
export default function SolutionInequation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  let a, b, c, d
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, monQcm
    a = randint(1, 4)
    b = randint(1, 4)
    c = randint(2, 5)
    d = randint(-3, 3)
    switch (choice(['a', 'b'])) {
      case 'a':
        texte = `$${d}$ est solution de l'inéquation &nbsp $${rienSi1(a)}x+${b}>${c}$.<br>`
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: a * d + b > c
            },
            {
              texte: 'F',
              statut: a * d + b <= c
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte
        if (a * d + b > c) {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}+${b}>${c}$.`
        } else {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas  solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}+${b}<${c}$.`
        }

        break
      case 'b' :
        texte = `$${d}$ est solution de l'inéquation&nbsp  $${rienSi1(a)}x^2-${b}>${c}$.<br>`
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: (a * d * d - b > c)
            },
            {
              texte: 'F',
              statut: (a * d * d - b <= c)
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte
        if (a * d * d - b > c) {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}>${c}$.`
        } else {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas  solution car : $${rienSi1(a)}\\times ${ecritureParentheseSiNegatif(d)}^2-${b}<${c}$.`
        }
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
