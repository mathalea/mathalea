import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, prenomF, texPrix } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème de rendu de monnaie'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '25/07/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora & Jean-Claude Lhote
 *
 * Date de publication 21/10/2021
*/
export default function RenduMonnaie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeviennoiserie = [
      ['pains au chocolat', ' un pain au chocolat'],
      ['chocolatines', 'une chocolatine'], ['pains aux raisins', 'un pain aux raisins'], ['cookies', 'un cookie'], ['brioches', 'une brioche']]
    let a, b, e, prenom1, v, p, pu, t, reponse, nbre

    switch (choice([1, 2, 3, 4])) {
      case 1:
        a = randint(1, 3) * 10
        e = randint(1, 4)
        b = a + 2 * e
        this.reponse = 50 - a
        this.question = `Un livre coûte $${texPrix(b)}$ €. Je donne un billet de $50$  € et $${e}$ ${e > 1 ? 'pièces' : 'pièce'} de $2$  €. <br>
Combien me rend-on ?`
        this.correction = `On doit me rendre $${50 + 2 * e}-${b}=${this.reponse}$ €.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        break

      case 2:
        a = randint(1, 6) + (randint(1, 9)) / 10
        this.reponse = 10 - a
        this.question = `Chez le boulanger, je dois payer  $${texPrix(a)}$ €. <br>
        Je donne un billet de $10$  €. <br>
Combien me rend-on ?`
        this.correction = `On doit me rendre $10-${texNombre(a)}=${texNombre(10 - a)}$ €.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        break

      case 3:
        a = randint(2, 6)
        v = choice(listeviennoiserie)
        p = v[0]
        t = choice([10, 20])
        prenom1 = prenomF()
        pu = new Decimal(choice([9, 11, 12, 13, 14, 15, 16])).div(10)
        reponse = new Decimal(pu).mul(a).mul(-1).add(t)
        this.question = `A la boulangerie, ${prenom1} achète $${a}$ ${p} à $${texPrix(pu)}$ € l'unité.<br>
   Elle paie avec un billet de $${t}$ €.<br>
   Combien doit-on lui rendre ?`

        this.correction = `${prenom1} achète $${a}$ ${p} à $${texPrix(pu)}$ € l'unité.<br>
  Le coût est donc $${a}\\times ${texPrix(pu)} =${texPrix(a * pu)}$ €.<br>
  On doit lui rendre : $${t}-${texPrix(a * pu)}=${texPrix(reponse)}$ €.
 `
        this.reponse = reponse
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        break

      case 4:
        a = randint(5, 9)
        nbre = randint(3, 6)
        prenom1 = prenomF()
        this.reponse = nbre
        if (a * nbre < 35) {
          this.question = `${prenom1} a acheté des mangas coûtant $${a}$ € chacun. Elle a donné $40$ € au vendeur
            qui lui a rendu $${40 - a * nbre}$ €.<br>
            Combien de mangas ${prenom1} a-t-elle achetés ?  `

          this.correction = `On lui a rendu $${40 - a * nbre}$ €, donc les mangas ont coûté $40-${40 - a * nbre}$ € soit $${a * nbre}$ .<br>
         Le prix d'un manga est  $${a}$ €, donc  le nomre de  mangas est  donné par $${a * nbre}\\div ${a}=${nbre}$.`
        } else {
          this.question = `${prenom1} a acheté des mangas coûtant $${a}$ € chacun. Elle a donné $60$ € au vendeur
              qui lui a rendu $${60 - a * nbre}$ €.<br>
              Combien de mangas ${prenom1} a-t-elle achetés ?  `

          this.correction = `On lui a rendu $${60 - a * nbre}$ €, donc les mangas ont coûté $60-${60 - a * nbre}$ € soit $${a * nbre}$ € .<br>
          Le prix d'un manga est  $${a}$ €, donc  le nomre de  mangas est  donné par $${a * nbre}\\div ${a}=${nbre}$.`
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' mangas' } }
        break
    }
  }
}
