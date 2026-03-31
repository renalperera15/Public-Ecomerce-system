import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface FilterContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory : string;
    setSelectedCategory : (category : string) => void;
    minPrice: number | undefined;
    setMinPrice : (price :  number | undefined) => void;
    maxPrice : number | undefined;
    setMaxPrice : (price : number | undefined) => void;
    keyword: string;
    setKeyword: (keyword: string ) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

const Filtercontext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('all');

    return ( <Filtercontext.Provider value = {{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
        sortBy,
        setSortBy,
    }}>
        {children}
    </Filtercontext.Provider>
  );
};

export const useFilter = () => {
    const context = useContext(Filtercontext);
    if (context === undefined){
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};