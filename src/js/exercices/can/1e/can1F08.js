import Exercice from '../../Exercice.js'
import Decimal from 'decimal.js/decimal.mjs'
import { randint, choice, ecritureAlgebrique, ecritureAlgebriqueSauf1, texNombre, reduireAxPlusB, texteCentre } from '../../../modules/outils.js'
import FractionX from '../../../modules/FractionEtendue.js'
export const titre = 'Déterminer la fonction dérivée d’une fonction affine'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '20/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function CalculFonctionDeriveeAffine () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur15 inline'
  this.tailleDiaporama = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    let m, p, f
    switch (choice([1, 2, 3])) { //
      case 1:// mx+p
        m = choice([randint(1, 10) * choice([-1, 1]), (new Decimal(randint(-19, 19, [0, -10, 10]))).div(10)])
        p = choice([randint(1, 10) * choice([-1, 1]), (new Decimal(randint(-19, 19, [0, -10, 10]))).div(10)])
        f = new FractionX(m * 10, 10)
        this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        ${texteCentre(`$f(x)=${reduireAxPlusB(m, p)}$`)}  
        Déterminer la fonction dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=${texNombre(m, 1)}$ et $p=${texNombre(p, 1)}$.<br>
        La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=${texNombre(m, 1)}$. `

        this.reponse = [m, f.texFraction]

        break
      case 2:// p+mx
        m = choice([randint(2, 10) * choice([-1, 1]), (new Decimal(randint(-19, 19, [0, -10, 10]))).div(10)])
        p = choice([randint(1, 10) * choice([-1, 1]), (new Decimal(randint(-19, 19, [0, -10, 10]))).div(10)])
        f = new FractionX(m * 10, 10)
        this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        ${texteCentre(`$f(x)=${texNombre(p, 1)}${ecritureAlgebrique(m)}x$`)}  
        Déterminer la fonction dérivée de la fonction $f$.<br>     `
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=${texNombre(m, 1)}$ et $p=${texNombre(p, 1)}$.<br>
        La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=${texNombre(m, 1)}$. `

        this.reponse = [m, f.texFraction]

        break
      case 3:// x+p
        p = choice([randint(1, 10) * choice([-1, 1]), (new Decimal(randint(-19, 19, [0, -10, 10]))).div(10)])
        m = choice([-1, 1])
        if (choice([true, false])) {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        ${texteCentre(`$f(x)=${reduireAxPlusB(m, p)}$`)}  
        Déterminer la fonction dérivée de la fonction $f$.<br>     `
        } else {
          this.question = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : 
        ${texteCentre(`$f(x)=${texNombre(p, 1)}${ecritureAlgebriqueSauf1(m)}x$`)}  
        Déterminer la fonction dérivée de la fonction $f$.<br>     `
        }
        if (this.interactif) { this.question += '$f\'(x)=$' }
        this.correction = `On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=${m}$ et $p=${texNombre(p, 1)}$.<br>
        La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=${m}$. `

        this.reponse = m

        break
    }
  }
}
