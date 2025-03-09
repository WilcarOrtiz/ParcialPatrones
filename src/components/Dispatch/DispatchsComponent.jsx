import { Link } from "react-router-dom";
import AccountNav from "../../AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";


const DispatchsComponents = () => {
  const [Despachos, setDespachos] = useState([]);

  useEffect(() => {
    axios.get("/despachos/user-Despachos").then(({ data }) => {
      setDespachos(data.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
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
      <div className="mt-4">
        {Despachos.length > 0 &&
          Despachos.map((item) => (
            <Link
              to={"/despachos/" + item._id}
              className="mt-2 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mt-5 mr-10 ml-10"
              key={item.id}
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg item={item}/>
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-lg ">{item.tittle}</h2>
                <p className="text-base mt-2 ">{item.description}</p>
                <p className="text-sm text-right mt-3 text-gray-500 ">{item.address}</p>
              </div>
            </Link> 
          ))}
      </div>
    </div>
  );
};

export default DispatchsComponents;

