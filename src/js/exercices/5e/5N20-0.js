import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { combinaisonListesSansChangerOrdre } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { shuffle } from '../../modules/outils/arrays.js'
import { segment } from '../../modules/2d/segment.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { numAlpha, texteEnCouleur, texteGras } from '../../modules/outils/contextSensitif.js'
import { rotation } from '../../modules/2d/transformations.js'
import { labelPoint } from '../../modules/2d/labelPoint.js'
import { calcul } from '../../modules/outils/texNombres.js'
import { codageAngle, codageAngleDroit } from '../../modules/2d/codages.js'
import { cercleCentrePoint } from '../../modules/2d/cercle.js'
export const titre = 'Résoudre un problème en utilisant des fractions'

/**
 * * résoudre un problème additif de fractions niv 5e
 * * 5N20-0
 * @author Sébastien Lozano
 */
export const uuid = 'b6250'
export const ref = '5N20-0'
export default function ProblemesAdditifsFractions5e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  this.nbQuestions = 1

  this.titre = titre
  this.consigne = 'Calculatrice autorisée.'

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 1 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 1 : this.spacingCorr = 1

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [0]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = [0]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on définit les fractions pour les vols et les arguments pour le graphique
      let fracVols = [
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 12, [1.8, ' ', 'black', 2, 1, 'red', 0.4]],
        [1, 4, [1.8, ' ', 'black', 2, 1, 'blue', 0.4]],
        [1, 2, [1.8, ' ', 'black', 2, 1, 'green', 0.4]]
      ]
      // on mélange pour l'aléatoire tant que les deux premieres fractions sont égales
      do {
        fracVols = shuffle(fracVols)
      } while (fracVols[0][1] === fracVols[1][1])

      // let q1a = randint(1,5); // indice pour faire varier la 1ere question sur la destination
      // let q1b = randint(1,5,[q1a]); // indice pour faire varier la 2eme question sur la destination
      let nbVolsTotal
      let destinationsVols = [['l\'', 'Afrique'], ['l\'', 'Asie'], ['l\'', 'Amerique'], ['l\'', 'Europe'], ['la', ' France']]
      destinationsVols = shuffle(destinationsVols)
      do {
        nbVolsTotal = randint(200, 600)
      } while (nbVolsTotal % 2 !== 0 || nbVolsTotal % 3 !== 0 || nbVolsTotal % 4 !== 0)

      // pour les situations
      const situations = [
        { // case 0 --> vols
          fin_enonce_situation: 'vols d\'une compagnie aérienne selon la destination',
          nom_enonce: 'vols',
          last_question: ['cette compagnie a affrété', 'vols', 'le nombre de vols', 'Le nombre de vols'],
          cat1: {
            destination: destinationsVols[0][0] + destinationsVols[0][1],
            article: destinationsVols[0][0],
            nom: destinationsVols[0][1],
            frac: fracVols[0],
            angle: calcul(360 / fracVols[0][1]),
            arg_graph: fracVols[0][2]
          },
          cat2: {
            destination: destinationsVols[1][0] + destinationsVols[1][1],
            article: destinationsVols[1][0],
            nom: destinationsVols[1][1],
            frac: fracVols[1],
            angle: calcul(360 / fracVols[1][1]),
            arg_graph: fracVols[1][2]
          },
          cat3: {
            destination: destinationsVols[2][0] + destinationsVols[2][1],
            article: destinationsVols[2][0],
            nom: destinationsVols[2][1],
            frac: fracVols[2],
            angle: calcul(360 / fracVols[2][1]),
            arg_graph: fracVols[2][2]
          },
          cat4: {
            destination: destinationsVols[3][0] + destinationsVols[3][1],
            article: destinationsVols[3][0],
            nom: destinationsVols[3][1],
            frac: fracVols[3],
            angle: calcul(360 / fracVols[3][1]),
            arg_graph: fracVols[3][2]
          },
          cat5: {
            destination: destinationsVols[4][0] + destinationsVols[4][1],
            article: destinationsVols[4][0],
            nom: destinationsVols[4][1],
            frac: fracVols[4],
            angle: calcul(360 / fracVols[4][1]),
            arg_graph: fracVols[4][2]
          },
          // q1a:q1a,
          // q1b:q1b,
          nb_total: nbVolsTotal,
          fig: ''
        },
        {// case 1 --> courses
        },
        {// case 2 --> activités sportives
        },
        {// case 3 -->
        },
        {// case 4 -->
        }
      ]
      // une fonction pour gérer le codage des angles
      function myCodageAngle (A, O, B, angle, [...args]) {
        if (angle === 90) {
          return codageAngleDroit(A, O, B)
        } else {
          return codageAngle(A, O, angle, ...args)
        };
      };

      // une fonction pour gérer l'affichage correct de la légende
      // param est l'ordonnée du point qui sert à la mediatrice !
      ;

      // une fonction pour positionner le label
      // y est l'ordonnée du point
      function myLabelPosition (y) {
        if (y < 0) {
          return 'below'
        } else {
          return 'above'
        };
      };

      // une fonction pour gérer le texte en fonction de l'angle
      function myTexteVolsCorr (angle) {
        switch (angle) {
          case 90:
            return `du secteur est un angle droit, il mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{4}$.`
          case 30:
            return `rouge apparaît 3 fois, l'angle vert vaut $180\\degree$ et il y a un angle droit.<br>
L'angle pour un tour complet vaut $360\\degree$, donc l'angle rouge vaut $(360-180-90)\\div 3 = ${angle}\\degree$.<br>
L'angle rouge mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{12}$.
`
          case 180:
            return `du secteur est un angle plat, il mesure $${angle}\\degree$ sur les $360\\degree$ d'un tour complet, donc il représente $\\dfrac{${angle}}{360}$ du disque soit $\\dfrac{1}{2}$.`
        }
      };

      // on prépare la fenetre mathalea2d
      const fenetreMathalea2D = { xmin: -10, ymin: -8, xmax: 10, ymax: 8, pixelsParCm: 20, scale: 0.5 }
      const OVols = point(0, 0)
      const AVols = point(fenetreMathalea2D.xmin + 6, 0)
      const cVols = cercleCentrePoint(OVols, AVols, 'blue')
      cVols.epaisseur = 2
      // on trace les quartiers
      // cat1
      const BVols = rotation(AVols, OVols, situations[0].cat1.angle)
      const segmentOAVols = segment(OVols, AVols)
      const segmentOBVols = segment(OVols, BVols)
      const codageAOB = myCodageAngle(AVols, OVols, BVols, situations[0].cat1.angle, situations[0].cat1.arg_graph)
      // cat2
      const CVols = rotation(BVols, OVols, situations[0].cat2.angle)
      const segmentOCVols = segment(OVols, CVols)
      const codageBOC = myCodageAngle(BVols, OVols, CVols, situations[0].cat2.angle, situations[0].cat2.arg_graph)
      // cat3
      const DVols = rotation(CVols, OVols, situations[0].cat3.angle)
      const segmentODVols = segment(OVols, DVols)
      const codageCOD = myCodageAngle(CVols, OVols, DVols, situations[0].cat3.angle, situations[0].cat3.arg_graph)
      // cat4
      const EVols = rotation(DVols, OVols, situations[0].cat4.angle)
      const segmentOEVols = segment(OVols, EVols)
      const codageDOE = myCodageAngle(DVols, OVols, EVols, situations[0].cat4.angle, situations[0].cat4.arg_graph)
      // cat5
      const FVols = rotation(EVols, OVols, situations[0].cat5.angle)
      const segmentOFVols = segment(OVols, FVols)
      const codageEOF = myCodageAngle(EVols, OVols, FVols, situations[0].cat5.angle, situations[0].cat5.arg_graph)

      // légende
      const ALegende = point(fenetreMathalea2D.xmin + 4, 0)
      const LVolsegmentcat1 = rotation(ALegende, OVols, situations[0].cat1.angle / 2, situations[0].cat1.nom)
      LVolsegmentcat1.positionLabel = myLabelPosition(LVolsegmentcat1.y)
      const LLVolsegmentcat1 = rotation(AVols, OVols, situations[0].cat1.angle / 2, situations[0].cat1.nom)
      const segmentLegendeCat1 = segment(LVolsegmentcat1, LLVolsegmentcat1)
      segmentLegendeCat1.styleExtremites = '->'
      segmentLegendeCat1.pointilles = 5

      const LVolsegmentcat2 = rotation(LVolsegmentcat1, OVols, situations[0].cat1.angle / 2 + situations[0].cat2.angle / 2, situations[0].cat2.nom)
      LVolsegmentcat2.positionLabel = myLabelPosition(LVolsegmentcat2.y)
      const LLVolsegmentcat2 = rotation(BVols, OVols, situations[0].cat2.angle / 2, situations[0].cat2.nom)
      const segmentLegendeCat2 = segment(LVolsegmentcat2, LLVolsegmentcat2)
      segmentLegendeCat2.styleExtremites = '->'
      segmentLegendeCat2.pointilles = 5

      const LVolsegmentcat3 = rotation(LVolsegmentcat2, OVols, situations[0].cat2.angle / 2 + situations[0].cat3.angle / 2, situations[0].cat3.nom)
      LVolsegmentcat3.positionLabel = myLabelPosition(LVolsegmentcat3.y)
      const LLVolsegmentcat3 = rotation(CVols, OVols, situations[0].cat3.angle / 2, situations[0].cat3.nom)
      const segmentLegendeCat3 = segment(LVolsegmentcat3, LLVolsegmentcat3)
      segmentLegendeCat3.styleExtremites = '->'
      segmentLegendeCat3.pointilles = 5

      const LVolsegmentcat4 = rotation(LVolsegmentcat3, OVols, situations[0].cat3.angle / 2 + situations[0].cat4.angle / 2, situations[0].cat4.nom)
      LVolsegmentcat4.positionLabel = myLabelPosition(LVolsegmentcat4.y)
      const LLVolsegmentcat4 = rotation(DVols, OVols, situations[0].cat4.angle / 2, situations[0].cat4.nom)
      const segmentLegendeCat4 = segment(LVolsegmentcat4, LLVolsegmentcat4)
      segmentLegendeCat4.styleExtremites = '->'
      segmentLegendeCat4.pointilles = 5

      const LVolsegmentcat5 = rotation(LVolsegmentcat4, OVols, situations[0].cat4.angle / 2 + situations[0].cat5.angle / 2, situations[0].cat5.nom)
      LVolsegmentcat5.positionLabel = myLabelPosition(LVolsegmentcat5.y)
      const LLVolsegmentcat5 = rotation(EVols, OVols, situations[0].cat5.angle / 2, situations[0].cat5.nom)
      const segmentLegendeCat5 = segment(LVolsegmentcat5, LLVolsegmentcat5)
      segmentLegendeCat5.styleExtremites = '->'
      segmentLegendeCat5.pointilles = 5

      const mesAppels = [
        cVols,
        segmentOAVols,
        segmentOBVols,
        segmentOCVols,
        segmentODVols,
        segmentOEVols,
        segmentOFVols,
        codageAOB,
        codageBOC,
        codageCOD,
        codageDOE,
        codageEOF,
        labelPoint(LVolsegmentcat1),
        labelPoint(LVolsegmentcat2),
        labelPoint(LVolsegmentcat3),
        labelPoint(LVolsegmentcat4),
        labelPoint(LVolsegmentcat5),
        segmentLegendeCat1,
        segmentLegendeCat2,
        segmentLegendeCat3,
        segmentLegendeCat4,
        segmentLegendeCat5
      ]
      const figVols = mathalea2d(
        fenetreMathalea2D,
        mesAppels
      )
      situations[0].fig = figVols

      const enonces = []
      let indexSouSegmentQuestion = 0
      let indexSouSegmentQuestionCorr = 0

      for (let k = 0; k < 1; k++) {
        enonces.push({
          enonce: `
On a représenté sur le diagramme circulaire ci-contre la répartition des ${situations[k].fin_enonce_situation}.<br>
${texteGras('Les angles de même couleur ont la même mesure.')}<br>
${texteGras('L\'angle vert est un angle plat.')}<br>
${situations[k].fig}<br>
${numAlpha(indexSouSegmentQuestion++)} Quelle fraction représente les ${situations[k].nom_enonce} vers ${situations[k].cat1.destination} ?<br>
${numAlpha(indexSouSegmentQuestion++)} Quelle fraction représente les ${situations[k].nom_enonce} vers ${situations[k].cat2.destination} ?<br>
${numAlpha(indexSouSegmentQuestion++)} Sachant que ${situations[k].last_question[0]} ${situations[k].nb_total} ${situations[k].last_question[1]}
et que les ${situations[k].nom_enonce} vers ${situations[k].cat3.destination} représentent $\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}$ de ce total,
calculer ${situations[k].last_question[2]} vers ${situations[k].cat3.destination}?

`,
          correction: `
${numAlpha(indexSouSegmentQuestionCorr++)} Pour ${situations[k].cat1.destination} l'angle ${myTexteVolsCorr(situations[k].cat1.angle)}<br>
${texteEnCouleur(`La fraction qui représente les ${situations[k].nom_enonce} vers ${situations[k].cat1.destination} vaut donc $\\dfrac{${situations[k].cat1.frac[0]}}{${situations[k].cat1.frac[1]}}$`)}.<br>

${numAlpha(indexSouSegmentQuestionCorr++)} Pour ${situations[k].cat2.destination} l'angle ${myTexteVolsCorr(situations[k].cat2.angle)}<br>
${texteEnCouleur(`La fraction qui représente les ${situations[k].nom_enonce} vers ${situations[k].cat2.destination} vaut donc $\\dfrac{${situations[k].cat2.frac[0]}}{${situations[k].cat2.frac[1]}}$`)}<br>

${numAlpha(indexSouSegmentQuestionCorr++)} Calculons $\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}$ de ${situations[k].nb_total} :<br> 
$\\dfrac{${situations[k].cat3.frac[0]}}{${situations[k].cat3.frac[1]}}\\times ${situations[k].nb_total} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${situations[k].nb_total}}{${situations[k].cat3.frac[1]}} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}\\times ${situations[k].cat3.frac[1]}}{${situations[k].cat3.frac[1]}} = \\dfrac{${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}\\times \\cancel{${situations[k].cat3.frac[1]}}}{\\cancel{${situations[k].cat3.frac[1]}}} = ${situations[k].cat3.frac[0]}\\times ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])} = ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}$<br>
${texteEnCouleur(`${situations[k].last_question[3]} vers ${situations[k].cat3.destination} vaut donc ${calcul(situations[k].nb_total / situations[k].cat3.frac[1])}.`)}
`
        })
      };

      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
