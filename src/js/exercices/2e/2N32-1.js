import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'

export const titre = 'Existence d\'une racine carrée'

/**
 * 2N32-1, ex 2N10
 * @author Stéphane Guyon
 */
export default function ExistenceDUneRacineCarree () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ' Dire si le nombre proposé existe ou non, en justifiant.'
  this.nbQuestions = 5
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 //

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]; let typesDeQuestions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let a; let b; let c; let d; let e; let f; let g; let h; let j; let k = 0
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        // Cas par cas, on définit le type de nombres que l'on souhaite
        // Combien de chiffres ? Quelles valeurs ?
        case 1:
          a = randint(2, 9)
          texte = `$\\sqrt{\\sqrt{${a}}}$`
          texteCorr = `$\\sqrt{${a}}$ existe car ${a} est un nombre positif.<br>
                    $\\sqrt{${a}}$ est un réel positif donc $\\sqrt{\\sqrt{${a}}}$ existe bien.`
          break
        case 2:
          b = randint(2, 9) * (-1)
          texte = `$\\sqrt{${b}}$`
          texteCorr = `$\\sqrt{${b}}$ n'existe pas car $${b}$ est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. `
          break
        case 3:
          c = randint(2, 9) * (-1)
          d = c * c
          texte = `$\\sqrt{\\left(${c}\\right)^{2}}$`
          texteCorr = `$\\sqrt{\\left(${c}\\right)^{2}}$ existe  car $\\left(${c}\\right)^{2}=${d}$ est un nombre positif.`
          break
        case 4:
          e = randint(2, 9)
          texte = `$-\\sqrt{${e}}$`
          texteCorr = `$-\\sqrt{${e}}$ existe car ${e} est un nombre positif. Le signe - est placé devant le symbole radical, le nombre $-\\sqrt{${e}}$ est donc négatif. `
          break
        case 5:
          f = randint(2, 9) * (-1)
          g = f * f
          texte = `$\\sqrt{-\\left(${f}\\right)^{2}}$`
          texteCorr = `$\\sqrt{-\\left(${f}\\right)^{2}}$ n'existe pas car $-\\left(${f}\\right)^{2}=-${g}$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `
          break
        case 6:
          h = randint(2, 3)
          texte = `$\\sqrt{${h}-\\pi}$`
          texteCorr = `$\\sqrt{${h}-\\pi}$ n'existe pas car $\\pi>3$ donc $${h}-\\pi$  est un nombre négatif. La racine carrée n'est définie que pour les réels positifs ou nul. . `
          break
        case 7:
          k = randint(4, 5)
          texte = `$\\sqrt{${k}-\\pi}$`
          texteCorr = `$\\sqrt{${k}-\\pi}$ existe car $\\pi\\approx 3,14$ donc $${k}-\\pi$  est un nombre positif.`
          break
        case 8:
          j = randint(2, 12)
          texte = `$\\sqrt{-${j}^{2}}$`
          texteCorr = `$-${j}^{2}=-${j * j}$ est un réel négatif donc sa racine carrée n'est pas définie.`
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
