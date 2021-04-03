import {point,pointAdistance,droite,droiteParPointEtPerpendiculaire,segment,polygone,triangle2points2longueurs,cercle,pointIntersectionLC,homothetie,longueur,angle,milieu} from "/modules/2d.js"
import { calcul, randint, tex_nombre } from "/modules/outils.js"


/*
 * Classe parente de tous les objets Alea2iep
 *
 * @Auteur Rémi Angot
 */
export default function Alea2iep() {
    this.idIEP = 0; // Identifiant pour les tracés
    this.idHTML = 0; // Identifiant pour les div et le svg
    this.tempo = 10; // Pause par défaut après une instruction
    this.vitesse = 10; // Vitesse par défaut pour les déplacements d'instruments
    this.couleur = "blue"; // Couleur par défaut
    this.couleurCompas = "forestgreen";
    this.couleurTexte = "black";
    this.couleurPoint = "black"; // Couleur du nom des points
    this.couleurCodage = "#f15929"; 
    this.epaisseur = 3;
    this.liste_script = []; // Liste des instructions xml mise à jour par les méthodes

    this.translationX = 0;
    this.translationY = 10; // Par défaut l'angle en haut à gauche est le point de coordonnées (0,10)
    // Transforme les coordonnées MathALEA2D en coordonnées pour le XML d'IEP
    this.x = function (A) {
       return (A.x+this.translationX)*30
    }
    this.y = function (A) {
       return (-A.y+this.translationY)*30
    }

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
    
    this.requerre = {
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

    this.xml = '';

    this.script = function () {
        if (this.xml.length>1) {
            return this.xml
        } else {
            let codeXML = `<?xml version="1.0" encoding="UTF-8"?>\n`;
            codeXML += `<INSTRUMENPOCHE version="2">\n`
            codeXML += this.liste_script.join('\n');
            codeXML += `\n</INSTRUMENPOCHE>`
            return codeXML
        }
    }

    this.html = function (numero_de_l_exercice, i) {
        if (sortie_html) {
            let id = `${numero_de_l_exercice}_${i}`
            window.listeIEP.push(id) // Sauvegard le liste de toutes les animations à ajouter aux exercices
            let codeHTML = `<script id="figurexml${numero_de_l_exercice}_${i}" type="text/xml">
                ${this.script()}
            </script>
            <br>
            <div id="IEPContainer${id}" ></div>`
            return codeHTML
        }
    }

    this.htmlBouton = function (numero_de_l_exercice, i) {
        if (sortie_html) {
            let id = `${numero_de_l_exercice}_${i}`
            window.listeIEP.push(id) // Sauvegard le liste de toutes les animations à ajouter aux exercices
            let codeHTML = `<script id="figurexml${numero_de_l_exercice}_${i}" type="text/xml">
                ${this.script()}
            </script>
            <br>
            <button class="ui mini compact button" id="btnAnimation${id}" onclick="toggleVisibilityIEP(IEPContainer${id},btnAnimation${id})""><i class="large play circle outline icon"></i>Voir animation</button>
            <div id="IEPContainer${id}" style="display: none;" ></div>`

            window.toggleVisibilityIEP = function(idElement, idBtn) {
                // Pourquoi un string se transforme en élément du DOM !?
                //let element = document.getElementById(idElement)
                //let elementBtn = document.getElementById(idBtn)
                if (idElement.style.display === "none") {
                    idElement.style.display = "block";
                    idBtn.innerHTML = '<i class="large stop circle outline icon"></i>Masquer animation'
                } else {
                    idElement.style.display = "none";
                    idBtn.innerHTML = '<i class="large play circle outline icon"></i>Voir animation'
                }
            }

            return codeHTML
        } else {
            return ''
        }


    }
}

/**
 **************************
 *** FONCTIONS COMMUNES *** 
 **************************
 */


/**
* montrer(objet, A, 10) |montrerRegle(A) | montrerCrayon(A) | montrerEquerre(A) | montrerCompas(A) | montrerRapporteur(A)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.montrer = function (objet, A, tempo = this.tempo) {
    if (!this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est caché
        let codeXML = ''
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
        let A1;
        if (typeof A == 'undefined') { // A1 est une copie de A ou (0,0) si A n'est pas défini
            A1 = this[objet].position
        } else {
            A1 = A
        }
        codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${this.x(A1)}" ordonnee="${this.y(A1)}" ${tempoTexte} />`
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

Alea2iep.prototype.requerreMontrer = function (A, tempo) {
    this.montrer('requerre', A, tempo)
}

Alea2iep.prototype.compasMontrer = function (A, tempo) {
    this.montrer('compas', A, tempo)
}

Alea2iep.prototype.rapporteurMontrer = function (A, tempo) {
    this.montrer('rapporteur', A, tempo)
}



/**
* masquer(objet, A, 10) | regleMasquer(A) | crayonMasquer(A) | equerreMasquer(A) | compasMasquer(A) | rapporteurMasquer(A)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.masquer = function (objet, tempo = this.tempo) {
    if (this[objet].visibilite) { // On ajoute une ligne xml que si l'objet est visible
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
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

Alea2iep.prototype.requerreMasquer = function (tempo) {
    this.masquer('requerre', tempo)
}

Alea2iep.prototype.compasMasquer = function (tempo) {
    this.masquer('compas', tempo)
}

Alea2iep.prototype.rapporteurMasquer = function (tempo) {
    this.masquer('rapporteur', tempo)
}

/**
* regleDeplacer(A,tempo,vitesse) | crayonDeplacer(A,tempo,vitesse) | equerreDeplacer(A,tempo,vitesse) | compasDeplacer(A,tempo,vitesse) | rapporteurDeplacer(A,tempo,vitesse)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.deplacer = function (objet, A, tempo = this.tempo, vitesse = this.vitesse) {
    if (this[objet].position != A) { // On n'ajoute une commande xml que s'il y a vraiment un déplacement
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
        const vitesseTexte = vitesse ? `vitesse="${vitesse}"` : ''
        let codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" ${tempoTexte} ${vitesseTexte} />`
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

Alea2iep.prototype.requerreDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('requerre', A, tempo, vitesse)
}

Alea2iep.prototype.equerreZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="equerre" />`)
}

Alea2iep.prototype.requerreZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="requerre" />`)
}

Alea2iep.prototype.requerreGlisserEquerre = function (a, tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action abscisse="${a*30}" mouvement="glisser" objet="requerre" ${tempoTexte} />`)
}



Alea2iep.prototype.compasDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('compas', A, tempo, vitesse)
}

Alea2iep.prototype.rapporteurDeplacer = function (A, tempo = this.tempo, vitesse = this.vitesse) {
    this.deplacer('rapporteur', A, tempo, vitesse)
}

/**
* regleRotation(angle,tempo,vitesse) | crayonRotation(angle,tempo,vitesse) | equerreRotation(angle, tempo,vitesse) | compasRotation(angle,tempo,vitesse) | rapporteurRotation(angle,tempo,vitesse)
* Pour IEP un angle positif est indirect
* @Auteur Rémi Angot
*/

Alea2iep.prototype.rotation = function (objet, angle, tempo = this.tempo, sens = this.vitesse) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    // Les angles de MathALEA2D et de IEP sont opposés !!!!!
    let codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-angle}" ${tempoTexte} sens="${sens}" />`
    this[objet].angle = angle
    if (typeof angle === 'number' && isFinite(angle)) {
        this.liste_script.push(codeXML)
    } else {
        console.log ("Angle de rotation non défini.")
    }
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

