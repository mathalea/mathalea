import { fraction } from '../../modules/fractions'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif'
import { calcul, choice, listeQuestionsToContenuSansNumero, randint, texNombrec } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Simplifications'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Gilles Mora
 */
export default function PerimetreCarreRectangle () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.autoCorrection[0] = {}
    let a, b, n, k, maFraction
    let texte, texteCorr, resultat
    switch (choice([1, 2, 3])) {
      case 1:// simplification de fraction
        do {
          a = randint(1, 12)
          b = randint(2, 12, [a, calcul(a / 2), calcul(a / 3), calcul(a / 4), 11])
          console.log(a, b)
        } while (Number.isInteger((calcul(a / b))))
        k = choice([2, 4, 6, 8, 9, 10])
        maFraction = fraction(a * k, b * k)
        k = calcul(maFraction.num / maFraction.numIrred)
        resultat = maFraction.simplifie()
        texte = `Ecrire $${maFraction.texFraction}$ sous la forme d'une fraction irréductible.` + ajouteChampTexteMathLive(this, 0)
        texteCorr = `$${maFraction.texFraction}=\\dfrac{${resultat.num}\\times ${k}}{${resultat.den}\\times ${k}} =${resultat.texFraction}$.`
        setReponse(this, 0, resultat, { formatInteractif: 'fraction' })
        break

      case 2:// racine carrée ()^2 ou rac(0,04) par ex
        n = choice(['a', 'b'])
        if (n === 'a') {
          a = randint(2, 3)
          b = choice([2, 5, 6, 7, 10])
          resultat = a * a * b
          texte = `$(${a}\\sqrt{${b}})^2=$` + ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
          texteCorr = `$(${a}\\sqrt{${b}})^2=${a}^2\\times (\\sqrt{${b}})^2=${a * a}\\times ${b}=${a * a * b}$.`
          setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
        }
        if (n === 'b') {
          a = randint(1, 9) / 10

          resultat = a
          texte = `$\\sqrt{${texNombrec(a ** 2)}}=$` + ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
          texteCorr = `$\\sqrt{${texNombrec(a ** 2)}}=${texNombrec(a)}$.`
          setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
        }
        break

      case 3:// somme racine carrée ()^2
        a = randint(2, 10)
        b = randint(2, 10, a)
        resultat = (a - b) * (a - b)

        if (a - b < 0) {
          texte = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$` + ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
          texteCorr = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=(${a - b})^2=${(a - b) * (a - b)}$.`
          setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
        } else {
          texte = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=$` + ajouteChampTexteMathLive(this, 0, 'largeur10 inline')
          texteCorr = `$(\\sqrt{${a * a}}-\\sqrt{${b * b}})^2=(${a}-${b})^2=${a - b}^2=${(a - b) * (a - b)}$.`
          setReponse(this, 0, resultat, { formatInteractif: 'calcul' })
        }
        break
    }

    this.listeQuestions[0] = texte
    this.listeCorrections[0] = texteCorr
    listeQuestionsToContenuSansNumero(this)
  }
}
