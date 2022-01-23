import { context } from './context.js'
import { all, create, format, number, SymbolNode, ConstantNode, OperatorNode, ParenthesisNode, simplify, parse } from 'mathjs'
import { Node, Negative, solveEquation, simplifyExpression, factor, printMS } from 'mathsteps'
import { getNewChangeNodes } from './Change.js'
// import Algebrite from 'algebrite'
// const Algebrite = require('algebrite')
const math = create(all)
math.config({
  number: 'number',
  randomSeed: context.graine
})
// eslint-disable-next-line no-debugger
debugger

function searchFirstNode (node, op) {
  if (node.type === 'OperatorNode') {
    return searchFirstNode(node.args[0], node.op)
  } else if (node.type === 'ParenthesisNode') {
    return searchFirstNode(node.content, node.op)
  } else {
    return { node: node, op: op }
  }
}

function transformNode (node, oldNode, params = { suppr1: true, suppr0: true, supprPlusMoins: true }) {
  params = Object.assign({ suppr1: true, suppr0: true, supprPlusMoins: true }, params)
  if (oldNode === undefined || node.toString() !== oldNode.toString()) {
    oldNode = node.clone()
    /*
    * Retirer les parenthèses au dividende et diviseur d'un quotient
    * (n1)/(n2) devient n1/n2
    */
    if (node.isOperatorNode && node.op === '/') {
      if (node.args[0].isParenthesisNode) {
        node.args[0] = node.args[0].content
      }
      if (node.args[1].isParenthesisNode) {
        node.args[1] = node.args[1].content
      }
    }
    /*
    * Transformer -2/n en -(2/n)
    * Ne touche pas à (-2)/(-n)
    */
    if (node.isOperatorNode && node.op === '/') {
      if (
        node.args[0].type === 'OperatorNode' &&
        node.args[0].fn === 'unaryMinus' &&
        (node.args[0].args[0].type === 'ConstantNode' || node.args[0].args[0].type === 'SymbolNode') &&
        !(
          node.args[1].type === 'OperatorNode' &&
          node.args[1].fn === 'unaryMinus'
        )
      ) {
        let frac = Node.Creator.operator('/', [node.args[0].args[0], node.args[1]])
        frac = Node.Creator.parenthesis(frac)
        node = math.parse('-' + frac.toString())
      }
    }
    /* (Flatten divisions comme dans Mathsteps)
    * Transformer (1/2*3)/4 en 1/2*(3/4)
    */
    if (node.isOperatorNode && node.op === '/') {
      if (node.args[0].isOperatorNode && node.args[0].op === '*') {
        if (node.args[0].args[0].isOperatorNode && node.args[0].args[0].op === '/') {
          const frac1 = Node.Creator.operator('/', node.args[0].args[0].args)
          const frac2 = Node.Creator.operator('/', [node.args[0].args[1], node.args[1]])
          node = Node.Creator.operator('*', [frac1, frac2])
        }
      }
    }
    /*
    * Transformer (n1)+(n2) en n1+n2
    * Utile si n1 et/ou n2 sont des unaryMinus ou des fractions
    */
    if (node.isOperatorNode && node.op === '+') {
      if (params.supprPlusMoins) {
        if (node.args[0].isParenthesisNode) node.args[0] = node.args[0].content
        if (node.args[1].isParenthesisNode) node.args[1] = node.args[1].content
      } else {
        if (node.args[0].isParenthesisNode && node.args[0].content.toString()[0] !== '-') node.args[0] = node.args[0].content
        if (node.args[1].isParenthesisNode && node.args[1].content.toString()[0] !== '-') node.args[1] = node.args[1].content
      }
    }
    /*
    * Transformer n+0 en n
    */
    if (params.suppr0 && node.isOperatorNode && node.op === '+') {
      if (node.args[1].toString() === '0') {
        node = node.args[0]
      }
    }
    /*
    * Transformer n1+0*n2 en n1
    */
    if (params.suppr0 && node.isOperatorNode && node.op === '+') {
      if (
        node.args[1].isOperatorNode &&
        node.args[1].op === '*' &&
        (
          node.args[1].args[0].toString() === '0'
        )
      ) {
        node = node.args[0]
      }
    }
    /*
    * Transformer 1*n en n et -1*n en -n
    */
    if (params.suppr1 && node.isOperatorNode && node.op === '*' && searchFirstNode(node.args[1]).node.type !== 'ConstantNode') {
      if (node.args[0].toString() === '1') {
        node = node.args[1]
      } else if (node.args[0].toString() === '-1') {
        node = math.parse('-' + node.args[1].toString())
      }
    }
    /*
    * Transformer n/1 en n et n/-1 en -n
    */
    if (params.suppr1 && node.isOperatorNode && node.op === '/') {
      if (node.args[1].toString() === '1') {
        node = node.args[0]
      } else if (node.args[1].toString() === '-1') {
        node = math.parse('-' + node.args[0].toString())
      }
    }
    /*
    * Transformer (n1)-n2 en n1-n2
    * Transformer --c en -(-c)
    * transformer n1-(n2/n3) en n1-n2/n3
    */
    if (node.isOperatorNode && node.op === '-') { // Enlève les parenthèses au premier terme d'une soustraction et au second sous condition d'une /
      if (node.args[0].isParenthesisNode) node.args[0] = node.args[0].content
      if (node.args.length === 1 && node.args[0].isConstantNode && node.args[0].value < 0) { // Pour corriger --3 en -(-3)
        node.args[0] = Node.Creator.parenthesis(node.args[0])
      }
      if (node.args.length === 2 && node.args[1].isConstantNode && node.args[1].value < 0) { // Pour corriger 7--3 en 7-(-3)
        node.args[1] = Node.Creator.parenthesis(node.args[1])
      }
      /*
      * Code à simplifier ?
      */
      if (
        node.fn !== 'unaryMinus' && // On vérifie si c'est une vraie soustraction (avec deux termes)
    node.args[1].isParenthesisNode && // On vérifie que le second terme possède une parenthèse
    node.args[1].content.isOperatorNode && // On vérifie que le second terme contient une opération
    (
      node.args[1].content.op === '/' || // On teste si cette opération est une division
      (
        node.args[1].content.op === '*' && // On teste si c'est une multiplication
        (
          !node.args[1].content.args[0].isOperatorNode || // Si le premier facteur n'est pas une opération
          (
            node.args[1].content.args[0].isOperatorNode && // Ou si c'est une opération
            node.args[1].content.args[0].fn !== 'unaryMinus' // mais que le premier argument n'est pas -blabla
          )
        )
      )
    )
      ) node.args[1] = node.args[1].content
    }
    if (node.isOperatorNode && node.op === '*') { // Enlève les parenthèses aux deux facteurs d'une multiplication
      if (node.args[0].isParenthesisNode && // On cherche à l'intérieur d'une parenthèse
    (
      !node.args[0].content.isOperatorNode || // Il ne faut pas d'opération
      (node.args[0].content.isOperatorNode && node.args[0].content.op === '/') || // ou alors une divisions
      (node.args[0].content.isOperatorNode && node.args[0].content.fn === 'unaryMinus' && params.supprPlusMoins) // ou alors un -n
    )
      ) { // Si l'une des conditions est vérifiée alors :
        node.args[0] = node.args[0].content // on enlève la parenthèse
        node.implicit = false // on fait en sorte que la multiplication soit visible
      }
      if (node.args[1].isParenthesisNode &&
    (
      !node.args[1].content.isOperatorNode ||
      (
        node.args[1].content.isOperatorNode &&
        node.args[1].content.op === '/' &&
        !(
          node.args[1].content.args[0].type === 'OperatorNode' &&
          node.args[1].content.args[0].fn === 'unaryMinus' &&
          node.args[1].content.args[0].args[0].type === 'ConstantNode' &&
          !(node.args[1].content.args[1].type === 'OperatorNode' && node.args[1].content.args[1].fn === 'unaryMinus')
        )
      )
    )) {
        node.args[1] = node.args[1].content
        node.implicit = false
      }
    }
    if (node.type === 'OperatorNode' && node.op === '*') { // Corrige n*-c en n*(-c)
      if (node.args[1].toString()[0] === '-') {
        node.args[1] = Node.Creator.parenthesis(node.args[1])
      }
    }
    // Peut-être faut-il mettre à jour le mathjs de mathsteps car il semble que le code suivant ne fonctionne pas
    // dans mathsteps lorsqu'il est placé dans print.js de mathsteps
    // alors qu'il fonctionne avec la version mathjs de mathalea
    if (node.isOperatorNode && node.op === '*') { // Multiplication implicite 2*x devient 2x et 2*(x+3) devient 2(x+3)
      if (node.args[1].isParenthesisNode || node.args[1].isSymbolNode) node.implicit = true
      if (node.args[1].isOperatorNode && node.args[1].op === '^' && node.args[1].args[0].isSymbolNode) node.implicit = true
    }
    if (node.isOperatorNode && node.op === '*') { // Multiplication explicite x*2 ou x*2/3
      if (node.args[1].isConstantNode) node.implicit = false
      if (node.args[1].isOperatorNode && node.args[1].args[0].isConstantNode) node.implicit = false
      if (node.args[1].isOperatorNode && node.args[1].op === '/') node.implicit = false
      if (node.args[1].isOperatorNode && node.args[1].args[0].isOperatorNode && node.args[1].args[0].op === '/') node.implicit = false
      if (node.args[1].isParenthesisNode && node.args[1].content.isOperatorNode && node.args[1].content.fn === 'unaryMinus') node.implicit = false
    }
    if (
      node.isParenthesisNode &&
      node.content.isOperatorNode &&
        (
          (node.content.op === '*' || node.content.op === '^') &&
          (node.content.toString()[0] !== '-')
        )
    ) {
      node = node.content
    }
    if (node.isParenthesisNode && node.content.isOperatorNode && node.content.op === '/') node = node.content
    if (node.isOperatorNode && node.fn === 'unaryMinus' && node.args[0].isParenthesisNode && node.args[0].content.isOperatorNode && node.args[0].content.op === '*') node.args[0] = node.args[0].content
    if (node.isOperatorNode && node.fn === 'unaryMinus' && node.args[0].isOperatorNode && node.args[0].op === '*') node = Node.Creator.operator('*', [Negative.negate(node.args[0].args[0]), node.args[0].args[1]])
    if (
      node.isOperatorNode && node.op === '*') {
      const firstNode = searchFirstNode(node.args[1])
      if (
        firstNode.node.type === 'ConstantNode' &&
        firstNode.op === '*'
      ) { node.implicit = false }
    }
    return transformNode(node, oldNode, params)
  } else {
    return node
  }
}

