import React, { useState } from "react";
import "./App.css"; // ✅ import CSS

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      let url = "";
      if (/^\d+$/.test(query.trim())) {
        // Barcode search
        url = `https://world.openfoodfacts.org/api/v0/product/${query}.json`;
      } else {
        // Name search
        url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 0 || (data.products && data.products.length === 0)) {
        setError("No results found 😢");
      } else {
        setResults(data.product || data.products);
      }
    } catch (err) {
      setError("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🍓 Search Food 💖</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter food name or barcode..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>

      {loading && <p className="loading">⏳ Searching...</p>}
      {error && <p className="error">{error}</p>}

      {results && Array.isArray(results) && (
        <ul className="list">
          {results.slice(0, 10).map((item, idx) => (
            <li key={idx} className="card">
              <img
                src={item.image_small_url || "https://via.placeholder.com/80"}
                alt={item.product_name}
                className="image"
              />
              <div>
                <h3 className="food-name">
                  {item.product_name || "Unnamed product"}
                </h3>
                <p className="brand">
                  {item.brands ? `Brand: ${item.brands}` : "Brand: Unknown"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {results && !Array.isArray(results) && (
        <div className="card">
          <img
            src={results.image_small_url || "https://via.placeholder.com/100"}
            alt={results.product_name}
            className="image"
          />
          <div>
            <h3 className="food-name">
              {results.product_name || "Unnamed product"}
            </h3>
            <p className="brand">
              {results.brands ? `Brand: ${results.brands}` : "Brand: Unknown"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
 