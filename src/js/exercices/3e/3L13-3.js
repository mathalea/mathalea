import { codageSegments, homothetie, mathalea2d, point, polygone, polygoneAvecNom, segment, texteParPosition } from '../../modules/2d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive'
import { arrondi, choice, combinaisonListes, ecritureAlgebrique, listeQuestionsToContenu, prenom, texNombre, texPrix } from '../../modules/outils.js'
import { aleaVariables, resoudre } from '../../modules/outilsMathjs.js'
import Exercice from '../Exercice.js'
export const titre = 'Problèmes à mettre en équation et à résoudre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '15/02/2022'
/**
 * @author Jean-Claude Lhote
 * Différents problèmes à résoudre.
 * Mise en équation de degré 1 à une inconnue, résolution et vérification.
 * Réf : 3L13-3
 * Date de publication 15/02/2022
 */
export default class ProblemesEnEquation extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 2
    this.sup = 2
  }

  figureThales (a, b, c, OC) {
    const O = point(1.5, 0, 'O')
    const B = point(4, 6, 'B')
    const A = point(0, 5, 'A')
    const D = homothetie(B, O, 0.4, 'D')
    const C = homothetie(A, O, 0.4, 'C')
    const OAB = polygoneAvecNom(O, C, A, B, D)
    const CD = segment(C, D)
    const longOC = texteParPosition(`${OC}`, 0.5, 1)
    const longCA = texteParPosition(`${b}`, 0, 3)
    const longAB = texteParPosition(`${c}`, 2, 6)
    const longCD = texteParPosition(`${a}`, 1.5, 2.5)
    return mathalea2d({ xmin: -1, xmax: 5, ymin: -1, ymax: 7, pixelsParCm: 20, scale: 0.8, zoom: 1 }, OAB[0], OAB[1], longOC, longCA, longAB, longCD, CD)
  }

  triangleIsocele1 () {
    const O = point(6, 1.5)
    const B = point(0, 0)
    const A = point(0, 3)
    const OAB = polygone(O, A, B)
    const codage = codageSegments('//', 'black', O, A, O, B)
    return mathalea2d({ xmin: -1, xmax: 7, ymin: -1, ymax: 4, pixelsParCm: 20, scale: 0.8, zoom: 1 }, OAB, codage)
  }

  triangleIsocele2 () {
    const O = point(3, 1.5)
    const B = point(6, 0)
    const A = point(0, 0)
    const OAB = polygone(O, A, B)
    const codage = codageSegments('//', 'black', O, A, O, B)
    return mathalea2d({ xmin: -1, xmax: 7, ymin: -1, ymax: 2.5, pixelsParCm: 20, scale: 0.8, zoom: 1 }, OAB, codage)
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeProblemes
    if (parseInt(this.sup) === 1) {
      listeTypeDeProblemes = ['basket', 'achats', 'polygone', 'basket2', 'programmes', 'programmes2', 'tarifs', 'spectacle', 'isocele']
    } else {
      listeTypeDeProblemes = ['basket', 'achats', 'polygone', 'basket2', 'programmes', 'programmes2', 'Thales', 'Thales2', 'tarifs', 'spectacle', 'isocele']
    }
    const listeDeProblemes = combinaisonListes(listeTypeDeProblemes, this.nbQuestions)
    for (let i = 0, cpt = 0, texte, x, a, b, c, d, variables, enonce, figure, intro, conclusion, equation, resolution, verification, texteCorr; i < this.nbQuestions && cpt < 50;) {
      const quidam = prenom(2)
      // const n = 0 // un paramètre entier qui peut servir dans certains cas.
      const produit = choice(['fraises', 'pêches', 'poires', 'pommes', 'mangues', 'prunes', 'citrons'])
      const polygones = ['triangle', 'quadrilatère', 'pentagone', 'hexagone']
      const clubs = ['ciné-club', 'club de fitness', 'club de ski']
      switch (listeDeProblemes[i]) {
        case 'basket':
          variables = aleaVariables(
            {
              x: 'randomInt(5,15)',
              a: 'randomInt(5,12)',
              b: 'randomInt(15,30)',
              d: 'b+(a+x)*2+x*3'
            }
            , { valueOf: true })
          x = variables.x // nombre de paniers à trois points
          a = variables.a // nombres de paniers à deux points de plus que x
          b = variables.b // nombre de points marqués au lancer franc
          c = 0 // ne sert pas dans ce cas
          d = variables.d // nombre de points de la partie
          equation = `x*3+(${a}+x)*2+${b}=${d}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: true, comment: true })
          enonce = `Une équipe de basket a marqué ${d} points lors d'un match. Au cours de ce match, elle a marqué ${b} points sur lancers francs.<br>`
          enonce += `L'équipe a marqué ${a} paniers à deux points de plus que de paniers à trois points.<br>Combien a-t-elle marqué de paniers à trois points ?`
          intro = `Posons $x$ le nombre de paniers à trois points.<br>Le nombre de paniers à deux points est donc $${a}+x$.<br>`
          intro += 'Le score de l\'équipe fournit donc l\'équation: <br>'
          conclusion = `<br>L'équipe a donc marqué ${x} paniers à trois points.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'basket2':
          variables = aleaVariables(
            {
              x: 'randomInt(17,27)',
              a: 'randomInt(5,12)',
              b: 'randomInt(15,30)',
              d: 'b+(x-a)*3+x*2'
            }
            , { valueOf: true })
          x = variables.x // nombre de paniers à deux points
          a = variables.a // nombres de paniers à trois points de moins que de paniers à 2 points
          b = variables.b // nombre de points marqués au lancer franc
          d = variables.d // nombre de points de la partie
          c = 0 // ne sert pas dans ce cas
          equation = `x*2+(x-${a})*3+${b}=${d}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: true, comment: true, suppr1: false })
          enonce = `Une équipe de basket a marqué ${d} points lors d'un match. Au cours de ce match, elle a marqué ${b} points sur lancers francs.<br>`
          enonce += `L'équipe a marqué ${a} paniers à trois points de moins que de paniers à deux points.<br>Combien a-t-elle marqué de paniers à deux points ?`
          intro = `Posons $x$ le nombre de paniers à deux points.<br>Le nombre de paniers à trois points est donc $x-${a}$.<br>`
          intro += 'Le score de l\'équipe fournit donc l\'équation: <br>'
          conclusion = `<br>L'équipe a donc marqué ${x} paniers à deux points.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break

        case 'achats':
          variables = aleaVariables(
            {
              a: 'randomInt(2,5)+randomInt(0,4)/5',
              x: 'randomInt(2,5)+randomInt(0,1)/2',
              b: 'a*x',
              test: 'b<100 and b>5 and b%10!=0'
            }
            , { valueOf: true })
          x = variables.x // prix de 1kg de produit
          a = variables.a // nombre de kg de produit
          b = variables.b // prix total du produit
          d = b > 50 ? 100 : b > 20 ? 50 : b > 10 ? 20 : 10 // valeur du billet donné
          c = 0 // ne sert pas dans ce cas
          equation = `${a}*x+${arrondi(d - b, 2)}=${d}`
          resolution = resoudre(equation, { substeps: true, comment: true })
          enonce = `${quidam[0]} a acheté $${texNombre(a)}$ kg de ${produit} avec un billet de $${d}$ €. Le marchand lui a rendu $${texPrix(d - b)}$ €.<br>`
          enonce += `Quel est le prix d'un kilogramme de ${produit} ?`
          intro = `Posons $x$ le prix d'un kilogramme de ${produit}.<br>L'énoncé se traduit par l'équation suivante :<br>`
          conclusion = `<br>Le prix d'un kilogramme de ${produit} est donc de $${texNombre(x)}$ €.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'polygone':
          variables = aleaVariables(
            {
              x: 'randomInt(2,4)+randomInt(0,45)/5',
              a: 'randomInt(2,5)+randomInt(0,45)/5',
              b: 'randomInt(2,5)',
              d: 'b*x+a'
            }
            , { valueOf: true })
          x = variables.x // longueur d'un des côtés égaux
          a = variables.a // longueur du côté différent
          b = variables.b // nombre de côtés égaux du polygone
          d = variables.d // périmètre du polygone
          c = 0 // ne sert pas dans ce cas
          equation = `${b}*x+${a}=${d}`
          resolution = resoudre(equation, { reduceSteps: true, substeps: false, comment: true })
          enonce = `Un ${polygones[b - 2]} possède un côté de longueur $${texNombre(a)}$ cm et tous ses autres côtés ont même longueur.<br>Son périmètre est $${texNombre(d)}$ cm.<br>`
          enonce += 'Quelle est la longueur des côtés de même longueur ?'
          intro = 'Posons $x$ la longueur des côtés de même longueur.<br>'
          intro += `Un ${polygones[b - 2]} possède ${b + 1} côtés, donc celui-ci possède ${b} côtés de même longueur.<br>`
          intro += 'L\'énoncé se traduit par l\'équation suivante :<br>'
          conclusion = `<br>Les côtés de même longueur mesure donc $${texNombre(x)}$ cm.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'programmes':
          variables = aleaVariables(
            {
              a: 'randomInt(2,15)',
              b: 'randomInt(1,10)',
              c: 'randomInt(2,15)',
              d: 'randomInt(1,10)',
              test: 'abs((c*d-a*b))%abs(a-c) == 0 and (c*d-a*b)*(a-c)>0'
            }
            , { valueOf: true })
          // falls through
        case 'programmes2':
          if (listeDeProblemes[i] === 'programmes2') {
            variables = aleaVariables(
              {
                a: 'randomInt(2,15)',
                b: 'randomInt(1,10)',
                c: 'randomInt(2,15)',
                d: 'randomInt(1,10)',
                test: 'abs((c*d-a*b))%abs(a-c) == 0 and (c*d-a*b)*(a-c)<0'
              }
              , { valueOf: true })
          }
          a = variables.a
          b = variables.b
          c = variables.c
          d = variables.d
          x = Math.round((c * d - a * b) / (a - c))
          equation = `(x+${b})*${a}=(x+${d})*${c}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: false, comment: true })
          enonce = `${quidam[0]} et ${quidam[1]} choisissent un même nombre.<br> ${quidam[0]} lui ajoute ${b} puis multiplie le résultat par ${a} alors que `
          enonce += `${quidam[1]} lui ajoute ${d} puis multiplie le résultat par ${c}.<br>`
          enonce += `${quidam[0]} et ${quidam[1]} obtiennent le même résultat.<br>`
          enonce += `Quel nombre commun ont choisi ${quidam[0]} et ${quidam[1]} ?`
          intro = 'Posons x le nombre choisi au départ.<br>'
          intro += `Le programme de calcul effectué par ${quidam[0]} se traduit par : $(x+${b})\\times ${a}$.<br>`
          intro += `Le programme de calcul effectué par ${quidam[1]} se traduit par : $(x+${d})\\times ${c}$.<br>`
          intro += 'L\'égalité des résultats se traduit par l\'équation suivante :<br>'
          conclusion = `<br>${quidam[0]} et ${quidam[1]} on donc choisi au départ le nombre ${x}.`
          figure = ''
          verification = `<br>Vérification :
          <br>
          D'une part : $${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$
          <br>
          D'autre part : $${resolution.verifRightSide.printExpression}=${resolution.verifRightSide.printResult}$
          `
          break
        case 'Thales':
          variables = variables = aleaVariables(
            {
              a: 'randomInt(5,40)',
              b: 'randomInt(5,40)',
              c: 'randomInt(41,100)',
              d: 'a*b/(c-a)',
              test: 'd>0 and (a*b)%abs(c-a)==0'
            }
            , { valueOf: true })
          a = variables.a
          b = variables.b
          c = variables.c
          d = variables.d
          x = Math.round(d)
          equation = `(x+${b})*${a}=x*${c}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: false, comment: true })
          figure = this.figureThales(a, b, c, '')
          enonce = 'Soit la figure ci-dessous qui n\'est pas en vraie grandeur où $[CD]$ et $[AB]$ sont parallèles.'
          enonce += ` $AB=${c}\\text{mm}$, $AC=${b}\\text{mm}$ et $CD=${a}\\text{mm}$.<br> Déterminer la longueur $OC$.`
          intro = 'Dans cette configuration de Thales, on a l\'égalité suivante : $\\dfrac{OC}{OA}=\\dfrac{CD}{AB}$.<br>'
          intro += 'Cette égalité est équivalente à l\'égalité des produits en croix : $OC\\times AB = CD\\times OA$.<br>'
          intro += 'En remplaçant les longueurs par les données de l\'énoncé et en posant $x=OC$, on obtiens l\'équation suivante :<br>'
          conclusion = `<br>donc $OA=${x}\\text{mm}$.<br>`
          verification = `<br>Vérification :
          <br>
          D'une part : $${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$
          <br>
          D'autre part : $${resolution.verifRightSide.printExpression}=${resolution.verifRightSide.printResult}$
          `
          break
        case 'Thales2':
          variables = variables = aleaVariables(
            {
              a: 'randomInt(5,40)',
              b: 'randomInt(5,40)',
              c: 'randomInt(41,100)',
              d: 'a*b/(c-a)',
              test: 'd>0 and (a*b)%abs(c-a)==0'
            }
            , { valueOf: true })
          a = variables.a
          x = variables.b
          c = variables.c
          d = variables.d
          b = Math.round(d)
          equation = `(x+${b})*${a}=${b}*${c}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: false, comment: true })
          figure = this.figureThales(a, '', c, b)
          enonce = 'Soit la figure ci-dessous qui n\'est pas en vraie grandeur où $[CD]$ et $[AB]$ sont parallèles.'
          enonce += ` $AB=${c}\\text{mm}$, $OC=${b}\\text{mm}$ et $CD=${a}\\text{mm}$.<br> Déterminer la longueur $AC$.`
          intro = 'Dans cette configuration de Thales, on a l\'égalité suivante : $\\dfrac{OA}{OC}=\\dfrac{AB}{CD}$.<br>'
          intro += 'Cette égalité est équivalente à l\'égalité des produits en croix : $CD\\times OA = OC\\times AB$.<br>'
          intro += 'En remplaçant les longueurs par les données de l\'énoncé et en posant $x=OC$, on obtiens l\'équation suivante :<br>'
          conclusion = `<br>donc $CA=${x}\\text{mm}$.<br>`
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'tarifs':
          variables = aleaVariables(
            {
              a: 'randomInt(0,2)',
              b: 'randomInt(50,80)/10',
              c: 'randomInt(4,10)*5',
              d: 'b-randomInt(2,6)*0.5',
              test: 'c/(b-d)<30 and c/(b-d)>10 and (c*2)%((b-d)*2)==0'
            }
            , { valueOf: true })
          a = variables.a
          b = variables.b
          c = variables.c
          d = variables.d
          x = Math.ceil(c / (b - d))
          equation = `x*${b}>=${c}+x*${d}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: false, comment: true })
          enonce = `Le ${clubs[a]} d'un village propose deux tarifs à ses pratiquants.<br>`
          enonce += `Le tarif A propose de payer $${texPrix(b)}$ € à chaque séance.<br>`
          enonce += `Le tarif B propose de payer un abonnement annuel de $${texPrix(c)}$ € puis de payer $${texPrix(d)}$ € par séance.<br>`
          enonce += 'Pour quel nombre de séances le tarif B devient-il plus avantageux que le tarif A ?'
          intro = 'Posons $x$ le nombre de séances.<br>'
          intro += `Le prix à payer avec le tarif A est : $x\\times ${texPrix(b)}$.<br>`
          intro += `Le prix à payer avec le tarif B est : $${texPrix(c)}+x\\times ${texPrix(d)}$.<br>`
          intro += 'Pour que le tarif B soit plus avantageux, $x$ doit vérifier l\'inéquation suivante:<br>'
          conclusion = `<br>C'est à partir de $${x}$ séances que le tarif B devient plus avantageux que le tarif A (pour $${x}$ séances, les deux tarifs sont équivalents).`
          figure = ''
          verification = `<br>Vérification :
          <br>
          D'une part : $${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$
          <br>
          D'autre part : $${resolution.verifRightSide.printExpression}=${resolution.verifRightSide.printResult}$
          `
          //  verification = `<br>Vérification :<br>$${x}\\times ${texPrix(b)}=${texPrix(x * b)}$ et $${c}+${x}\\times ${texPrix(d)}=${c}+${texPrix(x * d)}= ${texPrix(c + x * d)}$.<br>`
          break
        case 'spectacle':
          variables = aleaVariables(
            {
              a: 'randomInt(200,300)*10',
              b: 'randomInt(100,200)/10',
              c: 'randomInt(50,150)/10',
              x: 'randomInt(1000,a-500)',
              d: 'b*x+(a-x)*c',
              test: 'b>c'
            }
            , { valueOf: true })
          a = variables.a
          b = variables.b
          c = variables.c
          d = variables.d
          x = variables.x
          equation = `x*${b}+(${a}-x)*${c}=${d}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: true, comment: true })
          enonce = `Dans une salle de spectacle de $${texNombre(a)}$ places, le prix d'entrée pour un adulte est $${texPrix(b)}$ € et pour un enfant il est de $${texPrix(c)}$ €.<br>`
          enonce += `Le spectacle de ce soir s'est déroulé devant une salle pleine et la recette est de $${texPrix(d)}$ €.<br>`
          enonce += 'Combien d\'adultes y avait-il dans la salle ?'
          intro = 'Posons $x$ le nombre de places adultes vendues.<br>'
          intro += `Comme les $${texNombre(a)}$ places ont été vendues, le nombre de places enfants est : $${a}-x$.<br>`
          intro += 'Le calcul de la recette donne l\'équation suivante.<br>'
          conclusion = `<br>Il y a donc eu $${texNombre(x)}$ adultes au spectacle.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'isocele':
          variables = aleaVariables(
            {
              a: 'randomInt(50,100)',
              c: '(1-2*round(randomInt(0,2)))*randomInt(10,30)',
              b: 'a+c',
              d: 'd=2*a+b',
              test: 'a+a>b and b>0'
            }
            , { valueOf: true })
          a = variables.a
          b = variables.b
          c = variables.c
          d = variables.d
          enonce = `Un triangle isocèle a pour périmètre $${d}$ mm. `
          if (c > 0) { // La base est le plus grand côté
            enonce += `Sa base est plus grande que les côtés égaux de $${c}$ mm.`
          } else { // La base est plus petite que les autres côtés
            enonce += `Sa base est plus petite que les côtés égaux de $${-c}$ mm.`
          }
          if (choice([true, false])) {
            enonce += '<br>Quelle est la mesure de sa base ? (la figure n\'est pas en vraie grandeur)'
            intro = `Posons $x$ la longueur de sa base. La longueur des côtés égaux est : $x${ecritureAlgebrique(-c)}$.<br>`
            intro += 'Le calcul du périmètre donne l\'équation suivante :<br>'
            equation = `2*(x${ecritureAlgebrique(-c)})+x=${d}`
            conclusion = `<br>La base de ce triangle isocèle mesure donc $${b}$ mm.`
            x = b
          } else {
            enonce += '<br>Quelle est la mesure de ses côtés égaux ? (la figure n\'est pas en vraie grandeur)'
            intro = `Posons $x$ la longueur d'un des côtés égaux. La longueur de la base est : $x${ecritureAlgebrique(c)}$.<br>`
            intro += 'Le calcul du périmètre donne l\'équation suivante :<br>'
            equation = `2*x+x${ecritureAlgebrique(c)}=${d}`
            conclusion = `<br>Les deux côtés égaux de ce triangle isocèle mesurent donc $${a}$ mm.`
            x = a
          }
          resolution = resoudre(equation, { reduceSteps: false, substeps: true, comment: true, suppr1: false })
          if (c > 0) figure = this.triangleIsocele2()
          else figure = this.triangleIsocele1()
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
      }

      texte = enonce + figure + ajouteChampTexteMathLive(this, i, 'largeur10')
      texteCorr = intro
      texteCorr += `$${resolution.equation}$`
      texteCorr += '<br>Résolvons l\'équation :<br>'
      texteCorr += resolution.texteCorr
      texteCorr += verification
      texteCorr += conclusion

      if (this.questionJamaisPosee(i, x, a, b, d)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        setReponse(this, i, x, { formatInteractif: 'calcul' })
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
