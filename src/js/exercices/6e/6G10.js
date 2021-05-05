import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,randint,creerNomDePolygone} from '../../modules/outils.js'
import {point,labelPoint,droite,segment,demiDroite,mathalea2d} from '../../modules/2d.js'
export const titre = 'Notation des droites, segments et demi-droites'

/**
 * Utiliser les notations des segments, droites et demi-droites
 * @Auteur Rémi Angot
 * Référence 6G10
 */
export default function Notation_segment_droite_demi_droite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Compléter les programmes de constructions qui ont permis d'obtenir ces figures.";
  this.nbQuestions = 3;
  this.nbCols = 3;
  this.nbColsCorr = 2;

  this.nouvelleVersion = function () {
    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      let pixelsParCm = 40;
      let p = creerNomDePolygone(3, "PQ");
      let A = point(0, 0, p[0], "above left");
      let B = point(1, 1.2, p[1], "above");
      let C = point(2.2, -0.3, p[2], "above right");
      let dAB, dAC, dBC, dABCorr, dACCorr, dBCCorr;
      function creerDroiteDemiSegment(A, B) {
        let trait, notation;
        switch (randint(1, 4)) {
          case 1:
            trait = droite(A, B);
            notation = `$(${A.nom}${B.nom})$`;
            break;
          case 2:
            trait = demiDroite(A, B);
            notation = `$[${A.nom}${B.nom})$`;
            break;
          case 3:
            trait = demiDroite(B, A);
            notation = `$[${B.nom}${A.nom})$`;
            break;
          case 4:
            trait = segment(A, B);
            notation = `$[${A.nom}${B.nom}]$`;
            break;
        }
        return [trait, notation];
      }
      [dAB, dABCorr] = creerDroiteDemiSegment(A, B);
      [dAC, dACCorr] = creerDroiteDemiSegment(A, C);
      [dBC, dBCCorr] = creerDroiteDemiSegment(B, C);
      let labels = labelPoint(A, B, C);

      texte = `Placer 3 points $${p[0]}$, $${p[1]}$ et $${p[2]}$ non alignés puis tracer... <br><br>`;
      texte += mathalea2d(
        { xmin: -1, ymin: -1, xmax: 3, ymax: 2.5, pixelsParCm: 40, scale: 1 },
        dAB,
        dBC,
        dAC,
        labels
      );
      texteCorr = `...tracer ${dABCorr}, ${dBCCorr}, ${dACCorr}.`;

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



