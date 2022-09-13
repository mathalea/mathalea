import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, listeDiviseurs, texFactorisation, texNombre, miseEnEvidence } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const amcReady = true // tant qu'il n'a pas été adapté à la version 2.6
export const amcType = 'qcmMono' // QCM
export const interactifType = 'qcm'
export const interactifReady = true

export const titre = 'Calculs avec des multiplications et des puissances de 10'
export const dateDePublication = '20/08/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculs avec des multiplications et des puissances de 10
 * @author Mickael Guironnet
 * Référence 4C32-4
 * 2022-08-18
*/
export const uuid = '8b399'
export const ref = '4C32-4'
export default function CalculsPuissancesDe10 () {
  Exercice.call(this)
  this.sup = 1
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestions = 5
  this.correctionDetailleeDisponible = true // booléen qui indique si une correction détaillée est disponible.
  this.correctionDetaillee = false // booléen indiquant si la correction détaillée doit être affiché par défaut (récupéré dans l'url avec le paramètre `,cd=`).

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)
    this.autoCorrection = []

    this.consigne = 'Donner l\'écriture scientifique.'

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const listeFacteurs1 = [2, 3, 5, 7]

    for (let i = 0, texte, texteCorr, facteurs, mantisse, exp, a, b, c, d, aexp, bexp, cexp, dexp, diviseurs, scientifiquestring, cpt = 0;
      i < this.nbQuestions && cpt < 50;) {
      mantisse = randint(2, 9)

      facteurs = []
      for (let k = 0; k < (this.sup === 1 ? 2 : 3); k++) {
        facteurs.push(choice(listeFacteurs1))
      }
      c = 1
      for (let k = 0; k < facteurs.length; k++) {
        c = c * facteurs[k]
      }
      cexp = randint(1, 5) * choice([-1, 1])

      facteurs = []
      for (let k = 0; k < (this.sup === 1 ? 2 : 3); k++) {
        facteurs.push(choice(listeFacteurs1))
      }
      d = 1
      for (let k = 0; k < facteurs.length; k++) {
        d = d * facteurs[k]
      }
      dexp = randint(1, 5) * choice([-1, 1])
      diviseurs = listeDiviseurs(mantisse * c * d)
      a = diviseurs[randint(1, diviseurs.length - 2)]
      aexp = randint(1, 5) * choice([-1, 1])
      b = mantisse * c * d / a
      bexp = randint(1, 5) * choice([-1, 1])
      exp = aexp + bexp - cexp - dexp
      scientifiquestring = `${texNombre(mantisse)} \\times 10^{${exp}}`

      texte = `$\\dfrac{${texNombre(a)}\\times 10^{${aexp}}}{${texNombre(c)}\\times 10^{${cexp}}} \\times \\dfrac{${texNombre(b)}\\times 10^{${bexp}}}{${texNombre(d)}\\times 10^{${dexp}}} =$`
      texteCorr = `$\\dfrac{ ${miseEnEvidence(`${texNombre(a)}\\times 10^{${aexp}}`, 'blue')}  }{ ${miseEnEvidence(`${texNombre(c)}\\times 10^{${cexp}}`, '#8A2BE2')} } \\times \\dfrac{ ${miseEnEvidence(`${texNombre(b)}\\times 10^{${bexp}}`, '#FF1493')} }{ ${miseEnEvidence(`${texNombre(d)}\\times 10^{${dexp}}`, '#2E8B57')} } =$`
      if (this.correctionDetaillee) {
        texteCorr += `$ \\dfrac{${miseEnEvidence(texFactorisation(a), 'blue')} \\times ${miseEnEvidence(texFactorisation(b), '#FF1493')}}{${miseEnEvidence(texFactorisation(c), '#8A2BE2')} \\times ${miseEnEvidence(texFactorisation(d), '#2E8B57')}} $`
        texteCorr += `$ \\times \\dfrac{${miseEnEvidence(`10^{${aexp}}`, 'blue')} \\times ${miseEnEvidence(`10^{${bexp}}`, '#FF1493')}}{${miseEnEvidence(`10^{${cexp}}`, '#8A2BE2')} \\times ${miseEnEvidence(`10^{${dexp}}`, '#2E8B57')}} =$`
      }
      texteCorr += ` $ ${scientifiquestring}$`
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

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Facile\n2 : Difficile']
}
