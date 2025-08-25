import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader } from 'lucide-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Card from './components/Card.jsx';
import AIStyleTryOut from './components/AiStyleTryOut.jsx';
import StyleSeek from './components/StyleSeek';
import AboutPage from './components/AboutPage';
import SignUp from './Pages/SignUp.jsx';
import SignIn from './Pages/SignIn.jsx';
import Favourites from './components/Favourites.jsx';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log("Auth User:", authUser)
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={authUser ? <Navigate to="/styleseek" /> : <Navigate to="/signin" />} />
        <Route path="/styleseek" element={authUser ? <StyleSeek /> : <Navigate to="/signin" />} />
        <Route path="/about" element={authUser ? <AboutPage /> : <Navigate to="/signin" />} />
        <Route path="/card" element={authUser ? <Card/> : <Navigate to="/signin" />} />
        <Route path="/aistyletryout" element={authUser ? <AIStyleTryOut/> : <Navigate to="/signin" />} />
        <Route path="/favourites" element={authUser ? <Favourites/> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/styleseek" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/styleseek" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
