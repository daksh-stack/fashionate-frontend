import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, ExternalLink, MapPin, Trash2, ArrowLeft, Filter, Search, Sparkles } from 'lucide-react';

export default function Favourites({ onNavigate }) {
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const sampleFavourites = [
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
      sizes: ['S', 'M', 'L', 'XL'],
      addedDate: new Date('2024-01-15')
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
      sizes: ['M', 'L', 'XL'],
      addedDate: new Date('2024-01-10')
    },
    {
      id: 3,
      name: 'Summer Floral Dress',
      brand: 'H&M',
      price: 45.99,
      originalPrice: 59.99,
      discount: 23,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      category: 'Dresses',
      rating: 4.3,
      reviews: 67,
      site: 'H&M',
      availability: 'In Stock',
      shipping: 'Free',
      deliveryTime: '4-6 days',
      colors: ['Blue', 'Pink', 'Yellow'],
      sizes: ['XS', 'S', 'M', 'L'],
      addedDate: new Date('2024-01-08')
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setFavourites(sampleFavourites);
      setIsLoading(false);
    }, 1000);
  }, []);

  const removeFromFavourites = (productId) => {
    setFavourites(prev => prev.filter(product => product.id !== productId));
  };

  const filteredFavourites = favourites.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const sortedFavourites = [...filteredFavourites].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.addedDate - a.addedDate;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'discount':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="bg-[#fafafa] text-[#1a1a1a] min-h-screen flex items-center justify-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="text-center animate-fade-in-up">
          <div className="relative">
            <Heart className="w-20 h-20 text-[#b28f7f] mx-auto mb-6 animate-pulse" />
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-[#b28f7f]/20 to-[#8b6b6b]/20 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 animate-slide-up animation-delay-200">Loading Your Favourites</h2>
          <p className="text-[#6b6b6b] animate-slide-up animation-delay-400">Gathering all the items you love...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] min-h-screen" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto animate-fade-in-down">
        <div className="flex items-center space-x-2 animate-slide-in-left">
          <img 
            alt="StyleSeek logo icon" 
            className="w-6 h-6 hover:rotate-12 transition-transform duration-300 animate-rotate-in" 
            src="https://storage.googleapis.com/a1aa/image/1d711b83-7d8e-40dd-81ca-57b71f6cfc62.jpg" 
          />
          <span className="font-extrabold text-sm select-none animate-slide-up animation-delay-100">FASHIONATE</span>
        </div>

        <nav className="hidden sm:flex space-x-8 text-sm font-normal text-[#1a1a1a] animate-slide-up animation-delay-200">
          <button onClick={() => onNavigate('about')} className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a] hover:scale-105 transform">About</button>
          <button onClick={() => onNavigate('ai-tryout')} className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a] hover:scale-105 transform">AI Tryout</button>
          <button onClick={() => onNavigate('card')} className="hover:underline cursor-pointer hover:text-blue-600 transition-all duration-300 bg-transparent border-none text-sm font-normal text-[#1a1a1a] hover:scale-105 transform">Shop</button>
        </nav>

        <div className="flex items-center space-x-4 animate-slide-in-right">
          <button className="w-9 h-9 rounded border border-[#d1d1d1] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f0f0f0] hover:scale-110 transition-all duration-300 hover:rotate-12 transform">
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </button>
          <button className="w-9 h-9 rounded border border-[#d1d1d1] flex items-center justify-center text-[#1a1a1a] hover:bg-[#f0f0f0] hover:scale-110 transition-all duration-300 hover:rotate-12 transform">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 text-sm font-medium text-[#1a1a1a] hover:text-blue-600 hover:scale-105 transition-all duration-300">Sign In</button>
          <button className="px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded-md hover:bg-gray-800 hover:scale-105 transition-all duration-300">Sign Up</button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 animate-fade-in animation-delay-300">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300 mb-6 group hover:scale-105 transform">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute top-20 right-16 w-20 h-20 bg-white/8 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-16 left-1/4 w-16 h-16 bg-white/6 rounded-full animate-float-slow"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 bg-white/5 rounded-full animate-float"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4 animate-bounce-subtle">
              <Heart className="w-12 h-12 text-white fill-current mr-3" />
              <Sparkles className="w-8 h-8 text-yellow-200" />
            </div>
            <h1 className="text-4xl font-bold mb-2 animate-slide-up animation-delay-200">My Favourites</h1>
            <p className="text-lg opacity-90 animate-slide-up animation-delay-400">
              {favourites.length > 0 
                ? `You have ${favourites.length} favourite item${favourites.length !== 1 ? 's' : ''}`
                : 'Start adding items to your favourites while shopping!'
              }
            </p>
          </div>
        </div>
      </div>
      {favourites.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-8 animate-fade-in animation-delay-600">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e5e5] hover:shadow-xl transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative animate-slide-up animation-delay-700">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b6b6b] w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your favourites..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#e5e5e5] rounded-xl focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50"
                />
              </div>
              <div className="flex items-center gap-2 animate-slide-up animation-delay-800">
                <Filter className="w-4 h-4 text-[#6b6b6b]" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                  className="px-4 py-3 border border-[#e5e5e5] rounded-lg focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 animate-slide-up animation-delay-900">
                <Star className="w-4 h-4 text-[#6b6b6b]" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="px-4 py-3 border border-[#e5e5e5] rounded-lg focus:border-[#b28f7f] focus:outline-none transition-all duration-300 hover:border-[#b28f7f]/50"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 pb-20 animate-fade-in animation-delay-1000">
        {favourites.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6 animate-slide-up animation-delay-1100">
              <h2 className="text-2xl font-bold animate-slide-in-left animation-delay-1200">
                {filteredFavourites.length} Favourite Item{filteredFavourites.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-[#6b6b6b] animate-slide-in-right animation-delay-1300">
                Your personal collection of loved items
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFavourites.map((product, index) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-lg border border-[#e5e5e5] hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group animate-fade-in-up"
                  style={{
                    animationDelay: `${1400 + index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >

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
                    <button 
                      onClick={() => removeFromFavourites(product.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-500/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110 hover:rotate-12 transform group/btn"
                      title="Remove from favourites"
                    >
                      <Trash2 className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur">
                      Added {product.addedDate.toLocaleDateString()}
                    </div>
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
          </>
        ) : (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="relative">
              <Heart className="w-24 h-24 text-[#b28f7f] mx-auto mb-6 animate-bounce-subtle" />
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-[#b28f7f]/20 to-[#8b6b6b]/20 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2 animate-slide-up animation-delay-200">No Favourites Yet</h3>
            <p className="text-[#6b6b6b] mb-6 animate-slide-up animation-delay-400">
              Start shopping and add items to your favourites by clicking the heart icon!
            </p>
            <button 
              onClick={() => onNavigate('card')} 
              className="px-8 py-4 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] text-white font-bold rounded-xl hover:from-[#8b6b6b] hover:to-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:shadow-xl transform animate-slide-up animation-delay-600"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
