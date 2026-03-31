import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product } from "../api/Product";
import { fetchProductById } from "../api/Product";
import { useCart } from "../context/Cartcontext";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id!)
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (quantity < 1 || !product) return;
    addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity });
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
    setQuantity(1);
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
        <button onClick={() => navigate("/")} style={{ padding: "0.5rem 1rem", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          ← Back to Products
        </button>
        <p style={{ marginTop: "2rem", fontSize: "18px", color: "#666" }}>Product not found</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff" }}>
      <button 
        onClick={() => navigate("/")} 
        style={{ 
          padding: "0.5rem 1rem", 
          backgroundColor: "#0066cc", 
          color: "#fff", 
          border: "none", 
          borderRadius: "4px", 
          cursor: "pointer",
          marginBottom: "2rem",
          fontSize: "14px",
          fontWeight: "600"
        }}
      >
        ← Back to Products
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", maxWidth: "1000px" }}>
        {/* Product Image */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "2rem" }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }} />
        </div>

        {/* Product Info */}
        <div>
          {/* Category */}
          <span style={{ display: "inline-block", backgroundColor: "#e8f1ff", color: "#0066cc", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "12px", fontWeight: "600", marginBottom: "1rem" }}>
            {product.category}
          </span>

          {/* Title */}
          <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#000", marginBottom: "1rem" }}>
            {product.title}
          </h1>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "18px", color: "#ffc107", letterSpacing: "2px" }}>
              {renderStars(product.rating.rate)}
            </div>
            <span style={{ fontSize: "14px", color: "#666" }}>
              {product.rating.rate.toFixed(1)} out of 5
            </span>
            <span style={{ fontSize: "14px", color: "#999" }}>
              ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "14px", color: "#666", fontWeight: "600" }}>Price:</span>
            <span style={{ fontSize: "32px", fontWeight: "700", color: "#0066cc", marginLeft: "1rem" }}>
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Stock Status */}
          <div style={{ marginBottom: "1.5rem" }}>
            <span style={{ display: "inline-block", backgroundColor: "#e8f5e9", color: "#27ae60", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "14px", fontWeight: "600" }}>
              In Stock
            </span>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#000", marginBottom: "0.75rem" }}>Product Description</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <label style={{ fontSize: "16px", fontWeight: "600", color: "#000" }}>
              Quantity:
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#999",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                  e.currentTarget.style.borderColor = "#d0d0d0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                style={{
                  width: "60px",
                  padding: "0.6rem",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#000",
                  backgroundColor: "#fff",
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#999",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                  e.currentTarget.style.borderColor = "#d0d0d0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }}
              >
                +
              </button>
            </div>
          </div>


          {/* Add to Cart Button */}
          <div style={{ marginBottom: "2rem" }}>
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                padding: "1.25rem",
                backgroundColor: "#0066cc",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0052a3";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 102, 204, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0066cc";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              ADD TO CART
            </button>


            {showAddedMessage && (
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e8f5e9", color: "#27ae60", borderRadius: "4px", fontSize: "14px", fontWeight: "600" }}>
                ✓ Added {quantity} item(s) to cart!
              </div>
            )}
          </div>

          {/* Features Section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "32px" }}>🚚</span>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#000", margin: "0 0 0.5rem 0" }}>Free Shipping</p>
                <p style={{ fontSize: "13px", color: "#666", margin: "0" }}>On orders over $50</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "32px" }}>↩️</span>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#000", margin: "0 0 0.5rem 0" }}>Easy Returns</p>
                <p style={{ fontSize: "13px", color: "#666", margin: "0" }}>30-day return policy</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "32px" }}>✓</span>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "700", color: "#000", margin: "0 0 0.5rem 0" }}>Guaranteed Safe</p>
                <p style={{ fontSize: "13px", color: "#666", margin: "0" }}>SSL encrypted checkout</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};