/* Corrige le problème lié au conversions de (-3)² en -3² si on passe du format mathsteps au format mathjs
*/
function correctifNodeMathsteps (node) {
  node = node.transform(
    function (node, path, parent) {
      if (node.type === 'ConstantNode') {
        return math.parse(node.toString())
      }
      return node
    }
  )
  return node
}

export function toTex (node, params = { suppr1: true, suppr0: true, supprPlusMoins: true }) {
  params = Object.assign({ suppr1: true, suppr0: true, supprPlusMoins: true }, params)
  // On commence par convertir l'expression en arbre au format mathjs
  let comparator
  let sides = []
  const comparators = ['<=', '>=', '=', '<', '>']
  if (typeof node === 'string') {
    for (let i = 0; i < comparators.length; i++) {
      sides = node.split(comparators[i])
      if (sides.length === 2) {
        comparator = comparators[i]
      }
    }
    if (comparator !== undefined) {
      sides = node.split(comparator)
    } else {
      node = parse(node)
    }
  } else {
    // Le format mathsteps s'il est en entrée ne permet pas a priori de modifier les implicit
    // De plus comme les multiplications peuvent avoir 3 ou plus de facteurs dans mathsteps
    // et que le paramètre implicit s'applique alors à tous les facteurs
    // cela devient impossible à traiter pour 4*x*(-5) qui donnerait 4x-5 avec implicit = true.
    // Mais il faut un pré-traitement car sinon le passage de mathsteps à mathjs
    // transforme les (-3)^2 en -3^2
    node = correctifNodeMathsteps(node) // Convertit d'abord tous les ConstantNode au format mathjs
    node = parse(node.toString({ parenthesis: 'all' })) // Permet d'utiliser correctement les implicit
  }
  if (sides.length === 2) {
    const leftSide = toTex(sides[0], params)
    const rightSide = toTex(sides[1], params)
    return leftSide + comparator + rightSide
  }
  let nodeClone
  do { // À étudier, pour 79 et 85 et 50 cette boucle doit être maintenue
    nodeClone = node.cloneDeep() // Vérifier que node.clone() fonctionne (peut-être y a-t-il un problème avec implicit avec cloneDeep())
    node = node.transform(
      function (node, path, parent) {
        node = transformNode(node, undefined, params)
        return node
      }
    )
  } while (node.toString() !== nodeClone.toString())

  let nodeTex = node.toTex({ implicit: 'hide', parenthesis: 'keep' }).replaceAll('\\cdot', '\\times').replaceAll('.', '{,}').replaceAll('\\frac', '\\dfrac')

  nodeTex = nodeTex.replace(/\s*?\+\s*?-\s*?/g, ' - ')

  return nodeTex
}

export function expressionLitterale (expression = '(a*x+b)*(c*x-d)', assignations = { a: 1, b: 2, c: 3, d: -6 }, debug = false) {
  // Ne pas oublier le signe de la multiplication
  return simplify(expression, [{ l: '1*n', r: 'n' }, { l: '-1*n', r: '-n' }, { l: 'n/1', r: 'n' }, { l: 'c/c', r: '1' }, { l: '0*v', r: '0' }, { l: '0+v', r: 'v' }], assignations)
}

/**
 * @description Retourne des valeurs aléatoires sous certaines contraintes données.
 * @param {Object} variables // Propriété réservée : test
 * @returns {Object}
 * @see {@link https://mathjs.org/docs/expressions/syntax.html|Mathjs}
 * @see {@link https://coopmaths.fr/documentation/tutorial-Outils_Mathjs.html|Mathjs}
 * @author Frédéric PIOU
 */
export function aleaVariables (variables = { a: false, b: false, c: true, d: 'fraction(a,10)+fraction(b,100)', test: 'b!=0 and b>a>c' }, debug = false) {
  const assignations = {}
  let cpt = 0
  let test = true
  do {
    cpt++
    for (const v of Object.keys(variables)) {
      if (typeof variables[v] === 'boolean') {
        assignations[v] = math.evaluate('(pickRandom([-1,1]))^(n)*randomInt(1,10)', { n: variables[v] })
      } else if (typeof variables[v] === 'number') {
        assignations[v] = variables[v]
      } else if (v !== 'test') {
        assignations[v] = math.evaluate(variables[v], assignations)
      }
    }
    if (variables.test !== undefined) test = math.evaluate(variables.test, assignations)
  } while (!test && cpt < 1000)
  if (cpt === 1000) window.notify('Attention ! 1000 essais dépassés.\n Trop de contraintes.\n Le résultat ne vérifiera pas le test.')
  return assignations
}

