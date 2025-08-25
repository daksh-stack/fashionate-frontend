import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { useAuthStore } from "../store/useAuthStore";
import {toast} from "react-hot-toast"
import { Loader2 } from 'lucide-react';
import { useState } from 'react'

export default function SignUp() {
    const { signUp,isSigningUp } = useAuthStore();
    const [formData,setformData] = useState({
    fullName:"",
    email:"",
    password:"",
    gender:"male"
  })
  const validateForm = () =>{
    if(!formData.fullName.trim()) return toast.error("FullName is required")
    if(!formData.email.trim()) return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email Format")
    if(!formData.password.trim()) return toast.error("password is required")
    if(formData.password.length<6) return toast.error("Password must be at least of 6 characters")
    return true;
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const success = validateForm()
    if(success===true) await signUp(formData)
  }

  return (
    <div className="flex h-screen bg-white">
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
          <p className="text-gray-500 text-center mb-6">
            Fill your details to create your account
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
             value={formData.fullName} 
             onChange={(e)=>setformData({...formData,fullName:e.target.value})}
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform"
            />
            <input
            value={formData.email} 
            onChange={(e)=>setformData({...formData,email:e.target.value})}
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform"
            />
            <input
            value={formData.password} 
            onChange={(e)=>setformData({...formData,password:e.target.value})}
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform"
            />
            <select value={formData.gender} onChange={(e)=>setformData({...formData,gender:e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-300 hover:scale-105 transition-transform">
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='Not prefered'>Prefer not to say</option>
            </select>
            <button
              type="submit"
              className="w-full bg-peach-200 hover:bg-peach-300 text-black font-semibold py-3 rounded-lg transition-transform hover:scale-105 flex justify-center items-center gap-2"
            >
              {isSigningUp ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-peach-300 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Spline scene="https://prod.spline.design/b3W6HNbDmwRoR2Ra/scene.splinecode" />
      </div>
    </div>
  );
}