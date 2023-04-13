var btnGuardarApartado = document.getElementById("guardarApartado");

btnGuardarApartado.addEventListener('click', () => {
    var comida = btnGuardarApartado.value;
    var checkBox = document.getElementById("flexSwitchCheckDefault");
    var horaSeleccionada = parseInt(document.getElementById("horaApartado").value);
    var hora;

    switch (horaSeleccionada) {
        case 1:
            hora = "12:00:00";
            break;
        case 2:
            hora = "12:30:00";
            break;
        case 3:
            hora = "13:00:00";
            break;
        case 4:
            hora = "13:30:00";
            break;
        case 5:
            hora = "14:00:00";
            break;
        case 6:
            hora = "14:30:00";
            break;
        case 7:
            hora = "15:00:00";
            break;
    }

    registrarApartado(comida, hora, checkBox.checked);
    closeModal();
});