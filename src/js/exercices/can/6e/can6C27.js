import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
import { randint, choice, prenomF, prenomM, texPrix, texNombre } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins" (nombres décimaux)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '23/07/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora & Jean-Claude Lhote
 * Référence can6C26
 * Date de publication 21/10/2021
*/
export default function PlusOuMoins2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, prenom1, prenom2, choix1, reponse1, reponse2, choix, prix1, prix2, choix2, m1, m2
    switch (choice([1, 1, 1, 2, 3, 3, 3])) {
      case 1://sandwich
        choix = choice(['a', 'b', 'c', 'd'])
        choix1 = choice([true, false])
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomM()
        }
        a = new Decimal(randint(71, 119, [80, 90, 100, 110])).div(10)
        b = new Decimal(choice([15, 25, 35, 45, 55, 65])).div(10)
        c = new Decimal(b).div(100)
        if (choix === 'a') {//prix1
          reponse1 = new Decimal(a).add(b)
          reponse2 = new Decimal(a).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner. ${prenom2} a payé le sien $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}.
                <br>Combien ${prenom2} a-t-elle payé son déjeuner ? `
          this.correction = `${prenom2} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom1}.<br>
        Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}+${texPrix(b)}$` : `$${texPrix(a)}-${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
        }
        if (choix === 'b') {//prix2
          reponse2 = new Decimal(a).add(b)
          reponse1 = new Decimal(a).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner soit $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que ${prenom2}.
                      <br>Combien ${prenom2} a-t-elle payé son déjeuner ? `
          this.correction = `${prenom1} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom2}.<br>
              ${prenom2} a donc payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de moins' : ' de plus '}.  Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}-${texPrix(b)}$` : `$${texPrix(a)}+${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €.`
        }
        if (choix === 'c') {//prix ensemble
          prix1 = new Decimal(a).add(b)
          prix2 = new Decimal(a).sub(b)
          reponse2 = new Decimal(a).mul(2).add(b)
          reponse1 = new Decimal(a).mul(2).sub(b)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
                      ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner soit $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}
                       que ${prenom2}.
                      <br>Combien ont-elles payé ensemble leur déjeuner ? `
          this.correction = `${prenom1} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} 
          que celui de ${prenom2}.<br>
              ${prenom2} a donc payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de moins' : ' de plus '}.  
              Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}-${texPrix(b)}$` : `$${texPrix(a)}+${texPrix(b)}$`}) €, 
              soit ${choix1 ? `$${texPrix(prix2)}$` : `$${texPrix(prix1)}$`} €.<br>
              Ensemble, elles ont donc payé : (${choix1 ? `$${texPrix(a)}+${texPrix(prix2)}$` : `$${texPrix(a)}+${texPrix(prix1)}$`}) €, 
              soit ${choix1 ? `$${texPrix(reponse1)}$` : `$${texPrix(reponse2)}$`} €. `
        }
        if (choix === 'd') {//prix ensemble
          prix1 = new Decimal(a).add(b)
          prix2 = new Decimal(a).sub(b)
          reponse2 = new Decimal(a).add(prix1)
          reponse1 = new Decimal(a).add(prix2)
          this.reponse = choix1 ? reponse2 : reponse1
          this.question = `${prenom1} et ${prenom2} sont allées acheter un déjeuner dans une sandwicherie.<br>
          ${prenom1} a payé $${texPrix(a)}$ € pour son déjeuner. ${prenom2} a payé le sien $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '}.
                      <br>Combien ont-elles payé ensemble leur déjeuner ? `
          this.correction = `${prenom2} a payé son déjeuner $${texPrix(b)}$ € ${choix1 ? 'de plus' : ' de moins '} que celui de ${prenom1}.<br>
          Elle l'a donc payé  (${choix1 ? `$${texPrix(a)}+${texPrix(b)}$` : `$${texPrix(a)}-${texPrix(b)}$`}) €, soit ${choix1 ? `$${texPrix(prix1)}$` : `$${texPrix(prix2)}$`} €. <br>
              Ensemble, elles ont donc payé : (${choix1 ? `$${texPrix(a)}+${texPrix(prix1)}$` : `$${texPrix(a)}+${texPrix(prix2)}$`}) €, 
              soit ${choix1 ? `$${texPrix(reponse2)}$` : `$${texPrix(reponse1)}$`} €. `
        }

        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }

        break

      case 2://taille
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
        } else {
          reponse1 = new Decimal(a).add(c)
          reponse2 = new Decimal(a).sub(c)
          this.reponse = choix1 ? reponse1 : reponse2
          this.question = `${prenom1} mesure $${texNombre(a, 2, true)}$ m. ${prenom2} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} 
                    que ${prenom1}. <br>
                    Quelle est la taille de ${prenom2} ?`
          this.correction = `${prenom2} mesure $${b}$ cm ${choix1 ? 'de plus' : ' de moins '} que ${prenom1} donc ${prenom2} mesure (${choix1 ? `$${texNombre(a, 2, true)}+${texNombre(c, 2, true)}$` : `$${texNombre(a, 2, true)}-${texNombre(c, 2, true)}$`}) m, soit  ${choix1 ? `$${texNombre(reponse1, 2, true)}$` : `$${texNombre(reponse2, 2, true)}$`} m. `
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' m' } }

        break

      case 3:// primeur
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
        if (choix === 'a') {//masse1
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
        }
        if (choix === 'b') {//masse2
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
        }
        if (choix === 'c') {//masse ensemble1
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
        }

        if (choix === 'd') {//masse ensemble2
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
        }

        if (this.interactif) { this.optionsChampTexte = { texteApres: ' kg' } }

        break
    }
  }
}
