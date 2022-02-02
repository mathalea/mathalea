import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import { ecritureParentheseSiNegatif, listeQuestionsToContenu, randint, combinaisonListes, itemize } from '../../modules/outils.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Traduire un programme de calcul par une expression littérale'

/**
* Traduire un programme de calcul par une expression littérale de la forme ax+b après simplification
* @author Rémi Angot
* 5L10-2
*/
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
          texteCorr = `$x\\xrightarrow{+${a}} x+${a}\\xrightarrow{\\times  ${b}}(x+${a})\\times  ${b}=${b}x+${a * b}\\xrightarrow{+${c}}${b}x+${a * b + c}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${b}x+${a * b + c}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${b}x+${a * b + c}$`,
              statut: true
            },
            {
              texte: `$${b}x+${a + c}$`,
              statut: false
            },
            {
              texte: `$${b}x+${a * c}$`,
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
          texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times ${c}=${a * c}y+${b * c}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${a * c}y+${b * c}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${a * c}y+${b * c}$`,
              statut: true
            },
            {
              texte: `$${a}y+${b * c}$`,
              statut: false
            },
            {
              texte: `$${b * a}y+${c}$`,
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
              texte: `$${a + b - 2}a$`,
              statut: false
            },
            {
              texte: `$${a}a+${b - 2}$`,
              statut: false
            },
            {
              texte: `$${a + b}-2a$`,
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
              texte: `$${a + b}t+3t$`,
              statut: false
            },
            {
              texte: `$${a + b}t-3t$`,
              statut: false
            }
          ]
          break
        case 5: // (ax+b)*c-d
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, `Enlève ${d}`])
          texte += 'Si on note $x$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$x\\xrightarrow{\\times  ${a}} ${a}x\\xrightarrow{+${b}}${a}x+${b} \\xrightarrow{\\times  ${c}}(${a}x+${b})\\times  ${c}=${a * c}x+${b * c}\\xrightarrow{-${d}}${a * c}x+${b * c - d}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${a * c}x+${b * c - d}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${a * c}x+${b * c - d}$`,
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
              texte: `$${a + b * c}x-${d}$`,
              statut: false
            }
          ]
          break
        case 6: // (ax+b)*c+x
          texte = 'Voici un programme de calcul : \n'
          texte += itemize([`Multiplie par ${a}`, `Ajoute ${b}`, `Multiplie par ${c}`, 'Ajoute le nombre de départ'])
          texte += 'Si on note $y$ le nombre de départ, quel est le résultat du programme de calcul ?'
          texteCorr = `$y\\xrightarrow{\\times  ${a}} ${a}y\\xrightarrow{+${b}}${a}y+${b} \\xrightarrow{\\times  ${c}}(${a}y+${b})\\times  ${c}=${a * c}y+${b * c}\\rightarrow ${a * c}y+${b * c}+y=${a * c + 1}y+${b * c}$`
          texteCorr += '<br>'
          texteCorr += `Le résultat du programme est donc $${a * c + 1}y+${b * c}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${a * c + 1}y+${b * c}$`,
              statut: true
            },
            {
              texte: `$${a + 1}y+${b * c}$`,
              statut: false
            },
            {
              texte: `$${a}y+${c}$`,
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
  // this.besoinFormulaireCaseACocher = true;
}
