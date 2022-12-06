import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { choice } from '../../../modules/outils.js'
import {
  point, cercleCentrePoint, polygoneAvecNom, grille, pointSurCercle, segment, texteParPosition
} from '../../../modules/2d.js'
export const titre = 'Associer une mesure d\'angle à un  point du cercle trigonométrique '
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '31/10/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence can1G10
 *
*/

export const uuid = '33ae8'
export const ref = 'can1G10'
export default function PointSurCercleTrigo () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.typeExercice = 'simple' // Cette ligne est très importante pour faire faire un exercice simple !
  this.formatChampTexte = 'largeur15 inline'
  this.nbQuestions = 1
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.tailleDiaporama = 2
  this.nouvelleVersion = function () {
    let choix
    const r = 5
    const O = point(0, 0, 'O', 'below left')
    const o = texteParPosition('O', -0.4, -0.4, 'milieu', 'black', 1)
    const I = point(r, 0, 'I', 'right')
    const J = point(0, r, 'J', 'above')
    const K = point(-r, 0, 'K', 'left')
    const L = point(0, -r, 'L', 'below')
    const I2 = point(-r, 0)
    const J2 = point(0, -r)
    const s1 = segment(I, I2)
    const s2 = segment(J, J2)
    const c = cercleCentrePoint(O, I)
    c.epaisseur = 3
    const sOI = segment(O, I, 'blue')
    sOI.epaisseur = 3
    const A1 = pointSurCercle(c, 30, 'A', 'above right')
    const A2 = pointSurCercle(c, 210, 'G', 'below left')
    const sA1A2 = segment(A1, A2, 'blue')
    sA1A2.epaisseur = 1
    sA1A2.pointilles = 5
    const B1 = pointSurCercle(c, 45, 'B', 'above right')
    const B2 = pointSurCercle(c, 225, 'H', 'below left')
    const sB1B2 = segment(B1, B2, 'blue')
    sB1B2.epaisseur = 1
    sB1B2.pointilles = 5
    const C1 = pointSurCercle(c, 60, 'C', 'above right')
    const C2 = pointSurCercle(c, 240, 'M', 'below left')
    const sC1C2 = segment(C1, C2, 'blue')
    sC1C2.epaisseur = 1
    sC1C2.pointilles = 5
    const D1 = pointSurCercle(c, 120, 'D', 'above left')
    const D2 = pointSurCercle(c, -60, 'N', 'below right')
    const sD1D2 = segment(D1, D2, 'blue')
    sD1D2.epaisseur = 1
    sD1D2.pointilles = 5
    const E1 = pointSurCercle(c, 135, 'E', 'above left')
    const E2 = pointSurCercle(c, -45, 'P', 'below right')
    const sE1E2 = segment(E1, E2, 'blue')
    sE1E2.epaisseur = 1
    sE1E2.pointilles = 5
    const F1 = pointSurCercle(c, 150, 'F', 'above left')
    const F2 = pointSurCercle(c, -30, 'Q', 'below right')
    const sF1F2 = segment(F1, F2, 'blue')
    sF1F2.epaisseur = 1
    sF1F2.pointilles = 5
    const g = grille(-5, -5, 5, 5, 'black', 0.4, 2.5)
    const nom = polygoneAvecNom(A1, A2, B1, B2, C1, C2, D1, D2, E1, E2, F1, F2, I, J, K, L)[1]
    const objet = mathalea2d({ xmin: -r - 3, xmax: r + 3, ymin: -r - 1.5, ymax: r + 1, pixelsParCm: 15, scale: 0.45, style: 'margin: auto' }, c, s1, s2, sA1A2, sB1B2, sC1C2, sD1D2, sE1E2, sF1F2, g, o, nom)
    switch (choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])) { //, 2, 3, 4, 5
      case 1:// point I
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$  a pour point-image le point $I$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le réel $2\\pi$ est associé au point $I$ dans $${choix}$.   `
          this.reponse = '2\\pi'
        } else {
          this.correction = `Le réel $0$ est associé au point $I$ dans $${choix}$.   `
          this.reponse = '0'
        }

        break
      case 2:// point A
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $A$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{\\pi}{6}$  est associé au point $A$ dans $${choix}$.   `
          this.reponse = '\\dfrac{\\pi}{6}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $A$ est le point-image de $\\dfrac{\\pi}{6}$.<br>
            $\\dfrac{\\pi}{6}+2\\pi=\\dfrac{13\\pi}{6}\\in ${choix}$.<br>
             Le réel $\\dfrac{13\\pi}{6}$  est associé au point $A$ dans $${choix}$.   `
          this.reponse = '\\dfrac{13\\pi}{6}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $A$ est le point-image de $\\dfrac{\\pi}{6}$.<br>
            $\\dfrac{\\pi}{6}-2\\pi=-\\dfrac{11\\pi}{6}\\in ${choix}$.<br>
             Le réel $-\\dfrac{11\\pi}{6}$  est associé au point $A$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{11\\pi}{6}'
        }
        break

      case 3:// point B
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $B$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{\\pi}{4}$  est associé au point $B$ dans $${choix}$.   `
          this.reponse = '\\dfrac{\\pi}{4}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $B$ est le point-image de $\\dfrac{\\pi}{4}$.<br>
            $\\dfrac{\\pi}{4}+2\\pi=\\dfrac{9\\pi}{4}\\in ${choix}$.<br>
             Le réel $\\dfrac{9\\pi}{4}$  est associé au point $B$ dans $${choix}$.   `
          this.reponse = '\\dfrac{9\\pi}{4}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $B$ est le point-image de $\\dfrac{\\pi}{4}$.<br>
            $\\dfrac{\\pi}{4}-2\\pi=-\\dfrac{7\\pi}{4}\\in ${choix}$.<br>
             Le réel $-\\dfrac{7\\pi}{4}$  est associé au point $B$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{7\\pi}{4}'
        }

        break

      case 4:// point C
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $C$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{\\pi}{3}$  est associé au point $C$ dans $${choix}$.   `
          this.reponse = '\\dfrac{\\pi}{3}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $C$ est le point-image de $\\dfrac{\\pi}{3}$.<br>
            $\\dfrac{\\pi}{3}+2\\pi=\\dfrac{7\\pi}{3}\\in ${choix}$.<br>
             Le réel $\\dfrac{7\\pi}{3}$  est associé au point $C$ dans $${choix}$.   `
          this.reponse = '\\dfrac{7\\pi}{3}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $C$ est le point-image de $\\dfrac{\\pi}{3}$.<br>
            $\\dfrac{\\pi}{3}-2\\pi=-\\dfrac{5\\pi}{3}\\in ${choix}$.<br>
             Le réel $-\\dfrac{5\\pi}{3}$  est associé au point $C$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{5\\pi}{3}'
        }

        break

      case 5:// point J
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$  a pour point-image le point $J$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{\\pi}{2}$  est associé au point $J$ dans $${choix}$.   `
          this.reponse = '\\dfrac{\\pi}{2}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $J$ est le point-image de $\\dfrac{\\pi}{2}$.<br>
            $\\dfrac{\\pi}{2}+2\\pi=\\dfrac{5\\pi}{2}\\in ${choix}$.<br>
             Le réel $\\dfrac{5\\pi}{2}$  est associé au point $J$ dans $${choix}$.   `
          this.reponse = '\\dfrac{5\\pi}{2}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $J$ est le point-image de $\\dfrac{\\pi}{2}$.<br>
            $\\dfrac{\\pi}{2}-2\\pi=-\\dfrac{3\\pi}{2}\\in ${choix}$.<br>
             Le réel $-\\dfrac{3\\pi}{2}$  est associé au point $J$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{3\\pi}{2}'
        }

        break

      case 6:// point D
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $D$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{2\\pi}{3}$  est associé au point $D$ dans $${choix}$.   `
          this.reponse = '\\dfrac{2\\pi}{3}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $D$ est le point-image de $\\dfrac{2\\pi}{3}$.<br>
            $\\dfrac{2\\pi}{3}+2\\pi=\\dfrac{8\\pi}{3}\\in ${choix}$.<br>
             Le réel $\\dfrac{8\\pi}{3}$  est associé au point $D$ dans $${choix}$.   `
          this.reponse = '\\dfrac{8\\pi}{3}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $D$ est le point-image de $\\dfrac{2\\pi}{3}$.<br>
            $\\dfrac{2\\pi}{3}-2\\pi=-\\dfrac{4\\pi}{3}\\in ${choix}$.<br>
             Le réel $-\\dfrac{4\\pi}{3}$  est associé au point $D$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{4\\pi}{3}'
        }

        break

      case 7:// point E
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $E$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{3\\pi}{4}$  est associé au point $E$ dans $${choix}$.   `
          this.reponse = '\\dfrac{3\\pi}{4}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $E$ est le point-image de $\\dfrac{3\\pi}{4}$.<br>
            $\\dfrac{3\\pi}{4}+2\\pi=\\dfrac{11\\pi}{4}\\in ${choix}$.<br>
             Le réel $\\dfrac{11\\pi}{4}$  est associé au point $E$ dans $${choix}$.   `
          this.reponse = '\\dfrac{11\\pi}{4}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $E$ est le point-image de $\\dfrac{3\\pi}{4}$.<br>
            $\\dfrac{3\\pi}{4}-2\\pi=-\\dfrac{5\\pi}{4}\\in ${choix}$.<br>
             Le réel $-\\dfrac{5\\pi}{4}$  est associé au point $E$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{5\\pi}{4}'
        }

        break

      case 8:// point F
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $F$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === ']-\\pi\\,;\\,\\pi]') {
          this.correction = `Le réel $\\dfrac{5\\pi}{6}$  est associé au point $F$ dans $${choix}$.   `
          this.reponse = '\\dfrac{5\\pi}{6}'
        }
        if (choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $F$ est le point-image de $\\dfrac{5\\pi}{6}$.<br>
            $\\dfrac{5\\pi}{6}+2\\pi=\\dfrac{17\\pi}{6}\\in ${choix}$.<br>
             Le réel $\\dfrac{17\\pi}{6}$  est associé au point $F$ dans $${choix}$.   `
          this.reponse = '\\dfrac{17\\pi}{6}'
        }
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $F$ est le point-image de $\\dfrac{5\\pi}{6}$.<br>
            $\\dfrac{5\\pi}{6}-2\\pi=-\\dfrac{7\\pi}{6}\\in ${choix}$.<br>
             Le réel $-\\dfrac{7\\pi}{6}$  est associé au point $F$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{7\\pi}{6}'
        }

        break

      case 9:// point K
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $K$ ?<br>

        `
        this.question += `${objet}`
        if (choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le réel $-\\pi$ est associé au point $K$ dans $${choix}$.   `
          this.reponse = '-\\pi'
        } else {
          this.correction = `Le réel $\\pi$ est associé au point $K$ dans $${choix}$.   `
          this.reponse = '\\pi'
        }

        break

      case 10:// point G
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $G$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le réel $\\dfrac{7\\pi}{6}$  est associé au point $G$ dans $${choix}$.   `
          this.reponse = '\\dfrac{7\\pi}{6}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $G$ est le point-image de $\\dfrac{7\\pi}{6}$.<br>
            $\\dfrac{7\\pi}{6}-2\\pi=-\\dfrac{5\\pi}{6}\\in ${choix}$.<br>
             Le réel $-\\dfrac{5\\pi}{6}$  est associé au point $G$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{5\\pi}{6}'
        }

        break
      case 11:// point H
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $H$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le réel $\\dfrac{5\\pi}{4}$  est associé au point $H$ dans $${choix}$.   `
          this.reponse = '\\dfrac{5\\pi}{4}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $H$ est le point-image de $\\dfrac{5\\pi}{4}$.<br>
            $\\dfrac{5\\pi}{4}-2\\pi=-\\dfrac{3\\pi}{4}\\in ${choix}$.<br>
             Le réel $-\\dfrac{3\\pi}{4}$  est associé au point $H$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{3\\pi}{4}'
        }

        break

      case 12:// point M
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $M$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le réel $\\dfrac{4\\pi}{3}$  est associé au point $M$ dans $${choix}$.   `
          this.reponse = '\\dfrac{4\\pi}{3}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le point $M$ est le point-image de $\\dfrac{4\\pi}{3}$.<br>
            $\\dfrac{4\\pi}{3}-2\\pi=-\\dfrac{2\\pi}{3}\\in ${choix}$.<br>
             Le réel $-\\dfrac{2\\pi}{3}$  est associé au point $M$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{2\\pi}{3}'
        }

        break

      case 13:// point L
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $L$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le réel $\\dfrac{3\\pi}{2}$  est associé au point $L$ dans $${choix}$.   `
          this.reponse = '\\dfrac{3\\pi}{2}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le réel $-\\dfrac{\\pi}{2}$  est associé au point $L$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{\\pi}{2}'
        }

        break

      case 14:// point N
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $N$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $N$ est le point-image de $-\\dfrac{\\pi}{3}$.<br>
          $-\\dfrac{\\pi}{3}+2\\pi=\\dfrac{5\\pi}{3}\\in ${choix}$.<br>
           Le réel $\\dfrac{5\\pi}{3}$  est associé au point $N$ dans $${choix}$.   `
          this.reponse = '\\dfrac{5\\pi}{3}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le réel $-\\dfrac{\\pi}{3}$  est associé au point $N$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{\\pi}{3}'
        }

        break

      case 15:// point P
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $P$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $P$ est le point-image de $-\\dfrac{\\pi}{4}$.<br>
          $-\\dfrac{\\pi}{4}+2\\pi=\\dfrac{7\\pi}{4}\\in ${choix}$.<br>
           Le réel $\\dfrac{7\\pi}{4}$  est associé au point $P$ dans $${choix}$.   `
          this.reponse = '\\dfrac{7\\pi}{4}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le réel $-\\dfrac{\\pi}{4}$  est associé au point $P$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{\\pi}{4}'
        }

        break

      case 16:// point Q
        choix = choice(['[0\\,;\\,2\\pi[', ']-\\pi\\,;\\,\\pi]', '[\\pi\\,;\\,3\\pi[', ']-2\\pi\\;\\ 0]'])
        this.question = `Quel réel de $${choix}$ a pour point-image le point $Q$ ?<br>

        `
        this.question += `${objet}`
        if (choix === '[0\\,;\\,2\\pi[' || choix === '[\\pi\\,;\\,3\\pi[') {
          this.correction = `Le point $Q$ est le point-image de $-\\dfrac{\\pi}{6}$.<br>
          $-\\dfrac{\\pi}{6}+2\\pi=\\dfrac{11\\pi}{6}\\in ${choix}$.<br>
           Le réel $\\dfrac{11\\pi}{6}$  est associé au point $Q$ dans $${choix}$.   `
          this.reponse = '\\dfrac{11\\pi}{6}'
        }
        if (choix === ']-\\pi\\,;\\,\\pi]' || choix === ']-2\\pi\\;\\ 0]') {
          this.correction = `Le réel $-\\dfrac{\\pi}{6}$  est associé au point $Q$ dans $${choix}$.   `
          this.reponse = '-\\dfrac{\\pi}{6}'
        }

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
