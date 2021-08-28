<?php
  /**
   * =============================================================================================================================
   * Outils pour la gestion des scores
   * @author Sébastien LOZANO
   * =============================================================================================================================
   */

  /**
   * Fonction pour créer l'index des espaces de scores
   * 
   * @param string $path est le chemin où index.php sera généré
   * @param string $codeProf est le code prof constitué des 3 majuscules
   *  
   */

  function createIndexScores($path,$codeProf) {
    $indexProfSpace = $path.'/index.php';
    // On ouvre le fichier
    $fp = fopen($indexProfSpace, 'a+');
    // On écrit dedans un template de base à modifier plus tard
    $string = 
    '<?php 
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
        if(!is_dir($object->file) && !in_array($object->name, array(".","..","index.php")) && !in_array($object->classe,$classes)) {    
          array_push($classes,$object->classe);           
        }        
      }
      
      // On trie les classes par ordre alphabétique
      sort($classes);

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

  function getAllScoresScpaces($path) {
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
  //print_r(getAllScoresScpaces('resultats'));
?>