<?php
$nombreTemporal=$_FILES['files']['tmp_name'];
$nombre=$_FILES['files']['name'];
move_uploaded_file($nombreTemporal,'images/imagesArticulos/'.$nombre);
