import {point,pointAdistance,droite,segment,triangle2points2longueurs,longueur,angle} from "/modules/2d.js"
import { calcul, randint, creer_modal } from "/modules/outils.js"


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
    this.couleurTexte = "black";
    this.couleurLabelPoint = "black"; // Couleur du nom des points
    this.epaisseur = 3;
    this.liste_script = []; // Liste des instructions xml mise à jour par les méthodes

    // Sauvegarde de l'état des instruments
    this.regle = {
        visibilite: false,
        position: point(0, 0),
        angle: 0,
    }

    this.crayon = {
        visibilite: false,
        position: point(0, 0),
        angle: 0,
    }

    this.equerre = {
        visibilite: false,
        position: point(0, 0),
        angle: 0,
    }

    this.rapporteur = {
        visibilite: false,
        position: point(0, 0),
        angle: 0,
    }


    this.compas = {
        visibilite: false,
        position: point(0, 0),
        angle: 0,
        orientation: "droite",
        ecartement: 0,
        leve: false,
    }

    this.script = function () {
        let codeXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        codeXML += `<INSTRUMENPOCHE version="2">\n`
        codeXML += this.liste_script.join('\n');
        codeXML += `\n</INSTRUMENPOCHE>`
        return codeXML
    }
    this.html = function (numero_de_l_exercice, i) {
        if (sortie_html) {
            window.listeIEP.push(`${numero_de_l_exercice}_${i}`) // Sauvegard le liste de toutes les animations à ajouter aux exercices
            let codeHTML = `<div id="IEPContainer${numero_de_l_exercice}_${i}"></div>
            <script id="figurexml${numero_de_l_exercice}_${i}" type="text/xml">
                ${this.script()}
            </script>`
    
            // return codeHTML
            return creer_modal(`${numero_de_l_exercice}_${i}`, codeHTML, "Correction animée", "play circle")
        }
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
            A1 = this[objet].position
        } else {
            A1 = A
        }
        codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${A1.xIEP()}" ordonnee="${A1.yIEP()}" ${tempoTexte} />`
        this[objet].visibilite = true
        this[objet].position = A1
        this.liste_script.push(codeXML)
    }
}

Alea2iep.prototype.regleMontrer = function (A, tempo) {
    this.montrer('regle', A, tempo)
}

Alea2iep.prototype.crayonMontrer = function (A, tempo) {
    this.montrer('crayon', A, tempo)
}

Alea2iep.prototype.equerreMontrer = function (A, tempo) {
    this.montrer('equerre', A, tempo)
}

Alea2iep.prototype.compasMontrer = function (A, tempo) {
    this.montrer('compas', A, tempo)
}

