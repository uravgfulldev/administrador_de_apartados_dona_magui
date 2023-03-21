<?php

$conn = mysqli_connect("localhost", "root", "Luisgon10$", "apartados_dona_magui");

if (isset($_POST['user_name']) && isset($_POST['nombre_completo']) && isset($_POST['correo']) && isset($_POST['password'])) {
    $userName = $_POST['user_name'];
    $nombreCompleto = $_POST['nombre_completo'];
    $correo = $_POST['correo'];
    $password = $_POST['password'];

    $passwordEncriptada = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO `apartados_dona_magui`.`usuarios` (`username`, `nombre_completo`, `correo`, `password`) VALUES ('$userName', '$nombreCompleto', '$correo', '$passwordEncriptada');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Usuario registrado";
    }
}

if (isset($_POST['nombre']) && isset($_POST['img']) && isset($_POST['dia']) && isset($_POST['menu']) && isset($_POST['descripcion']) && isset($_POST['precio'])) {
    $nombre = $_POST['nombre'];
    $img = $_POST['img'];
    $dia = $_POST['dia'];
    $menu = $_POST['menu'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];

    $sql = "INSERT INTO `apartados_dona_magui`.`comidas` (`nombre`, `img`, `dia`, `menu`, `descripcion`, `precio`) VALUES ('$nombre', '$img', '$dia', '$menu', '$descripcion', '$precio');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Comida registrada";
    }
}

if (isset($_POST['id_comida']) && isset($_POST['hora']) && isset($_POST['para_llevar'])) {
    $idComida = $_POST['id_comida'];
    $hora = $_POST['hora'];
    $paraLlevar = $_POST['para_llevar'];

    $sql = "INSERT INTO `apartados_dona_magui`.`platillos` (`id_comida`, `hora`, `para_llevar`) VALUES ('$idComida', '$hora', '$paraLlevar');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Platillo registrado";
    }
}

//este if está disponible a cambios dependiendo de como se manejen los datos del apartado del lado del front
if (isset($_POST['id_platillo']) && isset($_POST['id_cliente'])) {
    $idPlatillo = $_POST['id_platillo'];
    $idCliente = $_POST['id_cliente'];
    $estado = "Pendiente";

    $sql = "INSERT INTO `apartados_dona_magui`.`apartados` (`id_platillo`, `id_cliente`, `estado`) VALUES ('$idPlatillo', '$idCliente', '$estado');";
    $result = mysqli_query($conn, $sql);

    if ($result == true) {
        echo "Pedido registrado";
    }
}
?>