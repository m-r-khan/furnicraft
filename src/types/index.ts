export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
    inStock: boolean;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'delivered';
    createdAt: Date;
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
  }
  