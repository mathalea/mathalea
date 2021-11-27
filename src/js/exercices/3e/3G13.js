import Exercice from '../Exercice.js'
import { randint, listeQuestionsToContenu, choisitLettresDifferentes, texNombrec, combinaisonListes } from '../../modules/outils.js'
export const titre = 'Homothétie (calculs)'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '27/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculer le rapport ou une longueur dans une homothétie.
 * @author Frédéric PIOU
 * Référence
*/
export default function calculHomothetie () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.consigne = ''
  this.nbQuestions = 3 // Nombre de questions par défaut
  this.nbCols = 0 // Uniquement pour la sortie LaTeX
  this.nbColsCorr = 0 // Uniquement pour la sortie LaTeX
  this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
  this.video = '' // Id YouTube ou url

  this.nouvelleVersion = function (numeroExercice) {
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    const typeQuestionsDisponibles = ['rapport', 'image', 'antécédent']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const lettres = choisitLettresDifferentes(3, ['P', 'Q', 'U', 'V', 'W', 'X', 'Y', 'Z'])
      const A = lettres[0]
      const hA = lettres[1]
      const O = lettres[2]
      let k = randint(15, 40) / 10
      let OA = randint(1, 99) / 10
      const hOA = texNombrec(k * OA)
      k = texNombrec(k)
      OA = texNombrec(OA)
      const donnees = [String.raw`${O}${hA}=${hOA}\text{ cm}`, String.raw`${O}${A}=${OA}\text{ cm}`]
      const melange = combinaisonListes([0, 1])
      const donnee1 = donnees[melange[0]]
      const donnee2 = donnees[melange[1]]
      switch (listeTypeQuestions[i]) {
        case 'rapport':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie de rapport positif et de centre $${O}$ tel que $ {${donnee1}}$ et $ {${donnee2}}$.
                <br>
                Calculer le rapport $k$ de cette homothétie.
                `
          texteCorr = String.raw`
                $k=\dfrac{${O}${hA}}{${O}${A}}=\dfrac{${hOA}}{${OA}}=${k}$
                `
          break
        case 'image':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie de centre $${O}$ et de rapport $${k}$ tel que $ {${O}${A}=${OA}\text{ cm}}$.
                <br>
                Calculer $${O}${hA}$.
                `
          texteCorr = String.raw`
                $${O}${hA}=${k} \times ${O}${A}$
                <br>
                Donc $${O}${hA}= ${k} \times ${OA} =  ${hOA}~\text{cm}$
                `
          break
        case 'antécédent':
          texte = String.raw`
                $${hA}$ est l'image de $${A}$ par une homothétie de centre $${O}$ et de rapport $${k}$ tel que $ {${O}${hA}=${hOA}\text{ cm}}$.
                <br>
                Calculer $${O}${A}$.
                `
          texteCorr = String.raw`
                $${O}${hA}=${k} \times ${O}${A}$
                <br>
                Donc $${O}${A}=\dfrac{${O}${hA}}{${k}}=\dfrac{${hOA}}{${k}} = ${OA}~\text{cm}$
                `
          break
      }
      if (this.questionJamaisPosee(i, k, OA, melange)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
