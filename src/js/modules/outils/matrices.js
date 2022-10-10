/**
 *
 * @param {array} matrice M tableau 3x3 nombres
 * @param {array} vecteur A tableau 3 nombres
 * Fonction pouvant être utilisée en 2d avec des coordonnées homogènes
 * elle retourne le vecteur [x,y,z] résultat de M.A
 * @author Jean-Claude Lhote
 */

export function produitMatriceVecteur3x3 (matrice, vecteur) { // matrice est un tableau 3x3 sous la forme [[ligne 1],[ligne 2],[ligne 3]] et vecteur est un tableau de 3 nombres [x,y,z]
  const resultat = [0, 0, 0]
  for (let j = 0; j < 3; j++) { // Chaque ligne de la matrice
    for (let i = 0; i < 3; i++) { // On traite la ligne i de la matrice -> résultat = coordonnée i du vecteur résultat
      resultat[j] += matrice[j][i] * vecteur[i]
    }
  }
  return resultat
}
/**
   *
   * @param {array} matrice1 Matrice A
   * @param {array} matrice2 Matrice B
   * retourne la matrice A.B
   * @author Jean-Claude Lhote
   */

export function produitMatriceMatrice3x3 (matrice1, matrice2) { // les deux matrices sont des tableaux 3x3  [[ligne 1],[ligne 2],[ligne 3]] et le résultat est de la même nature.
  const resultat = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) { resultat[j][i] += matrice1[j][k] * matrice2[k][i] }
    }
  }
  return resultat
}
/**
   *
   * @param {array} point
   * calcule les coordonnées d'un point donné par ses coordonnées en repère orthonormal en repère (O,I,J) tel que IOJ=60°
   * @author Jean-Claude Lhote
   */
export function changementDeBaseOrthoTri (point) {
  if (point.length === 2) point.push(1)
  return produitMatriceVecteur3x3([[1, -Math.cos(Math.PI / 3) / Math.sin(Math.PI / 3), 0], [0, 1 / Math.sin(Math.PI / 3), 0], [0, 0, 1]], point)
}
/**
   *
   * @param {array} point
   * Changement de base inverse de la fonction précédente
   * @author Jean-CLaude Lhote
   */
export function changementDeBaseTriOrtho (point) {
  if (point.length === 2) point.push(1)
  return produitMatriceVecteur3x3([[1, Math.cos(Math.PI / 3), 0], [0, Math.sin(Math.PI / 3), 0], [0, 0, 1]], point)
}

/**
  *
  * @param {number} transformation Entier déterminant la transformation voulue
  ** 1=symétrie / passant par O
  **2=symétrie \ passant par O
  **3=symétrie _ passant par O
  **4=symétrie | passant par O
  **5= rotation 90° anti-horaire centre O
  **6= rotation 90° horaire centre O
  **7= symétrie centrale centre O
  **11= rotation 60° anti-horaire centre O
  **12= rotation 60° horaire centre O
  **13= rotation 120° anti-horaire centre O
  **14= rotation 120° horaire centre O
  **8= translation coordonnées de O = vecteur de translation
  **9= homothétie. centre O rapport k
  **10= homothétie. centre O rapport 1/k
  * @param {array} pointA Point dont on cherche l'image
  * @param {array} pointO Centre du repère local pour les symétries, centre pour les rotations et les homothéties
  * @param {array} vecteur Vecteur de la translation
  * @param {number} rapport rapport d'homothétie
  * @author Jean-Claude Lhote
  */
