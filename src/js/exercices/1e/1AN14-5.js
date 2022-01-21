import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, lettreMinusculeDepuisChiffre, ecritureAlgebrique } from '../../modules/outils.js'
import { Polynome } from '../../modules/fonctionsMaths.js'
import { simplify, parse, derivative, fraction } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative, fraction: fraction }
export const titre = 'Dérivée d\'un quotient'

/**
 * Calculer la dérivée d'un quotient
 * @author Jean-Léon Henry
 * Référence 1AN14-5
 */

/**
 * @param {string} expression expression parsée
 * @returns expression en LaTeX avec multication implicite
 */
function prettyTex (expression) {
  return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
}

export default function DeriveeQuotient () {
  Exercice.call(this)
  this.titre = titre
  // this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
  this.consigne = "Pour chacune des fonctions suivantes, déterminer l'expression de sa fonction dérivée."
  this.nbQuestions = 10
  // Sortie LaTeX
  this.nbCols = 2 // Nombre de colonnes
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction
  this.sup = 1
  this.sup2 = false
  // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
  const reglesDeSimplifications = math.simplify.rules.slice()
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n2 + n2'), 1)
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n3 + n2*n3'), 1)
  reglesDeSimplifications.push({ l: '-(n1*v)', r: '-n1*v' })
  reglesDeSimplifications.push('-(n1/n2) -> -n1/n2')

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.sup2 = Boolean(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    // Types d'énoncés
    const listeTypeDeQuestionsDisponibles = ['poly/poly1', 'mon/poly1']//, 'racine/poly1']
    if (this.sup2) {
      listeTypeDeQuestionsDisponibles.push('exp/poly1')
    }
    if (this.sup === 2) {
      // listeTypeDeQuestionsDisponibles.push('racine/poly', 'racine/poly2centre', 'monome2/racine')
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, expression, nameF, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On génère des fonctions qui pourrait servir
      const coeffs = new Array(randint(2, 9)) // Au moins 2 coeffs, i.e. deg >= 1
      coeffs.fill(0)
      // on ajoute un coeff donc deg >= 2
      coeffs.push(1)
      // coeffs.push(randint(-10, 10, 0))
      const dictFonctions = {
        exp: 'e^x',
        racine: 'sqrt(x)',
        // inv: '1/x',
        mon: new Polynome({ coeffs }),
        poly1: new Polynome({ rand: true, deg: 1 }),
        poly2centre: new Polynome({ rand: true, coeffs: [[10, true], [0], [10, true]] }),
        poly: new Polynome({ rand: true, deg: randint(1, 2) })
      }
      const listeTypeFonctions = listeTypeDeQuestions[i].split('/')
      const typeNum = listeTypeFonctions[0]
      const typeDen = listeTypeFonctions[1]
      // On précise les énoncés
      // askFacto = listeTypeFonctions.includes('exp')
      // askFormule = listeTypeFonctions.includes('poly1')
      // askQuotient = listeTypeFonctions.includes('inv')
      // Expression finale de la fonction
      const fNum = dictFonctions[typeNum]
      const fDen = dictFonctions[typeDen]
      const termeNum = ['pol', 'mon'].includes(typeNum.substr(0, 3)) ? fNum.toMathExpr() : fNum
      const termeDen = ['pol', 'mon'].includes(typeDen.substr(0, 3)) ? fDen.toMathExpr() : fDen
      expression = `(${termeNum})/(${termeDen})`
      // Ensemble de dérivation
      // ensembleDerivation = listeTypeFonctions.includes('racine') ? '\\mathbb{R}_+^*' : '\\mathbb{R}'
      // ensembleDerivation = listeTypeFonctions.includes('inv') ? '\\mathbb{R}^*' : ensembleDerivation

      // Enoncé
      nameF = lettreMinusculeDepuisChiffre(i + 6)
      // texte = askFacto ? 'Dans cette question, on demande la réponse sous forme factorisée.<br>' : ''
      // texte = askFormule ? `Dans cette question, on demande d'utiliser la formule de dérivation d'un produit. ${askQuotient ? 'Mettre le résultat sous forme d\'un quotient.' : ''}<br>` : texte
      texte = ''
      texte += `$${nameF}:x\\longmapsto ${prettyTex(math.simplify(expression, ['(n1)/(n2)->n1/n2']))}$`
      // Correction
      const derNum = math.simplify(math.derivative(termeNum, 'x'), reglesDeSimplifications)
      const derDen = math.simplify(math.derivative(termeDen, 'x'), reglesDeSimplifications)
      texteCorr = ''
      // texteCorr = `$${nameF}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr += 'On rappelle le cours : si $u,v$ sont  deux fonctions dérivables sur un même intervalle $I$, et que $v$ ne s\'annule pas sur $I$ alors leur quotient est dérivable sur $I$ et on a la formule : '
      texteCorr += '\\[\\left(\\frac{u}{v}\\right)\'=\\frac{u\'\\times v-u\\times v\'}{v^2}.\\]'
      texteCorr += `Ici $${nameF}=\\frac{u}{v}$ avec : `
      texteCorr += `\\[\\begin{aligned}u&:x\\mapsto ${prettyTex(math.parse(termeNum))},\\ u':x\\mapsto ${prettyTex(derNum)}\\\\ v&:x\\mapsto${prettyTex(math.parse(termeDen))},\\ v':x\\mapsto${prettyTex(derDen)}.\\end{aligned}\\]`
      switch (listeTypeDeQuestions[i]) {
        case 'poly/poly1': {
          // fDen = cx+d
          const c = fDen.monomes[1]
          const d = fDen.monomes[0]
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen}\\neq 0$. C'est-à-dire $x\\neq${math.fraction(-d / c).toLatex()}$. `
          texteCorr += 'On obtient alors : '
          if (fNum.deg === 1) {
            // fNum = ax+b
            const a = fNum.monomes[1]
            const b = fNum.monomes[0]
            texteCorr += `\\[${nameF}'(x)=\\frac{${a}(${termeDen})-(${termeNum})(${c})}{(${termeDen})^2}.\\]`
            texteCorr += 'D\'où, en développant le numérateur : '
            texteCorr += `\\[${nameF}'(x)=\\frac{${Polynome.print([a * d, a * c])}-(${Polynome.print([c * b, c * a])})}{(${termeDen})^2}.\\]`
            texteCorr += 'Les termes en $x$ se compensent et on obtient : '
            texteCorr += `\\[${nameF}'(x)=\\frac{${a * d}${ecritureAlgebrique(-c * b)}}{(${termeDen})^2}.\\]`
            texteCorr += 'C\'est-à-dire : '
            texteCorr += `\\[\\boxed{${nameF}'(x)=\\frac{${(a * d) - (c * b)}}{(${termeDen})^2}.}\\]`
          } else if (fNum.deg === 2) {
            // fNum = ax²+bx+whatever
            const a = fNum.monomes[2]
            const b = fNum.monomes[1]
            texteCorr += `\\[${nameF}'(x)=\\frac{(${prettyTex(derNum)})(${termeDen})-(${termeNum})(${prettyTex(derDen)})}{(${termeDen})^2}.\\]`
            texteCorr += 'D\'où, en développant le numérateur : '
            const polyInterm = new Polynome({ coeffs: [d * b, b * c + 2 * a * d, 2 * a * c] })
            texteCorr += `\\[${nameF}'(x)=\\frac{${polyInterm}-(${fNum.multiply(c)})}{(${termeDen})^2}.\\]`
            texteCorr += 'On réduit le numérateur pour obtenir : '
            texteCorr += `\\[\\boxed{${nameF}'(x)=\\frac{${polyInterm.add(fNum.multiply(-c))}}{(${termeDen})^2}.}\\]`
            texteCorr += '<b>Remarque : </b>la plupart du temps, on veut le signe de la dérivée. Il serait donc plus logique de factoriser le numérateur si possible, mais cela sort du cadre de cet exercice.'
          }
          break
        }
        case 'mon/poly1': {
          // fDen = cx+d
          const c = fDen.monomes[1]
          const d = fDen.monomes[0]
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen}\\neq 0$. C'est-à-dire $x\\neq${math.fraction(-d / c).toLatex()}$. `
          texteCorr += 'On obtient alors : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum.derivee()}(${fDen})-${fNum}(${c})}{(${termeDen})^2}.\\]`
          texteCorr += 'D\'où, en développant le numérateur : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum.multiply(c * fNum.deg).add(fNum.derivee().multiply(d))}${fNum.multiply(-c).toMathExpr(true)}}{(${termeDen})^2}.\\]`
          texteCorr += 'On simplifie pour obtenir :'
          texteCorr += `\\[\\boxed{${nameF}'(x)=\\frac{${fNum.multiply(c * fNum.deg).add(fNum.derivee().multiply(d)).add(fNum.multiply(-c))}}{(${termeDen})^2}.}\\]`
          texteCorr += '<b>Remarque : </b>la plupart du temps, on veut le signe de la dérivée. Il serait donc plus logique de factoriser le numérateur, mais cela sort du cadre de cet exercice.'
          break
        }
        case 'exp/poly1' : {
          // fDen = cx+d
          const c = fDen.monomes[1]
          const d = fDen.monomes[0]
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen}\\neq 0$. C'est-à-dire $x\\neq${math.fraction(-d / c).toLatex()}$. `
          texteCorr += 'On obtient alors : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum}(${fDen})-${fNum}(${c})}{(${termeDen})^2}.\\]`
          texteCorr += 'On factorise par $e^x$, et on obtient : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum}(${fDen}${ecritureAlgebrique(-c)})}{(${termeDen})^2},\\]`
          texteCorr += 'ce qui donne, après réduction : '
          texteCorr += `\\[\\boxed{${nameF}'(x)=\\frac{${fNum}(${Polynome.print([d - c, c])})}{(${termeDen})^2}.}\\]`
          break
        }
        default:
          texteCorr += 'TODO'
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : quotient d\'une fonction classique par une fonction affine\n2 : TODO']
  this.besoinFormulaire2CaseACocher = ['Inclure l\'exponentielle dans le niveau 2']
}
