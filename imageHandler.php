<?php
$ruta = filter_input(INPUT_GET, 'ruta');
$nombreTemporal=$_FILES['files']['tmp_name'];
$nombre=$_FILES['files']['name'];
move_uploaded_file($nombreTemporal,'images/'.$ruta.'/'.$nombre);
