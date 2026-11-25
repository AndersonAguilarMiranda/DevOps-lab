import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { subirCsvFlexis } from '../api/api';
import { subirCsvComplementarias } from '../api/api';
import { subirCsvFestivos } from '../api/api';


interface DetailViewProps {
  title: string;
  type: 'flexis' | 'complementarias' | 'festivos';
}

export default function DetailView({ title, type }: DetailViewProps) {
  const { isAdmin } = useOutletContext<{ isAdmin: boolean }>();
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Datos de ejemplo (luego los sacaremos de la BD)
  const mockData = {
    flexis: [{ id: 101, fecha: '2026-11-01', valor: '+4h' }],
    complementarias: [{ id: 101, semana: 'Semana 1', horas: '4h' }],
    festivos: [{ id: 101, fecha: '2026-11-01', motivo: 'Todos los Santos' }],
  };

  const currentData = mockData[type] || [];

  // Función que procesa el archivo (ya sea por clic o por arrastre)
  const procesarArchivo = async (file: File) => {
    setFileName(file.name);
    setIsUploading(true);
    setMessage({ type: '', text: '' });

    try {
      if (type === 'flexis') {
        const response = await subirCsvFlexis(file);
        setMessage({ type: 'success', text: response });
      } else if (type === 'complementarias') {
        const response = await subirCsvComplementarias(file);
        setMessage({ type: 'success', text: response });
      } else if (type === 'festivos') {
        const response = await subirCsvFestivos(file);
        setMessage({ type: 'success', text: response });
      }
    } catch (error: any) {
      setMessage({ type: 'danger', text: error.message || 'Error al subir el archivo' });
    } finally {
      setIsUploading(false);
    }
  };

  // Evento para el input clásico
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) procesarArchivo(file);
  };

  // Evento para el Drag & Drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) procesarArchivo(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Necesario para permitir soltar
  };

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
        <div
          className="card border-0 shadow-sm mb-4 bg-white"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div
            className="card-body p-4 text-center border-dashed rounded"
            style={{ border: '2px dashed #ccc', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <h5 className="text-muted mb-2">Subir datos (CSV/Excel)</h5>

            {fileName ? (
              <p className="text-primary small mb-2">Archivo seleccionado: <strong>{fileName}</strong></p>
            ) : (
              <p className="text-muted small mb-2">Arrastra tu archivo CSV aquí o usa el botón.</p>
            )}

            {/* Mantenemos el input clásico por si el drag & drop falla */}
            <input
              type="file"
              accept=".csv"
              className="form-control form-control-sm"
              onChange={handleFileChange}
              disabled={isUploading}
              style={{ maxWidth: '300px', margin: '0 auto' }}
            />

            {isUploading && <p className="text-info mt-3 mb-0">Subiendo archivo...</p>}

            {message.text && (
              <div className={`alert alert-${message.type} mt-3 mb-0 py-2 w-100`} style={{ maxWidth: '500px' }}>
                {message.text}
              </div>
            )}
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
