import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenuSansNumero, ecritureAlgebrique, randint, reduireAxPlusB, texNombre, katex_Popup2 } from '../../modules/outils.js'
import {SVG_Tracer_droite, Latex_Tracer_droite, SVG_repere, Latex_repere } from '../../modules/macroSvgJs.js'
import SVG from 'svg.js'
export const titre = 'Déterminer une fonction affine'

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @Auteur Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function Lecture_expression_fonctions_affines () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Donner l'expression des fonctions représentées"
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  sortieHtml ? this.spacing = 2 : this.spacing = 1
  sortieHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.sup = 1
  this.sup2 = 3
  this.lineaire = false
  this.listePackages = 'tkz-euclide'

  this.nouvelleVersion = function (numeroExercice) {
    const k = Math.pow(2, parseInt(this.sup) - 1)
    const nb_droites = parseInt(this.sup2)
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    const liste_droites = []
    let OrdX0
    const Pente = []
    if (!this.lineaire) {
      Pente.push(randint(-2 * k, 2 * k))
      Pente.push(randint(-2 * k, 2 * k, [Pente[0]]))
      Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1]]))
      Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2]]))
      Pente.push(randint(-2 * k, 2 * k, [Pente[0], Pente[1], Pente[2], Pente[3]]))
    } else {
      Pente.push(randint(-3 * k, 3 * k, [0]))
      Pente.push(randint(-3 * k, 3 * k, [Pente[0], 0]))
      Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], 0]))
      Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], 0]))
      Pente.push(randint(-3 * k, 3 * k, [Pente[0], Pente[1], Pente[2], Pente[3], 0]))
    }

    for (let i = 0; i < 5; i++) {
      if (this.lineaire) { OrdX0 = 0} else { OrdX0 = randint(-1 + Pente[i] / k, 1 + Pente[i] / k)}
      liste_droites.push([OrdX0, Pente[i] / k])
    }

    if (sortieHtml) {
      const mon_svg = SVG().viewbox(0, 0, 500, 500).size('100%', '100%')
      SVG_repere(mon_svg, -5, 5, -5, 5, k, k, 500, 500, true)
      SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', '(d1)')
      if (nb_droites > 1) { SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', '(d2)')}
      if (nb_droites > 2) { SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', '(d3)')}
      if (nb_droites > 3) { SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', '(d4)')}
      if (nb_droites > 4) { SVG_Tracer_droite(mon_svg, 500, 500, -5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', '(d5)')}
      this.consigne = `<div style="width: 50%; display : table ">${mon_svg.svg()}</div>`
    } else { // sortie Latex
      let texte = '\\begin{tikzpicture}'
      texte += Latex_repere(-5, 5, -5, 5, k, k, true)
      texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[0][0], liste_droites[0][1], 'blue', 'd_1')
      if (nb_droites > 1) { texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[1][0], liste_droites[1][1], 'red', 'd_2')}
      if (nb_droites > 2) { texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[2][0], liste_droites[2][1], 'green', 'd_3')}
      if (nb_droites > 3) { texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[3][0], liste_droites[3][1], 'brown', 'd_4')}
      if (nb_droites > 4) { texte += Latex_Tracer_droite(-5, 5, -5, 5, liste_droites[4][0], liste_droites[4][1], 'purple', 'd_5')}
      texte += '\n\t \\end{tikzpicture}'
      this.listeQuestions.push(texte)
    }
    for (let i = 0; i < nb_droites; i++) {
      this.listeQuestions.push(`Déterminer l'expression de la fonction $f_${i + 1}$ représentée par la droite $(d_${i + 1})$.`)
      if (this.lineaire || liste_droites[i][0] == 0) {
        this.listeCorrections.push(`La droite $(d_${i + 1})$ passe par l'origine. Elle représente donc la fonction linéaire $f_${i + 1}(x)=ax$ dont il faut déterminer le coefficient a.<br>$(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(liste_droites[i][1])})$ donc $f_${i + 1}(1)=${texNombre(liste_droites[i][1])}$ c'est à dire $a\\times 1=${texNombre(liste_droites[i][1])}$ donc $a=${texNombre(liste_droites[i][1])}\\div 1$ d'où $a=${texNombre(liste_droites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(liste_droites[i][1], 0)}$.`)
      } else {
        this.listeCorrections.push(`La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${texNombre(liste_droites[i][0])})$. Elle représente donc la fonction affine $f_${i + 1}(x)=ax+b$ dont la constante $b$ est égale à $f_${i + 1}(0)=a\\times 0+b$, c'est à dire  $${texNombre(liste_droites[i][0])}=0+b$ donc $b=${texNombre(liste_droites[i][0])}$.<br> De plus $(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(liste_droites[i][1] + liste_droites[i][0])})$ donc $f_${i + 1}(1)=${texNombre(liste_droites[i][1] + liste_droites[i][0])}=a\\times 1${ecritureAlgebrique(liste_droites[i][0])}=a${ecritureAlgebrique(liste_droites[i][0])}$ donc $a=${texNombre(liste_droites[i][1] + liste_droites[i][0])}${ecritureAlgebrique(-liste_droites[i][0])}=${texNombre(liste_droites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(liste_droites[i][1], liste_droites[i][0])}$.`)
      }
    }

    listeQuestionsToContenuSansNumero(this)
    if (!this.lineaire) { this.contenuCorrection = 'Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n' + this.contenuCorrection} else { this.contenuCorrection = 'Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la ' + katex_Popup2(numeroExercice, 1, 'pente', 'pente d\'une droite', 'La pente (le a de y=ax ou y=ax+b) d\'une droite donne le taux d\'accroissement de y par rapport à x : lorsque x augmente de 1, alors y augmente de a.') + ' de la droite.\n' + this.contenuCorrection}
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"]
  this.besoin_formulaire2_numerique = ['Nombre de droites (1 à 5)', 5]
}
