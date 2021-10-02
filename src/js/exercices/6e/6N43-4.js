import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
import { context } from '../../modules/context.js'
import { choixDeroulant, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Faire des phrases avec les mots : divisible, diviseur et multiple'
export const interactifReady = true
export const interactifType = 'listeDeroulante'

/**
 * Compléter des phrases avec les mots divisible, divieur et multiple
 * @author Rémi Angot
 * Référence 6N43-4
*/
export default function DivisibleDiviseurMultiple () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 6 // 6 questions au maximum
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const b = randint(5, 12)
    const q = randint(11, 99)
    const r = randint(1, b - 1)
    const a = b * q
    const a1 = b * q + r
    this.introduction = `À l'aide des calculs suivants, compléter les phrases suivantes avec les nombre $${a1}$, $${a}$, $${b}$ ou $${q}$.<br><br>`
    this.introduction += Operation({ operande1: a, operande2: b, type: 'divisionE' })
    if (!context.isHtml) this.introduction += '\\qquad'
    this.introduction += Operation({ operande1: a1, operande2: b, type: 'divisionE' })

    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1:
          texte = '... est divisible par ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'est divisible par' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${a} est divisible par ${b} ou ${a} est divisible par ${q}.`
          setReponse(this, i, [[a, b], [a, q]])
          break
        case 2:
          texte = '... est un diviseur de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'est un diviseur de' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${b} est un diviseur de ${a} ou ${q} est un diviseur de ${a}.`
          setReponse(this, i, [[b, a], [q, a]])
          break
        case 3:
          texte = '... est un multiple de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'est un multiple de' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${a} est un multiple de ${b} ou ${a} est un multiple de ${q}.`
          setReponse(this, i, [[a, b], [a, q]])
          break
        case 4:
          texte = '... n\'est pas divisible par ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'n\'est pas divisible par' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${a1} n'est pas divisible par ${b} ou ${a1} n'est pas divisible par ${q}.`
          setReponse(this, i, [[a1, b], [a1, q]])
          break
        case 5:
          texte = '... n\'est pas un diviseur de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'n\'est pas un diviseur de' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${b} n'est pas un diviseur de ${a1} ou ${q} n'est pas un diviseur de ${a1}.`
          setReponse(this, i, [[b, a1], [q, a1]])
          break
        case 6:
          texte = '... n\'est pas un multiple de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [a1, a, b, q]) + 'n\'est pas un multiple de' + choixDeroulant(this, i, 1, [a1, a, b, q])
          }
          texteCorr = `${a1} n'est pas un multiple de ${b} ou ${a1} est n'est pas un multiple de ${q}.`
          setReponse(this, i, [[a1, b], [a1, q]])
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        // texte = '<div class="ui form>' + texte + '</div>'
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
