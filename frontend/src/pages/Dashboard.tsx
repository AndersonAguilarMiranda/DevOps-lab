import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getTrabajadores, crearTrabajador, type Trabajador } from '../api/api';

export default function Dashboard() {
  // Recogemos si es admin desde el Layout
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [nuevoId, setNuevoId] = useState('');
  const [error, setError] = useState('');

  const stats = [
    { title: 'Flexis', value: '12', label: 'Balance positivo', icon: '⏱️', color: 'primary', path: '/flexis' },
    { title: 'Complementarias', value: '8h', label: 'Esta semana', icon: '⚡', color: 'success', path: '/complementarias' },
    { title: 'Festivos', value: '2', label: 'Este mes', icon: '🎉', color: 'warning', path: '/festivos' },
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
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="card-title text-muted mb-2 fw-semibold">{stat.title}</h5>
                      <h2 className="display-5 fw-bold text-dark mb-0">{stat.value}</h2>
                    </div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center bg-${stat.color} bg-opacity-10`} style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge bg-${stat.color} bg-opacity-10 text-${stat.color} fw-bold`}>
                      {stat.title === 'Flexis' ? '+5.25%' : stat.title === 'Complementarias' ? '+2h' : 'Hoy'}
                    </span>
                    <span className="text-muted small">{stat.label}</span>
                  </div>
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
                  <tr><th scope="col" className="py-3">ID del Trabajador</th></tr>
                </thead>
                <tbody>
                  {trabajadores.map((t) => (
                    <tr key={t.id}><td className="py-3 fw-semibold text-dark">{t.id}</td></tr>
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
