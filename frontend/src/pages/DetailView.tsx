import { Link, useOutletContext } from 'react-router-dom';

interface DetailViewProps {
  title: string;
  type: 'flexis' | 'complementarias' | 'festivos';
}

export default function DetailView({ title, type }: DetailViewProps) {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();

  // Datos de ejemplo
  const mockData = {
    flexis: [{ id: 101, fecha: '2026-11-01', valor: '+4h' }],
    complementarias: [{ id: 101, semana: 'Semana 1', horas: '4h' }],
    festivos: [{ id: 101, fecha: '2026-11-01', motivo: 'Todos los Santos' }],
  };

  const currentData = mockData[type] || [];

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <Link to="/" className="btn btn-light border me-3 shadow-sm">
          &larr; Volver
        </Link>
        <h2 className="mb-0 fw-bold">{title}</h2>
      </div>

      {/* ZONA DE SUBIDA DE CSV (SOLO ADMIN) */}
      {isAdmin && (
        <div className="card border-0 shadow-sm mb-4 bg-white">
          <div className="card-body p-4 text-center border-dashed rounded" style={{ border: '2px dashed #ccc' }}>
            <h5 className="text-muted mb-2">Subir datos (CSV/Excel)</h5>
            <p className="text-muted small mb-3">Arrastra tu archivo aquí o haz clic para seleccionar.</p>
            <button className="btn btn-outline-primary">Seleccionar Archivo</button>
          </div>
        </div>
      )}

      <div className="card shadow-sm border-0 bg-white">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              {type === 'flexis' && <tr><th className="py-3 px-4">ID</th><th>Fecha</th><th>Valor</th></tr>}
              {type === 'complementarias' && <tr><th className="py-3 px-4">ID</th><th>Semana</th><th>Horas</th></tr>}
              {type === 'festivos' && <tr><th className="py-3 px-4">ID</th><th>Fecha</th><th>Motivo</th></tr>}
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className={i === 0 ? 'px-4' : ''}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
