/* eslint-disable no-unused-vars */
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { afficheLongueurSegment, barycentre, carre, colorToLatexOrHTML, latexParPoint, mathalea2d, point, polygone, rotation } from '../../modules/2d.js'

export const titre = 'Calculer une valeur manquante avec l\'égalité de Pythagore'

export default function CalculerValeurManquanteVisuelPythagore () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.consigne = "Dans chaque cas, calculer la valeur manquante indiquée par un point d'interrogation."
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [1, 2, 3, 4] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    let objetsEnonce, objetsEnonceml, objetsCorrection, paramsEnonce, paramsCorrection
    context.fenetreMathalea2d = [-11.7, -6.4, 18.3, 13.6]
    const A = point(4, 0, 'A')
    const B = point(0, 3, 'B')
    const C = point(0, 0, 'C')
    const p1 = polygone(A, B, C)
    p1.isVisible = false
    const p2 = rotation(p1, C, randint(0, 359))
    const a = p2.listePoints[0]
    const b = p2.listePoints[1]
    const c = p2.listePoints[2]
    const car1 = carre(b, a)
    car1.couleurDeRemplissage = colorToLatexOrHTML('red')
    const bar1 = barycentre(car1)
    bar1.positionLabel = 'center'
    const car2 = carre(c, b)
    car2.couleurDeRemplissage = colorToLatexOrHTML('blue')
    const bar2 = barycentre(car2)
    bar2.positionLabel = 'center'
    const car3 = carre(a, c)
    car3.couleurDeRemplissage = colorToLatexOrHTML('green')
    const bar3 = barycentre(car3)
    bar3.positionLabel = 'center'
    const q1 = latexParPoint('? \\text{ cm}^2', bar1)
    const l1 = afficheLongueurSegment(b, c)
    const l2 = afficheLongueurSegment(c, a)
    const q2 = latexParPoint('9 \\text{ cm}^2', bar2)
    const q3 = latexParPoint('16 \\text{ cm}^2', bar3)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsEnonceml = [] // Idem pour l'enoncé à main levée si besoin
      objetsCorrection = [] // Idem pour la correction

      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 1:

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
      //  objetsEnonce.push () // On rempli les tableaux d'objets Mathalea2d
      //  objetsEnonceml.push()
      //  objetsCorrection.push()

      // paramètres de la fenêtre Mathalea2d pour l'énoncé main levée
      //    paramsEnonceml = { xmin: Math.min(objetsEnonceml.x), ymin: Math.min(objetsEnonceml.y), xmax: Math.max(objetsEnonceml.x), ymax: Math.max(objetsEnonceml.y), pixelsParCm: 20, scale: 1, mainlevee: true, amplitude: 1 }
      // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
      paramsEnonce = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1, mainlevee: false }
      // paramètres de la fenêtre Mathalea2d pour la correction
      paramsCorrection = { xmin: -10, ymin: -10, xmax: 10, ymax: 10, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(paramsEnonce, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
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
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  // this.besoinFormulaireNumerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
