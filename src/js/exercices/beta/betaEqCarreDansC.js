import { listeQuestionsToContenu, randint, ecritureParentheseSiNegatif } from '../../modules/outils.js'
import { context } from '../../modules/context.js'
import Exercice from '../Exercice.js'
import { complex } from 'mathjs'
export const titre = 'Racine carrée nombre complexe'

/**
 * Description didactique de l'exercice
 * @author Eric Schrafstetter
 * Référence
*/
export default function ResoudreDesEquationsCarreeDansC () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Résoudre dans $\\mathbb{C}$ les équations :'
  this.nbQuestions = 2
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, a, b, z, zr, s, zx, zsol, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      a = randint(-20, 20, 0) // on part d'un complexe a+ib
      b = randint(-20, 20, 0)
      z = complex(a * a - b * b, 2 * a * b) // que l'on met au carré
      zr = z.toPolar().r // module du carré
      s = z.re + zr // Somme de E1 et E3
      zx = Math.sqrt(s / 2)
      zsol = complex(zx, z.im / 2 / zx) // Solution du système
      // Enoncé
      texte = `$z^2=${z}$`
      // Corrigé
      texteCorr = 'Remplaçons $z$ par sa forme algébrique $a+ib$ :'
      texteCorr += `<br>$z^2=(a+ib)^2=${z}$`
      texteCorr += '<br>Or $(a+ib)^2=a^2+2abi+(ib)^2=a^2+2abi-b^2$'
      texteCorr += '<br>De plus, si 2 nombres complexes sont égaux, c\'est qu\'ils ont la même partie réelle et la même partie imaginaire.'
      texteCorr += `<br>En $\\textbf{\\text{identifiant les parties réelles}}$ à gauche et à droite de l'égalité<br>$a^2+2abi-b^2=${z}$<br>on obtient :`
      texteCorr += `<br>$\\begin{matrix}(E_1) & a^2-b^2=${z.re} \\end{matrix}$`
      texteCorr += '<br>De même, en $\\textbf{\\text{identifiant les parties imaginaires}}$ :'
      texteCorr += `<br>$\\begin{matrix}(E_2) & 2ab=${z.im} \\end{matrix}$`
      texteCorr += '<br>Afin de résoudre plus facilement ce système, ajoutons une $\\textbf{\\text{troisième équation}}$ en utilisant les modules :'
      texteCorr += `<br>$\\mid z^2\\mid=\\mid${z}\\mid$`
      texteCorr += '<br>avec $\\mid z^2\\mid=\\mid z\\mid^2=a^2+b^2$'
      texteCorr += ` et $\\mid${z}\\mid=`
      texteCorr += `\\sqrt{${ecritureParentheseSiNegatif(z.re)}^2+${ecritureParentheseSiNegatif(z.im)}^2}=${zr}$`
      texteCorr += '<br>Ce qui permet d\'obtenir l\'équation :'
      texteCorr += `<br>$\\begin{matrix}(E_3) & a^2+b^2=${zr} \\end{matrix}$`
      texteCorr += `<br>En faisant $(E_1)$ + $(E_3)$ : $2a^2=${s}$`
      texteCorr += `<br>qui admet 2 solutions $a=${-zsol.re}$ ou $a=${zsol.re}$`
      texteCorr += `<br>En remplaçant $a=${-zsol.re}$ dans $(E_2)$ : `
      texteCorr += `$2\\times (${-zsol.re}) \\times b = ${z.im}$`
      texteCorr += `<br>On trouve $b=${-zsol.im}$`
      texteCorr += `<br>De même, en remplaçant $a=${zsol.re}$ dans $(E_2)$ : `
      texteCorr += `$2\\times ${zsol.re} \\times b = ${z.im}$`
      texteCorr += `<br>On trouve $b=${zsol.im}$`
      texteCorr += `<br>$\\underline{\\text{Conclusion}}$ : L'équation admet 2 solutions $z=${zsol}$ et $z=${zsol.neg()}$`

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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]
}

// python3 list-to-js.py pour faire apparaître l'exercice dans le menu
