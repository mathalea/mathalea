import {
  afficheLongueurSegment,
  afficheMesureAngle,
  angle,
  codageAngle,
  codageAngleDroit,
  labelPoint,
  longueur,
  point,
  polygone,
  similitude,
  texteSurSegment
} from '../../modules/2d.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { degres, radians } from '../../modules/fonctionsMaths.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { choice, creerNomDePolygone, listeQuestionsToContenu, numAlpha, randint, texNombre } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModificationImportante = '09/04/2023'
export const titre = 'Calculer toutes les mesures d\'angle d\'une figure complexe'

/**
 * Deux triangles rectangles accolés, on connaît deux longueurs et un angle, il faut déterminer tous les autres angles
 * @author Rémi Angot
 * 3G31-1
 * Février 2021
 */
export const uuid = '35e0b'
export const ref = '3G31-1'
export default function CalculDAngleFigureComplexe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Calculer la mesure de tous les angles de cette figure.'
  this.nbQuestions = 2
  this.nbQuestionsModifiable = true
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
    for (let i = 0; i < this.nbQuestions; i++) {
      const typesDeQuestion = choice(['BA-AD-BAC', 'BA-AD-ACB'])
      let texte, texteCorr

      const B = point(0, 0, '', 'below')
      const A = point(randint(4, 7), 0, '', 'below')
      const C = point(0, randint(3, 7, longueur(A, B)), '', 'above') // On exclue AB pour ne pas avoir un triangle isocèle
      const t1 = polygone([A, B, C])
      const t1c = polygone([A, B, C], 'blue')
      t1c.epaisseur = 3
      const c1 = codageAngleDroit(A, B, C)
      const D = similitude(C, A, -90, randint(7, 12, 10) / 10, '', 'right') // On exclue 10 pour ne pas avoir un triangle isocèle
      const t2 = polygone([C, A, D])
      const t2c = polygone([C, A, D], 'blue')
      t2c.epaisseur = 3
      const c2 = codageAngleDroit(C, A, D)
      const nom = creerNomDePolygone(4, 'QD')
      A.nom = nom[0]
      B.nom = nom[1]
      C.nom = nom[2]
      D.nom = nom[3]
      const labels = labelPoint(A, B, C, D)
      const BA = longueur(B, A)
      const AD = longueur(A, D, 1)
      const BAC = Math.round(angle(B, A, C))
      let AC = BA / Math.cos(radians(BAC))
      let ACD = Math.round(degres(Math.atan(AD / AC)))
      let a1 = afficheMesureAngle(B, A, C, 'black', 1, BAC + '°')
      const a2 = afficheLongueurSegment(A, B)
      const a3 = afficheLongueurSegment(D, A)
      const a4 = afficheLongueurSegment(A, C)
      const a5 = codageAngle(A, C, D, 1.2)
      a5.epaisseur = 2
      const ACB = Math.round(angle(A, C, B))

      const objetsMathalea = [t1, t2, c1, c2, labels]

      switch (typesDeQuestion) { // Suivant le type de question, le contenu sera différent
        case 'BA-AD-BAC':
          if (this.sup) {
            objetsMathalea.push(a1, a2, a3)
          }
          texte = mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, objetsMathalea)
          if (!this.sup) {
            texte += `<br>On a $${B.nom + A.nom} = ${texNombre(BA, 1)}$ cm, $${A.nom + D.nom} = ${texNombre(AD, 1)}$ cm et $\\widehat{${B.nom + A.nom + C.nom}}=${BAC}\\degree$.`
          }
          texteCorr = ''
          if (this.correctionDetaillee) {
            const texte1 = texteSurSegment('hypoténuse', C, A)
            const texte2 = texteSurSegment('adjacent', A, B, 'black', 1)
            texteCorr += mathalea2d({
              xmin: -1,
              ymin: -2,
              xmax: D.x + 1,
              ymax: Math.max(C.y, D.y) + 1
            }, t1c, t2, c1, c2, a1, a2, labels, texte1, texte2)
          }
          texteCorr += `<br>$${C.nom + B.nom + A.nom}$ est rectangle en $${B.nom}$ donc $\\cos\\left(\\widehat{${B.nom + A.nom + C.nom}}\\right)=\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}\\quad$ `
          texteCorr += `soit $\\quad\\cos(${BAC}\\degree)=\\dfrac{${texNombre(BA, 1)}}{${A.nom + C.nom}}\\quad$ et $\\quad ${A.nom + C.nom}=\\dfrac{${texNombre(BA, 1)}}{\\cos(${BAC}\\degree)}\\approx${texNombre(AC, 1)}$ cm.`
          if (this.correctionDetaillee) {
            const texte3 = texteSurSegment('adjacent', C, A)
            const texte4 = texteSurSegment('opposé', A, D, 'black')
            texteCorr += '<br><br>' + mathalea2d({
              xmin: -1,
              ymin: -1,
              xmax: D.x + 1,
              ymax: Math.max(C.y, D.y) + 1
            }, t1, t2c, c1, c2, a3, a4, a5, labels, texte3, texte4)
          }
          texteCorr += `<br>$${C.nom + A.nom + D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)=\\dfrac{${A.nom + D.nom}}{${A.nom + C.nom}}\\quad$ `
          texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)\\approx\\dfrac{${texNombre(AD, 1)}}{${texNombre(AC, 1)}}\\quad$ et $\\quad\\widehat{${A.nom + C.nom + D.nom}}\\approx\\text{arctan}\\left(\\dfrac{${texNombre(AD, 1)}}{${texNombre(AC, 1)}}\\right)\\approx${ACD}\\degree$.`
          texteCorr += `<br>La somme des angles d'un triangle est égale à $180\\degree$ donc $\\widehat{${B.nom + C.nom + A.nom}}=180\\degree-90\\degree-${BAC}\\degree=${90 - BAC}\\degree$.`
          texteCorr += `<br>De même, $\\widehat{${C.nom + D.nom + A.nom}}\\approx 180\\degree-90\\degree-${ACD}\\degree$ et donc $\\widehat{${C.nom + D.nom + A.nom}}\\approx${90 - ACD}\\degree$.`
          texte += this.interactif ? '<br><br>Les valeurs d\'angle seront arrondis au degré près.' : ''
          if (this.interactif) {
            setReponse(this, 3 * i, ACD)
            setReponse(this, 3 * i + 1, 90 - BAC)
            setReponse(this, 3 * i + 2, 90 - ACD)
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${A.nom + C.nom + D.nom}}=$`, texteApres: '$\\degree$' })
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${B.nom + C.nom + A.nom}}=$`, texteApres: '$\\degree$' })
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${C.nom + D.nom + A.nom}}=$`, texteApres: '$\\degree$' })
          }
          break
        case 'BA-AD-ACB':
          AC = BA / Math.sin(radians(ACB))
          ACD = Math.round(degres(Math.atan(AD / AC)))
          a1 = afficheMesureAngle(A, C, B, 'black', 1, ACB + '\\degree')
          if (this.sup) {
            objetsMathalea.push(a1, a2, a3)
          }
          texte = mathalea2d({ xmin: -1, ymin: -1, xmax: D.x + 1, ymax: Math.max(C.y, D.y) + 1 }, objetsMathalea)
          if (!this.sup) {
            texte += `<br>On a $${B.nom + A.nom} = ${texNombre(BA, 1)}$ cm, $${A.nom + D.nom} = ${texNombre(AD, 1)}$ cm et $\\widehat{${A.nom + C.nom + B.nom}}=${ACB}\\degree$.`
          }
          texteCorr = ''
          if (this.correctionDetaillee) {
            const texte1 = texteSurSegment('hypoténuse', C, A)
            const texte2 = texteSurSegment('opposé', A, B, 'black', 1)
            texteCorr += mathalea2d({
              xmin: -1,
              ymin: -2,
              xmax: D.x + 1,
              ymax: Math.max(C.y, D.y) + 1
            }, t1c, t2, c1, c2, a1, a2, labels, texte1, texte2)
            texteCorr += '<br>'
          }
          texteCorr += `$${C.nom + B.nom + A.nom}$ est rectangle en $${B.nom}$ donc $\\sin\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}\\quad$ `
          texteCorr += `soit $\\quad\\sin(${ACB}\\degree)=\\dfrac{${texNombre(BA, 1)}}{${A.nom + C.nom}}\\quad$ et $\\quad ${A.nom + C.nom}=\\dfrac{${texNombre(BA, 1)}}{\\sin(${ACB}\\degree)}\\approx${texNombre(AC, 1)}$ cm.`
          if (this.correctionDetaillee) {
            const texte3 = texteSurSegment('adjacent', C, A)
            const texte4 = texteSurSegment('opposé', A, D, 'black')
            texteCorr += '<br><br>' + mathalea2d({
              xmin: -1,
              ymin: -1,
              xmax: D.x + 1,
              ymax: Math.max(C.y, D.y) + 1
            }, t1, t2c, c1, c2, a3, a4, a5, labels, texte3, texte4)
          }
          texteCorr += `<br><br>$${C.nom + A.nom + D.nom}$ est rectangle en $${A.nom}$ donc $\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)=\\dfrac{${A.nom + D.nom}}{${A.nom + C.nom}}\\quad$ `
          texteCorr += `soit $\\quad\\tan\\left(\\widehat{${A.nom + C.nom + D.nom}}\\right)\\approx\\dfrac{${texNombre(AD, 1)}}{${texNombre(AC, 1)}}\\quad$ et $\\quad\\widehat{${A.nom + C.nom + D.nom}}\\approx\\text{arctan}\\left(\\dfrac{${texNombre(AD, 1)}}{${texNombre(AC, 1)}}\\right)\\approx${ACD}$\\degree.`
          texteCorr += `<br><br>La somme des angles d'un triangle est égale à 180\\degree donc $\\widehat{${B.nom + C.nom + A.nom}}=180\\degree-90\\degree-${ACB}\\degree=${90 - ACB}\\degree$.`
          texteCorr += `<br>De même, $\\widehat{${C.nom + D.nom + A.nom}}\\approx 180\\degree-90\\degree-${ACD}\\degree$ et donc $\\widehat{${C.nom + D.nom + A.nom}}\\approx${90 - ACD}\\degree$.`
          if (this.interactif) {
            setReponse(this, 3 * i, ACD)
            setReponse(this, 3 * i + 1, 90 - ACB)
            setReponse(this, 3 * i + 2, 90 - ACD)
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${A.nom + C.nom + D.nom}}=$`, texteApres: '$\\degree$' })
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i + 1, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${B.nom + C.nom + A.nom}}=$`, texteApres: '$\\degree$' })
            texte += '<br><br>' + ajouteChampTexteMathLive(this, 3 * i + 2, 'inline largeur25 nospacebefore', { texte: `$\\widehat{${C.nom + D.nom + A.nom}}=$`, texteApres: '$\\degree$' })
          }
          break
      }
      texte += '<br>'
      if (context.isAmc) {
        this.autoCorrection.push({
          enonce: texte,
          enonceAvant: false,
          enonceApresNumQuestion: true,
          options: { barreseparation: true },
          propositions: [
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                multicolsBegin: true,
                reponse: {
                  texte: numAlpha(0) + `<br>Valeur de $\\widehat{${A.nom + C.nom + D.nom}}$`,
                  valeur: ACD,
                  alignement: 'center',
                  param: {
                    digits: 3,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                reponse: {
                  texte: numAlpha(1) + `Valeur de $\\widehat{${B.nom + C.nom + A.nom}}$`,
                  valeur: typesDeQuestion === 'BA-AD-BAC' ? 90 - BAC : 90 - ACB,
                  alignement: 'center',
                  param: {
                    digits: 3,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            },
            {
              type: 'AMCNum',
              propositions: [{
                texte: '',
                statut: '',
                multicolsEnd: true,
                reponse: {
                  texte: numAlpha(2) + `Valeur de $\\widehat{${C.nom + D.nom + A.nom}}$`,
                  valeur: 90 - ACD,
                  alignement: 'center',
                  param: {
                    digits: 3,
                    decimals: 0,
                    signe: false,
                    approx: 0
                  }
                }
              }]
            }]
        }
        )
      }

      if (this.questionJamaisPosee(i, nom, BAC)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
      }
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Figure codée']
}
