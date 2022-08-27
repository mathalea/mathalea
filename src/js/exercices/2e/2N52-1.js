import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, reduireAxPlusB, texteEnCouleur, choice, ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { fraction, obtenirListeFractionsIrreductiblesFaciles } from '../../modules/fractions.js'
export const titre = 'Résoudre les équations produit-nul'

/**
 * Résoudre des équations (ax+b)(cx+d)=0
* @author Stéphane Guyon & Jean-claude Lhote
* 2N52-1, ex 2L12
* publié le 6/02/2021
*/
export const uuid = '53762'
export const ref = '2N52-1'
export default function EquationsProduitsNuls2 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre dans $\\mathbb R$ les équations suivantes :'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 3
  this.sup = 1
  this.spacingCorr = 3
  this.nbQuestions = 2
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    if (this.sup < 4) {
      typesDeQuestionsDisponibles = [parseInt(this.sup)]
    } else {
      typesDeQuestionsDisponibles = [1, 2, 3]
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, fractions, index, f1, f2, f3, f4, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-9, 9, [0, a])
      d = randint(1, 9, [0, b])
      switch (typesDeQuestions) {
        case 1:
          texte = `$(${reduireAxPlusB(a, b)})(${reduireAxPlusB(c, d)})=0$`
          texteCorr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>`
          texteCorr += texte + '<br>' // optimisation du code
          texteCorr += `$\\iff ${reduireAxPlusB(a, b)}=0$ ou $${reduireAxPlusB(c, d)}=0$<br>`
          if (this.correctionDetaillee) { // on ajoute les étapes de résolution si la correction détaillée est cochée.
            texteCorr += `$\\iff ${reduireAxPlusB(a, 0)}=${-b}$ ou $ ${reduireAxPlusB(c, 0)}=${-d}$<br>`
          }
          f1 = fraction(-b, a)
          f2 = fraction(-d, c)
          texteCorr += `$\\iff x=${f1.texFraction}$ ou $ x=${f2.texFraction}$<br>On en déduit :  `
          if (-b / a > -d / c) {
            texteCorr += `$S=\\left\\{${f2.texFractionSimplifiee};${f1.texFractionSimplifiee}\\right\\}$`
          } else if (-b / a < -d / c) {
            texteCorr += `$S=\\left\\{${f1.texFractionSimplifiee};${f2.texFractionSimplifiee}\\right\\}$`
          } else texteCorr += `$S=\\left\\{${f1.texFractionSimplifiee}\\right\\}$`

          break
        case 2:
          fractions = obtenirListeFractionsIrreductiblesFaciles()
          index = randint(0, fractions.length - 1)
          f1 = fractions[index]
          index = randint(0, fractions.length - 1, index)
          f2 = fractions[index]
          f3 = f1.inverse().multiplieEntier(-b)
          f4 = f2.inverse().multiplieEntier(-d)
          texte = `$(${f1.texFraction}x${ecritureAlgebrique(b)})(${f2.texFraction}x${ecritureAlgebrique(d)})=0$`
          texteCorr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                    ${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>
                    $(${f1.texFraction}x${ecritureAlgebrique(b)})(${f2.texFraction}x${ecritureAlgebrique(d)})=0$<br>`
          texteCorr += `$\\iff ${f1.texFraction}x${ecritureAlgebrique(b)}=0$ ou $${f2.texFraction}x${ecritureAlgebrique(d)}=0$<br>`
          if (this.correctionDetaillee) {
            texteCorr += `$\\iff ${f1.texFraction}x=${-b}$ ou $${f2.texFraction}x=${-d}$<br>`
            texteCorr += `$\\iff x=${-b}\\div ${f1.texFraction}$ ou $x=${-d}\\div ${f2.texFraction}$<br>`
            texteCorr += `$\\iff x=${-b}\\times ${f1.inverse().texFraction}$ ou $x=${-d}\\times ${f2.inverse().texFraction}$<br>`
          }
          texteCorr += `$\\iff x=${f3.texFractionSimplifiee}$ ou $ x=${f4.texFractionSimplifiee}$<br>
                     On en déduit :  `
          if (f3.differenceFraction(f4).s > 0) {
            texteCorr += `$S=\\left\\{${f4.texFractionSimplifiee};${f3.texFractionSimplifiee}\\right\\}$`
          } else if (f3.differenceFraction(f4).s < 0) {
            texteCorr += `$S=\\left\\{${f3.texFractionSimplifiee};${f4.texFractionSimplifiee}\\right\\}$`
          } else texteCorr += `$S=\\left\\{${f3.texFractionSimplifiee}\\right\\}$`
          break
        case 3: // (ax+f1)(bx+f2)=0
          fractions = obtenirListeFractionsIrreductiblesFaciles()
          index = randint(0, fractions.length - 1)
          f1 = fractions[index].multiplieEntier(choice([-1, 1]))
          index = randint(0, fractions.length - 1, index)
          f2 = fractions[index].multiplieEntier(choice([-1, 1]))
          f3 = f1.entierDivise(-a)
          f4 = f2.entierDivise(-b)
          texte = `$(${reduireAxPlusB(a, 0)}${f1.texFractionSignee})(${reduireAxPlusB(b, 0)}${f2.texFractionSignee})=0$`
          texteCorr = `On reconnaît une équation produit-nul, donc on applique la propriété :<br>
                        ${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>
                        $(${reduireAxPlusB(a, 0)}${f1.texFractionSignee})(${reduireAxPlusB(b, 0)}${f2.texFractionSignee})=0$<br>`
          texteCorr += `$\\iff ${reduireAxPlusB(a, 0)}${f1.texFractionSignee}=0$ ou $${reduireAxPlusB(b, 0)}${f2.texFractionSignee}=0$<br>`
          if (this.correctionDetaillee) {
            texteCorr += `$\\iff ${reduireAxPlusB(a, 0)}=${f1.multiplieEntier(-1).texFraction}$ ou $${reduireAxPlusB(b, 0)}=${f2.multiplieEntier(-1).texFraction}$<br>`
            texteCorr += `$\\iff x=${f1.multiplieEntier(-1).texFraction}\\div ${ecritureParentheseSiNegatif(a)}$ ou $x=${f2.multiplieEntier(-1).texFraction}\\div ${ecritureParentheseSiNegatif(b)}$<br>`
            texteCorr += `$\\iff x=${f1.multiplieEntier(-1).texFraction}\\times ${fraction(1, a).texFSP}$ ou $x=${f2.multiplieEntier(-1).texFraction}\\times ${fraction(1, b).texFSP}$<br>`
          }
          texteCorr += `$\\iff x=${f3.texFractionSimplifiee}$ ou $ x=${f4.texFractionSimplifiee}$<br>
                         On en déduit :  `
          if (f3.differenceFraction(f4).s > 0) {
            texteCorr += `$S=\\left\\{${f4.texFractionSimplifiee};${f3.texFractionSimplifiee}\\right\\}$`
          } else if (f3.differenceFraction(f4).s < 0) {
            texteCorr += `$S=\\left\\{${f3.texFractionSimplifiee};${f4.texFractionSimplifiee}\\right\\}$`
          } else texteCorr += `$S=\\left\\{${f3.texFractionSimplifiee}\\right\\}$`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 5, '1 : (ax+b)(cx+d)=0 a,b,c et d entiers\n 2 : (ax+b)(cx+d)=0 a et c rationnels\n 3 : (ax+b)(cx+d)=0 b et d rationnels\n4 : Mélange des cas précédents']
}