export function imagePointParTransformation (transformation, pointA, pointO, vecteur = [], rapport = 1) { // pointA,centre et pointO sont des tableaux de deux coordonnées
  // on les rends homogènes en ajoutant un 1 comme 3ème coordonnée)
  // nécessite d'être en repère orthonormal...
  // Point O sert pour les rotations et homothéties en tant que centre (il y a un changement d'origine du repère en O pour simplifier l'expression des matrices de transformations.)

  const matriceSymObl1 = matriceCarree([[0, 1, 0], [1, 0, 0], [0, 0, 1]]) // x'=y et y'=x
  const matriceSymxxprime = matriceCarree([[1, 0, 0], [0, -1, 0], [0, 0, 1]]) // x'=x et y'=-y
  const matriceSymYyPrime = matriceCarree([[-1, 0, 0], [0, 1, 0], [0, 0, 1]]) // x'=-x et y'=y
  const matriceSymObl2 = matriceCarree([[0, -1, 0], [-1, 0, 0], [0, 0, 1]]) // x'=-y et y'=-x
  const matriceQuartDeTourDirect = matriceCarree([[0, -1, 0], [1, 0, 0], [0, 0, 1]]) // x'=-y et y'=x
  const matriceQuartDeTourIndirect = matriceCarree([[0, 1, 0], [-1, 0, 0], [0, 0, 1]]) // x'=y et y'=-x
  const matriceSymCentrale = matriceCarree([[-1, 0, 0], [0, -1, 0], [0, 0, 1]]) // x'=-x et y'=-y
  const matriceRotation60Direct = matriceCarree([[0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]])
  const matriceRotation60Indirect = matriceCarree([[0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), 0.5, 0], [0, 0, 1]])
  const matriceRotation120Direct = matriceCarree([[-0.5, -Math.sin(Math.PI / 3), 0], [Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]])
  const matriceRotation120Indirect = matriceCarree([[-0.5, Math.sin(Math.PI / 3), 0], [-Math.sin(Math.PI / 3), -0.5, 0], [0, 0, 1]])

  let pointA1 = [0, 0, 0]
  let pointA2 = [0, 0, 0]

  if (pointA.length === 2) pointA.push(1)
  const x2 = pointO[0] // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et point d'intersection des axes))
  const y2 = pointO[1]
  const u = vecteur[0] // (u,v) vecteur de translation.
  const v = vecteur[1]
  const k = rapport // rapport d'homothétie

  const matriceChangementDeRepere = matriceCarree([[1, 0, x2], [0, 1, y2], [0, 0, 1]])
  const matriceChangementDeRepereInv = matriceCarree([[1, 0, -x2], [0, 1, -y2], [0, 0, 1]])
  const matriceTranslation = matriceCarree([[1, 0, u], [0, 1, v], [0, 0, 1]])
  const matriceHomothetie = matriceCarree([[k, 0, 0], [0, k, 0], [0, 0, 1]])
  const matriceHomothetie2 = matriceCarree([[1 / k, 0, 0], [0, 1 / k, 0], [0, 0, 1]])

  let matrice

  switch (transformation) {
    case 1:
      matrice = matriceSymObl1.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 2:
      matrice = matriceSymObl2.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 3:
      matrice = matriceSymxxprime.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 4:
      matrice = matriceSymYyPrime.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 5:
      matrice = matriceQuartDeTourDirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 6:
      matrice = matriceQuartDeTourIndirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 7:
      matrice = matriceSymCentrale.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 11:
      matrice = matriceRotation60Direct.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 12:
      matrice = matriceRotation60Indirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 13:
      matrice = matriceRotation120Direct.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 14:
      matrice = matriceRotation120Indirect.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 8:
      matrice = matriceTranslation.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 9:
      matrice = matriceHomothetie.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
    case 10:
      matrice = matriceHomothetie2.multiplieMatriceCarree(matriceChangementDeRepereInv)
      break
  }
  pointA1 = matrice.multiplieVecteur(pointA)
  pointA2 = matriceChangementDeRepere.multiplieVecteur(pointA1)
  return pointA2
}
/**
 *  Classe MatriceCarree
 * Générateur de Matrice :
 * Si l'argument est un nombre, alors on s'en sert pour définir la taille de la matrice carrée qu'on rempli de zéros.
 * Sinon, c'est le tableau qui sert à remplir la Matrice
 *  @author Jean-Claude Lhote
 */
