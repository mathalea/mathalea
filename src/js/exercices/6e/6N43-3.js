import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,combinaisonListes,sommeDesChiffres,calcul,texNombre, randint, choice} from '../../modules/outils.js'
export const amcReady = true
export const amcType = 1 // type de question AMC

export const titre = 'Diviseur, multiple, divisible - Vrai ou faux'

/**
 * Vrai ou faux sur les notions de diviseur ou multiple
 * @Auteur Rémi Angot
 * Référence 6N43-3
*/
export default function ExerciceVraiFauxDivisibleMultipleDiviseur() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "Pour chaque affirmation, indiquer si elle est vraie ou fausse.";
  this.nbQuestions = 5;
  this.nbCols = 2; // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2; // Uniquement pour la sortie LaTeX
  this.sup = 1; // Niveau de difficulté à ne définir que si on peut le modifier avec un formulaire en paramètre
  this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = "" // Id YouTube ou url
  this.qcmDisponible=true
  this.modeQcm=false
  
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
        result = `, car la somme de ses chiffres est $${sommeDesChiffres(a.toString())}=${calcul(sommeDesChiffres(a.toString()))}$ qui est divisible par $${N}$.`
      }
      else {
        result = `, car $${texNombre(a)} = ${N}\\times ${calcul(a/N)}$.`
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
        result = `, car la somme de ses chiffres est $${sommeDesChiffres(a.toString())}=${calcul(sommeDesChiffres(a.toString()))}$ qui n'est pas divisible par $${N}$.`
      }
      else {
        result = `, car $${texNombre(a)} = ${N}\\times ${Math.floor(a/N)}+ ${a%N}$.`
      }
    }
    return result
  }

  this.nouvelleVersion = function () {
    this.qcm=['6N43-3',[],"Diviseur, multiple, divisible - Vrai ou faux",1,{ordered:true,lastChoices:2}]
    let tabrep,tabicone
    let espace =``;
    if (sortieHtml) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }

    this.listeQuestions = []; // Liste de questions
    this.listeCorrections = []; // Liste de questions corrigées

    let type_de_questions_disponibles = ['Ndiviseur','divisibleParN','multipleDeN','NdiviseurF','divisibleParNF','multipleDeNF','NdiviseurEnvers','divisibleParNEnvers','multipleDeNEnvers']; 
    if (this.nbQuestions<8) {
      type_de_questions_disponibles = [choice(['Ndiviseur','divisibleParN']),'multipleDeN',choice(['NdiviseurF','divisibleParNF']),'multipleDeNF',choice(['NdiviseurEnvers','divisibleParNEnvers','multipleDeNEnvers'])]; 
    }
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
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
    let liste_de_N = combinaisonListes(liste_de_N_disponibles,this.nbQuestions); // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, N, a, cpt = 0; i < this.nbQuestions && cpt < 50;) {
        // Boucle principale où i+1 correspond au numéro de la question
        N = liste_de_N[i]
        a = randint(199,999)*N;
        switch (listeTypeDeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'Ndiviseur': 
          texte = `$${N}$ est un diviseur de $${texNombre(a)}$.`;
          texteCorr = texte.replace('.',' ') + ' : Vrai';
          texteCorr += justification(N,a,true);
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
          break;
        case 'divisibleParN': 
          texte = `$${texNombre(a)}$ est divisible par $${N}$.`;
          texteCorr = texte.replace('.',' ') + ' : Vrai';
          texteCorr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
         break;
        case 'multipleDeN': 
          texte = `$${texNombre(a)}$ est un multiple de $${N}$.`;
          texteCorr = texte.replace('.',' ') + ' : Vrai';
          texteCorr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[1,0,0]
         break;
        case 'NdiviseurF':
          a += randint(1,N-1) 
          texte = `$${N}$ est un diviseur de $${texNombre(a)}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
         break;
        case 'divisibleParNF': 
          a += randint(1,N-1) 
          texte = `$${texNombre(a)}$ est divisible par $${N}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'multipleDeNF': 
          a += randint(1,N-1) 
          texte = `$${texNombre(a)}$ est un multiple de $${N}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += justification(N,a,false)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'NdiviseurEnvers': 
          texte = `$${texNombre(a)}$ est un diviseur de $${N}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += `, il faudrait plutôt dire $${N}$ est un diviseur de $${texNombre(a)}$`
          texteCorr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'divisibleParNEnvers': 
          texte = `$${N}$ est divisible par $${texNombre(a)}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += `, il faudrait plutôt dire $${texNombre(a)}$ est divisible par $${N}$`
          texteCorr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
          break;
        case 'multipleDeNEnvers': 
          texte = `$${N}$ est un multiple de $${texNombre(a)}$.`;
          texteCorr = texte.replace('.',' ') + ' : Faux';
          texteCorr += `, il faudrait plutôt dire $${a}$ est un multiple de $${N}$`
          texteCorr += justification(N,a,true)
          tabrep=["Vrai","Faux","Je ne sais pas"];
          tabicone=[0,1,0]
           break;
      }
      if (this.modeQcm&&!mathalea.sortieAMC) {
        texteCorr=`${texte}..`
        texte+=`<br><br>  Réponses possibles : ${espace}  `
        //shuffle2tableaux(tabrep, tabicone);
        for (let i=0; i<tabrep.length; i++) {
          texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
         if (tabicone[i]==1) {
           texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
         } else {
           texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
         }
       }
      }
      if (this.listeQuestions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte);
        this.listeCorrections.push(texteCorr);
        this.qcm[1].push([`${texte}.\\\\ \n `,
        tabrep,
        tabicone]) 
        i++;
      }
      cpt++;
    }
    listeQuestionsToContenu(this);
  };
  this.besoinFormulaireNumerique = ['Niveau de difficulté',3,'1 : Critères de divisibilité par 2 et 5\n2 : Critères de divisibilité par 2, 3, 5 et 9\n3 : Sans critères de divisibilité'];
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

