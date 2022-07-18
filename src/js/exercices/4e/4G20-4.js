import Exercice from '../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { context } from '../../modules/context.js'
import { choice, listeQuestionsToContenu, randint, texNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { cos } from '../../modules/fonctionsMaths.js'

export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Arrondir une racine carrée'

/**
 * * Arrondir_une_valeur
 * * 4G20-4
 * @author Mireille Gain, 27 juin 2021
 */

export default function ArrondirUneValeur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre

  this.nbQuestions = 3
  this.nbCols = 2 // Valeur différente de 3 car sinon en Latex, 3 colonnes, c'est trop
  this.nbColsCorr = 1
  this.version = 1
  this.interactifType = interactifType
  this.interactifReady = interactifReady
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 3.5)

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.consigne = "Arrondir chaque nombre à l'unité, puis au dixième, puis au centième."

    this.listeQuestions = []
    this.listeCorrections = []
    let n, nb, rac, angle, v

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[3 * i] = {}
      this.autoCorrection[3 * i + 1] = {}
      this.autoCorrection[3 * i + 2] = {}
      if (this.version === 1) {
        rac = new Decimal(randint(2, 300, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289]))
        n = rac.sqrt()
        nb = `\\sqrt{${rac}}`
      } else { // if (this.version === 2)
        v = new Decimal(randint(11, 99)).div(10)
        angle = randint(1, 89, 60)
        if (choice([true, false])) {
          n = v.mul(cos(angle))
          nb = `${texNombre(v, 1)}\\cos(${angle})`
        } else {
          n = v.div(cos(angle))
          nb = `\\dfrac{${texNombre(v, 1)}}{\\cos(${angle})}`
        }
      }

      texte = `$\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n, 10)}$`

      texte += '<br>Arrondi à l\'unité : '
      texte += ajouteChampTexteMathLive(this, 3 * i)
      texteCorr = `$\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n, 10)}$`
      texteCorr += "<br>Arrondi à l'unité : "
      texteCorr += `$${texNombre(n, 0)}$`
      setReponse(this, 3 * i, n.round())

      texte += '<br>Arrondi au dixième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 1)
      texteCorr += '<br>Arrondi au dixième : '
      texteCorr += `$${texNombre(n, 1)}$`
      setReponse(this, 3 * i + 1, n.toDP(1))

      texte += '<br>Arrondi au centième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 2)
      texteCorr += '<br>Arrondi au centième : '
      texteCorr += `$${texNombre(n, 2)}$`
      setReponse(this, 3 * i + 2, n.toDP(2))

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
