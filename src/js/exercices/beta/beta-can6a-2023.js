import Exercice from '../Exercice.js'
import { mathalea2d, fixeBordures, colorToLatexOrHTML } from '../../modules/2dGeneralites.js'
import FractionX from '../../modules/FractionEtendue.js'
import { fraction } from '../../modules/fractions.js'
import {
  point, grille, droiteGraduee, plot, segment, milieu, labelPoint, texteParPosition, polygoneAvecNom, polygone
} from '../../modules/2d.js'
import { round, min } from 'mathjs'
import { context } from '../../modules/context.js'
import Hms from '../../modules/Hms.js'
import { listeQuestionsToContenu, miseEnEvidence, stringNombre, randint, texNombre, prenomF, prenomM, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import Grandeur from '../../modules/Grandeur.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'CAN 6ième sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '01/03/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Aléatoirisation du sujet 2023 de CAN 6e
 * Gilles Mora
 * Référence can6a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023Sixieme () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 30
  this.nbCols = 1
  this.nbColsCorr = 1
  this.comment = `Cet exercice fait partie des annales des Courses aux nombres.<br>
  Il est composé de 30 questions réparties de la façon suivante :<br>
  les 10 premières questions parfois communes à plusieurs niveaux font appels à des questions automatisées élémentaires et les 20 suivantes (qui ne sont pas rangées dans un ordre de difficulté) sont un peu plus « coûteuses » cognitivement.<br>
  Par défaut, les questions sont rangées dans le même ordre que le sujet officiel avec des données aléatoires. Ainsi, en cliquant sur « Nouvelles données », on obtient une nouvelle course aux nombres avec des données différentes.
  En choisissant un nombre de questions différents de 30, on fabrique une « mini » course aux nombres qui respecte la proportion de nombre de questions élémentaires par rapport aux autres.
  Par exemple, en choisissant 20 questions, la course aux nombres sera composée de 7 questions automatisées élémentaires choisies aléatoirement dans les 10 premières questions du sujet officiel puis de 13 autres questions choisies aléatoirement parmi les 20 autres questions du sujet officiel.`
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const nbQ1 = min(round(this.nbQuestions * 10 / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(-nbQ1).sort(compareNombres)//
    const typeQuestionsDisponiblesNiv2 = shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]).slice(-nbQ2).sort(compareNombres)//
    const typeQuestionsDisponibles = (typeQuestionsDisponiblesNiv1.concat(typeQuestionsDisponiblesNiv2))

    for (let i = 0, index = 0, nbChamps, texte, texteCorr, reponse, prenom1, prenom2, m, prix, pol, pol2, L, l, l2, E, F, G, H, maListe, taille1, res, chiffre, chiffre2, propositions, choix, a, b, c, d, e, f, k, s1, s2, A, B, C, D, xmin, xmax, ymin, ymax, objets, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}=$ `
          texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 2:
          a = randint(23, 38, [20, 30, 31, 29])
          b = choice([19, 29, 39])

          texte = `$${a}+${b}=$`
          reponse = a + b
          if (b === 19) { texteCorr = `$${a}+${b}=${a}+20-1=${a + 20}-1=${miseEnEvidence(reponse)}$` }
          if (b === 29) { texteCorr = `$${a}+${b}=${a}+30-1=${a + 30}-1=${miseEnEvidence(reponse)}$` }
          if (b === 39) { texteCorr = `$${a}+${b}=${a}+40-1=${a + 40}-1=${miseEnEvidence(reponse)}$` }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 3:
          k = randint(5, 8)
          b = randint(2, 5) * k
          c = []
          for (let n = 0; n < b; n++) {
            c.push(true)
          }
          c = shuffle(c)
          d = []
          for (let n = 0; n < b; n++) {
            d.push(plot(n % k, -Math.floor(n / k), { rayon: 0.2, couleur: 'black', couleurDeRemplissage: 'black' }))
          }
          texte = `Combien y a-t-il de boules noires ?
          <br>`

          texte += `${mathalea2d(Object.assign({ scale: 0.3 }, fixeBordures(d)), d)}`
          reponse = b
          texteCorr = `Le nombre de boules noires est donné par : $${k}\\times ${texNombre(b / k, 0)}=${miseEnEvidence(b)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 4:
          if (choice([true, false])) {
            a = randint(11, 25, 20) * 2
            reponse = a / 2
            texte = `La moitié de $${a}$ est : `
            texteCorr = `La moitié de $${a}$ est $${a}\\div 2=${miseEnEvidence(a / 2)}$.`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '\\ldots' }
            nbChamps = 1
          } else {
            a = randint(16, 45, [20, 30, 40])
            reponse = 2 * a
            texte = `Le double de $${a}$ est : `
            texteCorr = `Le double  de $${a}$ est $${a}\\times 2=${miseEnEvidence(a * 2)}$.`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '\\ldots' }
            nbChamps = 1
          }

          break
        case 5:
          if (choice([true, false])) {
            a = randint(42, 52, [40, 45, 50]) * 2 // choix de la table = écart entre deux graduations

            d = droiteGraduee({
              Unite: 0.5,
              Min: 81,
              Max: 106,
              x: 0,
              y: 0,
              thickDistance: 10,
              thickSec: true,
              thickSecDist: 2,
              thickOffset: 0,
              axeStyle: '->',
              pointListe: [[a, '?']],
              labelListe: maListe,
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true
            })
          } else {
            a = choice([75, 85, 95, 105, 115])// choix de la table = écart entre deux graduations

            d = droiteGraduee({
              Unite: 0.25,
              Min: 71,
              Max: 116,
              x: 0,
              y: 0,
              thickDistance: 10,
              thickSec: true,
              thickSecDist: 5,
              thickOffset: 0,
              axeStyle: '->',
              pointListe: [[a, '?']],
              labelListe: maListe,
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true
            })
          }
          reponse = a
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.6, style: 'margin: auto' }, d)
          texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(a)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 6:
          m = choice([1, 2, 3, 4])
          if (m === 1) {
            texte = `Complète : ${sp(3)}
            $\\ldots \\times \\ldots =18$`
            reponse = ['3;6', '1;18', '2;9']
            texteCorr = `Trois réponses possibles (avec des entiers) : <br>
          $${miseEnEvidence(3)}\\times ${miseEnEvidence(6)}=18$<br>
          $${miseEnEvidence(2)}\\times ${miseEnEvidence(9)}=18$<br>
          $${miseEnEvidence(1)}\\times ${miseEnEvidence(18)}=18$ `
          }
          if (m === 2) {
            texte = `Complète : ${sp(3)}
              $\\ldots \\times \\ldots =21$`
            reponse = ['3;7', '1;21']
            texteCorr = `Deux réponses possibles (avec des entiers) : <br>
            $${miseEnEvidence(3)}\\times ${miseEnEvidence(7)}=21$<br>
            $${miseEnEvidence(1)}\\times ${miseEnEvidence(21)}=21$ `
          }

          if (m === 3) {
            texte = `Complète : ${sp(3)}
                $\\ldots \\times \\ldots =35$`
            reponse = ['5;7', '1;35']
            texteCorr = `Deux réponses possibles (avec des entiers) : <br>
              $${miseEnEvidence(5)}\\times ${miseEnEvidence(7)}=35$<br>
              $${miseEnEvidence(1)}\\times ${miseEnEvidence(35)}=35$ `
          }
          if (m === 3) {
            texte = `Complète : ${sp(3)}
                  $\\ldots \\times \\ldots =35$`
            reponse = ['5;7', '1;35']
            texteCorr = `Deux réponses possibles (avec des entiers) : <br>
                $${miseEnEvidence(5)}\\times ${miseEnEvidence(7)}=35$<br>
                $${miseEnEvidence(1)}\\times ${miseEnEvidence(35)}=35$ `
          }
          if (m === 4) {
            texte = `Complète : ${sp(3)}
                    $\\ldots \\times \\ldots =42$`
            reponse = ['6;7', '1;42', '2;21', '3;14']
            texteCorr = `Quatre réponses possibles (avec des entiers) : <br>
                  $${miseEnEvidence(6)}\\times ${miseEnEvidence(7)}=42$<br>
                  $${miseEnEvidence(2)}\\times ${miseEnEvidence(21)}=42$ <br>
                  $${miseEnEvidence(3)}\\times ${miseEnEvidence(14)}=42$<br>
                  $${miseEnEvidence(1)}\\times ${miseEnEvidence(42)}=42$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'texte' })
          if (this.interactif) {
            texte += '<br>Écrire le deux nombres dans l\'ordre croissant séparés par un point virgule.'
            texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline')
          }
          nbChamps = 1
          break

        case 7:
          if (choice([true, false])) {
            a = randint(6, 10)
            b = choice([35, 40, 45, 50, 55])
            c = choice([30, 35, 40, 45])
            texte = `$${b}$ min $+$ $${a}$ h $${c}$ min $=$`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
                $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(reponse)}$ min.`
          } else {
            a = randint(6, 10)
            b = choice([20, 25, 30, 35])
            c = choice([45, 50, 55])
            texte = `$${b}$ min $+$ $${a}$ h $${c}$ min $=$`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
    $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(reponse)}$ min.`
          }
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'clavierHms inline') }

          setReponse(this, index, new Hms({ hour: a + 1, minute: reponse }), { formatInteractif: 'hms' })

          nbChamps = 1

          break

        case 8:
          choix = choice(['a', 'b', 'c', 'd'])
          if (choix === 'a') {
            a = randint(9, 15) * 3

            reponse = Math.round(a / 3)
            texte = `Pour partager $${a}$ oeufs, combien de boites de  $3$ oeufs dois-je utiliser ? `
            texteCorr = `Le nombre de boites est donné par $${a}\\div 3=${miseEnEvidence(a / 3)}$.`
          }
          if (choix === 'b') {
            reponse = randint(8, 12)
            a = reponse * 4
            texte = `Pour partager $${a}$ oeufs, combien de boites de  $4$ oeufs dois-je utiliser ? `
            texteCorr = `Le nombre de boites est donné par $${a}\\div 4=${miseEnEvidence(a / 4)}$.`
          }
          if (choix === 'c') {
            reponse = randint(6, 10)
            a = reponse * 5
            texte = `Pour partager $${a}$ oeufs, combien de boites de  $5$ oeufs dois-je utiliser ? `
            texteCorr = `Le nombre de boites est donné par $${a}\\div 5=${miseEnEvidence(reponse)}$.`
          }
          if (choix === 'd') {
            reponse = randint(4, 8)
            a = reponse * 6
            texte = `Pour partager $${a}$ oeufs, combien de boites de  $6$ oeufs dois-je utiliser ? `
            texteCorr = `Le nombre de boites est donné par $${a}\\div 6=${miseEnEvidence(reponse)}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 9:

          taille1 = [['falaise', 15, 25, 'm'], ['girafe', 40, 50, 'dm'], ['échelle', 200, 300, 'cm'], ['bouteille', 28, 35, 'cm'], ['télévision', 50, 60, 'cm']]

          a = randint(0, 4)
          b = randint(taille1[a][1], taille1[a][2])
          propositions = shuffle([`$${b}$ m`, `$${b}$ dm`, `$${b}$ cm`, `$${b}$ mm`])

          texte = `Choisis parmi les propositions suivantes la hauteur d'une ${taille1[a][0]}<br>
          `
          texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}${sp(4)} ${propositions[3]}`
          texteCorr = `La taille d'une ${taille1[a][0]} est $${miseEnEvidence(b)}$ ${taille1[a][3]}.`
          setReponse(this, index, new Grandeur(b, taille1[a][3]), { formatInteractif: 'unites' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15 longueur') }
          nbChamps = 1
          break

        case 10:
          chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
          chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
          a = randint(0, 8)
          b = randint(0, 4)
          c = randint(0, 8)
          d = randint(0, 4)
          if (choice([true, false])) {
            chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
            chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
            a = randint(0, 8)
            b = randint(0, 4)
            c = randint(0, 8)
            d = randint(0, 4)
            if (a === 0) {
              texte = `Écris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]}$ =
              ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br>
                          ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = ` ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]}$ =
                          ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
            }
          } else {
            if (a === 0) {
              texte = `Écris en chiffres le nombre : <br>
              ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = ` ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]}$ =
              ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br>
                          ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = ` ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]}$ =
                          ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
            }
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1

          break

        case 11:
          prenom1 = prenomF()
          prenom2 = prenomM()
          if (choice([true, false])) {
            b = randint(3, 5)
            reponse = randint(4, 9)
            a = reponse * b
            texte = `${prenom1} a $${a}$ billes. <br>
            Elle en a $${b}$ fois plus que sa sœur. Combien de billes sa sœur  a-t-elle ? `
            texteCorr = `Puisque ${prenom1} en  a $${b}$ fois plus, sa sœur en a $${b}$ fois moins, soit  : $${a}\\div ${b}=${miseEnEvidence(a / b)}$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          } else {
            b = randint(6, 15)
            reponse = 2 * b
            texte = `${prenom1} a $${b}$ ans. <br>
            ${prenom2} est deux fois plus âgé que ${prenom1}. ${prenom1} a  `
            texteCorr = `Puisque ${prenom2} est deux fois plus âgé que ${prenom1}, son âge est  : $${b}\\times 2=${miseEnEvidence(2 * b)}$ ${texteEnCouleur('ans')}. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'ans.' }) } else { texte += '$\\ldots$ ans' }
          }

          nbChamps = 1
          break
        case 12:
          a = randint(2, 5)
          b = randint(6, 9)
          c = new Decimal('0.1')
          if (choice([true, false])) {
            a = randint(2, 5)
            b = randint(6, 9)
            c = new Decimal('0.1')
            reponse = new Decimal(a).mul(b).mul(c)
            texte = `Donne l'écriture décimale de  $${a}\\times ${b}$ dixièmes.`
            texteCorr = `$1$ dixième $=0,1$, d'où $${a}\\times ${b}$ dixièmes $=${a}\\times ${b}\\times 0,1=${miseEnEvidence(texNombre(reponse, 1))}$.`
          } else {
            a = randint(2, 5)
            b = randint(6, 9)
            c = new Decimal('0.01')
            reponse = new Decimal(a).mul(b).mul(c)
            texte = `Donne l'écriture décimale de  $${a}\\times ${b}$ centièmes.`
            texteCorr = `$1$ centième $=0,01$, d'où $${a}\\times ${b}$ centièmes $=${a}\\times ${b}\\times 0,01=${miseEnEvidence(texNombre(reponse, 2))}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 13:
          if (choice([true, false])) {
            a = choice([new Decimal('1.5'), new Decimal('2'), new Decimal('2.5'), new Decimal('3'), new Decimal('4'), new Decimal('4.5')])
            d = droiteGraduee({
              Unite: 2,
              Min: 0,
              Max: 5,
              x: 0,
              y: 0,
              thickDistance: 5,
              thickSec: true,
              thickSecDist: 0.5,
              thickOffset: 0,
              axeStyle: '->',
              pointListe: [[a, '?']],
              labelListe: [[0, `${stringNombre(0)}`], [0.5, `${stringNombre(0.5, 1)}`]],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true
            })
          } else {
            a = choice([new Decimal('1.25'), new Decimal('1.5'), new Decimal('1.75'),
              new Decimal('2'), new Decimal('2.25'), new Decimal('2.5'), new Decimal('2.75'), new Decimal('0.75'), new Decimal('1'),
              new Decimal('1.25'), new Decimal('1.5'), new Decimal('1.75')])
            d = droiteGraduee({
              Unite: 4,
              Min: 0,
              Max: 3,
              x: 0,
              y: 0,
              thickDistance: 3,
              thickSec: true,
              thickSecDist: 0.25,
              thickOffset: 0,
              axeStyle: '->',
              pointListe: [[a, '?']],
              labelListe: [[0, `${stringNombre(0)}`], [0.25, `${stringNombre(0.25, 2)}`]],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true
            })
          }
          reponse = a
          texte = 'Quel est le nombre sous le point d\'interrogation ?<br>' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, d)
          texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(texNombre(a, 2))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 14:
          a = new Decimal(randint(1, 9)).div(10)
          b = new Decimal(randint(1, 9)).add(a)
          res = choice([10, 20])
          reponse = new Decimal(res).sub(b)
          texte = `Complète : <br>
          $${texNombre(b, 1)}+\\ldots =${res}$ `
          texteCorr = `Le nombre cherché est donné par : $${res}-${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse, 2))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 15:
          a = new Decimal(2 * randint(2, 39, [10, 20, 30])).div(100)

          reponse = new Decimal(a).div(2)
          texte = `La moitié de  $${texNombre(a, 2)}$ est `
          texteCorr = `La moitié de $${texNombre(a, 2)}$ est $ ${texNombre(a, 2)}\\div 2=${texNombre(reponse, 2)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 16:
          b = randint(2, 4)
          a = randint(b + 1, 6)
          c = randint(1, a - 1)
          d = randint(1, b)
          e = randint(0, c - 1)
          f = randint(d, b)
          A = polygone([point(0, 0), point(c, 0), point(c, d), point(e, d), point(e, f), point(0, f)], 'black')
          A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')

          C = grille(0, 0, a, b, 'black', 1, 1, false)
          D = point(1 + a, 4 - b)

          texte = `Quelle fraction de la surface totale représente la surface grisée ?
          <br>`
          texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: b + 1, scale: 0.3 }, A, C)
          texteCorr = `Il y a $${c * d + e * f - e * d}$ ${c * d + e * f - e * d > 1 ? 'carrés' : 'carré'} gris sur un total de $${a * b}$ carrés, la surface grisée représente donc $\\dfrac{${miseEnEvidence(c * d + e * f - e * d)}}{${miseEnEvidence(a * b)}}$ de la surface totale.`
          reponse = new FractionX(c * d + e * f - e * d, a * b)
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 17:
          a = randint(5, 9)
          b = randint(4, 9)
          c = a * b
          reponse = b
          texte = `Calcule $${c}\\div ${a}$.`
          texteCorr = `$${c}\\div ${a}=${miseEnEvidence(reponse)}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break
        case 18:
          if (choice([true, false])) {
            a = choice([4, 6, 8, 10, 12, 14])
            b = a + a / 2

            reponse = arrondi(2 * b, 0)
            texte = `Si une pile de $${a}$ pièces de monnaie a une hauteur de $${2 * a}$ mm, alors une pile de 
          $${texNombre(b, 0)}$ pièces a une hauteur de`

            texteCorr = `Une pile de $${a}$ pièces de monnaie a une hauteur de $2\\times ${a}=${2 * a}$ mm.<br>
            Donc une pile de  $${texNombre(b, 0)}$ pièces aura une hauteur de $2\\times ${b}=${miseEnEvidence(2 * b)}$ mm.`

            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') +
            'mm'
            } else { texte += '$\\ldots$ mm' }
          } else {
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
          }
          nbChamps = 1

          break

        case 19:
          if (choice([true, false])) {
            a = grille(-2, -2, 9, 4, 'gray', 1, 1)

            b = randint(1, 6, 4)

            A = point(0, 0, 'A', 'below')
            B = point(b, 0, 'B', 'below')
            C = point(0, 2, 'C', 'above')
            D = point(4, 2, 'D', 'above')
            s1 = segment(C, D)
            s1.epaisseur = 4
            s2 = segment(A, B)
            s2.epaisseur = 4
            xmin = -1
            ymin = -2
            xmax = 9
            ymax = 4
            objets = []
            objets.push(
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.6, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 4)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.3, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $4$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{4}=${miseEnEvidence(texNombre(b / 4))}$ unité. `
          } else {
            a = grille(-2, -2, 10, 4, 'gray', 1, 1)

            b = randint(1, 9, 5)

            A = point(0, 0, 'A', 'below')
            B = point(b, 0, 'B', 'below')
            C = point(0, 2, 'C', 'above')
            D = point(5, 2, 'D', 'above')
            s1 = segment(C, D)
            s1.epaisseur = 4
            s2 = segment(A, B)
            s2.epaisseur = 4
            xmin = -1
            ymin = -2
            xmax = 10
            ymax = 4
            objets = []
            objets.push(
              texteParPosition('1 unité', milieu(C, D).x, milieu(C, D).y + 0.6, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              a, s1, s2, labelPoint(A, B), point(A, B))
            reponse = fraction(b, 5)
            texte = `Quelle est la longueur du segment $[AB]$ ? <br>
            `
            texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 25, mainlevee: false, amplitude: 0.5, scale: 0.3, style: 'margin: auto' }, objets)
            texteCorr = `Une unité correspond à $5$ carreaux, le segment $[AB]$ mesure $${b}$ carreaux, soit $\\dfrac{${b}}{5}=${miseEnEvidence(texNombre(b / 5))}$ unité. `
          }
          setReponse(this, index, reponse, { formatInteractif: 'fractionEgale' })
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'unité'
          } else { texte += ' <br>$\\ldots$ unité' }

          nbChamps = 1
          break
        case 20:
          a = randint(11, 19)
          b = randint(2, 7) * 100

          reponse = a * b
          texte = ` $${a}\\times ${b}=$`
          texteCorr = `$${a}\\times ${b}=${a}\\times ${texNombre(b / 100)}\\times 100=${miseEnEvidence(texNombre(reponse))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1

          break

        case 21:

          a = choice([2, 3, 4, 6]) // diviseur de l'heure
          b = 60 / a // nombre de minutes de l'énoncé
          if (a === 4) { c = choice([40, 80, 100]) } else { c = choice([30, 60, 90, 120]) }
          reponse = arrondi(c / a, 0)
          texte = `Une voiture roule à $${c}$ km/h. <br>Combien de kilomètres 
        parcourt-elle en $${b}$ min à cette vitesse ?`
          texteCorr = `La voiture parcourt $${texNombre(c / a, 0)}$ km.<br>
       En $${b}$ minutes, elle parcourt $${a}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${c}}{${a}}=
        ${miseEnEvidence(texNombre(c / a, 0))}$ km.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1

          break

        case 22:

          a = choice([3, 4, 6]) // diviseur de l'heure
          b = 60 / a // nombre de minutes de l'énoncé
          d = randint(1, 3)
          if (a === 4) { c = choice([40, 80, 100]) } else { c = choice([30, 60, 90, 120]) }
          if (a === 3) { e = randint(1, 2) } else { e = randint(1, 3) }
          reponse = arrondi(d * c + e * c / a, 0)
          texte = `Une voiture roule à  $${c}$ km/h.<br> Combien de kilomètres parcourt-elle 
        en $${d}$ h et $${b * e}$ min à cette vitesse ?`
          texteCorr = `
        En $${d}$ h, elle parcourt $${d * c}$ km.<br>
       En $${b * e}$ min, elle parcourt $${texNombre(e * c / a, 0)}$ km.<br>
        Ainsi, en en $${d}$ h et $${b * e}$ min, elle parcourt donc $${miseEnEvidence(texNombre(d * c + e * c / a, 0))}$ km.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'km' }
          nbChamps = 1
          break

        case 23:
          a = randint(3, 9)
          b = randint(3, 9)
          c = a * b

          reponse = b
          texte = `Dans $${c}$ combien de fois $${a}$ ?`
          texteCorr = `Dans $${c}$, il y a $${miseEnEvidence(b)}$ fois $${a}$ car $${a}\\times ${b}=${c}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 24:
          if (choice([true, false])) {
            a = randint(2, 9)
            d = new Decimal(randint(21, 99, [30, 40, 50, 60, 70, 80, 90])).div(10)
            c = new Decimal(a * 100).add(d)

            reponse = new Decimal(d).mul(10)
            texte = `Complète.
            <br>$${a}$ centaines et $\\ldots$ dixièmes font $${texNombre(c, 1)}$.`
            texteCorr = `
               $${a}$ centaines $=${a * 100}$.<br>
               $${texNombre(d, 1)}= ${texNombre(d * 10, 0)}$ dixièmes. <br>
               Ainsi, $${a}$ centaines et $${miseEnEvidence(texNombre(d * 10, 0))}$ dixièmes font $${texNombre(c, 1)}$.`
          } else {
            a = randint(2, 9)
            d = new Decimal(randint(21, 99, [30, 40, 50, 60, 70, 80, 90])).div(100)
            c = new Decimal(a * 10).add(d)

            reponse = new Decimal(d).mul(100)
            texte = `Complète.
            <br>$${a}$ dizaines et $\\ldots$ centièmes font $${texNombre(c, 2)}$.`
            texteCorr = `
                     $${a}$ dizaines $=${a * 10}$.<br>
                     $${texNombre(d, 2)}= ${texNombre(d * 100, 0)}$ centièmes. <br>
                     Ainsi, $${a}$ dizaines et $${miseEnEvidence(texNombre(d * 100, 0))}$ centièmes font $${texNombre(c, 2)}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1

          break

        case 25:
          if (choice([true, false])) {
            prenom1 = prenomF()
            f = [[3, 5], [6, 5], [7, 5], [8, 5], [3, 2], [5, 2], [9, 5], [7, 2]]
            a = randint(0, 7)
            b = randint(2, 4)
            A = polygone([point(1, 5), point(11, 5), point(11, 4), point(1, 4)], 'black')
            A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            B = texteParPosition('1 uA', 6, 4.5, 'milieu', 'black', 1, 'middle', false)
            C = grille(0, 0, 12, 5, 'black', 1, 1, false)
            D = point(1 + a, 4 - b)

            texte = `${prenom1} veut construire une figure d'aire $\\dfrac{${f[a][0]}}{${f[a][1]}}$ ${f[a][0] > f[a][1] > 2 ? 'unités' : 'unité'} d'aire (uA).<br>
        
            Combien de petits carreux doit-elle contenir ?
            <br>

        `
            texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 5.5, scale: 0.3 }, C, A, B)
            texteCorr = '$1$ uA est représentée par $10$ petits carreaux. <br>'
            texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par $${texNombre(10 / f[a][1], 0)}$ petits carreaux. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${texNombre(10 / f[a][1] * f[a][0], 0)}$ petits carreaux.`
            reponse = 10 / f[a][1] * f[a][0]
          } else {
            prenom1 = prenomF()
            f = [[5, 4], [7, 4], [3, 2], [5, 2], [7, 2], [3, 4], [9, 4]]

            a = randint(0, 6)
            b = randint(2, 4)
            A = polygone([point(1, 5), point(3, 5), point(3, 3), point(1, 3)], 'black')
            A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            B = texteParPosition('1 uA', 2, 5.4, 'milieu', 'black', 1, 'middle', false)
            C = grille(0, 0, 12, 5, 'black', 1, 1, false)

            texte = `${prenom1} veut construire une figure d'aire $\\dfrac{${f[a][0]}}{${f[a][1]}}$ ${f[a][0] / f[a][1] > 2 ? 'unités' : 'unité'} d'aire (uA).<br>
          
            Combien de petits carreux doit-elle contenir ?<br>

          `
            texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 6, scale: 0.3 }, A, C, B)
            if (f[a][1] === 4) {
              texteCorr = '$1$ uA est représentée par  $4$ petits carreaux. <br>'
              texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par un petit carreau. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${miseEnEvidence(f[a][0])}$ petits carreaux.`
              reponse = f[a][0]
            } else {
              texteCorr = '$1$ uA est représentée par $4$ petits carreaux. <br>'
              texteCorr += `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par deux petits carreaux. <br>
          Ainsi, une figure de $\\dfrac{${f[a][0]}}{${f[a][1]}}$ d'unité d'aire se représente par une figure de $${miseEnEvidence(2 * f[a][0])}$ petits carreaux.`
              reponse = 2 * f[a][0]
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'petits carreaux.' }
          nbChamps = 1
          break

        case 26:
          if (choice([true, false])) {
            a = choice([1, 2, 3, 4, 6, 7, 8, 9]) // numérateur
            reponse = a / 5
            texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>'

            texte += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, texteParPosition('?', 3 * a / 5, 0.9, 'milieu', 'blue', 2), droiteGraduee({
              Unite: 3,
              Min: 0,
              Max: 3.2,
              x: 0,
              y: 0,
              thickSecDist: 1 / 5,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a / 5, '']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              step1: 1,
              step2: 1
            }))
            texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(texNombre(reponse, 1))}$.`
          } else {
            a = randint(121, 139, [130]) / 100
            reponse = a
            texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>'

            texte += mathalea2d({ xmin: -1, ymin: -1.5, xmax: 14, ymax: 1.5, scale: 0.5, style: 'margin: auto' }, droiteGraduee({
              Unite: 50,
              Min: 1.2,
              Max: 1.4,
              x: 0,
              y: 0,
              thickDistance: 0.1,
              thickSecDist: 1 / 100,
              thickSec: true,
              thickoffset: 0,
              axeStyle: '|->',
              pointListe: [[a, '?']],
              pointCouleur: 'blue',
              pointStyle: 'x',
              labelsPrincipaux: true,
              labelListe: [[1.2, `${stringNombre(1.2, 1)}`], [1.3, `${stringNombre(1.3, 1)}`]],
              step1: 1,
              step2: 1
            }))
            texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(texNombre(reponse, 2))}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          break

        case 27:
          if (choice([true, false])) {
            a = randint(2, 6)
            prix = new Decimal(2 + randint(1, 3) / 10).add(0.05)
            k = randint(2, 4)
            reponse = new Decimal(prix).mul(k)
            texte = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €. <br>
              Combien coûtent $${k * a}$ de ces mêmes stylos ?`

            texteCorr = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €, donc $${k * a}$
             de ces mêmes stylos coûtent  $${k}$ fois plus, soit $${k}\\times ${texPrix(prix)}=${miseEnEvidence(texNombre(k * prix))}$ €.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' €' }
          } else {
            prix = choice([new Decimal('1.20'), new Decimal('1.80'), new Decimal('2.40')])
            k = randint(3, 4)

            reponse = new Decimal(prix).div(k).mul(100)
            texte = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €. <br>
                Combien coûtent $2$ cahiers ?`

            texteCorr = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €, donc $2$
               de ces mêmes cahiers coûtent  $${k}$ fois moins, soit $ ${texPrix(prix)}\\div${k}=${texPrix(prix / k)}$ € $=${miseEnEvidence(texNombre(100 * prix / k, 0))}$ centimes.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + ' centimes' }
          }

          nbChamps = 1
          break

        case 28:
          if (choice([true, false])) {
            l = randint(2, 8)
            k = randint(2, 4)
            L = k * l
            l2 = l + randint(1, 3)
            A = point(0, 0)
            B = point(4, 0)
            C = point(4, 1.5)
            D = point(0, 1.5)
            E = point(5, 0)
            F = point(7.5, 0)
            G = point(7.5, 1)
            H = point(5, 1)
            xmin = -1.5
            ymin = -0.5
            xmax = 9.2
            ymax = 2
            pol = polygoneAvecNom(A, B, C, D)
            pol2 = polygoneAvecNom(E, F, G, H)

            // segment((i + 1) * 2, -0.1, (i + 1) * 2, 0.1)

            objets = []
            objets.push(pol[0]) //, pol[1]
            objets.push(pol2[0])
            objets.push(texteParPosition(`${stringNombre(l)} cm`, milieu(F, G).x + 0.7, milieu(F, G).y, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition(`${stringNombre(L)} cm`, milieu(E, F).x, milieu(E, F).y - 0.3, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition(`${stringNombre(l2)} cm`, milieu(A, D).x - 0.6, milieu(A, D).y, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('A ', milieu(F, G).x - 1.2, milieu(F, G).y),
              texteParPosition('B ', milieu(B, C).x - 2, milieu(B, C).y)
            )
            reponse = l2 * k
            texte = 'Le rectangle B est un agrandissement du rectangle A. Quelle est la longueur du rectangle B ?'

            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `La longueur du rectangle A est $${k}$ fois plus grande que sa largeur. On en déduit que la longueur du rectangle B est aussi $${k}$ fois plus grande que sa largeur.<br>
          Elle est donc égale à $${l2}\\times ${k}=${miseEnEvidence(k * l2)}$ cm.
                  `
          } else {
            L = randint(3, 5) * 2 // Longueur grand rectngle
            l = randint(2, 5) // Largeur grand rectngle
            k = L - randint(1, 2)
            // L = k * l
            l2 = L / 2// long petit
            A = point(0, 0)
            B = point(2.5, 0)
            C = point(2.5, 1)
            D = point(0, 1)
            E = point(3, 0)
            F = point(7, 0)
            G = point(7, 2)
            H = point(3, 2)
            xmin = -1
            ymin = -0.5
            xmax = 8.5
            ymax = 2.5
            pol = polygoneAvecNom(A, B, C, D)
            pol2 = polygoneAvecNom(E, F, G, H)
            objets = []
            objets.push(pol[0]) //, pol[1]
            objets.push(pol2[0])
            objets.push(texteParPosition(`${stringNombre(l)} cm`, milieu(F, G).x + 0.7, milieu(F, G).y, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition(`${stringNombre(L)} cm`, milieu(E, F).x, milieu(E, F).y - 0.3, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition(`${stringNombre(l2)} cm`, milieu(A, B).x, milieu(A, B).y - 0.3, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('A ', milieu(E, F).x, milieu(F, G).y, 'milieu', 'black', context.isHtml ? 1 : 0.7),
              texteParPosition('B ', milieu(A, B).x, milieu(B, C).y, 'milieu', 'black', context.isHtml ? 1 : 0.7)
            )
            reponse = new Decimal(l).div(2)
            texte = 'Le rectangle B est une réduction du rectangle A. Quelle est la largeur du rectangle B ?'
            texte += '<br>' + mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)

            texteCorr = `La longueur du rectangle A est $2$ fois plus grande que la longeur du rectangle B. On en déduit que la largeur  du rectangle B est aussi $2$ fois plus petite que la largeur du rectangle A.<br>
                    Elle est donc égale à $${l}\\div 2=${miseEnEvidence(texNombre(reponse, 1))}$ cm.
                            `
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') + 'cm' }
          nbChamps = 1
          break

        case 29:
          a = new Decimal(randint(101, 199)).div(100)
          b = new Decimal(randint(4, 9)).div(10)

          reponse = new Decimal(a).add(b)
          texte = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}=$`
          texteCorr = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') } else { texte += '$\\ldots$' }
          nbChamps = 1
          break

        case 30:
          if (choice([true, false])) {
            a = randint(2, 3)
            b = randint(2, 3)
            c = randint(2, 3)
            texte = `À la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
            Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
            texteCorr = `On peut avoir : $${a}\\times ${b}\\times ${c} =${miseEnEvidence(a * b * c)}$ menus diférents.`
            reponse = a * b * c
          } else {
            a = randint(2, 5)
            b = randint(2, 5)

            texte = `En prenant un plat au choix parmi $${a}$ plats et un dessert au choix parmi $${b}$ desserts.<br>
            Combien de repas différents peut-on réaliser ?  `
            texteCorr = `On peut avoir : $${a}\\times ${b}=${miseEnEvidence(a * b)}$ repas diférents.`
            reponse = a * b
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
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
