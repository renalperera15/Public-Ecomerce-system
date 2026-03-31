import { createContext, useContext, useState, useCallback, useEffect } from "react";

type StockContextType = {
  stock: { [productId: number]: number };
  decreaseStock: (productId: number, quantity: number) => void;
  increaseStock: (productId: number, quantity: number) => void;
  setInitialStock: (products: any[]) => void;
};

const StockContext = createContext<StockContextType | null>(null);

export const StockProvider = ({ children }: { children: React.ReactNode }) => {
  const [stock, setStock] = useState<{ [productId: number]: number }>(() => 
    JSON.parse(localStorage.getItem("productStock") || "{}")
  );

  useEffect(() => {
    localStorage.setItem("productStock", JSON.stringify(stock));
  }, [stock]);

  const setInitialStock = useCallback((products: any[]) => {
    setStock(prev => {
      const updated = { ...prev };
      products.forEach(product => {
        if (!(product.id in updated)) {
          updated[product.id] = product.stock || 10;
        }
      });
      return updated;
    });
  }, []);

  const decreaseStock = useCallback((productId: number, quantity: number) => {
    setStock(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - quantity)
    }));
  }, []);

  const increaseStock = useCallback((productId: number, quantity: number) => {
    setStock(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
  }, []);

  const value: StockContextType = { stock, decreaseStock, increaseStock, setInitialStock };
  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) throw new Error("useStock must be used within StockProvider");
  return context;
};
