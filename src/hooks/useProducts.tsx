import { useState, useEffect } from 'react';
import { Product } from '../types';

// Sample furniture data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa Set',
    description: 'Comfortable 3-seater sofa with premium fabric upholstery',
    price: 45000,
    category: 'Living Room',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wooden Dining Table',
    description: 'Solid wood dining table for 6 people with elegant design',
    price: 32000,
    category: 'Dining Room',
    inStock: true,
  },
  {
    id: '3',
    name: 'Queen Size Bed',
    description: 'Luxury queen size bed with storage and premium mattress',
    price: 55000,
    category: 'Bedroom',
    inStock: true,
  },
  {
    id: '4',
    name: 'Office Chair',
    description: 'Ergonomic office chair with lumbar support and adjustable height',
    price: 12000,
    category: 'Office',
    inStock: true,
  },
  {
    id: '5',
    name: 'Coffee Table',
    description: 'Glass top coffee table with wooden legs, perfect for living room',
    price: 8500,
    category: 'Living Room',
    inStock: true,
  },
  {
    id: '6',
    name: 'Wardrobe',
    description: '4-door wardrobe with mirror and multiple compartments',
    price: 28000,
    category: 'Bedroom',
    inStock: false,
  },
  {
    id: '7',
    name: 'Study Desk',
    description: 'Compact study desk with drawers and cable management',
    price: 15000,
    category: 'Office',
    inStock: true,
  },
  {
    id: '8',
    name: 'Recliner Chair',
    description: 'Luxury leather recliner with massage function',
    price: 25000,
    category: 'Living Room',
    inStock: true,
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setLoading(true);
      
      // Check if products exist in localStorage
      const savedProducts = localStorage.getItem('furnicraft_products');
      if (savedProducts) {
        try {
          setProducts(JSON.parse(savedProducts));
        } catch (error) {
          console.error('Error parsing saved products:', error);
          setProducts(initialProducts);
          localStorage.setItem('furnicraft_products', JSON.stringify(initialProducts));
        }
      } else {
        setProducts(initialProducts);
        localStorage.setItem('furnicraft_products', JSON.stringify(initialProducts));
      }
      
      setLoading(false);
    };

    loadProducts();
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('furnicraft_products', JSON.stringify(updatedProducts));
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('furnicraft_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('furnicraft_products', JSON.stringify(updatedProducts));
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
