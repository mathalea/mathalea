import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, rangeMinMax, contraindreValeur, compteOccurences, choisitLettresDifferentes, choice, range1, numAlpha } from '../../modules/outils.js'
import Grandeur from '../../modules/Grandeur.js'
import { pave3d, point3d } from '../../modules/3d.js'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'

export const titre = 'Déterminer des longueurs'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
/**
 * Calcul de volumes.
 * @author Jean-Claude Lhote (AMC par EE) // modifié par Mireille Gain pour y ajouter les décimaux
 * référence 6M30
 */

export const uuid = '04b0d'
export const ref = '6M30'
export default function CalculDeVolumes () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 4
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  this.classe = 6
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup3 = 2
  this.sup4 = 8
  this.nouvelleVersion = function (numeroExercice) {
    // this.consigne = this.interactif ? '' : "Calculer, en détaillant, le volume des solides donnés. Arrondir à l'unité."
    this.interactifType = this.sup3 === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    let typesDeQuestionsDisponibles = []
    const thissup4Max = 10
    if (!this.sup4) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max)
    } else {
      if (typeof (this.sup4) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, thissup4Max + 1, this.sup4, thissup4Max + 1)
      } else {
        typesDeQuestionsDisponibles = this.sup4.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, thissup4Max + 1, parseInt(typesDeQuestionsDisponibles[i]), thissup4Max + 1) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, thissup4Max + 1) > 0) typesDeQuestionsDisponibles = rangeMinMax(1, thissup4Max) // Teste si l'utilisateur a choisi tout

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (let i = 0, texte, texteCorr, reponse, objetsEnonce, A, B, D, E, solideDessine, longueurATrouver, nomSolide,
      L, p, choixProfondeur, choixFace, facesPossibles, h, resultat, resultatsPossibles, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      // listeTypeDeQuestions[i] = choice([1, 3, 2])
      listeTypeDeQuestions[i] = 1
      context.anglePerspective = choice([-30, -60, 30, 60])
      // context.anglePerspective = choice([-30, -40])

      // PRECISER DANS UNE DOC QUE XXX EST UN BON EXERCICE POUR LA DISPOSITION DU PAVE
      L = randint(5, 20)
      h = randint(5, 20, [L])
      p = randint(5, 20, [L, h])
      A = point3d(0, 0, 0)
      B = point3d(L, 0, 0)
      D = point3d(0, 0, h)
      choixProfondeur = choice([p, -p])
      E = point3d(0, choixProfondeur, 0)

      nomSolide = choisitLettresDifferentes(8, 'OQWX').join('')
      solideDessine = pave3d(A, B, D, E, 'blue', true, nomSolide)
      objetsEnonce.push(...solideDessine.c2d)
      texte += mathalea2d(Object.assign({}, fixeBordures(objetsEnonce), { scale: 0.7, style: 'block' }), objetsEnonce) + '<br>'

      choixFace = combinaisonListes(range1(6), 6)
      facesPossibles = [['de devant', '0123'], ['de derrière', '4567'], ['de gauche', '0374'], ['de droite', '1265'], ['du dessus', '2376'], ['du dessous', '0154']]

      function toutesLesFaces (face) {
        const tab = [face]
        for (let i = 1; i < 4; i++) {
          tab.push(tab[i - 1][3] + tab[i - 1].splice(0, 3))
        }
      }
      resultatsPossibles = toutesLesFaces(facesPossibles[choixFace[0]][1])
      console.log(resultatsPossibles)

      for (let ee = 0; ee < choixFace.length; ee++) {
        texte += this.sup === 1 ? '' : numAlpha(ee)
        texte += `Comment peut se nommer la face ${facesPossibles[choixFace[ee]][0]} du pavé droit ${nomSolide} ? <br>`
      }
      setReponse(this, i, new Grandeur(reponse), { formatInteractif: 'unites' })
      if (this.interactif && context.isHtml) texte += `<br>$${longueurATrouver}\\approx$` + ajouteChampTexteMathLive(this, i, 'largeur25 inline unites[longueurs]')
      resultat = 12

      if (this.questionJamaisPosee(i, resultat.toString())) {
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
  this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
  this.besoinFormulaire3Numerique = ['Exercice interactif ou AMC', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
  this.besoinFormulaire4Texte = ['Type de solides', 'Nombres séparés par des tirets\n1 : Cubes\n2 : Pavés droits\n 3 : Mélange']
}
