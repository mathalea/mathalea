import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import Decimal from 'decimal.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, texNombre, texTexte } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

/**
 * Conversions d'aires en utilisant le préfixe pour déterminer la multiplication ou division à faire.
 *
 * Dans la correction, on montre que l'on multiplie ou divisie à 2 reprises par le coefficient donné par le préfixe
 *
 * * 1 : De dam², hm², km² vers m²
 * * 2 : De dm², cm², mm² vers m²
 * * 3 : Conversions en mètres-carrés
 * * 4 : Conversions avec des multiplications ou des divisions
 * * 5 : Conversions avec des ares, des centiares et des hectares
 * * 6 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Référence 6M23
 */
export default function ExerciceConversionsAires (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l'exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.sup3 = 1 // interactifType Qcm
  this.titre = "Conversions d'aires"
  this.consigne = 'Compléter :'
  this.spacing = 2
  this.nbColsCorr = 1
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady

  this.nouvelleVersion = function () {
    this.interactifType = parseInt(this.sup3) === 2 ? 'mathLive' : 'qcm'
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    Decimal.toExpNeg = -15
    let prefixeMulti = [
      [' da', '\\times10\\times10', 100],
      [' h', '\\times100\\times100', 10000],
      [' k', '\\times1~000\\times1~000', 1000000]
    ]
    let prefixeDiv = [
      [' d', '\\div10\\div10', 100],
      [' c', '\\div100\\div100', 10000],
      [' m', '\\div1~000\\div1~000', 1000000]
    ]
    const unite = 'm'
    const listeUnite = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    const listeDeK = combinaisonListes([0, 1, 2], this.nbQuestions)
    for (let i = 0,
      a,
      k,
      div,
      prefixe,
      resultat,
      resultat2,
      resultat3,
      resultat4,
      resultat5,
      typesDeQuestions,
      texte,
      texteCorr,
      cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.autoCorrection[i] = {}
      // On limite le nombre d'essais pour chercher des valeurs nouvelles
      if (this.sup < 6) {
        typesDeQuestions = this.sup
      } else {
        typesDeQuestions = randint(1, 5)
      }
      // k = randint(0,2); // Choix du préfixe
      k = listeDeK[i]
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n'y aura pas de division
      } else if (typesDeQuestions === 2) {
        // niveau 2
        div = true // Avec des divisions
      } else if (typesDeQuestions === 3) {
        div = choice([true, false]) // Avec des multiplications ou des divisions
      } else if (typesDeQuestions === 4) {
        div = choice([true, false]) // Avec des multiplications ou des divisions sans toujours revenir au m^2
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        a = choice([new Decimal(randint(1, 9)).div(10).plus(randint(1, 99)),
          new Decimal(randint(1, 9)).div(10),
          new Decimal(randint(1, 9)).div(100),
          new Decimal(randint(1, 9) + randint(1, 9) * 10 + randint(1, 9) * 1000).div(100)
        ])
        // XX,X 0,X 0,0X X,XX
      } else {
        a = choice([
          randint(1, 9),
          randint(1, 9) * 10,
          randint(1, 9) * 100,
          randint(1, 9) * 10 + randint(1, 9)
        ])
        a = new Decimal(a)
        // X, X0, X00, XX
      }

      if (!div && typesDeQuestions < 4) {
        // Si il faut multiplier pour convertir
        prefixeMulti = [
          [' da', '\\times10\\times10', 100],
          [' h', '\\times100\\times100', 10000],
          [' k', '\\times1~000\\times1~000', 1000000]
        ] // On réinitialise cette liste qui a pu être modifiée dans le cas des ares
        resultat = a.mul(prefixeMulti[k][2]) // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^2' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^2' +
          ' =  ' +
          texNombre(a, 2) +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 0) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeMulti[k][2]
      } else if (div && typesDeQuestions < 4) {
        prefixeDiv = [
          [' d', '\\div10\\div10', 100],
          [' c', '\\div100\\div100', 10000],
          [' m', '\\div1~000\\div1~000', 1000000]
        ]
        k = randint(0, 1) // Pas de conversions de mm^2 en m^2 avec des nombres décimaux car résultat inférieur à 10e-8
        resultat = a.div(prefixeDiv[k][2]) // Attention aux notations scientifiques pour 10e-8
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^2' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^2' +
          ' =  ' +
          texNombre(a, 2) +
          prefixeDiv[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 10) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeDiv[k][2]
      } else if (typesDeQuestions === 4) {
        const unite1 = randint(0, 3)
        let ecart = randint(1, 2) // nombre de multiplication par 10 pour passer de l'un à l'autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1
        }
        const unite2 = unite1 + ecart
        if (randint(0, 1) > 0) {
          resultat = a.mul(Math.pow(10, 2 * ecart))
          resultat2 = resultat.div(10)
          resultat3 = resultat.mul(10)
          resultat4 = resultat.mul(100)
          resultat5 = resultat.div(100)
          texte =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite1]) +
            '^2' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' =  ' +
            texNombre(a, 2) +
            '\\times' +
            texNombre(Math.pow(10, 2 * ecart)) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' = ' +
            texNombre(resultat, 0) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            '$'
          prefixe = Math.pow(10, 2 * ecart)
        } else {
          resultat = a.div(Math.pow(10, 2 * ecart))
          resultat2 = resultat.div(10)
          resultat3 = resultat.div(100)
          resultat4 = resultat.mul(10)
          resultat5 = resultat.mul(100)
          texte =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite2]) +
            '^2' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 2) +
            texTexte(listeUnite[unite1]) +
            '^2' +
            ' =  ' +
            texNombre(a, 2) +
            '\\div' +
            texNombre(Math.pow(10, 2 * ecart)) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            ' = ' +
            texNombre(resultat, 10) +
            texTexte(listeUnite[unite2]) +
            '^2' +
            '$'
          prefixe = Math.pow(10, 2 * ecart)
        }
      } else if (typesDeQuestions === 5) {
        // Pour typesDeQuestions==5
        prefixeMulti = [
          ['ha', '\\times100\\times100', 10000],
          ['a', '\\times10\\times10', 100]
        ]
        k = randint(0, 1)
        resultat = a.mul(prefixeMulti[k][2]) // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        resultat2 = resultat.div(10)
        resultat3 = resultat.mul(10)
        resultat4 = resultat.mul(100)
        resultat5 = resultat.div(100)
        texte =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0]) +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^2' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 2) +
          texTexte(prefixeMulti[k][0]) +
          ' =  ' +
          texNombre(a, 2) +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^2' +
          ' = ' +
          texNombre(resultat, 10) +
          texTexte(unite) +
          '^2' +
          '$'
        prefixe = prefixeMulti[k][2]
      }
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [{
        texte: `$${texNombre(resultat, 10)}$`,
        statut: true
      },
      {
        texte: `$${texNombre(resultat2, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat3, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat4, 10)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat5, 10)}$`,
        statut: false
      }
      ]
      if (this.interactif && this.interactifType === 'qcm') {
        texte += propositionsQcm(this, i).texte
      } else {
        texte += ajouteChampTexteMathLive(this, i)
        setReponse(this, i, parseFloat(resultat))
      }

      if (this.questionJamaisPosee(i, a, prefixe, div)) {
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
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    6,
    "1 : Conversions en m² avec des multiplications\n2 : Conversions en m² avec des divisions\n3 : Conversions en m² avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions\n5 : Conversions d'hectares et ares en m² \n6 : Mélange"
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
  if (context.isHtml && !context.vue === 'diap') this.besoinFormulaire3Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
}
