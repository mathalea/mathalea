import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rangeMinMax, contraindreValeur, compteOccurences, choisitLettresDifferentes, choice, numAlpha, texteEnCouleurEtGras, enleveDoublonNum } from '../../modules/outils.js'
import { pave3d, point3d } from '../../modules/3d.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Nommer des faces dans un pavé droit'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

export const dateDePublication = '06/11/2022'

/**
 * Nommer des faces dans un pavé droit
 * @author Eric Elter
 */

export default function LireFacePaveDroit () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 3
  this.sup2 = 7
  this.sup3 = 1
  this.sup4 = 6

  /**
* Inverse une chaîne de caractères
* @param {string} str Chaîne à inverser
* @author Eric Elter (enfin copié sur le net)
* @example inverseChaine('laval') renvoie 'laval' /// Hihihihi...
* @example inverseChaine('parfait') renvoie 'tiafrap'
* @example inverseChaine('1234') renvoie '4321'
*/
  function inverseChaine (str) {
    return (str === '') ? '' : inverseChaine(str.substr(1)) + str.charAt(0)
  }
  function differentsNomsPossiblesDUneFace (face, nomSolide) {
    let nouvelleFaceChiffree = ''
    let nouvelleFace = ''
    const tabChiffre = [face, inverseChaine(face)]
    const tab = []
    for (let i = 0; i < face.length - 1; i++) {
      nouvelleFaceChiffree = tabChiffre[2 * i][3] + tabChiffre[2 * i].slice(0, 3)
      tabChiffre.push(nouvelleFaceChiffree, inverseChaine(nouvelleFaceChiffree))
    }
    for (let i = 0; i < tabChiffre.length; i++) {
      nouvelleFace = ''
      for (let j = 0; j < face.length; j++) {
        nouvelleFace += nomSolide[tabChiffre[i][j]]
      }
      tab.push(nouvelleFace)
    }
    return tab
  }

  this.nouvelleVersion = function () {
    this.sup4 = contraindreValeur(2, 6, this.sup4, 6)
    this.interactifType = this.sup3 === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    let typesDeQuestionsIndisponibles = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      typesDeQuestionsIndisponibles = 7
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsIndisponibles[0] = contraindreValeur(1, 6, this.sup2, 1)
      } else {
        typesDeQuestionsIndisponibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsIndisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsIndisponibles[i] = contraindreValeur(1, 6, parseInt(typesDeQuestionsIndisponibles[i]), 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsIndisponibles, 7) > 0) typesDeQuestionsIndisponibles = [] // Teste si l'utilisateur a choisi rien
    enleveDoublonNum(typesDeQuestionsIndisponibles)

    function comparerNombres (a, b) {
      return a - b
    }

    typesDeQuestionsIndisponibles.sort(comparerNombres)
    let choixFace = rangeMinMax(0, 5)
    for (let i = typesDeQuestionsIndisponibles.length - 1; i >= 0; i--) {
      choixFace.splice(typesDeQuestionsIndisponibles[i], 1)
    }
    choixFace = combinaisonListes(choixFace, choixFace.length)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let indiceQuestion

    for (let i = 0, texte, texteCorr, objetsEnonce, A, B, D, E, solideDessine, nomSolide, enonceAMC, enonceFigure,
      L, p, choixProfondeur, facesPossibles, h, resultatsPossibles, resultatsImpossibles, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      context.anglePerspective = choice([-30, -60, 30, 60])

      L = randint(5, 20)
      h = randint(5, 20, [L])
      p = randint(5, 20, [L, h])
      A = point3d(0, 0, 0)
      B = point3d(L, 0, 0)
      D = point3d(0, 0, h)
      choixProfondeur = choice([p, -p])
      E = point3d(0, choixProfondeur, 0)

      nomSolide = choisitLettresDifferentes(8, 'OQWXD').join('')
      solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)
      objetsEnonce.push(...solideDessine.c2d)
      // enonceFigure = (context.isAmc ? '' : '<br>') + mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.2, style: 'block' }), objetsEnonce) + '<br>'
      enonceFigure = mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: context.isHtml ? 0.7 : 0.3, style: 'block' }), objetsEnonce) + '<br>'
      texte += enonceFigure
      facesPossibles = [['de devant', '0123'], ['de derrière', '4567'], ['de gauche', '0374'], ['de droite', '1265'], ['du dessus', '2376'], ['du dessous', '0154']]

      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: enonceFigure,
          enonceCentre: false,
          options: {
            ordered: false
          }
        }
        this.autoCorrection[i].propositions = []
      }

      for (let ee = 0; ee < Math.min(choixFace.length, this.sup); ee++) {
        indiceQuestion = i * Math.min(choixFace.length, this.sup) + ee

        enonceAMC = this.sup === 1 ? '' : (((ee === 0) ? '' : '<br>') + numAlpha(ee))

        enonceAMC += `Comment peut se nommer la face ${facesPossibles[choixFace[ee]][0]} du pavé droit ${nomSolide} ?`
        texte += enonceAMC
        resultatsPossibles = combinaisonListes(differentsNomsPossiblesDUneFace(facesPossibles[choixFace[ee]][1], nomSolide))
        texteCorr += this.sup === 1 ? '' : numAlpha(ee)
        texteCorr += `La face ${facesPossibles[choixFace[ee]][0]} du pavé droit ${nomSolide} peut se nommer ${texteEnCouleurEtGras(resultatsPossibles[0])} mais aussi `
        for (let j = 1; j < resultatsPossibles.length - 2; j++) texteCorr += `${resultatsPossibles[j]}, `
        texteCorr += `${resultatsPossibles[resultatsPossibles.length - 2]} ou ${resultatsPossibles[resultatsPossibles.length - 1]}.<br>`

        if ((this.interactifType && this.interactifType === 'qcm') || context.isAmc) {
          resultatsImpossibles = []
          for (let j = 0; j < 6; j++) {
            if (j !== choixFace[ee]) {
              resultatsImpossibles.push(combinaisonListes(differentsNomsPossiblesDUneFace(facesPossibles[j][1], nomSolide))[0])
            }
          }
        }
        if (this.interactif) {
          this.autoCorrection[indiceQuestion] = {}
          if (this.interactifType === 'qcm') {
            this.autoCorrection[indiceQuestion].enonce = `${texte}\n`
            this.autoCorrection[indiceQuestion].propositions = [{
              texte: `${resultatsPossibles[0]}`,
              statut: true
            }]
            for (let j = 0; j < Math.min(resultatsImpossibles.length, this.sup4 - 1); j++) {
              this.autoCorrection[indiceQuestion].propositions.push({
                texte: `${resultatsImpossibles[j]}`,
                statut: false
              })
            }

            this.autoCorrection[indiceQuestion].options = {}
            texte += propositionsQcm(this, indiceQuestion).texte
          } else {
            setReponse(this, indiceQuestion, resultatsPossibles, { formatInteractif: 'texte' })
            texte += ajouteChampTexteMathLive(this, indiceQuestion, 'largeur25 inline') + '<br>'
          }
        }
        if (context.isAmc) {
          this.autoCorrection[i].propositions.push(
            {
              type: 'qcmMono',
              enonce: enonceAMC,
              propositions: [
                {
                  texte: `${resultatsPossibles[0]}`,
                  statut: true
                }
              ]
            }
          )
          for (let j = 0; j < Math.min(resultatsImpossibles.length, this.sup4 - 1); j++) {
            this.autoCorrection[i].propositions[ee].propositions.push({
              texte: `${resultatsImpossibles[j]}`,
              statut: false
            })
          }
        }
      }

      if (this.questionJamaisPosee(i, nomSolide)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Nombre de faces à trouver', 6, 'Entre 1 et 6']
  this.besoinFormulaire2Texte = ['Faces à exclure du choix', 'Nombres séparés par des tirets\n1 : de devant\n2 : de derrière\n3 : de gauche\n4 : de droite\n5 : du dessus\n6 : du dessous\n7 : aucune à exclure']
  this.besoinFormulaire3Numerique = ['Type d\'exercice interactif ou AMC', 2, '1 : QCM\n2 : Numérique']
  this.besoinFormulaire4Numerique = ['Nombre de réponses dans le QCM', 6, 'Entre 2 et 6']
}
