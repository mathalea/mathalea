import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, texteEnCouleurEtGras } from '../../modules/outils.js'
import { point, tracePoint, segment, texteParPosition, latexParCoordonnees } from '../../modules/2d.js'

export const titre = 'Placer un événement sur une échelle de probabilités'

/**
 * Placer un événement sur une échelle de probabilités.
 * @author Erwan Duplessy
 * Référence 5S20
 */
// Source : https://pedagogie.ac-guadeloupe.fr/sites/default/files/File/flouvet/ra16_c4_math_probabilite_flash_pdf_69131.pdf
export const uuid = '86db6'
export const ref = '5S20'
export default function PlacerProbabilites () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.sup = true
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const lstEvenenementA = [] // liste des évènements disponibles : p === 0 ou p === 1
    const lstEvenenementB = [] // liste des évènements disponibles : p < 0.5
    const lstEvenenementC = [] // liste des évènements disponibles : p = 0.5
    const lstEvenenementD = [] // liste des évènements disponibles : p > 0.5
    const nbEvenement = 4 // nombre d'évènements dans l'énoncé
    let texte = ''
    // liste de vocabulaire. Le nombre donne la position sur l'axe.
    const lstEchelle = [['Impossible', 0],
      ['Improbable', 1 / 6],
      ['Peu probable', 2 / 6],
      ['Une chance sur deux', 3 / 6],
      ['Probable', 4 / 6],
      ['Très probable', 5 / 6],
      ['Certain', 1]]

    // Evenements impossibles :
    lstEvenenementA.push(['Que l\'équipe de France de rugby remporte le prochain match international de football', 0])
    const animal = choice(['un dragon', "l'abominable homme des neiges", 'un chat-garou', 'un dahu', 'un hippocampéléphantocamélos', 'une licorne', 'le Minotaure'])
    lstEvenenementA.push([`Rencontrer ${animal} en sortant du collège`, 0])
    lstEvenenementA.push(['Le point M, placé à 4 cm de A, est sur le cercle de centre A et de rayon 7 cm', 0])
    lstEvenenementA.push(['Le point M, placé à 4 cm de A, est dans le disque de centre A et de rayon 3 cm', 0])
    lstEvenenementA.push(['En France, trouver des vaches espagnoles qui parlent anglais', 0])
    lstEvenenementA.push(['Aux USA, trouver des pierres qui roulent et qui amassent de la mousse', 0])
    // Evenements improbables :
    lstEvenenementB.push(['Gagner le gros lot au loto', 0.05])
    lstEvenenementB.push(['Qu\'il y ait de la neige à Nice en juillet', 0.05])
    const carte = choice(['un As', 'un Roi', 'une Dame', 'un Valet', 'un 10', 'un 9', 'un 8', 'un 7', 'un 6', 'un 5', 'un 4', 'un 3', 'un 2'])
    lstEvenenementB.push([`Obtenir ${carte} en prenant une carte au hasard dans un jeu traditionnel de 52 cartes`, 0.08])
    // Evenements peu probables :
    lstEvenenementB.push(['Choisir une balle rouge dans un sac contenant une balle rouge et trois balles vertes', 0.25])
    // Evenements Une chance sur deux :
    lstEvenenementC.push(['Obtenir ' + choice(['pile', 'face']) + ' quand on lance une pièce équilibrée d\'un euro', 0.5])
    lstEvenenementC.push(['Obtenir une carte ' + choice(['rouge', 'noire']) + ' dans un jeu traditionnel de 52 cartes', 0.5])
    // Evenements probables :
    lstEvenenementD.push(['Qu\'il ne pleuve pas en Bretagne ce prochain 12 juillet', 0.6])
    // Evenements très probables :
    lstEvenenementD.push(['Que le prochain président de la République Française ait plus de 40 ans', 0.9])
    // Evenements certains :
    lstEvenenementA.push(['Que le prochain oiseau que je verrai ait des ailes.', 1])
    lstEvenenementA.push(['Que le point M, placé à 4 cm de A, soit sur le cercle de centre A et de rayon 4 cm.', 1])
    lstEvenenementA.push(['Que le point M, placé à 4 cm de A, soit dans le disque de centre A et de rayon 5 cm.', 1])
    // Evenement divers :
    const m = choice([4, 6, 8, 10, 12, 20, 24, 30, 48, 60, 100]) // nombre de faces du dé
    const n = randint(1, m) // nombre à obtenir
    lstEvenenementB.push([`Obtenir ${n} avec un dé à ${m} faces`, 1 / m])
    if ((m - n + 1) / m < 0.5) {
      lstEvenenementB.push([`Obtenir un nombre supérieur ou égal à ${n} avec un dé équilibré à ${m} faces`, (m - n + 1) / m])
    } else {
      lstEvenenementD.push([`Obtenir un nombre supérieur ou égal à ${n} avec un dé équilibré à ${m} faces`, (m - n + 1) / m])
    }
    if (n / m < 0.5) {
      lstEvenenementB.push([`Obtenir un nombre inférieur ou égal à ${n} avec un dé équilibré à ${m} faces`, n / m])
    } else {
      lstEvenenementD.push([`Obtenir un nombre inférieur ou égal à ${n} avec un dé équilibré à ${m} faces`, n / m])
    }

    // choix des évènements :
    let lstEvenenementExo = []
    lstEvenenementExo.push(choice(lstEvenenementA, lstEvenenementExo)) // p === 0 ou p === 1
    lstEvenenementExo.push(choice(lstEvenenementB, lstEvenenementExo)) // p < 0.5
    lstEvenenementExo.push(choice(lstEvenenementC, lstEvenenementExo)) // p = 0.5
    lstEvenenementExo.push(choice(lstEvenenementD, lstEvenenementExo)) // p > 0.5
    lstEvenenementExo = shuffle(lstEvenenementExo)

    // Texte de l'énoncé :
    texte += 'Placer la lettre correspondant à chaque évènement sur l\'axe des probabilités ci-dessous.<br>'
    for (let i = 0; i < nbEvenement; i++) {
      texte += String.fromCharCode(65 + i) + ' : ' + lstEvenenementExo[i][0] + '.<br>'
    }
    // Création des objets pour dessiner :
    const L = 10 // longueur du segment

    const lstObjet = [] // tous les objets qui seront dessinés
    const h = 0.25 // hauteur trait
    lstObjet.push(segment(0, 0, L, 0)) // axe
    lstObjet.push(segment(0, -h, 0, h)) // trait gauche
    lstObjet.push(segment(L, -h, L, h)) // trait central
    lstObjet.push(segment(L / 2, -h, L / 2, h)) // trait droit
    let angle = 60 // inclinaison du texte légende
    const y = -0.5
    if (this.sup) {
      for (let j = 0; j < lstEchelle.length; j++) {
        lstObjet.push(texteParPosition(lstEchelle[j][0], L * lstEchelle[j][1], y, angle, 'black', 1, 'gauche'))
      }
    } else {
      lstObjet.push(latexParCoordonnees('\\dfrac{1}{2}', L / 2, -1, 'black', 20, 40, 'white', 6))
      lstObjet.push(latexParCoordonnees('0', 0, y - 0.25, 'black', 20, 20, 'white', 6)) // abscisse 0
      lstObjet.push(latexParCoordonnees('1', L, y - 0.25, 'black', 20, 20, 'white', 6)) // abscisse 1
    }

    if (context.isHtml) {
      texte += '<p style="display:block">'
    } else {
      texte += '\\begin{center}'
    }
    let miny = -2
    if (this.sup) {
      miny = -4
    }

    texte += mathalea2d({ xmin: -1, xmax: L + 3, ymin: miny, ymax: 1, pixelsParCm: 40, scale: 1 }, lstObjet)
    if (context.isHtml) {
      texte += '</p>'
    } else {
      texte += '\\end{center}'
    }

    // CORRECTION :
    let texteCorr = ' '
    const ylst = [0, 0, 0, 0, 0, 0, 0] // ordonnées des textes réponses
    angle = 0 // inclinaison du texte réponse
    let p = 0 // probabilité de l'événement
    let parrondi = 0 // arrondi de la proba au sixième près
    for (let i = 0; i < nbEvenement; i++) {
      p = lstEvenenementExo[i][1]
      parrondi = Math.round(6 * p) // échelle arrondie entre 0 et 7 pour éviter la superposition des textes réponses
      ylst[parrondi] += 0.5 // on augmente l'ordonnée si elle est déjà utilisée
      const txtSolution = String.fromCharCode(65 + i) // code 65 correspond à 'A'
      lstObjet.push(texteParPosition(txtSolution, L * p, ylst[parrondi], 0, 'black', 1, 'middle'))
      lstObjet.push(tracePoint(point(L * p, 0), 'blue'))
    }
    for (let i = 0; i < nbEvenement; i++) {
      p = lstEvenenementExo[i][1]
      if (p === 0) { parrondi = 0 } else if (p < 0.25) { parrondi = 1 } else if (p < 0.5) { parrondi = 2 } else if (p === 0.5) { parrondi = 3 } else if (p < 0.75) { parrondi = 4 } else if (p < 1) { parrondi = 5 } else if (p === 1) { parrondi = 6 };
      texteCorr += String.fromCharCode(65 + i) + ' : ' + lstEvenenementExo[i][0] + '. ' + texteEnCouleurEtGras(lstEchelle[parrondi][0]) + '.<br>'
    }
    if (context.isHtml) {
      texteCorr += '<p style="display:block">'
    } else {
      texteCorr += '\\begin{center}'
    }
    texteCorr += mathalea2d({ xmin: -1, xmax: L + 3, ymin: miny, ymax: 2, pixelsParCm: 40, scale: 1 }, lstObjet)
    if (context.isHtml) {
      texteCorr += '</p>'
    } else {
      texteCorr += '\\end{center}'
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque question.
  }
  this.besoinFormulaireCaseACocher = ['Changer le type d\'axe']
}
