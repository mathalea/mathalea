import Exercice from '../Exercice.js'
import { fraction } from '../../modules/fractions.js'
import {
  mathalea2d, point, droiteGraduee2, segment, milieu, texteParPosition, codeSegment
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, miseEnEvidence, combinaisonListesSansChangerOrdre, range1, randint, texNombre, shuffle, choice, calcul, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN Sixième sujet 2022'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '11/04/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * Gilles Mora
 * Référence
*/

function compareNombres (a, b) {
  return a - b
}
export default function SujetCAN2022Sixieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 1// 10,20,30
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(1), this.nbQuestions)
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
    const typeQuestionsDisponibles = [12]

    const listeFractions15 = [[1, 3], [2, 3], [1, 6], [5, 6], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5]
    ]
    const listeFractions20 = [[1, 10], [3, 10], [7, 10], [9, 10], [1, 2], [1, 4], [3, 4]
    ]
    const nombre18 = [
      ['dixièmes', 10],
      ['centième', 100],
      ['millième', 1000]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, maListe, propositions, m, n, code1, code2, choix, truc, a, b, c, d, k, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$ `
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 2:

          a = randint(11, 25, 20) * 2
          reponse = a / 2
          texte = `La moitié de $${a}$ est : `
          texteCorr = `La moitié de $${a}$ est $${a}\\div 2=${a / 2}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '\\ldots' }
          nbChamps = 1
          break

        case 3:
          a = randint(12, 39, [20, 30])

          reponse = 100 - a
          texte = `Complète : <br>$${a}+\\ldots =100$ `

          texteCorr = `$100-${a}=${100 - a}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          }
          nbChamps = 1
          break

        case 4:
          a = randint(2, 6)
          k = randint(2, 4)
          b = k * a
          reponse = k * b
          texte = `$${a}$ cahiers coûtent $${b}$ €.<br>
             $${b}$ cahiers coûtent `

          texteCorr = `$${a}$ cahiers coûtent $${b}$ €.<br>
            $${k}\\times${a}=${k * a}$ cahiers coûtent $${k}\\times${b}=${k * b}$ €.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +
            '€'
          } else { texte += '$\\ldots$ €' }
          nbChamps = 1
          break
        case 5:
          a = randint(1, 11) * 5
          b = choice([1, 2])
          texte = `$${b}$ h $${a}$ min $=$
             `

          texteCorr = `$${b}$ h $${a}$ min $=${b}\\times 60+ ${a}$ min $=${b * 60 + a}$ min`

          reponse = b * 60 + a

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'min' } else { texte += '$\\ldots$ min' }
          nbChamps = 1
          break

        case 6:
          a = randint(84, 100) // choix de la table = écart entre deux graduations

          d = droiteGraduee2({
            Unite: 0.5,
            Min: 81,
            Max: 105,
            x: 0,
            y: 0,
            thickDistance: 10,
            thickSec: true,
            thickSecDist: 1,
            thickOffset: 0,
            axeStyle: '->',
            pointListe: [[a, '$\\large{?}$']],
            labelListe: maListe,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: true
          })
          reponse = a
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.6, style: 'margin: auto' }, d)
          texteCorr = `Le nombre écrit sous le point d'interrogation est : $${a}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 7:
          a = randint(21, 38, [30, 29])
          b = choice([19, 29, 39])

          texte = `$${a}+${b}=$`
          reponse = a + b
          if (b === 19) { texteCorr = `$${a}+${b}=${a}+20-1=${a + 20}-1=${reponse}$` }
          if (b === 29) { texteCorr = `$${a}+${b}=${a}+30-1=${a + 30}-1=${reponse}$` }
          if (b === 39) { texteCorr = `$${a}+${b}=${a}+40-1=${a + 40}-1=${reponse}$` }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 8:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            a = randint(4, 9) * 3

            reponse = a / 3
            texte = `$${a}$ élèves se mettent par groupe de $3$. <br>
          Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 3=${a / 3}$.`
          }
          if (choix === 'b') {
            a = randint(4, 9) * 4

            reponse = a / 4
            texte = `$${a}$ élèves se mettent par groupe de $4$. <br>
            Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'c') {
            a = randint(4, 7) * 5

            reponse = a / 5
            texte = `$${a}$ élèves se mettent par groupe de $5$. <br>
                Il y a `
            texteCorr = `Le nombre de groupes est donné par $${a}\\div 5=${a / 5}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'groupes' } else { texte += '$\\ldots$ groupes.' }
          nbChamps = 1
          break

        case 9:

          choix = choice(['a', 'b', 'c'])//, 'b', 'c'
          if (choix === 'a') {
            a = randint(4, 9) * 4

            reponse = a / 4
            texte = `Le quart de $${a}$ est :  `
            texteCorr = `Le quart de $${a}$ est : $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'b') {
            a = choice([100, 200, 40, 80, 120, 160])

            reponse = a / 4
            texte = `Le quart de $${a}$ est :  `
            texteCorr = `Le quart de $${a}$ est : $${a}\\div 4=${a / 4}$.`
          }
          if (choix === 'c') {
            a = randint(4, 10) * 3

            reponse = a / 3
            texte = `Le tiers de $${a}$ est :  `
            texteCorr = `Le tiers de $${a}$ est : $${a}\\div 3=${a / 3}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$ ' }
          nbChamps = 1
          break

        case 10:
            a = randint(4,9)
            b = randint(2,9)
            c=randint(2,5,[a,b])
            texte = `Complète :<br>
            $${a}+${b}=\\ldots+${c}$`
            reponse = a+b-c
            texteCorr = `Le nombre cherché est : $${a}+${b}-${c}=${reponse}$.` 
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
            nbChamps = 1
          break

        case 11:

          a = randint(1, 9) + randint(3, 7) / 10
          k = choice([10,100,1000])
          reponse = a * k
          texte = `$${texNombre(a)}\\times ${k}=$`

          texteCorr = `$${texNombre(a)}\\times ${k}=${texNombre(a * k)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:
          a = randint(14, 19)
          b = choice([35,40,45,50,55])
         c=a+2
         d=b-choice([5,10,15,20,25,30])
          
          texte = `Un film commence à $${a}$ h $${b}$ et se termine à $${c}$ h $${d}$.<br>
          Combien de temps a duré le film ?`

          texteCorr = `Pour aller à $${a+1}$ h, il faut $${60-b}$ min, et il faut ajouter $1$ heure et $${d}$ min pour arriver à $${c}$ h $${d}$, soit au total $1$ h $${60-b+d}$ min.`

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, 60-b+d, { formatInteractif: 'calcul' })
          }
          nbChamps = 2
          break

        case 13:

          a = randint(2, 5) 
          reponse = 4*a
          texte = `Complète :<br>$${a}=`

          texteCorr = `$${a}=\\dfrac{${4*a}}{4}$, donc  `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')+'quarts' }else{texte+='\\ldots$ quarts'}
          nbChamps = 1

          break

        case 14:

          a = randint(3, 10)
          b = randint(a + 1, 20)
          reponse = b - a
          texte = `À midi, j'ai gagné $${a}$ cartes.<br>
            J'en ai maintenant $${b}$.<br>
            J'avais $\\ldots$ cartes ce matin.`

          texteCorr = `J'avais $${b}-${a}$ cartes ce matin, soit $${b - a}$ cartes.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 15:
          a = choice(listeFractions15)
          b = fraction(a[0], a[1])

          texte = `Quelle est la mesure de ce segment ?<br>
          `

          texteCorr = `L'unité est divisée en $${b.d}$. La mesure du segment est donc : $\\dfrac{${b.n}}{${b.d}}$ unité.`

          reponse = fraction(b.n, b.d).simplifie()
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité' } else { texte += '$\\ldots$ unité' }
          nbChamps = 1
          break

        case 16:
          if (choice([true, false])) {
            a = randint(3, 6) + randint(2, 9) / 10
            b = randint(7, 9) + randint(2, 9) / 10

            propositions = shuffle([`$${Math.floor(a * b)}$`, `$${Math.floor(a + b)}$`, `$${Math.floor(a * b * 10)}$`])
            reponse = Math.floor(a * b)
            texte = `Recopie  le nombre le plus proche de  $${texNombre(a)}\\times ${texNombre(b)}$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = `En remplaçant $${texNombre(a)}$ par $${Math.round(a)}$ et $${texNombre(b)}$ par $${Math.round(b)}$, on obtient : <br>
          $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a) * Math.round(b)}$, donc le nombre le plus proche est : $${Math.floor(a * b)}$.`
          } else {
            a = randint(12, 19) + randint(2, 9) / 10
            b = randint(15, 29, 20) + randint(2, 9) / 10

            propositions = shuffle([`$${Math.floor(a * b)}$`, `$${Math.floor(a + b)}$`, `$${Math.floor(a * b * 10)}$`])
            reponse = Math.floor(a * b)
            texte = `Recopie  le nombre le plus proche de  $${texNombre(a)}\\times ${texNombre(b)}$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = 'Le produit de ces deux nombres donne un nombre a trois chiffres.'
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = choice([10, 20])
          b = randint(7, 9) + randint(1, 9) / 10
          c = a - b
          texte = `Avec $${a}$  €, j'achète un livre à $${texNombre(b)}$  €. <br>
          On me rend 
      `
          texteCorr = `On me rend : $${a}-${texNombre(b)}=${texNombre(a - b)}$ €.`
          reponse = c
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' } else { texte += '$\\ldots$ €' }
          nbChamps = 1
          break

        case 18:
          a = randint(0, 2)

          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            texte = `Combien de ${nombre18[a][0]} dans une unité ?
      `
            texteCorr = `Dans une unité, il y a $${nombre18[a][1]}$ ${nombre18[a][0]}`
            reponse = nombre18[a][1]
          }

          if (choix === 'b') {
            texte = `Combien de ${nombre18[a][0]} dans une dizaine ?
          `
            texteCorr = `Dans une dizaine, il y a $${nombre18[a][1]}\\times 10$ soit $${nombre18[a][1] * 10}$ ${nombre18[a][0]}`
            reponse = nombre18[a][1] * 10
          }

          if (choix === 'c') {
            texte = `Combien de ${nombre18[a][0]} dans une centaine ?
          `
            texteCorr = `Dans une centaine, il y a $${nombre18[a][1]}\\times 100$ soit $${nombre18[a][1] * 100}$ ${nombre18[a][0]}`

            reponse = nombre18[a][1] * 100
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$ €' }
          nbChamps = 1
          break

        case 19:

          a = randint(2, 9) * 10
          reponse = a * 3
          texte = `Le triple de $${a}$
      `
          texteCorr = `Le triple de $${a}$ est égal à $${a}\\times 3 =${a * 3}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          break

        case 20:

          a = choice(listeFractions20)
          b = fraction(a[0], a[1])
          propositions = shuffle([`$${texNombre(a[0] / a[1])}\\%$`, `$${texNombre(a[0] / a[1] * 100)}\\%$`, `$${texNombre(a[1])}\\%$`, `$${a[0]},${a[1]}\\%$`])
          reponse = a[0] / a[1] * 100
          texteCorr = `$\\dfrac{${a[0]}}{${a[1]}}=${texNombre(a[0] / a[1])}=${texNombre((a[0] / a[1]) * 100)}\\%$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte = `Recopie le pourcentage correspondant à $\\dfrac{${a[0]}}{${a[1]}}$.<br>
        `
            texte += `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}${sp(6)} ${propositions[3]}`
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '$\\%$'
          } else {
            texte = `Entoure le pourcentage correspondant à $${texNombre(b)}$.<br>
                           ${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}${sp(6)} ${propositions[3]}`
          }

          nbChamps = 1
          break

        case 21:
          if (choice([true, false])) {
            a = randint(1, 9) * 40
            texte = `Le quart de $${a}$ km.`
            reponse = a / 4
            texteCorr = `Le quart de $${a}$ km est égal à $${a}\\div 4=${a / 4}$ km.`
          } else {
            a = randint(1, 9) * 30
            texte = `Le tiers de $${a}$ km.`
            reponse = a / 3
            texteCorr = `Le tiers de $${a}$ km est égal à $${a}\\div 3=${a / 3}$ km.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km'
          } else { texte += '$\\ldots$ km' }

          nbChamps = 1

          break

        case 22:
          if (choice([true, false])) {
            a = randint(1, 9) * 40
            texte = `$25\\%$ de $${a}$ km.`
            reponse = a / 4
            texteCorr = `$25 \\%$ de $${a}$ km est égal à $${a}\\div 4=${a / 4}$ km.`
          } else {
            a = randint(1, 9) * 50
            texte = `$20\\%$ de $${a}$ km.`
            reponse = a / 5
            texteCorr = `$20 \\%$ de $${a}$ km est égal à $${a}\\div 5=${a / 5}$ km.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km'
          }

          nbChamps = 1

          break
        case 23:
          a = randint(3, 6)
          b = randint(22, 32)
          propositions = shuffle([`$${b}$`, `$${a * b}$`, `$${a * b * 20}$`])
          reponse = a * b
          texte = `Chaque élève de la classe ramène $${a}$ feuilles.<br>
          `
          texteCorr = `La seule réponse vraisemblable est $${a * b}$ feuilles. <br>
          On peut prendre $30$ élèves dans la classe comme valeur possible : $30\\times ${a}=${30 * a}$ feuilles.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += `Recopie la réponse vraisemblable.<br>
              ${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'feuilles'
          } else {
            texte += `Entoure la réponse vraisemblable.<br> 
            ${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
          }

          nbChamps = 1
          break

        case 24:
          a = randint(11, 29)
          b = randint(3, 9)
          reponse = a * 100 + b * 1000
          texte = `$${a}$ centaines et $${b}$ milliers $=$ `

          texteCorr = `$${a}$ centaines et $${b}$ milliers $=${texNombre(a * 100)}+${b * 1000}=${texNombre(a * 100 + b * 1000)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 25:
          if (choice([true, false])) {
            a = randint(1, 10) * choice([1, 10])
            reponse = calcul(a * 100)
            texte = `$${texNombre(a)}$ m  =`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += '$\\ldots$ cm' }
            texteCorr = ` Comme $1$ m $=100$ cm,  pour passer des "m" au "cm", on multiplie par $100$.<br>
                        Comme : $${texNombre(a)}\\times 100 =${texNombre(a * 100)}$, alors $${texNombre(a)}$ m$=${texNombre(a * 100)}$ cm.  
                        `
          } else {
            a = randint(1, 12) * choice([1, 10, 100])
            reponse = calcul(a / 100)
            texte = `$${texNombre(a)}$ cm  =`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm' } else { texte += '$\\ldots$ m' }
            texteCorr = `Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
            Ainsi pour passer des "cm" au "m", on divise par $100$.<br>
              Comme  $${texNombre(a)}\\div 100 =${texNombre(a / 100)}$, alors $${texNombre(a)}$ cm$=${texNombre(a / 100)}$ m.  `
          }

          nbChamps = 1
          break

        case 26:
          a = 2 + randint(1, 5) / 10
          b = 2 + randint(1, 4) / 10
          c = randint(5, 6) - b
          A = point(0, 0, 'A', 'below')
          B = point(2.8, 0, 'B', 'below')
          C = point(3.4, 3.4, 'C', 'above')
          D = point(-0.6, 3.4, 'D', 'above')
          code1 = codeSegment(B, C, '|')
          code2 = codeSegment(A, D, '|')
          xmin = -1.5
          ymin = -1
          xmax = 4
          ymax = 4
          objets = []
          objets.push(
            texteParPosition(`$${texNombre(a)} \\text{ cm}$`, milieu(A, D).x - 0.7, milieu(A, D).y, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${texNombre(b)} \\text{ cm}$`, milieu(A, B).x, milieu(A, B).y - 0.3, 'milieu', 'black', 1, 'middle', true),
            texteParPosition(`$${texNombre(c)} \\text{ cm}$`, milieu(D, C).x, milieu(D, C).y + 0.3, 'milieu', 'black', 1, 'middle', true),
            segment(A, B), segment(B, C), segment(C, D), segment(D, A), code1, code2)
          reponse = 2 * a + b + c
          texte = `Quel est le périmètre de cette figure ? <br>
            `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Le périmètre est donné par la somme des quatre longueurs : $${texNombre(a)}\\times 2+${texNombre(b)}+${texNombre(c)}=${texNombre(2 * a + b + c)}$ cm.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm'
          } else { texte += '  $\\mathscr{P}=\\ldots$ cm' }

          nbChamps = 1
          break
        case 27:
          a = randint(3, 6)
          b = choice([a + 1, 2 * a - 1])
          reponse = fraction(b, a)// .simplifie()
          texte = 'Quelle est la fraction repérée par le point d’interrogation ?<br>' +
           mathalea2d({ xmin: -0.5, ymin: -1, xmax: 10, ymax: 1.5, scale: 0.8, style: 'margin: auto' }, droiteGraduee2({
             Unite: 8,
             Min: 1,
             Max: 2,
             x: 0,
             y: 0,
             thickSecDist: 1 / a,
             thickSec: true,
             thickoffset: 0,
             axeStyle: '|->',
             pointListe: [[b / a, '$\\large ?$']],
             pointCouleur: 'blue',
             pointStyle: 'x',
             labelsPrincipaux: true,
             step1: 1,
             step2: 1
           }))
          texteCorr = `L'unité est divisée en $${a}$. <br>
          $1=\\dfrac{${a}}{${a}}$ et $2=\\dfrac{${2 * a}}{${a}}$. Ainsi, le point d'interrogation est   $\\dfrac{${b}}{${a}}$.`
          setReponse(this, index, reponse, { formatInteractif: 'fraction' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 28:
          a = randint(5, 11) * 2
          b = choice([5, 7, 9])
          reponse = a * b / 2
          texte = `$2$ BD identiques coûtent $${a}$ €.<br>
          Combien coûtent $${b}$ BD identiques ?
      `
          texteCorr = `Une BD coûte $${a}\\div 2=${a / 2}$ €, donc $${b}$ BD identiques coûtent $${a / 2}\\times ${b}=${reponse}$ €.

          `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + '€' }
          nbChamps = 1
          break

        case 29:
          a = randint(2, 5)
          b = randint(3, 6)

          reponse = a * b
          texte = `Une usine fabrique des tasses.<br>
          $${a}$ tailles et $${b}$ couleurs sont possibles.<br>
          Combien de types de tasses peut-elle fabriquer ?`
          texteCorr = `Elle peut en fabriquer $${a}\\times ${b}=${a * b}$ types différents. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 30:

          a = randint(1, 5)
          texte = `En grisé, on a représenté une unité d'aire, notée uA.<br>
            Quelle est l'aire de la figure hachurée ?`
          texteCorr = '$1$ uA est représentée par  .... petits carreaux. La figure grisée compte .... petits carreaux....'
          reponse = a

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'uA' } else { texte += '<br>Aire $=\\ldots $ uA' }
          nbChamps = 1
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
