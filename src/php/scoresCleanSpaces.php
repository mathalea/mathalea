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
$intervalBeforeDeleteIfInactive = 31557600; // 2 678 400 secondes c'est 31 jours mais c'est trop court mais 31557600 n'a pas de sens
// En fait la fonction filectime() renvoie la date de la dernière modif de l'inode donc si on crée un nouveau sous-dossier l'inode change
// filemtime() permet-t-il de corriger le problème ? Il semblerait que oui ... et non !
// Et avec un timestamp dans un fichier ? On ajoute ce timestamp au moment de la création des vips
// Le fichier peut ne pas exister ! Donc il faut le créer s'il n'existe pas et on fixe la date au 15 aout de l'année en cours
if (!file_exists($scoresDir.'/isCleanUpNeeded.txt')) {
  // On récupère la date de création du dossier pour tester s'il faudra supprimer des espaces de scores
  $f = fopen($GLOBALS["scoresDir"].'/isCleanUpNeeded.txt',"w+");
  // On récupère la date de création du dossier père
  $timeOfCreation = strtotime(intval(date('Y')).'/08/15');//filectime($GLOBALS["scoresDir"]);
  // On l'ajoute au fichier
  fputs($f,$timeOfCreation.PHP_EOL);
  fclose($f);
} else {
$f = fopen($scoresDir.'/isCleanUpNeeded.txt',"r");  
// On récupère la date de création du dossier père
$timeOfcreation = fgets($f);
fclose($f);  
}

$deleteDay = intval(date('d',$timeOfcreation)); //intval(date('d',filemtime($scoresDir)));
$deleteMonth = intval(date('m',$timeOfcreation)); //intval(date('m',filemtime($scoresDir)));
$deleteYear = intval(date('Y',$timeOfcreation+$intervalBeforeDelete)); // intval(date('Y',filemtime($scoresDir)+$intervalBeforeDelete));
$deleteNextDate = date('d / m / Y à H:i:s ',$timeOfcreation+$intervalBeforeDelete); //date('d / m / Y à H:i:s ',filemtime($scoresDir)+$intervalBeforeDelete);
$timeSinceCreation = (time() - $timeOfcreation); //(time() - filemtime($scoresDir));
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
      $boundary = "=================================================";      
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

  

      $email_message .= "CECI EST UN COMMUNIQUÉ AUTOMATIQUE DU MASSILIA SOUND SYSTEM<br>";
      $email_message .= $passage_ligne.$boundary.$passage_ligne."<br>";  
      $email_message .= "Origine du message : site COOPMATHS <a href=\"https://coopmaths.fr/\" target=\"_blank\">https://coopmaths.fr/</a><br>";
      $email_message.= $passage_ligne.$boundary.$passage_ligne."<br>";

      $email_message .= "Namasté <b>".$vip->nom."</b>,<br><br>";
      $email_message .= "Tu le reçois pour l'une des raisons suivantes :";
      $email_message .= "<ul>
      <li>Les espaces de scores viennent d'être remis à zéro.</li>
      <li>On vient d'accueillir un nouveau VIP ! &#x1F60E;</li>
      <li><strike>L'un des VIPs n'a pas utilisé son espace depuis plus de 31 jours, c'est surement moi ! &#x1F61C;</strike></li>
      <li>Une raison inconnue ! &#x1F914;</li>
      </ul>";
      $email_message .= "Tu pourras retrouver tes fichiers enregistrés à l'url de ton espace scores : <br>      
        <a href=\"https://coopmaths.fr/".$GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key."\" target=\"_blank\">
        https://coopmaths.fr/".$GLOBALS["scoresDir"].'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key."
        </a><br>";
      $email_message .= "<b>Conserve-la précieusement.</b><br>";
      $email_message .= "Tu pourras y ajouter des éléments en utilisant le code prof suivant : <b>".$vip->codeProf."</b><br>";
      
      $email_message .= $passage_ligne.$boundary.$passage_ligne."<br>";
      $email_message .="Porte toi bien"."<br>";
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
    $f = fopen($GLOBALS["scoresDir"].'/isIndexUpdateNeeded.txt',"w+");
    fputs($f,filectime("scoresTools.php").PHP_EOL);
    fclose($f);
    // On récupère la date de création du dossier pour tester s'il faudra supprimer des espaces de scores
    $f = fopen($GLOBALS["scoresDir"].'/isCleanUpNeeded.txt',"w+");
    $timeOfCreation = filectime($GLOBALS["scoresDir"]);
    fputs($f,$timeOfCreation.PHP_EOL);
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

  // Ces affections servent à l'initialisation sinon on n'a pas les dates de création à l'exterieur de la fonction
  $GLOBALS["msgVip"] = "Création des espaces de scores VIPs OK !";
  $GLOBALS["deleteDay"] = intval(date('d',$timeOfCreation)); //intval(date('d',filemtime($scoresDir)));
  $GLOBALS["deleteMonth"] = intval(date('m',$timeOfCreation)); //intval(date('m',filemtime($scoresDir)));
  $GLOBALS["deleteYear"] = intval(date('Y',$timeOfCreation+$intervalBeforeDelete)); // intval(date('Y',filemtime($scoresDir)+$intervalBeforeDelete));
  $GLOBALS["deleteNextDate"] = date('d / m / Y à H:i:s ',$timeOfCreation+$intervalBeforeDelete); //date('d / m / Y à H:i:s ',filemtime($scoresDir)+$intervalBeforeDelete);
  $GLOBALS["timeSinceCreation"] = (time() - $timeOfCreation); //(time() - filemtime($scoresDir));
  $GLOBALS["currentInterval"] = date_diff(date_create($GLOBALS["deleteYear"]."/".$GLOBALS["deleteMonth"]."/".$GLOBALS["deleteDay"]),date_create($GLOBALS["currentYear"]."/".$GLOBALS["currentMonth"]."/".$GLOBALS["currentDay"]))->format('%a');
};

