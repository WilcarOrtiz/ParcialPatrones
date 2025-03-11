import { Link } from "react-router-dom";
import AccountNav from "../../AccountNav";
import { useEffect, useState } from "react";

const DispatchsComponents = () => {
  const [Despachos, setDespachos] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const fakeData = [
        {
          codigo: "1234567",
          nombre: "Wilcar",
          categoria: "distrital",
          departamento: "Bolívar",
          ciudad: "Magangué",
        },
        {
          codigo: "2345678",
          nombre: "Daniel",
          categoria: "distrital",
          departamento: "Bolívar",
          ciudad: "Magangué",
        },
        {
          codigo: "3456789",
          nombre: "Ortiz",
          categoria: "distrital",
          departamento: "Bolívar",
          ciudad: "Magangué",
        },
      ];
      setDespachos(fakeData);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <AccountNav />

      <div className="text-center mb-6">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
          to={"/account/despachos/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Agregar nuevo despacho
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Despachos.length > 0 &&
          Despachos.map((item) => (
            <div
              key={item.codigo}
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Código: <span className="font-normal">{item.codigo}</span>
              </h2>
              <p className="text-gray-700 mt-2">
                <strong>Nombre:</strong> {item.nombre}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Departamento:</strong> {item.departamento}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Ciudad:</strong> {item.ciudad}
              </p>
              {item.address && (
                <p className="text-sm text-gray-500 mt-3 italic">
                  Dirección: {item.address}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DispatchsComponents;
