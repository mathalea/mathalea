import Exercice from '../Exercice.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { multiply } from 'mathjs'
import { fraction } from '../../modules/fractions.js'
export const titre = 'Tests avec les fractions'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.spacing = 3
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let texte = ''
    const texteCorr = ''

    // La ligne suivante crée la fraction - 1/2
    const maFraction = fraction(8, 16)
    // Si on veut manipuler (-8)/16, on doit définir n, d et s ainsi :
    //  maFraction.n = 8
    //  maFraction.d = 16
    // maFraction.s = 1 // Le signe (devant la fraction)est positif car il est passé sur le numérateur.
    texte += 'Je définis maFraction = new Fraction() -> sa valeur sera 0 {s: 1, n: 0, : 1}<br>'
    texte += `je modifie ses attributs : {n: 8, d: 16} -> j'obtiens $${maFraction.texFraction}$ avec maFraction.texFraction<br>`
    texte += `j'obtiens $${maFraction.texFractionSigneDevant}$ avec maFraction.texFractionSigneDevant<br>`
    texte += `j'obtiens $${maFraction.toLatex()}$ avec maFraction.toLatex() car mathjs utilise \\frac<br>`
    texte += `Voici maFraction.pourcentage : $${maFraction.pourcentage}$<br>`
    texte += `Voici maFraction.texRacineCarree(true) : $${maFraction.texRacineCarree(true)}$<br>`
    const f2 = multiply(maFraction, 32)
    texte += 'Je crée une nouvelle fraction f2 = multiply(maFraction, 32)<br>'
    texte += `Voici f2.texFraction : $${f2.texFraction}$ et voici f2.toLatex() : $${f2.toLatex()}$<br>`
    const f3 = multiply(maFraction, fraction(-1, 3))
    texte += 'Je crée une nouvelle fraction f3 = multiply(maFraction, fraction(-1,3))<br>'
    texte += `Voici f3.texFraction : $${f3.texFraction}$ et voici f3.toLatex() : $${f3.toLatex()}$<br>`
    texte += 'mathjs simplifie les fractions dès que possible. Si on veut travailler avec des fractions non simplifiées, il faut fixer le numérateur et le dénominateur directement.<br>'
    texte += `Si j'avais défini maFraction = new Fraction(8,16), j'aurais obtenu ceci : $${fraction(8, 16).texFraction}$ avec maFraction.texFraction car maFraction = {s: 1, n: 1, d: 2}<br>`

    console.log(maFraction)
    console.log(maFraction.inverse())
    console.log(maFraction.simplifie())
    console.log(maFraction.texRacineCarree(true))
    console.log(fraction(-5, 4))
    console.log(fraction(-2, -3))
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
