import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExpedienteViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const expediente = location.state?.expediente || null;
  console.log('Expediente:', expediente);

  if (!expediente) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <p className="text-center text-gray-600 text-sm font-medium">
          No hay información disponible.
        </p>
      </div>
    );
  }

  // Asociamos documentos a sus respectivos cuadernos
  const cuadernosConDocumentos = expediente
    .listarCuadernos()
    .map((cuaderno) => ({
      ...cuaderno,
      documentos: expediente.documentos.filter(
        (doc) => doc.Cuaderno === cuaderno.name
      ),
    }));

  return (
    <div className="p-6 mt-6 bg-gray-50 shadow-md rounded-lg border border-gray-300">
      {/* Botón de volver */}
      <button
        className="mb-4 px-4 py-1 text-sm bg-primary text-white rounded-md hover:bg-green-700 transition"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      {/* Datos principales */}
      <h2 className="text-xl font-bold mb-2 text-gray-800">Expediente</h2>
      <div className="text-sm text-gray-700 border-b pb-2 mb-3">
        <p>
          <strong>Radicación:</strong> {expediente.radicacion}
        </p>
        <p>
          <strong>Despacho:</strong> {expediente.despacho}
        </p>
      </div>

      {/* Información Física */}
      <h3 className="text-md font-semibold text-gray-800">
        Información Física
      </h3>
      <div className="text-sm text-gray-700 border-b pb-2 mb-3">
        <p>
          <strong>Expediente Físico:</strong>{' '}
          {expediente.informacionFisica.expedienteFisico ? 'Sí' : 'No'}
        </p>
        <p>
          <strong>Soporte Físico:</strong>{' '}
          {expediente.informacionFisica.soporteFisico ? 'Sí' : 'No'}
        </p>
        {expediente.informacionFisica.soporteFisico && (
          <p>
            <strong>Número de Carpetas:</strong>{' '}
            {expediente.informacionFisica.numCarpetas}
          </p>
        )}
      </div>

      {/* Partes Procesales */}
      <h3 className="text-md font-semibold text-gray-800">Partes Procesales</h3>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        {/* Demandantes */}
        <div className="border p-3 rounded-md bg-white shadow-sm">
          <h4 className="font-medium text-gray-800">Demandantes</h4>
          {expediente.demandantes.length > 0 ? (
            <ul className="list-none mt-1">
              {expediente.demandantes.map((d, index) => (
                <li key={index} className="border-b py-1 last:border-none">
                  {d.nombre} <span className="text-gray-500">({d.tipo})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay demandantes.</p>
          )}
        </div>

        {/* Demandados */}
        <div className="border p-3 rounded-md bg-white shadow-sm">
          <h4 className="font-medium text-gray-800">Demandados</h4>
          {expediente.demandados.length > 0 ? (
            <ul className="list-none mt-1">
              {expediente.demandados.map((d, index) => (
                <li key={index} className="border-b py-1 last:border-none">
                  {d.nombre} <span className="text-gray-500">({d.tipo})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay demandados.</p>
          )}
        </div>
      </div>
      {/* Cuadernos y Documentos */}
      <h3 className="text-md font-semibold text-gray-800 mt-4">Cuadernos</h3>
      {cuadernosConDocumentos.length > 0 ? (
        <div className="text-sm text-gray-700">
          {cuadernosConDocumentos.map((cuaderno, index) => (
            <details
              key={index}
              className="mt-2 border border-gray-300 rounded-md p-3 bg-white shadow-sm"
            >
              <summary className="font-medium cursor-pointer text-gray-800">
                Cuaderno {index + 1}: {cuaderno.name || 'Sin nombre'}
              </summary>
              {cuaderno.documentos.length > 0 ? (
                <ul className="list-none mt-2">
                  {cuaderno.documentos.map((doc, docIndex) => (
                    <li
                      key={docIndex}
                      className="border-b py-1 last:border-none"
                    >
                      {doc.nombre}{' '}
                      <span className="text-gray-500">({doc.formato})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No hay documentos en este cuaderno.
                </p>
              )}
            </details>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay cuadernos registrados.</p>
      )}
    </div>
  );
};

export default ExpedienteViewer;
