<?php
$xml = file_get_contents('php://input');
$fh = fopen('data/articulos.xml', 'w');
fwrite($fh, $xml);
fclose($fh);
