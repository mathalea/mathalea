import { mathalea2d, point, droiteParPointEtPente, droiteHorizontaleParPoint, droiteVerticaleParPoint, tracePoint, labelPoint, segment, vecteur, texteParPosition, latexParCoordonnees, codeSegments, afficheMesureAngle, milieu, translation } from '../../modules/2d.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListes, imagePointParTransformation, texFractionReduite, numAlpha } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Transformations : trouvers un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 * Pas de version LaTeX
 */
export default function Transformations () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()

  // this.titre = "Trouver l'image d'un point par une transformation du plan";
  this.can = false
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
    this.sup = 1
  const listeTypeDeQuestions = [
    [1, 2, 3, 4],
    [1, 2, 7, 7, 7, 7],
    [1, 2, 7, 7, 8, 8, 8, 8, 8],
    [1, 2, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10]
  ]

  // this.sup = 1; // 1 pour les 6ème, 2 pour les 5èmes, 3 pour les 4èmes, et 4 pour les 3èmes.
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.nouvelleVersion = function (numeroExercice) {
    let choixTransformation, nbImages
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est pour le niveau 1=6e, 4=3e
      choixTransformation = combinaisonListes(listeTypeDeQuestions[this.sup - 1], 3)
    } else {
      choixTransformation = combinaisonListes(this.sup.split('-'), 3) // Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < 3; i++) {
        choixTransformation[i] = parseInt(choixTransformation[i])
      }
    }
    if (this.can) {
      nbImages = 1
    } else nbImages = 3

    const M = []; const N = []; let pointM; let pointN
    const O = point(0, 0, 'O', 'below')
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
    d1.color = 'green'
    d2.color = 'green'
    d3.color = 'green'
    d4.color = 'green'
    d1.opacite = 0.5
    d2.opacite = 0.5
    d3.opacite = 0.5
    d4.opacite = 0.5
    const objetsEnonce = []
    const objetsCorrection = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        objetsEnonce.push(tracePoint(point(j - 4, i - 4)))
        objetsCorrection.push(tracePoint(point(j - 4, i - 4)))
        objetsEnonce.push(texteParPosition(j + 10 * i, j - 4.2, i - 4.2, 'milieu', 'gray', 0.8, 'middle', false))
        objetsCorrection.push(texteParPosition(j + 10 * i, j - 4.2, i - 4.2, 'milieu', 'gray', 0.8, 'middle', false))
      }
    }
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    const antecedents = [0, 0, 0]
    const images = [0, 0, 0]
    const k = [1, 1, 1]
    let k1
    let k2
    const xO = 4
    const yO = 4
    let yu
    let puntoReseau // k : rapports d'homothéties, (xO,yO) point de rencontre des droites et centre, les composantes du vecteur de translation : (xu,yu)
    const n = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    let texte = ''
    let texteCorr = ''
    const punto = [[]]

    const xu = randint(-3, 3)
    if (xu === 0) {
      yu = randint(-3, 3, [0])
    } else {
      yu = randint(-3, 3)
    }
    for (let j = 0; j < nbImages; j++) {
      if (choixTransformation[j] === 10) {
        k[j] = choice([2, 4]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
        k2 = k[j]
      } else if (choixTransformation[j] === 9) {
        k[j] = choice([1, 2, 3]) * randint(-1, 1, [0]) // rapport d'homothétie >=1 (1,2 ou 3)
        k1 = k[j]
      }
      antecedents[j] = randint(0, 99)
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
      if (choixTransformation[j] === 4 && images[j] % 10 === 4) { punto[j][0] = -1 } // Point impossible sur  (d4) pour sa symétrie
      if ((choixTransformation[j] === 5 || choixTransformation[j] === 5) &&
        antecedents[j] === 44) { punto[j][0] = -1 } // point O impossible pour rotation
      if (choixTransformation[j] === 10 && antecedents[j] === 44) { punto[j][0] = -1 } // point O impossible par homothétie de rapport 1/k2

      // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
      if (punto[j][0] - Math.floor(punto[j][0]) === 0 &&
        punto[j][1] - Math.floor(punto[j][1]) === 0) { puntoReseau = true } else { puntoReseau = false }
      // On vérifie que l'image est bien un point du réseau sinon, on change.
      while (punto[j][0] < 0 ||
        punto[j][0] > 9 ||
        punto[j][1] < 0 ||
        punto[j][1] > 9 ||
        puntoReseau === false) {
        if (choixTransformation[j] === 10) {
          k[j] = choice([2, 4]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
          k2 = k[j]
        } else if (choixTransformation[j] === 9) {
          k[j] = choice([1, 2, 3]) * randint(-1, 1, [0]) // rapport d'homothétie >=1 (1,2 ou 3)
          k1 = k[j]
        }
        antecedents[j] = randint(0, 99)
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
        if (choixTransformation[j] === 4 && images[j] % 10 === 4) { punto[j][0] = -1 } // Point impossible sur  (d4) pour sa symétrie
        if ((choixTransformation[j] === 5 || choixTransformation[j] === 5) &&
          antecedents[j] === 44) { punto[j][0] = -1 } // point O impossible pour rotation
        if (choixTransformation[j] === 10 && antecedents[j] === 44) { punto[j][0] = -1 } // point O impossible par homothétie de rapport 1/k2

        // pour éviter les points en dehors des clous dans homothétie de rapport 1/k2
        if (punto[j][0] - Math.floor(punto[j][0]) === 0 &&
          punto[j][1] - Math.floor(punto[j][1]) === 0) { puntoReseau = true } else { puntoReseau = false }
      }
      N[j] = point(punto[j][0] - 4, punto[j][1] - 4)
      M[j] = point(antecedents[j] % 10 - 4, Math.floor(antecedents[j] / 10 - 4))
    }
    // n[i] est un tableau contenant -1 pour la transformation d'indice i si elle n'est pas utilisée, et contenant le numéro du point concerné si la transformation i est utilisée pour ce point.
    // Je l'utilise pour faire apparaître la correction liée au point et à la transformation.
    for (let j = 0; j < nbImages; j++) {
      n[choixTransformation[j] - 1] = antecedents[j]
    }
    for (let i = 0; i < nbImages; i++) {
      switch (choixTransformation[i]) {
        case 1:
          texte +=
            numAlpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_1)$.<br>`
          texteCorr +=
            numAlpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_1)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d1, tracePoint(M[i]), latexParCoordonnees('(d_1)', 4.5, 4.2, 'green', 15, 1, ''))
          objetsCorrection.push(d1, tracePoint(M[i], N[i]), latexParCoordonnees('(d_1)', 3.5, 3, 'green', 15, 1, ''),
            segment(M[i], N[i], 'purple'), codeSegments('X', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 2:
          texte +=
            numAlpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_2)$.<br>`
          texteCorr +=
            numAlpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_2)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d2, tracePoint(M[i]), latexParCoordonnees('(d_2)', 4.3, -3.7, 'green', 15, 1, ''))
          objetsCorrection.push(d2, tracePoint(M[i], N[i]), latexParCoordonnees('(d_2)', 4.3, -3.7, 'green', 15, 1, ''),
            segment(M[i], N[i], 'cyan'), codeSegments('|||', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 3:
          texte +=
            numAlpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_3)$.<br>`
          texteCorr +=
            numAlpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_3)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d3, tracePoint(M[i]), latexParCoordonnees('(d_3)', -4.2, 0.5, 'green', 15, 1, ''))
          objetsCorrection.push(d3, tracePoint(M[i], N[i]), latexParCoordonnees('(d_3)', -4.2, 0.5, 'green', 15, 1, ''),
            segment(M[i], N[i], 'brown'), codeSegments('/', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 4:
          texte +=
            numAlpha(i) +
            ` Donner le numéro du symétrique du point ${antecedents[i]} par rapport à la droite $(d_4)$.<br>`
          texteCorr +=
            numAlpha(i) +
            ` Le symétrique du point ${antecedents[i]} par rapport à $(d_4)$ est le point ${images[i]}.<br>`
          objetsEnonce.push(d4, tracePoint(M[i]), latexParCoordonnees('(d_4)', 0.2, 4.5, 'green', 15, 1, ''))
          objetsCorrection.push(d4, tracePoint(M[i], N[i]), latexParCoordonnees('(d_4)', 0.2, 4.5, 'green', 15, 1, ''),
            segment(M[i], N[i], 'yellow'), codeSegments('||', 'red', M[i], milieu(M[i], N[i]), milieu(M[i], N[i]), N[i]))
          break

        case 5:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 6:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de  l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 90° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 7:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la symétrie de centre O.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la symétrie de centre O est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('O', 'red', M[i], O, O, N[i]))
          break

        case 11:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 12:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 60° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 13:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens anti-horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 14:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la rotation de centre O et d'angle 120° dans le sens horaire est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'blue'), codeSegments('||', 'red', M[i], O, O, N[i]), afficheMesureAngle(M[i], O, N[i]))
          break

        case 8:
          pointM = point(randint(-1, 2, [M[i].x, 0]), randint(-1, 2, [M[i].y, 0]), 'M', 'below')
          pointN = translation(pointM, vecteur(xu, yu), 'N', 'below')
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par la translation qui transforme M en N.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par la translation qui transforme M en N est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], pointM, pointN), labelPoint(pointM, pointN))
          objetsCorrection.push(tracePoint(M[i], N[i], pointM, pointN), labelPoint(pointM, pointN), vecteur(M[i], N[i]).representant(M[i]), vecteur(M[i], N[i]).representant(pointM))
          break

        case 9:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1}.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport ${k1} est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'orange'))
          break

        case 10:
          texte +=
            numAlpha(i) +
            ` Donner le numéro de l'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${texFractionReduite(
              1,
              k2
            )}$.<br>`
          texteCorr +=
            numAlpha(i) +
            ` L'image du point ${antecedents[i]} par l'homothétie de centre O et de rapport $${texFractionReduite(
              1,
              k2
            )}$ est le point ${images[i]}.<br>`
          objetsEnonce.push(tracePoint(M[i], O), labelPoint(O))
          objetsCorrection.push(tracePoint(M[i], N[i], O), labelPoint(O), segment(M[i], O, 'blue'), segment(N[i], O, 'orange'))
          break
      }

      texte += ajouteChampTexteMathLive(this, i, 'largeur10')
      setReponse(this, i, images[i])
    }
    /* if (context.isAmc) {
      enonceAMC += '\\\\' + mathalea2d({ xmin: -4.5, ymin: -4.5, xmax: 5.3, ymax: 5.3, pixelsParCm: 40, scale: 0.8, optionsTikz: ['every node/.style={scale=0.6}'], mainlevee: false }, objetsEnonce)
    } */
    texte += '<br>' + mathalea2d({ xmin: -4.5, ymin: -4.5, xmax: 5.3, ymax: 5.3, pixelsParCm: 40, scale: 0.8, optionsTikz: ['every node/.style={scale=0.6}'], mainlevee: false }, objetsEnonce)
    texteCorr += '<br>' + mathalea2d({ xmin: -4.5, ymin: -4.5, xmax: 5.3, ymax: 5.3, pixelsParCm: 40, scale: 0.8, optionsTikz: ['every node/.style={scale=0.6}'], mainlevee: false }, objetsCorrection)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        options: { multicols: true },
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
  this.besoinFormulaireTexte = [
    'Choix des transformations',
    '3 nombres séparés par des tirets\n 1&2 : Symétries obliques\n 3&4 : Symétries horizontales ou verticales\n 5&6 : Rotations de 90°\n 7 : Symétrie centrale\n 8 : Translation\n 9 : Homothéties k>1\n 10 : Homothéties k<1'
  ] // Texte, tooltip
}
