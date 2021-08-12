import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, creerCouples, choice, combinaisonListes } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Tables de divisions'
export const interactifReady = true
export const interactifType = 'numerique'
export const amcReady = true
export const amcType = 'AMCNum' // Question numérique

/**
 * Tables de divisions classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot
* Référence CM002
  */
export default function TablesDeDivisions (tablesParDefaut = '2-3-4-5-6-7-8-9') {
  // Diviser deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = tablesParDefaut
  this.sup2 = 1 // classique|a_trous|melange
  this.interactif = true
  this.consigne = 'Calculer'
  this.spacing = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) {
      // Si aucune table n'est saisie
      this.sup = '2-3-4-5-6-7-8-9'
    }
    let tables = []
    if (typeof this.sup === 'number') {
      // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup
    } else {
      tables = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
    }
    const couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    const listeTypeDeQuestions = combinaisonListes(
      ['classique', 'a_trous'],
      this.nbQuestions
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let typeDeQuestions = 'a_trous'
    for (let i = 0, a, b, texte, texteCorr; i < this.nbQuestions; i++) {
      a = couples[i][0]
      b = couples[i][1]
      if (parseInt(this.sup2) === 1) {
        typeDeQuestions = 'classique'
      } else if (parseInt(this.sup2) === 2) {
        typeDeQuestions = 'a_trous'
      } else {
        typeDeQuestions = listeTypeDeQuestions[i]
      }
      if (typeDeQuestions === 'classique') {
        // classique
        texte = '$ ' + a * b + ' \\div ' + a + ' = \\dotfill $'
        if (this.interactif && context.isHtml) texte = `$ ${a * b} \\div ${a} = $` + ajouteChampTexte(this, i)
        setReponse(this, i, b)
      } else {
        // a trous
        if (choice([true, false])) {
          texte = `$ ${a * b} \\div \\ldots\\ldots = ${b}$`
          if (this.interactif && context.isHtml) texte = `$ ${a * b} \\div $` + ajouteChampTexte(this, i) + `$ = ${b} $`
          setReponse(this, i, a)
        } else {
          texte = `$ \\ldots\\ldots \\div ${a}  = ${b}$`
          if (this.interactif && context.isHtml) texte = ajouteChampTexte(this, i) + `$ \\div ${b} = ${a} $`
          setReponse(this, i, a * b)
        }
      }
      texteCorr = `$ ${a * b} \\div ${a} = ${b}$`
      if (context.isDiaporama) {
        texte = texte.replace('= \\dotfill', '')
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
  this.besoinFormulaire2Numerique = [
    'Style de questions',
    3,
    '1 : Classique\n2: À trous\n3: Mélangé'
  ]
}
