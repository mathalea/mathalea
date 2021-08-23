import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, lettreDepuisChiffre, randint, texFraction } from '../../modules/outils.js'
import { mathalea2d, droiteGraduee2, point, tracePoint, labelPoint } from '../../modules/2d.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
import { afficheScore } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser les abscisses fractionnaires'
export const interactifReady = true
export const interactifType = 'custom'

// Version SVGJS commit 87bd9a3

/**
 * Description didactique de l'exercice
 * @author Rémi Angot
 * Référence 6N21
 * publié le 29/6/2021
*/
export default function PlacerPointsAbscissesFractionnaires () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 5
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let typeDeQuestions
    if (this.sup === 4) {
      typeDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    } else {
      typeDeQuestions = combinaisonListes([parseInt(this.sup)], this.nbQuestions)
    }
    const pointsSolutions = []
    const pointsNonSolutions = [] // Pour chaque question, la liste des points qui ne doivent pas être cliqués
    const fractionsUtilisees = [] // Pour s'assurer de ne pas poser 2 fois la même question
    for (let i = 0, texte, texteCorr, origine, num, num2, num3, den, A, B, C, traceA, traceB, traceC, labels, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1: // Placer des demis aux quarts sur un axe
          origine = 0
          den = randint(2, 4)
          num = randint(1, den * 4)
          break
        case 2: // Placer des cinquièmes aux neuvièmes sur un axe
          origine = 0
          den = randint(5, 9)
          num = randint(1, den * 4)
          break
        case 3: // Placer des demis aux neuvièmes à partir d'un entier >=1 sur un axe
          origine = randint(1, 7)
          den = randint(2, 9)
          num = randint(origine * den + 1, (origine + 4) * den)
      }
      if (this.interactif) {
        texte = `Place le point $${lettreDepuisChiffre(i + 1)}\\left(${texFraction(num, den)}\\right).$`
      } else {
        num2 = randint(origine + 1, (origine + 4) * den, num)
        num3 = randint(origine + 1, (origine + 4) * den, [num, num2])
        texte = `Place les points $${lettreDepuisChiffre(i * 3 + 1)}\\left(${texFraction(num, den)}\\right)$, $~${lettreDepuisChiffre(i * 3 + 2)}\\left(${texFraction(num2, den)}\\right)$ et $~${lettreDepuisChiffre(i * 3 + 3)}\\left(${texFraction(num3, den)}\\right)$.`
      }
      const tailleUnite = 4
      const d = droiteGraduee2({
        Min: origine,
        Max: origine + 4 * tailleUnite,
        Unite: tailleUnite,
        thickSec: true,
        thickSecDist: 1 / den
      })
      const mesObjets = [d]
      pointsNonSolutions[i] = []
      if (this.interactif) {
        for (let indicePoint = 0, monPoint; indicePoint < 60; indicePoint++) {
          monPoint = pointCliquable(indicePoint / den * tailleUnite, 0, { size: 8, width: 5, color: 'blue', radius: tailleUnite / den / 2 })
          mesObjets.push(monPoint)
          if (indicePoint === num - origine * den) {
            pointsSolutions[i] = monPoint
          } else {
            pointsNonSolutions[i].push(monPoint)
          }
        }
      }
      texte += '<br>' + mathalea2d({ xmin: -0.2, xmax: 4 * tailleUnite + 1, ymin: -1, ymax: 1, style: 'margin-top:30px ' }, mesObjets)
      if (this.interactif) {
        texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
      }

      A = point(((num / den) - origine) * tailleUnite, 0, lettreDepuisChiffre(i + 1))
      traceA = tracePoint(A)
      traceA.color = 'blue'
      traceA.epaisseur = this.interactif ? 3 : 2
      traceA.taille = this.interactif ? 5 : 3
      labels = labelPoint(A)
      if (!this.interactif) {
        A.nom = lettreDepuisChiffre(i * 3 + 1)
        B = point(((num2 / den) - origine) * tailleUnite, 0, lettreDepuisChiffre(i * 3 + 2))
        traceB = tracePoint(B)
        traceB.color = 'blue'
        traceB.epaisseur = 2
        traceB.taille = 3
        C = point(((num3 / den) - origine) * tailleUnite, 0, lettreDepuisChiffre(i * 3 + 3))
        traceC = tracePoint(C)
        traceC.color = 'blue'
        traceC.epaisseur = 2
        traceC.taille = 3
        labels = labelPoint(A, B, C)
      }

      if (!context.isHtml) {
        A.positionLabel = 'above = 0.2'
        B.positionLabel = 'above = 0.2'
        C.positionLabel = 'above = 0.2'
      }

      if (this.interactif) {
        texteCorr = `$${lettreDepuisChiffre(i + 1)}\\left(${texFraction(num, den)}\\right).$`
        texteCorr += '<br>' + mathalea2d({ xmin: -0.2, xmax: origine + 4 * tailleUnite + 1, ymin: -1, ymax: 1, style: 'margin-top:30px ' }, d, traceA, labels)
      } else {
        texteCorr = `$${lettreDepuisChiffre(i * 3 + 1)}\\left(${texFraction(num, den)}\\right)$, $~${lettreDepuisChiffre(i * 3 + 2)}\\left(${texFraction(num2, den)}\\right)$ et $~${lettreDepuisChiffre(i * 3 + 3)}\\left(${texFraction(num3, den)}\\right)$`
        texteCorr += '<br>' + mathalea2d({ xmin: -0.2, xmax: origine + 4 * tailleUnite + 1, ymin: -1, ymax: 1, style: 'margin-top:30px ' }, d, traceA, traceB, traceC, labels)
      }

      if (!isArrayInArray(fractionsUtilisees, [num, den])) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        fractionsUtilisees[i] = [num, den]
      }
      cpt++
    }
    this.correctionInteractive = (i) => {
      let resultat
      let aucunMauvaisPointsCliques = true
      pointsSolutions[i].stopCliquable()
      for (const monPoint of pointsNonSolutions[i]) {
        if (monPoint.etat) aucunMauvaisPointsCliques = false
        monPoint.stopCliquable()
      }
      const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${i}`)
      if (aucunMauvaisPointsCliques && pointsSolutions[i].etat) {
        divFeedback.innerHTML = '😎'
        resultat = 'OK'
      } else {
        divFeedback.innerHTML = '☹️'
        resultat = 'KO'
      }
      return resultat
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, '1 : Demis, tiers ou quarts avec zéro placé\n2 : Des cinquièmes aux neuvièmes avec zéro placé \n3 : Toutes les fractions précédentes mais zéro non visible\n4 : Mélange'
  ]
}

/**
 * Vérifie la présence d'un tableau dans un tableau de tableau
 * @param {array} arr
 * @param {array} item
 * @returns {boolean}
 */
function isArrayInArray (arr, item) {
  const itemAsString = JSON.stringify(item)
  const contains = arr.some(function (ele) {
    return JSON.stringify(ele) === itemAsString
  })
  return contains
}
