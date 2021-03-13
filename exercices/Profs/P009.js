import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, tex_nombre, randint, calcul, arrondi_virgule, nombre_avec_espace } from "/modules/outils.js"
import { fraction } from "/modules/Fractions.js"
import { repere2, traceBarre, mathalea2d } from "/modules/2d.js"

/**
 * Reconnaître une fonction affine
* @auteur Erwan Duplessy
* 6C30-1
* D'après le document "Attendus en fin de 3eme"
* On donne les fréquences d’apparition de chaque face d’un dé pour 10000 lancers. 
* L’élève interprète les résultats en les comparant aux probabilités théoriques.
*/

export default function SimulateurAleatoire() {
  "use strict"
  Exercice.call(this)
  this.titre = "Simulation d'expériences aléatoires";
  this.nb_questions = 1; // Ici le nombre de questions
  this.nb_questions_modifiable = true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  this.correction_detaillee_disponible = true
  this.correction_detaillee = true
  this.sup = 1; // situation 1=dés
  this.sup2 = 10000; // nbLancers
  this.sup3 = false; // true = équiprobable, false = jeu truqué


  this.consigne = `<center><a title="Diacritica, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dice_(typical_role_playing_game_dice).jpg"><img width="128" alt="Dice (typical role playing game dice)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dice_%28typical_role_playing_game_dice%29.jpg/128px-Dice_%28typical_role_playing_game_dice%29.jpg"></a></center>`

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    let texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texte_corr = ''
    let nbFaces = 2 * randint(1, 5) + 2; // nombre de faces du dé : 4, 6, 8, 10 ou 12
    let nbLancers = parseInt(this.sup2); // nombre de lancers 
    let tabEff = new Array();// tableau d'effectifs temporaires - une dimension [eff]
    let S = 0; // effectif total
    let tabRes = new Array(); // tableau des fréqeunces observées - deux dimensions [val, freq]
    this.liste_corrections = []
    this.liste_questions = []
    let tabcoul = ["rouges", "vertes", "bleues", "noires"];
    let tabNbBoules = [randint(2, 5), randint(2, 5), randint(2, 5), randint(2, 5)]
    let nbBoules = 0, f, choix
    for (let i = 0; i < 4; i++) {
      nbBoules += tabNbBoules[i]
    }


    switch (parseInt(this.sup)) { // 
      case 1: // Tirages de dés
        f = fraction(1, nbFaces)
        texte_corr = `Chaque face a la même probabilité de sortir : $${f.texFraction}\\approx ${arrondi_virgule(f.pourcentage)}\\%$.<br>`

        texte += `On lance un dé à ${nbFaces} faces ${nombre_avec_espace(nbLancers)} fois.<br>On étudie les fréquences d'apparition de chaque face.<br>On obtient les résultats suivants : <br>`;
        if (this.sup3) {
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            tabEff[randint(1, nbFaces) - 1]++
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)];
          }
        }
        else {
          let face = randint(1, nbFaces); // on choisit une face au hasard. Elle aura une fréquence déséquilibrée.
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            tabEff[randint(1, nbFaces) - 1]++
          }
          S = tabEff[face - 1] * 3 / 4
          tabEff[randint(1, nbFaces, face) - 1] += S
          tabEff[face - 1] -= S
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)];
          }
          texte_corr += `Ici, l'expérience montre qu'il y a quelque chose qui semble fausser cette équiprobabilité comme un dé truqué.<br>`
          texte_corr += `En effet, la fréquence de la face $${face}$ est largement supérieur à $${arrondi_virgule(f.pourcentage)}\\%$.`
          console.log(tabEff, S, face, nbFaces)
        }

        break;

      case 2: // Tirage dans une urne
        let face = randint(1, 4)
        texte += `Des boules de différentes couleurs sont placées dans une urne.<br>`
        texte += `Il y a $${tabNbBoules[0]}$ ${tabcoul[0]}, $${tabNbBoules[1]}$ ${tabcoul[1]}, $${tabNbBoules[2]}$ ${tabcoul[2]} et $${tabNbBoules[3]}$ ${tabcoul[3]}.<br>`
        texte += `On effectue $${nbLancers}$ tirages avec remise.<br>`
        texte += `On étudie les fréquences d'apparition de chaque couleur.<br>On obtient les résultats suivants : <br>`;
        f = fraction(tabNbBoules[face-1], nbBoules)
        if (this.sup3) {
          nbFaces = 4
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            choix = randint(1, nbBoules)
            if (choix <=tabNbBoules[0]) {
              tabEff[0]++
            }
            else if (choix <=tabNbBoules[0]+tabNbBoules[1]) {
              tabEff[1]++
            }
            else if (choix <=tabNbBoules[0] + tabNbBoules[1] + tabNbBoules[2]) {
              tabEff[2]++
            }
            else {
              tabEff[3]++
            }
          }
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)];
          }
        }
        else {
          nbFaces = 4
          for (let i = 0; i < nbFaces; i++) {
            tabEff.push(0)
          }
          for (let i = 0; i < nbLancers; i++) {
            choix = randint(0, nbBoules - 1)
            if (choix < tabNbBoules[0]) {
              tabEff[0]++
            }
            else if (choix < tabNbBoules[0] + tabNbBoules[1]) {
              tabEff[1]++
            }
            else if (choix < tabNbBoules[0] + tabNbBoules[1] + tabNbBoules[2]) {
              tabEff[2]++
            }
            else {
              tabEff[3]++
            }
          }
          S = tabEff[face - 1] * 3 / 4
          tabEff[randint(1, 4, face) - 1] += S
          tabEff[face - 1] -= S
          for (let i = 0; i < nbFaces; i++) {
            tabRes[i] = [i, calcul(tabEff[i] / nbLancers)];
          }
          texte_corr += `Ici, l'expérience montre qu'il y a quelque chose qui semble fausser cette équiprobabilité comme des boules discernables au toucher.<br>`
          texte_corr += `En effet, la fréquence des boules ${tabcoul[face - 1]} est largement supérieur à $${f.texFraction}\\approx ${arrondi_virgule(f.pourcentage)}\\%$.`
        }
        break
    }
    switch (parseInt(this.sup)) {
      case 1:
        texte += `$\\begin{array}{|l|` + `c|`.repeat(nbFaces) + `}\n`;
        texte += `\\hline\n`;
        texte += `\\text{Numéro de la face}`;
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\textbf{\\text{${i + 1}}}`;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\text{Fréquence d'apparition}`;
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\text{${arrondi_virgule(100 * tabRes[i][1], 1)}} \\% `;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\end{array}\n$`;
        texte += `<br>`;
        if (this.correction_detaillee) {

          let coef = 10;
          let r = repere2({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 1 / coef,
            yThickDistance: 1 * coef,
            yMax: 40,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: "fréquences en %"
          });

          let lstElementGraph = [];
          for (let i = 0; i < nbFaces; i++) {
            lstElementGraph.push(traceBarre(((r.xMax - r.xMin) / nbFaces) * (i + 0.5), tabRes[i][1] * 10, i + 1), { unite: 1 / coef });
          }
          texte += mathalea2d({ xmin: -1, xmax: 11, ymin: -4, ymax: 5.5, pixelsParCm: 30, scale: 1 }, r, lstElementGraph);
        }
        break
      case 2:
        texte += `$\\begin{array}{|l|` + `c|`.repeat(nbFaces) + `}\n`;
        texte += `\\hline\n`;
        texte += `\\text{Couleur de la boule}`;
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\textbf{\\text{${tabcoul[i].substring(0,tabcoul[i].length-1)}}}`;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\text{Fréquence d'apparition}`;
        for (let i = 0; i < nbFaces; i++) {
          texte += ` & \\text{${arrondi_virgule(100 * tabRes[i][1], 1)}} \\%`;
        }
        texte += `\\\\\\hline\n`;
        texte += `\\end{array}\n$`;
        texte += `<br>`;
        if (this.correction_detaillee) {

          let coef = 10;
          let r = repere2({
            grilleX: false,
            grilleY: 'pointilles',
            xThickListe: [],
            xLabelListe: [],
            yUnite: 1 / coef,
            yThickDistance: 1 * coef,
            yMax: 55,
            xMin: 0,
            xMax: 10,
            yMin: 0,
            axeXStyle: '',
            yLegende: "fréquences en %"
          });

          let lstElementGraph = [];
          for (let i = 0; i < nbFaces; i++) {
            lstElementGraph.push(traceBarre(((r.xMax - r.xMin) / nbFaces) * (i +0.5), tabRes[i][1] * 10, tabcoul[i]), { unite: 1 / coef });
          }
          texte += mathalea2d({ xmin: -1, xmax: 12, ymin: -4, ymax: 7, pixelsParCm: 30, scale: 1 }, r, lstElementGraph);
        }
        break
    }

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoin_formulaire_numerique = ['Type d\'expérience', 2, `1 : Tirage de dés\n 2 : Tirage dans une urne`]
  this.besoin_formulaire2_texte = ["Nombre de tirages", `Taper un nombre entier : ${10000}`];
  this.besoin_formulaire3_case_a_cocher = ["Équiprobabilité", true]


} // Fin de l'exercice.
