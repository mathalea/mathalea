import Exercice from '../ClasseExercice.js';
import { combinaison_listes, liste_de_question_to_contenu, randint, choice,creerNomDePolygone, calcul } from "/modules/outils.js";
import {mathalea2d, point, tracePointSurDroite, droite, demiDroite, labelPoint, segment   } from "/modules/2d.js";

/**
 * Utiliser les notations des segments, droites et demi-droites
 * @Auteur Rémi Angot
 * Référence 6G10-1
 */
export default function Description_segment_droite_demi_droite(){
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Description et notation des droites, segments et demi-droites";
  this.consigne = "Faire une phrase pour décrire le plus précisemment possible la figure et donner sa notation mathématique";
  this.nb_questions = 3;
  this.nb_cols = 3;
  this.nb_cols_corr = 1;

  this.nouvelle_version = function(numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let type_de_questions_disponibles = [1, 4, choice([2, 3])];
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      let p = creerNomDePolygone(2, "P");
      let A = point(0, calcul(randint(0, 20) / 10), p[0]);
      let B = point(4, calcul(randint(0, 20) / 10), p[1]);
      let t1 = tracePointSurDroite(A, B);
      let t2 = tracePointSurDroite(B, A);
      let dAB, dABCorr;
      function creerDroiteDemiSegment(A, B) {
        let trait, correction;
        switch (liste_type_de_questions[i]) {
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
      texte_corr = dABCorr;
      

      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

