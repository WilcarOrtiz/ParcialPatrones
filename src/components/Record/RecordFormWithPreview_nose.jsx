import { useState } from "react";
import AccountNav from "../../AccountNav";
import PhysicalInfoSection from "./physical-info-section";
import CuadernosSection from "./cuadernos-section";
import DataViewer from "./data-viewer";

const RecordsFormWithPreview = () => {
  const [expedienteFisico, setExpedienteFisico] = useState(false);
  const [soporteFisico, setSoporteFisico] = useState(false);
  const [numCarpetas, setNumCarpetas] = useState(0);
  const [cuadernosData, setCuadernosData] = useState({
    cuadernos: [],
    documentos: [],
  });

  const [formData, setFormData] = useState(null);

  const updateCuadernosData = (data) => {
    setCuadernosData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recopilar toda la información
    const allFormData = {
      informacionFisica: {
        expedienteFisico,
        soporteFisico,
        numCarpetas: soporteFisico ? numCarpetas : 0,
      },
      cuadernos: cuadernosData.cuadernos,
      documentos: cuadernosData.documentos,
    };

    // Actualizar el estado para mostrar en el visor
    setFormData(allFormData);

    console.log("Datos completos del formulario:", allFormData);

    // Aquí puedes enviar los datos a tu servidor
    // submitToServer(allFormData)

    console.log("Datos enviados al servidor", allFormData);
  };

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSubmit}>
        <PhysicalInfoSection
          expedienteFisico={expedienteFisico}
          setExpedienteFisico={setExpedienteFisico}
          soporteFisico={soporteFisico}
          setSoporteFisico={setSoporteFisico}
          numCarpetas={numCarpetas}
          setNumCarpetas={setNumCarpetas}
        />

        <CuadernosSection updateParentData={updateCuadernosData} />

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Guardar Todo
          </button>
        </div>
      </form>

      {/* Visor de datos para verificar la información recopilada */}
      <DataViewer data={formData} />
    </div>
  );
};

export default RecordsFormWithPreview;
