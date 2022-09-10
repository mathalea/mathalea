import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, choice, ecritureAlgebrique, texNombrec, texFraction } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Donner la nature d’une suite (formule de récurrence)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'b119b'
export const ref = 'can1S04'
export default function NatureSuiteRec () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    let texte, texteCorr, a, b, u, listeFractions1, fraction1, n1, d1
    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) { //
        case 1 :// suite arithmétique simple
          a = randint(1, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${s}_n ${ecritureAlgebrique(a)}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${u}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${s}_n ${ecritureAlgebrique(a)}$.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=${s}_n+r$ avec $r=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break

        case 2 :// suite arith u_{n+1}-u_n=r
          a = randint(1, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1}  -${s}_n =${a}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${-a}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1}  -${s}_n =${a}$.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=${s}_n+r$ avec $r=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break
        case 3 :// suite arith u_n=u_{n+1}-r
          a = randint(1, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_n=${s}_{n+1}  ${ecritureAlgebrique(a)} $.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${-a}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${-a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_n=${s}_{n+1}  ${ecritureAlgebrique(a)} $.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=${s}_n+r$ avec $r=${-a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${-a}$ et de premier terme $${s}_0=${u}$.`

          break
        case 4 :// suite arith u_{n+1}=(au_n+a*r)/a
          a = randint(1, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])
          b = randint(1, 10) * choice([-1, 1])
          if (this.interactif) {
            texte = `Soit $(u_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1}  =\\dfrac{${b} ${s}_n${ecritureAlgebrique(b * a)}}{${b}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: true
                },
                {
                  texte: `arithmétique de raison $${-a}$`,
                  statut: false
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1}  =\\dfrac{${b} ${s}_n${ecritureAlgebrique(b * a)}}{${b}}$.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `Comme $${s}_{n+1}  =\\dfrac{${b} ${s}_n${ecritureAlgebrique(b * a)}}{${b}}=\\dfrac{${b} ${s}_n}{${b}}+\\dfrac{${b * a}}{${b}}= ${s}_n${ecritureAlgebrique(a)}$, alors 
        la formule de récurrence est de la forme $${s}_{n+1}=${s}_n+r$ avec $r=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break
        case 5 :// suite géo simple
          a = randint(2, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${a}${s}_n $.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: true
                },
                {
                  texte: `géométrique de raison $${u}$`,
                  statut: false
                },
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${s}_n ${ecritureAlgebrique(a)}$.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break

        case 6 :// suite géo u_n/a
          a = randint(2, 10)
          u = randint(1, 10) * choice([-1, 1])
          b = choice([-1, 1])
          if (this.interactif) {
            if (b < 0) {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = -\\dfrac{${s}_{n}}{${a}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `géométrique de raison $-\\dfrac{1}{${a}}$`,
                    statut: true
                  },
                  {
                    texte: `géométrique de raison $-${a}$`,
                    statut: false
                  },
                  {
                    texte: `arithmétique de raison $-${a}$`,
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = \\dfrac{${s}_{n}}{${a}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `géométrique de raison $\\dfrac{1}{${a}}$`,
                    statut: true
                  },
                  {
                    texte: `géométrique de raison $${a}$`,
                    statut: false
                  },
                  {
                    texte: `arithmétique de raison $${a}$`,
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
          } else {
            if (b < 0) {
              texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =- \\dfrac{${s}_{n}}{${a}}$.<br>
              Quelle est la nature de cette suite ? Donner sa raison.`
            } else {
              texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = \\dfrac{${s}_{n}}{${a}}$.<br>
             Quelle est la nature de cette suite ? Donner sa raison.`
            }
          }

          if (b < 0) {
            texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=-\\dfrac{1}{${a}}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $-\\dfrac{1}{${a}}$ et de premier terme $${s}_0=${u}$.`
          } else {
            texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=\\dfrac{1}{${a}}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $\\dfrac{1}{${a}}$ et de premier terme $${s}_0=${u}$.`
          }

          break
        case 7 :// suite géo u_{n+1}-u_n=au_n
          a = calcul(randint(2, 99) * choice([-1, 1])) / 100
          u = randint(1, 10) * choice([-1, 1])

          if (this.interactif) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} -${s}_{n}= ${texNombrec(a)}${s}_n $.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $${texNombrec(1 + a)}$`,
                  statut: true
                },
                {
                  texte: `géométrique de raison $${texNombrec(a)}$`,
                  statut: false
                },
                {
                  texte: `arithmétique de raison $${texNombrec(a)}$`,
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} -${s}_{n}= ${texNombrec(a)}${s}_n $.<br>
          Quelle est la nature de cette suite ? Donner sa raison.`
          }

          texteCorr = `$${s}_{n+1} -${s}_{n}= ${texNombrec(a)}${s}_n$ s'écrit : $${s}_{n+1} = ${texNombrec(a)}${s}_n+${s}_{n}=${texNombrec(1 + a)}${s}_n$.<br>
           La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=${texNombrec(1 + a)}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $${texNombrec(1 + a)}$ et de premier terme $${s}_0=${u}$.`

          break
        case 8 :// suite géo avec raison fraction
          listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
            [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
            [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
          fraction1 = choice(listeFractions1)
          n1 = fraction1[0]
          d1 = fraction1[1]
          a = randint(2, 10)
          u = randint(1, 10) * choice([-1, 1])
          b = choice([-1, 1])
          if (this.interactif) {
            if (b < 0) {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =${s}_{n} -${texFraction(n1, d1)}${s}_{n}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `géométrique de raison $${texFraction(d1 - n1, d1)}$`,
                    statut: true
                  },
                  {
                    texte: `géométrique de raison $${texFraction(n1, d1)}$`,
                    statut: false
                  },
                  {
                    texte: `arithmétique de raison $-${texFraction(n1, d1)}$`,
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =${s}_{n} +${texFraction(n1, d1)}${s}_{n}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: `géométrique de raison $${texFraction(d1 + n1, d1)}$`,
                    statut: true
                  },
                  {
                    texte: `géométrique de raison $${texFraction(n1, d1)}$`,
                    statut: false
                  },
                  {
                    texte: `arithmétique de raison $${texFraction(n1, d1)}$`,
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
          } else {
            if (b < 0) {
              texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =${s}_{n} -${texFraction(n1, d1)}${s}_{n}$.<br>
              Quelle est la nature de cette suite ? Donner sa raison.`
            } else {
              texte = `Soit $(${s}_n)$ une suite définie par $u_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =${s}_{n} +${texFraction(n1, d1)}${s}_{n}$.<br>
             Quelle est la nature de cette suite ? Donner sa raison.`
            }
          }

          if (b < 0) {
            texteCorr = `$${s}_{n+1} =${s}_{n} -${texFraction(n1, d1)}${s}_{n}=\\left(1-${texFraction(n1, d1)}\\right)${s}_{n}=${texFraction(d1 - n1, d1)}${s}_{n}$.<br>      
                        La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=${texFraction(d1 - n1, d1)}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $${texFraction(d1 - n1, d1)}$ et de premier terme $${s}_0=${u}$.`
          } else {
            texteCorr = `$${s}_{n+1} =${s}_{n} +${texFraction(n1, d1)}${s}_{n}=\\left(1+${texFraction(n1, d1)}\\right)${s}_{n}=${texFraction(d1 + n1, d1)}${s}_{n}$.<br>      
            La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=${texFraction(d1 + n1, d1)}$.<br>
On en déduit que $(${s}_n)$ est une suite géométrique de raison $${texFraction(d1 + n1, d1)}$ et de premier terme $${s}_0=${u}$.`
          }
          break
      }

      if (this.questionJamaisPosee(i, u, a)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
