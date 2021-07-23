import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...'
export const interactifReady = true
export const interactifType = 'mathlive'

/**
 * Le nombre de dizaines, centaines et milliers étant donné, il faut écrire le nombre.
 *
 * 2 fois sur 5 il y a chevauchement entre les classes
 * @author Rémi Angot
 * 6N10-1
 */
export default function ExerciceNumerationEntier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.titre = titre
  this.consigne = 'Écrire en chiffres chacun des nombres.'
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const listeTypeDeQuestions = combinaisonListes(
      [1, 1, 1, 2, 2],
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, rangA, rangB, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 8) * 10 + randint(1, 5)
      b = randint(2, 8) * 10 + randint(1, 5)
      const rangs = [
        'unités',
        'dizaines',
        'centaines',
        'milliers',
        'dizaines de mille',
        'centaines de mille',
        'millions'
      ]
      rangA = randint(0, 2)
      if (listeTypeDeQuestions[i] === 1) {
        rangB = randint(rangA + 2, 6)
      } else {
        rangB = rangA + 1
      }

      texte = `$\\text{${b}  ${rangs[rangB]} et ${a} ${rangs[rangA]}}$`
      texteCorr = `$${b} \\text{ ${rangs[rangB]} et }${a} \\text{ ${rangs[rangA]
        } : } ${texNombre(b * Math.pow(10, rangB))} + ${a * texNombre(Math.pow(10, rangA))} =${texNombre(
          b * Math.pow(10, rangB) + a * Math.pow(10, rangA)
        )}$`

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        setReponse(this, i, b * Math.pow(10, rangB) + a * Math.pow(10, rangA))
        texte += ajouteChampTexteMathLive(this, i)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
