class User {

    #userName;
    #nombreCompleto;
    #correo;
    #password;

    constructor(userName, nombreCompleto, correo, password) {
        this.#userName = userName;
        this.#nombreCompleto = nombreCompleto;
        this.#correo = correo;
        this.#password = password;
    }

    getUserName() {
        return this.#userName;
    }

    setUserName(userName) {
        this.#userName = userName;
    }

    getNombreCompleto() {
        return this.#nombreCompleto;
    }

    setNombreCompleto(nombreCompleto) {
        this.#nombreCompleto = nombreCompleto;
    }

    getCorreo() {
        return this.#correo;
    }

    setCorreo(correo) {
        this.#correo = correo;
    }

    getPassword() {
        return this.#password;
    }

    setPassword(password) {
        this.#password = password;
    }
}

class Comida {

    #id;
    #nombre;
    #img;
    #dia;
    #menu;
    #precio;

    constructor(id, nombre, img, dia, menu, precio) {
        this.#id = id;
        this.#nombre = nombre;
        this.#img = img;
        this.#dia = dia;
        this.#menu = menu;
        this.#precio = precio;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getNombre() {
        return this.#nombre;
    }

    setNombre(nombre) {
        this.#nombre = nombre;
    }

    getImg() {
        return this.#img;
    }

    setImg(img) {
        this.#img = img;
    }

    getDia() {
        return this.#dia;
    }

    setDia(dia) {
        this.#dia = dia;
    }

    getMenu() {
        return this.#menu;
    }

    setMenu(menu) {
        this.#menu = menu;
    }

    getPrecio() {
        return this.#precio;
    }

    setPrecio() {
        this.#precio = precio;
    }
}

class Platillo {

    #id
    #comida;
    #hora;
    #paraLlevar;

    constructor(id, comida, hora, paraLlevar) {
        this.#id = id;
        this.comida = comida;
        this.hora = hora;
        this.paraLlevar = paraLlevar;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getComida() {
        return this.#comida;
    }

    setComida(comida) {
        this.#comida = comida;
    }

    getHora() {
        return this.#hora;
    }

    setHora(hora) {
        this.#hora = hora;
    }

    isParaLlevar() {
        return this.#paraLlevar;
    }

    setParaLlevar(paraLlevar) {
        this.#paraLlevar = paraLlevar;
    }
}

class Apartado {

    #id
    #user;
    #platillo;
    #estatus;

    constructor(id, user, platillo, estatus) {
        this.#id = id;
        this.#user = user;
        this.#platillo = platillo;
        this.#estatus = estatus;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getUser() {
        return this.#user;
    }

    setUser(user) {
        this.#user = user;
    }

    getPlatillo() {
        return this.#platillo;
    }

    setPlatillo(platillo) {
        this.#platillo = platillo;
    }

    getEstatus() {
        return this.#estatus;
    }

    setEstatus(estatus) {
        this.#estatus = estatus;
    }
}

var xhttp;
var usuario = new User("LGCR", "Luis Gonzalo Cervantes Rivera", "luis.cervantes228549@potros.itson.edu.mx", "LGCR1234");
var comida = new Comida(1, "Carne en su jugo", "assets\\images\\Comidas\\carneEnSuJugo.jpg", "Lunes", 1, "Carne en su jugo", 75.0);
var platillo = new Platillo(1, comida, "2023-03-20 16:00:00", true);

function registrarApartado() {
    //TODO: obtener los datos necesarios para realizar el apartado
    var idPlatillo = platillo.getId();
    var idCliente = usuario.getUserName();

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "assets\\php\\insertData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_platillo=" + idPlatillo + "&id_cliente=" + idCliente);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    }
}

function cancelarApartado() {
    var idApartado = document.getElementById("").value;
    var estado = "Cancelado";

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "assets\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_apartado=" + idApartado + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    }
}

function filtrarApartados() {
    //TODO: everything
}

function entregarApartado() {
    var idApartado = document.getElementById("").value;
    var estado = "Entregado";

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "assets\\php\\editData.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_apartado=" + idApartado + "&estado=" + estado);

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert(this.responseText);
        }
    }
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

            for (let i = 0; i < data.length; i++) {
                //TODO: get variables
            }

            //TODO: poner id de tabla
            document.getElementById("").innerHTML = columnasTabla;
        }
    }
}