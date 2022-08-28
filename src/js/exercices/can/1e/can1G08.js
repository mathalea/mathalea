import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenu, sp, texteCentre, ecritureAlgebrique, egal, rienSi1, ecritureAlgebriqueSauf1 } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Déterminer un vecteur normal avec une équation cartésienne'
export const interactifReady = true
export const interactifType = 'custom'
export const dateDePublication = '08/07/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora avec Jean-Claude pour la partie interactive
 * Référence can1G08
 *
*/
export const uuid = 'e7919'
export const ref = 'can1G08'
export default function VecteurNormEqCart () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur11 inline'
  this.tailleDiaporama = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte; let texteCorr

    for (let i = 0, a, b, c, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-5, 5, 0)

      texte = ` Dans un repère orthonormé $(O;\\vec i,\\vec j)$, la droite $d$ a pour équation :
    ${texteCentre(`$${rienSi1(a)}x${ecritureAlgebriqueSauf1(b)}y${ecritureAlgebrique(c)}=0$`)}
 Les coordonnées d'un vecteur normal $\\vec{u}$ de la droite $d$   sont :<br>`

      if (this.interactif) {
        texte += '$\\Bigg($' + ajouteChampTexteMathLive(this, 2 * i, 'largeur11 inline')
        texte += ` ${sp(1)} ;  `
        texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur11 inline') + '$\\Bigg)$'

        setReponse(this, 2 * i, a)
        setReponse(this, 2 * i + 1, b)
      }
      texteCorr = `Si l'équation est de la forme $ax+by+c=0$, on sait d'après le cours, qu'un vecteur normal $\\vec{u}$ a pour coordonnées $(a;b)$.<br>
    On en déduit qu'un vecteur normal de $d$ est $\\vec{u}(${a};${b})$.<br>
     Tout vecteur colinéaire à $\\vec{u}$ est aussi un vecteur normal de $d$.`

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.correctionInteractive = i => {
    const champTexte1 = document.getElementById(`champTexteEx${this.numeroExercice}Q${2 * i}`)
    const champTexte2 = document.getElementById(`champTexteEx${this.numeroExercice}Q${2 * i + 1}`)
    const divFeedback1 = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${2 * i}`)
    const divFeedback2 = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${2 * i + 1}`)
    let saisie1 = champTexte1.value.replace(',', '.')
    let saisie2 = champTexte2.value.replace(',', '.')
    saisie1 = saisie1.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
    saisie2 = saisie2.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
    const x0 = this.autoCorrection[2 * i].reponse.valeur[0]
    const y0 = this.autoCorrection[2 * i + 1].reponse.valeur[0]
    const x = Number(saisie1)
    const y = Number(saisie2)
    let resultat
    if (egal(x / x0, y / y0) && !(x === 0 && y === 0)) {
      divFeedback1.innerHTML = '😎'
      divFeedback2.innerHTML = '😎'
      resultat = 'OK'
    } else {
      divFeedback1.innerHTML = '☹️'
      divFeedback2.innerHTML = '☹️'
      resultat = 'KO'
    }
    return resultat
  }
}
