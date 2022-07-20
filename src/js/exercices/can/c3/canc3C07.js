import Decimal from 'decimal.js'
import { choice, randint, prenomF, prenomM, texNombre, texPrix } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins"'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '20/07/2022'

/*!
 * @author Gilles Mora
 * Référence canc3C07
 */
export default function PlusOuMoins () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let choix, a, b, c, prenom1, prenom2, choix1, reponse1, reponse2
    switch (choice([1, 2, 3, 4, 5, 6])) { //
      case 1:
        choix1 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomM()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(130, 160)).div(100)
        b = randint(2, 15)
        c = new Decimal(b).div(100)
        reponse1 = new Decimal(a).add(c)
        reponse2 = new Decimal(a).sub(c)
        this.reponse = choix1 ? reponse2 : reponse1
        this.question = `${prenom1} mesure $${texNombre(a, 2, true)}$ m. Il mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} 
            que ${prenom2}. <br>
            Quelle est la taille de ${prenom2} ?`
        this.correction = `${prenom1} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2} mesure $${b}$ cm ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
            Il mesure donc  (${choix1 ? `$${texNombre(a, 2, true)}-${texNombre(c, 2, true)}$` : `$${texNombre(a, 2, true)}+${texNombre(c, 2, true)}$`}) m, soit  ${choix1 ? `$${texNombre(reponse2, 2, true)}$` : `$${texNombre(reponse1, 2, true)}$`} m. `
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' m' } }

        break

      case 2:
        choix = choice(['b'])
        if (choix === 'a') {
          choix1 = choice([true, false])
          prenom1 = prenomM()
          prenom2 = prenomF()

          a = randint(12, 20)
          b = randint(2, 8)

          reponse1 = a + b
          reponse2 = a - b
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} 
                que ${prenom2}. <br>
                Quel est l'âge de ${prenom2} ?`
          this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }
        if (choix === 'b') {
          choix1 = choice([true, false])
          prenom1 = prenomM()

          a = randint(12, 20)
          b = randint(2, 8)

          reponse1 = a + b
          reponse2 = a - b
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} a $${a}$ ans. Il a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} 
                  que sa soeur. <br>
                  Quel est l'âge de sa soeur ?`
          this.correction = `${prenom1} a $${b}$ ans ${choix1 ? 'de plus' : ' de moins '} que sa soeur donc sa soeur a $${b}$ années ${choix1 ? 'de moins' : ' de plus '} que son frère.<br>
                  Elle a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) ans, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} ans. `
          if (this.interactif) { this.optionsChampTexte = { texteApres: ' ans' } }
        }
        break

      case 3:

        choix1 = choice([true, false])
        prenom1 = prenomF()
        prenom2 = prenomM()

        a = randint(35, 60)
        b = randint(9, 21, [10, 20])

        reponse1 = a + b
        reponse2 = a - b
        this.reponse = choix1 ? reponse2 : reponse1
        this.question = `${prenom1} a $${a}$ billes. Elle en  a $${b}$ ${choix1 ? 'de plus' : ' de moins '} 
                    que ${prenom2}. <br>
                    Combien ${prenom2} a-t-il de billes ?`
        this.correction = `${prenom1} a $${b}$ billes ${choix1 ? 'de plus' : ' de moins '} que ${prenom2} donc ${prenom2}  a $${b}$ billes ${choix1 ? 'de moins' : ' de plus '} que ${prenom1}.<br>
                    Il a donc  (${choix1 ? `$${a}-${b}$` : `$${a}+${b}$`}) billes, soit  ${choix1 ? `$${a - b}$` : `$${a + b}$`} billes. `
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' billes' } }

        break

      case 4:

        choix1 = choice([true, false])
        prenom1 = prenomM()
        prenom2 = prenomF()

        a = randint(18, 30)
        b = randint(4, 12, [10])

        reponse1 = 2 * a - b
        reponse2 = 2 * a + b
        this.reponse = choix1 ? reponse2 : reponse1
        this.question = `${prenom1} a $${a}$ billes. ${prenom2} en a $${b}$ ${choix1 ? 'de plus' : ' de moins '}.
                        <br>
                        Combien en ont-il à eux deux ?`
        this.correction = `${prenom2} a $${b}$ ${choix1 ? 'de plus' : ' de moins '} que ${prenom1}. Elle en a donc (${choix1 ? `$${a}+${b}$` : `$${a}-${b}$`}), soit ${choix1 ? `$${a + b}$` : `$${a - b}$`}.<br>
            Ensemble, ils ont donc (${choix1 ? `$${a + b}+${a}$` : `$${a - b}+${a}$`}) billes, soit ${choix1 ? `$${2 * a + b}$` : `$${2 * a - b}$`} billes.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' billes' } }

        break

      case 5:
        choix1 = choice([true, false])
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(71, 119, [80, 90, 100, 110])).div(10)
        b = new Decimal(choice([15, 25, 35, 45, 55, 65])).div(10)
        c = new Decimal(b).div(100)
        reponse1 = new Decimal(a).add(b)
        reponse2 = new Decimal(a).sub(b)
        this.reponse = choix1 ? reponse1 : reponse2
        this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner. ${prenom2} a payé le sien $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}.
                <br>Combien ${prenom2} a-t-elle payé son déjeuner ? `
        this.correction = `${prenom2} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom1}.<br>
        Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}+${texPrix(b)}$` : `$${texPrix(a)}-${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }

        break

      case 6:
        choix1 = choice([true, false])
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(71, 119, [80, 90, 100, 110])).div(10)
        b = new Decimal(choice([15, 25, 35, 45, 55, 65])).div(10)
        c = new Decimal(b).div(100)
        reponse2 = new Decimal(a).add(b)
        reponse1 = new Decimal(a).sub(b)
        this.reponse = choix1 ? reponse1 : reponse2
        this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                    ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner soit $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.
                    <br>Combien ${prenom2} a-t-elle payé son déjeuner ? `
        this.correction = `${prenom1} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom2}.<br>
            ${prenom2} a donc payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de moins' : ' de plus '}.  Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}-${texPrix(b)}$` : `$${texPrix(a)}+${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }

        break
    }
  }
}