Alea2iep.prototype.requerreRotation = function (angle, tempo, sens) {
    this.rotation('requerre', angle, tempo, sens)
}

Alea2iep.prototype.compasRotation = function (angle, tempo, sens) {
    this.rotation('compas', angle, tempo, sens)
}

Alea2iep.prototype.rapporteurRotation = function (angle, tempo, vitesse) {
    this.rotation('rapporteur', angle, tempo, vitesse)
}

/**
 **************************
 ********* POINT **********
 **************************
 */

/**
* pointCreer(A, nom, tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.pointCreer = function (A, label = A.nom, tempo = this.tempo, couleur = this.couleurPoint) {
    this.idIEP++
    A.id = this.idIEP
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" couleur="${this.couleur}" id="${this.idIEP}" mouvement="creer" objet="point" ${tempoTexte} />`
    if (label) {
        codeXML += `\n<action couleur="${couleur}" nom="${label}" id="${this.idIEP}" mouvement="nommer" objet="point" ${tempoTexte}  />`
    }
    this.liste_script.push(codeXML)
}

Alea2iep.prototype.pointMasquer = function(A){
    this.liste_script.push(`<action id="${A.id}" mouvement="masquer" objet="point" />`)
}
Alea2iep.prototype.pointMontrer = function(A){
    this.liste_script.push(`<action id="${A.id}" mouvement="montrer" objet="point" />`)
}
Alea2iep.prototype.pointDeplacer = function(A, x, y, tempo = this.tempo, vitesse = this.vitesse){
    let B = point(x,y)
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    const vitesseTexte = vitesse ? `vitesse="${vitesse}"` : ''
    this.liste_script.push(`<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" id="${A.id}" mouvement="translation" objet="point" ${tempoTexte} ${vitesseTexte} />`)
}
Alea2iep.prototype.pointNommer = function(A, nom, dx, dy, couleur = this.couleurPoint, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let coordonneesTexte = ''
    if (typeof dy!= 'undefined') {
        coordonneesTexte = `abscisse="${dx*30}" ordonnee="${-dy*30}"`
    }
    this.liste_script.push(`<action couleur="${couleur}" nom="${nom}" id="${A.id}" mouvement="nommer" objet="point" ${tempoTexte} ${coordonneesTexte} />`)
}


/**
 **************************
 ********* COMPAS *********
 **************************
 */

