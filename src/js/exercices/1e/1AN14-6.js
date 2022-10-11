import Exercice from '../Exercice.js'
import { Polynome } from '../../modules/fonctionsMaths.js'
import { simplify, parse, derivative, divide } from 'mathjs'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { rienSi1 } from '../../modules/outils/ecritures.js'
import { lettreMinusculeDepuisChiffre } from '../../modules/outils/lettres.js'
import { prettyTex } from '../../modules/outils/reductions.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Dérivée d\'une composée affine'

/**
 * Calculer la dérivée de x -> f(ax+b)
 * @author Jean-Léon Henry
 * Référence 1AN14-6
 */

export const uuid = '3391d'
export const ref = '1AN14-6'
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
    for (let i = 0, texte, texteCorr, expression, exprF, namef, deriveeF, cpt = 0; i < this.nbQuestions && cpt < 50;) {
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
      expression = typeF === 'monome' ? `${rienSi1(f.monomes[f.deg])}(${polAff})^${f.deg}` : `${f}(${polAff})`

      // Enoncé
      namef = lettreMinusculeDepuisChiffre(i + 6)
      texte = `$${namef}:x\\longmapsto ${prettyTex(math.simplify(expression, reglesDeSimplifications))}$`
      // Correction
      texteCorr = 'On rappelle le cours. Si $x$ est un nombre réel tel que $u$ soit dérivable en $ax+b$, alors $v:x\\mapsto u(ax+b)$ est dérivable en $x$ et on a :'
      texteCorr += '\\[v\'(x)=a\\times u\'(ax+b).\\]'
      // Déterminons la dérivée de u
      switch (typeF) {
        case 'exp':
          deriveeF = 'e^x'
          break
        case 'inv':
          deriveeF = '-1/x^2'
          break
        case 'racine':
          deriveeF = '1/(2*sqrt(x))'
          break
        case 'monome':
          deriveeF = f.derivee().toMathExpr()
          break
      }
      texteCorr += `Ici : \\[\\begin{aligned}u&:x\\mapsto ${prettyTex(math.simplify(exprF, reglesDeSimplifications))}\\\\ u'&:x\\mapsto ${prettyTex(math.simplify(deriveeF, reglesDeSimplifications))}\\\\a&=${a}\\\\b&=${b}.\\end{aligned}\\]`
      texteCorr += `Soit $x$ un réel de l'ensemble de dérivabilité de $${namef}$. On a, en appliquant la formule ci-dessus : `
      switch (typeF) {
        case 'exp':
          texteCorr += `\\[${namef}'(x)=${rienSi1(a)}${prettyTex(math.simplify(expression, reglesDeSimplifications))}.\\]`
          break
        case 'inv':
          texteCorr += `\\[${namef}'(x)=${a}\\times${prettyTex(math.simplify(`-${f}(${polAff})^2`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant : '
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${-a}/(${polAff})^2`, reglesDeSimplifications))}.\\]`
          break
        case 'racine': {
          texteCorr += `\\[${namef}'(x)=${a}\\times${prettyTex(math.simplify(`1/(2*sqrt(${polAff}))`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant :'
          const num = a % 2 === 0 ? divide(a, 2) : a
          const den = `${a % 2 === 0 ? '' : '2*'}sqrt(${polAff})`
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${num}/(${den})`, reglesDeSimplifications))}.\\]`
          break
        }
        case 'monome':
          texteCorr += `\\[${namef}'(x)=${a}\\times ${prettyTex(math.simplify(`${f.deg}(${polAff})${f.deg === 2 ? '' : `^(${f.deg - 1})`}`, reglesDeSimplifications))}.\\]`
          texteCorr += 'D\'où, en simplifiant : '
          texteCorr += `\\[${namef}'(x)=${prettyTex(math.simplify(`${a}*${f.deg}(${polAff})${f.deg === 2 ? '' : `^(${f.deg - 1})`}`, reglesDeSimplifications))}.\\]`
          if (f.deg === 2) {
            texteCorr += 'On développe et on réduit pour obtenir  :'
            texteCorr += `\\[.${namef}'(x)=${polAff.multiply(2 * a)}\\]`
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
