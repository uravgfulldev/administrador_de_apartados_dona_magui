<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['nombre_comida'])) {
    $nombre = $_POST['nombre_comida'];
    
    $sql = "SELECT `comidas`.`stock` FROM `apartados_dona_magui`.`comidas` WHERE `comidas`.`nombre` = '$nombre';";
    $result = mysqli_query($conn, $sql);

    $stock = mysqli_fetch_column($result);

    echo $stock;
} else if (isset($_POST['nombre_completo'])) {
    $nombreCompleto = $_POST['nombre_completo'];

    $sql = "SELECT `u`.`nombre_completo`, `c`.`nombre`, `c`.`dia`, `p`.`hora`, `p`.`para_llevar`, `a`.`estado`
    FROM `apartados_dona_magui`.`apartados` AS a
    INNER JOIN `apartados_dona_magui`.`users` AS u ON `a`.`id_cliente` = `u`.`username`
    INNER JOIN `apartados_dona_magui`.`platillos` AS p ON `a`.`id_platillo` = `p`.`id_platillo`
    INNER JOIN `apartados_dona_magui`.`comidas` AS c ON `p`.`id_comida` = `c`.`id_comida`
    WHERE `u`.`nombre_completo` = '$nombreCompleto';";
    $result = mysqli_query($conn, $sql);

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    $sql = "SELECT `u`.`nombre_completo`, `c`.`nombre`, `c`.`dia`, `p`.`hora`, `p`.`para_llevar`, `a`.`estado`
    FROM `apartados_dona_magui`.`apartados` AS a
    INNER JOIN `apartados_dona_magui`.`users` AS u ON `a`.`id_cliente` = `u`.`username`
    INNER JOIN `apartados_dona_magui`.`platillos` AS p ON `a`.`id_platillo` = `p`.`id_platillo`
    INNER JOIN `apartados_dona_magui`.`comidas` AS c ON `p`.`id_comida` = `c`.`id_comida`;";
    $result = mysqli_query($conn, $sql);

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>