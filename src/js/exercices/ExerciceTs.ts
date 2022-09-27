/**
 *
 *  Classe parente de tous les exercices.
 *
 * @author Rémi Angot
 */
export default class Exercice {
titre: string
sup: any
sup2: any
sup3: any
sup4: any
boutonAide: boolean | HTMLButtonElement
consigne: string
consigneCorrection: string
introduction: string
listeQuestions: string[]
listeCorrections: string[]
contenu: string
contenuCorrection: string
autoCorrection: object[]
tableauSolutionsDuQcm: object[]
spacing: number
spacingCorr: number
pasDeVersionLatex: boolean
  listePackages: string[]
  consigneModifiable: boolean
  nbQuestionsModifiable: boolean
  nbCols: number
  nbColsCorr: number
  nbColsModifiable: boolean
  nbColsCorrModifiable: boolean
  spacingModifiable: boolean
  spacingCorrModifiable: boolean
  beamer: boolean
  tailleDiaporama: number

  nbQuestions: number
  pointsParQuestions: number
  correctionDetailleeDisponible: boolean
  correctionDetaillee: boolean
  correctionIsCachee: boolean
  video: string

  interactif: boolean
  interactifObligatoire: boolean

  besoinFormulaireNumerique: boolean | any[]
  besoinFormulaireTexte: boolean | any[]
  besoinFormulaireCaseACocher: boolean | any[]

  besoinFormulaire2Numerique: boolean | any[]
  besoinFormulaire2Texte: boolean | any[]
  besoinFormulaire2CaseACocher: boolean | any[]

  besoinFormulaire3Numerique: boolean | any[]
  besoinFormulaire3Texte: boolean | any[]
  besoinFormulaire3CaseACocher: boolean | any[]

  besoinFormulaire4Numerique: boolean | any[]
  besoinFormulaire4Texte: boolean | any[]
  besoinFormulaire4CaseACocher: boolean | any[]
  mg32Editable: boolean

  listeArguments: string[] // Variable servant à comparer les exercices pour ne pas avoir deux exercices identiques

