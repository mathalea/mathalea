/* eslint-disable no-unused-vars */
import Exercice from '../../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, fixeBordures, vide2d, ObjetMathalea2D } from '../../../modules/2dGeneralites.js'
import { context } from '../../../modules/context.js'
import { combinaisonListes, combinaisonListes2, combinaisonListesSansChangerOrdre } from '../../../modules/outils/listes.js'
import { carreParfait, listeDiviseurs, pgcd, ppcm, quotientier, randint } from '../../../modules/outils/entiers.js'
import { choice, compteOccurences, enleveDoublonNum, enleveElement, enleveElementBis, range1, rangeMinMax, shuffle, shuffle2tableaux, range, creerCouples, enleveElementNo } from '../../../modules/outils/arrays.js'
import { ecritureAlgebrique, ecritureAlgebriquec, ecritureAlgebriqueSauf1, ecritureNombreRelatif, ecritureNombreRelatifc, ecritureParentheseSiMoins, ecritureParentheseSiNegatif, rienSi1, texteExposant } from '../../../modules/outils/ecritures.js'
import { segment, segmentAvecExtremites } from '../../../modules/2d/segment.js'
import { point } from '../../../modules/2d/point.js'
import { droiteGraduee, repere } from '../../../modules/2d/reperes.js'
import { courbe, courbeInterpolee, graphiqueInterpole } from '../../../modules/2d/courbes.js'
import { creerBoutonMathalea2d, modalPdf, modalTexteCourt, modalTexteLong, modalUrl, modalVideo, modalYoutube } from '../../../modules/outils/modaux.js'
import { centrage, deuxColonnes, listeQuestionsToContenu, listeQuestionsToContenuSansNumero } from '../../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
import { compareFractions, fractionSimplifiee, obtenirListeFractionsIrreductibles, obtenirListeFractionsIrreductiblesFaciles, produitDeDeuxFractions, produitsEnCroix, simplificationDeFractionAvecEtapes, texFraction, texFractionReduite, texFractionSigne } from '../../../modules/outils/arrayFractions.js'
import { reduireAxPlusB, reduirePolynomeDegre3 } from '../../../modules/outils/reductions.js'
import { afficheScore, ajouteChampTexte, setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive, ajouteChampFractionMathLive } from '../../../modules/interactif/questionMathLive.js'
import { latexParCoordonnees, latexParPoint, texteParPoint, texteParPointEchelle, texteParPosition, texteParPositionEchelle } from '../../../modules/2d/textes.js'
import { droite, droiteParPointEtPente, positionLabelDroite, droiteHorizontaleParPoint, droiteVerticaleParPoint, droiteParPointEtPerpendiculaire, droiteParPointEtParallele, dessousDessus } from '../../../modules/2d/droites.js'
import { itemize, miseEnEvidence, numAlpha, sp, texteCentre, texteEnCouleur, texteEnCouleurEtGras, texteGras, miseEnCouleur } from '../../../modules/outils/contextSensitif.js'
import { abs, arrondi, egalOuApprox, sommeDesChiffres, signe, troncature } from '../../../modules/outils/nombres.js'
import { distancePointDroite, homothetie, projectionOrtho, rotation, sensDeRotation, similitude, symetrieAxiale, translation, translation2Points } from '../../../modules/2d/transformations.js'
import { nomVecteurParPosition, vecteur } from '../../../modules/2d/vecteur.js'
import { plot, tracePoint, tracePointSurDroite } from '../../../modules/2d/tracePoint.js'
import { min, max, create, all, multiply, evaluate, divide, subtract, pow, round, isInteger, mod, cos, sin, format, parse, unit, complex } from 'mathjs'
import { labelLatexPoint, labelPoint } from '../../../modules/2d/labelPoint.js'
import { extraireRacineCarree, obtenirListeFacteursPremiers, texFactorisation, texRacineCarree } from '../../../modules/outils/factorisation.js'
import { calcul, nombreDecimal, scientifiqueToDecimal, texMasse, texNombre, texNombre2, texNombre3, texNombrec, texNum, texPrix } from '../../../modules/outils/texNombres.js'
import { tableauDeVariation } from '../../../modules/2d/tableauDeVariation.js'
import Decimal from 'decimal.js/decimal.mjs'
import FractionX from '../../../modules/FractionEtendue.js'
import { fraction, listeFractions } from '../../../modules/fractions.js'
import { afficherTempo, cacherTempo, rotationAnimee, symetrieAnimee, translationAnimee, translationPuisRotationAnimees } from '../../../modules/2dAnimation.js'
import { pointAdistance, pointIntersectionCC, pointIntersectionDD, pointIntersectionLC, pointSurDroite, pointSurSegment } from '../../../modules/2d/pointSur.js'
import { carre, codageCarre, nommePolygone, polygone, polygoneAvecNom, polygoneRegulier, polygoneRegulierParCentreEtRayon, renommePolygone, boite } from '../../../modules/2d/polygone.js'
import { angle, angleModulo, angleOriente, longueur, norme } from '../../../modules/2d/calculs.js'
import Alea2iep from '../../../modules/Alea2iep.js'
import { crochetD, crochetG, intervalle } from '../../../modules/2d/intervalles.js'
import { barycentre, milieu } from '../../../modules/2d/barycentre.js'
import { afficheLongueurSegment, afficheMesureAngle, codageAngle, codageAngleDroit, codageSegments, texteSurArc, texteSurSegment, codageSegment, afficheCoteSegment } from '../../../modules/2d/codages.js'
import { nombreAvecEspace, stringNombre } from '../../../modules/outils/stringNombre.js'
import { texEnumerate, texSymbole, texConsigne, printlatex, texEnumerateSansNumero, texTexte } from '../../../modules/outils/texMiseEnForme.js'
import { infoMessage, lampeMessage, warnMessage } from '../../../modules/outils/messages.js'
import { Arbre, texProba } from '../../../modules/arbres.js'
import { cesar, choisitLettresDifferentes, lettreDepuisChiffre, lettreMinusculeDepuisChiffre, premiereLettreEnMajuscule, lettreIndiceeDepuisChiffre } from '../../../modules/outils/lettres.js'
import { tableauColonneLigne } from '../../../modules/outils/tableauCL.js'
import { cribleEratostheneN, decompositionFacteursPremiers, decompositionFacteursPremiersArray, listeDesDiviseurs, listeNombresPremiersStrictJusqua, obtenirListeNombresPremiers, premierMultipleSuperieur, premiersEntreBornes } from '../../../modules/outils/premiers.js'
import { contraindreValeur, egal, entreDeux, estentier } from '../../../modules/outils/comparateurs.js'
import { engrenage } from '../../../modules/2d/engrenage.js'
import { katexPopup, katexPopup2 } from '../../../modules/outils/popups.js'
import { svgEngrenages, SvgMachineDiag3F12, SvgMachineDiag3F1ActMono } from '../../../modules/macroSvgJs.js'
import { machineMathsVideo, texCadreParOrange, tikzMachineDiag, tikzMachineMaths } from '../../../modules/outils/3F1actfonctions.js'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDansLaPartieEntiere, nombreDeChiffresDe } from '../../../modules/outils/decimales.js'
import { chercheMinMaxFonction, resolutionSystemeLineaire2x2, resolutionSystemeLineaire3x3 } from '../../../modules/outils/resolutions.js'
import { calcule, degCos, degSin, degres, fractionLatexToMathjs, radians } from '../../../modules/fonctionsMaths.js'
import { cercle, cercleCentrePoint } from '../../../modules/2d/cercle.js'
import { imagePointParTransformation } from '../../../modules/outils/matrices.js'
import { arc, arcPointPointAngle, traceCompas } from '../../../modules/2d/arc.js'
import { cibleCarree, cibleCouronne, cibleRonde, dansLaCibleCarree, dansLaCibleRonde } from '../../../modules/2d/cibles.js'
import { arcenciel, couleurTab, texcolors } from '../../../modules/outils/couleurs.js'
import { pavage } from '../../../modules/2d/pavage.js'
import { creerNomDePolygone } from '../../../modules/outils/strings.js'
import Grandeur from '../../../modules/Grandeur.js'
import { grille, papierPointe, seyes } from '../../../modules/2d/grilles.js'
import { aireTriangle, centreGraviteTriangle, codageHauteurTriangle, codageMedianeTriangle, hauteurTriangle, medianeTriangle, triangle2points1hauteur, triangle2points2longueurs } from '../../../modules/2d/triangle.js'
import { quatriemeProportionnelle } from '../../../modules/outils/proportions.js'
import { arc3d, arete3d, barre3d, CodageAngleDroit3D, cube, cube3d, cylindre3d, demicercle3d, droite3d, homothetie3d, paveLPH3d, plaque3d, point3d, polygone3d, prisme3d, pyramide3d, pyramideTronquee3d, rotation3d, rotationV3d, sensDeRotation3d, sphere3d, translation3d, vecteur3d } from '../../../modules/3d.js'
import { diagrammeBarres, traceBarre, traceGraphiqueCartesien, diagrammeCirculaire } from '../../../modules/2d/graphiques.js'
import { scratchblock } from '../../../modules/2d/scratchblock.js'
import { noteLaCouleur, plateau2dNLC } from '../../../modules/noteLaCouleur.js'
import { ajouterAx, ajouterAy, allerA, angleScratchTo2d, attendre, avance, baisseCrayon, clone, creerLutin, leveCrayon, orienter, tournerD, tournerG } from '../../../modules/2dLutin.js'
import { jour, joursParMois, listeDeNotes, nomDuMois, tirerLesDes, unMoisDeTemperature } from '../../../modules/outils/statistiques.js'
import { objet, objetM, objetF, personne, prenom, prenomF, prenomM, prenomPronom, personnes } from '../../../modules/outils/objetsPersonnes.js'
import { Relatif, sommeDesTermesParSigne, triePositifsNegatifs } from '../../../modules/outils/relatifs.js'
import { eclatePuissance, puissanceEnProduit, simpExp, simpNotPuissance, reorganiseProduitPuissance, ecriturePuissance } from '../../../modules/outils/puissances.js'
import { choixDeroulant } from '../../../modules/interactif/questionListeDeroulante.js'
import { polyline } from '../../../modules/2d/polyline.js'
import { bissectrice, codageBissectrice, codageMediatrice, codageMilieu, mediatrice } from '../../../modules/2d/droitesRemarquables.js'
import { cone } from '../../../modules/2d/cone.js'
import { semiEllipse } from '../../../modules/2d/ellipse.js'
import { Triangles } from '../../../modules/outils/triangles.js'
import ChoisirExpressionNumerique from './_choisirExpressionNumerique.js'
import ChoisirExpressionLitterale from './_Choisir_expression_litterale.js'
import { labyrinthe } from '../../../modules/2d/labyrinthe.js'
import { TrouverSolutionMathador } from '../../../modules/outils/mathador.js'
import { pointCliquable, fractionCliquable, rectangleCliquable } from '../../../modules/2dinteractif.js'
import { getVueFromUrl } from '../../../modules/gestionUrl.js'
import { demiDroite } from '../../../modules/2d/demiDroite.js'
import { parallelogramme2points1hauteur } from '../../../modules/2d/parallelogramme.js'
import { minToHeuresMinutes, minToHoraire, minToHour } from '../../../modules/outils/horaires.js'
import { htmlConsigne } from '../../../modules/outils/htmlMiseEnForme.js'
import { motifs } from '../../../modules/2d/motif.js'
import Operation from '../../../modules/operations.js'
import { glisseNombre } from '../../../modules/2d/glisseNombre.js'
import { rapporteur } from '../../../modules/2d/rapporteur.js'
import { tableau } from '../../../modules/2d/tableau.js'
import { xcas } from '../../../modules/outils/xcas.js'
import { resoudre, calculer, aleaVariables, toTex, aleaName, assignVariables } from '../../../modules/outilsMathjs.js'
import { GVGraphicView } from '../../../modules/aleaFigure/GraphicView.js'
import { GVLine, GVPoint, GVSegment, GVVector } from '../../../modules/aleaFigure/elements.js'
import { GVGrandeur } from '../../../modules/aleaFigure/grandeurs.js'
import { circularPermutation } from '../../../modules/aleaFigure/outils.js'
import { GVAleaThalesConfig } from '../../../modules/aleaFigure/outilsThales.js'
import { pave } from '../../../modules/2d/pave.js'
export const titre = 'Calculer la probabilité d’une intersection à partir d’un arbre'
export const dateDePublication = '04/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

