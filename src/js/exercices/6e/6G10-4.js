import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, choisitLettresDifferentes, texteEnCouleurEtGras, shuffle, premiereLettreEnMajuscule, numAlpha } from '../../modules/outils.js'
import { point, tracePoint, labelPoint, pointAdistance, cercle, segment, pointIntersectionLC, droite, longueur, polygoneAvecNom } from '../../modules/2d.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const titre = 'Connaître le vocabulaire du cercle'

export const dateDePublication = '19/08/2022'

/**
 * Exercice testant les connaissances des élèves sur le vocabulaire du cercle dans les deux sens (Un rayon est ... et [AB] est ...)
 * et en travaillant la reconnaissance et la production (QCM ou réponse libre)
 * @author Guillaume Valmont
 * Référence 6G10-4
*/
export const uuid = '03b49'
export const ref = '6G10-4'
export default function VocabulaireDuCercle () {
  Exercice.call(this)
  this.titre = titre
  this.nbQuestions = 1

  this.besoinFormulaireNumerique = ['Sens des questions', 3, '1 : Un rayon est...\n2 : [AB] est ...\n3 : Mélange']
  this.sup = 3
  this.besoinFormulaire2CaseACocher = ['QCM']
  this.sup2 = true
  this.correctionDetailleeDisponible = true

  this.spacing = 1.5 // Interligne des questions
  this.spacingCorr = 1.5 // Interligne des réponses

  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.interactifType = this.sup2 ? 'qcm' : 'mathLive'

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
    const nbSousQuestions = 5
    const sensDesQuestions = combinaisonListes(sensDesQuestionsDisponibles, this.nbQuestions * nbSousQuestions)
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
      debugger
      const polygon = polygoneAvecNom(A, B, C, D, E)
      objetsEnonce.push(leCercle, labelPoint(O), tracePoint(O), OA, BC, DE, polygon[1])
      const params = { xmin: -4, ymin: -4, xmax: 4, ymax: 4, pixelsParCm: 20, scale: 1 }
      // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
      texte += mathalea2d(params, objetsEnonce) + '<br>'
      // On ajoute au texte de la correction, la figure de la correction
      texteCorr += texte

      let questions = [
        {
          nom: `[$${O.nom + A.nom}$]`,
          nature: 'un rayon',
          commentaire: `${texteEnCouleurEtGras('Un')} rayon est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`,
          commentaireAlt: `${texteEnCouleurEtGras('Le')} rayon est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`,
          sens: sensDesQuestions[i * nbSousQuestions + 0]
        },
        {
          nom: `[$${B.nom + C.nom}$]`,
          nature: 'un diamètre',
          commentaire: `${texteEnCouleurEtGras('Un')} diamètre est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`,
          commentaireAlt: `${texteEnCouleurEtGras('Le')} diamètre est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`,
          sens: sensDesQuestions[i * nbSousQuestions + 1]
        },
        {
          nom: `$${O.nom + A.nom}$`,
          nature: 'le rayon',
          commentaire: `${texteEnCouleurEtGras('Le')} rayon est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`,
          commentaireAlt: `${texteEnCouleurEtGras('Un')} rayon est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`,
          sens: sensDesQuestions[i * nbSousQuestions + 2]
        },
        {
          nom: `$${B.nom + C.nom}$`,
          nature: 'le diamètre',
          commentaire: `${texteEnCouleurEtGras('Le')} diamètre est une ${texteEnCouleurEtGras('longueur')}, il se note donc sans crochet.`,
          commentaireAlt: `${texteEnCouleurEtGras('Un')} diamètre est un ${texteEnCouleurEtGras('segment')}, il se note donc avec des crochets.`,
          sens: sensDesQuestions[i * nbSousQuestions + 3]
        },
        {
          nom: `[$${D.nom + E.nom}$]`,
          nature: 'une corde',
          commentaire: '',
          commentaireAlt: '',
          sens: sensDesQuestions[i * nbSousQuestions + 4]
        }
      ]
      questions = shuffle(questions)
      const propositionsUnRayonEst = []
      for (const question of questions) {
        const texteProposition = question.nom
        propositionsUnRayonEst.push({
          texte: texteProposition,
          statut: false,
          feedback: question.commentaire,
          feedbackAlt: question.commentaireAlt
        })
      }
      const propositionsABEst = []
      for (const question of questions) {
        const texteProposition = question.nature
        propositionsABEst.push({
          texte: texteProposition,
          statut: false,
          feedback: question.commentaire,
          feedbackAlt: question.commentaireAlt
        })
      }
      let j = 0
      for (const question of questions) {
        let enonce; const propositionsEE = []
        texte += numAlpha(j)
        texteCorr += numAlpha(j)
        if (question.sens === 'Un rayon est ...') {
          enonce = `${premiereLettreEnMajuscule(question.nature)} est ${this.interactifType === 'mathLive' ? '' : '...'}`
          texte += enonce
          texteCorr += `${premiereLettreEnMajuscule(question.nature)} est ${texteEnCouleurEtGras(question.nom)}.<br>`
        }
        if (question.sens === '[AB] est ...') {
          enonce = `${question.nom} est ${this.interactifType === 'mathLive' ? '' : '...'}`
          texte += enonce
          texteCorr += `${premiereLettreEnMajuscule(question.nom)} est ${texteEnCouleurEtGras(question.nature)}.<br>`
        }
        if (this.correctionDetaillee && question.commentaire !== '') texteCorr += question.commentaire + '<br>'
        if (this.sup2) {
          let propositions
          if (question.sens === 'Un rayon est ...') {
            propositions = propositionsUnRayonEst
          }
          if (question.sens === '[AB] est ...') {
            propositions = propositionsABEst
          }
          for (let ee = 0; ee < propositions.length; ee++) {
            const statut = propositions[ee].texte === question.nom || propositions[ee].texte === question.nature
            let feedback
            statut ? feedback = propositions[ee].feedback : feedback = propositions[ee].feedbackAlt
            propositionsEE.push({
              texte: propositions[ee].texte,
              statut,
              feedback
            })
          }
          this.autoCorrection[i * questions.length + j] = {
            enonce,
            options: { ordered: false },
            propositions: propositionsEE
          }
          texte += propositionsQcm(this, i * questions.length + j).texte + '<br>'
        } else {
          let reponses
          if (question.sens === 'Un rayon est ...') {
            reponses = [question.nom.replace(/\$/g, '')]
            switch (question.nature) {
              case 'le rayon':
                reponses.push(O.nom + B.nom, O.nom + C.nom, O.nom + D.nom, O.nom + E.nom)
                reponses = ajouterAlternatives(longueurAlternative, reponses)
                break
              case 'le diamètre':
                reponses.push(longueurAlternative(reponses[0]))
                break
              case 'un rayon':
                reponses.push('[' + O.nom + B.nom + ']', '[' + O.nom + C.nom + ']', '[' + O.nom + D.nom + ']', '[' + O.nom + E.nom + ']')
                reponses = ajouterAlternatives(segmentAlternatif, reponses)
                break
              case 'un diamètre':
                reponses.push(segmentAlternatif(reponses[0]))
                break
              case 'une corde':
                for (const point1 of [A, B, C, D, E]) {
                  for (const point2 of [A, B, C, D, E]) {
                    if (point1.nom !== point2.nom) {
                      reponses.push('[' + point1.nom + point2.nom + ']')
                    }
                  }
                }
                reponses = ajouterAlternatives(segmentAlternatif, reponses)
                break
            }
            texte += ajouteChampTexteMathLive(this, i * questions.length + j, 'inline largeur25 nospacebefore')
            setReponse(this, i * questions.length + j, reponses, { formatInteractif: 'texte' })
          }
          if (question.sens === '[AB] est ...') {
            reponses = [question.nature]
            texte += ajouteChampTexte(this, i * questions.length + j, 'inline largeur25 nospacebefore')
            setReponse(this, i * questions.length + j, reponses, { formatInteractif: 'ignorerCasse' })
          }

          function ajouterAlternatives (fonction, reponses) {
            const copieReponses = []
            for (const reponse of reponses) {
              copieReponses.push(reponse)
            }
            for (const reponse of copieReponses) {
              reponses.push(fonction(reponse))
            }
            return reponses
          }
          function longueurAlternative (longueur) {
            return longueur.slice(1) + longueur.slice(0, 1)
          }
          function segmentAlternatif (segment) {
            return '[' + reponses[0].slice(2, 3) + reponses[0].slice(1, 2) + ']'
          }
        }
        texte += '<br>'
        if (this.correctionDetaillee) texteCorr += '<br>'
        j++
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, nomsDesPoints, objetsEnonce)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
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
