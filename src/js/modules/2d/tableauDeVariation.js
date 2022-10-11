import { colorToLatexOrHTML, ObjetMathalea2D } from '../2dGeneralites'
import { point } from './point'
import { polygone } from './polygone'
import { segment } from './segment'
import { latexParCoordonnees } from './textes'
import { translation } from './transformations'
import { vecteur } from './vecteur'

/**
 * Classe TableauDeVariation Initiée par Sebastien Lozano, transformée par Jean-Claude Lhote
 * publié le 9/02/2021
 * tabInit est un tableau contenant sous forme de chaine les paramètres de la macro Latex \tabInit{}{}
 * tabLines est un tableau contenant sous forme de chaine les paramètres des différentes macro \tabLine{}
 * exemple :
 * tabInit:[[[texte1,taille1,long1],[texte2,taille2,long2]...],[valeur1,long1,valeur2,long2,valeur3,long3...]]
 * tabLines:[[type,long0,codeL1C1,long1,codeL1C2,long2,codeL1C3,long3...],[type,long0,codeL2C1,long1,codeL2C2,long2,codeL2C3,long3...]]
 * Pour colors, c'est propre à Latex : color, colorC = blue!15, colorL = green!15
    colorL (comme couleur de la ligne) pour la zone 1
    colorV (comme couleur de la variable) pour la zone 2
    colorC (comme couleur de la colonne) pour la zone 3
    colorT (comme couleur du tableau) pour la zone 4.

 * @param {*} param0
 * @author Jean-Claude Lhote
 */
