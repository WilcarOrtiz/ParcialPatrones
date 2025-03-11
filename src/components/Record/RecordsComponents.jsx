import { Link, useNavigate } from "react-router-dom";
import AccountNav from "../../AccountNav";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { Eye, Trash, Download } from "lucide-react";
import exportToExcel from "../../exportToExcel";

const RecordsComponents = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        {
          demandantes: [
            {
              tipo: "juridica",
              identificacion: "1234567890",
              nombre: "Wilcar",
            },
            {
              tipo: "natural",
              identificacion: "10828298923",
              nombre: "Yaneth",
            },
          ],
          demandados: [
            { tipo: "natural", identificacion: "1200686152", nombre: "Daniel" },
          ],
          radicacion: "122333333",
          despacho: "Juzgado Primero Civil Municipal",
          informacionFisica: {
            expedienteFisico: false,
            soporteFisico: true,
            numCarpetas: 1,
          },
          cuadernos: [
            {
              id: 1741640660576,
              name: "Medidas previas",
              description: "No me paga la plata",
            },

            {
              id: 1741640660572,
              name: "Medidas cautelares",
              description: "No me paga la plata",
            },
          ],
          documentos: [
            {
              nombre: "Documento por mala paga",
              fechaCreacion: "2025-03-04",
              fechalncorporacion: "2025-03-11",
              ordenDocumento: "1",
              numeroPaginas: "10",
              paginalnicio: "1",
              paginaFin: "10",
              formato: "PDF",
              tamanio: "10",
              origen: "electronico",
              Cuaderno: "Medidas previas",
              observaciones: "sssss",
            },

            {
              nombre: "Documento por mala paga",
              fechaCreacion: "2025-03-04",
              fechalncorporacion: "2025-03-11",
              ordenDocumento: "1",
              numeroPaginas: "10",
              paginalnicio: "1",
              paginaFin: "10",
              formato: "PDF",
              tamanio: "10",
              origen: "electronico",
              Cuaderno: "Medidas cautelares",
              observaciones: "sssss",
            },

            {
              nombre: "Documento por mala buena gente",
              fechaCreacion: "2025-03-04",
              fechalncorporacion: "2025-03-11",
              ordenDocumento: "1",
              numeroPaginas: "10",
              paginalnicio: "1",
              paginaFin: "10",
              formato: "PDF",
              tamanio: "10",
              origen: "electronico",
              Cuaderno: "Medidas cautelares",
              observaciones: "sssss",
            },

            {
              nombre: "Documento por mala cansona",
              fechaCreacion: "2025-03-04",
              fechalncorporacion: "2025-03-11",
              ordenDocumento: "1",
              numeroPaginas: "10",
              paginalnicio: "1",
              paginaFin: "10",
              formato: "PDF",
              tamanio: "10",
              origen: "electronico",
              Cuaderno: "Medidas previas",
              observaciones: "sssss",
            },
          ],
        },
      ];
      setPlaces(fakeData);
    }, 1000);
  }, []);

  //METODOS DE EXPEDIENTE

  const eliminarExpediente = () => {
    console.log("Expediente eliminado");
  };

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
          to={"/account/records/new"}
        >
          Agregar nuevo expediente
        </Link>
      </div>
      <div>
        <h2 className="mb-4">Datos de Expedientes</h2>
        {places.length > 0 &&
          places.map((item, index) => (
            <div
              key={index}
              className="mb-3 flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              <h3 className="block text-gray-600 text-sm font-medium mb-1 mr-10">
                Radicacion:
                {item.radicacion}
              </h3>
              <div className="w-2/3">
                <h3 className="block text-gray-600 text-sm font-medium mb-1">
                  <strong>Información Física:</strong>{" "}
                </h3>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  Expediente Físico:{" "}
                  {item.informacionFisica.expedienteFisico ? "Sí" : "No"}
                </p>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  Soporte Físico:{" "}
                  {item.informacionFisica.soporteFisico ? "Sí" : "No"}
                </p>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  Número de Carpetas: {item.informacionFisica.numCarpetas}
                </p>
              </div>

              <div className="w-1/3">
                <h3 className="block text-gray-600 text-sm font-medium mb-1">
                  <strong>Cuadernos</strong>
                </h3>
                {item.cuadernos.map((cuaderno) => (
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
                      console.log("Exportando:", item), exportToExcel([item]);
                    }}
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-green-700 transition"
                    onClick={() =>
                      navigate("/account/records/view", {
                        state: { expediente: item },
                      })
                    }
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <button
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-md hover:bg-red-700 transition"
                    onClick={() => eliminarExpediente()}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecordsComponents;
