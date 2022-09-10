import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, prenom, prenomF, prenomM, miseEnEvidence, objet } from '../../modules/outils.js'

export const titre = 'Partager une quantité en deux ou trois parts selon un ratio donné'

/**
 * Partager une quantité en deux ou trois parts selon un ratio donné.
 * @author Guillaume Valmont
 * Référence 5P12
 * Date de publication : 24/07/2021
*/
export const uuid = '60910'
export const ref = '5P12'
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
    this.autoCorrection = []

    for (let i = 0, texte, texteCorr, objet1, prenom1, prenom2, prenom3, quantite1, quantite2, quantite3, facteur, total, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      objet1 = objet()
      prenom1 = prenomF()
      prenom2 = prenomM()
      prenom3 = prenom()
      quantite1 = randint(2, 9)
      quantite2 = randint(2, 9, [quantite1])
      quantite3 = randint(2, 9, [quantite1, quantite2])
      facteur = randint(2, 9)
      if (this.sup.toString() === '1') { // Partage en deux parts
        total = (quantite1 + quantite2) * facteur
        texte = `${prenom1} et ${prenom2} veulent se partager leurs $${total}$ ${objet1} en deux parts selon le ratio $${quantite1} : ${quantite2}$. <br>`
        texte += `Combien chacun recevra-t-il de ${objet1} ?`
        texteCorr = ''
        if (this.correctionDetaillee) {
          texteCorr += `À chaque fois que ${prenom1} en reçoit $${quantite1}$, ${prenom2} en reçoit $${quantite2}$. Ce qui fait $${quantite1} + ${quantite2} = ${miseEnEvidence(quantite1 + quantite2)}$. <br>`
        } else {
          texteCorr += `$${quantite1} + ${quantite2} = ${miseEnEvidence(quantite1 + quantite2)}$ <br>`
        }
        if (this.correctionDetaillee) {
          texteCorr += `En fait, à chaque passage, ils en reçoivent $${miseEnEvidence(quantite1 + quantite2)}$ au total.<br>`
          texteCorr += `<br>Calculons le nombre de passages nécessaires pour se partager les $${total}$ ${objet1} :<br>`
        }
        texteCorr += `$${total} ${miseEnEvidence('\\div')} ${miseEnEvidence(quantite1 + quantite2)} = ${miseEnEvidence(facteur)}$`
        if (this.correctionDetaillee) {
          texteCorr += `.<br><br>Ils devront faire $${miseEnEvidence(facteur)}$ passages et à chaque passage, ${prenom1} recevra $${quantite1}$ ${objet1}. <br>`
          texteCorr += `Au total, elle recevra $${quantite1} ${miseEnEvidence('\\times ' + facteur)} = ${quantite1 * facteur}$ ${objet1}. <br>`
          texteCorr += `De la même façon, ${prenom2} recevra $${quantite2} ${miseEnEvidence('\\times ' + facteur)} = ${quantite2 * facteur}$ ${objet1}. <br>`
        } else {
          texteCorr += `<br>$\\text{${prenom1}} : \\text{${prenom2}} = ${quantite1} : ${quantite2} = ${quantite1 * facteur} : ${quantite2 * facteur}  \\text{ (en multipliant par }${miseEnEvidence(facteur)}\\text{)}$ <br>`
        }
        texteCorr += `<br>${prenom1} recevra $${quantite1 * facteur}$ ${objet1} et ${prenom2} en recevra $${quantite2 * facteur}$. <br>`
      } else { // Partage en trois parts
        total = (quantite1 + quantite2 + quantite3) * facteur
        texte = `${prenom1}, ${prenom2} et ${prenom3} veulent se partager leurs $${total}$ ${objet1} en trois parts selon le ratio $${quantite1} : ${quantite2} : ${quantite3}$. <br>`
        texte += `Combien chacun recevra-t-il de ${objet1} ?`
        texteCorr = ''
        if (this.correctionDetaillee) {
          texteCorr += `À chaque fois que ${prenom1} en reçoit $${quantite1}$, ${prenom2} en reçoit $${quantite2}$ et ${prenom3} en reçoit $${quantite3}$. Ce qui fait $${quantite1} + ${quantite2} + ${quantite3} = ${miseEnEvidence(quantite1 + quantite2 + quantite3)}$. <br>`
        } else {
          texteCorr += `$${quantite1} + ${quantite2} + ${quantite3} = ${miseEnEvidence(quantite1 + quantite2 + quantite3)}$ <br>`
        }
        if (this.correctionDetaillee) {
          texteCorr += `En fait, à chaque passage, ils en reçoivent $${miseEnEvidence(quantite1 + quantite2 + quantite3)}$ au total.<br>`
          texteCorr += `<br>Calculons le nombre de passages nécessaires pour se partager les $${total}$ ${objet1} :<br>`
        }
        texteCorr += `$${total} ${miseEnEvidence('\\div')} ${miseEnEvidence(quantite1 + quantite2 + quantite3)} = ${miseEnEvidence(facteur)}$`
        if (this.correctionDetaillee) {
          texteCorr += `.<br><br>Ils devront faire $${miseEnEvidence(facteur)}$ passages et à chaque passage, ${prenom1} recevra $${quantite1}$ ${objet1}. <br>`
          texteCorr += `Au total, elle recevra $${quantite1} ${miseEnEvidence('\\times ' + facteur)} = ${quantite1 * facteur}$ ${objet1}. <br>`
          texteCorr += `De la même façon, ${prenom2} recevra $${quantite2} ${miseEnEvidence('\\times ' + facteur)} = ${quantite2 * facteur}$ ${objet1} et ${prenom3} recevra $${quantite3} ${miseEnEvidence('\\times ' + facteur)} = ${quantite3 * facteur}$ ${objet1}. <br>`
        } else {
          texteCorr += `<br>$\\text{${prenom1}} : \\text{${prenom2}} : \\text{${prenom3}} = ${quantite1 * facteur} : ${quantite2 * facteur} : ${quantite3 * facteur} \\text{ (en multipliant par }${miseEnEvidence(facteur)}\\text{)} $ <br>`
        }
        texteCorr += `<br>${prenom1} recevra $${quantite1 * facteur}$ ${objet1}, ${prenom2} en recevra $${quantite2 * facteur}$ et ${prenom3} en recevra $${quantite3 * facteur}$.`
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
