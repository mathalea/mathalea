<?php
// =============================================================================================================================
// Nettoyage des esapces de scores
// Sébastien LOZANO
// TODO
// => Ne faire le ménage qu'une fois par mois si jamais la navigation est ralentie ! Prévoir une varaible pour la fréquence
// => Conserver les espaces V.I.P. mais pas leurs enfants
// Je fais le choix de supprimer tous les répertoires et de recréer les répertoires VIPs, c'est plus simple que de tester si le répertoire existe
// dans un tableau de codes VIPs, la key md5 des VIPs sera constante !
// =============================================================================================================================

// ========================
// VARIABLES 
// ========================
$msg = "Suppression KO !"; // Pour le retour console
$msgVip = "CRON KO !"; // Pour le retour console
$scoresDir = "./resultats"; // Pour le repertoire de stockage des espaces de scores
// On met tout à zéro dès lors que 365,25 jours ( 31 557 600 secondes ) se sont écoulés, tous les 14 juillet par exemple
$deleteDay = 14;
$deleteMonth = 7;
$currentDay = intval(date('d'));//$currentDate[mday];
$currentMonth = intval(date('m'));//$currentDate[mon];
$currentYear = intval(date('Y'));//$currentDate[year];
$deleteYear = ($currentDay > $deleteDay && $currentMonth >= $deleteMonth) ? $currentYear+1 : $currentYear;  
$diff = (time() - filectime($scoresDir));

// On calcule l'intervalle en jours depuis la date anniversaire de l'année précédente
$currentInterval = date_diff(date_create("$deleteYear/$deleteMonth/$deleteDay"),date_create("$currentYear/$currentMonth/$currentDay"))->format('%a');
$intervalBeforeDelete = 31557600; // 60; // Temps avant remise à zero des espaces de scores
// Un booléen pour ne supprimer qu'une fois à la date anniversaire
// On ne supprimera que si le repertoire d'espace des scores a plus d'un an
$deletePathToDo = ($diff>$intervalBeforeDelete) ? true : false;

/**
* Fonction qui crée tous les espaces V.I.P. à partir d'un json non suivi par git
* le json est en ligne mais son accès est bloqué via .htaccess
* 
* @param json $pathToJson contenant les données à parser
*
* @return string un message pour la console  
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

 return "Création des espaces de scores VIPs OK !";
};

// Procedure de suppression recursive d'un repertoire et de ses enfants
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
} 

$deleteBool = ($currentDay == $deleteDay && $currentMonth == $deleteMonth && $currentYear == $deleteYear && $deletePathToDo) || ($currentDay >= $deleteDay && $currentMonth >= $deleteMonth && $currentYear <= $deleteYear && $deletePathToDo);

// Si on est le bon jour et que le répertoire a plus d'un an, on supprime et on recrée les vips
if ($deleteBool) {
  recursiveRmdir($scoresDir);
  $msg = "Suppression OK !"; 
  $msgVip = createVipScoresSpaces('./json/scoresCodesVip.json');
  $msgVip .= "CRON OK !";
}  

echo json_encode(array(
    "msg" => $msg . "\r\n" . $msgVip, // ."\r\n",
    // ."année courante : $currentYear "."\r\n"
    // ."année de suppr : $deleteYear "."\r\n"    
    // ."doit-on suppr le repertoire ? ". boolval($deletePathToDo) ."\r\n"
    // ."condition de suppr : ". boolval($deleteBool),
    "timeLeft" => $currentInterval,
    "timeSinceCreation" => $diff,
    "deleteNextDate" => "$deleteDay/$deleteMonth/$deleteYear",
  ));  

?>