import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { Plus, Edit, Trash2, Package, X, Search, Layers, DollarSign, Box } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import ConfirmModal from '../components/ConfirmModal';
import { getCachedItems, setCachedItems, getCachedCategories, setCachedCategories } from '../api/dataCache';
import { THEME_STYLES } from './theme';

const Items = () => {
  const [items, setItems] = useState(() => getCachedItems() || []);
  const [categories, setCategories] = useState(() => getCachedCategories() || []);
  const [loading, setLoading] = useState(() => !getCachedItems());
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', category_id: '', price: '', stock: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Delete modal state
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const notify = useNotification();
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // 1. Fetch items immediately (standalone, no blocking on categories)
    fetchItems();

    // 2. Load categories from cache or fetch if not present
    const cachedCats = getCachedCategories();
    if (cachedCats && cachedCats.length > 0) {
      setCategories(cachedCats);
    } else {
      fetchCategories();
    }
  }, []);

  const fetchItems = async (silent = false) => {
    try {
      const res = await axiosClient.get('/items');
      setItems(res.data);
      setCachedItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items', err);
      if (!silent && items.length === 0) {
        notify.error('Gagal mengambil data barang.', 'Koneksi Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data);
      setCachedCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories for filter/modal', err);
    }
  };

  const handleOpenAddModal = () => {
    if (categories.length === 0) {
      fetchCategories();
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (editingItem) {
        await axiosClient.put(`/items/${editingItem.id}`, formData);
        notify.success(`Barang "${formData.name}" berhasil diperbarui.`, 'Berhasil Diperbarui');
      } else {
        await axiosClient.post('/items', formData);
        notify.success(`Barang "${formData.name}" berhasil ditambahkan ke inventaris.`, 'Berhasil Disimpan');
      }
      fetchItems(true);
      closeModal();
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal menyimpan barang';
      setError(errMsg);
      notify.error(errMsg, 'Gagal Menyimpan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    if (categories.length === 0) {
      fetchCategories();
    }
    setEditingItem(item);
    setFormData({ name: item.name, category_id: item.category_id, price: item.price, stock: item.stock });
    setError('');
    setShowModal(true);
  };

  const handleDeletePrompt = (item) => {
    setItemToDelete(item);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);
    try {
      await axiosClient.delete(`/items/${itemToDelete.id}`);
      notify.success(`Barang "${itemToDelete.name}" berhasil dihapus.`, 'Berhasil Dihapus');
      setItemToDelete(null);
      fetchItems(true);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal menghapus barang';
      notify.error(errMsg, 'Gagal Dihapus');
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', category_id: '', price: '', stock: '' });
    setError('');
  };

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const formatIDR = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  // Filtered items & stats calculation
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || String(item.category_id) === String(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const totalItemsCount = items.length;
  const totalStockCount = items.reduce((acc, item) => acc + (Number(item.stock) || 0), 0);
  const totalValueSum = items.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.stock) || 0)), 0);

  return (
    <>
      <style>{THEME_STYLES}</style>

      {/* Page Header Box */}
      <div className="page-head">
        <div className="page-title-group">
          <div className="page-title-icon">
            <Package size={18} />
          </div>
          <div>
            <h1 className="page-title">Data Inventaris</h1>
            <p className="page-sub">Kelola daftar stok barang dan informasi produk</p>
          </div>
        </div>
        <button className="btn-add" onClick={handleOpenAddModal}>
          <Plus size={14} />
          Tambah Barang
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Box size={18} />
          </div>
          <div>
            <div className="stat-val">{totalItemsCount}</div>
            <div className="stat-lbl">Jenis Barang</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Layers size={18} />
          </div>
          <div>
            <div className="stat-val">{totalStockCount}</div>
            <div className="stat-lbl">Total Stok Unit</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={18} />
          </div>
          <div>
            <div className="stat-val">{formatIDR(totalValueSum)}</div>
            <div className="stat-lbl">Nilai Inventaris</div>
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
            placeholder="Cari nama barang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <span className="toolbar-info">{filteredItems.length} produk</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="data-card">
        {loading ? (
          <div className="state-loading">
            <div className="spinner" />
            Memuat data barang...
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ width: 60, textAlign: 'center' }}>No</th>
                <th>Nama Barang</th>
                <th>Kategori</th>
                <th>Harga Satuan</th>
                <th>Ketersediaan Stok</th>
                <th style={{ width: 80 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ textAlign: 'center' }}>
                    <span className="td-id">{index + 1}</span>
                  </td>
                  <td>
                    <div className="td-name">{item.name}</div>
                  </td>
                  <td>
                    <span className="badge-category">{item.category?.name || 'Tanpa Kategori'}</span>
                  </td>
                  <td>
                    <span className="price-text">{formatIDR(item.price)}</span>
                  </td>
                  <td>
                    {item.stock > 0 ? (
                      <span className="badge-stock-ok">{item.stock} unit</span>
                    ) : (
                      <span className="badge-stock-low">Stok Habis</span>
                    )}
                  </td>
                  <td>
                    <div className="action-wrap">
                      <button className="act-btn" onClick={() => handleEdit(item)} title="Edit barang">
                        <Edit size={13} />
                      </button>
                      <button className="act-btn" onClick={() => handleDeletePrompt(item)} title="Hapus barang">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 0 }}>
                    <div className="state-empty">
                      <p>Tidak ada data barang yang ditemukan.</p>
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
                <h3 className="modal-title">{editingItem ? 'Edit Barang' : 'Tambah Barang Baru'}</h3>
                <p className="modal-sub">Isi form untuk mengelola barang inventaris</p>
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
                <label className="field-label">Nama Barang</label>
                <input
                  type="text"
                  className="field-input no-icon"
                  value={formData.name}
                  onChange={set('name')}
                  placeholder="Nama Barang"
                  autoFocus
                  required
                />
              </div>

              <div className="field-group">
                <label className="field-label">Kategori</label>
                <select
                  className="field-input no-icon"
                  value={formData.category_id}
                  onChange={set('category_id')}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="field-group" style={{ margin: 0 }}>
                  <label className="field-label">Harga (IDR)</label>
                  <input
                    type="number"
                    className="field-input no-icon"
                    value={formData.price}
                    onChange={set('price')}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="field-group" style={{ margin: 0 }}>
                  <label className="field-label">Jumlah Stok</label>
                  <input
                    type="number"
                    className="field-input no-icon"
                    value={formData.stock}
                    onChange={set('stock')}
                    placeholder="0"
                    required
                  />
                </div>
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
                    editingItem ? 'Perbarui' : 'Simpan'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete Item */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => !deleteLoading && setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Barang Inventaris"
        message={`Apakah Anda yakin ingin menghapus "${itemToDelete?.name}"? Data barang ini akan dihapus secara permanen.`}
        confirmText="Hapus Barang"
        cancelText="Batal"
        danger={true}
        loading={deleteLoading}
      />
    </>
  );
};

export default Items;