/*
* Objet mathsteps : Permet de traverser toutes les étapes et sous-étapes
*/
export function traverserEtapes (steps, result = []) {
  steps.forEach(function (step, i) {
    if (step.substeps.length === 0) result.push(step)
    return traverserEtapes(step.substeps, result)
  })
  return result
}

export function calculExpression (expression = '4/3+5/6', factoriser = false, debug = false) {
  const steps = factoriser ? traverserEtapes(factor(expression)) : traverserEtapes(simplifyExpression(expression))
  if (debug) {
    console.log('* steps :')
    console.log(steps)
  }
  let repetition = 0
  const stepsExpression = []
  let expressionPrint = ''
  steps.forEach(function (step, i) {
    const changement = step.changeType
    if (step.oldNode !== null) {
      if (step.oldNode.toString() === step.newNode.toString()) {
        if (changement !== 'REMOVE_ADDING_ZEROS') repetition = (repetition + 1) % 2
      } else {
        repetition = 0
      }
    }
    const oldNode = step.oldNode !== null ? toTex(step.oldNode, { suppr1: false }) : ''
    const newNode = toTex(step.newNode, { suppr1: false })
    /* const oldNode = step.oldNode !== null ? printMS.latex(step.oldNode, false) : ''
    const newNode = printMS.latex(step.newNode, false) */
    if (debug) console.log('printMS(step.newNode)', printMS.ascii(step.newNode))
    if (debug) console.log('step.newNode', step.newNode)
    if (debug) {
      console.log(changement)
      console.log(newNode.toString())
    }
    if (i === 0) {
      expressionPrint = `${oldNode}`
    }
    if (debug) console.log(newNode)
    const commentairesExclus = {
      COLLECT_LIKE_TERMS: String.raw`\text{Regrouper les termes}`,
      MULTIPLY_DENOMINATORS: String.raw`\text{Calculer les dénominateurs}`,
      ADD_EXPONENT_OF_ONE: String.raw`\text{Ajouter l'exposant 1}`,
      COLLECT_POLYNOMIAL_EXPONENTS: String.raw`\text{Ajouter l'exposant 1}`
    }
    let commentaires = {
      COMMON_DENOMINATOR: String.raw`\text{Obtenir le même dénominateur}`,
      MULTIPLY_NUMERATORS: String.raw`\text{Calculer}`,
      COMBINE_NUMERATORS: String.raw`\text{Combiner les numérateurs}`,
      ADD_NUMERATORS: String.raw`\text{Additionner les numérateurs}`,
      ADD_COEFFICIENT_OF_ONE: String.raw`\text{Ajouter le coefficient }1`,
      GROUP_COEFFICIENTS: String.raw`\text{Regrouper les coefficients}`,
      FIND_GCD: String.raw`\text{Trouver le plus grand diviseur commun.}`,
      CANCEL_GCD: String.raw`\text{Simplifier par le PGCD.}`
    }
    if (debug) {
      commentaires = Object.assign(commentaires, {
        STATEMENT_IS_FALSE: String.raw`\text{L'égalité est fausse}`,
        STATEMENT_IS_TRUE: String.raw`\text{L'égalité est vraie}`,
        DISTRIBUTE: String.raw`\text{Distribution}`,
        SIMPLIFY_RIGHT_SIDE: String.raw`\text{Simplifier le membre de droite}`,
        SIMPLIFY_LEFT_SIDE: String.raw`\text{Simplifier le membre de gauche}`,
        COLLECT_AND_COMBINE_LIKE_TERMS: String.raw`\text{Regrouper et réduire les termes de même nature}`,
        SIMPLIFY_ARITHMETIC: String.raw`\text{Calcul arithmétique}`,
        SIMPLIFY_FRACTION: String.raw`\text{Simplifier une fraction}`,
        REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: String.raw`\text{Calculer la multiplication par }-1`,
        REMOVE_ADDING_ZERO: String.raw`\text{Enlever des zéros}`,
        SWAP_SIDES: String.raw`\text{Echanger les deux membres}`,
        CANCEL_MINUSES: String.raw`\text{Annuler les signes moins}`,
        FIND_ROOTS: String.raw`\text{Trouver la (ou les) solution(s)}`,
        SIMPLIFY_SIGNS: String.raw`\text{Simplifier le signe}`,
        MULTIPLY_BY_ZERO: String.raw`\text{Multiplication par zéro}`,
        ADD_FRACTIONS: String.raw`\text{Additionner des fractions}`,
        BREAK_UP_FRACTION: String.raw`\text{Séparer une fraction}`,
        CANCEL_TERMS: String.raw`\text{Annuler les termes}`,
        REMOVE_MULTIPLYING_BY_ONE: String.raw`\text{Retirer la multiplication par } 1`
      })
    }
    if (commentaires[changement] === undefined) commentaires[changement] = ''
    if (commentairesExclus[changement] === undefined) stepsExpression.push(String.raw`&=${newNode}&&\tiny${commentaires[changement]}`)
    if (debug) console.log('changement', commentaires[changement])
  })
  if (steps[steps.length - 1].newNode.type === 'OperatorNode' &&
  steps[steps.length - 1].newNode.op === '/' &&
  steps[steps.length - 1].newNode.args[0].type === 'ConstantNode' &&
  steps[steps.length - 1].newNode.args[1].type === 'ConstantNode' &&
  (
    Math.abs(steps[steps.length - 1].newNode.args[0].value) > steps[steps.length - 1].newNode.args[1].value ||
    steps[steps.length - 1].newNode.args[0].value < 0
  )
  ) {
    const plus = steps[steps.length - 1].newNode.args[0].value < 0 ? '-' : '+'
    stepsExpression.push(
      '&=' + toTex(
        math.parse(
          math.fraction(
            steps[steps.length - 1].newNode.args[0].value,
            steps[steps.length - 1].newNode.args[1].value
          ).toFraction(true).replace(' ', plus)
        ), { suppr1: false }
      )
    )
  }
  let texte = String.raw`Simplifier $${expressionPrint}$.`
  const texteCorr = String.raw`
  $\begin{aligned}
  ${expressionPrint}${stepsExpression.join('\\\\')}
  \end{aligned}$
  `
  if (debug) texte = texteCorr
  return { texte: texte, texteCorr: texteCorr, stepsLatex: stepsExpression, expression: expressionPrint }
}

