import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { arrondi } from '../../modules/outils/nombres.js'
import { calcul, texNombre } from '../../modules/outils/texNombres.js'
import { texTexte } from '../../modules/outils/texMiseEnForme.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = 'true'
export const amcType = 'AMCNum'

/**
 * Conversions de longueur en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * * 1 : De dam, hm, km vers m
 * * 2 : De dm, cm, mm vers m
 * * 3 : Conversions en mètres
 * * 4 : Toutes les conversions de longueurs
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 */
export default function ExerciceConversionsLongueurs (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l'exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.titre = 'Conversions de longueurs'
  this.consigne = 'Compléter : '
  this.spacing = 2

  this.nouvelleVersion = function () {
    const reponses = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const prefixeMulti = [
      [' da', 10],
      [' h', 100],
      [' k', 1000]
    ]
    const prefixeDiv = [
      [' d', 10],
      [' c', 100],
      [' m', 1000]
    ]
    const unite = 'm'
    const listeUnite = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    const listeUnite1 = combinaisonListes([0, 1, 2, 3, 4, 5, 6], this.nbQuestions)
    const listek = combinaisonListes([0, 1, 2], this.nbQuestions)
    const listeDeDecimaux = combinaisonListes(['entier', 'XX,X', '0,X', '0,0X', 'X,XX'], this.nbQuestions)
    for (let i = 0,
      a,
      k,
      div,
      resultat,
      texte,
      texteCorr,
      cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let typesDeQuestions
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 5) {
        typesDeQuestions = this.sup
      } else {
        typesDeQuestions = randint(1, 4)
      }
      // k = randint(0,2); // Choix du préfixe
      k = listek[i] // Plutôt que de prendre un préfix au hasard, on alterne entre 10,100 et 1000
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n'y aura pas de division
      } else if (typesDeQuestions === 2) {
        // niveau 2
        div = true // Avec des divisions
      } else {
        div = choice([true, false]) // Avec des multiplications ou des divisions
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        switch (listeDeDecimaux[i]) {
          case 'entier':
            a = randint(1, 99)
            break
          case 'XX,X':
            a = arrondi(randint(1, 19) + randint(1, 9) / 10, 1)
            break
          case '0,X':
            a = arrondi(randint(1, 9) / 10, 1)
            break
          case '0,0X':
            a = arrondi(randint(1, 9) / 100, 2)
            break
          case 'X,XX':
            a = arrondi(randint(1, 9) + randint(1, 9) / 10 + randint(1, 9) / 100, 2)
        }
        // entier ou
      } else {
        a = choice([
          randint(1, 9),
          randint(1, 9) * 10,
          randint(1, 9) * 100,
          randint(1, 9) * 10 + randint(1, 9)
        ])
        // X, X0, X00, XX
      }

      if (!div && typesDeQuestions < 4) {
        // Si il faut multiplier pour convertir
        resultat = calcul(a * prefixeMulti[k][1]).toString() // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        texte = `$${texNombre(a)} ${texTexte(prefixeMulti[k][0] + unite)} = `
        texte += (this.interactif && context.isHtml) ? `$${ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texteApres: '&nbsp;&nbsp;&nbsp; ' + unite })}` : `\\dotfill  ${texTexte(unite)}$`

        texteCorr =
          '$ ' +
          texNombre(a) +
          texTexte(prefixeMulti[k][0] + unite) +
          ' =  ' +
          texNombre(a) +
          '\\times' +
          texNombre(prefixeMulti[k][1]) +
          texTexte(unite) +
          ' = ' +
          texNombre(resultat) +
          texTexte(unite) +
          '$'
      } else if (div && typesDeQuestions < 4) {
        resultat = calcul(a / prefixeDiv[k][1]).toString() // Attention aux notations scientifiques pour 10e-8
        texte = `$${texNombre(a)} ${texTexte(prefixeDiv[k][0] + unite)} = `
        texte += (this.interactif && context.isHtml) ? `$${ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texteApres: '&nbsp;&nbsp;&nbsp; ' + unite })}` : `\\dotfill  ${texTexte(unite)}$`
        texteCorr =
          '$ ' +
          texNombre(a) +
          texTexte(prefixeDiv[k][0] + unite) +
          ' =  ' +
          texNombre(a) +
          '\\div' +
          texNombre(prefixeDiv[k][1]) +
          texTexte(unite) +
          ' = ' +
          texNombre(resultat) +
          texTexte(unite) +
          '$'
      } else {
        // pour type de question = 4
        let unite1 = listeUnite1[i]
        let unite2 = randint(Math.max(0, unite1 - 3), Math.min(unite1 + 3, 6), unite1)
        if (unite1 > unite2) {
          [unite1, unite2] = [unite2, unite1]
        }
        const ecart = unite2 - unite1 // nombre de multiplication par 10 pour passer de l'un à l'autre
        if (randint(0, 1) > 0) {
          resultat = calcul(a * Math.pow(10, ecart))
          texte = `$${texNombre(a)} ${texTexte(listeUnite[unite2])} = `
          texte += (this.interactif && context.isHtml) ? `$${ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texteApres: '&nbsp;&nbsp;&nbsp; ' + listeUnite[unite1] })}` : `\\dotfill  ${texTexte(listeUnite[unite1])}$`
          texteCorr =
            '$ ' +
            texNombre(a) +
            texTexte(listeUnite[unite2]) +
            ' =  ' +
            texNombre(a) +
            '\\times' +
            texNombre(Math.pow(10, ecart)) +
            texTexte(listeUnite[unite1]) +
            ' = ' +
            texNombre(resultat) +
            texTexte(listeUnite[unite1]) +
            '$'
        } else {
          resultat = calcul(a / Math.pow(10, ecart))
          texte = `$${texNombre(a)} ${texTexte(listeUnite[unite1])} = `
          texte += (this.interactif && context.isHtml) ? `$${ajouteChampTexteMathLive(this, i, 'largeur25 inline', { texteApres: '&nbsp;&nbsp;&nbsp; ' + listeUnite[unite2] })}` : `\\dotfill  ${texTexte(listeUnite[unite2])}$`
          texteCorr =
            '$ ' +
            texNombre(a) +
            texTexte(listeUnite[unite1]) +
            ' =  ' +
            texNombre(a) +
            '\\div' +
            texNombre(Math.pow(10, ecart)) +
            texTexte(listeUnite[unite2]) +
            ' = ' +
            texNombre(resultat) +
            texTexte(listeUnite[unite2]) +
            '$'
        }
      }

      if (reponses.indexOf(resultat) === -1) {
        reponses[i] = resultat
        setReponse(this, i, resultat.toString().replace('.', ','))
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.vue === 'diap') {
          texte = texte.replace('= \\dotfill', '\\text{ en }')
        }
        if (context.isHtml) {
          texte = texte.replace(
            '\\dotfill',
            '................................................'
          )
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 4, ' 1 : De dam, hm, km vers m\n 2 : De dm, cm, mm vers m\n 3 : Conversions en mètres\n4 : Mélange']
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
}
