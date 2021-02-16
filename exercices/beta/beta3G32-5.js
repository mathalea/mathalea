import Exercice from '../ClasseExercice.js';
import { tex_fraction_reduite, tex_nombre, calcul,liste_de_question_to_contenu, combinaison_listes, randint, arrondi } from "/modules/outils.js"
import { mathalea2d, point, droite, droiteVerticaleParPoint, cercle, pointIntersectionLC, polygone, projectionOrtho, segment, codageAngleDroit, labelPoint, longueur } from "/modules/2d.js"

export default function CalculsTrigo() {
    Exercice.call(this)
    this.titre = "Problème trigonométrique - Triangle rectangle inscrit dans un triangle rectangle";
    this.nb_questions = 1;
    this.nb_questions_modifiable = false;
    this.nb_cols = 1;
    this.nb_cols_corr = 1;
    this.spacing_corr = 3;

    this.nouvelle_version = function () {

        this.liste_questions = [] // tableau contenant la liste des questions 
        this.liste_corrections = []

        let objets_enonce = [], objets_correction = [], params_enonce = {}, params_correction = {}, texte = '', texte_corr = '';

        let AD = randint(5,9)
        let AE = randint(AD+1,AD+4)
        let AC = randint(3,AD-1)
        let A = point(0,0,'A','below left')
        let C = point(AC,0,'C','below')
        let D = point(AD,0,'D','below right')
        let dDE = droiteVerticaleParPoint(D)
        let cAE = cercle(A,AE)
        let E = pointIntersectionLC(dDE,cAE,'E')
        E.positionLabel = 'right'
        let p = polygone(A,D,E)
        let dAE = droite(A,E)
        let B = projectionOrtho(C,dAE,'B','above left')
        let sBC = segment(B,C)
        let codage1 = codageAngleDroit(A,B,C)
        let codage2 = codageAngleDroit(A,D,E)
        let labels = labelPoint(A,B,C,D,E)

        objets_enonce = [p, sBC, codage1, codage2, labels]
        objets_correction = [p, sBC, codage1, codage2, labels]
        params_enonce = { xmin: -1, ymin: -1, xmax:D.x+1.5, ymax: E.y+1.5 , pixelsParCm: 20, scale: 1, mainlevee: false }
        params_correction = { xmin: -1, ymin: -1, xmax:D.x+1.5, ymax: E.y+1.5 , pixelsParCm: 20, scale: 1, mainlevee: false }
        texte += mathalea2d(params_enonce, objets_enonce)
        texte += `<br><br> $${A.nom+E.nom} = ${AE}~\\text{cm}$, $${A.nom+D.nom} = ${AD}~\\text{cm}$ et $${A.nom+C.nom} = ${AC}~\\text{cm}$.`
        texte += `<br> Calculer la longueur $${A.nom+B.nom}$. Donner une valeur exacte et une valeur approchée au millimètre près.`
        texte_corr += mathalea2d(params_correction, objets_correction)
        texte_corr += `<br><br>Dans le triangle $${A.nom+D.nom+E.nom}$ rectangle en $${D.nom}$ : `
        texte_corr += `<br>$\\cos(\\widehat{${D.nom+A.nom+E.nom}})=\\dfrac{${A.nom+D.nom}}{${A.nom+E.nom}}\\quad$ soit $\\quad\\cos(\\widehat{${D.nom+A.nom+E.nom}})=\\dfrac{${AD}}{${AE}}$,`
        texte_corr += `<br> d'où $\\widehat{${D.nom+A.nom+E.nom}}=\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)$`


        texte_corr += `<br><br>Dans le triangle $${A.nom+B.nom+C.nom}$ rectangle en $${B.nom}$ : `
        texte_corr += `<br>$\\cos(\\widehat{${B.nom+A.nom+C.nom}})=\\dfrac{${A.nom+B.nom}}{${A.nom+C.nom}}\\quad$ soit $\\quad\\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=\\dfrac{${A.nom+B.nom}}{${AC}}$,`
        texte_corr += `<br> d'où $${A.nom+B.nom} = ${AC} \\times \\cos\\left(\\text{arccos}\\left(\\dfrac{${AD}}{${AE}}\\right)\\right)=${AC}\\times\\dfrac{${AD}}{${AE}}=${tex_fraction_reduite(AC*AD,AE)}\\approx${tex_nombre(arrondi(longueur(A,B),1))}~\\text{cm}$.`
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };

}