function TableauDeVariation ({ tabInit, tabLines, lgt, escpl, deltacl, colors, hauteurLignes, colorBackground }) {
  ObjetMathalea2D.call(this, { })
  this.tabInit = tabInit
  this.tabLines = tabLines
  this.colors = colors
  this.lgt = lgt
  this.escpl = escpl
  this.deltacl = deltacl
  this.hauteurLignes = []
  if (hauteurLignes.length !== 0) { // On récupère les hauteurs de lignes
    this.hauteurLignes = hauteurLignes
  } else { // Si elles ne sont pas définies, on met 20 par défaut
    for (let i = 0; i < tabInit[0].length; i++) {
      this.hauteurLignes.push(10)
    }
  }

  this.svg = function (coeff) {
    const tabInit0 = this.tabInit[0]
    const tabInit1 = this.tabInit[1]
    const tabLines = this.tabLines
    let yLine = 0
    const segments = []; let index = 0; const textes = []; let texte; let long; let s; let p; let v; let fleches = []; let codeVar = []; let ZI = []; let ZIon; let zonesEstInterdit = []
    let code = ''
    const longueurTotale = this.lgt + (tabInit1.length / 2 - 1) * escpl + 2 * this.deltacl
    const MathToSVG = function (string) { // fonction qui traduit si possible la chaine Latex en un tableau de chaine
      // un seul élément si c'est du texte ou un nombre
      // deux éléments si il y a un signe - et du texte
      // trois élément si c'est une fraction les 2e et 3e sont le numérateur et le dénominateur. Le 1er est éventuellement un signe -
      if (string[0] === '$') string = string.substring(1, string.length - 1)
      return string
    }

    for (let i = -1; i < tabInit0.length && index < tabLines.length;) { // on s'arrête quand on dépasse le nombre de lignes prévues
      if (i === -1) { // ici on est dans la ligne d'entête
        i++
        // On crée une ligne horizontale et les séparations verticales de base
        segments.push(segment(0, yLine, longueurTotale, yLine))
        segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
        segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
        segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))

        texte = tabInit0[0][0]
        long = tabInit0[0][2]//
        textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt / 2, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 8, colorBackground, 8))
        for (let j = 0; j < tabInit1.length / 2; j++) {
          texte = tabInit1[j * 2]
          long = tabInit1[j * 2 + 1]
          if (texte.indexOf('frac') !== -1) {
            textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * j, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 30, colorBackground, 8))
          } else {
            textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * j, -tabInit0[0][1] * this.hauteurLignes[0] / 28, 'black', long, 15, colorBackground, 8))
          }
        }
        yLine -= tabInit0[0][1] * this.hauteurLignes[0] / 15
      } else { // On est dans les lignes 1 à n
        // Line et Var incrémente i de 1 et décrémente yLine de la hauteur de la ligne
        // Val, Ima et Slope incrémente index mais pas i
        switch (tabLines[index][0]) {
          case 'Line':
            i++
            long = tabInit0[i][2]
            textes.push(latexParCoordonnees(MathToSVG(tabInit0[i][0]), this.lgt / 2, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8)) // this.hauteurLignes[i],colorBackground))

            for (let k = 1; k < tabLines[index].length / 2; k++) {
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
                if (texte.length === 1) {
                  switch (texte[0]) {
                    case 'z':
                      textes.push(latexParCoordonnees('0', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))
                      s = segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                      s.pointilles = 4
                      segments.push(s)
                      break
                    case 'd':
                      segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                      segments.push(segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                      break
                    case 't':
                      s = segment(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine, this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                      s.pointilles = 4
                      segments.push(s)
                      break
                    case 'h':
                      p = polygone([point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15),
                        point(this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)])
                      p.couleurDeRemplissage = colorToLatexOrHTML('gray')
                      segments.push(p)
                      break
                    case '+':
                      textes.push(latexParCoordonnees('+', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))

                      break
                    case '-':
                      textes.push(latexParCoordonnees('-', this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, 15, colorBackground, 8))

                      break
                  }
                } else if (texte === 'R/') {
                  // textes.push(latexParCoordonnees(texte, this.lgt + this.deltacl + this.escpl/2 * (k - 0.6), yLine-tabInit0[i][1] / 2))
                } else {
                  textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl / 2 * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
                }
              }
            }
            // On crée une ligne horizontale et les séparations verticales de base
            segments.push(segment(0, yLine, longueurTotale, yLine))
            segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            yLine -= tabInit0[i][1] * this.hauteurLignes[i] / 15
            index++
            break
          case 'Var':
            i++ // index des lignes (ça démarre à -1 pour l'entête, ça passe à 0 pour la première ligne (celle sous l'entête) et c'est incrémenté à chaque nouvelle ligne)
            fleches = [] // les points qui marquent le départ et/ou l'arrivée d'une flèche (endroit où se situent les valeurs)
            ZI = [] // Liste de points (qui vont par deux : un sur la ligne du dessus, l'autre en dessous)
            ZIon = false // un booléen qui bascule à true si on entre dans une zone interdite et qui rebascule à false à la prochaine valeur
            // utilisé pour ajouter les deux points de droite servant à faire le rectangle hachuré/
            zonesEstInterdit = [] // Un tableau pour garder la trace des "zones interdites" où il ne doit pas y avoir de flèches
            for (let k = 1; k < tabLines[index].length / 2; k++) {
              textes.push(latexParCoordonnees(MathToSVG(tabInit0[i][0]), this.lgt / 2, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', tabInit0[i][2], 15, colorBackground, 8))
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
                codeVar = texte.split('/')
                switch (codeVar.length) {
                  case 1: // il n'y a qu'un code
                    // on ne fait rien, c'est la commande R/ ou un emplacement vide sans /
                    break
                  case 2: // Une seule expression (2 codes séparés par un seul /)
                    switch (codeVar[0]) {
                      case '+': // une expression
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-': // une expression
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+C': // une expression sur une double barre (prolongement par continuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-C': // une expression sur une double barre (prolongement par continuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+D': // une expression suivie d’une double barre (discontinuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-D': // une expression suivie d’une double barre (discontinuité)
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '+H': // une expression suivie d’une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '-H': // une expression suivie d’une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case 'D-': // expression précédée d'une double barre discontinuité
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case 'D+':// expression précédée d'une double barre discontinuité
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        if (ZIon) {
                          ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                          ZIon = false
                        }
                        zonesEstInterdit.push(false)
                        break
                      case '-DH': // expression suivie d'une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '+DH': // expression suivie d'une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '-CH': // expression sur une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case '+CH': // expression sur une double barre discontinuité et d'une zone interdite
                        if (codeVar[1].indexOf('frac') !== -1) {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                        } else {
                          textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                        }
                        fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                        segments.push(s)
                        ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.06, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                        ZIon = true
                        zonesEstInterdit.push(true)
                        break
                      case 3: // 2 expressions sérarées par / /
                        switch (codeVar[0]) { // on regarde le code
                          case '':
                            break
                          case '-CD-': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+CD+': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 14, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 14, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-CD+': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+CD-': // une expression sur une double barre (continuité) et une expression après la double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-D-': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+D+': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-D+': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+D-': // deux expressions de part et d’autre d’une double barre (discontinuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-DC-': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+DC+': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-DC+': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+DC-': // une expression avant une double barre (discontinuité) et une expression sur la double barre (continuité)
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) - 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            s = segment(this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine, this.lgt + this.deltacl + this.escpl * (k - 1) + 0.05, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15)
                            segments.push(s)
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-V-': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+V+': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '-V+': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                          case '+V-': // deux expressions
                            if (codeVar[1].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[1]), this.lgt + this.deltacl + this.escpl * (k - 1) - long / 28, yLine - 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            if (codeVar[2].indexOf('frac') !== -1) {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 30, colorBackground, 8))
                            } else {
                              textes.push(latexParCoordonnees(MathToSVG(codeVar[2]), this.lgt + this.deltacl + this.escpl * (k - 1) + long / 28, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95, 'black', long, 15, colorBackground, 8))
                            }
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - 0.95))
                            zonesEstInterdit.push(true)
                            fleches.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15 + 0.95))
                            if (ZIon) {
                              ZI.push(point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine), point(this.lgt + this.deltacl + this.escpl * (k - 1), yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
                              ZIon = false
                            }
                            zonesEstInterdit.push(false)
                            break
                        }
                        break
                    }
                }
              }
            }
            for (let n = 0; n < fleches.length - 1; n++) {
              if (!zonesEstInterdit[n]) {
                v = vecteur(translation(fleches[n], vecteur(1.5, 0)), translation(fleches[n + 1], vecteur(-1.5, 0))).representant(translation(fleches[n], vecteur(1.5, 0)))
                v.styleExtremites = '->'
                segments.push(v)
              }
            }
            for (let n = 0; n <= ZI.length / 4 - 1; n++) {
              p = polygone(ZI[4 * n], ZI[4 * n + 2], ZI[4 * n + 3], ZI[4 * n + 1])
              p.opacite = 1
              p.hachures = 'north east lines'
              segments.push(p)
            }

            // On crée une ligne horizontale et les séparations verticales de base
            segments.push(segment(0, yLine, longueurTotale, yLine))
            segments.push(segment(0, yLine, 0, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(this.lgt, yLine, this.lgt, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            segments.push(segment(longueurTotale, yLine, longueurTotale, yLine - tabInit0[i][1] * this.hauteurLignes[i] / 15))
            yLine -= tabInit0[i][1] * this.hauteurLignes[i] / 15
            index++
            break
          case 'Val': // ajouter un antécédent et son image sur la flèche. 6 paramètres + 'Val'
            // ['Val',antécédent du début de la flèche, antécédent de la fin de la flèche, position sur la flèche entre 0 et 1, 'antécédent', 'image',long]
            if (tabLines[index][5] !== '') {
              long = tabLines[index][6]
              textes.push(latexParCoordonnees(MathToSVG(tabLines[index][5]), this.lgt + this.deltacl + this.escpl * (tabLines[index][1] - 1) + 1 + (this.escpl - 2) * (tabLines[index][2] - tabLines[index][1]) * tabLines[index][3], yLine + 1.1 + tabLines[index][3] * tabInit0[i][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
              textes.push(latexParCoordonnees(MathToSVG(tabLines[index][4]), this.lgt + this.deltacl + this.escpl * (tabLines[index][1] - 1) + 1 + (this.escpl - 2) * (tabLines[index][2] - tabLines[index][1]) * tabLines[index][3], -tabInit0[0][1] * this.hauteurLignes[i] / 30, 'black', long, this.hauteurLignes[i], colorBackground, 8))
            }
            index++
            break
          case 'Ima': // ajouter des valeurs sur la flèche...

            if (tabLines[index][3] !== '') {
              texte = tabLines[index][3]
              long = tabLines[index][4]
              if (texte.indexOf('frac') !== -1) {
                textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * ((tabLines[index][1] - 1) + (tabLines[index][2] - 1)) / 2, yLine + tabInit0[i][1] * this.hauteurLignes[i] / 30 - 0.1, 'black', long, 30, colorBackground, 8))
              } else {
                textes.push(latexParCoordonnees(MathToSVG(texte), this.lgt + this.deltacl + this.escpl * ((tabLines[index][1] - 1) + (tabLines[index][2] - 1)) / 2, yLine + tabInit0[i][1] * this.hauteurLignes[i] / 30 - 0.1, 'black', long, 15, colorBackground, 8))
              }
            }
            index++
            break
          case 'Slope':
            /****************************************************************************/
            // Slope n'est pas implémenté... reste à faire (si quelqu'un en a besoin).
            /****************************************************************************/
            for (let k = 1; k < tabLines[index].length / 2; k++) {
              if (tabLines[index][k * 2] !== '') {
                texte = tabLines[index][k * 2]
                long = tabLines[index][k * 2 + 1]
              }
            }
            break
        }
      }
    }

    // On ferme le tableau en bas
    segments.push(segment(0, yLine, longueurTotale, yLine))
    // On écrit le code avec tous les éléments.
    for (let i = 0; i < segments.length; i++) {
      code += '\n\t' + segments[i].svg(coeff)
    }
    for (let i = 0; i < textes.length; i++) {
      code += '\n\t' + textes[i].svg(coeff)
    }
    return code
  }

  this.tikz = function () {
    let code = `\\tkzTabInit[lgt=${lgt},deltacl=${deltacl},espcl=${escpl}`
    for (let i = 0; i < this.colors.length; i++) {
      code += `,${this.colors[i]}`
    }
    code += ']{'
    const tabinit0 = this.tabInit[0]
    const tabinit1 = this.tabInit[1]
    let type
    for (let i = 0; i < tabinit0.length; i++) {
      if (tabinit0[i][0].indexOf(',') !== -1) {
        tabinit0[i][0] = `{${tabinit0[i][0]}}`
      }
      code += ` ${tabinit0[i][0]} / ${tabinit0[i][1]},`
    }
    code = code.substring(0, code.length - 1)
    code += '}{'
    for (let i = 0; i < tabinit1.length / 2; i++) {
      if (tabinit1[i * 2].indexOf(',') !== -1) {
        tabinit1[i * 2] = `{${tabinit1[i * 2]}}`
      }
      code += ` ${tabinit1[i * 2]},`
    }
    code = code.substring(0, code.length - 1)
    code += '}' + '\n\t'
    for (let i = 0; i < this.tabLines.length; i++) {
      type = this.tabLines[i][0]
      if (type === 'Val' || type === 'Ima') {
        code += `\\tkzTab${type}`
        for (let j = 1; j < this.tabLines[i].length - 1; j++) {
          if (this.tabLines[i][j].indexOf(',') !== -1) {
            this.tabLines[i][j] = `{${this.tabLines[i][j]}}`
          }
          code += `{${this.tabLines[i][j]}},`
        }
        code += '\n\t'
      } else if (type === 'Var' || type === 'Line') {
        code += `\\tkzTab${type}{ `
        for (let j = 2; j < this.tabLines[i].length; j += 2) {
          if (this.tabLines[i][j].indexOf(',') !== -1) {
            this.tabLines[i][j] = `{${this.tabLines[i][j]}}`
          }
          code += ` ${this.tabLines[i][j]},`
        }
        code = code.substring(0, code.length - 1)
        code += '}' + '\n\t'
      }
    }
    return code
  }
}
// tableauDeVariation crée une instance de la classe. voici le détail des paramètres.
// escpl=taille en cm entre deux antécédents, deltacl=distance entre la bordure et les premiers et derniers antécédents
// lgt = taille de la première colonne tout est en cm
// tabInit contient 2 tableaux
// le premier contient des triplets [chaine d'entête,hauteur de ligne,nombre de pixels de largeur estimée du texte pour le centrage]
// le deuxième contient une succession de chaines et de largeurs en pixels : ce sont les antécédent de la ligne d'entête
// tabLines contient des tableaux de la forme ['type',...]
// type est 'Line' pour une ligne de signes et valeurs. Les valeurs sont données avec à la suite leur largeur estimée en pixels.
// type est 'Var' pour une ligne de variations. Les variations sont des chaines respectant une syntaxe particulière.
// On intercale une largeur estimée pour le texte éventuel
// type est 'Ima' il faut 4 paramètres numériques : le 1er et le 2e sont les N° des antécédents entre lesquels on veut placer l'image
// le 3e est la valeur de l'image et le 4e est la largeur estimée en pixels
// type est 'Val' il faut 5 paramètres : Idem Ima pour les deux premiers, le 3e est l'antécédent à ajouter, le 4e son image et le 5e sa taille
// Pour plus d'info sur le codage des variations, voir ce tuto : https://zestedesavoir.com/tutoriels/439/des-tableaux-de-variations-et-de-signes-avec-latex/
// reste à faire les types  'Slope"

export function tableauDeVariation ({ tabInit = ['', ''], tabLines = [], lgt = 3.5, escpl = 5, deltacl = 0.8, colors = [], hauteurLignes = [], colorBackground = 'gray' }) {
  return new TableauDeVariation({ tabInit: tabInit, tabLines: tabLines, lgt: lgt, escpl: escpl, deltacl: deltacl, colors: colors, hauteurLignes: hauteurLignes, colorBackground: colorBackground })
}
