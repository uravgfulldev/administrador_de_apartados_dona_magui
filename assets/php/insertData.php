<?php

if (isset($_POST['user_name']) && isset($_POST['nombre_completo']) && isset($_POST['correo']) && isset($_POST['password'])) {
    $userName = $_POST['user_name'];
    $nombreCompleto = $_POST['nombre_completo'];
    $correo = $_POST['correo'];
    $password = $_POST['password'];

    $passwordEncriptada = password_hash($password, PASSWORD_DEFAULT);

    $conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");
    $sql = "INSERT INTO `apartados_dona_magui`.`usuarios` (`username`, `nombre_completo`, `correo`, `password`) VALUES ('$userName', '$nombreCompleto', '$correo', '$passwordEncriptada');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Usuario registrado";
    }
}

if (isset($_POST['nombre']) && isset($_POST['dia']) && isset($_POST['menu']) && isset($_POST['descripcion']) && isset($_POST['precio'])) {
    $nombre = $_POST['nombre'];
    $dia = $_POST['dia'];
    $menu = $_POST['menu'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    $conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");
    $sql = "INSERT INTO `apartados_dona_magui`.`comidas` (`nombre`, `dia`, `menu`, `descripcion`, `precio`) VALUES ('$nombre', '$dia', '$menu', '$descripcion', '$precio');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Comida registrada";
    }
}

if (isset($_POST['id_comida']) && isset($_POST['hora']) && isset($_POST['para_llevar'])) {
    $idComida = $_POST['id_comida'];
    $hora = $_POST['hora'];
    $paraLlevar = $_POST['para_llevar'];

    $conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");
    $sql = "INSERT INTO `apartados_dona_magui`.`platillos` (`id_comida`, `hora`, `para_llevar`) VALUES ('$idComida', '$hora', '$paraLlevar');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Platillo registrado";
    }
}


?>