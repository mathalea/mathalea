<?php
// TODO
// => Ne faire le ménage qu'une fois par mois si jamais la navigation est ralentie ! Prévoir une varaible pour la fréquence
// => Conserver les espaces V.I.P. mais pas leurs enfants

$msg = "Suppression KO !";
// // Procédure de suppression des fichiers avec exploration recursive
function recursiveDelete($pathToClean,$timeBeforeDelete) {
    $repertoire = opendir($pathToClean); // On définit le répertoire dans lequel on souhaite travailler.
    
    while (false !== ($fichier = readdir($repertoire))) // On lit chaque fichier du répertoire dans la boucle.
    {
    $chemin = $pathToClean."/".$fichier; // On définit le chemin du fichier à effacer.
    
    // Si le fichier n'est pas un répertoire…
    if ($fichier != ".." && $fichier != "." && !is_dir($fichier))
          {
          $Diff = (time() - filectime($chemin));
          if ($Diff > $timeBeforeDelete) unlink($chemin); // On efface si c'est trop vieux depuis la dernière modification        
          }
    elseif (is_dir($fichier)) 
          {
            recursiveDelete($fichier,$timeBeforeDelete);
          }
    }
    closedir($repertoire);
  }
  
    // // On supprime tout ce qui a plus de 1 minute
    $thisdir = "./resultats";
    if (!is_dir($thisdir)) {
        mkdir($thisdir);
        mkdir('./test');
    }
    
    if (rmdir($thisdir)) {
        $msg = "Suppression OK !";
    };

echo json_encode(array(
    "msg" => $msg,
  ));  

?>