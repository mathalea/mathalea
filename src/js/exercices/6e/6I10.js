import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, choice, katexPopup2 } from '../../modules/outils.js'
import { point, polygone, grille, texteParPosition, mathalea2d } from '../../modules/2d.js'

export const titre = 'Programmer des déplacements (scratch)'

/**
 * * Colorier le déplacement d'un lutin
 * * 6Algo10
 * @author Erwan Duplessy
 */
export default function Colorier_Deplacement () {
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
    function scratchblocks_Tikz (code_svg, code_tikz) {
      if (context.isHtml) {
        return code_svg
      } else {
        return code_tikz
      };
    };

    let texte = '' // texte de l'énoncé
    let texteCorr = '' // texte du corrigé
    let code_tikz = '' // code pour dessiner les blocs en tikz
    let code_svg = '' // code pour dessiner les blocs en svg
    const nbCommandes = Number(this.sup) + 2 // nombre de commandes de déplacement dans un script
    let nbRepetition = 1 // Nombre de fois où la boucle est répétée.
    if (this.sup2) {
      nbRepetition = 3
    }
    // 0 : gauche, 1 : droite, 2 : haut, 3 : bas, 4 : colorier.
    const lstCommandesTikz = ['\\blockmove{Aller à gauche}', '\\blockmove{Aller à droite}', '\\blockmove{Aller en haut}', '\\blockmove{Aller en bas}', '\\blockmove{Colorier la case}']
    const lstCommandesSVG = ['Aller à gauche', 'Aller à droite', 'Aller en haut', 'Aller en bas', 'Colorier']
    const lstAjoutXY = [[-1, 0], [1, 0], [0, 1], [0, -1], [0, 0]]
    code_tikz += '\\medskip \\\\ \\begin{scratch} <br>'
    code_svg += '<pre class=\'blocks\'>'
    let n = 0 // variable temporaire pour stocker le numéro de la commande
    const lstNumCommande = [] // liste des commandes successives
    const lstX = [0] // liste des abscisses successives
    const lstY = [0] // liste des ordonnées successives
    if (this.sup2) {
      code_svg += `répéter (${nbRepetition}) fois <br>`
      code_tikz += `\\blockrepeat{répéter \\ovalnum{${nbRepetition}} fois} {`
    }

    for (let i = 0; i < nbCommandes; i++) {
      n = choice([0, 1, 2, 3]) // choix d'un déplacement
      code_tikz += lstCommandesTikz[n] // ajout d'un déplacement
      code_svg += lstCommandesSVG[n] + '<br>' // ajout d'un déplacement
      code_tikz += lstCommandesTikz[4] // ajout de l'instruction "Colorier"
      code_svg += lstCommandesSVG[4] + '<br>' // ajout de l'instruction "Colorier"
      lstNumCommande.push(n) // ajout d'un déplacement
      lstNumCommande.push(4) // ajout de l'instruction "Colorier"
      lstX.push(lstX[lstX.length - 1] + lstAjoutXY[n][0]) // calcul de la nouvelle abscisse
      lstY.push(lstY[lstY.length - 1] + lstAjoutXY[n][1]) // calcul de la nouvelle ordonnée
    }
    for (let j = 0; j < nbRepetition - 1; j++) {
      for (let i = 0; i < 2 * nbCommandes; i++) {
        lstX.push(lstX[lstX.length - 1] + lstAjoutXY[lstNumCommande[i]][0])
        lstY.push(lstY[lstY.length - 1] + lstAjoutXY[lstNumCommande[i]][1])
      }
    }
    if (this.sup2) {
      code_svg += 'fin <br>'
      code_tikz += '}'
    }
    code_svg += '</pre>'
    code_tikz += '\\end{scratch}'

    const xLutinMin = Math.min(...lstX)
    const xLutinMax = Math.max(...lstX)
    const yLutinMin = Math.min(...lstY)
    const yLutinMax = Math.max(...lstY)

    if (context.isHtml) {
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}[t]{.25\\textwidth}'
    }

    texte += scratchblocks_Tikz(code_svg, code_tikz)

    if (context.isHtml) {
      texte += '</td><td>'
      texte += '             '
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
    }

    const xGrilleMin = xLutinMin - 1
    const xGrilleMax = xLutinMax + 2
    const yGrilleMin = yLutinMin - 2
    const yGrilleMax = yLutinMax + 1

    const r2 = grille(xGrilleMin, yGrilleMin, xGrilleMax, yGrilleMax, 'black', 0.8, 1)
    const lstObjet = [r2] // liste de tous les objets Mathalea2d

    let p // carré gris représentant le lutin en position de départ
    p = polygone(point(lstX[0], lstY[0]), point(lstX[0] + 1, lstY[0]), point(lstX[0] + 1, lstY[0] - 1), point(lstX[0], lstY[0] - 1))
    p.opacite = 0.5
    p.couleurDeRemplissage = 'black'
    p.opaciteDeRemplissage = 0.5
    p.epaisseur = 0
    lstObjet.push(p)
    let txt = '' // variable temporaire
    for (let j = 0; j < (xGrilleMax - xGrilleMin); j++) {
      txt = String.fromCharCode(65 + j) // ascii 65 = A
      lstObjet.push(texteParPosition(txt, xGrilleMin + j + 0.5, yGrilleMax + 0.5, 'milieu', 'black', 1)) // affiche de A à J... en haut de la grille
    }
    for (let i = 0; i < (yGrilleMax - yGrilleMin); i++) {
      lstObjet.push(texteParPosition(String(i), xGrilleMin - 0.25, yGrilleMax - i - 0.5, 'gauche', 'black', 1)) // affiche de 0 à 9... à gauche de la grille
    }

    texte += 'Au départ, le lutin est situé dans la case grisée. Chaque déplacement se fait dans une case adjacente. <br><br>'
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
    for (let k = 0; k < nbRepetition; k++) {
      for (let i = k * lstNumCommande.length; i < (k + 1) * lstNumCommande.length; i++) {
        switch (lstNumCommande[i % lstNumCommande.length]) {
          case 0:
            xLutin += -1; break
          case 1:
            xLutin += 1; break
          case 2:
            yLutin += 1; break
          case 3:
            yLutin += -1; break
          case 4:
            p = polygone(point(xLutin, yLutin), point(xLutin + 1, yLutin), point(xLutin + 1, yLutin - 1), point(xLutin, yLutin - 1))
            p.couleurDeRemplissage = couleur
            p.opaciteDeRemplissage = 0.25
            p.epaisseur = 0
            lstObjet.push(p)
        }
      }
      if (this.sup2) {
        texteCorr += `Passage n° ${k + 1} dans la boucle : <br>`
      }
      texteCorr += mathalea2d({ xmin: xGrilleMin - 3, xmax: xGrilleMax + 1, ymin: yGrilleMin - 1, ymax: yGrilleMax + 1, pixelsParCm: 20, scale: 0.4 }, lstObjet)
      if (context.isHtml) {
        if (k % 3 == 2) {
          texteCorr += '</td></tr><tr><td style="text-align:center">' // retour à la ligne après 3 grilles dessinées en HTML
        } else {
          texteCorr += '</td><td></td><td style="text-align:center">'
        }
      } else {
        texteCorr += '\\end{minipage}'
        if (k % 2 == 1) { texteCorr += '\\\\ ' } // retour à la ligne après 2 grilles dessinées en LaTeX
        texteCorr += '\\begin{minipage}{.49\\textwidth}'
      }
    }
    context.isHtml ? texteCorr += '</td></tr></table>' : texteCorr += '\\end{minipage}'

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre d\'instructions de déplacements', 3, '1 : 3 instructions\n2 : 4 instructions\n3 : 5 instructions']
  this.besoinFormulaire2CaseACocher = ['Avec une boucle']
}
