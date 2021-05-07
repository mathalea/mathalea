import Exercice from '../ClasseExercice.js';
import {shuffle2tableaux,exportQcmAmc,calcul,listeQuestionsToContenu,combinaisonListes,randint,texNombre,texNombre2,texFraction,choice,miseEnEvidence} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Multiplication par 0,1 ; 0,01 ; 0,001 (compléter avec le nombre qui convient)'

/**
 * @Auteur Jean-claude Lhote
 * Publié le 20/02/2021
 * Référence 6C30-5
 */
export default function Multiplier_par_001() {
    "use strict"
    Exercice.call(this)
    this.titre = titre;
    this.nbQuestions = 4; // Ici le nombre de questions
    this.nbQuestionsModifiable=true // Active le formulaire nombre de questions
    this.nbCols = 1; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 1;// Le nombre de colonne pour la correction LaTeX
    this.pasDeVersionLatex=false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false // mettre à true si on ne veut pas de l'exercice en ligne
    this.consigne=`Compléter les pointillés.`
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  this.qcmDisponible=true
  this.modeQcm=false;
  this.sup = false; 
  this.sup2=4
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.modeQcm = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
 
    this.qcm=['6C30-5',[],"Multiplication par 0,1 ; 0,01 ; 0,001 (compléter avec le nombre qui convient)",1]

    this.listeQuestions = [] // tableau contenant la liste des questions 
    this.listeCorrections = []
    let type_de_questions_disponibles
    if (this.sup2==4) {
      type_de_questions_disponibles=[1,2,3]
    }
    else {
      type_de_questions_disponibles=[parseInt(this.sup2)]
    }
    let listeTypeDeQuestions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
    let rang=['millièmes','centièmes','dixièmes']
    let tabrep,tabicone=[1,0,0,0]
    let espace =``;
    if (sortieHtml) {
      espace = `&emsp;`;
    } else {
      espace = `\\qquad`;
    }
    this.qcm[1]=[]
      for (let i = 0, texte, texteCorr,coef,nombre,nombreentier,resultat,exposant, cpt = 0; i < this.nbQuestions && cpt < 50;) {

        texte = `` // Nous utilisons souvent cette variable pour construire le texte de la question.
        texteCorr = `` // Idem pour le texte de la correction.
        coef=-randint(1,3)
        if (!this.sup) {
            exposant=-randint(1,3)
        }
        else {
            exposant=0
        }
        nombreentier=calcul(randint(10,1000)+randint(10,999)*choice([0,1000]))
        nombre=calcul(nombreentier*10**exposant)
        resultat=calcul(nombre*10**coef)
        switch (listeTypeDeQuestions[i]) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
          case 1:
            tabrep=[`$${texNombre2(resultat)}$`,`$${texNombre2(calcul(nombre*10**(-coef)))}$`,`$${texNombre2(calcul(nombre*10**(coef-1)))}$`,`$${texNombre2(calcul(nombre*10**(-coef+1)))}$`]
            tabicone=[1,0,0,0]
            this.qcm[1].push([`Que doit-on écrire à la place des pointillés ? $${texNombre2(nombre)} \\times ${texNombre2(calcul(10**coef))}~~ = ~~\\ldots\\ldots\\ldots\\ldots$.\\\\ \n Réponses possibles`,
            tabrep,
            tabicone]) 
            texte= `$${texNombre2(nombre)} \\times ${texNombre2(calcul(10**coef))}~~ = ~~\\ldots\\ldots\\ldots\\ldots$`
            if (this.modeQcm) {
              texte+=`<br>   Réponses possibles : ${espace}  `
              shuffle2tableaux(tabrep, tabicone);
              for (let i=0; i<tabrep.length; i++) {
                texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
               if (tabicone[i]==1) {
                 texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
               } else {
                 texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
               }
             }
             break
            }
            texteCorr=`Quand on multiplie par $${texNombre2(calcul(10**coef))}=${texFraction(1,calcul(10**(-coef)))}$ chaque chiffre prend une valeur $${texNombre2(calcul(10**(-coef)))}$ fois plus petite.<br>`
            texteCorr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
            texteCorr=`$${texNombre2(nombre)} \\times ${texNombre2(calcul(10**coef))}~~ =~~ ${miseEnEvidence(texNombre2(resultat),'blue')}$`

            break;
  
          case 2:
            tabrep=[`$${texNombre2(calcul(10**coef))}$`,`$${texNombre2(calcul(10**(coef-1)))}$`,`$${texNombre2(calcul(10**(coef+1)))}$`,`$${texNombre2(calcul(10**(-coef)))}$`]
            tabicone=[1,0,0,0]
            this.qcm[1].push([`Que doit-on écrire à la place des pointillés ? $${texNombre2(nombre)} \\times \\ldots\\ldots\\ldots~~ = ~~${texNombre2(resultat)}$.\\\\ \n Réponses possibles`,
            tabrep,
            tabicone]) 
            texte= `$${texNombre2(nombre)} \\times \\ldots\\ldots\\ldots~~ = ~~${texNombre2(resultat)}$`
            if (this.modeQcm) {
              texte+=`<br>    Réponses possibles : ${espace}  `
              shuffle2tableaux(tabrep, tabicone);
              for (let i=0; i<tabrep.length; i++) {
                texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
               if (tabicone[i]==1) {
                 texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
               } else {
                 texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
               }
             }
             break
            }
            texteCorr=`Quand on multiplie par $${texNombre2(10**coef)}=${texFraction(1,10**(-coef))}$ chaque chiffre prend une valeur $${texNombre2(10**(-coef))}$ fois plus petite.<br>`
            texteCorr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
            texteCorr=`$${texNombre2(nombre)} \\times ${miseEnEvidence(texNombre2(10**coef),'blue')} ~~=~~ ${texNombre2(resultat)}$`
   
          break
  
          case 3:
            tabrep=[`$${texNombre2(nombre)}$`,`$${texNombre2(calcul(nombre/10))}$`,`$${texNombre2(calcul(nombre*10))}$`,`$${texNombre2(calcul(nombre*10**(-coef+1)))}$`]
            tabicone=[1,0,0,0]
            this.qcm[1].push([`Que doit-on écrire à la place des pointillés ? $\\ldots\\ldots\\ldots\\ldots \\times ${texNombre2(10**coef)}~~ = ~~${texNombre2(resultat)}$.\\\\ \n Réponses possibles`,
            tabrep,
            tabicone]) 

            texte= `$\\ldots\\ldots\\ldots\\ldots \\times ${texNombre2(10**coef)}~~ = ~~${texNombre2(resultat)}$`
            if (this.modeQcm) {
              texte+=`<br>    Réponses possibles : ${espace}  `
              shuffle2tableaux(tabrep, tabicone);
              for (let i=0; i<tabrep.length; i++) {
                texte += `$\\square\\;$ ${tabrep[i]}` + espace ;
               if (tabicone[i]==1) {
                 texteCorr += `$\\blacksquare\\;$ ${tabrep[i]}` + espace ;
               } else {
                 texteCorr += `$\\square\\;$ ${tabrep[i]}` + espace ;
               }
             }
             break
            }
            texteCorr=`Quand on multiplie par $${texNombre2(10**coef)}=${texFraction(1,10**(-coef))}$ chaque chiffre prend une valeur $${texNombre2(10**(-coef))}$ fois plus petite.<br>`
            texteCorr+=`Le chiffre des unités se positionne donc dans les ${rang[3+coef]} :<br>`
            texteCorr=`$${miseEnEvidence(texNombre2(nombre),'blue')} \\times ${texNombre2(10**coef)} = ${texNombre2(resultat)}$`
   

          break
        }

        if (this.listeQuestions.indexOf(texte) == -1) {
          // Si la question n'a jamais été posée, on la stocke dans la liste des questions
          this.listeQuestions.push(texte);
          this.listeCorrections.push(texteCorr);
          i++;
        }
        cpt++;
      }
      listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.
  
  this.besoinFormulaireCaseACocher = ['Nombres entiers',true]
  this.besoin_formulaire2_numerique = ["Type de question",4,`1 : Résultat à calculer\n 2 : Nombre à retrouver\n 3 : Fraction décimale à rtrouver\n 4 : Alternance des 3 types de question`];
  //this.besoin_formulaire3_case_a_cocher =['Mode QCM',false]
   
  } // Fin de l'exercice.
  