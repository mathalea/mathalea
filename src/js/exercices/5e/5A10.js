import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListesSansChangerOrdre, listeDiviseurs, texteOuPas, contraindreValeur } from '../../modules/outils.js'
export const dateDeModifImportante = '28/10/2021'
export const titre = 'Écrire la liste de tous les diviseurs d’un entier'

/**
 * 5A10 - Division Euclidienne; diviseurs, multiples, critères de divisibilité
 * Exercice bilan
 * @author Sébastien Lozano
 */
export default function ListeDesDiviseurs5e () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  // this.consigne =`Écrire la liste de tous les diviseurs d'un entier.`;
  this.consigne = ''
  // this.consigne += `<br>`;
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 3
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = '2-2-2'
  this.sup2 = '6-6-6'
  this.sup3 = 10

  this.nouvelleVersion = function () {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      // this.boutonAide = modalPdf(numeroExercice,"assets/pdf/FicheArithmetique-3A10.pdf","Aide mémoire sur la division euclidienne (Sébastien Lozano)","Aide mémoire")
      // this.boutonAide += modalVideo('conteMathsNombresPremiers','/videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    const typesDeQuestionsDisponibles = [1, 1, 2]
    // let typesDeQuestionsDisponibles = [1];
    const nbChiffresMax = this.sup.split('-')
    const nbDiviseursMax = this.sup2.split('-')
    this.sup3 = contraindreValeur(2, 16, parseFloat(this.sup3), 10)

    for (let i = 0; i < this.nbQuestions; i++) {
      nbChiffresMax[i] = contraindreValeur(1, 5, parseFloat(nbChiffresMax[i]), 2)
    }
    for (let i = 0; i < this.nbQuestions; i++) {
      nbDiviseursMax[i] = contraindreValeur(2, parseInt(this.sup3), parseFloat(nbDiviseursMax[i]), 6)
    }
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, listeDiviseursM = [], nbDiviseursM, M, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]
      if (nbDiviseursMax[i] > 10) {
        nbChiffresMax[i] = Math.min(nbChiffresMax[i], 3)
      }
      do {
        M = randint(10 ** (nbChiffresMax[i] - 1), 10 ** nbChiffresMax[i] - 1)
        listeDiviseursM = listeDiviseurs(M)
        nbDiviseursM = listeDiviseursM.length
      } while (nbDiviseursM < Math.max(2, nbDiviseursMax[i] - 3) || nbDiviseursM > nbDiviseursMax[i])

      switch (typesDeQuestions) {
        case 1:
          texte = `Compléter le tableau suivant et faire la liste de tous les diviseurs de ${M}`
          if (!context.isHtml) {
            texte += '$\\medskip$'
          };
          texte += '<br>'
          if (context.isHtml) {
            texte += '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n'
          } else {
            texte += '$\\begin{array}{|c|c|c|}\n'
          };
          texte += '\\hline\n'
          texte += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`
          texte += '\\hline\n'

          if (nbDiviseursM % 2 === 0) { // si il y a un nombre pair de diviseurs
            for (let m = 0; m < (listeDiviseurs(M).length / 2); m++) {
              texte += texteOuPas(listeDiviseurs(M)[m]) + ' & ' + texteOuPas(listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)]) + `& ${texteOuPas(M)} \\\\\n`
              texte += '\\hline\n'
            };
          } else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
            for (let m = 0; m < ((listeDiviseurs(M).length - 1) / 2); m++) {
              texte += texteOuPas(listeDiviseurs(M)[m]) + ' & ' + texteOuPas(listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)]) + `& ${texteOuPas(M)} \\\\\n`
            };
            texte += texteOuPas(listeDiviseurs(M)[(nbDiviseursM - 1) / 2]) + ' & ' + texteOuPas(listeDiviseurs(M)[(nbDiviseursM - 1) / 2]) + `& ${texteOuPas(M)} \\\\\n`
            texte += '\\hline\n'
          };
          texte += '\\end{array}\n$'

          // correction
          texteCorr = `Le tableau suivant contient tous les couples de facteurs dont le produit vaut ${M}`
          if (!context.isHtml) {
            texteCorr += '$\\medskip$'
          };
          texteCorr += '<br>'
          if (context.isHtml) {
            texteCorr += '$\\def\\arraystretch{2.5}\\begin{array}{|c|c|c|}\n'
          } else {
            texteCorr += '$\\begin{array}{|c|c|c|}\n'
          };
          texteCorr += '\\hline\n'
          texteCorr += `\\text{Facteur n°1} & \\text{Facteur n°2} & \\text{Produit donnant } ${M} \\\\\n`
          texteCorr += '\\hline\n'

          if (nbDiviseursM % 2 === 0) { // si il y a un nombre pair de diviseurs
            for (let m = 0; m < (listeDiviseurs(M).length / 2); m++) {
              texteCorr += listeDiviseurs(M)[m] + ' & ' + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + `& ${M} \\\\\n`
              texteCorr += '\\hline\n'
            };
          } else { // sinon il est impair, cela n'arrive qu'avvec les carrés parfaits
            for (let m = 0; m < ((listeDiviseurs(M).length - 1) / 2); m++) {
              texteCorr += listeDiviseurs(M)[m] + ' & ' + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + `& ${M} \\\\\n`
            };
            texteCorr += listeDiviseurs(M)[(nbDiviseursM - 1) / 2] + ' & ' + listeDiviseurs(M)[(nbDiviseursM - 1) / 2] + `& ${M} \\\\\n`
            texteCorr += '\\hline\n'
          };
          texteCorr += '\\end{array}\n$'
          if (!context.isHtml) {
            texteCorr += '$\\medskip$'
          };
          texteCorr += '<br>'
          texteCorr += `${M} a donc ${nbDiviseursM} diviseurs qui sont : `
          texteCorr += '1'
          for (let w = 1; w < listeDiviseurs(M).length; w++) {
            texteCorr += ' ; ' + listeDiviseurs(M)[w]
          };
          texteCorr += '.'
          break
        case 2: // liste des diviseurs

          texte = `Écrire la liste de tous les diviseurs de ${M}.`
          texteCorr = `Pour trouver la liste des diviseurs de ${M} on cherche tous les produits de deux facteurs qui donnent ${M}. En écrivant toujours le plus petit facteur en premier.<br>`
          texteCorr += `Il est suffisant de chercher des diviseurs inférieurs au plus grand nombre dont le carré vaut ${M}, par exemple ici, ${Math.trunc(Math.sqrt(M))}$\\times $${Math.trunc(Math.sqrt(M))} = ${Math.trunc(Math.sqrt(M)) * Math.trunc(Math.sqrt(M))}<${M}`
          texteCorr += ` et ${Math.trunc(Math.sqrt(M)) + 1}$\\times $${Math.trunc(Math.sqrt(M)) + 1} = ${(Math.trunc(Math.sqrt(M)) + 1) * (Math.trunc(Math.sqrt(M)) + 1)}>${M} donc il suffit d'arrêter la recherche de facteur à ${Math.trunc(Math.sqrt(M))}.`
          texteCorr += ` En effet, si ${M} est le produit de deux entiers p$\\times $q avec p < q alors si p$\\times $p > ${M} c'est que q$\\times $q < ${M} mais dans ce cas p serait supérieur à q sinon p$\\times $q serait inférieur à ${M} ce qui ne doit pas être le cas.<br>`
          if (listeDiviseurs(M).length % 2 === 0) { // si il y a un nombre pair de diviseurs
            for (let m = 0; m < (listeDiviseurs(M).length / 2); m++) {
              texteCorr += '' + listeDiviseurs(M)[m] + '$\\times $' + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + ` = ${M}<br>`
            };
          } else {
            for (let m = 0; m < ((listeDiviseurs(M).length - 1) / 2); m++) {
              texteCorr += '' + listeDiviseurs(M)[m] + '$\\times $' + listeDiviseurs(M)[(listeDiviseurs(M).length - m - 1)] + '<br>'
            };
            texteCorr += '' + listeDiviseurs(M)[(listeDiviseurs(M).length - 1) / 2] + '$\\times $' + listeDiviseurs(M)[(listeDiviseurs(M).length - 1) / 2] + ` = ${M}<br>`
          };
          texteCorr += `Chacun des facteurs de la liste ci-dessus est un diviseur de ${M}.<br>`
          texteCorr += `La liste des diviseurs de ${M} est donc `
          texteCorr += '1'
          for (let w = 1; w < listeDiviseurs(M).length; w++) {
            texteCorr += ' ; ' + listeDiviseurs(M)[w]
          };
          texteCorr += '.'
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Nombres de chiffres des entiers (un par question) séparés par des tirets', '2-2-2']
  this.besoinFormulaire2Texte = ['Nombre maximum de diviseurs des entiers (un par question) séparés par des tirets', '6-6-6']
}
