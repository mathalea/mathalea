import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, listeQuestionsToContenu, choice, combinaisonListes, texNombre2 } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/gestionInteractif.js'
export const amcReady = true
export const amcType = 'qcmMult' // type de question AMC

export const titre = 'Critères de divisibilité (plusieurs possibles)'

/**
 * Un nombre est-il divisible par 2, 3, 5, 9 ?
 *
 *
 * @author Rémi Angot
 * 6N43-2
 */
export default function TableauCriteresDeDivisibilite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 1
  this.spacingCorr = 1
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.nbCols = 1

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    if (!this.modeQcm) {
      this.consigne =
        'Compléter le tableau en mettant oui ou non dans chaque case.'
    } else {
      this.consigne =
        'mettre une croix dans la ou les cases qui conviennent.'
    }
    let espace = ''
    if (context.isHtml) {
      espace = '&emsp;'
    } else {
      espace = '\\qquad'
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const listeDesNombresPossibles = [
      'div2',
      'div3',
      'div39',
      'div5',
      'div25',
      'div23',
      'div239',
      'div35',
      'div2359',
      'divrien'
    ]
    // divisible par 2, divisible par 3, divisible par 3 et 9...

    const listeDesTypesDeNombres = combinaisonListes(
      listeDesNombresPossibles,
      this.nbQuestions
    )
    const tableauDeNombres = []; let texte; let texteCorr
    const tableauDeNombresAvecCorrection = []
    const listeDeFacteurs = [
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
      101,
      103,
      107,
      109,
      113,
      127,
      131,
      137,
      139,
      149,
      151,
      157,
      163,
      167,
      173,
      179,
      181,
      191,
      193,
      197,
      199,
      211,
      223,
      227,
      229,
      233,
      239,
      241,
      251,
      257,
      263,
      269,
      271,
      277,
      281,
      283,
      293
    ]
    texteCorr = ''
    texte = ''
    for (let i = 0; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = {}
      switch (listeDesTypesDeNombres[i]) {
        case 'div2':
          tableauDeNombres[i] = 2 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $3$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $3$."
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est pair. Il est donc divisible par 2.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`

          break
        case 'div3':
          tableauDeNombres[i] = 3 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: false,
              feedback: "Ce nombre est impair. Il n'est pas divisible par $2$"
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est divisible par $3$ car la somme de ses chiffres est divisible par $3$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div39':
          tableauDeNombres[i] = 9 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: false,
              feedback: "Ce nombre est impair. Il n'est pas divisible par $2$"
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est divisible par $9$ et par $3$ car la somme de ses chiffres est divisible par $9$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div5':
          tableauDeNombres[i] = 5 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\text{non} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: false,
              feedback: "Ce nombre est impair. Il n'est pas divisible par $2$"
            },
            {
              texte: 'par $3$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $3$."
            },
            {
              texte: 'par $5$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: `Ce nombre est divisible par $5$ car son chiffre des unités est $${tableauDeNombres[i].toString().charAt(tableauDeNombres[i].toString().length - 1)}$.`
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div25':
          tableauDeNombres[i] = 10 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $3$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $3$."
            },
            {
              texte: 'par $5$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est un multiple de $10$. Il est donc divisible par $2$ et par $5$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div23':
          tableauDeNombres[i] = 6 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est un nombre pair. Il est donc divisible par $2$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div239':
          tableauDeNombres[i] = 18 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} & \\color{blue} \\text{oui} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est un nombre pair. Il est donc divisible par $2$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div35':
          tableauDeNombres[i] = 15 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\text{non} & \\color{blue} \\text{oui} & \\color{blue} \\text{oui} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: false,
              feedback: "Ce nombre est impair. Il n'est pas divisible par $2$"
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: 'Correct !'
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est un nombre pair. Il est donc divisible par $2$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'div2359':
          tableauDeNombres[i] = 90 * choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\color{blue} \\text{oui} & \\text{oui} & \\text{oui} & \\text{oui} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $3$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $5$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par $9$',
              statut: true,
              feedback: 'Correct !'
            },
            {
              texte: 'par aucun',
              statut: false,
              feedback: 'Ce nombre est un nombre pair. Il est donc divisible par $2$.'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
        case 'divrien':
          tableauDeNombres[i] = choice(listeDeFacteurs)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i]
          )} & \\text{non} & \\text{non} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: 'par $2$',
              statut: false,
              feedback: "Ce nombre est un nombre impair. Il ,'est pas divisible par $2$"
            },
            {
              texte: 'par $3$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $3$."
            },
            {
              texte: 'par $5$',
              statut: false,
              feedback: "Le chiffre des unités n'est ni $0$ ni $5$."
            },
            {
              texte: 'par $9$',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par $9$."
            },
            {
              texte: 'par aucun',
              statut: true,
              feedback: 'Correct !'
            }
          ]
          this.autoCorrection[i].enonce = `$${texNombre2(tableauDeNombres[i])}$ est divisible\n`
          break
      }
      this.autoCorrection[i].options = {
        ordered: true,
        lastChoice: 4
      }
      if (!context.isAmc && this.modeQcm) {
        texte += `$${texNombre2(tableauDeNombres[i])}$ est divisible ${espace}  `
        texte += propositionsQcm(this, i).texte
        texte += '<br>'
      }
    } // fin de boucle de préparation des question
    // mise en forme selon les cas de figures
    // l'enoncé
    if (context.isHtml && !this.modeQcm) {
      texte = '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isHtml && !this.modeQcm) {
      texte = '$\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isAmc && !this.modeQcm) {
      texte += '\\hline\n'
      texte += '\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n'
      texte += '\\hline\n'
      for (let k = 0; k < this.nbQuestions; k++) {
        texte += `${texNombre2(tableauDeNombres[k])} & & & & \\\\\n`
        texte += '\\hline\n'
      }
      texte += '\\end{array}\n$'
    }

    // la correction
    if (context.isHtml) {
      texteCorr = '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isHtml && !context.isAmc) {
      texteCorr = '$\\begin{array}{|l|c|c|c|c|}\n'
    }

    if (!context.isAmc) {
      texteCorr += '\\hline\n'
      texteCorr += '\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n'
      texteCorr += '\\hline\n'
      for (let l = 0; l < this.nbQuestions; l++) {
        texteCorr += tableauDeNombresAvecCorrection[l]
        texteCorr += '\\hline\n'
      }
      texteCorr += '\\end{array}$\n'
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    if (!context.isAmc) {
      if (this.interactif) {
        listeQuestionsToContenu(this)
      } else {
        listeQuestionsToContenuSansNumero(this)
      }
    }
  }
}
