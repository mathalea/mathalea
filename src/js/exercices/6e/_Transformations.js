import { mathalea2d, point, droiteParPointEtPente, droiteHorizontaleParPoint, droiteVerticaleParPoint, tracePoint, segment, vecteur, latexParCoordonnees, afficheMesureAngle, milieu, translation, texteParPositionEchelle, labelLatexPoint, colorToLatexOrHTML, codageSegments } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListes, imagePointParTransformation, texFractionReduite, numAlpha, rangeMinMax, contraindreValeur, lettreDepuisChiffre, enleveElementNo, enleveElementBis, compteOccurences, arrondi, egal } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Transformations : trouver un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 *
 * Relecture : Novembre 2021 par EE
 */
export default function Transformations () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.can = false
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1

  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function () {
    let choixTransformation; let nbImages
    // Ci-dessous, on évite le point O comme point et comme nom de point.
    const nomPointsTranslationDejaUtilises = [15]; const pointsDejaUtilises = [44]
    let aEviter = [44]; let mauvaisAntecedents = []

    if (!this.sup) { // Si aucune liste n'est saisie
      choixTransformation = rangeMinMax(1, 3)
    } else {
      if (typeof this.sup === 'number') {
        choixTransformation = combinaisonListes([contraindreValeur(1, 10, this.sup, 10)], 3)
      } else {
        choixTransformation = combinaisonListes(this.sup.split('-'), 3) // Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < 3; i++) {
          choixTransformation[i] = contraindreValeur(1, 10, parseInt(choixTransformation[i]), 10) // parseInt en fait un tableau d'entiers
        }
      }
    }

    if (this.can) {
      nbImages = 1
    } else nbImages = 3

    const M = []; const N = []; let pointM; let pointN
    let numPointN, croix
    const O = point(0, 0, 'O', 'above right')
    const d1 = droiteParPointEtPente(O, 1)
    const d3 = droiteHorizontaleParPoint(O)
    const d2 = droiteParPointEtPente(O, -1)
    const d4 = droiteVerticaleParPoint(O)
    d1.isVisible = true
    d2.isVisible = true
    d3.isVisible = true
    d4.isVisible = true
    d1.epaisseur = 2
    d2.epaisseur = 2
    d3.epaisseur = 2
    d4.epaisseur = 2
    d1.color = colorToLatexOrHTML(context.isHtml ? 'green' : 'black')
    d2.color = d1.color
    d3.color = d1.color
    d4.color = d1.color
    d1.opacite = 0.5
    d2.opacite = 0.5
    d3.opacite = 0.5
    d4.opacite = 0.5
    const objetsEnonce = []
    const objetsCorrection = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        croix = tracePoint(point(j - 4, i - 4), 'gray')
        croix.taille = 2
        // croix.color = colorToLatexOrHTML('gray')
        croix.style = 'x'
        croix.opacite = 1
        objetsEnonce.push(croix)
        objetsCorrection.push(tracePoint(point(j - 4, i - 4)))
        objetsEnonce.push(texteParPositionEchelle(Number(j + 10 * i).toString(), j - 4.2, i - 4.2, 'milieu', 'black', 0.8, 'middle', false, 0.8))
        objetsCorrection.push(texteParPositionEchelle(Number(j + 10 * i).toString(), j - 4.2, i - 4.2, 'milieu', 'black', 0.8, 'middle', false, 0.8))
      }
    }
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    const antecedents = [0, 0, 0]
    const images = [0, 0, 0]
    const k = [1, 1, 1]
    let longueurBoucle
    const xO = 4
    const yO = 4
    let xu
    let yu
    let puntoReseau // k : rapports d'homothéties, (xO,yO) point de rencontre des droites et centre, les composantes du vecteur de translation : (xu,yu)
    const n = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    let texte = ''
    let texteCorr = ''
    let pointMLettre
    const punto = [[]]
    const xuPossibles = combinaisonListes(rangeMinMax(-3, 3), 1)
    const yuPossibles = combinaisonListes(rangeMinMax(-3, 3), 1)
    for (let j = 0; j < nbImages; j++) {
      xu = xuPossibles[j]
      if (xu === 0) {
        if (yuPossibles[j] === 0) { enleveElementNo(yuPossibles, j) }
      }
      yu = yuPossibles[j]
      if (choixTransformation[j] === 10) {
        k[j] = choice([2, 3, 4]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
      } else if (choixTransformation[j] === 9) {
        k[j] = choice([1, 1.5, 2, 2.5, 3, 4, 5]) * randint(-1, 1, [0]) // rapport d'homothétie >=1 (1,2 ou 3)
      }
      mauvaisAntecedents = []
      antecedents[j] = randint(0, 99, pointsDejaUtilises)
      punto[j] = imagePointParTransformation(
        choixTransformation[j],
        [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
        [xO, yO],
        [xu, yu],
        k[j]
      )
      images[j] = punto[j][0] + punto[j][1] * 10
      // Limitation des points invariants
      if (choixTransformation[j] === 1 && images[j] % 11 === 0) { punto[j][0] = -1 } // Point impossible sur (d1) pour sa symétrie
      if (choixTransformation[j] === 3 && Math.floor(images[j] / 10 === 4)) { punto[j][0] = -1 } // Point impossible sur (d3) pour sa symétrie
      if (choixTransformation[j] === 4 && images[j] % 10 === 4) { punto[j][0] = -1 } // Point impossible sur (d4) pour sa symétrie

      // pour éviter les points en dehors des clous dans homothétie de rapport 1/k
      puntoReseau = egal(punto[j][0], Math.floor(punto[j][0]), 0.001) &&
        egal(punto[j][1], Math.floor(punto[j][1]), 0.001)
      // On vérifie que l'image est bien un point du réseau sinon, on change.
      mauvaisAntecedents = combinaisonListes(pointsDejaUtilises, 1)
      while (punto[j][0] < 0 ||
        punto[j][0] > 9 ||
        punto[j][1] < 0 ||
        punto[j][1] > 9 ||
        puntoReseau === false) {
        mauvaisAntecedents.push(antecedents[j])
        antecedents[j] = randint(0, 99, mauvaisAntecedents)
        punto[j] = imagePointParTransformation(
          choixTransformation[j],
          [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
          [xO, yO],
          [xu, yu],
          k[j]
        )
        images[j] = arrondi(punto[j][0] + punto[j][1] * 10, 0)
        // Limitation des points invariants
        if (choixTransformation[j] === 1 && images[j] % 11 === 0) { punto[j][0] = -1 } // Point impossible sur (d1) pour sa symétrie
        if (choixTransformation[j] === 3 && Math.floor(images[j] / 10 === 4)) { punto[j][0] = -1 } // Point impossible sur (d3) pour sa symétrie
        if (choixTransformation[j] === 4 && images[j] % 10 === 4) { punto[j][0] = -1 } // Point impossible sur  (d4) pour sa symétrie

        // pour éviter les points en dehors des clous dans homothétie de rapport 1/k
        if (egal(punto[j][0], Math.floor(punto[j][0]), 0.001) &&
          egal(punto[j][1], Math.floor(punto[j][1]), 0.001)) { puntoReseau = true } else { puntoReseau = false }
      }
      N[j] = point(arrondi(punto[j][0] - 4, 0), arrondi(punto[j][1] - 4, 0), 'above left')
      M[j] = point(antecedents[j] % 10 - 4, Math.floor(antecedents[j] / 10 - 4), 'above left')
      pointsDejaUtilises.push(antecedents[j])
      pointsDejaUtilises.push(arrondi(punto[j][0] + 10 * punto[j][1], 0))
    }
    // n[i] est un tableau contenant -1 pour la transformation d'indice i si elle n'est pas utilisée, et contenant le numéro du point concerné si la transformation i est utilisée pour ce point.
    // Je l'utilise pour faire apparaître la correction liée au point et à la transformation.
    for (let j = 0; j < nbImages; j++) {
      n[choixTransformation[j] - 1] = antecedents[j]
    }

    for (let i = 0, labO, labM, labN, traceAnt, traceIm, traceO, traceM, traceN; i < nbImages; i++) {
      xu = xuPossibles[i]
      yu = yuPossibles[i]
      traceAnt = tracePoint(M[i])
      traceIm = tracePoint(N[i])
      traceAnt.epaisseur = 2
      traceAnt.opacite = 1
      traceIm.opacite = 1
      traceIm.epaisseur = 2
      traceIm.color = colorToLatexOrHTML('orange')
      traceO = tracePoint(O)
      traceO.epaisseur = 2
      traceO.opacite = 1
      labO = labelLatexPoint({ points: [O], color: 'red', taille: 10 })
      labO.taille = 12
      switch (choixTransformation[i]) {
        case 1:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_1)$.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_1)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d1, traceAnt, latexParCoordonnees('(d_1)', 4.8, 4.5, 'green', 20, 10, '', 12))
          objetsCorrection.push(d1, traceAnt, traceIm, latexParCoordonnees('(d_1)', 3.5, 3, 'green', 15, 1, '', 12),
            segment(M[i], N[i], 'purple'), codageSegments('X', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 2:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_2)$.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_2)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d2, traceAnt, latexParCoordonnees('(d_2)', 4.3, -3.7, 'green', 20, 10, '', 12))
          objetsCorrection.push(d2, traceAnt, traceIm, latexParCoordonnees('(d_2)', 4.3, -3.7, 'green', 15, 10, '', 12),
            segment(M[i], N[i], 'cyan'), codageSegments('|||', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 3:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_3)$.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_3)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d3, traceAnt, latexParCoordonnees('(d_3)', -4.2, 0.5, 'green', 20, 10, ''))
          objetsCorrection.push(d3, traceAnt, traceIm, latexParCoordonnees('(d_3)', -4.2, 0.5, 'green', 15, 10, '', 12),
            segment(M[i], N[i], 'brown'), codageSegments('/', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 4:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_4)$.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_4)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d4, traceAnt, latexParCoordonnees('(d_4)', 0.2, 4.5, 'green', 15, 10, '', 12))
          objetsCorrection.push(d4, traceAnt, traceIm, latexParCoordonnees('(d_4)', 0.2, 4.5, 'green', 20, 10, '', 12),
            segment(M[i], N[i], 'yellow'), codageSegments('||', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 5:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 6:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 7:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la symétrie de centre O.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la symétrie de centre O est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('O', 'red', M[i], O, O, N[i]))
          break

        case 11:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 12:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 13:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 14:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codageSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 8:
          pointMLettre = randint(1, 26, nomPointsTranslationDejaUtilises)
          nomPointsTranslationDejaUtilises.push(pointMLettre)
          numPointN = randint(1, 26, nomPointsTranslationDejaUtilises)
          nomPointsTranslationDejaUtilises.push(numPointN)
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la translation qui transforme ${lettreDepuisChiffre(pointMLettre)} en ${lettreDepuisChiffre(numPointN)}.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par la translation qui transforme ${lettreDepuisChiffre(pointMLettre)} en ${lettreDepuisChiffre(numPointN)} est le point ${images[i]}.<br>`
          aEviter = enleveElementBis(pointsDejaUtilises)
          longueurBoucle = pointsDejaUtilises.length
          for (let kk = 0; kk < longueurBoucle; kk++) {
            aEviter.push(pointsDejaUtilises[kk] - xu - 10 * yu)
          }
          pointM = point(randint(-1, 2, [M[i].x, 0]), randint(-1, 2, [M[i].y, 0]), lettreDepuisChiffre(pointMLettre), 'above right')
          while (compteOccurences(aEviter, 44 + pointM.x + 10 * pointM.y) !== 0) {
            pointM = point(randint(-1, 2, [M[i].x, 0]), randint(-1, 2, [M[i].y, 0]), lettreDepuisChiffre(pointMLettre), 'above right')
          }
          pointN = translation(pointM, vecteur(xu, yu), lettreDepuisChiffre(numPointN), 'above right')
          traceM = tracePoint(pointM)
          traceN = tracePoint(pointN)
          traceM.epaisseur = 1
          traceN.epaisseur = 1
          labM = labelLatexPoint({ points: [pointM], color: 'red', taille: 10 })
          labN = labelLatexPoint({ points: [pointN], color: 'red', taille: 10 })
          labM.taille = 8
          labN.taille = 8
          pointsDejaUtilises.push(44 + pointM.x + 10 * pointM.y)
          pointsDejaUtilises.push(44 + pointN.x + 10 * pointN.y)
          objetsEnonce.push(traceAnt, traceM, traceN, labM, labN)
          objetsCorrection.push(vecteur(M[i], N[i]).representant(M[i]), vecteur(M[i], N[i]).representant(pointM), traceAnt, traceIm, traceM, traceN, labM, labN)

          break

        case 9:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k[i]}.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k[i]} est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'orange'))
          break

        case 10:
          texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${texFractionReduite(
              1,
              k[i]
            )}$.<br>`
          texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${texFractionReduite(
              1,
              k[i]
            )}$ est le point ${images[i]}.<br>`
          objetsEnonce.push(traceAnt, traceO, labO)
          objetsCorrection.push(traceAnt, traceIm, traceO, labO, segment(M[i], O, 'blue'), segment(N[i], O, 'orange'))
          break
      }

      setReponse(this, i, images[i])
      texte += ajouteChampTexteMathLive(this, i, 'largeur10 inline')
    }
    texte += '<br>' + mathalea2d({ xmin: -4.5, ymin: -4.5, xmax: 5.3, ymax: 5.3, pixelsParCm: 40, scale: 0.8, optionsTikz: ['every node/.style={scale=0.6}'], mainlevee: false }, objetsEnonce)
    texteCorr += '<br>' + mathalea2d({ xmin: -4.5, ymin: -4.5, xmax: 5.3, ymax: 5.3, pixelsParCm: 40, scale: 0.8, optionsTikz: ['every node/.style={scale=0.6}'], mainlevee: false }, objetsCorrection)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
    if (context.isAmc) {
      if (this.can) {
        this.autoCorrection[0] = {
          enonce: texte,
          enonceAGauche: [0.5, 0.5],
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: texteCorr,
                statut: '',
                reponse: {
                  texte: 'a)',
                  valeur: images[0],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            }]

        }
      } else {
        this.autoCorrection[0] = {
          enonce: texte,
          enonceAGauche: [0.5, 0.5],
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: texteCorr,
                statut: '',
                reponse: {
                  texte: 'a)',
                  valeur: images[0],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'b)',
                  valeur: images[1],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: 'c)',
                  valeur: images[2],
                  param: {
                    digits: 2,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            }]
        }
      }
    }
  }
  this.besoinFormulaireTexte = [
    'Choix des transformations',
    'Choisir 3 nombres maximum, séparés par des tirets : \n 1 & 2 : Symétries obliques\n 3 & 4 : Symétries horizontales ou verticales\n 5 & 6 : Rotations de 90°\n 7 : Symétrie centrale\n 8 : Translation\n 9 : Homothéties k>1\n 10 : Homothéties k<1'
  ] // Texte, tooltip
}
