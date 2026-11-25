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

export const getUltimaCarga = async (tipo: string) => {
  const response = await fetch(`http://localhost:8080/api/historial/${tipo}`);
  if (!response.ok) throw new Error('Error al cargar la fecha');
  return response.json();
};

export const subirCsvFlexis = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file); // El nombre 'file' debe coincidir con el @RequestParam del backend

  const response = await fetch('http://localhost:8080/api/flexis/upload', {
    method: 'POST',
    body: formData,
    // OJO: No ponemos Content-Type. El navegador lo hace automáticamente al usar FormData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al subir el archivo');
  }

  return response.text(); // Devuelve el mensaje de éxito del backend
};

export const subirCsvComplementarias = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:8080/api/complementarias/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al subir el archivo');
  }
  return response.text();
};

export const subirCsvFestivos = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:8080/api/festivos/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error al subir el archivo');
  }
  return response.text();
};


