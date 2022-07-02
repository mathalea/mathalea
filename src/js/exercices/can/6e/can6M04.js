import { calcul, choice, randint, texNombre, texteEnCouleur, texNombrec } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Convertir en tous sens'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 * Référence can6M04
 */
export default function ConversionEnTousSens () {
  Exercice.call(this)
  this.typeExercice = 'simple'
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let a, resultat
    switch (choice(['a', 'b', 'c', 'd'])) { //
      case 'a':
        if (choice([true, false])) {
          a = randint(1, 13) * 50
          resultat = calcul(a / 1000)
          this.question = `$${texNombre(a)}$ g  =`
          if (!this.interactif) {
            this.question += ' .... kg'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' kg' }
          this.correction = `$${texNombre(a)}$ g$=${texNombrec(a / 1000)}$ kg`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
  Comme $1$ kg $=${texNombre(1000)}$ g, alors $1$ g $=0,001$ kg.<br>
  Ainsi pour passer des "g" au "kg", on divise par $${texNombre(1000)}$.<br>
    Comme : $${texNombre(a)}\\div ${texNombre(1000)} =${texNombrec(a / 1000)}$, alors $${texNombrec(a)}$ g$=${texNombrec(a / 1000)}$ kg.  `)
        } else {
          a = randint(1, 5) / 10
          resultat = calcul(a * 1000)
          this.question = `$${texNombre(a)}$ kg  = `
          if (!this.interactif) {
            this.question += ' ..... g'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' g' }
          this.correction = `$${texNombre(a)}$ kg$=${texNombrec(a * 1000)}$ g`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ kg $=${texNombre(1000)}$ g,  pour passer des "kg" au "g", on multiplie par $${texNombre(1000)}$.<br>
            Comme : $${texNombre(a)}\\times ${texNombre(1000)} =${texNombrec(a * 1000)}$, alors $${texNombrec(a)}$ kg$=${resultat}$ g.  `)
        }
        break
      case 'b':
        if (choice([true, false])) {
          a = randint(1, 13) * 5
          resultat = calcul(a * 100)
          this.question = `$${texNombre(a)}$ m  =`
          if (!this.interactif) {
            this.question += '..... cm'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' cm' }
          this.correction = `$${texNombre(a)}$ m$=${texNombrec(a * 100)}$ cm`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ m $=100$ cm,  pour passer des "m" au "cm", on multiplie par $100$.<br>
            Comme : $${texNombre(a)}\\times 100 =${texNombrec(a * 100)}$, alors $${texNombrec(a)}$ m$=${texNombrec(a * 100)}$ cm.  `)
        } else {
          a = randint(1, 12) * 10
          resultat = calcul(a / 100)
          this.question = `$${texNombre(a)}$ cm  =`
          if (!this.interactif) {
            this.question += '..... m'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' m' }
          this.correction = `$${texNombre(a)}$ cm$=${texNombre(a / 100)}$ m.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
          Ainsi pour passer des "cm" au "m", on divise par $100$.<br>
            Comme  $${texNombre(a)}\\div 100 =${texNombrec(a / 100)}$, alors $${texNombrec(a)}$ cm$=${texNombrec(a / 100)}$ m.  `)
        }
        break
      case 'c':
        if (choice([true, false])) {
          a = randint(1, 13) / 10
          resultat = calcul(a * 10)
          this.question = `$${texNombre(a)}$ cL  =  `
          if (!this.interactif) {
            this.question += ' .... mL'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' mL' }
          this.correction = `$${texNombre(a)}$ cL$=${texNombrec(a * 10)}$ mL`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ cL$ =10$ mL,  pour passer des "cL" au "mL", on multiplie par $10$.<br>
            Comme  $${texNombre(a)}\\times 10 =${texNombrec(a * 10)}$, alors $${texNombrec(a)}$ cL$=${texNombrec(a * 10)}$ mL.  `)
        } else {
          a = randint(1, 12)
          resultat = calcul(a / 10)
          this.question = `$${texNombre(a)}$ mL  = `
          if (!this.interactif) {
            this.question += ' .... cL'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: '  cL' }
          this.correction = `$${texNombre(a)}$ mL$=${texNombrec(a / 10)}$ cL`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ cL$ =10$ mL, alors $1$ mL $=0,1$ cL.<br>
          Ainsi pour passer des "mL" au "cL", on divise par $10$.<br>
            Comme  $${texNombre(a)}\\div 10 =${texNombrec(a / 10)}$, alors $${texNombrec(a)}$ mL$=${texNombrec(a / 10)}$ cL.  `)
        }
        break
      case 'd':
        if (choice([true, false])) {
          a = randint(1, 20) * 10
          resultat = calcul(a / 1000)
          this.question = `$${texNombre(a)}$ m  $=$ `
          if (!this.interactif) {
            this.question += ' .... km'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' km' }
          this.correction = `$${texNombre(a)}$ m$=${texNombrec(a / 1000)}$ km`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ km $=${texNombre(1000)}$ m, alors $1$ m $=0,001$ km.<br>
          Ainsi pour passer des "m" au "km", on divise par $${texNombre(1000)}$.<br>
            Comme  $${texNombre(a)}\\div ${texNombre(1000)} =${texNombrec(a / 1000)}$, alors $${texNombrec(a)}$ m$=${texNombrec(a / 1000)}$ km.  `)
        } else {
          a = randint(1, 35) / 100
          resultat = calcul(a * 1000)
          this.question = `$${texNombre(a)}$ km $=$`
          if (!this.interactif) {
            this.question += ' .... m'
          }
          this.formatChampTexte = 'largeur15 inline'
          this.optionsChampTexte = { texteApres: ' m' }
          this.correction = `$${texNombre(a)}$ km$=${texNombrec(a * 1000)}$ m`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Comme $1$ km $=${texNombre(1000)}$ m,  pour passer des "km" au "m", on multiplie par $${texNombre(1000)}$.<br>
            Comme  $${texNombre(a)}\\times ${texNombre(1000)} =${texNombrec(a * 1000)}$, alors $${texNombrec(a)}$ km$=${texNombrec(a * 1000)}$ m.  `)
        }
        break
    }
    this.reponse = resultat
  }
}
