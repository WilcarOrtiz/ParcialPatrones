

import { useState } from "react"

const DataViewer = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!data) return null

  return (
    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
      <button onClick={() => setIsOpen(!isOpen)} className="text-blue-600 underline mb-2">
        {isOpen ? "Ocultar datos" : "Ver datos recopilados"}
      </button>

      {isOpen && (
        <pre className="bg-white p-4 rounded border overflow-auto max-h-96">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default DataViewer

