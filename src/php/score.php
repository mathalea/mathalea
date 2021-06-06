<?php
if(isset($_POST['score'])) {
    $data = $_POST['score'];
    $fp = fopen('score.csv', 'a');
    fwrite($fp, $data);
    fclose($fp);
}
?>