import axios from "axios"

export const axiosInstance = new axios.create({
    baseURL:import.meta.env.MODE ==="development"? 'http://localhost:5000/api':"https://fashionate-backend.up.railway.app/api",
    withCredentials:true,
})
