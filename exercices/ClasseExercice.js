/**
 *
 *  Classe parente de tous les exercices
 *
 * @Auteur Rémi Angot
 */
export default function Exercice() {
    // Classe parente de tous les exercices qui seront créés
    this.titre = "";
    this.consigne = "";
    this.consigne_correction = "";
    this.liste_questions = [];
    this.liste_corrections = [];
    this.introduction = "";
    this.contenu = "";
    this.contenu_correction = "";
    this.nb_questions = 10;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.spacing = 1;
    this.spacing_corr = 1;
    this.beamer = false;
  
    this.besoin_formulaire_numerique = false; // Sinon this.besoin_formulaire_numerique = [texte,max,tooltip facultatif];
    this.besoin_formulaire_texte = false; // Sinon this.besoin_formulaire_texte = [texte,tooltip];
    this.besoin_formulaire_case_a_cocher = false; // Sinon this.besoin_formulaire_case_a_cocher = [texte];
  
    this.consigne_modifiable = true;
    this.nb_questions_modifiable = true;
    this.nb_cols_modifiable = true;
    this.nb_cols_corr_modifiable = true;
    this.spacing_modifiable = true;
    this.spacing_corr_modifiable = true;
    this.correction_detaillee_disponible = false;
    this.correction_detaillee = true;
    this.video = '';
    this.bouton_aide = false;
    this.tailleDiaporama = 50; // Taille en pixels pour le calcul chronométré
    // this.bouton_aide = modal_texte_court(numero_de_l_exercice,texte,label_bouton="Aide",icone="info circle")
    // this.bouton_aide = modal_texte_long(numero_de_l_exercice,titre,texte,label_bouton="Aide",icone="info circle")
    // this.bouton_aide = modal_youtube(numero_de_l_exercice,id_youtube,texte,label_bouton="Aide - Vidéo",icone="youtube")
    // this.bouton_aide = modal_pdf(numero_de_l_exercice,url_pdf,texte="Aide",label_bouton="Aide - PDF",icone="file pdf")
    // this.vspace = -1 //Ajoute un \vspace{-1cm} avant l'énoncé ce qui peut être pratique pour des exercices avec des figures.
    this.pas_de_version_LaTeX = false;
    this.MG32editable = false; //pas d'interface par défaut pour les figures MG32
    this.nouvelle_version = function (numero_de_l_exercice) {};
    this.liste_packages = []; // string ou liste de string avec le nom des packages spécifiques à ajouter dans le préambule
    //this.type_exercice = "MG32";
    //this.taille_div_MG32 = [500, 450];
    //this.type_exercice = "Scratch"
  }