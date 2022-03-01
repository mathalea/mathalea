import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, texNombre, nombreAvecEspace } from '../../modules/outils.js'
import Operation from '../../modules/operations.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { choixDeroulant } from '../../modules/interactif/questionListeDeroulante.js'

export const titre = 'Trouver des phrases avec les mots : divisible, diviseur et multiple'
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
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.listePackages = 'xlop'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let b = randint(6, 17, [9, 10])
    let q = randint(11, 99)
    let r = randint(1, b - 1)
    let a = b * q
    let a1 = b * q + r
    while (q % b === 0 || q % r === 0 || b % r === 0 || a1 % r === 0) {
      b = randint(6, 17, [9, 10])
      q = randint(11, 99)
      r = randint(1, b - 1)
      a = b * q
      a1 = b * q + r
    }
    this.introduction = `À l'aide des calculs suivants, compléter les phrases suivantes avec les nombres $${texNombre(a1)}$, $${texNombre(a)}$, $${texNombre(b)}$ ou $${texNombre(q)}$.<br><br>`
    if (randint(0, 1) === 0) {
      this.introduction += Operation({ operande1: a, operande2: b, type: 'divisionE' })
      if (!context.isHtml) this.introduction += '\\qquad'
      this.introduction += Operation({ operande1: a1, operande2: b, type: 'divisionE' })
    } else {
      this.introduction += Operation({ operande1: a1, operande2: b, type: 'divisionE' })
      if (!context.isHtml) this.introduction += '\\qquad'
      this.introduction += Operation({ operande1: a, operande2: b, type: 'divisionE' })
    }

    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6] // On créé 3 types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1:
          texte = '... est divisible par ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'est divisible par' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(a)}$ est divisible par $${texNombre(b)}$ ou $${texNombre(a)}$ est divisible par $${texNombre(q)}$.`
          setReponse(this, i, [[nombreAvecEspace(a), nombreAvecEspace(b)], [nombreAvecEspace(a), nombreAvecEspace(q)]])
          break
        case 2:
          texte = '... est un diviseur de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'est un diviseur de' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(b)}$ est un diviseur de $${texNombre(a)}$ ou $${texNombre(q)}$ est un diviseur de $${texNombre(a)}$.`
          setReponse(this, i, [[nombreAvecEspace(b), nombreAvecEspace(a)], [nombreAvecEspace(q), nombreAvecEspace(a)]])
          break
        case 3:
          texte = '... est un multiple de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'est un multiple de' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(a)}$ est un multiple de $${texNombre(b)}$ ou $${texNombre(a)}$ est un multiple de $${texNombre(q)}$.`
          setReponse(this, i, [[nombreAvecEspace(a), nombreAvecEspace(b)], [nombreAvecEspace(a), nombreAvecEspace(q)]])
          break
        case 4:
          texte = '... n\'est pas divisible par ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'n\'est pas divisible par' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(a1)}$ n'est pas divisible par $${texNombre(b)}$ ou $${texNombre(a1)}$ n'est pas divisible par $${texNombre(q)}$.`
          setReponse(this, i, [[nombreAvecEspace(a1), nombreAvecEspace(b)], [nombreAvecEspace(a1), nombreAvecEspace(q)]])
          break
        case 5:
          texte = '... n\'est pas un diviseur de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'n\'est pas un diviseur de' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(b)}$ n'est pas un diviseur de $${texNombre(a1)}$ ou $${texNombre(q)}$ n'est pas un diviseur de $${texNombre(a1)}$.`
          setReponse(this, i, [[nombreAvecEspace(b), nombreAvecEspace(a1)], [nombreAvecEspace(q), nombreAvecEspace(a1)]])
          break
        case 6:
          texte = '... n\'est pas un multiple de ...'
          if (this.interactif) {
            texte = choixDeroulant(this, i, 0, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)]) + 'n\'est pas un multiple de' + choixDeroulant(this, i, 1, [nombreAvecEspace(a1), nombreAvecEspace(a), nombreAvecEspace(b), nombreAvecEspace(q)])
          }
          texteCorr = `$${texNombre(a1)}$ n'est pas un multiple de $${texNombre(b)}$ ou $${texNombre(a1)}$ est n'est pas un multiple de $${texNombre(q)}$.`
          setReponse(this, i, [[nombreAvecEspace(a1), nombreAvecEspace(b)], [nombreAvecEspace(a1), nombreAvecEspace(q)]])
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
