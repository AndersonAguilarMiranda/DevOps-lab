import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getTrabajadores, crearTrabajador, type Trabajador, getUltimaCarga } from '../api/api';

export default function Dashboard() {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [nuevoId, setNuevoId] = useState('');
  const [error, setError] = useState('');

  // Estado para guardar las fechas que vienen del backend
  const [fechas, setFechas] = useState({
    flexis: 'Cargando...',
    complementarias: 'Cargando...',
    festivos: 'Cargando...'
  });

  const stats = [
    { title: 'Flexis', path: '/flexis' },
    { title: 'Complementarias', path: '/complementarias' },
    { title: 'Festivos', path: '/festivos' },
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

  // Carga inicial: pedimos trabajadores y fechas
  useEffect(() => {
    cargarTrabajadores();

    const cargarFechas = async () => {
      try {
        const f = await getUltimaCarga('flexis');
        const c = await getUltimaCarga('complementarias');
        const fe = await getUltimaCarga('festivos');

        setFechas({
          flexis: f.fecha ? new Date(f.fecha).toLocaleDateString() : 'Sin datos',
          complementarias: c.fecha ? new Date(c.fecha).toLocaleDateString() : 'Sin datos',
          festivos: fe.fecha ? new Date(fe.fecha).toLocaleDateString() : 'Sin datos',
        });
      } catch (e) {
        console.error("Error al cargar fechas", e);
      }
    };
    cargarFechas();
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

                  {/* AQUÍ PINTAMOS LA FECHA DINÁMICA */}
                  <p className="text-muted small mb-0">
                    {stat.title === 'Flexis' ? `Última: ${fechas.flexis}` :
                     stat.title === 'Complementarias' ? `Última: ${fechas.complementarias}` :
                     `Última: ${fechas.festivos}`}
                  </p>
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