/**
* compasRetourner(tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasRetourner = function (tempo = this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let codeXML = `<action mouvement="retourner" objet="compas" ${tempoTexte} />`
    if (this.compas.orientation == "droite") {
        this.compas.orientation = "gauche";
    } else {
        this.compas.orientation = "droite";

    }
    this.liste_script.push(codeXML)
}
/**
* compasEcarter(l, tempo)
* 
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasEcarter = function (l, tempo = this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let codeXML = `<action ecart="${calcul(l * 30, 1)}" mouvement="ecarter" objet="compas" ${tempoTexte} />`
    this.compas.ecartement = l
    this.liste_script.push(codeXML)
}



/**
* compasEcarterAvecRegle(l, tempo)
* 
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasEcarterAvecRegle = function (l, tempo = this.tempo) {
    this.regleRotation(0, 0)
    this.regleMontrer(this.compas.position, 0)
    this.regleDeplacer(this.compas.position, 0)
    this.compasMontrer()
    this.compasRotation(0, 0)
    this.compasEcarter(l, tempo)
}


/**
* compasEcarter2Points(A, B, tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasEcarter2Points = function (A, B, tempo = this.tempo) {
    this.compasMontrer(A)
    this.compasDeplacer(A)
    let s = segment(A, B)
    s.isVisible = false
    let angle = s.angleAvecHorizontale
    this.compasRotation(angle)
    this.compasEcarter(longueur(A, B))
}

/**
* compasLever(tempo)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasLever = function (tempo = this.tempo) {
    if (!this.compas.leve) { // On ne fait rien si le compas est déjà levé
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
        let codeXML = `<action mouvement="lever" objet="compas" ${tempoTexte} />`
        this.compas.leve = true
        this.liste_script.push(codeXML)
    }
}

/**
* compasCoucher(tempo)
* 
* @Auteur Rémi Angot
*/
Alea2iep.prototype.compasCoucher = function (tempo = this.tempo) {
    if (this.compas.leve) { // On ne fait rien si le compas est déjà levé
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
        let codeXML = `<action mouvement="coucher" objet="compas" ${tempoTexte} />`
        this.compas.leve = false
        this.liste_script.push(codeXML)
    }
}

/**
* compasTracerArc2Angles(angle1, angle2, tempo, vitesse, epaisseur, couleur, pointilles)
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasTracerArc2Angles = function (angle1, angle2, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = false) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    const vitesseTexte = vitesse ? `vitesse="${vitesse}"` : ''
    const pointillesTexte = pointilles ? `pointilles="tiret"` : ''
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
* compasTracerArcCentrePoint(centre, point, delta, tempo, vitesse, epaisseur, couleur)
* @Auteur Rémi Angot
*/

