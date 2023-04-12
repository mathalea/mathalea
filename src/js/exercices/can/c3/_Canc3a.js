import { mathalea2d, fixeBordures, colorToLatexOrHTML } from '../../../modules/2dGeneralites.js'
import FractionX from '../../../modules/FractionEtendue.js'
import {
  point, grille, droiteGraduee, plot, segment, milieu, segmentAvecExtremites, texteParPosition, polygoneAvecNom, polygone
} from '../../../modules/2d.js'
import { context } from '../../../modules/context.js'
import { miseEnEvidence, stringNombre, randint, texNombre, prenomF, prenomM, texPrix, shuffle, choice, sp, arrondi, texteEnCouleur } from '../../../modules/outils.js'

import Decimal from 'decimal.js'
export const titre = 'Classe CAN C3'

/**
 * Essai de classe Can pour le sujet cm2 2023
 * @author Sébastien LOZANO
*/

export default class ClasseCan2023 {
  compareNombres (a, b) {
    return a - b
  }

  /**
   * Méthode pour la question produit de deux facteurs entiers
   * @param {number} minFacteur0 min pour le premier facteur
   * @param {number} maxFacteur0 max pour le premier facteur
   * @param {number} minFacteur1 min pour le second facteur
   * @param {number} maxFacteur1 max pour le second facteur
   * @returns {object}
   * @author Sébastien LOZANO
   */

  produitDeDeuxFacteurs (minFacteur0, maxFacteur0, minFacteur1, maxFacteur1) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = randint(minFacteur0, maxFacteur0)
    const b = randint(minFacteur1, maxFacteur1)
    sortie.texte = `$${a} \\times ${b}${context.isHtml ? '=' : ''}$`
    sortie.texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
    sortie.reponse = a * b
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour ajouter une dizaine moins un
   * @returns {object}
   * @author Sébastien LOZANO
   */

  ajouterDizaineMoinsUn () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = randint(23, 38, [20, 30, 31, 29])
    const b = choice([19, 29, 39])

    sortie.texte = `$${a}+${b}${context.isHtml ? '=' : ''}$`
    sortie.reponse = a + b
    if (b === 19) { sortie.texteCorr = `$${a}+${b}=${a}+20-1=${a + 20}-1=${miseEnEvidence(sortie.reponse)}$` }
    if (b === 29) { sortie.texteCorr = `$${a}+${b}=${a}+30-1=${a + 30}-1=${miseEnEvidence(sortie.reponse)}$` }
    if (b === 39) { sortie.texteCorr = `$${a}+${b}=${a}+40-1=${a + 40}-1=${miseEnEvidence(sortie.reponse)}$` }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour dénombrer les éléments d'un rectangle
   * @returns {object}
   * @author Sébastien LOZANO
   */

  denombrementProduit () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const k = randint(5, 8)
    const b = randint(2, 5) * k
    let c = []
    for (let n = 0; n < b; n++) {
      c.push(true)
    }
    c = shuffle(c)
    const d = []
    for (let n = 0; n < b; n++) {
      d.push(plot(n % k, -Math.floor(n / k), { rayon: 0.2, couleur: 'black', couleurDeRemplissage: 'black' }))
    }
    sortie.texte = 'Combien y a-t-il de boules noires ? <br> \n'

