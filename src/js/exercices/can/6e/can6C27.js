import Exercice from '../../Exercice.js'
import { randint, choice, texNombre, prenomF, prenomM, texPrix, texteEnCouleurEtGras, texteEnCouleur, calcul } from '../../../modules/outils.js'
export const titre = 'Résoudre un problème concret'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora & Jean-Claude Lhote
 * Référence can6C26
 * Date de publication 21/10/2021
*/
export default function PetitsProblemeArithmetique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, r, e, m, somme, prenom1, prenom2
    switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) {
      case 1:// de plus
        r = randint(4, 7) * 10
        e = randint(1, 3) * 10
        m = r - e
        somme = m + r
        this.reponse = m + r
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomF()
        }
        this.question = ` ${prenom2} dit à ${prenom1}  : "J'ai ${texPrix(r)} € soit ${texPrix(e)} € de plus que toi."<br>`
        this.question += 'Combien d\'argent en tout possèdent les deux filles ?'
        this.correction = `D'après l'énoncé ${prenom2} a : ${texPrix(r)} €<br>${prenom2}  a ${texPrix(e)} €`
        this.correction += texteEnCouleurEtGras(' de plus ')
        this.correction += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
        this.correction += texteEnCouleurEtGras(' de moins ')
        this.correction += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)} € - ${texPrix(e)} € = ${texPrix(m)} €`
        this.correction += `<br>${texPrix(r)} € + ${texPrix(m)} € = ${texPrix(somme)} €`
        this.correction += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
        break

      case 2://  de moins
        r = randint(4, 7) * 10
        e = randint(1, 3) * 10
        m = r + e
        somme = m + r
        this.reponse = m + r
        prenom1 = prenomF()
        prenom2 = prenomF()
        while (prenom2 === prenom1) {
          prenom2 = prenomF()
        }
        this.question = ` ${prenom2} dit à ${prenom1}  : "J'ai ${texPrix(r)} € soit ${texPrix(e)} € de moins que toi."<br>`
        this.question += 'Combien d\'argent en tout possèdent les deux filles ? '

        this.correction = `D'après l'énoncé ${prenom2} a : ${texPrix(r)} €<br>${prenom2}  a ${texPrix(e)} €`
        this.correction += texteEnCouleurEtGras(' de moins ')
        this.correction += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)} €`
        this.correction += texteEnCouleurEtGras(' de plus ')
        this.correction += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)} € + ${texPrix(e)}€ = ${texPrix(m)} €`
        this.correction += `<br>${texPrix(r)} € + ${texPrix(m)} € = ${texPrix(somme)} €`
        this.correction += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
        break

      case 3://  age
        a = randint(10, 20)
        b = randint(2, 8)
        this.reponse = a - b
        this.question = `${prenomF()} a ${a} ans.`
        this.question += `<br>Sachant qu'elle a ${b} ans de plus que son frère, quel âge a celui-ci?`
        this.correction = `L'âge de son frère est  : $${a}-${b}=${a - b}$ ans.`
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
        this.correction = `On doit me rendre $10-${texNombre(a)}=${texNombre(10 - a)}$ €.`
        break
      case 8:// partage
        b = randint(4, 7)
        a = randint(8, 11, 10) * b
        this.reponse = a / b
        this.question = `  ${prenomF()} veut partager $${a}$ billes équitablement en $${b}$ enfants. Combien chacun aura-t-il de billes ? <br>`
        this.correction = `Chaque enfant aura  $${a}\\div ${b}=${texNombre(a / b)}$ billes.`
        break
    }
  }
}
