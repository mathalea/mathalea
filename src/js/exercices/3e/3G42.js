import Exercice from '../Exercice.js'
import { mathalea2d } from '../../modules/2dGeneralites.js'
import { randint, listeQuestionsToContenu, combinaisonListes, texteExposant, texteGras, stringNombre, texNombre, range1, contraindreValeur, compteOccurences, choice } from '../../modules/outils.js'
import { point3d, vecteur3d, sphere3d, cylindre3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import Decimal from 'decimal.js/decimal.mjs'
import Grandeur from '../../modules/Grandeur.js'
import { context } from '../../modules/context.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const titre = 'Volume d\'une boule'

/**
* Calculer le volume d'une boule
* @author Erwan DUPLESSY
* 3G42
* date : 2021/02/09
*/

export const uuid = '8c803'
export const ref = '3G42'
export default function VolumeBoule () {
  Exercice.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcReady = amcReady
  this.amcType = amcType
  // this.consigne = 'On arrondira les résultats à ' + nombreDecimal(0.1) + ` ${choixUnites}` + texteExposant(3) + '. <br>'
  this.video = 'YQF7CBY-uEk'
  this.nbQuestions = 3 // Ici le nombre de questions
  this.sup = '1-2-4'
  const unites = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']
  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []

    let listeTypeDeQuestions = []
    if (!this.sup) { // Si aucune liste n'est saisie
      listeTypeDeQuestions = range1(4)
    } else {
      if (!isNaN(this.sup)) { // Si c'est un nombre c'est qu'il y a qu'un problème
        listeTypeDeQuestions[0] = contraindreValeur(1, 5, parseInt(this.sup), 4)
      } else {
        listeTypeDeQuestions = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeTypeDeQuestions.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeTypeDeQuestions[i] = contraindreValeur(1, 5, parseInt(listeTypeDeQuestions[i]), 5) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeTypeDeQuestions, 5)) listeTypeDeQuestions = range1(4)
    listeTypeDeQuestions = combinaisonListes(listeTypeDeQuestions, this.nbQuestions)
    for (let i = 0, r, d, A, rayon, O, B, OO, o, R, s, c, normal, texte, texteCorr, reponse, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      const choixUnites = choice(unites)
      switch (listeTypeDeQuestions[i]) {
        case 1:
          r = randint(2, 30)
          reponse = new Decimal(r).pow(3).mul(Decimal.acos(-1)).mul(4).div(3).toDP(1)
          texte += 'Calculer le volume' + (context.isAmc ? `, en ${choixUnites}` + texteExposant(3) + ',' : '') + ` d'une boule de rayon ${r} ${choixUnites}. Arrondir au dixième. `
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${r} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3) + '. <br>')
          break

        case 2:
          d = randint(2, 30)
          reponse = new Decimal(d).pow(3).mul(Decimal.acos(-1)).mul(4).div(3).toDP(1)
          texte += 'Calculer le volume' + (context.isAmc ? `, en ${choixUnites}` + texteExposant(3) + ',' : '') + ` d'une boule de diamètre ${2 * d} ${choixUnites}. Arrondir au dixième. `
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `Le rayon de la boule est la moitié de son diamètre soit : ${d} ${choixUnites}. <br>`
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${d} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3) + '. <br>')
          break

        case 3:
          A = randint(2, 30)
          texte += 'Calculer le volume' + (context.isAmc ? `, en ${choixUnites}` + texteExposant(3) + ',' : '') + ` d'une boule d'aire ${A} cm². Arrondir au dixième.`
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += 'Il faut donc trouver le rayon de la boule. <br>'
          texteCorr += 'L\'aire d\'une boule est donnée par la formule : $A = 4\\pi r^2$. <br>'
          texteCorr += `On a donc l'égalité : $${A} = 4\\pi r^2$. `
          texteCorr += `On en déduit : $r^2 = \\dfrac{${A}}{4\\pi}$. <br>`
          texteCorr += `Et, comme $r$ est positif : $r=\\sqrt{\\dfrac{${A}}{4\\pi}}$. <br>`
          rayon = new Decimal(A).div(Decimal.acos(-1).mul(4)).sqrt()
          reponse = Decimal.acos(-1).mul(4 * rayon ** 3).div(3).toDP(1)
          texteCorr += 'On obtient donc une valeur approchée de $r$ : $r \\approx ' + texNombre(rayon, 2) + '$. <br>'
          texteCorr += 'On a donc : $V \\approx \\dfrac{4}{3} \\times \\pi \\times (' + texNombre(rayon, 2) + ` \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3) + '. <br>')
          break

        case 4:
          rayon = randint(2, 30)
          texte += `Une boîte cylindrique de ${2 * rayon} ${choixUnites} de diamètre et de ${2 * rayon} ${choixUnites} de hauteur contient une boule de diamètre ${2 * rayon} ${choixUnites}. <br>`
          texte += 'Calculer le volume' + (context.isAmc ? `, en ${choixUnites}` + texteExposant(3) + ',' : '') + ' dans la boîte laissée libre par la boule. Arrondir au dixième.'

          texteCorr += 'Représentons la situation par un petit schéma : <br>'
          O = point3d(0, 0, 0)
          B = point3d(2.5, 0, 0)
          OO = point3d(0, 0, 5)
          o = point3d(0, 0, 2.5)
          R = vecteur3d(O, B)
          normal = vecteur3d(0, 0, 1)
          s = sphere3d(o, 2.5, 5, 5, 'blue')
          c = cylindre3d(O, OO, normal, R, R, 'black')
          reponse = Decimal.acos(-1).mul(2 * rayon ** 3).div(3).toDP(1)
          texteCorr += '<br>' + mathalea2d({ xmin: -5, max: 9, ymin: -1.5, ymax: 6, scale: 0.8 }, ...s.c2d, ...c.c2d) + '<br>'
          texteCorr += 'Méthode : on calcule le volume du cylindre auquel on va retrancher le volume de la boule. <br>'
          texteCorr += 'Le volume du cylindre est : $V_c = \\pi r^2 h$ ; et celui de la boule est : $V_b = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `Le rayon du cylindre est la moitié de son diamètre, soit ${rayon} ${choixUnites}, et sa hauteur est ${2 * rayon} ${choixUnites}. <br>`
          texteCorr += `Le rayon de la boule est la moitié de son diamètre soit : ${rayon} ${choixUnites}. <br>`
          texteCorr += `Ici, le volume du cylindre est donc : $V_c = \\pi \\times (${rayon} \\text{ ${choixUnites}})^2 \\times (${2 * rayon}\\text{ ${choixUnites}})$. <br>`
          texteCorr += `Le volume de la boule est : $V_b = \\dfrac{4}{3} \\times \\pi \\times (${rayon} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += `Le volume cherché est donc donné par : $\\pi \\times (${rayon} \\text{ ${choixUnites}})^2 \\times (${2 * rayon}\\text{ ${choixUnites}}) - \\dfrac{4}{3} \\times \\pi \\times (${rayon} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += texteGras('Le volume cherché est environ : ' + stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3) + '. <br>')
          break
      }
      setReponse(this, i, new Grandeur(reponse.toNumber(), `${choixUnites}^3`), { formatInteractif: 'unites' })
      texte += ajouteChampTexteMathLive(this, i, 'largeur15 inline unites[Longueurs,Aires,Volumes]')
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
  // this.besoinFormulaireNumerique = ['Type de questions', 5, '1 : À partir du rayon\n2 : À partir du rayon ou du diamètre\n3 : À partir du rayon, du diamètre ou de l\'aire\n4 : À partir du rayon, du diamètre, de l\'aire ou en résolvant un problème\n5 : Mélange']
  this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : À partir du rayon\n2 : À partir du diamètre\n3 : À partir de l\'aire\n4 : En résolvant un problème\n5 : Mélange']
} // Fin de l'exercice.
