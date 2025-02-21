import { useEffect, useState } from 'react';

export function usePageHeight() {
  const [isTall, setIsTall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTall(window.innerHeight < 900);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isTall;
}
