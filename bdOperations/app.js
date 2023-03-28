var botonEntregar = document.getElementById("btn-entregar");
var botonCancelar = document.getElementById("btn-cancelar");
var botonBuscar = document.getElementById("btn-buscar");

botonEntregar.addEventListener('click', () => {
    var tabla = document.getElementById("tabla-apartados");
    var rows = tabla.rows;
    var radios = tabla.querySelectorAll('input[name="selec"]');
    var radioSeleccionado;
    
    for (let radio of radios) {
        if (radio.checked) {
            radioSeleccionado = radio.value;
            break;
        }
    }

    var celdas = rows[radioSeleccionado].cells;
    var estado = celdas[6].innerHTML;

    if (estado == "Cancelado" || estado == "Entregado") {
        alert("No puede entregar/cancelar un apartado que ya está entregado/cancelado");
        return;
    }

    var cliente = celdas[1].innerHTML;
    var comida = celdas[2].innerHTML;
    entregarApartado(cliente, comida);
});

botonCancelar.addEventListener('click', () => {
    var tabla = document.getElementById("tabla-apartados");
    var rows = tabla.rows;
    var radios = tabla.querySelectorAll('input[name="selec"]');
    var radioSeleccionado;
    
    for (let radio of radios) {
        if (radio.checked) {
            radioSeleccionado = radio.value;
            break;
        }
    }

    var celdas = rows[radioSeleccionado].cells;
    var estado = celdas[6].innerHTML;

    if (estado == "Cancelado" || estado == "Entregado") {
        alert("No puede entregar/cancelar un apartado que ya está entregado/cancelado");
        return;
    }
    

    var cliente = celdas[1].innerHTML;
    var comida = celdas[2].innerHTML;
    cancelarApartado(cliente, comida);
});

botonBuscar.addEventListener('click', () => {
    var cliente = document.getElementById("campo-buscar").value;
    var clienteN = cliente.trim();
    filtrarApartados(clienteN);
});