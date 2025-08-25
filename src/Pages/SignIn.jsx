import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from 'react'
import { Loader2 } from 'lucide-react';

export default function SignIn() {
    const { signIn,isSigningIn } = useAuthStore();
    const [formData,setformData] = useState({
    email:"",
    password:""
  })
  const validateForm = () =>{
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email Format")
    if(!formData.password.trim()) return toast.error("password is required")
    if(formData.password.length<6) return toast.error("Password must be at least of 6 characters")
    return true;
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const success = validateForm()
    if(success===true) signIn(formData)
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 flex items-center justify-center">
        <Spline scene="https://prod.spline.design/b3W6HNbDmwRoR2Ra/scene.splinecode" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
          <p className="text-gray-500 text-center mb-6">
            Fill your details to log back in
          </p>
           <form className="space-y-4" onSubmit={handleSubmit}>
            <input
            value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})}
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform"
            />
            <input
            value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})}
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform"/>
            <button
              type="submit"
              className="w-full bg-peach-200 hover:bg-peach-300 text-black font-semibold py-3 rounded-lg transition-transform hover:scale-105 flex justify-center items-center gap-2"
            >
              {isSigningIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Loading...</span>
              </>
            ) : (
              "Sign In"
            )}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-peach-300 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}