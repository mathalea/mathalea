import Exercice from '../Exercice.js'
import { mathalea2d, tableau_de_variation } from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, abs, pgcd, texFractionReduite, miseEnEvidence, texFraction, texSymbole } from '../../modules/outils.js'

export const titre = 'Résoudre une inéquation produit ou quotient'

/**
 * Résoudre inéquation produit ou quotient
 * * Type 1 : (x+a)(x+b)<0
 * * Type 2 : (x+a)(x+b)(x+c)<0
 * * Type 3 : (ax+b)(cx+d)<0
 * * Type 4 : (x+a)/(x+b)<0
 * * Tous les types
 * @author Guillaume Valmont
 * 2N61-2
 */
export default function ExerciceInequation2 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les inéquations suivantes'
  this.spacing = 2 // Espace entre deux lignes
  this.spacingCorr = 2 // Espace entre deux lignes pour la correction
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false // Désactive la correction détaillée par défaut
  this.sup = 1 // Choix du type d'inéquation
  this.nbQuestions = 5 // Choix du nombre de questions
  this.listePackages = 'tkz-tab' // Pour la compilation LateX des tableaux de signes
  this.nbCols = 1 // Fixe le nombre de colonnes pour la sortie LateX

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions // Stockera la liste des types de questions
    // Convertit le paramètre this.sup en type de question
    switch (this.sup.toString()) {
      case '1':
        listeTypeDeQuestions = ['(x+a)(x+b)<0']
        break
      case '2':
        listeTypeDeQuestions = ['(x+a)(x+b)(x+c)<0']
        break
      case '3':
        listeTypeDeQuestions = ['(ax+b)(cx+d)<0']
        break
      case '4':
        listeTypeDeQuestions = ['(x+a)/(x+b)<0']
        break
      default:
        listeTypeDeQuestions = [
          '(x+a)(x+b)<0',
          '(x+a)(x+b)(x+c)<0',
          '(ax+b)(cx+d)<0',
          '(x+a)/(x+b)<0'
        ]
        break
    }
    // Crée une liste randomisée de types de questions respectant le nombre (this.nbQuestions) et le type (this.sup) de questions passés en paramètre
    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions
    )
    // Crée une liste d'autant de signes que de questions
    const signes = combinaisonListes(['<', '>', '≤', '≥'], this.nbQuestions)
    // Boucle principale qui servira à créer toutes les questions // On limite le nombre d'essais à 50 pour chercher des valeurs nouvelles
    for (let i = 0, a, b, c, d, pGauche, pDroite, texte, ligne1, ligne2, ligne3, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Génère 4 nombres relatifs a, b, c et d tous différents avec a et c qui ne peuvent pas être 1 car ce sont ceux qui peuvent multiplier x pour éviter à la fois d'avoir '1x' et de diviser par 1
      a = randint(2, 13) * choice([-1, 1])
      b = randint(1, 13, a) * choice([-1, 1])
      c = randint(2, 13, [a, b]) * choice([-1, 1])
      d = randint(1, 13, [a, b, c]) * choice([-1, 1])
      // Pioche un signe d'inégalité parmi <, ≤, ≥, > et définit en fonction si les crochets seront ouverts ou fermés dans l'ensemble de solutions
      switch (signes[i]) {
        case '<':
          pGauche = ']'
          pDroite = '['
          break
        case '≤':
          pGauche = '['
          pDroite = ']'
          break
        case '>':
          pGauche = ']'
          pDroite = '['
          break
        case '≥':
          pGauche = '['
          pDroite = ']'
          break
      }
      // Fonction détaillant la résolution d'une équation de type x + val
      function resolutionDetailleeEquation (val) {
        texteCorr += `$x${ecritureAlgebrique(val)}${texSymbole('>')}0$ <br>`
        texteCorr += `$x${ecritureAlgebrique(val)}${miseEnEvidence(ecritureAlgebrique(-1 * val))}
        ${texSymbole('>')}${miseEnEvidence(ecritureAlgebrique(-1 * val))}$<br>`
        texteCorr += `$x${texSymbole('>')}${-val}$<br>`
      }
      // Prépare les quatre types de lignes possibles pour les tableaux avec 2 antécédents : + + - , + - -, - + + et - - +
      // Les lignes sont des tableaux qui alternent chaîne de caractère et 'nombre de pixels de largeur estimée du texte pour le centrage'
      // La première chaîne 'Line' indique que c'est pour un tableau de signes et valeurs ('Var' pour un tableau de variations)
      // 'R' indique qu'il n'y a rien à afficher (pour laisser un espace sous la borne par exemple)
      // ",'z', 20" pour avoir un zéro et ",'z', 0" pour avoir un trait vertical
      const lignePPM = ['Line', 30, '', 0, '+', 20, 'z', 0, '+', 20, 'z', 20, '-', 20]
      const lignePMM = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 0, '-', 20]
      const ligneMPP = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
      const ligneMMP = ['Line', 30, '', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(x+a)(x+b)<0'
      if (listeTypeDeQuestions[i] === '(x+a)(x+b)<0') {
        // Consigne
        texte = `$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})${texSymbole(signes[i])}0$`
        // Correction // Si une correction détaillée est demandée, détaille comment résoudre les équations
        texteCorr = texte + '<br>'
        // Première équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(a)
        }
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-a}$ <br>`
        // Deuxième équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(b)
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-b}$ <br>`
        // Prépare l'affichage du tableau de signes : la ligne1 correspond à (x + a) et la ligne2 correspond à (x + b)
        texteCorr += 'On peut donc en déduire le tableau de signes suivant : <br>'
        // Si la racine de x + a est inférieure à la racine de x + b, la ligne1 (celle de x + a) aura d'abord un 0, puis un | et ce sera l'inverse pour la ligne2
        if (Math.min(-a, -b) === -a) {
          ligne1 = ligneMPP
          ligne2 = ligneMMP
        } else { // Si la racine de x + a est supérieure à la racine de x + b, ligne2 et ligne1 sont inversées (pas d'égalité possible car a ≠ b)
          ligne1 = ligneMMP
          ligne2 = ligneMPP
        }
        // Affiche le tableau de signes : xmin détermine la marge à gauche, ymin la hauteur réservée pour le tableau, xmax la largeur réservée pour le tableau et ymax la marge au dessus du tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -8.5, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})$`, 2, 100]
            ],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            ['$-\\infty$', 30, `$${Math.min(-a, -b)}$`, 20, `$${Math.max(-a, -b)}$`, 20, '$+\\infty$', 30]
          ],
          // Les autres lignes du tableau dont le fonctionnement est expliqué plus haut
          tabLines: [ligne1, ligne2, ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]],
          colorBackground: '',
          escpl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 6, // taille de la première colonne en cm
          hauteurLignes: [15, 15, 15, 15],
          scale: 0.5
        }))
        // Affiche l'ensemble de solutions
        if ((signes[i] === '<' || signes[i] === '≤')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${Math.min(-a, -b)} , ${Math.max(-a, -b)} \\right${pDroite} $.`
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${Math.min(-a, -b)} \\right${pDroite} \\bigcup \\left${pGauche} ${Math.max(-a, -b)}, +\\infty \\right[ $.`
        }
      }
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(x+a)(x+b)(x+c)<0'
      if (listeTypeDeQuestions[i] === '(x+a)(x+b)(x+c)<0') {
        // Consigne
        texte = `$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})(x${ecritureAlgebrique(c)})${texSymbole(signes[i])}0$`
        // Correction // Si une correction détaillée est demandée, détaille comment résoudre les équations
        texteCorr = texte + '<br>'
        // Première équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(a)
        }
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-a}$ <br>`
        // Deuxième équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(b)
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-b}$ <br>`
        // Troisième équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(c)
        }
        texteCorr += `$x${ecritureAlgebrique(c)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-c}$ <br>`
        // On range les racines dans l'ordre croissant pour pouvoir les mettre dans l'ordre dans le tableau
        const racines = [-a, -b, -c].sort(function (a, b) { return a - b })
        const lignes = [-a, -b, -c]
        // Pour chaque ligne, on cherche la racine correspondante
        for (let j = 0; j < 3; j++) {
          for (let n = 0; n < 3; n++) {
            if (racines[n] === lignes[j]) {
              if (n === 0) { // La racine d'indice 0 est la plus petite des trois, et donc celle la plus à gauche dans le tableau donc le 0 (, 'z', 20) est en première position et les autres sont des | (, 'z', 0)
                lignes[j] = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20, 'z', 0, '+', 20]
              } else if (n === 1) { // La racine d'indice 1 est la deuxième racine, donc le 0 (, 'z', 20) en deuxième position et les autres sont des | (, 'z', 0)
                lignes[j] = ['Line', 30, '', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20, 'z', 0, '+', 20]
              } else if (n === 2) { // La racine d'indice 2 est la plus grande des racines, donc le 0 (, 'z', 20) est en troisième position et les autres sont des | (, 'z', 0)
                lignes[j] = ['Line', 30, '', 0, '-', 20, 'z', 0, '-', 20, 'z', 0, '-', 20, 'z', 20, '+', 20]
              }
            }
          }
        }
        // Affiche le tableau de signes (voir les commentaires du premier type d'exercice)
        texteCorr += 'On peut donc en déduire le tableau de signes suivant : <br>'
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.5, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$x${ecritureAlgebrique(c)}$`, 2, 50], [`$(x${ecritureAlgebrique(a)})(x${ecritureAlgebrique(b)})(x${ecritureAlgebrique(c)})$`, 2, 150]
            ],
            ['$-\\infty$', 30, `$${racines[0]}$`, 20, `$${racines[1]}$`, 20, `$${racines[2]}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [lignes[0], lignes[1], lignes[2], ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]],
          colorBackground: '',
          escpl: 3.5,
          deltacl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 15, 15],
          scale: 0.5
        }))
        // Affiche l'ensemble de solutions
        if ((signes[i] === '<' || signes[i] === '≤')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${racines[0]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[1]} , ${racines[2]} \\right${pDroite} $.`
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${racines[0]} , ${racines[1]} \\right${pDroite} \\bigcup \\left${pGauche} ${racines[2]}, +\\infty \\right[ $.`
        }
      }
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(ax+b)(cx+d)<0'
      if (listeTypeDeQuestions[i] === '(ax+b)(cx+d)<0') {
        let valPetit, valGrand
        texte = `$(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte
        // Si une correction détaillée est demandée, détaille comment résoudre les équations
        if (this.correctionDetaillee) {
          // Utilise la fonction décrite juste après pour éviter d'écrire deux fois la même chose pour les deux inéquations ax + b > 0 et cx + d > 0
          ecrireCorrectionDetaillee(a, b)
          ecrireCorrectionDetaillee(c, d)
          // Fonction écrivant la correction détaillée d'une inéquation du type var1*x + var2 > 0
          function ecrireCorrectionDetaillee (var1, var2) {
            // Détaille les étapes de la résolution en mettant en évidence les calculs réalisés.
            texteCorr += `<br>$${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ <br>`
            texteCorr += `$${var1}x${ecritureAlgebrique(var2)}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}
            ${texSymbole('>')}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}$<br>`
            texteCorr += `$${var1}x${texSymbole('>')}${-var2}$<br>`
            // Si var1 < 0, l'inégalité change de sens
            if (var1 < 0) {
              texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1) +
                texSymbole('<'))}${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
              texteCorr += `$x${texSymbole('<')}${texFraction(-var2, var1)}$`
              texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-var2, var1)}$`
            } else { // sinon elle ne change pas de sens
              texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}
                ${texSymbole('>')}${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
              texteCorr += `$x${texSymbole('>')} ${texFraction(-var2, var1)}$`
              texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${texFractionReduite(-var2, var1)}$`
            }
          }
        } else { // Si pas de correction détaillée, écrit simplement les conclusions, en changeant le sens des inégalités si a < 0 ou si c < 0
          if (a < 0) {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-b, a)}$`
          } else {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')} ${texFractionReduite(-b, a)}$`
          }
          if (c < 0) {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ lorsque $x${texSymbole('<')} ${texFractionReduite(-d, c)}$`
          } else {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')} ${texFractionReduite(-d, c)}$`
          }
        }
        // Prépare l'affichage du tableau de signes
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
        // Part du principe que la plus petite solution est celle de la première équation
        if (-b / a < -d / c) { // Si la plus petite solution est celle de la première équation
          if (a > 0) { // La ligne1 change de signe en premier donc ligne1 = PMM ou MPP selon le signe de a
            ligne1 = ligneMPP
          } else {
            ligne1 = lignePMM
          }
          if (c > 0) { // La ligne 2 change de signe en deuxième donc ligne2 = PPM ou MMP selon le signe de c
            ligne2 = ligneMMP
          } else {
            ligne2 = lignePPM
          }
          valPetit = texFractionReduite(-b, a) // la plus petite valeur est la solution de la première équation
          valGrand = texFractionReduite(-d, c) // la plus grande valeur est la solution de la deuxième équation
        } else { // Si la plus petite solution est celle de la deuxième équation
          if (a > 0) { // La ligne1 change de signe en deuxième donc ligne1 = PPM ou MMP selon le signe de a
            ligne1 = ligneMMP
          } else {
            ligne1 = lignePPM
          }
          if (c > 0) { // La ligne 2 change de signe en premier donc ligne2 = PMM ou MPP selon le signe de c
            ligne2 = ligneMPP
          } else {
            ligne2 = lignePMM
          }
          valPetit = texFractionReduite(-d, c) // la plus petite valeur est la solution de la deuxième équation
          valGrand = texFractionReduite(-b, a) // la plus grande valeur est la solution de la première équation
        }
        // Détermine la dernière ligne selon le signe du coefficient dominant
        if (a * c > 0) {
          ligne3 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
        } else {
          ligne3 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        }
        // Affiche enfin le tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -13, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 3, 30], [`$${a}x${ecritureAlgebrique(b)}$`, 3, 75], [`$${c}x${ecritureAlgebrique(d)}$`, 3, 75], [`$(${a}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`, 3, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          escpl: 3.5,
          deltacl: 0.8,
          lgt: 8,
          hauteurLignes: [15, 15, 15, 15],
          scale: 0.5
        }))
        // Affiche l'ensemble de solutions selon le sens de l'inégalité
        if ((signes[i] === '<' || signes[i] === '≤')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${valPetit} , ${valGrand} \\right${pDroite} $.`
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${valPetit} \\right${pDroite} \\bigcup \\left${pGauche} ${valGrand}, +\\infty \\right[ $.`
        }
      }
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(x+a)/(x+b)<0'
      if (listeTypeDeQuestions[i] === '(x+a)/(x+b)<0') {
        // Consigne
        texte = `$\\cfrac{(x${ecritureAlgebrique(a)})}{(x${ecritureAlgebrique(b)})}${texSymbole(signes[i])}0$`
        // Correction // Si une correction détaillée est demandée, détaille comment résoudre les équations
        texteCorr = texte + '<br>'
        // Première équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(a)
        }
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-a}$ <br>`
        // Deuxième équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(b)
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ lorsque $x${texSymbole('>')}${-b}$ <br>`
        // Prépare l'affichage du tableau
        texteCorr += 'On peut donc en déduire le tableau de signes suivant : <br>'
        if (Math.min(-a, -b) === -a) { // Si la plus petite solution est celle de la première équation (au numérateur), la première ligne change de signe en premier
          ligne1 = ligneMPP
          ligne2 = ligneMMP
          ligne3 = ['Line', 50, '', 0, '+', 20, 'z', 20, '-', 20, 'd', 20, '+', 20] // Le dénominateur change de signe en deuxième donc la double barre (, 'd', 20) intervient en deuxième
        } else { // Sinon, la deuxième ligne change de signe en premier
          ligne1 = ligneMMP
          ligne2 = ligneMPP
          ligne3 = ['Line', 50, '', 0, '+', 20, 'd', 20, '-', 20, 'z', 20, '+', 20] // Le dénominateur change de signe en premier donc la double barre (, 'd', 20) intervient en premier
        }
        // Affichage du tableau de signes
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.5, xmax: 30, ymax: 0.5 }, tableau_de_variation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$\\cfrac{(x${ecritureAlgebrique(a)})}{(x${ecritureAlgebrique(b)})}$`, 2, 50]
            ],
            ['$-\\infty$', 30, `$${Math.min(-a, -b)}$`, 20, `$${Math.max(-a, -b)}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          escpl: 3.5,
          deltacl: 0.8,
          lgt: 4,
          hauteurLignes: [15, 15, 15, 25],
          scale: 0.5
        }))
        // Affiche l'ensemble de solutions selon le sens de l'inégalité et selon l'ordre des racines (l'intervalle sera toujours ouvert pour la racine du dénominateur)
        if (Math.min(-a, -b) === -a) {
          if ((signes[i] === '<' || signes[i] === '≤')) {
            texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${-a} , ${-b} \\right[ $.`
          } else if ((signes[i] === '>' || signes[i] === '≥')) {
            texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${-a} \\right${pDroite} \\bigcup \\left] ${-b}, +\\infty \\right[ $.`
          }
        } else {
          if ((signes[i] === '<' || signes[i] === '≤')) {
            texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${-b} , ${-a} \\right${pDroite} $.`
          } else if ((signes[i] === '>' || signes[i] === '≥')) {
            texteCorr += `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty , ${-b} \\right[ \\bigcup \\left${pGauche} ${-a}, +\\infty \\right[ $.`
          }
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // Choisit le type de question à l'aide d'un formulaire numérique (la réponse sera stockée dans this.sup)
  this.besoinFormulaireNumerique = [
    "Type d'inéquation",
    5,
    '1: (x+a)(x+b)<0\n2: (x+a)(x+b)(x+c)<0\n3: (ax+b)(cx+d)<0\n4: (x+a)/(x+b)<0\n5: Tous les types précédents'
  ]
}
