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
*/

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
 * Retourne un polynôme de degré deg. Si deg>=3, retourne un monôme.
 * @param {number} deg Degré du polynôme
 * @param {boolean} mon Si on ne veut qu'un monôme
 * @returns {string} Expression du polynôme
 * @author Jean-Léon Henry
 */
function randomPol (deg, mon = false) {
  if (deg <= 0) { deg = 1 }
  let result = ''
  const a = randint(-10, 10, 0)
  const b = randint(-10, 10)
  const c = randint(-10, 10)

  if (mon) {
    result = deg >= 2 ? `${rienSi1(a)}x^${deg}` : `${rienSi1(a)}x`
  } else {
    switch (deg) {
      case 2:
        result = `${rienSi1(a)} x^2  ${monome(b)} ${constRienSi0(c)}`
        break
      case 1:
        result = `${rienSi1(a)} x ${constRienSi0(b)}`
        break
      case 0:
        result = `${a}`
        break
      default:
        result = `${rienSi1(a)}x^${deg}`
        break
    }
  }
  return result
}
/**
 * Retourne une constante formattée, rien si 0
 * @param {number} a Nombre à formatter
 * @returns Rien si a=0, a formatté sinon
 */
function constRienSi0 (a) {
  return a === 0 ? '' : ecritureAlgebrique(a)
}

export default function DeriveeProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
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

    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = [[1, 1], [1, 2], [2, 2]]
    } else {
      listeTypeDeQuestionsDisponibles = [[randint(1, 2), randint(1, 2)], 'racine/poly', 'racine/poly2centre', 'racine/monome2']
      if (this.sup2 === true) {
        listeTypeDeQuestionsDisponibles.push('exp/poly', 'exp/poly2centre')
      }
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, terme1, terme2, expression, askFacto, askFormule, ensembleDerivation, namef, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On commence par générer des fonctions qui pourrait servir
      const dictFonctions = {
        exp: 'e^x',
        racine: 'sqrt(x)',
        puissance: randomPol(randint(3, 5)),
        poly1: randomPol(1),
        poly2: randomPol(2),
        poly2centre: randomPol(2, true) + `${constRienSi0(randint(-10, 10))}`,
        monome2: randomPol(2, true),
        poly: randomPol(randint(1, 2))
      }
      if (this.sup === 1 || typeof listeTypeDeQuestions[i] !== 'string') {
        // Cas de produit de polynômes
        const deg1 = listeTypeDeQuestions[i][0]
        const deg2 = listeTypeDeQuestions[i][1]
        terme1 = `(${randomPol(deg1)})`
        terme2 = `(${randomPol(deg2)})`
        ensembleDerivation = '\\mathbb{R}'
        askFacto = false
        askFormule = true
      } else {
        // Cas général
        const listeTypeFonctions = listeTypeDeQuestions[i].split('/')
        // On randomise l'ordre des termes
        const f1 = randint(0, 1)
        const f2 = 1 - f1
        const typef1 = listeTypeFonctions[f1]
        const typef2 = listeTypeFonctions[f2]
        askFacto = typef1 === 'exp' || typef2 === 'exp'
        askFormule = false
        // On crée les deux termes en gérant les parenthèses autour des fonctions spéciales
        const dell1 = typef1 === 'racine' || typef1 === 'exp' || typef1 === 'monome2' ? '' : '('
        const delr1 = typef1 === 'racine' || typef1 === 'exp' || typef1 === 'monome2' ? '' : ')'
        terme1 = `${dell1}${dictFonctions[typef1]}${delr1}`
        const dell2 = typef2 === 'racine' || typef2 === 'exp' || typef2 === 'monome2' ? '' : '('
        const delr2 = typef2 === 'racine' || typef2 === 'exp' || typef2 === 'monome2' ? '' : ')'
        terme2 = `${dell2}${dictFonctions[typef2]}${delr2}`
        ensembleDerivation = listeTypeFonctions[0] === 'racine' ? '\\mathbb{R}_+^*' : '\\mathbb{R}'
      }

      // 1ère étape de la dérivation
      expression = terme1 + '*' + terme2
      // console.log(expression)
      const derivee1m = math.simplify(math.derivative(terme1, 'x'))
      const derivee2m = math.simplify(math.derivative(terme2, 'x'))
      const intermediaire = `(${derivee1m})${terme2}+${terme1}(${derivee2m})`

      namef = lettreMinusculeDepuisChiffre(i + 6)
      // Correction
      texte = askFacto ? 'Dans cette question, on demande la réponse sous forme factorisée.<br>' : ''
      texte = askFormule ? 'Dans cette question, on demande d\'utiliser la formule de dérivation d\'un produit.<br>' : texte
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Produits de polynôme\n2 : Polynômes, racine']
  this.besoinFormulaire2CaseACocher = ['Inclure l\'exponentielle dans le niveau 2']
}
