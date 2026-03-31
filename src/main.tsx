import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import React from "react";
import "./index.css";
import { FilterProvider } from "./components.ts/FilterContext";
import { CartProvider } from "./context/Cartcontext";
import { StockProvider } from "./context/Stockcontext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <StockProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </StockProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>
);