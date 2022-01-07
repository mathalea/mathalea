import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { create, all, number, evaluate, SymbolNode, ConstantNode, OperatorNode, ParenthesisNode, simplify, parse, pickRandom } from 'mathjs'
import { solveEquation, simplifyExpression, factor } from 'mathsteps'
import { getNewChangeNodes } from '../../modules/Change.js'
import Algebrite from 'algebrite'

const math = create(all)
math.config({
  number: 'Fraction'
})
// eslint-disable-next-line no-debugger
debugger
export const titre = 'Calculs algébriques'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '02/01/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

function developperExpression (expression) {
  // const rules = simplify.rules
  // rules.push({l: 'n1*(n1+n2)'})
  return Algebrite.run(expression)
}

function toTex (node, debug = false) {
  if (debug) {
    console.log('node.toString({ parenthesis: \'keep\' })', node.toString({ parenthesis: 'keep' }))
    console.log('node', node)
  }
  node = parse(node.toString({ parenthesis: 'keep' })) // Convertir en objet mathjs les objets mathsteps
  node = node.transform(
    function (node, path, parent) {
      if (node.isOperatorNode && node.op === '/') { // Enlève les parenthèses au numérateur et dénominateur d'une fraction
        if (node.args[0].isParenthesisNode) node.args[0] = node.args[0].content
        if (node.args[1].isParenthesisNode) node.args[1] = node.args[1].content
      }
      if (node.isOperatorNode && node.op === '+') { // Enlève les parenthèses aux deux termes d'une addition
        if (node.args[0].isParenthesisNode) node.args[0] = node.args[0].content
        if (node.args[1].isParenthesisNode) node.args[1] = node.args[1].content
      }
      if (node.isOperatorNode && node.op === '-') { // Enlève les parenthèses au premier terme d'une soustraction et au second sous condition d'une /
        if (node.args[0].isParenthesisNode) node.args[0] = node.args[0].content
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
            (node.args[0].content.isOperatorNode && node.args[0].content.op === '/') // ou alors une division
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
              node.args[1].content.op === '/'
            )
          )) {
          node.args[1] = node.args[1].content
          node.implicit = false
        }
        /* if (node.args[0].isSymbolNode && node.args[1].isSymbolNode) {
          node.implicit = true
        } */
      }
      return node
    }
  )
  node = node.transform(function (node, path, parent) { // On commence par transformer les +- en -
    switch (node.type) {
      case 'OperatorNode':
        switch (node.op) {
          case '+':
            if (node.args[1].op === '-') {
              return new OperatorNode('-', 'subtract', [node.args[0], node.args[1].args[0]])
            } else if (node.args[1].op === '*' && node.args[1].args[0].op === '-') {
              const node2 = new OperatorNode('*', 'multiply', [node.args[1].args[0].args[0], node.args[1].args[1]])
              return new OperatorNode('-', 'subtract', [node.args[0], node2])
            } else if (node.args[1].op === '/') {
              if (node.args[1].args[0].isOperatorNode && node.args[1].args[0].fn === 'unaryMinus') {
                if (!(node.args[1].args[1].isOperatorNode) || (node.args[1].args[1].isOperatorNode && node.args[1].args[1].fn !== 'unaryMinus')) {
                  const frac = new OperatorNode('/', 'divide', [node.args[1].args[0].args[0], node.args[1].args[1]])
                  return new OperatorNode('-', 'subtract', [node.args[0], frac])
                } else return node
              } else return node
            } else return node
          case '/':
            if (parent === null || parent.isParenthesisNode || (parent.op === '*')) {
              if (node.args[0].isOperatorNode && node.args[0].fn === 'unaryMinus') {
                if (!(node.args[1].isOperatorNode) || (node.args[1].isOperatorNode && node.args[1].fn !== 'unaryMinus')) {
                  const frac = new OperatorNode('/', 'divide', [node.args[0].args[0], node.args[1]])
                  return new OperatorNode('-', 'unaryMinus', [frac])
                } else return node
              } else return node
            } else return node
          default:
            return node
        }
      default:
        return node
    }
  })
  node = node.transform(function (node, path, parent) {
    if (debug) {
      console.log('********', node.toString(), '********\n', node)
      console.log(' * node.fn : ', node.fn)
      if (parent !== null) console.log(' * parent.op : ', parent.op)
      if (node.args !== undefined) console.log(' * node.args[0].type : ', node.args[0].type)
      if (node.args !== undefined && node.args.length > 1) console.log(' * node.args[1].type : ', node.args[1].type)
      if (node.args !== undefined) console.log(' * node.args[0].op : ', node.args[0].op)
      if (node.args !== undefined && node.args.length > 1) console.log(' * node.args[1].op : ', node.args[1].op)
    }
    switch (node.type) {
      case 'OperatorNode':
        switch (node.op) {
          case '*': // Les multiplications deviennent implicites
            if (node.args[1].fn === 'unaryMinus') { // pour obtenir \times(-1)
              node.args[1] = new ParenthesisNode(node.args[1])
              return node
            } else if (
              !(
                node.args[1].isConstantNode ||
                (node.args[1].isOperatorNode && node.args[1].op === '/') ||
                (
                  node.args[1].isSymbolNode &&
                  node.args[0].isOperatorNode &&
                  node.args[0].args[1] !== undefined &&
                  node.args[0].args[1].isSymbolNode
                ) ||
                (
                  node.args[0].isSymbolNode &&
                  node.args[1].isSymbolNode
                )
              )) {
              node.implicit = true
              return node
            } else return node
          case '+':
            if (node.args[1].op === '-') {
              return new OperatorNode('-', 'subtract', [node.args[0], node.args[1].args[0]])
            } else if (node.args[1].op === '/') {
              if (node.args[1].args[0].isOperatorNode && node.args[1].args[0].fn === 'unaryMinus') {
                if (!(node.args[1].args[1].isOperatorNode) || (node.args[1].args[1].isOperatorNode && node.args[1].args[1].fn !== 'unaryMinus')) {
                  const frac = new OperatorNode('/', 'divide', [node.args[1].args[0].args[0], node.args[1].args[1]])
                  return new OperatorNode('-', 'subtract', [node.args[0], frac])
                } else return node
              } else return node
            } else return node
          case '/':
            if (parent === null || parent.isParenthesisNode || (parent.op === '*')) {
              if (node.args[0].isOperatorNode && node.args[0].fn === 'unaryMinus') {
                if (!(node.args[1].isOperatorNode) || (node.args[1].isOperatorNode && node.args[1].fn !== 'unaryMinus')) {
                  const frac = new OperatorNode('/', 'divide', [node.args[0].args[0], node.args[1]])
                  return new OperatorNode('-', 'unaryMinus', [frac])
                } else return node
              } else return node
            } else return node
          default:
            return node
        }
      case 'ConstantNode':
        return node
      case 'SymbolNode':
        return node
      default:
        return node
    }
  })
  if (debug) {
    console.log('***********RESULTATS***********\n node.toString() : ', node.toString())
    console.log('node.toTex() : ', node.toTex())
    console.log('node.toTex() avec formattage : ', node.toTex({ parenthesis: 'auto' }).replaceAll('\\cdot', '\\times'))
    console.log('node.toTex() : ', node)
  }
  return node.toTex({ parenthesis: 'keep' }).replaceAll('\\cdot', '\\times').replaceAll('.', '{,}').replaceAll('\\frac', '\\dfrac')
}

