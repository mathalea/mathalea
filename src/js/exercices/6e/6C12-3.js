import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, stringNombre, texteEnCouleurEtGras, texteGras, prenomM, arrondi, prenomF, nomDuMois, jour, rangeMinMax, compteOccurences, contraindreValeur, combinaisonListes, sp } from '../../modules/outils.js'
import { propositionsQcm } from '../../modules/interactif/questionQcm.js'
export const amcReady = true
export const amcType = 'qcmMult' // type de question AMC
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Trouver les informations utiles ou inutiles pour résoudre des problèmes'

// Gestion de la date de publication initiale
export const dateDePublication = '01/12/2021'

/**
 * Trouver les informations utiles ou inutiles pour résoudre des problèmes
 * On peut choisir des problèmes qui n'ont pas de solution.
 * @author Eric Elter
* Référence 6C12-3
 */
export default function ExerciceInformationsProblemes () {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1
  this.sup2 = 11
  this.sup3 = false
  this.titre = titre
  this.spacing = 2
  this.nbQuestions = 10

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.sup = parseInt(this.sup)
    // Ebauche de la consigne en fonction des possibilités
    const cocheIndique = ['coche', 'indique']
    const chaqueCe = ['chaque', 'ce']
    const affirmatifNegatif = ['servent', 'ne servent pas']
    this.consigne = 'Dans '
    this.nbQuestions === 1 ? this.consigne += chaqueCe[1] : this.consigne += chaqueCe[0]
    this.consigne += ' problème, '
    context.vue === 'diap' ? this.consigne += cocheIndique[1] : this.consigne += cocheIndique[0]
    this.consigne += ' les informations qui '
    this.sup !== 1 ? this.consigne += affirmatifNegatif[1] : this.consigne += affirmatifNegatif[0]
    this.consigne += ' à sa résolution.'
    // Fin de l'ébauche de la consigne en fonction des possibilités

    let listeDesProblemes = []
    if (!this.sup2) { // Si aucune liste n'est saisie
      listeDesProblemes = rangeMinMax(1, 10)
    } else {
      if (typeof (this.sup2) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 11, this.sup2, 11)
      } else {
        listeDesProblemes = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < listeDesProblemes.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          listeDesProblemes[i] = contraindreValeur(1, 11, parseInt(listeDesProblemes[i]), 11) // parseInt en fait un tableau d'entiers
        }
      }
    }
    if (compteOccurences(listeDesProblemes, 11) > 0) listeDesProblemes = rangeMinMax(1, 10) // Teste si l'utilisateur a choisi tout
    listeDesProblemes = combinaisonListes(listeDesProblemes, this.nbQuestions)
    const FamilleH = ['père', 'frère', 'cousin', 'grand-père', 'voisin']
    const FamilleF = ['mère', 'sœur', 'cousine', 'grand-mère', 'tante', 'voisine']

    let choixVersion = 0

    for (
      let i = 0, nb, nb1, nb2, nb3, nb4, nb5, quidam, quidam2, personnage1, texte, texteCorr;
      i < this.nbQuestions;
      i++
    ) {
      this.autoCorrection[i] = {}
      choixVersion = this.sup3 ? choice([1, 2, 3]) : choice([1, 2])
      texte = ''
      texteCorr = ''
      switch (listeDesProblemes[i]) {
        case 1 :
          nb1 = randint(17, 35)
          nb2 = randint(7, 15)
          nb4 = randint(3, 10)
          nb5 = 10 * randint(20, 60)
          texte += `Dans une classe de ${nb1} élèves âgés de ${nb2}  à ${nb2 + 2}  ans,`
          texte += ` un professeur distribue à chaque enfant ${nb4} livres pesant en moyenne ${nb5} g chacun.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quel est le nombre total de livres distribués ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb1 + ' élèves')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' livres') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb1) + '$\\times$' + texteEnCouleurEtGras(nb4 + ' livres') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2 + ' ans') + ', ' + texteEnCouleurEtGras(nb2 + 2 + ' ans')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' g') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb1) + '$\\times$' + texteGras(nb4 + ' livres') + '.'
              }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} élèves`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2 + 2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} livres`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} g`,
                  statut: this.sup !== 1
                }
              ]
              break
            case 2:
              texte += 'Quelle est la masse moyenne des livres distribués à chaque enfant ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb5 + ' g')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' livres') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb5 + ' g ') + '$\\times$' + texteEnCouleurEtGras(nb4) + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2 + ' ans') + ', ' + texteEnCouleurEtGras(nb2 + 2 + ' ans')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb1 + ' élèves') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb5 + ' g ') + '$\\times$' + texteGras(nb4) + '.'
              }
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} élèves`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2 + 2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} livres`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} g`,
                  statut: this.sup === 1
                }
              ]

              break
            default:
              texte += `Quel est, dans cette classe, le nombre exact d'enfants de ${nb2 + 1} ans ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' élèves') + ', ' + texteEnCouleurEtGras(nb2 + ' ans') + ', '
                texteCorr += texteEnCouleurEtGras(nb2 + 2 + ' ans') + ', ' + texteEnCouleurEtGras(nb4 + ' livres')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' g') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} élèves`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2 + 2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} livres`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} g`,
                  statut: this.sup !== 1
                }
              ]

              break
          }
          break
        case 2:
          quidam = prenomM()
          nb1 = randint(2, 5)
          nb2 = choice([250, 500, 600, 750])
          nb3 = stringNombre(arrondi(randint(10, 50) / 10 + randint(1, 9) / 100))
          nb4 = randint(2, 5, [nb1])
          nb5 = stringNombre(arrondi(randint(20, 40) / 10 + randint(1, 9) / 100))
          texte += `Au marché, ${quidam} achète ${nb1} barquettes de haricots verts de ${nb2}${sp(1)}g chacune à ${nb3}${sp(1)}€ pièce `
          texte += ` et ${nb4}${sp(1)}ananas coûtant ${nb5}${sp(1)}€ l'unité.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quel est le prix total des fruits achetés ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb4 + ' ananas')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' €') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb4) + '$\\times$' + texteEnCouleurEtGras(nb5 + ' €') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' barquettes') + ', ' + texteEnCouleurEtGras(nb2 + ' g')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb3 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb4) + '$\\times$' + texteGras(nb5 + ' €') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} barquettes`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} g`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} ananas`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} €`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += 'Quel est le prix total des légumes achetés ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb1 + ' barquettes')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb3 + ' €') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb1) + '$\\times$' + texteEnCouleurEtGras(nb3 + ' €') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb4 + ' ananas') + ', ' + texteEnCouleurEtGras(nb2 + ' g')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb1) + '$\\times$' + texteGras(nb3 + ' €') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} barquettes`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2} g`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} ananas`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} €`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += 'Quel est le prix total des boissons achetées ?'
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' barquettes') + ', ' + texteEnCouleurEtGras(nb2 + ' g') + ', '
                texteCorr += texteEnCouleurEtGras(nb3 + ' €') + ', ' + texteEnCouleurEtGras(nb4 + ' ananas')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} barquettes`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} g`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} ananas`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} €`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break

        case 3:
          quidam = prenomM()
          quidam2 = prenomF()
          nb1 = randint(501, 978)
          nb2 = randint(230, 450)
          nb3 = randint(5, 11)
          nb4 = randint(110, 230)
          nb5 = randint(128, nb1 / 2)
          texte += `Le village de Sainte-${quidam2}-Les-Trois-Vallées compte ${nb1} habitants et se situe à une altitude de ${nb2} m.`
          texte += ` À ${nb3} km de là, le village de Saint-${quidam}-Le-Bouquetin, situé ${nb4} m plus haut, compte ${nb5} habitants de moins.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Combien d'habitants compte le village de Saint-${quidam}-Le-Bouquetin ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb1 + ' habitants')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' habitants') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb1 + ' habitants ') + '$-$' + texteEnCouleurEtGras(nb5 + ' habitants') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2 + ' m') + ', ' + texteEnCouleurEtGras(nb3 + ' km')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' m') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb1 + ' habitants') + '$-$' + texteGras(nb5 + ' habitants') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} habitants`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} habitants`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += `À quelle altitude se situe le village de Saint-${quidam}-Le-Bouquetin ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' m')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' m') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb2 + ' m') + '$+$' + texteEnCouleurEtGras(nb4 + ' m') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' habitants') + ', ' + texteEnCouleurEtGras(nb3 + ' km')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' habitants') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb2 + ' m') + '$+$' + texteGras(nb4 + ' m') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} habitants`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} m`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} habitants`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += `Combien de garçons compte le village de Sainte-${quidam2}-Les-Trois-Vallées ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' habitants') + ', ' + texteEnCouleurEtGras(nb2 + ' m') + ', '
                texteCorr += texteEnCouleurEtGras(nb3 + ' km') + ', ' + texteEnCouleurEtGras(nb4 + ' m')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' habitants') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} habitants`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} habitants`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 4:
          personnage1 = choice(FamilleH)
          quidam2 = prenomF()
          nb1 = '1 h ' + 5 * randint(1, 10) + ' min'
          nb2 = stringNombre(arrondi(randint(50, 90) / 10 + randint(1, 9) / 100))
          nb3 = randint(5, 9)
          nb4 = choice([10, 20, 50])
          nb5 = 4 * randint(12, 24)
          texte += `${quidam2} vient de lire en ${nb1} un manga qu'elle avait payé ${nb2} €. `
          texte += `Elle a remarqué que sur chaque page, il y avait exactement ${nb3} cases. `
          texte += `C'est grâce au billet de ${nb4} € que lui a donné son ${personnage1}, que ${quidam2} a pu s'acheter ce livre de ${nb5} pages.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Combien y a-t-il de cases dans le manga de ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb3 + ' cases')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' pages') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb3 + ' cases ') + '$\\times$' + texteEnCouleurEtGras(nb5) + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1) + ', ' + texteEnCouleurEtGras(nb2 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb3 + ' cases') + '$\\times$' + texteGras(nb5) + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} cases`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} pages`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += `Lorsqu'elle a acheté son manga, quelle somme d'argent a-t-on rendu à ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb4 + ' €') + '$-$' + texteEnCouleurEtGras(nb2 + ' €') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1) + ', ' + texteEnCouleurEtGras(nb3 + ' cases')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' pages') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb4 + ' €') + '$-$' + texteGras(nb2 + ' €') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} cases`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} pages`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += `À quelle heure ${quidam2} a-t-elle commencé à lire son manga ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1) + ', ' + texteEnCouleurEtGras(nb2 + ' €') + ', '
                texteCorr += texteEnCouleurEtGras(nb3 + ' cases') + ', ' + texteEnCouleurEtGras(nb4 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' pages') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} cases`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} pages`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 5:
          personnage1 = randint(1, 2) === 1 ? 'sa ' + choice(FamilleF) : 'son ' + choice(FamilleH)
          if (randint(1, 2) === 1) {
            quidam = prenomM()
            quidam2 = 'il'
          } else {
            quidam = prenomF()
            quidam2 = 'elle'
          }
          nb = randint(13, 21)
          nb1 = jour() + ' ' + randint(1, 29) + ' ' + nomDuMois(randint(1, 12))
          nb2 = nb + ' h ' + 5 * randint(2, 11) + ' min'
          nb3 = nb + 2 + ' h ' + 5 * randint(2, 11) + ' min'
          nb4 = nb + 1 + ' h ' + 5 * randint(2, 11) + ' min'
          nb5 = randint(37, 58)
          texte += `${quidam} décide de programmer la box de ${personnage1} pour enregistrer un film prévu le ${nb1} et une émission prévue le lendemain. `
          texte += `Le film doit commencer à ${nb2} et se terminer à ${nb3}. L'émission commence à ${nb4} et dure ${nb5} minutes.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quelle est la durée prévue du film ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb3) + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb3) + '$-$' + texteEnCouleurEtGras(nb2) + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb4) + ', ' + texteEnCouleurEtGras(nb1)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' minutes') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb3) + '$-$' + texteGras(nb2) + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5 + ' minutes'}`,
                  statut: this.sup !== 1
                }
              ]
              break
            case 2:
              texte += 'À quelle heure se termine l\'émission ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb4)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' minutes') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb4) + '$+$' + texteEnCouleurEtGras(nb5 + ' minutes') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2) + ', ' + texteEnCouleurEtGras(nb3)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb1) + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb4) + '$+$' + texteGras(nb5 + ' minutes') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5 + ' minutes'}`,
                  statut: this.sup === 1
                }
              ]
              break
            default:
              texte += `À quelle heure de sa journée, ${quidam} décide-t-${quidam2} de programmer la box de ${personnage1} ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2) + ', ' + texteEnCouleurEtGras(nb3) + ', '
                texteCorr += texteEnCouleurEtGras(nb4) + ', ' + texteEnCouleurEtGras(nb5 + ' minutes')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb1) + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5 + ' minutes'}`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 6:
          personnage1 = choice(FamilleF)
          quidam = choice(FamilleH)
          quidam2 = prenomF()
          nb1 = choice([15, 18, 21])
          nb2 = randint(214, 625)
          nb3 = randint(15, 18)
          nb4 = stringNombre(arrondi(randint(2054, 3298) / 100))
          nb5 = choice([2, 3, 4, 6, 12])
          texte += `La ${personnage1} de ${quidam2} lui a acheté un superbe vélo de ${nb1} vitesses, coûtant ${nb2} €, avec des roues de ${nb3} pouces. `
          texte += `Pour la protéger, son ${quidam} lui a offert un casque et du matériel d'éclairage valant ${nb4} €. `
          texte += `La ${personnage1} de ${quidam2} a décidé de payer le vélo en ${nb5} fois.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Quel est le montant de chaque versement que payera la ${personnage1} de ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' fois') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb2 + ' € ') + '$\\div$' + texteEnCouleurEtGras(nb5) + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' vitesses') + ', ' + texteEnCouleurEtGras(nb3 + ' pouces')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb2 + ' €') + '$\\div$' + texteGras(nb5) + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} vitesses`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} pouces`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} fois`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += `Quel est le montant total des cadeaux offerts à ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb4 + ' €') + '$+$' + texteEnCouleurEtGras(nb2 + ' €') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' vitesses') + ', ' + texteEnCouleurEtGras(nb3 + ' pouces')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' fois') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb4 + ' €') + '$+$' + texteGras(nb2 + ' €') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} vitesses`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} pouces`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} fois`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += `Pour quel âge, ${quidam2} a-t-elle reçu son vélo comme cadeau d'anniversaire ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' vitesses') + ', ' + texteEnCouleurEtGras(nb2 + ' €') + ', '
                texteCorr += texteEnCouleurEtGras(nb3 + ' pouces') + ', ' + texteEnCouleurEtGras(nb4 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' fois') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} vitesses`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} pouces`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} fois`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 7:
          personnage1 = choice(FamilleF)
          quidam = prenomM()
          quidam2 = prenomF()
          nb1 = randint(0, 3)
          nb2 = ['3ème', '4ème', '5ème', '6ème'][nb1]
          nb3 = [14, 13, 12, 11][nb1]
          nb4 = stringNombre(arrondi(randint(132, 151) / 100))
          nb5 = randint(21, 42)
          texte += `${quidam}, un élève de ${nb2}, de ${nb3} ans, mesure ${nb4} m. `
          texte += `${quidam2} a ${nb1 + 2} ans de plus que ${quidam} et mesure ${nb5} cm de plus.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Quel est l'âge de ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb3 + ' ans')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb1 + 2 + ' ans') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb3 + ' ans ') + '$+$' + texteEnCouleurEtGras(nb1 + 2 + ' ans ') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb2) + ', ' + texteEnCouleurEtGras(nb4 + ' m')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' cm') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb3 + ' ans') + '$+$' + texteGras(nb1 + 2 + ' ans ') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1 + 2} ans`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} ans`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} cm`,
                  statut: this.sup !== 1
                }
              ]
              break
            case 2:
              texte += `Combien mesure ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb4 + ' m')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' cm') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb4 + ' m') + '$+$' + texteEnCouleurEtGras(nb5 + ' cm') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + 2 + ' ans, ') + texteEnCouleurEtGras(nb3 + ' ans')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb2) + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb4 + ' m') + '$+$' + texteGras(nb5 + ' cm') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1 + 2} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} cm`,
                  statut: this.sup === 1
                }
              ]
              break
            default:
              texte += `En quelle classe est ${quidam2} ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + 2 + ' ans') + ', ' + texteEnCouleurEtGras(nb2) + ', '
                texteCorr += texteEnCouleurEtGras(nb3 + ' ans') + ', ' + texteEnCouleurEtGras(nb4 + ' m')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' cm') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1 + 2} ans`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} ans`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} cm`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 8:
          personnage1 = choice(FamilleH)
          quidam = prenomM()
          nb1 = randint(45, 58)
          nb2 = randint(3, 5)
          nb3 = randint(7, 9) + ' h ' + 5 * randint(2, 11) + ' min'
          nb4 = stringNombre(arrondi(randint(9, 15, [10]) / 10), 1) + '0'
          nb5 = 5 * randint(4, 11)
          texte += `Le ${personnage1} de ${quidam}, âgé de ${nb1} ans, se rend ${nb2} fois par semaine à ${choice(['Paris', 'Toulouse', 'Bordeaux', 'Rouen'])} en train. `
          texte += `Une fois arrivé, il prend le métro à ${nb3}, après avoir acheté systèmatiquement le même journal, dans un kiosque de la gare, qui coûte ${nb4} €. Son trajet en métro dure ${nb5} minutes pour se rendre au travail.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Combien le ${personnage1} de ${quidam} dépense-t-il chaque semaine pour son journal ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' fois')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb2) + '$\\times$' + texteEnCouleurEtGras(nb4 + ' € ') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' ans') + ', ' + texteEnCouleurEtGras(nb3)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' min') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb2) + '$\\times$' + texteGras(nb4 + ' € ') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} fois`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} min`,
                  statut: this.sup !== 1
                }
              ]
              break
            case 2:
              texte += `À quelle heure le ${personnage1} de ${quidam} arrive-t-il à son travail ?`
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb3)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' min') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb3) + '$+$' + texteEnCouleurEtGras(nb5 + ' min') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' ans, ') + texteEnCouleurEtGras(nb2 + ' fois')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4 + ' €') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb3) + '$+$' + texteGras(nb5 + ' min') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} fois`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} min`,
                  statut: this.sup === 1
                }
              ]
              break
            default:
              texte += `À quelle heure le ${personnage1} de ${quidam} est-il parti de chez lui ?`
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' ans') + ', ' + texteEnCouleurEtGras(nb3) + ', '
                texteCorr += texteEnCouleurEtGras(nb2 + ' fois') + ', ' + texteEnCouleurEtGras(nb4 + ' €')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' min') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} ans`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} fois`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} €`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} min`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 9:
          personnage1 = choice(FamilleF)
          quidam = prenomM()
          quidam2 = prenomF()
          nb1 = randint(21, 39)
          nb2 = randint(7, 18)
          nb3 = randint(7, 15)
          nb4 = randint(10, 12) + ' h ' + 5 * randint(2, 11) + ' min'
          nb5 = randint(16, 29)
          texte += `Un livreur part de son entrepôt avec ${nb1} colis. Au premier arrêt, il depose ${nb2} colis. ${nb3} km plus loin, il livre le reste de ses colis. `
          texte += `Ensuite, à ${nb4}, le livreur retourne à l'entrepôt, à ${nb5} km de là.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quelle distance sépare l\'entrepôt du premier arrêt ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb3 + ' km')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' km') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb5 + ' km') + '$-$' + texteEnCouleurEtGras(nb3 + ' km ') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' colis') + ', ' + texteEnCouleurEtGras(nb2 + ' colis')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb4) + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb5 + ' km') + '$-$' + texteGras(nb3 + ' km ') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} colis`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} colis`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} km`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += 'Combien de colis le livreur a-t-il déposé à son deuxième arrêt ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb1 + ' colis')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb2 + ' colis') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb1 + ' colis') + '$-$' + texteEnCouleurEtGras(nb2 + ' colis') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb3 + ' km, ') + texteEnCouleurEtGras(nb4)
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' km') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb1 + ' colis') + '$-$' + texteGras(nb2 + ' colis') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} colis`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb2} colis`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} km`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += 'À quelle heure ce livreur est-il rentré à l\'entrepôt ?'
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' colis') + ', ' + texteEnCouleurEtGras(nb4) + ', '
                texteCorr += texteEnCouleurEtGras(nb2 + ' colis') + ', ' + texteEnCouleurEtGras(nb3 + ' km')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' km') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} colis`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} colis`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} km`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4}`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} km`,
                  statut: this.sup !== 1
                }
              ]
              break
          }
          break
        case 10:
          personnage1 = choice(FamilleF)
          quidam = prenomM()
          quidam2 = prenomF()
          nb1 = randint(85, 153)
          nb2 = randint(67, 86)
          nb3 = randint(7, 15)
          nb4 = randint(21, 35)
          nb5 = randint(21, 35)
          texte += `Un cargo mesurant ${nb1} m transporte ${nb2} gros conteneurs de ${nb3} tonnes chacun du Havre à Hong-Kong. `
          texte += `Ce bateau transporte aussi ${nb4} petits conteneurs pour une masse totale de ${nb5} tonnes.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quelle est la masse de chacun des petits conteneurs, sachant qu\'ils ont tous la même masse ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb4 + ' conteneurs')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' tonnes') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb5 + ' tonnes') + '$\\div$' + texteEnCouleurEtGras(nb4) + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' m') + ', ' + texteEnCouleurEtGras(nb2 + ' conteneurs')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb3 + ' tonnes') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb5 + ' tonnes') + '$\\div$' + texteGras(nb4) + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} conteneurs`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} tonnes`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb4} conteneurs`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb5} tonnes`,
                  statut: this.sup === 1
                }
              ]
              break
            case 2:
              texte += 'Quelle est la masse totale des gros conteneurs ?'
              if (this.sup === 1) {
                texteCorr += texteEnCouleurEtGras(nb2 + ' conteneurs')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb3 + ' tonnes') + ' sont utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteEnCouleurEtGras(nb2) + '$\\times$' + texteEnCouleurEtGras(nb3 + ' tonnes') + '.'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' m, ') + texteEnCouleurEtGras(nb4 + ' conteneurs')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' tonnes') + ' ne sont pas utiles pour la résolution du problème.<br>'
                texteCorr += 'La solution du problème est donnée par : '
                texteCorr += texteGras(nb2) + '$\\times$' + texteGras(nb3 + ' tonnes') + '.'
              }

              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} conteneurs`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb3} tonnes`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} conteneurs`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} tonnes`,
                  statut: this.sup !== 1
                }
              ]
              break
            default:
              texte += 'Quelle est la longueur d\'un gros conteneur ?'
              if (this.sup === 1) {
                texteCorr += 'Aucune donnée n\'est utile pour la résolution du problème.<br>'
              } else {
                texteCorr += texteEnCouleurEtGras(nb1 + ' m') + ', ' + texteEnCouleurEtGras(nb4 + ' conteneurs') + ', '
                texteCorr += texteEnCouleurEtGras(nb2 + ' conteneurs') + ', ' + texteEnCouleurEtGras(nb3 + ' tonnes')
                texteCorr += ' et ' + texteEnCouleurEtGras(nb5 + ' tonnes') + ' ne sont pas utiles pour la résolution du problème.<br>'
              }
              texteCorr += 'On ne peut pas répondre à ce problème. Il manque des informations.'
              this.autoCorrection[i].enonce = `${texte}\n`
              this.autoCorrection[i].propositions = [
                {
                  texte: `${nb1} m`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb2} conteneurs`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb3} tonnes`,
                  statut: this.sup === 1
                },
                {
                  texte: `${nb4} conteneurs`,
                  statut: this.sup !== 1
                },
                {
                  texte: `${nb5} tonnes`,
                  statut: this.sup === 1
                }
              ]
              break
          }
          break
      }
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 5 // A creuser pour supprimer ou mettre nbquestions
      }
      if (!context.isAmc) {
        texte += propositionsQcm(this, i).texte
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix de la formulation', 2, '1 : Coche les informations qui servent à sa résolution.\n2 : Coche les informations qui NE servent PAS à sa résolution.']
  this.besoinFormulaire2Texte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Livres\n2 : Haricots\n3 : Villages de montagne\n4 : Manga\n5 : Film\n6 : Vélo\n7 : Taille\n8 : Gare\n9 : Livreur\n10 : Cargo\n11 : Tous les problèmes\n']
  this.besoinFormulaire3CaseACocher = ['Certains problèmes peuvent être insolubles']
}
