import { useState, useEffect } from 'react';
import { preloadImage, getCachedImage } from '../utils';

export const useImageCache = (imageUrl: string) => {
  const [cachedUrl, setCachedUrl] = useState<string>(getCachedImage(imageUrl));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = await preloadImage(imageUrl);
        if (mounted) {
          setCachedUrl(url);
          setIsLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
          setCachedUrl(imageUrl);
          setIsLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [imageUrl]);

  return { cachedUrl, isLoading, error };
};
