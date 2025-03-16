import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Trash, Download } from 'lucide-react';
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

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
          to={'/expedientes/new'}
        >
          Agregar nuevo expediente
        </Link>
      </div>
      <div>
        <h2 className="mb-4">Datos de Expedientes</h2>

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
                  {expediente.listarCuadernos().map((cuaderno) => (
                    <p
                      key={cuaderno.id}
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
