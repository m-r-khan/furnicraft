import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="aspect-square bg-gray-200 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">🪑</div>
            <div>No Image</div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-700">
            ₹{product.price.toLocaleString()}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-emerald-700 text-white p-2 rounded-lg hover:bg-emerald-800 transition-colors"
            disabled={!product.inStock}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {!product.inStock && (
          <p className="text-red-500 text-sm mt-2">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
