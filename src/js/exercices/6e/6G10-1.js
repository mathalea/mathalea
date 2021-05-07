import Exercice from '../ClasseExercice.js';
import { combinaisonListes, listeQuestionsToContenu, randint, choice,creerNomDePolygone, calcul } from '../../modules/outils.js';
import {mathalea2d, point, tracePointSurDroite, droite, demiDroite, labelPoint, segment   } from '../../modules/2d.js';

export const titre = 'Description et notation des droites, segments et demi-droites'

/**
 * Utiliser les notations des segments, droites et demi-droites
 * @Auteur Rémi Angot
 * Référence 6G10-1
 */
export default function Description_segment_droite_demi_droite(){
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Faire une phrase pour décrire le plus précisemment possible la figure et donner sa notation mathématique";
  this.nbQuestions = 3;
  this.nbCols = 3;
  this.nbColsCorr = 1;

  this.nouvelleVersion = function(numeroExercice) {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 4, choice([2, 3])];
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions);
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let p = creerNomDePolygone(2, "P");
      let A = point(0, calcul(randint(0, 20) / 10), p[0]);
      let B = point(4, calcul(randint(0, 20) / 10), p[1]);
      let t1 = tracePointSurDroite(A, B);
      let t2 = tracePointSurDroite(B, A);
      let dAB, dABCorr;
      function creerDroiteDemiSegment(A, B) {
        let trait, correction;
        switch (listeTypeDeQuestions[i]) {
          case 1:
            trait = droite(A, B);
            correction = `La droite qui passe par les points $${A.nom}$ et $${B.nom}$ notée $(${A.nom}${B.nom})$.`;
            break;
          case 2:
            trait = demiDroite(A, B);
            correction = `La demi-droite d'origine $${A.nom}$ passant par $${B.nom}$ notée $[${A.nom}${B.nom})$.`;
            break;
          case 3:
            trait = demiDroite(B, A);
            correction = `La demi-droite d'origine $${B.nom}$ passant par $${A.nom}$ notée $[${A.nom}${B.nom})$.`;
            break;
          case 4:
            trait = segment(A, B);
            correction = `Le segment d'extrémités $${A.nom}$ et $${B.nom}$ noté $[${A.nom}${B.nom}]$`;
            break;
        }
        return [trait, correction];
      }
      [dAB, dABCorr] = creerDroiteDemiSegment(A, B);
      let labels = labelPoint(A, B);
      texte = mathalea2d(
        { xmin: -2, ymin: -1, xmax: 7, ymax: 3, pixelsParCm: 40, scale: 0.6 },
        dAB,
        t1,
        t2,
        labels
      );
      texteCorr = dABCorr;
      

      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  //this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}

