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
  $string = '<?php 
  $classes = array();  
  $dir_iterator = new RecursiveDirectoryIterator(dirname(__FILE__));
  $iterator = new RecursiveIteratorIterator($dir_iterator);
  foreach ($iterator as $file){
      if(!is_dir($file) && !in_array($file->getFilename(), array(".","..","index.php")) && !in_array(substr($file->getPath(),-2),$classes)) {    
          array_push($classes,substr($file->getPath(),-2));
      }
  }
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
    </li>\r\n";
  echo "<ul>\r\n";
  foreach ($iterator as $file) {
      if (substr($file->getPath(),-2) == $classe && !in_array($file->getFilename(), array(".","..")) ) {
        echo "<br><li>
          <div class=\"ui labeled button\" tabindex=\"0\">
            <div class=\"ui orange button\">
              <i class=\"calendar icon\"></i> ".substr($file->getFilename(),0,-4)."
            </div>
            <a class=\"ui basic orange left pointing label\" href=\"".substr($file->getPath(),-2)."/".$file->getFilename()."\">
              Télécharger uniquement ce fichier
            </a>
          </div>
         </li>\r\n";
      };
  }
  echo "</ul>\r\n"; 
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
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-5318292-3\"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-5318292-3');
  </script>
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
</body>
  </html>
  ");
  fclose($fp); 
};

?>