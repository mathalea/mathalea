import Exercice from '../ExerciceTs.js'
import { listeQuestionsToContenu, combinaisonListes, range, randint } from '../../modules/outils.js'

export const titre = 'Problèmes concret et pourcentages'

export default class ProblemesConcretsEtPourcentages extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 4 // Ici le nombre de questions
    this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  }

  nouvelleVersion () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    const entreprises = ['La colossale', 'FabrikTout', 'RenovMax']
    const nomActivité = ['Appels', 'Visites', 'Ventes', 'Devis', '€ de chiffre d\'affaire', '€ de marge']
    const minMaxCoeffNombres = [[5, 100, 10], [5, 100, 10], [50, 100, 1], [50, 100, 1], [50, 10000, 100], [5, 1000, 100]]
    const listeChoix = combinaisonListes(range(5), this.nbQuestions)
    const nombreObjectif = []
    console.log(listeChoix)
    for (let ii = 0; ii < this.nbQuestions; ii++) {
      nombreObjectif[ii] = randint(minMaxCoeffNombres[listeChoix[ii]][0], minMaxCoeffNombres[listeChoix[ii]][1]) * minMaxCoeffNombres[listeChoix[ii]][2]
    }
    const nombreRéalisé = []

    for (let ii = 0; ii < this.nbQuestions; ii++) {
      nombreRéalisé[listeChoix[ii]] = randint(Math.round(nombreObjectif[listeChoix[ii]] / 2), Math.round(nombreObjectif[listeChoix[ii]] * 0.95))
    }
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const indexChoix = listeChoix[i]
      texte = `Le manager de l'entreprise ${entreprises[i % 3]} a fixé comme objectif commerciale de réaliser ${nombreObjectif[indexChoix]} ${nomActivité[indexChoix]} sur une période donnée.<br>`
      texte += `Sur cette période, l'équipe commerciale a réalisé ${nombreRéalisé[indexChoix]} ${nomActivité[indexChoix]}.<br>`
      texte += 'Quel est le pourcentage de l\'objectif atteint sur la période ?'
      texteCorr = '' // Idem pour le texte de la correction.

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:

          break

        case 2:
          // Idem Cas1 mais avec d'autres texte, texteCorr...
          break

        case 3:

          break

        case 4:

          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
