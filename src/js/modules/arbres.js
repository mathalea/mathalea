// classe pour faire des arbres de probabilités
export class Arbre {
  constructor (parent, nom, proba) {
    this.parent = parent
    this.enfants = []
    this.nom = nom
    this.proba = proba
  }

  // questionnement : est-ce qu'on vérifie à chaque ajout que la somme des probabilités ne dépasse pas 1 ?
  setFils (nom, proba) {
    this.enfants.push(new Arbre(this, nom, proba))
  }

  getFils (nom) {
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return arbre
    }
    return false
  }

  getFilsProba (nom) {
    const arbre = this.getFils(nom)
    return arbre ? arbre.proba : 0
  }

  // est-ce qu'on vérifie si la somme des probabilités ne dépasse pas 1 ?
  setFilsProba (nom, proba) { // si le fils nommé nom existe, on fixe sa proba (en gros, on la modifie)
    const arbre = this.getFils(nom)
    if (arbre) {
      arbre.proba = proba
      return true
    } else { // sinon on ajoute ce fils.
      this.enfants.push(new Arbre(this, nom, proba))
    }
  }

  // Essai de fonction récursive pour calculer la probabilité d'un événement.
  /* getProba (nom, proba) {
    let p
    if (this.enfants.length !== 0) {
      for (const arbre of this.enfants) {
        if (arbre.nom === nom) p = proba * arbre.proba
        }
        return arbre.getProba(nom, proba)
      }
    } else {
      return 0
    }
  } */
}
