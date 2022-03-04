import { add, number, multiply } from 'mathjs'
import { barycentre, latexParCoordonnees, latexParPoint, milieu, point, polygone, segment } from './2d'
import { fraction } from './fractions'
import { arrondi, calcul } from './outils'

export function texProba (proba, rationnel, precision) {
  return rationnel ? fraction(proba).toLatex() : number(arrondi(proba, precision)).toString().replace('.', '{,}')
}
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
  constructor ({ nom, proba, enfants, rationnel, visible, alter, racine } = {}) {
    this.racine = racine !== undefined ? Boolean(racine) : false
    this.enfants = enfants !== undefined ? Array(...enfants) : []
    this.nom = nom !== undefined ? String(nom) : ''
    this.rationnel = rationnel !== undefined ? Boolean(rationnel) : true
    this.proba = proba !== undefined ? (rationnel ? fraction(proba) : number(proba)) : 0
    this.visible = visible !== undefined ? visible : true
    this.alter = alter !== undefined ? String(alter) : ''
    this.taille = 0
    this.pos = 0
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
    const monArbre = []
    for (const arbre of this.enfants) {
      if (arbre.nom === nom) return [arbre]
      else {
        monArbre.push(...arbre.getFils(nom))
      }
    }
    return monArbre
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
  getProba (nom, rationnel) {
    let p = rationnel ? fraction(0, 1) : 0
    let probaArbre = rationnel ? fraction(0, 1) : 0
    if (this.nom === nom) return (rationnel || this.rationnel) ? fraction(this.proba) : number(this.proba)
    else {
      for (const arbre of this.enfants) {
        if (arbre.nom === nom) p = add(p, (rationnel || this.rationnel) ? fraction(arbre.proba) : number(arbre.proba))
        else {
          if (rationnel) {
            probaArbre = add(fraction(probaArbre), multiply(fraction(arbre.proba), fraction(arbre.getProba(nom, true))))
          } else {
            probaArbre = number(probaArbre) + number(multiply(arbre.proba, number(arbre.getProba(nom, false))))
          }
        }
      }
      p = add(p, (rationnel || this.rationnel) ? fraction(probaArbre) : number(probaArbre))
    }
    return rationnel ? fraction(p) : number(p)
  }

  // méthode pour compter les descendants de l'arbre (le nombre de feuilles terminales).
  branches () {
    let nbBranches = 0
    if (this.enfants.length === 0) return 1
    else {
      for (const enfant of this.enfants) {
        nbBranches += enfant.branches()
      }
    }
    return nbBranches
  }

  // Methode à appeler avant de représenter l'arbre car elle va récursivement définir toutes les tailles...
  setTailles () {
    try {
      this.taille = this.branches()
      for (const arbre of this.enfants) {
        arbre.setTailles()
      }
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }

  /**
   * xOrigine et yOrigine définissent le point de référence de l'arbre... c'est un angle du cadre dans lequel l'arbre est construit par la position de la racine
   * decalage vaut 0 lors de l'appel initial... cette valeur est modifiée pendant le parcours de l'arbre.
   * echelle est à fixé à 3 si on utilise des fractions et peut être déscendu à 2 si on utilise des nombres décimaux... echelle peut être décimal.
   * vertical est un booléen. Si true, alors l'arbre sera construit de bas en haut ou de haut en bas, sinon, il sera construit de gauche à droite ou de droite à gauche.
   * sens indique la direction de pousse : 1 positif, -1 négatif.
   */
  represente (xOrigine = 0, yOrigine = 0, decalage = 0, echelle = 1, vertical = false, sens = -1, tailleCaracteres) {
    tailleCaracteres = tailleCaracteres || 5
    const objets = []
    const A = point(vertical
      ? xOrigine
      : xOrigine + decalage + this.taille * echelle / 2
    , vertical
      ? yOrigine + decalage - this.taille * echelle / 2
      : yOrigine
    , '', 'center')
    const B = point(vertical
      ? xOrigine - sens * 5
      : xOrigine
    , vertical
      ? yOrigine
      : yOrigine - sens * 5
    )
    const labelA = latexParCoordonnees(this.nom, A.x + (vertical ? 0.5 * sens : 0), A.y + (vertical ? 0 : 0.5 * sens), 'black', 15 * this.nom.length, 20, 'white', tailleCaracteres)
    const positionProba = vertical ? barycentre(polygone(A, A, A, B, B), '', 'center') : milieu(A, B, '', 'center') // Proba au 2/5 de [AB] en partant de A.
    const probaA = this.visible
      ? latexParPoint(texProba(this.proba, this.rationnel, 2), positionProba, 'black', 20, 24, 'white', tailleCaracteres)
      : latexParPoint(this.alter, positionProba, 'black', 20, 24, 'white', tailleCaracteres)
    if (this.enfants.length === 0) {
      return [segment(B, A), labelA, probaA]
    } else {
      for (let i = 0; i < this.enfants.length; i++) {
        objets.push(...this.enfants[i].represente(vertical
          ? xOrigine + sens * 5
          : xOrigine + decalage + this.taille * echelle / 2
        , vertical
          ? yOrigine + decalage - this.taille * echelle / 2
          : yOrigine + sens * 5
        , vertical
          ? calcul(echelle * ((this.enfants.length / 2 - i) * this.enfants[i].taille))
          : calcul(echelle * ((i - this.enfants.length / 2) * this.enfants[i].taille)),
        echelle, vertical, sens, tailleCaracteres))
      }
      if (this.racine) {
        objets.push(labelA)
      } else {
        objets.push(segment(B, A), labelA, probaA)
      }
    }
    return objets
  }
}
