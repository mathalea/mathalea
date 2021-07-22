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
          <?php
              echo 'Hello World !';
          ?>              
      </body>
  </html>
  ");
  fclose($fp); 
};
?>