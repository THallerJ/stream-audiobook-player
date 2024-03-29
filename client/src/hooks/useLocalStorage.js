import { useEffect, useState } from 'react';

const PREFIX = 'audiobook-player-';

const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialValue === 'function') {
      return initialValue();
    }

    return initialValue;
  });

  useEffect(() => {
    // setting the value to null deletes the item from local storage
    if (value) localStorage.setItem(prefixedKey, JSON.stringify(value));
    else localStorage.removeItem(prefixedKey);
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
