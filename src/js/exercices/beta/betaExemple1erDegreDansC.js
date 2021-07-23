import { listeQuestionsToContenu, randint, combinaisonListes, fractionSimplifiee,abs } from '../../modules/outils.js'

import Exercice from '../Exercice.js'
import { complex, multiply } from 'mathjs'
export const titre = 'Equation du premier degré dans C'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre dans $\\mathbb{C}$ les équations ci-dessous. On écrira les solutions sous forme algébrique.'
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.typeExercice = 'XCas'
  this.spacingCorr = 2
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestionsDisponibles = ['type1'] // On créé 2 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr,zsol,z2, z1,z1m,z2m,z2n,z1c,fr,fi, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { 
        case 'type1':
          z1 = complex(randint(-20,20,0), randint(-20,20,0))    // L'énoncé est du type z1 * z + z2 = 0
          z2 = complex(randint(-20,20,0), randint(-20,20,0))
          z2n = z2.neg()                                        // - z2
          z1c = z1.conjugate()                                  // conjugué de z1
          zsol = multiply(z2.neg(), z1.inverse())               // la solution est - z2 / z1
          z1m =  multiply(z1c, z1)  
          z2m =  multiply(z1c, z2n)
          fr = fractionSimplifiee(z2m.re, z1m.re) // partie réelle de la solution sous forme de fraction simplifiée
          fi = fractionSimplifiee(z2m.im, z1m.re) // partie imaginaire
          // Enoncé                     
          texte = `$(${z1})z${"+".repeat(z2.re > 0)}${z2}=0$`   // ajout d'un signe + si partie réelle positive
          // Corrigé
          texteCorr = `Passons le terme constant du côté droit de l'équation :`
          texteCorr += `<br>$(${z1})z=${z2n}$`
          texteCorr += `<br>Ce qui donne : $z = \\dfrac{${z2n}}{${z1}}$`
          texteCorr += `<br>Pour faire disparaitre le $i$ du dénominateur, utilisons le conjugué $\\overline{${z1}}=${z1c}$ du dénominateur :`
          texteCorr += `<br>$z = \\dfrac{${z2n}}{${z1}}\\times \\dfrac{${z1c}}{${z1c}}$`
          texteCorr += `<br>Or $(${z1})(${z1c})=${z1m}$ `
          texteCorr += `et $(${z2n})(${z1c})=${z2m}$`
          texteCorr += `<br>On en déduit que :`
          texteCorr += `<br>$z = \\dfrac{${z2m}}{${z1m}} = \\dfrac{${fr[0]}}{${fr[1]}}${"-+"[+(fi[0] > 0)]}\\dfrac{${abs(fi[0])}}{${fi[1]}}\\times i$`
          break
        case 'type2':
          break
        case 'type3':
          break
      }

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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
