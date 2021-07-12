<?php
// =============================================================================================================================
// Nettoyage des esapces de scores
// Sébastien LOZANO
// TODO
// => Ne faire le ménage qu'une fois par mois si jamais la navigation est ralentie ! Prévoir une varaible pour la fréquence
// => Conserver les espaces V.I.P. mais pas leurs enfants
// Je fais le choix de supprimer tous les répertoires et de recréer les répertoires VIPs, c'est plus simple que de tester si le répertoire existe
// dans un tableau de codes VIPs, la key md5 des VIPs sera constante !
// https://gmanier.com/memo/6/php-supprimer-dossier-a-l-aide-de-la-recursivite
// https://www.it-swarm-fr.com/fr/php/comment-supprimer-recursivement-un-repertoire-et-tout-son-contenu-fichiers-sous-repertoires-en-php/969499939/
// https://qastack.fr/programming/2524151/php-get-all-subdirectories-of-a-given-directory
// https://lucidar.me/en/web-dev/how-to-get-subdirectories-in-php/
// =============================================================================================================================

// ========================
// VARIABLES 
// ========================
$msg = "Suppression KO !\r\n"; // Pour le retour console
$scoresDir = "./resultats"; // Pour le repertoire de stockage des espaces de scores
$timeBeforeDelete = 60; // Temps avant suppression d'un dossier/fichier


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
};
/**
* Fonction qui crée tous les espaces V.I.P. à partir d'un json non suivi par git 
* 
* @param json $pathToJson contenant les données à parser
*  
*/

function createVipScoresSpaces($pathToJson) {
 // on met le contenu du fichier dans une variable
 $data = file_get_contents($pathToJson); 
 // on décode le flux JSON et on accède à ce qu'on veut, ici les VIPs !
 $vips = json_decode($data)->vips;
 // on crée les repertoires ad hoc
 if (!is_dir($GLOBALS["scoresDir"])) {
   mkdir($GLOBALS["scoresDir"]);
   foreach ($vips as $vip) {
       $path = $GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key;
       mkdir($path, 0775, true);
   };      
 };
 $GLOBALS["msg"] .= "Création des espaces de scores VIPs OK ! \r\n";
};

createVipScoresSpaces('./json/scoresCodesVip.json');


echo json_encode(array(
    "msg" => $msg,
  ));  

?>