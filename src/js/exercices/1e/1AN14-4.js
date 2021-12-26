import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureAlgebriqueSauf1, lettreMinusculeDepuisChiffre, rienSi1, reduireAxPlusB } from '../../modules/outils.js'
import { simplify, parse, derivative, chain } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative, chain: chain }
export const titre = 'Dérivée d\'un produit'

/**
 * Calculer la dérivée d'un produit
 * @author Jean-Léon Henry
 * Référence 1AN14-4
 * @todo Corrections
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

function prettyTex (expression) {
  return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
}

/**
 * Crée un objet Polynome de degré donné.
 * @param {number} deg degré
 * @param {boolean} mon monôme
 * @param {boolean} centre pour obtenir ax^2+b quand deg=2
 */
class Polynome {
  constructor (deg, mon = false, centre = false) {
    this.deg = deg
    this.mon = mon
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
  }

  get coeffs () { return this.monomes }

  toMathExpr () {
    let res = ''
    let maj = ''
    for (const [i, c] of this.monomes.entries()) {
      switch (i) {
        case this.deg:
          maj = this.deg === 1 ? `${rienSi1(c)}x` : `${rienSi1(c)}x^${i}`
          break
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

  // toMathExpr2 () {
  //   // if (this.mon) console.log(this.monomes)
  //   const affRed = reduireAxPlusB(this.monomes[1], this.monomes[0])
  //   let res = affRed === '0' ? '' : affRed
  //   const iMin = this.monomes.findIndex(el => el !== 0)
  //   // eslint-disable-next-line no-return-assign
  //   this.monomes.slice(iMin).forEach((el, i) => res = (el !== 0 ? `${i === this.monomes.slice(iMin).length ? el : ecritureAlgebriqueSauf1(el)}x^${i + iMin}` + res : ''))
  //   return res
  // }
}
// Petit test
// const p = new Polynome(2, true)
// console.log(p.toMathExpr())

/**
 * Retourne un polynôme de degré deg.
 */
// function randomPol (deg, mon = false, centre = false) {
//   return new Polynome(deg, mon, centre)
// }

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
      if (this.sup2 === true) {
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
      const derivee1m = math.simplify(math.derivative(terme1, 'x'), reglesDeSimplifications)
      const derivee2m = math.simplify(math.derivative(terme2, 'x'), reglesDeSimplifications)
      const intermediaire = `${derivee1m}*${terme2}+${terme1}*(${derivee2m})`
      switch (listeTypeDeQuestions[i]) {
        case 'inv/poly1': {
          const b = dictFonctions[typef2].monomes[0]
          const a = dictFonctions[typef2].monomes[1]
          texteCorr += `Alors en dérivant $${namef}$ comme un produit, on a \\[${namef}'(x)=${prettyTex(math.parse(intermediaire))}.\\]`
          texteCorr += `Ce qui donne, en simplifiant : \\[${namef}'(x)=\\frac{${reduireAxPlusB(-a, -b)}}{x^2}+\\frac{${a}}{x}.\\]`
          texteCorr += 'On additionne les deux fractions pour obtenir : '
          texteCorr += `\\[${namef}'(x)=\\frac{${reduireAxPlusB(-a, -b)}}{x^2}+\\frac{${a}x}{x^2}=\\frac{${reduireAxPlusB(-a, -b)}${ecritureAlgebrique(a)}x}{x^2}.\\]`
          texteCorr += 'Des termes se simplifient au numérateur et on a : '
          texteCorr += `\\[${namef}'(x)=\\frac{${reduireAxPlusB(0, -b)}}{x^2}.\\]`
          const fExpand = math.simplify(`${a}${ecritureAlgebrique(b)}/x`)
          texteCorr += `<b>Remarque</b> : on pourrait bien entendu développer avant de dériver.<br>Dans ce cas, $${namef}(x)=${prettyTex(fExpand)}$.<br>`
          texteCorr += `Et donc $${namef}'(x)=${math.simplify(math.derivative(fExpand, 'x'))}$`
          break
        }
        case 'monome2/poly1': {
          const b = dictFonctions[typef2].monomes[0] // coeffs du poly1 noté par ax+b
          const a = dictFonctions[typef2].monomes[1] // coeffs du poly1 noté par ax+b
          const m = dictFonctions[typef1].monomes[2] // coeff du monome2
          // const aff = dictFonctions[typef1]
          texteCorr += `Alors en dérivant $${namef}$ comme un produit, on a \\[${namef}'(x)=${reduireAxPlusB(2 * m, 0)}(${exprf2})${ecritureAlgebrique(m)}x^2(${b}).\\]`
          texteCorr += `On développe pour obtenir : \\[${namef}'(x)=${2 * m * a}x^2${ecritureAlgebrique(2 * m * b)}x${ecritureAlgebrique(m * a)}x^2.\\]`
          texteCorr += `Puis, en regroupant les termes de même degré : \\[${namef}'(x)=${2 * m * a + m * a}x^2${ecritureAlgebrique(2 * m * b)}x.\\]`
          const fExpand = math.parse(`${rienSi1(m * a)}x^3${ecritureAlgebrique(m * b)}x^2`)
          texteCorr += `<b>Remarque</b> : on pourrait bien entendu développer avant de dériver.<br>Dans ce cas, $${namef}(x)=${prettyTex(fExpand)}$.<br>`
          texteCorr += `Et donc $${namef}'(x)=${prettyTex(math.simplify(math.derivative(fExpand, 'x')))}$.`
          break
        }
      }
      // texte = texte.replaceAll('frac', 'dfrac')
      // texteCorr = texteCorr.replaceAll('frac', 'dfrac')

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
  if (this.sup === 2) this.besoinFormulaire2CaseACocher = ['Inclure l\'exponentielle dans le niveau 2']
}
