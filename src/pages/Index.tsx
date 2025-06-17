import React from 'react';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
