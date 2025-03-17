import {
  Categoria,
  Despacho,
  EntidadEstado,
  Expediente,
  PersonaNatural,
  Serie,
  ETipoDocumento,
  Ubicacion,
} from '../domain';
import { Principal } from '../infraestructure/principal';
import { MainContext } from './MainContex';

const expediente = new Expediente(
  '12322424254524522525255',
  true,
  false,
  20,
  new Serie('42444', 'Acción de tutela'),
  [new EntidadEstado('Bancolombia')],
  [new PersonaNatural('Luis', 'Pinto', ETipoDocumento.cedula, '1005789432')]
);

const despacho = new Despacho(
  '131554356344',
  'Despacho altos de calleja',
  Categoria.municipal,
  new Ubicacion('valledupar', 'cesar'),
  [expediente]
);

expediente.despachoAsosiado = despacho;

const principal = new Principal([despacho]);

export const MainProvider = ({ children }) => {
  return (
    <MainContext.Provider value={principal}>{children}</MainContext.Provider>
  );
};
