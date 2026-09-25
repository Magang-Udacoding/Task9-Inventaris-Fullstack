import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Plus, Edit, Trash2, LayoutGrid, X, Search, Hash, FolderCheck } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import ConfirmModal from '../components/ConfirmModal';
import { getCachedCategories, setCachedCategories } from '../api/dataCache';
import { THEME_STYLES } from './theme';

const Categories = () => {
  const [categories, setCategories] = useState(() => getCachedCategories() || []);
  const [loading, setLoading] = useState(() => !getCachedCategories());
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const notify = useNotification();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (isBackground = false) => {
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data);
      setCachedCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
      if (!isBackground && categories.length === 0) {
        notify.error('Gagal mengambil data kategori.', 'Koneksi Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (editingCategory) {
        await axiosClient.put(`/categories/${editingCategory.id}`, { name });
        notify.success(`Kategori "${name}" berhasil diperbarui.`, 'Berhasil Diperbarui');
      } else {
        await axiosClient.post('/categories', { name });
        notify.success(`Kategori "${name}" berhasil ditambahkan.`, 'Berhasil Disimpan');
      }
      fetchCategories();
      closeModal();
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal menyimpan kategori';
      setError(errMsg);
      notify.error(errMsg, 'Gagal Menyimpan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setError('');
    setShowModal(true);
  };

  const handleDeletePrompt = (cat) => {
    setCategoryToDelete(cat);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setDeleteLoading(true);
    try {
      await axiosClient.delete(`/categories/${categoryToDelete.id}`);
      notify.success(`Kategori "${categoryToDelete.name}" berhasil dihapus.`, 'Berhasil Dihapus');
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal menghapus kategori';
      notify.error(errMsg, 'Gagal Dihapus');
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setName('');
    setError('');
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{THEME_STYLES}</style>

      {/* Page Header Box */}
      <div className="page-head">
        <div className="page-title-group">
          <div className="page-title-icon">
            <LayoutGrid size={18} />
          </div>
          <div>
            <h1 className="page-title">Kategori Barang</h1>
            <p className="page-sub">Kelola struktur kategori untuk mengelompokkan produk</p>
          </div>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <Plus size={14} />
          Tambah Kategori
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <LayoutGrid size={18} />
          </div>
          <div>
            <div className="stat-val">{categories.length}</div>
            <div className="stat-lbl">Total Kategori</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FolderCheck size={18} />
          </div>
          <div>
            <div className="stat-val">{filteredCategories.length}</div>
            <div className="stat-lbl">Kategori Terfilter</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="toolbar-card">
        <div className="search-wrap">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="toolbar-info">{filteredCategories.length} kategori</span>
      </div>

      {/* Data Table */}
      <div className="data-card">
        {loading ? (
          <div className="state-loading">
            <div className="spinner" />
            Memuat data kategori...
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ width: 60, textAlign: 'center' }}>No</th>
                <th>Nama Kategori</th>
                <th style={{ width: 80 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={cat.id}>
                  <td style={{ textAlign: 'center' }}>
                    <span className="td-id">
                      {index + 1}
                    </span>
                  </td>
                  <td>
                    <span className="badge-category">{cat.name}</span>
                  </td>
                  <td>
                    <div className="action-wrap">
                      <button className="act-btn" onClick={() => handleEdit(cat)} title="Edit kategori">
                        <Edit size={13} />
                      </button>
                      <button className="act-btn" onClick={() => handleDeletePrompt(cat)} title="Hapus kategori">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: 0 }}>
                    <div className="state-empty">
                      <p>Tidak ada kategori yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-head">
              <div>
                <h3 className="modal-title">{editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}</h3>
                <p className="modal-sub">Beri nama kategori untuk mengelompokkan barang</p>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert-error">
                  <span className="alert-dot" />
                  {error}
                </div>
              )}

              <div className="field-group">
                <label className="field-label">Nama Kategori</label>
                <input
                  type="text"
                  className="field-input no-icon"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Kategori"
                  autoFocus
                  required
                />
              </div>

              <div className="btn-row">
                <button type="button" className="btn-outline" onClick={closeModal} disabled={submitting}>
                  Batal
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner" />
                      Menyimpan...
                    </>
                  ) : (
                    editingCategory ? 'Perbarui' : 'Simpan'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete Category */}
      <ConfirmModal
        isOpen={!!categoryToDelete}
        onClose={() => !deleteLoading && setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Kategori Barang"
        message={`Apakah Anda yakin ingin menghapus kategori "${categoryToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus Kategori"
        cancelText="Batal"
        danger={true}
        loading={deleteLoading}
      />
    </>
  );
};

export default Categories;