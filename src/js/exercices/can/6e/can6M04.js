import { calcul, choice, randint, texNombre } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Conversions en tous sens'
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
  
  this.nouvelleVersion = function () {
    let a, resultat, texte, texteCorr
    switch (choice(['a', 'b', 'c', 'd'])) {
      case 'a':
        if (choice([true, false])) {
          a = randint(1, 13) * 50
          resultat = calcul(a / 1000)
          texte = `$${texNombre(a)}$ g $ = \\ldots $ kg`
          texteCorr = `$${texNombre(a)}$ g$=${resultat}$ kg`
        } else {
          a = randint(1, 5) / 10
          resultat = a * 1000
          texte = `$${texNombre(a)}$ kg $ = \\ldots $ g`
          texteCorr = `$${texNombre(a)}$ g$=${resultat}$ kg`
        }
        break
      case 'b':
        if (choice([true, false])) {
          a = randint(1, 13) * 5
          resultat = a * 100
          texte = `$${texNombre(a)}$ m $ = \\ldots $ cm`
          texteCorr = `$${texNombre(a)}$ m$=${resultat}$ cm`
        } else {
          a = randint(1, 12) * 10
          resultat = calcul(a / 100)
          texte = `$${texNombre(a)}$ cm $ = \\ldots $ m`
          texteCorr = `$${texNombre(a)}$ cm$=${resultat}$ m`
        }
        break
      case 'c':
        if (choice([true, false])) {
          a = randint(1, 13) / 10
          resultat = a * 10
          texte = `$${texNombre(a)}$ c$\\ell$  $= \\ldots $ m$\\ell$`
          texteCorr = `$${texNombre(a)}$ c$\\ell$$=${resultat}$ m$\\ell$`
        } else {
          a = randint(1, 12)
          resultat = calcul(a / 10)
          texte = `$${texNombre(a)}$ m$\\ell$ $ = \\ldots $ c$\\ell$`
          texteCorr = `$${texNombre(a)}$ c$\\ell$$=${resultat}$ m$\\ell$`
        }
        break
      case 'd':
        if (choice([true, false])) {
          a = randint(1, 20) * 10
          resultat = calcul(a / 1000)
          texte = `$${texNombre(a)}$ m  $= \\ldots $ km`
          texteCorr = `$${texNombre(a)}$ m$=${resultat}$ km`
        } else {
          a = randint(1, 35) / 100
          resultat = a * 1000
          texte = `$${texNombre(a)}$ km $ = \\ldots $ m`
          texteCorr = `$${texNombre(a)}$ km$=${resultat}$ m`
        }
        break
    }
    this.reponse = resultat
    this.question = texte
    this.correction = texteCorr
  }
}
