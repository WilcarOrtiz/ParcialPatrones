"use client"

const CuadernoFormModal = ({
  nombreCuaderno,
  setNombreCuaderno,
  descripcionCuaderno,
  setDescripcionCuaderno,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Cuaderno" : "Agregar Cuaderno"}</h2>

        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            value={nombreCuaderno}
            onChange={(e) => setNombreCuaderno(e.target.value)}
            className="border rounded px-2 py-1 w-full mt-1"
          />
        </label>

        <label className="block mb-2">
          Descripción:
          <textarea
            value={descripcionCuaderno}
            onChange={(e) => setDescripcionCuaderno(e.target.value)}
            className="border rounded px-2 py-1 w-full mt-1"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button onClick={onSubmit} type="button" className="px-3 py-2 bg-green-500 text-white rounded-lg">
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
          <button onClick={onCancel} type="button" className="px-3 py-2 bg-gray-500 text-white rounded-lg">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CuadernoFormModal

