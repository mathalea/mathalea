import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { cube } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Compter les cubes manquants ou pas'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true

/**
* Compter des cubes
* @author Erwan DUPLESSY
* 6G43
* mars 2021
* Source : http://cache.media.education.gouv.fr/file/Geometrie_et_espace/47/1/RA16_C4_MATH_geo_espace_flash_567471.pdf
* Compter des cubes dans un empilement de cubes
*/

export default function DenombrerCubes () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 3 // Ici le nombre de questions
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
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = [] // tableau à compléter par valeurs possibles des types de questions
    switch (parseInt(this.sup)) {
      case 1:
        typesDeQuestionsDisponibles = [1]
        break
      case 2:
        typesDeQuestionsDisponibles = [2]
        break
      case 3:
        typesDeQuestionsDisponibles = [1, 2]
        break
    }

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
          tabHauteurs[i][j] = Math.min(tabHauteurs[i][j - 1] + randint(1, 2), hmax)
        }
      }
      // Vérification Dernière Ligne : ne pas être vide.
      for (let i = 0; i < larg; i++) {
        tabHauteurs[i][long - 1] = Math.max(2, tabHauteurs[i][long - 1])
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

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let objetsEnonce, objetsCorrection, paramsEnonce, paramsCorrection
    const longueur = 2 + parseInt(this.sup2) // longueur de l'empilement
    const largeur = longueur // largeur de l'empilement
    const hauteur = longueur // hauteur de l'empilement

    for (let q = 0, texte, texteCorr, cpt = 0; q < this.nbQuestions && cpt < 50;) {
      objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      objetsCorrection = [] // Idem pour la correction

      texte = 'Un empilement de cubes est représenté ci-dessous sous deux angles différents. <br>' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.

      let L, alpha, beta, cosa, cosb, sina, sinb

      // début de l'exercice
      switch (listeTypeDeQuestions[q]) {
        case 1:
          texte += 'Combien de petits cubes contient cet empilement de cubes ?' + ajouteChampTexteMathLive(this, q, 'largeur10 inline')
          L = empilementCubes(longueur, largeur, hauteur) // crée un empilement aléatoire
          // dessin 1
          alpha = 30 // choix de la projection
          beta = -25 // choix de la projection
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
            scale: 0.6,
            mainlevee: false,
            style: 'display: inline'
          }
          texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce) + ' '
          // dessin 2
          alpha = 15
          beta = -30
          objetsEnonce = []
          for (let i = 0; i < L.length; i++) {
            objetsEnonce.push(...cube(L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          paramsEnonce = {
            xmin: -sina * largeur - 0.5,
            ymin: -0.5,
            xmax: cosa * longueur + 0.5,
            ymax: -sina * sinb * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 0.6,
            mainlevee: false,
            style: 'display: inline'
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce)
          // correction :
          texteCorr += "On peut représenter l'empilement par tranches : <br>"
          alpha = 30
          beta = -25
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -3 * sina * largeur - 0.5,
            ymin: -0.5,
            xmax: 3 * cosa * longueur + 0.5,
            ymax: -sina * sinb * 3 * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 0.6,
            mainlevee: false,
            style: 'display: inline'
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(3 * L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'
          texteCorr += `Il y a au total ${L.length} cubes.`
          setReponse(this, q, L.length)
          break

        case 2:
          texte += `Combien de petits cubes manque-t-il pour reconstruire un grand cube de côté ${longueur} ?` + ajouteChampTexteMathLive(this, q, 'largeur10 inline')
          L = empilementCubes(longueur, largeur, hauteur)
          // dessin 1
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
            scale: 0.6,
            mainlevee: false,
            style: 'display: inline'
          }
          texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce) + ' '
          // dessin 2
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
            scale: 0.6,
            mainlevee: false,
            style: 'display: inline'
          }
          texte += mathalea2d(paramsEnonce, objetsEnonce) + '<br>'
          // correction :
          texteCorr += "On peut, par exemple, représenter l'empilement par tranches : <br>"
          alpha = 30
          beta = -25
          cosa = Math.cos(alpha * Math.PI / 180)
          sina = Math.sin(alpha * Math.PI / 180)
          cosb = Math.cos(beta * Math.PI / 180)
          sinb = Math.sin(beta * Math.PI / 180)
          paramsCorrection = {
            xmin: -3 * sina * largeur - 0.5,
            ymin: -0.5,
            xmax: 3 * cosa * longueur + 0.5,
            ymax: -sina * sinb * 3 * longueur - cosa * sinb * largeur + cosb * hauteur + 0.5,
            pixelsParCm: 20,
            scale: 0.6,
            mainlevee: false
          }
          objetsCorrection = []
          for (let i = 0; i < L.length; i++) {
            objetsCorrection.push(...cube(3 * L[i][0], L[i][1], L[i][2], alpha, beta, {}).c2d)
          }
          texteCorr += mathalea2d(paramsCorrection, objetsCorrection) + '<br>'
          texteCorr += `Il y a au total $${L.length}$ cubes. On en veut $${longueur}\\times ${largeur} \\times ${hauteur} = ${longueur * largeur * hauteur}$. <br>`
          texteCorr += `Il manque $${longueur * largeur * hauteur - L.length}$ cubes.`
          setReponse(this, q, longueur * largeur * hauteur - L.length)
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

  this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Compter les cubes\n2 : Compter les cubes manquants\n3 : Mélange']
  this.besoinFormulaire2Numerique = ["Taille de l'empilement n + 2. Saisir n (1 à 5)", 5]
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
