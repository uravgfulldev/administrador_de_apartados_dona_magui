var xhtml;

function registrarApartado() {
    //TODO: obtener los datos necesarios para realizar el apartado

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "assets\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText)
        }
    }

    //TODO: enviar los datos para realizar el apartado a la bd
}

function cancelarApartado() {
    //TODO: everything
}

function filtrarApartados() {
    //TODO: everything
}

function entregarApartado() {
    //TOD: everything
}

function obtenerApartados() {
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "assets\\php\\getData.php", true)
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

            var columnasTabla = "";

            for (var i = 0; i < data.length; i++) {
                //TODO: get variables
            }

            //TODO: poner id de tabla
            document.getElementById("").innerHTML = columnasTabla;
        }
    }
}