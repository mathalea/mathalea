import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,liste_de_question_to_contenu,randint,choice,combinaison_listes,somme_des_chiffre,calcul,tex_nombre} from "/modules/outils.js"
/**
 * Un nombre est-il divisible par :
 *
 * * 2, 5, 10 ?
 * * 3, 9 ?
 * * 2, 3, 5, 9, 10 ?
 * * 2, 3, 5, 9, 10  et un autre nombre qui peut être 7, 13, 17, ou 19 ?
 * @Auteur Rémi Angot
 * 6N43
 */
export default function Criteres_de_divisibilite() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.sup = 4; // Correspond au facteur commun
  this.titre = "Critères de divisibilité";
  this.consigne = "Répondre aux questions suivantes en justifiant.";
  this.spacing = 2;
  this.spacing_corr = 1;
  this.nb_questions = 5;
  this.nb_cols_corr = 1;
  this.QCM_disponible=true
  this.ModeQCM=false

  this.nouvelle_version = function () {
    this.QCM=['6N43',[],"Critères de divisibilité",1,{ordered:true,lastChoices:2}]
    let tabrep,tabicone
    let espace =``;
    if (sortie_html) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
 this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let liste_des_exercices_disponibles;
    if (this.sup == 1) {
      liste_des_exercices_disponibles = [2, 5, 10];
    }
    if (this.sup == 2) {
      liste_des_exercices_disponibles = [3, 9];
    }
    if (this.sup == 3) {
      liste_des_exercices_disponibles = [2, 3, 5, 9, 10];
    }
    if (this.sup > 3) {
      liste_des_exercices_disponibles = [2, 3, 5, 9, 10, "autre"];
    }
    let liste_type_de_questions = combinaison_listes(
      liste_des_exercices_disponibles,
      this.nb_questions
    );
    for (
      let i = 0, n, u, texte, texte_corr, somme_string, cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (liste_type_de_questions[i]) {
        case 2:
          u = randint(1, 2);
          n = randint(10, 999) * 10 + u;
          texte = `$${tex_nombre(n)}$ est-il divisible par $2$ ?`;
          if (u % 2 == 0) {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $2$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0,0]
          } else {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $2$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }
          break;

        case 3:
          n = choice([randint(100, 999), randint(10000, 99999)]).toString(); // transformé en string pour avoir accès aux chiffres
          somme_string = somme_des_chiffre(n);
          texte = `$${tex_nombre(n)}$ est-il divisible par $3$ ?`;
          if (calcul(somme_string) % 3 == 0) {
            texte_corr = `$${somme_string}=${calcul(somme_string)}=3\\times${calcul(somme_string) / 3
              }$<br>`;
            texte_corr += `La somme des chiffres de $${tex_nombre(
              n
            )}$ est divisible par $3$ donc $${tex_nombre(
              n
            )}$ est divisible par $3$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0]
          } else {
            texte_corr = `$${somme_string}=${calcul(somme_string)}=3\\times${(calcul(somme_string) - (calcul(somme_string) % 3)) / 3
              }+${calcul(somme_string) % 3}$<br>`;
            texte_corr += `La somme des chiffres de $${tex_nombre(
              n
            )}$ n'est pas divisible par $3$ donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $3$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }
          break;

        case 9:
          n = choice([randint(100, 999), randint(10000, 99999)]).toString(); // transformé en string pour avoir accès aux chiffres
          somme_string = somme_des_chiffre(n);
          texte = `$${tex_nombre(n)}$ est-il divisible par $9$ ?`;
          if (calcul(somme_string) % 9 == 0) {
            texte_corr = `$${somme_string}=${calcul(somme_string)}=9\\times${calcul(somme_string) / 9
              }$<br>`;
            texte_corr += `La somme des chiffres de $${tex_nombre(
              n
            )}$ est divisible par $9$ donc $${tex_nombre(
              n
            )}$ est divisible par $9$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0]
          } else {
            texte_corr = `$${somme_string}=${calcul(somme_string)}=9\\times${(calcul(somme_string) - (calcul(somme_string) % 9)) / 9
              }+${calcul(somme_string) % 9}$<br>`;
            texte_corr += `La somme des chiffres de $${tex_nombre(
              n
            )}$ n'est pas divisible par $9$ donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $9$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }
          break;

        case 5:
          u = choice([randint(1, 9, [0, 5]), randint(1, 9, [0, 5]), 5, 0]); // 1 fois sur 2 ça sera divisible par 5
          n = randint(10, 9999) * 10 + u;
          texte = `$${tex_nombre(n)}$ est-il divisible par $5$ ?`;
          if (u % 5 == 0) {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $5$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0]
          } else {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $5$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }
          break;

        case 10:
          u = choice([randint(1, 9), 0]); // 1 fois sur 2 ça sera divisible par 10
          n = randint(10, 9999) * 10 + u;
          texte = `$${tex_nombre(n)}$ est-il divisible par $10$ ?`;
          if (u == 0) {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(n)}$ est divisible par $10$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0]
          } else {
            texte_corr = `Le chiffre des unités de $${tex_nombre(
              n
            )}$ est $${u}$ donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $10$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }
          break;

        case "autre":
          n = randint(100, 999);
          u = choice([7, 7, 7, 7, 13, 17, 19]);
          if (u == 7) {
            n = choice(
              [randint(10, 99) * 10 + 7],
              7 * randint(11, 99),
              randint(100, 999)
            ); //un nombre qui se termine par 7, un divisible par 7, un au hasard
          } else {
            n = choice(
              [randint(10, 99) * 100 + u],
              u * randint(11, 99),
              randint(100, 999)
            ); //un nombre qui se termine par u, un divisible par u, un au hasard
          }
          texte = `$${tex_nombre(n)}$ est-il divisible par $${u}$ ?`;
          texte_corr = `On ne connait pas de critère de divisibilité par $${u}$, on calcule donc la division euclidienne de $${tex_nombre(
            n
          )}$ par $${u}$.<br>`;
          if (n % u == 0) {
            texte_corr += `$${tex_nombre(n)}=${u}\\times${tex_nombre(
              n / u
            )}$<br>`;
            texte_corr += `Le reste de la division euclidienne est nul donc $${tex_nombre(
              n
            )}$ est divisible par $${u}$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[1,0,0]
          } else {
            texte_corr += `$${tex_nombre(n)}=${u}\\times${(n - (n % u)) / u}+${n % u
              }$<br>`;
            texte_corr += `Le reste de la division euclidienne n'est pas nul donc $${tex_nombre(
              n
            )}$ n'est pas divisible par $${u}$.`;
            tabrep=[`Oui`,`Non`,`Je ne sais pas`]
            tabicone=[0,1,0]
          }

          break;
      }
      if (this.ModeQCM&&!mathalea.sortieAMC) {
        texte_corr=''
        texte+=`<br><br>  Réponses possibles : ${espace}  `
        shuffle2tableaux(tabrep, tabicone);
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
        i++;
        this.QCM[1].push([`${texte}. \n `,
        tabrep,
        tabicone]) 
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  this.besoin_formulaire_numerique = [
    "Choix des questions",
    4,
    "1 : Critères de divisibilité par 2, 5, 10\n\
2 : Critères de divisibilité par 3,9\n3 : Critères de divisibilité par 2, 3, 5, 9, 10\n4 : Avec ou sans critère de divisibilité",
  ];
}

