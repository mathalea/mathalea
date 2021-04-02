import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,combinaison_listes,somme_des_chiffre,calcul,tex_nombre, randint, choice} from "/modules/outils.js"
/**
 * Vrai ou faux sur les notions de diviseur ou multiple
 * @Auteur Rémi Angot
 * Référence 6N43-3
*/
export default function ExerciceVraiFauxDivisibleMultipleDiviseur() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Diviseur, multiple, divisible - Vrai ou faux";
  this.consigne = "Pour chaque affirmation, indiquer si elle est vraie ou fausse.";
  this.nb_questions = 5;
  this.nb_cols = 2; // Uniquement pour la sortie LaTeX
  this.nb_cols_corr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.QCM_disponible=true
  this.ModeQCM=false
  
  function justification(N,a,booleen) {

    let result
    if (booleen == true){
      if (N == 2) {
        result = ', car son chiffre des unités est $0$, $2$, $4$, $6$ ou $8$.'
      }
      else if (N == 5) {
        result = ', car son chiffre des unités est $0$, ou $5$.'
      }
      else if (N == 3 || N == 9) {
        result = `, car la somme de ses chiffres est $${somme_des_chiffre(a.toString())}=${calcul(somme_des_chiffre(a.toString()))}$ qui est divisible par $${N}$.`
      }
      else {
        result = `, car $${tex_nombre(a)} = ${N}\\times ${calcul(a/N)}$.`
      }
    }
    if (booleen == false){
      if (N == 2) {
        result = ", car son chiffre des unités n'est pas $0$, $2$, $4$, $6$ ou $8$."
      }
      else if (N == 5) {
        result = ", car son chiffre des unités n'est pas $0$, ou $5$."
      }
      else if (N == 3 || N == 9) {
        result = `, car la somme de ses chiffres est $${somme_des_chiffre(a.toString())}=${calcul(somme_des_chiffre(a.toString()))}$ qui n'est pas divisible par $${N}$.`
      }
      else {
        result = `, car $${tex_nombre(a)} = ${N}\\times ${Math.floor(a/N)}+ ${a%N}$.`
      }
    }
    return result
  }

  this.nouvelle_version = function () {
    this.QCM=['6N43-3',[],"Diviseur, multiple, divisible - Vrai ou faux",1,{ordered:true,lastChoices:2}]
    let tabrep,tabicone
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }

    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['Ndiviseur','divisibleParN','multipleDeN','NdiviseurF','divisibleParNF','multipleDeNF','NdiviseurEnvers','divisibleParNEnvers','multipleDeNEnvers']; 
    if (this.nb_questions<8) {
      type_de_questions_disponibles = [choice(['Ndiviseur','divisibleParN']),'multipleDeN',choice(['NdiviseurF','divisibleParNF']),'multipleDeNF',choice(['NdiviseurEnvers','divisibleParNEnvers','multipleDeNEnvers'])]; 
    }
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    let liste_de_N_disponibles
    if (this.sup == 1) {
        liste_de_N_disponibles = [2,5]
    }
    if (this.sup == 2) {
        liste_de_N_disponibles = [2,3,5,9]
    }
    if (this.sup == 3) {
        liste_de_N_disponibles = [7,11,13,20,30,25]
    }
    let liste_de_N = combinaison_listes(liste_de_N_disponibles,this.nb_questions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texte_corr, N, a, cpt = 0; i < this.nb_questions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        N = liste_de_N[i]
        a = randint(199,999)*N;
        switch (liste_type_de_questions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Ndiviseur': 
          texte = `$${N}$ est un diviseur de $${tex_nombre(a)}$.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          texte_corr += justification(N,a,true);
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
          break;
        case 'divisibleParN': 
          texte = `$${tex_nombre(a)}$ est divisible par $${N}$.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          texte_corr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
         break;
        case 'multipleDeN': 
          texte = `$${tex_nombre(a)}$ est un multiple de $${N}$.`;
          texte_corr = texte.replace('.',' ') + ' : Vrai';
          texte_corr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
         break;
        case 'NdiviseurF':
          a += randint(1,N-1) 
          texte = `$${N}$ est un diviseur de $${tex_nombre(a)}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
         break;
        case 'divisibleParNF': 
          a += randint(1,N-1) 
          texte = `$${tex_nombre(a)}$ est divisible par $${N}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'multipleDeNF': 
          a += randint(1,N-1) 
          texte = `$${tex_nombre(a)}$ est un multiple de $${N}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'NdiviseurEnvers': 
          texte = `$${tex_nombre(a)}$ est un diviseur de $${N}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += `, il faudrait plutôt dire $${N}$ est un diviseur de $${tex_nombre(a)}$`
          texte_corr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'divisibleParNEnvers': 
          texte = `$${N}$ est divisible par $${tex_nombre(a)}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += `, il faudrait plutôt dire $${tex_nombre(a)}$ est divisible par $${N}$`
          texte_corr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'multipleDeNEnvers': 
          texte = `$${N}$ est un multiple de $${tex_nombre(a)}$.`;
          texte_corr = texte.replace('.',' ') + ' : Faux';
          texte_corr += `, il faudrait plutôt dire $${a}$ est un multiple de $${N}$`
          texte_corr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
           break;
      }
      if (this.ModeQCM&&!mathalea.sortieAMC) {
        texte_corr=`${texte}..`
        texte+=`<br><br>  Réponses possibles : ${espace}  `
        //shuffle2tableaux(tabrep, tabicone);
        for (let i=0; i<tabrep.length; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
         if (tabicone[i]==1) {
           texte_corr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
         } else {
           texte_corr += `$\\square\\;$ ${tabrep[i]}` + espace ;
         }
       }
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        this.QCM[1].push([`${texte}.\\\\ \n `,
        tabrep,
        tabicone]) 
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Critères de divisibilité par 2 et 5\n2 : Critères de divisibilité par 2, 3, 5 et 9\n3 : Sans critères de divisibilité'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

