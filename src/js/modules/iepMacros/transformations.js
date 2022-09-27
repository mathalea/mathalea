import { longueur, homothetie, vecteur, symetrieAxiale, milieu, rotation, translation } from '../2d.js'
import { randint, stringNombre } from '../outils.js'

/**
   *
   * @param {objet} p point dont on construit l'image et qui doit être tracé.
   * @param {objet} d axe de symétrie.
   * @param {string} nom nom de l'image
   * @param {objet} options couleur et couleurCodage
   * @author Liouba Leroux et Jean-Claude Lhote
   */
export function symetrieAxialePoint (p, d, nom, { couleur = this.couleur, couleurCodage = this.couleurCodage, codage = '//' } = {}) {
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  if (nom === undefined || nom === '') {
    nom = p.nom + "'"
  }
  const image = symetrieAxiale(p, d, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
  if (longueur(p, image) !== 0) {
    const M = milieu(p, image) // on crée le point milieu
    const N = rotation(p, M, 90)
    const D = rotation(N, M, 180)
    this.regleMasquerGraduations()
    this.perpendiculaireRegleEquerre2points3epoint(N, D, p)
    this.compasEcarter2Points(M, p)
    this.compasTracerArcCentrePoint(M, image)
    this.regleSegment(p, image)
    this.regleMasquer()
    this.equerreMasquer()
    this.segmentCodage(p, M, { codage: codage, couleur: couleurCodage })
    this.segmentCodage(image, M, { codage: codage, couleur: couleurCodage })
    this.crayonMasquer()
    this.compasMasquer()
  }
  this.pointCreer(image, { couleur: couleur, couleurLabel: couleur }) // on construit l'image
}

/**
   *
   * @param {objet} p  le point dont on veut construire l'image
   * @param {objet} centre le centre de la rotation
   * @param {number} angle l'angle de la rotation
   * @param {string} nom le nom de l'image (si pas précisé ce sera le nom de l'antécédent avec un ')
   * @param {objet} param4 options couleur et couleurCodage
   * @author Jean-Claude Lhote
   */
export const rotationPoint = function (p, centre, angle, nom, { couleur = this.couleur, couleurCodage = this.couleurCodage, codage = true } = {}) {
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  if (nom === undefined || nom === '') {
    nom = p.nom + "'"
  }
  const image = rotation(p, centre, angle, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
  this.regleSegment(centre, p) // On trace le support du rapporteur
  this.rapporteurMontrer(centre)
  this.rapporteurTracerDemiDroiteAngle(centre, p, angle) // On trace le deuxième côté
  this.regleMasquer()
  this.rapporteurMasquer()
  this.compasEcarter2Points(centre, p) // on prend l'écartement du compas
  this.compasTracerArcCentrePoint(centre, image) // On fait l'arc qui coupe la demi-droite
  this.compasMasquer()
  this.pointCreer(image, { couleur: couleur, couleurLabel: couleur }) // On marque le point image (qui est nommé)
  if (codage) {
    if (Math.abs(angle) === 90) {
      this.codageAngleDroit(p, centre, image, { couleur: couleurCodage })
    } else {
      this.angleCodage(p, centre, image, { couleur: couleurCodage })
      this.textePoint(Math.abs(angle) + '°', translation(homothetie(rotation(p, centre, angle / 2), centre, 1.3 / longueur(centre, p)), vecteur(-0.2, 0.5)))
    }
  }
}

//   /**
//  *
//  * @param {objet} p point dont on construit l'image et qui doit être tracé.
//  * @param {objet} d axe de symétrie.
//  * @param {string} nom nom de l'image
//  * @param {objet} options couleur et couleurCodage
//  * @author Liouba Leroux et Jean-Claude Lhote
//  */
//   this.symetrieAxialePoint = function (p, d, nom, { couleur = this.couleur, couleurCodage = this.couleurCodage, codage = '//' } = {}) {
//     this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
//     this.couleur = 'grey'
//     if (nom === undefined || nom === '') {
//       nom = p.nom + "'"
//     }
//     const image = symetrieAxiale(p, d, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
//     if (longueur(p, image) !== 0) {
//       const M = milieu(p, image) // on crée le point milieu
//       const N = rotation(p, M, 90)
//       const D = rotation(N, M, 180)
//       this.regleMasquerGraduations()
//       this.perpendiculaireRegleEquerre2points3epoint(N, D, p)
//       this.compasEcarter2Points(M, p)
//       this.compasTracerArcCentrePoint(M, image)
//       this.regleSegment(p, image)
//       this.regleMasquer()
//       this.equerreMasquer()
//       this.segmentCodage(p, M, { codage: codage, couleur: couleurCodage })
//       this.segmentCodage(image, M, { codage: codage, couleur: couleurCodage })
//       this.crayonMasquer()
//       this.compasMasquer()
//     }
//     this.pointCreer(image, { couleur: couleur, couleurLabel: couleur }) // on construit l'image
//   }

/**
   *
   * @param {objet} p  le point dont on veut construire l'image
   * @param {objet} le point de départ de la translation
   * @param {objet} le point d'arrivée de la translation
   * @param {string} nom le nom de l'image (si pas précisé ce sera le nom de l'antécédent avec un ')
   * @param {objet} param4 options couleur et couleurCodage
   * @author Jean-Claude Lhote
   */
export const translationPoint = function (p, A, B, nom, { couleur = 'black', couleurCodage = this.couleurCodage } = {}) {
  const v = vecteur(A, B)
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  if (nom === undefined || nom === '') {
    nom = p.nom + "'"
  }
  const image = translation(p, v, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
  if (longueur(A, p) !== 0) { // si le point de départ A est l'antécédent, alors le point d'arrivée B est l'image... pas besoin de construction
    this.compasEcarter2Points(A, p)
    this.compasTracerArcCentrePoint(B, image)
    this.compasEcarter2Points(A, B)
    this.compasTracerArcCentrePoint(p, image)
  }
  this.compasMasquer()
  this.pointCreer(image, { couleur: couleur, couleurLabel: couleur })
  const choix1 = randint(0, 4)
  const choix2 = randint(0, 4, choix1)
  const marques = ['/', '//', '///', 'O', '\\\\']
  const marque1 = marques[choix1]
  const marque2 = marques[choix2]
  this.couleur = 'green'
  this.traitRapide(p, image)
  this.traitRapide(A, B)
  this.segmentCodage(p, image, { codage: marque1, couleur: couleurCodage })
  this.segmentCodage(A, B, { codage: marque1, couleur: couleurCodage })
  this.couleur = 'red'
  this.traitRapide(B, image)
  this.traitRapide(A, p)
  this.segmentCodage(B, image, { codage: marque2, couleur: couleurCodage })
  this.segmentCodage(A, p, { codage: marque2, couleur: couleurCodage })
}

/**
   *
   * @param {objet} p  le point dont on veut construire l'image
   * @param {objet} centre le centre de symétrie
   * @param {string} nom le nom de l'image (si pas précisé ce sera le nom de l'antécédent avec un ')
   * @param {objet} param3 options couleur, couleurCodage et codage
   * @author Jean-Claude Lhote
   */
export const demiTourPoint = function (p, centre, nom, { couleur = 'black', couleurCodage = this.couleurCodage, codage = '//' } = {}) {
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  if (nom === undefined || nom === '') {
    nom = p.nom + "'"
  }
  const image = rotation(p, centre, 180, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
  this.compasEcarter2Points(centre, p)
  this.compasTracerArcCentrePoint(centre, image)
  this.compasMasquer()
  this.crayonDeplacer(p)
  this.regleSegment(p, image)
  this.couleur = couleur
  this.epaisseur = 2
  this.pointCreer(image, { couleur: couleur, couleurLabel: couleur }) // on construit l'image
  this.regleMasquer()
  this.crayonMasquer()
  this.segmentCodage(p, centre, { codage: codage, couleur: couleurCodage })
  this.segmentCodage(centre, image, { codage: codage, couleur: couleurCodage })
}

/**
   *
   * @param {objet} p polygone dont on doit construire l'image
   * @param {objet} centre de l'homothétie
   * @param {number} k rapport de l'homothétie
   * @param {array} noms tableau contenant les différents noms des sommets dans le même ordre que ceux de p. Si vide, alors on ajoute ' à ceux de p
   * @param {objet} param4 options (couleur)
   */
export const homothetiePoint = function (p, centre, k, nom, { couleur = this.couleur, positionTexte = { x: 0, y: 0 } } = {}) {
  this.epaisseur = 1 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  const couleurSave = this.couleur
  this.couleur = 'grey'
  let t
  if (nom === undefined || nom === '') {
    nom = p.nom + "'"
  }
  const image = homothetie(p, centre, k, nom) // on définit le point image (pour le viser avec la règle on ajoute une apostrophe au nom)
  if (k > 0) {
    t = this.textePosition(`Comme le rapport est positif alors les points ${p.nom} et ${image.nom} sont du même côté de ${centre.nom}`, positionTexte.x, positionTexte.y, { taille: 15 })
  } else {
    t = this.textePosition(`Comme le rapport est négatif alors ${centre.nom} est entre les points ${p.nom} et ${image.nom}`, positionTexte.x, positionTexte.y, { taille: 15 })
  }
  this.regleSegment(p, centre)
  const l = longueur(p, centre)
  const lprime = l * Math.abs(k)
  const t1 = this.textePosition(`La mesure de ${centre.nom}${p.nom} est ${stringNombre(l, 1)} cm et le rapport de l'homothetie est ${stringNombre(k, 3)}`, positionTexte.x, positionTexte.y - 1, { taille: 15 })
  const t2 = this.textePosition(`donc ${centre.nom}${image.nom} mesure ${stringNombre(l, 1)} cm × ${stringNombre(Math.abs(k), 3)} = ${stringNombre(lprime, 1)} cm`, positionTexte.x, positionTexte.y - 2, { taille: 15 })
  this.regleSegment(centre, image)
  this.pointCreer(image, { couleur: couleur, couleurLabel: couleur }) // on construit l'image
  this.regleMasquer()
  this.crayonMasquer()
  this.pause()
  this.texteMasquer(t1)
  this.texteMasquer(t2)
  this.texteMasquer(t)
  this.couleur = couleurSave
}
/**
   *
   * @param {objet} p le polygone qui est déjà tracé
   * @param {objet} centre le centre de la rotation
   * @param {number} angle l'angle de rotation
   * @author Jean-Claude Lhote
   * @param {objet} param4 options couleur et couleurCodage
  */
export const rotationPolygone = function (p, centre, angle, noms = [], { couleur = this.couleur, couleurCodage = this.couleurCodage } = {}) {
  let nom
  const p2 = rotation(p, centre, angle) // Pour tracer la figure image à la fin de l'animation avec polygoneRapide
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  let i = 0; let codage
  for (const sommet of p.listePoints) { // On répète la construction pour chaque sommet du polygone
    if (noms[i] !== undefined) {
      nom = noms[i]
    } else {
      nom = sommet.nom + "'"
    }
    if (i < 1) {
      codage = true
    } else {
      codage = false
    }
    if (longueur(centre, sommet) !== 0) {
      this.rotationPoint(sommet, centre, angle, nom, { couleur: couleur, couleurCodage: couleurCodage, codage: codage })
    }
    i++
  }
  this.epaisseur = 2
  this.couleur = couleur
  this.polygoneRapide(...p2.listePoints) // on trace le polygone image en bleu épaisseur 2
}

/**
   *
   * @param {objet} p polygone dont on construit l'image et qui doit être tracé avec ses points nommés.
   * @param {objet} d axe de symétrie.
   * @param {string} noms tableau contenant les noms des sommets dans le même ordre que p
   * @param {objet} param3 options couleur et couleurCodage
   * @author Liouba Leroux et Jean-Claude Lhote
   */
export const symetrieAxialePolygone = function (p, d, noms = [], { couleur = this.couleur, couleurCodage = this.couleurCodage } = {}) {
  let nom
  const p2 = symetrieAxiale(p, d) // Pour tracer la figure image à la fin de l'animation avec polygoneRapide
  // const N = homothetie(milieu(p.listePoints[0], p2.listePoints[0]), milieu(p.listePoints[1], p2.listePoints[1]), 1.23456) // créer unh point de l'axe de symétrie pour les alignements et les mesure d'angles
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  let i = 0
  const marques = ['/', '//', '///', 'O', '\\\\']
  for (const sommet of p.listePoints) { // On répète la construction pour chaque sommet du polygone
    if (noms[i] !== undefined) {
      nom = noms[i]
    } else {
      nom = sommet.nom + "'"
    }
    this.symetrieAxialePoint(sommet, d, nom, { couleur: couleur, couleurCodage: couleurCodage, codage: marques[i] })
    i++
  }
  this.compasMasquer()
  this.crayonMasquer()
  this.epaisseur = 2
  this.couleur = couleur
  this.polygoneRapide(...p2.listePoints) // on trace le polygone image en bleu épaisseur 2
  this.polygoneRapide(p2)
}

/**
   *
   * @param {objet} p polygone dont on construit l'image
   * @param {objet} A point de départ de la translation
   * @param {objet} B point d'arrivée de la translation
   * @param {string} noms tableau contenant les noms des sommets dans le même ordre que p
 * @param {objet} param3 options couleur et couleurCodage
 * @author Jean-Claude Lhote
*/
export const translationPolygone = function (p, A, B, noms = [], { couleur = this.couleur, couleurCodage = this.couleurCodage, codage = 'O' } = {}) {
  let nom
  const v = vecteur(A, B)
  const p2 = translation(p, v) // Pour tracer la figure image à la fin de l'animation avec polygoneRapide
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  let i = 0
  for (const sommet of p.listePoints) { // On répète la construction pour chaque sommet du polygone
    if (noms[i] !== undefined) {
      nom = noms[i]
    } else {
      nom = sommet.nom + "'"
    }
    this.translationPoint(sommet, A, B, nom, { couleur: couleur, couleurCodage: couleurCodage, codage: codage })
  }
  this.epaisseur = 2
  this.couleur = couleur
  this.polygoneRapide(...p2.listePoints) // on trace le polygone image en bleu épaisseur 2
  this.polygoneRapide(p2)
  i++
}
/**
   *
   * @param {objet} p  le polygone dont on veut construire l'image qui doit être tracé
   * @param {objet} centre le centre de symétrie
   * @param {array} noms les noms des sommets images (si pas précisé ce sera le nom de l'antécédent avec un ')
   * @param {objet} param3 options couleur et couleurCodage
   * @author Jean-Claude Lhote
   */
export const demiTourPolygone = function (p, centre, noms = [], { couleur = this.couleur, couleurCodage = this.couleurCodage } = {}) {
  const p2 = rotation(p, centre, 180) // Pour tracer la figure image à la fin de l'animation avec polygoneRapide
  this.epaisseur = 0.5 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  let nom
  let i = 0
  const marques = ['/', '//', '///', 'O', '\\\\']
  for (const sommet of p.listePoints) { // On répète la construction pour chaque sommet du polygone
    if (noms[i] !== undefined) {
      nom = noms[i]
    } else {
      nom = sommet.nom + "'"
    }
    this.demiTourPoint(sommet, centre, nom, { couleur: couleur, couleurCodage: couleurCodage, codage: marques[i] })
    i++
  }
  this.epaisseur = 2
  this.couleur = couleur
  this.polygoneRapide(...p2.listePoints) // on trace le polygone image en bleu épaisseur 2
  this.polygoneRapide(p2)// figure svg de l'exercice
}

/**
   *
   * @param {objet} p polygone dont on doit construire l'image
   * @param {objet} centre de l'homothétie
   * @param {number} k rapport de l'homothétie
   * @param {array} noms tableau contenant les différents noms des sommets dans le même ordre que ceux de p. Si vide, alors on ajoute ' à ceux de p
   * @param {objet} param4 options (couleur)
   */
export const homothetiePolygone = function (p, centre, k, noms = [], { couleur = this.couleur } = {}) {
  let nom
  const p2 = homothetie(p, centre, k) // Pour tracer la figure image à la fin de l'animation avec polygoneRapide
  this.epaisseur = 1 // épaisseur et couleur de crayon de papier bien taillé pour la construction
  this.couleur = 'grey'
  const t = this.textePosition('Comme k est ' + (k >= 0 ? 'positif' : 'négatif') + ' alors ' + (k >= 0 ? 'les figures sont du même côté de ' + centre.nom : centre.nom + ' est entre les figures'), 0, 0, { taille: 15 })
  let i = 0
  for (const sommet of p.listePoints) { // On répète la construction pour chaque sommet du polygone
    if (noms[i] !== undefined) {
      nom = noms[i]
    } else {
      nom = sommet.nom + "'"
    }
    this.homothetiePoint(sommet, centre, k, nom, { couleur: couleur })
    i++
  }
  this.epaisseur = 2
  this.couleur = couleur
  this.polygoneRapide(...p2.listePoints) // on trace le polygone image en bleu épaisseur 2
  this.texteMasquer(t)
}