Alea2iep.prototype.compasTracerArcCentrePoint = function (centre, point, delta = 10, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleurCompas, pointilles = false) {
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
        const tempoTexte = tempo ? `tempo="${tempo}"` : ''
        const vitesseTexte = vitesse ? `vitesse="${vitesse}"` : ''
        let codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${this.x(A)}" ordonnee="${this.y(A)}" ${tempoTexte} ${vitesseTexte} />`
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
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    // Les angles de MathALEA2D et de IEP sont opposés !!!!!
    let codeXML = `<action objet="${objet}" mouvement="rotation" angle="${-angle}" ${tempoTexte} sens="${sens}" />`
    this[objet].angle = angle
    if (typeof angle === 'number' && isFinite(angle)) {
        this.liste_script.push(codeXML)
    } else {
        console.log ("Angle de rotation non défini.")
    }
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

Alea2iep.prototype.rapporteurRotation = function (angle, tempo, vitesse) {
    this.rotation('rapporteur', angle, tempo, vitesse)
}



Alea2iep.prototype.regleZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="regle" />`)
}
Alea2iep.prototype.equerreZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="equerre" />`)
}
Alea2iep.prototype.rapporteurZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="rapporteur" />`)
}
Alea2iep.prototype.compasZoom = function (k) {
    this.liste_script.push(`<action echelle="${k}" mouvement="zoom" objet="compas" />`)
}


/**
 **************************
 ******* RAPPORTEUR *******
 **************************
 */

// Non pris en charge par le lecteur JS
// Alea2iep.prototype.rapporteurCirculaire = function (tempo=this.tempo) {
//     const tempoTexte = tempo ? `tempo="${tempo}"` : ''
//     this.liste_script.push(`<action mouvement="circulaire" objet="rapporteur" ${tempoTexte}/>`)
// }
// Alea2iep.prototype.rapporteurSemiCirculaire = function (tempo=this.tempo) {
//     const tempoTexte = tempo ? `tempo="${tempo}"` : ''
//     this.liste_script.push(`<action mouvement="semicirculaire" objet="rapporteur" ${tempoTexte}/>`)
// }
Alea2iep.prototype.rapporteurMasquerGraduationsExterieures = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="masquer_nombres" objet="rapporteur" ${tempoTexte}/>`)
}
Alea2iep.prototype.rapporteurMontrerGraduationsExterieures = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="montrer_nombres" objet="rapporteur" ${tempoTexte}/>`)
}
Alea2iep.prototype.rapporteurMasquerGraduationsInterieures = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="vide" objet="rapporteur" ${tempoTexte}/>`)
}
Alea2iep.prototype.rapporteurMontrerGraduationsInterieures = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="graduations" objet="rapporteur" ${tempoTexte}/>`)
}

/**
 **************************
 ********* REGLE **********
 **************************
 */

 Alea2iep.prototype.regleMasquerGraduations = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="vide" objet="regle" ${tempoTexte}/>`)
}
 Alea2iep.prototype.regleMontrerGraduations = function (tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="graduations" objet="regle" ${tempoTexte}/>`)
}
 Alea2iep.prototype.regleModifierLongueur = function (l = 20, tempo=this.tempo) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action mouvement="modifier_longueur" objet="regle" longueur="${l}" ${tempoTexte}/>`)
}


/**
 **************************
 ********* TRAITS *********
 **************************
 */

/**
* tracer(B,tempo=tempoIEP ,vitesse=10,epaisseur=0,couleur=0) // Trace le segment du point courant vers B
* @Auteur Rémi Angot
*/

Alea2iep.prototype.tracer = function (B, tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false, vecteur = false) {
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    const vitesseTexte = vitesse ? `vitesse="${vitesse}"` : ''
    const pointillesTexte = pointilles ? `pointilles="${tiret}"` : ''
    const vecteurTexte = vecteur ? `style="vecteur"` : ''
    this.idIEP += 1
    let codeXML = `<action abscisse="${this.x(B)}" ordonnee="${this.y(B)}" epaisseur="${epaisseur}" couleur="${couleur}" mouvement="tracer" objet="crayon" ${tempoTexte}  ${pointillesTexte} ${vecteurTexte} ${vitesseTexte} id="${this.idIEP}" />`
    this.crayon.position = B
    this.liste_script.push(codeXML)
}
Alea2iep.prototype.trait = function (A, B, tempo = 0, vitesse = this.vitesse*100, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false) {
    this.crayonDeplacer(A, tempo, vitesse)
    this.tracer(B, tempo, vitesse)
}

