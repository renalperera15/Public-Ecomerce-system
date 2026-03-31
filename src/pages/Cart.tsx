import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import { PaymentForm } from "../components.ts/PaymentForm";

export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div style={{ padding: "3rem 2rem", backgroundColor: "#fff", minHeight: "600px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "1rem" }}>🛒</div>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#000", margin: "0 0 1rem 0" }}>Your Cart is Empty</h1>
        <p style={{ fontSize: "16px", color: "#666", margin: "0 0 2rem 0", maxWidth: "400px" }}>Looks like you haven't added anything to your cart yet. Browse our products and start shopping!</p>
        <button onClick={() => navigate("/")} style={{ padding: "0.75rem 2rem", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0052a3"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#0066cc"}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (showPayment) {
    return <PaymentForm total={total} />;
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff", minHeight: "600px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#000", marginBottom: "2rem" }}>Shopping Cart ({cart.length} items)</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
        {/* Cart Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "100px 1fr auto", gap: "1.5rem", padding: "1.5rem", backgroundColor: "#f9f9f9", borderRadius: "8px", alignItems: "center", borderBottom: "1px solid #eee" }}>
              {/* Product Image */}
              <div style={{ width: "100px", height: "100px", backgroundColor: "#fff", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5rem" }}>
                <img src={item.image} alt={item.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>

              {/* Product Details */}
              <div style={{ minWidth: "0" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#000", margin: "0 0 0.5rem 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#0066cc", margin: "0" }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls and Remove */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #e0e0e0", borderRadius: "6px", padding: "0.5rem" }}>
                  <button onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))} style={{ width: "32px", height: "32px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", color: "#666", fontWeight: "600" }}>
                    −
                  </button>
                  <input type="number" value={item.quantity} onChange={(e) => updateQty(item.id, Math.max(1, parseInt(e.target.value) || 1))} min="1" style={{ width: "50px", border: "none", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#000", backgroundColor: "transparent" }} />
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: "32px", height: "32px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px", color: "#666", fontWeight: "600" }}>
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} style={{ padding: "0.5rem 1rem", border: "1px solid #ff4444", backgroundColor: "transparent", color: "#ff4444", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fff5f5"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", padding: "1.5rem", height: "fit-content", border: "1px solid #eee" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#000", margin: "0 0 1.5rem 0" }}>Order Summary</h2>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "14px", color: "#666" }}>
            <span>Subtotal:</span>
            <span style={{ fontWeight: "600" }}>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "14px", color: "#666" }}>
            <span>Shipping:</span>
            <span style={{ fontWeight: "600" }}>
              {shipping === 0 ? <span style={{ color: "#27ae60" }}>FREE</span> : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "14px", color: "#666", paddingBottom: "1.5rem", borderBottom: "1px solid #e0e0e0" }}>
            <span>Tax (10%):</span>
            <span style={{ fontWeight: "600" }}>${tax.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontSize: "18px", fontWeight: "700", color: "#000" }}>
            <span>Total:</span>
            <span style={{ color: "#0066cc" }}>${total.toFixed(2)}</span>
          </div>

          <button onClick={() => setShowPayment(true)} style={{ width: "100%", padding: "1rem", backgroundColor: "#0066cc", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.5px" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#0052a3"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 102, 204, 0.4)"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#0066cc"; e.currentTarget.style.boxShadow = "none"; }}>
            Proceed to Checkout
          </button>

          <button onClick={() => navigate("/")} style={{ width: "100%", padding: "0.75rem", marginTop: "1rem", backgroundColor: "transparent", color: "#0066cc", border: "2px solid #0066cc", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e8f1ff"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