*/
export const uuid = '7c8b7'
export const ref = 'can1P03'
export default function CalculerProbabiliteIntersection () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, reponse1, reponse2, reponse3, reponse4, pA, pBsachantA, pBbarresachantAbarre, pBbarresachantA, pAbarre, pBsachantAbarre, omega, texte, texteCorr, objets; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // On choisit les probas de l'arbre
      pA = (new Decimal(randint(1, 9, 5))).div(10)
      pAbarre = (new Decimal((pA)).mul(-1)).add(1)
      pBsachantA = (new Decimal(randint(1, 9, 5))).div(10)
      pBbarresachantA = (new Decimal((pBsachantA)).mul(-1)).add(1)
      pBsachantAbarre = (new Decimal(randint(1, 9, 5))).div(10)
      pBbarresachantAbarre = new Decimal(pBsachantAbarre).mul(-1).add(1)
      reponse1 = new Decimal((pA)).mul(pBsachantA)
      reponse2 = new Decimal(pA).mul(pBbarresachantA)
      reponse3 = new Decimal(pAbarre).mul(pBsachantAbarre)
      reponse4 = new Decimal(pAbarre).mul(pBbarresachantAbarre)

      switch (choice([1, 2, 3, 4])) { //
        case 1:
          // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre(
                {
                  rationnel: false,
                  nom: 'A',
                  proba: 1,
                  visible: false,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: 1,
                      visible: false,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: new Decimal(1 - pBsachantA)
                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: new Decimal(pBsachantAbarre)
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: new Decimal(1 - pBsachantAbarre)
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(A\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(A\\cap B)$. ' }

          texteCorr = ` $P(A\\cap B)=P(A)\\times P_{A}(B)$.<br>
      $P(A)=1-${texNombre(pAbarre, 1)}= ${texNombre(pA, 1)}$.<br>
      $P_{A}(B)=1-${texNombre(1 - pBsachantA, 1)}= ${texNombre(pBsachantA, 1)}$.<br>
      Ainsi, $P(A\\cap B)=P(A)\\times P_{A}(B)=${texNombre(pA, 1)}\\times ${texNombre(pBsachantA, 1)}=${texNombre(reponse1, 2)}$.
      `
          setReponse(this, i, reponse1)
          break

        case 2:
        // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre(
                {
                  rationnel: false,
                  nom: 'A',
                  proba: 1,
                  visible: false,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: 1,
                      visible: false
                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: new Decimal(pBsachantAbarre)
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: pBbarresachantAbarre
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(A\\cap \\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(A\\cap \\overline{B})$. ' }

          texteCorr = ` $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})$.<br>
        $P(A)=1-${texNombre(pAbarre, 1)}= ${texNombre(pA, 1)}$.<br>
        $P_{A}(\\overline{B})=1-${texNombre(pBsachantA, 1)}= ${texNombre(1 - pBsachantA, 1)}$.<br>
        Ainsi, $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})=${texNombre(pA, 1)}\\times ${texNombre(1 - pBsachantA, 1)}=${texNombre(reponse2, 2)}$.
        `
          setReponse(this, i, reponse2)
          break

        case 3:
        // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre(
                {
                  rationnel: false,
                  nom: 'A',
                  proba: pA,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: pBbarresachantA

                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: 1,
                visible: false,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: 1,
                  visible: false
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: pBbarresachantAbarre
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(\\overline{A}\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(\\overline{A}\\cap B)$. ' }

          texteCorr = ` 
        





        $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)$.<br>
        $P(\\overline{A})=1-${texNombre(pA, 1)}=${texNombre(pAbarre, 1)}$.<br>
        $P_{\\overline{A}}(B)=1-${texNombre(pBbarresachantAbarre, 1)}= ${texNombre(1 - pBbarresachantAbarre, 1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)=${texNombre(pAbarre, 1)}\\times ${texNombre(pBsachantAbarre, 1)}=${texNombre(reponse3, 2)}$.
        `
          setReponse(this, i, reponse3)
          break

        case 4:
        // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre(
                {
                  rationnel: false,
                  nom: 'A',
                  proba: pA,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: pBbarresachantA

                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: 1,
                visible: false,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: pBsachantAbarre

                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: 1,
                  visible: false
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(\\overline{A}\\cap \\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(\\overline{A}\\cap \\overline{B})$. ' }

          texteCorr = ` 
        





        $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})$.<br>
        $P(\\overline{A})=1-${texNombre(pA, 1)}=${texNombre(pAbarre, 1)}$.<br>
        $P_{\\overline{A}}(\\overline{B})=1-${texNombre(pBsachantAbarre, 1)}= ${texNombre(pBbarresachantAbarre, 1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})=${texNombre(pAbarre, 1)}\\times ${texNombre(pBbarresachantAbarre, 1)}=${texNombre(reponse4, 2)}$.
        `
          setReponse(this, i, reponse4)
          break
      }
      if (this.questionJamaisPosee(i, pA, pBsachantA)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

// $P(A)=${texNombre(pA)}$.<br>
//      $P(\\overline{A})=${texNombre(pAbarre)}$.<br>
//    $P_A(B)=${texNombre(pBsachantA)}$.<br>
//  $P_A(\\overline{B})=${texNombre(pBbarresachantA)}$.<br>
// $P_{\\overline{A}}(B)=${texNombre(pBsachantAbarre)}$.<br>
// $P_{\\overline{A}}(\\overline{B})=${texNombre(pBbarresachantAbarre)}$.<br>
