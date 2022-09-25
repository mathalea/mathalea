
import { point3d, polygone3d, prisme3d, pyramide3d, rotation3d, droite3d, arete3d, arc3d, cone3d, vecteur3d, cylindre3d, sphere3d } from '../../modules/3d.js'
import { segment } from '../../modules/2d.js'
import { context } from '../../modules/context.js'
import { setReponse, ajouteChampTexte } from '../../modules/gestionInteractif.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { listeQuestionsToContenu, randint, combinaisonListes } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
export const titre = 'Reconnaitre des solides'
export const dateDePublication = '24/09/2022'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC

/*!
 * @author Mickael Guironnet
 * Créé le 24/09/2022
 */
export const ref = '6G44-1'
export default function ReconnaitreDesSolides () {
  Exercice.call(this)
  this.nbQuestions = 4
  this.formatChampTexte = 'largeur15 inline'
  this.sup = '1-2-3' // Type de question
  this.sup2 = false // qcm
  this.sup3 = false // axes
  this.consigne = 'Donner le nom de chacun des solides.'

  this.nouvelleVersion = function () {
    this.interactifType = this.sup2 ? 'qcm' : 'mathLive'
    const isAxe = this.sup3
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let typeDeQuestion = []
    this.nbQuestions = Math.min(this.nbQuestions, 50) // Comme il n'y a que 70 questions différentes on limite pour éviter que la boucle ne cherche trop longtemps
    /* const listePrimes = [
      '1,1,3', '1,1,4', '1,1,5', '1,1,6', '1,1,7', '1,1,8', // prisme de 3 à 8 sommets sur la base suivant l'axe z
      '1,2,3', '1,2,4', '1,2,5', '1,2,6', '1,2,7', '1,2,8', // prisme de 3 à 8 sommets sur la base suivant l'axe x
      '1,3,3', '1,3,4', '1,3,5', '1,3,6', '1,3,7', '1,3,8'] // prisme de 3 à 8 sommets sur la base suivant l'axe y
    const listePyramides = [
      '2,1,3', '2,1,4', '2,1,5', '2,1,6', '2,1,7', '2,1,8', // pyramide de 3 à 8 sommets sur la base suivant l'axe z
      '2,2,3', '2,2,4', '2,2,5', '2,2,6', '2,2,7', '2,2,8', // pyramide de 3 à 8 sommets sur la base suivant l'axe x
      '2,3,3', '2,3,4', '2,3,5', '2,3,6', '2,3,7', '2,3,8'] // pyramide de 3 à 8 sommets sur la base suivant l'axe y
      */
    const listeDesProblemes = []
    if (!this.sup) { // Si aucune liste n'est saisie ou mélange demandé
      listeDesProblemes.push('1', '2', '3', '4', '5', '6', '7', '1', '2', '1', '2', '1', '2', '1', '2', '3', '4', '5')
    } else {
      const quests = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
      for (let i = 0; i < quests.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
        const type = quests[i].split(',')
        const choixtp = parseInt(type[0])
        if (choixtp >= 1 && choixtp <= 8) {
          listeDesProblemes.push(quests[i])
        } else {
          listeDesProblemes.push('1', '2', '3', '4', '5', '6', '7', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '1', '2', '3', '4', '5')
        }
      }
    }
    typeDeQuestion = combinaisonListes(listeDesProblemes, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let j = 0, k = 0, choix; j < this.nbQuestions && k < 50; k++) {
      const type = typeDeQuestion[j].split(',')
      choix = parseInt(type[0])
      context.anglePerspective = 30
      const objets = []

      // les 3 axes
      const a1 = isAxe ? arete3d(point3d(0, 0, 0), point3d(1, 0, 0), 'green') : {}
      const a2 = isAxe ? arete3d(point3d(0, 0, 0), point3d(0, 1, 0), 'red') : {}
      const a3 = isAxe ? arete3d(point3d(0, 0, 0), point3d(0, 0, 1), 'blue') : {}

      // axe=1 -> base dans XY ;  axe=2 -> base dans YZ ; axe=3 -> base dans XZ ;
      let axe = ((choix >= 1 && choix <= 5) ? (type.length > 1 ? parseInt(type[1]) : randint(1, 3)) : 0)

      // nombre de sommet de la base.
      const n = (choix < 3 ? (type.length > 2 ? parseInt(type[2]) : randint(3, 8)) : (choix === 5 || choix === 6 ? 4 : 0))

      let prisme, pyra, cone, cylindre, pave, sphere
      switch (choix) {
        case 1: // Prisme  ?
        case 2: // Pyramides  ?
          {
            const points3XY = []
            const points3XZ = []
            const points3YZ = []
            const rayon = 2
            const alpha = Math.PI * 2 / n
            for (let i = 0; i < n; i++) {
              points3XY.push(point3d(rayon * Math.cos(alpha * i), rayon * Math.sin(alpha * i), 0, !(i > 0 && i <= (n / 2 - 0.1))))
              points3XZ.push(point3d(rayon * Math.cos(alpha * i), 5, rayon * Math.sin(alpha * i), true))
              points3YZ.push(point3d(-1, rayon * Math.cos(alpha * i), rayon * Math.sin(alpha * i), !(i === 0 || (n > 6 && i === n - 1) || (n > 6 && i === 1) || (n === 6 && i === 5))))
            }
            if (axe === 3) {
              // base sur le plan YZ
              if (n === 3 || n === 4 || n === 7 || n === 8) {
                const points3DRota = []
                for (let i = 0; i < points3XY.length; i++) {
                  if (n === 3) {
                    points3DRota.push(rotation3d(points3XZ[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)), -90, 'red'))
                  } else if (n === 4) {
                    points3DRota.push(rotation3d(points3XZ[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)), -45 + (i === 0 ? 30 : (i === 1 ? -30 : 0)), 'red'))
                  } else if (n === 7) {
                    points3DRota.push(rotation3d(points3XZ[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)), -30, 'red'))
                  } else if (n === 8) {
                    points3DRota.push(rotation3d(points3XZ[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)), -30, 'red'))
                  }
                }
                points3XZ.length = 0
                points3XZ.push(...points3DRota)
              }
              for (let i = 0; i < points3XZ.length; i++) {
                points3XZ[i].visible = !((n === 3 && i === 1) || (n === 4 && i === 2) || (n > 4 && i > 2 && i < 2 + Math.floor(n / 2)))
              }
              const base = polygone3d(points3XZ)
              const k2 = vecteur3d(0, -6, 0)
              if (choix === 1) {
                prisme = prisme3d(base, k2)
              } else {
                pyra = pyramide3d(base, k2)
              }
            } else if (axe === 2) {
              // base sur le plan YZ
              if (n === 4) {
                const points3DRota = []
                for (let i = 0; i < points3YZ.length; i++) {
                  points3DRota.push(rotation3d(points3YZ[i], droite3d(point3d(0, 0, 0), vecteur3d(1, 0, 0)), 0 + (i === 0 ? 30 : (i === 1 ? -30 : 0)), 'red'))
                }
                points3YZ.length = 0
                points3YZ.push(...points3DRota)
                points3YZ[0].visible = false
              }
              const base = polygone3d(points3YZ)
              const k1 = vecteur3d(3, 0, 0)
              if (choix === 1) {
                prisme = prisme3d(base, k1)
              } else {
                pyra = pyramide3d(base, k1)
                if (n === 3 || n === 4 || n === 5) {
                  pyra.c2d[n - 1].pointilles = 2
                } else if (n === 6) {
                  pyra.c2d[n - 1].pointilles = 2
                  pyra.c2d[n - 2].pointilles = 2
                  pyra.c2d[2 * n - 1].pointilles = 2
                } else if (n === 7 || n === 8) {
                  pyra.c2d[1].pointilles = false
                  pyra.c2d[n - 2].pointilles = 2
                  pyra.c2d[n + 1].pointilles = false
                }
              }
            } else {
              // base sur le plan XY
              if (n === 4) {
                const points3DRota = []
                for (let i = 0; i < points3XY.length; i++) {
                  points3DRota.push(rotation3d(points3XY[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 0, 1)), 0 + (i === 0 ? 30 : (i === 1 ? -30 : 0)), 'red'))
                }
                points3XY.length = 0
                points3XY.push(...points3DRota)
                points3XY[1].visible = false
              }
              const base = polygone3d(points3XY)
              const k3 = vecteur3d(0, 0, 3)
              if (choix === 1) {
                prisme = prisme3d(base, k3)
              } else {
                pyra = pyramide3d(base, k3)
                if (n === 3 || n === 4 || n === 5) {
                  pyra.c2d[0].pointilles = 2
                } else if (n === 7 || n === 8) {
                  pyra.c2d[n + 1].pointilles = false
                }
              }
            }
          }
          break
        case 3: // cone  ?
          if (axe === 3) {
            cone = cone3d(point3d(0, 0, 0), point3d(0, -3, 0), vecteur3d(0, 1, 0), vecteur3d(Math.cos(30 * Math.PI / 180.0), 0, Math.sin(30 * Math.PI / 180.0)))
            /* c1 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 0)
            c2 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 0) */
            const c1 = arc3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 180, 220)
            const c2 = arc3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 220, 360 + 180)
            const g1 = arete3d(point3d(0, -3, 0), point3d(1, 0, 0))
            const g2 = arete3d(point3d(0, -3, 0), point3d(-1, 0, 0))
            cone.c2d.length = 0
            cone.c2d.push(c1, c2, g1.c2d, g2.c2d, arete3d(point3d(0, 2, 0), point3d(0, -4, 0), 'red', false).c2d)
          } else if (axe === 2) {
            cone = cone3d(point3d(0, 0, 0), point3d(3, 0, 0), vecteur3d(1, 0, 0), vecteur3d(0, Math.cos(60 * Math.PI / 180.0), Math.sin(60 * Math.PI / 180.0)))
            cone.c2d[4].pointilles = 2
            cone.c2d[4].color = colorToLatexOrHTML('red')
            cone.c2d[5].pointilles = false
            cone.c2d[5].color = colorToLatexOrHTML('blue')
          } else {
            cone = cone3d(point3d(0, 0, 0), point3d(0, 0, 3), vecteur3d(0, 0, 1), 2)
          }
          break
        case 4: // cylindre
          if (axe === 3) {
            cylindre = cylindre3d(point3d(0, 0, 2), point3d(0, -3, 2), vecteur3d(0, 1, 0), vecteur3d(1, 0, 0), vecteur3d(1, 0, 0))
            /* c1 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 0)
            c2 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 0) */
            const c1 = arc3d(point3d(0, 3, 1), vecteur3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 110, 280)
            const c2 = arc3d(point3d(0, 3, 1), vecteur3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 280, 360 + 110)
            const c3 = arc3d(point3d(0, -0.5, 1), vecteur3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'blue', 110, 280)
            const c4 = arc3d(point3d(0, -0.5, 1), vecteur3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 280, 360 + 110)
            // generatrice
            const g = []
            for (let i = 0; i < c1.listePoints.length; i += 2) {
              const s = segment(c3.listePoints[i], c1.listePoints[i])
              s.pointilles = 2
              s.opacite = 0.3
              g.push(s)
            }
            for (let i = 0; i < c2.listePoints.length; i += 2) {
              const s = segment(c4.listePoints[i], c2.listePoints[i])
              s.opacite = 0.6
              g.push(s)
            }
            c3.pointilles = 0
            c3.opacite = 1
            cylindre.c2d = []
            cylindre.c2d.push(c1, c2, c3, c4, g, arete3d(point3d(0, 4, 1), point3d(0, -4, 1), 'red', false).c2d)
          } else if (axe === 2) {
            // base sur le plan YZ
            cylindre = cylindre3d(point3d(0, 0, 0), point3d(3, 0, 0), vecteur3d(1, 0, 0), vecteur3d(0, 1, 0), vecteur3d(0, 1, 0))
            /* c1 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 0)
            c2 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 0) */
            const c1 = arc3d(point3d(0, 0, 1), vecteur3d(1, 0, 0), vecteur3d(0, 1, 0), 'visible', 'red', 90, 270)
            const c2 = arc3d(point3d(0, 0, 1), vecteur3d(1, 0, 0), vecteur3d(0, 1, 0), 'caché', 'red', 270, 360 + 90)
            const c3 = arc3d(point3d(3, 0, 1), vecteur3d(1, 0, 0), vecteur3d(0, 1, 0), 'visible', 'blue', 90, 270)
            const c4 = arc3d(point3d(3, 0, 1), vecteur3d(1, 0, 0), vecteur3d(0, 1, 0), 'caché', 'blue', 270, 360 + 90)
            // generatrice
            const g = []
            for (let i = 0; i < c1.listePoints.length; i += 2) {
              const s = segment(c3.listePoints[i], c1.listePoints[i])
              s.opacite = 0.6
              g.push(s)
            }
            for (let i = 0; i < c2.listePoints.length; i += 2) {
              const s = segment(c4.listePoints[i], c2.listePoints[i])
              s.pointilles = 2
              s.opacite = 0.3
              g.push(s)
            }
            c4.pointilles = 0
            c4.opacite = 1
            cylindre.c2d = []
            cylindre.c2d.push(c1, c2, c3, c4, g, arete3d(point3d(-1, 0, 1), point3d(4, 0, 1), 'red', false).c2d)
          } else {
            cylindre = cylindre3d(point3d(0, 0, 0), point3d(0, 0, 3), vecteur3d(0, 0, 1), vecteur3d(2, 0, 0), vecteur3d(2, 0, 0))
          }
          break
        case 5: // pavé droit
        case 6: // cube
        {
          if (choix === 6) {
            axe = 2 // cube quelquesoit l'axe
          }
          const points3XY = []
          const points3XZ = []
          const points3YZ = []
          const rayon = 2
          const alpha = Math.PI * 2 / n
          for (let i = 0; i < n; i++) {
            points3XY.push(point3d(rayon * Math.cos(alpha * i), rayon * Math.sin(alpha * i), 0, !(i > 0 && i <= (n / 2 - 0.1))))
            points3XZ.push(point3d(rayon * Math.cos(alpha * i), 5, rayon * Math.sin(alpha * i), true))
            points3YZ.push(point3d(-1, rayon * Math.cos(alpha * i), rayon * Math.sin(alpha * i), !(i === 0 || (n > 6 && i === n - 1) || (n > 6 && i === 1) || (n === 6 && i === 5))))
          }
          if (axe === 3) {
            // base sur le plan YZ
            const points3DRota = []
            for (let i = 0; i < points3XY.length; i++) {
              points3DRota.push(rotation3d(points3XZ[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)), -45, 'red'))
            }
            points3XZ.length = 0
            points3XZ.push(...points3DRota)

            for (let i = 0; i < points3XZ.length; i++) {
              points3XZ[i].visible = !((n === 3 && i === 1) || (n === 4 && i === 2) || (n > 4 && i > 2 && i < 2 + Math.floor(n / 2)))
            }
            const base = polygone3d(points3XZ)
            const k2 = vecteur3d(0, -6, 0)
            pave = prisme3d(base, k2)
          } else if (axe === 2) {
            // base sur le plan YZ
            const points3DRota = []
            for (let i = 0; i < points3YZ.length; i++) {
              points3DRota.push(rotation3d(points3YZ[i], droite3d(point3d(0, 0, 0), vecteur3d(1, 0, 0)), -45, 'red'))
            }
            points3YZ.length = 0
            points3YZ.push(...points3DRota)
            points3YZ[0].visible = false

            const base = polygone3d(points3YZ)
            if (choix === 6) {
              const k1 = vecteur3d(3, 0, 0)
              pave = prisme3d(base, k1)
            } else {
              pave = prisme3d(base, vecteur3d(5, 0, 0))
            }
          } else {
            // base sur le plan XY
            const points3DRota = []
            for (let i = 0; i < points3XY.length; i++) {
              points3DRota.push(rotation3d(points3XY[i], droite3d(point3d(0, 0, 0), vecteur3d(0, 0, 1)), 0, 'red'))
            }
            points3XY.length = 0
            points3XY.push(...points3DRota)
            points3XY[1].visible = false
            const base = polygone3d(points3XY)
            const k3 = vecteur3d(0, 0, 3)
            pave = prisme3d(base, k3)
          }
          break
        }
        case 7: // sphère
          sphere = sphere3d(point3d(0, 0, 0), 2, 3, 2, 'black')
          break
      }
      let reponseQcm

      switch (choix) {
        case 1: // Prisme  ?
          objets.push(...prisme.c2d, a1.c2d, a2.c2d, a3.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = ['prisme', 'prisme droit']
          reponseQcm = 'prisme'
          this.correction = `Prisme droit avec une base ayant $${prisme.base1.listePoints.length}$ sommets.` // et selon l'axe=$${axe}$`
          break
        case 2: // Pyramides  ?
          objets.push(...pyra.c2d, a1.c2d, a2.c2d, a3.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 'pyramide'
          reponseQcm = 'pyramide'
          this.correction = `Pyramide avec une base ayant $${pyra.base.listePoints.length}$ sommets.`// et selon l'axe=$${axe}$`
          break
        case 3: // cône?
          objets.push(...cone.c2d, a1.c2d, a2.c2d, a3.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = ['cône', 'cone', 'cône de révolution', 'cone de révolution']
          reponseQcm = 'cône'
          this.correction = 'Cône de révolution.' // suivant l'axe=$${axe}$`
          break
        case 4: // cylindre ?
          objets.push(...cylindre.c2d, a1.c2d, a2.c2d, a3.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -1, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = ['cylindre', 'cylindre de révolution']
          reponseQcm = 'cylindre'
          this.correction = 'Cylindre de révolution.'// suivant l'axe=$${axe}$`
          break
        case 5: // pave ?
          objets.push(...pave.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 'pavé droit'
          reponseQcm = 'pavé droit'
          this.correction = 'Pavé droit.' // selon l'axe=$${axe}$`
          break
        case 6: // cube ?
          objets.push(...pave.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 3.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 'cube'
          reponseQcm = 'cube'
          this.correction = 'Cube.'
          break
        case 7: // sphère ?
          objets.push(...sphere.c2d)
          this.question = mathalea2d({ xmin: -6, ymin: -2.5, xmax: 6, ymax: 4.5, scale: 0.5, style: 'margin: auto' }, objets)
          this.reponse = 'sphère'
          reponseQcm = 'sphère'
          this.correction = 'Sphère.'
          break
      }

      this.autoCorrection[j] = {}
      this.autoCorrection[j].options = {}
      this.autoCorrection[j].enonce = `${this.question}\n`
      this.autoCorrection[j].propositions = [
        {
          texte: 'Prisme',
          statut: (reponseQcm === 'prisme')
        },
        {
          texte: 'Pyramide',
          statut: (reponseQcm === 'pyramide')
        },
        {
          texte: 'Cône',
          statut: (reponseQcm === 'cône')
        },
        {
          texte: 'Cylindre',
          statut: (reponseQcm === 'cylindre')
        },
        {
          texte: 'Pavé',
          statut: (reponseQcm === 'pavé droit')
        },
        {
          texte: 'Cube',
          statut: (reponseQcm === 'cube')
        },
        {
          texte: 'Sphère',
          statut: (reponseQcm === 'sphère')
        }
      ]
      if (this.questionJamaisPosee(j, choix, n, axe)) {
        if (this.sup2) {
          this.question += propositionsQcm(this, j).texte
        } else {
          setReponse(this, j, this.reponse, { formatInteractif: 'ignorerCasse' })
          this.question += '<br>' + ajouteChampTexte(this, j, this.reponse)
        }
        this.listeQuestions.push(this.question)
        this.listeCorrections.push(this.correction)
        j++
      }
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Type de question', [
      'Nombres séparés par des tirets',
      '0 : Mélange',
      '1 : Prisme',
      '2 : Pyramide',
      '3 : Cône',
      '4 : Cylindre',
      '5 : Pavé',
      '6 : Cube',
      '7 : Sphère'
    ].join('\n')
  ]
  this.besoinFormulaire2CaseACocher = ['QCM']
  this.besoinFormulaire3CaseACocher = ['Avec les axes']
}
