import { mathalea2d } from '../../../modules/2d.js'
import { homothetie3d, point3d, polygone3d, prisme3d, pyramide3d, translation3d, vecteur3d } from '../../../modules/3d.js'
import { context } from '../../../modules/context.js'
import { choice, randint } from '../../../modules/outils.js'
import Exercice from '../../Exercice.js'
export const titre = 'Nombre de faces ou d\'arêtes'
export const dateDePublication = '2/11/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/*!
 * @author Jean-Claude Lhote
 * Créé le 3/11/2021
 * Référence can6G06
 */
export default function NombreDeFacesEtDAretes () {
  Exercice.call(this)
  this.nbQuestions = 1
  this.typeExercice = 'simple'
  this.formatChampTexte = 'largeur15 inline'
  this.nouvelleVersion = function () {
    const choix = choice([1, 2, 3, 4, 5, 6, 7, 8])
    context.anglePerspective = 20
    const objets = []
    const points3D = []
    const n = randint(3, 8, 7)
    const rayon = 4
    const O = point3d(0, 0, 0)
    const k = vecteur3d(0, 0, 2)
    const k1 = homothetie3d(k, O, 2)
    const k2 = homothetie3d(k, O, -1)
    const s1 = translation3d(O, k1)
    const s2 = translation3d(O, k2)
    const alpha = Math.PI * 2 / n
    console.log('k', k, 'k1', k1, 'k2', k2, 's1', s1, 's2', s2)
    for (let i = 0; i < n; i++) {
      points3D.push(point3d(rayon * Math.cos(alpha * i + (n > 5 ? 0.5 : 0)), rayon * Math.sin(alpha * i + (n > 5 ? 0.5 : 0)), 0, !(i > 0 && i <= (n / 2 - 0.1))))
    }
    const base = polygone3d(points3D)
    const corps = prisme3d(base, k)
    const base2 = translation3d(base, k)
    for (let i = 0; i < base2.p2d.length; i++) {
      base2.p2d[i].pointilles = 2 // !(i > 0 && i <= (n / 2 - 0.1)) ? false : 2
    }
    const chapeau1 = choix < 7 ? pyramide3d(base2, s1) : pyramide3d(base, s1)
    const chapeau2 = pyramide3d(base, s2)

    for (let i = 0; i < n; i++) {
      if (i >= 0 && i < n / 2) {
        chapeau1.p2d[i].pointilles = 2
        if (i !== 0) {
          chapeau1.p2d[i + n].pointilles = 2
        }
        chapeau2.p2d[i].pointilles = 2
        if (i !== 0) {
          chapeau2.p2d[i + n].pointilles = 2
        }
        corps.p2d[i].pointilles = 2
        if (choix < 5) {
          corps.p2d[i + n].pointilles = 2
        }
        if (i !== 0) {
          corps.p2d[i + 2 * n].pointilles = 2
        }
      }
    }
    switch (choix) {
      case 1: // Prisme + 2 pyramides -> faces ?
        objets.push(...corps.p2d, ...chapeau1.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 3 * n
        this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors le prisme et les deux pyramides possèdent aussi $${n}$ faces.<br>Ce solide est donc constitué de $3\\times ${n}$ faces soit $${3 * n}$ faces.`
        break
      case 2: // Prisme + 2 pyramides -> arêtes ?
        objets.push(...corps.p2d, ...chapeau1.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 5 * n
        this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes latérales du prisme.<br>Si on ajoute les $${n}$ arêtes de chacune des bases des pyramides, on obtient donc $5\\times ${n}$ arêtes soit $${5 * n}$ arêtes.`
        break
      case 3: // Prisme + 1 pyramides au dessus -> faces ?
        objets.push(...corps.p2d, ...chapeau1.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 2 * n + 1
        this.correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessous, ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

        break
      case 4: // Prisme + 1 pyramides au dessus -> arêtes ?
        objets.push(...corps.p2d, ...chapeau1.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 5 * n
        this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes latérales du prisme.<br>Si on ajoute les $${n}$ arêtes de chacune des bases des pyramides, on obtient donc $5\\times ${n}$ arêtes soit $${5 * n}$ arêtes.`

        break
      case 5: // Prisme + 1 pyramides en dessous -> faces ?
        objets.push(...corps.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5 }, objets)
        this.reponse = 2 * n + 1
        this.correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessus, ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

        break
      case 6: // Prisme + 1 pyramides en dessous -> arêtes ?
        objets.push(...corps.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5 }, objets)
        this.reponse = 4 * n
        this.correction = `Comme le prisme a $${n}$ arêtes latérales, alors la pyramide en a $${n}$ aussi.<br>En ajoutant les arêtes des deux bases du prisme soit $2\\times ${n}$ arêtes, on obtient donc $4\\times ${n}$ arêtes soit $${4 * n}$ arêtes.`
        break
      case 7: // 2 pyramides -> faces ?
        objets.push(...chapeau1.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 2 * n
        this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, elles ont aussi $${n}$ faces latérales.<br>Ce solide est donc constitué de $2\\times ${n}$ faces soit $${2 * n}$ faces.`

        break
      case 8: // 2 pyramides -> arêtes ?
        objets.push(...chapeau1.p2d, ...chapeau2.p2d)
        this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5 }, objets)
        this.reponse = 3 * n
        this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes de la base commune aux deux pyramide.<br>On obtient donc $3\\times ${n}$ arêtes soit $${3 * n}$ arêtes.`
        break
    }
    if (choix % 2 === 1) {
      this.question += 'Quel est le nombre de faces de ce solide ?'
    } else {
      this.question += 'Quel est le nombre d\'arêtes de ce solide ?'
    }
  }
}
