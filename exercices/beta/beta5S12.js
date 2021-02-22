import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu_sans_numero,texcolors,arrondi_virgule,tex_fraction, combinaison_listes, tab_C_L, choice, randint } from "/modules/outils.js"
import { mathalea2d,arc,point,rotation,motifs,tracePoint,vecteur,translation,carre,texteParPosition} from "/modules/2d.js"

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
    this.sup = 3;
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
        let lstVal = [10, 20]; // liste des valeurs à éviter pour les effectifs

        let objets_enonce, objets_enonceml, objets_correction, params_enonce, params_correction
        let lstAnimaux = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
        let lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
            'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane'];

        texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d’animaux. Voici un tableau qui donne le nombre d’individus de quelques espèces.<br>';
        texte_corr=''
        let entete = ['\\text{Animaux}']
        switch (parseInt(this.sup)) {
            case 1: nbAnimaux = 2; break;
            case 2: nbAnimaux = 3; break;
            case 3: nbAnimaux = 4; break;
            default: nbAnimaux = 4;
        }
        switch (parseInt(this.sup2)) {
            case 1:
                for (let i = 0; i < nbAnimaux; i++) {
                    N = randint(10, 50, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
                    lstNombresAnimaux.push(N);
                    lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
                }
                break;
            case 2:
                for (let i = 0; i < nbAnimaux; i++) {
                    N = randint(10, 50, lstVal); // choisit un nombre entre 2 et 100 sauf dans les valeurs à éviter
                    lstNombresAnimaux.push(10 * N);
                    lstVal = lstVal.concat([N - 1, N, N + 1]); // valeurs à supprimer pour éviter des valeurs proches
                }
                break;
        }
        let effectiftotal=0
        for (let i=0;i<nbAnimaux;i++){
            effectiftotal+=lstNombresAnimaux[i]
        }
        for (let i = 0; i < nbAnimaux; i++) {
            nom = choice(lstAnimaux, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
            lstAnimauxExo.push(nom);
            entete.push(`\\text{${nom}}`)
        }
        texte += `${tab_C_L(entete, ['\\text{Effectifs}'], lstNombresAnimaux)}<br>`
        texte+=`Représenter ces données par un diagramme semi-circulaire.<br>`
        entete.push('\\text{Total}')
        let contenutableau=[]
        for (let i=0;i<nbAnimaux;i++){
            contenutableau.push(lstNombresAnimaux[i])
        }
       contenutableau.push(effectiftotal)
        for (let i=0;i<nbAnimaux;i++){
            contenutableau.push(tex_fraction(lstNombresAnimaux[i],effectiftotal)+'\\approx '+arrondi_virgule(lstNombresAnimaux[i]/effectiftotal,2))
        }
        contenutableau.push('1')
        for (let i=0;i<nbAnimaux;i++){
            contenutableau.push(`${tex_fraction(lstNombresAnimaux[i],effectiftotal)} \\times 180 \\approx ${Math.round(lstNombresAnimaux[i]*180/effectiftotal)}\\degree`)
        }
        contenutableau.push(`180\\degree`)
    
        texte_corr+=`${tab_C_L(entete, ['\\text{Éffectifs}','\\text{Fréquences}','\\text{Angles}'], contenutableau,3)}<br>`
        objets_enonce = []
        objets_correction = []

        let A=point(0,0)
        let B=point(6,0)
        let T=point(7,0)
        let a0=arc(B,A,180,true,'white','black')
        objets_enonce.push(a0)
        objets_correction.push(a0)
        let alpha=0;
        let angle,a,legende,textelegende,hachures
        let t=tracePoint(A)
        t.style='+'
        objets_enonce.push(t)
        objets_correction.push(t)
    
        for (let i=0;i<nbAnimaux;i++){
            angle=180*lstNombresAnimaux[i]/effectiftotal
            a=arc(rotation(B,A,alpha),A,angle,true,texcolors(i+1),'black',0.7)
            hachures=motifs(randint(0,10))
            a.hachures=hachures
            objets_correction.push(a)
            alpha+=angle
            legende=carre(translation(T,vecteur(0,1.5*i)),translation(T,vecteur(1,1.5*i)),'black')
            legende.couleurDeRemplissage=texcolors(i+1)
            legende.hachures=hachures
            legende.opaciteDeRemplissage=0.7
            textelegende=texteParPosition(lstAnimauxExo[i],8.5,i*1.5+.5,0,'black',1.5,'left',false)
            objets_correction.push(legende,textelegende)
        }

         params_enonce = { xmin:-6.5, ymin: -0.5, xmax: 6.5, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false}
        params_correction = { xmin:-6.5, ymin: -0.5, xmax: 20, ymax: 6.5+nbAnimaux-4, pixelsParCm: 20, scale: 1, mainlevee: false}
        texte += mathalea2d(params_enonce, objets_enonce)
        texte_corr += mathalea2d(params_correction, objets_correction)
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu_sans_numero(this); // On envoie l'exercice à la fonction de mise en page
    };
    this.besoin_formulaire_numerique = [`Nombre d'espèces différentes`, 3, ` choix 1 : 2 espèces\n choix 2 : 3 espèces\n choix 3 : 4 espèces`];
    this.besoin_formulaire2_numerique = [`Valeurs numériques`, 2, ` choix 1 : entre 1 et 100\n choix 2 : entre 100 et 1 000`];
    // this.besoin_formulaire3_case_a_cocher =['figure à main levée',true]

}
