import { arc, arcPointPointAngle, traceCompas } from './2d/arc.js'
import { barycentre, milieu } from './2d/barycentre.js'
import { angle, angleOriente, angleradian, longueur, norme } from './2d/calculs.js'
import { cercle, cercleCentrePoint } from './2d/cercle.js'
import { cibleCarree, cibleCouronne, cibleRonde, dansLaCibleCarree, dansLaCibleRonde } from './2d/cibles.js'
import { afficheCoteSegment, afficheLongueurSegment, afficheMesureAngle, codageAngle, codageAngleDroit, codageSegment, codageSegments, nomAngleRentrantParPosition, nomAngleSaillantParPosition, texteSurArc, texteSurSegment } from './2d/codages.js'
import { cone } from './2d/cone.js'
import { antecedentInterpole, courbe, courbeInterpolee, graphiqueInterpole, imageInterpolee, lectureAntecedent, lectureImage } from './2d/courbes.js'
import { demiDroite } from './2d/demiDroite.js'
import { droite, droiteHorizontaleParPoint, droiteParPointEtParallele, droiteParPointEtPente, droiteParPointEtPerpendiculaire, droiteParPointEtVecteur, droiteVerticaleParPoint, positionLabelDroite } from './2d/droites.js'
import { bissectrice, codageBissectrice, codageMediatrice, codageMilieu, mediatrice } from './2d/droitesRemarquables.js'
import { ellipse, semiEllipse } from './2d/ellipse.js'
import { engrenage } from './2d/engrenage.js'
import { glisseNombre } from './2d/glisseNombre.js'
import { diagrammeBarres, diagrammeCirculaire, traceBarre, traceBarreHorizontale, traceGraphiqueCartesien } from './2d/graphiques.js'
import { grille, lignesHorizontales, lignesVerticales, papierPointe, seyes } from './2d/grilles.js'
import { crochetD, crochetG, intervalle } from './2d/intervalles.js'
import { labelPoint } from './2d/labelPoint.js'
import { labyrinthe } from './2d/labyrinthe.js'
import { motifs } from './2d/motif.js'
import { pavage } from './2d/pavage.js'
import { point } from './2d/point.js'
import { pointAdistance, pointIntersectionCC, pointIntersectionDD, pointIntersectionLC, pointSurCercle, pointSurDroite, pointSurSegment } from './2d/pointSur.js'
import { boite, carre, codageCarre, deplaceLabel, nommePolygone, polygone, polygoneATrous, polygoneAvecNom, polygoneRegulier, polygoneRegulierParCentreEtRayon } from './2d/polygone.js'
import { polyline } from './2d/polyline.js'
import { axes, axeY, droiteGraduee, labelY, pointDansRepere, repere } from './2d/reperes.js'
import { scratchblock } from './2d/scratchblock.js'
import { segment, segmentAvecExtremites } from './2d/segment.js'
import { tableau } from './2d/tableau.js'
import { latexParCoordonnees, latexParPoint, texteParPoint, texteParPointEchelle, texteParPosition } from './2d/textes.js'
import { plot, traceMilieuSegment, tracePoint, tracePointSurDroite } from './2d/tracePoint.js'
import { affiniteOrtho, distancePointDroite, homothetie, projectionOrtho, rotation, sensDeRotation, similitude, symetrieAxiale, translation, translation2Points } from './2d/transformations.js'
import { aireTriangle, centreCercleCirconscrit, centreGraviteTriangle, codageHauteurTriangle, codageMedianeTriangle, hauteurTriangle, medianeTriangle, orthoCentre, triangle2points1angle1longueur, triangle2points1angle1longueurOppose, triangle2points2angles, triangle2points2longueurs } from './2d/triangle.js'
import { nomVecteurParPosition, vecteur } from './2d/vecteur.js'
import { afficherTempo, afficherUnParUn, affiniteOrthoAnimee, apparitionAnimee, cacherParDiv, cacherTempo, homothetieAnimee, montrerParDiv, rotationAnimee, symetrieAnimee, translationAnimee } from './2dAnimation.js'
import { codeSvg, codeTikz, colorToLatexOrHTML, fixeBordures, mathalea2d } from './2dGeneralites.js'
import { pointCliquable } from './2dinteractif.js'
import { ajouterAx, ajouterAy, allerA, angleScratchTo2d, avance, baisseCrayon, creerLutin, leveCrayon, mettrexA, mettreyA, orienter, tournerD, tournerG } from './2dLutin.js'
import { arete3d, barre3d, cercle3d, CodageAngleDroit3D, cone3d, cube, cube3d, cylindre3d, demicercle3d, droite3d, homothetie3d, pave3d, paveLPH3d, plaque3d, point3d, polygone3d, prisme3d, rotation3d, rotationV3d, sensDeRotation3d, sphere3d, translation3d, vecteur3d } from './3d.js'
import Alea2iep from './Alea2iep.js'
import { context } from './context.js'
import { calcule } from './fonctionsMaths.js'
import { fraction } from './fractions.js'
import { randint } from './outils/entiers.js'
import { calcul, nombreDecimal, texNombre } from './outils/texNombres.js'

