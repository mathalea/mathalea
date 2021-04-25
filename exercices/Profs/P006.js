import Exercice from '../ClasseExercice.js';
import {arrondi,troncature,calcul,choisit_lettres_differentes} from "/modules/outils.js"
import {point,segment,droiteGraduee2,mathalea2d,} from "/modules/2d.js"

/**
 * Fonction permettant aux enseignants de proposer rapidement un axe avec zooms pour placer un décimal
 * ref P006
 * @Auteur Jean-Claude Lhote
 */
export default function Nombre_a_placer() {
  Exercice.call(this);
  this.nb_cols = 1;
  this.nb_questions=1;
  this.nb_questions_modifiable=false
  this.sup = 1;
  this.sup2 = 2.573;
  this.sup3 = false;
  this.titre = "Placer un nombre décimal avec des zooms successifs";

  this.nouvelle_version = function () {
    this.contenu = "";
    let d1, d2, d3, texte = "", extremite, noms = [];
    let x1 = 0, x2 = 0, x3 = 0, objets = [], fenetre, thickOff = 0;
    noms = choisit_lettres_differentes(5, 'QFN');
    objets.length = 0;
    x1 = parseFloat(this.sup2);
    x1 = arrondi(x1, 4);
    x2 = troncature(x1, 1);
    let x21 = troncature(x1, 2);
    x3 = calcul(x2 + 0.1);
    let x31 = calcul(x21 + 0.01);
    let xmin = Math.floor(x2);
    let xmax = xmin + 1;
    thickOff = 0.0001;

    extremite = `->`;
    d1 = droiteGraduee2({
      x: 0, y: 6, Min: xmin, axePosition: 'H', Max: xmax, thickSec: true, thickTer: true, Unite: 30, thickDistance: 1, thickSecDist: 0.1, thickTerDist: 0.01, thickOffset: thickOff,
      thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`]],
      pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 3, axeStyle: extremite
    });
    d2 = droiteGraduee2({
      x: 6.5, y: 3, Min: x2, axePosition: 'H', Max: x3, thickSec: true, thickTer: true, Unite: 200, thickSecDist: 0.01, thickTerDist: 0.001, thickDistance: 0.1, thickOffset: thickOff,
      thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x2, `${noms[0]}`], [x3, `${noms[2]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
      pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
    });
    d3 = droiteGraduee2({
      x: 6.5, y: 0, Min: x21, axePosition: 'H', Max: x31, thickSec: true, thickTer: true, Unite: 2000, thickSecDist: 0.001, thickTerDist: 0.0001, thickOffset: thickOff,
      thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 6, labelsPrincipaux: this.sup3,
      pointListe: [[x1, `${noms[1]}`], [x21, `${noms[3]}`], [x31, `${noms[4]}`]],
      pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
    });

    let pA1 = point((x2 - xmin) * 30, 6);
    let pA2 = point(6.5, 3);
    let pB1 = point((x3 - xmin) * 30, 6);
    let pB2 = point(26.5, 3);
    let sA = segment(pA1, pA2);
    let sB = segment(pB1, pB2);
    sA.pointilles = true;
    sB.pointilles = true;
    let pC1 = point(6.5 + (x21 - x2) * 200, 3);
    let pC2 = point(6.5, 0);
    let pD1 = point(6.5 + (x31 - x2) * 200, 3);
    let pD2 = point(26.5, 0);
    let sC = segment(pC1, pC2);
    let sD = segment(pD1, pD2);
    sC.pointilles = true;
    sD.pointilles = true;
    fenetre = { xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 7.5, pixelsParCm: 25, scale: 0.5 };
    if (this.sup == 3)
      objets.push(d1, d2, d3, sA, sB, sC, sD);
    else if (this.sup == 2)
      objets.push(d1, d2, sA, sB);

    else
      objets.push(d1);

    texte = mathalea2d(fenetre, objets);
    console.log(objets);
    this.contenu += texte;
    if (sortie_html) {
      this.contenu += '<br>';
    }
    else  {
      this.contenu += '\\\\';
    }

  };
  this.besoin_formulaire_numerique = ['Nombre de zoom', 3, '1 : sans zoom\n2 : zoom des centièmes\n3 : zoom des millièmes'];
  this.besoin_formulaire2_numerique = ['Saisir le nombre décimal '];
  this.besoin_formulaire3_case_a_cocher = ['Afficher les abscisses'];

}
