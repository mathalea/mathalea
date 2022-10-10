
/**
 * renvoie une chaine correspondant à l'écriture réduite de ax+b selon les valeurs de a et b
 * @author Jean-Claude Lhote
 * @param {number} a
 * @param {number} b
 */
export function reduireAxPlusB (a, b) {
  if (!(a instanceof Decimal)) a = new Decimal(a)
  if (!(b instanceof Decimal)) b = new Decimal(b)
  let result = ''
  if (!a.isZero()) {
    if (a.eq(1)) result = 'x'
    else if (a.eq(-1)) result = '-x'
    else result = `${stringNombre(a)}x`
  }
  if (!b.isZero()) {
    if (!a.isZero()) result += `${ecritureAlgebrique(b)}`
    else result = stringNombre(b)
  } else if (a.isZero()) result = '0'
  return result
}
/**
   * renvoie une chaine correspondant à l'écriture réduite de ax^3+bx^2+cx+d selon les valeurs de a,b,c et d
   * @author Jean-Claude Lhote
   */
export function reduirePolynomeDegre3 (a, b, c, d) {
  let result = ''
  if (a !== 0) {
    switch (a) {
      case 1:
        result += 'x^3'
        break
      case -1:
        result += '-x^3'
        break
      default:
        result += `${a}x^3`
        break
    }
    if (b !== 0) {
      switch (b) {
        case 1:
          result += '+x^2'
          break
        case -1:
          result += '-x^2'
          break
        default:
          result += `${ecritureAlgebrique(b)}x^2`
          break
      }
    }
    if (c !== 0) {
      switch (c) {
        case 1:
          result += '+x'
          break
        case -1:
          result += '-x'
          break
        default:
          result += `${ecritureAlgebrique(c)}x`
          break
      }
    }
    if (d !== 0) {
      result += `${ecritureAlgebrique(d)}`
    }
  } else { // degré 2 pas de degré 3
    if (b !== 0) {
      switch (b) {
        case 1:
          result += 'x^2'
          break
        case -1:
          result += '-x^2'
          break
        default:
          result += `${b}x^2`
          break
      }
      if (c !== 0) {
        switch (c) {
          case 1:
            result += '+x'
            break
          case -1:
            result += '-x'
            break
          default:
            result += `${ecritureAlgebrique(c)}x`
            break
        }
      }
      if (d !== 0) {
        result += `${ecritureAlgebrique(d)}`
      }
    } else // degré 1 pas de degré 2 ni de degré 3
    if (c !== 0) {
      switch (c) {
        case 1:
          result += 'x'
          break
        case -1:
          result += '-x'
          break
        default:
          result += `${c}x`
          break
      }
      if (d !== 0) {
        result += `${ecritureAlgebrique(d)}`
      }
    } else { // degré 0 a=0, b=0 et c=0
      result += `${d}`
    }
  }
  return result
}
/**
 * @param {string} expression expression parsée
 * @returns expression en LaTeX avec multication implicite
 * @author Jean-Léon Henry
 */
 export function prettyTex (expression) {
    return expression.toTex({ implicit: 'hide' }).replaceAll('\\cdot', '')
  }
s  