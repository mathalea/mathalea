import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { calcul, choisitLettresDifferentes, combinaisonListes, compteOccurences, contraindreValeur, listeQuestionsToContenu, miseEnEvidence, randint, rangeMinMax, sp, texNombre, texteEnCouleurEtGras } from '../../modules/outils.js'
import { droite, homothetie, labelPoint, point, segmentAvecExtremites, symetrieAxiale, distancePointDroite, longueur, afficheLongueurSegment, pointSurDroite, tracePoint, polygone, nommePolygone, angle, arc, latexParPoint, angleOriente, rotation } from '../../modules/2d.js'
export const titre = 'Utiliser les propriétés de conservation de la symétrie axiale'

// Gestion de la date de publication initiale
export const dateDePublication = '25/01/2023'

/**
 * Utiliser les propriétés de la symétrie pour répondre à des questions
 * @author Eric Elter
 */

export default function SymetrieAxialeProprietes () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.spacing = 2
  this.nbQuestions = 3
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = '5'
  this.sup2 = true

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, 4)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, 5, this.sup, 5)
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 5, parseInt(typesDeQuestionsDisponibles[i]), 5) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, 5) > 0) typesDeQuestionsDisponibles = rangeMinMax(1, 4) // Teste si l'utilisateur a choisi tout
    typesDeQuestionsDisponibles = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, objetsEnonce, a, b, d, A, B, C, D, E, F, ptRef1, ptRef2, Aarc, Barc, Carc, ALabel, BLabel, CLabel, nbpoints, noms, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      a = randint(-10, 10)
      b = randint(-10, 10, a)
      d = droite(a, b, 0, '(d)')
      switch (typesDeQuestionsDisponibles[i]) {
        case 1 :
          nbpoints = 4
          noms = choisitLettresDifferentes(nbpoints, 'QWX', true)
          A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          while (distancePointDroite(A, d) < 1) A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          while ((distancePointDroite(B, d) < 1) || (longueur(A, B) < 1) || (longueur(symetrieAxiale(A, d), B) < 1)) B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          C = symetrieAxiale(A, d, noms[2])
          D = symetrieAxiale(B, d, noms[3])
          texte += `Les segments $[${A.nom}${B.nom}]$ et $[${C.nom}${D.nom}]$ sont symétriques par rapport à $(d)$ et $${A.nom}${B.nom}=${texNombre(longueur(A, B, 1))}${sp()}\\text{cm}$ . Quelle est la longueur du segment $[${C.nom}${D.nom}]$ ?`
          texte += this.sup2 ? ' Justifier.<br>' : '<br>'
          objetsEnonce.push(d, segmentAvecExtremites(A, B), segmentAvecExtremites(C, D), nommePolygone(polygone([A, B]), A.nom + B.nom), nommePolygone(polygone([C, D]), C.nom + D.nom), afficheLongueurSegment(A, B))
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce, { pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' })), objetsEnonce)
          texteCorr += `Les segments $[${A.nom}${B.nom}]$ et $[${C.nom}${D.nom}]$ sont symétriques par rapport à $(d)$.<br>`
          texteCorr += 'Or, le symétrique d\'un segment est un segment de même longueur.<br>'
          texteCorr += `Donc les segments $[${A.nom}${B.nom}]$ et $[${C.nom}${D.nom}]$ ont la même longueur et $${miseEnEvidence(C.nom + D.nom + '=' + texNombre(longueur(A, B, 1)))}$${sp()}${texteEnCouleurEtGras('cm')}.<br>`
          break
        case 3 :
          nbpoints = 6
          noms = choisitLettresDifferentes(nbpoints, 'QWX', true)
          A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          while (distancePointDroite(A, d) < 1) A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          while ((distancePointDroite(B, d) < 1) || (longueur(A, B) < 1) || (longueur(symetrieAxiale(A, d), B) < 1)) B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          C = pointSurDroite(droite(A, B), B.x + 1, noms[2])
          D = symetrieAxiale(A, d, noms[3])
          E = symetrieAxiale(B, d, noms[4])
          F = symetrieAxiale(C, d, noms[5])
          texte += `Les points $${D.nom}$, $${E.nom}$ et $${F.nom}$ sont les symétriques respectifs de $${A.nom}$, $${B.nom}$ et $${C.nom}$ par rapport à $(d)$. Les points $${A.nom}$, $${B.nom}$ et $${C.nom}$ sont alignés. Les points $${D.nom}$, $${E.nom}$ et $${F.nom}$ le sont-ils ?`
          texte += this.sup2 ? ' Justifier.<br>' : '<br>'
          objetsEnonce.push(d, tracePoint(A, B, C, D, E, F), labelPoint(A, B, C, D, E, F))
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce, { pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' })), objetsEnonce)
          texteCorr += `Les points $${D.nom}$, $${E.nom}$ et $${F.nom}$ sont les symétriques respectifs de $${A.nom}$, $${B.nom}$ et $${C.nom}$ par rapport à $(d)$ et sont alignés.<br>`
          texteCorr += 'Or, la symétrie axiale conserve l\'alignement.<br>'
          texteCorr += `Donc les points $${miseEnEvidence(D.nom)}$${texteEnCouleurEtGras(', ')}$${miseEnEvidence(E.nom)}$${texteEnCouleurEtGras(' et ')}$${miseEnEvidence(F.nom)}$ ${texteEnCouleurEtGras(' sont alignés')} également.<br>`
          break
        case 2 :
          nbpoints = 6
          noms = choisitLettresDifferentes(nbpoints, 'QWX', true)
          A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          while (distancePointDroite(A, d) < 1) A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          while ((distancePointDroite(B, d) < 1) || (longueur(A, B) < 1) || (longueur(symetrieAxiale(A, d), B) < 1)) B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          C = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[2])
          while ((distancePointDroite(C, d) < 1) || (longueur(A, C) < 1) || (longueur(symetrieAxiale(A, d), C) < 1) || (longueur(C, B) < 1) || (longueur(symetrieAxiale(B, d), C) < 1) || (angle(A, B, C) < 30) || (angle(B, A, C) < 30) || (angle(A, C, B) < 30)) C = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[2])
          D = symetrieAxiale(A, d, noms[3])
          E = symetrieAxiale(B, d, noms[4])
          F = symetrieAxiale(C, d, noms[5])
          texte += `Les points $${D.nom}$, $${E.nom}$ et $${F.nom}$ sont les symétriques respectifs de $${A.nom}$, $${B.nom}$ et $${C.nom}$ par rapport à $(d)$. Quelle est la longueur du segment $[${D.nom}${F.nom}]$ ?`
          texte += this.sup2 ? ' Justifier.<br>' : '<br>'
          objetsEnonce.push(d, polygone([A, B, C], 'green'), nommePolygone(polygone([A, B, C]), A.nom + B.nom + C.nom), polygone([D, E, F], 'brown'), nommePolygone(polygone([D, E, F]), D.nom + E.nom + F.nom), afficheLongueurSegment(A, B), afficheLongueurSegment(A, C), afficheLongueurSegment(C, B))
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce, { rxmin: -1, rymin: -1, rxmax: 1, rymax: 1, pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' })), objetsEnonce)
          texteCorr += `Les segments $[${A.nom}${B.nom}]$ et $[${C.nom}${D.nom}]$ sont symétriques par rapport à $(d)$.<br>`
          texteCorr += 'Or, le symétrique d\'un segment est un segment de même longueur.<br>'
          texteCorr += `Donc les segments $[${A.nom}${B.nom}]$ et $[${C.nom}${D.nom}]$ ont la même longueur et $${miseEnEvidence(C.nom + D.nom + '=' + texNombre(longueur(A, B, 1)))}$${sp()}${texteEnCouleurEtGras('cm')}.<br>`
          break
        case 4 :
          nbpoints = 6
          noms = choisitLettresDifferentes(nbpoints, 'QWX', true)
          A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          while (distancePointDroite(A, d) < 1) A = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[0])
          B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          while ((distancePointDroite(B, d) < 1) || (longueur(A, B) < 6 || (longueur(symetrieAxiale(A, d), B) < 1))) B = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[1])
          C = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[2])
          while ((distancePointDroite(C, d) < 1) || (longueur(A, C) < 6) || (longueur(symetrieAxiale(A, d), C) < 1) || (longueur(C, B) < 6) || (longueur(symetrieAxiale(B, d), C) < 1) || (angle(A, B, C) < 30) || (angle(B, A, C) < 30) || (angle(A, C, B) < 30)) C = point(calcul(randint(-80, 80, 0) / 10), calcul(randint(-80, 80, 0) / 10), noms[2])
          D = symetrieAxiale(A, d, noms[3])
          E = symetrieAxiale(B, d, noms[4])
          F = symetrieAxiale(C, d, noms[5])
          texte += `Les points $${D.nom}$, $${E.nom}$ et $${F.nom}$ sont les symétriques respectifs de $${A.nom}$, $${B.nom}$ et $${C.nom}$ par rapport à $(d)$. Quelle est la mesure de l'angle $\\widehat{${D.nom}${F.nom}${E.nom}}$ ?`
          texte += this.sup2 ? ' Justifier.<br>' : '<br>'
          objetsEnonce.push(d, polygone([A, B, C], 'green'), nommePolygone(polygone([A, B, C]), A.nom + B.nom + C.nom), polygone([D, E, F], 'brown'), nommePolygone(polygone([D, E, F]), D.nom + E.nom + F.nom))
          ptRef1 = (longueur(A, B) < longueur(C, B)) ? A : C
          ptRef2 = (longueur(A, B) < longueur(C, B)) ? C : A
          Barc = homothetie(ptRef1, B, 2 / 10)
          BLabel = rotation(homothetie(ptRef1, B, 2 / 10 + 1 / longueur(ptRef1, B)), B, angleOriente(ptRef1, B, ptRef2) / 3)
          BLabel.positionLabel = 'center'
          objetsEnonce.push(arc(Barc, B, angleOriente(ptRef1, B, ptRef2)), latexParPoint(`${angle(ptRef1, B, ptRef2, 0)}\\degree`, BLabel, 'black', 12, 20, ''))
          ptRef1 = (longueur(A, C) < longueur(C, B)) ? A : B
          ptRef2 = (longueur(A, C) < longueur(C, B)) ? B : A
          Carc = homothetie(ptRef1, C, 2 / 10)
          CLabel = rotation(homothetie(ptRef1, C, 2 / 10 + 1 / longueur(ptRef1, C)), C, angleOriente(ptRef1, C, ptRef2) / 3)
          CLabel.positionLabel = 'center'
          objetsEnonce.push(arc(Carc, C, angleOriente(ptRef1, C, ptRef2)), latexParPoint(`${angle(ptRef1, C, ptRef2, 0)}\\degree`, CLabel, 'black', 12, 20, ''))
          ptRef1 = (longueur(A, C) < longueur(A, B)) ? C : B
          ptRef2 = (longueur(A, C) < longueur(A, B)) ? B : C
          Aarc = homothetie(ptRef1, A, 2 / 10)
          ALabel = rotation(homothetie(ptRef1, A, 2 / 10 + 1 / longueur(A, ptRef1)), A, angleOriente(ptRef1, A, ptRef2) / 3)
          ALabel.positionLabel = 'center'
          objetsEnonce.push(arc(Aarc, A, angleOriente(ptRef1, A, ptRef2)), latexParPoint(`${180 - angle(A, ptRef2, ptRef1, 0) - angle(A, ptRef1, ptRef2, 0)}\\degree`, ALabel, 'black', 12, 20, ''))
          texte += '<br>' + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce, { rxmin: -1, rymin: -1, rxmax: 1, rymax: 1, pixelsParCm: 40, scale: 1, style: 'margin-top: 40px' })), objetsEnonce)
          texteCorr += `Les angles $\\widehat{${A.nom}${C.nom}${B.nom}}$ et $\\widehat{${D.nom}${F.nom}${E.nom}}$ sont symétriques par rapport à $(d)$.<br>`
          texteCorr += 'Or, le symétrique d\'un angle est un angle de même mesure.<br>'
          texteCorr += `Donc les angles $\\widehat{${A.nom}${C.nom}${B.nom}}$ et $\\widehat{${D.nom}${F.nom}${E.nom}}$ ont la même mesure et $\\widehat{${D.nom}${F.nom}${E.nom}} = ${angle(D, F, E, 0)}\\degree$.<br>`
          break
      }
      if (this.questionJamaisPosee(i, a, b)) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Type de questions', 'Nombres séparés par des tirets\n1 : Longueur d\'un seul segment\n2 : Longueur d\'un segment parmi d\'autres\n3 : Alignement de points\n4 : Angle\n5 : Mélange']
  this.besoinFormulaire2CaseACocher = ['Justification demandée']
}
