/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { GVCartesian, GVCoordinates } from './coordinates.js'
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, fixeBordures, vide2d, ObjetMathalea2D } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListes, combinaisonListes2, combinaisonListesSansChangerOrdre } from '../../modules/outils/listes.js'
import { carreParfait, listeDiviseurs, pgcd, ppcm, quotientier, randint } from '../../modules/outils/entiers.js'
import { choice, compteOccurences, enleveDoublonNum, enleveElement, enleveElementBis, range1, rangeMinMax, shuffle, shuffle2tableaux, range, creerCouples, enleveElementNo } from '../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureAlgebriquec, ecritureAlgebriqueSauf1, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureParentheseSiMoins, ecritureParentheseSiNegatif, rienSi1, texteExposant } from '../../modules/outils/ecritures.js'
import { segment, segmentAvecExtremites } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { droiteGraduee, repere } from '../../modules/2d/reperes.js'
import { courbe, courbeInterpolee, graphiqueInterpole } from '../../modules/2d/courbes.js'
import { creerBoutonMathalea2d, modalPdf, modalTexteCourt, modalTexteLong, modalUrl, modalVideo, modalYoutube } from '../../modules/outils/modaux.js'
import { centrage, deuxColonnes, listeQuestionsToContenu, listeQuestionsToContenuSansNumero } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { compareFractions, fractionSimplifiee, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles, produitDeDeuxFractions, produitsEnCroix, simplificationDeFractionAvecEtapes, texFraction, texFractionReduite, texFractionSigne } from '../../modules/outils/arrayFractions.js'
import { reduireAxPlusB, reduirePolynomeDegre3 } from '../../modules/outils/reductions.js'
import { afficheScore, ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive, ajouteChampFractionMathLive } from '../../modules/interactif/questionMathLive.js'
import { latexParCoordonnees, latexParPoint, texteParPoint, texteParPointEchelle, texteParPosition, texteParPositionEchelle } from '../../modules/2d/textes.js'
import { droite, droiteParPointEtPente, positionLabelDroite, droiteHorizontaleParPoint, droiteVerticaleParPoint, droiteParPointEtPerpendiculaire, droiteParPointEtParallele, dessousDessus } from '../../modules/2d/droites.js'
import { itemize, miseEnEvidence, numAlpha, sp, texteCentre, texteEnCouleur, texteEnCouleurEtGras, texteGras, miseEnCouleur } from '../../modules/outils/contextSensitif.js'
import { abs, arrondi, egalOuApprox, sommeDesChiffres, signe, troncature } from '../../modules/outils/nombres.js'
import { distancePointDroite, homothetie, projectionOrtho, rotation, sensDeRotation, similitude, symetrieAxiale, translation, translation2Points } from '../../modules/2d/transformations.js'
import { nomVecteurParPosition, vecteur } from '../../modules/2d/vecteur.js'
import { tracePoint, tracePointSurDroite } from '../../modules/2d/tracePoint.js'
import { min, max, create, all, multiply, evaluate, divide, subtract, pow, isInteger, mod, cos, sin, format, parse, unit, complex, round, dot, cross } from 'mathjs'
import { labelLatexPoint, labelPoint } from '../../modules/2d/labelPoint.js'
import { extraireRacineCarree, obtenirListeFacteursPremiers, texFactorisation, texRacineCarree } from '../../modules/outils/factorisation.js'
import { calcul, nombreDecimal, scientifiqueToDecimal, texMasse, texNombre, texNombre2, texNombre3, texNombrec, texNum, texPrix } from '../../modules/outils/texNombres.js'
import { tableauDeVariation } from '../../modules/2d/tableauDeVariation.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../modules/FractionEtendue.js'
import { fraction, listeFractions } from '../../modules/fractions.js'
import { afficherTempo, cacherTempo, rotationAnimee, symetrieAnimee, translationAnimee, translationPuisRotationAnimees } from '../../modules/2dAnimation.js'
import { pointAdistance, pointIntersectionCC, pointIntersectionDD, pointIntersectionLC, pointSurDroite, pointSurSegment } from '../../modules/2d/pointSur.js'
import { carre, codageCarre, nommePolygone, polygone, polygoneAvecNom, polygoneRegulier, polygoneRegulierParCentreEtRayon, renommePolygone, boite } from '../../modules/2d/polygone.js'
import { angle, angleModulo, angleOriente, longueur, norme } from '../../modules/2d/calculs.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { crochetD, crochetG, intervalle } from '../../modules/2d/intervalles.js'
import { afficheLongueurSegment, afficheMesureAngle, codageAngle, codageAngleDroit, codageSegments, texteSurArc, texteSurSegment, codageSegment, afficheCoteSegment } from '../../modules/2d/codages.js'
import { nombreAvecEspace, stringNombre } from '../../modules/outils/stringNombre.js'
import { texEnumerate, texSymbole, texConsigne, printlatex, texEnumerateSansNumero, texTexte } from '../../modules/outils/texMiseEnForme.js'
import { infoMessage, lampeMessage, warnMessage } from '../../modules/outils/messages.js'
import { Arbre, texProba } from '../../modules/arbres.js'
import { cesar, choisitLettresDifferentes, lettreDepuisChiffre, lettreMinusculeDepuisChiffre, premiereLettreEnMajuscule, lettreIndiceeDepuisChiffre } from '../../modules/outils/lettres.js'
import { tableauColonneLigne } from '../../modules/outils/tableauCL.js'
import { cribleEratostheneN, decompositionFacteursPremiers, decompositionFacteursPremiersArray, listeDesDiviseurs, listeNombresPremiersStrictJusqua, obtenirListeNombresPremiers, premierMultipleSuperieur, premiersEntreBornes } from '../../modules/outils/premiers.js'
import { contraindreValeur, egal, entreDeux, estentier } from '../../modules/outils/comparateurs.js'
import { engrenage } from '../../modules/2d/engrenage.js'
import { katexPopup, katexPopup2 } from '../../modules/outils/popups.js'
import { svgEngrenages, SvgMachineDiag3F12, SvgMachineDiag3F1ActMono } from '../../modules/macroSvgJs.js'
import { machineMathsVideo, texCadreParOrange, tikzMachineDiag, tikzMachineMaths } from '../../modules/outils/3F1actfonctions.js'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDe } from '../../modules/outils/decimales.js'
import { chercheMinMaxFonction, resolutionSystemeLineaire2x2, resolutionSystemeLineaire3x3 } from '../../modules/outils/resolutions.js'
import { calcule, degCos, degSin, degres, fractionLatexToMathjs, radians } from '../../modules/fonctionsMaths.js'
import { cercle, cercleCentrePoint } from '../../modules/2d/cercle.js'
import { imagePointParTransformation } from '../../modules/outils/matrices.js'
import { arc, arcPointPointAngle, traceCompas } from '../../modules/2d/arc.js'
import { cibleCarree, cibleCouronne, cibleRonde, dansLaCibleCarree, dansLaCibleRonde } from '../../modules/2d/cibles.js'
import { arcenciel, couleurTab, texcolors } from '../../modules/outils/couleurs.js'
import { pavage } from '../../modules/2d/pavage.js'
import { creerNomDePolygone } from '../../modules/outils/strings.js'
import Grandeur from '../../modules/Grandeur.js'
import { grille, papierPointe, seyes } from '../../modules/2d/grilles.js'
import { aireTriangle, centreGraviteTriangle, codageHauteurTriangle, codageMedianeTriangle, hauteurTriangle, medianeTriangle, triangle2points1hauteur, triangle2points2longueurs } from '../../modules/2d/triangle.js'
import { quatriemeProportionnelle } from '../../modules/outils/proportions.js'
import { arc3d, arete3d, barre3d, CodageAngleDroit3D, cube, cube3d, cylindre3d, demicercle3d, droite3d, homothetie3d, paveLPH3d, plaque3d, point3d, polygone3d, prisme3d, pyramide3d, pyramideTronquee3d, rotation3d, rotationV3d, sensDeRotation3d, sphere3d, translation3d, vecteur3d } from '../../modules/3d.js'
import { diagrammeBarres, traceBarre, traceGraphiqueCartesien, diagrammeCirculaire } from '../../modules/2d/graphiques.js'
import { scratchblock } from '../../modules/2d/scratchblock.js'
import { noteLaCouleur, plateau2dNLC } from '../../modules/noteLaCouleur.js'
import { ajouterAx, ajouterAy, allerA, angleScratchTo2d, attendre, avance, baisseCrayon, clone, creerLutin, leveCrayon, orienter, tournerD, tournerG } from '../../modules/2dLutin.js'
import { jour, joursParMois, listeDeNotes, nomDuMois, tirerLesDes, unMoisDeTemperature } from '../../modules/outils/statistiques.js'
import { objet, objetM, objetF, personne, prenom, prenomF, prenomM, prenomPronom, personnes } from '../../modules/outils/objetsPersonnes.js'
import { Relatif, sommeDesTermesParSigne, triePositifsNegatifs } from '../../modules/outils/relatifs.js'
import { eclatePuissance, puissanceEnProduit, simpExp, simpNotPuissance, reorganiseProduitPuissance, ecriturePuissance } from '../../modules/outils/puissances.js'
import { choixDeroulant } from '../../modules/interactif/questionListeDeroulante.js'
import { polyline } from '../../modules/2d/polyline.js'
import { bissectrice, codageBissectrice, codageMediatrice, codageMilieu, mediatrice } from '../../modules/2d/droitesRemarquables.js'
import { cone } from '../../modules/2d/cone.js'
import { semiEllipse } from '../../modules/2d/ellipse.js'
import { Triangles } from '../../modules/outils/triangles.js'
import ChoisirExpressionNumerique from './_choisirExpressionNumerique.js'
import ChoisirExpressionLitterale from './_Choisir_expression_litterale.js'
import { labyrinthe } from '../../modules/2d/labyrinthe.js'
import { TrouverSolutionMathador } from '../../modules/outils/mathador.js'
import { pointCliquable, fractionCliquable, rectangleCliquable } from '../../modules/2dinteractif.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
import { demiDroite } from '../../modules/2d/demiDroite.js'
import { parallelogramme2points1hauteur } from '../../modules/2d/parallelogramme.js'
import { minToHeuresMinutes, minToHoraire, minToHour } from '../../modules/outils/horaires.js'
import { htmlConsigne } from '../../modules/outils/htmlMiseEnForme.js'
import { motifs } from '../../modules/2d/motif.js'
import Operation from '../../modules/operations.js'
import { glisseNombre } from '../../modules/2d/glisseNombre.js'
import { rapporteur } from '../../modules/2d/rapporteur.js'
import { tableau } from '../../modules/2d/tableau.js'
import { xcas } from '../../modules/outils/xcas.js'
import { resoudre, calculer, aleaVariables, toTex, assignVariables, aleaName } from '../../modules/outilsMathjs.js'
import { GVGraphicView } from '../../modules/aleaFigure/GraphicView.js'
import { GVGrandeur } from '../../modules/aleaFigure/grandeurs.js'
import { circularPermutation, getDimensions } from '../../modules/aleaFigure/outils.js'
import { GVAleaThalesConfig } from '../../modules/aleaFigure/outilsThales.js'
/**
  * @class
  * @classdesc Graphic object like Point, Line, Segment etc.
  */
