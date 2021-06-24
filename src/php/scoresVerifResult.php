<?php
// TODO
// => Problème de la duplication des requetes, ne semble pas se produire sur exercice.html mais sur mathalea avec 6C10 par exemple
// => 
// => Vérifier/Nettoyer les variables qui arrivent du client
// => Gestion d'un feedback d'erreur sur le format du userId
// =>OK=> Placement de la variable $keypass cf post de Rémi
// => Suppression des espaces userId trop vieux, On garde 15 jours un autre délai qu'on pourra adapter,
// la routine de nettoyage serait lancée à chaque requete 

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  // On reçoit les données brutes du post.
  $content = trim(file_get_contents("php://input"));
  
  // On utilise la notation fléchée pour l'accès aux données décodées du string json 
  // Si on utilise $decoded = json_decode($content,true); l'accès se fait par index de tableau array["ttt"]  
  $decoded = json_decode($content);  
  echo $decoded->myObj->clef;
  // On génère la date et l'heure
  $date = date('d/m/Y');
  setlocale(LC_TIME, 'fr_FR');
  date_default_timezone_set("Europe/Paris");
  $currentDate = utf8_encode($date);
  $currentTime = utf8_encode(strftime('%H:%M'));

  // On prévoit une variable vide avec les erreurs éventuelles
  $errors = "";
  // Il faut créer le répertoire sur le serveur s'il n'existe pas
  // On récupère les 3 premières lettres du userId pour créer l'arboresscence
  $lettre1 = $decoded->myObj->userId[0];
  $lettre2 = $decoded->myObj->userId[1];
  $lettre3 = $decoded->myObj->userId[2];
  $chiffre1 = $decoded->myObj->userId[3];
  $chiffre2 = $decoded->myObj->userId[4];
  $path = './resultats/'.$lettre1.'/'.$lettre2.'/'.$lettre3.'/'.$chiffre1.'/'.$chiffre2;
  // On génère une nouvelle clef uniquement si l'arborescence n'existe pas
  // Sinon on récupère la clef dans le nom du fichier on verra plus tard s'il y a plusieurs fichiers
  if (!file_exists($path)) {
    $errors = "Ce userId n'existe pas - scoresVerifResult.php\r\n";
    // mkdir($path, 0775, true);
    // // On génère une clef
    // $keypass = md5(uniqid(rand(), true));
    // // On crée le sous-repertoire
    // mkdir($path.'/'.$keypass, 0775, true);
  } else {
    if (sizeof(scandir($path))>2) {// S'il y a déjà un sous-dossier son nom est le keypass à recuperer pour les enregistrements
      //$keypass = substr(scandir($path)[2],0,-10);
      $keypass = scandir($path)[2];
    } else {
      $keypass = md5(uniqid(rand(), true));
      // On crée le sous-repertoire
      mkdir($path.'/'.$keypass, 0775, true);
    };        
  };  

  // Il faut créer le fichier de stockage s'il n'existe pas à partir de la clef  
  $pathToFile = $path.'/'.$keypass.'/scores.csv';  
  
  // On ouvre le fichier
  $fp = fopen($pathToFile, 'a+');      
  // S'il n'existe pas on crée l'entete et on ajoute les données
  if (strlen(file_get_contents($pathToFile))==0) {
    fputs($fp, "idUser,idExo,nbBonnesReponse,nbQuestions,date,heure \r\n");  
  };
  fputs($fp, $decoded->myObj->userId.','.$decoded->myObj->refEx.','.$decoded->myObj->nbBonnesReponses.','.$decoded->myObj->nbQuestions.','.$currentDate.','.$currentTime."\r\n");  
  fclose($fp);

  echo json_encode(array(
    "url" => $pathToFile,//$path.'/'.$keypass.'/scores.csv',
    "userId" => $lettre1.$lettre2.$lettre3.$chiffre1.$chiffre2,
    "errors" => $errors
  ));  

  // Si json_decode échoue, le JSON est invalide.
  if(! is_array($decoded)) {

  } else {
    // On peut envoyer un message d'erreur à l'utilisateur
  }
}
?>