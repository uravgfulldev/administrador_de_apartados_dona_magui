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
    #descripcion;
    #precio;

    constructor(nombre, img, dia, menu, descripcion, precio) {
        this.#nombre = nombre;
        this.#img = img;
        this.#dia = dia;
        this.#menu = menu;
        this.#descripcion = descripcion;
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

    getDescripcion() {
        return this.#descripcion;
    }

    setDescripcion(descripcion) {
        this.#descripcion = descripcion;
    }

    getPrecio() {
        return this.#precio;
    }

    setPrecio() {
        this.#precio = precio;
    }
}

class Platillo {

    #comida;
    #hora;
    #paraLlevar;

    constructor(comida, hora, paraLlevar) {
        this.comida = comida;
        this.hora = hora;
        this.paraLlevar = paraLlevar;
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

    #user;
    #platillo;
    #estatus;

    constructor(user, platillo, estatus) {
        this.#user = user;
        this.#platillo = platillo;
        this.#estatus = estatus;
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