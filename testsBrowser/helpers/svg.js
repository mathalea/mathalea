/**
 * Retourne le vecteur correspondant au tag svg line fourni
 * @param {JSElement} line
 * @return {Promise<Vecteur>}
 */
async function lineToVect (line) {
  const v = []
  v.push(Number(await line.getAttribute('x2')) - Number(await line.getAttribute('x1')))
  v.push(Number(await line.getAttribute('y2')) - Number(await line.getAttribute('y1')))
  if (v.some(n => Number.isNaN(n))) throw Error('elt line invalide')
  return v
}

module.exports = {
  lineToVect
}
