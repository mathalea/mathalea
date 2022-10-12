import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { compteOccurences, rangeMinMax } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { contraindreValeur } from '../../modules/outils/comparateurs.js'
export const titre = 'Nom de l\'exercice'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Consigne'
    this.nbQuestions = 10

    this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Fleuriste\n2 : Professeur\n3 : Boulanger\n4 : Mélange']
    this.sup = '1-1-2-3'

    this.nbCols = 2
    this.nbColsCorr = 2
    this.tailleDiaporama = 3
    this.video = ''
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)

    let listeDesProblemes = [1, 2, 3] // Paramétrage par défaut
    const valMaxParametre = 4
    if (this.sup) { // Si une liste est saisie
      if (this.sup.toString().indexOf('-') === -1) { // S'il n'y a pas de tiret ...
        listeDesProblemes = [contraindreValeur(1, valMaxParametre, parseInt(this.sup), 1)] // ... on crée un tableau avec une seule valeur
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on parcourt notre tableau de strings : ['1', '1', '2'] ...
          listeDesProblemes[i] = contraindreValeur(1, valMaxParametre, parseInt(listeDesProblemes[i]), 1) // ... pour en faire un tableau d'entiers : [1, 1, 2]
        }
      }
    }
    // Attention ! Si la valeur max du paramètre n'est pas une option de type "mélange", supprimer la ligne ci-dessous !
    if (compteOccurences(listeDesProblemes, valMaxParametre) > 0) listeDesProblemes = rangeMinMax(1, valMaxParametre - 1) // Si l'utilisateur a choisi l'option "mélange", on fait une liste avec un de chaque

    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)

    for (let i = 0, texte, texteCorr, typeDeProbleme, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      if (listeDesProblemes[i] === 1) { // On ajuste le type de problème selon le paramètre.
        typeDeProbleme = 'fleuriste'
      } else if (listeDesProblemes[i] === 2) {
        typeDeProbleme = 'professeur'
      } else if (listeDesProblemes[i] === 3) {
        typeDeProbleme = 'boulanger'
      } else {
        window.notify('listeDesProblemes[i] a une valeur inattendue.\nPeut-être que valMaxParametre est incorrect ?')
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
