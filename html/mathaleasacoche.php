<!-- SACoche donne l'URL du fichier json avec json... -->


<?php
  header('Content-Type: text/html; charset=utf-8');
  if(isset($_GET['json']))
  {
    $file_data = file_get_contents($_GET['json']);
    $array_data = json_decode($file_data,TRUE);
  }
 ?>

 <!-- Le contenu du json est sauvegardé dans $array_data -->


 <script type="text/javascript">   
   let json = <?php echo $file_data ?>;
   // on récupère le contenu du tableau json dans notre variable JS

   // pour tous les élèves qui sont dans le tableau panier...
   for (const numeroEleve in json.panier) {
  console.log(`${json.eleve[numeroEleve].nom} ${json.eleve[numeroEleve].prenom}: ${json.panier[numeroEleve]}`);
}
 </script>


<!-- On affiche le contenu de alacarte -->
 <?php include('alacarte/index.html'); ?>

