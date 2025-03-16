import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';

/* EXPEDIENTE */
import RecordsComponents from './components/Record/RecordsComponents';
import RecordsFormComponents from './components/Record/RecordsFormComponents';
import RecordsView from './components/Record/RecordViewer';

/* DESPACHOS */
import DispatchsComponents from './components/Dispatch/DispatchsComponent';
import DispatchsFormComponents from './components/Dispatch/DispatchsFormComponents';

/*TABLA DE RETENCION DOCUMENTAL */
import DocumentRetentionTable from './components/DocumentRetentionTable/DocumentRetentionTable';
import { MainProvider } from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/expedientes" element={<RecordsComponents />} />
          <Route path="/expedientes/new" element={<RecordsFormComponents />} />

          <Route path="/despachos" element={<DispatchsComponents />} />
          <Route path="/despachos/new" element={<DispatchsFormComponents />} />
          <Route path="/expedientes/view" element={<RecordsView />} />
          <Route
            path="/DocumentRetentionTable"
            element={<DocumentRetentionTable />}
          />
        </Route>
      </Routes>
    </MainProvider>
  );
}

export default App;
