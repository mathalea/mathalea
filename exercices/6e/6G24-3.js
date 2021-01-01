import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,choisit_lettres_differentes,lettre_depuis_chiffre,arcenciel} from "/modules/outils.js"
import {point,tracePoint,labelPoint,droite,codageMediatrice,segment,traceCompas,dansLaCibleCarree,cibleCarree,translation,homothetie,symetrieAxiale,distancePointDroite,longueur,mathalea2d} from "/modules/2d.js"
/**
 * Construction de symétrique avec dispositif d'auto-correction aléatoire
 * Ref 6G24-3 
 * @Auteur Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function Construire_symetrique_point_6e() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Construire le symétrique d'un point avec cible auto-corrective";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.sup = 3;
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let result = [0, 0], texte_corr = "", nbpoints = parseInt(this.sup),nontrouve,assezloin,cible
    let celluleAlea = function (rang) {
      let lettre = lettre_depuis_chiffre(randint(1, rang))
      let chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    let a = randint(-10, 10), b = randint(-10, 10, a)
    let d = droite(a, b, 0, '(d)')
    let A = translation(point(0, 0), homothetie(d.directeur, point(0, 0), -0.5))
    let B = translation(point(0, 0), homothetie(d.directeur, point(0, 0), 0.5))
    let marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    let noms = choisit_lettres_differentes(nbpoints, 'Q',  true)
    this.consigne = `Construire le symétrique des points $${noms[0]}$`
    for (let i = 1; i < nbpoints - 1; i++) {
      this.consigne += `, $${noms[i]}$`
    }
    this.consigne += ` et $${noms[nbpoints - 1]}$ par rapport à $(d)$.`;
    let cibles = [], M = [], N = [], objets_enonce = [], objets_correction = []  //cibles, M point marqués, N symétrique de M
    let cellules = []
    let xMin, yMin, xMax, yMax
    [xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
    for (let i = 0; i < nbpoints; i++) { //On place les cibles.
      N.push(point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[i] + "\'"))
      nontrouve = true
      while (distancePointDroite(N[i], d) < 3 || nontrouve) {
        nontrouve = true
        if (distancePointDroite(N[i], d) < 3) {
          N[i].x = calcul(randint(-80, 80, 0) / 10)
          N[i].y = calcul(randint(-80, 80, 0) / 10)
        }
        else {
          assezloin = true
          for (let j = 0; j < i; j++) {
            if (longueur(N[i], N[j]) < 4.5) assezloin = false
          }
          if (assezloin == false) {//éloigner les points donc les grilles
            N[i].x = calcul(randint(-80, 80, 0) / 10)
            N[i].y = calcul(randint(-80, 80, 0) / 10)
          }
          else nontrouve = false
        }
      }
    }

    objets_enonce.push(d)
    objets_correction.push(d, tracePoint(A, B))

    for (let i = 0; i < nbpoints; i++) {
      cellules.push(celluleAlea(4))
      result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i])
      cible = cibleCarree({ x: result[0], y: result[1], rang: 4, num: i + 1, taille: 0.6 })
      cible.taille = 0.6
      cible.color = 'orange'
      cible.opacite = 0.7
      cibles.push(cible)
    }
    for (let i = 0; i < nbpoints; i++) {
      M.push(symetrieAxiale(N[i], d, noms[i]))
      objets_enonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i])
      objets_correction.push(tracePoint(M[i], N[i]), labelPoint(M[i], N[i]), cibles[i])
      objets_correction.push(segment(M[i], N[i], arcenciel(i)), codageMediatrice(M[i], N[i], arcenciel(i + 5), marks[i]))
      objets_correction.push(traceCompas(A, N[i], 20), traceCompas(B, N[i], 20))
      texte_corr += `$${noms[i]}\'$, le symétrique du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`
    }

    for (let i = 0; i < nbpoints; i++) {
      xMin = Math.min(xMin, N[i].x - 3, M[i].x - 3)
      yMin = Math.min(yMin, N[i].y - 3, M[i].y - 3)
      xMax = Math.max(xMax, N[i].x + 3, M[i].x + 3)
      yMax = Math.max(yMax, N[i].y + 3, M[i].y + 3)
    }

    mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.liste_questions.push(mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_enonce))
    this.liste_corrections.push(texte_corr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction))
    liste_de_question_to_contenu(this)

    //  let nonchoisi,coords=[],x,y,objets_enonce=[],objets_correction=[],nomd,label_pos

  }
  this.besoin_formulaire_numerique = ['Nombre de points (1 à 5)', 5, "1\n2\n3\n4\n5"];
  // this.besoin_formulaire2_case_a_cocher = ["Avec des points de part et d'autre"];	
}
