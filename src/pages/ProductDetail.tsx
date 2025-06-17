import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 w-32 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-300 h-8 rounded"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                <div className="bg-gray-300 h-6 rounded w-1/4"></div>
                <div className="bg-gray-300 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <button
              onClick={handleGoBack}
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <div className="text-6xl mb-4">🪑</div>
                  <div className="text-lg">No Image Available</div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-emerald-700">
                ₹{product.price.toLocaleString()}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Availability:</span>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-emerald-700 text-white py-3 px-6 rounded-lg hover:bg-emerald-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button
                onClick={handleGoBack}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Product Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Premium quality materials</li>
                <li>• Modern and elegant design</li>
                <li>• Easy assembly with included hardware</li>
                <li>• 1-year warranty included</li>
                <li>• Free delivery within city limits</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
