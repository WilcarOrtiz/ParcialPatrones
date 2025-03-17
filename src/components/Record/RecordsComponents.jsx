import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Search, Trash, Download } from 'lucide-react';
import swal from 'sweetalert';

import AccountNav from '../../AccountNav';
import exportToExcel from '../../helpers/exportToExcel';
import { MainContext } from '../../context/MainContex';

const RecordsComponents = () => {
  const principal = useContext(MainContext);

  const [numeroDespacho, setNumeroDespacho] = useState(0);
  const [expedientes, setExpedientes] = useState(
    principal.despachos[numeroDespacho].expedientes
  );

  //METODOS DE EXPEDIENTE

  const eliminarExpediente = (numeroRadicacion) => {
    swal({
      title: '¿Seguro de esto?',
      text: 'No podrás recuperar este expediente',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
    }).then((isConfirm) => {
      if (isConfirm) {
        principal.despachos[numeroDespacho].eliminarExpediente(
          numeroRadicacion
        );
        setExpedientes(principal.despachos[numeroDespacho].expedientes);
      }
    });
  };

  // BUSQUEDA DE UN EXPEDIENTE EN ESPECIFICO
  const [NumeroRadicacionAbuscar, setNumeroRadicacionAbuscar] = useState('');

  const handleSearch = () => {
    if (NumeroRadicacionAbuscar.length === 23) {
      console.log('Realizando consulta con:', NumeroRadicacionAbuscar);
      setExpedientes((expedientes) =>
        expedientes.filter(
          (expediente) =>
            expediente.numeroRadicacion === NumeroRadicacionAbuscar
        )
      );
    } else {
      swal({
        title: 'Número inválido',
        text: 'Debes ingresar exactamente los 23 números correspondiente a la radicación del expediente a buscar.',
        icon: 'error',
        button: 'Aceptar',
      });
    }
  };

  return (
    <div>
      <AccountNav />

      <div className="flex items-center justify-center gap-4 pb-3">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
          to={'/expedientes/new'}
        >
          Agregar nuevo expediente
        </Link>
        <div className="relative w-2/6">
          <input
            type="text"
            placeholder="Número de radicación"
            className=" border-b border-gray-400 focus:border-primary outline-none px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent text-lg"
            maxLength={23}
            value={NumeroRadicacionAbuscar}
            onChange={(e) => {
              if (NumeroRadicacionAbuscar.length === 0) {
                setExpedientes(principal.despachos[numeroDespacho].expedientes);
              }
              return setNumeroRadicacionAbuscar(
                e.target.value.replace(/\D/g, '').slice(0, 23)
              );
            }}
            title="Debe ingresar exactamente 23 números"
          />

          <button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0 border-none bg-transparent text-gray-500 hover:text-blue-500"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        {expedientes &&
          expedientes.map((expediente) => {
            return (
              <div
                key={expediente.numeroRadicacion}
                className="mb-3 flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white"
              >
                <h3 className="block text-gray-600 text-sm font-medium mb-1 mr-10">
                  Radicacion: {expediente.numeroRadicacion}
                </h3>
                <div className="w-2/3">
                  <h3 className="block text-gray-600 text-sm font-medium mb-1">
                    <strong>Información Física:</strong>{' '}
                  </h3>
                  <p className="block text-gray-600 text-sm font-medium mb-1">
                    Expediente Físico:{' '}
                    {expediente.expedienteFisico ? 'Sí' : 'No'}
                  </p>
                  <p className="block text-gray-600 text-sm font-medium mb-1">
                    Soporte Físico: {expediente.soporteFisico ? 'Sí' : 'No'}
                  </p>
                  <p className="block text-gray-600 text-sm font-medium mb-1">
                    Número de Carpetas: {expediente.numeroCarpetasFisicas}
                  </p>
                </div>

                <div className="w-1/3">
                  <h3 className="block text-gray-600 text-sm font-medium mb-1">
                    <strong>Cuadernos</strong>
                  </h3>
                  {expediente.listarCuadernos().map((cuaderno, index) => (
                    <p
                      key={index}
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      {cuaderno.name}: {cuaderno.description}
                    </p>
                  ))}
                </div>
                <div className="grid gap-4 pl-10">
                  <div className="flex gap-4">
                    <button
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-green-700 transition"
                      onClick={() => {
                        exportToExcel([expediente]);
                      }}
                    >
                      <Download className="w-5 h-5" />
                    </button>

                    {/* <button
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-green-700 transition"
                      onClick={() =>
                        navigate('/expedientes/view', {
                          state: { expediente },
                        })
                      }
                    >
                      <Eye className="w-5 h-5" />
                    </button> */}

                    <button
                      className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-red-700 transition"
                      onClick={() =>
                        eliminarExpediente(expediente.numeroRadicacion)
                      }
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RecordsComponents;
