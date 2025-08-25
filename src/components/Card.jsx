import React, { useState, useEffect } from 'react';
import { Search, Filter, Heart, ShoppingCart, Star, ExternalLink, TrendingUp, Tag, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
export default function Card({ onNavigate }) {
const { authUser, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const sampleProducts = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      brand: 'Nike',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      category: 'Tops',
      rating: 4.5,
      reviews: 128,
      site: 'Amazon',
      availability: 'In Stock',
      shipping: 'Free',
      deliveryTime: '2-3 days',
      colors: ['White', 'Black', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Denim Jacket',
      brand: 'Levi\'s',
      price: 89.99,
      originalPrice: 120.00,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      category: 'Outerwear',
      rating: 4.7,
      reviews: 89,
      site: 'Zara',
      availability: 'In Stock',
      shipping: '$5.99',
      deliveryTime: '3-5 days',
      colors: ['Blue', 'Black'],
      sizes: ['M', 'L', 'XL']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: 'Over $100' }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const filtered = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setProducts(filtered);
    setIsLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...sampleProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
    }

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPriceRange, sortBy]);

  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto animate-fade-in">
        <div className="flex items-center space-x-2 animate-slide-in-left">
          <img 
         alt="StyleSeek logo icon, black triangle with circle inside" 
            className="w-6 h-6 hover:rotate-12 transition-transform duration-300 animate-rotate-in" 
            height="24" src="https://storage.googleapis.com/a1aa/image/1d711b83-7d8e-40dd-81ca-57b71f6cfc62.jpg" 
            width="24"
          />
          <span className="font-extrabold text-sm select-none animate-slide-up animation-delay-100">
                FASHIONATE
          </span></div>

                                   <nav className="hidden sm:flex space-x-8 text-sm font-normal text-[#1a1a1a] animate-slide-up animation-delay-200">
          <Link 
            to='/about'
            className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a]"
          >
            About
          </Link>
          <Link 
            to='/aistyletryout'
            className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a]"
          >
            AI Tryout
          </Link>
          <Link 
            to='/card'
            className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a]"
          >
            Shop
          </Link>
          <Link 
            to='/favourites'
            className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a]"
          >
            Favourites
          </Link>
        </nav>

        <div className="flex items-center space-x-4 animate-slide-in-right">
               <button 
             aria-label="Wishlist"  
           onClick={() => onNavigate('favourites')}
           className="w-9 h-9 rounded border border-[#d1d1d1] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f0f0f0] hover:scale-110 transition-all duration-300 hover-lift"
           >
             <Heart className="w-4 h-4" />
           </button>
          
          {!authUser&&(
            <>
            <Link to='/signin'
            className="px-4 py-2 text-sm font-medium text-[#1a1a1a] hover:text-blue-600 hover:scale-105 transition-all duration-300 hover-lift"
          >
            Sign In
          </Link>
          <Link to='/signup'
            className="px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 hover-lift hover-glow"
          >
            Sign Up </Link>
            </>
          )}
          {authUser&&(<button onClick={logout}
            className="px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300 hover-lift hover-glow"
          >
            Logout </button>)}
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 animate-fade-in animation-delay-300">
        <Link to='/' className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300 mb-6 group hover:scale-105 transform">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e5e5] animate-fade-in-up hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] group">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#b28f7f]/10 to-[#8b6b6b]/10 rounded-full animate-float"></div>
            <div className="absolute top-20 right-16 w-16 h-16 bg-gradient-to-r from-[#8b6b6b]/8 to-[#b28f7f]/8 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-16 left-1/4 w-12 h-12 bg-gradient-to-r from-[#b28f7f]/6 to-[#8b6b6b]/6 rounded-full animate-float-slow"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-center mb-2 animate-slide-up animation-delay-200 group-hover:text-[#b28f7f] transition-all duration-500">Find the Best Deals</h1>
            <p className="text-[#6b6b6b] text-center mb-8 animate-slide-up animation-delay-400 group-hover:text-[#8b6b6b] transition-all duration-500">Search across multiple sites to compare prices and find the best deals on clothing</p>
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8 animate-slide-up animation-delay-600">
              <div className="flex gap-4 group">
                <div className="flex-1 relative animate-bounce-subtle">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b6b6b] w-5 h-5 group-hover:text-[#b28f7f] group-hover:scale-110 transition-all duration-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for clothes, brands, or styles..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#e5e5e5] rounded-xl focus:border-[#b28f7f] focus:outline-none transition-all duration-300 text-lg hover:border-[#b28f7f]/50 group-hover:shadow-lg transform hover:scale-[1.02]"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  className="px-8 py-4 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] hover:from-[#8b6b6b] hover:to-[#1a1a1a] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-subtle hover:animate-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Search
                    </span>
                  )}
                </button>
              </div>
            </form>
            <div className="flex flex-wrap gap-4 justify-center animate-slide-up animation-delay-800">
              <div className="flex items-center gap-2 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                <Filter className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#b28f7f] transition-colors duration-300" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                  className="px-4 py-2 border border-[#e5e5e5] rounded-lg focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50 hover:shadow-md"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                <Tag className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#b28f7f] transition-colors duration-300" />
                <select 
                  value={selectedPriceRange} 
                  onChange={(e) => setSelectedPriceRange(e.target.value)} 
                  className="px-4 py-2 border border-[#e5e5e5] rounded-lg focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50 hover:shadow-md"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                <TrendingUp className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#b28f7f] transition-colors duration-300" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="px-4 py-2 border border-[#e5e5e5] rounded-lg focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50 hover:shadow-md"
                >
                  <option value="relevance">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in animation-delay-900">
        <div className="flex justify-between items-center mb-6 animate-slide-up animation-delay-1000">
          <h2 className="text-2xl font-bold animate-slide-in-left animation-delay-1100">{products.length > 0 ? `${products.length} Products Found` : 'No products found'}</h2>
          {products.length > 0 && <p className="text-[#6b6b6b] animate-slide-in-right animation-delay-1200">Showing best deals from multiple retailers</p>}
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg border border-[#e5e5e5] hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group animate-fade-in-up"
                style={{
                  animationDelay: `${1200 + index * 100}ms`,
                  animationFillMode: 'both'
                }}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    
                    {product.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce-subtle">
                        -{product.discount}%
                      </div>
                    )}
                    
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-12 transform">
                      <Heart className="w-5 h-5 text-[#6b6b6b] hover:text-red-500 transition-colors duration-300" />
                    </button>
                  </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-semibold text-[#b28f7f] uppercase tracking-wide">{product.brand}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-[#6b6b6b]">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-[#1a1a1a] group-hover:text-[#b28f7f] transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[#1a1a1a]">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-[#6b6b6b] line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                    {product.discount > 0 && (
                      <span className="text-sm font-bold text-red-600">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#6b6b6b]" />
                      <span className="text-sm font-medium">{product.site}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      product.availability === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.availability}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-[#6b6b6b]">
                    <span>Shipping: {product.shipping}</span>
                    <span>Delivery: {product.deliveryTime}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-[#6b6b6b]">Colors:</span>
                      <div className="flex gap-1">
                        {product.colors.map((color, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{color}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#6b6b6b]">Sizes:</span>
                      <div className="flex gap-1">
                        {product.sizes.map((size, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] hover:from-[#8b6b6b] hover:to-[#1a1a1a] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Add to Cart
                    </button>
                    <button className="flex items-center gap-2 bg-white border-2 border-[#b28f7f] text-[#b28f7f] hover:bg-[#b28f7f] hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="relative">
              <Search className="w-16 h-16 text-[#6b6b6b] mx-auto mb-4 animate-bounce-subtle" />
              <div className="absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-r from-[#b28f7f]/20 to-[#8b6b6b]/20 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 animate-slide-up animation-delay-200">No products found</h3>
            <p className="text-[#6b6b6b] mb-6 animate-slide-up animation-delay-400">Try adjusting your search terms or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedPriceRange('all');
                setSortBy('relevance');
                setProducts(sampleProducts);
              }} 
              className="px-6 py-3 bg-[#b28f7f] text-white font-medium rounded-lg hover:bg-[#8b6b6b] transition-all duration-300 hover:scale-105 hover:shadow-lg transform animate-slide-up animation-delay-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
