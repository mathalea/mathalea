import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, combinaisonListesSansChangerOrdre, ecritureParentheseSiNegatif, fractionSimplifiee, prenomF, prenomM, miseEnEvidence, texteEnCouleur, texteGras, sp } from '../../modules/outils.js'
export const titre = 'Trouver l\'erreur dans une résolution d\'équation du premier degré'

/**
 * * Trouver l'erreur dans une equation
 * * 4L15-0
 * @author Sébastien Lozano
 */
export const uuid = 'df5a3'
export const ref = '4L15-0'
export default function TrouverErreurResolEqDeg1 () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = true
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 5
  } else {
    this.nbQuestions = 3
  };

  this.titre = titre
  this.consigne = "Trouver l'erreur dans les résolutions suivantes.<br>On ne demande pas de résoudre l'équation."
  // On ne peut pas aller à la ligne dans l'environnement exo de la sortie LaTeX
  if (!context.isHtml) {
    this.consigne = this.consigne.replace('<br>', '')
  }

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typeDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      // typeDeQuestionsDisponibles = [1, 2, 3, 4, 5]
      typeDeQuestionsDisponibles = [1]
    } else {
      typeDeQuestionsDisponibles = shuffle([choice([1, 3]), choice([2, 4]), 5])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // typesDeQuestionsDisponibles=[1];

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typeDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // on choisit un nom pour l'inconnue
      const variables = ['x', 't', 'u', 'v', 'w', 'y', 'z']
      const inc = variables[randint(0, variables.length - 1)]

      // on choisit les paramètres
      const a = randint(-9, 9, [-1, 0, 1])
      const b = randint(-9, 9, [-1, 0, 1])
      const c = randint(-9, 9, [-1, 0, 1, a, -a])
      const d = randint(-9, 9, [-1, 0, 1])

      // une fonction pour gérer le signe
      function signeDansEq (nb) {
        if (nb > 0) {
          return { signe: '+', operation: '\\textbf{soustraire}', chgt_signe: nb }
        } else {
          return { signe: '', operation: '\\textbf{ajouter}', chgt_signe: nb * (-1) }
        };
      };

      // une fonction pour gérer le genre du prénom et le pronom associé
      function genreEtPrenom () {
        const n = randint(0, 1)
        if (n === 0) {
          return { prenom: prenomM(), pronom: 'il' }
        } else {
          return { prenom: prenomF(), pronom: 'elle' }
        };
      };

      // deux fonctionx pour conditionner la simplification d'une fraction
      function isSimp (n, d) {
        if (fractionSimplifiee(n, d)[0] !== n) {
          return true
        } else {
          return false
        };
      };

      function simpFrac (n, d) {
        if (isSimp(n, d)) {
          if (fractionSimplifiee(n, d)[1] === 1) {
            return `$= ${fractionSimplifiee(n, d)[0]}$`
          } else if (fractionSimplifiee(n, d)[0] === 0) {
            return '$ = 0'
          } else {
            return `$= \\dfrac{${fractionSimplifiee(n, d)[0]}}{${fractionSimplifiee(n, d)[1]}}$`
          };
        } else {
          if (fractionSimplifiee(n, d)[1] === 1) {
            return `$= ${fractionSimplifiee(n, d)[0]}$`
          } else if (fractionSimplifiee(n, d)[0] === 0) {
            return '$ = 0$'
          } else {
            return ' '
          };
        }
      };

      const currentGenreEtPrenom = genreEtPrenom()

      // pour les situations
      const situations = [
        { // case 1 --> ax+b=d+cx  erreur à l'étape 1 on passe cx de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a,
          b,
          c,
          d,
          inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          et1: `${texteGras('Étape 1 :')} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} ${signeDansEq(b).signe} ${b} = ${d} $`, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          et2: `${texteGras('Étape 2 :')} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b} $`,
          et3: `${texteGras('Étape 3 :')} $${a + c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b} $`,
          et4: `${texteGras('Étape 4 :')} $${inc} = \\dfrac{${d} ${signeDansEq(-b).signe} ${-b}}{${a + c}} $`,
          et_fin: `${texteGras('Étape 5 :')} $${inc} = \\dfrac{${d - b}}{${a + c}}$ ${simpFrac(d - b, a + c)}`,
          err: `L'erreur se situe à l'étape 1.
            <br>${currentGenreEtPrenom.prenom} «${sp(1)}a fait passer${sp(1)}» le terme $${signeDansEq(c).signe} ${c}${inc}$ «${sp(1)}de l'autre côté${sp(1)}»
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(c).operation} $${signeDansEq(c).chgt_signe}${inc}$ aux deux membres.            
            `,
          eq_corr: `${texteGras('Équation d\'origine : ')} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          eq_corr_et1: `${texteGras('Étape 1 : ')} $${miseEnEvidence(signeDansEq(c).operation)}$ $${miseEnEvidence(signeDansEq(c).chgt_signe)}$${texteEnCouleur(`$${inc}$`)} aux deux membres. 
          <br> $${a}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} 
          <br>${texteGras('Étape 2 : ')} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `${texteGras('Étape 3 :')} $${miseEnEvidence(signeDansEq(b).operation)}$ $${miseEnEvidence(signeDansEq(b).chgt_signe)}$ aux deux membres. 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)} = ${d} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)}$
          <br>${texteGras('Étape 4 : ')} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `${texteGras('Étape 5 :')} $${miseEnEvidence('\\textbf{diviser par}')}$ $${miseEnEvidence(a - c)}$ les deux membres.
          <br> $\\dfrac{${a - c}${inc}}{${miseEnEvidence(a - c)}} = \\dfrac{${d - b}}{${miseEnEvidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `
        },
        { // case 2 --> ax+b=d+cx  erreur à l'étape 2 on passe b de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a,
          b,
          c,
          d,
          inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          et1: `${texteGras('Étape 1 :')} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$`,
          et2: `${texteGras('Étape 2 :')} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`, // l'erreur est là on passe de l'autre côté
          et3: `${texteGras('Étape 3 :')} $${a - c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et4: `${texteGras('Étape 4 :')} $${inc} = \\dfrac{${d} ${signeDansEq(b).signe} ${b}}{${a - c}} $`,
          et_fin: `${texteGras('Étape 5 :')} $${inc} = \\dfrac{${d + b}}{${a - c}}$ ${simpFrac(d + b, a - c)}`,
          err: `L'erreur se situe à l'étape 2.
            <br>${currentGenreEtPrenom.prenom} «${sp(1)}a fait passer${sp(1)}» le terme $${signeDansEq(b).signe} ${b}$ «${sp(1)}de l'autre côté${sp(1)}»
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(b).operation} $${signeDansEq(b).chgt_signe}$ aux deux membres.            
            `,
          eq_corr: `${texteGras('Équation d\'origine : ')} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc}$`,
          eq_corr_et1: `${texteGras('Étape 1 :')} $${miseEnEvidence(signeDansEq(c).operation)}$ $${miseEnEvidence(signeDansEq(c).chgt_signe)}$${texteEnCouleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} $ ${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} 
          <br>${texteGras('Étape 2 : ')} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `${texteGras('Étape 3 :')} $${miseEnEvidence(signeDansEq(b).operation)}$ $${miseEnEvidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)} = ${d} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)}$
          <br>${texteGras('Étape 4 : ')} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `          ${texteGras('Étape 5 :')} $${miseEnEvidence('\\textbf{diviser par}')}$ $${miseEnEvidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${miseEnEvidence(a - c)}} = \\dfrac{${d - b}}{${miseEnEvidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `
        },
        { // case 3 --> ax+b=cx+d  erreur à l'étape 2 on passe cx de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a,
          b,
          c,
          d,
          inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texteGras('Étape 1 :')} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et2: `${texteGras('Étape 2 :')} $${a}${inc} ${signeDansEq(c).signe} ${c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`, // l'erreur est là on passe de l'autre côté
          et3: `${texteGras('Étape 3 :')} $${a + c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et4: `${texteGras('Étape 4 :')} $${inc} = \\dfrac{${d} ${signeDansEq(-b).signe} ${-b}}{${a + c}} $`,
          et_fin: `${texteGras('Étape 5 :')} $${inc} = \\dfrac{${d - b}}{${a + c}}$ ${simpFrac(d - b, a + c)}`,
          err: `            L'erreur se situe à l'étape 2.
            <br>${currentGenreEtPrenom.prenom} «${sp(1)}a fait passer${sp(1)}» le terme $${signeDansEq(c).signe} ${c}${inc}$ «${sp(1)}de l'autre côté${sp(1)}»
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(c).operation} $${signeDansEq(c).chgt_signe}${inc}$ aux deux membres.            
            `,
          eq_corr: `${texteGras('Équation d\'origine : ')} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `          ${texteGras('Étape 1 :')} $${miseEnEvidence(signeDansEq(c).operation)}$ $${miseEnEvidence(signeDansEq(c).chgt_signe)}$${texteEnCouleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)}
          <br>${texteGras('Étape 2 : ')} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `          ${texteGras('Étape 3 :')} $${miseEnEvidence(signeDansEq(b).operation)}$ $${miseEnEvidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)} = ${d} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)}$
          <br>${texteGras('Étape 4 : ')} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `          ${texteGras('Étape 5 :')} $${miseEnEvidence('\\textbf{diviser par}')}$ $${miseEnEvidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${miseEnEvidence(a - c)}} = \\dfrac{${d - b}}{${miseEnEvidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `
        },
        { // case 4 --> ax+b=cx+d  erreur à l'étape 1 on passe b de l'autre côté
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a,
          b,
          c,
          d,
          inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texteGras('Étape 1 :')} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(b).signe} ${b}$`, // l'erreur est là on passe de l'autre côté
          et2: `${texteGras('Étape 2 :')} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et3: `${texteGras('Étape 3 :')} $${a - c}${inc} = ${d} ${signeDansEq(b).signe} ${b}$`,
          et4: `${texteGras('Étape 4 :')} $${inc} = \\dfrac{${d} ${signeDansEq(b).signe} ${b}}{${a - c}} $`,
          et_fin: `${texteGras('Étape 5 :')} $${inc} = \\dfrac{${d + b}}{${a - c}}$ ${simpFrac(d + b, a - c)}`,
          err: `            L'erreur se situe à l'étape 1.
            <br>${currentGenreEtPrenom.prenom} «${sp(1)}a fait passer${sp(1)}» le terme $${signeDansEq(b).signe} ${b}$ «${sp(1)}de l'autre côté${sp(1)}»
            or pour obtenir une équation équivalente, il s'agit d'opérer de la même manière sur les deux membres de l'équation.
            <br>Ici il faut ${signeDansEq(b).operation} $${signeDansEq(b).chgt_signe}$ aux deux membres.            
            `,
          eq_corr: `${texteGras('Équation d\'origine : ')} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `          ${texteGras('Étape 1 :')} $${miseEnEvidence(signeDansEq(c).operation)}$ $${miseEnEvidence(signeDansEq(c).chgt_signe)}$${texteEnCouleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)}
          <br>${texteGras('Étape 2 : ')} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `          ${texteGras('Étape 3 :')} $${miseEnEvidence(signeDansEq(b).operation)}$ $${miseEnEvidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)} = ${d} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)}$
          <br>${texteGras('Étape 4 : ')} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `          ${texteGras('Étape 5 :')} $${miseEnEvidence('\\textbf{diviser par}')}$ $${miseEnEvidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${miseEnEvidence(a - c)}} = \\dfrac{${d - b}}{${miseEnEvidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `
        },
        { // case 5 --> ax+b=cx+d  erreur à l'étape 4 on soustrait au lieu de diviser
          pronom: currentGenreEtPrenom.pronom,
          prenom: currentGenreEtPrenom.prenom,
          a,
          b,
          c,
          d,
          inc,
          eq: `$${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          et1: `${texteGras('Étape 1 :')} $${a}${inc} = ${c}${inc} ${signeDansEq(d).signe} ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et2: `${texteGras('Étape 2 :')} $${a}${inc} ${signeDansEq(-c).signe} ${-c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et3: `${texteGras('Étape 3 :')} $${a - c}${inc} = ${d} ${signeDansEq(-b).signe} ${-b}$`,
          et4: `${texteGras('Étape 4 :')} $${inc} = ${d} ${signeDansEq(-b).signe} ${-b} - ${ecritureParentheseSiNegatif(a - c)} $`,
          et_fin: `${texteGras('Étape 5 :')} $${inc} = ${d - b - a + c}$`,
          err: `            L'erreur se situe à l'étape 4.
            <br>${currentGenreEtPrenom.prenom} soustrait le coefficient de ${inc} au lieu de diviser par ce coefficient.
            <br>Or $${a - c}${inc}$ représente la multiplication $${a - c}\\times ${inc}$, et l'opération inverse de la multiplication c'est la division et non la soustraction.
            <br>Ici il faut diviser les deux membres par $${a - c}$.            
            `,
          eq_corr: `${texteGras('Équation d\'origine : ')} $${a}${inc} ${signeDansEq(b).signe} ${b} = ${c}${inc} ${signeDansEq(d).signe} ${d} $`,
          eq_corr_et1: `          ${texteGras('Étape 1 :')} $${miseEnEvidence(signeDansEq(c).operation)}$ $${miseEnEvidence(signeDansEq(c).chgt_signe)}$${texteEnCouleur(`$${inc}$`)} aux deux membres 
          <br> $${a}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)} $${signeDansEq(b).signe} ${b} = ${d} ${signeDansEq(c).signe} ${c}${inc} ${miseEnEvidence(signeDansEq(-c).signe)} ${miseEnEvidence(-c)}$${texteEnCouleur(`$${inc}$`)}
          <br>${texteGras('Étape 2 : ')} On réduit.
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} = ${d}$
          `, // l'erreur est là, on passe de l'autre côté d'où l'oubli du chgt de signe
          eq_corr_et2: `          ${texteGras('Étape 3 :')} $${miseEnEvidence(signeDansEq(b).operation)}$ $${miseEnEvidence(signeDansEq(b).chgt_signe)}$ aux deux membres 
          <br> $${a - c}${inc} ${signeDansEq(b).signe} ${b} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)} = ${d} ${miseEnEvidence(signeDansEq(-b).signe)} ${miseEnEvidence(-b)}$
          <br>${texteGras('Étape 4 : ')} Réduction à nouveau.
          <br> $${a - c}${inc} = ${d - b}$
          `,
          eq_corr_et3: `          ${texteGras('Étape 5 :')} $${miseEnEvidence('\\textbf{diviser par}')}$ $${miseEnEvidence(a - c)}$ les deux membres
          <br> $\\dfrac{${a - c}${inc}}{${miseEnEvidence(a - c)}} = \\dfrac{${d - b}}{${miseEnEvidence(a - c)}}$
          <br>$${inc} = \\dfrac{${d - b}}{${a - c}}$ ${simpFrac(d - b, a - c)}
          `
        }

      ]

      const enonces = []
      for (let k = 0; k < 5; k++) {
        enonces.push({
          enonce: `          ${situations[k].prenom} doit résoudre l'équation suivante : ${situations[k].eq}.
          <br> Voilà ce qu'${situations[k].pronom} écrit :
          <br>${situations[k].et1}
          <br>${situations[k].et2}
          <br>${situations[k].et3}
          <br>${situations[k].et4}
          <br>${situations[k].et_fin}
        `,
          question: '',
          correction: `
        ${situations[k].err}
        <br>${texteGras('=== Voici une proposition de résolution détaillée : ===')}         
        <br>${situations[k].eq_corr}
        <br>${situations[k].eq_corr_et1}
        <br>${situations[k].eq_corr_et2}
        <br>${situations[k].eq_corr_et3}
        `
        })
      };

      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += `
             `
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 2:
          texte = `${enonces[1].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
        case 3:
          texte = `${enonces[2].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 4:
          texte = `${enonces[3].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
        case 5:
          texte = `${enonces[4].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[4].correction}`
          };
          break
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
}
