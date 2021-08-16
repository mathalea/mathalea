import { calcul, randint } from '../../modules/outils'

const somme4entiersMaries = {}
export default somme4entiersMaries
const a = randint(1, 9)
const b = randint(1, 9, a)
const c = randint(3, 7) * 10
const d = randint(10, 15) * 10 - c
const resultat = calcul(2 * (c + d))
somme4entiersMaries.titre = 'Somme de 4 entiers qui se marient bien'
somme4entiersMaries.enonce = `$${c - a} + ${d + b} + ${c + a} + ${d - b}$`
// somme4entiersMaries.propositions = [`...`, `...`] // Uniquement si de type QCM
somme4entiersMaries.correction = `$${c - a} + ${c + a} + ${d + b}  + ${d - b} = ${2 * c} + ${2 * d}= ${2 * (c + d)}$`
somme4entiersMaries.reponse = resultat
somme4entiersMaries.formatReponse = 'numerique' // Fraction, Durée, Calcul littéral... ce paramètre sera utilisé pour l'affichage du champ de réponse et pour sa vérification
somme4entiersMaries.tempsParDefaut = 10 // Temps par défaut si l'exercice est en mode chronométré. Pertinent ?
somme4entiersMaries.taillePolice = 14 // S'il faut l'adapter. Pertinent ?