  constructor () {
  // ////////////////////////////////////////////////
  // Autour de l'exercice
  // ////////////////////////////////////////////////
    this.titre = '' // Chaîne de caractère sans point à la fin. C'est le titre de l'exercice qui sera affiché avec la référence dans le générateur d'exercices.
    this.boutonAide = false // Bouton en haut à droite des questions permettant d'afficher un pdf, texte, image, vidéo, contenu d'un autre site en "pop-up" via les fonctions modalXXXXXXX de outils.js.
    // Ci-dessous des exemples d'utilisation du this.boutonAide.
    // Noter que pour récupérer le numeroExercice dont il est question, au lieu d'écrire "this.nouvelleVersion = function () {" comme d'habitude, on écrit "this.nouvelleVersion = function (numeroExercice) {".
    // this.boutonAide = modalImage(numeroExercice, urlImage, titre, labelBouton = 'Illustration', icone = 'image')
    // this.boutonAide = modalPdf(numeroExercice, urlPdf, titre='Aide', labelBouton = 'Aide - PDF', icone = 'file pdf')
    // this.boutonAide = modalTexteCourt(numeroExercice, texte, labelBouton = 'Aide', icone = 'info circle')
    // this.boutonAide = modalTexteLong(numeroExercice, titre, texte, labelBouton = 'Aide', icone = 'info circle')
    // this.boutonAide = modalUrl(numeroExercice, url, labelBouton = 'Aide', icone) pour afficher le contenu de url dans un iframe
    // this.boutonAide = modalVideo(numeroExercice, urlVideo, titre, labelBouton, icone)
    // this.boutonAide = modalYoutube(numeroExercice, idYoutube, titre, labelBouton = 'Aide - Vidéo', icone = 'youtube')

    // ///////////////////////////////////////////////
    // Construction de l'exercice
    // ///////////////////////////////////////////////
    this.consigne = '' // Chaîne de caractère qui apparaît en gras au-dessus des questions de préférence à l'infinitif et AVEC point à la fin.
    this.consigneCorrection = '' // Chaîne de caractère en général vide qui apparaît au-dessus des corrections.
    this.introduction = '' // Texte qui n'est pas forcément en gras et qui apparaît entre la consigne et les questions.
    this.listeQuestions = [] // Liste de chaînes de caractères avec chacune correspondant à une question. Chaque question est définie par la méthode this.nouvelleVersion puis `listeDeQuestionToContenu(this)` mettra en forme `this.contenu` et `this.contenuCorrection` suivant `context` (sortie HTML ?...)
    this.listeCorrections = [] // Idem avec la correction.
    this.contenu = '' // Chaîne de caractères avec tout l'énoncé de l'exercice construit à partir de `this.listeQuestions` suivant le `context`
    this.contenuCorrection = '' // Idem avec la correction
    this.autoCorrection = [] // Liste des objets par question pour correction interactive || export AMC.
    this.tableauSolutionsDuQcm = [] // Pour sauvegarder les solutions des QCM.

    // ///////////////////////////////////////////////
    // Mise en forme de l'exercice
    // ///////////////////////////////////////////////
    this.spacing = 1 // Interligne des questions
    this.spacingCorr = 1 // Interligne des réponses

    // ////////////////////////////////////////////
    // Gestion de la sortie LateX
    // ////////////////////////////////////////////
    this.pasDeVersionLatex = false // booléen qui indique qu'une sortie LateX est impossible.
    this.listePackages = [] // string ou liste de string avec le nom des packages spécifiques à ajouter dans le préambule.
    this.consigneModifiable = true // booléen pour déterminer si la consigne est modifiable en ligne dans la sortie LaTeX.
    this.nbQuestionsModifiable = true // booléen pour déterminer si le nombre de questions est modifiable en ligne.
    this.nbCols = 1 // Nombre de colonnes pour la sortie LaTeX des questions (environnement multicols).
    this.nbColsCorr = 1 // Nombre de colonnes pour la sortie LaTeX des réponses (environnement multicols).
    this.nbColsModifiable = true // booléen pour déterminer si le nombre de colonnes est modifiable en ligne dans la sortie LaTeX.
    this.nbColsCorrModifiable = true // booléen pour déterminer si le nombre de colonnes de la correction est modifiable en ligne dans la sortie LaTeX.
    this.spacingModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX.
    this.spacingCorrModifiable = true // booléen pour déterminer si l'espacement est modifiable en ligne dans la sortie LaTeX.
    // this.vspace = -1 //Ajoute un \vspace{-1cm} avant l'énoncé ce qui peut être pratique pour des exercices avec des figures.

    // ////////////////////////////////////////////
    // Gestion de la sortie autre que LateX
    // ////////////////////////////////////////////
    this.beamer = false // booléen pour savoir si la sortie devra être un diaporama beamer
    this.tailleDiaporama = 1 // Facteur par lequel multiplier la police pour la vue 'diap'

    // ////////////////////////////////////////////
    // Paramètres
    // ////////////////////////////////////////////
    this.nbQuestions = 10 // Nombre de questions par défaut (récupéré dans l'url avec le paramètre `,n=`)
    this.pointsParQuestions = 1 // Pour définir la note par défaut d'un exercice dans sa sortie Moodle
    this.correctionDetailleeDisponible = false // booléen qui indique si une correction détaillée est disponible.
    this.correctionDetaillee = true // booléen indiquant si la correction détaillée doit être affiché par défaut (récupéré dans l'url avec le paramètre `,cd=`).
    this.correctionIsCachee = false // pour cacher une correction
    this.video = '' // Chaine de caractère pour un complément numérique (id Youtube, url, code iframe...).
    // Interactivité
    this.interactif = false // Exercice sans saisie utilisateur par défaut.
    this.interactifObligatoire = false // Certains exercices sont uniquement des QCM et n'ont pas de version non interactive.
    // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup ou dans le paramètre d'url ',s='
    this.besoinFormulaireNumerique = false // Sinon this.besoinFormulaireNumerique = [texte, max, tooltip facultatif]
    this.besoinFormulaireTexte = false // Sinon this.besoinFormulaireTexte = [texte, tooltip]
    this.besoinFormulaireCaseACocher = false // Sinon this.besoinFormulaireCaseACocher = [texte]
    // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup2 ou dans le paramètre d'url ',s2='
    this.besoinFormulaire2Numerique = false // Sinon this.besoinFormulaire2Numerique = [texte, max, tooltip facultatif]
    this.besoinFormulaire2Texte = false // Sinon this.besoinFormulaire2Texte = [texte, tooltip]
    this.besoinFormulaire2CaseACocher = false // Sinon this.besoinFormulaire2CaseACocher = [texte]
    // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup3 ou dans le paramètre d'url ',s3='
    this.besoinFormulaire3Numerique = false // Sinon this.besoinFormulaire3Numerique = [texte, max, tooltip facultatif]
    this.besoinFormulaire3Texte = false // Sinon this.besoinFormulaire3Texte = [texte, tooltip]
    this.besoinFormulaire3CaseACocher = false // Sinon this.besoinFormulaire3CaseACocher = [texte]
    // Ajoute un formulaire de paramétrage par l'utilisateur récupéré via this.sup4 ou dans le paramètre d'url ',s4='
    this.besoinFormulaire4Numerique = false // Sinon this.besoinFormulaire4Numerique = [texte, max, tooltip facultatif]
    this.besoinFormulaire4Texte = false // Sinon this.besoinFormulaire4Texte = [texte, tooltip]
    this.besoinFormulaire4CaseACocher = false // Sinon this.besoinFormulaire4CaseACocher = [texte]

    // ///////////////////////////////////////////////
    // Exercice avec des dépendances particulières
    // ///////////////////////////////////////////////
    // this.typeExercice = 'MG32' // Pour charger MathGraph32.
    this.mg32Editable = false // Les figures MG32 ne sont pas interactives par défaut.
    // this.dimensionsDivMg32 = [500, 450] // Dimensions du SVG créé par MathGraph32.

    // this.typeExercice = 'Scratch' // Pour charger Scratchblocks.
    // this.typeExercice = 'IEP' // Pour charger InstrumEnPoche.
    // this.typeExercice = 'dnb' // Ce n’est pas un exercice aléatoire il est traité différemment. Les exercices DNB sont des images pour la sortie Html et du code LaTeX statique pour la sortie latex.
    // this.typeExercice = 'XCas' // Pour charger le JavaScript de XCas qui provient de https://www-fourier.ujf-grenoble.fr/~parisse/giac_fr.html
    // this.typeExercice = 'simple' // Pour les exercices plus simples destinés aux courses aux nombres

    this.listeArguments = [] // Variable servant à comparer les exercices pour ne pas avoir deux exercices identiques

    /**
   * Compare chaque nouvelle version d'un exercice aux précédentes pour s'assurer de ne pas avoir deux exercices identiques
   * @param {int} i indice de la question
   * @param  {...any} args toutes les variables pertinentes qui "résumeraient" la question
   * @returns {boolean} true si la question n'a jamais été posée
   */
  }

  questionJamaisPosee (i, ...args) {
    if (i === 0) this.listeArguments = []
    let argsConcatenes = ''
    for (const arg of args) {
      if (arg !== undefined) argsConcatenes += arg.toString()
    }
    if (this.listeArguments.indexOf(argsConcatenes) > -1) {
      return false
    } else {
      this.listeArguments.push(argsConcatenes)
      return true
    }
  }
}
