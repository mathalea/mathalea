import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function ProbabilitésConditionnelles () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 1 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, v, av, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          a = randint(30, 70)// p(A)
          v = randint(30, 70)// P_T(V)
          av = randint(30, 70)// P(A \cap V)
          texte = 'Une agence de voyage propose deux formules week-end pour se rendre à Londres depuis Paris.'
          texte += '<br> Les clients choisissent leur moyen de transport : train ou avion.'
          texte += '<br> De plus, s\'ils le souhaitent, ils peuvent compléter leur formule par l\'option "visites guidées".'
          texte += '<br> Une étude a produit les données suivantes:'
          texte += `<br> $\\bullet~~$ ${a}\\% des clients optent pour l'avion;`
          texte += `<br> $\\bullet~~$ Parmi   les clients ayant choisi le train, ${v}\\% choisissent aussi l'option "visites guidées".`
          texte += `<br> $\\bullet~~$ ${av}\\% des clients ont choisi à la fois l'avion et l'option "visites guidées".<br>`
          texte += '<br> On interroge au hasard un client de l\'agence ayant souscrit à une formule week-end à Londres.'
          texte += '<br> On considère les évènements suivants:'
          texte += '<br> $\\bullet~~$ $A$ :  le client a choisi l\'avion.'
          texte += '<br> $\\bullet~~$ $V$ : le client a choisi l\'option "visites guidées".<br>'

          texte += '<br> 1. Déterminer $P_A(V)$.'
          texte += '<br> 2.  Démontrer que la probabilité pour que le client interrogé ait choisi l\'option "visites guidées" est égale à $0,42$.'
          texte += '<br> 3. Calculer la probabilité pour que le client interrogé ait pris l\'avion sachant qu\'il n\'a pas choisi l\'option "visites guidées". Arrondir le résultat au centième.'
          texte += '<br> 4. On interroge au hasard deux clients de manière aléatoire et indépendante.'
          texte += '<br> Quelle est la probabilité qu\'aucun des deux ne prennent l\'option "visites guidées" ?'
          texteCorr = `Correction ${i + 1} de type 1`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