export class GVGraphicObject {
  visible /** boolean */
  _name /** string */
  color /** string */ = 'black'
  constructor () {
    this.visible = false
    this.name = ''
  }

  aleaName (...name /** (string | GVGraphicObject)[] */) {
    this.name = aleaName(name.map(x => {
      if (x instanceof GVGraphicObject) {
        return x.name
      } else {
        return x
      }
    }), name.length).join('')
  }

  set name (newname) {
    this._name = newname
  }

  get name () { return this._name }
  getGGB () {
    return this.name
  }

  /**
    * Move this right to figures
    * @param figures
    */
  moveRight (...figures/** GVGraphicObject[] */) {
    const [xmin1, ymin1, xmax1, ymax1] = getDimensions(this)
    const [xmin2, ymin2, xmax2, ymax2] = getDimensions(...figures)
    const P1 = new GVPoint(xmin1, ymin1)
    const P2 = new GVPoint(xmax2, ymax2)
    const t = new GVVector(P1, P2)
    this.move(t.add(new GVVector(4, 0)).sub(new GVVector(0, (ymax2 - ymin2 + ymax1 - ymin1) / 2)))
  }

  move (V /** GVVctor */) {
    if (this instanceof GVPoint) {
      this.x = this.add(V).x
      this.y = this.add(V).y
    } else if (this instanceof GVPolygon) {
      for (const P of this.vertices) {
        P.x = P.add(V).x
        P.y = P.add(V).y
      }
    }
  }
}
/**
  * @class
  * @classdesc Caracteristics of a point in an euclidean plan
  */
