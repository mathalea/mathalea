import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, randint } from '../../modules/outils.js'
import { tableauDeVariation } from '../../modules/TableauDeVariation.js'
export const titre = 'Comparaison d\'images dans un tableau de variations'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * Description didactique de l'exercice
 * @author Stéphane Guyon
 * Référence 2F31-3
 */
export const uuid = 'c705b'
export const ref = '2F31-3'
export default function Variationsapartirtableau () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'On donne ci-dessous, le tableau de variations d\'une fonction $f$.'
  this.nbQuestions = 2 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.video = '' // Id YouTube ou url
  this.listePackages = ['tkz-tab']

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3', 'type4', 'type5']
    this.nbQuestionsModifiable = false
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, ligne1, a1, a2, a3, a4, x1, x2, x3, y1, y2, y3, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      texte = ' <br>'

      x1 = randint(-8, -3) // 3 antécédents 1ère ligne tableau
      x2 = randint(x1 + 10, x1 + 17)// 3 antécédents 1ère ligne tableau
      x3 = randint(x2 + 6, x2 + 15)// 3 antécédents 1ère ligne tableau
      y1 = randint(-12, -2)// 3 images des antécédents 1ère ligne tableau
      y2 = randint(y1 + 2, y1 + 10)// 3 images des antécédents 1ère ligne tableau
      y3 = randint(y1 + 2, y2 - 2, [y2])// 3 images des antécédents 1ère ligne tableau
      a1 = randint(x1 + 1, x1 + 4) // 1er antécédent dont on doit comparer l'image
      a2 = randint(a1 + 1, x2 - 1) // 2eme antécédent dont on doit comparer l'image
      a3 = randint(x2 + 1, x3 - 6) // 3eme antécédent dont on doit comparer l'image
      a4 = randint(a3 + 1, x3 - 1) // 4eme antécédent dont on doit comparer l'image
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':// parabole en U ; 2 images sur intervalle où f croissant
          texte = `À partir des informations de l'énoncé, comparer si possible : $f(${a1})$ et $f(${a2})$<br><br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, 30, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 2, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `D'après le tableau de variations, la fonction $f$ est croissante sur $[${x1};${x2}]$,<br> `
          texteCorr += ` $${a1}\\in[${x1};${x2}]$, $${a2}\\in[${x1};${x2}]$, avec $${a1}<${a2}$.<br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, 10, 't/', 10, 't/$f($x{2})$', 10, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 10, `$${a1}$`, 10, `$${a2}$`, 10, `$${x2}$`, 10, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))
          texteCorr += 'On sait que si une fonction est croissante sur un intervalle $[a;b]$, <br>'
          texteCorr += 'alors ses antécédents et ses images sont rangés dans le même ordre, <br>'
          texteCorr += 'C\'est à dire que pour tout $x_1\\in[a;b]$ et $x_2\\in[a;b]$, '
          texteCorr += 'si $x_1 < x_2$ alors $f(x_1) < f(x_2)$. <br><br>'
          texteCorr += `Par conséquent, comme $${a1}<${a2}$, alors $f(${a1}) < f(${a2})$.`
          break
        case 'type2':// parabole en U ; 2 images sur intervalle où f décroissant
          texte = `A partir des informations de l'énoncé, comparer si possible : $f(${a3})$ et $f(${a4})$<br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, 30, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `D'après le tableau de variations, la fonction $f$ est décroissante sur $[${x2};${x3}]$,<br> `
          texteCorr += `  $${a3}\\in[${x2};${x3}]$,  $${a4}\\in[${x2};${x3}]$, avec $${a3}<${a4}$.<br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, 10, `+/$${y2}$`, 10, 't/$f($x{2})$', 10, 't/', 10, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'
          texteCorr += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 10, `$${x2}$`, 10, `$${a3}$`, 10, `$${a4}$`, 10, `$${x3}$`, 10]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))
          texteCorr += 'On sait que si une fonction est décroissante sur un intervalle $[a;b]$, <br>'
          texteCorr += 'alors ses antécédents et ses images sont rangés dans l\'ordre inverse. <br>'
          texteCorr += 'C\'est à dire que pour tout $x_1\\in[a;b]$ et $x_2\\in[a;b]$, '
          texteCorr += 'si $x_1 < x_2$ alors $f(x_1) > f(x_2)$. <br><br>'
          texteCorr += `Par conséquent, comme $${a3}<${a4}$, alors $f(${a3}) > f(${a4})$.`
          break
        case 'type3':// parabole en U ; 2 images sur intervalle où f pas monotone, mais on peut répondre
          texte = `A partir des informations de l'énoncé, comparer si possible : $f(${a1})$ et $f(${x3})$<br>`
          y3 = randint(y1 - 12, y1 - 2)// 3 images des antécédents 1ère ligne tableau
          ligne1 = ['Var', 10, `-/$${y1}$`, 30, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `D'après le tableau de variations, $f(${x3})=${y3}$.<br> `
          texteCorr += `D'autre part, $${a1}\\in[${x1};${x2}]$, intervalle sur lequel la fonction $f$ est croissante.<br>`
          texteCorr += 'On sait que si une fonction est croissante sur un intervalle $[a;b]$, <br>'
          texteCorr += 'alors ses antécédents et ses images sont rangés dans le même ordre.<br>'
          texteCorr += 'C\'est à dire que pour tout $x_1\\in[a;b]$ et $x_2\\in[a;b]$, '
          texteCorr += 'si $x_1 < x_2$ alors $f(x_1) < f(x_2)$. <br>'
          texteCorr += `Par conséquent, comme $${x1}<${a1}$, alors $f(${x1}) < f(${a1})$.`
          texteCorr += `<br>Comme $f(${x1}) =${y1}$, on a montré que :  $f(${a1}) > ${y1}$.<br><br>`
          texteCorr += `On en déduit que :  $f(${a1}) > ${y1} > ${y3} > f(${x3})$.<br>`
          break
        case 'type4':// parabole en U ; 2 images sur intervalle où f pas monotone, et on ne peut pas répondre
          texte = `A partir des informations de l'énoncé, comparer si possible : $f(${a1})$ et $f(${x3})$<br>`
          y3 = randint(y1 + 2, y2 - 1)// 3 images des antécédents 1ère ligne tableau
          ligne1 = ['Var', 10, `-/$${y1}$`, 30, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `D'après le tableau de variations,  $f(${x3})=${y3}$.<br>`
          texteCorr += `D'autre part,  $${a1}\\in[${x1};${x2}]$, intervalle sur lequel la fonction $f$ est croissante.<br>`
          texteCorr += 'On sait que si une fonction est croissante sur un intervalle $[a;b]$, <br>'
          texteCorr += 'alors ses antécédents et ses images sont rangés dans le même ordre.<br>'
          texteCorr += 'C\'est à dire que pour tout $x_1\\in[a;b]$ et $x_2\\in[a;b]$, '
          texteCorr += 'si $x_1 < x_2$ alors $f(x_1) < f(x_2)$. <br>'
          texteCorr += `Par conséquent, comme $${x1}<${a1}<${x2}$, alors $f(${x1})< f(${a1}) < f(${x2})$.`
          texteCorr += `<br>On a donc montré que :  $${y1} < f(${a1}) < ${y2}$.<br><br>`
          texteCorr += `Comme $f(${x3})=${y3} \\in [${y1};${y2}]$,<br>`
          texteCorr += `on ne peut pas conclure sans plus d'informations pour comparer $f(${x3})$ et $f(${a1})$.`
          break
        case 'type5':// parabole en U ; 2 images sur intervalle où f non monotone. On ne peut conclure
          texte = `A partir des informations de l'énoncé, comparer si possible : $f(${a1})$ et $f(${a3})$<br>`
          ligne1 = ['Var', 10, `-/$${y1}$`, 30, `+/$${y2}$`, 30, `-/$${y3}$`, 30] // Commencer chaque chaîne par +/ ou -/ pour indiquer le sens de la variation, 'R/' pour 'sauter une case'

          // xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
          texte += mathalea2d({ xmin: -0.5, ymin: -9.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
            tabInit: [
              [
                // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
                ['$x$', 2, 30], ['$f(x)$', 3, 50]
              ],
              // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
              [`$${x1}$`, 20, `$${x2}$`, 20, `$${x3}$`, 30]
            ],
            // tabLines ci-dessous contient les autres lignes du tableau.
            tabLines: [ligne1],
            colorBackground: '',
            espcl: 3.5, // taille en cm entre deux antécédents
            deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
            lgt: 8, // taille de la première colonne en cm
            hauteurLignes: [15, 15]
          }))

          texteCorr = `D'après le tableau de variations :<br>$\\bullet$  $${a1}\\in[${x1};${x2}]$, intervalle sur lequel la fonction est croissante<br>`
          texteCorr += ` <br>$\\bullet  ${a3}\\in[${x2};${x3}]$, intervalle sur lequel la fonction est décroissante. <br>`
          texteCorr += `La fonction $f$ n'est donc pas monotone sur $[${a1};${a3}]$<br><br>`
          texteCorr += ` Le tableau de variations ne permet pas de comparer $f(${a1})$ et $f(${a3})$. <br>`
          texteCorr += '<br>On ne peut donc pas conclure sans plus d\'informations.'
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
