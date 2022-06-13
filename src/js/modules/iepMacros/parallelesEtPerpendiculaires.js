import { droite, projectionOrtho, pointSurSegment, droiteParPointEtParallele, longueur, homothetie, rotation, angleOriente, pointSurDroite, similitude, translation, point, vecteur, translation2Points, estSurDroite, cercle, pointIntersectionLC, droiteParPointEtPerpendiculaire } from '../2d'

/**
   * Trace la parallèle à (AB) passant par C avec la règle et l'équerre. Peut prolonger le segment [AB] si le pied de la hauteur est trop éloigné des extrémités du segment
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {*} options
   */
export const paralleleRegleEquerre2points3epoint = function (A, B, C, options) {
  let G, D, H1
  // G est le point le plus à gauche, D le plus à droite et H le projeté de C sur (AB)
  // H1 est un point de (AB) à gauche de H, c'est là où seront la règle et l'équerre avant de glisser
  if (A.x < B.x) {
    G = A
    D = B
  } else {
    G = B
    D = A
  }
  const d = droite(A, B)
  const H = projectionOrtho(C, d)
  if (H.x < D.x) {
    H1 = pointSurSegment(H, D, -2) // H1 sera plus à gauche que H
  } else if (H.x > D.x) {
    H1 = pointSurSegment(H, D, 2)
  } else {
    H1 = pointSurSegment(H, G, 2)
  }
  const C1 = projectionOrtho(H1, droiteParPointEtParallele(C, d))
  // C1 est le point d'arrivée de l'équerre après avoir glissé
  const M = pointSurSegment(C1, C, 6)
  // Le tracé de la parallèle ne fera que 6 cm pour ne pas dépassr de l'équerre. M est la fin de ce tracé

  if (H.x < G.x && longueur(H, G) > 3) { // Si le pied de la hauteur est trop à gauche
    this.regleProlongerSegment(D, G)
    this.regleMasquer()
  }
  if (H.x > D.x && longueur(H, D) > 3) { // Si le pied de la hauteur est trop à gauche
    this.regleProlongerSegment(G, D)
  }

  this.equerreMontrer(H1)
  if (M.x > C1.x) {
    this.equerreRotation(d.angleAvecHorizontale - 90)
  } else {
    this.equerreRotation(d.angleAvecHorizontale + 90)
  }
  if (H1.y > C1.y) {
    if (this.regle.visibilite) {
      this.regleDeplacer(H1, { vitesse: this.vitesse, tempo: 0 })
      this.regleRotation(C1, { sens: this.vitesse / 2, tempo: 0 })
    } else {
      this.regleDeplacer(H1, { vitesse: 1000, tempo: 0 })
      this.regleRotation(C1, { sens: 1000, tempo: 0 })
    }
  } else {
    const C12 = pointSurSegment(C1, H1, -2) // On monte un peu plus la règle pour que ça soit plus crédible
    if (this.regle.visibilite) {
      this.regleDeplacer(C12, { vitesse: this.vitesse, tempo: 0 })
      this.regleRotation(H1, { sens: this.vitesse / 2, tempo: 0 })
    } else {
      this.regleDeplacer(C12, { vitesse: 1000, tempo: 0 })
      this.regleRotation(H1, { sens: 1000, tempo: 0 })
    }
  }
  this.regleMontrer()
  this.equerreDeplacer(C1, options)
  this.crayonMontrer()
  this.crayonDeplacer(C1, options)
  this.tracer(M, options)
}
/**
   * Trace la perpendiculaire à (AB) passant par C avec la règle et l'équerre. Peut prolonger le segment [AB] si le pied de la hauteur est trop éloigné des extrémités du segment
   * Description désactivée par défaut.
   * @param {point} A
   * @param {point} B
   * @param {point} C
   * @param {*} options
   */