import Sval from 'sval'
import { pave } from './2d/pave.js'
import { afficherCrayon } from './2dInstruments.js'

function polygoneRegulierIndirect (A, B, n, color) { // fonction supprimée de 2d.js donc mise ici pour assurer la compatibilité avec les vieux scripts mathalea2d
  return polygoneRegulier(B, A, n, color)
}
function carreIndirect (A, B, color) {
  return carre(B, A, color)
}
/**
 * Pour l'autocomplétion, importe les fonctions de mathalea2d, les charge dans window et dans l'interpréteur Sval
 * @returns interpreter Objet Sval
 */
export default function InitialiseEditeur () {
  context.objets2D = [] // Initialise la liste qui se met à jour à chaque création d'objet 2D
  window.randint = randint
  window.texNombre = texNombre
  window.nombreDecimal = nombreDecimal
  window.calcul = calcul
  window.calcule = calcule
  window.fraction = fraction
  window.engrenage = engrenage

  window.numId = 0 // Pour identifier tous les objets MathALEA2D
  window.texteParPointEchelle = texteParPointEchelle
  window.angleScratchTo2d = angleScratchTo2d
  window.scratchblock = scratchblock
  window.motifs = motifs
  window.nomVecteurParPosition = nomVecteurParPosition
  window.point = point
  window.tracePoint = tracePoint
  window.tracePointSurDroite = tracePointSurDroite
  window.milieu = milieu
  window.pointSurSegment = pointSurSegment
  window.pointSurCercle = pointSurCercle
  window.pointSurDroite = pointSurDroite
  window.pointIntersectionDD = pointIntersectionDD
  window.pointAdistance = pointAdistance
  window.labelPoint = labelPoint
  window.barycentre = barycentre
  window.droite = droite
  window.droiteParPointEtVecteur = droiteParPointEtVecteur
  window.droiteParPointEtParallele = droiteParPointEtParallele
  window.droiteParPointEtPerpendiculaire = droiteParPointEtPerpendiculaire
  window.droiteHorizontaleParPoint = droiteHorizontaleParPoint
  window.droiteVerticaleParPoint = droiteVerticaleParPoint
  window.droiteParPointEtPente = droiteParPointEtPente
  window.mediatrice = mediatrice
  window.codageMediatrice = codageMediatrice
  window.codageMilieu = codageMilieu
  window.bissectrice = bissectrice
  window.codageBissectrice = codageBissectrice
  window.polyline = polyline
  window.vecteur = vecteur
  window.segment = segment
  window.segmentAvecExtremites = segmentAvecExtremites
  window.demiDroite = demiDroite
  window.polygone = polygone
  window.polygoneAvecNom = polygoneAvecNom
  window.polygoneRegulier = polygoneRegulier
  window.polygoneRegulierIndirect = polygoneRegulierIndirect
  window.polygoneATrous = polygoneATrous
  window.carre = carre
  window.carreIndirect = carreIndirect
  window.codageCarre = codageCarre
  window.polygoneRegulierParCentreEtRayon = polygoneRegulierParCentreEtRayon
  window.triangle2points2longueurs = triangle2points2longueurs
  window.triangle2points2angles = triangle2points2angles
  window.triangle2points1angle1longueur = triangle2points1angle1longueur
  window.triangle2points1angle1longueurOppose = triangle2points1angle1longueurOppose
  window.nommePolygone = nommePolygone
  window.deplaceLabel = deplaceLabel
  window.aireTriangle = aireTriangle
  window.cercle = cercle
  window.ellipse = ellipse
  window.semiEllipse = semiEllipse
  window.polygoneATrous = polygoneATrous
  window.pointIntersectionLC = pointIntersectionLC
  window.pointIntersectionCC = pointIntersectionCC
  window.cercleCentrePoint = cercleCentrePoint
  window.arc = arc
  window.arcPointPointAngle = arcPointPointAngle
  window.traceCompas = traceCompas
  window.dansLaCibleCarree = dansLaCibleCarree
  window.dansLaCibleRonde = dansLaCibleRonde
  window.cibleCarree = cibleCarree
  window.cibleRonde = cibleRonde
  window.cibleCouronne = cibleCouronne
  window.translation = translation
  window.translation2Points = translation2Points
  window.rotation = rotation
  window.sensDeRotation = sensDeRotation
  window.homothetie = homothetie
  window.symetrieAxiale = symetrieAxiale
  window.distancePointDroite = distancePointDroite
  window.projectionOrtho = projectionOrtho
  window.affiniteOrtho = affiniteOrtho
  window.similitude = similitude
  window.apparitionAnimee = apparitionAnimee
  window.translationAnimee = translationAnimee
  window.rotationAnimee = rotationAnimee
  window.homothetieAnimee = homothetieAnimee
  window.symetrieAnimee = symetrieAnimee
  window.affiniteOrthoAnimee = affiniteOrthoAnimee
  window.montrerParDiv = montrerParDiv
  window.cacherParDiv = cacherParDiv
  window.cacherTempo = cacherTempo
  window.afficherTempo = afficherTempo
  window.afficherUnParUn = afficherUnParUn
  window.medianeTriangle = medianeTriangle
  window.centreGraviteTriangle = centreGraviteTriangle
  window.hauteurTriangle = hauteurTriangle
  window.codageHauteurTriangle = codageHauteurTriangle
  window.codageMedianeTriangle = codageMedianeTriangle
  window.orthoCentre = orthoCentre
  window.centreCercleCirconscrit = centreCercleCirconscrit
  window.codageAngleDroit = codageAngleDroit
  window.afficheLongueurSegment = afficheLongueurSegment
  window.texteSurSegment = texteSurSegment
  window.texteSurArc = texteSurArc
  window.afficheMesureAngle = afficheMesureAngle
  window.afficheCoteSegment = afficheCoteSegment
  window.codageSegment = codageSegment
  window.codageSegments = codageSegments
  window.codageAngle = codageAngle
  window.nomAngleSaillantParPosition = nomAngleSaillantParPosition
  window.nomAngleRentrantParPosition = nomAngleRentrantParPosition
  window.droiteGraduee = droiteGraduee
  window.axes = axes
  window.labelY = labelY
  window.grille = grille
  window.lignesHorizontales = lignesHorizontales
  window.lignesVerticales = lignesVerticales
  window.seyes = seyes
  window.repere = repere
  window.repere = repere
  window.pointDansRepere = pointDansRepere
  window.traceGraphiqueCartesien = traceGraphiqueCartesien
  window.traceBarre = traceBarre
  window.traceBarreHorizontale = traceBarreHorizontale
  window.lectureImage = lectureImage
  window.lectureAntecedent = lectureAntecedent
  window.courbe = courbe
  window.courbeInterpolee = courbeInterpolee
  window.graphiqueInterpole = graphiqueInterpole
  window.imageInterpolee = imageInterpolee
  window.antecedentInterpole = antecedentInterpole
  window.crochetD = crochetD
  window.crochetG = crochetG
  window.intervalle = intervalle
  window.texteParPoint = texteParPoint
  window.texteParPosition = texteParPosition
  window.latexParPoint = latexParPoint
  window.latexParCoordonnees = latexParCoordonnees
  window.longueur = longueur
  window.norme = norme
  window.angle = angle
  window.angleOriente = angleOriente
  window.angleradian = angleradian
  window.creerLutin = creerLutin
  window.avance = avance
  window.baisseCrayon = baisseCrayon
  window.leveCrayon = leveCrayon
  window.orienter = orienter
  window.tournerG = tournerG
  window.tournerD = tournerD
  window.allerA = allerA
  window.mettrexA = mettrexA
  window.mettreyA = mettreyA
  window.ajouterAx = ajouterAx
  window.ajouterAy = ajouterAy
  window.afficherCrayon = afficherCrayon
  window.codeSvg = codeSvg
  window.codeTikz = codeTikz
  window.mathalea2d = mathalea2d
  window.labyrinthe = labyrinthe
  window.pavage = pavage
  window.tableau = tableau
  window.glisseNombre = glisseNombre
  window.boite = boite
  window.plot = plot
  window.papierPointe = papierPointe
  window.traceMilieuSegment = traceMilieuSegment
  window.positionLabelDroite = positionLabelDroite
  window.fixeBordures = fixeBordures
  window.diagrammeBarres = diagrammeBarres
  window.diagrammeCirculaire = diagrammeCirculaire
  window.axeY = axeY
  window.cone = cone
  window.pave = pave
  window.colorToLatexOrHTML = colorToLatexOrHTML

  // La 3d
  window.sensDeRotation3d = sensDeRotation3d
  window.cube = cube
  window.cube3d = cube3d
  window.barre3d = barre3d
  window.plaque3d = plaque3d
  window.paveLPH3d = paveLPH3d
  window.point3d = point3d
  window.vecteur3d = vecteur3d
  window.arete3d = arete3d
  window.droite3d = droite3d
  window.demicercle3d = demicercle3d
  window.cercle3d = cercle3d
  window.polygone3d = polygone3d
  window.sphere3d = sphere3d
  window.cone3d = cone3d
  window.cylindre3d = cylindre3d
  window.prisme3d = prisme3d
  window.pave3d = pave3d
  window.rotationV3d = rotationV3d
  window.rotation3d = rotation3d
  window.translation3d = translation3d
  window.homothetie3d = homothetie3d
  window.CodageAngleDroit3D = CodageAngleDroit3D

  // Interactions
  window.pointCliquable = pointCliquable

  // On réinitialise les variables
  window.anim = new Alea2iep()
  window.mathalea = { sortieNB: false, anglePerspective: 30, coeffPerspective: 0.5, pixelsParCm: 20, scale: 1, unitesLutinParCm: 50, mainlevee: false, amplitude: 1, fenetreMathalea2d: [-1, -10, 29, 10], objets2D: [] }
  context.lutin = window.creerLutin()
  const interpreter = new Sval({ ecmaVer: 10, sandBox: true }) // On créé une instance de l'interpréteur JS
  // On importe toutes les commandes que l'on souhaite avoir dans l'interpréteur
  // Ainsi que les variables globales anim et mathalea
  interpreter.import({
    anim: window.anim,
    mathalea: window.mathalea,
    fenetreMathalea2d: [-1, -10, 29, 10],
    pixelsParCm: 20,
    fraction: window.fraction,
    randint: window.randint,
    texNombre: window.texNombre,
    nombreDecimal: window.nombreDecimal,
    texteParPointEchelle: window.texteParPointEchelle,
    angleScratchTo2d: window.angleScratchTo2d,
    scratchblock: window.scratchblock,
    motifs: window.motifs,
    engrenage: window.engrenage,
    // pattern: window.pattern,
    nomVecteurParPosition: window.nomVecteurParPosition,
    point: window.point,
    tracePoint: window.tracePoint,
    tracePointSurDroite: window.tracePointSurDroite,
    milieu: window.milieu,
    pointSurSegment: window.pointSurSegment,
    pointSurCercle: window.pointSurCercle,
    pointSurDroite: window.pointSurDroite,
    pointIntersectionDD: window.pointIntersectionDD,
    pointAdistance: window.pointAdistance,
    labelPoint: window.labelPoint,
    barycentre: window.barycentre,
    droite: window.droite,
    droiteParPointEtVecteur: window.droiteParPointEtVecteur,
    droiteParPointEtParallele: window.droiteParPointEtParallele,
    droiteParPointEtPerpendiculaire: window.droiteParPointEtPerpendiculaire,
    droiteHorizontaleParPoint: window.droiteHorizontaleParPoint,
    droiteVerticaleParPoint: window.droiteVerticaleParPoint,
    droiteParPointEtPente: window.droiteParPointEtPente,
    mediatrice: window.mediatrice,
    codageMediatrice: window.codageMediatrice,
    codageMilieu: window.codageMilieu,
    bissectrice: window.bissectrice,
    codageBissectrice: window.codageBissectrice,
    polyline: window.polyline,
    pave: window.pave,
    colorToLatexOrHTML: window.colorToLatexOrHTML,
    vecteur: window.vecteur,
    segment: window.segment,
    segmentAvecExtremites: window.segmentAvecExtremites,
    demiDroite: window.demiDroite,
    polygone: window.polygone,
    polygoneAvecNom: window.polygoneAvecNom,
    polygoneRegulier: window.polygoneRegulier,
    polygoneRegulierIndirect: window.polygoneRegulierIndirect,
    polygoneATrous: window.polygoneATrous,
    carre: window.carre,
    carreIndirect: window.carreIndirect,
    codageCarre: window.codageCarre,
    polygoneRegulierParCentreEtRayon: window.polygoneRegulierParCentreEtRayon,
    triangle2points2longueurs: window.triangle2points2longueurs,
    triangle2points2angles: window.triangle2points2angles,
    triangle2points1angle1longueur: window.triangle2points1angle1longueur,
    triangle2points1angle1longueurOppose: window.triangle2points1angle1longueurOppose,
    nommePolygone: window.nommePolygone,
    deplaceLabel: window.deplaceLabel,
    aireTriangle: window.aireTriangle,
    cercle: window.cercle,
    ellipse: window.ellipse,
    cone: window.cone,
    semiEllipse: window.semiEllipse,
    pointIntersectionLC: window.pointIntersectionLC,
    pointIntersectionCC: window.pointIntersectionCC,
    cercleCentrePoint: window.cercleCentrePoint,
    arc: window.arc,
    arcPointPointAngle: window.arcPointPointAngle,
    traceCompas: window.traceCompas,
    dansLaCibleCarree: window.dansLaCibleCarree,
    dansLaCibleRonde: window.dansLaCibleRonde,
    cibleCarree: window.cibleCarree,
    cibleRonde: window.cibleRonde,
    cibleCouronne: window.cibleCouronne,
    translation: window.translation,
    translation2Points: window.translation2Points,
    rotation: window.rotation,
    sensDeRotation: window.sensDeRotation,
    homothetie: window.homothetie,
    symetrieAxiale: window.symetrieAxiale,
    distancePointDroite: window.distancePointDroite,
    projectionOrtho: window.projectionOrtho,
    affiniteOrtho: window.affiniteOrtho,
    similitude: window.similitude,
    apparitionAnimee: window.apparitionAnimee,
    translationAnimee: window.translationAnimee,
    rotationAnimee: window.rotationAnimee,
    homothetieAnimee: window.homothetieAnimee,
    symetrieAnimee: window.symetrieAnimee,
    affiniteOrthoAnimee: window.affiniteOrthoAnimee,
    montrerParDiv: window.montrerParDiv,
    cacherParDiv: window.cacherParDiv,
    afficherTempo: window.afficherTempo,
    cacherTempo: window.cacherTempo,
    afficherUnParUn: window.afficherUnParUn,
    medianeTriangle: window.medianeTriangle,
    centreGraviteTriangle: window.centreGraviteTriangle,
    hauteurTriangle: window.hauteurTriangle,
    CodageHauteurTriangle: window.CodageHauteurTriangle,
    codageHauteurTriangle: window.codageHauteurTriangle,
    codageMedianeTriangle: window.codageMedianeTriangle,
    orthoCentre: window.orthoCentre,
    centreCercleCirconscrit: window.centreCercleCirconscrit,
    codageAngleDroit: window.codageAngleDroit,
    afficheLongueurSegment: window.afficheLongueurSegment,
    texteSurSegment: window.texteSurSegment,
    texteSurArc: window.texteSurArc,
    afficheMesureAngle: window.afficheMesureAngle,
    afficheCoteSegment: window.afficheCoteSegment,
    codageSegment: window.codageSegment,
    codageSegments: window.codageSegments,
    codageAngle: window.codageAngle,
    nomAngleSaillantParPosition: window.nomAngleSaillantParPosition,
    nomAngleRentrantParPosition: window.nomAngleRentrantParPosition,
    droiteGraduee: window.droiteGraduee,
    labelY: window.labelY,
    grille: window.grille,
    lignesHorizontales: window.lignesHorizontales,
    lignesVerticales: window.lignesVerticales,
    seyes: window.seyes,
    repere: window.repere,
    pointDansRepere: window.pointDansRepere,
    traceGraphiqueCartesien: window.traceGraphiqueCartesien,
    traceBarre: window.traceBarre,
    traceBarreHorizontale: window.traceBarreHorizontale,
    lectureImage: window.lectureImage,
    lectureAntecedent: window.lectureAntecedent,
    courbe: window.courbe,
    courbeInterpolee: window.courbeInterpolee,
    graphiqueInterpole: window.graphiqueInterpole,
    imageInterpolee: window.imageInterpolee,
    antecedentInterpole: window.antecedentInterpole,
    crochetD: window.crochetD,
    crochetG: window.crochetG,
    intervalle: window.intervalle,
    texteParPoint: window.texteParPoint,
    texteParPosition: window.texteParPosition,
    latexParPoint: window.latexParPoint,
    latexParCoordonnees: window.latexParCoordonnees,
    longueur: window.longueur,
    norme: window.norme,
    angle: window.angle,
    angleOriente: window.angleOriente,
    angleradian: window.angleradian,
    creerLutin: window.creerLutin,
    avance: window.avance,
    baisseCrayon: window.baisseCrayon,
    leveCrayon: window.leveCrayon,
    orienter: window.orienter,
    tournerG: window.tournerG,
    tournerD: window.tournerD,
    allerA: window.allerA,
    mettrexA: window.mettrexA,
    mettreyA: window.mettreyA,
    ajouterAx: window.ajouterAx,
    ajouterAy: window.ajouterAy,
    afficherCrayon: window.afficherCrayon,
    // deplaceInstrument: window.deplaceInstrument,
    codeSvg: window.codeSvg,
    codeTikz: window.codeTikz,
    mathalea2d: window.mathalea2d,
    labyrinthe: window.labyrinthe,
    pavage: window.pavage,
    tableau: window.tableau,
    glisseNombre: window.glisseNombre,
    boite: window.boite,
    plot: window.plot,
    papierPointe: window.papierPointe,
    traceMilieuSegment: window.traceMilieuSegment,
    positionLabelDroite: window.positionLabelDroite,
    fixeBordures: window.fixeBordures,
    diagrammeBarres: window.diagrammeBarres,
    diagrammeCirculaire: window.diagrammeCirculaire,
    axeY: window.axeY,

    // 3d
    sensDeRotation3d: window.sensDeRotation3d,
    cube: window.cube,
    cube3d: window.cube3d,
    barre3d: window.barre3d,
    plaque3d: window.plaque3d,
    paveLPH3d: window.paveLPH3d,
    point3d: window.point3d,
    vecteur3d: window.vecteur3d,
    arete3d: window.arete3d,
    droite3d: window.droite3d,
    demicercle3d: window.demicercle3d,
    cercle3d: window.cercle3d,
    polygone3d: window.polygone3d,
    sphere3d: window.sphere3d,
    cone3d: window.cone3d,
    cylindre3d: window.cylindre3d,
    prisme3d: window.prisme3d,
    pave3d: window.pave3d,
    rotationV3d: window.rotationV3d,
    rotation3d: window.rotation3d,
    translation3d: window.translation3d,
    homothetie3d: window.homothetie3d,
    CodageAngleDroit3D: window.CodageAngleDroit3D,

    // Interactions
    pointCliquable: window.pointCliquable
  })

  return interpreter
}
