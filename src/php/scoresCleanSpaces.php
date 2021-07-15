<?php
// =============================================================================================================================
// Nettoyage des esapces de scores
// Sébastien LOZANO
//
// Je fais le choix de supprimer tous les répertoires et de recréer les répertoires VIPs, c'est plus simple que de tester si le répertoire existe
// dans un tableau de codes VIPs, la key md5 des VIPs sera constante !
// =============================================================================================================================

// ========================
// VARIABLES 
// ========================
$msg = "Suppression KO !"; // Pour le retour console
$msgVip = "Création des espaces de scores VIPs KO !"; // Pour le retour console
$msgCron = "CRON KO !"; // Pour le retour console
$scoresDir = "./resultats"; // Pour le repertoire de stockage des espaces de scores
// On met tout à zéro dès lors que 365,25 jours ( 31 557 600 secondes ) se sont écoulés après la création du répertoire resultats
// if (!is_dir($scoresDir)) {
//   mkdir($scoresDir, 0775, true);  
//   createVipScoresSpaces('./json/scoresCodesVip.json');
// }; 
$intervalBeforeDelete = 31557600; // 60; // Temps avant remise à zero des espaces de scores
$deleteDay = intval(date('d',filectime($scoresDir)));
$deleteMonth = intval(date('m',filectime($scoresDir)));
$deleteYear = intval(date('Y',filectime($scoresDir)+$intervalBeforeDelete));
$deleteNextDate = date('d / m / Y à H:i:s ',filectime($scoresDir)+$intervalBeforeDelete);
$timeSinceCreation = (time() - filectime($scoresDir));
$currentDay = intval(date('d'));
$currentMonth = intval(date('m'));
$currentYear = intval(date('Y'));


// On calcule l'intervalle en jours depuis la date anniversaire de l'année précédente
$currentInterval = date_diff(date_create("$deleteYear/$deleteMonth/$deleteDay"),date_create("$currentYear/$currentMonth/$currentDay"))->format('%a');
// Un booléen pour ne supprimer qu'une fois à la date anniversaire
// On ne supprimera que si le repertoire d'espace des scores a plus d'un an
$deletePathToDo = ($timeSinceCreation>$intervalBeforeDelete) ? true : false;

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
  // on crée les repertoires ad hoc, le repertoire resultats a été crée au debut s'il n'existait pas
  if (!is_dir($GLOBALS["scoresDir"])) {
 // if (is_dir($GLOBALS["scoresDir"])) {
    mkdir($GLOBALS["scoresDir"],0775, true);
    foreach ($vips as $vip) {
        $path = $GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key;
        mkdir($path, 0775, true);
    };      
  };
 
  $GLOBALS["msgVip"] = "Création des espaces de scores VIPs OK !";
  $GLOBALS["deleteDay"] = intval(date('d',filectime($GLOBALS["scoresDir"])));
  $GLOBALS["deleteMonth"] = intval(date('m',filectime($GLOBALS["scoresDir"])));
  $GLOBALS["deleteYear"] = intval(date('Y',filectime($GLOBALS["scoresDir"])+$GLOBALS["intervalBeforeDelete"]));
  $GLOBALS["deleteNextDate"] = date('d / m / Y à H:i:s ',filectime($GLOBALS["scoresDir"])+$GLOBALS["intervalBeforeDelete"]);
  $GLOBALS["timeSinceCreation"] = (time() - filectime($GLOBALS["scoresDir"]));
  $GLOBALS["currentInterval"] = date_diff(date_create($GLOBALS["deleteYear"]."/".$GLOBALS["deleteMonth"]."/".$GLOBALS["deleteDay"]),date_create($GLOBALS["currentYear"]."/".$GLOBALS["currentMonth"]."/".$GLOBALS["currentDay"]))->format('%a');
 };

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
} 

// Condition de suppression
// Si on est le bon jour et que le répertoire a plus d'un an, on supprime et on recrée les vips
$deleteBool = ($currentDay >= $deleteDay && $currentMonth >= $deleteMonth && $currentYear <= $deleteYear && $deletePathToDo) || !is_dir($scoresDir);

if ($deleteBool) {
  recursiveRmdir($scoresDir);
  $msg = "Suppression OK !"; 
  createVipScoresSpaces('./json/scoresCodesVip.json');
  $msgCron = "CRON OK !";
}  

echo json_encode(array(
    "msg" => $msg . "\r\n" . $msgVip. "\r\n" . $msgCron,
    "timeLeft" => $currentInterval,
    "timeSinceCreation" => $timeSinceCreation,
    "deleteNextDate" => $deleteNextDate,
    "currentDate" => "$currentDay / $currentMonth / $currentYear",
  ));  
  
?>