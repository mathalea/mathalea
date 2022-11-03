import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenu, reduireAxPlusB, rienSi1 } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Trouver les racines à partir d’une forme factorisée'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Gilles Mora
 * Référence can1L03
*/
export const uuid = 'a23a1'
export const ref = 'can1L03'
export default function RacinesPoly () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte, texteCorr
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(-9, 9, 0)
      const x1 = randint(-9, 9)
      const x2 = randint(-9, 9, [0, x1])
      if (x1 === 0) {
        texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        $f(x)=${rienSi1(a)}x(${reduireAxPlusB(1, -x2)})$. <br>`
      } else {
        texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        $f(x)=${rienSi1(a)}(${reduireAxPlusB(1, -x1)})(${reduireAxPlusB(1, -x2)})$. <br>`
      }
      if (!this.interactif) {
        texte += 'Déterminer les racines de $f$.'
      } else {
        if (x1 < x2) {
          texte += 'Donner les racines de $f$ dans l\'ordre croissant.'
          texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
          texte += ' et '
          texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          setReponse(this, 2 * i, x1)
          setReponse(this, 2 * i + 1, x2)
        } else {
          texte += 'Donner les racines de $f$ dans l\'ordre croissant.'
          texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
          texte += ' et '
          texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          setReponse(this, 2 * i, x2)
          setReponse(this, 2 * i + 1, x1)
        }
      }
      texteCorr = `$f$ est une fonction polynôme du second degré écrite sous forme factorisée $a(x-x_1)(x-x_2)$.<br>
      Les racines sont donc $x_1=${x1}$ et $x_2=${x2}$.`
      if (this.questionJamaisPosee(i, a, x1, x2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    this.canEnonce = texte
    this.canReponseACompleter = ''
  }
}
