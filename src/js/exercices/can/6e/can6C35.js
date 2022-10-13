import Decimal from 'decimal.js/decimal.mjs'
import { choice } from '../../../modules/outils/arrays.js'
import { randint } from '../../../modules/outils/entiers.js'
import { prenomF, prenomM } from '../../../modules/outils/objetsPersonnes.js'
import { texNombre, texPrix } from '../../../modules/outils/texNombres.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins"'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '27/07/2022'

/*!
 * @author Gilles Mora
 *
 */
export const uuid = '95dd2'
export const ref = 'can6C35'
export default function PlusOuMoins6ieme () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, prenom1, prenom2, choix1, reponse1, reponse2, choix, prix1, prix2, choix2, m1, m2
    switch (choice([1, 1, 1, 2, 3, 3, 3])) {
      case 1:
        choix = choice(['a', 'b', 'c', 'd'])//
        choix1 = choice([true, false])
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(71, 119, [80, 90, 100, 110])).div(10)
        b = new Decimal(choice([15, 25, 35, 45, 55, 65])).div(10)
        c = new Decimal(b).div(100)
        if (choix === 'a') {
          reponse1 = new Decimal(a).add(b)
          reponse2 = new Decimal(a).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner. ${prenom2} a payé le sien $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}.<br>
                
                Combien ${prenom2} a-t-elle payé son déjeuner ? `
          this.correction = `${prenom2} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom1}.<br>
        Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}+${texPrix(b)}$` : `$${texPrix(a)}-${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ €'
        }
        if (choix === 'b') {
          reponse2 = new Decimal(a).add(b)
          reponse1 = new Decimal(a).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner soit $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}. <br>
                     
                      Combien ${prenom2} a-t-elle payé son déjeuner ? `
          this.correction = `${prenom1} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom2}.<br>
              ${prenom2} a donc payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de moins' : ' de plus '}.  Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}-${texPrix(b)}$` : `$${texPrix(a)}+${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ €'
        }
        if (choix === 'c') {
          prix1 = new Decimal(a).add(b)
          prix2 = new Decimal(a).sub(b)
          reponse2 = new Decimal(a).mul(2).add(b)
          reponse1 = new Decimal(a).mul(2).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner soit $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}
                       que ${prenom2}.<br>
                      
                      Combien ont-elles payé ensemble leur déjeuner ? `
          this.correction = `${prenom1} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}
          que celui de ${prenom2}.<br>
              ${prenom2} a donc payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de moins' : ' de plus '}.
              Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}-${texPrix(b)}$` : `$${texPrix(a)}+${texPrix(b)}$`}) €,
              soit ${choix1 ? `$${texPrix(prix2)}$` : `$${texPrix(prix1)}$`} €.<br>
              Ensemble, elles ont donc payé : (${choix1 ? `$${texPrix(a)}+${texPrix(prix2)}$` : `$${texPrix(a)}+${texPrix(prix1)}$`}) €,
              soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €. `
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ €'
        }
        if (choix === 'd') {
          prix1 = new Decimal(a).add(b)
          prix2 = new Decimal(a).sub(b)
          reponse2 = new Decimal(a).add(prix1)
          reponse1 = new Decimal(a).add(prix2)
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
          ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner. ${prenom2} a payé le sien $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}.<br>
                      
          Combien ont-elles payé ensemble leur déjeuner ? `
          this.correction = `${prenom2} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom1}.<br>
          Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}+${texPrix(b)}$` : `$${texPrix(a)}-${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(prix1)}$` : `$${texPrix(prix2)}$`} €. <br>
              Ensemble, elles ont donc payé : (${choix1 ? `$${texPrix(a)}+${texPrix(prix1)}$` : `$${texPrix(a)}+${texPrix(prix2)}$`}) €,
              soit ${choix1 ? `$${texPrix(reponse2)}$` : `$${texPrix(reponse1)}$`} €. `
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ €'
        }

        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }

        break

      case 2:
        choix1 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomM()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(130, 160)).div(100)
        b = randint(2, 15)
        c = new Decimal(b).div(100)
        if (choice([true, false])) {
          reponse1 = new Decimal(a).add(c)
          reponse2 = new Decimal(a).sub(c)
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} mesure $${texNombre(a, 2, true)}$ m. Il mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '}
              que ${prenom2}. <br>

              Quelle est la taille de ${prenom2} ?`
          this.correction = `${prenom1} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2} mesure $${b}$ cm ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
              Il mesure donc  (${choix1 ? `$${texNombre(a, 2, true)}-${texNombre(c, 2, true)}$` : `$${texNombre(a, 2, true)}+${texNombre(c, 2, true)}$`}) m, soit  ${choix1 ? `$${texNombre(reponse2, 2, true)}$` : `$${texNombre(reponse1, 2, true)}$`} m. `
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ m'
        } else {
          reponse1 = new Decimal(a).add(c)
          reponse2 = new Decimal(a).sub(c)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} mesure $${texNombre(a, 2, true)}$ m. ${prenom2} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '}
                    que ${prenom1}. <br>
                    Quelle est la taille de ${prenom2} ?`
          this.correction = `${prenom2} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} que ${prenom1} donc ${prenom2} mesure (${choix1 ? `$${texNombre(a, 2, true)}+${texNombre(c, 2, true)}$` : `$${texNombre(a, 2, true)}-${texNombre(c, 2, true)}$`}) m, soit  ${choix1 ? `$${texNombre(reponse1, 2, true)}$` : `$${texNombre(reponse2, 2, true)}$`} m. `
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ m'
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' m' } }

        break

      case 3:
        choix = choice(['a', 'b', 'c', 'd'])//, 'b', 'c', 'd'
        choix1 = choice([true, false])
        choix2 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomM()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = (new Decimal(randint(1, 5) * 10 + randint(1, 10))).div(10)
        b = randint(1, 9) * 100
        c = (new Decimal(b)).div(1000)
        if (choix === 'a') {
          reponse1 = (new Decimal(a)).add(c)
          reponse2 = (new Decimal(a)).sub(c)
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `Chez le primeur, ${prenom1} a acheté  $${texNombre(a, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
            Il en a acheté $${b}$ g ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.<br>

            Quelle masse de ${choix2 ? 'fruits' : ' légumes '} a acheté ${prenom2} ?`
          this.correction = `${prenom1} a acheté $${b}$ g de ${choix2 ? 'fruits' : ' légumes '}  ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}, donc ${prenom2} en a acheté $${b}$ g ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
            Or $${b}$ g $=${texNombre(c, 1)}$ kg. <br>
            ${prenom2} a donc acheté $(${choix1 ? `${texNombre(a, 1)}-${texNombre(c, 1)}` : `${texNombre(a, 1)}+${texNombre(c, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(reponse2, 1)}` : `${texNombre(reponse1, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ kg'
        }
        if (choix === 'b') {
          reponse1 = (new Decimal(a)).add(c)
          reponse2 = (new Decimal(a)).sub(c)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `Chez le primeur, ${prenom1} a acheté  $${texNombre(a, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
          ${prenom2} en a acheté $${b}$ g ${choix1 ? 'de plus' : ' de moins '}.<br>

            Quelle masse de ${choix2 ? 'fruits' : ' légumes '} a acheté ${prenom2} ?`
          this.correction = `$${b}$ g $=${texNombre(c, 1)}$ kg. <br>
          ${prenom2} a acheté $${texNombre(c, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}  ${choix1 ? 'de plus' : ' de moins '} que ${prenom1},
          donc ${prenom2} en a acheté  $(${choix1 ? `${texNombre(a, 1)}+${texNombre(c, 1)}` : `${texNombre(a, 1)}-${texNombre(c, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(reponse1, 1)}` : `${texNombre(reponse2, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ kg'
        }
        if (choix === 'c') {
          m1 = (new Decimal(a)).add(c)
          m2 = (new Decimal(a)).sub(c)
          reponse1 = (new Decimal(m1)).add(a)
          reponse2 = (new Decimal(m2)).add(a)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `Chez le primeur, ${prenom1} a acheté  $${texNombre(a, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
          ${prenom2} en a acheté $${b}$ g ${choix1 ? 'de plus' : ' de moins '}.<br>

            Quelle masse de ${choix2 ? 'fruits' : ' légumes '} ont-ils acheté ensemble ?`
          this.correction = `$${b}$ g $=${texNombre(c, 1)}$ kg. <br>
          ${prenom2} a acheté $${texNombre(c, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}  ${choix1 ? 'de plus' : ' de moins '} que ${prenom1},
          donc ${prenom2} en a acheté  $(${choix1 ? `${texNombre(a, 1)}+${texNombre(c, 1)}` : `${texNombre(a, 1)}-${texNombre(c, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(m1, 1)}` : `${texNombre(m2, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
            Ensemble, ils ont donc acheté :  $(${choix1 ? `${texNombre(a, 1)}+${texNombre(m1, 1)}` : `${texNombre(a, 1)}+${texNombre(m2, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(reponse1, 1)}` : `${texNombre(reponse2, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ kg'
        }

        if (choix === 'd') {
          m1 = (new Decimal(a)).add(c)
          m2 = (new Decimal(a)).sub(c)
          reponse1 = (new Decimal(m1)).add(a)
          reponse2 = (new Decimal(m2)).add(a)
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `Chez le primeur, ${prenom1} a acheté  $${texNombre(a, 1)}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
          Il en a acheté $${b}$ g ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.<br>

          Quelle masse de ${choix2 ? 'fruits' : ' légumes '} ont-ils acheté ensemble ?`
          this.correction = `${prenom1} a acheté $${b}$ g  ${choix2 ? 'fruits' : ' légumes '} de ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}, donc ${prenom2} en a acheté $${b}$ g ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
            Or $${b}$ g $=${texNombre(c, 1)}$ kg. <br>
            ${prenom2} a donc acheté $(${choix1 ? `${texNombre(a, 1)}-${texNombre(c, 1)}` : `${texNombre(a, 1)}+${texNombre(c, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(m2, 1)}` : `${texNombre(m1, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.<br>
            Ensemble, ils ont donc acheté :  $(${choix1 ? `${texNombre(a, 1)}+${texNombre(m2, 1)}` : `${texNombre(a, 1)}+${texNombre(m1, 1)}`})$ kg
            soit $${choix1 ? `${texNombre(reponse2, 1)}` : `${texNombre(reponse1, 1)}`}$ kg de ${choix2 ? 'fruits' : ' légumes '}.`
          this.canEnonce = this.question
          this.canReponseACompleter = '$\\dots$ kg'
        }

        if (this.interactif) { this.optionsChampTexte = { texteApres: ' kg' } }

        break
    }
  }
}
