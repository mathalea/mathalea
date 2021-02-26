import Exercice from '../ClasseExercice.js';
import { premiere_lettre_en_majuscule, liste_de_question_to_contenu_sans_numero, texcolors, arrondi_virgule, tex_fraction, combinaison_listes, tab_C_L, choice, randint } from "/modules/outils.js"
import {traceGraphiqueCartesien,segment, mathalea2d, arc, point, rotation, motifs, tracePoint, vecteur, translation, carre, texteParPosition, repere2, traceBarre,cercleCentrePoint } from "/modules/2d.js"

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
    this.sup3 = 1;

    //  this.sup3 = false;
    this.nouvelle_version = function () {
        this.liste_questions = []
        this.liste_corrections = []
        let type_de_questions_disponibles
        if (this.sup3 < 5) {
            type_de_questions_disponibles = [parseInt(this.sup3)]
        }
        else {
            type_de_questions_disponibles = [randint(1, 4)]
        }
        let liste_hachures_disponibles = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10]
        let liste_motifs = combinaison_listes(liste_hachures_disponibles, 4)
        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
        let N = 0, nom, texte, texte_corr;
        let nbAnimaux = 4; // nombre d'animaux différents dans l'énoncé
        let lstAnimauxExo = []; //liste des animaux uniquement cités dans l'exercice
        let lstNombresAnimaux = []; // liste des effectifs de chaque animal
        let lstVal = [10, 20]; // liste des valeurs à éviter pour les effectifs

        let objets_enonce, objets_correction, params_enonce, params_correction,coef,r,lstElementGraph,g
        let lstAnimaux = ['girafes', 'zèbres', 'gnous', 'buffles', 'gazelles', 'crocodiles', 'rhinocéros', 'léopards', 'guépards', 'hyènes', 'lycaons', 'servals', 'phacochères'];
        let lstNomParc = ['Dramve', 'Fatenmin', 'Batderfa', 'Vihi', 'Genser', 'Barbetdou', 'Dramrendu', 'Secai', 'Cipeudram', 'Cigel', 'Lisino', 'Fohenlan',
            'Farnfoss', 'Kinecardine', 'Zeffari', 'Barmwich', 'Swadlincote', 'Swordbreak', 'Loshull', 'Ruyron', 'Fluasall', 'Blueross', 'Vlane'];

        texte = 'Dans le parc naturel de ' + choice(lstNomParc) + ', il y a beaucoup d’animaux. Voici un tableau qui donne le nombre d’individus de quelques espèces.<br><br>';
        texte_corr = ''
        let entete = ['\\text{Animaux}']
        let contenutableau,A,B,T,angle, a, legende, textelegende, hachures,a0,t,alpha
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
        let effectiftotal = 0
        for (let i = 0; i < nbAnimaux; i++) {
            effectiftotal += lstNombresAnimaux[i]
        }
        for (let i = 0; i < nbAnimaux; i++) {
            nom = choice(lstAnimaux, lstAnimauxExo); // choisit un animal au hasard sauf parmi ceux déjà utilisés
            lstAnimauxExo.push(nom);
            entete.push(`\\text{${nom}}`)
        }
        texte += `${tab_C_L(entete, ['\\text{Effectifs}'], lstNombresAnimaux)}<br><br>`
        objets_enonce = []
        objets_correction = []

        switch (liste_type_de_questions[0]) {
            case 1:
                texte += `Représenter ces données par un diagramme circulaire.<br><br>`
                entete.push('\\text{Totaux}')
                contenutableau = []
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(lstNombresAnimaux[i])
                }
                contenutableau.push(effectiftotal)
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(tex_fraction(lstNombresAnimaux[i], effectiftotal) + '\\approx ' + arrondi_virgule(lstNombresAnimaux[i] / effectiftotal, 2))
                }
                contenutableau.push('1')
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(`${tex_fraction(lstNombresAnimaux[i], effectiftotal)} \\times 360 \\approx ${Math.round(lstNombresAnimaux[i] * 360 / effectiftotal)}\\degree`)
                }
                contenutableau.push(`360\\degree`)

                texte_corr += `${tab_C_L(entete, ['\\text{Éffectifs}', '\\text{Fréquences}', '\\text{Angles}'], contenutableau, 3)}<br>`

                A = point(0, 0)
                B = point(6, 0)
                T = point(7, 0)
                a0 = cercleCentrePoint(A, B,'black')
                objets_enonce.push(a0)
                objets_correction.push(a0)
                alpha = 0;

                t = tracePoint(A)
                t.style = '+'
                objets_enonce.push(t)
                objets_correction.push(t)

                for (let i = 0; i < nbAnimaux; i++) {
                    angle = 360 * lstNombresAnimaux[i] / effectiftotal
                    a = arc(rotation(B, A, alpha), A, angle, true, texcolors(i + 1), 'black', 0.7)
                    hachures = motifs(liste_motifs[i])
                    a.hachures = hachures
                    a.couleurDeRemplissage=texcolors(i + 1)
                    a.couleurDesHachures=a.couleurDeRemplissage
                    objets_correction.push(a)
                    alpha += angle
                    legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
                    legende.couleurDeRemplissage = a.couleurDeRemplissage
                    legende.couleurDesHachures = a.couleurDesHachures
                    legende.hachures = hachures
                    legende.opaciteDeRemplissage = 0.7
                    textelegende = texteParPosition(lstAnimauxExo[i], 8.5, i * 1.5 + .5, 0, 'black', 1.5, 'gauche', false)
                    objets_correction.push(legende, textelegende)
                    params_enonce = { xmin: -6.5, ymin: -6.5, xmax: 6.5, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false }
                    params_correction = { xmin: -6.5, ymin: -6.5, xmax: 20, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false }

                }
                break
            case 2:
                texte += `Représenter ces données par un diagramme semi-circulaire.<br><br>`
                entete.push('\\text{Totaux}')
                contenutableau = []
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(lstNombresAnimaux[i])
                }
                contenutableau.push(effectiftotal)
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(tex_fraction(lstNombresAnimaux[i], effectiftotal) + '\\approx ' + arrondi_virgule(lstNombresAnimaux[i] / effectiftotal, 2))
                }
                contenutableau.push('1')
                for (let i = 0; i < nbAnimaux; i++) {
                    contenutableau.push(`${tex_fraction(lstNombresAnimaux[i], effectiftotal)} \\times 180 \\approx ${Math.round(lstNombresAnimaux[i] * 180 / effectiftotal)}\\degree`)
                }
                contenutableau.push(`180\\degree`)

                texte_corr += `${tab_C_L(entete, ['\\text{Éffectifs}', '\\text{Fréquences}', '\\text{Angles}'], contenutableau, 3)}<br>`

                A = point(0, 0)
                B = point(6, 0)
                T = point(7, 0)
                a0 = arc(B, A, 180, true, 'white', 'black')
                objets_enonce.push(a0)
                objets_correction.push(a0)
                alpha = 0;
                angle, a, legende, textelegende, hachures
                t = tracePoint(A)
                t.style = '+'
                objets_enonce.push(t)
                objets_correction.push(t)

                for (let i = 0; i < nbAnimaux; i++) {
                    angle = 180 * lstNombresAnimaux[i] / effectiftotal
                    a = arc(rotation(B, A, alpha), A, angle, true, texcolors(i + 1), 'black', 0.7)
                    hachures = motifs(liste_motifs[i])
                    a.hachures = hachures
                    a.couleurDeRemplissage=texcolors(i + 1)
                    a.couleurDesHachures=a.couleurDeRemplissage
                    objets_correction.push(a)
                    alpha += angle
                    legende = carre(translation(T, vecteur(0, 1.5 * i)), translation(T, vecteur(1, 1.5 * i)), 'black')
                    legende.couleurDeRemplissage = a.couleurDeRemplissage
                    legende.couleurDesHachures = a.couleurDesHachures
                    legende.hachures = hachures
                    legende.opaciteDeRemplissage = 0.7
                    textelegende = texteParPosition(lstAnimauxExo[i], 8.5, i * 1.5 + .5, 0, 'black', 1.5, 'gauche', false)
                    objets_correction.push(legende, textelegende)
                    params_enonce = { xmin: -6.5, ymin: -0.2, xmax: 6.5, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false }
                    params_correction = { xmin: -6.5, ymin: -0.2, xmax: 20, ymax: 6.5, pixelsParCm: 20, scale: 1, mainlevee: false }

                }
                break
            case 3:
                texte += `Représenter ces données par un diagramme en barres.<br>`
                coef = 1;
                switch (parseInt(this.sup2)) {
                    case 1:
                        coef = 1;
                        break;
                    case 2:
                        coef = 10;
                        break;
                }
                 r = repere2({
                    grilleX: false,
                    grilleY: 'pointilles',
                    xThickListe: [],
                    xLabelListe: [],
                    yUnite: .1 / coef,
                    yThickDistance: 10 * coef,
                    yMax: 60 * coef,
                    xMin: 0,
                    xMax: 10,
                    yMin: 0,
                    axeXStyle: '',
                    yLegende: "Nombre d'individus"
                });

                 lstElementGraph = []
                for (let i = 0; i < nbAnimaux; i++) {
                    objets_correction.push(traceBarre((((r.xMax - r.xMin) / (nbAnimaux + 1)) * (i + 1)), lstNombresAnimaux[i], premiere_lettre_en_majuscule(lstAnimauxExo[i]), { unite: .1 / coef,couleurDeRemplissage:texcolors(i+1),hachures:"north east lines" }))
                }
                objets_correction.push(r)
                params_enonce = { xmin: -6.5, ymin: 0, xmax: 6.5, ymax: 0, pixelsParCm: 20, scale: 1, mainlevee: false }
                params_correction = { xmin: -6.5, ymin: -3, xmax: 20, ymax: 7, pixelsParCm: 20, scale: 1, mainlevee: false }

                break

            case 4:
                texte += `Représenter ces données par un graphique cartésien.<br>`
                coef = 1;
                switch (parseInt(this.sup2)) {
                    case 1:
                        coef = 1;
                        break;
                    case 2:
                        coef = 10;
                        break;
                }
                r = repere2({
                    grilleX: false,
                    grilleY: 'pointilles',
                    xThickListe: [],
                    xLabelListe: [],
                    yUnite: .1 / coef,
                    yThickDistance: 10 * coef,
                    yMax: 60 * coef,
                    xMin: 0,
                    xMax: 10,
                    yMin: 0,
                    axeXStyle: '',
                    yLegende: "Nombre d'individus"
                });

                lstElementGraph = []
                for (let i = 0; i < nbAnimaux; i++) {
                lstElementGraph.push([(i+1)*2,lstNombresAnimaux[i]])  
                objets_correction.push(texteParPosition(lstAnimauxExo[i],(i+1)*2,-0.2,66,'black',1,'gauche')) 
                objets_correction.push(segment((i+1)*2,-0.1,(i+1)*2,0.1))
                }
                g=traceGraphiqueCartesien(lstElementGraph,r,{couleurDesPoints : 'red',
                couleurDuTrait : 'lightgray',
                styleDuTrait : '', //plein par défaut
                epaisseurDuTrait : 1,
                styleDesPoints : 'o', //croix par défaut
                tailleDesPoints : 3})
           
                objets_correction.push(r,g)

                params_enonce = { xmin: -6.5, ymin: 0, xmax: 6.5, ymax: 0, pixelsParCm: 20, scale: 1, mainlevee: false }
                params_correction = { xmin: -6.5, ymin: -3, xmax: 20, ymax: 7 , pixelsParCm: 20, scale: 1, mainlevee: false }

                break
        }
        texte += mathalea2d(params_enonce, objets_enonce)
        texte_corr += mathalea2d(params_correction, objets_correction)
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu_sans_numero(this); // On envoie l'exercice à la fonction de mise en page
    };
    this.besoin_formulaire_numerique = [`Nombre d'espèces différentes`, 3, ` 2 espèces\n 2 : 3 espèces\n 3 : 4 espèces`];
    this.besoin_formulaire2_numerique = [`Valeurs numériques`, 2, ` Entre 1 et 100\n Entre 100 et 1 000`];
    this.besoin_formulaire3_numerique = ['Type de diagramme', 5, '1 : Diagramme circulaire\n2 : Diagramme semi-circulaire\n3 : Diagramme en barres\n4 : Diagramme cartésien\n5 : Au hasard']

}
