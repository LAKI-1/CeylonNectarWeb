import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { Product } from '../../types';
import { products } from '../../data/mockData';

const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Get unique honey types
  const honeyTypes = Array.from(new Set(products.map(p => p.type)));

  // Filter products based on search query and type
  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query)
      );
    }
    
    if (selectedType) {
      result = result.filter(product => product.type === selectedType);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedType]);

  return (
    <div className="pt-24 pb-16">
      <div className="bg-forest-800 py-12 mb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-semibold text-white mb-3">
            Discover Premium Sri Lankan Honey
          </h1>
          <p className="text-forest-50 max-w-3xl mb-8">
            Explore our collection of pure, sustainably harvested honey varieties
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="search"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-honey-500"
                placeholder="Search honey varieties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-honey-500 md:w-48"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {honeyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;