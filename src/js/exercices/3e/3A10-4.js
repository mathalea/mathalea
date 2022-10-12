import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeDiviseurs, randint } from '../../modules/outils/entiers.js'
import { modalPdf, modalVideo } from '../../modules/outils/modaux.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { miseEnEvidence, numAlpha } from '../../modules/outils/contextSensitif.js'
import { texNombre } from '../../modules/outils/texNombres.js'
import { tableauColonneLigne } from '../../modules/outils/tableauCL.js'
import { cribleEratostheneN } from '../../modules/outils/premiers.js'
export const titre = 'Compter et lister les diviseurs d\'un entier à partir de sa décomposition en facteurs premiers'

/**
 * Compter et lister les diviseurs d'un entier à partir de sa decomposition en facteurs premiers
 * @author Sébastien Lozano
 * Référence 3A10-4
 */
export const uuid = '4117b'
export const ref = '3A10-4'
export default function ListerDiviseursParDecompositionFacteursPremiers () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = false
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = 'Sans la calculatrice, compter/lister les diviseurs d\'un entier à partir de sa décomposition en facteurs premiers.'
  // this.consigne += `<br>`;
  context.isHtml ? this.spacing = 2 : this.spacing = 1
  context.isHtml ? this.spacingCorr = 2 : this.spacingCorr = 1
  this.nbQuestions = 2
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function (numeroExercice) {
    // let typesDeQuestions
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

    // const typesDeQuestionsDisponibles = [1]
    // let typesDeQuestionsDisponibles = [1];
    // const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // typesDeQuestions = listeTypeDeQuestions[i]

      // switch (typesDeQuestions) {
      // case 1: // lister/compter les diviseurs d'un entier à partir de sa décomposition en facteurs premiers
      texte = 'Lister/compter les diviseurs d\'un entier à partir de sa décomposition en facteurs premiers'
      // let premiers_dispos = premiersEntreBornes(2,11);
      // on fixe le nombre de facteurs premier à 3
      const nbDePremiersb = 3
      // on fixe la limite pour le choix des premiers
      let maxPremierb
      if (this.sup) maxPremierb = 13
      else maxPremierb = 11
      // on fixe le rang max pour le choix des premiers
      const rgMaxb = cribleEratostheneN(maxPremierb).length - 1
      // on choisit les rangs pour les nombres premiers
      const tabRangsb = []
      const tabRangsExclusb = []
      for (let k = 0; k < (nbDePremiersb); k++) {
        for (let m = 0; m < k; m++) {
          tabRangsExclusb.push(tabRangsb[m])
        }
        tabRangsb[k] = randint(0, rgMaxb, tabRangsExclusb)
      };
      // on choisit les premiers
      const tabPremiersb = []
      for (let k = 0; k < tabRangsb.length; k++) {
        tabPremiersb[k] = cribleEratostheneN(maxPremierb)[tabRangsb[k]]
      };
      // on range les facteurs premiers dans l'ordre croissant
      tabPremiersb.sort(function (a, b) {
        return a - b
      })
      // on choisit les multiplicités
      const tabMultiplicitesb = []
      for (let k = 0; k < tabRangsb.length; k++) {
        tabMultiplicitesb[k] = randint(1, this.sup ? 4 : 2)
      };
      texte = ''
      let nombreADecomposerb = 1
      for (let k = 0; k < tabRangsb.length; k++) {
        for (let m = 0; m < tabMultiplicitesb[k]; m++) {
          nombreADecomposerb = nombreADecomposerb * tabPremiersb[k]
        };
      };
      texte += `La décomposition en facteurs premiers de $${texNombre(nombreADecomposerb)}$ est : $`
      if (tabMultiplicitesb[0] === 1) {
        texte += `${tabPremiersb[0]}`
      } else {
        texte += `${tabPremiersb[0]}^{${tabMultiplicitesb[0]}}`
      };
      for (let k = 1; k < tabPremiersb.length; k++) {
        if (tabMultiplicitesb[k] === 1) {
          texte += `\\times ${tabPremiersb[k]}`
        } else {
          texte += `\\times ${tabPremiersb[k]}^{${tabMultiplicitesb[k]}}`
        };
      };
      texte += '$. <br>'
      texte += numAlpha(0) + ' Compléter le tableau ci-dessous.'
      if (!context.isHtml) {
        texte += '$\\medskip$'
      };
      // on crée le tableau des entetes de lignes et des colonnes
      let entLignes = []
      const contenuLignes = []
      let entColonnes = ['\\times']
      // les entetes des lignes
      for (let k = 0; k < tabMultiplicitesb[0] + 1; k++) {
        entLignes.push('\\phantom{plusLarge}' + tabPremiersb[0] + '^{' + k + '}\\phantom{plusLarge}')
      };
      // les entetes des colonnes
      for (let m = 0; m < tabMultiplicitesb[1] + 1; m++) {
        for (let l = 0; l < tabMultiplicitesb[2] + 1; l++) {
          entColonnes.push(tabPremiersb[1] + '^{' + m + '}\\times' + tabPremiersb[2] + '^{' + l + '}')
        };
      };
      // tableau pour la permutation circulaire
      const tabTemp = entLignes
      // on y affecte les lignes

      // on supprime le x de l'entete des colonnes
      entColonnes.shift()
      // on affecte ça aux lignes;
      entLignes = entColonnes
      // on remet le x en colonnes et on ajoute le reste
      entColonnes = ['\\times'].concat(tabTemp)
      // le contenu des lignes
      for (let l = 0; l < (tabMultiplicitesb[0] + 1); l++) {
        for (let c = 1; c < (tabMultiplicitesb[1] + 1) * (tabMultiplicitesb[2] + 1) + 1; c++) {
          // contenuLignes.push(`l : `+l+`, c : `+Number(c));
          contenuLignes.push('')
        };
      };
      texte += '<br>'
      texte += tableauColonneLigne(entColonnes, entLignes, contenuLignes)
      if (!context.isHtml) {
        texte += '$\\medskip$'
      };
      texte += '<br>'
      texte += numAlpha(1) + ` En déduire le nombre de diviseurs de $${texNombre(nombreADecomposerb)}$.<br>`
      texte += numAlpha(2) + ` Enfin, dresser la liste des diviseurs de $${texNombre(nombreADecomposerb)}$.<br>`

      // correction
      texteCorr = `Avec la décomposition en facteurs premiers de $${texNombre(nombreADecomposerb)}$ qui est : $`
      if (tabMultiplicitesb[0] === 1) {
        texteCorr += `${tabPremiersb[0]}`
      } else {
        texteCorr += `${tabPremiersb[0]}^{${tabMultiplicitesb[0]}}`
      };
      for (let k = 1; k < tabPremiersb.length; k++) {
        if (tabMultiplicitesb[k] === 1) {
          texteCorr += `\\times ${tabPremiersb[k]}`
        } else {
          texteCorr += `\\times ${tabPremiersb[k]}^{${tabMultiplicitesb[k]}}`
        };
      };
      texteCorr += '$ : <br>'
      texteCorr += numAlpha(0) + ' Le tableau donne :'
      // on crée le tableau des entetes de lignes et des colonnes
      let entLignesCorr = []
      let entLignesCorrRes = []
      const contenuLignesCorr = []
      // let contenuLignesCorr_res = [];
      let entColonnesCorr = ['\\times']
      let entColonnesCorrRes = [1]
      // les entetes des lignes
      for (let k = 0; k < tabMultiplicitesb[0] + 1; k++) {
        entLignesCorr.push(tabPremiersb[0] + '^{' + k + '}')
        entLignesCorrRes.push(tabPremiersb[0] ** k)
      };
      // les entetes des colonnes
      for (let m = 0; m < tabMultiplicitesb[1] + 1; m++) {
        for (let l = 0; l < tabMultiplicitesb[2] + 1; l++) {
          entColonnesCorr.push(tabPremiersb[1] + '^{' + m + '}\\times' + tabPremiersb[2] + '^{' + l + '}')
          entColonnesCorrRes.push(tabPremiersb[1] ** m * tabPremiersb[2] ** l)
        };
      };
      // tableaux pour les permutations circulaires
      const tabTempCorr = entLignesCorr
      const tab1TempCorr = entLignesCorrRes
      // on y affecte les lignes
      // on supprime le x de l'entete des colonnes
      entColonnesCorr.shift()
      entColonnesCorrRes.shift()
      // on affecte ça aux lignes;
      entLignesCorr = entColonnesCorr
      entLignesCorrRes = entColonnesCorrRes
      // on remet le x en colonnes et on ajoute le reste
      entColonnesCorr = ['\\times'].concat(tabTempCorr)
      entColonnesCorrRes = [1].concat(tab1TempCorr)
      // le contenu des lignes
      for (let l = 0; l < (tabMultiplicitesb[1] + 1) * (tabMultiplicitesb[2] + 1); l++) {
        for (let c = 1; c < (tabMultiplicitesb[0] + 2); c++) {
          // contenuLignesCorr.push(`l : `+l+`, c : `+Number(c));
          contenuLignesCorr.push(entLignesCorr[l] + '\\times' + entColonnesCorr[c] + '=' + miseEnEvidence(texNombre(entLignesCorrRes[l] * entColonnesCorrRes[c])))
        };
      };
      texteCorr += '<br>'
      texteCorr += tableauColonneLigne(entColonnesCorr, entLignesCorr, contenuLignesCorr)
      texteCorr += '<br>'
      texteCorr += numAlpha(1) + ` $${texNombre(nombreADecomposerb)}$ a donc `
      texteCorr += `$(${tabMultiplicitesb[0]}+1)\\times(${tabMultiplicitesb[1]}+1)\\times(${tabMultiplicitesb[2]}+1) = `
      texteCorr += `${tabMultiplicitesb[0] + 1}\\times${tabMultiplicitesb[1] + 1}\\times${tabMultiplicitesb[2] + 1} = `
      texteCorr += `${(tabMultiplicitesb[0] + 1) * (tabMultiplicitesb[1] + 1) * (tabMultiplicitesb[2] + 1)}$ diviseurs.<br>`
      texteCorr += 'En effet, dans la décomposition apparaît : '
      texteCorr += ` <br> - Le facteur premier $${tabPremiersb[0]}$ avec la multiplicité $${tabMultiplicitesb[0]}$`
      texteCorr += `, le facteur $${tabPremiersb[0]}$ apparaît donc sous les formes : `
      for (let k = 0; k < tabMultiplicitesb[0]; k++) {
        texteCorr += `$${tabPremiersb[0]}^{` + k + '}$ ou '
      };
      texteCorr += `$${tabPremiersb[0]}^{` + tabMultiplicitesb[0] + `}$ d'où le facteur $(${tabMultiplicitesb[0]}+1)$.`

      texteCorr += ` <br> - Le facteur premier $${tabPremiersb[1]}$ avec la multiplicité $${tabMultiplicitesb[1]}$`
      texteCorr += `, le facteur $${tabPremiersb[1]}$ apparaît donc sous les formes : `
      for (let k = 0; k < tabMultiplicitesb[1]; k++) {
        texteCorr += `$${tabPremiersb[1]}^{` + k + '}$ ou '
      };
      texteCorr += `$${tabPremiersb[1]}^{` + tabMultiplicitesb[1] + `}$ d'où le facteur $(${tabMultiplicitesb[1]}+1)$.`

      texteCorr += ` <br> - Le facteur premier $${tabPremiersb[2]}$ avec la multiplicité $${tabMultiplicitesb[2]}$`
      texteCorr += `, le facteur $${tabPremiersb[2]}$ apparaît donc sous les formes : `
      for (let k = 0; k < tabMultiplicitesb[2]; k++) {
        texteCorr += `$${tabPremiersb[2]}^{` + k + '}$ ou '
      };
      texteCorr += `$${tabPremiersb[2]}^{` + tabMultiplicitesb[2] + `}$ d'où le facteur $(${tabMultiplicitesb[2]}+1)$.`
      texteCorr += '<br>'
      texteCorr += numAlpha(2) + ` Enfin, voici la liste des $${(tabMultiplicitesb[0] + 1) * (tabMultiplicitesb[1] + 1) * (tabMultiplicitesb[2] + 1)}$ diviseurs de $${texNombre(nombreADecomposerb)}$ issus du tableau ci-dessus : `
      texteCorr += '$1'
      for (let w = 1; w < listeDiviseurs(nombreADecomposerb).length; w++) {
        texteCorr += '\\text{ ; }' + texNombre(listeDiviseurs(nombreADecomposerb)[w])
      };
      texteCorr += '.$'
      //   break
      // };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"];
}
