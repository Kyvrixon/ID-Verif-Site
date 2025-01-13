import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(parsedValue);

  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
