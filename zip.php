<?php
                  $error = ""; //error holder
                  if(isset($_POST['createzip'])) {                     
                    $error .= "OK";
                    
                    $zip = new ZipArchive();
                    $thisdir = "./fichierszip";
                    $filename = "test".time().".zip";

                    // On supprime tout ce qui a plus de 1 minute
                    $sec = 60; // Nombre de secondes                      
                    
                    if (is_dir($thisdir) )
                        {
                            $handle=opendir($thisdir);
                            while (false!==($file = readdir($handle))) {
                                if ($file != "." && $file != ".." && $file != "automultiplechoice.sty") { 
                                    $Diff = (time() - filectime("$thisdir/$file"));
                                    if ($Diff > $sec) unlink("$thisdir/$file");
                                }
                            }
                            closedir($handle);
                        }
                    

                    if ($zip->open($thisdir.'/'.$filename, ZipArchive::CREATE)!==TRUE) {
                        exit("Impossible d'ouvrir le fichier <$filename>\n");
                    }

                    // On nettoie la chaine du formulaire pour éviter les injections
                    $encoded_snip = $_POST['encoded_snip'];
                    $encoded_snip = trim($encoded_snip);
                    //$encoded_snip = stripslashes($encoded_snip);
                    //$encoded_snip = htmlspecialchars($encoded_snip);

                    $zip->addFromString("fichier" . time().".tex", $encoded_snip);                   
                    $zip->addFile($thisdir."/automultiplechoice.sty","/automultiplechoice.sty");
                    echo "Nombre de fichiers : " . $zip->numFiles . "\n";
                    echo "Statut :" . $zip->status . "\n";
                    $zip->close();
                    if(file_exists($thisdir.'/'.$filename)){
                        echo "file exist";
                    // On lance la routine de téléchargement
                    header('Content-type: application/zip'); // on indique que c'est une archive
                    header('Content-Transfer-Encoding: fichier'); // transfert en binaire (fichier)
                    header('Content-Disposition: attachment; filename="'.$thisdir.'/'.$filename.'"'); // nom de l'archive
                    header('Content-Length: '.filesize($thisdir.'/'.$filename)); // taille de l'archive
                    header('Pragma: no-cache'); 
                    header('Expires: 0');
                    header("location:$thisdir/$filename"); // redirection vers le téléchargement de l'archive pouyr le moment                    
                    //header("location:https://www.overleaf.com/docs?snip_uri=https://coopmaths.fr/$thisdir/$filename"); // pour passer à overleaf
                    //header("location:https://www.overleaf.com/docs?snip_uri=https://coopmaths.fr/fichiers/images.zip"); // pour tester avec l'existant
                    };

                  } else {
                    $error .= "KO";
                  }

              ?>