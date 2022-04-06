import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, stringNombre, texteEnCouleurEtGras, prenomM, arrondi, prenomF, nomDuMois, jour, rangeMinMax, compteOccurences, contraindreValeur, combinaisonListes, sp, minToHour, minToHoraire, minToHeuresMinutes, estentier, nombreDeChiffresDe, nombreDeChiffresDansLaPartieDecimale } from '../../modules/outils.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { setReponse } from '../../modules/gestionInteractif.js'
export const amcReady = true
export const amcType = 'AMCHybride' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Résoudre des problèmes avec des informations inutiles'

// Gestion de la date de publication initiale
export const dateDePublication = '01/03/2022'

/**
 * Résoudre des problèmes dont certaines informations sont inutiles.
 * @author Eric Elter
* Référence 6C12-4 (d'après 6C12-3)
 */
export default function ExerciceInformationsProblemes () {
  // Multiplier deux nombres
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 11
  this.titre = titre
  this.spacing = 2
  this.nbQuestions = 10

  this.nouvelleVersion = function () {
    this.autoCorrection = []
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    // Ebauche de la consigne en fonction des possibilités
    const chaqueCe = ['chaque', 'ce']
    this.consigne = 'Résouds '
    this.consigne += this.nbQuestions === 1 ? chaqueCe[1] : chaqueCe[0]
    this.consigne += ' problème.'
    // Fin de l'ébauche de la consigne en fonction des possibilités

    let listeDesProblemes = []
    if (!this.sup) { // Si aucune liste n'est saisie
      listeDesProblemes = rangeMinMax(1, 10)
    } else {
      if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
        listeDesProblemes[0] = contraindreValeur(1, 11, this.sup, 11)
      } else {
        listeDesProblemes = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
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
    let ii = 0 // Cet indice permet de compenser l'utilisation possible de deux saisies interactives dans une même question (lors de ...h ...min par exemple)
    for (
      let i = 0, nb, nb1, nb2, nb3, nb4, nb5, quidam, quidam2, personnage1, texte, texteCorr, reponse, reponse1, reponse2;
      i < this.nbQuestions;
      i++
    ) {
      choixVersion = choice([1, 2])
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
              reponse = nb1 * nb4
              texteCorr += texteEnCouleurEtGras(nb1) + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb4 + ' livres') + `${sp()}=${sp()}` + texteEnCouleurEtGras(reponse + ' livres') + '<br>'
              texteCorr += `${reponse} livres sont distribués par le professeur.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'livres' })
                setReponse(this, i + ii, reponse)
              }
              break
            case 2:
              texte += 'Quelle est la masse moyenne des livres distribués à chaque enfant ?'
              reponse = nb5 * nb4
              texteCorr += texteEnCouleurEtGras(nb5 + ' g') + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb4) + `${sp()}=${sp()}` + texteEnCouleurEtGras(reponse + ' g') + '<br>'
              texteCorr += `La masse moyenne des livres distribués à chaque enfant est de ${reponse} g.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'g' })
                setReponse(this, i + ii, reponse)
              }
              break
          }
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonceAvant: false,
              propositions: [
                {
                  type: 'AMCOpen',
                  propositions: [{
                    enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                    sanscadre: true,
                    texte: texteCorr,
                    statut: 3
                  }]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: '',
                    statut: '',
                    reponse: {
                      texte: '',
                      valeur: [reponse],
                      alignement: 'flushright',
                      param: {
                        digits: nombreDeChiffresDe(reponse),
                        decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          }
          break
        case 2:
          quidam = prenomM()
          nb1 = randint(2, 5)
          nb2 = choice([250, 500, 600, 750])
          nb3 = arrondi(randint(10, 50) / 10 + randint(1, 9) / 100)
          reponse2 = arrondi(nb1 * nb3)
          nb3 = stringNombre(nb3)
          nb4 = randint(2, 5, [nb1])
          nb5 = arrondi(randint(20, 40) / 10 + randint(1, 9) / 100)
          reponse1 = arrondi(nb4 * nb5)
          nb5 = stringNombre(nb5)
          texte += `Au marché, ${quidam} achète ${nb1} barquettes de haricots verts de ${nb2}${sp(1)}g chacune à ${nb3}${sp(1)}€ pièce `
          texte += ` et ${nb4}${sp(1)}ananas coûtant ${nb5}${sp(1)}€ l'unité.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quel est le prix total des fruits achetés ?'
              reponse = nb4 * nb5
              texteCorr += texteEnCouleurEtGras(nb4) + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb5 + ' €') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse1) + ' €') + '<br>'
              texteCorr += `Le prix total des fruits achetés est de ${stringNombre(reponse1)} €.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += 'Quel est le prix total des légumes achetés ?'
              reponse = nb1 * nb3
              texteCorr += texteEnCouleurEtGras(nb1) + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb3 + ' €') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse2) + ' €') + '<br>'
              texteCorr += `Le prix total des légumes achetés est de ${stringNombre(reponse2)} €.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse2)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse2),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
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
              reponse = nb1 - nb5
              texteCorr += texteEnCouleurEtGras(nb1 + ' habitants') + `$${sp()}-${sp()}$` + texteEnCouleurEtGras(nb5 + ' habitants') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse) + ' habitants') + '<br>'
              texteCorr += `Le village de Saint-${quidam}-Le-Bouquetin ${stringNombre(reponse)} habitants.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'habitants' })
                setReponse(this, i + ii, reponse)
              }
              break
            case 2:
              texte += `À quelle altitude se situe le village de Saint-${quidam}-Le-Bouquetin ?`
              reponse = nb2 + nb4
              texteCorr += texteEnCouleurEtGras(nb2 + ' m') + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb4 + ' m') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse) + ' m') + '<br>'
              texteCorr += `Le village de Saint-${quidam}-Le-Bouquetin se situe à ${stringNombre(reponse)} m d'altitude.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'm' })
                setReponse(this, i + ii, reponse)
              }
              break
          }
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonceAvant: false,
              propositions: [
                {
                  type: 'AMCOpen',
                  propositions: [{
                    enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                    sanscadre: true,
                    texte: texteCorr,
                    statut: 3
                  }]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: '',
                    statut: '',
                    reponse: {
                      texte: '',
                      valeur: [reponse],
                      alignement: 'flushright',
                      param: {
                        digits: nombreDeChiffresDe(reponse),
                        decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          }
          break
        case 4:
          personnage1 = choice(FamilleH)
          quidam2 = prenomF()
          nb1 = '1 h ' + 5 * randint(1, 10) + ' min'
          nb2 = arrondi(randint(50, 90) / 10 + randint(1, 9) / 100)
          nb3 = randint(5, 9)
          nb4 = choice([10, 20, 50])
          nb5 = 4 * randint(12, 24)
          reponse2 = nb4 - nb2
          nb2 = stringNombre(nb2)
          texte += `${quidam2} vient de lire en ${nb1} un manga qu'elle avait payé ${nb2} €. `
          texte += `Elle a remarqué que sur chaque page, il y avait exactement ${nb3} cases. `
          texte += `C'est grâce au billet de ${nb4} € que lui a donné son ${personnage1}, que ${quidam2} a pu s'acheter ce livre de ${nb5} pages.<br>`
          switch (choixVersion) {
            case 1:
              texte += `Combien y a-t-il de cases dans le manga de ${quidam2} ?`
              reponse1 = nb3 * nb5
              texteCorr += texteEnCouleurEtGras(nb3 + ' cases') + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb5) + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse1) + ' cases') + '<br>'
              texteCorr += `Il y a ${stringNombre(reponse1)} cases dans le manga de ${quidam2}.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'cases' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += `Lorsqu'elle a acheté son manga, quelle somme d'argent a-t-on rendu à ${quidam2} ?`
              texteCorr += texteEnCouleurEtGras(nb4 + ' €') + `$${sp()}-${sp()}$` + texteEnCouleurEtGras(nb2 + ' €') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse2) + ' €') + '<br>'
              texteCorr += `On a rendu à ${quidam2} ${stringNombre(reponse2)} €.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse2)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse2],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse2),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
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
          nb1 = jour() + ' ' + randint(2, 29) + ' ' + nomDuMois(randint(1, 12))
          nb2 = nb * 60 + 5 * randint(2, 11)
          nb3 = (nb + 2) * 60 + 5 * randint(2, 11)
          reponse1 = minToHeuresMinutes(nb3 - nb2)
          nb2 = minToHour(nb2)
          nb3 = minToHour(nb3)
          nb4 = (nb + 1) * 60 + 5 * randint(2, 11)
          nb5 = randint(37, 58)
          reponse2 = minToHeuresMinutes(nb4 + nb5)
          nb4 = minToHour(nb4)
          texte += `${quidam} décide de programmer la box de ${personnage1} pour enregistrer un film prévu le ${nb1} et une émission prévue le lendemain. `
          texte += `Le film doit commencer à ${nb2} et se terminer à ${nb3}. L'émission commence à ${nb4} et dure ${nb5} minutes.<br>`
          choixVersion = 1
          switch (choixVersion) {
            case 1:
              texte += 'Quelle est la durée prévue du film ?'
              texteCorr += texteEnCouleurEtGras(nb3) + `$${sp()}-${sp()}$` + texteEnCouleurEtGras(nb2) + `${sp()}=${sp()}` + texteEnCouleurEtGras(minToHour(reponse1[0] * 60 + reponse1[1])) + '<br>'
              texteCorr += `La durée prévue du film est de ${minToHour(reponse1[0] * 60 + reponse1[1])}.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'h' })
                setReponse(this, i + ii, reponse1[0])
                ii++
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'min' })
                setReponse(this, i + ii, reponse1[1])
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: `\\begin{flushright}heures ${sp(65)} \\end{flushright}`,
                          valeur: [reponse1[0]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1[0]),
                            decimals: 0,
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
                          texte: `\\begin{flushright}minutes ${sp(65)} \\end{flushright}`,
                          valeur: [reponse1[1]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1[1]),
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
              break
            case 2:
              texte += 'À quelle heure se termine l\'émission ?'
              texteCorr += texteEnCouleurEtGras(nb4) + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb5 + ' minutes') + `${sp()}=${sp()}` + texteEnCouleurEtGras(minToHour(reponse2[0] * 60 + reponse2[1])) + '<br>'
              texteCorr += `L'émission se termine à ${minToHoraire(reponse2[0] * 60 + reponse2[1])}.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'h' })
                setReponse(this, i + ii, reponse2[0])
                ii++
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'min' })
                setReponse(this, i + ii, reponse2[1])
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: `\\begin{flushright}heures ${sp(65)} \\end{flushright}`,
                          valeur: [reponse2[0]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2[0]),
                            decimals: 0,
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
                          texte: `\\begin{flushright}minutes ${sp(65)} \\end{flushright}`,
                          valeur: [reponse2[1]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2[1]),
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
          nb4 = arrondi(randint(2054, 3298) / 100)
          nb5 = choice([2, 3, 4, 6, 12])
          while ((100 * nb2 % nb5) !== 0) {
            nb2 = randint(214, 625)
          }
          reponse2 = nb4 + nb2
          nb4 = stringNombre(nb4)
          texte += `La ${personnage1} de ${quidam2} lui a acheté un superbe vélo de ${nb1} vitesses, coûtant ${nb2} €, avec des roues de ${nb3} pouces. `
          texte += `Pour la protéger, son ${quidam} lui a offert un casque et du matériel d'éclairage valant ${nb4} €. `
          texte += `La ${personnage1} de ${quidam2} a décidé de payer le vélo en ${nb5} fois.<br>`
          switch (choixVersion) {
            case 1:
              texte += `Quel est le montant de chaque versement que payera la ${personnage1} de ${quidam2} ?`
              reponse1 = arrondi(nb2 / nb5)
              texteCorr += texteEnCouleurEtGras(nb2 + ' €') + `$${sp()}\\div${sp()}$` + texteEnCouleurEtGras(nb5) + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse1) + ' €') + '<br>'
              texteCorr += `La ${personnage1} de ${quidam2} payera ${nb5} fois, la somme de ${stringNombre(reponse1)} €.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += `Quel est le montant total des cadeaux offerts à ${quidam2} ?`
              texteCorr += texteEnCouleurEtGras(nb4 + ' €') + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb2 + ' €') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse2) + ' €') + '<br>'
              texteCorr += `Le montant total des cadeaux offerts à ${quidam2} est de ${stringNombre(reponse2)} €.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse2)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse2],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse2),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
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
          nb4 = arrondi(randint(132, 151) / 100)
          nb5 = randint(21, 42)
          reponse2 = arrondi(nb4 + nb5 / 100)
          nb4 = stringNombre(nb4)
          texte += `${quidam}, un élève de ${nb2}, de ${nb3} ans, mesure ${nb4} m. `
          texte += `${quidam2} a ${nb1 + 2} ans de plus que ${quidam} et mesure ${nb5} cm de plus.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Quel est l'âge de ${quidam2} ?`
              reponse1 = nb1 + 2 + nb3
              texteCorr += texteEnCouleurEtGras(nb3 + ' ans') + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb1 + 2 + ' ans') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse1) + ' ans') + '<br>'
              texteCorr += `${quidam2} a ${stringNombre(reponse1)} ans.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'ans' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += `Combien mesure ${quidam2} ?`
              texteCorr += texteEnCouleurEtGras(nb4 + ' m') + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb5 + ' cm') + `${sp()}=${sp()}` + texteEnCouleurEtGras(nb4 + ' m') + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(stringNombre(arrondi(nb5 / 100)) + ' m') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse2) + ' m') + '<br>'
              texteCorr += `${quidam2} mesure ${stringNombre(reponse2)} m.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'm' })
                setReponse(this, i + ii, reponse2)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse2],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse2),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
          }
          break
        case 8:
          personnage1 = choice(FamilleH)
          quidam = prenomM()
          nb1 = randint(45, 58)
          nb2 = randint(3, 5)
          nb3 = randint(7, 9) * 60 + 5 * randint(2, 11)
          nb4 = arrondi(randint(9, 15, [10]) / 10, 1)
          reponse1 = arrondi(nb4 * nb2)
          nb4 = stringNombre(nb4) + '0'
          nb5 = 5 * randint(4, 11)
          reponse2 = minToHeuresMinutes(nb3 + nb5)
          nb3 = minToHour(nb3)
          texte += `Le ${personnage1} de ${quidam}, âgé de ${nb1} ans, se rend ${nb2} fois par semaine à ${choice(['Paris', 'Toulouse', 'Bordeaux', 'Rouen'])} en train. `
          texte += `Une fois arrivé, il prend le métro à ${nb3}, après avoir acheté systèmatiquement le même journal, dans un kiosque de la gare, qui coûte ${nb4} €. Son trajet en métro dure ${nb5} minutes pour se rendre au travail.<br>`

          switch (choixVersion) {
            case 1:
              texte += `Combien le ${personnage1} de ${quidam} dépense-t-il chaque semaine pour son journal ?`

              texteCorr += texteEnCouleurEtGras(nb2) + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb4 + ' €') + `${sp()}=${sp()}` + texteEnCouleurEtGras(estentier(reponse1) ? stringNombre(reponse1) : (stringNombre(reponse1) + '0') + '€') + '<br>'
              texteCorr += `Le ${personnage1} de ${quidam} dépense chaque semaine ${estentier(reponse1) ? stringNombre(reponse1) : (stringNombre(reponse1) + '0')} € pour son journal.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + '€' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += `À quelle heure le ${personnage1} de ${quidam} arrive-t-il à son travail ?`
              texteCorr += texteEnCouleurEtGras(nb3) + `$${sp()}+${sp()}$` + texteEnCouleurEtGras(nb5 + ' min') + `${sp()}=${sp()}` + texteEnCouleurEtGras(minToHour(reponse2[0] * 60 + reponse2[1])) + '<br>'
              texteCorr += `Le ${personnage1} de ${quidam} arrive à son travail ${minToHoraire(reponse2[0] * 60 + reponse2[1])}.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'h' })
                setReponse(this, i + ii, reponse2[0])
                ii++
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur10 inline', { texte: '', texteApres: sp(3) + 'min' })
                setReponse(this, i + ii, reponse2[1])
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: `\\begin{flushright}heures ${sp(65)} \\end{flushright}`,
                          valeur: [reponse2[0]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2[0]),
                            decimals: 0,
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
                          texte: `\\begin{flushright}minutes ${sp(65)} \\end{flushright}`,
                          valeur: [reponse2[1]],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse2[1]),
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
          texte += `Un livreur part de son entrepôt avec ${nb1} colis. Au premier arrêt, le plus près, il depose ${nb2} colis. ${nb3} km plus loin, il livre le reste de ses colis. `
          texte += `Ensuite, à ${nb4}, le livreur reprend la même route et retourne à l'entrepôt, à ${nb5} km de là.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quelle distance sépare l\'entrepôt du premier arrêt ?'
              reponse = nb5 - nb3
              texteCorr += texteEnCouleurEtGras(nb5 + ' km') + `$${sp()}-${sp()}$` + texteEnCouleurEtGras(nb3 + ' km') + `${sp()}=${sp()}` + texteEnCouleurEtGras(reponse + ' km') + '<br>'
              texteCorr += `La distance séparant l'entrepôt du premier arrêt est de ${reponse} km.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'km' })
                setReponse(this, i + ii, reponse)
              }
              break
            case 2:
              texte += 'Combien de colis le livreur a-t-il déposé à son deuxième arrêt ?'
              reponse = nb1 - nb2
              texteCorr += texteEnCouleurEtGras(nb1 + ' colis') + `$${sp()}-${sp()}$` + texteEnCouleurEtGras(nb2 + ' colis') + `${sp()}=${sp()}` + texteEnCouleurEtGras(reponse + ' colis') + '<br>'
              texteCorr += `Le livreur a déposé ${reponse} colis à son deuxième arrêt.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'colis' })
                setReponse(this, i + ii, reponse)
              }
              break
          }
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonceAvant: false,
              propositions: [
                {
                  type: 'AMCOpen',
                  propositions: [{
                    enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                    sanscadre: true,
                    texte: texteCorr,
                    statut: 3
                  }]
                },
                {
                  type: 'AMCNum',
                  propositions: [{
                    texte: '',
                    statut: '',
                    reponse: {
                      texte: '',
                      valeur: [reponse],
                      alignement: 'flushright',
                      param: {
                        digits: nombreDeChiffresDe(reponse),
                        decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                        signe: false,
                        approx: 0
                      }
                    }
                  }]
                }
              ]
            }
          }
          break
        case 10:
          quidam = choice(['du Havre', 'de Rotterdam', 'de Hambourg', 'de Marseille', 'de Lisbonne'])
          quidam2 = choice(['Hong-Kong', 'Rio de Janeiro', 'Auckland', 'Sidney', 'Kuala Lumpur'])
          nb1 = randint(85, 153)
          nb2 = randint(67, 86)
          nb3 = randint(7, 15)
          nb4 = randint(7, 26)
          nb5 = randint(80, 120)
          nb5 = arrondi(nb4 * nb5 / 100)
          reponse2 = arrondi(nb5 / nb4, 3)
          nb5 = stringNombre(nb5)

          texte += `Un cargo mesurant ${nb1} m transporte ${nb2} gros conteneurs de ${nb3} tonnes chacun ${quidam} à ${quidam2}. `
          texte += `Ce bateau transporte aussi ${nb4} petits conteneurs pour une masse totale de ${nb5} tonnes.<br>`

          switch (choixVersion) {
            case 1:
              texte += 'Quelle est la masse, en kg, de chacun des petits conteneurs, sachant qu\'ils ont tous la même masse ?'
              reponse1 = arrondi(reponse2 * 1000, 0)
              texteCorr += texteEnCouleurEtGras(nb5 + ' tonnes') + `$${sp()}\\div${sp()}$` + texteEnCouleurEtGras(nb4) + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse2) + ' tonnes') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse1) + ' kg') + '<br>'
              texteCorr += `La masse de chacun des petits conteneurs est de ${stringNombre(reponse1)} kg.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'kg' })
                setReponse(this, i + ii, reponse1)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse1],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse1),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse1),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
            case 2:
              texte += 'Quelle est la masse totale, en tonnes, des gros conteneurs ?'
              reponse = nb2 * nb3
              texteCorr += texteEnCouleurEtGras(nb2) + `$${sp()}\\times${sp()}$` + texteEnCouleurEtGras(nb3 + ' tonnes') + `${sp()}=${sp()}` + texteEnCouleurEtGras(stringNombre(reponse) + ' tonnes') + '<br>'
              texteCorr += `La masse totale des gros conteneurs est de ${reponse} tonnes.`
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, i + ii, 'largeur25 inline', { texte: '', texteApres: sp(3) + 'tonnes' })
                setReponse(this, i + ii, reponse)
              }
              if (context.isAmc) {
                this.autoCorrection[i] = {
                  enonceAvant: false,
                  propositions: [
                    {
                      type: 'AMCOpen',
                      propositions: [{
                        enonce: texte + '<br><br>Indique, ci-dessous, le(s) calcul(s) effectué(s) et code ensuite le résultat.',
                        sanscadre: true,
                        texte: texteCorr,
                        statut: 3
                      }]
                    },
                    {
                      type: 'AMCNum',
                      propositions: [{
                        texte: '',
                        statut: '',
                        reponse: {
                          texte: '',
                          valeur: [reponse],
                          alignement: 'flushright',
                          param: {
                            digits: nombreDeChiffresDe(reponse),
                            decimals: nombreDeChiffresDansLaPartieDecimale(reponse),
                            signe: false,
                            approx: 0
                          }
                        }
                      }]
                    }
                  ]
                }
              }
              break
          }
          break
      }

      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireTexte = ['Choix des problèmes', 'Nombres séparés par des tirets\n1 : Livres\n2 : Haricots\n3 : Villages de montagne\n4 : Manga\n5 : Film\n6 : Vélo\n7 : Taille\n8 : Gare\n9 : Livreur\n10 : Cargo\n11 : Tous les problèmes\n']
}
