import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,shuffle,arrondi_virgule,prenom,tex_nombre,premiere_lettre_en_majuscule,num_alpha} from "/modules/outils.js"
/**
 * Organiser donnees depuis texte
 * @Auteur Erwan Duplessy
 * Référence 6S11
 */

// source : http://www.ac-grenoble.fr/savoie/pedagogie/docs_pedas/ogd_c2_c3/ogd_c2_c3.pdf

export default function Organiser_donnees_depuis_texte() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Organiser des données dans un tableau";
  this.consigne = "Répondre aux questions à l'aide du texte.";
  this.nb_questions = 4;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = false; // false -> effectif ; true -> masse
  this.sup2 = 4; // paramètre nombre de fruit
  sortie_html ? this.spacing = 2 : this.spacing = 1;
  sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let nbAmis = 4,texte,texte_corr,m,S; // min = 2
    let nbFruits = parseInt(this.sup2); // min = 2
    let lstPrenomExo = []
    while (lstPrenomExo.length < nbAmis) {
      let p = prenom();
      if (!lstPrenomExo.includes(p)) {
        lstPrenomExo.push(p);
      }
    }

    let lstFruit = ['pomme', 'poire', 'kiwi', 'pêche', 'coing', 'melon', 'citron', 'banane', 'mangue'];
    let lstFruitExo = [];
    // Choisir les fruits : 
    for (let i = 0; i < nbFruits; i++) {
      lstFruitExo.push(choice(lstFruit, lstFruitExo));
    }
    // Choisir les quantités de fruits pour chaque prénoms : 
    let lstTabVal = []; // tableau i : amis et j : fruits
    let L = []; // tab temporaire
    for (let i = 0; i < nbAmis; i++) {
      for (let j = 0; j < nbFruits; j++) {
        if (this.sup) {
          if (randint(0, 8) > 0) {
            L.push(randint(0, 100) / 10);
          } else {
            L.push(0);
          }

        } else {
          L.push(randint(0, 10));
        }
      }
      lstTabVal.push(L);
      L = [];
    }
    // Affiche l'énoncé :
    texte = `Plusieurs amis reviennent du marché. Il s'agit de `;
    for (let i = 0; i < nbAmis - 2; i++) {
      texte += lstPrenomExo[i] + ', '
    }
    texte += lstPrenomExo[nbAmis - 2] + ' et ' + lstPrenomExo[nbAmis - 1] + '.<br>';
    let N;
    //boucle sur les phrases. 1 phrase par personne.
    for (let i = 0; i < nbAmis; i++) {
      texte += lstPrenomExo[i] + ' rapporte ';
      L = []; // ne contient que les fruits d'effectifs strictement positifs
      for (let j = 0; j < nbFruits; j++) {
        N = lstTabVal[i][j];
        if (N > 0) {
          L.push([N, lstFruitExo[j]])
        }
      }
      m = L.length
      L = shuffle(L); // mélange l'ordre des fruits
      for (let k = 0; k < m; k++) {
        if (this.sup) {
          texte += tex_nombre(L[k][0]) + ' kg de ' + L[k][1] + 's';
        } else {
          texte += tex_nombre(L[k][0]) + ' ' + L[k][1];
          if (L[k][0] > 1) { texte += 's' }
        }
        if (k < m - 2) { texte += ', ' }
        if (k == m - 2) { texte += ' et ' }
      }
      texte += '. <br>'
    }
    texte += '<br>'
    texte += num_alpha(0) + ` Remplir le tableau suivant. <br>`;

    if (this.sup) {
      texte += num_alpha(1) + ` Quel est la masse totale de fruits achetés par les amis ? <br>`;
    } else {
      texte += num_alpha(1) + ` Quel est le nombre total de fruits achetés par les amis ? <br>`;
    }
    texte += num_alpha(2) + ` Qui a rapporté le plus de fruits ? <br>`;
    texte += num_alpha(3) + ` Quel fruit a été rapporté en la plus grosse quantité ? <br><br>`;

    texte += `$\\begin{array}{|l|` + `c|`.repeat(nbFruits + 1) + `}\n`;
    texte += `\\hline\n`;
    texte += ` `;
    for (let j = 0; j < nbFruits; j++) {
      texte += ` & \\textbf{\\text{` + premiere_lettre_en_majuscule(lstFruitExo[j]) + `}}`;
    }
    texte += '& \\textbf{TOTAL}';
    texte += `\\\\\\hline\n`;
    for (let i = 0; i < nbAmis; i++) {
      texte += `\\textbf{\\text{${lstPrenomExo[i]}}}` + `& `.repeat(nbFruits) + ` & `;
      texte += `\\\\\\hline\n`;
    }
    texte += '\\textbf{TOTAL}' + '& '.repeat(nbFruits) + ` & `;
    texte += `\\\\\\hline\n`;
    texte += `\\end{array}\n$`;

    //CORRECTION
    // Question 1 :
    texte_corr = num_alpha(0) + ` Voici le tableau complet. <br>`;
    texte_corr += `$\\begin{array}{|l|` + `c|`.repeat(nbFruits + 1) + `}\n`;
    texte_corr += `\\hline\n`;
    texte_corr += ` `;
    for (let j = 0; j < nbFruits; j++) {
      texte_corr += ` & \\text{${lstFruitExo[j]}}`;
    }
    texte_corr += '& TOTAL';
    texte_corr += `\\\\\\hline\n`;
    for (let i = 0; i < nbAmis; i++) {
      texte_corr += `\\text{${lstPrenomExo[i]}}`;
      let S = 0; // pour calculer les sommes
      for (let j = 0; j < nbFruits; j++) {
        texte_corr += '& ' + tex_nombre(lstTabVal[i][j]); //valeur dans le tableau
        S += lstTabVal[i][j]; // somme d'une ligne
      }
      texte_corr += '& ' + arrondi_virgule(S);
      texte_corr += `\\\\\\hline\n`;
    }
    texte_corr += 'TOTAL';
    let S_total = 0; // somme totale de tous les fruits
    for (let j = 0; j < nbFruits; j++) {
      S = 0;
      for (let i = 0; i < nbAmis; i++) {
        S += lstTabVal[i][j]; // somme d'une colonne
      }
      //texte_corr += '& ' + Math.round(S*10)/10;
      texte_corr += '& ' + arrondi_virgule(S, 1);
      //texte_corr += '& ' + tex_nombre(S,1);
      S_total += S;
    }
    texte_corr += '& ' + arrondi_virgule(S_total);
    texte_corr += `\\\\\\hline\n`;
    texte_corr += `\\end{array}\n$`;
    texte_corr += `<br>`

    // Question 2 :
    S_total = arrondi_virgule(S_total);
    if (this.sup) {
      texte_corr += num_alpha(1) + ` La masse totale de fruits est : ${S_total} kg. <br>`;
    } else {
      texte_corr += num_alpha(1) + ` Le nombre total de fruits est : ${S_total}. <br>`;
    }

    // Question 3 :
    texte_corr += num_alpha(2) + ` On regarde la dernière colonne du tableau. `;
    let lstmax = []; //liste des prénoms solutions
    let nmax = 0; // nombre max de fruit pour une personne
    for (let i = 0; i < nbAmis; i++) {
      S = 0;
      for (let j = 0; j < nbFruits; j++) {
        S += lstTabVal[i][j]; // somme d'une ligne
      }
      if (S == nmax) {
        lstmax.push(lstPrenomExo[i]);
      }
      if (S > nmax) {
        nmax = S;
        lstmax = [lstPrenomExo[i]];
      }
    }
    nmax = arrondi_virgule(nmax, 1);
    if (lstmax.length > 1) {
      texte_corr += `Les personnes qui ont rapporté le plus de fruits sont : `;
      texte_corr += lstmax[0];
      for (let k = 1; k < lstmax.length; k++) {
        texte_corr += ` et ${lstmax[k]}`;
      }
      if (this.sup) {
        texte_corr += `. La masse maximale rapportée est de ${nmax} kg.<br>`;
      } else {
        texte_corr += `. Le nombre maximal de fruits rapporté par une personne est de ${nmax}.<br>`;
      }
    } else {
      if (this.sup) {
        texte_corr += `La personne qui a rapporté le plus de fruits est ${lstmax}. Cette masse maximale est de ${nmax} kg.<br>`;
      } else {
        texte_corr += `La personne qui a rapporté le plus de fruits est ${lstmax}. Ce nombre maximal de fruits est de ${nmax}.<br>`;
      }
    }

    // Question 4 :
    texte_corr += num_alpha(3) + ` On regarde la dernière ligne du tableau. `;
    let fmax = []; //liste des fruits apporté en quantité max
    nmax = 0; // nombre max par type de fruit 
    for (let j = 0; j < nbFruits; j++) {
      S = 0;
      for (let i = 0; i < nbAmis; i++) {
        S += lstTabVal[i][j]; // somme d'une colonne
      }
      if (S == nmax) {
        fmax.push(lstFruitExo[j])
      }
      if (S > nmax) {
        nmax = S;
        fmax = [lstFruitExo[j]];
      }
    }
    nmax = arrondi_virgule(nmax, 1);
    if (fmax.length > 1) {
      if (this.sup) {
        texte_corr += `Les fruits présents en la plus grosse quantité sont : `;
      } else {
        texte_corr += `Les fruits les plus nombreux sont : `;
      }
      texte_corr += `Les fruits les plus nombreux sont : `;
      texte_corr += `les ${fmax[0]}s`;
      for (let k = 1; k < fmax.length; k++) {
        texte_corr += ` et les ${fmax[k]}s`;
      }
      texte_corr += `. Il y en a ${nmax} de chaque sorte.<br>`;
    } else {
      if (this.sup) {
        texte_corr += `Il y a plus de ${fmax}s que d'autres fruits. Il y en a ${nmax} kg.`;
      } else {
        texte_corr += `Il y a plus de ${fmax}s que d'autres fruits. Il y en a ${nmax}.`;
      }
    }

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this);
  }
  this.besoin_formulaire2_numerique = ['Nombre de fruits différents', 8];
  this.besoin_formulaire_case_a_cocher = ['Pour utiliser des nombres décimaux et des masses', false];
}

