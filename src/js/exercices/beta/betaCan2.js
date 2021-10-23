import Exercice from '../Exercice.js'
import {
  listeQuestionsToContenu, randint, ecritureParentheseSiNegatif,
  ecritureAlgebrique,
  calcul, pgcd, texNombrec, texFraction, signe, abs, texFractionReduite, choice, printlatex,
  combinaisonListesSansChangerOrdre, range1, reduireAxPlusB, rienSi1, texRacineCarree, simplificationDeFractionAvecEtapes
} from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
import Fraction from '../../modules/Fraction.js'
import { calcule } from '../../modules/fonctionsMaths.js'
import {
  mathalea2d, repere2, courbe2, tracePoint, point, codageAngleDroit, milieu, labelPoint, segment, latexParCoordonnees
} from '../../modules/2d.js'

export const titre = 'Course aux nombres seconde'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Ensemble de questions pour course aux nombres
 * @author Gilles Mora
 * Créé pendant l'été 2021
 * Référence canPredef2-1
*/
export default function CourseAuxNombresSeconde () {
  Exercice.call(this) // Héritage de la classe Exercice()
  if (this.interactif) {
    this.consigne = "Saisir la réponse numérique uniquement sauf si l'unité est explicitement demandée."
  } else {
    this.consigne = ''
  }
  this.nbQuestions = 30
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 100 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let a, b, c, d, N, xA, xB, yA, yB, x1, x2, y1, y2, A, B, C, D, k, p, ux, uy, vx, vy,
      resultat, inconnue, objets, repere, fraction, r, m, n, tA, tB, couplenm
    let questions = []

    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(30), this.nbQuestions)
    } else {
      if (typeof this.sup === 'number') {
        // Si c'est un nombre c'est qu'il y a qu'une seule question
        questions[0] = this.sup
        this.nbQuestions = 1
      } else {
        questions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nbQuestions = questions.length
      }
    }
    for (let i = 0; i < questions.length; i++) {
      questions[i] = parseInt(questions[i]) - 1
    }
    const listeIndex = combinaisonListesSansChangerOrdre(questions, this.nbQuestions)
    console.log(listeIndex)
    const listeFractions = [
      [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6], [1, 7],
      [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [1, 8], [3, 8], [5, 8], [7, 8], [1, 9], [2, 9],
      [4, 9], [5, 9], [7, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]
    ] // Couples de nombres premiers entre eux

    const typeQuestionsDisponibles = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20',
      'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30']
    // 'q1',  produit d'entiers
    // 'q2', // somme ou différence d'entiers
    // 'q3', // Tiers, moitié, proportions d'une quantité
    // 'q4', // Conversion heures, minutes .... ou changments d'unités
    // 'q5', // Calculs avec des fractions simples <-> écriture décimale
    // 'q6', // pourcentage simple
    //  'q7', // *10, 100 0,1...ou division
    // 'q8', // droite graduée,encadrement, arrondi, position des chiffres
    // 'q9', // petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......
    // 'q10', // fraction simplification ou calcul avec racines carrées
    // 'q11', // proportionnalité
    // 'q12', // problème avec des fractions ou calcul numérique
    // 'q13', // coefficient directeur calcul et lecture graphique
    // 'q14', // calcul littéral1, équation (pas id remarquables)
    // 'q15', // Périmètre/aires, agrandissement/réduction
    // 'q16', //  calculs astucieux, calculs avec parenthèses, puissances (1)
    //  'q17', // pourcentage 1 (évolution, proportion,....)
    //  'q18', // probabilité, denombrement
    // 'q19', // Milieu/distance
    // 'q20', // triangle (pythagore, thalès, angles, trigo ...)
    // 'q21', // image/antécédents par une fonction
    // 'q22', // Droites
    // 'q23', // arithmétique, calculs (y compris astucieux) ,  racines carrées, programme de calcul, puissances (2)
    // 'q24', // statistiques
    // 'q25', // inéquation, inégalités, intervalles, signes
    // 'q26', // fonction (calcul, VI)
    // 'q27', // Calcul littéral2 (avec id) , équations
    // 'q28', //  Problèmes avec vitesse, heures, conversions....
    //  'q29', // vecteurs
    // 'q30' // "question surprise", Questions diverses

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objets = []
      // Boucle principale où i+1 correspond au numéro de la question
      switch (typeQuestionsDisponibles[listeIndex[i]]) { // Suivant le type de question, le contenu sera différent
        case 'q13':
       
          break

        case 'q14':
          switch (choice([1, 2, 3, 4])) { //
            case 1:// calcul pour une valeur
              a = randint(-5, -1)
              b = randint(1, 9)
              d = randint(1, 9)
              c = randint(1, 4)
              if (c === 1) {
                a = randint(-5, -1)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a ** 2 + b)
                texte = `Calculer $x^2+${b}$ pour $x=${a}$ :`
                texteCorr = `$(${a})^2+${b}=${a ** 2 + b}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              } if (c === 2) {
                a = randint(2, 7)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(-b + a ** 2)
                texte = `Calculer $-${b}+x^2$ pour $x=${a}$ :`
                texteCorr = `$-${b}+(${a})^2=${-b + a * a}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (c === 3) {
                a = randint(2, 9)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a - a * a)
                texte = `Calculer $x-x^2$ pour $x=${a}$ :`
                texteCorr = `$${a}-${a}^2=${a - a ** 2}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              if (c === 4) {
                a = randint(1, 6)
                b = randint(1, 9)
                d = randint(1, 9)
                resultat = calcul(a ** 2 + a - d)
                texte = `Calculer $x^2+x-${d}$ pour $x=${a}$ :`
                texteCorr = `$(${a})^2+${a}-${d}=${a ** 2 + a - d}$.`
                setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              }
              break
            case 2:// resolution de ax+b=c
              a = randint(2, 9)
              b = randint(1, 9)
              c = randint(1, 9, b)

              texte = `Donner la solution de l'équation $${reduireAxPlusB(a, b)}=${c}$.<br>
                Donner le résultat sous la forme d'une fraction irréductible ou d'un entier le cas échéant.`
              texteCorr = `En retranchant $${b}$ dans chaque membre, puis en divisant par $${a}$, on obtient la solution $${texFractionReduite(c - b, a)}$`
              setReponse(this, i, [`${texFractionReduite(c - b, a)}`])

              break
            case 3:// developpement k*(a+b)
              a = randint(1, 4)
              b = randint(1, 9) * choice([-1, 1])
              k = randint(2, 7) * choice([-1, 1])
              inconnue = choice(['x', 'y'])
              if (a === 1) {
                // ne pas écrire 1x
                texte = `Développer : $A=(${inconnue}${ecritureAlgebrique(
        b
      )})\\times${ecritureParentheseSiNegatif(k)}$`
              } else {
                texte = `Développer : $A=(${a}${inconnue}${ecritureAlgebrique(
        b
      )})\\times${ecritureParentheseSiNegatif(k)}$`
              }

              if (a === 1) {
                // ne pas écrire 1x
                texteCorr = `Développer : $A=(${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
              } else {
                texteCorr = `Développer : $A=(${a}${inconnue}${ecritureAlgebrique(b)})\\times${ecritureParentheseSiNegatif(k)}=${k}\\times ${a}${inconnue}+${ecritureParentheseSiNegatif(k)}\\times${ecritureParentheseSiNegatif(b)}=${k * a}${inconnue}${ecritureAlgebrique(k * b)}$`
              }
              setReponse(this, i, [`${k * a}${inconnue}${ecritureAlgebrique(k * b)}`])

              break

            case 4:// developpement kx*(a+b)
              a = randint(1, 4)
              b = randint(1, 9) * choice([-1, 1])
              k = randint(2, 7) * choice([-1, 1])
              inconnue = choice(['x', 'y'])
              if (a === 1) {
                // ne pas écrire 1x
                texte = `Développer : $A=${k}${inconnue}(${inconnue}${ecritureAlgebrique(b)})$`
              } else {
                texte = `Développer : $A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(b)})$`
              }

              if (a === 1) {
                // ne pas écrire 1x
                texteCorr = `$A=${k}${inconnue}(${inconnue}${ecritureAlgebrique(
                  b
                )})=${k}${inconnue}\\times ${inconnue} ${signe(
                  k * b
                )}${k}${inconnue}\\times ${abs(b)}=${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}$`
              } else {
                if (k > 0) {
                  texteCorr = `$A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                    b
                  )})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecritureParentheseSiNegatif(
                    b
                  )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                    k * b
                  )}${inconnue}$`
                } else {
                  texteCorr = `$A=${k}${inconnue}(${a}${inconnue}${ecritureAlgebrique(
                    b
                  )})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecritureParentheseSiNegatif(
                    b
                  )}=${k * a}${inconnue}^2${ecritureAlgebrique(
                    k * b
                  )}${inconnue}$`
                }
              }

              setReponse(this, i, [`${k * a}${inconnue}^2${ecritureAlgebrique(k * b)}${inconnue}`])

              break
          }

          break

        case 'q15':
          switch (choice([1, 2, 3, 4, 5, 6, 7])) { // 1, 2, 3, 4, 5, 6, 7
            case 1:// conversion fraction <->décimale cinquième et quart
              a = randint(3, 9)
              b = randint(0, 1)
              texte = `Un carré de côté ${a} cm a le même périmètre qu'un rectangle de largeur ${a - b} cm et de longueur ${a + 1} cm ? (V ou F)`
              if (b === 0) {
                texteCorr = `Faux car $4\\times ${a}$ cm$\\neq 2\\times ${a}$ cm$ + 2\\times ${a + 1}$ cm.`
                setReponse(this, i, 'F')
              } else {
                texteCorr = `Vrai car $4\\times ${a}$ cm = $2\\times ${a - 1}$ cm $ + 2\\times ${a + 1}$ cm$= ${4 * a}$ cm.`
                setReponse(this, i, 'V')
              }
              break
            case 2:// aire d'un carré connaissant son perimètre
              a = randint(2, 10)
              resultat = calcul(a * a)
              texte = `Quelle est l'aire d'un carré en cm$^2$ dont le périmètre est $${4 * a}$ cm ? `
              texteCorr = `Le côté du carré est $${4 * a}\\div 4=${a}$, donc son aire est : $${a}\\times ${a}=${a ** 2}$ cm$^2$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 3:// perimètre d'un carré connaissant son aire
              a = randint(1, 10)
              c = a * a
              resultat = calcul(4 * a)
              texte = `Déterminer le périmètre (en cm) d'un carré d'aire $${c}$ cm$^2$. `
              texteCorr = `Le côté du carré est $\\sqrt{${c}}=${a}$. Son périmètre est donc $4\\times ${a}=${4 * a}$ cm.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })
              break

            case 4:// côté d'un carré connaissant son perimètre
              a = randint(5, 20) * 4
              resultat = calcul(a / 4)
              texte = `Le périmètre d'un carré est $${a}$ cm. Quelle est la longueur (en cm) du côté du carré ? `
              texteCorr = `Le côté du carré est $${a}\\div 4=${a / 4}$.`
              setReponse(this, i, resultat, { formatInteractif: 'calcul' })

              break
            case 5:// périmètre d'une figure
              a = randint(1, 3)//
              b = randint(4, 7)//
              n = randint(7, 12)
              c = randint(1, 6) + randint(3, 9) / 10
              d = n - c
              A = point(0, 0, 'P')
              B = point(7, 1, 'Q', 'below')
              C = point(6.5, 4, 'R')
              D = point(2, 5, 'R')

              objets.push(segment(A, B), segment(B, C), segment(C, D), segment(D, A), tracePoint(A, B, C, D))
              objets.push(latexParCoordonnees(`${texNombrec(b)}\\text{m}`, milieu(A, D).x - 0.5, milieu(A, D).y, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(c)}\\text{m}`, milieu(A, B).x, milieu(A, B).y - 0.5, 'black', 20, 10, ''),
                latexParCoordonnees(`${texNombrec(d)}\\text{m}`, milieu(C, D).x, milieu(C, D).y + 0.5, 'black', 20, 10, ''))

              texte = `Quel est le périmètre de cette figure (en m) ?
              `
              texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 8, ymax: 6, pixelsParCm: 30, mainlevee: true, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` Le périmètre est donné par : $${texNombrec(a)}+${texNombrec(b)}+${texNombrec(c)}+${texNombrec(d)}=${texNombrec(a + b + c + d)}$.
          <br>`

              setReponse(this, i, a + b + c + d, { formatInteractif: 'calcul' })

              break
            case 6:// agrandissement/réduction
              N = choice(['a', 'b', 'c'])
              if (N === 'a') {
                a = randint(2, 7)// aire
                c = randint(2, 4)// coefficient
                texte = `Les longueurs d'un rectangle de $${a}$ cm$^2$  sont multipliées par $${c}$.<br>
              Quelle est l'aire (en cm$^2$) du rectangle ainsi obtenu ?
              `

                texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${c}^2=${c ** 2}$.<br>
              Ainsi, l'aire du nouveau rectangle est : $${a}\\times ${c * c}=${a * c * c}$ cm $^2$.
          <br>`

                setReponse(this, i, a * c * c, { formatInteractif: 'calcul' })
              }

              if (N === 'b') {
                fraction = choice(listeFractions)
                n = fraction[0]
                d = fraction[1]
                texte = `Les longueurs d'un triangle sont multipliées par $\\dfrac{${n}}{${d}}$.<br>
              Par combien est multipliée son aire  ?
              `

                texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$.<br>
              Ainsi, l'aire a été multipliée par : $\\left(\\dfrac{${n}}{${d}}\\right)^2=\\dfrac{${n * n}}{${d * d}}$.
          <br>`

                setReponse(this, i, new Fraction(n * n, d * d), { formatInteractif: 'fraction' })
              }
              if (N === 'c') {
                fraction = choice(listeFractions)
                n = fraction[0]
                d = fraction[1]
                texte = `L'aire d'un parallélogramme a été multipliée par $\\dfrac{${n * n}}{${d * d}}$.<br>
              Par combien ont été multipliées les longueurs de ses côtés ?
              `

                texteCorr = ` Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$.<br>
              Ainsi, les longueurs ont été multipliées par  : $\\sqrt{\\dfrac{${n * n}}{${d * d}}}=\\dfrac{${n}}{${d}}$.
          <br>`

                setReponse(this, i, new Fraction(n, d), { formatInteractif: 'fraction' })
              }
              break
            case 7:// longueur à trouver à partir d'une aire triangle rectangle
              a = randint(2, 10)//
              b = randint(1, 5) * a
              A = point(0, 0, 'A', 'below')
              B = point(8, 0, 'B', 'below')
              C = point(6, 3.46, 'C')

              objets.push(segment(A, B), segment(B, C), segment(C, A), labelPoint(A, B, C), tracePoint(A, B, C), codageAngleDroit(A, C, B))
              objets.push(latexParCoordonnees(`${texNombrec(a)}\\text{m}`, milieu(B, C).x + 0.5, milieu(B, C).y + 0.5, 'black', 20, 10, '')
              )

              texte = ` L'aire de ce triangle est $${b}$ m$^2$. Donner la longueur $AC$ (en m).
              `
              texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 9, ymax: 4.5, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
              texteCorr = ` L'aire de ce triangle rectangle est donnée par : $\\dfrac{BC\\times AC}{2}$.<br>
              On cherche $AC$ telle que $\\dfrac{${a}\\times AC}{2}=${b}$. <br>
              $AC=\\dfrac{2\\times ${b}}{${a}}=${texFractionReduite(2 * b, a)}$ m.
          <br>`

              setReponse(this, i, 2 * b / a, { formatInteractif: 'calcul' })

              break
          }

          break
        case 'q26':
          switch (choice([1, 2, 3])) { // fonctions calculs VI
            case 1:// déterminer a pour fonction affine avec une valeur

              b = randint(-3, 3, 0)
              c = randint(1, 5)

              n = choice([-3, -2, 2, 3])

              d = b + n * c
              if (b > 0) {
                texte = `$f$ est une fonction affine telle que $f(x)=ax+${b}$ et $f(${c})=${d}$.<br>
                Combien vaut $a$ ?
                `
                texteCorr = `Comme $f(${c})=${d}$, on a $a\\times ${c}+${ecritureParentheseSiNegatif(b)}=${d}$.<br>
                On en déduit $a\\times ${ecritureParentheseSiNegatif(c)}=${d}-${ecritureParentheseSiNegatif(b)}$, d'où $a=\\dfrac{${d}-${ecritureParentheseSiNegatif(b)}}{${c}}=${texFractionReduite(d - b, c)}$.`
                setReponse(this, i, (d - b) / c, { formatInteractif: 'calcul' })
              } else {
                texte = `$f$ est une fonction affine telle que $f(x)=ax-${abs(b)}$ et $f(${c})=${d}$.<br>
               Combien vaut $a$ ?
               `
                texteCorr = `Comme $f(${c})=${d}$, on a $a\\times ${c}+${ecritureParentheseSiNegatif(b)}=${d}$.<br>
               On en déduit $a\\times ${ecritureParentheseSiNegatif(c)}=${d}-${ecritureParentheseSiNegatif(b)}$, d'où $a=\\dfrac{${d}-${ecritureParentheseSiNegatif(b)}}{${c}}=${texFractionReduite(d - b, c)}$.`
                setReponse(this, i, (d - b) / c, { formatInteractif: 'calcul' })
              }
              break

            case 2:// si 2x+3=4, combien -4x-6 ?

              a = randint(-3, 3, 0)
              b = randint(-5, 5, 0)
              c = randint(-5, 5, 0)
              n = randint(-7, -1)

              texte = `Si   $${reduireAxPlusB(a, b)}=${c}$,  alors   $${reduireAxPlusB(n * a, n * b)}=$<br>
                
                `
              texteCorr = `Comme $${reduireAxPlusB(n * a, n * b)}=${n}\\times (${reduireAxPlusB(a, b)})$, alors 
                $${reduireAxPlusB(n * a, n * b)}=${n}\\times ${ecritureParentheseSiNegatif(c)}=${n * c}$`
              setReponse(this, i, n * c, { formatInteractif: 'calcul' })
              break

            case 3:// VI
              if (choice([true, false])) {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10, 0)

                texte = `Donner la valeur interdite de $\\dfrac{${rienSi1(a)}x}{${reduireAxPlusB(b, c)}}$.<br>
              (Résultat sous la forme d'une fraction réduite ou d'un entier le cas échéant).
                
                `
                texteCorr = `La valeur interdite est la solution de l'équation $${reduireAxPlusB(b, c)}=0$.<br>
              La valeur interdite est donc $${texFractionReduite(-c, b)}$.`
                setReponse(this, i, [`${texFractionReduite(-c, b)}`])
              } else {
                a = randint(-10, 10, 0)

                b = randint(1, 100)

                texte = `Donner la plus petite valeur interdite de $\\dfrac{${rienSi1(a)}x}{x^2-${b}}$.<br>
                (Résultat sous la forme $a\\sqrt{b}$ avec $b$ le plus petit possible ou d'un entier le cas échéant).
                  
                  `
                texteCorr = `Les valeurs interdites sont les solutions de l'équation $x^2-${b}=0$.<br>
               Cette équation a deux solutions : $${texRacineCarree(b)}$ et $-${texRacineCarree(b)}$.<br>
               La plus petite valeur interdite est donc : $-${texRacineCarree(b)}$. `
                setReponse(this, i, [`-${texRacineCarree(b)}`])
              }
              break
          }
          break

        case 'q27':// Calcul littéral2 (avec id) , équations
          switch (choice([1, 2, 3])) { //
            case 1:// développement id remarquables
              inconnue = choice(['x', 'y'])
              a = randint(1, 9)
              b = randint(2, 5)
              N = choice(['a', 'b', 'c', 'd', 'e', 'f'])
              if (N === 'a') {
                texte = ` Développer $(${inconnue}+${a})^2$.` // (x+a)²
                texteCorr = `$(${inconnue}+${a})^2=${inconnue}^2+2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2+${2 * a}${inconnue}+${a * a}$`
                setReponse(this, i, [`${inconnue}^2+${2 * a}${inconnue}+${a * a}`])
              }
              if (N === 'b') {
                texte = ` Développer $(${inconnue}-${a})^2$.` // (x+a)²
                texteCorr = `$(${inconnue}+${a})^2=${inconnue}^2-2 \\times ${a} \\times ${inconnue}+${a}^2=${inconnue}^2-${2 * a}${inconnue}+${a * a}$`
                setReponse(this, i, [`${inconnue}^2-${2 * a}${inconnue}+${a * a}`])
              }
              if (N === 'c') {
                texte = `Développer $(x-${a})(x+${a})$` // (x-a)(x+a)
                texteCorr = `$(x-${a})(x+${a})=x^2-${a}^2=x^2-${a * a}$.`
                setReponse(this, i, [`x^2-${a * a}`])
              }
              if (N === 'd') {
                texte = `Développer $(${b}x+${a})^2$` // (bx+a)²  b>1
                texteCorr = `$(${b}x+${a})^2=(${b}x)^2+2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2+${2 * b * a}x+${a * a}$`
                setReponse(this, i, [`${b * b}x^2+${2 * b * a}x+${a * a}`])
              }
              if (N === 'e') {
                texte = `Développer $(${b}x-${a})^2$` // (bx-a)² b>1
                texteCorr = `$(${b}x-${a})^2=(${b}x)^2-2 \\times ${b}x \\times ${a} + ${a}^2=${b * b}x^2-${2 * b * a}x+${a * a}$`
                setReponse(this, i, [`${b * b}x^2-${2 * b * a}x+${a * a}`])
              }
              if (N === 'f') {
                texte = `Développer $(${b}x-${a})(${b}x+${a})$` // (bx-a)(bx+a) b>1
                texteCorr = `$(${b}x-${a})(${b}x+${a})=(${b}x)^2-${a}^2=${b * b}x^2-${a * a}$`
                setReponse(this, i, [`${b * b}x^2-${a * a}`])
              }
              break
            case 2:// factoriser
              r = choice([2, 3, 5])
              couplenm = choice([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [3, 8], [5, 8], [7, 8], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9], [3, 10], [7, 10], [9, 10]]) // n et m sont premiers entre eux
              n = couplenm[0]
              m = couplenm[1]
              N = choice(['a', 'b', 'c', 'd', 'e'])
              a = randint(1, 9)
              b = randint(2, 9)
              if (N === 'a') {
                texte = ` Factoriser au maximum  $${printlatex(`${n * r}*x+(${m * r})*x^2`)}$.` //
                texteCorr = `$${printlatex(`${n * r}*x+(${m * r})*x^2`)}=${r}\\times ${n}x +${r}\\times ${m}x^2=${r}x(${n}+${m}x).$`
                setReponse(this, i, [`${r}x(${n}+${m}x)`])
              }
              if (N === 'b') {
                texte = ` Factoriser  $${r}a+${r}\\times${n}b$.` //
                texteCorr = `$${r}a+${r}\\times${n}b=${r}(a+${n}b)$`
                setReponse(this, i, [`${r}(${printlatex(`a+(${n})*b`)})`])
              }
              if (N === 'c') {
                texte = ` Factoriser  $x\\times ${n}x+x\\times ${m}$.` //
                texteCorr = `$x\\times ${n}x+x\\times ${m}=x(${n}x+${m})$`
                setReponse(this, i, [`x(${n}x+${m})`])
              }
              if (N === 'd') {
                texte = ` Factoriser  $x^2-${a * a}$.` //
                texteCorr = `$x^2-${a * a}=x^2-${a}^2=(x-${a})(x+${a})$`
                setReponse(this, i, [`(x-${a})(x+${a})`, `(x+${a})(x-${a})`])
              }
              if (N === 'e') {
                texte = ` Factoriser  $${b * b}x^2-${a * a}$.` //
                texteCorr = `$${b * b}x^2-${a * a}=(${b}x)^2-${a}^2=(${b}x-${a})(${b}x+${a})$`
                setReponse(this, i, [`(${b}x-${a})(${b}x+${a})`, `(${b}x+${a})(${b}x-${a})`])
              }
              break

            case 3:// équations

              N = choice(['a', 'b'])
              b = randint(1, 10) // (x+a)(x+b)=0 avec a et b entiers
              d = randint(1, 10, [b])

              if (N === 'a') {
                texte = `Le produit des solutions de l'équation $(x+${b})(x+${d})=0$ vaut : ` //
                texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
                texteCorr += '<br>' + `$(x+${b})(x+${d})=0$`
                texteCorr += '<br> Soit ' + `$x+${b}=0$` + ' ou ' + `$x+${d}=0$`
                texteCorr += '<br> Donc ' + `$x=${0 - b}$` + ' ou ' + `$x=${0 - d}$`
                texteCorr += '<br>Le produit vaut donc :' + `$(${-b})\\times (${-d})=${b * d}$.`
                setReponse(this, i, b * d, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                texte = `Le produit des solutions de l'équation $(x-${b})(x+${d})=0$ vaut : ` //
                texteCorr = 'Un produit est nul si l\'un au moins de ses facteurs est nul.'
                texteCorr += '<br>' + `$(x-${b})(x+${d})=0$`
                texteCorr += '<br> Soit ' + `$x-${b}=0$` + ' ou  ' + `$x+${d}=0$`
                texteCorr += '<br> Donc ' + `$x=${b}$` + ' ou ' + `$x=${0 - d}$`
                texteCorr += '<br>Le produit vaut donc :' + `$${b}\\times (${-d})=${-b * d}$.`
                setReponse(this, i, b * (-d), { formatInteractif: 'calcul' })
              }
              break
          }

          break

        case 'q28':
          switch (choice([1, 2, 3])) { // 1,2,3
            case 1:// conversion m/s en km/h

              a = choice([10, 100, 1000])

              texte = `$${a}$m/s $=.....$ km/h.<br>`

              texteCorr = `$${a}$ m/s $=${texNombrec(a / 1000)}$ km/s $=${3.6 * a}$ km/h `
              setReponse(this, i, 3.6 * a, { formatInteractif: 'calcul' })

              break
            case 2:// distance à partir de vitesse et temps
              b = choice([30, 90])
              a = choice([20, 25, 30, 35, 40, 45, 50, 60])

              texte = `Quelle est la distance (en km) parcourue en $${b}$ min  par un véhicule se déplaçant à $${a}$ km/h ?`
              if (b === 30) {
                texteCorr = `Le véhicule parcourt $${a}$ km en 1 h, donc en $${b}$ minutes, il parcourt $0,5\\times ${a}$ km, soit $${texNombrec(a / 2)}$ km.`
                setReponse(this, i, a / 2, { formatInteractif: 'calcul' })
              } else {
                texteCorr = `Le véhicule parcourt $${a}$ km en 1 h, donc en $${b}$ minutes, il  parcourt $1,5\\times ${a}$ km, soit $${texNombrec(1.5 * a)}$ km.`
                setReponse(this, i, 1.5 * a, { formatInteractif: 'calcul' })
              }
              break
            case 3:// vtesse à partir de distance et temps
              b = choice([10, 15, 30, 45])
              a = randint(2, 5) * 3

              texte = `Si l'on parcourt $${a}$ km en $${b}$ minutes, la vitesse moyenne (en km/h) est de :`
              if (b === 15) {
                texteCorr = `En 1 heure, on parcourt $4$ fois plus de km qu'en 15 min, soit $4\\times ${a}=${4 * a}$ km.<br>
               La vitesse moyenne est donc :  $${4 * a}$ km/h`
                setReponse(this, i, 4 * a, { formatInteractif: 'calcul' })
              } if (b === 30) {
                texteCorr = `En 1 heure, on parcourt $2$ fois plus de km qu'en 30 min, soit $2\\times ${a}=${2 * a}$ km.<br>
               La vitesse moyenne est donc :  $${4 * a}$ km/h`
                setReponse(this, i, 2 * a, { formatInteractif: 'calcul' })
              }
              if (b === 10) {
                texteCorr = `En 1 heure, on parcourt $6$ fois plus de km qu'en 10 min, soit $6\\times ${a}=${6 * a}$ km.<br>
                La vitesse moyenne est donc :  $${6 * a}$ km/h`
                setReponse(this, i, 6 * a, { formatInteractif: 'calcul' })
              }
              if (b === 45) {
                texteCorr = `En 15 min, on parcourt $3$ fois moins de km qu'en 45 min, soit $ ${a}\\div 3=${a / 3}$ km.<br>
              En 1 heure, on parcourt $4$ fois plus de km qu'en $15$ min, soit  $ ${a / 3}\\times 4=${(4 * a) / 3}$ km.<br>
              La vitesse moyenne est donc :  $${4 * a / 3}$ km/h`
                setReponse(this, i, 4 * a / 3, { formatInteractif: 'calcul' })
              }
              break
          }
          break

        case 'q29':// vecteurs
          switch (choice([1, 2, 3, 4])) { //
            case 1:// coordonnées

              xA = randint(0, 5)
              yA = randint(0, 5)
              ux = randint(1, 5)
              uy = randint(1, 5)
              xB = xA + ux

              yB = yA + uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :'
              texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`
              texte += '<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ '
              texteCorr = '<br>On sait d\'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d\'un repère,'
              texteCorr += ' <br>alors on a : $\\overrightarrow{AB}(x_B-x_A  ;y_B-y_A)$<br>'
              texteCorr += ' <br>On applique ici aux données de l\'énoncé :'
              texteCorr += ` $\\overrightarrow{AB}(${xB}-${ecritureParentheseSiNegatif(xA)}  ;${yB}-${ecritureParentheseSiNegatif(yA)})$<br>`
              texteCorr += `Ce qui donne au final : $\\overrightarrow{AB}(${xB - xA}  ;${yB - yA})$<br>`
              setReponse(this, i, [`(${ux};${uy})`])
              break

            case 2:// vecteurs colinéaires1

              p = choice([-2, 2, 3, -3])
              ux = randint(1, 5)
              uy = randint(1, 5)
              vx = p * ux
              vy = p * uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}\\left(${ux};${uy}\\right)$ et $\\vec{v}\\left(${vx};a\\right)$`
              texte += '<br>Déterminer la valeur de $a$ afin que les vecteurs $\\vec{u}$ et $\\vec{v}$ soient colinéaires. '

              texteCorr = `Les deux vecteurs sont colinéaires, donc il existe un réel $k$ tel que $\\vec{v}=k\\times \\vec{u}$.<br>
              Comme $${vx}=${p}\\times ${ux}$, alors $y_{\\vec{v}}=${p}\\times${uy}$, donc $a=${p * uy}$.`

              setReponse(this, i, vy, { formatInteractif: 'calcul' })
              break

            case 3:// vecteurs colinéaires2

              p = choice([-1.5, -0.5, 1.5, 0.5])
              ux = randint(1, 4) * 2
              uy = randint(1, 4) * 2
              vx = p * ux
              vy = p * uy
              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}\\left(${ux};${uy}\\right)$ et $\\vec{v}\\left(${vx};a\\right)$`
              texte += '<br>Déterminer la valeur de $a$ afin que les vecteurs $\\vec{u}$ et $\\vec{v}$ soient colinéaires. '

              texteCorr = `Les deux vecteurs sont colinéaires, donc il existe un réel $k$ tel que $\\vec{v}=k\\times \\vec{u}$.<br>
              Comme $${vx}=${texNombrec(p)}\\times ${ux}$, alors $y_{\\vec{v}}=${texNombrec(p)}\\times${uy}$, donc $a=${p * uy}$.`

              setReponse(this, i, vy, { formatInteractif: 'calcul' })
              break
            case 4:// coordonnées 2
              a = randint(-6, 6, [0, 1, -1])
              b = randint(2, 10)

              texte = 'Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on a :'
              texte += ` $\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})$.`
              texte += '<br>Donner les coordonnées du vecteur $\\vec{u}$ dans le repère $(O,\\vec i,\\vec j)$. '

              texteCorr = `$\\vec{u}=${a}(\\vec{i}+${b}\\vec{j})=${a}\\vec{i}+${ecritureParentheseSiNegatif(a * b)}\\vec{j}$.<br>
              Les coordonnées du vecteur $\\vec{u}$ sont donc $(${a};${a * b})$.`

              setReponse(this, i, [`(${a};${a * b})`])
              break
          }
          break

        case 'q30':
          switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) { //
            case 1:// géométrie Pythagore, trigo
              N = choice(['a', 'b', 'c', 'd'])
              if (N === 'a') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')

                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees('4\\text{cm} ', milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('3 \\text{cm}', milieu(A, B).x - 0.2, milieu(A, B).y + 0.5, 'black', 20, 10, ''))

                texte = `Quel est le périmètre de ce triangle (en cm) ?
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
               $AB^2+BC^2=AC^2$ soit $AC^2=3^2+4^2$, d'où $AC=5$.
              <br>
              Le périmètre du triangle est donc : $5+4+3=12$ cm`

                setReponse(this, i, '12')
              }
              if (N === 'b') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')

                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees('12\\text{cm} ', milieu(B, C).x + 0.5 + 0, milieu(B, C).y, 'black', 20, 10, ''),
                  latexParCoordonnees('15\\text{cm} ', milieu(A, C).x, milieu(A, C).y - 0.5, 'black', 20, 10, ''))

                texte = `L'aire de ce triangle est $54$ cm$^2$.<br>
                  Quel est son périmètre (en cm) ?
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` En utilisant le théorème de Pythagore, on a :<br>
               $AB^2+BC^2=AC^2$ soit $AB^2=15^2-12^2$, d'où $AB=9$.
              <br>
              Le périmètre du triangle est donc : $15+12+9=36$ cm`

                setReponse(this, i, '36')
              }
              if (N === 'c') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')
                a = randint(5, 8)
                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees(`${a}`, milieu(A, B).x + 0, milieu(B, C).y + 0.25, 'black', 20, 10, ''),
                  latexParCoordonnees('50°', 1.2, 0.5, 'black', 20, 10, ''))

                texte = ` On a $\\tan 50° \\simeq 1,2$.<br>
                Donner une valeur approchée de la longueur $BC$.
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` $\\tan 50°=\\dfrac{BC}{AB}=\\dfrac{BC}{${a}}=1,2$.<br>
                Ainsi, $BC=1,2\\times ${a}=${texNombrec(1, 2 * a)}$.
              `

                setReponse(this, i, 1.2 * a, { formatInteractif: 'calcul' })
              }
              if (N === 'd') {
                A = point(0, 0, 'A', 'below')
                B = point(2, 3, 'B')
                C = point(6, 0.35, 'C', 'below')
                a = randint(4, 11)
                objets.push(segment(A, B), segment(B, C), segment(A, C), labelPoint(A, B, C), codageAngleDroit(A, B, C))
                objets.push(latexParCoordonnees(`${a}`, milieu(A, C).x + 0, milieu(A, C).y - 0.4, 'black', 20, 10, ''),
                  latexParCoordonnees('43°', 4.6, 0.5, 'black', 20, 10, ''))

                texte = ` On a $\\sin 43° \\simeq 0,7$.<br>
                Donner une valeur approchée de la longueur $AB$.
                  `
                texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 7, ymax: 4, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.7 }, objets)
                texteCorr = ` $\\sin 43°=\\dfrac{AB}{AC}=\\dfrac{AB}{${a}}=0,7$.<br>
                Ainsi, $AB=0,7\\times ${a}=${texNombrec(0.7 * a)}$.
              `

                setReponse(this, i, 0.7 * a, { formatInteractif: 'calcul' })
              }
              break

            case 2:// calculs astucieux

              N = choice(['a', 'b'])

              if (N === 'a') {
                a = randint(3, 9) * 10

                texte = ` $${a - 2}\\times ${a + 2}=$<br>
                  
                  `
                texteCorr = `$${a - 2}\\times ${a + 2}=(${a}-2)(${a}+2)=${a}^2-4=${a * a - 4}$.`
                setReponse(this, i, a * a - 4, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(12, 21)
                c = randint(9, 16)
                b = 2 * c + 1
                texte = ` Donner l'écriture décimale de $\\dfrac{${b}\\times ${a}}{${a * 2}}$.
                    
                    `
                texteCorr = `$\\dfrac{${b}\\times ${a}}{${a * 2}}=\\dfrac{${b}\\times ${a}\\times 5}{2\\times ${a}}=\\dfrac{${b}}{2}=${texNombrec(b / 2)}$`
                setReponse(this, i, b / 2, { formatInteractif: 'calcul' })
              }
              break

            case 3:// vitesse

              texte = ` Si je cours 100 m en 30 s, quelle est ma vitesse en km/h ?
                  
                  `
              texteCorr = `100 m en 30 s, correspond à 200 m en 1 minute, soit $60\\times 200$ m en 1h.<br>
              $60\\times 200$ m $=12000$ m soit $12$ km en 1 h. `
              setReponse(this, i, '12', { formatInteractif: 'calcul' })
              break

            case 4:// rayon cercle circonscrit d'un triangle rectangle
              a = choice([3, 5, 8, 7, 9])

              if (a === 3) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=${a}$ cm, $AC=4$ cm et $BC=5$ cm.<br>
                Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                  
                `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (son centre se situe au milieu de l'hypoténuse).<br>
                Donc son rayon vaut $5\\div 2=2,5$ cm`
                setReponse(this, i, '2,5')
              }
              if (a === 5) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=${a}$ cm, $AC=13$ cm et $BC=12$ cm.<br>
                              Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                
                              `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                              Donc son rayon vaut $13\\div 2=6,5$ cm`
                setReponse(this, i, '6,5')
              }
              if (a === 8) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=17$ cm, $AC=15$ cm et $BC=${a}$ cm.<br>
                                            Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                              
                                            `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                            Donc son rayon vaut $17\\div 2=8,5$ cm`
                setReponse(this, i, '8,5')
              }
              if (a === 7) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=24$ cm, $AC=${a}$ cm et $BC=25$ cm.<br>
                                                          Donner le rayon (en cm) du cercle circonscrit de ce triangle (résultat sous forme décimale).
                                                            
                                                          `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                          Donc son rayon vaut $25\\div 2=12,5$ cm`
                setReponse(this, i, '12,5')
              }
              if (a === 8) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=17$ cm, $AC=15$ cm et $BC=${a}$ cm.<br>
                                                                        Donner le rayon (en cm) du cercle circonscrit de ce triangle.
                                                                          
                                                                        `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                                        Donc son rayon vaut $17\\div 2=8,5$ cm`
                setReponse(this, i, '8,5')
              }
              if (a === 9) {
                texte = ` $ABC$ est un triangle rectangle tel que $AB=40$ cm, $AC=41$ cm et $BC=25$ cm.<br>
                                                                                      Donner le rayon (en cm) du cercle circonscrit de ce triangle.
                                                                                        
                                                                                      `
                texteCorr = `Le cercle circonscrit d'un triangle rectangle a pour rayon la moitié de son hypoténuse (le plus grand côté).<br>
                                                                                      Donc son rayon vaut $41\\div 2=20,5$ cm`
                setReponse(this, i, '20,5')
              }
              break
            case 5:// aire/périmètres
              a = choice([2, 3, 5])
              b = choice([4, 8, 16])
              texte = ` Quelle est l'aire (en cm$^2$) d'un carré de périmètre $${b}\\sqrt{${a}}$.
                  
                  `
              texteCorr = `Le côté du carré mesure $\\dfrac{${b}\\sqrt{${a}}}{4}$, 
              soit $${texFractionReduite(b, 4)}\\sqrt{${a}}$.<br>
              Son aire est donc : $(${texFractionReduite(b, 4)}\\sqrt{${a}})^2=${texFractionReduite(b * b * a, 16)}$ cm$^2$.

               `
              setReponse(this, i, (b * b * a) / 16, { formatInteractif: 'calcul' })
              break

            case 6:// inéquations
              N = choice(['a', 'b'])
              if (N === 'a') {
                a = randint(1, 30) * 10

                texte = ` Déterminer la plus petite valeur de $n$ vérifiant $2^n>${a}$.
                                    `
                let n = 0
                while (2 ** n < a) { n++ }
                texteCorr = `La plus valeur de $n$ est $${n}$ car $2^{${n}}=${2 ** n}>${a}$ et $2^{${n - 1}}=${2 ** (n - 1)}<${a}$.
               `
                setReponse(this, i, n, { formatInteractif: 'calcul' })
              }
              if (N === 'b') {
                a = randint(1, 10) * 10

                texte = ` Déterminer la plus petite valeur de $n$ vérifiant $3^n>${a}$.
                                      `
                let n = 0
                while (3 ** n < a) { n++ }
                texteCorr = `La plus valeur de $n$ est $${n}$ car $3^{${n}}=${3 ** n}>${a}$ et $3^{${n - 1}}=${3 ** (n - 1)}<${a}$.
                 `
                setReponse(this, i, n, { formatInteractif: 'calcul' })
              }
              break
            case 7:// probabilités
              a = randint(2, 4)
              b = choice([2, 3])
              c = randint(2, 12)
              p = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
              switch (choice(['a', 'b', 'c', 'd'])) {
                case 'a':
                  texte = "On lance deux fois de suite un dé équilibré.<br>Quelle est la probabilité d’obtenir deux fois le même nombre ?<br>Donner le résultat sous la forme d'une fraction irréductible."
                  texteCorr = "Sur 36 cas possibles équiprobables, il y en a 6 qui sont des doubles. Donc la probabilité d'obtenir deux fois le même nombre est $\\dfrac{6}{36}=\\dfrac{1}{6}$."
                  setReponse(this, i, fraction(1, 6), { formatInteractif: 'fraction' })
                  break
                case 'b':
                  texte = `Si on lance une pièce $${a}$ fois de suite, quelle est la probabilité d'obtenir PILE $${a}$ fois ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `A chaque lancer, la probabilité d'obtenir PILE est $\\dfrac{1}{2}$, donc si on lance $${a}$ fois la pièce, la probabilité d'obtenir $${a}$ fois PILE est $\\left(\\dfrac{1}{2}\\right)^${a}=\\dfrac{1}{${2 ** a}}$.`
                  setReponse(this, i, fraction(1, 2 ** a), { formatInteractif: 'fraction' })
                  break
                case 'c':
                  texte = `On lance un dé cubique équilibré.<br>Quelle est la probabilité d’obtenir un multiple de $${b}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `Comme il y a $${5 - b}$ multiples de $${b}$, la probabilité d'ibtenir un multiple de $${b}$ est $\\dfrac{${5 - b}}{6}=\\dfrac{1}{${b}}$.`
                  setReponse(this, i, fraction(1, b), { formatInteractif: 'fraction' })
                  break
                case 'd':
                  texte = `On lance deux dés cubiques équilibrés.<br>Quelle est la probabilité d’obtenir un total de $${c}$ ?<br>Donner le résultat sous la forme d'une fraction irréductible.`
                  texteCorr = `Sur 36 cas possibles équiprobables, il y en a $${p[c - 2]}$ qui donnent une somme de $${c}$. Donc la probabilité d'obtenir un total de $${c}$ est $\\dfrac{${p[c - 2]}}{36}${simplificationDeFractionAvecEtapes(p[c - 2], 36)}$.`
                  setReponse(this, i, fraction(p[c - 2], 36).simplifie(), { formatInteractif: 'fraction' })
                  break
              }
              break

            case 8:// nbre de solution d'une équation (existe en question simple can2L01)
              a = randint(1, 9)
              b = randint(1, 9)
              texte = ` Combien de solutions réelles possède l'équation $-x^2+${a}=${b}$ ?<br>
              
                                   `
              if (a - b > 0) {
                texteCorr = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
              $${a - b}$ étant strictement positif, cette équation a deux solutions : $${texRacineCarree(a - b)}$ et  $-${texRacineCarree(a - b)}$.
               `
                setReponse(this, i, '2')
              }

              if (a - b === 0) {
                texteCorr = `L'équation est équivalente à$-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
              cette équation a une seul solution réelle : 0.

               `
                setReponse(this, i, '1')
              }
              if (a - b < 0) {
                texteCorr = `L'équation est équivalente à $-x^2=${b}-${a}$, soit $x^2=${a - b}$.<br>
             Cette équation n'a pas de solution réelle car $${a - b}<0$.
               `
                setReponse(this, i, '0')
              }
              break
          }

          break
      }

      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireTexte = ['Choix des questions (nombres séparés par des tirets)',
  `1 : produit d'entiers\n
  2 : somme ou différence d'entiers\n
  3 : Tiers, moitié, proportions d'une quantité\n
  4 : Conversion heures, minutes .... ou changements d'unités\n
  5 : Calculs avec des fractions simples <-> écriture décimale\n
  6 : pourcentage simple\n
  7 : *10, 100 0,1...ou division\n
  8 : droite graduée,encadrement, arrondi, position des chiffres\n
  9 : petits problèmes avec division euclidienne, partage, de plus, de moins, rendu de monnaie......\n
  10 : fraction simplification ou calcul avec racines carrées\n
  11 :  proportionnalité\n
  12 : problème avec des fractions ou calcul numérique\n
  13 : coefficient directeur calcul et lecture graphique\n
  14 : calcul littéral1, équation (pas id remarquables)\n
  15 : Périmètre/aires, agrandissement/réduction\n
  16 : calculs astucieux, calculs avec parenthèses, puissances (1)\n
  17 :pourcentage 1 (évolution, proportion,....)\n
  18 : probabilité, denombrement\n
  19 : Milieu/distance\n
  20 : triangle (pythagore, thalès, angles, trigo ...)\n
  21 :  image/antécédents par une fonction\n
  22 :Droites\n
  23 : arithmétique, calculs (y compris astucieux) ,  racines carrées, programme de calcul, puissances (\n
  24 : statistiques\n
  25 :  inéquation, inégalités, intervalles, signes\n
  26 : fonction (calcul, VI)x\n
  27 : Calcul littéral2 (avec id) , équations\n
  28 : Problèmes avec vitesse, heures, conversions....\n
  29 : vecteurs\n
  30 : "question surprise", Questions diverses`]
}
