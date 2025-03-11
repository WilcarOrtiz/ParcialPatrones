export class Ubicacion {
  #departamento;
  #ciudad;

  constructor(ciudad, departamento) {
    this.#ciudad = ciudad;
    this.#departamento = departamento;
  }

  get departamento() {
    return this.#departamento;
  }

  set departamento(departamento) {
    this.#departamento = departamento;
  }

  get ciudad() {
    return this.#ciudad;
  }

  set ciudad(ciudad) {
    this.#ciudad = ciudad;
  }
}
