import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDeModifImportante = '09/09/2022'

/**
 * Le nombre de dizaines, centaines et milliers étant donné, il faut écrire le nombre.
 *
 * 2 fois sur 5 il y a chevauchement entre les classes
 * @author Rémi Angot (complété par Eric Elter pour mettre des niveaux de difficulté)
 * 6N10-1
 * Relecture : Novembre 2021 par EE
 */
export const uuid = '7efdf'
export const ref = '6N10-1'
export default function ExerciceNumerationEntier () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 5
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = false
  this.sup2 = true
  this.sup3 = 3
  this.sup4 = 1

  this.nouvelleVersion = function () {
    this.sup3 = Number(this.sup3)
    this.sup4 = Number(this.sup4)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions = []
    if (this.sup2) { // Vers les unités
      this.consigne = 'Écrire en chiffres '
      this.consigne += this.nbQuestions === 1 ? 'ce nombre.' : 'chacun des nombres.'
    } else { // Vers les dizaines, centaines, milliers....
      this.consigne = 'Compléter.'
    }
    this.consigne += this.interactif ? ' Penser à mettre les espaces nécessaires.' : ''
    if (this.sup2) { this.sup3 = 1 } // Si entiers à 1 chiffres choisis, chevauchement impossible.
    if (this.sup3 === 1) { // Sans chevauchement
      listeTypeDeQuestions = combinaisonListes(
        [1],
        this.nbQuestions
      )
    } else if (this.sup3 === 2) { // Avec chevauchement
      listeTypeDeQuestions = combinaisonListes(
        [1],
        this.nbQuestions
      )
    } else {
      listeTypeDeQuestions = combinaisonListes( // Avec et sans chevauchement (2 sur 5 sont chevauchees)
        [1, 1, 1, 2, 2], // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
        this.nbQuestions
      )
    }
    for (let i = 0, texte, texteCorr, a, b, rangA, rangB, rangRef, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const rangs = [
        'unités',
        'dizaines',
        'centaines',
        'milliers',
        'dizaines de mille',
        'centaines de mille',
        'millions',
        'dizaines de millions',
        'centaines de millions',
        'milliards',
        'dizaines de milliards',
        'centaines de milliards'
      ]
      if (this.sup) { // Un chiffre ou deux chiffres ?
        a = randint(2, 9)
        b = randint(2, 9, [a])
      } else {
        a = randint(2, 8) * 10 + randint(1, 5)
        b = randint(2, 8) * 10 + randint(1, 5)
      }
      if (this.sup2) { // Vers les unités
        rangA = randint(0, 2)
      } else { // Vers les dizaines, centaines, milliers....
        rangRef = randint(1, this.sup4 === 1 ? 4 : 9)
        rangA = randint(rangRef, this.sup4 === 1 ? 4 : 9)
      }

      if (listeTypeDeQuestions[i] === 1) { // Sans chevauchement
        rangB = randint(rangA + 2, this.sup4 === 1 ? 6 : 11)
      } else { // Avec chevauchement
        rangB = rangA + 1
      }
      if (this.sup2) {
        texte = `$\\text{${b}  ${rangs[rangB]} et ${a} ${rangs[rangA]}}$`
        texteCorr = `$${b} \\text{ ${rangs[rangB]} et }${a} \\text{ ${rangs[rangA]
        } : } ${texNombre(b * Math.pow(10, rangB))} + ${texNombre(a * (Math.pow(10, rangA)))} =${texNombre(
          b * Math.pow(10, rangB) + a * Math.pow(10, rangA)
        )}$`
      } else {
        texte = `$\\text{${b}  ${rangs[rangB]} et ${a} ${rangs[rangA]} correspondent à }$`
        texte += !this.interactif ? `$\\text{\\ldots\\ldots\\ldots\\ldots\\ldots\\ldots\\ldots\\ldots\\ldots ${rangs[rangRef]}.}$` : ''
        texteCorr = `$${b} \\text{ ${rangs[rangB]} et }${a} \\text{ ${rangs[rangA]
        } correspondent à`
        texteCorr += ` ${texNombre(b * Math.pow(10, rangB - rangRef))} ${rangs[rangRef]} + ${texNombre(a * (Math.pow(10, rangA - rangRef)))} ${rangs[rangRef]} =${texNombre(
          b * Math.pow(10, rangB - rangRef) + a * Math.pow(10, rangA - rangRef)
        )} ${rangs[rangRef]}}$`
      }
      const reponse = this.sup2 ? b * Math.pow(10, rangB) + a * Math.pow(10, rangA) : b * Math.pow(10, rangB - rangRef) + a * Math.pow(10, rangA - rangRef)

      setReponse(this, i, texNombre(reponse), { formatInteractif: 'texte' })
      if (this.sup2) {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline college6eme')
      } else {
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline college6eme', { texteApres: `$\\text{ ${rangs[rangRef]}.}$` })
      }

      if (context.isAmc) {
        const nbDigitsSupplementaires = randint(0, 2)
        this.autoCorrection[i] = {
          enonce: texte, // Si vide, l'énoncé est celui de l'exercice.
          propositions: [
            {
              texte: 'texteCorr' // Si vide, le texte est la correction de l'exercice.
            }
          ],
          reponse: {
            texte: 'AMC', // facultatif
            valeur: [reponse], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9. Cette valeur doit être passée dans un tableau d'où la nécessité des crochets.
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              digits: nbDigitsSupplementaires + nombreDeChiffresDansLaPartieEntiere(reponse), // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
              signe: false, // (présence d'une case + ou - pour AMC)
              approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir plus bas pour un point technique non intuitif)
            }
          }
        }
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
  this.besoinFormulaireCaseACocher = ['Décomposition avec que des entiers à un chiffre']
  this.besoinFormulaire2CaseACocher = ['Décomposition vers les unités']
  this.besoinFormulaire3Numerique = ['Chevauchement des classes', 3, '1 : Sans chevauchement des classes\n2 : Avec chevauchement des classes\n3 : Mélange']
  this.besoinFormulaire4Numerique = ['Variante', 3, '1 : Jusqu\'aux millions\n2 : Jusqu\'aux centaines de milliards\n3 : Mélange']
}