// Condition de suppression
// Si on est le bon jour et que le répertoire a plus d'un an, on supprime et on recrée les vips
$deleteBool = ($currentDay >= $deleteDay && $currentMonth >= $deleteMonth && $currentYear <= $deleteYear && $deletePathToDo) || !is_dir($scoresDir);

// Condition de mise à jour des index des espaces scores
$f = fopen($GLOBALS["scoresDir"].'/isIndexUpdateNeeded.txt',"r");  
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
  $pathsToIndexes = getAllScoresSpaces($scoresDir);
  $decodedPathsToIndexes = json_decode($pathsToIndexes);       
  // On teste s'il faut mettre à jour les index des espaces scores  
  if ($iSindexUpdateNeeded) {    
    // Si c'est le cas on modifie la date de dernière modif stockée dans le fichier
    $f = fopen($scoresDir.'/isIndexUpdateNeeded.txt',"w+");    
    fputs($f,filectime("scoresTools.php").PHP_EOL);
    fclose($f);
    // On réécrit tous les index des espaces scores existants sans toucher aux fichiers stockés sur le serveur
    // On supprime tous les index des espaces scores existants
    // On les recrée dans la foulée avec la fonction createIndexScores($path,$codeProf);
    foreach ($decodedPathsToIndexes as $index) {      
      unlink($scoresDir.'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key.'/index.php');
      createIndexScores($scoresDir.'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key,$index->codeProf);                 
    } 
  }
  // On nettoie les espaces non utilisés depuis plus de 31 jours
  foreach ($decodedPathsToIndexes as $index) {      
    $f = fopen($scoresDir.'/'.$index->codeProf[0].'/'.$index->codeProf[1].'/'.$index->codeProf[2].'/'.$index->md5Key.'/isInactive.txt',"r");  
    // On récupère la date de dernière modif du fichier qui génère les index
    $dateOfCreationSpace = fgets($f);
    fclose($f);
    // si l'espace est inactif depuis 31 jours alors on supprime     
    $toDelete = (time() - $dateOfCreationSpace) > $intervalBeforeDeleteIfInactive ? true : false; 
    if ($toDelete) {
      recursiveRmdir($scoresDir.'/'.$index->codeProf[0]);      
    }
  };
  // On vérifie s'il y a des nouveaux VIPs et on les crée le cas échéant
  // On récupère tous les codes profs actuels
  $actualsCodeProf = [];
  foreach ($decodedPathsToIndexes as $index) {      
    array_push($actualsCodeProf,$index->codeProf);
  };
  // On récupère les codes profs des VIPs via le contenu du fichier dans une variable
  $dataVips = file_get_contents('./json/scoresCodesVip.json'); 
  // on décode le flux JSON et on accède à ce qu'on veut, ici les VIPs !
  $allVips = json_decode($dataVips)->vips;
  // Une variable pour savoir s'il faut refaire le mailing
  $isMailVipsNeeded = false;
  // On vérifie si les codes VIPs existent
  foreach ($allVips as $vip) {
    // Si le codes VIP n'existe pas, on crée l'espace et on envoie le mail
    if (!in_array($vip->codeProf,$actualsCodeProf)) {
      $isMailVipsNeeded = true;
      $pathToCreate = $scoresDir.'/'.$vip->codeProf[0].'/'.$vip->codeProf[1].'/'.$vip->codeProf[2].'/'.$vip->md5Key;
      mkdir($pathToCreate, 0775, true);
      // On crée la page d'index pour l'espace
      // Une fois tout ça créer,
      // On va créer un fichier index.php qui va bien pour afficher tout ce qu'on veut
      createIndexScores($pathToCreate,$vip->codeProf[0].$vip->codeProf[1].$vip->codeProf[2]);
    }
  };
  // Si il faut on fait le mailing au VIPs
  if ($isMailVipsNeeded) {
    mailUrlToVips('./json/scoresCodesVip.json');
  };
};  

echo json_encode(array(
    "msg" => $msg . "\r\n" . $msgVip. "\r\n" . $msgCron . "\r\n" . $mailingVip,
    "timeLeft" => $currentInterval,
    "timeSinceCreation" => number_format($timeSinceCreation, 0, ',', ' '),
    "deleteNextDate" => $deleteNextDate,
    "currentDate" => "$currentDay / $currentMonth / $currentYear",
  ));    
?>