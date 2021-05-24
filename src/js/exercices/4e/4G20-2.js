import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Racine carré d’un carré parfait (calcul mental)'
export const amcReady = false
export const interactifReady = true
export const interactifType = ''
export const amcType = 4

/**
 * Déterminer la racine carrée d'un carré parfait compris entre 4 et 256
 * @author Stéphane Guyon
 * 4G20-2
 */
export default function RacineCareeDeCarresParfaits () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactif = true
  this.consigne = 'Calculer de tête les racines suivantes.'
  this.nbQuestions = 4
  this.nbCols = 2
  this.nbColsCorr = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, a, c, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, 16)
      c = a * a
      texte = `$\\sqrt{${c}}=$` + ajouteChampTexte(this, i)
      texteCorr = `$\\sqrt{${c}}=${a}$`
      setReponse(this, i, a)

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
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
