import { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import SubseriesList from "./SubseriesList"; // Importa el componente hijo

const SeriesComponent = () => {
  const [expandedSeries, setExpandedSeries] = useState({});

  const [series, setSeries] = useState([
    {
      codigo: "001",
      descripcion: "Serie 1",
      subseries: [
        {
          codigo: "001-1",
          descripcion: "Subserie 1",
          tipoDocumento: ["Documento A", "Documento B"],
        },
      ],
    },
    {
      codigo: "002",
      descripcion: "Serie 2",
      subseries: [
        {
          codigo: "002-1",
          descripcion: "Subserie 2",
          tipoDocumento: ["Documento C", "Documento D"],
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
