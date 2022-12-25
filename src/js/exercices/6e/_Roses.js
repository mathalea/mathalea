/* eslint-disable camelcase */
import { choice, contraindreValeur, lettreMinusculeDepuisChiffre, listeQuestionsToContenu, randint, sp } from '../../modules/outils.js'
import { point, rotation, similitude, texteParPoint, longueur, segment, homothetie, polygoneRegulierParCentreEtRayon, latexParPoint } from '../../modules/2d.js'
import { create, all } from 'mathjs'
import { calculer } from '../../modules/outilsMathjs.js'
import Exercice from '../Exercice.js'
import { mathalea2d, colorToLatexOrHTML, vide2d, fixeBordures } from '../../modules/2dGeneralites.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
import * as pkg from '@cortex-js/compute-engine'
const { ComputeEngine } = pkg
export const interactifReady = true
export const interactifType = 'custom'
let engine
if (context.versionMathalea) engine = new ComputeEngine()
const math = create(all)

/**
 * Travailler les tables de multiplication autrement
 * @author Jean-Claude Lhote
 * Référence 6C10-6
 */
export class Rose {
  // operation = 'addition' | 'multiplication
  // type = 'résultats' | 'valeurs' | 'can1' | 'can2' | 'solutions'
  constructor ({ values = [], nombreDeValeurs, rayon = 2, operation = 'addition', type = 'résultats', typeDonnees = 'entiers', cellulesPreremplies = Array.from('abcdefghi'), valeurMax = 10, indexInconnue = 999 }) {
    this.type = type
    this.operation = operation
    this.typeDonnees = typeDonnees
    this.nombreDeValeurs = nombreDeValeurs
    this.cellulesPreremplies = cellulesPreremplies
    this.rayon = rayon
    this.resultats = []
    this.valeurMax = valeurMax
    this.indexInconnue = indexInconnue

    if (values === undefined || values.length === 0) {
      while (this.valeurMax - 2 < this.nombreDeValeurs) {
        this.valeurMax++
      }
      const den = randint(2, this.valeurMax)
      for (let i = 0; i < this.nombreDeValeurs; i++) {
        switch (this.typeDonnees) {
          case 'entiers' :
            values.push(randint(1, this.valeurMax, values))
            this.rayon = 2
            break
          case 'entiers relatifs' :
            values.push(randint(-this.valeurMax, this.valeurMax, [0, ...values]))
            this.rayon = 2
            break
          case 'litteraux' :
            values.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`, null).printResult)
            this.rayon = 3
            break
          case 'fractions dénominateurs multiples':
            values.push(math.fraction(randint(1, this.valeurMax), den))
            this.rayon = 3
            break
          case 'fractions positives dénominateurs premiers':
            values.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            this.rayon = 3
            break

          case 'fractions positives' :
            values.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            this.rayon = 3
            break
          case 'fractions relatives' :
            values.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            this.rayon = 3
            break
        }
      }
    } else { // si elles sont définies, on complète éventuellement la grille aléatoirement.
      for (let i = this.values.length; i < this.nombreDeValeurs; i++) {
        switch (this.typeDonnees) {
          case 'entiers' :
            values.push(randint(1, this.valeurMax, values))
            break
          case 'entiers relatifs' :
            values.push(randint(-this.valeurMax, this.valeurMax, [0, ...values]))
            break
          case 'litteraux' :
            values.push(calculer(`${randint(1, this.valeurMax)}x + ${randint(1, this.valeurMax)}`, null).printResult)
            break
          case 'fractions dénominateurs multiples':
            values.push(math.fraction(randint(1, this.valeurMax), values[i - 1].d))
            break
          case 'fractions positives dénominateurs premiers':
            values.push(math.fraction(randint(1, this.valeurMax), choice([2, 3, 5, 7])))
            break
          case 'fractions positives' :
            values.push(math.fraction(randint(1, this.valeurMax), randint(2, this.valeurMax)))
            break
          case 'fractions relatives' :
            values.push(math.fraction(randint(-this.valeurMax, this.valeurMax, 0), randint(2, this.valeurMax)))
            break
        }
      }
    }
    this.values = values
    this.calculeResultats()
  }

  // méthode qui calcule les résultats si on le veut (sinon on peut les renseigner dans this.resultats manuellement)
  calculeResultats () {
    for (let i = 0; i < this.nombreDeValeurs; i++) {
      this.resultats[i] = this.operate(this.values[i], this.values[(i + 1) % this.nombreDeValeurs])
    }
  }

  // fonction utilisée par calculeResultats
  operate (a, b) {
    switch (this.operation) {
      case 'addition':
        if (this.typeDonnees !== 'litteraux') {
          if (this.typeDonnees.substring(0, 4) === 'frac') {
            return math.fraction(math.add(a, b))
          } else {
            return math.add(a, b)
          }
        } else {
          return calculer(`${a.toString()}+${b.toString()}`, null).printResult
        }
      case 'multiplication':
        if (this.typeDonnees !== 'litteraux') {
          if (this.typeDonnees.substring(0, 4) === 'frac') {
            return math.fraction(math.multiply(a, b))
          } else {
            return math.multiply(a, b)
          }
        } else {
          return calculer(`(${a.toString()})*(${b.toString()})`, null).printResult
        }
    }
  }

  representation () {
    if (this.type === 'résultats') {
      this.rayonBoite = 1
    } else {
      if (this.typeDonnees.substring(0, 4) === 'frac') this.rayonBoite = 1.5
      else if (this.typeDonnees === 'litteraux') this.rayonBoite = 2.8
      else this.rayonBoite = 1
    }
    const objets = []
    const O = point(0, 0, '', '')
    const A = rotation(point(this.rayon, 0, '', ''), O, 180 / this.nombreDeValeurs - 90)
    for (let i = 0, bulle1, bulle2; i < this.nombreDeValeurs; i++) {
      const M = rotation(A, O, 360 * i / this.nombreDeValeurs)
      M.positionLabel = 'center'
      const B = similitude(M, O, 180 / this.nombreDeValeurs, 1.3)
      const D = similitude(M, O, -180 / this.nombreDeValeurs, 1.3)
      const C = homothetie(M, O, 1.6)
      const N = rotation(C, O, 360 / this.nombreDeValeurs)
      const P = similitude(M, O, 180 / this.nombreDeValeurs, 2.5)
      const s = segment(O, B, 'black')
      const t = segment(B, C, 'black')
      const u = segment(C, D, 'black')
      const s1 = homothetie(segment(C, P), C, (longueur(C, P) - this.rayonBoite) / longueur(C, P))
      s1.styleExtremites = '->'
      s1.tailleExtremites = 2
      s1.pointilles = 2
      const s2 = homothetie(segment(N, P), N, (longueur(N, P) - this.rayonBoite) / longueur(N, P))
      s2.styleExtremites = '->'
      s2.tailleExtremites = 2
      s2.pointilles = 2
      if (this.type === 'can1') {
        bulle1 = vide2d() // rotation(boite({??????}), M, 180 / this.nombreDeValeurs - 90)
      } else {
        bulle1 = vide2d()
      }
      objets.push(bulle1)
      objets.push(s, t, u, s1, s2)
      bulle2 = rotation(polygoneRegulierParCentreEtRayon(P, this.rayonBoite, this.nombreDeValeurs), P, 360 / this.nombreDeValeurs - 90)
      if (this.type === 'résultats' || this.type === 'solutions' || this.type === 'can1' || this.type === 'can2') {
        if (!(this.type === 'can1' && (this.indexInconnue === i || i === (this.indexInconnue - 1) % this.nombreDeValeurs || i === (this.indexInconnue + 1) % this.nombreDeValeurs))) {
          if (!(this.type === 'can2' && (this.indexInconnue === i || i === (this.indexInconnue + 1) % this.nombreDeValeurs))) {
            if (this.typeDonnees !== 'litteraux' && this.typeDonnees.substring(0, 4) !== 'frac') {
              objets.push(texteParPoint(this.values[i].toString(), M, 'milieu', 'black', 1, 'middle', true))
            } else {
              if (this.typeDonnees !== 'litteraux') {
                if (this.values[i].d === 1) {
                  objets.push(texteParPoint(this.values[i].toLatex().replace('frac', 'dfrac'), M, 'milieu', 'black', 1, 'middle', true))
                } else {
                  objets.push(latexParPoint(this.values[i].toLatex().replace('frac', 'dfrac'), M, 'black', 20, 0, ''))
                }
              } else {
                objets.push(latexParPoint(this.values[i], M, 'black', 70, 12, ''))
              }
            }
          }
        }
        if (this.type === 'can1' && this.indexInconnue === i) {
          objets.push(texteParPoint(lettreMinusculeDepuisChiffre(i + 1), M))
        }
      }
      if (this.type === 'solutions' || this.type === 'valeurs' || this.type === 'can1' || this.type === 'can2') { // on ajoute les produits
        if (!(this.type === 'can2' && this.indexInconnue === i)) {
          if (this.typeDonnees !== 'litteraux' && this.typeDonnees.substring(0, 4) !== 'frac') {
            objets.push(texteParPoint((this.resultats[i]).toString(), P, 'milieu', 'black', 1, 'middle', true))
          } else {
            if (this.typeDonnees !== 'litteraux') {
              if (this.resultats[i].d === 1) {
                objets.push(texteParPoint(this.resultats[i].toLatex().replace('frac', 'dfrac'), P, 'milieu', 'black', 1, 'middle', true))
              } else {
                objets.push(latexParPoint(this.resultats[i].toLatex().replace('frac', 'dfrac'), P, 'black', 20, 0, ''))
              }
            } else {
              objets.push(latexParPoint(this.resultats[i], P, 'black', 70, 10, ''))
            }
          }
        }
        if (this.type === 'can2' && this.indexInconnue === i) {
          objets.push(texteParPoint(lettreMinusculeDepuisChiffre(i + 1), P))
        } else {
          bulle2.color = colorToLatexOrHTML('black')
          if (this.type === 'valeurs') {
            objets.push(texteParPoint(lettreMinusculeDepuisChiffre(i + 1), M))
          }
        }
      } else {
        objets.push(texteParPoint(this.cellulesPreremplies[i], P, 'milieu', 'black', 1, 'middle', true))
      }

      objets.push(bulle2)
    }
    return objets
  }
}
export function ExoRose () {
  Exercice.call(this)
  this.spacing = 2
  this.tailleDiaporama = 3
  this.nbQuestions = 1
  this.sup = 10
  this.sup2 = 4
  this.sup3 = 1
  this.operation = 'multiplication'
  this.type = 'résultats'
  this.typeDonnees = 'entiers'
  this.nombreDeValeurs = 4
  this.valeurMax = 10
  this.roses = []

  this.indexInconnue = []
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.valeurMax = contraindreValeur(10, 30, this.sup, 10)
    this.nombreDeValeurs = contraindreValeur(3, 9, this.sup2, 5)
    this.sup3 = contraindreValeur(1, 4, this.sup3, 1)
    switch (this.sup3) {
      case 1:
        this.type = 'résultats'
        if (this.typeDonnees.substring(0, 4) === 'frac' || this.typeDonnees === 'litteraux') {
          if (this.nombreDeValeurs > 5) this.nombreDeValeurs = 5
        }
        break
      case 2:
        this.type = 'valeurs'
        break
      case 3:
        if (this.typeDonnees.substring(0, 4) === 'frac' || this.typeDonnees === 'litteraux') {
          if (this.nombreDeValeurs > 5) this.nombreDeValeurs = 5
        }
        this.type = 'can1'
        break
      case 4:
        this.type = 'can2'
        if (this.typeDonnees.substring(0, 4) === 'frac' || this.typeDonnees === 'litteraux') {
          if (this.nombreDeValeurs > 5) this.nombreDeValeurs = 5
        }
        break
    }

    for (
      let i = 0, objets, objetsCorr, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.indexInconnue[i] = randint(0, this.nombreDeValeurs - 1)
      if (this.operation === 'multiplication') {
        this.introduction = 'Les nombres situés à l\'extrémité des flèches sont les produits des nombres dont les flèches sont issues.'
      } else {
        this.introduction = 'Les nombres situés à l\'extrémité des flèches sont les sommes des nombres dont les flèches sont issues.'
      }
      switch (this.type) {
        case 'résultats':
          if (this.operation === 'multiplication') {
            this.consigne = 'Calculer les produits à l\'extrémité des flèches.'
          } else {
            this.consigne = 'Calculer les sommes à l\'extrémité des flèches.'
          }
          break
        case 'valeurs':
          if (this.operation === 'multiplication') {
            this.consigne = 'Retrouver les facteurs à l\'origine des flèches.'
          } else {
            this.consigne = 'Retrouver les termes à l\'origine des flèches.'
          }
          break
        case 'can1':
          if (this.typeDonnees === 'nombres') {
            this.consigne = `Trouver le nombre de la case ${lettreMinusculeDepuisChiffre(this.indexInconnue[i] + 1)}.`
          } else {
            this.consigne = `Trouver l'expression de la case ${lettreMinusculeDepuisChiffre(this.indexInconnue[i] + 1)}.`
          }
          break
        case 'can2':
          if (this.typeDonnees === 'nombres') {
            this.consigne = `Trouver le nombre de la case ${lettreMinusculeDepuisChiffre(this.indexInconnue[i] + 1)}.`
          } else {
            this.consigne = `Trouver l'expression de la case ${lettreMinusculeDepuisChiffre(this.indexInconnue[i] + 1)}.`
          }
          break
      }

      this.roses[i] = new Rose({ nombreDeValeurs: this.nombreDeValeurs, type: this.type, operation: this.operation, valeurMax: this.valeurMax, typeDonnees: this.typeDonnees, indexInconnue: this.indexInconnue[i] })
      objets = this.roses[i].representation()
      this.roses[i].type = 'solutions'
      objetsCorr = this.roses[i].representation()
      texte = mathalea2d(Object.assign({}, fixeBordures(objets)), objets)
      if (this.interactif) {
        if (this.type.substring(0, 3) === 'can') {
          texte += ajouteChampTexteMathLive(this, i, 'nospacebefor', { texte: `${lettreMinusculeDepuisChiffre(this.indexInconnue[i] + 1)}=`, tailleExtensible: true })
        } else {
          for (let k = 0; k < this.nombreDeValeurs; k++) {
            texte += ajouteChampTexteMathLive(this, i * this.nombreDeValeurs + k, 'nospacebefor', { texte: `${lettreMinusculeDepuisChiffre(k + 1)}=`, tailleExtensible: true })
            texte += sp(6)
          }
        }
      }
      texteCorr = mathalea2d(Object.assign({}, fixeBordures(objetsCorr)), objetsCorr)
      if (this.questionJamaisPosee(i, ...this.roses[i].values)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Valeur maximale (entre 10 et 30) des facteurs', 30]
  this.besoinFormulaire2Numerique = ['Nombre de facteur entre 3 et 9 (limité à 5 pour les valeurs fractionnaires ou littérales)']
  this.besoinFormulaire3Numerique = ['Type de question', 4, '1 : Calculer les produits\n2 : Calculer les facteurs\n3 : Course aux nombres 1\n4 : Course aux nombres 2']

  this.correctionInteractive = i => {
    const taille = this.nombreDeValeurs
    const champsTexte = []
    const divFeedback = this.type.substring(0, 3) === 'can'
      ? document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${i}`)
      : document.querySelector(`#resultatCheckEx${this.numeroExercice}Q${(i + 1) * taille - 1}`)
    const saisies = []
    if (this.type.substring(0, 3) === 'can') {
      champsTexte[0] = document.getElementById(`champTexteEx${this.numeroExercice}Q${i}`)
      saisies[0] = champsTexte[0].value.replace(',', '.').replace(/\((\+?-?\d+)\)/, '$1')
    } else {
      for (let k = 0; k < taille; k++) {
        champsTexte[k] = document.getElementById(`champTexteEx${this.numeroExercice}Q${i * taille + k}`)
        saisies[k] = champsTexte[k].value.replace(',', '.').replace(/\((\+?-?\d+)\)/, '$1')
      }
    }
    let resultat
    if (this.saisieCoherente(saisies, taille, i)) {
      divFeedback.innerHTML = '😎'
      resultat = 'OK'
    } else {
      divFeedback.innerHTML = '☹️'
      resultat = 'KO'
    }
    return resultat
  }
  this.saisieCoherente = function (saisies, taille, question) {
    let resultatOK = true
    if (this.type === 'can2') {
      if (this.roses[question].typeDonnees.substring(0, 4) === 'frac') {
        return engine.parse(this.roses[question].resultats[this.indexInconnue[question]].toLatex()).canonical.isSame(engine.parse(saisies[0].toLatex()).canonical)
      } else {
        return engine.parse(this.roses[question].resultats[this.indexInconnue[question]]).canonical.isSame(engine.parse(saisies[0].toString()).canonical)
      }
    } else if (this.type === 'can1') {
      if (this.roses[question].typeDonnees.substring(0, 4) === 'frac') {
        return engine.parse(saisies[0]).canonical.isSame(engine.parse(this.roses[question].values[this.indexInconnue[question]].toLatex()).canonical)
      } else {
        return engine.parse(saisies[0]).canonical.isSame(engine.parse(this.roses[question].values[this.indexInconnue[question]].toString()).canonical)
      }
    } else {
      for (let i = 0; i < taille; i++) {
        if (this.type === 'résultats') {
          if (this.roses[question].typeDonnees.substring(0, 4) === 'frac') {
            resultatOK = resultatOK && engine.parse(saisies[i]).canonical.isEqual(engine.parse(this.roses[question].resultats[i].toLatex()))
          } else {
            resultatOK = resultatOK && engine.parse(saisies[i]).canonical.isEqual(engine.parse(this.roses[question].resultats[i].toString()).canonical)
          }
        } else {
          if (this.roses[question].typeDonnees.substring(0, 4) === 'frac') {
            resultatOK = resultatOK && engine.parse(`${saisies[i]}${this.roses[question].operation === 'addition' ? '+' : '\\times'}${saisies[(i + 1) % this.nombreDeValeurs]}`).canonical.isEqual(engine.parse(this.roses[question].resultats[i].toLatex()))
          } else {
            resultatOK = resultatOK && engine.parse(this.roses[question].operate(saisies[i], saisies[(i + 1) % this.nombreDeValeurs])).canonical.isEqual(engine.parse(this.roses[question].resultats[i].toString()).canonical)
          }
        }
      }
      return resultatOK
    }
  }
}
