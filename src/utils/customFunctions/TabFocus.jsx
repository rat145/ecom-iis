import { useEffect, useState } from 'react';

const TabFocusChecker = () => {
  const [isTabInFocus, setIsTabInFocus] = useState(true);

  const handleVisibilityChange = () => {
    setIsTabInFocus(document.visibilityState === 'visible');
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isTabInFocus;
};

export default TabFocusChecker;
