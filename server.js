import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

// Mock products fallback
const MOCK_PRODUCTS = [
  { id: 1, title: "Fjallraven - Backpack", price: 109.95, description: "Your perfect pack for everyday adventures.", category: "men's clothing", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", rating: { rate: 3.9, count: 120 } },
  { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, description: "Slim-fitting style, contrast raglan long sleeve.", category: "men's clothing", image: "https://fakestoreapi.com/img/71-yCoNFT5L._AC_Ux679_.jpg", rating: { rate: 4.1, count: 259 } },
  { id: 3, title: "Mens Cotton Jacket", price: 55.99, description: "Premium quality cotton with comfortable fit.", category: "men's clothing", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 4.6, count: 235 } },
  { id: 4, title: "Mens Slim Fit V Neck Casual Shirts", price: 15.99, description: "Comfortable and stylish casual wear.", category: "men's clothing", image: "https://fakestoreapi.com/img/71pIvwcc-SrL._DC_SY879_.jpg", rating: { rate: 2.1, count: 56 } },
  { id: 5, title: "John Hardy Womens Legends Naga Gold", price: 695, description: "Elegant design with certified gold plating.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 4.6, count: 68 } },
  { id: 6, title: "BIYLACLESEN Womens Jacket", price: 56.99, description: "High quality pure cotton jacket with lining.", category: "women's clothing", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", rating: { rate: 2.6, count: 235 } },
  { id: 7, title: "Women Copper Bracelet", price: 9.99, description: "Beautiful copper bracelet for women - adjustable size.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 3.2, count: 121 } },
  { id: 8, title: "Samsung 870 EVO SSD", price: 999, description: "High speed solid state drive with excellent performance.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 2.1, count: 512 } },
  { id: 9, title: "SanDisk SSD Plus", price: 899, description: "Fast and reliable storage solution.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 3.13, count: 193 } },
  { id: 10, title: "Wireless Monitor Light Bar", price: 999, description: "Smart monitor light with ambient light sensor.", category: "electronics", image: "https://fakestoreapi.com/img/81KwZwEzNzL._AC_SY879_.jpg", rating: { rate: 2.6, count: 340 } },
];

// Proxy endpoint for products
app.get('/api/products', async (req, res) => {
  try {
    console.log('Fetching from fakestoreapi.com...');
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      console.log(`API returned ${response.status}, using mock data`);
      return res.json(MOCK_PRODUCTS);
    }
    const data = await response.json();
    console.log(`Fetched ${data.length} products from API`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching from API, using mock data:', error.message);
    res.json(MOCK_PRODUCTS);
  }
});

// Proxy endpoint for single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`);
    if (!response.ok) {
      const mockProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(req.params.id));
      return res.json(mockProduct || MOCK_PRODUCTS[0]);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(req.params.id));
    res.json(mockProduct || MOCK_PRODUCTS[0]);
  }
});

// Proxy endpoint for categories
app.get('/api/products/categories', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      return res.json(["men's clothing", "women's clothing", "jewelery", "electronics"]);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.json(["men's clothing", "women's clothing", "jewelery", "electronics"]);
  }
});

app.listen(PORT, () => {
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
});
