import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../../AccountNav";

const DispatchsFormComponents = () => {
  const [redirect, setRedirect] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("municipal");
  const [departamento, setDepartamento] = useState("");
  const [ciudad, setCiudad] = useState("");

  const departamentos = {
    Amazonas: ["Leticia", "Puerto Nariño"],
    Antioquia: [
      "Medellín",
      "Bello",
      "Envigado",
      "Itagüí",
      "Rionegro",
      "Apartadó",
    ],
    Arauca: ["Arauca", "Saravena", "Tame"],
    Atlántico: ["Barranquilla", "Soledad", "Malambo", "Sabanalarga"],
    Bolívar: ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar"],
    Boyacá: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Puerto Boyacá"],
    Caldas: ["Manizales", "La Dorada", "Chinchiná"],
    Caquetá: ["Florencia", "San Vicente del Caguán"],
    Casanare: ["Yopal", "Aguazul", "Villanueva", "Tauramena"],
    Cauca: ["Popayán", "Santander de Quilichao", "Puerto Tejada"],
    Cesar: [
      "Valledupar",
      "Aguachica",
      "El Copey",
      "La Jagua de Ibirico",
      "Bosconia",
    ],
    Chocó: ["Quibdó", "Istmina", "Riosucio"],
    Córdoba: ["Montería", "Cereté", "Sahagún", "Lorica"],
    Cundinamarca: [
      "Bogotá",
      "Soacha",
      "Zipaquirá",
      "Chía",
      "Facatativá",
      "Fusagasugá",
      "Girardot",
    ],
    Guainía: ["Inírida"],
    Guaviare: ["San José del Guaviare"],
    Huila: ["Neiva", "Pitalito", "Garzón", "La Plata"],
    Guajira: ["Riohacha", "Maicao", "Fonseca", "San Juan del Cesar"],
    Magdalena: ["Santa Marta", "Ciénaga", "Fundación", "El Banco"],
    Meta: ["Villavicencio", "Acacías", "Granada", "Puerto Gaitán"],
    Nariño: ["Pasto", "Ipiales", "Tumaco", "La Unión"],
    NorteDeSantander: [
      "Cúcuta",
      "Ocaña",
      "Pamplona",
      "Los Patios",
      "Villa del Rosario",
    ],
    Putumayo: ["Mocoa", "Puerto Asís", "Orito"],
    Quindío: ["Armenia", "Montenegro", "Circasia", "La Tebaida"],
    Risaralda: [
      "Pereira",
      "Dosquebradas",
      "Santa Rosa de Cabal",
      "La Virginia",
    ],
    SanAndrésYProvidencia: ["San Andrés"],
    Santander: [
      "Bucaramanga",
      "Floridablanca",
      "Barrancabermeja",
      "Girón",
      "San Gil",
    ],
    Sucre: ["Sincelejo", "Corozal", "San Marcos"],
    Tolima: ["Ibagué", "Espinal", "Melgar", "Honda"],
    ValleDelCauca: [
      "Cali",
      "Palmira",
      "Buenaventura",
      "Tuluá",
      "Buga",
      "Cartago",
    ],
    Vaupés: ["Mitú"],
    Vichada: ["Puerto Carreño"],
  };

  async function savePlace(ev) {
    ev.preventDefault();
    const dispatchData = { codigo, nombre, categoria, departamento, ciudad };

    {
      /* REGISTRAR EL DESPACHO */
    }
    alert(JSON.stringify(dispatchData, null, 2));
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form className="mt-20 w-3/4 mx-auto" onSubmit={savePlace}>
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Código */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Código:
            </label>
            <input
              type="text"
              placeholder="Ejemplo: 12345"
              value={codigo}
              onChange={(ev) => setCodigo(ev.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
            />
          </div>

          {/* Nombre */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Nombre:
            </label>
            <input
              type="text"
              placeholder="Ejemplo: Biblioteca Central"
              value={nombre}
              onChange={(ev) => setNombre(ev.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
            />
          </div>

          {/* Categoría */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Categoría:
            </label>
            <select
              value={categoria}
              onChange={(ev) => setCategoria(ev.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-gray-300 focus:outline-none"
            >
              <option value="municipal">Municipal</option>
              <option value="distrital">Distrital</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-4">
            {/* Departamento */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Departamento:
              </label>
              <select
                value={departamento}
                onChange={(ev) => setDepartamento(ev.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
              >
                <option value="">Seleccione un departamento</option>
                {Object.keys(departamentos).map((dep) => (
                  <option key={dep} value={dep} className="p-2">
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {/* Ciudad */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Ciudad:
              </label>
              <select
                value={ciudad}
                onChange={(ev) => setCiudad(ev.target.value)}
                disabled={!departamento}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none 
        ${!departamento ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
              >
                <option value="">Seleccione una ciudad</option>
                {departamento &&
                  departamentos[departamento].map((ciudad) => (
                    <option key={ciudad} value={ciudad} className="p-2">
                      {ciudad}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="primary my-4 max-w-xs px-6">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default DispatchsFormComponents;
