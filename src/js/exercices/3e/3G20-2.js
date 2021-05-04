import Exercice from '../ClasseExercice.js';
import {listeQuestionsToContenu,listeQuestionsToContenuSansNumero,randint,arrondi,abs,quatrieme_proportionnelle,texNombrec,lettreDepuisChiffre,tex_fraction,katex_Popup2} from '../../modules/outils.js'

export const titre = 'Déterminer une longueur avec la propriété de Thales (MG32)'

/**
 * @auteur Jean-Claude Lhote
 * 3G20-2
 */
export default function Exercice_Thales() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = titre;
  this.consigne = "";
  this.nbQuestions = 1;
  this.nbQuestionsModifiable = false;
  sortieHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 1);
  sortieHtml ? (this.spacing = 2) : (this.spacing = 1.5);
  this.nbCols = 1;
  this.typeExercice = 'MG32';
  this.nbColsCorr = 1;
  this.quatrieme = false;
  this.sup = 1; // 1 calcul direct | 2 calcul en deux étapes | 3 version 1&2 sans figure
  this.listePackages = "tkz-euclide";
  // paramètres communs Html ou Latex
  // let s1='A',s2='B',s3='C',s4='M',s5='N'
  // coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
  this.nouvelleVersion = function (numeroExercice) {
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
    if (this.quatrieme) {
      k = abs(k);
    }
    let dist23 = arrondi(Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2), 1); //calcul des longueurs du triangle principal
    let dist12 = arrondi(Math.sqrt(x2 ** 2 + y2 ** 2), 1);
    let dist13 = arrondi(Math.sqrt(x3 ** 2 + y3 ** 2), 1);
    let dist15 = arrondi(dist13 * abs(k), 2);
    let dist45 = arrondi(dist23 * abs(k), 2);
    let dist35, texte, texteCorr;
    let dist14 = arrondi(dist12 * abs(k), 2); // calcul des longueurs demandées à partir



    // On ne garde qu'une approximation au dixième pour l'exercice
    let s45 = texNombrec(dist45); // mise en texte avec 1 chiffres après la virgule pour énoncé
    let s13 = texNombrec(dist13);
    let s12 = texNombrec(dist12);
    let s15 = texNombrec(dist15);
    let s14 = texNombrec(dist14);
    let s23 = texNombrec(dist23);
    if (k < 0) {
      dist35 = dist13 + dist15;
    } else {
      dist35 = dist13 - dist15;
    } // calcul de la longueur intermédiaire dans un cas classique ou en papillon
    let s35 = texNombrec(dist35); // à priori, c'est déjà arrondi au dixième, mais je me méfie des calculs flottants en js
    let niv_diff = randint(1, 2);
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
        // calcul direct de AM et BC : pas de calcul intermédiaire de AN
        texte = `Dans la figure ci-dessous, les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s1 + s5}=${s15}$ cm.<br>`;
        texte += `Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texteCorr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texteCorr =
            "Les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.";
          texteCorr += `<br>Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
          texteCorr +=
            "<br>D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}$` +
            "<br>";
        }
      } else if (this.sup == 2) {
        // Calcul de AN nécessaire avant de calculer AM et BC
        texte = `Dans la figure ci-dessous, les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s5 + s3}=${s35}$ cm.`;
        texte += `<br>Le point $${s1}$ peut être déplacé.<br>`;
        texte += `Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texteCorr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texteCorr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>` +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        }
        if (k > 0) {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
        } else {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
        }
      } else if (randint(1, 2) == 1) {
        texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ tel que les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s1 + s5}=${s15}$ cm.`;
        texte += `<br>Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texteCorr =
          "Dans le triangle " +
          `$${s1 + s2 + s3}$` +
          ", les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>" +
          " D&rsquo;après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
          "<br>";
      } else {
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
        texte += `<br>Les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et $${s5 + s3}=${s35}$ cm.`;
        texte += `<br>Calculer $${s1 + s4}$ et $${s2 + s3}$.`;
        if (k > 0) {
          texteCorr =
            "Dans le triangle " +
            `$${s1 + s2 + s3}$` +
            ", les droites " +
            `$(${s4 + s5})$` +
            " et " +
            `$(${s2 + s3})$` +
            " sont parallèles.<br>" +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        } else {
          texteCorr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>` +
            " D&rsquo;après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>";
        }
        if (k > 0) {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.<br>";
        } else {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` +
            " cm.<br>";
        }
      }
      texteCorr += "Avec les données numériques :<br>";
      texteCorr +=
        `$${tex_fraction(s1 + s4, s12)}=${tex_fraction(
          s15,
          s13
        )}=${tex_fraction(s45, s2 + s3)}$` + "<br>";
      texteCorr +=
        `Soit $${s1 + s4}=` +
        quatrieme_proportionnelle(dist13, dist15, dist12, 1) +
        "$ cm";
      texteCorr +=
        ` et $${s2 + s3}=` +
        quatrieme_proportionnelle(dist15, dist13, dist45, 1) +
        "$ cm.";

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
        texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
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
      texte =
        "\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}";
      texte += `\n\t\\item Les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.`;
      if (this.sup == 1) {
        //niveau 1 : Calcul direct quatrième proportionnelle
        // enoncé  niveau 1
        texte += "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s3 + " = " + s13 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s4 + s5 + " = " + s45 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s5 + " = " + s15 + "~\\text{cm}."}$`;
        texte +=
          "\\end{itemize} \\bigskip  Calculer " +
          `$${s1 + s4}$` +
          " et " +
          `$${s2 + s3}$` +
          " à 0,1 près. \\end{minipage}";
      } else if (this.sup == 2) {
        // niveau 2 : Calcul intermédiaire nécessaire
        // enoncé  niveau 2
        texte += "\n\t\\item " + `$${s1 + s2 + " = " + s12 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s1 + s3 + " = " + s13 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s4 + s5 + " = " + s45 + "~\\text{cm}~;"}$`;
        texte += "\n\t\\item " + `$${s3 + s5 + " = " + s35 + "~\\text{cm}."}$`;
        texte +=
          "\\end{itemize} \\bigskip  Calculer " +
          `$${s1 + s4}$` +
          " et " +
          `$${s2 + s3}$` +
          " à 0,1 près. \\end{minipage}";
      } // énoncé sans figure
      else if (k > 0) {
        texte =
          `$${s1}$, $${s2}$ et $${s3}$` +
          " sont trois point distincts.<br>\n" +
          `$${s4} \\in [${s1 + s2}]$` +
          " et " +
          `$${s5} \\in [${s1 + s3}]$` +
          " tel que les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>\n";
        texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et `;
        if (niv_diff == 1) {
          texte += `$${s1 + s5}=${s15}$ cm.`;
        } else {
          texte += `$${s3 + s5}=${s35}$ cm.`;
        }
        texte += `<br>\nCalculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texteCorr =
          "Dans le triangle " +
          `$${s1 + s2 + s3}$` +
          ", les droites " +
          `$(${s4 + s5})$` +
          " et " +
          `$(${s2 + s3})$` +
          " sont parallèles.<br>\n" +
          " D'après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$`;
        if (niv_diff == 2) {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            "~;cm.";
        }
      } else {
        texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`;
        texte += `<br>\nLes droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>\n $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s4 + s5}=${s45}$ cm et `;
        if (niv_diff == 1) {
          texte += `$${s1 + s5}=${s15}$ cm.`;
        } else {
          texte += `$${s3 + s5}=${s35}$ cm.`;
        }
        texte += `<br>\nCalculer $${s1 + s4}$ et $${s2 + s3}$.`;
        texteCorr =
          `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>\n` +
          " D'après la propriété de Thales, on a " +
          `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
            s1 + s5,
            s1 + s3
          )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
          "<br>\n";
        if (niv_diff == 2) {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}$` +
            " cm.";
        }
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
      if (this.sup == 2) {
        //niveau 2 : Calcul intermédiaire nécessaire
        texteCorr = `Les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>\n\t D\'après la propriété de Thales, on a $${tex_fraction(
          s1 + s4,
          s1 + s2
        )}=${tex_fraction(s1 + s5, s1 + s3)}=${tex_fraction(
          s4 + s5,
          s2 + s3
        )}.$<br>\n\t`;
        if (k > 0) {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s1 + s3}-${s5 + s3}=${s13}-${s35}=${s15}~\\text{cm}.$`;
        } else {
          texteCorr +=
            "On sait que " +
            `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}~\\text{cm}.$`;
        }
      } else if (this.sup == 1) {
        if (k > 0) {
          texteCorr = `Dans le triangle $${s1 + s2 + s3}$, les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>\n D\'après la propriété de Thales, on a $${tex_fraction(
            s1 + s4,
            s1 + s2
          )}=${tex_fraction(s1 + s5, s1 + s3)}=${tex_fraction(
            s4 + s5,
            s2 + s3
          )}.$`;
        } else {
          texteCorr =
            `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4 + s5})$ et $(${s2 + s3})$ sont parallèles.<br>\n` +
            " D'après la propriété de Thales, on a " +
            `$${tex_fraction(s1 + s4, s1 + s2)}=${tex_fraction(
              s1 + s5,
              s1 + s3
            )}=${tex_fraction(s4 + s5, s2 + s3)}.$` +
            "<br>\n";
        }
      }
      texteCorr += `<br>\n On a donc $${tex_fraction(
        s1 + s4,
        s12
      )}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}$`;
      texteCorr += `<br>\n Soit $${s1 + s4}=${tex_fraction(
        s15 + "\\times" + s12,
        s13
      )}\\approx${s14}~\\text{cm}$.`;
      texteCorr += `<br>\n Et $${s2 + s3}=${tex_fraction(
        s13 + "\\times" + s45,
        s15
      )}\\approx${s23}~\\text{cm}$.`;

      this.listeCorrections.push(texteCorr);

      listeQuestionsToContenuSansNumero(this);
    }
  };

  this.besoinFormulaireNumerique = [
    "Niveau de difficulté",
    3,
    "1 : Calcul direct de deux longueurs \n 2 : Avec calcul intermédiaire\n 3 : Sans figure",
  ];
}
