<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['nombre_comida']) && isset($_POST['hora']) && isset($_POST['para_llevar']) && isset($_POST['stock'])) {
    $nombreComida = $_POST['nombre_comida'];
    $hora = $_POST['hora'];
    $paraLlevar = $_POST['para_llevar'];
    $stock = $_POST['stock'];

    $sql = "SELECT `comidas`.`id_comida` FROM `apartados_dona_magui`.`comidas` WHERE `comidas`.`nombre` = '$nombreComida';";
    $result = mysqli_query($conn, $sql);

    $idComida = mysqli_fetch_column($result, 0);

    $sql2 = "UPDATE `apartados_dona_magui`.`comidas` SET `stock` = '$stock' WHERE `id_comida` = '$idComida';";
    $result2 = mysqli_query($conn, $sql2);

    if ($result2 == true) {
        $sql3 = "INSERT INTO `apartados_dona_magui`.`platillos` (`id_comida`, `hora`, `para_llevar`) VALUES ('$idComida', '$hora', '$paraLlevar');";
        $result3 = mysqli_query($conn, $sql3);

        if ($result3 == true) {
            $sql4 = "SELECT `p`.`id_platillo`
            FROM `apartados_dona_magui`.`platillos` as p 
            WHERE `p`.`id_comida` = '$idComida' AND `p`.`hora` = '$hora' AND `p`.`para_llevar` = '$paraLlevar';";
    
            $result4 = mysqli_query($conn, $sql4);

            $idPlatillo = mysqli_fetch_column($result4, 0);

            echo $idPlatillo;
        } else {
            echo "No se registro el platillo";
        }
    }
} else if (isset($_POST['id_platillo']) && isset($_POST['nombre_completo'])) {
    $idPlatillo = $_POST['id_platillo'];
    $nombreCompleto = $_POST['nombre_completo'];
    $estado = "Pendiente";

    $getUsername = "SELECT `users`.`username` FROM `apartados_dona_magui`.`users` WHERE `users`.nombre_completo = '$nombreCompleto';";
    $result1 = mysqli_query($conn, $getUsername);

    $idUsuario = mysqli_fetch_column($result1, 0);

    $sql = "INSERT INTO `apartados_dona_magui`.`apartados` (`id_platillo`, `id_cliente`, `estado`) VALUES ('$idPlatillo', '$idUsuario', '$estado');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Su apartado ha sido registrado!";
    }
} else if (isset($_POST['username']) && isset($_POST['nombre_completo']) && isset($_POST['correo']) && isset($_POST['password']) && isset($_POST['telefono'])) {
    $username = $_POST['username'];
    $nombreCompleto = $_POST['nombre_completo'];
    $correo = $_POST['correo'];
    $password = $_POST['password'];
    $telefono = $_POST['telefono'];

    if ($telefono == null) {
        $sql = "INSERT INTO `apartados_dona_magui`.`users` (`username`, `nombre_completo`, `correo`, `password`) VALUES ('$username', '$nombreCompleto', '$correo', '$password');";
        $result = mysqli_query($conn, $sql);

        if ($result == true) {
            echo "Usuario registrado existosamente";
        }
    } else {
        $sql = "INSERT INTO `apartados_dona_magui`.`users` (`username`, `nombre_completo`, `correo`, `password`, `telefono`) VALUES ('$username', '$nombreCompleto', '$correo', '$password', '$telefono');";
        $result = mysqli_query($conn, $sql);

        if ($result == true) {
            echo "Usuario registrado existosamente";
        }
    }
}
?>