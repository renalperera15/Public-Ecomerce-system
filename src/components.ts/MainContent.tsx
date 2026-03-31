import {useFilter} from "./FilterContext";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/Product";

const Maincontent = () => {
    const {searchQuery, selectedCategory, minPrice, maxPrice, sortBy } = useFilter();
    const [products, setProducts] = useState<any[]>([])
    

    // Fetch products on mount
    useEffect(() => {
      const getProducts = async () => {
        try {
          const data = await fetchProducts();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      getProducts();
    }, []);

    // Function to sort products
    const sortProducts = (productsToSort: any[]) => {
      let sorted = [...productsToSort];
      
      if (sortBy === "price-low-high") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high-low") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortBy === "best-rating") {
        sorted.sort((a, b) => b.rating?.rate - a.rating?.rate);
      }
      
      return sorted;
    };

    // Filter products
    const filterProducts = () => {
      let filtered = products;

      if (searchQuery) {
        filtered = filtered.filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      if (selectedCategory) {
        filtered = filtered.filter((p: any) => p.category === selectedCategory);
      }

      if (minPrice !== undefined) {
        filtered = filtered.filter((p: any) => p.price >= minPrice);
      }

      if (maxPrice !== undefined) {
        filtered = filtered.filter((p: any) => p.price <= maxPrice);
      }

      return sortProducts(filtered);
    };

    const filteredProducts = filterProducts();

    const handleAddToCart = (product: any) => {
      console.log("Added to cart:", product);
      // TODO: Implement add to cart functionality
    };

    const renderStars = (rating: number) => {
      const stars = Math.round(rating);
      return "★".repeat(stars) + "☆".repeat(5 - stars);
    };

    return<section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map((product: any) => (
            <div key={product.id} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
              <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '1rem' }} />
              
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem', color: '#000', minHeight: '2.8rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {product.title}
              </h3>

              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '16px', color: '#ffc107', letterSpacing: '2px' }}>
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '0.25rem' }}>
                  {product.rating?.rate || 0}
                </div>
              </div>

              <div style={{ fontSize: '12px', color: '#27ae60', marginBottom: '0.5rem', fontWeight: '600' }}>
                In Stock: {product.stock}
              </div>

              <div style={{ fontSize: '18px', fontWeight: '700', color: '#000', marginBottom: '1rem' }}>
                ${product.price.toFixed(2)}
              </div>

              <button 
                onClick={() => handleAddToCart(product)}
                style={{ 
                  backgroundColor: '#0066cc', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '0.75rem 1rem', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  fontSize: '14px', 
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  marginTop: 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0052a3';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 102, 204, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0066cc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
    </section>
}

export default Maincontent;