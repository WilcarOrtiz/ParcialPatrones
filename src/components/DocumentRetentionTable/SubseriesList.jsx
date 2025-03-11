import { useState } from "react";
import { Plus, X } from "lucide-react";

const SubseriesList = ({ serie, setSeries, onAddSubserie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [selectedSubserie, setSelectedSubserie] = useState(null);
  const [newSubserie, setNewSubserie] = useState({
    codigo: "",
    descripcion: "",
    tipoDocumento: [],
  });

  const [newDocumento, setNewDocumento] = useState({ tipoDocumento: "" });

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewSubserie({ codigo: "", descripcion: "", tipoDocumento: [] });
  };

  const openDocModal = (subserie) => {
    setSelectedSubserie(subserie);
    setShowDocModal(true);
  };

  const closeDocModal = () => {
    setShowDocModal(false);
    setNewDocumento({ tipoDocumento: "" });
  };

  const handleSaveSubserie = () => {
    if (newSubserie.codigo && newSubserie.descripcion) {
      console.log("nueva subserie", newSubserie);
      onAddSubserie(serie.codigo, newSubserie);
      closeModal();
    }
  };

  const handleSaveDocumento = () => {
    if (newDocumento.tipoDocumento && selectedSubserie) {
      console.log(
        "Nuevo documento: ",
        newDocumento,
        "de la subserie",
        selectedSubserie
      );

      setSeries((prevSeries) =>
        prevSeries.map((s) => {
          if (s.codigo === serie.codigo) {
            return {
              ...s,
              subseries: s.subseries.map((sub) =>
                sub.codigo === selectedSubserie.codigo
                  ? {
                      ...sub,
                      tipoDocumento: [
                        ...sub.tipoDocumento,
                        newDocumento.tipoDocumento,
                      ],
                    }
                  : sub
              ),
            };
          }
          return s;
        })
      );

      closeDocModal();
    }
  };

  return (
    <div className="mt-3 pl-10 bg-gray-100 p-3 rounded-lg shadow-inner">
      <div className="flex justify-center mt-3 mb-3">
        <button
          className="px-2 py-1 rounded-xl bg-gray-100 transition duration-300 hover:bg-gray-300"
          onClick={openModal}
        >
          <h3 className="text-gray-600 text-sm font-medium">
            Agregar subserie
          </h3>
        </button>
      </div>

      {serie.subseries.length > 0 ? (
        serie.subseries.map((sub) => (
          <div
            key={sub.codigo}
            className="py-2 px-3 bg-white rounded-lg shadow-sm border-l-4 mb-2"
          >
            <div className="flex justify-between gap-5">
              <h3 className="block text-gray-600 text-sm font-medium mb-1">
                {sub.descripcion}
              </h3>

              <button
                className="px-2 py-1 rounded-xl bg-gray-100 transition duration-300 hover:bg-gray-300"
                onClick={() => openDocModal(sub)}
              >
                <h3 className="text-gray-600 text-sm font-medium">
                  Agregar tipo documento
                </h3>
              </button>
            </div>

            {/* Lista de documentos agregados */}
            <div className="mt-2">
              <h4 className="text-gray-600 text-xs font-semibold">
                Tipos de Documento:
              </h4>
              {sub.tipoDocumento.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 text-xs">
                  {sub.tipoDocumento.map((doc, index) => (
                    <li key={index} className="mt-1">
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-xs">
                  No hay documentos registrados.
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No hay subseries registradas</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Agregar Subserie</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Código de Subserie"
              value={newSubserie.codigo}
              onChange={(e) =>
                setNewSubserie({ ...newSubserie, codigo: e.target.value })
              }
              className="w-full border rounded-md p-1 mb-1"
            />
            <input
              type="text"
              placeholder="Descripción de Subserie"
              value={newSubserie.descripcion}
              onChange={(e) =>
                setNewSubserie({ ...newSubserie, descripcion: e.target.value })
              }
              className="w-full border rounded-md p-2 mb-4"
            />
            <button
              onClick={handleSaveSubserie}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {showDocModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">
                Agregar Tipo de Documento
              </h2>
              <button
                onClick={closeDocModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Tipo de Documento"
              value={newDocumento.tipoDocumento}
              onChange={(e) =>
                setNewDocumento({ tipoDocumento: e.target.value })
              }
              className="w-full border rounded-md p-2 mb-4"
            />
            <button
              onClick={handleSaveDocumento}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubseriesList;
