import React, { useEffect } from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm, loading = false, userName = '' }) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div className="modal-box logout-modal-box">
        <div className="logout-modal-header">
          <div className="logout-icon-bubble">
            <LogOut size={22} />
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Tutup dialog"
          >
            <X size={15} />
          </button>
        </div>

        <div className="logout-modal-body">
          <h3 id="logout-modal-title" className="logout-modal-title">
            Konfirmasi Keluar
          </h3>
          <p className="logout-modal-desc">
            {userName ? (
              <>
                Halo <strong>{userName}</strong>, apakah Anda yakin ingin keluar dari sistem inventaris?
              </>
            ) : (
              'Apakah Anda yakin ingin keluar dari sistem inventaris?'
            )}
          </p>
          <div className="logout-modal-note">
            <AlertTriangle size={14} className="logout-note-icon" />
            <span>Sesi aktif Anda akan diakhiri dan Anda perlu login kembali untuk mengakses data.</span>
          </div>
        </div>

        <div className="logout-modal-actions">
          <button
            type="button"
            className="btn-outline logout-cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn-primary logout-confirm-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <LogOut size={14} />
                <span>Ya, Keluar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
