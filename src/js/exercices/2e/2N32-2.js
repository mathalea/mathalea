import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'

export const titre = 'Connaître les propriétés calculatoires des racines carrées'

/**
 * 2N32-2, ex 2N10-1
 * @author Stéphane Guyon
 */
export const uuid = '99b29'
export const ref = '2N32-2'
export default function proprietesracinecarree () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Effectuer, si possible, les calculs suivants :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, c, d, e, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:// calcul de (a sqrt b)²

          a = randint(2, 9) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          c = a * a * b
          d = a * a
          texte = `$\\left(${a} \\sqrt{${b}}\\right)^{2}$`
          texteCorr = `$\\left(${a} \\sqrt{${b}}\\right)^{2}=${ecritureParentheseSiNegatif(a)}^{2}\\times \\left(\\sqrt{${b}}\\right)^{2}$
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${d}\\times ${b}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}}\\right)^{2}}=${c}$`

          break
        case 2:// calcul de (a sqrt b)*c sqrt b

          a = randint(2, 9) * choice([-1, 1])
          c = randint(2, 9) * choice([-1, 1])
          d = randint(2, 9) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          e = c * d

          texte = `$ ${c} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(d)} \\sqrt{${b}}$`
          texteCorr = `$ ${c} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(d)} \\sqrt{${b}}=${c}\\times ${ecritureParentheseSiNegatif(d)} \\sqrt{${b}} \\times \\sqrt{${b}}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(d)} \\sqrt{${b}}}=${e}\\times ${b}$<br>
                        $\\phantom{${c} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(d)} \\sqrt{${b}}}=${e * b}$`

          break
        case 3://  calcul de (a sqrt b)*(c + d sqrt b)
          a = randint(2, 9) * choice([-1, 1])
          c = randint(2, 9) * choice([-1, 1])
          d = randint(2, 9) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          e = c * d

          texte = `$ ${a} \\sqrt{${b}}\\left( ${c}  ${ecritureAlgebrique(d)}\\sqrt{${b}}\\right)$`
          texteCorr = `$${a} \\sqrt{${b}}\\left( ${c}  ${ecritureAlgebrique(d)}\\sqrt{${b}}\\right)=
                        ${a} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(c)}${ecritureAlgebrique(a)} \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(d)}\\sqrt{${b}}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecritureAlgebrique(d)}\\sqrt{${b}}\\right)}=${a * c}\\sqrt{${b}}${ecritureAlgebrique(a)}\\times ${ecritureParentheseSiNegatif(d)}\\times ${b}$<br>
                        $\\phantom{${a} \\sqrt{${b}}\\left( ${c}  ${ecritureAlgebrique(d)}\\sqrt{${b}}\\right)}=${a * c}\\sqrt{${b}}${ecritureAlgebrique(a * d * b)}$`

          break
        case 4://  calcul de sqrt b + sqrt c

          a = randint(2, 9)

          d = randint(2, 9)
          b = randint(2, 11, [4, 8, 9])
          c = randint(2, 19, [4, 8, 9, 12, 16, 18, b])
          e = c * d

          texte = `$  \\sqrt{${b}}+\\sqrt{${c}}$`
          texteCorr = `$  \\sqrt{${b}}+\\sqrt{${c}}$ n'est pas simplifiable`

          break
        case 5://  calcul de  sqrt b² + sqrt c²

          b = randint(2, 11)
          c = randint(2, 11, [b])
          e = c * d

          texte = `$  \\sqrt{${b * b}}+\\sqrt{${c * c}}$`
          texteCorr = `$  \\sqrt{${b * b}}+\\sqrt{${c * c}}=${b}+${c}=${b + c}$ `

          break
        case 6://  calcul de  sqrt (b²c/c)

          b = randint(2, 11)
          c = randint(2, 7, [b])
          d = b * b * c

          texte = `$ \\sqrt{\\dfrac{${d}}{${c}}}$`
          texteCorr = `$ \\sqrt{\\dfrac{${d}}{${c}}}= \\sqrt{\\dfrac{${b}^{2}\\times${c}}{${c}}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=\\sqrt{${b}^{2}}$<br>
                        $\\phantom{\\sqrt{\\dfrac{${d}}{${c}}}}=${b}$ `

          break
        case 7://  calcul de sqrt b * sqrt c

          b = randint(2, 11, [4, 9])
          c = randint(2, 7, [b])
          d = b * c

          texte = `$ \\sqrt{${d}}\\times \\sqrt{${c}}$`
          texteCorr = `$ \\sqrt{${d}}\\times \\sqrt{${c}}=\\sqrt{${d}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=\\sqrt{${b}\\times${c}\\times${c}}$<br>
                        $\\phantom{\\sqrt{${d}}\\times \\sqrt{${c}}}=${c}\\sqrt{${b}}$ `

          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
