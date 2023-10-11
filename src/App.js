import React, { useState, useEffect } from 'react';
import './App.css';
import config from './config.json';

function App() {
  const [products, setProducts] = useState([]);
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    fetch(config.API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('system-info.json')
      .then((response) => response.json())
      .then((data) => setSystemInfo(data))
      .catch((error) => console.error('Error fetching system info:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="craftista_logo.png" className="logo" alt="Craftista" />
        <h1>Welcome to Craftista</h1>
      </header>

      <main className="App-main">
        {/* Product Listing */}
        <section className="Product-list">
          <h2>Available Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image_url} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* System Information */}
        <section className="System-info">
          <h2>System Information</h2>
          <div>
            <p><strong>Hostname:</strong> {systemInfo.hostname}</p>
            <p><strong>IP Address:</strong> {systemInfo.ip_address}</p>
            <p><strong>Running in Container:</strong> {systemInfo.isContainer ? 'Yes' : 'No'}</p>
            <p><strong>Running in Kubernetes:</strong> {systemInfo.isKubernetes ? 'Yes' : 'No'}</p>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>Copyright &copy; {new Date().getFullYear()} Initcron Systems Private Limited</p>
        <p>Sample App created by School of Devops for Devops Workshops.</p>
      </footer>
    </div>
  );
}

export default App;
