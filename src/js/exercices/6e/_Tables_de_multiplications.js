import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, creerCouples, choice, texNombre, randint } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'

/**
 * Tables de multiplications classiques, à trou ou un mélange des deux.
 *
 * Par défaut ce sont les tables de 2 à 9 mais on peut choisir les tables que l'on veut
 * @author Rémi Angot
 * Référence 6C10-1
 */
export default function TablesDeMultiplications (tablesParDefaut = '2-3-4-5-6-7-8-9') {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = tablesParDefaut
  this.sup2 = 1 // classique|a_trous|melange
  this.titre = 'Tables de multiplications'
  this.consigne = 'Calculer'
  this.spacing = 2
  this.interactif = true
  this.amcType = 4
  this.interactifType = 'numerique'

  this.nouvelleVersion = function () {
    this.sup2 = parseInt(this.sup2)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
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
    const couples = creerCouples(
      tables,
      [2, 3, 4, 5, 6, 7, 8, 9, 10],
      this.nbQuestions
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    let typesDeQuestions = 'a_trous'
    for (let i = 0, a, b, texte, texteCorr; i < this.nbQuestions; i++) {
      a = couples[i][0]
      b = couples[i][1]
      if (this.sup2 === 1) {
        typesDeQuestions = 'classique'
      } else if (this.sup2 === 2) {
        typesDeQuestions = 'a_trous'
      } else {
        typesDeQuestions = choice(['classique', 'a_trous'])
      }
      if (typesDeQuestions === 'classique') {
        // classique
        if (choice([true, false])) {
          texte = `$ ${texNombre(a)} \\times ${texNombre(b)} = \\dotfill$`
          texteCorr = `$ ${texNombre(a)} \\times ${texNombre(b)} = ${texNombre(a * b)}$`
          if (this.interactif) texte = `$ ${texNombre(a)} \\times ${texNombre(b)} = $` + ajouteChampTexte(this, i)
          setReponse(this, i, a * b)
        } else {
          texte = `$ ${texNombre(b)} \\times ${texNombre(a)} = \\dotfill$`
          texteCorr = `$ ${texNombre(b)} \\times ${texNombre(a)} = ${texNombre(a * b)}$`
          if (this.interactif) texte = `$ ${texNombre(b)} \\times ${texNombre(a)} = $` + ajouteChampTexte(this, i)
          setReponse(this, i, a * b)
        }
      } else {
        // a trous
        if (tables.length > 2) {
          // Si pour le premier facteur il y a plus de 2 posibilités on peut le chercher
          if (randint(1, 2) === 1) {
            texte = '$ ' + a + ' \\times \\ldots\\ldots = ' + a * b + ' $'
            if (this.interactif) {
              texte = `$ ${a} \\times $` + ajouteChampTexte(this, i) + `$ = ${a * b} $`
              setReponse(this, i, b)
            }
          } else {
            texte = '$ \\ldots\\ldots' + ' \\times ' + b + ' = ' + a * b + ' $'
            if (this.interactif) {
              texte = ajouteChampTexte(this, i) + `$ \\times ${b}  = ${a * b} $`
              setReponse(this, i, a)
            }
          }
        } else {
          // Sinon on demande forcément le 2e facteur
          texte = '$ ' + a + ' \\times \\ldots\\ldots = ' + a * b + ' $'
          if (this.interactif) texte = ajouteChampTexte(this, i) + `$ \\times ${b}  = ${a * b} $`
          setReponse(this, i, b)
        }
        texteCorr = '$ ' + a + ' \\times ' + b + ' = ' + a * b + ' $'
      }
      if (context.isDiaporama) {
        texte = texte.replace('= \\dotfill', '')
      }
      this.autoCorrection[i].reponse.param = { digits: 2, decimals: 0, signe: false, exposantNbChiffres: 0, exposantSigne: false, approx: 0 }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Choix des tables',
    'Nombres séparés par des tirets'
  ] // Texte, tooltip
  this.besoinFormulaire2Numerique = [
    'Style de questions',
    3,
    '1 : Classique\n2: À trous\n3: Mélangé'
  ]
}
