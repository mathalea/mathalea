import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, fixeBordures, vide2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListes, combinaisonListesSansChangerOrdre } from '../../modules/outils/listes.js'
import { listeDiviseurs, pgcd, ppcm, quotientier, randint } from '../../modules/outils/entiers.js'
import { choice, compteOccurences, enleveDoublonNum, enleveElement, enleveElementBis, range1, rangeMinMax, shuffle, shuffle2tableaux, range, creerCouples } from '../../modules/outils/arrays.js'
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
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { latexParCoordonnees, latexParPoint, texteParPoint, texteParPointEchelle, texteParPosition } from '../../modules/2d/textes.js'
import { droite, droiteParPointEtPente, positionLabelDroite, droiteHorizontaleParPoint, droiteVerticaleParPoint, droiteParPointEtPerpendiculaire, droiteParPointEtParallele, dessousDessus } from '../../modules/2d/droites.js'
import { itemize, miseEnEvidence, numAlpha, sp, texteCentre, texteEnCouleur, texteEnCouleurEtGras, texteGras } from '../../modules/outils/contextSensitif.js'
import { abs, arrondi, egalOuApprox, sommeDesChiffres, signe } from '../../modules/outils/nombres.js'
import { distancePointDroite, homothetie, projectionOrtho, rotation, similitude, symetrieAxiale, translation, translation2Points } from '../../modules/2d/transformations.js'
import { nomVecteurParPosition, vecteur } from '../../modules/2d/vecteur.js'
import { tracePoint } from '../../modules/2d/tracePoint.js'
import { min, max, create, all, multiply, evaluate, divide, subtract, pow, round, isInteger, mod, cos, sin } from 'mathjs'
import { labelPoint } from '../../modules/2d/labelPoint.js'
import { resoudre } from '../../modules/outilsMathjs.js'
import { extraireRacineCarree, obtenirListeFacteursPremiers, texFactorisation } from '../../modules/outils/factorisation.js'
import { calcul, nombreDecimal, scientifiqueToDecimal, texNombre, texNombre2, texNombrec, texNum, texPrix } from '../../modules/outils/texNombres.js'
import { tableauDeVariation } from '../../modules/2d/tableauDeVariation.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../modules/FractionEtendue.js'
import { fraction, listeFractions } from '../../modules/fractions.js'
import { rotationAnimee, symetrieAnimee, translationAnimee } from '../../modules/2dAnimation.js'
import { pointAdistance, pointIntersectionCC, pointIntersectionDD, pointIntersectionLC, pointSurDroite, pointSurSegment } from '../../modules/2d/pointSur.js'
import { carre, codageCarre, nommePolygone, polygone, polygoneAvecNom, polygoneRegulier, polygoneRegulierParCentreEtRayon, renommePolygone } from '../../modules/2d/polygone.js'
import { angle, angleOriente, longueur, norme } from '../../modules/2d/calculs.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { crochetD, crochetG, intervalle } from '../../modules/2d/intervalles.js'
import { barycentre, milieu } from '../../modules/2d/barycentre.js'
import { afficheLongueurSegment, afficheMesureAngle, codageAngle, codageAngleDroit, codageSegments, texteSurArc, texteSurSegment, codageSegment, afficheCoteSegment } from '../../modules/2d/codages.js'
import { nombreAvecEspace, stringNombre } from '../../modules/outils/stringNombre.js'
import { texEnumerate, texSymbole, texConsigne, printlatex, texEnumerateSansNumero } from '../../modules/outils/texMiseEnForme.js'
import { infoMessage, lampeMessage, warnMessage } from '../../modules/outils/messages.js'
import { Arbre, texProba } from '../../modules/arbres.js'
import { cesar, choisitLettresDifferentes, lettreDepuisChiffre, lettreMinusculeDepuisChiffre, premiereLettreEnMajuscule } from '../../modules/outils/lettres.js'
import { tableauColonneLigne } from '../../modules/outils/tableaucl.js'
import { cribleEratostheneN, decompositionFacteursPremiers, decompositionFacteursPremiersArray, listeDesDiviseurs, listeNombresPremiersStrictJusqua, obtenirListeNombresPremiers, premierMultipleSuperieur, premiersEntreBornes } from '../../modules/outils/premiers.js'
import { contraindreValeur, egal, estentier } from '../../modules/outils/comparateurs.js'
import { engrenage } from '../../modules/2d/engrenage.js'
import { katexPopup, katexPopup2 } from '../../modules/outils/popups.js'
import { svgEngrenages, SvgMachineDiag3F12, SvgMachineDiag3F1ActMono } from '../../modules/macroSvgJs.js'
import { machineMathsVideo, texCadreParOrange, tikzMachineDiag, tikzMachineMaths } from '../../modules/outils/3F1actfonctions.js'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDe } from '../../modules/outils/decimales.js'
import { chercheMinMaxFonction, resolutionSystemeLineaire2x2, resolutionSystemeLineaire3x3 } from '../../modules/outils/resolutions.js'
import { calcule, degres, radians } from '../../modules/fonctionsMaths.js'
import { cercle, cercleCentrePoint } from '../../modules/2d/cercle.js'
import { imagePointParTransformation } from '../../modules/outils/matrices.js'
import { arc, arcPointPointAngle, traceCompas } from '../../modules/2d/arc.js'
import { cibleCarree, dansLaCibleCarree } from '../../modules/2d/cibles.js'
import { arcenciel, texcolors } from '../../modules/outils/couleurs.js'
import { pavage } from '../../modules/2d/pavage.js'
import { creerNomDePolygone } from '../../modules/outils/strings.js'
import Grandeur from '../../modules/Grandeur.js'
import { grille, papierPointe, seyes } from '../../modules/2d/grilles.js'
import { aireTriangle, centreGraviteTriangle, codageHauteurTriangle, codageMedianeTriangle, hauteurTriangle, medianeTriangle, triangle2points2longueurs } from '../../modules/2d/triangle.js'
import { quatriemeProportionnelle } from '../../modules/outils/proportions.js'
import { arete3d, CodageAngleDroit3D, cube, cylindre3d, demicercle3d, droite3d, point3d, rotation3d, rotationV3d, sensDeRotation3d, sphere3d, vecteur3d } from '../../modules/3d.js'
import { diagrammeBarres, traceBarre, traceGraphiqueCartesien } from '../../modules/2d/graphiques.js'
import { scratchblock } from '../../modules/2d/scratchblock.js'
import { noteLaCouleur, plateau2dNLC } from '../../modules/noteLaCouleur.js'
import { ajouterAx, ajouterAy, allerA, angleScratchTo2d, attendre, avance, baisseCrayon, creerLutin, leveCrayon, orienter, tournerD, tournerG } from '../../modules/2dLutin.js'
import { joursParMois, listeDeNotes, nomDuMois, tirerLesDes, unMoisDeTemperature } from '../../modules/outils/statistiques.js'
import { objet, personne, prenom, prenomF, prenomM, prenomPronom, personnes } from '../../modules/outils/objetsPersonnes.js'
import { Relatif, sommeDesTermesParSigne, triePositifsNegatifs } from '../../modules/outils/relatifs.js'
import { eclatePuissance, puissanceEnProduit, simpExp, simpNotPuissance, reorganiseProduitPuissance } from '../../modules/outils/puissances.js'
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
import { pointCliquable } from '../../modules/2dinteractif.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
import { demiDroite } from '../../modules/2d/demiDroite.js'
import { parallelogramme2points1hauteur } from '../../modules/2d/parallelogramme.js'
import { minToHour } from '../../modules/outils/horaires.js'
import { htmlConsigne } from '../../modules/outils/htmlMiseEnForme.js'
import { motifs } from '../../modules/2d/motif.js'
export const dateDeModificationImportante = '14/11/2021'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * @author Jean-Claude Lhote  (Ajout AMC par Eric Elter, ES6 par Loïc Geeraerts)
 * Fonction générale pour les exercices de construction de symétriques (centrale/axiale et points/triangles)
 * références  6G24-1, 6G24-2, 5G10-1, 5G10-2, 5G11-1 et 5G11-2
 * Permet une sortie html/pdf sur petits carreaux/gros carreaux/papier blanc
 * Relecture : Novembre 2021 par EE
 */

