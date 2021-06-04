import Exercice from '../Exercice.js'

import { listeQuestionsToContenu, randint, choice, combinaisonListes, reduireAxPlusB, texFractionSigne, ecritureAlgebrique, ecritureAlgebriqueSauf1 } from '../../modules/outils.js'

export const titre = 'Reconnaître une fonction affine.'

/**
 * Reconnaître une fonction affine
* @author Stéphane Guyon
* 2F20
*/
export default function Reconnaitrefonctionaffine () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.video = ''
  this.consigne = 'Déterminer,en expliquant, si les fonctions suivantes sont, ou non, des fonctions affines. :'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []

    typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7, 8]

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, k = [], typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      k = choice([-1, 1])
      a = randint(2, 9)
      a = a * k
      b = randint(1, 9)
      c = choice([2, 3, 5, 7, 10, 11, 13, 15, 17])
      b = b * k
      d = choice([2, 3, 5, 7, 10, 11, 13, 15, 17])
      e = randint(2, 9)

      switch (typesDeQuestions) {
        case 1:
          texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${reduireAxPlusB(a, b)}$` // f(x)=ax + b
          texteCorr = ` $f(x)=${reduireAxPlusB(a, b)}$<br>`
          texteCorr += 'On observe que la fonction $f$ s\'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += `Ici, on a : $a=${a}$ et $b=${b}$<br>`
          texteCorr += '$f$ est donc bien une fonction affine.<br>'
          break
        case 2:
          if (a === 1) {
            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}+x$<br>` // f(x)=b+x
            texteCorr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}+x$<br>`
            texteCorr += ` On peut écrire $f$ sous cette forme : $f(x)=x ${ecritureAlgebrique(b)}$<br>`
          }
          if (a === -1) {
            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}-x$<br>` // f(x)=b-x}
            texteCorr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${b}-x$<br>`
            texteCorr += ` On peut écrire $f$ sous cette forme : $f(x)=-x ${ecritureAlgebrique(b)}$<br>`
          } else {
            texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${ecritureAlgebrique(b)} ${ecritureAlgebrique(a)}  x$<br>` // f(x)=b-x}
            texteCorr = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${ecritureAlgebrique(b)} ${ecritureAlgebrique(a)}  x$<br>` // f(x)=b-x}
            texteCorr += ` On peut écrire $f$ sous cette forme : $f(x)=-x ${reduireAxPlusB(a, b)}$<br>`
          }
          texteCorr += 'On observe que la fonction $f$ s\'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += `Ici, on a : $a=${a}$ et $b=${b}$<br>`
          texteCorr += '$f$ est donc bien une fonction affine.'
          break
        case 3:
          texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${a}x^{2}${ecritureAlgebrique(b)} x${ecritureAlgebrique(c)} $` // f(x)=ax²+bx+c
          texteCorr = ` $f(x)=${a}x^{2}${ecritureAlgebriqueSauf1(b)} x${ecritureAlgebrique(c)} $<br>`
          texteCorr += 'On observe que la fonction $f$ est du second degré, puisqu\'il y a un terme en $x^{2}$<br>'
          texteCorr += 'Elle s\'écrit sous la forme $f(x)= a x^{2}+ bx+c$ et non pas sous la forme $ax+b$.<br>'
          texteCorr += '$f$ n\'est donc pas une fonction affine.<br>'
          break
        case 4:
          texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=\\sqrt{${c}}x + \\sqrt{${d}}$` // f(x)=\sqrt a x + \sqrt b
          texteCorr = ` $f(x)=\\sqrt{${c}}x + \\sqrt{${d}}$<br>`
          texteCorr += 'On observe que la fonction $f$ s\'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += `Ici, on a : $a=\\sqrt{${c}}$ et $b=\\sqrt{${d}}$<br>`
          texteCorr += '$f$ est donc bien une fonction affine.<br>'
          break
        case 5:
          texte = ` Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${a}x^{2}${ecritureAlgebrique(c)} $` // f(x)=ax²+c
          texteCorr = ` $f(x)=${a}x^{2}${ecritureAlgebrique(c)} $<br>`
          texteCorr += 'On observe que la fonction $f$ est du second degré, puisqu\'il y a un terme en $x^{2}$<br>'
          texteCorr += 'Elle s\'écrit sous la forme $f(x)= a x^{2}+b$ avec $a$ et $b$ des nombres réels, et non pas sous la forme $ax+b$.<br>'
          texteCorr += '$f$ n\'est donc pas une fonction affine.<br>'
          break
        case 6:
          texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=\\dfrac{1}{${a}x${ecritureAlgebrique(b)} }$` // f(x)=1/(ax+b)
          texteCorr = ` $f(x)=\\dfrac{1}{${a}x${ecritureAlgebrique(b)} }$<br>`
          texteCorr += 'On observe que la fonction $f$ est une fonction rationnelle, puisqu\'il y une fraction avec des termes en $x$ au dénominateur.<br>'
          texteCorr += 'Elle ne s\'écrit  pas sous la forme $ax+b$.<br>'
          texteCorr += '$f$ n\'est donc pas une fonction affine.<br>'
          break
        case 7:
          texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${texFractionSigne(1, a)}x+${texFractionSigne(1, e)} $` // f(x)=1/ax+1/b
          texteCorr = `$f(x)=${texFractionSigne(1, a)}x+${texFractionSigne(1, e)}$<br>`
          texteCorr += 'On observe que la fonction $f$ s\'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += `Ici, on a : $a=\\dfrac{1}{${a}}$ et $b=\\dfrac{1}{${e}}$<br>`
          texteCorr += '$f$ est donc bien une fonction affine.<br>'
          break
        case 8:
          texte = `Soit $f$ la fonction définie sur un intervalle $I$ de $\\mathbb R$, par $f(x)=${c}\\times (${reduireAxPlusB(a, b)}) $` // f(x)=k(ax+b)
          texteCorr = `$f(x)=${c}\\times (${reduireAxPlusB(a, b)}) $<br>`
          texteCorr += 'On peut développer l\'expression de $f$ et on obtient alors :<br>'
          texteCorr += `$f(x)=${reduireAxPlusB(a * c, b * c)} $<br>`
          texteCorr += 'On observe que la fonction $f$ s\'écrit bien sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += `Ici, on a : $a=${ecritureAlgebrique(a * c)}$ et $b=${ecritureAlgebrique(b * c)}$<br>`
          texteCorr += '$f$ est donc bien une fonction affine.<br>'
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
}
