import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,calcul,choisit_lettres_differentes,lettre_depuis_chiffre} from "/modules/outils.js"
import {point,tracePoint,pointAdistance,labelPoint,droite,droiteParPointEtPerpendiculaire,codageMediatrice,segmentAvecExtremites,cercle,pointIntersectionLC,dansLaCibleCarree,cibleCarree,homothetie,similitude,texteParPoint,mathalea2d} from "/modules/2d.js"
/**
 * Construction de médiatrices avec dispositif d'auto-correction aléatoire
 * Ref 6G25
 * @Auteur Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export default function Construire_mediatrices_6e() {
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Construire des médiatrices avec cible auto-corrective";
  this.consigne = "";
  this.nb_questions = 1;
  this.nb_questions_modifiable = false
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  this.nouvelle_version = function () {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    let result = [0, 0], texte_corr = "", texte = "", num1, num2
    if (sortie_html) {
      num1 = `<tspan dy="5" style="font-size:70%">`
      num2 = `</tspan><tspan dy="-5">)</tspan>`
    }
    else {
      num1 = `_`
      num2 = `)`
    }
    let celluleAlea = function (rang) {
      let lettre = lettre_depuis_chiffre(randint(1, rang))
      let chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    let noms = choisit_lettres_differentes(4, 'QI',true)
    texte = `Construire la médiatrice $(d_1)$ du segment $[${noms[0]}${noms[1]}]$ et la médiatrice $(d_2)$ du segment $[${noms[2]}${noms[3]}]$.<br>`
    texte += `Prolonger les droites $(d_1)$ et $(d_2)$ pour obtenir leur point d'intersection.<br>`
    let marks = ['/', '//', '///', 'x', 'o', 'S', 'V']
    let I = point(0, 0, 'I')
    let A = pointAdistance(I, randint(3, 6))
    let B = similitude(A, I, randint(65, 150), randint(8, 15) / 10)
    let medA = droite(I, A, `(d${num1}1${num2}`), medB = droite(I, B, `(d${num1}2${num2}`)

    let dA = droiteParPointEtPerpendiculaire(A, medA)
    let dB = droiteParPointEtPerpendiculaire(B, medB)
    medA.color = 'blue'
    medB.color = 'green'
    let cA = cercle(A, calcul(randint(25, 40) / 20))
    let cB = cercle(B, calcul(randint(45, 60) / 20))
    let A1 = pointIntersectionLC(dA, cA, noms[0], 1)
    let A2 = pointIntersectionLC(dA, cA, noms[1], 2)
    let B1 = pointIntersectionLC(dB, cB, noms[2], 1)
    let B2 = pointIntersectionLC(dB, cB, noms[3], 2)
    let sA = segmentAvecExtremites(A1, A2)
    let sB = segmentAvecExtremites(B1, B2)
    sA.color = 'black'
    sB.color = 'black'


    let cible, objets_enonce = [], objets_correction = [], cellule
    let xMin, yMin, xMax, yMax
    let nomA1 = texteParPoint(noms[0], homothetie(A1, A2, 1.1), 'milieu', 'black', 1, '', true)
    let nomA2 = texteParPoint(noms[1], homothetie(A2, A1, 1.1), 'milieu', 'black', 1, '', true)
    let nomB1 = texteParPoint(noms[2], homothetie(B1, B2, 1.1), 'milieu', 'black', 1, '', true)
    let nomB2 = texteParPoint(noms[3], homothetie(B2, B1, 1.1), 'milieu', 'black', 1, '', true)

    cellule = celluleAlea(6)
    result = dansLaCibleCarree(I.x, I.y, 6, 0.6, cellule)
    cible = cibleCarree({ x: result[0], y: result[1], rang: 6, taille: 0.6 })
    cible.taille = 0.6
    cible.color = 'orange'
    cible.opacite = 0.7

    objets_enonce.push(cible, sA, sB, nomA1, nomA2, nomB1, nomB2)
    objets_correction.push(cible, sA, sB, tracePoint(I), labelPoint(I), nomA1, nomA2, nomB1, nomB2)
    objets_correction.push(medA, medB, codageMediatrice(A1, A2, 'blue', marks[1]), codageMediatrice(B1, B2, 'green', marks[2]))

    //      objets_correction.push(segment(M[i],N[i],arcenciel(i)),codageMediatrice(M[i],N[i],arcenciel(i+5),marks[i])) 
    //      objets_correction.push(traceCompas(A1,N[i],20),traceCompas(B,N[i],20))
    texte_corr += `Le point $I$ d'intersection des deux médiatrices est dans la case ${cellule} de la grille.<br>`
    xMin = Math.min(A1.x - 1, A2.x - 1, B1.x - 1, B2.x - 1, I.x - 4)
    yMin = Math.min(A1.y - 1, A2.y - 1, B1.y - 1, B2.y - 1, I.y - 4)
    xMax = Math.max(A1.x + 1, A2.x + 1, B1.x + 1, B2.x + 1, I.x + 4)
    yMax = Math.max(A1.y + 1, A2.y + 1, B1.y + 1, B2.y + 1, I.y + 4)

    mathalea.fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.liste_questions.push(texte + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_enonce))
    this.liste_corrections.push(texte_corr + mathalea2d({ xmin: xMin, ymin: yMin, xmax: xMax, ymax: yMax, pixelsParCm: 20, scale: 0.7 }, objets_correction))
    liste_de_question_to_contenu(this)
  }
}

