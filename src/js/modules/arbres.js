// classe pour faire des arbres de probabilités
export class Arbre {
  constructor (parent, nom, proba) {
    this.parent = parent
    this.enfants = []
    this.nom = nom
    this.proba = proba
  }

  ajouteFils (nom, proba) {
    this.enfants.push(new Arbre(this, nom, proba))
  }

  getFils (nom) {
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return arbre
    }
    return null
  }

  getFilsProba (nom) {
    return this.getFils(nom).proba
  }
}
