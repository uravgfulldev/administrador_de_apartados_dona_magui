<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['nombre_comida']) && isset($_POST['hora']) && isset($_POST['para_llevar'])) {
    $nombreComida = $_POST['nombre_comida'];
    $hora = $_POST['hora'];
    $paraLlevar = $_POST['para_llevar'];
    $idUsuario = $_POST['id_usuario'];

    $sql = "SELECT `comidas`.`id_comida` FROM `apartados_dona_magui`.`comidas`; WHERE `comidas`.`nombre`;";
    $result = mysqli_query($conn, $result);

    $idComida = mysqli_fetch_column($result);

    $sql2 = "INSERT INTO `apartados_dona_magui`.`platillos` (`id_comida`, `hora`, `para_llevar`) VALUES ('$idComida', '$hora', '$paraLlevar');";
    $result2 = mysqli_query($conn, $sql2);

    if ($result2 == true) {
        $sql3 = "SELECT `p`.`id_platillo`
        FROM `apartados_dona_magui`.`platillos` as p 
        WHERE `p`.`id_comida` = '$idComida' AND `p`.`hora` = '$hora' AND `p`.`para_llevar` = '$paraLlevar';";
    
        $result3 = mysqli_query($conn, $sql3);

        $idPlatillo = mysqli_fetch_column($result3);

        echo $idPlatillo;
    } else {
        echo "Ha ocurrido un error!!!";
    }
}

if (isset($_POST['id_platillo']) && isset($_POST['id_usuario'])) {
    $idPlatillo = $_POST['id_platillo'];
    $idUsuario = $_POST['id_usuario'];
    $estado = "Pendiente";

    $sql = "INSERT INTO `apartados_dona_magui`.`apartados` (`id_platillo`, `id_cliente`, `estado`) VALUES ('$idPlatillo', '$idUsuario', '$estado');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Su apartado ha sido registrado!";
    }
}
?>