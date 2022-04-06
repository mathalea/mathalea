import { mathalea2d } from '../../modules/2d.js'
import { homothetie3d, point3d, polygone3d, prisme3d, pyramide3d, pyramideTronquee3d, translation3d, vecteur3d } from '../../modules/3d.js'
import { context } from '../../modules/context.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { listeQuestionsToContenuSansNumero, randint, shuffle } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const titre = 'Trouver le nombre de faces ou d\'arêtes d’un solide'
export const dateDePublication = '7/11/2021'
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
  this.nbQuestions = 4
  this.formatChampTexte = 'largeur15 inline'
  this.sup = 3
  this.besoinFormulaireNumerique = false
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typeDeQuestion = []
    const choixA = []
    const choixB = []
    this.nbQuestions = Math.min(this.nbQuestions, 50) // Comme il n'y a que 70 questions différentes on limite pour éviter que la boucle ne cherche trop longtemps
    for (let i = 0; i < 7; i++) {
      choixA.push(i * 2 + 1)
      choixB.push(i * 2 + 2)
    }
    const choix1 = shuffle(choixA)
    const choix2 = shuffle(choixB)
    if (this.sup === 3) {
      for (let i = 0; i < Math.ceil(this.nbQuestions / 2); i++) {
        typeDeQuestion.push(choix1[i % 7], choix2[i % 7])
      }
    } else if (this.sup === 2) {
      typeDeQuestion = choix2.slice(0, this.nbQuestions)
    } else { typeDeQuestion = choix1.slice(0, this.nbQuestions) }
    console.log(typeDeQuestion)

    for (let j = 0, choix; j < this.nbQuestions;) {
      choix = typeDeQuestion[j]
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
      const coeff = randint(5, 7) / 10
      for (let i = 0; i < n; i++) {
        points3D.push(point3d(rayon * Math.cos(alpha * i + (n > 5 ? 0.5 : 0)), rayon * Math.sin(alpha * i + (n > 5 ? 0.5 : 0)), 0, !(i > 0 && i <= (n / 2 - 0.1))))
      }
      const base = polygone3d(points3D)
      const corps = prisme3d(base, k)
      const base2 = translation3d(base, k)
      for (let i = 0; i < base2.c2d.length; i++) {
        base2.c2d[i].pointilles = 2 // !(i > 0 && i <= (n / 2 - 0.1)) ? false : 2
      }
      const chapeau1 = choix < 7 ? pyramide3d(base2, s1) : choix < 9 ? pyramide3d(base, s1) : choix < 13 ? pyramideTronquee3d(base, s1, coeff) : pyramide3d(base, s1)
      const chapeau2 = choix < 9 ? pyramide3d(base, s2) : choix < 11 ? pyramideTronquee3d(base, s2, coeff) : choix < 13 ? pyramide3d(base, s2) : pyramideTronquee3d(base, s2, coeff)

      for (let i = 0; i < n; i++) {
        if (i >= 0 && i < n / 2) {
          chapeau1.c2d[i].pointilles = 2
          if (i !== 0) {
            chapeau1.c2d[i + n].pointilles = 2
          }
          chapeau2.c2d[i].pointilles = 2
          if (i !== 0) {
            chapeau2.c2d[i + n].pointilles = 2
          }
          corps.c2d[i].pointilles = 2
          if (choix < 5) {
            corps.c2d[i + n].pointilles = 2
          }
          if (i !== 0) {
            corps.c2d[i + 2 * n].pointilles = 2
          }
          if ((choix > 8 && choix < 11) || choix > 12) {
            chapeau2.c2d[i + 2 * n].pointilles = 2
          }
          if (choix > 10 && choix < 13) {
            if (i !== 0) {
              chapeau2.c2d[i + n].pointilles = 2
            }
          }
          if (choix > 12) {
            if (i !== 0) {
              chapeau1.c2d[i + n].pointilles = 2
            }
          }
        }
      }
      switch (choix) {
        case 1: // Prisme + 2 pyramides -> faces ?
          objets.push(...corps.c2d, ...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 3 * n
          this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors le prisme et les deux pyramides possèdent aussi $${n}$ faces.<br>Ce solide est donc constitué de $3\\times ${n}$ faces soit $${3 * n}$ faces.`
          break
        case 2: // Prisme + 2 pyramides -> arêtes ?
          objets.push(...corps.c2d, ...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 5 * n
          this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes latérales du prisme.<br>Si on ajoute les $${n}$ arêtes de chacune des bases des pyramides, on obtient donc $5\\times ${n}$ arêtes soit $${5 * n}$ arêtes.`
          break
        case 3: // Prisme + 1 pyramide au dessus -> faces ?
          objets.push(...corps.c2d, ...chapeau1.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n + 1
          this.correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessous, ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

          break
        case 4: // Prisme + 1 pyramide au dessus -> arêtes ?
          objets.push(...corps.c2d, ...chapeau1.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 4 * n
          this.correction = `Comme le prisme a $${n}$ arêtes latérales, alors la pyramide en a $${n}$ aussi.<br>En ajoutant les arêtes des deux bases du prisme soit $2\\times ${n}$ arêtes, on obtient donc $4\\times ${n}$ arêtes soit $${4 * n}$ arêtes.`

          break
        case 5: // Prisme + 1 pyramide en dessous -> faces ?
          objets.push(...corps.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n + 1
          this.correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessus, ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

          break
        case 6: // Prisme + 1 pyramide en dessous -> arêtes ?
          objets.push(...corps.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 4 * n
          this.correction = `Comme le prisme a $${n}$ arêtes latérales, alors la pyramide en a $${n}$ aussi.<br>En ajoutant les arêtes des deux bases du prisme soit $2\\times ${n}$ arêtes, on obtient donc $4\\times ${n}$ arêtes soit $${4 * n}$ arêtes.`
          break
        case 7: // 2 pyramides -> faces ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n
          this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, elles ont aussi $${n}$ faces latérales.<br>Ce solide est donc constitué de $2\\times ${n}$ faces soit $${2 * n}$ faces.`

          break
        case 8: // 2 pyramides -> arêtes ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 3 * n
          this.correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes de la base commune aux deux pyramide.<br>On obtient donc $3\\times ${n}$ arêtes soit $${3 * n}$ arêtes.`
          break
        case 9: // 2 tronc de pyramides -> faces ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n + 2
          this.correction = `Les deux pyramides tronquées ont une base commune à $${n}$ sommets, elles ont donc $${n}$ faces latérales chacune auxquelles il faut ajouter les deux faces parallèles du dessus et du dessous.<br>Ce solide est donc constitué de $2\\times ${n}+2$ faces soit $${2 * n + 2}$ faces.`

          break
        case 10: // 2 tronc de pyramides -> arêtes ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 5 * n
          this.correction = `Les deux pyramides tronquées ont une base commune à $${n}$ sommets.<br>Donc elles ont aussi $${n}$ arêtes latérales chacune.<br>Il faut ajouter les $${n}$ arêtes de la base commune aux deux pyramides.<br>Enfin on ajoute les ${n} arêtes de la face du dessus et les ${n} arêtes de la face du dessous.<br>Au total, il y a $5\\times ${n}$ arêtes soit $${5 * n}$ arêtes.`
          break
        case 11: // 1 tronc de pyramides au dessus et 1 pyramide en dessous -> faces ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n + 1
          this.correction = `Le solide est composé d'une pyramide à $${n}$ faces latérales et d'un tronc de pyramide<br>qui possède autant de faces latérales plus une face au dessus<br>Ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

          break
        case 12: // 1 tronc de pyramide au dessus et 1 pyramide en dessous -> arêtes ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 4 * n
          this.correction = `Le solide est composé d'une pyramide à $${n}$ arêtes latérales et d'un tronc de pyramide<br>qui possède aussi $${n}$ arêtes latérales.<br>Il faut ajouter les $${n}$ arêtes de chacune des bases du tronc de pyramide.<br>Au total, il y a $4\\times ${n}$ arêtes soit $${4 * n}$ arêtes.`
          break
        case 13: // 1 tronc de pyramides en dessous et 1 pyramide au dessus -> faces ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 2 * n + 1
          this.correction = `Le solide est composé d'une pyramide à $${n}$ faces latérales et d'un tronc de pyramide<br>qui possède autant de faces latérales plus une face au dessus<br>Ce solide est donc constitué de $2\\times ${n}+1$ faces soit $${2 * n + 1}$ faces.`

          break
        default: // 1 tronc de pyramide en dessous et 1 pyramide au dessus -> arêtes ?
          objets.push(...chapeau1.c2d, ...chapeau2.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 4 * n
          this.correction = `Le solide est composé d'une pyramide à $${n}$ arêtes latérales et d'un tronc de pyramide<br>qui possède aussi $${n}$ arêtes latérales.<br>Il faut ajouter les $${n}$ arêtes de chacune des bases du tronc de pyramide.<br>Au total, il y a $4\\times ${n}$ arêtes soit $${4 * n}$ arêtes.`
          break
      }
      if (choix % 2 === 1) {
        this.question += '<br>Quel est le nombre de faces de ce solide ?'
      } else {
        this.question += '<br>Quel est le nombre d\'arêtes de ce solide ?'
      }
      if (this.questionJamaisPosee(j, choix, n)) {
        setReponse(this, j, this.reponse)
        this.question += ajouteChampTexteMathLive(this, j, 'largeur15 inline')
        this.listeQuestions.push(this.question)
        this.listeCorrections.push(this.correction)
        j++
      }
    }
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Sur le nombre d\'arêtes\n 2 : Sur le nombre de faces\n 3 : Mélange']
}
