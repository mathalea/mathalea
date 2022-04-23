export default class Exercice {
  constructor () {
    this.titre = ''
    this.boutonAide = false
    this.consigne = ''
    this.consigneCorrection = ''
    this.introduction = ''
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = ''
    this.contenuCorrection = ''
    this.autoCorrection = []
    this.tableauSolutionsDuQcm = []
    this.spacing = 1
    this.spacingCorr = 1
    this.pasDeVersionLatex = false
    this.listePackages = []
    this.consigneModifiable = true
    this.nbQuestionsModifiable = true
    this.nbCols = 1
    this.nbColsCorr = 1
    this.nbColsModifiable = true
    this.nbColsCorrModifiable = true
    this.spacingModifiable = true
    this.spacingCorrModifiable = true
    this.beamer = false
    this.tailleDiaporama = 1
    this.nbQuestions = 10
    this.pointsParQuestions = 1
    this.correctionDetailleeDisponible = false
    this.correctionDetaillee = true
    this.correctionIsCachee = false
    this.video = ''
    this.interactif = false
    this.interactifObligatoire = false
    this.besoinFormulaireNumerique = false
    this.besoinFormulaireTexte = false
    this.besoinFormulaireCaseACocher = false
    this.besoinFormulaire2Numerique = false
    this.besoinFormulaire2Texte = false
    this.besoinFormulaire2CaseACocher = false
    this.besoinFormulaire3Numerique = false
    this.besoinFormulaire3Texte = false
    this.besoinFormulaire3CaseACocher = false
    this.besoinFormulaire4Numerique = false
    this.besoinFormulaire4Texte = false
    this.besoinFormulaire4CaseACocher = false
    this.mg32Editable = false
    this.listeArguments = []
  }

  questionJamaisPosee (i, ...args) {
    if (i === 0) { this.listeArguments = [] }
    let argsConcatenes = ''
    for (const arg of args) {
      if (arg !== undefined) { argsConcatenes += arg.toString() }
    }
    if (this.listeArguments.indexOf(argsConcatenes) > -1) {
      return false
    } else {
      this.listeArguments.push(argsConcatenes)
      return true
    }
  }
}
