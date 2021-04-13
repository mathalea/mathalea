import Exercice from '../ClasseExercice.js';
import { liste_de_question_to_contenu, randint, shuffle, combinaison_listes, calcul, creerNomDePolygone, lettre_depuis_chiffre, nombre_avec_espace, range1 } from "/modules/outils.js"
import { codeSegments, point, pointIntersectionDD, longueur,pointAdistance, labelPoint, droite, droiteParPointEtPerpendiculaire, segmentAvecExtremites, polygoneAvecNom, cercle, pointIntersectionLC, pointIntersectionCC, traceCompas, dansLaCibleRonde, cibleRonde, rotation, similitude, codageAngleDroit, afficheLongueurSegment, afficheMesureAngle, codeAngle, texteParPoint, angle, mathalea2d } from "/modules/2d.js"
import Alea2iep from "/modules/Alea2iep.js";

/**
 * publié le 1/12/2020
 * @Auteur Jean-Claude Lhote
 * Réfrence 6G21-1 et ... (exercice en 5e ? pas encore fait)
 */
export default function Construire_un_triangle_avec_cible() {
  "use strict"
  Exercice.call(this)
  this.titre = "Construire un triangle avec cible auto-corrective";
  this.nb_questions = 4;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = false;
  this.classe = 6;
  this.type_exercice = "IEP";
  this.nouvelle_version = function (numero_de_l_exercice) {
    let IEP = new Alea2iep()
let animation=''
    this.liste_questions = []
    this.liste_corrections = []
    let celluleAleaRonde = function (rang) {
      let lettre = lettre_depuis_chiffre(randint(1, 8))
      let chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }

    let type_de_questions_disponibles, cible, cellule, result, A, B, C, CC, lAB, lBC, lAC, cA, cB, T, TT, dBC, dAC, dAB, objets_enonceml, objets_enonce, objets_correction, params_enonceml, params_enonce, params_correction, nom, sommets
    if (this.classe == 6) type_de_questions_disponibles = range1(6)
    else type_de_questions_disponibles = range1(9)
    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions)
    for (let i = 0, texte, texte_corr, cpt = 0; i < this.nb_questions && cpt < 50;) {
      objets_enonce = []
      objets_enonceml = []
      objets_correction = []
      texte = `Le triangle ci-dessous a été réalisé à main levée.<br>Construire ce triangle avec les instruments de géométrie en respectant les mesures indiquées.<br>`
      texte_corr = `Voici la construction que tu devais réaliser.<br>`
      nom = creerNomDePolygone(3, "PQ")
      sommets = []
      for (let i = 0; i < 3; i++) sommets.push(nom[i])
      sommets = shuffle(sommets)
      A = point(0, 0, sommets[0], 'left')
      switch (liste_type_de_questions[i]) {
        case 1: // triangle quelconque par ses trois longueurs
          lAC = randint(35, 45)
          lBC = calcul(randint(35, 45, lAC) / 10)
          lAB = calcul(randint(46, 60) / 10)
          lAC = calcul(lAC / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B, 'black', 1), afficheLongueurSegment(A, C, 'black', 1))
          objets_correction.push(cible, traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
          texte_corr += `Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break;
        case 2: // triangle ABC rectangle en B dont on connait AB et BC 
          lBC = randint(70, 80) / 10
          lAB = calcul(randint(46, 60) / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cB = cercle(B, lBC)
          dAB = droite(A, B)
          dBC = droiteParPointEtPerpendiculaire(B, dAB)
          C = pointIntersectionLC(dBC, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B, 'black', 1), codageAngleDroit(A, B, CC))
          objets_correction.push(cible, traceCompas(B, C, 30, 'gray', 1, 2), codageAngleDroit(A, B, C), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B))
          texte_corr += `Pour cette construction, nous avons utilisé la règle graduée, l'équerre et le compas.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break
        case 3: // triangle ABC isocèle en A
          lBC = calcul(randint(35, 45) / 10)
          lAB = calcul(randint(46, 60) / 10)
          lAC = lAB
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B, 'black', 1), codeSegments('||', 'black', A, B, A, CC))
          objets_correction.push(cible, traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), codeSegments('||', 'black', A, B, A, C), afficheLongueurSegment(A, C))
          texte_corr += `Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break;
        case 4: // triangle ABC recatangle isocèle en B
          lAB = calcul(randint(46, 60) / 10)
          lBC = lAB
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cB = cercle(B, lBC)
          dAB = droite(A, B)
          dBC = droiteParPointEtPerpendiculaire(B, dAB)
          C = pointIntersectionLC(dBC, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), codeSegments('||', 'black', A, B, B, CC), codageAngleDroit(A, B, CC))
          objets_correction.push(cible, traceCompas(B, C, 30, 'gray', 1, 2), codageAngleDroit(A, B, C), afficheLongueurSegment(B, A), codeSegments('||', 'black', A, B, B, C))
          texte_corr += `Pour cette construction, nous avons utilisé l'équerre et la règle graduée.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break
        case 5: // triangle équilatéral
          lAB = calcul(randint(46, 60) / 10)
          lAC = lAB
          lBC = lAB
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          cB = cercle(B, lBC)
          C = pointIntersectionCC(cA, cB, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), codeSegments('||', 'black', A, B, B, CC, A, CC))
          objets_correction.push(cible, traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), codeSegments('||', 'black', A, B, B, C, A, C))
          texte_corr += `Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break;
        case 6: //triangle ABC dont on connait AB et AC et l'angle BAC
          lAB = calcul(randint(46, 60) / 10)
          lAC = randint(40, 60) / 10
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1], 'right')
          C = similitude(B, A, randint(8, 24) * 5, lAC / lAB, sommets[2], 'above')
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(codeAngle(B, A, CC, 1.1), afficheLongueurSegment(B, A), texteParPoint(nombre_avec_espace(Math.round(angle(B, A, C))) + `°`, similitude(B, A, angle(B, A, C) / 2, 1 / lAB + 0.1)), afficheLongueurSegment(A, C, 'black', 1))
          objets_correction.push(cible, afficheLongueurSegment(B, A), afficheMesureAngle(B, A, C, 'black', 1), afficheLongueurSegment(A, C, 'black', 1))
          texte_corr += `Pour cette construction, nous avons utilisé le rapporteur et la règle graduée.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break
        case 7: // triangle ABC dont ont connais AB et les deux angles adjacents 
          lAB = calcul(randint(46, 60) / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          dAB = droite(A, B)
          dAC = rotation(dAB, A, randint(8, 14) * 5)
          dBC = rotation(dAB, B, -randint(8, 12) * 5)
          C = pointIntersectionDD(dAC, dBC, sommets[2])
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(codeAngle(B, A, CC, 1.1), texteParPoint(nombre_avec_espace(Math.round(angle(B, A, C))) + `°`, similitude(B, A, angle(B, A, C) / 2, 1 / lAB + 0.1)), codeAngle(A, B, CC, 1.1), texteParPoint(nombre_avec_espace(Math.round(angle(A, B, C))) + `°`, similitude(A, B, -angle(A, B, C) / 2, 1 / lAB + 0.1)))
          objets_correction.push(cible, afficheLongueurSegment(B, A), afficheMesureAngle(B, A, C, 'black', 1), afficheMesureAngle(A, B, C, 'black', 1))
          texte_corr += `Pour cette construction, nous avons utilisé le rapporteur.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          IEP.triangle1longueur2angles(sommets,lAB,Math.round(angle(B, A, C)),Math.round(angle(A, B, C)))
          animation= IEP.htmlBouton(numero_de_l_exercice, i)
          break
        case 8: // triangle ABC rectangle en B dont on connait AB et l'hypoténuse AC 
          lAC = randint(70, 80) / 10
          lAB = calcul(randint(46, 60) / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          cA = cercle(A, lAC)
          dAB = droite(A, B)
          dBC = droiteParPointEtPerpendiculaire(B, dAB)
          C = pointIntersectionLC(dBC, cA, sommets[2], 1)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(afficheLongueurSegment(B, A), afficheLongueurSegment(A, C, 'black', 1), codageAngleDroit(A, B, CC))
          objets_correction.push(cible, traceCompas(A, C, 30, 'gray', 1, 2), codageAngleDroit(A, B, C), afficheLongueurSegment(B, A), afficheLongueurSegment(A, C))
          texte_corr += `Pour cette construction, nous avons utilisé la règle graduée, l'équerre et le compas.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`
          break
        case 9: // triangle ABC dont ont connais AB un angle adjacent et l'angle opposé
          lAB = calcul(randint(46, 60) / 10)
          B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
          B.positionLabel = 'right'
          dAB = droite(A, B)
          dAC = rotation(dAB, A, randint(8, 14) * 5)
          dBC = rotation(dAB, B, -randint(8, 12) * 5)
          C = pointIntersectionDD(dAC, dBC, sommets[2])
          lAC=longueur(A,C)
          C.positionLabel = 'above'
          CC = point(C.x + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, C.y + randint(-5, 5, [-2, -1, 0, 1, 2]) / 10, sommets[2])
          cellule = celluleAleaRonde(5)
          result = dansLaCibleRonde(C.x, C.y, 5, 0.3, cellule)
          cible = cibleRonde({ x: result[0], y: result[1], rang: 5, taille: 0.3 })
          objets_enonce.push(cible, segmentAvecExtremites(A, B), labelPoint(A, B))
          objets_enonceml.push(codeAngle(B, A, CC, 1.1), afficheLongueurSegment(B, A), texteParPoint(nombre_avec_espace(Math.round(angle(B, A, C))) + `°`, similitude(B, A, angle(B, A, C) / 2, 1 / lAB + 0.1)), codeAngle(A, CC, B, 1.1), texteParPoint(nombre_avec_espace(Math.round(angle(A, C, B))) + `°`, similitude(A, CC, angle(A, CC, B) / 2, 1 / lAC + 0.1)))
          objets_correction.push(cible, afficheLongueurSegment(B, A), afficheMesureAngle(B, A, C, 'black', 1), afficheMesureAngle(A, B, C, 'black', 1), afficheMesureAngle(A, C, B, 'black', 1))
          texte_corr += `Pour cette construction, il a fallu calculer l'angle $\\widehat{${sommets[0] + sommets[1] + sommets[2]}}$.<br>$\\widehat{${sommets[0] + sommets[1] + sommets[2]}}=180-\\widehat{${sommets[1] + sommets[0] + sommets[2]}}-\\widehat{${sommets[0] + sommets[2] + sommets[1]}}=180-${Math.round(angle(B, A, C))}-${Math.round(angle(B, C, A))}=${Math.round(angle(A, B, C))}$.<br>Nous avons utilisé le rapporteur pour effectuer cette construction.<br>`
          texte_corr += `Le point ${sommets[2]} se trouve dans le secteur ${cellule}.<br>`


      }
      T = polygoneAvecNom(A, B, C)
      TT = polygoneAvecNom(A, B, CC)
      objets_enonceml.push(TT[0], TT[1])
      objets_correction.push(T[0], T[1])
      params_enonceml = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 3), ymin: Math.min(A.y - 1, B.y - 1, C.y - 3), xmax: Math.max(A.x + 1, B.x + 1, C.x + 3), ymax: Math.max(A.y + 1, B.y + 1, C.y + 3), pixelsParCm: 20, scale: 0.58, mainlevee: true, amplitude: 0.3 }
      params_enonce = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 3), ymin: Math.min(A.y - 1, B.y - 1, C.y - 3), xmax: Math.max(A.x + 1, B.x + 1, C.x + 3), ymax: Math.max(A.y + 1, B.y + 1, C.y + 3), pixelsParCm: 30, scale: 1, mainlevee: false, amplitude: 1 }
      params_correction = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 3), ymin: Math.min(A.y - 1, B.y - 1, C.y - 3), xmax: Math.max(A.x + 1, B.x + 1, C.x + 3), ymax: Math.max(A.y + 1, B.y + 1, C.y + 3), pixelsParCm: 30, scale: 1 }
      texte += mathalea2d(params_enonceml, objets_enonceml) + mathalea2d(params_enonce, objets_enonce)
      texte_corr += mathalea2d(params_correction, objets_correction)
      texte_corr+='<br>'+animation
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);
  };
  //	this.besoin_formulaire_numerique = ['Type de questions', 3, `1 : Perpendiculaires\n 2 : Parallèles\n 3 : Mélange`]
  this.besoin_formulaire2_numerique = [
    "Type de cahier",
    3,
    `1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`,
  ];
}
