import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, cesar } from '../../modules/outils.js'
import { point, polygoneRegulier, repere2, graphiqueInterpole, mathalea2d } from '../../modules/2d.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Spécial escape game'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * @author Jean-Claude Lhote
 * publié le  15/11/2020
 * ref 3F13-2
 */
export default function PremierEscapeGameMathalea () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = 'Trouver le mot de passe.'
  this.nbQuestions = 1
  context.isHtml ? this.spacingCorr = 1 : this.spacingCorr = 1.5
  context.isHtml ? this.spacing = 1 : this.spacing = 2
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1
  // this.sup2 = ''
  this.pasDeVersionLatex = false
  this.nouvelleVersion = function () {
    const lettres = []; const mots = ['BMDF', 'OGNQ', 'BUQP', 'BAUP', 'BXGE', 'BDUJ', 'MZSXQE', 'BDUEYQ', 'BMDFUQ', 'HMXQGD', 'OAGBXQ', 'PDAUFQ', 'DQXMFUAZ', 'BMDMNAXQ', 'MPPUFUAZ', 'QJBAEMZF', 'RAZOFUAZ', 'OAYBXQJQ']
    let alphabet = []
    this.listeQuestions = []
    this.listeCorrections = []
    let texte = ''; let texteCorr = ''; let f1; let f2; let f3; let f4; let p
    // Initialisation des tableaux
    for (let i = 0; i < 26; i++) {
      alphabet.push(String.fromCharCode(65 + i))
    }
    for (let y = 0; y < 5; y++) {
      lettres.push(['*', '*', '*', '*', '*', '*'])
    }

    const type = parseInt(this.sup)
    const mdp = cesar(mots[randint(0, 5) + (type - 1) * 6], 14)
    const absc = []; const ord = []; let car
    texte += ajouteChampTexte(this, 0, { texte: 'Taper le mot de passe en majuscules :' })
    texteCorr += `Le mot de passe comporte ${2 + 2 * type} lettres.`
    setReponse(this, 0, mdp, { formatInteractif: 'texte' })
    for (let x = 0; x < type * 2 + 2; x++) {
      car = mdp[x]
      alphabet = alphabet.filter(item => item !== car)
      if (x % 2 === 0) { absc.push(randint(0, 2)) } else { absc.push(randint(3, 5)) }
      // Pour l'abscisse, pas de problème de doublons
      if (x % 2 === 0) {
        ord.push(randint(0, 4))// premier point, l'ordonnée n'est pas contrainte.
      } else { ord.push(randint(0, 4, ord[x - 1])) } // pour le deuxième, on évite l'ordonnée précédente
      if (lettres[ord[x]][absc[x]] === '*') { lettres[ord[x]][absc[x]] = car } else if (lettres[ord[x]][absc[x]] !== car) {
        for (let i = 0; i < x; i++) {
          if (absc[i] === absc[x] && ord[i] === ord[x]) {
            ord[x] = (ord[x] + 1) % 5
            i = 0
          }
        }
        lettres[ord[x]][absc[x]] = car
      }
    }
    for (let i = 0; i < type * 2 + 2; i++) {
      absc[i]++ // On corrige les coordonnées des points
      ord[i]++
    }
    // On complète la grille de lettres
    alphabet = shuffle(alphabet)
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 5; y++) {
        if (lettres[y][x] === '*' && alphabet.length > 0) {
          lettres[y][x] = alphabet.pop()
        }
      }
    }
    // On calcule les ordonnées de début et de fin de chaque courbe
    const ord0 = [0, 0, 0, 0]; const ord6 = [0, 0, 0, 0]
    const r = repere2({ xMin: -1, yMin: -1, xMax: 7, yMax: 6, xUnite: 2 })

    for (let i = 0; i < type * 2 + 2; i += 2) {
      if (ord[i] > ord[i + 1]) {
        ord0[i / 2] = -2.34 + randint(0, 2)
        ord6[i / 2] = 8.17 - randint(0, 2)
      } else {
        ord6[i / 2] = -2.34 + randint(0, 2)
        ord0[i / 2] = 8.17 - randint(0, 2)
      }
    }
    switch (type) {
      case 1: // N&B
        p = polygoneRegulier(point(-1, -2), point(15, -2), 4)
        p.couleurDeRemplissage = 'gray'
        p.opacite = 0.2
        f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'black', step: 0.1 })
        f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'white', step: 0.1 })
        f1.epaisseur = 2
        f2.epaisseur = 2
        texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2) + '<br>'
        break
      case 2: // RGB
        p = polygoneRegulier(point(-1, -2), point(15, -2), 4)
        p.opacite = 0.2
        p.couleurDeRemplissage = 'gray'
        f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'red', step: 0.1 })
        f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'green', step: 0.1 })
        f3 = graphiqueInterpole([[0, ord0[2]], [absc[4], ord[4]], [absc[5], ord[5]], [7, ord6[2]]], { repere: r, color: 'blue', step: 0.1 })
        f1.epaisseur = 2
        f2.epaisseur = 2
        f3.pepaisseur = 2
        texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2, f3) + '<br>'
        break
      case 3: // CJMN
        p = polygoneRegulier(point(-1, -2), point(15, -2), 4)
        p.opacite = 0.2
        p.couleurDeRemplissage = 'gray'
        f1 = graphiqueInterpole([[0, ord0[0]], [absc[0], ord[0]], [absc[1], ord[1]], [7, ord6[0]]], { repere: r, color: 'cyan', step: 0.1 })
        f2 = graphiqueInterpole([[0, ord0[1]], [absc[2], ord[2]], [absc[3], ord[3]], [7, ord6[1]]], { repere: r, color: 'yellow', step: 0.1 })
        f3 = graphiqueInterpole([[0, ord0[2]], [absc[4], ord[4]], [absc[5], ord[5]], [7, ord6[2]]], { repere: r, color: 'magenta', step: 0.1 })
        f4 = graphiqueInterpole([[0, ord0[3]], [absc[6], ord[6]], [absc[7], ord[7]], [7, ord6[3]]], { repere: r, color: 'black', step: 0.1 })
        f1.epaisseur = 2
        f2.epaisseur = 2
        f3.pepaisseur = 2
        f4.epaisseur = 2
        texte += mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 7, pixelsParCm: 30 }, p, r, f1, f2, f3, f4) + '<br>'
        break
    }
    texte += '$\\begin{array}{|l|' + 'c|'.repeat(6) + '}\n'
    texte += '\\hline\n'
    texte += ' '
    for (let j = 0; j < 6; j++) {
      texte += ` & \\text{${j + 1}}`
    }
    texte += '\\\\\\hline\n'
    for (let i = 0; i < 5; i++) {
      texte += `\\text{${i + 1}}`
      for (let j = 0; j < 6; j++) {
        texte += '& ' + lettres[i][j] // valeur dans le tableau
      }
      texte += '\\\\\\hline\n'
    }
    texte += '\\end{array}\n$'
    texte += '<br>'

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)

    // this.besoinFormulaire2Numerique = ['Coefficient de réduction(problèmes de type1)', 3, ' 1 : Décimal\n 2 : Non décimal\n 3 : Décimal ou non'];
  }
  this.besoinFormulaireNumerique = ['Catégorie', 3, ' 1 : Noir & Blanc\n 2 : RGB\n 3 : CJMN']
  // this.besoinFormulaire2Texte = ['Quel est ton mot de passe ?', 1, 'Mot de passe (en majuscule):']
}
