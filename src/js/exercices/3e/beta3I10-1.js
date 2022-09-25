import Exercice from '../Exercice.js'
import { combinaisonListes, contraindreValeur, lampeMessage, lettreMinusculeDepuisChiffre, listeQuestionsToContenu, randint, shuffle } from '../../modules/outils.js'
import { scratchblock } from '../../modules/2d.js'
export const titre = 'Analyser des scripts Scratch'

export const dateDePublication = '25/09/2022'

/**
 * Analyser un programme scratch utilisant NoteLaCouleur
 * @author Jean-Claude Lhote
 */
export default function ScratchMultiScript () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  function nombreDeNegatifs (arr) {
    const initialValue = 0
    return arr.reduce((previousValue, currentValue) => previousValue + (currentValue < 0 ? 1 : 0), initialValue)
  }
  this.spacing = 2
  this.nbQuestions = 3
  this.titre = titre
  this.typeExercice = 'Scratch'
  this.nbCols = 2
  this.nbColsCorr = 1
  this.listePackages = 'scratch3'
  this.nouvelleVersion = function () {
    this.introduction = lampeMessage({
      titre: `${scratchblock('\\begin{scratch}[print,fill,blocks,scale=0.5]\n\\blocklist{Note la couleur}\\end{scratch}')}`,
      texte: 'Cette brique donne la couleur de la case sur laquelle est positionnée le lutin.',
      couleur: 'nombres'
    })
    const listeQuestions = [3, 3, 3]
    let choixQuestions
    this.consigne = 'Donner la série de couleurs affichées par ces programmes'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    if (!this.sup) { // Si aucune liste n'est saisie
      choixQuestions = combinaisonListes(listeQuestions, this.nbQuestions)
    } else {
      if (Number(this.sup) > 1 && Number(this.sup) < 3) {
        this.sup = contraindreValeur(1, 3, Number(this.sup), 1)
        choixQuestions = new Array(this.nbQuestions).fill(this.sup)
      } else {
        const optionsQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsQuestions[i] = contraindreValeur(1, 3, Number(optionsQuestions[i]), 1)
          choixQuestions.push(optionsQuestions[i])
        }
        if (choixQuestions.length === 0) {
          choixQuestions = combinaisonListes(listeQuestions, this.nbQuestions)
        }
      }
    }
    choixQuestions = shuffle(choixQuestions) // pour mélanger
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const x = []
      const y = []
      const touchePressee = lettreMinusculeDepuisChiffre(i + 1)
      const choixBriqueInitiale = [
        ['\\blockinit{quand \\greenflag est cliqué}\n', 'Quand le drapeau vert est cliqué'],
        ['\\blockinit{quand ce sprite est cliqué}\n', 'Quand ce sprite est cliqué'],
        [`\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`, `Quand la touche ${touchePressee} est pressée`],
        ['\\blockinit{quand la touche \\selectmenu{n\'importe laquelle} est pressée}\n', "Quand n'importe quelle touche est pressée"]
      ]
      let texteScratch = '\\begin{scratch}[print,fill,blocks,scale=0.5]\n'
      const rotations = ['\\turnright{}', '\\turnleft{}']
      const orientations = [0, 90, 180]
      texteScratch += choixBriqueInitiale[2][0]
      switch (choixQuestions[i]) {
        case 1:
          do {
            for (let j = 0; j < 3; j++) {
              x[j] = randint(-8, 7, x)
              y[j] = randint(-5, 4, [...y, ...x])
            }
            for (let j = 0; j < 3; j++) {
              x[j] = x[j] * 30 + 15
              y[j] = y[j] * 30 + 15
            }
          } while (nombreDeNegatifs([...x, ...y]) < 3)
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += '\\blockmove{aller à x: \\ovalnum{0} y: \\ovalnum{0}}\n'
          texteScratch += "\\blockmove{s'orienter à \\ovalnum{90}}\n"
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          for (let j = 0; j < 3; j++) {
            texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[j]}} y: \\ovalnum{${y[j]}}}\n`
            texteScratch += '\\blocklist{Note la couleur}\n'
          }
          texteScratch += '\\blockpen{relever le stylo}\n'
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}'

          break

        case 2:
          x.push(randint(-7, -3) * 30 + 15)
          y.push(randint(1, 4) * 30 + 15)
          x.push(30, 60, 60)
          y.push(60, 30, 30)
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[0]}} y: \\ovalnum{${y[0]}}}\n`
          texteScratch += "\\blockmove{s'orienter à \\ovalnum{90}}\n"
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          texteScratch += `\\blockrepeat{répéter \\ovalnum{2} fois}{
            \\blockrepeat{répéter \\ovalnum{2} fois}{
              \\blockmove{avancer de \\ovalnum{${x[i % 3 + 1]}} pas}\n
              \\blockmove{tourner ${rotations[i % 2]} de \\ovalnum{90} degrés}\n
              \\blockmove{avancer de \\ovalnum{${y[i % 3 + 1]}} pas}\n
              \\blockmove{tourner ${rotations[(i + 1) % 2]} de \\ovalnum{90} degrés}\n
              \\blocklist{Note la couleur}\n
            }
            \\blockmove{tourner ${rotations[(i % 3 === 2 ? 1 : 0)]} de \\ovalnum{90} degrés}\n
          }\n`
          texteScratch += '\\blockpen{relever le stylo}\n'
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}'

          break

        case 3:
          x.push(randint(-3, 3) * 30 + 15)
          y.push(randint(-2, 2) * 30 + 15)
          x.push(-120, 30, 60, 60, 30, -60)
          y.push(30, -120, -30, 30, 60, -30)
          texteScratch += '\\blockpen{effacer tout}\n'
          texteScratch += `\\blockmove{aller à x: \\ovalnum{${x[0]}} y: \\ovalnum{${y[0]}}}\n`
          texteScratch += `\\blockmove{s'orienter à \\ovalnum{${orientations[i % 3]}}}\n`
          texteScratch += '\\blockpen{stylo en position d\'écriture}\n'
          texteScratch += `\\blockrepeat{répéter \\ovalnum{4} fois}{
\\blockifelse{si \\booloperator{\\ovalvariable{${i % 3 > 0 ? 'abscisse x' : 'ordonnée y'}} > \\ovalnum{120}} alors}
{\\blockmove{ajouter \\ovalnum{${x[i % 3 + 1]}} à x}\n\\blockmove{ajouter \\ovalnum{${y[i % 3 + 1]}} à y}\n}
{\\blockmove{ajouter \\ovalnum{${x[i % 3 + 4]}} à x}\n\\blockmove{ajouter \\ovalnum{${y[i % 3 + 4]}} à y}\n}
\\blocklist{Note la couleur}\n}\n`
          texteScratch += '\\blockpen{relever le stylo}\n'
          texteScratch += '\\blockstop{stop \\selectmenu{tout}}'

          break
      }
      texteScratch += '\\end{scratch}'
      texteScratch = scratchblock(texteScratch)
      const texteCorr = ''
      if (this.questionJamaisPosee(i, texteScratch)) {
        this.listeQuestions.push(texteScratch)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = [
    'Compétence évaluée',
    'Nombres séparés par des tirets\n1 : Repérage dans le plan\n2 : Boucles répéter n fois imbriquées\n3 : Conditionnelles'
  ]
}
