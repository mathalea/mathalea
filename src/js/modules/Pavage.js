import { egal, nombreAvecEspace } from './outils'
import {
  barycentre,
  homothetie,
  point,
  polygone,
  polygoneRegulier,
  rotation,
  similitude,
  texteParPosition,
  tracePoint,
  translation,
  vecteur
} from './2d'

/**
 * Classe Pavage : permet de créer des pavages de polygones en un tour de main et de manipuler les polygones qu'il contient
 * @author Jean-Claude Lhote
 * publié le 10/12/2020
 */
export function Pavage () {
  this.type = 1
  this.polygones = []
  this.barycentres = []
  this.tracesCentres = []
  this.numeros = []
  this.coordonnees = []
  this.Nx = 1
  this.Ny = 1
  this.echelle = 20
  this.fenetre = {}

  this.construit = function (type = 1, Nx = 1, Ny = 1, taille = 3) {
    const nettoieObjets = function (objets) {
      let barywhite, baryblack // c'est drôle non ?
      for (let i = 0; i < objets.length; i++) {
        barywhite = barycentre(objets[i])
        for (let j = i + 1; j < objets.length;) {
          baryblack = barycentre(objets[j])
          if (egal(barywhite.x, baryblack.x, 0.1) && egal(barywhite.y, baryblack.y, 0.1)) {
            objets.splice(j, 1)
          } else {
            j++
          }
        }
      }
    }
    let A
    let B
    let v
    let w
    let C
    let D
    let XMIN = 0
    let YMIN = 0
    let XMAX = 0
    let YMAX = 0
    let P1
    let P2
    let P3
    let P4
    let P5
    let P6
    let P7
    let P8
    let P9
    let P10
    let P11
    let P12
    A = point(0, 0)
    B = point(taille, 0)
    switch (type) {
      case 1: // triangles équilatéraux
        v = vecteur(A, B)
        w = rotation(v, A, -90)
        w = homothetie(w, A, 1.73205)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            P1 = polygoneRegulier(A, B, 3)
            P2 = rotation(P1, A, 60)
            P3 = rotation(P1, A, -60)
            P4 = rotation(P1, A, -120)
            this.polygones.push(P1, P2, P3, P4)
            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
          B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
          A = translation(A, w)
          B = translation(B, w)
        }
        break

      case 2: // carrés
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -90)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            P1 = polygoneRegulier(A, B, 4)
            P2 = rotation(P1, A, 90)
            P3 = rotation(P1, A, -90)
            P4 = rotation(P1, A, -180)
            this.polygones.push(P1, P2, P3, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x, -2 * v.y))
          B = translation(B, vecteur(-Nx * v.x, -2 * v.y))
          A = translation(A, w)
          B = translation(B, w)
        }
        break

      case 3: // hexagones
        B = homothetie(B, A, 0.8)
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -90)
        w = homothetie(w, A, 1.73205)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = similitude(B, A, 30, 1.1547)
            P1 = polygoneRegulier(A, C, 6)
            P2 = rotation(P1, A, -120)
            P3 = translation(P1, v)
            P4 = translation(P2, v)
            this.polygones.push(P1, P2, P3, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(2 * v.x, 0))
            B = translation(B, vecteur(2 * v.x, 0))
          }
          A = translation(A, vecteur(-Nx * 2 * v.x, w.y))
          B = translation(B, vecteur(-Nx * 2 * v.x, w.y))
        }
        break

      case 4: // Pavage 3².4.3.4
        v = vecteur(A, B)
        v = homothetie(v, A, 2.73205)
        w = rotation(v, A, -90)
        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(B, A, 60)
            P1 = polygoneRegulier(A, B, 3)
            P2 = rotation(P1, A, 150)
            P6 = rotation(P1, B, -150)
            P7 = rotation(P1, B, 60)
            P9 = rotation(P2, C, 150)
            P10 = rotation(P9, A, -60)
            P11 = rotation(P2, B, 60)
            P12 = rotation(P6, A, -60)
            P3 = polygoneRegulier(A, C, 4)
            P4 = polygoneRegulier(C, B, 4)
            P5 = rotation(P4, B, -150)
            P8 = rotation(P3, A, 150)

            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P11.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }

            for (const p of P12.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P9.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P10.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(v.x, 0))
            B = translation(B, vecteur(v.x, 0))
          }
          A = translation(A, vecteur(-Nx * v.x, w.y))
          B = translation(B, vecteur(-Nx * v.x, w.y))
        }
        break
      case 5: // 4.8²
        v = vecteur(A, B)
        v = homothetie(v, A, 2.4142)
        w = rotation(v, A, -90)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, -135)
            P1 = polygoneRegulier(A, B, 8)
            P2 = polygoneRegulier(B, A, 8)
            P3 = translation(P1, v)
            P4 = translation(P2, v)
            P5 = polygoneRegulier(C, B, 4)
            P6 = translation(P5, v)
            P7 = translation(P5, w)
            P8 = translation(P6, w)
            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }

            A = translation(A, vecteur(2 * v.x, 0))
            B = translation(B, vecteur(2 * v.x, 0))
          }
          A = translation(A, vecteur(-Nx * 2 * v.x, 2 * w.y))
          B = translation(B, vecteur(-Nx * 2 * v.x, 2 * w.y))
        }
        break

      case 6: // Pavage hexagonal d'écolier
        v = vecteur(A, B)
        w = rotation(v, A, 60)
        v = vecteur(v.x + w.x, v.y + w.y) // v=AB+CB
        w = rotation(v, A, -60)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, 120)
            D = rotation(B, C, 60)
            P1 = polygone(A, B, C, D)
            P2 = rotation(P1, C, -60)
            P3 = rotation(P1, A, 60)
            P4 = translation(P2, v)
            P5 = translation(P1, v)
            P6 = translation(P3, v)
            P7 = translation(P1, w)
            P8 = translation(P2, w)
            P9 = translation(P3, w)
            this.polygones.push(P1, P2, P3, P4, P5, P6, P7, P8, P9)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P7.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P8.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P9.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, vecteur(w.x + v.x, w.y + v.y))
            B = translation(B, vecteur(w.x + v.x, w.y + v.y))
          }
          A = translation(A, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
          B = translation(B, vecteur(-Nx * (w.x + v.x) + 2 * w.x - v.x, 2 * w.y - v.y))
        }
        break
      case 7:
        v = vecteur(A, B)
        v = homothetie(v, A, 2)
        w = rotation(v, A, -60)

        for (let k = 0; k < Ny; k++) {
          for (let j = 0; j < Nx; j++) {
            C = rotation(A, B, -120)
            D = rotation(B, C, -120)
            P1 = polygoneRegulier(A, B, 6)
            P2 = polygoneRegulier(C, B, 3)
            P3 = rotation(P2, C, 180)
            P4 = translation(P3, w)
            P5 = translation(P2, w)
            P6 = rotation(P1, B, 180)
            this.polygones.push(P1, P2, P3, P6, P5, P4)

            for (const p of P1.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P2.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P3.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P4.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P5.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            for (const p of P6.listePoints) {
              XMIN = Math.min(XMIN, p.x)
              XMAX = Math.max(XMAX, p.x)
              YMIN = Math.min(YMIN, p.y)
              YMAX = Math.max(YMAX, p.y)
            }
            A = translation(A, v)
            B = translation(B, v)
          }
          A = translation(A, vecteur(-Nx * v.x + 2 * w.x - v.x, 2 * w.y - v.y))
          B = translation(B, vecteur(-Nx * v.x + 2 * w.x - v.x, 2 * w.y - v.y))
        }
        break
    }
    this.echelle = 80 / Math.sqrt(XMAX - XMIN)
    this.fenetre = {
      xmin: XMIN - 0.5,
      ymin: YMIN - 0.5,
      xmax: XMAX + 0.5,
      ymax: YMAX + 0.5,
      pixelsParCm: this.echelle,
      scale: this.echelle / 30
    }
    nettoieObjets(this.polygones) // On supprime les doublons éventuels (grâce à leur barycentre)
    // On ajoute les N°
    this.nb_polygones = this.polygones.length // Le nombre de polygones du pavage qui sert dans les boucles

    for (let i = 0; i < this.nb_polygones; i++) {
      this.barycentres.push(barycentre(this.polygones[i]))
      this.tracesCentres.push(tracePoint(this.barycentres[i], 'blue'))
      this.tracesCentres[i].opacite = 0.5
      this.tracesCentres[i].taille = 2
      this.coordonnees.push([this.barycentres[i].x, this.barycentres[i].y])
      this.numeros.push(texteParPosition(nombreAvecEspace(i + 1), this.barycentres[i].x + 0.5, this.barycentres[i].y, 'milieu', 'black', 50 / this.echelle, 0, true))
    }
  }
}

export function pavage () {
  return new Pavage()
}
