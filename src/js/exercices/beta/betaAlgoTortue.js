// on importe les fonctions nécessaires.
 Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
// Ici ce sont les fonctions de la librairie maison 2d.js qui gèrent tout ce qui est graphique (SVG/tikz) et en particulier ce qui est lié à l'objet lutin
import { angleScratchTo2d, orienter, mathalea2d, scratchblock, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, leveCrayon, grille, tracePoint, point, ajouterAx, ajouterAy } from '../../modules/2d.js'
export const titre = 'Tortue Scratch'

export default function AlgoTortue () { // ça c'est la classe qui permet de créer cet exercice
  'use strict'
  Exercice.call(this) // la classe parente qui définit les attributs commun à tous les exercices
  this.titre = titre
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.pasDeVersionLatex = false
  this.pas_de_version_HMTL = false
  this.typeExercice = 'Scratch'
  this.listePackages = 'scratch3'
  this.sup = 7 // 7 instructions par défaut, paramètre réglable.
  this.sup2 = 1 // types d'instructionsde déplacement (ici seulement avancer et tourner)

  this.nouvelleVersion = function (numeroExercice) { 
    this.listeQuestions = []
    this.listeCorrections = []
    const objetsEnonce = []
    const paramsCorrection = { pixelsParCm: 20, scale: 0.5 }
    const sequences = [ // séquences d'intruction pré-établies, on en choisit une parmi celles-ci
      ['avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerD'],
      ['avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG', 'ajouter à y', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerD', 'ajouter à x', 'tournerG', 'avancer', 'tournerG', 'ajouter à y', 'tournerD', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'ajouter à y', 'tournerG', 'avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerD', 'ajouter à y', 'tournerD', 'ajouter à y', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG']
    ]
    let choix
    if (parseInt(this.sup2) === 1) {
      choix = randint(0, 3) // si le paramètre est à 1 (defaut) on choisit parmi les 4 premières séquences
    } else {
      choix = randint(4, 7) // sinon, on choisit parmi les 4 dernières
    }
    const commandes = combinaisonListesSansChangerOrdre(sequences[choix], parseInt(this.sup)) // on crée la succession de commandes en répétant la séquence choisie si le nombre d'instructions demandées dépasse la longueur de la séquence
    let val1, val2
    const lutin = creerLutin() // Ici on crée une instance de l'objet Lutin.
    lutin.color = 'green' // la couleur de la trace
    lutin.epaisseur = 3 // son epaisseur
    lutin.pointilles = 2 // le type de pointillés (on peut mettre false pour avoir un trait plein)
    const angleDepart = choice([-90, 0, 90, 180]) // On choisit l'orientation de départ
    const xDepart = 0 // Le départ est en (0,0) pour avoir la même marge dans toutes les directions
    const yDepart = 0 // Mais on pourrait envisager de changer ça et de recadrer...
    context.unitesLutinParCm = 10 // avancer de 10 pour le lutin lui fait parcourir 1cm (en fait 0,5cm car j'ai ajouté un scale=0.5 pour la sortie latex)
    context.pixelsParCm = 20 // 20 pixels d'écran représentent 1cm (enfin ça dépend du zoom, donc c'est juste un réglage par défaut)

    let texte = '' // la chaine qui va contenir l'énoncé
    let texteCorr = '' // la chaine qui va contenir la correction
    // On écrit le début du programme dans l'attribut codeScratch du lutin... cet attribut de type chaine contient le code du programme du lutin en Scratch Latex
    // A chaque instruction ajoutée dans le programme correspond une action à effectuée sur l'objet lutin..
    lutin.codeScratch = '\\begin{scratch}[print,fill,blocks]\n \\blockinit{quand \\greenflag est cliqué}\n '
    lutin.codeScratch += `\\blockmove{aller à x: \\ovalnum{${xDepart}} y: \\ovalnum{${yDepart}}}\n ` // ça c'est pour ajouter la brique scratch
    allerA(xDepart, yDepart, lutin) // ça c'est pour faire bouger le lutin (écrire le programme ne le fait pas exécuter !)
   
    lutin.codeScratch += '\\blockpen{stylo en position d\'écriture}\n'
    baisseCrayon(lutin)  // à partir de là, le lutin laissera une trace (ses positions successives sont enregistrées dans lutin.listeTraces)
    lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${angleDepart}}}\n`
    orienter(angleScratchTo2d(angleDepart), lutin) // l'angle 2d est l'angle trigonométrique... Scratch est décallé de 90°, il faut donc convertir pour utiliser Orienter()

    for (let i = 0; i < parseInt(this.sup); i++) { // On va parcourir la listes des commandes de déplacement
      switch (commandes[i]) {
        case 'avancer':
          val1 = randint(1, 4) * 10 // La longueur du déplacement est 10, 20, 30 ou 40
          lutin.codeScratch += `\\blockmove{avancer de \\ovalnum{${val1}} pas}\n`
          avance(val1, lutin)
          break
        case 'tournerD' : // On peut difficilement choisir autre chose que de tourner de 90°... on aurait pu faire 180° aussi...
          lutin.codeScratch += '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}\n'
          tournerD(90, lutin)
          break
        case 'tournerG' :
          lutin.codeScratch += '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}\n'
          tournerG(90, lutin)
          break
        case 'ajouter à x' : // Je n'aime pas trop utiliser ceci ne sachant pas si la progression se fait déjà horizontalement ou pas...
          val1 = randint(1, 4) * 10
          lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${val1}}  à  x}\n`
          ajouterAx(val1, lutin)
          break
        case 'ajouter à y' :
          val1 = randint(1, 4) * 10
          lutin.codeScratch += `\\blockmove{ajouter \\ovalnum{${val1}}  à  y}\n`
          ajouterAy(val1, lutin)
          break
        case 'aller à' : // Là c'est encore pire... on peut très bien se retrouver... à l'endroit ou l'on est déjà !
          val1 = randint(-3, 3) * 10
          val2 = randint(-3, 3) * 10
          lutin.codeScratch += `\\blockmove{aller à x: \\ovalnum{${val1}} y: \\ovalnum{${val2}}}\n `
          allerA(val1, val2, lutin)
          break
        case "s'orienter à" :
          val1 = choice([0, -90, 90, 180])
          lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${val1}}}\n`
          orienter(angleScratchTo2d(val1), lutin)
          break
      }
    }

    lutin.codeScratch += '\\blockpen{relever le stylo}\n'
    leveCrayon(lutin)

    lutin.codeScratch += '\\end{scratch}'

    texte = 'Dessine la figure tracée par le lutin à l\'éxécution du programme ci-dessous.<br>'
    objetsEnonce.push(lutin)

    if (context.isHtml) { // On crée 2 colonnes selon le contexte html / Latex
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}[t]{.25\\textwidth}'
    }
    texte += scratchblock(lutin.codeScratch) // la fonction scratchblock va convertir le code Latex en code html si besoin.

    if (context.isHtml) { // on change de colonne...
      texte += '</td><td>'
      texte += '    '
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
    }
    paramsCorrection.xmin = lutin.xMin - 1.5
    paramsCorrection.ymin = lutin.yMin - 1.5
    paramsCorrection.xmax = lutin.xMax + 1.5
    paramsCorrection.ymax = lutin.yMax + 1.5
// mathalea2d() est la fonction qui ajoute soit une figure SVG (en html), soit une figure tikz en Latex. Ici, juste la grille est le point de départ.
    texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, scale: 0.5 }, grille(-10, -10, 10, 10), tracePoint(point(0, 0)))
    if (context.isHtml) {
      texte += '</td><td>'
    } else {
      texte += '\\end{minipage} '
    }
    // Ici, la figure contient la grille, le point de départ et le lutin qui s'anime sur sa trace...
    texteCorr += '<br><br>' + mathalea2d(paramsCorrection, grille(-10, -10, 10, 10), tracePoint(point(0, 0)), lutin)
    this.listeQuestions.push(texte) // on met à jour la liste des questions
    this.listeCorrections.push(texteCorr) // et la liste des corrections
    listeQuestionsToContenuSansNumero(this) // on envoie tout à la fonction qui va mettre en forme.
  }
  this.besoinFormulaireNumerique = ["Nombre d'instructions"] // gestion des paramètres supplémentaires
  this.besoinFormulaire2Numerique = ["Type d'instructions", '1 : sans calcul\n 2: Avec calcul']
}
