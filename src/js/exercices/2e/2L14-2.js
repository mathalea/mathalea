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
 * * Type 4 : (ax+b)/(cx+d)+e<0
 * * Tous les types
 * @author Guillaume Valmont
 * 2L14-2
 * 17/07/2021
 */
export default function ExerciceInequationQuotient () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Résoudre les inéquations suivantes'
  this.spacing = 2 // Espace entre deux lignes
  this.spacingCorr = 2 // Espace entre deux lignes pour la correction
  this.correctionDetailleeDisponible = true
  this.correctionDetaillee = false // Désactive la correction détaillée par défaut
  this.sup = 1 // Choix du type d'inéquation
  this.nbQuestions = 1 // Choix du nombre de questions
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
    for (let i = 0, a, b, c, d, pGauche, pDroite, texte, ligne1, ligne2, ligne3, ecart, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Génère 4 nombres relatifs a, b, c et d tous différents avec a et c qui ne peuvent pas être 1 car ce sont ceux qui peuvent multiplier x pour éviter à la fois d'avoir '1x' et de diviser par 1
      a = randint(-13, 13, [0, 1, -1])
      b = randint(-13, 13, [0, a])
      c = randint(-13, 13, [0, 1, -1, a, b])
      d = randint(-13, 13, [0, a, b, c])
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
      // '' indique qu'il n'y a rien à afficher (pour laisser un espace sous la borne par exemple)
      // ",'z', 20" pour avoir un zéro sur des pointillés et ",'t', 5" pour juste avoir les pointillés
      const lignePPM = ['Line', 30, '', 0, '+', 20, 't', 5, '+', 20, 'z', 20, '-', 20]
      const lignePMM = ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 't', 5, '-', 20]
      const ligneMPP = ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 't', 5, '+', 20]
      const ligneMMP = ['Line', 30, '', 0, '-', 20, 't', 5, '-', 20, 'z', 20, '+', 20]
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Génère la consigne (texte) et la correction (texteCorr) pour les questions de type '(x+a)/(x+b)<0'                                     Type 1        //
      // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        if (context.isHtml) {
          ecart = 2
        } else {
          ecart = 4
        }
        // Affichage du tableau de signes
        texteCorr += mathalea2d({ xmin: -0.5, ymin: -10.1, xmax: 30, ymax: 0.1, scale: 0.5 }, tableauDeVariation({
          tabInit: [
            [
              ['$x$', 2, 30], [`$x${ecritureAlgebrique(a)}$`, 2, 50], [`$x${ecritureAlgebrique(b)}$`, 2, 50], [`$\\cfrac{(x${ecritureAlgebrique(a)})}{(x${ecritureAlgebrique(b)})}$`, ecart, 50]
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
