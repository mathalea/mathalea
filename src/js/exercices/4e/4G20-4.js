import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeNombresPremiersStrictJusqua, choice, listeQuestionsToContenu, randint, troncature, texNombre } from '../../modules/outils.js'

import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'

import { cos } from '../../modules/fonctionsMaths.js'

export const amcReady = true
export const amcType = 2 // type de question AMC
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
    let di, ci, mi, n, nb, rac, angle, v

    for (let i = 0, texte = '', texteCorr = '', cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      if (this.sup === 1) {
        rac = randint(2, 300, [listeNombresPremiersStrictJusqua(300)])
        n = Math.sqrt(rac)
        nb = `\\sqrt{${rac}}`
        di = 10 * (troncature(n - troncature(n, 0), 1))
        ci = 100 * (troncature(n - troncature(n, 1), 2))
        mi = 1000 * (troncature(n - troncature(n, 2), 3))
      } else if (this.sup === 2) {
        v = randint(11, 99) / 10
        angle = randint(1, 89, 60)
        if (choice([true, false])) {
          n = v * cos(angle)
          nb = `${texNombre(v)}\\cos(${angle})`
          di = 10 * (troncature(n - troncature(n, 0), 1))
          ci = 100 * (troncature(n - troncature(n, 1), 2))
          mi = 1000 * (troncature(n - troncature(n, 2), 3))
        } else {
          n = v / cos(angle)
          nb = `\\dfrac{${texNombre(v)}}{\\cos(${angle})}`
          di = 10 * (troncature(n - troncature(n, 0), 1))
          ci = 100 * (troncature(n - troncature(n, 1), 2))
          mi = 1000 * (troncature(n - troncature(n, 2), 3))
        }
      }

      texte = `$\\text{Quand~on~écrit~sur~la~calculatrice~} ${nb}, \\text{~elle~renvoie} : ${texNombre(n)}$`

      texte += '<br><br>Arrondi à l\'unité : '
      texte += ajouteChampTexteMathLive(this, 3 * i)
      texteCorr = "Arrondi à l'unité : "
      if (di < 5) {
        texteCorr += `$${texNombre(troncature(n, 0))}$`
        setReponse(this, 3 * i, texNombre(troncature(n, 0)))
      } else {
        texteCorr += `$${texNombre(troncature(n + 1, 0))}$`
        setReponse(this, 3 * i, texNombre(troncature(n + 1, 0)))
      }

      texte += '<br>Arrondi au dixième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 1)
      texteCorr += '<br>Arrondi au dixième : '
      if (ci < 5) {
        texteCorr += `$${texNombre(troncature(n, 1))}$`
        setReponse(this, 3 * i + 1, texNombre(troncature(n, 1)))
      } else {
        texteCorr += `$${texNombre(troncature(n + 0.1, 1))}$`
        setReponse(this, 3 * i + 1, texNombre(troncature(n + 0.1, 1)))
      }

      texte += '<br>Arrondi au centième : '
      texte += ajouteChampTexteMathLive(this, 3 * i + 2)
      texteCorr += '<br>Arrondi au centième : $~$'
      if (mi < 5) {
        texteCorr += `$${texNombre(troncature(n, 2))}$`
        setReponse(this, 3 * i + 2, texNombre(troncature(n, 2)))
      } else {
        texteCorr += `$${texNombre(troncature(n + 0.01, 2))}$`
        setReponse(this, 3 * i + 2, texNombre(troncature(n + 0.01, 2)))
      }

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
