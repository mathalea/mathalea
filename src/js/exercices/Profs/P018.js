import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import Pyramide from '../../modules/pyramide.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseenforme.js'
export const titre = 'Générateur de pyramides'

export default class Pyramides extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1 // Ici le nombre de questions (une seule pour cet exercice non modifiable)
    this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
    this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne

    this.besoinFormulaireNumerique = ['Type de pyramide', 2, '1 : Pyramide additive\n 2 : Pyramide multiplicative']
    this.besoinFormulaire2Texte = ['Valeur minimale de base']
    this.besoinFormulaire3Texte = ['Valeur maximale de base']
    this.besoinFormulaire4Numerique = ['Nombre d\'étages', 8]
    this.sup4 = 3
    this.sup3 = 10
    this.sup2 = 1
    this.sup = '+'
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    let operation
    const taille = parseInt(this.sup4)
    let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texteCorr = '' // Idem pour le texte de la correction.
    switch (parseInt(this.sup)) {
      case 2:
        operation = '*'
        break
      case 1:
        operation = '+'
        break
    }

    const Pyr = new Pyramide({ operation, nombreEtages: taille, rangeData: [parseInt(this.sup2), parseInt(this.sup3)], exclusions: [0] })
    Pyr.aleatoirise()
    const mesObjets = Pyr.representeMoi(0, 0)
    for (let y = taille; y > 0; y--) {
      for (let x = 0; x < y; x++) {
        Pyr.isVisible[y - 1][x] = true
      }
    }
    const mesObjetsCorr = Pyr.representeMoi(0, 0)
    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal

    const paramsEnonce = Object.assign({}, fixeBordures(mesObjets), { pixelsParCm: 20, scale: 1, mainlevee: false })
    const paramsCorrection = Object.assign({}, fixeBordures(mesObjetsCorr), { pixelsParCm: 20, scale: 1, mainlevee: false })

    // paramètres de la fenêtre Mathalea2d pour la correction
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    texte += mathalea2d(paramsEnonce, mesObjets)
    texteCorr += mathalea2d(paramsCorrection, mesObjetsCorr)
    // On ajoute au texte de la correction, la figure de la correction
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
