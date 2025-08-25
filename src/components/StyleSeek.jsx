import { useState, useEffect, useRef } from 'react';
import { Heart, Mail, Search, Tag, Camera, MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';

export default function StyleSeek({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const {authUser,logout} = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! 👋 I\'m your FASHIONATE style assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const searchBarRef = useRef(null);
  const heroRef = useRef(null);
  const chatEndRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleImageCapture = () => {
    console.log('Opening image capture for style analysis...');};

  const scrollToSearch = () => {
    searchBarRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        message: newMessage,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          type: 'bot',
          message: getBotResponse(newMessage),
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('style') || message.includes('fashion')) {
      return 'Great question! For style advice, I recommend checking out our AI Tryout feature. You can virtually try on different outfits to see what works best for you! 👗✨';
    } else if (message.includes('outfit') || message.includes('clothes')) {
      return 'I\'d love to help you find the perfect outfit! Try our AI Tryout feature to see how different styles look on you, or browse our latest collections. 🛍️';
    } else if (message.includes('trend') || message.includes('latest')) {
      return 'Stay ahead of the curve! Our latest trends include sustainable fashion, bold colors, and versatile pieces. Check out our featured collections! 🌟';
    } else if (message.includes('size') || message.includes('fit')) {
      return 'Finding the right fit is crucial! Our AI Tryout feature can help you visualize how clothes will look, and we offer detailed size guides for every item. 📏';
    } else if (message.includes('sale') || message.includes('discount')) {
      return 'Great deals are always available! Check our exclusive member discounts and seasonal sales. Sign up to get notified about the best offers! 💰';
    } else {
      return 'That\'s an interesting question! I\'m here to help with all things fashion. Try asking about styles, trends, outfits, or use our AI Tryout feature! 💡';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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
      <main className="max-w-7xl mx-auto px-6 pb-12">
         <section 
           ref={heroRef}
           className="relative rounded-lg overflow-hidden mt-6 max-w-6xl mx-auto h-[400px] animate-fade-in hero-glow" 
           style={{backgroundColor: '#b28f7f'}}
         >
          <img 
            alt="Illustration of a woman with long light brown hair wearing a black coat on a warm brown background" 
            className="w-full h-full rounded-lg object-cover animate-zoom-in" 
            height="400"
            src="https://storage.googleapis.com/a1aa/image/0ff873f5-f37d-4dbf-6a61-2309f9ccf5d0.jpg" 
            width="1200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl animate-float-up">
                 Discover Your Style
            </h1>
            <p className="text-white text-sm sm:text-base mt-2 max-w-2xl animate-float-up animation-delay-300">
          Explore the latest trends and exclusive offers from top brands. Find your perfect look today.
            </p>
                         <div className="mt-6 animate-float-up animation-delay-600">
                                    <Link 
                        to='/card'
                        className="px-8 py-4 bg-white text-[#1a1a1a] font-bold text-lg rounded-xl hover:bg-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover-lift hover-glow border-0"
                      >
                        Let's Start
                      </Link>
            </div>
          </div>
        </section>
         <section className="mt-16 max-w-7xl mx-auto relative overflow-hidden">
           <div className="flex justify-between items-center">
             <div className={`w-1/2 pr-8 transform transition-all duration-1000 ${isScrolled ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
               <img 
                 src="https://storage.googleapis.com/a1aa/image/89e7d4f7-d8d6-4e9e-17e0-13701066d2b9.jpg"
                 alt="Teen fashion trend - casual street style"
                 className="w-full h-64 object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
               />
               <h3 className="text-lg font-bold mt-3 text-center">Street Style Vibes</h3>
               <p className="text-sm text-gray-600 text-center">Latest teen fashion trends</p>
             </div>
             <div className={`w-1/2 pl-8 transform transition-all duration-1000 ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
               <img 
                 src="https://storage.googleapis.com/a1aa/image/72572b88-82f9-47b0-f7d7-402c93307f6a.jpg"
                 alt="Teen fashion trend - elegant evening wear"
                 className="w-full h-64 object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
               />
               <h3 className="text-lg font-bold mt-3 text-center">Evening Elegance</h3>
               <p className="text-sm text-gray-600 text-center">Sophisticated teen looks</p>
             </div>
           </div>
         </section>
         <section className="mt-10 max-w-6xl mx-auto animate-fade-in animation-delay-400">
           <h2 className="font-extrabold text-base mb-4 animate-slide-up animation-delay-500">Features</h2>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
                to='/aistyletryout'
               className="group animate-slide-up-stagger animation-delay-600 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] text-white font-bold py-8 px-12 rounded-xl hover:from-[#8b6b6b] hover:to-[#1a1a1a] hover:scale-110 hover:shadow-2xl transition-all duration-500 transform border-0 hover-lift hover-glow"
             >
               <div className="text-center">
                 <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-all duration-300">AI Tryout</h3>
                 <p className="text-sm text-white opacity-90 group-hover:opacity-100 transition-all duration-300">Experience our advanced AI styling assistant</p>
               </div>
             </Link>
             <button 
               onClick={toggleChatbot}
               className="group animate-slide-up-stagger animation-delay-800 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-8 px-12 rounded-xl hover:from-green-600 hover:to-teal-700 hover:scale-110 hover:shadow-2xl transition-all duration-500 transform border-0 hover-lift hover-glow"
             >
               <div className="text-center">
                 <h3 className="text-xl font-bold mb-2 group-hover:text-green-100 transition-all duration-300">Chat-bot</h3>
                 <p className="text-sm text-green-100 opacity-90 group-hover:opacity-100 transition-all duration-300">Get instant help and style recommendations</p>
               </div>
             </button>
           </div>
         </section>
        <section className="mt-10 max-w-6xl mx-auto animate-fade-in animation-delay-800">
          <h2 className="font-extrabold text-base mb-4 animate-slide-up animation-delay-900">Explore Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-grid">
                         <Link 
               to='/card'
               className="border border-[#e5e5e5] rounded-lg p-4 flex flex-col space-y-2 hover:shadow-lg hover:scale-105 transition-all duration-500 transform group hover-lift text-left bg-transparent w-full"
             >
               <div className="flex items-center space-x-2 text-[#4a4a4a] group-hover:text-blue-600 transition-all duration-300">
                 <Search className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                 <h3 className="font-semibold text-sm">Smart Search</h3>
               </div>
               <p className="text-xs text-[#6b6b6b] group-hover:text-[#4a4a4a] transition-all duration-300">
                 Find exactly what you're looking for with our advanced search filters.
               </p>
             </Link>
            <article className="border border-[#e5e5e5] rounded-lg p-4 flex flex-col space-y-2 hover:shadow-lg hover:scale-105 transition-all duration-500 transform group hover-lift">
              <div className="flex items-center space-x-2 text-[#4a4a4a] group-hover:text-blue-600 transition-all duration-300">
                <Heart className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <h3 className="font-semibold text-sm">Wishlist</h3>
              </div>
              <p className="text-xs text-[#6b6b6b] group-hover:text-[#4a4a4a] transition-all duration-300">
                Save your favorite items for later and get notified when they're on sale.
              </p>
            </article>
                         <Link 
               onClick={() => onNavigate('card')}
               className="border border-[#e5e5e5] rounded-lg p-4 flex flex-col space-y-2 hover:shadow-lg hover:scale-105 transition-all duration-500 transform group hover-lift text-left bg-transparent w-full"
             >
               <div className="flex items-center space-x-2 text-[#4a4a4a] group-hover:text-blue-600 transition-all duration-300">
                 <Tag className="w-4 h-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                 <h3 className="font-semibold text-sm">Exclusive Deals</h3>
               </div>
               <p className="text-xs text-[#6b6b6b] group-hover:text-[#4a4a4a] transition-all duration-300">
                 Access special discounts and promotions available only to our members.
               </p>
             </Link>
          </div>
        </section>
         <div className="mt-8 flex justify-center animate-fade-in animation-delay-1200">
           <Link 
             to='/card'
             className="bg-gradient-to-r from-black to-gray-800 text-white font-extrabold text-sm rounded-md px-8 py-3 hover:from-gray-800 hover:to-black hover:scale-110 hover:shadow-2xl transition-all duration-500 transform animate-bounce-subtle hover-lift hover-glow"
           >
             Get Started
           </Link>
         </div>
      </main>
      <div 
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          isChatbotOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.25)'}}
      >
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-bold text-lg">FASHIONATE Assistant</h3>
              <p className="text-sm opacity-90">Online • Ready to help</p>
            </div>
          </div>
          <button 
            onClick={toggleChatbot}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-140px)] bg-gray-50">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  } shadow-sm`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about fashion, styles, trends..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b28f7f] focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] text-white rounded-lg hover:from-[#8b6b6b] hover:to-[#1a1a1a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      {!isChatbotOpen && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
          style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.3)'}}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
