import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu_sans_numero,texcolors, combinaison_listes, tab_C_L, choice, randint } from "/modules/outils.js"
import { mathalea2d,arc,point,rotation,motifs,tracePoint} from "/modules/2d.js"

/**
 * @Auteur Jean-Claude Lhote
 * 
 */
export default function Construire_Un_Diagramme() {
    "use strict"
    Exercice.call(this)
    this.titre = "Représenter des données par un diagramme";
    this.nb_questions = 1;
    this.nb_questions_modifiable = false
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.pas_de_version_LaTeX = false
    this.pas_de_version_HMTL = false
    this.sup = 1;
    this.sup2 = 1;
    //  this.sup3 = false;
    this.nouvelle_version = function () {
        this.liste_questions = []
        this.liste_corrections = []
        let type_de_questions_disponibles = [1]
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
        let N = 0, nom, texte, texte_corr, reponseinf, reponsesup;
        let nbAnimaux = 4; // nombre d'animaux différents dans l'énoncé
        let lstAnimauxExo = []; //liste des animaux uniquement cités dans l'exercice
        let lstNombresAnimaux = []; // liste des effectifs de chaque animal
        let lstVal = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // liste des valeurs à éviter pour les effectifs

        let objets_enonce, objets_enonceml, objets_correction, params_enonce, params_correction
        let lstAnimaux = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
        let lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
            'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane'];

        texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d’animaux. Voici un tableau qui donne le nombre d’individus de quelques espèces.<br>';
        texte_corr=''
        let entete = ['\\text{Animaux}']
        switch (parseInt(this.sup)) {
            case 1: nbAnimaux = 4; break;
            case 2: nbAnimaux = 5; break;
            case 3: nbAnimaux = 6; break;
            default: nbAnimaux = 4;
        }
        switch (parseInt(this.sup2)) {
            case 1:
                for (let i = 0; i < nbAnimaux; i++) {
                    N = randint(2, 100, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
                    lstNombresAnimaux.push(N);
                    lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
                }
                break;
            case 2:
                for (let i = 0; i < nbAnimaux; i++) {
                    N = randint(2, 100, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
                    lstNombresAnimaux.push(10 * N);
                    lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
                }
                break;
        }
        for (let i = 0; i < nbAnimaux; i++) {
            nom = choice(lstAnimaux, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
            lstAnimauxExo.push(nom);
            entete.push(`\\text{${nom}}`)
        }
        texte += `${tab_C_L(entete, ['\\text{Effectifs}'], lstNombresAnimaux)}<br>`
        texte+=`Représenter ces données par un diagramme semi-circulaire.<br>`

        objets_enonce = []
        objets_correction = []
        let effectiftotal=0
        for (let i=0;i<nbAnimaux;i++){
            effectiftotal+=lstNombresAnimaux[i]
        }
        let A=point(0,0)
        let B=point(6,0)
        let a0=arc(B,A,180,true,'white','black')
        objets_enonce.push(a0)
        objets_correction.push(a0)
        let alpha=0;
        let angle,a
        let t=tracePoint(A)
        t.style='+'
        objets_enonce.push(t)
        objets_correction.push(t)
        for (let i=0;i<nbAnimaux;i++){
            angle=180*lstNombresAnimaux[i]/effectiftotal
            a=arc(rotation(B,A,alpha),A,angle,true,texcolors(i+1),'black',0.3)
            a.hachures=motifs(i)
            objets_correction.push(a)
            alpha+=angle
        }

         params_enonce = { xmin:-6.5, ymin: -0.5, xmax: 6.5, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false}
        params_correction = { xmin:-6.5, ymin: -0.5, xmax: 6.5, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false}
        texte += mathalea2d(params_enonce, objets_enonce)
        texte_corr += mathalea2d(params_correction, objets_correction)
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu_sans_numero(this); // On envoie l'exercice à la fonction de mise en page
    };
    this.besoin_formulaire_numerique = [`Nombre d'espèces différentes`, 3, ` choix 1 : 4 espèces\n choix 2 : 5 espèces\n choix 3 : 6 espèces`];
    this.besoin_formulaire2_numerique = [`Valeurs numériques`, 2, ` choix 1 : entre 1 et 100\n choix 2 : entre 100 et 1 000`];
    // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

}
