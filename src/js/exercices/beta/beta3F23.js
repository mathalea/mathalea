import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, combinaisonListes, randint, ecritureAlgebrique, texFractionReduite, texFraction, pgcd } from '../../modules/outils.js'

export const titre = 'Déterminer un antécédent'

/**
 * Reconnaître une fonction affine
* @author Erwan Duplessy
* 3F23
* date : 2021/02/21
* référentiel 3F23 - Déterminer de manière algébrique l’antécédent par une fonction, dans des cas se ramenant à la résolution d’une équation du premier degré.
* plusieurs cas :
* f(x) = ax + b avec a et b petits relatifs
* f(x) = ax + b avec a et b grands relatifs
* f(x) = a(x + b) + c avec a, b, c petits relatifs
* f(x) = a(bx + c) + dx + e  avec a, b, c, d petits relatifs
*/

export default function antecedentParCalcul () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = 'Répondre aux questions suivantes avec une valeur exacte simplifiée. '
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.spacingCorr = context.isHtml ? 3 : 1
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.

  //  this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      let a = 0; let b = 0; let c = 0; let d = 0; let e = 0; let m = 0
      let expr = ''

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent
        case 1:
          // f(x) = ax + b avec a et b petits relatifs
          a = randint(-20, 20, [-1, 0, 1])
          b = randint(-20, 20)
          m = randint(-20, 20)
          expr = `$f(x)=${a}x ${ecritureAlgebrique(b)}$`
          texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `
          texteCorr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
          texteCorr += `On résout donc l'équation : $f(x) = ${m}$. <br>`
          texteCorr += '$\\begin{aligned} '
          texteCorr += `${a}x ${ecritureAlgebrique(b)} &= ${m} \\\\ `
          texteCorr += `${a}x &= ${m} ${ecritureAlgebrique(-b)} \\\\ `
          if (pgcd(m - b, a) === 1 && m - b > 0 && a > 0) { // teste si la fraction est simplifiable
            texteCorr += `x &= ${texFraction(m - b, a)} \\\\`
          } else {
            texteCorr += `x &= ${texFraction(m - b, a)} = ${texFractionReduite(m - b, a)}\\\\ `
          }
          texteCorr += '\\end{aligned}$'
          break

        case 2:
          // f(x) = ax + b avec a et b grands relatifs
          a = randint(-999, 999, [-1, 0, 1])
          b = randint(-999, 999, [0])
          m = randint(-999, 999, [0])
          expr = `$f(x)=${a}x ${ecritureAlgebrique(b)}$`
          texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `
          texteCorr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
          texteCorr += `On résout donc l'équation : $f(x) = ${m}$. <br>`
          texteCorr += '$\\begin{aligned} '
          texteCorr += ` ${a}x ${ecritureAlgebrique(b)}&= ${m} \\\\ `
          texteCorr += ` ${a}x &= ${m} ${ecritureAlgebrique(-b)}\\\\ `
          if (pgcd(m - b, a) === 1 && m - b > 0 && a > 0) { // teste si la fraction est simplifiable
            texteCorr += `x &= ${texFraction(m - b, a)}\\\\`
          } else {
            texteCorr += `x &= ${texFraction(m - b, a)} = ${texFractionReduite(m - b, a)}\\\\`
          }
          texteCorr += '\\end{aligned}$'
          break

        case 3:
          // f(x) = a(x + b) + c avec a, b, c petits relatifs
          a = randint(-20, 20, [-1, 0, 1])
          b = randint(-20, 20, [0])
          c = randint(-20, 20, [0])
          m = randint(-20, 20)
          expr = `$f(x)=${a}(x ${ecritureAlgebrique(b)})${ecritureAlgebrique(c)}$`
          texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `
          texteCorr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
          texteCorr += `On résout donc l'équation : $f(x) = ${m}$. <br>`

          texteCorr += '$\\begin{aligned} '
          texteCorr += `${a}(x ${ecritureAlgebrique(b)})${ecritureAlgebrique(c)} &= ${m}\\\\`
          texteCorr += `${a}x ${ecritureAlgebrique(a * b)}${ecritureAlgebrique(c)} &= ${m}\\\\`
          texteCorr += `${a}x ${ecritureAlgebrique(a * b + c)} &= ${m}\\\\`
          texteCorr += `${a}x &= ${m} ${ecritureAlgebrique(-a * b - c)}\\\\`
          if (pgcd(m - a * b - c, a) === 1 && m - a * b - c > 0 && a > 0) { // teste si la fraction est simplifiable
            texteCorr += `x &= ${texFraction(m - a * b - c, a)}\\\\`
          } else {
            texteCorr += `x &= ${texFraction(m - a * b - c, a)} = ${texFractionReduite(m - a * b - c, a)}\\\\`
          }
          texteCorr += '\\end{aligned}$'
          break

        case 4:
          // f(x) = a(bx + c) + dx + e  avec a, b, c, d petits relatifs
          a = randint(-20, 20, [-1, 0, 1])
          b = randint(-20, 20, [-1, 0, 1])
          c = randint(-20, 20, [0])
          d = randint(-20, 20, [-1, 0, 1, -a * b]) // d différent de -ab pour assurer une solution
          e = randint(-20, 20, [0])
          m = randint(-20, 20)
          expr = `$f(x)=${a}(${b}x ${ecritureAlgebrique(c)})${ecritureAlgebrique(d)}x${ecritureAlgebrique(e)}$`
          texte += `Déterminer l'antécédent de $${m}$ par la fonction $f$ définie par ${expr}. `
          texteCorr += `On cherche un nombre $x$ tel que $f(x) = ${m}$. `
          texteCorr += `On résout donc l'équation : $f(x) = ${m}$. <br>`

          texteCorr += '$\\begin{aligned} '
          texteCorr += `${a}(${b}x ${ecritureAlgebrique(c)})${ecritureAlgebrique(d)}x${ecritureAlgebrique(e)} &= ${m}\\\\`
          texteCorr += `${a * b}x ${ecritureAlgebrique(a * c)}${ecritureAlgebrique(d)}x${ecritureAlgebrique(e)} &= ${m}\\\\`
          texteCorr += `${a * b + d}x ${ecritureAlgebrique(a * c + e)} &= ${m}\\\\`
          texteCorr += `${a * b + d}x  &= ${m}${ecritureAlgebrique(-a * c - e)}\\\\`
          texteCorr += `${a * b + d}x &= ${m - a * c - e}\\\\`
          if (pgcd(m - a * c - e, a * b + d) === 1 && m - a * c - e > 0 && a * b + d > 0) { // teste si la fraction est simplifiable
            texteCorr += `x &= ${texFraction(m - a * c - e, a * b + d)}\\\\`
          } else {
            texteCorr += `x &= ${texFraction(m - a * c - e, a * b + d)} = ${texFractionReduite(m - a * c - e, a * b + d)}\\\\`
          }
          texteCorr += '\\end{aligned}$'

          break
      }
      if (this.questionJamaisPosee(i, a, b, c, d, m, e)) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
