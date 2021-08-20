<?php

include_once 'zipClass.php';

$myfolder = $_GET["folder"];
if (isset($_GET["allClasses"])) {
    $allClasses = true;
} else {
    $allClasses = false;
}

 
// 1er argument : le dossier que l'on va zip
// 2e  argument : le nom du zip (optionnel) par défaut : archive
// 3e  argument : le dossier qui va save le zip (optionnel) par défaut : zip

if ($allClasses) {
    $zip = new myZipClass($myfolder, 'scores-toutesLesCLasses', $myfolder.'/zip');
} else {
    $zip = new myZipClass($myfolder, 'scores-'.substr($myfolder,-3,-1), $myfolder.'/zip');
};

 
// On exclut certains fichiers
$zip->excludeFiles(array('dossier/fichierExclu','dossier/sousDossier/fichierAussiExclu'));
 
// On exclut tous les fichiers fichierExcluDeTousLesRepertoires.txt
$zip->excludeFilesAllFolders(array('fichierExcluDeTousLesRepertoires.txt'));
 
// On exclut l'extension mac
$zip->excludeExt(array('DS_Store'));

// On exclut l'extension php
$zip->excludeExt(array('php'));
 
// On exclut certains dossiers
$zip->excludeFolders(array('dossierExclu1/', 'dossierExclu2/sousDossierExclu2/', 'dossierExclu3/.sousDossierCacheExclu3/'));

// Note sur la methode createZip()
// premier booléen   -> on télécharge si il est à true
// deuxième booléen  -> on efface le fichier zip du serveur après téléchargment si il est à true
// troisième booléen -> on change l'arborescence si c'est un zip pour les scores

// On propose le téléchargement, On supprime l'archive après le téléchargement
$zip->createZip(true,true,true);

?>