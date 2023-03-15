import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { listeQuestionsToContenu, combinaisonListes, choice, randint, quotientier, rangeMinMax, nombreDeChiffresDe, contraindreValeur, compteOccurences } from '../../modules/outils.js'
import FractionEtendue from '../../modules/FractionEtendue.js'

import { fractionCliquable } from '../../modules/2dinteractif.js'
import { context } from '../../modules/context.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Effectuer des calculs simples avec des fractions'
export const dateDePublication = '20/11/21'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '07/03/2023' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculs avec des fractions que l'on peut faire à partir de schémas
 * @author Rémi Angot (Modifié par EE : rajout d'un paramètre)
 * Référence 6N22
*/
export const uuid = 'c75b6'
export const ref = '6N22'
export default function FractionsCalculsSimples () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = 'Calculer.'
  this.sup = true
  this.sup2 = 5
  this.nbQuestions = 6 // Nombre de questions par défaut
  this.nbCols = 2 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 4 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url
  this.correctionDetaillee = true
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function (numeroExercice) {
    if (this.correctionDetaillee) this.nbColsCorr = 1
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    if (this.sup) {
      this.consigne = 'Calculer en s\'aidant éventuellement du schéma.'
    } else {
      this.consigne = 'Calculer.'
    }

    let typeQuestionsDisponibles = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      typeQuestionsDisponibles = rangeMinMax(1, 4)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        typeQuestionsDisponibles[0] = contraindreValeur(1, 5, this.sup, 5)
      } else {
        typeQuestionsDisponibles = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < typeQuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          typeQuestionsDisponibles[i] = contraindreValeur(1, 5, parseInt(typeQuestionsDisponibles[i]), 5) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(typeQuestionsDisponibles, 5) > 0) typeQuestionsDisponibles = rangeMinMax(1, 4) // Teste si l'utilisateur a choisi tout

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, reponseAMC, texte, texteCorr, schema, schemaCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      let c, n, f1, f2, f3
      const b = choice([2, 3, 4, 5])
      const a = randint(1, b - 1)
      const xmax = 19.2
      let scale
      context.isHtml ? scale = 0.5 : scale = 0.4
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 1 : // 'a/b+c/b':
          c = randint(1, b + 4, [b, 2 * b, 3 * b, 4 * b])
          f1 = new FractionEtendue(a, b)
          f2 = new FractionEtendue(c, b)
          f3 = new FractionEtendue(a + c, b)
          texte = `$${f1.texFraction} + ${f2.texFraction}$`
          texteCorr = `$${f1.texFraction} + ${f2.texFraction} = ${f3.texFraction} ${(f3.estEntiere) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schema = fractionCliquable(0, 0, 4, b)
          if (this.sup) texte += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          schemaCorr = fractionCliquable(0, 0, quotientier(a + c, b) + 1, b, { cliquable: false, liste1: rangeMinMax(1, a), liste2: rangeMinMax(a + 1, a + c) })
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          reponseAMC = new FractionEtendue(a + c, b)
          break
        case 2 : // 'n+a/b':
          n = randint(1, 3)
          f1 = new FractionEtendue(a, b)
          f2 = new FractionEtendue(n * b, b)
          f3 = new FractionEtendue(n * b + a, b)
          texte = `$${n} + ${f1.texFraction}$`
          texteCorr = `$${n} + ${f1.texFraction} = ${f2.texFraction} + ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schema = fractionCliquable(0, 0, 4, b)
          schemaCorr = fractionCliquable(0, 0, quotientier(n * b + a, b) + 1, b, { cliquable: false, liste1: rangeMinMax(1, n * b), liste2: rangeMinMax(n * b + 1, n * b + a) })
          if (this.sup) texte += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          reponseAMC = new FractionEtendue(n * b + a, b)
          break
        case 4 : // 'n*a/b':
          n = randint(2, 5, b)
          f1 = new FractionEtendue(a, b)
          f3 = new FractionEtendue(n * a, b)
          texte = `$${n} \\times ${f1.texFraction}$`
          texteCorr = `$${n} \\times ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere) ? `=${f3.texFractionSimplifiee}` : ''}$`
          texteCorr += '<br>'
          if (this.correctionDetaillee) {
            // Liste pour alterner les couleurs
            const liste1 = []
            const liste2 = []
            for (let k = 0; k < n; k++) {
              if (k % 2 === 0) liste1.push(...rangeMinMax(k * a + 1, (k + 1) * a))
              else liste2.push(...rangeMinMax(k * a + 1, (k + 1) * a))
            }
            schemaCorr = fractionCliquable(0, 0, quotientier(n * a, b) + 1, b, { cliquable: false, liste1, liste2 })
            texteCorr += mathalea2d({ scale, xmin: -0.2, xmax: (quotientier(n * a, b) + 1) * 5, ymin: -1, ymax: 2, style: 'display: inline' }, schemaCorr)
          }
          schema = fractionCliquable(0, 0, 4, b)
          if (this.sup) texte += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2, style: 'display: inline' }, schema)
          reponseAMC = new FractionEtendue(n * a, b)
          break
        case 3 : // 'n-a/b':
          n = randint(1, 3)
          f1 = new FractionEtendue(a, b)
          f2 = new FractionEtendue(n * b, b)
          f3 = new FractionEtendue(n * b - a, b)
          texte = `$${n} - ${f1.texFraction}$`
          texteCorr = `$${n} - ${f1.texFraction} = ${f2.texFraction} - ${f1.texFraction} = ${f3.texFraction} ${(f3.estEntiere) ? `=${f3.texFractionSimplifiee}` : ''}$`
          schemaCorr = fractionCliquable(0, 0, quotientier(n * b + a, b) + 1, b, { cliquable: false, liste2: rangeMinMax(1, n * b), hachures1: true, liste1: rangeMinMax(n * b - a + 1, n * b), couleur2: context.isHtml ? '#f15929' : 'gray' })
          schema = fractionCliquable(0, 0, 4, b)
          if (this.correctionDetaillee) texteCorr += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schemaCorr)
          if (this.sup) texte += '<br>' + mathalea2d({ scale, xmin: -0.2, xmax, ymin: -1, ymax: 2 }, schema)
          reponseAMC = new FractionEtendue(n * b - a, b)
          break
      }
      setReponse(this, i, reponseAMC, { formatInteractif: 'fractionEgale' })
      texte += ajouteChampTexteMathLive(this, i)
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte, // Si vide, l'énoncé est celui de l'exercice.
          propositions: [
            {
              texte: texteCorr
            }
          ],
          reponse: {
            texte: 'le texte affiché au dessus du formulaire numerique dans AMC', // facultatif
            valeur: [reponseAMC], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              digits: 3, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
              signe: false, // (présence d'une case + ou - pour AMC)
              digitsNum: nombreDeChiffresDe(reponseAMC.num) + randint(0, 1), // Facultatif. digitsNum correspond au nombre TOTAL de chiffres du numérateur à coder si la réponse est une fraction.
              digitsDen: nombreDeChiffresDe(reponseAMC.den) + randint(0, 1) // Facultatif. digitsDencorrespond au nombre TOTAL de chiffres du dénominateur à coder si la réponse est une fraction.
            }
          }
        }
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, b, listeTypeQuestions[i])) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  this.besoinFormulaireCaseACocher = ['Avec un schéma interactif']
  this.besoinFormulaire2Texte = ['Type d\'opérations', 'Nombres séparés par des tirets\n1 : Additions entre deux fractions de même dénominateur\n2 : Additions entre un entier et une fraction\n3 : Soustractions entre un entier et une fraction\n4 : Multiplications entre un entier et une fraction\n5 : Mélange']
}
