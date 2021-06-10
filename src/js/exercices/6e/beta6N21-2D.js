import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, lettreDepuisChiffre, randint, texFraction } from '../../modules/outils.js'
import { mathalea2d, droiteGraduee2 } from '../../modules/2d.js'
import { pointCliquable } from '../../modules/2dinteractif.js'
import { afficheScore } from '../../modules/gestionInteractif.js'
export const titre = 'Utiliser les abscisses fractionnaires'
export const interactifReady = true
export const interactifType = 'custom'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = [1] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    const pointsSolutions = []
    const pointsNonSolutions = [] // Pour chaque question, la liste des points qui ne doivent pas être cliqués
    const fractionsUtilisees = [] // Pour s'assurer de ne pas poser 2 fois la même question
    for (let i = 0, texte, texteCorr, origine, num, den, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1:
          origine = 0
          den = randint(2, 4)
          num = randint(1, den * 4)
          texte = `Place le point $${lettreDepuisChiffre(i + 1)}\\left(${texFraction(num, den)}\\right).$`
          texteCorr = `Correction ${i + 1} de type 1`
          break
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
      for (let indicePoint = 0, monPoint; indicePoint < 60; indicePoint++) {
        monPoint = pointCliquable(indicePoint / den * tailleUnite, 0, { size: 8, width: 5, color: 'blue', radius: tailleUnite / den / 2 })
        mesObjets.push(monPoint)
        if (indicePoint === num) {
          pointsSolutions[i] = monPoint
        } else {
          pointsNonSolutions[i].push(monPoint)
        }
      }
      texte += '<br>' + mathalea2d({ xmin: -1, xmax: origine + 4 * tailleUnite + 1, ymin: -1, ymax: 2, style: 'display:block, top-margin:20px' }, mesObjets)
      texte += `<div id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`

      if (!isArrayInArray(fractionsUtilisees, [num, den])) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        fractionsUtilisees[i] = [num, den]
      }
      cpt++
    }
    this.correctionInteractive = (elt) => {
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
