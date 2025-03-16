export class Principal {
  #despachos;

  constructor(despachos) {
    this.#despachos = despachos;
  }

  get despachos() {
    return this.#despachos;
  }

  registrarDespacho(despacho) {
    this.#despachos.push(despacho);
  }

  listarDespachos() {
    return this.#despachos;
  }

  eliminarDespacho(codigo) {
    const index = this.#despachos.findIndex(
      (despacho) => despacho.codigo !== codigo
    );
    this.#despachos.splice(index, 1);
  }

  buscarDespacho(codigo) {
    return this.#despachos.find((despacho) => despacho.codigo === codigo);
  }

  actualizarDespacho(codigo, despacho) {
    const despachoEncontrado = this.buscarDespacho(codigo);
    despachoEncontrado = despacho;
  }
}
