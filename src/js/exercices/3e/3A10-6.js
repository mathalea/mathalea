import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, contraindreValeur, compteOccurences, combinaisonListes, rangeMinMax, texteGras, sp, texteEnCouleur, texteEnCouleurEtGras, sommeDesChiffres, numAlpha } from '../../modules/outils.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
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

export const ref = '3A10-6'
export const uuid = '5636e'
export default function TrouverChiffre () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 4
  this.besoinFormulaireTexte = ['Nombre de chiffres dans le nombre à découvrir ', 'Choix séparés par des tirets\n2 : 2 chiffres\n3 : 3 chiffres\n4 : 4 chiffres\n5 : 5 chiffres\n6 : 6 chiffres\n7 : Mélange']
  this.besoinFormulaire2Texte = ['Critère choisi de divisibilité', 'Choix séparés par des tirets \n1 : par 2\n2 : par 3\n3 : par 5\n4 : par 9\n5 : par 2 et par 3\n6 : par 2 et par 5\n7 : par 6\n8 : par 10\n9 : Mélange']
  this.besoinFormulaire3Numerique = ['Choix du symbole remplaçant le chiffre manquant', 4, '1 : ?\n2 : _\n3 : ...\n4 : X']
  this.besoinFormulaire4CaseACocher = ['Le chiffre des unités est le seul chiffre caché', false]
  this.sup = 7
  this.sup2 = 9
  this.sup3 = 1
  const symboleChiffreCacheTab = ['?', '_', '...', 'X']

  this.tailleDiaporama = 2

  this.nouvelleVersion = function () {
    const symboleChiffreCache = symboleChiffreCacheTab[this.sup3 - 1]
    console.log(this.sup3, symboleChiffreCacheTab, symboleChiffreCache)
    this.consigne = this.interactif ? 'Dans le champ de réponses, indiquer toutes les réponses possibles dans l\'ordre croissant et séparées par des points-virgules. Si aucun chiffre n\'est possible, écrire aucun.' : ''
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let nombreDeChiffres = []

    // CHOIX DU NOMBRE DE CHIFFRES COMPOSANT LE NOMBRE
    if (!this.sup) { // Si aucune liste n'est saisie
      nombreDeChiffres = 7
    } else {
      if (typeof (this.sup) === 'number') {
        this.sup = contraindreValeur(2, 7, parseInt(this.sup), 7)
        nombreDeChiffres[0] = this.sup
      } else {
        nombreDeChiffres = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < nombreDeChiffres.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          nombreDeChiffres[i] = contraindreValeur(2, 7, parseInt(nombreDeChiffres[i]), 7)
        }
      }
    }
    if (compteOccurences(nombreDeChiffres, 7) > 0) nombreDeChiffres = rangeMinMax(2, 6) // Teste si l'utilisateur a choisi tout
    nombreDeChiffres = combinaisonListes(nombreDeChiffres, this.nbQuestions)

    // CHOIX DU CRITERE DE DIVISIBILITE
    const choixDiviseurs = ['', 'par 2', 'par 3', 'par 5', 'par 9', 'par 2 et par 3', 'par 2 et par 5', 'par 6', 'par 10']
    let casChoixDiviseurs = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      casChoixDiviseurs = 9
    } else {
      if (typeof (this.sup2) === 'number') {
        this.sup2 = contraindreValeur(1, 9, parseInt(this.sup2), 9)
        casChoixDiviseurs[0] = this.sup2
      } else {
        casChoixDiviseurs = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < casChoixDiviseurs.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          casChoixDiviseurs[i] = contraindreValeur(1, 9, parseInt(casChoixDiviseurs[i]), 9)
        }
      }
    }
    if (compteOccurences(casChoixDiviseurs, 9) > 0) casChoixDiviseurs = rangeMinMax(1, 8) // Teste si l'utilisateur a choisi tout
    casChoixDiviseurs = combinaisonListes(casChoixDiviseurs, this.nbQuestions)

    for (let i = 0, texte, texteCorr, cpt = 0, nb, positionX, a, tabChiffresX, nbAvecChiffreCache,
      sommePourTroisouNeuf, ajoutPourTroisouNeuf, reponse; i < this.nbQuestions && cpt < 50;) {
      texte = 'Dans le nombre suivant à ' + nombreDeChiffres[i] + ' chiffres '
      positionX = (this.sup4 || this.sup === 1) ? nombreDeChiffres[i] - 1 : randint(1, nombreDeChiffres[i] - 1)

      // CONSTRUCTION DU NOMBRE AVEC LE CHIFFRE CACHE
      nb = randint(1, 9)
      a = [nb] // a contient un tableau des chiffres du nombre
      tabChiffresX = [nb]
      for (let ee = 1; ee < nombreDeChiffres[i]; ee++) {
        if (positionX !== ee) {
          nb = randint(0, 9)
          a.push(nb)
          tabChiffresX.push((ee === nombreDeChiffres[i] - 3 ? sp(2) : '') + nb)
        } else tabChiffresX.push((ee === nombreDeChiffres[i] - 3 ? sp(2) : '') + symboleChiffreCache)
      }
      nbAvecChiffreCache = tabChiffresX.join('').toString() // C'est le nombre avec la gestion des espaces et du symbole pour cacher le chiffre

      texte += sp(2) + texteGras(nbAvecChiffreCache) + sp(2)
      texte += `, il manque un chiffre (à l'emplacement de ${symboleChiffreCache}). <br>`
      texteCorr = `Quel chiffre peut-on mettre dans ${sp(2)} ${texteGras(nbAvecChiffreCache)} ${sp(2)} pour qu'il soit divisible ${choixDiviseurs[casChoixDiviseurs[i]]} ?`
      texte += texteCorr
      texte += texteEnCouleur(' Une ou plusieurs réponses sont possibles tout comme aucune.', 'gray')

      // CORRECTION (beaucoup plus longue que l'énoncé)
      switch (casChoixDiviseurs[i]) {
        case 1 : // Divisible par 2
          texteCorr += '<br>Un entier divisible par 2 est pair donc ici, '
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre inconnu est le chiffre des unités
              texteCorr += texteEnCouleurEtGras('tout chiffre pair suffit.<br>')
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 0)}, ${nbAvecChiffreCache.replace(symboleChiffreCache, '2')}, ${nbAvecChiffreCache.replace(symboleChiffreCache, '4')}, ${nbAvecChiffreCache.replace(symboleChiffreCache, '6')} et ${nbAvecChiffreCache.replace(symboleChiffreCache, '8')} sont divisibles par 2.`
              /* Cette méthode fonctionne mais par pour un autre cas, donc c'est tout ou rien
              reponse = diversesReponsesPossibles([0, 2, 4, 6, 8])
              for (let k = 0; k < reponse.length; k++) {
                reponse[k] = reponse[k].join(';')
              }
              */
              reponse = '0;2;4;6;8'
              break
            default : // Le chiffre inconnu n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 2 === 0) { // Le chiffre des unités est pair
                texteCorr += texteEnCouleurEtGras('tout chiffre convient') + ' car le nombre est déjà pair.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} sont divisibles par 2.`
                /* Cette méthode ne fonctionne pas car le tableau des diverses réponses possibles est trop grand et ralentit le fonctionnement de l'exercice
                reponse = diversesReponsesPossibles(rangeMinMax(0, 9))
                for (let k = 0; k < reponse.length; k++) {
                  reponse[k] = reponse[k].join(';')
                }
                */
                reponse = '0;1;2;3;4;5;6;7;8;9'
              } else { // Le chiffre des unités est impair
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le nombre ne peut pas être pair.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 2.`
                reponse = ['Aucun', 'aucun', 'AUCUN']
              }
              break
          }
          break
        case 2 : // Divisible par 3
          ajoutPourTroisouNeuf = []
          sommePourTroisouNeuf = sommeDesChiffres(a)[0]
          ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
          for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
            ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
          }
          reponse = ajoutPourTroisouNeuf.join(';')
          texteCorr += '<br>Il suffit de savoir quel nombre à un chiffre il faut ajouter à '
          texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
          texteCorr += sommePourTroisouNeuf
          texteCorr += ' pour obtenir un multiple de 3.<br>Or seuls '
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
            texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ee])}, `
          }
          texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])} sont divisibles par 3.`
          break
        case 3 : // Divisible par 5
          texteCorr += '<br>Un entier divisible par 5 a son chiffre des unités égal à 0 ou 5 donc ici, '
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre caché est le chiffre des unités
              texteCorr += texteEnCouleurEtGras('les chiffres 0 et 5 suffisent.<br>')
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 0)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, '5')} sont divisibles par 5.`
              reponse = '0;5'
              break
            default : // Le chiffre caché n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 5 === 0) { // Le chiffre des unités est 0 ou 5
                reponse = '0;1;2;3;4;5;6;7;8;9'
                texteCorr += texteEnCouleurEtGras('tout chiffre convient') + ' car le chiffre des unités est déjà égal à 0 ou 5.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} sont divisibles par 5.`
              } else { // Le chiffre des unités n'est pas 0 ou 5
                reponse = ['Aucun', 'aucun', 'AUCUN']
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le chiffre des unités n\'est déjà pas égal à 0 ou 5.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 5.`
              }
              break
          }
          break
        case 4 : // Divisible par 9
          sommePourTroisouNeuf = sommeDesChiffres(a)[0]
          ajoutPourTroisouNeuf = sommePourTroisouNeuf % 9 === 0 ? [0, 9] : [9 - sommePourTroisouNeuf % 9]
          reponse = ajoutPourTroisouNeuf.join(';')

          texteCorr += '<br>Il suffit de savoir quel nombre à un chiffre il faut ajouter à '
          texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
          texteCorr += sommePourTroisouNeuf
          texteCorr += ' pour obtenir un multiple de 9.<br>Or '
          texteCorr += ajoutPourTroisouNeuf.length === 2 ? 'seuls ' : 'seul '
          texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[0] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[0])
          texteCorr += ajoutPourTroisouNeuf.length === 2
            ? ' et ' + sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[1]) + ' sont divisibles '
            : ' est divisible '
          texteCorr += 'par 9 donc ici, '
          texteCorr += ajoutPourTroisouNeuf.length === 2
            ? `les chiffres qui conviennent sont : 0 et 9.<br>${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[0])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[1])} sont divisibles par 9.`

            : `le chiffre qui convient est : ${texteEnCouleurEtGras(ajoutPourTroisouNeuf[0])}.<br>${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[0])}  est divisible par 9.`
          break
        case 5 : // Divisible par 2 et par 3
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre inconnu est le chiffre des unités
              texteCorr += `<br>${numAlpha(0)}Un entier divisible par 2 est pair donc ici, `
              texteCorr += texteEnCouleurEtGras('tout chiffre pair suffit pour que le nombre soit divisible par 2.<br>')
              ajoutPourTroisouNeuf = []
              reponse = []
              sommePourTroisouNeuf = sommeDesChiffres(a)[0]
              ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
              if (ajoutPourTroisouNeuf[0] % 2 === 0) reponse.push(ajoutPourTroisouNeuf[0])
              for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
                ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
                if (ajoutPourTroisouNeuf[ee] % 2 === 0) reponse.push(ajoutPourTroisouNeuf[ee])
              }
              reponse = reponse.join(';')
              texteCorr += `<br>${numAlpha(1)}Pour savoir si le nombre est divisible par 3, il suffit de savoir quel nombre à un chiffre il faut ajouter à `
              texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
              texteCorr += sommePourTroisouNeuf
              texteCorr += ' pour obtenir un multiple de 3.<br>Or seuls '
              for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ee] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ee]) + ', '
              }
              texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
              texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])
              texteCorr += ' sont divisibles par 3 donc ici, les chiffres qui conviennent sont '
              for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
              }
              texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
              texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + ' '
              texteCorr += texteEnCouleurEtGras('pour que le nombre soit divisible par 3.<br>')
              texteCorr += `<br>${numAlpha(2)} Donc les chiffres qui conviennent sont les chiffres en commun à ${numAlpha(0, true)} et ${numAlpha(1, true)}, soit ${texteEnCouleurEtGras(reponse[0])}`
              texteCorr += reponse.length === 2 ? ` et ${texteEnCouleurEtGras(reponse[1])}` : ''
              texteCorr += '.<br>'
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, reponse[0])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, reponse[1])} sont divisibles par 2 et par 3.`
              break
            default : // Le chiffre inconnu n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 2 === 0) { // Le chiffre des unités est pair
                texteCorr += `<br>${numAlpha(0)}Un entier divisible par 2 est pair donc ici, `
                texteCorr += texteEnCouleurEtGras('tout chiffre convient pour que le nombre soit divisible par 2 ') + ' car le nombre est déjà pair.<br>'
                ajoutPourTroisouNeuf = []
                sommePourTroisouNeuf = sommeDesChiffres(a)[0]
                ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
                for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
                  ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
                }
                texteCorr += `<br>${numAlpha(1)}Pour savoir si le nombre est divisible par 3, il suffit de savoir quel nombre à un chiffre il faut ajouter à `
                texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
                texteCorr += sommePourTroisouNeuf
                texteCorr += ' pour obtenir un multiple de 3.<br>Or seuls '
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ee] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])
                texteCorr += ' sont divisibles par 3 donc ici, les chiffres qui conviennent sont '
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + ' '
                texteCorr += texteEnCouleurEtGras('pour que le nombre soit divisible par 3.<br>')
                texteCorr += `<br>${numAlpha(2)} Donc les chiffres qui conviennent sont les chiffres en commun à ${numAlpha(0, true)} et ${numAlpha(1, true)}, soit `
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + '.</br>'
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ee])}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])} sont divisibles par 3.`
                reponse = ajoutPourTroisouNeuf.join(';')
              } else { // Le chiffre des unités est impair
                texteCorr += '<br>Un entier divisible par 2 est pair donc ici, '
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le nombre ne peut pas être pair donc n\'est pas divisible par 2.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 2.`
                reponse = ['Aucun', 'aucun', 'AUCUN']
              }
              break
          }
          break
        case 6 : // Divisibles par 2 et 5
          texteCorr += '<br>Un entier divisible par 2 et par 5 est divisible par 10, or '
          texteCorr += 'unn entier divisible par 10 a son chiffre des unités égal à 0 donc ici, '
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre caché est le chiffre des unités
              texteCorr += texteEnCouleurEtGras('le chiffre 0 suffit.<br>')
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 0)} est divisible par 10.`
              reponse = '0'
              break
            default : // Le chiffre caché n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 10 === 0) { // Le chiffre des unités est 0
                texteCorr += texteEnCouleurEtGras('tout chiffre convient') + ' car le chiffre des unités est déjà égal à 0.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} sont divisibles par 10.`
                reponse = '0;2;4;6;8'
              } else { // Le chiffre des unités n'est pas 0 ou 5
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le chiffre des unités n\'est déjà pas égal à 0.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 10.`
                reponse = ['Aucun', 'aucun', 'AUCUN']
              }
              break
          }
          break
        case 7 : // Divisible par 6
          texteCorr += '<br>Un entier divisible par 6 est un entier divisible par 2 et par 3.'
          texteCorr += `<br>${numAlpha(0)}Un entier divisible par 2 est pair donc ici, `
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre inconnu est le chiffre des unités
              texteCorr += texteEnCouleurEtGras('tout chiffre pair suffit pour que le nombre soit divisible par 2.<br>')
              ajoutPourTroisouNeuf = []
              reponse = []
              sommePourTroisouNeuf = sommeDesChiffres(a)[0]
              ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
              if (ajoutPourTroisouNeuf[0] % 2 === 0) reponse.push(ajoutPourTroisouNeuf[0])
              for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
                ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
                if (ajoutPourTroisouNeuf[ee] % 2 === 0) reponse.push(ajoutPourTroisouNeuf[ee])
              }
              reponse = reponse.join(';')
              texteCorr += `<br>${numAlpha(1)}Pour savoir si le nombre est divisible par 3, il suffit de savoir quel nombre à un chiffre il faut ajouter à `
              texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
              texteCorr += sommePourTroisouNeuf
              texteCorr += ' pour obtenir un multiple de 3.<br>Or seuls '
              for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ee] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ee]) + ', '
              }
              texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
              texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])
              texteCorr += ' sont divisibles par 3 donc ici, les chiffres qui conviennent sont '
              for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
              }
              texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
              texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + ' '
              texteCorr += texteEnCouleurEtGras('pour que le nombre soit divisible par 3.<br>')
              texteCorr += `<br>${numAlpha(2)} Donc les chiffres qui conviennent sont les chiffres en commun à ${numAlpha(0, true)} et ${numAlpha(1, true)}, soit ${texteEnCouleurEtGras(reponse[0])}`
              texteCorr += reponse.length === 2 ? ` et ${texteEnCouleurEtGras(reponse[1])}` : ''
              texteCorr += '.<br>'
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, reponse[0])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, reponse[1])} sont divisibles par 2 et par 3.`
              break
            default : // Le chiffre inconnu n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 2 === 0) { // Le chiffre des unités est pair
                texteCorr += texteEnCouleurEtGras('tout chiffre convient pour que le nombre soit divisible par 2 ') + ' car le nombre est déjà pair.<br>'
                ajoutPourTroisouNeuf = []
                sommePourTroisouNeuf = sommeDesChiffres(a)[0]
                ajoutPourTroisouNeuf[0] = sommePourTroisouNeuf % 3 === 0 ? 0 : 3 - sommePourTroisouNeuf % 3
                for (let ee = 1; ee < (ajoutPourTroisouNeuf[0] === 0 ? 4 : 3); ee++) {
                  ajoutPourTroisouNeuf.push(3 + ajoutPourTroisouNeuf[ee - 1])
                }
                texteCorr += `<br>${numAlpha(1)}Pour savoir si le nombre est divisible par 3, il suffit de savoir quel nombre à un chiffre il faut ajouter à `
                texteCorr += (nombreDeChiffres[i] !== 2 ? sommeDesChiffres(a)[1] + '=' : '')
                texteCorr += sommePourTroisouNeuf
                texteCorr += ' pour obtenir un multiple de 3.<br>Or seuls '
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ee] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += sommePourTroisouNeuf + '+' + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1] + '=' + (sommePourTroisouNeuf + ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])
                texteCorr += ' sont divisibles par 3 donc ici, les chiffres qui conviennent sont '
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + ' '
                texteCorr += texteEnCouleurEtGras('pour que le nombre soit divisible par 3.<br>')
                texteCorr += `<br>${numAlpha(2)} Donc les chiffres qui conviennent sont les chiffres en commun à ${numAlpha(0, true)} et ${numAlpha(1, true)}, soit `
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ee]) + ', '
                }
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2]) + ' et '
                texteCorr += texteEnCouleurEtGras(ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1]) + '.</br>'
                for (let ee = 0; ee < ajoutPourTroisouNeuf.length - 2; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ee])}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 2])} et ${nbAvecChiffreCache.replace(symboleChiffreCache, ajoutPourTroisouNeuf[ajoutPourTroisouNeuf.length - 1])} sont divisibles par 3.`
                reponse = ajoutPourTroisouNeuf.join(';')
              } else { // Le chiffre des unités est impair
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le nombre ne peut pas être pair donc n\'est pas divisible par 2.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 2.`
                reponse = ['Aucun', 'aucun', 'AUCUN']
              }
              break
          }
          break
        case 8 : // Divisible par 10
          texteCorr += '<br>Un entier divisible par 10 a son chiffre des unités égal à 0 donc ici, '
          switch (positionX) {
            case nombreDeChiffres[i] - 1 : // Le chiffre caché est le chiffre des unités
              texteCorr += texteEnCouleurEtGras('le chiffre 0 suffit.<br>')
              texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 0)} est divisible par 10.`
              reponse = '0'
              break
            default : // Le chiffre caché n'est pas le chiffre des unités
              if (a[nombreDeChiffres[i] - 2] % 10 === 0) { // Le chiffre des unités est 0
                texteCorr += texteEnCouleurEtGras('tout chiffre convient') + ' car le chiffre des unités est déjà égal à 0.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} sont divisibles par 10.`
                reponse = '0;1;2;3;4;5;6;7;8;9'
              } else { // Le chiffre des unités n'est pas 0 ou 5
                texteCorr += texteEnCouleurEtGras('aucun chiffre convient') + ' car le chiffre des unités n\'est déjà pas égal à 0.<br>'
                for (let ee = 0; ee < 8; ee++) {
                  texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, ee)}, `
                }
                texteCorr += `${nbAvecChiffreCache.replace(symboleChiffreCache, 8)} et ${nbAvecChiffreCache.replace(symboleChiffreCache, 9)} ne sont pas divisibles par 10.`
                reponse = ['Aucun', 'aucun', 'AUCUN']
              }
              break
          }
          break
      }
      setReponse(this, i, reponse, { formatInteractif: 'texte' })
      texte += this.interactif ? ('<br>' + ajouteChampTexteMathLive(this, i, 'inline largeur25')) : ''

      if (this.questionJamaisPosee(i, nbAvecChiffreCache)) {
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
