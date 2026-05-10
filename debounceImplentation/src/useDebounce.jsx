import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debounceSearch, setDebounceSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceSearch;
}

export default useDebounce;