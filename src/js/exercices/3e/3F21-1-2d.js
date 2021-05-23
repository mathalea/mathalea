
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, ecritureAlgebrique, randint, reduireAxPlusB, texNombre, katexPopup2 } from '../../modules/outils.js'
import { droiteParPointEtPente, point, repere2, mathalea2d } from '../../modules/2d.js'
export const titre = 'Déterminer une fonction affine'

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @author Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function LectureExpressionFonctionsAffines () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Donner l'expression des fonctions représentées"
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  // eslint-disable-next-line no-undef
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  // eslint-disable-next-line no-undef
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.sup = 1
  this.sup2 = 3
  this.lineaire = false
  this.listePackages = 'tkz-euclide'

  this.nouvelleVersion = function (numeroExercice) {
    const k = Math.pow(2, parseInt(this.sup) - 1)
    const nbDroites = parseInt(this.sup2)
    this.listeQuestions = []
    this.listeCorrections = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    const listeDroites = []
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
    const d = []
    for (let i = 0; i < 5; i++) {
      if (this.lineaire) { OrdX0 = 0 } else { OrdX0 = randint(-1 + Pente[i] / k, 1 + Pente[i] / k) }
      listeDroites.push([OrdX0, Pente[i] / k])
    }
    d[0] = droiteParPointEtPente(point(0, listeDroites[0][0]), listeDroites[0][1], 'd_1', 'blue')
    d[1] = droiteParPointEtPente(point(0, listeDroites[1][0]), listeDroites[1][1], 'd_2', 'red')
    d[2] = droiteParPointEtPente(point(0, listeDroites[2][0]), listeDroites[2][1], 'd_3', 'green')
    d[3] = droiteParPointEtPente(point(0, listeDroites[3][0]), listeDroites[3][1], 'd_4', 'brown')
    d[4] = droiteParPointEtPente(point(0, listeDroites[4][0]), listeDroites[4][1], 'd_5', 'purple')
    const r = repere2({ xMin: -5, yMin: -5, xMax: 5, yMax: 5 })
    const objets2d = []
    for (let i = 0; i < nbDroites; i++) {
      objets2d.push(d[i])
    }
    objets2d.push(r)
    this.introduction = mathalea2d({ xmin: -5.5, ymin: -5.5, xmax: 5.5, ymax: 5.5 }, objets2d)
    for (let i = 0; i < nbDroites; i++) {
      this.listeQuestions.push(`Déterminer l'expression de la fonction $f_${i + 1}$ représentée par la droite $(d_${i + 1})$.`)
      if (this.lineaire || listeDroites[i][0] === 0) {
        this.listeCorrections.push(`La droite $(d_${i + 1})$ passe par l'origine. Elle représente donc la fonction linéaire $f_${i + 1}(x)=ax$ dont il faut déterminer le coefficient a.<br>$(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1])}$ c'est à dire $a\\times 1=${texNombre(listeDroites[i][1])}$ donc $a=${texNombre(listeDroites[i][1])}\\div 1$ d'où $a=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], 0)}$.`)
      } else {
        this.listeCorrections.push(`La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${texNombre(listeDroites[i][0])})$. Elle représente donc la fonction affine $f_${i + 1}(x)=ax+b$ dont la constante $b$ est égale à $f_${i + 1}(0)=a\\times 0+b$, c'est à dire  $${texNombre(listeDroites[i][0])}=0+b$ donc $b=${texNombre(listeDroites[i][0])}$.<br> De plus $(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1] + listeDroites[i][0])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1] + listeDroites[i][0])}=a\\times 1${ecritureAlgebrique(listeDroites[i][0])}=a${ecritureAlgebrique(listeDroites[i][0])}$ donc $a=${texNombre(listeDroites[i][1] + listeDroites[i][0])}${ecritureAlgebrique(-listeDroites[i][0])}=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], listeDroites[i][0])}$.`)
      }
    }

    listeQuestionsToContenu(this)
    if (!this.lineaire) {
      this.contenuCorrection = 'Il s’agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l’ordonnée à l’origine et $a$ la pente de la droite.\n' + this.contenuCorrection
    } else {
      this.contenuCorrection = 'Il s’agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la ' + katexPopup2(numeroExercice, 1, 'pente', 'pente d\'une droite', 'La pente (le a de y=ax ou y=ax+b) d\'une droite donne le taux d\'accroissement de y par rapport à x : lorsque x augmente de 1, alors y augmente de a.') + ' de la droite.\n' + this.contenuCorrection
    }
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"]
  this.besoinFormulaire2Numerique = ['Nombre de droites (1 à 5)', 5]
}
