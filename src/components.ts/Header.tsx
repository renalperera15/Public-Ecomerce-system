import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";

interface HeaderProps {
  onSearch: (value: string) => void;
  onCartClick: () => void;
}

export const Header = ({ onSearch, onCartClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [cartHovered, setCartHovered] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <header style={{ backgroundColor: "#0066cc", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", padding: "1rem 0", borderBottom: "1px solid #0052a3" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "#fff", fontSize: "20px", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "0.5rem" }}
          >
            <rect width="28" height="28" rx="6" fill="currentColor" />
            <path
              d="M8 10.5C8 10.2239 8.22386 10 8.5 10H19.5C19.7761 10 20 10.2239 20 10.5V20C20 21.1046 19.1046 22 18 22H10C8.89543 22 8 21.1046 8 20V10.5Z"
              fill="white"
              opacity="0.3"
            />
            <path d="M14 6V10M10 14H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "700" }}>Store</h1>
        </Link>
        <div style={{ flex: 1, display: "flex" }}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", transition: "all 0.2s ease", backgroundColor: "#fff", color: "#000" }}
          />
        </div>
        <button
          onClick={() => { navigate("/cart"); onCartClick(); }}
          title="Shopping Cart"
          onMouseEnter={() => setCartHovered(true)}
          onMouseLeave={() => setCartHovered(false)}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem", backgroundColor: cartHovered ? "#f0f0f0" : "#fff", color: "#0066cc", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap", flexShrink: 0, boxShadow: cartHovered ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none", position: "relative" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Cart
          {cart.length > 0 && <span style={{ position: "absolute", top: "-5px", right: "-5px", backgroundColor: "#ff4444", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>{cart.length}</span>}
        </button>
      </div>
    </header>
  );
};
