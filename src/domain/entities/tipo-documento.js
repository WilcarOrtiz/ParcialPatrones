export class TipoDocumento {
  #descripcion;

  constructor(descripcion) {
    this.#descripcion = descripcion;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }
}
