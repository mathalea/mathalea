import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes } from '../../modules/outils.js'

export const titre = 'Utiliser la notion de valeur absolue d\'une quantité'

/**
 * 2N15-1, ex 2N22
 * @author Stéphane Guyon
 */
export const uuid = '0d8b3'
export const ref = '2N15-1'
export default function ValeurAbsolue () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer la valeur du nombre proposé :'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, c, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          a = randint(1, 150) * choice([-1, 1])

          texte = `$\\vert ${a}\\vert = \\dots$`
          if (a > 0) { texteCorr = `$\\vert ${a}\\vert = ${a}$` } else { texteCorr = `$\\vert ${a}\\vert = ${-a}$` }

          break
        case 2:

          a = randint(1, 5)

          texte = `$\\vert \\pi - ${a}\\vert = \\dots$`
          if (a > 3) { texteCorr = `On a : $\\pi - ${a}<0 $ donc $\\vert \\pi - ${a}\\vert = ${a}-\\pi$` } else { texteCorr = `On a : $\\pi - ${a}>0 $ donc $\\vert \\pi - ${a}\\vert = \\pi - ${a}$` }

          break
        case 3:

          a = randint(2, 5)
          b = randint(2, 7, 4)
          c = Math.sqrt(b)

          texte = `$\\vert \\sqrt{${b}} - ${a}\\vert = \\dots $`

          if (c > a) {
            texteCorr = `On a : $${b} > ${a * a}$ donc $\\sqrt{${b}} > ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre positif, il en resulte que  $\\vert \\sqrt{${b}} - ${a}\\vert = \\sqrt{${b}} - ${a}$`
          } else {
            texteCorr = `On a : $${b}< ${a * a}$ donc $\\sqrt{${b}} < ${a}$ <br>
                        $\\sqrt{${b}}- ${a}$ est donc un nombre négatif, il en resulte que  $\\vert \\sqrt{${b}} -${a}\\vert = ${a}-\\sqrt{${b}}  $`
          }

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
