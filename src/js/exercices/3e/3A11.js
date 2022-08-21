import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListesSansChangerOrdre, texNombre, modalPdf, numAlpha, premiersEntreBornes, warnMessage, decompositionFacteursPremiersArray } from '../../modules/outils.js'
export const titre = 'Rendre irréductible une fraction'

/**
 * Fractions irréductibles
 * @author Sébastien Lozano
 * Référence 3A11
 */
export default function FractionsIrreductibles () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  // pas de différence entre la version html et la version latex pour la consigne
  this.consigne = 'Rendre irréductible une fraction et son inverse à partir des décompositions en produit de facteurs premiers.'
  // this.consigne += `<br>`;
  context.isHtml ? this.spacing = 4 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 4 : this.spacingCorr = 2
  this.nbQuestions = 1
  // this.correctionDetailleeDisponible = true;
  this.nbCols = 1
  this.nbColsCorr = 1
  this.listePackages = 'bclogo'
  this.sup = true

  this.nouvelleVersion = function (numeroExercice) {
    let typesDeQuestions
    if (context.isHtml) { // les boutons d'aide uniquement pour la version html
      // this.boutonAide = '';
      this.boutonAide = modalPdf(numeroExercice, 'assets/pdf/FicheArithmetique-3A12.pdf', 'Aide mémoire sur les fonctions (Sébastien Lozano)', 'Aide mémoire')
      // this.boutonAide += modalVideo('conteMathsNombresPremiers','https://coopmaths.fr/videos/LesNombresPremiers.mp4','Petit conte mathématique','Intro Vidéo');
    } else { // sortie LaTeX
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées

    // let typesDeQuestionsDisponibles = [1,2,3,4];
    const typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions)

    this.introduction = warnMessage('À la question ' + numAlpha(3, true) + ', une observation judicieuse et argumentée pourra faire gagner du temps !', 'nombres', 'Coup de pouce')

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      typesDeQuestions = listeTypeDeQuestions[i]

      let nb1 // nbre 1
      let nb2 // nbre 2

      // on fixe le tableau de choix
      const candidatsPremiersCommuns = this.sup ? [2, 3, 5] : premiersEntreBornes(2, 13) // tableau des candidats premiers communs
      // on fixe le nombre de divisuers premiers communs
      const nbDivPremCommuns = this.sup ? 3 : 4 // nombre de diviseurs premiers communs
      // on initialise le tableau des diviseurs premiers communs
      const premiersCommuns = [] // tableau des diviseurs premiers communs
      // on initialise le tableau des rangs
      const r = [] // tableau pour le choix des rangs des diviseurs premiers communs
      // on initialise le tableau des rangs déjà choisis
      const rExclus = [] // tableau pour la boucle de creation de r
      // on complète le tableau des rangs des rangs des diviseurs premiers choisis
      for (let k = 0; k < nbDivPremCommuns; k++) {
        for (let m = 0; m < k; m++) {
          rExclus.push(r[m])
        };
        r[k] = randint(0, candidatsPremiersCommuns.length - 1, rExclus)
      };
      // on complète le tableau des diviseurs premiers communs
      for (let k = 0; k < nbDivPremCommuns; k++) {
        premiersCommuns.push(candidatsPremiersCommuns[r[k]])
      };
      // on initialise et on complète le tableau des multiplicités des diviseurs premiers communs
      const multiplicitesPremiersCommuns = [] // tableau des multiplicités des diviseurs premiers communs
      let zeroDejaDonne = false
      for (let k = 0; k < nbDivPremCommuns; k++) {
        const multipliciteHAsard = zeroDejaDonne ? randint(1, 2) : randint(0, 2)
        if (multipliciteHAsard === 0) zeroDejaDonne = true
        multiplicitesPremiersCommuns.push(multipliciteHAsard)
      };
      // on supprime les diviseurs premiers de multiplicité 0 et leur multiplicité
      let idx = multiplicitesPremiersCommuns.indexOf(0)
      while (idx !== -1) {
        premiersCommuns.splice(idx, 1)
        multiplicitesPremiersCommuns.splice(idx, 1)
        idx = multiplicitesPremiersCommuns.indexOf(0)
      };
      // on initialise le tableau des diviseurs du premier et du second nombre avec les diviseurs premiers communs
      const tabNb1 = [] // tableau pour les diviseurs de nb1
      const tabNb2 = [] // tableau pour les diviseurs de nb2
      for (let k = 0; k < premiersCommuns.length; k++) {
        tabNb1[k] = premiersCommuns[k]
        tabNb2[k] = premiersCommuns[k]
      };
      // on initialise les tableaux de multiplicité, ils sont les mêmes mais on pourrait vouloir qu'ils soient différents
      const multiplicitesNb1 = []
      const multiplicitesNb2 = []
      for (let k = 0; k < premiersCommuns.length; k++) {
        multiplicitesNb1[k] = multiplicitesPremiersCommuns[k]
        multiplicitesNb2[k] = multiplicitesPremiersCommuns[k]
      };
      // on ajoute un facteur premier distinct pour chaque nombre plus petit que maBorne
      const maBorne = this.sup ? 13 : 30
      const rEx = randint(0, premiersEntreBornes(2, maBorne).length - 1) // pour exlcure le rang de nb1
      const nb1Dist = premiersEntreBornes(2, maBorne)[rEx] // diviseur unique du premier nombre
      const nb2Dist = premiersEntreBornes(2, maBorne)[randint(0, premiersEntreBornes(2, maBorne).length - 1, rEx)] // diviseur unique du deuxième nombre
      // on ajoute nb1_dist, nb2_dist dans les tableaux des diviseurs premiers du premier et du second nombre
      // nb1
      let bool = false
      let n = 0
      while (n < tabNb1.length && bool !== true) {
        if (nb1Dist === tabNb1[n]) { // si le diviseur premier est déjà présent on incrémente sa multiplicité
          multiplicitesNb1[n]++
          bool = true
        };
        n++
      };
      // on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
      if (!bool) { // il n'est pas présent on l'ajoute avec la multipplicité 1
        tabNb1.push(nb1Dist)
        multiplicitesNb1.push(1)
        bool = true
      };
      // nb2
      bool = false
      n = 0
      while (n < tabNb2.length && !bool) {
        if (nb2Dist === tabNb2[n]) { // si le diviseur premier est déjà présent on incrémente sa multiplicité
          multiplicitesNb2[n]++
          bool = true
        };
        n++
      };
      // on teste la valeur de sortie de bool et on ajoute la nouvelle valeur si necessaire
      if (!bool) { // il n'est pas présent on l'ajoute avec la multipplicité 1
        tabNb2.push(nb2Dist)
        multiplicitesNb2.push(1)
        bool = true
      };
      // on crée un tableau associatif à partir des deux tableaux tab_ni et multiplicites_ni
      const tabPremMultNb1 = []
      for (let k = 0; k < tabNb1.length; k++) {
        tabPremMultNb1[k] = { prem: tabNb1[k], mult: multiplicitesNb1[k] }
      };
      const tabPremMultNb2 = []
      for (let k = 0; k < tabNb2.length; k++) {
        tabPremMultNb2[k] = { prem: tabNb2[k], mult: multiplicitesNb2[k] }
      };
      // on range selon prem croissant
      tabPremMultNb1.sort(function (a, b) {
        return a.prem > b.prem
      })
      tabPremMultNb2.sort(function (a, b) {
        return a.prem > b.prem
      })
      // on initialise nb1 et nb2 et on les calcule à partir des tableaux
      nb1 = 1
      for (let k = 0; k < tabNb1.length; k++) {
        nb1 = nb1 * tabPremMultNb1[k].prem ** tabPremMultNb1[k].mult
      };
      nb2 = 1
      for (let k = 0; k < tabNb2.length; k++) {
        nb2 = nb2 * tabPremMultNb2[k].prem ** tabPremMultNb2[k].mult
      };

      switch (typesDeQuestions) {
        case 1: // décomposition de A
          texte = numAlpha(0) + ` Décomposer $A = ${texNombre(nb1)}$ en produit de facteurs premiers.`
          texteCorr = numAlpha(0) + ' La décomposition en produit de facteurs premier de $A = '
          switch (tabPremMultNb1[0].mult) {
            case 1:
              texteCorr += `${tabPremMultNb1[0].prem}`
              break
            default:
              texteCorr += `${tabPremMultNb1[0].prem}^{${tabPremMultNb1[0].mult}}`
              break
          };
          for (let k = 1; k < tabNb1.length; k++) {
            switch (tabPremMultNb1[k].mult) {
              case 1:
                texteCorr += `\\times${tabPremMultNb1[k].prem}`
                break
              default:
                texteCorr += `\\times${tabPremMultNb1[k].prem}^{${tabPremMultNb1[k].mult}}`
                break
            };
          };
          texteCorr += '$.'
          // break;
          // case 2 : // décomposition de B
          texte += '<br>' + numAlpha(1) + ` Décomposer $B = ${texNombre(nb2)}$ en produit de facteurs premiers.`
          texteCorr += '<br>' + numAlpha(1) + ' La décomposition en produit de facteurs premier de $B = '
          switch (tabPremMultNb2[0].mult) {
            case 1:
              texteCorr += `${tabPremMultNb2[0].prem}`
              break
            default:
              texteCorr += `${tabPremMultNb2[0].prem}^{${tabPremMultNb2[0].mult}}`
              break
          };
          for (let k = 1; k < tabNb2.length; k++) {
            switch (tabPremMultNb2[k].mult) {
              case 1:
                texteCorr += `\\times${tabPremMultNb2[k].prem}`
                break
              default:
                texteCorr += `\\times${tabPremMultNb2[k].prem}^{${tabPremMultNb2[k].mult}}`
                break
            };
          };
          texteCorr += '$.'
          // break;
          // case 3 : // reduction de A sur B
          texte += '<br>' + numAlpha(2) + ` Rendre la fraction $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}}$ irréductible `
          if (context.isHtml) {
            texte += ' à l\'aide des décompositions obtenues au ' + numAlpha(0) + 'et au ' + numAlpha(1, true) + '.'
          } else {
            texte += ' à l\'aide des questions ' + numAlpha(0) + 'et ' + numAlpha(1, true) + '.'
          };
          texteCorr += '<br>' + numAlpha(2) + ` $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}} = `
          texteCorr += '\\dfrac{'
          texteCorr += '\\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[0] + '}'
          for (let k = 1; k < decompositionFacteursPremiersArray(nb1 / nb1Dist).length; k++) {
            texteCorr += '\\times \\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[k] + '}'
          };
          texteCorr += `\\times ${nb1Dist}}{`
          texteCorr += '\\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[0] + '}'
          for (let k = 1; k < decompositionFacteursPremiersArray(nb1 / nb1Dist).length; k++) {
            texteCorr += '\\times \\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[k] + '}'
          };
          texteCorr += `\\times ${nb2Dist}} = `
          texteCorr += `\\dfrac{${nb1Dist}}{${nb2Dist}}$`
          // break;
          // case 4 : // reduction de B sur A
          texte += '<br>' + numAlpha(3) + ` Rendre la fraction $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}}$ irréductible`
          if (context.isHtml) {
            texte += ' à l\'aide des décompositions obtenues au ' + numAlpha(0) + 'et au ' + numAlpha(1, true) + '.'
          } else {
            texte += ' à l\'aide des questions ' + numAlpha(0) + 'et ' + numAlpha(1, true) + '.'
          };
          texteCorr += '<br>' + numAlpha(3) + ` $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$ donc $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}} = `
          texteCorr += '\\dfrac{'
          texteCorr += '\\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[0] + '}'
          for (let k = 1; k < decompositionFacteursPremiersArray(nb1 / nb1Dist).length; k++) {
            texteCorr += '\\times \\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[k] + '}'
          };
          texteCorr += `\\times ${nb2Dist}}{`
          texteCorr += '\\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[0] + '}'
          for (let k = 1; k < decompositionFacteursPremiersArray(nb1 / nb1Dist).length; k++) {
            texteCorr += '\\times \\cancel{' + decompositionFacteursPremiersArray(nb1 / nb1Dist)[k] + '}'
          };
          texteCorr += `\\times ${nb1Dist}} = `
          texteCorr += `\\dfrac{${nb2Dist}}{${nb1Dist}}$.`
          context.isHtml ? texteCorr += '<hr>' : texteCorr += '\\par \\hrulefill \\par'
          texteCorr += ` On peut judicieusement remarquer que $\\dfrac{B}{A}$ est l'inverse de $\\dfrac{A}{B}$
          donc que rendre la fraction $\\dfrac{B}{A}$ irréductible revient à inverser la fraction irréductible
          obtenue pour $\\dfrac{A}{B}$ au ${numAlpha(2, true)}.`
          context.isHtml ? texteCorr += '<hr>' : texteCorr += '\\par \\hrulefill \\par'
          // break;
          // case 5 : // calculer le produit A/B x B/A et réduire. Remarque?
          // texte += `<br>`+numAlpha(4)+` Combien alculer le produit de $\\dfrac{A}{B} = \\dfrac{${texNombre(nb1)}}{${texNombre(nb2)}}$ et de $\\dfrac{B}{A} = \\dfrac{${texNombre(nb2)}}{${texNombre(nb1)}}$.`;
          // texte += `<br>Donner le résultat sous forme de fraction irréductible.`
          // texte += `<br>`+numAlpha(4)+` Remarque ?`
          // texteCorr += `<br>`+numAlpha(4)+' corr type 5';
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      };
      cpt++
    };
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireCaseACocher = ['Décomposition « simple »']
}
