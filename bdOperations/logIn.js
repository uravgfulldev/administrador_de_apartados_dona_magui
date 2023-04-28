var botonRegistrar = document.getElementById("btn-registrar");
var botonIngresar = document.getElementById("btn-ingresar");

botonRegistrar.addEventListener('click', () => {
   var nombreCompleto = document.getElementById("campo-nombre").value.trim();
   var correo = document.getElementById("campo-correo").value.trim();
   var username = document.getElementById("campo-usuario").value.trim();
   var password = document.getElementById("campo-password").value.trim();
   var telefono = document.getElementById("campo-telefono").value.trim();

    if (nombreCompleto.length === 0 || correo.length === 0 || usuario.length === 0 || password.length === 0) {
        alert("Llene los campos vacíos");
        return;
    }

    if (telefono.length === 0) {
        telefono = null;
    }

    registrarUsuario(username, nombreCompleto, correo, password, telefono);
});

botonIngresar.addEventListener('click', () => {
    var correo = document.getElementById("login-correo").value.trim();
    var password = document.getElementById("login-password").value.trim();

    if (correo.length === 0 || password.length === 0) {
        alert("Llene los campos vacíos");
        return;
    }

    logIn(correo, password);
});