import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, reduireAxPlusB, ecritureAlgebrique } from '../../modules/outils.js'

export const titre = 'Factoriser avec les identités remarquables (niveau II)'

/**
 * Factoriser avec a²-b² avec a ou b expression algébrique 1er degré
* @author Stéphane Guyon
* 2L11-1
*/
export const uuid = '874e8'
export const ref = '2N41-7'
export default function FactoriserIdentitesremarquables2 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Factoriser les expressions suivantes.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 3
  this.sup = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typesDeQuestionsDisponibles = []
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1] // (ax+b)²-c²
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // c²-(ax+b)²
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3] // (ax+b)²-(cx+d)²
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = [1, 2, 3] // Mélange des cas précédents
    }
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, k, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      k = choice([-1, 1])
      a = randint(2, 9)
      a = a * k
      b = randint(1, 9)
      k = choice([-1, 1])
      b = b * k
      c = randint(2, 9)
      d = randint(1, 9)
      k = choice([-1, 1])
      d = d * k
      if (a === c && b === d) {
        a = a + 1
        b = b - 2
      }
      switch (typesDeQuestions) {
        case 1:
          texte = `$(${a}x${ecritureAlgebrique(b)})^2-${c * c}$` // (ax+b)²-c²
          texteCorr = //`$(${a}x${ecritureAlgebrique(b)})^2-${c * c}=(${a}x${ecritureAlgebrique(b)})^2-${c}^2$<br>
                    `On reconnaît l'identité remarquable $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b)(\\color{red}a\\color{black}+\\color{blue}b)$, avec $a=\\color{red}${a}x${ecritureAlgebrique(b)}$ et $b=\\color{blue}${c}$<br><br>
                    $(${a}x${ecritureAlgebrique(b)})^2-${c * c}=\\left[\\color{red} (${a}x${ecritureAlgebrique(b)})\\color{black}-\\color{blue} ${c}\\right] \\left[ \\color{red}(${a}x${ecritureAlgebrique(b)})\\color{black}+\\color{blue}${c}\\right] $<br>
                    $\\phantom{(${a}x${ecritureAlgebrique(b)})^2-${c * c}}= (${reduireAxPlusB(a, b - c)}) (${reduireAxPlusB(a, b + c)})$`
          break
        case 2:
          texte = `$${c * c}-(${a}x${ecritureAlgebrique(b)})^2$` // c²-(ax+b)²
          texteCorr = //`$${c * c}-(${a}x${ecritureAlgebrique(b)})^2=${c}^2-(${a}x${ecritureAlgebrique(b)})^2$<br>
                    `On reconnaît l'identité remarquable $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b)(\\color{red}a\\color{black}+\\color{blue}b)$, avec $a=\\color{blue}${c}$ et $b=\\color{red}${a}x${ecritureAlgebrique(b)}$. <br><br>
                    $${c * c}-(${a}x${ecritureAlgebrique(b)})^2=\\left[ \\color{blue}${c}\\color{black}-(\\color{red}${a}x${ecritureAlgebrique(b)}\\color{black}) \\right] \\left[ \\color{blue}${c}\\color{black}+(\\color{red}${a}x${ecritureAlgebrique(b)}\\color{black}) \\right] $<br>
                    $\\phantom{${c * c}-(${a}x${ecritureAlgebrique(b)})^2}=(${c}${ecritureAlgebrique(-a)}x${ecritureAlgebrique(-b)}) (${c}${ecritureAlgebrique(a)}x${ecritureAlgebrique(b)})$<br>
                    $\\phantom{${c * c}-(${a}x${ecritureAlgebrique(b)})^2}=(${reduireAxPlusB(-a, c - b)}) (${reduireAxPlusB(a, b + c)})$`
          break
        case 3:
          texte = `$(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2$` // (ax+b)²-(cx+d)²
          //$(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2=a^2-b^2$<br> 
          texteCorr = `On reconnaît l'identité remarquable $a^2-b^2=(\\color{red}a\\color{black}-\\color{blue}b\\color{black})(\\color{red}a\\color{black}+\\color{blue}b\\color{black})$, avec $a=\\color{red}${a}x${ecritureAlgebrique(b)}$ et $b=\\color{blue}${c}x${ecritureAlgebrique(d)}$. <br><br>
                    $(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2=
                    \\left[ (\\color{red}${a}x${ecritureAlgebrique(b)}\\color{black})-
                    (\\color{blue}${c}x${ecritureAlgebrique(d)}\\color{black})\\right]
                    \\left[ (\\color{red}${a}x${ecritureAlgebrique(b)}\\color{black})+
                    (\\color{blue}${c}x${ecritureAlgebrique(d)}\\color{black})\\right]$<br>
                    $\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                    (${a}x${ecritureAlgebrique(b)}${ecritureAlgebrique(-c)}x${ecritureAlgebrique(-d)})
                    (${a}x${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}x${ecritureAlgebrique(d)})$<br>`
          if (a !== c && b !== d && a !== -c && b !== -d) {
            texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                        (${reduireAxPlusB(a - c, b - d)})(${reduireAxPlusB(a + c, b + d)})$  `
          } else {
            if (a !== c && a !== -c && b === d && a !== c + 1) {
              texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                                ${a - c}x(${reduireAxPlusB(a + c, b + d)})$    `
            }
            if (a !== c && a !== -c && b === d && a === c + 1) {
              texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                                x(${reduireAxPlusB(a + c, b + d)})$    `
            }
            if (a !== c && a !== -c && b === -d) {
              texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                                    ${a + c}x(${reduireAxPlusB(a - c, b - d)})$  `
            }
            if (a === c && b !== d && b !== -d) {
              texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                                    ${b - d}(${reduireAxPlusB(a + c, b + d)})$  `
            }
            if (a === -c && b !== d && b !== -d) {
              texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                                    ${b + d}(${reduireAxPlusB(a - c, b - d)})$  `
            }
          } ;
          break
      }
      if (this.questionJamaisPosee(i, a, b, c, d, k, typesDeQuestions)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 :forme (ax+b)²-c²\n 2 : forme c²-(ax+b)²\n 3 : (ax+b)²-(cx+d)²\n 4 : Mélange des cas précédents']
}
