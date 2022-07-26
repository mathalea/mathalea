import { ChangeTypes } from 'mathsteps'
import NodeType from './NodeType.js'

const Change = {
  changeFormatFunctionMap: {}
}

const OP_TO_STRING = {
  '+': 'Combine',
  '-': 'Combine',
  '*': 'Multiply',
  '/': 'Divide'
}

const COMPARATOR_TO_STRING = {
  '=': 'equal to',
  '>': 'greater than',
  '>=': 'greater than or equal to',
  '<': 'less than',
  '<=': 'less than or equal to'
}

// Given a step, will return the change and explanation for the change
// from the oldNode, newNode, and changeType
Change.formatChange = function (step) {
  if (!(step.changeType in Change.changeFormatFunctionMap)) {
    // TODO: add tests that will alert us when a new change type doesn't
    // have a change function yet
    console.error(step.changeType + ' does not have a change function!')
    return step.changeType
  }

  const changeFormatFunctionMap = Change.changeFormatFunctionMap[step.changeType]
  const changeDescription = changeFormatFunctionMap(step)
  if (!changeDescription) {
    return `\\text{${Change.ChangeText[step.changeType]}}`
  }

  return changeDescription
}

function getChangeNodes (node) {
  return node.filter(node => node.changeGroup)
}

function getOldChangeNodes (step) {
  if (step.oldNode) {
    return getChangeNodes(step.oldNode)
  } else if (step.oldEquation) {
    const leftChangeNodeStrings = getChangeNodes(step.oldEquation.leftNode)
    const rightChangeNodeStrings = getChangeNodes(step.oldEquation.rightNode)
    return [...leftChangeNodeStrings, ...rightChangeNodeStrings]
  }
  return null
}

export function getNewChangeNodes (step) {
  if (step.newNode) {
    return getChangeNodes(step.newNode)
  } else if (step.newEquation) {
    const leftChangeNodeStrings = getChangeNodes(step.newEquation.leftNode)
    const rightChangeNodeStrings = getChangeNodes(step.newEquation.rightNode)
    return [...leftChangeNodeStrings, ...rightChangeNodeStrings]
  }
  return null
}

function nodesToString (nodes, duplicates = false) {
  // get rid of changeGroup so we can find duplicates
  nodes.forEach(node => { node.changeGroup = undefined })

  let strings = nodes.map(node => node.toTex())
  if (!duplicates) {
    strings = [...new Set(strings)]
  }

  if (strings.length === 0) {
    return ''
  } else if (strings.length === 1) {
    return strings[0]
  } else {
    return `${strings.slice(0, -1).join(', ')} \\text{ and } ${strings.slice(-1)}`
  }
}

// e.g. |-3| -> 3
Change.changeFormatFunctionMap[ChangeTypes.ABSOLUTE_VALUE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  if (oldNodes.length !== 1) {
    return null
  }

  const absNode = oldNodes[0]
  if (!NodeType.isFunction(absNode, 'abs')) {
    return null
  }

  const string = absNode.args[0].toTex()
  return `\\text{Take the absolute value of } ${string}`
}

// e.g. 2x + x -> 2x + 1x
Change.changeFormatFunctionMap[ChangeTypes.ADD_COEFFICIENT_OF_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length === 0 || newNodes.length !== oldNodes.length) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. x^2 * x -> x^2 * x^1
Change.changeFormatFunctionMap[ChangeTypes.ADD_EXPONENT_OF_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length === 0 || newNodes.length !== oldNodes.length) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 1/2 + 1/3 -> 5/6
Change.changeFormatFunctionMap[ChangeTypes.ADD_FRACTIONS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || opNode.op !== '+' || opNode.args.length > 3) {
    return null
  }

  const before = nodesToString(opNode.args, true)
  const after = newNodes[0].toTex()
  return `\\text{Add } ${before} \\text{ to get } ${after}`
}

// e.g. (1 + 2)/3 -> 3/3
Change.changeFormatFunctionMap[ChangeTypes.ADD_NUMERATORS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x^2 + x^2 -> 2x^2
Change.changeFormatFunctionMap[ChangeTypes.ADD_POLYNOMIAL_TERMS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || opNode.op !== '+') {
    return null
  }

  const before = nodesToString(opNode.args, true)
  const after = newNodes[0].toTex()
  return `\\text{Add } ${before} \\text{ to get } ${after}`
}

