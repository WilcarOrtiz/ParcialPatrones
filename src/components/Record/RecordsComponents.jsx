import { Link, useNavigate } from "react-router-dom";
import AccountNav from "../../AccountNav";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const RecordsComponents = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        {
          informacionFisica: {
            expedienteFisico: true,
            soporteFisico: true,
            numCarpetas: 2,
          },
          cuadernos: [
            {
              id: 1741482588285,
              name: "Cuaderno A",
              description: "Notas del expediente A",
            },
          ],
        },
      ];
      setPlaces(fakeData);
    }, 1000);
  }, []);

  const generarPDF = (item) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Información del Expediente", 10, 10);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Expediente Físico: ${
        item.informacionFisica.expedienteFisico ? "Sí" : "No"
      }`,
      10,
      20
    );
    doc.text(
      `Soporte Físico: ${item.informacionFisica.soporteFisico ? "Sí" : "No"}`,
      10,
      30
    );
    doc.text(
      `Número de Carpetas: ${item.informacionFisica.numCarpetas}`,
      10,
      40
    );

    let yOffset = 50;
    doc.text("Cuadernos:", 10, yOffset);
    item.cuadernos.forEach((cuaderno, index) => {
      yOffset += 10;
      doc.text(
        `${index + 1}. ${cuaderno.name} - ${cuaderno.description}`,
        15,
        yOffset
      );
    });

    doc.save("Expediente.pdf");
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
              <div className="w-2/3">
                <h3 className="block text-gray-600 text-sm font-medium mb-1">
                  Información Física
                </h3>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  <strong>Expediente Físico:</strong>{" "}
                  {item.informacionFisica.expedienteFisico ? "Sí" : "No"}
                </p>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  <strong>Soporte Físico:</strong>{" "}
                  {item.informacionFisica.soporteFisico ? "Sí" : "No"}
                </p>
                <p className="block text-gray-600 text-sm font-medium mb-1">
                  <strong>Número de Carpetas:</strong>{" "}
                  {item.informacionFisica.numCarpetas}
                </p>
              </div>

              <div className="w-1/3">
                <h3 className="block text-gray-600 text-sm font-medium mb-1">
                  Cuadernos
                </h3>
                {item.cuadernos.map((cuaderno) => (
                  <p
                    key={cuaderno.id}
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    <strong>{cuaderno.name}:</strong> {cuaderno.description}
                  </p>
                ))}
              </div>
              <div className="grid gap-4 w-3/12 pl-10">
                <button
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-green-700 transition"
                  onClick={() => generarPDF(item)}
                >
                  Descargar PDF
                </button>
                <button
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-green-700 transition"
                  onClick={() =>
                    navigate("/account/records/edit", {
                      state: { expediente: item },
                    })
                  }
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecordsComponents;
