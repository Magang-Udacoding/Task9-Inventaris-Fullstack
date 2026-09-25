import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { Box, UserPlus, User, Mail, Lock } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { THEME_STYLES } from './theme';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axiosClient.post('/register', formData);
      notify.success('Pendaftaran akun berhasil! Silakan masuk.', 'Registrasi Sukses');
      navigate('/login');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.';
      setError(errMsg);
      notify.error(errMsg, 'Registrasi Gagal');
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

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
            <div className="auth-title">Daftar Akun</div>
            <div className="auth-sub">Lengkapi data untuk pendaftaran akun baru</div>
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
              <label className="field-label">Nama Lengkap</label>
              <div className="field-wrap">
                <span className="field-icon"><User size={15} /></span>
                <input
                  type="text"
                  className="field-input"
                  value={formData.name}
                  onChange={set('name')}
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Alamat Email</label>
              <div className="field-wrap">
                <span className="field-icon"><Mail size={15} /></span>
                <input
                  type="email"
                  className="field-input"
                  value={formData.email}
                  onChange={set('email')}
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
                  value={formData.password}
                  onChange={set('password')}
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
                    Membuat akun...
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    Daftar Sekarang
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="auth-footer">
            Sudah memiliki akun?{' '}
            <Link to="/login" className="auth-link">Halaman Masuk</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;