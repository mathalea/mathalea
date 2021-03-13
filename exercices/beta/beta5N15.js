import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, combinaison_listes, randint, choice, prenom } from "/modules/outils.js"

export default function Probleme_de_ratio() {
  "use strict"
  Exercice.call(this)
  this.titre = "Problèmes de ratio";
  this.nb_questions = 4; // Ici le nombre de questions
  this.nb_questions_modifiable = true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX = false
  this.pas_de_version_HMTL = false
  this.sup = 3


  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let prenoms = [], objets
    let type_de_questions_disponibles = ['partage']//['partage','mélanges','dilution','recette','ecran'] // tableau à compléter par valeurs possibles des types de questions
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    for (let i = 0, texte, texte_corr, x, y, z, total, a, b, c, n = 2, k, cpt = 0; i < this.nb_questions && cpt < 50;) {

      texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = `` // Idem pour le texte de la correction.
      switch (parseInt(this.sup)) {
        case 1:
          x = randint(1, 5)
          y = randint(1, 5, x)
          z = 0
          n = 2
          break
        case 2:
          x = randint(1, 5)
          y = randint(1, 5, x)
          z = randint(1, 7, [x, y])
          n = 3
          break
        case 3:
          x = randint(1, 5)
          y = randint(1, 5, x)
          if (choice([true, false])) {
            z = randint(1, 7, [x, y])
            n = 3
          }
          else {
            n = 2
            z = 0
          }
          break
      }
      k = randint(2, 6)
      total = (x + y + z) * k
      switch (liste_type_de_questions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
        case 'partage':
          prenoms = prenom(n)
          objets = ['billes', 'livres', 'perles', 'gâteaux', 'bonbons']
          for (let j = 0; j < n - 1; j++) {
            if (j > 0) {
              texte += ', '
            }
            texte += `${prenoms[j]}`
          }
          texte += ` et ${prenoms[n - 1]} se partagent $${total}$ ${objets[(k+i)%5]} dans le ratio $${x}$:$${y}$`
          if (n == 3) {
            texte += `:$${z}$`
          }
          texte += `.<br>Combien de ${objets[(k+i)%5]} chaque enfant reçoit-il ?`
          if (n == 2) {
            texte_corr += `Si les enfants se partageaient $${x}+${y}=${x + y}$ ${objets[(k+i)%5]} alors ${prenoms[0]} en aurait $${x}$ et ${prenoms[1]} en aurait $${y}$.`
            texte_corr += `<br>Mais il y a $${total}$ ${objets[(k+i)%5]}, soit $${k}\\times ${x + y + z}$ ${objets[(k+i)%5]}.<br>`
             texte_corr += `Donc ${prenoms[0]} en aura $${k}\\times ${x}=${k * x}$ et ${prenoms[1]} en aura $${k}\\times ${y}=${k * y}$.<br>`
            texte_corr += `Conclusion : ${prenoms[0]} aura $${k * x}$ ${objets[(k+i)%5]} et ${prenoms[1]} en aura $${k * y}$.`

          }
          else {
            texte_corr += `Si les enfants se partageaient $${x}+${y}+${z}=${x + y + z}$ ${objets[(k+i)%5]} alors ${prenoms[0]} en aurait $${x}$, ${prenoms[1]} en aurait $${y}$ et ${prenoms[2]} en aurait $${z}$.`
            texte_corr += `<br>Mais il y a $${total}$ ${objets[(k+i)%5]}, soit $${k}\\times ${x + y + z}$ ${objets[(k+i)%5]}.<br>`
            texte_corr += `Donc ${prenoms[0]} en aura $${k}\\times ${x}=${k * x}$, ${prenoms[1]} en aura $${k}\\times ${y}=${k * y}$ et  ${prenoms[2]} en aura $${k}\\times ${z}=${k * z}$.<br>`
            texte_corr += `Conclusion : ${prenoms[0]} aura $${k * x}$ ${objets[(k+i)%5]}, ${prenoms[1]} en aura $${k * y}$ et  ${prenoms[2]} en aura $${k * z}$.`
          }
          break
        case 'mélange':
          // Idem Cas1 mais avec d'autres texte, texte_corr...
          break

        case 'dilution':

          break

        case 'recette':

          break

        case 'ecran':

          break
      }

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

  this.besoin_formulaire_numerique = ['Type de ratios', 3, `1 : x:y\n 2 : x:y:z\n 3 : Mélange`]
  //  this.besoin_formulaire2_numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

} // Fin de l'exercice.
