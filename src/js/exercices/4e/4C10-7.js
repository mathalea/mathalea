import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, calcul, ecritureParentheseSiNegatif, contraindreValeur, range1, ecritureNombreRelatif, ecritureAlgebrique, nombreDeChiffresDansLaPartieEntiere, ecritureNombreRelatifc } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Opérations avec deux entiers relatifs'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
* Effectuer des opérations avec 2 nombres relatifs
*
* * On peut choisir les 4 opérations
* @author Mickael Guironnet - Rémi Angot
* 4C10-7
*/
export const uuid = '0b020'
export const ref = '4C10-7'
export default function ExerciceOperationsRelatifs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = false // écriture simplifiée
  this.sup2 = 2 // type d'opértions
  this.sup3 = 10 // Valeur maximum
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.titre = titre
  this.consigne = 'Calculer :'
  this.spacing = 2
  this.nbQuestions = 10

  this.nouvelleVersion = function () {
    this.sup3 = parseInt(this.sup3)
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const listeTypeDeSignes = combinaisonListes(['-+', '+-', '--', '-+', '+-', '--', '++'], this.nbQuestions)

    let typesDeQuestionsDisponibles = []
    if (!this.sup2 || parseInt(this.sup2) === 5) { // Si aucune liste n'est saisie ou mélange demandé
      typesDeQuestionsDisponibles = range1(4)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typesDeQuestionsDisponibles[0] = contraindreValeur(1, 4, this.sup2, 2)
      } else {
        typesDeQuestionsDisponibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typesDeQuestionsDisponibles[i] = contraindreValeur(1, 4, parseInt(typesDeQuestionsDisponibles[i]), 2) // parseInt en fait un tableau d'entiers
        }
      }
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, a, b, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
      switch (listeTypeDeQuestions[i]) {
        case 2:
          b = randint(2, 9)
          a = b * randint(2, this.sup3)
          break
        case 1:
        case 3:
        case 4:
          b = randint(2, this.sup3)
          a = randint(2, this.sup3)
          break
      }
      switch (listeTypeDeSignes[i]) {
        case '-+':
          a *= -1
          break
        case '+-':
          b *= -1
          break
        case '--':
          a *= -1
          b *= -1
          break
      }
      switch (listeTypeDeQuestions[i]) {
        case 1: // multiplications
          if (this.sup) {
            texte = `$ ${a}  \\times ${ecritureParentheseSiNegatif(b)} =$`
            texteCorr = `$ ${a}  \\times ${ecritureParentheseSiNegatif(b)} = ${calcul(a * b)} $`
          } else {
            texte = `$ ${ecritureNombreRelatif(a)}  \\times ${ecritureNombreRelatif(b)} =$`
            texteCorr = `$ ${ecritureNombreRelatifc(a)} \\times ${ecritureNombreRelatifc(b)}  = ${ecritureNombreRelatifc(a * b)} $`
          }
          setReponse(this, i, a * b)
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 2: // quotients
          if (this.sup) {
            texte = `$ ${a} \\div ${ecritureParentheseSiNegatif(b)} =$`
            texteCorr = `$ ${a} \\div ${ecritureParentheseSiNegatif(b)} = ${calcul(a / b)}$`
          } else {
            texte = `$ ${ecritureNombreRelatif(a)}  \\div ${ecritureNombreRelatif(b)} =$`
            texteCorr = `$ ${ecritureNombreRelatifc(a)}  \\div ${ecritureNombreRelatifc(b)} =${ecritureNombreRelatifc(a / b)}$`
          }
          setReponse(this, i, calcul(a / b))
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 3: // additions
          if (this.sup) {
            texte = `$ ${a} + ${ecritureParentheseSiNegatif(b)}  =$`
            texteCorr = `$ ${a} + ${ecritureParentheseSiNegatif(b)}  = ${ecritureNombreRelatif(a + b)} $`
          } else {
            texte = `$ ${ecritureNombreRelatif(a)} + ${ecritureNombreRelatif(b)}  =$`
            texteCorr = `$  ${ecritureNombreRelatifc(a)} + ${ecritureNombreRelatifc(b)} = ${ecritureNombreRelatifc(a + b)} $`
          }
          setReponse(this, i, a + b)
          texte += ajouteChampTexteMathLive(this, i)
          break
        case 4: // soustractions
          if (this.sup) {
            texte = `$ ${a} - ${ecritureNombreRelatif(b)} =$`
            texteCorr = `$ ${a} - ${ecritureNombreRelatif(b)} = ${a - b} $`
          } else {
            texte = `$ ${ecritureNombreRelatif(a)} - ${ecritureNombreRelatif(b)}  =$`
            texteCorr = `$  ${ecritureNombreRelatifc(a)} - ${ecritureNombreRelatifc(b)} = ${ecritureNombreRelatifc(a - b)} $`
          }
          setReponse(this, i, [a - b, `(${ecritureAlgebrique(a - b)})`], { signe: true, digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(a - b)), decimals: 0 })
          texte += ajouteChampTexteMathLive(this, i)
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Avec des écritures simplifiées']
  this.besoinFormulaire2Texte = [
    'Type de question', [
      '1 : multiplication',
      '2 : division',
      '3 : addition',
      '4 : soustraction',
      '5 : Mélange'
    ].join('\n')
  ]
  this.besoinFormulaire3Numerique = ['Valeur maximale', 99999]
}
