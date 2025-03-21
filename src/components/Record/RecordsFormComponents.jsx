import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert';

import AccountNav from '../../AccountNav';
import PhysicalInfoSection from './PhysicalInfoSection';
import CuadernosSection from '../Book/Cuaderno-section';
import { MainContext } from '../../context/MainContex';
import { Expediente } from '../../domain';

const RecordsForm = () => {
  const location = useLocation();
  const expediente = location.state?.expediente || null;

  const principal = useContext(MainContext);

  // Estados
  const [expedienteFisico, setExpedienteFisico] = useState(false);
  const [soporteFisico, setSoporteFisico] = useState(false);
  const [numCarpetas, setNumCarpetas] = useState(0);
  const [radicacion, setRadicacion] = useState('');
  const [cuadernosData, setCuadernosData] = useState({
    cuadernos: [],
    documentos: [],
  });
  const [demandantes, setDemandantes] = useState([]);
  const [demandados, setDemandados] = useState([]);
  const [despacho, setDespacho] = useState('');

  useEffect(() => {
    if (expediente) {
      console.log('Expediente:', expediente);
      setExpedienteFisico(expediente.informacionFisica.expedienteFisico);
      setSoporteFisico(expediente.informacionFisica.soporteFisico);
      setNumCarpetas(expediente.informacionFisica.numCarpetas);
      setCuadernosData({
        cuadernos: expediente.cuadernos,
        documentos: expediente.documentos,
      });
      setDemandantes(expediente.demandantes || []);
      setDemandados(expediente.demandados || []);
    }
  }, [expediente]);

  const handleAddParte = (setPartes) => {
    setPartes((prev) => [
      ...prev,
      { tipo: 'natural', identificacion: '', nombre: '' },
    ]);
  };

  const handleChangeParte = (index, field, value, partes, setPartes) => {
    const updated = [...partes];
    updated[index][field] = value;
    setPartes(updated);
  };

  const handleRemoveParte = (index, setPartes) => {
    setPartes((prev) => prev.filter((_, i) => i !== index));
  };

  // AQUI agregamos la función handleSubmit para guardar
  const handleSubmit = (e) => {
    e.preventDefault();
    const despachoEncontrado = principal.buscarDespacho(despacho);

    const expediente = new Expediente(
      radicacion,
      expedienteFisico,
      soporteFisico,
      numCarpetas,
      null,
      demandados,
      demandantes,
      despachoEncontrado
    );

    despachoEncontrado.registrarExpediente(expediente);

    swal('Registro exitoso', 'Expediente registrado exitosamente', 'success');
  };

  return (
    <div>
      <AccountNav />
      <form
        className="mt-5  border rounded-lg focus:ring-2  p-10 mr-12 ml-12 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="">
          {/* Número de Radicación */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Número de Radicación:
            </label>
            <input
              type="text"
              value={radicacion}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, ''); // Filtra solo números
                if (value.length <= 23) {
                  setRadicacion(value);
                }
              }}
              onBlur={() => {
                if (radicacion.length !== 23) {
                  alert(
                    'El número de radicación debe tener exactamente 23 dígitos.'
                  );
                  setRadicacion(''); // Limpia el campo si no tiene 23 dígitos
                }
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
              placeholder="Ingrese el número de radicación (23 dígitos)"
            />
          </div>

          {/* Despacho */}
          <div>
            <label className="block mt-2 text-gray-600 text-sm font-medium mb-1">
              Despacho
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 text-gray-500 focus:ring-gray-300 focus:outline-none"
              value={despacho}
              onChange={(e) => setDespacho(e.target.value)}
            >
              <option value="">Seleccione un despacho</option>
              {principal.despachos.map((despacho) => (
                <option key={despacho.codigo} value={despacho.codigo}>
                  {despacho.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Partes Procesales */}
        <div className="flex gap-8 mt-6 mb-6">
          {[
            {
              label: 'Demandantes',
              state: demandantes,
              setState: setDemandantes,
            },
            { label: 'Demandados', state: demandados, setState: setDemandados },
          ].map(({ label, state, setState }) => (
            <div key={label} className="w-1/2">
              <h3 className="block text-gray-600 text-sm font-medium mb-1">
                {label}
              </h3>
              {state.map((parte, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <select
                    value={parte.tipo}
                    onChange={(e) =>
                      handleChangeParte(
                        index,
                        'tipo',
                        e.target.value,
                        state,
                        setState
                      )
                    }
                  >
                    <option value="natural">Natural</option>
                    <option value="juridica">Jurídica</option>
                    <option value="entidad">Entidad del Estado</option>
                  </select>
                  {parte.tipo !== 'entidad' && (
                    <input
                      type="text"
                      placeholder={parte.tipo === 'natural' ? 'CC' : 'NIT'}
                      value={parte.identificacion}
                      onChange={(e) =>
                        handleChangeParte(
                          index,
                          'identificacion',
                          e.target.value,
                          state,
                          setState
                        )
                      }
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={parte.nombre}
                    onChange={(e) =>
                      handleChangeParte(
                        index,
                        'nombre',
                        e.target.value,
                        state,
                        setState
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveParte(index, setState)}
                    className="text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddParte(setState)}
                className="bg-primary text-white px-2 py-1 rounded"
              >
                Agregar {label}
              </button>
            </div>
          ))}
        </div>

        {/* Secciones */}
        <PhysicalInfoSection
          {...{
            expedienteFisico,
            setExpedienteFisico,
            soporteFisico,
            setSoporteFisico,
            numCarpetas,
            setNumCarpetas,
          }}
        />
        <hr className="mt-4"></hr>
        <CuadernosSection updateParentData={setCuadernosData} />

        {/* Botón de envío , ver el evento submit*/}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            Guardar Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordsForm;