/**
* @description Retourne toutes les étapes de calculs d'une expression numérique ou de développement-réduction d'une expression littérale
* @param {Objet} params // Les paramètres (commentaires visibles , sous-étapes visibles, fraction-solution au format MixedNumber)
* @param {string} expression // Une expression à calculer ou à développer
*/
export function calculer (expression, params) {
  params = Object.assign({ comment: false, substeps: false, mixed: false, name: undefined }, params)
  // La fonction simplifyExpression est une fonction mathsteps
  // Elle renvoie toutes les étapes d'un calcul numérique ou d'un développement-réduction
  // L'addition de deux fractions est classée dans les sous-étapes bizarrement
  // Les calculs se font de la gauche vers la droite et dès que c'est possible dans le respect des priorités
  // Les termes de même nature sont regroupés avant d'effectuer les calculs :
  // Les SymbolNode par exposant décroissant, puis Les constantes et enfin les fractions
  // Parfois les COLLECT LIKE TERMS ne donnent pas de changement ???
  // A faire : Virer l'étape précédent un REMOVE MULTIPLYING BY ONE et lui prendre son commentaire
  // A faire : Même chose pour REMOVE ADDING ZERO
  // La suite de CANCEL TERMS peut être applanie
  // Refaire la méthode transform() pour qu'elle ne modifie rien d'autre de notre noeud que ce qu'on souhaite
  // Si ça fonctionne on peut régler le problème des implicit qui disparaissent ? des (-3)² qui deviennent -3² ?
  // A faire : Ajouter un paramètre parenthesis à chaque noeud, ou il faudrait le faire dans Mathjs ?

  const steps = params.substeps ? traverserEtapes(simplifyExpression(expression)) : simplifyExpression(expression)
  const stepsExpression = []
  const commentaires = []
  let expressionPrint = ''
  steps.forEach(function (step, i) {
    const oldNode = step.oldNode !== null ? toTex(step.oldNode, { suppr1: true }) : ''
    const newNode = toTex(step.newNode, { suppr1: true })
    if (i === 0) {
      expressionPrint = `${oldNode}`
    }
    if (newNode === oldNode) stepsExpression.pop()
    if (params.comment) {
      const commentaire = String.raw`\text{${step.changeType}}`.replaceAll('_', ' ')
      commentaires.push(commentaire)
      if (stepsExpression.length === 0 || i === steps.length - 1) {
        if (params.name === undefined) {
          stepsExpression.push(String.raw`${expressionPrint}&=${newNode}&&${commentaire}`)
        } else {
          if (stepsExpression.length === 0) {
            stepsExpression.push(String.raw`${params.name}&=${expressionPrint}&&${commentaire}`)
            stepsExpression.push(String.raw`&=${newNode}&&${commentaire}`)
          } else {
            stepsExpression.push(String.raw`${params.name}&=${newNode}&&${commentaire}`)
          }
        }
      } else {
        stepsExpression.push(String.raw`&=${newNode}&&${commentaire}`)
      }
    } else {
      if (stepsExpression.length === 0 || i === steps.length - 1) {
        if (params.name === undefined) {
          stepsExpression.push(String.raw`${expressionPrint}&=${newNode}`)
        } else {
          if (stepsExpression.length === 0) {
            stepsExpression.push(String.raw`${params.name}&=${expressionPrint}`)
            stepsExpression.push(String.raw`&=${newNode}`)
          } else {
            stepsExpression.push(String.raw`${params.name}&=${newNode}`)
          }
        }
      } else {
        stepsExpression.push(String.raw`&=${newNode}`)
      }
    }
  })
  if (params.mixed === true && steps[steps.length - 1].newNode.type === 'OperatorNode' &&
  steps[steps.length - 1].newNode.op === '/' &&
  steps[steps.length - 1].newNode.args[0].type === 'ConstantNode' &&
  steps[steps.length - 1].newNode.args[1].type === 'ConstantNode' &&
  (
    Math.abs(steps[steps.length - 1].newNode.args[0].value) > steps[steps.length - 1].newNode.args[1].value ||
    steps[steps.length - 1].newNode.args[0].value < 0
  )
  ) {
    const plus = steps[steps.length - 1].newNode.args[0].value < 0 ? '-' : '+'
    stepsExpression.push(
      '&=' + toTex(
        math.parse(
          math.fraction(
            steps[steps.length - 1].newNode.args[0].value,
            steps[steps.length - 1].newNode.args[1].value
          ).toFraction(true).replace(' ', plus)
        ), { suppr1: false }
      )
    )
  }
  const texte = String.raw`Calculer $${expressionPrint}$.`
  const texteCorr = String.raw`
  $\begin{aligned}
  ${stepsExpression.join('\\\\')}
  \end{aligned}$
  `
  return { printResult: toTex(steps[steps.length - 1].newNode), netapes: stepsExpression.length, texteDebug: texte + texteCorr, texte: texte, texteCorr: texteCorr, stepsLatex: stepsExpression, steps: steps, commentaires: commentaires, printExpression: expressionPrint, name: params.name }
}

export function aleaEquation (equation = 'a*x+b=c*x-d', variables = { a: false, b: false, c: false, d: false, test: 'a>b or true' }, debug = false) { // Ne pas oublier le signe de la multiplication
  const comparators = ['<=', '>=', '=', '<', '>']
  const assignations = aleaVariables(variables, debug)
  for (const v of Object.keys(assignations)) {
    assignations[v] = number(assignations[v])
  }
  let comparator
  let sides
  for (let i = 0; i < comparators.length; i++) {
    const comparatorSearch = comparators[i]
    sides = equation.split(comparatorSearch)
    if (sides.length === 2) {
      comparator = comparatorSearch
    }
  }
  sides = equation.split(comparator)
  const leftNode = expressionLitterale(sides[0], assignations, debug).toString()
  const rightNode = expressionLitterale(sides[1], assignations, debug).toString()
  if (debug) {
    console.log('Equation à résoudre : ', `${leftNode}${comparator}${rightNode}`)
  }
  return `${leftNode}${comparator}${rightNode}`
}

