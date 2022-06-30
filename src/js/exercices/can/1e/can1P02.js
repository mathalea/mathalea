import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, choice, texNombre, choisitLettresDifferentes } from '../../../modules/outils.js'
import Decimal from 'decimal.js'
import { number } from 'mathjs'
import { Arbre, texProba } from '../../../modules/arbres.js'
import { mathalea2d } from '../../../modules/2d.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import { context } from '../../../modules/context.js'
export const titre = 'Lire une probabilité  à partir d’un arbre'
export const dateDePublication = '30/06/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On donne un arbre de probabilité et on doit calculer une probabilité partielle manquante
 * @author Gilles Mora
 * Référence can2P03
*/
export default function LectureProbabilite () {
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
    for (let i = 0, cpt = 0, pA, pB, pAC, pBC, omega, texte, texteCorr, choix, nom1, nom2, objets, pC; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // On choisit les probas de l'arbre
      nom1 = choisitLettresDifferentes(1)
      nom2 = choisitLettresDifferentes(1, nom1)
      pA = (new Decimal(randint(1, 9) )).div(10)

      pB = new Decimal(1 - pA)
      pAC = (new Decimal(randint(1, 9)*10+randint(1, 9))).div(100)
      pBC = (new Decimal(randint(1, 9)*10+randint(1, 9))).div(100)
      while(pAC===pBC){ pAC = (new Decimal(randint(1, 9)*10+randint(1, 9))).div(100)
        pBC = (new Decimal(randint(1, 9)*10+randint(1, 9))).div(100)}
        choix=choice([pA, pB, pAC, 1-pAC, pBC, 1-pBC])
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
              nom: `${nom1}`,
              proba: pA,
              enfants: [new Arbre(
                {
                  rationnel: false,
                  nom: `${nom2}`,
                  proba: pAC
                }),
              new Arbre(
                {
                  rationnel: false,
                  nom: `\\bar{${nom2}}`,
                  proba: new Decimal(1 - pAC)
                })
              ]
            }),
          new Arbre({
            rationnel: false,
            nom: `\\bar{${nom1}}`,
            proba: new Decimal(1 - pA),
            enfants: [new Arbre({
              rationnel: false,
              nom: `${nom2}`,
              proba: pBC,
            }),
            new Arbre({
              rationnel: false,
              nom: `\\bar{${nom2}}`,
              proba: new Decimal(1 - pBC),
            })
            ]
          })
        ]
      })

      omega.setTailles() // On calcule les tailles des arbres.
      objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
      texte = `On donne l'arbre de probabilités ci dessous :<br>`
      texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)
      texte += `<br>Compléter avec la notation qui convient :  ${(this.interactif || !context.isHtml) ? ajouteChampTexteMathLive(this, i, 'largeur10 inline') : '\\ldots'}`
      texte += `$=${texNombre(choix,2)}$`
      texteCorr = `On peut lire à l'aide de l'arbre :<br>
      `

      setReponse(this, i, 'p_A')
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
