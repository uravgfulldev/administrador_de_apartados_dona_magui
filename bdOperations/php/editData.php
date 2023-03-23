<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['nombre_cliente']) && isset($_POST['nombre_comida']) && isset($_POST['estado'])) {
    $nombreCliente = $_POST['nombre_cliente'];
    $nombreComida = $_POST['nombre_comida'];
    $estado = $_POST['estado'];

    $sql = "SELECT `a`.`id_apartado`
    FROM `apartados_dona_magui`.`apartados` AS a
    INNER JOIN `apartados_dona_magui`.`users` AS u ON `a`.`id_cliente` = `u`.`username`
    INNER JOIN `apartados_dona_magui`.`platillos` AS p ON `a`.`id_platillo` = `p`.`id_platillo`
    INNER JOIN `apartados_dona_magui`.`comidas` AS c ON `p`.`id_comida` = `c`.`id_comida`
    WHERE `u`.`nombre_completo` = '$nombreCliente' AND `c`.`nombre` = '$nombreComida';";
    $result = mysqli_query($conn, $sql);

    $idApartado = mysqli_fetch_column($result);

    $sql2 = "UPDATE `apartados_dona_magui`.`apartados` SET `estado` = '$estado' WHERE `id_apartado` = '$idApartado';";
    $result2 = mysqli_query($conn, $sql2);

    if ($result2 == true) {
        if ($estado == "Cancelado") {
            echo "Apartado cancelado";
        }
        
        if ($estado == "Entregado") {
            echo "Apartado entregado";
        }
    }
}
?>