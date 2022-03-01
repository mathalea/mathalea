import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint } from '../../../modules/outils.js'
import { number } from 'mathjs'
import { Arbre, texProba } from '../../../modules/arbres.js'
import { mathalea2d } from '../../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { context } from '../../../modules/context.js'
export const titre = 'Calculer des probabilités à partir d’un arbre'
export const dateDePublication = '25/12/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On donne un arbre de probabilité et on doit calculer une probabilité partielle manquante
 * @author Jean-Claude Lhote
 * Référence can2P03
*/
export default function CalculProbaArbre2e () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, pA, pB, pAC, pBC, omega, texte, texteCorr, objets, pC; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // On choisit les probas de l'arbre
      pA = number(randint(2, 8) / 10)
      pB = number(1 - pA)
      pAC = number(randint(2, 8) / 10)
      pBC = number(randint(2, 8) / 10)
      // On définit l'arbre complet
      omega = new Arbre({
        racine: true,
        rationnel: false,
        nom: '',
        proba: 1,
        visible: false,
        alter: '',
        enfants: [
          new Arbre(
            {
              rationnel: false,
              nom: 'A',
              proba: pA,
              enfants: [new Arbre(
                {
                  rationnel: false,
                  nom: 'C',
                  proba: pAC
                }),
              new Arbre(
                {
                  rationnel: false,
                  nom: '\\bar C',
                  proba: number(1 - pAC)
                })
              ]
            }),
          new Arbre({
            rationnel: false,
            nom: '\\bar A',
            proba: number(1 - pA),
            enfants: [new Arbre({
              rationnel: false,
              nom: 'C',
              proba: pBC,
              visible: false,
              alter: 'x'
            }),
            new Arbre({
              rationnel: false,
              nom: '\\bar C',
              proba: number(1 - pBC),
              visible: false,
              alter: ''
            })
            ]
          })
        ]
      })

      omega.setTailles() // On calcule les tailles des arbres.
      objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
      pC = omega.getProba('C', false) // on calcule P(C) décimale.
      texte = `On donne l'arbre de probabilités ci dessous et $P(C)=${texProba(pC)}$.<br>$\\phantom{1. On donne ceci}$`
      texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)
      texte += `<br>$\\phantom{1. On donne ceci}x=$ ${(this.interactif || !context.isHtml) ? ajouteChampTexteMathLive(this, i, 'largeur10 inline') : '\\ldots'}`
      texteCorr = 'Comme $A$ et $\\bar A$ forment une partition de l\'univers, d\'après la loi des probabilités totales :<br>'
      texteCorr += '$P(C)=P(A \\cap C)+P(\\bar{A} \\cap C)$.<br>'
      texteCorr += `Or $P(\\bar{A} \\cap C)=P(\\bar{A}) \\times P_{\\bar{A}}(C)=${texProba(pB, false)}x$.<br>`
      texteCorr += `Donc $${texProba(pB, false)}x=P(C)-P(A \\cap C)=${texProba(pC, false)}-${texProba(pA, false)}\\times ${texProba(pAC, false)}=${texProba(pC, false)}-${texProba(pA * pAC, false)}=${texProba(pC - pA * pAC, false)}$.<br>`
      texteCorr += `Donc $x=\\dfrac{${texProba(pC - pA * pAC, false)}}{${texProba(pB, false)}}=${texProba(pBC)}$`
      setReponse(this, i, pBC)
      if (this.questionJamaisPosee(i, pA, pAC, pBC)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
