import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint, lampeMessage, prenomF, prenomM, calcul } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Augmenter ou diminuer d un pourcentage'
export const interactifReady = true
export const interactifType = 'mathlive'

/**
 * Description didactique de l'exercice
 * @author Laurence CANDILLE
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.interactif = true
  this.interactifType = 'numerique'

  this.nouvelleVersion = function () {
    // const n = parseInt(this.sup) - 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.introduction = lampeMessage({
      titre: 'Calculatrice autorisée.',
      texte: 'Résoudre les problèmes suivants au brouillon et écrire les réponses dans les cases, ne pas préciser "€" ni "euros" ...',
      couleur: 'nombres'
    })
    const typeQuestionsDisponibles = ['augmentation', 'réduction', 'augmentation'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"

    let billet, loyer // prix du billet, loyer de l'appart
    let pr, pa // pourcentage réduction, pourcentage augmentation
    let mr, ma // montant réduction, montant augmentation
    let final1, final2 // prix final 1 , prix final 2
    let prenom1, prenom2 // choix aleatoire des prenoms

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomM()
      prenom2 = prenomF()
      billet = randint(100, 200)
      pr = randint(21, 39, [30])
      loyer = randint(501, 899, [600, 700, 800])
      pa = randint(2, 9)
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'réduction':
          mr = calcul(pr * billet / 100)
          final1 = calcul(billet - mr)
          texte = `<br> Un billet d'avion coûte ${billet}€. ${prenom1} bénéficie d'une réduction de ${pr} %."<br>`
          texte += `a) Le montant de la réduction est :${mr}`
          texte += ajouteChampTexteMathLive(this, i) + '  €<br><br>'
          setReponse(this, i, mr)
          texte += `b) Finalement, ${prenom2} paiera son loyer :${final1}`
          texte += ajouteChampTexteMathLive(this, i + this.nbQuestions + 1) + '  €<br>'
          // texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)}€<br>${prenom2}  a ${texPrix(e)}€`
          // texteCorr += texteEnCouleurEtGras(' de plus ')
          // texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
          // texteCorr += texteEnCouleurEtGras(' de moins ')
          // texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)}€ - ${texPrix(e)}€ = ${texPrix(m)}€`
          // texteCorr += `<br>${texPrix(r)}€ + ${texPrix(m)}€ = ${texPrix(somme)}€`
          // texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)
          setReponse(this, i + this.nbQuestions + 1, final1)
          break
        case 'augmentation':
          calcul(ma = pa * loyer / 100)
          calcul(final2 = loyer + ma)

          texte = `<br> Le loyer de l'appartement de ${prenom2} coûte ${loyer}€. Au 1er janvier, il augmente de ${pa} %."<br>`
          texte += `a) Le montant de l augmentation est :${ma}`
          texte += ajouteChampTexteMathLive(this, i) + '  €<br><br>'
          texte += `b) Finalement, ${prenom2} paiera son loyer :${final2}`
          setReponse(this, i, ma)
          texte += ajouteChampTexteMathLive(this, i + this.nbQuestions + 1) + '  €'
          setReponse(this, i + this.nbQuestions + 1, final2)
          // texteCorr = `D'après l'énoncé ${prenom2} a : ${texPrix(r)}€<br>${prenom2}  a ${texPrix(e)}€`
          // texteCorr += texteEnCouleurEtGras(' de moins ')
          // texteCorr += `que ${prenom1} signifie que ${prenom1} a ${texPrix(e)}€`
          // texteCorr += texteEnCouleurEtGras(' de plus ')
          // texteCorr += `que ${prenom2} . <br>${prenom1} a donc : ${texPrix(r)}€ + ${texPrix(e)}€ = ${texPrix(m)}€`
          // texteCorr += `<br>${texPrix(r)}€ + ${texPrix(m)}€ = ${texPrix(somme)}€`
          // texteCorr += texteEnCouleur(`<br>Les deux filles possèdent en tout : ${texPrix(somme)}€`)

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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Valeurs entières\n2 : Une décimale\n3 : Deux décimales']
}
