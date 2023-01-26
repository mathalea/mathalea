import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenu, sp, choice, texNombre, miseEnEvidence } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Décomposer un nombre'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '25/01/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function DecompositionNombre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur12 inline'
  this.tailleDiaporama = 2

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte, texteCorr, c, d, u, n, um
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2])) {
        case 1:
          u = randint(1, 9)
          d = randint(1, 9)
          c = randint(1, 9)
          n = c * 100 + d * 10 + u
          if (choice([true, false])) {
            if (this.interactif) {
              texte = `Compléter : <br>$${n}=$` + ajouteChampTexteMathLive(this, 2 * i, 'largeur12 inline') + 'centaine(s)'
              texte += ` ${sp(1)}   `
              texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur12 inline') + 'unité(s)'
              setReponse(this, 2 * i, c)
              setReponse(this, 2 * i + 1, d * 10 + u)
            } else {
              texte = `Compléter : <br>
      $${n}=\\ldots$ centaine(s)  $\\ldots$ unité(s)    
      `
            }
            texteCorr = `Comme $${n}= ${c} \\times 100 +  ${d * 10 + u} \\times 1$, alors $${n}= ${miseEnEvidence(c)}$  ${c === 1 ? 'centaine' : 'centaines'} $${miseEnEvidence(d * 10 + u)}$ unités. `
            this.canEnonce = 'Compléter.'
            this.canReponseACompleter = `$${n}=\\ldots$ centaine(s)  $\\ldots$ unité(s)`
          } else {
            if (this.interactif) {
              texte = `Compléter : <br>$${n}=$` + ajouteChampTexteMathLive(this, 2 * i, 'largeur12 inline') + 'dizaine(s)'
              texte += ` ${sp(1)}   `
              texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur12 inline') + 'unité(s)'
              setReponse(this, 2 * i, c * 10 + d)
              setReponse(this, 2 * i + 1, u)
            } else {
              texte = `Compléter : <br>
      $${n}=\\ldots$ dizaine(s)  $\\ldots$ unité(s)    
      `
            }
            texteCorr = `Comme $${n}= ${c * 10 + d} \\times 10 +  ${u} \\times 1$, alors $${n}= ${miseEnEvidence(c * 10 + d)}$   dizaines  $${miseEnEvidence(u)}$ ${u === 1 ? 'unité.' : 'unités.'} `
            this.canEnonce = 'Compléter.'
            this.canReponseACompleter = `$${n}=\\ldots$ dizaine(s)  $\\ldots$ unité(s)`
          }
          break
        case 2:
          um = randint(1, 9)
          u = randint(1, 9)
          d = randint(1, 9)
          c = randint(1, 9)
          n = um * 1000 + c * 100 + d * 10 + u
          if (choice([true, false])) {
            if (this.interactif) {
              texte = `Compléter : <br>$${texNombre(n)}=$` + ajouteChampTexteMathLive(this, 2 * i, 'largeur12 inline') + 'centaine(s)'
              texte += ` ${sp(1)}   `
              texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur12 inline') + 'unité(s)'
              setReponse(this, 2 * i, um * 10 + c)
              setReponse(this, 2 * i + 1, d * 10 + u)
            } else {
              texte = `Compléter : <br>
      $${texNombre(n)}=\\ldots$ centaine(s)  $\\ldots$ unité(s)    
      `
            }
            texteCorr = `Comme $${texNombre(n)}=  ${um * 10 + c} \\times 100 +  ${d * 10 + u} \\times 1$, alors $${texNombre(n)}= ${miseEnEvidence(um * 10 + c)}$  centaines $${miseEnEvidence(d * 10 + u)}$ unités. `
            this.canEnonce = 'Compléter.'
            this.canReponseACompleter = `$${texNombre(n)}=\\ldots$ centaine(s)  $\\ldots$ unité(s)`
          } else {
            if (this.interactif) {
              texte = `Compléter : <br>$${texNombre(n)}=$` + ajouteChampTexteMathLive(this, 2 * i, 'largeur12 inline') + 'dizaine(s)'
              texte += ` ${sp(1)}   `
              texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur12 inline') + 'unité(s)'
              setReponse(this, 2 * i, um * 100 + c * 10 + d)
              setReponse(this, 2 * i + 1, u)
            } else {
              texte = `Compléter : <br>
    $${texNombre(n)}=\\ldots$ dizaine(s)  $\\ldots$ unité(s)    
    `
            }
            texteCorr = `Comme $${texNombre(n)}=  ${um * 100 + c * 10 + d} \\times 10 +  ${u} \\times 1$, alors $${texNombre(n)}= ${miseEnEvidence(um * 100 + c * 10 + d)}$  dizaines $${miseEnEvidence(u)}$ ${u === 1 ? 'unité.' : 'unités.'} `
            this.canEnonce = 'Compléter.'
            this.canReponseACompleter = `$${texNombre(n)}=\\ldots$ dizaine(s)  $\\ldots$ unité(s)`
          }
          break
      }
      if (this.questionJamaisPosee(i, n)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
