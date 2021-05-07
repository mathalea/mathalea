import Exercice from '../ClasseExercice.js';
import {randint,listeQuestionsToContenu,choice,premiereLettreEnMajuscule,numAlpha,texFractionSigne,calcul,arrondi,arrondiVirgule, texte_gras} from '../../modules/outils.js';
import {repere2,traceBarre,mathalea2d} from '../../modules/2d.js';

export const titre = 'Calculer des effectifs et des fréquences'

/**
* Calculer des effectifs et des fréquences.
* @auteur Erwan DUPLESSY
* 3S12
* 2021-02-07
*/

export default function calcul_Effectif_Frequence() {
    "use strict"
    Exercice.call(this)
    this.titre = titre;
    this.consigne = `Répondre aux questions à l'aide du graphique et de calculs.`;
    this.nbQuestions = 4; // Ici le nombre de questions
    this.nbQuestionsModifiable=false; // Active le formulaire nombre de questions
    this.nbCols = 2; // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 2;// Le nombre de colonne pour la correction LaTeX
    this.tailleDiaporama = 50;
    this.pasDeVersionLatex=false; // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.pas_de_version_HMTL=false; // mettre à true si on ne veut pas de l'exercice en ligne
    this.video = "https://youtu.be/GWDDay-mdVA"; // Id YouTube ou url
    this.correctionDetailleeDisponible=false;
  // Voir la Classe Exercice pour une liste exhaustive des propriétés disponibles.
  
   this.sup = 1; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre
  //  this.sup3 = false; // A décommenter : valeur par défaut d'un troisième paramètre
  
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
    this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
  
    this.listeQuestions = []; // tableau contenant la liste des questions 
    this.listeCorrections = [];
    //let listeTypeDeQuestions_disponibles= [];
    let lstQuadri = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
    let lstOiseaux = ['hérons', 'marabouts', 'flamants roses', 'cigognes', 'grues', 'vautours'];
    let nbAnimaux = 4 + parseInt(this.sup); // nombre d'animaux différents dans l'énoncé (entre 5 et 7)
    let nbQuadri = 3 ;
    let lstAnimauxExo = []; //liste des animaux uniquement cités dans l'exercice
    let lstNombresAnimaux = []; // liste des effectifs de chaque animal
    let lstVal = []; // liste des valeurs à éviter pour les effectifs
    let N = 0, nom=``, texte=``, texteCorr=``;
  
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
    texte += numAlpha(0) + ` Quel est l'effectif des ` + lstAnimauxExo[0] + ` ?<br>`;
    texte += numAlpha(1) + ` Calculer la fréquence des ` + lstAnimauxExo[1] + ` ? Donner le résultat sous la forme d'un pourcentage.<br>`;
    texte += numAlpha(2) + ` Calculer l'effectif des quadripèdes ? <br>`;
    texte += numAlpha(3) + ` Calculer la fréquence des oiseaux ? Donner le résultat sous la forme d'un pourcentage.<br>`;

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
      lstElementGraph.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiereLettreEnMajuscule(lstAnimauxExo[i]), { unite: 1 / coef }));
    }
    texte += mathalea2d({ xmin: -5, xmax: 11, ymin: -4, ymax: 11, pixelsParCm: 30, scale: 1 }, r, lstElementGraph);

//début de la correction
    //question 1    
    texteCorr += numAlpha(0) + texte_gras(` D'après le graphique, il y a ` + lstNombresAnimaux[0] + ` ` + lstAnimauxExo[0] + `. <br>`);
    //question 2
    let Ntotal = lstNombresAnimaux[0];
     texteCorr += numAlpha(1) + ` L'effectif total des animaux est : ` + lstNombresAnimaux[0] ;
    for (let i = 1; i < nbAnimaux; i++) {
      texteCorr += ` + ` + lstNombresAnimaux[i];
      Ntotal += lstNombresAnimaux[i];
    } 
    
    texteCorr += ` = `+ Ntotal + `. `
    texteCorr += ` D'après le graphique, il y a ` + lstNombresAnimaux[1] + ` ` + lstAnimauxExo[1] + `. <br>`;
    texteCorr += ` La fréquence (ou la proportion) de  ` + lstAnimauxExo[1] + ` est : $ ` + texFractionSigne(lstNombresAnimaux[1], Ntotal) + `$ `;
    // test de l'arrondi
    if (calcul(lstNombresAnimaux[1]/Ntotal) == arrondi(lstNombresAnimaux[1]/Ntotal,3)) {
      texteCorr += `= `;
    } else 
    {
      texteCorr += `$\\approx $ `;
    }
    texteCorr += arrondiVirgule(lstNombresAnimaux[1]/Ntotal,3) + `. <br>`;
    texteCorr += texte_gras(`La fréquence des ` + lstAnimauxExo[1] + ` est donc : ` + arrondiVirgule(100*lstNombresAnimaux[1]/Ntotal,1) + `%. <br>`);

    //question 3
    texteCorr += numAlpha(2) + ` On fait la somme des effectifs de chaque espèce de quadripèdes : `
    let N_totalQuadri = lstNombresAnimaux[0];
     texteCorr += lstNombresAnimaux[0] ;
    for (let i = 1; i < nbQuadri; i++) {
      texteCorr += ` + ` + lstNombresAnimaux[i];
      N_totalQuadri += lstNombresAnimaux[i];
    } 
    texteCorr += `. <br>`
    texteCorr += texte_gras(`L'effectif des quadripèdes est donc : ` + N_totalQuadri + `.<br>`);



    //question 4
    let Ntotal_oiseaux = lstNombresAnimaux[3];
     texteCorr += numAlpha(3) + ` L'effectif total des oiseaux est : ` + lstNombresAnimaux[3] ;
    for (let i = 4; i < nbAnimaux; i++) {
      texteCorr += ` + ` + lstNombresAnimaux[i];
      Ntotal_oiseaux += lstNombresAnimaux[i];
    } 
    texteCorr += ` = `+ Ntotal_oiseaux + `. `
    texteCorr += ` L'effectif total des animaux est : ` + Ntotal + `. <br>`;
    texteCorr += ` La fréquence (ou la proportion) d'oiseaux est : $ ` + texFractionSigne(Ntotal_oiseaux, Ntotal) + `$ `;
    // test de l'arrondi
    if (calcul(Ntotal_oiseaux/Ntotal) == arrondi(Ntotal_oiseaux/Ntotal,3)) {
      texteCorr += `= `;
    } else 
    {
      texteCorr += `$\\approx $ `;
    }
    texteCorr += arrondiVirgule(Ntotal_oiseaux/Ntotal,3) + `. <br>`;
    texteCorr += texte_gras(`La fréquence des oiseaux est donc : ` + arrondiVirgule(100*Ntotal_oiseaux/Ntotal,1) + `%. <br>`);

    this.listeQuestions.push(texte);
    this.listeCorrections.push(texteCorr);

    listeQuestionsToContenu(this); // On envoie l'exercice à la fonction de mise en page
  };
  this.besoinFormulaireNumerique = [`Nombre d'espèces différentes`, 3, ` choix 1 : 5 espèces\n choix 2 : 6 espèces\n choix 3 : 7 espèces`];
} // Fin de l'exercice.
  