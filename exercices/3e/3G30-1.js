import Exercice from '../ClasseExercice.js';
import { mathalea2d, point, similitude, longueur, polygone,rotation, codageAngleDroit, nommePolygone, segment, codeAngle, texteSurSegment, droite, projectionOrtho, pointSurSegment, texteParPoint, afficheMesureAngle  } from "/modules/2d.js";
import { liste_de_question_to_contenu, randint, creerNomDePolygone, choice } from "/modules/outils.js";


/**
 * @auteur Rémi Angot
 * 3G30-1
 * Donner un rapport trigonométriques en fonctions des longueurs des côtés (pas de valeurs numériques)
 * * Donner les 3 rapports d'un angle
 * * Un triangle est donné, on demande les 6 rapports
 * * Un triangle rectangle et une hauteur, il faut exprimer un rapport de deux manières différentes
 *
 * janvier 2021
 */
export default function Mon_Exercice() {
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
  
  
    let texte = '', texte_corr = '', objets_enonce = [], objets_correction = [], choix_rapport_trigo;

    let a = point (0,0)
    let b = point(randint(3,7),0)
    let c = similitude(b,a,90,randint(3,7)/longueur(a,b))
    let p1 = polygone(a,b,c) 
    //p1.isVisible = false
    let p2 = rotation(p1,a,randint(0,360))
    let A = p2.listePoints[0]
    let B = p2.listePoints[1]
    let C = p2.listePoints[2]
    let codage = codageAngleDroit(B,A,C)
    let nom = creerNomDePolygone(4)
    A.nom = nom[0], B.nom = nom[1], C.nom = nom[2];
    let nomme = nommePolygone(p2, nom)
    let t1 = texteSurSegment('hypoténuse',C,B)
    let t2, t3, t22, t32, codageAngle, codageAngle2;
    if (sortie_html) {
        t2 = texteSurSegment("adjacent à ⍺",B,A)
        t3 = texteSurSegment("opposé à ⍺",A,C)
        t22 = texteSurSegment("opposé à 𝛽",B,A)
        t32 = texteSurSegment("adjacent à 𝛽",A,C)
        codageAngle = afficheMesureAngle(A,B,C,'red',1.5,'⍺')
        codageAngle2 = afficheMesureAngle(A,C,B,'red',1.5,'𝛽')
    } else {
        t2 = texteSurSegment("adjacent à $\\alpha$",B,A)
        t3 = texteSurSegment("opposé à $\\alpha$",A,C)
        t22 = texteSurSegment("opposé à $\\beta$",B,A)
        t32 = texteSurSegment("adjacent à $\\beta$",A,C)
        codageAngle = afficheMesureAngle(A,B,C,'red',1.5,'$\\alpha$')
        codageAngle2 = afficheMesureAngle(A,C,B,'red',1.5,'$\\beta$')
    }
    let hypo = segment(C,B)
    hypo.epaisseur = 2
    hypo.color = 'blue'
    codageAngle.epaisseur = 3
    codageAngle2.epaisseur = 3
    let d = droite(B,C)
    d.isVisible = false
    let H = projectionOrtho(A,d)
    H.nom = 'H'
    let pointNomH = pointSurSegment(H,A,-.5)
    let codage2 = codageAngleDroit(A,H,B)
    H.nom = nom[3];
    let t4 = texteParPoint(H.nom,pointNomH)
    let sAH = segment(A,H)
    let sAB = segment(A,B)
    let t13 = texteSurSegment('hypoténuse',B,A)
    let t23 = texteSurSegment("opposé à ⍺",A,H)
    let t33 = texteSurSegment("adjacent à ⍺",H,B)
    let hypo3 = segment(A,B)
    hypo3.epaisseur = 2
    hypo3.color = 'blue'

    objets_enonce.push(p2, codage, nomme)
    objets_correction.push(p2, codage, nomme, t1, t2, t3, hypo, codageAngle)

    if (this.sup == 3) {
        objets_enonce.push(sAH, t4, codage2)
    }

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
    } 
    if (this.sup == 2) {
        texte += `Écrire les 6 rapports trigonométriques pour ce triangle.` 
    }
    if (this.sup == 3) {
        choix_rapport_trigo = choice(['cosinus','sinus','tangente'])
        texte+= `Exprimer le ${choix_rapport_trigo} de $\\widehat{${A.nom+B.nom+C.nom}}$ de deux manières différentes.`
    }
    if (!sortie_html){
        texte += '\n\\end{minipage}\n'
    }
    if (this.sup == 1 || this.sup == 2 || this.sup == 3) {
        texte_corr += mathalea2d(params_correction, objets_correction)
    }
    if (this.sup == 2) {
        let objets_correction2 = [p2, codage, nomme, t1, t22, t32, hypo, codageAngle2]
        texte_corr += mathalea2d(params_correction, objets_correction2)
    }
    if (this.sup == 3) {
        let objets_correction3 = [p2, codage2, nomme, t13, t23, t33, t4, hypo3, codageAngle, sAH]
        texte_corr += mathalea2d(params_correction, objets_correction3)
    }

    if (this.sup == 1 || this.sup == 2) {
        texte_corr += `<br>$${A.nom+B.nom+C.nom}$ est rectangle en $${A.nom}$ donc :`
        texte_corr += `<br>$\\cos\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\sin\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\tan\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${A.nom+B.nom}}$.`
    }
    if (this.sup == 2) {
        texte_corr += `<br>$\\cos\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\sin\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${B.nom+C.nom}}$ ;`
        texte_corr += `<br>$\\tan\\left(\\widehat{${A.nom+C.nom+B.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${A.nom+C.nom}}$.`
    }
    if (this.sup == 3) {
        if (choix_rapport_trigo == 'cosinus') {
            texte_corr += `<br>$${A.nom+B.nom+C.nom}$ est rectangle en $${A.nom}$ donc `
            if (!sortie_html) {
                texte_corr+='<br>'
            }
            texte_corr += `$\\cos\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+B.nom}}{${B.nom+C.nom}}$ ;`  
            texte_corr += `<br>$${A.nom+B.nom+H.nom}$ est rectangle en $${H.nom}$ donc `
            texte_corr += `$\\cos\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${B.nom+H.nom}}{${A.nom+B.nom}}$.`  
        }
        if (choix_rapport_trigo == 'sinus') {
            texte_corr += `<br>$${A.nom+B.nom+C.nom}$ est rectangle en $${A.nom}$ donc `
            if (!sortie_html) {
                texte_corr+='<br>'
            }
            texte_corr += `$\\sin\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${B.nom+C.nom}}$ ;`  
            texte_corr += `<br>$${A.nom+B.nom+H.nom}$ est rectangle en $${H.nom}$ donc `
            texte_corr += `$\\sin\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+H.nom}}{${A.nom+B.nom}}$.`  

        }
        if (choix_rapport_trigo == 'tangente') {
            texte_corr += `<br>$${A.nom+B.nom+C.nom}$ est rectangle en $${A.nom}$ donc `
            if (!sortie_html) {
                texte_corr+='<br>'
            }
            texte_corr += `$\\tan\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+C.nom}}{${A.nom+B.nom}}$ ;`  
            texte_corr += `<br>$${A.nom+B.nom+H.nom}$ est rectangle en $${H.nom}$ donc `
            texte_corr += `$\\tan\\left(\\widehat{${A.nom+B.nom+C.nom}}\\right)=\\dfrac{${A.nom+H.nom}}{${B.nom+H.nom}}$.`  
        }
        
    }
    
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu(this); // On envoie l'exercice à la fonction de mise en page
    };
  
    this.besoin_formulaire_numerique = ['Type de questions',3,'1 : Compléter 3 rapports trigonométriques\n2 : Donner les 6 rapports trigonométriques\n3 : Deux triangles imbriqués, donner un rapport de deux manières différentes'];
}  