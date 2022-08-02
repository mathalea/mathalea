import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, prenomF, prenomM, texPrix, texteEnCouleurEtGras, texteEnCouleur, calcul } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème de partage*'
export const interactifReady = true
export const interactifType = 'mathLive'

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
    let a, b, r, e, m, somme, nbre, prenom1
    switch (choice([1])) {
     

      

      case 1:
      nbre = randint(2,4)
      b=new Decimal(randint(5,12)*10+randint(1,9)).div(10)
      c=new Decimal(b).mul(nbre)
      this.reponse = new Decimal(a).sub(c)
      this.question = `  Un électricien dispose d’un rouleau de fil électrique de $${a}$ m. Il découpe $${nbre}$
      morceaux de fil de ce rouleau de $${texNombre(b,2,true)}$ m chacun.<br>
      Quelle longueur de fil électrique reste-t-il dans le rouleau ?`
      this.correction = `Les $${nbre}$  morceaux de fil ont une longueur de $${nbre}\\times ${texNombre(b,2,true)}$, soit $${texNombre(c,2,true)}$ m.<br>
      Il reste alors : $${a}-${texNombre(c,2,true)}=${texNombre(this.reponse,2, true)}$ m.`
      if (this.interactif) { this.optionsChampTexte = { texteApres: ` m` } }
     
        break

        case 2:
            prenom1=prenomF()
            nbre = randint(2,5)
            b=new Decimal(choice([10,20,25])).div(100)
            c=new Decimal(b).mul(nbre)
            this.reponse = new Decimal(a).sub(c)
            this.question = `  Pour son anniversaire, ${prenom1} a acheté $${nbre}$ litres de jus de fruits. Les verres de
            ${prenom1} contiennent $${texNombre(b,2,true)} litre.<br>
            Combien de verres de jus de fruits ${prenom1} pourra-t-elle servir ? `
            this.correction = ``
            if (this.interactif) { this.optionsChampTexte = { texteApres: ` verres` } }
           
              break
     

      
     
    }
  }
}
