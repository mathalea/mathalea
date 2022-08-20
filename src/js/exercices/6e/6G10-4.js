import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, choisitLettresDifferentes, texteEnCouleurEtGras, shuffle, premiereLettreEnMajuscule } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, pointAdistance, cercle, segment, pointIntersectionLC, droite, longueur, polygoneAvecNom } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const interactifReady = false
export const interactifType = 'qcm'
export const titre = 'Connaître le vocabulaire du cercle'

export const dateDePublication = '19/08/2022'

/**
 * Exercice testant les connaissances des élèves sur le vocabulaire du cercle dans les deux sens (Un rayon est ... et [AB] est ...)
 * et en travaillant la reconnaissance et la production (QCM ou réponse libre)
 * @author Guillaume Valmont
 * Référence 6G10-4
*/
export default class VocabulaireDuCercle extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 1

    this.besoinFormulaireNumerique = ['Sens des questions', 3, '1 : Un rayon est...\n2 : [AB] est ...\n3 : Mélange']
    this.sup = 3
    this.besoinFormulaire2CaseACocher = ['QCM']
    this.sup2 = true
    this.correctionDetailleeDisponible = true

    this.spacing = 1.5 // Interligne des questions
    this.spacingCorr = 1.5 // Interligne des réponses
  }

  nouvelleVersion (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []

    let sensDesQuestionsDisponibles
    switch (Number(this.sup)) {
      case 1:
        sensDesQuestionsDisponibles = ['Un rayon est ...']
        break
      case 2:
        sensDesQuestionsDisponibles = ['[AB] est ...']
        break
      default:
        sensDesQuestionsDisponibles = ['Un rayon est ...', '[AB] est ...']
        break
    }
    const sensDesQuestions = combinaisonListes(sensDesQuestionsDisponibles, this.nbQuestions)
    const distanceMinEntrePoints = 2
    const distanceMinCorde = 3
    const distanceMaxCorde = 5.9
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const objetsEnonce = [] // on initialise le tableau des objets Mathalea2d de l'enoncé
      texte = ''
      texteCorr = ''
      const nomsDesPoints = choisitLettresDifferentes(6)
      const O = point(0, 0, nomsDesPoints[0])
      const leCercle = cercle(O, 3)
      const A = pointAdistance(O, 3, nomsDesPoints[1])
      let B, C, D, E
      do {
        B = pointAdistance(O, 3, nomsDesPoints[2])
        C = pointIntersectionLC(droite(O, B), leCercle, nomsDesPoints[3])
      } while (longueur(A, B) < distanceMinEntrePoints || longueur(A, C) < distanceMinEntrePoints || longueur(B, C) < distanceMinEntrePoints)
      do {
        D = pointAdistance(O, 3, nomsDesPoints[4])
      } while (longueur(A, D) < distanceMinEntrePoints || longueur(B, D) < distanceMinEntrePoints || longueur(C, D) < distanceMinEntrePoints)
      do {
        E = pointAdistance(O, 3, nomsDesPoints[5])
      } while (longueur(A, E) < distanceMinEntrePoints || longueur(B, E) < distanceMinEntrePoints || longueur(C, E) < distanceMinEntrePoints || longueur(D, E) < distanceMinCorde || longueur(D, E) > distanceMaxCorde)
      const OA = segment(O, A)
      const BC = segment(B, C)
      const DE = segment(D, E)
      const polygon = polygoneAvecNom(A, B, C, D, E, 'white')
      objetsEnonce.push(leCercle, labelPoint(O), tracePoint(O), OA, BC, DE, polygon)
      const params = { xmin: -4, ymin: -4, xmax: 4, ymax: 4, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(params, objetsEnonce)
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += texte

      let questions = [
        {
          nom: `[$${O.nom + A.nom}$]`,
          nature: 'un rayon',
          commentaire: `${texteEnCouleurEtGras('Un')} rayon est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`
        },
        {
          nom: `[$${B.nom + C.nom}$]`,
          nature: 'un diamètre',
          commentaire: `${texteEnCouleurEtGras('Un')} diamètre est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`
        },
        {
          nom: `$${O.nom + A.nom}$`,
          nature: 'le rayon',
          commentaire: `${texteEnCouleurEtGras('Le')} rayon est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`
        },
        {
          nom: `$${B.nom + C.nom}$`,
          nature: 'le diamètre',
          commentaire: `${texteEnCouleurEtGras('Le')} diamètre est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`
        },
        {
          nom: `[$${D.nom + E.nom}$]`,
          nature: 'une corde',
          commentaire: ''
        }
      ]
      questions = shuffle(questions)
      const propositions = []
      for (const question of questions) {
        let texteProposition
        switch (sensDesQuestions[i]) {
          case 'Un rayon est ...':
            texteProposition = question.nom
            break
          case '[AB] est ...':
            texteProposition = question.nature
            break
        }
        propositions.push({
          texte: texteProposition,
          statut: false,
          feedback: question.commentaire
        })
      }
      let j = 0
      for (const question of questions) {
        let enonce
        if (sensDesQuestions[i] === 'Un rayon est ...') {
          enonce = `${premiereLettreEnMajuscule(question.nature)} est ...<br>`
          texte += enonce
          texteCorr += `${premiereLettreEnMajuscule(question.nature)} est ${texteEnCouleurEtGras(question.nom)}.<br>`
        }
        if (sensDesQuestions[i] === '[AB] est ...') {
          enonce = `${question.nom} est ...<br>`
          texte += enonce
          texteCorr += `${premiereLettreEnMajuscule(question.nom)} est ${texteEnCouleurEtGras(question.nature)}.<br>`
        }
        if (this.correctionDetaillee && question.commentaire !== '') texteCorr += question.commentaire + '<br>'
        if (this.sup2) {
          for (const proposition of propositions) {
            if (proposition.texte === question.nom) proposition.statut = true
            else proposition.statut = false
          }
          this.autoCorrection[i * questions.length + j] = {
            enonce,
            options: { ordered: true },
            propositions
          }
          texte += propositionsQcm(this, i * questions.length + j).texte + '<br>'
        }
        j++
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, objetsEnonce)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Dans cet exercice, on n'utilise pas a, b, c et d mais A, B, C et D alors remplace-les !
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
