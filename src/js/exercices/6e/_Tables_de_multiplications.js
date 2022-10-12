import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, creerCouples } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
import { texNombre } from '../../modules/outils/texNombres.js'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Tables de multiplication classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot (ES6: Loïc Geeraerts)
 * Référence 6C10-1
 */
export default function TablesDeMultiplications (tablesParDefaut = '2-3-4-5-6-7-8-9') {
  // Multiplier deux nombres
  Exercice.call(this)
  this.sup = tablesParDefaut
  this.sup2 = 1 // classique|a_trous|melange
  this.titre = 'Tables de multiplication'
  this.consigne = 'Calculer : '
  this.spacing = 2

  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
  this.besoinFormulaire2Numerique = [
    'Type de questions',
    3,
    '1 : Classique\n2 : À trous\n3 : Mélange'
  ]

  this.nouvelleVersion = function () {
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    if (!this.sup) {
    // Si aucune table n'est saisie
      this.sup = '2-3-4-5-6-7-8-9'
    }
    let tables = []
    if (typeof this.sup === 'number') {
    // Si c'est un nombre c'est qu'il y a qu'une seule table
      tables[0] = this.sup
    } else {
      tables = this.sup.split('-') // Sinon on crée un tableau à partir des valeurs séparées par des -
    }
    for (let i = 0; i < tables.length; i++) {
      tables[i] = parseInt(tables[i])
    }
    const couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    let typesDeQuestions = 'a_trous'
    for (let i = 0, a, b, texte, texteCorr; i < this.nbQuestions; i++) {
      a = couples[i][0]
      b = couples[i][1]
      if (parseInt(this.sup2) === 1) {
        typesDeQuestions = 'classique'
      } else if (parseInt(this.sup2) === 2) {
        typesDeQuestions = 'a_trous'
      } else {
        typesDeQuestions = choice(['classique', 'a_trous'])
      }
      if (typesDeQuestions === 'classique') {
      // classique
        if (choice([true, false])) {
          texte = `$ ${texNombre(a)} \\times ${texNombre(b)} = `
          texte += (this.interactif && context.isHtml) ? '$' + ajouteChampTexte(this, i, { numeric: true }) : '$'
          texteCorr = `$ ${texNombre(a)} \\times ${texNombre(b)} = ${texNombre(a * b)}$`
        } else {
          texte = `$ ${texNombre(b)} \\times ${texNombre(a)} = `
          texte += (this.interactif && context.isHtml) ? '$' + ajouteChampTexte(this, i, { numeric: true }) : '$'
          texteCorr = `$ ${texNombre(b)} \\times ${texNombre(a)} = ${texNombre(a * b)}$`
        }
        setReponse(this, i, a * b)
      } else {
      // a trous
        if (tables.length > 2) {
        // Si pour le premier facteur il y a plus de 2 posibilités on peut le chercher
          if (randint(1, 2) === 1) {
            texte = '$ ' + a + ' \\times '
            texte += (this.interactif && context.isHtml) ? '$' + ajouteChampTexte(this, i, { numeric: true, texteApres: `$ = ${a * b} $` }) : `   \\ldots\\ldots = ${a * b}$`
            setReponse(this, i, b)
          } else {
            texte = (this.interactif && context.isHtml) ? ajouteChampTexte(this, i, { numeric: true, texteApres: `$\\times ${b} = ${a * b}$` }) : `$ \\ldots\\ldots \\times ${b} = ${a * b}$`
            setReponse(this, i, a)
          }
        } else {
        // Sinon on demande forcément le 2e facteur
          texte = `$${a} \\times `
          texte += (this.interactif && context.isHtml) ? '$' + ajouteChampTexte(this, i, { numeric: true, texteApres: ` = ${a * b}` }) + '$' : `\\ldots\\ldots = ${a * b}$`
          setReponse(this, i, b)
        }
        texteCorr = `$${a} \\times ${b} = ${a * b}$`
      }
      if (context.isAmc) {
        this.autoCorrection[i].reponse.param = { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
}
