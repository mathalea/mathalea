import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, tex_nombrec } from "/modules/outils.js"
import { tracePoint, labelPoint, afficheMesureAngle, codageAngleDroit, mathalea2d } from '../../modules/2d.js';
import { point3d, vecteur3d, sphere3d, arete3d, rotationV3d, demicercle3d } from "/modules/3d.js"

/**
 * propose de calculer la longueur d'un parallèle terrestre à partir de la latitde
 * @Auteur Jean-Claude Lhote
 * Référence 3G32-1 
*/
export default function Calculs_trigonometriques1() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Calcul d'un parallèle terrestre";
    this.consigne = "";
    this.nb_questions = 1;
    this.nb_cols = 1; // Uniquement pour la sortie LaTeX
    this.nb_cols_corr = 1; // Uniquement pour la sortie LaTeX
    this.tailleDiaporama = 100; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
    this.video = "" // Id YouTube ou url
    this.spacing_corr = 2
    this.spacing = 2
    this.QCM_disponible=false
	this.ModeQCM=false;

    this.nouvelle_version = function () {
        this.QCM=['3G32-1',[],"Calcul d'un parallèle terrestre",3,{}]
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let alfa, baita, alpha, O, H, M, R, R2, Axe, normalV, normalH, P, HP, Sph, OP, PoleNord, PoleSud, objets = []
        if (sortie_html) {
            alfa = 'α'
            baita = 'β'
        }
        else {
            alfa = '\\alpha'
            baita = '\\beta'
        }

        for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
            // Boucle principale où i+1 correspond au numéro de la question

            objets = []
            alpha = randint(30, 60)
            O = point3d(0, 0, 0, false, 'O')
            M = point3d(5, 0, 0, true, 'M')
            PoleNord = point3d(0, 0, 5, false, 'N')
            PoleSud = point3d(0, 0, -5, false, 'S')
            R = vecteur3d(O, M)
            Axe = arete3d(PoleSud, PoleNord)
            normalV = vecteur3d(0, 0, 1)
            M = rotationV3d(M, normalV, mathalea.anglePerspective)
            M.p2d.nom = 'M'
            normalH = rotationV3d(R, normalV, 90)
            P = rotationV3d(M, normalH, -alpha)
            P.p2d.nom = 'P'
            H = point3d(0, 0, P.z3d, false)
            R2 = vecteur3d(H, P)
            H.p2d.nom = 'H'
            Sph = sphere3d(O, 5, 1, 3)
            HP = arete3d(H, P)
            OP = arete3d(O, P)
            objets.push(Sph, Axe.p2d, HP.p2d, OP.p2d, codageAngleDroit(P.p2d, H.p2d, O.p2d), tracePoint(H.p2d, P.p2d, O.p2d, M.p2d), labelPoint(H.p2d, P.p2d, O.p2d, M.p2d))
            objets.push(demicercle3d(H, normalV, R2, 'caché', 'red', 0), demicercle3d(H, normalV, R2, 'visible', 'red', 0))
            objets.push(arete3d(O, M).p2d)
            objets.push(afficheMesureAngle(M.p2d, O.p2d, P.p2d, 'black', 1.5, `${alpha}`))
            texte = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
            texte += `Quelle est la longueur du $${alpha}$e parallèle Nord ?`
            texte_corr = mathalea2d({ xmin: -8, ymin: -6, xmax: 8, ymax: 6, pixelsParCm: 20, scale: 0.5 }, objets) + '<br>'
            texte_corr += `Considérons que le $${alpha}$e parallèle Nord est un cercle. Soit $H$ le centre de ce cercle situé sur l'axe de rotation de la terre.<br>`
            texte_corr += `Les segments $[HP]$ et $[OM]$ sont parallèles, donc les angles alternes-internes $\\widehat{MOP}$ et $\\widehat{OPH}$ sont égaux.<br>`
            texte_corr += `Dans le triangle $OPH$ rectangle en $H$, $\\cos(\\widehat{OPH})=\\dfrac{HP}{OP}$ d'où $HP=OP\\times \\cos(\\widehat{OPH})$.<br>`
            texte_corr += `Le rayon de la terre étant approximativement de $6400$ km, nous pouvons calculer $HP$ :<br>`
            texte_corr += `$HP=6400\\times \\cos(${alpha})\\approx ${tex_nombrec(6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`
            texte_corr += `Calculons maintenant la longueur $L$ du $${alpha}$e parallèle : $L\\approx 2\\times \\pi\\times ${tex_nombrec(6400 * Math.cos(alpha * Math.PI / 180))}\\approx ${tex_nombrec(2 * Math.PI * 6400 * Math.cos(alpha * Math.PI / 180))}$ km.<br>`

            if (this.liste_questions.indexOf(texte) == -1) {
                // Si la question n'a jamais été posée, on en crée une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
                this.QCM[1].push([texte,[texte_corr],[3]])
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
}

// python3 list-to-js.py pour faire apparaitre l'exercice dans le menu

