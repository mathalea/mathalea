import { tableau_de_variation, nomVecteurParPosition, point, tracePoint, tracePointSurDroite, milieu, pointSurSegment, pointSurCercle, pointSurDroite, pointIntersectionDD, pointAdistance, labelPoint, barycentre, droite, droiteParPointEtVecteur, droiteParPointEtParallele, droiteParPointEtPerpendiculaire, droiteHorizontaleParPoint, droiteVerticaleParPoint, droiteParPointEtPente, mediatrice, codageMediatrice, codageMilieu, constructionMediatrice, bissectrice, codageBissectrice, constructionBissectrice, polyline, pave, vecteur, segment, segmentAvecExtremites, demiDroite, demiDroiteAvecExtremite, polygone, polygoneAvecNom, polygoneRegulier, polygoneRegulierIndirect, carre, carreIndirect, codageCarre, polygoneRegulierParCentreEtRayon, triangle2points2longueurs, triangle2points2angles, triangle2points1angle1longueur, triangle2points1angle1longueurOppose, nommePolygone, deplaceLabel, aireTriangle, cercle, ellipse, pointIntersectionLC, pointIntersectionCC, cercleCentrePoint, arc, arcPointPointAngle, traceCompas, courbeDeBezier, segmentMainLevee, cercleMainLevee, droiteMainLevee, polygoneMainLevee, arcMainLevee, dansLaCibleCarree, dansLaCibleRonde, cibleCarree, cibleRonde, cibleCouronne, translation, translation2Points, rotation, sens_de_rotation, homothetie, symetrieAxiale, distancePointDroite, projectionOrtho, affiniteOrtho, similitude, translationAnimee, rotationAnimee, homothetieAnimee, symetrieAnimee, affiniteOrthoAnimee, montrerParDiv, cacherParDiv, afficherTempo, afficherTempoId, afficherUnParUn, medianeTriangle, centreGraviteTriangle, hauteurTriangle, CodageHauteurTriangle, codageHauteurTriangle, codageMedianeTriangle, orthoCentre, centreCercleCirconscrit, codageAngleDroit, afficheLongueurSegment, texteSurSegment, afficheMesureAngle, afficheCoteSegment, codeSegment, codeSegments, codeAngle, nomAngleSaillantParPosition, nomAngleRentrantParPosition, droiteGraduee, droiteGraduee2, axes, labelX, labelY, grille, grilleHorizontale, grilleVerticale, seyes, repere, repere2, pointDansRepere, traceGraphiqueCartesien, traceBarre, traceBarreHorizontale, lectureImage, lectureAntecedent, courbe, courbe2, courbeInterpolee, graphiqueInterpole, imageInterpolee, antecedentInterpole, crochetD, crochetG, intervalle, texteParPoint, texteParPosition, latexParPoint, latexParCoordonnees, fractionParPosition, print2d, longueur, norme, angle, angleOriente, angleradian, creerLutin, avance, baisseCrayon, leveCrayon, orienter, tournerG, tournerD, allerA, mettrexA, mettreyA, ajouterAx, ajouterAy, afficherCrayon, codeSvg, codeTikz, mathalea2d, labyrinthe, pavage } from "/modules/2d.js"
import {calcul} from "/modules/outils.js"


/*
 * Classe parente de tous les objets de MathALEA2D
 *
 * @Auteur Rémi Angot
 */
export function Alea2iep() {
    this.idIEP = 0; // Identifiant pour les tracés
    this.tempo = 10; // Pause par défaut après une instruction
    this.vitesse = 10; // Vitesse par défaut pour les déplacements d'instruments
    this.couleur = "blue"; // Couleur par défaut 
    this.couleurLabelPoint = "black"; // Couleur du nom des points
    this.epaisseur = 3;
    this.liste_script = []; // Liste des instructions xml mise à jour par les méthodes

    // Sauvegarde de l'état des instruments
    this.regle = {
        visibilite : false,
        position : false,
        angle : 0,
    }
    
    this.crayon = {
        visibilite : false,
        position : false,
        angle : 0,
    }
    
    this.equerre = {
        visibilite : false,
        position : false,
        angle : 0,
    }
    
    this.rapporteur = {
        visibilite : false,
        position : false,
        angle : 0,
    }
    

    this.compas = { 
        visibilite : false,
        position : false,
        angle : 0,
        orientation : "droite",
        ecartement : 0,
        leve : false,
    }

    this.script = function () {
        let codeXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        codeXML += `<INSTRUMENPOCHE version="2">\n`
        codeXML += this.liste_script.join('\n');
        codeXML += `\n</INSTRUMENPOCHE>`
        return codeXML
    }
}

