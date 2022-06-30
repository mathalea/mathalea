import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenu, sp, texteCentre, ecritureAlgebrique } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer un vecteur directeur avec une équation cartésienne'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '29/06/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G07
 *
*/
export default function VecteurDirEqCart () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur11 inline'
  this.tailleDiaporama = 1

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte; let texteCorr; let a; let b; let c
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(-9, 9)
      b = randint(-9, 9, 0)
      c = randint(-5, 5, 0)

      texte = ` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, la droite $d$ a pour équation :
    ${texteCentre(`$${a}x${ecritureAlgebrique(b)}y${ecritureAlgebrique(c)}=0$`)}
 Les coordonnées d'un vecteur directeur $\\vec{u}$ de la droite $d$   sont :<br>`

      if (this.interactif) {
        texte += '$\\Bigg($' + ajouteChampTexteMathLive(this, 2 * i, 'largeur11 inline')
        texte += ` ${sp(1)} ;  `
        texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur11 inline') + '$\\Bigg)$'

        setReponse(this, 2 * i, -b)
        setReponse(this, 2 * i + 1, a)
      }
      texteCorr = `Si l'équation est de la forme $ax+by+c=0$, on sait d'après le cours, qu'un vecteur directeur $\\vec{u}$ a pour coordonnées $\\vec{u}(-b;a)$.<br>
    On en déduit qu'un vecteur directeur de $d$ est $(${-b};${a})$.`

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
