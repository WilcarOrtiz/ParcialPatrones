export class Subserie {
  #codigo;
  #descripcion;
  #tipoDocumentos;
  #serieAsosiada;

  constructor(codigo, descripcion, serieAsosiada) {
    this.#codigo = codigo;
    this.#descripcion = descripcion;
    this.#serieAsosiada = serieAsosiada;
    this.#tipoDocumentos = [];
  }

  get codigo() {
    return this.#codigo;
  }

  get descripcion() {
    return this.#descripcion;
  }

  get serieAsociada() {
    return this.#serieAsosiada;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  set serieAsociada(serieAsociada) {
    this.#serieAsosiada = serieAsociada;
  }

  registrarTipoDocumento(tipoDocumento) {
    this.#tipoDocumentos.push(tipoDocumento);
  }

  eliminarTipoDocumento(tipoDocumento) {
    this.#tipoDocumentos = this.#tipoDocumentos.filter(
      (td) => td !== tipoDocumento
    );
  }

  actualizarTipoDocumento(descripcionActual, tipoDocumento) {
    const tipoDocumentoEncontrado = this.buscarTipoDocumento(descripcionActual);
    tipoDocumentoEncontrado = tipoDocumento;
  }

  buscarTipoDocumento(descripcion) {
    return this.#tipoDocumentos.find((td) => td.descripcion === descripcion);
  }

  get tipoDocumentos() {
    return this.#tipoDocumentos;
  }
}
