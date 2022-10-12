import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { texNombre } from '../../modules/outils/texNombres.js'
import { puissanceEnProduit } from '../../modules/outils/puissances.js'
export const titre = 'Écriture décimale ou fractionnaire d\'une puissance'

/**
 * Donner l'écriture décimale d'une puissance de 10
 * @author Rémi Angot
* Référence 4C30-3
 */
export const uuid = '36f8b'
export const ref = '4C30-3'
export default function EcritureDecimalePuissance () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Donner l'écriture sous la forme d'un nombre entier ou d'une fraction."
  this.nbQuestions = 8
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 3 // exposants positifs et négatifs par défaut

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const listeDeCalculs = combinaisonListes([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [6, 3], [7, 2], [7, 3], [8, 2], [8, 3], [9, 2], [9, 3]], this.nbQuestions)

    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(['+'], this.nbQuestions)
      this.consigne = "Donner l'écriture sous la forme d'un nombre entier."
    }
    if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes(['-'], this.nbQuestions)
    }
    if (this.sup === 3) {
      listeTypeDeQuestions = combinaisonListes(['+', '-'], this.nbQuestions)
    }
    for (let i = 0, texte, texteCorr, a, n, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case '+':
          a = listeDeCalculs[i][0]
          n = listeDeCalculs[i][1]
          texte = `$${a}^{${n}}$`
          if (n < 2) {
            texteCorr = `${a}^${n}=$${a}**n}$`
          } else {
            texteCorr = `$${a}^{${n}}=${puissanceEnProduit(a, n)}=${texNombre(a ** n)}$`
          }
          break
        case '-':
          a = listeDeCalculs[i][0]
          n = listeDeCalculs[i][1]
          texte = `$${a}^{${-n}}$`
          texteCorr = `$${a}^{${-n}}=\\dfrac{1}{${a}^{${n}}}=\\dfrac{1}{${puissanceEnProduit(a, n)}}=\\dfrac{1}{${texNombre(a ** n)}}$`
          break
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Exposants positifs\n2 : Exposants négatifs\n3 : Mélange']
}
