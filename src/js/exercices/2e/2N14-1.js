import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombrec, texNombre } from '../../modules/outils.js'
import { setReponse, ajouteChampTexte } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const amcReady = true
export const amcType = 'AMCOpen'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient'

/**
 * 2N14-1, ex 2N20
 * @author Stéphane Guyon (Exportable AMC par Eric Elter)
 */
export const uuid = '25fb4'
export const ref = '2N14-1'
export default function EnsembleDeNombres () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Déterminer le plus petit ensemble de nombres dans lequel le nombre proposé appartient.'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, c, d, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:

          a = randint(0, 150)

          texte = `$${a} \\in \\dots$`
          texteCorr = `$${a}$ est un entier naturel, on a donc $${a}\\in \\mathbb{N}$
                  `
          setReponse(this, i, 'N', { formatInteractif: 'texte' })
          break
        case 2:

          a = randint(0, 150) * (-1)

          texte = `$${a} \\in \\dots$`
          texteCorr = `$${a}$ est un entier relatif, on a donc $${a}\\in \\mathbb{Z}$
                    `
          setReponse(this, i, 'Z', { formatInteractif: 'texte' })
          break
        case 3:

          d = randint(1, 9)
          b = randint(0, 9) * choice([-1, 1])
          c = randint(0, 9)
          a = b + c / 10 + d / 100
          a = a * choice([-1, 1])

          texte = `$${texNombrec(b + c / 10 + d / 100)}\\in \\dots$`
          texteCorr = `$${texNombrec(b + c / 10 + d / 100)}$ est un nombre décimal, on a donc $${texNombrec(b + c / 10 + d / 100)}\\in \\mathbb{D}$
                    `
          setReponse(this, i, 'D', { formatInteractif: 'texte' })
          break
        case 4:

          a = randint(2, 16)
          b = randint(0, 9)
          c = randint(0, 9)

          texte = `$\\sqrt{${texNombrec(a * a)}}\\in \\dots$`
          texteCorr = `$\\sqrt{${a * a}}=${a}$  est un entier naturel, on a donc $\\sqrt{${texNombrec(a * a)}}\\in \\mathbb{N}$
                    `
          setReponse(this, i, 'N', { formatInteractif: 'texte' })
          break
        case 5:

          a = randint(2, 16)
          b = randint(2, 6)
          c = randint(0, 9)

          texte = `$\\dfrac{${texNombrec(b * a)}}{${a}}\\in \\dots$`
          texteCorr = `$\\dfrac{${texNombrec(b * a)}}{${a}}=\\dfrac{${b}\\times ${a}}{${a}}=${b}$  est un entier naturel, on a donc $\\dfrac{${texNombrec(b * a)}}{${a}}\\in \\mathbb{N}$
                    `
          setReponse(this, i, 'N', { formatInteractif: 'texte' })
          break
        case 6:

          a = choice([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 39, 41, 43, 47, 53, 57, 61, 67, 71, 73, 79, 83, 87, 89])
          b = choice([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 39, 41, 43, 47, 53, 57, 61, 67, 71, 73, 79, 83, 87, 89], [a])

          texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`
          texteCorr = `$\\dfrac{${a}}{${b}}$ n'est pas un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{Q}$
                    `
          setReponse(this, i, 'Q', { formatInteractif: 'texte' })
          break
        case 7:

          b = choice([4, 5, 8, 10])
          a = randint(4, 100)
          while (a % b === 0) { a = randint(4, 100) }

          texte = `$\\dfrac{${a}}{${b}}\\in \\dots$`
          texteCorr = `$\\dfrac{${a}}{${b}}=${texNombre(a / b)}$  est un nombre décimal. On a donc $\\dfrac{${a}}{${b}}\\in \\mathbb{D}$
                    `
          setReponse(this, i, 'D', { formatInteractif: 'texte' })
          break
        case 8:

          a = randint(2, 100, [4, 9, 16, 25, 36, 49, 64, 81])
          texte = `$\\sqrt{${a}} \\in \\dots$`
          texteCorr = `$\\sqrt{${a}}$  est un nombre irrationnel. On a donc $\\sqrt{${a}}\\in \\mathbb{R}$
                    `
          setReponse(this, i, 'R', { formatInteractif: 'texte' })
          break
        case 9:
          a = randint(2, 9)
          texte = `$${a}\\pi \\in \\dots$`
          texteCorr = `$${a}\\pi$   est un nombre irrationnel. On a donc $${a}\\pi \\in \\mathbb{R}$
                    `
          setReponse(this, i, 'R', { formatInteractif: 'texte' })
          break
      }
      if (context.isAmc) {
        this.autoCorrection[i].propositions = [{ texte: this.listeCorrections[i], statut: '1' }]
      }
      texte += ajouteChampTexte(this, i)
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
