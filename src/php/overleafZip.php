<?php
/**
 * =============================================================================================================================
 * @author Sébastien LOZANO
 * 
 * =============================================================================================================================
 */

    // Une tite routine pour récupérer l'ip du visiteur
    function get_ip() {
        if($_SERVER) {
            if($_SERVER['HTTP_X_FORWARDED_FOR']) {
                $ipT = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } else if($_SERVER['HTTP_CLIENT_IP']) {
                $ipT = $_SERVER['HTTP_CLIENT_IP'];
            }  else {
                $ipT = $_SERVER['REMOTE_ADDR'];
            }
        } else {
            if(getenv('HTTP_X_FORWARDED_FOR')) {
                $ipT = getenv('HTTP_X_FORWARDED_FOR');
            } else if (getenv('HTTP_CLIENT_IP')) {
                $ipT = getenv('HTTP_CLIENT_IP');
            } else {
                $ipT = getenv('REMOTE_ADDR');
            }
        }
        
        return $ipT;
    };

    $error = ""; //error holder

    if(isset($_POST['createzip'])) {
                            
        $error .= "OK";
        
        $zip = new ZipArchive();
        $thisdir = "./fichierszip";
        $filename = "CoopmathsMathaleaAMC".time().".zip";

        // On supprime tout ce qui a plus de 1 minute
        $sec = 60; // Nombre de secondes                      
        
        if (is_dir($thisdir) ) {
            $handle=opendir($thisdir);
            while (false!==($file = readdir($handle))) {
                if ($file != "." && $file != ".." && $file != "automultiplechoice.sty" && $file != "Projet.zip" && $file != "ProjetCrashed.zip" && $file != "mathalea.tex") { 
                    $Diff = (time() - filectime("$thisdir/$file"));
                    if ($Diff > $sec) unlink("$thisdir/$file");
                }
            }
            closedir($handle);
        }
        

        if ($zip->open($thisdir.'/'.$filename, ZipArchive::CREATE)!==TRUE) {
            exit("Impossible d'ouvrir le fichier <$filename>\n");
        } else {

            $zip->open($thisdir.'/'.$filename, ZipArchive::CREATE);
            // On nettoie la chaine du formulaire pour éviter les injections
            $encoded_snip = $_POST['encoded_snip'];
            $encoded_snip = trim($encoded_snip);
            // $encoded_snip = stripslashes($encoded_snip);
            // $encoded_snip = htmlspecialchars($encoded_snip);

            $zip->addFromString("mathalea" . time().".tex", $encoded_snip);                   
            $zip->addFile($thisdir."/automultiplechoice.sty","/automultiplechoice.sty");
            echo "Nombre de fichiers : " . $zip->numFiles . "\n";
            echo "Statut :" . $zip->status . "\n";
            $zip->close();
            if(file_exists($thisdir.'/'.$filename)){
                echo "file exist";            
                if (get_ip()=='127.0.0.1') { // Si on est en local , on lance la routine de téléchargement
                    header('Content-type: application/zip'); // on indique que c'est une archive
                    header('Content-Transfer-Encoding: fichier'); // transfert en binaire (fichier)
                    header('Content-Disposition: attachment; filename="'.$thisdir.'/'.$filename.'"'); // nom de l'archive
                    header('Content-Length: '.filesize($thisdir.'/'.$filename)); // taille de l'archive
                    header('Pragma: no-cache'); 
                    header('Expires: 0');
                    header("location:$thisdir/$filename"); // redirection vers le téléchargement de l'archive en local
                    //header("location:https://www.overleaf.com/docs?snip_uri=https://coopmaths.fr/fichiers/images.zip"); // pour tester avec l'existant
                } else {
                    //$domaine = "https://coopmaths.fr";
                    $domaine = "http://mathalea.mathslozano.fr";
                    // header('Content-type: application/zip'); // on indique que c'est une archive
                    // header('Content-Transfer-Encoding: fichier'); // transfert en binaire (fichier)
                    // header('Content-Disposition: attachment; filename="'.$thisdir.'/'.$filename.'"'); // nom de l'archive
                    // header('Content-Length: '.filesize($thisdir.'/'.$filename)); // taille de l'archive
                    // header('Pragma: no-cache'); 
                    // header('Expires: 0');
                    //header("location:https://www.overleaf.com/docs?snip_uri=$domaine/$thisdir/$filename"); // pour passer à overleaf
                    header("location:https://www.overleaf.com/docs?snip_uri[]=$domaine/$thisdir/mathalea.tex&snip_uri[]=$domaine/$thisdir/automultiplechoice.sty"); // pour passer à overleaf
                    //header("location:https://www.overleaf.com/docs?snip_uri=https://coopmaths.fr/fichierszip/Projet.zip"); // pour tester avec l'existant
                }
            };
        };


    } else {
        $error .= "KO";
    }

?>