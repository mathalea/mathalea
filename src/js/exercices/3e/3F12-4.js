import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, abs, calcul, texGraphique, resolutionSystemeLineaire2x2, resolutionSystemeLineaire3x3, chercheMinMaxFonction, nombreDeChiffresDansLaPartieEntiere } from '../../modules/outils.js'
import { ajouteChampTexteMathLive, setReponse } from '../../modules/gestionInteractif.js'
export const titre = 'Lire l’image d’un nombre à partir d’un graphique'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
* Un graphique étant tracé, déterminer l'image de nombres donnés.
* La fonction est un polynome de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @author Rémi Angot
* 3F12-4
*/
export default function ImageGraphique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.sup = 3
  this.spacing = 1
  context.isHtml ? this.spacingCorr = 3 : this.spacingCorr = 1
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.typeExercice = 'MG32'
  this.dimensionsDivMg32 = [800, 600]
  this.pasDeVersionLatex = false
  this.nbCols = 1
  this.listePackages = 'pgfplots'

  this.nouvelleVersion = function (numeroExercice) {
    this.listeQuestions = [] // Liste de questions
    this.listeCorrections = [] // Liste de questions corrigées
    this.contenu = '' // Liste de questions
    this.contenuCorrection = '' // Liste de questions corrigées
    const codeBase64 = 'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG##CuHsx36wAAAADq##CuHsx36wAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8='
    this.sup = parseInt(this.sup)
    let a, b, c, d, x1, x2, x3, fx1, fx2, fx3, expressionF, numa, dena, numb, denb, numc, denc, ymax, f

    function initialiseVariables () {
      if (context.isHtml) { // repère -10 || 10
        x1 = randint(-6, -3)
        x2 = randint(x1 + 3, 2)
        x3 = randint(x2 + 2, 8)
        fx1 = randint(-5, 5)
        fx2 = randint(-6, 6)
        fx3 = randint(-5, 5)
        d = randint(-5, 5)
        c = randint(-5, 5)
        ymax = 7
      } else { // repère -5 || 5
        x1 = randint(-4, -2)
        x2 = randint(-1, 2, [0])
        x3 = randint(3, 4)
        fx1 = randint(-4, 4)
        fx2 = randint(-4, 4)
        fx3 = randint(-4, 4)
        d = randint(-3, 3)
        c = randint(-3, 3)
        ymax = 4
      }
    };

    initialiseVariables()

    let texte = 'On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>'; let texteCorr = ''

    if (this.sup === 1) {
      a = calcul((fx2 - fx1) / (x2 - x1))
      b = calcul(fx1 - a * x1)
      expressionF = `${a}*x+(${b})`
      f = x => a * x + b

      texte += `Déterminer par lecture graphique les images de $${x1}$ et de $${x2}$ par cette fonction $f$.<br><br>`
      texteCorr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`
      texteCorr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.`
    }

    if (this.sup === 2) {
      [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
      while (dena === 0 || denb === 0 || numa === 0) {
        x1 = randint(-6, -3)
        x3 = randint(1, 6)
        fx1 = randint(-5, 5)
        fx3 = randint(-6, 6)
        d = randint(-10, 10);

        [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
      }
      a = numa / dena
      b = numb / denb
      x2 = 0
      fx2 = c

      expressionF = `${a}*x^2+(${b})*x+(${c})`
      f = x => a * x ** 2 + b * x + c
    }

    if (this.sup === 3) {
      [[numa, dena], [numb, denb], [numc, denc]] = resolutionSystemeLineaire3x3(x1, x2, x3, fx1, fx2, fx3, d)
      let [extremum1, extremum2] = chercheMinMaxFonction([numa / dena, numb / denb, numc / denc, d])
      while (dena === 0 || denb === 0 || denc === 0 || abs(extremum1[1]) > ymax || abs(extremum2[1]) > ymax) {
        initialiseVariables();
        [[numa, dena], [numb, denb], [numc, denc]] = resolutionSystemeLineaire3x3(x1, x2, x3, fx1, fx2, fx3, d)
        if (chercheMinMaxFonction([numa / dena, numb / denb, numc / denc, d]) === []) {
          [extremum1, extremum2] = [[0, 999], [0, 999]]
        } else {
          [extremum1, extremum2] = chercheMinMaxFonction([numa / dena, numb / denb, numc / denc, d])
        }
      }
      a = numa / dena
      b = numb / denb
      c = numc / denc

      expressionF = `${a}*x^3+(${b})*x^2+(${c})*x+(${d})`
      f = x => a * x ** 3 + b * x ** 2 + c * x + d
    }

    if (this.sup === 2 || this.sup === 3) {
      texte += `Déterminer par lecture graphique les images de $${x1}$, de $${x2}$ et de $${x3}$ par cette fonction $f$.<br><br>`
      texteCorr = `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.<br>`
      texteCorr += `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.<br>`
      texteCorr += `L'image de $${x3}$ est $${fx3}$, on note $f(${x3})=${fx3}$.<br>`
    }

    if (!context.isHtml) {
      texte += '\n\n'
      texte += texGraphique(expressionF)
    }
    console.log(expressionF)
    this.MG32codeBase64 = codeBase64
    this.mg32init = (mtgApp, idDoc) => {
      mtgApp.giveFormula2(idDoc, 'f', expressionF)
      mtgApp.calculate(idDoc)
      mtgApp.display(idDoc)
    }
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        propositions: [
          {
            type: 'AMCNum',
            propositions: [{
              texte: `L'image de $${x1}$ est $${fx1}$, on note $f(${x1})=${fx1}$.\\\\`,
              statut: '',
              reponse: {
                texte: `$f(${x1})$`,
                valeur: fx1,
                param: {
                  digits: nombreDeChiffresDansLaPartieEntiere(fx1),
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: `L'image de $${x2}$ est $${fx2}$, on note $f(${x2})=${fx2}$.\\\\`,
              statut: '',
              reponse: {
                texte: `$f(${x2})$`,
                valeur: fx2,
                param: {
                  digits: nombreDeChiffresDansLaPartieEntiere(fx2),
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          },
          {
            type: 'AMCNum',
            propositions: [{
              texte: `L'image de $${x3}$ est $${fx3}$, on note $f(${x3})=${fx3}$.\\\\`,
              statut: '',
              reponse: {
                texte: `$f(${x3})$`,
                valeur: fx3,
                param: {
                  digits: nombreDeChiffresDansLaPartieEntiere(fx3),
                  decimals: 0,
                  signe: true,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    } else if (this.interactif) {
      if (this.sup === 1) {
        texte += `$f(${x1})=$` + ajouteChampTexteMathLive(this, 0, 'largeur25 inline')
        texte += `$f(${x2})=$` + ajouteChampTexteMathLive(this, 1, 'largeur25 inline')
        setReponse(this, 0, f(x1))
        setReponse(this, 1, f(x1))
      } else {
        texte += `$f(${x1})=$` + ajouteChampTexteMathLive(this, 0, 'largeur25 inline')
        texte += `$f(${x2})=$` + ajouteChampTexteMathLive(this, 1, 'largeur25 inline')
        texte += `$f(${x3})=$` + ajouteChampTexteMathLive(this, 2, 'largeur25 inline')
        setReponse(this, 0, f(x1))
        setReponse(this, 1, f(x2))
        setReponse(this, 2, f(x3))
      }
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }

  this.besoinFormulaireNumerique = ['Type de fonctions', 3, '1 : Affine\n2 : Polynome du 2nd degré\n3 : Polynome du 3e degré']
}
