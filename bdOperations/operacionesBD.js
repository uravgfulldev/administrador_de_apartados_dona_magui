import { User, Comida, Platillo, Apartado } from "./objetosDominio.js";

var xhttp;
var usuario = new User("LGCR", "Luis Gonzalo Cervantes Rivera", "luis.cervantes228549@potros.itson.edu.mx", "LGCR1234");
//var comida; = new Comida(2, "Carne en su jugo", "assets\\images\\Comidas\\carneEnSuJugo.jpg", "Lunes", 1, "Carne en su jugo", 75.0, 19);
//var platillo; = new Platillo(2, comida, "2023-03-20 16:00:00", true);

export function registrarApartado(nombreComida, hora, paraLlevar) {
    if (!verificarDisponibilidad(nombreComida)) {
        alert(nombreComida + "ya no se encuentra disponible");
        return;
    }

    var hoy = formatoFecha(new Date(), 'yyyy-mm-dd');
    var hoyHora = hoy + " " + hora + ":00:00";

    var idPlatillo = registrarPlatillo(nombreComida, hoyHora, paraLlevar);

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_platillo=" + idPlatillo + "&id_usuario=" + usuario.getUserName());

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    }
}

function verificarDisponibilidad(nombreComida) {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true);
    xhttp.send("nombre_comida=" + nombreComida);

    var stock = xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            return this.responseText != 0;
        }
    }

    return stock;
}

function registrarPlatillo(nombreComida, hora, paraLlevar) {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_comida=" + nombreComida + "&hora=" + hora + "&para_llevar=" + paraLlevar);

    var idComida = xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);

            if (this.responseText == "Ha ocurrido un error!!!") {
                alert(this.responseText);
            } else {
                return parseInt(this.responseText);
            }
        }
    }

    return idComida
}

export function cancelarApartado() {
    var nombreCliente = "Luis Gonzalo Cervantes Rivera";
    var nombreComida = "Carne en su jugo";
    var estado = "Cancelado";

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_cliente=" + nombreCliente + "&nombre_comida=" + nombreComida + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
            //TODO: editar celda de estado
        }
    }
}

export function filtrarApartados() {
    //TODO: everything
}

export function entregarApartado() {
    var nombreCliente = "Luis Gonzalo Cervantes Rivera"; //document.getElementById("").value;
    var nombreComida = "Carne en su jugo"; //document.getElementById("").value;
    var estado = "Entregado";

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_cliente=" + nombreCliente + "&nombre_comida=" + nombreComida + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
            //TODO: editar celda de estado
        }
    }
}

export function obtenerApartados() {
    const hoy = new Date();
    var hoyFormato = formatoFecha(hoy, 'yyyy-mm-dd');
    console.log(hoyFormato);

    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true)
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

            var columnasTabla = "";

            for (let i = 0; i < data.length; i++) {
                //TODO: get variables
            }

            //TODO: poner id de tabla
            document.getElementById("").innerHTML = columnasTabla;
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