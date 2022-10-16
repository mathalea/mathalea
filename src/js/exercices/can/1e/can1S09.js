import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, choice, texFraction, texNombrec } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'Déterminer une relation de récurrence'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '18/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = '1eb6e'
export const ref = 'can1S09'
export default function RelationRec () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    for (let i = 0, texte, texteCorr, a, b, c, T, proportion, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 1, 2, 3, 4])) { //
        case 1 :// magazine arithmetico-geo
          a = randint(1, 30)
          // u = randint(1, 10) * choice([-1, 1])
          b = calcul(randint(1, 10) * 100)
          c = calcul(randint(5, 20) * 1000)
          texte = `Chaque année, un magazine perd $${a} \\%$  de ses abonnés mais en gagne $${b}$ nouveaux.<br>
          En 2020, ce magazine compte $${c}$ abonnés.
          On note, pour tout $n\\in\\mathbb{N}$, $${s}_{n}$ le nombre d'abonnés en $2020+n$.<br>
          
          `
          if (this.interactif) {
            texte += ` On a alors $${s}_{n+1}=a\\times ${s}_{n}+b$ avec :<br>
            $a=$  `
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
            texte += ' et $b=$'
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          } else {
            texte += ` Donner le premier terme de cette suite et l'expression de $${s}_{n+1}$ en fonction de $${s}_{n}$.  `
          }

          texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-${texNombrec(a / 100)}${s}_{n}}_{\\text{Perte de } ${a} \\%} +${b}=${texNombrec(1 - a / 100)}${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=${texNombrec(1 - a / 100)}${s}_{n}+${b}$.<br>`
          setReponse(this, 2 * i, 1 - a / 100)
          setReponse(this, 2 * i + 1, b)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 2 :// magazine geo
          a = randint(1, 15)
          // u = randint(1, 10) * choice([-1, 1])
          b = calcul(randint(1, 10) * 100)
          c = calcul(randint(5, 20) * 1000)
          texte = `Chaque année, un magazine perd $${a} \\%$  de ses abonnés.<br>
          En 2020, ce magazine compte $${c}$ abonnés.
          On note, pour tout $n\\in\\mathbb{N}$, $${s}_{n}$ le nombre d'abonnés en $2020+n$.<br>
          
          `
          if (this.interactif) {
            texte += ` On a alors $${s}_{n+1}=a\\times ${s}_{n}+b$ avec :<br>
            $a=$  `
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
            texte += ' et $b=$'
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          } else {
            texte += ` Donner le premier terme de cette suite et l'expression de $${s}_{n+1}$ en fonction de $${s}_{n}$.  `
          }

          texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-${texNombrec(a / 100)}${s}_{n}}_{\\text{Perte de } ${a} \\%} =${texNombrec(1 - a / 100)}${s}_{n}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=${texNombrec(1 - a / 100)}${s}_{n}$.<br>`
          setReponse(this, 2 * i, 1 - a / 100)
          setReponse(this, 2 * i + 1, 0)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 3 :// magazine arith
          a = calcul(randint(1, 15) * 100)
          // u = randint(1, 10) * choice([-1, 1])
          b = calcul(randint(1, 10) * 100)
          c = calcul(randint(5, 20) * 1000)
          texte = `Chaque année, un magazine perd $${a}$ abonnés.<br>
          En 2020, ce magazine compte $${c}$ abonnés.
          On note, pour tout $n\\in\\mathbb{N}$, $${s}_{n}$ le nombre d'abonnés en $2020+n$.<br>
          
          `
          if (this.interactif) {
            texte += ` On a alors $${s}_{n+1}=a\\times ${s}_{n}+b$ avec :<br>
            $a=$  `
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
            texte += ' et $b=$'
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          } else {
            texte += ` Donner le premier terme de cette suite et l'expression de $${s}_{n+1}$ en fonction de $${s}_{n}$.  `
          }

          texteCorr = `On a $${s}_{n+1}=${s}_{n}-${a}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=${s}_{n}-${a}$.<br>`
          setReponse(this, 2 * i, 1)
          setReponse(this, 2 * i + 1, -a)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break

        case 4 :// magazine arith/geo avec tiers....
          proportion = ['le quart', 'le tiers', 'le dixième', 'le cinquième', 'la moitié']//
          a = calcul(randint(1, 15) * 100)
          // u = randint(1, 10) * choice([-1, 1])
          b = calcul(randint(1, 10) * 100)
          c = calcul(randint(5, 20) * 1000)
          T = choice(proportion)
          texte = `Chaque année, un magazine perd ${T}  de ses abonnés mais en gagne $${b}$ nouveaux.<br>
          En 2020, ce magazine compte $${c}$ abonnés.
          On note, pour tout $n\\in\\mathbb{N}$, $${s}_{n}$ le nombre d'abonnés en $2020+n$.<br>
          
          `
          if (this.interactif) {
            texte += ` On a alors $${s}_{n+1}=a\\times ${s}_{n}+b$ avec :<br>
            $a=$  `
            texte += ajouteChampTexteMathLive(this, 2 * i, 'largeur15 inline')
            texte += ' et $b=$'
            texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur15 inline')
          } else {
            texte += ` Donner le premier terme de cette suite et l'expression de $${s}_{n+1}$ en fonction de $${s}_{n}$.  `
          }
          if (T === 'le quart') {
            texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-\\dfrac{1}{4}${s}_{n}}_{\\text{Perte du quart }} +${b}=0,75${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=0,75${s}_{n}+${b}$.<br>`
          }
          if (T === 'le tiers') {
            texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-\\dfrac{1}{3}${s}_{n}}_{\\text{Perte du tiers }} +${b}=\\dfrac{2}{3}${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=\\dfrac{2}{3}${s}_{n}+${b}$.<br>`
          }
          if (T === 'le cinquième') {
            texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-\\dfrac{1}{5}${s}_{n}}_{\\text{Perte du cinquième }} +${b}=0,8${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=0,8${s}_{n}+${b}$.<br>`
          }
          if (T === 'le dixième') {
            texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-\\dfrac{1}{10}${s}_{n}}_{\\text{Perte du dixième }} +${b}=0,9${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=0,9${s}_{n}+${b}$.<br>`
          }
          if (T === 'la moitié') {
            texteCorr = `On a $${s}_{n+1}=\\underbrace{${s}_{n}-\\dfrac{1}{2}${s}_{n}}_{\\text{Perte de la moitié }} +${b}=0,5${s}_{n}+${b}$.<br>

          Le premier terme de la suite est $${s}_{0}=${c}$ et  $${s}_{n+1}=0,5${s}_{n}+${b}$.<br>`
          };

          if (T === 'la moitié') {
            setReponse(this, 2 * i, ['0,5', `${texFraction(1, 2)}`])
            setReponse(this, 2 * i + 1, b)
          }

          if (T === 'le quart') {
            setReponse(this, 2 * i, ['0,75', `${texFraction(3, 4)}`])
            setReponse(this, 2 * i + 1, b)
          }
          if (T === 'le tiers') {
            setReponse(this, 2 * i, [`${texFraction(2, 3)}`])
            setReponse(this, 2 * i + 1, b)
          }
          if (T === 'le cinquième') {
            setReponse(this, 2 * i, ['0,8', `${texFraction(4, 5)}`])
            setReponse(this, 2 * i + 1, b)
          }
          if (T === 'le dixième') {
            setReponse(this, 2 * i, ['0,9', `${texFraction(9, 10)}`])
            setReponse(this, 2 * i + 1, b)
          }
          ;
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break
      }

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
