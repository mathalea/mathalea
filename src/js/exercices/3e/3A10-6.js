import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, contraindreValeur, compteOccurences, texNombre, combinaisonListes, rangeMinMax, choice, texteGras, sp, texteEnCouleur, texteEnCouleurEtGras, sommeDesChiffres } from '../../modules/outils.js'
import { max } from 'mathjs'
// import { setReponse } from '../../modules/gestionInteractif.js'
// import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const titre = 'Trouver un chiffre pour qu\'un nombre soit divisible par un autre'
// export const amcReady = true
// export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '29/08/2022'
/**
 *
 * Attendus de 3e : Connaître et utiliser les critères de divisibilité par 2, par 3, par 5, par 9 et par 10
 * @author Eric Elter
 * Référence 3A10-6
 */

export const ref = '3A10-5'
export default function recourirDecompositionFacteursPremiers () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 4
  this.besoinFormulaireTexte = ['Nombres premiers utilisés ', ' Choix séparés par des tirets\n1 : 2, 3 et 5\n2 : 2, 3 et 7\n3 : 2, 5 et 7\n4 : 3, 5 et 7\n5 : Mélange']
  this.besoinFormulaire2Texte = ['Nombres premiers utilisés ', ' Choix séparés par des tirets\n1 : 2, 3 et 5\n2 : 2, 3 et 7\n3 : 2, 5 et 7\n4 : 3, 5 et 7\n5 : Mélange']
  this.besoinFormulaire3Numerique = ['Puissance la plus élevée possible (entre 2 et 5)', 3]
  this.sup = 5
  this.tailleDiaporama = 2

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    this.sup2 = contraindreValeur(1, 3, parseInt(this.sup2), 3)
    this.sup3 = 3
    // this.consigne = 'Décomposer en produit de facteurs premiers '
    // this.consigne += this.nbQuestions === 1 ? 'le nombre suivant.' : 'les nombres suivants.'
    // if (this.interactif) this.consigne += '<br>Indiquer les facteurs par ordre croissant.'
    let nombreDeChiffres = []
    if (!this.sup) { // Si aucune liste n'est saisie
      nombreDeChiffres = 7
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = Math.max(Math.min(parseInt(this.sup), 7), 2)
        nombreDeChiffres[0] = this.sup
      } else {
        nombreDeChiffres = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < nombreDeChiffres.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          nombreDeChiffres[i] = contraindreValeur(2, 7, parseInt(nombreDeChiffres[i]), 7)
        }
      }
    }
    nombreDeChiffres = [7]
    if (compteOccurences(nombreDeChiffres, 7) > 0) nombreDeChiffres = rangeMinMax(2, 6) // Teste si l'utilisateur a choisi tout
    nombreDeChiffres = combinaisonListes(nombreDeChiffres, this.nbQuestions)

    const choixDiviseurs = ['par 2', 'par 3', 'par 5', 'par 9', 'par 2 et par 3', 'par 2 et par 5', 'par 6', 'par 10']
    let casChoixDiviseurs = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      casChoixDiviseurs = 8
    } else {
      if (typeof (this.sup2) === 'number') {
        this.sup2 = Math.max(Math.min(parseInt(this.sup2), 8), 0)
        casChoixDiviseurs[0] = this.sup2
      } else {
        casChoixDiviseurs = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < casChoixDiviseurs.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          casChoixDiviseurs[i] = contraindreValeur(1, 9, parseInt(casChoixDiviseurs[i]), 9) - 1
        }
      }
    }
    casChoixDiviseurs = [0, 1]
    if (compteOccurences(casChoixDiviseurs, 8) > 0) casChoixDiviseurs = rangeMinMax(0, 7) // Teste si l'utilisateur a choisi tout
    casChoixDiviseurs = combinaisonListes(casChoixDiviseurs, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0, nbAvant, nbApres, positionX, a, nbAvecChiffreCache,
      sommePourTroisouNeuf, ajoutPourTroisouNeuf; i < this.nbQuestions && cpt < 50;) {
      texte = 'Dans le nombre suivant à ' + nombreDeChiffres[i] + ' chiffres '
      positionX = this.sup3 === 1 ? nombreDeChiffres[i] - 1 : this.sup3 === 2 ? randint(1, nombreDeChiffres[i] - 2) : choice([nombreDeChiffres[i] - 1, randint(1, nombreDeChiffres[i] - 2)])
      a = [randint(1, 9)]
      for (let ee = 1; ee < nombreDeChiffres[i] - 1; ee++) a.push(randint(0, 9))

      if (nombreDeChiffres[i] > 3) {
        nbAvecChiffreCache = texNombre(a[0])
        if (nombreDeChiffres[i] === 6) {
          if (positionX === 1) nbAvecChiffreCache += '...' + texNombre(a[1])
          else if (positionX === 2) nbAvecChiffreCache += texNombre(a[1]) + '...'
          else nbAvecChiffreCache += texNombre(a[1]) + texNombre(a[2])
        } else if (nombreDeChiffres[i] === 5) {
          if (positionX === 1) nbAvecChiffreCache += '...' + texNombre(a[1])
          else nbAvecChiffreCache += texNombre(a[1])
        }
        nbAvecChiffreCache += sp(2)
        nbAvant = 0
        for (let ee = (nombreDeChiffres[i] - positionX > 3 ? nombreDeChiffres[i] - 4 : nombreDeChiffres[i] - 3); ee < positionX; ee++) {
          nbAvant = nbAvant * 10 + a[ee]
        }
        nbApres = 0
        for (let ee = max((nombreDeChiffres[i] - positionX > 3 ? nombreDeChiffres[i] - 4 : nombreDeChiffres[i] - 3), positionX); ee < nombreDeChiffres[i] - 1; ee++) {
          nbApres = nbApres * 10 + a[ee]
        }
        nbAvecChiffreCache += (nbAvant !== 0 ? texNombre(nbAvant) : '') + (nombreDeChiffres[i] - 3 > positionX ? '' : '...') + (nbApres !== 0 ? texNombre(nbApres) : '')
      } else {
        nbAvant = 0
        for (let ee = 0; ee < positionX; ee++) {
          nbAvant = nbAvant * 10 + a[ee]
        }
        nbApres = 0
        for (let ee = positionX; ee < nombreDeChiffres[i] - 1; ee++) {
          nbApres = nbApres * 10 + a[ee]
        }
        nbAvecChiffreCache = texNombre(nbAvant) + '...' + (nbApres === 0 ? '' : texNombre(nbApres))
      }
      texte += sp(2) + texteGras(nbAvecChiffreCache) + sp(2)
      texte += ', il manque un chiffre (à la place de ...). <br>'
      texteCorr = `Quel chiffre peut-on mettre dans ${sp(2)} ${texteGras(nbAvecChiffreCache)} ${sp(2)} pour qu'il soit divisible ${choixDiviseurs[casChoixDiviseurs[i]]} ?`
      texte += texteCorr
      texte += texteEnCouleur(' Une ou plusieurs réponses sont possibles tout comme qu\'aucune.', 'gray')
      switch (casChoixDiviseurs[i]) {
        case 0 : // Divisible par 2
          texteCorr += '<br>Un nombre divisible par 2 est pair donc ici, '
          switch (positionX) {
            case nombreDeChiffres[i] - 1 :
              texteCorr += texteEnCouleurEtGras('tout chiffre pair suffit.<br>')
              texteCorr += `${nbAvecChiffreCache.replace('...', 0)}, ${nbAvecChiffreCache.replace('...', '2')}, ${nbAvecChiffreCache.replace('...', '4')}, ${nbAvecChiffreCache.replace('...', '6')} et ${nbAvecChiffreCache.replace('...', '8')} sont divisibles par 2.`
              break
            default :
              if (a[nombreDeChiffres[i] - 2] % 2 === 0) {
                texteCorr += texteEnCouleurEtGras('tout chiffre convient') + ' car le nombre est déjà pair.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace('...', ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace('...', 8)} et ${nbAvecChiffreCache.replace('...', 9)} sont divisibles par 2.`
              } else {
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le nombre ne peut pas être pair.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace('...', ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace('...', 8)} et ${nbAvecChiffreCache.replace('...', 9)} ne sont pas divisibles par 2.`
              }
              break
          }
          break
        case 1 : // Divisible par 3
          ajoutPourTroisouNeuf = []
          sommePourTroisouNeuf = sommeDesChiffres(a)[0]
          ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
          for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
            ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
          }
          texteCorr += '<br>Il suffit de savoir quel nombre à un chiffre il faut ajouter à '
          texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
          texteCorr += sommePourTroisouNeuf
          texteCorr += ' pour obtenir un multiple de 3.<br>Or '
          for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
            texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ee] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ee]) + ', '
          }
          texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
          texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])
          texteCorr += ' sont divisibles par 3 donc ici, les chiffres qui conviennent sont : '
          for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
            texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
          }
          texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
          texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + '.<br>'
          for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
            texteCorr += `${nbAvecChiffreCache.replace('...', ajoutPourTroisouNeuf[ee])}, `
          }
          texteCorr += `${nbAvecChiffreCache.replace('...', ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2])} et ${nbAvecChiffreCache.replace('...', ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])} sont divisibles par 3.`
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
}
