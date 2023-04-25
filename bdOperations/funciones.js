var xhttp;
var usuario = {
    "username": "HGH",
    "nombreCompleto": "Luis Gonzalo Cervantes Rivera",
    "correo": "luis.cervates228549@potros.itson.edu.mx",
    "password": "LGCR1234"
};
var encabezados = ["", "Cliente", "Comida", "Día", "Hora", "¿Para llevar?", "Estado"];

/**
 * Función que se encarga de registrar el apartado del cliente en la base
 * de datos.
 * 
 * @param {string} nombreComida nombre de la comida a apartar
 * @param {string} hora hora en la que se planea recoger
 * @param {boolean} paraLlevar Si la comida será para llevar o no
 */
function registrarApartado(nombreComida, hora, paraLlevar) {
    if (!confirm("¿Estás seguro de apartar esta comida?")) {
        return;
    }

    //primero verificamos si la comida todavía se encuentra disponible
    //Creamos un request con el método GET para el archivo getData.php
    //el cual obtendrá el stock de la comida a buscar que está en la base
    //de datos
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\getData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_comida=" + nombreComida);

    //testing pendiente para ver si es de esta forma que funciona el return
    //con onreadystatechange xd
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //enviamos el response a la consola para hacer tests
            //console.log(this.responseText);
            var stock = parseInt(this.responseText);

            if (stock === 0) {
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
            var hoyHora = hoy + " " + hora;
            stock--;

            //Primero registramos el platillo en la base de datos para poder relacionarlo
            //con el cliente
            //Creamos un request con el método POST para el archivo insertData.php
            //el cual instertará en la base de datos
            xhttp = new XMLHttpRequest();
            xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("nombre_comida=" + nombreComida + "&hora=" + hoyHora + "&para_llevar=" + paraLlevar + "&stock=" + stock);

            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(this.responseText);

                    //Si el response text es un mensaje de error se le hace saber al usuario
                    //en caso contrario se regresa el id del platillo registrado
                    if (this.responseText == "Ha ocurrido un error!!!") {
                        alert(this.responseText);
                    } else {
                        var idPlatillo = parseInt(this.responseText);

                        //Realizamos el request para enviar los datos al archivo insertData.php el cual
                        //se encargará de registrar el apartado en la base de datos
                        xhttp = new XMLHttpRequest();
                        xhttp.open("POST", "bdOperations\\php\\insertData.php", true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.send("id_platillo=" + idPlatillo + "&id_usuario=" + usuario.username);

                        xhttp.onreadystatechange = function() {
                            if (this.readyState === 4 && this.status === 200) {
                                //Si se logró realizar el request se le mostrará un mensaje al usuario
                                //con el mensaje que el archivo php envió
                                alert(this.responseText);
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * Función que se encarga de cambiar el estado de un pedido ha "Cancelado".
 * 
 * @param {string} nombreCliente nombre del cliente que realizó el apartado
 * @param {string} nombreComida nombre de la comida que el cliente apartó
 */
function cancelarApartado(nombreCliente, nombreComida) {
    if (!confirm("¿Estás seguro de cancelar este apartado?")) {
        return;
    }

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
            obtenerApartados();
        }
    }
}

/**
 * Función que se encarga de filtrar los apartados de la base de datos a partir
 * del nombre del cliente proporcionado
 * 
 * @param {string} nombreCliente nombre del cliente para filtrar
 */
function filtrarApartados(nombreCliente) {
    //Creamos una nueva petición con el método GET y enviamos el nombre
    //del cliente como parámetros al archivo getData.php
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\getData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("nombre_completo=" + nombreCliente);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //obtenemos los datos y los convertimos al tipo JSON
            var data = JSON.parse(this.responseText);
            console.log(data);

            borraHijos("area-tabla");

            //y los mandamos a esta función para recargar la tabla
            mostrarTablaApartados("area-tabla", encabezados, data);
        }
    }
}

/**
 * Función que se encarga de cambiar el estado de un pedido ha "Entregado".
 * 
 * @param {string} nombreCliente nombre del cliente que realizó el apartado
 * @param {string} nombreComida nombre de la comida que el cliente apartó
 */
function entregarApartado(nombreCliente, nombreComida) {
    if (!confirm("¿Estás seguro de entregar este apartado?")) {
        return;
    }

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

function obtenerApartados() {
    //const hoy = new Date();
    //var hoyFormato = formatoFecha(hoy, 'yyyy-mm-dd');
    //console.log(hoyFormato);

    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "bdOperations\\php\\getData.php", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            
            borraHijos("area-tabla");
            mostrarTablaApartados("area-tabla", encabezados, data);
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
 * Función para crear la tabla de apartados dado un elemento padre del front,
 * un arreglo de encabezados y otro de los apartados.
 * 
 * @param {string} padreID elemento HTML donde se verá la tabla, lo más seguro es
 * que sea un div
 * @param {*} encabezados encabezados de la tabla
 * @param {*} apartados apartados con los que se llenará la tabla
 */
function mostrarTablaApartados(padreID, encabezados, apartados) {
    var contador = 1;
    let padre = document.getElementById(padreID);

    let tabla = document.createElement("table");
    tabla.setAttribute("id", "tabla-apartados");
    tabla.setAttribute("class", "table");

    padre.appendChild(tabla);

    let head = document.createElement("thead");
    head.setAttribute("class", "thead-dark");
    tabla.appendChild(head);

    let renglonEncabezados = document.createElement("tr");
    renglonEncabezados.setAttribute("class", "table-light");
    head.appendChild(renglonEncabezados);

    for (let encabezado of encabezados) {
        let celdaEncabezado = document.createElement("th");
        celdaEncabezado.setAttribute("scope", "col");
        celdaEncabezado.innerHTML = encabezado;
        renglonEncabezados.appendChild(celdaEncabezado);
    }

    for (let apartado of apartados) {
        let renglon = document.createElement("tr");
        renglon.setAttribute("class", "table-light");
        tabla.appendChild(renglon);

        let celdaRadio = document.createElement("td");
        let radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "selec";
        radioButton.value = contador;
        celdaRadio.appendChild(radioButton);
        renglon.appendChild(celdaRadio);
        contador++;

        for (let llave in apartado) {
            let celda;

            if (llave == "nombre_completo") {
                celda = document.createElement("th");
                celda.setAttribute("scope", "row");
            } else {
                celda = document.createElement("td");
            }
            
            if (llave == "para_llevar" && apartado[llave] == 1) {
                celda.innerHTML = "Si";
            } else if (llave == "para_llevar" && apartado[llave] == 0) {
                celda.innerHTML = "No";
            } else {
                celda.innerHTML = apartado[llave];
            }
            
            renglon.appendChild(celda);
        }
    }
}

/**
 * Función para borrar los hijos de un elemento HTML. Solo se usará
 * para borrar la tabla de apartados.
 * 
 * @param {string} elemento elemento HTML con hijos a borrar.
 */
function borraHijos(elementoID) {
    let elemento = document.getElementById(elementoID);

    while (elemento.hasChildNodes()) {
        elemento.removeChild(elemento.firstChild);
    }
}

/**
 * 
 * @param {string} username 
 * @param {string} nombreCompleto 
 * @param {string} correo 
 * @param {string} password 
 */
function registrarUsuario(username, nombreCompleto, correo, password) {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "bdOperations\\php\\getData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&nombre_completo=" + nombreCompleto + "&correo=" + correo + "&password=" + password);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    }
}

function logIn(username, password) {
    
}