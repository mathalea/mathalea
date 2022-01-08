import { format, number, evaluate, SymbolNode, ConstantNode, OperatorNode, ParenthesisNode, simplify, parse, pickRandom } from 'mathjs'
import { solveEquation, simplifyExpression, factor } from 'mathsteps'
import { getNewChangeNodes } from './Change.js'
// eslint-disable-next-line no-debugger
debugger
export const titre = 'Outils dérivés de Mathsteps'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '06/01/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export function toTex (node, debug = false) {
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

export function aleaExpressionLitterale (expression = '(a*x+b)*(c*x-d)', assignations = { a: 1, b: 2, c: 3, d: -6 }, debug = false) {
  // Ne pas oublier le signe de la multiplication
  return simplify(expression, [{ l: '1*n', r: 'n' }, { l: '-1*n', r: '-n' }, { l: 'n/1', r: 'n' }, { l: 'c/c', r: '1' }, { l: '0*v', r: '0' }, { l: '0+v', r: 'v' }], assignations)
}

export function aleaAssignationVariables (variables = { a: false, b: false, c: true, d: 'fraction(a,10)+fraction(b,100)', test: 'b!=0 and b>a>c' }, debug = false) {
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

export function aleaEquation (equation = 'a*x+b=c*x-d', variables = { a: false, b: false, c: false, d: false, test: 'a>b or true' }, debug = false) { // Ne pas oublier le signe de la multiplication
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
