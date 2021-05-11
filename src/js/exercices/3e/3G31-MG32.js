import Exercice from '../ClasseExercice.js'
import { listeQuestionsToContenuSansNumero, randint, choice, arrondiVirgule, lettreDepuisChiffre, texFraction } from '../../modules/outils.js'
import { degres } from '../../modules/fonctionsMaths.js'
export const titre = 'Déterminer un angle grâce à la trigonométrie'

/**
 * @auteur Jean-Claude Lhote
 * 3G31
 * Calcul d'angle dans le triangle rectangle
 * Le niveau 1 se limite à l'utilisation de Arccos
 * Le niveau 2 utilise la fonction trigo la plus pertinente pour un calcul direct
 */
export default function Exercice_Trigo_angles () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = ''
  this.nbQuestions = 1
  this.nbQuestionsModifiable = false
  this.nbCols = 1
  this.nbColsCorr = 1
  this.sup = 1 // 1 calcul avec Arccos
  sortieHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 1.5)
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
    let angle1, angle2
    let type_de_questions
    if (this.sup == 1) {
      type_de_questions = randint(1, 2) // utilisation de Arccos
    }
    if (this.sup == 2) {
      type_de_questions = randint(1, 6, [2]) // utilisation des 3 fonctions Arccos, Arcsin et Arctan
    }

    const nom_du_triangle = choice([
      s0 + s1 + s2,
      s0 + s2 + s1,
      s1 + s0 + s2,
      s1 + s2 + s0,
      s2 + s0 + s1,
      s2 + s1 + s0
    ])
    const k1 = Math.round((Math.random() * 5 + 1) * 10) / 10
    const k2 = Math.round((Math.random() * 5 + 1) * 10) / 10
    angle1 = Math.round(degres(Math.atan(k2 / k1)))
    angle2 = 90 - angle1
    const alpha1 = Math.random() * Math.PI - Math.PI / 2
    const alpha1deg = Math.round((alpha1 * 180) / Math.PI)
    const x1 = k1 // coordonnées des deux sommets du triangle
    const y2 = k2
    const s01 = arrondiVirgule(k1, 1) // mise en texte avec 1 chiffres après la virgule pour énoncé
    const s02 = arrondiVirgule(k2, 1)

    let dist12 = k1 / Math.cos(Math.atan(k2 / k1)) // calcul de l'hypoténuse
    dist12 = Math.round(dist12 * 10) / 10 // On ne garde qu'une approximation au dixième pour l'exercice
    const s12 = arrondiVirgule(dist12, 1)
    let texte
    let texteCorr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`
    if (sortieHtml) {
      // sortie html MG32
      let codeBase64
      if (type_de_questions % 2 != 0) {
        if (alpha1deg < 0) {
          codeBase64 =
            'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w=='
        } else {
          codeBase64 =
            'TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8='
        }
      } else {
        if (alpha1deg < 0) {
          codeBase64 =
            'TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8AAwAAACBAQHXBUVjTVQAAAAEAAAAXAAAAFgAAAA7##########w=='
        } else {
          codeBase64 =
            'TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAMAAAAgQELJWhOPSZcAAAABAAAAFwAAABYAAAAO##########8='
        }
      }
      texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`

      if (type_de_questions == 1) {
        // calcul de l'angle 1 (arccos)
        texte += `$${s1 + s2}=${s12}$ cm<br>`
        texte += `$${s0 + s1}=${s01}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`
      }
      if (type_de_questions == 2) {
        // Calcul de l'angle 2 (90-arccos)
        texte += `$${s1 + s2}=${s12}$ cm<br>`
        texte += `$${s0 + s1}=${s01}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`
      }
      if (type_de_questions == 3) {
        // calcul de l'angle 1 (arcsin)
        texte += `$${s0 + s2}=${s02}$ cm<br>`
        texte += `$${s1 + s2}=${s12}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`
      }
      if (type_de_questions == 4) {
        // Calcul de l'angle 2 (arcsin)
        texte += `$${s1 + s2}=${s12}$ cm<br>`
        texte += `$${s0 + s1}=${s01}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`
      }
      if (type_de_questions == 5) {
        // calcul de l'angle 1 (arctan)
        texte += `$${s0 + s2}=${s02}$ cm<br>`
        texte += `$${s0 + s1}=${s01}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`
      }
      if (type_de_questions == 6) {
        // Calcul de l'angle 2 (arctan)
        texte += `$${s0 + s2}=${s02}$ cm<br>`
        texte += `$${s0 + s1}=${s01}$ cm<br>`
        texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`
      }

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
      // sortie Latex
      texte = '\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
      texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$;`

      if (type_de_questions == 1) {
        // Calcul de l'angle coté adjacent (Arccos)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
      }
      if (type_de_questions == 2) {
        // Calcul de l'angle opposé (90-Arccos)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
      }
      if (type_de_questions == 3) {
        // Calcul de l'angle 1 (Arcsin)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
      }
      if (type_de_questions == 4) {
        // Calcul de l'angle 2 (Arcsin)
        texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
      }
      if (type_de_questions == 5) {
        // Calcul de l'angle 1 (Arctan)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
      }
      if (type_de_questions == 6) {
        // Calcul de l'angle 2 (Arctan)
        texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`
        texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`
        texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
      }
      texte += '\\begin{minipage}{0.3 \\linewidth}'
      // dessin de la figure
      texte += '\n \\begin{tikzpicture}[scale=0.7]' // Balise début de figure
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
        texte += '\n\t \\tkzLabelPoints[above right](' + s1 + ')'
        texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
      } else {
        // rotation "angle droit dessus" position du nom inversée
        texte += '\n\t \\tkzLabelPoints[left](' + s0 + ')' // nomme les points
        texte += '\n\t \\tkzLabelPoints[below left](' + s1 + ')'
        texte += '\n\t \\tkzLabelPoints[above right](' + s2 + ')'
      }
      texte += '\n \\end{tikzpicture}' // Balise de fin de figure
      texte += '\\end{minipage}'
    }
    if (type_de_questions == 1) {
      texteCorr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2}}$ est défini par :<br>`
      texteCorr += `$\\cos \\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s0 + s1, s1 + s2)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\cos\\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s01, s12)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s1 + s2}}=\\arccos\\left(${texFraction(s01, s12)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s1 + s2}}\\approx${angle1}\\degree$`
    }
    if (type_de_questions == 2) {
      texteCorr += `Le cosinus de l'angle $\\widehat{${s0 + s1 + s2}}$ est défini par :<br>`
      texteCorr += `$\\cos \\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s0 + s1, s1 + s2)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\cos\\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s01, s12)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s1 + s2}}=\\arccos\\left(${texFraction(s01, s12)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s1 + s2}}\\approx${angle1}\\degree$<br>`
      texteCorr += 'Or, dans un triangle rectangle les angles aigus sont complémentaires, donc :<br>'
      texteCorr += `$\\widehat{${s0 + s2 + s1}}\\approx90-${angle1}\\approx${angle2}\\degree$`
    }
    if (type_de_questions == 3) {
      texteCorr += `Le sinus de l'angle $\\widehat{${s0 + s1 + s2}}$ est défini par :<br>`
      texteCorr += `$\\sin \\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s0 + s2, s1 + s2)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\sin\\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s02, s12)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s1 + s2}}=\\arcsin\\left(${texFraction(s02, s12)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s1 + s2}}\\approx${angle1}\\degree$`
    }
    if (type_de_questions == 4) {
      texteCorr += `Le sinus de l'angle $\\widehat{${s0 + s2 + s1}}$ est défini par :<br>`
      texteCorr += `$\\sin \\left(\\widehat{${s0 + s2 + s1}}\\right)=${texFraction(s0 + s1, s1 + s2)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\sin\\left(\\widehat{${s0 + s2 + s1}}\\right)=${texFraction(s01, s12)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s2 + s1}}=\\arcsin\\left(${texFraction(s01, s12)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s2 + s1}}\\approx${angle2}\\degree$`
    }
    if (type_de_questions == 5) {
      texteCorr += `La tangente de l'angle $\\widehat{${s0 + s1 + s2}}$ est définie par :<br>`
      texteCorr += `$\\tan \\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s0 + s2, s0 + s1)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\tan\\left(\\widehat{${s0 + s1 + s2}}\\right)=${texFraction(s02, s01)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s1 + s2}}=\\arctan\\left(${texFraction(s02, s01)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s1 + s2}}\\approx${angle1}\\degree$`
    }
    if (type_de_questions == 6) {
      texteCorr += `La tangente de l'angle $\\widehat{${s0 + s2 + s1}}$ est définie par :<br>`
      texteCorr += `$\\tan \\left(\\widehat{${s0 + s2 + s1}}\\right)=${texFraction(s0 + s1, s0 + s2)}$<br>`
      texteCorr += 'Avec les données numériques :<br>'
      texteCorr += `$\\tan\\left(\\widehat{${s0 + s2 + s1}}\\right)=${texFraction(s01, s02)}$<br>`
      texteCorr += `On en déduit que $\\widehat{${s0 + s2 + s1}}=\\arctan\\left(${texFraction(s01, s02)}\\right)$<br>`
      texteCorr += `Soit $\\widehat{${s0 + s2 + s1}}\\approx${angle2}\\degree$`
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenuSansNumero(this)
  }
  this.besoinFormulaireNumerique = [
    'Niveau de difficulté',
    2,
    "1 : Calcul de l'angle avec Acos \n 2 : Calcul de l'angle avec Acos, Asin ou Atan"
  ]
}
