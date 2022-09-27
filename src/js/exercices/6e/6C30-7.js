import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { calcul, listeQuestionsToContenu, combinaisonListes, choice, range, rangeMinMax, texNombre3, texteEnCouleurEtGras, enleveElement, numAlpha, randint, lampeMessage } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { min } from 'mathjs'
import { context } from '../../modules/context.js'
import { glisseNombre } from '../../modules/2d.js'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = 'qcm'
export const titre = 'Par combien diviser un nombre pour que le chiffre des unités devienne le chiffre des ...'

// Gestion de la date de publication initiale
export const dateDePublication = '04/11/2021'

/**
 * Presentation didactique : Par combien diviser un nombre pour que le chiffre des unités devienne le chiffre des ...
 * @author Eric Elter (inspiré par Aude Duvold)
 * Référence 6C30-7
 */
export const uuid = '85989'
export const ref = '6C30-7'
export default function DiviserUnNombreParPuissanceDeDix () {
  'use strict'
  Exercice.call(this)
  this.nbQuestions = 5 // Ici le nombre de questions
  this.consigne = ''
  this.sup = false
  this.sup2 = true
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []
    const choixUnites = ['millièmes', 'centièmes', 'dixièmes']
    let listeChoixAlea = range(2)
    if (!this.sup2 || this.interactif) { this.nbQuestions = min(this.nbQuestions, 3) }
    if (context.isAmc) { this.sup2 = false }
    if (this.interactif) {
      this.introduction = lampeMessage({
        titre: 'Aucun raisonnement écrit ne vous est demandé.',
        texte: ' Vous pouvez, tout de même, le faire au brouillon sur un exemple avant de choisir une réponse en ligne.',
        couleur: 'nombres'
      })
    } else {
      this.introduction = lampeMessage({
        titre: 'Bien lire les consignes.',
        texte: '',
        couleur: 'nombres'
      })
    }
    listeChoixAlea = combinaisonListes(listeChoixAlea, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const choixAlea = listeChoixAlea[0]
      listeChoixAlea.splice(0, 1)
      const centaine = randint(0, 1) === 0 ? choice(rangeMinMax(0, 9)) : 0
      const dizaine = choice(rangeMinMax(0, 9), [centaine])
      const unite = choice(rangeMinMax(0, 9), [centaine, dizaine])
      const dixieme = (this.sup) ? 0 : choice(rangeMinMax(0, 9), [centaine, dizaine, unite])
      const centieme = ((randint(0, 1) !== 0) || (this.sup)) ? 0 : choice(rangeMinMax(0, 9), [centaine, dizaine, unite, dixieme])
      const exemple = calcul(centaine * 100 + dizaine * 10 + unite + dixieme / 10 + centieme / 100)
      if (this.sup2 & !this.interactif) {
        texte = `Voici un nombre : $${texNombre3(exemple)}$.<br>`
        texte += `${numAlpha(0)} Entourer le chiffre des unités de ce nombre.<br>`
        texte += `${numAlpha(1)} Compléter les phrases suivantes.<br>`
        texte += `Diviser $${texNombre3(exemple)}$ par $${texNombre3(calcul(10 ** (3 - choixAlea)))}$, c'est trouver le nombre $\\ldots\\ldots\\ldots$ fois plus $\\ldots\\ldots\\ldots$ que $${texNombre3(exemple)}$.<br>`
        texte += `Le chiffre des unités de $${texNombre3(exemple)}$ devient, alors, le chiffre des $\\ldots\\ldots\\ldots\\ldots\\ldots$ et donc $${texNombre3(exemple)} \\div ${texNombre3(calcul(10 ** (3 - choixAlea)))} =\\ldots\\ldots\\ldots\\ldots$<br>`

        texteCorr = `${numAlpha(0)} $${unite}$ est le chiffre des unités de $${texNombre3(exemple)}$.<br>`
        texteCorr += `${numAlpha(1)} Diviser $${texNombre3(exemple)}$ par $${texNombre3(calcul(10 ** (3 - choixAlea)))}$, c'est trouver le nombre ${texteEnCouleurEtGras(texNombre3(calcul(10 ** (3 - choixAlea))))} fois plus ${texteEnCouleurEtGras('petit')} `
        texteCorr += `que $${texNombre3(exemple)}$.<br>`
        texteCorr += `Le chiffre des unités de $${texNombre3(exemple)}$ devient, alors, le chiffre des ${texteEnCouleurEtGras(choixUnites[choixAlea])} et donc $${texNombre3(exemple)} \\div ${texNombre3(calcul(10 ** (3 - choixAlea)))} =$ ${texteEnCouleurEtGras(texNombre3(exemple * calcul(10 ** (choixAlea - 3))))}.<br>`
      } else {
        texte = `Par combien diviser un nombre pour que tous ses chiffres changent de position et que le chiffre des unités devienne le chiffre des ${choixUnites[choixAlea]} ?`

        texteCorr = `Prenons un exemple : ${texNombre3(exemple)}.<br>`
        texteCorr += `$${texNombre3(exemple)} \\div ${texNombre3(calcul(10 ** (3 - choixAlea)))} = ${texNombre3(exemple * calcul(10 ** (choixAlea - 3)))}$<br>`
        texteCorr += `Si on veut que son chiffre des ${texteEnCouleurEtGras('unités')} devienne le chiffre des ${texteEnCouleurEtGras(choixUnites[choixAlea])}, on doit diviser le nombre par ${texteEnCouleurEtGras(texNombre3(calcul(10 ** (3 - choixAlea))))}.`
        const aleaFaux = range(6, [3, choixAlea])
        enleveElement(aleaFaux)
        const choixAleaFaux = []
        for (let kk = 0; kk < 6; kk++) {
          choixAleaFaux.push(texNombre3(calcul(10 ** (3 - aleaFaux[kk]))))
        }
        this.autoCorrection[i] = {}
        this.autoCorrection[i].enonce = `${texte}\n`
        this.autoCorrection[i].propositions = [
          {
            texte: `$${texNombre3(calcul(10 ** (3 - choixAlea)))}$`,
            statut: true
          },
          {
            texte: `$${choixAleaFaux[0]}$`,
            statut: false
          },
          {
            texte: `$${choixAleaFaux[1]}$`,
            statut: false
          }
        ]
        this.autoCorrection[i].options = {
          ordered: false,
          lastChoice: 4
        }
      }
      if (this.interactif) {
        texte += '<br>' + propositionsQcm(this, i).texte
      }
      if (context.isHtml) texteCorr += mathalea2d({ xmin: 2.5, xmax: 27.5, ymin: -5, ymax: 5.5 }, glisseNombre(exemple, choixAlea - 3))

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
  this.besoinFormulaireCaseACocher = ['Les nombres-exemples sont entiers', false]
  this.besoinFormulaire2CaseACocher = ['Exercice avec un raisonnement associé', true]
}
