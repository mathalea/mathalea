import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenu, listeQuestionsToContenuSansNumero, randint, choice, arrondiVirgule, calcul, lettreDepuisChiffre } from '../../modules/outils.js'
export const titre = 'Calculer une longueur avec l’égalité de Pythagore (MG32)'

/**
 * @auteur Jean-Claude Lhote
 * 4G20MG32
 */
export default function Exercice_Pythagore () {
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit
  sortieHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  this.listePackages = 'tkz-euclide'
  this.typeExercice = 'MG32'

  this.nouvelleVersion = function (numeroExercice) {
    this.dimensionsDivMg32 = [700, 500]
    this.listeQuestions = []
    this.listeCorrections = [] // Liste de questions corrigées
    const lettre0 = randint(11, 25) // aleatoirisation du nom des points
    const s0 = lettreDepuisChiffre(lettre0)
    const lettre1 = randint(11, 25, [lettre0])
    const s1 = lettreDepuisChiffre(lettre1)
    const lettre2 = randint(11, 25, [lettre0, lettre1])
    const s2 = lettreDepuisChiffre(lettre2)
    let type_de_questions, texte, texteCorr
    if (this.sup == 1) {
      type_de_questions = 1 // calcul de l'hypoténuse
    }
    if (this.sup == 2) {
      type_de_questions = 2 // calcul d'un côté de l'angle droit
    }
    if (this.sup == 3) {
      type_de_questions = randint(1, 2) // un des deux calculs
    }
    if (this.sup == 4) {
      type_de_questions = randint(3, 4)
    }
    const nom_du_triangle = choice([
      s0 + s1 + s2,
      s0 + s2 + s1,
      s1 + s0 + s2,
      s1 + s2 + s0,
      s2 + s0 + s1,
      s2 + s1 + s0
    ])
    const k1 = Math.round((Math.random() * 3 + 3) * 10) / 10
    const k2 = Math.round((Math.random() * 3 + 2) * 10) / 10
    const alpha1 = Math.random() * Math.PI - Math.PI / 2
    const alpha1deg = Math.round((alpha1 * 180) / Math.PI)
    const x1 = k1 // coordonnées des deux sommets du triangle
    const y2 = k2
    const s01 = arrondiVirgule(k1, 1) // mise en texte avec 1 chiffres après la virgule pour énoncé
    const s02 = arrondiVirgule(k2, 1)

    const carre01 = Math.round(k1 * k1 * 100) / 100
    const carre02 = Math.round(k2 * k2 * 100) / 100
    let dist12 = Math.sqrt(carre01 + carre02) // calcul de l'hypoténuse
    dist12 = Math.round(dist12 * 10) / 10 // On ne garde qu'une approximation au dixième pour l'exercice
    const s12 = arrondiVirgule(dist12, 1)
    const carre12 = Math.round(dist12 * dist12 * 100) / 100

    const scarre01 = arrondiVirgule(carre01, 2) // carremn = distance entre (xm;ym) et (xn;yn) au carré avec 2 décimales
    const scarre02 = arrondiVirgule(carre02, 2) // scarremn = chaine de caractère avec 2 décimales après une virgule.
    const scarre12 = arrondiVirgule(carre12, 2)
    if (sortieHtml) {
      let codeBase64
      if (alpha1deg < 0) {
        codeBase64 =
          'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAAA7##########w=='
      } else {
        codeBase64 =
          'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAO##########8='
      }

      if (type_de_questions == 1) {
        // calcul direct de l'hypoténuse
        texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1
          }=${s01}$ cm, $${s0 + s2}=${s02}$ cm.`
        texte += `<br>Le point $${s0}$ peut être déplacé.<br>`
        texte += `Calculer $${s1 + s2}$.`
        texteCorr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2
          }^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
        texteCorr +=
          'D&rsquo;où ' +
          `$${s1 + s2
          }^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondiVirgule(
            carre02 + carre01,
            2
          )}.$` +
          '<br>'
        texteCorr +=
          'Soit ' +
          `$${s1 + s2}~=~\\sqrt{${arrondiVirgule(
            carre02 + carre01,
            2
          )}}~\\approx${s12}$` +
          ' cm.'
      }
      if (type_de_questions == 2) {
        // Calcul d'un côté de l'angle droit
        texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1
          }=${s01}$ cm, $${s1 + s2}=${s12}$ cm.<br>`
        texte += `Calculer $${s0 + s2}$.`
        texteCorr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2
          }^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
        texteCorr +=
          'D&rsquo;où ' +
          `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1
          }^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondiVirgule(
            carre12 - carre01,
            2
          )}.$` +
          '<br>'
        texteCorr +=
          'Soit ' +
          `$${s0 + s2}~=~\\sqrt{${arrondiVirgule(
            carre12 - carre01,
            2
          )}}~\\approx${s02}$` +
          ' cm.'
      }
      if (type_de_questions < 3) {
        this.typeExercice = 'MG32'
        this.MG32codeBase64 = codeBase64
        this.mg32init = (mtg32App, idDoc) => {
          mtg32App.giveFormula2(idDoc, 'x2', y2)
          mtg32App.giveFormula2(idDoc, 'x1', x1)
          mtg32App.giveFormula2(idDoc, 'alphadeg', alpha1deg)
          mtg32App.rename(idDoc, 'A', s0)
          mtg32App.rename(idDoc, 'B', s1)
          mtg32App.rename(idDoc, 'C', s2)
          mtg32App.calculate(idDoc)
          mtg32App.display(idDoc)
        }
        texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`
      } else {
        this.typeExercice = ''
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      if (type_de_questions < 3) {
        listeQuestionsToContenu(this)
      } else {
        listeQuestionsToContenuSansNumero(this)
      }
    } else {
      if (type_de_questions < 3) {
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre (qui n'est pas en vraie grandeur), on a  : \\begin{itemize}"
        texte +=
          '\n\t\\item Le côté ' +
          `$[${s0 + s1}]$` +
          ' est perpendiculaire au côté ' +
          `$[${s0 + s2}]~;$`
        if (type_de_questions == 1) {
          // niveau 1 : Calcul de l'hypoténuse

          // enoncé  niveau 1

          texte +=
            '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
          texte +=
            '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
          texte +=
            '\\end{itemize} \\bigskip\n\t  Calculer ' +
            `$${s1 + s2}$` +
            ' à 0,1 près. \\end{minipage}'
        } else {
          // niveau 2 : Calcul d'un côté de l'angle droit
          // enoncé  niveau 2

          texte +=
            '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
          texte +=
            '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
          texte +=
            '\\end{itemize} \\bigskip  Calculer ' +
            `$${s0 + s2}$` +
            ' à 0,1 près. \\end{minipage}'
        }
        texte += '\\begin{minipage}{0.3 \\linewidth}'
        // dessin de la figure
        const scale = 0.7 * 6 / Math.max(x1, y2)
        texte += `\n \\begin{tikzpicture}[scale=${scale}]` // Balise début de figure
        texte +=
          '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial
        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          '\n\t \\tkzDefPointBy[rotation= center ' +
          s0 +
          ' angle ' +
          alpha1deg +
          '](B) \\tkzGetPoint{' +
          s1 +
          '}' // transformer le premier point par rotation
        texte +=
          '\n\t \\tkzDefPointBy[rotation= center ' +
          s0 +
          ' angle ' +
          alpha1deg +
          '](C) \\tkzGetPoint{' +
          s2 +
          '}' // transformer le deuxième point par rotation
        texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
        // marquer l'angle droit
        texte +=
          '\n\t \\tkzDefPointBy[homothety=center ' +
          s0 +
          ' ratio 0.1](' +
          s1 +
          ')' +
          '\\tkzGetPoint{B}'
        texte +=
          '\n\t \\tkzDefPointBy[rotation= center ' +
          s0 +
          ' angle 90](B) \\tkzGetPoint{C}'
        texte +=
          '\n\t \\tkzDefPointBy[homothety=center ' +
          s0 +
          ' ratio 0.1414](' +
          s1 +
          ')' +
          '\\tkzGetPoint{A}'
        texte +=
          '\n\t \\tkzDefPointBy[rotation= center ' +
          s0 +
          ' angle 45](A) \\tkzGetPoint{A}'
        texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit

        if (alpha1deg > 0) {
          // rotation "angle droit dessous"
          texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[right](' + s1 + ')'
          texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
        } else {
          // rotation "angle droit dessus" position du nom inversée
          texte += '\n\t \\tkzLabelPoints[above](' + s0 + ')' // nomme les points
          texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')'
          texte += '\n\t \\tkzLabelPoints[right](' + s2 + ')'
        }
        texte += '\n \\end{tikzpicture}' // Balise de fin de figure
        texte += '\\end{minipage}'
      } else {
        texte =
          '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Dans le triangle ' +
          `${nom_du_triangle}` +
          ' rectangle en ' +
          `${s0}` +
          ' : \\begin{itemize}'
        // texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
        if (type_de_questions == 1) {
          // niveau 1 : Calcul de l'hypoténuse

          // enoncé  niveau 1

          texte +=
            '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
          texte +=
            '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
          texte +=
            '\\end{itemize} \\bigskip\n\t  Calculer ' +
            `$${s1 + s2}$` +
            ' à 0,1 près. \\end{minipage}'
        } else {
          // niveau 2 : Calcul d'un côté de l'angle droit
          // enoncé  niveau 2

          texte +=
            '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
          texte +=
            '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
          texte +=
            '\\end{itemize} \\bigskip  Calculer ' +
            `$${s0 + s2}$` +
            ' à 0,1 près. \\end{minipage}'
        }
      }
      this.listeQuestions.push(texte) // on envoie la question
      // correction
      if (type_de_questions == 2 || type_de_questions == 4) {
        // niveau 2 : Calcul d'un côté de l'angle droit
        texteCorr =
          'Le triangle ' +
          `$${nom_du_triangle}$` +
          ' est rectangle en ' +
          `$${s0}.$` +
          "<br>\n D'après le théorème de Pythagore, on a :~" +
          `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
        texteCorr +=
          "<br>\n D'où " +
          `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1
          }^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondiVirgule(
            carre12 - carre01,
            2
          )}.$`
        texteCorr +=
          '<br>\n Soit ' +
          `$${s0 + s2}~=~\\sqrt{${arrondiVirgule(
            carre12 - carre01,
            2
          )}}~`
        if (s02 == calcul(Math.sqrt(s12 ** 2 - s01 ** 2))) texteCorr += `=${s02}~\\text{cm}.$`
        else texte += `\\approx${s02}~\\text{cm}.$`
      } else {
        texteCorr =
          'Le triangle ' +
          `$${nom_du_triangle}$` +
          ' est rectangle en ' +
          `$${s0}.$` +
          "<br>\n D'après le théorème de Pythagore, on a " +
          `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
        texteCorr +=
          "<br>\n D'où " +
          `$${s1 + s2
          }^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondiVirgule(
            carre02 + carre01,
            2
          )}.$`
        texteCorr +=
          '<br>\n Soit ' +
          `$${s1 + s2}~=~\\sqrt{${arrondiVirgule(
            carre02 + carre01,
            2
          )}}~`
        if (s12 == calcul(Math.sqrt(s01 ** 2 + s02 ** 2))) texteCorr += `=${s12}~\\text{cm}.$`
        else texte += `\\approx${s12}~\\text{cm}.$`
      }

      this.listeCorrections.push(texteCorr)

      listeQuestionsToContenuSansNumero(this)

      // }end for
    }
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    4,
    "1 : Calcul de l'hypoténuse \n 2 : Calcul d'un côté de l'angle droit\n 3 : Calcul d'un côté quelconque\n 4 : Sans la figure"
  ]
}
