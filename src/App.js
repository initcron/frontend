import React, { useState, useEffect } from 'react';
import './App.css';
import placeholderImage from './placeholder.png'; // Importing placeholder image

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }
        const result = await response.json();
        setProducts(result.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <h1>Welcome to Craftista!</h1>
      {loading && (
        <>
          <h2>Loading Craft Items...</h2>
          <img src={placeholderImage} alt="placeholder" width="200" /> 
          {/* Displaying placeholder image */}
          <p>Exciting products are on the way...</p>
        </>
      )}
      {error && (
        <>
          <h2>Oh no! Something went wrong...</h2>
          <p>We're having some trouble fetching the product data. Please try again later.</p>
        </>
      )}
      {!loading && !error && (
        <>
          <h2>Available Products:</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

