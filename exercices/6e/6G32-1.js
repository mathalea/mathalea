import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu_sans_numero,randint,shuffle,combinaison_listes,lettre_depuis_chiffre,texcolors,texte_gras} from "/modules/outils.js"
import {point,tracePoint,labelPoint,droite,segment,demiDroite,polygone,codeAngle,texteParPosition,mathalea2d} from "/modules/2d.js"
/**
 * Ref 6G32-1
 * Publié le 26/10/2020
 * @Auteur Jean-Claude Lhote
 */
export default function Symetrie_axiale_conservation1() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Propriétés de conservation de la symétrie axiale";
  this.consigne = "";
  this.nb_questions = 4;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 1;

  this.nouvelle_version = function () {
    let type_de_questions_disponibles = ["Segment", "Droite", "1/2droite", "Triangle", "Angle"];
    let points = [], traces = [], nom = [], alternance
    for (let i = 0; i < 25; i++) nom.push(lettre_depuis_chiffre(i + 1))
    let noms = shuffle(nom)

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    this.liste_questions.push(`${texte_gras('Dans la symétrie d\'axe (d)...')}`);
    this.liste_corrections.push(`${texte_gras('Dans la symétrie d\'axe (d)...')}`);
    // On prépare la figure...
    let axe = parseInt(this.sup)
    let d, nonchoisi, coords = [], x, y, objets_enonce = [], objets_correction = [], nomd, label_pos
    if (axe == 5) axe = randint(1, 4) //choix de l'axe et des coordonnées
    switch (axe) {
      case 1: d = droite(1, 0, 0);
        nomd = texteParPosition('(d)', 0.3, 5.6)
        label_pos = 'above left'
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            [x, y] = [randint(-5, 0), randint(-5, 5)]
            nonchoisi = true
            for (let j = 0; j < i; j++)
              if (coords[j][0] == x && coords[j][1] == y) nonchoisi = false
          }
          coords.push([x, y]) //on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) coords.push([-coords[j][0], coords[j][1]]) // on stocke les 12 images
        break;
      case 2: d = droite(0, 1, 0);
        label_pos = 'above'
        nomd = texteParPosition('(d)', 5.6, 0.3)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            [x, y] = [randint(-5, 5), randint(-5, 0)]
            nonchoisi = true
            for (let j = 0; j < i; j++)
              if (coords[j][0] == x && coords[j][1] == y) nonchoisi = false
          }
          coords.push([x, y]) //on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) coords.push([coords[j][0], -coords[j][1]]) // on stocke les 12 images
        break;
      case 3: d = droite(1, -1, 0);
        label_pos = 'above'
        nomd = texteParPosition('(d)', -5.8, -5.4)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ?
            x = randint(-5, 5)
            y = randint(x, 5)
            nonchoisi = true
            for (let j = 0; j < i; j++)
              if (coords[j][0] == x && coords[j][1] == y) nonchoisi = false
          }
          coords.push([x, y]) //on stocke les 12 points
        }
        for (let j = 0; j < 12; j++) coords.push([coords[j][1], coords[j][0]]) // on stocke les 12 images
        break;
      case 4: d = droite(1, 1, 0);
        label_pos = 'above'
        nomd = texteParPosition('(d)', -5.8, 5.4)
        for (let i = 0; i < 12; i++) {
          nonchoisi = false
          while (!nonchoisi) { // Le nouveau point est-il déjà dans la liste ? Si oui, on recommence.
            x = randint(-5, 5)
            y = randint(-5, -x)
            nonchoisi = true
            for (let j = 0; j < i; j++)
              if (coords[j][0] == x && coords[j][1] == y)
                nonchoisi = false;
          }
          coords.push([x, y]) //on stocke les 12 points
        }
        for (let j = 0; j < 12; j++)
          coords.push([-coords[j][1], -coords[j][0]]); // on stocke les 12 images
        break;
    }
    for (let i = 0; i < 24; i++) {
      if (i < 12) points.push(point(coords[i][0], coords[i][1], noms[i], label_pos))
      else if (coords[i][0] == coords[i - 12][0] && coords[i][1] == coords[i - 12][1]) {
        points.push(point(coords[i][0], coords[i][1], noms[i - 12], label_pos))
        noms[i] = noms[i - 12]
      }
      else points.push(point(coords[i][0], coords[i][1], noms[i], label_pos))
      traces.push(tracePoint(points[i]));
    }
    // On rédige les questions et les réponses
    if (this.sup2 == true) alternance = 2
    else alternance = 1
    function index(i) {
      return (i + 12 * (i % alternance)) % 24
    }
    objets_enonce.length = 0
    objets_correction.lenght = 0
    for (let i = 0, texte, texte_corr,s1,s2,choix, cpt = 0; i < this.nb_questions && cpt < 50;) {

      switch (liste_type_de_questions[i]) {
        case "Segment":
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = `Quel est le symétrique du segment $[${noms[index(choix)]}${noms[index(choix + 1)]}]$ ?`
          texte_corr = `Le symétrique du segment $[${noms[index(choix)]}${noms[index(choix + 1)]}]$ est le segment $[${noms[index(choix + 12)]}${noms[index(choix + 13)]}]$.`
          s1 = segment(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2))
          s2 = segment(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2))
          s1.epaisseur = 2
          s2.epaisseur = 2
          objets_correction.push(s1, s2)
          break;
        case "Droite":
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = `Quel est la symétrique de la droite $(${noms[index(choix)]}${noms[index(choix + 1)]})$ ?`
          texte_corr = `La symétrique de la droite $(${noms[index(choix)]}${noms[index(choix + 1)]})$ est la droite $(${noms[index(choix + 12)]}${noms[index(choix + 13)]})$.`
          objets_correction.push(droite(points[index(choix)], points[index(choix + 1)], "", texcolors(i * 3 + 2)))
          objets_correction.push(droite(points[index(choix + 12)], points[index(choix + 13)], "", texcolors(i * 3 + 2)))
          break;
        case "1/2droite":
          choix = randint(0, 10) + randint(0, 1) * 12
          texte = `Quel est la symétrique de la demi-droite $[${noms[index(choix)]}${noms[index(choix + 1)]})$ ?`
          texte_corr = `La symétrique de la demi-droite $[${noms[index(choix)]}${noms[index(choix + 1)]})$ est la demi-droite $[${noms[index(choix + 12)]}${noms[index(choix + 13)]})$`
          objets_correction.push(demiDroite(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2)))
          objets_correction.push(demiDroite(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2)))
          break;
        case "Triangle":
          choix = randint(0, 9) + randint(0, 1) * 12
          texte = `Quel est le symétrique du triangle $${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}$ ?`
          texte_corr = `Le symétrique du triangle $${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}$ est le triangle $${noms[index(choix + 12)]}${noms[index(choix + 13)]}${noms[index(choix + 14)]}$.`
          objets_correction.push(polygone([points[index(choix)], points[index(choix + 1)], points[index(choix + 2)]], texcolors(i * 3 + 2)))
          objets_correction.push(polygone([points[index(choix + 12)], points[index(choix + 13)], points[index(choix + 14)]], texcolors(i * 3 + 2)))
          break;
        case "Angle":
          choix = randint(0, 9) + randint(0, 1) * 12
          texte = `Quel est le symétrique de l'angle $\\widehat{${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}}$ ?`
          texte_corr = `Le symétrique de l'angle $\\widehat{${noms[index(choix)]}${noms[index(choix + 1)]}${noms[index(choix + 2)]}}$ est l'angle $\\widehat{${noms[index(choix + 12)]}${noms[index(choix + 13)]}${noms[index(choix + 14)]}}$.`
          objets_correction.push(codeAngle(points[index(choix)], points[index(choix + 1)], points[index(choix + 2)], 2, '', texcolors(i * 3 + 2), 2, 0.5, texcolors(i * 3 + 2), 0.2))
          objets_correction.push(codeAngle(points[index(choix + 12)], points[index(choix + 13)], points[index(choix + 14)], 2, '', texcolors(i * 3 + 2), 2, 0.5, texcolors(i * 3 + 2), 0.2))
          objets_correction.push(segment(points[index(choix)], points[index(choix + 1)], texcolors(i * 3 + 2)))
          objets_correction.push(segment(points[index(choix + 1)], points[index(choix + 2)], texcolors(i * 3 + 2)))
          objets_correction.push(segment(points[index(choix + 12)], points[index(choix + 13)], texcolors(i * 3 + 2)))
          objets_correction.push(segment(points[index(choix + 13)], points[index(choix + 14)], texcolors(i * 3 + 2)))

          break;
      }

      if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    d.isVisible = true;
    objets_enonce.push(nomd, d);
    objets_correction.push(nomd, d);
    for (let i = 0; i < 24; i++) {
      objets_enonce.push(labelPoint(points[i]), tracePoint(points[i], 'blue'))
      objets_correction.push(labelPoint(points[i]), tracePoint(points[i], 'blue'))

    }
    this.liste_questions.push(mathalea2d({ xmin: -6, ymin: -6, xmax: 6, ymax: 6, pixelsParCm: 40, scale: 1 }, objets_enonce))
    this.liste_corrections.push(mathalea2d({ xmin: -6, ymin: -6, xmax: 6, ymax: 6, pixelsParCm: 40, scale: 1 }, objets_correction))
    liste_de_question_to_contenu_sans_numero(this);

  }
  this.besoin_formulaire_numerique = ['Type d\'axe', 5, "1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique 1\n4 : Axe oblique 2\n5 : Axe aléatoire"];
  this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];
}


