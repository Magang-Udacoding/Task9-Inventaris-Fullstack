import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addNotification = useCallback(({ type = 'info', message, title, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    const newNotification = { id, type, message, title, duration };

    setNotifications((prev) => [...prev, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    return id;
  }, [removeNotification]);

  const notify = {
    success: (message, title = 'Berhasil') => addNotification({ type: 'success', message, title }),
    error: (message, title = 'Gagal') => addNotification({ type: 'error', message, title }),
    warning: (message, title = 'Peringatan') => addNotification({ type: 'warning', message, title }),
    info: (message, title = 'Informasi') => addNotification({ type: 'info', message, title }),
    custom: addNotification,
    remove: removeNotification,
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <NotificationContainer notifications={notifications} onClose={removeNotification} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Container and Toast Components
const NotificationContainer = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="toast-portal-container" aria-live="polite" aria-atomic="true">
      {notifications.map((item) => (
        <ToastItem key={item.id} item={item} onClose={() => onClose(item.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ item, onClose }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon success" />;
      case 'error':
        return <AlertCircle size={18} className="toast-icon error" />;
      case 'warning':
        return <AlertTriangle size={18} className="toast-icon warning" />;
      case 'info':
      default:
        return <Info size={18} className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-card toast-${item.type}`} role="alert">
      <div className="toast-indicator" />
      <div className="toast-main">
        <div className="toast-icon-wrap">{getIcon()}</div>
        <div className="toast-content">
          {item.title && <div className="toast-title">{item.title}</div>}
          <div className="toast-message">{item.message}</div>
        </div>
        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Tutup notifikasi"
        >
          <X size={14} />
        </button>
      </div>
      {item.duration > 0 && (
        <div
          className="toast-progress-bar"
          style={{ animationDuration: `${item.duration}ms` }}
        />
      )}
    </div>
  );
};
