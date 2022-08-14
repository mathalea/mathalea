import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListesSansChangerOrdre, nombreAvecEspace, texteEnCouleurEtGras, modalPdf, modalVideo, cribleEratostheneN, warnMessage } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Justifier si des nombres sont premiers ou pas'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * Justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 11, sous forme d'un produit de deux nombres premiers inférieurs à 100
 * et un nombre premier inferieur à 529
 * dans cet exo on n'utilise pas les critères par 7 et 11
 * @author Sébastien Lozano + Jean-Claude Lhote pour l'interactivité.
 * Référence 3A10-1
 */
export default function PremierOuPas () {
  Exercice.call(this) // Héritage de la classe Exercice()
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = 'Justifier que les nombres suivants sont premiers ou pas. Penser aux critères de divisibilité.'
  context.isHtml ? this.spacing = 1 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1

  // this.correctionDetailleeDisponible = true;
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 1
  this.sup2 = false // Par défaut on n'affiche pas la liste des nombres premiers
  this.nbQuestionsModifiable = false
  this.listePackages = 'bclogo'
  const prems = cribleEratostheneN(529) // constante contenant tous les nombres premiers jusqu'à 529...

  this.nouvelleVersion = function () {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(this.numeroExercice, 'assets/pdf/FicheArithmetique-3A11.pdf', 'Aide mémoire sur les nombres premiers (Sébastien Lozano)', 'Aide mémoire')
      this.boutonAide += modalVideo('conteMathsNombresPremiers', 'https://coopmaths.fr/videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo')
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    let typesDeQuestionsDisponibles // = [1, 2, 3, 6, 7];
    if (Number(this.sup) === 1) {
      this.nbQuestions = 4
      typesDeQuestionsDisponibles = [1, 2, 3, 8]
    } else {
      this.nbQuestions = 5
      typesDeQuestionsDisponibles = [1, 2, 3, 6, 7]
    }
    typesDeQuestionsDisponibles = shuffle(typesDeQuestionsDisponibles) // on mélange l'ordre des questions

    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    let stringRappel = 'Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>' + prems[0]
    for (let k = 1; k < 25; k++) {
      stringRappel += ', ' + prems[k]
    };
    stringRappel += '.'

    for (let i = 0, texte, texteCorr, r1, r2, prime1, prime2, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      let N // le nombre de la question
      let r
      let tabPremiersATester
      let sum

      let Nlongueur // pour la taille du string N
      let N1 // pour la repetiton du critère
      let N1longueur // pour la taille du string N1
      let sum1 // pour la somme de la répétition du critère

      let evenSum // pour la somme des chiffres de rang impair
      let oddSum // pour la somme des chiffres de rang pair
      let bonneReponse
      if (this.sup2) {
        this.introduction = warnMessage(stringRappel, 'nombres', 'Coup de pouce')
      } else this.introduction = ''
      switch (typesDeQuestions) {
        case 1: // nombre pair
          N = 2 * randint(51, 4999)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme ${nombreAvecEspace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 2: // Multiple de 3
          sum = 0 // pour la valeur de la somme;
          N = 3 * randint(34, 3333) // on initialise avant la boucle car on a peut être de la chance
          while ((N % 2 === 0) || (N % 5 === 0)) {
            N = 3 * randint(34, 3333)
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
          N = 5 * randint(20, 1999)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme le dernier chiffre de ${nombreAvecEspace(N)} est un ${N.toString().charAt(N.toString().length - 1)}, alors ${nombreAvecEspace(N)} est divisible par 5, `
          texteCorr += 'il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 4: // Multiple de 7
          N = 7 * randint(15, 1428)
          texte = nombreAvecEspace(N)
          Nlongueur = N.toString().length
          texteCorr = ` 7 divise ${nombreAvecEspace(N)}, en effet : `
          texteCorr += '<br>'
          N1 = N
          N1longueur = Nlongueur
          sum1 = Number(N1.toString().substring(0, N1longueur - 1)) + 5 * Number(N1.toString().charAt(N1longueur - 1))
          while (sum1 >= 56) {
            texteCorr += `${N1.toString().substring(0, N1longueur - 1)} + 5$\\times$${N1.toString().charAt(N1longueur - 1)}`
            texteCorr += ` = ${Number(N1.toString().substring(0, N1longueur - 1)) + 5 * Number(N1.toString().charAt(N1longueur - 1))}`
            texteCorr += '<br>'
            N1 = sum1
            N1longueur = N1.toString().length
            sum1 = Number(N1.toString().substring(0, N1longueur - 1)) + 5 * Number(N1.toString().charAt(N1longueur - 1))
          };
          texteCorr += `Comme ${N1.toString().substring(0, N1longueur - 1)} + 5$\\times$${N1.toString().charAt(N1longueur - 1)} = ${sum1} est un multiple de 7 alors 7 divise ${N} aussi `
          texteCorr += 'qui admet donc au moins trois diviseurs : 1, 7 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 5: // multiple de 11
          N = 11 * randint(10, 909)
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
            texteCorr += ' = ' + evenSum + ' <br> '
          } else { // sinon N a un nombre impair de chiffres
            evenSum = Number(N.toString().charAt(0))
            texteCorr += N.toString().charAt(0)
            for (let m = 1; m < N.toString().length; m++) {
              if (m % 2 === 0) {
                texteCorr += ' + ' + N.toString().charAt(m)
                evenSum += Number(N.toString().charAt(m))
              };
            };
            texteCorr += ' = ' + evenSum + '<br> '
          };
          texteCorr += `d'autre part, la somme des chiffres de rang pair de ${nombreAvecEspace(N)} vaut `
          if (Number(N.toString().length) % 2 === 0) { // si N a un nombre pair de chiffres
            oddSum = Number(N.toString().charAt(0))
            texteCorr += N.toString().charAt(0)
            for (let k = 1; k < N.toString().length; k++) {
              if (k % 2 === 0) {
                texteCorr += ' + ' + N.toString().charAt(k)
                oddSum += Number(N.toString().charAt(k))
              };
            };
            texteCorr += ' = ' + oddSum + ' <br> '
          } else { // sinon N a un nombre impair de chiffres
            oddSum = Number(N.toString().charAt(1))
            texteCorr += N.toString().charAt(1)
            for (let m = 3; m < N.toString().length; m++) {
              if (m % 2 === 1) {
                texteCorr += ' + ' + N.toString().charAt(m)
                oddSum += Number(N.toString().charAt(m))
              };
            };
            texteCorr += ' = ' + oddSum + '<br> '
          };
          texteCorr += 'la différence entre la somme des chiffres de rangs pairs et celle des chiffres de rangs impairs vaut '
          if ((oddSum - evenSum) === 0) {
            texteCorr += `${oddSum - evenSum}, `
          } else {
            texteCorr += `${Math.abs(oddSum - evenSum)} qui est un multiple de 11, `
          };
          texteCorr += '<br>'
          texteCorr += ` cela signifie que ${nombreAvecEspace(N)} est divisible par 11, il admet donc au moins trois diviseurs qui sont 1, 11 et lui-même,`
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
            texteCorr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombreAvecEspace(prime1 * prime2)}, `
          };
          texteCorr += texteEnCouleurEtGras(`${N} = ` + nombreAvecEspace(prime1 * prime2) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 7: // nombre premier inférieur à 529, si le nombre premier dépasse 100 on affiche le coup de pouce
          // rang du nombre premier choisi
          r = randint(0, prems.length - 1)
          N = prems[r] // on choisit un nombre premier inférieur à 529
          if (N > 100) {
            this.sup2 = true
          } else {
            this.sup2 = false
          }
          texte = N + ''
          r = 0
          tabPremiersATester = []
          while (prems[r] ** 2 < N) {
            tabPremiersATester.push(prems[r])
            r++
          }
          texteCorr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est-à-dire par `
          if (N === 2 || N === 3) {
            texteCorr += 'aucun nombre dans le cas présent, le reste n\'est jamais nul !'
          } else {
            texteCorr += 'les nombres '
            texteCorr += tabPremiersATester[0]
            for (let k = 1; k < tabPremiersATester.length; k++) {
              texteCorr += ', ' + tabPremiersATester[k]
            };
            texteCorr += ', le reste n\'est jamais nul.'
          }
          texteCorr += '<br>' + texteEnCouleurEtGras(nombreAvecEspace(N) + ' est donc un nombre premier.')

          bonneReponse = 'oui'
          break
        case 8: // nombre premier inférieur à 100 pour permettre les tests de divisibilité sans calculatrice
          // rang du nombre premier choisi
          r = randint(0, 24)
          N = prems[r] // on choisit un nombre premier inférieur à 100
          texte = N + ''
          r = 0
          tabPremiersATester = []
          while (prems[r] ** 2 < N) {
            tabPremiersATester.push(prems[r])
            r++
          }
          texteCorr = `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $\\sqrt{${N}}$, c'est-à-dire par `
          if (N === 2 || N === 3) {
            texteCorr += 'aucun nombre dans le cas présent, le reste n\'est jamais nul !'
          } else {
            texteCorr += 'les nombres '
            texteCorr += tabPremiersATester[0]
            for (let k = 1; k < tabPremiersATester.length; k++) {
              texteCorr += ', ' + tabPremiersATester[k]
            };
            texteCorr += ', le reste n\'est jamais nul.'
          }
          texteCorr += '<br>' + texteEnCouleurEtGras(nombreAvecEspace(N) + ' est donc un nombre premier.')
          bonneReponse = 'oui'
          break
      };
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 2, '1 : Sans Calculatrice\n2 : Avec calculatrice']
  this.besoinFormulaire2CaseACocher = ['Afficher la liste des nombres premiers inférieurs à 100']
}
