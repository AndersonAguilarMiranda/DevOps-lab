import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  Menu, Moon, Sun, Search, Settings, LogOut
} from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const isAdmin = true;

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-bs-theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* CABECERA */}
      <header className="navbar navbar-expand border-bottom shadow-sm px-2 px-md-3 py-2 sticky-top bg-body">
        <div className="container-fluid p-0 d-flex align-items-center">

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <button
              className="btn btn-link text-body fs-4 px-1"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="navbar-brand mb-0 h1 fw-bold text-body text-decoration-none d-none d-sm-block">
              dmz2
            </Link>
          </div>

          {/* BUSCADOR CON ICONO */}
          <div className="d-flex mx-3 flex-grow-1 position-relative" style={{ maxWidth: '500px' }}>
            <Search size={18} className="position-absolute text-muted" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="search"
              className="form-control ps-5"
              placeholder="Buscar..."
              style={{ minWidth: '100px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-1 gap-sm-2 gap-md-3 ms-auto flex-shrink-0">
            <button className="btn btn-sm btn-link text-body border-0 fw-bold px-2 text-decoration-none" title="Idioma">ES</button>

            {/* BOTÓN DEL TEMA */}
            <button
              className="btn btn-sm btn-link text-body border-0 px-2 text-decoration-none"
              title="Modo Oscuro"
              onClick={toggleTheme}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="vr d-none d-md-block"></div>

            <div className="d-flex align-items-center gap-2">
              <div
                className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg, var(--bs-primary) 0%, #8b5cf6 100%)'
                }}
              >
                A
              </div>
              <span className="d-none d-lg-block fw-semibold text-body mt-1">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1 position-relative">
        {/* BARRA LATERAL */}
        {sidebarOpen && (
          <aside className="bg-body border-end shadow-sm p-3 position-absolute h-100 z-3" style={{ width: '250px', top: 0, left: 0 }}>
            <h6 className="text-muted text-uppercase small fw-bold mb-3">Menú</h6>
            <ul className="nav flex-column gap-1">
              <li className="nav-item">
                <Link to="/" className="nav-link text-body fw-semibold rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                   Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/flexis" className="nav-link text-body rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  Flexis
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/complementarias" className="nav-link text-body rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                   Complementarias
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/festivos" className="nav-link text-body rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                   Festivos
                </Link>
              </li>

              {isAdmin && (
                <li className="nav-item mt-3 border-top pt-3">
                  <Link to="/admin" className="nav-link text-primary fw-bold rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                    <Settings size={18} /> Zona Admin
                  </Link>
                </li>
              )}

              <li className="nav-item mt-4">
                <Link to="/login" className="nav-link text-danger fw-semibold rounded hover-bg d-flex align-items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  <LogOut size={18} /> Cerrar Sesión
                </Link>
              </li>
            </ul>
          </aside>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className="container-fluid py-4 px-3 px-md-4 flex-grow-1">
          <Outlet context={{ isAdmin }} />
        </main>
      </div>

      <footer className="bg-body border-top py-3 mt-auto">
        <div className="container-fluid px-3 px-md-4 d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small gap-2">
          <span>&copy; {new Date().getFullYear()} DevOps-lab (dmz2)</span>
          <span>Proyecto de Portfolio</span>
        </div>
      </footer>
    </div>
  );
}
