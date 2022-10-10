/**
 * Donne la liste des facteurs premiers d'un nombre
 * @param {Entier} n - Nombre à décomposer
 * @returns {Entier[]} - Liste des facteurs premiers
*/
export function obtenirListeFacteursPremiers (n) {
  const facteurs = []
  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      facteurs.push(i)
      n /= i
    }
  }
  return facteurs
}

/**
   *
   * @param {Entier} n
   * Retourne la factorisation d'un entier sous la forme [[a0,n0],[a1,n1],...] où a0,a1 sont les facteurs premiers et n0, n1 sont les exposants de ces facteurs.
   * @author Jean-Claude Lhote
   */

export function factorisation (n) {
  const liste = obtenirListeFacteursPremiers(n)
  const facto = []; let index = 0
  for (let i = 0; i < liste.length;) {
    if (liste[i] === 0) i++
    else {
      facto.push([liste[i], 1])
      index++
      for (let j = i + 1; j < liste.length; j++) {
        if (liste[j] === liste[i]) {
          facto[index - 1][1]++
          liste[j] = 0
        }
      }
      i++
    }
  }
  return facto
}
/**
   *
   * @param {number} n
   * @param {boolean} puissancesOn
   * @returns {string} texFacto
   */
export function texFactorisation (n, puissancesOn = true) {
  let texFacto = ''
  let facto = []
  if (puissancesOn) {
    facto = factorisation(n)
    for (let i = 0; i < facto.length - 1; i++) {
      texFacto += `${facto[i][0]}${facto[i][1] > 1 ? '^{' + facto[i][1] + '}\\times ' : '\\times '}`
    }
    texFacto += `${facto[facto.length - 1][0]}${facto[facto.length - 1][1] > 1 ? '^{' + facto[facto.length - 1][1] + '}' : ''}`
  } else {
    facto = obtenirListeFacteursPremiers(n)
    for (let i = 0; i < facto.length - 1; i++) {
      texFacto += `${facto[i][0]}\\times `
    }
    texFacto += `${facto[facto.length - 1][0]}`
  }
  return texFacto
}

/**
   *
   * @param {Entier} n
   * Extrait le plus grand nombre possible de la racine carrée de n
   * retourne le résulat [a,b] pour a²b=n
   * @author Jean-Claude Lhote
   */
export function extraireRacineCarree (n) {
  const facto = factorisation(n)
  let radical = 1; let facteur = 1
  for (let i = 0; i < facto.length; i++) {
    if (facto[i][1] % 2 === 0) {
      facteur *= facto[i][0] ** (facto[i][1] >> 1)
    } else if (facto[i][1] > 1) {
      facteur *= facto[i][0] ** ((facto[i][1] - 1) >> 1)
      radical *= facto[i][0]
    } else radical *= facto[i][0]
  }
  return [facteur, radical]
}
/**
   *
   * @param {Entier} n
   * retourne le code Latex de la racine carrée de n "réduite"
   * @author Jean-CLaude Lhote
   */
export function texRacineCarree (n) {
  const result = extraireRacineCarree(n)
  if (result[1] === 1) return `${result[0]}`
  else if (result[0] === 1) return `\\sqrt{${result[1]}}`
  else return `${result[0]}\\sqrt{${result[1]}}`
}
