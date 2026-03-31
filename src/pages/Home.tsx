import { useFilter } from "../components.ts/FilterContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/Product";
import { useCart } from "../context/Cartcontext";

interface HomeProps {
  searchQuery?: string;
}

export default function Home({ searchQuery = "" }: HomeProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { selectedCategory, minPrice, maxPrice, sortBy } = useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        console.log("Products fetched:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
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

    // Use prop searchQuery first, then fall back to filter context
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    return sortProducts(filtered);
  };

  const filteredProducts = filterProducts();

  const handleAddToCart = (product: any) => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 });
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* Hero Banner */}
      <div style={{
        backgroundColor: "#0066cc",
        color: "#fff",
        padding: "4rem 2rem",
        textAlign: "center",
        marginBottom: "3rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ fontSize: "60px" }}>📋</div>
          <div style={{ textAlign: "left", flex: 1 }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
              Discover & Shop Modern Products
            </h2>
            <p style={{ fontSize: "1.1rem", fontWeight: "400", opacity: 0.9 }}>
              Curated selection. Fast checkout. Beautiful experience.
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#0066cc", marginBottom: "2rem" }}>
          Products
        </h1>

        {loading && (
          <div style={{ textAlign: "center", padding: "2rem", fontSize: "16px", color: "#666" }}>
            Loading products...
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", fontSize: "16px", color: "#666" }}>
            No products found. (Products: {products.length})
          </div>
        )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain",
                marginBottom: "1rem",
              }}
            />

            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "0.75rem",
                color: "#000",
                minHeight: "2.8rem",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </h3>

            <div style={{ marginBottom: "0.75rem" }}>
              <div
                style={{
                  fontSize: "16px",
                  color: "#ffc107",
                  letterSpacing: "2px",
                  marginBottom: "0.25rem",
                }}
              >
                {renderStars(product.rating?.rate || 0)}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {product.rating?.rate || 0}
              </div>
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#27ae60",
                marginBottom: "0.75rem",
                fontWeight: "600",
              }}
            >
              In Stock: {product.stock}
            </div>

            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#0066cc",
                marginBottom: "1rem",
              }}
            >
              ${product.price.toFixed(2)}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              style={{
                backgroundColor: "#0066cc",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "700",
                transition: "all 0.3s ease",
                marginTop: "auto",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0052a3";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 102, 204, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0066cc";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}


