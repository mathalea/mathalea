import Exercice from '../ClasseExercice.js';
import { export_QCM_AMC,liste_de_question_to_contenu, randint, tex_nombrec, tex_nombre2,calcul, choice, tex_fraction,shuffle2tableaux } from "/modules/outils.js"

/**
 * @Auteur Jean-claude Lhote
 * Publié le 20/02/2021
 * Référence 6C30-4
 */
export default function Placer_la_virgule() {
  "use strict"
  Exercice.call(this)
  this.titre = "Multiplication par 0,1 ; 0,01 ; 0,001 (Placer la virgule)";
  this.nb_questions = 4; // Ici le nombre de questions
  this.nb_questions_modifiable = true // Active le formulaire nombre de questions
  this.nb_cols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
  this.nb_cols_corr = 1;// Le nombre de colonne pour la correction LaTeX
  this.pas_de_version_LaTeX = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.consigne = `Les égalités suivantes sont fausses. Place la virgule correctement dans le résultat pour que l'égalité soit juste.`
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  this.QCM=['6C30-4',[]]
  this.QCM_disponible=true
  this.ModeQCM=false
  this.sup = false;
  
  //  this.ModeQCM = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    this.liste_questions = [] // tableau contenant la liste des questions 
    this.liste_corrections = []
    let rang = ['millièmes', 'centièmes', 'dixièmes']
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    for (let i = 0, texte, texte_corr, coef, nombre, nombreentier, resultat, exposant,tabrep,tabicone, cpt = 0; i < this.nb_questions && cpt < 50;) {

      texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
      texte_corr = `` // Idem pour le texte de la correction.
      coef = -randint(1, 3)
      if (!this.sup) {
        exposant = -randint(1, 3)
      }
      else {
        exposant = 0
      }
      nombreentier = calcul(randint(10, 1000) + randint(10, 999) * choice([0, 1000]))
      nombre = calcul(nombreentier * 10 ** exposant)
      resultat = calcul(nombre * 10 ** coef)
      tabrep=[resultat,calcul(resultat/10),calcul(resultat*10),calcul(resultat/100)]
      tabicone=[1,0,0,0]
      this.QCM[1].push([`Ou doit être placée la virgule dans le résultat ? $${tex_nombre2(nombre)} \\times ${tex_nombre2(calcul(10**coef))}~~ = ~~\\ldots\\ldots\\ldots\\ldots$.\\\\ \\n Réponses possibles`,
      tabrep,
      tabicone]) 
   
      texte = `$${tex_nombre2(nombre)} \\times ${tex_nombre2(calcul(10 ** coef))}~~ = ~~\\phantom{......}${tex_nombre2(nombreentier)}$<br>`
      if (this.ModeQCM) {
        texte+=`<br>Réponses possibles : ${espace}  `
        shuffle2tableaux(tabrep, tabicone);
        for (let i=0; i<4; i++) {
          texte += `$\\square\\; ${tex_nombre2(tabrep[i])}$` + espace ;
         if (tabicone[i]==1) {
           texte_corr += `$\\blacksquare\\; ${tex_nombre2(tabrep[i])}$` + espace ;
         } else {
           texte_corr += `$\\square\\; ${tex_nombre2(tabrep[i])}$` + espace ;
         }
       }
      }
      else {
      texte_corr = `Quand on multiplie par $${tex_nombre2(calcul(10 ** coef))}=${tex_fraction(1, calcul(10 ** (-coef)))}$ chaque chiffre prend une valeur $${tex_nombrec(10 ** (-coef))}$ fois plus petite.<br>`
      texte_corr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
      texte_corr += `$${tex_nombre2(nombre)} \\times ${tex_nombre2(calcul(10 ** coef))} = ${tex_nombre2(resultat)}$`//${tex_nombrec(Math.floor(resultat))}${mise_en_evidence(',')}${tex_nombrec(resultat-Math.floor(resultat)).replace('0,','')}$`
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
    let code=export_QCM_AMC(this.QCM)
  };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoin_formulaire_case_a_cocher = ['Nombres entiers', true];
 // this.besoin_formulaire2_case_a_cocher = ["Mode QCM",false];
  // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

} // Fin de l'exercice.
