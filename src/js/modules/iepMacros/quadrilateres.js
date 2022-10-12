import { randint } from '../../modules/outils/entiers.js'
import { point } from '../../modules/2d/point.js'
import { rotation } from '../../modules/2d/transformations.js'
import { pointAdistance, pointSurSegment } from '../../modules/2d/pointSur.js'
import { polygoneAvecNom } from '../../modules/2d/polygone.js'

/**
   * Macro crée par Sophie Desruelle
   * @param {objet} A
   * @param {number} c
   * @returns polygoneAvecNom
   */
export const carre1point1longueur = function (nom, A, c) {
  const interligne = 1
  A = point(5, 0, nom[0])
  const B = pointAdistance(A, c, randint(-20, 20), nom[1])
  const C = rotation(A, B, -90, nom[2])
  const D = rotation(B, A, 90, nom[3])
  const E = pointSurSegment(A, D, c + 2, 'E')
  const F = pointSurSegment(D, C, c + 2, 'F')
  this.equerreZoom((c + 3) * 100 / 7.5)
  this.tempo = 20

  this.textePosition(`1) On veut construire un carré dont les côtés mesurent ${c} cm, donc on commence par tracer un segment, ici [${nom[0] + nom[1]}], de cette longueur.`, 0, -2)

  this.pointCreer(A, { tempo: 0 }) // On coupe la pause pour ne pas voir le déplacement du point
  this.pointNommer(A, A.nom, { dx: -0.5, dy: 0 }) // On déplace le label du point A vers la gauche
  this.regleSegment(A, B)
  this.pointCreer(B)
  this.regleMasquer()
  this.longueurSegment(A, B, -1)

  this.textePosition(`2) Un carré possède 4 angles droits, donc on trace la perpendiculaire à (${nom[0] + nom[1]}) passant par ${nom[0]}.`, 0, -2 - 1 * interligne)

  this.equerreMontrer()
  this.equerreDeplacer(A)
  this.equerreRotation(B)
  this.trait(A, E)
  this.equerreMasquer()
  this.codageAngleDroit(B, A, D)

  this.textePosition(`3) Les 4 côtés d'un carré sont de la même longueur, donc on place le point ${nom[3]} sur cette perpendiculaire, à ${c} cm de ${nom[0]}.`, 0, -2 - 2 * interligne)

  this.regleSegment(A, D)
  this.pointCreer(D, { tempo: 0 })
  this.pointNommer(D, D.nom, { dx: -0.7, dy: 0.5 })
  this.regleMasquer()
  this.segmentCodage(A, B)
  this.segmentCodage(A, D)

  this.textePosition(`4) De même, on trace la perpendiculaire à (${nom[0] + nom[3]}) passant par ${nom[3]}, puis on place le point ${nom[2]} sur cette perpendiculaire, à ${c} cm de ${nom[3]}.`, 0, -2 - 3 * interligne)

  this.equerreMontrer()
  this.equerreDeplacer(D)
  this.equerreRotation(A)
  this.trait(D, F)
  this.equerreMasquer()
  this.codageAngleDroit(A, D, C)

  this.regleSegment(D, C)
  this.pointCreer(C, { tempo: 0 })
  this.pointNommer(C, C.nom, { dx: 0, dy: 0.9 })
  this.regleMasquer()
  this.segmentCodage(D, C)

  this.textePosition(`5) On trace le segment [${nom[1] + nom[2]}].`, 0, -2 - 4 * interligne)

  this.regleSegment(C, B)
  this.regleMasquer()
  this.segmentCodage(B, C)

  this.textePosition(`6) On vérifie que ${nom[1] + nom[2]} = ${c} cm et que les deux derniers angles tracés sont droits.`, 0, -2 - 5 * interligne)

  this.equerreMontrer(C, { tempo: 0 })
  this.equerreRotation(D)
  this.equerreMasquer()
  this.codageAngleDroit(D, C, B)

  this.equerreMontrer(B, { tempo: 0 })
  this.equerreRotation(C)
  this.equerreMasquer()
  this.codageAngleDroit(C, B, A)
  return polygoneAvecNom(A, B, C, D)
}
