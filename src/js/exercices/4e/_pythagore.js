import { calcul, miseEnEvidence, texNombre, texNombrec, texteEnCouleurEtGras } from '../../modules/outils'

export function RedactionPythagore (A = 'A', B = 'B', C = 'C', rechercheHypotenuse = true, AB = 3, AC = 4, BC = 5, unite = 'cm', couleurReponse = '#f15929') {
  let texte, signeEgal
  texte = `Le triangle $${A + B + C}$ est rectangle en $${A}$ donc d'après le théorème de Pythagore, on a : `
  texte += `$${B + C}^2=${A + B}^2+${A + C}^2$`
  if (rechercheHypotenuse) {
    texte += `<br>$${B + C}^2=${texNombre(AB)}^2+${texNombre(AC)}^2=${texNombrec(AB ** 2 + AC ** 2)}$`
    texte += `<br> $${B + C}=\\sqrt{${texNombrec(AB ** 2 + AC ** 2)}}$`
    if (calcul(Math.sqrt(AB ** 2 + AC ** 2), 1) === calcul(Math.sqrt(AB ** 2 + AC ** 2), 5)) signeEgal = '='
    else signeEgal = '\\approx'
    texte += `<br> $${B + C} ${signeEgal} ${miseEnEvidence(texNombre(BC), couleurReponse)}$ ${texteEnCouleurEtGras(unite, couleurReponse)}`
  } else {
    texte += `<br>D'où  $${A + B}^2=${B + C}^2-${A + C}^2$`
    texte += `<br> $${A + B}^2=${texNombre(BC)}^2-${texNombre(AC)}^2=${texNombrec(BC ** 2 - AC ** 2)}$`
    texte += `<br> $${A + B}=\\sqrt{${texNombrec(BC ** 2 - AC ** 2)}}$`
    if (calcul(Math.sqrt(BC ** 2 - AC ** 2), 1) === calcul(Math.sqrt(BC ** 2 - AC ** 2), 5)) signeEgal = '='
    else signeEgal = '\\approx'
    texte += `<br> $${A + B} ${signeEgal} ${miseEnEvidence(texNombre(AB), couleurReponse)}$ ${texteEnCouleurEtGras(unite, couleurReponse)}`
  }
  return [texte, signeEgal]
}
