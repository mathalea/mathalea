import Exercice from '../../Exercice.js'
import { listeQuestionsToContenu, randint, calcul, choice, ecritureAlgebrique, texNombrec, ecritureParentheseSiNegatif, rienSi1, texFraction } from '../../../modules/outils.js'
import { propositionsQcm } from '../../../modules/interactif/questionQcm.js'
export const titre = 'Trouver le sens de variation d’une suite (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '19/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 * Référence
*/
export const uuid = 'd1261'
export const ref = 'can1S10'
export default function SensVariationSuite () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.nbQuestions = 1
  this.tailleDiaporama = 2
  this.spacing = 2
  // Dans un exercice simple, ne pas mettre de this.listeQuestions = [] ni de this.consigne
  this.nouvelleVersion = function () {
    this.listeQuestions = []
    this.listeCorrections = []

    let texte, texteCorr, a, q, b, c, choix, listeFractions1, fraction1, n1, d1
    const nomSuite = ['u', 'v', 'w', 't']
    const s = choice(nomSuite)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      switch (choice([1, 2, 3, 4])) { // 1
        case 1 :
          choix = choice([1, 2, 3])// 1,2
          if (choix === 1) { // suite explicite avec fonction racine carrée
            a = randint(1, 10) * choice([-1, 1])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${rienSi1(a)}\\sqrt{n} $.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `La suite est définie de manière explicite. Le sens de variation de la fonction $f$ associée donne le sens de variation de la suite.<br>
             La fonction racine carrée définie sur $[0;+\\infty[$ est strictement croissante.<br>`
            texteCorr += `On en déduit que la fonction $x \\longmapsto ${rienSi1(a)}\\sqrt{x}$ est strictement `
            if (a > 0) { texteCorr += `croissante sur $[0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement croissante. ` } else { texteCorr += `décroissante sur $[0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement décroissante. ` }
          }
          if (choix === 2) { // suite explicite avec fonction inverse
            a = randint(1, 10) * choice([-1, 1])
            // u = randint(1, 10) * choice([-1, 1])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}^*$ par $${s}_{n} =\\dfrac{${a}}{n}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `La suite est définie de manière explicite. Le sens de variation de la fonction $f$ associée donne le sens de variation de la suite.<br>
             La fonction inverse définie sur $]0;+\\infty[$ est strictement décroissante.<br>`
            texteCorr += `On en déduit que la fonction $x \\longmapsto \\dfrac{${a}}{x}=${a}\\times \\dfrac{1}{x}$ est strictement `
            if (a > 0) { texteCorr += `décroissante sur $]0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement décroissante. ` } else { texteCorr += `croissante sur $]0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement croissante. ` }
          }
          if (choix === 3) { // suite explicite avec fonction affine
            a = randint(1, 10) * choice([-1, 1])
            b = randint(1, 10) * choice([-1, 1])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${rienSi1(a)}n${ecritureAlgebrique(b)}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `La suite est définie de manière explicite. Le sens de variation de la fonction $f$ associée donne le sens de variation de la suite.<br>
             La fonction affine $f$ définie sur $[0;+\\infty[$ par $f(x)=${rienSi1(a)}x${ecritureAlgebrique(b)}$ est strictement  `
            if (a > 0) { texteCorr += `croissante sur $[0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement croissante. ` } else { texteCorr += `décroissante sur $[0;+\\infty[$ et donc la suite $(${s}_{n})$ est strictement décroissante. ` }
          }
          break
        case 2 :
          choix = choice([1, 2, 3])//
          if (choix === 1) { // suite géométrique directe avec q>1 ou q<0
            q = randint(-10, 10, [0, 1])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${ecritureParentheseSiNegatif(q)}^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`
            if (q > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${q}$ et de premier terme $${s}_{0}=1$. <br>`
            if (q > 0) { texteCorr += `Comme $q>1$ et que le premier terme est positif, la suite $(${s}_{n})$ est strictement croissante. ` } else { texteCorr += `Comme $q<0$, la suite $(${s}_{n})$ est ni croissante, ni décroissante. ` }
          }
          if (choix === 2) { // suite géométrique q^n avec 0<q<1
            q = calcul(randint(1, 9) / 10)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${texNombrec(q)}^n$.<br>
              Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'décroissante',
                  statut: true
                },
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texNombrec(q)}$ et de premier terme $${s}_0=1$. <br>`
            texteCorr += `Comme $0 < q < 1$ et que le premier terme est  positif, la suite $(${s}_{n})$ est strictement décroissante. `
          }
          if (choix === 3) { // suite géométrique avec q<0
            q = choice([calcul(randint(-9, -1) / 10), randint(-10, -1)])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =(${texNombrec(q)})^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'décroissante',
                  statut: false
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: true
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texNombrec(q)}$ et de premier terme $${s}_0=1$. <br>`
            texteCorr += `Comme $ q < 0$, la suite $(${s}_{n})$ est ni croissante, ni décroissante. `
          }

          break
        case 3 :
          choix = choice([1, 2, 3, 4, 5, 6, 7, 8])//
          if (choix === 1) { // suite géométrique (a/b)^n avec 0<a/b<1
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =\\left(${texFraction(n1, d1)}\\right)^n$.<br>
                Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'décroissante',
                  statut: true
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texFraction(n1, d1)}$ et de premier terme $${s}_0=1$. <br>`
            texteCorr += `Comme $ 0 < q < 1$ et que le premier terme est positif, la suite $(${s}_{n})$ est  décroissante. `
          }
          if (choix === 2) { // suite géométrique (a/b)^n avec a/b>1
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =\\left(${texFraction(d1, n1)}\\right)^n$.<br>
                Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'croissante',
                  statut: true
                },
                {
                  texte: 'décroissante',
                  statut: false
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texFraction(d1, n1)}$ et de premier terme $${s}_0=1$. <br>`
            texteCorr += `Comme $q>1$ et que le premier terme est positif, la suite $(${s}_{n})$ est  croissante. `
          }
          if (choix === 3) { // suite géométrique a*q^n avec q>1 ou q<0  et a>0
            q = randint(-10, 10, [0, 1])
            a = randint(2, 10)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${a}\\times ${ecritureParentheseSiNegatif(q)}^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`
            if (q > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${q}$ et de premier terme $${s}_{0}=${a}$. <br>`
            if (q > 0) { texteCorr += `Comme $q>1$ et que le premier terme est positif, la suite $(${s}_{n})$ est strictement croissante. ` } else { texteCorr += `Comme $q<0$, la suite $(${s}_{n})$ est ni croissante, ni décroissante. ` }
          }
          if (choix === 4) { // suite géométrique a*q^n avec q>1 ou q<0 et a<0
            q = randint(-10, 10, [0, 1])
            a = randint(-10, -2)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =(${a})\\times ${ecritureParentheseSiNegatif(q)}^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`
            if (q > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${q}$ et de premier terme $${s}_{0}=${a}$. <br>`
            if (q > 0) { texteCorr += `Comme $q>1$ et que le premier terme est négatif, la suite $(${s}_{n})$ est strictement décroissante. ` } else { texteCorr += `Comme $q<0$, la suite $(${s}_{n})$ est ni croissante, ni décroissante. ` }
          }

          if (choix === 5) { // suite géométrique a*q^n avec 0<q <1 et a>0
            q = calcul(randint(1, 9) / 10)
            a = randint(2, 10)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${a}\\times ${texNombrec(q)}^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                },
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'décroissante',
                  statut: true
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${q}$ et de premier terme $${s}_{0}=${a}$. <br>`
            texteCorr += `Comme $0 < q <1$ et que le premier terme est positif, la suite $(${s}_{n})$ est strictement décroissante. `
          }
          if (choix === 6) { // suite géométrique a*q^n avec 0<q <1 et a<0
            q = calcul(randint(1, 9) / 10)
            a = randint(-10, -2)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =(${a})\\times ${texNombrec(q)}^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                },
                {
                  texte: 'croissante',
                  statut: true
                },
                {
                  texte: 'décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texNombrec(q)}$ et de premier terme $${s}_{0}=${a}$. <br>`
            texteCorr += `Comme $0 < q <1$ et que le premier terme est négatif, la suite $(${s}_{n})$ est strictement croissante. `
          }
          if (choix === 7) { // suite géométrique a*q^n q fraction comprise entre 0 et 1 et a >0
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            a = randint(2, 10)
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${a}\\times \\left(${texFraction(n1, d1)}\\right)^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                },
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'décroissante',
                  statut: true
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${q}$ et de premier terme $${s}_{0}=${a}$. <br>`
            texteCorr += `Comme $0 < q <1$ et que le premier terme est positif, la suite $(${s}_{n})$ est strictement décroissante. `
          }
          if (choix === 8) { // suite géométrique a*q^n q fraction >1
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            a = randint(-10, 10, [-1, 0, 1])
            texte = `Soit $(${s}_n)$ une suite définie  pour tout  $n\\in\\mathbb{N}$ par $${s}_{n} =${ecritureParentheseSiNegatif(a)}\\times \\left(${texFraction(d1, n1)}\\right)^n$.<br>
            Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'décroissante',
                    statut: true
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la forme explicite d'une suite géométrique de raison $q=${texFraction(d1, n1)}$ et de premier terme $${s}_{0}=${a}$. <br>`
            if (a > 0) { texteCorr += `Comme $q > 1$ et que le premier terme est positif, la suite $(${s}_{n})$ est strictement croissante. ` } else { texteCorr += `Comme $q > 1$ et que le premier terme est négatif, la suite $(${s}_{n})$ est strictement décroissante. ` }
          }
          break

        case 4 :
          choix = choice([1, 2, 3, 4, 5, 6, 7, 8])//,
          if (choix === 1) { // suite recurrente u(n+1)=u(n)+bn+c avec bn+c >0
            a = randint(1, 10) * choice([-1, 1])
            b = randint(1, 10)
            c = randint(1, 10)
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${s}_n+${rienSi1(b)}n+${c}$.<br>
          Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'décroissante',
                  statut: false
                },
                {
                  texte: 'croissante',
                  statut: true
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `L'égalité $${s}_{n+1} =${s}_n+${rienSi1(b)}n+${c}$ s'écrit $${s}_{n+1} -${s}_n=${rienSi1(b)}n+${c} >0$. <br>
            On en déduit que la suite $(${s}_n)$ est coissante.`
          }
          if (choix === 2) { // suite recurrente u(n+1)=u(n)+bn+c avec bn+c <0
            a = randint(1, 10) * choice([-1, 1])
            b = randint(-10, -2)
            c = randint(-10, -1)
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${s}_n${ecritureAlgebrique(b)}n${ecritureAlgebrique(c)}$.<br>
          Alors, $(${s}_n)$ est une suite ...`

            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: 'décroissante',
                  statut: true
                },
                {
                  texte: 'croissante',
                  statut: false
                },
                {
                  texte: 'ni croissante, ni décroissante',
                  statut: false
                }
              ]
            }
            texte += propositionsQcm(this, i).texte

            texteCorr = `L'égalité $${s}_{n+1} =${s}_n+${rienSi1(b)}n+${c}$ s'écrit $${s}_{n+1} -${s}_n=${ecritureAlgebrique(b)}n${ecritureAlgebrique(c)}<0$. <br>
            On en déduit que la suite $(${s}_n)$ est décoissante.`
          }
          if (choix === 3) { // suite recurrente u(n+1)=u(n)+b
            a = randint(1, 10) * choice([-1, 1])
            b = randint(-10, 10, 0)

            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${s}_n${ecritureAlgebrique(b)}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (b > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite arithmétique de raison $${b}$.<br>`
            if (b > 0) { texteCorr += `Comme $${b}>0$, la suite $(${s}_n)$ est croissante. ` } else { texteCorr += `Comme $${b}<0$, la suite $(${s}_n)$ est décroissante. ` }
          }
          if (choix === 4) { // suite recurrente u(n+1)=q*u(n) avec q>1 ou q<0 et a>0
            a = randint(1, 10)
            q = randint(-10, 10, [0, 1, -1])

            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${q}${s}_n$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (q > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: true
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite géométrique de raison $${q}$.<br>`
            if (q > 0) { texteCorr += `Comme $${q}>0$ et que le premier terme est positif, alors la suite $(${s}_n)$ est croissante. ` } else { texteCorr += `Comme $${q}<0$, la suite $(${s}_n)$ est ni croissante, ni décroissante. ` }
          }
          if (choix === 5) { // suite recurrente u(n+1)=q*u(n) avec q>1 ou q<0 et a<0
            a = randint(-10, -2)
            q = randint(-10, 10, [0, 1, -1])

            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${q}${s}_n$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (q > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: true
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite géométrique de raison $${q}$.<br>`
            if (q > 0) { texteCorr += `Comme $${q}>0$ et que le premier terme est négatif, alors la suite $(${s}_n)$ est décroissante. ` } else { texteCorr += `Comme $${q}<0$, la suite $(${s}_n)$ est ni croissante, ni décroissante. ` }
          }

          if (choix === 6) { // suite recurrente u(n+1)=q*u(n) avec 0<q<1
            a = randint(-10, 10, [-1, 0, 1])
            q = calcul(randint(1, 9) / 10)

            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${texNombrec(q)}${s}_n$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite géométrique de raison $${q}$.<br>`
            if (a > 0) { texteCorr += `Comme $ 0< ${texNombrec(q)} <1$ et que le premier terme est positif, alors la suite $(${s}_n)$ est décroissante. ` } else { texteCorr += `Comme $ 0< ${texNombrec(q)} <1$ et que le premier terme est négatif, alors la suite $(${s}_n)$ est croissante. ` }
          }

          if (choix === 7) { // suite recurrente u(n+1)=q*u(n) avec 0<q<1 fraction
            a = randint(-10, 10, [-1, 0, 1])
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${texFraction(n1, d1)}${s}_n$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite géométrique de raison $${texFraction(n1, d1)}$.<br>`
            if (a > 0) { texteCorr += `Comme $ 0< ${texFraction(n1, d1)} <1$ et que le premier terme est positif, alors la suite $(${s}_n)$ est décroissante. ` } else { texteCorr += `Comme $ 0< ${texFraction(n1, d1)} <1$ et que le premier terme est négatif, alors la suite $(${s}_n)$ est croissante. ` }
          }

          if (choix === 8) { // suite recurrente u(n+1)=q*u(n) avec q>1 fraction
            a = randint(-10, 10, [-1, 0, 1])
            listeFractions1 = [[1, 2], [2, 3], [3, 4], [2, 5], [4, 5],
              [5, 6], [2, 7], [4, 7], [6, 7], [3, 8], [7, 8],
              [2, 9], [5, 9], [8, 9], [1, 10], [3, 10], [7, 10], [9, 10]]
            fraction1 = choice(listeFractions1)
            n1 = fraction1[0]
            d1 = fraction1[1]
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_{0}=${a}$ pour tout  $n\\in\\mathbb{N}$ : $${s}_{n+1} =${texFraction(d1, n1)}${s}_n$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            if (a > 0) {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: false
                  },
                  {
                    texte: 'croissante',
                    statut: true
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            } else {
              this.autoCorrection[i] = {
                enonce: texte,
                options: { horizontal: true },
                propositions: [
                  {
                    texte: 'décroissante',
                    statut: true
                  },
                  {
                    texte: 'croissante',
                    statut: false
                  },
                  {
                    texte: 'ni croissante, ni décroissante',
                    statut: false
                  }
                ]
              }
              texte += propositionsQcm(this, i).texte
            }
            texteCorr = `On reconnaît la relation de récurrence d'une suite géométrique de raison $${texFraction(d1, n1)}$.<br>`
            if (a > 0) { texteCorr += `Comme $  ${texFraction(d1, n1)} >1$ et que le premier terme est positif, alors la suite $(${s}_n)$ est croissante. ` } else { texteCorr += `Comme $ 0< ${texFraction(d1, n1)} <1$ et que le premier terme est négatif, alors la suite $(${s}_n)$ est décroissante. ` }
          }
          break
      }

      if (this.questionJamaisPosee(i, q, n1, d1, a)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
