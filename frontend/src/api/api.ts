const API_URL = 'http://localhost:8080/api/trabajadores';

export interface Trabajador {
  id: number;
}

export const getTrabajadores = async (): Promise<Trabajador[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al cargar trabajadores');
  return response.json();
};

export const crearTrabajador = async (id: number): Promise<Trabajador> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Error al crear trabajador');
  return response.json();
};
