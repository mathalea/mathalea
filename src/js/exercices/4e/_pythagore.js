import { calcul, miseEnEvidence, texNombre, texNombrec, texteEnCouleurEtGras } from '../../modules/outils'

/**
   * Crée une rédaction du théorème de Pythagore adaptée à la recherche de l'hypoténuse ou d'un côté de l'angle droit
   * @param {string} [A = 'A'] Nom du sommet de l'angle droit
   * @param {string} [B = 'B'] Nom d'une extrémité de l'hypoténuse (AB étant éventuellement la longueur du côté droit à chercher)
   * @param {string} [C = 'C'] Nom de l'autre extrémité de l'hypoténuse
   * @param {boolean} [rechercheHypotenuse = true] Si true, la rédaction concerne la recherche de l'hypoténuse. Sinon, la rédaction concerne la rédaction d'un côté de l'angle droit
   * @param {number} [AB = 3] Longueur AB
   * @param {number} [AC = 4] Longueur AC
   * @param {number} [BC = 5] Longueur BC
   * @param {string}  [unite = 'cm'] Unité de la longueur recherchée
   * @param {string} [couleurReponse = '#f15929'] Couleur de la réponse : du type 'blue' ou du type '#f15929'
   * @example RedactionPythagore()
   * // Crée la rédaction du théorème de Pythagore dans un triangle ABC rectangle en A de dimensions 3-4-5 cm dont on recherche la longueur de l'hypoténuse.
   * @example RedactionPythagore('M','N','P',false,reponse,5,13,'dm')
   * // Crée la rédaction du théorème de Pythagore dans un triangle MNP rectangle en M de dimensions reponse-5-13 dm dont on recherche la longueur de MN.
   * // reponse doit être fournie à la fonction, elle n'est pas calculée par la fonction.
   * @author Eric Elter
   * @return {[string, string]} // Le premier élément du tableau est la rédaction complète, le second élément du tableau est le signe égal (ou arrondi) qui peut être utilisé si besoin pour introduire l'interactif.
   */
export function RedactionPythagore (A = 'A', B = 'B', C = 'C', rechercheHypotenuse = true, AB = 3, AC = 4, BC = 5, unite = 'cm', couleurReponse = '#f15929') {
  let texte, signeEgal
  texte = `Le triangle $${A + B + C}$ est rectangle en $${A}$ donc d'après le théorème de Pythagore, on a : `
  texte += `<br> $${B + C}^2=${A + B}^2+${A + C}^2$`
  if (rechercheHypotenuse) {
    texte += `<br> $${B + C}^2=${texNombre(AB)}^2+${texNombre(AC)}^2$`
    texte += `<br> $${B + C}^2=${texNombrec(AB ** 2 + AC ** 2)}$`
    texte += `<br> $${B + C}=\\sqrt{${texNombrec(AB ** 2 + AC ** 2)}}$`
    if (calcul(Math.sqrt(AB ** 2 + AC ** 2), 1) === calcul(Math.sqrt(AB ** 2 + AC ** 2), 5)) signeEgal = '='
    else signeEgal = '\\approx'
    texte += `<br> Donc $${B + C} ${signeEgal} ${miseEnEvidence(texNombre(BC), couleurReponse)}$ ${texteEnCouleurEtGras(unite, couleurReponse)}`
  } else {
    texte += `<br> D'où  $${A + B}^2=${B + C}^2-${A + C}^2$.`
    texte += `<br> $${A + B}^2=${texNombre(BC)}^2-${texNombre(AC)}^2$`
    texte += `<br> $${A + B}^2=${texNombrec(BC ** 2 - AC ** 2)}$`
    texte += `<br> $${A + B}=\\sqrt{${texNombrec(BC ** 2 - AC ** 2)}}$`
    if (calcul(Math.sqrt(BC ** 2 - AC ** 2), 1) === calcul(Math.sqrt(BC ** 2 - AC ** 2), 5)) signeEgal = '='
    else signeEgal = '\\approx'
    texte += `<br> Donc $${A + B} ${signeEgal} ${miseEnEvidence(texNombre(AB), couleurReponse)}$ ${texteEnCouleurEtGras(unite, couleurReponse)}`
  }
  return [texte, signeEgal]
}
