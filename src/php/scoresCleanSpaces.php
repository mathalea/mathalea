<?php
/**
 * =============================================================================================================================
 * Nettoyage des espaces de scores
 * @author Sébastien LOZANO
 * 
 * Je fais le choix de supprimer tous les répertoires et de recréer les répertoires VIPs, c'est plus simple que de tester si le répertoire existe
 * dans un tableau de codes VIPs, la key md5 des VIPs sera constante !
 * =============================================================================================================================
 */

 // On inclut le scripts avec les outils
 require_once "scoresTools.php";

// ========================
// VARIABLES 
// ========================
$msg = "Suppression KO !"; // Pour le retour console
$msgVip = "Création des espaces de scores VIPs KO !"; // Pour le retour console
$msgCron = "CRON KO !"; // Pour le retour console
$scoresDir = "resultats"; // Pour le repertoire de stockage des espaces de scores
// On met tout à zéro dès lors que 365,25 jours ( 31 557 600 secondes ) se sont écoulés après la création du répertoire resultats
// Temporairement mis à 1 jour (86 400 secondes)
$intervalBeforeDelete = 31557600; // Temps en secondes avant remise à zero des espaces de scores
$deleteDay = intval(date('d',filectime($scoresDir)));
$deleteMonth = intval(date('m',filectime($scoresDir)));
$deleteYear = intval(date('Y',filectime($scoresDir)+$intervalBeforeDelete));
$deleteNextDate = date('d / m / Y à H:i:s ',filectime($scoresDir)+$intervalBeforeDelete);
$timeSinceCreation = (time() - filectime($scoresDir));
$currentDay = intval(date('d'));
$currentMonth = intval(date('m'));
$currentYear = intval(date('Y'));
$mailingVip = '';

// On calcule l'intervalle en jours depuis la date anniversaire de l'année précédente
$currentInterval = date_diff(date_create("$deleteYear/$deleteMonth/$deleteDay"),date_create("$currentYear/$currentMonth/$currentDay"))->format('%a');
// Un booléen pour ne supprimer qu'une fois à la date anniversaire
// On ne supprimera que si le repertoire d'espace des scores a plus d'un an
$deletePathToDo = ($timeSinceCreation>$intervalBeforeDelete) ? true : false;

/**
 * Fonction qui fait un mailing aux VIPs
 * 
 * @param json $pathToJson contenant les données à parser
 * 
 * 
 */

function mailUrlToVips($pathToJson) {
  $passage_ligne = "\r\n";
  // on met le contenu du fichier dans une variable
  $data = file_get_contents($pathToJson); 
  // on décode le flux JSON et on accède à ce qu'on veut, ici les VIPs !
  $vips = json_decode($data)->vips;
  // On envoie un mail à chaque vip
  $email_objet = "MATHALEA - Lien vip vers espace scores"; // email object line
  $email_from = "sebastien.lozano@ac-nancy-metz.fr";
  foreach ($vips as $vip) {
    if ($vip->isEmailOk) {
      //Création du boundary (frontière dans l'email genere
      $boundary = "==========================================================";
      //FIN Création du boundary
  
      //Création du header de l'e-mail
      $headers  = "MIME-Version: 1.0 ".$passage_ligne;
      //$headers .= "Content-type: text/html; charset=iso-8859-1".$passage_ligne;
      $headers .= "Content-type: text/html; charset=UTF-8".$passage_ligne;
      $headers .= "From : ".$email_from.$passage_ligne;
      $headers .= "Disposition-Notification-To: ".$email_from.$passage_ligne;

      $headers .= "Reply-to : ".$email_from.$passage_ligne;
      //$headers .= "Reply-to : No-Reply".$passage_ligne;
      $headers .='X-Mailer: PHP/' . phpversion().$passage_ligne;

      // Message de Priorité haute

      $headers .= "X-Priority: 1  ".$passage_ligne; // modif juillet 2019
      $headers .= "X-MSMail-Priority: High ".$passage_ligne; // modif juillet 2019
      //FIN Création du header de l'e-mail
  
      //Création du message format HTML

      $email_message = "";  

      $email_message .= "<HTML> ".$passage_ligne."<br>";

      $email_message .= "<head> ".$passage_ligne."<br>";

      $email_message .= "<title> Espaces Scores Lien </title> ".$passage_ligne."<br>";

      $email_message .= "</head> ".$passage_ligne."<br>";

      $email_message .= "<body> ".$passage_ligne."<br>";

  

      $email_message .= "CECI EST UN COMMUNIQUÉ DU MASSILIA SOUND SYSTEM<br>";
      $email_message .= $passage_ligne.$boundary.$passage_ligne."<br>";  
      $email_message .= "Origine du message : site COOPMATHS <a href=\"https://coopmaths.fr/\" target=\"_blank\">https://coopmaths.fr/</a><br>";
      $email_message.= $passage_ligne.$boundary.$passage_ligne."<br>";

      $email_message .= "Namasté <b>".$vip->nom."</b>,<br><br>";
      $email_message .= "Les espaces de scores viennent d'être remis à zéro.<br>";
      $email_message .= "Tu pourras retrouver tes fichiers enregistrés à l'url de ton espace scores : <br>      
        <a href=\"https://coopmaths.fr/".$GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key."\" target=\"_blank\">
        https://coopmaths.fr/".$GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key."
        </a><br>";
      $email_message .= "<b>Conserve-la précieusement.</b><br>";
      $email_message .= "Tu pourras y ajouter des éléments en utilisant le code prof suivant : <b>".$vip->codeProf."</b><br>";
      
      $email_message .= $passage_ligne.$boundary.$passage_ligne."<br>";
      $email_message .="SPOK &#x1f596;"."<br>";
      $email_message .= $passage_ligne.$boundary.$passage_ligne."<br>";
    
      $email_message .= "</body> ".$passage_ligne."<br>";

      $email_message .= "</HTML> ".$passage_ligne."<br>";
      
      //FIN Création du message
      
      $CR_Mail = TRUE;
      $CR_Mail = @mail ($vip->email, $email_objet, $email_message, $headers); 

      if ($CR_Mail === FALSE)
        {          
          $GLOBALS['mailingVip'] = "mailing VIPs KO";
        }
      else
        {
          $GLOBALS['mailingVip'] = "mailing VIPs OK";
        }

    };
    
  };  
};

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
    mkdir($GLOBALS["scoresDir"],0775, true);
    // On crée un fichier à la racine du répertoire pour savoir si on doit mettre à jour les index
    // On y stocke le date de la dernière modif du fichier qui génère les index
    $f = fopen($GLOBALS["scoresDir"].'/iSIndexUpdateNeeded.txt',"w+");
    fputs($f,filectime("scoresTools.php").PHP_EOL);
    fclose($f);
    // On crée les espaces VIPs
    foreach ($vips as $vip) {
        $path = $GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key;
        mkdir($path, 0775, true);
        // On crée la page d'index pour l'espace
        // Une fois tout ça créer,
        // On va créer un fichier index.php qui va bien pour afficher tout ce qu'on veut
        createIndexScores($path,$vip->codeProf[0].$vip->codeProf[1].$vip->codeProf[2]);
    };     
  };
 
  // On fait le mailing
  mailUrlToVips($pathToJson);

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
}; 

