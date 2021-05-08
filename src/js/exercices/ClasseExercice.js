/**
 *
 *  Classe parente de tous les exercices
 *
 * @Auteur Rémi Angot
 */
export default function Exercice () {
  // Classe parente de tous les exercices qui seront créés
  this.titre = ''
  this.consigne = ''
  this.consigneCorrection = ''
  this.listeQuestions = []
  this.listeCorrections = []
  this.introduction = ''
  this.contenu = ''
  this.contenuCorrection = ''
  this.nbQuestions = 10
  this.nbCols = 2
  this.nbColsCorr = 2
  this.spacing = 1
  this.spacingCorr = 1
  this.beamer = false

  this.besoinFormulaireNumerique = false // Sinon this.besoinFormulaireNumerique = [texte,max,tooltip facultatif];
  this.besoinFormulaireTexte = false // Sinon this.besoinFormulaireTexte = [texte,tooltip];
  this.besoinFormulaireCaseACocher = false // Sinon this.besoinFormulaireCaseACocher = [texte];
  this.consigneModifiable = true
  this.nbQuestionsModifiable = true
  this.nbColsModifiable = true
  this.nbColsCorrModifiable = true
  this.spacingModifiable = true
  this.spacingCorrModifiable = true
  this.correctionDetailleeDisponible = false
  this.correctionDetaillee = true
  this.video = ''
  this.boutonAide = false
  this.tailleDiaporama = 50 // Taille en pixels pour le calcul chronométré
  // this.boutonAide = modalTexteCourt(numeroExercice,texte,label_bouton="Aide",icone="info circle")
  // this.boutonAide = modalTexteLong(numeroExercice,titre,texte,label_bouton="Aide",icone="info circle")
  // this.boutonAide = modalYoutube(numeroExercice,id_youtube,texte,label_bouton="Aide - Vidéo",icone="youtube")
  // this.boutonAide = modalPdf(numeroExercice,url_pdf,texte="Aide",label_bouton="Aide - PDF",icone="file pdf")
  // this.vspace = -1 //Ajoute un \vspace{-1cm} avant l'énoncé ce qui peut être pratique pour des exercices avec des figures.
  this.pasDeVersionLatex = false
  this.qcm = false // Pour les exercices de type QCM : contient un tableau.
  this.qcmDisponible = false // Pour ajouter une case à cocher Mode QCM qui permet de changer le statut de this.modeQcm
  this.modeQcm = false // Pour choisir la version QCM ou la version classique (false = version classique)
  this.tableauSolutionsDuQcm = [] // Pour sauvegarder les solutions des QCM
  this.mg32Editable = false // pas d'interface par défaut pour les figures MG32
  this.nouvelleVersion = function (numeroExercice) {}
  this.listePackages = [] // string ou liste de string avec le nom des packages spécifiques à ajouter dans le préambule
  // this.typeExercice = "MG32";
  // this.dimensionsDivMg32 = [500, 450];
  // this.typeExercice = "Scratch"
  // this.qcm=["Quels sont les nombres pairs ?",[7,12,34,25,18],[0,1,1,0,1]] =>["La question",[les réponses],[bonne=1 et mauvaise=0]]
}
