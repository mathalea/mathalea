import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, combinaisonListes, prenom, texteEnCouleur } from '../../modules/outils.js'
export const titre = 'Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue'

/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue
 * * 4L13-1
 * @author Sébastien Lozano
 */
export const uuid = '8b18b'
export const ref = '4L13-1'
export default function FormeLitteraleIntroduireUneLettre () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.debug = false
  this.sup = 1
  if (this.debug) {
    this.nbQuestions = 3
  } else {
    this.nbQuestions = 2
  };

  this.titre = titre
  this.consigne = "Exprimer le prix total de l'achat, en fonction des lettres introduites dans l'énoncé."

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  // context.isHtml? this.spacing = 3 : this.spacing = 2;
  // context.isHtml? this.spacingCorr = 3 : this.spacingCorr = 2;

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.debug) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour gérer le pluriel
      function pluriel (n, obj) {
        if (n > 1) {
          return obj.plur
        } else {
          return obj.sing
        };
      };

      // une fonction pour gérer la chaine de sortie et supprimer le coeff 1 !
      function sliceUn (n) {
        if (n === 1) {
          return ''
        } else {
          return `${n}`
        };
      };

      // on definit un tableau de couples possibles
      const situations = [
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'crayon', plur: 'crayons' }, elt2: { lettre: 'g', article: 'une', sing: 'gomme', plur: 'gommes' } },
        { prenom: prenom(), elt1: { lettre: 'r', article: 'une', sing: 'règle', plur: 'règles' }, elt2: { lettre: 'e', article: 'une', sing: 'équerre', plur: 'équerres' } },
        { prenom: prenom(), elt1: { lettre: 'p', article: 'une', sing: 'poire', plur: 'poires' }, elt2: { lettre: 'b', article: 'une', sing: 'banane', plur: 'bananes' } },
        { prenom: prenom(), elt1: { lettre: 'c', article: 'un', sing: 'couteau', plur: 'couteaux' }, elt2: { lettre: 'f', article: 'une', sing: 'fourchette', plur: 'fourchettes' } },
        { prenom: prenom(), elt1: { lettre: 'm', article: 'un', sing: 'marteau', plur: 'marteaux' }, elt2: { lettre: 'e', article: 'une', sing: 'enclume', plur: 'enclumes' } }
      ]
      const enonces = []
      const n = randint(1, 6)
      const p = randint(1, 6)
      const situation = situations[randint(0, situations.length - 1)]
      enonces.push({
        enonce: `${situation.prenom} veut acheter ${n} ${pluriel(n, situation.elt1)} et ${p} ${pluriel(p, situation.elt2)}.
<br>On note $${situation.elt1.lettre}$ le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${situation.elt2.lettre}$ le prix d'${situation.elt2.article} ${situation.elt2.sing}.`,
        question: '',
        correction: `
        ${situation.prenom} va payer $${n}$ fois le prix d'${situation.elt1.article} ${situation.elt1.sing} et $${p}$ fois le prix d'${situation.elt2.article} ${situation.elt2.sing}.
        <br> C'est-à-dire $${n}\\times ${situation.elt1.lettre} + ${p}\\times ${situation.elt2.lettre} = ${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.
        <br>${texteEnCouleur(`Donc le prix total de l'achat est  $${sliceUn(n)}${situation.elt1.lettre} + ${sliceUn(p)}${situation.elt2.lettre}$.`)}
        `
      })
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          if (this.debug) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
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
