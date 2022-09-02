import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texteEnCouleur } from '../../modules/outils.js'

export const titre = 'Résoudre des équations carrées.'

/**
 * Résoudre des équations produit-nul
* @author Stéphane Guyon
* 2N52-2, ex 2L11-1
*/
export const uuid = 'bb6d5'
export const ref = '2N52-2'
export default function FactoriserIdentitesRemarquables2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 3
  this.sup = 1
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.consigne = 'Résoudre dans $\\mathbb R$ ' + (this.nbQuestions !== 1 ? 'les équations suivantes' : 'l\'équation suivante') + '.'
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1] // x²-a²=0
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // x²-b=0
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3, 4, 5, 6, 7] // x²-b=0
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7] // x²-b=0
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(1, 9)
      b = randint(2, 19, [4, 8, 9, 12, 16])
      switch (typesDeQuestions) {
        case 1:
          texte = `$x^{2}-${a * a}=0$` // x²-a²=0
          texteCorr = `$x^{2}-${a * a}=0$<br>`
          texteCorr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=${a}$<br>`
          texteCorr += 'On obtient alors :<br>'
          texteCorr += `$\\phantom{\\iff}x^{2}-${a * a}=0$<br>`
          texteCorr += `$\\phantom{\\iff}x^{2}-${a}^{2}=0$`
          texteCorr += `$\\iff (x-${a})(x+${a})=0$<br>`
          texteCorr += `${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>`
          texteCorr += `$\\iff x-${a}=0\\quad$ ou bien $\\quad x+${a}=0$<br>`
          texteCorr += `$\\iff x=${a}\\quad$ ou bien $\\quad x=-${a}$<br>`
          texteCorr += `$\\iff S=\\{-${a};${a})$<br>`
          break
        case 2:

          texte = `$x^{2}-${b}=0$` // x²-b=0
          texteCorr = `$x^{2}-${b}=0$<br>`
          texteCorr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=\\sqrt{${b}}$<br>`
          texteCorr += 'On obtient alors :<br>'
          texteCorr += `$\\phantom{\\iff}x^{2}-${b}=0$<br>`
          texteCorr += `$\\phantom{\\iff}x^{2}-(\\sqrt{${b}})^{2}=0$<br>`
          texteCorr += `$\\iff (x-\\sqrt{${b}})(x+\\sqrt{${b}})=0$<br>`
          texteCorr += `${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>`
          texteCorr += `$\\iff x-\\sqrt{${b}}=0\\quad$ ou bien $\\quad x+\\sqrt{${b}}=0$<br>`
          texteCorr += `$\\iff x=\\sqrt{${b}}\\quad$ ou bien $\\quad x=-\\sqrt{${b}}$<br>`
          texteCorr += `$\\iff S=\\{-\\sqrt{${b}}\\quad ;\\sqrt{${b}})$<br>`
          break
        case 3:
          texte = `$x^{2}+${a * a}=0$` // x²+a²=0
          texteCorr = `$x^{2}+${a * a}=0$<br>`
          texteCorr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a * a}
                        d'obtenir 0.<br>`
          texteCorr += '$ S=\\emptyset$<br>'
          break
        case 4:
          texte = `$x^{2}+${a * a}=0$` // x²+a²=0
          texteCorr = `$x^{2}+${a * a}=0$<br>`
          texteCorr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a * a}
                        d'obtenir 0.<br>`
          texteCorr += '$ S=\\emptyset$<br>'
          break
        case 5:
          texte = `$x^{2}=${a * a}$` // x²+a²
          texteCorr = `$x^{2}=${a * a}$<br>`
          texteCorr += `Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>`
          texteCorr += `$\\phantom{\\iff}x^{2}=${a * a}$<br>`
          texteCorr += `$\\iff x^{2}-${a * a}=0$<br>`
          texteCorr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=${a}$<br>`
          texteCorr += 'On obtient alors :<br>'
          texteCorr += `$\\iff x^{2}-${a * a}=0$<br>`
          texteCorr += `$\\iff x^{2}-${a}^{2}=0$<br>`
          texteCorr += `$\\iff (x-${a})(x+${a})=0$<br>`
          texteCorr += `${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>`
          texteCorr += `$\\iff x-${a}=0\\quad$ ou bien $\\quad x+${a}=0$<br>`
          texteCorr += `$\\iff x=${a}\\quad$ ou bien $\\quad x=-${a}$<br>`
          texteCorr += `$\\iff S=\\{-${a};${a})$<br>`
          break
        case 6:
          texte = `$x^{2}=-${a * a}$` // x²=-a²
          texteCorr = `$x^{2}=-${a * a}$<br>`
          texteCorr += `Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>`
          texteCorr += `$x^{2}+${a * a}=0$<br>`
          texteCorr += `On ne reconnaît pas d'identité remarquable. <br>
                        $a^2+b^2$ ne peut pas se factoriser.<br>
                        $x^{2}$ étant un nombre positif, il est impossible en lui ajoutant ${a * a}
                        d'obtenir 0.<br>`
          texteCorr += '$ S=\\emptyset$<br>'
          break
        case 7:

          texte = `$x^{2}=${b}$` // x²=b
          texteCorr = `$\\phantom{iff} x^{2}=${b}$<br>`
          texteCorr += `Pour résoudre ce genre d'équations, il faut essayer de se ramener à une équation produit-nul, <br>
                        donc déjà obtenir une équation nulle. <br>`
          texteCorr += `$\\phantom{iff} x^{2}=${b}$<br>`
          texteCorr += `$\\iff x^{2}-${b}=0$<br>`
          texteCorr += `On reconnaît l'identité remarquable $a^2-b^2$ :<br>
                        avec  $\\quad a=x \\quad$ et $\\quad b=\\sqrt{${b}}$<br>`
          texteCorr += 'On obtient alors :<br>'
          texteCorr += `$\\phantom{\\iff}x^{2}-${b}=0$<br>`
          texteCorr += `$\\phantom{\\iff}x^{2}-(\\sqrt{${b}})^{2}=0$<br>`
          texteCorr += `$\\iff (x-\\sqrt{${b}})(x+\\sqrt{${b}})=0$<br>`
          texteCorr += `${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>`
          texteCorr += `$\\iff x-\\sqrt{${b}}=0\\quad$ ou bien $\\quad x+\\sqrt{${b}}=0$<br>`
          texteCorr += `$\\iff x=\\sqrt{${b}}\\quad$ ou bien $\\quad x=-\\sqrt{${b}}$<br>`
          texteCorr += `$\\iff S=\\{-\\sqrt{${b}}\\quad ;\\sqrt{${b}})$<br>`
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 :équations x²-a²=0\n 2 : équations x²-b=0\n 3 :équations x²+a²=0;x²=+/-a²\n 4 : Mélange des cas précédents']
}
