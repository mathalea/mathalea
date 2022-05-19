import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, combinaisonListes, nombreDecimal, texteExposant, calcul, texteGras } from '../../modules/outils.js'
import { mathalea2d } from '../../modules/2d.js'
import { point3d, vecteur3d, sphere3d, cylindre3d } from '../../modules/3d.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const titre = 'Volume dune boule'

/**
* Calculer le volume d'une boule
* @author Erwan DUPLESSY
* 3G42
* date : 2021/02/09
*/

export default function VolumeBoule () {
  Exercice.call(this)
  this.titre = titre
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.amcReady = amcReady
  this.amcType = amcType
  this.consigne = 'On arrondira les résultats à ' + nombreDecimal(0.1) + ' cm' + texteExposant(3) + '. <br>'
  this.video = 'YQF7CBY-uEk'
  this.nbQuestions = 4 // Ici le nombre de questions
  this.nbQuestionsModifiable = true // Active le formulaire nombre de questions
  this.nbCols = 1 // Le nombre de colonnes dans l'énoncé LaTeX
  this.nbColsCorr = 1// Le nombre de colonne pour la correction LaTeX
  this.pasDeVersionLatex = false // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
  this.pas_de_version_HMTL = false // mettre à true si on ne veut pas de l'exercice en ligne
  this.sup = 1

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  this.nouvelleVersion = function () {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
    this.sup = Number(this.sup)
    this.listeQuestions = [] // tableau contenant la liste des questions
    this.listeCorrections = []
    this.autoCorrection = []

    let typesDeQuestionsDisponibles = [] // tableau à compléter par valeurs possibles des types de questions
    typesDeQuestionsDisponibles = [1, 2, 3, 4]
    let listeTypeDeQuestions = []
    typesDeQuestionsDisponibles.splice(this.sup, 5 - parseInt(this.sup))
    listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    let r, d, A, rayon, diam, O, B, OO, o, R, s, c, normal, dia1
    // boucle pour fabriquer les nbQuestions questions en s'assurant que si il n'y a pas nbQuestions différentes
    // La boucle s'arrête après 50 tentatives.
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      let typesDeQuestions = []
      typesDeQuestions = listeTypeDeQuestions[i]

      switch (typesDeQuestions) {
        case 1:
          r = randint(2, 30)
          texte += `Calculer le volume d'une boule de rayon ${r} cm. `
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${r} \\text{ cm})^3$. <br>`
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + nombreDecimal(4 / 3 * Math.PI * r * r * r, 1) + ' cm' + texteExposant(3) + '. <br>')
          setReponse(this, i, calcul(4 / 3 * Math.PI * r * r * r, 1))
          break

        case 2:
          d = randint(2, 30)
          texte += `Calculer le volume d'une boule de diamètre ${2 * d} cm. `
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `Le rayon de la boule est la moitié de son diamètre soit : ${d} cm. <br>`
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${d} \\text{ cm})^3$. <br>`
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + nombreDecimal(4 / 3 * Math.PI * d * d * d, 1) + ' cm' + texteExposant(3) + '. <br>')
          setReponse(this, i, calcul(4 / 3 * Math.PI * d * d * d, 1))
          break

        case 3:
          A = randint(2, 30)
          texte += `Calculer le volume d'une boule d'aire ${A} cm². `
          texteCorr += 'Le volume d\'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += 'Il faut donc trouver le rayon de la boule. <br>'
          texteCorr += 'L\'aire d\'une boule est donnée par la formule : $A = 4\\pi r^2$. <br>'
          texteCorr += `On a donc l'égalité : $${A} = 4\\pi r^2$. `
          texteCorr += `On en déduit : $r^2 = \\dfrac{${A}}{4\\pi}$. <br>`
          texteCorr += `Et, comme $r$ est positif : $r=\\sqrt{\\dfrac{${A}}{4\\pi}}$. <br>`
          rayon = calcul(Math.sqrt(A / (4 * Math.PI)))
          texteCorr += 'On obtient donc une valeur approchée de $r$ : $r \\approx ' + nombreDecimal(rayon) + '$. <br>'
          texteCorr += 'On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (' + nombreDecimal(rayon) + ' \\text{ cm})^3$. <br>'
          texteCorr += texteGras('Le volume de la boule est donc environ : ' + nombreDecimal(4 / 3 * Math.PI * rayon * rayon * rayon, 1) + ' cm' + texteExposant(3) + '. <br>')
          setReponse(this, i, calcul(4 / 3 * Math.PI * rayon * rayon * rayon, 1))
          break

        case 4:
          diam = randint(2, 30)
          texte += `Un boîte cylindrique de ${2 * diam} cm de diamètre et de ${2 * diam} cm de hauteur contient une boule de diamètre ${2 * diam} cm. <br>`
          texte += 'Calculer le volume dans la boîte laissée libre par la boule. '

          texteCorr += 'Représentons la situation par un petit schéma : <br>'
          O = point3d(0, 0, 0)
          B = point3d(2.5, 0, 0)
          OO = point3d(0, 0, 5)
          o = point3d(0, 0, 2.5)
          R = vecteur3d(O, B)
          normal = vecteur3d(0, 0, 1)
          s = sphere3d(o, 2.5, 5, 5, 'blue')
          c = cylindre3d(O, OO, normal, R, R, 'black')
          // context.anglePerspective=20;
          texteCorr += '<br>' + mathalea2d({ xmin: -5, max: 9, ymin: -1.5, ymax: 6, scale: 0.8 }, ...s.c2d, ...c.c2d) + '<br>'
          texteCorr += 'Méthode : on calcule le volume du cylindre auquel on va retrancher le volume de la boule. <br>'
          texteCorr += 'Le volume du cylindre est : $V_c = \\pi r^2 h$ ; et celui de la boule est : $V_b = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `Le rayon du cylindre est la moitié de son diamètre, soit ${diam} cm, et sa hauteur est ${2 * diam} cm. <br>`
          texteCorr += `Le rayon de la boule est la moitié de son diamètre soit : ${diam} cm. <br>`
          texteCorr += `Ici, le volume du cylindre est donc : $V_c = \\pi \\times (${diam} \\text{ cm})^2 \\times (${2 * diam}\\text{ cm})$. <br>`
          texteCorr += `Le volume de la boule est : $V_b = \\dfrac{4}{3} \\times \\pi \\times (${diam} \\text{ cm})^3$. <br>`
          texteCorr += `Le volume cherché est donc donné par : $\\pi \\times (${diam} \\text{ cm})^2 \\times (${2 * diam}\\text{ cm}) - \\dfrac{4}{3} \\times \\pi \\times (${diam} \\text{ cm})^3$. <br>`
          texteCorr += texteGras('Le volume cherché est environ : ' + nombreDecimal(Math.PI * diam * diam * 2 * diam - 4 / 3 * Math.PI * diam * diam * diam, 1) + ' cm' + texteExposant(3) + '. <br>')
          setReponse(this, i, calcul(Math.PI * diam * diam * 2 * diam - 4 / 3 * Math.PI * diam * diam * dia1))
          break
      }
      texte += ajouteChampTexteMathLive(this, i)
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
  this.besoinFormulaireNumerique = ['Type de questions', 4, ' 1 : À partir du rayon\n 2 : À partir du rayon ou du diamètre\n 3 : À partir du rayon, du diamètre ou de laire\n 4 : À partir du rayon, du diamètre, de laire ou en résolvant un problème']
} // Fin de l'exercice.
