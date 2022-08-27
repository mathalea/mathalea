import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, sommeDesChiffres, calcul, texNombre, randint, choice } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'
export const titre = 'Reconnaître diviseur, multiple, divisible'

/**
 * Vrai ou faux sur les notions de diviseur ou multiple
 * @author Rémi Angot
 * Référence 6N43-3
*/
export const uuid = 'bbdd6'
export const ref = '6N43-3'
export default function ExerciceVraiFauxDivisibleMultipleDiviseur () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Pour chaque affirmation, indiquer si elle est vraie ou fausse.'
  this.nbQuestions = 5
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  function justification (N, a, booleen) {
    let result
    if (booleen === true) {
      if (N === 2) {
        result = ', car son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$.'
      } else if (N === 5) {
        result = ', car son chiffre des unités est $0$, ou $5$.'
      } else if (N === 3 || N === 9) {
        result = `, car la somme de ses chiffres est $${sommeDesChiffres(a)[1]}=${sommeDesChiffres(a)[0]}$ qui est divisible par $${N}$.`
      } else {
        result = `, car $${texNombre(a)} = ${N}\\times ${calcul(a / N)}$.`
      }
    }
    if (booleen === false) {
      if (N === 2) {
        result = ", car son chiffre des unités n'est pas $0$, $2$, $4$, $6$ ou $8$."
      } else if (N === 5) {
        result = ", car son chiffre des unités n'est pas $0$, ou $5$."
      } else if (N === 3 || N === 9) {
        result = `, car la somme de ses chiffres est $${sommeDesChiffres(a)[1]}=${sommeDesChiffres(a)[0]}$ qui n'est pas divisible par $${N}$.`
      } else {
        result = `, car $${texNombre(a)} = ${N}\\times ${Math.floor(a / N)}+ ${a % N}$.`
      }
    }
    return result
  }

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    let typeDeQuestionsDisponibles = ['Ndiviseur', 'divisibleParN', 'multipleDeN', 'NdiviseurF', 'divisibleParNF', 'multipleDeNF', 'NdiviseurEnvers', 'divisibleParNEnvers', 'multipleDeNEnvers']
    if (this.nbQuestions < 8) {
      typeDeQuestionsDisponibles = [choice(['Ndiviseur', 'divisibleParN']), 'multipleDeN', choice(['NdiviseurF', 'divisibleParNF']), 'multipleDeNF', choice(['NdiviseurEnvers', 'divisibleParNEnvers', 'multipleDeNEnvers'])]
    }
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let listeDeNDisponibles
    if (this.sup === 1) {
      listeDeNDisponibles = [2, 5]
    }
    if (this.sup === 2) {
      listeDeNDisponibles = [2, 3, 5, 9]
    }
    if (this.sup === 3) {
      listeDeNDisponibles = [7, 11, 13, 20, 30, 25]
    }
    const listeDeN = combinaisonListes(listeDeNDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, N, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      N = listeDeN[i]
      a = randint(199, 999) * N
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: 'Vrai',
          statut: false
        },
        {
          texte: 'Faux',
          statut: false
        },
        {
          texte: 'Je ne sais pas',
          statut: false
        }
      ]
      this.autoCorrection[i].options = { ordered: true } // On ne mélange pas les propositions 'Oui', 'Non' et 'Je ne sais pas'
      switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Ndiviseur':
          texte = `$${N}$ est un diviseur de $${texNombre(a)}$.`
          texteCorr = texte.replace('.', ' ') + ' : Vrai'
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[0].statut = true
          break
        case 'divisibleParN':
          texte = `$${texNombre(a)}$ est divisible par $${N}$.`
          texteCorr = texte.replace('.', ' ') + ' : Vrai'
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[0].statut = true
          break
        case 'multipleDeN':
          texte = `$${texNombre(a)}$ est un multiple de $${N}$.`
          texteCorr = texte.replace('.', ' ') + ' : Vrai'
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[0].statut = true
          break
        case 'NdiviseurF':
          a += randint(1, N - 1)
          texte = `$${N}$ est un diviseur de $${texNombre(a)}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += justification(N, a, false)
          this.autoCorrection[i].propositions[1].statut = true
          break
        case 'divisibleParNF':
          a += randint(1, N - 1)
          texte = `$${texNombre(a)}$ est divisible par $${N}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += justification(N, a, false)
          this.autoCorrection[i].propositions[1].statut = true
          break
        case 'multipleDeNF':
          a += randint(1, N - 1)
          texte = `$${texNombre(a)}$ est un multiple de $${N}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += justification(N, a, false)
          this.autoCorrection[i].propositions[1].statut = true
          break
        case 'NdiviseurEnvers':
          texte = `$${texNombre(a)}$ est un diviseur de $${N}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += `, il faudrait plutôt dire $${N}$ est un diviseur de $${texNombre(a)}$`
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[1].statut = true
          break
        case 'divisibleParNEnvers':
          texte = `$${N}$ est divisible par $${texNombre(a)}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += `, il faudrait plutôt dire $${texNombre(a)}$ est divisible par $${N}$`
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[1].statut = true
          break
        case 'multipleDeNEnvers':
          texte = `$${N}$ est un multiple de $${texNombre(a)}$.`
          texteCorr = texte.replace('.', ' ') + ' : Faux'
          texteCorr += `, il faudrait plutôt dire $${a}$ est un multiple de $${N}$`
          texteCorr += justification(N, a, true)
          this.autoCorrection[i].propositions[1].statut = true
          break
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.autoCorrection[i].enonce = `${texte}\n`
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Critères de divisibilité par 2 et 5\n2 : Critères de divisibilité par 2, 3, 5 et 9\n3 : Sans critère de divisibilité']
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
