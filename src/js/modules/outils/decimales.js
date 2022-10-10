/**
* Renvoie le nombre de chiffres de la partie décimale
* @param nb : nombre décimal
* @param except : chiffre à ne pas compter (0 par exemple) [Ajout EE]
* @author Rémi Angot
*/
export function nombreDeChiffresDansLaPartieDecimale (nb, except = 'aucune') {
  let sauf = 0
  if (String(nb).indexOf('.') > 0) {
    if (!isNaN(except)) sauf = (String(nb).split('.')[1].split(String(except)).length - 1)
    return String(nb).split('.')[1].length - sauf
  } else {
    return 0
  }
}
/**
   * Renvoie le nombre de chiffres dans la partie entière
   * @author ?
   */
export function nombreDeChiffresDansLaPartieEntiere (nb, except = 'aucune') {
  let nombre; let sauf = 0
  if (nb < 0) {
    nombre = -nb
  } else {
    nombre = nb
  }
  if (String(nombre).indexOf('.') > 0) {
    if (!isNaN(except)) sauf = (String(nombre).split('.')[0].split(String(except)).length - 1)
    return String(nombre).split('.')[0].length - sauf
  } else {
    if (!isNaN(except)) sauf = (String(nombre).split(String(except)).length - 1)
    return String(nombre).length
  }
}
/**
   * Renvoie le nombre de chiffres d'un nombre décimal
   * @param nb : nombre décimal
   * @param except : chiffre à ne pas compter (0 par exemple) [Ajout EE]
   * @author Jean-Claude Lhote
   */
export function nombreDeChiffresDe (nb, except) {
  return nombreDeChiffresDansLaPartieDecimale(nb, except) + nombreDeChiffresDansLaPartieEntiere(nb, except)
}
