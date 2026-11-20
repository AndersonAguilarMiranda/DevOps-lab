import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import DetailView from './pages/DetailView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="flexis" element={<DetailView title="Detalle de Flexis" type="flexis" />} />
          <Route path="complementarias" element={<DetailView title="Detalle de Complementarias" type="complementarias" />} />
          <Route path="festivos" element={<DetailView title="Detalle de Festivos" type="festivos" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
