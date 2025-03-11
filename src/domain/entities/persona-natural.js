import { Persona } from './persona';

export class PersonaNatural extends Persona {
  #apellido;

  constructor(nombre, apellido, tipoDocumento, numeroDocumento) {
    super(nombre, tipoDocumento, numeroDocumento);
    this.#apellido = apellido;
  }

  set apellido(apellido) {
    this.#apellido = apellido;
  }

  get apellido() {
    return this.#apellido;
  }
}
