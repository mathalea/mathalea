import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, arrondi, texNombre, texTexte, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const titre = 'Convertir des volumes'
export const amcReady = true
export const amcType = 'qcmMono' // type de question AMC
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

export const dateDeModifImportante = '14/05/2022'

/**
 * Conversions de volumes.
 *
 * Dans la correction, on ne voit qu`une multiplication ou qu`un division pour obtenir le résultat
 *
 * * 1 : Conversions en mètres-cubes avec des multiplications
 * * 2 : Conversions en mètres-cubes avec des divisions
 * * 3 : Conversions en mètres-cubes avec des multiplications ou divisions
 * * 4 : Conversions avec des multiplications ou divisions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Référence 6M31
 * Amélioration de l'interactivité (mathLive maintenant inline) par Guillaume Valmont le 14/05/2022
 */
export default function ExerciceConversionsVolumes (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l`exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.sup3 = 1 // interactifType Qcm
  this.titre = titre
  this.consigne = 'Compléter :'
  this.spacing = 2
  this.nbColsCorr = 1
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactifReady = interactifReady

  this.nouvelleVersion = function () {
    this.interactifType = parseInt(this.sup3) === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const prefixeMulti = [
      ['da', '10\\times10\\times10', 1000],
      ['h', '100\\times100\\times100', 1000000],
      ['k', `1${sp()}000\\times1${sp()}000\\times1${sp()}000`, 1000000000]
    ]
    const prefixeDiv = [
      ['d', '10\\div10\\div10', 1000],
      ['c', '100\\div100\\div100', 1000000],
      ['m', `1${sp()}000\\div1${sp()}000\\div1${sp()}000`, 1000000000]
    ]
    const unite = 'm'
    const listeUnite = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    for (
      let i = 0,
        a,
        k,
        div,
        resultat,
        resultat2,
        resultat3,
        resultat4,
        typesDeQuestions,
        texte,
        texteCorr,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      // On limite le nombre d`essais pour chercher des valeurs nouvelles
      if (this.sup < 5) {
        typesDeQuestions = this.sup
      } else {
        typesDeQuestions = randint(1, 4)
      }
      k = randint(0, 2) // Choix du préfixe
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n`y aura pas de division
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

        resultat = arrondi((a * prefixeMulti[k][2]), 12).toString() // Utilise Algebrite pour avoir le résultat exact même avec des décimaux
        resultat2 = arrondi((a * 10 ** (k + 1)), 12)
        resultat3 = arrondi((a * 10 ** (k - 2)), 12)
        resultat4 = arrondi((a * 10 ** ((k + 2))), 12)
        texte =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^3' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^3' +
          ' =  ' +
          texNombre(a, 3) +
          '\\times' +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^3' +
          ' = ' +
          texNombre(resultat, 3) +
          texTexte(unite) +
          '^3' +
          '$'
      } else if (div && typesDeQuestions < 4) {
        k = randint(0, 1) // Pas de conversions de mm^3 en m^3 avec des nombres décimaux car résultat inférieur à 10e-8
        resultat = arrondi(a / prefixeMulti[k][2], 12).toString() // Attention aux notations scientifiques pour 10e-8
        resultat2 = arrondi((a / 10 ** (k + 1)), 12)
        resultat3 = arrondi((a / 10 ** (k - 2)), 12)
        resultat4 = arrondi((a / 10 ** ((k + 2))), 12)
        texte =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^3' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^3' +
          ' =  ' +
          texNombre(a, 3) +
          '\\div' +
          prefixeDiv[k][1] +
          texTexte(unite) +
          '^3' +
          ' = ' +
          texNombre(resultat, 3) +
          texTexte(unite) +
          '^3' +
          '$'
      } else if (typesDeQuestions === 4) {
        const unite1 = randint(0, 3)
        let ecart = randint(1, 2) // nombre de multiplication par 10 pour passer de l`un à l`autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1
        }
        const unite2 = unite1 + ecart
        let multiplicationsPar1000 = ''

        if (randint(0, 1) > 0) {
          switch (ecart) {
            case 1:
              multiplicationsPar1000 = `\\times 1${sp()}000`
              break
            case 2:
              multiplicationsPar1000 = `\\times 1${sp()}000 \\times 1${sp()}000`
              break
            case 3:
              multiplicationsPar1000 =
                `\\times 1${sp()}000 \\times 1${sp()}000 \\times 1${sp()}000`
              break
          }
          resultat = arrondi((a * Math.pow(10, 3 * ecart)), 12)
          resultat2 = arrondi((a * Math.pow(10, 2 * ecart)), 12)
          resultat3 = arrondi((a * Math.pow(10, ecart)), 12)
          resultat4 = arrondi((a * Math.pow(10, -3 * ecart)), 12)
          texte =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite1]) +
            '^3' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' =  ' +
            texNombre(a, 3) +
            multiplicationsPar1000 +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' = ' +
            texNombre(resultat, 3) +
            texTexte(listeUnite[unite1]) +
            '^3' +
            '$'
        } else {
          switch (ecart) {
            case 1:
              multiplicationsPar1000 = `\\div 1${sp()}000`
              break
            case 2:
              multiplicationsPar1000 = `\\div 1${sp()}000 \\div 1${sp()}000`
              break
            case 3:
              multiplicationsPar1000 = `\\div 1${sp()}000 \\div 1${sp()}000 \\div 1${sp()}000`
              break
          }
          resultat = arrondi((a / Math.pow(10, 3 * ecart)), 12)
          resultat2 = arrondi((a / Math.pow(10, 2 * ecart)), 12)
          resultat3 = arrondi((a / Math.pow(10, ecart)), 12)
          resultat4 = arrondi((a / Math.pow(10, -3 * ecart)), 12)
          texte =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite2]) +
            '^3' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' =  ' +
            texNombre(a, 3) +
            multiplicationsPar1000 +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' = ' +
            texNombre(resultat, 3) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            '$'
        }
      }
      // else if(typesDeQuestions==5) { // Pour typesDeQuestions==5
      // prefixeMulti = [[`L`,0.001],[`dL`,0.0001],[`cL`,0.00001],[`mL`,0.000001]];
      // k = randint(0,1)
      // resultat = arrondi((a*prefixeMulti[k][1]).toString(); // Utilise Algebrite pour avoir le résultat exact même avec des décimaux, 12)
      // texte = `$ `+ texNombre(a, 3) + texTexte(prefixeMulti[k][0]) + ` = \\dotfill ` + texTexte(unite)  + `^3` + `$`;
      // texteCorr = `$ `+ texNombre(a, 3) + texTexte(prefixeMulti[k][0]) + ` =  ` + texNombre(a, 3) + `\\times` + texNombre(prefixeMulti[k][1]) + texTexte(unite)  + `^3`
      //  + ` = ` + texNombre(resultat, 3) + texTexte(unite)+ `^2` + `$`;
      // }
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [{
        texte: `$${texNombre(resultat, 3)}$`,
        statut: true
      },
      {
        texte: `$${texNombre(resultat2, 3)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat3, 3)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat4, 3)}$`,
        statut: false
      }
      ]
      if (this.interactif && this.interactifType === 'qcm') {
        texte += propositionsQcm(this, i).texte
      } else if (this.interactif && this.interactifType === 'mathLive') {
        texte = texte.replace('\\dotfill', `$${ajouteChampTexteMathLive(this, i, 'longueur inline largeur25')}$`)
        setReponse(this, i, parseFloat(resultat))
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n`a jamais été posée, on en crée une autre
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
    4,
    '1 : Conversions en mètres-cubes avec des multiplications\n2 : Conversions en mètres-cubes avec des divisions\n3 : Conversions en mètres-cubes avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
  if (context.isHtml) this.besoinFormulaire3Numerique = ['Exercice interactif', 2, '1 : QCM\n2 : Numérique'] // Texte, tooltip
}
