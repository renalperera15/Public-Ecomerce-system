import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import * as yup from "yup";

interface PaymentFormProps {
  total: number;
}

const validationSchema = yup.object().shape({
  cardType: yup.string().required("Select a card type"),
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  cardNumber: yup.string().required("Card number is required").matches(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: yup.string().required("Expiry date is required").matches(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: yup.string().required("CVV is required").matches(/^\d{3,4}$/, "CVV must be 3-4 digits"),
  address: yup.string().required("Address is required").min(10, "Address must be at least 10 characters"),
});

export const PaymentForm = ({ total }: PaymentFormProps) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [cardType, setCardType] = useState("");
  const [form, setForm] = useState({ name: "", cardNumber: "", expiryDate: "", cvv: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formatted = value;
    
    if (name === "cardNumber") formatted = value.replace(/\s/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
    if (name === "expiryDate") {
      formatted = value.replace(/\D/g, "").slice(0, 4);
      if (formatted.length >= 2) formatted = formatted.slice(0, 2) + "/" + formatted.slice(2);
    }
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 4);
    
    setForm({ ...form, [name]: formatted });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateAndSubmit = async () => {
    try {
      const data = { 
        cardType, 
        name: form.name,
        cardNumber: form.cardNumber.replace(/\s/g, ""),
        expiryDate: form.expiryDate,
        cvv: form.cvv,
        address: form.address
      };
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});
      
      setIsProcessing(true);
      await new Promise(r => setTimeout(r, 2000));
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => { clearCart(); navigate("/"); }, 2000);
    } catch (err: any) {
      const newErrors: Record<string, string> = {};
      err.inner?.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  if (showSuccess) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", backgroundColor: "#e8f5e9", borderRadius: "8px", padding: "2rem" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "60px", color: "#27ae60", marginBottom: "1rem" }}>✓</div>
          <h2 style={{ color: "#000", marginBottom: "0.5rem" }}>Payment Successful!</h2>
          <p style={{ color: "#666", marginBottom: "1rem" }}>Thank you for your purchase</p>
          <p style={{ fontSize: "18px", fontWeight: "700", color: "#0066cc", marginBottom: "1rem" }}>${total.toFixed(2)}</p>
          <p style={{ color: "#999", fontSize: "14px" }}>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "0.5rem", color: "#000" }}>Payment Details</h2>
      <p style={{ fontSize: "16px", color: "#666", marginBottom: "2rem" }}>Amount: <strong style={{ color: "#0066cc" }}>${total.toFixed(2)}</strong></p>

      {/* Card Type */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "1rem", color: "#000" }}>Card Type</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          {["visa", "mastercard"].map(type => (
            <label key={type} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", border: cardType === type ? "2px solid #0066cc" : "1px solid #e0e0e0", borderRadius: "8px", cursor: "pointer", backgroundColor: cardType === type ? "#f0f7ff" : "#fff", transition: "all 0.2s" }}>
              <input type="radio" name="cardType" checked={cardType === type} onChange={() => { setCardType(type); setErrors({ ...errors, cardType: "" }); }} style={{ cursor: "pointer" }} />
              <span style={{ textTransform: "capitalize", fontWeight: "500", color: "#000" }}>{type}</span>
            </label>
          ))}
        </div>
        {errors.cardType && <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "0.5rem" }}>{errors.cardType}</p>}
      </div>

      {/* Form Fields */}
      {cardType && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[{ label: "Full Name", name: "name", placeholder: "John Doe" }, { label: "Card Number", name: "cardNumber", placeholder: "1234 5678 9012 3456", maxLength: 19 }, { label: "Address", name: "address", placeholder: "Your address", isTextarea: true }].map(field => (
            <div key={field.name}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "0.5rem", color: "#000" }}>{field.label} *</label>
              {field.isTextarea ? (
                <textarea name={field.name} placeholder={field.placeholder} value={form[field.name as keyof typeof form]} onChange={handleInput} style={{ width: "100%", padding: "0.75rem", border: errors[field.name] ? "2px solid #d32f2f" : "1px solid #ccc", borderRadius: "6px", fontSize: "14px", fontFamily: "inherit", color: "#000", backgroundColor: "#fff", boxSizing: "border-box" }} rows={3} />
              ) : (
                <input type="text" name={field.name} placeholder={field.placeholder} value={form[field.name as keyof typeof form]} onChange={handleInput} maxLength={field.maxLength} style={{ width: "100%", padding: "0.75rem", border: errors[field.name] ? "2px solid #d32f2f" : "1px solid #ccc", borderRadius: "6px", fontSize: "14px", color: "#000", backgroundColor: "#fff", boxSizing: "border-box" }} />
              )}
              {errors[field.name] && <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "0.25rem" }}>{errors[field.name]}</p>}
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[{ label: "Expiry Date", name: "expiryDate", placeholder: "MM/YY", maxLength: 5 }, { label: "CVV", name: "cvv", placeholder: "123", maxLength: 4 }].map(field => (
              <div key={field.name}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "0.5rem", color: "#000" }}>{field.label} *</label>
                <input type="text" name={field.name} placeholder={field.placeholder} value={form[field.name as keyof typeof form]} onChange={handleInput} maxLength={field.maxLength} style={{ width: "100%", padding: "0.75rem", border: errors[field.name] ? "2px solid #d32f2f" : "1px solid #ccc", borderRadius: "6px", fontSize: "14px", color: "#000", backgroundColor: "#fff", boxSizing: "border-box" }} />
                {errors[field.name] && <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "0.25rem" }}>{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          <button onClick={validateAndSubmit} disabled={isProcessing} style={{ padding: "1rem", backgroundColor: isProcessing ? "#ccc" : "#0066cc", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: isProcessing ? "not-allowed" : "pointer", transition: "all 0.2s" }} onMouseEnter={e => !isProcessing && (e.currentTarget.style.backgroundColor = "#0052a3")} onMouseLeave={e => !isProcessing && (e.currentTarget.style.backgroundColor = "#0066cc")}>
            {isProcessing ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      )}
    </div>
  );
};
