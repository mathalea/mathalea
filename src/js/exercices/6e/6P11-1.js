import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, combinaisonListes, calcul, prenom, texteEnCouleur, texPrix, numAlpha, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale, arrondi, checkSum } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Résoudre un problème relevant de la proportionnalité avec les propriétés de linéarité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Produire une forme littérale en introduisant une lettre pour désigner une valeur inconnue
 * * 6P11-1
 * @author Sébastien Lozano
 */
export default function ProportionnaliteParLineariteBis () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.beta = false
  if (this.beta) {
    this.nbQuestions = 3
  } else {
    this.nbQuestions = 1
  };

  this.consigne = ''
  context.isHtml ? this.spacing = 2 : this.spacing = 1

  this.nbCols = 1
  this.nbColsCorr = 1
  // this.nbQuestionsModifiable = false;
  // context.isHtml? this.spacing = 3 : this.spacing = 2;
  // context.isHtml? this.spacingCorr = 3 : this.spacingCorr = 2;

  let typesDeQuestionsDisponibles

  this.nouvelleVersion = function () {
    const tabHash = []
    if (this.beta) {
      typesDeQuestionsDisponibles = [1]
    } else {
      typesDeQuestionsDisponibles = [1]
    };

    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    typesDeQuestionsDisponibles = [1]
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    // let listeTypeDeQuestions = combinaisonListesSansChangerOrdre(typesDeQuestionsDisponibles,this.nbQuestions) // Tous les types de questions sont posées --> à remettre comme ci dessus

    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      // une fonction pour gérer le pluriel
      function pluriel (n, obj) {
        if (n > 1) {
          return obj.achat_plur
        } else {
          return obj.achat_sing
        };
      };

      // une fonction pour gérer la chaine de sortie et supprimer le coeff 1 !
      ;

      // une fonction pour calculer la différence positive entre deux entiers
      function diffInt (n, p) {
        if (n > p) {
          return calcul(n - p)
        } else if (n < p) {
          return calcul(p - n)
        } else {
          return 0
        }
      };

      // un compteur pour les sous-questions
      let k = 0
      let kCorr = 0
      // on crée un tableau d'objets pour les situations possibles
      let n1, n2, n3, n4, nMax
      do {
        n1 = randint(1, 9)
        n2 = randint(1, 9, [n1])
        n3 = n1 + n2
        n4 = diffInt(n1, n2)
        nMax = randint(10, 19, [n3])
      } while (n4 === 1)
      // n1 sera toujours le plus grand sinon on intervertit les deux
      let temp
      if (n1 < n2) {
        temp = n1
        n1 = n2
        n2 = temp
      };
      const situations = [
        { lieu: 'la boulangerie', achat_sing: 'pain au chocolat', achat_plur: 'pains au chocolat', prenom1: prenom(), prenom2: prenom(), prenom3: prenom(), prenom4: prenom(), prenom_max: prenom(), n1: n1, n2: n2, n3: n3, n4: n4, nMax: nMax, pu: 0.9 }
      ]
      const enonces = []
      const situation = situations[randint(0, situations.length - 1)]

      enonces.push({
        enonce: `
          À ${situation.lieu}, ${situation.prenom1} achète $${situation.n1}$ ${pluriel(situation.n1, situation)} et paie $${texPrix(situation.pu * situation.n1)}$ €.
          <br>${situation.prenom2} achète $${situation.n2}$ ${pluriel(situation.n2, situation)} et paie $${texPrix(situation.pu * situation.n2)}$ €.
          <br>
          <br>${numAlpha(k++)} Combien paiera ${situation.prenom3} pour $${situation.n3}$ ${pluriel(situation.n3, situation)} ? ${ajouteChampTexteMathLive(this, 3 * i, 'largeur25 inline')}
          <br>${numAlpha(k++)} Combien paiera ${situation.prenom4} pour $${situation.n4}$ ${pluriel(situation.n4, situation)} ? ${ajouteChampTexteMathLive(this, 3 * i + 1, 'largeur25 inline')}
          <br>${numAlpha(k++)} Quel est le nombre maximum de ${situation.achat_plur} que ${situation.prenom_max} peut acheter avec $${texPrix(situation.pu * situation.nMax)}$ € ? ${ajouteChampTexteMathLive(this, 3 * i + 2, 'largeur25 inline')}
          `,
        question: '',
        correction: `
        C'est une situation de proportionnalité. Nous pouvons donc utiliser les propriétés de linéarité de la proportionnalité.
        <br>C'est ce que nous allons faire pour les deux premières questions.
        <br>
        <br>${numAlpha(kCorr++)} Pour $${situation.n1}$ ${pluriel(situation.n1, situation)}, on paie $${texPrix(situation.pu * situation.n1)}$ €.
        <br> Pour $${situation.n2}$ ${pluriel(situation.n2, situation)}, on paie $${texPrix(situation.pu * situation.n2)}$ €.
        <br> Donc pour $${situation.n1}+${situation.n2}$ ${pluriel(situation.n3, situation)}, on paie $${texPrix(situation.pu * situation.n1)}$ € + $${texPrix(situation.pu * situation.n2)}$ €.
        <br> ${texteEnCouleur(`${situation.prenom3} paiera donc $${texPrix(situation.pu * situation.n3)}$ € pour $${situation.n3}$ ${pluriel(situation.n3, situation)}.`)}
        <br>
        <br>${numAlpha(kCorr++)} Pour $${situation.n1}$ ${pluriel(situation.n1, situation)}, on paie $${texPrix(situation.pu * situation.n1)}$ €.
        <br> Pour $${situation.n2}$ ${pluriel(situation.n2, situation)}, on paie $${texPrix(situation.pu * situation.n2)}$ €.
        <br> Donc pour $${situation.n1}-${situation.n2}$ ${pluriel(situation.n4, situation)}, on paie $${texPrix(situation.pu * situation.n1)}$ € - $${texPrix(situation.pu * situation.n2)}$ €.
        <br> ${texteEnCouleur(`${situation.prenom4} paiera donc $${texPrix(situation.pu * situation.n4)}$ € pour $${situation.n4}$ ${pluriel(situation.n4, situation)}.`)}
        <br>
        <br>${numAlpha(kCorr++)} On peut utiliser l'une ou l'autre des informations de l'énoncé pour répondre en revenant à l'unité.
        <br> Par exemple pour $${situation.n1}$ ${pluriel(situation.n1, situation)}, on paie $${texPrix(situation.pu * situation.n1)}$ €.
        <br> Donc $1$ ${situation.achat_sing} coûte $${texPrix(situation.pu * situation.n1)}\\div ${situation.n1} = ${texPrix(situation.pu)}$ €.
        <br> Pour $${texPrix(situation.pu * situation.nMax)}$ € nous aurons donc $${texPrix(situation.pu * situation.nMax)}\\div ${texPrix(situation.pu)}$ € $= ${situation.nMax}$ ${pluriel(situation.nMax, situation)}.
        <br> ${texteEnCouleur(`Avec $${texPrix(situation.pu * situation.nMax)}$ €, ${situation.prenom_max} pourra donc acheter $${situation.nMax}$ ${pluriel(situation.nMax, situation)}.`)}
        `
      })
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `${enonces[0].enonce}`
          if (this.beta) {
            texte += '<br>'
            texte += `<br> =====CORRECTION======<br>${enonces[0].correction}`
            texteCorr = ''
          } else {
            texteCorr = `${enonces[0].correction}`
          };
          break
      }

      if (tabHash.indexOf(checkSum(situation.prenom4, situation.n3, situation.n2, situation.nMax)) === -1) { // Si la question n'a jamais été posée, on en crée une autre
        tabHash.push(checkSum(situation.prenom4, situation.n3, situation.n2, situation.nMax))
        if (!context.isAmc) {
          setReponse(this, 3 * i, arrondi(situation.pu * situation.n3, 2))
          setReponse(this, 3 * i + 1, arrondi(situation.pu * situation.n4, 2))
          setReponse(this, 3 * i + 2, situation.nMax)
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: texteCorr,
                  statut: '',
                  reponse: {
                    texte: 'a) ',
                    valeur: arrondi(situation.pu * situation.n3, 2),
                    param: {
                      digits: nombreDeChiffresDe(arrondi(situation.pu * situation.n3, 2)),
                      decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(situation.pu * situation.n3, 2)),
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'b) ',
                    valeur: arrondi(situation.pu * situation.n4, 2),
                    param: {
                      digits: nombreDeChiffresDe(arrondi(situation.pu * situation.n4, 2)),
                      decimals: nombreDeChiffresDansLaPartieDecimale(arrondi(situation.pu * situation.n4, 2)),
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCNum',
                propositions: [{
                  texte: '',
                  statut: '',
                  reponse: {
                    texte: 'c) ',
                    valeur: situation.nMax,
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
        }
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
