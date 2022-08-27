import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, calcul, texPrix } from '../../modules/outils.js'
export const titre = 'Remplir une facture'

/**
 * Compléter une facture
 * @author Rémi Angot
 * Référence 6P13-1
 * publié le
*/
export const uuid = '837cd'
export const ref = '6P13-1'
export default function CompleterUneFacture () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter le tableau suivant : '
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 2 // Niveau de difficulté
  // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, article1, q1, p1, article2, q2, p2, article3, q3, p3, r, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const listeArticles = [['Feuilletés au fromage', calcul(randint(50, 80) / 10)],
        ['Feuilletés à la viande', calcul(randint(50, 80) / 10)],
        ['Pizzas', calcul(randint(80, 140) / 10)],
        ['Glaces à la vanille', calcul(randint(20, 60) / 10)],
        ['Glaces au chocolat', calcul(randint(20, 60) / 10)],
        ['Filets de saumon', calcul(randint(150, 200) / 10)],
        ['Aiguillettes de poulet', calcul(randint(400, 700) / 10)]
      ]
      article1 = choice(listeArticles)
      article2 = choice(listeArticles, [article1])
      article3 = choice(listeArticles, [article1, article2])
      p1 = article1[1]
      p2 = article2[1]
      p3 = article1[1]
      q1 = randint(2, 8)
      q2 = randint(2, 8, [q1])
      q3 = randint(2, 8, [q1, q2])
      r = randint(3, 9)
      this.sup = parseInt(this.sup)
      if (this.sup === 1) {
        if (context.isHtml) {
          texte = '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n'
        } else {
          texte = '$\\begin{array}{|c|c|c|c|}\n'
        }
        texte += '\\hline\n'
        texte += '\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants} \\\\ \n'
        texte += '\\hline\n'
        texte += `\\text{${article1[0]}} & ${q1} & ${texPrix(p1)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += `\\text{${article2[0]}} & ${q2} & ${texPrix(p2)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += `\\text{${article3[0]}} & ${q3} & ${texPrix(p3)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += '\\text{Prix total (H.T.)} & & & \\ldots\\ldots \\\\ \n'
        texte += '\\hline\\hline\n'
        texte += '\\text{TVA (20~\\%)} & & & \\ldots\\ldots \\\\ \n'
        texte += '\\hline\n'
        texte += '\\text{Prix total (T.T.C.)} & & & \\ldots\\ldots \\\\ \n '
        texte += '\\hline\n'
        texte += '\\end{array}$'

        if (context.isHtml) {
          texteCorr = '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n'
        } else {
          texteCorr = '$\\begin{array}{|c|c|c|c|}\n'
        }
        texteCorr += '\\hline\n'
        texteCorr += '\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants} \\\\ \n'
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article1[0]}} & ${q1} & ${texPrix(p1)} & ${texPrix(calcul(p1 * q1))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article2[0]}} & ${q2} & ${texPrix(p2)} & ${texPrix(calcul(p2 * q2))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article3[0]}} & ${q3} & ${texPrix(p3)} & ${texPrix(calcul(p3 * q3))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Prix total (H.T.)} & & & ${texPrix(calcul(p1 * q1 + p2 * q2 + p3 * q3))} \\\\ \n`
        texteCorr += '\\hline\\hline\n'
        texteCorr += `\\text{TVA (20~\\%)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * 0.2))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Prix total (T.T.C.)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * 1.2))} \\\\ \n `
        texteCorr += '\\hline\n'

        texteCorr += '\\end{array}$'
      }

      if (this.sup === 2) {
        if (context.isHtml) {
          texte = '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n'
        } else {
          texte = '$\\begin{array}{|c|c|c|c|}\n'
        }
        texte += '\\hline\n'
        texte += '\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants} \\\\ \n'
        texte += '\\hline\n'
        texte += `\\text{${article1[0]}} & ${q1} & ${texPrix(p1)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += `\\text{${article2[0]}} & ${q2} & ${texPrix(p2)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += `\\text{${article3[0]}} & ${q3} & ${texPrix(p3)} & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += '\\text{Prix total brut (H.T.)} & & & \\ldots\\ldots \\\\ \n'
        texte += '\\hline\n'
        texte += `\\text{Réduction (${r}~\\%)} & & & \\ldots\\ldots \\\\ \n`
        texte += '\\hline\n'
        texte += '\\text{Prix total net (H.T.)} & & & \\ldots\\ldots \\\\ \n'
        texte += '\\hline\\hline\n'
        texte += '\\text{TVA (20~\\%)} & & & \\ldots\\ldots \\\\ \n'
        texte += '\\hline\n'
        texte += '\\text{Prix total (T.T.C.)} & & & \\ldots\\ldots \\\\ \n '
        texte += '\\hline\n'
        texte += '\\end{array}$'

        if (context.isHtml) {
          texteCorr = '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|c|}\n'
        } else {
          texteCorr = '$\\begin{array}{|c|c|c|c|}\n'
        }
        texteCorr += '\\hline\n'
        texteCorr += '\\text{Designations} & \\text{Quantités} & \\text{Prix unitaires H.T.} & \\text{Montants} \\\\ \n'
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article1[0]}} & ${q1} & ${texPrix(p1)} & ${texPrix(calcul(p1 * q1))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article2[0]}} & ${q2} & ${texPrix(p2)} & ${texPrix(calcul(p2 * q2))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{${article3[0]}} & ${q3} & ${texPrix(p3)} & ${texPrix(calcul(p3 * q3))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Prix total brut (H.T.)} & & & ${texPrix(calcul(p1 * q1 + p2 * q2 + p3 * q3))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Réduction (${r}~\\%)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * r / 100))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Prix total net (H.T.)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100)))} \\\\ \n`
        texteCorr += '\\hline\\hline\n'
        texteCorr += `\\text{TVA (20~\\%)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100) * 0.2))} \\\\ \n`
        texteCorr += '\\hline\n'
        texteCorr += `\\text{Prix total (T.T.C.)} & & & ${texPrix(calcul((p1 * q1 + p2 * q2 + p3 * q3) * (1 - r / 100) * 1.2))} \\\\ \n `
        texteCorr += '\\hline\n'

        texteCorr += '\\end{array}$'
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Sans réduction\n2 : Avec réduction']
}
