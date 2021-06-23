// on importe les fonctions nécessaires.
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, choice, combinaisonListesSansChangerOrdre } from '../../modules/outils.js'
// Ici ce sont les fonctions de la librairie maison 2d.js qui gèrent tout ce qui est graphique (SVG/tikz) et en particulier ce qui est lié à l'objet lutin
import { angleScratchTo2d, orienter, mathalea2d, scratchblock, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, leveCrayon, grille, tracePoint, point, ajouterAx, ajouterAy, segment, texteParPosition } from '../../modules/2d.js'
export const titre = 'Tortue Scratch'
export const colibri = `<g transform="translate(-15,10) scale(0.0025,-0.0025)"
fill="#000000" stroke="none">
<path d="M3 12694 c21 -342 271 -746 807 -1308 567 -593 1692 -1486 2805
-2226 315 -209 292 -200 -80 30 -1067 661 -2063 1399 -2803 2075 -92 84 -274
262 -406 396 -131 134 -236 234 -233 224 3 -11 9 -36 12 -55 4 -19 22 -67 40
-106 113 -247 413 -568 900 -964 597 -486 1699 -1223 2633 -1759 96 -56 123
-77 50 -40 -87 44 -510 286 -748 427 -804 477 -1792 1142 -2599 1749 -68 51
-126 91 -128 89 -9 -9 36 -93 81 -153 105 -139 388 -383 701 -605 487 -345
1282 -831 2023 -1237 72 -40 132 -75 132 -77 0 -6 -13 1 -500 264 -864 466
-1554 849 -2030 1127 -96 56 -197 114 -223 130 l-49 28 33 -54 c46 -76 243
-269 382 -373 377 -282 1112 -705 1817 -1044 378 -181 612 -292 767 -362 90
-41 161 -75 160 -77 -2 -1 -77 29 -168 68 -716 309 -1889 796 -2254 935 l-140
53 76 -72 c287 -274 976 -624 1884 -957 201 -74 765 -264 815 -275 19 -5 30
-10 23 -12 -17 -6 -614 147 -1098 282 -372 104 -613 177 -954 291 -173 57
-316 102 -319 99 -9 -8 18 -86 43 -124 153 -238 825 -518 1870 -779 154 -39
308 -76 343 -82 34 -7 61 -15 58 -17 -2 -2 -150 23 -328 56 -563 105 -1202
208 -1533 246 -77 9 -152 18 -167 21 -37 7 -36 -10 4 -71 85 -128 337 -248
712 -339 252 -62 645 -125 971 -156 265 -25 272 -28 50 -23 -252 6 -675 -10
-856 -33 -138 -17 -223 -34 -318 -66 l-64 -21 34 -18 c75 -38 257 -72 500 -93
238 -21 753 -30 1049 -17 140 5 256 9 257 7 2 -2 -59 -8 -134 -15 -501 -43
-1015 -133 -1221 -212 -90 -34 -167 -78 -155 -89 15 -14 102 -40 176 -51 47
-8 150 -10 297 -6 234 6 454 30 755 82 221 38 234 39 90 1 -514 -132 -868
-274 -974 -390 l-24 -26 109 0 c188 0 451 37 869 122 320 65 321 65 185 24
-300 -90 -563 -196 -687 -280 -68 -45 -143 -122 -143 -146 0 -28 182 -30 355
-5 186 28 502 98 704 156 57 17 105 28 107 26 2 -2 -24 -12 -58 -22 -109 -33
-394 -142 -503 -194 -182 -86 -302 -178 -264 -202 22 -14 208 -10 331 7 129
17 379 70 547 114 63 17 116 29 118 27 1 -2 -36 -18 -85 -37 -202 -76 -414
-189 -563 -302 l-82 -62 29 -8 c37 -11 254 7 386 32 171 31 351 74 511 121 38
11 71 19 73 17 2 -2 -40 -21 -94 -42 -129 -51 -362 -164 -437 -213 -70 -47
-125 -96 -125 -113 0 -14 159 -8 279 11 35 5 65 8 67 7 1 -2 -36 -36 -84 -75
-176 -144 -463 -430 -648 -643 -667 -771 -1306 -1849 -2011 -3390 -177 -387
-462 -1049 -636 -1480 -53 -129 -111 -272 -131 -317 -19 -46 -34 -83 -31 -83
2 0 65 118 141 263 959 1833 1655 2845 2222 3231 231 157 408 212 810 251
1683 165 2900 433 3902 857 323 137 660 319 1130 608 317 195 489 274 668 305
245 44 541 -14 922 -182 69 -31 131 -60 139 -67 20 -15 248 -281 336 -391 432
-539 950 -1315 1387 -2080 59 -104 108 -187 108 -183 0 15 -180 390 -346 718
-358 711 -756 1417 -1190 2112 -96 154 -133 222 -167 315 -143 382 -358 743
-599 1009 -348 383 -749 609 -1233 692 -140 24 -535 23 -688 -1 -401 -64 -739
-178 -1170 -393 l-147 -74 -148 -16 c-147 -15 -392 -49 -437 -60 -22 -5 -29 5
-109 168 -189 387 -346 662 -819 1433 -349 569 -500 832 -652 1140 -256 518
-384 914 -458 1415 -3 21 -8 16 -31 -35 -264 -569 104 -1569 1031 -2801 62
-83 158 -207 213 -275 l101 -124 -87 90 c-186 194 -457 522 -649 785 -383 524
-682 1073 -825 1515 -12 39 -26 74 -31 79 -14 16 -32 -78 -32 -174 -1 -253
125 -567 388 -966 255 -386 613 -819 1024 -1238 86 -87 141 -148 122 -135 -19
12 -145 133 -281 268 -438 437 -840 924 -1224 1481 -59 85 -115 166 -126 180
l-19 25 0 -60 c-1 -83 21 -162 78 -280 131 -269 427 -633 885 -1090 133 -132
194 -197 136 -145 -303 275 -978 970 -1117 1150 -21 27 -42 49 -46 50 -10 0 1
-87 20 -165 17 -71 66 -180 115 -256 54 -84 55 -87 32 -68 -1540 1282 -1830
1528 -2339 1984 -669 600 -1265 1196 -1723 1725 -73 85 -139 157 -144 159 -8
3 -9 -27 -5 -95z m3222 -3562 c-3 -3 -11 0 -18 7 -9 10 -8 11 6 5 10 -3 15 -9
12 -12z m6551 -2326 c108 -50 178 -128 194 -217 35 -188 -183 -300 -392 -202
-176 83 -244 266 -140 376 30 32 72 56 117 68 54 14 162 2 221 -25z"/>
</g>
`
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
      ['tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer'],
      ['tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer'],
      ['avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG'],
      ['tournerG', 'avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG', 'ajouter à y', 'tournerG', 'avancer'],
      ['ajouter à y', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'ajouter à y', 'tournerD', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'ajouter à y', 'tournerG', 'avancer', 'tournerG', 'ajouter à x', 'tournerD', 'avancer', 'tournerG'],
      ['tournerD', 'ajouter à x', 'ajouter à y', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'aller à', 'tournerG']
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
    const angleDepart = 90 // On choisit l'orientation de départ
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
    lutin.codeScratch += `\\blockmove{s'orienter à \\ovalnum{${angleDepart}}}\n`
    lutin.codeScratch += '\\blockpen{stylo en position d\'écriture}\n'
    baisseCrayon(lutin) // à partir de là, le lutin laissera une trace (ses positions successives sont enregistrées dans lutin.listeTraces)

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
    console.log(lutin.codeScratch)
    texte = 'Dessine la figure tracée par le lutin à l\'éxécution du programme ci-dessous.<br>Un carreau représente 10 pas<br>'

    lutin.animation = `${colibri} 
   x="${lutin.listeTraces[0][0] * context.pixelsParCm}"
    y="${-lutin.listeTraces[0][1] * context.pixelsParCm}">\n
    <animateMotion path="M ${lutin.listeTraces[0][0] * context.pixelsParCm} ${-lutin.listeTraces[0][1] * context.pixelsParCm} L`

    for (let i = 0; i < lutin.listeTraces.length; i++) {
      const B = point(lutin.listeTraces[i][2], lutin.listeTraces[i][3])
      lutin.animation += ` ${B.xSVG(context.pixelsParCm)} ${B.ySVG(context.pixelsParCm)} `
    }
    lutin.animation += '" begin="0s" dur="5s" repeatCount="indefinite" />;'
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
    const echelle = segment(-9, 9, -8, 9)
    echelle.styleExtremites = '|-|'
    // mathalea2d() est la fonction qui ajoute soit une figure SVG (en html), soit une figure tikz en Latex. Ici, juste la grille est le point de départ.
    texte += mathalea2d({ xmin: -10, ymin: -10, xmax: 10, ymax: 10, scale: 0.5 },
      grille(-10, -10, 10, 10),
      echelle,
      tracePoint(point(0, 0)),
      texteParPosition('10 pas', -8.5, 8.5)
    )
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
