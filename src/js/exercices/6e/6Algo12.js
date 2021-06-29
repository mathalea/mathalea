// on importe les fonctions nécessaires.
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, combinaisonListesSansChangerOrdre, shuffle, calcul } from '../../modules/outils.js'
// Ici ce sont les fonctions de la librairie maison 2d.js qui gèrent tout ce qui est graphique (SVG/tikz) et en particulier ce qui est lié à l'objet lutin
import { angleScratchTo2d, orienter, mathalea2d, scratchblock, creerLutin, avance, tournerD, tournerG, baisseCrayon, allerA, leveCrayon, grille, tracePoint, point, segment, texteParPointEchelle, texteParPoint } from '../../modules/2d.js'
import { afficheScore } from '../../modules/gestionInteractif.js'
export const interactifReady = true
// il y avait un fonctionnement avec amcType cf commit 3ae7c43
export const interactifType = 'custom' // La correction doit être gérée dans l'exercice avec la méthode this.correctionInteractive()
export const amcReady = true
export const amcType = 1

export const titre = 'Trouver le bon tracé'
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
  this.sup = 9 // 7 instructions par défaut, paramètre réglable.
  this.sup2 = 1 // types d'instructionsde déplacement (ici seulement avancer et tourner)

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = []
    this.listeCorrections = []
    const angleDepart = 90 // On choisit l'orientation de départ (On pourrait en faire un paramètre de l'exo)
    const xDepart = 0 // Le départ est en (0,0) pour avoir la même marge dans toutes les directions
    const yDepart = 0
    const objetsCorrection = []
    const paramsEnonces = {}
    const paramsCorrection = {}
    const sequences = [ // séquences d'intruction pré-établies, on en choisit une parmi celles-ci
      ['tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer'],
      ['tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer'],
      ['tournerD', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer'],
      ['tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer'],
      ['avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG'],
      ['avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD'],
      ['avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG'],
      ['tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer'],
      ['tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer'],
      ['tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer', 'tournerD', 'avancer'],
      ['tournerG', 'avancer', 'tournerD', 'avancer', 'tournerG', 'avancer', 'tournerG', 'avancer', 'tournerD', 'avancer']
    ]
    let erreursDeDeplacement = [0, 1, 0]
    erreursDeDeplacement = combinaisonListesSansChangerOrdre(erreursDeDeplacement, parseInt(this.sup))
    const choix = randint(0, 11) // On va choisir une des 12 sequences
    const commandes = combinaisonListesSansChangerOrdre(sequences[choix], parseInt(this.sup)) // on crée la succession de commandes en répétant la séquence choisie si le nombre d'instructions demandées dépasse la longueur de la séquence
    const val = []
    const lutins = []

    // Ici on crée 5 instances de l'objet Lutin.
    for (let i = 0; i < 5; i++) {
      lutins[i] = creerLutin()
      lutins[i].color = 'green' // la couleur de la trace
      lutins[i].epaisseur = 3 // son epaisseur
    }
    context.unitesLutinParCm = 10 // avancer de 10 pour le lutin lui fait parcourir 1cm (en fait 0,5cm car j'ai ajouté un scale=0.5 pour la sortie latex)
    context.pixelsParCm = 20 // 20 pixels d'écran représentent 1cm (enfin ça dépend du zoom, donc c'est juste un réglage par défaut)

    let texte = '' // la chaine qui va contenir l'énoncé
    let texteCorr = '' // la chaine qui va contenir la correction
    // On écrit le début du programme dans l'attribut codeScratch du lutins[0][0]... cet attribut de type chaine contient le code du programme du lutin en Scratch Latex
    // A chaque instruction ajoutée dans le programme correspond une action à effectuée sur l'objet lutins[0]..
    lutins[0].codeScratch = '\\begin{scratch}[print,fill,blocks,scale=0.75]\n \\blockinit{quand \\greenflag est cliqué}\n '
    lutins[0].codeScratch += `\\blockmove{aller à x: \\ovalnum{${xDepart}} y: \\ovalnum{${yDepart}}}\n ` // ça c'est pour ajouter la brique scratch
    lutins[0].codeScratch += `\\blockmove{s'orienter à \\ovalnum{${angleDepart}}}\n`
    lutins[0].codeScratch += '\\blockpen{stylo en position d\'écriture}\n'
    for (let i = 0; i < 5; i++) {
      allerA(0, 0, lutins[i]) // ça c'est pour faire bouger le lutin (écrire le programme ne le fait pas exécuter !)
      baisseCrayon(lutins[i])
      orienter(angleScratchTo2d(angleDepart), lutins[i])// l'angle 2d est l'angle trigonométrique... Scratch est décallé de 90°, il faut donc convertir pour utiliser Orienter()
    }
    for (let i = 0; i < parseInt(this.sup); i++) { // On va parcourir la listes des commandes de déplacement mais certains lutins font des erreurs
      switch (commandes[i]) {
        case 'avancer':
          val[i] = randint(1, 4) * 5 // La longueur du déplacement est 10, 20, 30 ou 40
          lutins[0].codeScratch += `\\blockmove{avancer de \\ovalnum{${val[i]}} pas}\n`
          avance(val[i], lutins[0])
          avance(val[i], lutins[1])
          avance(val[i], lutins[2])
          avance(val[i], lutins[3])
          avance(val[i] + 5 * erreursDeDeplacement[i], lutins[4]) // avance trop
          break
        case 'tournerD' : // On peut difficilement choisir autre chose que de tourner de 90°...
          lutins[0].codeScratch += '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}\n'
          tournerD(90, lutins[0])
          tournerD(90, lutins[2])
          orienter(90, lutins[4])
          tournerG(90, lutins[1]) // tournent dans le mauvais sens
          tournerG(90, lutins[3])
          break
        case 'tournerG' :
          lutins[0].codeScratch += '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}\n'
          tournerG(90, lutins[0])
          tournerG(90, lutins[1])
          tournerG(90, lutins[4])
          tournerD(90, lutins[2]) // tournent dans le mauvais sens
          tournerD(90, lutins[3])
          break
     /*   case 'ajouter à x' : // Je n'aime pas trop utiliser ceci ne sachant pas si la progression se fait déjà horizontalement ou pas...
          val[i] = randint(1, 4) * 10
          lutins[0].codeScratch += `\\blockmove{ajouter \\ovalnum{${val[i]}}  à  x}\n`
          ajouterAx(val[i], lutins[0])
          break
        case 'ajouter à y' :
          val[i] = randint(1, 4) * 10
          lutins[0].codeScratch += `\\blockmove{ajouter \\ovalnum{${val[i]}}  à  y}\n`
          ajouterAy(val[i], lutins[0])
          break
        case 'aller à' : // Là c'est encore pire... on peut très bien se retrouver... à l'endroit ou l'on est déjà !
          val[i] = randint(-3, 3) * 10
          val2 = randint(-3, 3) * 10
          lutins[0].codeScratch += `\\blockmove{aller à x: \\ovalnum{${val[i]}} y: \\ovalnum{${val2}}}\n `
          allerA(val[i], val2, lutins[0])
          break
        case "s'orienter à" :
          val[i] = choice([0, -90, 90, 180])
          lutins[0].codeScratch += `\\blockmove{s'orienter à \\ovalnum{${val[i]}}}\n`
          orienter(angleScratchTo2d(val[i]), lutins[0])
          break
          */
      }
    }
    lutins[0].codeScratch += '\\blockpen{relever le stylo}\n'

    let largeur = 1
    let hauteur = 1
    for (let i = 0; i < 5; i++) { // on calcule la largeur et la hauteur maximale des parcours.
      leveCrayon(lutins[i])
      largeur = Math.max(largeur, lutins[i].xMax - lutins[i].xMin)
      hauteur = Math.max(hauteur, lutins[i].yMax - lutins[i].yMin)
    }
    largeur++
    lutins[0].codeScratch += '\\end{scratch}'
    texte = 'Quelle figure est tracée par le stylo à l\'éxécution du programme ci-dessous ?<br>Un carreau représente 5 pas<br>Le tracé démarre à la croix bleue.<br>'
    texte += "S'orienter à 90° signifie s'orienter vers la droite de l'écran.<br>"
    /*
    lutins[0].animation = `${colibri}
   x="${lutins[0].listeTraces[0][0] * context.pixelsParCm}"
    y="${-lutins[0].listeTraces[0][1] * context.pixelsParCm}">\n
    <animateMotion path="M ${lutins[0].listeTraces[0][0] * context.pixelsParCm} ${-lutins[0].listeTraces[0][1] * context.pixelsParCm} L`

    for (let i = 0; i < lutins[0].listeTraces.length; i++) {
      const B = point(lutins[0].listeTraces[i][2], lutins[0].listeTraces[i][3])
      lutins[0].animation += ` ${B.xSVG(context.pixelsParCm)} ${B.ySVG(context.pixelsParCm)} `
    }
    lutins[0].animation += '" begin="0s" dur="5s" repeatCount="indefinite" />;'
    objetsEnonce.push(lutins[0])
*/
    if (context.isHtml) { // On crée 2 colonnes selon le contexte html / Latex
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}{.25\\textwidth}'
    }
    texte += scratchblock(lutins[0].codeScratch) // la fonction scratchblock va convertir le code Latex en code html si besoin.
    if (context.isHtml) { // on change de colonne...
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}{.74\\textwidth}'
    }
    let ordreLutins = [0, 1, 2, 3, 4]
    ordreLutins = shuffle(ordreLutins) // On mélange les emplacements pour éviter d'avoir la bonne réponse au même endroit
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < lutins[i].listeTraces.length; j++) { // On recadre les traces des lutins...
        lutins[i].listeTraces[j][0] -= lutins[i].xMin
        lutins[i].listeTraces[j][2] -= lutins[i].xMin
        lutins[i].listeTraces[j][1] -= lutins[i].yMin
        lutins[i].listeTraces[j][3] -= lutins[i].yMin
      }
    }
    const depart = []
    for (let i = 0; i < 5; i++) { // ajouter le point de départ de chaque tracé
      depart[i] = tracePoint(point(lutins[i].listeTraces[0][0], lutins[i].listeTraces[0][1]))
      depart[i].taille = 5
      depart[i].color = 'blue'
      depart[i].epaisseur = 2
      if (i === 0) {
        objetsCorrection.push(depart[0])
      }
    }
    const echelle = segment(0, hauteur + 0.5, 1, hauteur + 0.5)
    echelle.epaisseur = 2
    echelle.styleExtremites = '|-|'
    objetsCorrection.push(grille(-1, -1, largeur + 1), hauteur + 1, 'gray', 0.5, 0.5)
    objetsCorrection.push(lutins[0])
    paramsEnonces.xmin = -0.5
    paramsEnonces.ymin = -1.5
    paramsEnonces.xmax = largeur
    paramsEnonces.ymax = hauteur + 1
    paramsEnonces.pixelsParCm = Math.round(200 / largeur)
    paramsEnonces.scale = calcul(2 / largeur)
    paramsEnonces.style = ''
    paramsCorrection.xmin = -0.5
    paramsCorrection.ymin = -0.5
    paramsCorrection.xmax = largeur
    paramsCorrection.ymax = hauteur + 1
    paramsCorrection.pixelsParCm = Math.round(200 / largeur)
    paramsCorrection.scale = calcul(2 / largeur)

    // mathalea2d() est la fonction qui ajoute soit une figure SVG (en html), soit une figure tikz en Latex. Ici, juste la grille est le point de départ.
    for (let i = 0; i < 5; i++) {
      paramsEnonces.id = `figure${i}exo${numeroExercice}`
      texte += mathalea2d(paramsEnonces,
        lutins[ordreLutins[i]],
        depart[ordreLutins[i]],
        grille(-0.5, -0.5, largeur, hauteur + 1, 'gray', 0.5, 0.5),
        texteParPoint('10 pas', point(0.5, hauteur + 0.2), 'milieu', 'black', 1),
        texteParPoint(`figure ${i + 1}`, point((lutins[ordreLutins[i]].xMax - lutins[ordreLutins[i]].xMin) / 2, -0.8), 'milieu', 'black', 1),
        echelle)
    }
    if (context.isHtml) {
      texte += '</td></tr>'
      texte += `<div id="resultatCheckEx${this.numeroExercice}Q${0}"></div>`
    } else {
      texte += '\\end{minipage} '
    }
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        propositions: [
          {
            texte: 'figure 1',
            statut: false
          },
          {
            texte: 'figure 2',
            statut: false
          },
          {
            texte: 'figure 3',
            statut: false
          },
          {
            texte: 'figure 4',
            statut: false
          },
          {
            texte: 'figure 5',
            statut: false
          }
        ],
        options: { ordered: true }
      }
      this.autoCorrection[0].propositions[ordreLutins.indexOf(0)].statut = true
    }
    this.indiceBonneFigure = ordreLutins.indexOf(0)
    // Ici, la figure contient la grille, le point de départ et le lutin qui s'anime sur sa trace...
    texteCorr += `La bonne figure est la figure ${this.indiceBonneFigure + 1}`

    texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    this.listeQuestions.push(texte) // on met à jour la liste des questions
    this.listeCorrections.push(texteCorr) // et la liste des corrections

    listeQuestionsToContenuSansNumero(this) // on envoie tout à la fonction qui va mettre en forme.
  }
  this.besoinFormulaireNumerique = ["Nombre d'instructions"] // gestion des paramètres supplémentaires
  // Gestion de la souris
  document.addEventListener('exercicesAffiches', () => {
    // Dès que l'exercice est affiché, on rajoute des listenners sur chaque Svg.
    for (let i = 0; i < 5; i++) {
      const figSvg = document.getElementById(`figure${i}exo${this.numeroExercice}`)
      figSvg.addEventListener('mouseover', mouseOverSvgEffect)
      figSvg.addEventListener('mouseout', mouseOutSvgEffect)
      figSvg.addEventListener('click', mouseSvgClick)
      figSvg.etat = false
    }
  })
  // Pour pouvoir récupérer this dans la correction interactive
  const exercice = this
  // Gestion de la correction
  this.correctionInteractive = (elt) => {
    let nbBonnesReponses = 0
    let nbMauvaisesReponses = 0
    let nbFiguresCliquees = 0
    const divFeedback = document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${0}`)
    const figures = []
    for (let i = 0; i < 5; i++) {
      const figure = document.getElementById(`figure${i}exo${this.numeroExercice}`)
      figures.push(figure)
      figure.removeEventListener('mouseover', mouseOverSvgEffect)
      figure.removeEventListener('mouseout', mouseOutSvgEffect)
      figure.removeEventListener('click', mouseSvgClick)
      if (figure.etat) nbFiguresCliquees++
    }
    if (nbFiguresCliquees === 1 && figures[exercice.indiceBonneFigure].etat) {
      divFeedback.innerHTML = '😎'
      nbBonnesReponses++
    } else {
      divFeedback.innerHTML = '☹️'
      nbMauvaisesReponses++
    }
    afficheScore(this, nbBonnesReponses, nbMauvaisesReponses)
  }
}

function mouseOverSvgEffect () {
  this.style.border = 'inset'
}
function mouseOutSvgEffect () {
  this.style.border = 'none'
}
function mouseSvgClick () {
  if (this.etat) {
    // Déja choisi, donc on le réinitialise
    this.style.border = 'none'
    this.addEventListener('mouseover', mouseOverSvgEffect)
    this.addEventListener('mouseout', mouseOutSvgEffect)
    this.addEventListener('click', mouseSvgClick)
    this.etat = false
  } else {
    // Passe à l'état choisi donc on désactive les listenners pour over et pour out
    this.removeEventListener('mouseover', mouseOverSvgEffect)
    this.removeEventListener('mouseout', mouseOutSvgEffect)
    this.style.border = 'solid #f15929'
    this.etat = true
  }
}
