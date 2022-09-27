import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { polygoneAvecNom, codageSegments, codageAngleDroit, afficheMesureAngle, afficheLongueurSegment } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'
import { contraindreValeur, Triangles } from '../../modules/outils.js'

export const titre = 'Construis mon triangle'

export default function ConstruisMonTriangle () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1 // Ici le nombre de questions
  this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = true // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1
  this.sup2 = 'ABC'
  this.sup3 = '3 4 5'
  this.typeExercice = 'IEP'

  function aLeMinDArguments (params, nombre) {
    if (params.length >= nombre) {
      return true
    } else {
      return false
    }
  }

  this.nouvelleVersion = function () {
    let triangle
    let defaut = [3, 4, 5]
    const type = contraindreValeur(1, 6, this.sup, 1)
    let params = this.sup3.toString()
    if (params.indexOf(' ') === -1) {
      params = [parseFloat(this.sup3)]
      if (isNaN(params[0])) params = defaut
    } else {
      params = this.sup3.split(' ')
      for (let i = 0; i < params.length; i++) {
        params[i] = parseFloat(params[i])
        if (isNaN(params[i])) {
          params = defaut
          break
        }
      }
    }
    const nom = this.sup2.slice(0, 3)
    const anim = new Alea2iep()
    const objetsEnonceml = []
    switch (type) { // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
      case 1:
        defaut = [3, 4, 5]
        if (aLeMinDArguments(params, 3)) {
          const triang = new Triangles()
          triang.l1 = params[0]
          triang.l2 = params[1]
          triang.l3 = params[2]
          if (triang.isTrueTriangleLongueurs()) {
            triangle = anim.triangle3longueurs(nom, params[0], params[1], params[2], true, true)
          } else {
            triangle = anim.triangle3longueurs(nom, defaut[0], defaut[1], defaut[2], true, true)
          }
        } else {
          triangle = anim.triangle3longueurs(nom, defaut[0], defaut[1], defaut[2], true, true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[1], triangle[0]), afficheLongueurSegment(triangle[2], triangle[1]), afficheLongueurSegment(triangle[0], triangle[2]))
        break

      case 2:
        defaut = [3, 40, 50]
        if (aLeMinDArguments(params, 3)) {
          triangle = anim.triangle1longueur2angles(nom, params[0], params[1], params[2], true, true)
        } else {
          triangle = anim.triangle1longueur2angles(nom, defaut[0], defaut[1], defaut[2], true, true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[1], triangle[0]), afficheMesureAngle(triangle[2], triangle[0], triangle[1]), afficheMesureAngle(triangle[0], triangle[1], triangle[2]))
        break

      case 3:
        defaut = [3, 4]
        if (aLeMinDArguments(params, 2)) {
          triangle = anim.triangleRectangle2Cotes(nom, params[0], params[1], true, true)
        } else {
          triangle = anim.triangleRectangle2Cotes(nom, defaut[0], defaut[1], true, true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[1], triangle[0]), afficheLongueurSegment(triangle[2], triangle[1]), codageAngleDroit(triangle[0], triangle[1], triangle[2]))
        break

      case 4:
        defaut = [3, 5]
        if (aLeMinDArguments(params, 2)) {
          const cote = Math.min(params[0], params[1])
          const hypothenuse = Math.max(params[0], params[1])
          triangle = anim.triangleRectangleCoteHypotenuse(nom, cote, hypothenuse, true, true)
        } else {
          triangle = anim.triangleRectangleCoteHypotenuse(nom, defaut[0], defaut[1], true, true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[1], triangle[0]), afficheLongueurSegment(triangle[0], triangle[2]), codageAngleDroit(triangle[0], triangle[1], triangle[2]))
        break

      case 5:
        defaut = [4]
        if (aLeMinDArguments(params, 1)) {
          triangle = anim.triangleEquilateral(nom, params[0], true)
        } else {
          triangle = anim.triangleEquilateral(nom, defaut[0], true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[1], triangle[0]), codageSegments('||', 'red', triangle[0], triangle[1], triangle[2], triangle[0], triangle[1], triangle[2]))
        break

      case 6:
        defaut = [3, 4, 70]
        if (aLeMinDArguments(params, 3)) {
          triangle = anim.triangle2longueurs1angle(nom, params[0], params[1], params[2], true)
        } else {
          triangle = anim.triangle2longueurs1angle(nom, defaut[0], defaut[1], defaut[2], true)
        }
        objetsEnonceml.push(afficheLongueurSegment(triangle[0], triangle[1]), afficheLongueurSegment(triangle[0], triangle[2]), afficheMesureAngle(triangle[1], triangle[0], triangle[2]))
        break
    }
    const poly = polygoneAvecNom(triangle)
    objetsEnonceml.push(poly[0], poly[1])
    const paramsEnonce = {
      xmin: Math.min(triangle[0].x - 1, triangle[1].x - 1, triangle[2].x - 1),
      ymin: Math.min(triangle[0].y - 1, triangle[1].y - 1, triangle[2].y - 1),
      xmax: Math.max(triangle[0].x + 1, triangle[1].x + 1, triangle[2].x + 1),
      ymax: Math.max(triangle[0].y + 1, triangle[1].y + 1, triangle[2].y + 1),
      pixelsParCm: 20,
      scale: 1,
      mainlevee: true,
      amplitude: 0.5
    }
    const texte = mathalea2d(paramsEnonce, objetsEnonceml) + '<br>' + anim.htmlBouton(this.numeroExercice)
    this.contenu = texte
  }
  this.besoinFormulaireNumerique = ['Type de triangle', 6, '1 : Triangle par 3 longueurs\n 2 : Triangle par 1 longueur et 2 angles\n 3 : Triangle rectangle 2 côtés angle droit\n 4 : Triangle rectangle 1 coté et l\'hypoténuse\n 5 : Triangle équilatéral\n 6 : Triangle 2 longueurs et l\'angle entre ces côtés']
  this.besoinFormulaire2Texte = ['Nom du triangle', 'ABC par exemple']
  this.besoinFormulaire3Texte = ['Longueurs ou angles séparés par des espaces', '3 4 5']
} // Fin de l'exercice.
