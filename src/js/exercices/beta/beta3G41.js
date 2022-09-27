import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'

import { cube } from '../../modules/3d.js'

export const titre = 'Représentation de solides'

/**
* Vue de dessus, face et côté
* @author Erwan DUPLESSY
* 3G41
* mars 2021
* Source : http://cache.media.education.gouv.fr/file/Geometrie_et_espace/47/1/RA16_C4_MATH_geo_espace_flash_567471.pdf
* Dessiner vue de face, côté, dessus d'un empilement de cubes
*/

export default function VuesEmpilementCubes () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1 // A décommenter : valeur par défaut d'un premier paramètre
  this.sup2 = 1 // A décommenter : valeur par défaut d'un deuxième paramètre
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const typesDeQuestionsDisponibles = [parseInt(this.sup)] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection

    function empilementCubes (long, larg, hmax) {
      const tabHauteurs = new Array(larg)
      for (let i = 0; i < larg; i++) {
        tabHauteurs[i] = new Array(long)
      }
      // premiere ligne
      for (let i = 0; i < larg; i++) {
        tabHauteurs[i][0] = randint(0, 1)
      }
      // deuxième ligne et suivantes
      for (let i = 0; i < larg; i++) {
        for (let j = 1; j < long; j++) {
          tabHauteurs[i][j] = Math.min(tabHauteurs[i][j - 1] + randint(0, 2), hmax)
        }
      }
      // Vérification Dernière Ligne : ne pas être vide.
      for (let i = 0; i < larg; i++) {
        tabHauteurs[i][long - 1] = Math.max(1, tabHauteurs[i][long - 1])
      }
      // Ajoute les cubes dans un tableau une dimension
      // il faut trier les cubes : x décroissant puis y décroissant, puis z croissant
      const lstCoordonneesCubes = []
      for (let i = larg - 1; i > -1; i = i - 1) {
        for (let j = long - 1; j > -1; j = j - 1) {
          for (let k = 0; k < tabHauteurs[i][j]; k++) { lstCoordonneesCubes.push([i, j, k]) }
        }
      }
      return lstCoordonneesCubes
    }

    const longueur = 2 + parseInt(this.sup2) // longueur de l'empilement
    const largeur = longueur // largeur de l'empilement
    const hauteur = longueur // hauteur de l'empilement

    for (let q = 0, texte, texteCorr, cpt = 0; q < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsCorrection = [] // Idem pour la correction

      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      let L, alpha, beta, cosa, cosb, sina, sinb

      // ...cube(x,y,z,0,-90) : vue de haut
      // ...cube(x,y,z,90,0) : vue de gauche
      // ...cube(x,y,z,0,0) : vue de droite
      // ...cube(x,y,z,45,-35) : vue isométrique

      switch (listeTypeDeQuestions[q]) {
        case 1:
          // GAUCHE
          alpha = 15
          beta = -30
          texte += 'Solide 1 : dessiner la vue de gauche (les faces grises) de cet empilement de cubes. <br>'
          L = empilementCubes(longueur, largeur, hauteur)
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + ' '
          // correction :
          texteCorr += 'Solide 1 : vue de gauche (les faces grises) : '
          alpha = 90
          beta = 0
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'

          // FACE
          texte += 'Solide 2 : dessiner la vue de face (les faces vertes) de cet empilement de cubes. <br>'
          L = empilementCubes(longueur, largeur, hauteur)
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          alpha = 15
          beta = -30
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + ' '
          // correction :
          texteCorr += 'Solide 2 : vue de face (les faces vertes) : '
          alpha = 0
          beta = 0
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'

          // HAUT
          texte += 'Solide 3 : dessiner la vue de haut (les faces blanches) de cet empilement de cubes. <br>'
          L = empilementCubes(longueur, largeur)
          alpha = 15
          beta = -30
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          alpha = 15
          beta = -30
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + ' '
          // correction :
          texteCorr += 'Solide 3 : vue de haut (les faces blanches) : '
          alpha = 0
          beta = -90
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'
          break

        case 2:
          texte += 'Dessiner les vues de haut (les faces blanches), de face (les faces vertes), et de gauche (les faces grises) de cet empilement de cubes. <br>'
          L = empilementCubes(longueur, largeur)
          alpha = 15
          beta = -30
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + ' '
          alpha = 30
          beta = -25
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + ' '

          // correction :
          texteCorr += 'Vue de haut (les faces blanches) : '
          alpha = 0
          beta = -90
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'

          texteCorr += 'Vue de droite (les faces vertes) : '
          alpha = 0
          beta = 0
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'

          texteCorr += 'Vue de gauche (les faces grises) : '
          alpha = 90
          beta = 0
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 1,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // Si les variables suivantes sont définies, elles provoquent l'affichage des formulaires des paramètres correspondants
  // Il peuvent être de 3 types : _numerique, _case_a_cocher ou _texte.
  // Il sont associés respectivement aux paramètres sup, sup2 et sup3.

  this.besoinFormulaireNumerique = ['Type de questions', 2, '1 : un solide et ses trois vues\n 2 : on demande une vue par solide']
  this.besoinFormulaire2Numerique = ["Taille de l'empilement", 5, '3 \n4 \n5 \n6 \n7']
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
