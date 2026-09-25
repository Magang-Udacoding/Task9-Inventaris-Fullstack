import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import LogoutModal from './LogoutModal';
import { LayoutGrid, Package, LogOut, Box, Moon, Sun, ChevronRight, User, Menu, X } from 'lucide-react';

/* ─────────────────────────────────────────────
   INJECT GLOBAL STYLES (RESPONSIVE FB MONOCHROME)
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --header-h: 46px;
    --sidebar-w: 220px;
    --radius: 3px;

    /* Light Classic Monochrome */
    --bg:        #f2f2f2;
    --sidebar:   #ffffff;
    --card:      #ffffff;
    --surface:   #f7f7f7;
    --border:    #cccccc;
    --text:      #111111;
    --subtext:   #666666;
    
    --accent:    #000000;
    --accent-fg: #ffffff;
    
    --active-bg: #000000;
    --active-tx: #ffffff;
    --hover-bg:  #ececec;
  }

  [data-theme="dark"] {
    /* Dark Classic Monochrome */
    --bg:        #121212;
    --sidebar:   #1c1c1c;
    --card:      #1c1c1c;
    --surface:   #252525;
    --border:    #383838;
    --text:      #f0f0f0;
    --subtext:   #999999;
    
    --accent:    #ffffff;
    --accent-fg: #000000;
    
    --active-bg: #ffffff;
    --active-tx: #000000;
    --hover-bg:  #2d2d2d;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Tahoma, 'Inter', Verdana, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    font-size: 13px;
  }

  /* ── Layout shell ── */
  .shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* ── Top Classic Header Bar ── */
  .top-header {
    height: var(--header-h);
    background: #000000;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    border-bottom: 1px solid #333333;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mobile-toggle {
    display: none;
    background: transparent;
    border: 1px solid #444444;
    color: #ffffff;
    padding: 4px 6px;
    border-radius: 3px;
    cursor: pointer;
  }
  .header-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: #ffffff;
    font-family: Tahoma, sans-serif;
    font-weight: 800;
    font-size: 15px;
    letter-spacing: -0.02em;
  }
  .header-brand-icon {
    width: 26px; height: 26px;
    background: #ffffff;
    color: #000000;
    border-radius: 3px;
    display: flex; align-items: center; justify-content: center;
  }
  .header-user-zone {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-user-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #e0e0e0;
  }
  .header-btn {
    background: transparent;
    border: 1px solid #444444;
    color: #ffffff;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: Tahoma, sans-serif;
  }
  .header-btn:hover {
    background: #222222;
    border-color: #666666;
  }

  /* ── Body Container ── */
  .body-container {
    display: flex;
    margin-top: var(--header-h);
    min-height: calc(100vh - var(--header-h));
  }

  /* ── Left Sidebar ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--sidebar);
    border-right: 1px solid var(--border);
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: var(--header-h);
    left: 0;
    bottom: 0;
    z-index: 90;
    transition: left 0.25s ease;
  }
  .sidebar-backdrop {
    display: none;
  }

  .nav-section {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--subtext);
    text-transform: uppercase;
    padding: 0 8px;
    margin-bottom: 6px;
  }
  nav { display: flex; flex-direction: column; gap: 2px; }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: var(--radius);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    border: 1px solid transparent;
  }
  .nav-link:hover {
    background: var(--hover-bg);
    border-color: var(--border);
  }
  .nav-link.active {
    background: var(--active-bg);
    color: var(--active-tx);
    border-color: var(--active-bg);
  }
  .nav-link.active .nav-icon {
    color: var(--active-tx);
  }
  .nav-chevron {
    margin-left: auto;
    opacity: 0.5;
  }

  /* ── Main ── */
  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    padding: 20px;
    background: var(--bg);
    width: calc(100% - var(--sidebar-w));
    transition: margin 0.25s ease, width 0.25s ease;
  }
  .main-inner {
    max-width: 1040px;
    margin: 0 auto;
  }

  /* ── Responsive Media Queries for Mobile & Tablets ── */
  @media (max-width: 768px) {
    .mobile-toggle {
      display: flex;
    }
    .sidebar {
      left: -100%;
      z-index: 150;
      box-shadow: 2px 0 12px rgba(0,0,0,0.3);
    }
    .sidebar.open {
      left: 0;
    }
    .sidebar-backdrop {
      display: block;
      position: fixed;
      inset: 0;
      top: var(--header-h);
      background: rgba(0,0,0,0.5);
      z-index: 140;
    }
    .main {
      margin-left: 0;
      width: 100%;
      padding: 12px;
    }
    .header-user-info span {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .top-header {
      padding: 0 10px;
    }
    .header-brand-title {
      display: none;
    }
    .main {
      padding: 8px;
    }
  }
`;

const Layout = () => {
  const { user, logout } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleOpenLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      setShowLogoutModal(false);
      notify.success('Anda telah berhasil keluar dari sistem inventaris.', 'Sampai Jumpa!');
      navigate('/login');
    } catch {
      notify.error('Terjadi kendala saat melakukan logout.', 'Gagal Keluar');
    } finally {
      setLogoutLoading(false);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <style>{STYLES}</style>

      <div className="shell">
        {/* ── Top Classic Header Bar ── */}
        <header className="top-header">
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} title="Toggle menu">
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="header-brand">
              <span className="header-brand-icon"><Box size={15} /></span>
              <span className="header-brand-title">Inventaris</span>
            </div>
          </div>

          <div className="header-user-zone">
            <div className="header-user-info">
              <User size={14} />
              <span>{user?.name || 'Pengguna'}</span>
            </div>

            <button className="header-btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>

            <button className="header-btn" onClick={handleOpenLogout}>
              <LogOut size={12} />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* ── Pop up Logout Modal ── */}
        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => !logoutLoading && setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
          loading={logoutLoading}
          userName={user?.name}
        />

        {/* ── Body ── */}
        <div className="body-container">
          {/* Backdrop Overlay on Mobile */}
          {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobile} />}

          {/* ── Sidebar ── */}
          <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
            <div className="nav-section">Navigasi Utama</div>
            <nav>
              <NavLink
                to="/items"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMobile}
              >
                <Package size={15} className="nav-icon" />
                <span>Data Inventaris</span>
                <ChevronRight size={12} className="nav-chevron" />
              </NavLink>

              <NavLink
                to="/categories"
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={closeMobile}
              >
                <LayoutGrid size={15} className="nav-icon" />
                <span>Kategori Barang</span>
                <ChevronRight size={12} className="nav-chevron" />
              </NavLink>
            </nav>
          </aside>

          {/* ── Main Content ── */}
          <main className="main">
            <div className="main-inner">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;