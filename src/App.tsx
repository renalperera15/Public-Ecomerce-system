import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import SideBar from "./components.ts/SideBar";
import Home from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { Header } from "./components.ts/Header";
import "./App.css";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <SideBar />
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
        <Header onSearch={handleSearch} onCartClick={() => {}} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchValue} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home searchQuery={searchValue} />} />
        </Routes>
      </div>
    </div>
  );
}