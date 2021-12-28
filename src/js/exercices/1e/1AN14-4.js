import Exercice from '../Exercice.js'
import { signe, listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureAlgebriqueSauf1, lettreMinusculeDepuisChiffre, rienSi1, reduireAxPlusB, texNombrec2 } from '../../modules/outils.js'
import { max, simplify, parse, derivative, chain, abs, number } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative, chain: chain }
export const titre = 'Dérivée d\'un produit'

/**
 * Calculer la dérivée d'un produit
 * @author Jean-Léon Henry
 * Référence 1AN14-4
 * @todo Corrections niveau 2
 */

/**
 * Retourne une constante formattée, rien si 0
 * @param {number} a Nombre à formatter
 * @returns Rien si a=0, a formatté sinon
 */
function constRienSi0 (a) {
  return a === 0 ? '' : ecritureAlgebrique(a)
}

/**
* Ecriture propre d'un monome ax
* @returns Rien si a=0, ax sinon
*/
function monome (a) {
  return a === 0 ? '' : `${ecritureAlgebriqueSauf1(a)}x`
}

/**
 * @param {string} expression expression parsée
 * @returns expression en LaTeX avec multication implicite
 */
function prettyTex (expression) {
  return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
}

/**
 * Crée un objet Polynome de degré donné.
 * @param {number} deg degré
 * @param {boolean} mon monôme
 * @param {boolean} centre pour obtenir ax^2+b quand deg=2
 * @param {boolean|Array} rand true pour obtenir un polynome aléatoire, Array pour fournir les coeffs
 */
class Polynome {
  constructor (deg, mon = false, centre = false, rand = true) {
    this.mon = mon
    if ((rand && typeof rand === 'boolean') || !Array.isArray(rand)) {
      this.deg = deg
      this.monomes = []
      for (let i = 0; i < deg; i++) {
        if (deg === 2 && i === 1 && centre) {
          this.monomes.push(0)
          continue
        }
        if (!mon) this.monomes.push(randint(-10, 10))
        else this.monomes.push(0)
      }
      this.monomes.push(randint(-10, 10, 0))
    } else {
      this.monomes = rand
      this.deg = this.monomes.length - 1
    }
  }

  get coeffs () { return this.monomes }

  toMathExpr (alg = false) {
    let res = ''
    let maj = ''
    for (const [i, c] of this.monomes.entries()) {
      switch (i) {
        case this.deg: {
          const coeffD = alg ? ecritureAlgebriqueSauf1(c) : rienSi1(c)
          maj = this.deg === 1 ? `${coeffD}x` : `${coeffD}x^${i}`
          break
        }
        case 0:
          maj = constRienSi0(c)
          break
        case 1:
          maj = monome(c)
          break
        default:
          maj = `${ecritureAlgebriqueSauf1(c)}x^${i}`
          break
      }
      res = maj + res
    }
    return res
  }

  static add (p1, p2) {
    const degSomme = max(p1.deg, p2.deg)
    const pInf = p1.deg === degSomme ? p2 : p1
    const pSup = p1.deg === degSomme ? p1 : p2
    const coeffSomme = pSup.monomes.map(function (el, index) { return index <= pInf.deg ? el + pInf.monomes[index] : el })
    return new Polynome(degSomme, false, false, coeffSomme)
  }

  static print (coeffs, alg = false) {
    const p = new Polynome(coeffs.length - 1, false, false, coeffs)
    return p.toMathExpr(alg)
  }
}
// Tests
const p = new Polynome(2, false, false, [-11, 2, 1])
const p2 = new Polynome(1, false, false, [2, 1])
console.log('p : ', p.toMathExpr(), p.deg)
console.log('p2 : ', p2.toMathExpr(), p2.deg)
console.log('p+p2 : ', Polynome.add(p, p2).coeffs)
console.log('print : ', Polynome.print([0, -1, 1]))
console.log('print alg : ', Polynome.print([0, -1, 1], true))

