import { create } from 'zustand'

export const useProductStore = create((set, get) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    searchTerm: '',
    filters: {
        minPrice: '',
        maxPrice: '',
        sortBy: 'createdAt:desc',
        category: 'all'
    },
    
    // Set loading state
    setLoading: (loading) => set({ loading }),
    
    // Set error state
    setError: (error) => set({ error }),
    
    // Clear error
    clearError: () => set({ error: null }),
    
    // Set search term
    setSearchTerm: (searchTerm) => set({ searchTerm }),
    
    // Set filters
    setFilters: (filters) => set({ filters }),
    
    setProducts: (products) => set({ products }),
    
    setCategories: (categories) => set({ categories }),
    
    createProduct: async (newProduct) => {
        set({ loading: true, error: null });
        
        try {
            if (!newProduct.name || !newProduct.price || !newProduct.image || !newProduct.category) {
                throw new Error('Please fill in all required fields');
            }
            
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create product');
            }
            
            const data = await res.json();
            set((state) => ({ 
                products: [...state.products, data.data],
                loading: false 
            }));
            
            return { success: true, message: 'Product created successfully' };
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
    
    fetchProducts: async () => {
        set({ loading: true, error: null });
        
        try {
            const { searchTerm, filters } = get();
            const params = new URLSearchParams();
            
            if (searchTerm) params.append('search', searchTerm);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.sortBy) params.append('sort', filters.sortBy);
            if (filters.category && filters.category !== 'all') params.append('category', filters.category);
            
            const queryString = params.toString();
            const url = queryString ? `/api/products?${queryString}` : '/api/products';
            
            const res = await fetch(url);
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch products');
            }
            
            const data = await res.json();
            set({ products: data.data, loading: false });
        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },
    
    fetchCategories: async () => {
        try {
            const res = await fetch('/api/products/categories');
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch categories');
            }
            
            const data = await res.json();
            set({ categories: data.data });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },
    
    deleteProduct: async (pid) => {
        set({ loading: true, error: null });
        
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to delete product');
            }
            
            const data = await res.json();
            
            // Update the UI immediately
            set((state) => ({ 
                products: state.products.filter((product) => product._id !== pid),
                loading: false 
            }));
            
            return { success: true, message: data.message };
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
    
    updateProduct: async (pid, updatedProduct) => {
        set({ loading: true, error: null });
        
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update product');
            }
            
            const data = await res.json();
            
            // Update the UI immediately
            set((state) => ({
                products: state.products.map((product) => 
                    product._id === pid ? data.data : product
                ),
                loading: false
            }));
            
            return { success: true, message: data.message };
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
}));