/**
 * segmetTracer(A,B)
 * regleSegment(s)
 * regleSegment(A,B,tempo, vitesse, epaisseur, couleur, pointilles)
 */


Alea2iep.prototype.regleSegment = function (...args) {
    let A,B,tempo = this.tempo, vitesse = this.vitesse, epaisseur = this.epaisseur, couleur = this.couleur, pointilles = false

    if (args[0].typeObjet == 'segment') {
        A = args[0].extremite1
        B = args[0].extremite2
        if (typeof args[1] !== 'undefined') {
            tempo = args[1]
        }
        if (typeof args[2] !== 'undefined') {
            vitesse = args[2]
        }
        if (typeof args[3] !== 'undefined') {
            epaisseur = args[3]
        }
        if (typeof args[4] !== 'undefined') {
            couleur = args[4]
        }
        if (typeof args[5] !== 'undefined') {
            pointilles = args[5]
        }
    }
    if (args[0].typeObjet == 'point' && args[1].typeObjet == 'point' ) {
        A = args[0]
        B = args[1]
        if (typeof args[2] !== 'undefined') {
            tempo = args[2]
        }
        if (typeof args[3] !== 'undefined') {
            vitesse = args[3]
        }
        if (typeof args[4] !== 'undefined') {
            epaisseur = args[4]
        }
        if (typeof args[5] !== 'undefined') {
            couleur = args[5]
        }
        if (typeof args[6] !== 'undefined') {
            pointilles = args[6]
        }
    }

    let d = droite(A, B)
    d.isVisible = false
    let angle = d.angleAvecHorizontale
    this.regleMontrer()
    this.regleDeplacer(A)
    this.regleRotation(angle)
    this.crayonMontrer(A)
    this.crayonDeplacer(A)
    this.tracer(B, tempo, vitesse, epaisseur, couleur, pointilles)
}

Alea2iep.prototype.polygoneTracer = function (...sommets) {
    for (let i = 0; i < sommets.length - 1; i++) {
        this.regleSegment(sommets[i], sommets[i + 1])
    }
    this.regleSegment(sommets[sommets.length - 1], sommets[0])
}

/**
 **************************
 ********* TEXTE **********
 **************************
 */

Alea2iep.prototype.textePoint = function (texte, A, tempo = this.tempo, police=false, couleur = this.couleurTexte, couleur_fond, opacite_fond, couleur_cadre, epaisseur_cadre, marge, marge_gauche, marge_droite, marge_haut, marge_bas) {
    this.idIEP++
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    const policeTexte = police ? `police="${police}"` : ''
    let options = ''
    if (typeof couleur_fond!='undefined') {
        options += ` couleur_fond="${couleur_fond}"`
    }
    if (typeof opacite_fond!='undefined') {
        options += ` opacite_fond="${opacite_fond}"`
    }
    if (typeof couleur_cadre!='undefined') {
        options += ` couleur_cadre="${couleur_cadre}"`
    }
    if (typeof epaisseur_cadre!='undefined') {
        options += ` epaisseur_cadre="${epaisseur_cadre}"`
    }
    if (typeof marge!='undefined') {
        options += ` marge="${marge}"`
    }
    if (typeof marge_gauche!='undefined') {
        options += ` marge_gauche="${marge_gauche}"`
    }
    if (typeof marge_droite!='undefined') {
        options += ` marge_droite="${marge_droite}"`
    }
    if (typeof marge_bas!='undefined') {
        options += ` marge_bas="${marge_bas}"`
    }
    if (typeof marge_haut!='undefined') {
        options += ` marge_haut="${marge_haut}"`
    }
    let codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" id="${this.idIEP}" mouvement="creer" objet="texte" />`
    codeXML += `\n<action ${policeTexte} couleur="${couleur}" texte="${texte}" id="${this.idIEP}" mouvement="ecrire" objet="texte" ${options} ${tempoTexte} />`
    this.liste_script.push(codeXML)
}

