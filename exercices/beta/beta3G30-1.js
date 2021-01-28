import Exercice from '../ClasseExercice.js';
import { mathalea2d, point, similitude, longueur, polygone,rotation, codageAngleDroit, nommePolygone, segment, codeAngle, texteSurSegment  } from "/modules/2d.js";
import { liste_de_question_to_contenu, randint, creerNomDePolygone } from "/modules/outils.js";

export default function Exercice_zero_mathalea2d() {
    Exercice.call(this)
    this.titre = "Exprimer le cosinus, le sinus ou la tangente d'un angle en fonction des côtés du triangle";
    this.nb_questions = 1; 
    this.nb_questions_modifiable = false;
    this.nb_cols = 1; 
    this.nb_cols_corr = 2;
    this.sup = 1
    if (sortie_html){
        this.spacing = 4;
        this.spacing_corr = 4;
    } else {
        this.spacing = 2;
        this.spacing_corr = 2;
    }

    this.nouvelle_version = function () {
    this.liste_questions = [] 
    this.liste_corrections = []
  
  
    let texte = '', texte_corr = '', objets_enonce = [], objets_correction = [];

    let a = point (0,0)
    let b = point(randint(3,9),0)
    let c = similitude(b,a,90,randint(3,9)/longueur(a,b))
    let p1 = polygone(a,b,c) 
    //p1.isVisible = false
    let p2 = rotation(p1,a,randint(0,360))
    let A = p2.listePoints[0]
    let B = p2.listePoints[1]
    let C = p2.listePoints[2]
    let codage = codageAngleDroit(B,A,C)
    let nom = creerNomDePolygone(3)
    A.nom = nom[0], B.nom = nom[1], C.nom = nom[2];
    let nomme = nommePolygone(p2, nom)
    let t1 = texteSurSegment('hypoténuse',C,B)
    let t2 = texteSurSegment("adjacent",B,A)
    let t3 = texteSurSegment("opposé",A,C)
    let t22 = texteSurSegment("opposé",B,A)
    let t32 = texteSurSegment("adjacent",A,C)
    let hypo = segment(C,B)
    hypo.epaisseur = 2
    hypo.color = 'blue'
    let codageAngle = codeAngle(A,B,C,1.5,'','red')
    codageAngle.epaisseur = 3
    let codageAngle2 = codeAngle(A,C,B,1.5,'','red')
    codageAngle2.epaisseur = 3

    objets_enonce.push(p2, codage, nomme)
    objets_correction.push(p2, codage, nomme, t1, t2, t3, hypo, codageAngle)

    let params_enonce = { xmin : Math.min(A.x,B.x,C.x)-1, ymin : Math.min(A.y,B.y,C.y)-1, xmax : Math.max(A.x,B.x,C.x)+1, ymax : Math.max(A.y,B.y,C.y)+1, pixelsParCm: 20, scale: .5, mainlevee: false}
    let params_correction = { xmin : Math.min(A.x,B.x,C.x)-1, ymin : Math.min(A.y,B.y,C.y)-1, xmax : Math.max(A.x,B.x,C.x)+1, ymax : Math.max(A.y,B.y,C.y)+1, pixelsParCm: 20, scale: .5, mainlevee: false}
    if (!sortie_html){
        texte += '\\begin{minipage}{.4\\linewidth}\n'
    }
    texte += mathalea2d(params_enonce, objets_enonce)+'<br>'
    if (!sortie_html){
        texte += '\n\\end{minipage}\n'
        texte += '\\begin{minipage}{.6\\linewidth}\n'
    }
    if (this.sup == 1) {
        texte += `Compléter à l'aide des longueurs $${A.nom+B.nom}$, $${A.nom+C.nom}$, $${B.nom+C.nom}$ : ` 
        texte += `<br>$\\cos\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=$`
        texte += `<br>$\\sin\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=$`
        texte += `<br>$\\tan\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=$`
    } else {
        texte += `Écrire les 6 rapports trigonométriques pour ce triangle.` 
    }
    if (!sortie_html){
        texte += '\n\\end{minipage}\n'
    }
    texte_corr += mathalea2d(params_correction, objets_correction)
    if (this.sup == 2) {
        let objets_correction2 = [p2, codage, nomme, t1, t22, t32, hypo, codageAngle2]
        texte_corr += mathalea2d(params_correction, objets_correction2)
    }
    texte_corr += `<br>$${nom}$ est rectangle en $${A.nom}$ donc :`
    texte_corr += `<br>$\\cos\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${B.nom+C.nom}}$ ;`
    texte_corr += `<br>$\\sin\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${B.nom+C.nom}}$ ;`
    texte_corr += `<br>$\\tan\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${A.nom+B.nom}}$.`
    if (this.sup == 2) {
        texte_corr += `<br>$\\cos\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\sin\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\tan\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${A.nom+C.nom}}$.`
    }
    
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  
    this.besoin_formulaire_numerique = ['Type de questions',2,'1 : Compléter 3 rapports trigonométriques\n2 : Donner les 6 rapports trigonométriques'];
}  