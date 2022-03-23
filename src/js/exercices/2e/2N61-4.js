import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { mathalea2d, tableauDeVariation } from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, combinaisonListes, ecritureAlgebrique, ecritureParentheseSiNegatif, texFractionReduite, miseEnEvidence, texFraction, texSymbole } from '../../modules/outils.js'

export const titre = 'Résoudre une inéquation quotient'

/**
 * Résoudre une inéquation quotient
 * * Type 1 : (x+a)/(x+b)<0
 * * Type 2 : (ax+b)/(cx+d)<0
 * * Type 3 : (ax+b)/[(cx+d)(ex+f)]<0
 * * Type 4 : (ax+b)/(cx+d)²<0
 * * Type 5 : (ax+b)/(cx+d)+e<0
 * * Tous les types
 * @author Guillaume Valmont
 * 2N61-4, ex 2L14-2
 * 17/07/2021
 */
export default function ExerciceInequationQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.spacing = 2 // Espace entre deux lignes
  this.spacingCorr = 2 // Espace entre deux lignes pour la correction
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false // Désactive la correction détaillée par défaut
  this.sup = 1 // Choix du type d'inéquation
  this.nbQuestions = 1 // Choix du nombre de questions
  if (this.nbQuestions.toString() === '1') {
    this.consigne = 'Résoudre l\'inéquation suivante :'
  } else {
    this.consigne = 'Résoudre les inéquations suivantes :'
  }
  this.listePackages = 'tkz-tab' // Pour la compilation LateX des tableaux de signes
  this.nbCols = 1 // Fixe le nombre de colonnes pour les énoncés de la sortie LateX
  this.nbColsCorr = 1 // Fixe le nombre de colonnes pour les réponses de la sortie LateX

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let listeTypeDeQuestions // Stockera la liste des types de questions
    // Convertit le paramètre this.sup en type de question
    switch (this.sup.toString()) {
      case '1':
        listeTypeDeQuestions = ['(x+a)/(x+b)<0']
        break
      case '2':
        listeTypeDeQuestions = ['(ax+b)/(cx+d)<0']
        break
      case '3':
        listeTypeDeQuestions = ['(ax+b)/[(cx+d)(ex+f)]<0']
        break
      case '4':
        listeTypeDeQuestions = ['(ax+b)/(cx+d)²<0']
        break
      case '5':
        listeTypeDeQuestions = ['(ax+b)/(cx+d)+e<0']
        break
      default:
        listeTypeDeQuestions = [
          '(x+a)/(x+b)<0',
          '(ax+b)/(cx+d)<0',
          '(ax+b)/[(cx+d)(ex+f)]<0',
          '(ax+b)/(cx+d)²<0',
          '(ax+b)/(cx+d)+e<0'
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
    for (let i = 0, a, b, c, d, e, f, pGauche, pDroite, texte, ligne1, ligne2, ligne3, ligne4, ecart, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Génère 4 nombres relatifs a, b, c et d tous différents avec a et c qui ne peuvent pas être 1 car ce sont ceux qui peuvent multiplier x pour éviter à la fois d'avoir '1x' et de diviser par 1
      a = randint(-13, 13, [0, 1, -1])
      b = randint(-13, 13, [0, a])
      c = randint(-13, 13, [0, 1, -1, a, b])
      d = randint(-13, 13, [0, a, b, c, (b * c) / a]) // Pour éviter que ax + b et cx + d n'aient la même racine
      e = randint(-13, 13, [0, 1, -1, a, b, c, d])
      f = randint(-13, 13, [0, a, b, c, d, e, (b * e) / a, (d * e) / c]) // Pour éviter que (ax + b et ex + f) ou (cx + d et ex + f) n'aient la même racine
      // Augmente la hauteur des lignes sur la sortie pdf
      if (context.isHtml) {
        ecart = 2
      } else {
        ecart = 4
      }
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
      function resolutionDetailleeEquation (val, egal) {
        let symbole = texSymbole('>')
        if (egal) {
          symbole = '='
        }
        texteCorr += `$x${ecritureAlgebrique(val)}${symbole}0$ <br>`
        texteCorr += `$x${ecritureAlgebrique(val)}${miseEnEvidence(ecritureAlgebrique(-1 * val))}
        ${symbole}${miseEnEvidence(ecritureAlgebrique(-1 * val))}$<br>`
        texteCorr += `$x${symbole}${-val}$<br>`
      }
      // Fonction écrivant la correction détaillée d'une inéquation du type var1*x + var2 > 0
      function ecrireCorrectionDetaillee (var1, var2, egal) {
        let symbolePlusGrand = texSymbole('>')
        let symbolePlusPetit = texSymbole('<')
        if (egal) {
          symbolePlusGrand = '='
          symbolePlusPetit = '='
        }
        // Détaille les étapes de la résolution en mettant en évidence les calculs réalisés.
        texteCorr += `<br>$${var1}x${ecritureAlgebrique(var2)}${symbolePlusGrand}0$ <br>`
        texteCorr += `$${var1}x${ecritureAlgebrique(var2)}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}
        ${symbolePlusGrand}${miseEnEvidence(ecritureAlgebrique(-1 * var2))}$<br>`
        texteCorr += `$${var1}x${symbolePlusGrand}${-var2}$<br>`
        // Si var1 < 0, l'inégalité change de sens
        if (var1 < 0) {
          texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}`
          if (egal) { // On met en évidence un > qui se change en <, pas un = qui ne change pas
            texteCorr += symbolePlusPetit
          } else {
            texteCorr += miseEnEvidence(symbolePlusPetit)
          }
          texteCorr += `${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
          texteCorr += `$x${symbolePlusPetit}${texFraction(-var2, var1)}$`
          texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${symbolePlusGrand}0$ si et seulement si $x${symbolePlusPetit} ${texFractionReduite(-var2, var1)}$`
        } else { // sinon elle ne change pas de sens
          texteCorr += `$${var1}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}
            ${symbolePlusGrand}${-var2 + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(var1))}$<br>`
          texteCorr += `$x${symbolePlusGrand} ${texFraction(-var2, var1)}$`
          texteCorr += `<br>Donc $${var1}x${ecritureAlgebrique(var2)}${symbolePlusGrand}0$ si et seulement si $x${symbolePlusGrand}${texFractionReduite(-var2, var1)}$`
        }
      }
      // Prépare les quatre types de lignes possibles pour les tableaux avec 2 antécédents : + + - , + - -, - + + et - - +
      // Les lignes sont des tableaux qui alternent chaîne de caractère et 'nombre de pixels de largeur estimée du texte pour le centrage'
      // La première chaîne 'Line' indique que c'est pour un tableau de signes et valeurs ('Var' pour un tableau de variations)
      // '' indique qu'il n'y a rien à afficher (pour laisser un espace sous la borne par exemple)
      // ",'z', 20" pour avoir un zéro sur des pointillés et ",'t', 5" pour juste avoir les pointillés
      const lignePPM = ['Line', 30, '', 0, '+', 20, 't', 5, '+', 20, 'z', 20, '-', 20]
      const lignePMM = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 't', 5, '-', 20]
      const ligneMPP = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 't', 5, '+', 20]
      const ligneMMP = ['Line', 30, '', 0, '-', 20, 't', 5, '-', 20, 'z', 20, '+', 20]
      // Prépare les six types de lignes possibles pour les tableaux avec 3 antécédents : +++-, ++--, +---, ---+, --++, -+++
      const lignePPPM = ['Line', 30, '', 0, '+', 20, 't', 5, '+', 20, 't', 5, '+', 20, 'z', 20, '-', 20]
      const lignePPMM = ['Line', 30, '', 0, '+', 20, 't', 5, '+', 20, 'z', 20, '-', 20, 't', 5, '-', 20]
      const lignePMMM = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 't', 5, '-', 20, 't', 5, '-', 20]
      const ligneMPPP = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 't', 5, '+', 20, 't', 5, '+', 20]
      const ligneMMPP = ['Line', 30, '', 0, '-', 20, 't', 5, '-', 20, 'z', 20, '+', 20, 't', 5, '+', 20]
      const ligneMMMP = ['Line', 30, '', 0, '-', 20, 't', 5, '-', 20, 't', 5, '-', 20, 'z', 20, '+', 20]
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(x+a)/(x+b)<0'                                     Type 1        //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (listeTypeDeQuestions[i] === '(x+a)/(x+b)<0') {
        // Consigne
        texte = `$\\cfrac{x${ecritureAlgebrique(a)}}{x${ecritureAlgebrique(b)}}${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte + '<br>'
        texteCorr += '$\\bullet$ On commence par chercher les éventuelles valeurs interdites : <br>'
        resolutionDetailleeEquation(b, true)
        texteCorr += `Le quotient est défini sur $\\R ${texSymbole('\\')} \\{${-b}\\}$<br>`
        texteCorr += `$\\bullet$ On résout l'inéquation sur $\\R ${texSymbole('\\')} \\{${-b}\\}$<br>`
        // Si une correction détaillée est demandée, détaille comment résoudre les équations
        // Première équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(a)
        }
        texteCorr += `$x${ecritureAlgebrique(a)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')}${-a}$ <br>`
        // Deuxième équation
        if (this.correctionDetaillee) {
          resolutionDetailleeEquation(b)
        }
        texteCorr += `$x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')}${-b}$ <br>`
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
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$\\cfrac{x${ecritureAlgebrique(a)}}{x${ecritureAlgebrique(b)}}$`, ecart, 50]
            ],
            ['$-\\infty$', 30, `$${Math.min(-a, -b)}$`, 20, `$${Math.max(-a, -b)}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          espcl: 3.5,
          deltacl: 0.8,
          lgt: 8,
          hauteurLignes: [15, 15, 15, 25]
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
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(ax+b)/(cx+d)<0'                                   Type 2        //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (listeTypeDeQuestions[i] === '(ax+b)/(cx+d)<0') {
        let valPetit, valGrand
        texte = `$\\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}}${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte + '<br>'
        texteCorr += '$\\bullet$ On commence par chercher les éventuelles valeurs interdites :'
        ecrireCorrectionDetaillee(c, d, true)
        texteCorr += `<br>Le quotient est défini sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        texteCorr += `<br>$\\bullet$ On résout l'inéquation sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        // Si une correction détaillée est demandée, détaille comment résoudre les équations
        if (this.correctionDetaillee) {
          // Utilise la fonction décrite plus haut pour éviter d'écrire deux fois la même chose pour les deux inéquations ax + b > 0 et cx + d > 0
          ecrireCorrectionDetaillee(a, b)
          ecrireCorrectionDetaillee(c, d)
        } else { // Si pas de correction détaillée, écrit simplement les conclusions, en changeant le sens des inégalités si a < 0 ou si c < 0
          if (a < 0) {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-b, a)}$`
          } else {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-b, a)}$`
          }
          if (c < 0) {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-d, c)}$`
          } else {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-d, c)}$`
          }
        }
        // Prépare l'affichage du tableau de signes
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
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
        if (-b / a < -d / c) { // Si la valeur interdite est la deuxième (z au lieu de d)
          if (a * c > 0) {
            ligne3 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'd', 20, '+', 20]
          } else {
            ligne3 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'd', 20, '-', 20]
          }
        } else { // Sinon, la valeur interdite est la première
          if (a * c > 0) {
            ligne3 = ['Line', 30, '', 0, '+', 20, 'd', 20, '-', 20, 'z', 20, '+', 20]
          } else {
            ligne3 = ['Line', 30, '', 0, '-', 20, 'd', 20, '+', 20, 'z', 20, '-', 20]
          }
        }
        // Affiche enfin le tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.6, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2.5, 30], [`$${a}x${ecritureAlgebrique(b)}$`, 2, 75], [`$${c}x${ecritureAlgebrique(d)}$`, 2, 75], [`$\\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}}$`, ecart, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          espcl: 3.5,
          deltacl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 25]
        }))
        // Affiche l'ensemble de solutions selon le sens de l'inégalité
        let interieur, exterieur
        if (-b / a < -d / c) { // Si la valeur interdite est la deuxième (intervale forcément ouvert avec valGrand)
          interieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${valPetit} , ${valGrand} \\right[ $.`
          exterieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg${pDroite} \\bigcup \\bigg] ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        } else { // Si la valeur interdite est la première (invervalle forcément ouvert avec valPetit)
          interieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${valPetit} , ${valGrand} \\right${pDroite} $.`
          exterieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg[ \\bigcup \\bigg${pGauche} ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        }
        if ((signes[i] === '<' || signes[i] === '≤')) {
          if (a * c > 0) {
            texteCorr += interieur
          } else {
            texteCorr += exterieur
          }
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          if (a * c > 0) {
            texteCorr += exterieur
          } else {
            texteCorr += interieur
          }
        }
      }
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(ax+b)/[(cx+d)(ex+f)]<0'                                 Type 3  //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (listeTypeDeQuestions[i] === '(ax+b)/[(cx+d)(ex+f)]<0') {
        let valPetit, valMoyen, valGrand
        texte = `$\\cfrac{${a}x${ecritureAlgebrique(b)}}{(${c}x${ecritureAlgebrique(d)})(${e}x${ecritureAlgebrique(f)})}${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte + '<br>'
        texteCorr += '$\\bullet$ On commence par chercher les éventuelles valeurs interdites :'
        texteCorr += `<br>$(${c}x${ecritureAlgebrique(d)})(${e}x${ecritureAlgebrique(f)})=0$ si et seulement si $${c}x${ecritureAlgebrique(d)} = 0$ ou $${e}x${ecritureAlgebrique(f)} = 0$`
        ecrireCorrectionDetaillee(c, d, true)
        ecrireCorrectionDetaillee(e, f, true)
        texteCorr += `<br>Le quotient est défini sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}; ${texFractionReduite(-f, e)}\\}$`
        texteCorr += `<br>$\\bullet$ On résout l'inéquation sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}; ${texFractionReduite(-f, e)}\\}$`
        // Si une correction détaillée est demandée, détaille comment résoudre les inéquations
        if (this.correctionDetaillee) {
          // Utilise la fonction décrite plus haut pour éviter d'écrire deux fois la même chose pour les deux inéquations ax + b > 0 et cx + d > 0
          ecrireCorrectionDetaillee(a, b)
          ecrireCorrectionDetaillee(c, d)
          ecrireCorrectionDetaillee(e, f)
        } else { // Si pas de correction détaillée, écrit simplement les conclusions, en changeant le sens des inégalités si a < 0 ou si c < 0
          if (a < 0) {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-b, a)}$`
          } else {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-b, a)}$`
          }
          if (c < 0) {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-d, c)}$`
          } else {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-d, c)}$`
          }
          if (e < 0) {
            texteCorr += `<br>$${e}x${ecritureAlgebrique(f)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-f, e)}$`
          } else {
            texteCorr += `<br>$${e}x${ecritureAlgebrique(f)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-f, e)}$`
          }
        }
        // Prépare l'affichage du tableau de signes
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
        // zero1 correspond au 0 (z) ou à la double barres (d) correspondant au premier antécédent de la dernière ligne
        let zero1 = 'z'
        let zero2 = 'z'
        let zero3 = 'z'
        if (-b / a < -d / c && -b / a < -f / e) { // Si la plus petite solution est celle de la première équation
          if (a > 0) { // La ligne1 change de signe en premier donc ligne1 = PMMM ou MPPP selon le signe de a
            ligne1 = ligneMPPP
          } else {
            ligne1 = lignePMMM
          }
          valPetit = texFractionReduite(-b, a) // la plus petite valeur est la solution de la première équation
          zero2 = 'd' // les valeurs interdites sont donc les antécédents 2 et 3
          zero3 = 'd'
          if (-d / c < -f / e) { // Si la deuxième plus petite solution est celle de la deuxième équation
            if (c > 0) { // La ligne 2 change de signe en deuxième donc ligne2 = PPMM ou MMPP selon le signe de c
              ligne2 = ligneMMPP
            } else {
              ligne2 = lignePPMM
            }
            if (e > 0) { // La ligne 3 change de signe en troisième donc ligne3 = PPPM ou MMMP selon le signe de e
              ligne3 = ligneMMMP
            } else {
              ligne3 = lignePPPM
            }
            valMoyen = texFractionReduite(-d, c) // la moyenne valeur est la solution de la deuxième équation
            valGrand = texFractionReduite(-f, e) // la plus grande valeur est la solution de la troisième équation
          } else { // Si la deuxième plus petite solution est celle de la troisième équation
            if (c > 0) { // La ligne 2 change de signe en troisième donc ligne2 = PPPM ou MMMP selon le signe de c
              ligne2 = ligneMMMP
            } else {
              ligne2 = lignePPPM
            }
            if (e > 0) { // La ligne 3 change de signe en deuxième donc ligne3 = PPMM ou MMPP selon le signe de e
              ligne3 = ligneMMPP
            } else {
              ligne3 = lignePPMM
            }
            valMoyen = texFractionReduite(-f, e) // la moyenne valeur est la solution de la troisième équation
            valGrand = texFractionReduite(-d, c) // la plus grande valeur est la solution de la deuxième équation
          }
        } else if (-d / c < -b / a && -d / c < -f / e) { // Si la plus petite solution est celle de la deuxième équation
          if (c > 0) { // La ligne2 change de signe en premier donc ligne2 = PMMM ou MPPP selon le signe de c
            ligne2 = ligneMPPP
          } else {
            ligne2 = lignePMMM
          }
          valPetit = texFractionReduite(-d, c) // la plus petite valeur est la solution de la deuxième équation
          zero1 = 'd' // le premier antécédent est une valeur interdite
          if (-b / a < -f / e) { // Si la deuxième plus petite solution est celle de la première équation
            if (a > 0) { // La ligne 1 change de signe en deuxième donc ligne1 = PPMM ou MMPP selon le signe de a
              ligne1 = ligneMMPP
            } else {
              ligne1 = lignePPMM
            }
            if (e > 0) { // La ligne 3 change de signe en troisième donc ligne3 = PPPM ou MMMP selon le signe de e
              ligne3 = ligneMMMP
            } else {
              ligne3 = lignePPPM
            }
            valMoyen = texFractionReduite(-b, a) // la moyenne valeur est la solution de la première équation
            valGrand = texFractionReduite(-f, e) // la plus grande valeur est la solution de la troisième équation
            zero3 = 'd' // le troisième antécédent est une valeur interdite
          } else { // Si la deuxième plus petite solution est celle de la troisième équation
            if (a > 0) { // La ligne 1 change de signe en troisième donc ligne1 = PPPM ou MMMP selon le signe de a
              ligne1 = ligneMMMP
            } else {
              ligne1 = lignePPPM
            }
            if (e > 0) { // La ligne 3 change de signe en deuxième donc ligne3 = PPMM ou MMPP selon le signe de e
              ligne3 = ligneMMPP
            } else {
              ligne3 = lignePPMM
            }
            valMoyen = texFractionReduite(-f, e) // la moyenne valeur est la solution de la troisième équation
            zero2 = 'd' // le deuxième antécédent est une valeur interdite
            valGrand = texFractionReduite(-b, a) // la plus grande valeur est la solution de la première équation
          }
        } else { // Si la plus petite solution est celle de la troisième équation
          if (e > 0) { // La ligne 3 change de signe en premier donc ligne3 = PMMM ou MPPP selon le signe de e
            ligne3 = ligneMPPP
          } else {
            ligne3 = lignePMMM
          }
          valPetit = texFractionReduite(-f, e) // la plus petite valeur est la solution de la troisième équation
          zero1 = 'd' // le premier antécédent est une valeur interdite
          if (-b / a < -d / c) { // Si la deuxième plus petite solution est celle de la première équation
            if (a > 0) { // La ligne 1 change de signe en deuxième donc ligne1 = PPMM ou MMPP selon le signe de a
              ligne1 = ligneMMPP
            } else {
              ligne1 = lignePPMM
            }
            if (c > 0) { // La ligne 2 change de signe en troisième donc ligne2 = PPPM ou MMMP selon le signe de c
              ligne2 = ligneMMMP
            } else {
              ligne2 = lignePPPM
            }
            valMoyen = texFractionReduite(-b, a) // la moyenne valeur est la solution de la première équation
            valGrand = texFractionReduite(-d, c) // la plus grande valeur est la solution de la deuxième équation
            zero3 = 'd' // le troisième antécédent est une valeur interdite
          } else { // Si la deuxième plus petite solution est celle de la première équation
            if (a > 0) { // La ligne 1 change de signe en troisième donc ligne1 = PPPM ou MMMP selon le signe de a
              ligne1 = ligneMMMP
            } else {
              ligne1 = lignePPPM
            }
            if (c > 0) { // La ligne 2 change de signe en deuxième donc ligne2 = PPMM ou MMPP selon le signe de c
              ligne2 = ligneMMPP
            } else {
              ligne2 = lignePPMM
            }
            valMoyen = texFractionReduite(-d, c) // la moyenne valeur est la solution de la deuxième équation
            zero2 = 'd' // le deuxième antécédent est une valeur interdite
            valGrand = texFractionReduite(-b, a) // la plus grande valeur est la solution de la première équation
          }
        }
        // Détermine la dernière ligne selon le signe du coefficient dominant
        if (a * c * e > 0) {
          ligne4 = ['Line', 30, '', 0, '-', 20, zero1, 20, '+', 20, zero2, 20, '-', 20, zero3, 20, '+', 20]
        } else {
          ligne4 = ['Line', 30, '', 0, '+', 20, zero1, 20, '-', 20, zero2, 20, '+', 20, zero3, 20, '-', 20]
        }
        // Affiche enfin le tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -12.6, xmax: 40, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2.5, 30], [`$${a}x${ecritureAlgebrique(b)}$`, 2, 75], [`$${c}x${ecritureAlgebrique(d)}$`, 2, 75], [`$${e}x${ecritureAlgebrique(f)}$`, 2, 75], [`$\\cfrac{${a}x${ecritureAlgebrique(b)}}{(${c}x${ecritureAlgebrique(d)})(${e}x${ecritureAlgebrique(f)}}$`, ecart, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valMoyen}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3, ligne4],
          colorBackground: '',
          espcl: 3.5,
          deltacl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 15, 25]
        }))
        let solutions1et3
        let solutions2et4
        if (zero1 === 'z') { // Si le "vrai zéro" est en première position (les double barres en position 2 et 3), les crochets seront ouverts en valMoyen et valGrand
          solutions1et3 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg${pDroite} \\bigcup \\bigg] ${valMoyen}, ${valGrand} \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
          solutions2et4 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg${pGauche} ${valPetit} , ${valMoyen} \\bigg[ \\bigcup \\bigg] ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        } else if (zero2 === 'z') { // Si le "vrai zéro" est en deuxième position, les crochets seront ouverts en valPetit et valGrand
          solutions1et3 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg[ \\bigcup \\bigg${pGauche} ${valMoyen}, ${valGrand} \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
          solutions2et4 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] ${valPetit} , ${valMoyen} \\bigg${pDroite} \\bigcup \\bigg] ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        } else if (zero3 === 'z') { // Si le "vrai zéro" est en troisième position, les crochets seront ouverts en valPetit et valMoyen
          solutions1et3 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg[ \\bigcup \\bigg] ${valMoyen}, ${valGrand} \\bigg${pDroite} $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
          solutions2et4 = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] ${valPetit} , ${valMoyen} \\bigg[ \\bigcup \\bigg${pGauche} ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        }
        // Affiche l'ensemble de solutions selon le sens de l'inégalité
        if ((signes[i] === '<' || signes[i] === '≤')) {
          if (a * c * e > 0) {
            texteCorr += solutions1et3
          } else {
            texteCorr += solutions2et4
          }
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          if (a * c * e > 0) {
            texteCorr += solutions2et4
          } else {
            texteCorr += solutions1et3
          }
        }
      }
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(ax+b)/(cx+d)²<0'                                  Type 4        //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (listeTypeDeQuestions[i] === '(ax+b)/(cx+d)²<0') {
        let valPetit, valGrand
        texte = `$\\cfrac{${a}x${ecritureAlgebrique(b)}}{(${c}x${ecritureAlgebrique(d)})^2}${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte + '<br>'
        texteCorr += '$\\bullet$ On commence par chercher les éventuelles valeurs interdites :'
        texteCorr += `<br>$(${c}x${ecritureAlgebrique(d)})^2 = 0$ si et seulement si $${c}x${ecritureAlgebrique(d)} = 0$`
        ecrireCorrectionDetaillee(c, d, true)
        texteCorr += `<br>Le quotient est défini sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        texteCorr += `<br>$\\bullet$ On résout l'inéquation sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        // Si une correction détaillée est demandée, détaille comment résoudre les équations
        if (this.correctionDetaillee) {
          // Utilise la fonction décrite plus haut pour écrire la résolution détaillée de ax + b = 0 cx + d > 0
          ecrireCorrectionDetaillee(a, b)
          texteCorr += `<br>Un carré étant toujours positif, $(${c}x${ecritureAlgebrique(d)})^2 > 0$ pour tout $x$ différent de $${texFractionReduite(-d, c)}$.`
        } else { // Si pas de correction détaillée, écrit simplement les conclusions, en changeant le sens des inégalités si a < 0 ou si c < 0
          if (c < 0) {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-b, a)}$`
          } else {
            texteCorr += `<br>$${a}x${ecritureAlgebrique(b)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-b, a)}$`
          }
          texteCorr += `<br>Un carré étant toujours positif, $(${c}x${ecritureAlgebrique(d)})^2 > 0$ pour tout $x$ différent de $${texFractionReduite(-d, c)}$.`
        }
        // Prépare l'affichage du tableau de signes
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
        if (-d / c < -b / a) { // Si la première racine est la racine double
          ligne2 = ['Line', 30, '', 0, '+', 20, 'z', 20, '+', 20, 't', 20, '+', 20]
          valPetit = texFractionReduite(-d, c) // la plus petite valeur est la solution de la première équation
          valGrand = texFractionReduite(-b, a) // la plus grande valeur est la solution de la deuxième équation
          if (a > 0) {
            ligne1 = ['Line', 30, '', 0, '-', 20, 't', 20, '-', 20, 'z', 20, '+', 20]
            ligne3 = ['Line', 30, '', 0, '-', 20, 'd', 20, '-', 20, 'z', 20, '+', 20]
          } else {
            ligne1 = ['Line', 30, '', 0, '+', 20, 't', 20, '+', 20, 'z', 20, '-', 20]
            ligne3 = ['Line', 30, '', 0, '+', 20, 'd', 20, '+', 20, 'z', 20, '-', 20]
          }
        } else { // Si la racine double est la deuxième
          ligne2 = ['Line', 30, '', 0, '+', 20, 't', 20, '+', 20, 'z', 20, '+', 20]
          valPetit = texFractionReduite(-b, a) // la plus petite valeur est la solution de la deuxième équation
          valGrand = texFractionReduite(-d, c) // la plus grande valeur est la solution de la première équation
          if (a > 0) {
            ligne1 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 't', 20, '+', 20]
            ligne3 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'd', 20, '+', 20]
          } else {
            ligne1 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 't', 20, '-', 20]
            ligne3 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'd', 20, '-', 20]
          }
        }
        // Affiche le tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.6, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2.5, 30], [`$${a}x${ecritureAlgebrique(b)}$`, 2, 75], [`$(${c}x${ecritureAlgebrique(d)})^2$`, 2, 75], [`$\\cfrac{${a}x${ecritureAlgebrique(b)}}{(${c}x${ecritureAlgebrique(d)})^2}$`, ecart, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          espcl: 3.5,
          deltacl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 25]
        }))
        // Affiche l'ensemble de solutions selon le sens de l'inégalité
        let gauche
        let droite
        if (-d / c < -b / a) { // Si la première racine est la valeur interdite, on la prive à gauche
          gauche = `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty, ${texFractionReduite(-b, a)} \\right${pDroite} \\backslash \\{${texFractionReduite(-d, c)}\\} $.`
          droite = `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${texFractionReduite(-b, a)}, +\\infty \\right[ $.`
        } else { // Sinon, on la prive à droite
          gauche = `<br> L'ensemble de solutions de l'inéquation est $S = \\left] -\\infty, ${texFractionReduite(-b, a)} \\right${pDroite} $.`
          droite = `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${texFractionReduite(-b, a)}, +\\infty \\right[ \\backslash \\{${texFractionReduite(-d, c)}\\} $.`
        }
        if ((signes[i] === '<' || signes[i] === '≤')) {
          if (c > 0) {
            texteCorr += gauche
          } else {
            texteCorr += droite
          }
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          if (a * c > 0) {
            texteCorr += droite
          } else {
            texteCorr += gauche
          }
        }
      }
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(ax+b)/(cx+d)+e<0'                                 Type 5        //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (listeTypeDeQuestions[i] === '(ax+b)/(cx+d)+e<0') {
        let valPetit, valGrand
        texte = `$\\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}}${ecritureAlgebrique(e)} ${texSymbole(signes[i])}0$`
        // Correction
        texteCorr = texte + '<br>'
        texteCorr += '$\\bullet$ On commence par chercher les éventuelles valeurs interdites :'
        ecrireCorrectionDetaillee(c, d, true)
        texteCorr += `<br>Le quotient est défini sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        texteCorr += `<br>$\\bullet$ On résout l'inéquation sur $\\R ${texSymbole('\\')} \\{${texFractionReduite(-d, c)}\\}$`
        // Si une correction détaillée est demandée, détaille comment résoudre les équations
        if (this.correctionDetaillee) {
          texteCorr += `<br> $\\begin{aligned}
          \\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}} ${ecritureAlgebrique(e)} &= \\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}} ${ecritureAlgebrique(e)} \\times \\cfrac{${c}x${ecritureAlgebrique(d)}}{${c}x${ecritureAlgebrique(d)}} \\\\
          &= \\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}} + \\cfrac{${e * c}x${ecritureAlgebrique(e * d)}}{${c}x${ecritureAlgebrique(d)}} \\\\
          &= \\cfrac{${a}x${ecritureAlgebrique(b)} ${ecritureAlgebrique(e * c)}x${ecritureAlgebrique(e * d)}}{${c}x${ecritureAlgebrique(d)}} \\\\
          &= \\cfrac{${a + e * c}x${ecritureAlgebrique(b + e * d)}}{${c}x${ecritureAlgebrique(d)}}
          \\end{aligned}$`
          // Utilise la fonction décrite plus haut pour éviter d'écrire deux fois la même chose pour les deux inéquations ax + b > 0 et cx + d > 0
          ecrireCorrectionDetaillee(a + e * c, b + e * d)
          ecrireCorrectionDetaillee(c, d)
        } else { // Si pas de correction détaillée, écrit simplement les conclusions, en changeant le sens des inégalités si a < 0 ou si c < 0
          texteCorr += `<br> $\\cfrac{${a}x${ecritureAlgebrique(b)}}{${c}x${ecritureAlgebrique(d)}} ${ecritureAlgebrique(e)} = \\cfrac{${a + e * c}x${ecritureAlgebrique(b + e * d)}}{${c}x${ecritureAlgebrique(d)}}$`
          if (a + e * c < 0) {
            texteCorr += `<br>$${a + e * c}x${ecritureAlgebrique(b + e * d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-(b + e * d), a + e * c)}$`
          } else {
            texteCorr += `<br>$${a + e * c}x${ecritureAlgebrique(b + e * d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-(b + e * d), a + e * c)}$`
          }
          if (c < 0) {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('<')} ${texFractionReduite(-d, c)}$`
          } else {
            texteCorr += `<br>$${c}x${ecritureAlgebrique(d)}${texSymbole('>')}0$ si et seulement si $x${texSymbole('>')} ${texFractionReduite(-d, c)}$`
          }
        }
        // Prépare l'affichage du tableau de signes
        texteCorr += '<br>On peut donc en déduire le tableau de signes suivant : <br>'
        if (-(b + e * d) / (a + e * c) < -d / c) { // Si la plus petite solution est celle de la première équation
          if (a + e * c > 0) { // La ligne1 change de signe en premier donc ligne1 = PMM ou MPP selon le signe de a
            ligne1 = ligneMPP
          } else {
            ligne1 = lignePMM
          }
          if (c > 0) { // La ligne 2 change de signe en deuxième donc ligne2 = PPM ou MMP selon le signe de c
            ligne2 = ligneMMP
          } else {
            ligne2 = lignePPM
          }
          valPetit = texFractionReduite(-(b + e * d), a + e * c) // la plus petite valeur est la solution de la première équation
          valGrand = texFractionReduite(-d, c) // la plus grande valeur est la solution de la deuxième équation
        } else { // Si la plus petite solution est celle de la deuxième équation
          if (a + e * c > 0) { // La ligne1 change de signe en deuxième donc ligne1 = PPM ou MMP selon le signe de a
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
          valGrand = texFractionReduite(-(b + e * d), a + e * c) // la plus grande valeur est la solution de la première équation
        }
        // Détermine la dernière ligne selon le signe du coefficient dominant
        if (-(b + e * d) / (a + e * c) < -d / c) { // Si la valeur interdite est la deuxième (z au lieu de d)
          if ((a + e * c) * c > 0) {
            ligne3 = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'd', 20, '+', 20]
          } else {
            ligne3 = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'd', 20, '-', 20]
          }
        } else { // Sinon, la valeur interdite est la première
          if ((a + e * c) * c > 0) {
            ligne3 = ['Line', 30, '', 0, '+', 20, 'd', 20, '-', 20, 'z', 20, '+', 20]
          } else {
            ligne3 = ['Line', 30, '', 0, '-', 20, 'd', 20, '+', 20, 'z', 20, '-', 20]
          }
        }
        // Affiche enfin le tableau
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.6, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2.5, 30], [`$${a + e * c}x${ecritureAlgebrique(b + e * d)}$`, 2, 75], [`$${c}x${ecritureAlgebrique(d)}$`, 2, 75], [`$\\cfrac{${a + e * c}x${ecritureAlgebrique(b + e * d)}}{${c}x${ecritureAlgebrique(d)}}$`, ecart, 200]
            ],
            ['$-\\infty$', 30, `$${valPetit}$`, 20, `$${valGrand}$`, 20, '$+\\infty$', 30]
          ],
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          espcl: 3.5,
          deltacl: 0.8,
          lgt: 10,
          hauteurLignes: [15, 15, 15, 25]
        }))
        // Affiche l'ensemble de solutions selon le sens de l'inégalité
        let interieur, exterieur
        if (-(b + e * d) / (a + e * c) < -d / c) { // Si la valeur interdite est la deuxième (intervale forcément ouvert avec valGrand)
          interieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\left${pGauche} ${valPetit} , ${valGrand} \\right[ $.`
          exterieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg${pDroite} \\bigcup \\bigg] ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        } else { // Si la valeur interdite est la première (invervalle forcément ouvert avec valPetit)
          interieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\left] ${valPetit} , ${valGrand} \\right${pDroite} $.`
          exterieur = `<br> L'ensemble de solutions de l'inéquation est $S = \\bigg] -\\infty , ${valPetit} \\bigg[ \\bigcup \\bigg${pGauche} ${valGrand}, +\\infty \\bigg[ $.` // \\bigg au lieu de \\left et \\right pour que les parenthèses soient les mêmes des deux côtés s'il y a une fraction d'un côté et pas de l'autre
        }
        if ((signes[i] === '<' || signes[i] === '≤')) {
          if ((a + e * c) * c > 0) {
            texteCorr += interieur
          } else {
            texteCorr += exterieur
          }
        } else if ((signes[i] === '>' || signes[i] === '≥')) {
          if ((a + e * c) * c > 0) {
            texteCorr += exterieur
          } else {
            texteCorr += interieur
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
    '1: (x+a)/(x+b)<0\n2: (ax+b)/(cx+d)<0\n3: (ax+b)/[(cx+d)(ex+f)]<0\n4: (ax+b)/(cx+d)²<0\n5: (ax+b)/(cx+d)+e<0\n6: Tous les types précédents'
  ]
}
