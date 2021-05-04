import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,listeQuestionsToContenuSansNumero,randint,arrondi,abs,texNombrec,lettreDepuisChiffre,texNombre,miseEnEvidence,tex_fraction} from '../../modules/outils.js'

export const amcReady = true

export const titre = 'Contrôler si deux droites sont parallèles'

/**
 * Reciproque_Thales
 * @Auteur Jean-Claude Lhote
 * 3G21
 */
export default function Reciproque_Thales() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 1;
  this.nbQuestionsModifiable = false;
  sortieHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 1);
  sortieHtml ? (this.spacing = 2) : (this.spacing = 1.5);
  this.nbCols = 1;
  this.nbColsCorr = 1;
  this.quatrieme = false;
  this.sup = 1;
  this.sup2 = 1;
  this.listePackages = "tkz-euclide";
  this.typeExercice="MG32"

  // let s1='A',s2='B',s3='C',s4='M',s5='N'
  // coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
  this.nouvelleVersion = function (numeroExercice) {
    this.qcm = ['3G21', [], "Contrôler si deux droites sont parallèles",3,{}]
    this.listeQuestions = [];
    this.listeCorrections = [];
    let lettre1 = randint(1, 26); // aleatoirisation du nom des points
    let s1 = lettreDepuisChiffre(lettre1);
    let lettre2 = randint(1, 26, [lettre1]);
    let s2 = lettreDepuisChiffre(lettre2);
    let lettre3 = randint(1, 26, [lettre1, lettre2]);
    let s3 = lettreDepuisChiffre(lettre3);
    let lettre4 = randint(1, 26, [lettre1, lettre2, lettre3]);
    let s4 = lettreDepuisChiffre(lettre4);
    let lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4]);
    let s5 = lettreDepuisChiffre(lettre5);
    let x2 = randint(2, 4);
    let y2 = randint(3, 5);
    let x3 = randint(5, 6);
    let y3 = randint(-2, 1);
    let k = (randint(2, 8) * randint(-1, 1, [0])) / 10;
    let k2;
    if (this.sup2 == 1)
      k2 = k;
    else if (this.sup2 == 3)
      k2 = k * (1 + randint(0, 1) * 0.1);
    else
      k2 = k * (1 + randint(-1, 1, 0) * 0.1);

    if (this.quatrieme) {
      k = abs(k);
      k2 = abs(k2);
    }
    let dist24;
    let dist12 = Math.round(Math.sqrt(x2 * x2 + y2 * y2));
    let dist13 = Math.round(Math.sqrt(x3 * x3 + y3 * y3));
    while (dist12 == dist13) {
      //éviter les triangles isocèles imbriqués qui ne nécéssitent aucun calculs.
      x2 = randint(2, 4);
      y2 = randint(3, 5);
      x3 = randint(5, 6);
      y3 = randint(-2, 1);
      dist12 = Math.round(Math.sqrt(x2 * x2 + y2 * y2));
      dist13 = Math.round(Math.sqrt(x3 * x3 + y3 * y3));
    }
    let dist15 = arrondi(dist13 * abs(k), 1);
    let dist14 = arrondi(dist12 * abs(k2), 1);
    let dist35;

    if (k < 0) {
      dist35 = dist13 + dist15;
      dist24 = dist12 + dist14;
    } else {
      dist35 = dist13 - dist15;
      dist24 = dist12 - dist14;
    }

    let texte, texteCorr;
    // On ne garde qu'une approximation au dixième pour l'exercice
    // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s13 = texNombre(dist13);
    let s12 = texNombre(dist12);
    let s15 = texNombre(dist15);
    let s14 = texNombre(dist14);
    let s24 = texNombre(dist24);
    let s35 = texNombre(dist35);
    // num1 = arrondi(dist12 * 100);
    // den1 = arrondi(dist14 * 100);
    // num2 = arrondi(dist13 * 100);
    // den2 = arrondi(dist15 * 100);
    // let fraction1 = [],
    //   fraction2 = [];
    //  fraction1 = fractionSimplifiee(num1, den1);
    // fraction2 = fractionSimplifiee(num2, den2);
    if (sortieHtml) {
      this.typeExercice = "MG32";
      this.dimensionsDivMg32 = [700, 500];
      let codeBase64;

      if (k < 0) {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8=";
      } else {
        codeBase64 =
          "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########";
      }

      if (this.sup == 1) {
        // AM,AB,AN,AC sont donnés pas de calculs intermédiaires
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s5}=${s15}$ cm et $${s1 + s4}=${s14}$ cm.<br>`;
        texteCorr = ``;
      } else if (this.sup == 2) {
        // AN n'est pas donné, il faut le calculer avant.
        texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s3 + s5}=${s35}$ cm et $${s2 + s4}=${s24}$ cm.<br>`;
        texteCorr = ``;
        if (k > 0) {
          //triangles imbriqués
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
          texteCorr +=
            "et que " +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            " cm.<br>";
        } else {
          // papillon
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
          texteCorr +=
            "et que " +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            " cm.<br>";
        }
      } else if (randint(1, 2) == 1) {
        //triangles imbriqués sans figure
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.`;
        texteCorr = ``;
      } else {
        // papillon sans figure
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`;
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texteCorr = ``;
      }
      texte += `Les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont-elles parallèles ?<br>`;

      texteCorr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${miseEnEvidence(
        s15
      )}}{${s14}\\times${miseEnEvidence(s15)}}=\\dfrac{
        ${texNombrec(arrondi(dist12 * dist15, 3))}}
        {${s14}\\times${s15}}
      $`;
      texteCorr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${miseEnEvidence(
        s14
      )}}{${s15}\\times${miseEnEvidence(s14)}}=\\dfrac{${texNombrec(arrondi(dist13 * dist14, 3))}}
        {${s14}\\times${s15}}
      $`;

      if (k != k2) {
        // droites non parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`;
        texteCorr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`;
      } else {
        // droites parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${texNombre(arrondi(dist12*dist15,3))}$.<br>`;
        if (k > 0)
          texteCorr += `$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`;

        else
          texteCorr += `$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        texteCorr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`;
      }

      if (this.sup < 3) {
        this.MG32codeBase64 = codeBase64;
        this.MG32code_pour_modifier_la_figure = `
					mtg32App.giveFormula2("MG32svg${numeroExercice}", "x3", "${x3}");
					mtg32App.giveFormula2("MG32svg${numeroExercice}", "y2", "${y2}");
					mtg32App.giveFormula2("MG32svg${numeroExercice}", "y3", "${y3}");
					mtg32App.giveFormula2("MG32svg${numeroExercice}", "k", "${k}");
					mtg32App.rename("MG32svg${numeroExercice}","A'","${s1}");
					mtg32App.rename("MG32svg${numeroExercice}","B'","${s2}");
					mtg32App.rename("MG32svg${numeroExercice}","C'","${s3}");
					mtg32App.rename("MG32svg${numeroExercice}","M'","${s4}");
					mtg32App.rename("MG32svg${numeroExercice}","N'","${s5}");
					mtg32App.calculate("MG32svg${numeroExercice}");
					mtg32App.display("MG32svg${numeroExercice}");
					`;
        texte += `$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
      }
      this.listeQuestions.push(texte);
      this.listeCorrections.push(texteCorr);
      if (this.sup < 3) {
        listeQuestionsToContenu(this);
      } else {
        this.typeExercice = "";
        listeQuestionsToContenuSansNumero(this);
      }
    } else {
      // sortie Latex
      texteCorr = ``;
      if (this.sup == 1) {
        //niveau 1 : Calcul direct
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
        texte += `\n\t \\item ${s1 + s2}=${s12} cm \n\t \\item ${s1 + s3}=${s13} cm\n\t \\item ${s1 + s5}=${s15} cm\n\t \\item ${s1 + s4}=${s14} cm.<br>`;
        texte +=
          `\\end{itemize}  ` +
          `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>` +
          ". \\end{minipage}";
      } else if (this.sup == 2) {
        // niveau 2 : Calcul intermédiaire nécessaire
        texte =
          "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
        texte += `\n\t \\item ${s1 + s2} = ${s12} cm\n\t \\item ${s1 + s3} = ${s13} cm\n\t \\item ${s3 + s5} = ${s35} cm\n\t \\item ${s2 + s4} = ${s24} cm.<br>`;
        texte +=
          "\\end{itemize}  " +
          `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>` +
          ". \\end{minipage}";
        if (k > 0) {
          // triangles imbriqués
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
          texteCorr +=
            "et que " +
            `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` +
            " cm.<br>";
        } else {
          // papillon
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
          texteCorr +=
            "et que " +
            `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` +
            " cm.<br>";
        }
      }

      // énoncé sans figure
      else if (randint(1, 2) == 1) {
        // triangles imbriqués
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`;
      } else {
        // papillon
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`;
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`;
      }

      if (this.sup < 3) {
        // on ne fait la figure que si niveau < 3
        texte += "\\begin{minipage}{0.3 \\linewidth}";
        // dessin de la figure
        texte += "\n \\begin{tikzpicture}[scale=0.7]"; // Balise début de figure
        texte +=
          "\n\t \\tkzDefPoints{0/0/" +
          s1 +
          "," +
          x3 +
          "/" +
          y3 +
          "/" +
          s3 +
          "," +
          x2 +
          "/" +
          y2 +
          "/" +
          s2 +
          "}"; // Placer les points du triangle principal
        texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s2 + "," + s3 + ")"; // Trace le triangle principal

        // Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s2 +
          ")" +
          "\t\\tkzGetPoint{" +
          s4 +
          "}"; // Place le premier point du triangle image
        texte +=
          "\n\t \\tkzDefPointBy[homothety=center " +
          s1 +
          " ratio " +
          k +
          "](" +
          s3 +
          ")" +
          "\t\\tkzGetPoint{" +
          s5 +
          "}"; // Place le deuxième point du triangle image
        texte += "\n\t \\tkzDrawSegment(" + s4 + "," + s5 + ")"; // Trace le segment
        if (k > 0) {
          texte += "\n\t \\tkzLabelPoints[left](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above left](" + s2 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s5 + ")"; //nomme les points

          // Nomme les points au dessus avec above, dessous avec below...
        } else {
          // position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
          texte += "\n\t \\tkzLabelPoints[below](" + s1 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[below](" + s3 + "," + s4 + ")"; //nomme les points
          texte += "\n\t \\tkzLabelPoints[above](" + s2 + "," + s5 + ")"; //nomme les points
          texte += "\n\t \\tkzDrawPolygon(" + s1 + "," + s4 + "," + s5 + ")"; // Trace le triangle secondaire
        }
        texte += "\n \\end{tikzpicture}"; // Balise de fin de figure
        texte += "\\end{minipage}";
      }
      this.listeQuestions.push(texte); // on envoie la question

      // correction
      texteCorr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${miseEnEvidence(
        s15
      )}}{${s14}\\times${miseEnEvidence(s15)}}=${tex_fraction(
        texNombrec(arrondi(dist12 * dist15, 3)),
        texNombrec(arrondi(dist14 * dist15, 4))
      )}$`;
      texteCorr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${miseEnEvidence(
        s14
      )}}{${s15}\\times${miseEnEvidence(s14)}}=${tex_fraction(
        texNombrec(arrondi(dist13 * dist14, 3)),
        texNombrec(arrondi(dist14 * dist15, 4))
      )}$`;

      if (k != k2) {
        // droites pas parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`;
        texteCorr += `Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`;
      } else {
        // droites parallèles
        texteCorr += `<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${texNombre(arrondi(dist12*dist15,3))}$.<br>`;
        if (k > 0)
          texteCorr += `$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`;

        else
          texteCorr += `$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`;
        texteCorr += `Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`;
      }
     
      this.qcm[1][0] = [texte, [texteCorr], [6]]
  
      this.listeCorrections.push(texteCorr);

      listeQuestionsToContenuSansNumero(this);
    }
  };

  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    3,
    "1 : Cas simple \n 2 : Complication \n 3 : Sans figure",
  ];
  this.besoin_formulaire2_numerique = [
    "Réciproque ou contraposée ? ",
    3,
    "1 : Réciproque \n 2 : Contraposée \n 3 : Aléatoire",
  ];
}
