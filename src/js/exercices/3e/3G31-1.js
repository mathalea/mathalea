import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, calcul, creerNomDePolygone, texNombre, choice } from '../../modules/outils.js'
import { point, labelPoint, polygone, similitude, codageAngleDroit, codeAngle, mathalea2d, afficheMesureAngle, afficheLongueurSegment, longueur, angle, texteSurSegment } from '../../modules/2d.js'
import { radians, degres } from '../../modules/fonctionsMaths.js'

export const titre = 'Calculer toutes les mesures d’angle d’une figure complexe'

/**
 * Deux triangles rectangles accolés, on connaît deux longueurs et un angle, il faut déterminer tous les autres angles
 * @author Rémi Angot
 * 3G31-1
 * Février 2021
*/
export default function MonSuperExerciceTropBeau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer la mesure de tous les angles de cette figure.'
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  this.spacingCorr = 3
  this.correctionDetailleeDisponible = true
  context.isHtml ? this.correctionDetaillee = true : this.correctionDetaillee = false
  // this.sup = 1; // Niveau de difficulté
  // this.tailleDiaporama = 3; // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typesDeQuestion = choice(['BA-AD-BAC', 'BA-AD-ACB'])
    let texte, texteCorr

    const B = point(0, 0, '', 'below')
    const A = point(randint(4, 7), 0, '', 'below')
    const C = point(0, randint(3, 7, longueur(A, B)), '', 'above') // On exclue AB pour ne pas avoir un triangle isocèle
    const t1 = polygone(A, B, C)
    const t1c = polygone(A, B, C)
    t1c.color = 'blue'
    t1c.epaisseur = 3
    const c1 = codageAngleDroit(A, B, C)
    const D = similitude(C, A, -90, calcul(randint(7, 12, 10) / 10), '', 'right') // On exclue 10 pour ne pas avoir un triangle isocèle
    const t2 = polygone(C, A, D)
    const t2c = polygone(C, A, D)
    t2c.color = 'blue'
    t2c.epaisseur = 3
    const c2 = codageAngleDroit(C, A, D)
    const nom = creerNomDePolygone(4)
    A.nom = nom[0]
    B.nom = nom[1]
    C.nom = nom[2]
    D.nom = nom[3]
    const labels = labelPoint(A, B, C, D)
    const BA = longueur(B, A)
    const AD = longueur(A, D, 1)
    const BAC = Math.ceil(angle(B, A, C))
    let AC = calcul(BA / Math.cos(radians(BAC)), 1)
    let ACD = Math.round(degres(Math.atan(AD / AC)))
    let a1 = afficheMesureAngle(B, A, C, 'black', 1, BAC + '°')
    const a2 = afficheLongueurSegment(A, B)
    const a3 = afficheLongueurSegment(D, A)
    const a4 = afficheLongueurSegment(A, C)
    const a5 = codeAngle(A, C, D, 1.2)
    a5.epaisseur = 2
    const ACB = Math.ceil(angle(A, C, B))

    const objetsMathalea = [t1, t2, c1, c2, labels]

    switch (typesDeQuestion) { // Suivant le type de question, le contenu sera différent
      case 'BA-AD-BAC':
        if (this.sup) {
          objetsMathalea.push(a1, a2, a3)
        }
        texte = mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, objetsMathalea)
        if (!this.sup) {
          texte += `<br>On a $${B.nom + A.nom} = ${texNombre(BA)}$ cm, $${A.nom + D.nom} = ${texNombre(AD)}$ cm et $\\widehat{${B.nom + A.nom + C.nom}}=${BAC}°$.`
        }
        texteCorr = ''
        if (this.correctionDetaillee) {
          const texte1 = texteSurSegment('hypoténuse', C, A)
          const texte2 = texteSurSegment('adjacent', A, B, 'black', 1)
          texteCorr += mathalea2d({ xmin: -1, ymin: -2, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, t1c, t2, c1, c2, a1, a2, labels, texte1, texte2)
          texteCorr += '<br>'
        }
        texteCorr += `$${C.nom + B.nom + A.nom}$ est rectangle en $${B.nom}$ donc $\\cos\\left(\\widehat{${B.nom + A.nom + C.nom}}\\right)=\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}\\quad$ `
        texteCorr += `soit $\\quad\\cos(${BAC}°)=\\dfrac{${texNombre(BA)}}{${A.nom + C.nom}}\\quad$ et $\\quad ${A.nom + C.nom}=\\dfrac{${texNombre(BA)}}{\\cos(${BAC}°)}\\approx${texNombre(AC)}$ cm.`
        if (this.correctionDetaillee) {
          const texte3 = texteSurSegment('adjacent', C, A)
          const texte4 = texteSurSegment('opposé', A, D, 'black')
          texteCorr += '<br><br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, t1, t2c, c1, c2, a3, a4, a5, labels, texte3, texte4)
        }
        texteCorr += `<br><br>$${C.nom + A.nom + D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)=\\dfrac{${A.nom + D.nom}}{${A.nom + C.nom}}\\quad$ `
        texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)\\approx\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\quad$ et $\\quad\\widehat{${A.nom + C.nom + D.nom}}=\\text{arctan}\\left(\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\right)\\approx${ACD}$°.`
        texteCorr += `<br><br>La somme des angles d'un triangle est égale à 180° donc $\\widehat{${B.nom + C.nom + A.nom}}=180°-90°-${BAC}°=${90 - BAC}°$.`
        texteCorr += `<br>De même, $\\widehat{${C.nom + D.nom + A.nom}}\\approx 180°-90°-${ACD}°\\approx${90 - ACD}°$.`
        break
      case 'BA-AD-ACB':
        AC = calcul(BA / Math.sin(radians(ACB)), 1)
        ACD = Math.round(degres(Math.atan(AD / AC)))
        a1 = afficheMesureAngle(A, C, B, 'black', 1, ACB + '°')
        if (this.sup) {
          objetsMathalea.push(a1, a2, a3)
        }
        texte = mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, objetsMathalea)
        if (!this.sup) {
          texte += `<br>On a $${B.nom + A.nom} = ${texNombre(BA)}$ cm, $${A.nom + D.nom} = ${texNombre(AD)}$ cm et $\\widehat{${A.nom + C.nom + B.nom}}=${ACB}°$.`
        }
        texteCorr = ''
        if (this.correctionDetaillee) {
          const texte1 = texteSurSegment('hypoténuse', C, A)
          const texte2 = texteSurSegment('opposé', A, B, 'black', 1)
          texteCorr += mathalea2d({ xmin: -1, ymin: -2, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, t1c, t2, c1, c2, a1, a2, labels, texte1, texte2)
          texteCorr += '<br>'
        }
        texteCorr += `$${C.nom + B.nom + A.nom}$ est rectangle en $${B.nom}$ donc $\\sin\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}\\quad$ `
        texteCorr += `soit $\\quad\\sin(${ACB}°)=\\dfrac{${texNombre(BA)}}{${A.nom + C.nom}}\\quad$ et $\\quad ${A.nom + C.nom}=\\dfrac{${texNombre(BA)}}{\\sin(${ACB}°)}\\approx${texNombre(AC)}$ cm.`
        if (this.correctionDetaillee) {
          const texte3 = texteSurSegment('adjacent', C, A)
          const texte4 = texteSurSegment('opposé', A, D, 'black')
          texteCorr += '<br><br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, t1, t2c, c1, c2, a3, a4, a5, labels, texte3, texte4)
        }
        texteCorr += `<br><br>$${C.nom + A.nom + D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)=\\dfrac{${A.nom + D.nom}}{${A.nom + C.nom}}\\quad$ `
        texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)\\approx\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\quad$ et $\\quad\\widehat{${A.nom + C.nom + D.nom}}=\\text{arctan}\\left(\\dfrac{${texNombre(AD)}}{${texNombre(AC)}}\\right)\\approx${ACD}$°.`
        texteCorr += `<br><br>La somme des angles d'un triangle est égale à 180° donc $\\widehat{${B.nom + C.nom + A.nom}}=180°-90°-${BAC}°=${90 - BAC}°$.`
        texteCorr += `<br>De même, $\\widehat{${C.nom + D.nom + A.nom}}\\approx 180°-90°-${ACD}°\\approx${90 - ACD}°$.`
        break
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Figure codée']
}
