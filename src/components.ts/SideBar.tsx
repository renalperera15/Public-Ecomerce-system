import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { fetchCategories } from "../api/Product";

const fallbackCategories = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const SideBar = () => {
    const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, sortBy, setSortBy } = useFilter();

    const [categories, setCategories] = useState<string[]>(fallbackCategories);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    const getCats = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }
    getCats();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleResetFilters = () =>{
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSortBy("all");
  }


    return <div style={{ width: '256px', padding: '1.25rem', height: '100vh', overflowY: 'auto', borderRight: '1px solid #e0e0e0', backgroundColor: '#fafafa', scrollbarWidth: 'thin', scrollbarColor: '#ccc #f0f0f0' }}>
      <style>{`
        input[type="radio"]:checked {
          background-color: #0066cc !important;
          border-color: #0066cc !important;
        }
      `}</style>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '2.5rem', marginTop: '1rem', color: '#0066cc' }}>E-Commerce </h1>

      {/* SEARCH BOX */}
      <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1rem', color: '#000', letterSpacing: '0.5px' }}>SEARCH</h2>
        <input
          type="text"
          style={{ border: `1px solid ${focusedInput === 'search' ? '#0066cc' : '#000'}`, borderRadius: '4px', padding: '0.5rem', marginBottom: '1rem', width: '100%', boxSizing: 'border-box', fontSize: '14px', color: '#000', backgroundColor: '#fff', outline: 'none', boxShadow: focusedInput === 'search' ? '0 0 5px rgba(0, 102, 204, 0.5)' : 'none' }}
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setFocusedInput('search')}
          onBlur={() => setFocusedInput(null)}
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="text"
            style={{ border: `1px solid ${focusedInput === 'min' ? '#0066cc' : '#000'}`, padding: '0.75rem', marginBottom: '0.75rem', width: '100%', boxSizing: 'border-box', color: '#000', backgroundColor: '#fff', outline: 'none', boxShadow: focusedInput === 'min' ? '0 0 5px rgba(0, 102, 204, 0.5)' : 'none', borderRadius: '4px', fontSize: '12px' }}
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
            onFocus={() => setFocusedInput('min')}
            onBlur={() => setFocusedInput(null)}
          />
          <input
            type="text"
            style={{ border: `1px solid ${focusedInput === 'max' ? '#0066cc' : '#000'}`, padding: '0.75rem', marginBottom: '0.75rem', width: '100%', boxSizing: 'border-box', color: '#000', backgroundColor: '#fff', outline: 'none', boxShadow: focusedInput === 'max' ? '0 0 5px rgba(0, 102, 204, 0.5)' : 'none', borderRadius: '4px', fontSize: '12px' }}
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            onFocus={() => setFocusedInput('max')}
            onBlur={() => setFocusedInput(null)}
          />
        </div>
      </div>

      {/* CATEGORIES BOX */}
      <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1rem', color: '#000', letterSpacing: '0.5px' }}>CATEGORIES</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {categories.map((category) => (
            <label key={category} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#000', fontWeight: '600' }}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleRadioChangeCategories(category)}
                style={{ marginRight: '0.5rem', cursor: 'pointer', accentColor: '#0066cc', width: '18px', height: '18px', backgroundColor: '#fff', border: '2px solid #000', appearance: 'none', borderRadius: '50%' }}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* SORT BY BOX */}
      <div style={{ backgroundColor: '#fff', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '1rem', color: '#000', letterSpacing: '0.5px' }}>SORT BY</h2>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #0066cc', borderRadius: '4px', fontSize: '14px', color: '#000', backgroundColor: '#fff', cursor: 'pointer', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f8ff'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
          <option value="all">All Products</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="best-rating">Best Rating</option>
        </select>
      </div>

      <button onClick={handleResetFilters} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0066cc', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0052a3'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}>Reset filters</button> 
   </div>
    

}

export default SideBar;