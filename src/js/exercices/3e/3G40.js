import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { numAlpha, combinaisonListes, randint, choisitLettresDifferentes, listeQuestionsToContenuSansNumero } from '../../modules/outils.js'
import { mathalea2d, tracePoint, labelPoint, colorToLatexOrHTML } from '../../modules/2d.js'
import { point3d, droite3d, vecteur3d, arete3d, sphere3d, rotation3d, rotationV3d, demicercle3d, sensDeRotation3d } from '../../modules/3d.js'

export const titre = 'Repérage sur la sphère'

export default function ReperageSurLaSphere () {
  'use strict'
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 4
  this.nbQuestionsModifiable = true
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.video = ''
  this.sup = 3

  //  this.sup = false; // A décommenter : valeur par défaut d'un premier paramètre
  //  this.sup2 = false; // A décommenter : valeur par défaut d'un deuxième paramètre

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    let listeTypeDeQuestions = []
    if (this.sup === 1) listeTypeDeQuestions = combinaisonListes([1], this.nbQuestions)
    else if (this.sup === 2) listeTypeDeQuestions = combinaisonListes([2], this.nbQuestions)
    else listeTypeDeQuestions = combinaisonListes([1, 2], this.nbQuestions)
    let texte = ''
    let texteCorrection = ''
    const O = point3d(0, 0, 0, false, 'O')
    let M = point3d(10, 0, 0, true, 'M')
    const PoleNord = point3d(0, 0, 11, false, 'N')
    const PoleSud = point3d(0, 0, -11, false, 'S')
    PoleNord.c2d.positionLabel = 'above'
    const Pn = labelPoint(PoleNord.c2d)
    PoleSud.c2d.positionLabel = 'below'
    const Ps = labelPoint(PoleSud.c2d)
    Pn.taille = 3
    Ps.taille = 3
    Pn.color = colorToLatexOrHTML('brown')
    Ps.color = colorToLatexOrHTML('brown')

    const Axe = arete3d(PoleSud, PoleNord)
    Axe.c2d.epaisseur = 2
    Axe.c2d.color = colorToLatexOrHTML('blue')
    const normalV = vecteur3d(0, 0, 1)
    M = rotationV3d(M, normalV, context.anglePerspective)
    const R = vecteur3d(O, M)
    const origine = rotation3d(point3d(0, -10, 0), droite3d(O, normalV), context.anglePerspective)
    const normalH = rotationV3d(vecteur3d(O, origine), normalV, 90)
    const Sph = sphere3d(O, 10, 8, 9)
    const equateur1 = demicercle3d(O, normalV, R, 'visible', 'red', 0)
    const equateur2 = demicercle3d(O, normalV, R, 'caché', 'red', 0)
    const greenwitch = demicercle3d(O, normalH, vecteur3d(0, 0, -10), 'visible', 'green', 0)
    const rotationTerre = sensDeRotation3d(droite3d(O, normalV), vecteur3d(8, -8, 0), 60, 3, 'purple')
    greenwitch.epaisseur = 4
    greenwitch.opacite = 1
    equateur1.epaisseur = 3
    equateur2.epaisseur = 3
    const objetsEnonce = []; const objetsCorrection = []// on initialise les tableaux des objets Mathalea2d
    const latitudes = []; const longitudes = []; const P = []; const EstouOuest = []; const NordouSud = []; let nom = []
    const E = labelPoint(point3d(13.2, 0, 0, true, 'E').c2d)
    E.taille = 3
    E.color = colorToLatexOrHTML('brown')
    const W = labelPoint(point3d(-12, 0, 0, true, 'O').c2d)
    W.taille = 3
    W.color = colorToLatexOrHTML('brown')
    objetsEnonce.push(...Sph.c2d, Axe.c2d, equateur1, equateur2, greenwitch, Pn, Ps, ...rotationTerre.c2d, E, W)
    objetsCorrection.push(...Sph.c2d, Axe.c2d, equateur1, equateur2, greenwitch, Pn, Ps, ...rotationTerre.c2d, E, W)
    for (let i = 0; i < this.nbQuestions; i++) {
      latitudes.push(0)
      longitudes.push(0)
      P.push(point3d(0, 0, 0))
      EstouOuest.push('O')
      NordouSud.push('N')
    }
    nom = choisitLettresDifferentes(this.nbQuestions, 'Q')
    texte = ''
    for (let i = 0, latitude, longitude, M, lab, croix; i < this.nbQuestions;) {
      latitude = randint(-3, 6, 0) * 10
      longitude = randint(-6, 4) * 10
      while (latitudes.indexOf(latitude) !== -1 && longitudes.indexOf(longitude) !== -1) {
        latitude = randint(-3, 6, 0) * 10
        longitude = randint(-6, 4) * 10
      }
      latitudes[i] = latitude
      longitudes[i] = longitude
      if (longitudes[i] < 0) EstouOuest[i] = 'O'
      else EstouOuest[i] = 'E'
      if (latitudes[i] < 0) NordouSud[i] = 'S'
      else NordouSud[i] = 'N'
      M = rotation3d(origine, droite3d(O, normalH), -latitudes[i])
      P[i] = rotation3d(M, droite3d(O, normalV), longitudes[i])
      P[i].visible = true
      P[i].c2d.nom = `${nom[i]}`
      P[i].c2d.positionLabel = 'above left'
      lab = labelPoint(P[i].c2d)
      lab.color = colorToLatexOrHTML('blue')
      lab.taille = 2
      croix = tracePoint(P[i].c2d)
      croix.taille = 2.5
      croix.epaisseur = 2
      croix.color = colorToLatexOrHTML('blue')
      croix.style = 'o'
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte += `${numAlpha(i)} Donner les coordonnées GPS du point $${nom[i]}$.<br>`
          texteCorrection += `${numAlpha(i)} Les coordonnées de $${nom[i]}$ sont $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$.<br>`
          objetsEnonce.push(croix, lab)
          objetsCorrection.push(croix, lab)
          break
        case 2:
          texte += `${numAlpha(i)} Placer le point $${nom[i]}$ de  coordonnées GPS $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$.<br>`
          texteCorrection += `${numAlpha(i)} Le point $${nom[i]}$ de coordonnées GPS $(${Math.abs(longitudes[i])}\\degree$${EstouOuest[i]} ; $${Math.abs(latitudes[i])}\\degree$${NordouSud[i]}) ou $(${longitudes[i]}\\degree$ ; $${latitudes[i]}\\degree )$ est placé sur cette sphère.<br>`
          objetsCorrection.push(croix, lab)
          break
      }
      i++
    }

    // paramètres pour la perspective
    context.anglePerspective = 30
    context.coeffPerspective = 0.5
    const paramsEnonce = { xmin: -13, ymin: -13, xmax: 14, ymax: 13, pixelsParCm: 20, scale: 0.3, mainlevee: false }

    // texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    texte += '<br>' + mathalea2d(paramsEnonce, objetsEnonce)
    texteCorrection += '<br>' + mathalea2d(paramsEnonce, objetsCorrection)
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorrection)
    listeQuestionsToContenuSansNumero(this)
  }

  this.besoinFormulaireNumerique = ['Type de questions', 3, ' 1 : Lire des coordonnées\n 2 : Placer des points\n 3 : Mélange']
  //  this.besoinFormulaire2Numerique = ["Type de cahier",3,`1 : Cahier à petits careaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche`];
  // this.besoinFormulaire3CaseACocher =['figure à main levée',true]
} // Fin de l'exercice.
