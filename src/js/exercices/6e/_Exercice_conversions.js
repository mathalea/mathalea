import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, arrondi, texNombre, texNombrec, texFraction, texTexte, calcul } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Conversions  mètres, litres, grammes, octets (et euros pour la version LaTeX) en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * * 1 : De da, h, k vers l'unité de référence
 * * 2 : De d, c, m vers l'unité de référence
 * * 3 : Multiplications ou divisions vers l'unité de référence
 * * 4 : Conversions d'octets
 * * 5 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 */
export default function ExerciceConversions (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l'exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.titre =
    'Conversions de longueurs, masses, contenance, prix ou unités informatiques'
  this.consigne = 'Compléter'
  this.spacing = 2
  this.correction_avec_des_fractions = false
  this.interactif = true

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const tabRep = []
    const prefixeMulti = [
      ['da', 10],
      ['h', 100],
      ['k', 1000]
    ] // ['M',1000000],['G',1000000000],['T',1000000000000]];
    const prefixeDiv = [
      ['d', 10],
      ['c', 100],
      ['m', 1000]
    ] // ['$\\mu{}$',1000000]];
    for (let i = 0,
      a,
      k,
      div,
      resultat,
      unite,
      typesDeQuestions,
      texte,
      texteCorr,
      listeUniteInfo,
      cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 5) {
        typesDeQuestions = this.sup
      } else {
        typesDeQuestions = randint(1, 4)
      }
      k = randint(0, 2) // Choix du préfixe
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n'y aura pas de division
      } else if (typesDeQuestions === 2) {
        // niveau 2
        div = true // Avec des divisions
      } else if (typesDeQuestions === 3) {
        div = choice([true, false]) // Avec des multiplications ou des divisions
      } else if (typesDeQuestions === 4) {
        listeUniteInfo = ['o', 'ko', 'Mo', 'Go', 'To']
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        a = choice([
          arrondi(randint(1, 19) + randint(1, 9) / 10, 1),
          arrondi(randint(1, 9) / 10, 1),
          arrondi(randint(1, 9) / 100, 2),
          arrondi(randint(1, 9) + randint(1, 9) / 10 + randint(1, 9) / 100, 2)
        ])
        // XX,X 0,X 0,0X X,XX
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
        if (k < 2) {
          // Choix de l'unité
          unite = choice(['m', 'L', 'g'])
        } else if (k === 2) {
          if (context.isHtml) {
            unite = choice(['m', 'L', 'g']) // pas de signe € pour KaTeX
          } else {
            unite = choice(['m', 'L', 'g', '€'])
          }
        } else {
          unite = 'o'
        }
        resultat = calcul(a * prefixeMulti[k][1]).toString() // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        texte = '$ ' + texNombre(a) + texTexte(prefixeMulti[k][0] + unite) + ' = ' + (this.interactif && context.isHtml ? `$ ${ajouteChampTexte(this, i, { numeric: true, texteApres: '$' + texTexte(unite) + '$' })}` : `prout \\dotfill ${texTexte(unite)}$`)

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
          texNombrec(resultat) +
          texTexte(unite) +
          '$'
      } else if (div &&
        typesDeQuestions < 4 &&
        this.correction_avec_des_fractions) {
        unite = choice(['m', 'L', 'g'])
        resultat = calcul(a / prefixeDiv[k][1]).toString() // Attention aux notations scientifiques pour 10e-8
        texte =
          '$ ' +
          texNombre(a) +
          texTexte(prefixeDiv[k][0] + unite) +
          ' = ' + (this.interactif && context.isHtml ? `$ ${ajouteChampTexte(this, i, { numeric: true, texteApres: '$' + texTexte(unite) + '$' })}` : ` \\dotfill ${texTexte(unite)}$`)
        texteCorr =
          '$ ' +
          texNombre(a) +
          texTexte(prefixeDiv[k][0] + unite) +
          ' =  ' +
          texFraction(texNombre(a), texNombre(prefixeDiv[k][1])) +
          texTexte(unite) +
          ' = ' +
          texNombre(resultat) +
          texTexte(unite) +
          '$'
      } else if (div && typesDeQuestions < 4) {
        unite = choice(['m', 'L', 'g'])
        resultat = calcul(a / prefixeDiv[k][1]).toString() // Attention aux notations scientifiques pour 10e-8
        texte =
          '$ ' +
          texNombre(a) +
          texTexte(prefixeDiv[k][0] + unite) +
          ' = ' + (this.interactif && context.isHtml ? `$ ${ajouteChampTexte(this, i, { numeric: true, texteApres: '$' + texTexte(unite) + '$' })}` : ` \\dotfill ${texTexte(unite)}$`)
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
          texNombrec(resultat) +
          texTexte(unite) +
          '$'
      } else {
        // pour type de question = 4
        const unite1 = randint(0, 3)
        let ecart = randint(1, 2) // nombre de multiplication par 1000 pour passer de l'un à l'autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1
        }
        const unite2 = unite1 + ecart
        if (randint(0, 1) > 0) {
          resultat = calcul(a * Math.pow(10, 3 * ecart))
          unite = listeUniteInfo[unite1]
          texte =
            '$ ' +
            texNombre(a) +
            texTexte(listeUniteInfo[unite2]) +
            ' = ' + (this.interactif && context.isHtml ? `$ ${ajouteChampTexte(this, i, { numeric: true, texteApres: '$' + texTexte(unite) + '$' })}` : ` \\dotfill ${texTexte(unite)}$`)
          texteCorr =
            '$ ' +
            texNombre(a) +
            texTexte(listeUniteInfo[unite2]) +
            ' =  ' +
            texNombre(a) +
            '\\times' +
            texNombre(Math.pow(10, 3 * ecart)) +
            texTexte(unite) +
            ' = ' +
            texNombrec(resultat) +
            texTexte(unite) +
            '$'
        } else {
          resultat = calcul(a / Math.pow(10, 3 * ecart))
          unite = listeUniteInfo[unite2]
          texte =
            '$ ' +
            texNombre(a) +
            texTexte(listeUniteInfo[unite1]) +
            ' = ' + (this.interactif && context.isHtml ? `$ ${ajouteChampTexte(this, i, { numeric: true, texteApres: '$' + texTexte(unite) + '$' })}` : ` \\dotfill ${texTexte(unite)}$`)
          texteCorr =
            '$ ' +
            texNombre(a) +
            texTexte(listeUniteInfo[unite1]) +
            ' =  ' +
            texNombre(a) +
            '\\div' +
            texNombre(Math.pow(10, 3 * ecart)) +
            texTexte(unite) +
            ' = ' +
            texNombrec(resultat) +
            texTexte(unite) +
            '$'
        }
      }

      if (tabRep.indexOf(resultat) === -1) {
        setReponse(this, i, resultat)
        tabRep[i] = resultat
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.isDiaporama) {
          texte = texte.replace('= \\dotfill', '\\text{ en }')
        }
        if (context.isHtml) {
          texte = texte.replace(
            '\\dotfill',
            '................................................'
          )
        }
        console.log(texte)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  this.besoinFormulaireNumerique = ['Niveau de difficulté', 5, "1 : De da, h, k vers l'unité de référence\n2 : De d, c, m vers l'unité de référence\n3 : Multiplications ou divisions vers l'unité de référence\n4 : Conversions avec les octets\n5: Toutes les conversions"]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
}
