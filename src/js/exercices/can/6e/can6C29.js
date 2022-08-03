import Exercice from '../../Exercice.js'
import { randint, choice, texteEnCouleur, prenomF, texNombre } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème de partage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '1/11/2021'
export const dateDeModifImportante = '25/07/2022'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can6C29
*/
export default function Partage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.optionsChampTexte = { texteApres: ' €' }
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  const nbrePers = [
    ['Trois', 'trois', 3], ['Quatre', 'quatre', 4], ['Cinq', 'cinq', 5],
    ['Six', 'six', 6], ['Sept', 'sept', 7], ['Huit', 'huit', 8], ['Neuf', 'neuf', 9]]

  this.nouvelleVersion = function () {
    const listeObjets = [
      ['biscuits'], ['billes'], ['bonbons'], ['ballons'], ['vis'], ['clous'], ['bandes dessinées']
    ]
    let nombre, a, b, prix, n, objets
    switch (choice([1, 2])) {
      case 1:

        nombre = choice(nbrePers)
        a = nombre[0]
        b = nombre[1]
        n = nombre[2]
        this.reponse = randint(21, 29) // La réponse, c'est ce nombre
        prix = this.reponse * n // calcul n'est pas utile pour la multiplication d'entiers
        this.question = `${a} amis mangent au restaurant. <br>
        L'addition sélève à $${prix}$ euros. 
    Les amis décident de partager la note en ${b}.<br>
    Quelle est la somme payée par chacun ?`
        this.correction = `$${prix}\\div ${n}=${this.reponse}$.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ' €' } }
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
     Plutôt que d'effectuer la division, évaluez un ordre de grandeur du résultat en multipliant $${n}$ par $20$ pour obtenir une valeur proche du montant de l'addition.<br>
     $${n}\\times 20=${n * 20}$.<br>
     Il reste alors $${prix}-${n * 20}=${prix - n * 20}$ € à partager en ${b}, 
     soit $${prix - n * 20}\\div ${n}=${(prix - n * 20) / n}$ € qui sont à rajouter aux $20$ €. `)
        break

      case 2:
        b = randint(4, 7)
        a = randint(8, 11, 10) * b
        objets = choice(listeObjets)
        this.reponse = a / b
        this.question = `  ${prenomF()} veut partager $${a}$ ${objets} équitablement avec $${b}$ enfants.<br>
         Combien chacun aura-t-il de ${objets} ? <br>`
        this.correction = `Chaque enfant aura  $${a}\\div ${b}=${texNombre(a / b)}$ ${objets}.`
        if (this.interactif) { this.optionsChampTexte = { texteApres: ` ${objets}` } }
        break
    }
  }
}
