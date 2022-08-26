import Exercice from '../Exercice.js'
import { fixeBordures, mathalea2d, vide2d } from '../../modules/2dGeneralites.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, calcul, texNombrec, prenomF } from '../../modules/outils.js'
import { point, polyline, grille, courbeInterpolee, texteParPosition, repere, courbe } from '../../modules/2d.js'
export const titre = 'Problème s\'appuyant sur la lecture d\'une représentation graphique'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Problème avec lecture de représentation graphique d'une fonction
 * @author Rémi Angot
 * Référence 4F12
 */
export default function ExploiterRepresentationGraphique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbCols = 1
  this.nbColsCorr = 1
  this.nbQuestionsModifiable = false
  this.sup = 4

  this.nouvelleVersion = function () {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.autoCorrection = []
    // Vitesses initiales donnant une hauteur entière et une portée entière
    // Vitesses initiales donnant une hauteur entière et une durée de vol entière.
    const vitessesInitiales = [28.27, 35.2, 49.6, 63.55, 70.85, 77.45, 84.85, 91.65]
    const vitessesInitialesBis = [10.95, 12.65, 14.15, 15.5, 16.7, 17.9, 19, 20, 21, 21.9, 22.8, 23.7, 24.5, 25.3, 26.1, 26.8, 27.6, 28.2, 29]
    let V0, xscale, zero
    let typeDeProbleme
    let enonceAMC
    let v1, v2, v3, situation
    let repeRe
    let tempsPause
    let periodeRapide
    if (this.sup === 1) {
      typeDeProbleme = choice(['projectile', 'projectile2'])
    }
    if (this.sup === 2) {
      typeDeProbleme = 'velo'
    }
    if (this.sup === 3) {
      typeDeProbleme = 'temperature'
    }
    if (this.sup === 4) {
      typeDeProbleme = choice(['temperature', 'projectile', 'projectile2', 'velo'])
    }
    let f, t1, l, g1, r, graphique, fille, hmin, hmax, tmin, tmax
    switch (typeDeProbleme) {
      case 'projectile': // Courbe de l'altitude de vol en fonction du temps
        V0 = choice(vitessesInitiales)
        t1 = Math.round(Math.sqrt(2) * V0 / 10)
        xscale = 9 / t1
        f = (x) => Math.max(-5 * x ** 2 + V0 * Math.sqrt(2) * x / 2, 0)
        repeRe = repere({ yLegende: 'hauteur (en m)', xLegende: 'temps (en s)', xUnite: 1 * xscale, yUnite: 0.1 * xscale, xMin: 0, yMin: 0, xMax: t1 + 1, yMax: f(t1 / 2) + 20, xThickDistance: 1, yThickDistance: 10, grilleSecondaireY: true, grilleSecondaireYDistance: 2, grilleSecondaireYMin: 0, grilleSecondaireYMax: f(t1 / 2) + 5 }) // ()
        graphique = courbe(f, { repere: repeRe, xMax: t1 + 1, step: 0.2 })
        zero = texteParPosition('0', -0.5, 0, 'milieu', 'black', 1, 'middle', true)
        this.introduction =
          'On a représenté ci-dessous l\'évolution de la hauteur d\'un projectile lancé depuis le sol (en ms) en fonction du temps (en secondes).'

        this.introduction +=
          '<br><br>' +
          mathalea2d(
            Object.assign({}, fixeBordures([repeRe, graphique, zero]), {
              pixelsParCm: 30,
              scale: 1
            })
            ,
            repeRe,
            graphique,
            zero
          )

        this.introduction +=
          '<br><br>' +
          'À l\'aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push(
          'Au bout de combien de temps le projectile retombe-t-il au sol ?'
        )
        this.listeCorrections.push(
          `Au bout de ${texNombrec(
            t1
          )} s, le projectile retombe au sol car la courbe passe par le point de coordonnées $(${texNombrec(
            t1
          )}~;~0)$.`
        )

        this.listeQuestions.push(
          'Quelle est la hauteur maximale atteinte par le projectile ?'
        )
        this.listeCorrections.push(
          `Le point le plus haut de la courbe a pour abscisse $${texNombrec(
            (t1 / 2)
          )}$ et pour ordonnée $${Math.round(f(t1 / 2))}$ donc la hauteur maximale est de $${Math.round(f(t1 / 2))}$ m.`
        )

        break
      case 'projectile2':
        V0 = choice(vitessesInitialesBis)
        t1 = Math.round(V0 ** 2 / 10)
        xscale = 52 / t1
        f = (x) => Math.max(-10 * x ** 2 / (V0 ** 2) + x, 0)
        repeRe = repere({ yLegende: 'hauteur (en m)', xLegende: 'distance (en m)', xUnite: 0.25 * xscale, yUnite: 0.5 * xscale, xMin: 0, yMin: 0, xMax: t1 + 4, yMax: f(t1 / 2) + 2.1, xThickDistance: 4, yThickDistance: 1, grilleSecondaireY: true, grilleSecondaireYDistance: 0.25, grilleSecondaireYMin: 0, grilleSecondaireYMax: f(t1 / 2) + 1 }) // ()
        graphique = courbe(f, { repere: repeRe, step: 0.5 })
        zero = texteParPosition('0', -0.5, 0, 'milieu', 'black', 1, 'middle', true)

        this.introduction =
            'On a représenté ci-dessous la trajectoire d\'un projectile lancé depuis le sol.'

        this.introduction +=
            '<br><br>' +
            mathalea2d(
              Object.assign({}, fixeBordures([repeRe, graphique, zero]), {
                pixelsParCm: 30,
                scale: 1
              })
              ,
              repeRe,
              graphique,
              zero
            )

        this.introduction +=
            '<br><br>' +
            'À l\'aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push(
          'À quelle distance le projectile est-il retombé ?'
        )
        this.listeCorrections.push(
            `Le projectile retombe au sol à une distance de ${t1} m, car la courbe passe par le point de coordonnées $(${texNombrec(
              t1
            )}~;~0)$.`
        )

        this.listeQuestions.push(
          'Quelle est la hauteur maximale atteinte par le projectile ?'
        )
        this.listeCorrections.push(
            `Le point le plus haut de la courbe a pour abscisse $${texNombrec((t1 / 2))}$ et pour ordonnée $${Math.round(f(t1 / 2))}$ donc la hauteur maximale est de $${Math.round(f(t1 / 2))}$ m.`
        )

        break

      case 'velo':
        v1 = randint(1, 4)
        v2 = randint(1, 3, v1)
        v3 = v1 + v2
        r = repere({
          yLegende: 'distance (en km)',
          xLegende: 'temps (en min)',
          xMin: 0,
          yMin: 0,
          xMax: 60,
          yMax: v3 + 1,
          xUnite: 0.1,
          yUnite: 1,
          xThickDistance: 10,
          yThickDistance: 1,
          grilleSecondaireY: true,
          grilleSecondaireX: true,
          grilleSecondaireYDistance: 0.2,
          grilleSecondaireXDistance: 2,
          grilleSecondaireXMin: 0,
          grilleSecondaireXMax: 60,
          grilleSecondaireYMin: 0,
          grilleSecondaireYMax: v3 + 1
        })
        g1 = grille(-1, -1, 6, 8, 'black')
        g1.opacite = 1
        situation = randint(1, 3)
        zero = texteParPosition('0', -0.7, 0, 'milieu', 'black', 1, 'middle', true)

        if (situation === 1) {
          l = polyline([point(0, 0), point(1, v1), point(2, v3), point(3, v3), point(4, 0)], 'blue')
          tempsPause = 20
          periodeRapide = 'de la 20e à la 30e minute'
        }
        if (situation === 2) {
          l = polyline([point(0, 0), point(1, v3), point(2, v3), point(3, v2), point(4, 0)], 'blue')
          tempsPause = 10
          periodeRapide = 'durant les 10 premières minutes'
        }
        if (situation === 3) {
          l = polyline([point(0, 0), point(1, v3), point(2, v2), point(3, v2), point(4, 0)], 'blue')
          tempsPause = 20
          periodeRapide = 'durant les 10 premières minutes'
        }
        l.epaisseur = 2

        fille = prenomF()
        this.introduction = `${fille} fait du vélo avec son smartphone sur une voie-verte rectiligne qui part de chez elle. Une application lui permet de voir à quelle distance de chez elle, elle se trouve.`

        this.introduction += '<br><br>' + mathalea2d(
          Object.assign({}, fixeBordures([r, l, zero]), {
            pixelsParCm: 30,
            scale: 1
          })
          , zero, r, l)

        this.introduction += '<br><br>' + 'À l\'aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push('Pendant combien de temps a-t-elle fait du vélo ?')
        this.listeCorrections.push('Elle a fait du vélo pendant 40 minutes.')

        this.listeQuestions.push('Quelle distance a-t-elle parcourue au total ?')
        this.listeCorrections.push(`Le point le plus loin de sa maison est à ${v3} km et ensuite elle revient chez elle, donc la distance totale est de ${2 * v3} km.`)

        this.listeQuestions.push(`Que se passe-t-il après ${tempsPause} minutes de vélo ?`)
        this.listeCorrections.push('La distance reste constante alors qu\'elle est sur un chemin rectiligne. Elle a donc fait une pause.')

        this.listeQuestions.push('À quel moment a-t-elle été la plus rapide ?')
        this.listeCorrections.push(`Elle a été la plus rapide ${periodeRapide} où elle a effectué ${v3} km en 10 minutes.`)

        break
      case 'temperature':
        hmin = randint(2, 4)
        hmax = randint(12, 16)
        tmin = randint(-5, 15)
        tmax = tmin + randint(5, 12)
        zero = tmin < 0 ? texteParPosition('0', -0.5, 0, 'milieu', 'black', 1, 'middle', true) : vide2d()
        r = repere({
          xMin: 0,
          yMin: tmin - 1,
          yMax: tmax + 2,
          xMax: 24,
          xUnite: 1,
          yUnite: 1,
          xLegende: 'Heure',
          yLegende: 'Température (en °C)'
        })
        graphique = courbeInterpolee(
          [
            [-2, tmin + 2],
            [hmin, tmin],
            [hmax, tmax],
            [26, tmin + 2]
          ],
          {
            color: 'blue',
            epaisseur: 2,
            repere: r,
            xMin: 0,
            xMax: 24
          })
        this.introduction =
          'On a représenté ci-dessous l\'évolution de la température sur une journée.'
        this.introduction +=
          '<br><br>' +
          mathalea2d(
            Object.assign({}, fixeBordures([r, graphique]), {
              pixelsParCm: 30,
              scale: 1
            })
            ,
            r,
            zero,
            graphique
          )

        this.introduction +=
          '<br><br>' +
          'À l\'aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push(
          'Quelle est la température la plus froide de la journée ?'
        )
        this.listeCorrections.push(`La température la plus basse est ${tmin}°C.`)

        this.listeQuestions.push(
          'Quelle est la température la plus chaude de la journée ?'
        )
        this.listeCorrections.push(`La température la plus élevée de la journée est ${tmax}°C.`)
        this.listeQuestions.push(
          'À quelle heure fait-il le plus chaud ?'
        )
        this.listeCorrections.push(`C'est à ${hmax} h qu'il fait le plus chaud.`)
        this.listeQuestions.push(
          'À quelle heure fait-il le plus froid ?'
        )
        this.listeCorrections.push(`C'est à ${hmin} h qu'il fait le plus froid.`)

        break
    }
    if (context.isAmc) {
      enonceAMC = this.introduction
      for (let i = 0; i < this.listeQuestions.length; i++) {
        enonceAMC += `${i + 1}) ${this.listeQuestions[i]}<br>`
      }
      switch (typeDeProbleme) {
        case 'velo':
          this.autoCorrection[0] = {
            enonce: enonceAMC,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: this.listeCorrections[0],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: 40,
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[1],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: 2 * v3,
                    param: {
                      digits: 2,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              },
              {
                type: 'AMCOpen',
                propositions: [{
                  texte: this.listeCorrections[2],
                  statut: 2
                }]
              },
              {
                type: 'AMCOpen',
                propositions: [{
                  texte: this.listeCorrections[3],
                  statut: 2
                }]
              }
            ]
          }
          break
        case 'projectile':
          this.autoCorrection[0] = {
            enonce: enonceAMC,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: this.listeCorrections[0],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: calcul(t1),
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[1],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: Math.round(f(t1 / 2)),
                    param: {
                      digits: 3,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
          break
        case 'projectile2':
          this.autoCorrection[0] = {
            enonce: enonceAMC,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: this.listeCorrections[0],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: t1,
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[1],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: Math.round(f(t1 / 2)),
                    param: {
                      digits: 3,
                      decimals: 0,
                      signe: false,
                      approx: 0
                    }
                  }
                }]
              }
            ]
          }
          break
        case 'temperature':
          this.autoCorrection[0] = {
            enonce: enonceAMC,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [{
                  texte: this.listeCorrections[0],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: tmin,
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[1],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: tmax,
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[2],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: hmax,
                    param: {
                      digits: 2,
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
                  texte: this.listeCorrections[3],
                  statut: '',
                  reponse: {
                    texte: '1)',
                    valeur: hmin,
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
          break
      }
    } else listeQuestionsToContenu(this)
  }
  this.besoinFormulaireNumerique = ['Choix des problèmes', 4, '1 : Projectile\n2 : Trajet à vélo\n3 : Température\n4 : Au hasard']
}
