import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeNombresPremiersStrictJusqua, choice, listeQuestionsToContenu, randint, texNombre, arrondi } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
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
  this.nbCols = 3
  this.nbColsCorr = 1
  this.sup = 1
  this.interactifType = interactifType
  this.interactifReady = interactifReady
  this.interactif = true
  context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 3.5)

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.autoCorrection = []
    this.consigne = "Arrondir chaque nombre à l'unité, puis au dixième, puis au centième."

    this.listeQuestions = []
    this.listeCorrections = []
    let n, nb, rac, angle, v

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[3 * i] = {}
      this.autoCorrection[3 * i + 1] = {}
      this.autoCorrection[3 * i + 2] = {}
      if (this.sup === 1) {
        rac = randint(2, 300, [listeNombresPremiersStrictJusqua(300)])
        n = Math.sqrt(rac)
        nb = `\\sqrt{${rac}}`
      } else if (this.sup === 2) {
        v = randint(11, 99) / 10
        angle = randint(1, 89, 60)
        if (choice([true, false])) {
          n = v * cos(angle)
          nb = `${texNombre(v)}\\cos(${angle})`
        } else {
          n = v / cos(angle)
          nb = `\\dfrac{${texNombre(v)}}{\\cos(${angle})}`
        }
      }

      texte = `$\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n)}$`

      texte += '<br>Arrondi à l\'unité : '
      texte += ajouteChampTexteMathLive(this, 3 * i)
      texteCorr = `$\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n)}$`
      texteCorr += "<br>Arrondi à l'unité : "
      texteCorr += `$${texNombre(arrondi(n, 0))}$`
      setReponse(this, 3 * i, arrondi(n, 0))

      texte += '<br>Arrondi au dixième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 1)
      texteCorr += '<br>Arrondi au dixième : '
      texteCorr += `$${texNombre(arrondi(n, 1))}$`
      setReponse(this, 3 * i + 1, arrondi(n, 1))

      texte += '<br>Arrondi au centième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 2)
      texteCorr += '<br>Arrondi au centième : '
      texteCorr += `$${texNombre(arrondi(n, 2))}$`
      setReponse(this, 3 * i + 2, arrondi(n, 2))

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
  this.besoinFormulaireNumerique = ['Type de nombre', 2, '1 : Racine carrée\n 2 : Valeur avec cosinus']
}
