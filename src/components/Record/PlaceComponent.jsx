import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const PlaceComponent = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then(({ data }) => {
      setPlace(data.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }


  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-20 pt-8">
    <h1>hola</h1>
    </div>
  );
};

export default PlaceComponent;
