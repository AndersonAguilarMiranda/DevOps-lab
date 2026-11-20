import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Simulamos que el usuario es Admin. Luego esto vendrá del login.
  const isAdmin = true;

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* CABECERA (NAVBAR) RESPONSIVE */}
      <header className="navbar navbar-expand navbar-light bg-white border-bottom shadow-sm px-2 px-md-3 py-2 sticky-top">
        <div className="container-fluid p-0 d-flex align-items-center">

          {/* Botón Hamburguesa y Logo */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <button
              className="btn btn-link text-dark fs-4 px-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <Link to="/" className="navbar-brand mb-0 h1 fw-bold text-dark text-decoration-none d-none d-sm-block">
              dmz2
            </Link>
          </div>

          {/* Buscador - Ocupa el espacio central, siempre visible */}
          <div className="d-flex mx-3 flex-grow-1" style={{ maxWidth: '500px' }}>
            <input
              type="search"
              className="form-control bg-light border-0"
              placeholder="Buscar..."
              style={{ minWidth: '100px' }} // Evita que desaparezca en móviles
            />
          </div>

          {/* Iconos de la derecha (Idioma, Tema, Usuario) */}
          <div className="d-flex align-items-center gap-1 gap-sm-2 gap-md-3 ms-auto flex-shrink-0">
            <button className="btn btn-sm btn-light border-0 fw-bold px-2" title="Idioma">ES</button>
            <button className="btn btn-sm btn-light border-0 px-2" title="Modo Oscuro">🌙</button>

            {/* El separador vertical solo aparece en pantallas medianas o grandes */}
            <div className="vr d-none d-md-block"></div>

            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '32px', height: '32px' }}>
                A
              </div>
              {/* El texto 'Admin' solo aparece en pantallas grandes */}
              <span className="d-none d-lg-block fw-semibold text-dark mt-1">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1 position-relative">
        {/* BARRA LATERAL (SIDEBAR) */}
        {sidebarOpen && (
          <aside className="bg-white border-end shadow-sm p-3 position-absolute h-100 z-3" style={{ width: '250px', top: 0, left: 0 }}>
            <h6 className="text-muted text-uppercase small fw-bold mb-3">Menú</h6>
            <ul className="nav flex-column gap-1">
              <li className="nav-item">
                <Link to="/" className="nav-link text-dark fw-semibold rounded hover-bg" onClick={() => setSidebarOpen(false)}>📊 Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/flexis" className="nav-link text-dark rounded hover-bg" onClick={() => setSidebarOpen(false)}>⏱️ Flexis</Link>
              </li>
              <li className="nav-item">
                <Link to="/complementarias" className="nav-link text-dark rounded hover-bg" onClick={() => setSidebarOpen(false)}>⚡ Complementarias</Link>
              </li>
              <li className="nav-item">
                <Link to="/festivos" className="nav-link text-dark rounded hover-bg" onClick={() => setSidebarOpen(false)}>🎉 Festivos</Link>
              </li>

              {/* Enlace extra si es admin */}
              {isAdmin && (
                <li className="nav-item mt-3 border-top pt-3">
                  <Link to="/admin" className="nav-link text-primary fw-bold rounded hover-bg" onClick={() => setSidebarOpen(false)}>⚙️ Zona Admin</Link>
                </li>
              )}

              <li className="nav-item mt-4">
                <Link to="/login" className="nav-link text-danger fw-semibold rounded hover-bg" onClick={() => setSidebarOpen(false)}>🚪 Cerrar Sesión</Link>
              </li>
            </ul>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className="container-fluid py-4 px-3 px-md-4 flex-grow-1">
          <Outlet context={{ isAdmin }} />
        </main>
      </div>

      {/* PIE DE PÁGINA */}
      <footer className="bg-white border-top py-3 mt-auto">
        <div className="container-fluid px-3 px-md-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small gap-2">
          <span>&copy; {new Date().getFullYear()} DevOps-lab (dmz2)</span>
          <span>Proyecto de Portfolio</span>
        </div>
      </footer>
    </div>
  );
}