    sortie.texte += `${mathalea2d(Object.assign({ scale: 0.3 }, fixeBordures(d)), d)}`
    sortie.reponse = b
    sortie.texteCorr = `Le nombre de boules noires est donné par : $${k}\\times ${texNombre(b / k, 0)}=${miseEnEvidence(b)}$.`
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '\\dots{} boules'
    return sortie
  }

  /**
   * Méthode pour calucler la moitié ou le double
   * @returns {object}
   * @author Sébastien LOZANO
   */

  moitieDouble () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a
    if (choice([true, false])) {
      a = randint(11, 25, 20) * 2
      sortie.reponse = a / 2
      sortie.texte = `La moitié de $${a}$${context.isHtml ? ' est : ' : ''}`
      sortie.texteCorr = `La moitié de $${a}$ est $${a}\\div 2=${miseEnEvidence(a / 2)}$.`
    } else {
      a = randint(16, 45, [20, 30, 40])
      sortie.reponse = 2 * a
      sortie.texte = `Le double de $${a}$${context.isHtml ? ' est : ' : ''}`
      sortie.texteCorr = `Le double  de $${a}$ est $${a}\\times 2=${miseEnEvidence(a * 2)}$.`
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour la lecture d'abscisse entière
   * @returns {object}
   * @author Sébastien LOZANO
   */
  lectureAbscisseEntiere () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    // Variables pour l'affichage LaTeX
    let pas, valeurOrigine, valeurUnitex, gradLaTeX
    let a, d, maListe
    if (choice([true, false])) {
      a = randint(42, 52, [40, 45, 50]) * 2 // choix de la produit = écart entre deux graduations
      pas = 5
      valeurOrigine = a - a % 10
      valeurUnitex = valeurOrigine + 10
      gradLaTeX = Math.floor(a % 10 / 2)
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
      a = choice([75, 85, 95, 105, 115])// choix de la produit = écart entre deux graduations
      pas = 2
      valeurOrigine = a - a % 10
      valeurUnitex = valeurOrigine + 10
      gradLaTeX = 1
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
    sortie.reponse = a
    sortie.texte = context.isHtml ? 'Quel est le nombre écrit sous le point d\'interrogation ?<br>\n' + mathalea2d({ xmin: -1, ymin: -1, xmax: 15, ymax: 1.5, scale: 0.6, style: 'margin: auto' }, d) + '\n' : `Complète \\\\ \\Reperage[ValeurOrigine=${valeurOrigine},ValeurUnitex=${valeurUnitex},Pasx=${pas},AffichageAbs=3,AffichageGrad]{${gradLaTeX}/A}`
    // texte += context.isHtml ? '' : '\\\\\\smallskip'
    sortie.texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(a)}$.`
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `\\Reperage[ValeurOrigine=${valeurOrigine},ValeurUnitex=${valeurUnitex},Pasx=${pas},AffichageAbs=3,AffichageGrad]{${gradLaTeX}/A}`
    return sortie
  }

  /**
   * Méthode pour déterminer deux facteurs d'un produit donné
   * @returns {object}
   * @author Sébastien LOZANO
   */

  trouverLesFacteursDUnProduit () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    function texteQ6 (valeurCible) {
      const sortie = { texte: '', reponseACompleter: '' }
      sortie.texte = `Complète : ${context.isHtml ? sp(3) : ''} $\\ldots \\times \\ldots =${valeurCible}$`
      sortie.reponseACompleter = `$\\ldots \\times \\ldots =${valeurCible}$`
      return sortie
    }
    const m = choice([1, 2, 3, 4])
    if (m === 1) {
      sortie.texte = texteQ6(18).texte
      sortie.canReponseACompleter = texteQ6(18).reponseACompleter
      sortie.reponse = ['3;6', '1;18', '2;9']
      sortie.texteCorr = `Trois réponses possibles (avec des entiers) : <br>
    $${miseEnEvidence(3)}\\times ${miseEnEvidence(6)}=18$<br>
    $${miseEnEvidence(2)}\\times ${miseEnEvidence(9)}=18$<br>
    $${miseEnEvidence(1)}\\times ${miseEnEvidence(18)}=18$ `
    }
    if (m === 2) {
      sortie.texte = texteQ6(21).texte
      sortie.canReponseACompleter = texteQ6(21).reponseACompleter
      sortie.reponse = ['3;7', '1;21']
      sortie.texteCorr = `Deux réponses possibles (avec des entiers) : <br>
      $${miseEnEvidence(3)}\\times ${miseEnEvidence(7)}=21$<br>
      $${miseEnEvidence(1)}\\times ${miseEnEvidence(21)}=21$ `
    }
    if (m === 3) {
      sortie.texte = texteQ6(35).texte
      sortie.canReponseACompleter = texteQ6(35).reponseACompleter
      sortie.reponse = ['5;7', '1;35']
      sortie.texteCorr = `Deux réponses possibles (avec des entiers) : <br>
        $${miseEnEvidence(5)}\\times ${miseEnEvidence(7)}=35$<br>
        $${miseEnEvidence(1)}\\times ${miseEnEvidence(35)}=35$ `
    }
    if (m === 4) {
      sortie.texte = texteQ6(42).texte
      sortie.canReponseACompleter = texteQ6(42).reponseACompleter
      sortie.reponse = ['6;7', '1;42', '2;21', '3;14']
      sortie.texteCorr = `Quatre réponses possibles (avec des entiers) : <br>
            $${miseEnEvidence(6)}\\times ${miseEnEvidence(7)}=42$<br>
            $${miseEnEvidence(2)}\\times ${miseEnEvidence(21)}=42$ <br>
            $${miseEnEvidence(3)}\\times ${miseEnEvidence(14)}=42$<br>
            $${miseEnEvidence(1)}\\times ${miseEnEvidence(42)}=42$`
    }
    sortie.canEnonce = 'Complète.'
    return sortie
  }

  /**
   * Méthode pour ajouter des durées
   * @returns {object}
   * @author Sébastien LOZANO
   */

  sommeDeDurees () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a, b, c
    if (choice([true, false])) {
      a = randint(6, 10)
      b = choice([35, 40, 45, 50, 55])
      c = choice([30, 35, 40, 45])
      sortie.texte = context.isHtml ? `$${b}\\text{ min }+${a} \\text{ h }${c} \\text{ min }=$` : `\\Temps{;;;;${b};}+ \\Temps{;;;${a};${c};}`
      sortie.reponse = b + c - 60
      sortie.texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne 
          $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(sortie.reponse)}$ min.`
    } else {
      a = randint(6, 10)
      b = choice([20, 25, 30, 35])
      c = choice([45, 50, 55])
      sortie.texte = context.isHtml ? `$${b}\\text{ min }+${a} \\text{ h }${c} \\text{ min }=$` : `\\Temps{;;;;${b};}+ \\Temps{;;;${a};${c};}`
      sortie.reponse = b + c - 60
      sortie.texteCorr = `Pour aller à $${a + 1}$ h, il faut $${60 - c}$ min, et il reste $${b - 60 + c}$ min à ajouter, ce qui donne $${miseEnEvidence(a + 1)}$ h et $${miseEnEvidence(sortie.reponse)}$ min.`
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '\\ldots{} h \\ldots{} min'
    return sortie
  }

  /**
   * Méthode pour un calcul de partage
   * @returns {object}
   * @author Sébastien LOZANO
   */

  partages () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const choix = choice(['a', 'b', 'c', 'd'])
    let a
    if (choix === 'a') {
      a = randint(9, 15) * 3
      sortie.reponse = Math.round(a / 3)
      sortie.texte = `Pour partager $${a}$ oeufs, combien de boites de  $3$ oeufs dois-je utiliser ? `
      sortie.texteCorr = `Le nombre de boites est donné par $${a}\\div 3=${miseEnEvidence(a / 3)}$.`
    }
    if (choix === 'b') {
      sortie.reponse = randint(8, 12)
      a = sortie.reponse * 4
      sortie.texte = `Pour partager $${a}$ oeufs, combien de boites de  $4$ oeufs dois-je utiliser ? `
      sortie.texteCorr = `Le nombre de boites est donné par $${a}\\div 4=${miseEnEvidence(a / 4)}$.`
    }
    if (choix === 'c') {
      sortie.reponse = randint(6, 10)
      a = sortie.reponse * 5
      sortie.texte = `Pour partager $${a}$ oeufs, combien de boites de  $5$ oeufs dois-je utiliser ? `
      sortie.texteCorr = `Le nombre de boites est donné par $${a}\\div 5=${miseEnEvidence(sortie.reponse)}$.`
    }
    if (choix === 'd') {
      sortie.reponse = randint(4, 8)
      a = sortie.reponse * 6
      sortie.texte = `Pour partager $${a}$ oeufs, combien de boites de  $6$ oeufs dois-je utiliser ? `
      sortie.texteCorr = `Le nombre de boites est donné par $${a}\\div 6=${miseEnEvidence(sortie.reponse)}$.`
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = 'Je dois utiliser \\\\ \\ldots{} boites.'
    return sortie
  }

  /**
   * Méthode pour un ordre de grandeur
   * @returns {object}
   * @author Sébastien LOZANO
   */

  ordreDeGrandeur () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      reponseUnite: '',
      canEnonce: '',
      canReponseACompleter: ''
    }
    const taille1 = [['falaise', 15, 25, 'm'], ['girafe', 40, 50, 'dm'], ['échelle', 200, 300, 'cm'], ['bouteille', 28, 35, 'cm'], ['télévision', 50, 60, 'cm']]

    const a = randint(0, 4)
    const b = randint(taille1[a][1], taille1[a][2])
    const propositions = shuffle([
      context.isHtml ? `$${b}$ m` : `\\Lg[m]{${b}}`,
      context.isHtml ? `$${b}$ dm` : `\\Lg[dm]{${b}}`,
      context.isHtml ? `$${b}$ cm` : `\\Lg[cm]{${b}}`,
      context.isHtml ? `$${b}$ mm` : `\\Lg[mm]{${b}}`
    ])
    sortie.reponse = b
    sortie.reponseUnite = taille1[a][3]

    sortie.texte = `Choisis parmi les propositions suivantes la hauteur d'une ${taille1[a][0]}<br>`
    sortie.texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}${sp(4)} ${propositions[3]}`
    sortie.texteCorr = `La taille d'une ${taille1[a][0]} est $${miseEnEvidence(sortie.reponse)}$ ${sortie.reponseUnite}.`
    sortie.canEnonce = `Entoure parmi les propositions suivantes la hauteur d'une ${taille1[a][0]}`
    sortie.canReponseACompleter = `${propositions[0]} \\hfill ${propositions[1]} \\hfill ${propositions[2]} \\hfill ${propositions[3]}`
    return sortie
  }

  /**
   * Méthode pour écrire un nombre en chiffres
   * @returns {object}
   * @author Sébastien LOZANO
   */

  ecrireUnNombreEnChiffres () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
    let chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
    let a = randint(0, 8)
    let b = randint(0, 4)
    let c = randint(0, 8)
    let d = randint(0, 4)
    if (choice([true, false])) {
      chiffre = [['un', 1], ['deux', 2], ['trois', 3], ['cinq', 5], ['quatre', 4], ['six', 6], ['sept', 7], ['huit', 8], ['neuf', 9]]
      chiffre2 = [['vingt', 20], ['trente', 30], ['quarante', 40], ['cinquante', 50], ['soixante', 60]]
      a = randint(0, 8)
      b = randint(0, 4)
      c = randint(0, 8)
      d = randint(0, 4)
      if (a === 0) {
        sortie.texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]} `
        sortie.reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
        sortie.texteCorr = `$\\text{${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre[c][0]}}= ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
      } else {
        sortie.texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]} `
        sortie.reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]
        sortie.texteCorr = `$\\text{${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre[c][0]}}= ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre[c][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre[c][1]))}$ `
      }
    } else {
      if (a === 0) {
        sortie.texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
        sortie.reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
        sortie.texteCorr = `$\\text{${chiffre2[b][0]}-et-${chiffre[a][0]}-mille-${chiffre2[d][0]}} = ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
      } else {
        sortie.texte = `Écris en chiffres le nombre : <br> ${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]} `
        sortie.reponse = (chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]
        sortie.texteCorr = `$\\text{${chiffre2[b][0]}-${chiffre[a][0]}-mille-${chiffre2[d][0]}} = ${texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000)} + ${chiffre2[d][1]} =${miseEnEvidence(texNombre((chiffre2[b][1] + chiffre[a][1]) * 1000 + chiffre2[d][1]))}$ `
      }
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour de plus de moins
   * @param {string} type pour le type de problème
   * @returns {object}
   * @author Sébastien LOZANO
   */

  dePlusDeMoins (type) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: '',
      champTexteApres: {},
      texteApres: ''
    }
    const prenom1 = prenomF()
    const prenom2 = prenomM()
    let b, a
    switch (type) {
      case 'billes':
        b = randint(3, 5)
        sortie.reponse = randint(4, 9)
        a = sortie.reponse + b
        sortie.texte = `${prenom1} a $${a}$ billes. <br>
        Elle en a $${b}$ de plus que ${prenom2}.${context.isHtml ? '' : '\\\\'} Combien de billes a ${prenom2} ? `
        sortie.texteCorr = `Puisque ${prenom1} en  a $${b}$ de plus, sa sœur en a $${b}$ de moins, soit  : $${a} - ${b}=${miseEnEvidence(a - b)}$. `
        sortie.champTexteApres = {}
        sortie.canEnonce = sortie.texte
        sortie.canReponseACompleter = `${prenom2} a \\ldots{} billes.`
        break
      case 'ages':
        b = randint(6, 15)
        a = randint(2, 5)
        sortie.reponse = b - a
        sortie.texte = `${prenom1} a $${b}$ ans. <br>
        ${prenom2} a ${a} ans de moins que ${prenom1}. ${prenom2} a `
        sortie.texteCorr = `Puisque ${prenom2} a ${a} ans de moins que ${prenom1}, son âge est  : $${b}-${a}=${miseEnEvidence(b - a)}$ ${texteEnCouleur('ans')}. `
        sortie.champTexteApres = { texteApres: sp(5) + 'ans.' }
        sortie.texteApres = '$\\ldots$ ans'
        sortie.canReponseACompleter = `${prenom2} a \\ldots{} ans.`
        sortie.canEnonce = `${prenom1} a $${b}$ ans. <br>
        ${prenom2} a ${a} ans de moins que ${prenom1}.`
        break
    }
    return sortie
  }

  /**
   * Méthode pour demander l'écriture d'un produit d'un entier par un nombre entier de dixièmes/centièmes
  * @returns {object}
  * @author Sébastien LOZANO
  */
  ecritureDecimaleProduitEntierParDixiemesOuCentiemes () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a = randint(2, 5)
    let b = randint(6, 9)
    let c = new Decimal('0.1')
    if (choice([true, false])) {
      a = randint(2, 5)
      b = randint(6, 9)
      c = new Decimal('0.1')
      sortie.reponse = new Decimal(a).mul(b).mul(c)
      sortie.texte = `Donne l'écriture décimale de  $${a}\\times ${b}$ dixièmes.`
      sortie.texteCorr = `$1$ dixième $=0,1$, d'où $${a}\\times ${b}$ dixièmes $=${a}\\times ${b}\\times 0,1=${miseEnEvidence(texNombre(sortie.reponse, 1))}$.`
    } else {
      a = randint(2, 5)
      b = randint(6, 9)
      c = new Decimal('0.01')
      sortie.reponse = new Decimal(a).mul(b).mul(c)
      sortie.texte = `Donne l'écriture décimale de  $${a}\\times ${b}$ centièmes.`
      sortie.texteCorr = `$1$ centième $=0,01$, d'où $${a}\\times ${b}$ centièmes $=${a}\\times ${b}\\times 0,01=${miseEnEvidence(texNombre(sortie.reponse, 2))}$.`
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour la lecture d'abscisse entière
   * @returns {object}
   * @author Sébastien LOZANO
   */
  lectureAbscisseEntiereOrigineZero () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const facteur = randint(2, 9)
    const table = randint(2, 9)
    const a = facteur * table
    let unite
    switch (table) {
      case 2:
      case 3:
      case 4:
      case 5:
        unite = 0.5
        break
      case 6:
      case 7:
      case 8:
      case 9:
        unite = 0.25
        break
    }
    const d = droiteGraduee({
      Unite: unite,
      Min: 0,
      Max: 11 * table,
      x: 0,
      y: 0,
      thickDistance: table,
      thickSec: true,
      thickSecDist: table,
      thickOffset: 0,
      axeStyle: '->',
      pointListe: [[a, '?']],
      labelListe: [[0, '0'], [table, `${table}`], [10 * table, `${10 * table}`]],
      pointCouleur: 'blue',
      pointStyle: 'x',
      labelsPrincipaux: false
    })
    sortie.reponse = a
    sortie.canReponseACompleter = `\\Reperage[DemiDroite,Pasx=1,Unitex=0.4,ValeurUnitex=${table},AffichageAbs=2]{${facteur}/3*A,10/B}`
    sortie.texte = context.isHtml ? 'Quel est le nombre écrit sous le point d\'interrogation ?<br>\n' + mathalea2d({ xmin: -1, ymin: -1, xmax: d.Max, ymax: 1.5, scale: 0.6, style: 'margin: auto' }, d) + '\n' : `Complète \\\\ ${sortie.canReponseACompleter}`
    // texte += context.isHtml ? '' : '\\\\\\smallskip'
    sortie.texteCorr = `Le nombre écrit sous le point d'interrogation est : $${miseEnEvidence(a)}$.`
    sortie.canEnonce = 'Complète.'
    return sortie
  }

  /**
   * Méthode pour déterminer un terme décimal inconnu
   * @returns {object}
   * @author Sébastien LOZANO
   */
  trouverUnTermeDecimalInconnu () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = new Decimal(randint(1, 9)).div(10)
    const b = new Decimal(randint(1, 9)).add(a)
    const res = choice([10, 20])
    sortie.reponse = new Decimal(res).sub(b)
    sortie.texte = `Complète : ${sp(3)}
    $${texNombre(b, 1)}+\\ldots =${res}$ `
    sortie.texteCorr = `Le nombre cherché est donné par : $${res}-${texNombre(b, 1)}=${miseEnEvidence(texNombre(sortie.reponse, 2))}$.`
    // sortie.reponse = a
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `$${texNombre(b, 1)}+\\ldots =${res}$`
    return sortie
  }

  /**
   * Méthode pour décomposer un nombre à 3 chiffres en ... dizaines et ... unités
   * @returns {object}
   * @author Sébastien LOZANO
   */
  decomposerUnNombreATroisChiffresEnDizainesUnites () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const nombreDeDizaines = randint(10, 99)
    const nombreDUnites = randint(2, 9)
    const nombre = 10 * nombreDeDizaines + nombreDUnites
    sortie.reponse = [`${nombreDeDizaines};${nombreDUnites}`]
    sortie.texte = `Complète : ${sp(3)}
    $${texNombre(nombre, 0)}= \\ldots \\text{ dizaines } \\ldots \\text{ unités }$ `
    sortie.texteCorr = `$${texNombre(nombre, 0)} = ${miseEnEvidence(texNombre(nombreDeDizaines, 0))} \\text{ dizaines } ${miseEnEvidence(texNombre(nombreDUnites, 0))} \\text{ unités }$`
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `$${texNombre(nombre, 0)}= \\ldots \\text{ dizaines } \\ldots \\text{ unités }$ `
    return sortie
  }

  /**
   * Méthode pour déterminer une fraction à partir d'une figure
   * @returns {object}
   * @author Sébastien LOZANO
   */
  determinerUneFractionAPartirDUneFigure () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const b = randint(2, 4)
    const a = randint(b + 1, 6)
    const c = randint(1, a - 1)
    const d = randint(1, b)
    const e = randint(0, c - 1)
    const f = randint(d, b)
    const A = polygone([point(0, 0), point(c, 0), point(c, d), point(e, d), point(e, f), point(0, f)], 'black')
    A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
    const C = grille(0, 0, a, b, 'black', 1, 1, false)
    // const D = point(1 + a, 4 - b)
    sortie.texte = `Quelle fraction de la surface totale représente la surface grisée ?
    <br>`
    sortie.texte += mathalea2d({ xmin: -0.5, ymin: -0.1, xmax: 6.1, ymax: b + 0.5, scale: 0.7, style: 'margin: auto' }, A, C)
    sortie.texteCorr = `Il y a $${c * d + e * f - e * d}$ ${c * d + e * f - e * d > 1 ? 'carrés' : 'carré'} gris sur un total de $${a * b}$ carrés, la surface grisée représente donc $\\dfrac{${miseEnEvidence(c * d + e * f - e * d)}}{${miseEnEvidence(a * b)}}$ de la surface totale.`
    sortie.reponse = new FractionX(c * d + e * f - e * d, a * b)
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour déterminer un quotient
   * @returns {object}
   * @author Sébastien LOZANO
   */
  determinerUnQuotient () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = randint(5, 9)
    const b = randint(4, 9)
    const c = a * b
    sortie.reponse = b
    sortie.texte = `$${c}\\div ${a}=$`
    sortie.texteCorr = `$${c}\\div ${a}=${miseEnEvidence(sortie.reponse)}$`
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `$${c}\\div ${a} =\\ldots$`
    return sortie
  }

  /**
   * Méthode pour un calcul de proportionnalité par addition
   * @param {string} type type d'énoncé
   * @returns {object}
   * @author Sébastien LOZANO
   */
  proportionnaliteParAddition (type) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: '',
      uniteInteractif: ''
    }
    let a, b, k
    switch (type) {
      case 'pieces':
        a = choice([4, 6, 8, 10, 12, 14])
        b = a + a / 2
        sortie.reponse = arrondi(2 * b, 0)
        sortie.texte = `Si une pile de $${a}$ pièces de monnaie a une hauteur de $${2 * a}$ mm, alors une pile de $${texNombre(b, 0)}$ pièces a une hauteur de `
        sortie.texteCorr = `Une pile de $${a}$ pièces de monnaie a une hauteur de $2\\times ${a}=${2 * a}$ mm.<br>
        Donc une pile de  $${texNombre(b, 0)}$ pièces aura une hauteur de $2\\times ${b}=${miseEnEvidence(2 * b)}$ mm.`
        sortie.canEnonce = `Si une pile de $${a}$ pièces de monnaie a une hauteur de $\\Lg[mm]{${2 * a}}$, `
        sortie.canReponseACompleter = `alors une pile de $${texNombre(b, 0)}$ pièces a une hauteur de $\\ldots$ \\Lg[mm]{}.`
        sortie.uniteInteractif = 'mm'
        break
      case 'cahiers':
        a = randint(2, 6)
        k = randint(2, 4)
        b = k * a
        sortie.reponse = k * b
        sortie.texte = `Si $${a}$ cahiers coûtent $${b}$ €, alors $${b}$ cahiers coûtent `
        sortie.texteCorr = `$${a}$ cahiers coûtent $${b}$ €.<br> $${k}\\times${a}=${k * a}$ cahiers coûtent $${k}\\times${b}=${miseEnEvidence(k * b)}$ €.`
        sortie.canEnonce = `Si $${a}$ cahiers coûtent $\\Prix[0]{${b}}$,`
        sortie.canReponseACompleter = `alors $${b}$ cahiers coûtent $\\ldots$ \\Prix[0]{}.`
        sortie.uniteInteractif = '€'
        break
    }
    return sortie
  }

  /**
   * Méthode pour déterminer une longueur en unité de longueur donnée
   * @returns {object}
   * @author Sébastien LOZANO
   */
  determinerUnNombreDUnitesDeLongueur () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a, b, A, B, C, D, E, G, H, s1, s2, s3, s4, s5, xmin, ymin, xmax, ymax, objets
    const choix = choice(['a', 'b', 'c'])//, 'b', 'd', 'e'
    sortie.texte = 'Quelle est la longueur de la ligne en pointillé ? <br>'
    if (choix === 'a') {
      a = grille(-2, 0, 7, 4, 'gray', 1, 1)
      b = choice([3, 4, 5, 6])
      A = point(0, 2, 'A', 'below')
      B = point(1, 2, 'B', 'below')
      C = point(1, 1, 'C', 'above')
      G = point(0, 4, 'C', 'above')
      H = point(b, 4, 'D', 'above')
      s1 = segmentAvecExtremites(G, H)
      s1.epaisseur = 2
      s2 = segment(A, B)
      s2.pointilles = 2
      s2.epaisseur = 2

      s3 = segment(B, C)
      s3.pointilles = 2
      s3.epaisseur = 2
      xmin = -1
      ymin = -0.2
      xmax = 7
      ymax = 5
      objets = []
      objets.push(
        texteParPosition('1 u.l.', milieu(G, H).x, milieu(G, H).y + 0.7, 'milieu', 'black', context.isHtml ? 1 : 0.7),
        a, s1, s2, s3)
      sortie.reponse = new FractionX(2, b)
      sortie.texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets) + '<br>'
      sortie.texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne en pointillé mesure $2$ carreaux, soit $\\dfrac{${miseEnEvidence(2)}}{${miseEnEvidence(b)}}$ u.l. `
    }
    if (choix === 'b') {
      a = grille(-2, 0, 7, 4, 'gray', 1, 1)
      b = choice([2, 4, 5, 6])
      A = point(0, 2, 'A', 'below')
      B = point(1, 2, 'B', 'below')
      C = point(1, 1, 'C', 'above')
      D = point(2, 1, 'C', 'above')
      G = point(0, 4, 'C', 'above')
      H = point(b, 4, 'D', 'above')
      s1 = segmentAvecExtremites(G, H)
      s1.epaisseur = 2
      s2 = segment(A, B)
      s2.pointilles = 2
      s2.epaisseur = 2

      s3 = segment(B, C)
      s3.pointilles = 2
      s3.epaisseur = 2
      s4 = segment(D, C)
      s4.pointilles = 2
      s4.epaisseur = 2
      xmin = -1
      ymin = -0.2
      xmax = 7
      ymax = 5
      objets = []
      objets.push(
        texteParPosition('1 u.l.', milieu(G, H).x, milieu(G, H).y + 0.7, 'milieu', 'black', context.isHtml ? 1 : 0.7),
        a, s1, s2, s3, s4)
      sortie.reponse = new FractionX(3, b)
      sortie.texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets) + '<br>'
      sortie.texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne en pointillé mesure $3$ carreaux, soit $\\dfrac{${miseEnEvidence(3)}}{${miseEnEvidence(b)}}$ u.l. `
    }
    if (choix === 'c') {
      a = grille(-2, 0, 7, 4, 'gray', 1, 1)
      b = choice([3, 5, 6])
      A = point(0, 2, 'A', 'below')
      B = point(1, 2, 'B', 'below')
      C = point(1, 1, 'C', 'above')
      D = point(2, 1, 'C', 'above')
      E = point(2, 2, 'C', 'above')
      G = point(0, 4, 'C', 'above')
      H = point(b, 4, 'D', 'above')
      s1 = segmentAvecExtremites(G, H)
      s1.epaisseur = 2
      s2 = segment(A, B)
      s2.pointilles = 2
      s2.epaisseur = 2

      s3 = segment(B, C)
      s3.pointilles = 2
      s3.epaisseur = 2
      s4 = segment(D, C)
      s4.pointilles = 2
      s4.epaisseur = 2
      s5 = segment(D, E)
      s5.pointilles = 2
      s5.epaisseur = 2
      xmin = -1
      ymin = -0.2
      xmax = 7
      ymax = 5
      objets = []
      objets.push(
        texteParPosition('1 u.l.', milieu(G, H).x, milieu(G, H).y + 0.7, 'milieu', 'black', context.isHtml ? 1 : 0.7),
        a, s1, s2, s3, s4, s5)
      sortie.reponse = new FractionX(4, b)
      sortie.texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 20, mainlevee: false, amplitude: 0.5, scale: 0.5, style: 'margin: auto' }, objets) + '<br>'
      sortie.texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne en pointillé mesure $4$ carreaux, soit $\\dfrac{${miseEnEvidence(4)}}{${miseEnEvidence(b)}}$ u.l. `
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '$\\ldots$ u.l.'
    return sortie
  }

  /**
   * Méthode pour multiplier par 5
   * @returns {object}
   * @author Sébastien LOZANO
   */
  multiplierParCinq () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = randint(11, 99, [20, 30, 40, 50, 60, 70, 80, 90])
    const b = 5 // randint(2, 7) * 100

    sortie.reponse = a * b
    sortie.texte = ` $${a}\\times ${b}=$`
    sortie.texteCorr = `$${a}\\times ${b}=${a}\\times 10 \\div 2=${a * 10}\\div 2=${miseEnEvidence(texNombre(sortie.reponse))}$`
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `$${a}\\times ${b} =\\ldots$`
    return sortie
  }

  /**
   * Méthode pour choisir une vitesse commune
   * @returns {object}
   * @author Sébastien LOZANO
   */
  vitesseCommune () {
    const sortie = {
      diviseurDeLHeure: 0,
      vitesse: 0,
      nombreDeMinutes: 0
    }
    sortie.diviseurDeLHeure = choice([2, 4]) // diviseur de l'heure
    if (sortie.diviseurDeLHeure === 4) {
      sortie.vitesse = choice([40, 80, 100])
      sortie.nombreDeMinutes = choice([15, 45])
    } else {
      sortie.vitesse = choice([30, 60, 90, 120])
      sortie.nombreDeMinutes = 30
    }
    return sortie
  }

  /**
   * Méthode pour proportionnalité et vitesse
   * @param {string} type premiere ou seconde question
   * @param {object} vitesseCommune éléments communs à deux questions liées
   * @returns {object}
   * @author Sébastien LOZANO
   */
  proportionnaliteEtVitesse (type, vitesseCommune) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    switch (type) {
      case 'premiere':
        sortie.reponse = vitesseCommune.vitesse / vitesseCommune.diviseurDeLHeure
        sortie.texte = `Une voiture roule à $${vitesseCommune.vitesse}$ km/h. <br>Combien de kilomètres parcourt-elle en $${vitesseCommune.nombreDeMinutes}$ min à cette vitesse ?`
        sortie.texteCorr = `En $1$ h la voiture parcourt $${vitesseCommune.vitesse}$ km.<br>
        En $${vitesseCommune.nombreDeMinutes}$ minutes, elle parcourt $${vitesseCommune.diviseurDeLHeure}$ fois moins de km qu'en $1$ heure, soit $\\dfrac{${vitesseCommune.vitesse}}{${vitesseCommune.diviseurDeLHeure}}=
        ${miseEnEvidence(texNombre(vitesseCommune.vitesse / vitesseCommune.diviseurDeLHeure, 2))}$ km.`
        sortie.canReponseACompleter = `Elle parcourt $\\ldots$ \\Lg[km]{} en $${vitesseCommune.nombreDeMinutes}$ min à cette vitesse.`
        break
      case 'seconde':{
        const d = randint(1, 3)
        sortie.reponse = d * vitesseCommune.vitesse + (vitesseCommune.nombreDeMinutes / 60) * vitesseCommune.vitesse
        sortie.texte = `Une voiture roule à  $${vitesseCommune.vitesse}$ km/h.<br> Combien de kilomètres parcourt-elle en $${d}$ h et $${vitesseCommune.nombreDeMinutes}$ min à cette vitesse ?`
        sortie.texteCorr = `En $${d}$ h, elle parcourt $${d * vitesseCommune.vitesse}$ km.<br>
        En $${vitesseCommune.nombreDeMinutes}$ min, elle parcourt $${texNombre((vitesseCommune.nombreDeMinutes / 60) * vitesseCommune.vitesse, 2)}$ km.<br>
        Ainsi, en en $${d}$ h et $${vitesseCommune.nombreDeMinutes}$ min, elle parcourt donc $${miseEnEvidence(texNombre(sortie.reponse, 0))}$ km.`
        sortie.canReponseACompleter = `Elle parcourt $\\ldots$ \\Lg[km]{} en $${d}$ h et $${vitesseCommune.nombreDeMinutes}$ min à cette vitesse.`
      }
        break
    }
    sortie.canEnonce = `Une voiture roule à $${vitesseCommune.vitesse}$ \\Vitesse{}.`
    return sortie
  }

  /**
   * Méthode pour travailler la question clef de la division
   * @returns {object}
   * @author Sébastien LOZANO
   */
  dansNCombienDeFoisP () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = randint(3, 9)
    const b = randint(3, 9)
    const c = a * b

    sortie.reponse = b
    sortie.texte = `Dans $${c}$ combien de fois $${a}$ ?`
    sortie.texteCorr = `Dans $${c}$, il y a $${miseEnEvidence(b)}$ fois $${a}$ car $${b}\\times ${a}=${c}$.`
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour décomposer un nombre à 3 chiffres en ... dizaines et ... unités
   * @returns {object}
   * @author Sébastien LOZANO
   */
  determinerUnNombreDeDizainesDansUnEntierATroisChiffres () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const nombreDeDizaines = randint(1, 9)
    const nombreDeCentaines = randint(1, 9)
    const nombre = 100 * nombreDeCentaines + 10 * nombreDeDizaines
    const accordDizaine = nombreDeDizaines === 1 ? 'dizaine' : 'dizaines'
    const accordCentaine = nombreDeCentaines === 1 ? 'centaine' : 'centaines'
    sortie.reponse = nombreDeDizaines
    sortie.texte = `Complète : ${sp(3)}
    $${texNombre(nombreDeCentaines, 0)} \\text{ ${accordCentaine} et } \\ldots \\text{ ${accordDizaine} font } ${nombre}$ `
    sortie.texteCorr = `$${texNombre(nombre, 0)} = ${texNombre(nombreDeCentaines, 0)} \\text{ centaines et } ${miseEnEvidence(texNombre(nombreDeDizaines, 0))} \\text{ dizaines }$`
    sortie.canEnonce = 'Complète.'
    sortie.canReponseACompleter = `$${texNombre(nombreDeCentaines, 0)}\\text{ ${accordCentaine} et} \\dots\\text{ ${accordDizaine}}$\\\\ $\\text{font } ${nombre}$`
    return sortie
  }

  /**
   * Méthode pour tracer une figure d'aire donnée en fonction d'une unité d'aire
   * @param {string} niveau Pour pouvoir être utilisé en 6e et en cm2
   * @returns {object}
   * @author Sébastien LOZANO
   */
  tracerUneFigureAireDonneeEnFonctionUniteAire (niveau) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let f, prenom1, a, A, B, C
    let nombreDUnitesDAire
    const choix = choice([true, false])
    switch (niveau) {
      case 'cm2':
        f = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1]]
        a = randint(0, 7)
        // b = randint(2, 4)
        nombreDUnitesDAire = f[a][0]
        break
      case '6e':
        if (choix) {
          f = [[3, 5], [6, 5], [7, 5], [8, 5], [3, 2], [5, 2], [9, 5], [7, 2]]
          a = randint(0, 7)
          // b = randint(2, 4)
        } else {
          f = [[5, 4], [7, 4], [3, 2], [5, 2], [7, 2], [3, 4], [9, 4]]
          a = randint(0, 6)
          // b = randint(2, 4)
        }
        nombreDUnitesDAire = `$\\dfrac{${f[a][0]}}{${f[a][1]}}$`
        break
    }
    if (choix) {
      prenom1 = prenomF()
      A = polygone([point(1, 5), point(11, 5), point(11, 4), point(1, 4)], 'black')
      A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
      B = texteParPosition('1 uA', 6, 4.5, 'milieu', 'black', 1, 'middle', false)
      C = grille(0, 0, 12, 5, 'black', 1, 1, false)
      // D = point(1 + a, 4 - b)

      sortie.texte = `${prenom1} veut construire une figure d'aire ${nombreDUnitesDAire} ${f[a][0] / f[a][1] >= 2 ? 'unités' : 'unité'} d'aire (uA).<br>  
      Combien de petits carreaux doit-elle contenir ?<br>`

      sortie.texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 5.5, scale: 1, style: 'margin: auto' }, C, A, B)
      sortie.texteCorr = '$1$ uA est représentée par $10$ petits carreaux. <br>'
      sortie.texteCorr += f[a][1] === 1 ? '' : `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésentée par $${texNombre(10 / f[a][1], 0)}$ petits carreaux. <br>`
      sortie.texteCorr += `Ainsi, une figure de ${nombreDUnitesDAire} ${f[a][0] / f[a][1] >= 2 ? 'unités' : 'unité'} d'aire se représente par une figure de $${miseEnEvidence(texNombre(10 / f[a][1] * f[a][0], 0))}$ petits carreaux.`
      sortie.reponse = 10 / f[a][1] * f[a][0]
    } else {
      prenom1 = prenomF()
      A = polygone([point(1, 5), point(3, 5), point(3, 3), point(1, 3)], 'black')
      A.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
      B = texteParPosition('1 uA', 2, 5.4, 'milieu', 'black', 1, 'middle', false)
      C = grille(0, 0, 12, 5, 'black', 1, 1, false)

      sortie.texte = `${prenom1} veut construire une figure d'aire ${nombreDUnitesDAire} ${f[a][0] / f[a][1] >= 2 ? 'unités' : 'unité'} d'aire (uA).<br>
    
      Combien de petits carreaux doit-elle contenir ?<br>

    `
      sortie.texte += mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 6, scale: 1, style: 'margin: auto' }, A, C, B)
      if (f[a][1] === 4) {
        sortie.texteCorr = '$1$ uA est représentée par  $4$ petits carreaux. <br>'
        sortie.texteCorr += f[a][1] === 1 ? '' : `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésenté par un petit carreau.<br>`
        sortie.texteCorr += `Ainsi, une figure de ${nombreDUnitesDAire} ${f[a][0] / f[a][1] >= 2 ? 'unités' : 'unité'} d'aire se représente par une figure de  `
        sortie.texteCorr += f[a][1] === 1 ? `$${miseEnEvidence(4 * f[a][0])}$` : `$${miseEnEvidence(f[a][0])}$`
        sortie.texteCorr += ' petits carreaux.'
        sortie.reponse = f[a][1] === 1 ? 4 * f[a][0] : f[a][0]
      } else {
        sortie.texteCorr = '$1$ uA est représentée par $4$ petits carreaux. <br>'
        sortie.texteCorr += f[a][1] === 1 ? '' : `$\\dfrac{1}{${f[a][1]}}$ d'unité d'aire est donc rerésenté par deux petits carreaux.<br>`
        sortie.texteCorr += `Ainsi, une figure de ${nombreDUnitesDAire} ${f[a][0] / f[a][1] >= 2 ? 'unités' : 'unité'} d'aire se représente par une figure de `
        sortie.texteCorr += f[a][1] === 1 ? `$${miseEnEvidence(4 * f[a][0])}$` : `$${miseEnEvidence(2 * f[a][0])}$`
        sortie.texteCorr += ' petits carreaux.'
        sortie.reponse = f[a][1] === 1 ? 4 * f[a][0] : 2 * f[a][0]
      }
    }
    sortie.canEnonce = `${prenom1} veut construire une figure d'aire \\\\ ${nombreDUnitesDAire} ${f[a][0] / f[a][1] > 2 ? 'unités' : 'unité'} d'aire (uA).<br>` + mathalea2d({ xmin: -1, ymin: -0.1, xmax: 12.1, ymax: 6, scale: 0.3 }, A, C, B)
    sortie.canReponseACompleter = 'La figure doit contenir $\\ldots$ petits carreaux.'
    return sortie
  }

  /**
   * Méthode pour déterminer le nombre de dixièmes dans un décimal
   * @returns {object}
   * @author Sébastien LOZANO
   */
  nombreDeDixiemesDansUnDecimal () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: '',
      nombre: ''
    }
    const unites = new Decimal(randint(1, 9))
    const dixiemes = new Decimal(randint(1, 9)).div(10)
    const centiemes = new Decimal(randint(1, 9)).div(100)
    sortie.nombre = new Decimal(unites.add(dixiemes).add(centiemes))
    sortie.reponse = new Decimal(unites.mul(10).add(dixiemes.mul(10)))
    sortie.texte = `Combien de dixièmes y a-t-il en tout dans $${texNombre(sortie.nombre, 2)}$ ?`
    sortie.texteCorr = `$${texNombre(sortie.nombre, 2)} = ${texNombre(unites, 0)} \\text{ ${unites.toNumber() === 1 ? 'unité' : 'unités'} } ${texNombre(dixiemes.mul(10), 0)} \\text{ ${dixiemes.mul(10).toNumber() === 1 ? 'dixième' : 'dixièmes'} } ${texNombre(centiemes.mul(100), 0)} \\text{ ${centiemes.mul(100).toNumber() === 1 ? 'centième' : 'centièmes'} }$.<br>`
    sortie.texteCorr += `Or $1$ unité = $10$ dixièmes donc $${texNombre(unites, 0)} \\text{ ${unites.toNumber() === 1 ? 'unité' : 'unités'}} = ${texNombre(unites.mul(10), 0)} \\text{ dixèmes }$.<br>`
    sortie.texteCorr += `Finalement $${texNombre(sortie.nombre, 2)} = ${texNombre(unites.mul(10).add(dixiemes.mul(10)), 0)} \\text{ dixièmes } ${texNombre(centiemes.mul(100), 0)} \\text{ ${centiemes.mul(100).toNumber() === 1 ? 'centième' : 'centièmes'} }$.<br>`
    sortie.texteCorr += `Il y a donc $${miseEnEvidence(texNombre(sortie.reponse))} \\text{ dixièmes }$ en tout dans $${texNombre(sortie.nombre, 2)}$.`
    sortie.canEnonce = `Combien de dixièmes y a-t-il en tout \\\\ dans $${texNombre(sortie.nombre, 2)}$ ?`
    sortie.canReponseACompleter = '\\dots{} dixièmes'
    return sortie
  }

  /**
   * Méthode pour déterminer le prix d'un diviseur d'une quantité donnée
   * @param {string} type pour le type d'énoncé
   * @returns {object}
   * @author Sébastien LOZANO
   */
  proportionnaliteEtDiviseur (type) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a, prix, k
    switch (type) {
      case 'stylos':
        a = randint(2, 6)
        prix = new Decimal(2 + randint(1, 3) / 10).add(0.05)
        k = randint(2, 4)
        sortie.reponse = new Decimal(prix).mul(100 * k)
        sortie.texte = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €. <br>
Combien coûtent $${k * a}$ de ces mêmes stylos ?`
        sortie.texteCorr = `$${a}$ stylos identiques coûtent  $${texPrix(prix)}$ €, donc $${k * a}$ de ces mêmes stylos coûtent  $${k}$ fois plus, soit $${k}\\times ${texPrix(prix)}=${texNombre(k * prix)}$ € $=${miseEnEvidence(texNombre(k * prix * 100))}$ centimes.`
        break
      case 'cahiers':
        prix = choice([new Decimal('1.20'), new Decimal('1.80'), new Decimal('2.40')])
        k = randint(3, 4)
        sortie.reponse = new Decimal(prix).div(k).mul(100)
        sortie.texte = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €. <br>
Combien coûtent $2$ cahiers ?`
        sortie.texteCorr = `$${k * 2}$ cahiers coûtent  $${texPrix(prix)}$ €, donc $2$ de ces mêmes cahiers coûtent  $${k}$ fois moins, soit $ ${texPrix(prix)}\\div${k}=${texPrix(prix / k)}$ € $=${miseEnEvidence(texNombre(100 * prix / k, 0))}$ centimes.`
        break
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '$\\ldots$ centimes'
    return sortie
  }

  /**
   * Méthode pour trouver une dimension agrandie ou réduite
   * @param {string} type pour le type d'énoncé
   * @returns {object}
   * @author Sébastien LOZANO
   */
  trouverUneDimensionAgrandieOuReduite (type) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let l, k, L, l2, A, B, C, D, E, F, G, H, xmin, ymin, xmax, ymax, pol, pol2, objets
    switch (type) {
      case 'agrandissement':
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
        sortie.reponse = l2 * k
        sortie.texte = `Le rectangle B est un agrandissement du rectangle A.${context.isHtml ? '' : '\\\\'} Quelle est la longueur du rectangle B ?<br>`
        sortie.texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        sortie.texteCorr = `La longueur du rectangle A est $${k}$ fois plus grande que sa largeur. On en déduit que la longueur du rectangle B est aussi $${k}$ fois plus grande que sa largeur.<br>
Elle est donc égale à $${l2}\\times ${k}=${miseEnEvidence(sortie.reponse)}$ cm.`
        break
      case 'reduction':
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
        sortie.reponse = new Decimal(l).div(2)
        sortie.texte = `Le rectangle B est une réduction du rectangle A.${context.isHtml ? '' : '\\\\'} Quelle est la largeur du rectangle B ?<br>`
        sortie.texte += mathalea2d({ xmin, ymin, xmax, ymax, pixelsParCm: 40, mainlevee: false, amplitude: 0.5, scale: 0.7, style: 'margin: auto' }, objets)
        sortie.texteCorr = `La longueur du rectangle A est $2$ fois plus grande que la longeur du rectangle B. On en déduit que la largeur  du rectangle B est aussi $2$ fois plus petite que la largeur du rectangle A.<br>
Elle est donc égale à $${l}\\div 2=${miseEnEvidence(texNombre(sortie.reponse, 1))}$ cm.
                        `
        break
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '$\\ldots$ \\Lg[cm]{}'
    return sortie
  }

  /**
   * Méthode pour ajouter deux décimaux
   * @returns {object}
   * @author Sébastien LOZANO
   */
  ajouterDeuxDecimaux () {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    const a = new Decimal(randint(101, 199)).div(100)
    const b = new Decimal(randint(4, 9)).div(10)

    sortie.reponse = new Decimal(a).add(b)
    sortie.texte = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}$`
    sortie.texteCorr = `$${texNombre(a, 2)}+ ${texNombre(b, 1)}=${miseEnEvidence(texNombre(sortie.reponse))}$`
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = ''
    return sortie
  }

  /**
   * Méthode pour déterminer un nombre de combinaisons différentes
   * @param {string} type type entrée/plat, entrée/plat/dessert
   * @returns {object}
   * @author Sébastien LOZANO
   */
  nombreDeCombinaisons (type) {
    const sortie = {
      texte: '',
      texteCorr: '',
      reponse: 0,
      canEnonce: '',
      canReponseACompleter: ''
    }
    let a, b, c
    switch (type) {
      case 'entreePlatDessert':
        a = randint(2, 3)
        b = randint(2, 3)
        c = randint(2, 3)
        sortie.texte = `À la cantine, il y a toujours $${a}$ entrées différentes, $${b}$ plats différents et $${c}$ desserts différents.<br>
Combien de menus (composés d'une entrée, d'un plat et d'un dessert) différents peut-on avoir dans cette cantine ?`
        sortie.texteCorr = `On peut avoir : $${a}\\times ${b}\\times ${c} =${miseEnEvidence(a * b * c)}$ menus différents.`
        sortie.reponse = a * b * c
        break
      case 'platDessert':
        a = randint(2, 5)
        b = randint(2, 5)
        sortie.texte = `En prenant un plat au choix parmi $${a}$ plats et un dessert au choix parmi $${b}$ desserts.<br>
Combien de repas différents peut-on réaliser ?  `
        sortie.texteCorr = `On peut avoir : $${a}\\times ${b}=${miseEnEvidence(a * b)}$ repas différents.`
        sortie.reponse = a * b
        break
    }
    sortie.canEnonce = sortie.texte
    sortie.canReponseACompleter = '$\\ldots$ repas'
    return sortie
  }
}
