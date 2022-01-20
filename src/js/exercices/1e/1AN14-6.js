import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, lettreMinusculeDepuisChiffre, rienSi1 } from '../../modules/outils.js'
import { Polynome } from '../../modules/fonctionsMaths.js'
import { simplify, parse, derivative, multiply, divide } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Dérivée d\'un produit'

/**
 * Calculer la dérivée de x -> f(ax+b)
 * @author Jean-Léon Henry
 * Référence 1AN14-6
 */

/**
 * @param {string} expression expression parsée
 * @returns expression en LaTeX avec multication implicite
 */
function prettyTex (expression) {
  return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
}

export default function DeriveeComposee () {
  Exercice.call(this)
  this.titre = titre
  // this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
  this.consigne = "Pour chacune des fonctions suivantes, déterminer l'expression de sa fonction dérivée."
  this.nbQuestions = 5
  // Sortie LaTeX
  this.nbCols = 2 // Nombre de colonnes
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction
  this.sup = false
  // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
  const reglesDeSimplifications = math.simplify.rules.slice()
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n2 + n2'), 1)
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n3 + n2*n3'), 1)
  reglesDeSimplifications.push({ l: '-(n1*v)', r: '-n1*v' })
  reglesDeSimplifications.push('-(n1/n2) -> -n1/n2')

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    // Types d'énoncés
    const listeTypeDeQuestionsDisponibles = ['monome', 'racine', 'inv']
    if (this.sup) {
      listeTypeDeQuestionsDisponibles.push('exp')
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, expression, exprF, namef, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On génère des fonctions qui pourrait servir
      const coeffs = new Array(randint(2, 9))
      coeffs.fill(0)
      coeffs.push(1)
      const dictFonctions = {
        exp: 'e^',
        racine: 'sqrt',
        inv: '1/',
        monome: new Polynome({ coeffs })
      }
      const polAff = new Polynome({ rand: true, deg: 1 })
      const a = polAff.monomes[1]
      const b = polAff.monomes[0]
      const typeF = listeTypeDeQuestions[i]
      const f = dictFonctions[typeF]
      // Expression finale de la fonction
      exprF = typeF === 'monome' ? f.toMathExpr() : f + '(x)'
      expression = typeF === 'monome' ? `${rienSi1(f.monomes[f.deg])}(${polAff.toMathExpr()})^${f.deg}` : `${f}(${polAff.toMathExpr()})`
      // Ensemble de dérivation
      // ensembleDerivation = typeF === 'racine' ? '\\mathbb{R}_+^*' : '\\mathbb{R}'
      // ensembleDerivation = typeF === 'inv' ? '\\mathbb{R}^*' : ensembleDerivation

      // Enoncé
      namef = lettreMinusculeDepuisChiffre(i + 6)
      texte = `$${namef}:x\\longmapsto ${prettyTex(math.simplify(expression, reglesDeSimplifications))}$`
      // Correction
      // texteCorr = `$${namef}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr = 'On rappelle le cours. Si $u$ est dérivable là où la fonction affine $x\\mapsto ax+b$ est $\\neq 0$ alors $v:x\\mapsto u(ax+b)$ est dérivable et on a :'
      texteCorr += '\\[v\'(x)=a\\times u\'(ax+b).\\]'
      texteCorr += `Ici : \\[\\begin{aligned}u&:x\\mapsto ${prettyTex(math.simplify(exprF, reglesDeSimplifications))}\\\\ a&=${a}\\\\b&=${b}.\\end{aligned}\\]`
      texteCorr += `Soit $x$ un réel de l'ensemble de dérivabilité de $${namef}$. On a, en appliquant la formule ci-dessus : `
      switch (typeF) {
        case 'exp':
          texteCorr += `\\[${namef}'(x)=${rienSi1(a)}${prettyTex(math.simplify(expression, reglesDeSimplifications))}.\\]`
          break
        case 'inv':
          texteCorr += `\\[${namef}'(x)=${a}\\times${prettyTex(math.simplify(`-${f}(${polAff.toMathExpr()})^2`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant : '
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${-a}/(${polAff.toMathExpr()})^2`, reglesDeSimplifications))}.\\]`
          break
        case 'racine': {
          texteCorr += `\\[${namef}'(x)=${a}\\times${prettyTex(math.simplify(`1/(2*sqrt(${polAff.toMathExpr()}))`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant :'
          const num = a % 2 === 0 ? divide(a, 2) : a
          const den = `${a % 2 === 0 ? '' : '2*'}sqrt(${polAff.toMathExpr()})`
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${num}/(${den})`, reglesDeSimplifications))}.\\]`
          break
        }
        case 'monome':
          texteCorr += `\\[${namef}'(x)=${a}\\times ${prettyTex(math.simplify(`${f.deg}(${polAff.toMathExpr()})${f.deg === 2 ? '' : `^(${f.deg - 1})`}`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant : '
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${a}*${f.deg}(${polAff.toMathExpr()})${f.deg === 2 ? '' : `^(${f.deg - 1})`}`, reglesDeSimplifications))}.\\]`
          if (f.deg === 2) {
            texteCorr += 'On développe et on réduit pour obtenir  :'
            texteCorr += `\\[.${namef}'(x)=${Polynome.print([multiply(2, multiply(a, b)), multiply(2, multiply(a, a))])}\\]`
          }
          break
        default:
          texteCorr += 'Correction non encore implémentée.'
          break
      }
      texte = texte.replaceAll('\\frac', '\\dfrac')
      texteCorr = texteCorr.replaceAll('\\frac', '\\dfrac')

      if (this.liste_valeurs.indexOf(expression) === -1) {
        this.liste_valeurs.push(expression)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Inclure l\'exponentielle']
}
