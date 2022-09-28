import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, obtenirListeFacteursPremiers, texNombre, miseEnEvidence, modalPdf, modalVideo, cribleEratostheneN, premiersEntreBornes, warnMessage, rangeMinMax, contraindreValeur, compteOccurences, combinaisonListes } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
export const titre = 'Décomposer un entier en produit de facteurs premiers'

/**
 * Décomposer un nombre en facteurs premiers et compter son nombre de diviseurs à partir d'un tableau
 * plusieurs type de nombres à décomposer
 * type 1 : 3 à 5 facteurs premiers max, multiplicités 0,1,2 ou 3 max à préciser
 * type 2 : un produit de deux premiers entre 30 et 100, multiplicité 1 ... suffisamment de possibilités?
 * type 3 : un grand nombre premier au delà de 1000 et inférieur à 2 000
 * @author Sébastien Lozano (Rajout par EE du this.sup2 et de l'AMC)
 * Référence 3A10-3
 */
export const uuid = '32f33'
export const ref = '3A10-3'
export default function DecompositionFacteursPremiers () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  // mais une différence selon que l'exo est affiché en interactif ou non
  this.consigne = ''
  context.isHtml ? this.spacing = 2 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 3
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1
  this.listePackages = 'bclogo'
  this.besoinFormulaireCaseACocher = ['Afficher la liste des nombres premiers inférieurs à 100']
  this.besoinFormulaire2Texte = ['Choix des décompositions', 'Nombres séparés par des tirets\n1 : 3 à 5 petits facteurs premiers max\n2 : 2 facteurs premiers entre 30 et 100\n3 : Un seul grand nombre premier\n4 : Mélange']
  this.sup = true
  this.sup2 = 4

  this.nouvelleVersion = function (numeroExercice) {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(numeroExercice, 'assets/pdf/FicheArithmetique-3A11.pdf', 'Aide mémoire sur les nombres premiers (Sébastien Lozano)', 'Aide mémoire')
      this.boutonAide += modalVideo('conteMathsNombresPremiers', 'https://coopmaths.fr/videos/LesNombresPremiers.mp4', 'Petit conte mathématique - Les Nombres Premiers', 'Intro Vidéo')
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    /* From Sebastien Lozano
    let typesDeQuestionsDisponibles = [1, 2, 3]
    typesDeQuestionsDisponibles = shuffle(typesDeQuestionsDisponibles) // on mélange l'ordre des questions

    // let typesDeQuestionsDisponibles = [1];
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)
    */
    let stringRappel = 'Cette liste des nombres premiers inférieurs à 100 pourra être utile : <br>' + cribleEratostheneN(100)[0]
    for (let k = 1; k < cribleEratostheneN(100).length; k++) {
      stringRappel += ', ' + cribleEratostheneN(100)[k]
    };
    stringRappel += '.'

    if (this.sup) {
      this.introduction = warnMessage(stringRappel, 'nombres', 'Coup de pouce')
    } else {
      this.introduction = ''
    }
    // Rajout EE
    let listeDesProblemes = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      listeDesProblemes = rangeMinMax(1, 4)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 4, this.sup2, 4)
      } else {
        listeDesProblemes = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeDesProblemes[i] = contraindreValeur(1, 4, parseInt(listeDesProblemes[i]), 4) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeDesProblemes, 4) > 0) listeDesProblemes = rangeMinMax(1, 3) // Teste si l'utilisateur a choisi tout
    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)
    // Fin du rajout EE

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeDesProblemes[i]
      let nombre, reponse

      switch (typesDeQuestions) {
        case 1: // 3 à 5 facteurs premiers max compris entre 0 et 30, de multiplicité 1,2 ou 3 max
          {
            // on fixe le nombre de facteurs premier entre 3 et 5
            const nbDePremiers = randint(3, 5)
            // on fixe la limite pour le choix des premiers
            const maxPremier = 11
            // on fixe le rang max pour le choix des premiers
            const rgMax = cribleEratostheneN(maxPremier).length - 1
            // on choisit les rangs pour les nombres premiers
            const tabRangs = []
            const tabRangsExclus = []
            for (let k = 0; k < (nbDePremiers); k++) {
              for (let m = 0; m < k; m++) {
                tabRangsExclus.push(tabRangs[m])
              }
              tabRangs[k] = randint(0, rgMax, tabRangsExclus)
            };
            // on choisit les premiers
            const tabPremiers = []
            for (let k = 0; k < tabRangs.length; k++) {
              tabPremiers[k] = cribleEratostheneN(maxPremier)[tabRangs[k]]
            };
            // on range les facteurs premiers dans l'ordre croissant
            tabPremiers.sort(function (a, b) {
              return a - b
            })
            // on choisit les multiplicités
            const tabMultiplicites = []
            for (let k = 0; k < tabRangs.length; k++) {
              tabMultiplicites[k] = randint(1, 2)
            };
            // yapluka écrire le nombre dans l'énoncé et sa décomposition dans la correction
            texte = 'À l\'aide de la calculatrice, si c\'est possible, décomposer '
            let nombreTodecompose = 1
            for (let k = 0; k < tabRangs.length; k++) {
              for (let m = 0; m < tabMultiplicites[k]; m++) {
                nombreTodecompose = nombreTodecompose * tabPremiers[k]
              };
            };
            const racinePremier1 = Math.trunc(Math.sqrt(nombreTodecompose))
            texte += `$${texNombre(nombreTodecompose)}$ en produit de facteurs premiers.`
            // correction
            texteCorr = `Nous allons successivement tester la divisibilité de $${texNombre(nombreTodecompose)}$ par tous les nombres premiers inférieurs à `
            texteCorr += `$${texNombre(nombreTodecompose)}$ en commençant par 2, 3, 5, 7, ...<br>`
            texteCorr = `Il est suffisant de tester la divisibilité de $${texNombre(nombreTodecompose)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${texNombre(nombreTodecompose)}}$, c'est-à-dire inférieurs à $${texNombre(racinePremier1)}$.<br>`
            texteCorr += 'Ce sont les nombres de la liste : <br>'
            texteCorr += '$' + cribleEratostheneN(racinePremier1)[0] + '$ ; '
            for (let k = 1; k < cribleEratostheneN(racinePremier1).length; k++) {
              texteCorr += '$' + cribleEratostheneN(racinePremier1)[k] + '$'
              if (k !== cribleEratostheneN(racinePremier1).length - 1) {
                texteCorr += ' ; '
              } else {
                texteCorr += '.'
              }
              if (k % 15 === 0) {
                texteCorr += '<br>'
              }
            };
            texteCorr += '<br>'
            const listeFacteursPremiers = obtenirListeFacteursPremiers(nombreTodecompose)
            let quotientIntermediaire = nombreTodecompose
            for (let k = 0; k < listeFacteursPremiers.length; k++) {
              texteCorr += `$${texNombre(quotientIntermediaire)}\\div${miseEnEvidence(listeFacteursPremiers[k])} = ${texNombre(quotientIntermediaire / listeFacteursPremiers[k])}$<br>`
              quotientIntermediaire = quotientIntermediaire / listeFacteursPremiers[k]
            };
            texteCorr += `Finalement, on obtient la décomposition suivante : $ ${texNombre(nombreTodecompose)} = `
            if (tabMultiplicites[0] === 1) {
              texteCorr += `${tabPremiers[0]}`
              reponse = `${tabPremiers[0]}`
            } else {
              texteCorr += `${tabPremiers[0]}^{${tabMultiplicites[0]}}`
              reponse = `${tabPremiers[0]}^{${tabMultiplicites[0]}}`
            };
            for (let k = 1; k < tabPremiers.length; k++) {
              if (tabMultiplicites[k] === 1) {
                texteCorr += `\\times${tabPremiers[k]}`
                reponse += `\\times${tabPremiers[k]}`
              } else {
                texteCorr += `\\times${tabPremiers[k]}^{${tabMultiplicites[k]}}`
                reponse += `\\times${tabPremiers[k]}^{${tabMultiplicites[k]}}`
              };
            };
            texteCorr += '$.'
            nombre = nombreTodecompose
            setReponse(this, i, reponse)
          }
          break
        case 2: // deux premiers compris entre 30 et 100 de multiplicité 1
          {
          // on choisit un rang différent pour chaque premier entre 30 et 100
            const r1 = randint(0, premiersEntreBornes(30, 100).length - 1)
            const r2 = randint(0, premiersEntreBornes(30, 100).length - 1, r1)
            let premier1 = premiersEntreBornes(30, 100)[r1]
            let premier2 = premiersEntreBornes(30, 100)[r2]
            if (premier1 > premier2) { // on inverse p1 et p2 si p1 est supérieur à p2
              const p = premier1
              premier1 = premier2
              premier2 = p
            };
            texte = `À l'aide de la calculatrice, si c'est possible, décomposer $${texNombre(premier1 * premier2)}$ en produit de facteurs premiers.`
            const racinePrem = Math.trunc(Math.sqrt(premier1 * premier2))
            texteCorr = `Il est suffisant de tester la divisibilité de $${texNombre(premier1 * premier2)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${texNombre(premier1 * premier2)}}$, c'est-à-dire inférieurs à $${texNombre(racinePrem)}$.<br>`
            texteCorr += 'Ce sont les nombres de la liste suivante : <br>$'
            texteCorr += cribleEratostheneN(racinePrem)[0]
            for (let k = 1; k < cribleEratostheneN(racinePrem).length; k++) {
              texteCorr += '; ' + cribleEratostheneN(racinePrem)[k]
            };
            texteCorr += '.$<br>'
            const listeFacteursPremiers = obtenirListeFacteursPremiers(premier1 * premier2)
            let quotientIntermediaire = premier1 * premier2
            for (let k = 0; k < listeFacteursPremiers.length; k++) {
              texteCorr += `$${texNombre(quotientIntermediaire)}\\div${miseEnEvidence(listeFacteursPremiers[k])} = ${texNombre(quotientIntermediaire / listeFacteursPremiers[k])}$<br>`
              quotientIntermediaire = quotientIntermediaire / listeFacteursPremiers[k]
            };
            texteCorr += ` D'où $${texNombre(premier1 * premier2)} = ${texNombre(premier1)}\\times${texNombre(premier2)}$.`
            reponse = `${premier1}\\times${premier2}`
            nombre = premier1 * premier2
            setReponse(this, i, reponse)
          }
          break
        case 3: // un gros premier entre 1000 et 2000
          {
          // on choisit un rang pour le nombre premier entre 1000 et 2000
            const r = randint(0, premiersEntreBornes(1000, 2000).length - 1)
            const premier = premiersEntreBornes(1000, 2000)[r]
            const racinePremier = Math.trunc(Math.sqrt(premier))
            texte = `À l'aide de la calculatrice, si c'est possible, décomposer $${texNombre(premier)}$ en produit de facteurs premiers.`
            texteCorr = `Il est suffisant de tester la divisibilité de $${texNombre(premier)}$ par tous les nombres premiers inférieurs ou égaux à $\\sqrt{${texNombre(premier)}}$, c'est-à-dire inférieurs à $${racinePremier}$.<br>`
            texteCorr += 'Ce sont les nombres de la liste $'
            texteCorr += cribleEratostheneN(racinePremier)[0]
            for (let k = 1; k < cribleEratostheneN(racinePremier).length; k++) {
              texteCorr += '; ' + cribleEratostheneN(racinePremier)[k]
            };
            texteCorr += '$, '
            texteCorr += `on se rend compte que $${texNombre(premier)}$ n'est divisible par aucun de ces nombres et donc est un nombre premier.<br>Aucune décomposition en produit de nombres premiers n'est possible et  donc `
            texteCorr += `$${texNombre(premier)} = ${texNombre(premier)}$.`

            reponse = `${premier}`
            nombre = premier
            setReponse(this, i, reponse)
          }
          break
      }
      texte += ajouteChampTexteMathLive(this, i, 'largeur20 inline', { texte: `<br> <b>Écrire les facteurs premiers dans l'ordre croissant et la décomposition à l'aide de puissances lorsque l'exposant est supérieur ou égal à deux.</b> <br> La décomposition de $${texNombre(nombre)}$ est : ` })
      if (context.isAmc) {
        this.autoCorrection[i] = [{
          enonce: texte,
          propositions: [{ statut: 3, sanscadre: false, pointilles: false }]
        }]
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
  // this.besoinFormulaireCaseACocher = ['Afficher la liste des nombres premiers inférieurs à 100']
  // this.besoinFormulaire2Texte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Trouver une échelle\n2 : Trouver une distance réelle\n3 : Trouver une longueur sur le plan\n4 : Mélange']
}
