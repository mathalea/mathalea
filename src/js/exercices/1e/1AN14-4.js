import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureAlgebriqueSauf1, lettreMinusculeDepuisChiffre, rienSi1 } from '../../modules/outils.js'
import { simplify, parse, derivative } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Dérivée d\'un produit'

/**
 * Calculer la dérivée d'un produit
 * @author Jean-Léon Henry
 * Référence 1AN14-4
 * @todo Corrections
 * @todo Gestion correcte de l'ensemble de dérivabilité
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

class Polynome {
  constructor (deg, mon = false, centre = false) {
    this.deg = deg
    this.monomes = []
    for (let i = 0; i < deg; i++) {
      if (deg === 2 && i === 1 && centre) {
        this.monomes.push(0)
        continue
      }
      if (!mon) {
        this.monomes.push(randint(-10, 10))
      } else { this.monomes.push(0) }
    }
    this.monomes.push(randint(-10, 10, 0))
  }

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
}
// Petit test
const p = new Polynome(2, true)
console.log(p.toMathExpr())

/**
 * Retourne un polynôme de degré deg. Si deg>=3, retourne un monôme.
 * @param {number} deg Degré du polynôme
 * @param {boolean} mon Si on ne veut qu'un monôme
 * @returns {string} Expression du polynôme
 * @author Jean-Léon Henry
 */
function randomPol (deg, mon = false, centre = false) {
  return new Polynome(deg, mon, centre)
}

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

  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.sup2 = Boolean(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    // Types d'énoncés
    const listeTypeDeQuestionsDisponibles = ['inv/poly1', 'monome2/poly1']
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
        puissance: randomPol(randint(3, 5)),
        poly1: randomPol(1),
        // poly2: randomPol(2),
        poly2centre: randomPol(2, false, true),
        monome2: randomPol(2, true),
        poly: randomPol(randint(1, 2))
      }
      const listeTypeFonctions = listeTypeDeQuestions[i].split('/')
      // On précise les énoncés
      askFacto = listeTypeFonctions.includes('exp')
      askFormule = listeTypeFonctions.includes('poly1')
      askQuotient = listeTypeFonctions.includes('inv')
      // On randomise l'ordre des termes, sauf pour l'inverse et un monome devant une racine
      let f1 = 0
      let f2 = 1
      if (!(['monome2/racine', 'monome2/poly1', 'inv/poly1'].includes(listeTypeDeQuestions[i]))) {
        f1 = randint(0, 1)
        f2 = 1 - f1
      }
      const typef1 = listeTypeFonctions[f1]
      const typef2 = listeTypeFonctions[f2]
      // On gère les parenthèses autour des fonctions spéciales
      const nopar1 = ['racine', 'exp', 'monome2', 'inv'].includes(typef1)
      const nopar2 = ['racine', 'exp', 'monome2', 'inv'].includes(typef2)
      const dell1 = nopar1 ? '' : '('
      const delr1 = nopar1 ? '' : ')'
      const dell2 = nopar2 ? '' : '('
      const delr2 = nopar2 ? '' : ')'
      // On crée les expressions des fonctions
      const exprf1 = ['poly', 'mono'].includes(typef1.substring(0, 4)) ? dictFonctions[typef1].toMathExpr() : dictFonctions[typef1]
      const exprf2 = ['poly', 'mono'].includes(typef2.substring(0, 4)) ? dictFonctions[typef2].toMathExpr() : dictFonctions[typef2]
      terme1 = `${dell1}${exprf1}${delr1}`
      terme2 = `${dell2}${exprf2}${delr2}`
      console.log(typef1, terme1)
      console.log(typef2, terme2)

      ensembleDerivation = '\\mathbb{R}'

      // 1ère étape de la dérivation
      expression = terme1 + '*' + terme2
      // console.log(expression)
      const derivee1m = math.simplify(math.derivative(terme1, 'x'))
      const derivee2m = math.simplify(math.derivative(terme2, 'x'))
      const intermediaire = `(${derivee1m})${terme2}+${terme1}(${derivee2m})`

      namef = lettreMinusculeDepuisChiffre(i + 6)
      // Correction
      texte = askFacto ? 'Dans cette question, on demande la réponse sous forme factorisée.<br>' : ''
      texte = askFormule ? `Dans cette question, on demande d'utiliser la formule de dérivation d'un produit. ${askQuotient ? 'Mettre le résultat sous forme d\'un quotient.' : ''}<br>` : texte
      texte += `$${namef}:x\\longmapsto ${prettyTex(math.parse(expression))}$`
      // texte += askFacto ? ' (On factorisera la réponse)' : '' // Si l'un des termes est une exponentielle
      texteCorr = `$${namef}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr += `Alors en dérivant $${namef}$ comme un produit, on a \\[${namef}'(x)=${prettyTex(math.simplify(intermediaire, reglesDeSimplifications))}.\\]`

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
  this.besoinFormulaire2CaseACocher = ['Inclure l\'exponentielle dans le niveau 2']
}
