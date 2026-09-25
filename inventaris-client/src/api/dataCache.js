// Ultra-Fast Persistent & Memory Cache for Instant Page Loads
const memoryCache = {
  items: null,
  categories: null,
};

export const getCachedItems = () => {
  if (memoryCache.items && Array.isArray(memoryCache.items)) {
    return memoryCache.items;
  }
  try {
    const raw = localStorage.getItem('inv_cache_items') || sessionStorage.getItem('inv_cache_items');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryCache.items = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore parse error
  }
  return null;
};

export const setCachedItems = (data) => {
  if (!Array.isArray(data)) return;
  memoryCache.items = data;
  try {
    const str = JSON.stringify(data);
    localStorage.setItem('inv_cache_items', str);
    sessionStorage.setItem('inv_cache_items', str);
  } catch {
    // ignore storage error
  }
};

export const getCachedCategories = () => {
  if (memoryCache.categories && Array.isArray(memoryCache.categories)) {
    return memoryCache.categories;
  }
  try {
    const raw = localStorage.getItem('inv_cache_categories') || sessionStorage.getItem('inv_cache_categories');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryCache.categories = parsed;
        return parsed;
      }
    }
  } catch {
    // ignore parse error
  }
  return null;
};

export const setCachedCategories = (data) => {
  if (!Array.isArray(data)) return;
  memoryCache.categories = data;
  try {
    const str = JSON.stringify(data);
    localStorage.setItem('inv_cache_categories', str);
    sessionStorage.setItem('inv_cache_categories', str);
  } catch {
    // ignore storage error
  }
};

export const clearCache = () => {
  memoryCache.items = null;
  memoryCache.categories = null;
  try {
    localStorage.removeItem('inv_cache_items');
    localStorage.removeItem('inv_cache_categories');
    sessionStorage.removeItem('inv_cache_items');
    sessionStorage.removeItem('inv_cache_categories');
  } catch {
    // ignore
  }
};
