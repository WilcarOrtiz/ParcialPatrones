import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";

/* EXPEDIENTE */
import RecordsComponents from "./components/Record/RecordsComponents";
import RecordsFormComponents from "./components/Record/RecordsFormComponents";

/* DESPACHOS */
import DispatchsComponents from "./components/Dispatch/DispatchsComponent";
import DispatchsFormComponents from "./components/Dispatch/DispatchsFormComponents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/account/records" element={<RecordsComponents />} />
        <Route
          path="/account/records/new"
          element={<RecordsFormComponents />}
        />

        <Route path="/account/despachos" element={<DispatchsComponents />} />
        <Route
          path="/account/despachos/new"
          element={<DispatchsFormComponents />}
        />
        <Route
          path="/account/records/edit"
          element={<RecordsFormComponents />}
        />

        <Route path="/account/places/:id" element={<RecordsFormComponents />} />
      </Route>
    </Routes>
  );
}

export default App;
