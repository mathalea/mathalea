import Exercice from '../ClasseExercice.js'
import Operation from '../../modules/operations.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombre, arrondi } from '../../modules/outils.js'
export const amcReady = true

export const titre = 'Divisions décimales'

/**
 * Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient.
 *
 * Niveau de difficulté 1 :
 * * entier divisé par 4 quotient : xx,25 ou xx,75
 * * entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
 * * entier divisé par 6 quotient : xxx,5
 * * quotient xx,xx division par 2, 3 , 4 ou 5
 * * quotient x,xxx division par 6 à 9
 * * un 0 dans le quotient
 *
 * Niveau de difficulté 2 : division par 3, 7 ou 9
 * @Auteur Rémi Angot
 * Référence 6C31
 */
export default function Division_decimale () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Effectuer les divisions décimales suivantes et donner la valeur exacte de leur quotient.'
  this.spacing = 2
  sortieHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon opdiv n'est pas joli
  this.nbQuestions = 4
  this.sup = 1
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.qcm = ['6C31', [], 'Divisions décimales', 4]
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let type_de_questions_disponibles

    this.sup == 1
      ? (type_de_questions_disponibles = [choice([1, 2, 3]), 4, 5, 6])
      : (type_de_questions_disponibles = [7, 8, 9])
    const liste_type_de_questions = combinaisonListes(
      type_de_questions_disponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let type_de_questions
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, q;
      i < this.nbQuestions && cpt < 50;

    ) {
      type_de_questions = liste_type_de_questions[i]
      switch (type_de_questions) {
        case 1: // entier divisé par 4 quotient : xx,25 ou xx,75
          b = 4
          a = (randint(2, 9) * 10 + randint(2, 9)) * 4 + choice([1, 3])
          q = calcul(a / b)
          break
        case 2: // entier divisé par 8 quotient : x,125 ou x,375 ou x,625 ou x,875
          b = 8
          a = randint(2, 9) * 8 + choice([1, 3, 5, 7])
          q = calcul(a / b)
          break
        case 3: // entier divisé par 6 quotient : xxx,5
          b = 6
          q = calcul(
            randint(2, 9) * 100 + randint(2, 9) * 10 + randint(2, 9) + 0.5
          )
          a = q * 6
          break
        case 4: // quotient xx,xx division par 2, 3 , 4 ou 5
          q = calcul(
            randint(2, 5) * 10 +
            randint(2, 5) +
            randint(2, 5) / 10 +
            randint(2, 5) / 100
          )
          b = randint(2, 5)
          a = calcul(b * q)
          break
        case 5: // quotient x,xxx division par 6 à 9
          q = calcul(
            randint(6, 9) +
            randint(5, 9) / 10 +
            randint(6, 9) / 100 +
            randint(6, 9) / 1000
          )
          b = randint(6, 9)
          a = calcul(b * q)
          break
        case 6: // un 0 dans le quotient
          if (randint(1, 2) == 1) {
            // x0x,x
            q = calcul(
              randint(2, 9) * 100 + randint(2, 9) + randint(2, 9) / 10
            )
          } else {
            // xx0,x
            q = calcul(
              randint(2, 9) * 100 + randint(2, 9) * 10 + randint(2, 9) / 10
            )
          }
          b = randint(7, 9)
          a = calcul(b * q)
          break
        case 7: // division par 7
          a = randint(2, 9) * 7 + randint(1, 6)
          b = 7
          q = arrondi(a / b, 3)
          break
        case 8: // division par 9
          a = calcul((randint(11, 19) * 9) / 10 + randint(1, 8) / 10)
          b = 9
          q = arrondi(a / b, 3)
          break
        case 9: // division par 3
          a = calcul((randint(11, 99) * 3) / 100 + randint(1, 2) / 100)
          b = 3
          q = arrondi(a / b, 3)
      }
      if (this.sup == 2) {
        this.consigne =
          'Effectuer les divisions décimales suivantes et donner une valeur approchée de leur quotient au millième près.'
      }
      texte = `$${texNombre(a)}\\div${b}$`
      if (this.sup == 1) {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'division', precision: 3 })
        texteCorr += `<br>$${texNombre(a)}\\div${b}=${texNombre(q)}$`
      } else {
        texteCorr = Operation({ operande1: a, operande2: b, type: 'division', precision: 3 })
        texteCorr += `<br>$${texNombre(a)}\\div${b}\\approx${texNombre(q)}$`
      }

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        this.qcm[1].push([texte, [texteCorr, q], { digits: 0, decimals: 0, signe: false, exposant_nb_chiffres: 0, exposant_signe: false, approx: 0 }])
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = [
    'Type de questions',
    2,
    '1 : Déterminer le quotient exact\n2: Déterminer un quotient approché au millième près'
  ]
}
