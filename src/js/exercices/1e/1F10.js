import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, rienSi1 } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseenforme.js'
import { simplify, parse, derivative } from 'mathjs'
import { lettreMinusculeDepuisChiffre } from '../../modules/outils/lettres.js'
const math = { simplify: simplify, parse: parse, derivative: derivative }
export const titre = 'Calculs de dérivées'

/**
 * Calculs de dérivés
 * @author Rémi Angot
 * Référence 1F10
*/
export const uuid = '2af1c'
export const ref = '1F10'
export default function CalculsDeDerives () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
  this.nbQuestions = 6
  this.nbCols = 2 // Nombre de colonnes pour la sortie LaTeX
  this.nbColsCorr = 2 // Nombre de colonnes dans la correction pour la sortie LaTeX
  this.sup = 1
  // On modifie les règles de simplifications par défaut de math.js pour éviter 10x+10 = 10(x+1) et -4x=(-4x)
  const reglesDeSimplifications = math.simplify.rules.slice()
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n2 + n2'), 1)
  reglesDeSimplifications.splice(reglesDeSimplifications.findIndex(rule => rule.l === 'n1*n3 + n2*n3'), 1)
  //    reglesDeSimplifications.push({l:"-(n1*v^2)",r:"-n1*v^2"})
  this.nouvelleVersion = function () {
    this.sup = Number(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs

    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = ['ax+b', 'a', 'ax2+bx+c', 'xn', 'xn+xm', '1/x', 'xn+1/x', '1/xn', 'xn+1/xm', 'racine(x)']
    } else if (this.sup === 2) {
      listeTypeDeQuestionsDisponibles = ['ax+b', 'axn', 'a/x', 'a/xn', 'racine(ax)']
    } else {
      listeTypeDeQuestionsDisponibles = ['ax+b', 'axn', 'a/x', 'a/xn', 'racine(ax)']
    }
    const listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, a, b, c, n, m, expression, ensembleDerivation, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (listeTypeDeQuestions[i]) {
        case 'a':
          a = randint(-10, 10, 0)
          expression = `${a}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'ax+b':
          a = randint(-10, 10, 0)
          b = randint(-10, 10, 0)
          expression = `${a}x  ${ecritureAlgebrique(b)}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'ax2+bx+c':
          a = randint(-10, 10, 0)
          b = randint(-10, 10, 0)
          c = randint(-10, 10, 0)
          expression = `${rienSi1(a)} x^2  ${ecritureAlgebriqueSauf1(b)} x  ${ecritureAlgebrique(c)}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'xn':
          n = randint(2, 10)
          expression = `x^${n}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'xn+1/x':
          n = randint(2, 10)
          expression = `x^${n}+1/x`
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case 'xn+1/xm':
          n = randint(2, 10)
          m = randint(2, 10, m)
          expression = `x^${n}+1/x^${m}`
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case 'xn+xm':
          n = randint(2, 10)
          m = randint(2, 10, m)
          expression = `x^${n}+x^${m}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case 'axn':
          a = randint(-10, 10, [0, 1, -1])
          n = randint(2, 10)
          expression = `${a}x^${n}`
          ensembleDerivation = '\\mathbb{R}'
          break
        case '1/x':
          expression = '1/x'
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case 'a/x':
          a = randint(-10, 10, [0, 1])
          expression = `${a}/x`
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case '1/xn':
          n = randint(2, 10)
          expression = `${1}/x^${n}`
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case 'a/xn':
          a = randint(-10, 10, [1, 0])
          n = randint(2, 10)
          expression = `${a}/x^${n}`
          ensembleDerivation = '\\mathbb{R}^{\\text{*}}'
          break
        case 'racine(x)':
          expression = 'sqrt(x)'
          ensembleDerivation = '[0,+\\infin['
          break
        case 'racine(ax)':
          a = randint(2, 10, [4, 9])
          expression = `sqrt(${rienSi1(a)}x)`
          ensembleDerivation = '[0,+\\infin['
          break
      }

      texte = `$${lettreMinusculeDepuisChiffre(i + 6)}:x\\longmapsto ${math.parse(expression).toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')}$`
      texteCorr = `$${lettreMinusculeDepuisChiffre(i + 6)}$ est dérivable sur $${ensembleDerivation}$ et $ ${lettreMinusculeDepuisChiffre(i + 6)}':x\\longmapsto ${math.simplify(math.derivative(expression, 'x'), reglesDeSimplifications).toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')}$`

      texte = texte.replaceAll('frac', 'dfrac')
      texteCorr = texteCorr.replaceAll('frac', 'dfrac')

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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Fonctions de base \n2 : ku'] // \n3 : u/v, uv'];
}
