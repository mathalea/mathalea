import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, shuffle, combinaisonListesSansChangerOrdre, texNombre, miseEnEvidence, texteEnCouleurEtGras } from '../../modules/outils.js'
export const titre = 'Ranger une liste de nombres entiers dans l\'ordre croissant ou décroissant'

/**
* * Ranger une liste de nombres dans l'odre croissant ou décroissant
* * 6N11-4
* @author Sébastien Lozano
*/

export const uuid = '3bba9'
export const ref = '6N11-4'
export default function RangerOrdreCroissantDecroissant () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  this.sup = 1
  if (this.beta) {
    this.nbQuestions = 2
  } else {
    this.nbQuestions = 2
  };

  // this.consigne = `Classer les nombres suivants dans l'ordre indiqué.`;

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.beta) {
      typesDeQuestionsDisponibles = [0, 1]
    } else {
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = [0, 1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // les chiffres
      const c1 = randint(1, 9)
      const c2 = randint(1, 9, [c1])
      const c3 = randint(1, 9, [c1, c2])
      const c4 = randint(1, 9, [c1, c2, c3])
      const c5 = randint(1, 9, [c1, c2, c3, c4])

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 -->
          ordre: 'croissant',
          symbole: `$${miseEnEvidence('<')}$`,
          n1: Number(c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString()),
          n2: Number(c1.toString() + c3.toString() + c2.toString() + c4.toString() + c5.toString()),
          n3: Number(c1.toString() + c2.toString() + c5.toString() + c4.toString() + c3.toString()),
          n4: Number(c1.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n5: Number('1'.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n6: Number(c1.toString() + c2.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString())
        },
        { // case 1 -->
          ordre: 'décroissant',
          symbole: `$${miseEnEvidence('>')}$`,
          n1: Number(c1.toString() + c2.toString() + c3.toString() + c4.toString() + c5.toString()),
          n2: Number(c1.toString() + c3.toString() + c2.toString() + c4.toString() + c5.toString()),
          n3: Number(c1.toString() + c2.toString() + c5.toString() + c4.toString() + c3.toString()),
          n4: Number(c1.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n5: Number('1'.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString()),
          n6: Number(c1.toString() + c2.toString() + randint(0, 9).toString() + randint(0, 9).toString() + randint(0, 9).toString())
        }
      ]

      // une fonction pour gérer l'ordre
      function myOrdre (ordre, tab) {
        tab.sort((a, b) => a - b)
        switch (ordre) {
          case 'croissant':
            return tab
          case 'décroissant':
            return tab.reverse()
        };
      };

      const enonces = []
      let nombres = []
      let nombresRanges = []
      for (let k = 0; k < situations.length; k++) {
        nombres = shuffle([situations[k].n1, situations[k].n2, situations[k].n3, situations[k].n4, situations[k].n5, situations[k].n6])
        nombresRanges = []
        nombres.forEach(element => {
          nombresRanges.push(element)
        })
        myOrdre(situations[k].ordre, nombresRanges)
        enonces.push({
          enonce: `Classer les nombres suivants dans l'ordre ${situations[k].ordre} :<br>
        $${texNombre(nombres[0])}$   ;   $${texNombre(nombres[1])}$   ;   $${texNombre(nombres[2])}$   ;   $${texNombre(nombres[3])}$   ;   $${texNombre(nombres[4])}$   ;   $${texNombre(nombres[5])}$          
        `,
          question: '',
          correction: `Les nombres rangés dans l'ordre ${texteEnCouleurEtGras(situations[k].ordre)} :<br>
        $${texNombre(nombresRanges[0])}$   ${situations[k].symbole}   $${texNombre(nombresRanges[1])}$   ${situations[k].symbole}   $${texNombre(nombresRanges[2])}$   ${situations[k].symbole}   $${texNombre(nombresRanges[3])}$   ${situations[k].symbole}   $${texNombre(nombresRanges[4])}$   ${situations[k].symbole}   $${texNombre(nombresRanges[5])}$
        `
        })
      };

      // autant de case que d'elements dans le tableau des situations
      switch (listeTypeDeQuestions[i]) {
        case 0:
          texte = `${enonces[0].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
        case 1:
          texte = `${enonces[1].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[1].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[1].correction}`
          };
          break
      };

      if (this.listeQuestions.indexOf(texte) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
