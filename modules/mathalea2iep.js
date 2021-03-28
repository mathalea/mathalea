import {tableau_de_variation,nomVecteurParPosition,point,tracePoint,tracePointSurDroite,milieu,pointSurSegment,pointSurCercle,pointSurDroite,pointIntersectionDD,pointAdistance,labelPoint,barycentre,droite,droiteParPointEtVecteur,droiteParPointEtParallele,droiteParPointEtPerpendiculaire,droiteHorizontaleParPoint,droiteVerticaleParPoint,droiteParPointEtPente,mediatrice,codageMediatrice,codageMilieu,constructionMediatrice,bissectrice,codageBissectrice,constructionBissectrice,polyline,pave,vecteur,segment,segmentAvecExtremites,demiDroite,demiDroiteAvecExtremite,polygone,polygoneAvecNom,polygoneRegulier,polygoneRegulierIndirect,carre,carreIndirect,codageCarre,polygoneRegulierParCentreEtRayon,triangle2points2longueurs,triangle2points2angles,triangle2points1angle1longueur,triangle2points1angle1longueurOppose,nommePolygone,deplaceLabel,aireTriangle,cercle,ellipse,pointIntersectionLC,pointIntersectionCC,cercleCentrePoint,arc,arcPointPointAngle,traceCompas,courbeDeBezier,segmentMainLevee,cercleMainLevee,droiteMainLevee,polygoneMainLevee,arcMainLevee,dansLaCibleCarree,dansLaCibleRonde,cibleCarree,cibleRonde,cibleCouronne,translation,translation2Points,rotation,sens_de_rotation,homothetie,symetrieAxiale,distancePointDroite,projectionOrtho,affiniteOrtho,similitude,translationAnimee,rotationAnimee,homothetieAnimee,symetrieAnimee,affiniteOrthoAnimee,montrerParDiv,cacherParDiv,afficherTempo,afficherTempoId,afficherUnParUn,medianeTriangle,centreGraviteTriangle,hauteurTriangle,CodageHauteurTriangle,codageHauteurTriangle,codageMedianeTriangle,orthoCentre,centreCercleCirconscrit,codageAngleDroit,afficheLongueurSegment,texteSurSegment,afficheMesureAngle,afficheCoteSegment,codeSegment,codeSegments,codeAngle,nomAngleSaillantParPosition,nomAngleRentrantParPosition,droiteGraduee,droiteGraduee2,axes,labelX,labelY,grille,grilleHorizontale,grilleVerticale,seyes,repere,repere2,pointDansRepere,traceGraphiqueCartesien,traceBarre,traceBarreHorizontale,lectureImage,lectureAntecedent,courbe,courbe2,courbeInterpolee,graphiqueInterpole,imageInterpolee,antecedentInterpole,crochetD,crochetG,intervalle,texteParPoint,texteParPosition,latexParPoint,latexParCoordonnees,fractionParPosition,print2d,longueur,norme,angle,angleOriente,angleradian,creerLutin,avance,baisseCrayon,leveCrayon,orienter,tournerG,tournerD,allerA,mettrexA,mettreyA,ajouterAx,ajouterAy,afficherCrayon,codeSvg,codeTikz,mathalea2d,labyrinthe,pavage} from "/modules/2d.js"


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
    this.epaisseur = 3;
    this.liste_script = []; // Liste des instructions xml mise à jour par les méthodes

    this.visibilite = { // Sauvegarde de la visibilité d'un objet
        regle : false ,
        crayon : false ,
        equerre : false ,
        compas : false,
        rapporteur : false,
    }
    this.position = { // Sauvegarde de la position d'un objet
        regle : false ,
        crayon : false ,
        equerre : false ,
        compas : false,
        rapporteur : false,
    }

    this.script = function () {
        let codeXML =  `<?xml version="1.0" encoding="UTF-8"?>\n`;
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
    if (!this.visibilite[objet]) { // On ajoute une ligne xml que si l'objet est caché
        let codeXML = ''
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        if (A) {
            codeXML = `<action objet="${objet}" mouvement="montrer" abscisse="${A.xIEP()}" ordonnee="${A.yIEP()}" ${tempoTexte} />`
        } else {
            codeXML = `<action objet="${objet}" mouvement="montrer" ${tempoTexte} />`
        }
        this.visibilite[objet] = true
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
    if (this.visibilite[objet]) { // On ajoute une ligne xml que si l'objet est visible
        let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let codeXML = `<action objet="${objet}" mouvement="masquer" ${tempoTexte} />`
        this.visibilite[objet] = false;
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
* deplacerRegle(A,tempo,vitesse) | deplacerCrayon(A,tempo,vitesse) | deplacerEquerre(A,tempo,vitesse) | deplacerCompas(A,tempo,vitesse) | deplacerRapporteur(A,tempo,vitesse)
* 
* @Auteur Rémi Angot
*/

Alea2iep.prototype.deplacer = function(objet, A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    if (this.position[objet]!=A) { // On n'ajoute une commande xml que s'il y a vraiment un déplacement
        let tempoTexte = ''
            if (tempo) {
                tempoTexte = `tempo="${tempo}"`
            }
            let vitesseTexte = ''
            if (vitesse) {
                vitesseTexte = `vitesse="${vitesse}"`
            }
            let codeXML = `<action objet="${objet}" mouvement="translation" abscisse="${A.xIEP()}" ordonnee="${A.yIEP()}" ${tempoTexte} ${vitesseTexte} />`
            this.position[objet] = A
            this.liste_script.push(codeXML)
    }
}


Alea2iep.prototype.deplacerRegle = function (A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    this.deplacer('regle', A, tempo , vitesse)
}

Alea2iep.prototype.deplacerCrayon = function (A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    this.deplacer('crayon', A, tempo , vitesse)
}

Alea2iep.prototype.deplacerEquerre = function (A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    this.deplacer('equerre', A, tempo, vitesse)
}

Alea2iep.prototype.deplacerCompas = function (A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    this.deplacer('compas', A, tempo, vitesse )
}

Alea2iep.prototype.deplacerRapporteur = function (A, tempo = this.tempoIEP, vitesse = this.vitesse) {
    this.deplacer('rapporteur', A, tempo, vitesse)
}

/**
* rotationRegle(A,tempo,vitesse) | rotationCrayon(A,tempo,vitesse) | rotationEquerre(A,tempo,vitesse) | rotationCompas(A,tempo,vitesse) | rotationRapporteur(A,tempo,vitesse)
* Pour IEP un angle positif est indirect
* @Auteur Rémi Angot
*/

Alea2iep.prototype.rotation = function (objet, angle, tempo = this.tempoIEP, sens = this.vitesse) {
    let tempoTexte = ''
        if (tempo) {
            tempoTexte = `tempo="${tempo}"`
        }
        let sensTexte = ''
        if (sens) {
            sensTexte = `sens="${sens}"`
        }
    let codeXML =  `<action objet="${objet}" mouvement="rotation" angle="${-angle}" ${tempoTexte} ${sensTexte} />`
    this.liste_script.push(codeXML)
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

Alea2iep.prototype.tracer = function (B, tempo=this.tempoIEP, vitesse= this.vitesse, epaisseur=this.epaisseur, couleur=this.couleur, pointilles=false) {
		let tempoTexte = ''
		if (tempo){
			tempoTexte = `tempo="${tempo}"`
		}
		let vitesseTexte = ''
		if (vitesse){
			vitesseTexte = `vitesse="${vitesse}"`
		}
		let pointillesTexte = ''
		if (pointilles) {
			pointillesTexte = 'pointille="tiret"'
		}
		this.idIEP +=1
		let codeXML = `<action abscisse="${B.xIEP()}" ordonnee="${B.yIEP()}" epaisseur="${epaisseur}" couleur="${couleur}" mouvement="tracer" objet="crayon"  ${pointillesTexte} ${vitesseTexte} id="${this.idIEP}" />`
        this.position.crayon = B
        this.liste_script.push(codeXML)
}

Alea2iep.prototype.tracerSegment = function (A, B) {
    this.montrerRegle()
    this.montrerCrayon(A)
    this.deplacerRegle(A)
    this.deplacerCrayon(A)
    let d = droite(A,B)
    d.isVisible = false
    let angle = d.angleAvecHorizontale
    this.rotationRegle(angle)
    this.tracer(B)
}

Alea2iep.prototype.tracerPolygone = function (...sommets) {
    for (let i = 0 ; i < sommets.length-1 ; i++){
        this.tracerSegment(sommets[i], sommets[i+1])
    }
    this.tracerSegment(sommets[sommets.length-1],sommets[0])
}