function aleaExpressionLitterale (expression = '(a*x+b)*(c*x-d)', assignations = { a: 1, b: 2, c: 3, d: -6 }, debug = false) {
  // Ne pas oublier le signe de la multiplication
  return simplify(expression, [{ l: '1*n', r: 'n' }, { l: '-1*n', r: '-n' }, { l: 'n/1', r: 'n' }, { l: 'c/c', r: '1' }, { l: '0*v', r: '0' }, { l: '0+v', r: 'v' }], assignations)
}

function aleaAssignationVariables (variables = { a: false, b: false, c: true, d: 'fraction(a,10)+fraction(b,100)', test: 'b!=0 and b>a>c' }, debug = false) {
  const assignations = {}
  let cpt = 0
  let test = true
  do {
    cpt++
    for (const v of Object.keys(variables)) {
      if (typeof variables[v] === 'boolean') {
        assignations[v] = evaluate('(pickRandom([-1,1]))^(n)*randomInt(1,10)', { n: variables[v] })
      } else if (v !== 'test') {
        assignations[v] = evaluate(variables[v], assignations)
      }
    }
    if (variables.test !== undefined) test = evaluate(variables.test, assignations)
  } while (!test && cpt < 1000)
  if (cpt === 1000) window.notify('Attention ! 1000 essais dépassés.\n Trop de contraintes.\n Le résultat ne vérifiera pas le test.')
  return assignations
}

