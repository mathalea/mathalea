/* eslint-disable camelcase */
import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, texNombre } from '../../modules/outils.js'
import { ajouteChampTexte, setReponse } from '../../modules/gestionInteractif'
import { context } from '../../modules/context.js'
export const titre = 'Addition de deux entiers'
export const amcReady = false
export const interactifReady = true
export const amcType = 4 // Question numérique

/**
 * Additionner deux entiers
 * @author Rémi Angot
 * Référence 6C10-4
 */
export default function Exercice_tables_d_additions (max = 20) {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.amcReady = amcReady
  this.interactifReady = interactifReady
  this.amcType = amcType
  this.consigne = 'Calculer'
  this.sup = max // Le paramètre accessible à l'utilisateur sera la valeur maximale
  this.spacing = 2
  this.tailleDiaporama = 100

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = randint(2, this.sup)
      b = randint(2, this.sup)
      texte = `$ ${texNombre(a)} + ${texNombre(b)} = \\dotfill $`
      texteCorr = `$ ${texNombre(a)} + ${texNombre(b)} = ${texNombre(a + b)} $`
      setReponse(this, i, a + b)
      if (context.isHtml && this.interactif) {
        texte = texte.replace('\\dotfill', '')
        texte += ajouteChampTexte(this, i)
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
  this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
}
