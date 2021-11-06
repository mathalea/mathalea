import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import { listeQuestionsToContenuSansNumero, randint, calcul, texGraphique, resolutionSystemeLineaire2x2 } from '../../modules/outils.js'
export const titre = 'Lire les antécédents d’un nombre à partir d’un graphique'

/**
* Un graphique étant tracé, déterminer les antécédents de nombres donnés.
* La fonction est un polynôme de degré 1, 2 ou 3 et les nombres des questions ne sont que des entiers.
*
* @author Rémi Angot
* 3F13
*/
export default function AntecedentGraphique () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.sup = 2
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
    const codeBase64 = 'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAAEL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAOAAFPAMAoAAAAAAAAAAAAAAAAAAAFAAFAeKkeuFHrhEBzy4UeuFHs#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAAA4AAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8AAAAAAQ4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBCb52yLQ5WAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wAAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AAAAAAAOAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAADgAAAQUAAQAAAAcAAAAJAP####8AAAAAAQ4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAQEAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAduYmdyYWR4AAIyMAAAAAFANAAAAAAAAAAAABEA#####wAHbmJncmFkeQACMjAAAAABQDQAAAAAAAD#####AAAAAQAUQ0ltcGxlbWVudGF0aW9uUHJvdG8A#####wAUR3JhZHVhdGlvbkF4ZXNSZXBlcmUAAAAbAAAACAAAAAMAAAAKAAAADwAAABD#####AAAAAQATQ0Fic2Npc3NlT3JpZ2luZVJlcAAAAAARAAVhYnNvcgAAAAr#####AAAAAQATQ09yZG9ubmVlT3JpZ2luZVJlcAAAAAARAAVvcmRvcgAAAAoAAAALAAAAABEABnVuaXRleAAAAAr#####AAAAAQAKQ1VuaXRleVJlcAAAAAARAAZ1bml0ZXkAAAAK#####wAAAAEAEENQb2ludERhbnNSZXBlcmUAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADgAAABMAAAAWAAAAABEAAAAAAA4AAAEFAAAAAAoAAAANAAAAAA4AAAASAAAADgAAABQAAAAOAAAAEwAAABYAAAAAEQAAAAAADgAAAQUAAAAACgAAAA4AAAASAAAADQAAAAAOAAAAEwAAAA4AAAAVAAAADAAAAAARAAAAFgAAAA4AAAAPAAAADwAAAAARAAAAAAAOAAABBQAAAAAXAAAAGQAAAAwAAAAAEQAAABYAAAAOAAAAEAAAAA8AAAAAEQAAAAAADgAAAQUAAAAAGAAAABv#####AAAAAQAIQ1NlZ21lbnQAAAAAEQEAAAAAEAAAAQABAAAAFwAAABoAAAAXAAAAABEBAAAAABAAAAEAAQAAABgAAAAcAAAABAAAAAARAQAAAAALAAFXAMAUAAAAAAAAwDQAAAAAAAAFAAE#3FZ4mrzfDgAAAB3#####AAAAAgAIQ01lc3VyZVgAAAAAEQAGeENvb3JkAAAACgAAAB8AAAARAAAAABEABWFic3cxAAZ4Q29vcmQAAAAOAAAAIP####8AAAACABJDTGlldU9iamV0UGFyUHRMaWUBAAAAEQBmZmYAAAAfAAAADgAAAA8AAAAfAAAAAgAAAB8AAAAfAAAAEQAAAAARAAVhYnN3MgANMiphYnNvci1hYnN3MQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEgAAAA4AAAAhAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAACMAAAAOAAAAEwAAABkBAAAAEQBmZmYAAAAkAAAADgAAAA8AAAAfAAAABQAAAB8AAAAgAAAAIQAAACMAAAAkAAAABAAAAAARAQAAAAALAAFSAEAgAAAAAAAAwCAAAAAAAAAFAAE#0RtOgbToHwAAAB7#####AAAAAgAIQ01lc3VyZVkAAAAAEQAGeUNvb3JkAAAACgAAACYAAAARAAAAABEABW9yZHIxAAZ5Q29vcmQAAAAOAAAAJwAAABkBAAAAEQBmZmYAAAAmAAAADgAAABAAAAAmAAAAAgAAACYAAAAmAAAAEQAAAAARAAVvcmRyMgANMipvcmRvci1vcmRyMQAAAA0BAAAADQIAAAABQAAAAAAAAAAAAAAOAAAAEwAAAA4AAAAoAAAAFgAAAAARAQAAAAALAAABBQAAAAAKAAAADgAAABIAAAAOAAAAKgAAABkBAAAAEQBmZmYAAAArAAAADgAAABAAAAAmAAAABQAAACYAAAAnAAAAKAAAACoAAAAr#####wAAAAIADENDb21tZW50YWlyZQAAAAARAWZmZgAAAAAAAAAAAEAYAAAAAAAAAAAAHwsAAf###wAAAAEAAAAAAAAAAQAAAAAAAAAAAAsjVmFsKGFic3cxKQAAABkBAAAAEQBmZmYAAAAtAAAADgAAAA8AAAAfAAAABAAAAB8AAAAgAAAAIQAAAC0AAAAbAAAAABEBZmZmAAAAAAAAAAAAQBgAAAAAAAAAAAAkCwAB####AAAAAQAAAAAAAAABAAAAAAAAAAAACyNWYWwoYWJzdzIpAAAAGQEAAAARAGZmZgAAAC8AAAAOAAAADwAAAB8AAAAGAAAAHwAAACAAAAAhAAAAIwAAACQAAAAvAAAAGwAAAAARAWZmZgDAIAAAAAAAAD#wAAAAAAAAAAAAJgsAAf###wAAAAIAAAABAAAAAQAAAAAAAAAAAAsjVmFsKG9yZHIxKQAAABkBAAAAEQBmZmYAAAAxAAAADgAAABAAAAAmAAAABAAAACYAAAAnAAAAKAAAADEAAAAbAAAAABEBZmZmAMAcAAAAAAAAAAAAAAAAAAAAAAArCwAB####AAAAAgAAAAEAAAABAAAAAAAAAAAACyNWYWwob3JkcjIpAAAAGQEAAAARAGZmZgAAADMAAAAOAAAAEAAAACYAAAAGAAAAJgAAACcAAAAoAAAAKgAAACsAAAAz#####wAAAAEABUNGb25jAP####8AAWYACC0yKngqeCszAAAADQD#####AAAAAQAMQ01vaW5zVW5haXJlAAAADQIAAAANAgAAAAFAAAAAAAAAAP####8AAAACABFDVmFyaWFibGVGb3JtZWxsZQAAAAAAAAAeAAAAAAAAAAFACAAAAAAAAAABeAAAAAQA#####wEAAAAAEAABeAAAAAAAAAAAAEAIAAAAAAAABQABQC8BAyKX1IIAAAAEAAAAGAD#####AAJ4MQAAAAoAAAA2AAAAEQD#####AAJ5MQAFZih4MSn#####AAAAAQAOQ0FwcGVsRm9uY3Rpb24AAAA1AAAADgAAADcAAAAWAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAABQAAAAAKAAAADgAAADcAAAAOAAAAOP####8AAAACAA1DTGlldURlUG9pbnRzAP####8AAAD#AAIAAAA5AAAB9AABAAAANgAAAAQAAAA2AAAANwAAADgAAAA5#####wAAAAEAFUNQb2ludExpZUxpZXVQYXJQdExpZQD#####AAAAAAAQAAFNAAAAAAAAAAAAQAgAAAAAAAAJAAG#fx#Yd2ToAAAAADq#fx#Yd2ToAAAAAAMA#####wEAAAABEAAAAQABAAAAOwA#8AAAAAAAAAAAAAMA#####wEAAAABEAAAAQABAAAAOwE#8AAAAAAAAP####8AAAABABBDSW50RHJvaXRlRHJvaXRlAP####8BAAAAABAAAAAAAAAAAAAAAEAIAAAAAAAACQAAAAAEAAAAPAAAACIA#####wEAAAAAEAAAAAAAAAAAAAAAQAgAAAAAAAAJAAAAAAUAAAA9AAAAFwD#####AAAAAAAQAAABAQEAAAA7AAAAPgAAABcA#####wAAAAAAEAAAAQEBAAAAOwAAAD8AAAAO##########8='

    let a, b, c, x1, x2, x3, fx1, fx2, fx3, expressionF, numa, dena, numb, denb, texte, texteCorr

    function initialiseVariables () {
      if (context.isHtml) { // repère -10 || 10
        x1 = randint(-6, -3)
        x2 = randint(x1 + 3, 2)
        x3 = randint(x2 + 2, 8)
        fx1 = randint(-5, 5)
        fx2 = randint(-6, 6, fx1)
        fx3 = randint(-5, 5)
        c = randint(-5, 5)
      } else { // repère -5 || 5
        x1 = randint(-4, -2)
        x2 = randint(-1, 2, [0])
        x3 = randint(3, 4)
        fx1 = randint(-4, 4)
        fx2 = randint(-4, 4, fx1)
        fx3 = randint(-4, 4)
        c = randint(-3, 3)
      }
    };

    initialiseVariables()

    texte = 'On a tracé ci-dessous la courbe représentative de la fonction $f$.<br>'

    if (this.sup === 1) {
      a = calcul((fx2 - fx1) / (x2 - x1))
      b = calcul(fx1 - a * x1)
      expressionF = `${a}*x+(${b})`
      if (fx2 !== fx1) {
        texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ et de $${fx2}$ par cette fonction $f$.<br><br>`
        texteCorr = `L'antécédent de $${fx1}$ est $${x1}$, on note $f(${x1})=${fx1}$.<br>`
        texteCorr += `L'antécédent de $${fx2}$ est $${x2}$, on note $f(${x2})=${fx2}$.`
      } else {
        texte += `Déterminer par lecture graphique les antécédents de $${fx1}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx1}$ possède une infinité d'antécédents : on note $f(x)=${fx1}$ quel que soit $x$.<br>`
      }
    }

    if (this.sup === 2) {
      if (randint(1, 4) < 2) { // une fois sur 4 il n'y a qu'un seul antécédent
        const x0 = randint(-2, 2)
        let fx0 = randint(-4, 4)
        if (!context.isHtml) {
          fx0 = randint(-2, 2)
        }
        a = randint(-3, 3, 0)
        texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx0}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx0}$ a un unique antécédent $${x0}$, on note $f(${x0})=${fx0}$.<br>`
        expressionF = `${a}*(x-(${x0}))^2+(${fx0})`
      } else {
        fx3 = fx1;
        [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
        while (dena === 0 || denb === 0 || numa === 0) {
          x1 = randint(-4, -1)
          x3 = randint(1, 4)
          context.isHtml ? fx1 = randint(-7, 7) : fx1 = randint(-3, 3)
          fx3 = fx1
          context.isHtml ? c = randint(-6, 6) : c = randint(-4, 4);

          [[numa, dena], [numb, denb]] = resolutionSystemeLineaire2x2(x1, x3, fx1, fx3, c)
        }
        a = numa / dena
        b = numb / denb
        x2 = 0
        fx2 = c
        expressionF = `${a}*x^2+(${b})*x+(${c})`
        texte += `Déterminer par lecture graphique le (ou les) antécédent(s) de $${fx1}$ par cette fonction $f$.<br><br>`
        texteCorr = `$${fx1}$ a deux antécédents $${x1}$ et $${x3}$, on note $f(${x1})=f(${x3})=${fx1}$.<br>`
      }
    }

    if (!context.isHtml) {
      texte += '\n\n'
      texte += texGraphique(expressionF)
    }

    this.MG32codeBase64 = codeBase64
    this.mg32init = (mtgApp, idDoc) => {
      mtgApp.giveFormula2(idDoc, 'f', expressionF)
      mtgApp.calculate(idDoc)
      mtgApp.display(idDoc)
    }

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }

  this.besoinFormulaireNumerique = ['Type de fonctions', 2, '1 : Affine\n2 : Polynôme du 2nd degré']
}
