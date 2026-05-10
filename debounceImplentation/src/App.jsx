import { useState, useEffect } from 'react';
import useDebounce from './useDebounce.jsx';

function App() {
  const [search, setSearch] = useState("");

  const debounceCall = useDebounce(search, 500);

  useEffect(() => {
    if (debounceCall) {
      console.log("API Called:", debounceCall);
    }
  }, [debounceCall]);

  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
}

export default App;