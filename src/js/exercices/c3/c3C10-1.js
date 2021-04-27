import Tables_de_multiplications from '../6e/_Tables_de_multiplications.js'
export const titre = 'Tables de multiplications'

/**
 * Lire des nombres déciamux sur une portion de droite graduée
 * Une question demande la forme décimale, une autre, la partie entière plus la fraction décimale, et une troisième demande une seule fraction décimale.
 * ref 6N23-2
 *
 * @Auteur Jean-Claude Lhote
 */
export default function Tables_de_multiplicationsCM() {
    Tables_de_multiplications.call(this);
    this.titre = titre;
  this.sup2=1
}
