import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Box, LogIn, Lock, Mail } from 'lucide-react';
import { THEME_STYLES } from './theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login({ email, password });
    if (result.success) {
      notify.success('Berhasil masuk ke sistem inventaris!', 'Selamat Datang');
      navigate('/items');
    } else {
      const errMsg = result.message || 'Email atau kata sandi tidak valid.';
      setError(errMsg);
      notify.error(errMsg, 'Gagal Masuk');
    }
    setLoading(false);
  };

  return (
    <>
      <style>{THEME_STYLES}</style>

      <div className="auth-shell">
        <div className="auth-card">

          {/* Brand Header */}
          <div className="auth-brand">
            <div className="auth-icon-wrap">
              <Box size={24} color="currentColor" />
            </div>
            <div className="auth-title">Inventaris System</div>
            <div className="auth-sub">Silakan masuk menggunakan akun Anda</div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert-error">
              <span className="alert-dot" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label className="field-label">Alamat Email</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={15} /></span>
                <input
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Kata Sandi</label>
              <div className="field-wrap">
                <span className="field-icon"><Lock size={15} /></span>
                <input
                  type="password"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn size={14} />
                    Masuk
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            Belum punya akun?{' '}
            <Link to="/register" className="auth-link">Daftar Akun Baru</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;