/**
* montrer(objet, A, 10) |montrerRegle(A) | montrerCrayon(A) | montrerEquerre(A) | montrerCompas(A) | montrerRapporteur(A)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.montrer = function (objet, A, tempo = this.tempo) {
    if (!this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est caché
        let codeXML = ''
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let A1;
        if (typeof A == 'undefined') { // A1 est une copie de A ou (0,0) si A n'est pas défini
             A1 = point(0,0)
        } else {
            A1 = A
        }
        codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${A1.xIEP()}" ordonnee="${A1.yIEP()}" ${tempoTexte} />`
        this[objet].visibilite = true
        this[objet].position = A1
        this.liste_script.push(codeXML)
    }
}

Alea2iep.prototype.montrerRegle = function (A, tempo) {
    this.montrer('regle', A, tempo)
}

Alea2iep.prototype.montrerCrayon = function (A, tempo) {
    this.montrer('crayon', A, tempo)
}

Alea2iep.prototype.montrerEquerre = function (A, tempo) {
    this.montrer('equerre', A, tempo)
}

Alea2iep.prototype.montrerCompas = function (A, tempo) {
    this.montrer('compas', A, tempo)
}

Alea2iep.prototype.montrerRapporteur = function (A, tempo) {
    this.montrer('rapporteur', A, tempo)
}



/**
* masquer(objet, A, 10) |masquerRegle(A) | masquerCrayon(A) | masquerEquerre(A) | masquerCompas(A) | masquerRapporteur(A)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.masquer = function (objet, tempo = this.tempo) {
    if (this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est visible
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let codeXML = `<action objet="${objet}" mouvement="masquer" ${tempoTexte} />`
        this[objet].visibilite = false;
        this.liste_script.push(codeXML)
    }
}

Alea2iep.prototype.masquerRegle = function (tempo) {
    this.masquer('regle', tempo)
}

Alea2iep.prototype.masquerCrayon = function (tempo) {
    this.masquer('crayon', tempo)
}

Alea2iep.prototype.masquerEquerre = function (tempo) {
    this.masquer('equerre', tempo)
}

Alea2iep.prototype.masquerCompas = function (tempo) {
    this.masquer('compas', tempo)
}

Alea2iep.prototype.masquerRapporteur = function (tempo) {
    this.masquer('rapporteur', tempo)
}

/**
* creerPoint(A, nom, tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.creerPoint = function (A, label, tempo = this.tempo, couleur = this.couleur) {
    this.idIEP ++
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let codeXML = `<action abscisse="${A.xIEP()}" ordonnee="${A.yIEP()}" couleur="${this.couleur}" id="${this.idIEP}" mouvement="creer" objet="point" ${tempoTexte} />`
    if (label) {
        codeXML += `\n<action couleur="${this.couleurLabelPoint}" nom="${label}" id="${this.idIEP}" mouvement="nommer" objet="point" />`
    }
    this.liste_script.push(codeXML)
}

/**
* retournerCompas()
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.retournerCompas = function (tempo = this.tempo) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let codeXML = `<action mouvement="retourner" objet="compas" ${tempoTexte} />`
    if (this.compas.orientation == "droite") {
        this.compas.orientation = "gauche";
    } else {
        this.compas.orientation = "droite";

    }
    this.liste_script.push(codeXML)
}
/**
* ecarterCompas(l)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.ecarterCompas = function (l, tempo = this.tempo) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let codeXML = `<action ecart="${calcul(l*30,1)}" mouvement="ecarter" objet="compas" ${tempoTexte} />`
    this.compas.ecartement = l
    this.liste_script.push(codeXML)
}


/**
* ecarterCompasSegment(A,B)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.ecarterCompas2Points = function (A , B, tempo = this.tempo) {
    this.montrerCompas(A)
    this.deplacerCompas(A)
    let s = segment(A,B)
    s.isVisible = false
    let angle = s.angleAvecHorizontale
    this.rotationCompas(angle)
    this.ecarterCompas(longueur(A,B))
}

/**
* leverCompas()
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.leverCompas = function (tempo = this.tempo) {
    if (!this.compas.leve) { // On ne fait rien si le compas est déjà levé
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let codeXML = `<action mouvement="lever" objet="compas" ${tempoTexte} />`
        this.compas.leve = true
        this.liste_script.push(codeXML)
    }
}

/**
* coucherCompas()
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.coucherCompas = function (tempo = this.tempo) {
    if (this.compas.leve) { // On ne fait rien si le compas est déjà levé
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let codeXML = `<action mouvement="coucher" objet="compas" ${tempoTexte} />`
        this.compas.leve = false
        this.liste_script.push(codeXML)
    }
}

/**
* tracerCompasArc2Angles(angle1, angle2, tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.tracerCompas2Angles = function (angle1, angle2, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let vitesseTexte = ''
    if (vitesse) {
        vitesseTexte = `vitesse="${vitesse}"`
    }
    let pointillesTexte = ''
    if (pointilles) {
        pointillesTexte = 'pointille="tiret"'
    }
    this.idIEP += 1
    if (Math.abs(this.compas.angle-angle1) > Math.abs(this.compas.angle-angle2) ) { // On cherche à commencer par le point le plus proche de la position courante du compas
        [angle1, angle2] = [angle2, angle1]
    }
    let codeXML = `<action sens="5" angle="${angle1}" mouvement="rotation" objet="compas" ${tempoTexte} />\n`
    codeXML += `<action mouvement="lever" objet="compas" />\n`
    codeXML += `<action sens="5" angle="${angle1}" mouvement="rotation" objet="compas" />\n`
    let sensTexte
    if (angle2 > angle1) {
        sensTexte = vitesse        
    } else {
        sensTexte = -1 * vitesse
    }
    codeXML += `<action couleur="${couleur}" epaisseur="${epaisseur}" sens="${sensTexte}" debut="${angle1}" fin="${angle2}" mouvement="tracer" objet="compas"  ${pointillesTexte} id="${this.idIEP}" ${tempoTexte} />\n`
    codeXML += `<action mouvement="coucher" objet="compas" ${tempoTexte}/>`
    this.liste_script.push(codeXML)
}

/**
* tracerCompasArcAutourPoint(point, delta, tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.tracerCompasAutourPoint = function (point, delta=10, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
    this.montrerCompas()
    let s = segment(this.compas.position,point)
    s.visibility = false
    let angle1 = s.angleAvecHorizontale - delta
    let angle2 = s.angleAvecHorizontale + delta
    if ((Math.abs(this.compas.ecartement - longueur(this.compas.position,point))) > .1) {
        this.ecarterCompas(longueur(this.compas.position,point))
    }
    this.tracerCompas2Angles(angle1, angle2)
}
  


/**
* deplacerRegle(A,tempo,vitesse) | deplacerCrayon(A,tempo,vitesse) | deplacerEquerre(A,tempo,vitesse) | deplacerCompas(A,tempo,vitesse) | deplacerRapporteur(A,tempo,vitesse)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.deplacer = function (objet, A, tempo = this.tempo, vitesse = this.vitesse) {
    if (this[objet].position != A) { // On n'ajoute une commande xml que s'il y a vraiment un déplacement
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let vitesseTexte = ''
        if (vitesse) {
            vitesseTexte = `vitesse="${vitesse}"`
        }
        let codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${A.xIEP()}" ordonnee="${A.yIEP()}" ${tempoTexte} ${vitesseTexte} />`
        this[objet].position = A
        this.liste_script.push(codeXML)
    }
}


Alea2iep.prototype.deplacerRegle = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('regle', A, tempo, vitesse)
}

Alea2iep.prototype.deplacerCrayon = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('crayon', A, tempo, vitesse)
}

Alea2iep.prototype.deplacerEquerre = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('equerre', A, tempo, vitesse)
}

Alea2iep.prototype.deplacerCompas = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('compas', A, tempo, vitesse)
}

Alea2iep.prototype.deplacerRapporteur = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('rapporteur', A, tempo, vitesse)
}

/**
* rotationRegle(A,tempo,vitesse) | rotationCrayon(A,tempo,vitesse) | rotationEquerre(A,tempo,vitesse) | rotationCompas(A,tempo,vitesse) | rotationRapporteur(A,tempo,vitesse)
* Pour IEP un angle positif est indirect
* @Auteur Rémi Angot
*/

