<?php
//phpinfo();
//collect data send as XML
$xml = file_get_contents('php://input');
//open a file handler with read and write permission
$fh = fopen('data/usuarios4.xml', 'w');
//writing XML string to the new file
fwrite($fh, $xml);
//closing the file handler
fclose($fh);

