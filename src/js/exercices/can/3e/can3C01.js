import { context } from '../../../modules/context.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { choice, listeQuestionsToContenu, miseEnEvidence, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Calculer avec des puissances'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/*!
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021
 * Référence can3C01
 */
export default function CalculPuissanceSimple () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 1
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const bases = [2, 3, 5, 7]
    for (let i = 0, a, b, c, index, texte, texteCorr; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
      index = randint(0, 3)
      a = bases[index]
      b = randint(20, 50)
      c = [['Le double', 'La moitié'], ['Le triple', 'Le tiers'], ['Le quintuple', 'Le cinquième'], ['Le septuple', 'Le septième']]
      switch (choice(['a', 'b', 'c', 'd'])) { // 'b', 'c'
        case 'a':
          texte = `${c[index][0]} de  $${a}^{${b}}$ est égal à : ` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          setReponse(this, i, [`${a}^{${b + 1}}`], { formatInteractif: 'texte' })
          texteCorr = `${c[index][0]} de $${a}^{${b}}$ se calcule  par 
       : <br>
       $${a}\\times ${a}^{${b}}=${a}^{${b} + 1}=${a}^{${miseEnEvidence(b + 1)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b + 1), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b + 1
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          break
        case 'b':
          texte = `${c[index][1]} de $${a}^{${b}}$ est égal à : ` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          setReponse(this, i, [`${a}^{${b - 1}}`], { formatInteractif: 'texte' })
          texteCorr = `${c[index][1]} de $${a}^{${b}}$ se calcule  par 
      : <br> 
      
      $ ${a}^{${b}}\\div ${a}=\\dfrac{${a}^{${b}}}{${a}}=${a}^{${b} - 1}=${a}^{${miseEnEvidence(b - 1)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b - 1), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b - 1
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          break
        case 'c' :
          texte = ` $${a ** 2}\\times ${a}^{${b}}=$`
          if (!context.isAmc) {
            texte += `<br>Donner le résultat sous la forme d'une puissance de $${a}$.` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          }

          setReponse(this, i, [`${a}^{${b + 2}}`], { formatInteractif: 'texte' })
          texteCorr = ` Comme $${a ** 2}=${a}^2$, alors $${a ** 2}\\times ${a}^{${b}}=${a}^2\\times ${a}^{${b}}=${a}^{${b}+2}=${a}^{${miseEnEvidence(2 + b)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b + 2), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b + 2
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          break
        case 'd' :
          texte = ` $${a}^{${b}}\\div ${a ** 2}=$`
          if (!context.isAmc) {
            texte += `<br>Donner le résultat sous la forme d'une puissance de $${a}$.` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          }

          setReponse(this, i, [`${a}^{${b - 2}}`], { formatInteractif: 'texte' })
          texteCorr = `Comme $${a ** 2}=${a}^2$, alors $${a}^{${b}}\\div ${a ** 2}=
        \\dfrac{${a}^{${b}}}{${a}^2}=${a}^{${b}-2}=${a}^{${miseEnEvidence(b - 2)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b - 2), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b - 2
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          break
    // this.optionsChampTexte = { texteApres: "(juste l'exposant)" }
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
