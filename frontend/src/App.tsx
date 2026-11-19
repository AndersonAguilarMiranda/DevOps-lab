import { useEffect, useState } from 'react';
import { getTrabajadores, crearTrabajador, type Trabajador } from './api';
import './App.css';

function App() {
  const [trabajadores, setTrabajadores] = useState<Trabajador[]>([]);
  const [nuevoId, setNuevoId] = useState('');
  const [error, setError] = useState('');

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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Panel de Trabajadores</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCrear} style={{ marginBottom: '2rem' }}>
        <input
          type="number"
          placeholder="ID del trabajador"
          value={nuevoId}
          onChange={(e) => setNuevoId(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Añadir Trabajador
        </button>
      </form>

      <table border={1} style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '400px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0', color: '#000' }}>
            <th style={{ padding: '0.5rem' }}>ID</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((t) => (
            <tr key={t.id}>
              <td style={{ padding: '0.5rem', textAlign: 'center' }}>{t.id}</td>
            </tr>
          ))}
          {trabajadores.length === 0 && (
            <tr>
              <td style={{ padding: '0.5rem', textAlign: 'center', color: '#666' }}>No hay trabajadores</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
