import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombrec, calcul, choice } from '../../modules/outils.js'
import { setReponse, ajouteChampTexteMathLive } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Ecriture décimale d\'un calcul avec des puissances de 10'
export const dateDePublication = '18/01/2022'

/**
 * On donne un calcul avec des puissances de 10 et on en attend le résultat en écriture décimale
 * @author Mireille Gain, copiant le 4C32-1 de Jean-Claude Lhote
 * 4C32-0
*/
export default function EcritureDecimaleApresPuissancesDeDix () {
  Exercice.call(this)
  this.consigne = 'Donner le résultat des calculs suivants en écriture décimale.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 50
  this.video = ''
  this.interactif = true
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
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(0, 7)
          texte = `$${texNombrec(n)} \\times 10^{${p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombrec(n * 10 ** p)}$`
          setReponse(this, i, texNombrec(n * 10 ** p))
          break
        case 'type2':
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(1, 7)
          texte = `$${texNombrec(n)} \\times 10^{${-p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombrec(n * 10 ** (-p))}$`
          setReponse(this, i, texNombrec(n * 10 ** (-p)))
          break
        case 'type3':
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          d = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(1, 7)
          nb = calcul(n + d / choice([10, 100, 1000]))
          texte = `$${texNombrec(nb)} \\times 10^{${p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombrec(nb * 10 ** (p))}$`
          setReponse(this, i, texNombrec(nb * 10 ** (p)))
          break
        case 'type4':
          n = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          d = choice([randint(2, 9), randint(11, 99), randint(101, 999)])
          p = randint(0, 7)
          nb = calcul(n + d / choice([10, 100, 1000]))
          texte = `$${texNombrec(nb)} \\times 10^{${-p}}$`
          texteCorr = texte
          texteCorr += `$=${texNombrec(nb * 10 ** (-p))}$`
          setReponse(this, i, texNombrec(nb * 10 ** (-p)))
          break
      }

      if (this.interactif) { // Si l'exercice est interactif
        texte += ajouteChampTexteMathLive(this, i)
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
