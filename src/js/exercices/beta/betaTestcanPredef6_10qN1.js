import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { droiteGraduee2 } from '../../modules/2d.js'
import { listeQuestionsToContenu, randint, texNombrec, range1, combinaisonListesSansChangerOrdre, prenomF, choice, texteEnCouleur, calcul } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'CAN 6ième 10 questions (niveau 1)'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * @author Gilles Mora
 * Référence
*/
export default function Can10Questions6N1 () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.nbQuestions = 10
  this.nbCols = 1
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    let questions = []
    if (!this.sup) {
      // Si aucune question n'est sélectionnée
      questions = combinaisonListesSansChangerOrdre(range1(10), this.nbQuestions)
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
    const typeQuestionsDisponibles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    for (let i = 0, texte, texteCorr, reponse, a, b, c, d, prenom1, maListe, fruits, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (typeQuestionsDisponibles[listeIndex[i]]) {
        case '1':
          a = randint(2, 6)
          b = randint(4, 6)
          texte = `$${a} \\times ${b}$`
          texteCorr = `$${a} \\times ${b}=${a * b}$`
          reponse = a * b
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break
        case '2':
          a = randint(1, 5)
          b = randint(1, 5)
          c = randint(1, 3)
          d = randint(1, 2)
          reponse = d * 10 + b
          texte = `$${c * 10 + a} + \\dots = ${calcul((c + d) * 10 + b + a)}$`
          texteCorr = `On obtient le nombre cherché par la différence : $${calcul((c + d) * 10 + b + a)} - ${c * 10 + a} = ${reponse}$`
          texteCorr += texteEnCouleur(`<br> Mentalement : <br>
            On complète $${c * 10 + a}$ jusqu'à la dizaine la plus proche en ajoutant $${(c + 1) * 10 - (c * 10 + a)}$, on obtient $${(c + 1) * 10}$,
            puis de $${(c + 1) * 10}$ à $${(c + d) * 10 + b + a}$, on ajoute encore $${(c + d) * 10 + b + a - (c + 1) * 10}$. <br>
            Au total 
            on a donc ajouter $${(c + 1) * 10 - (c * 10 + a)}$ et  $${(c + d) * 10 + b + a - (c + 1) * 10}$ ce qui donne la réponse $${reponse}$.<br>
              `)
          reponse = d * 10 + b
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break

        case '3':
          a = randint(1, 6)
          if (choice([true, false])) {
            b = a * 8
            reponse = a * 2
            setReponse(this, i, reponse, { formatInteractif: 'calcul' })
            texte = `Quel est le quart de $${b}$ ?`
            texteCorr = `Le quart de $${b}$ est $${a * 2}.$`
            texteCorr += texteEnCouleur(`<br> Mentalement : <br>
            Prendre le quart d'une quantité revient à la diviser deux fois par $2$.<br>
            Ainsi, le quart de $${b}$ est égal à $${b}\\div 2 \\div 2=${a * 4}\\div 2=${a * 2}$.
               `)
          } else {
            b = a * 6
            reponse = a * 2
            setReponse(this, i, reponse, { formatInteractif: 'calcul' })
            texte = `Quel est le tiers de $${b}$ ?`
            texteCorr = `Le tiers de $${b}$ est $${a * 2}.$`
            texteCorr += texteEnCouleur(`<br> Mentalement : <br>
            Prendre le tiers d'une quantité revient à la diviser par $3$.<br>
            Ainsi, le tiers de $${b}$ est égal à $${b}\\div 3=${a * 2}$.
            
            `)
          }
          break

        case '4':
          a = calcul(randint(2, 9) / 10)
          b = choice([1, 10])
          texte = `$${b}-${texNombrec(a)}=$`
          texteCorr = `$${b}-${texNombrec(a)}=${texNombrec(1 - a)}$`
          reponse = calcul(b - a)
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          if (b === 1) {
            texteCorr += texteEnCouleur(`
    <br> Mentalement : <br>
    $1$ unité = $10$ dixièmes.<br>
    On enlève $${texNombrec(10 * a)}$ dixièmes à $10$ dixièmes, il en reste $${texNombrec(10 * (1 - a))}$.<br>
    Ainsi, $1-${texNombrec(a)}=${texNombrec(1 - a)}$.  `)
          } else {
            texteCorr += texteEnCouleur(`
    <br> Mentalement : <br>
    $10$ unités = $100$ dixièmes.<br>
    On enlève $${texNombrec(10 * a)}$ dixièmes à $100$ dixièmes, il en reste $${texNombrec(10 * (10 - a))}$.<br>
    Ainsi, $10-${texNombrec(a)}=${texNombrec(10 - a)}$.  `)
          }
          break

        case '5':
          a = randint(6, 9) // choix de la table = écart entre deux graduations
          c = Math.floor(randint(10, 40) / a) * a // premier nombre.
          maListe = []
          for (let q = 0; q < 3; q++) {
            maListe.push([c + a * q, texNombrec(c + a * q)])
          }
          d = droiteGraduee2({
            Unite: 3 / a,
            Min: c - a,
            Max: c + 3 * a,
            x: 0,
            y: 0,
            thickDistance: a,
            thickSec: false,
            thickOffset: 0,
            axeStyle: '->',
            pointListe: [[c + a * 3, 'A']],
            labelListe: maListe,
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: false
          })
          reponse = c + 3 * a
          texte = mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 2, scale: 0.5 }, d) + 'Quel est le nombre écrit sous le point A ?'
          texteCorr = `${texteEnCouleur('Comme les graduations vont de ' + a)} ${texteEnCouleur('en ' + a)} ${texteEnCouleur(', le nombre écrit sous le point $A$ correspond à ')} ${texteEnCouleur(c + 2 * a)} ${texteEnCouleur(' + ' + a)} ${texteEnCouleur('donc c\'est ' + texNombrec(c + 3 * a) + '.')}`
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break
        case '6':
          a = randint(2, 5)
          b = randint(2, 9)
          c = randint(2, 9)
          reponse = calcul(a * 1000 + b * 10 + c * 100)
          if (choice([true, false])) {
            texte = `$${texNombrec(a)}\\times 1000 + ${texNombrec(b)}\\times 10 + ${texNombrec(c)}\\times 100=$`
            texteCorr = `$${texNombrec(a)}\\times 1000 + ${texNombrec(b)}\\times 10 + ${texNombrec(c)}\\times 100 =${texNombrec(reponse)}$`
            texteCorr += texteEnCouleur(`<br> Mentalement : <br>
      On décompose le calcul (milliers, centaines puis dizaines) : <br>
      $\\bullet$ $${texNombrec(a)}\\times 1000=${texNombrec(a * 1000)}$.<br>
      $\\bullet$ $${texNombrec(c)}\\times 100=${texNombrec(c * 100)}$.<br>
      $\\bullet$ $${texNombrec(b)}\\times 10=${texNombrec(b * 10)}$.<br>
      Ainsi,  <br>
      $\\begin{aligned}
    ${texNombrec(a)}\\times 1000 + ${texNombrec(b)}\\times 10 + ${texNombrec(c)}\\times 100 &=${texNombrec(a * 1000)}+${texNombrec(c * 100)}+${texNombrec(b * 10)}\\\\
    &=${texNombrec(reponse)}
    \\end{aligned}$.`)
          } else {
            texte = `$ ${texNombrec(c)}\\times 100+ ${texNombrec(b)}\\times 10 + ${texNombrec(a)}\\times 1000 =$`
            texteCorr = `$ ${texNombrec(c)}\\times 100+ ${texNombrec(b)}\\times 10 + ${texNombrec(a)}\\times 1000  =${texNombrec(reponse)}$`
            texteCorr += texteEnCouleur(`<br> Mentalement : <br>
    On décompose le calcul (milliers, centaines puis dizaines) : <br>
    $\\bullet$ $${texNombrec(a)}\\times 1000=${texNombrec(a * 1000)}$.<br>
    $\\bullet$ $${texNombrec(c)}\\times 100=${texNombrec(c * 100)}$.<br>
    $\\bullet$ $${texNombrec(b)}\\times 10=${texNombrec(b * 10)}$.<br>
    Ainsi, <br>$\\begin{aligned}
    ${texNombrec(c)}\\times 100+ ${texNombrec(b)}\\times 10 + ${texNombrec(a)}\\times 1000 &=${texNombrec(a)}\\times 1000 + ${texNombrec(c)}\\times 100 + ${texNombrec(b)}\\times 10\\\\
    & =${texNombrec(a * 1000)}+${texNombrec(c * 100)}+${texNombrec(b * 10)}\\\\
    &=${texNombrec(reponse)}
    \\end{aligned}$. `)
          }
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break
        case '7':
          a = randint(1, 3)
          b = randint(10, 40)
          d = calcul(a * 60 + b)
          texte = `Compléter : <br> $${a}$ heures $${b}$ minutes $=$`
          texteCorr = `Il y a $60$ minutes dans une heure.<br>
      Comme $${a} \\times 60 + ${b}=${d}$ alors $${a}$h $${b}$min = $${d}$ minutes`
          reponse = d
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break

        case '8':
          fruits = [
            ['pêches', 4, 11, 19],
            ['noix', 5, 4, 9],
            ['cerises', 6, 11, 19],
            ['pommes', 3, 21, 29],
            ['framboises', 15, 1, 9],
            ['fraises', 7, 6, 9],
            ['citrons', 3, 15, 19],
            ['bananes', 3, 15, 19]
          ]
          a = randint(0, 7)
          b = fruits[a][1]
          c = randint(fruits[a][2], fruits[a][3])
          reponse = calcul(c / 5 * b)
          texte = `$${texNombrec(c / 10)}$ kg de ${fruits[a][0]} coûtent $${texNombrec(c / 10 * b)}$ €, 
            combien coûtent $${texNombrec(c / 5)}$ kg de ${fruits[a][0]} ?`
          texteCorr = `On reconnaît une situation de proportionnalité : <br>
            La masse de ${fruits[a][0]} est proportionnelle au prix.<br>
            On remarque qu'on demande le prix pour une quantité double ($${texNombrec(c / 5)}=2\\times ${texNombrec(c / 10)}$).<br> 
            Ainsi, le prix à payer pour $${texNombrec(c / 5)}$ kg de ${fruits[a][0]} est :  $${texNombrec(c / 10 * b)} \\times 2 = ${texNombrec(reponse)}$ €`
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break

        case '9':
          prenom1 = prenomF()
          a = randint(11, 19)
          b = randint(3, 7)
          if (choice([true, false])) {
            texte = `${prenom1} a $${a}$ ans. Elle a  $${b}$ ans de moins que sa soeur.<br>
          Quel est l'âge de sa soeur ? `
            texteCorr = `Puisque ${prenom1} a $${a}$ ans et qu'elle a $${b}$ ans de moins que sa soeur, 
          alors sa soeur a $${b}$ ans de plus qu'elle, soit $${a}+${b}=${a + b}$ ans.`
            reponse = a + b
          } else {
            texte = `${prenom1} a $${a}$ ans. Elle a  $${b}$ ans de plus que sa soeur.<br>
          Quel est l'âge de sa soeur ? `
            texteCorr = `Puisque ${prenom1} a $${a}$ ans et qu'elle a $${b}$ ans de plus que sa soeur, 
          alors sa soeur a $${b}$ ans de moins qu'elle, soit $${a}-${b}=${a - b}$ ans.`
            reponse = a - b
          }

          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break

        case '10':
          a = randint(6, 11)
          b = randint(1, 5)
          texte = `Le périmètre d'un rectangle de $${a}$ m de longueur $${b}$ m de largeur est : `
          texteCorr = `Le périmètre d'un rectangle de longueur $L$ et de largeur $\\ell$ est donné par : $2\\times (L+\\ell)$.<br>
          On applique avec $L=${a}$ et $\\ell=${b}$, on obtient : 
          $2(${a}+${b})=2\\times ${a + b}=${2 * a + 2 * b}$.`
          reponse = 2 * (a + b)
          setReponse(this, i, reponse, { formatInteractif: 'calcul' })
          break
      }
      if (typeQuestionsDisponibles[listeIndex[i]] === '7') {
        if (!this.interactif) {
          texte += '.... minutes'
        } else {
          texte += ajouteChampTexteMathLive(this, i, 'inline largeur15') + 'min'
        }
      } else {
        if (typeQuestionsDisponibles[listeIndex[i]] === '8') {
          if (!this.interactif) {
            texte += ''
          } else { texte += ajouteChampTexteMathLive(this, i, 'inline largeur15') + '€' }
        } else {
          if (typeQuestionsDisponibles[listeIndex[i]] === '9') {
            if (!this.interactif) {
              texte += ''
            } else { texte += ajouteChampTexteMathLive(this, i, 'inline largeur15') + 'ans' }
          } else {
            if (typeQuestionsDisponibles[listeIndex[i]] === '10') {
              if (!this.interactif) {
                texte += '... m'
              } else { texte += ajouteChampTexteMathLive(this, i, 'inline largeur15') + ' m' }
            } else {
              texte += ajouteChampTexteMathLive(this, i, 'inline largeur15')
            }
          }
        }
      }
      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
