import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import { randint, choice, texteEnCouleur, reduirePolynomeDegre3, reduireAxPlusB, ecritureAlgebrique, ecritureParentheseSiNegatif, miseEnEvidence } from '../../../modules/outils.js'
export const titre = 'Déterminer le nombre de solutions d’une équation du second degré'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '1/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Trouver le nombre de solutions d'une équation.
 * @author Gilles Mora
 * Référence can1L02
*/
export const uuid = 'c74ea'
export const ref = 'can1L02'
export default function NombreSolutionsSecondDegre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    let a, b, c, d, maFraction
    switch (choice([1, 2])) {
      case 1 :
        a = randint(1, 4) * choice([-1, 1])
        b = randint(-4, 4, 0)
        c = randint(-4, 4, 0)
        d = b * b - 4 * a * c
        this.question = `Donner le nombre de solutions de l'équation  $${reduirePolynomeDegre3(0, a, b, c)}=0$.`

        if (d < 0) {
          this.correction = `Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
    $\\Delta =b^2-4ac=${ecritureParentheseSiNegatif(b)}^2 - 4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${d}$.<br>
    Comme $${d}$ est strictement négatif, l'équation n'a pas de solution.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Il n'est pas nécessaire de faire le calcul du discriminant puisque seul 
          le signe de celui-ci permet de répondre à la question :<br>
          faites deux calculs séparés mentalement : 
          $b^2=${ecritureParentheseSiNegatif(b)}^2=${b ** 2}$ puis 
          $4ac=4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${4 * a * c}$
          et évaluez le signe de leur différence.  `)

          this.reponse = 0
        }
        if (d > 0) {
          this.correction = `Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
    $\\Delta =b^2-4ac=${ecritureParentheseSiNegatif(b)}^2 - 4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${d}$.<br>
    Comme $${d}$ est strictement positif, l'équation a 2 solutions.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
          Il n'est pas nécessaire de faire le calcul du discriminant puisque seul 
          le signe de celui-ci permet de répondre à la question :<br>
    par exemple, si le produit $4\\times a\\times c$ (c'est le cas lorsque $a$ et $c$ sont de signes contraires) est négatif, l'équation aura deux solutions puisque $\\Delta$ sera strictement positif.   
<br>  Dans les autres cas, faites deux calculs séparés mentalement : $b^2=${ecritureParentheseSiNegatif(b)}^2=${b ** 2}$ puis 
$4ac=4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${4 * a * c}$ 
et évaluez le signe de leur différence. `)
          this.reponse = 2
        }
        if (d === 0) {
          this.correction = `Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
            $\\Delta =b^2-4ac=${ecritureParentheseSiNegatif(b)}^2 - 4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${d}$.<br>
            Comme $${d}$ est nul, l'équation a une unique solution.`
          this.correction += texteEnCouleur(`<br> Mentalement : <br>
               Faites deux calculs séparés mentalement : $b^2=${ecritureParentheseSiNegatif(b)}^2=${b ** 2}$ puis 
     $4ac=4 \\times ${ecritureParentheseSiNegatif(a)} \\times ${ecritureParentheseSiNegatif(c)}=${4 * a * c}$.  `)
          this.reponse = 1
        }
        break
      case 2 :
        a = randint(-10, 10, 0)
        b = randint(-5, 5, 0)
        c = randint(-5, 5)
        maFraction = fraction(-c, a)
        if (-c / a > 0) {
          this.question = `Donner le nombre de solutions de l'équation  
       $${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=0$.`
          this.correction = `On isole le carré : <br>
        $\\begin{aligned}
        ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}&=0\\\\
        ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}${miseEnEvidence(ecritureAlgebrique(-c))}&=0${miseEnEvidence(ecritureAlgebrique(-c))}\\\\`
          this.correction += a === 1
            ? ''
            : `\\dfrac{${a}}{${miseEnEvidence(a)}}(${reduireAxPlusB(1, b)})^2&=\\dfrac{${-c}}{${miseEnEvidence(a)}}\\\\`
          this.correction += `             
        (${reduireAxPlusB(1, b)})^2&=${maFraction.texFractionSimplifiee} 
                \\end{aligned}$<br>
        Puisque $${maFraction.texFractionSimplifiee}$ est strictement positif, il y a deux nombres dont le carré est égal à $${maFraction.texFractionSimplifiee}$, donc l'équation a deux solutions. `

          this.reponse = 2
        }
        if (-c / a === 0) {
          if (a === -1) {
            this.question = `Donner le nombre de solutions de l'équation  
       $-(${reduireAxPlusB(1, b)})^2=0$.`
            this.correction = `On isole le carré : <br>
             $\\begin{aligned}
             -(${reduireAxPlusB(1, b)})^2&=0\\\\
             ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2&=0\\\\`
            this.correction += a === 1
              ? ''
              : `\\dfrac{${a}}{${miseEnEvidence(a)}}(${reduireAxPlusB(1, b)})^2&=\\dfrac{${-c}}{${miseEnEvidence(a)}}\\\\`
            this.correction += `              
             (${reduireAxPlusB(1, b)})^2&=${maFraction.texFractionSimplifiee} 
                     \\end{aligned}$<br>
             Il y a un nombre dont le carré est nul, donc l'équation a une solution. `

            this.reponse = 1
          } else {
            this.question = `Donner le nombre de solutions de l'équation  
          $${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2=0$.`
            this.correction = `On isole le carré : <br>
                $\\begin{aligned}
                ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2&=0\\\\`
            this.correction += a === 1
              ? ''
              : `\\dfrac{${a}}{${miseEnEvidence(a)}}(${reduireAxPlusB(1, b)})^2&=\\dfrac{${-c}}{${miseEnEvidence(a)}}\\\\`
            this.correction += `
                (${reduireAxPlusB(1, b)})^2&=${maFraction.texFractionSimplifiee} 
                        \\end{aligned}$<br>
                Il y a un nombre dont le carré est nul, donc l'équation a une solution. `

            this.reponse = 1
          }
        }
        if (-c / a < 0) {
          this.question = `Donner le nombre de solutions de l'équation  
       $${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=0$.`
          this.correction = `On isole le carré : <br>
                 $\\begin{aligned}
                 ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}&=0\\\\
                 ${a === 1 ? '' : a}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}${miseEnEvidence(ecritureAlgebrique(-c))}&=0${miseEnEvidence(ecritureAlgebrique(-c))}\\\\`
          this.correction += a === 1
            ? ''
            : `\\dfrac{${a}}{${miseEnEvidence(a)}}(${reduireAxPlusB(1, b)})^2&=\\dfrac{${-c}}{${miseEnEvidence(a)}}\\\\`
          this.correction += `(${reduireAxPlusB(1, b)})^2&=${maFraction.texFractionSimplifiee} 
                         \\end{aligned}$<br>
                         Puisque $${maFraction.texFractionSimplifiee}$ est strictement négatif, il n'existe pas de nombres réels dont le carré est strictement négatif, donc l'équation n'a pas de solution. `

          this.reponse = 0
        }
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
