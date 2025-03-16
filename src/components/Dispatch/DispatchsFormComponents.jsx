import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

import {
  Categoria,
  Ciudad,
  Departamento,
  Despacho,
  Ubicacion,
} from "../../domain";
import { ciudadesPorDepartamento } from "../../helpers/ciudadesPorDepartamento";
import AccountNav from "../../AccountNav";
import { MainContext } from "../../context/MainContex";

const ciudadesYDepartamentos = ciudadesPorDepartamento();

const DispatchsFormComponents = () => {
  const principal = useContext(MainContext);

  const [redirect, setRedirect] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("municipal");
  const [departamento, setDepartamento] = useState();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [ciudades, setCiudades] = useState([]);

  const onDepartamentoChanged = (event) => {
    const departamento = event.target.value;
    setDepartamento(departamento);
    setCiudades(ciudadesYDepartamentos[Departamento[departamento]] || []);
  };

  async function guardarDespacho(ev) {
    ev.preventDefault();

    const ciudad = Object.keys(Ciudad).find(
      (ciudad) => Ciudad[ciudad] === ciudadSeleccionada
    );

    principal.registrarDespacho(
      new Despacho(
        codigo,
        nombre,
        categoria,
        new Ubicacion(ciudad, departamento),
        []
      )
    );

    swal("Despacho registrado", "Registro completado", "success");
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/despachos"} />;
  }

  return (
    <div>
      <AccountNav />
      <form className="mt-20 w-3/4 mx-auto" onSubmit={guardarDespacho}>
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Código */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Código:
            </label>
            <input
              type="number"
              placeholder="Ejemplo: 12345"
              value={codigo}
              onChange={(ev) => setCodigo(ev.target.value.replace(/\D/, ""))} // Evita caracteres no numéricos
              onInput={(ev) =>
                (ev.target.value = ev.target.value.replace(/[^0-9]/g, ""))
              } // Restringe la entrada a números
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
              {Object.keys(Categoria).map((categoria) => (
                <option key={categoria} value={categoria}>
                  {Categoria[categoria]}
                </option>
              ))}
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
                onChange={onDepartamentoChanged}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-300 focus:outline-none"
              >
                <option value="">Seleccione un departamento</option>
                {Object.keys(Departamento).map((departamento) => (
                  <option
                    key={departamento}
                    value={departamento}
                    className="p-2"
                  >
                    {Departamento[departamento]}
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
                value={ciudadSeleccionada}
                onChange={(ev) => setCiudadSeleccionada(ev.target.value)}
                disabled={!departamento}
                className={`w-full p-2 border rounded-lg focus:ring-2
                  focus:ring-gray-300 focus:outline-none 
                  ${
                    !departamento
                      ? "bg-gray-100 cursor-not-allowed"
                      : "bg-white"
                  }`}
              >
                <option value="">Seleccione una ciudad</option>
                {departamento &&
                  ciudades.map((ciudad) => (
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