// Condition de suppression
// Si on est le bon jour et que le répertoire a plus d'un an, on supprime et on recrée les vips
$deleteBool = ($currentDay >= $deleteDay && $currentMonth >= $deleteMonth && $currentYear <= $deleteYear && $deletePathToDo) || !is_dir($scoresDir);

// Condition de mise à jour des index des espaces scores
$f = fopen($GLOBALS["scoresDir"].'/iSIndexUpdateNeeded.txt',"r");  
// On récupère la date de dernière modif du fichier qui génère les index
$firstLine = fgets($f);
fclose($f); 

// Booléen pour savoir si le fichier qui génère les index a été modifié
$iSindexUpdateNeeded = (filectime('scoresTools.php') !=  $firstLine) ? true : false;;

if ($deleteBool) {
  recursiveRmdir($scoresDir);
  $msg = "Suppression OK !"; 
  createVipScoresSpaces('./json/scoresCodesVip.json');
  $msgCron = "CRON OK !";  
} else {
  // On teste s'il faut mettre à jour les index des espaces scores  
  if ($iSindexUpdateNeeded) {    
    // Si c'est le cas on modifie la date de dernière modif stockée dans le fichier
    $f = fopen($GLOBALS["scoresDir"].'/iSIndexUpdateNeeded.txt',"w+");    
    fputs($f,filectime("scoresTools.php").PHP_EOL);
    fclose($f);
    // On réécrit tous les index des espaces scores existants sans toucher aux fichiers stockés sur le serveur
    $pathsToIndexes = getAllScoresScpaces('resultats');
    $decodedPathsToIndexes = json_decode($pathsToIndexes);  
    // $f = fopen($GLOBALS["scoresDir"].'/iSIndexUpdateNeeded.txt',"a+");    
    // foreach ($decodedPathsToIndexes as $index) {
    //   fputs($f,$GLOBALS["scoresDir"].'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key.PHP_EOL);
    // }    
    // fclose($f);      
    // On supprime tous les index des espaces scores existants
    // On les recrée dans la foulée avec la fonction createIndexScores($path,$codeProf);
    foreach ($decodedPathsToIndexes as $index) {
      unlink($GLOBALS["scoresDir"].'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key.'/index.php');
      createIndexScores($GLOBALS["scoresDir"].'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key,$index->codeProf);                 
    } 
  }
};  

echo json_encode(array(
    "msg" => $msg . "\r\n" . $msgVip. "\r\n" . $msgCron . "\r\n" . $mailingVip,
    "timeLeft" => $currentInterval,
    "timeSinceCreation" => number_format($timeSinceCreation, 0, ',', ' '),
    "deleteNextDate" => $deleteNextDate,
    "currentDate" => "$currentDay / $currentMonth / $currentYear",
  ));    
?>