import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, shuffle, combinaisonListesSansChangerOrdre, texNombre, miseEnEvidence } from '../../modules/outils.js'
export const titre = 'Trouver le chiffre des ... et le nombre de ...'

/**
 * * Donner le chiffre des ... le nombre de ...
 * * 6N10-3
 * @author Sébastien Lozano
 */

export default function chiffreNombreDe () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  this.sup = 1
  if (this.beta) {
    this.nbQuestions = 6
  } else {
    this.nbQuestions = 6
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
      // typesDeQuestionsDisponibles = shuffle([choice([1,3]),choice([2,4]),0]);
      typesDeQuestionsDisponibles = shuffle([0, 1, 2, 3, 4, 5])
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées

    // let listeTypeDeQuestions  = combinaisonListes(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const mmc = randint(0, 9, [0])
      const mmd = randint(0, 9, [mmc])
      const mmu = randint(0, 9, [mmc, mmd])
      const mc = randint(0, 9, [mmu, mmd, mmc])
      const md = randint(0, 9, [mmu, mmd, mmc, mc])
      const mu = randint(0, 9, [mmu, mmd, mmc, mc, md])
      const c = randint(0, 9, [mmu, mmd, mmc, mu, md, mc])
      const d = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c])
      const u = randint(0, 9, [mmu, mmd, mmc, mu, md, mc, c, d])
      // let nb = randint(100000000,999999999);
      // let nbStr = nb.toString();
      const nbStr = mmc.toString() + mmd.toString() + mmu.toString() + mc.toString() + md.toString() + mu.toString() + c.toString() + d.toString() + u.toString()
      const nb = Number(nbStr)
      const cdu = ['unites', 'dizaines', 'centaines']
      const chiffreNombre = {
        chiffre: {
          unites: {
            unites: { determinant: 'des', cdu: ['unités', ''], rangs: [8] },
            dizaines: { determinant: 'des', cdu: ['dizaines', ''], rangs: [7] },
            centaines: { determinant: 'des', cdu: ['centaines', ''], rangs: [6] }
          },
          milliers: {
            unites: { determinant: 'des', cdu: ['unités de milliers', ''], rangs: [5] },
            dizaines: { determinant: 'des', cdu: ['dizaines de milliers', ''], rangs: [4] },
            centaines: { determinant: 'des', cdu: ['centaines de milliers', ''], rangs: [3] }
          },
          millions: {
            unites: { determinant: 'des', cdu: ['unités de millions', ''], rangs: [2] },
            dizaines: { determinant: 'des', cdu: ['dizaines de millions', ''], rangs: [1] },
            centaines: { determinant: 'des', cdu: ['centaines de millions', ''], rangs: [0] }
          }
        },
        nombre: {
          unites: {
            unites: { determinant: 'd\'', cdu: ['unités', 1], rangs: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
            dizaines: { determinant: 'de', cdu: ['dizaines', 10], rangs: [0, 1, 2, 3, 4, 5, 6, 7] },
            centaines: { determinant: 'de', cdu: ['centaines', 100], rangs: [0, 1, 2, 3, 4, 5, 6] }
          },
          milliers: {
            unites: { determinant: 'd\'', cdu: ['unités de milliers', 1000], rangs: [0, 1, 2, 3, 4, 5] },
            dizaines: { determinant: 'de', cdu: ['dizaines de milliers', 10000], rangs: [0, 1, 2, 3, 4] },
            centaines: { determinant: 'de', cdu: ['centaines de milliers', 100000], rangs: [0, 1, 2, 3] }
          },
          millions: {
            unites: { determinant: 'd\'', cdu: ['unités de millions', 1000000], rangs: [0, 1, 2] },
            dizaines: { determinant: 'de', cdu: ['dizaines de millions', 10000000], rangs: [0, 1] },
            centaines: { determinant: 'de', cdu: ['centaines de millions', 100000000], rangs: [0] }
          }
        }
      }

      // pour les situations, autant de situations que de cas dans le switch !
      const situations = [
        { // case 0 --> chiffre des
          type: 'chiffre',
          tranche: 'unites',
          cdu: choice(cdu)
        },
        { // case 1 --> chiffre des
          type: 'chiffre',
          tranche: 'milliers',
          cdu: choice(cdu)
        },
        { // case 2 --> chiffre des
          type: 'chiffre',
          tranche: 'millions',
          cdu: choice(cdu)
        },
        { // case 3 --> nombre de
          type: 'nombre',
          tranche: 'unites',
          cdu: choice(cdu)
        },
        { // case 4 --> nombre de
          type: 'nombre',
          tranche: 'milliers',
          cdu: choice(cdu)
        },
        { // case 5 --> nombre de
          type: 'nombre',
          tranche: 'millions',
          cdu: choice(cdu)
        }
      ]

      // une fonction pour la correction selon le type de question
      function chiffreNombreCorr (type, str, rang) {
        let sortie
        if (type === 'chiffre') {
          sortie = str.split('')[rang[0]]
        };
        if (type === 'nombre') {
          sortie = str.split('')[rang[0]]
          for (let k = 1; k < rang.length; k++) {
            sortie += str.split('')[rang[k]]
          };
        };
        return sortie
      };

      // une fonction pour la justification supplémentaire dans le cas nombre de ...
      function nombreDeJustif (type, str, rang, cduNum) {
        let sortie
        if (type === 'chiffre') {
          sortie = ''
        };
        if (type === 'nombre') {
          let nbDe = str.split('')[rang[0]]
          for (let k = 1; k < rang.length; k++) {
            nbDe += str.split('')[rang[k]]
          };
          let j = rang[rang.length - 1]
          j++
          let nbDeReste = ''
          while (j !== 9) {
            nbDeReste += str.split('')[j]
            j++
          };
          sortie = `comme $${texNombre(str)} = ${texNombre(nbDe)}\\times ${texNombre(cduNum)}+${texNombre(nbDeReste)}$ alors `
        };
        return sortie
      };

      const enonces = []
      for (let k = 0; k < situations.length; k++) {
        enonces.push({
          enonce: `
          Dans $${texNombre(nb)}$, quel est le ${situations[k].type} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} ?
`,
          question: '',
          correction: `
          Dans $${texNombre(nb)}$,           
          ${nombreDeJustif(situations[k].type, nbStr, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[1])}          
          le ${situations[k].type} ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].determinant}  ${chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].cdu[0]} est 
          $${miseEnEvidence(texNombre(chiffreNombreCorr(situations[k].type, nbStr, chiffreNombre[situations[k].type][situations[k].tranche][situations[k].cdu].rangs)))}$
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des équations du second degré"];
};
