import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,combinaison_listes,exposant,arrondi,arrondi_virgule,tex_fraction_reduite,produits_en_croix,quatrieme_proportionnelle,calcul,tex_nombrec,prenomF,prenom,tex_nombre,nombre_avec_espace,mise_en_evidence,tex_prix,katex_Popup2,num_alpha} from "/modules/outils.js"
/**
 * problèmes de grandeurs composées
 * @Auteur Jean-Claude Lhote
 * Référence : 4P10
 */
export default function Problemes_grandeurs_composees() {
  "use strict";
  Exercice.call(this); // Héritage de la classe Exercice()
  this.titre = "Résoudre des problèmes de grandeurs composées et de conversion d'unités complexes";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_questions_modifiable = false;
  this.nb_cols = 1;
  this.nb_cols_corr = 1;
  sortie_html ? (this.spacing = 3) : (this.spacing = 1.5);
  sortie_html ? (this.spacing_corr = 3) : (this.spacing_corr = 2);
  this.sup = false;

  this.nouvelle_version = function (numero_de_l_exercice) {
    this.liste_questions = []; // Liste de questions
    this.liste_corrections = []; // Liste de questions corrigées
    // let liste_index_disponibles=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    // let liste_index=combinaison_listes(liste_index_disponibles,this.nb_questions);
    let grandeurs = [];
    let liste7 = combinaison_listes([0, 1, 2], this.nb_questions)
    let flag7 = 0, flag2 = 0
    let liste2 = combinaison_listes([0, 1], this.nb_questions)



    if (!this.sup) {
      // Si aucune grandeur n'est saisie
      grandeurs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    } else {
      if (typeof this.sup == "number") {
        // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
        grandeurs[0] = this.sup;
        this.nb_questions = 1;
      } else {
        grandeurs = this.sup.split("-"); // Sinon on créé un tableau à partir des valeurs séparées par des -
        this.nb_questions = grandeurs.length;
      }
    }

    let liste_index = combinaison_listes(grandeurs, this.nb_questions);
    let type_aide = 1;
    if (!sortie_html) type_aide = 0;
    let solutes = [
      [`sel`, `d'eau`, 300],
      [`sucre`, `d'eau`, 2000],
      [`dioxyde de carbone`, `d'eau`, 3],
      [`bicarbonate de sodium`, `d'eau`, 9],
      [`carbonate de sodium`, `d'eau`, 300],
    ]; //soluté, masse maximale en gramme pour saturer 1 L de solvant
    let materiaux = [
      [`Paladium`, 12000],
      [`acier`, 7800],
      [`fonte`, 7100],
      [`aluminium`, 2700],
      [`argent`, 10500],
      [`bronze`, 8800],
      [`cuivre`, 8960],
      [`fer`, 7860],
      [`lithium`, 530],
      [`mercure`, 13545],
      [`nickel`, 8900],
      [`or`, 19300],
      [`platine`, 21450],
      [`titane`, 4500],
      [`zinc`, 7150],
    ];
    let villes = [
      [`Nice`, 342637, 71.9],
      [`Montpellier`, 281613, 56.9],
      [`Rennes`, 216268, 50.4],
      [`Dijon`, 155090, 40.4],
      [`Orléans`, 114782, 27.5],
      [`Clermont-Ferrand`, 142686, 42.7],
      [`Nantes`, 306694, 65.2],
      [`Paris`, 2190327, 105.4],
      [`Lyon`, 515695, 47.9],
      [`Marseille`, 862211, 240.6],
      [`Bordeaux`, 252040, 49.4],
      [`Nancy`, 104592, 15],
      [`Toulouse`, 475438, 118.3],
      [`Lille`, 232440, 34.8],
      [`Strasbourg`, 279284, 78.3],
    ]; //[Ville, population, superfice en ha, année du recensement]
    let locations = [
      [`un vélo`, 1.5, 2, 8],
      [`un canoé`, 10, 2, 4],
      [`des rollers`, 7, 2, 5],
      [`un char à voile`, 12, 2, 4],
    ];
    let cours = [
      [`de piano`, 20],
      [`de maths`, 25],
      [`de yoga`, 5],
      [`de dessin`, 12],
      [`de voile`, 15],
    ];
    let fruits = [
      [`pêches`, 4, 10, 30],
      [`Noix`, 5.4, 4, 13],
      [`cerises`, 5.6, 11, 20],
      [`pommes`, 2.2, 20, 40],
      [`framboises`, 15, 1, 5],
      [`fraises`, 7.5, 5, 10],
      [`citrons`, 1.5, 15, 30],
      [`bananes`, 1.5, 15, 25],
    ];
    let appareils = [
      [`radiateur`, 2000, 20],
      [`téléviseur`, 350, 12],
      [`four électrique`, 2500, 4],
      [`ordinateur`, 450, 8],
    ]; // [appareil,puissance,durée maxi de fonctionnement]
    let liquides = [
      [`de lait entier`, 1.032],
      [`d'essence`, 0.755],
      [`de diesel`, 0.83],
      [`d'huile`, 0.91],
      [`de bière`, 0.9],
      [`de sable`, 1.6],
    ]; // [nom,densité]
    let rivieres = [
      [`Marne`, `Gournay-sur-Marne`, 110, 550, `avril 1983`, `la `, `de la `],
      [`Seine`, `Alfortville`, 218, 2100, `janvier 1982`, `la `, `de la `],
      [`Oise`, `Pont-Sainte-Maxence`, 109, 665, `février 1995`, `l'`, `de l'`],
      [`Loire`, `Saint-Nazaire`, 931, 5350, `décembre 1999`, `la `, `de la`],
      [`Rhin`, `Strasbourg`, 951, 3310, `juin 2016`, `le `, `du `],
      [`Rhône`, `Beaucaire`, 1690, 11500, `décembre 2003`, `le `, `du `],
      [`Meuse`, `Chooz`, 144, 1610, `janvier 1995`, `la `, `de la `],
    ];
    // [Nom de rivière,Lieu de passage,débit moyen annuel, débitmax, date de la crue, article défini, article partitif]
    let vitesses = [
      [`sur un vélo`, 4, 12, 8],
      [`dans un train`, 50, 100, 5],
      [`dans une voiture`, 15, 30, 5],
      [`en avion`, 150, 250, 12],
      [`à pied`, 2, 4, 5],
    ]; // [moyen de transport, vitesse min,vitesse max en m/s,durée max en h]
    for (
      let i = 0,
      j,
      index,
      index1,
      index2,
      duree,
      quidam,
      nbheures,
      nbminutes,
      nbsecondes,
      vitesse_moy,
      distance,
      masse,
      masse2,
      masse3,
      prix1,
      prix2,
      prix3,
      texte,
      texte_corr,
      cpt = 0;
      i < this.nb_questions && cpt < 50;

    ) {
      switch (parseInt(liste_index[i])) {
        case 1: // problème de consommation éléctrique
          index = randint(0, 3);
          let appareil = appareils[index][0];
          let puissance = appareils[index][1];
          let duree_max = appareils[index][2];
          let nbquartsdheures = randint(0, 3);
          nbheures = randint(duree_max / 4, duree_max, [1]);
          duree = nbheures + nbquartsdheures * 0.25;
          let prixkwh = calcul(randint(0, 5) / 100 + 0.14);
          texte = `L'étiquette apposée au dos d'un ${appareil} indique une puissance de ${puissance} Watts. On le fait fonctionner pendant ${Math.floor(
            duree
          )} heures `;
          if (nbquartsdheures != 0)
            texte += `et ${nbquartsdheures * 15} minutes`;
          texte += `.<br>Le prix d'un kWh est de ${tex_nombrec(
            prixkwh
          )} €.<br>`;
          if (sortie_html) {
            // les boutons d'aide uniquement pour la version html
          }
          texte +=
            num_alpha(0) +
            ` Exprimer en kWh l' ` +
            katex_Popup2(
              numero_de_l_exercice + i + 1,
              type_aide,
              "énergie",
              `Définition : énergie (grandeur physique)`,
              `C’est le produit de la puissance électrique (Watt) par le temps (s) et se mesure en Joule (J).<br>1 J=1 W × 1 s.<br>Cependant pour mesurer des énergies plus importantes on utilise plutôt le kiloWattheure (kWh).<br>1 kWh=1000 W × 1 h.`
            ) +
            ` consommée.<br>`;
          texte += num_alpha(1) + ` Calculer la dépense correspondante.`;
          texte_corr =
            num_alpha(0) +
            ` Un ${appareil} d'une puissance de ${puissance} Watts qui fonctionne pendant ${Math.floor(
              duree
            )} heures `;
          if (nbquartsdheures != 0)
            texte_corr += `et ${nbquartsdheures * 15} minutes`;
          texte_corr += ` consomme : <br>`;
          if (nbquartsdheures != 0)
            texte_corr += `$${nbheures}\\text{ h } ${nbquartsdheures * 15
              } = ${nbheures}\\text{ h} + ${tex_fraction_reduite(
                nbquartsdheures,
                4
              )}\\text{ h} =${tex_nombre(
                nbheures + nbquartsdheures * 0.25
              )}\\text{ h}$<br>`;
          texte_corr += `$${puissance}\\text{ W}\\times${tex_nombre(
            duree
          )}\\text{ h}=${tex_nombre(
            puissance / 1000
          )}\\text{ kW}\\times${tex_nombre(duree)}\\text{ h}=${tex_nombre(
            calcul(puissance * duree * 0.001)
          )}\\text{ kWh}.$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le prix de cette énergie consommée est : $${tex_nombre(
              prixkwh
            )}$ €$\\text{ /kWh} \\times${tex_nombre(
              calcul(puissance * duree * 0.001)
            )}\\text{ kWh}`;
          if (
            !(
              (prixkwh * puissance * duree) / 10 ==
              Math.round((prixkwh * puissance * duree) / 10)
            )
          )
            texte_corr += `\\approx${arrondi_virgule(
              ((prixkwh * puissance) / 1000) * duree,
              2
            )}$ €`;
          else
            texte_corr += `=${arrondi_virgule(
              ((prixkwh * puissance) / 1000) * duree,
              2
            )}$ €`;
          break;
        case 2: // problèmes de volumes
          index1 = liste2[flag2];
          flag2++;
          switch (index1) {
            case 0: // Volume d'une piscine
              let h1 = 180 + randint(0, 10) * 10;
              let h2 = 80 + randint(0, 4) * 10;
              let l = 5 + randint(0, 5);
              let L = l * 2 + randint(0, 4) * 2;
              let deltat = randint(2, 5);
              texte = `Une piscine a la forme d'un prisme droit. La profondeur à son extrémité nord est de ${h1} cm et la profondeur à son extrémité sud est de ${h2} cm.<br>`;
              texte += `D\'une extrémité à l\'autre la pente au fond de la piscine est régulière.<br>La largeur de la piscine (Est-Ouest) est de ${l} m et sa longueur (Nord-Sud) est de ${L} m.<br>`;
              texte +=
                num_alpha(0) +
                ` Calculer le ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "volume",
                  `Définition : volume (grandeur physique)`,
                  `C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube (m${exposant(
                    3
                  )}) mais on peut aussi rencontrer le litre (L) avec comme correspondance 1dm${exposant(
                    3
                  )}=1L`
                ) +
                ` d'eau en m${exposant(
                  3
                )} contenu dans cette piscine quand elle est pleine.<br>`;
              texte +=
                num_alpha(1) +
                ` Sachant que pour élever la température d'un litre d'eau de 1 degré, il faut une énergie de 1,162 Wattheure.<br> Quelle est l'énergie consommée en kWh pour augmenter de ${deltat} degrés ?<br>`;
              texte_corr =
                num_alpha(0) +
                ` La base de ce prisme droit est un trapèze rectangle de petite base ${h2} cm, de grande base ${h1} cm et de hauteur ${L} m.<br>`;
              texte_corr += `$\\mathcal{A}=\\dfrac{\\left(${h1}\\text{ cm}+${h2}\\text{ cm}\\right)}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=\\dfrac{\\left(${arrondi_virgule(
                h1 / 100
              )}\\text{ m}+${arrondi_virgule(
                h2 / 100
              )}\\text{ m}\\right)}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=\\dfrac{${arrondi_virgule(
                (h1 + h2) / 100
              )}\\text{ m}}{2}\\times${L}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                (h1 + h2) / 200
              )}\\text{ m}\\times${L}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                ((h1 + h2) / 200) * L
              )}\\text{ m}$${exposant(2)}<br>`;
              texte_corr += `Le volume de ce prisme et donc par extension le volume d'eau conteu dans la piscine est :<br>`;
              texte_corr += `$\\mathcal{A}\\times\\mathcal{h}=${arrondi_virgule(
                ((h1 + h2) / 200) * L
              )}\\text{ m}^2\\times${l}\\text{ m}$`;
              texte_corr += ` $=${arrondi_virgule(
                ((h1 + h2) / 200) * L * l
              )}$m${exposant(3)}.<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Convertissons le volume de la piscine en litres : $${arrondi_virgule(
                  ((h1 + h2) / 200) * L * l
                )}\\text{ m}^3=${tex_nombre(
                  (h1 + h2) * L * l * 5
                )}\\text{ dm}^3=${tex_nombre(
                  (h1 + h2) * L * l * 5
                )}\\text{ L}$<br>`;
              texte_corr += ` L'énergie consomée pour élever la température de l'eau de cette piscine de ${deltat} degrés est :<br>`;
              texte_corr += `$\\mathcal{E}=${tex_nombre(
                (h1 + h2) * L * l * 5
              )}\\text{ L}\\times${deltat}\\text{ °C}\\times 1,162 \\dfrac{\\text{Wh}}{\\text{°C}\\times\\text{L}}=${tex_nombre(
                arrondi((h1 + h2) * L * l * 5 * deltat * 1.162, 3)
              )}\\text{ Wh}=${tex_nombre(
                arrondi((((h1 + h2) * L * l) / 200) * deltat * 1.162, 7)
              )}\\text{ kWh}$<br>`;
              break;
            case 1: // Volume d'un tonneau cylindrique
              index2 = randint(0, 5);
              let r = randint(10, 15) * 2;
              let h = randint(0, 10) + r * 4;
              texte = `Un tonneau cylindrique a un rayon de ${r} cm et une hauteur de ${h} cm.<br>`;
              texte +=
                num_alpha(0) +
                ` Calculer le ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "volume",
                  `Définition : volume (grandeur physique)`,
                  `C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube ($\\text{m}^3$) mais on peut aussi rencontrer le litre (L) avec comme correspondance $\\text{1dm}^3=\\text{1L}$`
                ) +
                ` en dm${exposant(3)} à 0,1 près de ce tonneau.<br>`;
              texte +=
                num_alpha(1) +
                ` Si on le remplit ${liquides[index2][0]} (dont la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  "densité",
                  `Définition : densité (grandeur physique)`,
                  `La densité d'une substance est égale à la masse volumique de la substance divisée par la masse volumique du corps de référence à la même température.<br>Pour les liquides et les solides, l'eau est utilisée comme référence (sa masse volumique est de 1kg/dm$^3$), pour les gaz, la mesure s'effectue par rapport à l'air.<br>Donc pour les liquides, la densité est égale à la masse volumique exprimée en kg/dm$^3$.`
                ) +
                ` est de ${tex_nombrec(liquides[index2][1])}), quelle masse ${liquides[index2][0]
                } en kg contiendra-t-il au gramme près ?<br>`;
              texte_corr =
                num_alpha(0) +
                ` Le volume d'un cylindre est donné par la formule $\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}$.<br> Ici la base est un disque de rayon ${r} cm.<br>`;
              texte_corr += `$\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}=\\pi\\times${r}^{2}\\text{ cm}^2\\times${h}\\text{ cm}=${r * r * h
                }\\pi\\text{ cm}^3\\approx${tex_nombre(
                  arrondi(r * r * h * Math.PI, 1)
                )}\\text{ cm}^3\\approx${tex_nombre(
                  arrondi((r * r * h * Math.PI) / 1000, 1)
                )}\\text{ dm}^3$<br>`;
              texte_corr +=
                num_alpha(1) +
                ` La masse de lait contenue dans ce tonneau est :<br>`;
              texte_corr += `$${tex_nombre(
                arrondi((r * r * h * Math.PI) / 1000, 1)
              )}\\text{ dm}^3\\times ${tex_nombrec(
                liquides[index2][1]
              )} \\times 1 \\dfrac{kg}{dm}^3\\approx${tex_nombre(
                arrondi(((r * r * h * Math.PI) / 1000) * liquides[index2][1], 3)
              )}\\text{ kg}$`;
              break;
          }
          break;
        case 3: // Problème de quantité de mouvement et d'énergie cinétique
          quidam = prenomF();
          index1 = randint(0, 4);
          masse = randint(40, 70);
          vitesse_moy = randint(vitesses[index1][1], vitesses[index1][2]); // vitesse choisie pour l'exo
          texte =
            `${quidam} se déplace ${vitesses[index1][0]} à la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              type_aide,
              `vitesse`,
              `Définition : Vitesse (grandeur physique)`,
              `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
            ) +
            ` de ${tex_nombrec(vitesse_moy)} m/s.<br>`;
          texte += `Elle pèse ${masse} kg.<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer sa ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              "quantité de mouvement",
              `Définition : quantité de mouvement (grandeur physique)`,
              `C’est le produit de la masse d'un corps par sa vitesse.<br>L'unité de mesure de la quantité de mouvement est le ($\\text{kg.m.s}^{-1}$)`
            ) +
            ` en $\\text{kg.m.s}^{-1}$.<br>`;
          texte +=
            num_alpha(1) +
            ` En déduire son ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 2,
              type_aide,
              "énergie cinétique",
              `Définition : énergie cinétique (grandeur physique)`,
              `L'énergie cinétique d'un corps de masse $m$ (en kg) assimilé à un point matériel se déplaçant à la vitesse $v$ (en m/s) est donné par la formule $E=\\dfrac{1}{2}\\times m\\times v^2$.<br>L'unité de mesure de l'énergie cinétique est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`
            ) +
            ` en Joules.`;
          texte_corr =
            num_alpha(0) +
            ` La quantité de mouvement de ${quidam} est : $${masse} \\text{ kg}\\times ${vitesse_moy}\\text{ m/s}=${tex_nombrec(
              masse * vitesse_moy
            )}\\text{ kg.m.s}^{-1}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` L'énergie cinétique de ${quidam} est : $\\dfrac{1}{2}\\times ${masse} \\text{ kg}\\times (${vitesse_moy}\\text{ m/s})^2=\\dfrac{${masse}\\times${vitesse_moy}^2}{2}\\text{ J}=${tex_nombrec(
              (masse * vitesse_moy ** 2) / 2
            )}\\text{ J}$`;
          break;
        case 4: // problème de moment et de couple de forces qui s'annulent.
          quidam = prenom();
          index = randint(60, 90); //masse du père (recyclage de variable)
          masse = randint(20, 30); //masse de l'enfant
          distance = arrondi(randint(25, 35) / 10);
          texte =
            `${quidam} qui pèse ${masse} kg se trouve sur le siège d'une balançoire "` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              2,
              `trébuchet`,
              `Schéma explicatif`,
              `images/trebuchet.png`
            ) +
            `" dans un jardin d'enfant. Le siège est situé à ${tex_nombre(
              distance
            )} m du pivot central de la balançoire (bras de levier).<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer le ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `moment`,
              `Définition : momnent (grandeur physique)`,
              `Le moment d'une force d'intensité F(en Newton ou kg.m.s$^{-2}$) en un point M par rapport à un pivot P est le produit de F par la distance PM (appelée bras de levier) exprimée en mètres (lorsque cette force s'exerce perpendiculairement au bras de levier). Le moment est l'energie permettant de faire tourner l'objet autour du pivot.<br>L'unité de mesure du moment est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`
            ) +
            ` du ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 2,
              type_aide,
              `poids`,
              `Définition : Poids`,
              `Le poids est le produit de la masse d'un objet par l'accélération de la pesanteur terrestre ($9,81\\text{ m.s}^{-2}$).<br>L'unité du poids est le Newton (N) : 1N=1kg.m.s$^{-2}$`
            ) +
            ` de ${quidam} sur son siège par rapport au pivot central du trébuchet en Joules (on admettra que le bras de levier est horizontal).<br>`;
          texte +=
            num_alpha(1) +
            ` Le père de ${quidam} vient s'installer de l'autre côté du pivot central. Il pèse ${index} kg et s'installe de façon à ce que son poids permette d'équilibrer la balançoire à l'horizontale. Quelle doit être la longueur du bras de levier de son côté ( à quelle distance du pivot est-il assis ) ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` Le moment du poids de ${quidam} appliqué sur son siège par rapport au pivot central du trébuchet est :<br>`;
          index1 = arrondi(masse * 9.81 * distance); //pour éviter d'avoir trop de variable, je recycle
          texte_corr += `$${masse}\\text{ kg} \\times 9,81 \\text{m.s}^{-2} \\times ${tex_nombre(
            distance
          )} \\text{ m} = ${tex_nombre(
            index1
          )}\\text{ kg.m}^2\\text{.s}^{-2}=${tex_nombre(
            index1
          )}\\text{ J}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Afin d'équilibrer le trébuchet, le père de ${quidam} doit se placer de façon que le moment de son poids sur son point d'assise par rapport au pivot central du trébuchet soit égal à celui de ${quidam}, on obtient l'équation suivante où $${mise_en_evidence(
              `d`,
              `black`
            )}$ représente sa distance par rapport au pivot central :<br>`;
          texte_corr += `$ ${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2} \\times ${mise_en_evidence(
            `d`,
            `black`
          )} \\text{ m}=${tex_nombre(index1)}\\text{ J}$<br>`;
          texte_corr += `D'où $${mise_en_evidence(
            `d`,
            `black`
          )}\\text{ m} = \\dfrac{${tex_nombre(
            index1
          )}\\text{ J}}{${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2}}\\approx${tex_nombrec(
            arrondi(index1 / (9.81 * index))
          )}\\text{ m}.$`;
          break;
        case 5: //problème de trafic de coyageurs.
          let d1 = randint(3, 6);
          let d2 = randint(3, 6, [d1]);
          let k = randint(5, 8);
          let n1 = k * d2;
          let n2 = k * d1;
          texte =
            num_alpha(0) +
            ` Un bus de ville transporte en moyenne ${n1} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d1} km.<br> Calculer le ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3,
              type_aide,
              `trafic`,
              `Définition : Trafic de voyageurs`,
              `Le trafic de voyageurs est le produit du nombre de voyageurs par la distance parcourue. L'unité est le voyageur.km qui correspond au déplacement d'un voyageur sur 1km`
            ) +
            ` moyen de voyageurs en voyageurs.km.<br> `;
          texte +=
            num_alpha(1) +
            ` Un autre bus de ville transporte en moyenne ${n2} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d2} km.<br> Montrer que le trafic de voyageur est le même qu'à la question ` +
            num_alpha(0);
          texte_corr =
            num_alpha(0) +
            ` Le trafic moyen de ce bus de ville est : $${n1}\\text{voyageurs}\\times${d1}\\text{km}=${n1 * d1
            }\\text{voyageurs.km}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le trafic moyen de ce bus de ville est : $${n2}\\text{voyageurs}\\times${d2}\\text{km}=${n2 * d2
            }\\text{voyageurs.km}$, donc ces deux bus ont le même trafic.`;
          break;
        case 6: //problème de puissance électrique.
          index = randint(0, 3);
          index1 = randint(0, 3, [index]);
          let I1 = arrondi(appareils[index][1] / 230, 0) + 1;
          texte =
            num_alpha(0) +
            ` Un ${appareils[index][0]} est protégé par un fusible de ${I1} ampères, quelle est la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `puissance`,
              `Définition : Puissance (grandeur physique)`,
              `C’est le produit de la force électromotrice (tension) exprimée en Volt (V) par l'intensité du courant électrique exprimée en ampères (A).<br>L'unité de mesure de la puissance est le Watt (W)`
            ) +
            ` maximale de cet appareil si il fonctionne sur le secteur ?<br>`;
          texte +=
            num_alpha(1) +
            ` Un ${appareils[index1][0]} fonctionne à une puissance maximum de ${appareils[index1][1]} W.<br>Quel est l'ampérage minimum nécessaire pour le fusible qui protégera ce ${appareils[index][0]} des court-ciruits ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` La tension du secteur étant de 230V, la puissance maximale de ce ${appareils[index][0]} est de :<br>`;
          texte_corr += `$230\\text{ V}\\times${I1}\\text{ A}=${230 * I1
            }\\text{ W}$<br>`;
          let I2 = Math.floor(appareils[index1][1] / 230) + 1;
          texte_corr +=
            num_alpha(1) +
            ` Pour fonctionner à la puissance maximum, cet appareil a besoin d'un courant d'une intensité de :<br>`;
          texte_corr += `$\\dfrac{${appareils[index1][1]
            }\\text{ W}}{230 \\text{ V}} \\approx ${tex_nombrec(
              arrondi(appareils[index1][1] / 230)
            )}\\text{ A}$.<br>`;
          texte_corr += `Le fusible nécessaire pour protéger cet appareil des courts-circuits devra avoir une intensité de rupture minimum de ${I2} ampères.`;
          break;
        case 7: // problème de vitesses
          index2 = liste7[flag7];
          flag7++;
          quidam = prenom(); //prenom choisi
          switch (index2) {
            case 0: // problème de déplacements
              index1 = randint(0, 4);
              vitesse_moy = randint(vitesses[index1][1], vitesses[index1][2]); // vitesse choisie pour l'exo
              distance = Math.round(
                (vitesse_moy * 3.6 * vitesses[index1][3] * randint(5, 20)) / 10
              ); //distance choisie pour question b
              duree = randint(2, vitesses[index1][3]);
              texte =
                `${quidam} se déplace ${vitesses[index1][0]} à la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` de ${tex_nombrec(vitesse_moy)} m/s.<br>`;
              texte +=
                num_alpha(0) +
                ` En se déplaçant à cette vitesse pendant ${duree} h, quelle est la distance parcourue par ${quidam} en km ?<br>`;
              texte +=
                num_alpha(1) +
                ` Si ${quidam} veut parcourir ${nombre_avec_espace(
                  distance
                )} km à cette vitesse, combien de temps durera le trajet ? Donner le résultat en heures, minutes et secondes.`;
              texte_corr =
                num_alpha(0) +
                ` La distance parcourue par ${quidam} ${vitesses[index1][0]
                } en ${duree} h à la vitesse de ${tex_nombrec(
                  vitesse_moy
                )} m/s est :<br>`;
              texte_corr += `$${tex_nombrec(
                vitesse_moy
              )}\\text{ m/s}\\times${duree}\\text{ h}=\\dfrac{${tex_nombrec(
                vitesse_moy
              )}\\text{ m}}{1 \\text{ s}}\\times ${duree}\\times ${tex_nombre(
                3600
              )}\\text{ s}`;
              texte_corr += `=${tex_nombrec(
                vitesse_moy * 3600 * duree
              )}\\text{ m}=${tex_nombrec(
                vitesse_moy * 3.6 * duree
              )}\\text{ km}$<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Pour parcourir ${nombre_avec_espace(
                  distance
                )} km à cette vitesse, ${quidam} mettra :<br>`;
              texte_corr += ` Partons de la formule $\\mathcal{V}=\\dfrac{\\mathcal{d}}{\\mathcal{t}}$ et remplaçons : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombre(
                distance
              )}\\text{ km}}{\\mathcal{t}\\text{ h}}$<br>`;
              texte_corr += `Rendons les unités homogènes : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombrec(
                distance * 1000
              )}\\text{ m}}{\\mathcal{t}\\text{ h}\\times ${tex_nombre(
                3600
              )}\\text{ s/h}}$<br>`;
              texte_corr += `Appliquons l'égalité des produits en croix : ${produits_en_croix(
                [
                  [`${vitesse_moy}\\text{ m}`, `1 \\text{ s}`],
                  [
                    `${tex_nombrec(distance * 1000)}\\text{ m}`,
                    `\\mathcal{t}\\times ${tex_nombre(3600)}\\text{ s/h}`,
                  ],
                ]
              )}<br>`;
              texte_corr += `D'où : $\\mathcal{t}=\\dfrac{1 \\text{ s}\\times${tex_nombrec(
                distance * 1000
              )}\\text{ m}}{${vitesse_moy}\\text{ m}\\times${tex_nombre(
                3600
              )}\\text{ s}}$ (t est le nombre décimal d'heures : les mètres et les secondes disparaissent car elles sont présentes au numérateur et au dénominateur.)<br>`;
              texte_corr += `Soit : $\\mathcal{t}\\approx${tex_nombrec(
                (distance * 1000) / vitesse_moy / 3600
              )}\\text{ h}\\approx${tex_nombrec(
                arrondi((distance * 1000) / vitesse_moy, 0)
              )}\\text{ s}\\approx`;
              nbheures = Math.floor((distance * 1000) / vitesse_moy / 3600); //conversion en h min s
              nbminutes = Math.floor(
                (Math.floor((distance * 1000) / vitesse_moy) % 3600) / 60
              );
              nbsecondes = arrondi(
                (distance * 1000) / vitesse_moy -
                3600 * nbheures -
                60 * nbminutes,
                0
              );
              texte_corr += `(${tex_nombre(nbheures)}\\times ${tex_nombre(
                3600
              )}+${tex_nombre(nbminutes)}\\times 60+${tex_nombre(
                nbsecondes
              )})\\text{ s}\\approx`;
              if (nbheures != 0)
                texte_corr += `${tex_nombre(nbheures)}\\text{ h }`; //affichage de la réponse
              if (nbminutes != 0)
                texte_corr += `${tex_nombre(nbminutes)}\\text{ min }`;
              texte_corr += `${tex_nombre(nbsecondes)}\\text{ s}$`;
              break;
            case 1: // l'orage et la vitesse du son
              duree = randint(2, 15); //durée pour question a)
              distance = randint(5, 15, [duree]) * 340; //distance de l'orage en m pour question b
              texte =
                `Le son se déplace dans l'air à la ` +
                katex_Popup2(
                  numero_de_l_exercice + i * 3,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` de 340 m/s.<br>`;
              texte +=
                num_alpha(0) +
                ` ${quidam} voit un éclair dans le ciel et compte dans sa tête ${duree} secondes avant d'entendre le tonnerre.<br>`;
              texte += `Quelle est la distance à laquelle l'éclair est tombé ?<br>`;
              texte +=
                num_alpha(1) +
                ` L'éclair suivant tombe sur le paratonnerre situé sur le clocher de l'église du village voisin.<br>`;
              texte += `${quidam} sait que le clocher est situé à ${distance} m de sa position. Combien de temps se passe-t-il avant que ${quidam} n'entende le tonnerre ?`;
              texte_corr =
                num_alpha(0) +
                ` Calculons la distance à laquelle le premier éclair est tombé en utilisant la vitesse du son (on considère que la vitesse de la lumière est telle que l'éclair est visible instantanément) :<br>`;
              texte_corr += `$340\\text{ m/s}=\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${mise_en_evidence(
                duree
              )}\\times 340\\text{ m}}{${mise_en_evidence(
                duree
              )}\\times 1\\text{ s}}=\\dfrac{${tex_nombrec(
                duree * 340
              )}}{${duree}\\text{ s}}$<br>`;
              texte_corr += `La distance à laquelle l'éclair est tombé est donc de ${nombre_avec_espace(
                duree * 340
              )} m.<br>`;
              texte_corr +=
                num_alpha(1) +
                ` Avec les données de l'énoncé nous pouvons écrire :<br>`;
              texte_corr += `$\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${tex_nombre(
                distance
              )}\\text{ m}}{\\mathcal{T}\\text{ s}}$<br>`;
              texte_corr += `Soit grâce à l'égalité des produits en croix : $\\mathcal{T}\\text{ s}=${quatrieme_proportionnelle(
                `340 \\text{ m}`,
                `1 \\text{ s}`,
                distance + `\\text{ m}`,
                0
              )}=${tex_nombrec(arrondi(distance / 340))}\\text{ s}$<br>`;
              texte_corr += `${quidam} entendra le tonnerre ${tex_nombrec(
                arrondi(distance / 340)
              )} secondes après avoir vu l'éclair tomber sur le clocher.`;
              break;
            case 2: // Le coureur
              vitesse_moy = randint(vitesses[4][1] * 5, vitesses[4][2] * 5) / 5;
              distance = randint(5, 12);
              texte =
                `${quidam} vient de courir ${distance} kilomètres. Sa montre connectée a enregistré l'` +
                katex_Popup2(
                  numero_de_l_exercice + i,
                  type_aide,
                  `allure`,
                  `Définition : allure (grandeur physique)`,
                  `L'allure est le temps exprimé en h,min,s pour parcourir un kilomètre.<br>L'unité est alors h/km ou min/km`
                ) +
                `pour chaque kilomètre parcouru :`;
              let allures = [];
              for (let j = 0; j < distance; j++) {
                duree = Math.round(
                  1000 / (vitesse_moy * (1 + randint(-10, 10) * 0.01))
                );
                nbsecondes = duree % 60;
                nbminutes = (duree - nbsecondes) / 60;
                allures.push([nbminutes, nbsecondes]);
              }
              texte += "$\\def\\arraystretch{1.5}\\begin{array}{|c"; // On construit le tableau des allures
              texte += "|c";
              for (let j = 0; j < allures.length; j++) texte += "|c";
              texte += "}\\hline  \\text{kilomètre}";
              for (let j = 0; j < allures.length; j++)
                texte += "&" + tex_nombre(j + 1);
              texte +=
                "\\\\\\hline \\text{allure en minutes et secondes (par km)}";
              for (j = 0; j < allures.length; j++)
                texte +=
                  "&" +
                  allures[j][0] +
                  `\\text{ min }` +
                  allures[j][1] +
                  `\\text{ s}`;
              texte += "\\\\\\hline\\end{array}$<br>";
              texte +=
                num_alpha(0) +
                ` Calculer la durée totale de la course de ${quidam}.<br>`;
              texte +=
                num_alpha(1) +
                ` En déduire sa	` +
                katex_Popup2(
                  numero_de_l_exercice + i,
                  type_aide,
                  `vitesse`,
                  `Définition : Vitesse (grandeur physique)`,
                  `La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`
                ) +
                ` moyenne en km/h sur le trajet total.<br>`;
              texte +=
                num_alpha(2) +
                ` ${quidam} s'entraîne pour un semi-marathon (21,0975 km). En courant à la même vitesse, combien de temps durerait son semi-marathon ?`;
              texte_corr =
                num_alpha(0) +
                ` La durée totale de la course de ${quidam} est :<br>`;
              allures.push([0, 0]);
              duree = 0;

              for (let j = 0; j < distance; j++) {
                allures[distance][1] += allures[j][1];
                if (allures[distance][1] > 59) {
                  allures[distance][0] += 1;
                  allures[distance][1] = allures[distance][1] % 60;
                }
                allures[distance][0] += allures[j][0];
                if (allures[distance][0] > 59) {
                  duree++;
                  allures[distance][0] = allures[distance][0] % 60;
                }
              }
              for (let j = 0; j < distance - 1; j++) {
                texte_corr += `${allures[j][0]} min ${allures[j][1]} s + `;
              }
              texte_corr += `${allures[distance - 1][0]} min ${allures[distance - 1][1]
                } s = `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += `${allures[distance][0]} min `;
              if (allures[distance][1] != 0)
                texte_corr += `${allures[distance][1]} s.`;
              texte_corr +=
                `<br>` +
                num_alpha(1) +
                ` ${quidam} a effectué ${distance} km en `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += `${allures[distance][0]} min `;
              if (allures[distance][1] != 0)
                texte_corr += `${allures[distance][1]} s<br>Soit `;
              if (duree != 0) texte_corr += `${duree} h `;
              if (allures[distance][0] != 0)
                texte_corr += ` $\\dfrac{${allures[distance][0]}}{60}$ h `;
              if (allures[distance][1] != 0)
                texte_corr += ` $\\dfrac{${allures[distance][1]}}{${tex_nombre(
                  3600
                )}}$ h = `;
              texte_corr += `$\\dfrac{`;
              if (duree != 0)
                texte_corr += `${duree}\\times ${tex_nombre(3600)} + `;
              texte_corr += `${allures[distance][0]}\\times 60+${allures[distance][1]
                }}{${tex_nombre(3600)}}$ h = `;
              texte_corr += `$\\dfrac{`;
              if (duree != 0) {
                duree =
                  duree * 3600 +
                  allures[distance][0] * 60 +
                  allures[distance][1];
                texte_corr += `${duree}}`;
              } else {
                duree = allures[distance][0] * 60 + allures[distance][1];
                texte_corr += `${duree}}`;
              }
              texte_corr += `{${tex_nombre(3600)}}$ h.<br>`;
              texte_corr += `Sa vitesse en km/h est par conséquent :<br>$${distance} \\text{ km}\\div\\dfrac{${duree}}{${tex_nombre(
                3600
              )}}\\text{ h}=`;
              texte_corr += `${distance} \\text{ km}\\times\\dfrac{${tex_nombre(
                3600
              )}}{${duree}}\\text{ h}^{-1}=\\dfrac{${distance}\\times${tex_nombre(
                3600
              )}}{${duree}}\\text{km.h}^{-1}`;
              vitesse_moy = arrondi((distance * 3600) / duree);
              texte_corr += `\\approx${tex_nombrec(vitesse_moy)}$ km/h<br>`;
              texte_corr +=
                num_alpha(2) +
                ` Si elle court 21,0975 km à cette vitesse de ${tex_nombre(
                  vitesse_moy
                )} km/h, ${quidam} mettra :<br>`;
              duree = arrondi(21.0975 / vitesse_moy, 4);
              texte_corr += `$\\dfrac{${tex_nombre(
                21.0975
              )} \\text{ km}}{${tex_nombre(
                vitesse_moy
              )} \\text{ km.h}^{-1}}\\approx${tex_nombre(duree)}$ h soit `;
              nbheures = Math.floor(duree);
              duree = (duree - nbheures) * 60;
              nbminutes = Math.floor(duree);
              duree = Math.round((duree - nbminutes) * 60);
              texte_corr += ` environ ${nbheures} h ${nbminutes} min ${duree} s.`;
              break;
          }
          break;
        case 8: //problème de prix massique
          index1 = randint(0, 7);
          index2 = randint(0, 5, [index1]);
          index = randint(0, 5, [index1, index2]);
          masse = arrondi(randint(fruits[index1][2], fruits[index1][3]) / 10);
          masse2 = arrondi(randint(fruits[index2][2], fruits[index2][3]) / 10);
          masse3 = arrondi(randint(fruits[index][2], fruits[index][3]) / 10);
          prix1 = arrondi(masse * fruits[index1][1]);
          prix2 = arrondi(masse2 * fruits[index2][1]);
          prix3 = arrondi(masse3 * fruits[index][1]);
          quidam = prenomF();
          texte = `${quidam} se rends à l'épicerie de son quartier. Elle y achète ${tex_nombre(
            masse
          )} kg de ${fruits[index1][0]} à ${tex_prix(
            fruits[index1][1]
          )} €/kg et pour ${tex_prix(prix2)} € de ${fruits[index2][0]
            } à ${tex_prix(fruits[index2][1])} €/kg.<br>`;
          texte += `Enfin, elle achète ${tex_nombre(masse3)} kg de ${fruits[index][0]
            } pour ${tex_prix(prix3)} €.<br>`;
          texte +=
            num_alpha(0) +
            ` Combien lui coûtent les ${fruits[index1][0]} ?<br>`;
          texte +=
            num_alpha(1) +
            ` Quelle masse de ${fruits[index2][0]} a-t-elle achetée ?<br>`;
          texte +=
            num_alpha(2) +
            ` Quel est le prix au kilogramme des ${fruits[index][0]} ?`;
          texte_corr =
            num_alpha(0) +
            ` ${quidam} dépense pour les ${fruits[index1][0]} : $${tex_nombre(
              masse
            )}\\text{ kg} \\times ${tex_prix(
              fruits[index1][1]
            )}$ €$\\text{/kg} = ${tex_prix(prix1)}$ €.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` La masse de ${fruits[index2][0]
            } qu'elle a achetée est : $${tex_prix(prix2)} $ €$ \\div ${tex_prix(
              fruits[index2][1]
            )}$ €$\\text{/kg} = ${tex_nombre(masse2)}\\text{ kg}$.<br>`;
          texte_corr +=
            num_alpha(2) +
            ` Enfin, ${quidam} a acheté des ${fruits[index][0]
            } au prix unitaire de : $${tex_prix(prix3)}$ € $\\div ${tex_nombre(
              masse3
            )}\\text{ kg} = ${tex_prix(fruits[index][1])}$ €$\\text{/kg}$.`;
          break;
        case 9: //problème de prix horaire
          index1 = randint(0, 3);
          index2 = randint(0, 4);
          nbheures = randint(locations[index1][1], locations[index1][2]);
          prix1 = locations[index1][1];
          prix2 = cours[index2][1] * randint(2, 6);
          quidam = prenomF();
          texte = `${quidam} a prévu de louer ${locations[index1][0]
            } pendant ${tex_nombre(
              nbheures
            )} heures. L'heure de location coûte ${tex_prix(prix1)} €.<br>`;
          texte += num_alpha(0) + ` Combien cette location va lui coûter ?<br>`;
          texte +=
            num_alpha(1) +
            ` ${quidam} a pris des leçons particulières ${cours[index2][0]
            }. En tout ce mois-ci elle a eu ${tex_nombrec(
              prix2 / cours[index2][1]
            )} heures de cours pour ${tex_prix(
              prix2
            )} €. Combien demande son professeur pour une heure de cours ?<br>`;
          texte_corr =
            num_alpha(0) +
            ` ${quidam} va dépenser pour sa location : $${tex_nombre(
              nbheures
            )}\\text{ h} \\times ${tex_prix(prix1)}$ €$\\text{/h} = ${tex_prix(
              nbheures * prix1
            )}$ €.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` L'heure de cours ${cours[index2][0]} coûte : $${tex_prix(
              prix2
            )}$ € $ \\div ${tex_nombre(
              prix2 / cours[index2][1]
            )}\\text{ h} = ${tex_prix(cours[index2][1])}$ €$\\text{/h}$.<br>`;
          break;
        case 10: //problème de densité de population
          index1 = randint(0, 14);
          index2 = randint(0, 14, [index1]);
          texte =
            num_alpha(0) +
            ` En 2016, à ${villes[index1][0]} il y avait $${tex_nombre(
              villes[index1][1]
            )}$ habitants pour une superficie de $${tex_nombrec(
              villes[index1][2] * 100
            )}$ ha.<br> Calculer la densité de population en hab/km$^2$.<br>`;
          texte +=
            num_alpha(1) +
            ` La même année, la ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `densité de population`,
              `Définition : Densité de population`,
              `C’est le quotient du nombre d'habitants par la superficie en km$^2$.<br>L'unité de la densité de population est l'habitant par km$^2$ (hab/km$^2$).`
            ) +
            ` de ${villes[index2][0]} était de $${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}$ hab/km$^2$ pour une superficie de $${tex_nombrec(
              villes[index2][2] * 100
            )}$ ha.<br> Calculer le nombre d'habitants de ${villes[index2][0]
            } à cette date.<br>`;
          texte_corr =
            num_alpha(0) +
            ` En 2016, la densité de population à ${villes[index1][0]
            } était de :<br> $\\dfrac{${tex_nombre(
              villes[index1][1]
            )}\\text{ hab}}{${tex_nombrec(
              villes[index1][2] * 100
            )}\\text{ ha}}=\\dfrac{${tex_nombre(
              villes[index1][1]
            )}\\text{ hab}}{${tex_nombre(
              villes[index1][2]
            )}\\text{ km}^2}=${tex_nombrec(
              villes[index1][1] / villes[index1][2]
            )}\\text{ hab/km}^{2}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` A cette date, le nombre d'habitants de ${villes[index2][0]
            } était de :<br> $${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}\\text{ hab/km}^2\\times ${tex_nombrec(
              villes[index2][2] * 100
            )}\\text{ ha}=${tex_nombrec(
              villes[index2][1] / villes[index2][2]
            )}\\text{ hab/km}^2\\times ${tex_nombrec(
              villes[index2][2]
            )}\\text{ km}^{2}=${tex_nombre(villes[index2][1])}\\text{ hab}$.`;
          break;
        case 11: //problème de masse volumique
          index1 = randint(0, 14);
          index2 = randint(0, 14, [index1]);
          let V1 = randint(50, 100);
          masse2 = randint(5, 30);
          masse = arrondi((materiaux[index1][1] * V1) / 1000000);
          let V2 = arrondi(masse2 / materiaux[index2][1], 7);
          texte =
            num_alpha(0) +
            ` La ` +
            katex_Popup2(
              numero_de_l_exercice + i * 3 + 1,
              type_aide,
              `masse volumique`,
              `Définition : Masse volumique (grandeur physique)`,
              `La masse volumique d'un élément est le quotient de la masse de cet élément par le volume qu'il occupe.<br>L'unité de la masse volumique dépend de la nature de l'élément et peut s'exprimer kg/m$^3$ pour les solides g/L pour les gaz par exemple.`
            ) +
            ` du ${materiaux[index1][0]} est de $${tex_nombre(
              materiaux[index1][1]
            )}\\text{ kg/m}^3$.<br>`;
          texte += `Quelle est la masse d'une pièce de ce métal de $${tex_nombre(
            V1
          )}\\text{ cm}^3$ ?<br>`;
          texte +=
            num_alpha(1) +
            ` Quel est le volume d'une pièce de ${materiaux[index2][0]} ayant une masse de `;
          texte += `$${tex_nombre(masse2)}\\text{ kg}$ (la masse volumique du ${materiaux[index2][0]
            } est de $${tex_nombre(materiaux[index2][1])}\\text{ kg/m}^3$)<br>`;
          texte_corr =
            num_alpha(0) +
            ` La masse de cette pièce de ${materiaux[index1][0]
            } est de :<br>$${tex_nombre(
              materiaux[index1][1]
            )}\\text{ km/m}^3\\times ${tex_nombre(
              V1
            )}\\text{ cm}^3=${tex_nombre(
              materiaux[index1][1]
            )}\\text{ km/m}^3\\times ${tex_nombrec(
              V1 / 1000000
            )}\\text{ m}^3=${tex_nombre(masse)}\\text{ kg}$.<br>`;
          texte_corr +=
            num_alpha(1) +
            ` Le volume de cette pièce de ${materiaux[index2][0]
            } est de :<br>$${tex_nombre(masse2)}\\text{ kg}\\div ${tex_nombre(
              materiaux[index2][1]
            )}\\text{ kg/m}^3\\approx${tex_nombre(
              V2
            )}\\text{ m}^3\\approx${tex_nombrec(
              V2 * 1000000
            )}\\text{ cm}^3$<br>`;
          break;
        case 12: //problème de concentration massique
          index1 = randint(0, 4);
          index2 = randint(0, 4, [index1]);
          let Volume1 = arrondi(randint(2, 15, [10]) / 10);
          let Volume2 = arrondi(randint(2, 15, [10]) / 10);
          if (solutes[index1][2] < 10)
            masse = arrondi(
              (randint(11, solutes[index1][2] * 10) * Volume1) / 10
            );
          else masse = arrondi(randint(2, solutes[index1][2]) * Volume1);
          let concentration2;
          if (solutes[index2][2] < 10)
            concentration2 = arrondi(randint(11, solutes[index2][2] * 10) / 10);
          //concentration en g/L soluté 2.
          else concentration2 = randint(2, solutes[index2][2]);

          texte =
            num_alpha(0) +
            ` On a dissout $${tex_nombre(masse)}\\text{ g}$ de ${solutes[index1][0]
            } dans $${tex_nombre(Volume1)}\\text{ litres}$ ${solutes[index1][1]
            }.<br>Calculer la concentration massique de cette solution.<br>`;
          texte +=
            num_alpha(1) +
            ` On dispose de $${tex_nombre(
              Volume2
            )}$ litres de solution aqueuse de ${solutes[index2][0]
            } à $${tex_nombre(
              concentration2
            )}\\text{ g/L}$.<br>Quelle masse de ${solutes[index2][0]
            } a été dissoute dans l'eau ?`;
          texte_corr =
            num_alpha(0) +
            ` La concentration en ${solutes[index1][0]} de cette solution aqueuse est de :<br>`;
          texte_corr += ` $\\dfrac{${tex_nombre(masse)}\\text{ g}}{${tex_nombre(
            Volume1
          )}\\text{ litres}}=${tex_nombrec(
            arrondi(masse / Volume1)
          )}\\text{ g/L}$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` La masse de ${solutes[index2][0]} dissoute est de :<br>`;
          texte_corr += `$${tex_nombre(Volume2)}\\text{ L}\\times ${tex_nombre(
            concentration2
          )}\\text{ g/L}=${tex_nombre(
            arrondi(Volume2 * concentration2)
          )}\\text{ g}$`;
          break;

        case 13: //problème de débit
          index2 = randint(0, 6);
          duree = randint(2, 24);
          let vmax = rivieres[index2][3] * 3600;
          texte =
            `Le ` +
            katex_Popup2(
              numero_de_l_exercice + i,
              type_aide,
              `débit`,
              `Définition : Débit (grandeur physique)`,
              `Le débit est le quotient d'un volume d'eau écoulée dans une section de conduit par le temps d'écoulement.<br>L'unité officielle est le mètre cube par seconde ($\\text{m}^3/\\text{s}$  et dans certains cas on peut utiliser le litre par minute (L/min)`
            ) +
            ` annuel moyen ${rivieres[index2][6]}${rivieres[index2][0]
            } mesuré à ${rivieres[index2][1]} est de ${rivieres[index2][2]
            } m${exposant(3)}/s.<br>`;
          texte +=
            num_alpha(0) +
            ` Calculer le volume d'eau en m${exposant(
              3
            )} écoulé en ${duree} heures à ce débit.<br>`;
          texte +=
            num_alpha(1) +
            ` En ${rivieres[index2][4]} à ${rivieres[index2][1]}, ${rivieres[index2][5]
            }${rivieres[index2][0]} a débité ${nombre_avec_espace(
              vmax
            )} m${exposant(
              3
            )} en une heure. Quel a été alors le débit en m³/s ?`;
          texte_corr =
            num_alpha(0) +
            ` En ${duree} heures il s'écoule en moyenne dans ${rivieres[index2][5]}${rivieres[index2][0]} à ${rivieres[index2][1]} :<br>`;
          texte_corr += `$\\mathcal{V}=${duree}\\text{ h}\\times${rivieres[index2][2]
            }\\text{ m}^3\\text{/s}=${duree}\\times 3600\\text{ s}\\times${rivieres[index2][2]
            }\\text{ m}^3\\text{/s}=${tex_nombre(
              duree * 3600 * rivieres[index2][2]
            )}\\text{ m}^3$<br>`;
          texte_corr +=
            num_alpha(1) +
            ` En ${rivieres[index2][4]} lors de la crue historique ${rivieres[index2][6]}${rivieres[index2][0]} à ${rivieres[index2][1]} le débit maximal a été de :<br>`;
          texte_corr += `Débit =$${tex_nombre(
            vmax
          )}\\text{ m}^3\\text{/h}=\\dfrac{${tex_nombre(
            vmax
          )}\\text{ m}^3}{1\\text{ h}}=\\dfrac{${tex_nombre(
            vmax
          )}\\text{ m}^3}{${tex_nombre(3600)}\\text{ s}}=${tex_nombrec(
            vmax / 3600
          )}\\text{ m}^3\\text{/s}$<br>`;

          break;
        case 14: // problème de vitesse de téléchargement
          let unites = [`ko`, `Mo`, `Go`];
          index = randint(0, 1);
          if (index == 0) vitesse_moy = randint(200, 999);
          else vitesse_moy = randint(1, 20);
          quidam = prenom();
          nbminutes = randint(3, 10);
          nbsecondes = randint(2, 59);
          masse = arrondi(randint(15, 35) / 10);
          texte =
            num_alpha(0) +
            ` ${quidam} télécharge un fichier depuis un espace de stockage en ligne. Sa ` +
            katex_Popup2(
              numero_de_l_exercice + i,
              type_aide,
              `vitesse de téléchargement`,
              `Définition : Vitesse de téléchargement`,
              `La vitesse de téléchargement est le quotient de la quantité de données téléchargées (en ko,Mo ou Go) par la durée de téléchargement (en seconde).<br>L'unité de cette grandeur quotient est le ko/s (ou Mo/s)`
            ) +
            ` est de ${vitesse_moy} ${unites[index]}/s.<br>`;
          texte += `Le téléchargement dure ${nbminutes} minutes et ${nbsecondes} secondes. Quelle est la taille du fichier téléchargé en ${unites[index]} ?<br>`;
          texte +=
            num_alpha(1) +
            ` ${quidam} veut télécharger un fichier de ${tex_nombre(
              masse
            )} Go. Quelle sera la durée du téléchargement si sa vitesse de téléchargement est de ${vitesse_moy} ${unites[index]
            }/s ?<br>`;
          texte_corr =
            num_alpha(0) + ` La taille du fichier téléchargé est :<br>`;
          let taille_fichier = (nbminutes * 60 + nbsecondes) * vitesse_moy;
          texte_corr += `$(${nbminutes}\\times 60 +${nbsecondes})\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]
            }/s} = ${nbminutes * 60 + nbsecondes
            }\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]
            }/s} = ${taille_fichier} \\text{ ${unites[index]} }$`;
          if (taille_fichier > 1000)
            texte_corr += `$ =${tex_nombrec(taille_fichier / 1000)} \\text{ ${unites[index + 1]
              }}.$<br>`;
          texte_corr +=
            num_alpha(1) + ` La durée du téléchargement sera de :<br>`;
          if (index == 0) {
            texte_corr += `$${masse}\\times ${tex_nombrec(
              10 ** 6
            )} \\text{ ko} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`;
            taille_fichier = masse * 10 ** 6;
          } else {
            texte_corr += `$${masse}\\times ${tex_nombrec(
              10 ** 3
            )} \\text{ Mo} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`;
            taille_fichier = masse * 10 ** 3;
          }
          texte_corr += `$=\\dfrac{${taille_fichier}}{${vitesse_moy}}\\text{ s}`;
          nbheures = Math.floor(taille_fichier / vitesse_moy / 3600);
          nbminutes = Math.floor(
            (taille_fichier / vitesse_moy - 3600 * nbheures) / 60
          );
          nbsecondes = arrondi(
            taille_fichier / vitesse_moy - 3600 * nbheures - 60 * nbminutes,
            0
          );
          if (
            taille_fichier / vitesse_moy ==
            nbsecondes + 60 * nbheures + 3600 * nbheures
          )
            texte_corr += `=`;
          else texte_corr += `\\approx`;
          if (nbheures != 0) texte_corr += `${nbheures} \\text{ h }`;
          if (nbminutes != 0) texte_corr += `${nbminutes} \\text{ min }`;
          if (nbsecondes != 0) texte_corr += `${nbsecondes} \\text { s}`;
          texte_corr += `$`;

          break;
      }
      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
  };
  //this.besoin_formulaire_case_a_cocher =['Choix des exercices aléatoire'];
  //this.besoin_formulaire2_numerique = ['Type d\'exercice', 14, '1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers'];
  this.besoin_formulaire_texte = [
    "Choix des grandeurs",
    "Nombres séparés par des tirets\n 1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers",
  ]; // Texte, tooltip
}
