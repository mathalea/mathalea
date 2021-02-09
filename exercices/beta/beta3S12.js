import Exercice from '../ClasseExercice.js';
import {randint,liste_de_question_to_contenu,choice,premiere_lettre_en_majuscule,num_alpha,tex_fraction_signe,calcul,arrondi,arrondi_virgule, texte_gras} from "/modules/outils.js";
import {repere2,traceBarre,mathalea2d} from "/modules/2d.js";

/**
* Calculer des effectifs et des fréquences.
* @auteur Erwan DUPLESSY
* 3S12
* 2021-02-07
*/

export default function calcul_Effectif_Frequence() {
    "use strict"
    Exercice.call(this)
    this.titre = "Calculer des effectifs et des fréquences";
    this.consigne = `Répondre aux questions à l'aide du graphique et de calculs.`;
    this.nb_questions = 4; // Ici le nombre de questions
    this.nb_questions_modifiable=false; // Active le formulaire nombre de questions
    this.nb_cols = 2; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nb_cols_corr = 2;// Le nombre de colonne pour la correction LaTeX
    this.tailleDiaporama = 50;
    this.pas_de_version_LaTeX=false; // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false; // mettre à true si on ne veut pas de l'exercice en ligne
    this.video = "https://youtu.be/GWDDay-mdVA"; // Id YouTube ou url
    this.correction_detaillee_disponible=false;
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
   this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelle_version = function () {
    // la variable numero_de_l_exercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.liste_questions = []; // tableau contenant la liste des questions 
    this.liste_corrections = [];
    //let liste_type_de_questions_disponibles= [];
    let lstQuadri = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
    let lstOiseaux = ['hérons', 'marabouts', 'flamants roses', 'cigognes', 'grues', 'vautours'];
    let nbAnimaux = 4 + parseInt(this.sup); // nombre d'animaux différents dans l'énoncé (entre 5 et 7)
    let nbQuadri = 3 ;
    let lstAnimauxExo = []; //liste des animaux uniquement cités dans l'exercice
    let lstNombresAnimaux = []; // liste des effectifs de chaque animal
    let lstVal = []; // liste des valeurs à éviter pour les effectifs
    let N = 0, nom=``, texte=``, texte_corr=``;
  
    for (let i = 0; i < nbAnimaux; i++) {
      N = randint(2, 10, lstVal); // choisit un nombre entre 2 et 10 sauf dans les valeurs à éviter
      lstNombresAnimaux.push(N);
      lstVal = lstVal.concat([N]); // valeurs à supprimer pour éviter des valeurs égales
      if (i<nbQuadri){
        nom = choice(lstQuadri, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
      } else
      {
        nom = choice(lstOiseaux, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
      }
      lstAnimauxExo.push(nom);
    }

    let lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan', 'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane'];

    texte += `Dans le parc naturel de ` + choice(lstNomParc) + `, il y a des animaux. ` ;
    texte += `Certains sont des quadripèdes (`;
    for (let i = 0; i < nbQuadri; i++) {
      texte += lstAnimauxExo[i] + ', ';
    } 
    texte = texte.substring(0, texte.length-2);
    texte += `), et d'autres sont des oiseaux (`;
    for (let i = nbQuadri; i < nbAnimaux; i++) {
      texte += lstAnimauxExo[i] + ', ';
    }
    texte = texte.substring(0, texte.length-2);
    texte += `). `;
    
    texte += 'Voici un diagramme en bâtons qui donne le nombre d’individus pour chaque espèce.<br>';
    texte += num_alpha(0) + ` Quel est l'effectif des ` + lstAnimauxExo[0] + ` ?<br>`;
    texte += num_alpha(1) + ` Calculer la fréquence des ` + lstAnimauxExo[1] + ` ? Donner le résultat sous la forme d'un pourcentage.<br>`;
    texte += num_alpha(2) + ` Calculer l'effectif des quadripèdes ? <br>`;
    texte += num_alpha(3) + ` Calculer la fréquence des oiseaux ? Donner le résultat sous la forme d'un pourcentage.<br>`;

    texte += `Les pourcentages seront éventuellement arrondis à 0,1% près. <br>`;

    let coef = 1;

    let r = repere2({
      grilleX: false,
      grilleY: 'pointilles',
      xThickListe: [],
      xLabelListe: [],
      yUnite: 1 / coef,
      yThickDistance: 1 * coef,
      yMax: 11,
      xMin: 0,
      xMax: 10,
      yMin: 0,
      axeXStyle: '',
      yLegende: "Nombre d'individus"
    });

    let lstElementGraph = [];
    for (let i = 0; i < nbAnimaux; i++) {
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiere_lettre_en_majuscule(lstAnimauxExo[i]), { unite: 1 / coef }));
    }
    texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 11, pixelsParCm: 30, scale: 1 }, r, lstElementGraph);

