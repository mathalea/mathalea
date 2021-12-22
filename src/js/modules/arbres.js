import { number, fraction, multiply } from 'mathjs'

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
  constructor (parent, nom, proba, rationnel = true) {
    this.parent = parent
    this.enfants = []
    this.nom = nom
    this.rationnel = rationnel
    this.proba = rationnel ? fraction(proba) : number(proba)
  }

  // questionnement : est-ce qu'on vérifie à chaque ajout que la somme des probabilités ne dépasse pas 1 ?
  /**
   * @param {String} nom Le nom de cet Arbre-fils
   * @param {Number} proba La probabilité d'aller à ce fils depuis le père.
   * @returns l'Arbre-fils créé
   * Exemple : const sylvestre = pin.setFils('sylvestre', 0.8) un 'pin' a une probabilité de 0.8 d'être 'sylvestre'.
   */
  setFils (nom, proba, rationnel) {
    const arbre = new Arbre(this, nom, proba, (rationnel || this.rationnel))
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
    return arbre ? arbre.proba : undefined
  }

  // est-ce qu'on vérifie si la somme des probabilités ne dépasse pas 1 ?
  /**
   *
   * @param {String} nom Le nom de l'Arbre recherché dans les fils
   * @param {Number} proba La probabilité du fils pour le père.
   * @returns l'Arbre-fils.
   */
  setFilsProba (nom, proba, rationnel) { // si le fils nommé nom existe, on fixe sa proba (en gros, on la modifie)
    let arbre = this.getFils(nom)
    if (arbre) {
      arbre.proba = (rationnel || this.rationnel) ? fraction(proba) : number(proba)
    } else { // sinon on ajoute ce fils.
      arbre = new Arbre(this, nom, proba, (rationnel || this.rationnel))
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
  getProba (nom, proba, rationnel) {
    if (proba === undefined) {
      if (rationnel || this.rationnel) {
        proba = fraction(this.proba)
      } else {
        proba = number(this.proba)
      }
    } else {
      if (rationnel || this.rationnel) {
        proba = fraction(proba)
      } else {
        proba = number(proba)
      }
    }
    let probaArbre
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return (rationnel || this.rationnel) ? fraction(multiply(proba, arbre.proba)) : number(multiply(proba, arbre.proba))
      else {
        probaArbre = arbre.getProba(nom)
        if (probaArbre !== undefined) return (rationnel || this.rationnel) ? fraction(multiply(probaArbre, proba)) : number(multiply(probaArbre, proba))
      }
    }
    return undefined
  }

  branches () {
    let nbBranches = 1
    if (this.enfants.length === 0) return 1
    else {
      for (const enfant of this.enfants) {
        nbBranches += enfant.branches()
      }
    }
    return nbBranches
  }
}