export class GVPoint extends GVGraphicObject {
  coordinates /** GVCoordinates */
  polarCoordinates /** GVPolar */
  cartesianCoordinates /** GVCartesian */
  type /** string */
  x /** number */
  y /** number */
  r /** number */
  theta /** number */
  ggb /** string */
  dot /** any */
  labelPoints /** [GVPoint, GVPoint, GVPoint] */
  label /** boolean */ = false
  M2D /** any */
  constructor (arg1/** GVCoordinates | number */, arg2 /** number */ = 0) {
    super()
    if (arg1 instanceof GVCoordinates) {
      this.coordinates = arg1
    } else {
      this.coordinates = new GVCartesian(arg1, arg2)
    }
    this.polarCoordinates = this.getPolarCoordinates()
    this.cartesianCoordinates = this.getCartesianCoordinates()
    this.name = ''
    this.type = 'Point'
    this.x = this.cartesianCoordinates.x
    this.y = this.cartesianCoordinates.y
    this.r = this.polarCoordinates.r
    this.theta = this.polarCoordinates.theta
    this.ggb = `${this.name} = (${this.x},${this.y})`
    this.M2D = point(this.x, this.y, '', 'above right')
  }

  getPolarCoordinates ()/** GVCartesian */ {
    return this.coordinates.getPolarCoordinates()
  }