export function resoudreEquation (equation = '5(x-7)=3(x+1)', debug = false) {
  const comparators = ['<=', '>=', '=', '<', '>']
  let comparator
  let sides
  for (let i = 0; i < comparators.length; i++) {
    const comparatorSearch = comparators[i]
    sides = equation.split(comparatorSearch)
    if (sides.length === 2) {
      comparator = comparatorSearch
    }
  }
  sides = equation.split(comparator)
  // const equation0 = equation.replace(comparator, `+0${comparator}0+`)
  let equationPrint
  const steps = solveEquation(equation)
  if (debug) {
    console.log('* steps :')
    console.log(steps)
  }
  const stepsNewEquation = []
  let repetition = 0
  steps.forEach(function (step, i) {
    const changement = step.changeType
    if (step.oldEquation !== null) {
      if (step.oldEquation.leftNode.toString() === step.newEquation.leftNode.toString() || step.oldEquation.rightNode.toString() === step.newEquation.rightNode.toString()) {
        if (changement !== 'REMOVE_ADDING_ZEROS') repetition = (repetition + 1) % 3
      } else {
        repetition = 0
      }
    }
    const oldLeftNode = step.oldEquation !== null ? toTex(step.oldEquation.leftNode) : ''
    let newLeftNode = toTex(step.newEquation.leftNode)
    const oldRightNode = step.oldEquation !== null ? toTex(step.oldEquation.rightNode) : ''
    let newRightNode = toTex(step.newEquation.rightNode)
    /* const oldLeftNode = step.oldEquation !== null ? printMS.latex(step.oldEquation.leftNode, false) : ''
    let newLeftNode = printMS.latex(step.newEquation.leftNode, false)
    const oldRightNode = step.oldEquation !== null ? printMS.latex(step.oldEquation.rightNode, false) : ''
    let newRightNode = printMS.latex(step.newEquation.rightNode, false) */
    if (debug) {
      console.log(changement)
      console.log(newLeftNode.toString() + step.newEquation.comparator + newRightNode.toString())
    }
    if (i === 0) {
      equationPrint = `${oldLeftNode}${step.newEquation.comparator}${oldRightNode}`
    }
    const color = repetition === 2 ? 'black' : 'red'
    newLeftNode = `{\\color{${color}}${newLeftNode.replace(oldLeftNode, `{\\color{black}${oldLeftNode}}`)}}`
    newRightNode = `{\\color{${color}}${newRightNode.replace(oldRightNode, `{\\color{black}${oldRightNode}}`)}}`
    if (debug) console.log(newLeftNode + step.newEquation.comparator + newRightNode)
    const stepChange = getNewChangeNodes(step).length > 0 ? toTex(parse(getNewChangeNodes(step)[0].toString(), { parenthesis: 'auto' })) : ''
    let commentaires = {
      MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE: String.raw`\text{Multiplier les deux membres par }-1`,
      SUBTRACT_FROM_BOTH_SIDES: String.raw`\text{Soustraire }${stepChange}\text{ à chaque membre}`,
      ADD_TO_BOTH_SIDES: String.raw`\text{Ajouter }${stepChange}\text{ à chaque membre}`,
      MULTIPLY_TO_BOTH_SIDES: String.raw`\text{Multiplier chaque membre par }${stepChange}`,
      DIVIDE_FROM_BOTH_SIDES: String.raw`\text{Diviser chaque membre par }${stepChange}`,
      MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION: String.raw`\text{Multiplier chaque membre par }${stepChange}`
    }
    if (debug) {
      commentaires = Object.assign(commentaires, {
        STATEMENT_IS_FALSE: String.raw`\text{L'égalité est fausse}`,
        STATEMENT_IS_TRUE: String.raw`\text{L'égalité est vraie}`,
        DISTRIBUTE: String.raw`\text{Distribution}`,
        SIMPLIFY_RIGHT_SIDE: String.raw`\text{Simplifier le membre de droite}`,
        SIMPLIFY_LEFT_SIDE: String.raw`\text{Simplifier le membre de gauche}`,
        COLLECT_AND_COMBINE_LIKE_TERMS: String.raw`\text{Regrouper et réduire les termes de même nature}`,
        SIMPLIFY_ARITHMETIC: String.raw`\text{Calcul arithmétique}`,
        SIMPLIFY_FRACTION: String.raw`\text{Simplifier une fraction}`,
        REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: String.raw`\text{Calculer la multiplication par }-1`,
        REMOVE_ADDING_ZERO: String.raw`\text{Enlever des zéros}`,
        SWAP_SIDES: String.raw`\text{Echanger les deux membres}`,
        CANCEL_MINUSES: String.raw`\text{Annuler les signes moins}`,
        FIND_ROOTS: String.raw`\text{Trouver la (ou les) solution(s)}`,
        SIMPLIFY_SIGNS: String.raw`\text{Simplifier le signe}`,
        MULTIPLY_BY_ZERO: String.raw`\text{Multiplication par zéro}`,
        ADD_FRACTIONS: String.raw`\text{Additionner des fractions}`,
        BREAK_UP_FRACTION: String.raw`\text{Séparer une fraction}`,
        CANCEL_TERMS: String.raw`\text{Annuler les termes}`,
        REMOVE_MULTIPLYING_BY_ONE: String.raw`\text{Retirer la multiplication par } 1`
      })
    }
    if (commentaires[changement] === undefined) commentaires[changement] = ''
    if (repetition === 2) {
      repetition = 0
      stepsNewEquation.pop()
      if (changement !== 'REMOVE_ADDING_ZERO') stepsNewEquation.push(String.raw`${newLeftNode}&${step.newEquation.comparator}${newRightNode}&&${commentaires[changement]}`)
    } else {
      if (changement !== 'REMOVE_ADDING_ZERO') stepsNewEquation.push(String.raw`${newLeftNode}&${step.newEquation.comparator}${newRightNode}&&${commentaires[changement]}`)
    }
    if (debug) console.log('changement', commentaires[changement])
  })
  let texte = String.raw`Résoudre $${equationPrint}$`
  const texteCorr = String.raw`
  $\begin{aligned}
  ${stepsNewEquation.join('\\\\')}
  \end{aligned}$
  `
  if (debug) texte = texteCorr
  return { texte: texte, texteCorr: texteCorr, equation: equationPrint }
}

export function commentStep (step, comments) {
  const changement = step.changeType
  const stepChange = getNewChangeNodes(step).length > 0 ? toTex(parse(getNewChangeNodes(step)[0].toString(), { parenthesis: 'auto' })) : ''
  const defaultComments = {
    MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE: 'Multiplier les deux membres par $-1$.',
    SUBTRACT_FROM_BOTH_SIDES: `Soustraire $${stepChange}$ à chaque membre.`,
    ADD_TO_BOTH_SIDES: `Ajouter $${stepChange}$ à chaque membre`,
    MULTIPLY_TO_BOTH_SIDES: `Multiplier chaque membre par $${stepChange}$.`,
    DIVIDE_FROM_BOTH_SIDES: `Diviser chaque membre par $${stepChange}$.`,
    MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION: `Multiplier chaque membre par $${stepChange}$.`,
    SWAP_SIDES: 'Echanger les deux membres.',
    STATEMENT_IS_FALSE: 'L\'égalité est fausse.',
    STATEMENT_IS_TRUE: 'L\'égalité est vraie.',
    DISTRIBUTE: 'Distribution.',
    SIMPLIFY_RIGHT_SIDE: 'Simplifier le membre de droite.',
    SIMPLIFY_LEFT_SIDE: 'Simplifier le membre de gauche.',
    COLLECT_AND_COMBINE_LIKE_TERMS: 'Regrouper et réduire les termes de même nature.',
    SIMPLIFY_ARITHMETIC: 'Calcul arithmétique.',
    SIMPLIFY_FRACTION: 'Simplifier une fraction.',
    REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: 'Calculer la multiplication par $-1$.',
    REMOVE_ADDING_ZERO: 'Enlever des zéros.',
    CANCEL_MINUSES: 'Annuler les signes moins.',
    FIND_ROOTS: 'Trouver la (ou les) solution(s).',
    SIMPLIFY_SIGNS: 'Simplifier le signe.',
    MULTIPLY_BY_ZERO: 'Multiplication par zéro.',
    ADD_FRACTIONS: 'Additionner des fractions.',
    BREAK_UP_FRACTION: 'Séparer une fraction.',
    CANCEL_TERMS: 'Annuler les termes.',
    REMOVE_MULTIPLYING_BY_ONE: 'Retirer la multiplication par $1$.'
  }
  comments = Object.assign(defaultComments, comments)
  return (comments[changement] !== undefined) ? `\\text{${comments[changement].replaceAll('{stepChange}', `$${stepChange}$`)}}` : ''
}

