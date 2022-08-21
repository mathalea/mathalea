import Exercice from '../../Exercice.js'
import { mathalea2d } from '../../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, randint, choice, texNombre } from '../../../modules/outils.js'
import Decimal from 'decimal.js/decimal.mjs'
import { Arbre } from '../../../modules/arbres.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
export const titre = 'Calculer la probabilité d’une intersection à partir d’un arbre'
export const dateDePublication = '04/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

*/
export default function CalculerProbabiliteIntersection () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestions = 1
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    for (let i = 0, cpt = 0, reponse1, reponse2, reponse3, reponse4, pA, pBsachantA, pBbarresachantAbarre, pBbarresachantA, pAbarre, pBsachantAbarre, omega, texte, texteCorr, objets; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // On choisit les probas de l'arbre
      pA = (new Decimal(randint(1, 9, 5))).div(10)
      pAbarre = (new Decimal((pA)).mul(-1)).add(1)
      pBsachantA = (new Decimal(randint(1, 9, 5))).div(10)
      pBbarresachantA = (new Decimal((pBsachantA)).mul(-1)).add(1)
      pBsachantAbarre = (new Decimal(randint(1, 9, 5))).div(10)
      pBbarresachantAbarre = new Decimal(pBsachantAbarre).mul(-1).add(1)
      reponse1 = new Decimal((pA)).mul(pBsachantA)
      reponse2 = new Decimal(pA).mul(pBbarresachantA)
      reponse3 = new Decimal(pAbarre).mul(pBsachantAbarre)
      reponse4 = new Decimal(pAbarre).mul(pBbarresachantAbarre)

      switch (choice([1, 2, 3, 4])) { //
        case 1:
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
                  proba: 1,
                  visible: false,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: 1,
                      visible: false,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: new Decimal(1 - pBsachantA)
                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: new Decimal(pBsachantAbarre)
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: new Decimal(1 - pBsachantAbarre)
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(A\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(A\\cap B)$. ' }

          texteCorr = ` $P(A\\cap B)=P(A)\\times P_{A}(B)$.<br>
      $P(A)=1-${texNombre(pAbarre, 1)}= ${texNombre(pA, 1)}$.<br>
      $P_{A}(B)=1-${texNombre(1 - pBsachantA, 1)}= ${texNombre(pBsachantA, 1)}$.<br>
      Ainsi, $P(A\\cap B)=P(A)\\times P_{A}(B)=${texNombre(pA, 1)}\\times ${texNombre(pBsachantA, 1)}=${texNombre(reponse1, 2)}$.
      `
          setReponse(this, i, reponse1)
          break

        case 2:
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
                  proba: 1,
                  visible: false,
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: 1,
                      visible: false
                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: new Decimal(pBsachantAbarre)
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: pBbarresachantAbarre
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(A\\cap \\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(A\\cap \\overline{B})$. ' }

          texteCorr = ` $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})$.<br>
        $P(A)=1-${texNombre(pAbarre, 1)}= ${texNombre(pA, 1)}$.<br>
        $P_{A}(\\overline{B})=1-${texNombre(pBsachantA, 1)}= ${texNombre(1 - pBsachantA, 1)}$.<br>
        Ainsi, $P(A\\cap \\overline{B})=P(A)\\times P_{A}(\\overline{B})=${texNombre(pA, 1)}\\times ${texNombre(1 - pBsachantA, 1)}=${texNombre(reponse2, 2)}$.
        `
          setReponse(this, i, reponse2)
          break

        case 3:
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
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: pBbarresachantA

                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: 1,
                visible: false,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: 1,
                  visible: false
                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: pBbarresachantAbarre
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(\\overline{A}\\cap B)=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(\\overline{A}\\cap B)$. ' }

          texteCorr = ` 
        





        $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)$.<br>
        $P(\\overline{A})=1-${texNombre(pA, 1)}=${texNombre(pAbarre, 1)}$.<br>
        $P_{\\overline{A}}(B)=1-${texNombre(pBbarresachantAbarre, 1)}= ${texNombre(1 - pBbarresachantAbarre, 1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap B)=P(\\overline{A})\\times P_{\\overline{A}}(B)=${texNombre(pAbarre, 1)}\\times ${texNombre(pBsachantAbarre, 1)}=${texNombre(reponse3, 2)}$.
        `
          setReponse(this, i, reponse3)
          break

        case 4:
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
                  alter: '',
                  enfants: [new Arbre(
                    {
                      rationnel: false,
                      nom: 'B',
                      proba: pBsachantA,
                      alter: ''
                    }),
                  new Arbre(
                    {
                      rationnel: false,
                      nom: '\\overline{B}',
                      proba: pBbarresachantA

                    })
                  ]
                }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: 1,
                visible: false,
                enfants: [new Arbre({
                  rationnel: false,
                  nom: 'B',
                  proba: pBsachantAbarre

                }),
                new Arbre({
                  rationnel: false,
                  nom: '\\overline{B}',
                  proba: 1,
                  visible: false
                })
                ]
              })
            ]
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = 'On donne l\'arbre de probabilités ci-dessous :<br>'
          texte += mathalea2d({ xmin: -0.1, xmax: 14, ymin: 0, ymax: 7, style: 'inline' }, ...objets)

          if (this.interactif) {
            texte += '<br> $P(\\overline{A}\\cap \\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, 'inline largeur25 lycee')
          } else { texte += '<br>Calculer $P(\\overline{A}\\cap \\overline{B})$. ' }

          texteCorr = ` 
        





        $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})$.<br>
        $P(\\overline{A})=1-${texNombre(pA, 1)}=${texNombre(pAbarre, 1)}$.<br>
        $P_{\\overline{A}}(\\overline{B})=1-${texNombre(pBsachantAbarre, 1)}= ${texNombre(pBbarresachantAbarre, 1)}$.<br>
        Ainsi, $P(\\overline{A}\\cap \\overline{B})=P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})=${texNombre(pAbarre, 1)}\\times ${texNombre(pBbarresachantAbarre, 1)}=${texNombre(reponse4, 2)}$.
        `
          setReponse(this, i, reponse4)
          break
      }
      if (this.questionJamaisPosee(i, pA, pBsachantA)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

// $P(A)=${texNombre(pA)}$.<br>
//      $P(\\overline{A})=${texNombre(pAbarre)}$.<br>
//    $P_A(B)=${texNombre(pBsachantA)}$.<br>
//  $P_A(\\overline{B})=${texNombre(pBbarresachantA)}$.<br>
// $P_{\\overline{A}}(B)=${texNombre(pBsachantAbarre)}$.<br>
// $P_{\\overline{A}}(\\overline{B})=${texNombre(pBbarresachantAbarre)}$.<br>
