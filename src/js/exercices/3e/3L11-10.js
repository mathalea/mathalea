import Exercice from '../Exercice.js'
import { egal, randint, combinaisonListes, printlatex, listeQuestionsToContenuSansNumero, lettreDepuisChiffre, tableauColonneLigne } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
export const titre = 'Table de double distributivité'
export const dateDePublication = '23/02/2023'

/**
* Développer des expressions de double distributivité à l'aide d'un tableau de multiplication
* @author Sébastien LOZANO
*/

export default function TableDoubleDistributivite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = context.isHtml ? 3 : 2
  this.spacingCorr = context.isHtml ? 3 : 2
  this.nbQuestions = 5
  this.sup = 1
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.consigne = this.nbQuestions > 1 ? 'Dans chaque cas, compléter les tables de multiplication, écrire le développement obtenu et le réduire.' : 'Compléter la table de multiplication, écrire le développement obtenu et le réduire.'
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = [1, 2]
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [3, 4]
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4]
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, termesRectangles, developpements, cpt = 0, a, b, c, d, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(2, 9)
      b = randint(2, 9)
      c = randint(2, 9, [a])
      d = randint(2, 9, [b])
      switch (typesDeQuestions) {
        case 1: // (x+b)(x+d)
          b = randint(2, 10)
          d = randint(2, 12)
          texte = `$${lettreDepuisChiffre(i + 1)} = (x+${b})(x+${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (x+${b})(x+${d})$`
          termesRectangles = [1, d, b, b * d]
          developpements = {
            eclate: `x^2+${b}x+${d}x+${b * d}`,
            reduit: `x^2+${b + d}x+${b * d}`
          }
          break
        case 2: // (ax+b)(cx+d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x+${b})(${c}x+${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x+${b})(${c}x+${d})$`
          termesRectangles = [a * c, a * d, b * c, b * d]
          developpements = {
            eclate: `${a * c}x^2+${a * d}x+${b * c}x+${b * d}`,
            reduit: `${a * c}x^2+${a * d + b * c}x+${b * d}`
          }
          break
        case 3: // (ax-b)(cx+d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x+${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x+${d})$`
          if (egal(a * d - b * c, 0)) {
            developpements = {
              eclate: `${a * c}x^2+${d * a}x-${b * c}x-${b * d}`,
              reduit: `${printlatex(`${a * c}*x^2-${b * d}`)}`
            }
          } else {
            developpements = {
              eclate: `${a * c}x^2+${d * a}x-${b * c}x-${b * d}`,
              reduit: `${printlatex(`${a * c}*x^2+(${d * a - b * c})*x-${b * d}`)}`
            }
          }
          termesRectangles = [a * c, a * d, -b * c, -b * d]
          break
        case 4: // (ax-b)(cx-d)
          texte = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x-${d})$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = (${a}x-${b})(${c}x-${d})$`
          termesRectangles = [a * c, -a * d, -b * c, b * d]
          developpements = {
            eclate: `${a * c}x^2-${a * d}x-${b * c}x+${b * d}`,
            reduit: `${a * c}x^2-${a * d + b * c}x+${b * d}`
          }
          break
      }
      texte += context.isHtml ? '<br>' : '\\par\\medskip'
      texte += tableauColonneLigne(['\\times', `${a}x`, `${b}`], [`${c}x`, `${d}`], [`\\phantom{${termesRectangles[0]}x}`, `\\phantom{${termesRectangles[1]}}`, `\\phantom{${termesRectangles[2]}x}`, `\\phantom{${termesRectangles[3]}}`])
      texte += context.isHtml ? '<br> Développement : ' : '\\par\\medskip Développement : '
      texte += context.isHtml ? '<br> Développement réduit : ' : '\\par\\medskip Développement réduit: '
      texteCorr += context.isHtml ? '<br>' : '\\par\\medskip'
      texteCorr += tableauColonneLigne(['\\times', `${a}x`, `${b}`], [`${c}x`, `${d}`], [`${termesRectangles[0] === 1 ? '' : termesRectangles[0]}x^2`, `${termesRectangles[2]}x`, `${termesRectangles[1]}x`, `${termesRectangles[3]}`])
      texteCorr += context.isHtml ? '<br>' : '\\par\\medskip '
      texteCorr += `Développement : $${lettreDepuisChiffre(i + 1)} = ${developpements.eclate}$`
      texteCorr += context.isHtml ? '<br>' : '\\par\\medskip '
      texteCorr += `Développement réduit : $${lettreDepuisChiffre(i + 1)} = ${developpements.reduit}$`
      // texteCorr += context.isHtml ? '<br>' : '\\par\\bigskip'
      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions[i])) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, ' 1 : (x+a)(x+b) et (ax+b)(cx+d)\n 2 : (ax-b)(cx+d) et (ax-b)(cx-d)\n 3 : Mélange']
}
