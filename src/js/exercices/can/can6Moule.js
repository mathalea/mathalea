import { randint, texNombrec } from '../../modules/outils'

const doubleEtMoitie = {}
export default doubleEtMoitie
const a = randint(1, 25) // variables aléatoires

doubleEtMoitie.titre = 'Double et moitié'
doubleEtMoitie.enonce = `Le double d'un nombre vaut ${2 * a}, combien vaut sa moitié ?`
// doubleEtMoitie.propositions = [`...`, `...`] // Uniquement si de type QCM
doubleEtMoitie.correction = `Le nombre est ${a}, sa moitié est ${texNombrec(a / 2)}.` // Correction détaillée
doubleEtMoitie.reponse = a // La réponse brute pour la version interactive (exemple produit de deux entiers)
doubleEtMoitie.formatReponse = 'numerique' // Fraction, Durée, Calcul littéral... ce paramètre sera utilisé pour l'affichage du champ de réponse et pour sa vérification
doubleEtMoitie.tempsParDefaut = 10 // Temps par défaut si l'exercice est en mode chronométré. Pertinent ?
doubleEtMoitie.taillePolice = 14 // S'il faut l'adapter. Pertinent ?
