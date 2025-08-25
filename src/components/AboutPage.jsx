import { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Users, Target, ArrowRight, Star, Zap, Palette, Code, Rocket } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const aboutRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const aboutElement = aboutRef.current;
      const teamElement = teamRef.current;
      
      if (aboutElement) {
        const rect = aboutElement.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const teamMembers = [  {id: 1,
      name: "Hatim",
      role: "The Backend Brain",
      emoji: "🛠️",
      description: "Architect of logic & databases, making sure everything runs smoothly behind the scenes.",
      icon: Code,
      color: "from-[#b28f7f] to-[#8b6b6b]",
      hoverColor: "from-[#8b6b6b] to-[#1a1a1a]"
    },
    {
      id: 2,
      name: "Priyesh",
      role: "The Design Visionary",
      emoji: "🎨",
      description: "Crafting clean, aesthetic, and user-friendly experiences with a creative touch.",
      icon: Palette,
      color: "from-[#8b6b6b] to-[#1a1a1a]",
      hoverColor: "from-[#1a1a1a] to-[#4a4a4a]"
    },
    {
      id: 3,
      name: "Sachin",
      role: "The React Builder",
      emoji: "⚛️",
      description: "Turning ideas into interactive interfaces with precision and speed.",
      icon: Target,
      color: "from-[#1a1a1a] to-[#4a4a4a]",
      hoverColor: "from-[#4a4a4a] to-[#6b6b6b]"
    },
    {
      id: 4,
      name: "Daksh",
      role: "The React Innovator",
      emoji: "🚀",
      description: "Adding life, flow, and spark to the frontend with smart and scalable code.",
      icon: Rocket,
      color: "from-[#4a4a4a] to-[#6b6b6b]",
      hoverColor: "from-[#6b6b6b] to-[#8b6b6b]"
    }
  ];

  return (
         <div className="bg-[#fafafa] min-h-screen text-[#1a1a1a]" style={{ fontFamily: 'Poppins, sans-serif' }}>
       <header className="text-center py-16 px-6 relative">
         <button
           onClick={() => onNavigate('home')}
           className="absolute top-8 left-8 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1a1a1a] hover:text-[#4a4a4a] px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#d1d1d1]"
         >
           ← Back to Home
         </button>
         
         <div className="max-w-4xl mx-auto">
           <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#b28f7f] via-[#8b6b6b] to-[#1a1a1a] bg-clip-text text-transparent animate-fade-in">
             About FASHIONATE
           </h1>
           <div className="flex justify-center items-center space-x-4 mt-6 animate-slide-up animation-delay-200">
             <Sparkles className="w-8 h-8 text-[#b28f7f] animate-pulse" />
             <span className="text-xl font-semibold text-[#4a4a4a]">Crafting Digital Fashion Dreams</span>
             <Sparkles className="w-8 h-8 text-[#8b6b6b] animate-pulse" />
           </div>
         </div>
       </header>
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <section 
          ref={aboutRef}
          className={`mb-20 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
                     <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden group hover:shadow-3xl transition-all duration-700 hover:scale-[1.02]">
             <div className="absolute inset-0 bg-gradient-to-br from-[#b28f7f]/10 via-[#8b6b6b]/10 to-[#1a1a1a]/5 opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
             
             <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-r from-[#b28f7f] to-[#8b6b6b] rounded-full opacity-20 group-hover:opacity-40 transition-all duration-700 animate-float"></div>
             <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-r from-[#8b6b6b] to-[#1a1a1a] rounded-full opacity-20 group-hover:opacity-40 transition-all duration-700 animate-float-delayed"></div>
             
             <div className="relative z-10">
               <div className="flex items-center space-x-3 mb-8 animate-slide-in-left">
                 <Heart className="w-8 h-8 text-[#b28f7f] animate-pulse" />
                 <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">Our Story</h2>
               </div>
               
               <div className="space-y-6 text-lg leading-relaxed text-[#4a4a4a]">
                 <p className="animate-slide-up animation-delay-300">
                   FASHIONATE was born from a <span className="font-semibold text-[#b28f7f]">passion for fashion</span> and a vision to revolutionize how people discover and express their unique style. We believe that fashion is more than just clothing—it's a form of self-expression, confidence, and creativity.
                 </p>
                 
                 <p className="animate-slide-up animation-delay-400">
                   Our mission is to create an <span className="font-semibold text-[#8b6b6b]">intelligent, intuitive platform</span> that connects fashion enthusiasts with the latest trends, exclusive deals, and personalized style recommendations. We're building the future of fashion discovery, powered by cutting-edge AI and innovative design.
                 </p>
                 
                 <p className="animate-slide-up animation-delay-500">
                   Every feature, every animation, and every interaction is crafted with <span className="font-semibold text-[#1a1a1a]">love and attention to detail</span>. We're not just building an app—we're creating an experience that inspires, empowers, and delights fashion lovers around the world.
                 </p>
               </div>
               
               <div className="mt-10 flex items-center space-x-4 animate-slide-up animation-delay-600">
                 <div className="flex space-x-2">
                   <Star className="w-5 h-5 text-[#b28f7f] fill-current" />
                   <Star className="w-5 h-5 text-[#b28f7f] fill-current" />
                   <Star className="w-5 h-5 text-[#b28f7f] fill-current" />
                   <Star className="w-5 h-5 text-[#b28f7f] fill-current" />
                   <Star className="w-5 h-5 text-[#b28f7f] fill-current" />
                 </div>
                 <span className="text-sm font-medium text-[#4a4a4a]">Crafted with passion & precision</span>
               </div>
             </div>
           </div>
        </section>
        <section 
          ref={teamRef}
          className="mb-20"
        >
                     <div className="text-center mb-16 animate-fade-in animation-delay-700">
             <div className="flex items-center justify-center space-x-3 mb-6">
               <Users className="w-8 h-8 text-[#b28f7f]" />
               <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Meet the Team</h2>
               <Users className="w-8 h-8 text-[#8b6b6b]" />
             </div>
             <p className="text-xl text-[#4a4a4a] max-w-2xl mx-auto">
               The brilliant minds behind FASHIONATE, working together to bring your fashion dreams to life.
             </p>
           </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
                onMouseEnter={() => setActiveCard(member.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-all duration-500">
                    <member.icon className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                  </div>
                  
                                     <div className="relative z-10 text-center">
                     <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                       {member.emoji}
                     </div>
                    
                     <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#4a4a4a] transition-colors duration-300">
                       {member.name}
                     </h3>
                     <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-gradient-to-r ${member.color} text-white transform group-hover:scale-105 transition-all duration-300`}>
                       {member.role}
                     </div>
                     <p className="text-[#4a4a4a] leading-relaxed text-sm group-hover:text-[#6b6b6b] transition-colors duration-300">
                       {member.description}
                     </p>
                     <div className="mt-6 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">
                       <ArrowRight className="w-5 h-5 text-[#6b6b6b] mx-auto group-hover:text-[#8b6b6b]" />
                     </div>
                   </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${member.hoverColor} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </div>
              </div>
            ))}
          </div>
        </section>
         <section className="text-center animate-fade-in animation-delay-1200">
           <div className="bg-gradient-to-r from-[#b28f7f] via-[#8b6b6b] to-[#1a1a1a] rounded-3xl p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
             <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discover Your Style?</h3>
             <p className="text-xl mb-8 opacity-90">Join thousands of fashion enthusiasts who trust FASHIONATE</p>
             <button className="bg-white text-[#b28f7f] font-bold px-8 py-4 rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
               Get Started Today
             </button>
           </div>
         </section>
      </main>
    </div>
  );
}
