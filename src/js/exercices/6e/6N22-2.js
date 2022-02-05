import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, nombreDeChiffresDe } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { fraction } from '../../modules/fractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import FractionX from '../../modules/FractionEtendue.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Mettre bout à bout des segments'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Représenter une somme de fractions de même dénominateur sur un segment gradué de façon adaptée.
 * @author Jean-Claude Lhote (AMC par EE)
 * 6N14-2
 * Relecture : Novembre 2021 par EE
 */
export default function AjouterDesFractionsDunite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let sc, objets
    const ppc = 20
    if (context.isHtml) {
      sc = 0.5
    } else {
      sc = 0.3
    }

    let params; let den; const num = [0, 0, 0, 0]; const f = []

    const liste = combinaisonListes([5, 6, 7, 8], this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = []
      den = liste[i]
      num[0] = randint(1, den - 1)
      num[1] = randint(1, den - 1, num[0])
      num[2] = randint(1, den - 1, num[1])
      num[3] = randint(1, den - 1, [num[2], num[0]])
      for (let j = 0; j < 4; j++) { f[j] = fraction(num[j], den) }

      texte = `On place bout à bout 4 segments de longueurs respectives $${f[0].texFraction}$, $${f[1].texFraction}$, $${f[2].texFraction}$ et $${f[3].texFraction}$.<br>`
      texte += 'Quelle est la longueur du segment obtenu ?'
      setReponse(this, i, new FractionX(num[0] + num[1] + num[2] + num[3], den), { digitsNum: nombreDeChiffresDe(num[0] + num[1] + num[2] + num[3]) + randint(0, 1), digitsDen: nombreDeChiffresDe(den) + randint(0, 1), signe: false, formatInteractif: 'fractionEgale' })
      if (this.interactif && !context.isAmc) {
        texte += ajouteChampTexteMathLive(this, i, 'inline largeur 25')
      }
      texteCorr = 'Voici sur ces dessins, coloriés en rouge, les différents segments :<br>'
      for (let j = 0; j < 4; j++) { objets.push(f[j].representation(0, 5 - j * 1.25, 5, 0, 'segment', 'red', 0, 1, 1)) }
      params = {
        xmin: -0.4,
        ymin: -1.5,
        xmax: 6,
        ymax: 6,
        pixelsParCm: ppc,
        scale: 0.5
      }
      texteCorr += mathalea2d(params, ...objets)
      texteCorr += '<br>Ce qui donne en les mettant bout à bout :<br>'
      params = {
        xmin: -0.4,
        ymin: -1.5,
        xmax: 20,
        ymax: 1,
        pixelsParCm: ppc,
        scale: sc
      }
      texteCorr += mathalea2d(params, fraction(num[0] + num[1] + num[2] + num[3], den).representation(0, 0, 5, 0, 'segment', 'red', 0, 1, 1))
      texteCorr += `<br>La longueur du segment ainsi obtenu est : $${fraction(num[0] + num[1] + num[2] + num[3], den).texFraction}$.`
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
