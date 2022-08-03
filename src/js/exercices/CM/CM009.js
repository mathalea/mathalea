import Exercice from '../Exercice.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenu, randint, range1, combinaisonListes, texNombre, calcul } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Moitié'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
/**
 * Calculer la moitié d'un nombre pair, d'un impair inférieur à 20, d'un multiple de 200, d'un nombre de la forme a00 avec a impair, d'un nombre de la forme
 *  a,b avec a et b pairs ou 1xx avec xx un nombre pair
 * @author Rémi Angot
 * Référence CM009
*/
export default function Moitie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer'
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1 // niveau de difficulté
  this.tailleDiaporama = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = range1(6)
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // Table de 2
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${a * 2}$`
          texteCorr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`
          setReponse(this, i, a)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 2: // Impair inférieur à 20
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${a * 2 + 1}$`
          texteCorr = `$\\text{La moitié de }${a * 2 + 1
            } \\text{ est } ${texNombre(a + 5 / 10)}$`
          setReponse(this, i, calcul(a + 5 / 10))
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 3: // Table de 200
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre(a * 2 * 100)}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            a * 2 * 100
          )} \\text{ est } ${texNombre(a * 100)}$`
          setReponse(this, i, a * 100)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 4: // a00 avec a impair
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre((a * 2 + 1) * 100)}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            (a * 2 + 1) * 100
          )} \\text{ est } ${texNombre(a * 100 + 50)}$`
          setReponse(this, i, a * 100 + 50)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 5: // a,b avec a et b pairs
          a = randint(2, 9)
          b = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre(
            a * 2 + (b * 2) / 100
          )}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            a * 2 + (b * 2) / 100
          )} \\text{ est } ${texNombre(a + b / 100)}$`
          setReponse(this, i, calcul(a + b / 100))
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline')
          break
        case 6: // 1xx avec xx un nombre pair
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${100 + a * 2}$`
          texteCorr = `$\\text{La moitié de }${100 + a * 2} \\text{ est } ${50 + a
            }$`
          setReponse(this, i, 50 + a)
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
