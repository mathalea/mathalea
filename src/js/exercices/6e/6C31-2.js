import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, choice, shuffle, texNombre, numAlpha } from '../../modules/outils.js'
export const titre = 'Donner des valeurs approchées d’un quotient décimal'

/**
 * Donner des valeurs approchées d'un quotient décimale.
 *
 *
 * @Auteur Rémi Angot
 * Référence 6C31-2
 * 2020-12-07
 */
export default function ValeurApprocheeDivisionDecimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Compléter les phrases suivantes.'
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Une fraction irréductible avec un dénominateur qui comporte un facteur différent de 2 ou de 5
      // aura une écriture décimale périodique infinie
      const k1 = choice([3, 7, 11, 13])
      const k2 = choice([3, 7, 11, 13], k1)
      const a = choice([3, 5, 7, 11, 13], [k1, k2]) * choice([3, 5, 7, 11, 13], [k1, k2])
      const b = k1 * k2
      const q = Math.round(a / b, 6)
      texte = `On sait que $${a}\\div${b}\\approx${texNombre(q)}$.`
      const listeDeQuestions1 = [
        [`La valeur approchée par défaut de $${a}\\div${b}$ au dixième près est : `, Math.floor(a / b, 1)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au dixième près est : `, Math.ceil(a / b, 1)],
        [`La valeur approchée par défaut de $${a}\\div${b}$ au centième près est : `, Math.floor(a / b, 2)],
        [`La troncature de $${a}\\div${b}$ au centième près est : `, Math.floor(a / b, 2)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au centième près est : `, Math.ceil(a / b, 2)],
        [`La valeur approchée par défaut de $${a}\\div${b}$ au millième près est : `, Math.floor(a / b, 3)],
        [`La troncature de $${a}\\div${b}$ au millième près est : `, Math.floor(a / b, 3)],
        [`La valeur approchée par excès de $${a}\\div${b}$ au millième près est : `, Math.ceil(a / b, 3)]
      ]
      const listeDeQuestions2 = [
        [`La valeur approchée de $${a}\\div${b}$ au dixième près est : `, Math.round(a / b, 1)],
        [`La valeur approchée de $${a}\\div${b}$ au centième près est : `, Math.round(a / b, 2)],
        [`La valeur approchée de $${a}\\div${b}$ au millième près est : `, Math.round(a / b, 3)]
      ]

      texteCorr = `On sait que $${a}\\div${b}\\approx${texNombre(q)}$.`
      // Questions peuvent être défaut, excès ou excès, défaut ou troncature, excès ou excès, troncature
      const choix = randint(1, 4)
      switch (choix) {
        case 1:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[0][0]}\\ldots`
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[4][0]}\\ldots`
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[0][0]} $ ${texNombre(listeDeQuestions1[0][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[4][0]} $ ${texNombre(listeDeQuestions1[4][1])}$`
          break
        case 2:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[1][0]}\\ldots`
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[5][0]}\\ldots`
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[1][0]} $ ${texNombre(listeDeQuestions1[1][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[5][0]} $ ${texNombre(listeDeQuestions1[5][1])}$`
          break
        case 3:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[3][0]}\\ldots`
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]}\\ldots`
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[3][0]} $ ${texNombre(listeDeQuestions1[3][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} $ ${texNombre(listeDeQuestions1[7][1])}$`
          break
        case 4:
          texte += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[4][0]}\\ldots`
          texte += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]}\\ldots`
          texteCorr += `<br><br> ${numAlpha(0)} ${listeDeQuestions1[4][0]} $ ${texNombre(listeDeQuestions1[4][1])}$`
          texteCorr += `<br><br> ${numAlpha(1)} ${listeDeQuestions1[7][0]} $ ${texNombre(listeDeQuestions1[7][1])}$`
          break
      }
      shuffle(listeDeQuestions2)

      texte += `<br><br> ${numAlpha(2)} ${listeDeQuestions2[0][0]}\\ldots`
      texte += `<br><br> ${numAlpha(3)} ${listeDeQuestions2[1][0]}\\ldots`

      texteCorr += `<br><br> ${numAlpha(2)} ${listeDeQuestions2[0][0]} $ ${texNombre(listeDeQuestions2[0][1])}$`
      texteCorr += `<br><br> ${numAlpha(3)} ${listeDeQuestions2[1][0]} $ ${texNombre(listeDeQuestions2[1][1])}$`

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
}
