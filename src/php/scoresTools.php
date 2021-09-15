<?php
  /**
   * =============================================================================================================================
   * Outils pour la gestion des scores
   * @author Sébastien LOZANO
   * =============================================================================================================================
   */

  /**
  * Procédure de suppression recursive d'un repertoire et de ses enfants
  * 
  * @param string $dir chemin vers le repertoire à supprimer recursivement
  */

  function recursiveRmdir($dir) { 
    if (is_dir($dir)) { 
      $objects = scandir($dir); 
      foreach ($objects as $object) { 
        if ($object != "." && $object != "..") { 
          if (filetype($dir."/".$object) == "dir") recursiveRmdir($dir."/".$object); else unlink($dir."/".$object); 
        } 
      } 
      reset($objects); 
      rmdir($dir); 
    }  
  }; 

   /**
   * Fonction pour créer l'index des espaces de scores
   * 
   * @param string $path est le chemin où index.php sera généré
   * @param string $codeProf est le code prof constitué des 3 majuscules
   *  
   */

  function createIndexScores($path,$codeProf) {
    // On crée un timestamp pour identifiant les espaces inactifs et le libérer
    $f = fopen($path.'/isInactive.txt',"w+");  
    fputs($f,time().PHP_EOL);
    fclose($f);
    $indexProfSpace = $path.'/index.php';
    // On ouvre le fichier
    $fp = fopen($indexProfSpace, 'a+');
    // On écrit dedans un template de base à modifier plus tard
    $string = 
    '<?php 
      // On inclut le scripts avec les outils
      require_once "../../../../../scoresTools.php";

      // Pour stocker les classes distinctes
      $classes = array();
      // Le répetoire père
      $startPath = dirname(__FILE__);
      // L\'itérateur
      $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($startPath),
                  RecursiveIteratorIterator::SELF_FIRST);
      // Un classe pour récupérer ce que l\'on veut 
      class myFilesToDisplay {
        public function __construct($file, $classe, $name, $path) {
          $this->file = $file; // Le fichier, pour tester si c\'est un dossier
          $this->classe = $classe; // La classe
          $this->name = $name; // Le nom du fichier
          $this->path = $path; // le chemin pour le lien
        }
      }

      $myFilesDatas = array();      
      foreach ($iterator as $dirIt => $fileObj) {        
        $myFilesDatas[] = new myFilesToDisplay($fileObj,substr($fileObj->getPath(),-2),$fileObj->getFilename(),$fileObj->getPath());
      }  

      // On récupère les classes distinctes dans un tableau
      foreach ($myFilesDatas as $object) {
        if(!is_dir($object->file) && !in_array($object->name, array(".","..","index.php","isInactive.txt")) && !in_array($object->classe,$classes)) {    
          array_push($classes,$object->classe);           
        }        
      }
      
      // On trie les classes par ordre alphabétique
      sort($classes);

      if (!empty($classes)) {
        // On affiche un message d\'alerte
        echo "<div class=\"ui icon negative message\">
          <i class=\"exclamation triangle icon\"></i>
          <div class=\"content\">
            <div class=\"header\">
              ATTENTION
            </div>
            <p>Les opérations de suppression sont irrémédiables !</p>
          </div>
        </div>"; 
      };

      // Un fonction de comparaison pour pouvoir trier les objets de la classe myFilesToDisplay via leur propriété name
      function cmpByName($a, $b) {
        return strcmp($a->name, $b->name);
      }
      
      // On trie via la propriété name
      usort($myFilesDatas, "cmpByName");

      // On gère l\'affichage
      echo "<ul>\r\n";
      foreach ($classes as $classe) {
        echo "<br><li>
        <div class=\"ui labeled button\" tabindex=\"0\">
          <div class=\"ui orange button\">
            <i class=\"users icon\"></i> Classe de ".$classe."
          </div>
          <a class=\"ui basic orange left pointing label\" href=\"../../../../../../zipDownload.php?folder='.$path.'/".$classe."/\">
            Télécharger une archive zip avec toutes les semaines
          </a>
        </div>
     
        <button id=\"delClasse".$classe."\" class=\"ui negative labeled icon button\" href=\"\">
          <i class=\"trash alternate icon\"></i>
          ".$classe."
        </button>
        
        <div id=\"modalDelClasse".$classe."\" class=\"ui basic modal\">
          <div class=\"ui icon header\">
            <i class=\"exclamation triangle icon\"></i>
            Opération de suppression
          </div>
          <div class=\"content\">
            <p>Les opéarations de suppression sont irrémédiables ! Sûr de vouloir supprimer la classe de ".$classe." ? </p>
          </div>
          <div class=\"actions\">
            <div class=\"ui red basic cancel inverted button\">
              <i class=\"remove icon\"></i>
              Annuler
            </div>
            <div class=\"ui green ok inverted button\">
              <i class=\"checkmark icon\"></i>
              Supprimer
            </div>
          </div>
        </div>  
        <script>
        document.getElementById(\'delClasse".$classe."\').onclick = function(){
          $(\'#modalDelClasse".$classe."\')
            .modal({
              // closable  : false,
              onDeny    : function(){
              },
              onApprove : async function fetchDelete(){
                await fetch(\'../../../../../../scoresDelDir.php?folder='.$path.'/".$classe."/\');
                window.location.reload(true);
              }
            })
            .modal(\'show\')
          ;
        }
      </script> 

        \r\n";
      echo "
      <div class=\"ui accordion\">
      <div class=\"title\">
        <i class=\"dropdown icon\"></i>
        Dérouler pour ne télécharger que les scores d\'une semaine donnée
      </div>
      <div class=\"content\">
        <p class=\"transition hidden\">";
        echo "
          <ul>\r\n";      
          foreach ($myFilesDatas as $object) {
            if (!is_dir($object->file) && $object->classe == $classe && !in_array($object->name, array(".","..")) ) {
                echo "<li>
                  <div class=\"ui labeled button\" tabindex=\"0\">
                    <div class=\"ui orange button\">
                      <i class=\"calendar icon\"></i> ".substr($object->name,0,-4)."
                    </div>
                    <a class=\"ui basic orange left pointing label\" href=\"".substr($object->path,-2)."/".$object->name."\">
                      Télécharger uniquement ce fichier
                    </a>
                  </div>

                  <button id=\"del".substr($object->name,0,-4).$classe."\" class=\"ui negative labeled icon button\" href=\"\">
                  <i class=\"trash alternate icon\"></i>
                  ".substr($object->name,0,-4)."
                  </button>
                
                <div id=\"modalDel".substr($object->name,0,-4).$classe."\" class=\"ui basic modal\">
                  <div class=\"ui icon header\">
                    <i class=\"exclamation triangle icon\"></i>
                    Opération de suppression
                  </div>
                  <div class=\"content\">
                    <p>Les opéarations de suppression sont irrémédiables ! Sûr de vouloir supprimer la ".substr($object->name,0,-4)." pour les ".$classe." ? </p>
                  </div>
                  <div class=\"actions\">
                    <div class=\"ui red basic cancel inverted button\">
                      <i class=\"remove icon\"></i>
                      Annuler
                    </div>
                    <div class=\"ui green ok inverted button\">
                      <i class=\"checkmark icon\"></i>
                      Supprimer
                    </div>
                  </div>
                </div>  
                <script>
                document.getElementById(\'del".substr($object->name,0,-4).$classe."\').onclick = function(){
                  $(\'#modalDel".substr($object->name,0,-4).$classe."\')
                    .modal({
                      // closable  : false,
                      onDeny    : function(){
                      },
                      onApprove : async function fetchDelete(){
                        await fetch(\'../../../../../../scoresDelDir.php?file='.$path.'/".$classe."/".$object->name."\');
                        window.location.reload(true);
                      }
                    })
                    .modal(\'show\')
                  ;
                }
              </script> 

                </li></br>\r\n";
              };
          }
      echo "
            </ul>
            </p>
          </div>
        </div>\r\n"; 
      echo "</li>\r\n"; 
      }
      if (!empty($classes)) {
        echo "<br><li>
        
        <div class=\"ui labeled button\" tabindex=\"0\">
          <div class=\"ui orange button\">
            <i class=\"users icon\"></i> Toutes les classes
          </div>
          <a class=\"ui basic orange left pointing label\" href=\"../../../../../../zipDownload.php?folder='.$path.'/&allClasses=OK\">
            Télécharger une archive zip avec toutes les semaines
          </a>
        </div> 
        </li>\r\n";
      } else {
        echo "
        <div class=\"ui icon message\">
          <i class=\"notched circle loading icon\"></i>
          <div class=\"content\">
            <div class=\"header\">
              Yapluka ^_^
            </div>
            <p> Pas encore de scores enregistrés ... </p>
          </div>
        </div>    
        ";
      }
      echo "</ul>\r\n";
      
    ?>';


    fputs($fp,"
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">

        <!-- JQuery-->
        <script src=\"../../../../../assets/externalJs/jquery-3.6.0.min.js\"></script>
        <script src=\"../../../../../assets/externalJs/jquery-ui-1.12.1.min.js\"></script>
        

        <!-- Semantic UI-->
        <link rel=\"stylesheet\" type=\"text/css\" href=\"../../../../../assets/externalJs/semantic-ui/semantic.min.css\">
        <script src=\"../../../../../assets/externalJs/semantic-ui/semantic.min.js\" type=\"text/javascript\"></script>
        <script src=\"../../../../../assets/externalJs/semantic-ui/components/state.min.js\"></script>
        
        <title>MathALÉA - Espace ".$codeProf[0].$codeProf[1].$codeProf[2]."</title>
        <style type=\"text/css\">
          body > .ui.container {
            margin-top: 3em;
          }
        </style>
      </head>

      <body style=\"overflow:auto\">
    ");

    // fputs($fp," ...
    // ");

    fputs($fp,"
      <div class=\"ui container\">
        <h1 class=\"ui center aligned header\">Espace des scores <b>".$codeProf[0].$codeProf[1].$codeProf[2]."</b></h1>
        <h2 class=\"ui center aligned header\">Liste des fichiers par classe et par semaine</h2>                      
        $string      
      </div>
    ");

    fputs($fp,"
      <script>
        $('.ui.accordion')
          .accordion()
        ;
        document.getElementById('test').onclick = function(){
          $('.ui.basic.modal')
            .modal('show')
          ;
        };
      </script>
      </body>
        </html>
    ");

    fclose($fp); 
  };

  /**
   * Procédure pour récupérer tous les espaces scores dans un json
   * 
   * @param string $path est le répertoire père de stockage des espaces
   */

  function getAllScoresSpaces($path) {
    // On met les fichiers dans un itérateur récursif    
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);
    // On récupère uniquement les données via le fichier d'index dans un tableau
    $datas = array();    
    foreach ($files as $file) {
        if (substr($file,-9) == "index.php") {
          //echo " ├ $file<br>\n";
          // On explose la chaine via le séparateur /
          $explodedFile = explode("/",$file);
          array_push($datas,array(
            "codeProf" => $explodedFile[1].$explodedFile[2].$explodedFile[3],
            "md5Key" => $explodedFile[4]
          ));
        }
    }
    return json_encode($datas);
  }
  //print_r(getAllScoresSpaces('resultats'));


?>