export const perpendiculaireRegleEquerre2points3epoint = function (A, B, C, description = false) {
  const longueurRegle = this.regle.longueur
  const zoomEquerre = this.equerre.zoom
  const d = droite(A, B)
  d.nom = `(${A.nom}${B.nom})`
  let dist
  if (A.nom === undefined) A.nom = 'A'
  if (B.nom === undefined) B.nom = 'B'
  if (C.estSur(droite(A, B))) {
    const H = rotation(C, C, 0)
    const dd = droiteParPointEtPerpendiculaire(C, d)
    C = pointIntersectionLC(dd, cercle(H, 5.5), 1)
    dist = 7.5
  } else {
    const H = projectionOrtho(C, d)
    dist = longueur(H, C) + 2
  }
  this.equerreZoom(dist * 100 / 7.5)
  this.regleModifierLongueur(Math.max(dist * 2, 15))
  const P1 = homothetie(A, B, 1.2)
  const P2 = homothetie(B, A, 1.2)
  this.traitRapide(P1, P2)
  this.pointsCreer(A, B, C)
  this.perpendiculaireRegleEquerreDroitePoint(d, C, description)
  this.equerreZoom(zoomEquerre)
  this.regleModifierLongueur(longueurRegle)
}

/**
 * Construit à la règle et à l'équerre la perpendiculaire à une droite d passant par un point P n'appartenant pas à d.
 * description désactivable.
 * @param {droite} d
 * @param {point} P
 * @param {boolean} description
 */
export const perpendiculaireRegleEquerreDroitePoint = function (d, P, description) {
  if (!estSurDroite(P, d)) {
    const H = projectionOrtho(P, d)
    const A = rotation(P, H, 90)
    const B = rotation(A, H, 180)
    const P3 = homothetie(P, H, 1.2)
    const alpha = angleOriente(point(10000, H.y), H, B)
    if (description) this.textePosition(`1. Placer un côté de l'angle droit de l'équerre sur la droite ${d.nom} et l'autre côté de l'angle droit passant par le point ${P.nom}.`, 0, 10, { couleur: 'lightblue' })
    this.equerreRotation(alpha)
    this.equerreMontrer(H)
    if (description) this.textePosition(`2. Tracer le segment de droite passant par le point ${P.nom}`, 0, 9.3, { couleur: 'lightblue' })
    this.crayonMontrer(P)
    this.tracer(H)
    this.equerreMasquer()
    if (description) this.textePosition(`3. Prolonger la perpendiculaire à ${d.nom} à la règle.`, 0, 8.6, { couleur: 'lightblue' })
    this.regleMontrer(P3)
    this.regleRotation(alpha - 90)
    this.crayonDeplacer(P3)
    this.tracer(rotation(P3, H, 180))
    if (description) this.textePosition('4. Coder l\'angle droit.', 0, 7.9, { couleur: 'lightblue' })
    this.regleMasquer()
    this.codageAngleDroit(A, H, P)
  } else {
    const H = P
    const C = cercle(P, 6)
    const A = pointSurDroite(d, -10000)
    const B = pointSurDroite(d, 10000)
    let P3 = rotation(pointIntersectionLC(d, C, 1), P, 90)
    if (P3.y < P.y) P3 = rotation(P3, P, 180)
    const alpha = angleOriente(point(10000, H.y), H, B)
    if (description) this.textePosition(`1. Placer un côté de l'angle droit de l'équerre sur la droite ${d.nom} avec l'angle droit au point ${P.nom}.`, 0, 10, { couleur: 'lightblue' })
    this.equerreRotation(alpha)
    this.equerreMontrer(H)
    if (description) this.textePosition('2. Tracer le long de l\'autre côté de l\'angle droit de l\'équerre', 0, 9.3, { couleur: 'lightblue' })
    this.crayonMontrer(P3)
    this.tracer(H)
    this.equerreMasquer()
    if (description) this.textePosition(`3. Prolonger la perpendiculaire à ${d.nom} à la règle.`, 0, 8.6, { couleur: 'lightblue' })
    this.regleMontrer(P3)
    this.regleRotation(alpha - 90)
    this.crayonDeplacer(P3)
    this.tracer(rotation(P3, H, 180))
    if (description) this.textePosition('4. Coder l\'angle droit.', 0, 7.9, { couleur: 'lightblue' })
    this.regleMasquer()
    this.codageAngleDroit(A, H, P3)
  }
}
/**
 * Trace la perpendiculaire à une droite passant par un point de cette droite à l'équerre et à la règle.
 * @param {droite} d
 * @param {number} x  // pour choisir le point sur d : l'abscisse de A
 * @param {boolean} description
 */
