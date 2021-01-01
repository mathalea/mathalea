import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,shuffle,calcul,choisit_lettres_differentes,tex_nombre,tex_fraction,num_alpha} from "/modules/outils.js"
import {droiteGraduee2,mathalea2d} from "/modules/2d.js"
/**
 * 6N23-2
 */
export default function Lire_abscisse_decimale_trois_formes() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.niveau = 'sixième'
  this.titre = "Lire des abscisses décimales sous trois formes";
  this.consigne = "";
  if (sortie_html) {
    this.spacing = 2;
    this.spacing_corr = 3;
  }
  else {
    this.spacing = 1;
    this.spacing_corr = 1;
  }
  this.vspace = -1;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1
  this.nb_questions = 1;
  this.nb_questions_modifiable = false

  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées

    let d1, texte = "", texte_corr = "", extremite, noms = choisit_lettres_differentes(3, 'Q')
    let x1 = 0, x2 = 0, x3 = 0, thickOff, tableau = [],xmin,xmax
    if (this.sup == 1) {
      if (this.niveau == 'CM') {
        xmin = 0
        thickOff = 0
      }
      else {
        xmin = randint(1, 15)
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin == 0) extremite = `|->`
      else extremite = `->`
      xmax = xmin + 9
      x1 = xmin * 10 + randint(0, 2) * 10 + randint(2, 8)
      x2 = xmin * 10 + randint(3, 5) * 10 + randint(2, 8)
      x3 = xmin * 10 + randint(6, 8) * 10 + randint(2, 8)
      x1 = calcul(x1 / 10)
      x2 = calcul(x2 / 10)
      x3 = calcul(x3 / 10)

      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2]

      d1 = droiteGraduee2({
        x: 0, y: 0, Min: xmin, axePosition: 'H', Max: xmax, thickSec: true, thickTer: false, Unite: 3, thickOffset: thickOff,
        thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
      })
      texte = `${num_alpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${num_alpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un nombre entier et d'une fraction décimale.<br>`
      texte += `${num_alpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texte_corr = `${num_alpha(0)} L'abscisse de ${noms[0]} est : $${tex_nombre(x1)}$.<br>`
      texte_corr += `${num_alpha(1)} L'abscisse de ${noms[1]} est : $${tex_nombre(Math.floor(x2))} + ${tex_fraction(calcul(10 * (x2 - Math.floor(x2))), 10)}$.<br>`
      texte_corr += `${num_alpha(2)} L'abscisse de ${noms[2]} est : $${tex_fraction(calcul(x3 * 10), 10)}$.`
    }
    else if (this.sup == 2) {
      if (this.niveau == 'CM') {
        xmin = 0
        thickOff = 0
      }
      else {
        xmin = randint(1, 15) - 0.1
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin == 0) extremite = `|->`
      else extremite = `->`
      xmax = calcul(xmin + 1.5);
      x1 = 10 + xmin * 100 + randint(1, 3) * 10 + randint(2, 8);
      x2 = 10 + xmin * 100 + randint(4, 6) * 10 + randint(2, 8);
      x3 = 10 + xmin * 100 + randint(7, 9) * 10 + randint(2, 8);

      x1 = calcul(x1 / 100);
      x2 = calcul(x2 / 100);
      x3 = calcul(x3 / 100);
      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2];

      d1 = droiteGraduee2({
        x: 0, y: 0, Min: xmin, axePosition: 'H', Max: xmax, thickSec: true, thickTer: true, Unite: 20, thickOffset: thickOff,
        thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
      })
      texte = `${num_alpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${num_alpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un entier et d'une fraction décimale.<br>`
      texte += `${num_alpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texte_corr = `${num_alpha(0)} L'abscisse de ${noms[0]} est : $${tex_nombre(x1)}$.<br>`
      texte_corr += `${num_alpha(1)} L'abscisse de ${noms[1]} est : $${tex_nombre(Math.floor(x2))} + ${tex_fraction(calcul(100 * (x2 - Math.floor(x2))), 100)}$.<br>`
      texte_corr += `${num_alpha(2)} L'abscisse de ${noms[2]} est : $${tex_fraction(calcul(x3 * 100), 100)}$.`

    }
    else if (this.sup == 3) {
      if (this.niveau == 'CM') {
        xmin = 0
        thickOff = 0
      }
      else {
        xmin = calcul(randint(0, 15) + randint(0, 9) * 0.1)
        thickOff = calcul(2 / (10 ** (parseInt(this.sup))))
      }
      if (xmin == 0) extremite = `|->`
      else extremite = `->`
      xmax = calcul(xmin + 0.15)

      x1 = xmin * 1000 + randint(1, 5) * 10 + randint(2, 8)
      x2 = xmin * 1000 + randint(6, 9) * 10 + randint(2, 8)
      x3 = xmin * 1000 + randint(11, 14) * 10 + randint(2, 8)
      x1 = calcul(x1 / 1000)
      x2 = calcul(x2 / 1000)
      x3 = calcul(x3 / 1000)

      tableau = shuffle([x1, x2, x3])
      x1 = tableau[0]
      x2 = tableau[1]
      x3 = tableau[2]
      d1 = droiteGraduee2({
        x: 0, y: 0, Min: xmin, axePosition: 'H', Max: xmax, thickSec: true, thickTer: true, Unite: 200, thickOffset: thickOff,
        thickDistance: 0.1, thickSecDist: 0.01, thickTerDist: 0.001,
        thickCouleur: 'black', axeCouleur: 'black', axeHauteur: 4,
        pointListe: [[x1, `${noms[0]}`], [x2, `${noms[1]}`], [x3, `${noms[2]}`]],
        labelListe: [[xmin + 0.09, tex_nombre(calcul(xmin + 0.09))], [xmin + 0.1, tex_nombre(calcul(xmin + 0.1))]],
        pointTaille: 6, pointOpacite: 0.8, pointCouleur: 'blue', pointStyle: '|', pointEpaisseur: 2, axeStyle: extremite
      })

      texte = `${num_alpha(0)} Donner l'abscisse de ${noms[0]} en écriture décimale.<br>`
      texte += `${num_alpha(1)} Donner l'abscisse de ${noms[1]} comme la somme d'un entier et d'une fraction décimale.<br>`
      texte += `${num_alpha(2)} Donner l'abscisse de ${noms[2]} sous la forme d'une fraction décimale.<br>`
      texte_corr = `${num_alpha(0)} L'abscisse de ${noms[0]} est : $${tex_nombre(x1)}$.<br>`
      texte_corr += `${num_alpha(1)} L'abscisse de ${noms[1]} est : $${tex_nombre(Math.floor(x2))} + ${tex_fraction(calcul(1000 * (x2 - Math.floor(x2))), 1000)}$.<br>`
      texte_corr += `${num_alpha(2)} L'abscisse de ${noms[2]} est : $${tex_fraction(calcul(x3 * 1000), 1000)}$.`

    }
    texte += mathalea2d({ xmin: -1.5, xmax: 35, ymin: -1.5, ymax: 1.5, pixelsParCm: 25, scale: 0.5 }, d1)
    this.liste_questions.push(texte);
    this.liste_corrections.push(texte_corr);
    liste_de_question_to_contenu_sans_numero(this);
  };
  this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Au dixième\n2 : Au centième\n3 : Au millième'];
}