//début de la correction
    //question 1    
    texte_corr += num_alpha(0) + texte_gras(` D'après le graphique, il y a ` + lstNombresAnimaux[0] + ` ` + lstAnimauxExo[0] + `. <br>`);
    //question 2
    let Ntotal = lstNombresAnimaux[0];
     texte_corr += num_alpha(1) + ` L'effectif total des animaux est : ` + lstNombresAnimaux[0] ;
    for (let i = 1; i < nbAnimaux; i++) {
      texte_corr += ` + ` + lstNombresAnimaux[i];
      Ntotal += lstNombresAnimaux[i];
    } 
    
    texte_corr += ` = `+ Ntotal + `. `
    texte_corr += ` D'après le graphique, il y a ` + lstNombresAnimaux[1] + ` ` + lstAnimauxExo[1] + `. <br>`;
    texte_corr += ` La fréquence (ou la proportion) de  ` + lstAnimauxExo[1] + ` est : $ ` + tex_fraction_signe(lstNombresAnimaux[1], Ntotal) + `$ `;
    // test de l'arrondi
    if (calcul(lstNombresAnimaux[1]/Ntotal) == arrondi(lstNombresAnimaux[1]/Ntotal,3)) {
      texte_corr += `= `;
    } else 
    {
      texte_corr += `$\\approx $ `;
    }
    texte_corr += arrondi_virgule(lstNombresAnimaux[1]/Ntotal,3) + `. <br>`;
    texte_corr += texte_gras(`La fréquence des ` + lstAnimauxExo[1] + ` est donc : ` + arrondi_virgule(100*lstNombresAnimaux[1]/Ntotal,1) + `%. <br>`);

    //question 3
    texte_corr += num_alpha(2) + `On fait la somme des effectifs de chaque espèce de quadripèdes : `
    let N_totalQuadri = lstNombresAnimaux[0];
     texte_corr += lstNombresAnimaux[0] ;
    for (let i = 1; i < nbQuadri; i++) {
      texte_corr += ` + ` + lstNombresAnimaux[i];
      N_totalQuadri += lstNombresAnimaux[i];
    } 
    texte_corr += `. <br>`
    texte_corr += texte_gras(`L'effectif des quadripèdes est donc : ` + N_totalQuadri + `.<br>`);



    //question 4
    let Ntotal_oiseaux = lstNombresAnimaux[3];
     texte_corr += num_alpha(3) + ` L'effectif total des oiseaux est : ` + lstNombresAnimaux[3] ;
    for (let i = 4; i < nbAnimaux; i++) {
      texte_corr += ` + ` + lstNombresAnimaux[i];
      Ntotal_oiseaux += lstNombresAnimaux[i];
    } 
    texte_corr += ` = `+ Ntotal_oiseaux + `. `
    texte_corr += ` L'effectif total des animaux est : ` + Ntotal + `. <br>`;
    texte_corr += ` La fréquence (ou la proportion) d'oiseaux est : $ ` + tex_fraction_signe(Ntotal_oiseaux, Ntotal) + `$ `;
    // test de l'arrondi
    if (calcul(Ntotal_oiseaux/Ntotal) == arrondi(Ntotal_oiseaux/Ntotal,3)) {
      texte_corr += `= `;
    } else 
    {
      texte_corr += `$\\approx $ `;
    }
    texte_corr += arrondi_virgule(Ntotal_oiseaux/Ntotal,3) + `. <br>`;
    texte_corr += texte_gras(`La fréquence des oiseaux est donc : ` + arrondi_virgule(100*Ntotal_oiseaux/Ntotal,1) + `%. <br>`);

    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);

    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  this.besoin_formulaire_numerique = [`Nombre d'espèces différentes`, 3, ` choix 1 : 5 espèces\n choix 2 : 6 espèces\n choix 3 : 7 espèces`];
} // Fin de l'exercice.
  