/**
* @description Retourne toutes les étapes de résolution d'une équation ou d'une inéquation
* @param {Objet} params // Les paramètres (commentaires visibles)
* @param {string} equation // Une équation ou une inéquation
*/
export function resoudre (equation, params) {
  params = Object.assign({ comment: false, color: true, comments: {} }, params)
  const comparators = ['<=', '>=', '=', '<', '>']
  let comparator
  let sides
  for (let i = 0; i < comparators.length; i++) {
    const comparatorSearch = comparators[i]
    sides = equation.split(comparatorSearch)
    if (sides.length === 2) {
      comparator = comparatorSearch
    }
  }
  sides = equation.split(comparator)
  // Un bug de mathsteps ne permet pas de résoudre 2/x=2 d'où la ligne suivante qui permettait de le contourner
  // const equation0 = equation.replace(comparator, `+0${comparator}0+`)
  // A priori le traitement actuel n'occure plus ce bug (raison ?).
  let printEquation
  const steps = solveEquation(equation)
  const stepsNewEquation = []
  let repetition = 0
  steps.forEach(function (step, i) {
    const changement = step.changeType
    if (step.oldEquation !== null) {
      if (step.oldEquation.leftNode.toString() === step.newEquation.leftNode.toString() || step.oldEquation.rightNode.toString() === step.newEquation.rightNode.toString()) {
        if (changement !== 'REMOVE_ADDING_ZEROS') repetition = (repetition + 1) % 3
      } else {
        repetition = 0
      }
    }
    const oldLeftNode = step.oldEquation !== null ? toTex(step.oldEquation.leftNode) : ''
    let newLeftNode = toTex(step.newEquation.leftNode)
    const oldRightNode = step.oldEquation !== null ? toTex(step.oldEquation.rightNode) : ''
    let newRightNode = toTex(step.newEquation.rightNode)
    if (i === 0) {
      printEquation = `${oldLeftNode}${step.newEquation.comparator}${oldRightNode}`
      stepsNewEquation.push(
        String.raw`${oldLeftNode}
        &${step.oldEquation.comparator}${oldRightNode}`)
    }
    const color = repetition === 2 ? 'black' : 'red'
    if (params.color) newLeftNode = `{\\color{${color}}${newLeftNode.replace(oldLeftNode, `{\\color{black}${oldLeftNode}}`)}}`
    if (params.color) newRightNode = `{\\color{${color}}${newRightNode.replace(oldRightNode, `{\\color{black}${oldRightNode}}`)}}`
    const comment = commentStep(step, params.comments)
    if (repetition === 2) {
      repetition = 0
      stepsNewEquation.pop()
      if (changement !== 'REMOVE_ADDING_ZERO') {
        stepsNewEquation.push(
          String.raw`${newLeftNode}
          &${step.newEquation.comparator}${newRightNode}
          ${params.comment ? `&&${comment}` : ''}`
        )
      }
    } else {
      if (changement !== 'REMOVE_ADDING_ZERO') {
        stepsNewEquation.push(
          String.raw`${newLeftNode}
          &${step.newEquation.comparator}${newRightNode}
          ${params.comment ? `&&${comment}` : ''}`)
      }
    }
  })
  const texte = String.raw`Résoudre $${printEquation}$.`
  const texteCorr = String.raw`
  $\begin{aligned}
  ${stepsNewEquation.join('\\\\')}
  \end{aligned}$
  `
  const solution = toTex(steps[steps.length - 1].newEquation.ascii())
  return { texte: texte, texteCorr: texteCorr, equation: printEquation, solution: solution }
}

export function programmeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
  const rules = simplify.rules
  rules[13] = { l: 'n', r: 'n' } // Pour éviter la factorisation
  rules[14] = { l: 'n', r: 'n' } // Pour éviter la factorisation
  // rules.push({ l: 'n1+-n2', r: 'n1-n2' }) // Peut être utile pour des nombres négatifs
  const variables = {}
  variables.symbolsOp = Object.values(stepProg)
  const symbolsOp = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x']
  const op = ['+', '-', '*', '/', '^', '+', '+', '-', '-', '+', '-', '+', '-', '*', '/']
  const namesOp = [
    'add', 'subtract', 'multiply', 'divide',
    'pow',
    'add', 'add',
    'subtract', 'subtract',
    'add', 'subtract',
    'add', 'subtract',
    'multiply', 'divide']
  const namesOpInv = {
    add: 'subtract',
    subtract: 'add',
    multiply: 'divide',
    divide: 'multiply'
  }
  const symbolsOpInv = {
    add: '-',
    subtract: '+',
    multiply: '/',
    divide: '*'
  }
  const debutsPhrase = [
    'Ajouter ', 'Soustraire ', 'Multiplier par ', 'Diviser par ',
    'Elever au carré',
    'Ajouter le double du nombre choisi', 'Ajouter le triple du nombre choisi',
    'Soustraire le double du nombre choisi', 'Soustraire le triple du nombre choisi',
    'Ajouter le carré du nombre choisi', 'Soustraire le carré du nombre choisi',
    'Ajouter le nombre choisi', 'Soustraire le nombre choisi',
    'Multiplier par le nombre choisi', 'Diviser par le nombre choisi'
  ]
  const debutsPhraseInv = [
    'Soustraire ', 'Ajouter ', 'Diviser par ', 'Multiplier par ',
    'Prendre la racine carré',
    'Soustraire le double du nombre choisi', 'Soustraire le triple du nombre choisi',
    'Ajouter le double du nombre choisi', 'Ajouter le triple du nombre choisi',
    'Soustraire le carré du nombre choisi', 'Ajouter le carré du nombre choisi',
    'Soustraire le nombre choisi', 'Ajouter le nombre choisi',
    'Diviser par le nombre choisi', 'Multiplier par le nombre choisi'
  ]
  const nombresAutorises1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const nombresAutorises2 = [2, 3, 4, 5, 6, 7, 8, 9]
  variables.namesOp = Object.values(variables.symbolsOp)
  variables.debutsPhrase = Object.values(variables.symbolsOp)
  variables.debutsPhraseInv = Object.values(variables.symbolsOp)
  variables.op = Object.values(variables.symbolsOp)
  variables.namesOp.forEach(function (n, i) {
    variables.namesOp[i] = namesOp[symbolsOp.indexOf(n)]
  })
  variables.debutsPhrase.forEach(function (n, i) {
    variables.debutsPhrase[i] = debutsPhrase[symbolsOp.indexOf(n)]
  })
  variables.debutsPhraseInv.forEach(function (n, i) {
    variables.debutsPhraseInv[i] = debutsPhraseInv[symbolsOp.indexOf(n)]
  })
  variables.op.forEach(function (n, i) {
    variables.op[i] = op[symbolsOp.indexOf(n)]
  })
  const nodes = [new SymbolNode('x')]
  const nodesInv = []
  const phrases = ['Choisir un nombre.']
  const steps = ['x']
  const stepsNode = [new SymbolNode('x')]
  const stepsSimplified = ['x']
  const stepsInv = ['x']
  const stepsSimplifiedInv = ['x']
  const phrasesInv = ['On obtient le nombre choisi.']
  nombreChoisi = simplify(format(nombreChoisi))
  const resultatIntermediaire = [nombreChoisi]
  const calculIntermediaire = [nombreChoisi]
  let step
  const longueur = variables.symbolsOp.length + 1
  for (let i = 1; i < longueur; i++) {
    const choix = i - 1
    let symbolOp = variables.symbolsOp[choix]
    const nameOp = variables.namesOp[choix]
    const debutPhrase = variables.debutsPhrase[choix]
    const debutPhraseInv = variables.debutsPhraseInv[choix]
    const op = variables.op[choix]
    let stepPrint = ''
    switch (symbolOp) {
      case '/':
        step = new ConstantNode(math.pickRandom(nombresAutorises2))
        break
      case '*':
        step = new ConstantNode(math.pickRandom(nombresAutorises2))
        break
      case '^':
        step = new ConstantNode(2)
        break
      case '-':
        step = new ConstantNode(math.pickRandom(nombresAutorises1))
        break
      case '+':
        step = new ConstantNode(math.pickRandom(nombresAutorises2))
        break
      default :
        if (symbolOp[0] === '-') symbolOp = symbolOp.replace('-', '')
        step = parse(symbolOp)
    }
    stepsNode.push(step)
    if (step.isConstantNode) stepPrint = `$${step.toString()}$`
    let nodeSimplifie = simplify(nodes[i - 1].toString({ parenthesis: 'keep' }), rules)
    nodes.push(new OperatorNode(op, nameOp, [new ParenthesisNode(nodeSimplifie), step]))
    steps.push(toTex(nodes[i], { suppr1: false }, debug))
    nodeSimplifie = simplify(nodes[i].toString({ parenthesis: 'auto' }), rules)
    nodesInv.push(new OperatorNode(symbolsOpInv[nameOp], namesOpInv[nameOp], [new ParenthesisNode(nodeSimplifie), step]))
    stepsInv.push(toTex(nodesInv[i - 1], { suppr1: false }, debug))
    stepsSimplified.push(toTex(nodeSimplifie, { suppr1: false }, debug))
    const nodeSimplifieInv = parse(nodesInv[i - 1].toString({ parenthesis: 'auto' }))
    stepsSimplifiedInv.push(toTex(nodeSimplifieInv, { suppr1: false }, debug))
    phrases.push(debutPhrase + stepPrint)
    phrasesInv.push(debutPhraseInv + stepPrint)
    if (i === variables.symbolsOp.length) {
      steps.push(toTex(nodes[i], { suppr1: false }, debug))
      stepsSimplified.push(toTex(nodeSimplifie, { suppr1: false }, debug))
      stepsInv.push(toTex(nodesInv[i - 1], { suppr1: false }, debug))
      stepsSimplifiedInv.push(toTex(nodeSimplifie, { suppr1: false }, debug))
      phrases.push('Ecrire le résultat')
      // phrasesInv.push(debutPhraseInv + stepPrint)
      phrasesInv.push('Résultat du programme')
    }
    if (i === longueur) {
      calculIntermediaire.push(calculIntermediaire[i - 1])
      resultatIntermediaire.push(calculIntermediaire[i - 1])
    } else if (i > 0) {
      calculIntermediaire.push(new OperatorNode(variables.op[choix], nameOp, [resultatIntermediaire[i - 1], simplify(step, [{ l: 'n', r: 'n' }], { x: nombreChoisi })]))
      resultatIntermediaire.push(simplify(calculIntermediaire[i], { x: nombreChoisi }))
    }
  }
  const resultatIntermediaireInv = [resultatIntermediaire[longueur - 1]]
  const calculIntermediaireInv = [resultatIntermediaire[longueur - 1]]
  for (let i = 1; i < longueur; i++) {
    const choix = i - 1
    const nameOp = variables.namesOp[longueur - 2 - choix]
    if (i === longueur) {
      calculIntermediaireInv.push(calculIntermediaireInv[i])
      resultatIntermediaireInv.push(calculIntermediaireInv[i])
    } else if (i < longueur) {
      calculIntermediaireInv.push(new OperatorNode(symbolsOpInv[nameOp], namesOpInv[nameOp], [resultatIntermediaireInv[i - 1], simplify(stepsNode[longueur - i], [{ l: 'n', r: 'n' }], { x: nombreChoisi })]))
      resultatIntermediaireInv.push(simplify(calculIntermediaireInv[i], { x: nombreChoisi }))
    }
  }
  return { phrases: phrases, steps: steps, stepsSimplified: stepsSimplified, stepsInv: stepsInv, stepsSimplifiedInv: stepsSimplifiedInv, phrasesInv: phrasesInv, nodes: nodes, stepProg: stepProg, calculIntermediaire: calculIntermediaire, resultatIntermediaire: resultatIntermediaire, calculIntermediaireInv: calculIntermediaireInv, resultatIntermediaireInv: resultatIntermediaireInv }
}

