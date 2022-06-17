import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Connaître le cours sur le périmètre et l\'aire'

/**
 * Citer des formules de périmètre, des formules d'aire ou la définition de π
 * @author Rémi Angot
 * Référence 6M25
 */
export default function ConnaitreFormulesDePerimetreEtAires () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer :'
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const listeTypeDeQuestions = combinaisonListes(
      [
        'pi',
        'prectangle',
        'pcarre',
        'acarre',
        'arectangle',
        'pcercle',
        'acercle',
        'atrianglerectangle',
        'atriangle'
      ],
      this.nbQuestions
    )
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 'pi':
          texte = 'Rappeler la définition du nombre $\\pi$.'
          texteCorr = "$\\pi$ est la longueur d'un cercle de diamètre 1."
          break
        case 'prectangle':
          texte = 'Donner une formule du périmètre du rectangle.'
          texteCorr =
            '$\\mathcal{P}_{\\text{rectangle}}=(L+l)\\times2=L\\times2+l\\times2=L+l+L=l$<br><br>'
          texteCorr += 'Avec $L$ la longueur et $l$ la largeur du rectangle.'
          break
        case 'pcarre':
          texte = 'Donner une formule du périmètre du carré.'
          texteCorr =
            '$\\mathcal{P}_{\\text{carré}}=c\\times4=c+c+c+c$<br><br>'
          texteCorr += 'Avec $c$ la longueur du côté du carré.'
          break
        case 'arectangle':
          texte = "Donner une formule de l'aire du rectangle."
          texteCorr = '$\\mathcal{A}_{\\text{rectangle}}=L\\times l$<br><br>'
          texteCorr += 'Avec $L$ la longueur et $l$ la largeur du rectangle.'
          break
        case 'acarre':
          texte = "Donner une formule de l'aire du carré."
          texteCorr = '$\\mathcal{A}_{\\text{carré}}=c\\times c=c^2$<br><br>'
          texteCorr += 'Avec $c$ la longueur du côté du carré.'
          break
        case 'atrianglerectangle':
          texte = "Donner une formule de l'aire du triangle rectangle."
          texteCorr =
            '$\\mathcal{A}_{\\text{triangle rectangle}}=a\\times b \\div2=\\dfrac{a\\times b}{2}$<br><br>'
          texteCorr +=
            "Avec $a$ et $b$ les longueurs des côtés de l'angle droit."
          break
        case 'atriangle':
          texte = "Donner une formule de l'aire d'un triangle quelconque."
          texteCorr =
            '$\\mathcal{A}_{\\text{triangle rectangle}}=b\\times h \\div2=\\dfrac{b\\times h}{2}$<br><br>'
          texteCorr +=
            "Avec $b$ la longueur d'un côté et $h$ la longueur de la hauteur relative à ce côté."
          break
        case 'pcercle':
          texte =
            "Donner une formule de la longueur d'un cercle (aussi appelée circonférence)."
          texteCorr =
            '$\\mathcal{P}_{\\text{cercle}}=D\\times \\pi = 2\\times R \\times \\pi = 2\\pi{}R$<br><br>'
          texteCorr += 'Avec $D$ le diamètre et $R$ le rayon de ce cercle.'
          break
        case 'acercle':
          texte = "Donner une formule de l'aire d'un disque."
          texteCorr =
            '$\\mathcal{A}_{\\text{disque}}=R\\times R\\times\\pi=\\pi R^2$<br><br>'
          texteCorr += 'Avec $R$ le rayon de ce disque.'
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