export const perpendiculaireRegleEquerrePointSurLaDroite = function (d, x, description) {
  const A = pointSurDroite(d, x, 'A')
  const B = pointSurDroite(d, x + 5)
  const P1 = rotation(B, A, 90)
  const P2 = rotation(P1, A, 180)
  if (d.nom === undefined) {
    d.nom = '(d)'
  }
  this.traitRapide(pointSurDroite(d, -20), pointSurDroite(d, 20))
  this.pointCreer(A)
  if (description) this.textePosition(`1. Placer un côté de l'angle droit de l'équerre sur la droite ${d.nom}.`, 0, 10, { couleur: 'lightblue' })
  this.equerreRotation(d.angleAvecHorizontale)
  this.equerreMontrer(B)
  if (description) {
    this.textePosition(`2. Faire glisser l'équerre sur la droite jusqu'au point ${A.nom}`, 0, 9.3, { couleur: 'lightblue' })
  }
  this.equerreDeplacer(A)
  if (description) this.textePosition('3. Tracer le long de l\'autre côté de l\'angle droit de l\'équerre.', 0, 8.6, { couleur: 'lightblue' })
  this.crayonMontrer(A)
  this.tracer(P1)
  this.equerreMasquer()
  if (description) this.textePosition(`4. Prolonger la perpendiculaire à ${d.nom} à la règle.`, 0, 7.9, { couleur: 'lightblue' })
  this.regleRotation(d.angleAvecHorizontale - 90)
  this.regleMontrer(P1)
  this.crayonDeplacer(P1)
  this.tracer(P2)
  if (description) this.textePosition('4. Coder l\'angle droit.', 0, 7.2, { couleur: 'lightblue' })
  this.regleMasquer()
  this.codageAngleDroit(P1, A, B)
}
/**
 * Trace la perpendiculaire à une droite passant par un point de cette droite au compas.
 * @param {droite} d
 * @param {number} x // pour choisir le point sur d : l'abscisse de A
 * @param {boolean} description
 */
export const perpendiculaireCompasPointSurLaDroite = function (d, x, description) {
  const A = pointSurDroite(d, x, 'A')
  const B = pointSurDroite(d, x + 3, 'B')
  const C = pointSurDroite(d, x - 3, 'C')
  const P1 = similitude(B, A, 90, 1.2)
  const P2 = similitude(B, A, -90, 1.2)
  if (d.nom === undefined) {
    d.nom = '(d)'
  }
  this.traitRapide(pointSurDroite(d, -20), pointSurDroite(d, 20))
  this.pointCreer(A)
  if (description) this.textePosition('1. Avec le compas, marquer deux points B et C de part et d\'autre de A, tels que AB=AC.', 0, 10, { couleur: 'lightblue' })
  this.compasEcarter2Points(A, B)
  this.compasTracerArcCentrePoint(A, B, { couleur: 'lightgray', epaisseur: 1 })
  this.compasTracerArcCentrePoint(A, C, { couleur: 'lightgray', epaisseur: 1 })
  this.pointsCreer(B, C, { tempo: 10 })
  if (description) {
    this.textePosition('2. Choisir un écartement de compas supérieur à la longueur AB.', 0, 9.3, { couleur: 'lightblue' })
  }
  this.compasEcarter2Points(B, P1)
  if (description) this.textePosition('3. Tracer un arc de cercle de centre B avec cet écartement.', 0, 8.6, { couleur: 'lightblue' })
  this.compasTracerArcCentrePoint(B, P1, { couleur: 'lightgray', epaisseur: 1 })
  if (description) this.textePosition('4. Tracer un arc de cercle de centre C en conservant le même écartement.', 0, 7.9, { couleur: 'lightblue' })
  this.compasTracerArcCentrePoint(C, P1, { couleur: 'lightgray', epaisseur: 1 })
  this.compasMasquer()
  if (description) {
    this.textePosition('4. Tracer la droite qui passe par le point d\'intersection des arcs de cercle et par le point A.', 0, 7.2, { couleur: 'lightblue' })
  }
  this.regleRotation(d.angleAvecHorizontale - 90)
  const P11 = homothetie(P1, A, 1.1)
  const P12 = homothetie(P2, A, 1.1)
  this.regleMontrer(P11)
  this.crayonMontrer(P11)
  this.tracer(P12)
  if (description) this.textePosition('5. Coder l\'angle droit.', 0, 6.5, { couleur: 'lightblue' })
  this.regleMasquer()
  this.codageAngleDroit(P1, A, B)
}
/**
 * Trace la perpendiculaire à une droite passant par un point n'appartenant pas à cette droite au compas.
 * @param {droite} d
 * @param {number} x // pour choisir le point sur d : l'abscisse de A
 * @param {boolean} description
 */
