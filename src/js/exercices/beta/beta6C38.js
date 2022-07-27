import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, prenomF, prenomM, calcul, texPrix, texteEnCouleurEtGras } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Augmenter ou diminuer d\'un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Description didactique de l'exercice
 * @author Laurence CANDILLE
 * Référence
*/
export default function AugmenterEtReduireDunPourcentage () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactifType = 'mathLive'

  this.nouvelleVersion = function () {
    const n = parseInt(this.sup) - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = lampeMessage({
      titre: 'Calculatrice autorisée.',
      texte: 'Écrire les réponses dans les cases sans arrondir, ne pas préciser "€" ni "euros" ...',
      couleur: 'nombres'
    })
    const typeQuestionsDisponibles = ['augmentation', 'réduction'] // On créé 2 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let billet, loyer // prix du billet, loyer de l'appart
    let pr, pa // pourcentage réduction, pourcentage augmentation
    let mr, ma // montant réduction, montant augmentation
    let final1, final2 // prix final 1 , prix final 2
    let prenom1, prenom2 // choix aleatoire des prenoms
    function nombreDecimales (n) {
      if (n === 0) {
        pr = randint(1, 6) * 10
        pa = randint(1, 3) * 10
      }
      if (n === 1) {
        pr = randint(21, 39, [30])
        pa = randint(2, 9)
      }
      if (n === 2) {
        pr = calcul((randint(40, 60) * 100 + randint(1, 9) * 10) / 100)
        pa = calcul((randint(1, 9) * 10 + randint(1, 9)) / 10)
      }
    }

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomM()
      prenom2 = prenomF()
      billet = randint(100, 200)
      loyer = randint(501, 899, [600, 700, 800])

      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'réduction':
          nombreDecimales(n)
          mr = calcul(pr * billet / 100)
          final1 = calcul(billet - mr)
          texte = `<br> Un billet d'avion coûte ${billet}€. ${prenom1} bénéficie d'une réduction de ${pr} %.<br>`
          texte += 'a) Le montant de la réduction est :'
          texte += ajouteChampTexteMathLive(this, i)
          setReponse(this, i, [mr, mr * 10], { formatInteractif: 'calcul' })
          texte += `b) Finalement, ${prenom1} paiera son billet :`
          texte += ajouteChampTexteMathLive(this, i + this.nbQuestions + 1)
          texteCorr = `<br>a) Le montant de la réduction est :     $${billet}\\times ${pr} \\div 100 = ~ $`
          texteCorr += texteEnCouleurEtGras(`$${texPrix(mr)}€.$<br>`)
          texteCorr += `b) Finalement, ${prenom1} paiera son billet : $${billet} - ${texPrix(mr)} = ~ $`
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final1)}€.$`)
          setReponse(this, i + this.nbQuestions + 1, final1)
          break
        case 'augmentation':
          nombreDecimales(n)
          calcul(ma = pa * loyer / 100)
          calcul(final2 = loyer + ma)

          texte = `<br> Le loyer de l'appartement de ${prenom2} coûte ${loyer}€. Au 1er janvier, il augmente de ${pa} %.<br>`
          texte += 'a) Le montant de l\'augmentation est :'
          texte += ajouteChampTexteMathLive(this, i)
          texte += `b) Finalement, ${prenom2} paiera son loyer :`
          setReponse(this, i, ma)
          texte += ajouteChampTexteMathLive(this, i + this.nbQuestions + 1)
          setReponse(this, i + this.nbQuestions + 1, final2)
          texteCorr = `<br>a) Le montant de l'augmentation est :     $${loyer}\\times ${pa} \\div 100 = ~ $`
          texteCorr += texteEnCouleurEtGras(`$${texPrix(ma)}€.$<br>`)
          texteCorr += `b) Finalement, ${prenom2} paiera son loyer : $${loyer} + ${texPrix(ma)} = ~ $`
          texteCorr += texteEnCouleurEtGras(`$${texPrix(final2)}€.$`)
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Valeurs entières et 10%, 20% ..\n2 : Valeurs entières et 4%, 23% ..\n3 : Une décimale comme 34,5%']
}