Alea2iep.prototype.rapporteurMontrer = function (A, tempo) {
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

Alea2iep.prototype.regleMasquer = function (tempo) {
    this.masquer('regle', tempo)
}

Alea2iep.prototype.crayonMasquer = function (tempo) {
    this.masquer('crayon', tempo)
}

Alea2iep.prototype.equerreMasquer = function (tempo) {
    this.masquer('equerre', tempo)
}

Alea2iep.prototype.compasMasquer = function (tempo) {
    this.masquer('compas', tempo)
}

Alea2iep.prototype.rapporteurMasquer = function (tempo) {
    this.masquer('rapporteur', tempo)
}

/**
* creerPoint(A, nom, tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.pointCreer = function (A, label = A.nom, tempo = this.tempo, couleur = this.couleur) {
    this.idIEP++
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

Alea2iep.prototype.compasRetourner = function (tempo = this.tempo) {
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

Alea2iep.prototype.compasEcarter = function (l, tempo = this.tempo) {
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let codeXML = `<action ecart="${calcul(l * 30, 1)}" mouvement="ecarter" objet="compas" ${tempoTexte} />`
    this.compas.ecartement = l
    this.liste_script.push(codeXML)
}


Alea2iep.prototype.compasEcarterAvecRegle = function (l, tempo = this.tempo) {
    this.regleRotation(0, 0)
    this.regleMontrer(this.compas.position, 0)
    this.regleDeplacer(this.compas.position, 0)
    this.compasMontrer()
    this.compasRotation(0, 0)
    this.compasEcarter(l, tempo)
}


/**
* ecarterCompasSegment(A,B)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasEcarter2Points = function (A, B, tempo = this.tempo) {
    this.compas.montrer(A)
    this.compas.deplacer(A)
    let s = segment(A, B)
    s.isVisible = false
    let angle = s.angleAvecHorizontale
    this.compas.rotation(angle)
    this.compas.ecarter(longueur(A, B))
}

/**
* leverCompas()
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasLever = function (tempo = this.tempo) {
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

Alea2iep.prototype.compasCoucher = function (tempo = this.tempo) {
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

Alea2iep.prototype.compasTracerArc2Angles = function (angle1, angle2, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
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
    if (Math.abs(this.compas.angle - angle1) > Math.abs(this.compas.angle - angle2)) { // On cherche à commencer par le point le plus proche de la position courante du compas
        [angle1, angle2] = [angle2, angle1]
    }
    let codeXML = `<action sens="5" angle="${-angle1}" mouvement="rotation" objet="compas" ${tempoTexte} />\n`
    codeXML += `<action mouvement="lever" objet="compas" />\n`
    codeXML += `<action sens="5" angle="${-angle1}" mouvement="rotation" objet="compas" />\n`
    let sensTexte
    if (angle2 > angle1) {
        sensTexte = vitesse
    } else {
        sensTexte = -1 * vitesse
    }
    codeXML += `<action couleur="${couleur}" epaisseur="${epaisseur}" sens="${sensTexte}" debut="${-angle1}" fin="${-angle2}" mouvement="tracer" objet="compas"  ${pointillesTexte} id="${this.idIEP}" ${tempoTexte} />\n`
    codeXML += `<action mouvement="coucher" objet="compas" ${tempoTexte}/>`
    this.liste_script.push(codeXML)
}

/**
* tracerCompasArcAutourPoint(point, delta, tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasTracerArcCentrePoint = function (centre, point, delta = 10, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
    this.compasMontrer()
    this.compasDeplacer(centre)
    let s = segment(centre, point)
    s.visibility = false
    let angle1 = s.angleAvecHorizontale - delta
    let angle2 = s.angleAvecHorizontale + delta
    if ((Math.abs(this.compas.ecartement - longueur(this.compas.position, point))) > .1) {
        this.compasEcarter(longueur(centre, point))
    }
    this.compasTracerArc2Angles(angle1, angle2, tempo, vitesse, epaisseur, couleur, pointilles)
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


Alea2iep.prototype.regleDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('regle', A, tempo, vitesse)
}

Alea2iep.prototype.crayonDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('crayon', A, tempo, vitesse)
}

Alea2iep.prototype.equerreDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('equerre', A, tempo, vitesse)
}

Alea2iep.prototype.compasDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('compas', A, tempo, vitesse)
}

Alea2iep.prototype.rapporteurDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
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
    // Les angles de MathALEA2D et de IEP sont opposés !!!!!
    let codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-angle}" ${tempoTexte} sens="${sens}" />`
    this.liste_script.push(codeXML)
    this[objet].angle = angle
}

Alea2iep.prototype.regleRotation = function (angle, tempo, sens) {
    this.rotation('regle', angle, tempo, sens)
}

Alea2iep.prototype.crayonRotation = function (angle, tempo, sens) {
    this.rotation('crayon', angle, tempo, sens)
}

Alea2iep.prototype.equerreRotation = function (angle, tempo, sens) {
    this.rotation('equerre', angle, tempo, sens)
}

Alea2iep.prototype.compasRotation = function (angle, tempo, sens) {
    this.rotation('compas', angle, tempo, sens)
}

Alea2iep.prototype.rapporteurRotation = function (tempo, vitesse) {
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

Alea2iep.prototype.segmentTracer = function (A, B) {
    this.regleMontrer()
    this.crayonMontrer(A)
    this.regleDeplacer(A)
    this.crayonDeplacer(A)
    let d = droite(A, B)
    d.isVisible = false
    let angle = d.angleAvecHorizontale
    this.regleRotation(angle)
    this.tracer(B)
}

Alea2iep.prototype.polygoneTracer = function (...sommets) {
    for (let i = 0; i < sommets.length - 1; i++) {
        this.segmentTracer(sommets[i], sommets[i + 1])
    }
    this.segmentTracer(sommets[sommets.length - 1], sommets[0])
}

Alea2iep.prototype.textePosition = function (x, y, texte, police, tempo = this.tempo, couleur = this.couleurTexte) {
    this.idIEP++
    let tempoTexte = ''
    if (tempo) {
        tempoTexte = `tempo="${tempo}"`
    }
    let policeTexte = ''
    if (police) {
        policeTexte = `police="${police}"`
    }
    let A = point(x,y)
    let codeXML = `<action abscisse="${A.xIEP()}" ordonnee="${A.yIEP()}" id="${this.idIEP}" mouvement="creer" objet="texte" ${tempoTexte} />`
    codeXML += `\n<action ${policeTexte} couleur="${couleur}" texte="${texte}" id="${this.idIEP}" mouvement="ecrire" objet="texte" />`
    this.liste_script.push(codeXML)
}

Alea2iep.prototype.triangle3longueurs = function (ABC, AB, AC, BC) {
    let A = point(6, 0)
    let B = pointAdistance(A, AB, randint(-20, 20))
    let p = triangle2points2longueurs(A, B, AC, BC)
    let C = p.listePoints[2]
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]

    this.pointCreer(A)
    this.regleMontrer(A)
    this.segmentTracer(A, B)
    this.pointCreer(B)
    this.crayonMasquer()
    this.couleur = "forestgreen"
    this.epaisseur = 2
    this.compasMontrer(A)
    this.compasEcarterAvecRegle(AC)
    this.compasTracerArcCentrePoint(A, C, 40)
    this.compasDeplacer(B)
    this.compasEcarterAvecRegle(BC)
    this.compasTracerArcCentrePoint(B, C)
    this.compasMasquer()
    this.couleur = "blue"
    this.epaisseur = 3
    this.pointCreer(C)
    this.segmentTracer(B, C)
    this.segmentTracer(C, A)
    this.crayonMasquer()
    this.regleMasquer()
}