Alea2iep.prototype.textePosition = function (texte, x, y, police, tempo = this.tempo, couleur = this.couleurTexte) {
    let A = point(x,y);
    return this.textePoint(texte, A, police, tempo = this.tempo, couleur = this.couleurTexte)
}

/**
 **************************
 ********* PAUSE **********
 **************************
 */

Alea2iep.prototype.pause = function () {
    this.liste_script.push('<action mouvement="pause" />')
}

/**
 **************************
 ******* CODAGES **********
 **************************
 */

 /**
  * segmentCodage(s, codage='\\', couleur = this.couleurCodage, tempo = this.tempo))
  * @param {*} s 
  * @param {*} codage 
  * @param {*} couleur 
  * @param {*} tempo 
  */

 Alea2iep.prototype.segmentCodage = function (...args) {
    let s, codage='\\', couleur=this.couleurCodage, tempo=this.tempo
    if (args[0].typeObjet == 'segment'){
        s = args[0]
        if (typeof args[1]!== 'undefined') {
            codage = args[1]
        }
        if (typeof args[2]!== 'undefined') {
            couleur = args[2]
        }
        if (typeof args[3]!== 'undefined') {
            tempo = args[3]
        }
    }
    if (args[0].typeObjet == 'point' && args[1].typeObjet == 'point' ){
        s = segment(args[0],args[1])
        if (typeof args[2]!== 'undefined') {
            codage = args[2]
        }
        if (typeof args[3]!== 'undefined') {
            couleur = args[3]
        }
        if (typeof args[4]!== 'undefined') {
            tempo = args[4]
        }
    }
    let id
    if (s.id) {
        id = s.id
    } else {
        this.idIEP++
        id = this.idIEP

    }
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let M = milieu(s.extremite1,s.extremite2)
    
    let codeXML = `<action abscisse="${this.x(M)}" ordonnee="${this.y(M)}" forme="${codage}"  couleur="${couleur}" id="${id}" ${tempoTexte} mouvement="creer" objet="longueur" />`
    this.liste_script.push(codeXML)
}

