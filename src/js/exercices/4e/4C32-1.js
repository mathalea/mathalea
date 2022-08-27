import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, texNombrec, texNombre, miseEnEvidence } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Calcul avec les puissances de dix'

export const amcReady = true // tant qu'il n'a pas été adapté à la version 2.6
export const amcType = 'qcmMono' // QCM
export const interactifType = 'qcm'
export const interactifReady = true

/**
 * type 1 : Un nombre est donné par le produit d'un décimal par une puissance de dix, il faut l'écrire en notation scientifique
 * type 2 : On donne la notation scientifique d'un nombre et on doit trouver l'exposant manquant de 10 dans le membre de gauche.
 * @author Jean-Claude Lhote
 * 4C32-1
 */
export const uuid = '762fe'
export const ref = '4C32-1'
export default function CalculsAvecPuissancesDeDix () {
  Exercice.call(this)
  this.sup = 1
  this.sup2 = 1
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 5

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.sup2 = parseInt(this.sup2)
    this.autoCorrection = []

    if (this.sup === 1) this.consigne = 'Donner l\'écriture scientifique des nombres suivants.'
    else this.consigne = 'Compléter l\'égalité des nombres suivants.'
    let typeDeQuestionsDisponibles
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (parseInt(this.sup2) === 1) typeDeQuestionsDisponibles = [0, 0, 0, 1, 1]
    else if (parseInt(this.sup2) === 2) typeDeQuestionsDisponibles = [0, 1, 1, 2, 2]
    else typeDeQuestionsDisponibles = [2, 2, 3, 3, 3]

    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, mantisse1, exp1, decalage, mantisse, exp, decimalstring, scientifiquestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      //        nombre=calcul(randint(1001,9999)/10**randint(1,6))
      //      mantisse=calcul(nombre/10**(Math.floor(Math.log10(nombre))))
      //        exp=Math.floor(Math.log10(nombre))
      switch (listeTypeDeQuestions[i]) {
        case 0:
          decalage = randint(-1, 1, 0)
          mantisse = randint(1, 9)
          exp = randint(1, 5)
          break
        case 1:
          decalage = randint(-2, 2, 0)
          mantisse = calcul(randint(11, 99) / 10)
          exp = randint(1, 5)
          break
        case 2:
          decalage = randint(-3, 3, 0)
          if (randint(0, 1) === 1) mantisse = calcul(randint(111, 999) / 100)
          else mantisse = calcul((randint(1, 9) * 100 + randint(1, 9)) / 100)
          exp = randint(1, 7) * choice([-1, 1])
          break
        case 3:
          decalage = randint(-4, 4, 0)
          if (randint(0, 1) === 1) mantisse = calcul((randint(1, 9) * 1000 + randint(1, 19) * 5) / 1000)
          else mantisse = calcul(randint(1111, 9999) / 1000)
          exp = randint(3, 7) * choice([-1, 1])
          break
      }
      // nombre = calcul(mantisse * 10 ** exp)
      mantisse1 = calcul(mantisse * 10 ** decalage)
      exp1 = exp - decalage

      decimalstring = `${texNombrec(mantisse1)} \\times 10^{${exp1}}`
      scientifiquestring = `${texNombre(mantisse)} \\times 10^{${exp}}`
      if (this.sup === 1) {
        texte = `$${decimalstring}$`
        texteCorr = `$${miseEnEvidence(`${texNombrec(mantisse1)}`, 'blue')}\\times ${miseEnEvidence(`10^{${exp1}}`)} = ${miseEnEvidence(`${texNombre(mantisse)}\\times 10^{${decalage}}`, 'blue')}\\times  ${miseEnEvidence(`10^{${exp1}}`)} = ${scientifiquestring}$`
        this.autoCorrection[i] = {}
        this.autoCorrection[i].enonce = `${texte}\n`
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
        this.autoCorrection[i].propositions = [
          {
            texte: `$${scientifiquestring}$`,
            statut: true
          },
          {
            texte: `$${texNombre(mantisse)} \\times 10^{${exp - 1}}$`,
            statut: false
          },
          {
            texte: `$${texNombre(mantisse)} \\times 10^{${exp + 1}}$`,
            statut: false
          },
          {
            texte: `$${texNombre(mantisse)} \\times 10^{${-exp}}$`,
            statut: false
          }
        ]
      } else {
        texteCorr = `$${miseEnEvidence(texNombre(mantisse1), 'blue')}\\times  ${miseEnEvidence(`10^{${exp1}}`)}=${miseEnEvidence(texNombre(mantisse) + `\\times 10^{${decalage}}`, 'blue')}\\times  ${miseEnEvidence(`10^{${exp1}}`)} =${scientifiquestring}$`
        texte = `$${texNombre(mantisse1)}\\times 10^{${miseEnEvidence('....')}}=${scientifiquestring}$`
        this.autoCorrection[i] = {}
        this.autoCorrection[i].enonce = `${texte}\n`
        this.autoCorrection[i].propositions = [
          {
            texte: `$${exp1}$`,
            statut: true
          },
          {
            texte: `$${exp1 - 1}$`,
            statut: false
          },
          {
            texte: `$${exp1 + 1}$`,
            statut: false
          },
          {
            texte: `$${-exp1}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 5
        }
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ["Type d'exercices", 2, '1 : Traduire en notation scientifique\n2 : Exercice à trou']
  this.besoinFormulaire2Numerique = ['Niveau de difficulté', 3, '1 : Facile\n2 : Moyen\n3 : Difficile']
}
