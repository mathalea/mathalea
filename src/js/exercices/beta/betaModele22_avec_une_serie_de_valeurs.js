import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, contraindreValeur } from '../../modules/outils.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'Consigne'
  this.nbQuestions = 10

  this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Fleuriste\n2 : Professeur\n3 : Boulanger\n']
  this.sup = '1-1-2-3'

  this.nbCols = 2
  this.nbColsCorr = 2
  this.tailleDiaporama = 3
  this.video = ''

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)

    let listeDesProblemes = [1, 2, 3]
    if (this.sup) { // Si une liste est saisie
      if (this.sup.toString().indexOf('-') === -1) { // S'il n'y a pas de tiret ...
        listeDesProblemes = [contraindreValeur(1, 3, parseInt(this.sup), 1)] // ... on crée un tableau avec une seule valeur
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on parcourt notre tableau de strings : ['1', '1', '2'] ...
          listeDesProblemes[i] = contraindreValeur(1, 3, parseInt(listeDesProblemes[i]), 1) // ... pour en faire un tableau d'entiers : [1, 1, 2]
        }
      }
    }
    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)

    for (let i = 0, texte, texteCorr, typeDeProbleme, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeDesProblemes[i] === 1) { // On ajuste le type de problème selon le paramètre.
        typeDeProbleme = 'fleuriste'
      } else if (listeDesProblemes[i] === 2) {
        typeDeProbleme = 'professeur'
      } else if (listeDesProblemes[i] === 3) {
        typeDeProbleme = 'boulanger'
      }
      switch (listeTypeQuestions[i]) {
        case 'type1':
          texte = `Problème de ${typeDeProbleme} ${i + 1} de type 1`
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = `Problème de ${typeDeProbleme} ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3':
          texte = `Problème de ${typeDeProbleme} ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
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
    listeQuestionsToContenu(this)
  }
}
