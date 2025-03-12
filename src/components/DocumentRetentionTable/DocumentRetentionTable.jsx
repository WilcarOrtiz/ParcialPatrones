import { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import SubseriesList from "./SubseriesList"; // Importa el componente hijo

const SeriesComponent = () => {
  const [expandedSeries, setExpandedSeries] = useState({});

  const [series, setSeries] = useState([
    {
      codigo: "05",
      descripcion: "Acciones Constitucionales",
      subseries: [
        {
          codigo: "15",
          descripcion: "Acciones de Hábeas Corpus",
          tipoDocumento: [
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
        },
        {
          codigo: "25",
          descripcion: "Acciones de Tutelas",
          tipoDocumento: [
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
        },
      ],
    },
    {
      codigo: "270",
      descripcion: "Expedientes de Procesos Judiciales",
      subseries: [
        {
          codigo: "245",
          descripcion:
            "Expedientes de Procesos Judiciales Penales - Ley 906 de 2004",
          tipoDocumento: [
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
        },
      ],
    },
  ]);

  const toggleSeries = (codigo) => {
    setExpandedSeries((prev) => ({
      ...prev,
      [codigo]: !prev[codigo],
    }));
  };

  const handleAddSubserie = (codigoSerie, newSubserie) => {
    setSeries((prevSeries) =>
      prevSeries.map((serie) =>
        serie.codigo === codigoSerie
          ? {
              ...serie,
              subseries: [
                ...serie.subseries,
                { ...newSubserie, tipoDocumento: [] },
              ],
            }
          : serie
      )
    );
  };

  return (
    <div className="mt-10 w-3/4 bg-white shadow-xl rounded-lg p-5 mx-auto">
      {series.map((serie) => (
        <div key={serie.codigo} className="border-b last:border-none py-4">
          {/* Contenedor de la serie */}
          <div className="flex justify-between items-center">
            <div className="flex pl-10 flex-wrap gap-x-10 items-center">
              <span className="text-gray-600 text-sm font-bold">
                {serie.codigo}
              </span>
              <span className="text-gray-600 text-sm font-medium">
                {serie.descripcion}
              </span>
              <span className="text-gray-600 text-sm font-medium">
                Contiene: {serie.subseries.length} Subseries
              </span>
            </div>

            <div className="flex gap-3 mr-10">
              <button
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                onClick={() => toggleSeries(serie.codigo)}
              >
                {expandedSeries[serie.codigo] ? (
                  <ChevronUp size={18} className="text-primary" />
                ) : (
                  <ChevronDown size={18} className="text-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Contenedor de subseries centrado */}
          {expandedSeries[serie.codigo] && (
            <div className="flex justify-center mt-4">
              <div className="w-full max-w-2xl">
                <SubseriesList
                  serie={serie}
                  setSeries={setSeries}
                  onAddSubserie={handleAddSubserie}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeriesComponent;
