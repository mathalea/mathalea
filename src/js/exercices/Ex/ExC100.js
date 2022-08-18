import { listeQuestionsToContenu, randint, fractionSimplifiee, abs, texFraction, miseEnEvidence } from '../../modules/outils.js'

import Exercice from '../Exercice.js'
import { complex, multiply } from 'mathjs'
export const titre = 'Equation du premier degré dans C'
export const dateDePublication = '30/10/2021'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence ExC100
*/
export default function EquationDuPremierDegreDansC () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre dans $\\mathbb{C}$ les équations ci-dessous. On écrira les solutions sous forme algébrique.'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.spacingCorr = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, z2, z1, z1m, z2m, z2n, z1c, fr, fi, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      z1 = complex(randint(-20, 20, 0), randint(-20, 20, 0)) // L'énoncé est du type z1 * z + z2 = 0
      z2 = complex(randint(-20, 20, 0), randint(-20, 20, 0))
      z2n = z2.neg() // - z2
      z1c = z1.conjugate() // conjugué de z1
      // zsol = multiply(z2.neg(), z1.inverse()) // la solution est - z2 / z1
      z1m = multiply(z1c, z1)
      z2m = multiply(z1c, z2n)
      fr = fractionSimplifiee(z2m.re, z1m.re) // partie réelle de la solution sous forme de fraction simplifiée
      fi = fractionSimplifiee(z2m.im, z1m.re) // partie imaginaire

      // Enoncé
      texte = `$(${z1})z${'+'.repeat(z2.re > 0)}${z2}=0$` // ajout d'un signe + si partie réelle positive
      // Corrigé
      texteCorr = 'Passons le terme constant du côté droit de l\'équation :'
      texteCorr += `<br>$(${z1})z=${z2n}$`
      texteCorr += `<br>Ce qui donne : $z = \\dfrac{${z2n}}{${z1}}$`
      texteCorr += `<br>Pour faire disparaître le $i$ du dénominateur, utilisons le conjugué $\\overline{${z1}}=${z1c}$ du dénominateur :`
      texteCorr += `<br>$z = ${texFraction(z2n, z1)}\\times ${miseEnEvidence(texFraction(z1c, z1c))}$`
      texteCorr += `<br>Or $(${z1})(${z1c})=${z1m}$ `
      texteCorr += `et $(${z2n})(${z1c})=${z2m}$`
      texteCorr += '<br>On en déduit que :'
      texteCorr += `<br>$z = ${texFraction(z2m, z1m)} = ${texFraction(fr[0], fr[1])}${'-+'[+(fi[0] > 0)]}${texFraction(abs(fi[0]), fi[1])}\\times i$`

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
