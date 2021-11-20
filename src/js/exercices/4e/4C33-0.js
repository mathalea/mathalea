import Exercice from '../Exercice.js'
import { randint, combinaisonListes, listeQuestionsToContenu } from '../../modules/outils.js'
export const titre = 'Utiliser la notation puissance'

export const dateDePublication = '20/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Passer d'un produit à la notation puissance et inversement
 * @author Guillaume Valmont
 * Référence 4C33-0
*/
export default function NotationPuissance () {
  Exercice.call(this)
  this.nbQuestions = 4

  this.besoinFormulaireNumerique = ['Type de calcul', 3, '1 : Écrire sous forme de produit\n2 : Écrire sous forme de puissance\n3 : Mélange'] // le paramètre sera numérique de valeur max 2 (le 2 en vert)
  this.sup = 1
  this.besoinFormulaire2Numerique = ['Exposant', 3, '1 : Positif\n2 : Négatif\n3 : Mélange']
  this.sup2 = 2
  this.besoinFormulaire3CaseACocher = ['Grands nombres']
  this.sup3 = false

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []

    let listeTypeDeQuestions
    switch (this.sup) {
      case 1:
        this.consigne = 'Donner la signification des écritures suivantes'
        listeTypeDeQuestions = ['produit']
        break
      case 2:
        this.consigne = 'Simplifier l\'écriture en utilisant la notation puissance'
        listeTypeDeQuestions = ['puissance']
        break
      default:
        this.consigne = ''
        listeTypeDeQuestions = ['produit', 'puissance']
        break
    }
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    let listeSignesExposants
    switch (this.sup2) {
      case 1:
        listeSignesExposants = ['positif']
        break
      case 2:
        listeSignesExposants = ['négatif']
        break
      default:
        listeSignesExposants = ['positif', 'négatif']
        break
    }
    listeSignesExposants = combinaisonListes(listeSignesExposants, this.nbQuestions)
    const listeSignes = combinaisonListes(['', '-'], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, pl, pr, produit, puissance, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (this.sup3) {
        a = randint(-999, 999)
      } else {
        a = randint(-10, 10)
      }
      if (listeTypeDeQuestions[i] === 'puissance') {
        b = randint(2, 8)
      } else {
        b = randint(0, 5)
      }
      if (a < 0) {
        pl = '('
        pr = ')'
      } else {
        pl = ''
        pr = ''
      }
      if (listeSignesExposants[i] === 'négatif') {
        b = b * -1
      }
      puissance = `${listeSignes[i] + pl + a + pr}^{${b}}`
      produit = `${pl + a + pr}`
      for (let j = 0; j < Math.abs(b) - 1; j++) {
        produit += ` \\times ${pl + a + pr}`
      }
      switch (listeTypeDeQuestions[i]) {
        case 'produit':
          this.sup === 3 ? texte = 'Donner la signification de ' : texte = ''
          texte += `$${puissance}$.`
          texteCorr = `$${puissance} = `
          if (b === 0) texteCorr += listeSignes[i] + 1 + '$'
          else if (b === 1) {
            if (listeSignes[i] === '') {
              pl = ''
              pr = ''
            }
            texteCorr += `${listeSignes[i] + pl + a + pr}$`
          } else if (b > 1) {
            texteCorr += listeSignes[i] + produit + '$'
          } else if (b === -1) {
            if (listeSignes[i] === '') {
              pl = ''
              pr = ''
            }
            if (listeSignes[i] === '-') {
              texteCorr += `- \\dfrac{1}{${a}}$`
            } else {
              texteCorr += `\\dfrac{1}{${a}}$`
            }
          } else if (b < -1) {
            texteCorr += `${listeSignes[i]} \\dfrac{1}{${produit}}$`
          }
          break
        case 'puissance':
          this.sup === 3 ? texte = 'Simplifier l\'écriture en utilisant la notation puissance : ' : texte = ''
          if (b < 0) {
            texte += `$${listeSignes[i]} \\dfrac{1}{${produit}}$`
            texteCorr = `$${listeSignes[i]} \\dfrac{1}{${produit}} = ${puissance}$`
          } else {
            texte += `$${listeSignes[i]} ${produit}$`
            texteCorr = `$${listeSignes[i]} ${produit} = ${puissance}$`
          }
          break
      }

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, b, listeTypeDeQuestions[i], listeSignesExposants[i], listeSignes[i])) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
