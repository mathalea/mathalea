import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Conversions m$^3$ et litres'
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
  
  this.nouvelleVersion = function () {
    let a, resultat, texte, texteCorr
    switch (choice(['a', 'b'])) {
      case 'a':
        a = calcul(randint(1, 12) + randint(1, 9) / 10)
        texte = ` $${texNombre(a)}$ m$^3=$.... L`
        texteCorr = `$1$ m$^3$= $1000$ L, donc $${texNombre(a)}$ m$^3$=$${texNombre(a)}\\times 1000$ L $=${a * 1000}$ L.`
        resultat = calcul(a * 1000)
        break
      case 'b':
        a = calcul(randint(1, 9) + randint(1, 9) * 10 + randint(0, 9) * 100)
        texte = `.... m$^3=${texNombre(a)}$  L`
        texteCorr = `$1$ m$^3$= $1000$ L, donc $${texNombre(a)}$ L$=${texNombre(a)}\\div 1000$ m$^3=${calcul(a / 1000)}$ m$^3$.`
        resultat = calcul(a / 1000)
        break
    }

    this.reponse = resultat
    this.question = texte
    this.correction = texteCorr
  }
}
