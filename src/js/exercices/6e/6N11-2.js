import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, lettreDepuisChiffre, htmlConsigne, texNombre, egal, shuffle, stringNombre } from '../../modules/outils.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
import { afficheScore } from '../../modules/gestionInteractif.js'
import { droiteGraduee2, labelPoint, mathalea2d, point, tracePoint } from '../../modules/2d.js'

export const titre = 'Placer un point d’abscisse entière (grands nombres)'
export const interactifReady = true
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'AMCOpen'
/**
 * Placer un point d'abscisse entière
 * @author Jean-Claude Lhote et Rémi Angot
 * référence 6N11-2
 * Relecture : Novembre 2021 par EE
 */
export default function PlacerUnPointAbscisseEntiere2d () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacing = 1
  this.spacingCorr = 1
  this.sup = 1

  this.nouvelleVersion = function () {
    if (this.interactif) {
      this.consigne = 'Placer un point sur un axe gradué.'
    } else {
      this.consigne = 'Placer trois points sur un axe gradué.'
    }
    // numeroExercice est 0 pour l'exercice 1
    let typesDeQuestions
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    if (parseInt(this.sup) === 4) { typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions) } else {
      typesDeQuestions = combinaisonListes(
        [parseInt(this.sup)],
        this.nbQuestions
      )
    }
    const pointsSolutions = []
    const pointsNonSolutions = [] // Pour chaque question, la liste des points qui ne doivent pas être cliqués
    const tailleUnite = 4
    const d = []
    let abscisse = []
    this.contenu = htmlConsigne(this.consigne)
    for (let i = 0, abs0, l1, l2, l3, x1, x2, x3, x11, x22, x33, A, B, C, traceA, traceB, traceC, labels, pas1, texte = '', texteCorr = ''; i < this.nbQuestions; i++) {
      l1 = lettreDepuisChiffre(i * 3 + 1)
      l2 = lettreDepuisChiffre(i * 3 + 2)
      l3 = lettreDepuisChiffre(i * 3 + 3)
      this.autoCorrection[3 * i] = { propositions: [{ statut: 4, feedback: '' }] }
      this.autoCorrection[3 * i + 1] = { propositions: [{ statut: 4, feedback: '' }] }
      this.autoCorrection[3 * i + 2] = { propositions: [{ statut: 4, feedback: '' }] }
      switch (typesDeQuestions[i]) {
        case 1: // Placer des entiers sur un axe (milliers)
          abs0 = randint(1, 9) * 1000
          pas1 = 1000
          break

        case 2: // Placer des entiers sur un axe (dizaines de mille)
          abs0 = randint(5, 15) * 10000
          pas1 = 10000
          break

        case 3: // Placer des entiers sur un axe (centaines de mille)
          abs0 = randint(35, 85) * 100000
          pas1 = 100000
          break
      }
      x1 = randint(0, 2) + randint(1, 9) / 10
      x2 = randint(3, 4) + randint(1, 9) / 10
      x3 = randint(5, 6) + randint(1, 9) / 10
      x11 = abs0 + x1 * pas1
      x22 = abs0 + x2 * pas1
      x33 = abs0 + x3 * pas1
      abscisse = shuffle([[x1, x11], [x2, x22], [x3, x33]])
      d[2 * i] = droiteGraduee2({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        step1: 10,
        labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(calcul(abs0 + pas1))}`]]
      })
      d[2 * i + 1] = droiteGraduee2({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        labelListe: [[0, `${stringNombre(abs0)}`], [1, `${stringNombre(calcul(abs0 + pas1))}`]],
        thickSec: true,
        step1: 10
      })
      const mesObjets = [d[2 * i]]
      if (this.interactif) {
        texte = `Placer le point $${l1}\\left(${texNombre(abscisse[0][1])}\\right).$`
      } else {
        texte = `Placer les points $${l1}\\left(${texNombre(abscisse[0][1])}\\right)$, $~${l2}\\left(${texNombre(abscisse[1][1])}\\right)$ et $~${l3}\\left(${texNombre(abscisse[2][1])}\\right)$.`
      }
      pointsNonSolutions[i] = []
      if (this.interactif) {
        for (let indicePoint = 0, monPoint; indicePoint < 70; indicePoint++) {
          monPoint = pointCliquable(indicePoint / 10 * tailleUnite, 0, { size: 5, width: 3, color: 'blue', radius: tailleUnite / 25 })
          mesObjets.push(monPoint)
          if (egal(indicePoint * pas1 / 10 + abs0, abscisse[0][1])) {
            pointsSolutions[i] = monPoint
          } else {
            pointsNonSolutions[i].push(monPoint)
          }
        }
      }
      texte += mathalea2d({ xmin: -2, ymin: -1, xmax: 30, ymax: 1, pixelsParCm: 20, scale: 0.5 }, mesObjets)
      if (this.interactif) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }

      A = point(abscisse[0][0] * tailleUnite, 0, l1)
      traceA = tracePoint(A)
      traceA.color = 'blue'
      traceA.epaisseur = 3
      traceA.taille = 5
      labels = labelPoint(A)
      if (!this.interactif) {
        A.nom = lettreDepuisChiffre(i * 3 + 1)
        B = point(abscisse[1][0] * tailleUnite, 0, l2)
        traceB = tracePoint(B)
        traceB.color = 'blue'
        traceB.epaisseur = 3
        traceB.taille = 5
        C = point(abscisse[2][0] * tailleUnite, 0, l3)
        traceC = tracePoint(C)
        traceC.color = 'blue'
        traceC.epaisseur = 3
        traceC.taille = 5
        labels = labelPoint(A, B, C)
      }
      if (this.interactif) {
        texteCorr = `$${l1}\\left(${abscisse[0][1]}\\right).$`
        texteCorr += '<br>' + mathalea2d({ xmin: -2, xmax: 30, ymin: -1, ymax: 1, pixelsParCm: 20, scale: 0.5 }, d[2 * i + 1], traceA, labels)
      } else {
        texteCorr = `$${l1}\\left(${abscisse[0][1]}\\right)$, $~${l2}\\left(${abscisse[1][1]}\\right)$ et $~${l3}\\left(${abscisse[2][1]}\\right)$`
        texteCorr += '<br>' + mathalea2d({ xmin: -2, xmax: 30, ymin: -1, ymax: 1, pixelsParCm: 20, scale: 0.5 }, d[2 * i + 1], traceA, traceB, traceC, labels)
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    // Pour distinguer les deux types de codage de recuperation des résultats
    this.exoCustomResultat = false
    // Gestion de la correction
    this.correctionInteractive = () => {
      let nbBonnesReponses = 0
      let nbMauvaisesReponses = 0
      for (let i = 0, aucunMauvaisPointsCliques; i < this.nbQuestions; i++) {
        aucunMauvaisPointsCliques = true
        const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${i}`)
        pointsSolutions[i].stopCliquable()
        for (const monPoint of pointsNonSolutions[i]) {
          if (monPoint.etat) aucunMauvaisPointsCliques = false
          monPoint.stopCliquable()
        }
        if (aucunMauvaisPointsCliques && pointsSolutions[i].etat) {
          divFeedback.innerHTML = '😎'
          nbBonnesReponses++
        } else {
          divFeedback.innerHTML = '☹️'
          nbMauvaisesReponses++
        }
      }
      afficheScore(this, nbBonnesReponses, nbMauvaisesReponses)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    '1 : Ordre de grandeur : milliers\n2 : Ordre de grandeur : dizaines de mille\n3 : Ordre de grandeur : centaines de mille\n4 : Mélange'
  ]
}
