<?php

include_once 'zipClass.php';

$myfolder = $_GET["folder"];
 
// 1er argument : le dossier que l'on va zip
// 2e  argument : le nom du zip (optionnel) par défaut : archive
// 3e  argument : le dossier qui va save le zip (optionnel) par défaut : zip

$zip = new myZipClass($myfolder, 'scores-'.substr($myfolder,-3,-1), $myfolder.'/zip');
 
// On exclut certains fichiers
$zip->excludeFiles(array('dossier/fichierExclu','dossier/sousDossier/fichierAussiExclu'));
 
// On exclut tous les fichiers fichierExcluDeTousLesRepertoires.txt
$zip->excludeFilesAllFolders(array('fichierExcluDeTousLesRepertoires.txt'));
 
// On exclut l'extension mac
$zip->excludeExt(array('DS_Store'));
 
// On exclut certains dossiers
$zip->excludeFolders(array('dossierExclu1/', 'dossierExclu2/sousDossierExclu2/', 'dossierExclu3/.sousDossierCacheExclu3/'));

// On propose le téléchargement, On supprime l'archive après le téléchargement
$zip->createZip(true,true);

?>