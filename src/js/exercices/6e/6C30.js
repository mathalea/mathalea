/* eslint-disable camelcase */
import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, texNombre } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
export const amcReady = true
export const amcType = 4 // type de question AMC

export const titre = 'Multiplications posées de nombres décimaux'

/**
 * Multiplication de deux nombres décimaux
 *
 * * xxx * xx,x chiffres inférieurs à 5
 * * xx,x * x,x
 * * x,xx * x0x
 * * 0,xx * x,x
 * @Auteur Rémi Angot
 * Référence 6C30
 */
export default function Multiplier_decimaux () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.spacing = 2
  this.spacingCorr = 1 // Important sinon le calcul posé ne fonctionne pas avec opmul et spacing
  this.nbQuestions = 4
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.qcm = ['6C30', [], 'Multiplications posées de nombres décimaux', 4]
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const type_de_questions_disponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let type_de_questions, reponse
    for (let i = 0, texte, texteCorr, cpt = 0, a, b; i < this.nbQuestions && cpt < 50;) {
      type_de_questions = listeTypeDeQuestions[i]
      switch (type_de_questions) {
        case 1: // xxx * xx,x chiffres inférieurs à 5
          a = randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5)
          b = calcul(randint(2, 5) * 10 + randint(2, 5) + randint(2, 5) / 10)
          break
        case 2: // xx,x * x,x
          a = calcul(randint(2, 9) * 10 + randint(2, 9) + randint(2, 9) / 10)
          b = calcul(randint(6, 9) + randint(6, 9) / 10)
          break
        case 3: // x,xx * x0x
          a = calcul(randint(2, 9) + randint(2, 9) / 10 + randint(2, 9) / 100)
          b = calcul(randint(2, 9) * 100 + randint(2, 9))
          break
        case 4: // 0,xx * x,x
          a = calcul(randint(2, 9) / 10 + randint(2, 9) / 100)
          b = calcul(randint(2, 9) + randint(2, 9) / 10)
          break
      }

      texte = `$${texNombre(a)}\\times${texNombre(b)}$`
      reponse = calcul(a * b)
      texteCorr = Operation({ operande1: a, operande2: b, type: 'multiplication' })

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        // Pour AMC
        this.qcm[1].push([texte, [texteCorr, reponse], { digits: 0, decimals: 0, signe: false, exposant_nb_chiffres: 0, exposant_signe: false, approx: 0 }])
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
