import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { combinaisonListesSansChangerOrdre } from '../../modules/outils/listes.js'
import { randint } from '../../modules/outils/entiers.js'
import { choice, shuffle } from '../../modules/outils/arrays.js'
import { listeQuestionsToContenu } from '../../modules/outils/miseEnForme.js'
import { miseEnEvidence } from '../../modules/outils/contextSensitif.js'
import { texNombre } from '../../modules/outils/texNombres.js'
export const titre = 'Encadrer un entier entre deux entiers consécutifs'

/**
* * Encadrer un nombre entier par deux entier consécutifs
* * 6N11-3
* @author Sébastien Lozano
*/

export const uuid = '29b40'
export const ref = '6N11-3'
export default function EncadrerUnEntierParDeuxEntiersConsecutifs () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  this.sup = 1
  if (this.beta) {
    this.nbQuestions = 6
  } else {
    this.nbQuestions = 3
  };

  this.consigne = ''

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  context.isHtml ? this.spacing = 3 : this.spacing = 2
  context.isHtml ? this.spacingCorr = 2.5 : this.spacingCorr = 1.5

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    if (this.beta) {
      typesDeQuestionsDisponibles = [0, 1, 2, 3, 4, 5]
    } else {
      typesDeQuestionsDisponibles = shuffle([choice([0, 1]), choice([2, 3]), choice([4, 5])])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // pour la précision d'encadrement
      let precision

      // selon la precision on veut certains chiffres plus souvant que d'autres ...
      function myNombres (nbChiffres) {
        let sortie = ''
        // on fabrique le nombre à partir de ses chiffres et on veut des cas limites
        let mu, md, mc, mmu, mmd, mmc
        const N = choice([[randint(0, 9, [0]), 0, 0, 0, 0, 0, 0, 0, 0], [randint(0, 9, [0]), 9, 9, 9, 9, 9, 9, 9, 9], [randint(0, 9, [0]), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9), randint(0, 9)]])
        mmc = N[0]
        mmd = N[1]
        mmu = N[2]
        mc = N[3]
        md = N[4]
        mu = N[5]
        const c = N[6]
        const d = N[7]
        const u = N[8]
        switch (nbChiffres) {
          case 4:
            mu = randint(0, 9, [0])
            sortie = mu.toString() + c.toString() + d.toString() + u.toString()
            break
          case 5:
            md = randint(0, 9, [0])
            sortie = md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
            break
          case 6:
            mc = randint(0, 9, [0])
            sortie = mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
            break
          case 7:
            mmu = randint(0, 9, [0])
            sortie = mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
            break
          case 8:
            mmd = randint(0, 9, [0])
            sortie = mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
            break
          case 9:
            mmc = randint(0, 9, [0])
            sortie = mmc.toString() + mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
            break
        };
        return sortie
      };

      this.sup = Number(this.sup) // attention le formulaire renvoie un string, on a besoin d'un number pour le switch !
      switch (this.sup) {
        case 1:
          this.consigne = 'Compléter avec le nombre entier qui précède et le nombre entier qui suit.'
          precision = 1
          break
        case 2:
          this.consigne = 'Compléter avec le multiple de 10 qui précède et le multiple de 10 qui suit.'
          precision = 10
          break
        case 3:
          this.consigne = 'Compléter avec le multiple de 100 qui précède et le multiple de 100 qui suit.'
          precision = 100
          break
      };

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 -->
          nombre: Number(myNombres(4))
        },
        { // case 1 -->
          nombre: Number(myNombres(5))
        },
        { // case 2 -->
          nombre: Number(myNombres(6))
        },
        { // case 3 -->
          nombre: Number(myNombres(7))
        },
        { // case 4 -->
          nombre: Number(myNombres(8))
        },
        { // case 5 -->
          nombre: Number(myNombres(9))
        }
      ]

      // une fonction pour les correction à la precision près
      function encadrementCorr (nb, precision) {
        if (precision === 1) {
          return `$${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision - precision))} < ${texNombre(nb)} < ${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision + precision))}$`
        } else if (precision === 10 || precision === 100) {
          if (nb % precision === 0) {
            return `$${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision - precision))} < ${texNombre(nb)} < ${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision + precision))}$`
          } else {
            return `$${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision))} < ${texNombre(nb)} < ${miseEnEvidence(texNombre(Math.trunc(nb / precision) * precision + precision))}$`
          };
        };
      };

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          $\\ldots < ${texNombre(situations[k].nombre)} < \\ldots$
          `,
          question: '',
          correction: `
          ${encadrementCorr(situations[k].nombre, precision)}
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
        case 2:
          texte = `${enonces[2].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[2].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[2].correction}`
          };
          break
        case 3:
          texte = `${enonces[3].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[3].correction}`
            texte += '             '
            texteCorr = ''
          } else {
            texteCorr = `${enonces[3].correction}`
          };
          break
        case 4:
          texte = `${enonces[4].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[4].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[4].correction}`
          };
          break
        case 5:
          texte = `${enonces[5].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[5].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[5].correction}`
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
  this.besoinFormulaireNumerique = ['Niveau de difficulté', 3, '1 : Encadrer entre deux entiers consécutifs\n2 : Encadrer entre deux multiples consécutifs de 10\n3 : Encadrer entre deux multiples consécutifs de 100']
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
