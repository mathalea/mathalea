/**
 * Retourne true si tous les éléments de la liste sont true (pas truthy, et récursivement), false sinon
 * @param {Array} list
 * @return {boolean}
 */
function allTrue (list) {
  if (!Array.isArray(list)) throw TypeError(`allTrue ne gère que des Array (ici ${typeof list} : ${JSON.stringify(list)})`)
  return list.every(item => {
    if (Array.isArray(item)) return allTrue(item)
    return item === true
  })
}

module.exports = {
  allTrue
}
