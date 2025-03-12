import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccountNav from "../../AccountNav";
import PhysicalInfoSection from "./PhysicalInfoSection";
import CuadernosSection from "../Book/Cuaderno-section";

const RecordsForm = () => {
  const location = useLocation();
  const expediente = location.state?.expediente || null;

  // Estados
  const [expedienteFisico, setExpedienteFisico] = useState(false);
  const [soporteFisico, setSoporteFisico] = useState(false);
  const [numCarpetas, setNumCarpetas] = useState(0);
  const [radicacion, setRadicacion] = useState("");
  const [cuadernosData, setCuadernosData] = useState({
    cuadernos: [],
    documentos: [],
  });
  const [demandantes, setDemandantes] = useState([]);
  const [demandados, setDemandados] = useState([]);
  const [despacho, setDespacho] = useState("");
  const [serie, setSerie] = useState("");
  const [subserie, setSubserie] = useState("");
  const [tipoDocumental, setTipoDocumental] = useState("");

  useEffect(() => {
    if (expediente) {
      console.log("Expediente:", expediente);
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
      { tipo: "natural", identificacion: "", nombre: "" },
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
    const formData = {
      demandantes,
      demandados,
      radicacion,
      despacho,
      serie,
      informacionFisica: {
        expedienteFisico,
        soporteFisico,
        numCarpetas: soporteFisico ? numCarpetas : 0,
      },
      cuadernos: cuadernosData.cuadernos,
      documentos: cuadernosData.documentos,
    };

    console.log("Datos del expediente", formData);
    alert(JSON.stringify(formData, null, 2));
  };

  const despachoNombres = [
    "Juzgado Primero Civil Municipal",
    "Juzgado Segundo de Familia",
    "Tribunal Superior de Justicia",
    "Corte Constitucional",
    "Juzgado Penal del Circuito",
  ];

  const series = ["05", "270"];

  const subseries = {
    "05": ["15", "25"],
    270: ["245"],
  };

  const tipoDocumentalList = {
    15: [
      "Solicitu hábeas corpus",
      "Acta de reparto",
      "Auto que decreta inspección",
      "Comunicación de hábeas corpus",
      "Entrevista",
      "Fallo de habeas corpus",
      "Escrito de Impugnación",
      "Auto que admite impugnación",
      "Providencia que resuelve impugnación",
      "Auto que ordena devolución del expediente",
      "Auto de obedézcase y cumplase o estese a lo resuelto",
      "Notificación",
    ],

    25: [
      "Acción de tutela",
      "Acta de reparto",
      "Auto que admite tutela",
      "Auto para declarar incompetencia y remitir",
      "Oficio de notificación correo certificado",
      "Auto vinculando otros accionados",
      "Contestación de tutela",
      "Designación perito",
      "Informe de perito",
      "Contestación de tutela",
      "Fallo de tutela",
      "Notificación de tutela",
      "Escrito de Impugnación",
      "Auto que admite impugnación",
      "Auto concediendo recurso",
      "Prueba",
      "Solicitud de pronunciamiento de las partes",
      "Auto que resuelve recurso",
      "Auto que ordena devolución del expediente",
      "Auto de obedezca y cúmplase o estése a lo resuelto",
      "Notificación",
      "Sentencia de revisión Corte Constitucional",
      "Solicitud de desacato",
      "Desacato",
      "Notificación de desacato",
    ],

    245: [
      "Acta de reparto juzgado control de garantías",
      "Manifestación de incompetencia por parte del juez",
      "Oficio remisorio a reparto por competencia",
      "Impedimento",
      "Recusación",
      "Suspensión",
      "Desistimiento",
      "Solicitud de mediación",
      "Designación de mediador",
      "Solicitud audiencia medidas cautelares sobre bienes",
      "Audiencia medidas cautelares sobre bienes",
      "Acta audiencia medidas cautelares sobre bienes",
      "Solicitud legalización de incautación",
      "Audiencia de incautación",
      "Acta audiencia de incautación",
      "Solicitud de levantamiento de medidas",
      "Audiencia levantamiento medidas cautelares",
      "Acta de audiencia de levantamiento",
      "Solicitud de suspensión y cancelación de la personería jurídica",
      "Solicitud de medidas cautelares sobre bienes",
      "Audiencia decreto de embargo y secuestro",
      "Audiencia de desembargo de bienes en medio magnético",
      "Solicitud de control de legalidad por parte de la Fiscalía",
      "Solicitud de declaratoria de persona ausente por parte de la Fiscalía",
      "Audiencia de declaratoria de persona ausente",
      "Acta de audiencia de declaratoria de persona ausente",
      "Solicitud de medidas de protección y atención a víctimas",
    ],
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
              onChange={(e) => setRadicacion(e.target.value)}
              maxLength={23}
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
              {despachoNombres.map((despachoNombre, index) => (
                <option key={index} value={despachoNombre}>
                  {despachoNombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Serie, Subserie y Tipo Documenntal*/}
        <div className="p-0">
          {/* Serie */}
          <div>
            <label className="block mt-2 text-gray-600 text-sm font-medium mb-1">
              Serie
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
              value={serie}
              onChange={(e) => {
                setSerie(e.target.value);
                setSubserie("");
                setTipoDocumental("");
              }}
            >
              <option value="">Seleccione una Serie</option>
              {series.map((serieItem) => (
                <option key={serieItem} value={serieItem}>
                  {serieItem}
                </option>
              ))}
            </select>
          </div>

          {/* Subserie */}
          {serie && (
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Subserie:
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
                value={subserie}
                onChange={(e) => {
                  setSubserie(e.target.value);
                  setTipoDocumental("");
                }}
              >
                <option value="">Seleccione una Subserie</option>
                {subseries[serie].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tipo Documental */}
          {subserie && (
            <div className="mt-4">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Tipo Documental:
              </label>
              <select
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none ${
                  !subserie ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                value={tipoDocumental}
                onChange={(e) => setTipoDocumental(e.target.value)}
              >
                <option value="">Seleccione un Tipo Documental</option>
                {tipoDocumentalList[subserie]?.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Partes Procesales */}
        <div className="flex gap-8 mt-6 mb-6">
          {[
            {
              label: "Demandantes",
              state: demandantes,
              setState: setDemandantes,
            },
            { label: "Demandados", state: demandados, setState: setDemandados },
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
                        "tipo",
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
                  {parte.tipo !== "entidad" && (
                    <input
                      type="text"
                      placeholder={parte.tipo === "natural" ? "CC" : "NIT"}
                      value={parte.identificacion}
                      onChange={(e) =>
                        handleChangeParte(
                          index,
                          "identificacion",
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
                        "nombre",
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
