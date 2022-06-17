
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, ecritureAlgebrique, randint, reduireAxPlusB, texNombre, katexPopup2 } from '../../modules/outils.js'
import { droiteParPointEtPente, point, repere2, mathalea2d, positionLabelDroite, latexParPoint } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Déterminer une fonction affine'
export const amcReady = true
export const amcType = 'AMCOpenNum✖︎2'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Trace 5 droites et demande l'expression de la fonction affine ou linéaire correspondante
 * @author Jean-Claude Lhote
 * Référence : 3F21-1
 */
export default function LectureExpressionFonctionsAffines () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.sup = 1
  this.sup2 = 3
  this.lineaire = false
  this.amcReady = amcReady
  this.amcType = amcType

  this.nouvelleVersion = function (numeroExercice) {
    let explain = ''
    let k = Math.pow(2, parseInt(this.sup) - 1)
    let nbDroites = parseInt(this.sup2)
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const colors = ['blue', 'red', 'black', 'purple', 'brown']
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    const listeDroites = []
    const posLab = []
    const nomDroite = []
    context.fenetreMathalea2d = [-5.5, -5.5, 5.5, 5.5]
    const pente = []
    let OrdX0
    if (context.isAmc) {
      nbDroites = 1
      k = 1
    }
    pente.push(randint(-3 * k, 3 * k, 0))
    pente.push(randint(-3 * k, 3 * k, [pente[0], 0]))
    pente.push(randint(-3 * k, 3 * k, [pente[0], pente[1], 0]))
    pente.push(randint(-3 * k, 3 * k, [pente[0], pente[1], pente[2], 0]))
    pente.push(randint(-3 * k, 3 * k, [pente[0], pente[1], pente[2], pente[3], 0]))
    const d = []
    for (let i = 0; i < 5; i++) {
      if (this.lineaire) { OrdX0 = 0 } else { OrdX0 = randint(-1 + pente[i] / k, 1 + pente[i] / k, [pente[i], 0]) }
      listeDroites.push([OrdX0, pente[i] / k])
    }
    const r = repere2({ xMin: -6, yMin: -6, xMax: 6, yMax: 6 })
    const objets2d = []
    objets2d.push(r)
    for (let i = 0; i < nbDroites; i++) {
      d[i] = droiteParPointEtPente(point(0, listeDroites[i][0]), listeDroites[i][1], '', colors[i])
      posLab[i] = positionLabelDroite(d[i], { xmin: -5.5, ymin: -5.5, xmax: 5.5, ymax: 5.5 })
      posLab[i].positionLabel = 'center'
      nomDroite[i] = latexParPoint(`(d_${i + 1})`, posLab[i], colors[i], 20, 10, '', 6)
      objets2d.push(d[i], nomDroite[i])
    }

    this.introduction = mathalea2d({ xmin: -5.5, ymin: -5.5, xmax: 5.5, ymax: 5.5, pixelsParCm: 30, scale: 0.75 }, objets2d)
    for (let i = 0; i < nbDroites; i++) {
      this.listeQuestions.push(`Déterminer l'expression de la fonction $f_${i + 1}$ représentée par la droite $(d_${i + 1})$.<br>` + ajouteChampTexteMathLive(this, i, 'inline largeur 50', { texte: `$f_${i + 1}(x)=$` }))
      if (this.lineaire || listeDroites[i][0] === 0) {
        explain += `La droite $(d_${i + 1})$ passe par l'origine. Elle représente donc la fonction linéaire $f_${i + 1}(x)=ax$ dont il faut déterminer le coefficient a.<br>$(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1])}$ c'est-à-dire $a\\times 1=${texNombre(listeDroites[i][1])}$ donc $a=${texNombre(listeDroites[i][1])}\\div 1$ d'où $a=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], 0)}$.`
        this.listeCorrections.push(`La droite $(d_${i + 1})$ passe par l'origine. Elle représente donc la fonction linéaire $f_${i + 1}(x)=ax$ dont il faut déterminer le coefficient a.<br>$(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1])}$ c'est-à-dire $a\\times 1=${texNombre(listeDroites[i][1])}$ donc $a=${texNombre(listeDroites[i][1])}\\div 1$ d'où $a=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], 0)}$.`)
        setReponse(this, i, reduireAxPlusB(listeDroites[i][1], 0))
      } else {
        explain += `La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${texNombre(listeDroites[i][0])})$. Elle représente donc la fonction affine $f_${i + 1}(x)=ax+b$ dont la constante $b$ est égale à $f_${i + 1}(0)=a\\times 0+b$, c'est-à-dire  $${texNombre(listeDroites[i][0])}=0+b$ donc $b=${texNombre(listeDroites[i][0])}$.<br> De plus $(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1] + listeDroites[i][0])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1] + listeDroites[i][0])}=a\\times 1${ecritureAlgebrique(listeDroites[i][0])}=a${ecritureAlgebrique(listeDroites[i][0])}$ donc $a=${texNombre(listeDroites[i][1] + listeDroites[i][0])}${ecritureAlgebrique(-listeDroites[i][0])}=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], listeDroites[i][0])}$.`
        this.listeCorrections.push(`La droite $d_${i + 1}$ passe par le point de coordonnées $(0;${texNombre(listeDroites[i][0])})$. Elle représente donc la fonction affine $f_${i + 1}(x)=ax+b$ dont la constante $b$ est égale à $f_${i + 1}(0)=a\\times 0+b$, c'est-à-dire  $${texNombre(listeDroites[i][0])}=0+b$ donc $b=${texNombre(listeDroites[i][0])}$.<br> De plus $(d_${i + 1})$ passe par le point de coordonnées $(1;${texNombre(listeDroites[i][1] + listeDroites[i][0])})$ donc $f_${i + 1}(1)=${texNombre(listeDroites[i][1] + listeDroites[i][0])}=a\\times 1${ecritureAlgebrique(listeDroites[i][0])}=a${ecritureAlgebrique(listeDroites[i][0])}$ donc $a=${texNombre(listeDroites[i][1] + listeDroites[i][0])}${ecritureAlgebrique(-listeDroites[i][0])}=${texNombre(listeDroites[i][1])}$. Ainsi $f_${i + 1}(x)=${reduireAxPlusB(listeDroites[i][1], listeDroites[i][0])}$.`)
        setReponse(this, i, reduireAxPlusB(listeDroites[i][1], listeDroites[i][0]))
      }
    }
    listeQuestionsToContenu(this)
    if (!this.lineaire) {
      explain = 'Il s\'agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l\'ordonnée à l\'origine et $a$ la pente de la droite.\\\n' + explain
      this.contenuCorrection = 'Il s\'agit de fonctions affines, elles sont donc de la forme $f(x)=ax+b$, $b$ étant l\'ordonnée à l\'origine et $a$ la pente de la droite.\n' + this.contenuCorrection
    } else {
      explain = 'Il s\'agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la pente de la droite.\\ \n' + explain
      this.contenuCorrection = 'Il s\'agit de fonctions linéaires, elles sont donc de la forme $f(x)=ax$, $a$ étant la ' + katexPopup2(numeroExercice, 1, 'pente', 'pente d\'une droite', 'La pente (le a de y=ax ou y=ax+b) d\'une droite donne le taux d\'accroissement de y par rapport à x : lorsque x augmente de 1, alors y augmente de a.') + ' de la droite.\n' + this.contenuCorrection
    }
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: "Déterminer l'expression  de la fonction représentée ci dessous : <br>" + mathalea2d({ xmin: -5.5, ymin: -5.5, xmax: 5.5, ymax: 5.5, pixelsParCm: 30, scale: 0.5 }, objets2d) + '<br>',
        propositions: [{ texte: explain, statut: 2 }],
        reponse: { texte: 'coefficient', valeur: pente[0], param: { digits: 1, decimals: 0, signe: true, exposantNbChiffres: 0, exposantSigne: false, approx: 0 } },
        reponse2: { texte: "ordonnée \\\\\nà l'origine", valeur: listeDroites[0][0], param: { digits: 1, decimals: 0, signe: true, exposantNbChiffres: 0, exposantSigne: false, approx: 0 } }
      }
    }
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, "1 : Coefficient directeur entier\n2 : Coefficient directeur 'en demis'\n3 : Coefficient directeur 'en quarts'"]
  this.besoinFormulaire2Numerique = ['Nombre de droites (1 à 5)', 5]
}
