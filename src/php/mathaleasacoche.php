<!-- On affiche le contenu de alacarte -->
<?php readfile('https://coopmaths.fr/alacarte.html'); ?>

<!-- SACoche donne l'URL du fichier json avec ?json=http... -->
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
   const tableauSACoche = <?php echo $file_data ?>;
   // on récupère le contenu du tableau json dans notre variable JS

   // pour tous les élèves qui sont dans le tableau panier...
  let texte_des_demandes = ''
  if (Object.keys(tableauSACoche.panier).length>1){
    for (const numeroEleve in tableauSACoche.panier) {
        texte_des_demandes += `${tableauSACoche.eleve[numeroEleve].nom};${tableauSACoche.eleve[numeroEleve].prenom}`;
        
        for (let i = 0; i < Object.keys(tableauSACoche.panier[numeroEleve]).length; i++) {
        texte_des_demandes += ';' + tableauSACoche.item[Object.keys(tableauSACoche.panier[numeroEleve])[i]].ref
        }
        texte_des_demandes += '\n'
    }
  } else {
    for (let i = 0; i < Object.keys(tableauSACoche.item).length; i++) {
        texte_des_demandes += tableauSACoche.item[Object.keys(tableauSACoche.item)[i]].ref + ' ; '
        }
    document.getElementById('style3').checked = true; //Passe en style item1 ; item2 ; item3...
  }
  
  document.getElementById('textarea_id_items').value = texte_des_demandes
 </script>