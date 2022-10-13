import Exercice from '../../Exercice.js'
import { randint } from '../../../modules/outils/entiers.js'
import { choice } from '../../../modules/outils/arrays.js'
import { ecritureAlgebrique } from '../../../modules/outils/ecritures.js'
import { reduireAxPlusB, reduirePolynomeDegre3 } from '../../../modules/outils/reductions.js'
import { texteCentre } from '../../../modules/outils/contextSensitif.js'
export const titre = 'Calculer une dérivée et écrire le résultat sous la forme d’un quotient'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '24/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
     * Modèle d'exercice très simple pour la course aux nombres
     * @author Gilles Mora
     * Référence
    */
export const uuid = 'c7f8e'
export const ref = 'can1F19'
export default function CalculFonctionDeriveeQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let m; let p; let a
    switch (choice([1, 2, 3, 4, 5, 6, 7])) {
      case 1:// //mx+p+a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
            ${texteCentre(`$f(x)=${reduireAxPlusB(m, p)}+\\dfrac{${a}}{x}$`)}  
            Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u+v$ avec $u(x)=${reduireAxPlusB(m, p)}$ et $v(x)=\\dfrac{${a}}{x}$.<br>
                 On a $u'(x)=${m}$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
          Ainsi,  
          $f'(x)= ${m}+\\dfrac{-${a}}{x^2}=\\dfrac{${m}x^2}{x^2}+\\dfrac{${-a}}{x^2}=\\dfrac{${m}x^2-${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${m}x^2-${a}}{x^2}`]

        break

      case 2:// //mx+p-a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
              ${texteCentre(`$f(x)=${reduireAxPlusB(m, p)}-\\dfrac{${a}}{x}$`)}  
              Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u-v$ avec $u(x)=${reduireAxPlusB(m, p)}$ et $v(x)=\\dfrac{${a}}{x}$.<br>
                   On a $u'(x)=${m}$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
            Ainsi,  
            $f'(x)= ${m}-\\dfrac{-${a}}{x^2}=\\dfrac{${m}x^2}{x^2}-\\dfrac{${-a}}{x^2}=\\dfrac{${m}x^2+${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${m}x^2+${a}}{x^2}`]

        break

      case 3:// //p+mx+a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
                ${texteCentre(`$f(x)=${p}${ecritureAlgebrique(m)}x+\\dfrac{${a}}{x}$`)}  
                Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u+v$ avec $u(x)=${p}${ecritureAlgebrique(m)}x$ et $v(x)=\\dfrac{${a}}{x}$.<br>
                     On a $u'(x)=${m}$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
              Ainsi,  
              $f'(x)= ${m}+\\dfrac{-${a}}{x^2}=\\dfrac{${m}x^2}{x^2}+\\dfrac{${-a}}{x^2}=\\dfrac{${m}x^2-${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${m}x^2-${a}}{x^2}`]

        break
      case 4:// //p+mx-a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
                  ${texteCentre(`$f(x)=${p}${ecritureAlgebrique(m)}x-\\dfrac{${a}}{x}$`)}  
                  Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u+v$ avec $u(x)=${p}${ecritureAlgebrique(m)}x$ et $v(x)=\\dfrac{${a}}{x}$.<br>
                       On a $u'(x)=${m}$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
                Ainsi,  
                $f'(x)= ${m}+\\dfrac{-${a}}{x^2}=\\dfrac{${m}x^2}{x^2}-\\dfrac{${-a}}{x^2}=\\dfrac{${m}x^2+${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${m}x^2+${a}}{x^2}`]

        break

      case 5:// //mx^2+p+a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
            ${texteCentre(`$f(x)=${reduirePolynomeDegre3(0, m, 0, p)}+\\dfrac{${a}}{x}$`)}  
            Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u+v$ avec $u(x)=${reduirePolynomeDegre3(0, m, 0, p)}$ et $v(x)=\\dfrac{${a}}{x}$.<br>
                 On a $u'(x)=${2 * m}x$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
          Ainsi,  
          $f'(x)= ${2 * m}x+\\dfrac{-${a}}{x^2}=\\dfrac{${2 * m}x^3}{x^2}+\\dfrac{${-a}}{x^2}=\\dfrac{${2 * m}x^3-${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${2 * m}x^3-${a}}{x^2}`]

        break
      case 6:// //p+mx^2+a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
          ${texteCentre(`$f(x)=${p}${ecritureAlgebrique(m)}x^2+\\dfrac{${a}}{x}$`)}  
          Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u+v$ avec $u(x)=${p}${ecritureAlgebrique(m)}x^2$ et $v(x)=\\dfrac{${a}}{x}$.<br>
               On a $u'(x)=${2 * m}x$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
        Ainsi,  
        $f'(x)= ${2 * m}x+\\dfrac{-${a}}{x^2}=\\dfrac{${2 * m}x^3}{x^2}+\\dfrac{${-a}}{x^2}=\\dfrac{${2 * m}x^3-${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${2 * m}x^3-${a}}{x^2}`]

        break

      case 7:// //mx^2+p-a/x
        a = randint(1, 10)
        m = randint(-10, 10, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
        ${texteCentre(`$f(x)=${reduirePolynomeDegre3(0, m, 0, p)}-\\dfrac{${a}}{x}$`)}  
        Déterminer la  dérivée de la fonction $f$ (écrire le résultat sous la fomre d'un seul quotient).<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f$est de la forme $u-v$ avec $u(x)=${reduirePolynomeDegre3(0, m, 0, p)}$ et $v(x)=\\dfrac{${a}}{x}$.<br>
             On a $u'(x)=${2 * m}x$ et $v'(x)=\\dfrac{-${a}}{x^2}$.<br>
      Ainsi,  
      $f'(x)= ${2 * m}x-\\dfrac{-${a}}{x^2}=\\dfrac{${2 * m}x^3}{x^2}-\\dfrac{${-a}}{x^2}=\\dfrac{${2 * m}x^3+${a}}{x^2}$.`

        this.reponse = [`\\dfrac{${2 * m}x^3+${a}}{x^2}`]

        break
    }
  }
}
