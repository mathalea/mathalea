import Exercice from '../Exercice.js'
import { randint, texNombrec, miseEnEvidence, listeQuestionsToContenu, combinaisonListes, texNombre, texFractionReduite, reduireAxPlusB } from '../../modules/outils.js'
import { texteSurSegment, codeSegments, codageAngleDroit, segmentAvecExtremites, milieu, labelPoint, point, segment, texteParPosition, mathalea2d } from '../../modules/2d.js'
export const titre = 'Modéliser une situation géométrique à l\'aide d\'une équation'

/**
 * Description didactique de l'exercice
 * @author GillesM
 * Référence
 *  * A DEPLACER EN 2N50-4 !!!!!!!!!!!!!!!!!

*/
export default function modeliserEquationsGeometrie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 10
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.sup = 1 // Niveau de difficulté
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    const typeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4', 'typeE5', 'typeE6', 'typeE7', 'typeE8'] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, a, b, c, d, e, A, B, C, D, E, M, N, P, H, F, K, L, objets, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // Boucle principale où i+1 correspond au numéro de la question
      objets = []
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'typeE1':
          a = randint(1, 10)// valeur ajoutée
          d = randint(1, 10)// largeur
          b = randint(4 * d + 2 * a + 1, 50)// périmètre
          c = b - 2 * a - 2 * d
          A = point(0, 0, 'A', 'below')
          B = point(10, 0, 'B', 'below')
          C = point(10, 6, 'C')
          D = point(0, 6, 'D')

          objets.push(segment(A, B), segment(B, C), segment(D, A), segment(C, D), labelPoint(A, B, C, D))
          objets.push(texteParPosition(`x+${texNombrec(a)}`, milieu(C, D).x + 0, milieu(C, D).y + 0.7, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`${texNombrec(d)}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true))

          texte = ` Un rectangle a pour largeur $${d}$ cm et pour longueur $x$ cm.<br>
            En ajoutant $${a}$ cm à la longueur de ce rectangle, on obtient un nouveau rectangle dont le périmètre est $${b}$ cm.<br>
             Quelle est la longueur $x$ du rectangle initial ?<br>
              `
          texteCorr = ' On réalise une petite figure à main levée pour visualiser la situation :<br>'
          texteCorr += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
          texteCorr += `Le périmètre du rectangle obtenu est donnée par la formule : $2\\times (\\ell+L)$ avec $\\ell$ la largeur du rectangle et $L$ sa longueur. <br>
                  Comme $\\ell=${d}$ et $L=x+${a}$, le périmètre est donné en fonction de $x$ par :  $ 2(${d}+x+${a})=2(x+${a + d})=2x+${2 * a + 2 * d}$.<br>
       Puisque le périmètre du rectangle est $${b}$ cm, on cherche $x$ tel que :   $2x+${2 * a + 2 * d}=${b}$.<br>
       <br>
       $2x+${2 * a + 2 * d}=${b}$<br>
       <br>
       $2x+${2 * a + 2 * d}${miseEnEvidence(-2 * a - 2 * d)}=${b}${miseEnEvidence(-2 * a - 2 * d)}$<br>
       <br>
       $2x=${b - 2 * a - 2 * d}$<br>
       <br>
       $x=\\dfrac{${b - 2 * a - 2 * d}}{2}$<br>
       <br>
       $x=${texNombrec(c / 2)}$<br>
       <br>
       La longueur $x$ du rectangle initial est :  $${texNombrec(c / 2)}$ cm.
       `
          break
        case 'typeE2':

          a = randint(1, 10)
          d = randint(1, 5)// largeur
          b = randint(d * d + d * a + 1, 100)
          c = b - 2 * a - 2 * d

          A = point(0, 0, 'A', 'below')
          B = point(10, 0, 'B', 'below')
          C = point(10, 6, 'C')
          D = point(0, 6, 'D')

          objets.push(segment(A, B), segment(B, C), segment(D, A), segment(C, D), labelPoint(A, B, C, D))
          objets.push(texteParPosition(`x+${texNombrec(a)}`, milieu(C, D).x + 0, milieu(C, D).y + 0.7, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`${texNombrec(d)}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true))
          texte = ` Un rectangle a pour largeur $${d}$ cm et pour longueur $x$ cm.<br>
             En ajoutant $${a}$ cm à la longueur de ce rectangle, on obtient un nouveau rectangle dont l'aire est ${b} cm$^2$.<br>
              Quelle est la longueur $x$ du rectangle initial ? <br>
              On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`
          texteCorr = ' On réalise une petite figure à main levée pour visualiser la situation :<br>'
          texteCorr += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
          texteCorr += `L'aire du rectangle obtenu est donnée par la formule : $\\ell\\times L$ avec $\\ell$ la largeur du rectangle et $L$ sa longueur. <br>
                   Comme $\\ell=${d}$ et $L=x+${a}$, l'aire est donnée en fonction de $x$ par :  $ ${d}\\times (x+${a})=${d}x+${d * a}$.<br>
        Puisque l'aire du rectangle est $${b}$ cm, on cherche $x$ tel que :   $${d}x+${d * a}=${b}$.<br>
        <br>
        $${d}x+${d * a}=${b}$<br>
        <br>
        $${d}x${miseEnEvidence(-d * a)}=${b}${miseEnEvidence(-d * a)}$<br>
        <br>
        $${d}x=${b}-${d * a}$<br>
        <br>
        $\\dfrac{${d}x}{${miseEnEvidence(d)}}=\\dfrac{${b}-${d * a}}{${miseEnEvidence(d)}}$<br>
        <br>
        $x=\\dfrac{${b}-${d * a}}{${d}}$<br>
        <br>
        $x=${texFractionReduite(b - d * a, d)}$<br>
        <br>
        
        La longueur $x$ du rectangle initial est :  $${texFractionReduite(b - d * a, d)}$ cm.
        `
          break
        case 'typeE3':

          a = randint(1, 10)
          b = randint(a * a + 1, 100)
          A = point(0, 0, 'A', 'below')
          B = point(10, 0, 'B', 'below')
          C = point(0, 6, 'C')

          objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(B, A, C))
          objets.push(texteParPosition(`${texNombrec(a)}`, milieu(A, B).x + 0, milieu(A, B).y - 0.5, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('x', milieu(A, C).x - 0.5, milieu(A, C).y, 'milieu', 'black', 1, 'middle', true))
          texte = ` Un triangle $ABC$ est rectangle en $A$. On a $AB= ${a}$ cm  et $AC= x$ cm.<br>
         Sachant que le carré de son hypoténuse est $${b}$, déterminer la valeur exacte de $x$. `
          texteCorr = ' On réalise une petite figure à main levée pour visualiser la situation :<br>'
          texteCorr += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: true, scale: 0.7 }, objets)
          texteCorr += `Le carré de l'hypoténuse  est égal à $${b}$. On a donc $BC^2=${b}$.<br>
          Le triangle $ABC$ est rectangle en $A$, d'après le théorème de Pythagore :<br>
         <br>
         $AB^2+AC^2=BC^2$<br>
         <br>
         $${a * a}+x^2=${b}$<br>
         <br>
         $${a * a}+x^2${miseEnEvidence(-a * a)}=${b} ${miseEnEvidence(-a * a)}$<br>
         <br>
         $x^2=${b - a * a}$<br>
         <br>
         $x=\\sqrt{${b - a * a}}$ &nbsp;&nbsp;  car $x>0$<br>`

          if (b - a * a === 1 || b - a * a === 4 || b - a * a === 9 || b - a * a === 16 || b - a * a === 25 || b - a * a === 36 || b - a * a === 49 || b - a * a === 64 || b - a * a === 81 || b - a * a === 100) {
            texteCorr += `<br>
         $x=${Math.sqrt(b - a * a)}$<br>
         La valeur de $x$ cherchée est : $${Math.sqrt(b - a * a)}$.
         `
          } else {
            texteCorr += `<br>
         La valeur de $x$ cherchée est : $\\sqrt{${b - a * a}}$.
         `
          }
          break
        case 'typeE4':

          b = randint(1, 10)
          a = randint(b + 1, 15)

          M = point(0, 0, 'M', 'below')
          N = point(10, 0, 'N', 'below')
          P = point(0, 6, 'P')

          objets.push(segment(M, N), segment(N, P), segment(M, P), labelPoint(M, N, P), codageAngleDroit(N, M, P))
          objets.push(texteParPosition(`${texNombrec(a)}`, milieu(M, P).x - 0.5, milieu(M, P).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition('x', milieu(M, N).x + 0, milieu(M, N).y - 0.5, 'milieu', 'black', 1, 'middle', true),
            texteSurSegment(`$x+${texNombrec(b)}$`, P, N, 'black', 0.5))
          // texteParPosition(`$$x+$$${texNombrec(b)}`, milieu(P, N).x + 1, milieu(P, N).y, 0, 'black', 2, 'middle', true))
          texte = ` Un triangle $MNP$ est rectangle en $M$. On a $MP= ${a}$ cm  et $MN= x$ cm.<br>
             L'hypoténuse du triangle $MNP$ mesure  $${b}$ cm de plus que le côté $[MN]$.<br>
             Déterminer la valeur de $x$ sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant. `
          texteCorr = ' On réalise une petite figure à main levée pour visualiser la situation :<br>'
          texteCorr += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 20, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
          texteCorr += `Le triangle $MNP$ est rectangle en $M$, d'après le théorème de Pythagore :<br>
             <br>
             $MN^2+MP^2=PN^2$<br>
             <br>
             $x^2+${a}^2=(x+${b})^2$<br>
             <br>
             $x^2+${a * a}= x^2+2\\times x\\times ${b}+${b}^2$<br>
             <br>
             $x^2+${a * a}= x^2+${2 * b}x+${b * b}$<br>
             <br>
                    $${a * a}+\\cancel{x^2}=\\cancel{x^2}+${2 * b}x+${b * b} $<br>
             <br>
             $${2 * b}x+${b * b}=${a * a}$<br>
             <br>
                     $${2 * b}x+${b * b}${miseEnEvidence(-b * b)}=${a * a}${miseEnEvidence(-b * b)}$<br>
             <br>
             $${2 * b}x=${a * a - b * b}$<br>
             <br>
             $\\dfrac{${2 * b}x}{${miseEnEvidence(2 * b)}}=\\dfrac{${a * a - b * b}}{${miseEnEvidence(2 * b)}}$<br>
        <br>
             $x=${texFractionReduite(a * a - b * b, 2 * b)}$<br>
             <br>
             
       La valeur de $x$ cherchée est : $${texFractionReduite(a * a - b * b, 2 * b)}$.
       `

          break
        case 'typeE5':
          a = randint(1, 8)
          b = randint(a * a + 1, 100)

          texte = ` En augmentant le côté d'un carré de $${a}$ cm, son aire aumente de $${b}$ cm$^2$.<br>
      Quelle est la longueur du côté de ce carré ? <br>
      On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`
          texteCorr = `On note $x$ la longueur du côté du carré que l'on cherche.<br>
      La différence des aires entre les deux carrés est  $${b}$, on cherche $x$ tel que :   <br>
      $(x+${a})^2-x^2=${b}$<br>
      <br>
      $\\cancel{x^2}+ ${2 * a}x+${a}^2-\\cancel{x^2}=${b}$<br>
      <br>
      $ ${2 * a}x+${a * a}=${b}$<br>
      <br>
      $ ${2 * a}x+${a * a}${miseEnEvidence(-a * a)}=${b}${miseEnEvidence(-a * a)}$<br>
      <br>
      $ ${2 * a}x=${b}-${a * a}$<br>
      <br>
      $\\dfrac{${2 * a}x}{${miseEnEvidence(2 * a)}}=\\dfrac{${b - a * a}}{${miseEnEvidence(2 * a)}}$<br>
      <br>
           $x=${texFractionReduite(b - a * a, 2 * a)}$<br>
           <br>
           La longueur du côté du carré est : $${texFractionReduite(b - a * a, 2 * a)}$ cm.
 `

          break
        case 'typeE6':

          b = randint(1, 7) // petite base
          a = randint(b + 2, 14) // grande base
          d = (a - b) / 2
          e = randint(1, 10) * 2
          c = e * (a + b) / 2 // aire

          A = point(0, 0, 'A', 'below')
          H = point(9, 0, 'H', 'below')
          B = point(15, 0, 'B', 'below')
          C = point(15, 8, 'C')
          D = point(9, 8, 'D')
          E = point(0, -1, 'E')
          F = point(15, -1, 'F')

          objets.push(segment(A, D), segmentAvecExtremites(E, F), segment(A, B), segment(B, C), segment(D, C), segment(D, H), codageAngleDroit(A, B, C), codageAngleDroit(B, C, D), labelPoint(A, H, D, B, C), codageAngleDroit(B, H, D))
          objets.push(texteSurSegment(`${texNombre(b)} cm`, D, C, 'black', +0.5), texteSurSegment(`${texNombre(a)} cm`, E, F, 'black', -0.5), texteParPosition('x', milieu(B, C).x + 0.5, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true))

          texte = ' $ABCD$ est un trapèze rectangle.<br> '

          texte += 'Le schéma ci-dessous n\'est pas à l\'échelle.<br>' + mathalea2d({ xmin: -1, ymin: -2, xmax: 16, ymax: 10, pixelsParCm: 20, scale: 1 }, objets)

          texte += `Sachant que l'aire de ce trapèze est $${c}$ cm$^2$ et en utilisant les données du graphique, déterminer la hauteur de ce trapèze.<br>
                    <br>`
          texteCorr = mathalea2d({ xmin: -1, ymin: -3, xmax: 16, ymax: 10, pixelsParCm: 20, scale: 0.7 }, objets)
          texteCorr += `<br>La  hauteur du trapèze est  $x$. Il est constitué du rectangle $HBCD$ et du triangle rectangle $AHD$. <br>
                    Son aire est donc la somme des aires de ces deux figures. <br>
                    $\\bullet~$ L' aire du rectangle $HBCD$ est : $${b}\\times x=${reduireAxPlusB(b, 0)}$ ;<br>
                    $\\bullet~$ L' aire de triangle rectangle $AHD$ est : $\\dfrac{(${a}-${b})\\times x}{2}=${texNombrec((a - b) / 2)}x$.<br>
                    <br>
                    $${reduireAxPlusB(b, 0)} + ${reduireAxPlusB((a - b) / 2, 0)}=${c}$<br>
                    <br>
                    $${texNombrec(b + (a - b) / 2)}x=${c}$<br>
                    <br>
                    $\\dfrac{${texNombrec(b + d)}x}{${miseEnEvidence(texNombrec(b + d))}}=\\dfrac{${c}}{${miseEnEvidence(texNombrec(b + d))}}$<br>
                    <br>
                    `
          if ((a - b) / 2 % 1 !== 0) {
            texteCorr += ` $x=${texFractionReduite(c * 10, (b + d) * 10)}$<br>
              La hauteur du trapèze est : $${texFractionReduite(c * 10, (b + d) * 10)}$ cm.
                    `
          } else {
            texteCorr += `    $x=${texFractionReduite(c, b + d)}$<br>
                    La hauteur du trapèze est : $${texFractionReduite(c, b + d)}$ cm.`
          }
          break
        case 'typeE7':

          a = randint(3, 8) // largeur rect
          b = randint(1, 6)// hauteur triang
          c = randint(1, 6) // valeur ajout à x
          e = randint(1, 20)
          d = (e * (2 * a + b) + 2 * a * c + c * b) / 2 // aire

          A = point(0, 0, 'A', 'below')
          H = point(5, 6, 'H', 'below')
          B = point(10, 0, 'B', 'below')
          C = point(10, 6, 'C')
          D = point(0, 6, 'D')
          E = point(5, 10, 'E')

          objets.push(segment(A, B), segment(B, C), segment(C, D), segment(A, D), segment(E, C), segment(E, D), segment(E, H), codageAngleDroit(E, H, C), labelPoint(A, H, D, B, C, E), codeSegments('//', 'blue', D, E, E, C))
          objets.push(texteParPosition(`${texNombrec(a)}`, milieu(B, C).x + 0.4, milieu(B, C).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`${texNombrec(b)}`, milieu(E, H).x + 0.4, milieu(E, H).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`x + ${texNombrec(c)}`, milieu(A, B).x + 0.4, milieu(A, B).y - 0.4, 'milieu', 'black', 1, 'middle', true))

          texte = ` La figure ci-dessous (qui n'est pas à l'échelle) est composée d'un rectangle $ABCD$ et d'un triangle isocèle $DEC$. <br>
        L'unité est le mètre.<br> ` +
        mathalea2d({ xmin: -1, ymin: -1, xmax: 12, ymax: 11, pixelsParCm: 20, scale: 1 }, objets)

          texte += `Sachant que l'aire de cette figure est $${d}$ m$^2$ et en utilisant les données du graphique, déterminer la  valeur exacte de $x$.<br>
         <br>`
          texteCorr = mathalea2d({ xmin: -1, ymin: -1, xmax: 16, ymax: 11, pixelsParCm: 20, scale: 0.7 }, objets)
          texteCorr += `<br>La figure est  constituée du rectangle $ABCD$ et du triangle isocèle $DEC$.   <br>
        Son aire est donc la somme des aires de ces deux figures. <br>
        $\\bullet~$ L' aire du rectangle $ABCD$ est : $${a}\\times (x+${c})=${reduireAxPlusB(a, a * c)}$ ;<br>
        $\\bullet~$ L' aire de triangle isocèle $DEC$ est : $\\dfrac{${b}\\times(x +${c})}{2}=${texFractionReduite(b, 2)}(x+${c})=${reduireAxPlusB(b / 2, (b * c) / 2)}$.<br>
        L'aire de la figure étant $${d}$ m$^2$, on cherche $x$ tel que : <br>
        $(${reduireAxPlusB(a, a * c)})+(${reduireAxPlusB(b / 2, (b * c) / 2)})=${d}$<br>
        <br>
        $${reduireAxPlusB(a, a * c)}+${reduireAxPlusB(b / 2, (b * c) / 2)}=${d}$<br>
        <br>
        $${reduireAxPlusB(a + b / 2, a * c + (b * c) / 2)}=${d}$<br>
        <br>
        $${reduireAxPlusB(a + b / 2, a * c + (b * c) / 2)}${miseEnEvidence(texNombrec(-a * c - (b * c) / 2))}=${d}${miseEnEvidence(texNombrec(-a * c - (b * c) / 2))}$<br>
        <br>
        $${reduireAxPlusB(a + b / 2, 0)}=${reduireAxPlusB(0, d - a * c - (b * c) / 2)}$<br>
        <br>
        $\\dfrac{${reduireAxPlusB(a + b / 2, 0)}}{${miseEnEvidence(texNombrec(a + b / 2))}}=\\dfrac{${texNombrec(d - a * c - (b * c) / 2)}}{${miseEnEvidence(texNombrec(a + b / 2))}}$<br>
        <br>`
          texteCorr += `    $x=${texFractionReduite((d - a * c - (b * c) / 2) * 10, (a + b / 2) * 10)}$.<br>
  La valeur de $x$ cherchée est donc : $ ${texFractionReduite((d - a * c - (b * c) / 2) * 10, (a + b / 2) * 10)}$
        `
          break

        case 'typeE8':

          a = randint(10, 50) // longueur seg [AB]

          A = point(0, 0, 'A', 'below')
          B = point(10, 0, 'B', 'below')
          C = point(10, 6, 'C')
          D = point(4, 6, 'D')
          E = point(2, 3.46, 'E')
          M = point(4, 0, 'M', 'below')
          K = point(10, -1, 'K')
          L = point(0, -1, 'L')

          objets.push(segment(A, B), segment(A, E), segmentAvecExtremites(K, L), segment(E, M), segment(M, D), segment(B, C), segment(D, C), codageAngleDroit(B, M, D), codageAngleDroit(M, B, C), codageAngleDroit(B, C, D), codageAngleDroit(C, D, M), labelPoint(A, M, B, C, D, E), codeSegments('//', 'blue', A, E, E, M, A, M), codeSegments('/', 'blue', M, B, B, C, C, D, D, M))
          objets.push(texteParPosition('$$x$$', milieu(A, M).x, milieu(A, M).y - 0.3, 0, 'black', 2, 'middle', true), texteParPosition(`${texNombrec(a)}`, milieu(A, B).x, milieu(A, B).y - 1.5, 'milieu', 'black', 1, 'middle', true))

          texte = `$[AB]$ est un segment de longueur $${a}$ et $M$ est un point de ce segment.<br>
      Du même côté du segment $[AB]$, on trace le triangle équilatéral $AME$ et le carré $MBCD$.<br>
      On pose $AM=x$.<br>
     Déterminer la valeur de $x$ pour que le périmètre du triangle $AME$ soit égal à celui du carré $MBCD$.  `

          texteCorr = '<br>On réalise une figure pour visualiser la situation :<br>'
          texteCorr += mathalea2d({ xmin: -1, ymin: -3, xmax: 12, ymax: 8, pixelsParCm: 30, scale: 2 }, objets)

          texteCorr += ` Le triangle $AME$ est un triangle équilatéral de côté $x$, son périmètre est donc  $3x$.<br>
      
      Le carré $MBCD$ a pour côté $MB=${a}-x$. Son périmètre est donc : $4\\times (${a}-x)=${reduireAxPlusB(-4, 4 * a)} $
      <br>
      On cherche $x$ tel que : $${reduireAxPlusB(-4, 4 * a)}=3x$.<br>

      $${reduireAxPlusB(-4, 4 * a)} ${miseEnEvidence('-3x')}=3x${miseEnEvidence('-3x')}$<br>
      <br>
      $${reduireAxPlusB(-7, 4 * a)}=0$<br>
      <br>
      $${reduireAxPlusB(-7, 4 * a)}${miseEnEvidence(-4 * a)}=0${miseEnEvidence(-4 * a)}$<br>

      <br>
      $\\dfrac{${reduireAxPlusB(-7, 0)}}{${miseEnEvidence('-7')}}=\\dfrac{${reduireAxPlusB(0, -4 * a)}}{${miseEnEvidence('-7')}}$<br>
      <br>
      $x=${texFractionReduite(-4 * a, -7)}$<br>
      <br>
      Les deux périmètres sont égaux lorsque  : $x=${texFractionReduite(-4 * a, -7)}$
      `
          break
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
