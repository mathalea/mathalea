import Exercice from '../../Exercice.js'
import { randint, choice, ecritureParentheseSiNegatif, texNombrec } from '../../../modules/outils.js'
export const titre = 'Calculer la raison d’une suite arithmétique/géométrique*'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '18/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'baa9f'
export const ref = 'can1S08'
export default function CalculRaison2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let u, i, v, r, q, n, choix
    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    switch (choice(['a', 'b'])) { // 'b', 'c', 'd'
      case 'a':// suite arithmétique
        u = randint(-12, 12, 0)
        r = randint(-10, 10, 0)
        n = randint(2, 10)
        v = u + n * r
        i = randint(0, 10)
        this.question = `Soit $(${s}_n)$ une suite arithmétique telle que :<br>
$${s}_{${i}}=${u}$ et  $${s}_{${i + n}}=${v}$.<br>
Donner la raison $r$ de cette suite.`
        if (!this.interactif) {
          this.question += ''
        } else {
          this.question += '<br> $r=$'
        }
        this.correction = `La suite $(${s}_n)$ est une suite arithmétique  de raison $r$. Donc, pour tout entier naturel $n$ et $p$, on a : $u_n=u_p+(n-p)r$.<br>
        Ainsi, $${s}_{${i + n}}=${s}_{${i}}+(${i + n}-${i})r=${s}_{${i}}+${n}r$.<br>
       On en déduit :  $r=\\dfrac{${s}_{${i + n}}-${s}_{${i}}}{${n}}=\\dfrac{${v}-${ecritureParentheseSiNegatif(u)}}{${n}}=${r}$.`

        this.reponse = r
        break
      case 'b':// suite géométrique
        choix = choice([1, 2, 3])//
        if (choix === 1) { // q>0 avec q=2,3,10
          u = randint(1, 10)
          q = choice([2, 3, 10])
          // n = 2
          v = u * q ** 2
          i = randint(0, 10)
          this.question = `Soit $(${s}_n)$ une suite géométrique de raison positive telle que :<br>
$${s}_{${i}}=${u}$ et  $${s}_{${i + 2}}=${v}$.<br>
Donner la raison $q$ de cette suite.`
          if (!this.interactif) {
            this.question += ''
          } else {
            this.question += '<br> $q=$'
          }
          this.correction = `La suite $(${s}_n)$ est une suite géométrique  de raison $q$ positive. Donc, pour tout entier naturel $n$ et $p$, on a : $u_n=u_p\\times q^{n-p}$.<br>
        Ainsi, $${s}_{${i + 2}}=${s}_{${i}}\\times q^{${i + 2}-${i}}=${s}_{${i}}\\times q^{2}$.<br>
       On en déduit :  $q^2=\\dfrac{${s}_{${i + 2}}}{${s}_{${i}}}=\\dfrac{${v}}{${u}}=${texNombrec(q * q)}$.<br>
       Puisque $q$ est un nombre positif, on obtient : $q=${texNombrec(q)}$.`

          this.reponse = q
        }
        if (choix === 2) { // q<0 avec q=-2,-3,-10
          u = randint(1, 10)
          q = choice([2, 3, 10])
          // n = 2
          v = u * q ** 2
          i = randint(0, 10)
          this.question = `Soit $(${s}_n)$ une suite géométrique de raison négative telle que :<br>
    $${s}_{${i}}=${u}$ et  $${s}_{${i + 2}}=${v}$.<br>
    Donner la raison $q$ de cette suite.`
          if (!this.interactif) {
            this.question += ''
          } else {
            this.question += '<br> $q=$'
          }
          this.correction = `La suite $(${s}_n)$ est une suite géométrique  de raison $q$ positive. Donc, pour tout entier naturel $n$ et $p$, on a : $u_n=u_p\\times q^{n-p}$.<br>
            Ainsi, $${s}_{${i + 2}}=${s}_{${i}}\\times q^{${i + 2}-${i}}=${s}_{${i}}\\times q^{2}$.<br>
           On en déduit :  $q^2=\\dfrac{${s}_{${i + 2}}}{${s}_{${i}}}=\\dfrac{${v}}{${u}}=${q * q}$.<br>
           Puisque $q$ est un nombre négatif, on obtient : $q=${-q}$.`

          this.reponse = -q
        }
        if (choix === 3) { // q^3
          u = randint(1, 3) * choice([-1, 1])
          q = choice([-3, -2, 2, 3])
          v = u * q ** 3
          i = randint(0, 10)
          this.question = `Soit $(${s}_n)$ une suite géométrique  telle que :<br>
  $${s}_{${i}}=${u}$ et  $${s}_{${i + 3}}=${v}$.<br>
  Donner la raison $q$ de cette suite.`
          if (!this.interactif) {
            this.question += ''
          } else {
            this.question += '<br> $q=$'
          }
          this.correction = `La suite $(${s}_n)$ est une suite géométrique  de raison $q$ positive. Donc, pour tout entier naturel $n$ et $p$, on a : $u_n=u_p\\times q^{n-p}$.<br>
          Ainsi, $${s}_{${i + 3}}=${s}_{${i}}\\times q^{${i + 3}-${i}}=${s}_{${i}}\\times q^{3}$.<br>
         On en déduit :  $q^3=\\dfrac{${s}_{${i + 3}}}{${s}_{${i}}}=\\dfrac{${v}}{${u}}=${q ** 3}$.<br>
         On obtient : $q=${q}$.`

          this.reponse = q
        };
    }
  }
}