export class MatriceCarree {
  constructor (table) {
    let ligne
    this.table = []
    if (typeof (table) === 'number') {
      this.dim = table // si c'est un nombre qui est passé en argument, c'est la taille, et on rempli la table de 0
      for (let i = 0; i < this.dim; i++) {
        ligne = []
        for (let j = 0; j < this.dim; j++) { ligne.push(0) }
        this.table.push(ligne)
      }
    } else { // si l'argument est une table, on la copie dans this.table et sa longueur donne la dimension de la matrice
      this.dim = table.length
      this.table = table.slice()
    }
    /**
     * Méthode : Calcule le déterminant de la matrice carrée
     * @author Jean-Claude Lhote
     */
    this.determinant = function () {
      const n = this.dim // taille de la matrice = nxn
      let determinant = 0; let M
      for (let i = 0; i < n; i++) { // on travaille sur la ligne du haut de la matrice :ligne 0 i est la colonne de 0 à n-1
        // if (n==1) determinant=this.table[0][0]
        if (n === 2) { determinant = this.table[0][0] * this.table[1][1] - this.table[1][0] * this.table[0][1] } else {
          M = this.matriceReduite(0, i)
          determinant += ((-1) ** i) * this.table[0][i] * M.determinant()
        }
      }
      return determinant
    }
    /**
     * Méthode : m=M.matriceReduite(l,c) retourne une nouvelle matrice obtenue à partir de la matrice M (carrée) en enlevant la ligne l et la colonne c
     * (Utilisée dans le calcul du déterminant d'une matrice carrée.)
     * @author Jean-Claude Lhote
     */
    this.matriceReduite = function (l, c) {
      const resultat = []; let ligne
      for (let i = 0; i < this.table.length; i++) {
        if (i !== l) {
          ligne = []
          for (let j = 0; j < this.table.length; j++) {
            if (j !== c) ligne.push(this.table[i][j])
          }
          if (ligne.length > 0) resultat.push(ligne)
        }
      }
      return matriceCarree(resultat)
    }
    /**
     * Méthode : m=M.cofacteurs() retourne la matrice des cofacteurs de M utilisée dans l'inversion de M.
     */
    this.cofacteurs = function () { // renvoie la matrice des cofacteurs.
      const n = this.dim; let resultat = []; let ligne; let M
      if (n > 2) {
        for (let i = 0; i < n; i++) {
          ligne = []
          for (let j = 0; j < n; j++) {
            M = this.matriceReduite(i, j)
            ligne.push((-1) ** (i + j) * M.determinant())
          }
          resultat.push(ligne)
        }
      } else if (n === 2) {
        resultat = [[this.table[1][1], -this.table[1][0]], [-this.table[0][1], this.table[0][0]]]
      } else return false
      return matriceCarree(resultat)
    }
    /**
     * Méthode : m=M.transposee() retourne la matrice transposée de M utilisée pour l'inversion de M
     */
    this.transposee = function () { // retourne la matrice transposée
      const n = this.dim; const resultat = []; let ligne
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          ligne.push(this.table[j][i])
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }
    /**
     * m=M.multiplieParReel(k) Multiplie tous les éléments de la matrice par k. Utilisée pour l'inversion de M
     * @param {*} k
     */
    this.multiplieParReel = function (k) { // retourne k * la matrice
      const n = this.dim; const resultat = []; let ligne
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          ligne.push(k * this.table[i][j])
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }

    /**
     * Méthode : Calcule le produit d'une matrice nxn par un vecteur 1xn (matrice colonne): retourne un vecteur 1xn.
     *
     */
    this.multiplieVecteur = function (V) { // Vecteur est un simple array pour l'instant
      const n = this.dim; const resultat = []; let somme
      if (n === V.length) {
        for (let i = 0; i < n; i++) {
          somme = 0
          for (let j = 0; j < n; j++) {
            somme += this.table[i][j] * V[j]
          }
          resultat.push(somme)
        }
        return resultat
      } else return false
    }
    /**
     * Méthode : m=M.inverse() Retourne la matrice inverse de M. Utilisation : résolution de systèmes linéaires
     */
    this.inverse = function () { // retourne la matrice inverse (si elle existe)
      const d = this.determinant()
      if (!egal(d, 0)) {
        return this.cofacteurs().transposee().multiplieParReel(1 / d)
      } else return false
    }
    /**
     * Méthode : m=M.multiplieMatriceCarree(P) : retourne m = M.P
     *
     */
    this.multiplieMatriceCarree = function (M) {
      const n = this.dim; const resultat = []; let ligne; let somme
      for (let i = 0; i < n; i++) {
        ligne = []
        for (let j = 0; j < n; j++) {
          somme = 0
          for (let k = 0; k < n; k++) somme += this.table[i][k] * M.table[k][j]
          ligne.push(somme)
        }
        resultat.push(ligne)
      }
      return matriceCarree(resultat)
    }
  }
}

/**
   * Crée une nouvelle instance de la classe MatriceCarree à partir d'un tableau.
   *
   */
export function matriceCarree (table) {
  return new MatriceCarree(table)
}

// Fin de la classe MAtriceCarree
