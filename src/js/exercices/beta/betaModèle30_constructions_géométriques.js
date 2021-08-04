import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, carre, rotation, codageAngleDroit, mathalea2d } from '../../modules/2d.js'
export const titre = 'Nom de l\'exercice'

/**
 * Description didactique de l'exercice
 * @author
 * Référence
 * Date de publication
*/
export default function NomExercice () {
  Exercice.call(this)
  this.consigne = 'consigne'
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1 // Le nombre de colonne pour la correction LaTeX

  this.nouvelleVersion = function (numeroExercice) {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typesDeQuestionsDisponibles = [1] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let A, B, C, D, traces1, traces2, labels1, labels2, kare, aA, aB, aC, aD
    let objetsEnonce, objetsEnonceml, objetsCorrection, paramsEnonce, paramsEnonceml, paramsCorrection
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
      objetsCorrection = [] // Idem pour la correction

      texte = 'Construire le carré $ABCD$.<br>'
      texteCorr = 'Pour cette construction on peut utiliser la règle et l\'équerre.<br>'
      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:
          A = point(0, 0, 'A', 'below') // 'below' indique l'étiquette avec son nom sera en-dessous du point.
          // Laisse ta souris sur point pour savoir ce que fait cette fonction !
          // Garde en tête cette possibilité pour la suite et préviens sur le Slack si rien ne s'affiche pour une fonction alors que tu aurais bien aimé ;)
          B = point(5, randint(-30, 30) / 10, 'B', 'below')
          C = rotation(A, B, -90, 'C', 'above')
          // L'angle est en degrés
          // Si on se trompe dans l'orthographe, ce sera 'above left' et si on ne précise rien, pour une rotation aussi ce sera 'above'.
          D = rotation(B, A, 90, 'D', 'above')
          traces1 = tracePoint(A, B) // Relie les points A et B
          labels1 = labelPoint(A, B) // Place les étiquettes avec les noms 'A' et 'B' dans la position définie précédemment ('below' et 'below')
          traces2 = tracePoint(A, B, C, D)
          labels2 = labelPoint(A, B, C, D)
          kare = carre(A, B) // Laisse ta souris sur carre pour voir ce que fait cette fonction !
          kare.epaisseur = 2
          aA = codageAngleDroit(B, A, D)
          aB = codageAngleDroit(A, B, C)
          aC = codageAngleDroit(B, C, D)
          aD = codageAngleDroit(C, D, A)

          objetsEnonce.push(traces1, labels1)
          objetsEnonceml.push(traces2, labels2, kare, aA, aB, aC, aD)
          objetsCorrection.push(traces2, labels2, kare, aA, aB, aC, aD)
          // ici sont créés les texte, tex_corr, objets mathalea2d divers entrant dans le contenu de l'exercice
          break

        case 2:
          // Idem Cas1 mais avec d'autres texte, texteCorr...
          break

        case 3:

          break

        case 4:

          break
      }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      paramsEnonceml = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1, mainlevee: false }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: -5, ymin: -5, xmax: 9, ymax: 9, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonceml, objetsEnonceml) + mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
