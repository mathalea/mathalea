import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes_sans_changer_ordre} from "/modules/outils.js"
import {mathalea2d} from "/modules/2d.js"
import{fraction} from "/modules/Fractions.js"
/** 
 * * Exprimer un rapport de longueurs sur un segment
 * * 6N22-1
 * @author Sébastien Lozano
 */

export default function Rapports_sur_un_segment() {
  'use strict';
  Exercice.call(this); // Héritage de la classe Exercice()
  this.beta = false;
  if (this.beta) {
    this.nb_questions = 2;
  } else {
    this.nb_questions = 2;
  };

  this.titre = "Rapport de deux longueurs sur un segment";
  this.consigne = `Sur tous les axes, les graduations sont régulières.`;

  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  //this.nb_questions_modifiable = false;
  sortie_html ? this.spacing = 2.5 : this.spacing = 1.5;
  sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;

  let type_de_questions_disponibles;

  this.nouvelle_version = function () {
    if (this.beta) {
      type_de_questions_disponibles = [0, 1];
    } else {
      //type_de_questions_disponibles = shuffle([choice([1,3]),choice([2,4]),0]);      			
      type_de_questions_disponibles = [0, 1];
    };

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    //let liste_type_de_questions  = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let liste_type_de_questions = combinaison_listes_sans_changer_ordre(type_de_questions_disponibles, this.nb_questions) // Tous les types de questions sont posées --> à remettre comme ci dessus		

    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      // une fonction pour le singulier pluriel
      function sing_plur(nombre, singulier, pluriel) {
        if (nombre > 1) {
          return pluriel
        } else {
          return singulier
        };
      };

      // on choisit deux entiers pour former les fractions
      let entier_max = 9;
      let m = randint(1, entier_max);
      let n = randint(1, entier_max, m); // on évite l'autre pour éviter la fraction 1
      let params = {
        xmin: -0.4,
        ymin: -2,
        xmax: 15 * entier_max,// pour éviter un cadrage trop large
        ymax: 1,
        pixelsParCm: 20,
        scale: 1,
      }
      // on colle la figure à l'énoncé
      let y_enonce = -1.2;

      // on a parfois des figure trop petites ou trop grandes
      //
      let rayon;
      rayon = 5;
      // if (m<n) {
      //   rayon = 15
      // } else {
      //   rayon = 15/Math.ceil(m/n)
      // };

      //on choisit de façon aléatoire un triplet de noms pour les points
      let noms_choix = [['A', 'B', 'C'], ['D', 'E', 'F'], ['I', 'J', 'K'], ['L', 'M', 'N']]
      let noms = noms_choix[randint(0, noms_choix.length - 1)];

      // pour les situations, autant de situations que de cas dans le switch !
      let situations = [
        {//case 0 --> m < n
          m: Math.min(m, n),
          n: Math.max(m, n),
          rapport: `\\dfrac{${noms[0] + noms[1]}}{${noms[0] + noms[2]}}`,
          rapport_inverse: `\\dfrac{${noms[0] + noms[2]}}{${noms[0] + noms[1]}}`,
          fig: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, 0, rayon, 0, 'segment', '', noms[0], noms[1], 1, noms[2]),
          ),
          segment_corr1: `\\textcolor{red}{[${noms[0] + noms[2]}]}`,
          longueur_corr1: `\\textcolor{red}{${noms[0] + noms[2]}}`,
          m_color_corr: `\\textcolor{red}{${Math.min(m, n)}}`,
          n_color_corr: `\\textcolor{blue}{${Math.max(m, n)}}`,
          fig_corr1: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, y_enonce, rayon, 0, 'segment', 'red', noms[0], noms[1], 1, noms[2]),
          ),
          segment_corr2: `\\textcolor{blue}{[${noms[0] + noms[1]}]}`,
          longueur_corr2: `\\textcolor{blue}{${noms[0] + noms[1]}}`,
          fig_corr2: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, y_enonce, (Math.min(m, n) / Math.max(m, n)) * rayon, 0, 'segment', 'blue', noms[0], noms[2], 1, noms[1]),
          )
        },
        {//case 1 --> m > n
          m: Math.max(m, n),
          n: Math.min(m, n),
          rapport: `\\dfrac{${noms[0] + noms[1]}}{${noms[0] + noms[2]}}`,
          rapport_inverse: `\\dfrac{${noms[0] + noms[2]}}{${noms[0] + noms[1]}}`,
          fig: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, 0, 5, 0, 'segment', '', noms[0], noms[1], 1, noms[2]),
          ),
          segment_corr1: `\\textcolor{red}{[${noms[0] + noms[2]}]}`,
          longueur_corr1: `\\textcolor{red}{${noms[0] + noms[2]}}`,
          m_color_corr: `\\textcolor{red}{${Math.max(m, n)}}`,
          n_color_corr: `\\textcolor{blue}{${Math.min(m, n)}}`,
          fig_corr1: mathalea2d(
            params,
            fraction(Math.max(m, n), Math.min(m, n)).representation(0, y_enonce, 5, 0, 'segment', 'red', noms[0], noms[1], 1, noms[2]),
          ),
          segment_corr2: `\\textcolor{blue}{[${noms[0] + noms[1]}]}`,
          longueur_corr2: `\\textcolor{blue}{${noms[0] + noms[1]}}`,
          fig_corr2: mathalea2d(
            params,
            fraction(Math.min(m, n), Math.max(m, n)).representation(0, y_enonce, (Math.max(m, n) / Math.min(m, n)) * 5, 0, 'segment', 'blue', noms[0], noms[2], 1, noms[1]),
          )
        },

      ];

      let enonces = [];
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          Exprimer les rapports suivants $${situations[k].rapport}$ et $${situations[k].rapport_inverse}$.
          <br>
          ${situations[k].fig}     			
					`,
          question: ``,
          correction: `
          Les graduations étant régulières, comptons le nombre de graduations pour chaque segment :<br>
          ${situations[k].fig_corr1}<br>
          Le segment $${situations[k].segment_corr1}$ compte $${situations[k].m_color_corr}$ ${sing_plur(situations[k].m, 'graduation', 'graduations')}.<br>
          ${situations[k].fig_corr2}<br>
          Le segment $${situations[k].segment_corr2}$ compte $${situations[k].n_color_corr}$ ${sing_plur(situations[k].n, 'graduation', 'graduations')}.<br><br>
          Donc $\\dfrac{${situations[k].longueur_corr2}}{${situations[k].longueur_corr1}}=\\dfrac{${situations[k].n_color_corr}}{${situations[k].m_color_corr}}$
          et $\\dfrac{${situations[k].longueur_corr1}}{${situations[k].longueur_corr2}}=\\dfrac{${situations[k].m_color_corr}}{${situations[k].n_color_corr}}$<br><br>
          $\\textbf{D'où $\\mathbf{${situations[k].rapport}=}${fraction(situations[k].n, situations[k].m).texFractionSimplifiee}$ et $\\mathbf{${situations[k].rapport_inverse}=}${fraction(situations[k].m, situations[k].n).texFractionSimplifiee}$}$<br>

					`
        });
      };

      // autant de case que d'elements dans le tableau des situations
      switch (liste_type_de_questions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`;
            texte += `             `
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[0].correction}`;
          };
          break;
        case 1:
          texte = `${enonces[1].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[1].correction}`;
          };
          break;
        case 2:
          texte = `${enonces[2].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[2].correction}`;
          };
          break;
        case 3:
          texte = `${enonces[3].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[3].correction}`;
          };
          break;
        case 4:
          texte = `${enonces[4].enonce}`;
          if (this.beta) {
            texte += `<br>`;
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`;
            texte_corr = ``;
          } else {
            texte_corr = `${enonces[4].correction}`;
          };
          break;
      };

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);

  }
  //this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  //this.besoin_formulaire2_case_a_cocher = ["Avec des équations du second degré"];	
};

