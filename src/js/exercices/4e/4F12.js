import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenu, randint, choice, calcul, texNombrec, prenomF } from '../../modules/outils.js'
import { point, polyline, axes, labelX, labelY, grille, repere, courbeInterpolee, texteParPosition, mathalea2d, repere2, courbe2 } from '../../modules/2d.js'
export const titre = 'Problème s’appuyant sur la lecture d’une représentation graphique'
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
    // Vitesses initiales donnant une hauteur entière et une portée entière
    // Vitesses initiales donnant une hauteur entière et une durée de vol entière.
    const vitessesInitiales = [20.87, 28.27, 35.2, 49.6, 63.55, 70.85, 77.45, 84.85, 91.65]
    const vitessesInitialesBis = [10.95, 12.65, 14.15, 15.5, 16.7, 17.9, 19, 20, 21, 21.9, 22.8, 23.7, 24.5, 25.3, 26.1, 26.8, 27.6, 28.2, 29]
    let V0, xscale
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
    let f, t1, l, l1, l2, g1, g2, g3, r, graphique, texte1, texte2, fille, hmin, hmax, tmin, tmax
    switch (typeDeProbleme) {
      case 'projectile': // Courbe de l'altitude de vol en fonction du temps
        V0 = choice(vitessesInitiales)
        t1 = Math.round(Math.sqrt(2) * V0 / 10)
        xscale = 9 / t1
        f = (x) => Math.max(-5 * x ** 2 + V0 * Math.sqrt(2) * x / 2, 0)
        repeRe = repere2({ xUnite: 1 * xscale, yUnite: 0.1 * xscale, xMin: 0, yMin: 0, xMax: t1 + 1, yMax: f(t1 / 2) + 11, xThickDistance: 1, yThickDistance: 10, grilleSecondaireY: true, grilleSecondaireYDistance: 2, grilleSecondaireYMin: 0, grilleSecondaireYMax: f(t1 / 2) + 5 }) // ()
        texte1 = texteParPosition('hauteur (en mètre)', 0.2, (f(t1 / 2) / 10 + 0.5) * xscale, 'droite')
        graphique = courbe2(f, { repere: repeRe, xMax: (t1 + 1) * xscale, step: 0.2 })
        texte2 = texteParPosition('temps (en s)', (t1 + 0.5) * xscale, 0.4, 'droite')

        this.introduction =
          'On a représenté ci-dessous l’évolution de la hauteur d’un projectile lancé depuis le sol (en mètre) en fonction du temps (en seconde).'

        this.introduction +=
          '<br><br>' +
          mathalea2d(
            {
              xmin: -xscale,
              ymin: -xscale,
              xmax: (t1 + 4) * xscale,
              ymax: (f(t1 / 2) / 10 + 2) * xscale,
              pixelsParCm: 30,
              scale: 1
            },
            repeRe,
            graphique,
            texte1,
            texte2
          )

        this.introduction +=
          '<br><br>' +
          'À l’aide de ce graphique, répondre aux questions suivantes :'

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
        repeRe = repere2({ xUnite: 0.25 * xscale, yUnite: 0.5 * xscale, xMin: 0, yMin: 0, xMax: t1 + 4, yMax: f(t1 / 2) + 2.1, xThickDistance: 4, yThickDistance: 1, grilleSecondaireY: true, grilleSecondaireYDistance: 0.25, grilleSecondaireYMin: 0, grilleSecondaireYMax: f(t1 / 2) + 1 }) // ()
        texte1 = texteParPosition('hauteur (en mètre)', 0.2, xscale * (f(t1 / 2) / 2 + 1), 'droite')
        graphique = courbe2(f, { repere: repeRe, step: 0.5 })
        texte2 = texteParPosition('distance (en m)', xscale * ((t1 + 2) / 4), 0.4, 'droite')

        this.introduction =
            'On a représenté ci-dessous la trajectoire d’un projectile lancé depuis le sol.'

        this.introduction +=
            '<br><br>' +
            mathalea2d(
              {
                xmin: -xscale,
                ymin: -xscale,
                xmax: (t1 + 4) * xscale,
                ymax: (f(t1 / 2) / 2 + 2) * xscale,
                pixelsParCm: 30,
                scale: 1
              },
              repeRe,
              texte1,
              graphique,
              texte2
            )

        this.introduction +=
            '<br><br>' +
            'À l’aide de ce graphique, répondre aux questions suivantes :'

        this.listeQuestions.push(
          'A quelle ditance le projectile est-il retombé ?'
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
        g1 = grille(-1, -1, 6, 8)
        g1.color = 'black'
        g1.opacite = 1
        g2 = grille(-1, -1, 6, 8, 'gray', 0.2, 0.2)
        g3 = axes(0, 0, 6, 7)
        texte1 = texteParPosition('distance (en km)', 0.2, 7.3, 'droite')
        l1 = labelX(0, 50, 1, 'black', -0.6, 10)
        l2 = labelY(1, 6, 1, 'black', -0.6, 1)
        texte2 = texteParPosition('temps (en min)', 6.5, 0.4, 'droite')
        situation = randint(1, 3)

        if (situation === 1) {
          l = polyline(point(0, 0), point(1, v1), point(2, v1 + v2), point(3, v1 + v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'de la 20e à la 30e minute'
        }
        if (situation === 2) {
          l = polyline(point(0, 0), point(1, v3), point(2, v3), point(3, v2), point(4, 0))
          tempsPause = 10
          periodeRapide = 'durant les 10 premières minutes'
        }
        if (situation === 3) {
          l = polyline(point(0, 0), point(1, v3), point(2, v2), point(3, v2), point(4, 0))
          tempsPause = 20
          periodeRapide = 'durant les 10 premières minutes'
        }
        l.epaisseur = 2
        l.color = 'blue'

        fille = prenomF()
        this.introduction = `${fille} fait du vélo avec son smartphone sur une voie-verte rectiligne qui part de chez elle. Une application lui permet de voir à quelle distance de chez elle, elle se trouve.`

        this.introduction += '<br><br>' + mathalea2d({
          xmin: -1,
          ymin: -1,
          xmax: 9,
          ymax: 8,
          pixelsParCm: 40,
          scale: 1
        }, g1, g2, g3, l, texte1, texte2, l1, l2)

        this.introduction += '<br><br>' + 'À l’aide de ce graphique, répondre aux questions suivantes :'

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

        r = repere({
          xmin: 0,
          ymin: tmin - 1,
          ymax: tmax + 2,
          xmax: 24,
          xscale: 2,
          legendeX: 'Heure',
          legendeY: 'Température (en °C)'
        })
        graphique = courbeInterpolee(
          [
            [-2, tmin + 2],
            [hmin, tmin],
            [hmax, tmax],
            [26, tmin + 2]
          ],
          'blue',
          2,
          r,
          0,
          24
        )
        this.introduction =
          'On a représenté ci-dessous l’évolution de la température sur une journée.'
        this.introduction +=
          '<br><br>' +
          mathalea2d(
            {
              xmin: -1,
              ymin: tmin - 2.5,
              xmax: 16,
              ymax: tmax + 3,
              pixelsParCm: 40,
              scale: 1
            },
            r,
            graphique
          )

        this.introduction +=
          '<br><br>' +
          'À l’aide de ce graphique, répondre aux questions suivantes :'

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
  this.besoinFormulaireNumerique = ['Choix du problème', 3, '1 : Projectile\n2 : Trajet à vélo\n3 : Température\n4 : Au hasard']
}
