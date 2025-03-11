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

  useEffect(() => {
    if (documentToEdit) {
      setDocumentData(documentToEdit);
    } else {
      setDocumentData({
        origen: "",
        Cuaderno: cuadernoName,
        observaciones: "",
        nombre: "",
        fechaCreacion: "",
        fechaIncorporacion: "",
        ordenDocumento: "",
        numeroPaginas: "",
        paginaInicio: "",
        paginaFin: "",
        formato: "",
        tamanio: "",
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
          <div className="mb-3">
            <label className="block mb-1">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={documentData.nombre}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Fecha de Creación:</label>
            <input
              type="date"
              name="fechaCreacion"
              value={documentData.fechaCreacion}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Fecha de Incorporación:</label>
            <input
              type="date"
              name="fechaIncorporacion"
              value={documentData.fechaIncorporacion}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Orden del Documento:</label>
            <input
              type="text"
              name="ordenDocumento"
              value={documentData.ordenDocumento}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Número de Páginas:</label>
            <input
              type="number"
              name="numeroPaginas"
              value={documentData.numeroPaginas}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Página de Inicio:</label>
            <input
              type="number"
              name="paginaInicio"
              value={documentData.paginaInicio}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Página Final:</label>
            <input
              type="number"
              name="paginaFin"
              value={documentData.paginaFin}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Formato:</label>
            <select
              name="formato"
              value={documentData.formato}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Seleccione un formato</option>
              <option value="PDF">PDF</option>
              <option value="JPEG">JPEG</option>
              <option value="TIFF">TIFF</option>
              <option value="MP3">MP3</option>
              <option value="XML">XML</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Tamaño:</label>
            <input
              type="text"
              name="tamanio"
              value={documentData.tamanio}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Origen:</label>
            <select
              name="origen"
              value={documentData.origen}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Seleccione un origen</option>
              <option value="electronico">Electrónico</option>
              <option value="digitalizado">Digitalizado</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block mb-1">Cuaderno:</label>
            <input
              type="text"
              name="Cuaderno"
              value={documentData.Cuaderno}
              disabled
              className="border rounded px-2 py-1 w-full bg-gray-200"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Observaciones:</label>
            <textarea
              name="observaciones"
              value={documentData.observaciones}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full h-20"
            />
          </div>

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