export default class ConstruireParSymetrie extends Exercice {
  constructor () {
    super()
    this.titre = 'Construire par Symétrie...'
    this.nbQuestions = 1
    this.nbCols = 1
    this.nbColsCorr = 1
    this.sup = 1
    this.sup2 = 1
    this.sup3 = 1
    this.figure = false

    this.besoinFormulaireNumerique = ['Type de questions', 6, '1 : Axe horizontal ou vertical\n2 : Axe oblique à 45°\n3 : Axe avec une légère pente\n4 : Toutes les symétries axiales\n5 : Symétrie centrale\n6 : Mélange']
    this.besoinFormulaire2Numerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche'
    ]
    this.besoinFormulaire3Numerique = ['Niveau de difficulté pour la symétrie axiale', 5, '1 : Tous les points du même côté de l\'axe\n2 : Deux points du même côté et le troisième sur l\'axe\n3 : Un point sur l\'axe et un de chaque côté\n4 : Deux points d\'un côté de l\'axe et le troisième de l\'autre côté\n5 : Mélange']
  }

  // La fonction qui suit va chercher 3 points au hasard placés par rapport à la droite d de la façon demandée
  // Elle va s'assurer que la distance entre les projetés n'est pas trop petite afin d'espacer les corrections
  // Si pour une raison ou une autre elle ne trouve pas de point convenable, un message dans la console le signale.
  _choisi3Points (d, lieu = ['dessus', 'dessous', 'sur']) {
    let A, B, C
    let pA, pB, pC
    let lAB, lAC, lBC
    let hA, hB, hC
    let count = 0
    let count3 = 0
    do { // on vérifie que les points sont assez espacés les uns des autres.
      do { // on vérifie que le point est du bon côté et à distance suffisante de la droite.
        if (lieu[0] === 'sur') A = pointSurDroite(d, randint(-6, 6))
        else A = point(randint(-8, 8), randint(-8, 8))
        pA = projectionOrtho(A, d)
        hA = longueur(A, pA)
        count++
      } while (((hA < 2 && lieu[0] !== 'sur') || dessousDessus(d, A) !== lieu[0]) && count < 50)
      if (count === 50) {
        window.notify('Choisi3Points : Impossible de trouver le premier des 3 points', { lieu, d })
      }
      count = 0
      do { // on vérifie que le point est du bon côté et à distance suffisante de la droite.
        if (lieu[1] === 'sur') B = pointSurDroite(d, randint(-6, 6))
        else B = point(randint(-8, 8, A.x), randint(-8, 8, A.y))
        pB = projectionOrtho(B, d)
        hB = longueur(B, pB)
        count++
      } while (((hB < 2 && lieu[1] !== 'sur') || dessousDessus(d, B) !== lieu[1]) && count < 50)
      if (count === 50) {
        window.notify('Choisi3Points : Impossible de trouver le deuxième des 3 points', { lieu, d })
      }
      count = 0
      do { // on vérifie que le point est du bon côté et à distance suffisante de la droite.
        if (lieu[2] === 'sur') C = pointSurDroite(d, randint(-8, 8))
        else C = point(randint(-8, 8, [A.x, B.x]), randint(-8, 8, [A.y, B.y]))
        pC = projectionOrtho(C, d)
        hC = longueur(C, pC)
        count++
      } while (((hC < 2 && lieu[2] !== 'sur') || dessousDessus(d, C) !== lieu[2]) && count < 50)
      if (count === 50) {
        window.notify('Choisi3Points : Impossible de trouver le troisième des 3 points', { lieu, d })
      }
      lAB = longueur(pA, pB)
      lAC = longueur(pA, pC)
      lBC = longueur(pB, pC)
      count3++
    } while ((lAB < 2 || lAC < 2 || lBC < 2 || aireTriangle(polygone(A, B, C)) < 15) && count3 < 20)
    if (count3 === 50) { // si on en est là, c'est qu'il y a trop de contraintes
      window.notify('Choisi3Points : Impossible de trouver 3 points', { lieu, d })
    }
    return [A, B, C] // Il y aura quand même trois points, même si ils ne conviennent pas au regard des contraintes
  }

  nouvelleVersion () {
    if (this.version === 5) {
      this.sup = 5
      this.sup3 = 5
    }
    let lieux, positionLabelDroite
    this.sup = parseInt(contraindreValeur(1, 6, this.sup, 6))
    this.sup3 = parseInt(contraindreValeur(1, 5, this.sup3, 5))
    let listeDeNomsDePolygones
    if (this.sup3 === 1) lieux = choice([['dessus', 'dessus', 'dessus'], ['dessous', 'dessous', 'dessous']])
    else if (this.sup3 === 2) lieux = choice([['dessus', 'sur', 'dessus'], ['dessous', 'sur', 'dessous']])
    else if (this.sup3 === 3) lieux = choice([['dessus', 'dessous', 'sur'], ['sur', 'dessous', 'dessus'], ['dessus', 'sur', 'dessous']])
    else if (this.sup3 === 4) lieux = choice([['dessus', 'dessous', 'dessus'], ['dessus', 'dessus', 'dessous']])
    else lieux = choice([['dessus', 'dessous', 'dessus'], ['dessus', 'dessus', 'dessous'], ['dessus', 'sur', 'dessus'], ['dessous', 'sur', 'dessus'], ['dessus', 'dessous', 'sur'], ['sur', 'dessous', 'dessus'], ['dessus', 'sur', 'dessous'], ['dessus', 'dessous', 'dessus'], ['dessus', 'dessus', 'dessous']])
    let typesDeQuestionsDisponibles = []
    switch (this.sup) {
      case 1:
        if (this.figure) {
          typesDeQuestionsDisponibles = [3]
        } else {
          typesDeQuestionsDisponibles = [0]
        }
        break
      case 2:
        if (this.figure) {
          typesDeQuestionsDisponibles = [4]
        } else {
          typesDeQuestionsDisponibles = [1]
        }
        break
      case 3:
        if (this.figure) {
          typesDeQuestionsDisponibles = [5]
        } else {
          typesDeQuestionsDisponibles = [2]
        }
        break
      case 4:
        if (this.figure) {
          typesDeQuestionsDisponibles = [3, 4, 5]
        } else {
          typesDeQuestionsDisponibles = [0, 1, 2]
        }
        break
      case 5:
        if (this.figure) {
          typesDeQuestionsDisponibles = [7]
        } else {
          typesDeQuestionsDisponibles = [6]
        }
        break
      case 6:
        if (this.figure) {
          typesDeQuestionsDisponibles = [3, 4, 5, 7]
        } else {
          typesDeQuestionsDisponibles = [0, 1, 2, 6]
        }
        break
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let Xmin, Xmax, Ymin, Ymax, sc
    if (parseInt(this.sup2) === 2) sc = 0.8
    else sc = 0.5

    let A; let AA; let cA; let sA
    let B
    let C; let CC; let cC; let sC; let sCE
    let D; let DD; let cD; let sD; let sDE
    let E; let EE; let cE; let sE; let sED
    let sEC
    let d; let enonce
    let correction
    let g
    let carreaux
    let k
    const objetsEnonce = []
    const objetsCorrection = []
    let p1; let p2; let p1nom
    for (
      let i = 0, cpt = 0, numQuestion;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % 3 === 0) listeDeNomsDePolygones = ['PQXD']
      objetsEnonce.length = 0
      objetsCorrection.length = 0
      switch (listeTypeDeQuestions[i]) {
        case 0: // symétrie d'axe horizontal ou vertical de points
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          k = choice([true, false]) // k = true axe horizontal sinon vertical
          A = point(0, 0)
          if (k) d = droiteHorizontaleParPoint(A)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6)
          d.isVisible = true
          d.epaisseur = 2
          if (!k) {
            if (this.sup3 === 1) lieux = choice([['gauche', 'gauche', 'gauche'], ['droite', 'droite', 'droite']])
            else if (this.sup3 === 2) lieux = choice([['gauche', 'sur', 'gauche'], ['droite', 'droite', 'sur']])
            else if (this.sup3 === 3) lieux = choice([['sur', 'gauche', 'droite'], ['gauche', 'sur', 'droite']])
            else lieux = choice([['gauche', 'droite', 'gauche'], ['droite', 'gauche', 'droite']])
          } else {
            if (this.sup3 === 1) lieux = choice([['dessus', 'dessus', 'dessus'], ['dessous', 'dessous', 'dessous']])
            else if (this.sup3 === 2) lieux = choice([['dessus', 'sur', 'dessus'], ['dessous', 'dessous', 'sur']])
            else if (this.sup3 === 3) lieux = choice([['sur', 'dessus', 'dessous'], ['dessus', 'sur', 'dessous']])
            else lieux = choice([['dessus', 'dessous', 'dessus'], ['dessous', 'dessus', 'dessous']])
          }
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'above')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'above')
          cC = C.estSur(d) ? C : codageMediatrice(C, CC, 'red', '|')
          cD = D.estSur(d) ? D : codageMediatrice(D, DD, 'blue', 'X')
          cE = E.estSur(d) ? E : codageMediatrice(E, EE, 'green', 'O')
          sC = C.estSur(d) ? vide2d() : segment(C, CC)
          sD = D.estSur(d) ? vide2d() : segment(D, DD)
          sE = E.estSur(d) ? vide2d() : segment(E, EE)
          sCE = droite(CC, EE, '', 'gray')
          sCE.pointilles = 5
          sED = droite(EE, D, '', 'gray')
          sED.pointilles = 5
          sDE = droite(DD, E, '', 'gray')
          sDE.pointilles = 5
          sEC = droite(C, E, '', 'gray')
          sEC.pointilles = 5

          objetsCorrection.push(d, tracePoint(C, D, E, CC, DD, EE), labelPoint(C, D, E, CC, DD, EE), cC, cD, cE, sC, sD, sE, sED, sDE, sCE, sEC)
          objetsEnonce.push(tracePoint(C, D, E), labelPoint(C, D, E), d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'

          break
        case 1: // symétries axiales d'axes à 45° de points (6ème)
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 1])
          d = droiteParPointEtPente(A, k)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          d.isVisible = true
          d.epaisseur = 2;
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'above')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'above')
          cC = C.estSur(d) ? C : codageMediatrice(C, CC, 'red', '|')
          cD = D.estSur(d) ? D : codageMediatrice(D, DD, 'blue', 'X')
          cE = E.estSur(d) ? E : codageMediatrice(E, EE, 'green', 'O')
          sC = C.estSur(d) ? vide2d() : segment(C, CC)
          sD = D.estSur(d) ? vide2d() : segment(D, DD)
          sE = E.estSur(d) ? vide2d() : segment(E, EE)
          sCE = droite(CC, EE, '', 'gray')
          sCE.pointilles = 5
          sED = droite(EE, D, '', 'gray')
          sED.pointilles = 5
          sDE = droite(DD, E, '', 'gray')
          sDE.pointilles = 5
          sEC = droite(C, E, '', 'gray')
          sEC.pointilles = 5
          objetsCorrection.push(d, tracePoint(C, D, E, CC, DD, EE), labelPoint(C, D, E, CC, DD, EE), cC, cD, cE, sC, sD, sE, sED, sDE, sCE, sEC)
          objetsEnonce.push(tracePoint(C, D, E), labelPoint(C, D, E), d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'

          break
        case 2: // Axe de symétrie légèrement penché (utilisation du quadrillage plus complexe)
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, choice([-1, 1], A.y), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 2;
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          CC = symetrieAxiale(C, d, `${p1nom[2]}'`, 'above')
          DD = symetrieAxiale(D, d, `${p1nom[3]}'`, 'above')
          EE = symetrieAxiale(E, d, `${p1nom[4]}'`, 'above')
          cC = C.estSur(d) ? C : codageMediatrice(C, CC, 'red', '|')
          cD = D.estSur(d) ? D : codageMediatrice(D, DD, 'blue', 'X')
          cE = E.estSur(d) ? E : codageMediatrice(E, EE, 'green', 'O')
          sC = C.estSur(d) ? vide2d() : segment(C, CC)
          sD = D.estSur(d) ? vide2d() : segment(D, DD)
          sE = E.estSur(d) ? vide2d() : segment(E, EE)
          sCE = segment(CC, EE, 'gray')
          sCE.pointilles = 5
          sED = segment(EE, D, 'gray')
          sED.pointilles = 5
          sDE = segment(DD, E, 'gray')
          sDE.pointilles = 5
          sEC = segment(C, E, 'gray')
          sEC.pointilles = 5

          objetsCorrection.push(d, tracePoint(C, D, E, CC, DD, EE), labelPoint(C, D, E, CC, DD, EE), cC, cD, cE, sC, sD, sE, sED, sDE, sCE, sEC)
          objetsEnonce.push(tracePoint(C, D, E), labelPoint(C, D, E), d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[4]}'$ symétrique de $${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, E.x, EE.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, E.y, EE.y, CC.y, DD.y) + 1)

          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'
          break

        case 3: // symétrie axiale (Axe vertical ou horizontal) d'un triangle
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([true, false]) // si k est true alors d est horizontale sinon elle est verticale
          if (k) d = droiteHorizontaleParPoint(A)
          else d = droiteVerticaleParPoint(A)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')

          if (!k) {
            if (this.sup3 === 1) lieux = choice([['gauche', 'gauche', 'gauche'], ['droite', 'droite', 'droite']])
            else if (this.sup3 === 2) lieux = choice([['gauche', 'sur', 'gauche'], ['droite', 'droite', 'sur']])
            else if (this.sup3 === 3) lieux = choice([['sur', 'gauche', 'droite'], ['gauche', 'sur', 'droite']])
            else lieux = choice([['gauche', 'droite', 'gauche'], ['droite', 'gauche', 'droite']])
          } else {
            if (this.sup3 === 1) lieux = choice([['dessus', 'dessus', 'dessus'], ['dessous', 'dessous', 'dessous']])
            else if (this.sup3 === 2) lieux = choice([['dessus', 'sur', 'dessus'], ['dessous', 'dessous', 'sur']])
            else if (this.sup3 === 3) lieux = choice([['sur', 'dessus', 'dessous'], ['dessus', 'sur', 'dessous']])
            else lieux = choice([['dessus', 'dessous', 'dessus'], ['dessous', 'dessus', 'dessous']])
          }
          d.isVisible = true
          d.epaisseur = 2;
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          p1 = polygone(C, D, E)
          p2 = symetrieAxiale(p1, d)
          p2.listePoints[0].nom = `${p1nom[2]}'`
          p2.listePoints[1].nom = `${p1nom[3]}'`
          p2.listePoints[2].nom = `${p1nom[4]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = p1.listePoints[0].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[0], p2.listePoints[0], 'red', '|')
          cD = p1.listePoints[1].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[1], p2.listePoints[1], 'blue', 'X')
          cE = p1.listePoints[2].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[2], p2.listePoints[2], 'green', 'O')
          sC = p1.listePoints[0].estSur(d) ? vide2d() : segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = p1.listePoints[1].estSur(d) ? vide2d() : segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = p1.listePoints[2].estSur(d) ? vide2d() : segment(p1.listePoints[2], p2.listePoints[2], 'green')

          sC = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = segment(p1.listePoints[2], p2.listePoints[2], 'green')
          sCE = droite(p1.listePoints[2], p1.listePoints[1], '', 'gray')
          sCE.pointilles = 5
          sED = droite(p2.listePoints[2], p2.listePoints[1], '', 'gray')
          sED.pointilles = 5
          objetsCorrection.push(d, cC, cD, cE, sC, sD, sE, CC, DD, p1, p1.sommets, p2, p2.sommets, sCE, sED)
          objetsEnonce.push(CC, p1, d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'

          break
        case 4: // symetrie axiale (Axe à 45°) d'un triangle
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          A = point(0, 0, `${p1nom[0]}`, 'above')
          k = choice([-1, 1])

          d = droiteParPointEtPente(A, k)
          B = pointSurDroite(d, 6, `${p1nom[1]}`, 'above')
          if (k === 2) {
            A.positionLabel = 'above'
            B.positionLabel = 'above'
          }
          d.isVisible = true
          d.epaisseur = 2;
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          p1 = polygone(C, D, E)
          p2 = symetrieAxiale(p1, d)
          p2.listePoints[0].nom = `${p1nom[2]}'`
          p2.listePoints[1].nom = `${p1nom[3]}'`
          p2.listePoints[2].nom = `${p1nom[4]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = p1.listePoints[0].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[0], p2.listePoints[0], 'red', '|')
          cD = p1.listePoints[1].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[1], p2.listePoints[1], 'blue', 'X')
          cE = p1.listePoints[2].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[2], p2.listePoints[2], 'green', 'O')
          sC = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = segment(p1.listePoints[2], p2.listePoints[2], 'green')
          sCE = droite(p1.listePoints[2], p1.listePoints[1], '', 'gray')
          sCE.pointilles = 5
          sED = droite(p2.listePoints[2], p2.listePoints[1], '', 'gray')
          sED.pointilles = 5
          objetsCorrection.push(d, cC, cD, cE, sC, sD, sE, CC, DD, p1, p1.sommets, p2, p2.sommets, sCE, sED)
          objetsEnonce.push(CC, p1, d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'
          break
        case 5: // symetrie axiale Axe légèrement penché
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          A = point(0, randint(-1, 1), `${p1nom[0]}`, 'above')
          B = point(6, choice([-1, 1]), `${p1nom[1]}`, 'above')
          d = droite(A, B)
          d.isVisible = true
          d.epaisseur = 2;
          [C, D, E] = this._choisi3Points(d, lieux)
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          E.nom = p1nom[4]
          E.positionLabel = 'above'
          p1 = polygone(C, D, E)
          p2 = symetrieAxiale(p1, d)
          p2.listePoints[0].nom = `${p1nom[2]}'`
          p2.listePoints[1].nom = `${p1nom[3]}'`
          p2.listePoints[2].nom = `${p1nom[4]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = p1.listePoints[0].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[0], p2.listePoints[0], 'red', '|')
          cD = p1.listePoints[1].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[1], p2.listePoints[1], 'blue', 'X')
          cE = p1.listePoints[2].estSur(d) ? vide2d() : codageMediatrice(p1.listePoints[2], p2.listePoints[2], 'green', 'O')
          sC = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sD = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sE = segment(p1.listePoints[2], p2.listePoints[2], 'green')
          sCE = droite(p1.listePoints[2], p1.listePoints[1], '', 'gray')
          sCE.pointilles = 5
          sED = droite(p2.listePoints[2], p2.listePoints[1], '', 'gray')
          sED.pointilles = 5
          //  inter = pointIntersectionDD(sCE, sED)
          objetsCorrection.push(d, cC, cD, cE, sC, sD, sE, CC, DD, p1, p2, sCE, sED)
          objetsEnonce.push(CC, p1, d)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[2]}'${p1nom[3]}'${p1nom[4]}'$ symétrique de $${p1nom[2]}${p1nom[3]}${p1nom[4]}$ par rapport à la droite $(d)$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)

          correction = 'Contrôler la figure en vérifiant que les segments en pointillés se coupent bien sur la droite $(d)$.<br><br>'
          break
        case 6: // 3 symétries centrales de points
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          B = point(7, randint(-1, 1), `${p1nom[1]}`, 'above')
          d = droiteParPointEtPente(B, 0)
          d.isVisible = true
          ;[A, C, D] = this._choisi3Points(d, choice([['dessus', 'dessous', 'dessus'], ['dessous', 'dessus', 'dessous']]))
          A.nom = p1nom[0]
          A.positionLabel = 'above'
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          CC = rotation(C, B, 180, `${p1nom[2]}'`, 'above')
          DD = rotation(D, B, 180, `${p1nom[3]}'`, 'above')
          AA = rotation(A, B, 180, `${p1nom[0]}'`, 'above')
          cC = codageMilieu(C, CC, 'red', '|', false)
          cD = codageMilieu(D, DD, 'blue', '||', false)
          cA = codageMilieu(A, AA, 'green', '|||', false)
          sC = segment(C, CC)
          sD = segment(D, DD)
          sA = segment(A, AA)

          objetsCorrection.push(tracePoint(A, B, C, D, CC, DD, AA), labelPoint(A, B, C, D, CC, DD, AA), cC, cD, cA, sC, sD, sA)
          objetsEnonce.push(tracePoint(A, B, C, D), labelPoint(A, B, C, D))
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le point $${p1nom[2]}'$ symétrique de $${p1nom[2]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 2) + ` Construire le point $${p1nom[3]}'$ symétrique de $${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 3) + ` Construire le point $${p1nom[0]}'$ symétrique de $${p1nom[0]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 4) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, AA.x, CC.x, DD.x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, AA.y, CC.y, DD.y) + 1)
          correction = ''
          break
        case 7: // Symétrie centrale de triangle
          p1nom = creerNomDePolygone(5, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(p1nom)
          B = point(7, randint(-1, 1), `${p1nom[1]}`, 'above')
          d = droiteParPointEtPente(B, 0)
          d.isVisible = true
          ;[A, C, D] = this._choisi3Points(d, choice([['dessus', 'dessous', 'dessus'], ['dessous', 'dessus', 'dessous']]))
          A.nom = p1nom[0]
          A.positionLabel = 'above'
          C.nom = p1nom[2]
          C.positionLabel = 'above'
          D.nom = p1nom[3]
          D.positionLabel = 'above'
          p1 = polygone(A, C, D)
          p2 = rotation(p1, B, 180)
          p2.listePoints[0].nom = `${p1nom[0]}'`
          p2.listePoints[1].nom = `${p1nom[2]}'`
          p2.listePoints[2].nom = `${p1nom[3]}'`
          CC = nommePolygone(p1)
          DD = nommePolygone(p2)
          cC = codageMilieu(p1.listePoints[0], p2.listePoints[0], 'red', '|', false)
          cD = codageMilieu(p1.listePoints[1], p2.listePoints[1], 'blue', 'X', false)
          cA = codageMilieu(p1.listePoints[2], p2.listePoints[2], 'green', 'O', false)
          sA = segment(p1.listePoints[0], p2.listePoints[0], 'red')
          sC = segment(p1.listePoints[1], p2.listePoints[1], 'blue')
          sD = segment(p1.listePoints[2], p2.listePoints[2], 'green')

          objetsCorrection.push(tracePoint(B), labelPoint(B), cC, cD, cA, sC, sD, sA, DD, CC, p1, p2)
          objetsEnonce.push(tracePoint(B), labelPoint(B), CC, p1)
          if (context.isHtml) {
            numQuestion = 0
            enonce = numAlpha(numQuestion) + ' Reproduire la figure ci-dessous.<br>'
          } else {
            numQuestion = -1
            enonce = ''
          }
          enonce += numAlpha(numQuestion + 1) + ` Construire le triangle  $${p1nom[0]}'${p1nom[2]}'${p1nom[3]}'$ symétrique de $${p1nom[0]}${p1nom[2]}${p1nom[3]}$ par rapport au point $${p1nom[1]}$.<br>`
          enonce += numAlpha(numQuestion + 2) + ' Coder la figure.<br><br>'
          Xmin = Math.floor(Math.min(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) - 1)
          Xmax = Math.ceil(Math.max(A.x, B.x, C.x, D.x, p1.listePoints[0].x, p1.listePoints[1].x, p1.listePoints[2].x, p2.listePoints[0].x, p2.listePoints[1].x, p2.listePoints[2].x) + 1)
          Ymin = Math.floor(Math.min(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) - 1)
          Ymax = Math.ceil(Math.max(A.y, B.y, C.y, D.y, p1.listePoints[0].y, p1.listePoints[1].y, p1.listePoints[2].y, p2.listePoints[0].y, p2.listePoints[1].y, p2.listePoints[2].y) + 1)
          correction = ''
          break
      }
      if (listeTypeDeQuestions[i] < 6) {
        positionLabelDroite = translation(pointSurDroite(d, d.b === 0 ? Ymin + 1 : Xmin + 1), homothetie(vecteur(d.a, d.b), A, 0.5 / norme(vecteur(d.a, d.b))))
        objetsEnonce.push(texteParPoint('(d)', positionLabelDroite, 'milieu', 'black', 1.5, 'middle', true))
        objetsCorrection.push(texteParPoint('(d)', positionLabelDroite, 'milieu', 'black', 1.5, 'middle', true))
      }
      const params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: 20,
        scale: sc
      }
      if (this.sup2 < 3) g = grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7)
      else g = vide2d()
      if (parseInt(this.sup2) === 2) {
        k = 0.8
        carreaux = seyes(Xmin, Ymin, Xmax, Ymax)
      } else {
        k = 0.5
        carreaux = vide2d()
      }
      enonce += mathalea2d(params
        ,
        g, carreaux, ...objetsEnonce
      )
      correction += mathalea2d(
        params,
        g, carreaux, ...objetsCorrection
      )

      if (context.isAmc) {
        this.autoCorrection[i] =
        {
          enonce: enonce,
          propositions: [
            {
              texte: correction,
              statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              feedback: '',
              sanscadre: true // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
            }
          ]
        }
      }

      if (this.listeQuestions.indexOf(enonce) === -1) {
      // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(enonce + '<br>')
        this.listeCorrections.push(correction + '<br>')
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
