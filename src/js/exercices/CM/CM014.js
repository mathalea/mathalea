import Exercice from '../Exercice.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenu, randint, range1, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Double, moitié, tiers, triple'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Calculer le double ou le triple d'un nombre, calculer la moitié d'un nombre pair ou le tiers d'un multiple de 3
 * @author Rémi Angot
* Référence CM014
 */
export const uuid = '9d994'
export const ref = 'CM014'
export default function DoubleMoitieTiersTriple () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer :'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 // niveau de difficulté
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = range1(4)
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // Double
          a = randint(2, 9)
          texte = `$\\text{Le double de }${a}$`
          texteCorr = `$\\text{Le double de }${a} \\text{ est } ${a * 2}$`
          setReponse(this, i, a * 2)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 2: // Moitié
          a = randint(2, 9) * 2
          texte = `$\\text{La moitié de }${a * 2}$`
          texteCorr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`
          setReponse(this, i, a)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 3: // Triple
          a = randint(2, 9)
          texte = `$\\text{Le triple de }${a}$`
          texteCorr = `$\\text{Le triple de }${a} \\text{ est } ${a * 3}$`
          setReponse(this, i, a * 3)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 4: // Tiers
          a = randint(2, 9)
          texte = `$\\text{Le tiers de }${a * 3}$`
          texteCorr = `$\\text{Le tiers de }${a * 3} \\text{ est } ${a}$`
          setReponse(this, i, a)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
