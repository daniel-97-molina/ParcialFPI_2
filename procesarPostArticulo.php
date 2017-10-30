<?php
$xml = file_get_contents('php://input');
$fh = fopen('data/articulos.xml', 'w');
fwrite($fh, $xml);
fclose($fh);
$nombreTemporal=$_FILES['files']['tmp_name'];
$nombre=$_FILES['files']['name'];
move_uploaded_file($nombreTemporal, 'images/imagesArticulos'.$nombre);