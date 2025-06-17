import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/products"
              className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Continue Shopping
            </Link>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    {item.product.image ? (
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400 text-2xl">🪑</div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.product.description}</p>
                    <p className="text-emerald-700 font-semibold text-lg">
                      ₹{item.product.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold px-3 py-1 bg-gray-100 rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-emerald-700">₹{getTotalPrice().toLocaleString()}</span>
                </div>
              </div>
              
              {user ? (
                <Link
                  to="/checkout"
                  className="w-full block text-center bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Please login to continue</p>
                  <Link
                    to="/login"
                    className="w-full block text-center bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors"
                  >
                    Login to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
