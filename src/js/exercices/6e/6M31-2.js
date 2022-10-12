import Exercice from '../Exercice.js'
import { combinaisonListes } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { sp } from '../../modules/outils/contextSensitif.js'
import { min } from 'mathjs'
import { texNombre } from '../../modules/outils/texNombres.js'
import Decimal from 'decimal.js/decimal.mjs'
import { nombreDeChiffresDansLaPartieDecimale, nombreDeChiffresDe } from '../../modules/outils/decimales.js'
export const titre = 'Convertir des volumes ou des capacités'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Conversions d'unités de volumes vers les unités de capacité ou inversement.
 *
 * Dans la correction, on passe systématiquement par l'équivalence dm3 = L
 *
 * * 1 : Unités de volume vers litres
 * * 2 : Litres vers unités de volume
 * * 3 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Référence 6M31-2
 */
export const uuid = 'f4d29'
export const ref = '6M31-2'
export default function UnitesDeVolumesEtDeCapacite (niveau = 1) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = niveau // Niveau de difficulté de l'exercice
  this.sup2 = false // Avec des nombres décimaux ou pas
  this.titre = titre
  this.consigne = 'Compléter : '
  this.spacing = 2
  this.nbQuestions = 8
  this.nbColsCorr = 1

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let listeTypeDeQuestions
    this.sup = parseInt(this.sup)
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(
        ['dam3toL', 'm3toL', 'dm3toL', 'cm3toL'],
        this.nbQuestions
      )
    }
    if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes(
        ['Ltodm3', 'Ltocm3', 'Ltom3'],
        this.nbQuestions
      )
    }
    if (this.sup === 3) {
      listeTypeDeQuestions = combinaisonListes(
        [
          'dam3toL',
          'm3toL',
          'dm3toL',
          'cm3toL',
          'mm3toL',
          'Ltodm3',
          'Ltocm3',
          'Ltom3'
        ],
        this.nbQuestions
      )
    }
    let listeDeN = []; let bonusDecimalesAMC, resultat
    if (this.sup2) {
      listeDeN = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    } else {
      listeDeN = combinaisonListes([1, 2, 3, 4, 5, 6], this.nbQuestions)
    }
    for (
      let i = 0, n, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (this.sup2) {
        switch (listeDeN[i]) {
          case 1:
            n = new Decimal(randint(2, 9)).div(10)
            break
          case 2:
            n = new Decimal(randint(11, 99)).div(10)
            break
          case 3:
            n = new Decimal(randint(1, 9)).div(10).add(randint(1, 9) * 10)
            break
          case 4:
            n = new Decimal(randint(11, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90])).div(100)
            break
        }
      } else {
        switch (listeDeN[i]) {
          case 1:
            n = new Decimal(randint(2, 9))
            break
          case 2:
            n = new Decimal(randint(11, 99))
            break
          case 3:
            n = new Decimal(randint(1, 9) * 10)
            break
          case 4:
            n = new Decimal(randint(1, 9) * 100)
            break
          case 5:
            n = new Decimal(randint(11, 99) * 100)
            break
          case 6:
            n = new Decimal(randint(1, 9) * 1000)
            break
        }
      }
      switch (listeTypeDeQuestions[i]) {
        case 'dam3toL':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{dam}^3=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `${sp(3)}L`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{dam}^3=\\dotfill${sp()}\\text{L}$`
          }
          bonusDecimalesAMC = n < 1000 ? randint(0, 1) : 0 // Sinon, cela fait trop de digits
          resultat = n * 1000000
          setReponse(this, i, resultat, { digits: min(nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, 10), decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{dam}^3=${texNombre(n, 3)}\\times1${sp()}000\\times1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 0)}${sp()}\\text{L}$`

          break
        case 'm3toL':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{m}^3=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `${sp(3)}L`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{m}^3=\\dotfill${sp()}\\text{L}$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n * 1000
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{m}^3=${texNombre(n, 3)}\\times1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 0)}${sp()}\\text{L}$`
          break
        case 'dm3toL':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{dm}^3=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `${sp(3)}L`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{dm}^3=\\dotfill${sp()}\\text{L}$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{dm}^3=${texNombre(resultat, 3)}${sp()}\\text{L}$`
          break
        case 'cm3toL':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{cm}^3=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `${sp(3)}L`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{cm}^3=\\dotfill${sp()}\\text{L}$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000)
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{cm}^3=${texNombre(n, 3)}\\div 1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 6)}${sp()}\\text{L}$`
          break
        case 'mm3toL':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{mm}^3=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `${sp(3)}L`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{mm}^3=\\dotfill${sp()}\\text{L}$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000000)
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{mm}^3=${texNombre(n, 3)}\\div1${sp()}000\\div 1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 9)}${sp()}\\text{L}$`
          break
        case 'Ltodm3':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `$${sp(3)}\\text{dm}^3$`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{dm}^3$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(resultat, 3)}${sp()}\\text{dm}^3$`
          break
        case 'Ltocm3':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `$${sp(3)}\\text{cm}^3$`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{cm}^3$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n * 1000
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(n, 0)}${sp()}\\text{dm}^3=${texNombre(resultat, 0)}\\times1${sp()}000${sp()}\\text{cm}^3=${texNombre(n * 1000)}${sp()}\\text{cm}^3$`
          break
        case 'Ltom3':
          if (this.interactif) {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=$` + ajouteChampTexteMathLive(this, i, 'inline', { tailleExtensible: true }) + `$${sp(3)}\\text{m}^3$`
          } else {
            texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{m}^3$`
          }
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000)
          setReponse(this, i, resultat, { digits: nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC, decimals: nombreDeChiffresDansLaPartieDecimale(resultat) + bonusDecimalesAMC, signe: false })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(n, 3)}${sp()}\\text{dm}^3=${texNombre(n, 3)}\\div1${sp()}000${sp()}\\text{m}^3=${texNombre(resultat, 6)}${sp()}\\text{m}^3$`
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
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
    3,
    '1 : Unités de volume vers litres\n2 : Litres vers unités de volume\n3 : Mélange'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
}
