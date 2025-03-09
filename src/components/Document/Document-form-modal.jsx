"use client";

import { useState, useEffect } from "react";

const DocumentFormModal = ({
  cuadernoName,
  onSave,
  onCancel,
  documentToEdit = null,
}) => {
  const [documentData, setDocumentData] = useState({
    nombre: "",
    fechaCreacion: "",
    fechaIncorporacion: "",
    ordenDocumento: "",
    numeroPaginas: "",
    paginaInicio: "",
    paginaFin: "",
    formato: "",
    tamanio: "",
    origen: "",
    Cuaderno: cuadernoName,
    observaciones: "",
  });

  // Load document data if editing
  useEffect(() => {
    if (documentToEdit) {
      setDocumentData(documentToEdit);
    } else {
      // Reset form but keep the cuaderno name
      setDocumentData({
        nombre: "",
        fechaCreacion: "",
        fechaIncorporacion: "",
        ordenDocumento: "",
        numeroPaginas: "",
        paginaInicio: "",
        paginaFin: "",
        formato: "",
        tamanio: "",
        origen: "",
        Cuaderno: cuadernoName,
        observaciones: "",
      });
    }
  }, [documentToEdit, cuadernoName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData({ ...documentData, [name]: value });
  };

  const handleFormSubmit = () => {
    onSave(documentData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {documentToEdit ? "Editar Documento" : "Nuevo Documento"}
        </h2>
        <form>
          {Object.keys(documentData).map(
            (field) =>
              field !== "id" && (
                <div className="" key={field}>
                  {" "}
                  <label key={field} className="block mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                    <input
                      type={field.includes("fecha") ? "date" : "text"}
                      name={field}
                      value={documentData[field] || ""}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1 w-full mt-1"
                      disabled={field === "Cuaderno"} // Make Cuaderno field read-only
                    />
                  </label>
                </div>
              )
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleFormSubmit}
              className="px-3 py-2 bg-green-500 text-white rounded-lg"
            >
              {documentToEdit ? "Actualizar" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentFormModal;
