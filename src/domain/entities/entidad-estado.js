import { EntidadProcesal } from './entidad-procesal';

export class EntidadEstado extends EntidadProcesal {
  #codigoEntidad;

  constructor(nombre, codigoEntidad) {
    super(nombre);
    this.#codigoEntidad = codigoEntidad;
  }

  set codigoEntidad(codigoEntidad) {
    this.#codigoEntidad = codigoEntidad;
  }

  get codigoEntidad() {
    return this.#codigoEntidad;
  }
}
