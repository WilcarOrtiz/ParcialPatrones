export class Despacho {
  #codigo;
  #nombre;
  #categoria;
  #ubicacion;
  #expedientes;

  constructor(codigo, nombre, categoria, ubicacion, expedientes) {
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#categoria = categoria;
    this.#ubicacion = ubicacion;
    this.#expedientes = expedientes;
  }

  get codigo() {
    return this.#codigo;
  }

  get nombre() {
    return this.#nombre;
  }

  get categoria() {
    return this.#categoria;
  }

  get ubicacion() {
    return this.#ubicacion;
  }

  get expedientes() {
    return this.#expedientes;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  set categoria(categoria) {
    this.#categoria = categoria;
  }

  set ubicacion(ubicacion) {
    this.#ubicacion = ubicacion;
  }

  set expedientes(expedientes) {
    this.#expedientes = expedientes;
  }

  crearIndiceExpediente(numeroRadicacion) {
    // TODO: crear indice del expediente
    console.log(first);
  }

  registrarExpediente(expediente) {
    this.#expedientes.push(expediente);
  }

  get listarExpedientes() {
    return this.#expedientes;
  }

  eliminarExpediente(numeroRadicacion) {
    this.#expedientes = this.#expedientes.filter(
      (expediente) => expediente.numeroRadicacion !== numeroRadicacion
    );
  }

  buscarExpediente(numeroRadicacion) {
    return this.#expedientes.find(
      (expediente) => expediente.numeroRadicacion === numeroRadicacion
    );
  }

  actualizarExpediente(codigoRadicacion, expediente) {
    const expedienteEncontrado = this.buscarExpediente(codigoRadicacion);
    expedienteEncontrado = expediente;
  }
}
