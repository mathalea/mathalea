
/**
 * Classe NoteLaCouleur (objet Pion)
 * this.plateau est le tableau des couleurs de cases.
 * this.currentPos est {x,y} les coordonnées courantes du pion
 * this.currentOrientation est l'orientation courante du pion
 * this.codeScratch est le programme en code Latex du pion.
 * this.currentIndex est l'index qui parcourt le codeScratch...
 * this.nlc() retourne la couleur de la case sur laquelle est le pion
 * this.tesCoords(x,y) est une méthode qui dit si le point de coordonnées (x,y) est bien dans le plateau de jeu.
 * this.testInstruction(code) est une méthode qui dit si une instruction est valide (ne sort pas) et retourne un tableau
 * this.testSequence([...code]) est une méthode qui retourne true si la séquence d'instructions est valide.
 */

import { boite } from './2d/polygone.js'
import { segment } from './2d/segment.js'
import { texteParPositionEchelle } from './2d/textes.js'
import { ObjetMathalea2D } from './2dGeneralites.js'
import { avance, tournerD, tournerG } from './2dLutin.js'
import { randint } from './outils/entiers.js'

class NoteLaCouleur {
  constructor ({
    x = 15, y = 15, orientation = 90, plateau = [], relatif = true, nx = 16, ny = 12, pas = 30
  }) {
    this.plateauNLC = plateau
    this.currentPos = { x: x, y: y }
    this.currentOrientation = orientation
    this.codeScratch = ''
    this.currentIndex = 0
    this.relatif = relatif
    this.pas = pas
    this.nx = nx
    this.ny = ny
    this.nlc = function () {
      return this.plateauNLC[Math.ceil(((this.relatif ? (this.ny - 1) * this.pas >> 1 : (this.ny - 1) * this.pas) - this.currentPos.y) / this.pas)][Math.ceil(((this.relatif ? (this.nx - 1) * this.pas >> 1 : -this.pas >> 1) + this.currentPos.x) / this.pas)]
    }
    this.testCoords = function (x, y) {
      if (x < (this.relatif ? (1 - this.nx) * this.pas >> 1 : this.pas >> 1) || x > (this.relatif ? this.nx * this.pas >> 1 : (this.nx - 0.5) * this.pas) || y < (this.relatif ? (1 - this.ny) * this.pas >> 1 : this.pas >> 1) || y > (this.relatif ? this.ny * this.pas >> 1 : (this.ny - 0.5) * this.pas)) return false
      return true
    }
    /**
         * méthode pour tester une instruction : retourne un tableau dont le premier élément indique si l'instruction est valide.
         * c'est à dire qu'elle n'entraine pas une sortie de plateau.
         * true -> l'instruction maintient le lutin sur le plateau
         * false -> l'instruction le fait sortir du plateau
         * Les autres éléments du tableau sont dans cet ordre :
         * - les positions x et y du pion après l'instruction
         * - son orientation après l'instruction
         * - le code Latex de l'instruction
         */
    this.testInstruction = function (code, lutin) {
      const avancepion = function (d, x, y, s) {
        switch (s) {
          case 0:
          case 360:
            y += d
            break
          case 90:
          case -270:
            x += d
            break
          case 180:
          case -180:
            y -= d
            break
          case 270:
          case -90:
            x -= d
            break
        }
        return [x, y]
      }
      let x = this.currentPos.x
      let y = this.currentPos.y
      let orientation = this.currentOrientation
      let latex
      switch (code) {
        case 'AV20':
          [x, y] = avancepion(20, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{20} pas}'
          if (lutin !== undefined) {
            avance(20, lutin)
          }
          break
        case 'AV30':
          [x, y] = avancepion(30, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{30} pas}'
          if (lutin !== undefined) {
            avance(30, lutin)
          }
          break
        case 'AV40':
          [x, y] = avancepion(40, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{40} pas}'
          if (lutin !== undefined) {
            avance(40, lutin)
          }
          break
        case 'AV60':
          [x, y] = avancepion(60, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{60} pas}'
          if (lutin !== undefined) {
            avance(60, lutin)
          }
          break
        case 'AV80':
          [x, y] = avancepion(80, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{80} pas}'
          if (lutin !== undefined) {
            avance(80, lutin)
          }
          break
        case 'AV90':
          [x, y] = avancepion(90, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{90} pas}'
          if (lutin !== undefined) {
            avance(90, lutin)
          }
          break
        case 'AV100':
          [x, y] = avancepion(100, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{100} pas}'
          if (lutin !== undefined) {
            avance(100, lutin)
          }
          break
        case 'AV120':
          [x, y] = avancepion(120, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{120} pas}'
          if (lutin !== undefined) {
            avance(120, lutin)
          }
          break
        case 'AV150':
          [x, y] = avancepion(150, x, y, orientation)
          latex = '\\blockmove{avancer de \\ovalnum{150} pas}'
          if (lutin !== undefined) {
            avance(150, lutin)
          }
          break

        case 'TD90':
          if (orientation === 180) orientation = -90
          else orientation += 90
          latex = '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}'
          if (lutin !== undefined) {
            tournerD(90, lutin)
          }
          break
        case 'TG90':
          if (orientation === -90) orientation = 180
          else orientation -= 90
          latex = '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}'
          if (lutin !== undefined) {
            tournerG(90, lutin)
          }
          break
        case 'TD180':
        case 'TG180':
          if (orientation === 0) orientation = 180
          else if (orientation === -90) orientation = 90
          else if (orientation === 90) orientation = -90
          else orientation = 0
          latex = '\\blockmove{tourner \\turnright{} de \\ovalnum{180} degrés}'
          if (lutin !== undefined) {
            tournerD(180, lutin)
          }
          break
        case 'NLC':
          latex = '\\blocklist{Note la couleur}'
          break
      }
      if (this.testCoords(x, y)) {
        return [true, x, y, orientation, latex, lutin]
      } else return [false, this.currentPos.x, this.currentPos.y, this.currentOrientation, latex, lutin]
    }

    /**
          * méthode pour tester une séquence : retourne
          *
          * [true,x,y,orientation] si la séquence reste dans le jeu
          * [false,x,y,orientation] en cas de sortie de plateau.
          */
    this.testSequence = function (codes) {
      let sorti = false
      let test
      const pionfantome = noteLaCouleur({ x: 0, y: 0, orientation: 0, plateau: this.plateauNLC, relatif: this.relatif, nx: this.nx, ny: this.ny, pas: this.pas })
      pionfantome.currentPos.x = this.currentPos.x
      pionfantome.currentPos.y = this.currentPos.y
      pionfantome.currentOrientation = this.currentOrientation
      for (let i = 0; i < codes.length; i++) {
        test = pionfantome.testInstruction(codes[i])
        if (!test[0]) { // si le lutin est sorti du plateau pendant l'instruction
          sorti = true
          break
        } else {
          pionfantome.currentPos.x = test[1]
          pionfantome.currentPos.y = test[2]
          pionfantome.currentOrientation = test[3]
        }
      }
      // si il est sorti, alors la séquence est false, sinon, elle est true.
      return [!sorti, pionfantome.currentPos.x, pionfantome.currentPos.y, pionfantome.currentOrientation]
    }
    /**
       *
       * @param {number} repetitions
       * @param {string[]} codes la séquence d'instructions à répéter
       * @returns {boolean} true si la boucle n'a à aucun moment fait sortir le lutin du plateau, false sinon
       */
    this.testBoucle = function (repetitions, codes) {
      let sortiboucle = false
      let test
      const pionfantome = noteLaCouleur({ x: 0, y: 0, orientation: 0, plateau: this.plateauNLC, relatif: this.relatif, nx: this.nx, ny: this.ny, pas: this.pas })
      pionfantome.currentPos.x = this.currentPos.x
      pionfantome.currentPos.y = this.currentPos.y
      pionfantome.currentOrientation = this.currentOrientation
      for (let i = 0; i < repetitions; i++) {
        test = pionfantome.testSequence(codes)
        if (!test[0]) { // si le lutin est sorti pendant la séquence alors la boucle n'est pas valide.
          sortiboucle = true
          break
        } else { // il n'est pas sorti, on continue le test à partir de la nouvelle position
          pionfantome.currentPos.x = test[1]
          pionfantome.currentPos.y = test[2]
          pionfantome.currentOrientation = test[3]
        }
      }
      // Si il est sorti, alors on retourne false en premier argument, sinon, on retourne true.
      return [!sortiboucle, pionfantome.currentPos.x, pionfantome.currentPos.y, pionfantome.currentOrientation]
    }
  }
}
export function noteLaCouleur ({
  x = 15, y = 15, orientation = 90, plateau = [], relatif = true, nx = 16, ny = 12, pas = 30
} = {}) {
  return new NoteLaCouleur({ x, y, orientation, relatif, plateau, nx, ny, pas })
}
class Plateau2dNLC {
  constructor ({
    type = 1, melange = false, scale = 0.5, relatif = true, pas = 30, nx = 16, ny = 12,
    plateau = [
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc'],
      ['Blanc', 'Noir', 'Jaune', 'Bleu', 'Vert', 'Orange', 'Rouge', 'Orange', 'Noir', 'Jaune', 'Gris', 'Vert', 'Rose', 'Noir', 'Jaune', 'Blanc'],
      ['Blanc', 'Rouge', 'Bleu', 'Orange', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Rose', 'Gris', 'Jaune', 'Bleu', 'Rouge', 'Gris', 'Rouge', 'Blanc'],
      ['Blanc', 'Rose', 'Vert', 'Gris', 'Rouge', 'Noir', 'Bleu', 'Vert', 'Noir', 'Vert', 'Bleu', 'Rose', 'Gris', 'Vert', 'Orange', 'Blanc'],
      ['Blanc', 'Vert', 'Bleu', 'Rose', 'Vert', 'Bleu', 'Orange', 'Gris', 'Rouge', 'Orange', 'Jaune', 'Gris', 'Rouge', 'Rose', 'Bleu', 'Blanc'],
      ['Blanc', 'Noir', 'Orange', 'Rouge', 'Orange', 'Jaune', 'Rouge', 'Blanc', 'Blanc', 'Noir', 'Gris', 'Orange', 'Noir', 'Jaune', 'Rose', 'Blanc'],
      ['Blanc', 'Rose', 'Gris', 'Noir', 'Bleu', 'Vert', 'Bleu', 'Blanc', 'Blanc', 'Rouge', 'Bleu', 'Gris', 'Vert', 'Rouge', 'Noir', 'Blanc'],
      ['Blanc', 'Noir', 'Rouge', 'Rose', 'Vert', 'Orange', 'Rose', 'Noir', 'Orange', 'Vert', 'Jaune', 'Rose', 'Noir', 'Rose', 'Vert', 'Blanc'],
      ['Blanc', 'Orange', 'Gris', 'Rouge', 'Jaune', 'Noir', 'Vert', 'Rouge', 'Rose', 'Noir', 'Bleu', 'Vert', 'Jaune', 'Orange', 'Gris', 'Blanc'],
      ['Blanc', 'Bleu', 'Jaune', 'Orange', 'Vert', 'Gris', 'Jaune', 'Gris', 'Orange', 'Gris', 'Rose', 'Bleu', 'Rouge', 'Bleu', 'Orange', 'Blanc'],
      ['Blanc', 'Rose', 'Bleu', 'Jaune', 'Rose', 'Orange', 'Rouge', 'Bleu', 'Noir', 'Jaune', 'Gris', 'Vert', 'Jaune', 'Noir', 'Rouge', 'Blanc'],
      ['Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc', 'Blanc']
    ]

  } = {}) {
    ObjetMathalea2D.call(this, { })
    this.relatif = relatif
    this.pas = pas
    this.type = 1
    this.scale = scale
    this.nx = nx
    this.ny = ny
    this.plateauNLC = plateau
    if (melange) {
      for (let i = 0, x1, x2, y1, y2, kase; i < 20; i++) {
        y1 = randint(1, this.ny - 2)
        y2 = randint(1, this.ny - 2, y1)
        x1 = randint(1, this.nx - 2)
        x2 = randint(1, this.nx - 2)
        kase = this.plateauNLC[y1][x1] // case est un mot réservé
        this.plateauNLC[y1][x1] = this.plateauNLC[y2][x2]
        this.plateauNLC[y2][x2] = kase
      }
    }
    this.traducColor = function (couleur) {
      switch (couleur) {
        case 'Blanc':
          return 'white'
        case 'Bleu':
          return 'DodgerBlue'
        case 'Noir':
          return 'black'
        case 'Rouge':
          return 'red'
        case 'Jaune':
          return 'yellow'
        case 'Rose':
          return 'HotPink'
        case 'Vert':
          return 'green'
        case 'Orange':
          return 'DarkOrange'
        case 'Gris':
          return 'gray'
      }
    }
    this.traducNum = function (couleur) {
      switch (couleur) {
        case 'Blanc':
          return '0'
        case 'Bleu':
          return '3'
        case 'Noir':
          return '1'
        case 'Rouge':
          return '2'
        case 'Jaune':
          return '6'
        case 'Rose':
          return '5'
        case 'Vert':
          return '7'
        case 'Orange':
          return '4'
        case 'Gris':
          return '8'
      }
    }

    const plateau2d = []
    let b
    for (let X = 0; X < this.nx; X++) {
      for (let Y = 0; Y < this.ny; Y++) {
        switch (type) {
          case 1:
            b = boite({ Xmin: X * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymin: Y * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), Xmax: (X + 1) * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymax: (Y + 1) * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), color: 'black', opaciteDeRemplissage: 0.7, colorFill: this.traducColor(this.plateauNLC[ny - 1 - Y][X]), echelleFigure: this.scale })
            b.opacite = 0.8
            break
          case 2:
            b = boite({ Xmin: X * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymin: Y * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), Xmax: (X + 1) * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymax: (Y + 1) * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), color: 'black', opaciteDeRemplissage: 0.7, colorFill: this.traducColor(this.plateauNLC[ny - 1 - Y][X]), tailleTexte: 1.2, texteColor: 'black', texteOpacite: 0.8, texteIn: this.traducNum(this.plateauNLC[ny - 1 - Y][X]), echelleFigure: this.scale })
            b.opacite = 0.8
            break
          case 3:
            b = boite({ Xmin: X * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymin: Y * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), Xmax: (X + 1) * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymax: (Y + 1) * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), color: 'black', opaciteDeRemplissage: 1, colorFill: 'white', tailleTexte: 0.9, texteColor: 'black', texteOpacite: 0.9, texteIn: this.plateauNLC[ny - 1 - Y][X], echelleFigure: this.scale })
            b.opacite = 0.8
            break
          case 4:
            b = boite({ Xmin: X * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymin: Y * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), Xmax: (X + 1) * 1.5 + (this.nx >> 1) * (this.relatif ? -1.5 : 0), Ymax: (Y + 1) * 1.5 + (this.ny >> 1) * (this.relatif ? -1.5 : 0), color: 'black', opaciteDeRemplissage: 1, colorFill: 'white', tailleTexte: 1.2, texteColor: 'black', texteOpacite: 0.9, texteIn: this.traducNum(this.plateauNLC[ny - 1 - Y][X]), echelleFigure: this.scale })
            b.opacite = 0.8
            break
        }
        plateau2d.push(b)
      }
    }
    if (this.relatif) plateau2d.push(texteParPositionEchelle(`-${this.pas}`, -1.6, -0.3, 'milieu', 'black', 1.2, 'middle', true, scale))
    plateau2d.push(texteParPositionEchelle(`${this.pas}`, 1.5, -0.3, 'milieu', 'black', 1.2, 'middle', true, scale))
    if (this.relatif) plateau2d.push(texteParPositionEchelle(`-${this.pas}`, -0.5, -1.5, 'milieu', 'black', 1.2, 'middle', true, scale))
    plateau2d.push(texteParPositionEchelle(`${this.pas}`, -0.5, 1.5, 'milieu', 'black', 1.2, 'middle', true, scale))
    plateau2d.push(texteParPositionEchelle('x', this.nx * (this.relatif ? 0.75 : 1.5) + 0.7, -(this.relatif ? 0.6 : 0.6), 'milieu', 'purple', 1.2, 'middle', true, scale))
    plateau2d.push(texteParPositionEchelle('y', -0.3, this.ny * (this.relatif ? 0.75 : 1.5) + 0.7, 'milieu', 'purple', 1.2, 'middle', true, scale))
    if (this.relatif) {
      plateau2d.push(texteParPositionEchelle('+', (this.nx >> 1) * 1.5 + 0.8, 0, 'milieu', 'purple', 1.2, 'middle', true, scale))
      plateau2d.push(texteParPositionEchelle('-', -(this.nx >> 1) * 1.5 - 0.5, 0.2, 'milieu', 'purple', 1.2, 'middle', true, scale))
      plateau2d.push(texteParPositionEchelle('+', 0, (this.ny >> 1) * 1.5 + 0.8, 'milieu', 'purple', 1.2, 'middle', true, scale))
      plateau2d.push(texteParPositionEchelle('-', 0, -(this.ny >> 1) * 1.5 - 0.5, 'milieu', 'purple', 1.2, 'middle', true, scale))
    }
    const flechey = segment(0, (this.ny >> 1) * (this.relatif ? -1.5 : 0), 0, (this.ny >> 1) * (this.relatif ? 1.5 : 3) + 0.5, 'purple')
    flechey.styleExtremites = '->'
    const flechex = segment((this.nx >> 1) * (this.relatif ? -1.5 : 0), 0, (this.nx >> 1) * (this.relatif ? 1.5 : 3) + 0.5, 0, 'purple')
    flechex.styleExtremites = '->'
    plateau2d.push(flechey)
    plateau2d.push(flechex)
    let xmin = 1000
    let ymin = 1000
    let xmax = -1000
    let ymax = -1000
    for (const objet of plateau2d) {
      if (objet.bordures !== undefined) {
        xmin = Math.min(xmin, objet.bordures[0])
        ymin = Math.min(ymin, objet.bordures[1])
        xmax = Math.max(xmax, objet.bordures[2])
        ymax = Math.max(ymax, objet.bordures[3])
      }
    }
    this.bordures = [xmin, ymin, xmax, ymax]
    this.svg = function (coeff) {
      let code = ''
      for (const objet of plateau2d) {
        code += objet.svg(coeff) + '\n'
      }
      return code
    }
    this.tikz = function () {
      let code = ''
      for (const objet of plateau2d) {
        code += objet.tikz() + '\n'
      }
      return code
    }
  }
}

export function plateau2dNLC (type = 1, melange = false, scale = 0.5, relatif = true) {
  return new Plateau2dNLC(type, melange, scale, relatif)
}
