const CACHE_TTL = 1 * 60 * 60 * 1000;

export const cacheService = {
  set (key, value) {
    const item = {
        value,
        timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(item));
  },

  get(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    if (Date.now() - item.timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }
}