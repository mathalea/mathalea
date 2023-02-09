import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice } from '../../modules/outils.js'
import { point, polygone, grille, texteParPosition, segment } from '../../modules/2d.js'
import { degCos, degSin } from '../../modules/fonctionsMaths.js'

export const amcReady = true
export const amcType = 'AMCOpen'
export const titre = 'Programmer des déplacements relatifs (Scratch)'
export const dateDePublication = '05/02/2023'

/**
 * * Colorier le déplacement d'un lutin
 * * 6I10-2
 * @author Guillaume Valmont // d'après 6I10 de Erwan Duplessy
 */
export const uuid = 'c8fe9'
export const ref = '6I10'
export default function ColorierDeplacement () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'Scratch'
  this.sup = 1 // nombre de commandes = this.sup + 2
  this.sup2 = false // 1 : sans boucle ; true : avec boucle
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.titre = titre
  this.consigne = 'Dans le quadrillage, effectuer le programme.'
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.listePackages = 'scratch3' // pour dessiner les blocs en LaTeX/Tikz

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    const lstObjet = [] // liste de tous les objets Mathalea2d
    let direction = 0 // Orientation du lutin en degrés
    function scratchblocksTikz (codeSvg, codeTikz) {
      // c'est une ancienne façon de faire. Maintenant il existe une fonction scratchblock() qui effectue la conversion scratch Latex -> scratchblock
      if (context.isHtml) {
        return codeSvg
      } else {
        return codeTikz
      };
    };
    function calculerDeplacementsLutin (rotation, deplacement) {
      let ajoutX = 0
      let ajoutY = 0
      switch (rotation) {
        case 0:
          direction = (direction + 90 + 360) % 360
          break
        case 1:
          direction = (direction - 90 + 360) % 360
          break
      }
      switch (deplacement) {
        case 2:
          ajoutX = degCos(direction)
          ajoutY = degSin(direction)
          break
        case 3:
          ajoutX = -degCos(direction)
          ajoutY = -degSin(direction)
          break
      }
      return [ajoutX, ajoutY]
    }

    function fleche (x, y, direction) {
      let depart, arrivee
      console.log(direction)
      switch (direction) {
        case 0: // est
          depart = [x + 0.2, y - 0.5]
          arrivee = [x + 0.8, y - 0.5]
          break
        case 90: // nord
          depart = [x + 0.5, y - 0.8]
          arrivee = [x + 0.5, y - 0.2]
          break
        case 180: // ouest
          depart = [x + 0.8, y - 0.5]
          arrivee = [x + 0.2, y - 0.5]
          break
        case 270: // sud
          depart = [x + 0.5, y - 0.2]
          arrivee = [x + 0.5, y - 0.8]
          break
      }
      const fleche = segment(point(depart[0], depart[1]), point(arrivee[0], arrivee[1]))
      fleche.styleExtremites = '->'
      fleche.color = colorToLatexOrHTML('white')
      return fleche
    }
    let texte = '' // texte de l'énoncé
    let texteCorr = '' // texte du corrigé
    let codeTikz = '' // code pour dessiner les blocs en tikz
    let codeSvg = '' // code pour dessiner les blocs en svg
    const nbCommandes = Number(parseInt(this.sup)) + 2 // nombre de commandes de déplacement dans un script
    let nbRepetition = 1 // Nombre de fois où la boucle est répétée.
    if (this.sup2) {
      nbRepetition = 3
    }
    const lstCommandesTikz = ['\\blockmove{Tourner à gauche}', '\\blockmove{Tourner à droite}', '\\blockmove{Avancer}', '\\blockmove{Reculer}', '\\blockmove{Colorier la case}']
    const lstCommandesSVG = ['Tourner à gauche', 'Tourner à droite', 'Avancer', 'Reculer', 'Colorier']
    codeTikz += '\\medskip \\begin{scratch} <br>'
    codeSvg += '<pre class=\'blocks\'>'
    const lstNumCommande = [] // liste des commandes successives
    const lstDeplacements = [] // Liste des [ajoutX, ajoutY] successifs
    const lstX = [0] // liste des abscisses successives
    const lstY = [0] // liste des ordonnées successives
    if (this.sup2) {
      codeSvg += `répéter (${nbRepetition}) fois <br>`
      codeTikz += `\\blockrepeat{répéter \\ovalnum{${nbRepetition}} fois} {`
    }
    for (let i = 0; i < nbCommandes; i++) {
      const rotation = choice([0, 1]) // choix d'une rotation
      const deplacement = this.sup3 ? choice([2, 3]) : 2 // choix d'un déplacement
      codeTikz += lstCommandesTikz[rotation] // ajout d'une rotation
      codeSvg += lstCommandesSVG[rotation] + '<br>' // ajout d'une rotation
      codeTikz += lstCommandesTikz[deplacement] // ajout d'un déplacement
      codeSvg += lstCommandesSVG[deplacement] + '<br>' // ajout d'un déplacement
      codeTikz += lstCommandesTikz[4] // ajout de l'instruction "Colorier"
      codeSvg += lstCommandesSVG[4] + '<br>' // ajout de l'instruction "Colorier"
      lstNumCommande.push(rotation, deplacement) // ajout d'une rotation et d'un déplacement
      lstNumCommande.push(4) // ajout de l'instruction "Colorier"
      const ajoutXY = calculerDeplacementsLutin(rotation, deplacement)
      lstX.push(lstX[lstX.length - 1] + ajoutXY[0]) // calcul de la nouvelle abscisse
      lstY.push(lstY[lstY.length - 1] + ajoutXY[1]) // calcul de la nouvelle ordonnée
      lstDeplacements.push(ajoutXY)
    }
    for (let k = 0; k < nbRepetition - 1; k++) {
      for (let i = k * lstNumCommande.length; i < (k + 1) * lstNumCommande.length; i += 3) {
        const ajoutXY = calculerDeplacementsLutin(lstNumCommande[i % lstNumCommande.length], lstNumCommande[(i + 1) % lstNumCommande.length])
        lstX.push(ajoutXY[0])
        lstY.push(ajoutXY[1])
      }
    }
    if (this.sup2) {
      codeSvg += 'fin <br>'
      codeTikz += '}'
    }
    codeSvg += '</pre>'
    codeTikz += '\\end{scratch}'

    const xLutinMin = Math.min(...lstX)
    const xLutinMax = Math.max(...lstX)
    const yLutinMin = Math.min(...lstY)
    const yLutinMax = Math.max(...lstY)

    if (context.isHtml) {
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}[t]{.25\\textwidth}'
    }

    texte += scratchblocksTikz(codeSvg, codeTikz)

    if (context.isHtml) {
      texte += '</td><td>'
      texte += '             '
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
    }

    const xGrilleMin = xLutinMin - 2
    const xGrilleMax = xLutinMax + 3
    const yGrilleMin = yLutinMin - 3
    const yGrilleMax = yLutinMax + 2

    const r2 = grille(xGrilleMin, yGrilleMin, xGrilleMax, yGrilleMax, 'black', 0.8, 1)
    lstObjet.push(r2)

    let p // carré gris représentant le lutin en position de départ
    p = polygone(point(lstX[0], lstY[0]), point(lstX[0] + 1, lstY[0]), point(lstX[0] + 1, lstY[0] - 1), point(lstX[0], lstY[0] - 1))
    p.opacite = 0.5
    p.couleurDeRemplissage = colorToLatexOrHTML('black')
    p.opaciteDeRemplissage = 0.5
    p.epaisseur = 0
    lstObjet.push(p, fleche(lstX[0], lstY[0], 0))
    let txt = '' // variable temporaire
    for (let j = 0; j < (xGrilleMax - xGrilleMin); j++) {
      txt = String.fromCharCode(65 + j) // ascii 65 = A
      lstObjet.push(texteParPosition(txt, xGrilleMin + j + 0.5, yGrilleMax + 0.5, 'milieu', 'black', 1)) // affiche de A à J... en haut de la grille
    }
    for (let i = 0; i < (yGrilleMax - yGrilleMin); i++) {
      lstObjet.push(texteParPosition(String(i), xGrilleMin - 0.25, yGrilleMax - i - 0.5, 'gauche', 'black', 1)) // affiche de 0 à 9... à gauche de la grille
    }

    texte += 'Au départ, le lutin est situé dans la case grisée et regarde vers la droite. Chaque déplacement se fait dans une case adjacente. Exécuter le programme.<br><br>'
    if (!context.isHtml) { texte += '\\begin{center}' }
    texte += mathalea2d({ xmin: xGrilleMin - 3, xmax: xGrilleMax + 1, ymin: yGrilleMin - 1, ymax: yGrilleMax + 1, pixelsParCm: 20, scale: 0.5 }, lstObjet)
    if (context.isHtml) {
      texte += '</td></tr></table>'
    } else {
      texte += '\\end{center}\\end{minipage} '
      texte += '\\hfill \\null'
    }

    // CORRECTION
    // 0 : gauche, 1 : droite, 2 : haut, 3 : bas, 4 : colorier.
    let xLutin = 0 // position initiale du carré
    let yLutin = 0 // position initiale du carré
    const couleur = 'red'

    // on fait un dessin par passage dans la boucle
    if (context.isHtml) {
      texteCorr += '<table style="width:100%"><tr><td style="text-align:center">'
    } else {
      texteCorr += '\\begin{minipage}{.49\\textwidth}'
    }
    direction = 0
    for (let k = 0; k < nbRepetition; k++) {
      for (let i = k * lstNumCommande.length; i < (k + 1) * lstNumCommande.length; i += 3) {
        const ajoutXY = calculerDeplacementsLutin(lstNumCommande[i % lstNumCommande.length], lstNumCommande[(i + 1) % lstNumCommande.length])
        xLutin += ajoutXY[0]
        yLutin += ajoutXY[1]
        p = polygone(point(xLutin, yLutin), point(xLutin + 1, yLutin), point(xLutin + 1, yLutin - 1), point(xLutin, yLutin - 1))
        p.couleurDeRemplissage = couleur
        p.opaciteDeRemplissage = 0.25
        p.epaisseur = 0
        lstObjet.push(p)
      }
      lstObjet.push(p, fleche(xLutin, yLutin, direction))
      if (this.sup2) {
        texteCorr += `Passage n° ${k + 1} dans la boucle : <br>`
      }
      texteCorr += mathalea2d({ xmin: xGrilleMin - 3, xmax: xGrilleMax + 1, ymin: yGrilleMin - 1, ymax: yGrilleMax + 1, pixelsParCm: 20, scale: 0.4 }, lstObjet)
      if (context.isHtml) {
        if (k % 3 === 2) {
          texteCorr += '</td></tr><tr><td style="text-align:center">' // retour à la ligne après 3 grilles dessinées en HTML
        } else {
          texteCorr += '</td><td></td><td style="text-align:center">'
        }
      } else {
        texteCorr += '\\end{minipage}'
        if (k % 2 === 1) { texteCorr += '\\\\ ' } // retour à la ligne après 2 grilles dessinées en LaTeX
        texteCorr += '\\begin{minipage}{.49\\textwidth}'
      }
    }
    context.isHtml ? texteCorr += '</td></tr></table>' : texteCorr += '\\end{minipage}'

    if (context.isAmc) {
      this.autoCorrection = [{ propositions: [{ statut: 3, sanscadre: true }] }]
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre d\'instructions de déplacements', 3, '1 : 3 instructions\n2 : 4 instructions\n3 : 5 instructions']
  this.besoinFormulaire2CaseACocher = ['Avec une boucle']
  this.besoinFormulaire3CaseACocher = ['Inclure la possibilité de reculer']
}
