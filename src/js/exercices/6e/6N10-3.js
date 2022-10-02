import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListesSansChangerOrdre, texNombre, miseEnEvidence, combinaisonListes, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { pow } from 'mathjs'
export const titre = 'Décomposer un nombre entier (nombre de ..., chiffres des ...)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * * Donner le chiffre des ... le nombre de ...
 * * 6N10-3
 * @author Sébastien Lozano
 * Rendu interactif par Jean-Claude Lhote et ajout de paramètre type de questions
 * Relecture : Décembre 2021 par EE
 */

export const uuid = '34579'
export const ref = '6N10-3'
export default function ChiffreNombreDe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1

  this.nbQuestions = 6

  this.consigne = ''

  this.nbCols = 1
  this.nbColsCorr = 1
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    this.sup = parseInt(this.sup)

    switch (this.sup) {
      case 1:
        typesDeQuestionsDisponibles = combinaisonListes([0, 1, 2], this.nbQuestions)
        break
      case 2:
        typesDeQuestionsDisponibles = combinaisonListes([3, 4, 5], this.nbQuestions)
        break
      default:
        typesDeQuestionsDisponibles = combinaisonListes([0, 1, 2, 3, 4, 5], this.nbQuestions)
        break
    }

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus
    const reponses = []
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const mmc = randint(0, 9, [0])
      const mmd = randint(0, 9, [mmc])
      const mmu = randint(0, 9, [mmc, mmd])
      const mc = randint(0, 9, [mmu, mmd, mmc])
      const md = randint(0, 9, [mmu, mmd, mmc, mc])
      const mu = randint(0, 9, [mmu, mmd, mmc, mc, md])
      const c = randint(0, 9, [mmu, mmd, mmc, mu, md, mc])
      const d = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c])
      const u = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c, d])
      const nbStr = mmc.toString() + mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
      const nb = Number(nbStr)
      const cdu = ['unites', 'dizaines', 'centaines']
      const chiffreNombre = {
        chiffre: {
          unites: {
            unites: { determinant: 'des', cdu: ['unités', ''], rangs: [8] },
            dizaines: { determinant: 'des', cdu: ['dizaines', ''], rangs: [7] },
            centaines: { determinant: 'des', cdu: ['centaines', ''], rangs: [6] }
          },
          milliers: {
            unites: { determinant: 'des', cdu: ['unités de milliers', ''], rangs: [5] },
            dizaines: { determinant: 'des', cdu: ['dizaines de milliers', ''], rangs: [4] },
            centaines: { determinant: 'des', cdu: ['centaines de milliers', ''], rangs: [3] }
          },
          millions: {
            unites: { determinant: 'des', cdu: ['unités de millions', ''], rangs: [2] },
            dizaines: { determinant: 'des', cdu: ['dizaines de millions', ''], rangs: [1] },
            centaines: { determinant: 'des', cdu: ['centaines de millions', ''], rangs: [0] }
          }
        },
        nombre: {
          unites: {
            unites: { determinant: 'd\'', cdu: ['unités', 1], rangs: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            dizaines: { determinant: 'de', cdu: ['dizaines', 10], rangs: [0, 1, 2, 3, 4, 5, 6, 7] },
            centaines: { determinant: 'de', cdu: ['centaines', 100], rangs: [0, 1, 2, 3, 4, 5, 6] }
          },
          milliers: {
            unites: { determinant: 'd\'', cdu: ['unités de milliers', 1000], rangs: [0, 1, 2, 3, 4, 5] },
            dizaines: { determinant: 'de', cdu: ['dizaines de milliers', 10000], rangs: [0, 1, 2, 3, 4] },
            centaines: { determinant: 'de', cdu: ['centaines de milliers', 100000], rangs: [0, 1, 2, 3] }
          },
          millions: {
            unites: { determinant: 'd\'', cdu: ['unités de millions', 1000000], rangs: [0, 1, 2] },
            dizaines: { determinant: 'de', cdu: ['dizaines de millions', 10000000], rangs: [0, 1] },
            centaines: { determinant: 'de', cdu: ['centaines de millions', 100000000], rangs: [0] }
          }
        }
      }

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 --> chiffre des
          type: 'chiffre',
          tranche: 'unites',
          cdu: choice(cdu)
        },
        { // case 1 --> chiffre des
          type: 'chiffre',
          tranche: 'milliers',
          cdu: choice(cdu)
        },
        { // case 2 --> chiffre des
          type: 'chiffre',
          tranche: 'millions',
          cdu: choice(cdu)
        },
        { // case 3 --> nombre de
          type: 'nombre',
          tranche: 'unites',
          cdu: choice(cdu)
        },
        { // case 4 --> nombre de
          type: 'nombre',
          tranche: 'milliers',
          cdu: choice(cdu)
        },
        { // case 5 --> nombre de
          type: 'nombre',
          tranche: 'millions',
          cdu: choice(cdu)
        }
      ]

      // une fonction pour la correction selon le type de question
      function chiffreNombreCorr (type, str, rang) {
        let sortie
        if (type === 'chiffre') {
          sortie = str.split('')[rang[0]]
        };
        if (type === 'nombre') {
          sortie = str.split('')[rang[0]]
          for (let k = 1; k < rang.length; k++) {
            sortie += str.split('')[rang[k]]
          };
        };
        return sortie
      };

      // une fonction pour la justification supplémentaire dans le cas nombre de ...
      function nombreDeJustif (type, str, rang, cduNum) {
        let sortie
        if (type === 'chiffre') {
          sortie = ''
        };
        if (type === 'nombre') {
          let nbDe = str.split('')[rang[0]]
          for (let k = 1; k < rang.length; k++) {
            nbDe += str.split('')[rang[k]]
          };
          let j = rang[rang.length - 1]
          j++
          let nbDeReste = ''
          while (j !== 9) {
            nbDeReste += str.split('')[j]
            j++
          };
          sortie = `comme $${texNombre(str, 0)} = ${texNombre(nbDe, 0)}\\times ${texNombre(cduNum, 0)}+${texNombre(nbDeReste, 0)}$ alors `
        };
        return sortie
      };

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          Dans $${texNombre(nb, 0)}$, quel est le ${situations[k].type} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} ?`,
          question: '',
          correction: `
          Dans $${texNombre(nb, 0)}$,           
          ${nombreDeJustif(situations[k].type, nbStr, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[1])}          
          le ${situations[k].type} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant}  ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} est 
          $${miseEnEvidence(texNombre(chiffreNombreCorr(situations[k].type, nbStr, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs), 0))}$.`
        })
        reponses[k] = chiffreNombreCorr(situations[k].type, nbStr, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs)
      }

      texte = `${enonces[listeTypeDeQuestions[i]].enonce}`
      texteCorr = `${enonces[listeTypeDeQuestions[i]].correction}`
      setReponse(this, i, reponses[listeTypeDeQuestions[i]])

      if (context.isAmc) {
        const nbDigitsSupplementaires = randint(1, 2)
        this.autoCorrection[i] = {
          enonce: texte, // Si vide, l'énoncé est celui de l'exercice.
          propositions: [
            {
              texte: texteCorr // Si vide, le texte est la correction de l'exercice.
            }
          ],
          reponse: {
            texte: 'le texte affiché au dessus du formulaire numerique dans AMC', // facultatif
            valeur: [reponses[listeTypeDeQuestions[i]]], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9. Cette valeur doit être passée dans un tableau d'où la nécessité des crochets.
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              aussiCorrect: reponses[listeTypeDeQuestions[i]] * pow(10, nbDigitsSupplementaires),
              digits: nbDigitsSupplementaires + nombreDeChiffresDansLaPartieEntiere(reponses[listeTypeDeQuestions[i]]), // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
              signe: false, // (présence d'une case + ou - pour AMC)
              approx: 0 // (0 = valeur exacte attendue, sinon valeur de tolérance... voir plus bas pour un point technique non intuitif)
            }
          }
        }
      }

      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i], nb)) { // Si la question n'a jamais été posée, on en crée une autre
        texte += ajouteChampTexteMathLive(this, i, 'largeur25')
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Type de questions', 3, '1 : Chiffre des ...\n2 : Nombre de ...\n3 : Mélange']
};
