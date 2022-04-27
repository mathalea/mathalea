import Exercice from '../../Exercice.js'
import { fraction } from '../../../modules/fractions.js'
import {
  mathalea2d, point, droiteGraduee2, segment, milieu, texteParPosition, codeSegment, polygone, grille
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { listeQuestionsToContenu, miseEnEvidence, randint, texNombre, shuffle, choice, sp, arrondi } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'

import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
export const titre = 'CAN Sixième sujet 2021'
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
export default function SujetCAN2021Sixieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30// 10,20,30
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 11]).slice(-nbQ1).sort(compareNombres)
    const typeQuestionsDisponiblesNiv2 = shuffle([10,
      12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    const listeFractions15 = [[1, 3], [2, 3], [1, 6], [5, 6], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [4, 3], [5, 3], [7, 6], [11, 6], [5, 4], [7, 4], [6, 5], [7, 5], [8, 5], [9, 5]
    ]
    const listeFractions20 = [[1, 10], [3, 10], [7, 10], [9, 10], [1, 2], [1, 4], [3, 4]
    ]
    const nombre18 = [
      ['dixièmes', 10],
      ['centième', 100],
      ['millième', 1000]
    ]
    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, maListe, propositions, m, n, code1, code2, choix, truc, a, b, c, d, k, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
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

          a = randint(2, 9)
          b = randint(4, 10)
          c = a * b
          reponse = b
          if (choice([true, false])) {
            texte = `Compléter : <br>$${a}\\times .... =${c}$`
            texteCorr = `$${a}\\times ${miseEnEvidence(b)} =${c}$`
          } else {
            texte = `Compléter :<br> $ .... \\times ${a}=${c}$`
            texteCorr = `$ ${miseEnEvidence(b)} \\times ${a}=${c}$`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 3:
          reponse = randint(12, 25, [10, 20])
          a = reponse * 2

          texte = `La moitié de $${a}$ est
             `
          texteCorr = `La moitié de $${a}$ est  $${a}\\div 2=${reponse}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ':'
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 4:
          a = randint(3, 8) // choix de la table = écart entre deux graduations
          c = Math.floor(randint(10, 40) / a) * a // premier nombre.
          maListe = []
          for (let i = 0; i < 2; i++) {
            maListe.push([c + a * i, c + a * i])
          }
          d = droiteGraduee2({
            Unite: 3 / a,
            Min: c - 2 * a,
            Max: c + 2 * a,
            x: 0,
            y: 0,
            thickDistance: a,
            thickSec: false,
            thickOffset: 0,
            axeStyle: '->',
            pointListe: [[c - a, '?']],
            labelPointTaille: 15,
            labelListe: maListe,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: false
          })
          reponse = c - a
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.6, style: 'margin: auto' }, d)
          texteCorr = `Comme les graduations vont de $${a}$ en $${a}$,  le nombre écrit sous le point d'interrogation correspond à $${c}-${a}=${c - a}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break
        case 5:
          a = randint(201, 249)

          texte = `$${a}+99=$
             `

          texteCorr = `$${a}+99=${a}+100-1=${a + 100}-1=${a + 99}$`

          reponse = a + 99

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 6:
          a = randint(2, 5)
          b = randint(8, 12)
          k = randint(2, 5)
          reponse = b * k

          texte = `$${a}$ carreaux de chocolat pèsent $${b}$ g en tout.<br>
          Combien pèsent $${a * k}$ carreaux de chocolat ?
               `
          texteCorr = `$${a}$ carreaux de chocolat pèsent $${b}$ g, donc $${a}\\times ${k}$ carreaux pèsent $${b}\\times ${k}$ g, soit $${k * b}$ g.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'g' }
          nbChamps = 1
          break

        case 7:
          a = randint(5, 10)

          choix = choice(['a', 'a', 'b'])
          if (choix === 'a') {
            b = choice([35, 40, 45, 50, 55])
            texte = `Il est $${a}$ h $${b}$ min.<br>
            Dans une demi-heure, quelle heure sera-t-il ?`
            reponse = b - 30
            texteCorr = `Une demi-heure est égale à $30$ minutes. Ainsi $${a}$ h $${b}$ min + $30$ min est égal à $${a + 1}$ h $${b - 30}$ min.`
          }
          if (choix === 'b') {
            b = choice([50, 55])
            texte = `Il est $${a}$ h $${b}$ min.<br>
          Dans un quart d'heure, quelle heure sera-t-il ?`
            reponse = b - 45
            texteCorr = `Un quart d'heure est égal à $15$ minutes. Ainsi $${a}$ h $${b}$ min + $15$ min est égal à $${a + 1}$ h $${b - 45}$ min.`
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'h' })
            setReponse(this, index, a + 1, { formatInteractif: 'calcul' })
            texte += ajouteChampTexteMathLive(this, index + 1, 'largeur12 inline', { texteApres: sp(5) + 'min' })
            setReponse(this, index + 1, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 2

          break

        case 8:
          a = randint(12, 25, [17, 18, 19, 20])
          k = randint(3, 6)

          reponse = a * k
          texte = `$${a}\\times ${k}=$`
          texteCorr = `$${a}\\times ${k}=${a * k}$
                                   `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 9:

          a = randint(2, 9) * 2 + 1
          reponse = arrondi(a / 2, 1)
          texte = `Un ruban mesure $${a}$ cm. On le coupe en $2$ morceaux de même longueur.<br>
            Un morceau mesure `
          texteCorr = `Un morceau mesure : $${a}\\div 2=${texNombre(reponse, 1)}$ cm`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += '$\\ldots$ cm' }
          nbChamps = 1
          break

        case 10:
          a = randint(0, 4)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          m = choice(['centaines', 'dizaines'])
          n = a * 1000 + b * 100 + c * 10 + d
          texte = `Combien y a-t-il de  ${m} en tout dans $${texNombre(n)}$ ? `
          if (a !== 0) {
            if (m === 'centaines') {
              texteCorr = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 10 + b}\\times 100+${c * 10 + d}$, il y a $${a * 10 + b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = a * 10 + b
            } if (m === 'dizaines') {
              texteCorr = `Comme $${a * 1000 + b * 100 + c * 10 + d}=${a * 100 + b * 10 + c}\\times 10+${d}$, il y a $${a * 100 + b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = a * 100 + b * 10 + c
            }
          } else {
            if (m === 'centaines') {
              texteCorr = `Comme  $${b * 100 + c * 10 + d}=${b}\\times 100+${c * 10 + d}$, il y a $${b}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = b
            } if (m === 'dizaines') {
              texteCorr = `Comme $${b * 100 + c * 10 + d}=${b * 10 + c}\\times 10+${d}$, il y a $${b * 10 + c}$ ${m} dans $${a * 1000 + b * 100 + c * 10 + d}$.`
              reponse = b * 10 + c
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 11:

          a = arrondi(randint(1, 2) + randint(3, 7) / 10, 1)
          k = randint(4, 6)
          reponse = arrondi(a * k, 1)
          texte = `$${texNombre(a, 1)}\\times ${k}=$`

          texteCorr = `$${texNombre(a)}\\times ${k}=${texNombre(reponse, 1)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 12:
          a = randint(1, 9)
          b = randint(1, 9)
          truc = choice([10, 100])
          reponse = arrondi(a - b / truc, 2)
          texte = `Donne l'écriture décimale de $${a}-\\dfrac{${b}}{${truc}}$.`

          texteCorr = `$${a}-\\dfrac{${b}}{${truc}}=${a}-${texNombre(b / truc, 2)}=${texNombre(a - b / truc, 2)}$ `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:

          a = arrondi(randint(1, 9) + randint(1, 9) / 10, 1)
          reponse = arrondi(10 - a, 1)
          texte = `Complète :<br>$${texNombre(a)}+\\ldots=10$`

          texteCorr = `Le nombre cherché est donné par la différence : $10-${texNombre(a, 1)}=${texNombre(reponse, 1)}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
          d = droiteGraduee2(
            {
              Unite: 6, // nombre de cm pour une unité
              Min: 0, // Là où commence la droite
              Max: 2, // Là où finit la droite prévoir 0,5cm pour la flèche
              x: 0.5,
              y: 1.8, // les coordonnées du début du tracé dans le SVG
              axeEpaisseur: 2,
              axeCouleur: 'white',
              thickCouleur: 'black',
              axeStyle: '-',
              axeHauteur: 4,
              axePosition: 'H', // Les caractéristiques de l'axe
              thickEpaisseur: 2, // Les caractéristiques des graduations principales
              thickSecDist: 1 / a[1],
              thickSec: true, // Les caractéristiques des graduations secondaires. Pas de couleur, on joue sur l'opacité
              labelsPrincipaux: true,
              labelsSecondaires: false
            }
          )
          c = polygone([point(0, 0), point(13, 0), point(13, 2), point(0, 2)], 'black')
          A = segment(0.5, 2.4, 0.5 + 6 * a[0] / a[1], 2.4)
          A.epaisseur = 2
          A.styleExtremites = '|-|'
          texte = `Quelle est la mesure de ce segment ?<br>
          ${mathalea2d({ xmin: -0.2, xmax: 13.2, ymin: -0.1, ymax: 2.7, pixelsParCm: 20, scale: 0.7, zoom: 1 }, c, A, d)}
          `

          texteCorr = `L'unité est divisée en $${b.d}$. La mesure du segment est donc : $\\dfrac{${b.n}}{${b.d}}$ unité.`

          reponse = fraction(b.n, b.d).simplifie()
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité' } else { texte += '<br>$\\ldots$ unité' }
          nbChamps = 1
          break

        case 16:
          if (choice([true, false])) {
            a = arrondi(randint(3, 6) + randint(2, 9) / 10, 1)
            b = arrondi(randint(7, 9) + randint(2, 9) / 10, 1)

            propositions = shuffle([`$${Math.floor(a * b)}$`, `$${Math.floor(a + b)}$`, `$${Math.floor(a * b * 10)}$`])
            reponse = Math.floor(a * b)
            texte = `Recopie  le nombre le plus proche de  $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = `En remplaçant $${texNombre(a, 1)}$ par $${Math.round(a)}$ et $${texNombre(b, 1)}$ par $${Math.round(b)}$, on obtient : <br>
          $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a) * Math.round(b)}$, donc le nombre le plus proche est : $${Math.floor(a * b)}$.`
          } else {
            a = arrondi(randint(12, 19) + randint(2, 9) / 10, 1)
            b = arrondi(randint(15, 29, 20) + randint(2, 9) / 10, 1)

            propositions = shuffle([`$${Math.floor(a * b)}$`, `$${Math.floor(a + b)}$`, `$${Math.floor(a * b * 10)}$`])
            reponse = Math.floor(a * b)
            texte = `Recopie  le nombre le plus proche de  $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$.<br>`

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = 'Le produit de ces deux nombres donne un nombre a trois chiffres.'
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = choice([10, 20])
          b = arrondi(randint(7, 9) + randint(1, 9) / 10, 1)
          c = arrondi(a - b, 1)
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
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
          reponse = Math.round(a[0] / a[1] * 100)
          propositions = shuffle([`$${texNombre(a[0] / a[1]), 2}\\%$`, `$${reponse}\\%$`, `$${texNombre(a[1])}\\%$`, `$${a[0]},${a[1]}\\%$`])
          texteCorr = `$\\dfrac{${a[0]}}{${a[1]}}=${texNombre(a[0] / a[1], 2)}=${reponse}\\%$`
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
            reponse = Math.round(a / 4)
            texteCorr = `Le quart de $${a}$ km est égal à $${a}\\div 4=${reponse}$ km.`
          } else {
            a = randint(1, 9) * 30
            texte = `Le tiers de $${a}$ km.`
            reponse = Math.round(a / 3)
            texteCorr = `Le tiers de $${a}$ km est égal à $${a}\\div 3=${reponse}$ km.`
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
            reponse = Math.round(a / 4)
            texteCorr = `$25 \\%$ de $${a}$ km est égal à $${a}\\div 4=${reponse}$ km.`
          } else {
            a = randint(1, 9) * 50
            texte = `$20\\%$ de $${a}$ km.`
            reponse = Math.round(a / 5)
            texteCorr = `$20 \\%$ de $${a}$ km est égal à $${a}\\div 5=${reponse}$ km.`
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
          reponse = a * b

          propositions = shuffle([`$${b}$ feuilles`, `$${reponse}$ feuilles`, `$${reponse * 20}$ feuilles`])
          texte = `Chaque élève de la classe ramène $${a}$ feuilles.<br>
          `
          texteCorr = `La seule réponse vraisemblable est $${reponse}$ feuilles. <br>
          On peut prendre $30$ élèves dans la classe comme valeur possible : $30\\times ${a}=${30 * a}$ feuilles.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += `Recopie la réponse vraisemblable.<br>
            Le maître ramasse en tout : <br>
              ${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +'feuilles'
          } else {
            texte += `Entoure la réponse vraisemblable.<br> 
            Le maître ramasse en tout : <br>
            ${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
          }

          nbChamps = 1
          break

        case 24:
          a = randint(11, 29)
          b = randint(3, 9)
          reponse = a * 100 + b * 1000
          texte = `$${a}$ centaines et $${b}$ milliers $=$ `

          texteCorr = `$${a}$ centaines et $${b}$ milliers $=${texNombre(a * 100, 0)}+${texNombre(b * 1000, 0)}=${texNombre(a * 100 + b * 1000, 0)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 25:
          if (choice([true, false])) {
            a = randint(1, 10) * choice([1, 10])
            reponse = a * 100
            texte = `$${texNombre(a, 0)}$ m  =`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' } else { texte += '$\\ldots$ cm' }
            texteCorr = ` Comme $1$ m $=100$ cm,  pour passer des "m" au "cm", on multiplie par $100$.<br>
                        Comme : $${texNombre(a, 0)}\\times 100 =${texNombre(a * 100, 0)}$, alors $${texNombre(a, 0)}$ m$=${texNombre(a * 100, 0)}$ cm.  
                        `
          } else {
            a = randint(1, 12) * choice([1, 10, 100])
            reponse = arrondi(a / 100, 2)
            texte = `$${texNombre(a)}$ cm  =`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'm' } else { texte += '$\\ldots$ m' }
            texteCorr = `Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
            Ainsi pour passer des "cm" au "m", on divise par $100$.<br>
              Comme  $${texNombre(a, 0)}\\div 100 =${texNombre(a / 100, 2)}$, alors $${texNombre(a, 0)}$ cm$=${texNombre(a / 100, 2)}$ m.  `
          }

          nbChamps = 1
          break

        case 26:
          a = arrondi(2 + randint(1, 5) / 10, 1)
          b = arrondi(2 + randint(1, 4) / 10, 1)
          c = arrondi(randint(5, 6) - b, 1)
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
          reponse = arrondi(2 * a + b + c, 1)
          texte = `Quel est le périmètre de cette figure ? <br>
            `
          texte += mathalea2d({ xmin: xmin, ymin: ymin, xmax: xmax, ymax: ymax, pixelsParCm: 30, mainlevee: false, amplitude: 0.5, scale: 0.8, style: 'margin: auto' }, objets)
          texteCorr = `Le périmètre est donné par la somme des quatre longueurs : $${texNombre(a, 1)}\\times 2+${texNombre(b, 1)}+${texNombre(c, 1)}=${texNombre(2 * a + b + c, 1)}$ cm.`
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
          texte = "Quelle est la fraction repérée par le point d'interrogation ?<br>" +
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
             pointListe: [[b / a, '?']],
             labelPointTaille: 15,
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
          a = randint(5, 11)
          b = choice([5, 7, 9])
          reponse = a * b
          texte = `$2$ BD identiques coûtent $${2 * a}$ €.<br>
          Combien coûtent $${b}$ BD identiques ?
      `
          texteCorr = `Une BD coûte $${2 * a}\\div 2=${a}$ €, donc $${b}$ BD identiques coûtent $${a}\\times ${b}=${reponse}$ €.

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
          b = randint(2, 4)
          A = polygone([point(1, 7), point(11, 7), point(11, 6), point(1, 6)], 'black')
          A.couleurDeRemplissage = 'lightgray'
          B = texteParPosition('1 uA', 6, 6.5, 'milieu', 'black', 1, 'middle', false)
          C = grille(0, 0, 12, 7, 'black', 1, 1, false)
          D = point(1 + a, 4 - b)
          d = polygone([D, point(D.x, D.y + 1), point(11, D.y + 1), point(11, 5), point(1, 5), point(1, D.y)], 'black')
          d.epaisseur = 2
          d.couleurDeRemplissage = 'white'
          d.couleurDesHachures = 'gray'
          d.distanceDesHachures = 4
          d.hachures = 'north east lines'

          texte = `En grisé, on a représenté une unité d'aire, notée uA.<br>
            Quelle est l'aire de la figure hachurée ?<br>`
          texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 7.5, scale: 0.7 }, C, A, B, d)
          texteCorr = `$1$ uA est représentée par  $10$ petits carreaux. La figure hachurée est constituée de $${arrondi(a / 10 + b, 1) * 10}$. Elle a donc une aire de $${texNombre(arrondi(a / 10 + b, 1))}$ unités.`
          reponse = arrondi(a / 10 + b, 1)

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
