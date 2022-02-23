import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, arrondi, calcul, texNombre, texNombrec, arrondiVirgule, stringNombre } from '../../modules/outils.js'
import { texteSurSegment, pointAdistance, polygoneAvecNom, afficheMesureAngle, codageAngleDroit, point, segment, mathalea2d } from '../../modules/2d.js'
export const titre = 'Calculer la hauteur d’un objet vu sous un angle donné'

/**
 * propose de mesurer la hauteur d'un objet en utilisant l'angle sous lequel on voit l'objet et la distance à l'objet.
 * @author Jean-Claude Lhote
 * Référence 3G32-2
*/
export default function CalculsTrigonometriques2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.sup = true // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.nbQuestions = 1
  this.spacingCorr = 2
  this.spacing = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const objet = [['arbre', 'un', ''], ['immeuble', 'un', ''], ['éolienne', 'une', 'te'], ['coline', 'une', 'te']]
    let distance; let hauteur; let alfa; let baita; let beta; let alpha; let teta; let taille; let index; let A; let B; let O; let H; let S; let objets = []; let p
    if (context.isHtml) {
      alfa = 'α'
      baita = 'β'
    } else {
      alfa = '\\alpha'
      baita = '\\beta'
    }

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question

      objets = []
      distance = randint(5, 300)
      hauteur = calcul(randint(150, 190) / 100)
      beta = Math.atan(hauteur / distance)
      alpha = randint(10, 50)
      teta = alpha * Math.PI / 180 - beta
      taille = arrondi(hauteur + distance * Math.tan(teta), 1)
      if (taille < 20) index = 0
      else if (taille < 50) index = 1
      else if (taille < 100) index = 2
      else index = 3
      A = point(0, 0, 'A')
      B = pointAdistance(A, 12, 0, 'B')
      O = pointAdistance(A, 3, 90, 'O')
      H = pointAdistance(B, 3, 90, 'H')
      S = pointAdistance(B, 9, 90, 'S')
      p = polygoneAvecNom(A, B, H, S, O)
      objets.push(p[1], p[0], segment(O, B), segment(O, H), codageAngleDroit(O, A, B), codageAngleDroit(A, B, H), codageAngleDroit(O, H, S))
      objets.push(afficheMesureAngle(B, O, S, 'black', 3, `${alfa}`), afficheMesureAngle(A, B, O, 'black', 2, `${baita}`), afficheMesureAngle(B, O, H, 'black', 2, `${baita}`))
      objets.push(texteSurSegment(`${stringNombre(hauteur)} m`, O, A, 'black', -0.5), texteSurSegment(`${stringNombre(distance)} m`, O, H))
      texte = `Un observateur regarde ${objet[index][1]} ${objet[index][0]} sous un angle de $${alpha}\\degree$.<br>`
      texte += `Cet${objet[index][2]} ${objet[index][0]} est situé à une distance de $${texNombre(distance)}$ m de l'observateur.<br>`
      texte += `l'oeil de l'observateur est situé à $${texNombre(hauteur)}$ m du sol.<br>`
      if (this.sup) {
        texte += `$O$ représente l'oeil de l'observateur, $[BS]$ représente cet${objet[index][2]} ${objet[index][0]}.<br>`

        texte += 'Le schéma ci-dessous n\'est pas en vraie grandeur.<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets)
        texte += `<br>Calculer d'abord l'angle $${baita}$.<br>`
        texte += 'En déduire la mesure de l\'angle $\\widehat{HOS}$.<br>'
        texte += 'Calculer alors la longueur $HS$.<br>'
      }
      texte += `Calculer la hauteur de cet${objet[index][2]} ${objet[index][0]} arrondie au mètre près.<br>`

      texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 14, ymax: 10, pixelsParCm: 20, scale: 0.5 }, objets)
      texteCorr += `<br>Dans le triangle $OHB$ rectangle en $H$, $\\tan(${baita})=\\dfrac{HB}{OH}$.<br>D'où $${baita}=\\arctan(\\dfrac{${texNombre(hauteur)}}{${texNombre(distance)}})\\approx ${arrondiVirgule(beta)}\\degree$.<br>`
      texteCorr += `$\\widehat{HOS}=${alfa}-${baita}\\approx ${arrondiVirgule(alpha - beta)}$.<br>`
      texteCorr += `$HS=OH\\times \\tan(\\widehat{HOS})\\approx ${distance}\\times \\tan(${arrondiVirgule(alpha - beta)})\\approx ${texNombrec(taille - hauteur)}$ m.<br>`
      texteCorr += `$BS=BH+HS=${texNombre(hauteur)}+${texNombrec(taille - hauteur)}=${texNombre(taille)}$ m.<br>`
      texteCorr += `Cet${objet[index][2]} ${objet[index][0]} mesure $${texNombre(Math.round(taille))}$ m de hauteur.`

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
  this.besoinFormulaireCaseACocher = ['Afficher un schéma et des questions intermédiaires']
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu
