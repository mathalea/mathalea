import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureAlgebriqueSauf1, lettreMinusculeDepuisChiffre, rienSi1 } from '../../modules/outils.js'
import { simplify, parse, derivative } from 'mathjs'
const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Dérivée d\'un produit'

/**
 * Calculer la dérivée d'un produit
 * @author Jean-Léon Henry
 * Référence 1AN14-4
 * @todo
 * - présence paramétrable de l'exponentielle
*/

/**
* Ecriture propre d'un monome ax
* @Example
* //+2x, x, rien si a=0
*/
function monome (a) {
  return a === 0 ? '' : `${ecritureAlgebriqueSauf1(a)}x`
}

export default function DeriveeProduit () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
  this.nbQuestions = 5
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.sup = 1
  // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
  const reglesDeSimplifications = math.simplify.rules.slice()
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n2 + n2'), 1)
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n3 + n2*n3'), 1)
  reglesDeSimplifications.push({ l: '-(n1*v)', r: '-n1*v' })
  console.log(reglesDeSimplifications)
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = ['affaff', 'affquadra', 'quadraquadra']//, 'quadracub']
    } else {
      listeTypeDeQuestionsDisponibles = ['affaff', 'affquadra', 'quadraquadra', 'racinespoly', 'puissancepoly']//, ]
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, a, b, c, d, e, f, terme1, terme2, expression, ensembleDerivation, namef, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'affaff':
          a = randint(-10, 10, 0)
          b = randint(-10, 10)
          c = randint(-10, 10, 0)
          d = randint(-10, 10)
          terme1 = `(${rienSi1(a)}x ${b === 0 ? '' : ecritureAlgebrique(b)})`
          terme2 = `(${rienSi1(c)}x ${d === 0 ? '' : ecritureAlgebrique(d)})`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'affquadra':
          // Coefficients de la fonction affine
          a = randint(-10, 10, 0)
          b = randint(-10, 10)
          // Coefficients de la quadratique
          c = randint(-10, 10, 0)
          d = randint(-10, 10)
          e = randint(-10, 10)
          terme1 = `(${a}x ${b === 0 ? '' : ecritureAlgebrique(b)})`
          terme2 = `(${rienSi1(c)} x^2  ${monome(d)} ${ecritureAlgebrique(e)})`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'quadraquadra':
          // Coefficients de la quadratique
          a = randint(-10, 10, 0)
          b = randint(-10, 10)
          c = randint(-10, 10)
          // Coefficients de la quadratique n°2
          d = randint(-10, 10, 0)
          e = randint(-10, 10)
          f = randint(-10, 10)
          terme1 = `(${rienSi1(a)} x^2  ${monome(b)}  ${ecritureAlgebrique(c)})`
          terme2 = `(${rienSi1(d)} x^2  ${monome(e)}  ${ecritureAlgebrique(f)})`
          ensembleDerivation = '\\mathbb{R}'
          break
        default:
          // TODO
          terme1 = 'x'
          terme2 = 'x'
          ensembleDerivation = '\\mathbb{R}'
          break
      }
      expression = terme1 + terme2
      const derivee1m = math.simplify(math.derivative(terme1, 'x'))
      const derivee2m = math.simplify(math.derivative(terme2, 'x'))
      // derivee1 = derivee1m.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
      // derivee2 = derivee2m.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
      const intermediaire = `(${derivee1m})${terme2}+${terme1}(${derivee2m})`
      // const intermediairem = `(${derivee1m})${terme2}+${terme1}(${derivee2m})`
      namef = lettreMinusculeDepuisChiffre(i + 6)
      texte = `$${namef}:x\\longmapsto ${math.parse(expression).toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')}$`
      texteCorr = `$${namef}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr += `Alors en dérivant $${namef}$ comme un produit, on a $${namef}'(x)=${math.simplify(intermediaire, reglesDeSimplifications).toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')}$.<br>`
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Produits de polynôme \n2 : Cas général']
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 1, '1 : Produits de polynôme']// \n2 : Cas général']
}