export default function DeriveeProduit () {
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
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
    const listeTypeDeQuestionsDisponibles = ['monome2/poly1', 'inv/poly1']// ,
    if (this.sup === 2) {
      listeTypeDeQuestionsDisponibles.push('racine/poly', 'racine/poly2centre', 'monome2/racine')
      if (this.sup2) {
        listeTypeDeQuestionsDisponibles.push('exp/poly', 'exp/poly2centre')
      }
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, terme1, terme2, expression, askFacto, askFormule, askQuotient, ensembleDerivation, namef, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On commence par générer des fonctions qui pourrait servir
      const dictFonctions = {
        exp: 'e^x',
        racine: 'sqrt(x)',
        inv: '1/x',
        poly1: new Polynome(1),
        poly2centre: new Polynome(2, false, true),
        monome2: new Polynome(2, true),
        poly: new Polynome(randint(1, 2))
      }
      const listeTypeFonctions = listeTypeDeQuestions[i].split('/')
      // On précise les énoncés
      askFacto = listeTypeFonctions.includes('exp')
      askFormule = listeTypeFonctions.includes('poly1')
      askQuotient = listeTypeFonctions.includes('inv')
      // On randomise l'ordre des termes, sauf pour l'inverse et un monome devant une racine/une affine
      let f1 = 0
      let f2 = 1
      if (!(['monome2/racine', 'monome2/poly1', 'inv/poly1'].includes(listeTypeDeQuestions[i]))) {
        f1 = randint(0, 1)
        f2 = 1 - f1
      }
      const typef1 = listeTypeFonctions[f1]
      const typef2 = listeTypeFonctions[f2]
      // On gère les parenthèses autour des fonctions spéciales
      const noPar = type => ['racine', 'exp', 'monome2', 'inv'].includes(type)
      const parenth = (expr, type) => (noPar(type) ? expr : `(${expr})`)
      // On crée les expressions des fonctions : les polynômes dans dictFonctions ne sont pas des chaînes
      const exprf1 = ['poly', 'mono'].includes(typef1.substring(0, 4)) ? dictFonctions[typef1].toMathExpr() : dictFonctions[typef1]
      const exprf2 = ['poly', 'mono'].includes(typef2.substring(0, 4)) ? dictFonctions[typef2].toMathExpr() : dictFonctions[typef2]
      terme1 = parenth(exprf1, typef1)
      terme2 = parenth(exprf2, typef2)
      // Ensemble de dérivation
      ensembleDerivation = listeTypeFonctions.includes('racine') ? '\\mathbb{R}_+^*' : '\\mathbb{R}'
      ensembleDerivation = listeTypeFonctions.includes('inv') ? '\\mathbb{R}^*' : ensembleDerivation

      // 1ère étape de la dérivation
      expression = terme1 + '*' + terme2

      // Correction
      namef = lettreMinusculeDepuisChiffre(i + 6)
      texte = askFacto ? 'Dans cette question, on demande la réponse sous forme factorisée.<br>' : ''
      texte = askFormule ? `Dans cette question, on demande d'utiliser la formule de dérivation d'un produit. ${askQuotient ? 'Mettre le résultat sous forme d\'un quotient.' : ''}<br>` : texte
      texte += `$${namef}:x\\longmapsto ${prettyTex(math.parse(expression))}$`
      texteCorr = `$${namef}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr += 'On rappelle le cours : si $u,v$ sont  deux fonctions dérivables sur un même intervalle $I$ alors leur produit est dérivable sur $I$ et on a la formule'
      texteCorr += '\\[(u\\times v)\'=u\'\\times v+u\\times v\'\\]'
      texteCorr += `Ici $${namef}=u\\times v$ avec`
      texteCorr += `\\[\\begin{aligned}u&=x\\mapsto ${prettyTex(math.parse(exprf1))}\\\\ v&=x\\mapsto${prettyTex(math.parse(exprf2))}\\end{aligned}\\]`
      switch (listeTypeDeQuestions[i]) {
        case 'inv/poly1': {
          const b = dictFonctions[typef2].monomes[0] // coeffs du poly1
          const a = dictFonctions[typef2].monomes[1] // coeffs du poly1
          // Début correction
          texteCorr += 'On utilise la formule rappelée plus haut et on a'
          texteCorr += `\\[${namef}'(x)=\\underbrace{-\\frac{1}{x^2}}_{u'(x)}${prettyTex(math.parse(terme2))}+\\frac{1}{x}\\underbrace{${a > 0 ? a : `(${a})`}}_{v'(x)}.\\]`
          texteCorr += `Ce qui donne, en simplifiant : \\[${namef}'(x)=\\frac{${reduireAxPlusB(-a, -b)}}{x^2}+\\frac{${a}}{x}.\\]`
          texteCorr += 'On additionne les deux fractions pour obtenir : '
          texteCorr += `\\[${namef}'(x)=\\frac{${reduireAxPlusB(-a, -b)}}{x^2}+\\frac{${a}x}{x^2}=\\frac{${reduireAxPlusB(-a, -b)}${ecritureAlgebrique(a)}x}{x^2}.\\]`
          texteCorr += 'Des termes se simplifient au numérateur et on a : '
          texteCorr += `\\[${namef}'(x)=\\frac{${reduireAxPlusB(0, -b)}}{x^2}.\\]`
          // Remarque sur la méthode alternative
          const fExpand = math.simplify(`${a}${ecritureAlgebrique(b)}/x`)
          texteCorr += `<b>Remarque</b> : on pourrait bien entendu développer avant de dériver.<br>Dans ce cas, $${namef}(x)=${prettyTex(fExpand)}$.<br>`
          texteCorr += `Et donc $${namef}'(x)=${math.simplify(math.derivative(fExpand, 'x'))}$. Ce qui est bien cohérent avec le résultat trouvé plus haut.`
          break
        }
        case 'monome2/poly1': {
          const b = dictFonctions[typef2].monomes[0] // coeffs du poly1
          const a = dictFonctions[typef2].monomes[1] // coeffs du poly1
          const m = dictFonctions[typef1].monomes[2] // coeff du monome2
          // Début correction
          texteCorr += `On utilise la formule rappelée plus haut et on a  \\[${namef}'(x)=\\underbrace{${reduireAxPlusB(2 * m, 0)}}_{u'(x)}(${exprf2})${ecritureAlgebrique(m)}x^2\\underbrace{${a > 0 ? a : `(${a})`}}_{v'(x)}.\\]`
          texteCorr += `On développe pour obtenir : \\[${namef}'(x)=${2 * m * a}x^2${ecritureAlgebrique(2 * m * b)}x${ecritureAlgebrique(m * a)}x^2.\\]`
          texteCorr += `Puis, en regroupant les termes de même degré : \\[${namef}'(x)=${2 * m * a + m * a}x^2${ecritureAlgebrique(2 * m * b)}x.\\]`
          // Remarque sur la méthode alternative
          const fExpand = math.parse(`${rienSi1(m * a)}x^3${ecritureAlgebrique(m * b)}x^2`)
          texteCorr += `<b>Remarque</b> : on pourrait bien entendu développer avant de dériver.<br>Dans ce cas, $${namef}(x)=${prettyTex(fExpand)}$.<br>`
          texteCorr += `Et donc $${namef}'(x)=${prettyTex(math.simplify(math.derivative(fExpand, 'x')))}$. Ce qui est bien cohérent avec le résultat trouvé plus haut.`
          break
        }
        case 'monome2/racine': {
          const m = dictFonctions[typef1].monomes[2] // coeff du monome2
          // texteCorr += `Ici on dérive $${namef}$ comme $${texNombrec2(m)}$ fois $x\\mapsto x^2\\sqrt{x}$.`
          texteCorr += 'On applique la  formule rappellée plus haut : '
          texteCorr += `\\[${namef}'(x)=\\underbrace{${rienSi1(2 * m)}x}_{u'(x)}\\sqrt{x}${ecritureAlgebrique(m)}x^2\\underbrace{\\frac{1}{2\\sqrt{x}}}_{v'(x)}.\\]`
          texteCorr += 'On peut réduire un peu l\'expression : '
          texteCorr += `\\[${namef}'(x)=${rienSi1(2 * m)}x\\sqrt{x}${signe(m)}` // attention l'équation finit ligne suivante
          if (m % 2 !== 0) texteCorr += `\\frac{${abs(m)}x^2}{2\\sqrt{x}}.\\]`
          else texteCorr += `\\frac{${texNombrec2(abs(m / 2))}x^2}{\\sqrt{x}}.\\]`
          break
        }
        case 'racine/poly2centre': {
          const racineGauche = typef1 === 'racine'
          const poly = dictFonctions.poly2centre
          const a = poly.monomes[2] // coefficient de degré 2
          // 1ère étape : application de la formule
          let intermediaire
          if (racineGauche) intermediaire = `\\underbrace{\\frac{1}{2\\sqrt{x}}}_{u'(x)}(${poly.toMathExpr()})+\\sqrt{x}\\underbrace{(${rienSi1(2 * a)}x)}_{v'(x)}`
          else intermediaire = `\\underbrace{(${rienSi1(2 * a)}x)}_{u'(x)}\\sqrt{x}+(${poly.toMathExpr()})\\underbrace{\\frac{1}{2\\sqrt{x}}}_{v'(x)}`
          texteCorr += `On utilise la formule rappelée plus haut et on a \\[${namef}'(x)=${intermediaire}.\\]`
          // 2ème étape : simplification
          let interm2
          if (racineGauche) interm2 = `\\frac{${poly.toMathExpr()}}{2\\sqrt{x}}${ecritureAlgebriqueSauf1(2 * a)}x\\sqrt{x}`
          else interm2 = `${rienSi1(2 * a)}x\\sqrt{x}+\\frac{${poly.toMathExpr()}}{2\\sqrt{x}}`
          texteCorr += 'L\'énoncé ne demandant rien de plus, on se contente de simplifier l\'expression :'
          texteCorr += `\\[${namef}'(x)=${interm2}\\]`
        }
          break
        case 'racine/poly': {
          const racineGauche = typef1 === 'racine'
          const poly = dictFonctions.poly
          const a = poly.coeffs[poly.deg]
          const b = poly.coeffs[poly.deg - 1]
          const derivee = poly.deg === 2 ? `${reduireAxPlusB(2 * a, b)}` : `${a}`
          // 1ère étape : application de la formule
          let intermediaire
          if (racineGauche) intermediaire = `\\underbrace{\\frac{1}{2\\sqrt{x}}}_{u'(x)}(${poly.toMathExpr()})+\\sqrt{x}\\underbrace{(${derivee})}_{v'(x)}`
          else intermediaire = `\\underbrace{(${derivee})}_{u'(x)}\\sqrt{x}+(${poly.toMathExpr()})\\underbrace{\\frac{1}{2\\sqrt{x}}}_{v'(x)}`
          texteCorr += `On utilise la formule rappelée plus haut et on a \\[${namef}'(x)=${intermediaire}.\\]`
          // 2ème étape : simplification
          let interm2
          if (racineGauche) interm2 = `\\frac{${poly.toMathExpr()}}{2\\sqrt{x}}${poly.deg === 2 ? `+(${derivee})` : ecritureAlgebriqueSauf1(number(derivee))}\\sqrt{x}`
          else interm2 = `${poly.deg === 2 ? `(${derivee})` : derivee}\\sqrt{x}+\\frac{${poly.toMathExpr()}}{2\\sqrt{x}}`
          texteCorr += 'L\'énoncé ne demandant rien de plus, on se contente de simplifier l\'expression :'
          texteCorr += `\\[${namef}'(x)=${interm2}\\]`
          break
        }
        case 'exp/poly':
        case 'exp/poly2centre': {
          const expGauche = typef1 === 'exp'
          const poly = listeTypeDeQuestions[i].substring(4) === 'poly' ? dictFonctions.poly : dictFonctions.poly2centre
          const a = poly.coeffs[poly.deg]
          const b = poly.coeffs[poly.deg - 1]
          const isQuadra = poly.deg === 2
          const derivee = isQuadra ? `${(2 * a, b)}` : `${a}`
          const deriveeAlg = poly.deg === 2 ? `${reduireAxPlusB(2 * a, b)}` : `${ecritureAlgebrique(a)}`
          // console.log(derivee)
          // 1ère étape : application de la formule
          let intermediaire
          if (expGauche) intermediaire = `\\underbrace{e^x}_{u'(x)}(${poly.toMathExpr()})+e^x\\underbrace{(${derivee})}_{v'(x)}`
          else intermediaire = `\\underbrace{(${derivee})}_{u'(x)}e^x+(${poly.toMathExpr()})\\underbrace{e^x}_{v'(x)}`
          texteCorr += `On utilise la formule rappelée plus haut et on a \\[${namef}'(x)=${intermediaire}.\\]`
          // 2ème étape : simplification
          const interm2 = isQuadra ? `${rienSi1(a)}x^2` : ''
          texteCorr += 'Factorisons l\'expression par $e^x$ :'
          texteCorr += `\\[${namef}'(x)=e^x(${poly.toMathExpr()}${deriveeAlg}).\\]`
          if (isQuadra) {
            texteCorr += '<br>C\'est-à-dire, en simplifiant : '
            texteCorr += `\\[${namef}'(x)=e^x(${prettyTex(math.parse(interm2))})\\]`
          }
          break
        }
        default:
          texteCorr += 'Correction non encore implémentée.'
          break
      }
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Affine*inverse, affine*ax^2\n2 : Niveau 1 et polynômes, racine']
  this.besoinFormulaire2CaseACocher = ['Inclure l\'exponentielle dans le niveau 2']
}
