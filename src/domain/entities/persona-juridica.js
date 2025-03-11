import { Persona } from './persona';

export class PersonaJuridica extends Persona {
  constructor(nombre, tipoDocumento, numeroDocumento) {
    super(nombre, tipoDocumento, numeroDocumento);
  }
}
