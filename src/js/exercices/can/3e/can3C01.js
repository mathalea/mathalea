import Exercice from '../../Exercice.js'
import { context } from '../../../modules/context.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../../modules/outils/miseEnForme.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { miseEnEvidence } from '../../../modules/outils/contextSensitif.js'
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
export const uuid = '8d08f'
export const ref = 'can3C01'
export default function CalculPuissanceSimple () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.tailleDiaporama = 2
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
      c = [['e double', 'a moitié'], ['e triple', 'e tiers'], ['e quintuple', 'e cinquième'], ['e septuple', 'e septième']]
      switch (choice(['a', 'b', 'c', 'd'])) { //
        case 'a':
          texte = `Donner l${c[index][0]} de  $${a}^{${b}}$. ` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          setReponse(this, i, [`${a}^{${b + 1}}`], { formatInteractif: 'texte' })
          texteCorr = `L${c[index][0]} de $${a}^{${b}}$ se calcule  par
       : <br>
       $${a}\\times ${a}^{${b}}=${a}^{${b} + 1}=${a}^{${miseEnEvidence(b + 1)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b + 1), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b + 1
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          this.canEnonce = texte
          break
        case 'b':
          texte = `Donner l${c[index][1]} de $${a}^{${b}}$. ` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          setReponse(this, i, [`${a}^{${b - 1}}`], { formatInteractif: 'texte' })
          texteCorr = `L${c[index][1]} de $${a}^{${b}}$ se calcule  par 
      : <br> 
      
      $ ${a}^{${b}}\\div ${a}=\\dfrac{${a}^{${b}}}{${a}}=${a}^{${b} - 1}=${a}^{${miseEnEvidence(b - 1)}}$`
          if (context.isAmc) {
            setReponse(this, i, a ** (b - 1), { formatInteractif: 'calcul' })
            this.autoCorrection[i].reponse.param.basePuissance = a
            this.autoCorrection[i].reponse.param.exposantPuissance = b - 1
            this.autoCorrection[i].reponse.param.baseNbChiffres = 1
            this.autoCorrection[i].reponse.param.exposantNbChiffres = 2
          }
          this.canEnonce = texte
          break
        case 'c' :
          texte = `Calculer $${a ** 2}\\times ${a}^{${b}}$ `
          if (!context.isAmc) {
            texte += `sous la forme d'une puissance de $${a}$.` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
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
          this.canEnonce = texte
          break
        case 'd' :
          texte = `Calculer $${a}^{${b}}\\div ${a ** 2}$ `
          if (!context.isAmc) {
            texte += `sous la forme d'une puissance de $${a}$.` + ajouteChampTexteMathLive(this, i, 'largeur15 inline')
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
          this.canEnonce = texte
          break
    // this.optionsChampTexte = { texteApres: "(juste l'exposant)" }
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
    this.canReponseACompleter = ''
  }
}
