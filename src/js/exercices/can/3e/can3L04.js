import Exercice from '../../Exercice.js'
import { randint, rienSi1, ecritureParentheseSiNegatif, sp, texteEnCouleur, choice, listeQuestionsToContenuSansNumero, ecritureAlgebrique } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Vérifier si un nombre est solution d’une inéquation (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3L04
 * Date de publication 24/10/2021
*/
export default function SolutionInequation () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  let a, b, c, d
  this.date = 1635094684684
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    let texte, texteCorr, monQcm

    switch (choice(['a', 'b', 'c'])) { //
      case 'a':
        a = randint(1, 4)
        b = randint(1, 4)
        c = randint(2, 5)
        d = randint(-3, 3)
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
        a = randint(1, 4)
        b = randint(1, 4)
        c = randint(2, 5)
        d = randint(-3, 3)
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
        break
      case 'c' :
        a = randint(2, 5)
        b = randint(-2, 4, 0)
        d = randint(-2, 5)
        texte = `$${d}$ est solution de l'inéquation ${sp(2)}  $x^2\\leqslant ${a}x${ecritureAlgebrique(b)}$.<br>`
        this.autoCorrection[0] = {
          enonce: texte,
          propositions: [
            {
              texte: 'V',
              statut: (d ** 2 <= a * d + b)
            },
            {
              texte: 'F',
              statut: (d ** 2 > a * d + b)
            }
          ],
          options: { ordered: true }
        }
        monQcm = propositionsQcm(this, 0)
        texte += monQcm.texte
        if (d ** 2 <= a * d + b) {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ est  solution car : $${d ** 2}\\leqslant${a * d + b}$<br>
          `
          texteCorr += texteEnCouleur(`<br> Mentalement : <br>
          Faites deux calculs séparés puis comparez les résultats :<br>
          $\\bullet$  $${ecritureParentheseSiNegatif(d)}^2=${d ** 2}$.<br>
          $\\bullet$ $${a}\\times ${ecritureParentheseSiNegatif(d)}${ecritureAlgebrique(b)}=${a * d + b}$.<br>
          et $${d ** 2}$ est  inférieur ou égal à $${a * d + b}$.        
            `)
        } else {
          texteCorr = monQcm.texteCorr + `<br>$${d}$ n'est pas solution car : $${d ** 2}>${a * d + b}$<br>
         `
          texteCorr += texteEnCouleur(`<br> Mentalement : <br>
          Faites deux calculs séparés puis comparez les résultats :<br>
          $\\bullet$  $${ecritureParentheseSiNegatif(d)}^2=${d ** 2}$.<br>
          $\\bullet$ $${a}\\times ${ecritureParentheseSiNegatif(d)}${ecritureAlgebrique(b)}=${a * d + b}$.<br>
          et $${d ** 2}$ n'est pas inférieur ou égal à $${a * d + b}$.         
            `)
        }

        break
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
}
