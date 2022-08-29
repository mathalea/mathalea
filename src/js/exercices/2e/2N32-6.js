import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'

export const titre = 'Développer les identités remarquables avec des racines carrées'

/**
 * 2N32-6
 * @author Stéphane Guyon
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '91dc4'
export const ref = '2N32-6'
export default function IdentitesRemarquablesEtRacineCarree () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Effectuer les calculs suivants :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          a = randint(2, 6) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          c = randint(2, 6)

          texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}$`
          texteCorr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecritureParentheseSiNegatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecritureParentheseSiNegatif(a)}^{2}\\times ${b} ${ecritureAlgebrique(2 * a * c)}\\sqrt{${b}}+ ${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b}${ecritureAlgebrique(2 * a * c)}\\sqrt{${b}}+${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b + c * c}${ecritureAlgebrique(2 * a * c)}\\sqrt{${b}}$
                    `

          break

        case 2:

          a = randint(2, 6) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          c = randint(2, 6)

          texte = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}$`
          texteCorr = `$\\left(${a} \\sqrt{${b}} -${c}\\right)^{2}=\\left(${a} \\sqrt{${b}} \\right)^{2}-2\\times ${ecritureParentheseSiNegatif(a)}\\sqrt{${b}}\\times ${c}+${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${ecritureParentheseSiNegatif(a)}^{2}\\times ${b} ${ecritureAlgebrique(-2 * a * c)}\\sqrt{${b}}+ ${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b}${ecritureAlgebrique(-2 * a * c)}\\sqrt{${b}}+${c * c}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)^{2}}=${a * a * b + c * c}${ecritureAlgebrique(-2 * a * c)}\\sqrt{${b}}$

                    `
          break
        case 3:
          a = randint(2, 6) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          c = randint(2, 6)

          texte = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)$`
          texteCorr = `$\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)=\\left(${a} \\sqrt{${b}} \\right)^{2}-${c}^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${ecritureParentheseSiNegatif(a)}^{2}\\times ${b}-${c * c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a * a * b}-${c * c}$<br>
                        $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\right)\\left(${a} \\sqrt{${b}}-${c}\\right)}=${a * a * b - c * c}$
                    `

          break
        case 4:

          a = randint(2, 5) * choice([-1, 1])
          b = randint(3, 11, [4, 8, 9])
          c = randint(2, 5)
          d = randint(3, 11, [4, 8, 9, b, b * 2, b * 3, b * 5])

          texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}$`
          texteCorr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}+2\\times ${ecritureParentheseSiNegatif(a)}\\sqrt{${b}}\\times ${c}\\sqrt{${d}}+\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${ecritureParentheseSiNegatif(a)}^{2}\\times ${b} +2\\times ${ecritureParentheseSiNegatif(a)}
                    \\times \\sqrt{${b}}\\times ${ecritureParentheseSiNegatif(c)}    \\times\\sqrt{${d}}+ ${c * c}\\times ${d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a * a * b} ${ecritureAlgebrique(2 * a * c)}\\sqrt{${b}\\times${d}} ${ecritureAlgebrique(c * c * d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)^{2}}=${a * a * b + c * c * d}${ecritureAlgebrique(2 * a * c)}\\sqrt{${b * d}}

                    $`

          break
        case 5:
          a = randint(2, 6) * choice([-1, 1])
          b = randint(2, 11, [4, 8, 9])
          c = randint(2, 6)
          d = randint(2, 11, [4, 8, 9])
          texte = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)$`
          texteCorr = `$\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)=
                    \\left(${a} \\sqrt{${b}} \\right)^{2}-\\left(${c}\\sqrt{${d}}\\right)^{2}$<br>
                $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${ecritureParentheseSiNegatif(a)}^{2}\\times ${b}-${c}^{2}\\times ${ecritureParentheseSiNegatif(d)}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a * a * b}-${c * c * d}$<br>
                    $\\phantom{\\left(${a} \\sqrt{${b}} +${c}\\sqrt{${d}}\\right)\\left(${a} \\sqrt{${b}}-${c}\\sqrt{${d}}\\right)}
                    =${a * a * b - c * c * d}$
                    `

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
