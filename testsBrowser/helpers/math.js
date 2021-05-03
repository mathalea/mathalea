async function areColineaires (v1, v2) {
  if (v1[0] === 0 && v2[0] === 0) return true
  // ok si v2 = k . v1
  return Math.abs(v2[0] / v1[0] - v2[1] / v1[1]) < 1e-9
}
async function areColineairesOpposes (v1, v2) {
  return (180 - getAngleDegFromVect(v1, v2)) < 1e-9
}
async function areColineairesMemeDirection (v1, v2) {
  return getAngleDegFromVect(v1, v2) < 1e-9
}
/**
 * Rectifie les erreurs d'arrondi (transforme 0.00033099999999999997 en 0.000331)
 * @param {number} nb
 * @return {number}
 */
const fixArrondi = (nb) => Number(nb.toFixed(10))

/**
 * Retourne l'angle en ° entre v1 et v2
 * @param {Vecteur} v1
 * @param {Vecteur} v2
 * @return {number} entre 0 et 180 (NaN si l'un des deux est le vecteur nul)
 */
function getAngleDegFromVect (v1, v2) {
  const prodNormes = norme(v1) * norme(v2)
  if (prodNormes === 0) return Number.NaN
  const cosinus = fixArrondi(produitScalaire(v1, v2) / prodNormes)
  return fixArrondi(Math.acos(cosinus) * 180 / Math.PI)
}

/**
 * Retourne le pgcd de deux nombres (arrondis à l'entier le plus proche si c'était pas des entiers
 * @param x
 * @param y
 * @return {number}
 */
function getPGCD (x, y) {
  ;[x, y].forEach(n => {
    if (typeof n !== 'number' || n < 1 || Math.abs(n - Math.round(n)) > 1e-8) throw TypeError(`Il faut des entiers positifs, nombre ${n} invalide pour un calcul de PGCD`)
  })
  let a = Math.round(Math.max(x, y))
  let b = Math.round(Math.min(x, y))
  let r = a % b
  while (r !== 0) {
    a = b
    b = r
    r = a % b
  }
  return b
}

const getRandomBool = () => Math.random() < 0.5
/**
 * @param {Vecteur} v
 * @return {number}
 */
const norme = (v) => fixArrondi(Math.sqrt(v.reduce((acc, coord) => acc + coord * coord, 0)))
/**
 * @param {Vecteur} v1
 * @param {Vecteur} v2
 * @return {number}
 */
const produitScalaire = (v1, v2) => fixArrondi(v1.reduce((acc, coord, index) => acc + coord * v2[index], 0))

module.exports = {
  areColineaires,
  areColineairesMemeDirection,
  areColineairesOpposes,
  fixArrondi,
  getAngleDegFromVect,
  getPGCD,
  getRandomBool,
  norme,
  produitScalaire
}

/**
 * @typedef Vecteur
 * @type {number[]}
 */
