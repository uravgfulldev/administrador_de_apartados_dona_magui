import { User, Comida, Platillo, Apartado } from "./objetosDominio.js";

var xhttp;
var usuario = new User("LGCR", "Luis Gonzalo Cervantes Rivera", "luis.cervantes228549@potros.itson.edu.mx", "LGCR1234");
//var comida; = new Comida(2, "Carne en su jugo", "assets\\images\\Comidas\\carneEnSuJugo.jpg", "Lunes", 1, "Carne en su jugo", 75.0, 19);
//var platillo; = new Platillo(2, comida, "2023-03-20 16:00:00", true);

/**
 * Función que se encarga de registrar el apartado del cliente en la base
 * de datos.
 * 
 * @param {string} nombreComida nombre de la comida a apartar
 * @param {number} hora hora en la que se planea recoger
 * @param {boolean} paraLlevar Si la comida será para llevar o no
 */
export function registrarApartado(nombreComida, hora, paraLlevar) {
    //primero verificamos si la comida todavía se encuentra disponible
    if (!verificarDisponibilidad(nombreComida)) {
        //en el caso de que no esté disponible se le muestra una alerta al
        //usuario indicandole eso
        alert(nombreComida + "ya no se encuentra disponible");
        return;
    }

    //Obtenemos la fecha del día de hoy y la escribimos al formato yyyy-mm-dd
    //para que sea compatible con mysql, después le agregamos la hora para tener
    //tanto el día como la hora. Más adelante será modificado para obtener la fecha
    //del día en que la comida aparece en el menú
    var hoy = formatoFecha(new Date(), 'yyyy-mm-dd');
    var hoyHora = hoy + " " + hora + ":00:00";

    //Primero registramos el platillo en la base de datos para poder relacionarlo
    //con el cliente
    var idPlatillo = registrarPlatillo(nombreComida, hoyHora, paraLlevar);

    //Realizamos el request para enviar los datos al archivo insertData.php el cual
    //se encargará de registrar el apartado en la base de datos
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_platillo=" + idPlatillo + "&id_usuario=" + usuario.getUserName());

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //Si se logró realizar el request se le mostrará un mensaje al usuario
            //con el mensaje que el archivo php envió
            alert(this.responseText);
        }
    }
}

/**
 * Función que se encarga de cambiar el estado de un pedido ha "Cancelado".
 * 
 * @param {string} nombreCliente nombre del cliente que realizó el apartado
 * @param {string} nombreComida nombre de la comida que el cliente apartó
 */
export function cancelarApartado(nombreCliente, nombreComida) {
    var estado = "Cancelado";

    //Preparamos una petición con el método POST para enviar el nombre del cliente,
    //de la comida y el nuevo estado del pedido al archivo editData.php
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_cliente=" + nombreCliente + "&nombre_comida=" + nombreComida + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //Una vez realizado todo se le hace saber al usuario que el pedido ha sido cancelado
            alert(this.responseText);
            mostrarTablaApartados();
        }
    }
}

/**
 * Función que se encarga de filtrar los apartados de la base de datos a partir
 * del nombre del cliente proporcionado
 * 
 * @param {string} nombreCliente nombre del cliente para filtrar
 */
export function filtrarApartados(nombreCliente) {
    //Creamos una nueva petición con el método GET y enviamos el nombre
    //del cliente como parámetros al archivo getData.php
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true);
    xhttp.send("nombre_completo=" + nombreCliente);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //obtenemos los datos y los convertimos al tipo JSON
            var data = JSON.parse(this.responseText);
            console.log(data);

            //y los mandamos a esta función para recargar la tabla
            mostrarTablaApartados(data);
        }
    }
}

/**
 * Función que se encarga de cambiar el estado de un pedido ha "Entregado".
 * 
 * @param {string} nombreCliente nombre del cliente que realizó el apartado
 * @param {string} nombreComida nombre de la comida que el cliente apartó
 */
export function entregarApartado(nombreCliente, nombreComida) {
    var estado = "Entregado";

    //Preparamos una petición con el método POST para enviar el nombre del cliente,
    //de la comida y el nuevo estado del pedido al archivo editData.php
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_cliente=" + nombreCliente + "&nombre_comida=" + nombreComida + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //Una vez realizado todo se le hace saber al usuario que el pedido ha sido entregado
            alert(this.responseText);
            obtenerApartados();
        }
    }
}

export function obtenerApartados() {
    //const hoy = new Date();
    //var hoyFormato = formatoFecha(hoy, 'yyyy-mm-dd');
    //console.log(hoyFormato);

    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true)
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

            mostrarTablaApartados(data);
        }
    }
}

function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/dd|mm|yyyy/gi, matched => map[matched]);
}

/**
 * Verifica la disponibilidad de una comida del menú.
 * 
 * @param {string} nombreComida nombre de la comida a verificar
 * @returns el total disponible del stock de la comida
 */
function verificarDisponibilidad(nombreComida) {
    //Creamos un request con el método GET para el archivo getData.php
    //el cual obtendrá el stock de la comida a buscar que está en la base
    //de datos
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true);
    xhttp.send("nombre_comida=" + nombreComida);

    //testing pendiente para ver si es de esta forma que funciona el return
    //con onreadystatechange xd
    var stock = xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //enviamos el response a la consola para hacer tests
            console.log(this.responseText);
            return this.responseText != 0;
        }
    }

    return stock;
}

/**
 * Registra el platillo en la base de datos.
 * 
 * @param {string} nombreComida nombre de la comida a apartar
 * @param {string} hora hora en la que será recogida
 * @param {boolean} paraLlevar si es para llevar o no
 * @returns el id del platillo que se acaba de registrar en la base de datos
 */
function registrarPlatillo(nombreComida, hora, paraLlevar) {
    //Creamos un request con el método POST para el archivo insertData.php
    //el cual instertará en la base de datos
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_comida=" + nombreComida + "&hora=" + hora + "&para_llevar=" + paraLlevar);

    //testing pendiente para ver si es de esta forma que funciona el return
    //con onreadystatechange xd
    var idPlatillo = xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);

            //Si el response text es un mensaje de error se le hace saber al usuario
            //en caso contrario se regresa el id del platillo registrado
            if (this.responseText == "Ha ocurrido un error!!!") {
                alert(this.responseText);
            } else {
                return parseInt(this.responseText);
            }
        }
    }

    return idPlatillo
}

/**
 * 
 * @param {*} apartados 
 */
function mostrarTablaApartados(apartados) {
    //TODO: everything
}