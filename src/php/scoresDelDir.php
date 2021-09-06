<?php
    // On inclut le scripts avec les outils
    require_once "scoresTools.php";

    
    if ( isset($_GET["folder"]) ) {
        $myfolderToDelete = $_GET["folder"];
        recursiveRmdir($myfolderToDelete);
        header('Location: '.substr($myfolderToDelete,0,-3));
    } elseif ( isset($_GET["file"]) ) {
        $myfileToDelete = $_GET["file"];
        unlink($myfileToDelete);
        header('Location: '.substr($myfileToDelete,0,-16));
    }; 
?>