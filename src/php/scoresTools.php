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

  foreach ($classes as $classe) {
    echo "Classe de ".$classe." => <a href=\"../../../../../../zipDownload.php?folder='.$path.'/".$classe."/\">Télécharger une archive zip avec toutes les semaines</a> <br>\r\n";
  echo "<ul>\r\n";
  foreach ($iterator as $file) {
      if (substr($file->getPath(),-2) == $classe && !in_array($file->getFilename(), array(".","..")) ) {
         echo "<li><a href=\"".substr($file->getPath(),-2)."/".$file->getFilename()."\">Télécharger la ".$file->getFilename()."</a></li>\r\n";
      };
  }
  echo "</ul>\r\n";    
  }
  echo "Toutes les classes en même temps => <br>\r\n";
?>';
  fputs($fp,"
  <!DOCTYPE html>
  <html>
      <head>
          <title>Espace ".$codeProf[0].$codeProf[1].$codeProf[2]."</title>
          <meta charset=\"utf-8\">              
      </head>
      
      <body>
          <h1>Espace des scores <b>".$codeProf[0].$codeProf[1].$codeProf[2]."</b></h1>
          <h2>Liste des fichiers par classe et par semaine</h2>                
            $string      
      </body>
  </html>
  ");
  fclose($fp); 
};

?>