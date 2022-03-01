import Exercice from '../Exercice.js'
import { listeQuestionsToContenu, randint, choice, combinaisonListes, abs, pgcd, texFractionReduite, obtenirListeFacteursPremiers, obtenirListeFractionsIrreductibles, obtenirListeNombresPremiers, decompositionFacteursPremiers, texFraction } from '../../modules/outils.js'
import { fraction } from '../../modules/fractions.js'
import { setReponse } from '../../modules/gestionInteractif.js'
import { ajouteChampTexteMathLive } from '../../modules/interactif/questionMathLive.js'
import { context } from '../../modules/context.js'
export const titre = 'Multiplier des fractions'
export const amcReady = true
export const amcType = 'AMCNum' // type de question AMC
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Exercice de calcul de produit de deux fractions.
 *
 * Paramétrages possibles :
 * * 1 : Produits de nombres positifs seulement
 * * 2 : deux questions niveau 1 puis deux questions niveau 3
 * * 3 : Produits de nombres relatifs
 * * Si décomposition cochée : les nombres utilisés sont plus importants.
 * @author Jean-Claude Lhote
 * 4C22
 */
export default function ExerciceMultiplierFractions () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.sup = 1 // Avec ou sans relatifs
  this.consigne = 'Calculer et donner le résultat sous forme irréductible.'
  if (context.isAmc) this.titre = 'Multiplier des fractions et donner le résultat sous forme irréductible'
  this.spacing = 2
  this.spacingCorr = 2
  this.nbQuestions = 5
  this.nbColsCorr = 1
  this.sup2 = false // méthode
  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    let typesDeQuestionsDisponibles
    const listeFractions = obtenirListeFractionsIrreductibles()

    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1, 2, 2, 2]// 1*nombre entier,3*fraction (pas de négatifs)
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2, 2, 3, 3] // fractions, 2*positifs, 2*relatifs
    } else {
      typesDeQuestionsDisponibles = [3]
    }
    let nombreDeSigneMoins
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions
    )
    for (
      let i = 0,
        ab,
        cd,
        a,
        b,
        c,
        d,
        p,
        aa,
        bb,
        cc,
        dd,
        signe,
        numerateur,
        denominateur,
        index,
        texte,
        texteCorr,
        reponse,
        typesDeQuestions,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      do {
        ab = choice(listeFractions)
        cd = choice(listeFractions)
        a = ab[0]
        b = ab[1]
        c = cd[0]
        d = cd[1]
      } while ((a * c) % (b * d) === 0 || (a * c) % d === 0 || (b * d === 100))
      if (this.sup2 === false) {
        // methode 1 : simplifications finale
        switch (typesDeQuestions) {
          case 1: // entier * fraction (tout positif)
            if (a === 1) {
              a = randint(2, 9)
            }
            if (a === c) {
              a = a + 1
            }
            texte = `$${texFraction(a, 1)}\\times${texFraction(c, d)}=$`
            texteCorr = `$${texFraction(a, 1)}\\times${texFraction(c, d)}`
            texteCorr += `=\\dfrac{${a}}{1}\\times${texFraction(c, d)}`
            texteCorr += `=${texFraction(
              a + '\\times' + c,
              '1\\times' + d
            )}`
            texteCorr += `=${texFraction(a * c, d)}`
            if (pgcd(a * c, d) !== 1) {
              texteCorr += `=${texFractionReduite(a * c, d)}$`
            } else texteCorr += '$'
            reponse = fraction(a * c, d).simplifie()
            break

          case 2: // fraction * fraction tout positif
            p = pgcd(a * c, b * d)
            texte = `$${texFraction(a, b)}\\times${texFraction(c, d)}=$`
            texteCorr = `$${texFraction(a, b)}\\times${texFraction(c, d)}`
            texteCorr += `=${texFraction(
              a + '\\times' + c,
              b + '\\times' + d
            )}`
            texteCorr += `=${texFraction(a * c, b * d)}`
            if (p !== 1) {
              texteCorr += `=${texFraction(
                (a * c) / p + '\\times\\cancel{' + p + '}',
                (b * d) / p + '\\times\\cancel{' + p + '}'
              )}`
              texteCorr += `=${texFraction((a * c) / p, (b * d) / p)}$`
            } else texteCorr += '$'
            reponse = fraction(a * c, b * d).simplifie()

            break

          case 3:
            a = a * randint(-1, 1, [0])
            b = b * randint(-1, 1, [0])
            c = c * randint(-1, 1, [0])
            d = d * randint(-1, 1, [0])
            nombreDeSigneMoins = (a < 0) + (b < 0) + (c < 0) + (d < 0)
            if (Math.pow(-1, nombreDeSigneMoins) === 1) {
              signe = ''
            } else {
              signe = '-'
            }

            texte = `$${texFraction(a, b)}\\times${texFraction(c, d)}$`
            texteCorr = `$${texFraction(a, b)}\\times${texFraction(c, d)}`
            aa = abs(a)
            bb = abs(b)
            cc = abs(c)
            dd = abs(d)
            p = pgcd(aa * cc, bb * dd)
            texteCorr += `=${signe}${texFraction(
              aa,
              bb
            )}\\times${texFraction(cc, dd)}`
            texteCorr += `=${signe}${texFraction(
              aa + '\\times' + cc,
              bb + '\\times' + dd
            )}`
            if (p === 1) {
              texteCorr += `=${signe}${texFraction(aa * cc, bb * dd)}$`
            } else {
              texteCorr += `=${signe}${texFraction(aa * cc, bb * dd)}`
              if (aa * cc !== bb * dd) {
                texteCorr += `=${signe}${texFraction(
                  (aa * cc) / p + '\\times\\cancel{' + p + '}',
                  (bb * dd) / p + '\\times\\cancel{' + p + '}'
                )}`
                texteCorr += `=${signe}${texFraction(
                  (aa * cc) / p,
                  (bb * dd) / p
                )}$`
              } else {
                texteCorr += `=${signe}1$`
              }
            }
            reponse = fraction(a * c, b * d).simplifie()
            break
        }
      } else {
        // méthode 2 : décomposition
        if (a === c) {
          a++
        }
        aa = obtenirListeNombresPremiers()[randint(1, 5)]
        bb = obtenirListeNombresPremiers()[randint(1, 5, [aa])]
        a = a * aa
        d = d * aa
        b = b * bb
        c = c * bb

        const listea = obtenirListeFacteursPremiers(a)
        let listeb = obtenirListeFacteursPremiers(b)
        const listec = obtenirListeFacteursPremiers(c)
        const listed = obtenirListeFacteursPremiers(d)
        let listeAvf, listeBvf

        switch (typesDeQuestions) {
          case 1: // entier * fraction (tout positif)
            texte = `$${a}\\times${texFraction(c, d)}=$`
            texteCorr = `$${a}\\times${texFraction(c, d)}`
            texteCorr += `=${texFraction(a + '\\times' + c, d)}`
            texteCorr += `=${texFraction(
              decompositionFacteursPremiers(a) +
              '\\times' +
              decompositionFacteursPremiers(c),
              decompositionFacteursPremiers(d)
            )}`
            // texteCorr += `$=${texFraction(decompositionFacteursPremiers(a * c), decompositionFacteursPremiers(d))}$`
            for (const k in listec) {
              listea.push(listec[k])
            }
            listeb = listed
            listeAvf = []
            listeBvf = []

            listea.forEach(function aAjouterDansListeAvf (element) {
              listeAvf.push([element, true])
            })
            listeb.forEach(function aAjouterDansListeBvf (element) {
              listeBvf.push([element, true])
            })

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] === listea[j]) {
                  listeBvf[index] = [listeb[index], false]
                  listeAvf[j] = [listea[j], false]
                  listea[j] = 1
                  listeb[index] = 1
                  break
                }
                j++
              }
              index++
            }

            a = 1
            b = 1
            for (const k in listea) {
              a = a * listea[k]
            }
            for (const k in listeb) {
              b = b * listeb[k]
            }

            numerateur = ''
            denominateur = ''

            for (const j in listeAvf) {
              if (listeAvf[j][1] === true) {
                numerateur += listeAvf[j][0] + '\\times'
              } else {
                numerateur += '\\cancel{' + listeAvf[j][0] + '}\\times'
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6)

            for (const j in listeBvf) {
              if (listeBvf[j][1] === true) {
                denominateur += listeBvf[j][0] + '\\times'
              } else {
                denominateur += '\\cancel{' + listeBvf[j][0] + '}\\times'
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6)

            texteCorr += `=\\dfrac{${numerateur}}{${denominateur}}`
            texteCorr += `=${texFraction(a, b)}$`
            reponse = fraction(a, b)
            break

          case 2: // fraction * fraction tout positif
            texte = `$${texFraction(a, b)}\\times${texFraction(c, d)}=$`
            texteCorr = `$${texFraction(a, b)}\\times${texFraction(c, d)}`
            texteCorr += `=${texFraction(
              a + '\\times' + c,
              b + '\\times' + d
            )}`

            for (const k in listec) {
              listea.push(listec[k])
            }
            for (const k in listed) {
              listeb.push(listed[k])
            }

            listeAvf = []
            listeBvf = []

            listea.forEach(function aAjouterDansListeAvf (element) {
              listeAvf.push([element, true])
            })
            listeb.forEach(function aAjouterDansListeBvf (element) {
              listeBvf.push([element, true])
            })

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] === listea[j]) {
                  listeBvf[index] = [listeb[index], false]
                  listeAvf[j] = [listea[j], false]
                  listea[j] = 1
                  listeb[index] = 1
                  break
                }
                j++
              }
              index++
            }

            a = 1
            b = 1
            for (const k in listea) {
              a = a * listea[k]
            }
            for (const k in listeb) {
              b = b * listeb[k]
            }

            numerateur = ''
            denominateur = ''

            for (const j in listeAvf) {
              if (listeAvf[j][1] === true) {
                numerateur += listeAvf[j][0] + '\\times'
              } else {
                numerateur += '\\cancel{' + listeAvf[j][0] + '}\\times'
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6)

            for (const j in listeBvf) {
              if (listeBvf[j][1] === true) {
                denominateur += listeBvf[j][0] + '\\times'
              } else {
                denominateur += '\\cancel{' + listeBvf[j][0] + '}\\times'
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6)

            texteCorr += `=\\dfrac{${numerateur}}{${denominateur}}`
            texteCorr += `=${texFraction(a, b)}$`
            reponse = fraction(a, b)
            break

          case 3:
            a = a * randint(-1, 1, [0])
            b = b * randint(-1, 1, [0])
            c = c * randint(-1, 1, [0])
            d = d * randint(-1, 1, [0])
            nombreDeSigneMoins = (a < 0) + (b < 0) + (c < 0) + (d < 0)
            if (Math.pow(-1, nombreDeSigneMoins) === 1) {
              signe = ''
            } else {
              signe = '-'
            }

            texte = `$${texFraction(a, b)}\\times${texFraction(c, d)}$`
            texteCorr = `$${texFraction(a, b)}\\times${texFraction(c, d)}`
            aa = abs(a)
            bb = abs(b)
            cc = abs(c)
            dd = abs(d)

            texteCorr += `=${signe}${texFraction(
              aa,
              bb
            )}\\times${texFraction(cc, dd)}`
            texteCorr += `=${signe}${texFraction(
              aa + '\\times' + cc,
              bb + '\\times' + dd
            )}`

            for (const k in listec) {
              listea.push(listec[k])
            }
            for (const k in listed) {
              listeb.push(listed[k])
            }

            listeAvf = []
            listeBvf = []

            listea.forEach(function aAjouterDansListeAvf (element) {
              listeAvf.push([element, true])
            })
            listeb.forEach(function aAjouterDansListeBvf (element) {
              listeBvf.push([element, true])
            })

            for (index = 0; index < listeb.length;) {
              for (let j = 0; j <= listea.length;) {
                if (listeb[index] === listea[j]) {
                  listeBvf[index] = [listeb[index], false]
                  listeAvf[j] = [listea[j], false]
                  listea[j] = 1
                  listeb[index] = 1
                  break
                }
                j++
              }
              index++
            }

            a = 1
            b = 1
            for (const k in listea) {
              a = a * listea[k]
            }
            for (const k in listeb) {
              b = b * listeb[k]
            }

            numerateur = ''
            denominateur = ''

            for (const j in listeAvf) {
              if (listeAvf[j][1] === true) {
                numerateur += listeAvf[j][0] + '\\times'
              } else {
                numerateur += '\\cancel{' + listeAvf[j][0] + '}\\times'
              }
            }
            numerateur = numerateur.substr(0, numerateur.length - 6)

            for (const j in listeBvf) {
              if (listeBvf[j][1] === true) {
                denominateur += listeBvf[j][0] + '\\times'
              } else {
                denominateur += '\\cancel{' + listeBvf[j][0] + '}\\times'
              }
            }
            denominateur = denominateur.substr(0, denominateur.length - 6)

            texteCorr += `=${signe}\\dfrac{${numerateur}}{${denominateur}}`
            texteCorr += `=${signe}${texFraction(a, b)}$`
            reponse = fraction((signe === '-' ? -1 : 1) * a, b)
            break
        }
      }
      if (this.questionJamaisPosee(i, a, b, c, d, typesDeQuestions)) {
        // Si la question n'a jamais été posée, on en créé une autre
        texte += ajouteChampTexteMathLive(this, i, 'largeur25 inline')
        if (context.isAmc) texte = 'Calculer et donner la réponse sous forme irréductible\\\\\n' + texte
        setReponse(this, i, reponse, { formatInteractif: 'fraction', digits: 5, digitsNum: 3, digitsDen: 2, signe: true })
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    3,
    ' 1 : Fractions à numérateur et dénominateur positifs \n 2 : Type 1 et type 3 pour 50%/50%\n 3 : Ecritures fractionnaires à numérateur et dénominateur entiers relatifs'
  ]
  this.besoinFormulaire2CaseACocher = ['Avec décomposition']
}
