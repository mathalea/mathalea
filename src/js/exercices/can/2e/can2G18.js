import Exercice from '../../Exercice.js'
import { randint, listeQuestionsToContenu, sp } from '../../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { repere, mathalea2d, texteParPosition, point, segment, vecteur } from '../../../modules/2d.js'
export const titre = 'Déterminer les coordonnées d’un vecteur à partir d’un graphique'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '29/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export default function LectureGraphiqueVecteurRepere () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.formatChampTexte = 'largeur10 inline'
  this.tailleDiaporama = 1

  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let texte, texteCorr, xa, ya, k1, k2, o, r1, A, B, vAB, xmin, xmax, ymin, ymax, nomvAB, AB
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      xa = randint(-2, 2)
      ya = randint(-2, 2)
      k1 = randint(-6, 6, 0)
      k2 = randint(-6, 6)
      A = point(xa, ya)
      B = point(xa + k1, ya + k2)
      xmin = Math.min(A.x, B.x, -1) - 2
      ymin = Math.min(A.y, B.y, -1) - 2
      xmax = Math.max(A.x, B.x, 1) + 2
      ymax = Math.max(A.y, B.y, 1) + 2
      AB = segment(A, B, 'blue', '->')
      AB.epaisseur = 2
      vAB = vecteur(A, B)
      o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
      nomvAB = vAB.representantNomme(A, 'u', 2, 'blue')
      r1 = repere({
        xMin: xmin,
        xMax: xmax,
        xUnite: 1,
        yMin: ymin,
        yMax: ymax,
        yUnite: 1,
        thickHauteur: 0.2,
        xLabelMin: xmin + 1,
        xLabelMax: xmax - 1,
        yLabelMax: ymax - 1,
        yLabelMin: ymin + 1,
        axeXStyle: '->',
        axeYStyle: '->',
        yLabelDistance: 1,
        yLabelEcart: 0.5,
        grilleSecondaire: true,
        grilleSecondaireYDistance: 1,
        grilleSecondaireXDistance: 1,
        grilleSecondaireYMin: ymin,
        grilleSecondaireYMax: ymax,
        grilleSecondaireXMin: xmin,
        grilleSecondaireXMax: xmax
      })

      texte = 'Lire les coordonnées du vecteur $\\vec{u}$.<br> '
      texte += mathalea2d({ xmin: xmin, xmax: xmax, ymin: ymin, ymax: ymax, style: 'display: inline', pixelsParCm: 30, scale: 0.5 },
        r1, o, AB, nomvAB
      )

      if (this.interactif) {
        texte += '<br>$\\vec{u}\\Bigg($' + ajouteChampTexteMathLive(this, 2 * i, 'largeur10 inline')
        texte += ` ${sp(1)} ;  `
        texte += ajouteChampTexteMathLive(this, 2 * i + 1, 'largeur10 inline') + '$\\Bigg)$'
        setReponse(this, 2 * i, k1)
        setReponse(this, 2 * i + 1, k2)
      }
      texteCorr = `En partant de l'origine  du vecteur pour aller à son extrémité, on fait un déplacement de $${k1}$ unité(s) horizontalement et $${k2}$ unité(s) verticalement.<br>
        Les coordonnées du vecteur $\\vec{u}$ sont donc : $(${k1};${k2})$. `

      this.reponse = xa

      if (this.questionJamaisPosee(i, xa, ya, k1, k2)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
