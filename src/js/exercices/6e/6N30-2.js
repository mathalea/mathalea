import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, arrondi, texNombrec, lettreDepuisChiffre, htmlConsigne, egal, calcul } from '../../modules/outils.js'
import { droiteGraduee2, labelPoint, point, tracePoint } from '../../modules/2d.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
export const titre = 'Placer un point d\'abscisse décimale'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
/**
 * Placer un point d'abscisse décimale
 * @author Jean-Claude Lhote et Rémi Angot
 * référence : 6N30-2
 * Relecture : Janvier 2022 par EE
 */
export default function PlacerPointsSurAxe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Placer trois points sur un axe gradué.'
  this.nbQuestions = 5
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1
  const changeCoord = function (x, abs0, pas1) {
    return (abs0 + (x - abs0) * 3 * pas1)
  }

  this.nouvelleVersion = function (numeroExercice) {
    this.sup = parseInt(this.sup)
    // numeroExercice est 0 pour l'exercice 1
    const pointsSolutions = []
    const pointsNonSolutions = [] // Pour chaque question, la liste des points qui ne doivent pas être cliqués
    let typesDeQuestions
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    if (this.sup > 3) {
      typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    } else {
      typesDeQuestions = combinaisonListes(
        [this.sup],
        this.nbQuestions
      )
    }

    this.contenu = htmlConsigne(this.consigne)
    for (
      let i = 0,
        abs0,
        abs1,
        abs2,
        abs3,
        l1,
        l2,
        l3,
        x1,
        x2,
        x3,
        x11,
        x22,
        x33,
        A, B, C,
        pas1,
        pas2,
        texte,
        texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      const objetsEnonce = []
      const objetsCorr = []
      pointsNonSolutions[i] = []
      pointsSolutions[i] = []
      l1 = lettreDepuisChiffre(i * 3 + 1)
      l2 = lettreDepuisChiffre(i * 3 + 2)
      l3 = lettreDepuisChiffre(i * 3 + 3)

      switch (typesDeQuestions[i]) {
        case 1: // Placer un point sur un axe (1 décimale)
          abs0 = this.sup > 4 ? randint(-5, 5) : randint(0, 9)
          pas1 = 1
          pas2 = 10
          break

        case 2: // Placer un point sur un axe (2 décimales)
          abs0 = this.sup > 4 ? calcul(randint(-50, 50) / 10) : calcul(randint(0, 90) / 10)
          pas1 = 10
          pas2 = 10
          break

        case 3: // Placer un point sur un axe (3 décimales)
          abs0 = this.sup > 4 ? calcul(randint(-500, 500) / 100) : calcul(randint(0, 990) / 100)
          pas1 = 100
          pas2 = 10
          break
      }
      x1 = randint(0, 2)
      x2 = randint(3, 4)
      x3 = randint(5, 6)
      x11 = randint(1, 9)
      x22 = randint(1, 9)
      x33 = randint(1, 3)
      abs1 = arrondi(
        abs0 + x1 / pas1 + x11 / pas1 / pas2,
        typesDeQuestions[i]
      ) // le type de questions est égal au nombre de décimales.
      abs2 = arrondi(
        abs0 + x2 / pas1 + x22 / pas1 / pas2,
        typesDeQuestions[i]
      )
      abs3 = arrondi(
        abs0 + x3 / pas1 + x33 / pas1 / pas2,
        typesDeQuestions[i]
      )
      A = point(changeCoord(abs1, abs0, pas1), 0, l1, 'above')
      B = point(changeCoord(abs2, abs0, pas1), 0, l2, 'above')
      C = point(changeCoord(abs3, abs0, pas1), 0, l3, 'above')
      if (this.interactif && !context.isAmc) {
        for (let indicePoint = 0, monPoint, dist; indicePoint < 70; indicePoint++) {
          dist = abs0 + indicePoint / pas1 / pas2
          monPoint = pointCliquable(changeCoord(dist, abs0, pas1), 0, { size: 6, width: 2, color: 'blue', radius: 0.15 })
          objetsEnonce.push(monPoint)
          if (egal(dist, abs1) || egal(dist, abs2) || egal(dist, abs3)) {
            pointsSolutions[i].push(monPoint)
          } else {
            pointsNonSolutions[i].push(monPoint)
          }
        }
      }

      const droite = droiteGraduee2({
        Unite: 3 * pas1,
        Min: abs0,
        Max: abs0 + 6.9 / pas1,
        x: abs0,
        y: 0,
        thickSecDist: 1 / pas2 / pas1,
        thickSec: true,
        labelsPrincipaux: true,
        thickDistance: 1 / pas1
      })
      objetsEnonce.push(droite)
      objetsCorr.push(droite)

      texte = `Placer les points : $${l1}(${texNombrec(abs1)}), ${l2}(${texNombrec(abs2)}), ${l3}(${texNombrec(abs3)})$<br>`

      texte += mathalea2d({ xmin: abs0 - 0.5, xmax: abs0 + 22, ymin: -1, ymax: 1, scale: 0.75, pixelsParCm: 40 }, objetsEnonce)
      if (this.interactif && !context.isAmc) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }

      objetsCorr.push(labelPoint(A, B, C), tracePoint(A, B, C))
      texteCorr = mathalea2d({ xmin: abs0 - 0.5, xmax: abs0 + 22, ymin: -1, ymax: 1, scale: 0.75, pixelsParCm: 40 }, objetsCorr)
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [{ texte: texteCorr, statut: 0, feedback: '', sanscadre: true }]
        }
      }

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    // Pour distinguer les deux types de codage de recuperation des résultats
    this.exoCustomResultat = false
    // Gestion de la correction
    this.correctionInteractive = (i) => {
      let aucunMauvaisPointsCliques = true
      for (const monPoint of pointsNonSolutions[i]) {
        if (monPoint.etat) aucunMauvaisPointsCliques = false
        monPoint.stopCliquable()
      }
      for (const monPoint of pointsSolutions[i]) {
        if (!monPoint.etat) aucunMauvaisPointsCliques = false
        monPoint.stopCliquable()
      }
      for (let j = 0; j < pointsSolutions[i].length; j++) {
        pointsSolutions[i][j].stopCliquable()
      }

      return (aucunMauvaisPointsCliques && pointsSolutions[i][0].etat && pointsSolutions[i][1].etat && pointsSolutions[i][2].etat) ? 'OK' : 'KO'
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    '1 : Un chiffre après la virgule\n2 : Deux chiffres après la virgule \n3 : Trois chiffres après la virgule\n4 : Mélange'
  ]
}
