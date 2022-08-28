import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'

export const titre = 'Appliquer la double distributivité avec les racines carrées'

/**
 * 2N32-5, ex 2N12
 * @author Stéphane Guyon
 */
export const uuid = '660de'
export const ref = '2N32-5'
export default function DoubleDistributiviteAvecRacineCarree () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ' Effectuer les calculs suivants :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, a1, a2, a, b1, b2, aa1, bb, aa2, aaa, c1, c2, d1, d2, c, dd, cc1, cc2, dd1, dd2, dd3, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:
          a1 = randint(2, 9) * choice([-1, 1])
          a = randint(2, 11, [4, 8, 9])
          b1 = randint(2, 9) * choice([-1, 1])
          a2 = randint(2, 9)
          b2 = randint(2, 9) * choice([-1, 1])
          aa1 = a1 * a2 * a
          bb = b1 * b2
          aa2 = a1 * b2 + b1 * a2
          aaa = aa1 + bb
          if (aa2 === 0) {
            b2 = -b2
            bb = b1 * b2
            aa2 = a1 * b2 + b1 * a2
            aaa = aa1 + bb
          }
          texte = `$\\left(${a1}\\sqrt{${a}}${ecritureAlgebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecritureAlgebrique(b2)}\\right)$`
          texteCorr = `$\\left(${a1}\\sqrt{${a}}${ecritureAlgebrique(b1)}\\right)\\left(${a2}\\sqrt{${a}}${ecritureAlgebrique(b2)}\\right)$<br>
                    
                    $=${a1}\\sqrt{${a}}\\times ${a2}\\sqrt{${a}}${ecritureAlgebrique(a1)}\\sqrt{${a}} \\times ${ecritureParentheseSiNegatif(b2)}
                    ${ecritureAlgebrique(b1)} \\times ${a2}\\sqrt{${a}}${ecritureAlgebrique(b1)} \\times ${ecritureParentheseSiNegatif(b2)}$<br>
                    $=${a1}\\times ${a}\\times ${a2}+ \\left( ${a1} \\times ${ecritureParentheseSiNegatif(b2)}${ecritureAlgebrique(b1)} \\times ${a2}\\right)\\sqrt{${a}} ${ecritureAlgebrique(bb)}$<br>
                    $= ${aa1}${ecritureAlgebrique(aa2)} \\sqrt{${a}}${ecritureAlgebrique(bb)}$<br>
                    $=${aa2} \\sqrt{${a}}${ecritureAlgebrique(aaa)}$`

          break
        case 2:
          c1 = randint(2, 9) * choice([-1, 1])
          c = randint(2, 11, [4, 8, 9])
          d1 = randint(2, 9) * choice([-1, 1])
          d2 = randint(2, 9)
          c2 = randint(2, 9)
          cc1 = c1 * d2
          cc2 = c1 * c2
          dd = d1 * d2
          dd1 = d1 * c2
          dd2 = dd + cc2 * c
          dd3 = cc1 + dd1
          texte = `$\\left(${c1}\\sqrt{${c}}${ecritureAlgebrique(d1)}\\right)\\left(${d2} ${ecritureAlgebrique(c2)}\\sqrt{${c}}\\right)$`
          texteCorr = `$\\left(${c1}\\sqrt{${c}}${ecritureAlgebrique(d1)}\\right)\\left(${d2}${ecritureAlgebrique(c2)}\\sqrt{${c}}\\right)$<br>
                    $=${c1}\\sqrt{${c}}\\times ${d2}${ecritureAlgebrique(c1)}\\sqrt{${c}} \\times ${ecritureParentheseSiNegatif(c2)}\\sqrt{${c}}${ecritureAlgebrique(d1)} \\times ${d2}  ${ecritureAlgebrique(d1)}  \\times ${c2}\\sqrt{${c}}$<br>
                    $= ${cc1}\\sqrt{${c}} ${ecritureAlgebrique(cc2)}\\times ${c} ${ecritureAlgebrique(dd)} ${ecritureAlgebrique(dd1)} \\sqrt{${c}}   $<br>
                    $=${dd3}\\sqrt{${c}}${ecritureAlgebrique(dd2)}$`
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