Alea2iep.prototype.segmentCodageMasquer = function(s, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action id="${s.id}" mouvement="masquer" objet="longueur" ${tempoTexte} />`)
}
Alea2iep.prototype.segmentCodageMontrer = function(s, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    this.liste_script.push(`<action id="${s.id}" mouvement="montrer" objet="longueur" />`)
}

/**
 * 
 * formes = "simple", "/", "//", "///", "O"
 * "double", "double/", "double//", "double///", "doubleO"
 * "triple", "triple/", "triple//", "triple///", "tripleO"
 * "plein", "plein/", "plein//", "plein///", "pleinO"
 */
Alea2iep.prototype.angleCodage = function(B, A, C, couleur=this.couleurCodage, codage='plein', r = 1, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let id = B.id + '_' + A.id + '_' + C.id
    let d1 = droite(A,B)
    let d2 = droite(A,C)
    d1.isVisible = false
    d2.isVisible = false
    let angle1 = -d1.angleAvecHorizontale
    let angle2 = -d2.angleAvecHorizontale
    let codeXML = `<action abscisse="${this.x(A)}" ordonnee="${this.y(A)}" rayon="${r*30}" angle1="${angle1}" angle2="${angle2}" forme="${codage}"  couleur="${couleur}" id="${id}" ${tempoTexte} mouvement="creer" objet="angle" />`
    this.liste_script.push(codeXML)
}


Alea2iep.prototype.angleCodageMasquer = function(B, A, C, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let id = B.id + '_' + A.id + '_' + C.id
    this.liste_script.push(`<action id="${id}" mouvement="masquer" objet="angle" ${tempoTexte} />`)
}
Alea2iep.prototype.angleCodageMontrer = function(B, A, C, tempo = this.tempo){
    const tempoTexte = tempo ? `tempo="${tempo}"` : ''
    let id = B.id + '_' + A.id + '_' + C.id
    this.liste_script.push(`<action id="${id}" mouvement="montrer" objet="angle" />`)
}



/**
 *****************************************
 ********* MACROS-CONSTRUCTIONS **********
 *****************************************
 */

Alea2iep.prototype.triangle3longueurs = function (ABC, AB, AC, BC, description = true) {
    let A = point(6, 0)
    let B = pointAdistance(A, AB, randint(-20, 20))
    let p = triangle2points2longueurs(A, B, AC, BC)
    let C = p.listePoints[2]
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]

    if (description) this.textePosition(`${A.nom + B.nom} = ${tex_nombre(AB)} cm`, 0, -2)
    this.pointCreer(A)
   // this.regleRotation(droite(A,B).angleAvecHorizontale)
   // this.regleMontrer(A)
    this.regleSegment(A, B)
    this.pointCreer(B)
    this.crayonMasquer()
    if (description) this.textePosition(`${A.nom + C.nom} = ${tex_nombre(AC)} cm donc ${C.nom} appartient au cercle de centre ${C.nom} et de rayon ${tex_nombre(AC)} cm.`, 0, -3)
    this.couleur = "forestgreen"
    this.epaisseur = 2
    this.compasMontrer(A)
    this.compasEcarterAvecRegle(AC)
    this.compasTracerArcCentrePoint(A, C, 40)
    if (description) this.textePosition(`${B.nom + C.nom} = ${tex_nombre(BC)} cm donc ${C.nom} appartient au cercle de centre ${C.nom} et de rayon ${tex_nombre(BC)} cm.`, 0, -4)
    this.compasDeplacer(B)
    this.compasEcarterAvecRegle(BC)
    this.compasTracerArcCentrePoint(B, C)
    this.compasMasquer()
    this.couleur = "blue"
    this.epaisseur = 3
    if (description) this.textePosition(`Le point ${C.nom} est à une intersection des deux cercles.`, 0, -5)
    this.pointCreer(C)
    this.regleSegment(B, C)
    this.regleSegment(C, A)
    this.crayonMasquer()
    this.regleMasquer()
}


Alea2iep.prototype.triangleRectangleCoteHypotenuse = function (ABC, AB, AC, description = true) { // Triangle rectangle en B
    let A = point(6, 0)
    let B = pointAdistance(A, AB, randint(-20, 20))
    let dAB = droite(A, B)
    dAB.isVisible = false
    let dBC = droiteParPointEtPerpendiculaire(B, dAB)
    dBC.isVisible = false
    let cAC = cercle(A, AC)
    cAC.isVisible = false
    let C = pointIntersectionLC(dBC, cAC)
    let c = homothetie(C, B, 1.2)
    let p = polygone(A, B, C)
    A.nom = ABC[0]
    B.nom = ABC[1]
    C.nom = ABC[2]

    if (longueur(A,C)>8) this.equerreZoom(150)
    if (description) this.textePosition(`${A.nom + B.nom} = ${tex_nombre(AB)} cm`, 0, -2)
    this.equerreRotation(dAB.angleAvecHorizontale)
    this.pointCreer(A)
    this.regleSegment(A, B)
    this.pointCreer(B)
    if (description) this.textePosition(`${A.nom + B.nom + C.nom} est un triangle rectangle en ${B.nom} donc ${C.nom} appartient à la perpendiculaire à (${A.nom + B.nom}) passant par ${B.nom}.`, 0, -3)
    this.equerreMontrer(A)
    this.equerreDeplacer(B)
    this.tracer(c)
    this.equerreMasquer()
    if (description) this.textePosition(`${A.nom + C.nom} = ${tex_nombre(AC)} cm donc C appartient au cercle de centre A et de rayon ${tex_nombre(AC)} cm.`, 0, -4)
    this.compasMontrer(A)
    this.compasEcarterAvecRegle(AC)
    this.couleur = "forestgreen"
    this.epaisseur = 2
    this.compasTracerArcCentrePoint(A, C)
    this.couleur = "blue"
    this.epaisseur = 2
    if (description) this.textePosition(`${C.nom} est à une intersection de la perpendiculaire et du cercle.`, 0, -5)
    this.pointCreer(C)
    this.compasMasquer()
    this.regleSegment(A, C)
    this.regleMasquer()
    this.crayonMasquer()
}
