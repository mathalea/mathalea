/**
 * Attend qu'un id soit présent dans le dom
 * @param {string} id
 * @param {number} timeout Temps max d'attente (en s) avant de rejeter la promesse
 * @return {Promise<HTMLElement, Error>}
 */
export function waitFor (id, timeout = 30) {
  return new Promise((resolve, reject) => {
    const found = () => {
      const elt = document.getElementById(id)
      if (elt) {
        clearTimeout(timer)
        resolve(elt)
        return true
      }
      return false
    }
    const abort = () => reject(Error(`Pas trouvé #${id} dans le dom après ${timeout}s d’attente`))
    const timer = setTimeout(abort, timeout * 1000)

    if (!found()) setTimeout(found, 250)
  })
}