  getCartesianCoordinates () {
    return this.coordinates.getCartesianCoordinates()
  }

  xSVG = function (coeff) {
    return round(this.x * coeff, 3)
  }

  ySVG = function (coeff) {
    return -round(this.y * coeff, 3)
  }

  getRotate (O /** GVPoint */, angle /** number */) {
    return new GVPoint(
      new GVCartesian(
        (this.x - O.x) * Math.cos(angle) - (this.y - O.y) * Math.sin(angle) + O.x,
        (this.x - O.x) * Math.sin(angle) + (this.y - O.y) * Math.cos(angle) + O.y
      ))
  }

  add (X /** GVVctor | GVPoint */) /** GVPoint */ {
    return new GVPoint(new GVCartesian(this.x + X.x, this.y + X.y))
  }

  sub (X /** GVVctor | GVPoint */) /** GVPoint */ {
    return new GVPoint(new GVCartesian(this.x - X.x, this.y - X.y))
  }

  multiply (k /** number */) /** GVPoint */ {
    return new GVPoint(new GVCartesian(this.x * k, this.y * k))
  }

  divide (k /** number */) /** GVPoint */ {
    return new GVPoint(new GVCartesian(this.x / k, this.y / k))
  }

  getBarycentriqueCoords (A /** GVPoint */, B /** GVPoint */, C /** GVPoint */) /** number[] */ {
    const a /** number */ = determinant(B.sub(this), C.sub(this))
    const b /** number */ = determinant(C.sub(this), A.sub(this))
    const c /** number */ = determinant(A.sub(this), B.sub(this))
    return [a, b, c]
  }

  isInTriangle (A /** GVPoint */, B /** GVPoint */, C /** GVPoint */) /** boolean */ {
    return Math.min(...this.getBarycentriqueCoords(A, B, C)) > 0 || Math.max(...this.getBarycentriqueCoords(A, B, C)) < 0
  }

