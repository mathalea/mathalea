/* eslint-disable no-unused-vars */
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
import { min, max, create, all, multiply, evaluate, divide, subtract, pow, round, isInteger, mod, cos, sin, format } from 'mathjs'
import { labelLatexPoint, labelPoint } from '../../modules/2d/labelPoint.js'
import { resoudre, calculer, aleaVariables } from '../../modules/outilsMathjs.js'
import { extraireRacineCarree, obtenirListeFacteursPremiers, texFactorisation } from '../../modules/outils/factorisation.js'
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
import { barycentre, milieu } from '../../modules/2d/barycentre.js'
import { afficheLongueurSegment, afficheMesureAngle, codageAngle, codageAngleDroit, codageSegments, texteSurArc, texteSurSegment, codageSegment, afficheCoteSegment } from '../../modules/2d/codages.js'
import { nombreAvecEspace, stringNombre } from '../../modules/outils/stringNombre.js'
import { texEnumerate, texSymbole, texConsigne, printlatex, texEnumerateSansNumero, texTexte } from '../../modules/outils/texMiseEnForme.js'
import { infoMessage, lampeMessage, warnMessage } from '../../modules/outils/messages.js'
import { Arbre, texProba } from '../../modules/arbres.js'
import { cesar, choisitLettresDifferentes, lettreDepuisChiffre, lettreMinusculeDepuisChiffre, premiereLettreEnMajuscule, lettreIndiceeDepuisChiffre } from '../../modules/outils/lettres.js'
import { tableauColonneLigne } from '../../modules/outils/tableaucl.js'
import { cribleEratostheneN, decompositionFacteursPremiers, decompositionFacteursPremiersArray, listeDesDiviseurs, listeNombresPremiersStrictJusqua, obtenirListeNombresPremiers, premierMultipleSuperieur, premiersEntreBornes } from '../../modules/outils/premiers.js'
import { contraindreValeur, egal, entreDeux, estentier } from '../../modules/outils/comparateurs.js'
import { engrenage } from '../../modules/2d/engrenage.js'
import { katexPopup, katexPopup2 } from '../../modules/outils/popups.js'
import { svgEngrenages, SvgMachineDiag3F12, SvgMachineDiag3F1ActMono } from '../../modules/macroSvgJs.js'
import { machineMathsVideo, texCadreParOrange, tikzMachineDiag, tikzMachineMaths } from '../../modules/outils/3F1actfonctions.js'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDe } from '../../modules/outils/decimales.js'
import { chercheMinMaxFonction, resolutionSystemeLineaire2x2, resolutionSystemeLineaire3x3 } from '../../modules/outils/resolutions.js'
import { calcule, degres, fractionLatexToMathjs, radians } from '../../modules/fonctionsMaths.js'
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
import { diagrammeBarres, traceBarre, traceGraphiqueCartesien } from '../../modules/2d/graphiques.js'
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
import { pointCliquable } from '../../modules/2dinteractif.js'
import { getVueFromUrl } from '../../modules/gestionUrl.js'
import { demiDroite } from '../../modules/2d/demiDroite.js'
import { parallelogramme2points1hauteur } from '../../modules/2d/parallelogramme.js'
import { minToHeuresMinutes, minToHoraire, minToHour } from '../../modules/outils/horaires.js'
import { htmlConsigne } from '../../modules/outils/htmlMiseEnForme.js'
import { motifs } from '../../modules/2d/motif.js'
import Operation from '../../modules/operations.js'
import { glisseNombre } from '../../modules/2d/glissenombre.js'
import { rapporteur } from '../../modules/2d/rapporteur.js'
import { tableau } from '../../modules/2d/tableau.js'
export const titre = 'Parenthèses manquantes'

/**
 * Priorités opératoires, placer les parenthèses.
 * @author Cédric Grolleau
 * Référence 6C33-1
 */
export default function Priorites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Si besoin, ajoute des parenthèses pour rendre l'égalité correcte. <br> S'il y a plusieurs fois la même égalité trouve des solutions différentes."
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 3
  this.spacingCorr = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte; let texteCorr; let a; let b; let c; let d; let i; let e
    let m; let n; let f; let l; let g; let k; let p; let prevchoice; let choice; let cpt = 0 //
    texte = ''
    texteCorr = ''
    for (i = 0; i < this.nbQuestions && cpt < 50;) {
      e = randint(1, 3)
      m = randint(1, 3)
      n = randint(1, 6)
      f = randint(1, 4)
      l = randint(1, 4)
      g = randint(2, 3)
      k = calcul(f * e)
      c = calcul(m * e)
      a = calcul(n * c)
      b = calcul(k * c)
      d = calcul(c * e * l)
      prevchoice = []
      texte = ''
      texteCorr = ''
      for (p = 0; p < 3; p++) {
        choice = randint(0, 6, prevchoice)
        prevchoice.push(choice)
        switch (choice) {
          case 0:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + (d / e + f) * g)} $ <br> `
            texteCorr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + (d / e + f) * g)} $<br>`
            break
          case 1:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b) / c + d / e + f * g)}  $<br>`
            texteCorr += `$ (${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b) / c + d / e + f * g)} $<br>`
            break
          case 2:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d / e + f) * g)} $<br>`
            texteCorr += `$ ( ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} ) \\times ${g} = ${calcul((a + b / c + d / e + f) * g)} $<br>`
            break
          case 3:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d) / e + f * g)} $<br>`
            texteCorr += `$ (${a} + ${b} \\div ${c} + ${d}) \\div ${e} + ${f} \\times ${g} = ${calcul((a + b / c + d) / e + f * g)} $<br>`
            break
          case 4:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(((a + b) / c + d / e + f) * g)} $<br>`
            texteCorr += `$ ((${a} + ${b}) \\div ${c} + ${d} \\div ${e} + ${f}) \\times ${g} = ${calcul(((a + b) / c + d / e + f) * g)} $<br>`
            break
          case 5:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + (b / c + d) / e + f * g)} $<br>`
            texteCorr += `$ ${a} + ( ${b} \\div ${c} + ${d} ) \\div ${e} + ${f} \\times ${g} = ${calcul(a + (b / c + d) / e + f * g)} $<br>`
            break
          case 6:
            texte += `$ ${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + d / e + f * g)} $ <br> `
            texteCorr += `$${a} + ${b} \\div ${c} + ${d} \\div ${e} + ${f} \\times ${g} = ${calcul(a + b / c + d / e + f * g)} $<br>`
            break
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
