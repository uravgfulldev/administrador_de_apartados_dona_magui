<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['id_apartado']) && isset($_POST['estado'])) {
    $idApartado = $_POST['id_apartado'];
    $estado = $_POST['estado'];

    $sql = "UPDATE `apartados_dona_magui`.`apartados` SET `estado` = '$estado' WHERE `id_apartado` = '$idApartado';";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        if ($estado == "Cancelado") {
            echo "Apartado cancelado";
        }
        
        if ($estado == "Entregado") {
            echo "Apartado entregado";
        }
    }
}
?>