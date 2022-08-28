import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { number, fraction } from 'mathjs'
import { Arbre, texProba } from '../../modules/arbres.js'

export const titre = 'Probabilités simples'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot et Matthieu Devillers
 * Référence
*/
export default function NomQuelconqueDeLaFonctionQuiCreeExercice () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = true
  this.consigne = ''
  this.nbQuestionsModifiable = false
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 1 // Uniquement pour la sortie LaTeX
  // this.sup = 1; // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  const omega = new Arbre({
    racine: true,
    rationnel: this.sup,
    nom: '\\Omega',
    proba: fraction(1),
    enfants: [
      new Arbre(
        {
          rationnel: this.sup,
          nom: 'Pile',
          proba: fraction(0.5),
          enfants: [new Arbre(
            {
              rationnel: this.sup,
              nom: 'B',
              proba: fraction(0.5)
            }),
          new Arbre(
            {
              rationnel: this.sup,
              nom: 'R',
              proba: fraction(1, 3)
            }),
          new Arbre(
            {
              rationnel: this.sup,
              nom: 'V',
              proba: fraction(1, 6)
            })
          ]
        }),
      new Arbre({
        rationnel: this.sup,
        nom: 'Face',
        proba: fraction(0.5),
        enfants: [new Arbre({
          rationnel: this.sup,
          nom: 'B',
          proba: fraction(1, 3)
        }),
        new Arbre({
          rationnel: this.sup,
          nom: 'R',
          proba: fraction(1, 6)
        }),
        new Arbre({
          rationnel: this.sup,
          nom: 'V',
          proba: fraction(0.5)
        })
        ]
      })
    ]
  })
  const omega2 = new Arbre({
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
          proba: 0.2,
          enfants: [new Arbre(
            {
              rationnel: false,
              nom: 'C',
              proba: number(0.6)
            }),
          new Arbre(
            {
              rationnel: false,
              nom: '\\bar C',
              proba: 0.4
            })
          ]
        }),
      new Arbre({
        rationnel: false,
        nom: '\\bar A',
        proba: 0.8,
        enfants: [new Arbre({
          rationnel: false,
          nom: 'C',
          proba: 0.45,
          visible: false,
          alter: 'x'
        }),
        new Arbre({
          rationnel: false,
          nom: '\\bar C',
          proba: 0.55,
          visible: false,
          alter: '1 - x'
        })
        ]
      })
    ]
  })

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let texte = ''
    let texteCorr = ''
    omega.setTailles()
    omega2.setTailles()
    const probaB = omega.getProba('B', true)
    const probaR = omega.getProba('R', true)
    const probaV = omega.getProba('V', true)
    const probaC = omega2.getProba('C', false)
    console.log(`P(B) = ${texProba(probaB, true)}`)
    console.log(`P(R) = ${texProba(probaR, true)}`)
    console.log(`P(V) = ${texProba(probaV, true)}`)
    console.log(`P(C) = ${texProba(probaC, false)}`)
    // eslint-disable-next-line no-template-curly-in-string
    console.log("const probaB = omega.getProba('B', true)\nconst probaR = omega.getProba('R', true)\nconst probaV = omega.getProba('V', true)\nconsole.log(`P(B) = ${texProba(probaB, true)}`)\nconsole.log(`P(R) = ${texProba(probaV, true)}`)\nconsole.log(`P(V) = ${texProba(probaB, true)}`)")

    const objets = omega.represente(0, 15, 0, 3, true, -1)
    texte += mathalea2d({ xmin: -15, xmax: 1, ymin: -2, ymax: 15, style: 'inline' }, ...objets)
    const objets2 = omega2.represente(0, 0, 0, 3, false, 1)
    texte += mathalea2d({ xmin: 0, xmax: 18, ymin: 0, ymax: 17, style: 'inline' }, ...objets2)
    texteCorr += 'et ceci est la correction'

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
}
