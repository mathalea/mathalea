import { setReponse } from '../../modules/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive'
import { arrondi, choice, combinaisonListes, listeQuestionsToContenu, prenom, randint, texNombre, texPrix } from '../../modules/outils'
import { aleaVariables, resoudre } from '../../modules/outilsMathjs'
import Exercice from '../Exercice'
export const titre = 'Problèmes à mettre en équation et à résoudre'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export default class ProblemesEnEquation extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.nbQuestions = 6
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    const listeTypeDeProblemes = ['basket', 'achats', 'polygone', 'basket2', 'programmes', 'programmes2']
    const listeDeProblemes = combinaisonListes(listeTypeDeProblemes, this.nbQuestions)
    for (let i = 0, cpt = 0, texte, x, a, b, c, d, variables, enonce, figure, intro, conclusion, equation, resolution, verification, texteCorr; i < this.nbQuestions && cpt < 50;) {
      const quidam = prenom(2)
      // const n = 0 // un paramètre entier qui peut servir dans certains cas.
      const produit = choice(['fraises', 'pêches', 'poires', 'pommes', 'mangues', 'prunes', 'citrons'])
      const polygones = ['triangle', 'quadrilatère', 'pentagone', 'hexagone']
      switch (listeDeProblemes[i]) {
        case 'basket':
          x = randint(5, 15) // nombre de paniers à trois points
          a = randint(5, 12) // nombres de paniers à deux points de plus que x
          b = randint(15, 30) // nombre de points marqués au lancer franc
          c = 0 // ne sert pas dans ce cas
          d = b + (a + x) * 2 + x * 3 // nombre de points de la partie
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
          x = randint(17, 27) // nombre de paniers à deux points
          a = randint(5, 12) // nombres de paniers à trois points de moins que de paniers à 2 points
          b = randint(15, 30) // nombre de points marqués au lancer franc
          d = b + (x - a) * 3 + x * 2 // nombre de points de la partie
          c = 0 // ne sert pas dans ce cas
          equation = `x*2+(x-${a})*3+${b}=${d}`
          resolution = resoudre(equation, { reduceSteps: false, substeps: true, comment: true })
          enonce = `Une équipe de basket a marqué ${d} points lors d'un match. Au cours de ce match, elle a marqué ${b} points sur lancers francs.<br>`
          enonce += `L'équipe a marqué ${a} paniers à trois points de moins que de paniers à deux points.<br>Combien a-t-elle marqué de paniers à deux points ?`
          intro = `Posons $x$ le nombre de paniers à deux points.<br>Le nombre de paniers à trois points est donc $x-${a}$.<br>`
          intro += 'Le score de l\'équipe fournit donc l\'équation: <br>'
          conclusion = `<br>L'équipe a donc marqué ${x} paniers à deux points.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break

        case 'achats':
          x = arrondi(randint(2, 5) + randint(0, 1) / 2, 2) // prix de 1kg de produit
          a = arrondi(randint(2, 7) + randint(0, 4) / 5, 1) // nombre de kg de produit
          b = arrondi(a * x, 2) // prix total du produit
          d = b > 50 ? 100 : b > 20 ? 50 : b > 10 ? 20 : 10 // valeur du billet donné
          c = 0 // ne sert pas dans ce cas
          equation = `${a}*x+${arrondi(d - b, 2)}=${d}`
          resolution = resoudre(equation, { substeps: true, comment: true })
          enonce = `${quidam[0]} a acheté $${texNombre(a)}$ kg de ${produit} avec un billet de ${d} €. Le marchand lui a rendu ${texPrix(d - b)} €.<br>`
          enonce += `Quel est le prix d'un kilogramme de ${produit} ?`
          intro = `Posons $x$ le prix d'un kilogramme de ${produit}.<br>L'énoncé se traduit par l'équation suivante :<br>`
          conclusion = `<br>Le prix d'un kilogramme de ${produit} est donc de $${texNombre(x)}$ €.`
          figure = ''
          verification = `<br>Vérification :<br>$${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$`
          break
        case 'polygone':
          x = arrondi(randint(2, 4) + randint(0, 45) / 5, 2) // longueur d'un des côtés égaux
          a = arrondi(randint(2, 5) + randint(0, 45) / 5, 1) // longueur du côté différent
          b = randint(2, 5) // nombre de côtés égaux du polygone
          d = arrondi(b * x + a, 1) // périmètre du polygone
          c = 0 // ne sert pas dans ce cas
          equation = `${b}*x+${a}=${d}`
          resolution = resoudre(equation, { reduceSteps: true, substeps: false, comment: true })
          enonce = `Un ${polygones[b - 2]} possède un côté de longueur $${texNombre(a)}$ cm et tous ses autres côtés ont même longueur.<br>Son périmètre mesure $${texNombre(d)}$ cm.<br>`
          enonce += 'Quel est la longueur des côtés de même longueur ?'
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
          enonce += 'Quel est le nombre de départ ?'
          intro = 'Posons x le nombre choisi au départ.<br>'
          intro += `Le programme de calcul effectué par ${quidam[0]} se traduit par : $(x+${b})\\times ${a}$.<br>`
          intro += `Le programme de calcul effectué par ${quidam[1]} se traduit par : $(x+${d})\\times ${c}$.<br>`
          intro += 'L\'égalité des résultats se traduit par l\'équation suivante :<br>'
          conclusion = `${quidam[0]} et ${quidam[1]} on donc choisi au départ le nombre ${x}.`
          figure = ''
          verification = `Vérification :
          <br>
          D'une part : $${resolution.verifLeftSide.printExpression}=${resolution.verifLeftSide.printResult}$
          <br>
          D'autre part : $${resolution.verifRightSide.printExpression}=${resolution.verifRightSide.printResult}$
          `
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
