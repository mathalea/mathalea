import Exercice from '../Exercice.js'
import { randint, combinaisonListes, listeQuestionsToContenu } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Utiliser la notation puissance'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true // pour définir que l'exercice est exportable AMC
export const amcType = 'AMCOpen'

export const dateDePublication = '21/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Passer d'un produit à la notation puissance et inversement
 * @author Guillaume Valmont
 * Référence 4C33-0
*/
export const uuid = '1d078'
export const ref = '4C33-0'
export default function NotationPuissance () {
  Exercice.call(this)
  this.nbQuestions = 4

  this.besoinFormulaireNumerique = ['Type de calcul', 3, '1 : Écrire sous forme de produit\n2 : Écrire sous forme de puissance\n3 : Mélange'] // le paramètre sera numérique de valeur max 2 (le 2 en vert)
  this.sup = 1
  this.besoinFormulaire2Numerique = ['Exposant', 3, '1 : Positif\n2 : Négatif\n3 : Mélange']
  this.sup2 = 1

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeQuestions
    switch (this.sup) {
      case 1:
        this.consigne = 'Donner la signification des écritures suivantes.'
        listeTypeDeQuestions = ['produit']
        break
      case 2:
        this.consigne = 'Simplifier l\'écriture en utilisant la notation puissance.'
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
    const listeSignesMantisse = combinaisonListes(['', '-'], this.nbQuestions)
    for (let i = 0, texte, texteCorr, a, b, pl, pr, apl, apr, signeContraire, produit, produitAlt, puissance, puissances, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      a = randint(2, 10)
      if (listeSignesMantisse[i] === '-') a = -a
      if (listeTypeDeQuestions[i] === 'puissance') {
        b = randint(2, 8)
      } else {
        b = randint(0, 5)
      }
      if (a < 0) {
        pl = '('
        pr = ')'
        apl = ''
        apr = ''
      } else {
        pl = ''
        pr = ''
        apl = '('
        apr = ')'
      }
      listeSignes[i] === '-' ? signeContraire = '' : signeContraire = '-'
      if (listeSignesExposants[i] === 'négatif') {
        b = b * -1
      }
      puissance = `${listeSignes[i] + pl + a + pr}^{${b}}`
      puissances = []
      let exp
      b < 0 ? exp = `{${b}}` : exp = `${b}` // distinction importante pour comparer les chaînes de caractères en interactif
      puissances.push(`${listeSignes[i] + pl + a + pr}^${exp}`) // réponse de base
      b % 2 === 0 ? puissances.push(`${listeSignes[i] + apl + -a + apr}^${exp}`) : puissances.push(`${signeContraire + apl + -a + apr}^${exp}`) // si l'exposant est pair, on peut changer le signe de la mantisse sans changer le signe devant et s'il est impair, on peut changer les deux signes
      produit = `${pl + a + pr}`
      produitAlt = produit
      for (let j = 0; j < Math.abs(b) - 1; j++) {
        produit += `\\times${pl + a + pr}`
        produitAlt += `(${a})`
      }
      switch (listeTypeDeQuestions[i]) {
        case 'produit':
          if (this.sup === 3) {
            texte = `Donner la signification de $${puissance}$.`
          } else {
            texte = `$${puissance}$`
          }
          texteCorr = `$${puissance} = `
          if (b === 0) {
            texteCorr += listeSignes[i] + 1 + '$'
            setReponse(this, i, listeSignes[i] + 1, { formatInteractif: 'ignorerCasse' })
          } else if (b === 1) {
            if (listeSignes[i] === '') {
              pl = ''
              pr = ''
            }
            texteCorr += `${listeSignes[i] + pl + a + pr}$`
            setReponse(this, i, listeSignes[i] + pl + a + pr, { formatInteractif: 'ignorerCasse' })
          } else if (b > 1) {
            texteCorr += listeSignes[i] + produit + '$'
            setReponse(this, i, [listeSignes[i] + produit, listeSignes[i] + produitAlt], { formatInteractif: 'ignorerCasse' })
          } else if (b === -1) {
            texteCorr += `${listeSignes[i]}\\dfrac{1}{${a}}$`
            setReponse(this, i, `${listeSignes[i]}\\frac{1}{${a}}`, { formatInteractif: 'ignorerCasse' })
          } else if (b < -1) {
            texteCorr += `${listeSignes[i]}\\dfrac{1}{${produit}}$`
            setReponse(this, i, [`${listeSignes[i]}\\frac{1}{${produit}}`, `${listeSignes[i]}\\frac{1}{${produitAlt}}`], { formatInteractif: 'ignorerCasse' })
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
          setReponse(this, i, puissances, { formatInteractif: 'ignorerCasse' })
          break
      }
      if (this.interactif) { // Si l'exercice est interactif
        if (listeTypeDeQuestions[i] === 'produit') texte += ajouteChampTexteMathLive(this, i, 'inline fixed-width-400')
        if (listeTypeDeQuestions[i] === 'puissance') texte += ajouteChampTexteMathLive(this, i, 'inline fixed-width-150')
      }
      if (context.isAmc) {
        this.autoCorrection[i].propositions = [{ statut: 1, sanscadre: true, texte: texteCorr }]
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
