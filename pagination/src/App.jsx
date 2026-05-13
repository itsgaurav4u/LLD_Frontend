import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  // actual input value
  const [searchVal, setSearchVal] = useState("");

  // debounced value
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // FETCH API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await fetch(
          "https://dummyjson.com/products?limit=200"
        );

        const res = await result.json();

        setList(res.products);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchVal);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchVal]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const limit = 10;

  // SEARCH USING DEBOUNCED VALUE
  const filteredData = list.filter((item) =>
    item.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase())
  );

  // PAGINATION
  const totalPages = Math.ceil(filteredData.length / limit);

  const startIndex = currentPage * limit;

  const endIndex = startIndex + limit;

  const listedData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);

    // reset page on search
    setCurrentPage(0);
  };

  return (
    <>
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search product..."
        value={searchVal}
        onChange={handleSearch}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >
        {listedData.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>

            <div>{item.brand}</div>

            <img
              src={item.images[0]}
              alt={item.title}
              style={{ width: "100px" }}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "5px",
          marginTop: "20px"
        }}
      >
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default App;