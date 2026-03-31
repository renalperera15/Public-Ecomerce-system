export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  category?: string;
  stock?: number;
}

// Mock products fallback
const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: "Fjallraven - Backpack", price: 109.95, description: "Your perfect pack for everyday adventures.", category: "men's clothing", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", rating: { rate: 3.9, count: 120 }, stock: 5 },
  { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts", price: 22.3, description: "Slim-fitting style, contrast raglan long sleeve.", category: "men's clothing", image: "https://fakestoreapi.com/img/71-yCoNFT5L._AC_Ux679_.jpg", rating: { rate: 4.1, count: 259 }, stock: 10 },
  { id: 3, title: "Mens Cotton Jacket", price: 55.99, description: "Premium quality cotton with comfortable fit.", category: "men's clothing", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 4.6, count: 235 }, stock: 9 },
  { id: 4, title: "Mens Slim Fit V Neck Casual Shirts", price: 15.99, description: "Comfortable and stylish casual wear.", category: "men's clothing", image: "https://fakestoreapi.com/img/71pIvwcc-SrL._DC_SY879_.jpg", rating: { rate: 2.1, count: 56 }, stock: 4 },
  { id: 5, title: "John Hardy Womens Legends Naga Gold", price: 695, description: "Elegant design with certified gold plating.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 4.6, count: 68 }, stock: 2 },
  { id: 6, title: "BIYLACLESEN Womens Jacket", price: 56.99, description: "High quality pure cotton jacket with lining.", category: "women's clothing", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", rating: { rate: 2.6, count: 235 }, stock: 6 },
  { id: 7, title: "Women Copper Bracelet", price: 9.99, description: "Beautiful copper bracelet for women - adjustable size.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 3.2, count: 121 }, stock: 6 },
  { id: 8, title: "Samsung 870 EVO SSD", price: 999, description: "High speed solid state drive with excellent performance.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 2.1, count: 512 }, stock: 7 },
  { id: 9, title: "SanDisk SSD Plus", price: 899, description: "Fast and reliable storage solution.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 3.13, count: 193 }, stock: 5 },
  { id: 10, title: "Wireless Monitor Light Bar", price: 999, description: "Smart monitor light with ambient light sensor.", category: "electronics", image: "https://fakestoreapi.com/img/81KwZwEzNzL._AC_SY879_.jpg", rating: { rate: 2.6, count: 340 }, stock: 3 },
  { id: 11, title: "DANVOUY Womens T Shirt", price: 12.99, description: "95% RAYON 5% SPANDEX, Made in USA or Imported.", category: "women's clothing", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", rating: { rate: 3.8, count: 145 }, stock: 8 },
  { id: 12, title: "White Gold Plated Diamond Ring", price: 9.99, description: "Classic Collection Engagement Wedding Ring.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 4.6, count: 68 }, stock: 4 },
  { id: 13, title: "Rain Jacket for Mens", price: 51.3, description: "Waterproof, breathable fabric for all weather.", category: "men's clothing", image: "https://fakestoreapi.com/img/71pIvwcc-SrL._DC_SY879_.jpg", rating: { rate: 3.8, count: 56 }, stock: 7 },
  { id: 14, title: "Gold Plated Necklace", price: 34.99, description: "Beautiful gold plated necklace for women.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 3.8, count: 99 }, stock: 6 },
  { id: 15, title: "Womens Athletic Leggings", price: 29.99, description: "High waisted, comfortable, and stylish leggings.", category: "women's clothing", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", rating: { rate: 4.2, count: 178 }, stock: 11 },
  { id: 16, title: "Men Blue Formal Pants", price: 48.97, description: "Premium dress pants with perfect fit.", category: "men's clothing", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 3.6, count: 145 }, stock: 8 },
  { id: 17, title: "Silver Plated Bracelet", price: 19.99, description: "Elegant silver bracelet for everyday wear.", category: "jewelery", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg", rating: { rate: 3.9, count: 112 }, stock: 5 },
  { id: 18, title: "Sony Wireless Headphones", price: 379.99, description: "Premium noise-cancelling wireless headphones.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 4.3, count: 345 }, stock: 6 },
  { id: 19, title: "Womens Summer Dress", price: 39.99, description: "Lightweight and comfortable summer dress.", category: "women's clothing", image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg", rating: { rate: 3.7, count: 203 }, stock: 9 },
  { id: 20, title: "Portable Phone Charger", price: 59.99, description: "Fast charging 20000mAh portable power bank.", category: "electronics", image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg", rating: { rate: 4.1, count: 428 }, stock: 12 },
];

export const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    // Add stock to real data
    return data.map((product: any) => ({
      ...product,
      stock: Math.floor(Math.random() * 15) + 1
    }));
  } catch (error) {
    console.warn("Using mock data:", error);
    return MOCK_PRODUCTS;
  }
};

export const fetchProductById = async (id: string | number) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error("API failed");
    const data = await res.json();
    return {
      ...data,
      stock: Math.floor(Math.random() * 15) + 1
    };
  } catch (error) {
    console.warn("Using mock product:", error);
    return MOCK_PRODUCTS.find(p => p.id === Number(id)) || MOCK_PRODUCTS[0];
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) throw new Error("API failed");
    return res.json();
  } catch (error) {
    console.warn("Using mock categories:", error);
    return ["men's clothing", "women's clothing", "jewelery", "electronics"];
  }
};