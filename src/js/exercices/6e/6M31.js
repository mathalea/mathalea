import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, texNombre, texTexte, sp } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
import Decimal from 'decimal.js/decimal.mjs'
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
  function nombreAleatoire (nbChiffres) { // retourne un entier aléatoire à n chiffres sous la forme d'un Decimal
    let a = new Decimal(0)
    for (let i = 0; i < nbChiffres; i++) {
      a = a.add(randint(1, 9) * 10 ** i)
    }
    return a
  }
  this.nouvelleVersion = function () {
    this.interactifType = parseInt(this.sup3) === 2 ? 'mathLive' : 'qcm'
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    Decimal.toExpNeg = -20 // pour éviter la conversion en notation scientifique on va jusqu'à 20 décimales (-7 est la valeur par défaut)
    Decimal.toExpPos = 20 // pour les grands entiers, c'est la valeur par défaut
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
          (new Decimal(randint(10, 199))).div(10),
          nombreAleatoire(1).div(10),
          nombreAleatoire(1).div(100),
          nombreAleatoire(3).div(100)
        ])
        // XX,X 0,X 0,0X X,XX
      } else {
        a = choice([
          nombreAleatoire(1),
          nombreAleatoire(1).mul(10),
          nombreAleatoire(1).mul(100),
          nombreAleatoire(2)
        ])
        // X, X0, X00, XX
      }

      if (!div && typesDeQuestions < 4) {
        // Si il faut multiplier pour convertir

        resultat = a.mul(prefixeMulti[k][2])
        resultat2 = a.mul(10 ** (k + 1))
        resultat3 = a.mul(10 ** (k - 2))
        resultat4 = a.mul(10 ** ((k + 2)))
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
          texNombre(resultat, 20) +
          texTexte(unite) +
          '^3' +
          '$'
      } else if (div && typesDeQuestions < 4) {
        k = randint(0, 1) // Pas de conversions de mm^3 en m^3 avec des nombres décimaux car résultat inférieur à 10e-8
        // Le commentaire précédent est sans objet avec Decimal, on peut afficher ici 20 chiffres après la virgule sans passer en notation scientifique !
        resultat = a.div(prefixeMulti[k][2])
        resultat2 = a.div(10 ** (k + 1))
        resultat3 = a.div(10 ** (k - 2))
        resultat4 = a.div(10 ** (k + 2))
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
        texNombre(resultat, 20) + // avec les Decimaux, on peut demander une telle précision, texNombre n'affichera que ce qui est utile (sauf à mettre force, le troisième paramètre à true)
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
          resultat = a.mul(10 ** (3 * ecart))
          resultat2 = a.mul(10 ** (2 * ecart))
          resultat3 = a.mul(10 ** (ecart))
          resultat4 = a.div(10 ** (3 * ecart))
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
            texNombre(resultat, 20) + // avec les Decimaux, on peut demander une telle précision, texNombre n'affichera que ce qui est utile (sauf à mettre force, le troisième paramètre à true)
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
          resultat = a.div(10 ** (3 * ecart))
          resultat2 = a.div(10 ** (2 * ecart))
          resultat3 = a.div(10 ** ecart)
          resultat4 = a.mul(10 ** (3 * ecart))
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
            texNombre(resultat, 20) +
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
        texte: `$${texNombre(resultat, 20)}$`,
        statut: true
      },
      {
        texte: `$${texNombre(resultat2, 20)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat3, 20)}$`,
        statut: false
      },
      {
        texte: `$${texNombre(resultat4, 20)}$`,
        statut: false
      }
      ]
      if (this.interactif && this.interactifType === 'qcm') {
        texte += propositionsQcm(this, i).texte
      } else if (this.interactif && this.interactifType === 'mathLive') {
        texte = texte.replace('\\dotfill', `$${ajouteChampTexteMathLive(this, i, 'longueur inline largeur25')}$`)
        setReponse(this, i, resultat)
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
