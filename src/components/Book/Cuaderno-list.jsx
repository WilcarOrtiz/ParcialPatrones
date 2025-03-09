"use client";

import { Trash2, Edit, FilePlus, Eye } from "lucide-react";

const CuadernoList = ({
  cuadernos,
  onDelete,
  onEdit,
  onAddDocument,
  onViewDocuments,
  visibleDocuments = {},
}) => {
  if (cuadernos.length === 0) {
    return null;
  }

  return (
    <ul className="list-disc pl-5">
      {cuadernos.map((cuaderno) => (
        <li
          key={cuaderno.id}
          className="mb-2 flex justify-between items-center border-b pb-2"
        >
          <strong>{cuaderno.name}</strong>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => onDelete(cuaderno.id)}
              type="button"
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              aria-label="Eliminar cuaderno"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => onEdit(cuaderno.id)}
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              aria-label="Editar cuaderno"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => onAddDocument(cuaderno.name)}
              type="button"
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-800"
              aria-label="Añadir documento"
            >
              <FilePlus size={20} />
            </button>
            <button
              onClick={() => onViewDocuments(cuaderno.name)}
              type="button"
              className={`p-2 ${
                visibleDocuments[cuaderno.name]
                  ? "bg-yellow-500"
                  : "bg-orange-600"
              } text-white rounded-lg hover:bg-orange-800`}
              aria-label="Ver documentos"
            >
              <Eye size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CuadernoList;
