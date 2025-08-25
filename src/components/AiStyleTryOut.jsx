import React, { useState, useRef, useEffect } from 'react';
import { Camera, RotateCcw, Download, Sparkles, Shirt, Users, Zap, ArrowLeft, Heart, Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';
export default function AIStyleTryOut({ onNavigate }) {
    const { authUser, logout } = useAuthStore();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationDirections = ['slide-in-left','slide-in-right', 'slide-in-top',
    'slide-in-bottom','zoom-in','rotate-in','bounce-in','flip-in' ];

  const outfits = [
    {
      id: 1,
      name: 'Classic White Shirt',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=300&fit=crop',
      category: 'Casual',
      price: '$49'
    },
    {
      id: 2,
      name: 'Denim Jacket',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=300&fit=crop',
      category: 'Outerwear',
      price: '$79'
    },
    {
      id: 3,
      name: 'Black Dress',
      image: 'https://images.unsplash.com/photo-1566479179817-44ad2c135e90?w=200&h=300&fit=crop',
      category: 'Formal',
      price: '$89'
    },
    {
      id: 4,
      name: 'Striped T-Shirt',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=300&fit=crop',
      category: 'Casual',
      price: '$29'
    },
    {
      id: 5,
      name: 'Blazer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
      category: 'Formal',
      price: '$129'
    },
    {
      id: 6,
      name: 'Hoodie',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=300&fit=crop',
      category: 'Casual',
      price: '$59'
    }
  ];

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.dataset.animateId;
            if (elementId && !animatedElements.has(elementId)) {
              setAnimatedElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('[data-animate-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [animatedElements]);

  
  const getRandomAnimation = () => {
    return animationDirections[Math.floor(Math.random() * animationDirections.length)];
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
    setCapturedPhoto(null);
    setTryOnResult(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const photoData = canvas.toDataURL('image/jpeg');
      setCapturedPhoto(photoData);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setTryOnResult(null);
  };

  const tryOnOutfit = async () => {
    if (!capturedPhoto || !selectedOutfit) return;
    
    setIsProcessing(true);
  
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    
    setTryOnResult(capturedPhoto);
    setIsProcessing(false);
  };

  const downloadResult = () => {
    if (tryOnResult) {
      const link = document.createElement('a');
      link.download = 'virtual-tryout-result.jpg';
      link.href = tryOnResult;
      link.click();
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
      <div 
        data-animate-id="back-button"
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          animatedElements.has('back-button') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <Link
          to='/styleseek'
          className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors duration-300 mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>
      </div>
      <div 
        data-animate-id="hero"
        className={`relative overflow-hidden max-w-7xl mx-auto px-6 mb-12 transition-all duration-1000 ${
          animatedElements.has('hero') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{backgroundColor: '#b28f7f'}}>
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 px-8 py-16 text-center text-white">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/30">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-base font-medium">AI-Powered Virtual Try-On</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-yellow-100 to-[#b28f7f] bg-clip-text text-transparent">
              Try Before You Buy
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
              Experience the future of shopping with our AI-powered virtual try-on technology
            </p>
             <div className="flex flex-wrap justify-center gap-8 mb-8">
               <div className="text-center">
                 <div className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur rounded-full mb-3 mx-auto">
                   <Zap className="w-7 h-7" />
                 </div>
                 <div className="text-3xl font-bold">3s</div>
                 <div className="text-sm text-white/80">Processing Time</div>
               </div>
             </div>
          </div>
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div 
            data-animate-id="camera-section"
            className={`space-y-6 transition-all duration-1000 ${
              animatedElements.has('camera-section') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e5e5] hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group" style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.25)'}}>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-[#b28f7f]" />
                Camera Setup
              </h2>
              
              <div className="relative">
                {!isCameraOn && !capturedPhoto && (
                  <div className="aspect-[4/3] bg-[#f8f8f8] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#d1d1d1] group-hover:border-[#b28f7f] transition-colors duration-300">
                    <div className="text-center text-[#6b6b6b]">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                      <p className="text-lg mb-4">Ready to start your virtual try-on?</p>
                      <button
                        onClick={startCamera}
                        className="px-8 py-3 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] hover:from-[#8b6b6b] hover:to-[#1a1a1a] text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Start Camera
                      </button>
                    </div>
                  </div>
                )}
                
                {isCameraOn && !capturedPhoto && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full aspect-[4/3] object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 border-4 border-[#b28f7f] rounded-2xl pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <button
                        onClick={capturePhoto}
                        className="px-6 py-3 bg-white text-[#1a1a1a] font-medium rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:scale-105 transform"
                      >
                        Capture Photo
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors shadow-lg hover:scale-105 transform"
                      >
                        Stop Camera
                      </button>
                    </div>
                  </div>
                )}
                
                {capturedPhoto && (
                  <div className="relative">
                    <img
                      src={tryOnResult || capturedPhoto}
                      alt="Captured"
                      className="w-full aspect-[4/3] object-cover rounded-2xl"
                    />
                    {tryOnResult && selectedOutfit && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
                        <div className="p-6 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                            <span className="font-medium">AI Try-On Complete!</span>
                          </div>
                          <p className="text-sm opacity-90">Wearing: {selectedOutfit.name}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={retakePhoto}
                        className="p-2 bg-white/80 backdrop-blur rounded-full text-[#1a1a1a] hover:bg-white transition-colors hover:scale-110 transform"
                        title="Retake Photo"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                      {tryOnResult && (
                        <button
                          onClick={downloadResult}
                          className="p-2 bg-[#b28f7f]/90 backdrop-blur rounded-full text-white hover:bg-[#8b6b6b] transition-colors hover:scale-110 transform"
                          title="Download Result"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </div>
            {capturedPhoto && selectedOutfit && !tryOnResult && (
              <button onClick={tryOnOutfit}
                disabled={isProcessing} className="w-full py-4 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] hover:from-[#8b6b6b] hover:to-[#1a1a1a] disabled:opacity-50 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.3)'}}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AI Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Try On Outfit </div>
                )}
              </button>
            )}
          </div>
          <div 
            data-animate-id="outfit-section"
            className={`space-y-6 transition-all duration-1000 ${
              animatedElements.has('outfit-section') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e5e5] hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]" style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.25)'}}>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <Shirt className="w-6 h-6 text-[#b28f7f]" />
                Choose Your Outfit
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {outfits.map((outfit, index) => (
                  <div
                    key={outfit.id}
                      data-animate-id={`outfit-${outfit.id}`}
                      onClick={() => setSelectedOutfit(outfit)}
                    className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                      selectedOutfit?.id === outfit.id
                        ? 'ring-4 ring-[#b28f7f] shadow-lg shadow-[#b28f7f]/30'
                        : 'hover:shadow-lg'
                    } transition-all duration-1000 ${
                      animatedElements.has(`outfit-${outfit.id}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                    style={{transitionDelay: `${index * 100}ms`}}
                  >
                    <div className="aspect-[3/4] bg-gray-200">
                      <img
                        src={outfit.image}
                        alt={outfit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-white/90 backdrop-blur">
                      <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1">{outfit.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#6b6b6b] bg-[#f0f0f0] px-2 py-1 rounded-full">
                          {outfit.category}
                        </span>
                        <span className="font-bold text-[#b28f7f]">{outfit.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedOutfit && (
                <div className="mt-6 p-4 bg-[#b28f7f]/10 rounded-xl border border-[#b28f7f]/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedOutfit.image}
                      alt={selectedOutfit.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a]">{selectedOutfit.name}</h4>
                      <p className="text-[#6b6b6b] text-sm">{selectedOutfit.category} • {selectedOutfit.price}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div 
          data-animate-id="instructions"
          className={`mt-16 text-center transition-all duration-1000 ${
            animatedElements.has('instructions') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e5e5]" style={{boxShadow: '0 25px 50px -12px rgba(178, 143, 127, 0.25)'}}>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">How it works:</h3>
            <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
              {[
                { step: 1, text: 'Start your camera' },
                { step: 2, text: 'Take a photo' },
                { step: 3, text: 'Select an outfit' },
                { step: 4, text: 'See the magic happen!' }
              ].map((item, index) => (
                <div 
                  key={item.step}
                  data-animate-id={`step-${item.step}`}
                  className={`flex items-center gap-3 transition-all duration-1000 ${
                    animatedElements.has(`step-${item.step}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{transitionDelay: `${index * 200}ms`}}
                >
                  <span className="w-10 h-10 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] text-white rounded-full flex items-center justify-center font-bold text-lg">{item.step}</span>
                  <span className="text-[#4a4a4a] font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