export const perpendiculaireCompasPoint = function (d, A, description) {
  const H = projectionOrtho(A, d)
  const B = similitude(A, H, -90, 1.2, 'B')
  const C = homothetie(B, H, -0.7, 'C')
  const D = rotation(A, H, 180)
  const P1 = homothetie(A, H, 1.2)
  const P2 = homothetie(A, H, -1.2)
  if (d.nom === '') {
    d.nom = '(d)'
  }
  if (A.nom === '') {
    A.nom = 'A'
  }
  this.traitRapide(pointSurDroite(d, -20), pointSurDroite(d, 20))
  this.textePoint(d.nom, translation(pointSurDroite(d, 0), vecteur(0, -0.5)))
  this.pointCreer(A)
  if (description) this.textePosition(`1. Choisir deux points B et C sur la droite ${d.nom}.`, 0, 11, { couleur: 'lightblue', tempo: 20 })
  this.tempo = 20
  this.pointCreer(B)
  this.pointCreer(C)
  if (description) this.textePosition(`2. Tracer un arc de cercle de centre B passant par A et un autre de centre C passant par ${A.nom}.`, 0, 10.3, { couleur: 'lightblue', tempo: 20 })
  this.compasEcarter2Points(B, A)
  this.compasTracerArcCentrePoint(B, D, { couleur: 'lightgray', epaisseur: 1 })
  this.compasEcarter2Points(C, A)
  this.compasTracerArcCentrePoint(C, D, { couleur: 'lightgray', epaisseur: 1 })
  if (description) this.textePosition(`3. Ces deux arcs de cercle se recoupent en un point qui est le symétrique de ${A.nom} par rapport à ${d.nom}`, 0, 9.6, { couleur: 'lightblue', tempo: 20 })
  this.compasMasquer()
  if (description) this.textePosition('4. Tracer la droite qui passe par le point d\'intersection des arcs de cercle et par le point A.', 0, 8.9, { couleur: 'lightblue', tempo: 20 })
  this.regleRotation(d.angleAvecHorizontale - 90)
  this.regleMontrer(P1)
  this.crayonMontrer(P1)
  this.tracer(P2)
  if (description) this.textePosition('5. Coder l\'angle droit.', 0, 8.2, { couleur: 'lightblue', tempo: 20 })
  this.regleMasquer()
  this.codageAngleDroit(P1, H, B)
}
/**
   * Trace la parallèlee à (AB) passant par C avec la règle et l'équerre.
   * Cette macro réalise la construction en décrivant ce qu'elle fait à chaque étape
   * @param {point} A
   * @param {point} B
   * @param {point} M
   * @param {boolean} dessus
   * @param {*} options
   */
