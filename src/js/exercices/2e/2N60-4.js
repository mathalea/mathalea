import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, rienSi1, ecritureAlgebrique, ecritureParentheseSiNegatif, signe, abs, pgcd, texFractionReduite, miseEnEvidence, texFraction, texSymbole } from '../../modules/outils.js'

export const titre = 'Inéquation du premier degré'

/**
 * Inéquation du premier degré
 * * Type 1 : x+a≤b ou ax≤b
 * * Type 2 : ax+b≤c
 * * Type 3 : ax+b≤cx+d
 * * Tous les types
 * @author Remi Angot et Guillaume Valmont
 * 2N60-4, ex 2L13
 */
export const uuid = 'bc1e4'
export const ref = '2N60-4'
export default function ExerciceInequation1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
  this.correctionDetailleeDisponible = true
  if (!context.isHtml) {
    this.correctionDetaillee = false
  }
  this.sup = true // Avec des nombres relatifs
  this.sup2 = 4 // Choix du type d'inéquation
  this.nbQuestions = 6

  this.nouvelleVersion = function () {
    this.consigne = 'Résoudre ' + (this.nbQuestions !== 1 ? 'les inéquations suivantes' : 'l\'inéquation suivante') + '.'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions
    switch (this.sup2.toString()) {
      case '1':
        listeTypeDeQuestions = ['ax≤b', 'x+b≤c']
        break
      case '2':
        listeTypeDeQuestions = ['ax+b≤c']
        break
      case '3':
        listeTypeDeQuestions = ['ax+b≤cx+d']
        break
      default:
        listeTypeDeQuestions = [
          'ax+b≤0',
          'ax+b≤c',
          'ax≤b',
          'x+b≤c',
          'ax+b≤cx+d'
        ]
        break
    }
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions
    )
    for (let i = 0, a, b, c, d, symboleInegalite, symboleInegaliteOppose, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      a = randint(2, 13)
      b = randint(1, 13)
      c = randint(1, 13)
      d = randint(1, 13)
      switch (randint(1, 4)) {
        case 1:
          symboleInegalite = '<'
          symboleInegaliteOppose = '>'
          break
        case 2:
          symboleInegalite = '≤'
          symboleInegaliteOppose = '≥'
          break
        case 3:
          symboleInegalite = '>'
          symboleInegaliteOppose = '<'
          break
        case 4:
          symboleInegalite = '≥'
          symboleInegaliteOppose = '≤'
          break
      }
      if (this.sup) {
        a *= choice([-1, 1])
        b *= choice([-1, 1])
        c *= choice([-1, 1])
        d *= choice([-1, 1])
      }
      if (listeTypeDeQuestions[i] === 'ax+b≤0' ||
        listeTypeDeQuestions[i] === 'ax+b≤c') {
        if (listeTypeDeQuestions[i] === 'ax+b≤0') {
          c = 0
        }
        if (!this.sup && c < b) {
          b = randint(1, 9)
          c = randint(b, 15) // c sera plus grand que b pour que c-b>0
        }
        texte = `$${a}x${ecritureAlgebrique(b)}${texSymbole(symboleInegalite)}${c}$`
        texteCorr = texte + '<br>'
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${a}x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-1 * b))}
          ${texSymbole(symboleInegalite)}${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${a}x${texSymbole(symboleInegalite)}${c - b}$<br>`
        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a}$.<br>`
          if (a < 0) {
            texteCorr += `Comme $${a}$ est négatif, l'inégalité change de sens.<br>`
          }
        }
        if (a < 0) {
          texteCorr += `$${a}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a) +
            texSymbole(symboleInegaliteOppose))}${c - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegaliteOppose)}${texFraction(c - b, a)}$`
          texteCorr += `<br>$x${texSymbole(symboleInegaliteOppose)}${texFractionReduite(c - b, a)}$`
        } else {
          texteCorr += `$${a}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}
            ${texSymbole(symboleInegalite)}${c - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegalite)}${texFraction(c - b, a)}$`
          if (pgcd(abs(a), abs(c - b)) > 1) {
            texteCorr += `<br>$x${texSymbole(symboleInegalite)}${texFractionReduite(c - b, a)}$`
          }
        }
        if ((symboleInegalite === '<' && a >= 0) || (symboleInegalite === '>' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(c - b, a)} \\right[ $.`
        } else if ((symboleInegalite === '≤' && a >= 0) || (symboleInegalite === '≥' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(c - b, a)} \\right] $.`
        } else if ((symboleInegalite === '>' && a >= 0) || (symboleInegalite === '<' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${texFractionReduite(c - b, a)} , +\\infty \\right[ $.`
        } else if ((symboleInegalite === '≥' && a >= 0) || (symboleInegalite === '≤' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left[ ${texFractionReduite(c - b, a)} , +\\infty \\right[ $.`
        }
      }
      if (listeTypeDeQuestions[i] === 'x+b≤c') {
        a = 1
        if (!this.sup && c < b) {
          b = randint(-9, 9, [0]) // b peut être négatif, ça sera une inéquation du type x-b=c
          c = abs(randint(b, 15)) // c sera plus grand que b pour que c-b>0
        }
        texte = `$x${ecritureAlgebrique(b)}${texSymbole(symboleInegalite)}${c}$`
        texteCorr = texte + '<br>'
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-1 * b))}
          ${texSymbole(symboleInegalite)}${c}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$x${texSymbole(symboleInegalite)}${c - b}$`
        if ((symboleInegalite === '<' && a >= 0) || (symboleInegalite === '>' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${c - b} \\right[ $.`
        } else if ((symboleInegalite === '≤' && a >= 0) || (symboleInegalite === '≥' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${c - b} \\right] $.`
        } else if ((symboleInegalite === '>' && a >= 0) || (symboleInegalite === '<' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${c - b} , +\\infty \\right[ $.`
        } else if ((symboleInegalite === '≥' && a >= 0) || (symboleInegalite === '≤' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left[ ${c - b} , +\\infty \\right[ $.`
        }
      }
      if (listeTypeDeQuestions[i] === 'ax≤b') {
        texte = `$${a}x${texSymbole(symboleInegalite)}${b}$`
        texteCorr = texte + '<br>'
        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a}$.<br>`
          if (a < 0) {
            texteCorr += `Comme $${a}$ est négatif, l'inégalité change de sens.<br>`
          }
        }
        if (a < 0) {
          texteCorr += `$${a}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a) +
            texSymbole(symboleInegaliteOppose))}${b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegaliteOppose)}${texFraction(b, a)}$`
          texteCorr += `<br>$x${texSymbole(symboleInegaliteOppose)}${texFractionReduite(b, a)}$`
        } else {
          texteCorr += `$${a}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}
            ${texSymbole(symboleInegalite)}${b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegalite)}${texFraction(b, a)}$`
          if (pgcd(abs(a), abs(b)) > 1 || a < 0) {
            texteCorr += `<br>$x${texSymbole(symboleInegalite)}${texFractionReduite(b, a)}$`
          }
        }
        if ((symboleInegalite === '<' && a >= 0) || (symboleInegalite === '>' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(b, a)} \\right[ $.`
        } else if ((symboleInegalite === '≤' && a >= 0) || (symboleInegalite === '≥' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(b, a)} \\right] $.`
        } else if ((symboleInegalite === '>' && a >= 0) || (symboleInegalite === '<' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${texFractionReduite(b, a)} , +\\infty \\right[ $.`
        } else if ((symboleInegalite === '≥' && a >= 0) || (symboleInegalite === '≤' && a < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left[ ${texFractionReduite(b, a)} , +\\infty \\right[ $.`
        }
      }
      if (listeTypeDeQuestions[i] === 'ax+b≤cx+d') {
        if (c === a) {
          c = randint(1, 13, [a])
        } // sinon on arrive à une division par 0
        if (!this.sup && a < c) {
          c = randint(1, 9)
          a = randint(c + 1, 15) // a sera plus grand que c pour que a-c>0
        }
        if (!this.sup && d < b) {
          b = randint(1, 9)
          d = randint(b + 1, 15) // d sera plus grand que b pour que d-b>0
        }
        texte = `$${rienSi1(a)}x${ecritureAlgebrique(b)}${texSymbole(symboleInegalite)} ${rienSi1(c)}x${ecritureAlgebrique(d)}$`
        texteCorr = texte + '<br>'
        if (this.correctionDetaillee) {
          if (c > 0) {
            texteCorr += `On soustrait $${rienSi1(c)}x$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${rienSi1(-1 * c)}x$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a)}x${ecritureAlgebrique(b)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}
          ${texSymbole(symboleInegalite)}${c}x${ecritureAlgebrique(d)}${miseEnEvidence(signe(-1 * c) + rienSi1(abs(c)) + 'x')}$<br>`
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}${texSymbole(symboleInegalite)}${d}$<br>`
        if (this.correctionDetaillee) {
          if (b > 0) {
            texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
          } else {
            texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
          }
        }
        texteCorr += `$${rienSi1(a - c)}x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-1 * b))}
          ${texSymbole(symboleInegalite)}${d}${miseEnEvidence(ecritureAlgebrique(-1 * b))}$<br>`
        texteCorr += `$${rienSi1(a - c)}x${texSymbole(symboleInegalite)}${d - b}$<br>`

        if (this.correctionDetaillee) {
          texteCorr += `On divise les deux membres par $${a - c}$.<br>`
          if (a - c < 0) {
            texteCorr += `Comme $${a - c}$ est négatif, l'inégalité change de sens.<br>`
          }
        }
        if (a - c < 0) {
          texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c) +
            texSymbole(symboleInegaliteOppose))}${d - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegaliteOppose)}${texFraction(d - b, a - c)}$`
          texteCorr += `<br>$x${texSymbole(symboleInegaliteOppose)}${texFractionReduite(d - b, a - c)}$`
        } else {
          texteCorr += `$${rienSi1(a - c)}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}
            ${texSymbole(symboleInegalite)}${d - b + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a - c))}$<br>`
          texteCorr += `$x${texSymbole(symboleInegalite)}${texFraction(d - b, a - c)}$`
          if (pgcd(abs(d - b), abs(a - c)) > 1 || a - c < 0) {
            texteCorr += `<br>$x${texSymbole(symboleInegalite)}${texFractionReduite(d - b, a - c)}$`
          }
        }
        if ((symboleInegalite === '<' && a - c >= 0) || (symboleInegalite === '>' && a - c < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(d - b, a - c)} \\right[ $.`
        } else if ((symboleInegalite === '≤' && a - c >= 0) || (symboleInegalite === '≥' && a - c < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${texFractionReduite(d - b, a - c)} \\right] $.`
        } else if ((symboleInegalite === '>' && a - c >= 0) || (symboleInegalite === '<' && a - c < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${texFractionReduite(d - b, a - c)} , +\\infty \\right[ $.`
        } else if ((symboleInegalite === '≥' && a - c >= 0) || (symboleInegalite === '≤' && a - c < 0)) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left[ ${texFractionReduite(d - b, a - c)} , +\\infty \\right[ $.`
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte) // replace(/1x/g,'x')); //remplace 1x par x
        this.listeCorrections.push(texteCorr) // .replace(/1x/g,'x')); //remplace 1x par x
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
  this.besoinFormulaire2Numerique = [
    "Type d'inéquations",
    4,
    '1: ax≤b ou x+a≤b ou x-a≤b\n2: ax+b≤c\n3: ax+b≤cx+d\n4: Les 2 types précédents'
  ]
}
