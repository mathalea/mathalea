import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { number, evaluate, randomInt, SymbolNode, ConstantNode, OperatorNode, ParenthesisNode, simplify, parse, pickRandom } from 'mathjs'
import { solveEquation, simplifyExpression, factor } from 'mathsteps'
import { getNewChangeNodes } from '../../modules/Change.js'
// const math = require('mathjs')
// eslint-disable-next-line no-debugger
// debugger
export const titre = 'Calculs algébriques'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/01/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

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
        if (node.args[1].isParenthesisNode && (!node.args[1].content.isOperatorNode || (node.args[1].content.isOperatorNode && node.args[1].content.op === '/'))) {
          node.args[1] = node.args[1].content
          node.implicit = false
        }
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
            } else if (!(node.args[1].isConstantNode || (node.args[1].isOperatorNode && node.args[1].op === '/'))) {
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

function aleaExpressionLitterale (expression = '(a*x+b)*(c*x-d)', assignations = { a: 1, b: 2, c: 3, d: -6 }) {
  // Ne pas oublier le signe de la multiplication
  return simplify(expression, [{ l: '1*n', r: 'n' }, { l: '-1*n', r: '-n' }, { l: 'n/1', r: 'n' }, { l: 'c/c', r: '1' }], assignations)
}

function aleaAssignationVariables (variables = { a: false, b: false, c: true, d: 'fraction(a,10)+fraction(b,100)', test: 'b!=0 and b>a>c' }) {
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
  if (cpt === 1000) console.log('Erreur : Plus de 1000 essais pour le test !')
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
    // const color = repetition === 1 ? 'black' : 'red'
    // newNode = `{\\color{${color}}${newNode.replace(oldNode, `{\\color{black}${oldNode}}`)}}`
    if (debug) console.log(newNode)
    // const stepChange = getNewChangeNodes(step).length > 0 ? toTex(parse(getNewChangeNodes(step)[0].toString(), { parenthesis: 'auto' })) : ''
    let commentaires = {
      COMMON_DENOMINATOR: String.raw`\text{Obtenir le même dénominateur}`,
      MULTIPLY_NUMERATORS: String.raw`\text{Calculer}`,
      COMBINE_NUMERATORS: String.raw`\text{Combiner les numérateurs}`,
      ADD_NUMERATORS: String.raw`\text{Additionner les numérateurs}`,
      COLLECT_LIKE_TERMS: String.raw`\text{Regrouper les termes}`,
      ADD_COEFFICIENT_OF_ONE: String.raw`\text{Ajouter le coefficient }1`,
      GROUP_COEFFICIENTS: String.raw`\text{Regrouper les coefficients}`,
      FIND_GCD: String.raw`\text{Trouver le plus grand diviseur commun.}`,
      CANCEL_GCD: String.raw`\text{Simplifier par le PGCD.}`
    }
    if (debug) {
      commentaires = Object.assign(commentaires, {
        MULTIPLY_DENOMINATORS: String.raw`\text{Calculer les dénominateurs}`,
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
    if (changement !== 'MULTIPLY_DENOMINATORS') stepsExpression.push(String.raw`&=${newNode}&&${commentaires[changement]}`)
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

function aleaEquation (equation = 'a*x+b=c*x-d', variables = { a: false, b: false, c: false, d: false, test: 'a>b or true' }) { // Ne pas oublier le signe de la multiplication
  const comparators = ['<=', '>=', '=', '<', '>']
  const assignations = aleaAssignationVariables(variables)
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
  const leftNode = aleaExpressionLitterale(sides[0], assignations).toString()
  const rightNode = aleaExpressionLitterale(sides[1], assignations).toString()
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

function programmeCalcul (variables = { nbEtapes: 3, symbolsOp: ['+', '-', '*', '/', '^'], limitPow: 3 }, debug = false) {
  if (variables.nbEtapes === undefined) variables.nbEtapes = 3
  if (variables.symbolsOp === undefined) variables.symbolsOp = ['+', '-', '*', '/', '^']
  if (variables.limitPow === undefined) variables.limitPow = 3
  const nombresAutorises1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const nombresAutorises2 = [2, 3, 4, 5, 6, 7, 8, 9]
  const namesOp = []
  const debutsPhrase = []
  for (const n of variables.symbolsOp) {
    namesOp.push(n.replace('+', 'add').replace('-', 'subtract').replace('*', 'multiply').replace('/', 'divide').replace('^', 'pow'))
    debutsPhrase.push(n.replace('+', 'Ajouter ').replace('-', 'Soustraire ').replace('*', 'Multiplier par ').replace('/', 'Diviser par ').replace('^', 'Elever au '))
  }
  const nodes = [new SymbolNode('x')]
  const phrases = ['Choisir un nombre.']
  const steps = ['x']
  const stepsSimplified = ['x']
  let step
  for (let i = 1; i < variables.nbEtapes; i++) {
    const symbolOp = pickRandom(variables.symbolsOp)
    const nameOp = namesOp[variables.symbolsOp.indexOf(symbolOp)]
    if (symbolOp === '*' || symbolOp === '/') {
      if (symbolOp === '/') {
        step = pickRandom([new ConstantNode(pickRandom(nombresAutorises2))])
      } else {
        step = pickRandom([new ConstantNode(pickRandom(nombresAutorises2)), new SymbolNode('x')])
      }
    } else if (symbolOp === '^') {
      step = new ConstantNode(randomInt(2, variables.limitPow + 1))
    } else {
      if (i === 1 && symbolOp === '-') {
        step = pickRandom([new ConstantNode(pickRandom(nombresAutorises1))])
      } else {
        step = pickRandom([new ConstantNode(pickRandom(nombresAutorises1)), new SymbolNode('x')])
      }
    }
    let nodeSimplifie = simplifyExpression(nodes[i - 1].toString({ parenthesis: 'keep' }))
    nodeSimplifie = nodeSimplifie.length === 0 ? parse(nodes[i - 1].toString({ parenthesis: 'auto' })) : nodeSimplifie[nodeSimplifie.length - 1].newNode
    nodes.push(new OperatorNode(symbolOp, nameOp, [new ParenthesisNode(nodeSimplifie), step]))
    const stepPrint = symbolOp === '^' ? step.toString() === '2' ? 'carré' : 'cube' : step.toString() === 'x' ? 'le nombre choisi' : `$${step.toString()}$`
    steps.push(toTex(nodes[i]))
    nodeSimplifie = simplifyExpression(nodes[i].toString({ parenthesis: 'auto' }))
    nodeSimplifie = nodeSimplifie.length === 0 ? parse(nodes[i].toString({ parenthesis: 'auto' })) : nodeSimplifie[nodeSimplifie.length - 1].newNode
    stepsSimplified.push(toTex(nodeSimplifie))
    phrases.push(debutsPhrase[variables.symbolsOp.indexOf(symbolOp)] + stepPrint)
  }
  const stepsSolutionDetaillee = Object.values(phrases) // Clone de phrases pour ne pas être touchée par les modifications
  stepsSolutionDetaillee.forEach(function (step, i) {
    stepsSolutionDetaillee[i] = '&\\bullet~\\text{' + phrases[i] + '}&'
    phrases[i] = '&\\bullet~\\text{' + phrases[i] + '}'
    stepsSolutionDetaillee[i] += steps[i] + '&='
    stepsSolutionDetaillee[i] += stepsSimplified[i]
  })
  let texte = String.raw` Voici un programme de calcul.
          <br>
          $\begin{aligned}
          ${phrases.join('\\\\')}
          \end{aligned}$
          <br>
          Notons $x$ le nombre choisi.
          <br>
          Ecrire le résultat du programme de calcul en fonction de $x$.
          `
  const texteCorr = String.raw`<br>
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
    '26 : Calculer'
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
  this.nouvelleVersion = function (numeroExercice, debug = false) {
    this.nbQuestions = this.NbQuestions > 0 ? this.nbQuestions : this.sup !== 0 ? 1 : formulaire.length - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = [] // À placer même si l'exercice n'a pas vocation à être corrigé
    let nquestion = 0
    for (let i = 0, exercice, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      nquestion = this.sup === 0 ? cpt + 1 : this.sup
      if (debug) {
        console.log(`
        ********************************
        Exercice ${i + 1} Case ${nquestion}
        ********************************`)
      }
      switch (nquestion) {
        case 1: {
          exercice = programmeCalcul({ nbEtapes: 3, symbolsOp: ['+', '*', '-', '/'] }, debug)
          break
        }
        case 2: {
          exercice = programmeCalcul({ nbEtapes: 4, symbolsOp: ['+', '*', '-', '/'] }, debug)
          break
        }
        case 3: {
          exercice = programmeCalcul({ nbEtapes: 5, symbolsOp: ['+', '*', '-', '/'] }, debug)
          break
        }
        case 4: {
          exercice = programmeCalcul({ nbEtapes: 3, symbolsOp: ['+', '*', '-', '^'], limitPow: 2 }, debug)
          break
        }
        case 5: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { a: false, b: false, c: false, d: false, test: 'a!=c' }), debug)
          break
        }
        case 6: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { a: false, b: true, c: false, d: true, test: 'a!=c' }), debug)
          break
        }
        case 7: {
          exercice = resoudreEquation(aleaEquation('a*x+b=c*x+d', { a: true, b: true, c: false, d: true, test: 'a!=c' }), debug)
          break
        }
        case 8: {
          exercice = resoudreEquation(aleaEquation('x/a=b/c', { a: false, b: true, c: false, test: 'a!= 1 and abs(b)%c!=0' }), debug)
          break
        }
        case 9: {
          exercice = resoudreEquation(aleaEquation('-x/a=b/c', { a: false, b: true, c: false, test: 'abs(b)%c!=0' }), debug)
          break
        }
        case 10: {
          exercice = resoudreEquation(aleaEquation('a/x=b/c', { a: true, b: true, c: false, test: 'abs(b)%c!=0' }), debug)
          break
        }
        case 11: {
          exercice = resoudreEquation(aleaEquation('(a*x+b)/c=d/e', { a: true, b: true, c: false, d: true, e: false, test: 'c>1 and a%c!=0 and abs(d)%e!=0' }), debug)
          break
        }
        case 12: {
          exercice = resoudreEquation(aleaEquation('a*x+b/c=d/e', { a: true, b: true, c: false, d: true, e: false, test: 'c>1 and abs(d)%e!=0 and abs(b)%c!=0' }), debug)
          break
        }
        case 13: {
          exercice = resoudreEquation(aleaEquation('a/(b*x+c)=d/e', { a: true, b: true, c: true, d: true, e: false, test: 'abs(d)%e!=0' }), debug)
          break
        }
        case 14: {
          exercice = resoudreEquation(aleaEquation('A*x+B=C*x+D', {
            s: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)',
            a: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)',
            b: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)',
            c: 'fraction(randomInt(-9, 9))+fraction(randomInt(-10, 10), 10)',
            A: 'a+b',
            B: 'c',
            C: 'b',
            D: 'a*s+c',
            test: 'A!=0 and D!=0'
          }), debug)
          break
        }
        case 15: {
          exercice = resoudreEquation(aleaEquation('a*(b*x+c)=d*x+e', { a: true, b: true, c: true, d: true, e: false, test: 'a!=1 and a*b!=d' }), debug)
          break
        }
        case 16: {
          exercice = resoudreEquation(aleaEquation('a*x+b*y=c', { a: true, b: true, c: true }), debug)
          break
        }
        case 17: {
          exercice = resoudreEquation(aleaEquation('a*x^2+b=a*x*(x+c)', { a: true, b: true, c: true }), debug)
          break
        }
        case 18: {
          exercice = resoudreEquation(aleaEquation('x/a=y', { a: false, test: 'a!=1' }), debug)
          break
        }
        case 19: {
          exercice = calculExpression(aleaExpressionLitterale('a/b+c/d', aleaAssignationVariables({ a: false, b: 'randomInt(2,100)', c: false, d: 'randomInt(2,100)', test: 'a!=b and c!=d and d!=b and (d%b==0 or b%d==0)' })).toString(), false, debug)
          break
        }
        case 20: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x', aleaAssignationVariables({ a: 'randomInt(2,100)', b: 'randomInt(2,100)' })).toString(), false, debug)
          break
        }
        case 21: {
          exercice = calculExpression(aleaExpressionLitterale('a*x+b*x-c*x', aleaAssignationVariables({ a: 'randomInt(2,100)', b: 'randomInt(2,100)', c: 'randomInt(2,100)', test: 'a+b>=c' })).toString(), false, debug)
          break
        }
        case 22: {
          exercice = calculExpression(aleaExpressionLitterale('a/b*x+c/d*x', aleaAssignationVariables({ a: false, b: 'randomInt(2,100)', c: false, d: 'randomInt(2,100)', test: 'a!=b and c!=d and d!=b and (d%b==0 or b%d==0)' })).toString(), false, debug)
          break
        }
        case 23: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c*x^2', aleaAssignationVariables({ a: 'randomInt(1,20)', b: 'randomInt(1,20)', c: 'randomInt(1,20)' })).toString(), false, debug)
          break
        }
        case 24: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2+b*x+c', aleaAssignationVariables({ a: 'randomInt(1,15)^2', c: 'randomInt(1,15)^2', b: '2*sqrt(a)*sqrt(c)' })).toString(), true, debug)
          break
        }
        case 25: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b*x+c', aleaAssignationVariables({ a: 'randomInt(1,15)^2', c: 'randomInt(1,15)^2', b: '2*sqrt(a)*sqrt(c)' })).toString(), true, debug)
          break
        }
        case 26: {
          exercice = calculExpression(aleaExpressionLitterale('a*x^2-b', aleaAssignationVariables({ a: 'randomInt(1,15)^2', b: 'randomInt(1,15)^2' })).toString(), true, debug)
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
