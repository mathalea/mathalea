import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, choice, texNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import pkg from 'decimal.js'
const { Decimal } = pkg
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Écriture décimale d\'un calcul avec des puissances de 10'
export const dateDePublication = '18/01/2022'

/**
 * On donne un calcul avec des puissances de 10 et on en attend le résultat en écriture décimale
 * @author Mireille Gain
 * 4C32-0
*/
export const uuid = '5d72b'
export const ref = '4C32-0'
export default function EcritureDecimaleApresPuissancesDeDix () {
  Exercice.call(this)
  this.consigne = 'Donner le résultat des calculs suivants en écriture décimale.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3
  this.video = ''
  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, n, nb, d, p, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      switch (listeTypeQuestions[i]) {
        case 'type1':
          n = new Decimal(choice([randint(2, 9), randint(11, 99), randint(101, 999)]))
          p = randint(0, 7)
          texte = `$${texNombre(n)} \\times 10^{${p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombre(n.mul(Decimal.pow(10, p)))}$`
          setReponse(this, i, n.mul(Decimal.pow(10, p)))
          break
        case 'type2':
          n = new Decimal(choice([randint(2, 9), randint(11, 99), randint(101, 999)]))
          p = randint(1, 7)
          texte = `$${texNombre(n)} \\times 10^{${-p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombre(n.mul(Decimal.pow(10, -p)), 10)}$`
          setReponse(this, i, n.mul(Decimal.pow(10, -p)))
          break
        case 'type3':
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          d = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(1, 7)
          nb = (new Decimal(d)).div(choice([10, 100, 1000])).add(n) // nb est Decimal !
          texte = `$${texNombre(nb, 3)} \\times 10^{${p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombre(nb.mul(Decimal.pow(10, p)), 0)}$`
          setReponse(this, i, nb.mul(Decimal.pow(10, p)))
          break
        case 'type4':
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          d = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(0, 7)
          nb = (new Decimal(d)).div(choice([10, 100, 1000])).add(n)
          texte = `$${texNombre(nb, 3)} \\times 10^{${-p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombre(nb.mul(Decimal.pow(10, -p)), 10)}$`
          setReponse(this, i, nb.mul(Decimal.pow(10, -p)))
          break
      }

      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i)
      }

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
