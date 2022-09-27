import EncodeurTexte from '../Profs/P020.js'
export const titre = 'Message secret à décoder avec les tables de multiplication'

export default function MessageCodeAvecTables () {
  EncodeurTexte.call(this, 'exo')
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.besoinCorrection = true

  this.besoinFormulaireTexte = false
  this.besoinFormulaire2CaseACocher = false
  this.besoinFormulaire3Numerique = ['Texte à encoder', 3, '1 : Un seul mot\n2 : Une phrase avec la même grille\n3 : Une phrase avec plusieur grilles']
}
