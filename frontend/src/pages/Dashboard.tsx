import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getTrabajadores, crearTrabajador, type Trabajador } from '../api/api';

export default function Dashboard() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [nuevoId, setNuevoId] = useState('');
  const [error, setError] = useState('');

  const stats = [
    { title: 'Flexis', label: 'Totales', path: '/flexis' },
    { title: 'Complementarias', label: 'Semanales', path: '/complementarias' },
    { title: 'Festivos', label: 'Anuales', path: '/festivos' },
  ];

  const cargarTrabajadores = async () => {
    try {
      const data = await getTrabajadores();
      setTrabajadores(data);
      setError('');
    } catch (err) {
      setError('No se pudo conectar al backend. ¿Está encendido?');
    }
  };

  useEffect(() => {
    cargarTrabajadores();
  }, []);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoId) return;
    try {
      await crearTrabajador(Number(nuevoId));
      setNuevoId('');
      cargarTrabajadores();
    } catch (err) {
      setError('Error al crear el trabajador');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold text-dark mb-0">Panel de Trabajadores</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* TARJETAS CLICABLES */}
      <div className="row g-3 mb-5">
        {stats.map((stat, index) => (
          <div className="col-12 col-md-4" key={index}>
            <Link to={stat.path} className="text-decoration-none">
              <div className="card border-0 shadow-sm h-100 card-hover bg-white">
                <div className="card-body p-4">
                  <h4 className="fw-bold text-dark mb-1">{stat.title}</h4>
                  <p className="text-muted small mb-0">{stat.label}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ZONA DE ADMIN */}
      {isAdmin && (
        <div className="card border-0 shadow-sm bg-white">
          <div className="card-header bg-white border-bottom py-3">
            <h5 className="mb-0 fw-bold text-dark">Gestión de Trabajadores (Admin)</h5>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleCrear} className="row g-3 mb-4">
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control form-control-lg bg-light"
                  placeholder="ID del trabajador"
                  value={nuevoId}
                  onChange={(e) => setNuevoId(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary btn-lg w-100 fw-semibold">
                  Añadir
                </button>
              </div>
            </form>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-muted text-uppercase small fw-bold">
                  <tr>
                    <th scope="col" className="py-3">ID del Trabajador</th>
                  </tr>
                </thead>
                <tbody>
                  {trabajadores.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3 fw-semibold text-dark">{t.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
