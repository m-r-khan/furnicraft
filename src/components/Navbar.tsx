import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-emerald-700">
            FurniCraft
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-700 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-emerald-700 transition-colors">
              Products
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-emerald-700 transition-colors">
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-emerald-700 transition-colors">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-emerald-700 transition-colors">
                <User size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-emerald-700 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-emerald-700 transition-colors">
                Products
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-emerald-700 transition-colors">
                  Admin
                </Link>
              )}
              <Link to="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-700 transition-colors">
                <ShoppingCart size={20} />
                <span>Cart ({cartItemsCount})</span>
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">Hello, {user.name}</span>
                  <button
                    onClick={logout}
                    className="text-left text-gray-700 hover:text-emerald-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-700 transition-colors">
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