export function traduireProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
  const programme = programmeCalcul(stepProg, nombreChoisi, debug)
  const stepsSolutionDetaillee = Object.values(programme.phrases) // Clone de phrases pour ne pas être touchée par les modifications
  stepsSolutionDetaillee.forEach(function (step, i) {
    stepsSolutionDetaillee[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}&'
    programme.phrases[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}'
    stepsSolutionDetaillee[i] += '&' + programme.steps[i]
    if (programme.steps[i] !== programme.stepsSimplified[i]) stepsSolutionDetaillee[i] += '&=' + programme.stepsSimplified[i]
  })
  let texte = String.raw` Voici un programme de calcul.
          <br>
          $\begin{aligned}
          ${programme.phrases.join('\\\\')}
          \end{aligned}$
          <br>
          Notons $x$ le nombre choisi.
          <br>
          Ecrire le résultat du programme de calcul en fonction de $x$.
          `
  const texteCorr = String.raw`Solution détaillée
          <br>
          $\begin{aligned}
          ${stepsSolutionDetaillee.join('\\\\')}
          \end{aligned}$`
  if (debug) texte = `${texte}<br>${texteCorr}`
  return { texte: texte, texteCorr: texteCorr }
}

export function ecrireProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
  const programme = programmeCalcul(stepProg, nombreChoisi, debug)
  const stepsSolutionDetaillee = Object.values(programme.phrases) // Clone de phrases pour ne pas être touchée par les modifications
  stepsSolutionDetaillee.forEach(function (step, i) {
    stepsSolutionDetaillee[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}&'
    programme.phrases[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}'
    stepsSolutionDetaillee[i] += '&' + programme.steps[i]
    if (programme.steps[i] !== programme.stepsSimplified[i]) stepsSolutionDetaillee[i] += '&=' + programme.stepsSimplified[i]
  })
  let texte = String.raw`Voici une expression. Ecrire le programme de calcul correspondant.
          <br>
          $${programme.stepsSimplified[programme.stepsSimplified.length - 1]}$
          `
  const texteCorr = String.raw`Solution détaillée
          <br>
          $\begin{aligned}
          ${stepsSolutionDetaillee.join('\\\\')}
          \end{aligned}$`
  if (debug) texte = `${texte}<br>${texteCorr}`
  return { texte: texte, texteCorr: texteCorr }
}

export function remonterProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
  const programme = programmeCalcul(stepProg, nombreChoisi, debug)
  const stepsSolutionDetaillee = Object.values(programme.phrases) // Clone de phrases pour ne pas être touchée par les modifications
  const stepsSolutionDetailleeInv = Object.values(programme.phrases) // Clone de phrases pour ne pas être touchée par les modifications
  const longueur = stepsSolutionDetaillee.length
  stepsSolutionDetaillee.forEach(function (step, i) {
    stepsSolutionDetaillee[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}&'
    programme.phrases[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}'
    stepsSolutionDetaillee[i] += '&' + programme.steps[i]
    stepsSolutionDetailleeInv[i] = '&\\bullet~\\text{' + programme.phrasesInv[i] + '}&'
    programme.phrasesInv[i] = '&\\bullet~\\text{' + programme.phrasesInv[i] + '}'
    if (i === 0) {
      stepsSolutionDetailleeInv[i] += '&' + toTex(programme.resultatIntermediaireInv[longueur - 2])
    } else if (i < stepsSolutionDetaillee.length - 1) {
      stepsSolutionDetailleeInv[i] += '&' + toTex(programme.calculIntermediaireInv[longueur - 1 - i]) + '&&=' + toTex(programme.resultatIntermediaireInv[longueur - 1 - i])
    } else {
      stepsSolutionDetailleeInv[i] += '&' + toTex(programme.resultatIntermediaireInv[0])
    }
  })
  nombreChoisi = simplify(format(nombreChoisi))
  let texte = String.raw`On obtient le nombre $${toTex(programme.resultatIntermediaireInv[0])}$ avec le programme suivant.
          <br>
          $\begin{aligned}
          ${programme.phrases.join('\\\\')}
          \end{aligned}$
          <br>
          Quel était le nombre choisi ?
          `
  const texteCorr = String.raw`Solution détaillée
          <br>
          $\begin{aligned}
          ${stepsSolutionDetailleeInv.reverse().join('\\\\')}
          \end{aligned}$
          <br>
          Le nombre choisi était donc $${toTex(nombreChoisi)}$.
          `
  if (debug) texte = `${texte}<br>${texteCorr}`
  return { texte: texte, texteCorr: texteCorr }
}