// e.g. x - 3 = 2 -> x - 3 + 3 = 2 + 3
Change.changeFormatFunctionMap[ChangeTypes.ADD_TO_BOTH_SIDES] = function (step) {
  // there is a term node on each side of the equation
  const termNodes = getNewChangeNodes(step)
  if (termNodes.length !== 2) {
    return null
  }

  const term = termNodes[0].toTex()
  return `\\text{Add } ${term} \\text{ to both sides}`
}

// e.g. (x + 2)/2 -> x/2 + 2/2
Change.changeFormatFunctionMap[ChangeTypes.BREAK_UP_FRACTION] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  if (oldNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  return `\\text{Break up the fraction } ${before}`
}

// e.g. nthRoot(x ^ 2, 4) -> nthRoot(x, 2)
Change.changeFormatFunctionMap[ChangeTypes.CANCEL_EXPONENT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(x ^ 2, 2) -> x
Change.changeFormatFunctionMap[ChangeTypes.CANCEL_EXPONENT_AND_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(x ^ 2, 2) -> x
Change.changeFormatFunctionMap[ChangeTypes.CANCEL_MINUSES] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(x ^ 4, 2) -> x ^ 2
Change.changeFormatFunctionMap[ChangeTypes.CANCEL_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2x/2 -> x
Change.changeFormatFunctionMap[ChangeTypes.CANCEL_TERMS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  if (oldNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  return `\\text{Cancel } ${before} \\text{ from the numerator and denominator}`
}

// e.g. 2 + x + 3 + x -> 5 + 2x
Change.changeFormatFunctionMap[ChangeTypes.COLLECT_AND_COMBINE_LIKE_TERMS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x^2 * x^3 * x^1 -> x^(2 + 3 + 1)
Change.changeFormatFunctionMap[ChangeTypes.COLLECT_EXPONENTS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x + 2 + x^2 + x + 4 -> x^2 + (x + x) + (4 + 2)
Change.changeFormatFunctionMap[ChangeTypes.COLLECT_LIKE_TERMS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2/5 + 1/5 -> (2+1)/5
Change.changeFormatFunctionMap[ChangeTypes.COMBINE_NUMERATORS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(2, 2) * nthRoot(3, 2) -> nthRoot(2 * 3, 2)
Change.changeFormatFunctionMap[ChangeTypes.COMBINE_UNDER_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2/6 + 1/4 -> (2*2)/(6*2) + (1*3)/(4*3)
Change.changeFormatFunctionMap[ChangeTypes.COMMON_DENOMINATOR] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 3 + 1/2 -> 6/2 + 1/2
Change.changeFormatFunctionMap[ChangeTypes.CONVERT_INTEGER_TO_FRACTION] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Change } ${before} \\text{ to } ${after} \\text{ so that it has a shared denominator}`
}

// e.g. 2 * 2 * 2 -> 2 ^ 3
Change.changeFormatFunctionMap[ChangeTypes.CONVERT_MULTIPLICATION_TO_EXPONENT] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 2(x + y) -> 2x + 2y
Change.changeFormatFunctionMap[ChangeTypes.DISTRIBUTE] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. -(2 + x) -> -2 - x
Change.changeFormatFunctionMap[ChangeTypes.DISTRIBUTE_NEGATIVE_ONE] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(2 * x) -> nthRoot(2) * nthRoot(x)
Change.changeFormatFunctionMap[ChangeTypes.DISTRIBUTE_NTH_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// 1.2 + 1/2 -> 1.2 + 0.5
Change.changeFormatFunctionMap[ChangeTypes.DIVIDE_FRACTION_FOR_ADDITION] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Divide } ${before} \\text{ so it's in the decimal form } ${after}`
}

// e.g. 2x = 1 -> (2x)/2 = 1/2
Change.changeFormatFunctionMap[ChangeTypes.DIVIDE_FROM_BOTH_SIDES] = function (step) {
  const termNodes = getNewChangeNodes(step)
  if (termNodes.length !== 2) {
    return null
  }

  const term = termNodes[0].toTex()
  return `\\text{Divide both sides by } ${term}`
}

// e.g. 2/-1 -> -2
Change.changeFormatFunctionMap[ChangeTypes.DIVISION_BY_NEGATIVE_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `${before} \\text{ divided by -1 is } ${after}`
}

// e.g. 2/1 -> 2
Change.changeFormatFunctionMap[ChangeTypes.DIVISION_BY_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `${before} \\text{ divided by 1 is } ${after}`
}

// e.g. nthRoot(4) * nthRoot(x^2) -> 2 * x
Change.changeFormatFunctionMap[ChangeTypes.EVALUATE_DISTRIBUTED_NTH_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 12 -> 2 * 2 * 3
Change.changeFormatFunctionMap[ChangeTypes.FACTOR_INTO_PRIMES] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length < oldNodes.length || newNodes.length > 5) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Factor } ${before} \\text{ into its prime factors: } ${after}`
}

// e.g. 2x^2 + 3x^2 + 5x^2 -> (2+3+5)x^2
Change.changeFormatFunctionMap[ChangeTypes.GROUP_COEFFICIENTS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. nthRoot(2 * 2 * 2, 2) -> nthRoot((2 * 2) * 2)
Change.changeFormatFunctionMap[ChangeTypes.GROUP_TERMS_BY_ROOT] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. (2/3)x = 1 -> (2/3)x * (3/2) = 1 * (3/2)
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION] = function (step) {
  const termNodes = getNewChangeNodes(step)
  if (termNodes.length !== 2) {
    return null
  }

  const term = termNodes[0].toTex()
  return `\\text{Multiply both sides by the inverse } ${term}`
}

// e.g. -x = 2 -> -1 * -x = -1 * 2
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x/(2/3) -> x * 3/2
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_BY_INVERSE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes, true)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. x * 0 -> 0
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_BY_ZERO] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. (2 * 3)(x * x) -> 6(x*x)
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_COEFFICIENTS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || opNode.op !== '*') {
    return null
  }

  const before = nodesToString(oldNodes, true)
  const after = newNodes[0].toTex()
  return `\\text{Multiply the coefficients } ${before} \\text{ to get } ${after}`
}

// e.g. (2*2)/(6*2) + (1*3)/(4*3) -> (2*2)/12 + (1*3)/12
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_DENOMINATORS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 1/2 * 2/3 -> 2/6
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_FRACTIONS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || opNode.op !== '*') {
    return null
  }

  const before = nodesToString(opNode.args, true)
  const after = newNodes[0].toTex()
  return `\\text{Multiply } ${before} \\text{ to get } ${after}`
}

// e.g. (2*2)/12 + (1*3)/12 -> 4/12 + 3/12
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_NUMERATORS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2x * x -> 2x ^ 2
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_POLYNOMIAL_TERMS] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || opNode.op !== '*') {
    return null
  }

  const before = nodesToString(opNode.args, true)
  const after = newNodes[0].toTex()
  return `\\text{Multiply } ${before} \\text{ to get } ${after}`
}

// e.g. x/2 = 1 -> (x/2) * 2 = 1 * 2
Change.changeFormatFunctionMap[ChangeTypes.MULTIPLY_TO_BOTH_SIDES] = function (step) {
  const termNodes = getNewChangeNodes(step)
  if (termNodes.length !== 2) {
    return null
  }

  const term = termNodes[0].toTex()
  return `\\text{Multiply both sides by } ${term}`
}

// This should never happen
Change.changeFormatFunctionMap[ChangeTypes.NO_CHANGE] = function () {
  return null
}

// e.g. nthRoot(4) -> 2
Change.changeFormatFunctionMap[ChangeTypes.NTH_ROOT_VALUE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  if (oldNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  return `\\text{Take the root of } ${before}`
}

// e.g. x * 2 -> 2x
Change.changeFormatFunctionMap[ChangeTypes.REARRANGE_COEFF] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x ^ 0 -> 1
Change.changeFormatFunctionMap[ChangeTypes.REDUCE_EXPONENT_BY_ZERO] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 0/1 -> 0
Change.changeFormatFunctionMap[ChangeTypes.REDUCE_ZERO_NUMERATOR] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 2 + 0 -> 2
Change.changeFormatFunctionMap[ChangeTypes.REMOVE_ADDING_ZERO] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x ^ 1 -> x
Change.changeFormatFunctionMap[ChangeTypes.REMOVE_EXPONENT_BY_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. x * -1 -> -x
Change.changeFormatFunctionMap[ChangeTypes.REMOVE_MULTIPLYING_BY_NEGATIVE_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. x * 1 -> x
Change.changeFormatFunctionMap[ChangeTypes.REMOVE_MULTIPLYING_BY_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 2 - - 3 -> 2 + 3
Change.changeFormatFunctionMap[ChangeTypes.RESOLVE_DOUBLE_MINUS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2 + 2 -> 4 or 2 * 2 -> 4
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_ARITHMETIC] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const opNode = oldNodes[0]
  if (!NodeType.isOperator(opNode) || '+-*/^'.indexOf(opNode.op) === -1) {
    return null
  }

  const before = nodesToString(opNode.args, true)
  const after = newNodes[0].toTex()
  return `\\text{${OP_TO_STRING[opNode.op]} } ${before} \\text{ to get } ${after}`
}

// e.g. 2/3/4 -> 2/(3*4)
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_DIVISION] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

// e.g. 2/6 -> 1/3
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_FRACTION] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length !== 1 || newNodes.length !== 1) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Simplify } ${before} \\text{ to } ${after}`
}

// e.g. x + 2 - 1 = 3 -> x + 1 = 3
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_LEFT_SIDE] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. x = 3 - 1 -> x = 2
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_RIGHT_SIDE] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2/-3 -> -2/3
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_SIGNS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2 * 4x + 2*5 --> 8x + 10
Change.changeFormatFunctionMap[ChangeTypes.SIMPLIFY_TERMS] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2 = 2
Change.changeFormatFunctionMap[ChangeTypes.STATEMENT_IS_FALSE] = function (step) {
  const comparator = step.newEquation.comparator
  return `\\text{The left side is not ${COMPARATOR_TO_STRING[comparator]} the right side}`
}

// e.g. 2 = 3
Change.changeFormatFunctionMap[ChangeTypes.STATEMENT_IS_TRUE] = function (step) {
  const comparator = step.newEquation.comparator
  return `\\text{The left side is ${COMPARATOR_TO_STRING[comparator]} the right side}`
}

// e.g. x + 3 = 2 -> x + 3 - 3 = 2 - 3
Change.changeFormatFunctionMap[ChangeTypes.SUBTRACT_FROM_BOTH_SIDES] = function (step) {
  const termNodes = getNewChangeNodes(step)
  if (termNodes.length !== 2) {
    return null
  }

  const term = termNodes[0].toTex()
  return `\\text{Subtract } ${term} \\text{ from both sides}`
}

// e.g. 2 = x -> x = 2
Change.changeFormatFunctionMap[ChangeTypes.SWAP_SIDES] = function (step) {
  return `\\text{${Change.ChangeText[step.changeType]}}`
}

// e.g. 2x - x -> 2x - 1x
Change.changeFormatFunctionMap[ChangeTypes.UNARY_MINUS_TO_NEGATIVE_ONE] = function (step) {
  const oldNodes = getOldChangeNodes(step)
  const newNodes = getNewChangeNodes(step)
  if (oldNodes.length === 0 || newNodes.length !== oldNodes.length) {
    return null
  }

  const before = nodesToString(oldNodes)
  const after = nodesToString(newNodes)
  return `\\text{Rewrite } ${before} \\text{ as } ${after}`
}

Change.ChangeText = {
  ABSOLUTE_VALUE: 'Take the absolute value',
  ADD_COEFFICIENT_OF_ONE: 'Rewrite term to have a coefficient of 1',
  ADD_EXPONENT_OF_ONE: 'Rewrite term to have an exponent of 1',
  ADD_FRACTIONS: 'Add the fractions together',
  ADD_NUMERATORS: 'Add the terms in the numerator',
  ADD_POLYNOMIAL_TERMS: 'Add the polynomial terms together',
  ADD_TO_BOTH_SIDES: 'Add the term to both sides',
  BREAK_UP_FRACTION: 'Break up the fraction',
  CANCEL_EXPONENT: 'Cancel the exponent',
  CANCEL_EXPONENT_AND_ROOT: 'Cancel the exponent and the root',
  CANCEL_MINUSES: 'Cancel the negatives in the numerator and denominator',
  CANCEL_ROOT: 'Cancel the root',
  CANCEL_TERMS: 'Cancel like terms in the numerator and denominator',
  COLLECT_AND_COMBINE_LIKE_TERMS: 'Collect and combine like terms',
  COLLECT_EXPONENTS: 'Collect the exponents',
  COLLECT_LIKE_TERMS: 'Identify the like terms and group them together',
  COMBINE_NUMERATORS: 'Combine the numerators with a shared denominator',
  COMMON_DENOMINATOR: 'Multiply the terms so they share a common denominator',
  COMBINE_UNDER_ROOT: 'Combine terms with the same root',
  CONVERT_INTEGER_TO_FRACTION: 'Change the number to a fraction with the same denominator',
  CONVERT_MULTIPLICATION_TO_EXPONENT: 'Change repeatedly multiplying a term to an exponent',
  DISTRIBUTE: 'Distribute into the parentheses',
  DISTRIBUTE_NEGATIVE_ONE: 'Distribute -1 into the parentheses',
  DISTRIBUTE_NTH_ROOT: 'Distribute the root into each term',
  DIVIDE_FRACTION_FOR_ADDITION: 'Divide any fractions to convert it to decimal form',
  DIVIDE_FROM_BOTH_SIDES: 'Divide the term from both sides',
  DIVISION_BY_NEGATIVE_ONE: 'Rewrite any term divided by -1 as the negative of the term',
  DIVISION_BY_ONE: 'Rewrite any term divided by 1 as just the term',
  EVALUATE_DISTRIBUTED_NTH_ROOT: 'Take the root of all the terms',
  FACTOR_INTO_PRIMES: 'Factor the number into its prime factors',
  GROUP_COEFFICIENTS: 'Group the coefficients together',
  GROUP_TERMS_BY_ROOT: 'Group repeating factors',
  MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION: 'Multiply both sides by the inverse of the fraction',
  MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE: 'Multiply both sides by -1',
  MULTIPLY_BY_INVERSE: 'Rewrite division as multiplication by the inverse',
  MULTIPLY_BY_ZERO: 'Rewrite any term multiplied by 0 as 0',
  MULTIPLY_COEFFICIENTS: 'Multiply the coefficients together',
  MULTIPLY_DENOMINATORS: 'Multiply the terms in the denominators',
  MULTIPLY_FRACTIONS: 'Multiply the fractions together',
  MULTIPLY_NUMERATORS: 'Multiply the terms in the numerators',
  MULTIPLY_POLYNOMIAL_TERMS: 'Multiply the polynomial terms together',
  MULTIPLY_TO_BOTH_SIDES: 'Multiply the term to both sides',
  NTH_ROOT_VALUE: 'Take the root of the number',
  NO_CHANGE: 'No change',
  REARRANGE_COEFF: 'Move the coefficient to the front of the term',
  REDUCE_ZERO_NUMERATOR: 'Rewrite zero divided by anything as zero',
  REMOVE_EXPONENT_BY_ONE: 'Rewrite any term to the power of 1 as itself',
  REDUCE_EXPONENT_BY_ZERO: 'Rewrite any term to the power of 0 as 1',
  REMOVE_ADDING_ZERO: 'Remove zero when adding',
  REMOVE_MULTIPLYING_BY_NEGATIVE_ONE: 'Rewrite any term multiplied by -1 as the negative of the term',
  REMOVE_MULTIPLYING_BY_ONE: 'Rewrite any term multiplied 1 as just the term',
  RESOLVE_DOUBLE_MINUS: 'Change subtracting a negative to addition',
  SIMPLIFY_ARITHMETIC: 'Evaluate the arithmetic',
  SIMPLIFY_DIVISION: 'Rewrite the chain of division',
  SIMPLIFY_FRACTION: 'Simplify by dividing the top and bottom by the greatest common denominator',
  SIMPLIFY_LEFT_SIDE: 'Simplify the left hand side',
  SIMPLIFY_RIGHT_SIDE: 'Simplify the right hand side',
  SIMPLIFY_SIGNS: 'Move the negative sign to the numerator',
  SIMPLIFY_TERMS: 'Simplify after distributing',
  STATEMENT_IS_FALSE: 'The statement is False',
  STATEMENT_IS_TRUE: 'The statement is True',
  SUBTRACT_FROM_BOTH_SIDES: 'Subtract the term from both sides',
  SWAP_SIDES: 'Swap sides',
  UNARY_MINUS_TO_NEGATIVE_ONE: 'Rewrite minus as a coefficient of -1'
}

export default Change
