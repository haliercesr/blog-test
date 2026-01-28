// Simple image cache using Map and localStorage
const imageCache = new Map<string, string>();
const CACHE_KEY = 'blog_image_cache';
const MAX_CACHE_SIZE = 100;

// Load cache from localStorage on init
const loadCache = (): void => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Record<string, string>;
      Object.entries(parsed).forEach(([key, value]) => {
        imageCache.set(key, value);
      });
    }
  } catch (error) {
    console.warn('Failed to load image cache:', error);
  }
};

// Save cache to localStorage
const saveCache = (): void => {
  try {
    const cacheObject: Record<string, string> = {};
    imageCache.forEach((value, key) => {
      cacheObject[key] = value;
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
  } catch (error) {
    console.warn('Failed to save image cache:', error);
  }
};

// Initialize cache
loadCache();

// Preload image and cache blob URL
export const preloadImage = async (url: string): Promise<string> => {
  // Return cached URL if exists
  if (imageCache.has(url)) {
    return imageCache.get(url)!;
  }

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    // Manage cache size
    if (imageCache.size >= MAX_CACHE_SIZE) {
      const firstKey = imageCache.keys().next().value;
      if (firstKey) {
        const oldBlobUrl = imageCache.get(firstKey);
        if (oldBlobUrl) URL.revokeObjectURL(oldBlobUrl);
        imageCache.delete(firstKey);
      }
    }

    imageCache.set(url, blobUrl);
    saveCache();
    
    return blobUrl;
  } catch (error) {
    console.warn('Failed to cache image:', url, error);
    return url;
  }
};

// Get cached image or original URL
export const getCachedImage = (url: string): string => {
  return imageCache.get(url) || url;
};

// Clear cache
export const clearImageCache = (): void => {
  imageCache.forEach((blobUrl) => {
    URL.revokeObjectURL(blobUrl);
  });
  imageCache.clear();
  localStorage.removeItem(CACHE_KEY);
};
