<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_GET['id_usuario'])) {
    //do something
} else {
    $sql = "SELECT `apartados`.`id_apartado`, `apartados`.`id_platillo`, `apartados`.`id_cliente`, `apartados`.`estado` FROM `apartados_dona_magui`.`apartados`; ";
    $result = mysqli_query($conn, $sql);

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>