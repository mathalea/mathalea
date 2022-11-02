import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, numAlpha, range1, contraindreValeur, compteOccurences, shuffle, enleveDoublonNum } from '../../modules/outils.js'
import { cube } from '../../modules/3d.js'
import { context } from '../../modules/context.js'
export const titre = "Dessiner différentes vues d'un empilement de cubes"
export const dateDePublication = '06/10/2022'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
* Dessiner différentes vues d'un empilement de cubes
* @author Eric Elter (sur un début d'exercices d'Erwan Duplessy)
* Source : http://cache.media.education.gouv.fr/file/Geometrie_et_espace/47/1/RA16_C4_MATH_geo_espace_flash_567471.pdf
*/

export const uuid = '136dd'
export const ref = '3G41'
export default function VuesEmpilementCubes () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.sup = 1
  this.sup2 = 7
  this.sup3 = 3
  this.nbQuestions = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    let listeVuesPossibles = []
    let objetsEnonce, objetsCorrection

    // Fonction made in Erwan DUPLESSY
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
      tabHauteurs[randint(0, larg - 1)][long - 1] = hmax
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

    for (let q = 0, vuePossible, alpha, beta, consigneAMC, texteAMC, texte, texteCorr, cpt = 0; q < this.nbQuestions && cpt < 50;) {
      if (!this.sup2) { // Si aucune liste n'est saisie
        listeVuesPossibles = range1(6)
      } else {
        if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
          listeVuesPossibles[0] = contraindreValeur(1, 7, this.sup2, 7)
        } else {
          listeVuesPossibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
          for (let i = 0; i < listeVuesPossibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
            listeVuesPossibles[i] = contraindreValeur(1, 7, parseInt(listeVuesPossibles[i]), 7) // parseInt en fait un tableau d'entiers
          }
        }
      }
      if (compteOccurences(listeVuesPossibles, 7) > 0) listeVuesPossibles = shuffle([randint(1, 2), randint(3, 4), randint(5, 6)])
      else {
        listeVuesPossibles = enleveDoublonNum(listeVuesPossibles)
        listeVuesPossibles = shuffle(listeVuesPossibles)
      }
      for (let ee = 1; ee < 7; ee++) {
        if (!listeVuesPossibles.includes(ee)) listeVuesPossibles.push(ee)
      }
      listeVuesPossibles = listeVuesPossibles.map(x => x - 1)

      objetsEnonce = []
      objetsCorrection = []

      texte = ''
      texteCorr = ''

      const vue = [['gauche', 90, 0], ['droite', -90, 0], ['dessus', 0, -90], ['dessous', 0, 90], ['face', 0, 0], ['dos', 180, 0]]
      // ...cube(x,y,z,0,-90) : vue de haut
      // ...cube(x,y,z,90,0) : vue de gauche
      // ...cube(x,y,z,0,0) : vue de face
      // ...cube(x,y,z,45,-35) : vue isométrique
      const colorD = context.isAmc ? choice(['white', 'gray', 'darkgray']) : choice(['red', 'blue', 'green', 'gray'])
      const colorT = context.isAmc ? choice(['white', 'gray', 'darkgray'], [colorD]) : choice(['white', 'yellow'])
      const colorG = context.isAmc ? choice(['white', 'gray', 'darkgray'], [colorD, colorT]) : choice(['red', 'blue', 'green', 'gray'], [colorD])
      const longueur = Math.floor((this.sup % 100) / 10) < 2 ? randint(2, 6) : Math.floor((this.sup % 100) / 10)
      const largeur = Math.floor(this.sup / 100) < 2 ? randint(2, 6) : Math.floor(this.sup / 100)
      const hauteur = this.sup % 10 < 2 ? randint(2, 6) : this.sup % 10

      texte += 'Voici un solide composé par un empilement de cubes, présenté de deux façons différentes. <br>'

      alpha = 30
      beta = -30
      const L = empilementCubes(longueur, largeur, hauteur)
      objetsEnonce = []
      for (let i = 0; i < L.length; i++) {
        objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, { colorD: colorD, colorT: colorT, colorG: colorG }).c2d)
      }
      texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'inline' }), objetsEnonce) + ' '
      alpha = 10
      beta = -30
      objetsEnonce = []
      for (let i = 0; i < L.length; i++) {
        objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, { colorD: colorD, colorT: colorT, colorG: colorG }).c2d)
      }
      texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'
      consigneAMC = texte
      if (context.isAmc) {
        this.autoCorrection[q] =
      {
        enonce: consigneAMC + '<br>',
        propositions: []
      }
      }
      for (let ee = 0; ee < this.sup3; ee++) {
        vuePossible = listeVuesPossibles[ee]
        texteAMC = this.sup3 > 1 ? numAlpha(ee) + ' ' : ''
        texteAMC += `Dessiner la vue de ${vue[vuePossible][0]} de ce solide.`
        texte += texteAMC + '<br>'
        // correction :
        texteCorr += this.sup3 > 1 ? numAlpha(ee) + ' ' : ''
        texteCorr += `Voici la vue de ${vue[vuePossible][0]} de ce solide. <br>`
        alpha = vue[vuePossible][1]
        beta = vue[vuePossible][2]
        objetsCorrection = []
        for (let i = 0; i < L.length; i++) {
          objetsCorrection.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, { colorD: colorD, colorT: colorT, colorG: colorG }).c2d)
        }
        texteCorr += mathalea2d(fixeBordures(objetsCorrection), objetsCorrection) + '<br>'
        if (context.isAmc) {
          this.autoCorrection[q].propositions.push({
            type: 'AMCOpen',
            propositions: [
              {
                texte: ' ',
                statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                enonce: texteAMC, // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
                sanscadre: false, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                pointilles: false
              }
            ]
          }
          )
        }
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

  this.besoinFormulaireNumerique = ['Longueur, largeur et hauteur', 999, 'Le nombre choisi doit être sous la forme abc :\na : la longueur du solide\nb : la largeur du solide\nc : la hauteur du solide\nChoisir 0 ou 1 si on souhaite laisser le hasard faire.']
  this.besoinFormulaire2Texte = ['Vues possibles dans les questions ', 'Choix séparés par des tirets\n1 : Gauche\n2 : Droite\n3 : Dessus\n4 : Dessous \n5 : Face\n6 : Dos\n7 : Toutes']
  this.besoinFormulaire3Numerique = ['Nombre de vues demandé', 6, 'De 1 à 6']
}
