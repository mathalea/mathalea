import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, calcul, texNombre, texPrix, arrondi } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Exprimer une fraction sous la forme d\'une valeur approchée d\'un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDeModifImportante = '17/03/2022'

/**
 * Déterminer une valeur approchée d'un pourcentage à l'aide de la calculatrice
 * @author Rémi Angot
 * Référence 5N11-4
 * 2021-02-06
 * Ajout de l'interactivité par Guillaume Valmont le 17/03/2022
*/
export const uuid = '6b534'
export const ref = '5N11-4'
export default function ValeurApprocheeDePourcentages () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au centième près du quotient puis l'écrire sous la forme d'un pourcentage à l'unité près."
  this.nbQuestions = 6
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const denominateurDisponibles = [100, 200, 300, 1000]
    const listeTypeDeQuestions = combinaisonListes(denominateurDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    if (this.sup === 2) {
      this.consigne = "À l'aide de la calculatrice, donner une valeur approchée au millième près du quotient puis l'écrire sous la forme d'un pourcentage au dixième près."
    }
    for (let i = 0, texte, texteCorr, num, den, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      den = randint(10, listeTypeDeQuestions[i])
      num = randint(1, den - 8)
      while (calcul(num / den) === arrondi(num / den, 4)) {
        den = randint(10, listeTypeDeQuestions[i])
        num = randint(1, den - 8)
      }
      texte = `$\\dfrac{${num}}{${den}}\\approx \\ldots\\ldots\\ldots $ soit environ $\\ldots\\ldots\\ldots~\\%$`
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur25', { texteApres: '%' })
      }
      if (this.sup === 1) {
        texteCorr = `$\\dfrac{${num}}{${den}}\\approx ${texPrix(calcul(num / den, 2))} $ soit environ $${calcul(calcul(num / den, 2) * 100)}~\\%$ $\\left(\\text{car } ${texPrix(calcul(num / den, 2))}=\\dfrac{${calcul(calcul(num / den, 2) * 100)}}{100}\\right)$.`
        setReponse(this, i, calcul(calcul(num / den, 2) * 100))
      }
      if (this.sup === 2) {
        texteCorr = `$\\dfrac{${num}}{${den}}\\approx ${texNombre(calcul(num / den, 3))} $ soit environ $${texNombre(calcul(num / den * 100, 1))}~\\%$ $\\left(\\text{car } ${texNombre(calcul(num / den, 3))}=\\dfrac{${texNombre(calcul(num / den * 100, 1))}}{100}\\right)$.`
        setReponse(this, i, calcul(num / den * 100, 1))
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
  this.besoinFormulaireNumerique = ['Niveau de précision', 2, "1 : Donner un pourcentage à l'unité près\n2 : Donner un pourcentage au dixième près"]
}
