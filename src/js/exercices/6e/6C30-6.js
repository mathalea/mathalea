import Exercice from '../Exercice.js'
import { calcul, listeQuestionsToContenu, combinaisonListes, choice, range, rangeMinMax, texNombre3, texteEnCouleurEtGras, enleveElement } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
import { min } from 'mathjs'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = 'qcm'
export const titre = 'Par combien multiplier un nombre pour que le chiffre des unités devienne le chiffre des ...'

// Gestion de la date de publication initiale
export const dateDePublication = '03/11/2021'

/**
 * @author Eric Elter
 * Référence 6C30-6
 */
export default function MultiplierUnNombre () {
  'use strict'
  Exercice.call(this)
  this.nbQuestions = 6 // Ici le nombre de questions
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.consigne = ''
  this.sup = false
  this.sup2 = 3

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    const choixUnites = ['millièmes', 'centièmes', 'dizièmes', '', 'dizaines', 'centaines', 'milliers']
    let listeChoixAlea = range(6, [3])
    this.nbQuestions = min(this.nbQuestions, 6)
    if (parseInt(this.sup2) === 1) {
      listeChoixAlea = rangeMinMax(4, 6)
      this.nbQuestions = min(this.nbQuestions, 3)
    } else if (parseInt(this.sup2) === 2) {
      listeChoixAlea = range(2)
      this.nbQuestions = min(this.nbQuestions, 3)
    }
    listeChoixAlea = combinaisonListes(listeChoixAlea, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const choixAlea = listeChoixAlea[0]
      listeChoixAlea.splice(0, 1)
      texte = `Par combien multiplier un nombre pour que tous ses chiffres changent de position et que le chiffre des unités devienne le chiffre des ${choixUnites[choixAlea]} ?`
      const dizaine = choice(rangeMinMax(0, 9))
      const unite = choice(rangeMinMax(0, 9), [dizaine])
      const dixieme = (this.sup) ? 0 : choice(rangeMinMax(0, 9), [dizaine, unite])
      const centieme = (this.sup) ? 0 : choice(rangeMinMax(0, 9), [dizaine, unite, dixieme])
      const exemple = calcul(dizaine * 10 + unite + dixieme / 10 + centieme / 100)
      texteCorr = `Prenons un exemple : ${texNombre3(exemple)}.</br>`
      texteCorr += `$${texNombre3(exemple)} \\times ${texNombre3(calcul(10 ** (choixAlea - 3)))} = ${texNombre3(exemple * calcul(10 ** (choixAlea - 3)))}$</br>`
      texteCorr += `Si on veut que son chiffre des ${texteEnCouleurEtGras('unités')} devienne le chiffre des ${texteEnCouleurEtGras(choixUnites[choixAlea])}, on doit multiplier le nombre par ${texteEnCouleurEtGras(texNombre3(calcul(10 ** (choixAlea - 3))))}.`
      const aleaFaux = range(6, [3, choixAlea])
      enleveElement(aleaFaux)
      const choixAleaFaux = []
      for (let kk = 0; kk < 6; kk++) {
        choixAleaFaux.push(texNombre3(calcul(10 ** (aleaFaux[kk] - 3))))
      }
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${texNombre3(calcul(10 ** (choixAlea - 3)))}$`,
          statut: true
        },
        {
          texte: `$${choixAleaFaux[0]}$`,
          statut: false
        },
        {
          texte: `$${choixAleaFaux[1]}$`,
          statut: false
        },
        {
          texte: `$${choixAleaFaux[2]}$`,
          statut: false
        },
        {
          texte: `$${choixAleaFaux[3]}$`,
          statut: false
        },
        {
          texte: `$${choixAleaFaux[4]}$`,
          statut: false
        }
      ]
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 7
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Dans la correction, les nombres-exemples sont entiers', false]
  this.besoinFormulaire2Numerique = ['Type de questions', 3, ' 1 : Dizaines, centaines, milliers\n 2 : Dixièmes, centièmes, millièmes\n 3 : Mélange']
}
