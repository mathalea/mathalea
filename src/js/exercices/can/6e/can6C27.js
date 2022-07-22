import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js'
import { randint, choice, texNombrec, prenomF, prenomM, texPrix, texNombre, calcul } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème avec "de plus", "de moins" (nombres décimaux)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '21/07/2022'
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
    let a, b, c, e, prenom1, prenom2, choix1, reponse1, reponse2
    switch (choice([1])) {
      case 1:
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

      case 2:
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

      case 3:
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

      case 4://  boîte d'oeufs
        a = randint(40, 80, [42, 48, 54, 60, 66, 72, 78])
        this.reponse = Math.ceil(a / 6)
        this.question = `Combien de boîtes de 6 oeufs faut-il pour ranger $${a}$ oeufs ?`
        this.correction = `$${a}=6\\times${Math.floor(a / 6)} + ${a - 6 * Math.floor(a / 6)}$.<br>
                         Il en faut  donc  : $${Math.floor(a / 6)} +1=${Math.floor(a / 6) + 1}$.`
        break

      case 5://  brouette
        a = randint(12, 22) * 10
        if (a / 20 % 1 !== 0) {
          this.reponse = Math.ceil(a / 20)
          this.question = `${prenomM()} a $${a}$ kg de gravats à déplacer avec sa brouette.<br> Dans celle-ci, il met $20$ kg de gravats.<br>
              Combien de brouettes faudra-t-il pour déplacer tous les gravats? `
          this.correction = `$${a}=20\\times${Math.floor(a / 20)} + ${a - 20 * Math.floor(a / 20)}$.<br>
              Il faudra donc $${Math.floor(a / 20)}+1$ brouettes pour déplacer tous les gravats.`
        } else {
          this.reponse = Math.floor(a / 20)
          this.question = `${prenomM()} a $${a}$ kg de gravats à déplacer avec sa brouette.<br> Dans celle-ci, il met $20$ kg de gravats.<br>
              Combien de brouettes faudra-t-il pour déplacer tous les gravats? `
          this.correction = `$${a}=20\\times${Math.floor(a / 20)} + ${a - 20 * Math.floor(a / 20)}$.<br>
              Il faudra donc $${Math.floor(a / 20)}$ brouettes pour déplacer tous les gravats.`
        }
        break

      case 6://  rendu de monnaie1
        a = randint(1, 3) * 10
        e = randint(1, 4)
        b = a + 2 * e
        this.reponse = 50 - a
        this.question = `Un livre coûte ${texPrix(b)} €. Je donne un billet de $50$  € et ${e} ${e > 1 ? 'pièces' : 'pièce'} de 2  €. <br>
Combien me rend-on ?`
        this.correction = `On doit me rendre $${calcul(50 + 2 * e)}-${b}=${this.reponse}$ €.`
        break

      case 7://  rendu de monnaie2
        a = randint(1, 6) + (randint(1, 9)) / 10
        this.reponse = 10 - a
        this.question = `Chez le boulanger, je dois payer  $${texPrix(a)}$ €. <br>
        Je donne un billet de $10$  €. <br>
Combien me rend-on ?`
        this.correction = `On doit me rendre $10-${texNombrec(a)}=${texNombrec(10 - a)}$ €.`
        break
      case 8:// partage
        b = randint(4, 7)
        a = randint(8, 11, 10) * b
        this.reponse = a / b
        this.question = `  ${prenomF()} veut partager $${a}$ billes équitablement en $${b}$ enfants. Combien chacun aura-t-il de billes ? <br>`
        this.correction = `Chaque enfant aura  $${a}\\div ${b}=${texNombrec(a / b)}$ billes.`
        break
    }
  }
}
