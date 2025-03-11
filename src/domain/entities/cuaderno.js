export class Cuaderno {
  #nombre;
  #descripcion;
  #expedienteAsociado;
  #documentos;

  constructor(nombre, descripcion, expedienteAsociado) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#expedienteAsociado = expedienteAsociado;
    this.#documentos = [];
  }

  get nombre() {
    return this.#nombre;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get expedienteAsociado() {
    return this.#expedienteAsociado;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  set expedienteAsociado(expedienteAsociado) {
    this.#expedienteAsociado = expedienteAsociado;
  }

  agregarDocumento(documento) {
    this.#documentos.push(documento);
  }

  eliminarDocumento(ordenDocumento) {
    this.#documentos.splice(ordenDocumento - 1, 1);
  }

  buscarDocumento(ordenDocumento) {
    return this.#documentos.find(
      (doc) => doc.ordenDocumento === ordenDocumento
    );
  }

  actualizarDocumento(ordenDocumento, documento) {
    this.#documentos.splice(ordenDocumento - 1, 1, documento);
  }

  get listarDocumentos() {
    return this.#documentos;
  }
}