function traverserEtapes (steps, result = []) {
  steps.forEach(function (step, i) {
    if (step.substeps.length === 0) result.push(step)
    return traverserEtapes(step.substeps, result)
  })
  return result
}

function calculExpression (expression = '4/3+5/6', factoriser = false, debug = false) {
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
    const oldNode = step.oldNode !== null ? toTex(step.oldNode) : ''
    const newNode = toTex(step.newNode)
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
  let texte = String.raw`Simplifier $${expressionPrint}$.`
  const texteCorr = String.raw`Simplifier $${expressionPrint}$.
  <br>
  $\begin{aligned}
  ${expressionPrint}${stepsExpression.join('\\\\')}
  \end{aligned}$
  `
  if (debug) texte = texteCorr
  return { texte: texte, texteCorr: texteCorr }
}

function aleaEquation (equation = 'a*x+b=c*x-d', variables = { a: false, b: false, c: false, d: false, test: 'a>b or true' }, debug = false) { // Ne pas oublier le signe de la multiplication
  const comparators = ['<=', '>=', '=', '<', '>']
  const assignations = aleaAssignationVariables(variables, debug)
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
  const leftNode = aleaExpressionLitterale(sides[0], assignations, debug).toString()
  const rightNode = aleaExpressionLitterale(sides[1], assignations, debug).toString()
  if (debug) {
    console.log('Equation à résoudre : ', `${leftNode}${comparator}${rightNode}`)
  }
  return `${leftNode}${comparator}${rightNode}`
}

function resoudreEquation (equation = '5(x-7)=3(x+1)', debug = false) {
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
    /* const oldLeftNode = step.oldEquation !== null ? toTex(parse(step.oldEquation.leftNode.toString())) : ''
    let newLeftNode = toTex(parse(step.newEquation.leftNode.toString()))
    const oldRightNode = step.oldEquation !== null ? toTex(parse(step.oldEquation.rightNode.toString())) : ''
    let newRightNode = toTex(parse(step.newEquation.rightNode.toString())) */
    const oldLeftNode = step.oldEquation !== null ? toTex(step.oldEquation.leftNode) : ''
    let newLeftNode = toTex(step.newEquation.leftNode)
    const oldRightNode = step.oldEquation !== null ? toTex(step.oldEquation.rightNode) : ''
    let newRightNode = toTex(step.newEquation.rightNode)
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
  let texte = String.raw`Résoudre $${equationPrint}$.`
  const texteCorr = String.raw`Résoudre $${equationPrint}$.
  <br>
  $\begin{aligned}
  ${stepsNewEquation.join('\\\\')}
  \end{aligned}$
  `
  if (debug) texte = texteCorr
  return { texte: texte, texteCorr: texteCorr }
}

function programmeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
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
  nombreChoisi = simplify(math.format(nombreChoisi))
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
        step = new ConstantNode(pickRandom(nombresAutorises2))
        break
      case '*':
        step = new ConstantNode(pickRandom(nombresAutorises2))
        break
      case '^':
        step = new ConstantNode(2)
        break
      case '-':
        step = new ConstantNode(pickRandom(nombresAutorises1))
        break
      case '+':
        step = new ConstantNode(pickRandom(nombresAutorises2))
        break
      default :
        if (symbolOp[0] === '-') symbolOp = symbolOp.replace('-', '')
        step = parse(symbolOp)
    }
    stepsNode.push(step)
    if (step.isConstantNode) stepPrint = `$${step.toString()}$`
    let nodeSimplifie = simplify(nodes[i - 1].toString({ parenthesis: 'keep' }), rules)
    nodes.push(new OperatorNode(op, nameOp, [new ParenthesisNode(nodeSimplifie), step]))
    steps.push(toTex(nodes[i], debug))
    nodeSimplifie = simplify(nodes[i].toString({ parenthesis: 'auto' }), rules)
    nodesInv.push(new OperatorNode(symbolsOpInv[nameOp], namesOpInv[nameOp], [new ParenthesisNode(nodeSimplifie), step]))
    stepsInv.push(toTex(nodesInv[i - 1], debug))
    stepsSimplified.push(toTex(nodeSimplifie, debug))
    const nodeSimplifieInv = parse(nodesInv[i - 1].toString({ parenthesis: 'auto' }))
    stepsSimplifiedInv.push(toTex(nodeSimplifieInv, debug))
    phrases.push(debutPhrase + stepPrint)
    phrasesInv.push(debutPhraseInv + stepPrint)
    if (i === variables.symbolsOp.length) {
      steps.push(toTex(nodes[i], debug))
      stepsSimplified.push(toTex(nodeSimplifie, debug))
      stepsInv.push(toTex(nodesInv[i - 1], debug))
      stepsSimplifiedInv.push(toTex(nodeSimplifie, debug))
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

function traduireProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
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

function ecrireProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
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

function remonterProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
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
  nombreChoisi = simplify(math.format(nombreChoisi))
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

function appliquerProgrammeCalcul (stepProg = ['+', '-', '*', '/', '^2', '2*x', '3*x', '-2*x', '-3*x', 'x^2', '-x^2', 'x', '-x', '*x', '/x'], nombreChoisi, debug = false) {
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
  nombreChoisi = simplify(math.format(nombreChoisi))
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

/**
 * Résoudre des équations du premier degré
 * @author Frédéric PIOU
 * Référence
*/

export default function equationsProgression () {
  Exercice.call(this)
  const formulaire = [
    '0 : Mélange des types de questions',
    '1 : Programme de calcul : 3 étapes, quatre opérations, cube, carré.',
    '2 : Programme de calcul : 4 étapes, quatre opérations, cube, carré.',
    '3 : Programme de calcul : 5 étapes, quatre opérations, cube, carré.',
    '4 : Programme de calcul : 5 étapes, quatre opérations.',
    '5 : Résoudre une équation',
    '6 : Résoudre une équation',
    '7 : Résoudre une équation',
    '8 : Résoudre une équation',
    '9 : Résoudre une équation',
    '10 : Résoudre une équation',
    '11 : Résoudre une équation',
    '12 : Résoudre une équation',
    '13 : Résoudre une équation',
    '14 : Résoudre une équation',
    '15 : Résoudre une équation',
    '16 : Résoudre une équation',
    '17 : Résoudre une équation',
    '18 : Résoudre une équation',
    '19 : Calculer',
    '20 : Calculer',
    '21 : Calculer',
    '22 : Calculer',
    '23 : Calculer',
    '24 : Calculer',
    '25 : Calculer',
    '26 : Calculer',
    '27 : Calculer',
    '28 : Calculer',
    '29 : Calculer',
    '30 : Calculer',
    '31 : Calculer',
    '32 : Calculer',
    '33 : Calculer',
    '34 : Calculer',
    '35 : Calculer',
    '36 : Calculer',
    '37 : Calculer',
    '38 : Calculer',
    '39 : Calculer',
    '40 : Calculer',
    '41 : Calculer',
    '42 : Calculer',
    '43 : Calculer',
    '44 : Calculer',
    '45 : Calculer',
    '46 : Calculer',
    '47 : Calculer',
    '48 : Calculer',
    '49 : Calculer',
    '50 : Calculer',
    '51 : Calculer',
    '52 : Calculer',
    '53 : Calculer',
    '54 : Calculer',
    '55 : Calculer',
    '56 : Calculer',
    '57 : Calculer',
    '58 : Calculer',
    '59 : Calculer',
    '60 : Calculer',
    '61 : Calculer',
    '62 : Calculer',
    '63 : Calculer',
    '64 : Calculer'
  ]
  this.nbQuestions = 0
  this.besoinFormulaireNumerique = [
    'Type de question', this.nbQuestions, formulaire.join('\n')
  ]
  this.consigne = ''
  this.nbCols = 0
  this.nbColsCorr = 0
  this.tailleDiaporama = 1
  this.video = ''
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = true
  context.isHtml ? (this.spacing = 2.5) : (this.spacing = 1.5)
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.sup = 0 // Type d'exercice
  this.nouvelleVersion = function (numeroExercice, genDebug = false) {
    this.nbQuestions = this.NbQuestions > 0 ? this.nbQuestions : this.sup !== 0 ? 1 : formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 100;) { // Boucle principale où i+1 correspond au numéro de la question
      nquestion = this.sup === 0 ? cpt + 1 : this.sup
      if (genDebug) {
        console.log(`
        ********************************
        Exercice ${i + 1} Case ${nquestion}
        ********************************`)
      }
      switch (nquestion) {
        case 1: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), genDebug)
          break
        }
        case 2: {
          exercice = traduireProgrammeCalcul(['*', '+'], parse(1), genDebug)
          break
        }
        case 3: {
          exercice = traduireProgrammeCalcul(['+', '*', '-'], parse(1), genDebug)
          break
        }
        case 4: {
          exercice = traduireProgrammeCalcul(['-', '*', '2*x'], parse(1), genDebug)
          break
        }
        case 5: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { // Ici le type de l'équation
            a: false, // a est un nombre entier compris entre 1 et 9 (1 et 9 compris)
            b: false, // idem
            c: false,
            d: false, // aleaEquation va choisir au hasard les nombres a, b, c et d
            test: 'a!=c' // mais elle vérfie que a est différent de c (1000 essais autorisés)
          }), genDebug)
          break
        }
        case 6: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: false,
            b: true, // Si c'est true alors le nombre pourra être négatif (mais pas nul)
            c: false,
            d: true, // C'est toujours un nombre entier compris entre -9 et 9 cette fois-ci (non nul)
            test: 'a!=c'
          }), genDebug)
          break
        }
        case 7: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', {
            a: true,
            b: true,
            c: false,
            d: true,
            test: 'a!=c'
          }), genDebug)
          break
        }
        case 8: {
          exercice = resoudreEquation(aleaEquation('x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'a!= 1 and abs(b)%c!=0' // Ici on fait en sorte que b/c ne soit pas simplifiable en utilisant le reste
          }), genDebug)
          break
        }
        case 9: {
          exercice = resoudreEquation(aleaEquation('-x/a=b/c', {
            a: false,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), genDebug)
          break
        }
        case 10: {
          exercice = resoudreEquation(aleaEquation('a/x=b/c', {
            a: true,
            b: true,
            c: false,
            test: 'abs(b)%c!=0'
          }), genDebug)
          break
        }
        case 11: {
          exercice = resoudreEquation(aleaEquation('(a*x+b)/c=d/e', {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            test: 'c>1 and a%c!=0 and abs(d)%e!=0'
          }), genDebug)
          break
        }
        case 12: {
          exercice = resoudreEquation(aleaEquation('a*x+b/c=d/e', {
            a: true,
            b: true,
            c: false,
            d: true,
            e: false,
            test: 'c>1 and abs(d)%e!=0 and abs(b)%c!=0'
          }), genDebug)
          break
        }
        case 13: {
          exercice = resoudreEquation(aleaEquation('a/(b*x+c)=d/e', {
            a: true,
            b: true,
            c: true,
            d: true,
            e: false,
            test: 'abs(d)%e!=0'
          }), genDebug)
          break
        }
        case 14: {
          exercice = resoudreEquation(aleaEquation('A*x+B=C*x+D', {
            s: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // les calculs avec fraction donnent des valeurs exactes
            a: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // même si on les additionnent
            b: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', // c'est un avantage
            c: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)', //
            A: 'a+b', // on construit les coefficient de l'équation
            B: 'c', // pour que la solution
            C: 'b', // soit le nombre s (qui est décimal)
            D: 'a*s+c',
            test: 'A!=0 and D!=0' // Le test permet d'éliminer les cas particuliers
          }), genDebug)
          break
        }
        case 15: {
          exercice = resoudreEquation(aleaEquation('a*(b*x+c)=d*x+e', {
            a: true,
            b: true,
            c: true,
            d: true,
            e: false,
            test: 'a!=1 and a*b!=d' // Pour qu'il y ait une solution
          }), genDebug)
          break
        }
        case 16: {
          exercice = resoudreEquation(aleaEquation('a*x+b*y=c', { // On résous l'équation en x
            a: true, // On aura donc y en fonction de x
            b: true,
            c: true
          }), genDebug)
          break
        }
        case 17: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b=a*x*(x+c)', {
            a: true, // On s'arrange pour qu'on puisse
            b: true, // se ramener à une équation
            c: true // du premier degré
          }), genDebug)
          break
        }
        case 18: {
          exercice = resoudreEquation(aleaEquation('x/a=y', {
            a: false,
            test: 'a!=1'
          }), genDebug)
          break
        }
        case 19: {
          exercice = calculExpression(aleaExpressionLitterale('a/b+c/d',
            aleaAssignationVariables({
              a: false,
              b: 'randomInt(2,100)',
              c: false,
              d: 'randomInt(2,100)',
              test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
            })).toString(), false, genDebug)
          break
        }
        case 20: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaAssignationVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)'
          })).toString(), false, genDebug)
          break
        }
        case 21: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x-c*x', aleaAssignationVariables({
            a: 'randomInt(2,100)',
            b: 'randomInt(2,100)',
            c: 'randomInt(2,100)',
            test: 'a+b>=c'
          })).toString(), false, genDebug)
          break
        }
        case 22: {
          exercice = calculExpression(aleaExpressionLitterale('a/b*x+c/d*x', aleaAssignationVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: '(d%b==0 or b%d==0) and gcd(a,b)==1 and gcd(c,d)==1'
            // On souhaite que l'une des deux fractions soit simplifiable
          })).toString(), false, genDebug)
          break
        }
        case 23: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c*x^2', aleaAssignationVariables({
            a: 'randomInt(1,20)',
            b: 'randomInt(1,20)',
            c: 'randomInt(1,20)'
          })).toString(), false, genDebug)
          break
        }
        case 24: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c', aleaAssignationVariables({
            a: 'randomInt(1,15)^2',
            c: 'randomInt(1,15)^2',
            b: '2*sqrt(a)*sqrt(c)'
          })).toString(), true, genDebug)
          break
        }
        case 25: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b*x+c', aleaAssignationVariables({
            a: 'randomInt(1,15)^2',
            c: 'randomInt(1,15)^2',
            b: '2*sqrt(a)*sqrt(c)'
          })).toString(), true, genDebug)
          break
        }
        case 26: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b', aleaAssignationVariables({
            a: 'randomInt(1,15)^2',
            b: 'randomInt(1,15)^2'
          })).toString(), true, genDebug)
          break
        }
        case 27: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), genDebug)
          break
        }
        case 28: {
          exercice = ecrireProgrammeCalcul(['-', '*', '2*x'], parse(1), genDebug)
          break
        }
        case 29: {
          exercice = calculExpression(aleaExpressionLitterale('a+c/d', aleaAssignationVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString(), false, genDebug)
          break
        }
        case 30: {
          exercice = calculExpression(aleaExpressionLitterale('a-c/d', aleaAssignationVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0 and a-c/d>0'
          })).toString(), false, genDebug)
          break
        }
        case 31: {
          exercice = calculExpression(aleaExpressionLitterale('a/b-c/d', aleaAssignationVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString(), false, genDebug)
          break
        }
        case 32: {
          exercice = resoudreEquation(aleaEquation('a*x+b>c*x+d', { // On résoud maintenant une inéquation
            a: false,
            b: false,
            c: false,
            d: false,
            test: 'a!=c'
          }), genDebug)
          break
        }
        case 33: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b*x+c=0', { // On résoud une équation du second degré
            s: true,
            t: true,
            a: true,
            b: 'a*(-s-t)', // les racines sont des entiers (seuls gérés par mathsteps)
            c: 'a*s*t'
          }, genDebug), genDebug)
          break
        }
        case 34: {
          exercice = traduireProgrammeCalcul(['+', '*'], parse(1), genDebug)
          break
        }
        case 35: {
          exercice = ecrireProgrammeCalcul(['*', '+'], parse(1), genDebug)
          break
        }
        case 36: {
          exercice = traduireProgrammeCalcul(['*', '2*x'], parse(1), genDebug)
          break
        }
        case 37: {
          exercice = traduireProgrammeCalcul(['-', '-2*x'], parse(1), genDebug)
          break
        }
        case 38: {
          exercice = traduireProgrammeCalcul(['-', '/', 'x'], parse(1), genDebug)
          break
        }
        case 39: {
          exercice = appliquerProgrammeCalcul(
            ['-', '/', 'x', '*', 'x^2'],
            aleaAssignationVariables(
              {
                a: true,
                b: false,
                c: 'fraction(a,b)',
                test: 'a%b!=0'
              }).c, genDebug)
          break
        }
        case 40: {
          exercice = remonterProgrammeCalcul(
            ['-', '/', '*', '+'],
            aleaAssignationVariables(
              {
                a: true,
                b: false,
                c: 'fraction(a,b)',
                test: 'a%b!=0'
              }).c, genDebug)
          break
        }
        case 41: {
          exercice = remonterProgrammeCalcul(
            ['-'],
            aleaAssignationVariables(
              {
                a: false
              }).a, genDebug)
          break
        }
        case 42: {
          exercice = remonterProgrammeCalcul(
            ['-', '*'],
            aleaAssignationVariables(
              {
                a: false
              }).a, genDebug)
          break
        }
        case 43: {
          exercice = calculExpression(aleaExpressionLitterale('(a/b)*(c/d)', aleaAssignationVariables({
            a: false,
            b: 'randomInt(2,100)',
            c: false,
            d: 'randomInt(2,100)',
            test: 'gcd(a,b)==1 and gcd(c,d)==1 and d!=b and (d%b==0 or b%d==0) and a/b-c/d>0'
          })).toString(), false, genDebug)
          break
        }
        case 44: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaAssignationVariables({
            a: 'round(random(1,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a+b>0'
          })).toString(), false, genDebug)
          break
        }
        case 45: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b', aleaAssignationVariables({
            a: false,
            b: false,
            test: 'a>1 and b>1'
          })).toString(), false, genDebug)
          break
        }
        case 46: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaAssignationVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString(), false, genDebug)
          break
        }
        case 47: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaAssignationVariables({
            a: false,
            b: false,
            c: true,
            test: 'b>1 and a>1 and a*b+c>0'
          })).toString(), false, genDebug)
          break
        }
        case 48: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x*b', aleaAssignationVariables({
            a: false,
            b: false,
            test: 'b>1 and a>1'
          })).toString(), false, genDebug)
          break
        }
        case 49: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x+b*x^2', aleaAssignationVariables({
            a: false,
            b: true,
            test: 'a>1 and a+b>0'
          })).toString(), false, genDebug)
          break
        }
        case 50: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b*x*c*x+d*x^2', aleaAssignationVariables({
            a: false,
            b: false,
            c: false,
            d: true,
            test: 'a>1 and b>1 and c>1'
          })).toString(), false, genDebug)
          break
        }
        case 51: {
          exercice = traduireProgrammeCalcul(['+', '/', '-x^2'], parse(1), genDebug)
          break
        }
        case 52: {
          exercice = traduireProgrammeCalcul(['*', '-x', '/'], parse(1), genDebug)
          break
        }
        case 53: {
          exercice = traduireProgrammeCalcul(['/', '-x', '*'], parse(1), genDebug)
          break
        }
        case 54: {
          exercice = appliquerProgrammeCalcul(['+', '*', '-'], aleaAssignationVariables(
            {
              a: true
            }).a, genDebug)
          break
        }
        case 55: {
          exercice = remonterProgrammeCalcul(['*', '-', '/'], aleaAssignationVariables(
            {
              a: true
            }).a, genDebug)
          break
        }
        case 56: {
          exercice = remonterProgrammeCalcul(['+', '*', '-'], aleaAssignationVariables(
            {
              a: true
            }).a, genDebug)
          break
        }
        case 57: {
          exercice = calculExpression(aleaExpressionLitterale('a/b+c/d',
            aleaAssignationVariables({
              a: true,
              b: 'randomInt(2,100)',
              c: true,
              d: 'randomInt(2,100)',
              test: '(d%b==0 or b%d==0) and gcd(abs(a),b)==1 and gcd(abs(c),d)==1'
            })).toString(), false, genDebug)
          break
        }
        case 58: {
          exercice = calculExpression(aleaExpressionLitterale('a+c/d', aleaAssignationVariables({
            a: true,
            b: 'randomInt(2,100)',
            c: true,
            d: 'randomInt(2,100)',
            test: 'c!=d and c%d!=0'
          })).toString(), false, genDebug)
          break
        }
        case 59: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaAssignationVariables({
            a: 'round(random(-10,10),1)',
            b: 'round(random(-10,10),1)',
            test: 'b!=0 and a!=0'
          })).toString(), false, genDebug)
          break
        }
        case 60: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b', aleaAssignationVariables({
            a: true,
            b: true,
            test: 'a!= 1 and b!=1'
          })).toString(), false, genDebug)
          break
        }
        case 61: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b+c*x', aleaAssignationVariables({
            a: true,
            b: true,
            c: true,
            test: 'a!= 1 and b!=1'
          })).toString(), false, genDebug)
          break
        }
        case 62: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x*b', aleaAssignationVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString(), false, genDebug)
          break
        }
        case 63: {
          exercice = calculExpression(aleaExpressionLitterale('x*a*x+b*x^2', aleaAssignationVariables({
            a: true,
            b: true,
            test: 'a!=1 and b!=1'
          })).toString(), false, genDebug)
          break
        }
        case 64: {
          exercice = calculExpression(aleaExpressionLitterale('a*x*b*x*c*x+d*x^2', aleaAssignationVariables({
            a: true,
            b: true,
            c: true,
            d: true,
            test: 'a!= 1 and b!=1 and c!=1'
          })).toString(), false, genDebug)
          break
        }
      }
      if (this.questionJamaisPosee(i, nquestion)) {
        this.listeQuestions.push(exercice.texte)
        this.listeCorrections.push(exercice.texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
