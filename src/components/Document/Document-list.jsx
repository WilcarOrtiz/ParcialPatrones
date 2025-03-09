
import { Trash2, Edit } from "lucide-react"

const DocumentList = ({ documents, onEdit, onDelete }) => {
  if (!documents || documents.length === 0) {
    return <div className="ml-10 mt-2 mb-4 text-gray-500 italic">No hay documentos en este cuaderno</div>
  }

  return (
    <div className="ml-10 mt-2 mb-4 bg-gray-50 p-3 rounded-md">
      <h3 className="font-semibold mb-2">Documentos:</h3>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <span className="font-medium">{doc.nombre}</span>
              {doc.fechaCreacion && (
                <span className="text-sm text-gray-500 ml-2">
                  Fecha: {new Date(doc.fechaCreacion).toLocaleDateString()}
                </span>
              )}
              {doc.observaciones && <p className="text-sm text-gray-600 mt-1">{doc.observaciones}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(doc)}
                type="button"
                className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                aria-label="Editar documento"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(doc.id)}
                type="button"
                className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-700"
                aria-label="Eliminar documento"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DocumentList

