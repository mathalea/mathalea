import Exercice from '../../Exercice.js'
import { randint, choice, ecritureAlgebrique, reduirePolynomeDegre3, texteCentre, reduireAxPlusB, ecritureParentheseSiNegatif } from '../../../modules/outils.js'
export const titre = 'Déterminer la fonction dérivée d’une fonction $a/u(x)$'
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
export const uuid = 'c4251'
export const ref = 'can1F18'
export default function CalculFonctionDeriveeAsurU () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a; let m; let p
    switch (choice([1, 2, 3])) {
      case 1:// //a/(mx+p)
        a = randint(-3, 5, [0, 1])
        m = randint(-4, 6, 0)
        p = randint(-5, 5, 0)
        this.question = `Soit $f$ la fonction définie  par : 
            ${texteCentre(`$f(x)=\\dfrac{${a}}{${reduireAxPlusB(m, p)}}$`)}  
            Déterminer la  dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f(x)=\\dfrac{${a}}{${reduireAxPlusB(m, p)}}=${a}\\times \\dfrac{1}{${reduireAxPlusB(m, p)}}$.<br>
          Or  $\\left(\\dfrac{1}{u}\\right)'=\\dfrac{-u'}{u^2}$.<br>
          On a  $u(x)=${reduireAxPlusB(m, p)}$ et $u'(x)=${m}$. On en déduit,  $f'(x)=${a}\\times \\dfrac{-${ecritureParentheseSiNegatif(m)}}{(${reduireAxPlusB(m, p)})^2}=\\dfrac{${-a * m}}{(${reduireAxPlusB(m, p)})^2}$.`

        this.reponse = [`\\dfrac{${-a * m}}{(${-m}x+${-p})^2}`, `\\dfrac{${-a * m}}{(${m}x+${p})^2}`, `${-a}\\times\\dfrac{${m}}{(${m}x+${p})^2}`, `${a}\\times\\dfrac{${-m}}{(${m}x+${p})^2}`, `${-a * m}\\times\\dfrac{1}{(${m}x+${p})^2}`]

        break
      case 2:// //a/(p+mx)
        a = randint(-3, 5, [0, 1])
        m = randint(-4, 6, 0)
        p = randint(-5, 5, 0)
        this.question = `Soit $f$ la fonction définie  par : 
            ${texteCentre(`$f(x)=\\dfrac{${a}}{${p}${ecritureAlgebrique(m)}x}$`)}  
            Déterminer la  dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f(x)=\\dfrac{${a}}{${reduireAxPlusB(m, p)}}=${a}\\times \\dfrac{1}{${reduireAxPlusB(m, p)}}$.<br>
          Or  $\\left(\\dfrac{1}{u}\\right)'=\\dfrac{-u'}{u^2}$.<br>
          On a  $u(x)=${reduireAxPlusB(m, p)}$ et $u'(x)=${m}$. On en déduit,  $f'(x)=${a}\\times \\dfrac{-${ecritureParentheseSiNegatif(m)}}{(${reduireAxPlusB(m, p)})^2}=\\dfrac{${-a * m}}{(${reduireAxPlusB(m, p)})^2}$.`

        this.reponse = [`\\dfrac{${-a * m}}{(${-m}x+${-p})^2}`, `\\dfrac{${-a * m}}{(${m}x+${p})^2}`, `${-a}\\times\\dfrac{${m}}{(${m}x+${p})^2}`, `${a}\\times\\dfrac{${-m}}{(${m}x+${p})^2}`, `${-a * m}\\times\\dfrac{1}{(${m}x+${p})^2}`]

        break

      case 3: // a/(mx^2+p)
        a = randint(-3, 5, [0, 1])
        m = randint(-4, 5, 0)
        p = randint(-10, 10, 0)
        this.question = `Soit $f$ la fonction définie  par : 
                  ${texteCentre(`$f(x)=\\dfrac{${a}}{${reduirePolynomeDegre3(0, m, 0, p)}}$`)}  
                  Déterminer la  dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f(x)=\\dfrac{${a}}{${reduirePolynomeDegre3(0, m, 0, p)}}=${a}\\times \\dfrac{1}{${reduirePolynomeDegre3(0, m, 0, p)}}$.<br>
                       Or  $\\left(\\dfrac{1}{u}\\right)'=\\dfrac{-u'}{u^2}$.<br>
                On a  $u(x)=${reduirePolynomeDegre3(0, m, 0, p)}$ et $u'(x)=${2 * m}x$. On en déduit,  
                $f'(x)= ${a}\\times\\dfrac{-${ecritureParentheseSiNegatif(2 * m)}x}{(${reduirePolynomeDegre3(0, m, 0, p)})^2}=\\dfrac{${-2 * a * m}x}{(${reduirePolynomeDegre3(0, m, 0, p)})^2}$.`

        this.reponse = [`\\dfrac{${-2 * a * m}x}{(${reduirePolynomeDegre3(0, m, 0, p)})^2}`, `\\dfrac{${-2 * a * m}x}{(${reduirePolynomeDegre3(0, -m, 0, -p)})^2}`]
        console.log(this.reponse)
        break
    }
  }
}