  /**
    * Get the symétric of P with this
    * @param P
    * @returns {GVPoint}
    */
  getSymetric (P /** GVPoint */) /** GVPoint */ {
    return barycentre([this, P], [2, -1])
  }

  getHomothetic (O /** GVPoint */, k /** number */) {
    return new GVPoint(
      new GVCartesian(
        k * this.x + (1 - k) * O.x,
        k * this.y + (1 - k) * O.y
      ))
  }

  getVector () {
    return new GVVector(this.x, this.y)
  }

  getGGB () {
    this.ggb = `${this.name} = (${this.x},${this.y})`
    return `${this.name} = (${this.x},${this.y})`
  }

  showName (scaleppc /** number */ = 1) /** string */ {
    let label /** any */
    const splitname = this.name.split('_')
    let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`
    if (this.labelPoints !== undefined) {
      const P1 = this.labelPoints[0]
      const P3 = this.labelPoints[2]
      const S = this.labelPoints[1]
      const v1 = P1.sub(S).getVector().getNormed()
      const v3 = P3.sub(S).getVector().getNormed()
      const corr = new GVVector(0, -0.3 * scaleppc)
      let P /** GVPoint */
      if (v1.colinear(v3)) { // Colinéaires
        P = S.add(v1.getNormal().multiply(scaleppc * 0.4)).add(corr)
      } else { // Non colinéaires
        P = S.getSymetric(S.add(v1.add(v3).getNormed().multiply(scaleppc * 0.4))).add(corr)
      }
      if (context.isHtml) {
        label = latexParCoordonnees(nameFormat, P.x, P.y)
      } else {
        nameFormat = `$${nameFormat}$`
        label = labelPoint(point(P.x, P.y, nameFormat, 'above'))
      }
      //
      this.labelPoints = [P1, S, P3]
    } else {
      if (context.isHtml) {
        label = latexParCoordonnees(nameFormat, this.x, this.y + 0.2 * scaleppc)
      } else {
        nameFormat = `$${nameFormat}$`
        label = labelPoint(point(this.x, this.y, nameFormat, 'above'))
      }
    }
    this.label = true
    return label
  }

  showDot () {
    const splitname = this.name.split('_')
    let nameFormat = splitname.length === 1 ? splitname[0] : `${splitname[0]}_{${splitname[1]}}`
    if (context.isHtml) nameFormat = `$${nameFormat}$`

    this.dot = tracePoint(point(this.x, this.y, nameFormat, 'above'))
    return this
  }

  set name (newname) {
    this._name = newname
    this.ggb = `${this.name} = (${this.x},${this.y})`
  }

  get name () { return this._name }
}
export class GVVector {
  x /** number */ = 0
  y /** number */ = 0
  norme /** number */
  constructor (arg1 /** number | GVPoint */, arg2 /** number | GVPoint */) {
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
      this.x = arg1
      this.y = arg2
    } else if (arg1 instanceof GVPoint && arg2 instanceof GVPoint) {
      this.x = arg2.x - arg1.x
      this.y = arg2.y - arg1.y
    }
    this.norme = Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  getNormed () {
    const xy = Math.sqrt(this.x ** 2 + this.y ** 2)
    return new GVVector(this.x / xy, this.y / xy)
  }

  getNormal () /** GVVctor */ {
    return new GVVector(-this.y, this.x)
  }

  add (X /** GVVctor | GVPoint */) /** GVVctor */ {
    return new GVVector(this.x + X.x, this.y + X.y)
  }

  sub (X /** GVVctor | GVPoint */) /** GVVctor */ {
    return new GVVector(this.x - X.x, this.y - X.y)
  }

  multiply (k /** number */) /** GVVctor */ {
    return new GVVector(this.x * k, this.y * k)
  }

  neg () /** GVVctor */ {
    return new GVVector(-this.x, -this.y)
  }

  dot (X /** GVVctor | GVPoint */) /** number */ {
    return dot([this.x, this.y], [X.x, X.y])
  }

  cross (X /** GVVctor | GVPoint */)/** MathArray | Matrix */ {
    const Cross = cross([this.x, this.y, 0], [X.x, X.y, 0])
    return Cross
  }

  colinear (V /** GVVctor */) /** boolean */ {
    return parseFloat(cross([this.x, this.y, 0], [V.x, V.y, 0])[2].toFixed(15)) === 0
  }
}
/**
    * @class
    * @classdesc Caracteristics of a line in an euclidean plan (ax+by=c)
    */
export class GVLine extends GVGraphicObject {
  direction /** GVVctor */
  A /** GVPoint */
  B /** GVPoint */
  type /** string */
  a /** number */ = 0
  b /** number */ = 0
  c /** number */ = 0
  ggb /** string */
  // Une droite sera définie par deux points distincts ou un point et une direction
  // Il faudrait deux constructeurs ?
  constructor (A /** GVPoint */, B /** GVPoint | GVVector */) {
    super()
    this.direction = B instanceof GVVector ? B : new GVVector(B.x - A.x, B.y - A.y)
    this.A = A
    this.B = B instanceof GVPoint ? B : new GVPoint(new GVCartesian(A.x + B.x, A.y + B.y))
    this.getEquation()
    this.type = 'Line'
    this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`
  }

