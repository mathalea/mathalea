import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'

import { listeQuestionsToContenu, randint, choice, quotientier, combinaisonListes, ecritureParentheseSiNegatif, texFractionReduite, ecritureAlgebrique } from '../../modules/outils.js'
import { repere, point, tracePoint, labelPoint } from '../../modules/2d.js'
export const titre = 'Déterminer une fonction affine à partir de deux images.'

/**
 * Déterminer une fonction affine à partir de deux images
* @author Stéphane Guyon
* 2F20
*/
export const uuid = 'ef897'
export const ref = '2F10-4'
export default function Determinerfonctionaffine () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Déterminer, en expliquant, l'expression de la fonctions affine $f$ vérifiant les conditions de l'énoncé :"
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
      typesDeQuestionsDisponibles = [1] // on donne f(a)=b et f(c)=d
    }
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // On donne 2 points A(a;b) et B(c;d) avec le graphique
    }
    if (this.sup === 3) {
      typesDeQuestionsDisponibles = [3] // On donne 2 points A(a;b) et B(c;d) sans le graphique
    }
    if (this.sup === 4) {
      typesDeQuestionsDisponibles = [1, 2, 3] // Mélange des cas précédents
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0, A, B, r, f, c, t, l, xA, xB, yA, yB, a, b, d, e, k, typesDeQuestions; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      k = choice([-1, 1])
      a = randint(1, 5)
      a = a * k
      b = randint(1, 5)
      k = choice([-1, 1])
      b = b * k

      c = randint(1, 5, [a])
      k = choice([-1, 1])
      c = c * k
      if (a === c) { c = -c }// on évite deux antécédents identiques
      d = randint(1, 5)
      k = choice([-1, 1])
      d = d * k
      e = a * b - a * d
      f = a - c

      switch (typesDeQuestions) {
        case 1:
          texte = ` Déterminer l'expression algébrique de la fonction affine $f$ définie sur $\\mathbb R$, sachant que
                        $f(${a})=${b}$ et que $f(${c})=${d}$.`
          texteCorr = `On sait que $f$ est une fonction affine qui vérifie 
                        $f(${a})=${b}$ et $f(${c})=${d}$. <br>`
          texteCorr += 'Comme $f$ est une fonction affine, on sait d\'après le cours qu\'elle va s\'écrire sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += 'L\'objectif est donc de déterminer $a$ et $b$.<br>'
          texteCorr += 'Or, on sait d\'après le cours, que dans ces conditions, avec $u\\neq v$, on a : '
          texteCorr += '$a=\\dfrac{f(u)-f(v)}{u-v}.$<br>'
          texteCorr += `On applique cette relation avec les données de l'énoncé : $u=${a}$ et  $v=${c}$ ,<br>`
          texteCorr += 'ce qui donne :  '
          texteCorr += `$a=\\dfrac{f(${a})-f(${c})}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b}-${ecritureParentheseSiNegatif(d)}}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b - d}}{${a - c}}$<br>`
          texteCorr += `d'où : $a=${texFractionReduite(b - d, a - c)}.$<br>`
          if (b === d) { // m=0 ; cas f constante
            texteCorr += '$f$ est une fonction constante, cas particulier des fonctions affines.<br>'
            texteCorr += `On a donc : $f(x)=${b}$`
          } else {
            texteCorr += 'On peut donc déjà déduire que la fonction $f$ s\'écrit sous la forme : '
            if ((b - d) / (a - c) === 1) { // m=1
              texteCorr += '$f(x)= x +b.$<br>'
            }
            if ((b - d) / (a - c) === -1) { // m=-1
              texteCorr += '$f(x)= -x +b.$<br>'
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
            }
            texteCorr += 'On cherche $b$ et pour cela on peut utiliser au choix une des deux données de l\'énoncé :<br>'
            texteCorr += `On prend par exemple : $f(${a})=${b}$  <br>`
            texteCorr += 'Comme'
            if ((b - d) / (a - c) === 1) { // cas où m=1
              texteCorr += '$f(x)= x +b.$<br>'
              texteCorr += `On en déduit que :$f(${a})=${a} +b=${b}$<br>`
              texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b - a}$<br>`
              texteCorr += 'On peut conclure que '
              if (b + a !== 0) { texteCorr += `$f(x)= x ${ecritureAlgebrique(b - a)}.$<br>` } else { texteCorr += '$f(x)= x.$<br>' }
            }
            if ((b - d) / (a - c) === -1) { // m=-1
              texteCorr += '$f(x)= -x +b.$<br>'
              texteCorr += `On en déduit que :$f(${a})=${-a} +b=${b}$<br>`
              texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b + a}$<br>`
              texteCorr += 'On peut conclure que '
              if (b + a !== 0) { texteCorr += `$f(x)= -x ${ecritureAlgebrique(b + a)}.$<br>` } else { texteCorr += '$f(x)= -x.$<br>' }
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
              texteCorr += `On en déduit que :$f(${a})=${texFractionReduite(b - d, a - c)} \\times ${ecritureParentheseSiNegatif(a)} +b=${b}$<br>`
              if (e * f > 0) { // on adapte selon le signe de la fraction, ici positive
                texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b}-${texFractionReduite(e, f)}$<br>`
              } else { // ici négative, pour éviter -- p
                texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b}-(${texFractionReduite(e, f)})$<br>`
              }
              texteCorr += `$\\phantom{On en deduit que :}\\iff b=${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$<br> `
              texteCorr += '<br>On peut conclure que '
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) { // cas où p>0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x+  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              }
              if ((b * a - b * c - a * b + a * d) * (a - c) < 0) { // cas où p<0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              }
              if ((b * a - b * c - a * b + a * d) * (a - c) === 0) { // cas où p<0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x.$`
              }
            }
          }

          break
        case 2:

          r = repere()

          xA = randint(0, 3) * choice([-1, 1])// Abscisse de A
          yA = a * xA + b// Ordonnée de A
          xB = randint(0, 3, [xA]) * choice([-1, 1]) // Abscisse de B, différente de celle de A
          if (a * xB + b > 9) { // On évite de trop grandes valeurs pour yA
            xB = quotientier(xB, 2)
          }
          if (a * xB + b < -9) {
            xB = quotientier(xB, 2)
          }
          if (xB === xA) {
            xA = xA + 1
            xB = xB - 1
          }
          yB = a * xB + b// Ordonnée de B
          A = point(xA, yA, 'A', 'left')
          B = point(xB, yB, 'B', 'left')
          if (yA === 0) { A = point(xA, yA, 'A', 'above') }// éviter A sur l'axe des abscisses
          if (xB === 0) { B = point(xB, yB, 'B', 'right') }// éviter A sur l'axe des abscisses
          if (xA === 0) { A = point(xA, yA, 'A', 'right') }// éviter A sur l'axe des abscisses
          if (yB === 0) { B = point(xB, yB, 'B', 'above') }// éviter A sur l'axe des abscisses

          t = tracePoint(A, B, 'red') // Variable qui trace les points avec une croix
          l = labelPoint(A, B, 'red')// Variable qui trace les noms A et B
          texte = 'Déterminer, en détaillant les calculs, l\'expression algébrique de la fonction affine $f$ dont la représentation<br>'
          texte += `graphique passe par les points $A(${xA};${yA})$ et $B(${xB};${yB})$ représentés ci-dessous :<br>`
          texte += mathalea2d({
            xmin: -6,
            ymin: -10,
            xmax: 6,
            ymax: 10
          }, r, t, l)
          a = xA
          b = yA
          c = xB
          d = yB
          texteCorr = `Les points $A(${xA};${yA})$ et $B(${xB};${yB})$ appartiennent à la courbe représentative de $f$<br>`

          texteCorr += `Comme $A(${xA};${yA})\\in \\mathcal{C_f}$, on a  $f(${a})=${b}$  et comme $B(${xB};${yB})\\in \\mathcal{C_f}$, on a $f(${c})=${d}$ <br>`
          texteCorr += 'Comme $f$ est une fonction affine, on sait d\'après le cours qu\'elle va s\'écrire sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += 'L\'objectif est donc de déterminer $a$ et $b$.<br>'
          texteCorr += 'Or, on sait d\'après le cours, que dans ces conditions, avec $u\\neq v$, on a : '
          texteCorr += '$a=\\dfrac{f(u)-f(v)}{u-v}.$<br>'
          texteCorr += `On applique cette relation avec les données de l'énoncé : $u=${a}$ et  $v=${c}$ ,<br>`
          texteCorr += 'ce qui donne : '
          texteCorr += `$a=\\dfrac{f(${a})-f(${c})}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b}-${ecritureParentheseSiNegatif(d)}}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b - d}}{${a - c}}$<br>`
          texteCorr += `d'où : $a=${texFractionReduite(b - d, a - c)}.$<br>`
          if (b === d) {
            texteCorr += '$f$ est une fonction constante, cas particulier des fonctions affines.<br>'
            texteCorr += `On a donc : $f(x)=${b}$`
          } else {
            texteCorr += 'On peut donc déjà déduire que la fonction $f$ s\'écrit sous la forme : '
            if ((b - d) / (a - c) === 1) {
              texteCorr += '$f(x)= x +b.$<br>'
            }
            if ((b - d) / (a - c) === -1) {
              texteCorr += '$f(x)= -x +b.$<br>'
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
            }
            texteCorr += 'On cherche $b$ et pour cela on peut utiliser au choix une des deux données de l\'énoncé :<br>'
            texteCorr += `On prend par exemple : $f(${a})=${b}$  <br>`
            texteCorr += 'Comme'
            if ((b - d) / (a - c) === 1) {
              texteCorr += '$f(x)= x +b.$<br>'
            }
            if ((b - d) / (a - c) === -1) {
              texteCorr += '$f(x)= -x +b.$<br>'
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
            }
            texteCorr += `On en déduit que :$f(${a})=${texFractionReduite(b - d, a - c)} \\times ${a} +b=${b}$<br>`
            texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b}-${texFractionReduite(e, f)}$<br>`
            texteCorr += `$\\phantom{On en deduit que :}\\iff b=${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$<br> `
            texteCorr += 'On peut conclure que '
            if (b - d === a - c) { // cas où a=1
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) {
                texteCorr += `$f(x)= x +${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              } else {
                if (b * a - b * c === a * b + a * d) { // cas où b=0
                  texteCorr += '$f(x)= x.$<br>'
                }
                texteCorr += `$f(x)= x ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              }
            }
            if (b - d === -a + c) { // cas où a=-1
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) { // b>0
                texteCorr += `$f(x)= -x +${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              } else {
                if (a * d - b * c === 0) { // cas où b=0
                  texteCorr += '$f(x)= -x.$<br>'
                } else texteCorr += `$f(x)= -x ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              }
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) { // cas où b>0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x+  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              } else { // cas où b<0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              }
            }
          }

          break
        case 3:

          xA = randint(0, 3) * choice([-1, 1])// Abscisse de A
          yA = a * xA + b// Ordonnée de A
          xB = randint(0, 3, [xA]) * choice([-1, 1]) // Abscisse de B, différente de celle de A
          if (a * xB + b > 9) { // On évite de trop grandes valeurs pour yA
            xB = quotientier(xB, 2)
          }
          if (a * xB + b < -9) {
            xB = quotientier(xB, 2)
          }
          if (xB === xA) {
            xA = xA + 1
            xB = xB - 1
          }
          yB = a * xB + b// Ordonnée de B
          A = point(xA, yA, 'A', 'left')
          B = point(xB, yB, 'B', 'left')
          if (yA === 0) { A = point(xA, yA, 'A', 'above') }// éviter A sur l'axe des abscisses
          if (xB === 0) { B = point(xB, yB, 'B', 'right') }// éviter A sur l'axe des abscisses
          if (xA === 0) { A = point(xA, yA, 'A', 'right') }// éviter A sur l'axe des abscisses
          if (yB === 0) { B = point(xB, yB, 'B', 'above') }// éviter A sur l'axe des abscisses

          texte = 'Déterminer, en détaillant les calculs, l\'expression algébrique de la fonction affine $f$ dont la représentation<br>'
          texte += `graphique passe par les points $A(${xA};${yA})$ et $B(${xB};${yB})$.<br>`

          texteCorr = `Les points $A(${xA};${yA})$ et $B(${xB};${yB})$ appartiennent à la courbe représentative de $f$<br>`

          texteCorr += `Comme $A(${xA};${yA})\\in \\mathcal{C_f}$, on a  $f(${a})=${b}$  et comme $B(${xB};${yB})\\in \\mathcal{C_f}$, on a $f(${c})=${d}$ <br>`
          texteCorr += 'Comme $f$ est une fonction affine, on sait d\'après le cours qu\'elle va s\'écrire sous la forme $f(x)= a x+ b$ avec $a$ et $b$ des nombres réels.<br>'
          texteCorr += 'L\'objectif est donc de déterminer $a$ et $b$.<br>'
          texteCorr += 'Or, on sait d\'après le cours, que dans ces conditions, avec $u\\neq v$, on a :'
          texteCorr += '$a=\\dfrac{f(u)-f(v)}{u-v}.$<br>'
          texteCorr += `On applique cette relation avec les données de l'énoncé : $u=${a}$ et  $v=${c}$ ,<br>`
          texteCorr += 'ce qui donne :'
          texteCorr += `$a=\\dfrac{f(${a})-f(${c})}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b}-${ecritureParentheseSiNegatif(d)}}{${a}-${ecritureParentheseSiNegatif(c)}}=\\dfrac{${b - d}}{${a - c}}$<br>`
          texteCorr += `d'où : $a=${texFractionReduite(b - d, a - c)}.$<br>`
          if (b === d) {
            texteCorr += '$f$ est une fonction constante, cas particulier des fonctions affines.<br>'
            texteCorr += `On a donc : $f(x)=${b}$`
          } else {
            texteCorr += 'On peut donc déjà déduire que la fonction $f$ s\'écrit sous la forme : '
            if ((b - d) / (a - c) === 1) {
              texteCorr += '$f(x)= x +b.$<br>'
            }
            if ((b - d) / (a - c) === -1) {
              texteCorr += '$f(x)= -x +b.$<br>'
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
            }
            texteCorr += 'On cherche $b$ et pour cela on peut utiliser au choix une des deux données de l\'énoncé :<br>'
            texteCorr += `On prend par exemple : $f(${a})=${b}$  <br>`
            texteCorr += 'Comme'
            if ((b - d) / (a - c) === 1) {
              texteCorr += '$f(x)= x +b.$<br>'
            }
            if ((b - d) / (a - c) === -1) {
              texteCorr += '$f(x)= -x +b.$<br>'
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              texteCorr += `   $f(x)=${texFractionReduite(b - d, a - c)} x +b.$<br>`
            }
            texteCorr += `On en déduit que :$f(${a})=${texFractionReduite(b - d, a - c)} \\times ${a} +b=${b}$<br>`
            texteCorr += `$\\phantom{On en deduit que :}\\iff b=${b}-${texFractionReduite(e, f)}$<br>`
            texteCorr += `$\\phantom{On en deduit que :}\\iff b=${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$<br> `
            texteCorr += 'On peut conclure que '
            if (b - d === a - c) { // cas où a=1
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) {
                texteCorr += `$f(x)= x +${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              } else {
                if (b * a - b * c === a * b + a * d) { // cas où b=0
                  texteCorr += '$f(x)= x.$<br>'
                }
                texteCorr += `$f(x)= x ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              }
            }
            if (b - d === -a + c) { // cas où a=-1
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) { // b>0
                texteCorr += `$f(x)= -x +${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              } else {
                if (a * d - b * c === 0) { // cas où b=0
                  texteCorr += '$f(x)= -x.$<br>'
                } else texteCorr += `$f(x)= -x ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}.$<br>`
              }
            }
            if (b - d !== a - c && b - d !== -a + c) { // cas général
              if ((b * a - b * c - a * b + a * d) * (a - c) > 0) { // cas où b>0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x+  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              } else { // cas où b<0
                texteCorr += `$f(x)=${texFractionReduite(b - d, a - c)}x  ${texFractionReduite(b * a - b * c - a * b + a * d, a - c)}$`
              }
            }
          }

          break
      }
      if (this.questionJamaisPosee(i, k, a, b, c, d, e)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 :Avec deux images\n 2 : Avec deux points et un repère\n 3 : Avec deux points sans repère\n 4 : Mélange des cas précédents']
}
