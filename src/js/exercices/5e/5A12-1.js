import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListesSansChangerOrdre, nombreAvecEspace, texteEnCouleurEtGras, modalPdf, modalVideo, cribleEratostheneN, warnMessage } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'

export const titre = 'Primalité ou pas'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * Justifier la non primalité réinvestissement des critères de divisibilité
 * Nombres à 3 ou 4 chiffres, un multiple de 2, de 3, de 5, de 7, de 9, de 10, sous forme d'un produit de deux nombres premiers inférieurs à 30
 * et un nombre premier inferieur à 529
 * 5A12-1
 * @author Sébastien Lozano
 */
export default function PremierOuPas5e () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = 'Justifier que les nombres suivants sont premiers ou pas.'
  // this.consigne += `<br>`;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 7
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 2
  this.nbColsCorr = 1
  this.sup = 1
  this.listePackages = 'bclogo'

  this.nouvelleVersion = function (numeroExercice) {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(numeroExercice, 'assets/pdf/FicheArithmetique-5A11.pdf', 'Aide mémoire sur les nombres premiers (Sébastien Lozano)', 'Aide mémoire')
      this.boutonAide += modalVideo('conteMathsNombresPremiers', 'https://coopmaths.fr/videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo')
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    let typesDeQuestionsDisponibles = [1, 2, 3, 4, 5, 6, 7]
    typesDeQuestionsDisponibles = shuffle(typesDeQuestionsDisponibles) // on mélange l'ordre des questions

    // let typesDeQuestionsDisponibles = [1];
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    let stringRappel = 'Cette liste des nombres premiers inférieurs à 30 pourra être utile : <br>' + cribleEratostheneN(100)[0]
    for (let k = 1; k < cribleEratostheneN(30).length; k++) {
      stringRappel += ', ' + cribleEratostheneN(30)[k]
    };
    stringRappel += '.'
    this.introduction = warnMessage(stringRappel, 'nombres', 'Coup de pouce')

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      let N // le nombre de la question
      let bonneReponse
      switch (typesDeQuestions) {
        case 1: // nombre pair
          N = 2 * randint(51, 4999)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme ${nombreAvecEspace(N)} est pair, il admet donc au moins trois diviseurs qui sont 1, 2 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 2: { // Multiple de 3
          let sum3 = 0 // pour la valeur de la somme;
          N = 3 * randint(34, 3333) // on initialise avant la boucle car on a peut être de la chance
          while ((N % 2 === 0) || (N % 5 === 0)) {
            N = 3 * randint(34, 3333)
          };
          texte = nombreAvecEspace(N)
          texteCorr = 'Comme ' + N.toString().charAt(0)
          sum3 = Number(N.toString().charAt(0))
          for (let k = 1; k < N.toString().length; k++) {
            texteCorr += ' + ' + N.toString().charAt(k)
            sum3 += Number(N.toString().charAt(k))
          };
          texteCorr += ` = ${sum3} est un multiple de 3 donc ${nombreAvecEspace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 3 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        }
        case 3: // Multiple de 5
          N = 5 * randint(20, 1999)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme le dernier chiffre de ${nombreAvecEspace(N)} est un ${N.toString().charAt(N.toString().length - 1)} alors ${nombreAvecEspace(N)} est divisible par 5, `
          texteCorr += 'il admet donc au moins trois diviseurs qui sont 1, 5 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 4: { // Multiple de 9
          let sum9 = 0 // pour la valeur de la somme;
          N = 9 * randint(12, 1111) // on initialise avant la boucle car on a peut être de la chance
          while ((N % 2 === 0) || (N % 5 === 0)) {
            N = 9 * randint(34, 3333)
          };
          texte = nombreAvecEspace(N)
          texteCorr = 'Comme ' + N.toString().charAt(0)
          sum9 = Number(N.toString().charAt(0))
          for (let k = 1; k < N.toString().length; k++) {
            texteCorr += ' + ' + N.toString().charAt(k)
            sum9 += Number(N.toString().charAt(k))
          };
          texteCorr += ` = ${sum9} est un multiple de 9 donc ${nombreAvecEspace(N)} aussi, il admet donc au moins trois diviseurs qui sont 1, 9 et lui-même, `
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        }
        case 5: // multiple de 10
          N = 10 * randint(10, 999)
          texte = nombreAvecEspace(N)
          texteCorr = `Comme le nombre ${nombreAvecEspace(N)} se termine par un ${N.toString().charAt(N.toString().length - 1)} alors ${nombreAvecEspace(N)} est un multiple de 10, `
          texteCorr += 'il admet donc au moins trois diviseurs qui sont 1, 10 et lui-même, '
          texteCorr += texteEnCouleurEtGras(nombreAvecEspace(N) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        case 6: { // produit de deux nombres premiers inférieurs à 30
          // rang du premier facteur premier
          const r1 = randint(0, cribleEratostheneN(30).length - 1)
          // rang du second facteur premier
          const r2 = randint(0, cribleEratostheneN(30).length - 1)
          const prime1 = cribleEratostheneN(100)[r1] // on tire un nombre premier inférieur à 100, il n'y en a que 25!
          const prime2 = cribleEratostheneN(100)[r2] // on tire un autre nombre premier inférieur à 100, ça peut être le même qu'avant!
          N = prime1 + '$\\times $' + prime2
          texte = N
          texteCorr = `${N} est le produit de ${prime1} et de ${prime2}, il admet donc au moins `
          if (prime1 === prime2) {
            texteCorr += `trois divisieurs qui sont 1, ${prime1} et lui-même ${N}=${nombreAvecEspace(prime1 * prime2)} `
          } else {
            texteCorr += `quatre diviseurs qui sont 1, ${prime1}, ${prime2} et lui-même ${N}=${nombreAvecEspace(prime1 * prime2)}, `
          };
          texteCorr += texteEnCouleurEtGras(`${N} = ` + nombreAvecEspace(prime1 * prime2) + ' n\'est donc pas premier.')
          bonneReponse = 'non'
          break
        }
        case 7: { // nombre premier inférieur à 29
          // rang du nombre premier choisi
          const r = randint(0, cribleEratostheneN(29).length - 1)
          N = cribleEratostheneN(29)[r] // on choisit un nombre premier inférieur à 29
          const prems = cribleEratostheneN(29)
          const tabPremiersATester = []
          let rg = 0
          while (prems[rg] ** 2 < N) {
            tabPremiersATester.push(prems[rg])
            rg++
          }
          let stringNbCorr1 = ''
          if (tabPremiersATester.length === 1) {
            stringNbCorr1 = 'le nombre'
          } else {
            stringNbCorr1 = 'les nombres'
          }

          const tabPremiersToTest = cribleEratostheneN(N)
          let stringNbCorr2 = ''
          if (tabPremiersToTest.length === 1) {
            stringNbCorr2 = 'le nombre'
          } else {
            stringNbCorr2 = 'les nombres'
          }

          texte = N + ''
          texteCorr = '<b>Proposition de deux corrections valables :</b> <br>'
          texteCorr += '<b>Proposition de correction 1 :</b> <br>'
          texteCorr += `En effectuant la division euclidienne de ${N} par tous les nombres premiers dont le carré est inférieur à $${N}$, c'est-à-dire par ${stringNbCorr1} `
          texteCorr += tabPremiersATester[0]
          for (let k = 1; k < tabPremiersATester.length; k++) {
            texteCorr += ', ' + tabPremiersATester[k]
          };
          texteCorr += ', le reste n\'est jamais nul.'
          texteCorr += '<br>' + texteEnCouleurEtGras(nombreAvecEspace(N) + ' est donc un nombre premier.')
          texteCorr += '<hr>'
          texteCorr += '<b>Proposition de correction 2 :</b> <br>'
          texteCorr += `En effectuant la division euclidienne de ${N} par tous les nombres premiers inférieurs à $${N}$, c'est-à-dire par ${stringNbCorr2} `
          texteCorr += tabPremiersToTest[0]
          for (let k = 1; k < tabPremiersToTest.length - 1; k++) {
            texteCorr += ', ' + tabPremiersToTest[k]
          };
          texteCorr += ', le reste n\'est jamais nul.'
          texteCorr += '<br>' + texteEnCouleurEtGras(nombreAvecEspace(N) + ' est donc un nombre premier.')
          bonneReponse = 'oui'
          break
        }
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
}