  getYPoint (x /** number */) {
    return this.b === 0 ? undefined : (this.c - this.a * x) / this.b
  }

  getXPoint (y /** number */) {
    return this.a === 0 ? undefined : (this.c - this.b * y) / this.a
  }

  getEquation () {
    const directionUnit = this.direction.getNormed()
    this.a = -directionUnit.y
    this.b = directionUnit.x
    this.c = this.a * this.A.x + this.b * this.A.y
  }

  getIntersect (L/** GVLine */) /** GVPoint */ {
    const delta = L.a * this.b - this.a * L.b
    if (delta.toFixed(15) !== '0') {
      const deltax = -(L.b * this.c - this.b * L.c)
      const deltay = L.a * this.c - this.a * L.c
      const point = new GVPoint(new GVCartesian(deltax / delta, deltay / delta))
      return point
    }
  }

  getPerpendicularLine (P /** GVPoint */) {
    return new GVLine(P, this.direction.getNormal())
  }

  /**
    * Get the symétric of P with this
    * @param P
    * @returns {GVPoint}
    */
  getSymetric (P /** GVPoint */) /** GVPoint */ {
    return barycentre([this.getIntersect(this.getPerpendicularLine(P)), P], [2, -1])
  }

  set name (newname) {
    this._name = newname
    this.ggb = `${this.name}: ${this.a}*x+${this.b}*y=${this.c})`
  }

  get name () { return this._name }
}
export function determinant (X /** GVVctor | GVPoint */, Y /** GVVctor | GVPoint */) /** number */ {
  return X.x * Y.y - X.y * Y.x
}
export function barycentre (P /** GVPoint[] */, a /** number[] */) /** GVPoint */ {
  const pointsPonderes = P.map((x, i) => x.multiply(a[i]))
  return pointsPonderes.reduce((accumulator, curr) => accumulator.add(curr)).divide(a.reduce((accumulator, curr) => accumulator + curr))
}
/**
    * @class
    * @classdesc Caracteristics of a segment in an euclidean plan
    */
export class GVSegment extends GVLine {
  label /** boolean */
  text /** string */ = ''
  textColor /** string */ = 'black'
  direct /** boolean */ = true
  constructor (A /** GVPoint */, B /** GVPoint */) {
    super(A, B)
    this.type = 'Segment'
    this.A = A
    this.B = B
    this.aleaName(this.A, this.B)
    this.getEquation()
  }

  showLabel (scaleppc /** number */ = 1) {
    let label /** any */
    const P = new GVPoint((this.A.x + this.B.x) / 2, (this.A.y + this.B.y) / 2)
    if (context.isHtml) {
      label = latexParPoint(this.name, point(P.x, P.y, '', 'center'), 'black', 50, 8, '')
      // LatexParCoordonnees(texte, x, y, color, largeur, hauteur, colorBackground, tailleCaracteres)
    } else {
      label = latexParPoint(this.name, point(P.x, P.y, '', 'center'), 'black', 20, 8, '')
      // label = labelPoint(point(P.x, P.y, `$${this.name}$`, 'center'))
    }
    this.label = true
    return label
  }
}
/**
    * @class
    * @classdesc Caracteristics of a circle in an euclidean plan
    */
