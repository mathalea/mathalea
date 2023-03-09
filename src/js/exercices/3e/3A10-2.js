import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListesSansChangerOrdre, nombreAvecEspace, texteEnCouleurEtGras, itemize, modalPdf, modalVideo, cribleEratostheneN, warnMessage } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Justifier si des nombres sont premiers ou pas - Variante avec les critères de divisibilité par 7 et par 11'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * 3A11-1 justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * variante de 3A11 avec les critères par 7 et 11 en plus
 * @author Sébastien Lozano
 */
export const uuid = '526f8'
export const ref = '3A10-2'
export default function PremierOuPasCriterePar7Par11 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = 'Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.'
  context.isHtml ? this.spacing = 1 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 7

  this.nbCols = 2
  this.nbColsCorr = 1
  this.listePackages = 'bclogo'
  this.besoinFormulaireCaseACocher = ['Afficher un coup de pouce']
  this.sup = true
  const prems = cribleEratostheneN(529) // constante contenant tous les nombres premiers jusqu'à 529...

  this.nouvelleVersion = function (numeroExercice) {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(numeroExercice, 'assets/pdf/FicheArithmetique-3A11.pdf', 'Aide mémoire sur les nombres premiers (Sébastien Lozano)', 'Aide mémoire')
      this.boutonAide += modalVideo('conteMathsNombresPremiers', 'https://coopmaths.fr/videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo')
    } else { // sortie LaTeX
    };
    if (this.interactif) {
      this.consigne = 'Les nombres suivants sont-ils premiers ? Penser aux critères de divisibilité.'
    }
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    let typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]
    typesDeQuestionsDisponibles = shuffle(typesDeQuestionsDisponibles) // on mélange l'ordre des questions

    // let typesDeQuestionsDisponibles = [1];
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    let stringRappelB = 'Ces critères de divisibilité pourront être utiles :'
    if (context.isHtml) {
      stringRappelB += '<br>'
      stringRappelB += '- Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l\'est.<br>'
      stringRappelB += '- Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.'
      stringRappelB += '<br> <br>'
    } else {
      stringRappelB += itemize([
        'Un nombre est divisible par 7 si la somme de son nombre de dizaines et de cinq fois son chiffre des unités l\'st.',
        'Un nombre est divisible par 11 si la différence entre la somme de ses chiffres de rangs pairs et la somme de ses chiffres de rangs impairs est nulle ou égale à un multiple de 11.'
      ])
      stringRappelB += '\\par\\vspace{0.5cm}'
    };
    stringRappelB += 'Ainsi que cette liste des nombres premiers inférieurs à 100 : '
    if (context.isHtml) {
      stringRappelB += '<br>'
    } else {
      stringRappelB += '\\par\\vspace{0.25cm}'
    };
    stringRappelB += prems[0]
    for (let k = 1; k < 25; k++) {
      stringRappelB += ', ' + prems[k]
    };
    stringRappelB += '.'

    if (this.sup) this.introduction = warnMessage(stringRappelB, 'nombres', 'Coup de pouce')

    for (let i = 0, texte, texteCorr, N, sum, bonneReponse, evenSum, oddSum, r, r1, r2, tabPremiersATester, prime1, prime2, NLongueur, N1Longueur, N1, sum1, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1: // nombre pair
          N = 2 * randint(51, 499)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme ${nombreAvecEspace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 2: // Multiple de 3
          sum = 0 // pour la valeur de la somme;
          N = 3 * randint(34, 333) // on initialise avant la boucle car on a peut être de la chance
          while ((N % 2 === 0) || (N % 5 === 0)) {
            N = 3 * randint(34, 333)
          };
          texte = nombreAvecEspace(N)
          texteCorr = 'Comme ' + N.toString().charAt(0)
          sum = Number(N.toString().charAt(0))
          for (let k = 1; k < N.toString().length; k++) {
            texteCorr += ' + ' + N.toString().charAt(k)
            sum += Number(N.toString().charAt(k))
          };
          texteCorr += ` = ${sum} est un multiple de 3 donc ${nombreAvecEspace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 3: // Multiple de 5
          N = 5 * randint(20, 200)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme le dernier chiffre de ${nombreAvecEspace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombreAvecEspace(N)} est divisible par 5, `
          texteCorr += 'il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 4: // Multiple de 7
          // NLongueur pour la taille du string N
          // N1 pour la repetiton du critère
          // N1Longueur  pour la taille du string N1
          // sum1 pour la somme de la répétition du critère
          N = 7 * randint(15, 143)
          while ((N % 2 === 0) || (N % 3 === 0) || (N % 5 === 0)) {
            N = 7 * randint(15, 143)
          };
          texte = nombreAvecEspace(N)
          NLongueur = N.toString().length
          texteCorr = ` 7 divise ${nombreAvecEspace(N)}, en effet : `
          texteCorr += '<br>'
          N1 = N
          N1Longueur = NLongueur
          sum1 = Number(N1.toString().substring(0, N1Longueur - 1)) + 5 * Number(N1.toString().charAt(N1Longueur - 1))
          while (sum1 >= 56) {
            texteCorr += `${N1.toString().substring(0, N1Longueur - 1)} + 5$\\times$${N1.toString().charAt(N1Longueur - 1)}`
            texteCorr += ` = ${Number(N1.toString().substring(0, N1Longueur - 1)) + 5 * Number(N1.toString().charAt(N1Longueur - 1))}`
            texteCorr += '<br>'
            N1 = sum1
            N1Longueur = N1.toString().length
            sum1 = Number(N1.toString().substring(0, N1Longueur - 1)) + 5 * Number(N1.toString().charAt(N1Longueur - 1))
          };
          texteCorr += `Comme ${N1.toString().substring(0, N1Longueur - 1)} + 5$\\times$${N1.toString().charAt(N1Longueur - 1)} = ${sum1} est un multiple de 7, alors 7 divise ${N} aussi `
          texteCorr += 'qui admet donc au moins trois diviseurs : 1, 7 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 5: // multiple de 11
          // evenSum  pour la somme des chiffres de rang impair
          // oddSum pour la somme des chiffres de rang pair
          N = 11 * randint(10, 91)
          while ((N % 2 === 0) || (N % 3 === 0) || (N % 5 === 0) || (N % 7 === 0)) {
            N = 11 * randint(10, 91)
          };
          texte = nombreAvecEspace(N)
          texteCorr = `D'une part, la somme des chiffres de rang impair de ${nombreAvecEspace(N)} vaut `
          if (Number(N.toString().length) % 2 === 0) { // si N a un nombre pair de chiffres
            evenSum = Number(N.toString().charAt(1))
            texteCorr += N.toString().charAt(1)
            for (let k = 3; k < N.toString().length; k++) {
              if (k % 2 === 1) {
                texteCorr += ' + ' + N.toString().charAt(k)
                evenSum += Number(N.toString().charAt(k))
              };
            };
            texteCorr += ' = ' + evenSum + '. <br> '
          } else { // sinon N a un nombre impair de chiffres
            evenSum = Number(N.toString().charAt(0))
            texteCorr += N.toString().charAt(0)
            for (let m = 1; m < N.toString().length; m++) {
              if (m % 2 === 0) {
                texteCorr += ' + ' + N.toString().charAt(m)
                evenSum += Number(N.toString().charAt(m))
              };
            };
            texteCorr += ' = ' + evenSum + '. <br> '
          };
          texteCorr += `D'autre part, la somme des chiffres de rang pair de ${nombreAvecEspace(N)} vaut `
          if (Number(N.toString().length) % 2 === 0) { // si N a un nombre pair de chiffres
            oddSum = Number(N.toString().charAt(0))
            texteCorr += N.toString().charAt(0)
            for (let k = 1; k < N.toString().length; k++) {
              if (k % 2 === 0) {
                texteCorr += ' + ' + N.toString().charAt(k)
                oddSum += Number(N.toString().charAt(k))
              };
            };
            texteCorr += ' = ' + oddSum + '. <br> '
          } else { // sinon N a un nombre impair de chiffres
            oddSum = Number(N.toString().charAt(1))
            texteCorr += N.toString().charAt(1)
            for (let m = 3; m < N.toString().length; m++) {
              if (m % 2 === 1) {
                texteCorr += ' + ' + N.toString().charAt(m)
                oddSum += Number(N.toString().charAt(m))
              };
            };
            texteCorr += ' = ' + oddSum + '. <br> '
          };
          texteCorr += 'La différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut '
          if ((oddSum - evenSum) === 0) {
            texteCorr += `${oddSum - evenSum} `
          } else {
            texteCorr += `${Math.abs(oddSum - evenSum)} `
          };
          texteCorr += 'qui est un multiple de 11, <br>'
          texteCorr += ` cela signifie que ${nombreAvecEspace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 6: // produit de deux nombres premiers inférieurs à 100
          // rang du premier facteur premier
          r1 = randint(0, 24)
          // rang du second facteur premier
          r2 = randint(0, 24)
          prime1 = prems[r1] // on tire un nombre premier inférieur à 100, il n'y en a que 25!
          prime2 = prems[r2] // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
          N = prime1 + '$\\times$' + prime2
          texte = N
          texteCorr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `
          if (prime1 === prime2) {
            texteCorr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombreAvecEspace(prime1 * prime2)}, `
          } else {
            texteCorr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même, `
          };
          texteCorr += texteEnCouleurEtGras(`${N} = ` + nombreAvecEspace(prime1 * prime2) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 7: // nombre premier inférieur à 529
          // rang du nombre premier choisi
          r = randint(25, prems.length - 1)
          N = prems[r] // on choisit un nombre premier inférieur à 529
          texte = N + ''
          r = 0
          tabPremiersATester = []
          while (prems[r] ** 2 < N) {
            tabPremiersATester.push(prems[r])
            r++
          }
          texteCorr = `Testons la divisibilité de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est-à-dire par les nombres `
          texteCorr += tabPremiersATester[0]
          for (let k = 1; k < tabPremiersATester.length; k++) {
            texteCorr += ', ' + tabPremiersATester[k]
          };
          texteCorr += '.'
          texteCorr += `<br> Aucun de ces nombres premiers ne divise ${N}, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' est donc un nombre premier.')
          bonneReponse = 'oui'
          break
      }
      if (this.interactif || context.isAmc) {
        this.autoCorrection[i] = {}
        this.autoCorrection[i].options = { ordered: true }
        this.autoCorrection[i].enonce = `${texte}\n`
        this.autoCorrection[i].propositions = [
          {
            texte: 'est premier',
            statut: bonneReponse !== 'non'
          },
          {
            texte: 'n\'est pas premier',
            statut: bonneReponse !== 'oui'
          }
        ]
        if (this.interactif) {
          texte += propositionsQcm(this, i).texte
        }
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
}
