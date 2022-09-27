import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, texNombre, texteCentre } from '../../../modules/outils.js'
export const titre = 'Déterminer la fonction dérivée d’une fonction $k/x$ ou $k\\sqrt{x}$'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '21/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
     * Modèle d'exercice très simple pour la course aux nombres
     * @author Gilles Mora
     * Référence
    */
export const uuid = 'e794b'
export const ref = 'can1F12'
export default function CalculFonctionDeriveeFctRef () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let a; let b
    switch (choice([1, 2])) { //
      case 1:// a/x
        a = randint(2, 15) * choice([-1, 1])

        this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}^*$ par : 
            ${texteCentre(`$f(x)=\\dfrac{${a}}{x}$`)}  
            Déterminer la  dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f(x)=\\dfrac{${a}}{x}=${a}\\times \\dfrac{1}{x}$.<br>
          Or  $x\\longmapsto \\dfrac{1}{x}$ a pour dérivée $x\\longmapsto -\\dfrac{1}{x^2}$.<br>
          Par conséquent, $f'(x)=${a}\\times \\left(-\\dfrac{1}{x^2}\\right)=\\dfrac{${-a}}{x^2}$.`

        this.reponse = [`\\dfrac{${-a}}{x^2}`, `-\\dfrac{${a}}{x^2}`, `${a}\\dfrac{-1}{x^2}`]

        break
      case 2:// asqrt(x)
        a = randint(2, 15) * choice([-1, 1])
        b = new Decimal(a).div(2)
        this.question = `Soit $f$ la fonction définie sur $[0;+\\infty[$ par : 
            ${texteCentre(`$f(x)=${a}\\sqrt{x}$`)}  
            Déterminer la  dérivée de la fonction $f$ pour $x\\in ]0;+\\infty[$ .<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `$f(x)=${a}\\sqrt{x}=${a}\\times\\sqrt{x}$.<br>
          Or  $x\\longmapsto \\sqrt{x}$ a pour dérivée $x\\longmapsto \\dfrac{1}{2\\sqrt{x}}$.<br>
          Par conséquent, $f'(x)=${a}\\times \\dfrac{1}{2\\sqrt{x}}=\\dfrac{${a}}{2\\sqrt{x}}=\\dfrac{${texNombre(b, 1)}}{\\sqrt{x}}$.`

        this.reponse = [`\\dfrac{${a}}{2\\sqrt{x}}`, `\\dfrac{${b}}{\\sqrt{x}}`, `${a}\\dfrac{1}{2\\sqrt{x}}`]

        break
    }
  }
}
