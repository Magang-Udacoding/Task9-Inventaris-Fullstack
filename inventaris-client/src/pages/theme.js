// Shared theme CSS — Classic FB Monochrome (Fully Responsive)
export const THEME_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --sidebar-w: 220px;
    --radius: 3px;

    /* Light Classic Monochrome */
    --bg:        #f2f2f2;
    --sidebar:   #ffffff;
    --card:      #ffffff;
    --surface:   #f7f7f7;
    --border:    #cccccc;
    --border-dark: #888888;
    --text:      #111111;
    --subtext:   #666666;
    
    --accent:    #000000;
    --accent-fg: #ffffff;
    
    --active-bg: #000000;
    --active-tx: #ffffff;
    --hover-bg:  #ececec;
    
    --shadow:    0 1px 2px rgba(0,0,0,0.08);
    --shadow-card: 0 1px 2px rgba(0,0,0,0.05);
  }

  [data-theme="dark"] {
    /* Dark Classic Monochrome */
    --bg:        #121212;
    --sidebar:   #1c1c1c;
    --card:      #1c1c1c;
    --surface:   #252525;
    --border:    #383838;
    --border-dark: #666666;
    --text:      #f0f0f0;
    --subtext:   #999999;
    
    --accent:    #ffffff;
    --accent-fg: #000000;
    
    --active-bg: #ffffff;
    --active-tx: #000000;
    --hover-bg:  #2d2d2d;
    
    --shadow:    0 1px 2px rgba(0,0,0,0.5);
    --shadow-card: 0 1px 2px rgba(0,0,0,0.3);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Tahoma, 'Inter', Verdana, Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    font-size: 13px;
    line-height: 1.4;
  }

  /* ── Auth pages ── */
  .auth-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    padding: 16px;
  }
  .auth-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-top: 3px solid #000000;
    border-radius: var(--radius);
    padding: 28px 24px;
    width: 100%;
    max-width: 380px;
    box-shadow: var(--shadow);
  }
  [data-theme="dark"] .auth-card {
    border-top: 3px solid #ffffff;
  }

  /* Auth brand */
  .auth-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--border);
  }
  .auth-icon-wrap {
    width: 42px; height: 42px;
    border-radius: var(--radius);
    background: var(--accent);
    color: var(--accent-fg);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 8px;
  }
  .auth-title {
    font-family: Tahoma, sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: var(--text);
    margin-bottom: 2px;
    text-align: center;
  }
  .auth-sub {
    font-size: 11.5px;
    color: var(--subtext);
    text-align: center;
  }

  /* Error alert */
  .alert-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--hover-bg);
    border: 1px solid var(--border-dark);
    color: var(--text);
    padding: 8px 12px;
    border-radius: var(--radius);
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .alert-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--text);
    flex-shrink: 0;
  }

  /* Form fields */
  .field-group {
    margin-bottom: 14px;
  }
  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    color: var(--subtext);
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .field-wrap {
    position: relative;
  }
  .field-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--subtext);
    display: flex;
    pointer-events: none;
  }
  .field-input {
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 8px 10px 8px 34px;
    font-family: Tahoma, sans-serif;
    font-size: 13px;
    color: var(--text);
    outline: none;
  }
  .field-input::placeholder { color: var(--subtext); }
  .field-input:focus {
    border-color: var(--accent);
    background: var(--card);
  }
  .field-input.no-icon {
    padding-left: 10px;
  }
  select.field-input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 8px 16px;
    border-radius: var(--radius);
    border: 1px solid var(--accent);
    background: var(--accent);
    color: var(--accent-fg);
    font-family: Tahoma, sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .btn-primary:hover { opacity: 0.85; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 7px 14px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-family: Tahoma, sans-serif;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
  }
  .btn-outline:hover {
    background: var(--hover-bg);
    border-color: var(--border-dark);
  }

  .btn-danger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 7px 14px;
    border-radius: var(--radius);
    background: #b91c1c;
    color: #ffffff;
    border: 1px solid #b91c1c;
    font-family: Tahoma, sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .btn-danger:hover:not(:disabled) { opacity: 0.9; }
  .btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
  [data-theme="dark"] .btn-danger {
    background: #dc2626;
    border-color: #dc2626;
  }

  .auth-footer {
    margin-top: 18px;
    padding-top: 12px;
    border-top: 1px dashed var(--border);
    text-align: center;
    font-size: 12px;
    color: var(--subtext);
  }
  .auth-link {
    color: var(--text);
    font-weight: 700;
    text-decoration: underline;
  }

  /* ── Page Header Box ── */
  .page-head {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 14px;
  }
  .page-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .page-title-icon {
    width: 32px; height: 32px;
    border-radius: var(--radius);
    background: var(--accent);
    color: var(--accent-fg);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .page-title {
    font-family: Tahoma, sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: var(--text);
  }
  .page-sub {
    font-size: 12px;
    color: var(--subtext);
  }

  .btn-add {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: var(--radius);
    border: 1px solid var(--accent);
    background: var(--accent);
    color: var(--accent-fg);
    font-family: Tahoma, sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }
  .btn-add:hover { opacity: 0.85; }

  /* ── Stat Box Grid ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 14px;
  }
  .stat-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .stat-icon {
    width: 34px; height: 34px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .stat-val {
    font-family: Tahoma, sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: var(--text);
    line-height: 1.2;
  }
  .stat-lbl {
    font-size: 10.5px;
    font-weight: 600;
    color: var(--subtext);
    text-transform: uppercase;
  }

  /* ── Toolbar Box ── */
  .toolbar-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 14px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }
  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
    max-width: 320px;
  }
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--subtext);
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 6px 10px 6px 30px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-family: Tahoma, sans-serif;
    font-size: 12px;
    outline: none;
  }
  .search-input:focus {
    border-color: var(--accent);
    background: var(--card);
  }
  .filter-select {
    padding: 6px 10px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-family: Tahoma, sans-serif;
    font-size: 12px;
    outline: none;
    cursor: pointer;
  }
  .toolbar-info {
    font-size: 11.5px;
    color: var(--subtext);
    font-weight: 600;
  }

  /* ── Data Table Box ── */
  .data-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  table { width: 100%; border-collapse: collapse; }
  thead tr {
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  thead th {
    padding: 9px 12px;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--subtext);
    text-align: left;
    border-right: 1px solid var(--border);
    white-space: nowrap;
  }
  thead th:last-child { text-align: right; border-right: none; }
  tbody tr {
    border-bottom: 1px solid var(--border);
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--hover-bg); }
  td {
    padding: 9px 12px;
    font-size: 12px;
    vertical-align: middle;
    border-right: 1px solid var(--border);
    white-space: nowrap;
  }
  td:last-child { border-right: none; }

  .td-id {
    font-family: Tahoma, monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--text);
    background: var(--surface);
    padding: 2px 6px;
    border-radius: 2px;
    border: 1px solid var(--border);
    display: inline-block;
  }
  .td-name { font-weight: 700; color: var(--text); }

  .badge-category {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 600;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }

  .badge-stock-ok {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 600;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }
  
  .badge-stock-low {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 700;
    background: var(--accent);
    color: var(--accent-fg);
  }

  .price-text { font-weight: 700; color: var(--text); font-size: 12px; }

  .action-wrap { display: flex; justify-content: flex-end; gap: 4px; }
  .act-btn {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; border-radius: 2px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    cursor: pointer;
  }
  .act-btn:hover {
    background: var(--text);
    color: var(--bg);
    border-color: var(--text);
  }

  /* States */
  .state-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 8px; padding: 36px; color: var(--subtext); font-size: 12.5px; font-weight: 600;
  }
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid var(--border);
    border-top-color: var(--text);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .state-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 6px; padding: 36px 16px; color: var(--subtext);
  }
  .state-empty p { font-size: 12px; font-weight: 600; }

  /* ── Modal Box ── */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
    padding: 12px;
  }
  .modal-box {
    background: var(--card);
    border: 2px solid var(--accent);
    border-radius: var(--radius);
    padding: 20px;
    width: 100%; max-width: 420px;
    box-shadow: var(--shadow);
  }
  .modal-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }
  .modal-title {
    font-family: Tahoma, sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: var(--text);
  }
  .modal-sub { font-size: 11px; color: var(--subtext); margin-top: 2px; }
  .modal-close {
    display: flex; align-items: center; justify-content: center;
    width: 24px; height: 24px;
    border-radius: 2px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--subtext);
    cursor: pointer;
  }
  .modal-close:hover { background: var(--hover-bg); color: var(--text); }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .btn-row {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  .btn-row > * { flex: 1; }

  /* ── Responsive Rules for Mobile Devices & Tablets ── */
  @media (max-width: 768px) {
    .page-head {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      padding: 12px;
    }
    .btn-add {
      width: 100%;
      justify-content: center;
    }
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .toolbar-card {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
      padding: 10px;
    }
    .search-wrap {
      max-width: 100%;
      width: 100%;
    }
    .filter-select {
      width: 100%;
    }
    .form-row {
      grid-template-columns: 1fr;
    }
    .modal-box {
      padding: 16px;
      max-width: 95vw;
    }
  }

  @media (max-width: 480px) {
    .page-head {
      padding: 10px;
    }
    .page-title {
      font-size: 14px;
    }
    .stat-card {
      padding: 8px 10px;
    }
    .stat-val {
      font-size: 14px;
    }
  }
`;