export class GVCircle extends GVGraphicObject {
  A /** GVPoint */ // center
  B /** GVPoint | number */
  type /** string */
  a /** number */ = 0
  b /** number */ = 0
  r /** number */ = 0
  constructor (A /** GVPoint */, B /** GVPoint | number */) {
    super()
    this.type = 'Circle'
    this.A = A
    this.B = B instanceof GVPoint ? B : A
    this.r = B instanceof GVPoint ? Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2) : B
  }

  getPoint (theta /** number */) /** GVPoint */ {
    return new GVPoint(
      new GVCartesian(
        this.A.x + this.r * Math.cos(theta),
        this.A.y + this.r * Math.sin(theta)
      )
    )
  }
}
/**
    * @class
    * @classdesc Caracteristics of an angle
    */
export class GVAngle extends GVGraphicObject {
  A /** GVPoint */
  B /** GVPoint */
  C /** GVPoint */
  angle /** number */
  type /** string */
  direct /** boolean */
  vBA /** GVVctor */
  vBC /** GVVctor */
  right /** boolean */ = false
  fillColor /** string */ = 'none'
  fillOpacity /** number */ = 0.2
  rayon /** boolean */ = true
  constructor (A /** GVPoint */, B /** GVPoint */, C /** GVPoint */) {
    super()
    this.type = 'Angle'
    const vA = new GVVector(A.x, A.y)
    const vB = new GVVector(B.x, B.y)
    const vC = new GVVector(C.x, C.y)
    const vBA = vA.sub(vB).getNormed()
    const vBC = vC.sub(vB).getNormed()
    this.vBA = vBA
    this.vBC = vBC
    const cos = vBA.x * vBC.x + vBA.y * vBC.y
    this.angle = Math.acos(cos)
    this.A = B.add(vBA)
    this.B = B
    this.C = B.add(vBC)
    this.direct = cross([vBA.x, vBA.y, 0], [vBC.x, vBC.y, 0])[2] > 0
  }

  scale (scale /** number */) {
    const vBA = this.vBA.multiply(scale)
    const vBC = this.vBC.multiply(scale)
    this.A = this.B.add(vBA)
    this.C = this.B.add(vBC)
  }
}
/**
    * @class
    * @classdesc Caracteristics of an angle
    */
export class GVPolygon extends GVGraphicObject {
  showLabels /** boolean */ = true
  constructor (...args /** GVPoint[] */) {
    super()
    this.vertices /** GVPoint[] */= args
    this.name = circularPermutation(args.map(x => x.name)).join('')
  }

  getDimensions () {
    const listXPoint = this.vertices.map(M => M.x)
    const listYPoint = this.vertices.map(M => M.y)
    const xmin = Math.min(...listXPoint)
    const xmax = Math.max(...listXPoint)
    const ymin = Math.min(...listYPoint)
    const ymax = Math.max(...listYPoint)
    return [xmin, ymin, xmax, ymax]
  }
}
/**
    * @class
    * @classdesc Caracteristics of a triangle
    */
export class GVRectangle extends GVPolygon {
  longueur /** number */
  largeur /** number */
  ratio /** number */
  constructor (...args /** GVPoint[] */) {
    super(...args)
    const [A, B, C, D] = args
    const dimensions = [Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2), Math.sqrt((C.x - B.x) ** 2 + (C.y - B.y) ** 2)].sort()
    this.largeur = dimensions[0]
    this.longueur = dimensions[1]
    this.ratio = this.longueur / this.largeur
  }
}
/**
    * @class
    * @classdesc Caracteristics of a triangle
    */
export class GVTriangle extends GVPolygon {
  constructor (...args /** GVPoint[] */) {
    super(...args)
  }
}
