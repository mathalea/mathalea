import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { ecritureParentheseSiNegatif } from '../../modules/outils/ecritures.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { itemize } from '../../modules/outils/contextSensitif.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Traduire un programme de calcul par une expression littérale'

export const dateDeModifImportante = '11/05/2022'

/**
* Traduire un programme de calcul par une expression littérale de la forme ax+b après simplification
* @author Rémi Angot
* 5L10-2
* Ajout de la possibilité d'afficher un résultat qui n'est pas développé par Guillaume Valmont le 11/05/2022
*/
export const uuid = '12bb6'
export const ref = '5L10-2'
export default function TraduireUnProgrammeDeCalcul () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.spacingCorr = 1
  this.spacing = 1
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcType = amcType
  this.amcReady = amcReady

  this.besoinFormulaireCaseACocher = ['Résultat développé']
  this.sup = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    const typeDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6]
    const listeTypeDeQuestions = combinaisonListes(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const a = randint(4, 11)
      const b = randint(2, 11)
      const c = randint(2, 11)
      const d = randint(2, 5)
      switch (listeTypeDeQuestions[i]) {
        case 1: // (x+a)*b+c
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Ajoute ${a}`, `Multiplie par ${b}`, `Ajoute ${c}`])
          texte += 'Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$x\\xrightarrow{+${a}} x+${a}\\xrightarrow{\\times  ${b}}(x+${a})\\times  ${b}`
          if (this.sup) texteCorr += `=${b}x+${a * b}`
          texteCorr += `\\xrightarrow{+${c}}`
          this.sup ? texteCorr += `${b}x+${a * b + c}` : texteCorr += `(x+${a})\\times  ${b} + ${c}`
          texteCorr += '$<br>'
          texteCorr += 'Le résultat du programme est donc '
          this.sup ? texteCorr += `$${b}x+${a * b + c}$.` : texteCorr += `$(x+${a})\\times  ${b} + ${c}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: this.sup ? `$${b}x+${a * b + c}$` : `$(x+${a})\\times  ${b} + ${c}$`,
              statut: true
            },
            {
              texte: `$${b}x+${a + c}$`,
              statut: false
            },
            {
              texte: this.sup ? `$${b}x+${a * c}$` : `$(x+${a})\\times  ${b + c}$`,
              statut: false
            },
            {
              texte: `$${b * a}x+${c}$`,
              statut: false
            }
          ]
          break
        case 2: // (ax+b)*c
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`])
          texte += 'Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times ${c}`
          if (this.sup) texteCorr += `=${a * c}y+${b * c}`
          texteCorr += '$<br>'
          texteCorr += 'Le résultat du programme est donc '
          this.sup ? texteCorr += `$${a * c}y+${b * c}$.` : texteCorr += `$(${a}y+${b})\\times ${c}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: this.sup ? `$${a * c}y+${b * c}$` : `$(${a}y+${b})\\times ${c}$`,
              statut: true
            },
            {
              texte: `$${a}y+${b * c}$`,
              statut: false
            },
            {
              texte: this.sup ? `$${b * a}y+${c}$` : `$(${c}y + ${b}) \\times ${a}$`,
              statut: false
            },
            {
              texte: `$${b}y+${a * c}$`,
              statut: false
            }
          ]
          break
        case 3: // ax+b-2x
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, 'Enlève le double du nombre de départ'])
          texte += 'Si on note $a$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$a\\xrightarrow{\\times  ${a}} ${a}a\\xrightarrow{+${b}}${a}a+${b} \\xrightarrow{-2a}${a}a+${b}-2a=${a - 2}a+${b}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${a - 2}a+${b}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${a - 2}a+${b}$`,
              statut: true
            },
            {
              texte: this.sup ? `$${a + b - 2}a$` : `$(${a}a + ${b}) \\times 2$`,
              statut: false
            },
            {
              texte: `$${a}a+${b - 2}$`,
              statut: false
            },
            {
              texte: this.sup ? `$${a + b}-2a$` : `$(2a + ${b}) \\times ${a}$`,
              statut: false
            }
          ]
          break
        case 4: // ax+b+3x
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, 'Ajoute le triple du nombre de départ'])
          texte += 'Si on note $t$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$t\\xrightarrow{\\times  ${a}} ${a}t\\xrightarrow{+${b}}${a}t+${b} \\xrightarrow{+3t}${a}t+${b}+3t=${a + 3}t+${b}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${a + 3}t+${b}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${a + 3}t+${b}$`,
              statut: true
            },
            {
              texte: `$${a + b + 3}t$`,
              statut: false
            },
            {
              texte: this.sup ? `$${a + b}t+3t$` : `$(${a}t + ${b}) \\times 3$`,
              statut: false
            },
            {
              texte: this.sup ? `$${a + b}t-3t$` : `$(3t + ${b}) \\times ${a}$`,
              statut: false
            }
          ]
          break
        case 5: // (ax+b)*c-d
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Enlève ${d}`])
          texte += 'Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$x\\xrightarrow{\\times  ${a}} ${a}x\\xrightarrow{+${b}}${a}x+${b} \\xrightarrow{\\times  ${c}}(${a}x+${b})\\times  ${c}`
          if (this.sup) texteCorr += `=${a * c}x+${b * c}`
          texteCorr += `\\xrightarrow{-${d}}`
          this.sup ? texteCorr += `${a * c}x+${b * c - d}` : texteCorr += `(${a}x+${b})\\times  ${c} - ${d}`
          texteCorr += '$<br>'
          texteCorr += 'Le résultat du programme est donc '
          this.sup ? texteCorr += `$${a * c}x+${b * c - d}$.` : texteCorr += `$(${a}x+${b})\\times  ${c} - ${d}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: this.sup ? `$${a * c}x+${b * c - d}$` : `$(${a}x+${b})\\times  ${c} - ${d}$`,
              statut: true
            },
            {
              texte: `$${a}x+${ecritureParentheseSiNegatif(b * c - d)}$`,
              statut: false
            },
            {
              texte: `$${a + b}x+${ecritureParentheseSiNegatif(c - d)}$`,
              statut: false
            },
            {
              texte: this.sup ? `$${a + b * c}x-${d}$` : `$(${a + b}x - ${d}) \\times ${c}$`,
              statut: false
            }
          ]
          break
        case 6: // (ax+b)*c+x
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, 'Ajoute le nombre de départ'])
          texte += 'Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times  ${c}`
          if (this.sup) texteCorr += `=${a * c}y+${b * c}`
          texteCorr += '\\xrightarrow{+y}'
          this.sup ? texteCorr += `${a * c}y+${b * c}+y=${a * c + 1}y+${b * c}` : texteCorr += `(${a}y+${b})\\times  ${c} + y`
          texteCorr += '$<br>'
          texteCorr += 'Le résultat du programme est donc '
          this.sup ? texteCorr += `$${a * c + 1}y+${b * c}$.` : texteCorr += `$(${a}y+${b})\\times  ${c} + y$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: this.sup ? `$${a * c + 1}y+${b * c}$` : `$(${a}y+${b})\\times  ${c} + y$`,
              statut: true
            },
            {
              texte: `$${a + 1}y+${b * c}$`,
              statut: false
            },
            {
              texte: this.sup ? `$${a}y+${c}$` : `$(${a}y+${b})\\times  ${c}$`,
              statut: false
            },
            {
              texte: `$${a + b + c + 1}y$`,
              statut: false
            }
          ]
          break
      }
      if (this.interactif) {
        texte += propositionsQcm(this, i).texte
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        if (context.vue === 'diap') {
          texte = texte.replace(', quel est le résultat du programme de calcul ?', ',<br> quel est le résultat de ce programme ?')
        }
        if (!context.isHtml && i === 0) { texte = '\\setlength\\itemsep{1em}' + texte }; // espacement entre les questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
