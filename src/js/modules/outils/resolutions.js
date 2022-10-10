/**
 * Fonction qui retourne les coefficients a et b de f(x)=ax²+bx+c à partir des données de x1,x2,f(x1),f(x2) et c.
 *
 * @author Jean-Claude Lhote
 */
export function resolutionSystemeLineaire2x2 (x1, x2, fx1, fx2, c) {
  const matrice = matriceCarree([[x1 ** 2, x1], [x2 ** 2, x2]])
  const determinant = matrice.determinant()
  const [a, b] = matrice.cofacteurs().transposee().multiplieVecteur([fx1 - c, fx2 - c])
  if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(determinant)) {
    const fa = fraction(a, determinant)
    const fb = fraction(b, determinant)
    return [[fa.numIrred, fa.denIrred], [fb.numIrred, fb.denIrred]]
  }
  return [[a / determinant, 1], [b / determinant, 1]]
}
/**
   * Fonction qui retourne les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d à partir des données de x1,x2,x3,f(x1),f(x2),f(x3) et d (entiers !)
   * sous forme de fraction irréductible. Si pas de solution (déterminant nul) alors retourne [[0,0],[0,0],[0,0]]
   * @author Jean-Claude Lhote
   */
export function resolutionSystemeLineaire3x3 (x1, x2, x3, fx1, fx2, fx3, d) {
  const matrice = matriceCarree([[x1 ** 3, x1 ** 2, x1], [x2 ** 3, x2 ** 2, x2], [x3 ** 3, x3 ** 2, x3]])
  const y1 = fx1 - d; const y2 = fx2 - d; const y3 = fx3 - d
  const determinant = matrice.determinant()
  if (determinant === 0) {
    return [[0, 0], [0, 0], [0, 0]]
  }
  const [a, b, c] = matrice.cofacteurs().transposee().multiplieVecteur([y1, y2, y3])
  if (Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c) && Number.isInteger(determinant)) { // ici on retourne un tableau de couples [num,den] entiers !
    const fa = fraction(a, determinant)
    const fb = fraction(b, determinant)
    const fc = fraction(c, determinant)
    return [
      [fa.numIrred, fa.denIrred],
      [fb.numIrred, fb.denIrred],
      [fc.numIrred, fc.denIrred]
    ]
    // pour l'instant on ne manipule que des entiers, mais on peut imaginer que ce ne soit pas le cas... dans ce cas, la forme est numérateur = nombre & dénominateur=1
  }
  return [
    [a / determinant, 1],
    [b / determinant, 1],
    [b / determinant, 1]
  ]
}
/**
   * Fonction qui cherche une fonction polynomiale de degré 3 dont les coefficients a, b et c de f(x)=ax^3 + bx² + cx + d
   * sont des fractions dont le dénominateur est inférieur à 10 et pour laquelle l'image de 3 entiers compris entre -10 et 10
   * sont des entiers compris eux aussi entre -10 et 10
   * @author Jean-Claude Lhote
   */
export function criblePolynomeEntier () {
  let trouve = false
  let coefs = [[]]
  for (let i = 0, x1, x2, x3, fx1, fx2, fx3, d; ; i++) {
    x1 = randint(-10, 10)
    x2 = randint(-10, 10, [x1])
    x3 = randint(-10, 10, [x1, x2])
    fx1 = randint(-10, 10)
    fx2 = randint(-10, 10)
    fx3 = randint(-10, 10)
    d = randint(0, 10)
    coefs = resolutionSystemeLineaire3x3(x1, x2, x3, fx1, fx2, fx3, d)
    if (coefs[0][1] !== 0 && coefs[0][1] < 10 && coefs[1][1] < 10 && coefs[2][1] < 10) trouve = true
    if (trouve) {
      coefs.push([x1, fx1])
      coefs.push([x2, fx2])
      coefs.push([x3, fx3])
      coefs.push(d)
      break
    }
  }
  if (trouve) return coefs
}
/**
   * Fonction qui cherche les minimas et maximas d'une fonction polynomiale f(x)=ax^3 + bx² + cx + d
   * retourne [] si il n'y en a pas, sinon retourne [[x1,f(x1)],[x2,f(x2)] ne précise pas si il s'agit d'un minima ou d'un maxima.
   * @author Jean-Claude Lhote
   */
export function chercheMinMaxFonction ([a, b, c, d]) {
  const delta = 4 * b * b - 12 * a * c
  if (delta <= 0) return [[0, 10 ** 99], [0, 10 ** 99]]
  const x1 = (-2 * b - Math.sqrt(delta)) / (6 * a)
  const x2 = (-2 * b + Math.sqrt(delta)) / (6 * a)
  return [[x1, a * x1 ** 3 + b * x1 ** 2 + c * x1 + d], [x2, a * x2 ** 3 + b * x2 ** 2 + c * x2 + d]]
}
/**
   * retourne les coefficients d'un polynome de degré 3 dont la dérivée s'annule en  x1 et x2 et tel que f(x1)=y1 et f(x2)=y2.
   * @author Jean-Claude Lhote
   */
export function cherchePolynomeDegre3aExtremaFixes (x1, x2, y1, y2) {
  const M = matriceCarree([[x1 ** 3, x1 ** 2, x1, 1], [x2 ** 3, x2 ** 2, x2, 1], [3 * x1 ** 2, 2 * x1, 1, 0], [3 * x2 ** 2, 2 * x2, 1, 0]])
  const R = [y1, y2, 0, 0]
  if (!egal(M.determinant(), 0)) return M.inverse().multiplieVecteur(R)
  else return false
}
