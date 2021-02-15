import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes, randint, calcul, arrondi_virgule, nombre_avec_espace, texte_en_couleur_et_gras} from "/modules/outils.js"

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 3S21
* D'après le document "Attendus en fin de 3eme"
* On donne les fréquences d’apparition de chaque face d’un dé pour 10000 lancers. 
* L’élève interprète les résultats en les comparant aux probabilités théoriques.
*/

export default function Stabilisation_frequence() {
    "use strict"
    Exercice.call(this)
    this.titre = "Stabilisation des fréquences";
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=true // Active le formulaire nombre de questions
    this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pas_de_version_LaTeX=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
   this.sup = 1; // situation 1=dés
   this.sup2 = 10000; // nbLancers
   this.sup3 = false; // true = équiprobable, false = jeu truqué
  
  if (sortie_html) {
    this.consigne = `<center><a title="Diacritica, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dice_(typical_role_playing_game_dice).jpg"><img width="128" alt="Dice (typical role playing game dice)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dice_%28typical_role_playing_game_dice%29.jpg/128px-Dice_%28typical_role_playing_game_dice%29.jpg"></a></center>`
  }

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let type_de_questions_disponibles=[1,2,3,4] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
  
      for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texte_corr = `` // Idem pour le texte de la correction.
        let nbFaces = 2*randint(1,4)+2; // nombre de faces du dé : 4, 6, 8, ou 10. Avec 12, le tableau devient trop grand....
        let nbLancers = 10000; // nombre de lancers 
        let tabcoul = ["rouges", "vertes", "bleues", "noires"];
        let tabEff = new Array();// tableau d'effectifs temporaires - une dimension [eff]        
        let tabEffModif = new Array();// tableau d'effectifs temporaires après modification - une dimension [eff]        
        let S1 = 0, S2 = 0; // effectif total
        let tabRes = new Array(); // tableau des fréquences observées - deux dimensions [val, freq]
        let tabProba = new Array(); // tableau des proba théoriques, à comparer à tabRes
        let tabValeur = []; // numéro de la face du dé
        let titreligne = "Numéro de la face"; // ou "couleur de la boule"
        let tabtitrecolonne = tabValeur; // ou tabcoul
        let face = 0;
        let N = 0; // largeur du tableau

        switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
            // avec un dé
            // Cas où les fréquesnces rejoignent les proba
            texte += `On lance un dé équilibré à ${nbFaces} faces ${nombre_avec_espace(nbLancers)} fois. On étudie les fréquences d'apparition de chaque face. On obtient les résultats suivants : <br>`;
            for (let i = 0; i<nbFaces ; i++) {
              tabValeur[i]=i+1;
              tabEff[i] = [randint(90,110)];
              S1 += parseInt(tabEff[i]);
            }             
            for (let i =0; i<nbFaces ; i++) {
              tabRes[i] = [i, calcul(tabEff[i]/S1)];
            } 
            texte_corr += `Le dé est équilibré, donc c'est une situation d'équiprobabilité. Chaque face du dé a une probabilité égale à ` ;
            switch (nbFaces){
              case 4:
                texte_corr += ` $\\dfrac{1}{4} = 25\\%$ `;
                break
              case 6:
                texte_corr += ` $\\dfrac{1}{6} \\approx  16.7\\%$ `;
                break
              case 8:
                texte_corr += ` $\\dfrac{1}{8} = 12.5\\%$ `;
                break
              case 10:
                texte_corr += ` $\\dfrac{1}{10} = 10\\%$ `;
                break
              case 12:
                texte_corr += ` $\\dfrac{1}{12} \\approx 8.3\\%$ `;
                break
            }
            texte_corr += `d'apparaitre. <br>`
            texte_corr += `Comme le dé a été lancé ${nombre_avec_espace(nbLancers)} fois, les fréquences doivent se stabiliser autour de la probabilité. `;
            texte_corr += `Les valeurs du tableau de fréquences sont toutes proches de cette probabilité. <br>`;
            texte_corr += texte_en_couleur_et_gras(`Conclusion : les résultats semblent respecter le principe de stabilisation des fréquences ; le tableau est bien compatible avec un lancer aléatoire de dé. `);
          break;
  
          case 2:
          // avec un dé  
          // Cas où les fréquences ne rejoignent pas les proba
            texte += `On lance un dé équilibré à ${nbFaces} faces ${nombre_avec_espace(nbLancers)} fois. On étudie les fréquences d'apparition de chaque face. On obtient les résultats suivants : <br>`;
            face = randint(1, nbFaces); // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
            for (let i = 0; i<nbFaces ; i++) {
              tabValeur[i]=i+1;
              if (i == face) {
                tabEff[i] = [2*randint(90,110)];
              }
              else {
                tabEff[i] = [randint(90,110)];
              }
              S1 += parseInt(tabEff[i]);
            }             
            for (let i =0; i<nbFaces ; i++) {
              tabRes[i] = [i, calcul(tabEff[i]/S1)];
            }  
            texte_corr += `Le dé est équilibré, donc c'est une situation d'équiprobabilité. Chaque face du dé a une probabilité égale à ` ;
            switch (nbFaces){
              case 4:
                texte_corr += ` $\\dfrac{1}{4} = 25\\%$ `;
                break
              case 6:
                texte_corr += ` $\\dfrac{1}{6} \\approx  16.7\\%$ `;
                break
              case 8:
                texte_corr += ` $\\dfrac{1}{8} = 12.5\\%$ `;
                break
              case 10:
                texte_corr += ` $\\dfrac{1}{10} = 10\\%$ `;
                break
              case 12:
                texte_corr += ` $\\dfrac{1}{12} \\approx 8.3\\%$ `;
                break
            }
            texte_corr += `d'apparaitre. <br>`;
            texte_corr += `Comme le dé a été lancé ${nombre_avec_espace(nbLancers)} fois, les fréquences devraient se stabiliser autour de la probabilité. `
            texte_corr += `Cependant, une valeur du tableau de fréquences est éloignée de cette probabilité. <br>`;
            texte_corr += `Il s'agit de la fréquence d'apparition du ${tabValeur[face]}. <br>`;
            texte_corr += texte_en_couleur_et_gras(`Conclusion : les résultats ne semblent pas respecter le principe de stabilisation des fréquences ; le tableau n'est pas compatible avec un lancer aléatoire de dé.`);
          break; 

          case 3:
          // avec une urne et des boules  
          // Cas où les fréquences rejoignent les proba
          texte += `CAS 3 *********************** <br>`;
            tabEff = [randint(2,9), randint(2,9), randint(2,9), randint(2,9)];
            S1 = tabEff.reduce((a, b)=> a + b,0);
            for (let i =0; i<4 ; i++) {
              tabProba[i] = [tabcoul[i], calcul(tabEff[i]/S1)];
            }   

            texte += `Dans une urne opaque, il y a `;  
            for (let i=0 ; i<3; i++) {
              texte += `${tabEff[i]} boules ${tabcoul[i]}, `;
            }
            texte += `et ${tabEff[3]} boules ${tabcoul[3]}. <br>`;
            texte += `On prend une boule, on note sa couleur, et on remet la boule dans l'urne. On répète ce processus ${nombre_avec_espace(nbLancers)} fois. `
            texte += `On étudie les fréquences d'apparition de chaque couleur. On obtient les résultats suivants : <br>`;
            tabEffModif = tabEff.map(x=>x*(1+randint(-50,50)/1000)); // on modifie très légèrement le tirage max 5%
            S2 = tabEff.reduce((a, b)=> a + b,0);
            for (let i =0; i<4 ; i++) {
              tabRes[i] = [tabcoul[i], calcul(tabEffModif[i]/S2)];
            }   
            titreligne = "Couleur des boules"; // pour remplir le tableau
            tabtitrecolonne = tabcoul; 
            texte_corr += `Chaque boule a la même probabilité d'être choisie. Par exemple, la probabilité de tirer une boule ${tabcoul[0]} est : $\\dfrac{${tabEff[0]}}{${S1}}$. `
            texte_corr += `Les probabilités théoriques sont : <br>`;
            N = tabtitrecolonne.length;
            texte_corr += `$\\begin{array}{|l|` + `c|`.repeat(N) + `}\n`;
            texte_corr += `\\hline\n`;
            texte_corr += `\\text{${titreligne}}`
            for (let i = 0; i<N ; i++) {
              texte_corr += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`;
            }
            texte_corr += `\\\\\\hline\n`;
            texte_corr += `\\text{Fréquence d'apparition (en fraction)}`;
            for (let i = 0; i<N ; i++) {
              texte_corr += ` & \\dfrac{${tabEff[i]}}{${S1}} `; // probleme d'espace
            }
            texte_corr += `\\\\\\hline\n`;
            texte_corr += `\\text{Fréquence d'apparition (en pourcentage)}`;
            for (let i = 0; i<N ; i++) {
              texte_corr += ` & \\text{${arrondi_virgule(100*tabEff[i]/S1, 1)}} \\% `;
            }
            texte_corr += `\\\\\\hline\n`;
            texte_corr += `\\end{array}\n$ <br>`;
            texte_corr += `Les probabilités semblent très proches des fréquences observées. <br>`;
            texte_corr += texte_en_couleur_et_gras(`Conclusion : les résultats semblent respecter le principe de stabilisation des fréquences; le tableau est bien compatible avec un tirage aléatoire dans une urne.`);

          break;  

          case 4:
            // avec une urne et des boules  
            // Cas où les fréquences rejoignent les proba
            texte += `CAS 4 *********************** <br>`;
              face = randint(1, nbFaces); // on choisit une couleur au hasard. Elle aura une fréquence déséquilibrée.
              tabEff = [randint(2,9), randint(2,9), randint(2,9), randint(2,9)];
              S1 = tabEff.reduce((a, b)=> a + b,0);
              for (let i =0; i<4 ; i++) {
                tabProba[i] = [tabcoul[i], calcul(tabEff[i]/S1)];
              }    
              texte += `Dans une urne opaque, il y a `;  
              for (let i=0 ; i<3; i++) {
                texte += `${tabEff[i]} boules ${tabcoul[i]}, `;
              }
              texte += `et ${tabEff[3]} boules ${tabcoul[3]}. <br>`;
              texte += `On prend une boule, on note sa couleur, et on remet la boule dans l'urne. On répète ce processus ${nombre_avec_espace(nbLancers)} fois. `
              texte += `On étudie les fréquences d'apparition de chaque couleur. On obtient les résultats suivants : `;
              tabEffModif = tabEff.map(x=>x*(1+randint(-50,50)/1000)); // on modifie très légèrement le tirage de max 5%
              tabEffModif[face] = 1.75*tabEff[face]; // on augmente de 75% l'effectif d'une couleur
              S2 = tabEffModif.reduce((a, b)=> a + b,0);
              for (let i =0; i<4 ; i++) {
                tabRes[i] = [tabcoul[i], calcul(tabEffModif[i]/S2)];
              }   
              // CORRECTION : 
              titreligne = "Couleur des boules"; // pour remplir le tableau
              tabtitrecolonne = tabcoul; 
              texte_corr += `Chaque boule a la même probabilité d'être choisie. Par exemple, la probabilité de tirer une boule ${tabcoul[0]} est : $\\dfrac{${tabEff[0]}}{${S1}}$. `
              texte_corr += `Les probabilités théoriques sont : <br>`;
              N = tabtitrecolonne.length;
              texte_corr += `$\\begin{array}{|l|` + `c|`.repeat(N) + `}\n`;
              texte_corr += `\\hline\n`;
              texte_corr += `\\text{${titreligne}}`
              for (let i = 0; i<N ; i++) {
                texte_corr += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`;
              }
              texte_corr += `\\\\\\hline\n`;
              texte_corr += `\\text{Fréquence d'apparition (en fraction)}`;
              for (let i = 0; i<N ; i++) {
                texte_corr += ` & \\dfrac{${tabEff[i]}}{${S1}} `; // probleme d'espace
              }
              texte_corr += `\\\\\\hline\n`;
              texte_corr += `\\text{Fréquence d'apparition (en pourcentage)}`;
              for (let i = 0; i<N ; i++) {
                texte_corr += ` & \\text{${arrondi_virgule(100*tabEff[i]/S1, 1)}} \\% `;
              }
              texte_corr += `\\\\\\hline\n`;
              texte_corr += `\\end{array}\n$ <br>`;
              texte_corr += `Les valeurs de fréquence et de probabilité pour les boules ${tabcoul[face]} ne correspondent pas. Il y a trop de différence. <br>`
              texte_corr += texte_en_couleur_et_gras(`Conclusion : les résultats ne semblent pas respecter le principe de stabilisation des fréquences ; le tableau n'est pas compatible avec un tirage aléatoire dans une urne.`);

            break;  
  
        }
        N = tabtitrecolonne.length;

        sortie_html ? texte +=`<br><center>` : texte +=`\\begin{center}` ;

        texte += `$\\begin{array}{|l|` + `c|`.repeat(N) + `}\n`;
        texte += `\\hline\n`;
        texte += `\\text{${titreligne}}`
        for (let i = 0; i<N ; i++) {
          texte += ` & \\textbf{\\text{${tabtitrecolonne[i]}}}`;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\text{Fréquence d'apparition}`;
        for (let i = 0; i<N ; i++) {
          texte += ` & \\text{${arrondi_virgule(100*tabRes[i][1], 1)}} \\% `;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\end{array}\n$`;
        sortie_html ? texte +=`</center>` : texte +=`\\end{center}` ;

        texte += `<br>`;
        texte += `Ces résultats vous semblent-ils respecter les principes des probabilités ? Détailler votre réponse en vous basant sur des calculs.<br>`;

        if (this.liste_questions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.liste_questions.push(texte);
          this.liste_corrections.push(texte_corr);
          i++;
        }
        cpt++;
      }
      liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  this.besoin_formulaire_numerique = ['Type d\'expérience', 2, `1 : Tirage de dés\n 2 : Tirage dans une urne`]
  this.besoin_formulaire2_texte = ["Nombre de tirages"];
  this.besoin_formulaire3_case_a_cocher =['équiprobabilité',true]
  
  } // Fin de l'exercice.
  