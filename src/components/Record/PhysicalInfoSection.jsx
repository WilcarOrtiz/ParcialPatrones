const PhysicalInfoSection = ({
  expedienteFisico,
  setExpedienteFisico,
  soporteFisico,
  setSoporteFisico,
  numCarpetas,
  setNumCarpetas,
}) => {
  return (
    <div>
      <div className="flex gap-8">
        <div>
          <label className="block text-gray-600 text-sm font-medium mb-1">
            ¿Expediente físico?
          </label>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setExpedienteFisico(true)}
              className={`px-4 py-2 rounded ${
                expedienteFisico ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() => setExpedienteFisico(false)}
              className={`px-4 py-2 rounded ${
                !expedienteFisico ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              ¿Soporte físico?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setSoporteFisico(true)}
                className={`px-4 py-2 rounded ${
                  soporteFisico ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => {
                  setSoporteFisico(false);
                  setNumCarpetas(0);
                }}
                className={`px-4 py-2 rounded ${
                  !soporteFisico ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {soporteFisico && (
            <div>
              <label className="block mb-2">Número de carpetas:</label>

              <input
                type="number"
                value={numCarpetas}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setNumCarpetas(value === "" ? 0 : Number(value));
                  }
                }}
                min="0"
                className="border rounded px-2 py-1 w-20"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicalInfoSection;