export const paralleleRegleEquerreDroitePointAvecDescription = function (A, B, M, dessus, description = true) {
  A.nom = 'A'
  B.nom = 'B'
  M.nom = 'M'
  const AA = homothetie(A, B, 2)
  const BB = homothetie(B, A, 2)
  const d = droite(A, B)
  const dd = rotation(d, A, 90)
  const H = projectionOrtho(M, dd)
  const N = homothetie(M, H, 1.5)
  const P = homothetie(H, M, 2)
  this.tempo = 10
  this.pointsCreer(A, B, M)
  this.pointMasquer(AA, BB)
  this.traitRapide(AA, BB)
  this.textePosition('Parallèle à une droite passant par un point (règle et équerre)', -10, 10.7, { couleur: 'green', taille: 4, tempo: 20 })
  if (description) this.textePosition('On veut construire la parallèle à (AB) passant par M à la règle et à l\'equerre.', -10, 10, { couleur: 'red', taille: 4, tempo: 50 })
  if (description) this.textePosition('1. Placer l\'équerre un côté de l\'angle droit le long de la droite (AB).', -9, 9.3, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.equerreMontrer(A)
  this.equerreRotation(d.angleAvecHorizontale + (dessus ? -90 : 0), { tempo: 20 })
  if (description) this.textePosition('2. Placer ensuite la règle contre l\'autre côté de l\'angle droit de l\'équerre.', -9, 8.6, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.regleRotation(d.angleAvecHorizontale - 90)
  this.regleMontrer(AA)
  this.regleDeplacer(homothetie(rotation(B, A, 90), A, 1.5), { tempo: 20 })
  if (description) this.textePosition('Remarque : On peut tracer des pointillés pour matérialiser la position de la règle.', -9.5, 7.9, { couleur: 'pink', taille: 2, tempo: 10 })
  this.crayonMontrer(A)
  this.tracer(homothetie(rotation(B, A, dessus ? 90 : -90), A, 1.5), { pointilles: true })
  if (description) this.textePosition('3. Faire glisser l\'équerre le long de la règle jusqu\'au point M.', -9, 7.2, { couleur: 'lightblue', taille: 2, tempo: 10 })
  if (!dessus) {
    this.equerreRotation(d.angleAvecHorizontale - 90)
  }
  this.equerreDeplacer(H, { tempo: 20 })
  if (description) this.textePosition('4. Tracer le segment de droite passant par M.', -9, 6.5, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.crayonDeplacer(H)
  this.tracer(N)
  this.equerreMasquer()
  if (description) this.textePosition('5. Placer la règle sur ce segment et prolonger la parallèle à (AB).', -9, 5.8, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.regleDeplacer(P)
  this.regleRotation(d.angleAvecHorizontale)
  this.tracer(P)
  this.regleMasquer()
  if (description) this.textePosition('6. Pour finir, coder la figure.', -9, 5.1, { couleur: 'lightblue', taille: 2, tempo: 20 })
  this.codageAngleDroit(B, A, H)
  this.codageAngleDroit(A, H, M)
  this.crayonMasquer()
}

/**
 *
 * @param {point} A
 * @param {point} B
 * @param {point} C
 * @param {boolean} description
 */
export const paralleleAuCompasAvecDescription = function (A, B, C, description = true) {
  const D = translation2Points(C, A, B, 'D')
  A.nom = 'A'
  B.nom = 'B'
  C.nom = 'C'
  const AA = homothetie(A, B, 1.5)
  const BB = homothetie(B, A, 1.5)
  const N = homothetie(C, D, 1.5)
  const P = homothetie(D, C, 1.5)
  this.tempo = 10
  this.pointsCreer(A, B, C)
  this.traitRapide(AA, BB)
  this.textePosition('Parallèle à une droite passant par un point (compas et règle)', -10, 10.7, { couleur: 'green', taille: 4, tempo: 20 })
  if (description) this.textePosition('On veut construire la parallèle à (AB) passant par C à la règle et au compas.', -10, 10, { couleur: 'red', taille: 4, tempo: 30 })
  if (description) this.textePosition('1. Prendre avec le compas l\'écartement correspondant à la longueur AB.', -9, 9.3, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.compasEcarter2Points(A, B)
  if (description) this.textePosition('2. Reporter cette longueur à partir du point C.', -9, 8.6, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.compasTracerArcCentrePoint(C, D, { couleur: 'lightgray', epaisseur: 1 })
  if (description) this.textePosition('3. Prendre ensuite avec le compas l\'écartement correspondant à la longueur AC.', -9, 7.9, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.compasEcarter2Points(A, C)
  if (description) this.textePosition('4. Reporter cette longueur à partir du point B.', -9, 7.2, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.compasTracerArcCentrePoint(B, D, { couleur: 'lightgray', epaisseur: 1 })
  this.compasMasquer()
  if (description) this.textePosition('5. Noter D, le point d\'intersection des deux arcs de cercle.', -9, 6.5, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.pointCreer(D)
  if (description) this.textePosition('6. Tracer la droite passant par C et D.', -9, 5.8, { couleur: 'lightblue', taille: 2, tempo: 10 })
  this.regleSegment(N, P)
  this.regleMasquer()
  this.crayonMasquer()
}

/**
 *
 * @param {point} A
 * @param {point} B
 * @param {point} C
 * @param {boolean} description
 */
export const paralleleAuCompas = function (A, B, C) {
  const D = translation2Points(C, A, B)
  const N = homothetie(C, D, 1.5)
  const P = homothetie(D, C, 1.5)
  this.compasEcarter2Points(A, B)
  this.compasTracerArcCentrePoint(C, D)
  this.compasEcarter2Points(A, C)
  this.compasTracerArcCentrePoint(B, D)
  this.compasMasquer()
  // this.pointCreer(D)
  this.regleSegment(N, P)
  return D
}
