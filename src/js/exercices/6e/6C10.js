import Operation from '../../modules/operations.js'
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, texNombre, calcul, nombreDeChiffresDe, contraindreValeur, compteOccurences, combinaisonListes, rangeMinMax } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'

export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Poser additions, soustractions et multiplications de nombres entiers'

/**
 * Additions, soustractions et multiplications posées de nombres entiers
 *
 * * abcd +efg
 * * abc0-efg
 * * 1abc-def
 * * abc*d0e tables de 2 à 5
 * * abc*de tables de 5 à 9
 * @author Rémi Angot
 * Support des opérations posées en html par Jean-Claude Lhote.
 * Référence 6C10
 */
export default function AdditionsSoustractionsMultiplicationsPosees () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Poser et effectuer les calculs suivants.'
  this.spacing = 2
  context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon les opérations posées ne sont pas jolies
  this.nbQuestions = 5
  this.listePackages = 'xlop'
  this.tailleDiaporama = 3

  this.besoinFormulaireTexte = ['Types de calculs', 'Nombres séparés par des tirets\n1 : abcde + fgh\n2 : abc0 - efg\n3 : 1abc - def\n4 : abc * d0e (tables de 2 à 5)\n5 : abc * de (tables de 5 à 9)\n6 : Mélange']
  this.sup = '6'

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestions, reponse
    let typesDequestionsDisponibles = [1, 2, 3, 4, 5] // Paramétrage par défaut
    const valMaxParametre = 6
    if (this.sup) { // Si une liste est saisie
      if (this.sup.toString().indexOf('-') === -1) { // S'il n'y a pas de tiret ...
        typesDequestionsDisponibles = [contraindreValeur(1, valMaxParametre, parseInt(this.sup), 1)] // ... on crée un tableau avec une seule valeur
      } else {
        typesDequestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typesDequestionsDisponibles.length; i++) { // on parcourt notre tableau de strings : ['1', '1', '2'] ...
          typesDequestionsDisponibles[i] = contraindreValeur(1, valMaxParametre, parseInt(typesDequestionsDisponibles[i]), 1) // ... pour en faire un tableau d'entiers : [1, 1, 2]
        }
      }
    }
    // Attention ! Si la valeur max du paramètre n'est pas une option de type "mélange", supprimer la ligne ci-dessous !
    if (compteOccurences(typesDequestionsDisponibles, valMaxParametre) > 0) typesDequestionsDisponibles = rangeMinMax(1, valMaxParametre - 1) // Si l'utilisateur a choisi l'option "mélange", on fait une liste avec un de chaque

    let listeTypeDeQuestions = combinaisonListes(typesDequestionsDisponibles, this.nbQuestions)
    if (Number(this.sup) === 6) {
      if (Number(this.nbQuestions) === 3) {
        listeTypeDeQuestions = [1, 2, 5]
      }
      if (Number(this.nbQuestions) === 4) {
        listeTypeDeQuestions = [1, 2, 4, 5]
      }
      if (Number(this.nbQuestions) === 5) {
        listeTypeDeQuestions = [1, 2, 3, 4, 5]
      }
    }
    for (let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, e, f, g, x, y; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      this.autoCorrection[i] = {}
      switch (typesDeQuestions) {
        case 1: // abcde + fgh
          a =
            randint(1, 9) * 10000 +
            randint(5, 9) * 1000 +
            randint(5, 9) * 100 +
            randint(7, 9) * 10 +
            randint(1, 9)
          b = randint(5, 9) * 100 + randint(7, 9) * 10 + randint(1, 9)
          texte = `$${texNombre(a)}+${b}`
          if (this.interactif && !context.isAmc) texte += '=$' + ajouteChampTexteMathLive(this, i, 'inline') // fonction à utiliser pour la version en ligne afin d'ajouter le formulaire de réponse
          else texte += '$'
          reponse = calcul(a + b)
          texteCorr = Operation({ operande1: a, operande2: b, type: 'addition' })
          break
        case 2: // abc0 - efg
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          e = randint(b, 9)
          f = randint(c, 9)
          g = randint(2, 9)
          x = a * 1000 + b * 100 + c * 10
          y = e * 100 + f * 10 + g
          texte = `$${texNombre(x)}-${y}`
          if (this.interactif && !context.isAmc) texte += '=$' + ajouteChampTexteMathLive(this, i, 'inline') // fonction à utiliser pour la version en ligne afin d'ajouter le formulaire de réponse
          else texte += '$'
          reponse = calcul(x - y)
          texteCorr = Operation({ operande1: x, operande2: y, type: 'soustraction' })
          break
        case 3: // 1abc - def
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          d = randint(a, 9)
          e = randint(1, 9)
          f = randint(c, 9)
          x = 1000 + a * 100 + b * 10 + c
          y = d * 100 + e * 10 + f
          texte = `$${texNombre(x)}-${y}`
          if (this.interactif && !context.isAmc) texte += '=$' + ajouteChampTexteMathLive(this, i, 'inline') // fonction à utiliser pour la version en ligne afin d'ajouter le formulaire de réponse
          else texte += '$'
          reponse = calcul(x - y)
          texteCorr = Operation({ operande1: x, operande2: y, type: 'soustraction' })
          break
        case 4: // abc * d0e tables de 2 à 5
          a = randint(2, 5)
          b = randint(2, 5)
          c = randint(2, 5)
          d = randint(2, 5)
          e = randint(2, 5)
          x = 100 * a + 10 * b + c
          y = d * 100 + e
          texte = `$${texNombre(x)}\\times${y}`
          if (this.interactif && !context.isAmc) texte += '=$' + ajouteChampTexteMathLive(this, i, 'inline') // fonction à utiliser pour la version en ligne afin d'ajouter le formulaire de réponse
          else texte += '$'
          reponse = calcul(x * y)
          texteCorr = Operation({ operande1: x, operande2: y, type: 'multiplication' })
          break
        case 5: // abc * de tables de 5 à 9
          a = randint(5, 9)
          b = randint(5, 9)
          c = randint(5, 9)
          d = randint(5, 9)
          e = randint(5, 9)
          x = 100 * a + 10 * b + c
          y = 10 * d + e
          texte = `$${x}\\times${y}`
          if (this.interactif && !context.isAmc) texte += '=$' + ajouteChampTexteMathLive(this, i, 'inline') // fonction à utiliser pour la version en ligne afin d'ajouter le formulaire de réponse
          else texte += '$'
          reponse = calcul(x * y)
          texteCorr = Operation({ operande1: x, operande2: y, type: 'multiplication' })
          break
      }

      if (this.questionJamaisPosee(i, a, b, c, d, e, f, g)) {
        // Si la question n'a jamais été posée, on l'enregistre
        this.listeQuestions.push(texte)
        if (!context.isHtml && i === 0) {
          texteCorr = '\\setlength\\itemsep{2em}' + texteCorr
        } // espacement entre les questions
        this.listeCorrections.push(texteCorr)
        if (!context.isAmc) {
          setReponse(this, i, reponse, { digits: 0 }) // fonction qui va renseigner this.autocorrection[i]
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCOpen',
                propositions: [{
                  texte: texteCorr,
                  statut: 3
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'Résultat',
                    valeur: [reponse],
                    param: {
                      digits: nombreDeChiffresDe(reponse),
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
