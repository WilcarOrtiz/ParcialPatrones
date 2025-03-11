import { EntidadProcesal } from './entidad-procesal';

export class Persona extends EntidadProcesal {
  #tipoDocumento;
  #numeroDocumento;

  constructor(nombre, tipoDocumento, numeroDocumento) {
    super(nombre);
    this.#tipoDocumento = tipoDocumento;
    this.#numeroDocumento = numeroDocumento;
  }

  set tipoDocumento(tipoDocumento) {
    this.#tipoDocumento = tipoDocumento;
  }

  set numeroDocumento(numeroDocumento) {
    this.#numeroDocumento = numeroDocumento;
  }

  get tipoDocumento() {
    return this.#tipoDocumento;
  }

  get numeroDocumento() {
    return this.#numeroDocumento;
  }
}
