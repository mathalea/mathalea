import Exercice from '../ClasseExercice.js'
// eslint-disable-next-line camelcase
import { listeQuestionsToContenu, randint, choice, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Résoudre une équation $x^2 = a$'

/**
 * Résoudre une équation de type x²=a
* @auteur Jean-Claude Lhote
* 3L15
*/
export default function ResoudreEquatioeX2EgalA () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les équations suivantes'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  // eslint-disable-next-line no-undef
  sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1.5
  this.spacing = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeFractions = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
      [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
      [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
    let listeTypeQuestions = []
    switch (parseInt(this.sup)) {
      case 1: listeTypeQuestions = combinaisonListes([1], this.nbQuestions)
        break
      case 2: listeTypeQuestions = combinaisonListes([2], this.nbQuestions)
        break
      case 3: listeTypeQuestions = combinaisonListes([3], this.nbQuestions)
        break
      case 4: listeTypeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    }
    for (let i = 0, fraction, ns, ds, a, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeQuestions[i]) {
        case 1: a = randint(1, 20) // x²=a*a donc x=a ou -a.
          texte = `$x^2=${a * a}$`
          texteCorr = `$x^2=${a * a}$ équivaut à $x = \\sqrt{${a * a}}$ ou $x = -\\sqrt{${a * a}}$<br>Soit $x = ${a}$ ou $x = -${a}$<br>`
          texteCorr += `Il est équivalent de résoudre $x^2 - ${a * a}=0$ c'est à dire $x^2 - ${a}^{2}=0$ <br>Soit $(x - ${a})(x + ${a})=0$ qui donne les deux solutions ci-dessus. `
          break
        case 2: // x²=(ns*ns)/(ds*ds) solutions rationnelles
          fraction = choice(listeFractions)
          ns = fraction[0]
          ds = fraction[1]
          texte = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$`
          texteCorr = `$x^2=\\dfrac{${ns * ns}}{${ds * ds}}$ équivaut à $x = \\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$ ou $x = -\\sqrt{\\dfrac{${ns * ns}}{${ds * ds}}}$<br>Soit $x = \\dfrac{${ns}}{${ds}}$ ou $x = -\\dfrac{${ns}}{${ds}}$<br>`
          texteCorr += `Il est équivalent de résoudre $x^2 - \\dfrac{${ns * ns}}{${ds * ds}}=0$ c'est à dire $x^2 - (\\dfrac{${ns}}{${ds}})^{2}=0$<br>Soit $(x - \\dfrac{${ns}}{${ds}})(x + \\dfrac{${ns}}{${ds}})=0$ qui donne les deux solutions ci-dessus. `
          break

        case 3: a = randint(2, 50, [4, 9, 16, 25, 36, 49]) // solution irrationnelles
          texte = `$x^2=${a}$`
          texteCorr = `$x^2=${a}$ équivaut à $x = \\sqrt{${a}}$ ou $x = -\\sqrt{${a}}$<br>`
          texteCorr += `Il est équivalent de résoudre $x^2 - ${a}=0$  c'est à dire $x^2 - (\\sqrt{${a}})^{2}=0$<br>Soit $(x - \\sqrt{${a}})(x + \\sqrt{${a}})=0$ qui donne les deux solutions ci-dessus. `
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // alert(this.listeQuestions)
        // alert(this.listeCorrections)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : solutions entières\n 2 : solutions rationnelles\n 3 : Solutions irrationnelles\n 4 : Mélange des 3 autres niveaux']
}
