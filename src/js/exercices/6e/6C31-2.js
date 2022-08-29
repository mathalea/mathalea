import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, shuffle, texNombre, numAlpha, arrondi } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Donner des valeurs approchées d\'un quotient décimal'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Donner des valeurs approchées d'un quotient décimale.
 *
 *
 * @author Rémi Angot
 * Référence 6C31-2
 * 2020-12-07
 */
export const uuid = '013ef'
export const ref = '6C31-2'
export default function ValeurApprocheeDivisionDecimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Compléter les phrases suivantes.'
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Une fraction irréductible avec un dénominateur qui comporte un facteur différent de 2 ou de 5
      // aura une écriture décimale périodique infinie
      const k1 = choice([3, 7, 11, 13])
      const k2 = choice([3, 7, 11, 13], k1)
      const a = choice([3, 5, 7, 11, 13], [k1, k2]) * choice([3, 5, 7, 11, 13], [k1, k2])
      const b = k1 * k2
      const q = arrondi(a / b, 6)
      texte = `On sait que $${a}\\div${b}\\approx${texNombre(q)}$.`
      const listeDeQuestions1 = [
        [`La valeur approchée par défaut de $${a}\\div${b}$ au dixième près est : `, arrondi(a / b - 0.05, 1)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au dixième près est : `, arrondi(a / b + 0.05, 1)],
        [`La valeur approchée par défaut de $${a}\\div${b}$ au centième près est : `, arrondi(a / b - 0.005, 2)],
        [`La troncature de $${a}\\div${b}$ au centième près est : `, arrondi(Math.floor(a / b * 100) / 100, 2)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au centième près est : `, arrondi(a / b + 0.005, 2)],
        [`La valeur approchée par défaut de $${a}\\div${b}$ au millième près est : `, arrondi(a / b - 0.0005, 3)],
        [`La troncature de $${a}\\div${b}$ au millième près est : `, arrondi(Math.round(a / b * 1000) / 1000, 3)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au millième près est : `, arrondi(a / b + 0.0005, 3)]
      ]
      const listeDeQuestions2 = [
        [`La valeur arrondie de $${a}\\div${b}$ au dixième près est : `, arrondi(a / b, 1)],
        [`La valeur arrondie de $${a}\\div${b}$ au centième près est : `, arrondi(a / b, 2)],
        [`La valeur arrondie de $${a}\\div${b}$ au millième près est : `, arrondi(a / b, 3)]
      ]

      texteCorr = `On sait que $${a}\\div${b}\\approx${texNombre(q)}$.`
      // Questions peuvent être défaut, excès ou excès, défaut ou troncature, excès ou excès, troncature
      const choix = randint(1, 4)
      switch (choix) {
        case 1:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[0][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i, listeDeQuestions1[0][1])
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[4][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i + 1, listeDeQuestions1[4][1])
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[0][0]} $ ${texNombre(listeDeQuestions1[0][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[4][0]} $ ${texNombre(listeDeQuestions1[4][1])}$`
          break
        case 2:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[1][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i, listeDeQuestions1[1][1])
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[5][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i + 1, listeDeQuestions1[5][1])
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[1][0]} $ ${texNombre(listeDeQuestions1[1][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[5][0]} $ ${texNombre(listeDeQuestions1[5][1])}$`
          break
        case 3:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[3][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i, listeDeQuestions1[3][1])
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i + 1, listeDeQuestions1[7][1])
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[3][0]} $ ${texNombre(listeDeQuestions1[3][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} $ ${texNombre(listeDeQuestions1[7][1])}$`
          break
        case 4:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[4][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i, listeDeQuestions1[4][1])
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 1, 'largeur10 inline') : '\\ldots'}`
          setReponse(this, 4 * i + 1, listeDeQuestions1[7][1])
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[4][0]} $ ${texNombre(listeDeQuestions1[4][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} $ ${texNombre(listeDeQuestions1[7][1])}$`
          break
      }
      shuffle(listeDeQuestions2)

      texte += `<br><br> ${numAlpha(2)} ${listeDeQuestions2[0][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 2, 'largeur10 inline') : '\\ldots'}`
      setReponse(this, 4 * i + 2, listeDeQuestions2[0][1])
      texte += `<br><br> ${numAlpha(3)} ${listeDeQuestions2[1][0]} ${this.interactif ? ajouteChampTexteMathLive(this, 4 * i + 3, 'largeur10 inline') : '\\ldots'}`
      setReponse(this, 4 * i + 3, listeDeQuestions2[1][1])

      texteCorr += `<br><br> ${numAlpha(2)} ${listeDeQuestions2[0][0]} $ ${texNombre(listeDeQuestions2[0][1])}$`
      texteCorr += `<br><br> ${numAlpha(3)} ${listeDeQuestions2[1][0]} $ ${texNombre(listeDeQuestions2[1][1])}$`

      if (this.questionJamaisPosee(i, a, b, q)) {
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