export function appliquerProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
  const programme = programmeCalcul(stepProg, nombreChoisi, debug)
  const stepsSolutionDetaillee = Object.values(programme.phrases) // Clone de phrases pour ne pas être touchée par les modifications
  stepsSolutionDetaillee.forEach(function (step, i) {
    stepsSolutionDetaillee[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}&'
    programme.phrases[i] = '&\\bullet~\\text{' + programme.phrases[i] + '}'
    // stepsSolutionDetaillee[i] += '&' + programme.steps[i]
    if (i === 0) {
      stepsSolutionDetaillee[i] += '&' + toTex(programme.resultatIntermediaire[0])
    } else if (i < stepsSolutionDetaillee.length - 1) {
      stepsSolutionDetaillee[i] += '&' + toTex(programme.calculIntermediaire[i]) + '&&=' + toTex(programme.resultatIntermediaire[i])
    } else {
      stepsSolutionDetaillee[i] += '&' + toTex(programme.resultatIntermediaire[i - 1])
    }
  })
  nombreChoisi = simplify(format(nombreChoisi))
  let texte = String.raw`Choisir le nombre $${toTex(nombreChoisi)}$ et effectuer le programme de calcul suivant.
          <br>
          $\begin{aligned}
          ${programme.phrases.join('\\\\')}
          \end{aligned}$
          <br>
          `
  const texteCorr = String.raw`Solution détaillée
          <br>
          $\begin{aligned}
          ${stepsSolutionDetaillee.join('\\\\')}
          \end{aligned}$`
  if (debug) texte = `${texte}<br>${texteCorr}`
  return { texte: texte, texteCorr: texteCorr }
}

export function calculExpression2 (expression = '4/3+5/6', factoriser = false, debug = false) {
  const steps = factoriser ? traverserEtapes(factor(expression)) : traverserEtapes(simplifyExpression(expression))
  if (debug) {
    console.log('* steps :')
    console.log(steps)
  }
  let repetition = 0
  const stepsExpression = []
  let expressionPrint = ''
  steps.forEach(function (step, i) {
    const changement = step.changeType
    if (step.oldNode !== null) {
      if (step.oldNode.toString() === step.newNode.toString()) {
        if (changement !== 'REMOVE_ADDING_ZEROS') repetition = (repetition + 1) % 2
      } else {
        repetition = 0
      }
    }
    if (debug) {
      console.log(changement)
      console.log(step.newNode.toString())
    }
    const oldNode = step.oldNode !== null ? toTex(step.oldNode, { suppr1: true }, debug) : ''
    const newNode = toTex(step.newNode, { suppr1: true }, debug)
    if (debug) {
      console.log(newNode.toString())
    }
    if (i === 0) {
      expressionPrint = `${oldNode}`
    }
    if (debug) console.log(newNode)
    const commentairesExclus = {
      REMOVE_ADDING_ZERO: String.raw`\text{Enlever des zéros}`,
      EXPAND_EXPONENT: String.raw`\text{Signification des exposants}`,
      MULTIPLY_COEFFICIENTS: String.raw`\text{Multiplier les coefficients}`,
      COLLECT_LIKE_TERMS: String.raw`\text{Regrouper les termes}`,
      MULTIPLY_DENOMINATORS: String.raw`\text{Calculer les dénominateurs}`,
      ADD_EXPONENT_OF_ONE: String.raw`\text{Ajouter l'exposant 1}`,
      COLLECT_POLYNOMIAL_EXPONENTS: String.raw`\text{Ajouter l'exposant 1}`,
      DISTRIBUTE: String.raw`\text{Distribution}`,
      ADD_COEFFICIENT_OF_ONE: String.raw`\text{Ajouter le coefficient }1`,
      GROUP_COEFFICIENTS: String.raw`\text{Regrouper les coefficients}`,
      REMOVE_MULTIPLYING_BY_ONE: String.raw`\text{Retirer la multiplication par } 1`
    }
    let commentaires = {
      COMMON_DENOMINATOR: String.raw`\text{Obtenir le même dénominateur}`,
      MULTIPLY_NUMERATORS: String.raw`\text{Calculer}`,
      COMBINE_NUMERATORS: String.raw`\text{Combiner les numérateurs}`,
      ADD_NUMERATORS: String.raw`\text{Additionner les numérateurs}`,
      FIND_GCD: String.raw`\text{Trouver le plus grand diviseur commun.}`,
      CANCEL_GCD: String.raw`\text{Simplifier par le PGCD.}`
    }
    if (debug) {
      commentaires = Object.assign(commentaires, {
        STATEMENT_IS_FALSE: String.raw`\text{L'égalité est fausse}`,
        STATEMENT_IS_TRUE: String.raw`\text{L'égalité est vraie}`,
        SIMPLIFY_RIGHT_SIDE: String.raw`\text{Simplifier le membre de droite}`,
        SIMPLIFY_LEFT_SIDE: String.raw`\text{Simplifier le membre de gauche}`,
        COLLECT_AND_COMBINE_LIKE_TERMS: String.raw`\text{Regrouper et réduire les termes de même nature}`,
        SIMPLIFY_ARITHMETIC: String.raw`\text{Calcul arithmétique}`,
        SIMPLIFY_FRACTION: String.raw`\text{Simplifier une fraction}`,
        REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: String.raw`\text{Calculer la multiplication par }-1`,
        REMOVE_ADDING_ZERO: String.raw`\text{Enlever des zéros}`,
        SWAP_SIDES: String.raw`\text{Echanger les deux membres}`,
        CANCEL_MINUSES: String.raw`\text{Annuler les signes moins}`,
        FIND_ROOTS: String.raw`\text{Trouver la (ou les) solution(s)}`,
        SIMPLIFY_SIGNS: String.raw`\text{Simplifier le signe}`,
        MULTIPLY_BY_ZERO: String.raw`\text{Multiplication par zéro}`,
        ADD_FRACTIONS: String.raw`\text{Additionner des fractions}`,
        BREAK_UP_FRACTION: String.raw`\text{Séparer une fraction}`,
        CANCEL_TERMS: String.raw`\text{Annuler les termes}`
      })
    }
    if (commentaires[changement] === undefined) commentaires[changement] = ''
    if (commentairesExclus[changement] === undefined) stepsExpression.push(String.raw`&=${newNode}`)
    if (debug) console.log('changement', commentaires[changement])
  })
  let texte = String.raw`Développer et réduire $${expressionPrint}$.`
  const texteCorr = String.raw`Simplifier $${expressionPrint}$.
  <br>
  $\begin{aligned}
  ${expressionPrint}${stepsExpression.slice(stepsExpression.length - 4, stepsExpression.length).join('\\\\')}
  \end{aligned}$
  `
  if (debug) texte = texteCorr
  return { texte: texte, texteCorr: texteCorr }
}