Alea2iep.prototype.rotation = function (objet, angle, tempo = this.tempo, sens = this.vitesse) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-angle}" ${tempoTexte} sens="${sens}" />`
    this.liste_script.push(codeXML)
    this[objet].angle = angle
}

Alea2iep.prototype.rotationRegle = function (angle, tempo, sens) {
    this.rotation('regle', angle, tempo, sens)
}

Alea2iep.prototype.rotationCrayon = function (angle, tempo, sens) {
    this.rotation('crayon', angle, tempo, sens)
}

Alea2iep.prototype.rotationEquerre = function (angle, tempo, sens) {
    this.rotation('equerre', angle, tempo, sens)
}

Alea2iep.prototype.rotationCompas = function (angle, tempo, sens) {
    this.rotation('compas', angle, tempo, sens)
}

Alea2iep.prototype.rotationRapporteur = function (tempo, vitesse) {
    this.rotation('rapporteur', angle, tempo, vitesse)
}

/**
* tracer(B,tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.tracer = function (B, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let vitesseTexte = ''
    if (vitesse) {
        vitesseTexte = `vitesse="${vitesse}"`
    }
    let pointillesTexte = ''
    if (pointilles) {
        pointillesTexte = 'pointille="tiret"'
    }
    this.idIEP += 1
    let codeXML = `<action abscisse="${B.xIEP()}" ordonnee="${B.yIEP()}" epaisseur="${epaisseur}" couleur="${couleur}" mouvement="tracer" objet="crayon"  ${pointillesTexte} ${vitesseTexte} id="${this.idIEP}" />`
    this.crayon.position = B
    this.liste_script.push(codeXML)
}

Alea2iep.prototype.tracerSegment = function (A, B) {
    this.montrerRegle()
    this.montrerCrayon(A)
    this.deplacerRegle(A)
    this.deplacerCrayon(A)
    let d = droite(A, B)
    d.isVisible = false
    let angle = d.angleAvecHorizontale
    this.rotationRegle(angle)
    this.tracer(B)
}

Alea2iep.prototype.tracerPolygone = function (...sommets) {
    for (let i = 0; i < sommets.length - 1; i++) {
        this.tracerSegment(sommets[i], sommets[i + 1])
    }
    this.tracerSegment(sommets[sommets.length - 1], sommets[0])
}

