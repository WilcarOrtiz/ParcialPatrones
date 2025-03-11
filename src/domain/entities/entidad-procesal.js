export class EntidadProcesal {
  #id = '0';
  #nombre;

  constructor(nombre) {
    if (new.target === EntidadProcesal) {
      throw new Error('Esta clase no puede ser instanciada');
    }
    this.#id = `${Number(this.#id) + 1}`;
    this.#nombre = nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }

  get nombre() {
    return this.#nombre;
  }

  get id() {
    return this.#id;
  }
}
