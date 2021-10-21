import Exercice from '../Exercice.js'
import { randint, rienSi1, ecritureParentheseSiNegatif, sp, choice, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const titre = 'Solution d’une inéquation (V/F)'
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
    switch (choice(['a', 'b'])) { //, 'b'
      case 'a':
        texte = `$${d}$ est solution de l'inéquation ${sp(2)} $${rienSi1(a)}x+${b}>${c}$.<br>`
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
          if (a === 1) {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $${ecritureParentheseSiNegatif(d)}+${b}=${d + b}$ et $${d + b}>${c}$.`
          } else {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}+${b}=${a * d + b}$ et $${a * d + b}>${c}$.`
          }
        } else {
          if (a === 1) {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas  solution car : $ ${ecritureParentheseSiNegatif(d)}+${b}=${d + b}$ et $${d + b}\\leqslant${c}$.`
          } else { texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas solution car : $${a}\\times ${ecritureParentheseSiNegatif(d)}+${b}=${a * d + b}$ et $${a * d + b}\\leqslant${c}$.` }
        }

        break
      case 'b' :
        texte = `$${d}$ est solution de l'inéquation ${sp(2)}  $${rienSi1(a)}x^2-${b}>${c}$.<br>`
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
          if (a === 1) {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $ ${ecritureParentheseSiNegatif(d)}^2-${b}=${d ** 2 - b}$ et $${d ** 2 - b}>${c}$.`
          } else {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ est solution car : $${a}\\times${ecritureParentheseSiNegatif(d)}^2-${b}=${a * d ** 2 - b}$ et $${a * d ** 2 - b}>${c}$.`
          }
        } else {
          if (a === 1) {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas  solution car : $ ${ecritureParentheseSiNegatif(d)}^2-${b}=${d ** 2 - b}$ et $${d ** 2 - b}\\leqslant${c}$.`
          } else {
            texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas solution car : $${a}\\times${ecritureParentheseSiNegatif(d)}^2-${b}=${a * d ** 2 - b}$ et $${a * d ** 2 - b}\\leqslant${c}$.`
          }
        }
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
