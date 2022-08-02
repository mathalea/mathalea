import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, prenomF, prenomM } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème de partage*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '01/08/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can6C36
//  * Date de publication 01/08/2022
*/
export default function PetitsProblemePartage2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const listeProportion1 = [['au quart du', 4], [' au tiers du', 3], ['à la moitié du', 2], ['au cinquième du', 5], ['à la moitié du', 2]]
    const listeProportion2 = [['au double du', 2], ['au triple du', 3], ['au triple du ', 3], ['quatre fois le ', 4], ['cinq fois le ', 5]]
    let a, b, c, nbre1, nbre2, nbre, prenom1, choix, proportion
    switch (choice([1, 2, 3])) {
      case 1:
        a = randint(6, 10) * 10
        nbre = randint(2, 4)
        b = new Decimal(randint(5, 12) * 10 + 5).div(10)
        c = new Decimal(b).mul(nbre)
        this.reponse = new Decimal(a).sub(c)
        this.question = `  Un électricien dispose d’un rouleau de fil électrique de $${a}$ m. Il découpe $${nbre}$
      morceaux de fil de ce rouleau de $${texNombre(b, 2, true)}$ m chacun.<br>
      Quelle longueur de fil électrique reste-t-il dans le rouleau ?`
        this.correction = `Les $${nbre}$  morceaux de fil ont une longueur de $${nbre}\\times ${texNombre(b, 2, true)}$, soit $${texNombre(c, 2)}$ m.<br>
      Il reste alors : $${a}-${texNombre(c, 2)}=${texNombre(this.reponse, 2)}$ m.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' m' } }

        break

      case 2:
        choix = choice([true, false])
        prenom1 = prenomF()
        a = randint(2, 5)
        nbre1 = choice([10, 20, 25])
        nbre2 = new Decimal(choice([10, 20, 25])).div(100)

        this.reponse = choix ? `${new Decimal(a).div(nbre2)}` : `${new Decimal(a).mul(100).div(nbre1)}`
        this.question = `  Pour son anniversaire, ${prenom1} a acheté $${a}$ litres de jus de fruits.<br>
         Les verres de  ${prenom1} contiennent ${choix ? `$${texNombre(nbre2, 2, true)}$ litre` : `$${texNombre(nbre1, 2, true)}$ centilitres`}.<br>
            Combien de verres de jus de fruits ${prenom1} pourra-t-elle servir ? `
        this.correction = `Dans un litre, il y a ${choix ? `$${texNombre(1 / nbre2, 0, true)}\\times ${texNombre(nbre2, 2, true)}$ litre ` : `$${texNombre(100 / nbre1, 0, true)}\\times ${texNombre(nbre1, 0, true)}$ centilitres`}.<br>
        Dans $${a}$ litres, il y a donc ${choix ? `$${texNombre(a / nbre2, 0, true)}\\times ${texNombre(nbre2, 2, true)}$ litre ` : `$${texNombre(100 * a / nbre1, 0, true)}\\times ${texNombre(nbre1, 0, true)}$ centilitres`}.<br>
        Elle pourra donc servir ${choix ? `$${texNombre(a / nbre2, 0, true)}$` : `$${texNombre(100 * a / nbre1, 0, true)}$`} verres.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' verres' } }

        break
      case 3:

        if (choice([true, false])) {
          proportion = choice(listeProportion1)
          prenom1 = prenomM()
          a = randint(2, 10)
          nbre = a * proportion[1] + a

          this.reponse = a
          this.question = `  Le nombre de billes de ${prenom1} est égal ${proportion[0]}  nombre
                de billes de sa sœur.<br>
                 À eux deux, ils ont $${nbre}$ billes.<br>
                Combien de billes a ${prenom1} ? `
          this.correction = `Il faut partager le nombre de billes en $${proportion[1] + 1}$.<br>
        $${nbre}\\div ${proportion[1] + 1}=${nbre / (proportion[1] + 1)}$.<br>
        ${prenom1} aura donc $${a}$ billes (sa soeur en aura $${a}\\times ${proportion[1]}$, soit $${a * proportion[1]}$).
        `
        } else {
          proportion = choice(listeProportion2)
          prenom1 = prenomM()
          a = randint(2, 10)

          nbre = a * proportion[1] + a

          this.reponse = a * proportion[1]
          this.question = `  Le nombre de billes de ${prenom1} est égal ${proportion[0]}  nombre
                  de billes de sa sœur.<br>
                   À eux deux, ils ont $${nbre}$ billes.<br>
                  Combien de billes a ${prenom1} ? `
          this.correction = `Il faut partager le nombre de billes en $${proportion[1] + 1}$.<br>
          $${nbre}\\div ${proportion[1] + 1}=${nbre / (proportion[1] + 1)}$.<br>
          ${prenom1} aura donc $${a}\\times ${proportion[1]}=${this.reponse}$ billes (sa soeur en aura $${a}$).
          `
        }
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' billes' } }

        break
    }
  }
}
