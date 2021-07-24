import { randint } from '../../modules/outils'

const sommeEntiers = {}
export default sommeEntiers
const a = randint(2, 5) * 10 + randint(5, 9)
const b = randint(1, 4) * 10 + randint(6, 9)

sommeEntiers.titre = "Somme d'entiers"
sommeEntiers.enonce = `$${a}+${b}$`
// sommeEntiers.propositions = [`...`, `...`] // Uniquement si de type QCM
sommeEntiers.correction = `$${a}+${b}=${a + b}$` // Correction détaillée
sommeEntiers.reponse = a + b // La réponse brute pour la version interactive
sommeEntiers.formatReponse = 'numerique' // Fraction, Durée, Calcul littéral... ce paramètre sera utilisé pour l'affichage du champ de réponse et pour sa vérification
sommeEntiers.tempsParDefaut = 10 // Temps par défaut si l'exercice est en mode chronométré. Pertinent ?
sommeEntiers.taillePolice = 14 // S'il faut l'adapter. Pertinent ?
