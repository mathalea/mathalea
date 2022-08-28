import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenuSansNumero, choice, sp, calcul, texFraction, rienSi1, ecritureAlgebrique, pgcd, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Reconnaître une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can3F09
*/
export const uuid = 'b60f4'
export const ref = 'can3F09'
export default function ReconnaitreFonctionAffine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.formatChampTexte = 'largeur15 inline'
  this.formatInteractif = 'calcul'
  this.nbQuestions = 1
  this.nouvelleVersion = function () {
    this.listeCorrections = []
    this.listeQuestions = []
    let a, b, c
    switch (choice([1, 2, 3])) { //
      case 1 :// b+ax
        a = randint(1, 5)
        b = randint(-9, 9)
        if (a === 1) {
          if (b === 0) {
            this.listeQuestions.push(`Soit $f(x)=x$.<br>
          La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>    Les valeurs de $a$ et de $b$ sont  :<br> $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
            ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
            this.listeCorrections.push(`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$ (attention, $x=1x$) et la valeur de $b$ est la constante. <br>
            $f(x)=\\underbrace{${a}}_{a}x$`)
          } else {
            this.listeQuestions.push(`Soit $f(x)=${b}+x$.<br>
        La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>   Les valeurs de $a$ et de $b$ sont  :<br> $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
          ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
            this.listeCorrections.push(`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$ (attention, $x=1x$) et la valeur de $b$ est la constante. <br>
          $f(x)=${b}+${a}x=\\underbrace{${a}}_{a}x+\\underbrace{${ecritureParentheseSiNegatif(b)}}_{b}$`)
          }
        } else {
          if (b === 0) {
            this.listeQuestions.push(`Soit $f(x)=x$.<br>
                La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>       Les valeurs de $a$ et de $b$ sont  :<br>       $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
                  ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
            this.listeCorrections.push(`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$ (attention, $x=1x$) et la valeur de $b$ est la constante. <br>
                  $f(x)=\\underbrace{${a}}_{a}x$`)
          } else {
            this.listeQuestions.push(`Soit $f(x)=${b}+${a}x$.<br>
            La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>  Les valeurs de $a$ et de $b$ sont  :<br>
       $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
         ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
            this.listeCorrections.push(`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$ (attention, $x=1x$) et la valeur de $b$ est la constante. <br>
        $f(x)=${b}+${a}x=\\underbrace{${a}}_{a}x+\\underbrace{${ecritureParentheseSiNegatif(b)}}_{b}$`)
          }
        }
        setReponse(this, 0, a)
        setReponse(this, 1, b)

        break
      case 2 :// a/bx +c
        a = randint(-9, 9, 0)
        b = randint(2, 10)
        c = randint(-9, 9, 0)
        while (pgcd(a, b) !== 1) { a = randint(-5, 5, 0) }
        if (a === -1) {
          this.listeQuestions.push(`Soit $f(x)=\\dfrac{-x}{${b}}${ecritureAlgebrique(c)}$.<br>
        La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>   Les valeurs de $a$ et de $b$ sont  :<br>  $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
          ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
        } else {
          this.listeQuestions.push(`Soit $f(x)=\\dfrac{${rienSi1(a)}x}{${b}}${ecritureAlgebrique(c)}$.<br>
            La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>Les valeurs de $a$ et de $b$ sont  :<br>   $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
         ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
        }
        setReponse(this, 0, [`${texFraction(a, b)}`, `${texFraction(-a, -b)}`, calcul(a / b), calcul(-a / (-b))])
        setReponse(this, 1, c)
        this.listeCorrections.push(`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$ (attention, $\\dfrac{ax}{b}=\\dfrac{a}{b}x$) et la valeur de $b$ est la constante.<br>
        $f(x)=\\dfrac{${rienSi1(a)}x}{${b}}=\\underbrace{\\dfrac{${a}}{${b}}}_{a}x+\\underbrace{${ecritureParentheseSiNegatif(c)}}_{b}$`)
        break

      case 3 :// (ax+c)/b)
        a = randint(-9, 9, 0)
        b = randint(2, 10)
        c = randint(-9, 9, 0)
        while (pgcd(a, b) !== 1 | pgcd(c, b) !== 1) {
          a = randint(-9, 9, 0)
          c = randint(-9, 9, 0)
          b = randint(2, 10)
        }
        if (a === -1) {
          this.listeQuestions.push(`Soit $f(x)=\\dfrac{-x${ecritureAlgebrique(c)}}{${b}}$.<br>
        La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>   Les valeurs de $a$ et de $b$ sont  :<br>  $a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
          ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
        } else {
          this.listeQuestions.push(`Soit $f(x)=\\dfrac{${rienSi1(a)}x${ecritureAlgebrique(c)}}{${b}}$.<br>
            La fonction $f$ est une fonction affine de la forme $f(x)=ax+b$.<br>      Les valeurs de $a$ et de $b$ sont  :<br>$a=$ ${this.interactif ? ajouteChampTexteMathLive(this, 0, 'largeur10 inline') + sp(2) : sp(3)} ${sp(3)} et${sp(3)} $b=$
         ${this.interactif ? ajouteChampTexteMathLive(this, 1, 'largeur10 inline') + sp(2) : sp(2)} `)
        }
        setReponse(this, 0, [`${texFraction(a, b)}`, `${texFraction(-a, -b)}`, calcul(a / b), calcul(-a / (-b))])
        setReponse(this, 1, [`${texFraction(c, b)}`, `${texFraction(-c, -b)}`, calcul(c / b), calcul(-c / (-b))])

        this.listeCorrections = [`On identifie les valeurs de $a$ et de $b$ : la valeur de $a$ est le coefficient devant $x$  et la valeur de $b$ est la constante.<br>
        $f(x)=\\dfrac{${rienSi1(a)}x${ecritureAlgebrique(c)}}{${b}}=\\underbrace{\\dfrac{${a}}{${b}}}_{a}x+\\underbrace{\\dfrac{${c}}{${b}}}_{b}$`]

        break
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
