<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Prism-->
    <script src="modules/prism.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="style/prism.css" />

    <!-- KaTeX et auto-render-->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js"
      integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz"
      crossorigin="anonymous"
    ></script>
    <script src="/assets/externalJs/jszip.min.js" type="text/javascript"></script>
    <script src="assets/externalJs/FileSaver.min.js" type="text/javascript"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js"
      integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI"
      crossorigin="anonymous"
    ></script>

    <!-- JQuery-->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
	 <script
  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
  crossorigin="anonymous"></script>

    <!-- Semantic UI-->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
    />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"
      type="text/javascript"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/components/state.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style/style_mathalea.css" />

    <!-- Algebrite-->
    <!-- <script src="modules/algebrite.bundle-compressed.js" type="text/javascript" ></script> -->

    <!-- Clipboard-->
    <!--<script src="modules/clipboard.min.js" type="text/javascript"></script>-->

    <!-- QRcode-->
   <!--<script src="modules/qrcode.min.js" type="text/javascript"></script>-->

    <!-- SVG.JS -->
    <!--<script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js"></script>-->

    <!-- Seedrandom -->
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>-->

    <!-- Math.js-->
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/8.1.0/math.min.js"
      integrity="sha512-jZKoHppj8aIM7qVRs9BUkS+YUtEbw7tJ7oKu0+g3rKCzRJyMWzaAdukppHp4ubV3HPxzrG03iExbMTnlbySPKA=="
      crossorigin="anonymous"
    ></script>

  <script type="text/javascript" src="modules/datatables/datatables.min.js"></script>
  <script src="//cdn.datatables.net/plug-ins/1.10.24/filtering/type-based/accent-neutralise.js"></script>
  <link rel="stylesheet" href="modules/datatables/jquery.dataTables.min.css" />
  
    <script>
      // Les variables globales nécessaires aux exercices (pas terrible...)
      window.mathalea = {
        sortieAMC:true,
        sortieNB: false,
        anglePerspective: 30,
        coeffPerspective: 0.5,
        pixelsParCm: 20,
        scale: 1,
        unitesLutinParCm: 50,
        mainlevee: false,
        amplitude: 1,
        fenetreMathalea2d: [-1, -10, 29, 10],
        objets2D: []
      }
      window.sortieHtml = false
      window.est_diaporama = false
    </script>

    <!-- Le loader central déclaré comme pouvant charger des modules -->
    <script type="module" src="mathalea.js"></script>

    <title>MathALÉA</title>
  </head>

  <body>
    <div class="ui hidden divider"></div>

    <div class="ui hidden divider"></div>

    <div class="ui two column centered grid" id="contenu">
      <div id="gauche" class="column">
        <div class="ui left aligned segment">
          <h3 class="ui block header">Choix des exercices</h3>

          <div class="ui red message" id="message_liste_exercice_vide">
            <p>
              <strong
                >Commencer par saisir les numéros des exercices souhaités
                ci-dessous.</strong
              >
            </p>
          </div>
          <div class="ui checkbox">
            <input type="checkbox" tabindex="0" id="supprimer_reference" class="hidden">
            <label>Cacher les identifiants des exercices&nbsp;&nbsp;&nbsp</label>
          </div>
          <div
            class="ui fluid left icon input"
            data-tooltip="Nombres séparés par des virgules"
            data-inverted=""
          >
            <i class="edit icon"></i>
            <!-- <span tooltip='Nombres séparés par des virgules'><input id='choix_des_exercices' type='text' size='50' ></span> -->
            <input id="choix_des_exercices" type="text" />
          </div>
			<div id="choix_exercices_div" data-tooltip="Identifiants des exercices" >
		<div class="choix_exo sortable"><span contenteditable="true" class="choix_exercices"></span></div>
	</div>
          <div id="parametres_generaux"></div>
        </div>
      </div>

      <div id="droite" class="ui left aligned segment">
        <div id="exercices_disponibles">
			<h3 class="ui block header">Exercices disponibles 
				<span class="mode_choix" id="mode_choix_liste"> Mode "Liste par niveau" </span>
				<span class="mode_choix" id="mode_choix_tableau" > Mode "Tableau et recherche" </span>
				<span class="replier" id="replier" > - </span>
			</h3>
			</div>
			<div  class="popup"><span id="popup_preview" class="popuptext"></span></div>
		<div id="liste_des_exercices" >    
				<!-- Liste mise à jour en JS -->
		</div>
			<div id="liste_des_exercices_tableau" >
			<!-- Liste mise à jour en JS -->
		</div>

        <div class="ui hidden divider"></div>

        <div class="segment" id="cache">
          <h3 class="ui block header">Code LaTeX</h3>
          <!-- Bouton de mise à jour du code -->
          <button class="btn ui  labeled icon button" id="btn_mise_a_jour_code">
            <i class="redo icon"></i>Nouvelles données
          </button>
          <!-- Bouton de copie du code -->
          <button
            class="btn ui  labeled icon button"
            data-clipboard-action="copy"
            data-clipboard-target="#div_codeLatex"
          >
            <i class="copy icon"></i>Copier code LaTeX
          </button>
          <!-- Bouton de téléchargement -->
          <button class="btn ui labeled icon button" id="btn_telechargement">
            <i class="download icon"></i>Télécharger
          </button>

          <div class="ui hidden divider"></div>

          <!-- Instantiate clipboard -->
          <script>
            var clipboard = new Clipboard('.btn')
          </script>

          <div class="ui hidden divider"></div>

          <!-- Paramètres du fichier LaTeX -->
          <!-- <div class="ui styled fluid accordion"> -->
          <!-- <div class="active title">
          <i class="setting icon"></i>
              Paramètres du fichier .tex
        </div> -->

          <div class="content">
            <form class="ui form">
              <div class="field">
                <label>Nom du fichier et nombre d'exemplaires (1 si copies pré-remplies)</label>
              </div>
              <div class="two fields">
                <div class="twelve wide field">
                  <input
                    type="text"
                    id="nom_du_fichier"
                    placeholder="Nom du fichier (sans extension)"
                  />
                </div>
                <div class="four wide field">
                  <input type="number" id="nombre_d_exemplaires" placeholder="1" min="1" max="1000">
                </div>
              </div>
            </form>
            <div id="options_type_entete">
            <h4>  <label>Type d'entête :</label></h4>
              <div class="inline fields">
                  <div class="ui radio checkbox">
                    <input type="radio" name="type" id="type_AMCcodeGrid" value="AMCcodeGrid" checked="" tabindex="0" class="hidden">
                    <label>Grille de codage &nbsp;&nbsp;&nbsp  </label>
                  </div>
                  <div class="ui radio checkbox">
                    <input type="radio" name="type" id="type_AMCassociation" value="AMCassociation" tabindex="0" class="hidden">
                    <label>Copies pré-remplies &nbsp;&nbsp;&nbsp  </label>
                  </div>
                  <div class="ui radio checkbox">
                    <input type="radio" name="type" id="type_champnom" value="champnom" tabindex="0" class="hidden">
                    <label>Nom et prénom manuscrits</label>
                  </div>
              </div>
            </div>
            <br>
            <div id="options_format">
              <h4><label>Format :</label></h4>
              <div class="inline fields">
                  <div class="ui radio checkbox">
                    <input type="radio" name="format" id="format_A4" value="A4" checked="" tabindex="0" class="hidden">
                    <label>Format A4 portrait &nbsp;&nbsp;&nbsp    </label>
                  </div>
                  <div class="ui radio checkbox">
                    <input type="radio" name="format" id="format_A3" value="A3" tabindex="0" class="hidden">
                    <label>Format A3 paysage 2 colonnes</label>
                  </div>
              </div>
            </div>
            <h4 class="ui block header">Nombres de questions pour chaque groupe séparés par des virgules (un seul par groupe dans l'ordre des groupes)<br>Exemple : si la sélection est 3G30,3G30,3G30,5N20, on peut mettre 1,3 ce qui donnera une question 3G30 et trois questions 5N20</h4>

            <div
            class="ui fluid left icon input"
            data-tooltip="Nombres séparés par des virgules"
            data-inverted=""
          >
            <i class="edit icon"></i>
            <!-- <span tooltip='Nombres séparés par des virgules'><input id='choix_des_exercices' type='text' size='50' ></span> -->
            <input id="nbQuestions_par_groupe" type="text" />
          </div>
            <div class="ui hidden divider"></div>
            <div id="overleaf">
              <!-- <form method="POST" action="https://www.overleaf.com/docs" target="_blank" >
                <div class="form-group text-center">
                  <input type="hidden" name="encoded_snip" value="" autocomplete="off">
                  <input type="hidden" name="snip_name" value="CoopMaths" autocomplete="off">
                  <button class="btn-success btn btn-smclass ui labeled icon button" id="btn_overleaf" type="submit" >
                    <i class="cogs icon"></i>Compiler sur Overleaf.com
                  </button>
                </div>
              </form>        -->
              <form name="zips" method="post" action="overleafSansZip.php" target="_blank">
                <!-- champ erreur -->
                <?php if(!empty($error)) { ?>
                <p style=" border:#C10000 1px solid; background-color:#FFA8A8; color:#B00000;padding:8px; width:588px; margin:0 auto 10px;"><?php echo $error; ?></p>
                <?php } ?>                
                <input type="hidden" name="encoded_snip" value="" autocomplete="off">
                <!-- <input type="hidden" name="snip_name" value="CoopMaths" autocomplete="off">                 -->
                <button class="btn-success btn btn-smclass ui labeled icon button" type="submit" name="createzip" id="btn_overleaf"> 
                  <i class="cogs icon"></i>Compiler sur Overleaf.com
                </button>
              </form>
 
            </div>

            <div>
              <a href="fichiers/preambule.tex" class="lien_preambule"
                ><button class="ui compact basic icon button" tabindex="0">
                  <i class="download icon"></i> Préambule
                </button></a
              >
              <a href="fichiers/images.zip" class="lien_images"
                ><button class="ui compact basic icon button" tabindex="0">
                  <i class="download icon"></i> Images
                </button></a
              >
              <a href="fichiers/automultiplechoice.sty" class="lien_images">
                <button class="ui compact basic icon button" tabindex="0"><i class="download icon"></i>paquet AMC</button>
              </a>

            </div>
          </div>
          <!-- </div> -->

          <!-- Code LaTeX -->
        </div>
        <div id="div_codeLatex"></div>
      </div>
    
    </div>
    <!-- Fin du div contenu -->
  </body>
</html>
