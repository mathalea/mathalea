import Exercice from '../../Exercice.js'
import { mathalea2d, fixeBordures, colorToLatexOrHTML } from '../../../modules/2dGeneralites.js'
import FractionX from '../../../modules/FractionEtendue.js'
import { fraction } from '../../../modules/fractions.js'
import {
  point, grille, droiteGraduee, plot, segment, milieu, labelPoint, texteParPosition, polygoneAvecNom, polygone
} from '../../../modules/2d.js'
import { round, min } from 'mathjs'
import { context } from '../../../modules/context.js'
import Hms from '../../../modules/Hms.js'
import { listeQuestionsToContenu, miseEnEvidence, stringNombre, randint, texNombre, prenomF, prenomM, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur } from '../../../modules/outils.js'
import { setReponse } from '../../../modules/gestionInteractif.js'
import Grandeur from '../../../modules/Grandeur.js'
import { ajouteChampTexteMathLive } from '../../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js'
export const titre = 'CAN CM2 sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '09/03/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '57239'

/**
 * Aléatoirisation du sujet 2023 de CAN CM2
 * @author Sébastien LOZANO
 * Référence canc3a-2023
*/

function compareNombres (a, b) {
  return a - b
}

export default function SujetCAN2023CM2 () {
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
          texte = `$${a} \\times ${b}${context.isHtml ? '=' : ''}$`
          texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('')
          break

        case 2:
          a = randint(23, 38, [20, 30, 31, 29])
          b = choice([19, 29, 39])

          texte = `$${a}+${b}${context.isHtml ? '=' : ''}$`
          reponse = a + b
          if (b === 19) { texteCorr = `$${a}+${b}=${a}+20-1=${a + 20}-1=${miseEnEvidence(reponse)}$` }
          if (b === 29) { texteCorr = `$${a}+${b}=${a}+30-1=${a + 30}-1=${miseEnEvidence(reponse)}$` }
          if (b === 39) { texteCorr = `$${a}+${b}=${a}+40-1=${a + 40}-1=${miseEnEvidence(reponse)}$` }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('')
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
          texte = 'Combien y a-t-il de boules noires ? <br> \n'

          texte += `${mathalea2d(Object.assign({ scale: 0.3 }, fixeBordures(d)), d)}`
          reponse = b
          texteCorr = `Le nombre de boules noires est donné par : $${k}\\times ${texNombre(b / k, 0)}=${miseEnEvidence(b)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('\\dots{} boules')
          break

        case 4:
          if (choice([true, false])) {
            a = randint(11, 25, 20) * 2
            reponse = a / 2
            texte = `La moitié de $${a}$${context.isHtml ? ' est : ' : ''}`
            texteCorr = `La moitié de $${a}$ est $${a}\\div 2=${miseEnEvidence(a / 2)}$.`
          } else {
            a = randint(16, 45, [20, 30, 40])
            reponse = 2 * a
            texte = `Le double de $${a}$${context.isHtml ? ' est : ' : ''}`
            texteCorr = `Le double  de $${a}$ est $${a}\\times 2=${miseEnEvidence(a * 2)}$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, 'inline largeur15')
          } else {
            texte += context.isHtml ? '$\\ldots$' : ''
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('')
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
          texte = 'Quel est le nombre écrit sous le point d\'interrogation ?<br>\n' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.6, style: 'margin: auto' }, d) + '\n'
          texte += context.isHtml ? '' : '\\\\\\smallskip'
          texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(a)}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('')
          break

        case 6: {
          function texteQ6 (valeurCible) {
            const sortie = { texte: '', reponseACompleter: ''}
            sortie.texte = context.isHtml ? `Complète : ${sp(3)} $\\ldots \\times \\ldots =${valeurCible}$` : 'Complète'
            sortie.reponseACompleter = `$\\ldots \\times \\ldots =${valeurCible}$`
            return sortie
          }
          m = choice([1, 2, 3, 4])
          if (m === 1) {
            texte = texteQ6(18).texte
            this.listeCanReponsesACompleter.push(texteQ6(18).reponseACompleter)
            reponse = ['3;6', '1;18', '2;9']
            texteCorr = `Trois réponses possibles (avec des entiers) : <br>
          $${miseEnEvidence(3)}\\times ${miseEnEvidence(6)}=18$<br>
          $${miseEnEvidence(2)}\\times ${miseEnEvidence(9)}=18$<br>
          $${miseEnEvidence(1)}\\times ${miseEnEvidence(18)}=18$ `
          }
          if (m === 2) {
            texte = texteQ6(21).texte
            this.listeCanReponsesACompleter.push(texteQ6(21).reponseACompleter)
            reponse = ['3;7', '1;21']
            texteCorr = `Deux réponses possibles (avec des entiers) : <br>
            $${miseEnEvidence(3)}\\times ${miseEnEvidence(7)}=21$<br>
            $${miseEnEvidence(1)}\\times ${miseEnEvidence(21)}=21$ `
          }
          if (m === 3) {
            texte = texteQ6(35).texte
            this.listeCanReponsesACompleter.push(texteQ6(35).reponseACompleter)
            reponse = ['5;7', '1;35']
            texteCorr = `Deux réponses possibles (avec des entiers) : <br>
              $${miseEnEvidence(5)}\\times ${miseEnEvidence(7)}=35$<br>
              $${miseEnEvidence(1)}\\times ${miseEnEvidence(35)}=35$ `
          }
          if (m === 4) {
            texte = texteQ6(42).texte
            this.listeCanReponsesACompleter.push(texteQ6(42).reponseACompleter)
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
          this.listeCanEnonces.push(texte)
        }
          break

        case 7:
          if (choice([true, false])) {
            a = randint(6, 10)
            b = choice([35, 40, 45, 50, 55])
            c = choice([30, 35, 40, 45])
            texte = context.isHtml ? `$${b}\\text{ min }+${a} \\text{ h }${c} \\text{ min }=$` : `\\Temps{;;;;${b};}+ \\Temps{;;;${a};${c};}`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
                $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(reponse)}$ min.`
          } else {
            a = randint(6, 10)
            b = choice([20, 25, 30, 35])
            c = choice([45, 50, 55])
            texte = context.isHtml ? `$${b}\\text{ min }+${a} \\text{ h }${c} \\text{ min }=$` : `\\Temps{;;;;${b};}+ \\Temps{;;;${a};${c};}`
            reponse = b + c - 60
            texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
    $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(reponse)}$ min.`
          }
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'clavierHms inline') }
          setReponse(this, index, new Hms({ hour: a + 1, minute: reponse }), { formatInteractif: 'hms' })
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('\\ldots{} h \\ldots{} min')
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
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('Je dois utiliser \\\\ \\ldots{} boites.')
          break

        case 9:

          taille1 = [['falaise', 15, 25, 'm'], ['girafe', 40, 50, 'dm'], ['échelle', 200, 300, 'cm'], ['bouteille', 28, 35, 'cm'], ['télévision', 50, 60, 'cm']]

          a = randint(0, 4)
          b = randint(taille1[a][1], taille1[a][2])
          propositions = shuffle([
            context.isHtml ? `$${b}$ m` : `\\Lg[m]{${b}}`,
            context.isHtml ? `$${b}$ dm` : `\\Lg[dm]{${b}}`,
            context.isHtml ? `$${b}$ cm` : `\\Lg[cm]{${b}}`,
            context.isHtml ? `$${b}$ mm` : `\\Lg[mm]{${b}}`
          ])

          texte = `${context.isHtml ? 'Choisis' : 'Entoure'} parmi les propositions suivantes la hauteur d'une ${taille1[a][0]}<br>
          `
          texte += context.isHtml ? `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}${sp(4)} ${propositions[3]}` : ''
          texteCorr = `La taille d'une ${taille1[a][0]} est $${miseEnEvidence(b)}$ ${taille1[a][3]}.`
          setReponse(this, index, new Grandeur(b, taille1[a][3]), { formatInteractif: 'unites' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15 longueur') }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push(`${propositions[0]} \\hfill ${propositions[1]} \\hfill ${propositions[2]} \\hfill ${propositions[3]}`)
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
              texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = `$\\text{${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]}}= ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
              texteCorr = `$\\text{${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]}}= ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
            }
          } else {
            if (a === 0) {
              texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = `$\\text{${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]}} = ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
            } else {
              texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
              reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
              texteCorr = `$\\text{${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]}} = ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
            }
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }

          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('')
          break

        case 11:
          prenom1 = prenomF()
          prenom2 = prenomM()
          if (choice([true, false])) {
            b = randint(3, 5)
            reponse = randint(4, 9)
            a = reponse + b
            texte = `${prenom1} a $${a}$ billes. <br>
            Elle en a $${b}$ de plus que ${prenom2}.${context.isHtml ? '' : '\\\\'} Combien de billes a ${prenom2} ? `
            texteCorr = `Puisque ${prenom1} en  a $${b}$ de plus, sa sœur en a $${b}$ de moins, soit  : $${a} - ${b}=${miseEnEvidence(a - b)}$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) { texte += ajouteChampTexteMathLive(this, index, 'inline largeur15') }
            this.listeCanReponsesACompleter.push(`${prenom2} a \\ldots{} billes.`)
          } else {
            b = randint(6, 15)
            a = randint(2, 5)
            reponse = b - a
            texte = `${prenom1} a $${b}$ ans. <br>
            ${prenom2} a ${a} ans de moins que ${prenom1}. ${context.isHtml ? `${prenom2} a ` : ''}`
            texteCorr = `Puisque ${prenom2} a ${a} ans de moins que ${prenom1}, son âge est  : $${b}-${a}=${miseEnEvidence(b - a)}$ ${texteEnCouleur('ans')}. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, 'largeur12 inline', { texteApres: sp(5) + 'ans.' })
            } else {
              texte += context.isHtml ? '$\\ldots$ ans' : ''
            }
            this.listeCanReponsesACompleter.push(`${prenom2} a \\ldots{} ans.`)
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1
          break
        case 12:
          break
        case 13:
          break
        case 14:
          break
        case 15:
          break
        case 16:
          break
        case 17:
          break
        case 18:
          break
        case 19:
          break
        case 20:
          break
        case 21:
          break
        case 22:
          break
        case 23:
          break
        case 24:
          break
        case 25:
          break
        case 26:
          break
        case 27:
          break
        case 28:
          break
        case 29:
          break
        case 30:
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
