import { calcul, choice, randint, texNombre, texteEnCouleur, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Convertir des m$^3$ et litres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6M05
 */
export default function ConversionM3EtLitres () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, resultat
    switch (choice(['a', 'b'])) {
      case 'a':
        a = calcul(randint(1, 12) + randint(1, 9) / 10)
        resultat = calcul(a * 1000)
        this.question = ` $${texNombre(a)}$ m$^3=$`
        if (!this.interactif) {
          this.question += ' $....$ L'
        }
        this.formatChampTexte = 'largeur15 inline'
        this.optionsChampTexte = { texteApres: ' L' }
        this.correction = ` $${texNombre(a)}$ m$^3=${a * 1000}$ L.`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
        Comme $1$ m$^3$= $1000$ L,  pour passer des "m$^3$" au "L", on multiplie par $1000$.<br>
          Comme : $${texNombre(a)}\\times 1000 =${texNombrec(a * 1000)}$, alors $${texNombrec(a)}$ m$^3=${resultat}$ L.  `)

        break
      case 'b':
        a = calcul(randint(1, 9) + randint(1, 9) * 10 + randint(0, 9) * 100)
        resultat = calcul(a / 1000)
        this.question = `$${texNombre(a)}$  L$=$`
        if (!this.interactif) {
          this.question += '.... m$^3$ '
        }
        this.formatChampTexte = 'largeur15 inline'
        this.optionsChampTexte = { texteApres: ' m$^3$' }
        this.correction = ` $${texNombre(a)}$ L$=${texNombrec(a / 1000)}$ m$^3$.`
        this.correction += texteEnCouleur(`<br> Mentalement : <br>
           Comme $1$ m$^3$= $1000$ L alors $1$ L$=0,001$ m$^3$. Donc,    pour passer des "L" au "m$^3$", on divise par $1000$.<br>
          Comme : $${texNombre(a)}\\div 1000 =${texNombrec(a / 1000)}$, alors $${texNombrec(a)}$ L$=${texNombrec(a / 1000)}$ m$^3$.  `)

        break
    }

    this.reponse = resultat
  }
}
