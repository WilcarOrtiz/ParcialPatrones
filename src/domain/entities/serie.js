export class Serie {
  #codigo;
  #descripcion;
  #subseries;

  constructor(codigo, descripcion) {
    this.#codigo = codigo;
    this.#descripcion = descripcion;
    this.#subseries = [];
  }

  get codigo() {
    return this.#codigo;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set descripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }

  registrarSubserie(subserie) {
    this.#subseries.push(subserie);
  }

  eliminarSubserie(codigo) {
    this.#subseries.filter((subserie) => subserie.codigo !== codigo);
  }

  get listarSubseries() {
    return this.#subseries;
  }

  buscarSubserie(codigo) {
    return this.#subseries.find((subserie) => subserie.codigo === codigo);
  }

  actualizarSubserie(codigo, subserie) {
    const subserieEncontrada = this.buscarSubserie(codigo);
    subserieEncontrada = subserie;
  }
}
