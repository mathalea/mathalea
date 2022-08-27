import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, texNombre } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Écrire un nombre à partir de son nombre de dizaines, de centaines, de milliers...'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDeModifImportante = '07/11/2021'

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
      this.consigne = 'Écrire en chiffres chacun des nombres.'
    } else { // Vers les dizaines, centaines, milliers....
      this.consigne = 'Compléter.'
    }
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

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (this.sup2) {
          setReponse(this, i, b * Math.pow(10, rangB) + a * Math.pow(10, rangA), { digits: 0 })
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        } else {
          setReponse(this, i, b * Math.pow(10, rangB - rangRef) + a * Math.pow(10, rangA - rangRef), { digits: 0 })
          texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texteApres: `$\\text{ ${rangs[rangRef]}.}$` })
        }
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
