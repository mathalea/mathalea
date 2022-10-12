import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { randint } from '../../modules/outils/entiers.js'
import { point } from '../../modules/2d/point.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { droite } from '../../modules/2d/droites.js'
import { numAlpha } from '../../modules/outils/contextSensitif.js'
import { homothetie, rotation, symetrieAxiale, translation2Points } from '../../modules/2d/transformations.js'
import { tracePoint, tracePointSurDroite } from '../../modules/2d/tracePoint.js'
import { labelPoint } from '../../modules/2d/labelPoint.js'
import { calcul } from '../../modules/outils/texNombres.js'
import Alea2iep from '../../modules/Alea2iep.js'
export const titre = 'Utiliser toutes les transformations'

export default function ConstructionsDeTransformes () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.consigne = 'Construire les points suivants.'
  this.video = 'hFoN9sMWnac'
  this.typeExercice = 'IEP'

  this.nouvelleVersion = function (numeroExercice) {
    const anim = new Alea2iep()
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []

    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = `${numAlpha(0)} $M_1$ symétrique de $M$ par rapport à $(AB)$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte += '<br><br>'
      texte += `${numAlpha(1)} $M_2$ symétrique de $M$ par rapport à $O$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte += '<br><br>'
      texte += `${numAlpha(2)} $M_3$ image de $M$ dans la translation qui transforme $A$ en $B$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte += '<br><br>'
      texte += `${numAlpha(3)} $M_4$ image de $M$ dans la rotation de centre $O$ et de $60$° dans le sens anti-horaire.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte += '<br><br>'
      texte += `${numAlpha(4)} $M_5$ image de $M$ dans l'homothétie de centre $A$ et de rapport $3$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte += '<br><br>'
      texte += `${numAlpha(5)} $M_6$ image de $M$ dans l'homothétie de centre $A$ et de rapport $-2$.` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      const A = point(0, 2, 'A', 'right')
      const B = point(calcul(randint(20, 30) / 10), calcul(randint(60, 80) / 10), 'B', 'right')
      const d = droite(A, B)
      const tA = tracePointSurDroite(A, d)
      const tB = tracePointSurDroite(B, d)
      const M = point(calcul(randint(20, 40) / 10) * (-1), 0, 'M')
      const O = point(randint(4, 7) * (-1), randint(2, 4), 'O')
      const M1 = symetrieAxiale(M, d, 'M1')
      const M2 = rotation(M, O, 180, 'M2')
      const M3 = translation2Points(M, A, B, 'M3')
      const M4 = rotation(M, O, -60, 'M4')
      const M5 = homothetie(M, A, 3, 'M5')
      const M6 = homothetie(M, A, -2, 'M6')
      const tenonce = tracePoint(M, O)
      const tcorr = tracePoint(M1, M2, M3, M4, M5, M6)
      const lenonce = labelPoint(A, B, M, O)
      const lcorr = labelPoint(M1, M2, M3, M4, M5, M6)

      objetsEnonce = [d, tA, tB, lenonce, tenonce] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsCorrection = [...objetsEnonce, lcorr, tcorr] // Idem pour la correction

      // context.fenetreMathalea2d = [Math.min(M1.x-1,M2.x-1,M3.x-1,M4.x-1,M5.x-1,M6.x-1),Math.min(M1.y-1,M2.y-1,M3.y-1,M4.y-1,M5.y-1,M6.y-1),Math.max(M1.x+1,M2.x+1,M3.x+1,M4.x+1,M5.x+1,M6.x+1),Math.max(M1.y+1,M2.y+1,M3.y+1,M4.y+1,M5.y+1,M6.y+1,B.y+1)]

      anim.recadre(Math.min(M1.x - 1, M2.x - 1, M3.x - 1, M4.x - 1, M5.x - 1, M6.x - 1), Math.max(M1.y + 1, M2.y + 1, M3.y + 1, M4.y + 1, M5.y + 1, M6.y + 1, B.y + 1))
      anim.vitesse = 1000
      anim.tempo = 0
      anim.pointsCreer(A, B, M, O)
      anim.regleDroite(A, B)
      anim.vitesse = 10
      anim.tempo = 1
      anim.symetrieAxialePoint(M, d, 'M1', { couleur: 'blue', couleurCodage: 'lightblue', codage: '//' })
      anim.rotationPoint(M, O, -60, 'M4', { couleur: 'green', couleurCodage: 'lightgreen' })
      anim.translationPoint(M, A, B, 'M3', { couleur: 'red', couleurCodage: 'pink', codage: 'O' })
      anim.homothetiePoint(M, A, 3, 'M5', { couleur: 'purple', couleurCodage: 'magenta' })
      anim.homothetiePoint(M, A, -2, 'M6', { couleur: 'black', couleurCodage: 'grey' })

      paramsEnonce = { xmin: Math.min(M1.x - 1, M2.x - 1, M3.x - 1, M4.x - 1, M5.x - 1, M6.x - 1), ymin: Math.min(M1.y - 1, M2.y - 1, M3.y - 1, M4.y - 1, M5.y - 1, M6.y - 1), xmax: Math.max(M1.x + 1, M2.x + 1, M3.x + 1, M4.x + 1, M5.x + 1, M6.x + 1), ymax: Math.max(M1.y + 1, M2.y + 1, M3.y + 1, M4.y + 1, M5.y + 1, M6.y + 1, B.y + 1), pixelsParCm: 20, scale: 1, mainlevee: false }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: Math.min(M1.x - 1, M2.x - 1, M3.x - 1, M4.x - 1, M5.x - 1, M6.x - 1), ymin: Math.min(M1.y - 1, M2.y - 1, M3.y - 1, M4.y - 1, M5.y - 1, M6.y - 1), xmax: Math.max(M1.x + 1, M2.x + 1, M3.x + 1, M4.x + 1, M5.x + 1, M6.x + 1), ymax: Math.max(M1.y + 1, M2.y + 1, M3.y + 1, M4.y + 1, M5.y + 1, M6.y + 1, B.y + 1), pixelsParCm: 20, scale: 1, mainlevee: false }

      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += '<br><br>'
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      texteCorr += '<br>' + anim.html(numeroExercice)
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
