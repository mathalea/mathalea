import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, prenom, prenomF, prenomM, miseEnEvidence } from '../../modules/outils.js'

export const titre = 'Partager une quantité en deux ou trois parts selon un ratio donné.'

/**
 * Partager une quantité en deux ou trois parts selon un ratio donné.
 * @author Guillaume Valmont
 * Référence 5P12
 * Date de publication : 24/07/2021
*/
export default function PartagerSelonUnRatio () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.nbQuestions = 1
  this.nbCols = 2
  this.nbColsCorr = 2
  this.sup = 1
  this.correctionDetailleeDisponible = true

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    for (let i = 0, texte, texteCorr, prenom1, prenom2, prenom3, quantite1, quantite2, quantite3, facteur, total, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      prenom1 = prenomF()
      prenom2 = prenomM()
      prenom3 = prenom()
      quantite1 = randint(2, 9)
      quantite2 = randint(2, 9, [quantite1])
      quantite3 = randint(2, 9, [quantite1, quantite2])
      facteur = randint(2, 9)
      if (this.sup.toString() === '1') { // Partage en deux parts
        total = (quantite1 + quantite2) * facteur
        texte = `${prenom1} et ${prenom2} veulent se partager leurs ${total} bonbons en deux parts selon le ratio ${quantite1} : ${quantite2}. <br>`
        texte += 'Combien chacun recevra-t-il de bonbons ?'
        texteCorr = ''
        if (this.correctionDetaillee) {
          texteCorr += `À chaque fois que ${prenom1} en reçoit ${quantite1}, ${prenom2} en reçoit ${quantite2}. Ce qui fait : <br>`
        }
        texteCorr += `$${quantite1} + ${quantite2} = ${quantite1 + quantite2}$ <br>`
        if (this.correctionDetaillee) {
          texteCorr += `En fait, à chaque passage, ils en reçoivent ${quantite1 + quantite2} au total.<br>`
          texteCorr += `Pour se partager les ${total} bonbons, ils devront faire combien de passages ? <br>`
        }
        texteCorr += `$${total} \\div ${quantite1 + quantite2} = ${facteur}$ <br>`
        if (this.correctionDetaillee) {
          texteCorr += `Ils devront faire ${facteur} passages et à chaque passage, ${prenom1} recevra ${quantite1} bonbons. <br>`
          texteCorr += `Au total, elle recevra $${quantite1} \\times ${facteur} = ${quantite1 * facteur}$ bonbons. <br>`
          texteCorr += `De la même façon, ${prenom2} recevra $${quantite2} \\times ${facteur} = ${quantite2 * facteur}$ bonbons. <br>`
          texteCorr += 'On peut aussi faire ces calculs en une seule ligne : <br>'
        }
        texteCorr += `$\\text{${prenom1}} : \\text{${prenom2}} = ${quantite1} : ${quantite2} = ${quantite1} ${miseEnEvidence('\\times ' + facteur)} : ${quantite2} ${miseEnEvidence('\\times ' + facteur)} = ${quantite1 * facteur} : ${quantite2 * facteur} $<br>`
        texteCorr += `${prenom1} recevra ${quantite1 * facteur} bonbons et ${prenom2} en recevra ${quantite2 * facteur}.`
      } else { // Partage en trois parts
        total = (quantite1 + quantite2 + quantite3) * facteur
        texte = `${prenom1}, ${prenom2} et ${prenom3} veulent se partager leurs ${total} bonbons en trois parts selon le ratio ${quantite1} : ${quantite2} : ${quantite3}. <br>`
        texte += 'Combien chacun recevra-t-il de bonbons ?'
        texteCorr = ''
        if (this.correctionDetaillee) {
          texteCorr += `À chaque fois que ${prenom1} en reçoit ${quantite1}, ${prenom2} en reçoit ${quantite2} et ${prenom3} en reçoit ${quantite3}. Ce qui fait : <br>`
        }
        texteCorr += `$${quantite1} + ${quantite2} + ${quantite3} = ${quantite1 + quantite2 + quantite3}$ <br>`
        if (this.correctionDetaillee) {
          texteCorr += `En fait, à chaque passage, ils en reçoivent ${quantite1 + quantite2 + quantite3} au total.<br>`
          texteCorr += `Pour se partager les ${total} bonbons, ils devront faire combien de passages ? <br>`
        }
        texteCorr += `$${total} \\div ${quantite1 + quantite2 + quantite3} = ${facteur}$ <br>`
        if (this.correctionDetaillee) {
          texteCorr += `Ils devront faire ${facteur} passages et à chaque passage, ${prenom1} recevra ${quantite1} bonbons. <br>`
          texteCorr += `Au total, elle recevra $${quantite1} \\times ${facteur} = ${quantite1 * facteur}$ bonbons. <br>`
          texteCorr += `De la même façon, ${prenom2} recevra $${quantite2} \\times ${facteur} = ${quantite2 * facteur}$ bonbons et ${prenom3} recevra $${quantite3} \\times ${facteur} = ${quantite3 * facteur}$ bonbons. <br>`
          texteCorr += 'On peut aussi faire ces calculs en une seule ligne : <br>'
        }
        texteCorr += `$\\text{${prenom1}} : \\text{${prenom2}} : \\text{${prenom3}} = ${quantite1} : ${quantite2} : ${quantite3} = ${quantite1} ${miseEnEvidence('\\times ' + facteur)} : ${quantite2} ${miseEnEvidence('\\times ' + facteur)} : ${quantite3} ${miseEnEvidence('\\times ' + facteur)} = ${quantite1 * facteur} : ${quantite2 * facteur} : ${quantite3 * facteur} $<br>`
        texteCorr += `${prenom1} recevra ${quantite1 * facteur} bonbons, ${prenom2} en recevra ${quantite2 * facteur} et ${prenom3} en recevra ${quantite3 * facteur}.`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Partager en deux parts\n2 : Partager en trois parts']
}
