/**
* Retourne le numérateur et le dénominateur de la fraction passée en argument sous la forme (numérateur,dénominateur)réduite au maximum dans un tableau [numérateur,dénominateur]
* * **ATTENTION Fonction clonée dans la classe FractionX()**
* @author Rémi Angot
*/
export function fractionSimplifiee (n, d) {
  const p = pgcd(n, d)
  let ns = n / p
  let ds = d / p
  if (ns < 0 && ds < 0) {
    [ns, ds] = [-ns, -ds]
  }
  if (ns > 0 && ds < 0) {
    [ns, ds] = [-ns, -ds]
  }
  return [ns, ds]
}

/**
  * Retourne le code LaTeX d'une fraction simplifiée ou d'un nombre entier
  * @author Rémi Angot
  */
export function texFractionReduite (n, d) {
  if (Math.abs(n) % Math.abs(d) === 0) {
    return n / d
  } else {
    return texFractionSigne(fractionSimplifiee(n, d)[0], fractionSimplifiee(n, d)[1])
  }
}

/**
   * produitDeDeuxFractions(num1,den1,num2,den2) retourne deux chaines :
   * la première est la fraction résultat, la deuxième est le calcul mis en forme Latex avec simplification éventuelle
   * Applique une simplification si le numérateur de l'une est égal au dénominateur de l'autre.
   */
export function produitDeDeuxFractions (num1, den1, num2, den2) {
  let num, den, texProduit
  if (num1 === den2) {
    texProduit = `\\dfrac{\\cancel{${num1}}\\times ${ecritureParentheseSiNegatif(num2)}}{${den1}\\times\\cancel{${ecritureParentheseSiNegatif(den2)}}}`
    num = num2
    num1 = 1
    den2 = 1
    den = den1
  } else if (num2 === den1) {
    texProduit = `\\dfrac{${num1}\\times \\cancel{${ecritureParentheseSiNegatif(num2)}}}{\\cancel{${den1}}\\times${ecritureParentheseSiNegatif(den2)}}`
    num = num1
    num2 = 1
    den1 = 1
    den = den2
  } else {
    num = num1 * num2
    den = den1 * den2
    texProduit = `\\dfrac{${num1}\\times ${ecritureParentheseSiNegatif(num2)}}{${den1}\\times${ecritureParentheseSiNegatif(den2)}}`
  }
  return [texFraction(num, den), texProduit, [num1, den1, num2, den2]]
}

/**
  *
  * Simplifie une fraction en montrant les étapes
  * Le résultat est un string qui doit être entouré de $ pour le mode mathématiques
  * @author Rémi Angot
  */
export function simplificationDeFractionAvecEtapes (num, den) {
  let result = '='
  if (num === 0) {
    return '=0'
  }
  const signe = num * den < 0 ? '-' : ''
  const numAbs = Math.abs(num)
  const denAbs = Math.abs(den)
  // Est-ce que le résultat est simplifiable ?
  const s = pgcd(numAbs, denAbs)
  if (s !== 1) {
    if (numAbs % denAbs === 0) { // si le résultat est entier
      result += `${num / den}`
    } else {
      result += `${signe}${texFraction(numAbs / s + miseEnEvidence('\\times' + s), denAbs / s + miseEnEvidence('\\times' + s))}=${texFractionSigne(num / s, den / s)}`
    }
  } else if (num < 0 || den < 0) {
    result += `${texFractionSigne(num, den)}`
  } else return ''
  return result
}
/**
* Fonction de comparaison à utiliser avec tableau.sort(compareFractions)
*
* Le tableau doit être du type `[[num,den],[num2,den2]]`
*
* @author Rémi Angot
*/
export function compareFractions (a, b) {
  if ((a[0] / a[1]) > (b[0] / b[1])) { return 1 }
  if ((a[0] / a[1]) < (b[0] / b[1])) { return -1 }
  // Sinon il y a égalité
  return 0
}

/**
 * Retourne l'égalité des produits en croix à partir d'un tableau contenant les deux fractions [[a,b],[c,d]] pour a/b=c/d retourne ad=bc
 * Le résultat est un string en mode maths inline
 * @author Jean-Claude Lhote
 */

export function produitsEnCroix ([[a, b], [c, d]]) { // écrit une chaine pour a*d=b*c
  let result = ''
  result += `$${a}\\times${d}=${b}\\times${c}$`
  return result
}
/**
 * Retourne la string LaTeX de la fraction
 * @param num
 * @param den
 * @return {string}
 * @author Jean-Claude Lhote
 */
export function texFractionSigne (num, den) {
  if (den === 1) return String(num)
  if (num * den > 0) {
    return `\\dfrac{${texNombre(Math.abs(num))}}{${texNombre(Math.abs(den))}}`
  }
  if (num * den < 0) {
    return `-\\dfrac{${texNombre(Math.abs(num))}}{${texNombre(Math.abs(den))}}`
  }
  return '0'
}

/**
  * Met de grandes parenthèses autour de la fraction a/b si besoin pour inclure une fraction dans une expresion en fonction du signe
  * @author Jean-Claude Lhote
  */
export function texFractionParentheses (a, b) {
  if (a * b > 0) { return texFractionSigne(a, b) } else { return '\\left(' + texFractionSigne(a, b) + '\\right)' }
}

/**
  * Retourne une liste de fractions irréductibles
  * @author Jean-Claude Lhote
  */
export function obtenirListeFractionsIrreductibles () { // sous forme de tableaux [numérateur,dénominateur]
  return [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8],
    [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
}

/**
  * Retourne une liste de fractions irréductibles de dénominateur égal à 2 3 5 7
  * @author Mireille Gain
  */
export function obtenirListeFractionsIrreductiblesFaciles () { // sous forme de tableaux [numérateur,dénominateur]
  return [[1, 2], [1, 3], [2, 3], [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]]
}
/**
* Retourne le code LaTeX d'une fraction a/b
* @author Rémi Angot
*/
export function texFraction (a, b) {
  if (b !== 1) {
    return `\\dfrac{${typeof a === 'number' ? texNombre(a) : a}}{${typeof b === 'number' ? texNombre(b) : b}}`
  } else {
    return a
  }
}
