<?php
/**
 * =============================================================================================================================
 *
 * Classe perso pour créer des archives ZIP à l'aide de la classe ZipArchive de PHP
 * @author Sébastien LOZANO
 * 
 * =============================================================================================================================
*/

    // On crée la classe
    class myZipClass {
        // On déclare les variables privées
        private $folderToZip;          // Le répertoire à zipper
        private $zipName;              // Le nom du zip (optionnel) par défaut : archive
        private $zipFolder;            // Le répertoire dans lequel on va sauver le zip (optionnel) par défaut : zip
        private $zip;                  // Pour instancier la classe

        // On peut vouloir exclure des choses
        // Des fichiers à exclure
        private $excludeFiles = array();
    
        // Des fichiers particulier à exclure de chaque dossier
        private $excludeFilesAllFolders = array();
    
        // Des dossiers à exclure
        private $excludeFolders = array();
    
        // Des extentions à exclure
        private $excludeExt = array();

        /**
         * ============================================================================================================================= 
         * LE CONSTRUCTEUR
         * ============================================================================================================================= 
         * 
         * @param string $folderTozip - Le répertoire à zipper
         * @param string $zipName - Le nom du zip (optionnel) par défaut : archive
         * @param string $zipFolder - Le répertoire dans lequel on va sauver le zip (optionnel) par défaut : zip
        */
        
        function __construct($folderToZip, $zipName = NULL, $zipFolder = NULL){
    
            // On instancie la classe
            $this->zip = new ZipArchive();
        
            // Nom du zip : par défaut archive-Ymd-Hi.zip (horodatage)
            $this->zipName = ($zipName != "") ? $zipName : 'archive';
            $this->zipName = $this->zipName.'-'.date("Ymd-Hi").'.zip';
        
            // Chemin du répertoire
            $this->folderToZip = $folderToZip;
        
            // On valide le chemin spécifié : si c'est bien un dossier
            if (! is_dir($this->folderToZip)) return exit;
        
            // Nom du répertoire qui va contenir les zip : par défaut zip
            $this->zipFolder = ($zipFolder != "") ? $zipFolder : 'zip';
        
            // Si le dossier n'existe pas, on le crée
            if(!file_exists($this->zipFolder)) mkdir($this->zipFolder,0775,true);
                    
            // On crée une nouvelle archive
            if(! $this->zip->open($this->zipFolder.'/'.$this->zipName, ZipArchive::CREATE) == TRUE) return;
        }

        /**
         * ============================================================================================================================= 
         * LES MÉTHODES
         * 
         * Toutes sont déclarées en public car on en aura besoin en dehors de la classe
         * 
         * ============================================================================================================================= 
        */

        /**
         * Ajouter un nom de fichier à exclure
         * bien spécifier le chemin du fichier
         * @param array $filenames
        */
        public function excludeFiles($filenames) {
            foreach ($filenames as $value) {
                $this->excludeFiles[] = $this->folderToZip.$value;
            }
        }
        
        /**
         * Ajouter un nom de fichier à exclure de tous les dossiers
         * 
         * @param array $allFilenames 
        */
            
        public function excludeFilesAllFolders($allFilenames) {
            $this->excludeFilesAllFolders = $allFilenames;
        }
        
        /**
         * Ajouter un répertoire à exclure
         * 
         * @param array $dir
        */
        
        public function excludeFolders($dir) {
            foreach ($dir as $value) {
                $this->excludeFolders[] = $this->folderToZip.$value;
            }
        }
        
        /**
         * Ajouter une extension à exclure
         * 
         * @param $ext
        */ 
        public function excludeExt($ext) {
            $this->excludeExt = $ext;
        }

        /**
         * Création du zip + téléchargement
         * 
         * @param boolean $download, on propose le téléchargement si $download est à true
         * @param boolean $delete, on supprime après téléchargement si $delete est à true
         * @param boolean $isScores, pour ajouter les fichiers au bon endroit + le master de Guillaume quand on zip des scores
        */
       
        public function createZip($download = false, $delete = false, $isScores = false) {
        
            if ($isScores) {
                $this->zip->addFile('./assets/ods/Scores_MathAlea.ods','Scores_MathAlea.ods');
                $this->addDir($this->folderToZip,true);
            } else {
                $this->addDir($this->folderToZip);
            }            

            // On ferme le zip
            $this->zip->close();
        
            // Si $download est à true on propose le zip à télécharger
            if($download === true){
                header('Content-type: application/zip'); // on indique que c'est une archive
                header('Content-Transfer-Encoding: fichier'); // transfert en binaire (fichier)
                header('Content-Disposition: attachment; filename="'.$this->zipName);
                header('Content-Length: '.filesize($this->zipFolder.'/'.$this->zipName));
                header('Pragma: no-cache'); 
                header('Expires: 0');
                readfile($this->zipFolder.'/'.$this->zipName);
        
                // Si $delete est à true, on supprime le fichier après l'avoir téléchargé
                if($delete === true) unlink($this->zipFolder.'/'.$this->zipName);
            }
        }
        
        /**
         * Ajoute tous les fichiers d'un répertoire à l'archive
         * 
         * @param string $path 
         * @param boolean $isScores, pour ajouter les fichiers au bon endroit + le master de Guillaume quand on zip des scores
        */
        
        private function addDir($path, $isScores = false) {
    
            // On lit les fichiers et on exclut . et .. de la liste        
            $files = array_diff(scandir($path), array('..', '.'));
    
            foreach($files as $file){
                // On teste si le fichier est un dossier
                if(is_dir($path.$file)) {
                    // Si le dossier ne se trouve pas dans les dossiers exclus
                    // On appelle de nouveau la méthode addDir avec en paramètre le nouveau dossier
                    if ( !in_array($path.$file.'/', $this->excludeFolders) )
                        if ($isScores) {
                            $this->addDir($path.$file.'/',true);
                        } else {
                            $this->addDir($path.$file.'/');
                        }                        
                } else {
                    // Si le fichier ne se trouve pas dans les fichiers exclus
                    // Si l'extension ne se trouve pas les extensions exclues
                    // Si le fichier ne se trouve pas les fichiers exclus de tous les dossiers
                    // On l'ajoute à l'archive
                    if ( (!in_array($path.$file, $this->excludeFiles)) && (!in_array(pathinfo($file, PATHINFO_EXTENSION), $this->excludeExt)) && (!in_array($file, $this->excludeFilesAllFolders)) )
                        // Le second argument (optionnel) permet de ne pas garder l'arborescence d'origine
                        if ($isScores) {
                            $this->zip->addFile($path.$file,'Fichiers semaines/'.substr($path,-3,-1).'-'.$file);
                        } else {
                            $this->zip->addFile($path.$file,substr($path,-3,-1).'-'.$file);
                        }
                }
            }
        }
    }
    // That's all folks !!!

?>