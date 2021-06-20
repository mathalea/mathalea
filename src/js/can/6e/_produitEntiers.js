import { randint } from '../../modules/outils'

const produitEntiers = {}
export default produitEntiers
const a = randint(2, 9) * 10
const b = randint(2, 9)

produitEntiers.titre = "Produit d'entiers"
produitEntiers.enonce = `$${a}\\times${b}$`
// produitEntiers.propositions = [`...`, `...`] // Uniquement si de type QCM
produitEntiers.correction = `$${a}\\times${b}=${a * b}` // Correction détaillée
produitEntiers.reponse = a * b // La réponse brute pour la version interactive
produitEntiers.formatReponse = 'numerique' // Fraction, Durée, Calcul littéral... ce paramètre sera utilisé pour l'affichage du champ de réponse et pour sa vérification
produitEntiers.tempsParDefaut = 10 // Temps par défaut si l'exercice est en mode chronométré. Pertinent ?
produitEntiers.taillePolice = 14 // S'il faut l'adapter. Pertinent ?
