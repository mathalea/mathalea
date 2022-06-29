import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, lettreDepuisChiffre, choice, couleurTab, miseEnEvidence, sp, rangeMinMax, numAlpha, enleveElement, combinaisonListes } from '../../modules/outils.js'
import { point, mathalea2d, pointSurSegment, segment, polygoneAvecNom, labelPoint, droite, pointIntersectionDD, codageAngle, angleOriente, polyline } from '../../modules/2d.js'
import { min, max } from 'mathjs'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { context } from '../../modules/context.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Nommer un angle'
export const interactifType = ['qcm', 'mathLive']
export const interactifReady = true
export const amcType = 'AMCHybride' // Question numérique
export const amcReady = true // Il reste à gérer les options numériques

export const dateDePublication = '13/04/2022'

/**
 * Nommer un angle
 * Ref 6G22
 * @author Eric Elter
 * Publié le 13/04/2022
 */
export default function NommerUnAngle () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 2
  this.sup = 2
  this.sup2 = 1
  this.sup3 = false
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.interactifType = this.sup2 === 2 ? 'mathLive' : 'qcm'
    let propositionsDuQcm = []
    for (let i = 0, texteAMC, troisBonnesReponses, listePt1, listePt3, resultatOK1, resultatOK2, resultat3, resultatPasOK1, resultatPasOK2, choixAngle, pt1, pt2, pt3, tailleAngle, aleaChoixCouleurRemplissage, couleurRemplissageAngle, couleurAngle, segmentsCorrection, resultat; i < this.nbQuestions; i++) {
      const propositionsAMC = []
      // let figureExo
      // On prépare la figure...
      const marquageAngle = this.sup3 ? combinaisonListes(['X', 'OO', '|||'], 3) : ['', '', '']

      const ChoixHorizontal = choice([-1, 1])

      const numB = randint(1, 26, [4, 5, 15, 23, 24, 25])
      const numA = randint(1, 26, [4, 5, 15, 23, 24, 25, numB])
      const numC = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numA])
      const numM = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numA, numC])
      const numN = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numA, numC, numM])
      const numI = randint(1, 26, [4, 5, 15, 23, 24, 25, numB, numA, numC, numM, numN])

      /* A décommenter pour débugguer (et commenter les 6 lignes du dessus)
      const numA = 1
      const numB = 2
      const numC = 3
      const numI = 9
      const numM = 13
      const numN = 14
      */

      const ordB = randint(0, 2)
      const B = point(0, ordB, lettreDepuisChiffre(numB))

      const absA = ChoixHorizontal * randint(7, 12)
      const ordA = randint(4, 8)
      const A = point(absA, ordA, lettreDepuisChiffre(numA))

      const absC = ChoixHorizontal * randint(7, 12, [absA])
      const ordC = -1 * randint(2, 5)
      const C = point(absC, ordC, lettreDepuisChiffre(numC))
      const fractionSegmentAB = this.sup === 1 ? randint(2, 8) : randint(4, 6)
      const fractionSegmentBC = this.sup === 1 ? randint(2, 8, [fractionSegmentAB]) : randint(4, 6, [fractionSegmentAB])
      const AB = segment(A, B).longueur
      const BC = segment(B, C).longueur
      const M = pointSurSegment(B, A, AB * fractionSegmentAB / 10, lettreDepuisChiffre(numM))
      const N = pointSurSegment(B, C, BC * fractionSegmentBC / 10, lettreDepuisChiffre(numN), 'below')
      const p1 = polygoneAvecNom(B, A, C)
      const I = pointIntersectionDD(droite(A, N), droite(C, M), lettreDepuisChiffre(numI), 'left')
      const listePoints = [numA, numB, numC, numM, numN, numI]
      const objetsEnonce = []
      const objetsCorrection = []
      const sommetsDejaTrouves = []
      const choixCouleurRemplissage = rangeMinMax(0, 7)
      couleurRemplissageAngle = ['none'] // Par défaut, on ne remplit pas l'angle.
      couleurAngle = this.sup3 ? 'black' : 'none'
      let texte = ''
      const O = point(0, 0) // Sert à construire les symboles pour les questions
      const M1 = point(4, 0) // Sert à construire les symboles pour les questions
      let texteCorr = ''
      let positionIbis = ChoixHorizontal === -1 ? 'right' : 'left'
      const Ibis = point(I.x, I.y, lettreDepuisChiffre(numI), positionIbis)

      for (let jj = 0, marquageAngleConsigne; jj < this.sup; jj++) {
        marquageAngleConsigne = []
        const choixSommet = choice(listePoints, sommetsDejaTrouves)
        if (!this.sup3) {
          aleaChoixCouleurRemplissage = choice(choixCouleurRemplissage)
          couleurRemplissageAngle = couleurTab(aleaChoixCouleurRemplissage)
          enleveElement(choixCouleurRemplissage, aleaChoixCouleurRemplissage)
        }
        sommetsDejaTrouves[jj] = choixSommet
        switch (choixSommet) {
          case numA: // Si le sommet est A, alors il y a 3 choix possibles d'angles
            pt2 = A
            tailleAngle = min(segment(pt2, M).longueur, segment(pt2, N).longueur, segment(pt2, I).longueur, 4) / 2 * 0.9
            choixAngle = 1
            switch (choixAngle) {
              case 1 :
                listePt1 = [B, M]
                listePt3 = [N, I]
                break
              case 2 :
                listePt1 = [C]
                listePt3 = [N, I]
                break
              case 3 :
                listePt3 = [B, M]
                listePt1 = [C]
                break
            }
            break
          case numC : // Si le sommet est C, alors il y a 3 choix possibles d'angles
            pt2 = C
            choixAngle = randint(1, 3)
            tailleAngle = min(segment(pt2, M).longueur, segment(pt2, N).longueur, segment(pt2, I).longueur, 4) / 2 * 0.9
            switch (choixAngle) {
              case 1 :
                listePt1 = [B, N]
                listePt3 = [M, I]
                break
              case 2 :
                listePt3 = [M, I]
                listePt1 = [A]
                break
              case 3 :
                listePt3 = [B, N]
                listePt1 = [A]
                break
            }
            break
          case numB :
            pt2 = B
            tailleAngle = min(segment(pt2, M).longueur, segment(pt2, N).longueur, segment(pt2, I).longueur, 4) / 2 * 0.9
            listePt1 = [C, N]
            listePt3 = [A, M]
            break
          case numM : // Si le sommet est M, alors il y a 2 choix possibles d'angles
            pt2 = M
            tailleAngle = min(segment(pt2, A).longueur, segment(pt2, C).longueur, segment(pt2, I).longueur, 4) / 2 * 0.9
            listePt1 = [C, I]
            listePt3 = [randint(1, 2) === 1 ? A : B]
            positionIbis = ChoixHorizontal === -1 ? 'left' : 'right'
            break
          case numN : // Si le sommet est N, alors il y a 2 choix possibles d'angles
            pt2 = N
            tailleAngle = min(segment(pt2, A).longueur, segment(pt2, C).longueur, segment(pt2, I).longueur, 4) / 2 * 0.9
            listePt1 = [A, I]
            listePt3 = [randint(1, 2) === 1 ? C : B]
            break
          case numI:
            pt2 = I
            choixAngle = randint(1, 4)
            switch (choixAngle) {
              case 1:
                listePt1 = [M]
                listePt3 = [A]
                break
              case 2:
                listePt1 = [C]
                listePt3 = [A]
                positionIbis = ChoixHorizontal === -1 ? 'right' : 'left'
                break
              case 3:
                listePt1 = [N]
                listePt3 = [C]
                break
              case 4:
                listePt1 = [N]
                listePt3 = [M]
                positionIbis = ChoixHorizontal === -1 ? 'left' : 'right'
                break
            }
            tailleAngle = min(segment(pt2, listePt1[0]).longueur, segment(pt2, listePt3[0]).longueur, 4) / 2 * 0.9
        }

        pt1 = choice(listePt1) // Une fois la possibilité d'angle choisie, il y a deux points possibles.
        pt3 = choice(listePt3)
        segmentsCorrection = polyline([listePt1[0], pt2, listePt3[0]], couleurRemplissageAngle[0])
        resultat = []
        for (const item1 in listePt1) {
          for (const item3 in listePt3) {
            resultat.push(`\\widehat{${listePt1[item1].nom}${pt2.nom}${listePt3[item3].nom}}`)
            resultat.push(`\\widehat{${listePt3[item3].nom}${pt2.nom}${listePt1[item1].nom}}`)
          }
        }
        // Les 5 résultats suivants sont pour le QCM
        // 2 résultats corrects, 2 résultats faux et un 5e résultat faux ou vrai, selon l'exercice.
        resultatOK1 = choice(resultat)
        resultatOK2 = choice(resultat, [resultatOK1])
        resultatPasOK1 = `\\widehat{${pt2.nom}${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}}`
        resultatPasOK2 = `\\widehat{${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}${pt2.nom}}`
        troisBonnesReponses = false
        if (choixSommet === numI) { // Si I est le sommet, que deux bonnes réponses.
          resultat3 = choice([`\\widehat{${listePt3[0].nom}${listePt1[0].nom}${pt2.nom}}`, `\\widehat{${pt2.nom}${listePt3[0].nom}${listePt1[0].nom}}`])
        } else {
          troisBonnesReponses = choice([true, false])
          if (troisBonnesReponses) { // Une 3e réponse vraie
            resultat3 = choice(resultat, [resultatOK1, resultatOK2])
          } else if (choice([true, false])) { // Une 3e réponse fausse
            resultat3 = `\\widehat{${pt2.nom}${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}}`
            while (resultat3 === resultatPasOK1) resultat3 = `\\widehat{${pt2.nom}${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}}`
          } else {
            resultat3 = `\\widehat{${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}${pt2.nom}}`
            while (resultat3 === resultatPasOK2) resultat3 = `\\widehat{${listePt1[randint(0, listePt1.length - 1)].nom}${listePt3[randint(0, listePt3.length - 1)].nom}${pt2.nom}}`
          }
        }
        segmentsCorrection.epaisseur = 3
        const ang = angleOriente(pt1, pt2, pt3)

        objetsEnonce.push(codageAngle(pt1, pt2, ang, tailleAngle, marquageAngle[jj], couleurAngle, 2, 1, couleurRemplissageAngle[0], 1, false, true))
        texteAMC = 'Comment peut-on nommer l\'angle '
        marquageAngleConsigne.push(codageAngle(M1, O, 79, 1, marquageAngle[jj]))
        texteAMC += this.sup3
          ? 'marqué par le symbole' + mathalea2d({ xmin: 0, ymin: 0, xmax: 1.2, ymax: 1.2, pixelsParCm: 20, scale: 0.5, style: 'display:inline' }, marquageAngleConsigne) + `${sp()}?`
          : `${couleurRemplissageAngle[1]}${sp()}?`
        texte += this.sup > 1 ? `<br>${numAlpha(jj)}` : ''
        texte += texteAMC
        if (this.interactif && this.interactifType === 'mathLive') {
          texte += ajouteChampTexteMathLive(this, i * this.sup + jj, 'inline largeur25')
        }
        setReponse(this, i * this.sup + jj, resultat, { formatInteractif: 'texte' })
        objetsCorrection.push(codageAngle(pt1, pt2, ang, tailleAngle, marquageAngle[jj], couleurAngle, 2, 1, couleurRemplissageAngle[0], 1, false, true), segmentsCorrection)
        texteCorr += this.sup > 1 ? `<br>${numAlpha(jj)}` : ''
        texteCorr += 'L\'angle '
        texteCorr += this.sup3
          ? 'marqué par le symbole' + mathalea2d({ xmin: 0, ymin: 0, xmax: 1.2, ymax: 1.2, pixelsParCm: 20, scale: 0.5, style: 'display:inline' }, marquageAngleConsigne)
          : `${couleurRemplissageAngle[1]}`
        texteCorr += ` se nomme, au choix : $${miseEnEvidence(resultat[0], couleurRemplissageAngle[0])}$`
        for (let ee = 1; ee < resultat.length; ee++) {
          texteCorr += `, $${miseEnEvidence(resultat[ee], couleurRemplissageAngle[0])}$`
        }
        texteCorr += '.'
        propositionsDuQcm = [{
          texte: `$${resultatOK1}$`,
          statut: true
        },
        {
          texte: `$${resultatOK2}$`,
          statut: true
        },
        {
          texte: `$${resultat3}$`,
          statut: troisBonnesReponses
        },
        {
          texte: `$${resultatPasOK1}$`,
          statut: false
        },
        {
          texte: `$${resultatPasOK2}$`,
          statut: false
        }]
        if (this.interactif && this.interactifType === 'qcm') {
          this.autoCorrection[i * this.sup + jj].enonce = `${texte}\n`
          this.autoCorrection[i * this.sup + jj].propositions = propositionsDuQcm
          this.autoCorrection[i * this.sup + jj].options = {}

          texte += propositionsQcm(this, i * this.sup + jj).texte
        }
        if (context.isAmc) {
          propositionsAMC[jj] = {
            type: 'qcmMult', // on donne le type de la première question-réponse qcmMono, qcmMult, AMCNum, AMCOpen
            enonce: texteAMC,
            propositions: propositionsDuQcm
          }
        }
      }
      const params = { xmin: min(0, absA, absC) - 1, ymin: ordC - 1, xmax: max(0, absA, absC) + 1, ymax: ordA + 1, pixelsParCm: 20, scale: 0.5 }
      objetsEnonce.push(p1[0], p1[1], segment(A, N), segment(C, M), labelPoint(M, N, Ibis))
      objetsCorrection.push(p1[0], p1[1], segment(A, N), segment(C, M), labelPoint(M, N, Ibis))
      const figureExo = mathalea2d(params, objetsEnonce)
      texte += '<br>' + figureExo
      texteCorr += '<br>' + mathalea2d(params, objetsCorrection)
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: figureExo,
          enonceAvant: true, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          enonceCentre: true, // EE : ce champ est facultatif et permet (si true) de centrer le champ 'enonce' ci-dessus.
          melange: true, // EE : ce champ est facultatif et permet (si false) de ne pas provoquer le mélange des questions.
          options: { avecSymboleMult: true }, // facultatif. Par défaut, multicols est à false. Ce paramètre provoque un multicolonnage (sur 2 colonnes par défaut) des propositions : pratique quand on met plusieurs AMCNum. !!! Attention, cela ne fonctionne pas, nativement, pour AMCOpen. !!!
          propositions: propositionsAMC
        }
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
    }
  }
  this.besoinFormulaireNumerique = ['Nombre d\'angles à trouver', 3, '1, 2 ou 3 angles']
  if (context.isHtml) this.besoinFormulaire2Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Texte']
  this.besoinFormulaire3CaseACocher = ['Figure en noir et blanc']
}
