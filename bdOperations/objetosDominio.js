export class User {

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

export class Comida {

    #id;
    #nombre;
    #img;
    #dia;
    #menu;
    #precio;
    #stock;

    constructor(id, nombre, img, dia, menu, precio, stock) {
        this.#id = id;
        this.#nombre = nombre;
        this.#img = img;
        this.#dia = dia;
        this.#menu = menu;
        this.#precio = precio;
        this.#stock = stock;
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

    getStock() {
        return this.#stock;
    }

    setStock(stock) {
        this.#stock = stock;
    }
}

export class Platillo {

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

export class Apartado {

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