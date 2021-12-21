/**
 * classe pour faire des arbres de probabilités
 * @author Jean-Claude Lhote
 * la classe Arbre permet de définir un arbre de probabilité.
 * à son sommet, il y a un Arbre qui parent = null
 * Ses enfants sont eux-mêmes Arbre(s) qui l'ont comme parent.
 * Un Arbre possède un nom (de type string) qui l'identifie de façon unique (c'est important si on veut éviter des proba aléatoires)
 * chaque Arbre possède une proba. C'est la probabilité qu'on a d'atteindre cet arbre à partir de son parent.
 * Exemple: const pin = new Arbre(null, 'pin', 1) (c'est une forêt de pins)
 */
export class Arbre {
  constructor (parent, nom, proba) {
    this.parent = parent
    this.enfants = []
    this.nom = nom
    this.proba = proba
  }

  // questionnement : est-ce qu'on vérifie à chaque ajout que la somme des probabilités ne dépasse pas 1 ?
  /**
   * @param {String} nom Le nom de cet Arbre-fils
   * @param {Number} proba La probabilité d'aller à ce fils depuis le père.
   * @returns l'Arbre-fils créé
   * Exemple : const sylvestre = pin.setFils('sylvestre', 0.8) un 'pin' a une probabilité de 0.8 d'être 'sylvestre'.
   */
  setFils (nom, proba) {
    const arbre = new Arbre(this, nom, proba)
    this.enfants.push(arbre)
    return arbre
  }

  /**
   * Fonction récursive qui cherche dans la descendance complète un arbre nommé.
   * @param {String} nom Le nom de l'Arbre recherché dans les fils
   * @returns l'Arbre descendant portant ce nom.
   * Exemple : const unArbre = pin.getFils('sylvestre')
   */
  getFils (nom) {
    let monArbre
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return arbre
      else {
        monArbre = arbre.getFils(nom)
        if (monArbre) return monArbre
      }
    }
    return false
  }

  /**
 * @param {String} nom Le nom de l'Arbre recherché dans les fils
 * @returns La probabilité du fils pour le père.
 * Exemple : const p = Pin.getFilsProba('sylvestre') // ->  0.8
 * contrairement à la méthode getProba() celle-ci ne va pas plus loin que les fils direct.
 * Pour chercher dans la descendance complète il faudra utiliser getProba().
 */
  getFilsProba (nom) {
    const arbre = this.getFils(nom)
    return arbre ? arbre.proba : 0
  }

  // est-ce qu'on vérifie si la somme des probabilités ne dépasse pas 1 ?
  /**
   *
   * @param {String} nom Le nom de l'Arbre recherché dans les fils
   * @param {Number} proba La probabilité du fils pour le père.
   * @returns l'Arbre-fils.
   */
  setFilsProba (nom, proba) { // si le fils nommé nom existe, on fixe sa proba (en gros, on la modifie)
    let arbre = this.getFils(nom)
    if (arbre) {
      arbre.proba = proba
    } else { // sinon on ajoute ce fils.
      arbre = new Arbre(this, nom, proba)
      this.enfants.push(arbre)
    }
    return arbre
  }

  // Essai de fonction récursive pour calculer la probabilité d'un événement.
  /**
   *
   * @param {String} nom Le nom d'un descendant ou pas
   * @param {Number} proba facultatif : Si elle est fixée à 1, alors on obtient la probabilité conditionnelle.
   * Si elle n'est pas fixée, c'est la probabilité de l'arbre duquel on part qui est pris pour le calcul.
   * @returns Probabilité conditionnelle ou pas d'atteindre l'arbre nommé à partir du père.
   * Exemple : si pin.getFilsProba('sylvestre')===0.8 et si sylvestre.getFilsProba('malade')===0.5
   * alors pin.getProba('malade')===0.4 et sylvestre.getProba('malade')===0.4 aussi ! par contre
   * sylvestre.getProba('malade', 1)= 0.5
   */
  getProba (nom, proba) {
    if (proba === undefined) proba = this.proba
    let probaArbre
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return proba * arbre.proba
      else {
        probaArbre = arbre.getProba(nom)
        if (probaArbre !== undefined) return probaArbre * proba
      }
    }
    return undefined
  }
}
/**
 * fonction pour tester les méthodes ci-dessus.
 * @param {String} nom Nom d'un arbre pour tester
 */
function testArbre (nom) {
  const pin = new Arbre(null, 'Omega', 1)
  const sylvestre = pin.setFils('sylvestre', 0.8)
  const maritime = pin.setFils('maritime', 0.3)
  const B = sylvestre.setFils('B', 0.5)
  const A = sylvestre.setFils('A', 0.5)
  const C = maritime.setFils('C', 0.4)
  const D = maritime.setFils('D', 0.6)
  const E = D.setFils('E', 0.25)
  const F = D.setFils('F', 0.75)
  const G = F.setFils('G', 0.5)
  console.log(pin.getFils(nom))
  console.log(pin.getProba(nom))
  console.log(sylvestre.getProba(nom, 1)) // on met 1 pour calculer la proba conditionnelle ici le pin est sylvestre. Si nom ==='A', alors le résultat est 0.5
  console.log(sylvestre.getProba(nom)) // on prend la proba sylvestre = 0.8, c'est donc equivalent à pin.getProba(nom). Si nom ==='A' alors le résultat est 0.8*0.5 = 0.4
  console.log(maritime.getProba(nom))
  console.log(B.getProba(nom))
}
