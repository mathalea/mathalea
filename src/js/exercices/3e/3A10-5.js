import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, range1, contraindreValeur, compteOccurences, texNombre, sp, combinaisonListes } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Recourir à une décomposition en facteurs premiers dans des cas simples'
// export const amcReady = true
// export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '29/08/2022'
/**
 *
 * Attendus de 3e : Recourir à une décomposition en facteurs premiers dans des cas simples
 * @author Eric Elter
 * Référence 3A10-5
 */

export const uuid = 'eee79'
export const ref = '3A10-5'
export default function RecourirDecompositionFacteursPremiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 4
  this.besoinFormulaireTexte = ['Nombres premiers utilisés ', 'Nombres séparés par des tirets\n1 : 2, 3 et 5\n2 : 2, 3 et 7\n3 : 2, 5 et 7\n4 : 3, 5 et 7\n5 : Mélange']
  this.besoinFormulaire2Numerique = ['Puissance la plus élevée possible (entre 2 et 5)', 3]
  this.sup = 5
  this.tailleDiaporama = 2

  function ecrireReponse (alpha, a, beta, b, gamma, c) {
    let reponse = ''
    let reponse2 = ''
    if (a !== 0) {
      reponse += `${alpha}`
      reponse2 += `${alpha}`
      if (a !== 1) {
        for (let k = 1; k < a; k++) {
          reponse += `\\times${alpha}`
        }
        reponse2 += `^${a}`
      }
    }
    if (b !== 0) {
      reponse += a === 0 ? '' : '\\times'
      reponse2 += a === 0 ? '' : '\\times'
      reponse += `${beta}`
      reponse2 += `${beta}`
      if (b !== 1) {
        for (let k = 1; k < b; k++) {
          reponse += `\\times${beta}`
        }
        reponse2 += `^${b}`
      }
    }
    if (c !== 0) {
      reponse += `\\times${gamma}`
      reponse2 += `\\times${gamma}`
      if (c !== 1) {
        for (let k = 1; k < c; k++) {
          reponse += `\\times${gamma}`
        }
        reponse2 += `^${c}`
      }
    }
    return ([reponse, reponse2])
  }

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.sup2 = contraindreValeur(1, 3, parseInt(this.sup2), 3)
    this.consigne = 'Décomposer en produit de facteurs premiers '
    this.consigne += this.nbQuestions === 1 ? 'le nombre suivant.' : 'les nombres suivants.'
    if (this.interactif) this.consigne += '<br>Indiquer les facteurs par ordre croissant.'
    let typesDeQuestionsDisponibles = []
    if (!this.sup) { // Si aucune liste n'est saisie
      typesDeQuestionsDisponibles = [5]
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = Math.max(Math.min(parseInt(this.sup), 5), 1)
        typesDeQuestionsDisponibles[0] = this.sup
      } else {
        typesDeQuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 5, parseInt(typesDeQuestionsDisponibles[i]), 5)
        }
      }
    }
    if (compteOccurences(typesDeQuestionsDisponibles, 5) > 0) typesDeQuestionsDisponibles = range1(4) // Teste si l'utilisateur a choisi tout
    const puissanceMax = contraindreValeur(2, 5, this.sup2, 3)
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c, nbADecomposer; i < this.nbQuestions && cpt < 50;) {
      a = randint(0, puissanceMax)
      b = randint(0, puissanceMax, a)
      c = randint(0, puissanceMax, [a, b])
      switch (listeTypeDeQuestions[i]) {
        case 1: // 2, 3 et 5
          nbADecomposer = Math.pow(2, a) * Math.pow(3, b) * Math.pow(5, c)
          texte = `$${texNombre(nbADecomposer)}$`
          texteCorr = texte + `$${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 3, b, 5, c)[0] + `${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 3, b, 5, c)[1] + '$'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 nospacebefore', { texte: `${sp(2)}=` })
          setReponse(this, i, ecrireReponse(2, a, 3, b, 5, c), { formatInteractif: 'texte' })
          break
        case 2: // 2, 3 et 7
          nbADecomposer = Math.pow(2, a) * Math.pow(3, b) * Math.pow(7, c)
          texte = `$${texNombre(nbADecomposer)}$`
          texteCorr = texte + `$${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 3, b, 7, c)[0] + `${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 3, b, 7, c)[1] + '$'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 nospacebefore', { texte: `${sp(2)}=` })
          setReponse(this, i, ecrireReponse(2, a, 3, b, 7, c), { formatInteractif: 'texte' })
          break
        case 3: // 2, 5 et 7
          nbADecomposer = Math.pow(2, a) * Math.pow(5, b) * Math.pow(7, c)
          texte = `$${texNombre(nbADecomposer)}$`
          texteCorr = texte + `$${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 5, b, 7, c)[0] + `${sp(2)}=${sp(1)}` + ecrireReponse(2, a, 5, b, 7, c)[1] + '$'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 nospacebefore', { texte: `${sp(2)}=` })
          setReponse(this, i, ecrireReponse(2, a, 5, b, 7, c), { formatInteractif: 'texte' })
          break
        case 4: // 3, 5 et 7
          nbADecomposer = Math.pow(3, a) * Math.pow(5, b) * Math.pow(7, c)
          texte = `$${texNombre(nbADecomposer)}$`
          texteCorr = texte + `$${sp(2)}=${sp(1)}` + ecrireReponse(3, a, 5, b, 7, c)[0] + `${sp(2)}=${sp(1)}` + ecrireReponse(3, a, 5, b, 7, c)[1] + '$'
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 nospacebefore', { texte: `${sp(2)}=` })
          setReponse(this, i, ecrireReponse(3, a, 5, b, 7, c), { formatInteractif: 'texte' })
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
